/**
 * Seed Volvo XC 60 — macetes, problemas, manutenção e calibragem
 * SUV médio premium da Volvo, duas gerações bem distintas no Brasil:
 *  - Gen1 P3 (2008-2017): motor 5 cilindros 2.0T/2.4/2.4T/3.0T (T5/T6) a
 *    gasolina e D5 2.4 diesel (importado, mais raro no Brasil), câmbio
 *    automático PowerShift de dupla embreagem a seco em parte da linha.
 *    Plataforma compartilhada com S60/V60/S80 desta era.
 *  - Gen2 SPA (2018+): motor 2.0 turbo T5 gasolina (245-254cv, FWD ou AWD)
 *    e T8 Recharge plug-in hybrid (motor a combustão + elétrico, ~390-462cv
 *    combinados conforme versão, bateria 18,8 kWh, AWD). Inclui as versões
 *    "R-DESIGN" (visual esportivo, sem mudança mecânica) e "Polestar
 *    Engineered" (T8 com ~462cv, amortecedores Öhlins, freios Brembo).
 *    Suspensão a ar (Air Suspension) disponível como opcional apenas nos
 *    acabamentos de topo (Inscription/Polestar Engineered) — não é item de
 *    série em toda a linha. #77 no ranking de vendas 2025 no Brasil (3.515
 *    un., considerando a 2ª geração).
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-xc60
 *
 * Fontes: autopapo.com.br, reclameaqui.com.br, instacarro.com,
 *         autoentusiastas.com.br, motorshow.com.br, electriccarsreport.com,
 *         nhtsa.gov (recall 25V-179), volvocars.com, breakerlink.com,
 *         turbonoticias.com.br, analiseautomotiva.com, problemaserecalls.com,
 *         oficinabrasil.com.br, terrabrasilnoticias.com, bagriders.com,
 *         conexaoautomotivabr.com (recall bateria LG, jul/2026)
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'
type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

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
  priority: Priority
  order: number
}

// ─── Gen1 P3 (2008-2017) — 2.0T/2.4/2.4T/3.0T gasolina e D5 diesel ────────

const MACETES_GEN1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Plataforma P3 compartilhada com S60/V60/S80 da mesma época',
    body: 'Esta geração do XC 60 compartilha motor, câmbio e boa parte da suspensão com o S60/V60 (2ª geração) e o S80 contemporâneo. Em oficina independente, procure peça "para plataforma P3 Volvo" além de "para XC 60", amplia bastante a busca e costuma sair mais barato que peça específica de SUV.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio PowerShift: dirija suave em engarrafamento para poupar a embreagem dupla',
    body: 'Nas versões com câmbio automático PowerShift (dupla embreagem a seco), evite ficar "pisando e soltando" o acelerador repetidamente em trânsito parado — esse uso acelera o desgaste das embreagens. Prefira deixar o carro parado com o pé no freio em vez de ficar no ponto de fricção por longos períodos.',
  },
  {
    severity: 'OK',
    title: 'Proteja o turbo: marcha lenta antes de desligar após rodar em estrada',
    body: 'Nas versões turbo (T5/T6/D5), depois de rodar em velocidade alta, deixe o motor em marcha lenta por cerca de 30 segundos antes de desligar — dá tempo do óleo circular e resfriar o turbo, reduzindo desgaste do mancal.',
  },
]

const PROBLEMAS_GEN1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmbio PowerShift: trepidação nas trocas e mensagem de baixo desempenho',
    body: 'Veículos com câmbio PowerShift apresentam trepidação nas trocas de marcha (principalmente de 1ª para 2ª), mensagem de "Desempenho da Transmissão Baixo" no painel e patinagem em subidas — causados pelo desgaste da embreagem dupla, que solta resíduos e entope filtros e solenoides. Se notar esses sintomas, não adie o diagnóstico: quanto mais rodar entupindo o sistema, maior o custo do reparo.',
  },
  {
    severity: 'WARN',
    title: 'Trepidação, hesitação ou marcha lenta irregular no motor',
    body: 'Queixa recorrente de proprietários é trepidação, hesitação ou marcha lenta irregular no motor — o ano-modelo 2010 é frequentemente citado como o de custo de reparo mais alto para esse tipo de problema. Alguns exemplares também consomem óleo com mais frequência do que o esperado, mesmo em quilometragem relativamente baixa.',
  },
  {
    severity: 'WARN',
    title: 'Módulo da ventoinha do radiador em curto — descarrega a bateria com o carro desligado',
    body: 'Defeito eletrônico relativamente comum: o módulo de controle da ventoinha do radiador entra em curto e não desliga a ventoinha mesmo com o carro desligado, drenando a bateria de 12V ao longo da noite. Se a bateria estiver descarregando sem motivo aparente, verifique se a ventoinha continua girando com o carro desligado antes de trocar a bateria.',
  },
  {
    severity: 'WARN',
    title: 'Cheiro de óleo queimado na cabine — bomba de vácuo do freio',
    body: 'Cheiro forte de óleo queimado dentro do carro e manchas de óleo no chão da garagem podem vir da bomba de vácuo do freio, cujos anéis de vedação ressecam com o tempo e deixam o óleo vazar sobre o escapamento ou o alternador. Não é falha rara nesta geração — vale inspecionar antes de suspeitar de vazamento no motor.',
  },
  {
    severity: 'WARN',
    title: 'Coxim da barra de torque rasga cedo pelo torque dos motores turbo',
    body: 'O coxim superior da barra de torque tende a rasgar antes do esperado nas versões turbo — sintoma é trepidação e ruído de impacto ao acelerar/desacelerar bruscamente. Peça de troca relativamente barata; existem versões reforçadas em poliuretano no mercado paralelo.',
  },
  {
    severity: 'WARN',
    title: 'D5 diesel: filtro de partículas entope em viagens curtas',
    body: 'O filtro de partículas diesel dos motores D5/2.4 diesel entope regularmente entre 40.000 e 80.000 km, especialmente em quem roda muito trajeto curto na cidade (o filtro precisa de regeneração em rodagem contínua para se limpar sozinho). Isso leva a perda de potência e aumento de consumo — de vez em quando, vale fazer um trajeto mais longo em rotação mais alta para ajudar na regeneração.',
  },
  {
    severity: 'WARN',
    title: 'Sistema AWD: mensagem "AWD Service Required" sem aviso prévio',
    body: 'O sistema de tração integral (Haldex) apresenta falhas com frequência entre 60.000 e 100.000 km, especialmente nos motores D4/D5, com a mensagem de erro "AWD Service Required" no painel aparecendo sem sintoma prévio. Ao ver esse alerta, leve para diagnóstico — o óleo/filtro da unidade Haldex tem intervalo de troca próprio, diferente do câmbio, e costuma ser esquecido em revisões genéricas.',
  },
]

const MANUTENCAO_GEN1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XC 60 P3 (2008-2017) + ajuste uso severo BR',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor (gasolina ou diesel, especificação do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e coxim de torque do motor. | 20.000-30.000 km — Filtro de ar do motor e filtro de cabine. | 30.000 km — Velas de ignição (versões a gasolina). | 40.000 km — Óleo/filtro da unidade Haldex (tração integral) — item separado do câmbio, fácil de esquecer. | 40.000 km — Fluido de freio. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Fluido do câmbio (manual ou PowerShift) — não é vitalício em uso severo. | D5 diesel — regeneração periódica do filtro de partículas (trajeto longo de vez em quando ajuda) e troca conforme manual. | Sempre — deixe o motor em marcha lenta ~30s antes de desligar após estrada, protege o turbo.',
  },
]

// ─── Gen2 SPA (2018+) — T5 gasolina e T8 Recharge plug-in hybrid ──────────

const MACETES_GEN2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Duas famílias de motor: confirme qual equipa sua unidade',
    body: 'A XC 60 desta geração é vendida com motor 2.0 turbo T-5 a gasolina (tração FWD ou AWD) ou o T-8 Recharge plug-in hybrid (motor a combustão + elétrico, tração AWD, incluindo a versão "Polestar Engineered" de ~462cv combinados). São mecânicas bem diferentes — confirme sempre qual equipa sua unidade antes de orçar peça ou revisão, especialmente pela diferença de manutenção do sistema híbrido.',
  },
  {
    severity: 'OK',
    title: 'T-8 Recharge: aproveite o modo Pure para uso 100% elétrico',
    body: 'A bateria de 18,8 kWh permite rodar cerca de 80 km apenas no modo elétrico (Pure). Para uso urbano no dia a dia, priorize recarregar sempre que possível e use o modo Pure — o modo "Charge" (que usa o motor a combustão para recarregar a bateria em movimento) reduz bastante o consumo para cerca de 8 km/l, então não é a forma mais eficiente de rodar no dia a dia.',
  },
  {
    severity: 'OK',
    title: 'Recarga: 220V residencial funciona, mas wallbox é bem mais rápido',
    body: 'A recarga em tomada 220V comum leva cerca de 8 horas para completar; com carregador AC trifásico/bifásico dedicado (wallbox), esse tempo cai para cerca de 3 horas. Se pretende recarregar diariamente, vale considerar a instalação de um wallbox para reduzir o tempo de espera.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão a ar (Inscription/Polestar Engineered): não é item de série em toda a linha',
    body: 'A suspensão a ar (Air Suspension) do XC 60 desta geração só é oferecida como opcional nos acabamentos de topo (Inscription) — as versões Momentum e R-DESIGN normalmente não têm essa opção, e a Polestar Engineered usa amortecedores esportivos Öhlins (não suspensão a ar). Confirme o que equipa exatamente sua unidade antes de orçar peça de suspensão — o reparo da suspensão a ar é bem mais caro que o da suspensão convencional.',
  },
  {
    severity: 'OK',
    title: 'R-DESIGN é só visual/esportivo — mecânica igual às demais versões T5/T6/T8',
    body: 'A versão R-DESIGN traz mudanças estéticas e de acabamento (bancos esportivos, detalhes escurecidos, suspensão levemente mais firme), mas usa a mesma mecânica das versões equivalentes Momentum/Inscription com o mesmo motor. Não confunda com a "Polestar Engineered", que sim tem preparação mecânica real (motor mais potente, freios Brembo, amortecedores Öhlins).',
  },
]

const PROBLEMAS_GEN2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall global: bateria de alta tensão (fabricada pela LG) com risco de incêndio',
    body: 'A Volvo convocou recall global (cerca de 73.000 unidades, incluindo XC 60 T-8 fabricados entre junho de 2019 e novembro de 2021) por risco de curto-circuito interno e "thermal runaway" (reação térmica descontrolada) na bateria de alta tensão fornecida pela LG — houve caso registrado de veículo pegando fogo espontaneamente enquanto carregava na garagem do proprietário. A orientação da Volvo para unidades afetadas é interromper a recarga até a inspeção. Verifique se o chassi da sua XC 60 T-8 está na faixa afetada (2019-2022) e agende a inspeção/substituição do módulo de bateria na concessionária Volvo imediatamente — o reparo é gratuito.',
  },
  {
    severity: 'WARN',
    title: 'Defeito de bateria relatado mesmo em unidades zero km',
    body: 'Há relato de defeito na bateria híbrida em unidade zero km, reforçando a importância de testar detalhadamente o sistema de recarga e o comportamento da bateria já nos primeiros dias após a retirada do carro na concessionária — qualquer anomalia deve ser reportada e documentada de imediato enquanto o veículo está na garantia total.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão a ar: foles e compressor falham a partir de 100.000 km (versões equipadas)',
    body: 'Nas unidades com suspensão a ar opcional (Inscription), foles furados ou compressor com defeito costumam dar os primeiros sinais já a partir de 100.000 km, com falhas mais críticas entre 100.000 e 150.000 km — sintoma é altura de carro irregular (um lado mais baixo) e perda de conforto. É reparo caro fora da garantia; ao comprar usado com esse equipamento, vale testar o funcionamento antes de fechar negócio.',
  },
]

const MANUTENCAO_GEN2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XC 60 SPA (2018+) + ajuste uso severo BR',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor 2.0 turbo (T-5 ou T-8, especificação exata do manual) + filtro de óleo — siga o intervalo indicado pelo sistema de manutenção do carro (Volvo usa monitoramento adaptativo, pode variar). | Inspeção anual — Freios, suspensão (atenção redobrada à suspensão a ar nas versões Inscription equipadas) e níveis de fluido. | 20.000-30.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 100.000 km — Inspeção da suspensão a ar (foles/compressor) nas versões equipadas. | T-8 Recharge — Inspeção anual do sistema de alta tensão (bateria/cabos/porta de recarga), com atenção redobrada ao recall de bateria em unidades 2019-2022. | Verificar recall de bateria pendente na primeira visita à concessionária, independentemente de sintomas.',
  },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'XC 60', yearFrom: 2008, yearTo: 2017, MACETES: MACETES_GEN1, PROBLEMAS: PROBLEMAS_GEN1, MANUTENCAO: MANUTENCAO_GEN1 },
  { modelName: 'XC 60', yearFrom: 2018, yearTo: null, MACETES: MACETES_GEN2, PROBLEMAS: PROBLEMAS_GEN2, MANUTENCAO: MANUTENCAO_GEN2 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'XC 60',
    yearFrom: 2008,
    yearTo: 2017,
    tireSize: '235/60 R17 · 235/55 R18 · 255/45 R20 (R-Design) — confirme aro conforme versão',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'A etiqueta oficial fica na coluna da porta do motorista. Confirme sempre o valor exato do seu aro/versão — reforce a traseira com o porta-malas carregado.',
  },
  {
    modelName: 'XC 60',
    yearFrom: 2018,
    yearTo: null,
    tireSize: '235/60 R18 · 255/45 R20 (versões superiores) — confirme aro conforme versão',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 36,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'A etiqueta oficial fica na coluna da porta do motorista (entre a porta dianteira e traseira). Confirme sempre o valor exato do seu aro/versão — varia bastante entre T-5 e T-8 pelo peso adicional da bateria.',
  },
]

function mi(modelName: string, yearFrom: number | null, yearTo: number | null, items: Omit<MaintenanceItemInput, 'modelName' | 'yearFrom' | 'yearTo'>[]): MaintenanceItemInput[] {
  return items.map((item) => ({ modelName, yearFrom, yearTo, ...item }))
}

const GEN1_ITEMS: Omit<MaintenanceItemInput, 'modelName' | 'yearFrom' | 'yearTo'>[] = [
  { component: 'Óleo do motor', intervalKm: 15000, intervalMonths: 12, notes: 'Confirme especificação conforme motor (gasolina ou D5 diesel).', priority: 'CRITICAL', order: 0 },
  { component: 'Filtro de óleo', intervalKm: 15000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { component: 'Óleo/filtro da unidade Haldex (AWD)', intervalKm: 40000, intervalMonths: 24, notes: 'Item separado do câmbio, comumente esquecido. Causa comum da mensagem "AWD Service Required".', priority: 'HIGH', order: 2 },
  { component: 'Fluido do câmbio (manual ou PowerShift)', intervalKm: 70000, intervalMonths: 48, notes: 'Não é vitalício. PowerShift: evite ficar no ponto de fricção em trânsito parado.', priority: 'HIGH', order: 3 },
  { component: 'Coxim da barra de torque — inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Rasga cedo pelo torque dos motores turbo. Trepidação ao acelerar/desacelerar é sinal de alerta.', priority: 'MEDIUM', order: 4 },
  { component: 'Filtro de partículas diesel (D5) — regeneração/inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Entope em trajetos curtos repetidos. Rodagem longa periódica ajuda na autolimpeza.', priority: 'MEDIUM', order: 5 },
  { component: 'Filtro de ar do motor', intervalKm: 30000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 6 },
  { component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 7 },
  { component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'HIGH', order: 9 },
  { component: 'Bomba de vácuo do freio — inspeção de vazamento', intervalKm: 60000, intervalMonths: null, notes: 'Anéis de vedação ressecam. Cheiro de óleo queimado na cabine é sinal de alerta.', priority: 'MEDIUM', order: 10 },
]

const GEN2_ITEMS: Omit<MaintenanceItemInput, 'modelName' | 'yearFrom' | 'yearTo'>[] = [
  { component: 'Óleo do motor', intervalKm: 15000, intervalMonths: 12, notes: 'Confirme especificação conforme motor (T-5 ou T-8) e siga o sistema de manutenção adaptativo do carro.', priority: 'CRITICAL', order: 0 },
  { component: 'Filtro de óleo', intervalKm: 15000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { component: 'Recall de bateria de alta tensão (versão T-8, unidades 2019-2022)', intervalKm: null, intervalMonths: null, notes: 'Risco de incêndio — verificar na concessionária imediatamente, mesmo sem sintomas.', priority: 'CRITICAL', order: 2 },
  { component: 'Suspensão a ar (foles/compressor) — versões Inscription equipadas', intervalKm: 100000, intervalMonths: null, notes: 'Ponto de falha conhecido. Altura irregular do carro é o primeiro sinal.', priority: 'HIGH', order: 3 },
  { component: 'Filtro de ar do motor', intervalKm: 30000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 4 },
  { component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 5 },
  { component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Volvo.', priority: 'HIGH', order: 7 },
  { component: 'Sistema de alta tensão (bateria/cabos/porta de recarga) — versão T-8', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual, com atenção redobrada ao recall pendente em unidades 2019-2022.', priority: 'CRITICAL', order: 8 },
  { component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 9 },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...mi('XC 60', 2008, 2017, GEN1_ITEMS),
  ...mi('XC 60', 2018, null, GEN2_ITEMS),
]

async function main() {
  console.log('🚗 Seed Volvo XC 60...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volvo', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volvo', vehicleTypeId: carroType.id },
  })

  const distinctModelNames = [...new Set(BLOCKS.map((b) => b.modelName))]
  for (const modelName of distinctModelNames) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: modelName, brandId: brand.id } },
      update: {},
      create: { name: modelName, brandId: brand.id },
    })
    await prisma.tip.deleteMany({ where: { modelName } })
  }

  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: order++,
      })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }

  const distinctTpModelNames = [...new Set(TIRE_PRESSURES.map((t) => t.modelName))]
  for (const modelName of distinctTpModelNames) {
    await prisma.tirePressure.deleteMany({ where: { modelName } })
  }
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? '...'})`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: distinctModelNames } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volvo XC 60 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
