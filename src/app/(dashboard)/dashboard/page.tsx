"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Globe,
  Briefcase,
  FileText,
  PenTool,
  Palette,
  Link2,
  QrCode,
  FileSignature,
  Bot,
  Zap,
  User,
  ArrowRight,
  Eye,
  MousePointer,
  DollarSign,
  Star,
  Clock,
  ChevronRight,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { timeAgo } from "@/lib/utils";
import { DashboardShell } from "@/components/layout/DashboardShell";

/* ============================================
   TOOL CARD DATA
============================================ */
interface Tool {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: React.ElementType;
  gradient: string;
  badge?: string;
  badgeVariant?: "primary" | "success" | "warning";
  group: string;
}

const tools: Tool[] = [
  {
    id: "website-builder",
    label: "Website Builder",
    description: "Drag-and-drop multi-page sites with SEO, nav, and blog.",
    href: "/dashboard/builder",
    icon: Globe,
    gradient: "from-violet-500 to-indigo-600",
    group: "Build",
  },
  {
    id: "portfolio",
    label: "Portfolio Builder",
    description: "Showcase projects, image galleries, and case studies.",
    href: "/dashboard/portfolio",
    icon: Briefcase,
    gradient: "from-blue-500 to-cyan-600",
    group: "Build",
  },
  {
    id: "link-in-bio",
    label: "Link in Bio",
    description: "One-page social bio with links and click analytics.",
    href: "/dashboard/link-in-bio",
    icon: Link2,
    gradient: "from-pink-500 to-rose-500",
    group: "Build",
  },
  {
    id: "invoices",
    label: "Invoice Maker",
    description: "Create, send, and track invoices with PDF export.",
    href: "/dashboard/invoices",
    icon: FileText,
    gradient: "from-emerald-500 to-teal-600",
    group: "Business",
  },
  {
    id: "proposals",
    label: "Proposal Builder",
    description: "Client proposals with e-signature and status tracking.",
    href: "/dashboard/proposals",
    icon: FileSignature,
    gradient: "from-orange-500 to-amber-600",
    group: "Business",
  },
  {
    id: "contracts",
    label: "Contract Generator",
    description: "Freelance contracts and legal templates, ready to sign.",
    href: "/dashboard/contracts",
    icon: FileSignature,
    gradient: "from-slate-500 to-slate-700",
    group: "Business",
  },
  {
    id: "graphics",
    label: "Graphics Maker",
    description: "Social posts, banners, thumbnails, and ad creatives.",
    href: "/dashboard/graphics",
    icon: PenTool,
    gradient: "from-fuchsia-500 to-purple-600",
    group: "Design",
  },
  {
    id: "logo",
    label: "Logo Maker",
    description: "AI-assisted logo generation with SVG/PNG export.",
    href: "/dashboard/logo",
    icon: Zap,
    gradient: "from-yellow-400 to-orange-500",
    badge: "AI",
    badgeVariant: "warning",
    group: "Design",
  },
  {
    id: "brand-kit",
    label: "Brand Kit",
    description: "Save colors, fonts, logo — apply across all tools.",
    href: "/dashboard/brand",
    icon: Palette,
    gradient: "from-violet-400 to-pink-500",
    group: "Design",
  },
  {
    id: "resume",
    label: "Resume Builder",
    description: "Professional resumes with PDF export and templates.",
    href: "/dashboard/resume",
    icon: User,
    gradient: "from-cyan-500 to-blue-600",
    group: "Tools",
  },
  {
    id: "qr",
    label: "QR Generator",
    description: "Custom branded QR codes with logo overlay.",
    href: "/dashboard/qr",
    icon: QrCode,
    gradient: "from-gray-600 to-gray-800",
    group: "Tools",
  },
  {
    id: "ai-writer",
    label: "AI Content Writer",
    description: "Copy for landing pages, bios, headlines, social posts.",
    href: "/dashboard/ai-writer",
    icon: Bot,
    gradient: "from-indigo-500 to-violet-600",
    badge: "AI",
    badgeVariant: "primary",
    group: "Tools",
  },
  {
    id: "forms",
    label: "Form Builder",
    description: "Embeddable contact, survey, and lead capture forms.",
    href: "/dashboard/forms",
    icon: ClipboardList,
    gradient: "from-blue-600 to-indigo-700",
    group: "Tools",
  },
];

