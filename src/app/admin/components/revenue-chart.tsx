'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Cell,
} from 'recharts';

// ── Revenue by Day Bar Chart ────────────────────────────────────────────────
interface DailyRevenue { date: string; revenue: number }

export function RevenueDayChart({ data }: { data: DailyRevenue[] }) {
  if (data.length === 0) return <EmptyChart />;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs shadow-xl">
        <p className="text-slate-400 mb-1">{label}</p>
        <p className="text-brand-300 font-bold">₹{payload[0].value.toLocaleString('en-IN')}</p>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false}
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.08)' }} />
        <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Revenue by Project Horizontal Bar Chart ─────────────────────────────────
interface ProjectRevenue { name: string; revenue: number; tier: 'MINI' | 'MAJOR' }

export function RevenueProjectChart({ data }: { data: ProjectRevenue[] }) {
  if (data.length === 0) return <EmptyChart />;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs shadow-xl">
        <p className="text-slate-400 mb-1 max-w-[200px] truncate">{label}</p>
        <p className="text-amber-300 font-bold">₹{payload[0].value.toLocaleString('en-IN')}</p>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={Math.max(160, data.length * 44)}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false}
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false}
          tickLine={false} width={140} tickFormatter={(v) => v.length > 18 ? v.slice(0, 18) + '…' : v} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
        <Bar dataKey="revenue" radius={[0, 4, 4, 0]} maxBarSize={28}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.tier === 'MAJOR' ? '#f59e0b' : '#6366f1'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Sales Velocity Line Chart ───────────────────────────────────────────────
interface DailyOrders { date: string; total: number; paid: number }

export function SalesVelocityChart({ data }: { data: DailyOrders[] }) {
  if (data.length === 0) return <EmptyChart />;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs shadow-xl">
        <p className="text-slate-400 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }} className="font-semibold">
            {p.dataKey === 'paid' ? 'Paid' : 'Total'}: {p.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="total" stroke="#475569" strokeWidth={1.5} dot={false} />
        <Line type="monotone" dataKey="paid" stroke="#6366f1" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function EmptyChart() {
  return (
    <div className="h-40 flex items-center justify-center text-slate-600 text-sm">
      No data yet
    </div>
  );
}
