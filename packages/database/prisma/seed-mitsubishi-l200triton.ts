/**
 * Seed Mitsubishi L200 Triton (geração antiga, 2007-2023) — macetes,
 * problemas, manutenção e calibragem. Cobre os motores 3.2 diesel
 * (common rail, com correia dentada), 2.4 diesel MIVEC (mais recente,
 * common rail com pós-tratamento DPF) e a versão flex 2.4/3.5 V6 (HLS/
 * Outdoor/HPE Flex). Escopado com yearTo:2023 para não colidir com o
 * conteúdo da nova Triton (2024+, seed-mitsubishi-triton.ts) — ambas
 * casam pela palavra "Triton" no nome FIPE, mas são mecanicamente
 * diferentes. #66 no ranking de vendas 2025 no Brasil (4.880 un.,
 * unidades usadas/remanescentes ainda em giro no mercado).
 * Execute: pnpm --filter @motormacete/database db:seed:mitsubishi-l200triton
 *
 * Fontes: oficinabrasil.com.br, mecanicaoffroad.com.br,
 *         alvaromatiassa.blogspot.com, omecanico.com.br,
 *         reclameaqui.com.br, 4x4brasil.com.br
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
    title: 'Motor robusto, mas exige diesel limpo e manutenção rigorosa',
    body: 'A maioria dos casos de "motor fundido" na L200 Triton não é defeito de projeto — é falta de manutenção preventiva. O diesel brasileiro forma borra mesmo sem sintomas aparentes. Com troca de óleo em dia, diesel de posto confiável e controle da temperatura do motor, esses motores passam fácil dos 500.000 km.',
  },
  {
    severity: 'OK',
    title: 'Confirme qual motor equipa sua unidade antes de comprar peça',
    body: 'A L200 Triton teve três famílias de motor ao longo dos anos: 3.2 diesel com correia dentada (versões GL/GLS/GLX/HPE/Savana/KTM/XB, até meados dos anos 2010), 2.4 MIVEC diesel mais recente (versões Sport) e 2.4/3.5 V6 flex (HLS/Outdoor/HPE Flex). São motores bem diferentes — confirme sempre qual equipa sua unidade antes de orçar peça ou revisão.',
  },
  {
    severity: 'WARN',
    title: 'Motor 2.4 MIVEC diesel: evite rodar só em trajetos curtos',
    body: 'O motor 2.4 diesel mais recente usa pós-injeção de combustível para regenerar o filtro de partículas (DPF) — em uso predominante de trajetos curtos, parte desse diesel pode acabar diluindo o óleo do motor em vez de queimar completamente. Rode periodicamente em rodovia por trechos mais longos para permitir a regeneração completa e reduzir esse risco.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor 2.4 MIVEC diesel: diesel diluindo o óleo do motor',
    body: 'Há casos documentados de diesel se misturando ao óleo do motor no 2.4 MIVEC, ligado à pós-injeção usada para regeneração do filtro de partículas (DPF) — o óleo diluído perde capacidade de lubrificação e aumenta o risco de desgaste prematuro de mancais e bronzinas. Fique atento a nível de óleo subindo (em vez de descendo) entre trocas e a cheiro forte de diesel no óleo na hora da troca — ambos são sinais de alerta. Reduza trajetos curtos frequentes e antecipe a troca de óleo se notar esses sinais.',
  },
  {
    severity: 'WARN',
    title: 'Falhas de sensor (MAP e outros) causando perda de força e luz de injeção',
    body: 'Sintomas de tremor, perda de força e luz de injeção acesa com cheiro forte no escapamento geralmente estão ligados à leitura incorreta de sensores, especialmente o MAP (pressão do coletor de admissão) e os sensores da mistura ar/combustível. Antes de suspeitar de problema grave no motor, peça diagnóstico por scanner focado nesses sensores — na maioria dos casos é um reparo relativamente simples.',
  },
  {
    severity: 'WARN',
    title: 'Cruzeta do cardã com desgaste prematuro',
    body: 'Problema recorrente relatado é o desgaste precoce da cruzeta do cardã (junta universal do eixo de transmissão). Se notar vibração ou ruído de "batida" ritmado ao acelerar/desacelerar, especialmente em baixa velocidade, vale inspecionar a cruzeta antes de suspeitar de problema maior na transmissão.',
  },
  {
    severity: 'WARN',
    title: 'Luzes de alerta de ABS e 4x4 acesas, e oscilação no medidor de combustível',
    body: 'Proprietários relatam luzes de alerta de ABS e do sistema 4x4 acendendo sem causa aparente, além de oscilação no ponteiro/indicador de combustível. Em geral são falhas de sensor ou conector, não do sistema mecânico em si — vale diagnóstico por scanner antes de assumir que é um problema caro.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de combustível entopindo com mais frequência que o esperado',
    body: 'Há relatos de entopimento do filtro de combustível ocorrendo antes do intervalo recomendado, geralmente ligado à qualidade do diesel abastecido. Troque o filtro sempre que notar perda de força ou funcionamento irregular, mesmo antes do prazo padrão, e priorize diesel S10 de postos confiáveis.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma L200 Triton (geração antiga, Mitsubishi + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (5W30 sintético C2/C3 — confirme exigência EGR/DPF conforme motor) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de combustível diesel — antecipe se notar perda de força. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Correia dentada (motor 3.2 diesel — verifique se sua versão usa correia ou corrente). | 60.000 km — Fluido de arrefecimento. | 40.000 km — Cruzeta do cardã — inspeção preventiva pelo histórico de desgaste. | Motor 2.4 MIVEC — verificar nível/cheiro do óleo com atenção redobrada pelo risco de diluição por diesel.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Triton',
    yearFrom: null,
    yearTo: 2023,
    tireSize: '265/70 R16 (versões antigas) · 265/60 R18 (Sport, versões mais recentes)',
    frontPsi: 30,
    rearPsi: 30,
    frontPsiLoad: 33,
    rearPsiLoad: 44,
    sparePsi: 60,
    notes: 'Pressão traseira sobe bastante com carga na caçamba. Valores variam bastante entre gerações e versões — confirme sempre na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Triton', yearFrom: null, yearTo: 2023, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor (3.2 diesel, 2.4 MIVEC diesel ou 2.4/3.5 flex).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Triton', yearFrom: null, yearTo: 2023, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Triton', yearFrom: null, yearTo: 2023, component: 'Nível/cheiro do óleo (motor 2.4 MIVEC diesel)', intervalKm: 5000, intervalMonths: null, notes: 'Verificar sinal de diluição por diesel — risco de desgaste prematuro de mancais se não tratado.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Triton', yearFrom: null, yearTo: 2023, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Triton', yearFrom: null, yearTo: 2023, component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'Antecipe se notar perda de força — histórico de entopimento precoce relatado.', priority: 'HIGH', order: 4 },
  { modelName: 'Triton', yearFrom: null, yearTo: 2023, component: 'Cruzeta do cardã — inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Histórico de desgaste prematuro relatado por proprietários.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Triton', yearFrom: null, yearTo: 2023, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Triton', yearFrom: null, yearTo: 2023, component: 'Correia dentada (motor 3.2 diesel)', intervalKm: 60000, intervalMonths: 48, notes: 'Confirme no manual se sua versão usa correia ou corrente antes de agendar.', priority: 'HIGH', order: 7 },
  { modelName: 'Triton', yearFrom: null, yearTo: 2023, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Mitsubishi.', priority: 'HIGH', order: 8 },
  { modelName: 'Triton', yearFrom: null, yearTo: 2023, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce a pressão traseira quando rodar com carga na caçamba.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Triton',
    yearFrom: null,
    yearTo: 2023,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Mitsubishi L200 Triton (geração antiga)...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Mitsubishi', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Mitsubishi', vehicleTypeId: carroType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.deleteMany({ where: { modelName: block.modelName, yearTo: block.yearTo } })
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
    console.log(`  ✅ ${block.modelName} (até ${block.yearTo}): ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName, yearTo: tp.yearTo } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (até ${tp.yearTo})`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map((b) => b.modelName) }, yearTo: 2023 },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Mitsubishi L200 Triton (geração antiga) concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
