"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/useUIStore";
import { Bell, Search, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TopBarProps {
  title?: string;
  actions?: React.ReactNode;
}

export function TopBar({ title, actions }: TopBarProps) {
  const { toggleSidebar } = useUIStore();

  return (
    <header
      className={cn(
        "h-16 flex items-center gap-4 px-6",
        "bg-[var(--clr-bg)]/80 backdrop-blur-md",
        "border-b border-[var(--clr-border)]",
        "sticky top-0 z-30"
      )}
    >
      {/* Mobile menu toggle */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-[var(--clr-text-secondary)] hover:text-[var(--clr-text-primary)] transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      {title && (
        <h1 className="text-lg font-bold text-[var(--clr-text-primary)] tracking-tight hidden sm:block">
          {title}
        </h1>
      )}

      {/* Search bar */}
      <div
        className={cn(
          "flex-1 max-w-md",
          "relative flex items-center",
          "bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-[10px]",
          "transition-all duration-150",
          "focus-within:border-[var(--clr-secondary)] focus-within:ring-2 focus-within:ring-[var(--clr-secondary)]/20"
        )}
      >
        <Search size={15} className="absolute left-3 text-[var(--clr-text-muted)]" />
        <input
          type="text"
          placeholder="Search tools, projects…"
          className={cn(
            "w-full bg-transparent pl-9 pr-3 py-2 text-sm",
            "text-[var(--clr-text-primary)] placeholder:text-[var(--clr-text-muted)]",
            "outline-none"
          )}
        />
        <kbd className="hidden sm:flex items-center gap-0.5 mr-3 px-1.5 py-0.5 rounded text-[10px] font-medium text-[var(--clr-text-muted)] border border-[var(--clr-border)] bg-[var(--clr-surface-2)]">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {actions}

        {/* Create new button */}
        <Button variant="gradient" size="sm" leftIcon={<Plus size={14} />}>
          <span className="hidden sm:inline">Create New</span>
          <span className="sm:hidden">New</span>
        </Button>

        {/* Notifications */}
        <button
          className={cn(
            "relative w-9 h-9 rounded-[10px] flex items-center justify-center",
            "bg-[var(--clr-surface)] border border-[var(--clr-border)]",
            "text-[var(--clr-text-secondary)] hover:text-[var(--clr-text-primary)] hover:border-[var(--clr-secondary)]",
            "transition-all duration-150"
          )}
          aria-label="Notifications"
        >
          <Bell size={15} />
          {/* Unread dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--clr-accent)] border-2 border-[var(--clr-bg)]" />
        </button>
      </div>
    </header>
  );
}
