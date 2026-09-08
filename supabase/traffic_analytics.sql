-- ==============================================================================
-- SubmitKit Visitor Traffic & Analytics Migration
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.page_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id TEXT NOT NULL,
    path TEXT NOT NULL,
    referrer TEXT,
    device TEXT DEFAULT 'desktop',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for lightning fast queries on Admin Dashboard
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON public.page_views(visitor_id);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views(path);

-- Enable Row Level Security
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitor tracking insert
CREATE POLICY "Allow anonymous visitor tracking insert" 
ON public.page_views FOR INSERT 
WITH CHECK (true);

-- Allow service role full access for admin analytics
CREATE POLICY "Allow service role full access" 
ON public.page_views 
USING (true) 
WITH CHECK (true);
