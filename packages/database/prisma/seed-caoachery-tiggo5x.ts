/**
 * Seed Caoa Chery Tiggo 5X — macetes, problemas, manutenção e calibragem
 * SUV compacto, motor 1.5 turbo flex (também disponível em versão híbrida
 * leve/HEV "Pro"). Câmbio mudou de dupla embreagem (DCT, até ~2022) para
 * CVT com simulação de 9 marchas nas versões mais recentes. #49 no ranking
 * de vendas 2025 no Brasil (13.671 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:caoachery-tiggo5x
 *
 * Fontes: autoo.com.br, gruposentinela.com.br, vrum.com.br,
 *         mobiauto.com.br, carroclub.com.br, virgola.com.br,
 *         mercadoveiculos.com
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
    title: 'Câmbio mudou de DCT para CVT: confirme qual equipa sua unidade',
    body: 'Até cerca de 2022, o Tiggo 5X usava câmbio de dupla embreagem (DCT); as versões mais recentes usam CVT com simulação de 9 marchas, mecânica bem diferente. Confirme qual câmbio equipa sua unidade antes de orçar revisão — histórico de confiabilidade e cuidados de manutenção são distintos entre os dois.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio DCT (unidades até ~2022): evite ficar parado engatado com o pé no freio',
    body: 'Se sua unidade tem o câmbio de dupla embreagem mais antigo, evite manter o carro parado por longos períodos engatado em D com o pé no freio — prefira Neutro/Park em paradas longas. Esse hábito reduz o desgaste do conjunto de embreagens, ponto mais sensível desse câmbio.',
  },
  {
    severity: 'WARN',
    title: 'Consumo pode ficar bem abaixo do anunciado — verifique antes de suspeitar de defeito',
    body: 'Há relatos de consumo real bem abaixo do informado na ficha técnica, especialmente em uso urbano. Antes de suspeitar de defeito no motor, confirme a calibragem correta dos pneus, evite excesso de acelerações bruscas e verifique se está usando o combustível recomendado — esses fatores têm grande impacto no consumo real desse motor turbo.',
  },
  {
    severity: 'OK',
    title: 'Versão híbrida leve (HEV): não espere autonomia elétrica como em um PHEV',
    body: 'A versão híbrida do Tiggo 5X é um sistema leve (HEV/mild-hybrid) focado em economia e resposta do motor, não um plug-in com autonomia elétrica relevante. Não espere rodar em modo 100% elétrico por trechos longos — o ganho é principalmente na economia de combustível em uso urbano.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall oficial do motor 1.5 Turbo: desgaste dos balancins pode parar o motor',
    body: 'A Caoa Chery fez recall oficial de veículos com motor 1.5 Turbo Flex Fuel (equipa o Tiggo 5X, além de Arrizo 5 e Tiggo 7) por desgaste excessivo dos balancins do motor — os sintomas vão de ruído anormal com queda progressiva de torque até a parada repentina do motor em casos extremos. Consulte a concessionária com o chassi do seu carro para confirmar se sua unidade está na faixa afetada e, se estiver, agende o reparo do recall — não é algo para adiar.',
  },
  {
    severity: 'DANGER',
    title: 'Versão híbrida: relato de pane elétrica/falha no sistema híbrido em movimento',
    body: 'Há relato documentado de uma proprietária de Tiggo 5X híbrido 2023 que, dirigindo a cerca de 60 km/h, teve múltiplas luzes acendendo no painel, mensagem de falha no sistema híbrido, o ar-condicionado parando de funcionar e o pisca-alerta deixando de acionar — o carro chegou a desligar em movimento. Se sua unidade híbrida apresentar qualquer combinação desses sintomas, pare em local seguro assim que possível e acione a concessionária imediatamente; não continue rodando normalmente.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio de dupla embreagem: trepidação na saída e nas reduções',
    body: 'O problema mais recorrente relatado por proprietários é o câmbio (nas unidades com DCT) apresentando trepidação ao sair do zero e ao reduzir a velocidade, em alguns casos pouco tempo após a compra. Documente qualquer trepidação anormal desde o início e acione a garantia cedo — a Chery substituiu esse câmbio por CVT nas versões mais recentes justamente por esse histórico.',
  },
  {
    severity: 'WARN',
    title: 'Ruído e desgaste prematuro no sistema de frenagem',
    body: 'Há relatos de ruído e desgaste acima do esperado no sistema de freios, com alguns proprietários relatando dificuldade em encontrar resposta adequada do pedal em situações de frenagem mais brusca. Inspecione pastilhas e discos com atenção redobrada nas revisões e não ignore ruídos de frenagem, mesmo que pareçam pequenos.',
  },
  {
    severity: 'WARN',
    title: 'Central multimídia trava e perde conexão com frequência',
    body: 'Queixa recorrente entre proprietários é a central multimídia travando, perdendo conexão com o celular ou apresentando instabilidade geral. Mantenha o software da central sempre atualizado na concessionária — parte dessas instabilidades é corrigida por atualização, sem necessidade de troca de peça.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tiggo 5X (Caoa Chery + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor 1.5 turbo + filtro de óleo. | 10.000 km — Inspeção de freios (atenção a ruído/desgaste), suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000 km — Óleo do câmbio (DCT ou CVT conforme sua versão) — não é vitalício, antecipe se notar trepidação ou tranco. | Versão híbrida — Se notar qualquer luz de falha no sistema híbrido, parar em local seguro e acionar a concessionária imediatamente.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Tiggo 5X',
    yearFrom: null,
    yearTo: null,
    tireSize: '215/60 R17 · 225/55 R18',
    frontPsi: 29,
    rearPsi: 29,
    frontPsiLoad: 33,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Pressão sobe bastante com o carro em carga máxima (até 36 PSI). Confirme sempre o valor exato do seu aro/versão na etiqueta da coluna da porta e recalibre semanalmente.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Tiggo 5X', yearFrom: null, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.5 turbo flex.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Tiggo 5X', yearFrom: null, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Tiggo 5X', yearFrom: null, yearTo: null, component: 'Sistema de freios — inspeção detalhada', intervalKm: 10000, intervalMonths: null, notes: 'Histórico de ruído e desgaste prematuro relatado por proprietários.', priority: 'HIGH', order: 2 },
  { modelName: 'Tiggo 5X', yearFrom: null, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Tiggo 5X', yearFrom: null, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Tiggo 5X', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Tiggo 5X', yearFrom: null, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Caoa Chery.', priority: 'HIGH', order: 6 },
  { modelName: 'Tiggo 5X', yearFrom: null, yearTo: null, component: 'Óleo do câmbio (DCT ou CVT)', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar trepidação ou tranco nas trocas.', priority: 'HIGH', order: 7 },
  { modelName: 'Tiggo 5X', yearFrom: null, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Tiggo 5X',
    yearFrom: null,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Caoa Chery Tiggo 5X...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Caoa Chery', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Caoa Chery', vehicleTypeId: carroType.id },
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

  console.log('✅ Caoa Chery Tiggo 5X concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
