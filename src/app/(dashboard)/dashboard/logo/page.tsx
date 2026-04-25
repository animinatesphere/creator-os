"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { 
  Zap, Sparkles, Download, RefreshCw, Palette, Type, 
  Layout, Shield, Star, Rocket, Target, Heart 
} from "lucide-react";

/* ============================================
   LOGO MAKER
   Uses AI to generate SVG concepts and descriptors.
============================================ */

const LOGO_STYLES = [
  { id: "minimal", label: "Minimalist", icon: Layout, desc: "Clean lines and simple shapes" },
  { id: "modern", label: "Modern", icon: Rocket, desc: "Sleek and professional" },
  { id: "playful", label: "Playful", icon: Heart, desc: "Friendly and approachable" },
  { id: "luxurious", label: "Luxurious", icon: Star, desc: "Premium and elegant" },
  { id: "tech", label: "Tech", icon: Zap, desc: "Sharp and futuristic" },
];

export default function LogoMakerPage() {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [style, setStyle] = useState("minimal");
  const [loading, setLoading] = useState(false);
  const [concept, setConcept] = useState<string | null>(null);
  const [color, setColor] = useState("#5B21B6");

  const handleGenerate = async () => {
    if (!brandName) return;
    setLoading(true);
    setConcept(null);
    
    try {
      const res = await fetch("/api/ai/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ 
            role: "user", 
            content: `Generate 3 creative logo concepts for a brand named "${brandName}" in the "${industry}" industry. Style: ${style}. For each concept, provide:
            1. An icon description (e.g., "A stylized bird merging into a lightning bolt")
            2. Meaning behind the concept
            3. Recommended color palette`
          }],
          temperature: 0.8
        })
      });
      const data = await res.json();
      setConcept(data.text);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardShell title="AI Logo Maker">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--clr-text-primary)]">Logo Maker</h1>
            <p className="text-sm text-[var(--clr-text-secondary)]">AI-assisted logo generation & design</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px,1fr] gap-6">
          {/* Config */}
          <div className="space-y-4">
            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 space-y-4">
              <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">Brand Info</p>
              <Input 
                label="Brand Name" 
                placeholder="e.g. CreatorOS" 
                value={brandName} 
                onChange={(e) => setBrandName(e.target.value)} 
              />
              <Input 
                label="Industry" 
                placeholder="e.g. Software, Design" 
                value={industry} 
                onChange={(e) => setIndustry(e.target.value)} 
              />
            </div>

            <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 space-y-3">
              <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wider">Style</p>
              <div className="space-y-2">
                {LOGO_STYLES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-[10px] border text-left transition-all",
                        style === s.id 
                          ? "border-[var(--clr-secondary)] bg-[var(--clr-secondary)]/10 text-[var(--clr-text-primary)]" 
                          : "border-transparent hover:bg-[var(--clr-surface-2)] text-[var(--clr-text-secondary)]"
                      )}
                    >
                      <Icon size={16} className={style === s.id ? "text-[var(--clr-secondary)]" : "text-[var(--clr-text-muted)]"} />
                      <div>
                        <p className="text-sm font-bold">{s.label}</p>
                        <p className="text-[10px] opacity-70">{s.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button 
              variant="gradient" 
              className="w-full" 
              onClick={handleGenerate} 
              loading={loading}
              disabled={!brandName}
            >
              Generate Concepts
            </Button>
          </div>

          {/* Preview / Results */}
          <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] flex flex-col min-h-[500px] overflow-hidden">
             <div className="p-10 flex-1 flex flex-col items-center justify-center text-center gap-6">
                {concept ? (
                  <div className="w-full max-w-2xl text-left space-y-6">
                    <div className="p-8 rounded-[20px] bg-white border border-[var(--clr-border)] shadow-sm flex flex-col items-center text-center gap-4">
                       <div className="w-24 h-24 rounded-[20px] flex items-center justify-center text-4xl font-black text-white shadow-lg"
                         style={{ background: color }}>
                         {brandName.slice(0, 1).toUpperCase()}
                       </div>
                       <h2 className="text-2xl font-black" style={{ color }}>{brandName}</h2>
                       <div className="flex gap-2">
                         <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                         <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>Export SVG</Button>
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="font-bold text-[var(--clr-text-primary)]">AI-Suggested Concepts:</p>
                      <pre className="whitespace-pre-wrap text-sm text-[var(--clr-text-secondary)] font-sans leading-relaxed">
                        {concept}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 max-w-sm">
                    <div className="w-16 h-16 rounded-[20px] gradient-bg-subtle flex items-center justify-center">
                      <Sparkles size={28} className="text-[var(--clr-secondary)]" />
                    </div>
                    <div>
                      <p className="font-bold text-[var(--clr-text-primary)] mb-1">Brand Your Vision</p>
                      <p className="text-sm text-[var(--clr-text-secondary)]">
                        Enter your brand name and industry to generate AI logo concepts and styles.
                      </p>
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
