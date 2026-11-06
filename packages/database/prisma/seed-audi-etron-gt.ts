/**
 * Seed Audi e-tron GT (não-RS) — macetes, problemas, manutenção
 * Sedan gran turismo 100% elétrico, versões de entrada/intermediária
 * (abaixo do RS e-tron GT, coberto em arquivo separado). Inclui a versão
 * "S e-tron GT Sportback". Mesma plataforma J1 do Porsche Taycan.
 * Execute: pnpm --filter @motormacete/database db:seed:audi-etron-gt
 *
 * Fontes: autossegredos.com.br (recall oficial), automaistv.com.br
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
    title: 'Mesma plataforma do Porsche Taycan — vale considerar oficina especializada em Taycan também',
    body: 'A plataforma J1, motores e boa parte da eletrônica de potência são compartilhados com o Porsche Taycan. Oficinas especializadas em Taycan costumam entender bem o e-tron GT também — útil quando faltar especialista Audi na região.',
  },
  {
    severity: 'OK',
    title: 'Carregue entre 20-80% no uso diário para preservar a bateria',
    body: 'Reserve o carregamento até 100% para viagens que precisem da autonomia máxima — no dia a dia, manter entre 20-80% prolonga a vida útil da bateria de alta tensão.',
  },
  {
    severity: 'OK',
    title: 'Frenagem regenerativa reduz desgaste de pastilha, mas use o freio convencional de vez em quando',
    body: 'A recuperação de energia na frenagem faz a maior parte do trabalho no uso normal, reduzindo bastante o desgaste da pastilha. Pise no freio a disco convencional de vez em quando mesmo sem necessidade, isso evita oxidação da superfície do disco por baixo uso — comum em elétricos.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall oficial por falha em bateria — confirme se o seu exemplar foi atendido',
    body: 'A Audi já fez recall oficial para unidades de e-tron GT e RS e-tron GT relacionado a falha na bateria de alta tensão. Consulte a concessionária ou o site oficial da Audi com o número do chassi para confirmar se o seu exemplar está na faixa afetada e, se estiver, agende o reparo — recall de bateria não deve ser adiado.',
  },
  {
    severity: 'WARN',
    title: 'Rede de assistência para elétrico de alta performance ainda é limitada no Brasil',
    body: 'Para qualquer serviço além de manutenção básica (pneu, freio, itens de cabine), a concessionária costuma ser a opção mais segura — poucas oficinas independentes no Brasil têm equipamento e treinamento para mexer no sistema de alta tensão desse carro.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma e-tron GT (elétrico)',
    body: '15.000-20.000 km ou anual — Inspeção geral (freios, suspensão, pneus, sistema de arrefecimento da bateria). | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT4. | Sempre — confirme se seu chassi está na faixa do recall de bateria e agende se estiver. | Sempre — carregue entre 20-80% no uso diário.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'E-TRON GT', yearFrom: 2021, yearTo: null, tireSize: '245/45 R20 dianteiro · 285/40 R20 traseiro (padrão) — varia conforme roda', frontPsi: 32, rearPsi: 35, frontPsiLoad: 35, rearPsiLoad: 39, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Sem estepe (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'E-TRON GT', yearFrom: 2021, yearTo: null, component: 'Confirmação de recall de bateria', intervalKm: null, intervalMonths: null, notes: 'Consulte a concessionária com o chassi do carro — recall oficial existente para essa linha.', priority: 'CRITICAL', order: 0 },
  { modelName: 'E-TRON GT', yearFrom: 2021, yearTo: null, component: 'Inspeção geral (freios, suspensão, pneus)', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'E-TRON GT', yearFrom: 2021, yearTo: null, component: 'Fluido de freio DOT4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'E-TRON GT', yearFrom: 2021, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 3 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'E-TRON GT', yearFrom: 2021, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Audi e-tron GT...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'E-TRON GT', brandId: brand.id } },
    update: {}, create: { name: 'E-TRON GT', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'E-TRON GT' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'E-TRON GT' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'E-TRON GT' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi e-tron GT concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
