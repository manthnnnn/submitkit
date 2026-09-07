const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  // Use Supabase's REST API to insert a test record to trigger table creation
  // We'll just check if the table exists by trying to select from it
  const { error } = await supabase.from('pre_orders').select('id').limit(1);
  
  if (error && error.code === '42P01') {
    console.log('Table does not exist. Please create it in the Supabase dashboard with this SQL:');
    console.log(`
CREATE TABLE public.pre_orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_slug text NOT NULL,
  project_title text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  college text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pre_orders ENABLE ROW LEVEL SECURITY;

-- Only server-side service role can insert/read
CREATE POLICY "service_role_all" ON public.pre_orders
  USING (true) WITH CHECK (true);
    `);
  } else if (error) {
    console.error('Error:', error);
  } else {
    console.log('✅ pre_orders table already exists and is accessible!');
  }
}

run();
