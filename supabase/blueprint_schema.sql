-- ============================================================
-- SubmitKit: Blueprint Purchases Table Setup
-- Run this in Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- ============================================================

-- 1. Enable UUID Extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Blueprint Purchases Table
CREATE TABLE IF NOT EXISTS public.blueprint_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id TEXT NOT NULL,
    topic_title TEXT NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    razorpay_order_id VARCHAR(100) UNIQUE NOT NULL,
    razorpay_payment_id VARCHAR(100) UNIQUE,
    amount INTEGER NOT NULL DEFAULT 19,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    pdf_downloads INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create Fast Lookup Indexes
CREATE INDEX IF NOT EXISTS idx_blueprint_purchases_email ON public.blueprint_purchases(customer_email);
CREATE INDEX IF NOT EXISTS idx_blueprint_purchases_topic ON public.blueprint_purchases(topic_id);
CREATE INDEX IF NOT EXISTS idx_blueprint_purchases_order ON public.blueprint_purchases(razorpay_order_id);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.blueprint_purchases ENABLE ROW LEVEL SECURITY;

-- 5. Safe Policies (Drop first so re-running never throws "already exists" errors)
DROP POLICY IF EXISTS "Allow service role full access" ON public.blueprint_purchases;
DROP POLICY IF EXISTS "Public insert pending orders" ON public.blueprint_purchases;
DROP POLICY IF EXISTS "Public read purchases" ON public.blueprint_purchases;

-- Service role has full permissions
CREATE POLICY "Allow service role full access" 
    ON public.blueprint_purchases 
    FOR ALL 
    TO service_role 
    USING (true) 
    WITH CHECK (true);

-- Allow creating pending orders
CREATE POLICY "Public insert pending orders" 
    ON public.blueprint_purchases 
    FOR INSERT 
    TO anon, authenticated, service_role
    WITH CHECK (true);

-- Allow reading purchase status
CREATE POLICY "Public read purchases" 
    ON public.blueprint_purchases 
    FOR SELECT 
    TO anon, authenticated, service_role
    USING (true);

-- 6. Grant Permissions
GRANT ALL ON public.blueprint_purchases TO postgres, service_role, authenticated, anon;
