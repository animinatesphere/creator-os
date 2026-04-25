"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Palette, Copy, Check, Plus, Trash2, RefreshCw, Upload, Type, Download } from "lucide-react";

/* ============================================
   BRAND KIT
============================================ */
const PRESET_PALETTES = [
  { name: "CreatorOS", colors: ["#5B21B6", "#6366F1", "#10B981", "#F59E0B", "#EF4444"] },
  { name: "Ocean Breeze", colors: ["#0EA5E9", "#38BDF8", "#06B6D4", "#0891B2", "#0C4A6E"] },
  { name: "Forest", colors: ["#15803D", "#22C55E", "#86EFAC", "#4ADE80", "#14532D"] },
  { name: "Sunset", colors: ["#EA580C", "#F97316", "#FB923C", "#FED7AA", "#7C2D12"] },
];

const FONT_PAIRS = [
  { display: "Inter", body: "Inter", label: "Clean & Modern" },
  { display: "Playfair Display", body: "Source Serif 4", label: "Editorial" },
  { display: "Sora", body: "DM Sans", label: "Tech Startup" },
  { display: "Fraunces", body: "Karla", label: "Creative Agency" },
];

export default function BrandKitPage() {
  const [brandName, setBrandName] = useState("My Brand");
  const [colors, setColors] = useState(["#5B21B6", "#6366F1", "#10B981", "#111827", "#FFFFFF"]);
  const [selectedFont, setSelectedFont] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [logoText, setLogoText] = useState("MB");

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 2000);
  };

  const updateColor = (idx: number, val: string) =>
    setColors((prev) => prev.map((c, i) => (i === idx ? val : c)));

  const removeColor = (idx: number) =>
    setColors((prev) => prev.filter((_, i) => i !== idx));

  const addColor = () => setColors((prev) => [...prev, "#6366F1"]);

  const applyPreset = (palette: string[]) => setColors(palette);

  const font = FONT_PAIRS[selectedFont];

  return (
    <DashboardShell title="Brand Kit">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-violet-400 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Palette size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--clr-text-primary)]">Brand Kit</h1>
              <p className="text-sm text-[var(--clr-text-secondary)]">Your brand identity — applied across all tools</p>
            </div>
          </div>
          <Button variant="gradient" size="sm" leftIcon={<Download size={13} />}>Export Brand Guide</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Color Palette ── */}
          <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[var(--clr-text-primary)]">Color Palette</p>
              <Button variant="ghost" size="xs" leftIcon={<Plus size={11} />} onClick={addColor}>Add Color</Button>
            </div>

            {/* Preset palettes */}
            <div>
              <p className="text-xs text-[var(--clr-text-muted)] mb-2">Presets</p>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_PALETTES.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset.colors)}
                    className="flex items-center gap-2 p-2 rounded-[8px] border border-[var(--clr-border)] hover:border-[var(--clr-secondary)] hover:bg-[var(--clr-surface-2)] transition-all"
                  >
                    <div className="flex gap-0.5 flex-shrink-0">
                      {preset.colors.slice(0, 4).map((c, i) => (
                        <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-[var(--clr-text-secondary)] truncate">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color swatches */}
            <div className="space-y-2">
              {colors.map((color, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {/* Swatch + picker */}
                  <div className="relative w-10 h-10 rounded-[10px] overflow-hidden flex-shrink-0 border border-[var(--clr-border)] cursor-pointer" style={{ background: color }}>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => updateColor(idx, e.target.value)}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                  </div>
                  <span className="font-mono text-sm text-[var(--clr-text-primary)] flex-1">{color}</span>
                  <button
                    onClick={() => copyColor(color)}
                    className="w-7 h-7 flex items-center justify-center rounded-[6px] text-[var(--clr-text-muted)] hover:bg-[var(--clr-surface-2)] hover:text-[var(--clr-text-primary)] transition-colors"
                  >
                    {copied === color ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  </button>
                  <button
                    onClick={() => removeColor(idx)}
                    className="w-7 h-7 flex items-center justify-center rounded-[6px] text-[var(--clr-text-muted)] hover:bg-red-500/10 hover:text-[var(--clr-danger)] transition-colors"
                    disabled={colors.length <= 1}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Color strip preview */}
            <div className="flex h-10 rounded-[10px] overflow-hidden border border-[var(--clr-border)]">
              {colors.map((c, i) => (
                <div key={i} style={{ background: c, flex: 1 }} />
              ))}
            </div>
          </div>

          {/* ── Typography ── */}
          <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 space-y-4">
            <p className="text-sm font-bold text-[var(--clr-text-primary)]">Typography</p>

            <div className="grid grid-cols-1 gap-2">
              {FONT_PAIRS.map((pair, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedFont(i)}
                  className={cn(
                    "p-3 rounded-[10px] border text-left transition-all",
                    selectedFont === i
                      ? "border-[var(--clr-secondary)] bg-[var(--clr-secondary)]/10"
                      : "border-[var(--clr-border)] hover:bg-[var(--clr-surface-2)]"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg font-black text-[var(--clr-text-primary)]" style={{ fontFamily: pair.display }}>
                      Aa
                    </span>
                    {selectedFont === i && <Badge variant="primary">Active</Badge>}
                  </div>
                  <p className="text-xs font-semibold text-[var(--clr-text-primary)]">{pair.display} / {pair.body}</p>
                  <p className="text-xs text-[var(--clr-text-muted)]">{pair.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* ── Logo ── */}
          <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 space-y-4">
            <p className="text-sm font-bold text-[var(--clr-text-primary)]">Logo</p>
            <div className="flex items-center gap-4">
              {/* Logo preview */}
              <div
                className="w-20 h-20 rounded-[16px] flex items-center justify-center text-2xl font-black text-white shadow-lg flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${colors[0] || "#5B21B6"}, ${colors[1] || "#6366F1"})` }}
              >
                {logoText.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  label="Initials / Text Mark"
                  value={logoText}
                  maxLength={3}
                  onChange={(e) => setLogoText(e.target.value)}
                  hint="Max 3 characters"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" leftIcon={<Upload size={13} />} className="flex-1">Upload Logo File</Button>
              <Button variant="ghost" size="sm" leftIcon={<RefreshCw size={13} />}>Reset</Button>
            </div>
          </div>

          {/* ── Brand Preview ── */}
          <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 space-y-4">
            <p className="text-sm font-bold text-[var(--clr-text-primary)]">Brand Preview</p>
            <div className="rounded-[12px] overflow-hidden border border-[var(--clr-border)]">
              {/* Header preview */}
              <div className="px-5 py-3 flex items-center justify-between" style={{ background: colors[0] || "#5B21B6" }}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-[6px] bg-white/20 flex items-center justify-center text-white text-xs font-black">
                    {logoText.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-white text-sm font-bold">{brandName}</span>
                </div>
                <div className="flex gap-3">
                  {["Home", "Work", "Contact"].map((n) => (
                    <span key={n} className="text-white/70 text-xs">{n}</span>
                  ))}
                </div>
              </div>
              {/* Hero preview */}
              <div className="p-6 text-center bg-white">
                <h2 className="text-xl font-black mb-2" style={{ color: "#111827", fontFamily: font.display }}>
                  {brandName} — Bold Headline
                </h2>
                <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: font.body }}>
                  Your brand tagline and value proposition goes here.
                </p>
                <button className="px-5 py-2 rounded-[8px] text-white text-sm font-bold" style={{ background: colors[0] }}>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-[var(--clr-text-primary)]">Brand Name</p>
          </div>
          <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Your brand name" />
        </div>
      </div>
    </DashboardShell>
  );
}
