'use client';

import React, { useState } from 'react';
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
  ShieldCheck,
} from 'lucide-react';
import { BrandIcon } from '@/components/ui/logo';
import { AdminSession, getRoleBadgeConfig } from '@/lib/rbac';

export const ADMIN_NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, exact: false },
      { href: '/admin/acquisitions', label: 'Acquisitions', icon: TrendingUp, exact: false },
    ],
  },
  {
    label: 'Catalog',
    items: [
      { href: '/admin/projects', label: 'Projects', icon: Package, exact: false },
      { href: '/admin/blueprints', label: 'Blueprints', icon: Map, exact: false },
    ],
  },
  {
    label: 'Operations',
    items: [
      { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, exact: false },
      { href: '/admin/preorders', label: 'Pre-orders', icon: Clock, exact: false, badge: true },
    ],
  },
  {
    label: 'Governance',
    items: [
      { href: '/admin/audit-log', label: 'Audit Logs', icon: ShieldAlert, exact: false },
    ],
  },
];

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
  const roleBadge = getRoleBadgeConfig(session?.role || 'SUPER_ADMIN');

  return (
    <aside
      className="w-64 shrink-0 flex flex-col h-screen sticky top-0 select-none"
      style={{
        background: 'linear-gradient(180deg, rgba(20,20,24,0.98) 0%, rgba(9,9,11,0.99) 100%)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(40px)',
      }}
    >
      {/* Brand Header */}
      <div className="px-5 py-5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/admin" className="flex items-center gap-3 group">
          <BrandIcon size="sm" />
          <div>
            <p className="font-display font-bold text-sm text-white leading-none">
              Submit<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-extrabold">Kit</span>
            </p>
            <p className="text-[10px] text-zinc-500 mt-1 font-medium tracking-wide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Admin Console v2
            </p>
          </div>
        </Link>
      </div>

      {/* Quick Search / Command Palette trigger */}
      <div className="px-3 pt-3 pb-1">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white transition-all group"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
            <span>Search & Quick Menu</span>
          </span>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-500 group-hover:text-zinc-300">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-3 space-y-5 overflow-y-auto">
        {ADMIN_NAV_SECTIONS.map(section => (
          <div key={section.label}>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 mb-1.5">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon, exact, badge }) => {
                const isActive = exact ? pathname === href : pathname.startsWith(href);
                const showBadge = badge && hasNewPreorders;

                return (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative group"
                    style={
                      isActive
                        ? {
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.22), rgba(99,102,241,0.09))',
                            border: '1px solid rgba(99,102,241,0.3)',
                            color: '#ffffff',
                            boxShadow: '0 0 20px rgba(99,102,241,0.12)',
                          }
                        : {
                            border: '1px solid transparent',
                            color: '#82828e',
                          }
                    }
                  >
                    {isActive && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
                        style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg,#818cf8,#6366f1)' }}
                      />
                    )}
                    <Icon
                      className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110"
                      style={{ color: isActive ? '#818cf8' : undefined }}
                    />
                    <span className="flex-1 truncate">{label}</span>

                    {showBadge && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                      </span>
                    )}

                    {isActive && !showBadge && (
                      <ChevronRight className="h-3 w-3 text-indigo-400 opacity-70" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Admin Profile & Role Footer */}
      <div className="px-3 pb-4 pt-3 space-y-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          className="px-3 py-2.5 rounded-xl flex items-center justify-between"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-inner"
              style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}
            >
              {session?.displayName?.[0] || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate leading-none">
                {session?.displayName || 'Administrator'}
              </p>
              <p className="text-[10px] text-zinc-500 truncate mt-1">
                {session?.email || 'admin@submitkit.in'}
              </p>
            </div>
          </div>

          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0"
            style={{
              background: roleBadge.bg,
              color: roleBadge.text,
              border: `1px solid ${roleBadge.border}`,
            }}
          >
            {roleBadge.label}
          </span>
        </div>

        <a
          href="/api/admin/logout"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium w-full transition-colors text-zinc-500 hover:text-red-400 hover:bg-red-500/5"
          style={{ border: '1px solid transparent' }}
        >
          <LogOut className="h-3.5 w-3.5 shrink-0" />
          <span>Sign Out</span>
        </a>
      </div>
    </aside>
  );
}
