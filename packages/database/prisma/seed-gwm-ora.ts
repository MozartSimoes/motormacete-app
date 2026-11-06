/**
 * Seed GWM Ora 03 e Ora 05 — macetes, problemas, manutenção e calibragem
 * Dois hatches/SUVs 100% elétricos da sub-marca Ora. O 03 é o hatch de
 * entrada (nunca conseguiu se firmar como opção competitiva no segmento
 * no Brasil, hoje vendido em condições promocionais). O 05 é o SUV
 * elétrico mais recente e mais competitivo da dupla, bateria LFP maior.
 * Execute: pnpm --filter @motormacete/database db:seed:gwm-ora
 *
 * Fontes: autopapo.com.br, gwmmotors.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── Ora 03 ─────────────────────────────────────────────────────────────────
const MACETES_03: TipInput[] = [
  { severity: 'OK', title: 'Vendido em condições promocionais: bom momento para negociar preço', body: 'O Ora 03 nunca se firmou como opção mais competitiva do segmento no Brasil e segue sendo vendido em condições promocionais — se o preço for seu principal critério de compra, esse é um bom momento para negociar bem com a concessionária.' },
  { severity: 'OK', title: 'Carregue entre 20-80% no uso diário para preservar a bateria', body: 'Reserve o carregamento até 100% para quando precisar da autonomia máxima — no dia a dia, manter entre 20-80% prolonga a vida útil da bateria.' },
]
const PROBLEMAS_03: TipInput[] = [
  { severity: 'OK', title: 'Volume de vendas baixo: rede de peças/assistência menos madura que concorrentes populares', body: 'Por ter vendido em volume relativamente baixo, a disponibilidade de peça específica e a experiência acumulada da rede de assistência tendem a ser menores que em elétricos mais populares. Priorize a concessionária para qualquer serviço além do básico.' },
]
const MANUTENCAO_03: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Ora 03 (elétrico)', body: '15.000 km ou anual — Inspeção geral (freios, suspensão, pneus). | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio. | Sempre — carregue entre 20-80% no uso diário.' },
]

// ─── Ora 05 ─────────────────────────────────────────────────────────────────
const MACETES_05: TipInput[] = [
  { severity: 'OK', title: 'Bateria LFP: mais tolerante a carga frequente que baterias NMC', body: 'A química LFP (fosfato de ferro-lítio) da bateria do Ora 05 é mais tolerante a ciclos de carga completa que a química NMC usada em outros elétricos — mesmo assim, manter entre 20-80% no uso diário e reservar 100% para viagens longas ainda é a prática recomendada para maximizar a vida útil.' },
  { severity: 'OK', title: 'Carregamento DC rápido: aproveite os 120 kW quando disponível', body: 'Em carregador DC compatível de até 120 kW, o Ora 05 carrega de 30% a 80% em cerca de 20 minutos — vale procurar esses carregadores de maior potência em viagens, em vez de depender só de carga AC residencial.' },
]
const PROBLEMAS_05: TipInput[] = [
  { severity: 'OK', title: 'Lançamento mais recente — sem histórico de confiabilidade consolidado ainda', body: 'Por ser um lançamento mais recente que o Ora 03, ainda há menos relato de longo prazo específico do Ora 05 no Brasil. Acompanhe fóruns e grupos de proprietários à medida que a frota nacional cresce.' },
]
const MANUTENCAO_05: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Ora 05 (elétrico)', body: '15.000 km ou anual — Inspeção geral (freios, suspensão, pneus). | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio. | Sempre — carregue entre 20-80% no uso diário mesmo com a bateria LFP mais tolerante.' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Ora 03', yearFrom: 2023, yearTo: null, MACETES: MACETES_03, PROBLEMAS: PROBLEMAS_03, MANUTENCAO: MANUTENCAO_03 },
  { modelName: 'Ora 05', yearFrom: 2025, yearTo: null, MACETES: MACETES_05, PROBLEMAS: PROBLEMAS_05, MANUTENCAO: MANUTENCAO_05 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Ora 03', yearFrom: 2023, yearTo: null, tireSize: '215/50 R18 (referência)', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Elétrico é mais pesado, pressão correta é mais importante.' },
  { modelName: 'Ora 05', yearFrom: 2025, yearTo: null, tireSize: '235/50 R19 (referência)', frontPsi: 34, rearPsi: 34, frontPsiLoad: 37, rearPsiLoad: 39, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Ora 03', yearFrom: 2023, yearTo: null, component: 'Inspeção geral (freios, suspensão, pneus)', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 0 },
  { modelName: 'Ora 03', yearFrom: 2023, yearTo: null, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'Ora 05', yearFrom: 2025, yearTo: null, component: 'Inspeção geral (freios, suspensão, pneus)', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Ora 05', yearFrom: 2025, yearTo: null, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
]

async function main() {
  console.log('🚗 Seed GWM Ora 03/05...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'GWM', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'GWM', vehicleTypeId: carroType.id },
  })
  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })
    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }, idx) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: idx })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName}`)
  }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map((b) => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ GWM Ora 03/05 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
