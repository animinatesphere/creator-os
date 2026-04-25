"use client";

import React, { useState, useEffect, useRef } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { 
  Play, 
  Save, 
  Layout, 
  Sidebar as SidebarIcon,
  Maximize2,
  Terminal as TerminalIcon,
  HelpCircle,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Editor, { loader } from "@monaco-editor/react";
import { ActivityBar } from "./components/ActivityBar";
import { FileExplorer, FileItem } from "./components/FileExplorer";
import { EditorTabs } from "./components/EditorTabs";
import { PreviewPanel } from "./components/PreviewPanel";

// Monaco loader will use default CDN (usually unpkg or cdnjs)
// loader.config({ paths: { vs: "https://unpkg.com/monaco-editor@0.43.0/min/vs" } });

const INITIAL_FILES: FileItem[] = [
  {
    id: "1",
    name: "index.html",
    language: "html",
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CreatorOS Preview</title>
</head>
<body>
  <div class="card">
    <h1>Hello CreatorOS</h1>
    <p>Start building something amazing!</p>
    <button id="magic-btn">Click for Magic</button>
  </div>
</body>
</html>`
  },
  {
    id: "2",
    name: "style.css",
    language: "css",
    content: `body {
  font-family: 'Outfit', sans-serif;
  background: #0f0f13;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

h1 {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #6366f1, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
}`
  },
  {
    id: "3",
    name: "script.js",
    language: "javascript",
    content: `const btn = document.getElementById('magic-btn');

btn.addEventListener('click', () => {
  document.body.style.background = 'linear-gradient(45deg, #1a1a2e, #16213e)';
  btn.innerHTML = '✨ Magic Activated!';
  console.log('Magic button clicked!');
});`
  }
];

export default function CodeEditorPage() {
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES);
  const [activeFileId, setActiveFileId] = useState<string>("1");
  const [openFileIds, setOpenFileIds] = useState<string[]>(["1", "2", "3"]);
  const [activeActivity, setActiveActivity] = useState<string>("explorer");
  const [previewVisible, setPreviewVisible] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  const handleFileSelect = (id: string) => {
    setActiveFileId(id);
    if (!openFileIds.includes(id)) {
      setOpenFileIds(prev => [...prev, id]);
    }
  };

  const handleFileCreate = (name: string) => {
    const ext = name.split(".").pop();
    let language = "plaintext";
    if (ext === "html") language = "html";
    else if (ext === "css") language = "css";
    else if (ext === "js") language = "javascript";
    else if (ext === "json") language = "json";

    const newFile: FileItem = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      language,
      content: ""
    };

    setFiles(prev => [...prev, newFile]);
    handleFileSelect(newFile.id);
  };

  const handleFileDelete = (id: string) => {
    if (files.length <= 1) return;
    setFiles(prev => prev.filter(f => f.id !== id));
    setOpenFileIds(prev => prev.filter(fid => fid !== id));
    if (activeFileId === id) {
      setActiveFileId(files.find(f => f.id !== id)?.id || "");
    }
  };

  const handleTabClose = (id: string) => {
    const newOpenIds = openFileIds.filter(fid => fid !== id);
    setOpenFileIds(newOpenIds);
    if (activeFileId === id && newOpenIds.length > 0) {
      setActiveFileId(newOpenIds[newOpenIds.length - 1]);
    }
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value === undefined) return;
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content: value } : f));
  };

  const openFiles = files.filter(f => openFileIds.includes(f.id));

  return (
    <DashboardShell title="Pro Code Editor">
      <div className="flex flex-col h-[calc(100vh-140px)] border border-white/5 rounded-[24px] bg-[#0F0F13] overflow-hidden shadow-2xl">
        {/* Editor Top Bar (Toolbar) */}
        <div className="h-12 border-b border-white/5 bg-[#16161E]/50 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
              <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
            </div>
            <div className="h-4 w-px bg-white/10 mx-2" />
            <button 
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
              className={cn("p-1.5 rounded-md transition-colors", isSidebarVisible ? "text-indigo-400 bg-indigo-500/10" : "text-gray-500 hover:bg-white/5")}
            >
              <SidebarIcon size={16} />
            </button>
            <button 
              onClick={() => setPreviewVisible(!previewVisible)}
              className={cn("p-1.5 rounded-md transition-colors", previewVisible ? "text-indigo-400 bg-indigo-500/10" : "text-gray-500 hover:bg-white/5")}
            >
              <Layout size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <TerminalIcon size={14} className="text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Build Success</span>
             </div>
             <Button variant="gradient" size="sm" leftIcon={<Play size={14} />} className="h-8">Run Server</Button>
             <Button variant="outline" size="sm" leftIcon={<Save size={14} />} className="h-8 border-white/10 hover:bg-white/5">Save</Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Activity Bar */}
          <ActivityBar activeTab={activeActivity} setActiveTab={setActiveActivity} />

          {/* Sidebar Area */}
          {isSidebarVisible && activeActivity === "explorer" && (
            <FileExplorer 
              files={files}
              activeFileId={activeFileId}
              onFileSelect={handleFileSelect}
              onFileCreate={handleFileCreate}
              onFileDelete={handleFileDelete}
            />
          )}

          {/* Main Editor Group */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#16161E]">
            <EditorTabs 
              openFiles={openFiles}
              activeFileId={activeFileId}
              onTabSelect={setActiveFileId}
              onTabClose={handleTabClose}
            />
            
            <div className="flex-1 relative">
              <Editor
                height="100%"
                theme="vs-dark"
                path={activeFile.name}
                defaultLanguage={activeFile.language}
                value={activeFile.content}
                onChange={handleCodeChange}
                onMount={() => console.log("Monaco Mounted")}
                options={{
                  fontSize: 14,
                  fontFamily: "'Fira Code', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 20 },
                  cursorSmoothCaretAnimation: "on",
                  smoothScrolling: true,
                  bracketPairColorization: { enabled: true },
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: true,
                  snippetSuggestions: "top"
                }}
                loading={
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 font-mono text-sm space-y-4">
                    <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                    <span>Initializing Monaco Engine...</span>
                    <p className="text-[10px] text-gray-600 max-w-[200px] text-center">
                      If this takes too long, check your connection or try refreshing.
                    </p>
                  </div>
                }
              />
            </div>

            {/* Editor Status Bar */}
            <div className="h-6 bg-indigo-600 flex items-center justify-between px-4 text-[10px] font-bold text-white uppercase tracking-tight">
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer">
                     <Settings size={10} />
                     <span>Main</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer">
                     <span>UTF-8</span>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer">
                     <span>Ln 1, Col 1</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer">
                     <span>Spaces: 2</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer">
                     <span className="capitalize">{activeFile.language}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 h-full cursor-pointer">
                     <HelpCircle size={10} />
                  </div>
               </div>
            </div>
          </div>

          {/* Preview Panel */}
          <PreviewPanel 
            files={files} 
            isVisible={previewVisible} 
          />
        </div>
      </div>
    </DashboardShell>
  );
}
