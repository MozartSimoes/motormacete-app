import { prisma } from './db'
import generatedCatalog from './vehicle-catalog.generated.json'

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export interface CatalogVehicle {
  marcaSlug: string
  marcaName: string
  modeloSlug: string
  modeloName: string // nome EXATO como salvo em VehicleModel/Tip.modelName
  anos: number[]
}

const DEFAULT_YEAR_FROM = 2015
const DEFAULT_YEAR_TO = new Date().getFullYear()

// O catálogo público de veículos (usado por sitemap.ts, pela página /macetes
// e por generateStaticParams/generateMetadata/fetchData das ~700 páginas
// /macetes/[marca]/[modelo]/[ano]) é pré-computado por
// `pnpm --filter @motormacete/database db:generate-catalog` e commitado em
// vehicle-catalog.generated.json. Rode esse script sempre que adicionar ou
// alterar seeds de Tip e commite o JSON resultante.
//
// Por quê: o build da Vercel roda a geração estática em múltiplos workers
// paralelos do Next.js, cada um com seu próprio módulo/cache em memória — um
// cache com `let` no topo deste arquivo NÃO é compartilhado entre eles, então
// cada worker fazia sua própria varredura completa de Tip/VehicleModel/
// MaintenanceItem a cada deploy. Isso estourou a cota de transferência de
// dados do plano Free do Neon (5GB/mês). Ler de um JSON estático elimina
// essas consultas no build inteiramente.
//
// Se o JSON ainda não foi gerado (catalog vazio, generatedAt null — caso do
// bootstrap inicial ou de esquecimento de regenerar), cai de volta para
// consulta direta ao Prisma com cache de 1h em memória, igual ao
// comportamento antigo — sem isso o site ficaria sem catálogo.
const STATIC_CATALOG = generatedCatalog.catalog as CatalogVehicle[]
const STATIC_TIP_SIGNATURES = generatedCatalog.tipSignatures as Record<string, string[]>
const HAS_STATIC_CATALOG = STATIC_CATALOG.length > 0

let catalogCache: { data: CatalogVehicle[]; expiresAt: number } | null = null
const CATALOG_TTL_MS = 60 * 60 * 1000 // 1h

export async function getPublicVehicleCatalog(): Promise<CatalogVehicle[]> {
  if (HAS_STATIC_CATALOG) return STATIC_CATALOG

  const now = Date.now()
  if (catalogCache && catalogCache.expiresAt > now) return catalogCache.data
  const data = await fetchPublicVehicleCatalog()
  catalogCache = { data, expiresAt: now + CATALOG_TTL_MS }
  return data
}

async function fetchPublicVehicleCatalog(): Promise<CatalogVehicle[]> {
  const tipModelNames = await prisma.tip.findMany({
    where: { modelName: { not: null } },
    select: { modelName: true },
    distinct: ['modelName'],
  })
  const namesWithContent = tipModelNames.map(r => r.modelName!)
  if (namesWithContent.length === 0) return []

  const [models, yearBounds] = await Promise.all([
    prisma.vehicleModel.findMany({
      where: { name: { in: namesWithContent } },
      include: { brand: true },
    }),
    prisma.maintenanceItem.groupBy({
      by: ['modelName'],
      where: { modelName: { in: namesWithContent } },
      _min: { yearFrom: true },
      _max: { yearTo: true },
    }),
  ])

  const boundsMap = new Map(yearBounds.map(b => [b.modelName!, b]))
  const seenSlugs = new Set<string>()
  const catalog: CatalogVehicle[] = []

  for (const model of models) {
    const marcaSlug = slugify(model.brand.name)
    const modeloSlug = slugify(model.name)
    if (!marcaSlug || !modeloSlug) continue

    const key = `${marcaSlug}/${modeloSlug}`
    if (seenSlugs.has(key)) continue
    seenSlugs.add(key)

    const bounds = boundsMap.get(model.name)
    const yFrom = bounds?._min.yearFrom ?? DEFAULT_YEAR_FROM
    const yTo = bounds?._max.yearTo ?? DEFAULT_YEAR_TO
    const yMid = Math.round((yFrom + yTo) / 2)

    const anos = Array.from(new Set([yFrom, yMid, yTo]))
      .filter(y => y >= 1990 && y <= DEFAULT_YEAR_TO + 1)
      .sort((a, b) => a - b)

    catalog.push({
      marcaSlug,
      marcaName: model.brand.name,
      modeloSlug,
      modeloName: model.name,
      anos: anos.length > 0 ? anos : [DEFAULT_YEAR_TO],
    })
  }

  return catalog.sort((a, b) => a.marcaName.localeCompare(b.marcaName) || a.modeloName.localeCompare(b.modeloName))
}

export async function findCatalogEntry(marcaSlug: string, modeloSlug: string): Promise<CatalogVehicle | null> {
  const catalog = await getPublicVehicleCatalog()
  return catalog.find(v => v.marcaSlug === marcaSlug && v.modeloSlug === modeloSlug) ?? null
}

