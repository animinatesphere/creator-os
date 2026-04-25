"use client";

import React, { useState } from "react";
import { 
  File, 
  Folder, 
  Plus, 
  ChevronDown, 
  ChevronRight, 
  MoreVertical,
  X,
  FileCode,
  FileJson,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileItem {
  id: string;
  name: string;
  language: string;
  content: string;
}

interface FileExplorerProps {
  files: FileItem[];
  activeFileId: string;
  onFileSelect: (id: string) => void;
  onFileCreate: (name: string) => void;
  onFileDelete: (id: string) => void;
}

export function FileExplorer({ 
  files, 
  activeFileId, 
  onFileSelect, 
  onFileCreate, 
  onFileDelete 
}: FileExplorerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");

  const getFileIcon = (name: string) => {
    if (name.endsWith(".html")) return <FileCode size={14} className="text-orange-400" />;
    if (name.endsWith(".css")) return <FileCode size={14} className="text-blue-400" />;
    if (name.endsWith(".js") || name.endsWith(".ts")) return <FileCode size={14} className="text-yellow-400" />;
    if (name.endsWith(".json")) return <FileJson size={14} className="text-indigo-400" />;
    return <FileText size={14} className="text-gray-400" />;
  };

  const handleCreate = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newName.trim()) {
      onFileCreate(newName.trim());
      setNewName("");
      setIsCreating(false);
    } else if (e.key === "Escape") {
      setIsCreating(false);
      setNewName("");
    }
  };

  return (
    <div className="w-64 bg-[#0F0F13] border-r border-white/5 flex flex-col h-full">
      <div className="h-9 px-4 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
        <span>Explorer</span>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsCreating(true)}
            className="p-1 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <div className="flex items-center px-4 py-1.5 text-xs text-gray-300 font-bold gap-2 cursor-pointer hover:bg-white/5">
          <ChevronDown size={14} className="text-gray-500" />
          <span className="uppercase text-[10px] tracking-tight">Project Root</span>
        </div>

        <div className="flex flex-col">
          {files.map((file) => (
            <div
              key={file.id}
              onClick={() => onFileSelect(file.id)}
              className={cn(
                "group flex items-center px-6 py-1 gap-2 cursor-pointer transition-colors relative",
                activeFileId === file.id 
                  ? "bg-indigo-500/10 text-indigo-300" 
                  : "text-gray-400 hover:bg-white/[0.03] hover:text-gray-200"
              )}
            >
              {getFileIcon(file.name)}
              <span className="text-xs truncate">{file.name}</span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFileDelete(file.id);
                }}
                className="ml-auto opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/10 rounded transition-all"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {isCreating && (
            <div className="px-6 py-1 flex items-center gap-2">
              <File size={14} className="text-gray-500" />
              <input
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleCreate}
                onBlur={() => setIsCreating(false)}
                className="bg-transparent border-none outline-none text-xs text-white w-full"
                placeholder="filename.ext"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
