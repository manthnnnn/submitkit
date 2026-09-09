-- Project Benchmark Engine Schema

-- Table for storing benchmark run results
CREATE TABLE IF NOT EXISTS public.benchmark_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repo_url TEXT NOT NULL,
    repo_owner TEXT NOT NULL,
    repo_name TEXT NOT NULL,
    commit_sha TEXT NOT NULL,
    fingerprint TEXT NOT NULL,
    category TEXT NOT NULL,
    category_confidence INTEGER NOT NULL,
    classification_title TEXT,
    project_dna JSONB DEFAULT '{}'::jsonb,
    score INTEGER NOT NULL,
    maturity_level INTEGER NOT NULL,
    dimension_scores JSONB DEFAULT '[]'::jsonb,
    capabilities JSONB DEFAULT '[]'::jsonb,
    comparison_matrix JSONB DEFAULT '[]'::jsonb,
    top_improvements JSONB DEFAULT '[]'::jsonb,
    strengths JSONB DEFAULT '[]'::jsonb,
    gaps JSONB DEFAULT '[]'::jsonb,
    honest_verdict TEXT,
    is_excellent BOOLEAN DEFAULT false,
    version_number INTEGER NOT NULL DEFAULT 1,
    previous_run_id UUID REFERENCES public.benchmark_runs(id) ON DELETE SET NULL,
    score_delta INTEGER,
    changes_detected JSONB DEFAULT '[]'::jsonb,
    analyzer_version TEXT NOT NULL DEFAULT '1.0.0',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookups by repo URL (to find previous runs)
CREATE INDEX IF NOT EXISTS idx_benchmark_runs_repo_url ON public.benchmark_runs (repo_url);

-- Table for internal admin acquisitions pipeline
CREATE TABLE IF NOT EXISTS public.project_acquisitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repo_url TEXT NOT NULL UNIQUE,
    candidate_title TEXT NOT NULL,
    category TEXT NOT NULL,
    license_spdx TEXT,
    license_status TEXT DEFAULT 'REQUIRES_REVIEW',
    original_author TEXT,
    benchmark_score INTEGER,
    upgrade_roadmap JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'CANDIDATE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for acquisitions
CREATE INDEX IF NOT EXISTS idx_project_acquisitions_status ON public.project_acquisitions (status);

-- RLS Policies

-- Enable RLS
ALTER TABLE public.benchmark_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_acquisitions ENABLE ROW LEVEL SECURITY;

-- benchmark_runs is publicly readable (since it's a public benchmark tool for open source repos)
CREATE POLICY "Public can view benchmark runs" 
ON public.benchmark_runs FOR SELECT 
USING (true);

-- benchmark_runs can only be inserted/updated by service role (bypasses RLS)
-- We do not create an INSERT policy for authenticated/anon users to prevent tampering.

-- project_acquisitions should be entirely locked down to service role / admins.
-- No public policies.
