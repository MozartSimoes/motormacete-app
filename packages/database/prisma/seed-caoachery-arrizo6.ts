/**
 * Seed Caoa Chery Arrizo 6 — macetes, problemas, manutenção e calibragem
 * Sedan médio, geração atual. Versão GSX (1.5 Turbo Flex convencional) e
 * linha PRO/PRO Max Drive (híbrida, motor 1.5 Turbo + sistema híbrido).
 * Execute: pnpm --filter @motormacete/database db:seed:caoachery-arrizo6
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
    title: 'Versão híbrida (PRO): não espere autonomia elétrica de um plug-in',
    body: 'A versão híbrida do Arrizo 6 PRO é um sistema focado em economia e resposta do motor 1.5 turbo, não um plug-in com autonomia elétrica relevante — o ganho principal é economia de combustível em uso urbano, não rodar quilômetros só na bateria.',
  },
  {
    severity: 'WARN',
    title: 'Mesmo motor 1.5 Turbo de outros modelos da marca — óleo em dia é ainda mais importante',
    body: 'O motor 1.5 turbo dessa geração é aparentado da mesma família usada em Tiggo 5X/7 e Arrizo 5 — histórico de recall por desgaste de balancim em versões anteriores reforça a importância de nunca atrasar a troca de óleo nesse motor.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Modelo mais recente da linha — poucos relatos de longo prazo ainda disponíveis',
    body: 'Por ser lançamento mais recente, ainda há menos relato consolidado de problema de longo prazo no Brasil comparado a modelos como o Tiggo 5X. Acompanhe fóruns e grupos de proprietários à medida que a frota nacional envelhece.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Arrizo 6 (1.5 Turbo / híbrido)',
    body: '10.000 km — Troca de óleo do motor + filtro (motor turbo, não atrase). | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT4. | 60.000 km — Óleo do câmbio automático. | Versão híbrida — se notar qualquer luz de falha no sistema híbrido, pare em local seguro e acione a concessionária.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Arrizo 6', yearFrom: 2022, yearTo: null, tireSize: '215/50 R17 (referência)', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 35, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Arrizo 6', yearFrom: 2022, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor turbo — não atrase.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Arrizo 6', yearFrom: 2022, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 1 },
  { modelName: 'Arrizo 6', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Arrizo 6', yearFrom: 2022, yearTo: null, component: 'Óleo do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 3 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Arrizo 6', yearFrom: 2022, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Caoa Chery Arrizo 6...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Caoa Chery', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Caoa Chery', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Arrizo 6', brandId: brand.id } },
    update: {}, create: { name: 'Arrizo 6', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Arrizo 6' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Arrizo 6' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Arrizo 6' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Caoa Chery Arrizo 6 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
