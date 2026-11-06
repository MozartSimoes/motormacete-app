/**
 * Seed Volkswagen Taos — macetes, problemas, manutenção e calibragem
 * SUV médio lançado no Brasil em 2023, sobre a plataforma MQB compartilhada
 * com T-Cross/Nivus. Motor único 1.4 TSI 250 flex (150cv/25,5kgfm) — câmbio
 * automático de 6 marchas (Aisin, convencional, não DSG) nas versões
 * 2023-2024, atualizado para 8 marchas na linha 2025. #51 no ranking de
 * vendas 2025 no Brasil (12.924 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:vw-taos
 *
 * Fontes: carroslancamentos.com.br, mobiauto.com.br, mercadolivre.com.br/blog,
 *         virgola.com.br, calibragemdepneu.com.br, vw.com.br
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
    title: 'Câmbio automático convencional (Aisin), não DSG',
    body: 'O Taos 2023-2024 usa câmbio automático de 6 marchas convencional (Aisin), não o DSG de dupla embreagem usado em outros modelos VW — a linha 2025 passou a usar câmbio de 8 marchas. Ambos têm histórico de confiabilidade melhor que o DSG seco em uso urbano com trânsito parado, sem os cuidados especiais que o DSG exige.',
  },
  {
    severity: 'OK',
    title: 'Modelo novo no Brasil: siga o manual à risca, ainda sem histórico longo',
    body: 'O Taos chegou ao Brasil em 2023 e ainda não acumulou um histórico de confiabilidade de longo prazo como modelos mais antigos da VW. Siga rigorosamente os intervalos do manual e não estique prazos de revisão — é a forma mais segura de evitar problemas em um modelo ainda "jovem" no mercado nacional.',
  },
  {
    severity: 'OK',
    title: 'Compartilha plataforma com T-Cross e Nivus',
    body: 'O Taos usa a mesma plataforma MQB e motor 1.4 TSI 250 do T-Cross e do Nivus. Em oficinas independentes, peças e conhecimento técnico desses modelos irmãos podem ajudar a encontrar solução mais rápido quando o cadastro específico do Taos ainda não existir no sistema da loja.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste prematuro das pastilhas de freio relatado por alguns donos',
    body: 'Há relatos de desgaste das pastilhas de freio mais rápido que o esperado. Fique atento a ruído de frenagem ou pedal "fundo" antes do previsto e considere inspecionar as pastilhas antes do intervalo padrão se notar esses sinais.',
  },
  {
    severity: 'WARN',
    title: 'Ruídos nas rodas relatados por proprietários',
    body: 'Alguns donos relatam ruídos vindos das rodas, especialmente em pisos irregulares ou lombadas. Se notar ruído recorrente, peça inspeção de rolamentos e fixação das rodas na concessionária — a VW tem oferecido substituição gratuita de peças afetadas em alguns casos.',
  },
  {
    severity: 'WARN',
    title: 'Carregador de smartphone por indução com falhas',
    body: 'Há relatos de mau funcionamento do carregador de celular por indução (sem fio) presente nas versões mais equipadas. Não é falha de segurança, mas se o carregamento parar de funcionar, vale registrar na concessionária — problema já reconhecido pela marca em algumas unidades.',
  },
  {
    severity: 'WARN',
    title: 'Dificuldades no funcionamento do limpador de para-brisa',
    body: 'Proprietários relataram problemas no funcionamento do limpador de para-brisa. Teste o funcionamento em todas as velocidades periodicamente, especialmente antes de períodos de chuva mais intensa.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Taos (Volkswagen + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor 1.4 TSI (especificação exata do manual) + filtro de óleo. | 10.000 km — Inspeção de freios (atenção ao desgaste de pastilhas relatado), suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático (6 ou 8 marchas conforme o ano). | A cada revisão — Testar carregador por indução e limpador de para-brisa, itens com relatos de falha.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Taos',
    yearFrom: 2023,
    yearTo: null,
    tireSize: '215/55 R17 (Comfortline) · 215/50 R18 (Highline/Launching Edition)',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Valores de referência alinhados à plataforma compartilhada com T-Cross/Nivus. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Taos', yearFrom: 2023, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.4 TSI — siga exatamente a especificação do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Taos', yearFrom: 2023, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Taos', yearFrom: 2023, yearTo: null, component: 'Pastilhas de freio — inspeção antecipada', intervalKm: 10000, intervalMonths: null, notes: 'Relatos de desgaste mais rápido que o esperado.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Taos', yearFrom: 2023, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Taos', yearFrom: 2023, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Taos', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Taos', yearFrom: 2023, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Volkswagen.', priority: 'HIGH', order: 6 },
  { modelName: 'Taos', yearFrom: 2023, yearTo: null, component: 'Óleo do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar tranco nas trocas.', priority: 'HIGH', order: 7 },
  { modelName: 'Taos', yearFrom: 2023, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Taos',
    yearFrom: 2023,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volkswagen Taos...')

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

  console.log('✅ Volkswagen Taos concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
