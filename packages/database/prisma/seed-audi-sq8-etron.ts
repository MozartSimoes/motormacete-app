/**
 * Seed Audi SQ8 Sportback e-tron — macetes, problemas, manutenção
 * Versão de alta performance do Q8 e-tron (plataforma MLB evo, motor
 * triplo — dois traseiros + um dianteiro), carroceria Sportback
 * (coupé-SUV, teto mais baixo). Sucessora direta da antiga "e-tron S
 * Sportback" da geração pré-facelift.
 * Execute: pnpm --filter @motormacete/database db:seed:audi-sq8-etron
 *
 * Fontes: conexaoautomotivabr.com, audi-imprensa.com.br
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
    title: 'Sucessora da antiga "e-tron S Sportback" — mesma essência de motor triplo',
    body: 'O SQ8 Sportback e-tron dá sequência ao conceito da antiga "e-tron S Sportback" (motor triplo: dois traseiros independentes + um dianteiro), agora sobre a base facelift do Q8 e-tron com bateria maior. Peça e informação técnica do modelo anterior costumam se aplicar em boa parte — busque também por "e-tron S" ao procurar referência.',
  },
  {
    severity: 'OK',
    title: 'Motor triplo: torque vetorial traseiro melhora tração, mas aumenta complexidade',
    body: 'O sistema de dois motores traseiros independentes permite distribuir torque entre as rodas de forma mais precisa que um eixo traseiro convencional — ótimo para dirigibilidade, mas é um sistema mais complexo com mais pontos de diagnóstico possíveis. Prefira sempre oficina/concessionária com experiência específica nesse sistema.',
  },
  {
    severity: 'OK',
    title: 'Carregue entre 20-80% no uso diário para preservar a bateria',
    body: 'Reserve o carregamento até 100% para viagens longas — no dia a dia, manter entre 20-80% prolonga a vida útil da bateria de alta tensão.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Monitore alertas de bateria de alta tensão',
    body: 'Como nos outros modelos da família e-tron/Q8 e-tron, fique atento a qualquer alerta relacionado à bateria no painel ou comportamento de carga muito diferente do normal — leve à concessionária imediatamente se notar algo assim.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SQ8 Sportback e-tron (elétrico, motor triplo)',
    body: '15.000-20.000 km ou anual — Inspeção geral (freios, suspensão, pneus, sistema de arrefecimento da bateria). | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT4 (uso esportivo frequente pode exigir antecipação). | Sempre — carregue entre 20-80% no uso diário. | Sempre — pneu de alto desempenho desgasta mais rápido em uso esportivo, rodízio mais frequente ajuda.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'SQ8 Sportback E-Tron', yearFrom: 2023, yearTo: null, tireSize: '285/45 R21 (padrão) — varia conforme roda', frontPsi: 35, rearPsi: 38, frontPsiLoad: 39, rearPsiLoad: 42, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Sem estepe (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'SQ8 Sportback E-Tron', yearFrom: 2023, yearTo: null, component: 'Inspeção geral (freios, suspensão, pneus)', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 0 },
  { modelName: 'SQ8 Sportback E-Tron', yearFrom: 2023, yearTo: null, component: 'Monitoramento de alertas de bateria de alta tensão', intervalKm: null, intervalMonths: 1, notes: null, priority: 'CRITICAL', order: 1 },
  { modelName: 'SQ8 Sportback E-Tron', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT4', intervalKm: 40000, intervalMonths: 24, notes: 'Antecipe se usar o carro com frequência em modo esportivo.', priority: 'HIGH', order: 2 },
  { modelName: 'SQ8 Sportback E-Tron', yearFrom: 2023, yearTo: null, component: 'Rodízio de pneus', intervalKm: 8000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'SQ8 Sportback E-Tron', yearFrom: 2023, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Audi SQ8 Sportback e-tron...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'SQ8 Sportback E-Tron', brandId: brand.id } },
    update: {}, create: { name: 'SQ8 Sportback E-Tron', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'SQ8 Sportback E-Tron' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'SQ8 Sportback E-Tron' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'SQ8 Sportback E-Tron' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi SQ8 Sportback e-tron concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