// Marcas conhecidas (lookup em memória, sem tocar o banco) — usado para
// rejeitar cedo (notFound) URLs de /macetes/[marca]/[modelo]/[ano] com marca
// inexistente, como as que um bot/crawler gera tentando slugs aleatórios
// (ex: "scrambler-desert-sled"). Sem essa checagem, cada tentativa ainda
// disparava fetchData() e suas consultas ao Postgres antes de cair no
// conteúdo genérico, e sob carga de bot isso mantinha o compute do Neon
// acordado (ver comentário em fetchData na página de veículo).
const KNOWN_BRAND_SLUGS = new Set(STATIC_CATALOG.map(v => v.marcaSlug))

export function isKnownBrandSlug(marcaSlug: string): boolean {
  if (!HAS_STATIC_CATALOG) return true // sem catálogo estático, não há como validar sem ir ao banco
  return KNOWN_BRAND_SLUGS.has(marcaSlug)
}

// ─── Consolidação de conteúdo duplicado (variantes de trim) ──────────────────
// Vários modelName representam a MESMA moto/mecânica sob nomes FIPE diferentes
// (ex: "CROSSER 150"/"CROSSER 160"/"CROSSER", "XJ6 F"/"XJ6 N SP"/"XJ6 N/ABS") e
// por convenção de seed reaproveitam o mesmo conteúdo via spread — o que gera
// páginas com texto praticamente idêntico. Isso bate com o critério do Google
// AdSense/Search de "conteúdo duplicado entre múltiplas páginas". Em vez de
// reescrever conteúdo único para cada variante (inviável em escala), agrupamos
// os modelos com alta similaridade de conteúdo (Jaccard sobre título+categoria
// dos tips, só comparando dentro da mesma marca) e apontamos um rel=canonical
// da(s) variante(s) para o modelo mais completo do grupo.
const SIMILARITY_THRESHOLD = 0.75

function computeCanonicalMapFromSignatures(
  sigByModel: Map<string, Set<string>>,
  catalog: CatalogVehicle[],
): Map<string, string> {
  const brandOf = new Map(catalog.map(v => [v.modeloName, v.marcaSlug]))

  const byBrand = new Map<string, string[]>()
  for (const modelName of sigByModel.keys()) {
    const brand = brandOf.get(modelName)
    if (!brand) continue
    const arr = byBrand.get(brand) ?? []
    arr.push(modelName)
    byBrand.set(brand, arr)
  }

  const parent = new Map<string, string>()
  const find = (x: string): string => {
    while (parent.get(x) !== x) { parent.set(x, parent.get(parent.get(x)!)!); x = parent.get(x)! }
    return x
  }
  const union = (a: string, b: string) => {
    const ra = find(a), rb = find(b)
    if (ra !== rb) parent.set(ra, rb)
  }

  for (const names of byBrand.values()) {
    for (const n of names) parent.set(n, n)
    for (let i = 0; i < names.length; i++) {
      for (let j = i + 1; j < names.length; j++) {
        const a = sigByModel.get(names[i])!
        const b = sigByModel.get(names[j])!
        const inter = [...a].filter(x => b.has(x)).length
        const uni = new Set([...a, ...b]).size
        if (uni === 0) continue
        if (inter / uni >= SIMILARITY_THRESHOLD) union(names[i], names[j])
      }
    }
  }

  const clusters = new Map<string, string[]>()
  for (const n of parent.keys()) {
    const root = find(n)
    const arr = clusters.get(root) ?? []
    arr.push(n)
    clusters.set(root, arr)
  }

  const result = new Map<string, string>()
  for (const members of clusters.values()) {
    // canônico = o de conteúdo mais completo (mais tips); empate resolvido por ordem alfabética estável
    const canonical = members.reduce((best, curr) => {
      const bestSize = sigByModel.get(best)!.size
      const currSize = sigByModel.get(curr)!.size
      if (currSize !== bestSize) return currSize > bestSize ? curr : best
      return curr < best ? curr : best
    })
    for (const m of members) result.set(m, canonical)
  }

  return result
}

async function computeCanonicalMap(): Promise<Map<string, string>> {
  const catalog = await getPublicVehicleCatalog()

  if (HAS_STATIC_CATALOG) {
    const sigByModel = new Map<string, Set<string>>()
    for (const [modelName, sigs] of Object.entries(STATIC_TIP_SIGNATURES)) {
      sigByModel.set(modelName, new Set(sigs))
    }
    return computeCanonicalMapFromSignatures(sigByModel, catalog)
  }

  const tips = await prisma.tip.findMany({
    where: { modelName: { not: null } },
    select: { modelName: true, category: true, title: true },
  })

  const sigByModel = new Map<string, Set<string>>()
  for (const t of tips) {
    const key = `${t.category}::${t.title}`
    const set = sigByModel.get(t.modelName!) ?? new Set<string>()
    set.add(key)
    sigByModel.set(t.modelName!, set)
  }

  return computeCanonicalMapFromSignatures(sigByModel, catalog)
}

