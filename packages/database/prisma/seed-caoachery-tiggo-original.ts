/**
 * Seed Caoa Chery Tiggo (original, motor 2.0) — macetes, problemas,
 * manutenção e calibragem. Primeiro Tiggo vendido no Brasil (~2011-2016),
 * SUV médio, motor 2.0 16V aspirado, câmbio manual ou automático. Na FIPE
 * aparece como "Tiggo 2.0 16V..." — modelName usado aqui é "Tiggo 2.0"
 * para não colidir com o "Tiggo 2" (SUV compacto mais recente, arquivo
 * separado) nem com Tiggo 3X/5X/7/8.
 * Execute: pnpm --filter @motormacete/database db:seed:caoachery-tiggo-original
 *
 * Fontes: carroclub.com.br, car.blog.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

const MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 2.0 aspirado sem turbo — mecânica mais simples que os Chery atuais',
    body: 'Diferente da linha Tiggo atual (2/3X/5X/7/8, todos com motor turbo), esse Tiggo original usa motor 2.0 16V aspirado — sem os cuidados extras de motor turbo. Em compensação, consumo é mais alto que os modelos turbo mais modernos e eficientes.',
  },
  {
    severity: 'WARN',
    title: 'Peça de reposição escassa — modelo de fase inicial da marca no Brasil',
    body: 'Por ser da mesma fase inicial da Chery no Brasil que o QQ/Celer/Face/Cielo (antes da fábrica própria da CAOA), peça de carroceria/acabamento específica pode ser mais difícil de achar. Pesquise disponibilidade antes de comprar um exemplar usado.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Modelo já com bastante idade — maior risco é degradação por tempo, não por uso',
    body: 'Com mais de 10 anos de mercado, o principal risco em exemplares hoje é degradação por idade (borracha ressecada, corrosão, vazamento por junta velha) mais que desgaste por quilometragem. Inspeção visual regular por baixo do carro ajuda a identificar isso cedo.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tiggo original (2.0 16V)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000 km — Óleo do câmbio (versões automáticas). | Anual — Inspeção de mangueiras, correias e vedações, dado a idade do veículo.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Tiggo 2.0', yearFrom: 2011, yearTo: 2016, tireSize: '215/60 R17 (referência)', frontPsi: 30, rearPsi: 30, frontPsiLoad: 32, rearPsiLoad: 35, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Tiggo 2.0', yearFrom: 2011, yearTo: 2016, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Tiggo 2.0', yearFrom: 2011, yearTo: 2016, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 1 },
  { modelName: 'Tiggo 2.0', yearFrom: 2011, yearTo: 2016, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Tiggo 2.0', yearFrom: 2011, yearTo: 2016, component: 'Óleo do câmbio (versões automáticas)', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 3 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Tiggo 2.0', yearFrom: 2011, yearTo: 2016, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Caoa Chery Tiggo (original, 2.0)...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Caoa Chery', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Caoa Chery', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Tiggo 2.0', brandId: brand.id } },
    update: {}, create: { name: 'Tiggo 2.0', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Tiggo 2.0' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Tiggo 2.0' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Tiggo 2.0' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Caoa Chery Tiggo (original, 2.0) concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
