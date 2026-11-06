/**
 * Seed Renault Captur — macetes, problemas, manutenção e calibragem de pneus
 * Vendido no Brasil desde 2017 (produção em São José dos Pinhais/PR, base
 * B0/CMF compartilhada com Duster/Sandero). Pré-facelift 2017-2020: motor
 * 1.6 SCe (corrente de distribuição, comando variável) manual ou CVT
 * X-Tronic; e 2.0 16V (correia dentada) manual ou automático DP2 de 4
 * marchas. Facelift 2021+: nova dianteira, direção assistida elétrica
 * (antes era hidráulica) e chegada do motor 1.3 TCe turbo (163-170cv) com
 * CVT X-Tronic recalibrado (8 marchas simuladas) — o 1.6 SCe seguiu
 * disponível nas versões de entrada (Zen/Life).
 * Execute: pnpm --filter @motormacete/database db:seed:renault-captur
 *
 * Fontes: renault.com.br/recall, vrum.com.br, reclameaqui.com.br,
 *         motoragora.com.br, autopapo.com.br, opinautos.com.br,
 *         oficinaconectada.com.br, mundodoautomovelparapcd.com.br,
 *         procon.sp.gov.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 2017-2020 (pré-facelift, 1.6 SCe / 2.0 16V, direção hidráulica) ----------
const MACETES_PRE: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1.6 SCe tem corrente de distribuição — o 2.0 16V usa correia dentada',
    body: 'O 1.6 SCe (K4M/H4M com comando variável de válvulas) é acionado por corrente de distribuição, item que dura a vida útil do motor sem troca programada (só substitua se houver ruído ou folga). Já o 2.0 16V (F4R) usa correia dentada convencional, que TEM prazo de substituição — confirme sempre qual motor sua unidade tem antes de decidir se precisa desse item na manutenção.',
  },
  {
    severity: 'WARN',
    title: 'Antes de comprar um 2.0 automático DP2 (4 marchas) usado, pesquise o histórico do câmbio',
    body: 'A versão 2.0 16V com câmbio automático de 4 marchas (DP2) acumula reclamações graves de durabilidade e custo de reparo em fóruns e no Reclame Aqui. Ao comprar usado, exija comprovante de troca de óleo do câmbio em dia e, se possível, avaliação de uma oficina de câmbio automático antes de fechar negócio — o custo de um câmbio recondicionado é alto.',
  },
  {
    severity: 'OK',
    title: 'Direção hidráulica: trepidação e ruído na caixa são queixa recorrente, nem sempre é a bomba',
    body: 'Nas versões 2017-2020 (direção hidráulica, antes do facelift elétrico), trepidação ou ruído ao esterçar é queixa comum. Antes de trocar a caixa de direção inteira (peça cara), peça para verificar nível/qualidade do fluido da direção hidráulica e o estado das buchas de fixação da caixa — muitas vezes o problema é mais simples e barato do que parece.',
  },
  {
    severity: 'OK',
    title: 'Oficina especializada em francês (Renault/Peugeot/Citroën) tende a ter peça alternativa mais barata',
    body: 'Peça original em concessionária tem custo elevado. Oficinas especializadas em carros franceses costumam ter mais familiaridade com equivalentes de mercado paralelo (Bosch, Valeo, TRW) e conseguem reduzir bastante o custo de manutenção sem abrir mão de qualidade.',
  },
]

const PROBLEMAS_PRE: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL — furo do canal de óleo do motor (fabricação 24/07/2019 a 21/01/2020) — risco de travamento e incêndio',
    body: 'Recall real da Renault: unidades fabricadas entre 24/07/2019 e 21/01/2020, chassis LI082304 a LI907878 e MJ349051 a MJ352195 (motores Q000539 a Q000608, fabricados entre 30/08/2019 e 13/09/2019), apresentam diâmetro incorreto no canal de suprimento de óleo do motor. Lubrificação insuficiente pode causar travamento do motor ou incêndio. Reparo gratuito (reperfuração do canal, cerca de 1h). Confira o chassi em www.renault.com.br/recall ou pelo 0800 055 5615.',
  },
  {
    severity: 'WARN',
    title: 'RECALL — fechadura do capô (fabricação 20/01/2016 a 22/10/2018) — capô pode abrir em movimento',
    body: 'Recall real: unidades fabricadas entre 20/01/2016 e 22/10/2018, chassis GJ152080-GJ938860, HJ189623-HJ671438, JJ001360-JJ998125 e KJ279543-KJ733972, têm mecanismo de fechadura do capô com não conformidade que pode permitir abertura inesperada em movimento. Reparo gratuito (troca do conjunto da fechadura). Confira o chassi em www.renault.com.br/recall.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio CVT X-Tronic: falhas, ruído e travamento são queixa crônica no Reclame Aqui',
    body: 'Há relatos recorrentes e graves de falha, ruído (grinding) e até travamento do câmbio CVT em uso, alguns caracterizados como defeito crônico. Ao primeiro sinal de trepidação, solavanco ou ruído anormal na troca de marcha, não continue rodando — leve para diagnóstico o quanto antes, pois o custo de uma caixa CVT danificada é alto.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de combustível e falhas no sistema de injeção — verificar mangueiras e conexões',
    body: 'Proprietários relatam vazamento de combustível e problemas no sistema de injeção. Cheiro de combustível na cabine ou no vão do motor não deve ser ignorado — verifique mangueiras, conexões e o anel de vedação do conjunto bomba/bóia do tanque.',
  },
]

const MANUTENCAO_PRE: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Captur 2017-2020 (1.6 SCe ou 2.0 16V)',
    body: '10.000 km — Troca de óleo do motor + filtro (ambos os motores). | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água) — SOMENTE motor 2.0 16V; o 1.6 SCe usa corrente e não tem esse item programado. | 40.000-60.000 km — Óleo do câmbio CVT (mesmo sem troca programada de fábrica, mecânicos experientes recomendam troca completa com filtros para evitar contaminação do trocador de calor). | 20.000 km — Fluido da direção hidráulica (checar nível/qualidade, principal suspeito de ruído na caixa). | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio.',
  },
]

// ---------- 2021-2024 (facelift, direção elétrica, 1.6 SCe entrada + 1.3 TCe turbo) ----------
const MACETES_FL: TipInput[] = [
  {
    severity: 'OK',
    title: 'Facelift trouxe direção elétrica — trepidação na caixa de direção do modelo antigo não se aplica aqui',
    body: 'A partir de 2021 a direção passou a ser assistida eletricamente (EPS), eliminando a bomba, o fluido e a caixa hidráulica das versões anteriores — problemas de trepidação/ruído na direção do Captur 2017-2020 não se aplicam a este facelift. Ruído nesta versão costuma estar em outro ponto (coifa de suspensão, terminal de direção).',
  },
  {
    severity: 'OK',
    title: '1.3 TCe turbo: CVT recalibrado com 8 marchas simuladas — mais responsivo, mas exige o óleo correto',
    body: 'O motor 1.3 TCe turbo (163-170cv) vem com uma versão recalibrada do CVT X-Tronic, com 8 marchas simuladas para reduzir o efeito de "elástico" e melhorar a resposta. Use sempre o fluido especificado pela Renault para essa versão do câmbio — não é intercambiável com o fluido do CVT do 1.6 das versões de entrada.',
  },
  {
    severity: 'OK',
    title: 'Versões de entrada seguiram com o 1.6 SCe (corrente) — confirme o motor antes de orçar peça',
    body: 'Mesmo após o facelift, as versões de entrada (Zen/Life) continuaram sendo vendidas com o motor 1.6 SCe a corrente, enquanto Intense/Iconic passaram a usar o 1.3 TCe turbo. Peça de motor, injeção e câmbio NÃO são intercambiáveis entre os dois — confirme sempre o motor exato da sua unidade (etiqueta no capô ou manual) antes de comprar peça.',
  },
]

const PROBLEMAS_FL: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL — risco de incêndio no motor 1.3 TCe turbo (fabricação 04/05/2021 a 16/11/2021)',
    body: 'Recall real da Renault: unidades com motor 1.3 TCe turbo fabricadas entre 04/05/2021 e 16/11/2021, chassis J013800 a J966463, apresentam falta de vedação entre o jato de lavagem do para-brisa e o capô. Infiltração de água combinada com combustível de qualidade ruim pode corroer os bicos injetores, causando combustão irregular e, em casos graves, incêndio. Reparo gratuito (aplicação de vedante no jato + inspeção dos bicos injetores, até 1h30). Confira o chassi em www.renault.com.br/recall ou pelo 0800 055 5615 — NÃO ignore esse recall mesmo que o carro pareça funcionar normalmente.',
  },
  {
    severity: 'WARN',
    title: 'Trocador de calor do CVT pode vazar óleo por volta de 48.000 km — atenção ao líquido de arrefecimento correto',
    body: 'Há relatos consistentes de vazamento de óleo no "trocador de calor" (heat exchanger) do câmbio CVT por volta de 48.000 km, contaminando e danificando a transmissão. A causa apontada é o uso de aditivo de arrefecimento incompatível (existem tipos diferentes para motor de alumínio e ferro fundido), que corrói o trocador e mistura os fluidos. Use sempre o aditivo especificado pela Renault na troca de arrefecimento e, se notar óleo do câmbio escurecido ou com cheiro de queimado, verifique o trocador de calor imediatamente.',
  },
]

const MANUTENCAO_FL: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Captur 2021+ (1.6 SCe entrada ou 1.3 TCe turbo)',
    body: '10.000 km — Troca de óleo do motor + filtro (ambos os motores; o 1.3 turbo é mais sensível à periodicidade por rodar sob maior pressão/temperatura). | 40.000-60.000 km — Óleo do câmbio CVT com o fluido específico da versão (1.6 e 1.3 turbo usam fluidos diferentes, não troque um pelo outro). | Sempre — usar o aditivo de arrefecimento especificado pela Renault (nunca misturar tipos) para evitar corrosão do trocador de calor do câmbio CVT. | 20.000 km — Filtro de ar e filtro de cabine (mais crítico no 1.3 turbo por causa do intercooler). | 40.000 km — Fluido de freio. | 60.000 km — Velas de ignição (mais importante no 1.3 turbo).',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Captur', yearFrom: 2017, yearTo: 2020, tireSize: '205/60 R16 (Zen/Intense) · 215/55 R17 (Intense Bose)', frontPsi: 30, rearPsi: 30, frontPsiLoad: 32, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta do motorista ou no manual — aro 17" (Bose) pode ter calibragem levemente diferente do aro 16".' },
  { modelName: 'Captur', yearFrom: 2021, yearTo: null, tireSize: '205/60 R16 (Zen/Life) · 205/50 R17 (Intense/Iconic)', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 33, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta do motorista ou no manual — pressão pode variar entre versão 1.6 e 1.3 turbo pelo peso do motor/carga do eixo.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Captur', yearFrom: 2017, yearTo: 2020, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Válido para 1.6 SCe e 2.0 16V.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Captur', yearFrom: 2017, yearTo: 2020, component: 'Kit de correia dentada (correia + tensores + bomba d\'água) — somente motor 2.0 16V', intervalKm: 60000, intervalMonths: 60, notes: 'O 1.6 SCe usa corrente de distribuição, sem esse item programado.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Captur', yearFrom: 2017, yearTo: 2020, component: 'Óleo do câmbio CVT (troca completa com filtros)', intervalKm: 50000, intervalMonths: 48, notes: 'Não programado de fábrica, mas recomendado por mecânicos para evitar contaminação do trocador de calor.', priority: 'HIGH', order: 2 },
  { modelName: 'Captur', yearFrom: 2017, yearTo: 2020, component: 'Fluido da direção hidráulica', intervalKm: 20000, intervalMonths: 24, notes: 'Principal suspeito em caso de trepidação/ruído na caixa de direção.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Captur', yearFrom: 2017, yearTo: 2020, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'Captur', yearFrom: 2017, yearTo: 2020, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'Captur', yearFrom: 2021, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Válido para 1.6 SCe e 1.3 TCe turbo.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Captur', yearFrom: 2021, yearTo: null, component: 'Óleo do câmbio CVT com fluido específico da versão', intervalKm: 50000, intervalMonths: 48, notes: '1.6 e 1.3 turbo usam fluidos diferentes — não intercambiar.', priority: 'HIGH', order: 7 },
  { modelName: 'Captur', yearFrom: 2021, yearTo: null, component: 'Líquido de arrefecimento (usar somente o tipo especificado)', intervalKm: 40000, intervalMonths: 24, notes: 'Aditivo incorreto corrói o trocador de calor do CVT e contamina o câmbio.', priority: 'CRITICAL', order: 8 },
  { modelName: 'Captur', yearFrom: 2021, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: 'Mais crítico no 1.3 turbo por causa do intercooler.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Captur', yearFrom: 2021, yearTo: null, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'Captur', yearFrom: 2021, yearTo: null, component: 'Velas de ignição', intervalKm: 60000, intervalMonths: 48, notes: 'Mais importante no motor 1.3 turbo.', priority: 'MEDIUM', order: 11 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Captur', yearFrom: 2017, yearTo: 2020, MACETES: MACETES_PRE, PROBLEMAS: PROBLEMAS_PRE, MANUTENCAO: MANUTENCAO_PRE },
  { modelName: 'Captur', yearFrom: 2021, yearTo: null, MACETES: MACETES_FL, PROBLEMAS: PROBLEMAS_FL, MANUTENCAO: MANUTENCAO_FL },
]

async function main() {
  console.log('🚗 Seed Renault Captur...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Renault', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Renault', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Captur', brandId: brand.id } },
    update: {}, create: { name: 'Captur', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Captur' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Captur' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Captur' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Renault Captur concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
