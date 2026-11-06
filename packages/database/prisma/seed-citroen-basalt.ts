/**
 * Seed Citroën Basalt — macetes, problemas, manutenção e calibragem de pneus
 * SUV cupê lançado em 2024, sobre a mesma plataforma CMP do C3/C3 Aircross.
 * Duas motorizações: 1.0 flex aspirado 6V (versão Feel manual) e 1.0 turbo
 * flex "200" PureTech (130cv, câmbio automático de 6 marchas) nas versões
 * Feel Turbo, Shine, First Edition e Dark Edition. #38 no ranking de vendas
 * 2025 no Brasil (19.793 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:citroen-basalt
 *
 * Fontes: reclameaqui.com.br, mobiauto.com.br, car.blog.br, agazeta.com.br,
 *         terra.com.br, portaltela.com, jantes-e-pneus.com
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
    title: 'Duas motorizações: confira se a sua é aspirada ou turbo',
    body: 'A versão de entrada (Feel manual) usa motor 1.0 flex aspirado 6V, enquanto as versões Feel Turbo, Shine, First Edition e Dark Edition usam o 1.0 turbo flex "200" PureTech (130cv) com câmbio automático de 6 marchas. São motores bem diferentes em manutenção e peças — confirme qual equipa sua unidade antes de comprar peça ou orçar revisão.',
  },
  {
    severity: 'OK',
    title: 'Motor turbo PureTech: respeite o intervalo de troca de óleo à risca',
    body: 'O motor 1.0 turbo é de baixa cilindrada trabalhando sob alta pressão — isso exige óleo de qualidade e troca no prazo certo, sem tolerância para atraso. Use sempre a especificação exata indicada no manual (sintético, viscosidade correta) para preservar o turbo e reduzir risco de falhas prematuras.',
  },
  {
    severity: 'OK',
    title: 'Compartilha peças e conhecimento técnico com C3 e C3 Aircross',
    body: 'A Basalt é construída sobre a mesma plataforma CMP e usa boa parte da mecânica do C3 e C3 Aircross (motor PureTech turbo, câmbio automático, suspensão). Em oficinas independentes, use as referências desses modelos irmãos para encontrar peças com mais facilidade quando o cadastro específico da Basalt ainda não existir no sistema da loja.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall: desalinhamento entre turbina e catalisador pode vazar gases tóxicos para a cabine',
    body: 'A Citroën convocou recall (2025) para cerca de 16.300 veículos com motor T3 (C3, Basalt e C3 Aircross) por desalinhamento entre a turbina e o conversor catalítico, que pode permitir vazamento de gases tóxicos de escapamento para dentro do habitáculo — risco sério à saúde dos ocupantes em exposição prolongada. Verifique se o chassi da sua Basalt está na faixa afetada e agende o reparo gratuito na concessionária Citroën assim que possível, mesmo sem sintomas aparentes.',
  },
  {
    severity: 'DANGER',
    title: 'Recall: infiltração de água pode desligar o motor em movimento',
    body: 'Paralelamente ao recall da turbina, outras 1.336 unidades de Basalt e C3 foram convocadas por defeito de infiltração de água que pode causar desligamento do motor com o veículo em movimento — risco real de acidente em trânsito. Reparo gratuito nas concessionárias. Confira se sua unidade está na lista, mesmo que o carro pareça funcionar normalmente.',
  },
  {
    severity: 'WARN',
    title: 'Motor turbo desligando sozinho e luz de injeção intermitente',
    body: 'Há relatos recorrentes de proprietários com o motor 1.0 turbo desligando sozinho em movimento e luz de injeção eletrônica acendendo de forma intermitente, causando perda de potência e ruídos estranhos no motor. Se notar qualquer um desses sintomas, não continue rodando normalmente — leve para diagnóstico por scanner imediatamente e documente reincidências para reforçar acionamento de garantia.',
  },
  {
    severity: 'WARN',
    title: 'Defeitos de acabamento e pintura relatados por proprietários',
    body: 'Proprietários relatam defeitos de fabricação como imperfeições de pintura ("olho de peixe") no capô, para-lamas e tampa do porta-malas, além de acabamento considerado abaixo do esperado para o segmento. Faça uma vistoria minuciosa da pintura e do acabamento no ato da entrega (0km) e registre qualquer imperfeição antes de assinar o termo de entrega.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível abaixo do anunciado em alguns relatos',
    body: 'Enquanto a ficha técnica indica médias de aproximadamente 11,9 km/l (gasolina, cidade) e 13,7 km/l (gasolina, estrada), parte dos proprietários relata consumo real bem inferior, especialmente em uso urbano intenso com ar-condicionado ligado. Se notar consumo muito abaixo do esperado, verifique primeiro calibragem dos pneus e estilo de condução antes de suspeitar de defeito mecânico.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Basalt (Citroën + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (especificação exata do manual, essencial no motor turbo) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático (versões turbo AT). | Verificar recalls pendentes (turbina/catalisador e infiltração de água) na primeira visita à concessionária, independentemente da quilometragem.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Basalt',
    yearFrom: 2024,
    yearTo: null,
    tireSize: '205/60 R16 (Feel/Feel Turbo) · 215/55 R17 (Shine/First Edition/Dark Edition)',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Valores de referência alinhados à plataforma compartilhada com o C3 Aircross. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista, já que pode variar por versão/aro.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Basalt', yearFrom: 2024, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor turbo PureTech exige especificação exata do manual — não economize.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Basalt', yearFrom: 2024, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Basalt', yearFrom: 2024, yearTo: null, component: 'Recalls pendentes (turbina/catalisador e infiltração de água)', intervalKm: null, intervalMonths: null, notes: 'Verificar na concessionária mesmo sem sintomas — riscos à saúde e de desligamento em movimento.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Basalt', yearFrom: 2024, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Basalt', yearFrom: 2024, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Basalt', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Basalt', yearFrom: 2024, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Citroën.', priority: 'HIGH', order: 6 },
  { modelName: 'Basalt', yearFrom: 2024, yearTo: null, component: 'Óleo do câmbio automático (versões turbo)', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar trancos nas trocas de marcha.', priority: 'HIGH', order: 7 },
  { modelName: 'Basalt', yearFrom: 2024, yearTo: null, component: 'Vistoria de pintura/acabamento (0km)', intervalKm: null, intervalMonths: null, notes: 'Registrar imperfeições na entrega — defeitos de pintura relatados por proprietários.', priority: 'LOW', order: 8 },
  { modelName: 'Basalt', yearFrom: 2024, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Basalt',
    yearFrom: 2024,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Citroën Basalt...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Citroën', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Citroën', vehicleTypeId: carroType.id },
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

  console.log('✅ Citroën Basalt concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
