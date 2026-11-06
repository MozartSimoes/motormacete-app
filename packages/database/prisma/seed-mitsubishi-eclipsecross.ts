/**
 * Seed Mitsubishi Eclipse Cross — macetes, problemas, manutenção e calibragem
 * SUV médio, motor único 1.5 turbo T-MIVEC (165cv), câmbio CVT com simulação
 * de 8 marchas, tração dianteira ou integral AWC conforme versão (HPE-S).
 * Nome não deve ser confundido com o antigo "Eclipse" (cupê esportivo
 * 1990-2000, GS/GST/GSX/GT) — são veículos completamente diferentes que não
 * colidem na busca por FIPE. #56 no ranking de vendas 2025 no Brasil
 * (10.032 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:mitsubishi-eclipsecross
 *
 * Fontes: carroslancamentos.com.br, auto-doc.pt, mobiauto.com.br,
 *         gruposentinela.com.br, motoragora.com.br, mercadoveiculos.com
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
    title: 'Motor único 1.5 turbo: siga o intervalo de óleo à risca',
    body: 'Todas as versões usam o mesmo motor 1.5 turbo T-MIVEC (165cv), então a manutenção do motor é idêntica em toda a linha — o que muda entre versões é o equipamento e, em alguns casos, a tração (dianteira ou integral AWC). Use sempre a especificação exata de óleo do manual, essencial para preservar o turbo.',
  },
  {
    severity: 'WARN',
    title: 'CVT: evite acelerações bruscas e prolongadas em subida',
    body: 'O câmbio CVT (com simulação de 8 marchas) tende a sofrer mais com uso agressivo — acelerações bruscas e prolongadas em subidas geram mais calor no fluido e aceleram o desgaste da correia/polias internas. Prefira acelerar de forma progressiva e, em subidas longas, use o modo manual/paddle shift se sua versão tiver essa opção.',
  },
  {
    severity: 'OK',
    title: 'Versões com tração integral (AWC): reserve para uso real fora do asfalto',
    body: 'As versões HPE-S com tração integral AWC entregam mais tração em piso escorregadio ou fora de estrada, mas em uso 100% urbano no asfalto seco a diferença prática é pequena frente às versões de tração dianteira. Não é necessário nem recomendado forçar uso constante em modo mais tracionado apenas por precaução — isso só aumenta o consumo sem ganho real.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'CVT com sinais de fraqueza mesmo em baixa quilometragem',
    body: 'Há relatos de câmbio CVT apresentando mudanças bruscas, resposta atrasada e ruídos incomuns mesmo em unidades com quilometragem relativamente baixa — em alguns casos o câmbio demora para engrenar e o carro não sai imediatamente do lugar. Se notar esses sintomas, não adie o diagnóstico: problemas de CVT tendem a se agravar e o reparo fica mais caro quanto mais se posterga.',
  },
  {
    severity: 'WARN',
    title: 'Direção puxando para o lado e ruído próximo à porta do motorista',
    body: 'Proprietários relatam o carro puxando para a direita mesmo com alinhamento em dia, além de ruído incômodo vindo da região da porta do motorista. Se notar o carro puxando para um lado, insista em novo alinhamento/geometria de suspensão e, se persistir, peça inspeção mais profunda da direção antes de aceitar como "normal".',
  },
  {
    severity: 'WARN',
    title: 'Para-lamas da versão Outdoor com deformidades e frestas',
    body: 'Os para-lamas específicos da versão Outdoor (alargadores plásticos) apresentam relatos de deformidade e frestas que acumulam sujeira. Não é falha mecânica, mas vale inspecionar o encaixe desses componentes nas revisões e reportar folgas visíveis à concessionária ainda na garantia.',
  },
  {
    severity: 'WARN',
    title: 'Ruído no teto solar (estalos e rangidos)',
    body: 'Proprietários relatam estalos e rangidos vindos do teto solar, mais perceptíveis em pisos irregulares ou variação de temperatura. Geralmente é resolvido com lubrificação dos trilhos/borrachas de vedação na concessionária — reporte na revisão se o ruído incomodar.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Eclipse Cross (Mitsubishi + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor 1.5 turbo (especificação exata do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Fluido do câmbio CVT — não é vitalício, antecipe se notar mudança brusca ou ruído. | A cada revisão — Verificar alinhamento/geometria se notar o carro puxando para um lado, e lubrificar trilhos do teto solar se houver ruído.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Eclipse Cross',
    yearFrom: null,
    yearTo: null,
    tireSize: '215/70 R16 · 225/55 R18 (versões superiores)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Confirme sempre o valor exato do seu aro/versão na etiqueta da coluna da porta do motorista e recalibre a cada 15 dias.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Eclipse Cross', yearFrom: null, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.5 turbo T-MIVEC — siga exatamente a especificação do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Eclipse Cross', yearFrom: null, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Eclipse Cross', yearFrom: null, yearTo: null, component: 'Fluido do câmbio CVT', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar mudança brusca, resposta atrasada ou ruído — histórico de fraqueza relatado em baixa km.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Eclipse Cross', yearFrom: null, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Eclipse Cross', yearFrom: null, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Eclipse Cross', yearFrom: null, yearTo: null, component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: null, notes: 'Verificar se notar o carro puxando para um lado — relato recorrente entre proprietários.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Eclipse Cross', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Eclipse Cross', yearFrom: null, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Mitsubishi.', priority: 'HIGH', order: 7 },
  { modelName: 'Eclipse Cross', yearFrom: null, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Eclipse Cross',
    yearFrom: null,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Mitsubishi Eclipse Cross...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Mitsubishi', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Mitsubishi', vehicleTypeId: carroType.id },
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

  console.log('✅ Mitsubishi Eclipse Cross concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
