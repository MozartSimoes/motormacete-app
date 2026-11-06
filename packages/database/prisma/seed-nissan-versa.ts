/**
 * Seed Nissan Versa — macetes, problemas, manutenção e calibragem de pneus
 * Sedan compacto, duas gerações no Brasil: N17 (2012-2019) e N18
 * (2020-atual, com facelift em 2024 e nova geração confirmada para 2026,
 * mantendo o motor 1.6 flex aspirado). Câmbio manual ou CVT. A FIPE
 * também lista uma versão "1.0" (trims "VERSA 1.0 12V FlexStart" e
 * "V-DRIVE 1.0") — a imprensa especializada até 2026 dizia que o motor
 * 1.0 turbo 3 cilindros do Versa/Almera de outros mercados NÃO estava
 * previsto para o Brasil, então tratamos essa versão com cautela: sem
 * inventar cilindrada/potência não confirmada, só o que está documentado.
 * Execute: pnpm --filter @motormacete/database db:seed:nissan-versa
 *
 * Fontes: reclameaqui.com.br (histórico de class-action CVT nos EUA
 *         refletido em queixas no Brasil), vrum.com.br, saganissan.com.br,
 *         gruposentinela.com.br, autossegredos.com.br, motorshow.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── N17 (2012-2019) ────────────────────────────────────────────────────────
const MACETES_N17: TipInput[] = [
  {
    severity: 'WARN',
    title: 'CVT 2012-2014: troque o fluido NS-3 a cada 40.000 km, sem exceção',
    body: 'O câmbio CVT do Versa 2012-2014 foi alvo de ação coletiva nos EUA por falha prematura, e no Brasil soma centenas de reclamações registradas. A causa principal identificada é sempre o fluido NS-3 degradado. Para esses anos específicos, 40.000 km é o intervalo máximo recomendado — não vale a pena arriscar os R$ 8.000-15.000 de uma transmissão nova para economizar numa troca de fluido.',
  },
  {
    severity: 'OK',
    title: 'Corpo de borboleta sujo: causa mais provável do motor "morrer" no semáforo',
    body: 'Marcha lenta irregular e o motor "morrendo" ao parar é queixa frequente no Versa flex — antes de suspeitar de problema elétrico maior, peça limpeza do corpo de borboleta com reaprendizado eletrônico (custo baixo, R$100-200) — resolve a maioria dos casos.',
  },
]
const PROBLEMAS_N17: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CVT 2012-2014: falha prematura documentada com códigos de erro específicos',
    body: 'O CVT dessa faixa de anos falha prematuramente, com códigos de erro documentados P0846, P0965, P2859 e P0715 (sensores da valve body). A solução mais comum é a troca da valve body (R$2.000-4.000); em casos mais graves, troca completa da transmissão (acima de R$8.000). A prevenção real é a troca do fluido NS-3 a cada 40.000 km sem falta — não é opcional nesses anos.',
  },
  {
    severity: 'WARN',
    title: 'CVT — vibração ao partir e solavanco ao reduzir (todos os anos da geração N17)',
    body: 'Vibração ("shudder") ao sair do zero e solavanco ao reduzir velocidade é o problema mais relatado do Versa em geral, não só 2012-2014. Fluido NS-3 degradado é a causa na grande maioria dos casos — troca do fluido junto com limpeza do filtro do CVT resolve a maior parte, sem precisar de reparo mais caro.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedores traseiros: vida útil curta',
    body: 'Os amortecedores traseiros de fábrica têm vida útil relativamente curta — acima de 60.000 km, verifique se o carro "chacoalha" excessivamente em ondulações. Troca do par traseiro: R$400-800, não é item caro de resolver.',
  },
]
const MANUTENCAO_N17: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Versa N17 (2012-2019)',
    body: '10.000 km — Troca de óleo do motor 1.6 + filtro. | 10.000 km — Inspeção de freios e amortecedores traseiros (vida útil curta é característica). | 20.000 km — Filtro de ar e filtro de cabine. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio. | Fluido CVT NS-3: 40.000 km nos anos 2012-2014 (sem exceção), 50.000 km a partir de 2015. | Sempre — vibração/solavanco no CVT? Troque o fluido antes de suspeitar de reparo maior.',
  },
]

// ─── N18 (2020+, incl. facelift 2024 e nova geração 2026) ─────────────────
const MACETES_N18: TipInput[] = [
  {
    severity: 'OK',
    title: 'Facelift 2024 manteve a mesma motorização — peça/histórico de manutenção seguem valendo',
    body: 'O facelift de 2024 (nova grade, faróis full-LED, acabamento do painel) manteve o mesmo motor 1.6 aspirado (até 113cv/15,3 kgfm) e o mesmo câmbio CVT de 6 marchas simuladas — as dicas de manutenção e os cuidados com o CVT valem igual para exemplares antes e depois do facelift.',
  },
  {
    severity: 'WARN',
    title: 'CVT continua exigindo troca de fluido em dia, mesmo sendo geração mais nova',
    body: 'Apesar da falha catastrófica documentada ser mais associada aos anos 2012-2014 (geração anterior), o mesmo tipo de câmbio CVT com fluido NS-3 equipa a geração atual — o hábito de trocar o fluido a cada 50.000 km continua sendo o principal cuidado preventivo, não deixe de fazer só porque "é carro novo".',
  },
  {
    severity: 'OK',
    title: 'Versão "1.0" na tabela FIPE: confirme a motorização exata antes de comprar',
    body: 'A tabela FIPE lista trims "Versa 1.0"/"V-DRIVE 1.0" além da linha principal 1.6. Até a comunicação oficial mais recente da Nissan, o motor 1.0 turbo 3 cilindros do Versa vendido em outros mercados (badge "Almera") não era anunciado como parte da linha brasileira — se for comprar um exemplar anunciado como "1.0", confirme a ficha técnica exata (motor, potência, câmbio) diretamente na nota fiscal/documento do carro antes de fechar negócio, em vez de confiar só no anúncio.',
  },
]
const PROBLEMAS_N18: TipInput[] = [
  {
    severity: 'WARN',
    title: 'CVT — vibração ao partir e solavanco ao reduzir (mesmo padrão da geração anterior)',
    body: 'O mesmo padrão de "shudder" ao sair do zero e solavanco na redução, característico do CVT NS-3, se repete na geração atual. Fluido degradado é a causa mais provável — troca do fluido + limpeza do filtro resolve a maioria dos casos antes de precisar de reparo maior.',
  },
  {
    severity: 'OK',
    title: 'Corpo de borboleta sujo: mesma causa provável para marcha lenta irregular',
    body: 'Assim como na geração anterior, motor "morrendo" ao parar no semáforo geralmente tem causa simples e barata (corpo de borboleta sujo) — peça a limpeza com reaprendizado eletrônico antes de aceitar diagnóstico mais caro.',
  },
]
const MANUTENCAO_N18: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Versa N18 (2020+)',
    body: '10.000 km — Troca de óleo do motor 1.6 + filtro. | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar e filtro de cabine. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio. | 50.000 km — Fluido CVT NS-3 — não pule esse item mesmo em carro mais novo. | Sempre — vibração/solavanco no CVT indica fluido degradado antes de qualquer coisa mais séria.',
  },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Versa', yearFrom: 2012, yearTo: 2019, MACETES: MACETES_N17, PROBLEMAS: PROBLEMAS_N17, MANUTENCAO: MANUTENCAO_N17 },
  { modelName: 'Versa', yearFrom: 2020, yearTo: null, MACETES: MACETES_N18, PROBLEMAS: PROBLEMAS_N18, MANUTENCAO: MANUTENCAO_N18 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Versa', yearFrom: 2012, yearTo: 2019, tireSize: '185/65 R15', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: 'N17 (2012-2019), versão 1.6 aro 15.' },
  { modelName: 'Versa', yearFrom: 2020, yearTo: null, tireSize: '195/55 R16', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: 'N18 (2020+), aro 16 nas versões Advance/Exclusive/SL/SR. Confirme o valor exato do seu aro na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Versa', yearFrom: 2012, yearTo: 2019, component: 'Óleo do motor 1.6 + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Versa', yearFrom: 2012, yearTo: 2019, component: 'Fluido do câmbio CVT (NS-3)', intervalKm: 40000, intervalMonths: null, notes: '40.000 km é o máximo recomendado para 2012-2014 — falha catastrófica documentada nesses anos sem troca em dia.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Versa', yearFrom: 2012, yearTo: 2019, component: 'Inspeção dos amortecedores traseiros', intervalKm: 60000, intervalMonths: null, notes: 'Vida útil curta é característica documentada do modelo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Versa', yearFrom: 2012, yearTo: 2019, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'Versa', yearFrom: 2012, yearTo: 2019, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'Versa', yearFrom: 2012, yearTo: 2019, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'Versa', yearFrom: 2020, yearTo: null, component: 'Óleo do motor 1.6 + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 6 },
  { modelName: 'Versa', yearFrom: 2020, yearTo: null, component: 'Fluido do câmbio CVT (NS-3)', intervalKm: 50000, intervalMonths: null, notes: 'Não pule esse item mesmo em exemplar mais novo — mesmo tipo de câmbio da geração anterior.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Versa', yearFrom: 2020, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'Versa', yearFrom: 2020, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'Versa', yearFrom: 2020, yearTo: null, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
]

async function main() {
  console.log('🚗 Seed Nissan Versa...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Nissan', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Nissan', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Versa', brandId: brand.id } },
    update: {}, create: { name: 'Versa', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Versa' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Versa' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Versa' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Nissan Versa concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
