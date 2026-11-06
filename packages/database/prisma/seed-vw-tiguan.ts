/**
 * Seed Volkswagen Tiguan (inclui Allspace, versão 7 lugares) — macetes,
 * problemas, manutenção e calibragem. Duas famílias de motor: 1.4 TSI 250
 * flex (Comfortline, câmbio automático convencional Tiptronic) e 2.0 TSI
 * 300/350 (R-Line, câmbio DSG de dupla embreagem, algumas versões com
 * tração integral 4Motion). #92 no ranking de vendas 2025 no Brasil
 * (2.229 un., variante Allspace).
 * Execute: pnpm --filter @motormacete/database db:seed:vw-tiguan
 *
 * Fontes: euromec.com.br, jorgemoraes.com, auto-doc.pt,
 *         calibragemdepneu.com.br, autoricambitritella.it
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput {
  severity: Sev
  title: string
  body: string
}

interface ModelBlock {
  modelName: string
  yearFrom: number | null
  yearTo: number | null
  MACETES: TipInput[]
  PROBLEMAS: TipInput[]
  MANUTENCAO: TipInput[]
}

interface TirePressureInput {
  modelName: string
  yearFrom: number | null
  yearTo: number | null
  tireSize: string
  frontPsi: number
  rearPsi: number
  frontPsiLoad: number | null
  rearPsiLoad: number | null
  sparePsi: number | null
  notes: string | null
}

interface MaintenanceItemInput {
  modelName: string
  yearFrom: number | null
  yearTo: number | null
  component: string
  intervalKm: number | null
  intervalMonths: number | null
  notes: string | null
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  order: number
}

const MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Duas famílias de motor/câmbio: confirme qual equipa sua unidade',
    body: 'A linha Tiguan/Tiguan Allspace usa 1.4 TSI 250 flex (câmbio automático convencional Tiptronic, versões Comfortline) ou 2.0 TSI 300/350 (câmbio DSG de dupla embreagem, versões R-Line, algumas com tração integral 4Motion). São mecânicas bem diferentes em cuidados de manutenção — confirme sempre qual equipa sua unidade.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio DSG (versões 2.0 TSI): evite ficar parado engatado com o pé no freio',
    body: 'Se sua unidade tem o câmbio DSG de dupla embreagem, evite manter o carro parado por longos períodos engatado em D com o pé no freio — prefira Neutro/Park em paradas longas (semáforos extensos, filas). Esse cuidado reduz o desgaste do conjunto de embreagens, ponto mais sensível desse câmbio.',
  },
  {
    severity: 'OK',
    title: 'Allspace: ajuste a pressão traseira quando a 3ª fileira estiver ocupada',
    body: 'Na versão Allspace (7 lugares), a terceira fileira de bancos adiciona peso considerável na traseira quando ocupada. Aumente a pressão traseira dos pneus conforme a etiqueta de carga máxima sempre que for rodar com o carro cheio.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmbio DSG: trancos e demora nas trocas a partir de ~60.000 km',
    body: 'O câmbio DSG de 7 marchas (usado nas versões 2.0 TSI, especialmente unidades 2018-2020) apresenta relatos de trancos e demora nas trocas de marcha a partir de cerca de 60.000 km, geralmente ligados à contaminação do óleo da transmissão ou erro de software que causa superaquecimento do módulo mecatrônico. Se notar esses sintomas, peça atualização de software primeiro (reparo mais simples e às vezes gratuito) antes de assumir que é necessário trocar peças.',
  },
  {
    severity: 'WARN',
    title: 'DSG com "engasgo a frio" nas unidades mais recentes (2024-2025)',
    body: 'Nas unidades mais novas, um dos problemas mais citados nos primeiros 18 meses é o câmbio DSG apresentando tranco/engasgo com o motor ainda frio — geralmente resolvido por calibração de software, reparo gratuito na garantia. Se notar isso só nos primeiros minutos de condução (some conforme o motor esquenta), é provavelmente esse caso — reporte na concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Motor 1.4 TSI: desgaste prematuro da corrente de comando em uso prolongado',
    body: 'O motor 1.4 TSI (150cv) apresenta relatos de desgaste prematuro da corrente de comando a partir de cerca de 80.000-120.000 km. Fique atento a ruído metálico vindo da parte superior do motor — pode indicar corrente ou tensionador gastos, e quanto antes for diagnosticado, menor o risco de dano maior ao motor.',
  },
  {
    severity: 'WARN',
    title: 'Motor turbodiesel biturbo (versões antigas): falha de turbina em alta km',
    body: 'Em versões com motor 2.0 TDI biturbo (mais antigas), há relatos de falha de turbina a partir de 140.000 km, frequentemente ligada a falta de óleo ou desgaste dos mancais. Mantenha a troca de óleo rigorosamente em dia — é o fator mais determinante para a vida útil do turbo.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tiguan/Allspace (Volkswagen + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (1.4 ou 2.0 TSI, especificação exata do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido do câmbio DSG (versões 2.0 TSI) — não atrasar, é o principal cuidado preventivo contra trancos e superaquecimento do mecatrônico. | 60.000 km — Fluido de arrefecimento. | Motor 1.4 TSI — atenção a ruído metálico do motor (possível desgaste da corrente de comando) a partir de 80.000 km. | Rodízio de pneus a cada 10.000 km — reforce a pressão traseira quando rodar com 7 lugares ocupados (Allspace).',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Tiguan',
    yearFrom: null,
    yearTo: null,
    tireSize: '235/55 R18 · 255/45 R19 (versões R-Line)',
    frontPsi: 34,
    rearPsi: 34,
    frontPsiLoad: 36,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Na versão Allspace (7 lugares), a pressão traseira sobe consideravelmente com o carro cheio (3ª fileira + bagagem). Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Tiguan', yearFrom: null, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor (1.4 TSI ou 2.0 TSI/TDI).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Tiguan', yearFrom: null, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Tiguan', yearFrom: null, yearTo: null, component: 'Fluido do câmbio DSG (versões 2.0 TSI)', intervalKm: 60000, intervalMonths: 48, notes: 'Não atrasar — principal cuidado preventivo contra trancos e superaquecimento do módulo mecatrônico.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Tiguan', yearFrom: null, yearTo: null, component: 'Corrente de comando (motor 1.4 TSI) — atenção a ruído', intervalKm: 80000, intervalMonths: null, notes: 'Verificar ruído metálico do motor — sinal de possível desgaste prematuro.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Tiguan', yearFrom: null, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Tiguan', yearFrom: null, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Tiguan', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Tiguan', yearFrom: null, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Volkswagen.', priority: 'HIGH', order: 7 },
  { modelName: 'Tiguan', yearFrom: null, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce a pressão traseira quando rodar com 7 lugares ocupados (Allspace).', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Tiguan',
    yearFrom: null,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volkswagen Tiguan...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }, idx) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: null,
        yearTo: null,
        order: idx,
      })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map((b) => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volkswagen Tiguan concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
