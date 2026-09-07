import { createAdminClient } from '@/lib/supabase/admin';
import { formatCurrency } from '@/lib/utils';
import { IndianRupee, Package, ShoppingCart, TrendingUp, AlertTriangle, Activity, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function fetchStats() {
  const supabase = createAdminClient();

  const [
    { count: projectCount, error: e1 },
    { data: paidOrders,    error: e2 },
    { count: pendingOrders,error: e3 },
    preOrderRes,
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('amount_paid').eq('status', 'PAID'),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'PENDING'),
    supabase.from('pre_orders').select('*', { count: 'exact', head: true }),
  ]);

  if (e1 || e2 || e3) throw new Error('Supabase query failed');

  const totalRevenue   = paidOrders?.reduce((s, o) => s + o.amount_paid, 0) ?? 0;
  const totalPaidCount = paidOrders?.length ?? 0;
  const preOrderCount  = preOrderRes?.count ?? 0;

  return { projectCount: projectCount ?? 0, totalRevenue, totalPaidCount, pendingOrders: pendingOrders ?? 0, preOrderCount };
}

export default async function AdminDashboard() {
  let stats = null;
  let fetchError = false;

  try {
    stats = await fetchStats();
  } catch {
    fetchError = true;
  }

  if (fetchError || !stats) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-300 font-semibold mb-1">Unable to load stats</p>
            <p className="text-amber-200/70 text-sm leading-relaxed">
              Could not connect to Supabase. Check that <code className="bg-white/10 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
              <code className="bg-white/10 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> are set in your environment variables, then reload this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label:    'Total Revenue',
      value:    formatCurrency(stats.totalRevenue),
      Icon:     IndianRupee,
      colorBg:  'bg-brand-500/10',
      colorIcon:'text-brand-400',
    },
    {
      label:    'Successful Orders',
      value:    String(stats.totalPaidCount),
      Icon:     ShoppingCart,
      colorBg:  'bg-emerald-500/10',
      colorIcon:'text-emerald-400',
    },
    {
      label:    'Active Projects',
      value:    String(stats.projectCount),
      Icon:     Package,
      colorBg:  'bg-accent-500/10',
      colorIcon:'text-accent-400',
    },
    {
      label:    'Pending Carts',
      value:    String(stats.pendingOrders),
      Icon:     TrendingUp,
      colorBg:  'bg-orange-500/10',
      colorIcon:'text-orange-400',
    },
    {
      label:    'Pre-orders',
      value:    String(stats.preOrderCount),
      Icon:     Clock,
      colorBg:  'bg-indigo-500/10',
      colorIcon:'text-indigo-400',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full font-medium">
          <Activity className="w-3 h-3" />
          Live Data
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {statCards.map(({ label, value, Icon, colorBg, colorIcon }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-400 text-sm font-medium">{label}</p>
              <div className={`${colorBg} p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${colorIcon}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white font-display">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">System Status</h2>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Supabase Database</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Operational
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Razorpay Webhooks</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">R2 File Delivery</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
