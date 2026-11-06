/**
 * Seed Chevrolet Agile — macetes, problemas, manutenção e calibragem de pneus
 * Hatch compacto vendido de 2009 a 2014, baseado na plataforma Corsa/Celta,
 * motor 1.4 8V FlexPower, versões LT/LTZ/Effect, câmbio manual 5 marchas ou
 * automatizado Easytronic (opcional nas versões topo). Bom espaço interno
 * para a categoria, mas com fama de câmbio automatizado problemático.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-agile
 *
 * Fontes: turbonoticias.com.br, motoragora.com.br, oficinabrasil.com.br,
 *         carroclub.com.br, opinautos.com.br, seucarrousado.com.br
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
    title: 'Motor 1.4 8V compartilha peça com Corsa, Celta, Classic e Prisma antigo',
    body: 'O motor 1.4 FlexPower do Agile é o mesmo bloco usado em outros modelos GM da mesma plataforma. Peças de motor, suspensão e boa parte da elétrica são intercambiáveis — procure pela referência "Corsa/Celta 1.4" quando não achar peça específica cadastrada para o Agile.',
  },
  {
    severity: 'DANGER',
    title: 'Câmbio Easytronic: se pensa em automatizado, pesquise a fundo antes de comprar',
    body: 'A versão com câmbio Easytronic não é um automático de conversor de torque — é um robô que troca marchas usando embreagem convencional. O atuador da embreagem e o módulo eletrônico têm histórico de defeito crônico, com trancos fortes, demora para engatar a ré ou travamento numa marcha (letra "F" de falha piscando no painel). O conserto do robô Easytronic é caro. Antes de comprar um Agile automatizado, vale pedir um diagnóstico completo do sistema numa oficina especializada.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio manual: dificuldade para engatar ré e 1ª marcha é queixa recorrente',
    body: 'Mesmo nas versões de câmbio manual convencional, há relatos de dificuldade para engatar a marcha à ré e a primeira. Antes de fechar negócio na compra de um usado, teste especificamente esses engates com o motor frio e quente.',
  },
  {
    severity: 'OK',
    title: 'Vedação de porta e porta-malas: reforce contra infiltração',
    body: 'Infiltração de água em dias de chuva é queixa comum, geralmente ligada às borrachas de vedação das portas e ao isolamento do porta-malas. Vale inspecionar e trocar essas borrachas preventivamente se notar ressecamento — evita bolor e problema elétrico por umidade.',
  },
  {
    severity: 'OK',
    title: 'Display do ar-condicionado digital pode falhar nas versões LTZ — não é defeito do sistema de refrigeração',
    body: 'É comum o mostrador azul do ar-condicionado digital começar a apagar números ou ficar ilegível nas versões LTZ. Isso é um problema do display/placa eletrônica, não do sistema de refrigeração em si — o ar-condicionado geralmente continua gelando normalmente mesmo com o display falhando.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Atuador de embreagem e módulo do Easytronic com defeito crônico',
    body: 'O sistema Easytronic apresenta trancos fortes ("soluços"), demora a engatar a ré, ou trava numa marcha com a letra "F" de falha piscando no painel. É o defeito mais caro e mais citado do Agile — se o carro der esses sinais, procure diagnóstico especializado o quanto antes.',
  },
  {
    severity: 'WARN',
    title: 'Falha de bobina causa luz de injeção piscando e engasgos do motor',
    body: 'A luz da injeção pisca e/ou o motor apresenta pequenas falhas, na maioria das vezes por mau funcionamento da bobina de ignição. Some a isso relatos de consumo de combustível acima do esperado em uso urbano — o motor 1.4 flex não entrega grande eficiência energética mesmo funcionando bem.',
  },
  {
    severity: 'WARN',
    title: 'Infiltração de água pelas borrachas de portas e porta-malas',
    body: 'Em dias de chuva, é comum entrada de água pelo interior do veículo, principalmente pelas borrachas das portas e pelo isolamento do porta-malas. Se sentir umidade ou cheiro de mofo no carpete, verifique essas vedações antes de suspeitar de problema estrutural.',
  },
  {
    severity: 'WARN',
    title: 'Display do ar-condicionado digital falha nas versões LTZ',
    body: 'Defeito estético/eletrônico bem difundido: o mostrador azul do painel de ar-condicionado digital começa a apresentar números apagados ou ilegíveis. Não afeta o funcionamento da refrigeração, mas incomoda no dia a dia — reparo costuma envolver troca da placa do display.',
  },
  {
    severity: 'WARN',
    title: 'Dificuldade para engatar marchas mesmo em câmbio manual convencional',
    body: 'Além do Easytronic, o câmbio manual "normal" também tem relatos de dificuldade de engate, especialmente na ré e na primeira marcha. Pode estar ligado a ajuste do cabo de câmbio — vale investigar antes de suspeitar de desgaste interno da caixa.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Agile 1.4 FlexPower (manual e Easytronic)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 30.000 km — Velas de ignição (ajuda a evitar falha de bobina/engasgo). | 40.000 km — Fluido de freio DOT 3/4 + kit correia dentada/tensionador. | 40.000-60.000 km — Óleo do atuador de embreagem/óleo específico do Easytronic (versões automatizadas) — siga a recomendação do manual à risca, é ponto crítico do sistema. | 60.000 km — Fluido de arrefecimento. | Rodízio de pneus a cada 10.000 km. | Inspecione vedações de porta e porta-malas contra infiltração.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Agile',
    yearFrom: 2009,
    yearTo: null,
    tireSize: '175/70 R14 · 185/60 R15 (versões LTZ, aro 15)',
    frontPsi: 28,
    rearPsi: 26,
    frontPsiLoad: 32,
    rearPsiLoad: 32,
    sparePsi: 60,
    notes: 'Carro leve (até 2 ocupantes): 28 PSI dianteira / 26 PSI traseira. Carro pesado (mais ocupantes): 32 PSI nos quatro pneus. Confirme o valor exato na etiqueta da coluna da porta do motorista, específico do seu ano/versão.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Agile', yearFrom: 2009, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Viscosidade conforme manual — motor 1.4 8V FlexPower.', priority: 'HIGH', order: 0 },
  { modelName: 'Agile', yearFrom: 2009, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Agile', yearFrom: 2009, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em cidades com muita poeira.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Agile', yearFrom: 2009, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Agile', yearFrom: 2009, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Em dia ajuda a evitar sobrecarga na bobina, ponto de falha conhecido.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Agile', yearFrom: 2009, yearTo: null, component: 'Correia dentada + tensionador', intervalKm: 40000, intervalMonths: 60, notes: 'Aproveite para trocar a bomba d\'água junto.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Agile', yearFrom: 2009, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Agile', yearFrom: 2009, yearTo: null, component: 'Óleo/atuador do câmbio Easytronic (versões automatizadas)', intervalKm: 40000, intervalMonths: 36, notes: 'Ponto crítico do sistema — siga à risca o intervalo do manual. Trancos ou letra "F" piscando pedem diagnóstico imediato.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Agile', yearFrom: 2009, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 8 },
  { modelName: 'Agile', yearFrom: 2009, yearTo: null, component: 'Vedações de portas e porta-malas — inspeção', intervalKm: 20000, intervalMonths: 12, notes: 'Previne infiltração de água em dias de chuva.', priority: 'LOW', order: 9 },
  { modelName: 'Agile', yearFrom: 2009, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Agile',
    yearFrom: 2009,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Agile...')

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

  console.log('✅ Chevrolet Agile concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
