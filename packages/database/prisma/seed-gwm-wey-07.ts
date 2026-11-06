/**
 * Seed GWM Wey 07 — macetes, problemas, manutenção e calibragem
 * SUV híbrido plug-in de luxo, sub-marca premium Wey, 6 lugares, motor
 * 1.5 turbo a gasolina + 2 motores elétricos (câmbio DHT), bateria 42,5
 * kWh, ~128 km de autonomia elétrica homologada no Brasil, tração
 * integral, 517cv de potência combinada.
 * Execute: pnpm --filter @motormacete/database db:seed:gwm-wey-07
 *
 * Fontes: mecanicaoffroad.com.br, canalve.com.br, gwmmotors.com.br,
 *         oantagonista.com.br
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
    title: 'Use o modo elétrico no dia a dia urbano — os 128 km de autonomia cobrem a maioria dos trajetos diários',
    body: 'Com ~128 km de autonomia elétrica homologada, a maioria dos deslocamentos urbanos diários cabe inteiramente no modo elétrico — carregue durante a noite (carga AC residencial leva 6-7h) e economize combustível na prática, reservando o motor 1.5 turbo para viagens mais longas.',
  },
  {
    severity: 'OK',
    title: 'Carregamento DC rápido: 30% a 80% em 20-30 minutos',
    body: 'Em carregador DC rápido (~60 kW), a bateria de 42,5 kWh vai de 30% a 80% em 20-30 minutos — útil para complementar carga em viagem sem precisar esperar uma carga AC completa.',
  },
  {
    severity: 'OK',
    title: 'SUV de luxo pesado: pneu de alto desempenho tem vida útil menor',
    body: 'Com 517cv de potência combinada e peso elevado (bateria + dois motores elétricos + motor a combustão), o desgaste de pneu tende a ser mais rápido que num SUV convencional equivalente — rodízio frequente ajuda a não perder a vida útil do pneu antes da hora.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Modelo recente e de baixo volume — sem histórico de confiabilidade consolidado ainda',
    body: 'Por ser lançamento recente da sub-marca premium Wey no Brasil, de volume relativamente baixo, ainda não há grande volume de relato de longo prazo específico. Acompanhe fóruns e grupos de proprietários à medida que a frota nacional cresce.',
  },
  {
    severity: 'WARN',
    title: 'Rede de assistência especializada em PHEV de luxo ainda em formação',
    body: 'Para qualquer serviço relacionado ao sistema híbrido plug-in ou à eletrônica de alta tensão, priorize a concessionária — a experiência de oficinas independentes com esse sistema específico ainda é limitada no Brasil.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Wey 07 (PHEV)',
    body: '10.000-12.000 km — Troca de óleo do motor 1.5 turbo + filtro. | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | Sempre — carregue entre 20-80% no uso diário para preservar a bateria de 42,5 kWh. | Sempre — use o freio convencional de vez em quando mesmo com a regenerativa ativa, evita oxidação do disco por baixo uso.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Wey 07', yearFrom: 2025, yearTo: null, tireSize: '245/45 R21 (padrão) — varia conforme roda', frontPsi: 34, rearPsi: 36, frontPsiLoad: 38, rearPsiLoad: 41, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. SUV pesado — pressão correta é ainda mais importante.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Wey 07', yearFrom: 2025, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 12000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Wey 07', yearFrom: 2025, yearTo: null, component: 'Inspeção de freios e suspensão', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'Wey 07', yearFrom: 2025, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'Wey 07', yearFrom: 2025, yearTo: null, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Wey 07', yearFrom: 2025, yearTo: null, component: 'Rodízio de pneus', intervalKm: 8000, intervalMonths: null, notes: 'Pneu de alto desempenho desgasta mais rápido nesse SUV pesado.', priority: 'MEDIUM', order: 4 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Wey 07', yearFrom: 2025, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed GWM Wey 07...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'GWM', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'GWM', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Wey 07', brandId: brand.id } },
    update: {}, create: { name: 'Wey 07', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Wey 07' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Wey 07' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Wey 07' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ GWM Wey 07 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
