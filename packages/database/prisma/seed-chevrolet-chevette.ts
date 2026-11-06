/**
 * Seed Chevrolet Chevette + Chevy 500 — macetes, problemas, manutenção e calibragem
 * Sedã/hatch compacto muito popular da GM do Brasil, produzido de 1973 a 1993
 * (baseado no GM T-car / Opel Kadett C). Motores 1.0, 1.4 e 1.6, a gasolina ou
 * álcool, carburados na quase totalidade da produção — sem eletrônica embarcada,
 * um dos carros mecanicamente mais simples já vendidos no Brasil. A picape Chevy
 * 500, derivada do Chevette e lançada no início dos anos 1980 (produzida até 1994),
 * compartilha toda a mecânica — motor, câmbio, freios, suspensão dianteira — com
 * o Chevette, sendo tratada aqui como parte do mesmo bloco/modelName.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-chevette
 *
 * Fontes: motoragora.com.br, motores100fronteiras.com.br, en.wikipedia.org
 *         (Chevrolet Chevette), chevetteclubeamericana.webnode.com.br,
 *         blog.checkcarro.com.br, calibragemdepneu.com.br, opinautos.com
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
    title: 'Carro extremamente simples — ótimo para manutenção caseira/DIY',
    body: 'Sem injeção eletrônica, sem eletrônica embarcada de qualquer tipo — o Chevette (e a Chevy 500) é um dos carros mais fáceis de mexer sozinho: carburador, distribuidor com platinado (nas versões mais antigas) e mecânica totalmente manual. Com um jogo básico de ferramentas e um manual de oficina, dá para fazer boa parte da manutenção em casa, incluindo troca de óleo, velas, platinado e regulagem de carburador.',
  },
  {
    severity: 'OK',
    title: 'Chevy 500 compartilha toda a mecânica com o Chevette — peça sempre "para Chevette" ao procurar peça',
    body: 'Motor, câmbio, freios e suspensão dianteira da picape Chevy 500 são idênticos aos do Chevette sedã/hatch da mesma época. Ao procurar peça em loja ou desmanche, use o termo "Chevette" — o catálogo de peças da picape costuma ser tratado junto, e a disponibilidade é maior buscando pelo nome mais popular.',
  },
  {
    severity: 'OK',
    title: 'Peças ainda fartas e baratas — motor simples foi usado por décadas',
    body: 'A simplicidade mecânica do Chevette significa peças de motor, ignição e carburação ainda circulando facilmente no mercado paralelo, em preço geralmente baixo comparado a outros clássicos. Vale procurar por "motor 1.0/1.4/1.6 GM Chevette" — nomenclatura comum em catálogos de retífica.',
  },
  {
    severity: 'OK',
    title: 'Regulagem de carburador e ponto de ignição bem feitos resolvem a maior parte dos problemas de desempenho',
    body: 'Boa parte das queixas de "falta de força" ou "engasgo" em Chevette se resolve com regulagem correta do carburador e do ponto de ignição — muitas vezes um item foi mexido errado em revisão anterior. Antes de suspeitar de problema mais sério no motor, vale checar esses dois ajustes básicos, que qualquer oficina de bairro consegue fazer.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste de componentes internos do motor em unidades muito rodadas',
    body: 'Em exemplares com muita quilometragem e histórico de manutenção incerto, é comum desgaste de pistões, válvulas e bomba de combustível, resultando em perda de desempenho e maior consumo de óleo. Se comprar um Chevette usado, vale fazer uma compressão de motor antes de fechar negócio, para ter ideia real do estado interno.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedores e buchas de suspensão desgastam com o tempo, comprometendo conforto e desgaste de pneu',
    body: 'A suspensão do Chevette, como a de qualquer carro de décadas de uso, tende a acumular folga em amortecedores e buchas — isso afeta o conforto e causa desgaste irregular dos pneus. É item de baixo custo de reposição; não vale a pena rodar com folga por muito tempo.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem em carrocerias mais antigas, principalmente em soleira e assoalho',
    body: 'Com a idade dos exemplares hoje (muitos com 30-50 anos), ferrugem estrutural é queixa comum, especialmente em carros que rodaram perto do litoral ou ficaram guardados em local úmido. Inspecione por baixo do carro periodicamente e trate qualquer ponto de corrosão assim que aparecer.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Chevette/Chevy 500 1.0/1.4/1.6 (carburado)',
    body: '3.000-5.000 km — Troca de óleo do motor + filtro (motor carburado antigo pede intervalo curto). | 5.000-10.000 km — Regulagem de carburador e ponto de ignição. | 10.000-15.000 km — Platinado, condensador e velas (versões com ignição por platinado). | 15.000 km — Inspeção de amortecedores e buchas da suspensão. | 20.000 km — Filtro de ar. | Anual — Fluido de freio. | Anual — Inspeção de ferrugem em soleira e assoalho, com tratamento imediato de qualquer ponto encontrado. | Compressão de motor (na compra de um usado) — bom indicador do estado real do motor antes de negociar.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Chevette',
    yearFrom: 1973,
    yearTo: 1994,
    tireSize: '155/80 R13 · 165/70 R13 · 175/70 R13 (varia por versão/época)',
    frontPsi: 26,
    rearPsi: 28,
    frontPsiLoad: 28,
    rearPsiLoad: 32,
    sparePsi: 32,
    notes: 'Valores aproximados de referência para pneu aro 13 — inclui também a picape Chevy 500, que costuma pedir traseira um pouco mais firme por conta da caçamba. Confirme sempre na etiqueta da coluna da porta do motorista ou manual do proprietário.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Chevette', yearFrom: 1973, yearTo: 1994, component: 'Óleo do motor + filtro', intervalKm: 4000, intervalMonths: 6, notes: 'Motor carburado antigo — intervalo curto reduz desgaste interno.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Chevette', yearFrom: 1973, yearTo: 1994, component: 'Regulagem de carburador e ponto de ignição', intervalKm: 8000, intervalMonths: 12, notes: 'Resolve boa parte das queixas de falta de força/engasgo.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Chevette', yearFrom: 1973, yearTo: 1990, component: 'Platinado, condensador e velas', intervalKm: 12000, intervalMonths: 12, notes: 'Aplica-se a versões com ignição por platinado, comuns até fim dos anos 1980.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Chevette', yearFrom: 1973, yearTo: 1994, component: 'Amortecedores e buchas da suspensão — inspeção', intervalKm: 15000, intervalMonths: 12, notes: 'Folga acumulada compromete conforto e causa desgaste irregular de pneu.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Chevette', yearFrom: 1973, yearTo: 1994, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: 12, notes: 'Reduza o intervalo em cidades com muita poeira.', priority: 'LOW', order: 4 },
  { modelName: 'Chevette', yearFrom: 1973, yearTo: 1994, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Chevette', yearFrom: 1973, yearTo: 1994, component: 'Inspeção de ferrugem (soleira, assoalho)', intervalKm: null, intervalMonths: 12, notes: 'Exemplares hoje têm décadas de idade — trate corrosão assim que aparecer.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Chevette', yearFrom: 1973, yearTo: 1994, component: 'Compressão do motor (na compra de usado)', intervalKm: null, intervalMonths: null, notes: 'Melhor forma de avaliar o estado interno do motor antes de negociar a compra.', priority: 'LOW', order: 7 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Chevette',
    yearFrom: 1973,
    yearTo: 1994,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Chevette + Chevy 500...')

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

  console.log('✅ Chevrolet Chevette + Chevy 500 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
