/**
 * Seed BYD Seal — macetes, problemas, manutenção e calibragem
 * Sedã esportivo 100% elétrico, plataforma e-Platform 3.0, versões RWD e
 * AWD (Performance), bateria Blade LFP. Vendido no Brasil desde 2023.
 * Migrado do seed.ts histórico (conteúdo original preservado) +
 * MaintenanceItem que faltava.
 * Execute: pnpm --filter @motormacete/database db:seed:byd-seal
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
  { severity: 'OK', title: 'Versão AWD: tração no eixo traseiro em Normal', body: 'Na versão AWD, no modo Normal o motor traseiro é o principal (RWD feel). O motor dianteiro entra sob demanda. Para preservar a bateria, use Eco no dia a dia.' },
  { severity: 'WARN', title: 'Autonomia real em rodovia: use Sport com cuidado', body: 'O modo Sport aumenta dramaticamente o consumo. Em viagens, use Normal ou Eco na rodovia. O Seal tem autonomia real de ~480 km em modo Eco vs. ~380 km no Sport.' },
  { severity: 'OK', title: 'Carregamento rápido DC: limite de temperatura', body: 'O Seal tem gerenciamento térmico avançado que pré-aquece a bateria automaticamente para carregamento rápido. Não força carregamento DC com bateria fria — aguarde o pré-aquecimento completar.' },
]

const PROBLEMAS: TipInput[] = [
  { severity: 'WARN', title: 'Ruídos de vento no vidro dianteiro em alta velocidade', body: 'Problema relatado por muitos donos brasileiros: ruído de vento entre 100–130 km/h vindo do vidro lateral dianteiro ou do para-brisas. Em garantia, a BYD geralmente faz ajustes de vedação que resolvem.' },
  { severity: 'OK', title: 'Câmera de ré com resolução limitada', body: 'A resolução da câmera de ré é criticada para um sedan desta faixa de preço. Não é um problema de segurança, mas limita a clareza em manobras. Use o sensor de estacionamento para complementar.' },
  { severity: 'WARN', title: 'Sistema DiLink pode travar', body: 'O sistema de infoentretenimento DiLink pode ficar lento ou travar após uso prolongado. Reinicialize pelo menu ou desligando o carro por 5 minutos. Atualizações OTA costumam melhorar o desempenho.' },
]

const MANUTENCAO: TipInput[] = [
  { severity: 'OK', title: 'Manutenção essencialmente elétrica', body: 'Sem óleo de motor, sem filtro de combustível, sem velas, sem correia dentada. Foque em: fluido de freio (2 anos), fluido de arrefecimento (5 anos), pneus e filtro de cabine.' },
  { severity: 'WARN', title: 'Pneus traseiros (AWD): desgaste assimétrico', body: 'Na versão AWD, o motor traseiro aplica mais torque no eixo traseiro. Monitore o desgaste dos pneus traseiros com mais atenção e rotacione a cada 8.000 km.' },
  { severity: 'OK', title: 'Cronograma Seal (BYD + ajuste uso severo BR)', body: '10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 8.000 km — Rotação de pneus (redobre atenção nos traseiros na versão AWD). | 12 meses — Filtro de cabine. | 24 meses — Fluido de freio DOT 4. | 5 anos/100.000 km — Fluido de arrefecimento da bateria (inspecionar a cada 2 anos).' },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Seal', yearFrom: 2023, yearTo: null, tireSize: '235/45 R18', frontPsi: 36, rearPsi: 36, frontPsiLoad: 40, rearPsiLoad: 40, sparePsi: null, notes: 'Versão AWD: mesma calibragem nos dois eixos. Versão RWD: traseiro 38 PSI. Sem estepe.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Seal', yearFrom: 2023, yearTo: null, component: 'Inspeção de freios, suspensão e níveis de fluido', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 0 },
  { modelName: 'Seal', yearFrom: 2023, yearTo: null, component: 'Rotação de pneus', intervalKm: 8000, intervalMonths: null, notes: 'Versão AWD desgasta mais os traseiros — atenção redobrada.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Seal', yearFrom: 2023, yearTo: null, component: 'Filtro de cabine', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'Seal', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Seal', yearFrom: 2023, yearTo: null, component: 'Fluido de arrefecimento da bateria', intervalKm: 100000, intervalMonths: 60, notes: 'Inspecionar a cada 2 anos, substituir a cada 5 anos/100.000 km.', priority: 'HIGH', order: 4 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Seal', yearFrom: 2023, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed BYD Seal...')
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
  console.log('✅ BYD Seal concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
