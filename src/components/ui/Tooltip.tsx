"use client";

import React from "react";
import { cn } from "@/lib/utils";

/* ============================================
   TOOLTIP COMPONENT (lightweight, no lib)
============================================ */
interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative group inline-flex">
      {children}
      <div
        className={cn(
          "absolute z-50 px-2.5 py-1.5 rounded-[8px] text-xs font-medium whitespace-nowrap pointer-events-none",
          "bg-[#1A1A23] text-white border border-white/10 shadow-xl",
          "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100",
          "transition-all duration-150",
          positions[side],
          className
        )}
      >
        {content}
      </div>
    </div>
  );
}

/* ============================================
   TOAST NOTIFICATION PRIMITIVE
   (Used via store, rendered in layout)
============================================ */
interface ToastItem {
  id: string;
  message: string;
  variant?: "success" | "error" | "warning" | "info";
  duration?: number;
}

function Toast({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const icons = {
    success: "✓",
    error: "✗",
    warning: "⚠",
    info: "ℹ",
  };

  const colorMap = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    error: "border-red-500/30 bg-red-500/10 text-red-300",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    info: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
  };

  const variant = toast.variant ?? "info";

  return (
    <div
      className={cn(
        "animate-slide-in-top flex items-center gap-3 px-4 py-3 rounded-[12px] border",
        "max-w-sm w-full backdrop-blur-xl shadow-xl",
        "bg-[var(--clr-surface)] border-[var(--clr-border)]"
      )}
    >
      <span
        className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
          colorMap[variant]
        )}
      >
        {icons[variant]}
      </span>
      <p className="text-sm text-[var(--clr-text-primary)] flex-1">
        {toast.message}
      </p>
      <button
        onClick={onDismiss}
        className="text-[var(--clr-text-muted)] hover:text-[var(--clr-text-primary)] transition-colors text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}

export { Tooltip, Toast };
export type { ToastItem };
