"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Send,
  Copy,
  ChevronDown,
  Check,
  DollarSign,
} from "lucide-react";

/* ============================================
   INVOICE TYPES
============================================ */
interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  lineItems: LineItem[];
  notes: string;
  taxRate: number;
  currency: string;
  status: "draft" | "sent" | "paid" | "overdue";
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

/* ============================================
   INVOICE MAKER PAGE
============================================ */
export default function InvoiceMakerPage() {
  const [invoice, setInvoice] = useState<InvoiceData>({
    invoiceNumber: "INV-0001",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 864e5).toISOString().split("T")[0],
    fromName: "",
    fromEmail: "",
    fromAddress: "",
    toName: "",
    toEmail: "",
    toAddress: "",
    lineItems: [{ id: uid(), description: "", quantity: 1, rate: 0 }],
    notes: "Thank you for your business!",
    taxRate: 0,
    currency: "USD",
    status: "draft",
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  /* Computed totals */
  const subtotal = invoice.lineItems.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );
  const taxAmount = subtotal * (invoice.taxRate / 100);
  const total = subtotal + taxAmount;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: invoice.currency,
    }).format(n);

  /* Helpers */
  const updateField = <K extends keyof InvoiceData>(key: K, val: InvoiceData[K]) =>
    setInvoice((p) => ({ ...p, [key]: val }));

  const updateLineItem = (id: string, key: keyof LineItem, val: string | number) =>
    setInvoice((p) => ({
      ...p,
      lineItems: p.lineItems.map((li) =>
        li.id === id ? { ...li, [key]: val } : li
      ),
    }));

  const addLineItem = () =>
    setInvoice((p) => ({
      ...p,
      lineItems: [...p.lineItems, { id: uid(), description: "", quantity: 1, rate: 0 }],
    }));

  const removeLineItem = (id: string) =>
    setInvoice((p) => ({
      ...p,
      lineItems: p.lineItems.filter((li) => li.id !== id),
    }));

  const handleSend = async () => {
    setSending(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSending(false);
    setSent(true);
    updateField("status", "sent");

    // Confetti celebration
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#5B21B6", "#6366F1", "#10B981"] });
    } catch {}
  };

  const statusConfig = {
    draft: { label: "Draft", variant: "default" as const },
    sent: { label: "Sent", variant: "primary" as const },
    paid: { label: "Paid", variant: "success" as const },
    overdue: { label: "Overdue", variant: "danger" as const },
  };

  return (
    <DashboardShell title="Invoice Maker">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <FileText size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--clr-text-primary)]">
                {invoice.invoiceNumber}
              </h1>
              <Badge variant={statusConfig[invoice.status].variant} dot>
                {statusConfig[invoice.status].label}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>
              Export PDF
            </Button>
            <Button
              variant={sent ? "accent" : "gradient"}
              size="sm"
              leftIcon={sent ? <Check size={14} /> : <Send size={14} />}
              onClick={handleSend}
              loading={sending}
              disabled={sent}
            >
              {sent ? "Invoice Sent!" : "Send Invoice"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,340px] gap-6">
          {/* ── Invoice Editor ── */}
          <div className="space-y-4">
            {/* Invoice meta */}
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Invoice #"
                  value={invoice.invoiceNumber}
                  onChange={(e) => updateField("invoiceNumber", e.target.value)}
                />
                <Input
                  label="Issue Date"
                  type="date"
                  value={invoice.issueDate}
                  onChange={(e) => updateField("issueDate", e.target.value)}
                />
                <Input
                  label="Due Date"
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => updateField("dueDate", e.target.value)}
                />
              </div>
            </div>

            {/* From / To */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 space-y-3">
                <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">
                  From (You)
                </p>
                <Input placeholder="Your name or company" value={invoice.fromName} onChange={(e) => updateField("fromName", e.target.value)} />
                <Input placeholder="your@email.com" value={invoice.fromEmail} onChange={(e) => updateField("fromEmail", e.target.value)} />
                <Textarea placeholder="Address (optional)" value={invoice.fromAddress} onChange={(e) => updateField("fromAddress", e.target.value)} className="min-h-[70px]" />
              </div>
              <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 space-y-3">
                <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">
                  Bill To (Client)
                </p>
                <Input placeholder="Client name or company" value={invoice.toName} onChange={(e) => updateField("toName", e.target.value)} />
                <Input placeholder="client@email.com" value={invoice.toEmail} onChange={(e) => updateField("toEmail", e.target.value)} />
                <Textarea placeholder="Client address (optional)" value={invoice.toAddress} onChange={(e) => updateField("toAddress", e.target.value)} className="min-h-[70px]" />
              </div>
            </div>

            {/* Line Items */}
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
              <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider mb-4">
                Line Items
              </p>
              {/* Header */}
              <div className="grid grid-cols-[1fr,80px,100px,100px,36px] gap-2 px-1 mb-2">
                {["Description", "Qty", "Rate", "Amount", ""].map((h) => (
                  <p key={h} className="text-xs font-semibold text-[var(--clr-text-muted)]">{h}</p>
                ))}
              </div>
              <div className="space-y-2">
                {invoice.lineItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-[1fr,80px,100px,100px,36px] gap-2 items-center">
                    <Input
                      placeholder="Service description…"
                      value={item.description}
                      onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                    />
                    <Input
                      type="number"
                      min={0}
                      value={item.quantity}
                      onChange={(e) => updateLineItem(item.id, "quantity", Number(e.target.value))}
                    />
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      value={item.rate}
                      onChange={(e) => updateLineItem(item.id, "rate", Number(e.target.value))}
                    />
                    <div className="h-10 px-3 flex items-center rounded-[10px] bg-[var(--clr-surface-2)] text-sm font-semibold text-[var(--clr-text-primary)]">
                      {fmt(item.quantity * item.rate)}
                    </div>
                    <button
                      onClick={() => removeLineItem(item.id)}
                      disabled={invoice.lineItems.length === 1}
                      className="w-9 h-9 flex items-center justify-center rounded-[8px] text-[var(--clr-text-muted)] hover:bg-red-500/10 hover:text-[var(--clr-danger)] transition-colors disabled:opacity-30"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Plus size={13} />}
                onClick={addLineItem}
                className="mt-3"
              >
                Add Line Item
              </Button>
            </div>

            {/* Notes */}
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
              <Textarea
                label="Notes / Payment Terms"
                placeholder="e.g. Payment due within 30 days via bank transfer."
                value={invoice.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />
            </div>
          </div>

          {/* ── Summary Panel ── */}
          <div className="space-y-4">
            {/* Totals */}
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 space-y-3">
              <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">
                Summary
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--clr-text-secondary)]">Subtotal</span>
                  <span className="font-semibold text-[var(--clr-text-primary)]">{fmt(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[var(--clr-text-secondary)]">Tax</span>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={invoice.taxRate}
                      onChange={(e) => updateField("taxRate", Number(e.target.value))}
                      className="w-16 h-7 text-xs px-2"
                    />
                    <span className="text-[var(--clr-text-muted)]">%</span>
                  </div>
                </div>
                {invoice.taxRate > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[var(--clr-text-secondary)]">Tax Amount</span>
                    <span className="font-semibold text-[var(--clr-text-primary)]">{fmt(taxAmount)}</span>
                  </div>
                )}
              </div>
              <div className="h-px bg-[var(--clr-border)]" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-[var(--clr-text-primary)]">Total</span>
                <span className="text-2xl font-black text-[var(--clr-text-primary)]" style={{ letterSpacing: "-0.02em" }}>
                  {fmt(total)}
                </span>
              </div>
            </div>

            {/* Currency */}
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
              <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider mb-3">
                Settings
              </p>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-[var(--clr-text-primary)] block mb-1.5">Currency</label>
                  <select
                    value={invoice.currency}
                    onChange={(e) => updateField("currency", e.target.value)}
                    className="w-full h-10 px-3 rounded-[10px] border border-[var(--clr-border)] bg-[var(--clr-surface)] text-sm text-[var(--clr-text-primary)] outline-none focus:border-[var(--clr-secondary)] focus:ring-2 focus:ring-[var(--clr-secondary)]/25"
                  >
                    <option value="USD">USD — US Dollar</option>
                    <option value="EUR">EUR — Euro</option>
                    <option value="GBP">GBP — British Pound</option>
                    <option value="NGN">NGN — Nigerian Naira</option>
                    <option value="CAD">CAD — Canadian Dollar</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--clr-text-primary)] block mb-1.5">Status</label>
                  <select
                    value={invoice.status}
                    onChange={(e) => updateField("status", e.target.value as InvoiceData["status"])}
                    className="w-full h-10 px-3 rounded-[10px] border border-[var(--clr-border)] bg-[var(--clr-surface)] text-sm text-[var(--clr-text-primary)] outline-none focus:border-[var(--clr-secondary)] focus:ring-2 focus:ring-[var(--clr-secondary)]/25"
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment tip */}
            {sent && (
              <div className="animate-fade-in-up rounded-[16px] border border-emerald-500/30 bg-emerald-500/5 p-4 flex gap-3">
                <Check size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-emerald-300">Invoice Sent!</p>
                  <p className="text-xs text-emerald-400/80 mt-0.5">
                    Your client will receive it at {invoice.toEmail || "their email"}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
