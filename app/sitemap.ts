
import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://abdodiaa.vercel.app'

  // جلب معرفات المشاريع من قاعدة البيانات برمجياً
  const { data: projects } = await supabase
    .from('projects')
    .select('id')

  // تحويل المشاريع لروابط في الـ Sitemap
  const projectEntries: MetadataRoute.Sitemap = (projects || []).map((project) => ({
    url: `${baseUrl}/work/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectEntries,
  ]
}
