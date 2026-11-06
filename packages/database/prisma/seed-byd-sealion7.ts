/**
 * Seed BYD Sealion 7 — macetes, problemas, manutenção e calibragem de pneus
 * SUV cupê 100% elétrico, tração integral AWD (motor elétrico em cada eixo),
 * potência combinada de 531 cv e 690 Nm, 0-100 km/h em 4,5s. Bateria Blade
 * LFP de 82,5 kWh, autonomia de até 360 km e carga DC 30-80% em ~30 min
 * (150 kW). Rival do Tesla Model Y. Chegou ao mercado brasileiro em maio de
 * 2026, por R$ 339.990 — modelo muito recente, ainda sem histórico extenso
 * de reclamações no Brasil; problemas relatados aqui vêm também de mercados
 * onde o carro já circula há mais tempo (China desde maio/2024, Europa,
 * Austrália, Hong Kong).
 * Execute: pnpm --filter @motormacete/database db:seed:byd-sealion7
 *
 * Fontes: byd.com/br/car/sealion7.html, autoindustria.com.br,
 *         bydbrasil.press, canalve.com.br, atarde.com.br, mobiauto.com.br,
 *         en.wikipedia.org/wiki/BYD_Sealion_7, deco.proteste.pt (Portugal),
 *         australiancar.reviews, pcauto.com.my
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
    title: 'AWD com dois motores: tração em cada eixo, não só um motor mais potente',
    body: 'O Sealion 7 usa um motor elétrico no eixo dianteiro e outro no traseiro (potência combinada de 531 cv e 690 Nm), e não um único motor central com transmissão para as quatro rodas. Isso significa tração integral de verdade, útil em piso molhado ou irregular, mas também reforça a importância de trocar os pneus sempre em jogo de 4 (ou pelo menos em pares por eixo) para não desequilibrar o comportamento entre os eixos.',
  },
  {
    severity: 'OK',
    title: 'Autonomia real gira em torno de 300 km em uso misto',
    body: 'A ficha técnica anuncia até 360 km de autonomia com a bateria Blade LFP de 82,5 kWh, mas como em todo elétrico, uso constante do modo Sport, ar-condicionado ligado e trajetos de rodovia em velocidade alta reduzem esse número. Planeje viagens mais longas considerando algo entre 260 e 300 km reais entre recargas, e prefira carregadores DC rápidos (150 kW) para completar 30% a 80% em cerca de 30 minutos.',
  },
  {
    severity: 'OK',
    title: 'Modo Sport aumenta bastante o consumo — use com moderação no dia a dia',
    body: 'Com 0 a 100 km/h em 4,5 segundos, é tentador usar o modo Sport com frequência, mas ele aumenta sensivelmente o consumo de energia por acionar toda a potência dos dois motores com mais agressividade. Para uso urbano e maior autonomia, prefira o modo Normal/Eco e reserve o Sport para ultrapassagens ou trechos específicos.',
  },
  {
    severity: 'WARN',
    title: 'Cadastro no aplicativo BYD pode falhar — confirme a ativação ainda na concessionária',
    body: 'Há relatos internacionais (Portugal) de veículos que nunca conseguiram vincular ao aplicativo BYD por falha de provisionamento no sistema da fabricante, com o VIN preso em status de "proposta de venda" em vez de liberado como veículo do cliente. Antes de sair da concessionária, confirme que o app já reconhece o carro e que funções remotas (localização, climatização, carga) estão ativas — se não estiverem, exija o registro do problema por escrito.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Acionamentos falsos do freio automático de emergência (AEB) relatados em mercado europeu',
    body: 'Uma proprietária em Portugal relatou quatro ativações falsas do AEB sem nenhum veículo ou obstáculo à frente, com um episódio grave em que o carro freou bruscamente e parou no meio de um cruzamento enquanto ela acelerava. Se o AEB do seu Sealion 7 frear sem motivo aparente, não ignore — registre data, local e condições (chuva, sol baixo, placas/reflexos) e leve o carro à concessionária para verificação dos sensores e atualização de software assim que possível.',
  },
  {
    severity: 'WARN',
    title: 'Cartão de recarga (go.Charge / RFID) pode ficar inutilizável após pouco uso',
    body: 'Também em relato internacional, o cartão de crédito para recarga fornecido com o carro ficou inutilizável após uma única utilização, com saldo aparecendo negativo. Se seu cartão de recarga apresentar erro, guarde comprovantes de uso e acione o suporte da BYD e da operadora de recarga imediatamente — não dependa de um único cartão/app como única forma de carregar em viagens.',
  },
  {
    severity: 'WARN',
    title: 'Suporte pós-venda pode ser lento por ser modelo novíssimo no Brasil',
    body: 'Por ter chegado ao Brasil apenas em maio de 2026, a rede de concessionárias ainda está se familiarizando com o Sealion 7 e alguns processos de garantia/pós-venda podem demorar mais que em modelos BYD já consolidados (como Dolphin ou Song Plus). Documente qualquer problema por escrito desde o primeiro contato e, se a resposta demorar além do prazo combinado, escale para a central da BYD Brasil, não apenas para o vendedor.',
  },
  {
    severity: 'WARN',
    title: 'Peças de reposição ainda concentradas na concessionária',
    body: 'Por ser um lançamento muito recente no país, praticamente não há oferta de peças no mercado paralelo/reposição para o Sealion 7 — isso inclui itens de carroceria, sensores e componentes específicos do sistema elétrico. Para qualquer reparo fora de garantia, cote na concessionária com antecedência, já que peças específicas podem precisar de importação e o prazo de entrega tende a ser maior do que em modelos populares.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Sealion 7 (elétrico AWD, adaptado à realidade BR)',
    body: '10.000 km/12 meses — Revisão geral (freios, suspensão, direção, fixações), rodízio de pneus e verificação do sistema de arrefecimento da bateria. | 20.000 km — Filtro de cabine (ar-condicionado). | 40.000 km — Fluido de freio DOT 4 (troca por tempo, mesmo com pouco uso por causa da recuperação de energia na frenagem regenerativa). | Anual — Inspeção do sistema de alta tensão (bateria, cabos de alta tensão, conectores de carga) e teste dos carregadores AC (11 kW) e DC (150 kW). | A cada abastecimento/recarga — Verificar visualmente o desgaste e a pressão dos pneus (rodas de 20", pneus 245/45 R20, carro pesado — cerca de 2.750 kg — o que acelera o desgaste). | Sempre — Manter o software do veículo e do aplicativo BYD atualizados, já que boa parte das funções (climatização remota, monitoramento de carga) dependem de conectividade.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Sealion 7',
    yearFrom: 2026,
    yearTo: null,
    tireSize: '245/45 R20',
    frontPsi: 35,
    rearPsi: 35,
    frontPsiLoad: 38,
    rearPsiLoad: 38,
    sparePsi: null,
    notes: 'Confirme sempre o valor exato na etiqueta da coluna da porta do motorista. Por ser um SUV elétrico pesado (~2.750 kg), manter a calibragem correta é ainda mais importante para autonomia, desgaste e comportamento em curva. Geralmente vem sem estepe (kit reparador).',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Sealion 7', yearFrom: 2026, yearTo: null, component: 'Revisão geral (freios, suspensão, direção)', intervalKm: 10000, intervalMonths: 12, notes: 'Sem motor a combustão, mas os itens mecânicos e de segurança seguem cronograma semelhante ao de carros convencionais.', priority: 'HIGH', order: 0 },
  { modelName: 'Sealion 7', yearFrom: 2026, yearTo: null, component: 'Rodízio de pneus (considerando AWD)', intervalKm: 10000, intervalMonths: null, notes: 'Com tração integral e motores em ambos os eixos, o desgaste tende a ser mais uniforme entre dianteira e traseira, mas o rodízio regular ainda prolonga a vida útil dos pneus 245/45 R20.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Sealion 7', yearFrom: 2026, yearTo: null, component: 'Filtro de cabine (ar-condicionado)', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas. Troque com mais frequência em regiões urbanas com muita poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Sealion 7', yearFrom: 2026, yearTo: null, component: 'Fluido de arrefecimento da bateria de alta tensão', intervalKm: null, intervalMonths: 24, notes: 'Sistema dedicado de arrefecimento da bateria Blade LFP — inspeção e eventual troca do fluido conforme manual, essencial para a vida útil da bateria.', priority: 'CRITICAL', order: 3 },
  { modelName: 'Sealion 7', yearFrom: 2026, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km — a frenagem regenerativa reduz o uso dos freios a disco, mas o fluido absorve umidade com o tempo independente do uso.', priority: 'HIGH', order: 4 },
  { modelName: 'Sealion 7', yearFrom: 2026, yearTo: null, component: 'Sistema de alta tensão (bateria, cabos, conectores de carga)', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual obrigatória, incluindo teste da porta de carga AC (11 kW) e DC (150 kW) e verificação de isolamento elétrico.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Sealion 7', yearFrom: 2026, yearTo: null, component: 'Pastilhas e discos de freio', intervalKm: 30000, intervalMonths: null, notes: 'Durabilidade tende a ser maior que em carros a combustão graças à frenagem regenerativa, mas ainda assim inspecione visualmente a cada revisão.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Sealion 7', yearFrom: 2026, yearTo: null, component: 'Atualização de software (veículo e app BYD)', intervalKm: null, intervalMonths: 6, notes: 'Verifique atualizações de firmware/software na concessionária — importante para segurança (ex.: calibração do AEB) e para funções conectadas do app.', priority: 'HIGH', order: 7 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Sealion 7',
    yearFrom: 2026,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed BYD Sealion 7...')

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

  console.log('✅ BYD Sealion 7 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
