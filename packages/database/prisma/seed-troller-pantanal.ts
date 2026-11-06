/**
 * Seed Troller Pantanal — macetes, problemas, manutenção e calibragem
 * Picape média baseada no chassi do T4, lançada em 2006. Caso raro e
 * grave: foram fabricadas apenas 77 unidades, todas em 2006, e a Troller
 * (então já sob controle da Ford) identificou um problema ESTRUTURAL
 * irreversível no chassi/carroceria — o fabricante recomprou as unidades
 * já vendidas aos clientes. Por isso o conteúdo aqui foge do padrão
 * usual de "dicas de manutenção": a informação mais importante sobre
 * esse modelo é justamente o histórico do defeito e da recompra, não
 * um cronograma de revisão comum.
 * Execute: pnpm --filter @motormacete/database db:seed:troller-pantanal
 *
 * Fontes: autopapo.com.br (fim da Troller/Pantanal), webmotors.com.br
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
    title: 'Modelo raríssimo — só 77 unidades existiram, todas de 2006',
    body: 'O Pantanal teve uma produção extremamente limitada: apenas 77 unidades, todas fabricadas em 2006. Se você tem ou está pensando em adquirir um exemplar, saiba que é um caso à parte na história automotiva brasileira — praticamente um item de colecionador, não um carro de uso comum encontrável facilmente.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Defeito estrutural irreversível identificado pelo próprio fabricante — unidades foram recompradas',
    body: 'A Troller/Ford identificou um problema estrutural considerado irreversível na carroceria/chassi do Pantanal pouco depois do lançamento, e chegou a recomprar as unidades já vendidas aos clientes devido à gravidade do defeito. Se você tem conhecimento de um exemplar em circulação hoje, isso é a informação mais importante sobre o modelo: antes de qualquer outra manutenção, busque entender a situação e o histórico específico dessa unidade (se foi ou não parte da recompra, se passou por alguma reparação estrutural documentada) com a concessionária Ford/especialista em Troller — não é uma questão de manutenção preventiva comum, é uma questão de segurança estrutural do veículo.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Sem cronograma de manutenção "padrão" a recomendar',
    body: 'Dado o histórico de recompra por defeito estrutural e a raridade extrema do modelo (77 unidades no total), não existe uma rotina de manutenção "de mercado" consolidada para o Pantanal como existe para o T4. Qualquer intervenção deveria começar por uma avaliação estrutural completa e específica do chassi/carroceria por especialista, antes mesmo de tratar itens de manutenção comuns como óleo ou freio.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Pantanal', yearFrom: 2006, yearTo: 2006, tireSize: '235/75 R15 (referência, mesma base do T4)', frontPsi: 28, rearPsi: 30, frontPsiLoad: 32, rearPsiLoad: 38, sparePsi: 60, notes: 'Valor de referência baseado na mecânica compartilhada com o T4 — dado específico do Pantanal é escasso pela raridade do modelo. Confirme com especialista antes de usar.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Pantanal', yearFrom: 2006, yearTo: 2006, component: 'Avaliação estrutural do chassi/carroceria por especialista', intervalKm: null, intervalMonths: null, notes: 'Prioridade máxima antes de qualquer outra manutenção — modelo teve defeito estrutural irreversível identificado pelo fabricante, que recomprou as unidades vendidas.', priority: 'CRITICAL', order: 0 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Pantanal', yearFrom: 2006, yearTo: 2006, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Troller Pantanal...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Troller', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Troller', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Pantanal', brandId: brand.id } },
    update: {}, create: { name: 'Pantanal', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Pantanal' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Pantanal' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Pantanal' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Troller Pantanal concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
