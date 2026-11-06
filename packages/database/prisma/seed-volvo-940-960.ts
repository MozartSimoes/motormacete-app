/**
 * Seed Volvo 940/960 — macetes, problemas, manutenção e calibragem de pneus
 * Sedan e perua de tração traseira (RWD), motor longitudinal — mecânica
 * simples e "tijolo" que virou sinônimo de robustez e segurança na época.
 * Produzidos de 1990 a 1998. 940: motor 4 cilindros 2.0/2.3, aspirado ou
 * Turbo. 960: motor 6 cilindros em linha 2.9 (depois 2.8 Bi-Turbo na
 * fase final, já como S90/V90). Mecânica RWD longitudinal convencional,
 * peça relativamente simples de entender mesmo para oficina genérica.
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-940-960
 *
 * Fontes: grassrootsmotorsports.com, volvoforums.com, matthewsvolvosite.com,
 *         cuidadovolvo.wordpress.com, magodoscarros.com, carrosnaweb.com.br
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

const MACETES_940: TipInput[] = [
  {
    severity: 'OK',
    title: 'RWD longitudinal: mecânica simples, boa para oficina generalista entender',
    body: 'Diferente de muito Volvo mais recente (FWD transversal), o 940 usa motor longitudinal com tração traseira — leiaute mecânico mais parecido com carro americano/europeu clássico. Isso facilita achar mecânico que entenda a mecânica mesmo fora de oficina especializada em Volvo, já que o princípio é o mesmo de outros RWD da época.',
  },
  {
    severity: 'WARN',
    title: 'Turbo: nível de óleo e resfriamento pedem atenção redobrada',
    body: 'No 940 Turbo, verifique o nível de óleo com frequência (pelo menos semanalmente em uso regular) — a pressão positiva do turbo e o calor extra exigem mais do óleo que um motor aspirado. Depois de rodar em estrada/velocidade alta, deixe o motor em marcha lenta por um tempo antes de desligar, em vez de desligar na hora: isso evita que o óleo dentro do turbo "coque" (carbonize) nos rolamentos por falta de circulação após o desligamento a quente.',
  },
  {
    severity: 'OK',
    title: 'Depois de trocar o óleo, pré-lubrifique o turbo antes de dar a partida',
    body: 'Depois de uma troca de óleo, alguns donos de 940 Turbo recomendam "pré-encher" o turbo de óleo antes da primeira partida — desabilitar temporariamente a ignição e girar o motor no motor de arranque até a luz de pressão de óleo apagar, garantindo que o turbo já tenha lubrificação antes do motor realmente pegar. Reduz o desgaste do turbo logo após a troca.',
  },
  {
    severity: 'OK',
    title: 'Segurança e robustez são a fama real do carro — mantenha os básicos em dia',
    body: 'O 940 é lembrado até hoje como carro robusto e seguro para a família, reputação que só se sustenta com manutenção básica em dia (freios, suspensão, arrefecimento). É carro feito para durar décadas quando bem cuidado — não é raro achar exemplar rodando com centenas de milhares de km.',
  },
]

const PROBLEMAS_940: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Turbo soltando fumaça em marcha lenta e óleo no intercooler',
    body: 'Queixa relatada por proprietários: turbo soltando uma leve fumaça em marcha lenta, com resíduo de óleo aparecendo na tubulação do intercooler — sinal de desgaste dos retentores do turbo, mais comum em unidades que já passaram de 100.000 km ou tiveram histórico de troca de óleo irregular. Não é motivo de pânico imediato, mas vale monitorar e não adiar manutenção do turbo se o sintoma aparecer.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento — válvula termostática e radiador são os suspeitos usuais',
    body: 'Como em outros Volvo da época, superaquecimento por válvula termostática travada ou radiador com colmeia obstruída (natural em carro com décadas de uso) é queixa recorrente. Fique de olho no marcador de temperatura, principalmente em trânsito parado.',
  },
]

const MANUTENCAO_940: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 940 (referência genérica — motor 4 cilindros aspirado/Turbo)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo (verificação semanal de nível nas versões Turbo). | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar. | 20.000-30.000 km — Velas de ignição. | 60.000 km — Correia dentada + bomba d\'água (troque preventivamente juntos). | 60.000 km — Válvula termostática e limpeza/inspeção do radiador. | Turbo — deixe o motor em marcha lenta um pouco antes de desligar após uso em estrada, e pré-lubrifique o turbo após trocas de óleo.',
  },
]

const MACETES_960: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 6 cilindros em linha: suavidade acima da média para a época',
    body: 'O 960 troca o 4 cilindros do 940 pelo 6 em linha 2.9 — motor mais suave e refinado, mecânica um degrau acima em sofisticação, mas ainda dentro da mesma filosofia RWD simples e duradoura da família 900. Ao procurar peça de motor, busque também "para Volvo S90/V90" (nome que o 960 ganhou depois de 1997/98), já que a mecânica é praticamente a mesma.',
  },
  {
    severity: 'OK',
    title: 'Direção hidráulica e suspensão: vazamento é a primeira coisa a checar',
    body: 'Assim como em outros Volvo dessa era, vazamento na direção hidráulica é queixa comum — ruído de "chiado" ao virar o volante parado é o primeiro sinal. Mantenha o reservatório de fluido sempre no nível correto para não acelerar o desgaste da bomba.',
  },
]

const PROBLEMAS_960: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Superaquecimento e válvula termostática, mesmo padrão da família 900',
    body: 'O motor 6 cilindros do 960 também é sensível a válvula termostática travada e radiador obstruído pela idade — mesmo cuidado do 940 se aplica aqui: fique de olho na temperatura, principalmente em trânsito parado ou dias quentes.',
  },
  {
    severity: 'WARN',
    title: 'Peça de motor 6 cilindros mais rara que a do 940 no Brasil',
    body: 'Por ter sido vendido em volume ainda menor que o 940, peça específica do motor 6 cilindros do 960 é mais difícil de achar no Brasil. Vale entrar em contato com a comunidade de entusiastas Volvo para localizar peça de desmanche ou encomenda de importação antes de assumir que "não tem no Brasil".',
  },
]

const MANUTENCAO_960: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 960 (referência genérica — motor 6 cilindros 2.9)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão, direção hidráulica e níveis de fluido. | 20.000 km — Filtro de ar. | 20.000-30.000 km — Velas de ignição. | 60.000 km — Correia dentada/corrente conforme o motor específico + bomba d\'água. | 60.000 km — Válvula termostática e inspeção do radiador. | Direção hidráulica — verifique vazamento nas mangueiras/bomba a cada revisão.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: '940',
    yearFrom: 1990,
    yearTo: 1998,
    tireSize: '185/65 R15 · 195/65 R15 (Turbo)',
    frontPsi: 28,
    rearPsi: 28,
    frontPsiLoad: 30,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Valor de referência genérico para o período — confirme na etiqueta original da coluna da porta do motorista ou manual do exemplar específico. Reforce a traseira na versão perua (940 SW) com porta-malas carregado.',
  },
  {
    modelName: '960',
    yearFrom: 1990,
    yearTo: 1998,
    tireSize: '195/65 R15 · 205/60 R15',
    frontPsi: 28,
    rearPsi: 28,
    frontPsiLoad: 30,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Valor de referência genérico para o período — confirme na etiqueta original da coluna da porta do motorista ou manual do exemplar específico. Reforce a traseira na versão perua (960 SW) com porta-malas carregado.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: '940', yearFrom: 1990, yearTo: 1998, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Verifique nível semanalmente nas versões Turbo.', priority: 'HIGH', order: 0 },
  { modelName: '940', yearFrom: 1990, yearTo: 1998, component: 'Correia dentada + bomba d\'água', intervalKm: 60000, intervalMonths: 48, notes: 'Troque preventivamente em conjunto.', priority: 'HIGH', order: 1 },
  { modelName: '940', yearFrom: 1990, yearTo: 1998, component: 'Válvula termostática e radiador — inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Suspeita nº1 em caso de superaquecimento.', priority: 'MEDIUM', order: 2 },
  { modelName: '940', yearFrom: 1990, yearTo: 1998, component: 'Inspeção do turbo (fumaça em marcha lenta, óleo no intercooler)', intervalKm: 30000, intervalMonths: null, notes: 'Verifique se passou de 100.000 km ou tem histórico de troca de óleo irregular.', priority: 'MEDIUM', order: 3 },
  { modelName: '960', yearFrom: 1990, yearTo: 1998, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 4 },
  { modelName: '960', yearFrom: 1990, yearTo: 1998, component: 'Correia dentada/corrente + bomba d\'água', intervalKm: 60000, intervalMonths: 48, notes: 'Confirme se o motor do exemplar usa correia ou corrente antes de orçar.', priority: 'HIGH', order: 5 },
  { modelName: '960', yearFrom: 1990, yearTo: 1998, component: 'Válvula termostática e radiador — inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Suspeita nº1 em caso de superaquecimento.', priority: 'MEDIUM', order: 6 },
  { modelName: '960', yearFrom: 1990, yearTo: 1998, component: 'Fluido de direção hidráulica', intervalKm: null, intervalMonths: 12, notes: 'Verifique nível e vazamento nas mangueiras/bomba a cada revisão.', priority: 'MEDIUM', order: 7 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: '940', yearFrom: 1990, yearTo: 1998, MACETES: MACETES_940, PROBLEMAS: PROBLEMAS_940, MANUTENCAO: MANUTENCAO_940 },
  { modelName: '960', yearFrom: 1990, yearTo: 1998, MACETES: MACETES_960, PROBLEMAS: PROBLEMAS_960, MANUTENCAO: MANUTENCAO_960 },
]

async function main() {
  console.log('🚗 Seed Volvo 940/960...')

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

  console.log('✅ Volvo 940/960 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
