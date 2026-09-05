'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, LayoutDashboard, Package, ShoppingCart } from "lucide-react";
import { LogoutButton } from "@/components/ui/logout-button";

const NAV = [
  { href: '/admin',          label: 'Dashboard', Icon: LayoutDashboard, exact: true },
  { href: '/admin/projects', label: 'Projects',  Icon: Package,         exact: false },
  { href: '/admin/orders',   label: 'Orders',    Icon: ShoppingCart,    exact: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-60 bg-slate-900 border-r border-slate-800 flex-shrink-0 md:min-h-screen flex flex-col">
        <div className="p-5 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="bg-brand-500/10 p-1.5 rounded-lg border border-brand-500/20">
              <Layers className="h-5 w-5 text-brand-400" />
            </div>
            <span className="font-display font-bold text-base text-white">Vault Admin</span>
          </Link>
        </div>

        <nav className="p-3 space-y-1 flex-1">
          {NAV.map(({ href, label, Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-500/15 text-white border border-brand-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-brand-400' : ''}`} />
                {label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800">
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
