/**
 * Seed Chevrolet TrailBlazer — macetes, problemas, manutenção e calibragem
 * SUV 7 lugares sobre a plataforma da S10, motor 2.8 turbodiesel (200cv,
 * câmbio automático 6 marchas) ou 3.6 V6 gasolina (versões mais antigas).
 * #94 no ranking de vendas 2025 no Brasil (2.192 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-trailblazer
 *
 * Fontes: reclameaqui.com.br, carroclub.com.br, canaltech.com.br,
 *         car.blog.br, mobiauto.com.br, mercadoveiculos.com
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
    title: 'Plataforma compartilhada com a S10: peças e conhecimento técnico mais fáceis de achar',
    body: 'A TrailBlazer é construída sobre a mesma plataforma da picape S10, compartilhando boa parte da mecânica (motor 2.8 diesel, câmbio, componentes de chassi). Em oficinas independentes, peças e conhecimento técnico da S10 ajudam bastante quando o cadastro específico da TrailBlazer ainda não existir no sistema da loja.',
  },
  {
    severity: 'WARN',
    title: 'Diesel de qualidade é ainda mais importante no motor 2.8 turbo',
    body: 'Assim como na S10, o motor 2.8 turbodiesel é sensível à qualidade do diesel abastecido. Use sempre diesel S10 de postos confiáveis — combustível ruim é uma das causas mais comuns de perda de potência, marcha lenta irregular e problemas na injeção nesse motor.',
  },
  {
    severity: 'OK',
    title: '7 lugares: ajuste a pressão traseira quando estiver com o carro cheio',
    body: 'Com a terceira fileira de bancos ocupada e bagagem, a pressão traseira dos pneus deve subir (até cerca de 40 PSI) para preservar a estabilidade e o desgaste dos pneus. Ajuste sempre antes de viagens com o carro cheio.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Relatos de perda de potência, marcha lenta irregular e o motor desligando completamente',
    body: 'Alguns proprietários relatam perda de potência do motor, câmbio não respondendo corretamente, marcha lenta com defeito e, em casos mais graves, o carro desligando por completo em movimento — risco real em situação de trânsito. Se sua unidade apresentar qualquer um desses sintomas, mesmo que intermitente, não continue rodando normalmente: leve para diagnóstico completo (injeção, sensores, sistema elétrico) o quanto antes.',
  },
  {
    severity: 'WARN',
    title: 'Falhas na transmissão automática com histórico de desgaste prematuro (2017-2020)',
    body: 'Há histórico de deficiência nas passagens de marcha e desgaste prematuro de componentes da transmissão automática em unidades TrailBlazer e S10 de 2017 a 2020, em alguns casos exigindo orçamento para troca completa da caixa de câmbio. Se notar tranco ou demora nas trocas de marcha, não adie o diagnóstico — esse tipo de falha tende a se agravar e encarecer com o tempo.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático de 6 marchas prioriza trabalho, não conforto',
    body: 'O câmbio automático de 6 marchas é calibrado para robustez e capacidade de reboque/carga, não necessariamente para o comportamento mais suave de um SUV de passeio moderno. Isso não é defeito, é característica do projeto — ajuste as expectativas de suavidade nas trocas de marcha, especialmente comparado a rivais mais recentes.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma TrailBlazer (Chevrolet + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor 2.8 diesel (ou 3.6 V6, conforme sua versão) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de combustível diesel — use sempre diesel S10 de qualidade. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático — antecipe se notar tranco ou demora nas trocas, histórico de desgaste prematuro relatado em unidades 2017-2020. | Rodízio de pneus a cada 10.000 km — reforce a pressão traseira quando rodar com os 7 lugares ocupados.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'TrailBlazer',
    yearFrom: null,
    yearTo: null,
    tireSize: '265/60 R18',
    frontPsi: 35,
    rearPsi: 35,
    frontPsiLoad: 35,
    rearPsiLoad: 40,
    sparePsi: 60,
    notes: 'Estepe aro 16, medida 245/70 R16 — pressão diferente dos pneus principais. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'TrailBlazer', yearFrom: null, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação conforme motor (2.8 diesel ou 3.6 V6).', priority: 'CRITICAL', order: 0 },
  { modelName: 'TrailBlazer', yearFrom: null, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'TrailBlazer', yearFrom: null, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 2 },
  { modelName: 'TrailBlazer', yearFrom: null, yearTo: null, component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'Use sempre diesel S10 de qualidade.', priority: 'HIGH', order: 3 },
  { modelName: 'TrailBlazer', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 4 },
  { modelName: 'TrailBlazer', yearFrom: null, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 5 },
  { modelName: 'TrailBlazer', yearFrom: null, yearTo: null, component: 'Óleo do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar tranco ou demora nas trocas — histórico de desgaste prematuro em unidades 2017-2020.', priority: 'HIGH', order: 6 },
  { modelName: 'TrailBlazer', yearFrom: null, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce a pressão traseira quando rodar com os 7 lugares ocupados.', priority: 'MEDIUM', order: 7 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'TrailBlazer',
    yearFrom: null,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet TrailBlazer...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Chevrolet', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Chevrolet', vehicleTypeId: carroType.id },
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

  console.log('✅ Chevrolet TrailBlazer concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
