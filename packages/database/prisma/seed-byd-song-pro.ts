/**
 * Seed BYD Song Pro — macetes, problemas, manutenção e calibragem de pneus
 * SUV médio híbrido plug-in (DM-i), concorrente direto do Corolla Cross/
 * Tiggo 7. Distinto do "Song Plus" (SUV maior, já cadastrado) — nomes não
 * colidem por substring ("Pro" ≠ "Plus"), por isso precisa de conteúdo
 * próprio. #35 no ranking de vendas 2025 no Brasil (22.538 un.). Duas versões:
 * GL (1.5 + elétrico, 223cv combinados) e GS (235cv combinados). Bateria Blade
 * LFP de 18,3 kWh, autonomia elétrica declarada de até 68-110km (conforme
 * padrão de medição) e autonomia total combinada de até 1.100 km.
 * Execute: pnpm --filter @motormacete/database db:seed:byd-song-pro
 *
 * Fontes: byd.com/br, mecanicaonline.com.br, autoo.com.br, reclameaqui.com.br,
 *         pcdcarros.com.br, jantes-e-pneus.com
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
    title: 'PHEV DM-i: carregue na tomada sempre que possível, o motor a combustão é só o "plano B"',
    body: 'O Song Pro rende muito mais economia rodando no modo elétrico (bateria de 18,3 kWh, até ~68-110 km de autonomia elétrica conforme o padrão de medição). Para quem tem acesso a tomada em casa ou trabalho, carregar diariamente e reservar o motor 1.5 a gasolina só para viagens longas é o que realmente entrega a economia prometida — rodar sempre com a bateria vazia praticamente anula a vantagem do plug-in.',
  },
  {
    severity: 'OK',
    title: 'Configure o limite de carga em 90% no uso diário',
    body: 'Como em outros modelos BYD com bateria Blade LFP, reserve 100% de carga só para viagens longas — no dia a dia, configure o limite em 90% pelo app BYD Link ou pelo menu do veículo. Isso ajuda a preservar a vida útil da bateria no longo prazo.',
  },
  {
    severity: 'OK',
    title: 'GL (223cv) x GS (235cv): confirme sua versão antes de comparar desempenho com outros donos',
    body: 'A diferença de potência entre as versões GL e GS não é sutil — GS acelera de 0 a 100 km/h em cerca de 7,9 segundos, sensivelmente mais rápido que a GL. Se notar diferença de desempenho comparando com relatos de outros proprietários, confirme primeiro qual versão cada um tem antes de suspeitar de problema no seu carro.',
  },
  {
    severity: 'OK',
    title: 'Sem estepe: teste o kit de reparo em casa antes de precisar dele na estrada',
    body: 'Assim como outros modelos BYD recentes, o Song Pro não vem com estepe — só kit de reparo (selante + compressor). Existem relatos de motoristas que precisaram de guincho porque o kit não resolveu o furo. Familiarize-se com o funcionamento do kit com calma, em casa, e saiba que ele só serve para furos pequenos no centro da banda de rodagem — para cortes maiores ou danos na lateral, não tem outra saída além do guincho.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com o Song Plus (mesma família DM-i)',
    body: 'O Song Pro compartilha boa parte da arquitetura híbrida DM-i com o Song Plus — sistema elétrico, tipo de bateria e boa parte da eletrônica são da mesma família. Em concessionárias BYD, informações sobre o Song Plus muitas vezes ajudam a entender comportamentos e diagnósticos do Song Pro, mesmo sendo carrocerias diferentes.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ruído de suspensão dianteira — problema confirmado pelas próprias concessionárias',
    body: 'O barulho constante vindo da suspensão dianteira é o ponto mais citado entre reclamações do Song Pro, e concessionárias já confirmam ser um problema comum em alguns lotes — normalmente resolvido com a troca dos amortecedores dianteiros pela garantia. Se notar ruído recorrente (não só em buracos isolados, mas constante em qualquer piso irregular), não aceite "é normal" como resposta — insista no diagnóstico e troca se confirmado.',
  },
  {
    severity: 'WARN',
    title: 'Alertas de calibragem de pneu fora do padrão do manual',
    body: 'Há relatos de mensagens de calibragem na tela central indicando valores fora do que consta no manual/etiqueta da porta. Antes de recalibrar pelo valor que o painel sugere, confirme o valor correto na etiqueta da coluna da porta do motorista — é a fonte oficial, não o alerta do painel, que pode estar mal calibrado de fábrica em alguns lotes.',
  },
  {
    severity: 'WARN',
    title: 'Falhas no ABS relatadas por alguns proprietários',
    body: 'Existem relatos de falha no sistema ABS. Se a luz do ABS acender no painel, não ignore — mesmo que a frenagem pareça normal no dia a dia, o ABS é sistema de segurança ativa crítico em frenagens de emergência. Leve para diagnóstico assim que possível.',
  },
  {
    severity: 'WARN',
    title: 'Pós-venda: demora para agendamento e peças importadas — planeje com antecedência',
    body: 'O pós-venda da BYD no Brasil é um ponto recorrente de crítica — demora para conseguir horário de atendimento, falta de previsão clara de reparo, e casos de carros parados semanas ou meses esperando peça importada. Se notar qualquer sintoma de problema, não espere piorar antes de agendar — o tempo de espera pode ser longo mesmo para reparos simples.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Song Pro DM-i (GL/GS) — híbrido plug-in',
    body: 'Sem troca de óleo de câmbio convencional (usa e-CVT/redutor DM-i), sem correia dentada de acionamento auxiliar tradicional. O que precisa de atenção: | 10.000 km/12 meses — Troca de óleo do motor 1.5 a gasolina (mesmo intervalo de um carro a combustão comum, já que o motor roda normalmente fora do modo 100% elétrico) + filtro de óleo. | 10.000 km — Rodízio de pneus. | 20.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4 (frenagem regenerativa poupa pastilhas, mas o fluido absorve umidade independente do uso). | 60.000 km — Fluido do sistema e-CVT/redutor DM-i. | Anual — Inspeção da bateria de alta tensão e cabos (concessionária). | Anual — Inspeção visual da suspensão dianteira, dado o histórico de queixas de ruído nesta linha.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Song Pro',
    yearFrom: 2024,
    yearTo: null,
    tireSize: '225/60 R18 (versão GL) · 235/50 R19 (versão GS)',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 36,
    rearPsiLoad: 38,
    sparePsi: null,
    notes: 'SEM ESTEPE — o carro vem apenas com kit de reparo (selante + compressor). Pressão de fábrica estimada 33/33 PSI vazio. Há relatos de alertas de calibragem no painel divergindo do manual — confirme sempre na etiqueta da coluna da porta do motorista, não só pelo aviso na tela.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Song Pro', yearFrom: 2024, yearTo: null, component: 'Óleo do motor 1.5 a gasolina', intervalKm: 10000, intervalMonths: 12, notes: 'Mesmo intervalo de um combustão comum — o motor roda normalmente fora do modo 100% elétrico.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Song Pro', yearFrom: 2024, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Song Pro', yearFrom: 2024, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza para 10.000-15.000 km em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Song Pro', yearFrom: 2024, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Song Pro', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Frenagem regenerativa poupa pastilhas, mas o fluido absorve umidade mesmo assim.', priority: 'HIGH', order: 4 },
  { modelName: 'Song Pro', yearFrom: 2024, yearTo: null, component: 'Fluido do sistema e-CVT/redutor DM-i', intervalKm: 60000, intervalMonths: 48, notes: 'Fluido específico da transmissão híbrida — não usar ATF genérico.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Song Pro', yearFrom: 2024, yearTo: null, component: 'Inspeção da bateria de alta tensão e cabos', intervalKm: null, intervalMonths: 12, notes: 'Verificação em concessionária. Não realizar serviços na área sem desconectar conforme manual.', priority: 'HIGH', order: 6 },
  { modelName: 'Song Pro', yearFrom: 2024, yearTo: null, component: 'Inspeção da suspensão dianteira (amortecedores)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de atenção conhecido desta linha — ruído constante pode indicar amortecedor a trocar pela garantia.', priority: 'HIGH', order: 7 },
  { modelName: 'Song Pro', yearFrom: 2024, yearTo: null, component: 'Verificação do kit de reparo de pneu (validade do selante)', intervalKm: null, intervalMonths: 24, notes: 'Sem estepe — confirme que o selante não venceu e que o compressor funciona.', priority: 'CRITICAL', order: 8 },
  { modelName: 'Song Pro', yearFrom: 2024, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Aproveite para checar desgaste irregular por alinhamento.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Song Pro',
    yearFrom: 2024,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed BYD Song Pro...')

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

  console.log('✅ BYD Song Pro concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
