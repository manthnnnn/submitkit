import { NextResponse } from 'next/server';
import { runBenchmark } from '@/lib/benchmark';
import { checkRateLimit } from '@/lib/rate-limit';
import { createAdminClient } from '@/lib/supabase/admin';
import { parseGitHubUrl } from '@/lib/benchmark/sandbox';

export const maxDuration = 60; // 60 seconds max duration for Vercel/Next.js since cloning/parsing can take time

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting (increased for testing)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = await checkRateLimit(ip, 50, 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await req.json();
    const { repoUrl } = body;

    if (!repoUrl) {
      return NextResponse.json({ error: 'Repository URL is required.' }, { status: 400 });
    }

    // Validate URL format
    try {
      parseGitHubUrl(repoUrl);
    } catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }

    const supabase = createAdminClient();

    // 2. Check for duplicate/recent identical runs (optimization)
    // We fetch the most recent run for this repo
    const { data: previousRun } = await supabase
      .from('benchmark_runs')
      .select('id, commit_sha, score, version_number, fingerprint')
      .eq('repo_url', repoUrl)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // 3. Run Benchmark (Layer A & B)
    const benchmarkResult = await runBenchmark(repoUrl);

    // 4. Handle Re-Benchmark / Diffing Logic
    let versionNumber = 1;
    let scoreDelta = null;
    let previousRunId = null;

    if (previousRun) {
      if (previousRun.commit_sha === benchmarkResult.commit_sha && previousRun.fingerprint === benchmarkResult.fingerprint) {
        // No significant changes detected. Return the existing run ID.
        return NextResponse.json({ 
          status: 'success',
          benchmarkId: previousRun.id,
          message: 'No significant changes detected. Returning existing benchmark.'
        });
      }

      versionNumber = previousRun.version_number + 1;
      scoreDelta = benchmarkResult.score - previousRun.score;
      previousRunId = previousRun.id;
    }

    // 5. Save to Database
    const finalDataToInsert = {
      ...benchmarkResult,
      version_number: versionNumber,
      previous_run_id: previousRunId,
      score_delta: scoreDelta,
    };

    const { data: insertedRun, error: insertError } = await supabase
      .from('benchmark_runs')
      .insert(finalDataToInsert)
      .select('id')
      .single();

    if (insertError) {
      console.error('Supabase Insert Error:', insertError);
      throw new Error('Failed to save benchmark results.');
    }

    return NextResponse.json({ 
      status: 'success',
      benchmarkId: insertedRun.id 
    });

  } catch (error: any) {
    console.error('Benchmark API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
