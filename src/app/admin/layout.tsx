'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Layers, LayoutDashboard, Package, ShoppingCart, Clock, BarChart3,
} from 'lucide-react';
import { LogoutButton } from '@/components/ui/logout-button';
import { createClient } from '@/lib/supabase/client';

const NAV_SECTIONS: {
  label: string;
  items: { href: string; label: string; Icon: React.ElementType; exact: boolean; badge: boolean }[];
}[] = [
  {
    label: 'Content',
    items: [
      { href: '/admin',          label: 'Dashboard', Icon: LayoutDashboard, exact: true,  badge: false },
      { href: '/admin/projects', label: 'Projects',  Icon: Package,          exact: false, badge: false },
    ],
  },
  {
    label: 'Operations',
    items: [
      { href: '/admin/orders',    label: 'Orders',     Icon: ShoppingCart, exact: false, badge: false },
      { href: '/admin/preorders', label: 'Pre-orders', Icon: Clock,        exact: false, badge: true  },
    ],
  },
  {
    label: 'Insights',
    items: [
      { href: '/admin/analytics', label: 'Analytics', Icon: BarChart3, exact: false, badge: false },
    ],
  },
];

const LAST_VIEWED_KEY = 'admin_last_viewed_preorders';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [hasNewPreorders, setHasNewPreorders] = useState(false);

  // Check for unread pre-orders
  useEffect(() => {
    const check = async () => {
      try {
        const lastViewed = localStorage.getItem(LAST_VIEWED_KEY);
        const supabase = createClient();
        let query = supabase
          .from('pre_orders')
          .select('created_at')
          .order('created_at', { ascending: false })
          .limit(1);
        if (lastViewed) query = query.gt('created_at', lastViewed);
        const { data } = await query;
        setHasNewPreorders((data?.length ?? 0) > 0);
      } catch { /* ignore */ }
    };
    check();
  }, []);

  // Mark preorders as viewed when visiting the page
  useEffect(() => {
    if (pathname.startsWith('/admin/preorders')) {
      localStorage.setItem(LAST_VIEWED_KEY, new Date().toISOString());
      setHasNewPreorders(false);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-60 bg-slate-900 border-r border-slate-800 flex-shrink-0 md:min-h-screen flex flex-col">

        {/* Brand */}
        <div className="p-5 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="bg-brand-500/10 p-1.5 rounded-lg border border-brand-500/20">
              <Layers className="h-5 w-5 text-brand-400" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white block leading-tight">SubmitKit</span>
              <span className="text-[10px] text-slate-500 font-medium">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Nav sections */}
        <nav className="p-3 flex-1 space-y-5">
          {NAV_SECTIONS.map(section => (
            <div key={section.label}>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-3 mb-1.5">
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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${
                        isActive
                          ? 'bg-brand-500/15 text-white border border-brand-500/20'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {/* Active left border indicator */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-brand-400 rounded-r-full" />
                      )}
                      <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-brand-400' : ''}`} />
                      {label}
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

        {/* Bottom: user indicator + logout */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          <div className="px-3 py-1.5">
            <p className="text-[10px] text-slate-600 font-medium">Logged in as</p>
            <p className="text-xs text-slate-400 font-semibold">Admin</p>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
