/**
 * Seed Chevrolet Blazer EV — macetes, problemas, manutenção e calibragem
 * SUV 100% elétrico sobre a plataforma Ultium da GM, vendido no Brasil
 * exclusivamente na versão esportiva RS (tração traseira), lançado em
 * setembro de 2024. Motor elétrico de 347 cv / 44,9 kgfm (0-100 km/h em
 * 5,8s), bateria de 102 kWh com autonomia aferida pelo Inmetro em até
 * 481 km. Garantia de bateria: 8 anos ou 160.000 km. Modelo muito recente
 * no mercado brasileiro — histórico de confiabilidade local ainda escasso.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-blazer-ev
 *
 * Fontes: chevrolet.com.br, car.blog.br, cnnbrasil.com.br,
 *         leouve.com.br, media.gm.com (ficha técnica oficial),
 *         recharged.com (histórico de recalls/software nos EUA)
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
    title: 'Frenagem regenerativa forte: aprenda a dirigir "de um pedal só"',
    body: 'A Blazer EV RS tem frenagem regenerativa configurável, capaz de desacelerar o carro fortemente só ao soltar o acelerador — o chamado "one-pedal driving". Depois de se acostumar, você usa o pedal de freio convencional bem menos no trânsito urbano, o que poupa bastante as pastilhas de freio. Ajuste a intensidade da regenerativa nas configurações do painel conforme sua preferência de dirigibilidade.',
  },
  {
    severity: 'OK',
    title: 'Carregamento: wallbox AC durante a noite, DC rápido para viagem',
    body: 'Em casa, um carregador wallbox de 22 kW (instalação separada, não incluída no preço do carro) adiciona cerca de 40 km de autonomia por hora — ideal para recarregar durante a noite. Em viagem, um eletroposto de carregamento rápido DC recupera até 80% da bateria em cerca de 40 minutos. Planeje rotas longas com apoio de aplicativos de mapeamento de eletropostos, já que a rede de carregadores rápidos no Brasil ainda é bem mais escassa que postos de combustível.',
  },
  {
    severity: 'OK',
    title: 'Mantenha a carga entre 20% e 80% no uso diário',
    body: 'Para preservar a vida útil da bateria de 102 kWh a longo prazo, configure o limite de carga do dia a dia em torno de 80% pelo painel ou aplicativo myChevrolet, reservando a carga até 100% para viagens mais longas. Evitar deixar a bateria constantemente cheia ou muito descarregada por longos períodos reduz a degradação natural das células.',
  },
  {
    severity: 'OK',
    title: 'Sem troca de óleo de motor — foque a manutenção em freios, pneus e sistema de arrefecimento da bateria',
    body: 'Não há óleo de motor, filtro de óleo, velas ou correia dentada no Blazer EV — o motor elétrico não usa nenhum desses itens. A manutenção preventiva se concentra em: pastilhas/discos de freio (que duram mais por causa da regenerativa, mas merecem inspeção periódica), pneus (rodízio e calibragem, já que o peso da bateria é considerável), filtro de cabine e o sistema de arrefecimento líquido dedicado à bateria de alta tensão.',
  },
  {
    severity: 'WARN',
    title: 'Rodas de 21 polegadas: pneus mais caros e mais sensíveis a buracos',
    body: 'A versão RS vem com rodas de 21 polegadas e perfil de pneu baixo, o que melhora a estética mas reduz a proteção do aro contra buracos e lombadas mal dosadas — combinado ao peso elevado do carro (bateria pesada no assoalho), o risco de dano à roda ou ao pneu em más condições de via é maior que em um SUV a combustão convencional. Reduza a velocidade em vias esburacadas e inspecione rodas/pneus após qualquer impacto forte.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Modelo muito recente: pouco histórico de confiabilidade no mercado brasileiro',
    body: 'A Blazer EV RS chegou ao Brasil apenas em setembro de 2024, então ainda há pouquíssimos relatos de proprietários brasileiros de médio/longo prazo. Internacionalmente, as primeiras unidades (fabricadas em 2023/2024) enfrentaram problemas de software — telas travando, mensagens de erro e falhas ao carregar em estações rápidas — que motivaram a GM a pausar vendas nos EUA no fim de 2023 e liberar uma atualização abrangente de software em março de 2024. Não há confirmação de que essas versões de software cheguem exatamente iguais às unidades vendidas no Brasil, mas vale redobrar a atenção a qualquer comportamento anormal no painel/multimídia nos primeiros meses.',
  },
  {
    severity: 'WARN',
    title: 'Recalls internacionais conhecidos: chicote do freio de estacionamento traseiro e maçanetas',
    body: 'Nos EUA, a GM abriu recall para cerca de 40 mil unidades da Blazer EV (produzidas no México) por risco de dano ao chicote elétrico do freio de estacionamento traseiro, e outro recall por tratamento térmico inadequado nas travas das portas, que pode causar quebra e abertura inesperada da porta. Não há confirmação pública específica de aplicação desses recalls no Brasil no momento — se você tem uma Blazer EV, consulte periodicamente o site da GM/Chevrolet e o histórico do seu chassi (VIN) para eventuais campanhas de recall aplicáveis à unidade brasileira.',
  },
  {
    severity: 'WARN',
    title: 'Rede de assistência técnica especializada em Ultium ainda em formação no Brasil',
    body: 'A plataforma Ultium é nova na rede brasileira, então o número de técnicos com experiência prática em diagnóstico do sistema de alta tensão, software e carregamento da Blazer EV ainda é pequeno. Para qualquer problema relacionado à bateria, ao inversor ou a atualizações de software, prefira concessionárias Chevrolet com estrutura confirmada para elétricos — evite oficinas genéricas para esse tipo de reparo.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Blazer EV (adaptado da GM — sem itens de motor a combustão)',
    body: '10.000 km/12 meses — Rodízio de pneus e inspeção geral de freios, suspensão e níveis de fluido. | 20.000 km/12 meses — Filtro de cabine. | 20.000 km — Inspeção das pastilhas e discos de freio (regenerativa reduz o desgaste, mas verifique corrosão por baixo uso). | 40.000 km/24 meses — Fluido de freio DOT 4 (troca por tempo, não só por km). | Conforme manual — Verificação do fluido de arrefecimento da bateria de alta tensão e do inversor. | A cada revisão — Verificar disponibilidade de atualização de software na concessionária. | Sem item — Não há troca de óleo de motor, filtro de óleo, velas ou correia dentada.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Blazer EV',
    yearFrom: 2024,
    yearTo: null,
    tireSize: '21" (perfil baixo, versão RS única no Brasil)',
    frontPsi: 36,
    rearPsi: 39,
    frontPsiLoad: 39,
    rearPsiLoad: 42,
    sparePsi: null,
    notes: 'SUV elétrico pesado (bateria de 102 kWh no assoalho) — confirme sempre o valor exato na etiqueta da coluna da porta do motorista antes de calibrar.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Blazer EV', yearFrom: 2024, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: 12, notes: 'Cruzado; pneus de perfil baixo em rodas 21" exigem atenção redobrada a desgaste irregular.', priority: 'MEDIUM', order: 0 },
  { modelName: 'Blazer EV', yearFrom: 2024, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Blazer EV', yearFrom: 2024, yearTo: null, component: 'Pastilhas e discos de freio — inspeção', intervalKm: 20000, intervalMonths: 12, notes: 'Duram mais por causa da regenerativa forte, mas podem enferrujar por baixo uso.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Blazer EV', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 3 },
  { modelName: 'Blazer EV', yearFrom: 2024, yearTo: null, component: 'Fluido de arrefecimento da bateria de alta tensão', intervalKm: null, intervalMonths: null, notes: 'Confirme intervalo exato no manual — essencial para vida útil e velocidade de recarga da bateria.', priority: 'HIGH', order: 4 },
  { modelName: 'Blazer EV', yearFrom: 2024, yearTo: null, component: 'Software/atualizações do veículo', intervalKm: null, intervalMonths: 6, notes: 'Modelo teve histórico de bugs de software nos primeiros lotes internacionais — verifique atualizações disponíveis com frequência.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Blazer EV', yearFrom: 2024, yearTo: null, component: 'Chicote do freio de estacionamento traseiro — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Verifique com a concessionária se há campanha de recall aplicável ao seu chassi (problema conhecido internacionalmente).', priority: 'MEDIUM', order: 6 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Blazer EV',
    yearFrom: 2024,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Blazer EV...')

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

  console.log('✅ Chevrolet Blazer EV concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
