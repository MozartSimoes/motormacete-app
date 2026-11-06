/**
 * Seed Audi RS7 — macetes, problemas, manutenção e calibragem de pneus
 * Sportback (liftback 4 portas) super-esportivo, 2 gerações:
 *  - C7 (2014-2018): V8 4.0 TFSI biturbo sem hibridização.
 *  - C8 (2019+, atual): V8 4.0 TFSI biturbo com mild hybrid 48V, mesmo
 *    motor do RS6 C8 e RS Q8.
 * Execute: pnpm --filter @motormacete/database db:seed:audi-rs7
 *
 * Fontes: en.wikipedia.org, gazetadopovo.com.br, comprecar.com.br,
 *         mercadolivre.com.br/blog
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── C7 (2014-2018) — V8 4.0 TFSI sem hibridização ─────────────────────────
const MACETES_C7: TipInput[] = [
  { severity: 'OK', title: 'V8 4.0 TFSI biturbo "puro" — sem componente híbrido para se preocupar', body: 'Diferente da geração atual, esse motor não tem sistema mild hybrid — mais simples de manter nesse aspecto específico, sem bateria de 48V ou motor-gerador integrado ao virabrequim para monitorar.' },
]
const PROBLEMAS_C7: TipInput[] = [
  { severity: 'WARN', title: 'Acúmulo de carbono nas válvulas de admissão', body: 'Motor de injeção direta pura — acúmulo de carbono nas válvulas é característica conhecida dessa família de motor V8 TFSI, com sintoma de marcha lenta irregular ao longo do tempo. Limpeza preventiva entre 80.000-100.000 km evita que avance.' },
]
const MANUTENCAO_C7: TipInput[] = [
  { severity: 'OK', title: 'Cronograma RS7 C7 (V8 4.0 TFSI)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 40.000 km — Fluido de freio DOT4. | 60.000-80.000 km — Fluido do câmbio tiptronic. | 80.000-100.000 km — Limpeza preventiva de carbono nas válvulas de admissão.' },
]

// ─── C8 (2019+) — V8 4.0 TFSI mild hybrid ──────────────────────────────────
const MACETES_C8: TipInput[] = [
  { severity: 'OK', title: 'Motor compartilhado com RS6 e RS Q8 — peça e diagnóstico intercambiáveis', body: 'O V8 4.0 TFSI mild hybrid dessa geração é o mesmo do RS6 Avant e do RS Q8. Para peça ou diagnóstico difícil de achar, busque também por esses dois modelos.' },
  { severity: 'WARN', title: 'Manutenção extremamente cara — pesquise o custo real antes de comprar', body: 'Assim como o RS6 Avant da mesma plataforma, o custo de manutenção é bem acima da média mesmo para carro de luxo — freio, suspensão e peça de motor têm preço elevado. Pesquise custo de manutenção na sua região antes de fechar a compra, não confie só no preço do carro.' },
  { severity: 'OK', title: 'Suspensão a ar: fique atento à altura em repouso', body: 'Mudança perceptível na altura do carro parado é sinal precoce de vazamento no sistema de suspensão pneumática — mais barato resolver cedo que depois do sistema falhar por completo.' },
]
const PROBLEMAS_C8: TipInput[] = [
  { severity: 'WARN', title: 'Freio cerâmico (quando equipado): custo de reposição altíssimo', body: 'Se seu exemplar tem freio cerâmico opcional, considere que o custo de reposição é muito maior que freio de aço convencional — avalie se o seu uso real justifica manter essa opção ou trocar para disco convencional na próxima troca.' },
]
const MANUTENCAO_C8: TipInput[] = [
  { severity: 'OK', title: 'Cronograma RS7 C8 (V8 4.0 TFSI mild hybrid)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão a ar e níveis de fluido. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT4. | 60.000-80.000 km — Fluido do câmbio tiptronic. | Sempre — observe a altura da suspensão a ar em repouso.' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'RS7', yearFrom: 2014, yearTo: 2018, MACETES: MACETES_C7, PROBLEMAS: PROBLEMAS_C7, MANUTENCAO: MANUTENCAO_C7 },
  { modelName: 'RS7', yearFrom: 2019, yearTo: null, MACETES: MACETES_C8, PROBLEMAS: PROBLEMAS_C8, MANUTENCAO: MANUTENCAO_C8 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'RS7', yearFrom: 2014, yearTo: 2018, tireSize: '275/30 R21 (padrão)', frontPsi: 34, rearPsi: 32, frontPsiLoad: 38, rearPsiLoad: 36, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta.' },
  { modelName: 'RS7', yearFrom: 2019, yearTo: null, tireSize: '285/30 R22 (padrão) — varia conforme roda', frontPsi: 35, rearPsi: 33, frontPsiLoad: 39, rearPsiLoad: 38, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Sem estepe (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'RS7', yearFrom: 2014, yearTo: 2018, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'RS7', yearFrom: 2014, yearTo: 2018, component: 'Limpeza de carbono nas válvulas de admissão', intervalKm: 90000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 1 },
  { modelName: 'RS7', yearFrom: 2019, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 2 },
  { modelName: 'RS7', yearFrom: 2019, yearTo: null, component: 'Inspeção da suspensão a ar (altura em repouso)', intervalKm: null, intervalMonths: 6, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'RS7', yearFrom: 2019, yearTo: null, component: 'Fluido do câmbio tiptronic', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 4 },
]

async function main() {
  console.log('🚗 Seed Audi RS7...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'RS7', brandId: brand.id } },
    update: {}, create: { name: 'RS7', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'RS7' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'RS7' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'RS7' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi RS7 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
