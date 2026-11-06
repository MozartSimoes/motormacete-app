/**
 * Seed Chevrolet Cobalt — macetes, problemas, manutenção e calibragem de pneus
 * Sedan compacto vendido de 2011 a 2019, motor 1.4 ou 1.8 8V EconoFlex,
 * versões LS/LT/LTZ/Advantage/Graphite/Elite, câmbio manual 5 marchas ou
 * automático (GF6, a partir da reestilização). Frota expressiva ainda em
 * circulação, especialmente como carro de aplicativo/frota por conta do
 * porta-malas grande e baixo custo de manutenção.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-cobalt
 *
 * Fontes: motoragora.com.br, carroclub.com.br, opinautos.com.br,
 *         reclameaqui.com.br, olhonocarro.com.br, montrex.com.br
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
    title: 'Motor 8V EconoFlex: peças fartas, mas fique atento à junta da tampa de válvulas',
    body: 'O Cobalt usa a mesma família de motor 8V (1.4/1.8) de outros modelos GM da época, então peças de motor são relativamente fáceis de achar e baratas. O ponto fraco conhecido de quase toda essa linha 8V é a junta da tampa de válvulas, que costuma vazar óleo pela parte superior do motor com o tempo — não é motivo de pânico, mas vale ficar de olho no nível de óleo.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático GF6: troque o fluido, não é vitalício em uso urbano',
    body: 'Muitos manuais mais antigos diziam que o fluido do câmbio automático era "vitalício", mas na prática, em uso urbano intenso, o fluido da transmissão GF6 degrada bem antes disso. Se notar hesitação ou trancos nas trocas de marcha, faça a troca parcial do óleo do câmbio — não espere o problema piorar.',
  },
  {
    severity: 'OK',
    title: 'Consumo de combustível: confirme a condução antes de suspeitar de defeito',
    body: 'Há relatos de consumo bem abaixo do esperado (na faixa de 4-6 km/l) em algumas unidades. Antes de investigar defeito mecânico, confirme se não é questão de condução (marcha lenta excessiva, ar-condicionado, pneus murchos) — mas se o consumo estiver muito fora da média mesmo com direção econômica, vale checar sonda lambda e velas.',
  },
  {
    severity: 'WARN',
    title: 'Bateria descarregando sozinha: verifique consumo residual antes de trocar de novo',
    body: 'Alguns donos relatam bateria que descarrega mesmo após poucos dias parado, persistindo mesmo depois de trocar a bateria. Antes de trocar a peça de novo, peça para medir o consumo residual (corrente de fuga) com o carro desligado — pode haver um módulo consumindo energia indevidamente.',
  },
  {
    severity: 'OK',
    title: 'Bieletas e buchas da barra estabilizadora: item de desgaste normal, não é defeito grave',
    body: 'Por ser um carro voltado ao conforto e relativamente pesado para a categoria, o asfalto ruim cobra o preço nas bieletas e buchas da barra estabilizadora, gerando pequenos estalos em lombadas. É desgaste esperado de suspensão, não sinal de problema estrutural — troca é barata.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento crônico na junta da tampa de válvulas',
    body: 'Defeito clássico de praticamente toda a linha de motores 8V da GM da época — o óleo começa a vazar pela junta superior do motor e escorre pelo bloco. Não costuma ser grave se identificado cedo, mas rodar muito tempo com o vazamento sem reparo pode levar a nível de óleo baixo sem o dono perceber. Vale verificar visualmente no cabeçote a cada troca de óleo.',
  },
  {
    severity: 'WARN',
    title: 'Falhas de pintura — descascamento em capô, teto e laterais',
    body: 'Vários proprietários relatam pintura descascando com o tempo, principalmente em capô, teto e laterais, especialmente em modelos mais antigos. É mais um problema estético/de acabamento do que mecânico, mas afeta o valor de revenda — vale considerar película protetora se pretende manter o carro por muito tempo.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático: trancos e hesitação quando o fluido está degradado',
    body: 'Se o carro apresentar hesitação para engatar marcha ou trancos, principalmente em uso urbano intenso, o fluido da transmissão GF6 provavelmente está degradado — mesmo que o manual sugira intervalo "vitalício". Antecipar a troca parcial do óleo do câmbio (a cada 60.000 km em uso severo) evita desgaste acelerado da transmissão.',
  },
  {
    severity: 'WARN',
    title: 'Estalos na suspensão dianteira por desgaste de bieletas/buchas',
    body: 'Pequenos estalos ao passar por ondulações e lombadas, geralmente ligados às bieletas da barra estabilizadora e às buchas — peças de desgaste relativamente comum neste modelo, dado o peso do carro. Reparo é barato e resolve a maior parte dos ruídos de suspensão.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível acima do esperado em algumas unidades',
    body: 'Relato recorrente de consumo bem abaixo da média mesmo em condução econômica, sem carga e sem ar-condicionado. Vale investigar sonda lambda, filtro de ar sujo e calibragem de pneus antes de aceitar o consumo alto como "normal do carro".',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Cobalt 1.4/1.8 EconoFlex (manual e automático)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios e suspensão (bieletas/buchas). | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4 + kit correia dentada/tensionador (motores 8V a correia). | 60.000 km — Fluido de arrefecimento. | 60.000 km — Óleo do câmbio automático (GF6) — não espere degradar totalmente, mesmo que o manual sugira "vitalício". | Rodízio de pneus a cada 10.000 km. | Verifique vazamento na junta da tampa de válvulas a cada troca de óleo.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Cobalt',
    yearFrom: 2011,
    yearTo: null,
    tireSize: '185/65 R15 (aro 15) · 195/55 R16 (versões LTZ/Elite, aro 16)',
    frontPsi: 30,
    rearPsi: 30,
    frontPsiLoad: 32,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'A Chevrolet indica em torno de 35 PSI de fábrica em algumas versões, mas boa parte dos donos relata melhor conforto entre 30-33 PSI sem comprometer desempenho. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Cobalt', yearFrom: 2011, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Viscosidade conforme manual (1.4 ou 1.8 EconoFlex).', priority: 'HIGH', order: 0 },
  { modelName: 'Cobalt', yearFrom: 2011, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Cobalt', yearFrom: 2011, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em cidades com muita poeira.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Cobalt', yearFrom: 2011, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Cobalt', yearFrom: 2011, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor aspirado 8V — vela convencional.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Cobalt', yearFrom: 2011, yearTo: null, component: 'Correia dentada + tensionador', intervalKm: 40000, intervalMonths: 60, notes: 'Aproveite para trocar a bomba d\'água junto.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Cobalt', yearFrom: 2011, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Cobalt', yearFrom: 2011, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 7 },
  { modelName: 'Cobalt', yearFrom: 2011, yearTo: null, component: 'Óleo do câmbio automático GF6 (versões AT)', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício em uso urbano intenso — antecipe se notar trancos ou hesitação.', priority: 'HIGH', order: 8 },
  { modelName: 'Cobalt', yearFrom: 2011, yearTo: null, component: 'Tampa de válvulas — inspeção de vazamento', intervalKm: 10000, intervalMonths: 12, notes: 'Ponto de falha conhecido — verifique visualmente no cabeçote a cada troca de óleo.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Cobalt', yearFrom: 2011, yearTo: null, component: 'Bieletas e buchas da barra estabilizadora — inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Suspeito nº1 em caso de estalos na suspensão dianteira.', priority: 'MEDIUM', order: 10 },
  { modelName: 'Cobalt', yearFrom: 2011, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 11 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Cobalt',
    yearFrom: 2011,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Cobalt...')

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

  console.log('✅ Chevrolet Cobalt concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
