/**
 * Seed Honda WR-V — macetes, problemas, manutenção e calibragem
 * SUV compacto, motor 1.5 16V i-VTEC flex (116cv/15,3kgfm), câmbio CVT.
 * Lançado no Brasil em 2022, compartilha plataforma com o City. #69 no
 * ranking de vendas 2025 no Brasil (4.589 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:honda-wrv
 *
 * Fontes: autoo.com.br, carroslancamentos.com.br, vrum.com.br,
 *         instacarro.com, mercadoveiculos.com
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
    title: 'CVT: a resposta "lenta" ao acelerar é comportamento normal do câmbio',
    body: 'O CVT do WR-V tem resposta mais gradual ao acelerar comparado a um câmbio automático convencional — isso é característica normal desse tipo de transmissão, não defeito. Se busca respostas mais rápidas, acelere de forma mais progressiva e antecipada em vez de pisar fundo esperando resposta imediata.',
  },
  {
    severity: 'WARN',
    title: 'Fluido CVT: não deixe passar do prazo de 40.000 km',
    body: 'O fluido do câmbio CVT precisa ser trocado dentro do prazo de 40.000 km — atrasar essa troca é uma das principais causas de degradação prematura do CVT. Use sempre o fluido original Honda, nunca um equivalente genérico.',
  },
  {
    severity: 'OK',
    title: 'Compartilha plataforma e motor com o City',
    body: 'O WR-V usa a mesma plataforma e motor 1.5 i-VTEC do City. Em oficinas independentes, peças e conhecimento técnico do City podem ajudar a resolver problemas mais rápido quando o cadastro específico do WR-V ainda não existir no sistema da loja.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Folga nas válvulas do motor relatada por proprietários',
    body: 'Há relatos de folga nas válvulas do motor 1.5 i-VTEC, o que pode gerar ruído metálico característico ("batida" de válvula) e, se não corrigido, afetar o desempenho do motor. Se notar ruído metálico rítmico vindo do motor, peça verificação da folga de válvulas na revisão — é um ajuste relativamente simples quando pego cedo.',
  },
  {
    severity: 'WARN',
    title: 'Falhas elétricas com múltiplas luzes de alerta sem diagnóstico claro',
    body: 'Proprietários relatam luzes de injeção eletrônica, pneus (TPMS) e estabilidade acendendo no painel, com técnicos de concessionária relatando dificuldade em identificar a causa exata. Se isso acontecer, documente quais luzes acendem e em que situação (ex: ao ligar, em movimento, em determinada velocidade) para ajudar o diagnóstico — informação detalhada acelera a identificação da causa.',
  },
  {
    severity: 'WARN',
    title: 'Ar-condicionado com falhas recorrentes, às vezes sem solução definitiva',
    body: 'Há relatos de proprietários levando o carro à assistência técnica múltiplas vezes para resolver falhas no ar-condicionado sem sucesso definitivo. Se o problema persistir após o primeiro reparo, exija diagnóstico mais completo do sistema (não apenas recarga de gás) antes de aceitar o carro de volta.',
  },
  {
    severity: 'WARN',
    title: 'Estalos na suspensão dianteira, às vezes não resolvidos na primeira tentativa',
    body: 'Ruído de estalo na suspensão dianteira é queixa recorrente, e alguns proprietários relatam que o problema persistiu mesmo após passar pela concessionária. Se o ruído continuar após o primeiro reparo, insista em diagnóstico mais aprofundado (buchas, links da barra estabilizadora, coxins) em vez de aceitar como resolvido sem confirmação.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma WR-V (Honda + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor 1.5 (0W20 full sintético) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão (atenção a estalos) e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido CVT Honda original — item obrigatório, não atrasar. | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Fluido de arrefecimento. | A cada revisão — Verificar folga das válvulas se notar ruído metálico do motor.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'WR-V',
    yearFrom: 2022,
    yearTo: null,
    tireSize: '215/60 R16 (EX/LX) · 215/55 R17 (EXL)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Confirme sempre o valor exato do seu aro/versão na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'WR-V', yearFrom: 2022, yearTo: null, component: 'Óleo do motor (0W20)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.5 i-VTEC flex.', priority: 'CRITICAL', order: 0 },
  { modelName: 'WR-V', yearFrom: 2022, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'WR-V', yearFrom: 2022, yearTo: null, component: 'Fluido CVT Honda original', intervalKm: 40000, intervalMonths: 24, notes: 'Obrigatório não atrasar — principal causa de degradação prematura do CVT.', priority: 'CRITICAL', order: 2 },
  { modelName: 'WR-V', yearFrom: 2022, yearTo: null, component: 'Folga das válvulas — verificação', intervalKm: null, intervalMonths: null, notes: 'Verificar se notar ruído metálico rítmico no motor.', priority: 'MEDIUM', order: 3 },
  { modelName: 'WR-V', yearFrom: 2022, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 4 },
  { modelName: 'WR-V', yearFrom: 2022, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 5 },
  { modelName: 'WR-V', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'WR-V', yearFrom: 2022, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Honda.', priority: 'HIGH', order: 7 },
  { modelName: 'WR-V', yearFrom: 2022, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'WR-V',
    yearFrom: 2022,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Honda WR-V...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Honda', vehicleTypeId: carroType.id },
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

  console.log('✅ Honda WR-V concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
