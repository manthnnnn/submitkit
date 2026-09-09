import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { runBenchmark } from '@/lib/benchmark';
import { createSandbox } from '@/lib/benchmark/sandbox';
import { validateLicense } from '@/lib/benchmark/license';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    // 1. Auth/Admin Check (In production, this should have a middleware guard)
    const adminToken = req.cookies.get('admin_token')?.value;
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { repoUrl } = await req.json();
    if (!repoUrl) return NextResponse.json({ error: 'repoUrl is required' }, { status: 400 });

    const supabase = createAdminClient();

    // 2. Check if already exists in acquisitions
    const { data: existing } = await supabase
      .from('project_acquisitions')
      .select('id')
      .eq('repo_url', repoUrl)
      .single();

    if (existing) {
      return NextResponse.json({ error: 'This repository is already in the acquisitions pipeline.' }, { status: 400 });
    }

    // 3. Run Benchmark (Layer A & B)
    const benchmarkResult = await runBenchmark(repoUrl);

    // 4. Extract License Info (Ephemeral sandbox just for license parsing)
    // We could optimize this by passing license up from Layer A, but for admin route speed is less critical.
    const sandbox = await createSandbox(repoUrl);
    let licenseInfo;
    try {
      licenseInfo = validateLicense(sandbox.tmpDirPath);
    } finally {
      await sandbox.cleanup();
    }

    // 5. Generate Upgrade Roadmap based on gaps
    const upgradeRoadmap = benchmarkResult.gaps.map((gap: string) => `Fix gap: ${gap}`);
    if (benchmarkResult.maturity_level < 5) {
      upgradeRoadmap.push('Elevate architecture to Production-Grade (Level 5+)');
    }
    upgradeRoadmap.push('Integrate SubmitKit payment gateway');
    upgradeRoadmap.push('Draft comprehensive IEEE standard report document');

    // 6. Insert into acquisitions table
    const { data: inserted, error } = await supabase
      .from('project_acquisitions')
      .insert({
        repo_url: repoUrl,
        candidate_title: benchmarkResult.classification_title,
        category: benchmarkResult.category,
        license_spdx: licenseInfo.spdx,
        license_status: licenseInfo.status,
        original_author: benchmarkResult.repo_owner,
        benchmark_score: benchmarkResult.score,
        upgrade_roadmap: upgradeRoadmap,
        status: 'CANDIDATE'
      })
      .select('*')
      .single();

    if (error) {
      console.error(error);
      throw new Error('Failed to save candidate to acquisitions pipeline.');
    }

    return NextResponse.json({ status: 'success', data: inserted });

  } catch (error: any) {
    console.error('Acquisition Scan API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
