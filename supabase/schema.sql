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
