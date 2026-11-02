'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavProgress } from './nav-progress';
import { AdminSidebar } from './admin-sidebar';
import { CommandPalette } from './command-palette';
import { RealtimeOrdersToast } from './realtime-toasts';
import { BrandIcon } from '@/components/ui/logo';
import { AdminSession } from '@/lib/rbac';
import { Menu, X, Search, Plus, ExternalLink, ShieldCheck, Terminal } from 'lucide-react';

const LAST_VIEWED_KEY = 'admin_last_viewed_preorders';

export function AdminShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: AdminSession | null;
}) {
  const pathname = usePathname();
  const [hasNewPreorders, setHasNewPreorders] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Check unread preorders
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
      } catch {
        /* ignore */
      }
    };
    check();
  }, []);

  // Update last viewed on visiting preorders
  useEffect(() => {
    if (pathname.startsWith('/admin/preorders')) {
      localStorage.setItem(LAST_VIEWED_KEY, new Date().toISOString());
      setHasNewPreorders(false);
    }
    setSidebarOpen(false);
  }, [pathname]);

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Format breadcrumb title
  const cleanPath = pathname.replace('/admin', '').replace(/^\//, '');
  const sectionName = cleanPath ? cleanPath.charAt(0).toUpperCase() + cleanPath.slice(1) : 'Dashboard';

  return (
    <div className="min-h-screen flex bg-[#07080B] text-zinc-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <NavProgress />

      {/* ── 3D Ambient Background Glows ── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-40 left-1/3 w-[700px] h-[500px] rounded-full blur-[160px] opacity-15"
          style={{ background: 'radial-gradient(circle, #0D9488 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-10 right-10 w-[550px] h-[450px] rounded-full blur-[140px] opacity-10"
          style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Realtime Toast Notifications & Command Palette ── */}
      <RealtimeOrdersToast />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />

      {/* ── Desktop Sidebar ── */}
      <div className="hidden md:flex shrink-0">
        <AdminSidebar
          session={session}
          hasNewPreorders={hasNewPreorders}
          onOpenCommandPalette={() => setPaletteOpen(true)}
        />
      </div>

      {/* ── Mobile Top Bar ── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 border-b border-white/[0.08]"
        style={{
          background: 'rgba(9,10,15,0.96)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Link href={session?.role === 'CONTENT_ADMIN' ? '/admin/projects' : '/admin'} className="flex items-center gap-2">
          <BrandIcon size="sm" />
          <span className="font-display font-bold text-sm text-white">
            Submit<span className="text-teal-400">Kit</span>
          </span>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
            Localhost
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaletteOpen(true)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white bg-white/[0.04] border border-white/[0.08]"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setSidebarOpen(p => !p)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white bg-white/[0.04] border border-white/[0.08]"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Sidebar Drawer ── */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10 w-72 h-full flex flex-col bg-[#090A0F]">
            <AdminSidebar
              session={session}
              hasNewPreorders={hasNewPreorders}
              onOpenCommandPalette={() => {
                setSidebarOpen(false);
                setPaletteOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* ── Main Workspace Area ── */}
      <div className="flex-1 min-w-0 flex flex-col md:pl-0 pt-14 md:pt-0">
        {/* Desktop Top HUD Strip */}
        <header className="hidden md:flex items-center justify-between px-6 lg:px-8 h-14 border-b border-white/[0.06] bg-white/[0.015] sticky top-0 z-20 backdrop-blur-xl">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="text-zinc-500 font-mono">Console</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-200 font-bold">{sectionName}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Localhost Enclave Live Tag */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-teal-300 bg-teal-950/50 border border-teal-700/40 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span>Localhost 127.0.0.1</span>
            </div>

            {/* Quick Action: New Project */}
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-sm active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Kit</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
