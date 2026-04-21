"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ============================================
   BUTTON VARIANTS
============================================ */
const buttonVariants = cva(
  // Base styles applied to all variants
  [
    "inline-flex items-center justify-center gap-2 font-semibold rounded-[10px]",
    "transition-all duration-[120ms] ease-out select-none",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    "active:scale-[0.97]", // Press effect
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--clr-primary)] text-white",
          "hover:bg-[var(--clr-primary-hover)] hover:shadow-lg hover:shadow-purple-500/20",
          "focus-visible:ring-purple-500",
        ],
        secondary: [
          "bg-[var(--clr-secondary)] text-white",
          "hover:brightness-110 hover:shadow-lg hover:shadow-indigo-500/20",
          "focus-visible:ring-indigo-500",
        ],
        accent: [
          "bg-[var(--clr-accent)] text-white",
          "hover:bg-[var(--clr-accent-hover)] hover:shadow-lg hover:shadow-emerald-500/20",
          "focus-visible:ring-emerald-500",
        ],
        outline: [
          "border border-[var(--clr-border)] text-[var(--clr-text-primary)]",
          "bg-transparent hover:bg-[var(--clr-surface)] hover:border-[var(--clr-secondary)]",
          "focus-visible:ring-indigo-500",
        ],
        ghost: [
          "text-[var(--clr-text-secondary)] bg-transparent",
          "hover:bg-[var(--clr-surface)] hover:text-[var(--clr-text-primary)]",
          "focus-visible:ring-indigo-500",
        ],
        danger: [
          "bg-[var(--clr-danger)] text-white",
          "hover:brightness-110 hover:shadow-lg hover:shadow-red-500/20",
          "focus-visible:ring-red-500",
        ],
        gradient: [
          "text-white bg-gradient-to-r from-[var(--clr-primary)] to-[var(--clr-secondary)]",
          "hover:shadow-lg hover:shadow-purple-500/30 hover:brightness-110",
          "focus-visible:ring-purple-500",
        ],
      },
      size: {
        xs: "h-7 px-3 text-xs",
        sm: "h-8 px-4 text-sm",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-9 w-9 p-0",
        "icon-sm": "h-7 w-7 p-0",
        "icon-lg": "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/* ============================================
   BUTTON COMPONENT
============================================ */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <SpinnerIcon />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

/* Inline spinner */
function SpinnerIcon() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export { Button, buttonVariants };
