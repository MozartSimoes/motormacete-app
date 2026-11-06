/**
 * Seed Peugeot 208 — macetes, problemas, manutenção e calibragem de pneus
 * Hatch compacto, 2 gerações no Brasil:
 *  - Gen1 (2013-2020): motor THP 1.6 turbo (parceria PSA/BMW) ou 1.5,
 *    câmbio manual ou ETG6 (robotizada de embreagem simples).
 *  - Gen2 (2021+): motor PureTech 1.2 turbo 3 cilindros com correia
 *    dentada IMERSA NO ÓLEO (wet belt), câmbio manual ou automático EAT6
 *    de conversor de torque.
 * Este arquivo substitui o conteúdo antigo do '208' que vivia só no
 * seed.ts histórico (sem MaintenanceItem estruturado), preservando o
 * conteúdo técnico já muito bem documentado (specs PSA exatas, custos
 * reais, procedimento de reset do BSI) e adicionando 2 recalls oficiais
 * recentes (2025) ainda não cobertos: caixa de direção com risco de
 * rachadura, e módulo de controle do motor (ECM) com risco de
 * infiltração de água.
 * Execute: pnpm --filter @motormacete/database db:seed:peugeot-208
 *
 * Fontes: media.stellantis.com (comunicados oficiais de recall),
 *         conexaoautomotivabr.com, reclameaqui.com.br,
 *         peugeotforums.com, peugeot.com.br/servicos-e-manuais/recall
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── Gen1 (2013-2020) — THP 1.6 / ETG6 ─────────────────────────────────────
const MACETES_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'THP 1.6: consumo de óleo de até 1L a cada 5.000 km é considerado "normal" pela própria PSA',
    body: 'A PSA documenta consumo de até 1 litro de óleo a cada 5.000 km como normal no motor THP 1.6 — o que passa disso (acima de 1L/1.000 km) é que indica problema real. Verifique o nível antes de cada abastecimento e use sempre óleo 0W-30 especificação PSA B71 2302 — o THP é tão sensível à especificação exata do óleo quanto o PureTech da geração seguinte.',
  },
  {
    severity: 'WARN',
    title: 'ETG6 robotizada: nunca segure o carro em subida só com o acelerador',
    body: 'A caixa ETG6 (robotizada de embreagem simples, ponto fraco conhecido do 208 gen1) sofre desgaste acelerado se você segurar o carro parado em subida usando só o acelerador contra a gravidade — isso queima a embreagem rapidamente. Em subida, use o freio de mão ou o pedal de freio para segurar o carro parado, e acelere suavemente para sair. Esse hábito simples pode dobrar a vida útil da embreagem.',
  },
  {
    severity: 'OK',
    title: 'Reset do módulo BSI resolve boa parte das falhas elétricas intermitentes',
    body: 'O BSI (Body Systems Interface) é o cérebro eletrônico central da Peugeot — muitas falhas intermitentes (alarme, vidros, travas, injeção) se resolvem com um reset simples: abra a janela do motorista, desligue o carro e retire a chave, desconecte o terminal negativo da bateria, aguarde 15 segundos, reconecte e aguarde mais 10 segundos, ligue os faróis pelo botão externo, coloque a chave e ligue o motor, e segure o botão de travar por 10 segundos para ressincronizar a chave. Vale tentar antes de levar para diagnóstico pago.',
  },
]
const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'ETG6 robotizada: trepidação ao partir do zero — problema crônico documentado',
    body: 'A caixa ETG6 tem vibração/trepidação ao sair do zero como problema crônico bem documentado. Soluções em ordem de custo: 1) reprogramação de software na concessionária (gratuita em garantia, resolve 40-60% dos casos); 2) adaptação do ponto de contato via scanner PSA (R$200-400); 3) troca do atuador eletro-hidráulico (R$2.500-5.000); 4) troca do kit de embreagem completo (R$3.000-6.000). Evite usar a ETG6 no modo manual em trânsito lento, isso acelera o desgaste.',
  },
  {
    severity: 'WARN',
    title: 'THP 1.6: carbonização das válvulas de admissão reduz potência sem acusar erro',
    body: 'Por ser motor de injeção direta, o combustível não "lava" as válvulas de admissão — a cada 50.000-80.000 km se acumula depósito de carbono, causando perda de potência de até 20% sem acionar nenhum código de erro (OBD). Sintoma: motor perde força gradualmente, principalmente em retomadas. Solução: limpeza por jato de nozes moídas (walnut blasting) na admissão, custo R$800-1.800. Prevenção: gasolina aditivada e limpeza preventiva a cada 60.000 km.',
  },
  {
    severity: 'WARN',
    title: 'THP 1.6: correia dentada — motor de interferência, ruptura destrói válvulas e pistões',
    body: 'O motor THP 1.6 (projeto conjunto PSA/BMW) usa correia dentada com tensor hidráulico e é motor interferente. Troque obrigatoriamente a cada 60.000 km junto com tensor, polia tensora e polia livre — custo R$900-1.500. Muitas concessionárias cobram por "revisão THP completa"; exija orçamento detalhado item por item.',
  },
  {
    severity: 'WARN',
    title: 'Ar-condicionado: O-rings da caixa evaporadora vazam gás aos poucos',
    body: 'Boletim técnico da PSA (C5HW014DQ0) documenta que os O-rings dos dutos da caixa evaporadora envelhecem e permitem microvazamento de gás refrigerante R-134a. Sintoma: AC resfria cada vez menos ao longo dos meses, sem falha elétrica evidente. Recarregar o gás "funciona", mas dura pouco — o reparo correto é substituir os O-rings (R$300-800 + mão de obra). Afeta também o 2008 de plataforma irmã.',
  },
]
const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 208 Gen1 (2013-2020, THP 1.6)',
    body: '10.000 km — Óleo 0W-30 especificação PSA B71 2302 (Total Quartz Ineo MC3 ou equivalente), capacidade 4,5L — a PSA proíbe qualquer outra viscosidade nesse motor. | 60.000 km — Correia dentada + tensor hidráulico + polias (nunca só a correia isolada) — acima de 100.000 km, inclua a bomba d\'água no mesmo kit, economiza mão de obra de reabertura. | 60.000 km — Velas iridium NGK ILZKR7B-11. | 15.000 km — Filtro de cabine (12.000 km em cidade muito poluída). | 20.000 km — Filtro de ar (15.000 km com uso frequente de etanol).',
  },
]

// ─── Gen2 (2021+) — PureTech 1.2 wet belt / EAT6 ───────────────────────────
const MACETES_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'PureTech 1.2: óleo 0W-30 C2 (PSA B71 2290) é obrigatório, sem exceção',
    body: 'O motor PureTech 1.2 (2021+) usa correia dentada IMERSA NO ÓLEO (wet belt) — só o óleo Total Quartz Ineo First 0W-30 com especificação PSA B71 2290 é aprovado. Qualquer outra viscosidade (5W-30, 5W-40) resseca a correia prematuramente, ela se fragmenta, entope o coador da bomba de óleo e o motor pode travar sem qualquer aviso prévio no painel. Capacidade: 3,8L com filtro. Troca obrigatória a cada 10.000 km ou 1 ano, sem exceção.',
  },
  {
    severity: 'DANGER',
    title: 'PureTech 1.2: troque a correia dentada a cada 60.000 km, não confie no prazo oficial de 80.000 km',
    body: 'A Stellantis já fez recall/extensão de garantia (campanha ZWR) para PureTech fabricados até 2017, mas o problema pode ocorrer em qualquer unidade dependendo do histórico de óleo. No Brasil, a Peugeot oferece extensão de garantia de até 10 anos/180.000 km para esse motor especificamente — exija esse direito se o motor falhar dentro desse prazo. Preventivamente, troque a correia a cada 60.000 km ou 4 anos: o prazo oficial de 80.000 km foi calculado para o clima europeu, não para o calor + etanol + trânsito do Brasil.',
  },
  {
    severity: 'OK',
    title: 'Reset do módulo BSI resolve boa parte das falhas elétricas intermitentes',
    body: 'Mesmo procedimento da geração anterior: abra a janela do motorista, desligue o carro e retire a chave, desconecte o terminal negativo da bateria, aguarde 15 segundos, reconecte e aguarde mais 10 segundos, ligue os faróis pelo botão externo, coloque a chave e ligue o motor, segure o botão de travar por 10 segundos para ressincronizar. Resolve boa parte de falha intermitente de alarme, vidro, trava ou injeção.',
  },
]
const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall oficial (2025): módulo de controle do motor (ECM) com risco de infiltração de água',
    body: 'A Peugeot convocou recall oficial de unidades do 208 ano/modelo 2024 (junto com a Partner Rapid 2025) a partir de maio de 2025, para substituição gratuita do módulo de controle do motor (ECM) por risco de infiltração de água, que pode causar desligamento inesperado do motor em movimento. Consulte a concessionária com o chassi do seu carro para confirmar se está na faixa afetada — é recall de segurança oficial, não é opcional.',
  },
  {
    severity: 'DANGER',
    title: 'Recall oficial (2025): caixa de direção com risco de rachadura',
    body: 'A Peugeot convocou recall oficial de unidades do 208 ano/modelo 2024 a partir de abril de 2025, para substituição gratuita da caixa de direção, que pode desenvolver rachaduras que comprometem o funcionamento — em situação extrema, a direção pode endurecer ou até travar. Consulte a concessionária com o chassi do seu carro para confirmar se está na faixa afetada e agende a substituição gratuita imediatamente se estiver.',
  },
  {
    severity: 'WARN',
    title: 'Após reparo de recall: confirme o tensionamento da correia do ar-condicionado',
    body: 'Há relato de proprietário cuja correia do ar-condicionado se soltou logo após um reparo de recall, gerando erro de carga da bateria. Depois de qualquer serviço de recall que mexa na frente do motor, vale conferir se a correia de acessórios (AC/alternador) está bem tensionada antes de sair rodando, principalmente em viagem.',
  },
  {
    severity: 'DANGER',
    title: 'PureTech 1.2: correia molhada — falha catastrófica sem qualquer aviso prévio',
    body: 'Quando o óleo se degrada (especificação errada ou intervalo de troca atrasado), a correia dentada submersa incha, fragmenta, entope o coador da bomba de óleo, e o motor perde pressão de óleo subitamente — o carro para sem qualquer aviso prévio no painel. Já houve recall obrigatório na Europa e Austrália (campanhas JZR/HFC) para unidades 2013-2017; no Brasil existe campanha interna equivalente (ZWR). Exija a extensão de garantia de até 10 anos/180.000 km se o motor falhar.',
  },
]
const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 208 Gen2 (2021+, PureTech 1.2)',
    body: '10.000 km ou 1 ano — Óleo 0W-30 PSA B71 2290 (Total Quartz Ineo First ou equivalente certificado), 3,8L com filtro — nunca use outra viscosidade, resseca a correia molhada. | 60.000 km — Correia dentada + tensor + polia tensora juntos, custo R$800-1.400 — não espere os 80.000 km oficiais no Brasil. | 100.000 km — Velas iridium NGK ILZKAR7B8DG (inspecione na metade do intervalo com uso frequente de etanol). | 60.000 km — Fluido do câmbio automático EAT6 (Total Fluidmatic AT) — o manual chama de "fluido de vida útil", mas não existe isso na prática, troque mesmo assim. | Sempre — confirme se seu chassi está na faixa dos recalls de ECM e caixa de direção (2025).',
  },
]

const BLOCKS: ModelBlock[] = [
  { modelName: '208', yearFrom: 2013, yearTo: 2020, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: '208', yearFrom: 2021, yearTo: null, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: '208', yearFrom: 2013, yearTo: 2020, tireSize: '195/55 R16', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: 'Gen1 (1.5 e 1.6 THP Flex). Versão Feline/Allure aro 16. Estepe step 60 PSI, máx 80 km/h.' },
  { modelName: '208', yearFrom: 2021, yearTo: null, tireSize: '195/55 R16', frontPsi: 33, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: 'Gen2 (PureTech 1.2). Versão Griffe aro 17 (215/45 R17): 35/33 PSI normal, 37/36 com carga.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: '208', yearFrom: 2013, yearTo: 2020, component: 'Óleo do motor THP 1.6 (0W-30 PSA B71 2302)', intervalKm: 10000, intervalMonths: 12, notes: 'Total Quartz Ineo MC3 0W-30 ou equivalente, 4,5L. PSA proíbe qualquer outra viscosidade.', priority: 'CRITICAL', order: 0 },
  { modelName: '208', yearFrom: 2013, yearTo: 2020, component: 'Correia dentada + tensor + polias', intervalKm: 60000, intervalMonths: 48, notes: 'Motor de interferência. Acima de 100.000 km, inclua a bomba d\'água no mesmo kit.', priority: 'CRITICAL', order: 1 },
  { modelName: '208', yearFrom: 2013, yearTo: 2020, component: 'Velas iridium (NGK ILZKR7B-11)', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: '208', yearFrom: 2013, yearTo: 2020, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza para 15.000 km com uso frequente de etanol.', priority: 'MEDIUM', order: 3 },
  { modelName: '208', yearFrom: 2013, yearTo: 2020, component: 'Filtro de cabine', intervalKm: 15000, intervalMonths: 12, notes: 'Reduza para 12.000 km em cidade muito poluída.', priority: 'MEDIUM', order: 4 },
  { modelName: '208', yearFrom: 2021, yearTo: null, component: 'Óleo do motor PureTech 1.2 (0W-30 PSA B71 2290)', intervalKm: 10000, intervalMonths: 12, notes: 'Total Quartz Ineo First 0W-30, 3,8L com filtro. Único óleo aprovado — protege a correia dentada imersa no óleo.', priority: 'CRITICAL', order: 5 },
  { modelName: '208', yearFrom: 2021, yearTo: null, component: 'Correia dentada + tensor + polia tensora', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe frente ao prazo oficial de 80.000 km — clima e etanol do Brasil são mais agressivos.', priority: 'CRITICAL', order: 6 },
  { modelName: '208', yearFrom: 2021, yearTo: null, component: 'Confirmação dos recalls de ECM e caixa de direção (2025)', intervalKm: null, intervalMonths: null, notes: 'Consulte a concessionária com o chassi do carro — recalls oficiais de segurança.', priority: 'CRITICAL', order: 7 },
  { modelName: '208', yearFrom: 2021, yearTo: null, component: 'Velas iridium (NGK ILZKAR7B8DG)', intervalKm: 100000, intervalMonths: null, notes: 'Inspecione na metade do intervalo com uso frequente de etanol.', priority: 'MEDIUM', order: 8 },
  { modelName: '208', yearFrom: 2021, yearTo: null, component: 'Fluido do câmbio automático EAT6', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício, mesmo o manual chamando assim.', priority: 'HIGH', order: 9 },
]

async function main() {
  console.log('🚗 Seed Peugeot 208...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Peugeot', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Peugeot', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: '208', brandId: brand.id } },
    update: {}, create: { name: '208', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: '208' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: '208' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: '208' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Peugeot 208 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
