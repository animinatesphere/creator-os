"use client";

import React from "react";
import { cn } from "@/lib/utils";

/* ============================================
   SKELETON LOADER
   Shimmer sweep animation 1.4s loop
============================================ */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
}

function Skeleton({ className, width, height, style, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton rounded-[var(--radius-md)]", className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}

/* Pre-built skeleton patterns */
function SkeletonCard() {
  return (
    <div className="rounded-[16px] border border-[var(--clr-border)] p-5 bg-[var(--clr-surface)] space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-[10px]" />
        <div className="flex-1 space-y-2">
          <Skeleton height={14} className="w-2/3" />
          <Skeleton height={11} className="w-1/2" />
        </div>
      </div>
      <Skeleton height={11} className="w-full" />
      <Skeleton height={11} className="w-4/5" />
      <Skeleton height={36} className="w-full rounded-[10px]" />
    </div>
  );
}

function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={14}
          className={i === lines - 1 ? "w-3/4" : "w-full"}
        />
      ))}
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonText };
