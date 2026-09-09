import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateDefenseShield } from '@/lib/defense-shield';

export async function POST(req: NextRequest) {
  const { benchmarkId, email } = await req.json();
  if (!benchmarkId || !email) return NextResponse.json({ purchased: false });

  const supabase = createAdminClient();

  const { data: purchase } = await supabase
    .from('benchmark_purchases')
    .select('*, benchmark_runs(*)')
    .eq('benchmark_id', benchmarkId)
    .eq('customer_email', email.toLowerCase().trim())
    .eq('status', 'PAID')
    .maybeSingle();

  if (!purchase) return NextResponse.json({ purchased: false });

  const shieldData = generateDefenseShield(purchase.benchmark_runs);
  return NextResponse.json({ purchased: true, shieldData });
}
