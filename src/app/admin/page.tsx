import { createAdminClient } from '@/lib/supabase/admin';
import { formatCurrency } from '@/lib/utils';
import { IndianRupee, Package, ShoppingCart, TrendingUp, AlertTriangle, Activity, Clock, BarChart3 } from 'lucide-react';
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
    supabase.from('orders')
      .select('id, customer_name, amount_paid, created_at, projects(title)')
      .eq('status', 'PAID')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase.from('orders')
      .select('amount_paid, created_at')
      .eq('status', 'PAID')
      .gte('created_at', new Date(Date.now() - 14 * 86400000).toISOString()),
  ]);

  const totalRevenue   = paidOrders?.reduce((s, o) => s + o.amount_paid, 0) ?? 0;
  const totalPaidCount = paidOrders?.length ?? 0;
  const preOrderCount  = preOrders?.length ?? 0;

  // Build daily revenue for last 14 days
  const dailyMap: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    dailyMap[key] = 0;
  }
  for (const o of allOrdersForChart ?? []) {
    const key = new Date(o.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    if (key in dailyMap) dailyMap[key] += o.amount_paid;
  }
  const revenueChartData = Object.entries(dailyMap).map(([date, revenue]) => ({ date, revenue }));

  // Pre-order demand pipeline (top 3)
  const demandMap: Record<string, { title: string; count: number }> = {};
  for (const p of preOrders ?? []) {
    if (!demandMap[p.project_slug]) demandMap[p.project_slug] = { title: p.project_title || p.project_slug, count: 0 };
    demandMap[p.project_slug].count++;
  }
  const demandPipeline = Object.values(demandMap).sort((a, b) => b.count - a.count).slice(0, 3);

  return {
    projectCount: projectCount ?? 0,
    totalRevenue,
    totalPaidCount,
    pendingOrders: pendingOrders ?? 0,
    preOrderCount,
    revenueChartData,
    recentOrders: (recentOrders ?? []) as any[],
    demandPipeline,
  };
}

export default async function AdminDashboard() {
  let data = null;
  let fetchError = false;

  try { data = await fetchDashboardData(); }
  catch { fetchError = true; }

  if (fetchError || !data) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-300 font-semibold mb-1">Unable to load stats</p>
            <p className="text-amber-200/70 text-sm leading-relaxed">
              Check that <code className="bg-white/10 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
              <code className="bg-white/10 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> are set, then reload.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Revenue',      value: formatCurrency(data.totalRevenue),   Icon: IndianRupee,  colorBg: 'bg-brand-500/10',    colorIcon: 'text-brand-400'    },
    { label: 'Successful Orders',  value: String(data.totalPaidCount),          Icon: ShoppingCart, colorBg: 'bg-emerald-500/10',  colorIcon: 'text-emerald-400'  },
    { label: 'Active Projects',    value: String(data.projectCount),            Icon: Package,      colorBg: 'bg-accent-500/10',   colorIcon: 'text-accent-400'   },
    { label: 'Pending Carts',      value: String(data.pendingOrders),           Icon: TrendingUp,   colorBg: 'bg-orange-500/10',   colorIcon: 'text-orange-400'   },
    { label: 'Pre-orders',         value: String(data.preOrderCount),           Icon: Clock,        colorBg: 'bg-indigo-500/10',   colorIcon: 'text-indigo-400'   },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full font-medium">
          <Activity className="w-3 h-3" /> Live Data
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map(({ label, value, Icon, colorBg, colorIcon }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-400 text-sm font-medium">{label}</p>
              <div className={`${colorBg} p-2 rounded-lg`}><Icon className={`h-4 w-4 ${colorIcon}`} /></div>
            </div>
            <p className="text-2xl font-bold text-white font-display">{value}</p>
          </div>
        ))}
      </div>

      {/* Bottom widgets row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Widget 1 — Revenue by Day chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Revenue — Last 14 Days</h2>
              <p className="text-xs text-slate-500 mt-0.5">Paid orders only</p>
            </div>
            <Link href="/admin/analytics" className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 font-medium">
              <BarChart3 className="w-3.5 h-3.5" /> Full Analytics
            </Link>
          </div>
          <div className="p-5">
            <RevenueDayChart data={data.revenueChartData} />
          </div>
        </div>

        {/* Widget 2 — Recent 5 orders + Widget 3 — Pre-order demand */}
        <div className="flex flex-col gap-6">

          {/* Recent orders */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex-1">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-bold text-white">Recent Sales</h2>
              <Link href="/admin/orders" className="text-xs text-slate-400 hover:text-white transition-colors">View all →</Link>
            </div>
            <div className="divide-y divide-slate-800/60">
              {data.recentOrders.length === 0 && (
                <p className="text-slate-600 text-xs px-4 py-6 text-center">No sales yet</p>
              )}
              {data.recentOrders.map((o: any) => (
                <div key={o.id} className="px-4 py-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{o.customer_name}</p>
                    <p className="text-slate-500 text-[11px] truncate">{o.projects?.title ?? '—'}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-emerald-400 text-xs font-bold">{formatCurrency(o.amount_paid)}</p>
                    <p className="text-slate-600 text-[10px]">
                      {new Date(o.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-order demand pipeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-bold text-white">Demand Pipeline</h2>
              <Link href="/admin/preorders" className="text-xs text-slate-400 hover:text-white transition-colors">View all →</Link>
            </div>
            <div className="p-4 space-y-3">
              {data.demandPipeline.length === 0 && (
                <p className="text-slate-600 text-xs text-center py-2">No pre-orders yet</p>
              )}
              {data.demandPipeline.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-3">
                  <p className="text-slate-300 text-xs truncate capitalize flex-1">{item.title.replace(/-/g, ' ')}</p>
                  <span className="shrink-0 text-xs font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 px-2 py-0.5 rounded-full">
                    {item.count} waiting
                  </span>
                </div>
              ))}
              <p className="text-slate-600 text-[10px] leading-relaxed pt-1 border-t border-slate-800">
                Build the most-wanted project next
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
