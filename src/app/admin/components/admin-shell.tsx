'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { NavProgress } from './nav-progress';
import { AdminSidebar } from './admin-sidebar';
import { CommandPalette } from './command-palette';
import { RealtimeOrdersToast } from './realtime-toasts';
import { Logo } from '@/components/ui/logo';
import { AdminSession } from '@/lib/rbac';
import { Menu, X, Search } from 'lucide-react';

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

  return (
    <div className="min-h-screen flex" style={{ background: '#09090b', color: '#f4f4f5' }}>
      <NavProgress />

      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[650px] h-[650px] bg-indigo-600/10 -top-40 -left-20" />
        <div className="glow-orb w-[450px] h-[450px] bg-emerald-500/5 bottom-0 right-0" />
      </div>

      {/* Realtime Toast Notifications & Command Palette */}
      <RealtimeOrdersToast />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />

      {/* Desktop sidebar */}
      <div className="hidden md:flex shrink-0">
        <AdminSidebar
          session={session}
          hasNewPreorders={hasNewPreorders}
          onOpenCommandPalette={() => setPaletteOpen(true)}
        />
      </div>

      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14"
        style={{
          background: 'rgba(9,9,11,0.95)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Logo size="sm" href="/admin" badge="Admin" />

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaletteOpen(true)}
            className="p-2 rounded-xl text-zinc-400 hover:text-white"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            aria-label="Search commands"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="text-zinc-400 hover:text-white p-2 rounded-xl transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="absolute inset-0 transition-opacity"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)' }}
          />
          <div
            className="absolute left-0 top-0 bottom-0 w-64 shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={e => e.stopPropagation()}
          >
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

      {/* Main content viewport */}
      <main className="flex-1 min-w-0 overflow-auto md:p-8 p-4 pt-20 md:pt-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
