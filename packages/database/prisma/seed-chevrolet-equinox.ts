/**
 * Seed Chevrolet Equinox — macetes, problemas, manutenção e calibragem
 * SUV médio importado, geração atual (lançada no Brasil em dezembro de
 * 2024). Versões a combustão: 1.5 turbo (172-177cv, câmbio automático 8
 * marchas) e 2.0 turbo (262cv, AWD). Também vendido como Equinox EV
 * (100% elétrico, 292cv) — mecânica completamente diferente das versões
 * a combustão. #91 no ranking de vendas 2025 no Brasil (2.297 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-equinox
 *
 * Fontes: mobiauto.com.br, autopapo.com.br, chevrolet.com.br,
 *         mercadoveiculos.com, reclameaqui.com.br
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
    title: 'Confirme se sua unidade é a combustão ou a EV — mecânica totalmente diferente',
    body: 'O nome "Equinox" no Brasil cobre tanto as versões a combustão (1.5 turbo ou 2.0 turbo AWD) quanto o Equinox EV, 100% elétrico. São veículos com mecânica completamente diferente — confirme sempre qual equipa sua unidade antes de aplicar qualquer dica de manutenção de motor a combustão (elas não se aplicam ao EV) ou de bateria/recarga (não se aplicam às versões a combustão).',
  },
  {
    severity: 'OK',
    title: 'Modelo recente no Brasil: siga o manual à risca, ainda sem histórico longo',
    body: 'O Equinox chegou ao Brasil no fim de 2024 (versões a combustão) e ainda não acumulou histórico de confiabilidade de longo prazo no mercado nacional. Siga rigorosamente os intervalos do manual e não estique prazos de revisão — é a forma mais segura de evitar problemas em um modelo ainda "jovem" localmente.',
  },
  {
    severity: 'OK',
    title: 'Equinox EV 292cv: frenagem regenerativa forte, aprenda a dirigir "de um pedal só"',
    body: 'A versão elétrica (Equinox EV, motor de 292 cv, bateria de 85 kWh) tem frenagem regenerativa que desacelera bastante o carro só ao soltar o acelerador. Depois de se acostumar, você passa a usar o pedal de freio convencional bem menos no trânsito urbano — isso poupa muito as pastilhas de freio, que tendem a durar bem mais do que em uma versão a combustão equivalente.',
  },
  {
    severity: 'OK',
    title: 'Equinox EV: carregamento AC em casa para o dia a dia, DC rápido só em viagem',
    body: 'O Equinox EV aceita até 22 kW em corrente alternada (AC) — ideal para recarregar durante a noite em um carregador residencial (wallbox) — e até 150 kW em corrente contínua (DC) rápida, recuperando boa parte da bateria em poucos minutos em eletropostos de viagem. No dia a dia urbano, a recarga AC residencial costuma ser suficiente; reserve o carregador DC rápido para deslocamentos mais longos.',
  },
  {
    severity: 'OK',
    title: 'Equinox EV: mantenha a carga entre 20% e 80% no uso diário',
    body: 'Para preservar a vida útil da bateria de 85 kWh a longo prazo, configure o limite de recarga do dia a dia em torno de 80% pelo painel/aplicativo, reservando a carga até 100% para os dias de viagem mais longa. Evitar deixar a bateria constantemente cheia ou muito descarregada por longos períodos reduz a degradação natural das células.',
  },
  {
    severity: 'OK',
    title: 'Equinox EV: sem troca de óleo de motor — foque em freios, pneus e arrefecimento da bateria',
    body: 'Na versão elétrica não existe óleo de motor, filtro de óleo, velas ou correia dentada — o motor elétrico não usa nenhum desses itens. A manutenção preventiva se concentra em pastilhas/discos de freio, pneus (calibragem e rodízio, já que o peso da bateria é considerável) e no sistema de arrefecimento líquido dedicado à bateria de alta tensão, que deve seguir o intervalo do manual.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ruído metálico do motor pode indicar tensionador de corrente de comando com defeito',
    body: 'Foi identificado defeito no tensionador da corrente de comando dos motores turbo, que pode perder pressão e gerar folga na corrente — resultando em ruído metálico vindo da parte superior do motor. Se notar esse tipo de ruído, não ignore: leve para verificação imediata. Se houver sinais de desgaste, o reparo correto envolve substituir corrente, tensionador e guias juntos, não apenas a peça isolada.',
  },
  {
    severity: 'WARN',
    title: 'Poucos relatos disponíveis ainda — modelo recente no mercado brasileiro',
    body: 'Por ser um lançamento recente no Brasil (dezembro de 2024), o volume de relatos de proprietários ainda é pequeno comparado a modelos mais estabelecidos. Isso não significa ausência de problemas — apenas que o histórico de confiabilidade de longo prazo ainda está sendo formado. Vale redobrar a atenção a qualquer comportamento anormal nos primeiros meses de uso.',
  },
  {
    severity: 'WARN',
    title: 'Equinox EV: rede de assistência especializada em elétricos ainda em formação no Brasil',
    body: 'Por ser uma versão elétrica recente sobre plataforma Ultium, o número de técnicos com experiência prática em diagnóstico do sistema de alta tensão, software e carregamento do Equinox EV ainda é pequeno em relação à rede de carros a combustão. Para qualquer problema relacionado à bateria, ao inversor ou ao software do veículo, prefira concessionárias Chevrolet com estrutura confirmada para elétricos.',
  },
  {
    severity: 'OK',
    title: 'Equinox EV: degradação natural da bateria é esperada — acompanhe a autonomia ao longo dos anos',
    body: 'Como toda bateria de íon-lítio, a do Equinox EV perde capacidade gradualmente com o tempo e os ciclos de carga — isso é normal, não é defeito. Acompanhe a autonomia estimada pelo painel a cada poucos meses; uma queda abrupta e fora do padrão gradual de desgaste é sinal para levar à concessionária e confirmar a cobertura de garantia da bateria.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Equinox combustão (Chevrolet + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor turbo (1.5 ou 2.0, especificação exata do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Fluido do câmbio automático de 8 marchas. | A cada revisão — Verificar ruído metálico do motor (possível sinal de desgaste do tensionador de corrente de comando).',
  },
  {
    severity: 'OK',
    title: 'Cronograma Equinox EV 292cv (elétrico) — sem itens de motor a combustão',
    body: '10.000 km/12 meses — Rodízio de pneus e inspeção geral de freios, suspensão e níveis de fluido. | 20.000 km/12 meses — Filtro de cabine. | 20.000 km — Inspeção das pastilhas e discos de freio (regenerativa reduz o desgaste, mas verifique corrosão por baixo uso). | 40.000 km/24 meses — Fluido de freio DOT 4 (troca por tempo, não só por km). | Conforme manual — Verificação do fluido de arrefecimento da bateria de alta tensão de 85 kWh. | A cada revisão — Verificar disponibilidade de atualização de software na concessionária. | Sem item — Não há troca de óleo de motor, filtro de óleo, velas ou correia dentada.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Equinox',
    yearFrom: 2024,
    yearTo: null,
    tireSize: '225/65 R17 · 225/60 R18 · 235/50 R19 (versões superiores)',
    frontPsi: 35,
    rearPsi: 35,
    frontPsiLoad: 38,
    rearPsiLoad: 40,
    sparePsi: 60,
    notes: 'Confirme sempre o valor exato do seu aro/versão na etiqueta da coluna da porta do motorista — valores podem variar entre a versão a combustão e a EV.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Equinox', yearFrom: 2024, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor (1.5 ou 2.0 turbo). Não se aplica à versão EV.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Equinox', yearFrom: 2024, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo. Não se aplica à versão EV.', priority: 'HIGH', order: 1 },
  { modelName: 'Equinox', yearFrom: 2024, yearTo: null, component: 'Corrente de comando e tensionador — verificação', intervalKm: null, intervalMonths: null, notes: 'Verificar se notar ruído metálico do motor — defeito conhecido no tensionador.', priority: 'HIGH', order: 2 },
  { modelName: 'Equinox', yearFrom: 2024, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira. Não se aplica à versão EV.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Equinox', yearFrom: 2024, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Equinox', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Equinox', yearFrom: 2024, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet. Não se aplica à versão EV.', priority: 'HIGH', order: 6 },
  { modelName: 'Equinox', yearFrom: 2024, yearTo: null, component: 'Fluido do câmbio automático de 8 marchas', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar tranco nas trocas. Não se aplica à versão EV.', priority: 'HIGH', order: 7 },
  { modelName: 'Equinox', yearFrom: 2024, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Equinox', yearFrom: 2024, yearTo: null, component: 'Pastilhas e discos de freio — inspeção (versão EV)', intervalKm: 20000, intervalMonths: 12, notes: 'Só se aplica à versão EV — duram mais por causa da regenerativa, mas podem enferrujar por baixo uso.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Equinox', yearFrom: 2024, yearTo: null, component: 'Fluido de arrefecimento da bateria de alta tensão (versão EV)', intervalKm: null, intervalMonths: null, notes: 'Só se aplica à versão EV — confirme intervalo exato no manual, essencial para vida útil e velocidade de recarga da bateria de 85 kWh.', priority: 'HIGH', order: 10 },
  { modelName: 'Equinox', yearFrom: 2024, yearTo: null, component: 'Software/atualizações do veículo (versão EV)', intervalKm: null, intervalMonths: 12, notes: 'Só se aplica à versão EV — verifique atualizações disponíveis na concessionária a cada revisão anual.', priority: 'LOW', order: 11 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Equinox',
    yearFrom: 2024,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Equinox...')

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

  console.log('✅ Chevrolet Equinox concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
