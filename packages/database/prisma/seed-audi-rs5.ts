/**
 * Seed Audi RS5 — macetes, problemas, manutenção e calibragem de pneus
 * Coupé/Sportback esportivo, 2 gerações vendidas no Brasil:
 *  - B8 (2010-2015): V8 4.2 FSI aspirado, câmbio S-tronic, coupé 2 portas.
 *  - B9 (2018+, atual): V6 2.9 TFSI biturbo, câmbio tiptronic, Coupé e
 *    Sportback, incluindo as edições especiais "Competition Plus"/"Track".
 * Execute: pnpm --filter @motormacete/database db:seed:audi-rs5
 *
 * Fontes: audizine.com, a5oc.com, forums.audirevolution.net,
 *         034motorsport.com, rs246.com
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── B8 (2010-2015) — V8 4.2 FSI ───────────────────────────────────────────
const MACETES_B8: TipInput[] = [
  { severity: 'OK', title: 'V8 4.2 FSI aspirado — mesmo motor do RS4 B8, peça compartilhada', body: 'O motor V8 4.2 FSI aspirado é compartilhado com o RS4 B8 da mesma época. Para peça difícil de achar "para RS5", busque também por "RS4 B8" — mecânica de motor praticamente idêntica.' },
  { severity: 'WARN', title: 'Manutenção de V8 aspirado de alta rotação — não atrase troca de óleo', body: 'É um motor que gira em rotações altas com frequência em uso esportivo — óleo de qualidade e troca em dia protegem bem mais que em motores de uso urbano comum. Nunca ultrapasse o intervalo recomendado, principalmente se usado com regularidade em modo esportivo.' },
]
const PROBLEMAS_B8: TipInput[] = [
  { severity: 'WARN', title: 'Consumo de óleo em quilometragem mais alta', body: 'Como no RS4 B8, alguns exemplares apresentam consumo de óleo acima do esperado com o aumento da quilometragem — verifique nível entre trocas.' },
]
const MANUTENCAO_B8: TipInput[] = [
  { severity: 'OK', title: 'Cronograma RS5 B8 (V8 4.2 FSI)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT4. | 60.000 km — Velas de ignição. | 60.000-80.000 km — Fluido do câmbio S-tronic.' },
]

// ─── B9 (2018+) — V6 2.9 TFSI biturbo ──────────────────────────────────────
const MACETES_B9: TipInput[] = [
  { severity: 'OK', title: 'Motor 2.9 V6 TFSI compartilhado com o RS4 B9 — peça e diagnóstico intercambiáveis', body: 'Mesmo motor do RS4 B9 (arquitetura EA839). Para peça ou diagnóstico difícil de achar "para RS5", busque também por "RS4 B9"/"motor 2.9 TFSI Audi".' },
  { severity: 'WARN', title: 'Acúmulo de carbono nas válvulas de admissão', body: 'Motor de injeção direta pura — acúmulo de carbono nas válvulas de admissão é característica conhecida, com sintoma de marcha lenta irregular ou leve perda de resposta ao longo do tempo. Limpeza preventiva entre 80.000-100.000 km evita que avance a ponto de precisar remoção do motor.' },
  { severity: 'WARN', title: 'Não use aditivo de combustível não aprovado pela Audi', body: 'Boletim técnico da fabricante desaconselha aditivo de combustível não homologado para esse motor — use só o recomendado pelo manual/concessionária.' },
  { severity: 'OK', title: 'Versões Competition Plus/Track: componentes de suspensão e freio específicos', body: 'As edições especiais Sportback Competition Plus e Track trazem suspensão e freios ajustados/reforçados em relação à versão padrão — ao procurar peça de reposição para essas versões, confirme se é a peça específica da edição especial, não a versão padrão do RS5.' },
]
const PROBLEMAS_B9: TipInput[] = [
  { severity: 'WARN', title: 'Sistema de ventilação do cárter (PCV) com projeto sensível', body: 'Mesmo ponto de atenção documentado no RS4 B9 — o sistema PCV desse motor pode permitir óleo entrar na admissão via turbo, favorecendo acúmulo de carbono. Um catch can instalado por oficina especializada é solução usada por entusiastas, avalie com oficina de confiança.' },
]
const MANUTENCAO_B9: TipInput[] = [
  { severity: 'OK', title: 'Cronograma RS5 B9 (V6 2.9 TFSI biturbo)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT4. | 60.000 km — Velas de ignição. | 60.000-80.000 km — Fluido do câmbio tiptronic. | 80.000-100.000 km — Limpeza preventiva de carbono nas válvulas de admissão.' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'RS5', yearFrom: 2010, yearTo: 2015, MACETES: MACETES_B8, PROBLEMAS: PROBLEMAS_B8, MANUTENCAO: MANUTENCAO_B8 },
  { modelName: 'RS5', yearFrom: 2018, yearTo: null, MACETES: MACETES_B9, PROBLEMAS: PROBLEMAS_B9, MANUTENCAO: MANUTENCAO_B9 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'RS5', yearFrom: 2010, yearTo: 2015, tireSize: '275/30 R20 (padrão) — varia conforme roda', frontPsi: 33, rearPsi: 31, frontPsiLoad: 36, rearPsiLoad: 34, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta.' },
  { modelName: 'RS5', yearFrom: 2018, yearTo: null, tireSize: '275/30 R20 (padrão) — varia conforme roda/versão', frontPsi: 33, rearPsi: 31, frontPsiLoad: 36, rearPsiLoad: 34, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Sem estepe (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'RS5', yearFrom: 2010, yearTo: 2015, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'RS5', yearFrom: 2010, yearTo: 2015, component: 'Fluido do câmbio S-tronic', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'RS5', yearFrom: 2018, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 2 },
  { modelName: 'RS5', yearFrom: 2018, yearTo: null, component: 'Limpeza de carbono nas válvulas de admissão', intervalKm: 90000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'RS5', yearFrom: 2018, yearTo: null, component: 'Fluido do câmbio tiptronic', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 4 },
]

async function main() {
  console.log('🚗 Seed Audi RS5...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'RS5', brandId: brand.id } },
    update: {}, create: { name: 'RS5', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'RS5' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'RS5' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'RS5' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi RS5 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
