/**
 * Seed Toyota Etios — macetes, problemas, manutenção e calibragem
 * Compacto fabricado em Sorocaba (SP) para o Brasil de 2012 a 2021 (produção
 * seguiu até 2023, só para exportação). Hatch e sedã, motores 1.3 e 1.5
 * Dual VVT-i flex (ambos com CORRENTE de comando, não correia dentada),
 * manual 5 marchas ou automático convencional de 4 marchas (não CVT) —
 * o mesmo câmbio AT4 herdado do Corolla de duas gerações atrás. Trims:
 * X, XS, XLS, Platinum, X Plus, Ready! (edição especial 2020) e a
 * variante visual elevada Cross (bloco próprio abaixo, herda todo o
 * conteúdo genérico "Etios" + notas específicas).
 * Execute: pnpm --filter @motormacete/database db:seed:toyota-etios
 *
 * Fontes: mobiauto.com.br, autoo.com.br, suaoficinaonline.com.br,
 *         opinautos.com.br, mercadoveiculos.com, autopapo.com.br,
 *         etiosclube.forumeiros.com, procon.sp.gov.br, mpmg.mp.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- ETIOS (hatch + sedã, todos os trims X/XS/XLS/Platinum/X Plus/Ready!) ----------

const MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor com corrente de comando — não existe "prazo" de correia dentada para se preocupar',
    body: 'Tanto o 1.3 quanto o 1.5 Dual VVT-i do Etios usam corrente de comando, não correia dentada. A Toyota não define km de troca porque a corrente é projetada para durar a vida útil do motor — só é mexida em caso de retífica ou se surgir ruído de corrente "batendo"/"grilando" (sinal de tensionador ou guia desgastado, principalmente acima de 150-180 mil km). Ao comprar um Etios usado, não pague a mais achando que "vai vencer a correia" — mas ligue o motor frio e escute por 10-15 segundos: ruído metálico agudo que some depois de aquecer é sinal de alerta.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático é o AT4 convencional de 4 marchas — não é CVT',
    body: 'O Etios automático usa o mesmo câmbio automático de conversor de torque com 4 marchas que equipava o Corolla de duas gerações atrás — não é uma transmissão CVT (correia variável). Isso é uma vantagem para quem já foi mal com CVT de concorrentes: mecânica mais simples, mais robusta e historicamente mais barata de manter/reparar. Em compensação, o consumo e a suavidade de troca são inferiores a um CVT moderno — é a troca que a Toyota fez para entregar confiabilidade.',
  },
  {
    severity: 'OK',
    title: 'Confirme sempre o motor (1.3 ou 1.5) e o trim antes de comprar peça',
    body: 'O Etios foi vendido com motor 1.3 (16v, versões de entrada X/XS) e 1.5 (16v, versões XLS/Platinum/X Plus/Cross/automático). Peças de motor, filtro e correia de acessórios não são intercambiáveis entre os dois — sempre confirme o código do motor (gravado no bloco) ou a cilindrada na ficha técnica/manual antes de fechar compra de peça.',
  },
  {
    severity: 'OK',
    title: 'Freio traseiro a tambor nas versões de entrada — barato de manter, mas exige regulagem',
    body: 'Nas versões X e XS, o freio traseiro é a tambor (não a disco). É mais barato de manter no longo prazo, mas ao contrário do disco precisa de regulagem periódica da folga das lonas — se notar pedal de freio "mais fundo" ou frenagem desigual, peça para o mecânico regular o tambor antes de pensar em problema mais sério.',
  },
  {
    severity: 'OK',
    title: 'Peças de suspensão têm bastante opção de mercado paralelo (Nakata, Monroe, V8, Garro)',
    body: 'Amortecedor, bandeja, pivô e bieletas do Etios têm ampla oferta de marcas de reposição consolidadas (Nakata, Monroe, kits V8, bieletas Garro), custando bem menos que a peça original Toyota — vale pesquisar em autopeças especializadas antes de orçar só na concessionária. Um alerta de mecânico: ao trocar o kit do amortecedor, não economize no coxim — coxim de baixa qualidade pode quebrar e deixar o amortecedor tocando no capô.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall: inflador do airbag do passageiro (Takata) — unidades ago/2012 a dez/2014',
    body: 'A Toyota convocou recall para 138.346 unidades de Etios fabricadas entre agosto de 2012 e dezembro de 2014 por risco no inflador do airbag do passageiro (fornecedor Takata): com o tempo, exposição a calor e alta umidade, o inflador pode se degradar e, em caso de acionamento, romper de forma inadequada, arremessando fragmentos metálicos junto com a bolsa do airbag. A campanha teve duas etapas: desativação temporária do airbag do passageiro com adesivo de alerta no painel, e depois substituição definitiva do inflador com reativação do airbag. Se você tem um Etios desse período, ligue para a Toyota (0800 703 7104) ou confira o chassi em toyota.com.br/recall — mesmo que o adesivo de alerta já não esteja mais no painel, vale confirmar se a troca definitiva foi feita.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio manual: embreagem com desgaste prematuro é queixa recorrente',
    body: 'Proprietários relatam desgaste prematuro do conjunto de embreagem nas versões manuais — sintomas típicos são pedal duro, trepidação e ranger ao trocar de marcha. Se notar esses sinais, não force a troca "empurrando" a marcha — vá direto para inspeção do kit de embreagem (disco, platô, rolamento) antes que o desgaste avance para o volante do motor.',
  },
  {
    severity: 'WARN',
    title: 'Ruído de suspensão por "curso curto" dos amortecedores',
    body: 'Um dos problemas mais citados por donos: os amortecedores do Etios têm curso relativamente curto e "batem" no fim de curso ao passar por buraco ou lombada mais seca, gerando ruído seco na dianteira. Não é necessariamente amortecedor gasto — inspecione também os batentes de suspensão e coxins, que amortecem esse fim de curso e são baratos de trocar comparado ao amortecedor completo.',
  },
  {
    severity: 'WARN',
    title: 'Infiltração de água e poeira no assoalho do lado do passageiro',
    body: 'Queixa recorrente em plataformas de defesa do consumidor: o assoalho do lado do passageiro fica encharcado em dias de chuva, causando mau cheiro e até mofo no carpete. A causa costuma estar na vedação de porta, para-brisa ou dreno de ar-condicionado entupido — antes de trocar carpete, teste com mangueira (carro parado, portas fechadas) para achar o ponto exato de entrada d\'água.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de pintura, principalmente no branco perolizado',
    body: 'Descascamento e falha na vedação da pintura são queixas frequentes, mais citadas na cor branco perolizado. Vários proprietários relatam que a garantia foi recusada pela concessionária ao levar o carro para reparo — documente bem (fotos com data) assim que notar o problema, ainda dentro do prazo de garantia, para ter argumento em uma eventual reclamação formal.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Etios (1.3/1.5, manual ou automático AT4)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios (atenção à regulagem do tambor traseiro nas versões X/XS) e da suspensão dianteira (ruído de fim de curso é queixa comum). | 20.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km/24 meses — Fluido de freio DOT 3/4. | 60.000 km — Fluido do câmbio automático AT4 (versões automáticas) — apesar de robusto, não é "vitalício". | 100.000 km — Inspecionar/trocar correia de acessórios (alternador). | Corrente de comando — sem km definido pela Toyota (dura a vida útil do motor); só mexer se surgir ruído metálico a frio. | Verificar na concessionária se o recall do inflador do airbag (unidades ago/2012-dez/2014) já foi concluído.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Etios', yearFrom: 2012, yearTo: 2021, tireSize: '175/65 R14 (X/XS, aro 14)', frontPsi: 32, rearPsi: 29, frontPsiLoad: 35, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme sempre na etiqueta da coluna da porta do motorista — valor de referência para uso com 1-2 ocupantes.' },
  { modelName: 'Etios', yearFrom: 2012, yearTo: 2021, tireSize: '185/60 R15 (XLS/Platinum/X Plus, aro 15)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 33, sparePsi: 60, notes: 'Aro 15 nas versões de topo — confirme na etiqueta da porta, pode variar por ano/versão.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Etios', yearFrom: 2012, yearTo: 2021, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor 1.3 ou 1.5.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Etios', yearFrom: 2012, yearTo: 2021, component: 'Verificação do recall do inflador do airbag (Takata, unidades ago/2012-dez/2014)', intervalKm: null, intervalMonths: null, notes: 'Risco de ruptura com fragmentos metálicos — confira o chassi em toyota.com.br/recall.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Etios', yearFrom: 2012, yearTo: 2021, component: 'Inspeção de freios (regulagem do tambor traseiro nas versões X/XS)', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Etios', yearFrom: 2012, yearTo: 2021, component: 'Inspeção da suspensão dianteira (batentes/coxins — ruído de fim de curso)', intervalKm: 20000, intervalMonths: null, notes: 'Queixa recorrente de proprietários — barato de resolver se pego cedo.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Etios', yearFrom: 2012, yearTo: 2021, component: 'Kit de embreagem (versões manuais)', intervalKm: null, intervalMonths: null, notes: 'Desgaste prematuro relatado — atenção a pedal duro, trepidação e ranger ao trocar marcha.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Etios', yearFrom: 2012, yearTo: 2021, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'Etios', yearFrom: 2012, yearTo: 2021, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Etios', yearFrom: 2012, yearTo: 2021, component: 'Fluido do câmbio automático AT4 (versões automáticas)', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'Etios', yearFrom: 2012, yearTo: 2021, component: 'Correia de acessórios (alternador)', intervalKm: 100000, intervalMonths: null, notes: 'Inspecionar visualmente antes; trocar preventivamente perto dessa marca.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Etios', yearFrom: 2012, yearTo: 2021, component: 'Vedação de portas/para-brisa e dreno do ar-condicionado', intervalKm: null, intervalMonths: 12, notes: 'Checar se assoalho do passageiro está seco — infiltração é queixa recorrente.', priority: 'LOW', order: 9 },
]

// ---------- ETIOS CROSS (visual crossover, suspensão levemente elevada, só 1.5) ----------

const MACETES_CROSS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cross é visual + suspensão levemente elevada — continua tração dianteira (FWD)',
    body: 'O Etios Cross traz suspensão um pouco mais alta, molduras plásticas nos para-lamas/soleiras e para-choques diferentes, sempre com o motor 1.5. Mas segue sendo tração dianteira (FWD) como o resto da linha — não é um SUV nem tem tração 4x4, então não force terreno realmente pesado achando que é um "off-road".',
  },
  {
    severity: 'OK',
    title: 'Mecânica é 100% compartilhada com o Etios hatch 1.5 — vale toda a base de conteúdo do Etios',
    body: 'Motor, câmbio (manual ou AT4), corrente de comando e freios do Cross são os mesmos do Etios hatch 1.5. Todo recall, boletim técnico e dica de manutenção válidos para o Etios 1.5 se aplicam ao Cross — busque também por "Etios" (sem o Cross) para não perder nenhuma informação.',
  },
]

const PROBLEMAS_CROSS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Molduras/plásticos da carroceria: fique de olho em fixação e desbotamento',
    body: 'As molduras plásticas pretas nos para-lamas e soleiras (marca registrada visual do Cross) podem soltar grampos de fixação com o tempo e desbotar/esbranquiçar com exposição solar prolongada. Não afeta a mecânica, mas vale inspecionar a fixação em revisões — clipes soltos podem gerar ruído de vento ou chocalho em estrada.',
  },
]

const MANUTENCAO_CROSS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Etios Cross (1.5) — segue o mesmo do Etios 1.5',
    body: 'Use o cronograma completo do Etios 1.5 (óleo a cada 10.000 km, freios e suspensão a cada 10.000 km, filtros a cada 20.000 km, fluido de freio a cada 40.000 km/24 meses, fluido do câmbio automático a cada 60.000 km nas versões AT4). Adicione apenas: inspeção da fixação das molduras plásticas de para-lama/soleira em revisões, sem intervalo fixo — basta olhar se algum clipe está solto.',
  },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Etios', yearFrom: 2012, yearTo: 2021, MACETES, PROBLEMAS, MANUTENCAO },
  { modelName: 'Etios Cross', yearFrom: 2015, yearTo: 2021, MACETES: MACETES_CROSS, PROBLEMAS: PROBLEMAS_CROSS, MANUTENCAO: MANUTENCAO_CROSS },
]

async function main() {
  console.log('🚗 Seed Toyota Etios...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Toyota', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Toyota', vehicleTypeId: carroType.id },
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
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: idx,
      })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: { in: BLOCKS.map((b) => b.modelName) } } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.tireSize})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map((b) => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Toyota Etios concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
