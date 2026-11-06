/**
 * Seed Peugeot 306 — macetes, problemas, manutenção e calibragem
 * Vendido no Brasil de 1994 a 2001/2002 (hatch até 2001, quando o 307
 * assumiu a linha; sedã, perua/Break e cabriolet seguiram até 2002).
 * Hatch (3p/5p) e cabriolet vinham principalmente da Europa, o sedã
 * chegava montado na Argentina e a perua (Break) da Europa — vale
 * considerar a procedência ao pesquisar peça específica. Motores 1.8
 * 8V/16V e 2.0 16V (o 2.0 16V equipa as versões esportivas S16/GTi/
 * Rallye e o Cabriolet 2.0). O 306 tem herança de rali: a versão de
 * competição Maxi foi campeã da França de rali em 1996 e 1997 (até
 * 308cv na versão de pista — NÃO confundir com o motor de rua das
 * versões S16/GTi/Rallye, que é bem mais modesto).
 * Execute: pnpm --filter @motormacete/database db:seed:peugeot-306
 *
 * Fontes: autolivraria.com.br, flatout.com.br, alvaromatiassa.wordpress.com,
 *         reclameaqui.com.br, carroclub.com.br, opinautos.com.br,
 *         oficinasbh.com, wikie.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

const MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Sedã vinha da Argentina, perua (Break) da Europa — confirme a procedência ao buscar peça',
    body: 'O hatch (e mais tarde o cabriolet) era majoritariamente europeu, o sedã era montado na Argentina e a perua (Break) vinha da Europa. Pequenas diferenças de especificação de peça (elétrica, acabamento) podem existir entre unidades de procedência diferente do mesmo ano — vale ter essa informação em mãos ao pesquisar peça mais específica.',
  },
  {
    severity: 'OK',
    title: 'Motor 2.0 16V equipa as versões esportivas S16/GTi/Rallye e o Cabriolet 2.0',
    body: 'As versões de desempenho (S16, GTi, Rallye) e o Cabriolet 2.0 usam o motor 2.0 16V (152cv na época) — peça específica do cabeçote 16V, sistema de injeção e árvore de comando é mais rara e mais cara que a do motor 1.8 8V/16V das versões comuns. Confirme sempre qual motor sua unidade tem antes de orçar peça de motor.',
  },
  {
    severity: 'OK',
    title: 'Herança de rali: não confunda o motor de rua com o do 306 Maxi de competição',
    body: 'O Peugeot 306 Maxi foi campeão da França de rali em 1996 e 1997, com motor 2.0 16V de até 308cv em versão de competição (Maxi Evo 2). O motor 2.0 16V das versões de rua S16/GTi/Rallye é uma unidade civil bem mais modesta (152cv) — compartilha a genealogia, não o preparo. Não pague a mais em peça achando que é "peça de rali".',
  },
  {
    severity: 'OK',
    title: 'Peça original de concessionária é cara — oficina especializada em carro francês costuma ter alternativa melhor',
    body: 'Donos relatam preço elevado de peça e mão de obra em rede autorizada. Oficinas especializadas em carros franceses (Peugeot/Citroën/Renault) da época costumam ter mais familiaridade com peça de mercado paralelo compatível e reparo mais em conta do que uma oficina genérica ou a própria concessionária.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia dentada: há relatos de ruptura — motor interferente, troca preventiva é essencial',
    body: 'Existem relatos de quebra da correia dentada em exemplares do 306, e os motores 1.8/2.0 16V dessa geração são interferentes (correia arrebentando ou pulando dente causa dano grave ao motor, com válvula batendo no pistão). Nunca ultrapasse o intervalo de troca do kit completo (correia + tensores + bomba d\'água) — é o item de manutenção preventiva mais importante desse carro.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão traseira exige atenção — "arrumação" e reembucho de eixo são queixas frequentes',
    body: 'A suspensão traseira (eixo de torção) é apontada como ponto de atenção recorrente, com necessidade de "arrumação" e reembucho do eixo em uso mais prolongado. Ruído ou folga na traseira merece inspeção específica desse componente, não só troca de amortecedor.',
  },
  {
    severity: 'WARN',
    title: 'Problemas elétricos: partida, fusíveis/relés e ar-condicionado',
    body: 'Queixas recorrentes incluem dificuldade para dar partida, falhas em fusíveis/relés e no sistema de ar-condicionado. Em carro de época, chicote ressecado e conectores oxidados são a causa mais comum — antes de trocar módulo ou componente caro, vale checar aterramentos e conectores.',
  },
  {
    severity: 'WARN',
    title: 'Manutenção em rede autorizada tende a ser cara — mas o carro é robusto se bem cuidado',
    body: 'Donos relatam que boa parte dos "defeitos" atribuídos ao 306 na verdade vêm de falta de manutenção preventiva, não de falha grave de projeto. Peça e mão de obra podem ser caras em concessionária, mas o carro tende a durar bem com revisão em dia — é um caso claro onde manutenção preventiva compensa financeiramente no longo prazo.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 306 (1.8/2.0, 8V ou 16V)',
    body: '7.500-10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água) — item mais crítico do modelo, motor interferente com histórico de ruptura relatado. | 10.000 km — Inspeção da suspensão traseira (eixo de torção) — ponto de atenção recorrente. | Verificar aterramentos e conectores elétricos na primeira suspeita de falha de partida ou "fantasma elétrico". | 20.000 km — Filtro de ar e filtro de cabine (se equipado). | 40.000 km — Fluido de freio.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: '306', yearFrom: 1994, yearTo: 2002, tireSize: '175/70 R13 (referência, versões comuns) · 195/55 R15 (referência, S16/GTi/Rallye)', frontPsi: 28, rearPsi: 26, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual — versões esportivas (S16/GTi/Rallye) usam aro maior e podem ter calibragem levemente diferente.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: '306', yearFrom: 1994, yearTo: 2002, component: 'Óleo do motor + filtro', intervalKm: 7500, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor 1.8 8V/16V ou 2.0 16V.', priority: 'CRITICAL', order: 0 },
  { modelName: '306', yearFrom: 1994, yearTo: 2002, component: 'Kit de correia dentada completo (correia + tensores + bomba d\'água)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente — há relatos de ruptura, não postergar.', priority: 'CRITICAL', order: 1 },
  { modelName: '306', yearFrom: 1994, yearTo: 2002, component: 'Inspeção da suspensão traseira (eixo de torção)', intervalKm: 20000, intervalMonths: null, notes: 'Ponto de atenção recorrente — "arrumação" e reembucho de eixo.', priority: 'HIGH', order: 2 },
  { modelName: '306', yearFrom: 1994, yearTo: 2002, component: 'Verificação de aterramentos e conectores elétricos', intervalKm: null, intervalMonths: 12, notes: 'Causa comum de falha de partida e problemas elétricos intermitentes.', priority: 'MEDIUM', order: 3 },
  { modelName: '306', yearFrom: 1994, yearTo: 2002, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: '306', yearFrom: 1994, yearTo: 2002, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 5 },
]

const BLOCKS: ModelBlock[] = [{ modelName: '306', yearFrom: 1994, yearTo: 2002, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Peugeot 306...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Peugeot', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Peugeot', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: '306', brandId: brand.id } },
    update: {}, create: { name: '306', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: '306' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: '306' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: '306' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Peugeot 306 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
