/**
 * Seed Caoa Chery Tiggo 2 — macetes, problemas, manutenção e calibragem
 * SUV compacto, motor 1.5 16V flex aspirado (Acteco), câmbio manual ou
 * automático CVT. No Brasil desde 2018, primeiro Chery já fabricado pela
 * CAOA no país. Versões ACT/EX/Look/SMILE.
 * NOTA: modelName "Tiggo 2" pode, por casamento de palavra, também
 * aparecer combinado com o antigo "Tiggo 2.0" (SUV maior anterior, motor
 * 2.0, arquivo separado) — são carros mecanicamente diferentes.
 * Execute: pnpm --filter @motormacete/database db:seed:caoachery-tiggo2
 *
 * Fontes: mobiauto.com.br, motoragora.com.br
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
    title: 'Primeiro Chery fabricado no Brasil pela CAOA — peça já mais fácil que os modelos importados antigos',
    body: 'Ao contrário do QQ/Celer/Face/Cielo/Tiggo original (fase de importação), o Tiggo 2 já é fabricado pela CAOA no Brasil — rede de peça e assistência bem mais madura e acessível que a dos modelos da fase anterior da marca.',
  },
  {
    severity: 'WARN',
    title: 'Unidades 2018/2019: fique atento a sintomas do motor logo nos primeiros anos',
    body: 'Exemplares dos primeiros anos de produção (2018-2019) concentram mais queixas de motor que os posteriores — se for comprar um desses anos específicos, vale testar bem o carro parado no sinal e em trecho mais longo antes de fechar negócio.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor morrendo no semáforo ou desligando em movimento (unidades 2018/2019)',
    body: 'Proprietários de exemplares 2018/2019 relatam o motor 1.5 flex morrendo toda vez que o carro para no semáforo, ou até desligando subitamente durante uma viagem — em alguns casos acompanhado de ruído incomum no conjunto mecânico. Se seu carro é desses anos e apresenta esse padrão, não normalize o comportamento: agende diagnóstico o quanto antes, desligar em movimento é risco real de segurança.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático: dificuldade para engatar D ou R',
    body: 'Unidades com câmbio automático têm queixas de falha de funcionamento e dificuldade para engatar Drive ou Ré. Se notar demora ou resistência ao engatar marcha, não force repetidamente — agende diagnóstico, forçar pode piorar o desgaste do mecanismo de engate.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tiggo 2 (1.5 16V)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Óleo do câmbio (manual ou automático) — antecipe se notar dificuldade de engate. | Sempre — motor desligando sozinho (unidades 2018/2019) exige diagnóstico imediato, não é comportamento normal.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Tiggo 2', yearFrom: 2018, yearTo: null, tireSize: '205/60 R16 (referência)', frontPsi: 29, rearPsi: 29, frontPsiLoad: 32, rearPsiLoad: 34, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Tiggo 2', yearFrom: 2018, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Tiggo 2', yearFrom: 2018, yearTo: null, component: 'Inspeção de motor (desligamento inesperado)', intervalKm: null, intervalMonths: 6, notes: 'Sintoma documentado em unidades 2018/2019 — não é normal.', priority: 'HIGH', order: 1 },
  { modelName: 'Tiggo 2', yearFrom: 2018, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'Tiggo 2', yearFrom: 2018, yearTo: null, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Tiggo 2', yearFrom: 2018, yearTo: null, component: 'Óleo do câmbio', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar dificuldade de engate em D/R.', priority: 'HIGH', order: 4 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Tiggo 2', yearFrom: 2018, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Caoa Chery Tiggo 2...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Caoa Chery', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Caoa Chery', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Tiggo 2', brandId: brand.id } },
    update: {}, create: { name: 'Tiggo 2', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Tiggo 2' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Tiggo 2' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Tiggo 2' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Caoa Chery Tiggo 2 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
