'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Users,
  Eye,
  TrendingUp,
  TrendingDown,
  Smartphone,
  Monitor,
  Copy,
  Check,
  Sparkles,
  Calendar,
  Compass,
  ArrowUpRight,
  ExternalLink,
  Activity,
  Trash2,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export interface PageViewRecord {
  id: string;
  visitor_id: string;
  path: string;
  referrer: string | null;
  device: string | null;
  created_at: string;
}

interface TrafficDashboardProps {
  initialViews: PageViewRecord[];
  isTableReady: boolean;
  projectMap: Record<string, string>; // slug -> title
}

type TimeRange = '1d' | '7d' | '30d';

const cardStyle = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
};

// SQL code for 1-click copy if table is not created yet
const SQL_MIGRATION = `-- Run in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.page_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id TEXT NOT NULL,
    path TEXT NOT NULL,
    referrer TEXT,
    device TEXT DEFAULT 'desktop',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON public.page_views(visitor_id);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views(path);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous visitor tracking insert" ON public.page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role full access" ON public.page_views USING (true) WITH CHECK (true);`;

export function TrafficAnalyticsDashboard({
  initialViews,
  isTableReady,
  projectMap,
}: TrafficDashboardProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('1d');
  const [copied, setCopied] = useState(false);
  const [views, setViews] = useState<PageViewRecord[]>(initialViews ?? []);
  const [isResetting, setIsResetting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [excludeDevice, setExcludeDevice] = useState(false);
  const [resetNotice, setResetNotice] = useState<string | null>(null);

  // Sync state if initialViews changes
  useEffect(() => {
    setViews(initialViews ?? []);
  }, [initialViews]);

  // Load excludeDevice preference from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sk_ignore_analytics');
      if (stored === 'true') {
        setExcludeDevice(true);
      }
    } catch {
      /* silent */
    }
  }, []);

  const toggleExcludeDevice = () => {
    const nextVal = !excludeDevice;
    setExcludeDevice(nextVal);
    try {
      localStorage.setItem('sk_ignore_analytics', nextVal ? 'true' : 'false');
    } catch {
      /* silent */
    }
  };

  const handleResetViews = async () => {
    setIsResetting(true);
    try {
      const res = await fetch('/api/admin/analytics/reset', { method: 'POST' });
      if (res.ok) {
        setViews([]);
        setShowConfirmModal(false);
        setResetNotice('✅ All recorded page views have been deleted.');
        setTimeout(() => setResetNotice(null), 4000);
      } else {
        const data = await res.json().catch(() => ({}));
        setShowConfirmModal(false);
        setResetNotice('❌ Reset failed: ' + (data.error || 'Server error'));
        setTimeout(() => setResetNotice(null), 5000);
      }
    } catch (err: any) {
      setShowConfirmModal(false);
      setResetNotice('❌ Network error: ' + err.message);
      setTimeout(() => setResetNotice(null), 5000);
    } finally {
      setIsResetting(false);
    }
  };

  const copySql = () => {
    navigator.clipboard.writeText(SQL_MIGRATION);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ── Compute Filtered Metrics & Comparisons ────────────────────────────────
  const stats = useMemo(() => {
    const now = Date.now();
    let currentMs = 86400000;
    let label = 'Today (1 Day)';
    let daysCount = 1;

    if (timeRange === '1d') {
      currentMs = 1 * 86400000;
      label = 'Today (1 Day)';
      daysCount = 1;
    } else if (timeRange === '7d') {
      currentMs = 7 * 86400000;
      label = 'Last 7 Days';
      daysCount = 7;
    } else {
      currentMs = 30 * 86400000;
      label = 'Last 30 Days';
      daysCount = 30;
    }

    const currentStartTime = now - currentMs;
    const previousStartTime = now - currentMs * 2;

    const currentPeriodViews = views.filter(v => new Date(v.created_at).getTime() >= currentStartTime);
    const previousPeriodViews = views.filter(
      v => new Date(v.created_at).getTime() >= previousStartTime && new Date(v.created_at).getTime() < currentStartTime
    );

    // Current period metrics
    const totalViews = currentPeriodViews.length;
    const uniqueVisitorsSet = new Set(currentPeriodViews.map(v => v.visitor_id));
    const uniqueVisitors = uniqueVisitorsSet.size;

    // Previous period metrics
    const prevTotalViews = previousPeriodViews.length;
    const prevUniqueVisitorsSet = new Set(previousPeriodViews.map(v => v.visitor_id));
    const prevUniqueVisitors = prevUniqueVisitorsSet.size;

    // Growth calculations
    let viewsGrowth = 0;
    if (prevTotalViews > 0) {
      viewsGrowth = Math.round(((totalViews - prevTotalViews) / prevTotalViews) * 100);
    } else if (totalViews > 0) {
      viewsGrowth = 100;
    }

    let visitorsGrowth = 0;
    if (prevUniqueVisitors > 0) {
      visitorsGrowth = Math.round(((uniqueVisitors - prevUniqueVisitors) / prevUniqueVisitors) * 100);
    } else if (uniqueVisitors > 0) {
      visitorsGrowth = 100;
    }

    const avgPagesPerUser = uniqueVisitors > 0 ? (totalViews / uniqueVisitors).toFixed(1) : '0';

    // Device breakdown
    const mobileCount = currentPeriodViews.filter(v => v.device === 'mobile').length;
    const desktopCount = currentPeriodViews.filter(v => v.device !== 'mobile').length;
    const mobilePct = totalViews > 0 ? Math.round((mobileCount / totalViews) * 100) : 0;
    const desktopPct = totalViews > 0 ? 100 - mobilePct : 0;

    // Top Pages / Projects
    const pathCounts: Record<string, { count: number; uniqueVisitors: Set<string> }> = {};
    for (const v of currentPeriodViews) {
      if (!pathCounts[v.path]) {
        pathCounts[v.path] = { count: 0, uniqueVisitors: new Set() };
      }
      pathCounts[v.path].count++;
      pathCounts[v.path].uniqueVisitors.add(v.visitor_id);
    }

    const topPages = Object.entries(pathCounts)
      .map(([path, data]) => {
        let title = path === '/' ? 'Home / Catalog Landing' : path;
        if (path.startsWith('/projects/')) {
          const slug = path.replace('/projects/', '');
          title = projectMap[slug] || slug.replace(/-/g, ' ').toUpperCase();
        } else if (path.startsWith('/order/lookup')) {
          title = 'Order Lookup / Download Access';
        } else if (path.startsWith('/viva/')) {
          title = 'AI Viva Prep Portal';
        }
        return {
          path,
          title,
          views: data.count,
          uniques: data.uniqueVisitors.size,
          pct: totalViews > 0 ? Math.round((data.count / totalViews) * 100) : 0,
        };
      })
      .sort((a, b) => b.views - a.views)
      .slice(0, 6);

    // Chart daily or hourly timeline — ONLY REAL DATA
    let chartData: { label: string; views: number; visitors: number }[] = [];

    if (timeRange === '1d') {
      // 6 4-hour slots for today
      const slots = [
        { label: '12 AM', startH: 0, endH: 4 },
        { label: '4 AM',  startH: 4, endH: 8 },
        { label: '8 AM',  startH: 8, endH: 12 },
        { label: '12 PM', startH: 12, endH: 16 },
        { label: '4 PM',  startH: 16, endH: 20 },
        { label: '8 PM',  startH: 20, endH: 24 },
      ];

      chartData = slots.map(slot => {
        const slotViews = currentPeriodViews.filter(v => {
          const h = new Date(v.created_at).getHours();
          return h >= slot.startH && h < slot.endH;
        });
        const slotUniques = new Set(slotViews.map(v => v.visitor_id)).size;
        return {
          label: slot.label,
          views: slotViews.length,
          visitors: slotUniques,
        };
      });
    } else {
      // Group by calendar day
      const dayMap: Record<string, { views: number; visitors: Set<string> }> = {};
      for (let i = daysCount - 1; i >= 0; i--) {
        const d = new Date(now - i * 86400000);
        const dayKey = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
        dayMap[dayKey] = { views: 0, visitors: new Set() };
      }

      for (const v of currentPeriodViews) {
        const dayKey = new Date(v.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
        if (dayMap[dayKey]) {
          dayMap[dayKey].views++;
          dayMap[dayKey].visitors.add(v.visitor_id);
        }
      }

      chartData = Object.entries(dayMap).map(([label, d]) => ({
        label,
        views: d.views,
        visitors: d.visitors.size,
      }));
    }

    return {
      label,
      totalViews,
      uniqueVisitors,
      viewsGrowth,
      visitorsGrowth,
      avgPagesPerUser,
      mobilePct,
      desktopPct,
      topPages,
      chartData,
    };
  }, [views, timeRange, projectMap]);

  return (
    <div className="space-y-6">
      {/* Toast Notice */}
      {resetNotice && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
          <span>{resetNotice}</span>
          <button onClick={() => setResetNotice(null)} className="text-zinc-500 hover:text-white">✕</button>
        </div>
      )}

      {/* Control Bar: Time Filters, Exclusion Switch, Reset Button */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Eye className="w-5 h-5 text-brand-400" />
              Live Website Traffic & Visitors
            </h2>
            {stats.totalViews > 0 ? (
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                  stats.viewsGrowth >= 0
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {stats.viewsGrowth >= 0 ? (
                  <>
                    <TrendingUp className="w-3 h-3" />
                    Traffic Growing (+{stats.viewsGrowth}%)
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-3 h-3" />
                    Traffic Slower ({stats.viewsGrowth}%)
                  </>
                )}
              </span>
            ) : (
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                0 Views Recorded
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Real-time verified hits from students exploring projects on submitkit.in
          </p>
        </div>

        {/* Action Controls Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Exclude My Device Toggle */}
          <button
            onClick={toggleExcludeDevice}
            title={excludeDevice ? 'Tracking disabled on this device' : 'Click to stop counting your own visits on this device'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all active:scale-95 ${
              excludeDevice
                ? 'bg-purple-500/15 border-purple-500/30 text-purple-300 shadow-sm shadow-purple-500/10'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>{excludeDevice ? 'This Device Excluded 🛡️' : 'Exclude My Device'}</span>
          </button>

          {/* Reset / Delete Views Button */}
          <button
            onClick={() => setShowConfirmModal(true)}
            title="Delete all recorded views and reset counts to 0"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-rose-500/25 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-all active:scale-95"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Reset Views</span>
          </button>

          {/* 1 Day, 7 Days, 30 Days Toggle Buttons */}
          <div
            className="flex items-center p-1 rounded-xl border border-zinc-800 bg-zinc-950/70"
            style={{ backdropFilter: 'blur(12px)' }}
          >
            <button
              onClick={() => setTimeRange('1d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeRange === '1d'
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Today (1 Day)
            </button>
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeRange === '7d'
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              This Week (7 Days)
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeRange === '30d'
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              This Month (30 Days)
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl p-6 border border-zinc-800 bg-zinc-900 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Reset All Views?</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  This will delete all views recorded so far and reset your visitor count back to <strong className="text-white">0</strong>.
                  Use this to clear out test views from your own phone or laptop.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={isResetting}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white rounded-xl bg-zinc-800/80 hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetViews}
                disabled={isResetting}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-xl bg-rose-600 hover:bg-rose-500 transition-colors shadow-lg shadow-rose-600/20 disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {isResetting ? 'Deleting...' : 'Yes, Delete & Reset to 0'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div key={timeRange} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 tab-panel-enter">
        {/* Card 1: Unique Visitors (New Users) */}
        <div className="rounded-2xl p-5" style={cardStyle}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Unique Students / Visitors</span>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <Users className="w-4 h-4 text-brand-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-display font-bold text-white tracking-tight">
              {stats.uniqueVisitors.toLocaleString()}
            </span>
            {stats.uniqueVisitors > 0 && (
              <span
                className={`text-xs font-semibold flex items-center ${
                  stats.visitorsGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {stats.visitorsGrowth >= 0 ? `+${stats.visitorsGrowth}%` : `${stats.visitorsGrowth}%`}
                <span className="text-zinc-500 font-normal ml-1">vs prev</span>
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Distinct students visiting in {stats.label.toLowerCase()}</p>
        </div>

        {/* Card 2: Total Page Views */}
        <div className="rounded-2xl p-5" style={cardStyle}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Total Page Views</span>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.2)' }}
            >
              <Eye className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-display font-bold text-white tracking-tight">
              {stats.totalViews.toLocaleString()}
            </span>
            {stats.totalViews > 0 && (
              <span
                className={`text-xs font-semibold flex items-center ${
                  stats.viewsGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {stats.viewsGrowth >= 0 ? `+${stats.viewsGrowth}%` : `${stats.viewsGrowth}%`}
                <span className="text-zinc-500 font-normal ml-1">vs prev</span>
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Total page navigations recorded</p>
        </div>

        {/* Card 3: Avg Views Per Student */}
        <div className="rounded-2xl p-5" style={cardStyle}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Pages / Student</span>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.2)' }}
            >
              <Compass className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-display font-bold text-white tracking-tight">
              {stats.avgPagesPerUser}
            </span>
            <span className="text-xs text-amber-400/90 font-medium">
              {Number(stats.avgPagesPerUser) > 1.5 ? 'High Intent' : 'Active'}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Avg projects viewed per student</p>
        </div>

        {/* Card 4: Device Split */}
        <div className="rounded-2xl p-5" style={cardStyle}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Device Platform</span>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.2)' }}
            >
              <Smartphone className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Smartphone className="w-3.5 h-3.5 text-purple-400" />
              <span>Mobile {stats.mobilePct}%</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Monitor className="w-3.5 h-3.5 text-blue-400" />
              <span>Desktop {stats.desktopPct}%</span>
            </div>
          </div>
          <div className="w-full bg-zinc-800/60 h-2 rounded-full mt-2.5 overflow-hidden flex">
            <div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${stats.mobilePct}%` }} />
            <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${stats.desktopPct}%` }} />
          </div>
        </div>
      </div>

      {/* Traffic Trend Chart */}
      <div className="rounded-2xl p-5" style={cardStyle}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Verified Traffic & Visitor Volume</h3>
            <p className="text-xs text-zinc-500">
              Comparing verified page hits against distinct students ({stats.label})
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm inline-block bg-brand-500" />
              Page Views
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm inline-block bg-emerald-400" />
              Unique Visitors
            </span>
          </div>
        </div>

        {stats.totalViews === 0 ? (
          <div className="py-12 text-center">
            <Activity className="w-8 h-8 text-zinc-700 mx-auto mb-2 animate-pulse" />
            <p className="text-zinc-400 text-sm font-medium">No page views recorded yet in {stats.label.toLowerCase()}</p>
            <p className="text-zinc-600 text-xs mt-1">Open submitkit.in on your mobile phone to see your view appear here in real-time!</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div
                      style={{
                        background: 'rgba(9,9,11,0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        padding: '10px 14px',
                        fontSize: '12px',
                      }}
                    >
                      <p style={{ color: '#71717a', marginBottom: '6px', fontSize: '11px' }}>{label}</p>
                      <p style={{ color: '#818cf8', fontWeight: 700 }}>
                        Page Views: {payload[0]?.value}
                      </p>
                      <p style={{ color: '#34d399', fontWeight: 700 }}>
                        Unique Visitors: {payload[1]?.value}
                      </p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="views" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="visitors" fill="#34d399" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Top Viewed Projects & Student Demand Table */}
      <div className="rounded-2xl p-5" style={cardStyle}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Most Viewed Projects</h3>
            <p className="text-xs text-zinc-500">
              Live student interest ranking based on verified clicks
            </p>
          </div>
          <span className="text-xs text-zinc-500 font-medium">Ranked by visits</span>
        </div>

        {stats.topPages.length === 0 ? (
          <div className="py-8 text-center text-zinc-600 text-xs">
            No project views recorded yet in this time window.
          </div>
        ) : (
          <div className="space-y-3">
            {stats.topPages.map((page, idx) => (
              <div
                key={page.path}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5 truncate max-w-[70%]">
                    <span
                      className={`w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center ${
                        idx === 0
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : idx === 1
                          ? 'bg-zinc-700 text-zinc-300'
                          : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-white truncate">{page.title}</span>
                    <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">{page.path}</span>
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    <span className="text-xs font-bold text-brand-300">{page.views} {page.views === 1 ? 'view' : 'views'}</span>
                    <span className="text-[11px] text-zinc-500">({page.uniques} {page.uniques === 1 ? 'student' : 'students'})</span>
                    <span className="text-[11px] font-semibold text-zinc-400 w-10 text-right">{page.pct}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-zinc-800/40 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-brand-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${page.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
