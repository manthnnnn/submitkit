import { createAdminClient } from '@/lib/supabase/admin';
import { formatCurrency } from '@/lib/utils';
import { IndianRupee, Package, ShoppingCart, TrendingUp, AlertTriangle, Activity, Clock, BarChart3, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { RevenueDayChart } from './components/revenue-chart';

export const dynamic = 'force-dynamic';

async function fetchDashboardData() {
  const supabase = createAdminClient();
  const [
    { count: projectCount },
    { data: paidOrders },
    { count: pendingOrders },
    { data: preOrders },
    { data: recentOrders },
    { data: allOrdersForChart },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('amount_paid').eq('status', 'PAID'),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'PENDING'),
    supabase.from('pre_orders').select('project_slug, project_title').order('created_at', { ascending: false }),
    supabase.from('orders').select('id, customer_name, amount_paid, created_at, projects(title)').eq('status', 'PAID').order('created_at', { ascending: false }).limit(5),
    supabase.from('orders').select('amount_paid, created_at').eq('status', 'PAID').gte('created_at', new Date(Date.now() - 14 * 86400000).toISOString()),
  ]);

  const totalRevenue = paidOrders?.reduce((s, o) => s + o.amount_paid, 0) ?? 0;
  const totalPaidCount = paidOrders?.length ?? 0;
  const preOrderCount = preOrders?.length ?? 0;

  const dailyMap: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    dailyMap[d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })] = 0;
  }
  for (const o of allOrdersForChart ?? []) {
    const key = new Date(o.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    if (key in dailyMap) dailyMap[key] += o.amount_paid;
  }
  const revenueChartData = Object.entries(dailyMap).map(([date, revenue]) => ({ date, revenue }));

  const demandMap: Record<string, { title: string; count: number }> = {};
  for (const p of preOrders ?? []) {
    if (!demandMap[p.project_slug]) demandMap[p.project_slug] = { title: p.project_title || p.project_slug, count: 0 };
    demandMap[p.project_slug].count++;
  }
  const demandPipeline = Object.values(demandMap).sort((a, b) => b.count - a.count).slice(0, 3);

  return { projectCount: projectCount ?? 0, totalRevenue, totalPaidCount, pendingOrders: pendingOrders ?? 0, preOrderCount, revenueChartData, recentOrders: (recentOrders ?? []) as any[], demandPipeline };
}

// ── Shared card shell ──────────────────────────────────────────────────────
const card = "relative overflow-hidden rounded-2xl";
const cardStyle = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
};

