/**
 * Seed Chevrolet Malibu — macetes, problemas, manutenção e calibragem
 * Sedã médio importado, vendido no Brasil em baixíssimo volume por volta de
 * 2012-2015 (versão MALIBU LTZ 2.4 16V 171cv 4p, câmbio automático 6
 * marchas). Produzido pela GM fora do Brasil (Coreia do Sul/Colômbia via
 * GM Colmotores) para exportação à América Latina. Motor 2.4 Ecotec
 * (mesma família usada em Cruze, Captiva e Equinox de gerações globais).
 * Descontinuado no Brasil há mais de 10 anos — hoje é um modelo raro nas
 * ruas, sem geração seguinte vendida aqui.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-malibu
 *
 * Fontes: carrosnaweb.com.br, motoragora.com.br, opinautos.com,
 *         terrainforum.net, chevymalibuforum.com, motorreviewer.com,
 *         parts.com.br (fornecedor especializado em peças de importados)
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
    severity: 'WARN',
    title: 'Modelo descontinuado há mais de 10 anos: planeje-se antes de comprar peça em cima da hora',
    body: 'O Malibu vendido no Brasil (2012-2015) foi um modelo de baixíssimo volume, sem geração seguinte comercializada aqui. Isso significa que peças de reposição — principalmente elétricas, de acabamento e específicas da versão LTZ — não estão em autopeças de bairro. Antes de qualquer viagem longa ou revisão importante, cheque com antecedência se a peça necessária está disponível, em vez de descobrir a falta dela com o carro parado.',
  },
  {
    severity: 'OK',
    title: 'Onde procurar peça: importadoras especializadas e desmanches de veículos importados',
    body: 'Para peças de motor, suspensão e elétrica do Malibu, procure fornecedores especializados em peças para carros importados (não concessionária comum) — existem empresas em São Paulo e outras capitais que mantêm estoque de peças de motor (bielas, pistões, retentores, válvulas) para o 2.4 Ecotec do Malibu. Desmanches especializados em importados e comunidades/grupos de proprietários (fóruns, Facebook) também são boas fontes para peças usadas com procedência e para indicação de oficinas que já mexeram no modelo.',
  },
  {
    severity: 'OK',
    title: 'Motor 2.4 Ecotec é compartilhado com outros modelos GM globais — amplie a busca por peça',
    body: 'O motor 2.4 16V Ecotec do Malibu é da mesma família usada em outras plataformas globais da GM (como Cruze, Captiva e gerações do Equinox vendidas fora do Brasil). Ao procurar peça de motor, vale pesquisar também por "motor Ecotec 2.4 GM" além de "Malibu" — isso amplia as opções em fornecedores de peças importadas e catálogos internacionais, mesmo que o modelo final do carro nunca tenha sido vendido aqui.',
  },
  {
    severity: 'WARN',
    title: 'Nunca atrase a troca de óleo: o motor 2.4 Ecotec é sensível a corrente de comando esticada',
    body: 'O motor 2.4 Ecotec tem histórico documentado de esticar a corrente de comando (timing chain) quando o óleo passa do prazo ou perde viscosidade — o primeiro sinal costuma ser um chocalho/ruído metálico vindo da frente do motor na partida a frio, que passa em poucos segundos. Use sempre óleo sintético de boa qualidade na especificação do manual e não ultrapasse o intervalo de troca — no caso desse motor específico, muitos proprietários preferem antecipar a troca em vez de esticar o prazo máximo, justamente pelo histórico de desgaste prematuro da corrente.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Corrente de comando esticada: ruído metálico na partida a frio não deve ser ignorado',
    body: 'O motor 2.4 Ecotec tem problema conhecido internacionalmente de desgaste do tensionador e alongamento da corrente de comando. Se aparecer um ruído tipo "chocalho" vindo da lateral do passageiro/frente do motor ao dar a partida com o motor frio (some após alguns segundos), não ignore: leve para diagnóstico o quanto antes. Se a corrente pular dente, o dano pode evoluir para válvulas dobradas e comando de válvulas — reparo caro e, em casos avançados, motor inteiro comprometido.',
  },
  {
    severity: 'WARN',
    title: 'Consumo elevado de óleo em alta quilometragem',
    body: 'Unidades do 2.4 Ecotec com quilometragem elevada apresentam relatos de consumo de óleo acima do normal entre trocas. Verifique o nível de óleo manualmente a cada abastecimento (não confie apenas na luz do painel) e tenha sempre um litro reserva no porta-malas se seu carro já tiver muitos quilômetros rodados — óleo baixo agrava ainda mais o risco de desgaste da corrente de comando.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste prematuro de suspensão: molas, amortecedores e buchas',
    body: 'Há relatos de desgaste mais rápido que o esperado em componentes de suspensão — molas, amortecedores e buchas — em unidades da faixa 2011-2014, resultando em rodagem menos confortável, ruídos e vibração. Se notar barulho em lombadas/buracos ou perda de estabilidade em curvas, inspecione a suspensão completa; muitas vezes a solução envolve troca de várias buchas de uma vez, já que o desgaste tende a ser generalizado.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico: fique atento a falhas de bateria e carga',
    body: 'Relatos internacionais (principalmente em unidades mais antigas da plataforma) apontam problemas no sistema de carga/elétrico que podem se manifestar como dificuldade de partida ou bateria descarregando sem explicação aparente. Se notar isso, teste primeiro o alternador e a bateria antes de investigar módulos mais caros — no Malibu, como em qualquer importado raro, vale sempre descartar primeiro as causas mais simples e baratas.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Malibu 2.4 LTZ (ajustado para o histórico do motor Ecotec + uso severo BR)',
    body: '7.500 km/6 meses — Troca de óleo do motor (sintético, especificação do manual) + filtro de óleo — não estique este prazo por causa do histórico de corrente de comando. | 10.000 km — Inspeção de freios, suspensão (atenção a buchas/amortecedores) e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Corrente de comando e tensionador — inspeção obrigatória, mesmo sem ruído aparente, dado o histórico do motor. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Fluido do câmbio automático de 6 marchas. | A cada revisão — Verificar nível de óleo manualmente e checar ruído metálico na partida a frio.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Malibu',
    yearFrom: 2012,
    yearTo: 2015,
    tireSize: '225/50 R18 (versão LTZ)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Modelo raro no Brasil — confirme sempre o valor exato na etiqueta da coluna da porta do motorista ou no manual, já que unidades importadas podem ter pequenas variações conforme o mercado de origem (Coreia do Sul/Colômbia).',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Malibu', yearFrom: 2012, yearTo: 2015, component: 'Óleo do motor 2.4 Ecotec', intervalKm: 7500, intervalMonths: 6, notes: 'Não atrase — óleo velho agrava o risco de desgaste da corrente de comando, problema conhecido deste motor.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Malibu', yearFrom: 2012, yearTo: 2015, component: 'Filtro de óleo', intervalKm: 7500, intervalMonths: 6, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Malibu', yearFrom: 2012, yearTo: 2015, component: 'Corrente de comando e tensionador — inspeção', intervalKm: 60000, intervalMonths: null, notes: 'Verificar mesmo sem ruído aparente. Ruído metálico na partida a frio é sinal de alerta.', priority: 'HIGH', order: 2 },
  { modelName: 'Malibu', yearFrom: 2012, yearTo: 2015, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Malibu', yearFrom: 2012, yearTo: 2015, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Malibu', yearFrom: 2012, yearTo: 2015, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Confirme especificação exata — peça de reposição pode exigir fornecedor especializado em importados.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Malibu', yearFrom: 2012, yearTo: 2015, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Malibu', yearFrom: 2012, yearTo: 2015, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela GM para o motor Ecotec.', priority: 'HIGH', order: 7 },
  { modelName: 'Malibu', yearFrom: 2012, yearTo: 2015, component: 'Fluido do câmbio automático 6 marchas', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício em uso severo — antecipe se notar trancos.', priority: 'HIGH', order: 8 },
  { modelName: 'Malibu', yearFrom: 2012, yearTo: 2015, component: 'Suspensão (amortecedores e buchas) — inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Desgaste prematuro é queixa conhecida nesta geração — inspecione com atenção redobrada.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Malibu', yearFrom: 2012, yearTo: 2015, component: 'Bateria e sistema de carga — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Teste tensão da bateria e alternador anualmente — falhas elétricas são queixa relatada nesta plataforma.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Malibu',
    yearFrom: 2012,
    yearTo: 2015,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Malibu...')

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

  console.log('✅ Chevrolet Malibu concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
