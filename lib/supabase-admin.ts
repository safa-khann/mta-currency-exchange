// lib/supabase-admin.ts - FIXED VERSION
import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase' // Import from types file

export const getSupabaseAdmin = () => {
  if (typeof window !== 'undefined') {
    throw new Error('Admin client cannot be used in browser')
  }
  
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
