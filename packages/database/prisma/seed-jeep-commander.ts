/**
 * Seed Jeep Commander — macetes, problemas, manutenção e calibragem de pneus
 * SUV 7 lugares (Longitude/Limited/Overland) sobre a plataforma do Compass.
 * Linha com três motorizações: 1.3 turbo flex T270 (185cv, câmbio automático
 * 6 marchas, 4x2), 2.0 turbodiesel TD380 (170cv, câmbio automático 9 marchas,
 * 4x4) e o novo 2.0 turbo Hurricane a gasolina (272cv, desde 2025, nas
 * versões Black/Overland). #43 no ranking de vendas 2025 no Brasil
 * (17.790 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:jeep-commander
 *
 * Fontes: clickpetroleoegas.com.br, terra.com.br, turbonoticias.com.br,
 *         autopapo.com.br, media.stellantis.com, webmotors.com.br,
 *         mercadoveiculos.com
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
    title: 'Três motores na linha: confirme qual equipa sua unidade antes de qualquer serviço',
    body: 'A Commander tem 1.3 turbo flex T270 (185cv, câmbio automático 6 marchas, tração 4x2), 2.0 turbodiesel TD380 (170cv, câmbio automático 9 marchas, tração 4x4) e o novo 2.0 turbo Hurricane a gasolina (272cv, desde 2025). São motores completamente diferentes em manutenção, óleo e peças — confirme sempre qual equipa sua unidade antes de orçar revisão.',
  },
  {
    severity: 'WARN',
    title: 'Motor T270: monitore o nível de óleo entre trocas',
    body: 'O motor 1.3 turbo T270 (compartilhado com Renegade e Compass) tem histórico de consumo de óleo acima do normal — a própria Stellantis considera consumo de até 400ml a cada 1.000 km como "dentro do esperado" para esse motor. Verifique o nível de óleo pela vareta a cada 1.000-2.000 km e complete se necessário; não espere a luz de óleo baixo acender no painel para agir.',
  },
  {
    severity: 'OK',
    title: 'Versão diesel TD380: cuidado redobrado com o sistema de pós-tratamento',
    body: 'Nas versões diesel (TD380), evite rodar constantemente em baixa velocidade/trajetos muito curtos, já que isso dificulta a regeneração automática do filtro de partículas (DPF). Faça viagens mais longas em rodovia periodicamente para permitir a queima da fuligem acumulada e reduzir o risco de entrar em modo de segurança (potência reduzida).',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático de 9 marchas (diesel): não force trocas manuais bruscas',
    body: 'O câmbio automático de 9 marchas das versões diesel é mais complexo que o de 6 marchas das versões flex. Evite usar o modo manual/paddle shift de forma agressiva em baixa velocidade — deixe o câmbio gerenciar as trocas na maior parte do tempo, reservando o modo manual para descidas longas ou ultrapassagens.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor T270: consumo excessivo de óleo pode levar à falha do motor com baixa quilometragem',
    body: 'Desde os primeiros lotes, o motor T270 (usado em Commander, Compass e Renegade) apresenta consumo de óleo acima do normal — o desenho dos anéis do pistão e a alta pressão do turbo permitem passagem maior de óleo para a câmara de combustão. Há casos registrados de falha do motor com menos de 4.000 km rodados. Em 2024 surgiram também relatos de vazamento de óleo ligado a defeito no retentor traseiro do virabrequim. Monitore o nível de óleo com frequência e não ignore consumo acima de 1 litro a cada 1.000-2.000 km — procure a concessionária para avaliação sob garantia.',
  },
  {
    severity: 'WARN',
    title: 'Redução de potência do motor T270 na linha 2025 por norma de emissões',
    body: 'Para atender à norma Proconve L8, o motor 1.3 T270 dos modelos 2025 (Renegade, Compass, Commander) passou a entregar 176cv em vez da potência anterior, independentemente do combustível usado. Não é defeito — é ajuste de calibração para atender à legislação de emissões. Se notar a Commander "mais lenta" que um modelo de ano anterior, essa é a explicação mais provável.',
  },
  {
    severity: 'WARN',
    title: 'Motor Hurricane 2.0 (linha 2025): motor novo, ainda sem histórico consolidado no Brasil',
    body: 'O motor Hurricane 2.0 turbo (272cv) é recente na linha Commander (a partir de 2025) e ainda não tem histórico de confiabilidade consolidado no mercado brasileiro. Nos EUA, esse motor já teve relatos de vazamento em bomba, resíduo metálico no sistema de combustível de alta pressão e problemas de fabricação em unidades isoladas. Se optar por essa versão, priorize revisões em dia e fique atento a qualquer ruído ou vazamento incomum nos primeiros meses de uso.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Commander (Jeep + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (especificação exata conforme motor: T270, TD380 ou Hurricane) + filtro de óleo; monitore o nível entre trocas no T270. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 40.000 km — Filtro de combustível diesel (versões TD380). | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático (6 ou 9 marchas conforme versão). | Diesel — Verificar sistema de pós-tratamento (DPF/ARLA 32) a cada revisão e evitar uso exclusivo em trajetos curtos.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Commander',
    yearFrom: 2022,
    yearTo: null,
    tireSize: '235/55 R18 · 235/50 R19 (versões superiores)',
    frontPsi: 32,
    rearPsi: 35,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'SUV 7 lugares — pressão traseira sobe com o carro cheio (3ª fileira + bagagem). Confirme o valor exato do seu aro/versão na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Commander', yearFrom: 2022, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor (T270, TD380 ou Hurricane). No T270, monitore nível entre trocas.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Commander', yearFrom: 2022, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Commander', yearFrom: 2022, yearTo: null, component: 'Nível de óleo (verificação manual — motor T270)', intervalKm: 1000, intervalMonths: null, notes: 'Motor com histórico de consumo de óleo acima do normal — verifique pela vareta com frequência.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Commander', yearFrom: 2022, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Commander', yearFrom: 2022, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Commander', yearFrom: 2022, yearTo: null, component: 'Filtro de combustível diesel (versões TD380)', intervalKm: 40000, intervalMonths: 24, notes: 'Use sempre diesel S10 de qualidade.', priority: 'HIGH', order: 5 },
  { modelName: 'Commander', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Commander', yearFrom: 2022, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Jeep.', priority: 'HIGH', order: 7 },
  { modelName: 'Commander', yearFrom: 2022, yearTo: null, component: 'Óleo do câmbio automático (6 ou 9 marchas)', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar tranco nas trocas.', priority: 'HIGH', order: 8 },
  { modelName: 'Commander', yearFrom: 2022, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce a pressão traseira quando rodar com os 7 lugares ocupados.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Commander',
    yearFrom: 2022,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Jeep Commander...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Jeep', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Jeep', vehicleTypeId: carroType.id },
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

  console.log('✅ Jeep Commander concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
