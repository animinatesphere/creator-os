"use client";

import React from "react";
import { cn } from "@/lib/utils";

/* ============================================
   BADGE COMPONENT
============================================ */
type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "outline"
  | "default";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  secondary: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  danger: "bg-red-500/10 text-red-400 border-red-500/20",
  outline:
    "bg-transparent border-[var(--clr-border)] text-[var(--clr-text-secondary)]",
  default:
    "bg-[var(--clr-surface-2)] text-[var(--clr-text-secondary)] border-transparent",
};

const dotColors: Record<BadgeVariant, string> = {
  primary: "bg-purple-400",
  secondary: "bg-indigo-400",
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  danger: "bg-red-400",
  outline: "bg-[var(--clr-text-muted)]",
  default: "bg-[var(--clr-text-muted)]",
};

function Badge({
  className,
  variant = "default",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full",
        "text-[11px] font-semibold tracking-wide uppercase",
        "border",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
}

export { Badge };
