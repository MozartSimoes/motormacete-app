import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { prisma } from '@/lib/db'
import { getPublicVehicleCatalog, getCanonicalCatalog, resolveCanonicalUrl, getOtherYears, isKnownBrandSlug } from '@/lib/vehicleCatalog'

export const revalidate = 86400     // regenera a cada 24h — sitemap tem 2.7k URLs, crawlers revisitando de hora em hora esgotavam compute-hours do Neon à toa
export const dynamicParams = true   // rotas fora do generateStaticParams renderizam on-demand

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugToName(slug: string): string {
  return slug.split('-').map(w => w.toUpperCase() === w ? w : w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function matchesStoredName(queryName: string, storedName: string): boolean {
  const esc = storedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`\\b${esc}\\b`, 'i').test(queryName)
}

function buildYearFilter(year: number) {
  return {
    AND: [
      { OR: [{ yearFrom: null as number | null }, { yearFrom: { lte: year } }] },
      { OR: [{ yearTo: null as number | null }, { yearTo: { gte: year } }] },
    ],
  }
}

const SEVERITY_LABEL: Record<string, string> = { DANGER: 'Grave', WARN: 'Atenção', OK: 'Leve' }
const SEVERITY_COLOR: Record<string, string> = { DANGER: '#ef4444', WARN: '#f59e0b', OK: '#22c55e' }
const PRIORITY_LABEL: Record<string, string> = { CRITICAL: 'Crítico', HIGH: 'Alto', MEDIUM: 'Médio', LOW: 'Baixo' }
const PRIORITY_COLOR: Record<string, string> = { CRITICAL: '#ef4444', HIGH: '#f59e0b', MEDIUM: '#3b82f6', LOW: '#6b7280' }

// ── Veículos para pré-geração (generateStaticParams) ──────────────────────────

const TOP_VEHICLES = [
  // Carros mais populares no Brasil
  { marca: 'chevrolet', modelo: 'onix',       anos: ['2018', '2020', '2022', '2023'] },
  { marca: 'fiat',      modelo: 'argo',        anos: ['2018', '2020', '2022', '2023'] },
  { marca: 'volkswagen',modelo: 'polo',        anos: ['2019', '2021', '2023'] },
  { marca: 'hyundai',   modelo: 'hb20',        anos: ['2018', '2020', '2022', '2023'] },
  { marca: 'volkswagen',modelo: 'gol',         anos: ['2015', '2017', '2019', '2021'] },
  { marca: 'volkswagen',modelo: 'virtus',      anos: ['2020', '2022', '2023'] },
  { marca: 'volkswagen',modelo: 't-cross',     anos: ['2020', '2022', '2023'] },
  { marca: 'toyota',    modelo: 'corolla',     anos: ['2018', '2020', '2022'] },
  { marca: 'toyota',    modelo: 'yaris',       anos: ['2019', '2021', '2023'] },
  { marca: 'renault',   modelo: 'kwid',        anos: ['2018', '2020', '2022', '2023'] },
  { marca: 'renault',   modelo: 'sandero',     anos: ['2016', '2018', '2020'] },
  { marca: 'renault',   modelo: 'logan',       anos: ['2015', '2017', '2019'] },
  { marca: 'fiat',      modelo: 'pulse',       anos: ['2022', '2023'] },
  { marca: 'fiat',      modelo: 'cronos',      anos: ['2019', '2021', '2023'] },
  { marca: 'fiat',      modelo: 'uno',         anos: ['2014', '2016', '2018'] },
  { marca: 'fiat',      modelo: 'palio',       anos: ['2014', '2016', '2018'] },
  { marca: 'chevrolet', modelo: 'tracker',     anos: ['2020', '2022', '2023'] },
  { marca: 'chevrolet', modelo: 'celta',       anos: ['2010', '2013', '2016'] },
  { marca: 'ford',      modelo: 'ka',          anos: ['2016', '2018', '2020'] },
  { marca: 'honda',     modelo: 'civic',       anos: ['2018', '2020', '2022'] },
  { marca: 'honda',     modelo: 'fit',         anos: ['2015', '2017', '2020'] },
  { marca: 'honda',     modelo: 'hr-v',        anos: ['2016', '2019', '2022'] },
  { marca: 'jeep',      modelo: 'compass',     anos: ['2018', '2020', '2022'] },
  { marca: 'volkswagen',modelo: 'fox',         anos: ['2013', '2016', '2018'] },
  // Motos
  { marca: 'honda',     modelo: 'cg-160',      anos: ['2018', '2020', '2022', '2023'] },
  { marca: 'honda',     modelo: 'biz-125',     anos: ['2018', '2020', '2022'] },
  { marca: 'honda',     modelo: 'cb-300',      anos: ['2018', '2020', '2022'] },
  { marca: 'yamaha',    modelo: 'factor-150',  anos: ['2018', '2020', '2022'] },
  { marca: 'yamaha',    modelo: 'fazer-250',   anos: ['2018', '2020', '2022'] },
  { marca: 'yamaha',    modelo: 'lander-250',  anos: ['2018', '2020', '2022'] },
]

export async function generateStaticParams() {
  const curated = TOP_VEHICLES.flatMap(({ marca, modelo, anos }) =>
    anos.map(ano => ({ marca, modelo, ano }))
  )

  // Pré-renderiza 1 ano representativo por veículo real do catálogo (não os 3
  // anos completos, para não inflar demais o tempo de build) — os demais anos
  // e o restante do catálogo continuam acessíveis via dynamicParams (ISR).
  // Só os modelos canônicos (variantes de trim duplicadas não precisam de
  // página estática pré-renderizada — continuam acessíveis sob demanda).
  const catalog = await getCanonicalCatalog()
  const catalogParams = catalog.map(v => ({
    marca: v.marcaSlug,
    modelo: v.modeloSlug,
    ano: String(v.anos[Math.floor(v.anos.length / 2)]),
  }))

  const seen = new Set<string>()
  const all = [...curated, ...catalogParams].filter(p => {
    const key = `${p.marca}/${p.modelo}/${p.ano}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  return all
}

// ── Metadata dinâmica ─────────────────────────────────────────────────────────

function isValidVehicleParams(marca: string, ano: string): boolean {
  if (!isKnownBrandSlug(marca)) return false
  const year = parseInt(ano, 10)
  return /^\d{4}$/.test(ano) && year >= 1990 && year <= new Date().getFullYear() + 1
}

export async function generateMetadata(
  { params }: { params: Promise<{ marca: string; modelo: string; ano: string }> }
): Promise<Metadata> {
  const { marca, modelo, ano } = await params
  if (!isValidVehicleParams(marca, ano)) return {}

  const marcaName  = slugToName(marca)
  const modeloName = slugToName(modelo)
  const year       = parseInt(ano, 10)

  const data = await fetchData(marca, modelo, modeloName, year)
  const canonicalUrl = await resolveCanonicalUrl(marca, modelo, ano)

  // Não indexar páginas sem conteúdo específico — evita "thin content" no AdSense/SEO
  const hasSpecificContent = data.macetesIsSpecific || data.problemas.length > 0 || data.calibragemIsSpecific

  const title      = `Macetes do ${marcaName} ${modeloName} ${ano} — Dicas de Mecânico`
  const description =
    `Macetes, problemas crônicos, tabela de manutenção e calibragem de pneus para o ${marcaName} ${modeloName} ${ano}. ` +
    `Dicas práticas de mecânicos profissionais. Grátis e sem cadastro.`

  return {
    title: `${title} | MotorMacete`,
    description,
    keywords: [
      `macetes ${marcaName} ${modeloName}`,
      `problemas ${marcaName} ${modeloName} ${ano}`,
      `manutenção ${marcaName} ${modeloName}`,
      `calibragem pneus ${marcaName} ${modeloName}`,
      `${marcaName} ${modeloName} ${ano} revisão`,
      `${marcaName} ${modeloName} problemas crônicos`,
      `${marcaName} ${modeloName} dicas mecânico`,
    ],
    robots: hasSpecificContent
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: `${title} | MotorMacete`,
      description,
      url: `https://motormacete.com.br/macetes/${marca}/${modelo}/${ano}`,
      siteName: 'MotorMacete',
      locale: 'pt_BR',
      type: 'article',
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

// ── Cache em memória para conteúdo global/genérico ────────────────────────────
// Essas consultas não dependem de marca/modelo (só, no máximo, do ano) — mas
// sem cache elas eram refeitas do zero em TODA página nova (inclusive páginas
// de veículos fora do catálogo, como as que um crawler gera ao seguir os
// links de "Outros anos" indefinidamente). Cada nova combinação marca/modelo/
// ano era um cache-miss do ISR e disparava até 9 queries no Postgres, o que
// manteve o compute do Neon acordado por horas seguidas com tráfego de bot.
// Por quê módulo (não unstable_cache): mesmo padrão já usado em
// vehicleCatalog.ts (catalogCache/canonicalMapCache) — funciona em runtime
// porque instâncias serverless "quentes" reaproveitam o módulo entre
// invocações; só NÃO funciona entre workers de build em paralelo (não é o
// caso aqui, essas queries só rodam a partir de requisição real).
const GENERIC_CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24h, igual ao revalidate da página

let allModelNamesCache: { data: { tip: string[]; maint: string[]; tire: string[] }; expiresAt: number } | null = null

async function getAllModelNames() {
  const now = Date.now()
  if (allModelNamesCache && allModelNamesCache.expiresAt > now) return allModelNamesCache.data

  const [tipNames, maintNames, tireNames] = await Promise.all([
    prisma.tip.findMany({ where: { modelName: { not: null } }, select: { modelName: true }, distinct: ['modelName'] }),
    prisma.maintenanceItem.findMany({ where: { modelName: { not: null } }, select: { modelName: true }, distinct: ['modelName'] }),
    prisma.tirePressure.findMany({ where: { modelName: { not: null } }, select: { modelName: true }, distinct: ['modelName'] }),
  ])
  const data = {
    tip: tipNames.map(r => r.modelName!),
    maint: maintNames.map(r => r.modelName!),
    tire: tireNames.map(r => r.modelName!),
  }
  allModelNamesCache = { data, expiresAt: now + GENERIC_CACHE_TTL_MS }
  return data
}

let genericMacetesCache: { data: Awaited<ReturnType<typeof prisma.tip.findMany>>; expiresAt: number } | null = null

async function getGenericMacetes() {
  const now = Date.now()
  if (genericMacetesCache && genericMacetesCache.expiresAt > now) return genericMacetesCache.data
  const data = await prisma.tip.findMany({ where: { modelName: null, category: 'MACETES' }, orderBy: { order: 'asc' } })
  genericMacetesCache = { data, expiresAt: now + GENERIC_CACHE_TTL_MS }
  return data
}

const genericByYearCache = new Map<number, {
  manutencao: Awaited<ReturnType<typeof prisma.maintenanceItem.findMany>>
  calibragem: Awaited<ReturnType<typeof prisma.tirePressure.findMany>>
  expiresAt: number
}>()

async function getGenericByYear(year: number) {
  const now = Date.now()
  const cached = genericByYearCache.get(year)
  if (cached && cached.expiresAt > now) return cached

  const yearFilter = buildYearFilter(year)
  const [manutencao, calibragem] = await Promise.all([
    prisma.maintenanceItem.findMany({ where: { modelName: null, ...yearFilter }, orderBy: [{ priority: 'asc' }, { order: 'asc' }] }),
    prisma.tirePressure.findMany({ where: { modelName: null, ...yearFilter }, orderBy: { order: 'asc' } }),
  ])
  const entry = { manutencao, calibragem, expiresAt: now + GENERIC_CACHE_TTL_MS }
  genericByYearCache.set(year, entry)
  return entry
}

// ── Data fetching (server-side, visível ao Google) ────────────────────────────
// cache() deduplica a chamada ao banco entre generateMetadata e a Page no mesmo request.

const fetchData = cache(async (marcaSlug: string, modeloSlug: string, modeloName: string, year: number) => {
  const yearFilter = buildYearFilter(year)

  // Primeiro tenta achar o modelo EXATO do catálogo (VehicleModel real, mesma
  // string usada como Tip.modelName) via slug — evita o matching difuso abaixo
  // falhar em nomes com hífen/acento (ex: "V-MAX 1200", "XJ6 N/ABS"). Só cai no
  // matching por substring/word-boundary para URLs fora do catálogo conhecido.
  const catalog = await getPublicVehicleCatalog()
  const catalogEntry = catalog.find(v => v.marcaSlug === marcaSlug && v.modeloSlug === modeloSlug)

  let matchTip: string[]
  let matchMaint: string[]
  let matchTire: string[]

  if (catalogEntry) {
    matchTip = matchMaint = matchTire = [catalogEntry.modeloName]
  } else {
    const allNames = await getAllModelNames()
    matchTip   = allNames.tip.filter(n => matchesStoredName(modeloName, n))
    matchMaint = allNames.maint.filter(n => matchesStoredName(modeloName, n))
    matchTire  = allNames.tire.filter(n => matchesStoredName(modeloName, n))
  }

  const [macetes, problemas, manutencao, calibragem, genericByYear] = await Promise.all([
    matchTip.length > 0
      ? prisma.tip.findMany({ where: { modelName: { in: matchTip }, category: 'MACETES', ...yearFilter }, orderBy: { order: 'asc' } })
      : getGenericMacetes(),
    matchTip.length > 0
      ? prisma.tip.findMany({ where: { modelName: { in: matchTip }, category: 'PROBLEMAS', ...yearFilter }, orderBy: { order: 'asc' } })
      : Promise.resolve([]),
    matchMaint.length > 0
      ? prisma.maintenanceItem.findMany({ where: { modelName: { in: matchMaint }, ...yearFilter }, orderBy: [{ priority: 'asc' }, { order: 'asc' }] })
      : Promise.resolve([]),
    matchTire.length > 0
      ? prisma.tirePressure.findMany({ where: { modelName: { in: matchTire }, ...yearFilter }, orderBy: { order: 'asc' } })
      : Promise.resolve([]),
    getGenericByYear(year),
  ])

  return {
    macetes,
    macetesIsSpecific: matchTip.length > 0,
    problemas,
    manutencao: manutencao.length > 0 ? manutencao : genericByYear.manutencao,
    manutencaoIsSpecific: manutencao.length > 0,
    calibragem: calibragem.length > 0 ? calibragem : genericByYear.calibragem,
    calibragemIsSpecific: calibragem.length > 0,
  }
})

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function VehiclePage(
  { params }: { params: Promise<{ marca: string; modelo: string; ano: string }> }
) {
  const { marca, modelo, ano } = await params
  if (!isValidVehicleParams(marca, ano)) notFound()

  const marcaName  = slugToName(marca)
  const modeloName = slugToName(modelo)
  const year       = parseInt(ano, 10)

  const data = await fetchData(marca, modelo, modeloName, year)
  const otherYears = await getOtherYears(marca, modelo, year)

  const vehicleLabel = `${marcaName} ${modeloName} ${ano}`

  const now = new Date()
  const reviewDateLabel = now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  const reviewDateIso   = now.toISOString().split('T')[0]

  // Schema.org JSON-LD para artigo + FAQ
  const oilItem = data.manutencao.find(m =>
    /óleo|oleo/i.test(m.component)
  )
  const correiaItem = data.manutencao.find(m =>
    /correia/i.test(m.component)
  )

  const faqItems = [
    {
      q: `Quais são os problemas mais comuns do ${marcaName} ${modeloName}?`,
      a: data.problemas.length > 0
        ? `Os problemas crônicos documentados do ${vehicleLabel} incluem: ${data.problemas.map(p => p.title).join(', ')}. Confira a seção de Problemas Crônicos nesta página para mais detalhes e gravidade de cada item.`
        : `Para o ${vehicleLabel} não foram documentados problemas crônicos recorrentes em nossa base de dados. Mantenha a manutenção preventiva em dia e verifique se há recalls abertos consultando a DENATRAN com o número do chassi.`,
    },
    {
      q: `De quanto em quanto km trocar o óleo do ${marcaName} ${modeloName} ${ano}?`,
      a: oilItem
        ? `Para o ${vehicleLabel}, ${data.manutencaoIsSpecific ? 'segundo nossa tabela de manutenção específica para este modelo' : 'como referência geral'}: troca de óleo a cada ${[oilItem.intervalKm ? oilItem.intervalKm.toLocaleString('pt-BR') + ' km' : '', oilItem.intervalMonths ? oilItem.intervalMonths + ' meses' : ''].filter(Boolean).join(' ou ')} — o que ocorrer primeiro. Use sempre a viscosidade indicada no manual do proprietário. Condições severas de uso (trânsito intenso, pista de terra, clima quente) exigem intervalos menores.`
        : `Para o ${vehicleLabel}, consulte o manual do proprietário para o intervalo exato de troca de óleo. Motores ${marcaName} modernos geralmente recomendam troca a cada 5.000–10.000 km com óleo semissintético ou 7.500–15.000 km com sintético, sempre respeitando o prazo em meses mesmo sem atingir a quilometragem.`,
    },
    {
      q: `Qual a calibragem correta dos pneus do ${marcaName} ${modeloName} ${ano}?`,
      a: data.calibragem.length > 0
        ? `A pressão recomendada para o ${vehicleLabel} é de ${data.calibragem[0].frontPsi} PSI no eixo dianteiro e ${data.calibragem[0].rearPsi} PSI no eixo traseiro${data.calibragem[0].frontPsiLoad ? ` (com carga: ${data.calibragem[0].frontPsiLoad}/${data.calibragem[0].rearPsiLoad} PSI)` : ''}. Calibre sempre com o pneu frio, parado há pelo menos 3 horas.${data.calibragemIsSpecific ? '' : ' Confirme na etiqueta da coluna da porta do motorista, pois pode variar por versão.'}`
        : `A calibragem correta varia por versão e tamanho de pneu instalado. Verifique a etiqueta na coluna da porta do motorista do ${vehicleLabel} — lá estão os valores oficiais para pneu frio, com e sem carga. Calibragem incorreta aumenta consumo, desgasta pneus de forma irregular e prejudica a segurança.`,
    },
    {
      q: `Quando trocar a correia dentada do ${marcaName} ${modeloName} ${ano}?`,
      a: correiaItem
        ? `Para o ${vehicleLabel}, ${data.manutencaoIsSpecific ? 'nossa tabela específica indica' : 'como referência geral'}: troca da correia dentada a cada ${[correiaItem.intervalKm ? correiaItem.intervalKm.toLocaleString('pt-BR') + ' km' : '', correiaItem.intervalMonths ? correiaItem.intervalMonths + ' meses' : ''].filter(Boolean).join(' ou ')}. A correia dentada é uma peça crítica — seu rompimento pode causar danos sérios ao motor. Nunca ultrapasse o intervalo recomendado.`
        : `A troca da correia dentada é uma das manutenções mais críticas do motor. Para o ${vehicleLabel}, consulte o manual do proprietário para o intervalo exato. Em geral, ${marcaName} recomenda troca entre 60.000 e 100.000 km (ou a cada 5–7 anos), dependendo do motor. Não adie — uma correia rompida pode destruir o motor.`,
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `Macetes do ${vehicleLabel} — Dicas Técnicas de Mecânico`,
        description: `Macetes, problemas crônicos, tabela de manutenção e calibragem de pneus para o ${vehicleLabel}.`,
        url: `https://motormacete.com.br/macetes/${marca}/${modelo}/${ano}`,
        datePublished: '2025-01-01',
        dateModified: reviewDateIso,
        publisher: {
          '@type': 'Organization',
          name: 'MotorMacete',
          url: 'https://motormacete.com.br',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'MotorMacete', item: 'https://motormacete.com.br' },
          { '@type': 'ListItem', position: 2, name: 'Macetes', item: 'https://motormacete.com.br/macetes' },
          { '@type': 'ListItem', position: 3, name: vehicleLabel, item: `https://motormacete.com.br/macetes/${marca}/${modelo}/${ano}` },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Header ── */}
      <header className="border-b border-white/5 bg-[#050505]/95 sticky top-0 z-40">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl overflow-hidden shrink-0 bg-orange-600 flex items-center justify-center">
              <span className="text-white font-black text-sm">MM</span>
            </div>
            <span className="text-sm font-bold text-white">Motor<span className="text-orange-400">Macete</span></span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/macetes" className="text-sm text-slate-400 hover:text-orange-300 transition">
              ← Pesquisar outro veículo
            </Link>
            <Link
              href="/"
              className="rounded-full border border-orange-600 px-4 py-1.5 text-xs font-semibold text-orange-300 hover:bg-orange-600/20 transition"
            >
              Criar conta grátis
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* ── Breadcrumb ── */}
        <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-orange-300 transition">Início</Link>
          <span>/</span>
          <Link href="/macetes" className="hover:text-orange-300 transition">Macetes</Link>
          <span>/</span>
          <span className="capitalize">{marcaName}</span>
          <span>/</span>
          <span className="capitalize">{modeloName}</span>
          <span>/</span>
          <span className="text-orange-300">{ano}</span>
        </nav>

        {/* ── Hero ── */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300 mb-3">
            Guia técnico gratuito · Sem cadastro
          </p>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-4">
            Macetes do {marcaName} {modeloName} <span className="text-orange-600">{ano}</span>
          </h1>
          <p className="text-base text-slate-400 leading-relaxed max-w-2xl">
            Macetes de mecânicos experientes, problemas crônicos documentados, tabela de manutenção
            e calibragem de pneus para o {vehicleLabel}. Informações baseadas em prática de oficina.
          </p>
          <p className="mt-3 text-xs text-slate-600">
            <time dateTime={reviewDateIso}>Revisado em {reviewDateLabel}</time>
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/home/mecanico"
              className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-500 transition"
            >
              🔧 Perguntar ao Mecânico Virtual
            </Link>
            <Link
              href="/macetes"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:border-orange-600/50 hover:text-orange-300 transition"
            >
              Pesquisar outro veículo
            </Link>
          </div>
        </div>

        <div className="space-y-10">

          {/* ── Macetes ── */}
          <section id="macetes">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">🔧</span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-orange-300 font-semibold">Dicas práticas</p>
                <h2 className="text-2xl font-black text-white">Macetes de Mecânicos</h2>
              </div>
            </div>
            {data.macetes.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#0f0f12] p-6 text-slate-500 text-sm">
                Nenhum macete cadastrado para este modelo ainda. Experimente o Mecânico Virtual para dúvidas específicas.
              </div>
            ) : (
              <ul className="space-y-3">
                {data.macetes.map((tip, i) => (
                  <li key={tip.id} className="rounded-2xl border border-white/10 bg-[#0f0f12] p-5">
                    <div className="flex items-start gap-3">
                      <span
                        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                        style={{ background: 'rgba(255,102,0,0.2)', color: '#ff6600' }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-white mb-1">{tip.title}</p>
                        <p className="text-sm text-slate-400 leading-relaxed">{tip.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* ── Problemas Crônicos ── */}
          <section id="problemas">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-orange-300 font-semibold">Pontos fracos conhecidos</p>
                <h2 className="text-2xl font-black text-white">Problemas Crônicos do {marcaName} {modeloName}</h2>
              </div>
            </div>
            {data.problemas.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#0f0f12] p-6 flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-white">Nenhum problema crônico identificado</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Para o {vehicleLabel} não foram documentados problemas crônicos recorrentes em nossa base. Isso é uma boa notícia, mas faça sempre a manutenção preventiva em dia.
                  </p>
                </div>
              </div>
            ) : (
              <ul className="space-y-3">
                {data.problemas.map((tip) => (
                  <li
                    key={tip.id}
                    className="rounded-2xl p-5"
                    style={{
                      background: `${SEVERITY_COLOR[tip.severity]}10`,
                      border: `1px solid ${SEVERITY_COLOR[tip.severity]}33`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="font-semibold text-white leading-snug">{tip.title}</p>
                      <span
                        className="shrink-0 text-xs font-bold px-2 py-0.5 rounded"
                        style={{
                          background: `${SEVERITY_COLOR[tip.severity]}20`,
                          color: SEVERITY_COLOR[tip.severity],
                          border: `1px solid ${SEVERITY_COLOR[tip.severity]}44`,
                        }}
                      >
                        {SEVERITY_LABEL[tip.severity]}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{tip.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* ── Tabela de Manutenção ── */}
          <section id="manutencao">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">⚙️</span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-orange-300 font-semibold">
                  {data.manutencaoIsSpecific ? 'Específico para este modelo' : 'Tabela geral recomendada'}
                </p>
                <h2 className="text-2xl font-black text-white">Tabela de Manutenção — {vehicleLabel}</h2>
              </div>
            </div>
            {data.manutencao.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#0f0f12] p-6 text-slate-500 text-sm">
                Tabela de manutenção não disponível. Consulte o manual do proprietário.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#0f0f12]">
                      <th className="px-5 py-3 text-left text-xs uppercase tracking-widest text-slate-500 font-semibold">Componente</th>
                      <th className="px-5 py-3 text-left text-xs uppercase tracking-widest text-slate-500 font-semibold">Intervalo km</th>
                      <th className="px-5 py-3 text-left text-xs uppercase tracking-widest text-slate-500 font-semibold">Intervalo meses</th>
                      <th className="px-5 py-3 text-left text-xs uppercase tracking-widest text-slate-500 font-semibold">Prioridade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {data.manutencao.map((item) => (
                      <tr key={item.id} className="bg-[#050505] hover:bg-[#0f0f12] transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-white">{item.component}</p>
                          {item.notes && <p className="text-xs text-slate-500 mt-0.5">{item.notes}</p>}
                        </td>
                        <td className="px-5 py-3.5 text-slate-400">
                          {item.intervalKm ? `${item.intervalKm.toLocaleString('pt-BR')} km` : '—'}
                        </td>
                        <td className="px-5 py-3.5 text-slate-400">
                          {item.intervalMonths ? `${item.intervalMonths} meses` : '—'}
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded"
                            style={{
                              background: `${PRIORITY_COLOR[item.priority]}20`,
                              color: PRIORITY_COLOR[item.priority],
                              border: `1px solid ${PRIORITY_COLOR[item.priority]}44`,
                            }}
                          >
                            {PRIORITY_LABEL[item.priority]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* ── Calibragem de Pneus ── */}
          {data.calibragem.length > 0 && (
            <section id="calibragem">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🛞</span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-orange-300 font-semibold">
                    {data.calibragemIsSpecific ? 'Dados específicos do modelo' : 'Referência geral'}
                  </p>
                  <h2 className="text-2xl font-black text-white">Calibragem de Pneus — {vehicleLabel}</h2>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {data.calibragem.map((tire) => (
                  <div key={tire.id} className="rounded-2xl border border-white/10 bg-[#0f0f12] p-5">
                    <p className="text-sm font-semibold text-orange-300 mb-3">{tire.tireSize}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-[#050505] p-3 text-center">
                        <p className="text-xs text-slate-500 mb-1">Dianteiro</p>
                        <p className="text-2xl font-black text-white">{tire.frontPsi}</p>
                        <p className="text-xs text-slate-500">PSI</p>
                      </div>
                      <div className="rounded-xl bg-[#050505] p-3 text-center">
                        <p className="text-xs text-slate-500 mb-1">Traseiro</p>
                        <p className="text-2xl font-black text-white">{tire.rearPsi}</p>
                        <p className="text-xs text-slate-500">PSI</p>
                      </div>
                      {tire.frontPsiLoad && (
                        <div className="rounded-xl bg-[#050505] p-3 text-center">
                          <p className="text-xs text-slate-500 mb-1">Diant. c/ carga</p>
                          <p className="text-2xl font-black text-white">{tire.frontPsiLoad}</p>
                          <p className="text-xs text-slate-500">PSI</p>
                        </div>
                      )}
                      {tire.rearPsiLoad && (
                        <div className="rounded-xl bg-[#050505] p-3 text-center">
                          <p className="text-xs text-slate-500 mb-1">Tras. c/ carga</p>
                          <p className="text-2xl font-black text-white">{tire.rearPsiLoad}</p>
                          <p className="text-xs text-slate-500">PSI</p>
                        </div>
                      )}
                      {tire.sparePsi && (
                        <div className="rounded-xl bg-[#050505] p-3 text-center col-span-2">
                          <p className="text-xs text-slate-500 mb-1">Estepe</p>
                          <p className="text-2xl font-black text-white">{tire.sparePsi}</p>
                          <p className="text-xs text-slate-500">PSI</p>
                        </div>
                      )}
                    </div>
                    {tire.notes && <p className="text-xs text-slate-500 mt-3">{tire.notes}</p>}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-600 mt-3">
                ⚠️ Calibre sempre com o pneu frio (parado há pelo menos 3 horas ou rodado menos de 3 km).
              </p>
            </section>
          )}

          {/* ── CTA Mecânico Virtual ── */}
          <section className="rounded-[28px] border border-orange-500/20 bg-orange-500/5 p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.3em] text-orange-300 font-semibold mb-2">IA especializada em veículos</p>
                <h2 className="text-xl font-black text-white mb-2">
                  Tem alguma dúvida específica sobre o {marcaName} {modeloName}?
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  O Mecânico Virtual usa inteligência artificial para responder dúvidas técnicas sobre seu veículo — sintomas, diagnósticos, custos de reparo e muito mais.
                  As 3 primeiras perguntas são gratuitas, sem cadastro.
                </p>
              </div>
              <Link
                href="/home/mecanico"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-sm font-bold text-white hover:bg-orange-500 transition"
              >
                🔧 Abrir Mecânico Virtual
              </Link>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">❓</span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-orange-300 font-semibold">Dúvidas frequentes</p>
                <h2 className="text-2xl font-black text-white">Perguntas sobre o {marcaName} {modeloName} {ano}</h2>
              </div>
            </div>
            <div className="space-y-4">
              {faqItems.map(({ q, a }, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-white/10 bg-[#0f0f12] overflow-hidden"
                >
                  <summary className="cursor-pointer px-5 py-4 font-semibold text-white text-sm flex items-center justify-between gap-3 list-none">
                    {q}
                    <span className="shrink-0 text-orange-400 text-lg group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* ── Links para outros anos ── */}
          {otherYears.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-white mb-4">
                {marcaName} {modeloName} — Outros anos
              </h2>
              <div className="flex flex-wrap gap-2">
                {[...otherYears, year].sort((a, b) => a - b).map(y => (
                  <Link
                    key={y}
                    href={`/macetes/${marca}/${modelo}/${y}`}
                    className="px-4 py-2 rounded-full border text-sm font-semibold transition"
                    style={{
                      borderColor: y === year ? '#ff6600' : '#3a3a42',
                      color: y === year ? '#ff6600' : '#666',
                      background: y === year ? 'rgba(255,102,0,0.1)' : 'transparent',
                    }}
                  >
                    {y}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Disclaimer ── */}
          <p className="text-xs text-slate-600 leading-relaxed border-t border-white/5 pt-6">
            As informações nesta página são baseadas em dados de mecânicos profissionais, fóruns especializados e experiência de proprietários.
            Servem como referência informativa — consulte sempre um mecânico de confiança para diagnósticos e serviços no seu veículo.
            Os intervalos de manutenção podem variar conforme condições de uso, clima e combustível utilizado.
          </p>
        </div>

        {/* ── Footer ── */}
        <footer className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500 border-t border-white/5 pt-8">
          <Link href="/" className="hover:text-orange-300 transition">Início</Link>
          <Link href="/macetes" className="hover:text-orange-300 transition">Pesquisar macetes</Link>
          <Link href="/home/mecanico" className="hover:text-orange-300 transition">Mecânico Virtual</Link>
          <Link href="/sobre" className="hover:text-orange-300 transition">Sobre</Link>
          <Link href="/privacidade" className="hover:text-orange-300 transition">Privacidade</Link>
        </footer>
      </div>
    </main>
  )
}
