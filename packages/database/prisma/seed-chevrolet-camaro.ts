/**
 * Seed Chevrolet Camaro — macetes, problemas, manutenção e calibragem de pneus
 * Esportivo importado, quinta e sexta geração vendidas oficialmente no Brasil
 * pela rede Chevrolet desde ~2010: motor V8 6.2 (LS3/LT1), versão SS, edição
 * "Fifty" (50 anos), conversível. Gerações clássicas (anteriores a 2010) nunca
 * tiveram venda oficial no Brasil e ficaram fora deste seed por falta de dado
 * confiável específico ao contexto de manutenção local.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-camaro
 *
 * Fontes: turbonoticias.com.br, carroclub.com.br, motoragora.com.br,
 *         olhonocarro.com.br, problemaserecalls.com, naccar.com.br,
 *         camaros.net (Team Camaro Tech), comprecar.com.br,
 *         opinautos.com.br, atturo.com.br
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
    title: 'Motor V8 6.2 (LS3/LT1): robusto, mas peça de reposição é sempre importada',
    body: 'O bloco V8 6.2 usado no SS (LS3 na geração 2010-2015, LT1 na geração 2016+) é uma família de motor GM usada também em Corvette e picapes americanas, o que ajuda um pouco a achar informação técnica — mas no Brasil praticamente toda peça específica de Camaro vem de fora. Planeje prazo maior para qualquer reparo que não seja item de desgaste comum (óleo, filtro, vela).',
  },
  {
    severity: 'WARN',
    title: 'Uso esporádico é o maior inimigo da bateria — use um mantenedor',
    body: 'Camaro costuma ser carro de garagem, rodado poucas vezes por semana. A eletrônica embarcada consome corrente mesmo com o carro desligado (módulos em stand-by), o que descarrega a bateria mais rápido do que em um carro de uso diário. Se o carro for ficar mais de uma semana parado, use um mantenedor de carga (trickle charger) — é mais barato que trocar bateria com frequência.',
  },
  {
    severity: 'OK',
    title: 'Rode o carro periodicamente, mesmo sem sair de casa',
    body: 'Além da bateria, pneus, fluidos e borrachas de vedação também sofrem com o carro parado por longos períodos — pneu pode desenvolver ponto (flat-spot) de ficar na mesma posição por semanas. Uma rodada de 20-30 minutos em rodovia a cada duas semanas ajuda a manter tudo "vivo": aquece óleo, recarrega bateria e evita que o pneu fique com marca permanente.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático: troque o mini-radiador de óleo preventivamente',
    body: 'Há relatos de água do sistema de arrefecimento do motor contaminando o óleo do câmbio automático através do mini-radiador dedicado à transmissão. Trocar essa peça de forma preventiva, antes que apresente vazamento, evita um problema bem mais caro: câmbio contaminado por líquido de arrefecimento normalmente precisa de reparo completo.',
  },
  {
    severity: 'WARN',
    title: 'Ar-condicionado: vazamento crônico de compressor/condensador é queixa recorrente',
    body: 'O sistema de ar-condicionado do Camaro tem histórico de vazamentos crônicos no compressor ou no condensador, com reparo caro. Fique atento a perda de gás mais rápida que o normal e ao ar gelando cada vez menos — resolver cedo custa bem menos que trocar o compressor depois que ele trava.',
  },
  {
    severity: 'OK',
    title: 'Capota do conversível: siga a rotina de acionamento à risca',
    body: 'Na versão conversível, a capota elétrica retrátil só deve ser acionada com o carro parado e a alavanca de câmbio em "P" — o sistema tem essa trava por segurança. Evite forçar o mecanismo ou acioná-lo fora dessas condições, e nas trocas de óleo peça para o mecânico dar uma olhada geral no acionamento elétrico da capota.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Guia de tuchos desgasta e pode desabilitar cilindro',
    body: 'O guia de tuchos (peça plástica que mantém os tuchos na posição correta) desgasta com o tempo de uso e, em casos avançados, pode levar à perda de funcionamento de um cilindro. Sintoma: barulho tipo "tec-tec-tec" vindo do motor, muitas vezes acompanhado de perda de potência. Não ignore esse ruído — quanto antes for diagnosticado, mais barato é o reparo.',
  },
  {
    severity: 'WARN',
    title: 'Barulho de tucho pode ter origem no ar-condicionado, não no motor',
    body: 'Parte dos relatos de "tec-tec-tec" vindo do motor acabou rastreada a vazamentos crônicos no compressor ou condensador do ar-condicionado, não a um problema mecânico do motor em si. Antes de desmontar o motor atrás do ruído, vale checar o sistema de ar-condicionado — pode ser um diagnóstico mais barato e correto.',
  },
  {
    severity: 'WARN',
    title: 'Bobinas de ignição falham individualmente',
    body: 'Falhas em bobinas de ignição isoladas aparecem nos relatos de proprietários. O diagnóstico clássico é trocar de posição duas bobinas entre si e ver se a falha "muda de lugar" (acompanha a bobina) — isso confirma o defeito sem precisar de equipamento sofisticado.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático contaminado por água do sistema de arrefecimento',
    body: 'Como o mini-radiador de óleo do câmbio fica integrado ao sistema de arrefecimento do motor, uma falha nesse componente pode misturar líquido de arrefecimento com o óleo da transmissão. O resultado costuma ser caro: câmbio com fluido contaminado normalmente exige reparo ou substituição completa. Prevenção (troca do mini-radiador) é sempre mais barata que o conserto depois do fato.',
  },
  {
    severity: 'WARN',
    title: 'Bateria descarrega rápido em carros de baixo uso',
    body: 'Por ser tipicamente um carro de garagem, rodado poucas vezes por semana, o Camaro sofre mais que a média com descarga de bateria — a eletrônica em stand-by consome corrente mesmo parado. Use mantenedor de bateria se o carro ficar longos períodos sem rodar.',
  },
  {
    severity: 'WARN',
    title: 'Sensores de TPMS e airbag: peça de reposição escassa e cara',
    body: 'Sensores de pressão dos pneus (TPMS) e componentes do sistema de airbag aparecem em relatos de defeito, e como são peças de baixo giro no Brasil, tendem a ser caras e demoradas de repor. Não é um problema que compromete a segurança no dia a dia se detectado a tempo, mas vale orçar peça original antes de fechar negócio na compra de um usado.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Camaro SS 6.2 V8 (adaptado ao uso esporádico típico do carro no Brasil)',
    body: '8.000-10.000 km/12 meses — Troca de óleo do motor (sintético, conforme especificação do manual) + filtro de óleo — troque também por tempo se o carro rodar pouco no ano. | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar do motor e filtro de cabine. | 30.000-40.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4 (por tempo, a cada 24 meses, independente da km). | 40.000-60.000 km — Óleo do câmbio automático — antecipe se notar tranco. | Preventivo — Mini-radiador de óleo do câmbio, antes de apresentar vazamento. | Sempre que o carro ficar mais de 1-2 semanas parado — Mantenedor de bateria e uma rodada de 20-30 min em rodovia para evitar flat-spot nos pneus. | Anual — Checagem de estanqueidade do ar-condicionado.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Camaro',
    yearFrom: 2010,
    yearTo: null,
    tireSize: '245/40 R20 (dianteiro) · 275/35 R20 (traseiro) — configuração staggered padrão do SS com rodas de 20"',
    frontPsi: 35,
    rearPsi: 35,
    frontPsiLoad: null,
    rearPsiLoad: null,
    sparePsi: null,
    notes: 'Medida staggered (dianteiro e traseiro diferentes) — confirme sempre o valor exato na etiqueta da coluna da porta do motorista, pois pode variar por ano/versão. Camaro geralmente não tem estepe convencional (kit reparador ou run-flat).',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Camaro', yearFrom: 2010, yearTo: null, component: 'Óleo do motor V8 6.2 (sintético)', intervalKm: 10000, intervalMonths: 12, notes: 'Troque por tempo também em carros de baixo uso anual, não só por km.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Camaro', yearFrom: 2010, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Camaro', yearFrom: 2010, yearTo: null, component: 'Mini-radiador de óleo do câmbio automático', intervalKm: null, intervalMonths: null, notes: 'Troca preventiva evita contaminação do câmbio por água do sistema de arrefecimento — problema conhecido e caro.', priority: 'HIGH', order: 2 },
  { modelName: 'Camaro', yearFrom: 2010, yearTo: null, component: 'Óleo do câmbio automático', intervalKm: 50000, intervalMonths: 48, notes: 'Antecipe se notar tranco ou engate irregular.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Camaro', yearFrom: 2010, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'Camaro', yearFrom: 2010, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'Camaro', yearFrom: 2010, yearTo: null, component: 'Velas de ignição', intervalKm: 40000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'Camaro', yearFrom: 2010, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 7 },
  { modelName: 'Camaro', yearFrom: 2010, yearTo: null, component: 'Estanqueidade do ar-condicionado', intervalKm: null, intervalMonths: 12, notes: 'Vazamento de compressor/condensador é queixa recorrente. Detectar cedo evita reparo caro.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Camaro', yearFrom: 2010, yearTo: null, component: 'Bateria — mantenedor de carga', intervalKm: null, intervalMonths: null, notes: 'Use sempre que o carro ficar mais de 1-2 semanas parado, típico de carro de garagem.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Camaro', yearFrom: 2010, yearTo: null, component: 'Rodagem preventiva contra flat-spot dos pneus', intervalKm: null, intervalMonths: null, notes: 'Rode 20-30 min em rodovia a cada duas semanas se o carro ficar muito tempo parado.', priority: 'LOW', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Camaro',
    yearFrom: 2010,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Camaro...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Chevrolet', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Chevrolet', vehicleTypeId: carroType.id },
  })

  const modelNames = [...new Set(BLOCKS.map((b) => b.modelName))]

  for (const modelName of modelNames) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: modelName, brandId: brand.id } },
      update: {},
      create: { name: modelName, brandId: brand.id },
    })
  }

  await prisma.tip.deleteMany({ where: { modelName: { in: modelNames } } })

  const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
  let order = 0
  const allTipsData = BLOCKS.flatMap((block) =>
    cats.flatMap((cat) =>
      block[cat].map((tip) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: order++,
      }))
    )
  )
  await prisma.tip.createMany({ data: allTipsData })
  console.log(`  ✅ ${allTipsData.length} tips`)

  await prisma.tirePressure.deleteMany({ where: { modelName: { in: modelNames } } })
  await prisma.tirePressure.createMany({ data: TIRE_PRESSURES })
  console.log(`  🔵 TirePressures: ${TIRE_PRESSURES.length}`)

  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: modelNames } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Chevrolet Camaro concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
