/**
 * Seed GWM Haval H9 — macetes, problemas, manutenção e calibragem
 * SUV grande 7 lugares de chassi robusto, motor 2.4 turbodiesel (184cv/
 * 49 kgfm), câmbio automático de 9 marchas — mesmo motor e câmbio da
 * picape Poer P30 (arquivo separado), peça e diagnóstico compartilhados.
 * Execute: pnpm --filter @motormacete/database db:seed:gwm-haval-h9
 *
 * Fontes: gruposentinela.com.br, autossegredos.com.br, cnnbrasil.com.br
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
    title: 'Mesmo motor/câmbio da Poer P30 — peça e diagnóstico compartilhados',
    body: 'O motor 2.4 turbodiesel e o câmbio automático de 9 marchas são os mesmos da picape Poer P30 da própria GWM. Para peça ou diagnóstico difícil de achar "para H9", busque também por "Poer P30" — mecânica de motor/câmbio praticamente idêntica.',
  },
  {
    severity: 'OK',
    title: 'Ajuste a expectativa de desempenho antes de comparar com concorrentes 2.8',
    body: 'O motor 2.4 (184cv/49 kgfm) entrega menos potência e torque que a geração atual de motores 2.8 turbodiesel usados por concorrentes diretos como Hilux SW4 (204cv/50,9 kgfm) — não é defeito, é a ficha técnica real do carro. Ajuste a expectativa de resposta em ultrapassagem e subida carregado antes de comprar, principalmente se for usar bastante com reboque ou carga pesada.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Modelo recente no Brasil — sem histórico de confiabilidade consolidado ainda',
    body: 'Por ser lançamento recente no Brasil, ainda não há grande volume de relato de longo prazo específico do H9. Acompanhe fóruns e grupos de proprietários à medida que a frota nacional cresce.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Haval H9 (2.4 turbodiesel)',
    body: '10.000-12.000 km — Troca de óleo do motor + filtro (siga o intervalo exato do manual, motor diesel moderno é sensível a atraso). | 15.000 km — Filtro de combustível diesel. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 60.000-80.000 km — Fluido do câmbio automático de 9 marchas. | Sempre — abasteça só em posto de confiança, diesel de má qualidade é o maior risco para motor common rail moderno.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Haval H9', yearFrom: 2026, yearTo: null, tireSize: '265/60 R18 (referência)', frontPsi: 32, rearPsi: 34, frontPsiLoad: 35, rearPsiLoad: 40, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta. Reforce a traseira com carga/reboque.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Haval H9', yearFrom: 2026, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 12000, intervalMonths: 12, notes: 'Motor diesel moderno — não atrase.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Haval H9', yearFrom: 2026, yearTo: null, component: 'Filtro de combustível diesel', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'Haval H9', yearFrom: 2026, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'Haval H9', yearFrom: 2026, yearTo: null, component: 'Fluido do câmbio automático (9 marchas)', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 3 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Haval H9', yearFrom: 2026, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed GWM Haval H9...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'GWM', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'GWM', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Haval H9', brandId: brand.id } },
    update: {}, create: { name: 'Haval H9', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Haval H9' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Haval H9' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Haval H9' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ GWM Haval H9 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
