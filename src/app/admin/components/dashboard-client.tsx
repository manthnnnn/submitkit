'use client';

import { useState } from 'react';
import {
  IndianRupee, Package, ShoppingCart, TrendingUp,
  Clock, BarChart3, ArrowRight, Activity, Eye,
} from 'lucide-react';
import Link from 'next/link';
import { RevenueDayChart } from './revenue-chart';
import { formatCurrency } from '@/lib/utils';

interface Props {
  stats: {
    totalRevenue:   string;
    totalPaidCount: number;
    projectCount:   number;
    pendingOrders:  number;
    preOrderCount:  number;
    todayViews:     number;
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

const cardBase: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
  borderRadius: '16px',
  position: 'relative',
  overflow: 'hidden',
};

const STAT_CONFIG = [
  { key: 'totalRevenue',   label: 'Total Revenue',   Icon: IndianRupee,  accent: '#818cf8', iconBg: 'rgba(99,102,241,0.15)'  },
  { key: 'totalPaidCount', label: 'Paid Orders',      Icon: ShoppingCart, accent: '#34d399', iconBg: 'rgba(16,185,129,0.12)'  },
  { key: 'todayViews',     label: 'Visitors Today',   Icon: Eye,          accent: '#38bdf8', iconBg: 'rgba(56,189,248,0.12)', href: '/admin/analytics' },
  { key: 'projectCount',   label: 'Live Projects',    Icon: Package,      accent: '#2dd4bf', iconBg: 'rgba(20,184,166,0.12)'  },
  { key: 'preOrderCount',  label: 'Pre-orders',       Icon: Clock,        accent: '#a78bfa', iconBg: 'rgba(139,92,246,0.12)', href: '/admin/preorders' },
  { key: 'pendingOrders',  label: 'Pending Carts',    Icon: TrendingUp,   accent: '#fb923c', iconBg: 'rgba(249,115,22,0.12)'  },
] as const;

function StatCard({
  label, value, Icon, accent, iconBg, href,
}: {
  label: string; value: string | number; Icon: React.ElementType;
  accent: string; iconBg: string; href?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const content = (
    <div
      style={{
        ...cardBase,
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered
          ? `0 0 0 1px ${accent}50, 0 12px 32px ${accent}20`
          : '0 1px 0 rgba(255,255,255,0.06) inset',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={href ? 'cursor-pointer' : ''}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-zinc-500 text-xs font-medium">{label}</p>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: iconBg, border: `1px solid ${accent}30` }}
          >
            <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
          </div>
        </div>
        <p className="text-2xl font-bold font-display text-white tracking-tight">{value}</p>
      </div>
      {/* bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${accent}40, transparent)` }}
      />
    </div>
  );

  if (href) {
    return <Link href={href} className="block">{content}</Link>;
  }
  return content;
}

export function DashboardClient({ stats, revenueChartData, recentOrders, demandPipeline }: Props) {
  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Welcome back — here&apos;s what&apos;s happening</p>
        </div>
        <span
          className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          Live Platform
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {STAT_CONFIG.map(({ key, label, Icon, accent, iconBg, ...rest }) => (
          <StatCard
            key={key}
            label={label}
            value={stats[key as keyof typeof stats]}
            Icon={Icon}
            accent={accent}
            iconBg={iconBg}
            href={(rest as any).href}
          />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Revenue chart */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden" style={cardBase}>
          <div
            className="px-5 pt-5 pb-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div>
              <p className="text-white font-semibold text-sm">Revenue — Last 14 Days</p>
              <p className="text-zinc-600 text-xs mt-0.5">Paid orders only</p>
            </div>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors px-3 py-1.5 rounded-lg"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}
            >
              <BarChart3 className="w-3 h-3" /> Analytics
            </Link>
          </div>
          <div className="p-5">
            <RevenueDayChart data={revenueChartData} />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          {/* Recent sales */}
          <div className="rounded-2xl overflow-hidden flex-1" style={cardBase}>
            <div
              className="px-4 pt-4 pb-3 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <p className="text-white font-semibold text-sm">Recent Sales</p>
              <Link
                href="/admin/orders"
                className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors"
              >
                All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div>
              {recentOrders.length === 0 ? (
                <p className="text-zinc-700 text-xs px-4 py-6 text-center">No sales yet</p>
              ) : recentOrders.map((o, i) => (
                <div
                  key={o.id}
                  className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                  style={{
                    borderBottom: i < recentOrders.length - 1
                      ? '1px solid rgba(255,255,255,0.04)'
                      : 'none',
                  }}
                >
                  <div className="min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{o.customer_name}</p>
                    <p className="text-zinc-600 text-[11px] truncate mt-0.5">
                      {o.projects?.title ?? '—'}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-emerald-400 text-xs font-bold">{formatCurrency(o.amount_paid)}</p>
                    <p className="text-zinc-700 text-[10px] mt-0.5">
                      {new Date(o.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demand pipeline */}
          <div className="rounded-2xl overflow-hidden" style={cardBase}>
            <div
              className="px-4 pt-4 pb-3 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <p className="text-white font-semibold text-sm">Demand Pipeline</p>
              <Link
                href="/admin/preorders"
                className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors"
              >
                All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-4 space-y-3">
              {demandPipeline.length === 0 ? (
                <p className="text-zinc-700 text-xs text-center py-1">No pre-orders yet</p>
              ) : demandPipeline.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-3">
                  <p className="text-zinc-300 text-xs truncate capitalize flex-1">
                    {item.title.replace(/-/g, ' ')}
                  </p>
                  <span
                    className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(139,92,246,0.12)',
                      border: '1px solid rgba(139,92,246,0.25)',
                      color: '#a78bfa',
                    }}
                  >
                    {item.count} waiting
                  </span>
                </div>
              ))}
              <p
                className="text-zinc-700 text-[10px] pt-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
              >
                Build the top-demand project next ↑
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
