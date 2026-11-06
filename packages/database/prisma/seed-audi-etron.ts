/**
 * Seed Audi e-tron (SUV) — macetes, problemas, manutenção e calibragem
 * Primeiro SUV 100% elétrico da Audi (plataforma MLB evo, 2019-2023),
 * carroceria SUV e Sportback (coupé-SUV), incluindo a versão tri-motor "e-tron
 * S" de alta performance. Em 2023 essa geração foi rebatizada "Q8 e-tron"
 * com bateria maior — ver arquivo seed-audi-q8-etron.ts para a versão
 * atual. Como o nome "E-TRON" aparece dentro do nome de praticamente todo
 * modelo elétrico da marca na FIPE (E-TRON GT, Q6 E-TRON, Q8 E-TRON...), o
 * casamento por palavra pode fazer esses macetes aparecerem também nessas
 * páginas — mantive o texto genérico o suficiente para não conflitar
 * tecnicamente com os outros modelos.
 * Execute: pnpm --filter @motormacete/database db:seed:audi-etron
 *
 * Fontes: autorealidade.com.br, problemaserecalls.com,
 *         mecanicaonline.com.br, e-tronforum.com, conexaoautomotivabr.com
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
    title: 'Foi rebatizado "Q8 e-tron" em 2023 — mesma base mecânica, bateria maior',
    body: 'Se o seu e-tron é anterior a 2023, saiba que a Audi manteve praticamente a mesma plataforma e trocou o nome para "Q8 e-tron" a partir do facelift, com bateria de maior capacidade. Peça de suspensão, freio e carroceria costuma ser compatível entre as duas gerações — ao procurar peça, busque também por "Q8 e-tron" além de "e-tron".',
  },
  {
    severity: 'OK',
    title: 'Dois níveis de frenagem regenerativa — use o nível mais forte no dia a dia',
    body: 'O sistema oferece dois níveis de recuperação de energia na frenagem. Usar o nível mais forte no trânsito urbano reduz bastante o uso do freio a disco convencional (menos desgaste de pastilha) e recupera mais energia para a bateria — vale o hábito mesmo que exija um pouco de adaptação na condução.',
  },
  {
    severity: 'OK',
    title: 'Carregue entre 20-80% no uso diário para preservar a bateria',
    body: 'Reserve o carregamento até 100% só para viagens que realmente precisem da autonomia máxima — no uso diário, manter a carga entre 20-80% prolonga a vida útil da bateria de alta tensão.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Módulo de bateria de alta tensão — fique atento a alertas de carga/descarga anômala',
    body: 'Há registros de falha em módulos da bateria de alta tensão que podem causar comportamento anômalo de carga/descarga e, em casos raros, superaquecimento com risco de incêndio. Qualquer alerta relacionado à bateria no painel ou comportamento de carga muito diferente do normal deve ser levado à concessionária imediatamente — não é algo para "esperar piorar".',
  },
  {
    severity: 'WARN',
    title: 'Itens elétricos e de freio são as queixas mais reportadas',
    body: 'Entre os problemas mais reportados por proprietários estão itens do sistema elétrico geral e do sistema de freio (à parte da bateria em si) — vale prestar atenção a qualquer luz de alerta no painel e não ignorar comportamento estranho do pedal de freio, mesmo sendo carro relativamente novo.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma e-tron SUV (elétrico)',
    body: '15.000-20.000 km ou anual — Inspeção geral (freios, suspensão, pneus, sistema de arrefecimento da bateria). | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT4. | Sempre — carregue entre 20-80% no uso diário. | Sempre — use o freio convencional de vez em quando mesmo com a regenerativa fazendo a maior parte do trabalho, evita oxidação do disco por baixo uso. | Sem troca de óleo, filtro de óleo ou vela.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'E-TRON', yearFrom: 2019, yearTo: 2023, tireSize: '255/55 R19 (padrão) — varia conforme roda/versão', frontPsi: 35, rearPsi: 38, frontPsiLoad: 38, rearPsiLoad: 42, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta — SUV elétrico pesado, pressão correta é importante para autonomia e comportamento. Sem estepe (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'E-TRON', yearFrom: 2019, yearTo: 2023, component: 'Inspeção geral (freios, suspensão, pneus)', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 0 },
  { modelName: 'E-TRON', yearFrom: 2019, yearTo: 2023, component: 'Monitoramento de alertas de bateria de alta tensão', intervalKm: null, intervalMonths: 1, notes: 'Qualquer alerta ou comportamento de carga anômalo exige contato imediato com a concessionária.', priority: 'CRITICAL', order: 1 },
  { modelName: 'E-TRON', yearFrom: 2019, yearTo: 2023, component: 'Fluido de freio DOT4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'E-TRON', yearFrom: 2019, yearTo: 2023, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 3 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'E-TRON', yearFrom: 2019, yearTo: 2023, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Audi e-tron (SUV)...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'E-TRON', brandId: brand.id } },
    update: {}, create: { name: 'E-TRON', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'E-TRON' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'E-TRON' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'E-TRON' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi e-tron (SUV) concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
