/**
 * Seed Audi Q8 e-tron — macetes, problemas, manutenção e calibragem
 * SUV 100% elétrico (e Sportback coupé-SUV), facelift/rebatismo do e-tron
 * original a partir de 2023, com bateria de maior capacidade. Foi, junto
 * com o Q8 Sportback e-tron, o único SUV 100% elétrico vendido pela Audi
 * no Brasil até a chegada do Q6 e-tron. Inclui "Launch Edition" e
 * "Performance Black".
 * Execute: pnpm --filter @motormacete/database db:seed:audi-q8-etron
 *
 * Fontes: conexaoautomotivabr.com, autopapo.com.br, canalve.com.br
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
    title: 'Sucessor direto do e-tron original — peça e conhecimento de oficina se aplicam dos dois lados',
    body: 'O Q8 e-tron é essencialmente o e-tron original com facelift e bateria maior, mesma plataforma MLB evo. Peça de suspensão, freio e carroceria costuma ser compatível — ao procurar peça ou informação técnica, busque também por "Audi e-tron" (sem o Q8), amplia bastante a busca.',
  },
  {
    severity: 'OK',
    title: 'Carregue entre 20-80% no uso diário para preservar a bateria',
    body: 'Reserve o carregamento até 100% só para viagens longas — no dia a dia, manter entre 20-80% prolonga a vida útil da bateria de alta tensão.',
  },
  {
    severity: 'OK',
    title: 'Foi o único SUV elétrico da Audi no Brasil por um tempo — rede de peças relativamente mais madura',
    body: 'Por ter sido, junto com a versão Sportback, o único SUV 100% elétrico vendido pela Audi no Brasil antes da chegada do Q6 e-tron, a concessionária brasileira já tem mais experiência acumulada com esse modelo que com os lançamentos mais recentes — vantagem prática na hora de agendar serviço.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Monitore alertas de bateria de alta tensão — mesmo histórico da geração anterior',
    body: 'Como na geração anterior (e-tron original), fique atento a qualquer alerta relacionado à bateria no painel ou comportamento de carga muito diferente do normal — leve à concessionária imediatamente se notar algo assim.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Q8 e-tron (elétrico)',
    body: '15.000-20.000 km ou anual — Inspeção geral (freios, suspensão, pneus, sistema de arrefecimento da bateria). | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT4. | Sempre — carregue entre 20-80% no uso diário. | Sempre — use o freio convencional de vez em quando para evitar oxidação do disco por baixo uso.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Q8 E-TRON', yearFrom: 2023, yearTo: null, tireSize: '255/55 R19 (padrão) — varia conforme roda/versão', frontPsi: 35, rearPsi: 38, frontPsiLoad: 38, rearPsiLoad: 42, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Sem estepe (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Q8 E-TRON', yearFrom: 2023, yearTo: null, component: 'Inspeção geral (freios, suspensão, pneus)', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 0 },
  { modelName: 'Q8 E-TRON', yearFrom: 2023, yearTo: null, component: 'Monitoramento de alertas de bateria de alta tensão', intervalKm: null, intervalMonths: 1, notes: null, priority: 'CRITICAL', order: 1 },
  { modelName: 'Q8 E-TRON', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Q8 E-TRON', yearFrom: 2023, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 3 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Q8 E-TRON', yearFrom: 2023, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Audi Q8 e-tron...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Q8 E-TRON', brandId: brand.id } },
    update: {}, create: { name: 'Q8 E-TRON', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Q8 E-TRON' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Q8 E-TRON' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Q8 E-TRON' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi Q8 e-tron concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
