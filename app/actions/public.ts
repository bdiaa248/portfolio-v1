
'use server'

import { supabase } from '@/lib/supabase'

export async function getPortfolioData() {
  try {
    // جلب البيانات مع التعامل مع احتمالية فشل الشبكة
    const [projectsRes, certsRes] = await Promise.all([
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('certificates').select('*').order('created_at', { ascending: false })
    ]);

    if (projectsRes.error) {
      console.error("Supabase Project Error:", projectsRes.error.message);
    }
    if (certsRes.error) {
      console.error("Supabase Certificate Error:", certsRes.error.message);
    }

    // Map Projects with safe fallbacks
    const projects = (projectsRes.data || []).map((p: any) => ({
      id: p.id,
      title: p.title || "Untitled Project",
      description: p.description || "",
      image: p.image || "/placeholder.svg",
      tags: Array.isArray(p.tech) ? p.tech : [],
      link: p.link || "#",
      subtitle: "",
      content: null 
    }))

    // Map Certificates with safe fallbacks
    const certificates = (certsRes.data || []).map((c: any) => ({
      title: c.title || "Untitled Certificate",
      issuer: c.issuer || "Unknown Issuer",
      date: c.date || "",
      skills: Array.isArray(c.skills) ? c.skills : [],
      description: c.description || "",
      verifyUrl: c.verify_url || "#",
      color: c.color || "from-blue-500/20 to-cyan-500/20"
    }))

    return { projects, certificates }
  } catch (error: any) {
    // التقاط أخطاء الـ fetch الصريحة (مثل انقطاع الإنترنت أو خطأ الـ DNS)
    console.error("Critical Connection Error in getPortfolioData:", error.message || error);
    return { projects: [], certificates: [] }
  }
}

export async function getProjectById(id: string) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      console.error("Error fetching project by ID:", error?.message || error);
      return null
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      image: data.image,
      tags: Array.isArray(data.tech) ? data.tech : [],
      link: data.link,
      createdAt: data.created_at
    }
  } catch (error: any) {
    console.error("Critical Network Error in getProjectById:", error.message || error);
    return null
  }
}
