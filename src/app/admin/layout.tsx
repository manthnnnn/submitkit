'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingCart, Clock, BarChart3, LogOut, ShieldCheck, Map
} from 'lucide-react';
import { NavProgress } from './components/nav-progress';
import { BrandIcon, Logo } from '@/components/ui/logo';

const NAV_SECTIONS: {
  label: string;
  items: { href: string; label: string; Icon: React.ElementType; exact: boolean; badge: boolean }[];
}[] = [
  {
    label: 'Overview',
    items: [
      { href: '/admin',           label: 'Dashboard', Icon: LayoutDashboard, exact: true,  badge: false },
      { href: '/admin/analytics', label: 'Analytics', Icon: BarChart3,       exact: false, badge: false },
    ],
  },
  {
    label: 'Manage',
    items: [
      { href: '/admin/projects',    label: 'Projects',    Icon: Package,      exact: false, badge: false },
      { href: '/admin/orders',      label: 'Orders',      Icon: ShoppingCart, exact: false, badge: false },
      { href: '/admin/blueprints',  label: 'Blueprints',  Icon: Map,          exact: false, badge: false },
      { href: '/admin/preorders',   label: 'Pre-orders',  Icon: Clock,        exact: false, badge: true  },
      { href: '/admin/benchmarks',  label: 'Benchmarks',  Icon: ShieldCheck,  exact: false, badge: false },
    ],
  },
];

const LAST_VIEWED_KEY = 'admin_last_viewed_preorders';

// ── Sidebar extracted as a module-level component so React never recreates it ──
function AdminSidebar({
  pathname,
  hasNewPreorders,
  onSignOut,
}: {
  pathname: string;
  hasNewPreorders: boolean;
  onSignOut?: () => void;
}) {
  return (
    <aside
      className="w-64 shrink-0 flex flex-col h-screen sticky top-0"
      style={{
        background: 'linear-gradient(180deg, rgba(24,24,27,0.97) 0%, rgba(9,9,11,0.99) 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(40px)',
      }}
    >
      {/* Logo */}
      <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Link href="/admin" className="flex items-center gap-3 group">
          <BrandIcon size="sm" />
          <div>
            <p className="font-display font-bold text-sm text-white leading-none">
              Submit<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-extrabold">Kit</span>
            </p>
            <p className="text-[10px] text-zinc-500 mt-1 font-medium tracking-wide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              Admin Console
            </p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {NAV_SECTIONS.map(section => (
          <div key={section.label}>
            <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest px-3 mb-2">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map(({ href, label, Icon, exact, badge }) => {
                const isActive = exact ? pathname === href : pathname.startsWith(href);
                const showDot = badge && hasNewPreorders;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative"
                    style={isActive ? {
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(99,102,241,0.08))',
                      border: '1px solid rgba(99,102,241,0.25)',
                      color: '#fff',
                      boxShadow: '0 0 20px rgba(99,102,241,0.08)',
                    } : {
                      border: '1px solid transparent',
                      color: '#71717a',
                    }}
                  >
                    {isActive && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
                        style={{ width: '2px', height: '18px', background: 'linear-gradient(180deg,#818cf8,#6366f1)' }}
                      />
                    )}
                    <Icon className="h-4 w-4 shrink-0" style={{ color: isActive ? '#818cf8' : '' }} />
                    <span>{label}</span>
                    {showDot && (
                      <span className="ml-auto flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
                      </span>
                    )}
                    {isActive && !showDot && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 pt-3 space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="px-3 py-2.5 rounded-xl flex items-center gap-2.5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}
          >
            A
          </div>
          <div>
            <p className="text-xs font-semibold text-white leading-none">Admin</p>
            <p className="text-[10px] text-zinc-600 mt-0.5">Full access</p>
          </div>
        </div>

        <a
          href="/api/admin/logout"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-colors text-zinc-500 hover:text-red-400"
          style={{ border: '1px solid transparent' }}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign Out
        </a>
      </div>
    </aside>
  );
}

// ── Main layout ──────────────────────────────────────────────────────────────
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [hasNewPreorders, setHasNewPreorders] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const lastViewed = localStorage.getItem(LAST_VIEWED_KEY);
        const url = lastViewed
          ? `/api/admin/preorders/unread-count?since=${encodeURIComponent(lastViewed)}`
          : '/api/admin/preorders/unread-count';
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setHasNewPreorders(Boolean(data.hasUnread));
        }
      } catch { /* ignore */ }
    };
    check();
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/admin/preorders')) {
      localStorage.setItem(LAST_VIEWED_KEY, new Date().toISOString());
      setHasNewPreorders(false);
    }
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen flex" style={{ background: '#09090b' }}>
      <NavProgress />

      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] bg-brand-500/10 -top-40 -left-20" />
        <div className="glow-orb w-[400px] h-[400px] bg-emerald-500/5 bottom-0 right-0" />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex shrink-0">
        <AdminSidebar pathname={pathname} hasNewPreorders={hasNewPreorders} />
      </div>

      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14"
        style={{
          background: 'rgba(9,9,11,0.94)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Logo size="sm" href="/admin" badge="Admin" />
        <button
          onClick={() => setSidebarOpen(v => !v)}
          className="text-zinc-400 hover:text-white p-2 rounded-lg transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)' }}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 drawer-backdrop"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
          />
          <div
            className="absolute left-0 top-0 bottom-0 w-64 drawer-slide-in"
            onClick={e => e.stopPropagation()}
          >
            <AdminSidebar pathname={pathname} hasNewPreorders={hasNewPreorders} />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto md:p-8 p-4 pt-20 md:pt-8">
        <div key={pathname} className="max-w-7xl mx-auto page-enter">
          {children}
        </div>
      </main>
    </div>
  );
}
