/**
 * Seed Citroën Jumper — macetes, problemas, manutenção e calibragem
 * Furgão/van comercial do "trio Sevel" (mesma plataforma e mecânica do
 * Fiat Ducato e do Peugeot Boxer). No Brasil foi fabricado pela Iveco em
 * Sete Lagoas (MG) de 1998/2000 a 2016, quando a produção do trio foi
 * encerrada e os modelos passaram a ser importados. 1ª geração
 * (1995-2009): motor 2.5/2.8 turbodiesel (Sofim). 2ª geração local
 * (2010-2017): motor 2.3 Multijet, com versões Furgão, Vetrato
 * (janelado) e Vetrato Executive (minibus). 3ª fase, já importada
 * (2018-2022): motor 2.0 turbodiesel com filtro de partículas (DPF).
 * Geração atual (2022-presente): motor 2.2 turbodiesel com sistema
 * AdBlue/SCR. Recall real e recente localizado: porca de fixação do
 * cabo massa (2024/2025), com risco de desligamento do motor em
 * movimento — chassis documentados.
 * Execute: pnpm --filter @motormacete/database db:seed:citroen-jumper
 *
 * Fontes: icarros.com.br, conexaoautomotivabr.com, procon.sp.gov.br,
 *         transportemundial.com.br, escolarweb.com.br, auto-doc.pt,
 *         club.auto-doc.pt, opinautos.com, furgocasa.com, camperlife.cz,
 *         omecanico.com.br, carroclub.com.br, mobycar.pt
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1995-2009 (1ª geração — motor 2.5/2.8 turbodiesel, produção Sete Lagoas) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Peça 100% intercambiável com Fiat Ducato e Peugeot Boxer da mesma época (trio Sevel)',
    body: 'O Jumper, o Ducato e o Boxer dessa geração saíram da mesma linha de produção em Sete Lagoas (MG), com a mesma plataforma e mecânica — motor, câmbio, freios e boa parte da suspensão são idênticos entre os três. Ao procurar peça, pesquise também pelo código/aplicação do Ducato e do Boxer: a oferta de peça alternativa e usada costuma ser bem maior por esses dois nomes do que pelo Jumper isoladamente.',
  },
  {
    severity: 'DANGER',
    title: 'Motor é "interferente": correia dentada arrebentada danifica válvulas e pistões — nunca atrase a troca',
    body: 'Como em praticamente todo diesel turbo dessa geração, o motor do Jumper é do tipo "interferente": se a correia dentada arrebentar em movimento, pistão e válvula se encontram e o motor é destruído. Respeite rigorosamente o intervalo de troca da correia (verifique no manual pelo ano/motor específico do seu veículo) e troque sempre o tensor e o rolamento junto — nunca reaproveite essas peças numa troca de correia.',
  },
]

const PROBLEMAS_G1: TipInput[] = []

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Jumper 1995-2009 (motor 2.5/2.8 turbodiesel)',
    body: '10.000 km — Troca de óleo do motor + filtro (uso comercial/carga pesada pede intervalo mais curto que o de passeio). | Conforme manual do ano/motor — Correia dentada + tensor + rolamento, sem exceção. | 40.000 km — Verificação/ajuste da embreagem, mais crítico em uso com carga pesada ou muitas partidas em subida. | Regular — Verificação da suspensão traseira (molas/feixes) pelo desgaste natural do transporte de carga.',
  },
]

// ---------- 2010-2017 (2ª geração local — motor 2.3 Multijet, Furgão/Vetrato/Vetrato Executive) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 2.3 Multijet é o mesmo do Fiat Ducato III e do Peugeot Boxer II da época — peça cruzada facilita muito',
    body: 'Essa geração do Jumper compartilha o motor 2.3 Multijet, câmbio e boa parte da eletrônica com o Ducato III e o Boxer II vendidos no mesmo período. Injetor, turbina, bomba de alta pressão e sensores costumam ter o mesmo código de peça — pesquisar pela aplicação Ducato/Boxer amplia bastante as opções de peça alternativa e reduz o preço em relação à peça vendida só como "Jumper".',
  },
  {
    severity: 'WARN',
    title: 'Volante bimassa desgasta entre 120.000-180.000 km, principalmente em uso com carga pesada ou muitas subidas',
    body: 'O volante bimassa (dual-mass) do 2.3 Multijet tende a desgastar de forma prematura em uso comercial intenso — carga pesada e partidas frequentes em rampa aceleram o processo. Vibração anormal em marcha lenta, ruído metálico na troca de marcha e dificuldade para engatar são os primeiros sinais; ao trocar a embreagem por esses sintomas, avalie o volante bimassa junto, mesmo que ele pareça "servir mais um pouco".',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Perda de torque acima de 2.500 rpm e luz de injeção acesa: investigue a válvula EGR antes de outra coisa',
    body: 'Entre 100.000 e 150.000 km é comum o motor entrar em "modo degradado" (perda de torque em rotações mais altas, luz de injeção no painel) por baixa circulação na válvula EGR, muitas vezes registrando o código de falha P0401. Uma limpeza por ultrassom resolve boa parte dos casos; se não resolver, a troca da válvula é o próximo passo — mas comece sempre pela limpeza antes de trocar a peça inteira.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem raspando ou desgaste rápido? Verifique o ajuste antes de trocar o kit',
    body: 'O sistema de embreagem dessa geração pede verificação/ajuste periódico (a cada 40.000 km) — quando isso é negligenciado, é comum aparecer marcha raspando e desgaste acelerado do disco. Antes de fechar orçamento para um kit de embreagem completo, peça para o mecânico conferir se o ajuste está em dia.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Jumper 2010-2017 (motor 2.3 Multijet — Furgão, Vetrato, Vetrato Executive)',
    body: '10.000-15.000 km — Troca de óleo do motor + filtro, diesel de qualidade. | 40.000 km — Verificação/ajuste da embreagem. | 100.000-150.000 km — Fique atento a perda de torque/luz de injeção (válvula EGR). | 120.000-180.000 km — Avalie o volante bimassa ao mexer na embreagem. | Conforme manual — Correia dentada + tensor + rolamento, sem exceção.',
  },
]

// ---------- 2018-2022 (3ª fase, já importada — motor 2.0 turbodiesel com DPF) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Filtro de partículas (DPF) precisa de rodagem em estrada para se regenerar sozinho',
    body: 'O motor 2.0 turbodiesel dessa fase tem filtro de partículas (DPF) para reter fuligem do escapamento. Uso só em trajetos curtos e urbanos, sem nunca rodar em velocidade de rodovia por tempo suficiente, impede a "regeneração" automática do filtro (queima da fuligem acumulada) — isso entope o DPF antes da hora. Se a rotina do seu Jumper é só entrega urbana curta, programe pelo menos um trecho de rodovia em rotação mais alta de vez em quando para permitir a regeneração.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'WARN',
    title: 'DPF entupido pode colocar o veículo em modo de emergência na estrada — não ignore a luz do filtro',
    body: 'Quando o DPF enche de fuligem além do normal, o veículo pode entrar em "modo de emergência" (perda de potência, limitação de rotação) até uma nova regeneração ou limpeza ser feita. A vida útil típica do filtro gira em torno de 120.000-140.000 km em uso rodoviário, mas cai para bem menos (na faixa de 50.000 km) em uso urbano com trajetos curtos. Ao ver a luz do DPF acesa, não prolongue o uso do veículo sem verificar — rodar ignorando o aviso aumenta o risco de dano permanente ao filtro, um item caro para substituir.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Jumper 2018-2022 (motor 2.0 turbodiesel com DPF)',
    body: '10.000-15.000 km — Troca de óleo do motor + filtro, diesel de qualidade (essencial para não sobrecarregar o DPF). | Periodicamente — Trecho de rodovia para permitir a regeneração automática do DPF, especialmente se a rotina é só urbana. | Sempre — não ignore a luz do filtro de partículas no painel. | Conforme manual — Correia dentada + tensor + rolamento (quando aplicável ao motor específico).',
  },
]

// ---------- 2022-presente (motor 2.2 turbodiesel com AdBlue/SCR) ----------
const MACETES_G4: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Nunca deixe o reservatório de AdBlue chegar a zero — cristalização do fluido é a causa mais comum de falha do sistema',
    body: 'O motor 2.2 turbodiesel usa sistema SCR com AdBlue para reduzir emissões. Deixar o reservatório esvaziar completamente ou o veículo parado por longos períodos com nível baixo favorece a cristalização do fluido dentro da bomba, tubulações e injetor do sistema — a limpeza ou troca desses componentes cristalizados é bem mais cara que simplesmente manter o reservatório sempre acima de 1/4. Reabasteça o AdBlue assim que o aviso aparecer no painel, sem esperar a reserva zerar.',
  },
]

const PROBLEMAS_G4: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL: porca de fixação do cabo massa — Jumper 2024/2025 (fabricação 16/jan a 20/ago/2024) — risco de desligar em movimento',
    body: 'A Citroën convocou os proprietários de Jumper (Furgão, Cargo e Minibus) fabricados entre 16 de janeiro e 20 de agosto de 2024, ano-modelo 2024/2025, por possível ausência de torque adequado na porca de fixação do cabo massa — isso pode causar o desligamento do motor com o veículo em movimento, com risco de acidente. Chassis afetados: entre R2Z50015 e SMA23944. O reparo é gratuito, leva cerca de 1 hora e é feito mediante agendamento prévio em concessionária. Confirme pelo 0800 011 8088 ou www.citroen.com.br se o seu chassi está na faixa.',
  },
]

const MANUTENCAO_G4: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Jumper 2022-presente (motor 2.2 turbodiesel com AdBlue/SCR)',
    body: '10.000-15.000 km — Troca de óleo do motor + filtro, diesel de qualidade. | Sempre — mantenha o reservatório de AdBlue acima de 1/4, nunca deixe zerar. | Verifique o chassi no recall da porca do cabo massa (fabricação jan-ago/2024). | Periodicamente — trecho de rodovia para regeneração do filtro de partículas.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Jumper', yearFrom: 1995, yearTo: 2009, tireSize: '215/70 R15C ou 225/70 R15C (conforme versão)', frontPsi: 50, rearPsi: 50, frontPsiLoad: 65, rearPsiLoad: 72, sparePsi: 65, notes: 'Furgão/van com pressão diferente vazio e carregado — confirme na etiqueta da coluna da porta ou no manual, respeitando a carga transportada.' },
  { modelName: 'Jumper', yearFrom: 2010, yearTo: 2017, tireSize: '215/70 R15C', frontPsi: 50, rearPsi: 50, frontPsiLoad: 65, rearPsiLoad: 72, sparePsi: 65, notes: 'Vetrato/Minibus pode ter pressão específica — confirme na etiqueta da coluna da porta.' },
  { modelName: 'Jumper', yearFrom: 2018, yearTo: 2022, tireSize: '215/70 R15C', frontPsi: 50, rearPsi: 50, frontPsiLoad: 65, rearPsiLoad: 72, sparePsi: 65, notes: 'Confirme na etiqueta da coluna da porta — pressão varia bastante conforme carga transportada.' },
  { modelName: 'Jumper', yearFrom: 2022, yearTo: null, tireSize: '215/70 R15C ou 225/70 R15C (conforme versão)', frontPsi: 50, rearPsi: 50, frontPsiLoad: 65, rearPsiLoad: 72, sparePsi: 65, notes: 'Confirme na etiqueta da coluna da porta — pressão varia bastante conforme carga transportada.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Jumper', yearFrom: 1995, yearTo: 2009, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.5/2.8 turbodiesel, uso comercial pede intervalo curto.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Jumper', yearFrom: 1995, yearTo: 2009, component: 'Correia dentada + tensor + rolamento', intervalKm: null, intervalMonths: null, notes: 'Verificar intervalo exato no manual do ano/motor — motor interferente, nunca atrasar.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Jumper', yearFrom: 1995, yearTo: 2009, component: 'Verificação/ajuste da embreagem', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Jumper', yearFrom: 2010, yearTo: 2017, component: 'Óleo do motor + filtro', intervalKm: 12500, intervalMonths: 12, notes: 'Motor 2.3 Multijet, diesel de qualidade.', priority: 'CRITICAL', order: 3 },
  { modelName: 'Jumper', yearFrom: 2010, yearTo: 2017, component: 'Verificação/ajuste da embreagem', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'Jumper', yearFrom: 2010, yearTo: 2017, component: 'Inspeção da válvula EGR', intervalKm: 120000, intervalMonths: null, notes: 'Perda de torque acima de 2.500 rpm e luz de injeção são sintomas.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Jumper', yearFrom: 2018, yearTo: 2022, component: 'Óleo do motor + filtro', intervalKm: 12500, intervalMonths: 12, notes: 'Motor 2.0 turbodiesel com DPF.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Jumper', yearFrom: 2018, yearTo: 2022, component: 'Regeneração do filtro de partículas (rodagem em estrada)', intervalKm: null, intervalMonths: 1, notes: 'Essencial se a rotina do veículo é só urbana/curta.', priority: 'HIGH', order: 7 },
  { modelName: 'Jumper', yearFrom: 2022, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 12500, intervalMonths: 12, notes: 'Motor 2.2 turbodiesel com AdBlue/SCR.', priority: 'CRITICAL', order: 8 },
  { modelName: 'Jumper', yearFrom: 2022, yearTo: null, component: 'Nível de AdBlue', intervalKm: null, intervalMonths: null, notes: 'Nunca deixe zerar — risco de cristalização do sistema.', priority: 'HIGH', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Jumper', yearFrom: 1995, yearTo: 2009, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Jumper', yearFrom: 2010, yearTo: 2017, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Jumper', yearFrom: 2018, yearTo: 2022, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
  { modelName: 'Jumper', yearFrom: 2022, yearTo: null, MACETES: MACETES_G4, PROBLEMAS: PROBLEMAS_G4, MANUTENCAO: MANUTENCAO_G4 },
]

async function main() {
  console.log('🚗 Seed Citroën Jumper...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Citroën', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Citroën', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Jumper', brandId: brand.id } },
    update: {}, create: { name: 'Jumper', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Jumper' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Jumper' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Jumper' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Citroën Jumper concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
