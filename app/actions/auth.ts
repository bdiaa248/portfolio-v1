'use server'

// @ts-ignore
import { cookies } from 'next/headers'
// @ts-ignore
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export async function ghostLogin(formData: FormData) {
  const password = formData.get('password') as string;

  // Fetch the password from the settings table
  const { data, error } = await supabase
    .from('settings')
    .select('password')
    .eq('id', 1)
    .single();

  if (error || !data) {
    console.error('Error fetching admin password:', error);
    // Fallback or error handling
    return { success: false, error: 'System Error' };
  }

  // Verify against stored password
  if (password === data.password) {
    // Set Secure HTTP-Only Cookie
    // In Next.js 15+, cookies() is asynchronous and must be awaited
    const cookieStore = await cookies()
    cookieStore.set('admin_token', 'ACCESS_GRANTED_LEVEL_5', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 Hours
      path: '/',
    })
    return { success: true }
  }

  return { success: false, error: 'Access Denied' }
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
  redirect('/')
}