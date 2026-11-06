/**
 * Seed Caoa Chery Face, Cielo e S-18 — macetes, problemas, manutenção
 * Três hatches/sedans compactos de entrada da mesma fase inicial da marca
 * no Brasil (~2011-2017, antes da fábrica própria da CAOA): Face (1.3
 * 16V), Cielo (1.6 16V, hatch e sedan) e S-18 (1.3 16V). Mecânica simples,
 * problemas e cuidados de manutenção muito parecidos entre os três — daí
 * estarem reunidos no mesmo arquivo, cada um com seu próprio modelName.
 * Execute: pnpm --filter @motormacete/database db:seed:caoachery-face-cielo-s18
 *
 * Fontes: carroclub.com.br, reclameaqui.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

const MACETES_COMUM: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Peça de reposição escassa — pesquise disponibilidade antes de comprar',
    body: 'Como outros Chery da mesma fase inicial no Brasil (antes da fábrica própria da CAOA), peça de carroceria/acabamento específica pode exigir encomenda e demora. Antes de comprar, pesquise disponibilidade de peça na sua região — mecânica básica (motor, suspensão) costuma ser mais fácil de resolver que item de acabamento.',
  },
]
const PROBLEMAS_COMUM: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Inspecione corrosão e vedação com atenção — modelos já com bastante idade',
    body: 'Por serem modelos de mais de 10 anos, o maior risco hoje é degradação por idade — corrosão, borracha de vedação ressecada e vazamento de fluido por junta velha. Inspeção visual regular por baixo do carro ajuda a identificar isso cedo.',
  },
]
const MANUTENCAO_COMUM: TipInput[] = [
  { severity: 'OK', title: 'Cronograma geral (mecânica simples, motor aspirado)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | Anual — Inspeção de mangueiras, correias e vedações, dado a idade do veículo.' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Face', yearFrom: 2011, yearTo: 2017, MACETES: MACETES_COMUM, PROBLEMAS: PROBLEMAS_COMUM, MANUTENCAO: MANUTENCAO_COMUM },
  { modelName: 'Cielo', yearFrom: 2011, yearTo: 2017, MACETES: MACETES_COMUM, PROBLEMAS: PROBLEMAS_COMUM, MANUTENCAO: MANUTENCAO_COMUM },
  { modelName: 'S-18', yearFrom: 2011, yearTo: 2017, MACETES: MACETES_COMUM, PROBLEMAS: PROBLEMAS_COMUM, MANUTENCAO: MANUTENCAO_COMUM },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Face', yearFrom: 2011, yearTo: 2017, tireSize: '175/70 R13 (referência)', frontPsi: 28, rearPsi: 28, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta.' },
  { modelName: 'Cielo', yearFrom: 2011, yearTo: 2017, tireSize: '185/65 R14 (referência)', frontPsi: 29, rearPsi: 29, frontPsiLoad: 31, rearPsiLoad: 33, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta.' },
  { modelName: 'S-18', yearFrom: 2011, yearTo: 2017, tireSize: '175/65 R14 (referência)', frontPsi: 28, rearPsi: 28, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Face', yearFrom: 2011, yearTo: 2017, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Face', yearFrom: 2011, yearTo: 2017, component: 'Inspeção de mangueiras/vedações (idade do veículo)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'Cielo', yearFrom: 2011, yearTo: 2017, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 2 },
  { modelName: 'Cielo', yearFrom: 2011, yearTo: 2017, component: 'Inspeção de mangueiras/vedações (idade do veículo)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'S-18', yearFrom: 2011, yearTo: 2017, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 4 },
  { modelName: 'S-18', yearFrom: 2011, yearTo: 2017, component: 'Inspeção de mangueiras/vedações (idade do veículo)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 5 },
]

async function main() {
  console.log('🚗 Seed Caoa Chery Face/Cielo/S-18...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Caoa Chery', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Caoa Chery', vehicleTypeId: carroType.id },
  })
  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })
    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }, idx) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: idx })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName}`)
  }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map((b) => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Caoa Chery Face/Cielo/S-18 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
