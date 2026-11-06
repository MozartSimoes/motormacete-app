/**
 * Seed Mitsubishi Pajero iO — macetes, problemas, manutenção e calibragem
 * SUV compacto de entrada da linha Pajero, vendido no Brasil ~1999-2006,
 * motor 1.8 16V gasolina, tração 4x4, câmbio manual ou automático,
 * plataforma bem mais simples e menor que o Pajero clássico. Fonte de
 * problemas específicos é escassa (modelo de baixo volume e já antigo) —
 * conteúdo mantido honesto e mais genérico onde faltou confirmação.
 * ATENÇÃO — colisão de nome: por causa da palavra "Pajero" compartilhada,
 * o arquivo do Pajero clássico pode aparecer também aqui — mecânica é
 * completamente diferente, desconsidere qualquer menção a diesel/Super
 * Select 4WD/motor 3.2 como não aplicável ao iO.
 * Execute: pnpm --filter @motormacete/database db:seed:mitsubishi-pajero-io
 *
 * Fontes: 4x4brasil.com.br, icarros.com.br, carrosnaweb.com.br,
 *         amantesdecarros.com.br
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
    title: 'Mecânica simples e considerada durável — bom carro de entrada 4x4',
    body: 'O Pajero iO tem reputação de durabilidade mesmo com uso em trilha/terreno irregular, com mecânica mais simples que os Pajero maiores — motor 1.8 16V sem a complexidade de um turbodiesel. Para quem quer 4x4 compacto e mecanicamente simples de manter, é uma opção historicamente bem avaliada.',
  },
  {
    severity: 'WARN',
    title: 'Modelo antigo e de baixo volume — pesquise peça antes de comprar',
    body: 'Por ser um modelo descontinuado há quase 20 anos e de volume de vendas relativamente baixo no Brasil, peça específica de carroceria/acabamento pode ser mais difícil de achar que em modelos de maior volume da época. Peça de motor/mecânica básica (compartilhada com outros 1.8 16V da época) costuma ser mais fácil.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Exemplar de baixa quilometragem anual: atenção a borracha ressecada e vazamento',
    body: 'Como a maioria dos exemplares hoje tem mais de 20 anos, o risco maior não é desgaste mecânico por uso, é degradação por idade — mangueiras, borrachas de vedação e juntas ressecadas são a causa mais provável de vazamento pequeno de óleo/fluido. Inspeção visual regular embaixo do carro ajuda a pegar isso cedo.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Pajero iO (1.8 16V)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e vazamentos (mangueiras/juntas ressecadas por idade). | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000 km — Óleo da caixa de transferência e diferenciais. | Anual — Inspeção de correias e mangueiras, mesmo com pouco uso, por conta da idade do veículo.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Pajero iO', yearFrom: 1999, yearTo: 2006, tireSize: '215/70 R16 (referência)', frontPsi: 28, rearPsi: 30, frontPsiLoad: 30, rearPsiLoad: 34, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta ou manual do proprietário do exemplar específico.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Pajero iO', yearFrom: 1999, yearTo: 2006, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Pajero iO', yearFrom: 1999, yearTo: 2006, component: 'Inspeção de mangueiras e vedações (idade do veículo)', intervalKm: null, intervalMonths: 12, notes: 'Maior risco é degradação por idade, não por uso.', priority: 'HIGH', order: 1 },
  { modelName: 'Pajero iO', yearFrom: 1999, yearTo: 2006, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'Pajero iO', yearFrom: 1999, yearTo: 2006, component: 'Óleo da caixa de transferência e diferenciais', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Pajero iO', yearFrom: 1999, yearTo: 2006, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Mitsubishi Pajero iO...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Mitsubishi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Mitsubishi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Pajero iO', brandId: brand.id } },
    update: {}, create: { name: 'Pajero iO', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Pajero iO' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Pajero iO' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Pajero iO' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Mitsubishi Pajero iO concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
