-- Run this in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS public.blueprint_purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id TEXT NOT NULL,
    topic_title TEXT NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    razorpay_order_id VARCHAR(100) UNIQUE NOT NULL,
    razorpay_payment_id VARCHAR(100) UNIQUE,
    amount INTEGER NOT NULL DEFAULT 19,
    status VARCHAR(20) DEFAULT 'PENDING',
    pdf_downloads INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blueprint_purchases_email ON public.blueprint_purchases(customer_email);
CREATE INDEX IF NOT EXISTS idx_blueprint_purchases_topic ON public.blueprint_purchases(topic_id);

ALTER TABLE public.blueprint_purchases ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid errors
DROP POLICY IF EXISTS "Public insert" ON public.blueprint_purchases;
DROP POLICY IF EXISTS "Public read" ON public.blueprint_purchases;

CREATE POLICY "Public insert" ON public.blueprint_purchases FOR INSERT WITH CHECK (status = 'PENDING');
CREATE POLICY "Public read" ON public.blueprint_purchases FOR SELECT USING (true);
