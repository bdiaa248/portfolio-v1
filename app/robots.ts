
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://abdodiaa.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // حماية لوحة التحكم من الظهور في بحث جوجل
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
