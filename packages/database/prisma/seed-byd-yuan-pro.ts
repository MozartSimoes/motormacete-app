/**
 * Seed BYD Yuan Pro — macetes, problemas, manutenção e calibragem
 * SUV compacto 100% elétrico, rival do Creta/HB20 no segmento, lançado no
 * Brasil em 2024. Autonomia declarada de ~250 km (Inmetro). Não confundir
 * com o "Yuan Plus" (modelo irmão maior, também no catálogo BYD) — são
 * FIPE distintos e não colidem na busca. #68 no ranking de vendas 2025 no
 * Brasil (4.733 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:byd-yuan-pro
 *
 * Fontes: autoo.com.br, reclameaqui.com.br, poder360.com.br,
 *         autopapo.com.br, byd.com (ficha técnica oficial)
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
    title: 'Planeje viagens com margem — autonomia real varia bastante',
    body: 'A autonomia declarada de cerca de 250 km (Inmetro) é medida em condições controladas. Estilo de condução, velocidade, uso de ar-condicionado/aquecimento de bancos e temperatura externa afetam bastante o resultado real. Para viagens mais longas, planeje paradas de recarga com folga em vez de contar com o número exato do painel até o fim.',
  },
  {
    severity: 'OK',
    title: 'Configure o limite de carga em 80-90% para uso diário',
    body: 'Como em qualquer elétrico, reserve os 100% de carga para viagens longas e configure o limite em 80-90% para o dia a dia — isso ajuda a preservar a vida útil da bateria no longo prazo.',
  },
  {
    severity: 'WARN',
    title: 'Fique atento à letra miúda da garantia de bateria',
    body: 'A garantia de 8 anos da bateria só cobre perda de eficiência acima de 40% — ou seja, degradação abaixo desse patamar não é coberta. Registre a autonomia real do seu carro periodicamente (por exemplo, a cada revisão) para ter histórico documentado caso precise acionar a garantia no futuro.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Autonomia real relatada abaixo da esperada em alguns casos',
    body: 'Há relatos de proprietários com o painel indicando autonomia próxima de 300 km, mas a bateria esgotando de forma desproporcional após poucas dezenas de km rodados. A própria BYD atribui essa variação a estilo de condução e uso de sistemas auxiliares (AC, som, aquecimento de bancos) — mas se a discrepância for muito grande e recorrente, vale documentar e levar para diagnóstico da bateria na concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Recall internacional de vedação da bateria (produção 2021-2022) — verifique se sua unidade é afetada',
    body: 'A BYD convocou recall global de mais de 71.000 unidades do Yuan Pro fabricadas entre fevereiro de 2021 e agosto de 2022 por falha na vedação da bateria (anel de vedação mal montado, com risco de infiltração de água em imersão prolongada e redução do isolamento elétrico). Esse lote é anterior ao lançamento oficial do Yuan Pro no Brasil (2024), então a maioria das unidades brasileiras deve estar fora dessa faixa — mas se você importou ou comprou uma unidade de fabricação mais antiga, confirme a data de produção com a concessionária BYD para verificar se o recall se aplica.',
  },
  {
    severity: 'WARN',
    title: 'Falta de sistemas avançados de assistência ao motorista (ADAS) frente a rivais',
    body: 'O Yuan Pro oferece menos recursos de ADAS (assistentes de condução) que parte da concorrência direta no segmento. Não é uma falha, mas é um ponto a considerar na comparação com rivais — verifique quais assistentes vêm de série na sua versão antes de comparar preço.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Yuan Pro (BYD + itens específicos de EV)',
    body: 'Sem troca de óleo de motor — é 100% elétrico. | Inspeção anual — Freios (mesmo com pouco uso pela regenerativa, verificar oxidação), suspensão e níveis de fluido de freio. | 40.000 km — Fluido de freio DOT 4. | Anual — Inspeção do sistema de alta tensão (bateria/cabos/porta de recarga) e verificação da vedação da bateria. | A cada revisão — Registrar a autonomia real observada para ter histórico documentado frente à garantia de degradação (cobertura só acima de 40% de perda).',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Yuan Pro',
    yearFrom: 2024,
    yearTo: null,
    tireSize: '215/55 R18 (confirme conforme versão)',
    frontPsi: 35,
    rearPsi: 35,
    frontPsiLoad: 38,
    rearPsiLoad: 42,
    sparePsi: null,
    notes: 'EVs costumam pedir pressão mais alta que carros a combustão equivalentes, pelo peso extra da bateria. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Yuan Pro', yearFrom: 2024, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos/porta de recarga)', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual, incluindo verificação da vedação da bateria.', priority: 'HIGH', order: 0 },
  { modelName: 'Yuan Pro', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 1 },
  { modelName: 'Yuan Pro', yearFrom: 2024, yearTo: null, component: 'Freios — inspeção (oxidação por baixo uso)', intervalKm: null, intervalMonths: 12, notes: 'Frenagem regenerativa reduz uso do freio mecânico — acionar os freios convencionais periodicamente evita oxidação.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Yuan Pro', yearFrom: 2024, yearTo: null, component: 'Registro de autonomia real', intervalKm: null, intervalMonths: 12, notes: 'Documentar a cada revisão — importante para eventual acionamento da garantia de degradação da bateria (cobertura só acima de 40% de perda).', priority: 'MEDIUM', order: 3 },
  { modelName: 'Yuan Pro', yearFrom: 2024, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado — peso extra da bateria desgasta mais os pneus dianteiros.', priority: 'MEDIUM', order: 4 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Yuan Pro',
    yearFrom: 2024,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed BYD Yuan Pro...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BYD', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'BYD', vehicleTypeId: carroType.id },
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

  console.log('✅ BYD Yuan Pro concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
