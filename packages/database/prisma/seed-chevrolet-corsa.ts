/**
 * Seed Chevrolet Corsa — macetes, problemas, manutenção e calibragem de pneus
 * Nameplate mais abrangente da GM no Brasil: hatch (Wind/GL/GLS/Super/Maxx/
 * Premium/Joy/SS), sedan (Classic/Sedan — geração antiga, antes de virar
 * "Classic" isolado), wagon (Corsa Wagon) e a picape (Corsa Pick-Up Champ/
 * Rodeio/Sport). Duas gerações de carroceria bem distintas: Corsa "clássico"
 * (1994-2002, motor 1.0/1.4/1.6 MPFi) e Corsa Hatch/Sedan "Maxx/Premium"
 * (2002-2012, motor 1.0/1.4/1.8 VHC/FlexPower). Todas essas variações usam
 * "Corsa" no nome de modelo na tabela FIPE, por isso ficam num único bloco
 * aqui. Frota enorme ainda em circulação — um dos carros mais populares da
 * história recente do Brasil.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-corsa
 *
 * Fontes: corsaclube.com.br, oficinabrasil.com.br, motoragora.com.br,
 *         doutorie.com.br, opinautos.com.br, mobiauto.com.br, mecpecas.com.br
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
    title: 'Peça compartilhada com Celta, Classic, Prisma (antigo) e Agile',
    body: 'O bloco de motor 1.0/1.4 8V (VHC/FlexPower) do Corsa é o mesmo usado no Celta, Classic, Prisma de geração antiga e Agile. Suspensão, freios e boa parte da elétrica também são compartilhados. Em autopeças, procure por "linha Corsa/Celta" quando faltar cadastro específico da sua versão — reduz preço e amplia a disponibilidade, especialmente em cidades pequenas.',
  },
  {
    severity: 'WARN',
    title: 'Duas gerações bem diferentes: confira qual "Corsa" é o seu antes de comprar peça',
    body: 'O Corsa "clássico" (1994-2002, motor MPFi) e o Corsa Hatch/Sedan Maxx/Premium (2002-2012, motor VHC/FlexPower) são carrocerias e motorizações diferentes, mesmo levando o mesmo nome. Ao comprar peça de motor, suspensão ou funilaria, confirme sempre o ano/geração exata — muita peça não é intercambiável entre as duas fases.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.0 VHC 16V: cuidado redobrado no ajuste do comando',
    body: 'O acerto de ponto/comando de válvulas no motor 1.0 16V é considerado mais delicado do que em motores 8V — vale procurar um mecânico com experiência específica nesse motor, não qualquer oficina genérica. Erro de sincronismo aqui pode custar caro.',
  },
  {
    severity: 'WARN',
    title: 'Nunca rode sem aditivo no radiador achando que "só água resolve"',
    body: 'Água pura no sistema de arrefecimento acelera a corrosão interna e ataca vedações e juntas do motor — problema recorrente em Corsas que rodam só com água. Use sempre o aditivo/fluido de arrefecimento especificado, na proporção correta, mesmo fora de época de calor.',
  },
  {
    severity: 'OK',
    title: 'Corsa Pick-Up: mesma mecânica do hatch, cuidado extra com a suspensão traseira',
    body: 'A picape Corsa (Champ/Rodeio/Sport) usa a mesma base mecânica do hatch/sedan, então boa parte das dicas de motor e manutenção valem igual. A diferença fica na suspensão traseira, reforçada para carga — evite rodar no limite de peso constantemente, isso acelera o desgaste das molas e amortecedores traseiros.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão frágil em uso severo — desgaste acelerado de amortecedores e molas',
    body: 'Há relatos recorrentes de suspensão que não aguenta bem buracos e lombadas mais fortes, com necessidade de trocar amortecedores e molas já com relativamente pouca quilometragem em uso mais severo. Ruído de "batida" na dianteira ou traseira ao passar por imperfeições da pista merece inspeção — não é frescura, é característica conhecida do modelo.',
  },
  {
    severity: 'WARN',
    title: 'Corpo de borboleta (throttle body) com defeito recorrente',
    body: 'Vários donos relatam problema no corpo de borboleta, componente que regula a entrada de ar no motor. Sintomas incluem marcha lenta instável, engasgos e perda de resposta do acelerador. É um dos primeiros pontos a checar em caso de falha de aceleração sem causa aparente.',
  },
  {
    severity: 'WARN',
    title: 'Cold start difícil com gasolina pura (versões flex mais antigas)',
    body: 'Em versões flex, principalmente as mais antigas (Corsa Classic 1.0 VHC flex), é comum dificuldade para dar partida pela manhã e aceleração instável quando o tanque está só com gasolina. Reabastecer com mais etanol costuma resolver — não é necessariamente defeito mecânico.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem e módulo de injeção com vida útil mais curta que o esperado',
    body: 'Proprietários relatam fragilidade da embreagem e do módulo de injeção eletrônica, com defeitos aparecendo em intervalos mais curtos do que seria razoável esperar. Vale rodar com atenção ao comportamento da embreagem (patinação, ponto de embreagem alto) e à luz de injeção no painel.',
  },
  {
    severity: 'WARN',
    title: 'Pré-detonação ("batida de pino") em alguns motores 1.6 8V',
    body: 'Casos relatados de pré-detonação em motor 1.6 8V, associados a distância incorreta entre o sensor de rotação e a roda dentada do virabrequim — ajuste fino de folga costuma resolver. Se notar ruído de "batida" sob aceleração, vale investigar esse ponto específico antes de suspeitar de problema estrutural do motor.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Corsa 1.0/1.4/1.6/1.8 (hatch, sedan, wagon e Pick-Up)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios e suspensão (atenção a amortecedores/molas em uso severo). | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine (versões equipadas). | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4 + kit correia dentada/tensionador (troque a bomba d\'água junto). | 60.000 km — Fluido de arrefecimento (use aditivo especificado, nunca água pura). | Rodízio de pneus a cada 10.000 km — reforce a pressão traseira na versão Pick-Up ao carregar.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Corsa',
    yearFrom: 1994,
    yearTo: null,
    tireSize: '165/70 R13 · 175/70 R13 · 185/60 R14 (varia por versão/geração)',
    frontPsi: 28,
    rearPsi: 26,
    frontPsiLoad: 32,
    rearPsiLoad: 28,
    sparePsi: 60,
    notes: 'Pressão varia bastante entre gerações e versões (hatch, sedan, wagon, Pick-Up). Valores de referência para uso normal x carro carregado — confirme sempre na etiqueta da coluna da porta do motorista ou tampa do tanque, específica do seu ano/versão.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Corsa', yearFrom: 1994, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Viscosidade conforme manual da sua versão/motorização.', priority: 'HIGH', order: 0 },
  { modelName: 'Corsa', yearFrom: 1994, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Corsa', yearFrom: 1994, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em cidades com muita poeira.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Corsa', yearFrom: 1994, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor aspirado — vela convencional.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Corsa', yearFrom: 1994, yearTo: null, component: 'Correia dentada + tensionador', intervalKm: 40000, intervalMonths: 60, notes: 'Aproveite para trocar a bomba d\'água junto. Confirme se a sua motorização usa correia (a maioria dos 1.0/1.4/1.6/1.8 8V usa).', priority: 'CRITICAL', order: 4 },
  { modelName: 'Corsa', yearFrom: 1994, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Corsa', yearFrom: 1994, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Nunca rode só com água — acelera corrosão interna do motor.', priority: 'HIGH', order: 6 },
  { modelName: 'Corsa', yearFrom: 1994, yearTo: null, component: 'Corpo de borboleta — limpeza/inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Ponto de falha conhecido — limpeza preventiva evita marcha lenta instável e engasgos.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Corsa', yearFrom: 1994, yearTo: null, component: 'Amortecedores e molas — inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Suspensão é ponto sensível do modelo em uso severo (buracos, lombadas). Antecipe se notar ruído de batida.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Corsa', yearFrom: 1994, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Na versão Pick-Up, reforce a pressão traseira ao carregar.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Corsa',
    yearFrom: 1994,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Corsa...')

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

  console.log('✅ Chevrolet Corsa concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
