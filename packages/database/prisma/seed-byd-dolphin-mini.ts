/**
 * Seed BYD Dolphin Mini — macetes, problemas, manutenção e calibragem de pneus
 * Elétrico urbano de entrada da BYD, o carro elétrico mais vendido do Brasil.
 * #29 no ranking de vendas 2025 no Brasil (32.488 un.). Distinto do "Dolphin"
 * (versão padrão, maior, já cadastrada) — motor 75cv/13,8kgfm dianteiro,
 * bateria LFP Blade de 38 kWh, autonomia 280 km (INMETRO), carga DC até 40 kW
 * (22 min para 80%). Sem estepe — só kit de reparo.
 * Execute: pnpm --filter @motormacete/database db:seed:byd-dolphin-mini
 *
 * Fontes: byd.com/br, garagem360.com.br, reclameaqui.com.br, greenv.com.br,
 *         consultadeplaca.net, canalve.com.br
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
    title: 'Bateria LFP Blade: mais tolerante a cargas altas, mas mantenha o limite de 90% no dia a dia',
    body: 'A química LFP (lítio-ferro-fosfato) da bateria Blade é mais tolerante a cargas frequentes perto de 100% do que baterias NMC/NCA de outras marcas — mas a prática recomendada continua sendo configurar o limite de carga em 90% no uso diário pelo app BYD Link ou pelo menu do veículo (mesma orientação válida para o Dolphin padrão), reservando 100% só para viagens longas. Carregar até 100% pouco antes de sair (não deixar parado carregado por dias) prolonga a vida útil da bateria.',
  },
  {
    severity: 'OK',
    title: 'Carga DC rápida: 22 minutos para 80%, mas só em carregador compatível com 40 kW',
    body: 'A recarga em corrente contínua (DC) atinge 80% em cerca de 22 minutos, mas isso depende do carregador público suportar pelo menos 40 kW — muitos pontos de recarga no Brasil ainda são de 20-30 kW, o que aumenta o tempo real. Verifique a potência do carregador antes de contar com o tempo "de propaganda".',
  },
  {
    severity: 'OK',
    title: 'Sem estepe: leve o kit de reparo e saiba usá-lo ANTES de precisar',
    body: 'O Dolphin Mini não vem com estepe, apenas um kit de reparo (selante + compressor). Teste o kit em casa (sem estar com pneu furado) para entender o funcionamento antes que aconteça de verdade na estrada — o kit só resolve furos pequenos no centro da banda de rodagem, não serve para cortes laterais ou danos na roda.',
  },
  {
    severity: 'OK',
    title: 'Consumo real: monitore os primeiros kWh/100km para calibrar expectativa de autonomia',
    body: 'O consumo oficial fica em torno de 9,6 kWh/100 km (autonomia de 280 km pelo INMETRO), mas o consumo real varia bastante com ar-condicionado ligado, velocidade em rodovia e estilo de condução. Nos primeiros dias, acompanhe o consumo médio no painel para calibrar sua expectativa real de autonomia no seu uso — carros elétricos urbanos tendem a perder mais autonomia proporcional em rodovia do que na cidade (o oposto da lógica de carro a combustão).',
  },
  {
    severity: 'OK',
    title: 'Suspensão traseira macia: aproveite isso a seu favor, ajuste o estilo de condução',
    body: 'A calibração de fábrica prioriza conforto, com suspensão traseira mais macia — em pisos muito irregulares, reduzir um pouco a velocidade em vez de "atravessar rápido" o buraco/lombada reduz a sensação de flutuação que incomoda parte dos donos. A BYD já revisou suspensão e pneus em versões 2025/2026, então carros mais recentes tendem a ter esse comportamento atenuado de fábrica.',
  },
  {
    severity: 'OK',
    title: 'App BYD Link: use para agendar carga em horário de tarifa reduzida',
    body: 'Configure o carregamento programado pelo app para os horários de tarifa branca reduzida (madrugada, geralmente) se sua distribuidora de energia oferecer essa modalidade — pode reduzir bastante o custo do kWh consumido para carregar em casa.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Pneu original 175/55 R16 (e o substituto Hankook) não são vendidos oficialmente no Brasil',
    body: 'Este é o problema mais sério e específico do Dolphin Mini: a medida original de pneu (175/55 R16, marca LingLong) simplesmente não é comercializada no mercado brasileiro de reposição. A BYD trocou o fornecedor para Hankook iON ST AS na linha 2026, mas essa medida também não está disponível para compra oficial no país — mais de 6.800 compradores foram afetados por essa lacuna. Se seu pneu furar ou desgastar, pesquise ANTES de precisar: consulte a concessionária BYD sobre importação/encomenda, ou avalie com um borracheiro de confiança se existe pneu de medida equivalente (mesmo diâmetro externo, índice de carga/velocidade compatível) que sirva como substituto seguro — nunca troque por "qualquer pneu parecido" sem essa checagem técnica.',
  },
  {
    severity: 'WARN',
    title: 'Relatos de escamação/descamação da banda de rodagem em poucos meses de uso',
    body: 'Há relato documentado de descamação da banda de rodagem do pneu original com apenas 4 meses de uso e menos de 19.000 km — quantidade de uso baixa para esse tipo de desgaste. Se notar bolhas, rachaduras superficiais ou descamação na banda de rodagem (não é o desgaste normal e uniforme), fotografe e documente a quilometragem/data para acionar garantia — combinado com a escassez de pneus de reposição, esse é um ponto de atenção real da linha.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão traseira "flutuante": desconforto reportado em pisos irregulares',
    body: 'Queixa recorrente de suspensão traseira excessivamente macia, com sensação de flutuação em buracos e lombadas — a própria BYD já promoveu ajustes no conjunto de suspensão/pneus nas versões 2025/2026 após o volume de relatos. Se seu carro é de lote anterior a essas atualizações e o desconforto for muito acentuado, vale consultar a concessionária sobre possíveis campanhas ou ajustes disponíveis.',
  },
  {
    severity: 'WARN',
    title: 'Falta de peças e componentes nas concessionárias — rede ainda em expansão',
    body: 'Por ser marca em rápida expansão no Brasil, é comum relatos de demora para conseguir peças específicas (inclusive os pneus, como já mencionado) nas concessionárias BYD. Planeje manutenções preventivas com antecedência e não deixe para resolver problemas de última hora, principalmente fora de grandes capitais.',
  },
  {
    severity: 'OK',
    title: 'Instabilidade do aplicativo BYD Link',
    body: 'Relatos de instabilidade/lentidão do app BYD Link (usado para monitorar carga, localizar o carro, programar climatização remota). Não afeta o funcionamento mecânico do carro — é só o app de conveniência. Se o app parar de responder, force o fechamento e abra de novo; problemas persistentes de login geralmente se resolvem reinstalando o aplicativo.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Dolphin Mini — o que muda (e o que NÃO existe) num elétrico',
    body: 'Sem troca de óleo do motor, sem vela de ignição, sem filtro de combustível, sem correia dentada — o motor elétrico dispensa toda essa rotina de carro a combustão. O que precisa de atenção: | 10.000 km — Rodízio de pneus (essencial, já que a reposição da medida original é escassa — prolongar a vida útil de cada pneu importa mais aqui que num carro comum). | A cada 2 anos — Fluido de freio DOT 4. | A cada 5 anos — Fluido de arrefecimento da bateria e do inversor (sistema de gerenciamento térmico da bateria Blade). | Anual — Inspeção visual dos pneus procurando escamação/rachaduras (ponto de atenção específico desta linha). | Conforme uso — Inspeção das pastilhas de freio: como a frenagem regenerativa faz boa parte do trabalho, as pastilhas duram mais, mas podem oxidar por pouco uso — acione o freio com mais força de vez em quando para "limpar" o disco.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Dolphin Mini',
    yearFrom: 2024,
    yearTo: null,
    tireSize: '175/55 R16 (original LingLong, linha 2024-2025) · Hankook iON ST AS a partir da linha 2026',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: null,
    notes: 'SEM ESTEPE — o carro vem apenas com kit de reparo (selante + compressor). Pressão de fábrica estimada 32/32 PSI vazio, 35/38 PSI com carga máxima — confirme sempre na etiqueta da coluna da porta do motorista. ATENÇÃO: a medida original 175/55 R16 tem disponibilidade muito limitada para reposição no mercado brasileiro — pesquise opções com seu borracheiro de confiança antes de precisar trocar.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Dolphin Mini', yearFrom: 2024, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Especialmente importante nesta linha pela dificuldade de encontrar pneu de reposição na medida original.', priority: 'HIGH', order: 0 },
  { modelName: 'Dolphin Mini', yearFrom: 2024, yearTo: null, component: 'Inspeção visual dos pneus (escamação/rachaduras)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de atenção específico — há relatos de descamação prematura da banda de rodagem em poucos meses de uso.', priority: 'HIGH', order: 1 },
  { modelName: 'Dolphin Mini', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Troca por tempo — o fluido absorve umidade mesmo com uso reduzido dos freios (frenagem regenerativa poupa as pastilhas).', priority: 'HIGH', order: 2 },
  { modelName: 'Dolphin Mini', yearFrom: 2024, yearTo: null, component: 'Fluido de arrefecimento da bateria/inversor', intervalKm: null, intervalMonths: 60, notes: 'Sistema de gerenciamento térmico da bateria Blade LFP.', priority: 'HIGH', order: 3 },
  { modelName: 'Dolphin Mini', yearFrom: 2024, yearTo: null, component: 'Inspeção de pastilhas de freio', intervalKm: null, intervalMonths: 12, notes: 'Pastilhas duram mais pela frenagem regenerativa, mas podem oxidar por pouco uso. Acione o freio com força de vez em quando.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Dolphin Mini', yearFrom: 2024, yearTo: null, component: 'Filtro de cabine (ar-condicionado)', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas, como em qualquer carro.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Dolphin Mini', yearFrom: 2024, yearTo: null, component: 'Verificação do kit de reparo de pneu (validade do selante)', intervalKm: null, intervalMonths: 24, notes: 'Sem estepe — confirme que o selante do kit não venceu e que o compressor funciona.', priority: 'CRITICAL', order: 6 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Dolphin Mini',
    yearFrom: 2024,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed BYD Dolphin Mini...')

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

  console.log('✅ BYD Dolphin Mini concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
