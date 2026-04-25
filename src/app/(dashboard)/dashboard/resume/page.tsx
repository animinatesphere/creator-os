"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { User, Plus, Trash2, Download, GripVertical, Briefcase, GraduationCap, Award, Mail, Phone, Globe, MapPin } from "lucide-react";

/* ============================================
   RESUME BUILDER
============================================ */
interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: { id: string; company: string; role: string; period: string; description: string }[];
  education: { id: string; school: string; degree: string; year: string }[];
  skills: string[];
  template: "modern" | "classic" | "minimal";
}

function uid() { return Math.random().toString(36).slice(2, 9); }

const TEMPLATES = [
  { id: "modern", label: "Modern", accent: "#5B21B6" },
  { id: "classic", label: "Classic", accent: "#1F2937" },
  { id: "minimal", label: "Minimal", accent: "#10B981" },
] as const;

export default function ResumeBuilderPage() {
  const [data, setData] = useState<ResumeData>({
    name: "Alex Morgan",
    title: "Senior Product Designer",
    email: "alex@example.com",
    phone: "+1 (555) 000-0000",
    location: "San Francisco, CA",
    website: "alexmorgan.design",
    summary: "Creative product designer with 7+ years of experience building digital products used by millions. Passionate about turning complex problems into elegant solutions.",
    experience: [
      { id: uid(), company: "Acme Corp", role: "Senior Product Designer", period: "2022 – Present", description: "Led design for the flagship product, increasing user retention by 40%. Managed a team of 3 junior designers." },
      { id: uid(), company: "StartupXYZ", role: "UI/UX Designer", period: "2019 – 2022", description: "Designed end-to-end user flows for mobile and web apps. Ran user research sessions and usability tests." },
    ],
    education: [
      { id: uid(), school: "California College of the Arts", degree: "BFA in Graphic Design", year: "2019" },
    ],
    skills: ["Figma", "Design Systems", "User Research", "Prototyping", "React", "CSS", "Motion Design"],
    template: "modern",
  });

  const setField = <K extends keyof ResumeData>(k: K, v: ResumeData[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const updateExp = (id: string, key: string, val: string) =>
    setField("experience", data.experience.map((e) => e.id === id ? { ...e, [key]: val } : e));

  const updateEdu = (id: string, key: string, val: string) =>
    setField("education", data.education.map((e) => e.id === id ? { ...e, [key]: val } : e));

  const accent = TEMPLATES.find((t) => t.id === data.template)?.accent ?? "#5B21B6";

  return (
    <DashboardShell title="Resume Builder">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <User size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--clr-text-primary)]">Resume Builder</h1>
              <p className="text-sm text-[var(--clr-text-secondary)]">Professional resumes with one-click PDF export</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>Export PDF</Button>
            <Button variant="gradient" size="sm">Save Resume</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[360px,1fr] gap-6">
          {/* ── Editor Panel ── */}
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
            {/* Template Picker */}
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4">
              <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider mb-3">Template</p>
              <div className="flex gap-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setField("template", t.id)}
                    className={cn(
                      "flex-1 py-2 px-3 rounded-[8px] text-sm font-semibold border transition-all",
                      data.template === t.id
                        ? "border-[var(--clr-secondary)] bg-[var(--clr-secondary)]/10 text-[var(--clr-secondary)]"
                        : "border-[var(--clr-border)] text-[var(--clr-text-secondary)] hover:bg-[var(--clr-surface-2)]"
                    )}
                    style={{ borderLeftColor: t.accent, borderLeftWidth: data.template === t.id ? 3 : 1 }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Info */}
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 space-y-3">
              <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">Personal Info</p>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Full Name" value={data.name} onChange={(e) => setField("name", e.target.value)} />
                <Input label="Job Title" value={data.title} onChange={(e) => setField("title", e.target.value)} />
                <Input label="Email" leadingIcon={<Mail size={13} />} value={data.email} onChange={(e) => setField("email", e.target.value)} />
                <Input label="Phone" leadingIcon={<Phone size={13} />} value={data.phone} onChange={(e) => setField("phone", e.target.value)} />
                <Input label="Location" leadingIcon={<MapPin size={13} />} value={data.location} onChange={(e) => setField("location", e.target.value)} />
                <Input label="Website" leadingIcon={<Globe size={13} />} value={data.website} onChange={(e) => setField("website", e.target.value)} />
              </div>
              <Textarea label="Summary" value={data.summary} onChange={(e) => setField("summary", e.target.value)} />
            </div>

            {/* Experience */}
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">Experience</p>
                <Button variant="ghost" size="xs" leftIcon={<Plus size={11} />} onClick={() => setField("experience", [...data.experience, { id: uid(), company: "", role: "", period: "", description: "" }])}>
                  Add
                </Button>
              </div>
              {data.experience.map((exp) => (
                <div key={exp.id} className="rounded-[10px] border border-[var(--clr-border)] p-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Company" value={exp.company} onChange={(e) => updateExp(exp.id, "company", e.target.value)} />
                    <Input placeholder="Role" value={exp.role} onChange={(e) => updateExp(exp.id, "role", e.target.value)} />
                  </div>
                  <Input placeholder="2022 – Present" value={exp.period} onChange={(e) => updateExp(exp.id, "period", e.target.value)} />
                  <Textarea placeholder="Key achievements and responsibilities…" value={exp.description} onChange={(e) => updateExp(exp.id, "description", e.target.value)} className="min-h-[70px]" />
                  <Button variant="ghost" size="xs" leftIcon={<Trash2 size={11} />} className="text-[var(--clr-danger)]" onClick={() => setField("experience", data.experience.filter((e) => e.id !== exp.id))}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">Education</p>
                <Button variant="ghost" size="xs" leftIcon={<Plus size={11} />} onClick={() => setField("education", [...data.education, { id: uid(), school: "", degree: "", year: "" }])}>
                  Add
                </Button>
              </div>
              {data.education.map((edu) => (
                <div key={edu.id} className="rounded-[10px] border border-[var(--clr-border)] p-3 space-y-2">
                  <Input placeholder="School / University" value={edu.school} onChange={(e) => updateEdu(edu.id, "school", e.target.value)} />
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Degree / Major" value={edu.degree} onChange={(e) => updateEdu(edu.id, "degree", e.target.value)} />
                    <Input placeholder="Year" value={edu.year} onChange={(e) => updateEdu(edu.id, "year", e.target.value)} />
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 space-y-3">
              <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">Skills</p>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border border-[var(--clr-border)] bg-[var(--clr-surface-2)] text-[var(--clr-text-primary)]">
                    {s}
                    <button onClick={() => setField("skills", data.skills.filter((_, j) => j !== i))} className="text-[var(--clr-text-muted)] hover:text-[var(--clr-danger)] ml-1">×</button>
                  </div>
                ))}
                <input
                  placeholder="+ Add skill"
                  className="h-7 px-3 rounded-full text-xs bg-[var(--clr-surface-2)] border border-[var(--clr-border)] text-[var(--clr-text-primary)] outline-none focus:border-[var(--clr-secondary)] w-28"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      setField("skills", [...data.skills, e.currentTarget.value.trim()]);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── Resume Preview ── */}
          <div className="rounded-[16px] border border-[var(--clr-border)] overflow-hidden shadow-2xl">
            <div className="p-2 border-b border-[var(--clr-border)] bg-[var(--clr-surface)] flex items-center justify-between">
              <span className="text-xs text-[var(--clr-text-muted)] font-medium px-2">Live Preview — A4</span>
              <Badge variant="success" dot>Auto-saved</Badge>
            </div>
            {/* A4-style paper */}
            <div className="bg-white p-10 min-h-[1000px]" style={{ fontFamily: "Inter, sans-serif" }}>
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pb-6" style={{ borderBottom: `3px solid ${accent}` }}>
                <div>
                  <h1 className="text-3xl font-black mb-1" style={{ color: "#111827", letterSpacing: "-0.02em" }}>{data.name}</h1>
                  <p className="text-base font-semibold" style={{ color: accent }}>{data.title}</p>
                </div>
                <div className="text-right text-xs space-y-1" style={{ color: "#6B7280" }}>
                  {data.email && <p style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}><Mail size={11} /> {data.email}</p>}
                  {data.phone && <p style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}><Phone size={11} /> {data.phone}</p>}
                  {data.location && <p style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}><MapPin size={11} /> {data.location}</p>}
                  {data.website && <p style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}><Globe size={11} /> {data.website}</p>}
                </div>
              </div>

              {/* Summary */}
              {data.summary && (
                <div className="mb-6">
                  <h2 className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: accent }}>Summary</h2>
                  <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{data.summary}</p>
                </div>
              )}

              {/* Experience */}
              {data.experience.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: accent }}>Experience</h2>
                  <div className="space-y-4">
                    {data.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <p className="text-sm font-bold" style={{ color: "#111827" }}>{exp.role}</p>
                            <p className="text-xs font-semibold" style={{ color: accent }}>{exp.company}</p>
                          </div>
                          <span className="text-xs" style={{ color: "#9CA3AF" }}>{exp.period}</span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {data.education.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: accent }}>Education</h2>
                  <div className="space-y-2">
                    {data.education.map((edu) => (
                      <div key={edu.id} className="flex justify-between">
                        <div>
                          <p className="text-sm font-bold" style={{ color: "#111827" }}>{edu.degree}</p>
                          <p className="text-xs" style={{ color: "#6B7280" }}>{edu.school}</p>
                        </div>
                        <span className="text-xs" style={{ color: "#9CA3AF" }}>{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {data.skills.length > 0 && (
                <div>
                  <h2 className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: accent }}>Skills</h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {data.skills.map((s, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
