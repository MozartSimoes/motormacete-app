/**
 * Seed Renault Oroch — macetes, problemas, manutenção e calibragem de pneus
 * Picape média derivada do Duster (plataforma B0 Renault-Nissan), caçamba
 * de 683 litros com carga útil de 650-680kg conforme versão. Três
 * motorizações na história recente: 1.6 flex manual, 2.0 flex automático
 * (X-Tronic CVT) e o mais recente 1.3 TCe turbo flex (Outsider, câmbio
 * automático). #53 no ranking de vendas 2025 no Brasil (11.624 un.).
 * Conteúdo mecânico compartilhado com o Duster (motor, diferencial
 * traseiro, câmbio) já casa automaticamente via nome FIPE "Duster Oroch".
 * Execute: pnpm --filter @motormacete/database db:seed:renault-oroch
 *
 * Fontes: mobiauto.com.br, motoragora.com.br, autossegredos.com.br,
 *         renault.com.br, autoentusiastas.com.br, pneuponto.com.br
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
    title: 'Três motores na história recente: confirme qual equipa sua unidade',
    body: 'A Oroch já teve 1.6 flex manual, 2.0 flex automático (câmbio CVT X-Tronic) e o mais recente 1.3 TCe turbo flex (versão Outsider). São motores e câmbios bem diferentes entre si — confirme sempre qual equipa sua unidade antes de orçar peça ou revisão. Boa parte da mecânica de base (diferencial traseiro, plataforma) é compartilhada com o Duster.',
  },
  {
    severity: 'OK',
    title: 'Use os anéis de fixação da caçamba e respeite o limite da tampa traseira',
    body: 'A caçamba tem oito anéis de fixação (cada um suporta até 50 kg) para prender a carga com cinta — use-os sempre que transportar objetos que possam deslizar. A tampa traseira suporta até 80 kg, mas não foi projetada para servir de banco/apoio de peso constante — evite sentar ou pisar nela com frequência.',
  },
  {
    severity: 'WARN',
    title: 'Versão 1.3 TCe turbo: combustível de qualidade é ainda mais importante',
    body: 'O motor 1.3 TCe usa injeção direta, mais sensível à qualidade do combustível que motores de injeção indireta. Alguns proprietários relataram aumento de consumo e perda de potência ligados a problemas no sistema de injeção — abasteça sempre em postos de confiança para reduzir esse risco.',
  },
  {
    severity: 'OK',
    title: 'Respeite a carga útil (650-680 kg conforme versão)',
    body: 'A carga útil máxima é de 650 kg nas versões Intense/Outsider e 680 kg na PRO. Ultrapassar esse limite sobrecarrega suspensão, freios e pneus — distribua o peso de forma equilibrada na caçamba e evite concentrar carga muito atrás do eixo traseiro.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall: falha no computador de direção assistida (versão 1.3 TCe Turbo)',
    body: 'A Renault convocou recall para a Oroch equipada com o motor 1.3 TCe Turbo Flex por falha no computador de direção assistida elétrica — a correção é feita por reprogramação do sistema na concessionária, gratuita. Verifique se sua unidade está na faixa de chassi afetada e agende o reparo assim que possível, mesmo que a direção pareça normal.',
  },
  {
    severity: 'WARN',
    title: 'Direção pesada com o tempo, mesmo após troca da caixa de direção',
    body: 'Há relatos de volante ficando pesado progressivamente, mesmo em unidades onde a caixa de direção já foi trocada — sugerindo que o problema pode estar ligado ao sistema eletro-hidráulico como um todo, não só à caixa isoladamente. Se notar direção pesada mesmo após reparo, insista em diagnóstico mais completo do sistema de assistência antes de aceitar o carro de volta.',
  },
  {
    severity: 'WARN',
    title: 'Falhas na injeção direta (versão 1.3 TCe) e bicos injetores com baixa km',
    body: 'Proprietários relatam defeito em bico injetor mesmo com poucos quilômetros rodados, além de aumento de consumo e perda de potência ligados ao sistema de injeção direta. Se notar esses sintomas, não adie o diagnóstico — problemas de injeção tendem a piorar e podem afetar o catalisador se não tratados a tempo.',
  },
  {
    severity: 'WARN',
    title: 'Ruído e mau funcionamento do ar-condicionado, mesmo em unidades novas',
    body: 'Há queixas de ruído e falhas no ar-condicionado mesmo em carros com poucos quilômetros. Se notar ruído estranho ou perda de eficiência de resfriamento, agende diagnóstico cedo — problemas de AC tendem a se agravar e encarecer o reparo com o tempo.',
  },
  {
    severity: 'WARN',
    title: 'Falhas na transmissão (manual e automática) com custo alto de reparo relatado',
    body: 'Tanto a versão manual quanto a automática tiveram relatos de falha na transmissão, com alguns proprietários relatando custo alto para substituição de peças fora da garantia. Fique atento a qualquer tranco, ruído ou dificuldade de engate e acione a garantia assim que notar o primeiro sinal.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Oroch (Renault + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (1.6, 2.0 ou 1.3 TCe, conforme sua versão) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido — mais frequente pelo uso com carga na caçamba. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 40.000 km — Fluido do diferencial traseiro (compartilhado com o Duster). | 60.000 km — Fluido de arrefecimento. | 60.000-90.000 km — Correia dentada (60.000 km na versão 1.6, 90.000 km na 2.0 — confirme intervalo da 1.3 TCe no manual). | Verificar recall pendente de direção assistida (versão 1.3 TCe) na primeira visita à concessionária.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Oroch',
    yearFrom: null,
    yearTo: null,
    tireSize: '215/60 R16 (compartilhado com o Duster)',
    frontPsi: 30,
    rearPsi: 33,
    frontPsiLoad: 33,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Pressão traseira sobe com carga na caçamba (até 650-680 kg conforme versão). Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Oroch', yearFrom: null, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor (1.6, 2.0 ou 1.3 TCe).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Oroch', yearFrom: null, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Oroch', yearFrom: null, yearTo: null, component: 'Recall de direção assistida (versão 1.3 TCe)', intervalKm: null, intervalMonths: null, notes: 'Verificar na concessionária mesmo sem sintomas aparentes.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Oroch', yearFrom: null, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Oroch', yearFrom: null, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Oroch', yearFrom: null, yearTo: null, component: 'Fluido do diferencial traseiro', intervalKm: 40000, intervalMonths: null, notes: 'Compartilhado com o Duster.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Oroch', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km — reforçado pelo uso com carga.', priority: 'HIGH', order: 6 },
  { modelName: 'Oroch', yearFrom: null, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Renault.', priority: 'HIGH', order: 7 },
  { modelName: 'Oroch', yearFrom: null, yearTo: null, component: 'Ar-condicionado — verificação', intervalKm: null, intervalMonths: 12, notes: 'Histórico de ruído/falha relatado mesmo em unidades novas.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Oroch', yearFrom: null, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce a pressão traseira quando rodar com carga na caçamba.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Oroch',
    yearFrom: null,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Renault Oroch...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Renault', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Renault', vehicleTypeId: carroType.id },
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

  console.log('✅ Renault Oroch concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
