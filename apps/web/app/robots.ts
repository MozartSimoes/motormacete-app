import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/macetes', '/macetes/', '/sobre', '/contato', '/privacidade'],
        disallow: ['/home/', '/mecanico/', '/conta/', '/api/'],
      },
    ],
    sitemap: 'https://motormacete.com.br/sitemap.xml',
  }
}
