/**
 * Seed Audi RS Q8 — macetes, problemas, manutenção e calibragem de pneus
 * SUV grande super-esportivo, mesma plataforma do RS6/RS7 (V8 4.0 TFSI
 * biturbo com mild hybrid 48V), câmbio tiptronic, tração Quattro, suspensão
 * a ar de série e freio cerâmico de série. Geração atual (desde ~2020 no
 * Brasil), inclui a versão "Performance" mais recente.
 * Execute: pnpm --filter @motormacete/database db:seed:audi-rsq8
 *
 * Fontes: mercadolivre.com.br/blog, gazetadopovo.com.br, comprecar.com.br
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
    title: 'Motor compartilhado com RS6 e RS7 — peça e diagnóstico intercambiáveis',
    body: 'O V8 4.0 TFSI mild hybrid é o mesmo do RS6 Avant e do RS7. Para peça ou diagnóstico difícil de achar "para RS Q8", busque também por esses dois modelos — mecânica de motor praticamente idêntica.',
  },
  {
    severity: 'OK',
    title: 'Freio cerâmico de série: durabilidade maior, mas troca é cara',
    body: 'O RS Q8 vem com freio cerâmico de série, que dura mais que o freio de aço convencional em uso normal — mas quando chega a hora de trocar, o custo é significativamente maior. Evite frenagens bruscas desnecessárias em uso urbano, isso estende a vida útil do disco cerâmico e adia esse custo.',
  },
  {
    severity: 'WARN',
    title: 'É o mais pesado e mais caro de manter da linha RS — pesquise custo antes de comprar',
    body: 'Por ser um SUV grande com motor de altíssima performance, o custo de manutenção do RS Q8 tende a ser o mais alto entre os modelos RS da Audi — pneu, freio e peça de suspensão a ar em maior porte custam mais que nos irmãos sedan/perua (RS6/RS7). Pesquise o custo real de manutenção na sua região antes de fechar negócio.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão a ar: fique atento à altura em repouso',
    body: 'Mudança perceptível na altura do carro parado é sinal precoce de vazamento no sistema de suspensão pneumática — em um SUV desse porte, o conserto do sistema completo é caro. Resolver cedo, ao primeiro sinal, é bem mais barato que esperar o sistema falhar por completo.',
  },
  {
    severity: 'WARN',
    title: 'Acúmulo de carbono nas válvulas de admissão',
    body: 'Motor de injeção direta pura — acúmulo de carbono nas válvulas de admissão é característica conhecida dessa família de motor V8 TFSI, com sintoma de marcha lenta irregular ao longo do tempo. Limpeza preventiva entre 80.000-100.000 km evita que avance a ponto de precisar remoção do motor.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma RS Q8 (V8 4.0 TFSI mild hybrid)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios (cerâmico), suspensão a ar e níveis de fluido. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT4. | 60.000-80.000 km — Fluido do câmbio tiptronic. | 80.000-100.000 km — Limpeza preventiva de carbono nas válvulas de admissão. | Sempre — observe a altura da suspensão a ar em repouso, sinal precoce de vazamento.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'RS Q8', yearFrom: 2020, yearTo: null, tireSize: '285/40 R22 (padrão) — varia conforme roda/versão Performance', frontPsi: 35, rearPsi: 35, frontPsiLoad: 41, rearPsiLoad: 41, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Sem estepe (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'RS Q8', yearFrom: 2020, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'RS Q8', yearFrom: 2020, yearTo: null, component: 'Inspeção da suspensão a ar (altura em repouso)', intervalKm: null, intervalMonths: 6, notes: 'Vazamento pneumático é caro de corrigir tarde nesse SUV grande — resolva ao primeiro sinal.', priority: 'HIGH', order: 1 },
  { modelName: 'RS Q8', yearFrom: 2020, yearTo: null, component: 'Inspeção do freio cerâmico', intervalKm: 10000, intervalMonths: null, notes: 'Durabilidade maior que o freio de aço, mas custo de reposição alto — inspecione regularmente.', priority: 'MEDIUM', order: 2 },
  { modelName: 'RS Q8', yearFrom: 2020, yearTo: null, component: 'Limpeza de carbono nas válvulas de admissão', intervalKm: 90000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'RS Q8', yearFrom: 2020, yearTo: null, component: 'Fluido do câmbio tiptronic', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 4 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'RS Q8', yearFrom: 2020, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Audi RS Q8...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'RS Q8', brandId: brand.id } },
    update: {}, create: { name: 'RS Q8', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'RS Q8' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'RS Q8' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'RS Q8' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi RS Q8 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
