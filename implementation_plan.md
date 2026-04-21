# CreatorOS Implementation Plan

Build a comprehensive SaaS platform for creators combining website building, business management, and design tools.

## User Review Required

> [!IMPORTANT]
> **Tool Selection: Craft.js vs GrapesJS**
> I've selected **Craft.js** for the Landing Page and Resume Builders. This allows us to use native React components and Tailwind CSS directly, ensuring a cohesive and premium look that matches your design system perfectly. GrapesJS is more "all-in-one" but can feel disconnected from the React ecosystem.
> 
> **Graphics Maker Technology**
> For the Graphics Maker (Canva-like), I suggest using **Fabric.js** or **Konva** with a custom React wrapper. This provides the best performance for canvas-based design tasks like logos and social media posts.

> [!IMPORTANT]
> **Resilient AI Failover Layer**
> As requested, I will implement a "Smart AI Router" service. If the primary API (e.g., Gemini 1.5 Pro) fails or times out, it will automatically cycle through backup providers (Claude 3.5 → GPT-4o) to ensure zero downtime for the AI content writing tools.

> [!WARNING]
> This is a massive project. I will start by establishing the core foundation (Design System + Dashboard) and then build the Landing Page Builder as the first major feature.

## Proposed Changes

### Core Infrastructure

#### [NEW] [Project Structure](file:///c:/Users/HP/Downloads/CreateOs/README.md)
Establishing a feature-based architecture (Bulletproof React pattern):
- `src/app`: Next.js 14 App Router routes and layouts.
- `src/features`: Modular tools (e.g., `landing-page-builder`, `invoice-maker`).
- `src/components/ui`: Custom design system components following your specs.
- `src/lib`: Supabase client, shared utilities.
- `src/store`: Zustand state management.

### Component Design System

#### [NEW] [Design System Tokens](file:///c:/Users/HP/Downloads/CreateOs/src/app/globals.css)
Implementing the color palette, typography (Inter + Cal Sans), and motion constants in CSS variables.

#### [NEW] [Base UI Components](file:///c:/Users/HP/Downloads/CreateOs/src/components/ui)
- `Button.tsx`: With requested scale(0.97) press effect.
- `Card.tsx`: With hover translateY and border transitions.
- `Input.tsx`: With accent glow on focus.
- `Sidebar.tsx`: With the sliding border hover effect.

### Tool Implementation

#### [NEW] [Dashboard](file:///c:/Users/HP/Downloads/CreateOs/src/app/(dashboard)/page.tsx)
The main hub with tool cards, search, and recent projects.

#### [NEW] [Landing Page Builder](file:///c:/Users/HP/Downloads/CreateOs/src/features/landing-page-builder)
Using Craft.js to create a section-based drag-and-drop editor.
- **Components**: Hero, CTA, Pricing, Testimonials.
- **Editor UI**: Canvas (center), Toolbox (left), Settings (right).

## Open Questions

1. **AI Content Writer**: Which AI model would you like to prioritize as the *primary* driver? I will implement the auto-switching/failover logic for the others.
2. **Graphics Maker**: I'll proceed with **Fabric.js** for the graphics and logo makers, as it provides the strongest feature set for interactive editors.
3. **Supabase**: I'll proceed with Supabase. Do you already have a project URL/Key, or should I mock the integration for now?

## Verification Plan

### Automated Tests
- `npm run lint`: Ensure code quality.
- `npm run build`: Ensure production readiness.

### Manual Verification
- Testing the Drag-and-Drop flow in the Landing Page Builder.
- Verifying animations (page transitions and hover effects) match the requested duration and easing.
- Testing Dark Mode toggle persistence.
