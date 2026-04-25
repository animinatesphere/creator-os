"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

/* ============================================
   INPUT COMPONENT
   - Focus glow ring (accent color)
   - Error / success states
   - Leading/trailing icon support
============================================ */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      leadingIcon,
      trailingIcon,
      wrapperClassName,
      id,
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const inputId = id ?? reactId;

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--clr-text-primary)]"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {/* Leading icon */}
          {leadingIcon && (
            <span className="absolute left-3 text-[var(--clr-text-muted)] pointer-events-none flex items-center">
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              // Base
              "w-full rounded-[10px] border bg-[var(--clr-surface)] text-[var(--clr-text-primary)]",
              "placeholder:text-[var(--clr-text-muted)] text-sm",
              "transition-all duration-150 outline-none",
              // Sizing
              "h-10 px-3",
              // Border & focus
              "border-[var(--clr-border)]",
              "focus:border-[var(--clr-secondary)] focus:ring-2 focus:ring-[var(--clr-secondary)]/25",
              // Error state
              error &&
                "border-[var(--clr-danger)] focus:border-[var(--clr-danger)] focus:ring-[var(--clr-danger)]/25",
              // Padding adjustments for icons
              leadingIcon && "pl-9",
              trailingIcon && "pr-9",
              className
            )}
            {...props}
          />

          {/* Trailing icon */}
          {trailingIcon && (
            <span className="absolute right-3 text-[var(--clr-text-muted)] flex items-center">
              {trailingIcon}
            </span>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p className="text-xs text-[var(--clr-danger)] flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}

        {/* Hint text */}
        {!error && hint && (
          <p className="text-xs text-[var(--clr-text-muted)]">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/* ============================================
   TEXTAREA COMPONENT
============================================ */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, wrapperClassName, id, ...props }, ref) => {
    const reactId = useId();
    const inputId = id ?? reactId;

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--clr-text-primary)]"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-[10px] border bg-[var(--clr-surface)] text-[var(--clr-text-primary)]",
            "placeholder:text-[var(--clr-text-muted)] text-sm resize-y min-h-[100px]",
            "transition-all duration-150 outline-none p-3",
            "border-[var(--clr-border)]",
            "focus:border-[var(--clr-secondary)] focus:ring-2 focus:ring-[var(--clr-secondary)]/25",
            error &&
              "border-[var(--clr-danger)] focus:border-[var(--clr-danger)] focus:ring-[var(--clr-danger)]/25",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-[var(--clr-danger)]">⚠ {error}</p>
        )}
        {!error && hint && (
          <p className="text-xs text-[var(--clr-text-muted)]">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
