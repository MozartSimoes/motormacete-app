/**
 * Seed Audi RS4 — macetes, problemas, manutenção e calibragem de pneus
 * Perua/Avant esportiva, 3 gerações distintas vendidas/importadas ao Brasil:
 *  - B5 (2000-2001): V6 2.7 biturbo 380cv, rarissima no Brasil.
 *  - B8 (2012-2015): V8 4.2 FSI aspirado, câmbio S-tronic, Avant.
 *  - B9 (2018+, atual): V6 2.9 TFSI biturbo, câmbio tiptronic automático.
 * Execute: pnpm --filter @motormacete/database db:seed:audi-rs4
 *
 * Fontes: audizine.com, audiworld.com, a5oc.com, 034motorsport.com,
 *         rs246.com
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── B5 (2000-2001) — V6 2.7 biturbo ───────────────────────────────────────
const MACETES_B5: TipInput[] = [
  { severity: 'OK', title: 'Exemplar raríssimo no Brasil — documente tudo antes de comprar', body: 'A geração B5 foi vendida por pouquíssimo tempo e quase não teve importação oficial para o Brasil — exemplares por aqui são praticamente todos de importação particular. Antes de comprar, confirme documentação de nacionalização e histórico de manutenção completo, peça é praticamente só sob encomenda importada.' },
]
const PROBLEMAS_B5: TipInput[] = [
  { severity: 'WARN', title: 'Motor biturbo antigo — turbo e chicote elétrico são os pontos de atenção', body: 'Em motores biturbo dessa idade (25+ anos), turbina e chicote elétrico envelhecido são as causas mais comuns de problema. Antes de comprar, exija teste de compressão e inspeção de vazamento de óleo/pressão de turbo por oficina especializada em Audi antigo.' },
]
const MANUTENCAO_B5: TipInput[] = [
  { severity: 'OK', title: 'Cronograma RS4 B5 — uso de colecionador', body: '5.000-10.000 km ou anual — Troca de óleo do motor + filtro, mesmo com pouco uso (óleo degrada com o tempo, não só com km). | Anual — Inspeção de mangueiras, correias e vazamentos (borracha ressecada é o principal risco em carro de baixa quilometragem anual). | A cada 2 anos — Fluido de freio, mesmo sem uso intenso.' },
]

// ─── B8 (2012-2015) — V8 4.2 FSI ───────────────────────────────────────────
const MACETES_B8: TipInput[] = [
  { severity: 'OK', title: 'V8 4.2 FSI aspirado — sem turbo, motor considerado mais "simples" que os biturbo', body: 'A geração B8 usa um V8 aspirado (sem turbo), o que elimina parte dos pontos de falha típicos de motor turbo (turbina, intercooler). Em compensação, é um motor de alta rotação que exige troca de óleo rigorosa — nunca atrase.' },
  { severity: 'WARN', title: 'Peça de manutenção cara — pesquise fornecedor antes de fechar orçamento', body: 'Peça de reposição para o V8 4.2 FSI (correntes, bombas, sensores) é significativamente mais cara que motores 4 ou 6 cilindros da própria Audi. Vale pesquisar fornecedores especializados em peça de performance importada antes de aceitar o primeiro orçamento de concessionária.' },
]
const PROBLEMAS_B8: TipInput[] = [
  { severity: 'WARN', title: 'Consumo de óleo em quilometragem mais alta', body: 'Como outros motores de injeção direta da época, alguns exemplares apresentam consumo de óleo acima do esperado com o aumento da quilometragem. Verifique nível entre trocas, principalmente antes de viagens longas.' },
]
const MANUTENCAO_B8: TipInput[] = [
  { severity: 'OK', title: 'Cronograma RS4 B8 (V8 4.2 FSI)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT4. | 60.000 km — Velas de ignição. | 60.000-80.000 km — Fluido do câmbio S-tronic.' },
]

// ─── B9 (2018+) — V6 2.9 TFSI biturbo ──────────────────────────────────────
const MACETES_B9: TipInput[] = [
  { severity: 'OK', title: 'Motor 2.9 V6 TFSI compartilhado com o RS5 B9 — peça e diagnóstico intercambiáveis', body: 'O motor 2.9 TFSI biturbo dessa geração é o mesmo do RS5 B9 (e da família S4/S5 na versão 3.0, arquitetura EA839 relacionada). Para peça ou diagnóstico difícil de achar "para RS4", busque também por "RS5 B9"/"motor 2.9 TFSI Audi" — amplia bastante a busca.' },
  { severity: 'WARN', title: 'Acúmulo de carbono nas válvulas de admissão — característica de todo motor de injeção direta pura', body: 'Esse motor usa só injeção direta (sem injeção indireta auxiliar), o que favorece acúmulo de carbono nas válvulas de admissão ao longo do tempo — sintoma típico é falha de marcha lenta ou leve perda de resposta. Limpeza preventiva de admissão entre 80.000-100.000 km evita que o problema avance a ponto de exigir remoção do motor para limpar as válvulas.' },
  { severity: 'WARN', title: 'Não use aditivo de combustível não aprovado pela Audi', body: 'Boletim técnico da fabricante desaconselha o uso de aditivos de combustível não homologados especificamente para o motor 2.9 TFSI/EA839 — alguns aditivos genéricos podem piorar o acúmulo de depósito em vez de ajudar. Use só o que o manual ou a concessionária recomendar.' },
]
const PROBLEMAS_B9: TipInput[] = [
  { severity: 'WARN', title: 'Sistema de ventilação do cárter (PCV) com projeto sensível', body: 'A comunidade internacional de proprietários documentou um ponto de atenção no sistema de ventilação do cárter (PCV) desse motor, que em alguns casos permite óleo entrar no sistema de admissão via turbo, contribuindo para o acúmulo de carbono. Um catch can (separador de óleo) instalado por oficina especializada é uma solução usada por entusiastas para reduzir esse efeito — não é item de fábrica, avalie com uma oficina de confiança.' },
]
const MANUTENCAO_B9: TipInput[] = [
  { severity: 'OK', title: 'Cronograma RS4 B9 (V6 2.9 TFSI biturbo)', body: '10.000 km — Troca de óleo do motor + filtro (essencial nesse motor turbo de alta pressão). | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT4. | 60.000 km — Velas de ignição. | 60.000-80.000 km — Fluido do câmbio tiptronic. | 80.000-100.000 km — Limpeza preventiva de carbono nas válvulas de admissão.' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'RS4', yearFrom: 2000, yearTo: 2001, MACETES: MACETES_B5, PROBLEMAS: PROBLEMAS_B5, MANUTENCAO: MANUTENCAO_B5 },
  { modelName: 'RS4', yearFrom: 2012, yearTo: 2015, MACETES: MACETES_B8, PROBLEMAS: PROBLEMAS_B8, MANUTENCAO: MANUTENCAO_B8 },
  { modelName: 'RS4', yearFrom: 2018, yearTo: null, MACETES: MACETES_B9, PROBLEMAS: PROBLEMAS_B9, MANUTENCAO: MANUTENCAO_B9 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'RS4', yearFrom: 2000, yearTo: 2001, tireSize: '235/40 R18 (referência B5)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 33, sparePsi: null, notes: 'Valor de referência — exemplar raro, confirme com especialista/manual do proprietário específico.' },
  { modelName: 'RS4', yearFrom: 2012, yearTo: 2015, tireSize: '265/30 R20 (padrão) — varia conforme roda', frontPsi: 33, rearPsi: 31, frontPsiLoad: 36, rearPsiLoad: 34, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta.' },
  { modelName: 'RS4', yearFrom: 2018, yearTo: null, tireSize: '275/30 R20 (padrão) — varia conforme roda', frontPsi: 33, rearPsi: 31, frontPsiLoad: 36, rearPsiLoad: 34, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Sem estepe (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'RS4', yearFrom: 2000, yearTo: 2001, component: 'Óleo do motor + filtro', intervalKm: null, intervalMonths: 12, notes: 'Mesmo com pouco uso, troque anualmente — óleo degrada com o tempo.', priority: 'HIGH', order: 0 },
  { modelName: 'RS4', yearFrom: 2000, yearTo: 2001, component: 'Inspeção de mangueiras e correias', intervalKm: null, intervalMonths: 12, notes: 'Borracha ressecada é o principal risco em carro antigo de baixo uso.', priority: 'HIGH', order: 1 },
  { modelName: 'RS4', yearFrom: 2012, yearTo: 2015, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 2 },
  { modelName: 'RS4', yearFrom: 2012, yearTo: 2015, component: 'Fluido do câmbio S-tronic', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'RS4', yearFrom: 2018, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 4 },
  { modelName: 'RS4', yearFrom: 2018, yearTo: null, component: 'Limpeza de carbono nas válvulas de admissão', intervalKm: 90000, intervalMonths: null, notes: 'Motor de injeção direta pura acumula carbono — previna antes de virar perda de marcha lenta/resposta.', priority: 'MEDIUM', order: 5 },
  { modelName: 'RS4', yearFrom: 2018, yearTo: null, component: 'Fluido do câmbio tiptronic', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 6 },
]

async function main() {
  console.log('🚗 Seed Audi RS4...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'RS4', brandId: brand.id } },
    update: {}, create: { name: 'RS4', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'RS4' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'RS4' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'RS4' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi RS4 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
