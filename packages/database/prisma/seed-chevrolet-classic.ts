/**
 * Seed Chevrolet Classic — macetes, problemas, manutenção e calibragem de pneus
 * Sedan de entrada vendido de 2003 a 2010 (embora tenha continuado sendo
 * comercializado por mais tempo em alguns mercados), baseado na carroceria
 * do Corsa Sedan antigo (pré-2002), motor 1.0 8V VHC/FlexPower, versões
 * Life/LS/Advantage. Sucessor "de entrada" do Chevette, foco em baixo custo
 * de manutenção e alto consumo econômico (fama de fazer até 14 km/l).
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-classic
 *
 * Fontes: oficinabrasil.com.br, carro.blog.br, terrabrasilnoticias.com,
 *         carrosdepartamentos.com, opinautos.com.br
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
    title: 'Motor 1.0 VHC compartilha peça com Celta, Corsa, Prisma e Agile',
    body: 'O Classic usa o mesmo bloco 1.0 8V VHC/FlexPower de outros modelos GM da mesma família (Celta, Corsa, Prisma antigo, Agile). Peças de motor, suspensão e freio costumam ser intercambiáveis — procure pela referência "Corsa/Celta" quando a peça específica do Classic não estiver disponível.',
  },
  {
    severity: 'OK',
    title: 'Fama de econômico é real, mas depende de manutenção em dia',
    body: 'O Classic tem fama consolidada de fazer médias de até 14 km/l na estrada com o motor 1.0 bem regulado. Para manter esse consumo, a condição da injeção eletrônica, das velas e do filtro de ar precisa estar em dia — motor desregulado derruba bastante o rendimento em um carro que depende de leveza e simplicidade mecânica para ser econômico.',
  },
  {
    severity: 'WARN',
    title: 'Gasolina pura pode causar dificuldade de partida em dias frios',
    body: 'Em versões flex, é comum relato de dificuldade para dar partida pela manhã e aceleração instável exclusivamente quando o tanque está com gasolina pura (sem etanol misturado recentemente). Reabastecer com mais etanol costuma resolver — não é necessariamente um defeito a ser consertado.',
  },
  {
    severity: 'WARN',
    title: 'Aterramento elétrico é ponto fraco conhecido — investigue falhas intermitentes por aí primeiro',
    body: 'O Classic é conhecido entre mecânicos por defeitos recorrentes de aterramento no sistema elétrico, que podem causar falhas intermitentes, luzes acendendo sem motivo aparente e, em casos graves, até superaquecimento de chicote. Se tiver comportamento elétrico estranho e intermitente, cheque os pontos de aterramento antes de trocar módulos ou sensores.',
  },
  {
    severity: 'OK',
    title: 'Ruído de "batida de saia" no motor: não ignore mesmo com baixa km',
    body: 'Um ruído audível em marcha lenta e na desaceleração, conhecido popularmente como "batida de saia", pode aparecer mesmo em unidades com quilometragem baixa. Costuma exigir retífica do motor com brunimento do cilindro e troca de pistão — não é algo que "passa sozinho", vale diagnóstico assim que notar o som.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela junta da tampa de válvulas',
    body: 'Um dos defeitos mais citados por donos do Classic é vazamento de óleo pela junta do cabeçote (tampa de válvulas). Verifique visualmente a região do motor a cada troca de óleo — reparo é relativamente barato se identificado cedo.',
  },
  {
    severity: 'WARN',
    title: 'Falha no rotor da bomba d\'água pode causar superaquecimento grave',
    body: 'Além dos problemas comuns de vazamento na válvula termostática, tampa do reservatório e radiador, há relatos específicos de separação do rotor da bomba d\'água — falha que pode causar superaquecimento sério do motor sem aviso claro. Se notar a temperatura subindo no painel, não continue rodando "para ver se passa".',
  },
  {
    severity: 'WARN',
    title: 'Defeitos de aterramento elétrico causam falhas intermitentes',
    body: 'Modelo conhecido entre mecânicos por problemas recorrentes de aterramento (grounding), que podem gerar falhas intermitentes difíceis de diagnosticar, luzes de painel acendendo sem razão aparente e, em casos mais graves, até queima de componentes do chicote elétrico.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão, embreagem e módulo de injeção com desgaste mais rápido que o esperado',
    body: 'Relatos apontam fragilidade em componentes de suspensão, embreagem e no módulo de injeção eletrônica, que apresentam defeito em intervalos mais curtos do que seria razoável esperar para o perfil de uso do carro. Vale inspecionar esses itens com mais atenção nas revisões.',
  },
  {
    severity: 'WARN',
    title: 'Catalisador com defeito prematuro em algumas unidades',
    body: 'Há relatos de defeito precoce no catalisador, e em alguns casos, após a troca, o carro passou a vibrar mais na arrancada e apresentar consumo de combustível acima do esperado — indício de que o problema pode não estar isolado só na peça trocada. Se isso acontecer, vale investigar sensores e regulagem de injeção também.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Classic 1.0 VHC/FlexPower',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar do motor. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4 + kit correia dentada/tensionador (troque a bomba d\'água junto — ponto de falha conhecido). | 60.000 km — Fluido de arrefecimento. | Rodízio de pneus a cada 10.000 km. | Verifique pontos de aterramento elétrico em caso de falha intermitente antes de trocar peças caras.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Classic',
    yearFrom: 2003,
    yearTo: null,
    tireSize: '165/70 R13 (aro 13)',
    frontPsi: 27,
    rearPsi: 27,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Carro leve (até 2 ocupantes): 27 PSI nos quatro pneus. Carro carregado (mais ocupantes/bagagem): 30 PSI na dianteira e 36 PSI na traseira. Confirme o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Classic', yearFrom: 2003, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Viscosidade conforme manual — motor 1.0 VHC/FlexPower.', priority: 'HIGH', order: 0 },
  { modelName: 'Classic', yearFrom: 2003, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Classic', yearFrom: 2003, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em cidades com muita poeira.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Classic', yearFrom: 2003, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor aspirado 8V — vela convencional. Em dia ajuda a manter o consumo baixo característico do modelo.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Classic', yearFrom: 2003, yearTo: null, component: 'Correia dentada + tensionador', intervalKm: 40000, intervalMonths: 60, notes: 'Troque a bomba d\'água junto — ponto de falha conhecido (rotor pode se soltar e causar superaquecimento).', priority: 'CRITICAL', order: 4 },
  { modelName: 'Classic', yearFrom: 2003, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Classic', yearFrom: 2003, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado — evita corrosão interna do motor.', priority: 'HIGH', order: 6 },
  { modelName: 'Classic', yearFrom: 2003, yearTo: null, component: 'Tampa de válvulas — inspeção de vazamento', intervalKm: 10000, intervalMonths: 12, notes: 'Um dos defeitos mais citados pelos donos — verifique visualmente a cada troca de óleo.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Classic', yearFrom: 2003, yearTo: null, component: 'Pontos de aterramento elétrico — inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Suspeito nº1 em caso de falha elétrica intermitente sem causa aparente.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Classic', yearFrom: 2003, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Classic',
    yearFrom: 2003,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Classic...')

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

  console.log('✅ Chevrolet Classic concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
