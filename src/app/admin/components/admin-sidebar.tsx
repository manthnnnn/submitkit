'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Package,
  ShoppingCart,
  Map,
  Clock,
  ShieldAlert,
  LogOut,
  TrendingUp,
  Search,
  ChevronRight,
  Users,
  Cpu,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { BrandIcon } from '@/components/ui/logo';
import { AdminSession, getRoleBadgeConfig, getSidebarVisibility } from '@/lib/rbac';

export function AdminSidebar({
  session,
  hasNewPreorders,
  onOpenCommandPalette,
}: {
  session: AdminSession | null;
  hasNewPreorders?: boolean;
  onOpenCommandPalette?: () => void;
}) {
  const pathname = usePathname();
  const role = session?.role || 'SUPER_ADMIN';
  const roleBadge = getRoleBadgeConfig(role);
  const vis = getSidebarVisibility(role);

  const NAV_SECTIONS = [
    {
      label: 'Overview',
      show: vis.dashboard || vis.analytics || vis.acquisitions,
      items: [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true, show: vis.dashboard },
        { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, exact: false, show: vis.analytics },
        { href: '/admin/acquisitions', label: 'Acquisitions', icon: TrendingUp, exact: false, show: vis.acquisitions },
      ],
    },
    {
      label: 'Catalog & Inventory',
      show: vis.projects || vis.blueprints,
      items: [
        { href: '/admin/projects', label: 'Projects', icon: Package, exact: false, show: vis.projects },
        { href: '/admin/blueprints', label: 'Blueprints', icon: Map, exact: false, show: vis.blueprints },
      ],
    },
    {
      label: 'Store Operations',
      show: vis.orders || vis.preorders,
      items: [
        { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, exact: false, show: vis.orders },
        { href: '/admin/preorders', label: 'Pre-orders', icon: Clock, exact: false, badge: true, show: vis.preorders },
      ],
    },
    {
      label: 'Security & Governance',
      show: vis.auditLog || vis.team,
      items: [
        { href: '/admin/audit-log', label: 'Audit Logs', icon: ShieldAlert, exact: false, show: vis.auditLog },
        { href: '/admin/team', label: 'Team Access', icon: Users, exact: false, show: vis.team },
      ],
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {}
    window.location.href = '/admin/login';
  };

  return (
    <aside
      className="w-64 shrink-0 flex flex-col h-screen sticky top-0 select-none border-r z-30"
      style={{
        background: 'linear-gradient(180deg, #090A0F 0%, #06070A 100%)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(30px)',
      }}
    >
      {/* ── Brand Header ── */}
      <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
        <Link href={vis.dashboard ? '/admin' : '/admin/projects'} className="flex items-center gap-2.5 group">
          <div className="relative">
            <BrandIcon size="sm" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#090A0F]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-sm text-white tracking-tight leading-none">
                Submit<span className="text-teal-400">Kit</span>
              </span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-teal-950/80 text-teal-300 border border-teal-700/50">
                Admin
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-1 font-mono tracking-tight flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              127.0.0.1:3000
            </p>
          </div>
        </Link>
      </div>

      {/* ── Quick Search Command Palette Trigger ── */}
      <div className="px-4 py-3 border-b border-white/[0.05]">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-400 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-white/[0.12] transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-teal-400 transition-colors" />
            <span className="text-[11px] font-medium">Quick Jump...</span>
          </div>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.1] text-zinc-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* ── Navigation Tree ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5 scrollbar-thin scrollbar-thumb-zinc-800">
        {NAV_SECTIONS.filter(s => s.show).map(sec => (
          <div key={sec.label}>
            <div className="px-3 mb-1.5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              {sec.label}
            </div>
            <div className="space-y-0.5">
              {sec.items
                .filter(i => i.show)
                .map(item => {
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-teal-900/40 via-teal-800/20 to-transparent border border-teal-500/30 shadow-[0_0_20px_rgba(13,148,136,0.15)]'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            isActive
                              ? 'bg-teal-500/20 text-teal-300'
                              : 'text-zinc-500 group-hover:text-zinc-300'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">{item.label}</span>
                      </div>

                      {/* Preorders Live Badge */}
                      {item.badge && hasNewPreorders && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                      )}

                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
                      )}
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Storefront Fast Switcher ── */}
      <div className="px-3 py-2 border-t border-white/[0.05]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-teal-300 hover:bg-white/[0.03] transition-all group"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-teal-400" />
            <span>View Live Storefront</span>
          </div>
          <span className="text-[10px] text-zinc-600 font-mono">↗</span>
        </Link>
      </div>

      {/* ── User & Enclave Session Footer ── */}
      <div className="p-3 border-t border-white/[0.07] bg-white/[0.015]">
        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-700 to-emerald-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-xs">
              {session?.displayName?.slice(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate leading-tight">
                {session?.displayName || 'Administrator'}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded"
                  style={{
                    color: roleBadge.text,
                    backgroundColor: roleBadge.bg,
                    border: `1px solid ${roleBadge.border}`,
                  }}
                >
                  {roleBadge.label}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-950/30 transition-all shrink-0 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
