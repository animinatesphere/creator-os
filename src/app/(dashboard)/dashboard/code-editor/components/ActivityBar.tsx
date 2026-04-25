"use client";

import React from "react";
import { 
  Files, 
  Search, 
  Settings, 
  Sparkles,
  GitBranch,
  Box
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ActivityBar({ activeTab, setActiveTab }: ActivityBarProps) {
  const topItems = [
    { id: "explorer", icon: Files, label: "Explorer" },
    { id: "search", icon: Search, label: "Search" },
    { id: "git", icon: GitBranch, label: "Source Control" },
    { id: "extensions", icon: Box, label: "Extensions" },
    { id: "ai", icon: Sparkles, label: "Antigravity AI" },
  ];

  const bottomItems = [
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-12 bg-[#0F0F13] border-r border-white/5 flex flex-col items-center py-4 justify-between h-full">
      <div className="flex flex-col items-center gap-2">
        {topItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "p-2.5 rounded-lg transition-all duration-200 group relative",
              activeTab === item.id 
                ? "text-indigo-400 bg-indigo-500/10" 
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            )}
            title={item.label}
          >
            <item.icon size={20} strokeWidth={1.5} />
            {activeTab === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-indigo-400 rounded-r-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "p-2.5 rounded-lg transition-all duration-200 group",
              activeTab === item.id 
                ? "text-indigo-400 bg-indigo-500/10" 
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            )}
            title={item.label}
          >
            <item.icon size={20} strokeWidth={1.5} />
          </button>
        ))}
      </div>
    </div>
  );
}
