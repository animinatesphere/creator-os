"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Globe,
  Plus,
  Eye,
  EyeOff,
  Settings,
  Save,
  Smartphone,
  Monitor,
  ArrowLeft,
  Server,
  CheckCircle,
  Grid,
  Terminal,
  MousePointer2,
  Hand,
  Square,
  Type,
  Image as ImageIcon,
  ChevronDown,
  Layers,
  FileText,
  Menu,
  X,
  Rocket,
  ChevronRight,
  ChevronLeft,
  Search,
  PenTool,
  MessageCircle,
  Minus,
  Maximize2,
  Share2,
  Play,
  Share,
  Lock as LockIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BLOCK_LIBRARY, TEMPLATES, DEFAULT_PAGES } from "./builder-data";
import { CanvasBlock } from "./BlockRenderer";
import { PropertiesPanel } from "./PropertiesPanel";
import { uid, type BlockData, type BlockStyle, type PageData, type BlockDefinition } from "./builder-types";

export default function LandingPageBuilderPage() {
  const [pages, setPages] = useState<PageData[]>(DEFAULT_PAGES);
  const [activePageId, setActivePageId] = useState<string>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [previewMode, setPreviewMode] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [panelTab, setPanelTab] = useState<"layers" | "assets">("layers");
  const [globalFont, setGlobalFont] = useState("Inter");
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployStep, setDeployStep] = useState(0); 
  const [liveUrl, setLiveUrl] = useState("");
  const [showGrid, setShowGrid] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [selectedTool, setSelectedTool] = useState<"select" | "frame" | "text" | "media" | "hand">("select");
  const [zoom, setZoom] = useState(100);
  const [pagesExpanded, setPagesExpanded] = useState(true);

  const activePage = useMemo(() => pages.find(p => p.id === activePageId) || pages[0], [pages, activePageId]);
  const blocks = activePage.blocks;
  const selectedBlock = blocks.find((b) => b.id === selectedId) ?? null;

  const addPage = () => {
    const newPage: PageData = { id: uid(), name: `Page ${pages.length + 1}`, blocks: [] };
    setPages([...pages, newPage]);
    setActivePageId(newPage.id);
  };

  const deletePage = (id: string) => {
    if (pages.length === 1) return;
    const newPages = pages.filter(p => p.id !== id);
    setPages(newPages);
    if (activePageId === id) setActivePageId(newPages[0].id);
  };

  const setBlocks = useCallback((updater: (prev: BlockData[]) => BlockData[]) => {
    setPages(prevPages => prevPages.map(p => p.id === activePageId ? { ...p, blocks: updater(p.blocks) } : p));
  }, [activePageId]);

  const addBlock = (def: BlockDefinition) => {
    const newBlock: BlockData = { id: uid(), type: def.type, props: { ...def.defaultProps } };
    setBlocks((prev) => [...prev, newBlock]);
    setSelectedId(newBlock.id);
  };

  const updateBlockProp = (id: string, key: string, value: string) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, props: { ...b.props, [key]: value } } : b)));
  };

  const updateBlockStyle = (id: string, key: keyof BlockStyle, value: string) => {
    setBlocks((prev) => prev.map((b) => {
        if (b.id !== id) return b;
        if (viewMode === "mobile") return { ...b, mobileStyle: { ...(b.mobileStyle || {}), [key]: value } };
        return { ...b, style: { ...(b.style || {}), [key]: value } };
      })
    );
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (previewMode) return;
    
    // If clicking the background, deselect
    if (e.target === e.currentTarget) {
      setSelectedId(null);
    }

    if (selectedTool === "select") return;

    let blockType: any = null;
    if (selectedTool === "frame") blockType = "hero";
    if (selectedTool === "text") blockType = "text";
    if (selectedTool === "media") blockType = "image";

    if (blockType) {
      const def = BLOCK_LIBRARY.find(b => b.type === blockType);
      if (def) addBlock(def);
      setSelectedTool("select"); // Switch back to select after placing
    }
  };

  const handleDeploy = async () => {
    setShowDeployModal(true);
    setDeployStep(1);
    await new Promise(r => setTimeout(r, 2000));
    setDeployStep(2);
    await new Promise(r => setTimeout(r, 2500));
    setDeployStep(3);
    setLiveUrl(`https://creatoros-project-${Math.random().toString(36).substring(7)}.vercel.app`);
  };

  /* ── Keyboard Shortcuts ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      const key = e.key.toLowerCase();
      if (key === "v") setSelectedTool("select");
      if (key === "f" || key === "a") setSelectedTool("frame");
      if (key === "t") setSelectedTool("text");
      if (key === "h") setSelectedTool("hand");
      if (key === "g") setShowGrid(prev => !prev);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-[#e6e6e6] overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* ── Figma Floating Header ── */}
      <header className="h-12 flex items-center justify-between px-2 bg-[#2c2c2c] border-b border-black/20 z-[100] shrink-0">
        <div className="flex items-center gap-1">
          <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-md text-indigo-500">
             <div className="w-5 h-5 flex flex-col gap-0.5">
                <div className="flex gap-0.5"><div className="w-2 h-2 rounded-full bg-red-500" /><div className="w-2 h-2 rounded-full bg-blue-500" /></div>
                <div className="flex gap-0.5"><div className="w-2 h-2 rounded-full bg-purple-500" /><div className="w-2 h-2 rounded-full bg-green-500" /></div>
             </div>
          </Link>
          
          <div className="h-4 w-px bg-white/10 mx-1" />
          
          <div className="flex items-center gap-0.5">
            <ToolIconButton 
              icon={MousePointer2} 
              active={selectedTool === "select"} 
              onClick={() => setSelectedTool("select")}
              title="Move (V)"
            />
            <ToolIconButton 
              icon={Square} 
              active={selectedTool === "frame"} 
              onClick={() => setSelectedTool("frame")}
              title="Frame (F)"
            />
            <ToolIconButton 
              icon={PenTool} 
              active={false}
              onClick={() => {}}
              title="Pen (P)"
            />
            <ToolIconButton 
              icon={Type} 
              active={selectedTool === "text"} 
              onClick={() => setSelectedTool("text")}
              title="Text (T)"
            />
            <ToolIconButton 
              icon={ImageIcon} 
              active={selectedTool === "media"} 
              onClick={() => setSelectedTool("media")}
              title="Media"
            />
            <ToolIconButton 
              icon={Hand} 
              active={selectedTool === "hand"} 
              onClick={() => setSelectedTool("hand")}
              title="Hand (H)"
            />
            <ToolIconButton 
              icon={MessageCircle} 
              active={false}
              onClick={() => {}}
              title="Comments (C)"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-md border border-white/5 group hover:border-white/10 transition-colors">
              <span className="text-[11px] font-medium text-white/40">CreatorOS /</span>
              <span className="text-[11px] font-bold text-white/90">{activePage.name}</span>
              <ChevronDown size={12} className="text-white/30 group-hover:text-white" />
           </div>
        </div>

        <div className="flex items-center gap-2">
           <div className="flex items-center gap-0.5 bg-black/20 rounded-md p-0.5 mr-2">
             <ViewToggle icon={Monitor} active={viewMode === "desktop"} onClick={() => setViewMode("desktop")} />
             <ViewToggle icon={Smartphone} active={viewMode === "mobile"} onClick={() => setViewMode("mobile")} />
           </div>

           <button className="p-2 hover:bg-white/5 rounded-md text-white/60"><Play size={16} /></button>
           <button onClick={() => setPreviewMode(!previewMode)} className={cn("p-2 rounded-md transition-colors", previewMode ? "bg-indigo-500 text-white" : "hover:bg-white/5 text-white/70")}>
             {previewMode ? <EyeOff size={18} /> : <Eye size={18} />}
           </button>
           
           <Button onClick={handleDeploy} className="h-7 bg-indigo-500 hover:bg-indigo-600 text-white text-[11px] font-bold px-3 rounded-md ml-1 shadow-lg shadow-indigo-500/20">
             Share
           </Button>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* ── Left Sidebar (Layers & Assets) ── */}
        <AnimatePresence>
          {leftSidebarOpen && !previewMode && (
            <motion.aside 
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              className="w-[240px] flex-shrink-0 bg-[#2c2c2c] border-r border-black/20 flex flex-col z-[80]"
            >
              {/* Pages Accordion */}
              <div className="flex flex-col border-b border-black/10">
                <button 
                  onClick={() => setPagesExpanded(!pagesExpanded)}
                  className="flex items-center gap-2 px-3 h-10 hover:bg-white/5 transition-colors group"
                >
                  <ChevronDown size={12} className={cn("text-white/40 transition-transform", !pagesExpanded && "-rotate-90")} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">Pages</span>
                  <Plus size={12} className="ml-auto opacity-0 group-hover:opacity-100 text-white/40 hover:text-white" onClick={(e) => { e.stopPropagation(); addPage(); }} />
                </button>
                
                {pagesExpanded && (
                  <div className="pb-2">
                    {pages.map(page => (
                      <PageRow 
                        key={page.id} 
                        name={page.name} 
                        active={activePageId === page.id} 
                        onClick={() => setActivePageId(page.id)}
                        onDelete={() => deletePage(page.id)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="flex h-10 border-b border-black/10">
                <SidebarTab active={panelTab === "layers"} onClick={() => setPanelTab("layers")} label="Layers" />
                <SidebarTab active={panelTab === "assets"} onClick={() => setPanelTab("assets")} label="Assets" />
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {panelTab === "layers" ? (
                   <div className="py-2">
                      {blocks.length === 0 ? (
                        <div className="p-8 text-center text-white/20">
                           <Layers size={32} className="mx-auto mb-2 opacity-20" />
                           <p className="text-[10px] font-medium">No layers yet</p>
                        </div>
                      ) : (
                        blocks.map((block, i) => (
                          <LayerRow 
                            key={block.id} 
                            block={block} 
                            selected={selectedId === block.id} 
                            onClick={() => setSelectedId(block.id)} 
                          />
                        ))
                      )}
                   </div>
                ) : (
                  <div className="p-3 grid grid-cols-2 gap-2">
                    {BLOCK_LIBRARY.map(def => (
                      <AssetCard key={def.type} def={def} onClick={() => addBlock(def)} />
                    ))}
                  </div>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ── Canvas Area ── */}
        <main className="flex-1 bg-[#1e1e1e] relative overflow-hidden flex flex-col">
           {/* Context Menu Bar (Figma-style) */}
           {!previewMode && (
             <div className="h-8 flex items-center px-4 bg-[#2c2c2c] border-b border-black/10 text-[10px] font-medium text-white/30">
               <span className="flex items-center gap-1 hover:text-white cursor-default">Main Canvas <ChevronRight size={10} /></span>
               <span className="text-white/60 ml-2">{activePage.name}</span>
             </div>
           )}

           <div 
             className="flex-1 overflow-auto bg-[#1e1e1e] scrollbar-hide flex items-center justify-center p-20 [background-image:radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px]"
             onClick={handleCanvasClick}
             style={{ 
               cursor: selectedTool === "hand" ? "grab" : selectedTool !== "select" ? "crosshair" : "default" 
             }}
           >
              <div 
                className={cn(
                  "bg-white shadow-[0_0_100px_rgba(0,0,0,0.5)] transition-all duration-700 relative",
                  viewMode === "mobile" ? "w-[390px] min-h-[844px]" : "w-full max-w-[1200px] min-h-[1000px]"
                )}
                style={{ transform: `scale(${zoom / 100})` }}
              >
                 {showGrid && (
                    <div className="absolute inset-0 z-10 pointer-events-none grid grid-cols-12 gap-4 px-4 h-full">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="h-full bg-indigo-500/[0.05] border-x border-indigo-500/[0.08]" />
                      ))}
                    </div>
                  )}
                  
                  {blocks.map((block) => (
                    <CanvasBlock
                      key={block.id} block={block} selected={selectedId === block.id && !previewMode}
                      onClick={(e) => { e.stopPropagation(); if (!previewMode) setSelectedId(block.id); }}
                      onMoveUp={() => {}} onMoveDown={() => {}} onDuplicate={() => {}} onDelete={() => {}} onToggleVisibility={() => {}}
                      dragging={draggingId === block.id} dragOver={dragOverId === block.id} onDragStart={() => {}} onDragOver={() => {}} onDrop={() => {}}
                      previewMode={previewMode} globalFont={globalFont} viewMode={viewMode}
                    />
                  ))}

                  {blocks.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-200">
                       <Plus size={40} className="mb-4 opacity-10" />
                       <p className="text-sm font-bold opacity-30 uppercase tracking-widest">Select a Frame or Component</p>
                    </div>
                  )}
              </div>
           </div>

           {/* Canvas Footer Tools */}
           <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-50">
              <div className="flex items-center gap-1 bg-[#2c2c2c] border border-black/20 rounded-md p-1 pointer-events-auto shadow-2xl">
                 <button onClick={() => setLeftSidebarOpen(!leftSidebarOpen)} className="p-1.5 hover:bg-white/5 rounded text-white/40 hover:text-white"><SidebarToggleIcon side="left" open={leftSidebarOpen} /></button>
                 <div className="w-px h-3 bg-white/10 mx-1" />
                 <button onClick={() => setShowGrid(!showGrid)} className={cn("p-1.5 rounded", showGrid ? "text-indigo-400" : "text-white/40")}><Grid size={14} /></button>
              </div>

              <div className="flex items-center gap-2 bg-[#2c2c2c] border border-black/20 rounded-md p-1 pointer-events-auto shadow-2xl">
                 <button onClick={() => setZoom(Math.max(10, zoom - 10))} className="p-1 text-white/40 hover:text-white"><Minus size={14} /></button>
                 <span className="text-[10px] font-bold text-white/90 min-w-[32px] text-center">{zoom}%</span>
                 <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="p-1 text-white/40 hover:text-white"><Plus size={14} /></button>
                 <div className="w-px h-3 bg-white/10 mx-1" />
                 <button onClick={() => setRightSidebarOpen(!rightSidebarOpen)} className="p-1.5 hover:bg-white/5 rounded text-white/40 hover:text-white"><SidebarToggleIcon side="right" open={rightSidebarOpen} /></button>
              </div>
           </div>
        </main>

        {/* ── Right Sidebar (Inspector) ── */}
        <AnimatePresence>
          {rightSidebarOpen && !previewMode && (
            <motion.aside 
              initial={{ x: 280 }} animate={{ x: 0 }} exit={{ x: 280 }}
              className="w-[280px] flex-shrink-0 bg-[#2c2c2c] z-[80]"
            >
              {selectedBlock ? (
                <PropertiesPanel
                  block={selectedBlock}
                  onChange={(key, val) => updateBlockProp(selectedId!, key, val)}
                  onStyleChange={(key, val) => updateBlockStyle(selectedId!, key, val)}
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-10">
                   <Maximize2 size={48} className="mb-4" />
                   <p className="text-xs font-black uppercase tracking-widest leading-relaxed">Select an element to view properties</p>
                </div>
              )}
            </motion.aside>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

/* ── UI Components ── */

function ToolIconButton({ icon: Icon, active, onClick, title }: { icon: any; active?: boolean; onClick: () => void; title?: string }) {
  return (
    <button 
      onClick={onClick}
      title={title}
      className={cn("p-1.5 rounded transition-colors group", active ? "bg-indigo-500 text-white" : "text-white/60 hover:bg-white/5 hover:text-white")}
    >
      <Icon size={16} className={cn("transition-transform group-active:scale-90")} />
    </button>
  );
}

function ViewToggle({ icon: Icon, active, onClick }: { icon: any; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn("p-1.5 rounded transition-all", active ? "bg-[#3e3e3e] text-white shadow-inner" : "text-white/40 hover:text-white")}>
      <Icon size={14} />
    </button>
  );
}

function SidebarTab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className={cn("flex-1 text-[11px] font-bold uppercase tracking-wider transition-colors", active ? "text-white border-b border-indigo-500" : "text-white/30 hover:text-white/60")}>
      {label}
    </button>
  );
}

function PageRow({ name, active, onClick, onDelete }: { name: string; active: boolean; onClick: () => void; onDelete: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn("flex items-center gap-2 px-3 py-1.5 cursor-pointer group transition-colors", active ? "bg-indigo-500/10" : "hover:bg-white/5")}
    >
      <FileText size={12} className={active ? "text-indigo-400" : "text-white/20"} />
      <span className={cn("text-[11px] font-medium flex-1", active ? "text-white" : "text-white/50 group-hover:text-white/80")}>{name}</span>
      {active && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
    </div>
  );
}

function LayerRow({ block, selected, onClick }: { block: BlockData; selected: boolean; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn("flex items-center gap-2 px-3 py-1.5 cursor-pointer group transition-colors", selected ? "bg-indigo-500 text-white" : "hover:bg-white/5")}
    >
      <Square size={12} className={selected ? "text-white" : "text-white/20"} />
      <span className={cn("text-[11px] font-medium truncate flex-1 capitalize", selected ? "text-white" : "text-white/60 group-hover:text-white/90")}>{block.type}</span>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
         <Eye size={12} className="text-white/40 hover:text-white" />
         <LockIcon size={12} className="text-white/40 hover:text-white" />
      </div>
    </div>
  );
}

function AssetCard({ def, onClick }: { def: BlockDefinition; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-3 rounded bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:bg-white/10 transition-all group aspect-square"
    >
      <def.icon size={20} className="text-white/30 group-hover:text-indigo-400 mb-2" />
      <span className="text-[10px] font-bold uppercase tracking-tighter text-white/50 group-hover:text-white">{def.label}</span>
    </button>
  );
}

function SidebarToggleIcon({ side, open }: { side: "left" | "right"; open: boolean }) {
  if (side === "left") return open ? <ChevronLeft size={14} /> : <ChevronRight size={14} />;
  return open ? <ChevronRight size={14} /> : <ChevronLeft size={14} />;
}
