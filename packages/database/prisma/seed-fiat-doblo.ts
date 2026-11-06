/**
 * Seed Fiat Doblò — macetes, problemas, manutenção e calibragem de pneus
 * Minivan/utilitário, no Brasil de 2001 a dezembro de 2021 (160 mil
 * unidades produzidas em 20 anos, sem substituto direto no mercado
 * brasileiro após a descontinuação). Inclui a versão comercial "Cargo"
 * (furgão) e as versões elevadas "Adventure"/"Adventure Xingu"/"Locker"
 * — mesma mecânica da versão de passeio, só suspensão/visual diferentes.
 * Duas eras mecânicas bem distintas:
 *  - 2001-2010: motor 1.3 Fire 8V/16V, 1.6 16V, 1.8 8V (Ecotec/Powertrain),
 *    todos com correia dentada.
 *  - 2010-2021: motor 1.4 Fire Flex 8V (entrada) e 1.8 16V E.torQ (novo
 *    projeto, corrente em vez de correia, mas com problema próprio sério
 *    de quebra de pistão documentado).
 * Execute: pnpm --filter @motormacete/database db:seed:fiat-doblo
 *
 * Fontes: oficinabrasil.com.br, omecanico.com.br, car.blog.br,
 *         carroclub.com.br, en.wikipedia.org (Fiat Doblò)
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── 2001-2010 — 1.3 Fire / 1.6 16V / 1.8 8V (correia dentada) ─────────────
const MACETES_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ao orçar troca de correia dentada, já inclua a bomba d\'água no orçamento',
    body: 'Nesses motores, a bomba d\'água tende a "colar" no eixo com o tempo — ao tentar removê-la durante a troca da correia dentada (que exige desmontar a bomba de qualquer forma), ela acaba danificada mesmo com todo cuidado. Oficinas experientes já colocam a troca da bomba d\'água como item obrigatório junto da correia — vale já orçar os dois juntos em vez de se surpreender depois.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem com vida curta — o Doblò é pesado para o tamanho do disco/platô',
    body: 'Troca de embreagem é manutenção corriqueira nesse modelo, às vezes com apenas 40.000 km — o Doblò é um veículo relativamente pesado (ainda mais na versão Cargo carregada) para o disco e platô de embreagem instalados de fábrica, que têm área de atrito relativamente pequena. Se usa o carro para trabalho com carga frequente, considere trocar por um kit de embreagem reforçado na primeira substituição, não o padrão de fábrica.',
  },
]
const PROBLEMAS_G1: TipInput[] = [
  { severity: 'DANGER', title: 'Correia dentada: motor interferente, nunca ultrapasse o intervalo', body: 'Os motores 1.3/1.6/1.8 dessa geração são interferentes — se a correia dentada arrebentar, o dano ao motor (válvulas dobradas, possível dano ao cabeçote) é praticamente garantido. Nunca ultrapasse o intervalo de troca, mesmo que o carro "pareça" estar rodando bem.' },
]
const MANUTENCAO_G1: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Doblò 2001-2010 (1.3/1.6/1.8 8V)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de embreagem (vida útil curta é característica do modelo) e freios. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada + bomba d\'água juntas (motor interferente, não corte esse orçamento). | 60.000 km — Velas de ignição.' },
]

// ─── 2010-2021 — 1.4 Fire Flex / 1.8 16V E.torQ (corrente) ─────────────────
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1.8 E.torQ: corrente no lugar da correia, mas não é motor "sem cuidado nenhum"',
    body: 'A partir de 2010/2011 o motor 1.8 passou a usar corrente de comando em vez de correia dentada — elimina o custo periódico de troca de correia, mas não elimina a necessidade de troca de óleo em dia, já que lubrificação ruim afeta diretamente a corrente e o tensionador.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem continua sendo ponto de atenção nessa geração também',
    body: 'O mesmo padrão de desgaste prematuro de embreagem (Doblò pesado para o disco/platô de fábrica) se repete nessa geração. Se usa comercialmente com carga frequente (comum na versão Cargo), considere kit de embreagem reforçado na primeira troca.',
  },
]
const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor 1.8 E.torQ: quebra de pistão é problema documentado e mais grave que correia arrebentada',
    body: 'O motor E.torQ 1.8 (lançado 2010) tem registro de quebra de pistão — um problema até mais sério que arrebentar correia dentada nos motores antigos, já que costuma exigir reforma completa do motor. Fique atento a qualquer ruído metálico novo, perda súbita de potência ou trepidação anormal, e não continue rodando "para ver se passa" — leve para diagnóstico imediatamente.',
  },
  {
    severity: 'WARN',
    title: 'Motor "pipocando" frio e afogando quente — sintoma documentado na família E.torQ',
    body: 'Há relatos, inclusive em outros modelos que usam o mesmo motor E.torQ, de funcionamento irregular ("pipocando") com o motor frio e afogamento nas acelerações com o motor já quente. Se notar esse padrão, não é frescura do carro — documente bem os sintomas (frio x quente) para ajudar o diagnóstico, já que facilita achar a causa (geralmente ligada a injeção/ignição).',
  },
]
const MANUTENCAO_G2: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Doblò 2010-2021 (1.4 Fire Flex / 1.8 16V E.torQ)', body: '10.000 km — Troca de óleo do motor + filtro (essencial para a corrente do 1.8 E.torQ). | 10.000 km — Inspeção de embreagem e freios. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000 km — Velas de ignição. | Sempre — ruído metálico novo ou perda súbita de potência no 1.8 E.torQ exige parar e diagnosticar imediatamente (risco de quebra de pistão).' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Doblo', yearFrom: 2001, yearTo: 2010, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Doblo', yearFrom: 2010, yearTo: 2021, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Doblo', yearFrom: 2001, yearTo: 2010, tireSize: '185/65 R14 (referência) — Cargo com carga pode variar', frontPsi: 30, rearPsi: 32, frontPsiLoad: 32, rearPsiLoad: 44, sparePsi: 60, notes: 'Reforce bastante a pressão traseira quando carregado (versão Cargo/uso comercial) — confirme o valor de carga máxima na etiqueta da coluna da porta.' },
  { modelName: 'Doblo', yearFrom: 2010, yearTo: 2021, tireSize: '185/65 R14 · 195/55 R15 (Adventure/Essence) — referência', frontPsi: 30, rearPsi: 32, frontPsiLoad: 32, rearPsiLoad: 44, sparePsi: 60, notes: 'Reforce bastante a pressão traseira quando carregado. Confirme o valor exato do seu aro/versão na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Doblo', yearFrom: 2001, yearTo: 2010, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Doblo', yearFrom: 2001, yearTo: 2010, component: 'Correia dentada + bomba d\'água (kit conjunto)', intervalKm: 60000, intervalMonths: 48, notes: 'Motor interferente. Sempre troque a bomba d\'água junto — ela tende a danificar ao ser removida para a troca da correia.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Doblo', yearFrom: 2001, yearTo: 2010, component: 'Inspeção de embreagem', intervalKm: 30000, intervalMonths: null, notes: 'Desgaste prematuro é característica do modelo, principalmente com uso de carga.', priority: 'HIGH', order: 2 },
  { modelName: 'Doblo', yearFrom: 2001, yearTo: 2010, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Doblo', yearFrom: 2010, yearTo: 2021, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Essencial para a corrente de comando do motor 1.8 E.torQ.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Doblo', yearFrom: 2010, yearTo: 2021, component: 'Inspeção de ruído do motor (1.8 E.torQ)', intervalKm: null, intervalMonths: 6, notes: 'Quebra de pistão é problema documentado — qualquer ruído metálico novo exige diagnóstico imediato.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Doblo', yearFrom: 2010, yearTo: 2021, component: 'Inspeção de embreagem', intervalKm: 30000, intervalMonths: null, notes: 'Desgaste prematuro é característica do modelo, principalmente com uso de carga (versão Cargo).', priority: 'HIGH', order: 6 },
  { modelName: 'Doblo', yearFrom: 2010, yearTo: 2021, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'Doblo', yearFrom: 2010, yearTo: 2021, component: 'Velas de ignição', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
]

async function main() {
  console.log('🚗 Seed Fiat Doblò...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Fiat', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Fiat', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Doblo', brandId: brand.id } },
    update: {}, create: { name: 'Doblo', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Doblo' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Doblo' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Doblo' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Fiat Doblò concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
