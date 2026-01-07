
'use server'

import { supabase } from '@/lib/supabase'

export async function getPortfolioData() {
  const { data: projectsData, error: projError } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: true })

  const { data: certificatesData, error: certError } = await supabase
    .from('certificates')
    .select('*')
    .order('id', { ascending: true })

  if (projError) console.error("Error fetching projects:", projError);
  if (certError) console.error("Error fetching certificates:", certError);

  // Map Projects
  const projects = (projectsData || []).map((p: any) => ({
    title: p.title,
    description: p.description,
    image: p.image,
    tags: p.tech || [],
    link: p.link,
    subtitle: "", // Optional field not currently in DB script but kept for types
    content: null // Complex JSX content cannot be stored in DB easily, handled as standard project
  }))

  // Map Certificates
  const certificates = (certificatesData || []).map((c: any) => ({
    title: c.title,
    issuer: c.issuer,
    date: c.date,
    skills: c.skills || [],
    description: c.description || "",
    verifyUrl: c.verify_url,
    color: c.color || "from-blue-500/20 to-cyan-500/20"
  }))

  return { projects, certificates }
}
