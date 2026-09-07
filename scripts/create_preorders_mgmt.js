require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Use the management API to create the table by inserting via the storage API
// Supabase doesn't expose DDL via the client SDK, so we use the pg connection
// Instead, we create the table by sending a raw SQL query via the Supabase Management API

async function createTable() {
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', '').split('.')[0];
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const sql = `
    CREATE TABLE IF NOT EXISTS public.pre_orders (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      project_slug text NOT NULL,
      project_title text NOT NULL,
      name text NOT NULL,
      email text NOT NULL,
      phone text NOT NULL,
      college text,
      created_at timestamptz DEFAULT now()
    );
    ALTER TABLE public.pre_orders ENABLE ROW LEVEL SECURITY;
  `;

  const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({ query: sql }),
  });

  const result = await response.text();
  console.log('Response status:', response.status);
  console.log('Response:', result);
}

createTable().catch(console.error);
