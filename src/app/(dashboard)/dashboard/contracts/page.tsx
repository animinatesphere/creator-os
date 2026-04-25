"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { FileSignature, Plus, Download, CheckCircle } from "lucide-react";

const CONTRACT_TEMPLATES = [
  { id: "1", title: "Freelance Design Contract", desc: "For project-based design work with clear deliverables and payment terms.", popular: true },
  { id: "2", title: "Web Development Agreement", desc: "Full-stack or frontend development contracts with revision clauses." },
  { id: "3", title: "Content Creator Agreement", desc: "For brand partnerships, sponsored content, and UGC campaigns." },
  { id: "4", title: "Consulting Retainer", desc: "Monthly retainer agreements for ongoing consulting engagements." },
  { id: "5", title: "Photography License", desc: "Image licensing agreements for commercial use." },
  { id: "6", title: "NDA Template", desc: "Non-disclosure agreements for protecting confidential project details." },
];

export default function ContractsPage() {
  return (
    <DashboardShell title="Contracts">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center shadow-lg">
              <FileSignature size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--clr-text-primary)]">Contract Generator</h1>
              <p className="text-sm text-[var(--clr-text-secondary)]">Freelance contracts and legal templates</p>
            </div>
          </div>
          <Button variant="gradient" size="sm" leftIcon={<Plus size={13} />}>Custom Contract</Button>
        </div>

        <p className="text-sm font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">Legal Templates</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONTRACT_TEMPLATES.map((ct) => (
            <div key={ct.id} className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 space-y-3 hover:border-[var(--clr-secondary)] hover:-translate-y-0.5 hover:shadow-md transition-all duration-180 cursor-pointer">
              {ct.popular && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  ✦ Popular
                </span>
              )}
              <h3 className="font-bold text-sm text-[var(--clr-text-primary)]">{ct.title}</h3>
              <p className="text-xs text-[var(--clr-text-secondary)] leading-relaxed">{ct.desc}</p>
              <div className="flex gap-2 pt-1">
                <Button variant="outline" size="xs" leftIcon={<CheckCircle size={11} />} className="flex-1">Use Template</Button>
                <Button variant="ghost" size="xs" leftIcon={<Download size={11} />}>PDF</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
