/**
 * Seed Honda ZR-V — macetes, problemas, manutenção e calibragem
 * SUV médio, motor 2.0 aspirado (161cv/19,1kgfm) — único motor 100%
 * aspirado (sem turbo nem híbrido) da categoria — câmbio CVT. Plataforma
 * global compartilhada com Civic/CR-V. #97 no ranking de vendas 2025 no
 * Brasil (1.807 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:honda-zrv
 *
 * Fontes: car.blog.br, cnnbrasil.com.br, virgola.com.br,
 *         mercadoveiculos.com, honda.com.br
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
    title: 'Motor aspirado sem turbo: menos coisas para dar problema, mas menos empolgante',
    body: 'O ZR-V é o único SUV médio da categoria com motor 100% aspirado (sem turbo, sem sistema híbrido) — isso significa mecânica mais simples e historicamente mais previsível, mas também resposta mais "morna" em comparação a rivais turbo. Ajuste as expectativas de desempenho: não é o motor mais empolgante da categoria, mas tende a ser um dos mais tranquilos de manter.',
  },
  {
    severity: 'OK',
    title: 'CVT: acelere de forma progressiva para não "ouvir" o motor girando alto',
    body: 'Como o motor é aspirado e relativamente "justo" para o peso do carro, o CVT tende a manter rotações mais altas por mais tempo em acelerações fortes, gerando ruído de motor mais perceptível. Acelere de forma mais progressiva no dia a dia para uma experiência mais silenciosa — reserve a aceleração mais forte para ultrapassagens.',
  },
  {
    severity: 'OK',
    title: 'Fluido CVT: não deixe passar do prazo recomendado',
    body: 'Como em outros modelos Honda com CVT, a troca do fluido dentro do prazo do manual é o cuidado preventivo mais importante para a longevidade do câmbio. Use sempre o fluido original Honda, nunca um equivalente genérico.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Sem defeitos crônicos relevantes identificados até o momento',
    body: 'Diferente de outros modelos deste levantamento, não há relatos consistentes de defeitos mecânicos ou elétricos recorrentes no ZR-V no mercado brasileiro. As críticas mais comuns são sobre desempenho — motor considerado "fraco" para o peso do carro e CVT que soa "esforçado" em acelerações mais fortes — não sobre confiabilidade ou segurança.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma ZR-V (Honda + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor 2.0 (0W20 full sintético) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido CVT Honda original — item obrigatório, não usar fluido genérico. | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Fluido de arrefecimento.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'ZR-V',
    yearFrom: 2023,
    yearTo: null,
    tireSize: '235/50 R19 (Touring)',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'ZR-V', yearFrom: 2023, yearTo: null, component: 'Óleo do motor (0W20)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.0 aspirado.', priority: 'CRITICAL', order: 0 },
  { modelName: 'ZR-V', yearFrom: 2023, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'ZR-V', yearFrom: 2023, yearTo: null, component: 'Fluido CVT Honda original', intervalKm: 40000, intervalMonths: 24, notes: 'Obrigatório usar fluido original Honda — não aceitar equivalente genérico.', priority: 'CRITICAL', order: 2 },
  { modelName: 'ZR-V', yearFrom: 2023, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'ZR-V', yearFrom: 2023, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'ZR-V', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'ZR-V', yearFrom: 2023, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Honda.', priority: 'HIGH', order: 6 },
  { modelName: 'ZR-V', yearFrom: 2023, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 7 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'ZR-V',
    yearFrom: 2023,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Honda ZR-V...')

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

  console.log('✅ Honda ZR-V concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
