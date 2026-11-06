/**
 * Seed GWM Tank 300 — macetes, problemas, manutenção e calibragem
 * SUV off-road híbrido (PHEV, tecnologia Hi4-T), motor 2.0 turbo a
 * gasolina + motor elétrico, tração integral AWD.
 * Execute: pnpm --filter @motormacete/database db:seed:gwm-tank-300
 *
 * Fontes: autoo.com.br, naz.com.br, reclameaqui.com.br
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
    title: 'Sistema híbrido apresentando problema: peça diagnóstico presencial, não confie só em telefone',
    body: 'A própria orientação da GWM para falhas do sistema híbrido é levar o carro presencialmente à concessionária — diagnóstico remoto por telefone não é confiável para esse tipo de sintoma. Se o carro entrar sozinho em modo combustão sem seu comando, ou mostrar ícones de mau funcionamento no painel, agende avaliação presencial o quanto antes.',
  },
  {
    severity: 'OK',
    title: 'Notificações do painel incomodando: procure o menu de configuração de alertas',
    body: 'O Tank 300 vem com muitos itens de série que geram notificações no painel — a maioria pode ser reduzida ou desativada no menu de configurações do sistema, vale procurar em vez de conviver com alertas repetitivos.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sistema híbrido pode entrar sozinho em modo combustão, mesmo com "manter último modo" ativado',
    body: 'Há relatos de o carro entrar sozinho no modo combustão ao ligar, mesmo com a configuração de manter o último modo de energia usado ativa — quando isso ocorre, o ar-condicionado pode parar de funcionar e o carro fica com aceleração mais brusca, exibindo ícones amarelos de mau funcionamento no painel. Não é comportamento normal — agende diagnóstico presencial na concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Dificuldade para engatar marcha relatada em alguns exemplares',
    body: 'Há relato de dificuldade para engatar marcha em unidade mais recente. Se notar esse sintoma, não force repetidamente — agende diagnóstico, forçar pode piorar o desgaste do mecanismo de engate.',
  },
  {
    severity: 'OK',
    title: 'Ruído acima do esperado em alguns exemplares zero km',
    body: 'Há relato de ruído excessivo já em carro praticamente zero quilômetro. Se notar isso logo na entrega, documente e acione a garantia imediatamente, antes de rodar muito com o carro.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tank 300 (PHEV Hi4-T)',
    body: '10.000-12.000 km — Troca de óleo do motor 2.0 turbo + filtro. | 10.000 km — Inspeção de freios e suspensão (uso off-road exige atenção redobrada). | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | Sempre — carregue a bateria entre 20-80% no uso diário para preservar a vida útil. | Sempre — sintoma no sistema híbrido exige diagnóstico presencial na concessionária, não resolve por telefone.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Tank 300', yearFrom: 2024, yearTo: null, tireSize: '265/60 R18 (referência off-road)', frontPsi: 32, rearPsi: 34, frontPsiLoad: 35, rearPsiLoad: 40, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta. Reduza a pressão para uso off-road intenso e recalibre ao voltar ao asfalto.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Tank 300', yearFrom: 2024, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 12000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Tank 300', yearFrom: 2024, yearTo: null, component: 'Inspeção de freios e suspensão', intervalKm: 10000, intervalMonths: null, notes: 'Uso off-road exige atenção redobrada.', priority: 'HIGH', order: 1 },
  { modelName: 'Tank 300', yearFrom: 2024, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'Tank 300', yearFrom: 2024, yearTo: null, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Tank 300', yearFrom: 2024, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed GWM Tank 300...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'GWM', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'GWM', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Tank 300', brandId: brand.id } },
    update: {}, create: { name: 'Tank 300', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Tank 300' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Tank 300' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Tank 300' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ GWM Tank 300 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
