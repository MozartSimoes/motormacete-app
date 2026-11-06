/**
 * Seed Land Rover Defender — macetes, problemas, manutenção e calibragem
 * Chegou ao Brasil em 1992, logo após a abertura das importações
 * (versões 90/110/130, motor diesel 200Tdi/300Tdi 2.5). Entre 1998 e
 * 2006 chegou a ser montado nacionalmente em São José dos Campos (SP) —
 * carroceria importada da Inglaterra, mecânica produzida no RS pela
 * International — em volume baixíssimo (menos de mil unidades/ano); o
 * motor eletrônico TD5 2.5 chegou nesse período. A partir de 2006 voltou
 * a ser só importado do Reino Unido, com motor Td4 2.2/2.4 (base Ford
 * Duratorq), até deixar de ser vendido novo no Brasil em 2011 (a
 * produção mundial seguiu até janeiro/2016, encerrando 67 anos do
 * projeto). Em 2020 a Land Rover lançou uma geração totalmente nova —
 * carroceria monobloco (não mais chassi em escada) e suspensão
 * independente nas 4 rodas, com motores turbo a gasolina/diesel e
 * versão híbrida plug-in P400e — voltando a ser vendido no Brasil.
 * Execute: pnpm --filter @motormacete/database db:seed:landrover-defender
 *
 * Fontes: razaoautomovel.com, autoentusiastas.com.br, hojeemdia.com.br,
 *         en.wikipedia.org (Land Rover Defender), auto-doc.pt,
 *         motorguia.net, landyzone.co.uk, motorhungry.com,
 *         4x4brasil.com.br, go-parts.com, theweeklydriver.com,
 *         topclassactions.com, autolemonlawyer.com
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1992-1998 (importado, 200Tdi/300Tdi 2.5 diesel mecânico) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Chassi em escada: inspecione longarinas periodicamente, principalmente se rodou perto do mar',
    body: 'O Defender clássico usa chassi em escada de aço, ponto clássico de ferrugem — principalmente em unidades que rodaram perto do litoral ou em uso off-road frequente com lama/água salobra. Inspecionar as longarinas por baixo regularmente evita descobrir o problema tarde demais, quando o reparo estrutural fica bem mais caro.',
  },
  {
    severity: 'OK',
    title: 'Peça mecânica é compartilhada com Discovery e Range Rover da mesma época',
    body: 'Motor, transmissão e boa parte da suspensão dessa fase são compartilhados com o Discovery I e o Range Rover Classic/P38 da época. Ao procurar peça, pesquisar também por essas referências cruzadas amplia bastante as opções, principalmente para peça de motor diesel.',
  },
]

const PROBLEMAS_G1: TipInput[] = []

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Defender 1992-1998 (200Tdi/300Tdi 2.5 diesel)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água), motor interferente. | 10.000 km — Graxa nas juntas homocinéticas/articulações — use graxa à base de bissulfeto de molibdênio; em emergência, graxa EP90 API GL5 com molykode. | 20.000 km — Inspeção do chassi (longarinas) contra ferrugem. | 20.000 km — Fluido de freio.',
  },
]

// ---------- 1998-2006 (montagem nacional em São José dos Campos, chegada do TD5 eletrônico) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Unidades montadas no Brasil (1998-2006) têm mecânica de origem gaúcha — histórico de manutenção pode variar',
    body: 'Nesse período a carroceria vinha da Inglaterra mas a mecânica era produzida no Rio Grande do Sul pela International, em volume muito baixo (menos de mil unidades/ano). Vale considerar essa origem ao avaliar o histórico de manutenção de uma unidade usada dessa fase — peça de reposição pode ter fornecedor diferente das unidades 100% importadas.',
  },
  {
    severity: 'OK',
    title: 'Sistema de injeção do TD5 é sensível — limpeza profissional e troca de filtro a cada 20.000 km',
    body: 'O sistema de injeção eletrônica do TD5 é mais sensível a combustível de baixa qualidade que o TDi mecânico anterior. Limpeza profissional do sistema e troca do filtro de combustível a cada 20.000 km ajuda a evitar marcha lenta irregular e perda de potência.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'TD5: monitore a temperatura do motor — junta do cabeçote falha acima de 95°C',
    body: 'O motor TD5 tem tendência documentada de falha na junta do cabeçote quando a temperatura ultrapassa 95°C. Fique atento ao mostrador de temperatura e nunca ignore um motor esquentando mais que o normal nesse motor — a falha da junta pode causar dano em cascata caro de reparar.',
  },
  {
    severity: 'WARN',
    title: 'TD5: chicote dos bicos injetores pode deixar óleo vazar para dentro do módulo de injeção',
    body: 'Defeito conhecido do TD5: o chicote elétrico dos bicos injetores, alojado dentro do motor, pode permitir vazamento de óleo para dentro do módulo eletrônico de injeção (ECU), causando dificuldade de partida, falha de marcha lenta e perda de potência. Se notar esses sintomas, peça inspeção específica desse chicote antes de trocar peça mais cara.',
  },
  {
    severity: 'WARN',
    title: 'TD5: alguns motores saíram de fábrica sem trava química no parafuso da bomba de óleo',
    body: 'Existem relatos documentados de motores TD5 que perderam o motor porque o parafuso de fixação da bomba de óleo não recebeu trava química (thread-locker) na fábrica, soltando com o uso. Vale pedir uma inspeção preventiva desse parafuso específico em revisão, principalmente em unidade de procedência desconhecida.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma Defender 1998-2006 (TD5 2.5 diesel eletrônico)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 20.000 km — Limpeza profissional do sistema de injeção e troca do filtro de combustível. | 60.000 km/5 anos — Kit de correia dentada completo. | Sempre — monitorar a temperatura do motor, junta do cabeçote falha acima de 95°C. | Na primeira revisão — pedir inspeção do parafuso da bomba de óleo (trava química) e do chicote dos bicos injetores. | 10.000 km — Graxa nas juntas homocinéticas.',
  },
]

// ---------- 2007-2011 (volta a ser importado do Reino Unido, motor Td4 2.2/2.4) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Td4 tem base Ford Duratorq — peça de injeção pode ter equivalência cruzada',
    body: 'O motor Td4 2.2/2.4 dessa fase final é baseado no bloco Ford Duratorq. Ao procurar peça de sistema de injeção/turbo, vale pesquisar também por essa base — pode haver equivalência ou fornecedor especializado que atenda as duas marcas.',
  },
  {
    severity: 'OK',
    title: 'Última leva de Defender clássico novo no Brasil — peça de acabamento é rara, mecânica ainda tem giro',
    body: 'Essa foi a última fase do Defender clássico vendida nova no Brasil antes do hiato até 2020. Peça mecânica ainda circula bem (motor Duratorq é usado em outros modelos Ford/Land Rover), mas acabamento e itens específicos de época já são mais difíceis — considere desmanches especializados em Land Rover para esses itens.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Injetores entopem com combustível de baixa qualidade — fumaça preta e perda de potência',
    body: 'Assim como nos motores anteriores, os bicos injetores do Td4 entopem com diesel de baixa qualidade, causando marcha lenta irregular, fumaça preta no escape e perda de potência. Abasteça em posto de confiança e não ignore esses sintomas — quanto antes tratar, mais barato o reparo.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Defender 2007-2011 (Td4 2.2/2.4 diesel)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 20.000 km — Inspeção/limpeza do sistema de injeção e troca do filtro de combustível. | 60.000 km/5 anos — Kit de correia dentada completo (ou corrente, conforme a variante exata — confirme com especialista). | 10.000 km — Graxa nas juntas homocinéticas/articulações. | 20.000 km — Inspeção do chassi contra ferrugem.',
  },
]

// ---------- 2020-atual (nova geração, monobloco, suspensão independente, turbo gas/diesel/híbrido) ----------
const MACETES_G4: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão a ar: não ignore vazamento lento — pode destruir o compressor',
    body: 'A suspensão a ar dessa geração pode apresentar vazamento lento nos atuadores dianteiros, fazendo o carro "afundar" de um lado quando estacionado. Se isso acontecer com frequência, leve para diagnóstico — deixar o compressor trabalhando continuamente para compensar o vazamento pode destruí-lo, transformando um reparo barato (vedação) em um caro (compressor inteiro).',
  },
  {
    severity: 'OK',
    title: 'Elétrica é o ponto de falha mais reportado — atenção a conectores e módulos antes de suspeitar de peça mecânica',
    body: 'Levantamentos de confiabilidade internacionais apontam a parte elétrica como o maior gerador de falha nessa geração do Defender. Diagnóstico de "carro com comportamento estranho" deve sempre incluir verificação de módulos/conectores elétricos antes de partir para peça mecânica cara.',
  },
]

const PROBLEMAS_G4: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL internacional — corrosão no conector do airbag do motorista pode impedir o acionamento',
    body: 'Recall documentado internacionalmente afetando Defender de várias gerações do modelo (2020-2026): corrosão pode se desenvolver dentro do conector do airbag do motorista com o tempo, aumentando a resistência elétrica e podendo impedir o acionamento do airbag em uma colisão. Consulte a Land Rover Brasil para verificar se sua unidade está incluída e agendar o reparo gratuito.',
  },
  {
    severity: 'WARN',
    title: 'RECALL internacional — parafusos do tubo de escape ao catalisador com torque incorreto (unidades 2020-2021)',
    body: 'Recall documentado internacionalmente: as fixações que conectam o tubo de descida do escape ao catalisador podem não ter sido apertadas ao torque especificado em algumas unidades 2020/2021 (cerca de 4.000 veículos afetados globalmente). Consulte a Land Rover Brasil para verificar se sua unidade está incluída.',
  },
  {
    severity: 'WARN',
    title: 'Struts de suspensão a ar dianteiros com lote com defeito (produção ago-nov/2020)',
    body: 'Land Rover identificou um lote de atuadores de suspensão a ar dianteiros com defeito em unidades fabricadas entre agosto e novembro de 2020, propensos a vazamento lento e "afundamento" da dianteira quando estacionado. Se sua unidade é desse período de fabricação, vale verificar com a concessionária mesmo sem sintoma aparente ainda.',
  },
]

const MANUTENCAO_G4: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Defender 2020+ (turbo gasolina/diesel ou híbrido plug-in P400e)',
    body: '10.000-15.000 km — Troca de óleo do motor + filtro, conforme motorização. | 20.000 km — Verificação da suspensão a ar (altura em repouso, ruído do compressor). | 40.000 km — Fluido de freio e filtro de ar/cabine. | Anual — Diagnóstico eletrônico completo (módulos/conectores), dado o histórico de falha elétrica nessa geração. | Conforme manual — verificação específica da bateria de alta voltagem e sistema de recarga na versão híbrida P400e.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Defender', yearFrom: 1992, yearTo: 2011, tireSize: '235/85 R16 ou 265/75 R16 (conforme versão 90/110/130)', frontPsi: 32, rearPsi: 35, frontPsiLoad: 38, rearPsiLoad: 42, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual — pressão sobe bastante com carga plena, típico de utilitário pesado.' },
  { modelName: 'Defender', yearFrom: 2020, yearTo: null, tireSize: '255/70 R18 ou 265/60 R20 conforme versão', frontPsi: 34, rearPsi: 34, frontPsiLoad: 38, rearPsiLoad: 41, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — a suspensão a ar pode exigir recalibração da pressão junto com o ajuste de altura.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Defender', yearFrom: 1992, yearTo: 1998, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 200Tdi/300Tdi 2.5 diesel.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Defender', yearFrom: 1992, yearTo: 1998, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Defender', yearFrom: 1992, yearTo: 1998, component: 'Graxa nas juntas homocinéticas/articulações', intervalKm: 10000, intervalMonths: 12, notes: 'Graxa à base de bissulfeto de molibdênio; emergência: EP90 GL5 com molykote.', priority: 'HIGH', order: 2 },
  { modelName: 'Defender', yearFrom: 1992, yearTo: 1998, component: 'Inspeção do chassi (longarinas) contra ferrugem', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Defender', yearFrom: 1998, yearTo: 2006, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor TD5 2.5 diesel eletrônico.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Defender', yearFrom: 1998, yearTo: 2006, component: 'Limpeza do sistema de injeção e filtro de combustível', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'Defender', yearFrom: 1998, yearTo: 2006, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 6 },
  { modelName: 'Defender', yearFrom: 1998, yearTo: 2006, component: 'Monitoramento da temperatura do motor', intervalKm: null, intervalMonths: null, notes: 'Junta do cabeçote do TD5 falha acima de 95°C.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Defender', yearFrom: 1998, yearTo: 2006, component: 'Graxa nas juntas homocinéticas/articulações', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'Defender', yearFrom: 2007, yearTo: 2011, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor Td4 2.2/2.4 diesel.', priority: 'CRITICAL', order: 9 },
  { modelName: 'Defender', yearFrom: 2007, yearTo: 2011, component: 'Inspeção/limpeza do sistema de injeção e filtro de combustível', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'Defender', yearFrom: 2007, yearTo: 2011, component: 'Kit de correia/corrente de distribuição', intervalKm: 60000, intervalMonths: 60, notes: 'Confirme configuração exata com especialista.', priority: 'CRITICAL', order: 11 },
  { modelName: 'Defender', yearFrom: 2007, yearTo: 2011, component: 'Graxa nas juntas homocinéticas/articulações', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 12 },
  { modelName: 'Defender', yearFrom: 2007, yearTo: 2011, component: 'Inspeção do chassi contra ferrugem', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 13 },
  { modelName: 'Defender', yearFrom: 2020, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 12000, intervalMonths: 12, notes: 'Conforme motorização (turbo gasolina, diesel ou híbrido P400e).', priority: 'CRITICAL', order: 14 },
  { modelName: 'Defender', yearFrom: 2020, yearTo: null, component: 'Verificação da suspensão a ar (altura em repouso, ruído do compressor)', intervalKm: 20000, intervalMonths: 12, notes: 'Vazamento lento pode destruir o compressor se ignorado.', priority: 'HIGH', order: 15 },
  { modelName: 'Defender', yearFrom: 2020, yearTo: null, component: 'Diagnóstico eletrônico completo (módulos/conectores)', intervalKm: null, intervalMonths: 12, notes: 'Elétrica é o ponto de falha mais reportado nessa geração.', priority: 'MEDIUM', order: 16 },
  { modelName: 'Defender', yearFrom: 2020, yearTo: null, component: 'Fluido de freio e filtro de ar/cabine', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 17 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Defender', yearFrom: 1992, yearTo: 1998, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Defender', yearFrom: 1998, yearTo: 2006, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Defender', yearFrom: 2007, yearTo: 2011, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
  { modelName: 'Defender', yearFrom: 2020, yearTo: null, MACETES: MACETES_G4, PROBLEMAS: PROBLEMAS_G4, MANUTENCAO: MANUTENCAO_G4 },
]

async function main() {
  console.log('🚗 Seed Land Rover Defender...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Land Rover', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Land Rover', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Defender', brandId: brand.id } },
    update: {}, create: { name: 'Defender', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Defender' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Defender' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Defender' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Land Rover Defender concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
