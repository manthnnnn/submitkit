'use client';

import { useState } from 'react';
import {
  IndianRupee,
  Package,
  ShoppingCart,
  TrendingUp,
  Clock,
  BarChart3,
  ArrowRight,
  Activity,
  Eye,
  Plus,
  ShieldCheck,
  Terminal,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { RevenueDayChart } from './revenue-chart';

interface Props {
  stats: {
    totalRevenue: string;
    totalPaidCount: string;
    projectCount: string;
    pendingOrders: string;
    preOrderCount: string;
    todayViews: string;
  };
  revenueChartData: { date: string; revenue: number }[];
  recentOrders: {
    id: string;
    customer_name: string;
    amount_paid: number;
    created_at: string;
    projects: { title: string } | null;
  }[];
  demandPipeline: { title: string; count: number }[];
}

interface StatConfigItem {
  key: keyof Props['stats'];
  label: string;
  Icon: React.ElementType;
  accent: string;
  iconBg: string;
  border: string;
  href?: string;
}

const STAT_CONFIG: StatConfigItem[] = [
  {
    key: 'totalRevenue',
    label: 'Gross Revenue',
    Icon: IndianRupee,
    accent: '#0D9488',
    iconBg: '#F0FDFA',
    border: 'rgba(13, 148, 136, 0.2)',
  },
  {
    key: 'totalPaidCount',
    label: 'Fulfilled Orders',
    Icon: ShoppingCart,
    accent: '#059669',
    iconBg: '#ECFDF5',
    border: 'rgba(5, 150, 105, 0.2)',
    href: '/admin/orders',
  },
  {
    key: 'todayViews',
    label: 'Today Visitors',
    Icon: Eye,
    accent: '#0284C7',
    iconBg: '#F0F9FF',
    border: 'rgba(2, 132, 199, 0.2)',
    href: '/admin/analytics',
  },
  {
    key: 'projectCount',
    label: 'Ready Project Kits',
    Icon: Package,
    accent: '#0F766E',
    iconBg: '#F0FDFA',
    border: 'rgba(15, 118, 110, 0.2)',
    href: '/admin/projects',
  },
  {
    key: 'preOrderCount',
    label: 'Student Pre-orders',
    Icon: Clock,
    accent: '#D97706',
    iconBg: '#FFFBEB',
    border: 'rgba(217, 119, 6, 0.2)',
    href: '/admin/preorders',
  },
  {
    key: 'pendingOrders',
    label: 'Active Carts',
    Icon: TrendingUp,
    accent: '#EA580C',
    iconBg: '#FFF7ED',
    border: 'rgba(234, 88, 12, 0.2)',
    href: '/admin/orders',
  },
];

function StatCard({
  label,
  value,
  Icon,
  accent,
  iconBg,
  border,
  href,
}: {
  label: string;
  value: string;
  Icon: React.ElementType;
  accent: string;
  iconBg: string;
  border: string;
  href?: string;
}) {
  const [hovered, setHovered] = useState(false);

  const card = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card relative rounded-2xl p-4 sm:p-5 transition-all duration-300 overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, rgba(253, 251, 247, 0.95) 45%, rgba(246, 252, 250, 0.98) 100%)',
        border: `1px solid ${hovered ? accent : 'rgba(226, 232, 240, 0.9)'}`,
        boxShadow: hovered
          ? `0 14px 34px -6px rgba(15, 23, 42, 0.12), 0 4px 12px -2px ${accent}25, inset 0 1px 0 rgba(255, 255, 255, 0.95)`
          : '0 8px 24px -4px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div className="flex items-center justify-between mb-3 relative z-10">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-200"
          style={{ background: iconBg, border: `1px solid ${border}` }}
        >
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
      </div>

      <div className="relative z-10">
        <div className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none whitespace-nowrap">
          {value}
        </div>
      </div>

      {/* Underglow accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2.5px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block cursor-pointer">
        {card}
      </Link>
    );
  }
  return card;
}

export function DashboardClient({ stats, revenueChartData, recentOrders, demandPipeline }: Props) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ── Top Header Banner with Quick Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none m-0">
              Operational Telemetry
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs">
              Live Feed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 m-0">
            Real-time analytics, revenue trajectory, and customer dispatch pipeline.
          </p>
        </div>

        {/* Quick Action Dock */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-600 hover:to-teal-700 transition-all shadow-xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Kit</span>
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-slate-500" />
            <span>Orders</span>
          </Link>
          <Link
            href="/admin/analytics"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs transition-all"
          >
            <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
            <span>Analytics</span>
          </Link>
        </div>
      </div>

      {/* ── 3D Tactile KPI Dock (Soft Beige Cards) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {STAT_CONFIG.map(cfg => (
          <StatCard
            key={cfg.key}
            label={cfg.label}
            value={stats[cfg.key] || '0'}
            Icon={cfg.Icon}
            accent={cfg.accent}
            iconBg={cfg.iconBg}
            border={cfg.border}
            href={cfg.href}
          />
        ))}
      </div>

      {/* ── Revenue Velocity Chart Section (Frosted Ivory Card) ── */}
      <div
        className="card rounded-3xl p-5 sm:p-6 border relative overflow-hidden transition-all"
        style={{
          background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, rgba(253, 251, 247, 0.95) 45%, rgba(246, 252, 250, 0.98) 100%)',
          borderColor: 'rgba(226, 232, 240, 0.9)',
          boxShadow: '0 12px 36px -8px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(13, 148, 136, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center shadow-2xs">
              <TrendingUp className="w-4 h-4 text-teal-700" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 tracking-tight m-0">
                Revenue Trajectory (14-Day Velocity)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 m-0">
                Daily settled customer transactions in Indian Rupees.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-slate-700 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
              Total: {stats.totalRevenue}
            </span>
            <Link
              href="/admin/analytics"
              className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 transition-colors"
            >
              Full Analytics <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <RevenueDayChart data={revenueChartData} />
      </div>

      {/* ── 2-Column Operations Grid: Recent Orders & Student Demand ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Orders Stream (2 cols) */}
        <div
          className="card lg:col-span-2 rounded-3xl p-5 sm:p-6 border relative overflow-hidden flex flex-col"
          style={{
            background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, rgba(253, 251, 247, 0.95) 45%, rgba(246, 252, 250, 0.98) 100%)',
            borderColor: 'rgba(226, 232, 240, 0.9)',
            boxShadow: '0 12px 36px -8px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
          }}
        >
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="w-4 h-4 text-teal-700" />
              <h3 className="font-display text-base font-bold text-slate-900 tracking-tight m-0">
                Recent Orders Stream
              </h3>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 transition-colors"
            >
              View All ({stats.totalPaidCount}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 font-mono text-xs">
              <ShoppingCart className="w-8 h-8 mb-2 opacity-30" />
              No customer orders recorded yet
            </div>
          ) : (
            <div className="divide-y divide-slate-100 overflow-x-auto">
              {recentOrders.map(o => (
                <div key={o.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200/80 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                      {o.customer_name ? o.customer_name.slice(0, 2).toUpperCase() : 'ST'}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 truncate">
                        {o.projects?.title || 'Mini/Major Project Kit'}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {o.customer_name || 'Verified Student'} ·{' '}
                        {new Date(o.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      ₹{o.amount_paid}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                      PAID
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Student Demand Radar (Pre-orders) */}
        <div
          className="card rounded-3xl p-5 sm:p-6 border relative overflow-hidden flex flex-col"
          style={{
            background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, rgba(253, 251, 247, 0.95) 45%, rgba(246, 252, 250, 0.98) 100%)',
            borderColor: 'rgba(226, 232, 240, 0.9)',
            boxShadow: '0 12px 36px -8px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
          }}
        >
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <h3 className="font-display text-base font-bold text-slate-900 tracking-tight m-0">
                Demand Radar
              </h3>
            </div>
            <Link
              href="/admin/preorders"
              className="text-xs font-bold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1 transition-colors"
            >
              All Pre-orders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Top project requests by engineering students awaiting immediate kit builds.
          </p>

          {demandPipeline.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400 font-mono text-xs">
              <Clock className="w-8 h-8 mb-2 opacity-30" />
              No pre-order demand logged yet
            </div>
          ) : (
            <div className="space-y-3">
              {demandPipeline.map(d => (
                <div
                  key={d.title}
                  className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-slate-900 truncate">{d.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 shrink-0">
                      {d.count} requests
                    </span>
                  </div>
                  <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-teal-600 h-1.5 rounded-full"
                      style={{
                        width: `${Math.min(100, (d.count / (demandPipeline[0]?.count || 1)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-slate-200/80">
            <Link
              href="/admin/projects/new"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs transition-all active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Fulfill High-Demand Topic</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
