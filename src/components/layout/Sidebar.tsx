"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/useUIStore";
import { useThemeStore } from "@/store/useThemeStore";
import { Tooltip } from "@/components/ui/Tooltip";
import {
  LayoutDashboard,
  Globe,
  Briefcase,
  FileText,
  PenTool,
  Palette,
  Link2,
  QrCode,
  FileSignature,
  Bot,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Settings,
  Bell,
  Zap,
  User,
  LogOut,
} from "lucide-react";

/* ============================================
   NAV ITEM DEFINITIONS
============================================ */
interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  group?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, group: "main" },
  // Builder Tools
  { label: "Website Builder", href: "/dashboard/builder", icon: Globe, group: "build" },
  { label: "Portfolio", href: "/dashboard/portfolio", icon: Briefcase, group: "build" },
  { label: "Link in Bio", href: "/dashboard/link-in-bio", icon: Link2, group: "build" },
  // Business Tools
  { label: "Invoices", href: "/dashboard/invoices", icon: FileText, group: "business" },
  { label: "Proposals", href: "/dashboard/proposals", icon: FileSignature, group: "business" },
  { label: "Contracts", href: "/dashboard/contracts", icon: FileSignature, group: "business" },
  // Design Tools
  { label: "Graphics Maker", href: "/dashboard/graphics", icon: PenTool, group: "design" },
  { label: "Logo Maker", href: "/dashboard/logo", icon: Zap, group: "design" },
  { label: "Brand Kit", href: "/dashboard/brand", icon: Palette, group: "design" },
  // Other
  { label: "Resume Builder", href: "/dashboard/resume", icon: User, group: "other" },
  { label: "QR Generator", href: "/dashboard/qr", icon: QrCode, group: "other" },
  { label: "AI Writer", href: "/dashboard/ai-writer", icon: Bot, badge: "AI", group: "other" },
];

const groups = [
  { id: "main", label: "" },
  { id: "build", label: "Build" },
  { id: "business", label: "Business" },
  { id: "design", label: "Design" },
  { id: "other", label: "Tools" },
];

