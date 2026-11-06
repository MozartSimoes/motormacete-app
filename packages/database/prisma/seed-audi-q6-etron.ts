/**
 * Seed Audi Q6 e-tron — macetes, problemas, manutenção e calibragem
 * SUV 100% elétrico sobre a nova plataforma PPE (Premium Platform
 * Electric, arquitetura 800V), a mesma base do Porsche Macan elétrico.
 * Chegou ao Brasil em 2026, versões Performance quattro e Performance
 * Black quattro, bateria de 100 kWh, 387cv/535Nm, ~411 km de autonomia,
 * carregamento DC de até 270 kW (10-80% em ~21 min).
 * Execute: pnpm --filter @motormacete/database db:seed:audi-q6-etron
 *
 * Fontes: audi-imprensa.com.br (release oficial), conexaoautomotivabr.com,
 *         autopapo.com.br, canalve.com.br
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
    title: 'Plataforma nova (PPE) — não confunda peça/procedimento com o Q8 e-tron antigo',
    body: 'O Q6 e-tron usa a plataforma PPE (800V), completamente diferente da plataforma MLB evo do e-tron/Q8 e-tron mais antigo. Não presuma compatibilidade de peça entre eles — apesar do nome parecido, mecânica e sistema elétrico são projetos distintos. A base é compartilhada com o Porsche Macan elétrico, então oficina especializada em Macan elétrico também tende a entender bem do Q6 e-tron.',
  },
  {
    severity: 'OK',
    title: 'Arquitetura 800V permite carga rápida real — aproveite carregadores DC de alta potência',
    body: 'Com arquitetura elétrica de 800V, o Q6 e-tron consegue receber até 270 kW em carregador DC compatível, indo de 10% a 80% de carga em cerca de 21 minutos — bem mais rápido que carros de arquitetura 400V. Para aproveitar isso de verdade, procure carregadores de alta potência (não todo posto público oferece essa potência ainda no Brasil).',
  },
  {
    severity: 'OK',
    title: 'Carregue entre 20-80% no uso diário para preservar a bateria de 100 kWh',
    body: 'Mesmo com a tecnologia de bateria mais recente, o hábito de manter a carga entre 20-80% no dia a dia continua sendo a melhor prática para prolongar a vida útil — reserve os 100% só para viagens que precisem da autonomia máxima.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Lançamento muito recente no Brasil — sem histórico de confiabilidade local ainda',
    body: 'Por ter chegado ao mercado brasileiro apenas em 2026, ainda não há relato consistente de problema de uso real no país. Acompanhe grupos e fóruns de proprietários à medida que a frota cresce, em vez de assumir problemas de outras gerações Audi elétricas.',
  },
  {
    severity: 'WARN',
    title: 'Rede de assistência especializada em plataforma PPE ainda em formação no Brasil',
    body: 'Por ser uma plataforma nova, o número de técnicos treinados especificamente nela ainda é pequeno mesmo dentro da rede Audi — para qualquer problema fora do básico, confirme com a concessionária se a unidade já tem treinamento específico em PPE antes de agendar.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Q6 e-tron (elétrico, plataforma PPE)',
    body: '15.000-20.000 km ou anual — Inspeção geral (freios, suspensão, pneus, sistema de arrefecimento da bateria/eletrônica de 800V). | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT4. | Sempre — carregue entre 20-80% no uso diário. | Sempre — use o freio convencional de vez em quando para evitar oxidação do disco por baixo uso, mesmo com a regenerativa ativa.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Q6 E-TRON', yearFrom: 2026, yearTo: null, tireSize: '255/50 R20 (padrão) — varia conforme roda/versão Black', frontPsi: 34, rearPsi: 36, frontPsiLoad: 38, rearPsiLoad: 41, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Sem estepe (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Q6 E-TRON', yearFrom: 2026, yearTo: null, component: 'Inspeção geral (freios, suspensão, pneus)', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 0 },
  { modelName: 'Q6 E-TRON', yearFrom: 2026, yearTo: null, component: 'Fluido de freio DOT4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'Q6 E-TRON', yearFrom: 2026, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 2 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Q6 E-TRON', yearFrom: 2026, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Audi Q6 e-tron...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Q6 E-TRON', brandId: brand.id } },
    update: {}, create: { name: 'Q6 E-TRON', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Q6 E-TRON' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Q6 E-TRON' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Q6 E-TRON' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi Q6 e-tron concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
