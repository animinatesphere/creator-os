"use client";
import React, { useState, useEffect } from "react";
import { 
  Settings, Type, Layout, Palette, Box, 
  ChevronDown, ChevronRight, Plus, Eye, 
  Lock, MoreHorizontal, AlignLeft, AlignCenter, 
  AlignRight, Copy, Scissors
} from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import type { BlockData, BlockStyle } from "./builder-types";

interface PropertiesPanelProps {
  block: BlockData;
  onChange: (key: string, val: string) => void;
  onStyleChange: (key: keyof BlockStyle, val: string) => void;
  isDevMode?: boolean;
}

export function PropertiesPanel({
  block,
  onChange,
  onStyleChange,
  isDevMode,
}: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState<"design" | "prototype" | "inspect">("design");

  useEffect(() => {
    if (isDevMode) setActiveTab("inspect");
    else setActiveTab("design");
  }, [isDevMode]);

  return (
    <div className="flex flex-col h-full bg-[#2c2c2c] text-[#e6e6e6] font-sans border-l border-white/5">
      {/* Figma-style Tabs */}
      <div className="flex border-b border-white/5 h-10 shrink-0">
        <TabButton active={activeTab === "design"} onClick={() => setActiveTab("design")} label="Design" />
        <TabButton active={activeTab === "prototype"} onClick={() => setActiveTab("prototype")} label="Prototype" />
        <TabButton active={activeTab === "inspect"} onClick={() => setActiveTab("inspect")} label="Inspect" />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === "design" && <DesignTab block={block} onChange={onChange} onStyleChange={onStyleChange} />}
        {activeTab === "inspect" && <InspectTab block={block} />}
        {activeTab === "prototype" && (
          <div className="p-4 text-center opacity-50">
             <p className="text-[11px]">Prototyping features coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DesignTab({ block, onChange, onStyleChange }: { block: BlockData; onChange: any; onStyleChange: any }) {
  return (
    <div className="flex flex-col divide-y divide-white/5">
      {/* Layout Section */}
      <Section title="Layout">
         <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-3 py-2">
            <div className="space-y-1">
               <label className="text-[10px] text-white/40 uppercase font-bold tracking-tighter flex items-center gap-1">
                 <Box size={10} /> Padding T
               </label>
               <Input 
                 value={block.style?.paddingTop || ""} 
                 onChange={(e) => onStyleChange("paddingTop", e.target.value)}
                 className="h-7 bg-transparent border-white/10 text-[11px] focus:border-indigo-500 rounded-sm"
                 placeholder="Auto"
               />
            </div>
            <div className="space-y-1">
               <label className="text-[10px] text-white/40 uppercase font-bold tracking-tighter flex items-center gap-1">
                 <Box size={10} /> Padding B
               </label>
               <Input 
                 value={block.style?.paddingBottom || ""} 
                 onChange={(e) => onStyleChange("paddingBottom", e.target.value)}
                 className="h-7 bg-transparent border-white/10 text-[11px] focus:border-indigo-500 rounded-sm"
                 placeholder="Auto"
               />
            </div>
            <div className="space-y-1">
               <label className="text-[10px] text-white/40 uppercase font-bold tracking-tighter flex items-center gap-1">
                 <Box size={10} /> Radius
               </label>
               <Input 
                 value={block.style?.borderRadius || ""} 
                 onChange={(e) => onStyleChange("borderRadius", e.target.value)}
                 className="h-7 bg-transparent border-white/10 text-[11px] focus:border-indigo-500 rounded-sm"
                 placeholder="0px"
               />
            </div>
         </div>
      </Section>

      {/* Content Section */}
      <Section title="Content" expanded>
         <div className="px-3 py-2 space-y-4">
            {Object.keys(block.props).map(key => {
              if (key === "links" || key === "features" || key === "testimonials" || key === "plans") {
                return (
                  <div key={key} className="space-y-1">
                    <label className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">{key}</label>
                    <Textarea 
                      value={String(block.props[key])} 
                      onChange={(e) => onChange(key, e.target.value)}
                      className="bg-transparent border-white/10 text-[11px] rounded-sm min-h-[80px]"
                    />
                  </div>
                );
              }
              return (
                <div key={key} className="space-y-1">
                  <label className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">{key}</label>
                  <Input 
                    value={String(block.props[key])} 
                    onChange={(e) => onChange(key, e.target.value)}
                    className="h-7 bg-transparent border-white/10 text-[11px] rounded-sm"
                  />
                </div>
              );
            })}
         </div>
      </Section>

      {/* Appearance Section */}
      <Section title="Fill">
         <div className="px-3 py-2">
            <div className="flex items-center gap-3">
               <div 
                 className="w-6 h-6 rounded border border-white/10 shrink-0" 
                 style={{ background: block.style?.background || "#ffffff" }} 
               />
               <Input 
                 value={block.style?.background || ""} 
                 onChange={(e) => onStyleChange("background", e.target.value)}
                 className="h-7 bg-transparent border-white/10 text-[11px] rounded-sm"
                 placeholder="#FFFFFF"
               />
               <span className="text-[10px] text-white/40">100%</span>
            </div>
         </div>
      </Section>

      {/* Effects Section */}
      <Section title="Effects">
         <div className="px-3 py-4 text-center">
            <button className="text-[11px] text-indigo-400 font-medium hover:text-indigo-300 flex items-center gap-1 mx-auto">
               <Plus size={12} /> Add Effect
            </button>
         </div>
      </Section>

      {/* Export Section */}
      <Section title="Export">
         <div className="px-3 py-4">
            <button className="w-full h-8 rounded bg-white/5 border border-white/10 text-[11px] font-bold hover:bg-white/10 transition-colors">
               Export {block.type}
            </button>
         </div>
      </Section>
    </div>
  );
}

function InspectTab({ block }: { block: BlockData }) {
  const cssCode = `/* ${block.type} styles */
.element {
  padding-top: ${block.style?.paddingTop || "4rem"};
  padding-bottom: ${block.style?.paddingBottom || "4rem"};
  border-radius: ${block.style?.borderRadius || "0px"};
  background: ${block.style?.background || "transparent"};
}`;

  return (
    <div className="p-4 space-y-6">
       <div className="space-y-2">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Code Preview</p>
          <pre className="p-3 rounded-md bg-[#1a1a1a] text-[#80ffea] text-[11px] font-mono border border-white/5 whitespace-pre-wrap">
            {cssCode}
          </pre>
          <button className="text-[10px] text-indigo-400 font-bold hover:underline">Copy Code</button>
       </div>
    </div>
  );
}

/* ── UI Components ── */

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex-1 text-[11px] font-medium transition-colors border-b",
        active ? "text-white border-indigo-500 bg-white/5" : "text-white/40 border-transparent hover:text-white/70"
      )}
    >
      {label}
    </button>
  );
}

function Section({ title, children, expanded = false }: { title: string; children: React.ReactNode; expanded?: boolean }) {
  const [isOpen, setIsOpen] = useState(expanded);
  return (
    <div className="flex flex-col">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="flex items-center justify-between px-3 h-10 hover:bg-white/5 transition-colors group"
       >
          <span className="text-[11px] font-bold text-white/90">{title}</span>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
             <Plus size={12} className="text-white/40 hover:text-white" />
             <ChevronDown size={12} className={cn("text-white/40 transition-transform", !isOpen && "-rotate-90")} />
          </div>
       </button>
       {isOpen && children}
    </div>
  );
}
