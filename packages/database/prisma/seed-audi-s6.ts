/**
 * Seed Audi S6 — macetes, problemas, manutenção e calibragem
 * 1ª geração (C4, 1994-1998): motor 2.2 turbo 5 cilindros 20V (mesmo
 * bloco "3B" do Audi S4/Ur-S4 da época) até 1997, depois a edição de
 * saída "S6 Plus" já com o V8 4.2 32V (mesmo bloco do Audi A8
 * contemporâneo). 2ª geração (C5, 2001-2004): V8 4.2 40V Quattro,
 * motor de injeção convencional (não é FSI — carbono nas válvulas não
 * se aplica a essa geração). 3ª geração (C6, 2010-2011, importação
 * limitada no Brasil): V10 5.2 FSI de 435cv, parentesco direto com o
 * V10 do Lamborghini Gallardo/RS6 da época, primeira geração do S6
 * com injeção direta FSI. 4ª geração (C7, 2013-2016): V8 4.0 TFSI
 * biturbo, mesmo motor do RS6/RS7/S7/S8 contemporâneos.
 * Execute: pnpm --filter @motormacete/database db:seed:audi-s6
 *
 * Fontes: auto-doc.pt, autodoc.co.uk, audizine.com, euroautopro.com.au,
 *         adelaideautopro.com.au, myenginespecs.com, alexsautohaus.com,
 *         audisport-iberica.com, garagem360.com.br, procon.sp.gov.br,
 *         audi.com.br/recall, consumerreports.org, static.nhtsa.gov
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1994-1998 (C4 — 2.2 Turbo 5 cilindros 20V até 1997, depois S6 Plus 4.2 V8 32V) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 2.2 turbo 5 cilindros é o mesmo bloco do Audi S4/Ur-S4 da mesma época — peça cruzada',
    body: 'O motor 2.2 turbo 5 cilindros 20V (bloco "3B") usado no S6 até 1997 é compartilhado com o Audi S4/Ur-S4 (Audi 100/Urquattro) contemporâneo. Peça de motor, turbina e injeção costuma ter o mesmo código — pesquisar pela aplicação S4 amplia bastante a oferta de peça alternativa para um motor já raro no Brasil.',
  },
  {
    severity: 'OK',
    title: 'S6 Plus 4.2 V8 32V (1996-1998): mesmo motor do Audi A8 da época — peça cruzada',
    body: 'A edição de saída "S6 Plus", já com o V8 4.2 32V, usa o mesmo bloco de motor do Audi A8 contemporâneo. Peça de motor (velas, bobinas, correia auxiliar, bomba d\'água) tem boa chance de aplicação cruzada com o A8 da mesma geração.',
  },
]

const PROBLEMAS_G1: TipInput[] = []

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma S6 1994-1998 (2.2 Turbo 5 cilindros 20V ou S6 Plus 4.2 V8 32V)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Correia dentada + tensor + bomba d\'água (motor 2.2 turbo, interferente). | 60.000 km — Fluido do câmbio (manual ou automático) e da caixa de transferência Quattro. | 40.000 km — Fluido de freio.',
  },
]

// ---------- 2001-2004 (C5 — V8 4.2 40V Quattro, injeção convencional) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 4.2 V8 40V (injeção convencional) é compartilhado com o A8/allroad da mesma época',
    body: 'Esse V8 4.2 40V do S6 C5 não é um motor FSI de injeção direta (isso só chegaria na geração seguinte) — é injeção convencional, compartilhada com o Audi A8 e o A6 allroad da mesma época. Peça de motor, sensores e bobinas de ignição costumam ter o mesmo código entre esses modelos.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Tensor da corrente de distribuição pode falhar e causar dano grave ao motor — inspeção preventiva vale a pena',
    body: 'Os V8 dessa família de motores Audi têm um histórico documentado de falha nos tensores da corrente de distribuição: um tensor com defeito deixa a corrente frouxa (ou, em casos extremos, ela pode pular dentes), com risco de dano sério ao motor. Uma inspeção preventiva a cada 60.000 km, mesmo sem sintoma, é o que a própria comunidade Audi recomenda para esse motor.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático Tiptronic de 5 marchas: fluido não é vitalício',
    body: 'Assim como em outros Audi da época, é comum acreditarem que o Tiptronic de 5 marchas não precisa de troca de fluido — na prática, respeitar o intervalo de troca (60.000 km) ajuda a evitar trancos e desgaste acelerado da válvula solenoide em quilometragem mais alta.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma S6 2001-2004 (4.2 V8 40V Quattro, manual ou Tiptronic)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km — Inspeção do tensor da corrente de distribuição, mesmo sem sintoma. | 60.000 km — Fluido do câmbio Tiptronic (quando automático) e da caixa de transferência Quattro. | 40.000 km — Fluido de freio.',
  },
]

// ---------- 2010-2011 (C6 — V10 5.2 FSI, importação limitada no Brasil) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'V10 5.2 FSI tem parentesco direto com o V10 do Lamborghini Gallardo/RS6 da época',
    body: 'O motor V10 5.2 FSI (435cv) usado nessa geração do S6 compartilha boa parte da genealogia com o V10 do Lamborghini Gallardo e do Audi RS6 contemporâneo. É um motor de alta performance com produção/importação limitada no Brasil — peça específica costuma ser cara e de prazo mais longo, então vale procurar oficina especializada em Audi de alta performance (ou Lamborghini) para orçamento e diagnóstico.',
  },
  {
    severity: 'WARN',
    title: 'Injeção direta FSI: limpeza preventiva das válvulas de admissão evita perda de potência por carbono',
    body: 'Por ser motor de injeção direta (FSI), o combustível nunca passa pelas válvulas de admissão para "lavá-las" naturalmente como em motor de injeção indireta — isso favorece acúmulo de carbono nas válvulas ao longo do tempo, com perda de potência e funcionamento irregular como sintomas. Uma limpeza preventiva das válvulas de admissão (jateamento com casca de noz ou produto de limpeza específico) a cada 60.000-80.000 km reduz bastante esse problema.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL: airbag Takata — anos-modelo 2009-2011 do S6 estão na lista global de convocação',
    body: 'O Audi S6 dos anos-modelo 2009-2011 (a faixa de produção que corresponde às unidades vendidas no Brasil dessa geração) está confirmado na campanha global de recall do airbag Takata, com risco de o inflador do airbag do passageiro se romper de forma violenta em caso de acionamento. A Audi do Brasil também está entre as montadoras com veículos afetados pelo recall Takata no país — consulte o chassi em www.audi.com.br/pt/Recall/recall-takata-airbag-br ou pelo 0800 777 2834. O reparo é gratuito e sem prazo para agendamento.',
  },
  {
    severity: 'WARN',
    title: 'Marcha lenta irregular e perda de potência: pode ser acúmulo de carbono nas válvulas antes de outra coisa',
    body: 'Antes de investigar bobina, vela ou sensor em caso de marcha lenta irregular ou perda de potência nesse V10 FSI, vale considerar o acúmulo de carbono nas válvulas de admissão como causa provável — é um problema característico e bem documentado de motores com injeção direta sem manutenção preventiva específica.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma S6 2010-2011 (V10 5.2 FSI Quattro)',
    body: '10.000-15.000 km — Troca de óleo do motor + filtro, sintético de alta qualidade. | 60.000-80.000 km — Limpeza preventiva das válvulas de admissão (carbono, motor FSI). | 60.000 km — Fluido do câmbio Tiptronic e da caixa de transferência Quattro. | Verifique o chassi no recall de airbag Takata (anos-modelo 2009-2011).',
  },
]

// ---------- 2013-2016 (C7 — V8 4.0 TFSI biturbo, mesmo motor do RS6/RS7/S7/S8) ----------
const MACETES_G4: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 4.0 TFSI biturbo é compartilhado com RS6, RS7, S7 e S8 da mesma época — peça cruzada ampla',
    body: 'O V8 4.0 TFSI biturbo do S6 C7 é o mesmo motor (com variações de mapa/potência) usado no RS6, RS7, S7 e S8 contemporâneos. Isso amplia bastante a rede de peça alternativa e de oficinas especializadas com experiência nesse motor especificamente, mesmo sendo um propulsor de alta performance.',
  },
]

const PROBLEMAS_G4: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ruído de corrente de distribuição na partida a frio entre 110.000-145.000 km — não ignore',
    body: 'É documentado que o tensor da corrente de distribuição do 4.0 TFSI pode falhar por desgaste combinado com lubrificação inadequada, tipicamente entre 70.000-90.000 milhas (aproximadamente 110.000-145.000 km). Ruído de corrente na partida a frio, perda de aceleração e luzes de aviso no painel são os sintomas — leve para diagnóstico assim que notar o ruído, sem esperar piorar.',
  },
  {
    severity: 'WARN',
    title: 'Turbina apresenta primeiros sinais de desgaste entre 60.000-80.000 km',
    body: 'As turbinas do 4.0 TFSI biturbo costumam apresentar os primeiros sinais de desgaste entre 60.000-80.000 km: perda de potência, ruído incomum e consumo de óleo acima do normal. Verificar o suprimento de óleo da turbina nas revisões ajuda a identificar o problema antes que vire um reparo maior.',
  },
  {
    severity: 'WARN',
    title: 'Válvula PCV com defeito causa marcha lenta irregular e consumo de óleo excessivo',
    body: 'Falha na válvula PCV (ventilação positiva do cárter) é uma causa documentada de marcha lenta irregular e consumo de óleo acima do esperado nesse motor. Unidades mais antigas do 4.0 TFSI também têm histórico de consumo de óleo por desenho do anel de pistão — se o consumo está alto mesmo com PCV ok, vale investigar os anéis.',
  },
]

const MANUTENCAO_G4: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma S6 2013-2016 (4.0 TFSI V8 biturbo, S-tronic)',
    body: '15.000 km — Troca de óleo do motor + filtro, sintético 5W-30 de alta qualidade — não estique esse intervalo apesar de a Audi permitir cronograma flexível mais longo. | 60.000-80.000 km — Verificação do suprimento de óleo da turbina. | Sempre — atenção a ruído de corrente na partida a frio, principalmente após 110.000 km. | 60.000 km — Fluido do câmbio S-tronic e da caixa de transferência Quattro. | 40.000 km — Fluido de freio.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'S6', yearFrom: 1994, yearTo: 1998, tireSize: '225/50 R16 (referência)', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual do proprietário.' },
  { modelName: 'S6', yearFrom: 2001, yearTo: 2004, tireSize: '235/45 R17 (referência)', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 39, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
  { modelName: 'S6', yearFrom: 2010, yearTo: 2011, tireSize: '255/40 R18 ou 265/35 R19 (conforme versão)', frontPsi: 35, rearPsi: 35, frontPsiLoad: 38, rearPsiLoad: 41, sparePsi: 60, notes: 'Carros esportivos costumam pedir pressão mais alta que o padrão — confirme na etiqueta da coluna da porta.' },
  { modelName: 'S6', yearFrom: 2013, yearTo: 2016, tireSize: '255/35 R19 ou 275/30 R21 (conforme versão)', frontPsi: 36, rearPsi: 36, frontPsiLoad: 39, rearPsiLoad: 42, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — pneu de perfil baixo é mais sensível a variação de pressão.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'S6', yearFrom: 1994, yearTo: 1998, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: '2.2 Turbo 5 cilindros 20V ou S6 Plus 4.2 V8 32V.', priority: 'CRITICAL', order: 0 },
  { modelName: 'S6', yearFrom: 1994, yearTo: 1998, component: 'Correia dentada + tensor + bomba d\'água (motor 2.2 turbo)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'S6', yearFrom: 1994, yearTo: 1998, component: 'Fluido do câmbio e da caixa de transferência Quattro', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'S6', yearFrom: 2001, yearTo: 2004, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: '4.2 V8 40V.', priority: 'CRITICAL', order: 3 },
  { modelName: 'S6', yearFrom: 2001, yearTo: 2004, component: 'Inspeção do tensor da corrente de distribuição', intervalKm: 60000, intervalMonths: null, notes: 'Falha documentada nessa família de motores V8.', priority: 'HIGH', order: 4 },
  { modelName: 'S6', yearFrom: 2001, yearTo: 2004, component: 'Fluido do câmbio Tiptronic e da caixa de transferência Quattro', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'S6', yearFrom: 2010, yearTo: 2011, component: 'Óleo do motor + filtro', intervalKm: 12500, intervalMonths: 12, notes: 'V10 5.2 FSI, sintético de alta qualidade.', priority: 'CRITICAL', order: 6 },
  { modelName: 'S6', yearFrom: 2010, yearTo: 2011, component: 'Limpeza das válvulas de admissão (carbono, motor FSI)', intervalKm: 70000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'S6', yearFrom: 2010, yearTo: 2011, component: 'Fluido do câmbio Tiptronic e da caixa de transferência Quattro', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'S6', yearFrom: 2013, yearTo: 2016, component: 'Óleo do motor + filtro', intervalKm: 15000, intervalMonths: 12, notes: '4.0 TFSI V8 biturbo, 5W-30 sintético.', priority: 'CRITICAL', order: 9 },
  { modelName: 'S6', yearFrom: 2013, yearTo: 2016, component: 'Verificação do suprimento de óleo das turbinas', intervalKm: 70000, intervalMonths: null, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'S6', yearFrom: 2013, yearTo: 2016, component: 'Fluido do câmbio S-tronic e da caixa de transferência Quattro', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 11 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'S6', yearFrom: 1994, yearTo: 1998, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'S6', yearFrom: 2001, yearTo: 2004, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'S6', yearFrom: 2010, yearTo: 2011, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
  { modelName: 'S6', yearFrom: 2013, yearTo: 2016, MACETES: MACETES_G4, PROBLEMAS: PROBLEMAS_G4, MANUTENCAO: MANUTENCAO_G4 },
]

async function main() {
  console.log('🚗 Seed Audi S6...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Audi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'S6', brandId: brand.id } },
    update: {}, create: { name: 'S6', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'S6' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'S6' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'S6' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Audi S6 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