/* ============================================
   SIDEBAR COMPONENT
============================================ */
export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { theme, setTheme } = useThemeStore();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isDark = theme === "dark";

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col",
        "bg-[var(--clr-surface)] border-r border-[var(--clr-border)]",
        "transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* ── Logo ── */}
      <div
        className={cn(
          "h-16 flex items-center border-b border-[var(--clr-border)] flex-shrink-0",
          sidebarCollapsed ? "px-4 justify-center" : "px-5 gap-3"
        )}
      >
        <div className="w-8 h-8 rounded-[10px] gradient-bg flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
          <span className="text-white text-sm font-black">C</span>
        </div>
        {!sidebarCollapsed && (
          <div>
            <span className="font-bold text-base text-[var(--clr-text-primary)] tracking-tight">
              Creator
              <span className="gradient-text">OS</span>
            </span>
            <div className="flex items-center mt-0.5">
              <span className="badge badge-primary text-[9px] px-1.5 py-0">PRO</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 space-y-1">
        {groups.map((group) => {
          const items = navItems.filter((n) => n.group === group.id);
          if (!items.length) return null;

          return (
            <div key={group.id} className="px-2">
              {group.label && !sidebarCollapsed && (
                <p className="text-[10px] font-semibold text-[var(--clr-text-muted)] uppercase tracking-widest px-2 py-2">
                  {group.label}
                </p>
              )}
              {group.label && sidebarCollapsed && (
                <div className="h-px bg-[var(--clr-border)] mx-2 my-2" />
              )}

              {items.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  active={pathname === item.href || pathname?.startsWith(item.href + "/")}
                  collapsed={sidebarCollapsed}
                />
              ))}
            </div>
          );
        })}
      </nav>

      {/* ── Bottom Controls ── */}
      <div className="border-t border-[var(--clr-border)] p-3 space-y-1 flex-shrink-0">
        {/* Theme Toggle */}
        <Tooltip content={isDark ? "Light Mode" : "Dark Mode"} side="right">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
              "w-full flex items-center gap-3 px-2 py-2 rounded-[8px]",
              "text-[var(--clr-text-secondary)] hover:bg-[var(--clr-surface-2)] hover:text-[var(--clr-text-primary)]",
              "transition-all duration-150",
              sidebarCollapsed && "justify-center"
            )}
          >
            {isDark ? (
              <Sun size={16} className="flex-shrink-0" />
            ) : (
              <Moon size={16} className="flex-shrink-0" />
            )}
            {!sidebarCollapsed && (
              <span className="text-sm">{isDark ? "Light Mode" : "Dark Mode"}</span>
            )}
          </button>
        </Tooltip>

        {/* Settings */}
        <Tooltip content="Settings" side="right">
          <Link
            href="/dashboard/settings"
            className={cn(
              "w-full flex items-center gap-3 px-2 py-2 rounded-[8px]",
              "text-[var(--clr-text-secondary)] hover:bg-[var(--clr-surface-2)] hover:text-[var(--clr-text-primary)]",
              "transition-all duration-150",
              sidebarCollapsed && "justify-center"
            )}
          >
            <Settings size={16} className="flex-shrink-0" />
            {!sidebarCollapsed && <span className="text-sm">Settings</span>}
          </Link>
        </Tooltip>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen((o) => !o)}
            className={cn(
              "w-full flex items-center gap-3 px-2 py-2 rounded-[10px]",
              "hover:bg-[var(--clr-surface-2)] transition-all duration-150",
              sidebarCollapsed && "justify-center"
            )}
          >
            <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">U</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-[var(--clr-text-primary)] truncate">
                  Your Name
                </p>
                <p className="text-xs text-[var(--clr-text-muted)] truncate">
                  Pro Plan
                </p>
              </div>
            )}
          </button>

          {/* User Dropdown */}
          {userMenuOpen && !sidebarCollapsed && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-[12px] shadow-xl overflow-hidden z-50 animate-fade-in-up">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--clr-text-primary)] hover:bg-[var(--clr-surface-2)] transition-colors"
              >
                <User size={14} /> My Profile
              </Link>
              <div className="h-px bg-[var(--clr-border)]" />
              <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--clr-danger)] hover:bg-red-500/5 transition-colors">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Collapse Toggle ── */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "absolute top-[72px] -right-3 z-50",
          "w-6 h-6 rounded-full shadow-md border border-[var(--clr-border)]",
          "bg-[var(--clr-surface)] text-[var(--clr-text-secondary)]",
          "flex items-center justify-center",
          "hover:bg-[var(--clr-secondary)] hover:text-white hover:border-[var(--clr-secondary)]",
          "transition-all duration-150"
        )}
        title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {sidebarCollapsed ? (
          <ChevronRight size={12} />
        ) : (
          <ChevronLeft size={12} />
        )}
      </button>
    </aside>
  );
}

/* ============================================
   NAV LINK ITEM
============================================ */
function NavLink({
  item,
  active,
  collapsed,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;

  return (
    <Tooltip content={collapsed ? item.label : ""} side="right">
      <Link
        href={item.href}
        className={cn(
          "group relative flex items-center gap-3 px-2 py-2 rounded-[8px]",
          "text-sm transition-all duration-150",
          // Hover: left sliding border effect
          "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
          "before:h-5 before:w-0 before:rounded-r before:bg-[var(--clr-secondary)]",
          "before:transition-all before:duration-150",
          "hover:before:w-[3px]",
          collapsed && "justify-center",
          active
            ? [
                "bg-gradient-to-r from-[var(--clr-primary)]/10 to-[var(--clr-secondary)]/10",
                "text-[var(--clr-text-primary)]",
                "before:w-[3px]",
              ]
            : [
                "text-[var(--clr-text-secondary)]",
                "hover:bg-[var(--clr-surface-2)] hover:text-[var(--clr-text-primary)]",
              ]
        )}
      >
        <Icon
          size={16}
          className={cn(
            "flex-shrink-0 transition-colors",
            active ? "text-[var(--clr-secondary)]" : "text-[var(--clr-text-muted)] group-hover:text-[var(--clr-text-primary)]"
          )}
        />
        {!collapsed && (
          <span className="flex-1 min-w-0 truncate font-medium">{item.label}</span>
        )}
        {!collapsed && item.badge && (
          <span className="badge badge-primary text-[9px] px-1.5 py-0.5">
            {item.badge}
          </span>
        )}
      </Link>
    </Tooltip>
  );
}
