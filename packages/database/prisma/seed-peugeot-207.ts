/**
 * Seed Peugeot 207 — macetes, problemas, manutenção e calibragem
 * Vendido no Brasil de 2008 a 2014/2015 (produção encerrada por etapas:
 * SW em 2013, Sedan e Hatch em 2014, com estoque residual vendido até
 * 2015), sem sucessor direto. Hatch (3p/5p), Sedan ("207 Passion") e SW
 * (perua). Motores 1.4 8V TU3JP (82cv) e 1.6 16V (113cv), ambos Flex.
 * Compartilha boa parte da estrutura e mecânica com o 206 antecessor.
 * Câmbio automático AL4 (compartilhado com Citroën C4/Xsara e outros
 * PSA da época) tem problema crônico bem documentado.
 * Execute: pnpm --filter @motormacete/database db:seed:peugeot-207
 *
 * Fontes: pt.wikipedia.org (Peugeot 207 Brasil), oficinabrasil.com.br,
 *         exame.com, shopcar.com.br, alvaromatiassa.wordpress.com,
 *         207sw.blogspot.com, reclameaqui.com.br, autoo.com.br,
 *         doutorie.com.br, canaldapeca.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

const MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Compartilha boa parte da mecânica e estrutura com o 206 — facilita achar peça',
    body: 'O 207 herda boa parte da plataforma, suspensão e componentes mecânicos do Peugeot 206 anterior. Se não achar peça catalogada como "207", procure também por "206" do período — muitas vezes é a mesma peça ou tem equivalente direto.',
  },
  {
    severity: 'OK',
    title: 'Câmbio AL4 travando só na primeira partida fria da manhã? Provavelmente é válvula, não a caixa',
    body: 'Padrão de falha muito característico do AL4: o carro funciona normalmente o dia inteiro, mas na primeira partida da manhã com o motor frio entra em modo de emergência (trava na 3ª marcha); desliga, espera esquentar e o defeito some. Em cerca de 90% dos casos em que a concessionária condena a caixa inteira, o problema real é só nas eletroválvulas/sistema hidráulico (peça original de marca Acim tinha defeito de projeto) — reparo muito mais barato que trocar o câmbio completo. Antes de aceitar orçamento de "câmbio inteiro", procure oficina especializada em AL4 para diagnóstico das válvulas solenoides.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.4 (82cv) x 1.6 16V (113cv): diferença real de desempenho, ambos Flex',
    body: 'O 1.4 8V TU3JP é mais econômico mas com desempenho mais modesto (82cv); o 1.6 16V (113cv, versões XS/Escapade/topo de linha) entrega desempenho bem superior. Ambos são flex — confirme qual motor sua unidade tem antes de orçar peça, já que não são intercambiáveis.',
  },
  {
    severity: 'WARN',
    title: 'Rede de peça reduzida no Brasil — considere oficina especializada em PSA/francês',
    body: 'Por ser marca com rede de concessionária e oficina menor que as marcas mais populares no Brasil, peça específica do 207 pode ser mais cara ou demorada de achar. Oficinas especializadas em carros franceses (Peugeot/Citroën) tendem a ter mais familiaridade com peça alternativa/mercado paralelo compatível do que uma oficina genérica.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall: desalinhamento do sistema de direção (unidades 2009)',
    body: 'A Peugeot convocou recall para o 207 hatchback e SW ano/modelo 2009 (chassi entre 9B017010 e 9B018904) por desalinhamento do sistema de direção, que podia causar desgaste irregular dos pneus, ruído na suspensão dianteira e, em casos mais graves, perda de controle da direção. O reparo consistia em verificar/corrigir as porcas de trava dos terminais de direção. Se sua unidade está nessa faixa de chassi, confirme na concessionária se o reparo já foi feito — ligue 0800 703 2424.',
  },
  {
    severity: 'DANGER',
    title: 'Recall: bomba de direção hidráulica com risco de vazamento e incêndio (unidades 2010)',
    body: 'A Peugeot convocou recall para 1.644 unidades do 207 e Hoggar ano/modelo 2010 por possível não conformidade de componente interno da bomba de direção hidráulica — podia causar endurecimento progressivo da direção e, em casos raros, vazamento de fluido de direção hidráulica com risco de incêndio. Faixas de chassi 207 afetadas: AB062690-BB043495 e BG024076-BG029351. Confirme na concessionária se sua unidade está na faixa e se o reparo já foi feito.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão frágil — bieletas e buchas de bandeja são a queixa mais recorrente',
    body: 'É considerado por muitos donos e oficinas o maior ponto fraco do 207: bieletas de estabilizadora e buchas da bandeja dianteira desgastam com frequência bem maior que o esperado, gerando ruído e folga precocemente — "a suspensão parece não ter sido projetada para as ruas do Brasil", segundo relato recorrente. Vale inspecionar esses itens específicos a cada revisão, não só quando o carro já está fazendo barulho.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático AL4: problema crônico amplamente documentado',
    body: 'O AL4 é um dos câmbios mais reclamados entre os carros PSA (Peugeot/Citroën) da época no Brasil — travamento, dificuldade para trocar marcha e desprogramação são queixas recorrentes. Chegou a existir um abaixo-assinado público com mais de 1.150 assinaturas pedindo recall formal da PSA, que nunca aconteceu. Outro ponto de atenção documentado: entrada de água no módulo eletrônico do câmbio (TCM) também já foi relatada como causa de defeito. Ver dica em MACETES sobre o padrão de falha "manhã fria" antes de aceitar troca da caixa inteira.',
  },
  {
    severity: 'WARN',
    title: 'Relatos de trinca/furo no bloco do motor — raro, mas caro de resolver',
    body: 'Há relatos pontuais de trinca ou furo no bloco do motor entre proprietários, geralmente associados a dificuldade posterior para achar peça/serviço adequado. Não é o problema mais comum do modelo, mas é grave o suficiente para valer atenção redobrada ao sistema de arrefecimento (nível de fluido, radiador, mangueiras) como prevenção.',
  },
  {
    severity: 'WARN',
    title: 'Herdou problemas crônicos do Peugeot 206 (mecânica compartilhada)',
    body: 'Por compartilhar boa parte da plataforma e mecânica com o 206, o 207 herdou também vários dos pontos fracos crônicos daquele modelo — o "novo visual" não resolveu os problemas estruturais/mecânicos mais antigos, apenas trocou a carroceria por cima.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 207 (1.4/1.6, manual ou automático AL4)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro. | 10.000 km — Inspeção específica de bieletas e buchas da bandeja dianteira (ponto fraco documentado do modelo). | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água) — motor interferente, não postergar. | 60.000 km — Fluido do câmbio AL4 (versões automáticas) — não elimina o risco de falha das válvulas, mas ajuda a prevenir. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | Verificar sistema de arrefecimento com atenção redobrada (nível, radiador, mangueiras) — prevenção contra superaquecimento. | Verificar na concessionária se os recalls de direção (2009) e bomba hidráulica (2010) já foram concluídos, se sua unidade estiver na faixa de chassi afetada.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: '207', yearFrom: 2008, yearTo: 2015, tireSize: '185/60 R15 (referência, 1.4) · 195/55 R16 (referência, 1.6/XS)', frontPsi: 30, rearPsi: 28, frontPsiLoad: 33, rearPsiLoad: 33, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — SW (perua) pode ter pressão traseira maior recomendada por carregar mais peso.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: '207', yearFrom: 2008, yearTo: 2015, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor 1.4 ou 1.6.', priority: 'CRITICAL', order: 0 },
  { modelName: '207', yearFrom: 2008, yearTo: 2015, component: 'Verificação dos recalls de direção (2009) e bomba hidráulica (2010)', intervalKm: null, intervalMonths: null, notes: 'Risco de perda de controle da direção ou vazamento com risco de incêndio — confirmar faixa de chassi na concessionária.', priority: 'CRITICAL', order: 1 },
  { modelName: '207', yearFrom: 2008, yearTo: 2015, component: 'Inspeção de bieletas e buchas da bandeja dianteira', intervalKm: 10000, intervalMonths: null, notes: 'Ponto fraco documentado do modelo — desgaste bem mais rápido que o esperado.', priority: 'HIGH', order: 2 },
  { modelName: '207', yearFrom: 2008, yearTo: 2015, component: 'Kit de correia dentada completo (correia + tensores + bomba d\'água)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente — não postergar.', priority: 'CRITICAL', order: 3 },
  { modelName: '207', yearFrom: 2008, yearTo: 2015, component: 'Fluido do câmbio AL4 (versões automáticas)', intervalKm: 60000, intervalMonths: 48, notes: 'Ajuda a prevenir falha, mas não elimina risco de defeito nas válvulas solenoides.', priority: 'HIGH', order: 4 },
  { modelName: '207', yearFrom: 2008, yearTo: 2015, component: 'Sistema de arrefecimento (nível, radiador, mangueiras)', intervalKm: null, intervalMonths: 12, notes: 'Atenção redobrada — há relatos pontuais de trinca/furo no bloco do motor.', priority: 'HIGH', order: 5 },
  { modelName: '207', yearFrom: 2008, yearTo: 2015, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: '207', yearFrom: 2008, yearTo: 2015, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
]

const BLOCKS: ModelBlock[] = [{ modelName: '207', yearFrom: 2008, yearTo: 2015, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Peugeot 207...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Peugeot', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Peugeot', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: '207', brandId: brand.id } },
    update: {}, create: { name: '207', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: '207' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: '207' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: '207' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Peugeot 207 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
