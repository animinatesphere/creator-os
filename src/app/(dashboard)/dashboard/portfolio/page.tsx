"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Briefcase, Plus, ExternalLink, Grid, List } from "lucide-react";
import Link from "next/link";

const projects = [
  { id: "1", name: "Design Portfolio 2026", url: "myportfolio.creatoros.com", visits: "1.2k", status: "published" },
  { id: "2", name: "Photography Showcase", url: "photos.creatoros.com", visits: "450", status: "draft" },
];

export default function PortfolioPage() {
  return (
    <DashboardShell title="Portfolio Builder">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
              <Briefcase size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--clr-text-primary)]">Portfolios</h1>
              <p className="text-sm text-[var(--clr-text-secondary)]">Showcase your best work with stunning galleries</p>
            </div>
          </div>
          <Link href="/dashboard/builder">
            <Button variant="gradient" size="sm" leftIcon={<Plus size={13} />}>Create Portfolio</Button>
          </Link>
        </div>

        <div className="flex gap-1 p-1 bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-[10px] w-fit">
          <button className="px-3 py-1.5 rounded-[8px] bg-[var(--clr-bg)] shadow text-[var(--clr-text-primary)]"><Grid size={14} /></button>
          <button className="px-3 py-1.5 rounded-[8px] text-[var(--clr-text-muted)] hover:text-[var(--clr-text-primary)]"><List size={14} /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="rounded-[20px] border border-[var(--clr-border)] bg-[var(--clr-surface)] overflow-hidden group hover:border-[var(--clr-secondary)] transition-all">
              <div className="aspect-video bg-[var(--clr-surface-2)] flex items-center justify-center overflow-hidden relative">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
                   <Link href="/dashboard/builder">
                     <Button variant="accent" size="sm">Edit Portfolio</Button>
                   </Link>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[var(--clr-text-primary)]">{p.name}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${p.status === "published" ? "bg-emerald-500/10 text-emerald-500" : "bg-gray-500/10 text-gray-500"}`}>
                    {p.status}
                  </span>
                </div>
                <p className="text-xs text-[var(--clr-text-muted)] flex items-center gap-1">
                  <ExternalLink size={10} /> {p.url}
                </p>
                <div className="pt-3 border-t border-[var(--clr-border)] flex items-center justify-between text-[10px] font-bold text-[var(--clr-text-muted)] uppercase tracking-tight">
                  <span>{p.visits} Visitors</span>
                  <span className="text-[var(--clr-secondary)]">View Stats →</span>
                </div>
              </div>
            </div>
          ))}
          {/* Empty state / Add new */}
          <Link href="/dashboard/builder" className="rounded-[20px] border-2 border-dashed border-[var(--clr-border)] flex flex-col items-center justify-center p-10 hover:border-[var(--clr-secondary)] transition-all group">
            <div className="w-12 h-12 rounded-full bg-[var(--clr-surface-2)] flex items-center justify-center mb-3 group-hover:bg-[var(--clr-secondary)]/10 transition-colors">
              <Plus size={20} className="text-[var(--clr-text-muted)] group-hover:text-[var(--clr-secondary)]" />
            </div>
            <p className="text-sm font-bold text-[var(--clr-text-muted)] group-hover:text-[var(--clr-text-primary)]">New Portfolio</p>
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}