/* ============================================
   STATS
============================================ */
const stats = [
  {
    label: "Total Projects",
    value: "24",
    change: "+3 this month",
    icon: Briefcase,
    positive: true,
  },
  {
    label: "Page Views",
    value: "12.4k",
    change: "+18% vs last month",
    icon: Eye,
    positive: true,
  },
  {
    label: "Link Clicks",
    value: "3,210",
    change: "+5% vs last month",
    icon: MousePointer,
    positive: true,
  },
  {
    label: "Revenue Tracked",
    value: "$8,450",
    change: "2 invoices pending",
    icon: DollarSign,
    positive: false,
  },
];

/* ============================================
   RECENT PROJECTS (Mock)
============================================ */
const recentProjects = [
  {
    id: "1",
    name: "My Portfolio Site",
    type: "Website Builder",
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    status: "published",
  },
  {
    id: "2",
    name: "Invoice #INV-0042",
    type: "Invoice Maker",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    status: "pending",
  },
  {
    id: "3",
    name: "Spring Brand Kit",
    type: "Brand Kit",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: "draft",
  },
  {
    id: "4",
    name: "Agency Proposal",
    type: "Proposal Builder",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    status: "sent",
  },
];

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "primary" | "secondary" | "danger" | "default" }> = {
  published: { label: "Published", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  draft: { label: "Draft", variant: "default" },
  sent: { label: "Sent", variant: "primary" },
};

const toolGroups = ["Build", "Business", "Design", "Tools"];

/* ============================================
   DASHBOARD PAGE
============================================ */
export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <DashboardShell title="Dashboard">
      <div className="max-w-[1400px] mx-auto space-y-8">
      {/* ── Welcome Hero ── */}
      <WelcomeHero />

      {/* ── Stats Row ── */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} loading={loading} />
          ))}
        </div>
      </section>

      {/* ── Tool Cards by Group ── */}
      {toolGroups.map((group) => {
        const groupTools = tools.filter((t) => t.group === group);
        return (
          <section key={group}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--clr-text-primary)]">
                {group} Tools
              </h2>
              <span className="text-sm text-[var(--clr-text-muted)]">
                {groupTools.length} tools
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading
                ? Array.from({ length: groupTools.length }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : groupTools.map((tool, i) => (
                    <ToolCard key={tool.id} tool={tool} index={i} />
                  ))}
            </div>
          </section>
        );
      })}

      {/* ── Recent Projects ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[var(--clr-text-primary)]">
            Recent Projects
          </h2>
          <Button variant="ghost" size="sm" rightIcon={<ChevronRight size={14} />}>
            View All
          </Button>
        </div>
        <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] overflow-hidden">
          {recentProjects.map((project, i) => (
            <RecentProjectRow key={project.id} project={project} last={i === recentProjects.length - 1} />
          ))}
        </div>
      </section>
    </div>
    </DashboardShell>
  );
}

/* ============================================
   WELCOME HERO SECTION
============================================ */
function WelcomeHero() {
  return (
    <div className="relative rounded-[20px] overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #5B21B6 0%, #6366F1 50%, #10B981 100%)",
          opacity: 0.12,
        }}
      />
      <div className="absolute inset-0 border border-[var(--clr-border)] rounded-[20px]" />

      {/* Decorative orbs */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "#6366F1", transform: "translate(30%, -30%)" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full opacity-10 blur-3xl"
        style={{ background: "#10B981", transform: "translateY(30%)" }}
      />

      <div className="relative px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="flex-1">
          <p className="text-sm font-semibold text-[var(--clr-secondary)] uppercase tracking-widest mb-2">
            👋 Welcome back
          </p>
          <h1
            className="text-3xl font-black text-[var(--clr-text-primary)] mb-2 tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Your Creative Hub
          </h1>
          <p className="text-[var(--clr-text-secondary)] text-sm max-w-md leading-relaxed">
            Build websites, design graphics, send invoices, and grow your
            business — all in one place. What will you create today?
          </p>
        </div>

        <div className="flex flex-wrap gap-3 sm:flex-col sm:items-end">
          <Button variant="gradient" size="md" leftIcon={<Star size={14} />}>
            Start New Project
          </Button>
          <Button variant="outline" size="sm">
            Explore Templates
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   STAT CARD
============================================ */
function StatCard({
  stat,
  index,
  loading,
}: {
  stat: (typeof stats)[0];
  index: number;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 h-[108px] skeleton" />
    );
  }

  const Icon = stat.icon;

  return (
    <div
      className={cn(
        "animate-fade-in-up opacity-0",
        `stagger-${index + 1}`,
        "rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5",
        "transition-all duration-[180ms] hover:border-[var(--clr-secondary)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5"
      )}
      style={{ animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-[var(--clr-text-muted)] uppercase tracking-wide">
          {stat.label}
        </p>
        <div className="w-8 h-8 rounded-[8px] gradient-bg-subtle flex items-center justify-center">
          <Icon size={14} className="text-[var(--clr-secondary)]" />
        </div>
      </div>
      <p className="text-2xl font-black text-[var(--clr-text-primary)] tracking-tight mb-1">
        {stat.value}
      </p>
      <p
        className={cn(
          "text-xs font-medium",
          stat.positive
            ? "text-[var(--clr-success)]"
            : "text-[var(--clr-text-muted)]"
        )}
      >
        {stat.positive && <span>↑ </span>}
        {stat.change}
      </p>
    </div>
  );
}

/* ============================================
   TOOL CARD
============================================ */
function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const Icon = tool.icon;

  return (
    <Link
      href={tool.href}
      className={cn(
        "group animate-fade-in-up opacity-0",
        `stagger-${(index % 8) + 1}`,
        "block rounded-[16px] border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5",
        "transition-all duration-[180ms]",
        "hover:border-[var(--clr-secondary)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] hover:-translate-y-0.5"
      )}
      style={{ animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        <div
          className={cn(
            "w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0",
            "bg-gradient-to-br shadow-lg",
            tool.gradient
          )}
        >
          <Icon size={18} className="text-white" />
        </div>

        {/* Badge + arrow */}
        <div className="flex items-center gap-2">
          {tool.badge && (
            <Badge variant={tool.badgeVariant ?? "primary"}>
              {tool.badge}
            </Badge>
          )}
          <ArrowRight
            size={14}
            className="text-[var(--clr-text-muted)] group-hover:text-[var(--clr-secondary)] group-hover:translate-x-0.5 transition-all duration-150"
          />
        </div>
      </div>

      <h3 className="font-bold text-[var(--clr-text-primary)] mb-1 text-sm">
        {tool.label}
      </h3>
      <p className="text-xs text-[var(--clr-text-secondary)] leading-relaxed">
        {tool.description}
      </p>
    </Link>
  );
}

/* ============================================
   RECENT PROJECT ROW
============================================ */
function RecentProjectRow({
  project,
  last,
}: {
  project: (typeof recentProjects)[0];
  last: boolean;
}) {
  const { label, variant } = statusConfig[project.status] ?? {
    label: project.status,
    variant: "default" as const,
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 px-5 py-3.5",
        "hover:bg-[var(--clr-surface-2)] transition-colors duration-150",
        !last && "border-b border-[var(--clr-border)]"
      )}
    >
      <div className="w-8 h-8 rounded-[8px] gradient-bg-subtle flex items-center justify-center flex-shrink-0">
        <Clock size={13} className="text-[var(--clr-secondary)]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--clr-text-primary)] truncate">
          {project.name}
        </p>
        <p className="text-xs text-[var(--clr-text-muted)]">{project.type}</p>
      </div>
      <div className="hidden sm:flex items-center gap-3">
        <Badge variant={variant} dot>
          {label}
        </Badge>
        <span className="text-xs text-[var(--clr-text-muted)] whitespace-nowrap">
          {timeAgo(project.updatedAt)}
        </span>
      </div>
      <ChevronRight size={14} className="text-[var(--clr-text-muted)] flex-shrink-0" />
    </div>
  );
}
