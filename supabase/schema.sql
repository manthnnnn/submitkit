-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects Master Table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'AIML', 'FullStack', 'Cybersecurity', 'DataScience', 'IoT'
    tier VARCHAR(20) NOT NULL, -- 'MINI', 'MAJOR'
    price_inr INTEGER NOT NULL,
    description TEXT NOT NULL,
    problem_statement TEXT,
    architecture_details TEXT,
    tech_stack TEXT[] NOT NULL,
    features TEXT[] NOT NULL,
    demo_video_id VARCHAR(50),
    demo_screenshots TEXT[] DEFAULT '{}',
    live_demo_url VARCHAR(500),
    s3_storage_key VARCHAR(500) NOT NULL,
    report_template_key VARCHAR(500) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Orders & Transactions Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(100) UNIQUE NOT NULL, -- Razorpay order_id
    payment_id VARCHAR(100) UNIQUE, -- Razorpay payment_id
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    college_name VARCHAR(255),
    project_id UUID REFERENCES projects(id) ON DELETE RESTRICT,
    amount_paid INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'PAID', 'FAILED'
    download_count INTEGER DEFAULT 0,
    download_limit INTEGER DEFAULT 3,
    has_personalization BOOLEAN DEFAULT false,
    has_plagiarism_cert BOOLEAN DEFAULT false,
    has_viva_call BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Download Audit Logs (Anti-Piracy Tracking)
CREATE TABLE download_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    ip_address VARCHAR(50) NOT NULL,
    user_agent TEXT NOT NULL,
    downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;

-- Projects: Anyone can read active projects. Only service role can modify.
CREATE POLICY "Public can view active projects" 
ON projects FOR SELECT USING (is_active = true);

-- Orders: Anyone can insert (to start checkout), only service role can read/update (webhooks).
CREATE POLICY "Public can insert pending orders" 
ON orders FOR INSERT WITH CHECK (status = 'PENDING');

-- Download Logs: Service role only (no public access policies needed since service role bypasses RLS)

-- RPC for atomic increment of download count to prevent concurrency bypass (Piracy Loophole)
CREATE OR REPLACE FUNCTION increment_download_count(row_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE orders
  SET download_count = download_count + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;

-- Reservations for upcoming projects (early access email capture)
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    project_slug VARCHAR(255) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(email, project_slug)
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a reservation (public signup)
CREATE POLICY "Public can insert reservations"
ON reservations FOR INSERT WITH CHECK (true);

-- ==========================================
-- PROJECT BENCHMARK ENGINE SCHEMA
-- ==========================================

-- Table for storing benchmark run results
CREATE TABLE IF NOT EXISTS public.benchmark_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    security_audit JSONB DEFAULT '{}'::jsonb,
    code_quality JSONB DEFAULT '{}'::jsonb,
    production_analysis JSONB DEFAULT '[]'::jsonb,
    startup_potential JSONB DEFAULT '{}'::jsonb,
    real_world_comparison JSONB DEFAULT '{}'::jsonb,
    honest_verdict TEXT,
    is_excellent BOOLEAN DEFAULT false,
    version_number INTEGER NOT NULL DEFAULT 1,
    previous_run_id UUID REFERENCES public.benchmark_runs(id) ON DELETE SET NULL,
    score_delta INTEGER,
    changes_detected JSONB DEFAULT '[]'::jsonb,
    analyzer_version TEXT NOT NULL DEFAULT '1.0.0',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_benchmark_runs_repo_url ON public.benchmark_runs (repo_url);

-- Table for internal admin acquisitions pipeline
CREATE TABLE IF NOT EXISTS public.project_acquisitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE INDEX IF NOT EXISTS idx_project_acquisitions_status ON public.project_acquisitions (status);

-- Enable RLS
ALTER TABLE public.benchmark_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_acquisitions ENABLE ROW LEVEL SECURITY;

-- benchmark_runs is publicly readable
CREATE POLICY "Public can view benchmark runs" 
ON public.benchmark_runs FOR SELECT 
USING (true);

-- ==========================================
-- DEFENSE SHIELD: ₹19 Micro-Transaction Schema
-- ==========================================

CREATE TABLE IF NOT EXISTS public.benchmark_purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    benchmark_id UUID NOT NULL REFERENCES public.benchmark_runs(id) ON DELETE CASCADE,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    razorpay_order_id VARCHAR(100) UNIQUE NOT NULL,
    razorpay_payment_id VARCHAR(100) UNIQUE,
    amount INTEGER NOT NULL DEFAULT 19,
    pack_type VARCHAR(50) DEFAULT 'bundle', -- interview | launch | portfolio | bundle
    status VARCHAR(20) DEFAULT 'PENDING',  -- PENDING | PAID | FAILED
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_benchmark_purchases_benchmark 
ON public.benchmark_purchases (benchmark_id);

CREATE INDEX IF NOT EXISTS idx_benchmark_purchases_email 
ON public.benchmark_purchases (customer_email);

ALTER TABLE public.benchmark_purchases ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for checkout flow
CREATE POLICY "Public can insert pending purchases"
ON public.benchmark_purchases FOR INSERT
WITH CHECK (status = 'PENDING');

-- Allow public reads so users can check re-access by email
CREATE POLICY "Public can read own purchases"
ON public.benchmark_purchases FOR SELECT
USING (true);
