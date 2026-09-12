import { createAdminClient } from '@/lib/supabase/admin';
import { formatCurrency } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import { DashboardClient } from './components/dashboard-client';
import { unstable_cache } from 'next/cache';

import { safeQuery } from '@/lib/safe-query';

async function fetchDashboardData() {
  const supabase = createAdminClient();
  const [
    projectCount,
    paidOrders,
    pendingOrders,
    preOrders,
    recentOrders,
    allOrdersForChart,
    todayViewsCount,
  ] = await Promise.all([
    safeQuery(supabase.from('projects').select('*', { count: 'exact', head: true }).then(r => r.count ?? 0), 0, 2500),
    safeQuery(supabase.from('orders').select('amount_paid').eq('status', 'PAID').limit(500).then(r => r.data ?? []), [], 2500),
    safeQuery(supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'PENDING').then(r => r.count ?? 0), 0, 2500),
    safeQuery(supabase.from('pre_orders').select('project_slug, project_title').limit(200).then(r => r.data ?? []), [], 2500),
    safeQuery(supabase.from('orders').select('id, customer_name, amount_paid, created_at, projects(title)').eq('status', 'PAID').order('created_at', { ascending: false }).limit(5).then(r => r.data ?? []), [], 2500),
    safeQuery(supabase.from('orders').select('amount_paid, created_at').eq('status', 'PAID').gte('created_at', new Date(Date.now() - 14 * 86400000).toISOString()).limit(500).then(r => r.data ?? []), [], 2500),
    safeQuery(supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', new Date(Date.now() - 86400000).toISOString()).then(r => r.count ?? 0), 0, 2000),
  ]);

  const totalRevenue   = paidOrders.reduce((s, o) => s + (o.amount_paid || 0), 0);
  const totalPaidCount = paidOrders.length;
  const preOrderCount  = preOrders.length;
  const todayViews     = todayViewsCount;

  // Build daily revenue for last 14 days
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

  // Demand pipeline
  const demandMap: Record<string, { title: string; count: number }> = {};
  for (const p of preOrders ?? []) {
    if (!demandMap[p.project_slug]) demandMap[p.project_slug] = { title: p.project_title || p.project_slug, count: 0 };
    demandMap[p.project_slug].count++;
  }
  const demandPipeline = Object.values(demandMap).sort((a, b) => b.count - a.count).slice(0, 3);

  return {
    projectCount:     projectCount ?? 0,
    totalRevenue,
    totalPaidCount,
    pendingOrders:    pendingOrders ?? 0,
    preOrderCount,
    todayViews,
    revenueChartData,
    recentOrders:     (recentOrders ?? []) as unknown as {
      id: string;
      customer_name: string;
      amount_paid: number;
      created_at: string;
      projects: { title: string } | null;
    }[],
    demandPipeline,
  };
}

const getCachedDashboardData = unstable_cache(
  async () => fetchDashboardData(),
  ['admin-dashboard-stats-cache'],
  {
    revalidate: 60,
    tags: ['dashboard', 'orders', 'projects', 'preorders'],
  }
);

export default async function AdminDashboard() {
  let data = null;
  let fetchError = false;
  try {
    data = await getCachedDashboardData();
  } catch (err) {
    console.error('Admin Dashboard Cache Fetch Error:', err);
    fetchError = true;
  }

  if (fetchError || !data) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Dashboard</h1>
        </div>
        <div
          className="rounded-2xl p-5 flex items-start gap-4"
          style={{
            background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
            border: '1px solid rgba(245,158,11,0.25)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}>
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </div>
          <div>
            <p className="text-amber-300 font-semibold text-sm mb-1">Unable to load stats</p>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Check <code className="bg-white/10 px-1.5 py-0.5 rounded text-zinc-300">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-zinc-300">SUPABASE_SERVICE_ROLE_KEY</code> then reload.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardClient
      stats={{
        totalRevenue:   formatCurrency(data.totalRevenue),
        totalPaidCount: data.totalPaidCount.toLocaleString('en-IN'),
        projectCount:   data.projectCount.toLocaleString('en-IN'),
        pendingOrders:  data.pendingOrders.toLocaleString('en-IN'),
        preOrderCount:  data.preOrderCount.toLocaleString('en-IN'),
        todayViews:     data.todayViews.toLocaleString('en-IN'),
      }}
      revenueChartData={data.revenueChartData}
      recentOrders={data.recentOrders}
      demandPipeline={data.demandPipeline}
    />
  );
}
