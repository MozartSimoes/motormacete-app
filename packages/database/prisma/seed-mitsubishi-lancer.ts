/**
 * Seed Mitsubishi Lancer — macetes, problemas, manutenção e calibragem
 * Chegou ao Brasil em 1993 (4ª geração, Lancer VX, importado, 1.8L
 * 94cv). A 5ª geração (1996-2000) trouxe o GLX 2.0 16V (135cv) e câmbio
 * automático de 4 marchas. A linhagem esportiva Lancer Evolution (motor
 * 4G63T turbo, tração integral) chegou ao país em pequena escala entre
 * as gerações VI a IX (2001-2007). A 8ª geração do Lancer "comum"
 * (GT/GLX/HL/HLE) foi lançada no Brasil em 2011 — sempre importada até
 * 2013, com produção nacional em Catalão (GO) só a partir de 2014. A
 * Lancer Evolution X (motor 4B11T, 295cv, AWD Super All Wheel Control,
 * câmbio TC-SST de dupla embreagem) foi importada de 2010 a 2016. A
 * Mitsubishi encerrou a produção do Lancer no Brasil em 2017/2019, após
 * mais de 40 anos de história do nome no mundo.
 * Execute: pnpm --filter @motormacete/database db:seed:mitsubishi-lancer
 *
 * Fontes: icarros.com.br, mundodoautomovelparapcd.com.br,
 *         instacarro.com, jahautomovel.com.br, mitsufans.com.br,
 *         carros.blog.br, en.wikipedia.org, jdmbuysell.com,
 *         evoxforums.com, reclameaqui.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1993-2000 (Lancer comum importado, 4ª/5ª geração — GLX/GTi/LS) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Carro sempre importado no Brasil — peça mecânica mais rara hoje, procure especialista em Mitsubishi',
    body: 'Diferente de marcas com produção nacional, o Lancer dessa fase sempre foi importado. Peça mecânica e de acabamento é mais escassa hoje em dia — vale procurar oficinas e fornecedores especializados em Mitsubishi importado em vez de loja de peça genérica.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático de 4 marchas (5ª geração, GLX): use só fluido especificado pela Mitsubishi',
    body: 'A versão automática trazida a partir de 1996 exige fluido de câmbio específico — usar fluido genérico incompatível é causa comum de problema prematuro em câmbios automáticos importados dessa época. Confirme a especificação exata antes de trocar o fluido.',
  },
]

const PROBLEMAS_G1: TipInput[] = []

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Lancer 1993-2000 (1.8 ou 2.0 8V/16V, GLX/GTi/LS)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água), motor interferente. | 40.000 km — Fluido do câmbio automático (versões GLX automáticas), somente fluido especificado. | 20.000 km — Fluido de freio.',
  },
]

// ---------- 2001-2007 (Lancer Evolution VI a IX — motor 4G63T turbo, AWD, importação limitada) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor 4G63T exige gasolina de alta octanagem — nunca abasteça com combustível comum',
    body: 'O motor turbo 4G63 foi projetado para gasolina de alta octanagem (premium/aditivada). Abastecer com gasolina comum de baixa octanagem aumenta o risco de detonação (batida de pino) sob a pressão do turbo, podendo causar dano grave ao motor. Não economize no combustível desse carro.',
  },
  {
    severity: 'OK',
    title: 'Peça de suspensão, turbo e diferencial é toda importada — procure especialista em Evo, não oficina genérica',
    body: 'Componentes de performance (turbina, intercooler, suspensão reforçada, diferencial AYC quando equipado) são importados e caros. Procure oficina com experiência comprovada especificamente em Lancer Evolution — o conhecimento genérico de Mitsubishi não é suficiente para esse carro.',
  },
  {
    severity: 'OK',
    title: 'Deixe o motor em marcha lenta antes de desligar após uso em pista ou estrada em alta velocidade',
    body: 'Depois de rodar sob carga alta (pista, estrada em velocidade), desligar o motor imediatamente prejudica o turbocompressor — o óleo para de circular com a turbina ainda girando muito quente. Deixe o motor em marcha lenta por 1-2 minutos antes de desligar.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Diferencial ativo AYC (quando equipado) precisa de fluido próprio — não use óleo de diferencial comum',
    body: 'O sistema AYC (Active Yaw Control, diferencial traseiro ativo, presente em algumas versões) usa fluido hidráulico específico, diferente de óleo de diferencial convencional. Usar o fluido errado compromete o funcionamento do sistema e pode danificar a bomba.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma Lancer Evolution VI-IX 2001-2007 (4G63T turbo)',
    body: '5.000 km — Troca de óleo do motor, sintético de alta qualidade — motor turbo de alta performance não perdoa negligência de troca. | 40.000-50.000 km — Kit de correia dentada completo, antecipado em relação a motores aspirados por causa da carga do turbo. | 20.000 km — Fluido do sistema AYC, se equipado (fluido específico, não intercambiável). | Sempre — gasolina de alta octanagem obrigatória. | Sempre — marcha lenta 1-2 min antes de desligar após uso intenso.',
  },
]

// ---------- 2011-2017 (Lancer 8ª geração comum — GT/GLX/HL/HLE, importado até 2013, nacional desde 2014) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 2.0 16V é flex (160cv gasolina/165cv etanol) — mais simples e barato que a linha Evolution',
    body: 'Diferente do irmão Evolution, essa geração do Lancer comum usa motor 2.0 16V aspirado flex, bem mais simples e barato de manter — sem as exigências especiais de combustível/óleo do motor turbo.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Unidades 2011-2013 (importadas) não vieram com "kit de tropicalização" — CVT superaquece no clima brasileiro',
    body: 'Unidades do Lancer importadas entre 2011 e 2013 foram projetadas para clima mais ameno que o brasileiro e não vieram de fábrica com o "kit de tropicalização" — um radiador/trocador de calor adicional do óleo do câmbio CVT. Resultado: superaquecimento crônico do CVT relatado por vários donos, com queixas recorrentes no Reclame Aqui. O kit passou a vir de fábrica só a partir de 2014, quando a produção se tornou nacional (Catalão-GO). Se sua unidade é 2011-2013, procure a Mitsubishi para verificar se esse kit foi retrofitado — não é recall oficial aberto, mas é uma falha de projeto amplamente documentada por proprietários.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Lancer 2011-2017 (2.0 16V flex, CVT ou manual)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo. | 40.000 km — Fluido do câmbio CVT — mais crítico em unidades 2011-2013 sem o kit de tropicalização, considere antecipar o intervalo. | 20.000 km — Fluido de freio e filtro de ar/cabine.',
  },
]

// ---------- 2010-2016 (Lancer Evolution X — motor 4B11T, AWD S-AWC, TC-SST) ----------
const MACETES_G4: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 4B11T é totalmente novo (bloco de alumínio) — não confunda peça com o 4G63 das gerações anteriores',
    body: 'A Evolution X trocou o icônico motor 4G63 (bloco de ferro fundido) pelo 4B11T, projeto novo em alumínio. Peça de motor entre as duas famílias NÃO é intercambiável — confirme sempre a geração exata antes de comprar peça, mesmo que o nome "Evolution" seja o mesmo.',
  },
  {
    severity: 'DANGER',
    title: 'Gasolina de alta octanagem é obrigatória — motor turbo de alta compressão não aceita combustível comum',
    body: 'Assim como nas gerações anteriores, o 4B11T exige gasolina de alta octanagem. Abastecer com combustível comum aumenta risco de detonação sob a pressão do turbo — dano de motor é caro e evitável.',
  },
  {
    severity: 'OK',
    title: 'Câmbio TC-SST (dupla embreagem) usa fluido próprio — não confunda com CVT do Lancer comum',
    body: 'O câmbio de dupla embreagem TC-SST da Evolution X é mecanicamente diferente do CVT do Lancer comum e exige fluido específico. Não leve para oficina que só conhece CVT — procure especialista em câmbio dupla embreagem de alta performance.',
  },
]

const PROBLEMAS_G4: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bomba do sistema ACD/AYC pode corroer (defeito conhecido em Evolution 2008-2014) — perda dos modos de condução',
    body: 'É defeito conhecido internacionalmente em Lancer Evolution fabricados entre 2008 e 2014 (inclui a Evolution X vendida no Brasil): a bomba do sistema de diferencial central ativo (ACD) fica exposta e corrói com o tempo. Quando falha, o carro perde os modos de condução selecionáveis (asfalto/cascalho-chuva/neve) e a tração/direção ficam comprometidas. Reparo é caro (na faixa de centenas de dólares em peça importada). Fique atento ao aviso "ACD/AYC Service Required" no painel — é sinal de que a bomba precisa de inspeção.',
  },
]

const MANUTENCAO_G4: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma Lancer Evolution X 2010-2016 (4B11T turbo, S-AWC, TC-SST)',
    body: '5.000 km — Troca de óleo do motor, sintético de alta qualidade. | 40.000-50.000 km — Kit de correia dentada/corrente conforme especificação exata do motor — confirme com especialista Evolution. | 20.000 km — Fluido do câmbio TC-SST e do sistema ACD/AYC, ambos com fluido próprio. | Sempre — gasolina de alta octanagem obrigatória. | Ao notar o aviso "ACD/AYC Service Required" — inspecionar a bomba do sistema imediatamente, corrosão é defeito conhecido dessa geração.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Lancer', yearFrom: 1993, yearTo: 2000, tireSize: '185/65 R14 (referência)', frontPsi: 28, rearPsi: 26, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual do proprietário.' },
  { modelName: 'Lancer', yearFrom: 2001, yearTo: 2007, tireSize: '235/45 R17 (Evolution VI-IX)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 34, rearPsiLoad: 34, sparePsi: 60, notes: 'Pressão mais alta que carro comum — carro de performance. Confirme na etiqueta da coluna da porta.' },
  { modelName: 'Lancer', yearFrom: 2011, yearTo: 2017, tireSize: '205/55 R16 (GLX/GT) ou 215/45 R18 (HLE)', frontPsi: 30, rearPsi: 28, frontPsiLoad: 32, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — versão HLE usa aro maior.' },
  { modelName: 'Lancer', yearFrom: 2010, yearTo: 2016, tireSize: '245/40 R18 (Evolution X)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 34, rearPsiLoad: 34, sparePsi: 60, notes: 'Pressão mais alta que carro comum — carro de performance com AWD. Confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Lancer', yearFrom: 1993, yearTo: 2000, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Lancer', yearFrom: 1993, yearTo: 2000, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Lancer', yearFrom: 1993, yearTo: 2000, component: 'Fluido do câmbio automático (versões GLX automáticas)', intervalKm: 40000, intervalMonths: 24, notes: 'Somente fluido especificado pela Mitsubishi.', priority: 'HIGH', order: 2 },
  { modelName: 'Lancer', yearFrom: 1993, yearTo: 2000, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Lancer', yearFrom: 2001, yearTo: 2007, component: 'Óleo do motor sintético (4G63T turbo)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor de alta performance — não estenda o intervalo.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Lancer', yearFrom: 2001, yearTo: 2007, component: 'Kit de correia dentada completo', intervalKm: 45000, intervalMonths: 48, notes: 'Antecipado em relação a motores aspirados.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Lancer', yearFrom: 2001, yearTo: 2007, component: 'Fluido do sistema AYC (se equipado)', intervalKm: 20000, intervalMonths: 24, notes: 'Fluido específico, não intercambiável.', priority: 'HIGH', order: 6 },
  { modelName: 'Lancer', yearFrom: 2001, yearTo: 2007, component: 'Gasolina de alta octanagem', intervalKm: null, intervalMonths: null, notes: 'Obrigatória — nunca usar combustível comum.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Lancer', yearFrom: 2011, yearTo: 2017, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.0 16V flex.', priority: 'CRITICAL', order: 8 },
  { modelName: 'Lancer', yearFrom: 2011, yearTo: 2017, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 9 },
  { modelName: 'Lancer', yearFrom: 2011, yearTo: 2017, component: 'Fluido do câmbio CVT', intervalKm: 40000, intervalMonths: 24, notes: 'Antecipar em unidades 2011-2013 sem kit de tropicalização.', priority: 'HIGH', order: 10 },
  { modelName: 'Lancer', yearFrom: 2011, yearTo: 2017, component: 'Fluido de freio e filtro de ar/cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 11 },
  { modelName: 'Lancer', yearFrom: 2010, yearTo: 2016, component: 'Óleo do motor sintético (4B11T turbo)', intervalKm: 5000, intervalMonths: 6, notes: null, priority: 'CRITICAL', order: 12 },
  { modelName: 'Lancer', yearFrom: 2010, yearTo: 2016, component: 'Fluido do câmbio TC-SST e sistema ACD/AYC', intervalKm: 20000, intervalMonths: 24, notes: 'Fluidos próprios, não intercambiáveis entre si.', priority: 'HIGH', order: 13 },
  { modelName: 'Lancer', yearFrom: 2010, yearTo: 2016, component: 'Gasolina de alta octanagem', intervalKm: null, intervalMonths: null, notes: 'Obrigatória.', priority: 'CRITICAL', order: 14 },
  { modelName: 'Lancer', yearFrom: 2010, yearTo: 2016, component: 'Inspeção da bomba ACD/AYC (corrosão)', intervalKm: 20000, intervalMonths: 24, notes: 'Defeito conhecido em Evolution 2008-2014 — atenção ao aviso no painel.', priority: 'HIGH', order: 15 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Lancer', yearFrom: 1993, yearTo: 2000, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Lancer', yearFrom: 2001, yearTo: 2007, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Lancer', yearFrom: 2011, yearTo: 2017, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
  { modelName: 'Lancer', yearFrom: 2010, yearTo: 2016, MACETES: MACETES_G4, PROBLEMAS: PROBLEMAS_G4, MANUTENCAO: MANUTENCAO_G4 },
]

async function main() {
  console.log('🚗 Seed Mitsubishi Lancer...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Mitsubishi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Mitsubishi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Lancer', brandId: brand.id } },
    update: {}, create: { name: 'Lancer', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Lancer' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Lancer' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Lancer' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Mitsubishi Lancer concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
