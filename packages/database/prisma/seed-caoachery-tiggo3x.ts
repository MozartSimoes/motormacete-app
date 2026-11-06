/**
 * Seed Caoa Chery Tiggo 3X — macetes, problemas, manutenção e calibragem
 * SUV compacto de entrada da linha atual, motor 1.0 turbo flex, câmbio
 * automático CVT. Versões Plus e Pro. Lançado no Brasil como opção mais
 * acessível abaixo do Tiggo 5X.
 * Execute: pnpm --filter @motormacete/database db:seed:caoachery-tiggo3x
 *
 * Fontes: gruposentinela.com.br, mobiauto.com.br, vrum.com.br
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
    title: 'Motor 1.0 turbo: menor da linha Tiggo — óleo de qualidade é ainda mais importante',
    body: 'O motor 1.0 turbo do Tiggo 3X é o menor turbo da linha Chery no Brasil — motores pequenos turbinados trabalham em rotação/pressão relativamente altas para o tamanho, então óleo de qualidade e troca em dia protegem ainda mais que num motor maior aspirado.',
  },
  {
    severity: 'OK',
    title: 'Câmbio CVT: evite "pisar fundo" repetidamente logo após ligar o carro frio',
    body: 'Como em qualquer CVT, evite acelerações bruscas com o motor/câmbio ainda frios (primeiros minutos após ligar) — isso reduz o desgaste da correia/polias do câmbio a longo prazo.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Modelo mais recente da linha — poucos relatos de longo prazo ainda disponíveis',
    body: 'Por ser um lançamento mais recente comparado a Tiggo 5X/7/8, ainda há menos relato consolidado de problema de longo prazo no Brasil. Acompanhe fóruns e grupos de proprietários à medida que a frota nacional envelhece.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tiggo 3X (1.0 turbo)',
    body: '10.000 km — Troca de óleo do motor + filtro (motor pequeno turbo, não atrase). | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT4. | 60.000 km — Óleo do câmbio CVT — não é vitalício.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Tiggo 3X', yearFrom: 2021, yearTo: null, tireSize: '205/60 R16 · 215/55 R17 (referência)', frontPsi: 29, rearPsi: 29, frontPsiLoad: 32, rearPsiLoad: 34, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Tiggo 3X', yearFrom: 2021, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor pequeno turbo — não atrase.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Tiggo 3X', yearFrom: 2021, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 1 },
  { modelName: 'Tiggo 3X', yearFrom: 2021, yearTo: null, component: 'Fluido de freio DOT4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Tiggo 3X', yearFrom: 2021, yearTo: null, component: 'Óleo do câmbio CVT', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 3 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Tiggo 3X', yearFrom: 2021, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Caoa Chery Tiggo 3X...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Caoa Chery', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Caoa Chery', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Tiggo 3X', brandId: brand.id } },
    update: {}, create: { name: 'Tiggo 3X', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Tiggo 3X' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Tiggo 3X' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Tiggo 3X' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Caoa Chery Tiggo 3X concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
