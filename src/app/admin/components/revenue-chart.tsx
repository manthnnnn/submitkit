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

// ── Shared Tooltip Shell ────────────────────────────────────────────────────
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
        background: 'rgba(10, 12, 18, 0.96)',
        border: '1px solid rgba(13, 148, 136, 0.3)',
        borderRadius: '12px',
        padding: '10px 14px',
        fontSize: '12px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(13, 148, 136, 0.1)',
      }}
    >
      <p style={{ color: '#71717a', marginBottom: '6px', fontSize: '11px', fontWeight: 600 }}>
        {label}
      </p>
      {lines.map(l => (
        <p key={l.label} style={{ color: l.color, fontWeight: 800 }}>
          {l.label !== '_' && <span style={{ color: '#a1a1aa', fontWeight: 400 }}>{l.label}: </span>}
          {l.value}
        </p>
      ))}
    </div>
  );
}

const axisStyle = { fontSize: 11, fill: '#52525b', fontWeight: 500 };
const gridStyle = { stroke: 'rgba(255,255,255,0.05)', strokeDasharray: '4 4' };

function EmptyChart() {
  return (
    <div className="h-[200px] flex items-center justify-center text-xs text-zinc-500 font-mono">
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
            color: '#2dd4bf',
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
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(13, 148, 136, 0.08)' }} />
        <Bar dataKey="revenue" fill="url(#tealBarGrad)" radius={[6, 6, 0, 0]} maxBarSize={32}>
          <defs>
            <linearGradient id="tealBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="60%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#042f2e" stopOpacity={0.8} />
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
            color: '#fbbf24',
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
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar dataKey="revenue" radius={[0, 6, 6, 0]} maxBarSize={28}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.tier === 'MAJOR' ? '#f59e0b' : '#0d9488'}
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
          { color: '#2dd4bf', label: 'Paid Orders', value: String(payload[0]?.value ?? 0) },
          { color: '#52525b', label: 'Total Carts', value: String(payload[1]?.value ?? 0) },
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
          stroke="#2dd4bf"
          strokeWidth={2.5}
          dot={{ r: 3, fill: '#0d9488', stroke: '#2dd4bf', strokeWidth: 1.5 }}
          activeDot={{ r: 6, fill: '#2dd4bf' }}
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#3f3f46"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
