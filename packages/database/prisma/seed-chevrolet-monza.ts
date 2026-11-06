/**
 * Seed Chevrolet Monza — macetes, problemas, manutenção e calibragem de pneus
 * Sedã/hatch médio da GM do Brasil, produzido de 1982 a 1996 (baseado no Opel
 * Ascona/Opel Monza). Motores 1.6, 1.8 e 2.0, a gasolina ou álcool, carburados
 * na maior parte da vida do modelo, com injeção eletrônica monoponto chegando
 * nas versões finais. Versões SL, SL/E, Classic, GL e GLS. Problema clássico do
 * modelo: corrosão de carroceria (bem-vinda pela idade dos exemplares hoje) e
 * vazamento/queima da junta do cabeçote.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-monza
 *
 * Fontes: forum.monzeiros.com, carroclub.com.br, calibragemdepneu.com.br,
 *         opinautos.com.br, pt.wikipedia.org
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
    title: 'Use sempre aditivo no sistema de arrefecimento — reduz muito o risco de corrosão no cabeçote',
    body: 'Donos que passaram a usar aditivo de arrefecimento nas trocas especificadas relatam melhora real no problema de queima de junta de cabeçote — água sem aditivo favorece corrosão no bloco/cabeçote, uma das causas de falha na junta. É um dos macetes mais baratos e efetivos para prevenir o maior problema conhecido do Monza.',
  },
  {
    severity: 'OK',
    title: 'Junta do cabeçote pede montagem cuidadosa — não é serviço para "qualquer oficina"',
    body: 'A junta de cabeçote do Monza é sensível: exige torque correto e sequência de aperto adequada nos parafusos do cabeçote. Serviço malfeito reincide rápido. Procure mecânico com experiência específica em motores GM dessa geração (1.6/1.8/2.0 família Monza) — vale mais que economizar na oficina mais barata.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão de carroceria é o maior inimigo do Monza sobrevivente hoje',
    body: 'Exemplares de Monza que restam hoje têm décadas de idade — ferrugem em soleira, assoalho, para-lamas e frente do carro é o problema mais recorrente entre colecionadores. Lave a parte de baixo do carro periodicamente (principalmente após rodar em estrada com sal ou barro), trate pontos de ferrugem assim que aparecerem e evite guardar o carro em local úmido sem proteção.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor ainda disponíveis via mercado paralelo e fóruns especializados',
    body: 'A família de motores 1.8/2.0 do Monza foi usada em vários outros modelos GM da época — peças de motor (junta, retentor, bomba d\'água) ainda circulam bem no mercado paralelo. Fóruns e comunidades de donos de Monza são referência útil para indicar fornecedor confiável de peça específica quando a loja de bairro não tem em estoque.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Queima/vazamento da junta do cabeçote',
    body: 'É o problema mais lembrado do Monza — pode ser causado por corrosão no cabeçote (água sem aditivo), empenamento por superaquecimento, ou erro de torque em reparo anterior. Sintomas: perda de líquido de arrefecimento sem vazamento visível no chão, óleo "leitoso" no cárter, ou fumaça branca no escapamento. Não rode com esses sintomas — continuar rodando com junta comprometida pode empenar o cabeçote e multiplicar o custo do reparo.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão de carroceria em soleira, assoalho e para-lamas',
    body: 'Com a idade dos exemplares atuais, ferrugem estrutural é queixa comum, especialmente em carros que passaram por região litorânea ou ficaram parados sem cobertura. Inspecione periodicamente por baixo do carro, principalmente soleiras e assoalho — ferrugem avançada compromete a estrutura e a segurança em caso de batida.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento por falha no sistema de arrefecimento',
    body: 'Entupimento do radiador, bomba d\'água fraca ou falta de manutenção no arrefecimento aparecem como causa recorrente de superaquecimento, que por sua vez é uma das origens da queima de junta do cabeçote. Trate o arrefecimento como prioridade, não como item secundário.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Monza 1.6/1.8/2.0 (carburado ou EFI)',
    body: '5.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção do sistema de arrefecimento (radiador, mangueiras, bomba d\'água, nível de aditivo). | 10.000 km — Regulagem de carburador (versões carburadas). | 15.000-20.000 km — Velas de ignição. | 20.000 km — Filtro de ar. | 24 meses — Troca de fluido de arrefecimento com aditivo adequado — não use apenas água. | 30.000 km — Fluido de freio. | Anual — Inspeção de ferrugem em soleira, assoalho e para-lamas, com tratamento imediato de qualquer ponto encontrado. | Ao notar perda de arrefecimento sem vazamento visível — investigar junta do cabeçote imediatamente, não adiar.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Monza',
    yearFrom: 1982,
    yearTo: 1996,
    tireSize: '175/70 R13 (a maioria das versões) · 185/65 R14 (versões GLS/topo de linha)',
    frontPsi: 26,
    rearPsi: 28,
    frontPsiLoad: 28,
    rearPsiLoad: 30,
    sparePsi: 30,
    notes: 'Valores aproximados de referência para pneu aro 13/14 da época — confirme na etiqueta da coluna da porta do motorista ou manual do proprietário; na ausência, use como teto a pressão máxima marcada no flanco do pneu.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Monza', yearFrom: 1982, yearTo: 1996, component: 'Óleo do motor + filtro', intervalKm: 5000, intervalMonths: 6, notes: 'Não estenda o intervalo — motor antigo se beneficia de troca frequente.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Monza', yearFrom: 1982, yearTo: 1996, component: 'Fluido de arrefecimento com aditivo', intervalKm: null, intervalMonths: 24, notes: 'Nunca rode só com água — aditivo reduz drasticamente o risco de corrosão no cabeçote, causa comum de queima de junta.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Monza', yearFrom: 1982, yearTo: 1996, component: 'Sistema de arrefecimento (radiador, mangueiras, bomba d\'água)', intervalKm: 10000, intervalMonths: 12, notes: 'Inspeção preventiva reduz risco de superaquecimento e, por consequência, de queima da junta do cabeçote.', priority: 'HIGH', order: 2 },
  { modelName: 'Monza', yearFrom: 1982, yearTo: 1996, component: 'Junta do cabeçote — inspeção em caso de sintoma', intervalKm: null, intervalMonths: null, notes: 'Investigar imediatamente ao notar perda de arrefecimento sem vazamento visível, óleo leitoso ou fumaça branca no escapamento.', priority: 'CRITICAL', order: 3 },
  { modelName: 'Monza', yearFrom: 1982, yearTo: 1996, component: 'Velas de ignição', intervalKm: 20000, intervalMonths: null, notes: 'Ajuste conforme uso a álcool ou gasolina.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Monza', yearFrom: 1982, yearTo: 1996, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: 12, notes: 'Reduza o intervalo em cidades com muita poeira.', priority: 'LOW', order: 5 },
  { modelName: 'Monza', yearFrom: 1982, yearTo: 1996, component: 'Fluido de freio', intervalKm: 30000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Monza', yearFrom: 1982, yearTo: 1996, component: 'Inspeção de ferrugem (soleira, assoalho, para-lamas)', intervalKm: null, intervalMonths: 12, notes: 'Maior inimigo do Monza sobrevivente hoje. Trate qualquer ponto de corrosão assim que encontrar.', priority: 'MEDIUM', order: 7 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Monza',
    yearFrom: 1982,
    yearTo: 1996,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Monza...')

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

  console.log('✅ Chevrolet Monza concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
