/**
 * Seed Kia Optima — macetes, problemas, manutenção e calibragem de pneus
 * Sedan médio/executivo (3ª geração, plataforma TF), vendido no Brasil de
 * 2011/2012 até 2016 (facelift em 2013). Só duas motorizações no Brasil,
 * ambas a gasolina com injeção multiponto (MPI) — a versão turbo com
 * injeção direta (T-GDI) vendida nos EUA NÃO foi comercializada aqui, o que
 * é relevante porque o recall americano da Hyundai/Kia por travamento de
 * motor foi especificamente ligado à tecnologia GDI/T-GDI. Câmbio automático
 * de 6 marchas único — não havia opção manual no Brasil.
 * Execute: pnpm --filter @motormacete/database db:seed:kia-optima
 *
 * Fontes: reclameaqui.com.br, autoentusiastasclassic.com.br, kbb.com.br,
 *         opinautos.com.br, carrosnaweb.com.br, kia-forums.com,
 *         auto-doc.pt, michelin.com.br
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
    severity: 'OK',
    title: 'Motor a corrente, não a correia — sem intervalo fixo de troca',
    body: 'Diferente de muitos concorrentes da época, o motor 2.4 (e o 2.0) do Optima usa corrente de distribuição, não correia. A corrente é projetada para durar a vida útil do motor sem troca programada — mas isso não significa "esquecer para sempre": ruído tipo "matraca" no motor frio, principalmente na partida, é sinal de corrente ou tensionador gastos e vale investigar cedo, antes de virar problema maior.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático de 6 marchas único — sem versão manual no Brasil',
    body: 'Todo Optima vendido no Brasil veio com câmbio automático de 6 velocidades — não existe versão manual por aqui. Ao procurar peça ou manual de referência online, ignore qualquer conteúdo sobre câmbio manual (comum em fóruns americanos/europeus) — não se aplica ao seu carro.',
  },
  {
    severity: 'WARN',
    title: 'Peça de mercado — procure também em desmanches/kits de Hyundai/Kia irmãos',
    body: 'O Optima compartilha bastante mecânica (motor Theta II 2.0/2.4, plataforma) com outros modelos Hyundai-Kia da época vendidos em maior volume no Brasil e no mercado americano (ex: Hyundai Sonata usa o mesmo motor Theta II). Ao procurar peça de motor específica que não tem estoque "para Optima", busque também por "motor Theta II 2.0/2.4 Hyundai-Kia" — amplia bastante a busca.',
  },
  {
    severity: 'OK',
    title: 'Modelo de baixo volume no Brasil — pesquise bem antes de fechar negócio numa oficina',
    body: 'O Optima nunca teve alto volume de vendas no Brasil, e foi descontinuado sem substituto direto por aqui (o sucessor Kia K5 não chegou ao mercado brasileiro). Isso significa menos oficina "acostumada" com o carro — vale procurar especificamente oficinas com experiência em Hyundai/Kia (não só concessionária) antes de deixar numa oficina genérica, principalmente para diagnóstico de motor/câmbio.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Ruído de batida no motor (motor Theta II) — não ignore, é o problema mais sério da família',
    body: 'O motor Theta II (2.0/2.4) usado no Optima é da mesma família que motorizou uma série de recalls internacionais da Hyundai/Kia por desgaste prematuro dos mancais do virabrequim, podendo levar ao travamento do motor. A versão brasileira (injeção multiponto, sem GDI/turbo) não fez parte dos recalls por GDI, mas o risco de desgaste de mancal não é exclusivo da injeção direta. Se notar barulho de "batida metálica" vindo do motor (mais audível em marcha lenta ou aceleração), luz de pressão de óleo acendendo, ou perda de potência súbita, pare de rodar e leve para diagnóstico imediatamente — rodar com esse sintoma pode travar o motor de vez.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático com engates bruscos/atrasados em quilometragem alta',
    body: 'Relatos (principalmente internacionais, mas o mecanismo é o mesmo câmbio vendido aqui) apontam trocas de marcha bruscas ou com atraso perceptível a partir de 100.000-150.000 km. Se notar esse padrão, troque o fluido do câmbio automático antes de suspeitar de problema mecânico maior — em bastante casos resolve ou pelo menos atrasa bastante o desgaste.',
  },
  {
    severity: 'WARN',
    title: 'Reclamações no Brasil sobre motor 2.4 — vazamento e consumo de óleo',
    body: 'Há reclamações registradas de donos brasileiros especificamente sobre a versão 2.4 relacionadas a vazamento e consumo de óleo acima do esperado. Fique atento ao nível de óleo entre as trocas (não espere só a revisão programada) — motor Theta II com consumo de óleo alto sem vazamento visível no chão é sinal de anel de pistão desgastado, vale diagnóstico preventivo.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Optima 2.0/2.4 (referência Kia + ajuste uso severo BR)',
    body: '10.000 km — Troca de óleo do motor + filtro de óleo (use sempre a viscosidade especificada no manual, óleo de qualidade reduz risco do problema conhecido de mancal do Theta II). | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000-60.000 km — Fluido de freio DOT 3/4. | 60.000 km — Fluido do câmbio automático (não é vitalício, mesmo sem apresentar trancos — antecipe se notar engate brusco). | 60.000 km — Velas de ignição. | 60.000 km — Fluido de arrefecimento. | Sempre — fique atento a ruído de batida no motor (sinal de mancal desgastado) e luz de pressão de óleo, esse é o ponto crítico dessa família de motor.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Optima',
    yearFrom: 2011,
    yearTo: 2016,
    tireSize: '215/55 R17',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 33,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Valor de referência típico da categoria sedan médio — confirme na etiqueta da coluna da porta do motorista ou manual do proprietário do seu exemplar específico.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Optima', yearFrom: 2011, yearTo: 2016, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Não atrase — óleo de qualidade e troca em dia reduzem o risco do problema conhecido de mancal do motor Theta II.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Optima', yearFrom: 2011, yearTo: 2016, component: 'Inspeção de ruído/vibração do motor', intervalKm: null, intervalMonths: 6, notes: 'Ruído de batida metálica é o sintoma mais sério dessa família de motor — investigue assim que notar.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Optima', yearFrom: 2011, yearTo: 2016, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'Optima', yearFrom: 2011, yearTo: 2016, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'Optima', yearFrom: 2011, yearTo: 2016, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'Optima', yearFrom: 2011, yearTo: 2016, component: 'Fluido do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício — antecipe se notar engate brusco ou atrasado.', priority: 'HIGH', order: 5 },
  { modelName: 'Optima', yearFrom: 2011, yearTo: 2016, component: 'Velas de ignição', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'Optima', yearFrom: 2011, yearTo: 2016, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'Optima', yearFrom: 2011, yearTo: 2016, component: 'Corrente de distribuição — inspeção de ruído/tensionador', intervalKm: 80000, intervalMonths: null, notes: 'Sem troca programada, mas ruído tipo "matraca" na partida a frio indica desgaste do tensionador.', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Optima',
    yearFrom: 2011,
    yearTo: 2016,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Kia Optima...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Kia Motors', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Kia Motors', vehicleTypeId: carroType.id },
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
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
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

  console.log('✅ Kia Optima concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
