import { createClient } from '@supabase/supabase-js';

// Service role client bypasses RLS policies entirely.
// NEVER use this on the client-side or in routes exposed directly to users without strict validation.
//
// When the database settings are missing (e.g. during a build without secrets),
// fall back to an unreachable local address instead of throwing. Queries then
// fail fast and the callers' error handling (safeQuery, null checks) takes over,
// so pages can still be built.
const UNCONFIGURED_URL = 'http://127.0.0.1:1';

export const createAdminClient = () => {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

  if (!url || !key) {
    console.warn('[supabase/admin] NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set; database calls will fail.');
    return createClient(url || UNCONFIGURED_URL, key || 'unconfigured', {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};
