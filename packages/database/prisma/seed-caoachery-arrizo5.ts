/**
 * Seed Caoa Chery Arrizo 5 (e Arrizo 5e elétrico) — macetes, problemas,
 * manutenção e calibragem. Sedan compacto, motor 1.5 turbo flex (versões
 * RT/RTS/RX/RXS/RXT) e a versão 100% elétrica Arrizo 5e. Câmbio automático
 * CVT nas versões a combustão.
 * Execute: pnpm --filter @motormacete/database db:seed:caoachery-arrizo5
 *
 * Fontes: autosemotos.com (recall oficial), gruposentinela.com.br,
 *         mobiauto.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── Arrizo 5 (a combustão, 1.5 Turbo) ─────────────────────────────────────
const MACETES_5: TipInput[] = [
  { severity: 'OK', title: 'Câmbio CVT: evite acelerar fundo com o motor ainda frio', body: 'Como em qualquer CVT, evite acelerações bruscas nos primeiros minutos após ligar o carro — protege a correia/polias do câmbio a longo prazo.' },
]
const PROBLEMAS_5: TipInput[] = [
  { severity: 'DANGER', title: 'Recall oficial do motor 1.5 Turbo: desgaste dos balancins pode parar o motor', body: 'A Caoa Chery fez recall oficial de veículos com motor 1.5 Turbo Flex Fuel (equipa o Arrizo 5, além de Tiggo 5X e Tiggo 7) por desgaste excessivo dos balancins do motor — sintomas vão de ruído anormal com queda progressiva de torque até parada repentina do motor em casos extremos. Consulte a concessionária com o chassi do seu carro para confirmar se está na faixa afetada e agende o reparo se estiver — não é algo para adiar.' },
]
const MANUTENCAO_5: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Arrizo 5 (1.5 Turbo)', body: '10.000 km — Troca de óleo do motor + filtro (essencial nesse motor turbo). | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT4. | 60.000 km — Óleo do câmbio CVT. | Sempre — confirme se seu chassi está na faixa do recall de balancins do motor 1.5 turbo.' },
]

// ─── Arrizo 5e (elétrico) ───────────────────────────────────────────────────
const MACETES_5E: TipInput[] = [
  { severity: 'OK', title: 'Carregue entre 20-80% no uso diário para preservar a bateria', body: 'Reserve o carregamento até 100% para viagens que precisem da autonomia máxima — no dia a dia, manter entre 20-80% prolonga a vida útil da bateria de alta tensão.' },
  { severity: 'OK', title: 'Frenagem regenerativa reduz desgaste de pastilha', body: 'A frenagem regenerativa faz boa parte do trabalho de desacelerar o carro no uso normal, reduzindo o desgaste da pastilha de freio comparado a um carro a combustão equivalente — mas use o freio convencional de vez em quando para evitar oxidação do disco por baixo uso.' },
]
const PROBLEMAS_5E: TipInput[] = [
  { severity: 'OK', title: 'Rede de assistência para elétrico ainda em formação — priorize concessionária', body: 'Para qualquer serviço relacionado ao sistema de alta tensão, prefira a concessionária em vez de oficina genérica — a rede de especialistas em elétrico da marca ainda está em expansão no Brasil.' },
]
const MANUTENCAO_5E: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Arrizo 5e (elétrico)', body: '15.000-20.000 km ou anual — Inspeção geral (freios, suspensão, pneus). | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT4. | Sempre — carregue entre 20-80% no uso diário.' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Arrizo 5', yearFrom: 2020, yearTo: null, MACETES: MACETES_5, PROBLEMAS: PROBLEMAS_5, MANUTENCAO: MANUTENCAO_5 },
  { modelName: 'Arrizo 5e', yearFrom: 2020, yearTo: null, MACETES: MACETES_5E, PROBLEMAS: PROBLEMAS_5E, MANUTENCAO: MANUTENCAO_5E },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Arrizo 5', yearFrom: 2020, yearTo: null, tireSize: '205/55 R16 · 215/50 R17 (referência)', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 35, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
  { modelName: 'Arrizo 5e', yearFrom: 2020, yearTo: null, tireSize: '215/50 R17 (referência)', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 37, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Elétrico é mais pesado, pressão correta é mais importante.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Arrizo 5', yearFrom: 2020, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Arrizo 5', yearFrom: 2020, yearTo: null, component: 'Confirmação de recall dos balancins do motor', intervalKm: null, intervalMonths: null, notes: 'Consulte a concessionária com o chassi do carro.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Arrizo 5', yearFrom: 2020, yearTo: null, component: 'Fluido de freio DOT4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Arrizo 5', yearFrom: 2020, yearTo: null, component: 'Óleo do câmbio CVT', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Arrizo 5e', yearFrom: 2020, yearTo: null, component: 'Inspeção geral (freios, suspensão, pneus)', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'Arrizo 5e', yearFrom: 2020, yearTo: null, component: 'Fluido de freio DOT4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 5 },
]

async function main() {
  console.log('🚗 Seed Caoa Chery Arrizo 5/5e...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Caoa Chery', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Caoa Chery', vehicleTypeId: carroType.id },
  })
  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })
  }
  for (const modelName of ['Arrizo 5', 'Arrizo 5e']) {
    await prisma.tip.deleteMany({ where: { modelName } })
  }
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  for (const modelName of ['Arrizo 5', 'Arrizo 5e']) {
    await prisma.tirePressure.deleteMany({ where: { modelName } })
  }
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: ['Arrizo 5', 'Arrizo 5e'] } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Caoa Chery Arrizo 5/5e concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
