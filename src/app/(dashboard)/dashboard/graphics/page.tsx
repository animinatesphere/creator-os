"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import {
  PenTool, Download, Undo2, Redo2, Type, Square, Circle,
  Image as ImageIcon, Trash2, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Minus, Plus, Move, Palette,
} from "lucide-react";

/* ============================================
   SIMPLE GRAPHICS MAKER
   Canvas-based design tool with text, shapes & colors.
   (Full Fabric.js integration to be added as next step)
============================================ */

const CANVAS_SIZES = [
  { label: "Social Post", w: 1080, h: 1080 },
  { label: "Story", w: 1080, h: 1920 },
  { label: "Banner", w: 1200, h: 628 },
  { label: "YouTube Thumb", w: 1280, h: 720 },
  { label: "A4 Flyer", w: 794, h: 1123 },
];

const TEMPLATES = [
  { id: "blank", label: "Blank Canvas", bg: "#5B21B6", preview: "linear-gradient(135deg, #5B21B6, #6366F1)" },
  { id: "dark", label: "Dark Minimal", bg: "#0F0F13", preview: "linear-gradient(135deg, #0F0F13, #1A1A23)" },
  { id: "light", label: "Clean White", bg: "#FFFFFF", preview: "linear-gradient(135deg, #F9FAFB, #E5E7EB)" },
  { id: "gradient", label: "Purple Gradient", bg: "gradient", preview: "linear-gradient(135deg, #5B21B6, #10B981)" },
  { id: "warm", label: "Warm Sunset", bg: "#EA580C", preview: "linear-gradient(135deg, #EA580C, #F59E0B)" },
  { id: "ocean", label: "Ocean Blue", bg: "#0C4A6E", preview: "linear-gradient(135deg, #0EA5E9, #0C4A6E)" },
];

interface CanvasElement {
  id: string;
  type: "text" | "rect" | "circle" | "image";
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  fill: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  textAlign?: string;
  color?: string;
  rotation?: number;
}

function uid() { return Math.random().toString(36).slice(2, 9); }

