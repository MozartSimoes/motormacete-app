/**
 * Seed Audi SQ6 Sportback e-tron — macetes, problemas, manutenção
 * Versão de alta performance do Q6 e-tron (mesma plataforma PPE 800V),
 * carroceria Sportback (teto mais baixo/esportivo), motor duplo com mais
 * potência que a versão Performance padrão. Lançado no Brasil junto com o
 * Q6 e-tron em 2026.
 * Execute: pnpm --filter @motormacete/database db:seed:audi-sq6-etron
 *
 * Fontes: audi-imprensa.com.br (release oficial)
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
    title: 'Mesma base do Q6 e-tron — plataforma PPE 800V, peça/diagnóstico compartilhados',
    body: 'O SQ6 Sportback e-tron usa a mesma plataforma PPE (800V) e boa parte da eletrônica do Q6 e-tron padrão, com motor duplo mais potente e freios maiores. Para peça ou informação técnica difícil de achar "para SQ6", busque também por "Q6 e-tron" — mecânica de base é a mesma.',
  },
  {
    severity: 'OK',
    title: 'Carroceria Sportback: teto mais baixo, cuide com a cabeça ao entrar/sair',
    body: 'O corte de teto esportivo da carroceria Sportback reduz um pouco o espaço de cabeça nos bancos traseiros comparado ao Q6 e-tron de teto normal — não é defeito, é característica de design, vale considerar antes de comprar se transporta passageiros altos com frequência atrás.',
  },
  {
    severity: 'OK',
    title: 'Arquitetura 800V permite carga DC rápida — aproveite carregadores de alta potência',
    body: 'Assim como o Q6 e-tron, a arquitetura 800V permite recarga DC bem mais rápida que carros de 400V — procure carregadores de alta potência para aproveitar de verdade essa vantagem.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Lançamento muito recente — sem histórico de confiabilidade local ainda',
    body: 'Por ser lançamento de 2026 no Brasil, ainda não há relato consistente de problema de uso real no país. Acompanhe grupos e fóruns de proprietários à medida que a frota nacional cresce.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SQ6 Sportback e-tron (elétrico, plataforma PPE)',
    body: '15.000-20.000 km ou anual — Inspeção geral (freios de alta performance, suspensão, pneus, sistema de arrefecimento da bateria/eletrônica de 800V). | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT4 (uso esportivo frequente pode exigir antecipação). | Sempre — carregue entre 20-80% no uso diário. | Sempre — pneu de alto desempenho desgasta mais rápido em uso esportivo, rodízio mais frequente ajuda.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'SQ6 Sportback E-Tron', yearFrom: 2026, yearTo: null, tireSize: '265/45 R21 (padrão) — varia conforme roda', frontPsi: 35, rearPsi: 38, frontPsiLoad: 39, rearPsiLoad: 42, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Sem estepe (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'SQ6 Sportback E-Tron', yearFrom: 2026, yearTo: null, component: 'Inspeção geral (freios de alta performance, suspensão, pneus)', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 0 },
  { modelName: 'SQ6 Sportback E-Tron', yearFrom: 2026, yearTo: null, component: 'Fluido de freio DOT4', intervalKm: 40000, intervalMonths: 24, notes: 'Antecipe se usar o carro com frequência em modo esportivo.', priority: 'HIGH', order: 1 },
  { modelName: 'SQ6 Sportback E-Tron', yearFrom: 2026, yearTo: null, component: 'Rodízio de pneus', intervalKm: 8000, intervalMonths: null, notes: 'Pneu de alto desempenho desgasta mais rápido em uso esportivo.', priority: 'MEDIUM', order: 2 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'SQ6 Sportback E-Tron', yearFrom: 2026, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Audi SQ6 Sportback e-tron...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'SQ6 Sportback E-Tron', brandId: brand.id } },
    update: {}, create: { name: 'SQ6 Sportback E-Tron', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'SQ6 Sportback E-Tron' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'SQ6 Sportback E-Tron' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'SQ6 Sportback E-Tron' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi SQ6 Sportback e-tron concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
