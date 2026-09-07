'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Cell,
} from 'recharts';

interface DailyRevenue { date: string; revenue: number }
interface ProjectRevenue { name: string; revenue: number; tier: 'MINI' | 'MAJOR' }
interface DailyOrders   { date: string; total: number; paid: number }

// ── Shared tooltip shell ────────────────────────────────────────────────────
function ChartTooltip({ label, lines }: { label: string; lines: { color: string; label: string; value: string }[] }) {
  return (
    <div style={{
      background: 'rgba(9,9,11,0.95)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '10px',
      padding: '10px 14px',
      fontSize: '12px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    }}>
      <p style={{ color: '#52525b', marginBottom: '6px', fontSize: '11px' }}>{label}</p>
      {lines.map(l => (
        <p key={l.label} style={{ color: l.color, fontWeight: 700 }}>
          {l.label !== '_' && <span style={{ color: '#71717a', fontWeight: 400 }}>{l.label}: </span>}
          {l.value}
        </p>
      ))}
    </div>
  );
}

const axisStyle = { fontSize: 10, fill: '#3f3f46' };
const gridStyle = { stroke: 'rgba(255,255,255,0.04)', strokeDasharray: '3 3' };

// ── Revenue by Day ──────────────────────────────────────────────────────────
export function RevenueDayChart({ data }: { data: DailyRevenue[] }) {
  if (!data.length) return <EmptyChart />;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return <ChartTooltip label={label} lines={[{ color: '#818cf8', label: '_', value: `₹${Number(payload[0].value).toLocaleString('en-IN')}` }]} />;
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid {...gridStyle} vertical={false} />
        <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} interval={1} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
        <Bar dataKey="revenue" fill="url(#barGrad)" radius={[4, 4, 0, 0]} maxBarSize={36}>
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} />
            </linearGradient>
          </defs>
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Revenue by Project (horizontal) ────────────────────────────────────────
export function RevenueProjectChart({ data }: { data: ProjectRevenue[] }) {
  if (!data.length) return <EmptyChart />;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return <ChartTooltip label={label} lines={[{ color: '#fbbf24', label: '_', value: `₹${Number(payload[0].value).toLocaleString('en-IN')}` }]} />;
  };

  return (
    <ResponsiveContainer width="100%" height={Math.max(160, data.length * 48)}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 0 }}>
        <CartesianGrid {...gridStyle} horizontal={false} />
        <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false}
          tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
        <YAxis type="category" dataKey="name" tick={axisStyle} axisLine={false} tickLine={false}
          width={150} tickFormatter={v => v.length > 20 ? v.slice(0, 20) + '…' : v} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar dataKey="revenue" radius={[0, 4, 4, 0]} maxBarSize={28}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.tier === 'MAJOR' ? '#f59e0b' : '#6366f1'} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Sales velocity line chart ───────────────────────────────────────────────
export function SalesVelocityChart({ data }: { data: DailyOrders[] }) {
  if (!data.length) return <EmptyChart />;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <ChartTooltip
        label={label}
        lines={payload.map((p: any) => ({
          color: p.dataKey === 'paid' ? '#818cf8' : '#3f3f46',
          label: p.dataKey === 'paid' ? 'Paid' : 'Total',
          value: String(p.value),
        }))}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid {...gridStyle} vertical={false} />
        <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} interval={4} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="total" stroke="rgba(255,255,255,0.08)" strokeWidth={1.5} dot={false} />
        <Line type="monotone" dataKey="paid" stroke="#6366f1" strokeWidth={2} dot={false}
          activeDot={{ r: 4, fill: '#818cf8', stroke: 'rgba(99,102,241,0.3)', strokeWidth: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function EmptyChart() {
  return (
    <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#3f3f46', fontSize: '13px' }}>No data yet</p>
    </div>
  );
}