export default async function AdminDashboard() {
  let data = null;
  let fetchError = false;
  try { data = await fetchDashboardData(); } catch { fetchError = true; }

  if (fetchError || !data) {
    return (
      <div className="space-y-4">
        <PageHeader title="Dashboard" subtitle="Welcome back" />
        <div className={card} style={{ ...cardStyle, borderColor: 'rgba(245,158,11,0.25)' }}>
          <div className="p-5 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}>
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p className="text-amber-300 font-semibold text-sm mb-1">Unable to load stats</p>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Check <code className="bg-white/10 px-1.5 py-0.5 rounded text-zinc-300">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-white/10 px-1.5 py-0.5 rounded text-zinc-300">SUPABASE_SERVICE_ROLE_KEY</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Revenue',     value: formatCurrency(data.totalRevenue),  Icon: IndianRupee,  accent: '#818cf8', glow: 'rgba(99,102,241,0.15)',  iconBg: 'rgba(99,102,241,0.15)'  },
    { label: 'Paid Orders',       value: String(data.totalPaidCount),         Icon: ShoppingCart, accent: '#34d399', glow: 'rgba(16,185,129,0.12)',  iconBg: 'rgba(16,185,129,0.12)'  },
    { label: 'Live Projects',     value: String(data.projectCount),           Icon: Package,      accent: '#2dd4bf', glow: 'rgba(20,184,166,0.12)',  iconBg: 'rgba(20,184,166,0.12)'  },
    { label: 'Pending Carts',     value: String(data.pendingOrders),          Icon: TrendingUp,   accent: '#fb923c', glow: 'rgba(249,115,22,0.12)',  iconBg: 'rgba(249,115,22,0.12)'  },
    { label: 'Pre-orders',        value: String(data.preOrderCount),          Icon: Clock,        accent: '#a78bfa', glow: 'rgba(139,92,246,0.12)',  iconBg: 'rgba(139,92,246,0.12)'  },
  ];

  return (
    <div className="space-y-7">
      <PageHeader title="Dashboard" subtitle={`Good ${getTimeOfDay()} — here's what's happening`} badge="Live" />

      {/* Stat grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {statCards.map(({ label, value, Icon, accent, glow, iconBg }) => (
          <div key={label} className={card} style={{ ...cardStyle, transition: 'box-shadow 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${accent}30, 0 8px 32px ${glow}`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 0 rgba(255,255,255,0.06) inset'; }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-zinc-500 text-xs font-medium leading-tight">{label}</p>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: iconBg, border: `1px solid ${accent}30` }}>
                  <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
                </div>
              </div>
              <p className="text-2xl font-bold font-display text-white tracking-tight">{value}</p>
            </div>
            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${accent}40, transparent)` }} />
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Revenue chart */}
        <div className={`${card} lg:col-span-2`} style={cardStyle}>
          <div className="px-5 pt-5 pb-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <p className="text-white font-semibold text-sm">Revenue — Last 14 Days</p>
              <p className="text-zinc-600 text-xs mt-0.5">Paid orders only</p>
            </div>
            <Link href="/admin/analytics" className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors px-3 py-1.5 rounded-lg"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <BarChart3 className="w-3 h-3" /> Analytics
            </Link>
          </div>
          <div className="p-5">
            <RevenueDayChart data={data.revenueChartData} />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          {/* Recent sales */}
          <div className={`${card} flex-1`} style={cardStyle}>
            <div className="px-4 pt-4 pb-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-white font-semibold text-sm">Recent Sales</p>
              <Link href="/admin/orders" className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors">
                All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div>
              {data.recentOrders.length === 0 ? (
                <p className="text-zinc-700 text-xs px-4 py-6 text-center">No sales yet</p>
              ) : data.recentOrders.map((o: any, i: number) => (
                <div key={o.id} className="px-4 py-3 flex items-center justify-between gap-3 transition-colors hover:bg-white/[0.02]"
                  style={{ borderBottom: i < data.recentOrders.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{o.customer_name}</p>
                    <p className="text-zinc-600 text-[11px] truncate mt-0.5">{o.projects?.title ?? '—'}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-emerald-400 text-xs font-bold">{formatCurrency(o.amount_paid)}</p>
                    <p className="text-zinc-700 text-[10px] mt-0.5">
                      {new Date(o.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demand pipeline */}
          <div className={card} style={cardStyle}>
            <div className="px-4 pt-4 pb-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-white font-semibold text-sm">Demand Pipeline</p>
              <Link href="/admin/preorders" className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors">
                All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-4 space-y-3">
              {data.demandPipeline.length === 0 ? (
                <p className="text-zinc-700 text-xs text-center py-1">No pre-orders yet</p>
              ) : data.demandPipeline.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-3">
                  <p className="text-zinc-300 text-xs truncate capitalize flex-1">{item.title.replace(/-/g, ' ')}</p>
                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa' }}>
                    {item.count} waiting
                  </span>
                </div>
              ))}
              <p className="text-zinc-700 text-[10px] pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                Build the top-demand project next ↑
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function PageHeader({ title, subtitle, badge }: { title: string; subtitle: string; badge?: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-display font-bold text-white tracking-tight">{title}</h1>
        <p className="text-zinc-500 text-sm mt-0.5">{subtitle}</p>
      </div>
      {badge && (
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <Activity className="w-3 h-3" /> {badge}
        </span>
      )}
    </div>
  );
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
