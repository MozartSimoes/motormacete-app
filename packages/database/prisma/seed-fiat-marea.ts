/**
 * Seed Fiat Marea — macetes, problemas, manutenção e calibragem de pneus
 * Vendido no Brasil de 1998 a 2007, fabricado em Betim (MG), sucessor do
 * Tempra. Lançou com o exclusivo motor 5 cilindros 2.0 20V (142cv) e logo
 * depois o Turbo 2.0 20V (182cv, o sedã brasileiro mais rápido da época).
 * Em 2000 chegou o 1.8 16V (motor "comum", 4 cilindros, produzido em
 * Betim) como entrada e o 2.4 20V 5 cilindros (160cv). Câmbio automático
 * de 4 marchas (mesmo do Vectra da época) chegou em 2001, exclusivo do
 * HLX. Facelift em 2001 (traseira com lanternas do Lancia Lybra) e em
 * 2006 (nova traseira e grade). Versão de entrada 1.6 16V só chegou em
 * 2005-2007, no fim da vida do modelo. Fama de "carro problemático" vem
 * principalmente de um erro no manual brasileiro (intervalo de óleo
 * incorreto) combinado a uso de óleo mineral onde só sintético era
 * aceito — não de defeito de projeto do motor em si.
 * Nenhum recall oficial foi localizado para o Marea no Brasil.
 * Execute: pnpm --filter @motormacete/database db:seed:fiat-marea
 *
 * Fontes: autopapo.com.br, reparacaoautomotiva.com.br, canaltech.com.br,
 *         carro.blog.br, vrum.com.br, carzin.com.br, en.wikipedia.org
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1998-2000 (lançamento, só motores 5 cilindros) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor 5 cilindros: use SOMENTE óleo sintético — ignore o intervalo de 20.000 km do manual brasileiro',
    body: 'O manual do proprietário brasileiro da época especificava troca de óleo a cada 20.000 km, mas o motor 5 cilindros (2.0 20V ou 2.0 20V Turbo) exige óleo 100% sintético e um intervalo bem mais curto. Foi essa combinação — intervalo longo demais + muita gente usando óleo mineral por desconhecer a exigência — que causou motores fundidos com menos de 50.000 km e deu a fama ruim ao carro. Troque a cada 5.000-7.500 km com sintético de qualidade, e o motor é bem mais confiável do que a fama sugere.',
  },
  {
    severity: 'WARN',
    title: 'Correia dentada do 5 cilindros exige remoção do motor — procure oficina especializada em Fiat/Alfa/Lancia',
    body: 'Diferente da maioria dos carros, trocar a correia dentada do motor 5 cilindros exige soltar os coxins e deslocar o motor do lugar para ter acesso — serviço caro e demorado, e não é todo mecânico que sabe fazer direito. Procure oficina com experiência comprovada nesse motor especificamente (compartilhado com Alfa Romeo 155/156 e Lancia da época) antes de fechar orçamento.',
  },
  {
    severity: 'OK',
    title: 'Vão do motor é extremamente apertado — mão de obra custa mais em qualquer serviço',
    body: 'O motor 5 cilindros transversal deixa pouquíssimo espaço entre o conjunto mecânico e os cubos de roda. Isso encarece qualquer serviço, não só a correia — vela, bomba d\'água, alternador, tudo exige mais tempo de mão de obra. Ao orçar serviço, pergunte se o valor já considera essa dificuldade de acesso antes de fechar.',
  },
  {
    severity: 'OK',
    title: 'Peça de motor é cara e às vezes importada — pesquise por peça de Alfa 155/156 e Lancia como alternativa',
    body: 'Peças do motor 5 cilindros e do Turbo eram em parte importadas, o que encarece a reposição. Como o motor é compartilhado com Alfa Romeo 155/156 e modelos Lancia da época, vale pesquisar fornecedores especializados nessas marcas — às vezes a peça é a mesma com preço mais competitivo.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Epidemia histórica de motor fundido com menos de 50.000 km — causa conhecida, evitável',
    body: 'A combinação de manual brasileiro com intervalo de óleo incorreto (20.000 km) e uso de óleo mineral em vez do sintético exigido causou lubrificação inadequada e motores fundidos com pouquíssima quilometragem em boa parte da frota nos anos 2000. O motor em si não tem defeito de projeto — é um problema de manutenção mal orientada. Seguindo o intervalo correto (5.000-7.500 km, só sintético), o motor 5 cilindros é robusto.',
  },
  {
    severity: 'WARN',
    title: 'Turbo: deixe o motor em marcha lenta antes de desligar após uso intenso',
    body: 'No Turbo 2.0 20V (182cv), desligar o motor imediatamente após rodar em alta rotação/velocidade prejudica o turbocompressor (óleo para de circular com a turbina ainda girando quente). Deixe o motor em marcha lenta por 30-60 segundos antes de desligar depois de uso mais exigente — hábito simples que evita falha prematura do turbo.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma Marea 1998-2000 (2.0 20V ou 2.0 20V Turbo, 5 cilindros)',
    body: '5.000-7.500 km — Troca de óleo do motor + filtro, SOMENTE óleo 100% sintético (ignore o intervalo de 20.000 km do manual brasileiro — é a causa histórica de motor fundido nesse carro). | 50.000 km — Kit de correia dentada completo (correia + tensores + bomba d\'água) — serviço exige remoção do motor, procure oficina especializada. | Sempre — deixar o motor em marcha lenta 30-60s antes de desligar após uso intenso (Turbo). | 20.000 km — Fluido de freio. | 20.000 km — Filtro de ar e filtro de cabine.',
  },
]

// ---------- 2000-2004 (chegada do 1.8 16V, 2.4 20V, câmbio automático, facelift 2001) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: '1.8 16V é bem mais barato de manter que os motores 5 cilindros — considere na hora de comprar',
    body: 'O motor 1.8 16V (4 cilindros, produzido em Betim) não exige remoção do motor para trocar a correia dentada e tem peça mais barata e fácil de achar que os 5 cilindros. Se o orçamento de manutenção é prioridade, um Marea 1.8 custa sensivelmente menos para manter que um 2.0/2.4/Turbo — mesmo perdendo em desempenho.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático de 4 marchas (só HLX, a partir de 2001) é o mesmo do Vectra da época — peça cruzada',
    body: 'O câmbio automático disponível a partir de 2001 (exclusivo da versão HLX) é o mesmo conjunto usado no Chevrolet Vectra da época. Ao procurar peça ou oficina especializada em câmbio automático, pesquisar também por essa referência cruzada pode ampliar as opções de reparo.',
  },
  {
    severity: 'OK',
    title: 'A partir do facelift 2001, lanterna traseira é compartilhada com o Lancia Lybra',
    body: 'O redesenho de 2001 trouxe lanternas traseiras baseadas nas do Lancia Lybra. Ao procurar peça de lanterna para unidades 2001 em diante, pesquisar também por essa referência pode ajudar a encontrar peça alternativa ou de desmanche mais rápido.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'O problema histórico de óleo/lubrificação também vale para o 2.4 20V (5 cilindros)',
    body: 'O motor 2.4 20V, introduzido em 2000, é outra variante do 5 cilindros e sofre da mesma exigência de óleo 100% sintético com intervalo curto (5.000-7.500 km). Não repita o erro do intervalo de 20.000 km do manual brasileiro — a causa da fama de "motor fraco" do Marea é lubrificação inadequada, não o projeto do motor.',
  },
  {
    severity: 'OK',
    title: '1.8 16V não tem o problema de acesso apertado dos 5 cilindros para manutenção',
    body: 'Diferente do 2.0/2.4/Turbo, o motor 1.8 16V tem vão de motor com acesso mais tranquilo, reduzindo o custo de mão de obra em serviços de rotina (velas, correias auxiliares, bomba d\'água).',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Marea 2000-2004 (1.8 16V, 2.0/2.4 20V ou Turbo)',
    body: '5.000-7.500 km — Troca de óleo do motor + filtro, sintético nos motores 5 cilindros (2.0/2.4/Turbo); semissintético de qualidade aceitável no 1.8 16V, mas sintético é sempre mais seguro. | 50.000 km — Kit de correia dentada — remoção do motor necessária SOMENTE nos 5 cilindros; no 1.8 16V o serviço é convencional. | 40.000 km — Fluido do câmbio automático (versões HLX com automático de 4 marchas). | 20.000 km — Fluido de freio. | 20.000 km — Filtro de ar e filtro de cabine.',
  },
]

// ---------- 2005-2007 (chegada do 1.6 16V entrada, facelift 2006, fim de linha) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: '1.6 16V Torque (106cv) foi a versão de entrada de fim de linha — mecânica mais simples e barata',
    body: 'Lançado só em 2005, o 1.6 16V Torque foi a versão de entrada dos últimos anos do Marea, com motor 4 cilindros mais simples e barato de manter que os 5 cilindros — sem os cuidados especiais de óleo sintético/intervalo curto que os motores 2.0/2.4/Turbo exigem.',
  },
  {
    severity: 'OK',
    title: 'Facelift 2006 trouxe nova traseira e grade — confirme a peça certa ao comprar para-choque/lanterna',
    body: 'A partir de 2006 o Marea recebeu nova traseira e nova grade dianteira, diferentes das versões 2001-2005. Ao comprar peça de lataria (para-choque, lanterna, grade), confirme o ano exato da sua unidade — peça do facelift anterior não encaixa.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motores 5 cilindros (2.0/2.4/Turbo) seguiram disponíveis e com a mesma exigência de óleo sintético',
    body: 'Mesmo no fim da produção, as versões com motor 5 cilindros mantêm a mesma exigência de óleo 100% sintético com troca a cada 5.000-7.500 km. Só o 1.6 16V (entrada) escapa dessa exigência mais rígida.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Marea 2005-2007 (1.6 16V, ou 2.0/2.4/Turbo 5 cilindros)',
    body: '7.500-10.000 km — Troca de óleo do motor + filtro no 1.6 16V (menos exigente). | 5.000-7.500 km — Troca de óleo sintético nos motores 5 cilindros (2.0/2.4/Turbo). | 50.000 km — Kit de correia dentada (remoção do motor necessária apenas nos 5 cilindros). | 40.000 km — Fluido do câmbio automático (HLX automático). | 20.000 km — Fluido de freio e filtro de ar/cabine.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Marea', yearFrom: 1998, yearTo: 2007, tireSize: '185/65 R14 (SX/ELX) · 195/60 R15 (HLX/Turbo)', frontPsi: 30, rearPsi: 28, frontPsiLoad: 32, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual — versão Turbo e HLX usam aro maior e podem ter calibragem levemente diferente.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Marea', yearFrom: 1998, yearTo: 2000, component: 'Óleo do motor 100% sintético + filtro', intervalKm: 7500, intervalMonths: 12, notes: 'Motor 5 cilindros — nunca use mineral nem estenda para 20.000 km.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Marea', yearFrom: 1998, yearTo: 2000, component: 'Kit de correia dentada (exige remoção do motor)', intervalKm: 50000, intervalMonths: 60, notes: 'Procure oficina especializada em Fiat/Alfa/Lancia 5 cilindros.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Marea', yearFrom: 1998, yearTo: 2000, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Marea', yearFrom: 1998, yearTo: 2000, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'Marea', yearFrom: 2000, yearTo: 2004, component: 'Óleo do motor (sintético nos 5 cilindros; semissintético aceitável no 1.8) + filtro', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 4 },
  { modelName: 'Marea', yearFrom: 2000, yearTo: 2004, component: 'Kit de correia dentada', intervalKm: 50000, intervalMonths: 60, notes: 'Remoção do motor necessária só nos 5 cilindros (2.0/2.4/Turbo).', priority: 'CRITICAL', order: 5 },
  { modelName: 'Marea', yearFrom: 2000, yearTo: 2004, component: 'Fluido do câmbio automático (HLX automático)', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'Marea', yearFrom: 2000, yearTo: 2004, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'Marea', yearFrom: 2000, yearTo: 2004, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'Marea', yearFrom: 2005, yearTo: 2007, component: 'Óleo do motor + filtro (1.6 16V)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor mais simples, menos exigente que os 5 cilindros.', priority: 'HIGH', order: 9 },
  { modelName: 'Marea', yearFrom: 2005, yearTo: 2007, component: 'Óleo 100% sintético (2.0/2.4/Turbo, 5 cilindros)', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 10 },
  { modelName: 'Marea', yearFrom: 2005, yearTo: 2007, component: 'Kit de correia dentada', intervalKm: 50000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 11 },
  { modelName: 'Marea', yearFrom: 2005, yearTo: 2007, component: 'Fluido de freio e filtros de ar/cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 12 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Marea', yearFrom: 1998, yearTo: 2000, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Marea', yearFrom: 2000, yearTo: 2004, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Marea', yearFrom: 2005, yearTo: 2007, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
]

async function main() {
  console.log('🚗 Seed Fiat Marea...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Fiat', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Fiat', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Marea', brandId: brand.id } },
    update: {}, create: { name: 'Marea', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Marea' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Marea' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Marea' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Fiat Marea concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
