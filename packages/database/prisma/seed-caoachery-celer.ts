/**
 * Seed Caoa Chery Celer — macetes, problemas, manutenção e calibragem
 * Hatch e sedan compacto (incl. versão "ACT" com start-stop), motor 1.5
 * 16V flex aspirado. Vendido no Brasil ~2013-2018, fase pré-fábrica
 * própria da CAOA.
 * Execute: pnpm --filter @motormacete/database db:seed:caoachery-celer
 *
 * Fontes: reclameaqui.com.br, car.blog.br
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
    title: 'Motor 1.5 16V aspirado: mecânica simples, sem turbo para se preocupar',
    body: 'Diferente dos Chery mais recentes (linha Tiggo/Arrizo atual, com motor turbo), o Celer usa motor 1.5 aspirado — mecânica mais simples, sem os cuidados extras que motor turbo exige (óleo de intervalo mais curto, atenção à turbina).',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Coxim (suporte) dianteiro do motor quebrado — problema crônico confirmado pela própria rede Chery',
    body: 'Quebra do coxim dianteiro do motor é queixa recorrente no Celer, a ponto de mecânicos da própria rede de concessionárias Chery confirmarem se tratar de um problema crônico do modelo. Sintoma: vibração/trepidação anormal do motor, principalmente em marcha lenta ou ao acelerar do zero. Se notar isso, vale já ir direto ao ponto e pedir inspeção específica do coxim dianteiro em vez de descrever só "vibração estranha".',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem na tampa do porta-malas e bolhas na pintura das portas',
    body: 'Há relatos de ferrugem aparecendo na tampa do porta-malas em prazo muito curto de uso, além de bolhas na pintura das portas — problema visto em mais de um exemplar, inclusive em unidades de concessionária. Inspecione esses pontos regularmente e trate qualquer sinal de bolha/ferrugem cedo, antes que avance pela chapa.',
  },
  {
    severity: 'WARN',
    title: 'Maçaneta interna da porta quebra com facilidade',
    body: 'Queixa recorrente de quebra da maçaneta interna da porta — peça relativamente barata de trocar (cerca de R$120 em concessionária na época), mas vale usar com cuidado e evitar puxar com força excessiva.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Celer (1.5 16V)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção do coxim dianteiro do motor (vibração anormal é o sintoma) e freios. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | Sempre — inspecione tampa do porta-malas e portas por sinal de bolha/ferrugem, tratando cedo se aparecer.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Celer', yearFrom: 2013, yearTo: 2018, tireSize: '185/65 R14 · 195/55 R15 (referência)', frontPsi: 30, rearPsi: 30, frontPsiLoad: 32, rearPsiLoad: 34, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Celer', yearFrom: 2013, yearTo: 2018, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Celer', yearFrom: 2013, yearTo: 2018, component: 'Inspeção do coxim dianteiro do motor', intervalKm: 20000, intervalMonths: null, notes: 'Problema crônico confirmado pela rede — vibração anormal é o sintoma.', priority: 'HIGH', order: 1 },
  { modelName: 'Celer', yearFrom: 2013, yearTo: 2018, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'Celer', yearFrom: 2013, yearTo: 2018, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Celer', yearFrom: 2013, yearTo: 2018, component: 'Inspeção de ferrugem (tampa do porta-malas/portas)', intervalKm: null, intervalMonths: 6, notes: null, priority: 'MEDIUM', order: 4 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Celer', yearFrom: 2013, yearTo: 2018, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Caoa Chery Celer...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Caoa Chery', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Caoa Chery', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Celer', brandId: brand.id } },
    update: {}, create: { name: 'Celer', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Celer' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Celer' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Celer' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Caoa Chery Celer concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
