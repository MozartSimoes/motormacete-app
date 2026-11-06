/**
 * Seed Volkswagen Kombi — macetes, problemas, manutenção e calibragem
 * Produzida no Brasil de 2 de setembro de 1957 a 18 de dezembro de 2013 (fábrica
 * de São Bernardo do Campo/SP) — foi o último veículo novo vendido no país com
 * motor traseiro refrigerado a ar. Ao longo de décadas usou motor boxer a ar de
 * 1100cc a 1600cc (25-68cv). Em 2005 o motor a ar foi descontinuado por normas
 * de emissão e, a partir de 2006, passou a usar motor 1.4 Total Flex EA111
 * refrigerado a água. A produção terminou em dez/2013 (edição "Last Edition")
 * porque o modelo não tinha como receber ABS e airbag duplo — itens que se
 * tornaram obrigatórios em todo carro 0km vendido no Brasil a partir de 2014
 * (Lei 11.910/2009) sem descaracterizar o projeto ou inviabilizar o preço.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-kombi
 *
 * Fontes: pt.wikipedia.org/wiki/Volkswagen_Kombi, kombiclube.com.br/linhadotempo,
 *         gazetasp.com.br, motoragora.com.br, vrum.com.br, hojeemdia.com.br,
 *         portaldotransito.com.br, alvaromatiassa.wordpress.com,
 *         parallelum.com.br/fipe (API pública FIPE)
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

// ── Era motor a ar (1957-2005) ──────────────────────────────────────────

const MACETES_AR: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor traseiro refrigerado a ar: sem água, sem radiador',
    body: 'Até 2005 a Kombi usou motor boxer traseiro refrigerado a ar (sem radiador nem líquido de arrefecimento). O resfriamento depende inteiramente da ventoinha e dos defletores de ar em bom estado — mantenha essas peças íntegras e limpas, pois é isso que evita o superaquecimento nesse motor.',
  },
  {
    severity: 'OK',
    title: 'Embreagem a cabo, não hidráulica',
    body: 'Nas Kombis com motor a ar a embreagem é acionada por cabo mecânico, não por sistema hidráulico. Folga excessiva no pedal ou dificuldade para engatar marcha geralmente indica que o cabo precisa de ajuste ou troca — verificação simples e barata que evita desgaste prematuro do disco.',
  },
  {
    severity: 'OK',
    title: 'Peças ainda disponíveis graças à comunidade e ao mercado de reposição',
    body: 'Mesmo em unidades com décadas de uso, peças de motor a ar continuam disponíveis por causa do grande mercado de reposição nacional e de uma comunidade ativa de entusiastas e clubes de Kombi. Antes de descartar uma peça como "impossível de achar", vale procurar em oficinas especializadas em carros antigos/motor a ar.',
  },
  {
    severity: 'OK',
    title: 'Óleo do motor a ar: use a especificação certa e não estique o intervalo',
    body: 'Motores a ar trabalham com temperaturas de óleo mais altas que motores a água equivalentes, então o óleo se degrada mais rápido. Respeite a especificação recomendada para motor a ar (não use qualquer óleo genérico) e não estique o intervalo entre trocas.',
  },
  {
    severity: 'WARN',
    title: 'Antes de comprar uma Kombi antiga, avalie ferrugem estrutural',
    body: 'Em unidades de motor a ar (pré-2006), a prioridade na vistoria é o assoalho, as caixas de roda e os pontos de fixação da carroceria — não só a pintura externa. Ferrugem nesses pontos estruturais pode ser cara e complexa de reparar, e é o principal fator que determina o estado real do veículo.',
  },
]

const PROBLEMAS_AR: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Superaquecimento por defletores de ar ou ventoinha em mau estado',
    body: 'Como o motor a ar depende só de fluxo de ar forçado para resfriar, defletores amassados/faltando ou correia da ventoinha frouxa/gasta reduzem o resfriamento e podem levar a superaquecimento, principalmente em subidas longas ou uso mais intenso.',
  },
  {
    severity: 'WARN',
    title: 'Rompimento de cabos de acelerador e de embreagem',
    body: 'É comum relatos de ruptura dos cabos de acelerador e de embreagem em Kombis mais antigas, geralmente por ressecamento ou falta de lubrificação. Inspecione periodicamente o estado desses cabos para evitar ficar na mão.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste prematuro da embreagem',
    body: 'Há relatos recorrentes de desgaste acelerado do disco de embreagem, especialmente em uso urbano com trânsito parado ou em veículos usados para transporte de carga/passageiros com frequência.',
  },
  {
    severity: 'WARN',
    title: 'Folgas na direção e problemas na suspensão dianteira',
    body: 'Proprietários relatam folgas na direção e desgaste na suspensão dianteira com o uso ao longo dos anos. Ruído ou "esponjosidade" na direção merece inspeção da caixa de direção e das buchas/terminais da suspensão dianteira.',
  },
  {
    severity: 'DANGER',
    title: 'Corrosão estrutural acentuada',
    body: 'A ferrugem é apontada como o principal inimigo de Kombis antigas, podendo atingir pontos estruturais como assoalho, caixas de roda e fixações da carroceria. Corrosão nesses pontos compromete a segurança estrutural do veículo e deve ser avaliada por um funileiro/oficina especializada antes de rodar normalmente com o carro.',
  },
]

const MANUTENCAO_AR: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Kombi motor a ar (referência — confirme no manual da sua unidade)',
    body: '3.000 km — Troca de óleo do motor (motores a ar pedem intervalos mais curtos que motores a água). | A cada troca de óleo — Inspeção visual dos defletores de ar e da correia/estado da ventoinha de refrigeração. | Periodicamente — Verificação de folga e estado dos cabos de acelerador e embreagem. | Periodicamente — Inspeção da suspensão dianteira (buchas, terminais) e folga na direção. | Anualmente — Vistoria de ferrugem no assoalho, caixas de roda e pontos estruturais da carroceria. Os intervalos oficiais variam por ano/versão do manual original — use estes valores como referência e ajuste conforme o estado real do veículo.',
  },
]

// ── Era motor a água 1.4 Total Flex (2006-2013) ────────────────────────

const MACETES_AGUA: TipInput[] = [
  {
    severity: 'OK',
    title: 'Última Kombi: motor 1.4 Total Flex refrigerado a água (2006-2013)',
    body: 'A partir de 2006 a Kombi deixou de usar o motor a ar e passou a usar o motor 1.4 Total Flex EA111 refrigerado a água (o mesmo motor usado em outros modelos VW da época, como Gol e Saveiro daquele período) — isso facilita achar peças e mão de obra familiarizada com o motor.',
  },
  {
    severity: 'OK',
    title: 'Produção encerrada em dezembro de 2013 por exigência de ABS e airbag',
    body: 'A Kombi foi fabricada até 18/12/2013 (edição especial "Last Edition") porque o projeto, de 1957, não comportava adaptar ABS e airbag duplo dianteiro sem descaracterizar o veículo — itens que passaram a ser obrigatórios em todo carro 0km vendido no Brasil a partir de 2014. Isso não é um defeito do carro, é bom saber a razão histórica ao avaliar uma unidade desses últimos anos.',
  },
  {
    severity: 'OK',
    title: 'Evite lavar o motor com muita água ou jato de alta pressão',
    body: 'Há relatos de falha no sistema de ignição (cabos de vela) por exposição à água mesmo em lavagens comuns por baixo do veículo. Ao lavar a Kombi 1.4 flex, evite jato direto e forte sobre a região do motor e do compartimento elétrico.',
  },
]

const PROBLEMAS_AGUA: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento em retentor do virabrequim e juntas do motor',
    body: 'Proprietários relatam vazamentos no retentor do virabrequim e nas juntas da tampa de válvulas/cabeçote do motor 1.4 flex. Manchas de óleo sob o veículo ou consumo de óleo acima do normal merecem inspeção dessas vedações.',
  },
  {
    severity: 'WARN',
    title: 'Falha na ignição por exposição à água',
    body: 'Os cabos de vela e o sistema de ignição do 1.4 flex são sensíveis à água — mesmo lavagem comum por baixo do carro já foi relatada como causa de falha no motor. Se o carro apresentar falha de partida após lavagem, verifique cabos de vela e conectores antes de suspeitar de outro problema.',
  },
  {
    severity: 'WARN',
    title: 'Falha no acelerador eletrônico após período parado',
    body: 'Há relatos de falha no sistema de acelerador eletrônico depois que o veículo fica parado por alguns dias. Se isso ocorrer, uma checagem no sistema de injeção/acelerador eletrônico costuma resolver.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão de carroceria mesmo em unidades de baixa quilometragem',
    body: 'Mesmo modelos 1.4 mais recentes (2006-2013) apresentam relatos de corrosão acentuada — no assoalho, nas caixas de roda e na parte superior do compartimento do motor — em pontos onde a água se acumula e a manutenção preventiva costuma ser esquecida.',
  },
  {
    severity: 'WARN',
    title: 'Ruptura de cabo de embreagem e desgaste prematuro',
    body: 'Assim como nas versões com motor a ar, a versão 1.4 também tem relatos de ruptura do cabo de embreagem e desgaste prematuro do disco, especialmente em uso comercial/carga frequente.',
  },
]

const MANUTENCAO_AGUA: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Kombi 1.4 Total Flex 2006-2013 (referência — confirme no manual)',
    body: '10.000 km — Troca de óleo do motor 1.4 flex + filtro de óleo. | A cada troca de óleo — Inspeção de vazamento em retentor do virabrequim e juntas do cabeçote/tampa de válvulas. | Periodicamente — Verificação de cabos de vela e conectores elétricos, principalmente após lavagens. | Periodicamente — Verificação do cabo de embreagem e do disco quanto a desgaste. | Anualmente — Vistoria de corrosão no assoalho, caixas de roda e compartimento do motor. Os intervalos oficiais podem variar conforme o manual do proprietário da sua unidade — use como referência.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Kombi',
    yearFrom: 1957,
    yearTo: 2005,
    tireSize: '185 R14C / 6.40-14 (varia conforme versão e época)',
    frontPsi: 28,
    rearPsi: 31,
    frontPsiLoad: 28,
    rearPsiLoad: 36,
    sparePsi: 36,
    notes: 'Pressão varia bastante conforme carga (passageiros/carga) e o tipo de pneu (diagonal ou radial) da época. Valores de referência para meia carga (28/31) e carga máxima (28/36) — confirme sempre na etiqueta da coluna da porta ou no manual da sua unidade, já que a Kombi foi produzida por quase 50 anos com especificações que mudaram ao longo do tempo.',
  },
  {
    modelName: 'Kombi',
    yearFrom: 2006,
    yearTo: 2013,
    tireSize: '185 R14C (radial)',
    frontPsi: 30,
    rearPsi: 40,
    frontPsiLoad: 35,
    rearPsiLoad: 48,
    sparePsi: 48,
    notes: 'Valores de referência para pneu radial em uso comercial/carga — a pressão traseira sobe bastante em carga máxima por ser o eixo que recebe mais peso. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista ou no manual do proprietário.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Kombi', yearFrom: 1957, yearTo: 2005, component: 'Óleo do motor (motor a ar)', intervalKm: 3000, intervalMonths: 6, notes: 'Motores a ar operam com óleo mais quente — intervalo mais curto que motor a água.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Kombi', yearFrom: 1957, yearTo: 2005, component: 'Defletores de ar e ventoinha de refrigeração', intervalKm: null, intervalMonths: 6, notes: 'Inspeção visual — peça central para evitar superaquecimento do motor a ar.', priority: 'HIGH', order: 1 },
  { modelName: 'Kombi', yearFrom: 1957, yearTo: 2005, component: 'Cabos de acelerador e embreagem', intervalKm: null, intervalMonths: 6, notes: 'Verificar folga, ressecamento e risco de ruptura.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Kombi', yearFrom: 1957, yearTo: 2005, component: 'Vistoria de ferrugem estrutural', intervalKm: null, intervalMonths: 12, notes: 'Assoalho, caixas de roda e pontos de fixação da carroceria.', priority: 'HIGH', order: 3 },
  { modelName: 'Kombi', yearFrom: 2006, yearTo: 2013, component: 'Óleo do motor 1.4 Total Flex', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o filtro de óleo.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Kombi', yearFrom: 2006, yearTo: 2013, component: 'Retentores e juntas do motor — inspeção de vazamento', intervalKm: 10000, intervalMonths: 12, notes: 'Vazamentos relatados no retentor do virabrequim e juntas do cabeçote.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Kombi', yearFrom: 2006, yearTo: 2013, component: 'Cabos de vela e conectores elétricos', intervalKm: null, intervalMonths: 6, notes: 'Sensíveis à água — verificar após lavagens do motor.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Kombi', yearFrom: 2006, yearTo: 2013, component: 'Vistoria de corrosão de carroceria', intervalKm: null, intervalMonths: 12, notes: 'Assoalho, caixas de roda e compartimento do motor.', priority: 'MEDIUM', order: 3 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Kombi',
    yearFrom: 1957,
    yearTo: 2005,
    MACETES: MACETES_AR,
    PROBLEMAS: PROBLEMAS_AR,
    MANUTENCAO: MANUTENCAO_AR,
  },
  {
    modelName: 'Kombi',
    yearFrom: 2006,
    yearTo: 2013,
    MACETES: MACETES_AGUA,
    PROBLEMAS: PROBLEMAS_AGUA,
    MANUTENCAO: MANUTENCAO_AGUA,
  },
]

async function main() {
  console.log('🚗 Seed Volkswagen Kombi...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Kombi', brandId: brand.id } },
    update: {},
    create: { name: 'Kombi', brandId: brand.id },
  })

  await prisma.tip.deleteMany({ where: { modelName: 'Kombi' } })

  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: order++,
      })),
    })
    console.log(`  ✅ Kombi ${block.yearFrom}-${block.yearTo ?? 'presente'}: ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: 'Kombi' } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: Kombi ${tp.yearFrom}-${tp.yearTo ?? 'presente'}`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Kombi' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volkswagen Kombi concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
