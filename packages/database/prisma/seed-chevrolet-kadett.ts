/**
 * Seed Chevrolet Kadett — macetes, problemas, manutenção e calibragem de pneus
 * Hatch/sedã compacto da GM do Brasil, produzido de 1989 a 1998 (baseado no Opel
 * Kadett E). Motores 1.8 e 2.0, a gasolina ou álcool, com carburador nas versões
 * iniciais e injeção eletrônica monoponto (EFI) a partir do início dos anos 1990.
 * Versões GL, GLS, SL e a esportiva GSi (a mais valorizada por colecionadores,
 * com painel digital e opção de teto solar). Substituído pelo Astra em 1998.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-kadett
 *
 * Fontes: en.wikipedia.org (Chevrolet Kadett), carroclub.com.br, motoragora.com.br,
 *         encontracarros.com.br, forum.monzeiros.com, bielaautopecas.com,
 *         opinautos.com.br
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
    title: 'Mecânica simples e peças ainda fartas — bom carro para manutenção caseira/DIY',
    body: 'O Kadett tem mecânica relativamente simples para os padrões da época, sem eletrônica complexa (fora as versões EFI mais novas), e peças de desgaste (junta, retentor, correia, filtro) ainda são fáceis de achar em qualquer cidade média. É um bom carro para quem gosta de colocar a mão na massa — mas confirme sempre se a peça é para motor 1.8 ou 2.0, e para versão carburada ou EFI, antes de comprar.',
  },
  {
    severity: 'WARN',
    title: 'Versões EFI monoponto (1992-1998) pedem atenção redobrada aos sensores',
    body: 'A injeção eletrônica monoponto do Kadett é mais simples que sistemas modernos, mas mesmo assim depende de sensores (posição da borboleta, temperatura da água) e do módulo HEI (ignição, dentro do distribuidor) em bom estado. Falha nesses componentes causa marcha lenta instável, falha de partida ou perda de potência — antes de suspeitar do motor em si, cheque esses itens elétricos, que são causa mais comum e mais barata de resolver.',
  },
  {
    severity: 'OK',
    title: 'GSi: cuide bem do painel digital e do teto solar — são os itens mais difíceis de repor',
    body: 'A versão GSi trouxe painel de instrumentos digital e opção de teto solar elétrico, itens raros para a época e hoje difíceis de encontrar em bom estado no mercado paralelo. Painel quebrado costuma dar trabalho para substituir (poucas unidades sobrando) e teto solar com infiltração exige vedação cuidadosa. Se comprar um GSi, teste esses dois itens com atenção redobrada antes de fechar negócio.',
  },
  {
    severity: 'OK',
    title: 'Vazamento de óleo pela tampa de válvulas é comum e barato de resolver',
    body: 'É um dos vazamentos mais frequentes do motor 1.8/2.0 — a junta da tampa de válvulas resseca com o tempo. Custo de troca é baixo comparado a outros reparos do carro; não vale a pena conviver com manchas de óleo no motor por muito tempo, já que sujeira acumulada dificulta identificar outros vazamentos mais sérios depois.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela junta da tampa de válvulas e respiros',
    body: 'Queixa recorrente entre donos de Kadett — vazamento pela junta da tampa de válvulas e por respiros do motor. Resolve-se com troca de junta, serviço relativamente simples e barato; fique de olho no nível de óleo enquanto não resolver.',
  },
  {
    severity: 'WARN',
    title: 'Falha no módulo HEI de ignição (versões EFI)',
    body: 'O módulo HEI, que fica dentro do distribuidor, é ponto de falha conhecido nas versões com injeção EFI monoponto (1992 em diante). Sintoma: dificuldade de partida, motor "morrendo" sem causa aparente ou perda de potência. É item relativamente acessível de trocar — não é preciso desconfiar de problema grave no motor antes de checar o módulo.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de arrefecimento exige atenção — superaquecimento é queixa relatada',
    body: 'Proprietários relatam problemas no sistema de arrefecimento ao longo dos anos de uso — vazamentos, radiador entupido ou bomba d\'água fraca. Verifique o nível do reservatório periodicamente e não ignore o ponteiro de temperatura subindo mais que o normal.',
  },
  {
    severity: 'WARN',
    title: 'Teto solar (GSi) sofre com infiltração de água',
    body: 'Especificamente na versão GSi, o teto solar é queixa recorrente de infiltração de água quando a vedação de borracha resseca. Inspecione a vedação periodicamente, principalmente antes do período de chuva, e evite lavar o carro com jato de alta pressão direto na região do teto solar.',
  },
  {
    severity: 'OK',
    title: 'Painel digital do GSi é frágil e difícil de repor quando quebra',
    body: 'O painel de instrumentos digital da versão GSi, embora charmoso, é item raro hoje em dia — quando quebra, encontrar substituto em bom estado é trabalhoso. Evite mexer no painel sem necessidade e, se notar falha intermitente, procure resolver logo antes que piore e force a busca por peça de reposição.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Kadett 1.8/2.0 (carburado ou EFI)',
    body: '5.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de vazamentos (tampa de válvulas, retentores) e nível de arrefecimento. | 10.000 km — Regulagem de carburador (versões carburadas) ou checagem dos sensores de injeção (versões EFI). | 15.000-20.000 km — Velas de ignição. | 20.000 km — Filtro de ar. | 20.000 km — Correia dentada/de acessórios — inspeção visual de ressecamento e trinca. | 30.000 km — Fluido de freio. | 40.000-60.000 km — Correia dentada — troca preventiva se o motor da sua versão usar correia (confirme no manual/com mecânico de confiança). | Anual, antes do período chuvoso — Inspeção da vedação do teto solar (GSi).',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Kadett',
    yearFrom: 1989,
    yearTo: 1998,
    tireSize: '175/70 R13 · 185/60 R14 (versões GSi/GLS com roda maior)',
    frontPsi: 28,
    rearPsi: 28,
    frontPsiLoad: 30,
    rearPsiLoad: 32,
    sparePsi: 32,
    notes: 'Valores aproximados de referência para pneu aro 13/14 — confirme sempre na etiqueta da coluna da porta do motorista ou no manual do proprietário, já que a pressão original varia por versão e tipo de pneu instalado.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Kadett', yearFrom: 1989, yearTo: 1998, component: 'Óleo do motor + filtro', intervalKm: 5000, intervalMonths: 6, notes: 'Motor 1.8/2.0 aspirado carburado ou EFI — não estenda o intervalo além do recomendado.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Kadett', yearFrom: 1989, yearTo: 1998, component: 'Junta da tampa de válvulas — inspeção de vazamento', intervalKm: 15000, intervalMonths: 12, notes: 'Vazamento é queixa recorrente e barata de resolver — não deixe acumular sujeira no motor.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Kadett', yearFrom: 1992, yearTo: 1998, component: 'Módulo HEI e sensores de injeção (versões EFI) — inspeção', intervalKm: 20000, intervalMonths: 12, notes: 'Ponto de falha conhecido nas versões com injeção EFI monoponto. Causa comum de falha de partida.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Kadett', yearFrom: 1989, yearTo: 1998, component: 'Velas de ignição', intervalKm: 20000, intervalMonths: null, notes: 'Ajuste o intervalo conforme uso a álcool ou gasolina — álcool tende a sujar mais rápido.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Kadett', yearFrom: 1989, yearTo: 1998, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: 12, notes: 'Reduza o intervalo em cidades com muita poeira.', priority: 'LOW', order: 4 },
  { modelName: 'Kadett', yearFrom: 1989, yearTo: 1998, component: 'Correia dentada/de acessórios — inspeção', intervalKm: 20000, intervalMonths: 12, notes: 'Borracha antiga resseca mesmo sem uso intenso — inspecione trinca visualmente.', priority: 'HIGH', order: 5 },
  { modelName: 'Kadett', yearFrom: 1989, yearTo: 1998, component: 'Fluido de freio', intervalKm: 30000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Kadett', yearFrom: 1989, yearTo: 1998, component: 'Correia dentada — troca preventiva', intervalKm: 50000, intervalMonths: 48, notes: 'Confirme se sua versão usa correia ou corrente antes de agendar o serviço.', priority: 'HIGH', order: 7 },
  { modelName: 'Kadett', yearFrom: 1989, yearTo: 1998, component: 'Vedação do teto solar (versão GSi)', intervalKm: null, intervalMonths: 12, notes: 'Inspecionar antes do período de chuva — infiltração é queixa recorrente na versão GSi.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Kadett', yearFrom: 1989, yearTo: 1998, component: 'Sistema de arrefecimento (radiador, mangueiras, bomba d\'água)', intervalKm: 30000, intervalMonths: 24, notes: 'Superaquecimento é queixa relatada — não espere o ponteiro subir para agir.', priority: 'HIGH', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Kadett',
    yearFrom: 1989,
    yearTo: 1998,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Kadett...')

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

  console.log('✅ Chevrolet Kadett concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
