// Script to update project prices in Supabase back to real prices
// Run with: node scripts/fix_prices.mjs

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://figzoijpvbwvvwdzxksx.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required.');
  process.exit(1);
}

const headers = {
  'apikey': SUPABASE_SERVICE_KEY,
  'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
  'Content-Type': 'application/json',
};

async function fetchProjects() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/projects?select=*&limit=3`, { headers });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function updatePrice(id, price) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/projects?id=eq.${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ price_inr: price }),
  });
  if (!res.ok) throw new Error(`Update failed for ${id}: ${res.status} ${await res.text()}`);
}

const TIER_PRICES = {
  MINI:  299,
  MAJOR: 499,
};

async function main() {
  console.log('Fetching all projects from Supabase...\n');
  const projects = await fetchProjects();
  
  if (!projects || projects.length === 0) {
    console.log('No projects found.');
    return;
  }

  console.log(`Found ${projects.length} projects:\n`);
  console.log('ID'.padEnd(40), 'Tier'.padEnd(8), 'Current Price'.padEnd(15), 'New Price');
  console.log('-'.repeat(80));

  for (const p of projects) {
    const correctPrice = TIER_PRICES[p.tier];
    const currentPrice = p.price_inr;
    const marker = currentPrice !== correctPrice ? '← UPDATING' : '✓ OK';
    console.log(
      (p.slug || p.id).substring(0, 38).padEnd(40),
      (p.tier || '?').padEnd(8),
      String(currentPrice).padEnd(15),
      correctPrice !== undefined ? `₹${correctPrice}  ${marker}` : '?? (unknown tier)'
    );
  }

  console.log('\nUpdating prices...\n');
  let updated = 0;
  let skipped = 0;

  for (const p of projects) {
    const correctPrice = TIER_PRICES[p.tier];
    if (correctPrice === undefined) {
      console.log(`  SKIP ${p.slug || p.id} — unknown tier "${p.tier}"`);
      skipped++;
      continue;
    }
    if (p.price_inr === correctPrice) {
      skipped++;
      continue;
    }
    await updatePrice(p.id, correctPrice);
    console.log(`  ✓ Updated ${p.slug || p.id}: ₹${p.price_inr} → ₹${correctPrice}`);
    updated++;
  }

  console.log(`\nDone! Updated: ${updated}, Already correct: ${skipped}`);
}

main().catch(err => { console.error('ERROR:', err.message); process.exit(1); });
