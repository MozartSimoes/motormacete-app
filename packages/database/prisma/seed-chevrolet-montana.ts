/**
 * Seed Chevrolet Montana — macetes, problemas, manutenção e calibragem de pneus
 * Picape média unibody sobre a plataforma do Onix, lançada em 2023 (nova geração,
 * sem relação mecânica com o Montana antigo baseado no Agile). Motor único
 * 1.2 Turbo Flex de 3 cilindros (132cv/190Nm; 141cv etanol na linha 2025 com
 * injeção direta), câmbio manual 6 marchas ou automático 6 marchas (versões
 * LTZ/Premier/RS). #37 no ranking de vendas 2025 no Brasil (20.384 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-montana
 *
 * Fontes: clickpetroleoegas.com.br, motoragora.com.br, mobiauto.com.br,
 *         autoentusiastas.com.br, reclameaqui.com.br, turbonoticias.com.br,
 *         cnnbrasil.com.br, autossegredos.com.br
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
    title: 'Três modos de calibragem no painel: use o certo para cada situação',
    body: 'A Montana tem três pressões de referência sugeridas pela Chevrolet, selecionáveis no painel de instrumentos: modo Conforto (30 PSI, dirigibilidade mais macia), modo Eco (35 PSI, menor consumo) e modo Carga (35 PSI dianteiro / 39 PSI traseiro, para levar peso na caçamba). O painel só exibe a referência — a calibragem manual do pneu no calibrador continua sendo sua responsabilidade. Ajuste fisicamente a pressão conforme o modo que for usar.',
  },
  {
    severity: 'OK',
    title: 'Capacidade de carga: até 637 kg na caçamba (versão Premier)',
    body: 'A Montana não é uma picape 4x4 nem de trabalho pesado — a carga máxima da versão Premier é de 637 kg. Respeite esse limite: exceder a capacidade de carga sobrecarrega suspensão, freios e pneus, e pode gerar desgaste prematuro ou comprometer a estabilidade em curvas e frenagens.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.2 turbo: injeção direta pede combustível de qualidade',
    body: 'A partir da linha 2025, o motor 1.2 Turbo passou a usar injeção direta de combustível (mudança que elevou a potência de 133cv para 141cv com etanol). Motores de injeção direta são mais sensíveis à qualidade do combustível — abasteça sempre em postos de confiança para reduzir o risco de depósito nos bicos injetores e nas válvulas de admissão.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio manual x automático: escolha conforme o uso',
    body: 'A Montana oferece manual de 6 marchas (versões de entrada) e automático de 6 marchas — não CVT — nas versões LTZ, Premier e RS. Se for usar a picape com carga frequente ou reboque leve, o automático tende a sofrer menos com trocas de marcha sob carga que um motorista inexperiente faria no manual, mas ambos são projetados para o mesmo motor turbo. Escolha conforme conforto de uso, não existe "melhor" universal.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Luz de injeção acesa e parada do veículo com baixa quilometragem',
    body: 'Há relatos recorrentes de proprietários com o carro parando ou acendendo a luz de injeção no painel mesmo com poucos milhares de km rodados, em alguns casos repetindo o problema múltiplas vezes em menos de um ano. Se isso acontecer, não ignore reincidências — documente cada ocorrência e exija diagnóstico completo por scanner na concessionária, cobrando solução definitiva e não apenas reset da luz.',
  },
  {
    severity: 'WARN',
    title: 'Vedação da caçamba não totalmente adaptada ao uso severo brasileiro',
    body: 'A GM identificou que o projeto de vedação da caçamba (junção entre caçamba e cabine) não estava totalmente adaptado às condições de uso mais severas do Brasil, permitindo entrada de água/poeira em alguns casos. A montadora tem aplicado kits de vedação adicionais em garantia. Se notar infiltração ou acúmulo de poeira na área de carga/cabine, procure a concessionária para verificar se o kit já foi aplicado na sua unidade.',
  },
  {
    severity: 'WARN',
    title: 'Ruídos internos de plástico ("festival de grilos")',
    body: 'Queixa muito comum entre donos são ruídos de plástico vibrando contra plástico vindos do painel, forros de porta e console central — apelidados de "festival de grilos" nos fóruns. Não indica risco mecânico, mas incomoda no dia a dia. Vale reportar na revisão para a concessionária aplicar reforços/espuma nos pontos de contato, prática já reconhecida pela rede.',
  },
  {
    severity: 'WARN',
    title: 'Ruídos de suspensão relatados após a compra',
    body: 'Existem relatos de ruído de suspensão surgindo já nos primeiros meses de uso, com atendimento em algumas concessionárias sendo lento ou questionando se é caso de mau uso. Documente o ruído com vídeo/data assim que perceber e formalize a reclamação por escrito na concessionária — isso fortalece o histórico caso a garantia seja contestada.',
  },
  {
    severity: 'WARN',
    title: 'Bugs no espelhamento sem fio (Android Auto/Apple CarPlay) da multimídia',
    body: 'A integração da central multimídia com espelhamento sem fio do celular apresenta instabilidades em algumas unidades. A GM já liberou atualizações de software para melhorar isso — se sua Montana apresentar travamentos ou desconexões no espelhamento, peça a atualização de software da central multimídia na próxima visita à concessionária.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Montana 1.2 Turbo (Chevrolet + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (especificação 0W20 conforme manual) + filtro de óleo — não substitua por viscosidade diferente da recomendada, o motor turbo de injeção direta é sensível a isso. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático (versões AT), mesmo sendo anunciado como de baixa manutenção — antecipe se notar trancos. | Correia dentada em banho de óleo — vida útil longa (até 240.000 km conforme fabricante), mas confirme o intervalo exato no manual da sua versão/ano. | Vedação da caçamba — inspecione após períodos de chuva forte, especialmente unidades mais antigas sem o kit de vedação atualizado.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Montana',
    yearFrom: 2023,
    yearTo: null,
    tireSize: '205/60 R16 · 205/55 R17 (LTZ) · 225/50 R18 (Premier/RS)',
    frontPsi: 30,
    rearPsi: 30,
    frontPsiLoad: 35,
    rearPsiLoad: 39,
    sparePsi: 60,
    notes: 'A Montana tem 3 modos de pressão de referência selecionáveis no painel: Conforto (30 PSI), Eco (35 PSI) e Carga (35 PSI dianteiro / 39 PSI traseiro). O painel apenas indica o valor — a calibragem física precisa ser feita manualmente no calibrador. Confirme o valor exato do seu aro/versão na etiqueta da coluna da porta.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Montana', yearFrom: 2023, yearTo: null, component: 'Óleo do motor (0W20)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor turbo de injeção direta (linha 2025+) é sensível à viscosidade errada — siga exatamente a especificação do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Montana', yearFrom: 2023, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Montana', yearFrom: 2023, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em regiões com muita poeira.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Montana', yearFrom: 2023, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Montana', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 4 },
  { modelName: 'Montana', yearFrom: 2023, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 5 },
  { modelName: 'Montana', yearFrom: 2023, yearTo: null, component: 'Óleo do câmbio automático (versões LTZ/Premier/RS)', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar trancos nas trocas de marcha.', priority: 'HIGH', order: 6 },
  { modelName: 'Montana', yearFrom: 2023, yearTo: null, component: 'Vedação da caçamba — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Verificar se o kit de vedação atualizado (aplicado em garantia pela GM) já foi instalado na unidade.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Montana', yearFrom: 2023, yearTo: null, component: 'Atualização de software da central multimídia', intervalKm: null, intervalMonths: 12, notes: 'Corrige bugs conhecidos de espelhamento sem fio (Android Auto/CarPlay).', priority: 'LOW', order: 8 },
  { modelName: 'Montana', yearFrom: 2023, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Ajuste a pressão conforme o modo (Conforto/Eco/Carga) antes de rodar.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Montana',
    yearFrom: 2023,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Montana...')

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

  console.log('✅ Chevrolet Montana concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
