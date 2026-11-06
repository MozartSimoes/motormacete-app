/**
 * Seed Audi RS3 — macetes, problemas, manutenção e calibragem de pneus
 * Hatch/sedan compacto esportivo (Sportback e Sedan), motor 2.5 TFSI 5
 * cilindros (o mesmo bloco do RS Q3), tração Quattro, câmbio S-tronic de
 * dupla embreagem. Geração atual (8Y, desde ~2018 no Brasil, com facelift).
 * Inclui a versão "Track" (edição limitada de pista).
 * Execute: pnpm --filter @motormacete/database db:seed:audi-rs3
 *
 * Fontes: myenginespecs.com, magodoscarros.com, mycarly.com,
 *         audizine.com, rs246.com (fórum internacional de entusiastas RS)
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
    title: 'Motor 2.5 TFSI 5 cilindros: mesmo bloco do RS Q3 — peça compartilhada',
    body: 'O motor 2.5 TFSI (5 cilindros, ~400cv) do RS3 é o mesmo bloco usado no RS Q3. Ao procurar peça de motor difícil de achar "para RS3", busque também por "motor 2.5 TFSI RS Q3/TT RS" — amplia a busca em peça original e em peça de reposição paralela sem perder compatibilidade.',
  },
  {
    severity: 'WARN',
    title: 'Óleo de qualidade e troca antecipada reduzem risco do problema conhecido de tensionador de corrente',
    body: 'O motor 2.5 TFSI tem histórico documentado de falha do tensionador da corrente de distribuição, geralmente entre 80.000 e 120.000 km — quando isso acontece, a corrente estica e a sincronização do motor é prejudicada, podendo causar dano grave. Trocar o óleo a cada 10.000 km (mais frequente que muitos manuais genéricos recomendam) com óleo de alta qualidade é a principal forma de reduzir esse risco.',
  },
  {
    severity: 'OK',
    title: 'Peça de alto desempenho: sempre confirme o pneu/roda correto por geração',
    body: 'O RS3 usa pneus de alto desempenho de dimensão específica que variam conforme a versão (Sedan/Sportback/Track) e o aro escolhido de fábrica — nunca troque para uma medida "parecida" de outro Audi sem confirmar na etiqueta da porta, isso afeta diretamente a resposta do sistema Quattro e do ABS.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Tensionador da corrente de distribuição — sintoma de perda de potência e consumo alto',
    body: 'Se notar perda de potência progressiva, aumento de consumo de combustível, ou ruído metálico diferente no motor, não continue rodando normalmente — pode ser o tensionador da corrente de distribuição no início de falha. No pior cenário, a corrente pula e causa dano grave ao motor. Diagnóstico precoce é bem mais barato que reparo depois do dano.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo por desgaste de anel de pistão',
    body: 'Como em outros motores TFSI de injeção direta, alguns exemplares consomem óleo acima do esperado por desgaste de anel de pistão, às vezes com fumaça azulada no escapamento. Verifique o nível de óleo entre as trocas programadas, não espere só a revisão para descobrir que o nível caiu.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma RS3 (2.5 TFSI)',
    body: '10.000 km — Troca de óleo do motor + filtro (use sempre óleo de especificação Audi de alta qualidade — é o principal fator de proteção do tensionador de corrente). | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT4. | 60.000 km — Velas de ignição. | 60.000 km — Inspeção da corrente de distribuição/tensionador — ponto de atenção conhecido desse motor. | 60.000-80.000 km — Fluido do câmbio S-tronic (dupla embreagem) — não é vitalício, mesmo em uso não esportivo.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'RS3', yearFrom: 2018, yearTo: null, tireSize: '235/35 R19 (padrão) — varia conforme roda/versão', frontPsi: 32, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 33, sparePsi: null, notes: 'Sem estepe na maioria das versões (kit reparador). Confirme sempre na etiqueta da coluna da porta — pressão de pneu de alto desempenho é sensível e afeta diretamente a resposta do Quattro.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'RS3', yearFrom: 2018, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Óleo de alta qualidade reduz risco do problema conhecido de tensionador de corrente.', priority: 'CRITICAL', order: 0 },
  { modelName: 'RS3', yearFrom: 2018, yearTo: null, component: 'Inspeção da corrente de distribuição/tensionador', intervalKm: 60000, intervalMonths: null, notes: 'Falha documentada entre 80.000-120.000 km em exemplares internacionais.', priority: 'HIGH', order: 1 },
  { modelName: 'RS3', yearFrom: 2018, yearTo: null, component: 'Fluido do câmbio S-tronic', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'RS3', yearFrom: 2018, yearTo: null, component: 'Fluido de freio DOT4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'RS3', yearFrom: 2018, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 4 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'RS3', yearFrom: 2018, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Audi RS3...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'RS3', brandId: brand.id } },
    update: {}, create: { name: 'RS3', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'RS3' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'RS3' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'RS3' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi RS3 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
