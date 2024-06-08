import { createClient } from '@supabase/supabase-js';

import { config } from '../../config/common';

const supabase = createClient(config.supabase.url!, config.supabase.serviceRoleKey!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Access auth admin api
const adminAuthClient = supabase.auth.admin;

export { supabase, adminAuthClient };
