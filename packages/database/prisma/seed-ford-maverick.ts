/**
 * Seed Ford Maverick — macetes, problemas, manutenção e calibragem
 * Picape compacta importada, duas motorizações: 2.0 EcoBoost turbo
 * (câmbio automático 8 marchas, tração traseira ou integral AWD — versões
 * Lariat FX4/Tremor/Black) e 2.5 Híbrida (motor a combustão + elétrico,
 * câmbio CVT, tração dianteira ou integral). Carga útil de até 680 kg.
 * #73 no ranking de vendas 2025 no Brasil (4.052 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:ford-maverick
 *
 * Fontes: turbonoticias.com.br, reclameaqui.com.br, guia360ford.com.br,
 *         mercadoveiculos.com, mavericktruckclub.com
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
    title: 'Dois motores bem diferentes: confirme qual equipa sua unidade',
    body: 'A Maverick é vendida com motor 2.0 EcoBoost turbo (câmbio automático de 8 marchas, tração traseira ou integral AWD) ou motor 2.5 Híbrido (combustão + elétrico, câmbio CVT, tração dianteira ou integral). São propulsores completamente diferentes em manutenção — confirme sempre qual equipa sua unidade antes de orçar peça ou revisão.',
  },
  {
    severity: 'OK',
    title: 'Motor considerado confiável — atenção é no acabamento, não na mecânica',
    body: 'Tanto o 2.0 EcoBoost quanto o 2.5 Híbrido são considerados motores confiáveis pelos proprietários e pela imprensa especializada. Os problemas mais comuns da Maverick não são mecânicos, e sim de acabamento interno (ruídos de plástico) — não deixe isso te preocupar quanto à durabilidade do motor em si.',
  },
  {
    severity: 'OK',
    title: 'Respeite a carga útil de 680 kg na caçamba',
    body: 'A carga útil máxima é de aproximadamente 680 kg. Distribua o peso de forma equilibrada e ajuste a pressão dos pneus para o modo "com carga" sempre que transportar peso significativo — isso preserva a estabilidade e o desgaste dos pneus traseiros.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ruído de plástico no acabamento interno ("festival de grilos")',
    body: 'O problema mais recorrente relatado por proprietários é ruído de plástico vibrando contra plástico, vindo do painel, dos puxadores das portas e do console central — resultado do acabamento interno mais simples do projeto original americano, que vibra mais no asfalto brasileiro. Não é falha de segurança, mas vale reportar na revisão para a concessionária aplicar reforços/espuma nos pontos de contato, prática já reconhecida pela rede.',
  },
  {
    severity: 'OK',
    title: 'Sem defeitos crônicos mecânicos relevantes identificados',
    body: 'Diferente de outros modelos deste levantamento, a Maverick não tem histórico de falha crônica grave de motor ou câmbio documentada no Brasil até o momento — os relatos concentram-se em acabamento e itens de conforto, não em confiabilidade mecânica.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Maverick (Ford + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (2.0 EcoBoost ou 2.5 Híbrido, conforme sua versão) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Fluido do câmbio (automático 8 marchas ou CVT híbrido, conforme versão). | Versão híbrida — Inspeção anual do sistema de alta tensão (bateria/cabos). | A cada revisão — Reportar ruídos de acabamento interno para ajuste preventivo.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Maverick',
    yearFrom: 2022,
    yearTo: null,
    tireSize: '225/65 R17',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 35,
    rearPsiLoad: 40,
    sparePsi: 60,
    notes: 'Pressão traseira sobe com carga na caçamba (até 680 kg). Use o modo "com carga" indicado na etiqueta da coluna da porta sempre que transportar peso.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Maverick', yearFrom: 2022, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor (2.0 EcoBoost ou 2.5 Híbrido).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Maverick', yearFrom: 2022, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Maverick', yearFrom: 2022, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Maverick', yearFrom: 2022, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Maverick', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 4 },
  { modelName: 'Maverick', yearFrom: 2022, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Ford.', priority: 'HIGH', order: 5 },
  { modelName: 'Maverick', yearFrom: 2022, yearTo: null, component: 'Fluido do câmbio (automático 8 marchas ou CVT híbrido)', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar tranco nas trocas.', priority: 'HIGH', order: 6 },
  { modelName: 'Maverick', yearFrom: 2022, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos) — versão Híbrida', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual do sistema elétrico de alta tensão.', priority: 'HIGH', order: 7 },
  { modelName: 'Maverick', yearFrom: 2022, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Ajuste pressão para o modo "com carga" quando transportar peso.', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Maverick',
    yearFrom: 2022,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Ford Maverick...')

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

  console.log('✅ Ford Maverick concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
