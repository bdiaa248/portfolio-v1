
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lbxoiufieyvjqotlkpto.supabase.co'
// Use a placeholder if key is missing to prevent crash during initialization
// The app will load, but DB requests will fail until the real key is added to .env
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'kp_placeholder_key_to_prevent_crash'

if (supabaseKey === 'kp_placeholder_key_to_prevent_crash') {
  console.warn('⚠️ WARNING: Missing Supabase Key. Database operations will fail until NEXT_PUBLIC_SUPABASE_ANON_KEY is set.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
