"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { useUIStore } from "@/store/useUIStore";
import { useThemeStore } from "@/store/useThemeStore";

interface DashboardShellProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
}

export function DashboardShell({ children, title, actions }: DashboardShellProps) {
  const { sidebarCollapsed } = useUIStore();
  const { theme, setTheme } = useThemeStore();

  // Apply saved theme on mount
  useEffect(() => {
    setTheme(theme);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--clr-bg)] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area — shifts with sidebar */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0",
          "transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "ml-[72px]" : "ml-[260px]"
        )}
      >
        <TopBar title={title} actions={actions} />

        <main className="flex-1 p-6 animate-page-enter">
          {children}
        </main>
      </div>
    </div>
  );
}
