/**
 * Seed BYD Yuan Plus (Atto 3) — macetes, problemas, manutenção e calibragem
 * SUV compacto 100% elétrico, motor dianteiro, bateria Blade LFP.
 * IMPORTANTE: a FIPE cataloga esse veículo no Brasil como "Yuan Plus"
 * (inclusive a versão de maior desempenho "Yuan Plus AWD") — "Atto 3" é
 * o nome usado pela BYD em outros mercados (Europa, Austrália, Tailândia).
 * O modelName usado aqui é 'Yuan Plus' de propósito, para casar com a
 * string real da FIPE — o seed.ts antigo usava 'Atto 3', que NUNCA
 * batia com nenhum veículo real da tabela FIPE (bug corrigido nesta
 * migração). Migrado do seed.ts histórico (conteúdo original
 * preservado) + MaintenanceItem que faltava.
 * Execute: pnpm --filter @motormacete/database db:seed:byd-atto3
 *
 * Fontes: reclameaqui.com.br, mobiauto.com.br, byd.com, cnnbrasil.com.br
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
  { severity: 'OK', title: 'Internacionalmente vendido como Atto 3 — mesmo veículo', body: 'O Yuan Plus (nome usado no Brasil) e o Atto 3 (nome usado na Europa, Austrália e outros mercados) são o mesmo veículo. Dicas, boletins técnicos e informações publicadas lá fora sob o nome Atto 3 se aplicam integralmente ao Yuan Plus daqui.' },
  { severity: 'OK', title: 'Limite de carga em 80% para uso diário', body: 'Configure o limite de carga em 80% para uso diário no menu de carregamento. A bateria LFP aceita cargas a 100% sem grandes danos, mas manter abaixo de 90% prolonga a vida útil a longo prazo.' },
  { severity: 'OK', title: 'Versão Yuan Plus AWD: dois motores, mais performance', body: 'A versão AWD tem motor em cada eixo (dianteiro + traseiro), entregando tração integral e aceleração bem superior à versão de motor único. Mecânica de tração é mais complexa — confirme se sua unidade é AWD antes de orçar peça de transmissão/motor.' },
]

const PROBLEMAS: TipInput[] = [
  { severity: 'OK', title: 'Recall de direção na China (2022-2023) não afeta unidades do Brasil', body: 'Em 2025 a BYD convocou recall na China para cerca de 97.000 Dolphin e Yuan Plus fabricados entre novembro/2022 e dezembro/2023 por risco de incêndio na unidade de controle de direção. A BYD Brasil esclareceu oficialmente que a medida é exclusiva do mercado chinês (linha de produção diferente da usada para exportação) e NÃO afeta unidades vendidas no Brasil. Fica o registro para quem pesquisa notícia internacional e se preocupa à toa — não é motivo de alarme para carros comprados aqui.' },
  { severity: 'WARN', title: 'Autonomia real: ~320 km em condições reais', body: 'A autonomia WLTP de 420 km é atingida em condições ideais. Na realidade brasileira (calor, AC, estradas imperfeitas), espere 300–340 km. Planeje paradas de recarga com margem.' },
  { severity: 'OK', title: 'Interior inovador mas polarizador', body: 'O interior do Yuan Plus com os elásticos na porta e o design futurista pode causar estranhamento. Não é um problema — é design intencional. Alguns acessórios de armazenamento adicionais são úteis.' },
]

const MANUTENCAO: TipInput[] = [
  { severity: 'OK', title: 'Sem óleo, sem correia — elétrico puro', body: 'Motor elétrico sem manutenção de óleo. Foco em: fluido de freio (2 anos), arrefecimento da bateria (5 anos), pneus (rotação a cada 10.000 km), filtro de cabine (12 meses).' },
  { severity: 'OK', title: 'Cronograma Yuan Plus/Atto 3 (BYD + ajuste uso severo BR)', body: '10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 10.000 km — Rotação de pneus (atenção redobrada nos traseiros na versão AWD). | 12 meses — Filtro de cabine. | 24 meses — Fluido de freio DOT 4. | 5 anos/100.000 km — Fluido de arrefecimento da bateria (inspecionar a cada 2 anos).' },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Yuan Plus', yearFrom: 2023, yearTo: null, tireSize: '215/55 R18', frontPsi: 36, rearPsi: 33, frontPsiLoad: 38, rearPsiLoad: 36, sparePsi: null, notes: 'Também vendido como Atto 3 em outros mercados. Versão AWD: confirme calibragem na etiqueta, pode ter ajuste diferente nos dois eixos. Sem estepe.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Yuan Plus', yearFrom: 2023, yearTo: null, component: 'Inspeção de freios, suspensão e níveis de fluido', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 0 },
  { modelName: 'Yuan Plus', yearFrom: 2023, yearTo: null, component: 'Rotação de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Versão AWD: atenção redobrada nos traseiros.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Yuan Plus', yearFrom: 2023, yearTo: null, component: 'Filtro de cabine', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'Yuan Plus', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Yuan Plus', yearFrom: 2023, yearTo: null, component: 'Fluido de arrefecimento da bateria', intervalKm: 100000, intervalMonths: 60, notes: 'Inspecionar a cada 2 anos, substituir a cada 5 anos/100.000 km.', priority: 'HIGH', order: 4 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Yuan Plus', yearFrom: 2023, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed BYD Yuan Plus (Atto 3)...')
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
  console.log('✅ BYD Yuan Plus (Atto 3) concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
