/**
 * Seed Troller T4 (e antecessor RF Esport) — macetes, problemas,
 * manutenção e calibragem. Picape/utilitário off-road brasileiro
 * (fabricação de baixíssimo volume, quase artesanal), produzido de 1998
 * a 2021 — a marca foi encerrada quando a Ford fechou suas fábricas no
 * Brasil em 2021. Passou por várias motorizações a diesel: 2.8/3.0
 * turbo intercooler (fase inicial) e, a partir de meados dos anos 2000
 * já sob controle da Ford, o motor MWM International TGV 3.2 20V.
 * "RF Esport" foi o nome original do modelo antes de virar "T-4" — a
 * FIPE ainda lista a fase de transição "RF Esport T-4", que contém a
 * palavra "T-4" e por isso pode cruzar conteúdo com os macetes daqui.
 * Execute: pnpm --filter @motormacete/database db:seed:troller-t4
 *
 * Fontes: t4clube.com.br (clube de proprietários, referência técnica do
 *         modelo), reclameaqui.com.br, 4x4brasil.com.br, autopapo.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── Fase inicial (1998-2007) — motores 2.8/3.0 turbo intercooler diesel ──
const MACETES_OLD: TipInput[] = [
  { severity: 'OK', title: 'Marca de baixíssimo volume: o clube de proprietários é seu melhor recurso técnico', body: 'Por ser fabricação de volume muito baixo (quase artesanal), oficina genérica costuma ter pouca familiaridade com o T4 — o clube de proprietários (T4 Clube Brasil) concentra muito conhecimento técnico acumulado por gente que realmente entende do carro, vale mais que perguntar em oficina qualquer.' },
]
const PROBLEMAS_OLD: TipInput[] = [
  { severity: 'WARN', title: 'Peça de reposição escassa — planeje reparo com antecedência', body: 'Peça específica dessa fase inicial (pré-motor MWM) é escassa mesmo comparado ao T4 mais recente, que já era de baixo volume. Não é carro para "resolver na hora" — qualquer manutenção maior exige pesquisa e possível encomenda antecipada.' },
]
const MANUTENCAO_OLD: TipInput[] = [
  { severity: 'OK', title: 'Cronograma T4 fase inicial (2.8/3.0 turbo diesel)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão e vazamentos (uso off-road exige atenção redobrada). | 20.000 km — Filtro de ar e filtro de combustível diesel. | 40.000 km — Fluido de freio. | 60.000 km — Óleo de diferenciais e caixa de transferência (4x4).' },
]

// ─── Fase MWM/Mercedes (2007-2021) — motor MWM International TGV 3.2 20V ──
const MACETES_TGV: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Diesel S10 de má qualidade é o inimigo número 1 desse motor',
    body: 'A maioria dos problemas relatados em Trollers dessa fase está ligada à qualidade do diesel S10 abastecido — o combustível é mais sensível a umidade e contaminantes, e o baixo teor de enxofre pode agredir componentes do sistema EGR se o diesel não for de boa procedência. Abasteça sempre em posto de confiança, nunca em bomba duvidosa, principalmente em viagem.',
  },
  {
    severity: 'OK',
    title: 'Válvula EGR: limpeza preventiva evita carbonização severa da admissão',
    body: 'O sistema EGR reduz emissão de poluentes, mas favorece carbonização intensa na admissão com o tempo — limpeza preventiva da válvula EGR e da admissão em intervalo regular evita que o problema avance a ponto da válvula falhar e comprometer a turbina.',
  },
]
const PROBLEMAS_TGV: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Modo de segurança ("limp mode"): perda de potência que pode ser perigosa em ultrapassagem',
    body: 'Diesel de má qualidade ou filtro de combustível atrasado pode fazer o carro entrar em modo de segurança, perdendo potência a ponto de não passar de 2.000 RPM ou 60 km/h — cenário perigoso se acontecer durante uma ultrapassagem. Se a luz de alerta do motor acender e o carro perder força, reduza a velocidade com segurança e não force o motor; leve para diagnóstico assim que possível e revise a procedência do diesel usado recentemente.',
  },
  {
    severity: 'WARN',
    title: 'Filtro particulado (DPF): vida útil de 200.000-300.000 km e substituição cara',
    body: 'O filtro particulado de diesel (DPF) tem vida útil de 200.000-300.000 km e, quando chega ao fim, a substituição gira em torno de R$13.000 — valor alto que vale considerar no planejamento financeiro de longo prazo do carro, principalmente se for comprar um exemplar usado já com quilometragem alta.',
  },
  {
    severity: 'WARN',
    title: 'Mão de obra especializada é escassa fora de grandes centros',
    body: 'O motor MWM International TGV 3.2 exige conhecimento técnico específico que boa parte das oficinas, principalmente fora de grandes centros urbanos, não tem. Antes de precisar de reparo com urgência, já identifique qual oficina da sua região (ou mais próxima) tem experiência real com esse motor — evita ficar na mão em caso de pane.',
  },
]
const MANUTENCAO_TGV: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma T4 (MWM TGV 3.2 20V, 2007-2021)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e suspensão (uso off-road exige atenção redobrada). | 15.000-20.000 km — Filtro de combustível diesel — abasteça sempre com S10 de procedência confiável. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000 km — Óleo de diferenciais e caixa de transferência (4x4). | Preventivo — limpeza da válvula EGR e admissão em intervalo regular, evita carbonização severa. | 200.000-300.000 km — Substituição do filtro particulado (DPF), item caro, planeje com antecedência.',
  },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'T-4', yearFrom: 1998, yearTo: 2007, MACETES: MACETES_OLD, PROBLEMAS: PROBLEMAS_OLD, MANUTENCAO: MANUTENCAO_OLD },
  { modelName: 'T-4', yearFrom: 2007, yearTo: 2021, MACETES: MACETES_TGV, PROBLEMAS: PROBLEMAS_TGV, MANUTENCAO: MANUTENCAO_TGV },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'T-4', yearFrom: 1998, yearTo: 2007, tireSize: '235/75 R15 (referência off-road)', frontPsi: 28, rearPsi: 30, frontPsiLoad: 32, rearPsiLoad: 38, sparePsi: 60, notes: 'Valor de referência para uso rodoviário — reduza a pressão para uso off-road intenso (areia/lama) e recalibre ao voltar ao asfalto.' },
  { modelName: 'T-4', yearFrom: 2007, yearTo: 2021, tireSize: '235/75 R15 · 265/75 R16 (referência off-road)', frontPsi: 28, rearPsi: 30, frontPsiLoad: 32, rearPsiLoad: 38, sparePsi: 60, notes: 'Valor de referência para uso rodoviário — reduza a pressão para uso off-road intenso e recalibre ao voltar ao asfalto. Confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'T-4', yearFrom: 1998, yearTo: 2007, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'T-4', yearFrom: 1998, yearTo: 2007, component: 'Óleo de diferenciais e caixa de transferência', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 1 },
  { modelName: 'T-4', yearFrom: 2007, yearTo: 2021, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 2 },
  { modelName: 'T-4', yearFrom: 2007, yearTo: 2021, component: 'Filtro de combustível diesel', intervalKm: 17500, intervalMonths: 12, notes: 'Abasteça sempre com S10 de procedência confiável — combustível ruim é a causa mais comum de problema nesse motor.', priority: 'CRITICAL', order: 3 },
  { modelName: 'T-4', yearFrom: 2007, yearTo: 2021, component: 'Limpeza da válvula EGR e admissão', intervalKm: 40000, intervalMonths: null, notes: 'Previne carbonização severa e risco de dano à turbina se a válvula falhar.', priority: 'HIGH', order: 4 },
  { modelName: 'T-4', yearFrom: 2007, yearTo: 2021, component: 'Filtro particulado (DPF) — substituição', intervalKm: 250000, intervalMonths: null, notes: 'Vida útil 200.000-300.000 km. Item caro (~R$13.000), planeje com antecedência.', priority: 'MEDIUM', order: 5 },
  { modelName: 'T-4', yearFrom: 2007, yearTo: 2021, component: 'Óleo de diferenciais e caixa de transferência', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
]

async function main() {
  console.log('🚗 Seed Troller T4...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Troller', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Troller', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'T-4', brandId: brand.id } },
    update: {}, create: { name: 'T-4', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'T-4' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'T-4' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'T-4' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Troller T4 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
