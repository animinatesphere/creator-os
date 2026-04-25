"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/useUIStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/useAuthStore";
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
  ClipboardList,
  BookOpen,
  Terminal,
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
  { label: "Manual", href: "/dashboard/manual", icon: BookOpen, group: "main" },
  { label: "Website Builder", href: "/dashboard/builder", icon: Globe, group: "build" },
  { label: "Pro Code Editor", href: "/dashboard/code-editor", icon: Terminal, group: "build" },
  { label: "Portfolio", href: "/dashboard/portfolio", icon: Briefcase, group: "build" },
  { label: "Link in Bio", href: "/dashboard/link-in-bio", icon: Link2, group: "build" },
  { label: "Invoices", href: "/dashboard/invoices", icon: FileText, group: "business" },
  { label: "Proposals", href: "/dashboard/proposals", icon: FileSignature, group: "business" },
  { label: "Contracts", href: "/dashboard/contracts", icon: FileSignature, group: "business" },
  { label: "Graphics Maker", href: "/dashboard/graphics", icon: PenTool, group: "design" },
  { label: "Logo Maker", href: "/dashboard/logo", icon: Zap, group: "design" },
  { label: "Brand Kit", href: "/dashboard/brand", icon: Palette, group: "design" },
  { label: "Resume Builder", href: "/dashboard/resume", icon: User, group: "other" },
  { label: "QR Generator", href: "/dashboard/qr", icon: QrCode, group: "other" },
  { label: "Form Builder", href: "/dashboard/forms", icon: ClipboardList, group: "other" },
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
  const { logout, user } = useAuthStore();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isDark = theme === "dark";

  return (
    <>
      {/* Mobile Backdrop */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col",
          "bg-[var(--clr-surface)] border-r border-[var(--clr-border)]",
          "transition-all duration-300 ease-in-out shadow-2xl shadow-black/5",
          "backdrop-blur-xl",
          // Mobile state: if not collapsed, it's open. If collapsed, it's hidden off-screen.
          sidebarCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-[78px]" : "translate-x-0 w-[280px]",
        )}
      >
      {/* ── Logo ── */}
      <div
        className={cn(
          "h-20 flex items-center flex-shrink-0 relative overflow-hidden",
          sidebarCollapsed ? "px-4 justify-center" : "px-6 gap-3"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--clr-primary)]/5 to-transparent pointer-events-none" />
        
        <img src="/logo.png" alt="CreatorOS Logo" className="w-10 h-10 object-contain z-10" />
        
        {!sidebarCollapsed && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="z-10"
          >
            <span className="font-black text-lg text-[var(--clr-text-primary)] tracking-tight">
              Creator<span className="text-indigo-500">OS</span>
            </span>
            <div className="flex items-center mt-0.5">
              <span className="px-1.5 py-0.5 bg-indigo-500/10 text-indigo-500 rounded font-bold text-[9px] uppercase tracking-wider border border-indigo-500/20">
                Premium
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 space-y-2 custom-scrollbar">
        {groups.map((group) => {
          const items = navItems.filter((n) => n.group === group.id);
          if (!items.length) return null;

          return (
            <div key={group.id} className="px-3">
              {group.label && !sidebarCollapsed && (
                <p className="text-[10px] font-black text-[var(--clr-text-muted)] uppercase tracking-[0.2em] px-3 py-2 mb-1">
                  {group.label}
                </p>
              )}
              {group.label && sidebarCollapsed && (
                <div className="h-px bg-[var(--clr-border)] mx-3 my-4 opacity-50" />
              )}

              <div className="space-y-1">
                {items.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    active={pathname === item.href || pathname?.startsWith(item.href + "/")}
                    collapsed={sidebarCollapsed}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* ── Bottom Controls ── */}
      <div className="p-4 space-y-2 border-t border-[var(--clr-border)] bg-[var(--clr-surface-2)]/30">
        {/* User Profile Card */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen((o) => !o)}
            className={cn(
              "w-full flex items-center gap-3 p-2 rounded-[14px] transition-all duration-200",
              "hover:bg-[var(--clr-surface)] hover:shadow-lg hover:shadow-black/5 ring-1 ring-transparent hover:ring-white/10",
              sidebarCollapsed ? "justify-center" : "bg-[var(--clr-surface)] shadow-sm"
            )}
          >
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-tr from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-inner font-black text-white text-xs">
              {user?.name?.[0] || "U"}
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-bold text-[var(--clr-text-primary)] truncate tracking-tight">
                  {user?.name || "Premium User"}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Pro Account</p>
                </div>
              </div>
            )}
          </button>

          {/* User Dropdown */}
          <AnimatePresence>
            {userMenuOpen && !sidebarCollapsed && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-0 right-0 mb-3 bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-[20px] shadow-2xl overflow-hidden z-50 p-2 space-y-1"
              >
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-[var(--clr-text-primary)] hover:bg-[var(--clr-surface-2)] rounded-[12px] transition-all"
                >
                  <User size={14} className="text-indigo-400" /> Account Settings
                </Link>
                <button 
                  onClick={() => logout()}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-500/5 rounded-[12px] transition-all"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mini Controls */}
        <div className="flex items-center gap-1">
          <Tooltip content={isDark ? "Light Mode" : "Dark Mode"} side="right">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="flex-1 h-9 flex items-center justify-center rounded-[10px] text-[var(--clr-text-secondary)] hover:bg-[var(--clr-surface)] hover:text-indigo-500 transition-all border border-transparent hover:border-[var(--clr-border)]"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </Tooltip>
          <Tooltip content="Settings" side="right">
            <Link
              href="/dashboard/settings"
                className="flex-1 h-9 flex items-center justify-center rounded-[10px] text-[var(--clr-text-secondary)] hover:bg-[var(--clr-surface)] hover:text-indigo-500 transition-all border border-transparent hover:border-[var(--clr-border)]"
            >
              <Settings size={15} />
            </Link>
          </Tooltip>
        </div>
      </div>

      {/* ── Collapse Toggle ── */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "absolute top-7 -right-3.5 z-50",
          "w-7 h-7 rounded-full shadow-xl border border-[var(--clr-border)]",
          "bg-[var(--clr-surface)] text-[var(--clr-text-secondary)]",
          "flex items-center justify-center",
          "hover:bg-indigo-500 hover:text-white hover:border-indigo-500",
          "transition-all duration-300"
        )}
      >
        {sidebarCollapsed ? (
          <ChevronRight size={14} />
        ) : (
          <ChevronLeft size={14} />
        )}
      </button>
    </aside>
    </>
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
          "group relative flex items-center gap-3 px-3 py-3 rounded-[14px]",
          "text-sm font-bold transition-all duration-200",
          collapsed && "justify-center px-0",
          active
            ? [
                "bg-gradient-to-r from-indigo-500/10 to-blue-500/5",
                "text-indigo-500 shadow-sm shadow-indigo-500/5",
                "ring-1 ring-indigo-500/20"
              ]
            : [
                "text-[var(--clr-text-secondary)]",
                "hover:bg-[var(--clr-surface-2)]/50 hover:text-[var(--clr-text-primary)]",
              ]
        )}
      >
        {/* Active background glow */}
        {active && (
          <motion.div 
            layoutId="activeGlow"
            className="absolute inset-0 bg-indigo-500/5 blur-md rounded-[14px] -z-10"
          />
        )}
        
        <Icon
          size={18}
          className={cn(
            "flex-shrink-0 transition-all duration-300",
            active ? "text-indigo-500 scale-110" : "text-[var(--clr-text-muted)] group-hover:text-indigo-400 group-hover:scale-110"
          )}
        />
        
        {!collapsed && (
          <span className="flex-1 min-w-0 truncate tracking-tight">{item.label}</span>
        )}
        
        {!collapsed && item.badge && (
          <span className="px-1.5 py-0.5 rounded-[6px] bg-indigo-500 text-white text-[8px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20">
            {item.badge}
          </span>
        )}

        {/* Left active line */}
        {active && !collapsed && (
          <motion.div 
            layoutId="activeLine"
            className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-lg bg-gradient-to-b from-indigo-500 to-blue-600 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
          />
        )}
      </Link>
    </Tooltip>
  );
}
