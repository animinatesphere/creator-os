import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B21B6",
        secondary: "#6366F1",
        accent: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",
        surface: {
          DEFAULT: "#F9FAFB",
          dark: "#1A1A23",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 0 3px rgba(99,102,241,0.25)",
        "glow-primary": "0 0 0 3px rgba(91,33,182,0.3)",
        "glow-accent": "0 0 0 3px rgba(16,185,129,0.25)",
      },
      animation: {
        "fade-slide-up": "fadeSlideUp 280ms ease-out forwards",
        "fade-in-up": "fadeInUp 400ms ease-out forwards",
        shimmer: "shimmer 1.4s infinite",
        "slide-in-top": "slideInTop 280ms cubic-bezier(0.22,1,0.36,1) forwards",
        "slide-in-right": "slideInRight 280ms cubic-bezier(0.22,1,0.36,1) forwards",
        "pulse-badge": "pulseBadge 2s infinite",
        "draw-check": "drawCheck 0.5s ease-out forwards",
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideInTop: {
          from: { opacity: "0", transform: "translateY(-16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        pulseBadge: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(16,185,129,0.5)" },
          "50%": { boxShadow: "0 0 0 8px rgba(16,185,129,0)" },
        },
        drawCheck: {
          from: { strokeDashoffset: "60" },
          to: { strokeDashoffset: "0" },
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
