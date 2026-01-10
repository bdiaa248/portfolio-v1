
import { createClient } from '@supabase/supabase-js'

// استخدمنا رابط مشروعك الفعلي كـ fallback لمنع خطأ "fetch failed"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lbxoiufieyvjqotlkpto.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    '⚠️ Supabase environment variables are partially or fully missing! ' +
    'Please check your .env file or deployment settings.'
  )
}

export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey || 'placeholder-key'
)
