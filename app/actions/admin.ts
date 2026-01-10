
'use server'

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { Buffer } from "buffer";

// Helper to create an admin client specifically for server actions
const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lbxoiufieyvjqotlkpto.supabase.co';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // We return null if the key is missing so we can handle it gracefully in the actions
  if (!supabaseServiceKey) {
    return null;
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });
}

// --- Storage ---

export async function uploadImage(formData: FormData) {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return { success: false, error: "Configuration Error: SUPABASE_SERVICE_ROLE_KEY is missing in .env file. Cannot bypass RLS." };
    }

    const file = formData.get('file') as File;
    if (!file) return { success: false, error: "No file provided" };

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Convert File to Buffer for reliable Node.js upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error } = await supabase.storage
      .from('portfolio')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
        console.error("Supabase Storage Upload Error:", error);
        return { success: false, error: `Upload failed: ${error.message}` };
    }

    const { data } = supabase.storage
      .from('portfolio')
      .getPublicUrl(filePath);

    return { success: true, url: data.publicUrl };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- Projects ---

export async function addProject(formData: FormData) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { success: false, error: "Configuration Error: SUPABASE_SERVICE_ROLE_KEY is missing." };
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const tech = formData.get('tech')?.toString().split(',').map(t => t.trim()) || [];
  const image = formData.get('image') as string;
  const link = formData.get('link') as string;

  const { error } = await supabase
    .from('projects')
    .insert([
      { title, description, tech, image, link }
    ]);

  if (error) {
    console.error('Error adding project:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function updateProject(formData: FormData) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { success: false, error: "Configuration Error: SUPABASE_SERVICE_ROLE_KEY is missing." };
  }

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const tech = formData.get('tech')?.toString().split(',').map(t => t.trim()) || [];
  const image = formData.get('image') as string;
  const link = formData.get('link') as string;

  const { error } = await supabase
    .from('projects')
    .update({ title, description, tech, image, link })
    .eq('id', id);

  if (error) {
    console.error('Error updating project:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function deleteProject(formData: FormData) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { success: false, error: "Configuration Error: SUPABASE_SERVICE_ROLE_KEY is missing." };
  }

  const id = formData.get('id') as string;
  
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

// --- Certificates ---

export async function addCertificate(formData: FormData) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { success: false, error: "Configuration Error: SUPABASE_SERVICE_ROLE_KEY is missing." };
  }

  const title = formData.get('title') as string;
  const issuer = formData.get('issuer') as string;
  const date = formData.get('date') as string;
  const verifyUrl = formData.get('verifyUrl') as string;

  const { error } = await supabase
    .from('certificates')
    .insert([
      { title, issuer, date, verify_url: verifyUrl }
    ]);

  if (error) {
    console.error('Error adding certificate:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function updateCertificate(formData: FormData) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { success: false, error: "Configuration Error: SUPABASE_SERVICE_ROLE_KEY is missing." };
  }

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const issuer = formData.get('issuer') as string;
  const date = formData.get('date') as string;
  const verifyUrl = formData.get('verifyUrl') as string;

  const { error } = await supabase
    .from('certificates')
    .update({ title, issuer, date, verify_url: verifyUrl })
    .eq('id', id);

  if (error) {
    console.error('Error updating certificate:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

export async function deleteCertificate(formData: FormData) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { success: false, error: "Configuration Error: SUPABASE_SERVICE_ROLE_KEY is missing." };
  }

  const id = formData.get('id') as string;
  
  const { error } = await supabase
    .from('certificates')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting certificate:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true };
}

// --- Settings ---

export async function updateAdminPassword(formData: FormData) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { success: false, error: "Configuration Error: SUPABASE_SERVICE_ROLE_KEY is missing." };
  }

  const newPassword = formData.get('newPassword') as string;
  
  const { error } = await supabase
    .from('settings')
    .update({ password: newPassword })
    .eq('id', 1);

  if (error) {
    console.error('Error updating password:', error);
    return { success: false, error: error.message };
  }
  
  return { success: true, message: 'Security Protocols Updated' };
}

// Data Fetching can fallback to Anon key if Admin key is missing
// since reading might be allowed by public RLS policies
import { supabase as supabaseAnon } from '@/lib/supabase';

export async function getDashboardData() {
  let supabase = getSupabaseAdmin();
  
  // Fallback to Anon client for reading if Service Role is missing
  // This allows the dashboard to at least load (read-only)
  if (!supabase) {
    console.warn("⚠️ SUPABASE_SERVICE_ROLE_KEY missing. Dashboard is in Read-Only mode.");
    supabase = supabaseAnon;
  }

  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: certificates, error: certsError } = await supabase
    .from('certificates')
    .select('*')
    .order('created_at', { ascending: false });

  if (projectsError) console.error('Error fetching projects:', projectsError);
  if (certsError) console.error('Error fetching certificates:', certsError);

  const mappedProjects = (projects || []).map(p => ({
    ...p,
    createdAt: p.created_at
  }));

  const mappedCertificates = (certificates || []).map(c => ({
    ...c,
    verifyUrl: c.verify_url,
    createdAt: c.created_at
  }));

  return {
    projects: mappedProjects,
    certificates: mappedCertificates
  };
}
