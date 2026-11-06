// generate-catalog.ts — pré-computa o catálogo público de veículos (usado por
// sitemap.ts, /macetes e as ~700 páginas /macetes/[marca]/[modelo]/[ano]) e o
// mapa de canonicalização de conteúdo duplicado, gravando o resultado em
// apps/web/lib/vehicle-catalog.generated.json.
//
// Por quê: o build da Vercel roda generateStaticParams para centenas de
// páginas em múltiplos workers paralelos do Next.js — cada worker tem seu
// próprio módulo/cache em memória, então o cache de 1h em vehicleCatalog.ts
// NÃO é compartilhado entre eles, e cada worker acaba fazendo sua própria
// varredura completa das tabelas Tip/VehicleModel/MaintenanceItem. Isso
// estourou a cota de transferência de dados do plano Free do Neon (5GB/mês).
//
// Rodando essa consulta UMA VEZ aqui (processo único, fora do build) e
// commitando o JSON resultante, o build deixa de bater no banco nesse
// caminho. Rode `pnpm --filter @motormacete/database db:generate-catalog`
// sempre que adicionar/alterar seeds de Tip, e commite o JSON gerado.
import { writeFileSync } from 'fs'
import { join } from 'path'
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

interface CatalogVehicle {
  marcaSlug: string
  marcaName: string
  modeloSlug: string
  modeloName: string
  anos: number[]
}

const DEFAULT_YEAR_FROM = 2015
const DEFAULT_YEAR_TO = new Date().getFullYear()

async function buildCatalog(): Promise<{ catalog: CatalogVehicle[]; tipSignatures: Record<string, string[]> }> {
  const tips = await prisma.tip.findMany({
    where: { modelName: { not: null } },
    select: { modelName: true, category: true, title: true },
  })

  const tipSignatures: Record<string, string[]> = {}
  const namesWithContentSet = new Set<string>()
  for (const t of tips) {
    const name = t.modelName!
    namesWithContentSet.add(name)
    const key = `${t.category}::${t.title}`
    if (!tipSignatures[name]) tipSignatures[name] = []
    tipSignatures[name].push(key)
  }
  const namesWithContent = [...namesWithContentSet]

  if (namesWithContent.length === 0) return { catalog: [], tipSignatures: {} }

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

  const boundsMap = new Map(yearBounds.map((b) => [b.modelName!, b]))
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
      .filter((y) => y >= 1990 && y <= DEFAULT_YEAR_TO + 1)
      .sort((a, b) => a - b)

    catalog.push({
      marcaSlug,
      marcaName: model.brand.name,
      modeloSlug,
      modeloName: model.name,
      anos: anos.length > 0 ? anos : [DEFAULT_YEAR_TO],
    })
  }

  catalog.sort((a, b) => a.marcaName.localeCompare(b.marcaName) || a.modeloName.localeCompare(b.modeloName))

  return { catalog, tipSignatures }
}

async function main() {
  console.log('📦 Gerando catálogo de veículos a partir do banco...')
  const { catalog, tipSignatures } = await buildCatalog()

  const outPath = join(__dirname, '../../../apps/web/lib/vehicle-catalog.generated.json')
  writeFileSync(
    outPath,
    JSON.stringify({ generatedAt: new Date().toISOString(), catalog, tipSignatures }, null, 2),
  )

  console.log(`✅ ${catalog.length} veículos, ${Object.keys(tipSignatures).length} modelos com tips.`)
  console.log(`   Gravado em ${outPath}`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
