/**
 * Seed Fiat Palio — macetes, problemas, manutenção e calibragem de pneus
 * Um dos carros mais vendidos da história do Brasil, produzido de 1996 a
 * 2017 (hatch) sobre o MESMO chassi básico do lançamento original — 4
 * "gerações" no Brasil foram na prática restilizações visuais sucessivas,
 * não plataformas novas. Inclui a perua "Palio Weekend" e as versões
 * elevadas "Adventure"/"Adventure Locker". Cobrimos 4 blocos:
 *  - 1996-2000: motores 1.0/1.5/1.6/1.8 (pré-Fire, gasolina/álcool
 *    separados, sem flex).
 *  - 2000-2003: 1º facelift, chegada do motor Fire (1.0/1.3), ainda sem
 *    flex.
 *  - 2003-2007: 2º facelift, 1º motor flex da Fiat (1.3 Fire Flex),
 *    depois 1.0/1.4 Fire Flex.
 *  - 2007-2017: facelift final (visual inspirado no Grande Punto, mesmo
 *    chassi de 1996 por baixo), motor Fire Evo com variador de fase
 *    (desde 2010), câmbio automatizado Dualogic opcional.
 * Execute: pnpm --filter @motormacete/database db:seed:fiat-palio
 *
 * Fontes: noticiasautomotivas.com.br, en.wikipedia.org (Fiat Palio),
 *         carro.blog.br, autopapo.com.br, opinautos.com.br,
 *         autoo.com.br, reclameaqui.com.br, canaldapeca.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── 1996-2000 — motores pré-Fire (1.0/1.5/1.6/1.8) ────────────────────────
const MACETES_96: TipInput[] = [
  { severity: 'OK', title: 'Peça mecânica ainda fácil de achar, mesmo em carro com quase 30 anos', body: 'Por ter vendido em volume gigantesco no Brasil, peça de mecânica básica (motor, embreagem, suspensão) do Palio de primeira geração ainda é fácil e barata de achar em qualquer cidade — mesmo peça de desmanche serve bem, já que o volume de carros sucateados é grande.' },
]
const PROBLEMAS_96: TipInput[] = [
  { severity: 'WARN', title: 'Falha de pintura nos primeiros anos — descascamento e bolhas', body: 'Exemplares dos primeiros anos de produção têm queixa recorrente de falha na pintura de fábrica, com áreas descascando ou formando bolhas. Inspecione bem a lataria antes de comprar um exemplar dessa era — repintura de qualidade em painel específico não é caro, mas vale saber o que esperar.' },
  { severity: 'WARN', title: 'Vazamento de óleo pela tampa, retentor do virabrequim ou junta', body: 'Vazamento de óleo é queixa comum nesses motores mais antigos, seja pela tampa de válvulas, pelo retentor do virabrequim ou por junta ressecada. Verifique manchas no chão e nível de óleo regularmente — vazamento pequeno não tratado vira consumo de óleo alto com o tempo.' },
]
const MANUTENCAO_96: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Palio 1996-2000', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de vazamentos (tampa de válvulas, retentor do virabrequim) e freios. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada (motor interferente, não atrase).' },
]

// ─── 2000-2003 — 1º facelift, chegada do motor Fire (sem flex ainda) ──────
const MACETES_00: TipInput[] = [
  { severity: 'OK', title: 'Motor Fire: reputação de durabilidade e peça barata começou aqui', body: 'O motor Fire (1.0/1.3) chegou ao Palio nessa fase e construiu a fama de simples e durável que carrega até hoje — motor considerado de manutenção barata e peça fácil de achar em qualquer oficina do Brasil.' },
]
const PROBLEMAS_00: TipInput[] = [
  { severity: 'OK', title: 'Ar-condicionado: pouco ar geralmente é filtro de cabine ou ventilador', body: 'Se o ar-condicionado sopra pouco ar (não é questão de temperatura), a causa mais comum é filtro de cabine entupido ou motor do ventilador (ventoinha do evaporador) fraco — antes de mexer no sistema de refrigeração em si, cheque esses dois itens, mais baratos e simples de resolver.' },
]
const MANUTENCAO_00: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Palio 2000-2003 (Fire 1.0/1.3, pré-flex)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e vazamentos. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada — no 1.3 16V, atenção: só uma das polias de comando é acionada pela correia, a outra por engrenagem, então a inspeção do sincronismo completo importa tanto quanto a correia em si.' },
]

// ─── 2003-2007 — 1º motor flex (1.3 Fire Flex, depois 1.0/1.4) ────────────
const MACETES_03: TipInput[] = [
  { severity: 'OK', title: 'Primeiro motor flex da Fiat: adapte a expectativa de troca de vela/manutenção', body: 'O 1.3 Fire Flex foi o primeiro motor flex-fuel da Fiat no Brasil — motor flex de primeira geração tende a pedir troca de vela um pouco mais frequente que motor só a gasolina/álcool separados, principalmente rodando bastante com etanol. Não é defeito, é característica do combustível.' },
  { severity: 'OK', title: 'Weekend Adventure Locker (câmbio manual): diferencial bloqueável é vantagem real em terreno solto', body: 'A versão Adventure Locker tem diferencial traseiro bloqueável, útil de verdade em terra/lama/areia — mas use só quando o terreno realmente exigir, travar o diferencial em asfalto seco desgasta a transmissão sem necessidade.' },
]
const PROBLEMAS_03: TipInput[] = [
  { severity: 'WARN', title: 'Trepidação na dianteira por volta de 80 km/h', body: 'Relato recorrente de trepidação na parte dianteira do carro justamente perto de 80 km/h. A causa mais provável na prática (mais que "dimensão do motor", explicação vaga que aparece em alguns fóruns) é desgaste da junta homocinética ou desbalanceamento/deformação de roda — antes de suspeitar de algo maior no motor, cheque balanceamento das rodas e o estado das juntas homocinéticas do semieixo.' },
  { severity: 'WARN', title: 'Atuador de embreagem: fonte frequente de reclamação', body: 'O atuador (cilindro) de embreagem aparece com frequência entre as queixas de proprietários — sintoma típico é pedal de embreagem "mole" ou com curso estranho. Peça relativamente acessível de trocar, não vale a pena conviver com embreagem ruim esperando piorar.' },
]
const MANUTENCAO_03: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Palio 2003-2007 (Fire Flex 1.0/1.3/1.4)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de embreagem/atuador e freios. | 20.000 km — Filtro de ar. | 30.000 km — Velas de ignição (motor flex de 1ª geração pede um pouco mais de atenção rodando bastante com etanol). | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada. | Weekend Adventure Locker — óleo do diferencial traseiro a cada 60.000 km.' },
]

// ─── 2007-2017 — facelift final, Fire Evo, câmbio Dualogic opcional ──────
const MACETES_07: TipInput[] = [
  { severity: 'OK', title: 'Mesmo chassi de 1996 por baixo — não deixe o visual novo enganar sobre a idade real do projeto', body: 'Apesar do visual renovado (inspirado no Grande Punto), essa última fase do Palio manteve o mesmo chassi básico do lançamento original de 1996. Isso significa: peça de suspensão/estrutura de gerações mais antigas do Palio muitas vezes ainda serve, mesmo num exemplar 2015/2016 — vale considerar na busca por peça.' },
  { severity: 'WARN', title: 'Câmbio Dualogic: entenda o que é antes de comprar (não é câmbio automático convencional)', body: 'O Dualogic é um câmbio manual automatizado (robotizado), não um automático tradicional — a troca de marcha é do mesmo mecanismo manual, só automatizada por um atuador. Isso significa engates naturalmente menos suaves que um automático convencional, principalmente em trânsito intenso ou subida — não é sinal de defeito por si só, é a característica do sistema.' },
]
const PROBLEMAS_07: TipInput[] = [
  { severity: 'DANGER', title: 'Câmbio Dualogic: marcha desengatando sozinha em movimento — problema documentado e grave', body: 'Há relato documentado de proprietário de Weekend Adventure Locker Dualogic com a marcha desengatando sozinha com o carro em movimento — risco real de segurança. O mesmo caso envolveu troca de embreagem, atuador e "robô" de câmbio três vezes sem resolver definitivamente, ultrapassando R$ 6.000 em reparos. Se notar qualquer desengate espontâneo de marcha, não continue usando o carro normalmente — procure a concessionária/especialista Dualogic imediatamente.' },
  { severity: 'WARN', title: 'Câmbio Dualogic: módulo eletrônico pode deixar o carro em ponto morto ou sem engatar', body: 'Falha no módulo de controle eletrônico do Dualogic pode deixar o câmbio preso em neutro ou impedir o engate de marcha. Se o carro "não sai do lugar" sem motivo aparente com esse câmbio, considere o módulo eletrônico como suspeito, não só embreagem/atuador mecânico.' },
  { severity: 'WARN', title: 'Câmbio Dualogic: engates bruscos em trânsito intenso ou subida', body: 'O sistema tende a hesitar na escolha da marcha em trânsito parado-anda ou subida íngreme, resultando em trancos/engates bruscos perceptíveis. Uso urbano pesado e diário é onde o Dualogic mais mostra essa limitação — se o seu uso é assim, vale considerar bem antes de optar por essa versão.' },
]
const MANUTENCAO_07: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Palio 2007-2017 (Fire Evo)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar e filtro de cabine. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada (motor interferente). | 120.000 km — Fluido do câmbio Dualogic (versões equipadas) — não pule esse item, é o principal cuidado preventivo desse câmbio.' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Palio', yearFrom: 1996, yearTo: 2000, MACETES: MACETES_96, PROBLEMAS: PROBLEMAS_96, MANUTENCAO: MANUTENCAO_96 },
  { modelName: 'Palio', yearFrom: 2000, yearTo: 2003, MACETES: MACETES_00, PROBLEMAS: PROBLEMAS_00, MANUTENCAO: MANUTENCAO_00 },
  { modelName: 'Palio', yearFrom: 2003, yearTo: 2007, MACETES: MACETES_03, PROBLEMAS: PROBLEMAS_03, MANUTENCAO: MANUTENCAO_03 },
  { modelName: 'Palio', yearFrom: 2007, yearTo: 2017, MACETES: MACETES_07, PROBLEMAS: PROBLEMAS_07, MANUTENCAO: MANUTENCAO_07 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Palio', yearFrom: 1996, yearTo: 2003, tireSize: '165/70 R13 · 175/65 R14 (referência)', frontPsi: 28, rearPsi: 28, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta.' },
  { modelName: 'Palio', yearFrom: 2003, yearTo: 2007, tireSize: '175/65 R14 (referência)', frontPsi: 28, rearPsi: 28, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta. Weekend com carga: reforce a traseira.' },
  { modelName: 'Palio', yearFrom: 2007, yearTo: 2017, tireSize: '175/65 R14 · 185/60 R15 (Sporting) — referência', frontPsi: 29, rearPsi: 29, frontPsiLoad: 31, rearPsiLoad: 33, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta. Weekend com carga: reforce a traseira.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Palio', yearFrom: 1996, yearTo: 2000, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Palio', yearFrom: 1996, yearTo: 2000, component: 'Inspeção de vazamento de óleo (tampa/retentor)', intervalKm: null, intervalMonths: 12, notes: 'Queixa comum nessa geração.', priority: 'HIGH', order: 1 },
  { modelName: 'Palio', yearFrom: 1996, yearTo: 2000, component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: 'Motor interferente.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Palio', yearFrom: 2000, yearTo: 2003, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 3 },
  { modelName: 'Palio', yearFrom: 2000, yearTo: 2003, component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: 'No 1.3 16V, verifique também a engrenagem de sincronismo da segunda polia de comando.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Palio', yearFrom: 2003, yearTo: 2007, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 5 },
  { modelName: 'Palio', yearFrom: 2003, yearTo: 2007, component: 'Inspeção de embreagem/atuador', intervalKm: 30000, intervalMonths: null, notes: 'Fonte frequente de reclamação — pedal mole é o sintoma.', priority: 'HIGH', order: 6 },
  { modelName: 'Palio', yearFrom: 2003, yearTo: 2007, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor flex de 1ª geração — atenção redobrada com uso intenso de etanol.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Palio', yearFrom: 2003, yearTo: 2007, component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'CRITICAL', order: 8 },
  { modelName: 'Palio', yearFrom: 2007, yearTo: 2017, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 9 },
  { modelName: 'Palio', yearFrom: 2007, yearTo: 2017, component: 'Fluido do câmbio Dualogic (versões equipadas)', intervalKm: 120000, intervalMonths: null, notes: 'Principal cuidado preventivo desse câmbio — não pule.', priority: 'CRITICAL', order: 10 },
  { modelName: 'Palio', yearFrom: 2007, yearTo: 2017, component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'CRITICAL', order: 11 },
  { modelName: 'Palio', yearFrom: 2007, yearTo: 2017, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 12 },
]

async function main() {
  console.log('🚗 Seed Fiat Palio...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Fiat', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Fiat', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Palio', brandId: brand.id } },
    update: {}, create: { name: 'Palio', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Palio' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Palio' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Palio' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Fiat Palio concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
