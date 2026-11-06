/**
 * Seed Ford Bronco Sport — macetes, problemas, manutenção e calibragem
 * SUV compacto off-road, motor 2.0 turbo EcoBoost, câmbio automático,
 * tração integral (AWD/4WD conforme versão — Badlands/Wildtrak).
 * #88 no ranking de vendas 2025 no Brasil (2.620 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:ford-broncosport
 *
 * Fontes: reclameaqui.com.br, carroslancamentos.com.br, mobiauto.com.br,
 *         mundodoautomovelparapcd.com.br, autopapo.com.br
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
    title: 'Sistema AWD: vibração em baixa velocidade pode ser óleo contaminado, não peça quebrada',
    body: 'A Ford reconheceu em boletim técnico interno (13/09/2023) um problema crônico de vibração em baixa velocidade no diferencial traseiro do Bronco/Bronco Sport, ligado à contaminação do óleo do sistema AWD. Se notar vibração nessa condição, peça na concessionária para verificar especificamente esse boletim antes de aceitar diagnóstico de peça quebrada — muitas vezes o problema é resolvido com troca do óleo contaminado, reparo bem mais barato.',
  },
  {
    severity: 'OK',
    title: 'Motor 2.0 EcoBoost: siga o intervalo de óleo à risca, sem exceções',
    body: 'Assim como outros modelos Ford com motor EcoBoost, há histórico de sensibilidade a atraso na troca de óleo. Não estique o prazo do manual em hipótese alguma e use sempre a especificação exata indicada — é o cuidado mais importante para reduzir risco de falha prematura nesse motor.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Relato de falha grave no motor com apenas ~2.600 km rodados',
    body: 'Há relato documentado de falha grave no motor em unidade com aproximadamente 2.600 km, com luz de defeito no painel e forte vibração no motor. Se sua unidade apresentar vibração anormal do motor e/ou luz de avaria acesa, mesmo com baixa quilometragem, não continue rodando normalmente — pare em local seguro e leve para diagnóstico imediato. A Ford também enfrenta processo nos EUA por falhas no motor EcoBoost ligadas a vazamento de líquido de arrefecimento para dentro dos cilindros em outros modelos com o mesmo motor.',
  },
  {
    severity: 'WARN',
    title: 'Vibração crônica no diferencial traseiro (AWD) — problema reconhecido pela Ford',
    body: 'O diferencial traseiro do sistema AWD apresenta vibração em baixa velocidade de forma recorrente, problema já reconhecido pela própria Ford em boletim técnico interno (setembro de 2023) e atribuído à contaminação do óleo do sistema. Se notar vibração ao rodar devagar, cite esse boletim na concessionária para agilizar o diagnóstico correto.',
  },
  {
    severity: 'WARN',
    title: 'Ruído na suspensão traseira em lombadas e frenagens leves',
    body: 'Proprietários relatam ruído vindo da suspensão traseira em lombadas e até em frenagens leves, incluindo casos de quebra do batente do amortecedor. Se notar esse tipo de ruído, peça inspeção específica dos batentes e coxins da suspensão traseira — é um reparo relativamente simples quando identificado a tempo.',
  },
  {
    severity: 'WARN',
    title: 'Falhas na transmissão automática com códigos de erro internos',
    body: 'Há relatos de falha grave na transmissão automática, com códigos de erro apontando defeito em componentes internos do câmbio. Se o carro apresentar tranco, luz de câmbio no painel ou mudança de comportamento nas trocas de marcha, não adie o diagnóstico — esse tipo de falha tende a se agravar rapidamente.',
  },
  {
    severity: 'WARN',
    title: 'Falha no sistema de combustível (tubo separador da mangueira do tanque)',
    body: 'Foi identificada falha no sistema de combustível envolvendo substituição do tubo separador da mangueira de drenagem do tanque em algumas unidades. Se notar cheiro de combustível ou dificuldade/demora ao abastecer, reporte imediatamente à concessionária.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Bronco Sport (Ford + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor 2.0 EcoBoost (especificação exata do manual) + filtro de óleo — não atrasar em hipótese alguma. | 10.000 km — Inspeção de freios, suspensão traseira (batentes/coxins) e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 40.000 km — Óleo do sistema AWD/diferencial traseiro — antecipe se notar vibração em baixa velocidade (problema reconhecido pela Ford). | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Fluido do câmbio automático.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Bronco Sport',
    yearFrom: 2021,
    yearTo: null,
    tireSize: '235/55 R18 (confirme conforme versão — Badlands/Wildtrak usam pneus off-road específicos)',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Confirme sempre o valor exato do seu aro/versão na etiqueta da coluna da porta do motorista — Badlands e Wildtrak usam pneus com perfil diferente para uso off-road.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Bronco Sport', yearFrom: 2021, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.0 EcoBoost turbo — não atrasar a troca em hipótese alguma.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Bronco Sport', yearFrom: 2021, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Bronco Sport', yearFrom: 2021, yearTo: null, component: 'Óleo do sistema AWD/diferencial traseiro', intervalKm: 40000, intervalMonths: null, notes: 'Problema de vibração por contaminação de óleo reconhecido pela Ford em boletim técnico (set/2023) — antecipe se notar vibração em baixa velocidade.', priority: 'HIGH', order: 2 },
  { modelName: 'Bronco Sport', yearFrom: 2021, yearTo: null, component: 'Suspensão traseira (batentes/coxins) — inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Histórico de ruído e quebra de batente relatado.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Bronco Sport', yearFrom: 2021, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Bronco Sport', yearFrom: 2021, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Bronco Sport', yearFrom: 2021, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Bronco Sport', yearFrom: 2021, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Ford.', priority: 'HIGH', order: 7 },
  { modelName: 'Bronco Sport', yearFrom: 2021, yearTo: null, component: 'Fluido do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar tranco ou luz de câmbio no painel.', priority: 'HIGH', order: 8 },
  { modelName: 'Bronco Sport', yearFrom: 2021, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Bronco Sport',
    yearFrom: 2021,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Ford Bronco Sport...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Ford', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Ford', vehicleTypeId: carroType.id },
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

  console.log('✅ Ford Bronco Sport concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
