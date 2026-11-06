/**
 * Seed BYD D1 EV — macetes, problemas, manutenção e calibragem de pneus
 * Minivan/MPV 100% elétrica projetada, desde o início, para uso comercial
 * como carro de aplicativo — desenvolvida em parceria com a Didi Chuxing
 * (controladora da 99). Motor elétrico dianteiro de 136 cv/180 Nm, bateria
 * Blade LFP de ~53 kWh, porta traseira direita corrediça elétrica e
 * assoalho baixo pensados para embarque/desembarque rápido de passageiros.
 * Autonomia PBEV/Inmetro de ~258 km (até 371 km no ciclo NEDC). Em alguns
 * mercados foi ofertada via locação vinculada à plataforma 99, com pacote
 * mensal de km incluído.
 * Execute: pnpm --filter @motormacete/database db:seed:byd-d1
 *
 * Fontes: mobiauto.com.br, forumcarros.com.br, jantes-e-pneus.com,
 *         vrum.com.br, instacarro.com, bydbrasil.com.br,
 *         reclameaqui.com.br, otempo.com.br, cnnbrasil.com.br,
 *         autopapo.com.br, carros2025.com, eudirijo.com.br
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
    title: 'Autonomia real: use o número do Inmetro, não o do ciclo chinês',
    body: 'A BYD divulga até 371 km de autonomia no ciclo NEDC, mas o número que reflete melhor o uso no Brasil é o PBEV/Inmetro, próximo de 258 km. Em rodovia e velocidades mais altas o consumo sobe bastante — planeje suas recargas pelo número mais conservador, principalmente em dias de corridas longas ou fora da cidade.',
  },
  {
    severity: 'OK',
    title: 'Aproveite as janelas entre corridas para recarga rápida',
    body: 'O carregador rápido leva a bateria de 0 a 80% em cerca de 35 minutos, contra ~9 horas em tomada AC comum. Para quem roda o dia todo, vale mapear pontos de recarga rápida no seu raio de atuação e completar a bateria em pausas curtas (almoço, troca de turno) em vez de depender de uma única recarga longa durante a noite.',
  },
  {
    severity: 'WARN',
    title: 'Porta traseira elétrica corrediça: teste o sensor de obstrução todo dia',
    body: 'A porta traseira direita corrediça e elétrica é um dos maiores diferenciais do D1 para nota do passageiro, mas depende de sensores para não fechar sobre bagagem, mãos ou roupas. Antes de começar a rodar, confira se o sensor de obstrução está respondendo normalmente — uma porta que fecha com força ou trava recorrentemente derruba a avaliação e pode gerar reclamação de passageiro.',
  },
  {
    severity: 'WARN',
    title: 'Se o carro for alugado via plataforma, controle o pacote de km mensal',
    body: 'Em alguns modelos de locação vinculados a aplicativos de transporte, o D1 é ofertado por mensalidade fixa com uma franquia de quilometragem incluída (na ordem de milhares de km/mês) — km excedente costuma ser cobrado à parte. Acompanhe seu odômetro semanalmente para não ser pego de surpresa na fatura por ter estourado a franquia.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Demora na disponibilidade de peças pode parar o carro por semanas',
    body: 'Há relatos recorrentes de espera de três semanas a mais de um mês por peças de reposição da BYD, com casos de veículos parados na concessionária por 60 dias ou mais — problema mais crítico em cidades do interior, onde a rede é mais limitada. Para quem depende do carro para trabalhar, vale manter contato ativo com a concessionária, guardar protocolos de atendimento e, se possível, escolher uma concessionária com histórico melhor de giro de estoque de peças antes de comprar.',
  },
  {
    severity: 'WARN',
    title: 'Garantia para uso comercial tem teto de km mais apertado que a de uso particular',
    body: 'Nas condições mais recentes da BYD, veículos de uso comercial (aplicativo/táxi) têm garantia do veículo limitada a 100.000 km mesmo dentro do prazo de anos, enquanto o uso particular chega a 200.000 km. Quem roda muito por dia pode atingir esse teto de km bem antes do prazo em anos se esgotar — acompanhe sua quilometragem acumulada e negocie extensão de garantia se for continuar usando o carro intensamente após bater o limite.',
  },
  {
    severity: 'WARN',
    title: 'Painel de instrumentos pequeno dificulta acompanhar dados durante a corrida',
    body: 'Motoristas relatam que o painel de instrumentos do D1 é pequeno (poucos centímetros de altura) e mostra informações limitadas, dificultando o acompanhamento de dados como autonomia restante e consumo em tempo real enquanto dirige. Familiarize-se com os menus do painel e da central multimídia fora do horário de trabalho para não perder tempo procurando informação durante o expediente.',
  },
  {
    severity: 'WARN',
    title: 'Consumo sobe bastante em rodovia e velocidade mais alta',
    body: 'Assim como em outros elétricos, a autonomia do D1 cai de forma perceptível acima de 100 km/h e a velocidade máxima já é limitada a 130 km/h de fábrica. Se sua rotina de corridas inclui trechos longos de rodovia, considere manter velocidade mais moderada e recarregar com mais frequência para não ficar com autonomia insuficiente entre um ponto de recarga e outro.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma D1 EV (BYD + ajuste para uso intensivo de aplicativo)',
    body: '5.000 km — Rodízio e inspeção de desgaste dos pneus (uso intensivo desgasta mais rápido que o padrão de 10.000 km). | 10.000 km — Verificação de sensor e trilho da porta elétrica corrediça. | 10.000 km — Alinhamento e balanceamento (peso extra da bateria acelera desgaste irregular). | 15.000 km/12 meses — Filtro de ar-condicionado/cabine. | 20.000 km — Inspeção das pastilhas de freio (o freio regenerativo reduz o desgaste, mas ainda exige checagem). | 20.000 km/12 meses — Inspeção do sistema de arrefecimento da bateria de alta tensão, essencial em quem roda o dia todo sob sol e trânsito parado. | 40.000 km/24 meses — Fluido de freio DOT 4. | Anual — Inspeção geral do sistema de alta tensão (bateria, cabos, porta de recarga e carregador, rápido e AC).',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'D1 EV',
    yearFrom: 2022,
    yearTo: null,
    tireSize: '195/60 R16',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 36,
    rearPsiLoad: 38,
    sparePsi: null,
    notes: 'Confirme sempre o valor exato na etiqueta da coluna da porta do motorista. Como motorista de aplicativo costuma rodar quase sempre com carro cheio (passageiros + bagagem), priorize a pressão com carga (load) no dia a dia. Verifique se sua unidade tem estepe ou apenas kit reparador.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'D1 EV', yearFrom: 2022, yearTo: null, component: 'Pneus — rodízio e verificação de desgaste', intervalKm: 5000, intervalMonths: null, notes: 'Intervalo reduzido em relação ao padrão de 10.000 km por causa do uso intensivo como carro de aplicativo.', priority: 'HIGH', order: 0 },
  { modelName: 'D1 EV', yearFrom: 2022, yearTo: null, component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: null, notes: 'Peso extra da bateria de alta tensão acelera desgaste irregular sob uso intensivo.', priority: 'MEDIUM', order: 1 },
  { modelName: 'D1 EV', yearFrom: 2022, yearTo: null, component: 'Porta traseira elétrica corrediça — trilho e sensores', intervalKm: 10000, intervalMonths: 6, notes: 'Item usado dezenas de vezes por dia em uso comercial; falha no sensor de obstrução gera reclamação de passageiro.', priority: 'MEDIUM', order: 2 },
  { modelName: 'D1 EV', yearFrom: 2022, yearTo: null, component: 'Filtro de ar-condicionado/cabine', intervalKm: 15000, intervalMonths: 12, notes: 'Ar-condicionado roda o turno inteiro em uso de aplicativo — reduza o intervalo em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'D1 EV', yearFrom: 2022, yearTo: null, component: 'Pastilhas de freio — inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Freio regenerativo reduz desgaste, mas ainda exige checagem periódica.', priority: 'MEDIUM', order: 4 },
  { modelName: 'D1 EV', yearFrom: 2022, yearTo: null, component: 'Sistema de arrefecimento da bateria de alta tensão', intervalKm: 20000, intervalMonths: 12, notes: 'Crítico para quem roda o dia todo sob sol e trânsito parado — condição típica de motorista de app.', priority: 'HIGH', order: 5 },
  { modelName: 'D1 EV', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'D1 EV', yearFrom: 2022, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos) e carregadores', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual, incluindo teste do carregador rápido e do carregador AC/wallbox.', priority: 'HIGH', order: 7 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'D1 EV',
    yearFrom: 2022,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed BYD D1 EV...')

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

  console.log('✅ BYD D1 EV concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
