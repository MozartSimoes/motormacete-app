/**
 * Seed BYD eT3 — macetes, problemas, manutenção e calibragem de pneus
 * Furgão/van de carga 100% elétrico, veículo comercial leve voltado a
 * empresas de entrega, logística de última milha e frotistas (ex.: PepsiCo,
 * Corpus Saneamento e Obras, Carbono Zero já usaram/testaram a frota).
 * Motor elétrico dianteiro de 109 cv / 18,3 kgfm, bateria LFP (Blade
 * Battery) de 44,9 kWh, autonomia homologada de até 300 km, velocidade
 * máxima limitada a 100 km/h. Recarga DC rápida (20-80% em ~30 min) e
 * recarga AC completa em ~2h. Compartimento de carga de 3.300 litros
 * (3,3 m³) e capacidade útil que varia por versão/atualização (~720-800 kg).
 * Foi o veículo elétrico mais emplacado no Brasil em alguns meses de 2021.
 * Execute: pnpm --filter @motormacete/database db:seed:byd-et3
 *
 * Fontes: forumcarros.com.br, mobiauto.com.br, movenews.com.br,
 *         diariodotransporte.com.br, autopapo.com.br, oficinasbh.com,
 *         vrum.com.br, mecanicaonline.com.br, byd.com (manual/ficha técnica)
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
    title: 'Custo por km bem menor que diesel/gasolina — mas planeje a recarga como planejava o abastecimento',
    body: 'O eT3 troca o custo de combustível pelo custo de energia, historicamente muito mais barato por km rodado em uso de entrega urbana. Para aproveitar essa vantagem sem surpresas, trate a recarga como parte da rotina operacional: programe recarga AC (mais lenta, mais saudável para a bateria) no período em que o furgão fica parado (ex.: à noite ou fora do turno de entregas) e reserve a recarga DC rápida só para giros extras no meio do dia.',
  },
  {
    severity: 'OK',
    title: 'Mantenha a carga da bateria entre 20% e 80% no uso diário',
    body: 'Como em outros elétricos com bateria LFP, rodar sempre entre 20% e 80% de carga preserva a vida útil da bateria muito mais do que ciclos completos de 0-100% todos os dias. Reserve a carga até 100% apenas para dias em que a rota realmente exigir a autonomia máxima (até 300 km homologados).',
  },
  {
    severity: 'OK',
    title: 'Frenagem regenerativa e modo um-pedal reduzem desgaste de freio em rota de entrega',
    body: 'Entregas urbanas envolvem muita frenagem em trecho curto (parada-arranque constante). O eT3 conta com frenagem regenerativa e modo de condução em um pedal — usar esse modo no trajeto de entrega reduz o desgaste das pastilhas/discos convencionais e ainda devolve energia à bateria, esticando a autonomia real.',
  },
  {
    severity: 'WARN',
    title: 'Não deixe o furgão parado por semanas com bateria baixa',
    body: 'Se o veículo ficar parado por período prolongado (baixa temporada, manutenção da frota, etc.), não deixe com a bateria descarregada. Recarregue a 100%, use até a faixa de 40-60% e faça uma recarga de manutenção mensal — isso evita degradação acelerada da célula LFP durante o período parado.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Disponibilidade de peças ainda é ponto de atenção para frota que não pode parar',
    body: 'Há relatos de clientes BYD no Brasil aguardando de três semanas a um mês por peças, incluindo casos de pneu específico sem previsão de chegada por 20 dias. A BYD afirma manter centro de distribuição de peças em Cariacica (ES) desde 2021, mas para um veículo comercial em que cada dia parado é receita perdida, vale negociar com a concessionária um SLA de peças e, se possível, manter um veículo reserva combinado antecipadamente.',
  },
  {
    severity: 'WARN',
    title: 'Rede de assistência BYD ainda é mais restrita geograficamente que Fiat/Renault/VW',
    body: 'Diferente de furgões tradicionais (Fiorino, Kangoo, Master, Delivery), que têm rede de concessionárias e oficinas multimarca espalhada por praticamente todo o país, a rede autorizada BYD ainda está em expansão. Antes de formar frota eT3 fora de grandes capitais, confirme a distância até a oficina autorizada mais próxima — isso impacta diretamente o tempo de parada em caso de pane ou revisão.',
  },
  {
    severity: 'DANGER',
    title: 'Reparo fora da rede autorizada pode cancelar a garantia',
    body: 'O manual de garantia BYD prevê cancelamento de cobertura caso o proprietário deixe de cumprir o plano de revisões programado ou realize reparos fora da rede autorizada da marca. Para uso comercial isso é um risco real — a tentação de usar uma oficina de bairro para agilizar o retorno à operação pode custar caro se comprometer a garantia da bateria/motor elétrico.',
  },
  {
    severity: 'WARN',
    title: 'Autonomia real cai com carga cheia, ar-condicionado e recarga rápida frequente',
    body: 'A autonomia homologada de até 300 km é medida em condições controladas. Em operação real de entrega — furgão com carga próxima do limite, ar-condicionado ligado e paradas constantes — a autonomia útil tende a ser menor. Usar recarga DC rápida com muita frequência também acelera o desgaste da bateria a médio prazo. Dimensione a rota diária com margem de segurança em vez de contar com o número da ficha técnica.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma eT3 (BYD + ajuste uso comercial intensivo)',
    body: 'A cada recarga — Verificar visualmente o desgaste dos pneus e a calibragem, já que o furgão roda quase sempre com carga. | 10.000 km — Rodízio de pneus, inspeção de freios e alinhamento/balanceamento (uso comercial acelera desgaste da dianteira). | 15.000 km — Inspeção da suspensão dianteira e traseira sob carga (buchas, amortecedores). | 20.000 km — Filtro de cabine/ar-condicionado. | 40.000 km — Fluido de freio DOT 4. | Anual — Inspeção do sistema de alta tensão (bateria de tração, motor elétrico, cabos de alta voltagem) e do sistema de carregamento (porta AC/DC), obrigatoriamente em rede autorizada para não comprometer a garantia. | Sempre — Manter o plano de revisões programado em dia, mesmo sem sintoma aparente, pois é pré-requisito contratual da garantia estendida para uso comercial (6 anos / sistema de alta tensão até 200.000 km).',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'eT3',
    yearFrom: 2021,
    yearTo: null,
    tireSize: '195/60 R16',
    frontPsi: 32,
    rearPsi: 34,
    frontPsiLoad: 36,
    rearPsiLoad: 44,
    sparePsi: null,
    notes: 'Como veículo de carga, a pressão traseira sobe bastante com o furgão carregado — confirme sempre o valor exato na etiqueta da coluna da porta do motorista e recalibre ao alternar entre rota com carga cheia e furgão vazio/parcialmente carregado.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'eT3', yearFrom: 2021, yearTo: null, component: 'Sistema de alta tensão (bateria de tração + motor elétrico)', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual obrigatória em rede autorizada — pré-requisito da garantia estendida de uso comercial.', priority: 'CRITICAL', order: 0 },
  { modelName: 'eT3', yearFrom: 2021, yearTo: null, component: 'Pneus — rodízio e verificação de desgaste', intervalKm: 10000, intervalMonths: null, notes: 'Uso comercial com carga constante acelera o desgaste, principalmente da dianteira.', priority: 'HIGH', order: 1 },
  { modelName: 'eT3', yearFrom: 2021, yearTo: null, component: 'Freios (pastilhas e discos)', intervalKm: 20000, intervalMonths: null, notes: 'Frenagem regenerativa reduz o desgaste, mas ainda é preciso checar o sistema convencional.', priority: 'HIGH', order: 2 },
  { modelName: 'eT3', yearFrom: 2021, yearTo: null, component: 'Suspensão dianteira e traseira — inspeção sob carga', intervalKm: 15000, intervalMonths: null, notes: 'Buchas e amortecedores sofrem mais com furgão rodando quase sempre carregado.', priority: 'HIGH', order: 3 },
  { modelName: 'eT3', yearFrom: 2021, yearTo: null, component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: null, notes: 'Antecipe se notar puxamento ou desgaste irregular de pneu.', priority: 'MEDIUM', order: 4 },
  { modelName: 'eT3', yearFrom: 2021, yearTo: null, component: 'Filtro de cabine/ar-condicionado', intervalKm: 20000, intervalMonths: 12, notes: 'Reduza o intervalo em rotas urbanas com muita poeira/trânsito parado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'eT3', yearFrom: 2021, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'eT3', yearFrom: 2021, yearTo: null, component: 'Sistema de carregamento (porta AC/DC e cabo)', intervalKm: null, intervalMonths: 12, notes: 'Inspecionar conectores e cabo, especialmente se a frota usa recarga rápida DC com frequência.', priority: 'HIGH', order: 7 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'eT3',
    yearFrom: 2021,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed BYD eT3...')

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

  console.log('✅ BYD eT3 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
