'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from 'recharts';

interface DailyRevenue {
  date: string;
  revenue: number;
}
interface ProjectRevenue {
  name: string;
  revenue: number;
  tier: 'MINI' | 'MAJOR';
}
interface DailyOrders {
  date: string;
  total: number;
  paid: number;
}

// ── Shared Tooltip Shell (Light/Beige Theme) ─────────────────────────────────
function ChartTooltip({
  label,
  lines,
}: {
  label: string;
  lines: { color: string; label: string; value: string }[];
}) {
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.98)',
        border: '1px solid rgba(13, 148, 136, 0.3)',
        borderRadius: '12px',
        padding: '10px 14px',
        fontSize: '12px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
      }}
    >
      <p style={{ color: '#64748B', marginBottom: '6px', fontSize: '11px', fontWeight: 600 }}>
        {label}
      </p>
      {lines.map(l => (
        <p key={l.label} style={{ color: l.color, fontWeight: 800, margin: 0 }}>
          {l.label !== '_' && <span style={{ color: '#475569', fontWeight: 500 }}>{l.label}: </span>}
          {l.value}
        </p>
      ))}
    </div>
  );
}

const axisStyle = { fontSize: 11, fill: '#64748B', fontWeight: 600 };
const gridStyle = { stroke: 'rgba(15, 23, 42, 0.06)', strokeDasharray: '4 4' };

function EmptyChart() {
  return (
    <div className="h-[200px] flex items-center justify-center text-xs text-slate-400 font-mono">
      No telemetry recorded for this timeframe
    </div>
  );
}

// ── Revenue by Day ──────────────────────────────────────────────────────────
export function RevenueDayChart({ data }: { data: DailyRevenue[] }) {
  if (!data.length) return <EmptyChart />;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <ChartTooltip
        label={label}
        lines={[
          {
            color: '#0D9488',
            label: 'Daily Revenue',
            value: `₹${Number(payload[0].value).toLocaleString('en-IN')}`,
          },
        ]}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid {...gridStyle} vertical={false} />
        <XAxis
          dataKey="date"
          tick={axisStyle}
          axisLine={false}
          tickLine={false}
          interval={1}
        />
        <YAxis
          tick={axisStyle}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(13, 148, 136, 0.05)' }} />
        <Bar dataKey="revenue" fill="url(#tealBarGrad)" radius={[6, 6, 0, 0]} maxBarSize={32}>
          <defs>
            <linearGradient id="tealBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="60%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#0F766E" />
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
    return (
      <ChartTooltip
        label={label}
        lines={[
          {
            color: '#D97706',
            label: 'Kit Revenue',
            value: `₹${Number(payload[0].value).toLocaleString('en-IN')}`,
          },
        ]}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={Math.max(160, data.length * 48)}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 0 }}>
        <CartesianGrid {...gridStyle} horizontal={false} />
        <XAxis
          type="number"
          tick={axisStyle}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={axisStyle}
          axisLine={false}
          tickLine={false}
          width={150}
          tickFormatter={v => (v.length > 20 ? v.slice(0, 20) + '…' : v)}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(15, 23, 42, 0.03)' }} />
        <Bar dataKey="revenue" radius={[0, 6, 6, 0]} maxBarSize={28}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.tier === 'MAJOR' ? '#D97706' : '#0D9488'}
              fillOpacity={0.9}
            />
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
        lines={[
          { color: '#0D9488', label: 'Paid Orders', value: String(payload[0]?.value ?? 0) },
          { color: '#94A3B8', label: 'Total Carts', value: String(payload[1]?.value ?? 0) },
        ]}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid {...gridStyle} vertical={false} />
        <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} interval={2} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="paid"
          stroke="#0D9488"
          strokeWidth={2.5}
          dot={{ r: 3.5, fill: '#0F766E', stroke: '#14B8A6', strokeWidth: 1.5 }}
          activeDot={{ r: 6, fill: '#0D9488' }}
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#94A3B8"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
