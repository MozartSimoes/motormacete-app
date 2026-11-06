/**
 * Seed Mitsubishi Pajero Sport — macetes, problemas, manutenção e
 * calibragem. SUV 7 lugares sobre chassi de picape, com várias gerações
 * de motor ao longo dos anos: 2.8 diesel/3.0 V6 (mais antigas), 2.5/2.4
 * diesel (HPE/HPE-S/Legend, gerações intermediárias). Modelo descontinuado
 * no Brasil no início de 2026 por incompatibilidade com o Proconve L8 —
 * nova geração baseada na Triton está prevista só para 2027. #98 no
 * ranking de vendas 2025 no Brasil (1.766 un., últimas unidades
 * comercializadas antes da saída de linha).
 * Execute: pnpm --filter @motormacete/database db:seed:mitsubishi-pajerosport
 *
 * Fontes: encontracarros.com.br, auto-doc.pt, 4x4brasil.com.br,
 *         calibragemdepneu.com.br
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
    title: 'Modelo saiu de linha no Brasil em 2026 — comprando usado, confirme a geração/motor',
    body: 'A Pajero Sport deixou de ser vendida nova no Brasil no início de 2026 (incompatibilidade com o Proconve L8); a próxima geração, baseada na plataforma da Triton, só deve chegar em 2027. Isso não afeta a qualidade de unidades já vendidas, mas significa que quem for comprar usado deve confirmar bem qual geração e motor equipa a unidade (2.8 diesel/3.0 V6 mais antigos, ou 2.4/2.5 diesel mais recentes) — são mecânicas bem diferentes entre si.',
  },
  {
    severity: 'WARN',
    title: 'Motor diesel: monitore o turbo a partir de 100.000 km',
    body: 'Motores diesel Mitsubishi (incluindo o da Pajero Sport) têm histórico de falha de turbocompressor entre 100.000 e 150.000 km, geralmente causando perda drástica de potência e aumento do consumo de óleo. Priorize troca de óleo em dia e diesel de qualidade — são os fatores que mais influenciam a vida útil do turbo. A partir dessa faixa de km, vale considerar inspeção preventiva do turbo mesmo sem sintomas.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com a L200 Triton (geração equivalente)',
    body: 'A Pajero Sport compartilha boa parte da mecânica (motor diesel, câmbio, componentes de chassi) com a L200 Triton da geração equivalente. Em oficinas independentes, peças e conhecimento técnico da Triton ajudam a resolver problemas mais rápido quando o cadastro específico da Pajero Sport ainda não existir no sistema da loja.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Falha de turbocompressor entre 100.000-150.000 km',
    body: 'Assim como outros diesel Mitsubishi, a Pajero Sport tem histórico de falha do turbocompressor nessa faixa de quilometragem, com sintomas de perda drástica de potência e aumento de consumo de óleo. Se sua unidade estiver se aproximando dessa faixa, vale antecipar uma inspeção preventiva do turbo, mesmo sem sintomas ainda.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Pajero Sport (Mitsubishi + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (confirme especificação exata conforme geração/motor) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de combustível diesel — use sempre diesel S10 de qualidade. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático. | A partir de 100.000 km — Considerar inspeção preventiva do turbocompressor, mesmo sem sintomas.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Pajero Sport',
    yearFrom: null,
    yearTo: null,
    tireSize: '265/65 R17 · 265/60 R18 (versões mais recentes)',
    frontPsi: 30,
    rearPsi: 32,
    frontPsiLoad: 33,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Valores variam bastante entre gerações e versões — confirme sempre na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Pajero Sport', yearFrom: null, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme geração/motor (2.8, 3.0 V6, 2.4 ou 2.5 diesel).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Pajero Sport', yearFrom: null, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Pajero Sport', yearFrom: null, yearTo: null, component: 'Turbocompressor — inspeção preventiva', intervalKm: 100000, intervalMonths: null, notes: 'Histórico de falha entre 100.000-150.000 km — considerar inspeção mesmo sem sintomas.', priority: 'HIGH', order: 2 },
  { modelName: 'Pajero Sport', yearFrom: null, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Pajero Sport', yearFrom: null, yearTo: null, component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'Use sempre diesel S10 de qualidade.', priority: 'HIGH', order: 4 },
  { modelName: 'Pajero Sport', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Pajero Sport', yearFrom: null, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Mitsubishi.', priority: 'HIGH', order: 6 },
  { modelName: 'Pajero Sport', yearFrom: null, yearTo: null, component: 'Óleo do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar tranco nas trocas.', priority: 'HIGH', order: 7 },
  { modelName: 'Pajero Sport', yearFrom: null, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce a pressão traseira quando rodar com os 7 lugares ocupados.', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Pajero Sport',
    yearFrom: null,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Mitsubishi Pajero Sport...')

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

  console.log('✅ Mitsubishi Pajero Sport concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
