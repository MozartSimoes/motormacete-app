/**
 * Seed Hyundai HB20X — macetes, problemas, manutenção e calibragem
 * Versão elevada/aventureira do HB20 hatch, lançada em 2013. Suspensão
 * mais alta (21,1cm de vão livre do solo, 51mm a mais que o HB20
 * convencional), molduras de para-lamas, barras de teto, rodas
 * exclusivas. Vendido SEMPRE com o motor 1.6 Gamma — nunca teve versão
 * 1.0. Mesma plataforma e boa parte da eletrônica do HB20/HB20S, então
 * vale considerar recalls e boletins técnicos desses "irmãos" também.
 * Execute: pnpm --filter @motormacete/database db:seed:hyundai-hb20x
 *
 * Fontes: karvi.com.br, autolivraria.com.br, hb20clube.com.br,
 *         minutoseguros.com.br, en.wikipedia.org (Hyundai HB20)
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
    title: 'Só existe com motor 1.6 — não procure versão 1.0 do HB20X',
    body: 'Diferente do HB20 hatch e do HB20S sedan (que têm versões 1.0), o HB20X sempre foi vendido exclusivamente com o motor 1.6 Gamma. Se um anúncio de HB20X 1.0 aparecer, desconfie — provavelmente é erro de anúncio ou adulteração de ficha técnica.',
  },
  {
    severity: 'OK',
    title: 'Mesma mecânica de base do HB20/HB20S: peça e boletim técnico se aplicam',
    body: 'O HB20X compartilha plataforma, motor e boa parte da eletrônica com o HB20 hatch e o HB20S sedan — as diferenças são suspensão mais alta e itens de visual (molduras, barras de teto, rodas). Para peça de motor/mecânica difícil de achar, ou para saber de recall/boletim técnico, busque também "HB20"/"HB20S", não só "HB20X".',
  },
  {
    severity: 'OK',
    title: '21,1 cm de vão livre do solo: melhor para lombada e buraco, mas não é 4x4',
    body: 'A suspensão mais alta (51mm a mais que o HB20 convencional) ajuda bastante com lombada, valeta e asfalto ruim — mas o HB20X continua sendo tração dianteira (FWD), não é 4x4 nem deve ser levado para terreno realmente pesado como se fosse SUV off-road.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Conjunto de molas e amortecedores traseiros — queixa relatada por proprietários',
    body: 'Alguns proprietários relatam problema no conjunto de molas e amortecedores traseiros. Se notar o carro "balançando" mais que o esperado após passar por buraco, ou ruído na traseira em piso irregular, vale inspecionar esse conjunto antes de rodar muito mais.',
  },
  {
    severity: 'WARN',
    title: 'Sensor/boia de combustível: falha recorrente relatada',
    body: 'Falha no sensor de combustível (boia) é queixa recorrente relatada por proprietários — sintoma típico é marcador de combustível impreciso (mostrando mais ou menos do que realmente tem no tanque). Não é item caro de trocar, mas vale não ignorar para não ficar sem combustível por engano confiando no marcador.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma HB20X (1.6)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e do conjunto de suspensão traseira (molas/amortecedores) — ponto de atenção conhecido desse modelo. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada/corrente (confirme especificação do motor 1.6 do seu ano) e fluido do câmbio automático (versões equipadas). | Sempre — verifique o marcador de combustível contra o valor real abastecido de vez em quando, para pegar cedo uma falha de sensor/boia.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'HB20X', yearFrom: 2013, yearTo: null, tireSize: '195/60 R16 (referência, rodas exclusivas)', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 35, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — pode variar entre gerações/versões.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'HB20X', yearFrom: 2013, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'HB20X', yearFrom: 2013, yearTo: null, component: 'Inspeção do conjunto de suspensão traseira (molas/amortecedores)', intervalKm: 20000, intervalMonths: null, notes: 'Ponto de atenção conhecido — queixa relatada por proprietários.', priority: 'HIGH', order: 1 },
  { modelName: 'HB20X', yearFrom: 2013, yearTo: null, component: 'Correia dentada/corrente', intervalKm: 60000, intervalMonths: 60, notes: 'Confirme especificação exata do motor 1.6 do seu ano.', priority: 'CRITICAL', order: 2 },
  { modelName: 'HB20X', yearFrom: 2013, yearTo: null, component: 'Fluido do câmbio automático (versões equipadas)', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'HB20X', yearFrom: 2013, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'HB20X', yearFrom: 2013, yearTo: null, component: 'Verificação do sensor/boia de combustível', intervalKm: null, intervalMonths: 12, notes: 'Falha recorrente relatada — compare marcador com volume real abastecido.', priority: 'MEDIUM', order: 5 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'HB20X', yearFrom: 2013, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Hyundai HB20X...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Hyundai', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Hyundai', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'HB20X', brandId: brand.id } },
    update: {}, create: { name: 'HB20X', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'HB20X' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'HB20X' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'HB20X' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Hyundai HB20X concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