let canonicalMapCache: { map: Map<string, string>; expiresAt: number } | null = null
const CANONICAL_MAP_TTL_MS = 60 * 60 * 1000 // 1h, igual ao revalidate das páginas

async function getCanonicalMap(): Promise<Map<string, string>> {
  if (HAS_STATIC_CATALOG) {
    if (canonicalMapCache) return canonicalMapCache.map
    const map = await computeCanonicalMap()
    canonicalMapCache = { map, expiresAt: Infinity }
    return map
  }

  const now = Date.now()
  if (canonicalMapCache && canonicalMapCache.expiresAt > now) return canonicalMapCache.map
  const map = await computeCanonicalMap()
  canonicalMapCache = { map, expiresAt: now + CANONICAL_MAP_TTL_MS }
  return map
}

const BASE_URL = 'https://motormacete.com.br'

// Retorna a URL canônica para uma página de veículo: a própria URL se o
// modelo não faz parte de um cluster de duplicidade E o ano pedido é um dos
// anos "representantes" do modelo no catálogo (os únicos listados no sitemap
// e linkados em "Outros anos" — ver getOtherYears), ou a URL canônica
// apropriada caso contrário.
//
// Por quê o passo de ano: o conteúdo de Tip/MaintenanceItem é o mesmo para
// todo o intervalo yearFrom-yearTo de uma geração, então
// /macetes/x/y/2021, /2022, /2023... de uma mesma geração renderizam texto
// idêntico. Sem colapsar isso, cada ano fora do catálogo (alcançável via URL
// digitada, link externo antigo, ou crawl histórico) era uma página indexável
// se autodeclarando canônica — exatamente o padrão que o Google AdSense
// sinalizou como "conteúdo de baixo valor" em 2026-07-14 (ver memória
// project_adsense_approval). Ver também getOtherYears, que já limita os links
// de navegação "Outros anos" da própria página a esses mesmos anos
// representantes, então esse fallback só entra em ação para tráfego externo.
export async function resolveCanonicalUrl(marcaSlug: string, modeloSlug: string, ano: string): Promise<string> {
  const selfUrl = `${BASE_URL}/macetes/${marcaSlug}/${modeloSlug}/${ano}`

  const catalog = await getPublicVehicleCatalog()
  const entry = catalog.find(v => v.marcaSlug === marcaSlug && v.modeloSlug === modeloSlug)
  if (!entry) return selfUrl

  const canonicalMap = await getCanonicalMap()
  const canonicalName = canonicalMap.get(entry.modeloName)
  const targetEntry = (!canonicalName || canonicalName === entry.modeloName)
    ? entry
    : catalog.find(v => v.modeloName === canonicalName && v.marcaSlug === marcaSlug) ?? entry

  const year = parseInt(ano, 10)
  const isSelfCanonical = targetEntry === entry && targetEntry.anos.includes(year)
  if (isSelfCanonical) return selfUrl

  const canonicalYear = Number.isFinite(year)
    ? targetEntry.anos.reduce((closest, y) => Math.abs(y - year) < Math.abs(closest - year) ? y : closest, targetEntry.anos[0])
    : targetEntry.anos[Math.floor(targetEntry.anos.length / 2)]

  return `${BASE_URL}/macetes/${targetEntry.marcaSlug}/${targetEntry.modeloSlug}/${canonicalYear}`
}

// Anos a linkar na seção "Outros anos" da página de um modelo — restrito aos
// anos representantes do catálogo (os mesmos do sitemap) em vez de uma janela
// fixa em torno do ano atual, que gerava um crawl trap combinatório: cada
// página linkava para ±3 anos vizinhos, que por sua vez linkavam para outros
// ±3, indexando dezenas de páginas de conteúdo idêntico por modelo.
export async function getOtherYears(marcaSlug: string, modeloSlug: string, currentYear: number): Promise<number[]> {
  const catalog = await getPublicVehicleCatalog()
  const entry = catalog.find(v => v.marcaSlug === marcaSlug && v.modeloSlug === modeloSlug)
  if (!entry) return []
  return entry.anos.filter(y => y !== currentYear)
}

// Só os modelos "canônicos" (representante de cada cluster de duplicidade,
// ou modelos sem duplicidade) — usado pelo sitemap para não listar como
// indexável uma URL que a própria página marca como duplicada de outra.
export async function getCanonicalCatalog(): Promise<CatalogVehicle[]> {
  const catalog = await getPublicVehicleCatalog()
  const canonicalMap = await getCanonicalMap()
  return catalog.filter(v => {
    const canonicalName = canonicalMap.get(v.modeloName)
    return !canonicalName || canonicalName === v.modeloName
  })
}
