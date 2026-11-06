/**
 * Seed Caoa Chery QQ — macetes, problemas, manutenção e calibragem
 * City car de entrada, um dos primeiros Chery vendidos no Brasil
 * (~2011-2018), motor 1.0/1.1 aspirado. Fase inicial da marca no país,
 * antes da fábrica própria da CAOA — peça e rede de assistência da época
 * eram mais escassas que hoje.
 * Execute: pnpm --filter @motormacete/database db:seed:caoachery-qq
 *
 * Fontes: reclameaqui.com.br, carroclub.com.br, car.blog.br
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
    severity: 'WARN',
    title: 'Peça de reposição escassa — pesquise disponibilidade antes de fechar compra',
    body: 'Por ser um modelo de fase inicial da Chery no Brasil (antes da fábrica própria da CAOA), peça de carroceria e acabamento específica é mais difícil de achar e pode exigir encomenda — há relatos de orçamento de peça passando de R$ 7.000. Antes de comprar um QQ usado, pesquise disponibilidade de peça da sua região, não só o preço do carro.',
  },
  {
    severity: 'OK',
    title: 'Peça importada paralela pode custar uma fração do preço de concessionária',
    body: 'Item simples como motor do limpador de para-brisa chegou a ser cotado por mais de R$ 800 em concessionária, enquanto o mesmo item é encontrado por valor bem menor em sites de importação direta. Antes de aceitar orçamento de concessionária para peça não relacionada à segurança, vale pesquisar alternativa de importação ou desmanche.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Trinca crônica no flange de combustível',
    body: 'Trinca no flange (conexão) do sistema de combustível é queixa recorrente e considerada praticamente crônica nesse modelo. Fique atento a cheiro de combustível ou manchas no chão embaixo do tanque — não é normal e deve ser levado à oficina antes que vire risco maior.',
  },
  {
    severity: 'WARN',
    title: 'Caixa de direção e suspensão — queixas recorrentes sem solução definitiva relatada por vários donos',
    body: 'Múltiplos proprietários relatam problema recorrente na caixa de direção e na suspensão sem solução definitiva, mesmo após passagens pela concessionária. Se notar folga ou ruído na direção, documente bem o problema e insista no diagnóstico — é queixa conhecida o suficiente para não aceitar "não achamos nada" como resposta final.',
  },
  {
    severity: 'WARN',
    title: 'Distância ao solo baixa — cuidado com rampas de garagem e lombadas',
    body: 'A altura livre do solo é relativamente baixa para um hatch de entrada, gerando queixas de para-choque raspando em rampa de garagem e lombada. Reduza bastante a velocidade nessas situações e, se possível, aborde rampas de garagem em diagonal para reduzir o risco de raspar.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão/ferrugem prematura em alguns exemplares',
    body: 'Há relatos de ferrugem aparecendo de forma prematura em alguns exemplares. Lave o carro regularmente (principalmente embaixo, em região litorânea ou de estrada com sal/produto químico) e trate qualquer ponto de corrosão assim que notar, antes que se espalhe pela chapa.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma QQ (1.0/1.1)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão e caixa de direção (pontos de queixa conhecidos). | 10.000 km — Verificação do flange de combustível (trinca crônica documentada). | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | Sempre — lave o carro regularmente por baixo para prevenir corrosão prematura.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'QQ', yearFrom: 2011, yearTo: 2018, tireSize: '165/70 R13 · 175/65 R14 (referência)', frontPsi: 28, rearPsi: 28, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'QQ', yearFrom: 2011, yearTo: 2018, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'QQ', yearFrom: 2011, yearTo: 2018, component: 'Verificação do flange de combustível', intervalKm: 10000, intervalMonths: null, notes: 'Trinca crônica documentada — verifique cheiro de combustível/manchas no chão.', priority: 'HIGH', order: 1 },
  { modelName: 'QQ', yearFrom: 2011, yearTo: 2018, component: 'Inspeção de direção e suspensão', intervalKm: 10000, intervalMonths: null, notes: 'Ponto de queixa recorrente entre proprietários.', priority: 'MEDIUM', order: 2 },
  { modelName: 'QQ', yearFrom: 2011, yearTo: 2018, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'QQ', yearFrom: 2011, yearTo: 2018, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 4 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'QQ', yearFrom: 2011, yearTo: 2018, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Caoa Chery QQ...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Caoa Chery', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Caoa Chery', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'QQ', brandId: brand.id } },
    update: {}, create: { name: 'QQ', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'QQ' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'QQ' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'QQ' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Caoa Chery QQ concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
