"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileSignature, Plus, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const proposals = [
  { id: "1", client: "Acme Corp", title: "Brand Identity & Website Redesign", value: "$4,500", status: "sent", date: "Apr 18, 2026" },
  { id: "2", client: "StartupXYZ", title: "Product Design Sprint", value: "$2,800", status: "draft", date: "Apr 20, 2026" },
  { id: "3", client: "RetailBrand", title: "Social Media Campaign Graphics", value: "$1,200", status: "signed", date: "Apr 12, 2026" },
];

const statusMap = { sent: "primary", draft: "default", signed: "success", declined: "danger" } as const;

export default function ProposalsPage() {
  return (
    <DashboardShell title="Proposals">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <FileSignature size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--clr-text-primary)]">Proposals</h1>
              <p className="text-sm text-[var(--clr-text-secondary)]">Client proposals with e-signature support</p>
            </div>
          </div>
          <Button variant="gradient" size="sm" leftIcon={<Plus size={13} />}>New Proposal</Button>
        </div>

        <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] overflow-hidden">
          {proposals.map((p, i) => (
            <div key={p.id} className={`flex items-center gap-4 px-5 py-4 hover:bg-[var(--clr-surface-2)] transition-colors ${i < proposals.length - 1 ? "border-b border-[var(--clr-border)]" : ""}`}>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[var(--clr-text-primary)]">{p.title}</p>
                <p className="text-xs text-[var(--clr-text-muted)] mt-0.5 flex items-center gap-1"><Clock size={10} /> {p.client} · {p.date}</p>
              </div>
              <p className="font-bold text-[var(--clr-text-primary)] text-sm">{p.value}</p>
              <Badge variant={statusMap[p.status as keyof typeof statusMap] ?? "default"} dot>{p.status}</Badge>
              <ArrowRight size={14} className="text-[var(--clr-text-muted)]" />
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
