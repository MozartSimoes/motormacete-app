/**
 * Seed Volvo S80 — macetes, problemas, manutenção e calibragem de pneus
 * Sedan executivo de tração dianteira (FWD, algumas versões com AWD).
 * Duas gerações bem distintas: geração 1 (1998-2006), motor 6 cilindros
 * 2.9 aspirado, T6 Bi-Turbo 2.8/2.9 e a rara versão V8 4.4 (Yamaha,
 * AWD) no fim da produção; geração 2 (2006-2016), plataforma nova,
 * motor T6 turbo (além de outras opções internacionais). Tratadas como
 * blocos separados por ano, já que a mecânica muda bastante entre elas.
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-s80
 *
 * Fontes: forumvolvo.com (Portugal), club.auto-doc.pt, magodoscarros.com,
 *         ultimatespecs.com, forum.motorguia.net
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

// ─── Geração 1 (1998-2006) — 2.9 / T6 Bi-Turbo / V8 4.4 ────────────────────

const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Confirme a motorização antes de orçar: 2.9, T6 Bi-Turbo ou V8 são bem diferentes',
    body: 'A primeira geração do S80 teve motor 6 cilindros 2.9 aspirado, versão turbinada T6 Bi-Turbo e, no fim da produção, a rara V8 4.4 desenvolvida com a Yamaha (com tração integral). São motores com peças e complexidade bem diferentes — confirme sempre qual equipa o seu exemplar antes de orçar peça ou revisão, já que confundir um com outro pode gerar cotação totalmente errada.',
  },
  {
    severity: 'WARN',
    title: 'Manutenção turbo/V8 é mais cara que a de um motor básico — planeje o orçamento',
    body: 'Diferente de um motor aspirado simples, a manutenção do T6 Bi-Turbo e principalmente da V8 4.4 exige peça mais cara e, muitas vezes, oficina mais especializada. Antes de comprar um exemplar dessas versões, pesquise o custo de peças básicas (velas, correia, filtros) no seu contexto local — o custo de manutenção costuma surpreender quem vem de carro popular.',
  },
  {
    severity: 'OK',
    title: 'Peça original é praticamente toda importada — planeje com antecedência',
    body: 'Praticamente toda peça original dessa geração precisa vir de fornecedor Volvo/importado, o que encarece bastante a manutenção comparado a marcas populares. Vale se antecipar: pesquise e reserve peças de desgaste programado (correia, velas, filtros) antes que o carro realmente pare, em vez de esperar a peça quebrar para começar a procurar.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Luzes de aviso no painel (ABS, STC, motor) acendendo sem causa óbvia',
    body: 'É comum nesse S80 mais antigo o painel acender avisos de ABS, controle de tração/estabilidade (STC) ou motor sem uma causa evidente — muitas vezes ligado a sensor ou conector envelhecido, não necessariamente ao sistema em si. Não ignore o aviso, mas também não assuma automaticamente o pior: peça o diagnóstico por scanner antes de trocar peça cara "no chute".',
  },
  {
    severity: 'WARN',
    title: 'Válvula EGR é ponto de atenção conhecido',
    body: 'A válvula EGR (recirculação de gases) é apontada como problema comum nessa geração — sintomas incluem marcha lenta irregular e perda de desempenho. É item relativamente acessível de limpar ou trocar comparado a outros componentes do carro.',
  },
  {
    severity: 'WARN',
    title: 'Correias de acessórios: verifique perto dos 140.000 km',
    body: 'A troca de correias (auxiliares e, dependendo do motor, de comando) é um dos pontos de manutenção mais importantes por volta de 140.000 km — não é incomum negligenciar esse item em carro mais antigo, mas o custo de não trocar a tempo é bem maior que o da própria correia.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma S80 geração 1 (1998-2006, referência genérica)',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor (especificação exata conforme motor: 2.9, T6 Bi-Turbo ou V8) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000-30.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Fluido de arrefecimento. | 140.000 km — Correias de acessórios (e correia dentada/corrente conforme o motor) — ponto crítico de manutenção nessa geração. | Sempre — diagnóstico por scanner antes de trocar peça cara ao surgir luz de aviso no painel (ABS/STC/motor).',
  },
]

// ─── Geração 2 (2006-2016) — plataforma nova, T6 turbo ─────────────────────

const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Plataforma totalmente nova em relação à geração 1 — não misture peça',
    body: 'A partir de 2006 o S80 passou a usar plataforma nova (compartilhada com outros Volvo grandes da época), com motorização T6 turbo revisada. Não é a mesma mecânica da geração 1 apesar do nome igual — ao procurar peça, confirme sempre o ano do chassi antes de comprar algo anunciado genericamente como "para S80".',
  },
  {
    severity: 'OK',
    title: 'AWD disponível: bom para quem enfrenta chuva/estrada ruim com frequência',
    body: 'Nessa geração, o T6 esteve disponível com tração integral (AWD) em algumas versões — vantagem real de estabilidade em pista molhada ou estrada de terra ocasional. Se o seu exemplar for AWD, inclua o sistema de tração integral na revisão periódica, é um componente a mais que pede atenção que a versão FWD não tem.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Mesma linha de vulnerabilidades elétricas/eletrônicas da geração anterior',
    body: 'Assim como na geração 1, avisos de sistemas eletrônicos (ABS, STC, motor) no painel sem sintoma físico claro seguem sendo queixa comum. O procedimento é o mesmo: diagnóstico por scanner antes de trocar peça, já que sensor/conector envelhecido responde por boa parte dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Turbo T6: fique atento a sinais de perda de potência e consumo de óleo',
    body: 'No motor T6 turbo dessa geração, perda de potência gradual e aumento de consumo de óleo são os primeiros sinais de desgaste do turbo — mais uma razão para nunca atrasar a troca de óleo, já que é o fator que mais influencia a vida útil do turbo.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma S80 geração 2 (2006-2016, referência genérica — motor T6 turbo)',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor T6 + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000-30.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Fluido de arrefecimento. | 40.000 km — Sistema de tração integral (AWD), nas versões equipadas. | Sempre — diagnóstico por scanner antes de trocar peça cara ao surgir luz de aviso no painel.',
  },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'S80', yearFrom: 1998, yearTo: 2006, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'S80', yearFrom: 2006, yearTo: 2016, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'S80',
    yearFrom: 1998,
    yearTo: 2006,
    tireSize: '205/60 R15 · 215/55 R16 · 235/45 R18 (T6/V8)',
    frontPsi: 30,
    rearPsi: 30,
    frontPsiLoad: 32,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Valor de referência genérico — confirme na etiqueta original da coluna da porta do motorista ou manual do exemplar específico, já que a variação de pneu é grande entre 2.9/T6/V8.',
  },
  {
    modelName: 'S80',
    yearFrom: 2006,
    yearTo: 2016,
    tireSize: '215/60 R16 · 235/45 R18 (T6)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Confirme sempre na etiqueta original da coluna da porta do motorista ou manual do exemplar específico.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'S80', yearFrom: 1998, yearTo: 2006, component: 'Óleo do motor (2.9 / T6 Bi-Turbo / V8 4.4)', intervalKm: 15000, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor do exemplar.', priority: 'CRITICAL', order: 0 },
  { modelName: 'S80', yearFrom: 1998, yearTo: 2006, component: 'Correias de acessórios e correia dentada/corrente', intervalKm: 140000, intervalMonths: 60, notes: 'Ponto crítico de manutenção nessa geração — não negligencie em carro mais antigo.', priority: 'CRITICAL', order: 1 },
  { modelName: 'S80', yearFrom: 1998, yearTo: 2006, component: 'Válvula EGR — inspeção', intervalKm: 60000, intervalMonths: null, notes: 'Ponto de atenção conhecido — sintomas incluem marcha lenta irregular.', priority: 'MEDIUM', order: 2 },
  { modelName: 'S80', yearFrom: 1998, yearTo: 2006, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'S80', yearFrom: 2006, yearTo: 2016, component: 'Óleo do motor T6', intervalKm: 15000, intervalMonths: 12, notes: 'Não atrase — influencia diretamente a vida útil do turbo.', priority: 'CRITICAL', order: 4 },
  { modelName: 'S80', yearFrom: 2006, yearTo: 2016, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'S80', yearFrom: 2006, yearTo: 2016, component: 'Sistema de tração integral (AWD) — inspeção (versões equipadas)', intervalKm: 40000, intervalMonths: 24, notes: 'Apenas versões AWD.', priority: 'MEDIUM', order: 6 },
  { modelName: 'S80', yearFrom: 2006, yearTo: 2016, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
]

async function main() {
  console.log('🚗 Seed Volvo S80...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volvo', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volvo', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'S80', brandId: brand.id } },
    update: {},
    create: { name: 'S80', brandId: brand.id },
  })

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

  console.log('✅ Volvo S80 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
