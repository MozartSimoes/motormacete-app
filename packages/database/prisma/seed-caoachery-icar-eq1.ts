/**
 * Seed Caoa Chery iCar EQ1 — macetes, problemas, manutenção e calibragem
 * City car 100% elétrico de entrada, lançamento recente da marca no
 * Brasil. Fonte de dados ainda escassa por ser modelo muito novo — texto
 * mantido honesto sobre isso, sem inventar número técnico (autonomia,
 * kWh) não confirmado.
 * Execute: pnpm --filter @motormacete/database db:seed:caoachery-icar-eq1
 *
 * Fontes: pesquisa geral de imprensa automotiva brasileira 2026
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
    title: 'Carregue entre 20-80% no uso diário para preservar a bateria',
    body: 'Como em qualquer elétrico, reserve o carregamento até 100% para quando precisar da autonomia máxima — no dia a dia, manter a carga entre 20-80% prolonga a vida útil da bateria.',
  },
  {
    severity: 'OK',
    title: 'City car elétrico: manutenção concentrada em pneu, freio e itens de cabine',
    body: 'Sem motor a combustão, a manutenção se concentra em pneus, pastilha/disco de freio (a frenagem regenerativa reduz bastante o desgaste), filtro de cabine e fluido de freio — sem troca de óleo, filtro de óleo ou vela de ignição.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Lançamento muito recente — sem histórico de confiabilidade consolidado no Brasil',
    body: 'Por ser um lançamento recente da marca no Brasil, ainda não há relato consistente de problema de uso real no país. Não é motivo de preocupação, só significa que vale acompanhar grupos e fóruns de proprietários à medida que a frota cresce, em vez de assumir que problemas de outros modelos Chery necessariamente se repetem aqui — mecânica de um elétrico é bem diferente da linha a combustão da marca.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma iCar EQ1 (elétrico)',
    body: '15.000 km ou anual — Inspeção geral (freios, suspensão, pneus). | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio. | Sempre — carregue entre 20-80% no uso diário. | Sempre — use o freio convencional de vez em quando mesmo com a regenerativa ativa, evita oxidação do disco por baixo uso.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'iCar EQ1', yearFrom: 2025, yearTo: null, tireSize: '165/65 R14 (referência) — varia conforme roda', frontPsi: 30, rearPsi: 30, frontPsiLoad: 32, rearPsiLoad: 34, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta — dado ainda escasso por ser lançamento recente.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'iCar EQ1', yearFrom: 2025, yearTo: null, component: 'Inspeção geral (freios, suspensão, pneus)', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 0 },
  { modelName: 'iCar EQ1', yearFrom: 2025, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 1 },
  { modelName: 'iCar EQ1', yearFrom: 2025, yearTo: null, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'iCar EQ1', yearFrom: 2025, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Caoa Chery iCar EQ1...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Caoa Chery', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Caoa Chery', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'iCar EQ1', brandId: brand.id } },
    update: {}, create: { name: 'iCar EQ1', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'iCar EQ1' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'iCar EQ1' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'iCar EQ1' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Caoa Chery iCar EQ1 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
