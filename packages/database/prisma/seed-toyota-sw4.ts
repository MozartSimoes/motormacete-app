/**
 * Seed Toyota SW4 (Hilux SW4) — macetes, problemas, manutenção e calibragem
 * SUV de 7 lugares derivado da Hilux, sobre o mesmo chassi em escada. Duas
 * motorizações: 2.7 flex 16V (versão SR 4x2, câmbio manual ou automático) e
 * 2.8 turbodiesel 1GD-FTV (versões SRV/SRX/Diamond/GR-S, 4x4, câmbio
 * automático 6 marchas). #45 no ranking de vendas 2025 no Brasil
 * (17.077 un.). Conteúdo específico do diesel/chassi (DPF, injetores,
 * diferenciais) já coberto no perfil da Hilux, compartilhado automaticamente
 * por casar o nome "Hilux" dentro de "Hilux SW4" na busca por FIPE.
 * Execute: pnpm --filter @motormacete/database db:seed:toyota-sw4
 *
 * Fontes: reclameaqui.com.br, carroslancamentos.com.br, virgola.com.br,
 *         instacarro.com, motoragora.com.br, calibragemdepneu.com.br
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
    title: 'Duas motorizações bem diferentes: confirme qual equipa sua unidade',
    body: 'A versão SR 4x2 usa motor 2.7 flex 16V, enquanto as versões SRV, SRX, Diamond e GR-S usam o 2.8 turbodiesel 1GD-FTV com tração 4x4. São motores completamente diferentes em manutenção — o diesel compartilha praticamente toda a mecânica com a Hilux pickup (injetores, DPF, diferenciais), então vale consultar também o conteúdo específico da Hilux para essas versões.',
  },
  {
    severity: 'WARN',
    title: 'Versão flex 2.7: atenção ao consumo e ao histórico de fragilidade relatado',
    body: 'A versão SR 4x2 com motor 2.7 flex tem relatos de maior fragilidade e consumo elevado de combustível em comparação ao diesel. Se optar por essa versão, mantenha a troca de óleo rigorosamente em dia e desconfie de sintomas como falha de ignição ou consumo anormalmente alto — pode indicar problema de sincronismo (timing) já relatado por alguns proprietários.',
  },
  {
    severity: 'OK',
    title: 'Amortecedores: fique atento a ruídos e perda de conforto',
    body: 'Há relatos recorrentes de desgaste ou falha prematura de amortecedores na SW4. Preste atenção a ruídos de "batida" na suspensão ou perda de conforto/estabilidade em pisos irregulares — quanto antes for diagnosticado, menor a chance de danos secundários em outros componentes da suspensão.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Relatos de falhas graves após revisão em concessionária',
    body: 'Há registros de proprietários relatando falhas graves e risco de segurança logo após revisões feitas em concessionária. Sempre teste o veículo com atenção após qualquer revisão (freios, direção, ruídos anormais) antes de pegar a estrada, e não hesite em retornar imediatamente se notar qualquer comportamento diferente do usual.',
  },
  {
    severity: 'WARN',
    title: 'Problemas de fixação de bancos e funcionamento do porta-malas',
    body: 'Proprietários relataram problemas de fixação/folga nos bancos e mau funcionamento do porta-malas (incluindo o vidro traseiro independente, item característico da SW4). Verifique a fixação dos bancos e o funcionamento de todas as travas/vidros elétricos do porta-malas ainda no período de garantia.',
  },
  {
    severity: 'WARN',
    title: 'Falhas no ar-condicionado (compressor) relatadas em algumas unidades',
    body: 'Há relatos de necessidade de troca do compressor do ar-condicionado em unidades específicas. Se notar perda de eficiência de resfriamento ou ruído vindo do compressor, agende diagnóstico o quanto antes — o AC costuma ser um dos itens que mais aparece em reclamações do modelo.',
  },
  {
    severity: 'WARN',
    title: 'Central multimídia (Toyota Play) considerada abaixo do esperado',
    body: 'Mesmo em versões topo de linha, a central multimídia Toyota Play é criticada por proprietários por não atender às expectativas de resposta e recursos frente à concorrência do segmento. Não é falha de segurança, mas vale considerar na hora de negociar acessórios/atualizações se isso for relevante para você.',
  },
  {
    severity: 'WARN',
    title: 'Descarga de bateria relatada por alguns proprietários',
    body: 'Alguns donos relatam a bateria descarregando antes do esperado. Se notar dificuldade de partida, principalmente pela manhã, teste a bateria e o sistema de carga na concessionária — pode estar ligado a uso intenso de acessórios eletrônicos em trajetos curtos.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SW4 (Toyota + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (2.7 flex ou 2.8 diesel, conforme a versão) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão (atenção a amortecedores) e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 20.000 km — Filtro de combustível diesel (versões 4x4). | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático. | Amortecedores — inspecionar a cada revisão pelo histórico de desgaste relatado. | Diesel — consultar também o cronograma da Hilux para itens compartilhados (DPF, diferenciais, correia dentada).',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'SW4',
    yearFrom: 2016,
    yearTo: null,
    tireSize: '265/65 R17 (SR/SRV) · 265/60 R18 (SRX/Diamond/GR-S)',
    frontPsi: 29,
    rearPsi: 32,
    frontPsiLoad: 33,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Valores para uso como SUV de passageiros (7 lugares) — diferentes dos valores de carga máxima da Hilux cabine/chassi. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'SW4', yearFrom: 2016, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor (2.7 flex ou 2.8 diesel).', priority: 'CRITICAL', order: 0 },
  { modelName: 'SW4', yearFrom: 2016, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'SW4', yearFrom: 2016, yearTo: null, component: 'Amortecedores — inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Histórico de desgaste/falha prematura relatado por proprietários.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SW4', yearFrom: 2016, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SW4', yearFrom: 2016, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'SW4', yearFrom: 2016, yearTo: null, component: 'Filtro de combustível diesel (versões 4x4)', intervalKm: 20000, intervalMonths: 24, notes: 'Use sempre diesel S10 de qualidade — injetores são sensíveis a combustível ruim.', priority: 'HIGH', order: 5 },
  { modelName: 'SW4', yearFrom: 2016, yearTo: null, component: 'Ar-condicionado — verificação do compressor', intervalKm: null, intervalMonths: 12, notes: 'Item recorrente em reclamações — verifique eficiência de resfriamento e ruído.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SW4', yearFrom: 2016, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 7 },
  { modelName: 'SW4', yearFrom: 2016, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Toyota.', priority: 'HIGH', order: 8 },
  { modelName: 'SW4', yearFrom: 2016, yearTo: null, component: 'Óleo do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar tranco nas trocas.', priority: 'HIGH', order: 9 },
  { modelName: 'SW4', yearFrom: 2016, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce a pressão traseira quando rodar com os 7 lugares ocupados.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'SW4',
    yearFrom: 2016,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Toyota SW4...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Toyota', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Toyota', vehicleTypeId: carroType.id },
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

  console.log('✅ Toyota SW4 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
