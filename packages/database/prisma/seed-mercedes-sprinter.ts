/**
 * Seed Mercedes-Benz Sprinter — macetes, problemas, manutenção e calibragem
 * Chegou ao Brasil em 1997, importada em esquema CKD da Argentina (não
 * fabricada na planta de Juiz de Fora-MG, que produz cabines de caminhão
 * e produziu o Classe A entre 1999-2005). 1ª geração "T1N" (1997-2006):
 * motor 2.5 diesel (OM601/602) depois 2.2 CDI (OM611). 2ª geração "NCV3"
 * (2006-2019): motor 2.1 CDI OM646 na fase inicial, substituído pelo
 * OM651 no facelift de meados de 2013 — o OM651 tem problema crônico
 * documentado de batida de bronzina de biela relatado com menos de
 * 20.000 km em alguns exemplares no Brasil. 3ª geração "VS30" (2019+):
 * motor OM651/OM642 (V6), com versão elétrica eSprinter.
 * Execute: pnpm --filter @motormacete/database db:seed:mercedes-sprinter
 *
 * Fontes: imprensa.mercedes-benz.com.br, carrosegaragem.com.br,
 *         bamaqmercedesbenz.com.br, reclameaqui.com.br,
 *         saopaulo.sp.gov.br (Procon), procon.sp.gov.br,
 *         procon.campinas.sp.gov.br, gazetadopovo.com.br,
 *         en.wikipedia.org (OM642 engine), enginepatrol.com,
 *         motorreviewer.com, carscoops.com
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1997-2006 (1ª geração T1N, importada da Argentina, OM601/602/611) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Uso comercial intenso pede troca de óleo por tempo, não só por km — motor trabalha sob carga constante',
    body: 'Vans que rodam pouco km mas ficam muitas horas com o motor ligado carregando/descarregando (parada, entrega urbana) acumulam desgaste por TEMPO de funcionamento, não só por quilometragem. Respeite sempre o intervalo por meses do manual, mesmo que o carro ainda não tenha rodado o km da próxima troca.',
  },
  {
    severity: 'OK',
    title: 'Suspensão e freio desgastam mais rápido pelo peso transportado — inspecione com mais frequência que um carro de passeio',
    body: 'O peso de carga constante acelera o desgaste de amortecedores, molas, buchas e lonas/pastilhas de freio comparado a um veículo de passeio. Antecipe a inspeção desses itens em relação ao intervalo "padrão" de carro de passeio, principalmente se a van roda sempre no limite de carga.',
  },
]

const PROBLEMAS_G1: TipInput[] = []

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Sprinter 1997-2006 (2.5 diesel OM601/602 ou 2.2 CDI OM611)',
    body: '10.000 km ou 6 meses — Troca de óleo do motor + filtro (o que vier primeiro, dado o uso comercial). | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água), motor interferente. | 20.000 km — Inspeção de suspensão e sistema de freio (peso de carga acelera desgaste). | 20.000 km — Filtro de ar e filtro de combustível.',
  },
]

// ---------- 2006-2013 (2ª geração NCV3 fase 1, motor OM646, recall da coluna de direção) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor OM646 2.1 CDI é mais moderno mas ainda exige troca de óleo rigorosa em uso comercial pesado',
    body: 'O OM646 é mais eficiente que os motores da geração anterior, mas segue sensível a negligência de troca de óleo em uso comercial intenso. Não estenda o intervalo achando que "motor novo aguenta mais" — é o oposto, motor mais sofisticado tem tolerância menor a óleo degradado.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL — solda da coluna de direção pode romper (fabricação nov/2007 a mai/2008, Sprinter 313/413 CDI)',
    body: 'Recall real da Mercedes-Benz do Brasil: unidades Sprinter 313 CDI e 413 CDI (Van, Furgão e Chassi) fabricadas entre novembro de 2007 e maio de 2008 podem apresentar ruptura da solda que fixa a coluna de direção, levando à perda de dirigibilidade e risco de acidente. Reparo gratuito (substituição da coluna de direção) em concessionária de veículos comerciais. Confira o chassi diretamente com a Mercedes-Benz — não adie essa verificação, é uma falha de segurança grave.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Sprinter 2006-2013 (2.1 CDI OM646)',
    body: '10.000-15.000 km ou 6 meses — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia/corrente de distribuição conforme motor. | 20.000 km — Inspeção de suspensão e sistema de freio. | 20.000 km — Filtro de ar e filtro de combustível.',
  },
]

// ---------- 2013-2019 (NCV3 fase 2/facelift, motor OM651 — bronzina crônica documentada) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor OM651: batida de bronzina de biela é problema crônico documentado, mesmo com pouca quilometragem',
    body: 'Há relatos consistentes no Reclame Aqui de batida de bronzina de biela no motor OM651 em vans com MENOS de 20.000 km — não é desgaste normal de uso, é falha prematura documentada. Mesmo após retificação/reparo do motor, há casos de o problema retornar antes de completar 10.000 km rodados depois do conserto. Troca completa do motor pode passar de R$ 70.000. Se sua Sprinter é desse período e tem essa motorização, monitore ruído de batida metálica no motor com muita atenção e não ignore o primeiro sinal.',
  },
  {
    severity: 'OK',
    title: 'Ao comprar Sprinter usada, priorize unidades com histórico completo de troca de óleo em concessionária',
    body: 'Dado o histórico do OM651, exigir comprovante de manutenção rigorosa (óleo em dia, filtro original) é ainda mais importante nessa geração do que normalmente seria. Unidade sem histórico claro de manutenção é risco maior de já estar com desgaste de bronzina em curso, mesmo sem sintoma perceptível ainda.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL — arruela de vedação do tensionador do motor (fabricação jun-nov/2014, 6.057 veículos)',
    body: 'Recall real da Mercedes-Benz do Brasil: veículos Sprinter Chassi, Furgão e Van Passageiro fabricados entre junho e novembro de 2014 (6.057 unidades) tiveram campanha de substituição da arruela de vedação do tensionador do motor. Reparo gratuito em concessionária. Confira o chassi diretamente com a Mercedes-Benz.',
  },
  {
    severity: 'WARN',
    title: 'Campanha de chamamento adicional para Sprinter 906 (fabricação mar/2017 a set/2019)',
    body: 'Existe campanha de chamamento registrada pela Mercedes-Benz do Brasil para veículos Sprinter 906 (Furgão, Chassi e Van) fabricados entre março de 2017 e setembro de 2019. Se sua unidade é desse período, consulte diretamente uma concessionária Mercedes-Benz de veículos comerciais ou o Procon do seu estado para confirmar se seu chassi está incluído e qual o defeito específico coberto.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma Sprinter 2013-2019 (2.1 CDI OM651)',
    body: '10.000 km ou 6 meses — Troca de óleo do motor + filtro, RIGOROSAMENTE em dia (motor com histórico documentado de falha de bronzina). | Sempre — monitorar ruído de batida metálica no motor e não ignorar o primeiro sinal. | 60.000 km/5 anos — Kit de correia/corrente de distribuição. | 20.000 km — Inspeção de suspensão e sistema de freio. | 20.000 km — Filtro de ar e filtro de combustível.',
  },
]

// ---------- 2019-atual (3ª geração VS30, motor OM651/OM642, eSprinter elétrica) ----------
const MACETES_G4: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor V6 OM642: válvulas de redemoinho (swirl) do coletor de admissão podem travar em alta quilometragem',
    body: 'No motor V6 OM642 (versões mais potentes), as válvulas de redemoinho ("swirl valves") do coletor de admissão têm tendência a travar em quilometragem mais alta, afetando a resposta do motor. Se notar perda de potência progressiva, peça inspeção específica desse componente antes de assumir problema mais grave.',
  },
  {
    severity: 'OK',
    title: 'eSprinter (elétrica): manutenção de bateria e sistema de recarga é específica, não use oficina genérica de diesel',
    body: 'A versão elétrica eSprinter exige manutenção e diagnóstico específicos do sistema de bateria de alta tensão e carregamento — leve sempre a concessionária ou oficina certificada para veículo elétrico Mercedes, não uma oficina diesel genérica.',
  },
]

const PROBLEMAS_G4: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Perda de potência pode ser filtro de particulado (DPF) entupido, não só problema de turbina',
    body: 'Perda de potência nessa geração é frequentemente causada por filtro de particulado diesel (DPF) saturado ou falha na regeneração automática, e não necessariamente por defeito na turbina. Antes de orçar reparo de turbo, peça verificação do DPF e do ciclo de regeneração — costuma ser mais barato de resolver.',
  },
]

const MANUTENCAO_G4: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Sprinter 2019+ (OM651/OM642 diesel ou eSprinter elétrica)',
    body: '15.000 km ou 12 meses — Troca de óleo do motor + filtro (versões diesel). | Sempre — permitir o ciclo completo de regeneração do filtro de particulado (DPF), especialmente em uso urbano de paradas curtas. | 60.000 km/5 anos — Kit de correia/corrente de distribuição. | 20.000 km — Inspeção de suspensão e sistema de freio. | Conforme manual — verificação da bateria de alta tensão e sistema de recarga (eSprinter, só em oficina certificada).',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Sprinter', yearFrom: 1997, yearTo: 2019, tireSize: '195 R14C ou 225/70 R15C conforme peso bruto (PBT)', frontPsi: 55, rearPsi: 65, frontPsiLoad: 65, rearPsiLoad: 80, sparePsi: 80, notes: 'Pressão varia MUITO conforme a carga transportada e a versão (weight class) — sempre confira a etiqueta específica na coluna da porta ou manual, nunca use valor de carro de passeio.' },
  { modelName: 'Sprinter', yearFrom: 2019, yearTo: null, tireSize: '225/65 R16C ou 235/65 R16C conforme versão', frontPsi: 55, rearPsi: 65, frontPsiLoad: 65, rearPsiLoad: 80, sparePsi: 80, notes: 'Pressão varia MUITO conforme a carga transportada e a versão (weight class) — sempre confira a etiqueta específica na coluna da porta ou manual.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Sprinter', yearFrom: 1997, yearTo: 2006, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 6, notes: 'Uso comercial: respeitar sempre o intervalo por tempo também.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Sprinter', yearFrom: 1997, yearTo: 2006, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Sprinter', yearFrom: 1997, yearTo: 2006, component: 'Inspeção de suspensão e sistema de freio', intervalKm: 20000, intervalMonths: 12, notes: 'Peso de carga acelera desgaste.', priority: 'HIGH', order: 2 },
  { modelName: 'Sprinter', yearFrom: 1997, yearTo: 2006, component: 'Filtro de ar e filtro de combustível', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'Sprinter', yearFrom: 2006, yearTo: 2013, component: 'Óleo do motor + filtro', intervalKm: 12500, intervalMonths: 6, notes: 'Motor OM646 2.1 CDI.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Sprinter', yearFrom: 2006, yearTo: 2013, component: 'Kit de correia/corrente de distribuição', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 5 },
  { modelName: 'Sprinter', yearFrom: 2006, yearTo: 2013, component: 'Inspeção de suspensão e sistema de freio', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'Sprinter', yearFrom: 2006, yearTo: 2013, component: 'Filtro de ar e filtro de combustível', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'Sprinter', yearFrom: 2013, yearTo: 2019, component: 'Óleo do motor + filtro (motor OM651)', intervalKm: 10000, intervalMonths: 6, notes: 'Rigorosamente em dia — histórico documentado de falha de bronzina.', priority: 'CRITICAL', order: 8 },
  { modelName: 'Sprinter', yearFrom: 2013, yearTo: 2019, component: 'Monitoramento de ruído de batida metálica no motor', intervalKm: null, intervalMonths: null, notes: 'Não ignorar o primeiro sinal — problema documentado de bronzina.', priority: 'CRITICAL', order: 9 },
  { modelName: 'Sprinter', yearFrom: 2013, yearTo: 2019, component: 'Kit de correia/corrente de distribuição', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 10 },
  { modelName: 'Sprinter', yearFrom: 2013, yearTo: 2019, component: 'Inspeção de suspensão e sistema de freio', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 11 },
  { modelName: 'Sprinter', yearFrom: 2019, yearTo: null, component: 'Óleo do motor + filtro (versões diesel)', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 12 },
  { modelName: 'Sprinter', yearFrom: 2019, yearTo: null, component: 'Ciclo de regeneração do filtro de particulado (DPF)', intervalKm: null, intervalMonths: null, notes: 'Permitir completar, especialmente em uso urbano de paradas curtas.', priority: 'HIGH', order: 13 },
  { modelName: 'Sprinter', yearFrom: 2019, yearTo: null, component: 'Kit de correia/corrente de distribuição', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 14 },
  { modelName: 'Sprinter', yearFrom: 2019, yearTo: null, component: 'Inspeção de suspensão e sistema de freio', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 15 },
  { modelName: 'Sprinter', yearFrom: 2019, yearTo: null, component: 'Verificação da bateria de alta tensão (eSprinter)', intervalKm: null, intervalMonths: 12, notes: 'Somente em oficina certificada para elétrico.', priority: 'MEDIUM', order: 16 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Sprinter', yearFrom: 1997, yearTo: 2006, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Sprinter', yearFrom: 2006, yearTo: 2013, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Sprinter', yearFrom: 2013, yearTo: 2019, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
  { modelName: 'Sprinter', yearFrom: 2019, yearTo: null, MACETES: MACETES_G4, PROBLEMAS: PROBLEMAS_G4, MANUTENCAO: MANUTENCAO_G4 },
]

async function main() {
  console.log('🚗 Seed Mercedes-Benz Sprinter...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Mercedes-Benz', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Mercedes-Benz', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Sprinter', brandId: brand.id } },
    update: {}, create: { name: 'Sprinter', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Sprinter' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Sprinter' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Sprinter' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Mercedes-Benz Sprinter concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
