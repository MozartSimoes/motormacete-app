/**
 * Seed Mitsubishi Pajero (clássico/Full) — macetes, problemas, manutenção
 * SUV grande de chassi (body-on-frame), tração integral com o sistema
 * "Super Select 4WD". No Brasil desde 1992, cobrimos 2 eras mecânicas:
 *  - 1992-1999: motor 2.8 diesel turbo (sem intercooler) e V6 3.0 gasolina.
 *  - 1999-2018/2019 (inclui a fase rebatizada "Pajero Full" a partir de
 *    ~2007): motor 3.2 DI-D turbodiesel com intercooler (T.I.), depois V6
 *    3.5/3.8 gasolina — praticamente o mesmo motor 3.2 diesel usado quase
 *    sem mudança estrutural por quase 20 anos, então um só bloco cobre
 *    GLS/HPE/HPE-S/HD-S/Dakar/Outdoor/Legend/Evolution.
 * ATENÇÃO — colisão de nome: a palavra "Pajero" também aparece em "Pajero
 * Sport", "Pajero TR4" e "Pajero iO" (modelos com plataforma e mecânica
 * bem diferentes, cada um com arquivo de seed próprio) — pelo sistema de
 * casamento por palavra do site, esses macetes podem aparecer também
 * nessas páginas. Texto escrito de forma a não contradizer tecnicamente
 * nenhum dos outros modelos.
 * Execute: pnpm --filter @motormacete/database db:seed:mitsubishi-pajero
 *
 * Fontes: carroclub.com.br, 4x4brasil.com.br, auto-doc.pt,
 *         rwmotores.com.br, webmotors.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── 1992-1999 — 2.8 diesel turbo / V6 3.0 gasolina ────────────────────────
const MACETES_92: TipInput[] = [
  { severity: 'OK', title: 'Sistema Super Select 4WD: entenda os modos antes de forçar tração em asfalto', body: 'O Pajero usa o sistema "Super Select 4WD", que permite rodar em modo 4x4 mesmo em asfalto seco (diferente de 4x4 convencional). Mesmo assim, engatar o modo de reduzida (4LLc) ou travar o diferencial central fora de terreno apropriado desgasta a transmissão sem necessidade — use só quando o terreno realmente exigir.' },
  { severity: 'OK', title: 'Motor 2.8 diesel turbo: robusto, mas exige troca de óleo rigorosa', body: 'O motor 2.8 turbodiesel (sem intercooler) é conhecido pela robustez mecânica, mas como todo diesel turbo antigo, depende de troca de óleo em dia para a turbina durar — óleo velho é a causa mais comum de desgaste prematuro de turbina nesse motor.' },
]
const PROBLEMAS_92: TipInput[] = [
  { severity: 'WARN', title: 'Vazamento em caixa de transferência e diferenciais em exemplares mais rodados', body: 'É comum em unidades com mais idade apresentar vazamento de óleo na caixa de transferência ou nos diferenciais — verifique o chão embaixo do carro regularmente e não deixe o nível baixar sem repor, isso acelera bastante o desgaste desses componentes.' },
]
const MANUTENCAO_92: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Pajero 1992-1999 (2.8 diesel / V6 3.0)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, vazamentos de diferencial/caixa de transferência. | 20.000 km — Filtro de ar e filtro de combustível (diesel). | 40.000 km — Fluido de freio. | 60.000 km — Óleo da caixa de transferência e diferenciais.' },
]

// ─── 1999-2018/2019 — 3.2 DI-D T.I. / V6 3.5-3.8 (incl. "Pajero Full") ─────
const MACETES_99: TipInput[] = [
  { severity: 'OK', title: 'Motor 3.2 DI-D: o motor mais usado da linha, peça mais fácil de achar', body: 'O motor 3.2 turbodiesel com intercooler (DI-D/T.I.) foi usado quase sem mudança estrutural por quase duas décadas em praticamente todas as versões GLS/HPE/Dakar/Full/Legend — isso significa peça de motor relativamente fácil de achar mesmo em exemplar mais antigo, diferente de motores usados por pouco tempo.' },
  { severity: 'WARN', title: 'Bomba injetora semi-eletrônica: peça cara, cuide da qualidade do diesel', body: 'A bomba injetora desse motor é semi-eletrônica e tem custo alto de reposição na concessionária. Abastecer sempre em posto de confiança com diesel S10 de qualidade é a principal forma de prevenir dano prematuro nesse componente caro.' },
  { severity: 'OK', title: 'Sistema Super Select 4WD: mesmo cuidado da geração anterior', body: 'Use o modo 4x4 travado (reduzida/diferencial central bloqueado) só em terreno que realmente exija — uso desnecessário em asfalto desgasta a transmissão sem necessidade.' },
]
const PROBLEMAS_99: TipInput[] = [
  { severity: 'WARN', title: 'Fumaça preta e perda de potência — geralmente ligado a turbina/intercooler/injeção', body: 'Relatos recorrentes de fumaça preta densa em aceleração ou em velocidade constante acima de 100 km/h costumam estar ligados a turbina desgastada, intercooler sujo (descarbonização resolve em vários casos) ou início de falha no sistema de injeção common rail — normalmente entre 120.000-180.000 km. Não ignore fumaça preta persistente, quanto mais cedo diagnosticar, mais barato o reparo.' },
  { severity: 'WARN', title: 'Motor esquenta mais que o ideal parado/em marcha lenta prolongada', body: 'Donos relatam que a refrigeração desse motor não é tão eficiente com o carro parado e funcionando por muito tempo (fila, engarrafamento longo) — evite deixar o motor ligado parado por período muito longo sem necessidade, e fique de olho no marcador de temperatura nessas situações.' },
]
const MANUTENCAO_99: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Pajero 1999-2018 (3.2 DI-D / V6 3.5-3.8, GLS/HPE/Dakar/Full)', body: '10.000 km — Troca de óleo do motor + filtro (essencial para a vida útil da turbina e da bomba injetora). | 10.000 km — Inspeção de freios, vazamentos de diferencial/caixa de transferência. | 20.000 km — Filtro de ar. | 20.000 km — Filtro de combustível diesel (abasteça sempre com S10 de qualidade). | 40.000 km — Fluido de freio. | 60.000 km — Fluido de arrefecimento — atenção redobrada por esse motor não refrigerar tão bem parado. | 60.000 km — Óleo da caixa de transferência e diferenciais. | 60.000-80.000 km — Fluido do câmbio automático (versões Aut.).' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Pajero', yearFrom: 1992, yearTo: 1999, MACETES: MACETES_92, PROBLEMAS: PROBLEMAS_92, MANUTENCAO: MANUTENCAO_92 },
  { modelName: 'Pajero', yearFrom: 1999, yearTo: 2019, MACETES: MACETES_99, PROBLEMAS: PROBLEMAS_99, MANUTENCAO: MANUTENCAO_99 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Pajero', yearFrom: 1992, yearTo: 1999, tireSize: '265/70 R16 (referência)', frontPsi: 30, rearPsi: 32, frontPsiLoad: 33, rearPsiLoad: 38, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta. Reforce a traseira com carga/off-road de carga pesada.' },
  { modelName: 'Pajero', yearFrom: 1999, yearTo: 2019, tireSize: '265/65 R17 (referência) — varia conforme roda/versão', frontPsi: 30, rearPsi: 32, frontPsiLoad: 33, rearPsiLoad: 38, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Pajero', yearFrom: 1992, yearTo: 1999, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Pajero', yearFrom: 1992, yearTo: 1999, component: 'Óleo da caixa de transferência e diferenciais', intervalKm: 60000, intervalMonths: null, notes: 'Verifique vazamento regularmente.', priority: 'HIGH', order: 1 },
  { modelName: 'Pajero', yearFrom: 1999, yearTo: 2019, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Essencial para a vida útil da turbina e da bomba injetora.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Pajero', yearFrom: 1999, yearTo: 2019, component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'Use sempre diesel S10 de qualidade — protege a bomba injetora cara.', priority: 'HIGH', order: 3 },
  { modelName: 'Pajero', yearFrom: 1999, yearTo: 2019, component: 'Inspeção de turbina/intercooler', intervalKm: 100000, intervalMonths: null, notes: 'Fumaça preta persistente é sinal de alerta — diagnostique cedo.', priority: 'HIGH', order: 4 },
  { modelName: 'Pajero', yearFrom: 1999, yearTo: 2019, component: 'Fluido do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 5 },
]

async function main() {
  console.log('🚗 Seed Mitsubishi Pajero (clássico/Full)...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Mitsubishi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Mitsubishi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Pajero', brandId: brand.id } },
    update: {}, create: { name: 'Pajero', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Pajero' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Pajero' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Pajero' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Mitsubishi Pajero (clássico/Full) concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
