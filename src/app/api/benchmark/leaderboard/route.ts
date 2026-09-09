import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const scoreStr = searchParams.get('score');

  if (!category || !scoreStr) {
    return NextResponse.json({ error: 'Missing category or score' }, { status: 400 });
  }

  const score = parseInt(scoreStr, 10);

  try {
    const supabase = createAdminClient();
    // Get all scores in this category
    const { data: allRuns, error } = await supabase
      .from('benchmark_runs')
      .select('score')
      .eq('category', category);

    if (error || !allRuns || allRuns.length === 0) {
      return NextResponse.json({ percentile: null, avgScore: null, totalScans: 0 });
    }

    const scores = allRuns.map(r => r.score);
    const totalScans = scores.length;
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalScans);
    
    // Calculate percentile: what % of projects scored LOWER than this score
    const lowerCount = scores.filter(s => s < score).length;
    const percentile = Math.max(1, Math.round(100 - (lowerCount / totalScans) * 100));

    return NextResponse.json({ percentile, avgScore, totalScans });
  } catch (err) {
    return NextResponse.json({ percentile: null, avgScore: null, totalScans: 0 });
  }
}
