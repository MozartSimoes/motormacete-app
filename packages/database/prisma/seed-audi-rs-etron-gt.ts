/**
 * Seed Audi RS e-tron GT — macetes, problemas, manutenção e calibragem
 * Sedan gran turismo 100% elétrico, topo da linha RS. Compartilha
 * plataforma J1 com o Porsche Taycan (motores, bateria e boa parte da
 * eletrônica de potência são do mesmo projeto conjunto Volkswagen Group).
 * Chegou ao Brasil em 2026 com até 925cv na versão mais potente, bateria
 * de 97 kWh, carregamento DC até 320 kW e até 592 km de autonomia.
 * Execute: pnpm --filter @motormacete/database db:seed:audi-rs-etron-gt
 *
 * Fontes: automaistv.com.br
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
    title: 'Mesma plataforma do Porsche Taycan — peça e diagnóstico às vezes intercambiáveis',
    body: 'O RS e-tron GT compartilha a plataforma J1 (motores elétricos, bateria e boa parte da eletrônica de potência) com o Porsche Taycan. Em diagnósticos complexos, uma oficina especializada em Taycan também costuma entender bem o e-tron GT — vale considerar como opção quando faltar especialista Audi na sua região.',
  },
  {
    severity: 'OK',
    title: 'Carregue entre 20-80% no dia a dia para preservar a bateria',
    body: 'Como em qualquer elétrico, evitar carregar até 100% ou deixar descarregar até perto de 0% no uso diário preserva a vida útil da bateria de 97 kWh a longo prazo. Reserve o carregamento completo só para viagens longas que realmente precisem da autonomia máxima.',
  },
  {
    severity: 'OK',
    title: 'Frenagem regenerativa reduz desgaste de pastilha — mas fique de olho no disco',
    body: 'A frenagem regenerativa faz a maior parte do trabalho de desacelerar o carro no uso normal, reduzindo bastante o desgaste da pastilha de freio comparado a um carro a combustão equivalente. O lado inverso: por serem pouco usados, os discos de freio podem enferrujar em climas úmidos — pise no freio convencional de vez em quando mesmo sem precisar, isso limpa a superfície do disco.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão pneumática ativa: ponto de atenção conhecido em carros elétricos de luxo dessa categoria',
    body: 'O sistema de suspensão a ar ativa (que ajusta cada roda individualmente e eleva a carroceria ao abrir a porta) é sofisticado e caro de reparar quando falha. Fique atento a qualquer mudança de altura ou nivelamento do carro parado — sinal precoce de vazamento no sistema pneumático, mais barato de resolver cedo.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Modelo muito recente no Brasil — histórico de confiabilidade local ainda inexistente',
    body: 'Por ter chegado ao mercado brasileiro apenas em 2026, ainda não há relatos consistentes de problema específico de uso real no país. Isso não é motivo de preocupação, só significa que vale acompanhar grupos e fóruns de proprietários à medida que a frota nacional cresce, em vez de assumir que problemas de outros mercados necessariamente se repetem aqui.',
  },
  {
    severity: 'WARN',
    title: 'Rede de assistência técnica para elétrico de alta performance ainda é limitada no Brasil',
    body: 'Por ser um carro de nicho extremo (alto desempenho + 100% elétrico + baixíssimo volume), a quantidade de oficinas fora da rede oficial Audi capacitadas a mexer nesse sistema de alta tensão é muito pequena no Brasil. Para qualquer serviço que não seja manutenção básica (pneu, freio, itens de cabine), a concessionária costuma ser a opção mais segura.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma RS e-tron GT (elétrico)',
    body: '15.000-20.000 km ou anual — Inspeção geral (freios, suspensão a ar, pneus, níveis de fluido de freio/arrefecimento da bateria). | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT4. | Sempre — carregue entre 20-80% no uso diário para preservar a bateria de 97 kWh. | Sempre — observe altura/nivelamento da suspensão a ar em repouso, sinal precoce de vazamento pneumático. | Sem troca de óleo, filtro de óleo ou vela — motor elétrico não tem esses itens.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'RS e-tron GT', yearFrom: 2026, yearTo: null, tireSize: '265/35 R21 dianteiro · 305/30 R21 traseiro (padrão) — varia conforme roda', frontPsi: 35, rearPsi: 38, frontPsiLoad: 38, rearPsiLoad: 42, sparePsi: null, notes: 'Confirme sempre na etiqueta da coluna da porta — elétrico de alto desempenho é mais pesado, a pressão certa é ainda mais importante para o comportamento do carro. Sem estepe (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'RS e-tron GT', yearFrom: 2026, yearTo: null, component: 'Inspeção geral (freios, suspensão a ar, pneus)', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 0 },
  { modelName: 'RS e-tron GT', yearFrom: 2026, yearTo: null, component: 'Inspeção da suspensão a ar (altura/nivelamento em repouso)', intervalKm: null, intervalMonths: 6, notes: 'Sinal precoce de vazamento pneumático — resolva cedo.', priority: 'HIGH', order: 1 },
  { modelName: 'RS e-tron GT', yearFrom: 2026, yearTo: null, component: 'Fluido de freio DOT4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'RS e-tron GT', yearFrom: 2026, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'RS e-tron GT', yearFrom: 2026, yearTo: null, component: 'Uso do freio convencional (evitar oxidação do disco)', intervalKm: null, intervalMonths: 1, notes: 'Frenagem regenerativa reduz muito o uso do freio a disco — pise no freio convencional de vez em quando para evitar ferrugem na superfície.', priority: 'LOW', order: 4 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'RS e-tron GT', yearFrom: 2026, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Audi RS e-tron GT...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'RS e-tron GT', brandId: brand.id } },
    update: {}, create: { name: 'RS e-tron GT', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'RS e-tron GT' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'RS e-tron GT' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'RS e-tron GT' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi RS e-tron GT concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
