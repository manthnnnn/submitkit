const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function syncSeed() {
  const { data: projects, error } = await supabase.from('projects').select('*').order('created_at', { ascending: true });
  if (error) {
    console.error('Error fetching projects:', error);
    return;
  }

  let sqlString = "-- Seed data for initial projects\n";
  sqlString += "INSERT INTO projects (slug, title, category, tier, price_inr, description, problem_statement, architecture_details, tech_stack, features, demo_video_id, demo_screenshots, live_demo_url, s3_storage_key, report_template_key)\nVALUES\n";

  const sqlValues = projects.map(p => {
    return `(
    '${p.slug}',
    '${p.title.replace(/'/g, "''")}',
    '${p.category}',
    '${p.tier}',
    ${p.price_inr},
    '${p.description.replace(/'/g, "''")}',
    ${p.problem_statement ? `'${p.problem_statement.replace(/'/g, "''")}'` : 'NULL'},
    ${p.architecture_details ? `'${p.architecture_details.replace(/'/g, "''")}'` : 'NULL'},
    ARRAY[${p.tech_stack.map(t => `'${t}'`).join(', ')}],
    ARRAY[${p.features.map(f => `'${f}'`).join(', ')}],
    ${p.demo_video_id ? `'${p.demo_video_id}'` : 'NULL'},
    ARRAY[${(p.demo_screenshots || []).map(s => `'${s}'`).join(', ')}],
    ${p.live_demo_url ? `'${p.live_demo_url}'` : 'NULL'},
    '${p.s3_storage_key}',
    '${p.report_template_key}'
)`;
  });

  sqlString += sqlValues.join(',\n') + "\nON CONFLICT (slug) DO NOTHING;\n";

  fs.writeFileSync('supabase/seed.sql', sqlString);
  console.log('Successfully synced seed.sql with DB state. Total projects: ' + projects.length);
}
syncSeed();
