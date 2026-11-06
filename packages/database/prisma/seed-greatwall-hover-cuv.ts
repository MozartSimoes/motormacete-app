/**
 * Seed Great Wall Hover CUV — macetes, problemas, manutenção e calibragem
 * SUV médio importado, fase antiga da marca no Brasil (~2008-2012, antes
 * do rebatismo GWM/Haval), trazido pela primeira concessionária/
 * importadora oficial (Alexandros Motors). Motor 2.4 16V a gasolina de
 * origem Mitsubishi (138cv/190Nm), o mesmo bloco usado em diversos
 * SUVs/picapes chineses da época — motor amplamente disseminado, não
 * exclusivo da Great Wall. NOTA: na FIPE/no banco, "Great Wall" é uma
 * marca separada de "GWM" (a marca atual) — mesma origem histórica, mas
 * cadastro diferente.
 * Execute: pnpm --filter @motormacete/database db:seed:greatwall-hover-cuv
 *
 * Fontes: checkcarro.com, auto-doc, opinautos.com, autoentusiastasclassic.com.br
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
    title: 'Motor é o mesmo bloco Mitsubishi 2.4 usado em vários SUVs/picapes chineses da época',
    body: 'O motor 2.4 16V a gasolina do Hover CUV é um projeto Mitsubishi amplamente licenciado e usado em diversos SUVs e picapes chineses da mesma geração — para peça de motor difícil de achar "para Great Wall", busque também por "motor Mitsubishi 2.4 16V" genérico, amplia bastante a busca em oficinas que nunca trabalharam com a marca especificamente.',
  },
  {
    severity: 'WARN',
    title: 'Peça de carroceria/acabamento e assistência dependem de importador — pesquise antes de comprar',
    body: 'Por ser um importado de marca já sem operação ativa no Brasil sob esse nome, peça específica de carroceria e acabamento pode ser difícil de achar fora de desmanche/importação direta. Antes de comprar um exemplar usado, pesquise bem a disponibilidade de peça na sua região.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Relatos de problema elétrico geral, incluindo ECU e sistema 4x4',
    body: 'Há relatos diversos de problema elétrico nesse modelo, incluindo unidade de controle do motor (ECU) e sistema de tração 4x4. Se for comprar um exemplar usado, teste bem o funcionamento do 4x4 e observe qualquer luz de alerta persistente no painel antes de fechar negócio.',
  },
  {
    severity: 'WARN',
    title: 'Confiabilidade geral é ponto de atenção — inspecione bem antes de comprar',
    body: 'Relatos apontam preocupação com confiabilidade de longo prazo desse modelo, típico de importado de marca ainda estabelecendo presença no mercado brasileiro na época. Vale contratar uma inspeção veicular independente antes de fechar a compra de um exemplar usado, mais que em marcas já consolidadas.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Hover CUV (2.4 16V)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, sistema elétrico e sistema 4x4. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada (motor interferente — confirme o intervalo exato com especialista em motor Mitsubishi 2.4, já que a peça é a mesma usada em outros modelos).',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Hover CUV', yearFrom: 2008, yearTo: 2012, tireSize: '235/70 R16 (referência)', frontPsi: 30, rearPsi: 32, frontPsiLoad: 32, rearPsiLoad: 38, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta ou manual do proprietário do exemplar específico.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Hover CUV', yearFrom: 2008, yearTo: 2012, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Hover CUV', yearFrom: 2008, yearTo: 2012, component: 'Inspeção do sistema elétrico e 4x4', intervalKm: 10000, intervalMonths: null, notes: 'Relatos recorrentes de problema em ECU e tração integral.', priority: 'HIGH', order: 1 },
  { modelName: 'Hover CUV', yearFrom: 2008, yearTo: 2012, component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: 'Motor interferente, mesmo bloco Mitsubishi 2.4 usado em outros SUVs chineses da época.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Hover CUV', yearFrom: 2008, yearTo: 2012, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Hover CUV', yearFrom: 2008, yearTo: 2012, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Great Wall Hover CUV...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Great Wall', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Great Wall', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Hover CUV', brandId: brand.id } },
    update: {}, create: { name: 'Hover CUV', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Hover CUV' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Hover CUV' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Hover CUV' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Great Wall Hover CUV concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
