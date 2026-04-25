"use client";

import React from "react";
import { X, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { FileItem } from "./FileExplorer";

interface EditorTabsProps {
  openFiles: FileItem[];
  activeFileId: string;
  onTabSelect: (id: string) => void;
  onTabClose: (id: string) => void;
}

export function EditorTabs({ 
  openFiles, 
  activeFileId, 
  onTabSelect, 
  onTabClose 
}: EditorTabsProps) {
  const getFileIcon = (name: string) => {
    if (name.endsWith(".html")) return <FileCode size={12} className="text-orange-400" />;
    if (name.endsWith(".css")) return <FileCode size={12} className="text-blue-400" />;
    if (name.endsWith(".js")) return <FileCode size={12} className="text-yellow-400" />;
    return <FileCode size={12} className="text-gray-400" />;
  };

  return (
    <div className="flex bg-[#0F0F13] border-b border-white/5 overflow-x-auto no-scrollbar">
      {openFiles.map((file) => (
        <div
          key={file.id}
          onClick={() => onTabSelect(file.id)}
          className={cn(
            "h-9 px-4 flex items-center gap-2 cursor-pointer border-r border-white/5 transition-all relative min-w-[120px] max-w-[200px]",
            activeFileId === file.id 
              ? "bg-[#16161E] text-indigo-300 border-t-2 border-t-indigo-500" 
              : "bg-white/[0.02] text-gray-500 hover:bg-white/[0.05] hover:text-gray-300"
          )}
        >
          {getFileIcon(file.name)}
          <span className="text-[11px] font-medium truncate flex-1">{file.name}</span>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(file.id);
            }}
            className={cn(
              "p-0.5 rounded-md transition-colors",
              activeFileId === file.id ? "hover:bg-indigo-500/20 text-indigo-400" : "hover:bg-white/10 text-gray-600"
            )}
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
