/**
 * Seed Ford Territory — macetes, problemas, manutenção e calibragem
 * SUV médio, motor único 1.5 turbo GTDi EcoBoost (150cv), câmbio CVT.
 * Fabricado originalmente pela JMC/Yusheng na China e comercializado pela
 * Ford no Brasil desde 2020. #59 no ranking de vendas 2025 no Brasil
 * (8.878 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:ford-territory
 *
 * Fontes: carroslancamentos.com.br, motoragora.com.br, mercadoveiculos.com,
 *         webmotors.com.br, virgola.com.br
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
    title: 'CVT: aceleração progressiva rende mais que "pisar fundo"',
    body: 'O motor 1.5 turbo (150cv) tem que mover cerca de 1,6 tonelada, então o câmbio CVT tende a responder de forma mais lenta em arrancadas e ultrapassagens. Antecipe ultrapassagens com mais distância e evite depender de resposta imediata ao acelerar fundo — dirigir de forma mais progressiva rende uma experiência mais suave e reduz o esforço do conjunto motor-câmbio.',
  },
  {
    severity: 'OK',
    title: 'Monitore a pressão dos pneus direto pelo painel',
    body: 'O Territory permite acompanhar a pressão dos pneus pelo próprio painel digital (menu Configurações > Informações do Veículo > Pressão dos Pneus). Use esse recurso para conferência rápida no dia a dia, mas confirme com um calibrador físico periodicamente — sensores de TPMS podem ter pequena margem de erro.',
  },
  {
    severity: 'WARN',
    title: 'Use o modo Sport/manual com moderação em subidas longas',
    body: 'Em subidas íngremes ou ultrapassagens, usar o modo Sport ou o modo manual/paddle shift (se disponível) ajuda o CVT a manter a rotação mais alta e reduzir a sensação de "esforço". Não é necessário para o dia a dia, mas ajuda bastante em rodovias com serra ou ao rodar com o carro cheio.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmbio CVT: engates bruscos ou hesitação relatados por alguns donos',
    body: 'Parte dos proprietários relata engates bruscos ou hesitação ao acelerar — não é um problema universal, mas aparece com frequência suficiente para merecer atenção. Se notar solavanco ou demora perceptível de resposta ao acelerar, registre o comportamento e leve para diagnóstico na concessionária, especialmente se for um comportamento novo ou que piora com o tempo.',
  },
  {
    severity: 'WARN',
    title: 'Potência considerada insuficiente para o peso do veículo',
    body: 'Os 150cv do motor 1.5 turbo muitas vezes se mostram justos para lidar com o peso do SUV, resultando em arrancadas mais lentas em semáforos e esforço perceptível em subidas com o carro carregado. Não é uma falha, mas é uma característica a considerar — se planejar rodar sempre com o carro cheio ou em regiões de serra, ajuste as expectativas de resposta do motor.',
  },
  {
    severity: 'WARN',
    title: 'Ruídos internos que se intensificam com o tempo de uso',
    body: 'Alguns proprietários relatam ruídos vindos do acabamento das portas, do painel ou dos bancos traseiros, que tendem a aparecer e se intensificar com o tempo de uso. Reporte qualquer ruído novo na revisão — na maioria dos casos é resolvido com ajuste ou reforço de encaixes, sem necessidade de troca de peça.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Territory (Ford + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor 1.5 turbo (especificação exata do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Fluido do câmbio CVT — não é vitalício, antecipe se notar engate brusco ou hesitação. | A cada revisão — Reportar qualquer ruído novo de acabamento interno para ajuste preventivo.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Territory',
    yearFrom: 2020,
    yearTo: null,
    tireSize: '235/55 R19 (verificar aro conforme versão)',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 33,
    rearPsiLoad: 39,
    sparePsi: 60,
    notes: 'Acompanhe a pressão pelo painel digital (Configurações > Informações do Veículo), mas confirme periodicamente com calibrador físico. Confirme o valor exato do seu aro/versão na etiqueta da coluna da porta.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Territory', yearFrom: 2020, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.5 turbo GTDi EcoBoost — siga exatamente a especificação do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Territory', yearFrom: 2020, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Territory', yearFrom: 2020, yearTo: null, component: 'Fluido do câmbio CVT', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar engate brusco ou hesitação ao acelerar.', priority: 'HIGH', order: 2 },
  { modelName: 'Territory', yearFrom: 2020, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Territory', yearFrom: 2020, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Territory', yearFrom: 2020, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Territory', yearFrom: 2020, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Ford.', priority: 'HIGH', order: 6 },
  { modelName: 'Territory', yearFrom: 2020, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 7 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Territory',
    yearFrom: 2020,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Ford Territory...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Ford', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Ford', vehicleTypeId: carroType.id },
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

  console.log('✅ Ford Territory concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
