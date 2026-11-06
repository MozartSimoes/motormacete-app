/**
 * Seed Volkswagen Amarok — macetes, problemas, manutenção e calibragem
 * Picape média, geração atual (2023+) co-desenvolvida com a Ford Ranger,
 * fabricada na Argentina. Duas motorizações principais: 2.0 TDI biturbo
 * (câmbio automático 10 marchas ou manual) e 3.0 V6 TDI (258cv, câmbio
 * automático 10 marchas), tração 4x4. #86 no ranking de vendas 2025 no
 * Brasil (2.734 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:vw-amarok
 *
 * Fontes: autoo.com.br, auto-doc.pt, mobiauto.com.br, motoresnobre.com.br,
 *         agoramotors.com.br, mercadoveiculos.com
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
    title: 'Duas motorizações: confirme qual equipa sua unidade',
    body: 'A Amarok atual é vendida com motor 2.0 TDI biturbo (câmbio manual ou automático de 10 marchas) ou 3.0 V6 TDI (258cv, câmbio automático de 10 marchas). São motores bem diferentes em manutenção — confirme sempre qual equipa sua unidade antes de orçar peça ou revisão.',
  },
  {
    severity: 'WARN',
    title: 'Motor 2.0 TDI: diesel de qualidade reduz risco de problema nos bicos injetores',
    body: 'Há relatos de problemas nos bicos injetores do motor 2.0 TDI por volta dos 60.000 km, com sintomas como partida irregular, marcha lenta instável, aumento de consumo e fumaça preta na aceleração. Abasteça sempre diesel S10 de postos confiáveis para reduzir esse risco — combustível de baixa qualidade é o principal acelerador desse tipo de problema.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático de 10 marchas: evite trocas manuais bruscas em baixa velocidade',
    body: 'O câmbio automático de 10 marchas da geração atual é mais complexo que os anteriores — alguns proprietários relatam trocas irregulares/solavancos em arrancadas e baixa velocidade. Evite usar o modo manual/paddle shift de forma agressiva parado ou em manobra — deixe o câmbio gerenciar as trocas na maior parte do tempo.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor 2.0 TDI: desgaste acelerado da correia dentada em algumas unidades',
    body: 'Proprietários da versão Comfortline com motor 2.0 TDI relataram desgaste acelerado da correia dentada, em alguns casos levando a dano no motor — exigindo troca mais frequente que o intervalo padrão do fabricante. Se sua unidade tiver esse motor, considere antecipar a inspeção da correia e não espere o prazo máximo do manual sem checagem visual.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático 10 marchas com trocas irregulares relatadas',
    body: 'Há relatos de trocas de marcha irregulares e solavancos, principalmente em arrancadas e baixa velocidade, no câmbio automático de 10 marchas da geração atual. Se notar tranco recorrente (não ocasional), documente e acione a garantia — pode indicar necessidade de atualização de software de calibração do câmbio.',
  },
  {
    severity: 'WARN',
    title: 'Sistema multimídia com falhas a partir de 30.000 km',
    body: 'Proprietários de unidades 2024 com central multimídia mais completa relatam deficiências no sistema eletrônico de infotainment a partir de cerca de 30.000 km — travamentos e mau funcionamento de recursos. Mantenha o software sempre atualizado na concessionária, boa parte das instabilidades é corrigida por atualização.',
  },
  {
    severity: 'WARN',
    title: 'Ruído na suspensão traseira e no diferencial',
    body: 'Há relatos de ruído vindo da suspensão traseira e do diferencial, que podem indicar desgaste ou necessidade de manutenção — mais comum em uso intenso fora de estrada ou com carga frequente. Se notar ruído incomum nessas regiões, inclua inspeção específica na próxima revisão em vez de esperar o ruído se agravar.',
  },
  {
    severity: 'WARN',
    title: 'Casos de demora prolongada em reparo na concessionária',
    body: 'Há relato de unidade parada por 80 dias na concessionária para diagnóstico de ruído no motor. Se um reparo se estender muito além do prazo inicialmente informado, formalize a reclamação por escrito e considere acionar o SAC da Volkswagen diretamente.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Amarok (Volkswagen + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (2.0 TDI ou 3.0 V6 TDI, especificação exata do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão (atenção a ruídos traseiros/diferencial) e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de combustível diesel — use sempre diesel S10 de qualidade. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático de 10 marchas. | Correia dentada (motor 2.0 TDI) — considerar inspeção visual antecipada pelo histórico de desgaste acelerado relatado. | Diferencial traseiro — verificar fluido periodicamente, especialmente em uso off-road frequente.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Amarok',
    yearFrom: null,
    yearTo: null,
    tireSize: '265/60 R18 · 255/65 R17 (versões anteriores)',
    frontPsi: 35,
    rearPsi: 35,
    frontPsiLoad: 32,
    rearPsiLoad: 44,
    sparePsi: 60,
    notes: 'Pressão traseira sobe bastante com carga na caçamba (pode chegar a 44 PSI). Confirme sempre o valor exato na etiqueta da coluna da porta do motorista ou tampa do tanque.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Amarok', yearFrom: null, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor (2.0 TDI ou 3.0 V6 TDI).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Amarok', yearFrom: null, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Amarok', yearFrom: null, yearTo: null, component: 'Correia dentada (motor 2.0 TDI) — inspeção antecipada', intervalKm: 40000, intervalMonths: null, notes: 'Histórico de desgaste acelerado relatado — não espere o prazo máximo do manual sem checagem visual.', priority: 'HIGH', order: 2 },
  { modelName: 'Amarok', yearFrom: null, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Amarok', yearFrom: null, yearTo: null, component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'Use sempre diesel S10 de qualidade — bicos injetores são sensíveis a combustível ruim.', priority: 'HIGH', order: 4 },
  { modelName: 'Amarok', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Amarok', yearFrom: null, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Volkswagen.', priority: 'HIGH', order: 6 },
  { modelName: 'Amarok', yearFrom: null, yearTo: null, component: 'Óleo do câmbio automático de 10 marchas', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar tranco ou solavanco recorrente nas trocas.', priority: 'HIGH', order: 7 },
  { modelName: 'Amarok', yearFrom: null, yearTo: null, component: 'Fluido do diferencial traseiro', intervalKm: 40000, intervalMonths: null, notes: 'Verificar com mais frequência em uso off-road intenso.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Amarok', yearFrom: null, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce a pressão traseira quando rodar com carga na caçamba.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Amarok',
    yearFrom: null,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volkswagen Amarok...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
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

  console.log('✅ Volkswagen Amarok concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
