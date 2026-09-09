import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid benchmark ID' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Fetch the main run
    const { data: benchmark, error } = await supabase
      .from('benchmark_runs')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !benchmark) {
      return NextResponse.json({ error: 'Benchmark not found' }, { status: 404 });
    }

    // If there is a previous run, fetch a small summary to show history
    let previousRun = null;
    if (benchmark.previous_run_id) {
      const { data: prev } = await supabase
        .from('benchmark_runs')
        .select('id, score, version_number, created_at')
        .eq('id', benchmark.previous_run_id)
        .single();
      
      previousRun = prev;
    }

    return NextResponse.json({ 
      benchmark,
      previousRun
    });

  } catch (error: any) {
    console.error('Fetch Benchmark API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
