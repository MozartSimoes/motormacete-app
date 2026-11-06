/**
 * Seed Mercedes-Benz CLK — macetes, problemas, manutenção e calibragem
 * 1ª geração (C208, 1997-2002/2003): cupê/cabriolet sobre plataforma do
 * Classe C (W202), motores M111 2.3 Kompressor (4 cilindros sobrealimentado),
 * M112 3.2 V6 e M113 4.3/5.5 V8 (incluindo CLK 55 AMG). 2ª geração (C209,
 * 2003-2009): plataforma do Classe E (W211), motores M112 3.2 V6 (até 2005),
 * M113 5.0 V8 e 5.5 AMG, e a partir de 2006 o M272 3.5 V6 (CLK 350) — este
 * último com defeito crônico documentado internacionalmente na engrenagem
 * do eixo balanceador. Recall real localizado no Brasil: CLK 350 e CLK 500
 * fabricados entre jan/2006 e jul/2006, chassis WDBTJ56W66F191222 a
 * WDBTJ72J87F208688, por risco de descolamento do vidro corrediço do
 * teto solar.
 * Execute: pnpm --filter @motormacete/database db:seed:mercedes-clk
 *
 * Fontes: revistacarro.com.br, oficinabrasil.com.br, procon.sp.gov.br,
 *         en.wikipedia.org (CLK C208/C209), benzworld.org, mbclub.co.uk,
 *         mbworld.org, mercedesmedic.com, portalmercedesbrasil.com,
 *         sbautowerks.com, tibao.hk
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1997-2002 (1ª geração C208 — CLK 230 Kompressor, 320, 430, 55 AMG) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'CLK 230 Kompressor (M111): campanha de serviço para polia amortecedora (harmonic balancer) defeituosa',
    body: 'A Mercedes-Benz identificou um lote de polias amortecedoras (harmonic balancer/damper) defeituosas em vários modelos de 1998-2001 com motor M111, incluindo o CLK. O sintoma é um ruído agudo/assobio vindo da frente do motor, mais audível em marcha lenta. Se o carro é dessa faixa e nunca teve essa peça verificada, vale checar com uma oficina especializada em Mercedes — a substituição é rápida (menos de uma hora) quando o problema é confirmado.',
  },
  {
    severity: 'OK',
    title: 'CLK 320/430 (M112/M113): corrente de distribuição é robusta, mas guias plásticas merecem inspeção após 150.000 km',
    body: 'Os motores V6 3.2 (M112) e V8 4.3 (M113) usam corrente de distribuição duplex considerada duradoura — falhas catastróficas são raras mesmo em alta quilometragem. Ainda assim, as guias/trilhos plásticos que sustentam a corrente desgastam com o tempo e podem acumular resíduo no cárter. Se optar por trocar a corrente por desgaste ou ruído, troque as guias junto — reaproveitar guias antigas com corrente nova costuma causar falha prematura em poucos milhares de km.',
  },
  {
    severity: 'OK',
    title: 'Capota do Cabriolet: reservatório de óleo hidráulico na lateral esquerda do porta-malas — verifique nível anualmente',
    body: 'Nas versões Cabriolet, o mecanismo de acionamento da capota é hidráulico e tem um pequeno reservatório de óleo na lateral esquerda do porta-malas. Raramente precisa completar, mas nível baixo (por vazamento nos cilindros ou mangueiras) causa capota lenta ou travada. Verifique o nível uma vez por ano e não deixe a capota guardada aberta por longos períodos — isso resseca vedações e acelera vazamento.',
  },
  {
    severity: 'OK',
    title: 'Chicote elétrico e módulo SAM sob a bateria (porta-malas) — ponto clássico de oxidação em carros importados dessa era',
    body: 'Como em outros Mercedes-Benz do final dos anos 1990, o módulo SAM e parte do chicote elétrico ficam próximos à bateria no porta-malas — infiltração de umidade ali causa corrosão nos contatos e problemas elétricos intermitentes (vidro, trava, luzes de painel). Se aparecerem falhas elétricas sem padrão claro, comece a investigação por essa região antes de trocar módulos inteiros.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ruído agudo na partida ou marcha lenta pode ser a polia amortecedora (M111 Kompressor) — não ignore',
    body: 'No CLK 230 Kompressor, um assobio ou ruído metálico agudo vindo da dianteira do motor é o sintoma clássico da polia amortecedora com defeito de fabricação (ver campanha de serviço da época). Ignorar pode evoluir para folga na correia auxiliar e perda de acionamento do compressor/alternador/bomba d\'água.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático 5G-Tronic: trancos após 120.000-150.000 km geralmente pedem troca de fluido, não reparo maior',
    body: 'O câmbio automático de 5 marchas (5G-Tronic) usado no CLK dessa geração é considerado robusto, mas acumula trancos e atraso de engate depois de 120-150 mil km quando o fluido nunca foi trocado (muitos donos acreditam erroneamente que é "vitalício"). Antes de assumir reparo caro na válvula solenoide ou no corpo de válvulas, peça a troca completa do fluido e filtro do câmbio com o fluido especificado pela Mercedes.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma CLK 1997-2002 (M111 2.3 Kompressor, M112 3.2 V6 ou M113 4.3/5.5 V8 AMG)',
    body: '10.000-15.000 km — Troca de óleo do motor + filtro, sintético de qualidade (compressor do Kompressor exige troca em dia). | 60.000 km — Fluido e filtro do câmbio automático 5G-Tronic (não é vitalício, apesar do que muitos dizem). | Anual — Lubrificação das vedações da capota e checagem do nível de óleo hidráulico (versões Cabriolet). | Anual — Inspeção do chicote/módulo SAM próximo à bateria no porta-malas contra oxidação. | Sempre — atenção a ruído agudo na dianteira do motor (polia amortecedora no M111 Kompressor).',
  },
]

// ---------- 2003-2009 (2ª geração C209 — CLK 320, 500, 350, 55 AMG) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'CLK 350 (motor M272, 2006-2009): defeito crônico e bem documentado na engrenagem do eixo balanceador',
    body: 'O motor V6 3.5 M272 (usado no CLK 350 a partir de 2006) tem um defeito de fabricação amplamente documentado internacionalmente: a engrenagem do eixo balanceador é feita de um material mais macio que desgasta prematuramente, gerando marcha lenta irregular, ruído de corrente e acendimento da luz de injeção eletrônica — em casos avançados, o desgaste pode comprometer a corrente de distribuição principal. Se o carro é um CLK 350 de 2006-2009 e nunca teve isso verificado, vale investigar o desgaste da engrenagem balanceadora antes de qualquer sintoma aparecer, especialmente acima de 100.000 km.',
  },
  {
    severity: 'OK',
    title: 'CLK 320/500 (M112/M113, até 2005-2008): mesma robustez de corrente de distribuição da geração anterior',
    body: 'As versões CLK 320 (V6 3.2, vendida até 2005) e CLK 500 (V8 5.0) desta geração usam os mesmos motores M112/M113 da geração C208, com o mesmo histórico de boa durabilidade da corrente de distribuição — o ponto de atenção nesta geração é especificamente o motor M272 do CLK 350, não esses V6/V8 mais antigos.',
  },
  {
    severity: 'OK',
    title: 'Capota do Cabriolet C209 é hidroelétrica: vazamento de óleo atrás do pneu traseiro indica cilindro de elevação furado',
    body: 'Nas versões Cabriolet desta geração, é comum o cilindro "case cover lift" (elevação da tampa da capota) começar a vazar óleo hidráulico, deixando uma mancha atrás do pneu traseiro. Não é grave no curto prazo, mas sem reparo a capota perde força aos poucos até travar. Mangueiras entre a bomba e os cilindros também ressecam com o tempo — se notar a capota mais lenta que o normal, cheque vazamento antes de trocar a bomba inteira.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL: CLK 350 e CLK 500 (jan-jul/2006) — risco de descolamento do vidro do teto solar',
    body: 'A Mercedes-Benz convocou no Brasil os proprietários de CLK 350 e CLK 500 fabricados entre janeiro e julho de 2006, chassis não sequenciais entre WDBTJ56W66F191222 e WDBTJ72J87F208688, por uma não conformidade na fixação do vidro corrediço do teto solar, que pode se soltar gradualmente. Se não notado a tempo (bordas salientes ou ruído de vento), o vidro pode se desprender totalmente em movimento, com risco de acidente e ferimento a terceiros. Confirme se o chassi do seu CLK está na faixa afetada e procure uma concessionária Mercedes-Benz para verificar se o recall já foi atendido (0800 970 9090).',
  },
  {
    severity: 'WARN',
    title: 'Marcha lenta irregular e luz de injeção acesa no CLK 350: investigue o eixo balanceador do M272 antes de trocar sensores',
    body: 'É comum, diante desses sintomas no CLK 350, trocarem sensores (rotação, fase) sem resultado — a causa raiz mais frequente documentada é o desgaste da engrenagem do eixo balanceador do motor M272. Peça esse diagnóstico específico antes de autorizar troca de sensores por tentativa e erro.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma CLK 2003-2009 (M112 3.2 V6, M113 5.0/5.5 V8 AMG ou M272 3.5 V6 a partir de 2006)',
    body: '10.000-15.000 km — Troca de óleo do motor + filtro, sintético de qualidade. | 60.000 km — Fluido e filtro do câmbio automático. | A partir de 100.000 km (CLK 350/M272) — Inspeção do desgaste da engrenagem do eixo balanceador. | Anual — Lubrificação das vedações e checagem de vazamento hidráulico da capota (Cabriolet). | Se aplicável — confirmar atendimento do recall do teto solar (CLK 350/500 fabricados jan-jul/2006).',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'CLK', yearFrom: 1997, yearTo: 2002, tireSize: '205/60 R15 ou 225/55 R16 (versões AMG/Sport)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual — CLK 55 AMG e versões Sport usam aro maior e pressão diferente.' },
  { modelName: 'CLK', yearFrom: 2003, yearTo: 2009, tireSize: '225/55 R16 ou 245/40 R18 (versões AMG)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — versões AMG e Cabriolet podem ter pressão diferenciada entre eixos.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'CLK', yearFrom: 1997, yearTo: 2002, component: 'Óleo do motor + filtro', intervalKm: 12500, intervalMonths: 12, notes: 'M111 2.3 Kompressor, M112 3.2 V6 ou M113 4.3/5.5 V8.', priority: 'CRITICAL', order: 0 },
  { modelName: 'CLK', yearFrom: 1997, yearTo: 2002, component: 'Fluido e filtro do câmbio 5G-Tronic', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício — trancos após 120-150 mil km geralmente resolvem com essa troca.', priority: 'HIGH', order: 1 },
  { modelName: 'CLK', yearFrom: 1997, yearTo: 2002, component: 'Lubrificação e checagem hidráulica da capota (Cabriolet)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'CLK', yearFrom: 1997, yearTo: 2002, component: 'Inspeção de oxidação no chicote/módulo SAM (porta-malas)', intervalKm: null, intervalMonths: 24, notes: null, priority: 'LOW', order: 3 },
  { modelName: 'CLK', yearFrom: 2003, yearTo: 2009, component: 'Óleo do motor + filtro', intervalKm: 12500, intervalMonths: 12, notes: 'M112 3.2 V6, M113 5.0/5.5 V8 AMG ou M272 3.5 V6 (2006+).', priority: 'CRITICAL', order: 4 },
  { modelName: 'CLK', yearFrom: 2003, yearTo: 2009, component: 'Fluido e filtro do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'CLK', yearFrom: 2003, yearTo: 2009, component: 'Inspeção do eixo balanceador (CLK 350/M272)', intervalKm: 100000, intervalMonths: null, notes: 'Defeito crônico documentado — marcha lenta irregular e luz de injeção são sintomas.', priority: 'HIGH', order: 6 },
  { modelName: 'CLK', yearFrom: 2003, yearTo: 2009, component: 'Lubrificação e checagem hidráulica da capota (Cabriolet)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 7 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'CLK', yearFrom: 1997, yearTo: 2002, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'CLK', yearFrom: 2003, yearTo: 2009, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
]

async function main() {
  console.log('🚗 Seed Mercedes-Benz CLK...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Mercedes-Benz', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Mercedes-Benz', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'CLK', brandId: brand.id } },
    update: {}, create: { name: 'CLK', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'CLK' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'CLK' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'CLK' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Mercedes-Benz CLK concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
