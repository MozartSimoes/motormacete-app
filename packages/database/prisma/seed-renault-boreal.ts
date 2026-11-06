/**
 * Seed Renault Boreal — macetes, problemas, manutenção e calibragem
 * SUV médio, lançado no Brasil em 2025. Motor 1.3 turbo flex (mesmo do
 * Duster/Oroch, 153-163cv conforme combustível), câmbio automatizado de
 * dupla embreagem banhado a óleo (diferente do EDC seco usado no Kardian).
 * Modelo muito recente — ainda sem histórico de confiabilidade de longo
 * prazo. #93 no ranking de vendas 2025 no Brasil (2.194 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:renault-boreal
 *
 * Fontes: suvcar.com.br, vrum.com.br, renault.com.br (ficha técnica
 *         oficial), carro.blog.br
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
    title: 'Motor compartilhado com Duster/Oroch: peças e conhecimento técnico já disponíveis',
    body: 'O motor 1.3 turbo flex do Boreal é o mesmo usado no Duster e no Oroch — em oficinas independentes, peças e conhecimento técnico desses modelos irmãos ajudam a resolver problemas mais rápido quando o cadastro específico do Boreal ainda não existir no sistema da loja.',
  },
  {
    severity: 'OK',
    title: 'Câmbio de dupla embreagem banhado a óleo: mais robusto que o seco, mas ainda peça sensível',
    body: 'O Boreal usa câmbio automatizado de dupla embreagem banhado a óleo, tecnologia diferente (e historicamente mais robusta) do EDC seco usado em outros modelos Renault. Ainda assim, evite manter o carro parado por longos períodos engatado em D com o pé no freio — prefira Neutro/Park em paradas longas, é um cuidado válido para qualquer câmbio de dupla embreagem.',
  },
  {
    severity: 'OK',
    title: 'Sem versão híbrida por enquanto — ajuste as expectativas de consumo urbano',
    body: 'O Boreal ainda não tem versão eletrificada disponível no Brasil (um sistema híbrido leve 48V está previsto para o fim de 2026/2027). Isso significa consumo urbano na faixa de 8,5-11 km/l com gasolina — bem abaixo de rivais já eletrificados. Não é defeito, é característica do projeto atual; ajuste as expectativas se economia de combustível urbano for prioridade.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Modelo muito recente: ainda sem histórico de confiabilidade de longo prazo',
    body: 'O Boreal foi lançado no Brasil em 2025 e, até o momento, não há um volume relevante de relatos de proprietários sobre defeitos crônicos — nem para o bem, nem para o mal. Isso significa que o histórico de confiabilidade de longo prazo ainda está sendo formado. Redobre a atenção a qualquer comportamento anormal nos primeiros meses de uso e documente ocorrências desde o início, já que ainda há pouca experiência acumulada de outros donos para comparar.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Boreal (Renault + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor 1.3 turbo (especificação exata do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000 km — Óleo do câmbio de dupla embreagem — não é vitalício, antecipe se notar tranco ou solavanco.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Boreal',
    yearFrom: 2025,
    yearTo: null,
    tireSize: '215/55 R18 (confirme conforme versão)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 33,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Confirme sempre o valor exato do seu aro/versão na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Boreal', yearFrom: 2025, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.3 turbo flex, compartilhado com Duster/Oroch.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Boreal', yearFrom: 2025, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Boreal', yearFrom: 2025, yearTo: null, component: 'Óleo do câmbio de dupla embreagem', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar tranco ou solavanco nas trocas.', priority: 'HIGH', order: 2 },
  { modelName: 'Boreal', yearFrom: 2025, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Boreal', yearFrom: 2025, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Boreal', yearFrom: 2025, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Boreal', yearFrom: 2025, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Renault.', priority: 'HIGH', order: 6 },
  { modelName: 'Boreal', yearFrom: 2025, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 7 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Boreal',
    yearFrom: 2025,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Renault Boreal...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Renault', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Renault', vehicleTypeId: carroType.id },
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

  console.log('✅ Renault Boreal concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
