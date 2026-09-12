import { createAdminClient } from '@/lib/supabase/admin';
import { AlertTriangle, Map } from 'lucide-react';
import { BlueprintPurchasesTable } from './client-table';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Blueprint Sales | SubmitKit Admin', robots: 'noindex' };

const cardStyle = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
};

export type BlueprintRow = {
  id: string;
  topic_id: string;
  topic_title: string;
  customer_email: string;
  customer_phone: string;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  amount: number;
  status: 'PENDING' | 'PAID' | 'FAILED';
  pdf_downloads: number;
  created_at: string;
};

import { unstable_cache } from 'next/cache';
import { safeQuery } from '@/lib/safe-query';

const getCachedBlueprints = unstable_cache(
  async () => {
    const supabase = createAdminClient();
    const result = await safeQuery<{ data: any[] | null; error: any }>(
      Promise.resolve(
        supabase
          .from('blueprint_purchases')
          .select(
            'id, topic_id, topic_title, customer_email, customer_phone, razorpay_order_id, razorpay_payment_id, amount, status, pdf_downloads, created_at'
          )
          .order('created_at', { ascending: false })
          .limit(300)
      ),
      { data: [], error: null },
      3000
    );

    return { data: (result?.data || []) as BlueprintRow[], error: (result?.error?.message as string) || null };
  },
  ['admin-blueprint-purchases-safe-cache'],
  { revalidate: 30, tags: ['blueprints', 'orders'] }
);

export default async function AdminBlueprintsPage() {
  const { data, error } = await getCachedBlueprints();

  if (error) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Blueprint Sales</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Choose Your Topic — ₹19 purchases</p>
        </div>
        <div className="rounded-2xl p-5 flex items-start gap-4" style={{ ...cardStyle, borderColor: 'rgba(239,68,68,0.25)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </div>
          <div>
            <p className="text-red-300 font-semibold text-sm mb-1">Failed to load blueprint purchases</p>
            <p className="text-zinc-500 text-xs">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const rows = (data ?? []) as BlueprintRow[];
  const paid    = rows.filter(r => r.status === 'PAID');
  const revenue = paid.reduce((s, r) => s + r.amount, 0);
  const downloads = paid.reduce((s, r) => s + r.pdf_downloads, 0);

  const stats = [
    { label: 'Revenue (₹19 × paid)',  value: `₹${revenue}`,        accent: '#34d399' },
    { label: 'Paid Blueprints',        value: String(paid.length),   accent: '#34d399' },
    { label: 'Pending / Other',        value: String(rows.length - paid.length), accent: '#fbbf24' },
    { label: 'Total .docx Downloads',  value: String(downloads),     accent: '#a78bfa' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Blueprint Sales</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            All "Choose Your Topic" purchases — ₹19 each
          </p>
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <Map className="w-4 h-4 text-indigo-400" />
        </div>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ label, value, accent }) => (
          <div key={label} className="rounded-2xl p-4" style={cardStyle}>
            <p className="text-zinc-600 text-xs font-medium mb-1">{label}</p>
            <p className="text-xl font-bold font-display" style={{ color: accent }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Search tip */}
      <div className="rounded-xl px-4 py-2.5 text-xs flex items-center gap-2"
        style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <span className="text-indigo-400">💡</span>
        <span className="text-zinc-400">
          Search by <span className="text-zinc-200 font-medium">topic</span>,{' '}
          <span className="text-zinc-200 font-medium">email</span>, or{' '}
          <span className="text-zinc-200 font-medium">Razorpay ID</span>
        </span>
      </div>

      <BlueprintPurchasesTable rows={rows} />
    </div>
  );
}
