/**
 * Seed Chevrolet Meriva — macetes, problemas, manutenção e calibragem de pneus
 * Minivan compacta de 5 lugares da GM no Brasil entre 2002 e 2012, baseada
 * na plataforma do Corsa. Motores 1.4/1.8 8V (Família Corsa/Família II),
 * câmbio manual 5 marchas ou automatizado Easytronic. Versões Joy/Maxx/
 * Premium/SS/Collection. Problema clássico e mais citado do modelo: câmbio
 * automatizado Easytronic (apelidado "Easytranco" por proprietários).
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-meriva
 *
 * Fontes: merivaclube.com.br, blogdaluauto.blogspot.com, oficinabrasil.com.br,
 *         alvaromatiassa.wordpress.com, carroclub.com.br, reclameaqui.com.br,
 *         calibragemdepneu.com.br, opinautos.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput {
  severity: Sev
  title: string
  body: string
}

interface ModelBlock {
  modelName: string
  yearFrom: number | null
  yearTo: number | null
  MACETES: TipInput[]
  PROBLEMAS: TipInput[]
  MANUTENCAO: TipInput[]
}

interface TirePressureInput {
  modelName: string
  yearFrom: number | null
  yearTo: number | null
  tireSize: string
  frontPsi: number
  rearPsi: number
  frontPsiLoad: number | null
  rearPsiLoad: number | null
  sparePsi: number | null
  notes: string | null
}

interface MaintenanceItemInput {
  modelName: string
  yearFrom: number | null
  yearTo: number | null
  component: string
  intervalKm: number | null
  intervalMonths: number | null
  notes: string | null
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  order: number
}

const MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Easytronic: se for comprar usada, teste bastante antes de fechar negócio',
    body: 'O câmbio automatizado Easytronic ganhou fama de problemático entre proprietários (apelido "Easytranco" nos fóruns) — trancos, engates errados e perda total de referência das marchas são queixas recorrentes, principalmente em carros usados intensamente (caso de táxis). Ao comprar uma Meriva Easytronic usada, faça um test-drive longo simulando trânsito parado e arrancadas, prestando atenção a trancos e demora no engate. Se possível, prefira a versão de câmbio manual — é mecanicamente mais simples e sem esse histórico de problema.',
  },
  {
    severity: 'OK',
    title: 'Mecânica compartilhada com o Corsa facilita achar peça',
    body: 'A Meriva usa boa parte da mecânica do Corsa da mesma época (motores 1.4/1.8, suspensão, freios) — em oficina, peça peças "para motor 1.4/1.8 GM Corsa/Meriva" quando o sistema não tiver cadastro específico para Meriva. Isso amplia bastante as opções de peça alternativa e reduz custo.',
  },
  {
    severity: 'OK',
    title: 'Porta traseira com abertura ampla: cuidado ao manobrar em vaga apertada',
    body: 'A Meriva tem porta lateral traseira com abertura maior que a média (facilita entrada de cadeirinha e crianças), mas isso também significa mais chance de bater a porta em obstáculos ao abrir em vaga apertada. Não é defeito mecânico, mas vale o cuidado extra em estacionamento — a porta é mais cara de reparar por ser um item específico do modelo.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Câmbio automatizado Easytronic — perda de referência e travamento das marchas',
    body: 'É o problema mais grave e mais citado sobre a Meriva: o câmbio Easytronic pode perder a referência eletrônica e não trocar marcha automaticamente, ou travar completamente (nem no modo manual engata). Há relatos de o carro parar no meio da via com poucos milhares de km rodados, e de engate abrupto e inesperado de marcha causando arrancada em alta velocidade — risco real de segurança. Nunca ignore luz de alerta do câmbio ou tranco fora do padrão; leve para diagnóstico eletrônico imediatamente.',
  },
  {
    severity: 'WARN',
    title: 'Reparo do Easytronic é caro e nem sempre definitivo',
    body: 'Proprietários relatam dificuldade em resolver o problema do Easytronic de forma definitiva — o reparo pode envolver troca do kit de embreagem, reprogramação do sistema ou substituição do módulo eletrônico de comando (custo relatado acima de R$ 5.000 em alguns casos). Antes de gastar com reparo, procure oficina especializada especificamente nesse câmbio, não uma oficina genérica — o diagnóstico errado é comum e pode gerar gastos desnecessários.',
  },
  {
    severity: 'WARN',
    title: 'Sensores e bobina de ignição — mesma fragilidade da família GM 1.4/1.8',
    body: 'Assim como no Corsa e demais modelos com o mesmo motor, sensores de fluxo de ar e bobina de ignição de procedência duvidosa tendem a falhar rápido na Meriva. Priorize peça original ou de marca homologada.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Meriva 1.4/1.8 8V (ajustado para uso severo no Brasil)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 50.000-60.000 km ou 5 anos (o que vier primeiro) — Correia dentada + tensor + bomba d\'água preventivamente. | 60.000 km — Fluido de arrefecimento. | Versões Easytronic: fluido/óleo do sistema hidráulico de acionamento da embreagem conforme manual — não deixe vencer, é ponto sensível do câmbio. | Rodízio de pneus a cada 10.000 km.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Meriva',
    yearFrom: 2002,
    yearTo: null,
    tireSize: '175/70 R14 (motor 1.4) · 185/60 R15 (motor 1.8)',
    frontPsi: 33,
    rearPsi: 29,
    frontPsiLoad: 36,
    rearPsiLoad: 42,
    sparePsi: 60,
    notes: 'Valores de referência para 1.4 com até 3 ocupantes (33/29 PSI) e carro lotado (36/42 PSI); versão 1.8 costuma pedir 34/30 PSI normal e 36/42 PSI lotado. Confirme sempre na etiqueta da coluna da porta do motorista, pois varia por versão/ano.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Meriva', yearFrom: 2002, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Use sempre a viscosidade especificada no manual da sua versão/ano.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Meriva', yearFrom: 2002, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Meriva', yearFrom: 2002, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Meriva', yearFrom: 2002, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Meriva', yearFrom: 2002, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor aspirado — intervalo mais generoso que motores turbo.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Meriva', yearFrom: 2002, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Meriva', yearFrom: 2002, yearTo: null, component: 'Correia dentada + tensor', intervalKm: 55000, intervalMonths: 60, notes: 'CRÍTICO: motor interferente, ruptura causa dano grave. Em carro antigo, respeite o prazo de 5 anos mesmo com pouca km rodada.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Meriva', yearFrom: 2002, yearTo: null, component: 'Bomba d\'água — troca preventiva', intervalKm: 55000, intervalMonths: 60, notes: 'Troque junto com a correia dentada.', priority: 'HIGH', order: 7 },
  { modelName: 'Meriva', yearFrom: 2002, yearTo: null, component: 'Câmbio Easytronic — fluido/óleo hidráulico do atuador (versões Easytronic)', intervalKm: 40000, intervalMonths: 24, notes: 'Ponto sensível do câmbio automatizado. Não deixe vencer — condição associada a agravamento de trancos e falhas de engate.', priority: 'HIGH', order: 8 },
  { modelName: 'Meriva', yearFrom: 2002, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 9 },
  { modelName: 'Meriva', yearFrom: 2002, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado, conforme tipo de tração.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Meriva',
    yearFrom: 2002,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Meriva...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Chevrolet', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Chevrolet', vehicleTypeId: carroType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }, idx) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: null,
        yearTo: null,
        order: idx,
      })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map((b) => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Chevrolet Meriva concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
