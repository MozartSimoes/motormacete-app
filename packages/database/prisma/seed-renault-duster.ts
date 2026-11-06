/**
 * Seed Renault Duster — macetes, problemas, manutenção e calibragem de pneus
 * Vendido no Brasil desde 2011, sempre sobre a plataforma B0 (mesma de
 * Sandero/Logan/Oroch). Original (2011-2015): motores 1.6 16V K4M e 2.0
 * 16V F4R, ambos a correia dentada, só manual. Facelift (2016-2021):
 * chegada gradual do motor 1.6 SCe H4M (corrente, comando variável) no
 * lugar do K4M, câmbio CVT X-Tronic pareado ao 1.6 e automático DP2 de 4
 * marchas no 2.0, além de várias campanhas de recall documentadas oficialmente
 * pela Renault nesse período. A partir de 2022: chegada do motor 1.3 TCe
 * turbo ao lado do 1.6 SCe. Uma geração totalmente nova (plataforma CMF-B,
 * mesma do Kardian/Boreal) foi confirmada pela Renault para o Brasil mas
 * ainda não estava à venda até a data desta pesquisa — não confundir com
 * o Duster atual, que segue sendo a mesma base B0 desde 2011.
 * Supersede o conteúdo antigo e resumido do seed.ts legado.
 * Execute: pnpm --filter @motormacete/database db:seed:renault-duster
 *
 * Fontes: renault.com.br/recall, mobiauto.com.br, terra.com.br,
 *         omecanico.com.br, oficinabrasil.com.br, flatout.com.br,
 *         revistacarro.com.br, autossegredos.com.br, vrum.com.br,
 *         garagem360.com.br, renotech.com.br, peca.renault.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 2011-2015 (original, 1.6 K4M / 2.0 F4R, correia, só manual) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Protetor de cárter é essencial para quem roda off-road',
    body: 'O motor do Duster fica baixo em relação ao solo. Para quem usa trilha, um protetor de cárter de aço (R$ 300-500) evita que uma pedra fure o cárter — muito mais barato que reparar um motor sem óleo no meio do mato.',
  },
  {
    severity: 'OK',
    title: 'Ambos os motores (1.6 K4M e 2.0 F4R) usam correia dentada — motor interferente',
    body: 'Nessa geração original, tanto o 1.6 16V quanto o 2.0 16V usam correia dentada convencional (nenhum dos dois tem corrente). O fabricante especifica troca a cada 80.000 km, mas mecânicos experientes recomendam antecipar para 50.000-60.000 km — o motor é interferente e a quebra da correia causa dano grave.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL — airbag do motorista (fabricação maio/junho de 2014) — falha por tensão térmica',
    body: 'Recall oficial: unidades fabricadas entre 07/05/2014-19/05/2014 e 06/06/2014-23/06/2014, chassis FJ355167-FJ401184 e GJ928087-GJ989889, têm estrutura do airbag do motorista que não suporta tensão térmica adequadamente, podendo falhar ou acionar de forma ineficiente em uma colisão. Reparo gratuito (verificação e/ou substituição). Confira o chassi em www.renault.com.br/recall ou pelo 0800 055 5615.',
  },
  {
    severity: 'WARN',
    title: 'Motor 2.0 16V com consumo de óleo acima de 80.000 km',
    body: 'O motor 2.0 16V (F4R) apresenta consumo de óleo progressivo após 80 mil km, associado a desgaste dos anéis de segmento. Monitore o nível mensalmente e não espere a luz de óleo acender para completar.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Duster 2011-2015 (1.6 16V K4M ou 2.0 16V F4R)',
    body: '10.000 km — Troca de óleo do motor + filtro (sintético 5W30 API SN). | 50.000-60.000 km — Kit de correia dentada completo (correia + tensores + bomba d\'água) — motor interferente nos dois motores, não espere os 80.000 km de fábrica. | 40.000 km — Fluido do diferencial traseiro em versões 4x4, essencial para quem roda off-road. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio.',
  },
]

// ---------- 2016-2021 (facelift, chegada do 1.6 SCe/corrente + CVT, recalls documentados) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'A partir dessa fase o 1.6 passou a ser SCe (H4M) com corrente — confirme qual motor sua unidade tem',
    body: 'Nessa geração o motor 1.6 16V K4M (correia) foi gradualmente substituído pelo 1.6 SCe H4M, com corrente de distribuição e comando variável de válvulas — mais moderno e sem item de correia programado. O 2.0 16V F4R seguiu com correia dentada normalmente. Confirme na etiqueta do motor (sob o capô) ou no manual qual dos dois sua unidade tem antes de orçar o kit de distribuição — comprar peça errada é prejuízo certo.',
  },
  {
    severity: 'WARN',
    title: 'CVT X-Tronic: não force subidas longas com o ar-condicionado ligado',
    body: 'O câmbio CVT do 1.6 aquece excessivamente em subidas longas com AC ligado. Se sentir o carro "segurando" a potência, desligue o ar-condicionado temporariamente para aliviar a carga térmica do câmbio — evita desgaste prematuro do CVT.',
  },
  {
    severity: 'OK',
    title: 'Versão 2.0 automática usa câmbio DP2 de 4 marchas, não CVT — histórico de reparo é diferente',
    body: 'As versões 2.0 automáticas (DAKAR 4x2, TECHROAD, Dynamique) usam o câmbio conversor de torque DP2 de 4 marchas, mecanicamente diferente do CVT do 1.6. Ao pesquisar problema de câmbio relatado por outro dono, confirme primeiro qual dos dois câmbios ele tinha — as queixas não se aplicam necessariamente ao seu.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL — airbag do motorista (fabricação 2016-2019) — mesma falha de tensão térmica',
    body: 'Recall oficial: unidades fabricadas entre 14/09/2016 e 19/06/2019, chassis HJ474607-HJ600336, KJ746823-KJ797677 e LJ002318-LJ995785, têm o mesmo defeito de estrutura do airbag do motorista sensível à tensão térmica. Reparo gratuito. Confira o chassi em www.renault.com.br/recall ou pelo 0800 055 5615.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL — mangueira da direção hidráulica (fabricação jul-ago/2016) — risco de perda de assistência',
    body: 'Recall oficial: unidades fabricadas entre 29/07/2016 e 24/08/2016, chassis HJ246871 a HJ547067, apresentam risco de ruptura da parte flexível da mangueira de direção hidráulica, podendo causar perda de assistência de direção. Reparo gratuito. Confira o chassi em www.renault.com.br/recall.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL — parafusos de fixação do eixo traseiro e berço do motor (fabricação ago-set/2016)',
    body: 'Recall oficial: unidades fabricadas entre 03/08/2016 e 29/09/2016, chassis HJ246871 a HJ600336, tiveram falha de aplicação de torque nos parafusos de fixação do eixo traseiro e do berço do motor, com risco de deformação ou ruptura que afeta a dirigibilidade. Reparo gratuito. Confira o chassi em www.renault.com.br/recall.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL — vedação do servo-freio (fabricação 2017-2018) — risco de deficiência de frenagem',
    body: 'Recall oficial: unidades fabricadas entre 23/08/2017 e 08/03/2018, chassis JJ010976-JJ997934, JM417734-JM422460 e KJ223976-KJ307279, apresentam falha na vedação do servo-freio, podendo causar endurecimento do pedal e deficiência de frenagem. Reparo gratuito. Confira o chassi em www.renault.com.br/recall.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL — orifício de alimentação de óleo do motor (fabricação jul/2019-jan/2020) — risco de travamento e incêndio',
    body: 'Recall oficial: unidades fabricadas entre 24/07/2019 e 21/01/2020, chassis LI090492 a LI207977, têm diâmetro incorreto no orifício de alimentação de óleo do motor. Mesma falha documentada em Captur/Clio/Sandero/Logan/Oroch do mesmo período — risco de lubrificação deficiente, travamento do motor ou incêndio. Reparo gratuito (nova perfuração). Confira o chassi em www.renault.com.br/recall.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL — cilindro de ignição (fabricação fev-ago/2020) — risco de aceleração/desaceleração inesperada',
    body: 'Recall oficial: unidades fabricadas entre 14/02/2020 e 31/08/2020, chassis J108199 a J536197, têm não conformidade interna no cilindro de ignição, com risco de aceleração ou desaceleração inesperada do veículo. Reparo gratuito. Confira o chassi em www.renault.com.br/recall.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL — tubo do ar-condicionado encostando no tubo de combustível (fabricação fev-jul/2020) — risco de incêndio',
    body: 'Recall oficial: unidades fabricadas entre 10/02/2020 e 20/07/2020, chassis J106478 a J536311, têm o tubo do ar-condicionado em contato com o tubo de combustível, com risco de vazamento e incêndio. Reparo gratuito (reposicionamento do tubo). Confira o chassi em www.renault.com.br/recall.',
  },
  {
    severity: 'WARN',
    title: 'Diferencial traseiro com ruído em uso off-road intenso sem troca do fluido',
    body: 'Uso off-road intenso sem troca do fluido do diferencial traseiro (versões 4x4) causa ruído progressivo e, no limite, dano ao componente. Troque o fluido a cada 40.000 km — diferencial seco é reparo caro.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Duster 2016-2021 (1.6 SCe/K4M ou 2.0 16V F4R)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 50.000-60.000 km — Kit de correia dentada completo — SOMENTE se sua unidade tiver o motor 1.6 K4M (correia) ou o 2.0 16V F4R; o 1.6 SCe usa corrente e não tem esse item. | 40.000-50.000 km — Óleo do câmbio CVT (recomendado por mecânicos mesmo sem troca programada de fábrica, para evitar desgaste térmico após uso intenso). | 40.000 km — Fluido do diferencial traseiro (versões 4x4). | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio.',
  },
]

// ---------- 2022-atual (chegada do 1.3 TCe turbo) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1.3 TCe turbo (163-170cv) chegou ao lado do 1.6 SCe — versões de entrada seguem com o 1.6',
    body: 'Desde 2022 o topo de linha (Iconic, Iconic Plus) recebeu o motor 1.3 TCe turbo, enquanto as versões de entrada (Intense, Intense Plus) seguem com o 1.6 SCe aspirado. Peça de motor, injeção e câmbio dos dois motores NÃO são intercambiáveis — confirme sempre o motor exato na etiqueta sob o capô antes de comprar peça.',
  },
  {
    severity: 'OK',
    title: 'Uma geração totalmente nova (CMF-B) já foi confirmada para o Brasil — não confunda com o Duster atual',
    body: 'A Renault confirmou uma nova geração do Duster para o Brasil sobre a plataforma CMF-B (mesma base moderna do Kardian/Boreal), maior e com motorização revista. Até a data desta pesquisa esse novo modelo ainda não estava à venda — o Duster comercializado atualmente é a mesma base B0 de 2011, só com atualizações de motor e visual ao longo do tempo.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL — amortecedores dianteiros (fabricação mar-abr/2023) — risco de quebra do eixo em uso severo',
    body: 'Recall oficial: unidades fabricadas entre 06/03/2023 e 14/04/2023, chassis J561348 a J621374, apresentam risco de quebra do eixo do amortecedor dianteiro em condições severas de uso, com risco de perda de dirigibilidade e acidente. Reparo gratuito (verificação e/ou substituição). Confira o chassi em www.renault.com.br/recall ou pelo 0800 055 5615.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL — fixação do rolamento do eixo traseiro (fabricação set-dez/2024) — risco de perda de controle',
    body: 'Recall oficial: unidades fabricadas entre 16/09/2024 e 06/12/2024, chassis J060924 a J187197, apresentam falha no processo de usinagem da rosca de algumas fixações do rolamento do eixo traseiro, que podem se soltar, com risco de perda de controle do veículo. Reparo gratuito (verificação e troca de componentes). Confira o chassi em www.renault.com.br/recall.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Duster 2022+ (1.6 SCe ou 1.3 TCe turbo)',
    body: '10.000 km — Troca de óleo do motor + filtro (o 1.3 turbo é mais sensível à periodicidade, não estenda o intervalo). | 40.000-50.000 km — Óleo do câmbio CVT com fluido específico da versão. | 40.000 km — Fluido do diferencial traseiro (versões 4x4). | 20.000 km — Filtro de ar e filtro de cabine (mais crítico no 1.3 turbo por causa do intercooler). | 40.000 km — Fluido de freio. | 60.000 km — Velas de ignição (mais importante no motor turbo).',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Duster', yearFrom: 2011, yearTo: 2015, tireSize: '215/65 R16', frontPsi: 30, rearPsi: 32, frontPsiLoad: 33, rearPsiLoad: 36, sparePsi: 60, notes: 'Traseiro com mais pressão, distribui melhor o peso do SUV. Confirme na etiqueta da coluna da porta.' },
  { modelName: 'Duster', yearFrom: 2016, yearTo: 2021, tireSize: '215/60 R16 ou 215/55 R17 conforme versão', frontPsi: 30, rearPsi: 33, frontPsiLoad: 33, rearPsiLoad: 38, sparePsi: 60, notes: 'Traseiro com mais pressão, distribui melhor o peso do SUV. Confirme na etiqueta da coluna da porta.' },
  { modelName: 'Duster', yearFrom: 2022, yearTo: null, tireSize: '215/60 R17 (Intense/Iconic) ou 215/55 R18 conforme versão', frontPsi: 30, rearPsi: 33, frontPsiLoad: 33, rearPsiLoad: 38, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — versões com o 1.3 turbo podem ter recomendação levemente diferente.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Duster', yearFrom: 2011, yearTo: 2015, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Válido para 1.6 16V K4M e 2.0 16V F4R.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Duster', yearFrom: 2011, yearTo: 2015, component: 'Kit de correia dentada completo (correia + tensores + bomba d\'água)', intervalKm: 55000, intervalMonths: 60, notes: 'Fábrica especifica 80.000 km, mas recomenda-se antecipar — motor interferente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Duster', yearFrom: 2011, yearTo: 2015, component: 'Fluido do diferencial traseiro (versões 4x4)', intervalKm: 40000, intervalMonths: 24, notes: 'Essencial para quem roda off-road.', priority: 'HIGH', order: 2 },
  { modelName: 'Duster', yearFrom: 2011, yearTo: 2015, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'Duster', yearFrom: 2011, yearTo: 2015, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'Duster', yearFrom: 2016, yearTo: 2021, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Válido para 1.6 SCe/K4M e 2.0 16V F4R.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Duster', yearFrom: 2016, yearTo: 2021, component: 'Kit de correia dentada completo — somente motores K4M/F4R (correia)', intervalKm: 55000, intervalMonths: 60, notes: 'O 1.6 SCe usa corrente e não tem esse item — confirme o motor antes.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Duster', yearFrom: 2016, yearTo: 2021, component: 'Óleo do câmbio CVT', intervalKm: 45000, intervalMonths: 48, notes: 'Recomendado por mecânicos mesmo sem troca programada de fábrica.', priority: 'HIGH', order: 7 },
  { modelName: 'Duster', yearFrom: 2016, yearTo: 2021, component: 'Fluido do diferencial traseiro (versões 4x4)', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'Duster', yearFrom: 2016, yearTo: 2021, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'Duster', yearFrom: 2016, yearTo: 2021, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'Duster', yearFrom: 2022, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Válido para 1.6 SCe e 1.3 TCe turbo.', priority: 'CRITICAL', order: 11 },
  { modelName: 'Duster', yearFrom: 2022, yearTo: null, component: 'Óleo do câmbio CVT com fluido específico da versão', intervalKm: 45000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 12 },
  { modelName: 'Duster', yearFrom: 2022, yearTo: null, component: 'Fluido do diferencial traseiro (versões 4x4)', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 13 },
  { modelName: 'Duster', yearFrom: 2022, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: 'Mais crítico no 1.3 turbo por causa do intercooler.', priority: 'MEDIUM', order: 14 },
  { modelName: 'Duster', yearFrom: 2022, yearTo: null, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 15 },
  { modelName: 'Duster', yearFrom: 2022, yearTo: null, component: 'Velas de ignição', intervalKm: 60000, intervalMonths: 48, notes: 'Mais importante no motor 1.3 turbo.', priority: 'MEDIUM', order: 16 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Duster', yearFrom: 2011, yearTo: 2015, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Duster', yearFrom: 2016, yearTo: 2021, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Duster', yearFrom: 2022, yearTo: null, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
]

async function main() {
  console.log('🚗 Seed Renault Duster...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Renault', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Renault', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Duster', brandId: brand.id } },
    update: {}, create: { name: 'Duster', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Duster' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Duster' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Duster' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Renault Duster concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
