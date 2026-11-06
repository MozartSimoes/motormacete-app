/**
 * Seed Renault Master — macetes, problemas, manutenção e calibragem de pneus
 * Furgão de carga de porte médio/grande, referência no segmento de vans
 * comerciais no Brasil. Motor único 2.3 dCi turbodiesel 16V (136cv/36,7kgfm),
 * disponível em várias configurações de comprimento/altura (L1H1 a L3H3),
 * volume de carga de 8 a 13 m³ e carga útil de até 1.500 kg. #46 no ranking
 * de vendas 2025 no Brasil (15.773 un.) — segmento de utilitário de carga,
 * distinto dos carros de passeio da lista.
 * Execute: pnpm --filter @motormacete/database db:seed:renault-master
 *
 * Fontes: reclameaqui.com.br, mecanicosbrasil.com.br, carroclub.com.br,
 *         garagem360.com.br, renault.com.br, calibragemdepneu.com.br
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
    title: 'Escolha a configuração certa (L1H1 a L3H3) conforme o uso',
    body: 'A Master é vendida em várias combinações de comprimento e altura de carroceria (de L1H1, mais compacta, até L3H3, com até 13 m³). Antes de comprar ou orçar peças/pneus, confirme a configuração exata da sua unidade — ela afeta diretamente carga útil, dimensões internas e até o tamanho de pneu usado.',
  },
  {
    severity: 'WARN',
    title: 'Rodagem urbana intensa: limpe o sistema de escapamento periodicamente',
    body: 'Em uso urbano com muitas paradas e baixa velocidade, a fuligem tende a se acumular no orifício do sensor de contrapressão do turbo, podendo carbonizar e obstruir a passagem — isso aciona a luz de avaria e reduz a potência. Rodar periodicamente em rodovia (evitando só trajetos curtos) ajuda a queimar parte dessa fuligem naturalmente e reduz a frequência desse problema.',
  },
  {
    severity: 'OK',
    title: 'Distribua a carga de forma equilibrada e respeite os 1.500 kg',
    body: 'A carga útil máxima gira em torno de 1.500 kg dependendo da configuração. Distribua o peso de forma equilibrada sobre o eixo e evite concentrar carga muito à frente ou atrás da caçamba — isso preserva suspensão, freios e pneus, além de manter a estabilidade em curvas.',
  },
  {
    severity: 'WARN',
    title: 'Sistema Adblue (SCR): nunca ande com o reservatório vazio',
    body: 'O sistema anti-poluição com Adblue precisa do fluido sempre em nível adequado para funcionar corretamente — rodar com o reservatório vazio pode acionar restrição de potência (limp mode) e, em alguns casos, gerar código de falha persistente mesmo após reabastecer. Monitore o nível de Adblue com a mesma disciplina que o diesel.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Falha no sistema anti-poluição (Adblue) pode gerar reparo caro fora da garantia',
    body: 'Há relato de proprietário com Master 2022/2023 que teve problemas recorrentes de luz indicadora do sistema anti-poluição (Adblue) ainda dentro da garantia, sem solução definitiva pela concessionária — e após o fim da garantia, a Renault se recusou a arcar com o custo do reparo, orçado em cerca de R$ 15.000. Se sua unidade apresentar esse tipo de luz/código de falha ainda na garantia, documente cada visita à concessionária e exija laudo técnico por escrito — isso fortalece eventual disputa caso o problema persista após o fim da cobertura.',
  },
  {
    severity: 'WARN',
    title: 'Pressão do turbo/sensor de contrapressão causando perda de potência',
    body: 'Defeito frequente relatado é o acionamento da luz de avaria com redução de potência, geralmente causado pelo sensor de contrapressão da turbina entupido por acúmulo de fuligem no parafuso oco que o conecta ao escapamento. É mais comum em uso urbano intenso ou remapeamento inadequado do motor. Diagnóstico e limpeza do sensor costumam resolver — evite remapear a ECU fora do padrão de fábrica.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento em retentor do motor mesmo em unidades novas',
    body: 'Há relato de vazamento na polia/retentor do motor em unidade com apenas 2.800 km rodados, com dificuldade da concessionária em liberar a peça para reparo em garantia. Se notar qualquer mancha de óleo sob o veículo, mesmo com poucos km, formalize a reclamação por escrito na concessionária desde a primeira visita.',
  },
  {
    severity: 'WARN',
    title: 'Componentes de embreagem, atuador de câmbio e alternador entre as queixas mais comuns',
    body: 'Proprietários relatam problemas pontuais em embreagem, volante do motor, atuador de pedal, atuador de câmbio e alternador. Nenhum desses é uma falha crônica generalizada, mas por ser um veículo de trabalho com uso intenso, vale ficar atento a qualquer ruído ou comportamento anormal nesses sistemas e não postergar o diagnóstico.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Master 2.3 dCi (Renault + ajuste uso comercial/severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo; antecipe para 8.000-9.000 km em uso comercial intenso. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido — mais frequente pelo desgaste natural do transporte de carga. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de combustível diesel — use sempre diesel S10 de qualidade. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | Reservatório de Adblue — nunca deixar esvaziar completamente; abastecer sempre que o alerta aparecer. | Sensor de contrapressão do turbo — se notar perda de potência com luz de avaria, verificar acúmulo de fuligem antes de trocar peças. | A cada revisão — Verificar amortecedores e molas traseiras, que trabalham sob carga variável.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Master',
    yearFrom: null,
    yearTo: null,
    tireSize: '205/75 R16C (reforçado, carga comercial)',
    frontPsi: 65,
    rearPsi: 65,
    frontPsiLoad: 70,
    rearPsiLoad: 80,
    sparePsi: 80,
    notes: 'Pneus com índice de carga reforçado ("C", comercial) usam pressões bem mais altas que carros de passeio. Os valores variam bastante conforme configuração (L1H1 a L3H3) e carga transportada — confirme sempre na etiqueta da coluna da porta ou no manual específico da sua versão antes de calibrar.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Master', yearFrom: null, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Antecipe para 8.000-9.000 km em uso comercial intenso.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Master', yearFrom: null, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Master', yearFrom: null, yearTo: null, component: 'Reservatório de Adblue (SCR)', intervalKm: null, intervalMonths: null, notes: 'Nunca deixar esvaziar — risco de limp mode e reparo caro (histórico de disputa de garantia com custo de ~R$15 mil).', priority: 'CRITICAL', order: 2 },
  { modelName: 'Master', yearFrom: null, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Master', yearFrom: null, yearTo: null, component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'Use sempre diesel S10 de qualidade.', priority: 'HIGH', order: 4 },
  { modelName: 'Master', yearFrom: null, yearTo: null, component: 'Sensor de contrapressão do turbo — verificação', intervalKm: null, intervalMonths: 12, notes: 'Acúmulo de fuligem é causa comum de perda de potência em uso urbano intenso.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Master', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km — reforçado pelo uso com carga frequente.', priority: 'HIGH', order: 6 },
  { modelName: 'Master', yearFrom: null, yearTo: null, component: 'Amortecedores e molas traseiras — inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Trabalham sob carga variável (até 1.500 kg) e desgastam mais rápido que em veículo de passeio.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Master', yearFrom: null, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Renault.', priority: 'HIGH', order: 8 },
  { modelName: 'Master', yearFrom: null, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce a pressão sempre que rodar com carga.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Master',
    yearFrom: null,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Renault Master...')

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

  console.log('✅ Renault Master concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
