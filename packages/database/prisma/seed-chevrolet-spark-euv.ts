/**
 * Seed Chevrolet Spark EUV — macetes, problemas, manutenção e calibragem
 * SUV compacto 100% elétrico, entrada da Chevrolet no segmento de elétricos
 * populares no Brasil, concorrente direto do BYD Dolphin Mini. Lançado no
 * Brasil em setembro de 2025 (ano-modelo 2026), inicialmente importado da
 * China (parceria GM-SAIC) com produção nacional prevista para a fábrica de
 * Ceará a partir de 2025/2026. Motor elétrico dianteiro de ~102 cv / 18,3
 * kgfm, bateria LFP (lítio ferro fosfato) de 42 kWh, autonomia de 258 km no
 * ciclo Inmetro. Preço de lançamento a partir de R$ 144.990 (versão 2026).
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-spark-euv
 *
 * Fontes: chevrolet.com.br, cnnbrasil.com.br, terra.com.br, car.blog.br,
 *         motorshow.com.br, autoentusiastas.com.br,
 *         manual do proprietário oficial (chevrolet.com.br, PDF 2026)
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
    title: 'Origem chinesa (SAIC) com produção nacional a caminho — confirme a procedência do seu chassi',
    body: 'O Spark EUV nasceu de uma parceria entre GM e a chinesa SAIC, chegando ao Brasil inicialmente como importado. A Chevrolet planeja produzir o modelo na fábrica do Ceará a partir de 2025/2026. Ao comprar um Spark EUV (novo ou usado), vale confirmar se a unidade é importada ou de produção nacional — isso pode influenciar prazo de garantia, disponibilidade de peças e até pequenas variações de equipamento entre os lotes.',
  },
  {
    severity: 'OK',
    title: 'Bateria LFP: mais tolerante a cargas até 100%, mas ainda assim evite ficar muito tempo parado vazio',
    body: 'O Spark EUV usa química LFP (lítio ferro fosfato), que é mais estável termicamente e tolera melhor cargas frequentes até 100% do que baterias NMC — diferente de outros elétricos onde se recomenda travar em 80%. Ainda assim, evite deixar o carro parado por semanas com a bateria muito baixa (perto de 0%): isso acelera o desgaste de qualquer química de bateria de íon-lítio.',
  },
  {
    severity: 'OK',
    title: 'Carregamento: AC de 6,6 kW em casa, DC rápido de até 50 kW em viagem',
    body: 'Em casa, um carregador AC de 6,6 kW (wallbox) é o ideal para recarga durante a noite. Em eletropostos com carregador DC rápido (até 50 kW), a recarga de 30% a 80% leva cerca de 35 minutos. Como é um SUV compacto de uso predominantemente urbano, a maioria dos donos consegue resolver o dia a dia só com carregamento AC residencial, reservando o DC rápido para viagens mais longas.',
  },
  {
    severity: 'OK',
    title: 'Sem troca de óleo de motor — priorize freios, pneus e o sistema de arrefecimento da bateria',
    body: 'Como todo elétrico, o Spark EUV não tem óleo de motor, filtro de óleo, velas ou correia dentada. A manutenção preventiva se concentra em pastilhas e discos de freio (que duram mais graças à frenagem regenerativa), pneus (calibragem e rodízio) e no sistema de arrefecimento da bateria de alta tensão — siga sempre os intervalos do manual do proprietário para esse último item.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Modelo muito recente no Brasil: praticamente nenhum histórico de confiabilidade local ainda',
    body: 'O Spark EUV começou a ser vendido no Brasil apenas em setembro de 2025, então ainda não existe um histórico consistente de relatos de proprietários brasileiros sobre defeitos de médio/longo prazo. Redobre a atenção a qualquer comportamento anormal (mensagens de erro no painel, ruídos, perda de autonomia fora do padrão) nos primeiros meses de uso e documente tudo para acionar a garantia se necessário.',
  },
  {
    severity: 'WARN',
    title: 'Rede de assistência técnica ainda em formação, mesmo com produção nacional a caminho',
    body: 'Por ser um lançamento recente e um modelo de entrada no segmento elétrico da Chevrolet, o número de concessionárias com técnicos realmente experientes em diagnóstico do sistema de alta tensão do Spark EUV ainda é pequeno comparado à rede de carros a combustão. Para problemas relacionados à bateria, ao motor elétrico ou ao software, prefira concessionárias com estrutura confirmada para elétricos.',
  },
  {
    severity: 'OK',
    title: 'Concorrência direta com o BYD Dolphin Mini — segmento novo e em rápida evolução no Brasil',
    body: 'O Spark EUV compete diretamente com o BYD Dolphin Mini no segmento de elétricos populares, um mercado ainda jovem e em rápida transformação no Brasil. Isso é positivo para o consumidor (mais opções, preços mais competitivos), mas também significa que a tecnologia, o software e até a política de garantia desses modelos ainda estão amadurecendo — pesquise atualizações e recalls periodicamente nos primeiros anos após a compra.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Spark EUV (adaptado da GM — sem itens de motor a combustão)',
    body: '10.000 km/12 meses — Rodízio de pneus e inspeção geral de freios, suspensão e níveis de fluido. | 20.000 km/12 meses — Filtro de cabine. | 20.000 km — Inspeção das pastilhas e discos de freio (regenerativa reduz o desgaste, mas verifique corrosão por baixo uso). | 40.000 km/24 meses — Fluido de freio DOT 4 (troca por tempo, não só por km). | Conforme manual — Verificação do fluido de arrefecimento da bateria de alta tensão. | Sem item — Não há troca de óleo de motor, filtro de óleo, velas ou correia dentada.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Spark EUV',
    yearFrom: 2025,
    yearTo: null,
    tireSize: '205/60 R16',
    frontPsi: 32,
    rearPsi: 35,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: null,
    notes: 'SUV compacto elétrico — confirme sempre o valor exato na etiqueta da coluna da porta do motorista antes de calibrar.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Spark EUV', yearFrom: 2025, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: 12, notes: 'Cruzado.', priority: 'MEDIUM', order: 0 },
  { modelName: 'Spark EUV', yearFrom: 2025, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Spark EUV', yearFrom: 2025, yearTo: null, component: 'Pastilhas e discos de freio — inspeção', intervalKm: 20000, intervalMonths: 12, notes: 'Duram mais por causa da regenerativa, mas podem enferrujar por baixo uso.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Spark EUV', yearFrom: 2025, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 3 },
  { modelName: 'Spark EUV', yearFrom: 2025, yearTo: null, component: 'Fluido de arrefecimento da bateria de alta tensão', intervalKm: null, intervalMonths: null, notes: 'Confirme intervalo exato no manual — essencial para vida útil e velocidade de recarga da bateria LFP.', priority: 'HIGH', order: 4 },
  { modelName: 'Spark EUV', yearFrom: 2025, yearTo: null, component: 'Software/atualizações do veículo', intervalKm: null, intervalMonths: 12, notes: 'Verifique atualizações disponíveis na concessionária a cada revisão anual.', priority: 'LOW', order: 5 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Spark EUV',
    yearFrom: 2025,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Spark EUV...')

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

  console.log('✅ Chevrolet Spark EUV concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
