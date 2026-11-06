/**
 * Seed Honda City (geração atual, 2023+) — macetes, problemas, manutenção e
 * calibragem de pneus. Cobre Sedan e Hatchback, que compartilham a mesma
 * plataforma e motorização na geração atual: 1.5L DOHC i-VTEC com injeção
 * direta (126cv), câmbio CVT. É uma geração totalmente nova em relação ao
 * City anterior (2015-2022, baseado no Fit) — por isso os macetes antigos
 * ("mesmo motor do Fit") foram limitados a yearTo:2022 numa correção
 * pontual no banco, e este arquivo cobre 2023 em diante. #47 no ranking de
 * vendas 2025 no Brasil, contabilizando a variante Hatchback (15.764 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:honda-city-hatchback
 *
 * Fontes: mobiauto.com.br, pcdcarros.com.br, carroslancamentos.com.br,
 *         garagem360.com.br, honda.com.br, hondacaiuas.com.br,
 *         mercadoveiculos.com
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
    title: 'Geração totalmente nova: não confunda com o City antigo (baseado no Fit)',
    body: 'O City lançado a partir de 2023 é uma geração nova, com motor 1.5L DOHC i-VTEC de injeção direta (126cv) e plataforma diferente do City anterior (2015-2022), que compartilhava mecânica com o Fit. Se for pesquisar peças ou dicas, confirme sempre o ano do seu carro — muita informação disponível na internet ainda é sobre a geração antiga e não se aplica aqui.',
  },
  {
    severity: 'OK',
    title: 'Sedan e Hatchback compartilham motor e câmbio',
    body: 'As versões Sedan e Hatchback da geração atual usam exatamente o mesmo motor 1.5 i-VTEC e câmbio CVT — a diferença é só de carroceria/porta-malas. Cuidados de manutenção do motor e câmbio são idênticos entre as duas carrocerias.',
  },
  {
    severity: 'WARN',
    title: 'Hatchback: cuidado redobrado com lombadas e rampas',
    body: 'Proprietários relatam que o City Hatchback tem altura livre do solo reduzida e raspa com facilidade em lombadas e rampas de garagem, tanto na frente quanto na traseira. Reduza bem a velocidade e aborde essas transições em ângulo quando possível, especialmente em garagens com rampa íngreme.',
  },
  {
    severity: 'OK',
    title: 'Injeção direta: use sempre combustível de qualidade',
    body: 'O motor 1.5 desta geração usa injeção direta de combustível, mais sensível à qualidade do combustível que motores de injeção indireta. Abasteça sempre em postos de confiança para reduzir o risco de depósitos nos bicos injetores e nas válvulas de admissão ao longo do tempo.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bomba de alta pressão do motor com relatos de falha recorrente',
    body: 'A bomba de alta pressão de combustível está entre os itens mais criticados por proprietários da geração atual, com relatos de troca mais de uma vez mesmo em carros com baixa quilometragem — e alguns reparos não cobertos pela garantia. Se notar falha de partida, marcha lenta irregular ou perda de potência, peça diagnóstico específico desse componente e documente tudo caso precise contestar a garantia.',
  },
  {
    severity: 'WARN',
    title: 'Ruído na caixa de direção elétrica',
    body: 'Há queixas frequentes de ruído interno associado a defeito na caixa de direção elétrica. Se notar ruído ao girar o volante (especialmente em manobras de estacionamento), leve para diagnóstico — em geral é resolvido com troca do conjunto da caixa de direção em garantia.',
  },
  {
    severity: 'WARN',
    title: 'Demora na disponibilidade de peças para reparo em garantia',
    body: 'Há relatos de veículos parados por semanas aguardando peças simples, mesmo para reparos cobertos por garantia. Ao abrir um chamado, peça previsão de peça por escrito e considere acionar o SAC da Honda diretamente se a demora ultrapassar o razoável.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma City geração atual (Honda + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (0W20 full sintético) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido CVT Honda original — item obrigatório, não usar fluido genérico. | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Fluido de arrefecimento. | Ao notar ruído na direção elétrica ou falha de partida, não postergar — documentar e acionar garantia cedo.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'City',
    yearFrom: 2023,
    yearTo: null,
    tireSize: '185/55 R16 (LX/EX) · 195/50 R17 (EXL/Touring)',
    frontPsi: 33,
    rearPsi: 36,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Geração atual (2023+) — diferente dos valores da geração anterior (2015-2022). Confirme o valor exato do seu aro/versão na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'City', yearFrom: 2023, yearTo: null, component: 'Óleo do motor (0W20)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor de injeção direta — siga exatamente a especificação do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'City', yearFrom: 2023, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'City', yearFrom: 2023, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 2 },
  { modelName: 'City', yearFrom: 2023, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'City', yearFrom: 2023, yearTo: null, component: 'Fluido CVT Honda original', intervalKm: 40000, intervalMonths: 24, notes: 'Obrigatório usar fluido original Honda — não aceitar equivalente genérico.', priority: 'CRITICAL', order: 4 },
  { modelName: 'City', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'City', yearFrom: 2023, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Honda.', priority: 'HIGH', order: 6 },
  { modelName: 'City', yearFrom: 2023, yearTo: null, component: 'Bomba de alta pressão — atenção a sintomas', intervalKm: null, intervalMonths: null, notes: 'Falha de partida ou perda de potência pode indicar problema nesse componente — histórico de relatos entre proprietários.', priority: 'MEDIUM', order: 7 },
  { modelName: 'City', yearFrom: 2023, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'City',
    yearFrom: 2023,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Honda City (geração atual)...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Honda', vehicleTypeId: carroType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.deleteMany({ where: { modelName: block.modelName, yearFrom: 2023 } })
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }, idx) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: 2023,
        yearTo: null,
        order: idx,
      })),
    })
    console.log(`  ✅ ${block.modelName} (2023+): ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName, yearFrom: 2023 } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (2023+)`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map((b) => b.modelName) }, yearFrom: 2023 },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Honda City (geração atual) concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
