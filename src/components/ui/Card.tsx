"use client";

import React from "react";
import { cn } from "@/lib/utils";

/* ============================================
   CARD COMPONENT
   - hover: translateY(-2px) + border accent + shadow
============================================ */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  glass?: boolean;
  padded?: boolean;
}

function Card({
  className,
  interactive = false,
  glass = false,
  padded = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[16px] border",
        "border-[var(--clr-border)]",
        glass
          ? "bg-white/[0.03] backdrop-blur-xl"
          : "bg-[var(--clr-surface)]",
        padded && "p-5",
        interactive && [
          "cursor-pointer transition-all duration-[180ms] ease-out",
          "hover:border-[var(--clr-secondary)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5",
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ============================================
   CARD SUB-COMPONENTS
============================================ */
function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-start justify-between mb-4", className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-base font-semibold text-[var(--clr-text-primary)] leading-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-[var(--clr-text-secondary)]", className)}
      {...props}
    >
      {children}
    </p>
  );
}

function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-4 pt-4 border-t border-[var(--clr-border)] flex items-center justify-between",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardFooter };
