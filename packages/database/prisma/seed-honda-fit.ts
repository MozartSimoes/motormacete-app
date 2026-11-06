/**
 * Seed Honda Fit — macetes, problemas, manutenção e calibragem
 * Três gerações vendidas no Brasil: GD (2003-2008, CVT), GE/"New Fit"
 * (2009-2014, câmbio automático CONVENCIONAL de 5 marchas — a Honda
 * trocou o CVT nessa geração porque ele não trabalhava bem com o motor
 * Flex introduzido em 2007) e GK5 (2015-2021, CVT de volta, com
 * simulação de 7 marchas). Migrado do seed.ts histórico (conteúdo
 * original preservado e corrigido) + MaintenanceItem que faltava +
 * pesquisa de recalls e problemas reais por geração.
 * Execute: pnpm --filter @motormacete/database db:seed:honda-fit
 *
 * Fontes: mobiauto.com.br, autoo.com.br, garagem360.com.br,
 *         reclameaqui.com.br, canaldapeca.com.br, autopapo.com.br,
 *         autodata.com.br, opinautos.com.br, revistacarro.com.br,
 *         carroclub.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- GERAÇÃO GD (2003-2008) — CVT, 1.4/1.5 VTEC ----------

const MACETES_GD: TipInput[] = [
  { severity: 'OK', title: 'VTEC ativa acima de 2.500 rpm — é normal', body: 'Ao acelerar além de 2.500 rpm, o Fit muda visivelmente de personalidade (sistema i-VTEC). O carro "acorda" — isso é o sistema de variação de fase funcionando, não é defeito.' },
  { severity: 'OK', title: 'Magic Seat: lubrifique as dobradiças', body: 'O sistema Magic Seat do Fit tem dobradiças que podem ranger após 2–3 anos. Aplique graxa branca nos pivôs a cada 20.000 km.' },
  { severity: 'OK', title: 'Essa geração já nasceu com CVT — item robusto se o fluido for respeitado', body: 'Diferente da geração seguinte (2009-2014, que usou automático convencional), o Fit GD (2003-2008) já veio de fábrica com câmbio CVT. É um câmbio historicamente confiável quando o fluido é trocado no prazo — o problema não é o CVT em si, é fluido negligenciado.' },
]

const PROBLEMAS_GD: TipInput[] = [
  { severity: 'DANGER', title: 'Recall: inflador do airbag Takata — unidades 2004-2008', body: 'A Honda convocou recall nacional para veículos equipados com airbags Takata fabricados entre 2004 e 2014 (Fit e City), totalizando cerca de 943.000 unidades no Brasil e mais de 1,6 milhão de airbags a substituir. O inflador pode se degradar com calor e umidade ao longo dos anos e, em caso de acionamento, arremessar fragmentos metálicos a mais de 300 km/h contra os ocupantes — já houve casos registrados no Brasil. Confira o chassi em honda.com.br/recall ou ligue para a Honda (0800 701 8358). Em janeiro de 2026 a Honda ainda buscava concluir os últimos reparos pendentes (94,4% concluído) — não assuma que "já deve ter sido feito", confirme.' },
  { severity: 'WARN', title: 'CVT: fluido degradado em alta quilometragem causa trancos', body: 'Em quilometragem mais alta, o fluido do CVT perde as propriedades de lubrificação — há relatos inclusive de rompimento da correia de tração interna do câmbio quando o fluido é negligenciado por muito tempo. Nunca ultrapasse o intervalo de troca do fluido CVT original Honda.' },
  { severity: 'WARN', title: 'Ferrugem no capô — queixa relatada em unidades de diferentes donos', body: 'Há relatos recorrentes de ferrugem prematura no capô em Fits dessa faixa de ano, mesmo em unidades bem cuidadas. Vale inspecionar a pintura do capô (bolhas, descascamento nas bordas) antes de comprar um usado dessa geração.' },
]

const MANUTENCAO_GD: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Fit GD (2003-2008, CVT)', body: '7.500 km — Troca de óleo do motor (5W20 ou 5W30) + filtro. | 20.000 km — Lubrificar dobradiças do Magic Seat com graxa branca. | 40.000 km — Fluido do CVT: use SOMENTE fluido original Honda CVT (nunca genérico) — item crítico para esse câmbio. | Anual — Inspeção do sistema de arrefecimento (radiador, válvula termostática, bomba d\'água) — superaquecimento não tratado cedo pode queimar a junta do cabeçote. | Verificar na concessionária se o recall do airbag Takata já foi concluído nesta unidade.' },
]

// ---------- GERAÇÃO GE / "NEW FIT" (2009-2014) — automático CONVENCIONAL 5 marchas ----------

const MACETES_GE: TipInput[] = [
  { severity: 'OK', title: 'Atenção: essa geração NÃO tem CVT — é automático convencional de 5 marchas', body: 'A partir de 2008/2009 a Honda substituiu o CVT por um câmbio automático com conversor de torque e 5 marchas, alegando que o CVT não trabalhava bem com o motor Flex introduzido em 2007. Se você está pesquisando "problema de CVT no Fit" para um carro dessa geração (2009-2014), está no lugar errado — o câmbio é outro, com peças, fluido e sintomas de desgaste diferentes do CVT das gerações 2003-2008 e 2015-2021.' },
  { severity: 'OK', title: 'VTEC ativa acima de 2.500 rpm — é normal', body: 'Mesmo comportamento das outras gerações: ao acelerar além de 2.500 rpm o motor i-VTEC muda de personalidade — é o sistema de variação de fase entrando em ação, não é defeito.' },
  { severity: 'OK', title: 'Fit Twist (2013+): versão aventureira com suspensão mais alta', body: 'A partir de 2013 a Honda lançou o Fit Twist, desenvolvido especificamente para o mercado brasileiro com suspensão mais alta e visual aventureiro. Mecânica de motor e câmbio é a mesma do Fit convencional da mesma geração — só suspensão e itens visuais mudam.' },
  { severity: 'OK', title: 'Magic Seat: lubrifique as dobradiças', body: 'Dobradiças do Magic Seat podem ranger após alguns anos de uso — aplique graxa branca nos pivôs a cada 20.000 km.' },
]

const PROBLEMAS_GE: TipInput[] = [
  { severity: 'DANGER', title: 'Recall: inflador do airbag Takata — unidades 2009-2014', body: 'A mesma campanha de recall do airbag Takata (ver detalhes na geração 2003-2008) cobre unidades fabricadas até 2014 — ou seja, todo o Fit dessa geração está na faixa afetada. Risco de arremesso de fragmentos metálicos em caso de acionamento do airbag. Confira o chassi em honda.com.br/recall ou ligue 0800 701 8358.' },
  { severity: 'DANGER', title: 'Trincas no eixo traseiro relatadas amplamente, sem recall oficial', body: 'É queixa recorrente e bem documentada em fóruns e no Reclame Aqui: o eixo de torção traseiro do Fit dessa geração (mecânica compartilhada com o City) apresenta trincas sempre no mesmo ponto em unidades de diferentes donos — um padrão que sugere defeito de fabricação, mas que a Honda não reconhece como recall (alega estar fora do período de garantia). A troca custa entre R$ 7.000 e R$ 8.000 em concessionária. Ao comprar um usado dessa geração, peça para o mecânico inspecionar visualmente o eixo traseiro (embaixo do carro, na área da suspensão traseira) antes de fechar negócio — trinca nesse ponto é sinal de alerta sério, não é só "barulhinho".' },
  { severity: 'WARN', title: 'Superaquecimento e risco de queima da junta do cabeçote', body: 'Radiador entupido, válvula termostática travada ou bomba d\'água com defeito podem levar a superaquecimento — sintomas incluem fumaça branca no escapamento, perda de líquido de arrefecimento sem vazamento aparente visível e óleo com aspecto leitoso (sinal de contaminação por líquido de arrefecimento). Não rode com o carro fervendo tentando "chegar em algum lugar" — pare assim que notar o ponteiro/luz de temperatura alto, o custo de queimar a junta do cabeçote é muito maior que o de um reparo preventivo no sistema de arrefecimento.' },
  { severity: 'WARN', title: 'Câmbio automático de 5 marchas: fluido degradado causa trancos', body: 'Assim como qualquer câmbio automático convencional, o fluido dessa transmissão de 5 marchas perde propriedades com o tempo e a quilometragem, causando trancos e solavancos nas trocas. Diferente do CVT das outras gerações, aqui o fluido e o procedimento de troca são de câmbio automático convencional — confirme com o mecânico que ele está usando o fluido certo para ESTE câmbio, não o fluido de CVT.' },
]

const MANUTENCAO_GE: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Fit GE / New Fit (2009-2014, automático 5 marchas)', body: '7.500 km — Troca de óleo do motor (5W20) + filtro. | 20.000 km — Lubrificar dobradiças do Magic Seat. | 40.000-60.000 km — Fluido do câmbio automático de 5 marchas (NÃO é fluido de CVT — confirme a especificação correta para esse câmbio). | Anual — Inspeção do sistema de arrefecimento (radiador, termostática, bomba d\'água). | A cada revisão — Inspeção visual do eixo traseiro (trincas relatadas nessa geração — ponto de atenção sério). | Verificar na concessionária se o recall do airbag Takata já foi concluído nesta unidade.' },
]

// ---------- GERAÇÃO GK5 (2015-2021) — CVT (7 marchas simuladas) ----------

const MACETES_GK5: TipInput[] = [
  { severity: 'OK', title: 'CVT voltou nessa geração — com simulação de 7 marchas', body: 'A partir de 2015 a Honda trouxe de volta o câmbio CVT no Fit, agora com simulação de 7 marchas (dá a sensação psicológica de troca de marcha, mesmo sendo continuamente variável). É um câmbio diferente do automático de 5 marchas da geração anterior (2009-2014) — não confunda peça, fluido ou sintoma de desgaste entre as duas gerações.' },
  { severity: 'OK', title: 'Motor 1.5 padronizado em toda a linha', body: 'Nessa geração o motor 1.5 Flex/Flexone passou a ser padrão em praticamente toda a linha (DX, LX, EX, EXL, Personal, Twist, CX) — menos variação de motorização do que nas gerações anteriores, o que simplifica a busca por peça de motor.' },
  { severity: 'OK', title: 'Magic Seat: lubrifique as dobradiças', body: 'Mesmo cuidado das gerações anteriores — dobradiças do Magic Seat podem ranger com o tempo, aplique graxa branca nos pivôs a cada 20.000 km.' },
]

const PROBLEMAS_GK5: TipInput[] = [
  { severity: 'WARN', title: 'CVT com relatos de tranco — fluido em dia é a principal prevenção', body: 'Assim como nas outras gerações com CVT, há relatos de tranco e aquecimento do câmbio em uso urbano muito intenso. Troca do fluido CVT original Honda no prazo (40.000 km) é a principal prevenção — nunca use fluido genérico nesse câmbio.' },
  { severity: 'WARN', title: 'Trincas no eixo traseiro seguem sendo relatadas nessa geração', body: 'A mesma queixa de trincas no eixo de torção traseiro relatada na geração anterior (2009-2014) também aparece em unidades do GK5 — sugerindo que o problema não foi totalmente resolvido no redesenho. Inclua inspeção visual do eixo traseiro na rotina de revisão, principalmente a partir de quilometragem mais alta.' },
  { severity: 'OK', title: 'Sem recall de airbag Takata nessa geração', body: 'O recall do airbag Takata cobre unidades fabricadas até 2014 — o Fit GK5 (2015-2021) fica de fora dessa campanha específica. Ainda assim, vale acompanhar o site honda.com.br/recall periodicamente para qualquer nova convocação.' },
]

const MANUTENCAO_GK5: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Fit GK5 (2015-2021, CVT)', body: '7.500 km — Troca de óleo do motor (0W20) + filtro. | 20.000 km — Lubrificar dobradiças do Magic Seat. | 40.000 km — Fluido do CVT: use somente fluido original Honda CVT. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | A cada revisão — Inspeção visual do eixo traseiro (trincas relatadas mesmo nessa geração).' },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Fit', yearFrom: 2003, yearTo: 2008, tireSize: '175/65 R14 (referência)', frontPsi: 30, rearPsi: 28, frontPsiLoad: 32, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — pode variar por versão (LX/LXL/EX).' },
  { modelName: 'Fit', yearFrom: 2009, yearTo: 2014, tireSize: '175/65 R14 · 185/55 R16 (EX/EXL, referência)', frontPsi: 30, rearPsi: 28, frontPsiLoad: 32, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — Fit Twist pode ter aro diferente.' },
  { modelName: 'Fit', yearFrom: 2015, yearTo: null, tireSize: '185/60 R15', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 33, sparePsi: 60, notes: null },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Fit', yearFrom: 2003, yearTo: 2008, component: 'Óleo do motor (5W20/5W30) + filtro', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Fit', yearFrom: 2003, yearTo: 2008, component: 'Fluido do câmbio CVT (original Honda)', intervalKm: 40000, intervalMonths: 36, notes: 'Nunca use fluido genérico — item crítico para esse câmbio.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Fit', yearFrom: 2003, yearTo: 2008, component: 'Verificação do recall do airbag Takata (unidades 2004-2008)', intervalKm: null, intervalMonths: null, notes: 'Confirme em honda.com.br/recall mesmo que ache que já foi feito.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Fit', yearFrom: 2003, yearTo: 2008, component: 'Sistema de arrefecimento (radiador, termostática, bomba d\'água)', intervalKm: null, intervalMonths: 12, notes: 'Superaquecimento não tratado cedo pode queimar a junta do cabeçote.', priority: 'HIGH', order: 3 },
  { modelName: 'Fit', yearFrom: 2003, yearTo: 2008, component: 'Lubrificação das dobradiças do Magic Seat', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'LOW', order: 4 },

  { modelName: 'Fit', yearFrom: 2009, yearTo: 2014, component: 'Óleo do motor (5W20) + filtro', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 5 },
  { modelName: 'Fit', yearFrom: 2009, yearTo: 2014, component: 'Fluido do câmbio automático de 5 marchas', intervalKm: 60000, intervalMonths: 48, notes: 'NÃO é fluido de CVT — confirme a especificação correta para esse câmbio.', priority: 'HIGH', order: 6 },
  { modelName: 'Fit', yearFrom: 2009, yearTo: 2014, component: 'Verificação do recall do airbag Takata (unidades 2009-2014)', intervalKm: null, intervalMonths: null, notes: 'Confirme em honda.com.br/recall mesmo que ache que já foi feito.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Fit', yearFrom: 2009, yearTo: 2014, component: 'Inspeção visual do eixo traseiro', intervalKm: null, intervalMonths: 12, notes: 'Trincas relatadas amplamente nessa geração, sem recall oficial — sinal de alerta sério.', priority: 'HIGH', order: 8 },
  { modelName: 'Fit', yearFrom: 2009, yearTo: 2014, component: 'Sistema de arrefecimento (radiador, termostática, bomba d\'água)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'Fit', yearFrom: 2009, yearTo: 2014, component: 'Lubrificação das dobradiças do Magic Seat', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'LOW', order: 10 },

  { modelName: 'Fit', yearFrom: 2015, yearTo: null, component: 'Óleo do motor (0W20) + filtro', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 11 },
  { modelName: 'Fit', yearFrom: 2015, yearTo: null, component: 'Fluido do câmbio CVT (original Honda)', intervalKm: 40000, intervalMonths: 36, notes: 'Nunca use fluido genérico.', priority: 'CRITICAL', order: 12 },
  { modelName: 'Fit', yearFrom: 2015, yearTo: null, component: 'Inspeção visual do eixo traseiro', intervalKm: null, intervalMonths: 12, notes: 'Mesma queixa de trincas relatada na geração anterior.', priority: 'MEDIUM', order: 13 },
  { modelName: 'Fit', yearFrom: 2015, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 14 },
  { modelName: 'Fit', yearFrom: 2015, yearTo: null, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 15 },
  { modelName: 'Fit', yearFrom: 2015, yearTo: null, component: 'Lubrificação das dobradiças do Magic Seat', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'LOW', order: 16 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Fit', yearFrom: 2003, yearTo: 2008, MACETES: MACETES_GD, PROBLEMAS: PROBLEMAS_GD, MANUTENCAO: MANUTENCAO_GD },
  { modelName: 'Fit', yearFrom: 2009, yearTo: 2014, MACETES: MACETES_GE, PROBLEMAS: PROBLEMAS_GE, MANUTENCAO: MANUTENCAO_GE },
  { modelName: 'Fit', yearFrom: 2015, yearTo: null, MACETES: MACETES_GK5, PROBLEMAS: PROBLEMAS_GK5, MANUTENCAO: MANUTENCAO_GK5 },
]

async function main() {
  console.log('🚗 Seed Honda Fit...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Honda', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Fit', brandId: brand.id } },
    update: {},
    create: { name: 'Fit', brandId: brand.id },
  })

  // Delete once (não por bloco) — múltiplos blocos usam o mesmo modelName 'Fit'
  await prisma.tip.deleteMany({ where: { modelName: 'Fit' } })

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
    console.log(`  ✅ Fit (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: 'Fit' } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: Fit (${tp.yearFrom}-${tp.yearTo ?? '...'})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Fit' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Honda Fit concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
