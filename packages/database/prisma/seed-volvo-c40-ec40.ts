/**
 * Seed Volvo C40 / EC40 — macetes, problemas, manutenção e calibragem
 * Coupé-SUV 100% elétrico, mesma plataforma CMA e mecânica (motor único
 * RWD ou Twin Motor AWD, bateria) do XC40 Recharge/EX40 — o "irmão" de
 * teto mais alto e carroceria de SUV tradicional. A diferença é só de
 * carroceria: o C40 tem teto mais baixo e inclinado, estilo coupé, o que
 * reduz um pouco o espaço de cabeça na fileira traseira e deixa o vidro
 * traseiro menor (visibilidade um pouco pior) na comparação com o
 * XC40/EX40 — mecanicamente são praticamente idênticos.
 * "C40" foi o nome original de lançamento (2022); "EC40" é o rebatismo
 * mais recente (a partir de 2024/2025), parte da mesma reorganização de
 * nomenclatura que transformou o XC40 Recharge em EX40. Os dois nomes
 * aparecem separados na tabela FIPE — por isso os dois modelNames abaixo
 * usam basicamente o mesmo conteúdo técnico.
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-c40-ec40
 *
 * Fontes: canaltech.com.br, automaistv.com.br, escapelivre.com,
 *         cnnbrasil.com.br, volvocars.com (suporte oficial), forumve.com,
 *         xc40forum.com, wheel-size.com
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
    title: 'C40 e EC40 são o mesmo carro — só o nome comercial mudou',
    body: 'Se você tem um C40 Recharge (nome usado até 2023/2024) ou um EC40 (nome atual), os macetes e cronograma de manutenção abaixo valem igual: é a mesma mecânica sobre a plataforma CMA, só rebatizada dentro da estratégia da Volvo de identificar todo elétrico puro com a letra "E".',
  },
  {
    severity: 'OK',
    title: 'Teto baixo reduz espaço de cabeça atrás — ajuste expectativa antes de comprar para uso familiar',
    body: 'Por ter carroceria de coupé (teto mais baixo e inclinado que o XC40/EX40), o espaço para a cabeça no banco de trás é sensivelmente menor — passageiros mais altos sentem o "caimento" do teto na fileira traseira. O vidro traseiro também é menor, o que piora um pouco a visibilidade ao dar ré. Se seu uso principal é levar passageiros adultos atrás com frequência, teste o espaço pessoalmente antes de decidir entre C40/EC40 e o irmão XC40/EX40 — mecanicamente são o mesmo carro, a diferença real é só de carroceria.',
  },
  {
    severity: 'OK',
    title: 'Carga entre 20% e 80% no dia a dia preserva a bateria',
    body: 'Configure o limite de carga do painel para 80% no uso diário e reserve a carga até 100% só para viagens longas, carregando pouco antes de sair. Evite também deixar o carro parado por muito tempo com a bateria muito baixa.',
  },
  {
    severity: 'OK',
    title: 'Frenagem regenerativa poupa a pastilha, mas acione o freio convencional de vez em quando',
    body: 'A frenagem regenerativa do C40/EC40 reduz bastante o desgaste da pastilha de freio no uso diário. Isso é positivo, mas o disco passa mais tempo sem trabalho de verdade — pise com um pouco mais de força no freio de vez em quando para evitar oxidação superficial por baixo uso, principalmente em regiões úmidas.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Mensagem "Propulsion System Service Urgent/Required" pode colocar o carro em modo de emergência',
    body: 'Por compartilhar a mecânica com o XC40/EX40, o C40/EC40 também pode exibir essa mensagem, reduzindo drasticamente a potência disponível como medida de segurança. As causas mais comuns relatadas são falha de software, do inversor, do carregador de bordo (OBC) ou do módulo de controle da bateria (BMS). Se aparecer, evite forçar o carro em rodovia — procure a concessionária; muitas vezes uma atualização de software resolve.',
  },
  {
    severity: 'WARN',
    title: 'Umidade dentro do alojamento dos faróis em clima frio/úmido',
    body: 'Assim como no irmão XC40/EX40, há relatos de condensação visível dentro da carcaça dos faróis em dias frios ou muito úmidos. Embaçamento leve que some ao esquentar o farol é normal; água acumulada ou embaçamento persistente indica vedação comprometida — vale inspecionar antes que afete os contatos elétricos.',
  },
  {
    severity: 'WARN',
    title: 'Recall de bateria de alta tensão em modelos da plataforma CMA (verificar se sua unidade está incluída)',
    body: 'A Volvo já convocou recalls envolvendo módulos de bateria de alta tensão com risco de superaquecimento em modelos eletrificados construídos sobre a plataforma CMA, que o C40/EC40 compartilha com o XC40 Recharge/EX40 e o XC40 híbrido plug-in. Consulte o número de chassi no site oficial de recalls da Volvo Brasil (volvocars.com/br/l/proprietario/recalls) — recalls de bateria costumam valer por lote de produção, não pelo modelo inteiro.',
  },
  {
    severity: 'WARN',
    title: 'Problemas gerais de eletrônica, portas/fechaduras e teto solar relatados em fóruns internacionais',
    body: 'Proprietários em fóruns internacionais (SwedeSpeed, XC40 Forum) relatam ocasionalmente falhas pontuais em componentes eletrônicos, travas de porta, cintos de segurança e teto solar — problemas típicos de carro com muito conteúdo eletrônico, não um padrão sistêmico grave. Se notar qualquer comportamento elétrico estranho, vale registrar e levar para diagnóstico cedo, já que esses sistemas tendem a piorar gradualmente antes de falhar de vez.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma C40/EC40 (Volvo + itens específicos de EV)',
    body: 'Sem troca de óleo de motor, filtro de óleo, velas ou correia — é 100% elétrico. | Inspeção anual — Pastilhas e discos de freio (checar oxidação por baixo uso pela regenerativa). | 40.000 km / 24 meses — Fluido de freio DOT 4. | 20.000-30.000 km — Filtro de cabine. | 60.000-100.000 km — Fluido do sistema de arrefecimento da bateria e do inversor (confirme intervalo exato no manual do seu ano/versão). | Anual — Inspeção do sistema de alta tensão (bateria/cabos/porta de recarga) e verificação de recall pendente pelo chassi. | Rodízio de pneus a cada 10.000 km.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'C40',
    yearFrom: 2022,
    yearTo: null,
    tireSize: '235/50 R19 · 255/45 R19 · 235/45 R20 · 255/40 R20 (conforme roda de fábrica)',
    frontPsi: 38,
    rearPsi: 38,
    frontPsiLoad: 41,
    rearPsiLoad: 41,
    sparePsi: null,
    notes: 'Mesma mecânica do XC40 Recharge/EX40 — confirme sempre o valor exato na etiqueta da coluna da porta do motorista, já que varia por aro/versão. C40/EC40 não tem estepe.',
  },
  {
    modelName: 'EC40',
    yearFrom: 2024,
    yearTo: null,
    tireSize: '235/50 R19 · 255/45 R19 · 235/45 R20 · 255/40 R20 (conforme roda de fábrica)',
    frontPsi: 38,
    rearPsi: 38,
    frontPsiLoad: 41,
    rearPsiLoad: 41,
    sparePsi: null,
    notes: 'Mesmo carro do C40, nome comercial atualizado. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista. EC40 não tem estepe.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'C40', yearFrom: 2022, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos/porta de recarga)', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual + checar recall pendente pelo chassi.', priority: 'CRITICAL', order: 0 },
  { modelName: 'C40', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 1 },
  { modelName: 'C40', yearFrom: 2022, yearTo: null, component: 'Freios — inspeção (oxidação por baixo uso)', intervalKm: null, intervalMonths: 12, notes: 'Regenerativa reduz uso do freio mecânico — acione os freios convencionais periodicamente.', priority: 'MEDIUM', order: 2 },
  { modelName: 'C40', yearFrom: 2022, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'C40', yearFrom: 2022, yearTo: null, component: 'Fluido de arrefecimento da bateria/inversor', intervalKm: 60000, intervalMonths: null, notes: 'Confirme intervalo exato no manual.', priority: 'HIGH', order: 4 },
  { modelName: 'C40', yearFrom: 2022, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'EC40', yearFrom: 2024, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos/porta de recarga)', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual + checar recall pendente pelo chassi.', priority: 'CRITICAL', order: 6 },
  { modelName: 'EC40', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 7 },
  { modelName: 'EC40', yearFrom: 2024, yearTo: null, component: 'Freios — inspeção (oxidação por baixo uso)', intervalKm: null, intervalMonths: 12, notes: 'Regenerativa reduz uso do freio mecânico — acione os freios convencionais periodicamente.', priority: 'MEDIUM', order: 8 },
  { modelName: 'EC40', yearFrom: 2024, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'EC40', yearFrom: 2024, yearTo: null, component: 'Fluido de arrefecimento da bateria/inversor', intervalKm: 60000, intervalMonths: null, notes: 'Confirme intervalo exato no manual.', priority: 'HIGH', order: 10 },
  { modelName: 'EC40', yearFrom: 2024, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 11 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'C40',
    yearFrom: 2022,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
  {
    modelName: 'EC40',
    yearFrom: 2024,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volvo C40/EC40...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volvo', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volvo', vehicleTypeId: carroType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })
  }

  const distinctModelNames = [...new Set(BLOCKS.map((b) => b.modelName))]
  for (const modelName of distinctModelNames) {
    await prisma.tip.deleteMany({ where: { modelName } })
  }

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
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }

  const distinctTpModelNames = [...new Set(TIRE_PRESSURES.map((t) => t.modelName))]
  for (const modelName of distinctTpModelNames) {
    await prisma.tirePressure.deleteMany({ where: { modelName } })
  }
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: distinctModelNames } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volvo C40/EC40 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