export default function GraphicsMakerPage() {
  const [selectedSize, setSelectedSize] = useState(CANVAS_SIZES[0]);
  const [bgTemplate, setBgTemplate] = useState(TEMPLATES[0]);
  const [elements, setElements] = useState<CanvasElement[]>([
    {
      id: uid(), type: "text", x: 120, y: 180, width: 300, height: 60,
      content: "Your Headline", fill: "#ffffff", fontSize: 48, fontWeight: "900",
      color: "#ffffff", textAlign: "center",
    },
    {
      id: uid(), type: "text", x: 140, y: 260, width: 260, height: 30,
      content: "Your tagline goes here", fill: "transparent", fontSize: 18,
      color: "rgba(255,255,255,0.7)", textAlign: "center",
    },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tool, setTool] = useState<"select" | "text" | "rect" | "circle">("select");
  const canvasRef = useRef<HTMLDivElement>(null);

  const selected = elements.find((e) => e.id === selectedId);

  const addText = () => {
    const el: CanvasElement = {
      id: uid(), type: "text", x: 100, y: 200, width: 200, height: 40,
      content: "New Text", fill: "transparent", fontSize: 24,
      fontWeight: "700", color: "#ffffff", textAlign: "left",
    };
    setElements((p) => [...p, el]);
    setSelectedId(el.id);
  };

  const addRect = () => {
    const el: CanvasElement = {
      id: uid(), type: "rect", x: 80, y: 100, width: 180, height: 80, fill: "#6366F1",
    };
    setElements((p) => [...p, el]);
    setSelectedId(el.id);
  };

  const addCircle = () => {
    const el: CanvasElement = {
      id: uid(), type: "circle", x: 100, y: 120, width: 100, height: 100, fill: "#10B981",
    };
    setElements((p) => [...p, el]);
    setSelectedId(el.id);
  };

  const updateElement = (id: string, key: keyof CanvasElement, val: unknown) => {
    setElements((p) => p.map((e) => e.id === id ? { ...e, [key]: val } : e));
  };

  const deleteElement = (id: string) => {
    setElements((p) => p.filter((e) => e.id !== id));
    setSelectedId(null);
  };

  // Scale factor for canvas display
  const scale = 0.45;
  const displayW = selectedSize.w * scale;
  const displayH = selectedSize.h * scale;

  const getBg = () => {
    if (bgTemplate.bg === "gradient") return "linear-gradient(135deg, #5B21B6, #10B981)";
    return bgTemplate.bg;
  };

  return (
    <DashboardShell title="Graphics Maker">
      <div className="max-w-[1400px] mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
              <PenTool size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--clr-text-primary)]">Graphics Maker</h1>
              <p className="text-sm text-[var(--clr-text-secondary)]">Design social posts, banners, and more</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftIcon={<Undo2 size={13} />}>Undo</Button>
            <Button variant="outline" size="sm" leftIcon={<Redo2 size={13} />}>Redo</Button>
            <Button variant="gradient" size="sm" leftIcon={<Download size={13} />}>Export PNG</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[240px,1fr,260px] gap-4 h-[calc(100vh-200px)]">
          {/* ── Left Panel ── */}
          <div className="flex flex-col gap-3 overflow-y-auto">
            {/* Tools */}
            <div className="rounded-[14px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-3">
              <p className="text-[10px] font-semibold text-[var(--clr-text-muted)] uppercase tracking-widest mb-2">Tools</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: "select", icon: Move, label: "Select" },
                  { id: "text", icon: Type, label: "Text", onClick: addText },
                  { id: "rect", icon: Square, label: "Rectangle", onClick: addRect },
                  { id: "circle", icon: Circle, label: "Circle", onClick: addCircle },
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => { setTool(t.id as typeof tool); t.onClick?.(); }}
                      className={cn(
                        "flex flex-col items-center gap-1 py-2 px-1 rounded-[8px] text-xs font-medium transition-all border",
                        tool === t.id
                          ? "bg-[var(--clr-secondary)]/10 border-[var(--clr-secondary)] text-[var(--clr-secondary)]"
                          : "border-transparent text-[var(--clr-text-secondary)] hover:bg-[var(--clr-surface-2)]"
                      )}
                    >
                      <Icon size={16} />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Canvas Sizes */}
            <div className="rounded-[14px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-3">
              <p className="text-[10px] font-semibold text-[var(--clr-text-muted)] uppercase tracking-widest mb-2">Canvas Size</p>
              <div className="space-y-1">
                {CANVAS_SIZES.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(s)}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 py-1.5 rounded-[7px] text-xs transition-all",
                      selectedSize.label === s.label
                        ? "bg-[var(--clr-secondary)]/10 text-[var(--clr-secondary)] font-semibold"
                        : "text-[var(--clr-text-secondary)] hover:bg-[var(--clr-surface-2)]"
                    )}
                  >
                    <span>{s.label}</span>
                    <span className="text-[var(--clr-text-muted)]">{s.w}×{s.h}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Templates / Backgrounds */}
            <div className="rounded-[14px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-3">
              <p className="text-[10px] font-semibold text-[var(--clr-text-muted)] uppercase tracking-widest mb-2">Templates</p>
              <div className="grid grid-cols-2 gap-1.5">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setBgTemplate(tpl)}
                    className={cn(
                      "flex flex-col gap-1 rounded-[8px] overflow-hidden border-2 transition-all",
                      bgTemplate.id === tpl.id ? "border-[var(--clr-secondary)]" : "border-transparent hover:border-[var(--clr-border)]"
                    )}
                  >
                    <div className="h-10 w-full" style={{ background: tpl.preview }} />
                    <span className="text-[10px] text-[var(--clr-text-secondary)] pb-1 text-center">{tpl.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Center Canvas ── */}
          <div className="flex items-center justify-center bg-[#0a0a0f] rounded-[16px] border border-[var(--clr-border)] overflow-auto">
            <div
              ref={canvasRef}
              className="relative flex-shrink-0 overflow-hidden shadow-2xl cursor-crosshair"
              style={{
                width: displayW,
                height: displayH,
                background: getBg(),
                borderRadius: 8,
              }}
              onClick={(e) => {
                if (e.target === canvasRef.current) setSelectedId(null);
              }}
            >
              {elements.map((el) => (
                <CanvasItem
                  key={el.id}
                  el={el}
                  scale={scale}
                  selected={selectedId === el.id}
                  onClick={() => setSelectedId(el.id)}
                  onChange={(key, val) => updateElement(el.id, key, val)}
                />
              ))}
            </div>
          </div>

          {/* ── Right Properties Panel ── */}
          <div className="flex flex-col gap-3 overflow-y-auto">
            {selected ? (
              <>
                <div className="rounded-[14px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[var(--clr-text-primary)] capitalize">{selected.type} Properties</p>
                    <button
                      onClick={() => deleteElement(selected.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-[7px] text-[var(--clr-danger)] hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {selected.type === "text" && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-[var(--clr-text-secondary)] block mb-1">Content</label>
                        <textarea
                          value={selected.content}
                          onChange={(e) => updateElement(selected.id, "content", e.target.value)}
                          className="w-full px-3 py-2 rounded-[8px] border border-[var(--clr-border)] bg-[var(--clr-surface-2)] text-sm text-[var(--clr-text-primary)] resize-none outline-none focus:border-[var(--clr-secondary)] min-h-[60px]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-medium text-[var(--clr-text-secondary)] block mb-1">Font Size</label>
                          <div className="flex items-center gap-1">
                            <button onClick={() => updateElement(selected.id, "fontSize", (selected.fontSize ?? 24) - 2)} className="w-7 h-7 flex items-center justify-center rounded bg-[var(--clr-surface-2)] text-[var(--clr-text-muted)] hover:bg-[var(--clr-border)]"><Minus size={12} /></button>
                            <span className="flex-1 text-center text-sm font-mono text-[var(--clr-text-primary)]">{selected.fontSize ?? 24}</span>
                            <button onClick={() => updateElement(selected.id, "fontSize", (selected.fontSize ?? 24) + 2)} className="w-7 h-7 flex items-center justify-center rounded bg-[var(--clr-surface-2)] text-[var(--clr-text-muted)] hover:bg-[var(--clr-border)]"><Plus size={12} /></button>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[var(--clr-text-secondary)] block mb-1">Color</label>
                          <div className="flex items-center gap-2 h-8 px-2 rounded-[8px] border border-[var(--clr-border)] bg-[var(--clr-surface-2)]">
                            <input type="color" value={selected.color ?? "#ffffff"} onChange={(e) => updateElement(selected.id, "color", e.target.value)} className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent" />
                            <span className="text-xs font-mono text-[var(--clr-text-primary)]">{selected.color}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[var(--clr-text-secondary)] block mb-1">Style</label>
                        <div className="flex gap-1">
                          <button
                            onClick={() => updateElement(selected.id, "fontWeight", selected.fontWeight === "900" ? "400" : "900")}
                            className={cn("px-2.5 py-1 rounded text-xs font-bold transition-colors", selected.fontWeight === "900" ? "bg-[var(--clr-secondary)] text-white" : "bg-[var(--clr-surface-2)] text-[var(--clr-text-muted)] hover:bg-[var(--clr-border)]")}
                          >B</button>
                          <button
                            onClick={() => updateElement(selected.id, "fontStyle", selected.fontStyle === "italic" ? "normal" : "italic")}
                            className={cn("px-2.5 py-1 rounded text-xs italic transition-colors", selected.fontStyle === "italic" ? "bg-[var(--clr-secondary)] text-white" : "bg-[var(--clr-surface-2)] text-[var(--clr-text-muted)] hover:bg-[var(--clr-border)]")}
                          >I</button>
                          {(["left", "center", "right"] as const).map((a) => {
                            const Icon = a === "left" ? AlignLeft : a === "center" ? AlignCenter : AlignRight;
                            return (
                              <button key={a} onClick={() => updateElement(selected.id, "textAlign", a)}
                                className={cn("px-2 py-1 rounded transition-colors", selected.textAlign === a ? "bg-[var(--clr-secondary)] text-white" : "bg-[var(--clr-surface-2)] text-[var(--clr-text-muted)] hover:bg-[var(--clr-border)]")}>
                                <Icon size={12} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {(selected.type === "rect" || selected.type === "circle") && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-[var(--clr-text-secondary)] block mb-1">Fill Color</label>
                        <div className="flex items-center gap-2 h-9 px-3 rounded-[8px] border border-[var(--clr-border)] bg-[var(--clr-surface-2)]">
                          <input type="color" value={selected.fill} onChange={(e) => updateElement(selected.id, "fill", e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent" />
                          <span className="text-sm font-mono text-[var(--clr-text-primary)]">{selected.fill}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Position & Size */}
                  <div>
                    <label className="text-xs font-medium text-[var(--clr-text-secondary)] block mb-1.5">Position</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[["X", "x"], ["Y", "y"], ["W", "width"], ["H", "height"]].map(([label, key]) => (
                        <div key={key}>
                          <span className="text-[10px] text-[var(--clr-text-muted)]">{label}</span>
                          <input
                            type="number"
                            value={Math.round(selected[key as keyof CanvasElement] as number / scale)}
                            onChange={(e) => updateElement(selected.id, key as keyof CanvasElement, Number(e.target.value) * scale)}
                            className="w-full h-7 px-2 rounded-[6px] border border-[var(--clr-border)] bg-[var(--clr-surface-2)] text-xs text-[var(--clr-text-primary)] outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-[14px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 flex flex-col items-center text-center gap-3 py-10">
                <Palette size={24} className="text-[var(--clr-text-muted)]" />
                <p className="text-sm text-[var(--clr-text-muted)]">Select an element on the canvas to edit its properties.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

/* ── Canvas Element Renderer ── */
function CanvasItem({
  el, scale, selected, onClick, onChange,
}: {
  el: CanvasElement;
  scale: number;
  selected: boolean;
  onClick: () => void;
  onChange: (key: keyof CanvasElement, val: unknown) => void;
}) {
  const style: React.CSSProperties = {
    position: "absolute",
    left: el.x,
    top: el.y,
    width: el.width,
    height: el.type === "text" ? "auto" : el.height,
    cursor: "pointer",
    outline: selected ? "2px solid #6366F1" : "none",
    outlineOffset: 2,
    borderRadius: el.type === "circle" ? "50%" : 4,
    background: el.type !== "text" ? el.fill : undefined,
    boxShadow: selected ? "0 0 0 3px rgba(99,102,241,0.3)" : undefined,
  };

  if (el.type === "text") {
    return (
      <div style={style} onClick={onClick}>
        <span
          style={{
            display: "block",
            fontSize: (el.fontSize ?? 24) * scale,
            fontWeight: el.fontWeight ?? "400",
            fontStyle: el.fontStyle ?? "normal",
            color: el.color ?? "#fff",
            textAlign: (el.textAlign as "left" | "center" | "right") ?? "left",
            lineHeight: 1.2,
            whiteSpace: "pre-wrap",
            userSelect: "none",
          }}
        >
          {el.content}
        </span>
      </div>
    );
  }

  return <div style={style} onClick={onClick} />;
}
