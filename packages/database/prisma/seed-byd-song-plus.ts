/**
 * Seed BYD Song Plus — macetes, problemas, manutenção e calibragem
 * SUV híbrido plug-in DM-i (motor 1.5 a combustão + motor elétrico,
 * bateria Blade LFP), câmbio e-CVT dedicado. Versões Song Plus e Song
 * Plus Premium (mesma mecânica, mais equipamento). Vendido no Brasil
 * desde 2023. Migrado do seed.ts histórico (conteúdo original
 * preservado) + MaintenanceItem que faltava.
 * Execute: pnpm --filter @motormacete/database db:seed:byd-song-plus
 *
 * Fontes: reclameaqui.com.br, mobiauto.com.br, byd.com
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
  { severity: 'OK', title: 'Versão PHEV: carregue primeiro, economize combustível', body: 'Na Song Plus DM-i (híbrida plug-in), carregue sempre que possível. Com bateria cheia, o motor elétrico faz a maior parte do trabalho em cidade. A gasolina entra em rodovias ou quando a bateria acaba.' },
  { severity: 'WARN', title: 'PHEV: não deixe a bateria sempre em 0%', body: 'Usar a Song Plus DM-i sempre com bateria zerada sobrecarrega o motor de combustão e reduz a eficiência. Carregue no trabalho, em shoppings — qualquer oportunidade ajuda.' },
  { severity: 'OK', title: 'Modo HEV economiza mais que só gasolina', body: 'Quando a bateria está baixa, ative o modo HEV (híbrido) em vez de usar apenas gasolina. O motor se autocarrega e mantém ~30% de carga para otimizar o consumo.' },
  { severity: 'OK', title: 'Song Plus Premium é a mesma mecânica, mais equipamento', body: 'A versão Premium não muda motor, bateria ou câmbio — é a mesma plataforma DM-i com mais itens de série (bancos, som, assistentes). Todo cuidado de manutenção e problema conhecido da Song Plus vale igualmente para a Premium.' },
]

const PROBLEMAS: TipInput[] = [
  { severity: 'WARN', title: 'Consumo de gasolina alto sem carga elétrica', body: 'A Song Plus DM-i foi projetada para funcionar principalmente no elétrico. Sem carregamento regular, o consumo de gasolina fica na faixa de 8–10 L/100km — perde a principal vantagem do PHEV.' },
]

const MANUTENCAO: TipInput[] = [
  { severity: 'OK', title: 'PHEV: mesma manutenção do motor gasolina', body: 'A Song Plus DM-i tem motor de combustão 1.5L que precisa de troca de óleo. BYD recomenda 5W30 a cada 10.000 km. O motor elétrico não requer óleo.' },
  { severity: 'WARN', title: 'Fluido do câmbio e-CVT a cada 60.000 km', body: 'O câmbio e-CVT (Eficiência Dual Mode) usa fluido específico. Troca obrigatória a cada 60.000 km para evitar deslizamentos e solavancos.' },
  { severity: 'OK', title: 'Cronograma Song Plus (BYD DM-i + ajuste uso severo BR)', body: '10.000 km/12 meses — Troca de óleo do motor 1.5 (5W30) + filtro. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido do câmbio e-CVT. | Anual — Inspeção do sistema de alta tensão (bateria/cabos) e do carregador.' },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Song Plus', yearFrom: 2023, yearTo: null, tireSize: '235/50 R19', frontPsi: 36, rearPsi: 33, frontPsiLoad: 38, rearPsiLoad: 36, sparePsi: null, notes: 'Versão DM-i (PHEV) e EV têm mesma calibragem. Verifique a plaqueta na porta do motorista.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Song Plus', yearFrom: 2023, yearTo: null, component: 'Óleo do motor 1.5 (5W30) + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Song Plus', yearFrom: 2023, yearTo: null, component: 'Inspeção de freios, suspensão e níveis de fluido', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'Song Plus', yearFrom: 2023, yearTo: null, component: 'Filtro de ar do motor e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'Song Plus', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Song Plus', yearFrom: 2023, yearTo: null, component: 'Fluido do câmbio e-CVT', intervalKm: 60000, intervalMonths: 48, notes: 'Evita deslizamento/solavanco — não é vitalício.', priority: 'HIGH', order: 4 },
  { modelName: 'Song Plus', yearFrom: 2023, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos) e carregador', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 5 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Song Plus', yearFrom: 2023, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed BYD Song Plus...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BYD', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'BYD', vehicleTypeId: carroType.id },
  })
  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })
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
  console.log('✅ BYD Song Plus concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
