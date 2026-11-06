/**
 * Seed Audi RS6 — macetes, problemas, manutenção e calibragem de pneus
 * Perua/Avant super-esportiva, 3 gerações na FIPE brasileira:
 *  - C5 (2002-2004): V8 4.2 biturbo 450cv, câmbio tiptronic, sedan e Avant.
 *  - C6 (2008-2010): V10 5.0 biturbo, o motor mais extremo já usado num
 *    Audi de série, câmbio tiptronic, Avant.
 *  - C8 (2020+, atual): V8 4.0 TFSI biturbo com hibridização leve (mild
 *    hybrid 48V), Avant, incluindo versão "Performance".
 * Execute: pnpm --filter @motormacete/database db:seed:audi-rs6
 *
 * Fontes: en.wikipedia.org/wiki/Audi_RS_6, gazetadopovo.com.br,
 *         comprecar.com.br, autoestatisticas.com.br, motorvicio.com
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── C5 (2002-2004) — V8 4.2 biturbo ───────────────────────────────────────
const MACETES_C5: TipInput[] = [
  { severity: 'OK', title: 'Exemplar de colecionador — priorize histórico de manutenção sobre baixa km', body: 'Com mais de 20 anos, o que mais importa na compra não é a quilometragem, é o histórico de manutenção documentado — motor biturbo antigo sem manutenção regular envelhece muito mal, mesmo rodando pouco.' },
]
const PROBLEMAS_C5: TipInput[] = [
  { severity: 'WARN', title: 'Turbina e chicote elétrico envelhecidos são os pontos mais prováveis de falha', body: 'Em motor biturbo dessa idade, desgaste de turbina e degradação de chicote/conectores elétricos são as causas mais comuns de problema — exija inspeção especializada antes de comprar.' },
]
const MANUTENCAO_C5: TipInput[] = [
  { severity: 'OK', title: 'Cronograma RS6 C5 — uso de colecionador', body: 'Anual — Troca de óleo do motor + filtro, mesmo com pouco uso. | Anual — Inspeção de mangueiras, correias e vazamentos. | A cada 2 anos — Fluido de freio.' },
]

// ─── C6 (2008-2010) — V10 5.0 biturbo ──────────────────────────────────────
const MACETES_C6: TipInput[] = [
  { severity: 'OK', title: 'V10 biturbo — motor mais complexo e mais caro de manter de toda a linha RS', body: 'O V10 5.0 biturbo do C6 é derivado do motor usado no Lamborghini Gallardo da mesma época — extremamente potente, mas também o mais caro de manter entre todos os RS6. Reserve orçamento bem maior para peça e mão de obra que qualquer outro Audi RS.' },
  { severity: 'WARN', title: 'Peça praticamente só sob encomenda — planeje com antecedência', body: 'Por ser um motor de baixíssimo volume de produção, praticamente toda peça de motor é sob encomenda importada. Não é carro para "resolver na hora" — qualquer manutenção maior exige planejamento de semanas.' },
]
const PROBLEMAS_C6: TipInput[] = [
  { severity: 'DANGER', title: 'Motor de altíssima complexidade — só confie em oficina especializada em Audi/motores V10', body: 'Diagnóstico ou reparo malfeito num V10 biturbo desse porte pode custar uma fortuna a mais para corrigir depois. Nunca leve para oficina genérica — só concessionária ou especialista com histórico comprovado nesse motor específico.' },
]
const MANUTENCAO_C6: TipInput[] = [
  { severity: 'OK', title: 'Cronograma RS6 C6 (V10 5.0 biturbo)', body: '10.000 km — Troca de óleo do motor + filtro (rigorosamente em dia, motor de altíssima performance). | 10.000 km — Inspeção de freios, suspensão, turbinas e vazamentos. | 40.000 km — Fluido de freio DOT4. | 60.000-80.000 km — Fluido do câmbio tiptronic. | Sempre — qualquer ruído ou perda de desempenho exige diagnóstico especializado imediato, não é motor para "esperar para ver".' },
]

// ─── C8 (2020+) — V8 4.0 TFSI mild hybrid ──────────────────────────────────
const MACETES_C8: TipInput[] = [
  { severity: 'OK', title: 'Motor compartilhado com RS7 e RS Q8 — peça e diagnóstico intercambiáveis', body: 'O V8 4.0 TFSI biturbo com mild hybrid 48V é o mesmo motor (com calibração própria) do RS7 e do RS Q8 dessa geração. Para peça ou diagnóstico difícil de achar, busque também por esses dois modelos.' },
  { severity: 'WARN', title: 'Manutenção extremamente cara — pesquise antes de comprar, não só depois', body: 'Manutenção do RS6 Avant atual tem custo bem acima da média mesmo para padrão de carro de luxo — chegou a viralizar no Brasil um orçamento de revisão na casa de centenas de milhares de reais, e a Audi confirmou que um jogo completo de freios pode passar de R$ 100 mil. Antes de comprar, pesquise o custo real de manutenção na sua região, não confie só no preço de compra.' },
  { severity: 'OK', title: 'Suspensão a ar: rigidez adaptativa reduz desgaste, mas conserto é caro', body: 'A suspensão pneumática adaptativa melhora conforto e handling, mas quando falha o reparo é significativamente mais caro que suspensão convencional. Fique atento a mudança na altura do carro em repouso — sinal precoce de vazamento no sistema pneumático, mais barato de resolver cedo.' },
]
const PROBLEMAS_C8: TipInput[] = [
  { severity: 'WARN', title: 'Freio cerâmico (quando equipado): durabilidade maior, mas custo de reposição altíssimo', body: 'Discos de freio cerâmico duram mais que os de aço convencional, mas quando chega a hora de trocar, o custo é muito maior. Vale entender se sua rotina de uso realmente justifica o freio cerâmico (uso frequente em alta performance) antes de optar por essa versão.' },
]
const MANUTENCAO_C8: TipInput[] = [
  { severity: 'OK', title: 'Cronograma RS6 C8 (V8 4.0 TFSI mild hybrid)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão a ar e níveis de fluido. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT4 (atenção redobrada se equipado com freio cerâmico). | 60.000-80.000 km — Fluido do câmbio tiptronic. | Sempre — observe a altura da suspensão a ar em repouso, mudança perceptível é sinal precoce de vazamento pneumático.' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'RS6', yearFrom: 2002, yearTo: 2004, MACETES: MACETES_C5, PROBLEMAS: PROBLEMAS_C5, MANUTENCAO: MANUTENCAO_C5 },
  { modelName: 'RS6', yearFrom: 2008, yearTo: 2010, MACETES: MACETES_C6, PROBLEMAS: PROBLEMAS_C6, MANUTENCAO: MANUTENCAO_C6 },
  { modelName: 'RS6', yearFrom: 2020, yearTo: null, MACETES: MACETES_C8, PROBLEMAS: PROBLEMAS_C8, MANUTENCAO: MANUTENCAO_C8 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'RS6', yearFrom: 2002, yearTo: 2004, tireSize: '255/40 R18 (referência C5)', frontPsi: 33, rearPsi: 31, frontPsiLoad: 36, rearPsiLoad: 34, sparePsi: null, notes: 'Exemplar raro — confirme com especialista/manual do proprietário específico.' },
  { modelName: 'RS6', yearFrom: 2008, yearTo: 2010, tireSize: '285/30 R20 (padrão)', frontPsi: 33, rearPsi: 33, frontPsiLoad: 38, rearPsiLoad: 38, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta.' },
  { modelName: 'RS6', yearFrom: 2020, yearTo: null, tireSize: '285/30 R22 (padrão) — varia conforme roda', frontPsi: 35, rearPsi: 33, frontPsiLoad: 39, rearPsiLoad: 38, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Sem estepe (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'RS6', yearFrom: 2002, yearTo: 2004, component: 'Óleo do motor + filtro', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 0 },
  { modelName: 'RS6', yearFrom: 2008, yearTo: 2010, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor V10 de altíssima performance — nunca atrase.', priority: 'CRITICAL', order: 1 },
  { modelName: 'RS6', yearFrom: 2008, yearTo: 2010, component: 'Inspeção de turbinas e vazamentos', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'RS6', yearFrom: 2020, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 3 },
  { modelName: 'RS6', yearFrom: 2020, yearTo: null, component: 'Inspeção da suspensão a ar (altura em repouso)', intervalKm: null, intervalMonths: 6, notes: 'Mudança perceptível de altura é sinal precoce de vazamento pneumático.', priority: 'HIGH', order: 4 },
  { modelName: 'RS6', yearFrom: 2020, yearTo: null, component: 'Fluido do câmbio tiptronic', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 5 },
]

async function main() {
  console.log('🚗 Seed Audi RS6...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'RS6', brandId: brand.id } },
    update: {}, create: { name: 'RS6', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'RS6' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'RS6' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'RS6' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi RS6 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
