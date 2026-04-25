"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Plus, Trash2, GripVertical, Sparkles, ChevronRight, Star, Eye, EyeOff, Lock } from "lucide-react";
import type { BlockData, BlockStyle } from "./builder-types";

/* ──────────────────────────────────────────────────────────────
   CANVAS BLOCK WRAPPER
────────────────────────────────────────────────────────────── */
export function CanvasBlock({
  block, selected, onClick, onMoveUp, onMoveDown, onDuplicate,
  onDelete, onToggleVisibility, dragging, dragOver, onDragStart,
  onDragOver, onDrop, previewMode, globalFont, viewMode,
}: {
  block: BlockData; selected: boolean; onClick: (e: React.MouseEvent) => void;
  onMoveUp: () => void; onMoveDown: () => void; onDuplicate: () => void;
  onDelete: () => void; onToggleVisibility: () => void; dragging: boolean;
  dragOver: boolean; onDragStart: () => void; onDragOver: () => void;
  onDrop: () => void; previewMode: boolean; globalFont: string;
  viewMode: "desktop" | "mobile";
}) {
  return (
    <div
      className={cn(
        "relative group transition-all duration-150",
        !previewMode && "cursor-default",
        selected && "ring-2 ring-indigo-500 ring-offset-0 z-50",
        dragOver && "border-t-2 border-indigo-500",
        dragging && "opacity-40 grayscale",
        block.hidden && !previewMode && "opacity-10"
      )}
      onClick={onClick}
    >
      {/* Figma-style Selection Handles */}
      {selected && !previewMode && (
        <>
           {/* Corner Handles */}
           <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-indigo-500 z-50" />
           <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-indigo-500 z-50" />
           <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-indigo-500 z-50" />
           <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-indigo-500 z-50" />
           
           {/* Label */}
           <div className="absolute -top-6 left-0 bg-indigo-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1 shadow-lg">
              {block.type}
              <div className="flex items-center gap-0.5 ml-1">
                 <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="hover:text-red-200"><Trash2 size={10} /></button>
              </div>
           </div>
        </>
      )}

      {/* Block Type Label for hovering */}
      {!selected && !previewMode && (
        <div className="absolute -top-4 left-0 text-[9px] font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 px-1 rounded-sm border border-indigo-100 pointer-events-none">
           {block.type}
        </div>
      )}

      <BlockRenderer block={block} globalFont={globalFont} viewMode={viewMode} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   BLOCK RENDERER
────────────────────────────────────────────────────────────── */
export function BlockRenderer({ block, globalFont, viewMode }: { block: BlockData; globalFont: string; viewMode: "desktop" | "mobile" }) {
  const p = block.props;
  const bStyle = viewMode === "mobile" && block.mobileStyle ? { ...block.style, ...block.mobileStyle } : block.style;
  const commonStyle: React.CSSProperties = {
    paddingTop: bStyle?.paddingTop || "4rem",
    paddingBottom: bStyle?.paddingBottom || "4rem",
    borderRadius: bStyle?.borderRadius || "0px",
    background: bStyle?.background || "transparent",
    fontFamily: globalFont || "inherit",
    width: "100%",
  };

  switch (block.type) {
    case "navbar": {
       let navLinks: { label: string; href: string }[] = [];
       try { navLinks = JSON.parse(String(p.links)); } catch {}
       return (
         <nav className={cn("w-full px-10 py-5 flex items-center justify-between z-50", p.sticky === "true" && "sticky top-0 backdrop-blur-md")} style={{ ...commonStyle, paddingTop: "1.25rem", paddingBottom: "1.25rem", background: bStyle?.background || "rgba(255,255,255,0.9)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm">C</div>
              <span className="font-black tracking-tight text-gray-900">{String(p.logo)}</span>
            </div>
            <div className="hidden md:flex items-center gap-8">{navLinks.map((link, i) => (<a key={i} href={link.href} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">{link.label}</a>))}</div>
            <button className="px-5 py-2 rounded-full text-xs font-bold text-white bg-indigo-600 shadow-lg shadow-indigo-600/20">{String(p.ctaText)}</button>
         </nav>
       );
    }

    case "hero": {
      const heroStyle: React.CSSProperties = {
        ...commonStyle,
        paddingTop: bStyle?.paddingTop || "120px",
        paddingBottom: bStyle?.paddingBottom || "120px",
        background: bStyle?.background || "linear-gradient(135deg, #0a001a 0%, #1a0050 50%, #0d0035 100%)",
      };
      return (
        <div className="min-h-[600px] flex flex-col items-center justify-center text-center px-8 relative overflow-hidden" style={heroStyle}>
          {!bStyle?.background && (
            <>
              <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[120px]" style={{ background: "#6366F1" }} />
              <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-15 blur-[100px]" style={{ background: "#10B981" }} />
            </>
          )}
          <div className="relative z-10 max-w-[800px]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border" style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
              <Sparkles size={11} /> Next-Gen Platform
            </div>
            <h1 className="text-6xl font-black mb-6 leading-[1.1]" style={{ color: "#F3F4F6", letterSpacing: "-0.04em" }}>{String(p.headline)}</h1>
            <p className="text-xl mb-10 leading-relaxed max-w-xl mx-auto opacity-70" style={{ color: "#9CA3AF" }}>{String(p.subheadline)}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="px-8 py-4 rounded-xl font-bold text-white text-sm transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #5B21B6, #6366F1)", boxShadow: "0 12px 30px rgba(91,33,182,0.4)" }}>{String(p.ctaText)}</button>
              {p.secondaryCta && <button className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors" style={{ color: "#9CA3AF" }}>{String(p.secondaryCta)} <ChevronRight size={16} /></button>}
            </div>
          </div>
        </div>
      );
    }

    case "features": {
      let features: { icon: string; title: string; desc: string }[] = [];
      try { features = JSON.parse(String(p.features)); } catch {}
      return (
        <div className="px-10" style={{ ...commonStyle, background: bStyle?.background || "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4 text-gray-900 tracking-tight">{String(p.title)}</h2>
              <p className="text-gray-500 max-w-lg mx-auto text-lg">{String(p.subtitle)}</p>
            </div>
            <div className={cn("grid gap-8", viewMode === "mobile" ? "grid-cols-1" : "grid-cols-3")}>
              {features.map((f, i) => (
                <div key={i} className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900">{f.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "testimonials": {
      let testimonials: { quote: string; name: string; role: string }[] = [];
      try { testimonials = JSON.parse(String(p.testimonials)); } catch {}
      return (
        <div className="px-10" style={{ ...commonStyle, background: bStyle?.background || "#F9FAFB" }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-16 text-gray-900 tracking-tight">{String(p.title)}</h2>
            <div className={cn("grid gap-6", viewMode === "mobile" ? "grid-cols-1" : "grid-cols-3")}>
              {testimonials.map((t, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm">
                  <div className="flex gap-1 mb-4 text-amber-400">{[0,1,2,3,4].map(s => <Star key={s} size={14} className="fill-current" />)}</div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-indigo-100" />
                     <div>
                        <p className="font-bold text-gray-900">{t.name}</p>
                        <p className="text-xs text-indigo-500 font-medium uppercase tracking-wider">{t.role}</p>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "pricing": {
      let plans: { name: string; price: string; period: string; features: string[]; cta: string; highlighted: boolean }[] = [];
      try { plans = JSON.parse(String(p.plans)); } catch {}
      return (
        <div className="px-10" style={{ ...commonStyle, background: bStyle?.background || "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4 text-gray-900 tracking-tight">{String(p.title)}</h2>
              <p className="text-gray-500 text-lg">{String(p.subtitle)}</p>
            </div>
            <div className={cn("grid gap-6 max-w-5xl mx-auto", viewMode === "mobile" ? "grid-cols-1" : "grid-cols-3")}>
              {plans.map((plan, i) => (
                <div key={i} className={cn("p-8 rounded-[32px] border transition-all flex flex-col", plan.highlighted ? "border-indigo-500 bg-indigo-600 text-white shadow-2xl shadow-indigo-500/40 scale-105 z-10" : "border-gray-100 bg-gray-50")}>
                  <p className={cn("text-xs font-bold uppercase tracking-widest mb-4", plan.highlighted ? "text-indigo-200" : "text-gray-400")}>{plan.name}</p>
                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                    <span className={cn("text-sm opacity-60", plan.highlighted ? "text-indigo-100" : "text-gray-500")}>{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0", plan.highlighted ? "bg-white/20 text-white" : "bg-indigo-500/10 text-indigo-500")}>✓</div>
                        <span className={plan.highlighted ? "text-indigo-50" : "text-gray-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={cn("w-full py-4 rounded-2xl font-bold text-sm transition-all", plan.highlighted ? "bg-white text-indigo-600 shadow-xl" : "bg-indigo-600 text-white hover:bg-indigo-700")}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "cta":
      return (
        <div className="px-10 flex flex-col items-center text-center relative overflow-hidden" style={{ ...commonStyle, background: bStyle?.background || "linear-gradient(135deg,#5B21B6 0%,#6366F1 100%)" }}>
          <div className="relative z-10">
            <h2 className="text-5xl font-black text-white mb-6 tracking-tight">{String(p.headline)}</h2>
            <p className="text-xl mb-10 max-w-2xl opacity-80" style={{ color: "rgba(255,255,255,0.9)" }}>{String(p.subtext)}</p>
            <button className="px-10 py-5 rounded-2xl font-bold text-indigo-600 text-lg transition-all hover:scale-105 shadow-2xl" style={{ background: "#ffffff" }}>{String(p.ctaText)}</button>
          </div>
        </div>
      );

    case "image":
      return (
        <div className="px-10 flex flex-col" style={{ ...commonStyle, alignItems: p.align === "left" ? "flex-start" : p.align === "right" ? "flex-end" : "center" }}>
          <div className="relative group/img overflow-hidden rounded-[40px] shadow-2xl">
            <img src={String(p.src)} alt={String(p.alt)} className="max-w-full transition-transform duration-500 group-hover/img:scale-105" style={{ width: String(p.width), objectFit: "cover" }} />
          </div>
          {p.caption && <p className="mt-6 text-sm text-gray-400 italic font-medium">{String(p.caption)}</p>}
        </div>
      );

    case "text":
      return (
        <div style={commonStyle} className="px-10">
          <div className="max-w-3xl mx-auto">
            <p className="leading-relaxed font-medium text-gray-700" style={{ textAlign: (p.align as any) || "left", fontSize: p.size === "lg" ? "1.5rem" : "1.125rem" }}>{String(p.content)}</p>
          </div>
        </div>
      );

    default: return null;
  }
}
