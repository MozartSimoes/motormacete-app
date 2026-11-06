/**
 * Seed Audi RS Q3 — macetes, problemas, manutenção e calibragem de pneus
 * SUV compacto esportivo (versão normal e Sportback/coupé), mesmo motor 2.5
 * TFSI 5 cilindros do RS3, tração Quattro, câmbio S-tronic. Geração atual
 * (desde ~2020 no Brasil).
 * Execute: pnpm --filter @motormacete/database db:seed:audi-rsq3
 *
 * Fontes: carsguide.com.au, mycarly.com, auto-doc.pt
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
    title: 'Mesmo motor do RS3 — peça e histórico de problema compartilhados',
    body: 'O RS Q3 usa o mesmo bloco 2.5 TFSI 5 cilindros do RS3. Para peça de motor difícil de achar, busque também "para RS3/TT RS" — mesma compatibilidade mecânica na maior parte do motor.',
  },
  {
    severity: 'WARN',
    title: 'Óleo de qualidade a cada 10.000 km reduz risco do tensionador de corrente',
    body: 'Assim como no RS3, o tensionador da corrente de distribuição desse motor tem histórico de falha entre 80.000-120.000 km em uso internacional. Troca de óleo mais frequente que o padrão genérico (a cada 10.000 km, óleo de alta qualidade) é a principal prevenção.',
  },
  {
    severity: 'OK',
    title: 'SUV alto + motor esportivo: pneu de alto desempenho tem vida útil menor',
    body: 'Por ser um SUV mais pesado com motor de alta performance, o desgaste de pneu tende a ser mais rápido que num RS3 equivalente. Rodízio frequente e verificação de alinhamento ajudam a não perder a vida útil do pneu de alto desempenho antes da hora.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Tensionador de corrente — mesmo alerta do motor 2.5 TFSI do RS3',
    body: 'Perda de potência progressiva, consumo alto ou ruído metálico atípico do motor merecem diagnóstico imediato — é o mesmo padrão de falha de tensionador de corrente documentado no motor 2.5 TFSI. Não é exclusivo de nenhuma carroceria, é característica do motor.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo por desgaste de anel de pistão',
    body: 'Verifique o nível de óleo entre trocas — consumo acima do esperado é queixa conhecida desse motor de injeção direta, mesmo sem vazamento visível.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma RS Q3 (2.5 TFSI)',
    body: '10.000 km — Troca de óleo do motor + filtro (óleo de alta qualidade). | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT4. | 60.000 km — Velas de ignição. | 60.000 km — Inspeção da corrente de distribuição/tensionador. | 60.000-80.000 km — Fluido do câmbio S-tronic.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'RS Q3', yearFrom: 2020, yearTo: null, tireSize: '235/40 R20 (padrão) — varia conforme roda/versão', frontPsi: 32, rearPsi: 32, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: null, notes: 'Confirme sempre na etiqueta da coluna da porta. Sem estepe na maioria das versões (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'RS Q3', yearFrom: 2020, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Óleo de alta qualidade reduz risco do problema conhecido de tensionador de corrente.', priority: 'CRITICAL', order: 0 },
  { modelName: 'RS Q3', yearFrom: 2020, yearTo: null, component: 'Inspeção da corrente de distribuição/tensionador', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'RS Q3', yearFrom: 2020, yearTo: null, component: 'Fluido do câmbio S-tronic', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'RS Q3', yearFrom: 2020, yearTo: null, component: 'Fluido de freio DOT4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'RS Q3', yearFrom: 2020, yearTo: null, component: 'Rodízio de pneus', intervalKm: 8000, intervalMonths: null, notes: 'Pneu de alto desempenho desgasta mais rápido no SUV que no RS3 equivalente.', priority: 'MEDIUM', order: 4 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'RS Q3', yearFrom: 2020, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Audi RS Q3...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'RS Q3', brandId: brand.id } },
    update: {}, create: { name: 'RS Q3', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'RS Q3' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'RS Q3' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'RS Q3' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi RS Q3 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
