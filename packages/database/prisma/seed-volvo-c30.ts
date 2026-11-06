/**
 * Seed Volvo C30 — macetes, problemas, manutenção e calibragem de pneus
 * Hatch compacto esportivo, 2006-2013, plataforma P1 — mesma base do
 * S40 geração 2 e do V50, com quem compartilha motor, suspensão e boa
 * parte da elétrica. Motor 2.0/2.4 aspirado e T-5 2.5 Turbo, versão
 * de acabamento esportivo R-DESIGN.
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-c30
 *
 * Fontes: carrosluxuososa2z.com, mobycar.pt, auto-doc.pt,
 *         reclameaqui.com.br, korncars.com
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
    title: 'Plataforma P1 compartilhada com S40 e V50: amplie a busca por peça',
    body: 'O C30 usa a mesma plataforma P1 do S40 (geração 2004-2012) e do V50 — motor, suspensão e boa parte da elétrica são intercambiáveis entre os três. Ao procurar peça que não aparece cadastrada como "para C30", pesquise também "para Volvo S40" e "para Volvo V50" da mesma época, amplia bastante as opções em desmanche e loja de autopeças.',
  },
  {
    severity: 'OK',
    title: 'Câmbio Powershift (automatizado): mantenha o software atualizado',
    body: 'As unidades de controle do câmbio automatizado Powershift se beneficiam de atualização e ajuste periódico de software — se notar engate irregular ou tranco, antes de suspeitar de peça mecânica quebrada, vale checar se há atualização de software pendente na concessionária/oficina especializada.',
  },
  {
    severity: 'OK',
    title: 'R-DESIGN: produção limitada, peça de acabamento específica mais rara',
    body: 'A versão R-DESIGN teve produção mais limitada que as versões comuns — bancos, acabamento e alguns itens de suspensão esportiva específicos dela são mais raros de achar em desmanche nacional. Para esses itens, a comunidade de entusiastas Volvo (clubes e grupos online) costuma ser mais eficiente que procurar em autopeças genéricas.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Buchas de suspensão e ruído em buraco/lombada',
    body: 'Buchas de suspensão desgastadas são queixa recorrente no C30, geralmente causando ruído ao passar por buracos ou sensação de instabilidade em curva. É item relativamente barato de trocar comparado a outros problemas do carro — não vale a pena conviver com o ruído por muito tempo.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de ABS: fique atento a luz de aviso no painel',
    body: 'Falha na bomba/unidade de ABS é apontada entre os problemas mais comuns do C30. Se a luz de ABS acender e não apagar, leve para diagnóstico — não é recomendável rodar por muito tempo ignorando o aviso, já que o ABS é sistema de segurança ativa.',
  },
  {
    severity: 'WARN',
    title: 'Ar-condicionado: compressor falha entre 80-120 mil km',
    body: 'O sistema de ar-condicionado tem falha conhecida no compressor nessa faixa de quilometragem, com sintomas começando por capacidade de arrefecimento reduzida ou ruído incomum antes da falha completa. Resolver no início do sintoma custa bem menos que esperar parar de gelar de vez.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo em diversos pontos do motor',
    body: 'Vazamento de óleo é queixa comum entre donos de C30, podendo aparecer em vários pontos do motor (juntas, retentores). Fique de olho em mancha de óleo embaixo do carro e no nível do óleo entre trocas — vazamento pequeno ignorado tende a virar problema maior.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma C30 (2006-2013, motor 2.0/2.4/T-5 2.5 Turbo)',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor (mais crítico na versão T-5) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão (buchas) e níveis de fluido. | 20.000-30.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Óleo da transmissão automática Powershift (versões AT), mesmo sem apresentar trancos. | 60.000 km — Fluido de arrefecimento. | 80.000-120.000 km — Inspeção do compressor de ar-condicionado. | Sempre — inspecione vazamento de óleo do motor e verifique se há atualização de software pendente no câmbio Powershift em caso de engate irregular.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'C30',
    yearFrom: 2006,
    yearTo: 2013,
    tireSize: '205/55 R16 · 225/45 R17 · 225/40 R18 (R-Design/T5)',
    frontPsi: 31,
    rearPsi: 29,
    frontPsiLoad: 34,
    rearPsiLoad: 33,
    sparePsi: 60,
    notes: 'Confirme sempre na etiqueta original da coluna da porta do motorista ou manual do exemplar específico — a variação de pneu é grande entre versões 2.0/2.4/T5/R-Design.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'C30', yearFrom: 2006, yearTo: 2013, component: 'Óleo do motor + filtro', intervalKm: 15000, intervalMonths: 12, notes: 'Mais crítico na versão T-5 — protege o turbo.', priority: 'CRITICAL', order: 0 },
  { modelName: 'C30', yearFrom: 2006, yearTo: 2013, component: 'Óleo da transmissão Powershift (versões AT)', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício, mesmo sem apresentar trancos.', priority: 'HIGH', order: 1 },
  { modelName: 'C30', yearFrom: 2006, yearTo: 2013, component: 'Buchas de suspensão — inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Suspeita nº1 em caso de ruído em buraco/lombada.', priority: 'MEDIUM', order: 2 },
  { modelName: 'C30', yearFrom: 2006, yearTo: 2013, component: 'Sistema de ABS — verificação em caso de luz de aviso', intervalKm: null, intervalMonths: null, notes: 'Falha na bomba de ABS é problema conhecido — não ignore o aviso no painel.', priority: 'HIGH', order: 3 },
  { modelName: 'C30', yearFrom: 2006, yearTo: 2013, component: 'Sistema de ar-condicionado — inspeção do compressor', intervalKm: 80000, intervalMonths: null, notes: 'Ponto fraco conhecido entre 80-120 mil km.', priority: 'MEDIUM', order: 4 },
  { modelName: 'C30', yearFrom: 2006, yearTo: 2013, component: 'Inspeção de vazamento de óleo do motor', intervalKm: 15000, intervalMonths: 12, notes: 'Verifique juntas e retentores a cada revisão.', priority: 'MEDIUM', order: 5 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'C30', yearFrom: 2006, yearTo: 2013, MACETES, PROBLEMAS, MANUTENCAO },
]

async function main() {
  console.log('🚗 Seed Volvo C30...')

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

  console.log('✅ Volvo C30 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
