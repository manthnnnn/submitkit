import { createClient } from '@supabase/supabase-js';

// Service role client bypasses RLS policies entirely.
// NEVER use this on the client-side or in routes exposed directly to users without strict validation.
export const createAdminClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};
