/**
 * Seed Chevrolet Vectra — macetes, problemas, manutenção e calibragem de pneus
 * Sedã (e hatch GT/GT-X) médio da GM no Brasil entre 1993 e 2011, em três
 * gerações (Vectra A 1993-1996, Vectra B/GSi/CD/Elegance/Expression/Collection
 * 1997-2005, Vectra C/GT/GT-X/Elite/Collection 2006-2011). Motores 2.0/2.2/2.4
 * 8V/16V a gasolina e, nas últimas gerações, também Flexpower. Versões
 * GL/GLS/CD/Elegance/Elite/Expression/Collection/GSi. Problema clássico:
 * bobina de ignição e correia dentada.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-vectra
 *
 * Fontes: clubedovectra.com.br, opinautos.com(.br), carroclub.com.br,
 *         acciolygm.com.br, omecanico.com.br, michelin.com.br,
 *         calibrapneu.com.br
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
    title: 'Clube do Vectra: comunidade grande e ativa para tirar dúvida e achar peça',
    body: 'O Vectra tem uma das comunidades de proprietários mais antigas e ativas do país (Clube do Vectra e grupos equivalentes). Antes de pagar por diagnóstico caro em oficina genérica, vale pesquisar o sintoma no fórum — boa parte dos defeitos clássicos (bobina, sensor de rotação, correia de acessórios) já foi discutida em detalhe, com fotos e solução passo a passo.',
  },
  {
    severity: 'WARN',
    title: 'Bobina de ignição: use peça original/homologada, evite a mais barata',
    body: 'Assim como no Astra, a bobina genérica de procedência duvidosa é queixa recorrente entre donos de Vectra — funciona bem por um tempo curto e falha de novo. Ao trocar, prefira peça original GM ou marca homologada (Bosch, Magneti Marelli); o custo extra compensa em confiabilidade.',
  },
  {
    severity: 'OK',
    title: 'Correia dentada: troque por tempo em carro antigo, não só por km',
    body: 'Nos motores Família II 2.0/2.2 8V/16V do Vectra, a Chevrolet recomenda a correia dentada por volta de 50.000-60.000 km, mas em unidades com 15+ anos de idade a borracha degrada mesmo com pouca quilometragem rodada. Se não houver comprovante de troca recente, antecipe — a ruptura da correia neste motor é interferente (danifica válvulas e pistão).',
  },
  {
    severity: 'OK',
    title: 'Peças mecânicas fartas e baratas no mercado paralelo',
    body: 'Por ter sido um dos sedãs mais vendidos do Brasil por quase duas décadas, o Vectra tem um dos maiores estoques de peças alternativas do mercado — suspensão, freios, elétrica de motor e componentes de arrefecimento têm opção de marca confiável em qualquer autopeças de bairro, sem depender de concessionária.',
  },
  {
    severity: 'OK',
    title: 'GT/GT-X (Vectra C): confirme a versão do motor antes de comprar peça',
    body: 'A geração Vectra C (2006-2011) teve motores 2.0 e 2.4 com variações internas entre anos/mercados — ao comprar peça de motor (bobina, sensores, correia), confirme o código do motor pelo chassi/nota fiscal em vez de pedir só "motor do Vectra 2.4", para evitar comprar peça incompatível.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bobina de ignição falhando — sintoma clássico do Vectra',
    body: 'Falha de centelha na bobina de ignição é um dos problemas mais relatados em todas as gerações do Vectra. Sintomas: dificuldade para dar partida a frio, motor "engasgando"/trepidando em marcha lenta, perda de potência, fumaça escura no escapamento e cheiro de combustível não queimado. Não convém adiar o reparo — rodar com falha de ignição prolongada pode danificar o catalisador.',
  },
  {
    severity: 'DANGER',
    title: 'Correia dentada: ruptura causa dano grave ao motor',
    body: 'O motor Família II do Vectra é do tipo "interferente" — se a correia dentada arrebenta, válvulas e pistão podem se chocar, exigindo retífica de cabeçote ou até troca do motor. Como esses carros hoje têm em média 15-30 anos, o risco não é só de quilometragem, é de idade da borracha. Se não tem certeza de quando foi trocada pela última vez, trate como prioridade alta.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de rotação e motor de partida — dificuldade para "pegar"',
    body: 'Há relatos de motor de arranque girando normalmente mas o carro não pegar, frequentemente ligado a falha no sensor de rotação (fônica) ou seus conectores/chicote. Antes de trocar peças caras, vale checar e limpar os conectores dessa região — em muitos casos resolve sem precisar substituir componente.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível acima do esperado após reparos malfeitos',
    body: 'Donos relatam que, mesmo após trocar sensor de marcha lenta, bobina e cabos de vela, o consumo pode piorar em vez de melhorar quando a peça usada não é adequada ou a regulagem/adaptação do módulo de injeção não é refeita corretamente. Depois de qualquer reparo no sistema de ignição/injeção, vale rodar alguns dias e comparar o consumo — se piorar, volte à oficina para revisão do serviço.',
  },
  {
    severity: 'WARN',
    title: 'Correias de acessórios (alternador, direção hidráulica) ressecadas',
    body: 'Em carros mais antigos, é comum encontrar correias de acessórios (não confundir com a correia dentada do comando) ressecadas ou soltando fiapos, causando ruído de rangido ao ligar o motor. Inspecione visualmente essas correias periodicamente — o custo de troca é baixo e evita quebra inesperada que tira o alternador ou a direção hidráulica de funcionamento.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Vectra 2.0/2.2/2.4 8V/16V (ajustado para uso severo/carro antigo no Brasil)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine (versões que possuem). | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 50.000-60.000 km ou 5 anos (o que vier primeiro) — Correia dentada + tensor + bomba d\'água preventivamente. | 60.000 km — Fluido de arrefecimento. | Inspeção periódica das correias de acessórios (alternador/direção hidráulica) por ressecamento. | Rodízio de pneus a cada 10.000 km.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Vectra',
    yearFrom: 1993,
    yearTo: null,
    tireSize: '185/65 R14 · 195/60 R15 · 205/55 R16 (conforme versão/aro/geração)',
    frontPsi: 30,
    rearPsi: 28,
    frontPsiLoad: 32,
    rearPsiLoad: 33,
    sparePsi: 60,
    notes: 'Pressão varia bastante entre as três gerações (A/B/C) e entre aros — confirme sempre na etiqueta da coluna da porta do motorista ou tampa do tanque, que traz o valor exato para o seu chassi.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Vectra', yearFrom: 1993, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Use sempre a viscosidade especificada no manual da sua versão/ano.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Vectra', yearFrom: 1993, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Vectra', yearFrom: 1993, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Vectra', yearFrom: 1993, yearTo: null, component: 'Bobina de ignição — inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Falha clássica do modelo. Use peça original ou de marca homologada.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Vectra', yearFrom: 1993, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor aspirado — intervalo mais generoso que motores turbo.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Vectra', yearFrom: 1993, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Vectra', yearFrom: 1993, yearTo: null, component: 'Correia dentada + tensor', intervalKm: 55000, intervalMonths: 60, notes: 'CRÍTICO: motor interferente, ruptura causa dano grave. Em carro antigo, respeite o prazo de 5 anos mesmo com pouca km rodada.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Vectra', yearFrom: 1993, yearTo: null, component: 'Bomba d\'água — troca preventiva', intervalKm: 55000, intervalMonths: 60, notes: 'Troque junto com a correia dentada — mesmo procedimento de desmontagem.', priority: 'HIGH', order: 7 },
  { modelName: 'Vectra', yearFrom: 1993, yearTo: null, component: 'Correias de acessórios (alternador/direção hidráulica)', intervalKm: 40000, intervalMonths: null, notes: 'Inspecione por ressecamento/fiapos — comum em carro antigo.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Vectra', yearFrom: 1993, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 9 },
  { modelName: 'Vectra', yearFrom: 1993, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado, conforme tipo de tração.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Vectra',
    yearFrom: 1993,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Vectra...')

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

  console.log('✅ Chevrolet Vectra concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
