/**
 * Seed Ford Escort — macetes, problemas, manutenção e calibragem de pneus
 * Compacto/médio da Ford no Brasil, 1983-2002/2003. Duas eras mecânicas
 * bem distintas:
 *  - 1983-1992: motor CHT (Compound High Turbulence) 1.3/1.6/1.8,
 *    carburador, projeto genuinamente Ford.
 *  - 1993-2003: motor AP 1.8i/2.0i com injeção eletrônica — o mesmo
 *    motor AP usado pela Volkswagen (Gol/Voyage/Parati/Saveiro/Santana),
 *    fruto da joint-venture Autolatina entre Ford e VW (1987-1995).
 *    Inclui as versões XR3 (hot-hatch icônico), RS (edição rally
 *    limitada), conversível (capota com sistema hidráulico), SW (perua)
 *    e Hobby (versão de entrada, motor 1.0/1.6).
 * Execute: pnpm --filter @motormacete/database db:seed:ford-escort
 *
 * Fontes: flatout.com.br (série Project Cars, restauração real de XR3
 *         conversível), dicascarrosusados.com, carroclub.com.br,
 *         autoentusiastasclassic.com.br, instacarro.com
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── 1983-1992 — motor CHT (carburador) ────────────────────────────────────
const MACETES_CHT: TipInput[] = [
  { severity: 'OK', title: 'Motor CHT: projeto genuinamente Ford, mecânica simples e bem conhecida', body: 'O motor CHT (1.3/1.6/1.8) é um projeto Ford robusto e simples, sem a complexidade de motores mais modernos — boa parte da manutenção pode ser feita por mecânico generalista de confiança, sem precisar de especialista.' },
]
const PROBLEMAS_CHT: TipInput[] = [
  { severity: 'DANGER', title: 'Ferrugem crônica embaixo da bateria e da caixa de fusíveis — infiltração de água na cabine', body: 'Um problema documentado e recorrente é ferrugem se formando embaixo da área da bateria e do compartimento da caixa de fusíveis, causando infiltração de água para dentro da cabine. A solução correta é remover toda a chapa contaminada por ferrugem e instalar chapa nova com caimento adequado para escoar água — reparo malfeito (só "tapar" com massa) volta a vazar rápido. Inspecione esses dois pontos especificamente ao comprar um exemplar usado dessa era.' },
]
const MANUTENCAO_CHT: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Escort 1983-1992 (motor CHT)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e vazamentos. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000-80.000 km — Correia dentada (motor interferente nessa geração — não atrase). | Sempre — inspecione a área embaixo da bateria e da caixa de fusíveis por ferrugem, ponto de infiltração conhecido.' },
]

// ─── 1993-2003 — motor AP 1.8i/2.0i (Autolatina, injeção eletrônica) ──────
const MACETES_AP: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor AP compartilhado com a Volkswagen: peça abundante e barata',
    body: 'O motor AP 1.8/2.0 dessa geração é o mesmo usado pela Volkswagen em Gol, Voyage, Parati, Saveiro e Santana da mesma época, fruto da joint-venture Autolatina entre Ford e VW (1987-1995). Ao procurar peça de motor, ignição ou arrefecimento, busque também "para motor AP VW" — amplia muito a disponibilidade e reduz o preço em relação a peça específica de "Escort".',
  },
  {
    severity: 'OK',
    title: 'Motor AP: correia dentada NÃO é interferente — risco reduzido se romper',
    body: 'Assim como em outros carros equipados com o motor AP, se a correia dentada arrebentar rodando, na grande maioria dos casos o motor apenas para, sem bater válvula no pistão. Isso não muda o intervalo de troca recomendado, mas reduz o risco de dano grave em comparação com muitos motores modernos.',
  },
  {
    severity: 'WARN',
    title: 'Peça de acabamento e de versões especiais (XR3, RS, conversível) pode exigir importação',
    body: 'Apesar de ser um carro "relativamente moderno" para padrão de clássico, peça de acabamento específica de versões especiais como XR3, RS e principalmente a conversível é escassa mesmo no mercado paralelo — vale procurar em sites de peça no exterior (o Escort é carro popular entre entusiastas no Reino Unido) e em fabricantes de peça de reposição na Argentina para itens de lataria. O fórum/clube de proprietários do Escort é referência para indicar fornecedor confiável.',
  },
]
const PROBLEMAS_AP: TipInput[] = [
  { severity: 'DANGER', title: 'Ferrugem crônica embaixo da bateria e da caixa de fusíveis — mesmo padrão da geração anterior', body: 'O mesmo problema de infiltração/ferrugem embaixo da bateria e da caixa de fusíveis, documentado na geração CHT, se repete nessa geração. Inspecione esses pontos regularmente e trate qualquer sinal de ferrugem cedo, com chapa nova e caimento correto para escoar água — não só massa e tinta por cima.' },
  { severity: 'WARN', title: 'Conversível: vazamento no sistema hidráulico da capota', body: 'Nas versões conversível, vazamento no sistema hidráulico que aciona a capota é queixa comum — sintoma é perda de força para abrir/fechar a capota, nível de fluido do reservatório caindo, às vezes acompanhado de ruído estranho no acionamento. Verifique o nível do reservatório hidráulico da capota periodicamente, não só quando o mecanismo já estiver falhando.' },
]
const MANUTENCAO_AP: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Escort 1993-2003 (motor AP 1.8i/2.0i)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão e vazamentos. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada (motor não interferente, mas não vale a pena arriscar ficar na pista). | Conversível — verifique o nível do reservatório hidráulico da capota regularmente. | Sempre — inspecione a área embaixo da bateria e da caixa de fusíveis por ferrugem.' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Escort', yearFrom: 1983, yearTo: 1992, MACETES: MACETES_CHT, PROBLEMAS: PROBLEMAS_CHT, MANUTENCAO: MANUTENCAO_CHT },
  { modelName: 'Escort', yearFrom: 1993, yearTo: 2003, MACETES: MACETES_AP, PROBLEMAS: PROBLEMAS_AP, MANUTENCAO: MANUTENCAO_AP },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Escort', yearFrom: 1983, yearTo: 1992, tireSize: '165/70 R13 · 175/70 R13 (referência)', frontPsi: 28, rearPsi: 28, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta.' },
  { modelName: 'Escort', yearFrom: 1993, yearTo: 2003, tireSize: '175/70 R13 · 185/60 R14 (XR3/RS, referência)', frontPsi: 28, rearPsi: 28, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta. Versões esportivas (XR3/RS) podem usar aro maior.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Escort', yearFrom: 1983, yearTo: 1992, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Escort', yearFrom: 1983, yearTo: 1992, component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: 'Motor interferente nessa geração.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Escort', yearFrom: 1983, yearTo: 1992, component: 'Inspeção de ferrugem (embaixo da bateria/caixa de fusíveis)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de infiltração de água documentado e recorrente.', priority: 'HIGH', order: 2 },
  { modelName: 'Escort', yearFrom: 1993, yearTo: 2003, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 3 },
  { modelName: 'Escort', yearFrom: 1993, yearTo: 2003, component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: 'Motor AP não interferente, mas não atrase mesmo assim.', priority: 'HIGH', order: 4 },
  { modelName: 'Escort', yearFrom: 1993, yearTo: 2003, component: 'Inspeção de ferrugem (embaixo da bateria/caixa de fusíveis)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'Escort', yearFrom: 1993, yearTo: 2003, component: 'Reservatório hidráulico da capota (versões conversível)', intervalKm: null, intervalMonths: 6, notes: 'Verifique nível regularmente — vazamento é queixa comum nessa versão.', priority: 'MEDIUM', order: 6 },
]

async function main() {
  console.log('🚗 Seed Ford Escort...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Ford', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Ford', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Escort', brandId: brand.id } },
    update: {}, create: { name: 'Escort', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Escort' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Escort' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Escort' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Ford Escort concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
