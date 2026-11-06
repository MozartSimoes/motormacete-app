/**
 * Seed Mitsubishi Triton — macetes, problemas, manutenção e calibragem
 * Primeira marca Mitsubishi no catálogo. Picape média, nova geração
 * lançada no Brasil em 2024 sobre plataforma totalmente redesenhada
 * (compartilhada com o novo Pajero Sport), motor diesel 4N16 Super High
 * Power 2.4 turbo (205cv/47,9kgfm), câmbio automático de 6 marchas em
 * todas as versões. Substituiu a antiga "L200 Triton" (2007-2023,
 * motores 2.4/3.2/3.5 diesel/flex). #55 no ranking de vendas 2025 no
 * Brasil (10.401 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:mitsubishi-triton
 *
 * Fontes: reclameaqui.com.br, mobiauto.com.br, autopapo.com.br,
 *         autossegredos.com.br, car.blog.br, mercadoveiculos.com
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
    title: 'Geração nova (2024+) é mecanicamente diferente da antiga "L200 Triton"',
    body: 'A Triton atual é uma geração totalmente redesenhada, sobre plataforma nova compartilhada com o Pajero Sport, motor 4N16 2.4 turbodiesel (205cv) e câmbio automático de 6 marchas em todas as versões. Se for pesquisar peças ou dicas, confirme sempre se a informação é sobre essa geração ou sobre a antiga "L200 Triton" (2007-2023, motores 2.4/3.2/3.5) — a mecânica é diferente.',
  },
  {
    severity: 'OK',
    title: 'Motor 4N16: robusto, mas ainda sem histórico longo no Brasil',
    body: 'O novo motor 2.4 diesel é elogiado pela robustez e não repete os problemas crônicos do antigo motor 2.5 desta marca. Ainda assim, por ser recente no mercado brasileiro, siga rigorosamente os intervalos de revisão do manual e não estique prazos — é a forma mais segura de evitar problemas em um motor ainda "jovem" localmente.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático único: evite forçar reduções bruscas fora do modo apropriado',
    body: 'Todas as versões da Triton atual usam câmbio automático de 6 marchas. Em descidas ou trilhas, use o modo manual/paddle shift ou o modo específico de condução off-road (se disponível na sua versão) em vez de depender só do freio — isso reduz o desgaste do câmbio e melhora o controle em terrenos difíceis.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ruído de atrito ligado ao controle de estabilidade/diferencial em unidades da geração atual',
    body: 'Há relatos de ruído de fricção vindo da parte inferior do veículo, atribuído à atuação do controle de estabilidade, com técnicos de concessionária relatando dificuldade em identificar exatamente qual peça está em atrito — possivelmente relacionado ao diferencial. Alguns consumidores relataram sensação de risco à dirigibilidade. Se notar ruído desse tipo, documente com vídeo/áudio e exija diagnóstico técnico completo por escrito antes de aceitar o carro de volta da concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Múltiplas luzes de alerta acendendo simultaneamente no painel',
    body: 'Vários proprietários relataram várias luzes de alerta acendendo ao mesmo tempo no painel da geração atual, comprometendo a confiança no veículo. Se isso acontecer, não ignore — pare em local seguro, anote quais luzes acenderam e leve para diagnóstico por scanner o quanto antes.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira com comportamento considerado desconfortável por alguns donos',
    body: 'Há relatos de suspensão dianteira com resposta diferente do esperado, causando desconforto em irregularidades mais severas (alguns relatos mencionam solavancos fortes o suficiente para incomodar os ocupantes). Se notar comportamento assim, vale confirmar a calibragem correta dos pneus e o alinhamento antes de suspeitar de defeito nos componentes da suspensão.',
  },
  {
    severity: 'WARN',
    title: 'Ruídos de acabamento interno (rangidos) relatados por proprietários',
    body: 'Proprietários relatam ruídos de rangido no interior, incluindo atrito entre borracha e metal na região do banco do motorista ligada à fixação do cinto de segurança. Não é falha de segurança em si, mas vale reportar na revisão para ajuste/reforço dos pontos de fixação.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Triton (Mitsubishi + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor 2.4 diesel + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão (atenção a ruídos relatados) e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de combustível diesel — use sempre diesel S10 de qualidade. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático de 6 marchas. | Diesel — verificar sistema de pós-tratamento (DPF/ARLA 32) a cada revisão e evitar uso exclusivo em trajetos curtos. | Ao notar múltiplas luzes de alerta simultâneas ou ruído de atrito na parte inferior, documentar e exigir diagnóstico técnico completo.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Triton',
    yearFrom: 2024,
    yearTo: null,
    tireSize: '265/60 R18 (versões superiores) — confirme aro conforme versão',
    frontPsi: 34,
    rearPsi: 34,
    frontPsiLoad: 38,
    rearPsiLoad: 44,
    sparePsi: 60,
    notes: 'Pressão traseira sobe bastante com carga na caçamba (até 44 PSI). Confirme sempre o valor exato do seu aro/versão na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Triton', yearFrom: 2024, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.4 diesel 4N16.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Triton', yearFrom: 2024, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Triton', yearFrom: 2024, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Triton', yearFrom: 2024, yearTo: null, component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'Use sempre diesel S10 de qualidade.', priority: 'HIGH', order: 3 },
  { modelName: 'Triton', yearFrom: 2024, yearTo: null, component: 'Suspensão dianteira e sistema de estabilidade — inspeção', intervalKm: 10000, intervalMonths: null, notes: 'Histórico de ruído de atrito relatado — exigir diagnóstico completo se notar ruído incomum.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Triton', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Triton', yearFrom: 2024, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Mitsubishi.', priority: 'HIGH', order: 6 },
  { modelName: 'Triton', yearFrom: 2024, yearTo: null, component: 'Óleo do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar tranco nas trocas.', priority: 'HIGH', order: 7 },
  { modelName: 'Triton', yearFrom: 2024, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce a pressão traseira quando rodar com carga na caçamba.', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Triton',
    yearFrom: 2024,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Mitsubishi Triton...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Mitsubishi', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Mitsubishi', vehicleTypeId: carroType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.deleteMany({ where: { modelName: block.modelName, yearFrom: block.yearFrom } })
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }, idx) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: idx,
      })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}+): ${allTips.length} tips`)
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

  console.log('✅ Mitsubishi Triton concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
