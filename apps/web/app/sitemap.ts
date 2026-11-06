import type { MetadataRoute } from 'next'
import { ARTICLES } from '@/lib/artigos'
import { getCanonicalCatalog } from '@/lib/vehicleCatalog'

// Sem isso, o Next trata sitemap.ts como estático (sem fetch(), a leitura via
// Prisma não é detectada como dinâmica) e ele fica congelado no snapshot do
// build — novos modelos seedados depois do deploy nunca apareceriam até o
// próximo redeploy.
export const revalidate = 3600

const BASE = 'https://motormacete.com.br'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articlePages: MetadataRoute.Sitemap = ARTICLES.map(a => ({
    url: `${BASE}/artigos/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE}/macetes`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/artigos`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/sobre`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contato`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacidade`, lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // Todos os veículos com conteúdo específico real no banco (não uma lista fixa),
  // exceto variantes de trim marcadas como duplicadas de outro modelo (essas têm
  // rel=canonical apontando para a versão canônica — não fazem sentido no sitemap).
  //
  // Só 1 ano por veículo (o mesmo ano representativo pré-gerado em
  // generateStaticParams, ver page.tsx) — listar TODOS os anos (antes ~2.7k URLs)
  // fazia um crawler de busca varrer o catálogo inteiro sob demanda, cada página
  // nova gerando uma consulta ao Postgres e mantendo o compute do Neon acordado o
  // dia inteiro. Os demais anos continuam acessíveis por link direto (dynamicParams),
  // só não são mais oferecidos pro crawler indexar em massa.
  const catalog = await getCanonicalCatalog()
  const vehiclePages: MetadataRoute.Sitemap = catalog.map(v => {
    const anoRepresentativo = v.anos[Math.floor(v.anos.length / 2)]
    return {
      url: `${BASE}/macetes/${v.marcaSlug}/${v.modeloSlug}/${anoRepresentativo}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }
  })

  return [...staticPages, ...articlePages, ...vehiclePages]
}
