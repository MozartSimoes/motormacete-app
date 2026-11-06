/**
 * Seed Chevrolet Ipanema — macetes, problemas, manutenção e calibragem de pneus
 * Perua (station wagon) baseada no Kadett, produzida pela GM do Brasil de 1990
 * a 1998. Compartilha toda a mecânica com o Kadett — motor 1.8 ou 2.0 (gasolina
 * ou álcool), carburado nas versões iniciais e injeção eletrônica monoponto (EFI)
 * a partir do início dos anos 1990. Versões GL e GLS; a partir de 1994, vendida
 * apenas em carroceria de 5 portas.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-ipanema
 *
 * Fontes: pt.wikipedia.org (Chevrolet Ipanema), roteironoticias.com.br,
 *         bielaautopecas.com, carzin.com.br, autopecasmarques.com.br,
 *         encontracarros.com.br
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
    title: 'Peça compartilhada com o Kadett — use esse nome ao procurar peça de motor/mecânica',
    body: 'Motor (1.8/2.0), câmbio, freios e suspensão dianteira da Ipanema são idênticos aos do Kadett hatch/sedã da mesma época. Ao procurar peça mecânica em loja ou desmanche, peça "para Kadett" — o catálogo é tratado em conjunto na maioria dos fornecedores e a disponibilidade tende a ser maior.',
  },
  {
    severity: 'WARN',
    title: 'Versões EFI monoponto pedem atenção aos sensores e ao módulo HEI',
    body: 'A partir do início dos anos 1990, a Ipanema passou a usar injeção eletrônica monoponto — assim como no Kadett, o módulo HEI (dentro do distribuidor) e sensores de temperatura/posição da borboleta são pontos de falha conhecidos. Antes de suspeitar de problema grave no motor por marcha lenta instável ou dificuldade de partida, cheque esses componentes elétricos.',
  },
  {
    severity: 'OK',
    title: 'Suspensão traseira reforçada para carga — não confunda com peça de Kadett hatch',
    body: 'Por ser perua, a Ipanema usa amortecedores e molas traseiras com taxa diferente do Kadett hatch, pensados para carga extra no porta-malas. Ao comprar peça de suspensão traseira, confirme que é específica para Ipanema.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Folga precoce em buchas, rolamentos e barra de direção',
    body: 'É queixa recorrente em unidades mais rodadas — folga prematura nas buchas de suspensão, rolamentos e barra de direção, causando ruído e imprecisão na direção. Peças de suspensão são relativamente fáceis de achar (compartilhadas com o Kadett) — não vale a pena conviver com folga por muito tempo.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo na haste seletora e na junta da tampa de válvulas',
    body: 'Assim como no Kadett, vazamentos pela haste seletora do câmbio e pela junta da tampa de válvulas são queixas comuns. Não costuma ser grave, mas monitore o nível de óleo com mais frequência até resolver.',
  },
  {
    severity: 'WARN',
    title: 'Sensores de injeção (versões EFI): temperatura da água e posição da borboleta',
    body: 'Falha ou oxidação de conector no sensor de temperatura da água, e falha no sensor de posição da borboleta, aparecem como causas comuns de comportamento irregular do motor nas versões EFI monoponto. São itens relativamente baratos de trocar em comparação a outros problemas do carro.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Ipanema 1.8/2.0 (carburado ou EFI)',
    body: '5.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de vazamentos (tampa de válvulas, haste seletora do câmbio). | 10.000 km — Regulagem de carburador (versões carburadas) ou checagem de sensores de injeção (versões EFI). | 15.000-20.000 km — Velas de ignição. | 15.000 km — Inspeção de buchas, rolamentos e barra de direção. | 20.000 km — Filtro de ar. | 30.000 km — Fluido de freio. | Ao trocar amortecedor/mola traseira — usar peça específica de Ipanema, não de Kadett hatch/sedã.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Ipanema',
    yearFrom: 1990,
    yearTo: 1998,
    tireSize: '175/70 R13 · 185/60 R14 (versões GLS com roda maior)',
    frontPsi: 26,
    rearPsi: 30,
    frontPsiLoad: 28,
    rearPsiLoad: 34,
    sparePsi: 32,
    notes: 'Traseira pede pressão mais alta que o Kadett hatch/sedã por ser perua com maior capacidade de carga — aumente ainda mais a traseira ao rodar com o porta-malas cheio. Confirme valor exato na etiqueta da coluna da porta ou manual do proprietário.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Ipanema', yearFrom: 1990, yearTo: 1998, component: 'Óleo do motor + filtro', intervalKm: 5000, intervalMonths: 6, notes: 'Mesma base do Kadett — motor 1.8/2.0 compartilhado.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Ipanema', yearFrom: 1990, yearTo: 1998, component: 'Junta da tampa de válvulas e haste seletora — inspeção de vazamento', intervalKm: 15000, intervalMonths: 12, notes: 'Vazamentos comuns e de baixo custo de reparo.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Ipanema', yearFrom: 1990, yearTo: 1998, component: 'Sensores de injeção e módulo HEI (versões EFI) — inspeção', intervalKm: 20000, intervalMonths: 12, notes: 'Ponto de falha conhecido nas versões EFI monoponto.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Ipanema', yearFrom: 1990, yearTo: 1998, component: 'Buchas, rolamentos e barra de direção — inspeção', intervalKm: 15000, intervalMonths: 12, notes: 'Folga prematura é queixa recorrente em unidades mais rodadas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Ipanema', yearFrom: 1990, yearTo: 1998, component: 'Velas de ignição', intervalKm: 20000, intervalMonths: null, notes: 'Ajuste conforme uso a álcool ou gasolina.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Ipanema', yearFrom: 1990, yearTo: 1998, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: 12, notes: 'Reduza o intervalo em cidades com muita poeira.', priority: 'LOW', order: 5 },
  { modelName: 'Ipanema', yearFrom: 1990, yearTo: 1998, component: 'Fluido de freio', intervalKm: 30000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Ipanema', yearFrom: 1990, yearTo: 1998, component: 'Amortecedores e molas traseiras (peça específica de Ipanema)', intervalKm: 40000, intervalMonths: null, notes: 'Não usar peça de Kadett hatch/sedã — taxa diferente, calibrada para carga.', priority: 'MEDIUM', order: 7 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Ipanema',
    yearFrom: 1990,
    yearTo: 1998,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Ipanema...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Chevrolet', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Chevrolet', vehicleTypeId: carroType.id },
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

  console.log('✅ Chevrolet Ipanema concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
