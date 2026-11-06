/**
 * Seed Chevrolet Bolt EV / Bolt EUV — macetes, problemas, manutenção e calibragem
 * Hatch (EV) e SUV compacto (EUV) 100% elétricos, importados dos EUA/México.
 * Bolt EV chegou ao Brasil em agosto/2022 (R$ 329 mil, versão única);
 * Bolt EUV chegou em 2023 (a partir de R$ 279.990). Motor elétrico dianteiro
 * de ~203 cv / 36,7 kgfm, bateria de íons de lítio de ~65 kWh (LG),
 * autonomia estimada entre ~360-460 km dependendo do ciclo de medição.
 * GM encerrou a produção global do Bolt (EV e EUV) em dezembro de 2023 —
 * modelo descontinuado, sem substituto direto da mesma nomenclatura.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-bolt-ev
 *
 * Fontes: chevrolet.com.br, olhardigital.com.br, car.blog.br,
 *         revistaautomotivo.com.br, autopapo.com.br, gmauthority.com,
 *         media.cadillac.com (ficha técnica oficial Bolt EUV)
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
    title: 'Frenagem regenerativa: use o modo "Low"/paddle para poupar as pastilhas',
    body: 'O Bolt EV/EUV recupera energia da desaceleração para a bateria por meio da frenagem regenerativa, acionada pela alavanca "Low" no seletor de marchas ou pela paleta "Regen on Demand" atrás do volante. Aprenda a dirigir liberando o acelerador com antecedência para desacelerar sem tocar no pedal de freio na maior parte do trânsito urbano — isso poupa bastante as pastilhas convencionais, que tendem a durar muito mais do que em um carro a combustão equivalente.',
  },
  {
    severity: 'OK',
    title: 'Carregamento: cabo portátil é lento, wallbox e carregador rápido DC mudam o jogo',
    body: 'O cabo portátil que acompanha o carro em tomada residencial comum (220V/10A) carrega em torno de 10 km de autonomia por hora — útil só em emergência. Um carregador residencial dedicado (wallbox, 240V/32A) sobe para cerca de 40 km/h, suficiente para completar a carga durante a noite. Para viagens, procure eletropostos com carregador rápido DC (CCS), que recuperam boa parte da bateria em cerca de 1 hora. Avalie instalar um wallbox se for usar o carro no dia a dia — recarregar só na tomada comum é viável apenas para quem roda pouco.',
  },
  {
    severity: 'OK',
    title: 'Mantenha a carga entre 20% e 80% no uso diário; 100% só antes de viagem longa',
    body: 'Baterias de íon-lítio duram mais quando evitam ficar constantemente em carga máxima (100%) ou muito baixa (perto de 0%) por longos períodos. Para o uso do dia a dia, programe o carregamento para parar por volta de 80% (o Bolt permite configurar isso no painel/app myChevrolet) e reserve a carga completa para os dias de viagem mais longa. Isso reduz o desgaste acelerado da bateria a longo prazo.',
  },
  {
    severity: 'OK',
    title: 'Não existe troca de óleo de motor — mas o sistema de arrefecimento da bateria precisa de atenção',
    body: 'O motor elétrico não usa óleo lubrificante nem filtro de óleo, então esse item simplesmente não existe no Bolt. Em compensação, a bateria de alta tensão tem um sistema de arrefecimento líquido próprio (independente do ar-condicionado da cabine), essencial para manter as células dentro da temperatura ideal de operação e carregamento rápido. Siga o intervalo do manual para verificação/troca desse fluido — negligenciá-lo pode reduzir a vida útil da bateria e limitar a velocidade de recarga.',
  },
  {
    severity: 'WARN',
    title: 'Modelo descontinuado: peças e suporte técnico ficam concentrados na rede Chevrolet',
    body: 'A GM encerrou a produção mundial do Bolt EV e do Bolt EUV em dezembro de 2023, sem lançar um substituto direto com o mesmo nome no Brasil. Isso significa que peças de reposição específicas (baterias, módulos eletrônicos, software) tendem a ficar concentradas na rede autorizada Chevrolet, com pouca alternativa em oficinas independentes ou desmanches por enquanto. Reserve orçamento e paciência para peças específicas do sistema elétrico e prefira concessionárias com experiência em veículos elétricos GM.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall Bolt EUV 2022/2023: risco de choque elétrico ao desconectar o cabo de recarga',
    body: 'A GM abriu recall para o Bolt EUV (não o hatch Bolt EV) fabricado em 2022 e 2023 por incompatibilidade entre o cabo de recarga portátil (fornecido com o carro) e o software do sistema elétrico, que poderia falhar em cortar a corrente ao desconectar o plugue da tomada — gerando risco de choque rápido. O problema ocorre apenas com o cabo que acompanha o veículo; recarregar em postos públicos não apresenta esse risco. Se você tem um Bolt EUV desse período, confirme junto à concessionária Chevrolet se o recall já foi aplicado ao seu chassi antes de usar o cabo portátil.',
  },
  {
    severity: 'WARN',
    title: 'Histórico de recall de incêndio na bateria (2020-2022) — confirme se seu chassi já foi corrigido',
    body: 'Entre 2020 e 2022, a GM e a LG identificaram defeitos raros de fabricação em células de bateria que, combinados, aumentavam o risco de incêndio no Bolt EV — a produção chegou a ficar parada por 10 meses até a correção. Unidades vendidas no Brasil a partir de 2022 já usam módulos de bateria revisados, mas é prudente confirmar pelo número de chassi (VIN), no site da GM ou em uma concessionária, se o seu carro específico passou pela substituição do pacote de bateria antes de comprar um usado.',
  },
  {
    severity: 'WARN',
    title: 'Rede de assistência técnica especializada em elétricos ainda é limitada no Brasil',
    body: 'Por ser um modelo de baixo volume e já descontinuado, o número de concessionárias e técnicos com experiência prática em diagnóstico e reparo do sistema de alta tensão do Bolt é menor do que para carros a combustão populares. Para qualquer problema relacionado à bateria, ao inversor ou ao software do veículo, prefira concessionárias Chevrolet com histórico em atendimento de elétricos — evite oficinas genéricas para esse tipo de reparo.',
  },
  {
    severity: 'WARN',
    title: 'Degradação natural da bateria: acompanhe a autonomia ao longo dos anos',
    body: 'Como toda bateria de íon-lítio, a do Bolt perde capacidade gradualmente com o tempo e os ciclos de carga — isso é normal e esperado, não é defeito. A garantia da bateria de alta tensão é de 8 anos ou 160.000 km (o que ocorrer primeiro) contra degradação excessiva. Acompanhe a autonomia estimada pelo painel a cada poucos meses; uma queda abrupta e fora do padrão gradual de desgaste é sinal para levar à concessionária.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Bolt EV/EUV (adaptado da GM — sem itens de motor a combustão)',
    body: '10.000 km/12 meses — Rodízio de pneus e inspeção geral de freios, suspensão e níveis de fluido. | 20.000 km/12 meses — Filtro de cabine. | 20.000 km — Inspeção das pastilhas de freio (tendem a durar bem mais que o normal por causa da regenerativa, mas podem enferrujar por baixo uso — "exercite" o freio de vez em quando). | 40.000 km/24 meses — Fluido de freio DOT 3/4 (troca por tempo, não só por km). | Conforme manual — Verificação do fluido de arrefecimento da bateria de alta tensão. | Sem item — Não há troca de óleo de motor, filtro de óleo, velas ou correia dentada: o motor elétrico não usa nenhum desses componentes.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Bolt EV',
    yearFrom: 2022,
    yearTo: null,
    tireSize: '215/50 R17',
    frontPsi: 35,
    rearPsi: 38,
    frontPsiLoad: 38,
    rearPsiLoad: 41,
    sparePsi: null,
    notes: 'Pneus de baixa resistência ao rolamento (otimizados para autonomia) — confirme sempre o valor exato na etiqueta da coluna da porta do motorista, já que o peso da bateria pede atenção redobrada à calibragem correta.',
  },
  {
    modelName: 'Bolt EUV',
    yearFrom: 2023,
    yearTo: null,
    tireSize: '215/50 R17',
    frontPsi: 35,
    rearPsi: 38,
    frontPsiLoad: 38,
    rearPsiLoad: 41,
    sparePsi: null,
    notes: 'Versão SUV compacta, um pouco mais pesada que o hatch Bolt EV — confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Bolt EV', yearFrom: 2022, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: 12, notes: 'Cruzado; inspecione desgaste irregular — bateria no assoalho eleva o peso do carro.', priority: 'MEDIUM', order: 0 },
  { modelName: 'Bolt EV', yearFrom: 2022, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Bolt EV', yearFrom: 2022, yearTo: null, component: 'Pastilhas e discos de freio — inspeção', intervalKm: 20000, intervalMonths: 12, notes: 'Duram muito mais por causa da regenerativa, mas podem enferrujar por baixo uso.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Bolt EV', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 3 },
  { modelName: 'Bolt EV', yearFrom: 2022, yearTo: null, component: 'Fluido de arrefecimento da bateria de alta tensão', intervalKm: null, intervalMonths: null, notes: 'Confirme intervalo exato no manual do proprietário — essencial para vida útil e velocidade de recarga da bateria.', priority: 'HIGH', order: 4 },
  { modelName: 'Bolt EV', yearFrom: 2022, yearTo: null, component: 'Software/atualizações do veículo', intervalKm: null, intervalMonths: 12, notes: 'Verifique atualizações disponíveis na concessionária a cada revisão anual.', priority: 'LOW', order: 5 },
  { modelName: 'Bolt EUV', yearFrom: 2023, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: 12, notes: 'Cruzado; inspecione desgaste irregular — bateria no assoalho eleva o peso do carro.', priority: 'MEDIUM', order: 0 },
  { modelName: 'Bolt EUV', yearFrom: 2023, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Bolt EUV', yearFrom: 2023, yearTo: null, component: 'Pastilhas e discos de freio — inspeção', intervalKm: 20000, intervalMonths: 12, notes: 'Duram muito mais por causa da regenerativa, mas podem enferrujar por baixo uso.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Bolt EUV', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 3 },
  { modelName: 'Bolt EUV', yearFrom: 2023, yearTo: null, component: 'Fluido de arrefecimento da bateria de alta tensão', intervalKm: null, intervalMonths: null, notes: 'Confirme intervalo exato no manual do proprietário — essencial para vida útil e velocidade de recarga da bateria.', priority: 'HIGH', order: 4 },
  { modelName: 'Bolt EUV', yearFrom: 2023, yearTo: null, component: 'Cabo de recarga portátil — verificação do recall', intervalKm: null, intervalMonths: null, notes: 'Confirme na concessionária se o recall de risco de choque elétrico (unidades 2022/2023) já foi aplicado ao seu chassi.', priority: 'HIGH', order: 5 },
  { modelName: 'Bolt EUV', yearFrom: 2023, yearTo: null, component: 'Software/atualizações do veículo', intervalKm: null, intervalMonths: 12, notes: 'Verifique atualizações disponíveis na concessionária a cada revisão anual.', priority: 'LOW', order: 6 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Bolt EV',
    yearFrom: 2022,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
  {
    modelName: 'Bolt EUV',
    yearFrom: 2023,
    yearTo: null,
    MACETES,
    PROBLEMAS: PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Bolt EV / Bolt EUV...')

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

  console.log('✅ Chevrolet Bolt EV / Bolt EUV concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
