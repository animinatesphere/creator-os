"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Link2, Plus, Trash2, ExternalLink, MousePointer, Eye, BarChart2, Globe } from "lucide-react";
const InstagramIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const TwitterIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const YoutubeIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);
const GithubIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/* ============================================
   LINK IN BIO BUILDER
============================================ */
interface BioLink {
  id: string;
  label: string;
  url: string;
  icon: string;
  clicks: number;
}

function uid() { return Math.random().toString(36).slice(2, 9); }

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
  github: GithubIcon,
  website: Globe,
  default: Link2,
};

export default function LinkInBioPage() {
  const [name, setName] = useState("Your Name");
  const [bio, setBio] = useState("Creator · Designer · Builder 🚀");
  const [accentColor, setAccentColor] = useState("#5B21B6");
  const [bgColor, setBgColor] = useState("#0F0F13");
  const [avatar, setAvatar] = useState("");
  const [links, setLinks] = useState<BioLink[]>([
    { id: uid(), label: "🌐 My Portfolio", url: "https://portfolio.com", icon: "website", clicks: 142 },
    { id: uid(), label: "📸 Instagram", url: "https://instagram.com", icon: "instagram", clicks: 89 },
    { id: uid(), label: "🐦 Twitter / X", url: "https://twitter.com", icon: "twitter", clicks: 67 },
    { id: uid(), label: "💌 Work With Me", url: "https://calendly.com", icon: "default", clicks: 34 },
  ]);

  const [tab, setTab] = useState<"edit" | "analytics">("edit");

  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);

  const addLink = () => setLinks((prev) => [...prev, { id: uid(), label: "", url: "", icon: "default", clicks: 0 }]);
  const updateLink = (id: string, key: keyof BioLink, val: string) =>
    setLinks((prev) => prev.map((l) => l.id === id ? { ...l, [key]: val } : l));
  const removeLink = (id: string) => setLinks((prev) => prev.filter((l) => l.id !== id));

  return (
    <DashboardShell title="Link in Bio">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <Link2 size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--clr-text-primary)]">Link in Bio</h1>
              <p className="text-sm text-[var(--clr-text-secondary)]">
                creatoros.app/<span className="text-[var(--clr-secondary)] font-semibold">@yourname</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftIcon={<ExternalLink size={13} />}>View Live</Button>
            <Button variant="gradient" size="sm">Publish Changes</Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-[10px] w-fit">
          {(["edit", "analytics"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-1.5 rounded-[8px] text-sm font-semibold capitalize transition-all",
                tab === t ? "bg-[var(--clr-secondary)] text-white shadow" : "text-[var(--clr-text-secondary)] hover:text-[var(--clr-text-primary)]"
              )}
            >
              {t === "analytics" ? "📊 Analytics" : "✏️ Edit"}
            </button>
          ))}
        </div>

        {tab === "edit" ? (
          <div className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-6">
            {/* Editor */}
            <div className="space-y-4">
              {/* Profile */}
              <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 space-y-3">
                <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">Profile</p>
                <Input label="Display Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input label="Bio / Tagline" value={bio} onChange={(e) => setBio(e.target.value)} />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-[var(--clr-text-primary)] block mb-1.5">Accent Color</label>
                    <div className="flex items-center gap-2 h-10 px-3 rounded-[10px] border border-[var(--clr-border)] bg-[var(--clr-surface)]">
                      <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent" />
                      <span className="text-xs font-mono text-[var(--clr-text-primary)]">{accentColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[var(--clr-text-primary)] block mb-1.5">Background</label>
                    <div className="flex items-center gap-2 h-10 px-3 rounded-[10px] border border-[var(--clr-border)] bg-[var(--clr-surface)]">
                      <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent" />
                      <span className="text-xs font-mono text-[var(--clr-text-primary)]">{bgColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">Links</p>
                  <Button variant="ghost" size="xs" leftIcon={<Plus size={11} />} onClick={addLink}>Add Link</Button>
                </div>
                <div className="space-y-2">
                  {links.map((link) => (
                    <div key={link.id} className="rounded-[10px] border border-[var(--clr-border)] p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Input placeholder="Button label (use an emoji!)" value={link.label} onChange={(e) => updateLink(link.id, "label", e.target.value)} wrapperClassName="flex-1" />
                        <button onClick={() => removeLink(link.id)} className="w-8 h-8 flex items-center justify-center rounded-[8px] text-[var(--clr-text-muted)] hover:text-[var(--clr-danger)] hover:bg-red-500/10 transition-colors flex-shrink-0">
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <Input placeholder="https://your-link.com" leadingIcon={<ExternalLink size={13} />} value={link.url} onChange={(e) => updateLink(link.id, "url", e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone Preview */}
            <div className="flex items-start justify-center">
              <div className="w-[320px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-[#2A2A35]" style={{ background: bgColor }}>
                {/* Status bar mockup */}
                <div className="h-8 flex items-center justify-center" style={{ background: bgColor }}>
                  <div className="w-16 h-1 rounded-full bg-white/20" />
                </div>

                <div className="px-6 pb-10 flex flex-col items-center">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-3 border-2 mt-4"
                    style={{ background: `${accentColor}20`, borderColor: accentColor }}>
                    👤
                  </div>
                  <h2 className="text-lg font-black text-white mb-1">{name}</h2>
                  <p className="text-xs text-center mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>{bio}</p>

                  {/* Links */}
                  <div className="w-full space-y-2.5">
                    {links.map((link) => (
                      <a
                        key={link.id}
                        href={link.url || "#"}
                        className="block w-full py-3 px-4 rounded-[12px] text-center text-sm font-bold text-white transition-all"
                        style={{
                          background: `${accentColor}22`,
                          border: `1px solid ${accentColor}44`,
                          color: "white",
                        }}
                      >
                        {link.label || "Untitled Link"}
                      </a>
                    ))}
                  </div>

                  <p className="text-[10px] mt-6" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Made with CreatorOS
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Analytics Tab */
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Clicks", value: totalClicks, icon: MousePointer, color: "from-violet-500 to-indigo-600" },
                { label: "Profile Views", value: "1,284", icon: Eye, color: "from-pink-500 to-rose-500" },
                { label: "Link CTR", value: `${Math.round((totalClicks / 1284) * 100)}%`, icon: BarChart2, color: "from-emerald-500 to-teal-600" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-[8px] bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <Icon size={14} className="text-white" />
                      </div>
                      <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wide">{stat.label}</p>
                    </div>
                    <p className="text-3xl font-black text-[var(--clr-text-primary)]" style={{ letterSpacing: "-0.02em" }}>{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Per link clicks */}
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
              <p className="text-sm font-bold text-[var(--clr-text-primary)] mb-4">Clicks by Link</p>
              <div className="space-y-3">
                {links.sort((a, b) => b.clicks - a.clicks).map((link) => {
                  const pct = Math.round((link.clicks / (totalClicks || 1)) * 100);
                  return (
                    <div key={link.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-[var(--clr-text-primary)] truncate">{link.label || "Untitled"}</span>
                        <span className="text-[var(--clr-text-secondary)] ml-4 flex-shrink-0">{link.clicks} clicks · {pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[var(--clr-surface-2)] overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, background: `linear-gradient(90deg, var(--clr-primary), var(--clr-secondary))` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
