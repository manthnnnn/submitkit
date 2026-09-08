const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const { data, error } = await supabase.from('page_views').select('id').limit(1);
  if (error) {
    if (error.code === 'PGRST205' || error.message.includes('schema cache')) {
      console.log('⚠️  Table "page_views" is not yet created in Supabase.');
      console.log('📋 Please copy and run supabase/traffic_analytics.sql in Supabase SQL Editor:');
      console.log('👉 https://supabase.com/dashboard/project/' + process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', '').split('.')[0] + '/sql/new');
    } else {
      console.error('❌ Supabase error:', error);
    }
  } else {
    console.log('✅ "page_views" table is LIVE and ready for analytics tracking!');
  }
}

check();
