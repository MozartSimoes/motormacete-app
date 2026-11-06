/**
 * Seed Chevrolet Celta — macetes, problemas, manutenção e calibragem de pneus
 * Hatch compacto de entrada, no mercado de 2000 a 2016 (fabricado em Gravataí/RS
 * na maior parte do período), 3 ou 5 portas, motor 1.0 ou 1.4 8V VHC/FlexPower
 * (família de motor "Corsa"/GM Family I), câmbio manual 5 marchas. Versões
 * Life, Spirit, Super, Advantage. Frota gigantesca ainda em circulação — um
 * dos carros mais vendidos da história da GM no Brasil.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-celta
 *
 * Fontes: autoo.com.br, oficinabrasil.com.br, carroclub.com.br, opinautos.com.br,
 *         reclameaqui.com.br, mecpecas.com.br, acciolygm.com.br
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
    title: 'Peças compartilhadas com Corsa, Prisma, Classic e Agile — economize procurando pela família do motor',
    body: 'O motor 1.0/1.4 8V VHC (e depois FlexPower/EconoFlex) do Celta é o mesmo bloco usado no Corsa, Classic, Prisma (geração antiga) e Agile. Peças de motor, suspensão, freios e elétrica costumam ser intercambiáveis entre esses modelos. Em oficinas ou casas de autopeças, pergunte por peças "família Corsa/Celta" quando faltar cadastro específico do Celta — isso amplia muito a disponibilidade e reduz o preço.',
  },
  {
    severity: 'WARN',
    title: 'Não atrase a troca da correia dentada',
    body: 'O motor VHC/FlexPower usa correia dentada (não corrente), com intervalo recomendado entre 40.000 e 60.000 km ou a cada 5 anos, o que vier primeiro — confirme o valor exato no manual da sua versão. Aproveite a troca para substituir também o tensionador e, de preferência, a bomba d\'água junto (desgaste similar). Correia arrebentada em motor não é "livre de dano" — pode gerar batida de válvula.',
  },
  {
    severity: 'OK',
    title: 'Inspecione o berço da bateria contra ferrugem',
    body: 'O compartimento onde a bateria fica presa é ponto clássico de enferrujamento no Celta, principalmente por entrada de água de lavagem ou chuva. Corrosão avançada nessa região pode perfurar a chapa e permitir infiltração de água para dentro do carro, do lado do passageiro. Vale inspecionar visualmente essa área a cada troca de óleo — reparo preventivo com lixa e zarcão é bem mais barato que consertar infiltração.',
  },
  {
    severity: 'WARN',
    title: 'Gasolina pura pode causar partida difícil em dias frios',
    body: 'Em versões flex, é comum relatos de dificuldade para dar partida pela manhã e aceleração instável quando o tanque está só com gasolina (sem mistura de etanol recente). Se notar esse comportamento, considere completar o tanque com uma proporção maior de etanol — muitas vezes resolve sem necessidade de intervenção mecânica.',
  },
  {
    severity: 'OK',
    title: 'Vazamento na direção hidráulica endurece o volante aos poucos',
    body: 'Direção pesada não é "normal de carro velho" — geralmente é sintoma de vazamento no sistema hidráulico. Verifique o nível do reservatório de fluido de direção periodicamente; complete apenas com o fluido especificado e, se o consumo for recorrente, procure o ponto de vazamento (mangueiras e retentores da bomba são os suspeitos mais comuns).',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Folga no virabrequim em motores VHC de alta quilometragem',
    body: 'Donos relatam ruído metálico associado a folga no virabrequim, mais comum em motores VHC com muita quilometragem e histórico de troca de óleo irregular. Ruído metálico constante no motor, especialmente em marcha lenta, merece diagnóstico antes de continuar rodando — o problema tende a piorar e encarecer o reparo.',
  },
  {
    severity: 'WARN',
    title: 'Bobina de ignição racha e causa falha intermitente / carro apaga',
    body: 'A bobina de ignição tem histórico de trincar na torre e apresentar fuga de corrente, fazendo o motor falhar ou apagar de repente, às vezes em movimento. O conector da bobina também costuma dar problema. Se o carro apagar sem motivo aparente, essa é uma das primeiras coisas a checar — peça relativamente barata e fácil de trocar.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento no radiador mesmo com baixa quilometragem',
    body: 'O Celta tem histórico de vazamentos no sistema de arrefecimento, especialmente no radiador — e isso já aparece em carros com menos de 50.000 km, não só em unidades muito rodadas. Fique de olho no nível do reservatório de arrefecimento; perda constante sem vazamento visível no chão é sinal de alerta.',
  },
  {
    severity: 'WARN',
    title: 'Mangueira da admissão racha e causa entrada de ar falso',
    body: 'A mangueira que liga o filtro de ar à admissão do motor costuma ressecar e trincar com o tempo, permitindo entrada de ar não filtrado/não medido. Isso gera marcha lenta instável, perda de desempenho e, às vezes, acionamento da luz de injeção. É item comum de reprovação em inspeção veicular e conserto barato.',
  },
  {
    severity: 'WARN',
    title: 'Infiltração de água pelo berço da bateria enferrujado',
    body: 'Quando a corrosão no compartimento da bateria avança sem reparo, a água passa a entrar no habitáculo do lado do passageiro em dias de chuva ou lavagem. Some ao ruído de acabamento (rangidos em porta/painel/porta-malas), comum de se ouvir em unidades mais usadas — não indica defeito grave, mas incomoda.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Celta 1.0/1.4 VHC/FlexPower (uso urbano BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine (se equipado). | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 40.000-60.000 km — Correia dentada + tensionador (troque a bomba d\'água junto). | 60.000 km — Fluido de arrefecimento. | Rodízio de pneus a cada 10.000 km. | Verifique periodicamente vazamentos no radiador e no berço da bateria (pontos de falha conhecidos do modelo).',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Celta',
    yearFrom: 2000,
    yearTo: null,
    tireSize: '165/70 R13 (aro 13) · 175/70 R13 (algumas versões)',
    frontPsi: 27,
    rearPsi: 27,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Com carro leve (até 2 ocupantes), 27 PSI nos quatro pneus. Com carro carregado (mais ocupantes/bagagem), suba para 30 PSI na dianteira e 36 PSI na traseira. Confirme o valor exato na etiqueta da coluna da porta do motorista, pois varia por versão/tamanho de pneu.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Celta', yearFrom: 2000, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Use a viscosidade indicada no manual da sua versão (VHC ou FlexPower).', priority: 'HIGH', order: 0 },
  { modelName: 'Celta', yearFrom: 2000, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Celta', yearFrom: 2000, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em cidades com muita poeira.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Celta', yearFrom: 2000, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor aspirado 8V — vela convencional.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Celta', yearFrom: 2000, yearTo: null, component: 'Correia dentada + tensionador', intervalKm: 50000, intervalMonths: 60, notes: 'Não espere arrebentar — motor pode sofrer dano sério. Aproveite para trocar a bomba d\'água junto.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Celta', yearFrom: 2000, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Celta', yearFrom: 2000, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 6 },
  { modelName: 'Celta', yearFrom: 2000, yearTo: null, component: 'Bobina de ignição — inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Verifique trincas na torre e o conector se o carro apresentar falha ou apagar sozinho.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Celta', yearFrom: 2000, yearTo: null, component: 'Radiador e berço da bateria — inspeção contra vazamento/ferrugem', intervalKm: 10000, intervalMonths: 12, notes: 'Pontos de falha conhecidos do modelo. Reparo preventivo é bem mais barato que infiltração de água no habitáculo.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Celta', yearFrom: 2000, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Celta',
    yearFrom: 2000,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Celta...')

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

  console.log('✅ Chevrolet Celta concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
