/**
 * Seed Chevrolet Silverado — macetes, problemas, manutenção e calibragem de pneus
 * O nome "Silverado" cobre DUAS eras muito diferentes no catálogo brasileiro:
 * (a) 1997-2001: picape/utilitário pesado a diesel (DLX, Conquest, Tropical),
 *     motor MWM 4.2 turbodiesel de 168 cv, tração traseira, mecânica simples
 *     e robusta, irmã de plataforma da Grand Blazer DLX; e
 * (b) 2020+: picape full-size importada "Silverado High Country 5.3 V8 AWD",
 *     motor V8 a gasolina, injeção eletrônica moderna, vendida oficialmente
 *     pela rede Chevrolet, muito cara de manter no Brasil (peça vem dos EUA/
 *     México). São veículos sem qualquer parentesco mecânico — tratados aqui
 *     como blocos separados por ano.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-silverado
 *
 * Fontes: retornar.com.br, encontracarros.com.br, icarros.com.br,
 *         carrosnaweb.com.br, amantesdecarros.com.br, autolivraria.com.br,
 *         4x4brasil.com.br, motoragora.com.br, en.wikipedia.org (Chevrolet
 *         Silverado), magodoscarros.com, seucarrousado.com.br,
 *         mercadolivre.com.br/blog, carro.blog.br, jantes-e-pneus.com,
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

// ─── Silverado DLX/Conquest/Tropical — diesel (1997-2001) ─────────────────

const MACETES_DIESEL: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor MWM 4.2 turbodiesel: robusto e com peças amplamente disponíveis',
    body: 'O motor MWM 4.2 turbo (6 cilindros, bomba injetora rotativa Bosch, 168 cv e 43,3 kgfm) é da mesma família de motores usados em caminhões e tratores no Brasil — isso significa peças e mecânicos acostumados com o motor em praticamente qualquer cidade, mesmo décadas depois do fim da produção. É um dos poucos pontos fáceis de manter em um utilitário já com 25+ anos.',
  },
  {
    severity: 'WARN',
    title: 'Não economize na troca de óleo — é a causa mais comum de problema nesse motor',
    body: 'É recorrente encontrar Silverado/Conquest/Tropical desse período com manutenção de óleo negligenciada — motorista investe em diesel mas atrasa a troca de óleo e filtros. Em um motor diesel turbo de mais de duas décadas, isso é a receita mais direta para desgaste prematuro. Se for comprar um usado dessa geração, exija o histórico de troca de óleo antes de fechar negócio.',
  },
  {
    severity: 'WARN',
    title: 'Fique de olho no esticador da correia poly-V',
    body: 'O esticador da correia poly-V é um ponto de atenção conhecido nesses motores — desgasta e passa a gerar ruído perceptível. Inspecione periodicamente e não adie a troca quando notar barulho, já que a correia poly-V aciona itens importantes (alternador, bomba d\'água, direção hidráulica).',
  },
  {
    severity: 'WARN',
    title: 'Verifique corrosão estrutural antes de confiar em uso severo',
    body: 'Já são veículos com mais de duas décadas — inspecione o chassi (longarina), o soalho e os pontos de fixação da suspensão contra ferrugem estrutural antes de usar a picape para trabalho pesado ou reboque. Corrosão nesses pontos é mais preocupante do que ferrugem estética na lataria.',
  },
  {
    severity: 'OK',
    title: 'Só tração traseira (sem 4x4 no Brasil) — mecânica mais simples que a concorrência da época',
    body: 'A Silverado vendida no Brasil nesse período não teve versão 4x4, apenas tração traseira. Isso significa menos componentes (sem caixa de transferência, sem diferencial dianteiro) e, na prática, menos pontos de falha para cuidar em comparação com picapes 4x4 concorrentes da mesma época.',
  },
]

const PROBLEMAS_DIESEL: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Manutenção de óleo/filtro atrasada é a causa mais citada de problema no motor',
    body: 'O relato mais recorrente sobre essa geração não é uma falha de projeto específica, mas sim negligência de manutenção — "investe em diesel e não troca nem o óleo". Se o motor apresentar fumaça, perda de potência ou ruído anormal, o primeiro suspeito deve ser o histórico de troca de óleo e filtros, não necessariamente um defeito grave.',
  },
  {
    severity: 'WARN',
    title: 'Esticador da correia poly-V desgasta e gera ruído',
    body: 'Ruído vindo da região da correia poly-V costuma apontar para o esticador desgastado. É peça relativamente barata e evita problema maior se trocada a tempo — não convive bem com esse ruído por muito tempo.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão estrutural em unidades mal cuidadas',
    body: 'Por serem veículos antigos, exemplares que rodaram perto do litoral ou ficaram muito tempo ao relento podem ter corrosão estrutural em longarina e soalho. Vale inspeção por baixo antes de qualquer uso mais exigente.',
  },
  {
    severity: 'WARN',
    title: 'Bomba injetora rotativa: manutenção exige oficina especializada em diesel antigo',
    body: 'A bomba injetora rotativa Bosch precisa de regulagem e manutenção específicas de motor diesel mecânico — cada vez menos oficinas têm prática com esse tipo de sistema, já que a maioria dos diesel modernos usa common rail. Procure oficinas especializadas em diesel antigo ou em motores MWM antes de deixar qualquer um mexer na bomba injetora.',
  },
  {
    severity: 'WARN',
    title: 'Peças de acabamento e elétrica de época ficam cada vez mais escassas',
    body: 'Itens como comandos elétricos, plásticos internos e peças específicas de acabamento (não relacionadas ao motor MWM) são mais difíceis de achar hoje, diferente das peças mecânicas do motor, que continuam fartas. Para restauro ou uso de longo prazo, vale garimpar e guardar peças de acabamento quando aparecerem.',
  },
]

const MANUTENCAO_DIESEL: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Silverado DLX/Conquest/Tropical 4.2 Diesel (recomendações gerais — confirme intervalos originais quando possível)',
    body: '5.000-10.000 km — Troca de óleo do motor diesel + filtro de óleo — não atrase, é o cuidado mais importante nesse motor. | 10.000-15.000 km — Filtro de combustível diesel — decantador de água também merece inspeção periódica. | Periódico — Inspeção do esticador e da correia poly-V. | Periódico — Verificação do sistema de arrefecimento (radiador, mangueiras, bomba d\'água). | Anual — Inspeção do chassi/longarina e soalho contra corrosão estrutural, principalmente em regiões litorâneas. | Conforme necessidade — Regulagem da bomba injetora rotativa, sempre em oficina especializada em diesel mecânico antigo.',
  },
]

// ─── Silverado High Country 5.3 V8 AWD — importada (2020+) ────────────────

const MACETES_HIGH_COUNTRY: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Não é flex — abasteça só com gasolina, nunca etanol',
    body: 'Diferente das picapes nacionais (S10, Ranger, Hilux, todas flex), a Silverado High Country importada roda com motor V8 5.3 calibrado para gasolina dos EUA/México, sem sistema flex-fuel. Abastecer com etanol pode causar falha de funcionamento e até dano ao motor — use sempre gasolina, de preferência aditivada, e confirme essa orientação com a concessionária antes de rodar.',
  },
  {
    severity: 'WARN',
    title: 'Peça vem de fora — planeje prazo maior para qualquer reparo',
    body: 'Por ser importada dos EUA/México, o fluxo de peças de reposição da Silverado é mais lento que o de uma picape nacional. Um reparo que levaria dias em uma S10 pode levar semanas aqui, dependendo do item. Vale já ter uma concessionária de referência e, se possível, acompanhar o histórico de disponibilidade de peças antes de comprar.',
  },
  {
    severity: 'OK',
    title: 'Venda oficial GM: aproveite garantia de fábrica e revisão com preço fixo',
    body: 'Diferente de esportivos trazidos por importadoras paralelas (Camaro clássico, Corvette), a Silverado High Country é vendida oficialmente pela rede Chevrolet, com garantia de fábrica de três anos e programa de revisão com preço fixo. Use a rede oficial — é o jeito mais seguro de lidar com uma picape desse porte e sofisticação eletrônica no Brasil.',
  },
  {
    severity: 'WARN',
    title: 'Custo de posse é bem mais alto que o de uma picape nacional — planeje o orçamento',
    body: 'Um jogo completo de pneus pode custar entre R$ 8 mil e R$ 12 mil, o seguro costuma ficar entre R$ 10 mil e R$ 20 mil por ano, e o IPVA de um modelo novo pode passar de R$ 20 mil por ano em estados com alíquota mais alta. Esses custos recorrentes pesam tanto quanto o preço de compra — considere isso antes de assumir a picape.',
  },
  {
    severity: 'OK',
    title: 'Consumo de picape full-size a gasolina: ajuste a expectativa',
    body: 'O consumo fica entre 4 e 6 km/l na cidade e até 8 km/l na estrada — números normais para uma picape full-size V8 a gasolina, mas bem distantes de uma picape média nacional. Se o uso for majoritariamente urbano, o combustível será um dos maiores itens do custo mensal do carro.',
  },
]

const PROBLEMAS_HIGH_COUNTRY: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sofisticação eletrônica encarece qualquer reparo de módulo',
    body: 'Telas grandes, sistemas de assistência ao motorista e módulos eletrônicos deixam a Silverado High Country muito mais sofisticada que a geração diesel antiga — o lado ruim é que qualquer reparo eletrônico tende a ser caro e depender de peça importada, sem o mesmo volume de mercado paralelo que picapes nacionais têm.',
  },
  {
    severity: 'WARN',
    title: 'Dimensões full-size dificultam o dia a dia em cidade brasileira',
    body: 'Não é uma falha mecânica, mas o tamanho da picape (bem maior que uma S10 ou Ranger) aumenta o risco de batidas em manobra, vagas apertadas e garagens estreitas — o que na prática gera mais reparo em para-choque, espelho e sensores de estacionamento, todos itens caros por serem peça importada.',
  },
  {
    severity: 'OK',
    title: 'Rede de suporte especializado ainda em expansão no Brasil',
    body: 'Por ser um lançamento recente no mercado brasileiro, a rede de oficinas com prática real na Silverado High Country (fora da rede oficial Chevrolet) ainda é pequena. Priorize a concessionária para qualquer serviço fora do básico enquanto essa expertise não se espalha para oficinas independentes.',
  },
]

const MANUTENCAO_HIGH_COUNTRY: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Silverado High Country 5.3 V8 (siga o monitor de vida útil do óleo + revisão oficial)',
    body: '10.000-12.000 km ou conforme o monitor de vida útil do óleo (Oil Life Monitor) no painel — Troca de óleo sintético do motor + filtro. | Conforme cronograma oficial Chevrolet — Revisões programadas com preço fixo, sempre na rede autorizada. | Periódico — Rodízio de pneus LT, considerando o custo elevado do jogo completo. | Periódico — Verificação do sistema de arrefecimento e fluidos, seguindo especificação de fábrica (não usar fluido genérico). | Sempre — Abastecer somente com gasolina (o carro não é flex) e de preferência aditivada.',
  },
]

// ─── Consolidação ───────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Silverado',
    yearFrom: 1997,
    yearTo: 2001,
    tireSize: '215/80 R16 (aro 16, rodas de aço)',
    frontPsi: 30,
    rearPsi: 35,
    frontPsiLoad: 35,
    rearPsiLoad: 45,
    sparePsi: 45,
    notes: 'Picape/utilitário de carga — pressão traseira sobe bastante com carga plena. Valor de fábrica pode variar entre DLX/Conquest/Tropical; confirme na etiqueta da porta ou manual, se disponível no exemplar.',
  },
  {
    modelName: 'Silverado',
    yearFrom: 2020,
    yearTo: null,
    tireSize: 'LT275/65 R20 (aro 20, pneu Light Truck)',
    frontPsi: 35,
    rearPsi: 35,
    frontPsiLoad: 50,
    rearPsiLoad: 60,
    sparePsi: 60,
    notes: 'Pneu LT (Light Truck) pede pressão bem mais alta em carga plena do que um pneu de passeio comum — pode chegar a 50-60 psi dependendo da carga. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Silverado', yearFrom: 1997, yearTo: 2001, component: 'Óleo do motor diesel MWM 4.2', intervalKm: 7500, intervalMonths: 6, notes: 'Não atrase — a manutenção de óleo negligenciada é a causa mais citada de problema nesse motor.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Silverado', yearFrom: 1997, yearTo: 2001, component: 'Filtro de óleo', intervalKm: 7500, intervalMonths: 6, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Silverado', yearFrom: 1997, yearTo: 2001, component: 'Filtro de combustível diesel', intervalKm: 15000, intervalMonths: 12, notes: 'Inclui verificação do decantador de água.', priority: 'HIGH', order: 2 },
  { modelName: 'Silverado', yearFrom: 1997, yearTo: 2001, component: 'Correia poly-V e esticador', intervalKm: 30000, intervalMonths: null, notes: 'Ponto de falha conhecido — não conviva com ruído nessa região.', priority: 'HIGH', order: 3 },
  { modelName: 'Silverado', yearFrom: 1997, yearTo: 2001, component: 'Sistema de arrefecimento (radiador, mangueiras, bomba d\'água)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'Silverado', yearFrom: 1997, yearTo: 2001, component: 'Inspeção de chassi/longarina e soalho contra corrosão', intervalKm: null, intervalMonths: 12, notes: 'Mais crítico do que ferrugem estética — verifique estrutura antes de uso severo.', priority: 'HIGH', order: 5 },
  { modelName: 'Silverado', yearFrom: 1997, yearTo: 2001, component: 'Regulagem da bomba injetora rotativa', intervalKm: null, intervalMonths: 24, notes: 'Somente em oficina especializada em diesel mecânico antigo.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Silverado', yearFrom: 2020, yearTo: null, component: 'Óleo sintético do motor V8 5.3', intervalKm: 12000, intervalMonths: 12, notes: 'Siga também o monitor de vida útil do óleo (Oil Life Monitor) no painel.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Silverado', yearFrom: 2020, yearTo: null, component: 'Revisão programada na rede oficial Chevrolet', intervalKm: null, intervalMonths: 12, notes: 'Preço fixo — mantenha o histórico completo na concessionária, essencial para garantia e revenda.', priority: 'HIGH', order: 8 },
  { modelName: 'Silverado', yearFrom: 2020, yearTo: null, component: 'Rodízio de pneus LT275/65 R20', intervalKm: 10000, intervalMonths: null, notes: 'Jogo completo é item caro — rodízio prolonga a vida útil.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Silverado', yearFrom: 2020, yearTo: null, component: 'Sistema de arrefecimento e fluidos', intervalKm: null, intervalMonths: 24, notes: 'Use apenas fluido com especificação de fábrica, não genérico.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Silverado',
    yearFrom: 1997,
    yearTo: 2001,
    MACETES: MACETES_DIESEL,
    PROBLEMAS: PROBLEMAS_DIESEL,
    MANUTENCAO: MANUTENCAO_DIESEL,
  },
  {
    modelName: 'Silverado',
    yearFrom: 2020,
    yearTo: null,
    MACETES: MACETES_HIGH_COUNTRY,
    PROBLEMAS: PROBLEMAS_HIGH_COUNTRY,
    MANUTENCAO: MANUTENCAO_HIGH_COUNTRY,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Silverado...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Chevrolet', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Chevrolet', vehicleTypeId: carroType.id },
  })

  const modelNames = [...new Set(BLOCKS.map((b) => b.modelName))]

  for (const modelName of modelNames) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: modelName, brandId: brand.id } },
      update: {},
      create: { name: modelName, brandId: brand.id },
    })
  }

  await prisma.tip.deleteMany({ where: { modelName: { in: modelNames } } })

  const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
  let order = 0
  const allTipsData = BLOCKS.flatMap((block) =>
    cats.flatMap((cat) =>
      block[cat].map((tip) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: order++,
      }))
    )
  )
  await prisma.tip.createMany({ data: allTipsData })
  console.log(`  ✅ ${allTipsData.length} tips`)

  await prisma.tirePressure.deleteMany({ where: { modelName: { in: modelNames } } })
  await prisma.tirePressure.createMany({ data: TIRE_PRESSURES })
  console.log(`  🔵 TirePressures: ${TIRE_PRESSURES.length}`)

  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: modelNames } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Chevrolet Silverado concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
