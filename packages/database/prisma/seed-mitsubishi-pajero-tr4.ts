/**
 * Seed Mitsubishi Pajero TR4 — macetes, problemas, manutenção e calibragem
 * SUV compacto de plataforma unibody (compartilhada com o ASX), bem
 * diferente mecanicamente do Pajero clássico/Full (chassi separado) e do
 * Pajero Sport (baseado na picape Triton). Motor 2.0 16V flex, tração 4x2
 * ou 4x4, câmbio manual ou automático. Vendido no Brasil ~2010-2019,
 * incluindo versão blindada de fábrica.
 * ATENÇÃO — colisão de nome: por causa da palavra "Pajero" compartilhada,
 * o arquivo do Pajero clássico pode aparecer também aqui — mecânica é
 * completamente diferente (motor, chassi, tração), desconsidere qualquer
 * menção a diesel/Super Select 4WD/turbina como não aplicável ao TR4.
 * Execute: pnpm --filter @motormacete/database db:seed:mitsubishi-pajero-tr4
 *
 * Fontes: oficinabrasil.com.br, reparacaoautomotiva.com.br,
 *         4x4brasil.com.br, vrum.com.br
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
    title: 'Motor 2.0 16V flex bem avaliado — confiabilidade é ponto forte do TR4',
    body: 'O motor 2.0 16V flex (140cv etanol/135cv gasolina) tem avaliação geralmente positiva de confiabilidade entre proprietários e oficinas — não é o ponto fraco do carro. Foque a atenção preventiva mais em câmbio, vedação e sistema de tração 4x4, que são os itens com mais queixa real.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio manual: não descanse a mão na alavanca',
    body: 'O desgaste da luva de engate do câmbio manual é ligado principalmente ao hábito de descansar a mão na alavanca de câmbio durante a condução — esse peso constante desgasta o mecanismo de engate prematuramente. Simples de evitar: mantenha a mão no volante quando não estiver trocando de marcha.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático: robusto, mas depende de troca de óleo em dia',
    body: 'O câmbio automático é considerado resistente, mas os defeitos que aparecem quase sempre vêm de falta de troca de óleo ou uso de lubrificante inadequado — nunca use fluido genérico "compatível", use sempre o especificado pela Mitsubishi para esse câmbio específico.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Solenoide do 4x4 pode superaquecer e engatar tração sozinho',
    body: 'Problema recorrente documentado: o solenoide que controla o engate do sistema 4x4 fica próximo do motor e pode superaquecer, reduzindo sua resistência elétrica a ponto de causar engate involuntário da tração integral. Se notar o 4x4 "entrando sozinho" sem você acionar, leve para diagnóstico — não é normal e pode ser justamente esse solenoide.',
  },
  {
    severity: 'WARN',
    title: 'Infiltração de água na cabine em exemplares mais antigos (borrachas de vedação)',
    body: 'Modelos mais antigos do TR4 têm queixa recorrente de infiltração de água na cabine causada por borrachas de vedação defeituosas nas portas/para-brisa. Se notar cheiro de mofo ou umidade no carpete depois de chuva forte, vale inspecionar as borrachas de vedação antes de suspeitar de problema elétrico.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão prematura do escapamento e vazamento em caixa de transferência/diferenciais',
    body: 'Queixas comuns incluem corrosão adiantada do sistema de escapamento e vazamento de óleo na caixa de transferência e diferenciais em exemplares mais rodados — inspecione visualmente por baixo do carro periodicamente, principalmente se roda em região litorânea (corrosão acelera perto do mar) ou faz uso off-road regular.',
  },
  {
    severity: 'OK',
    title: 'Manutenção Mitsubishi em geral é mais cara, mas o TR4 é uma exceção relativa',
    body: 'Peça e serviço de Mitsubishi costumam ser mais caros que a média do mercado — o TR4, por compartilhar peça com o ASX (modelo de maior volume de vendas), tem peça um pouco mais fácil de achar e mais barata que outros modelos Mitsubishi, mas ainda não é um carro "barato de manter".',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Pajero TR4 (2.0 16V flex)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, vedação de portas/para-brisa e vazamentos de diferencial/caixa de transferência. | 20.000 km — Filtro de ar e filtro de cabine. | 20.000 km — Inspeção/limpeza dos sensores do sistema de combustível flex. | 40.000 km — Fluido de freio. | 60.000-80.000 km — Fluido do câmbio automático (use sempre o especificado pela Mitsubishi). | Sempre — se o 4x4 engatar sozinho sem acionamento, verifique o solenoide de acionamento.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Pajero TR4', yearFrom: 2010, yearTo: 2019, tireSize: '225/65 R17 (referência) — varia conforme roda/versão', frontPsi: 30, rearPsi: 30, frontPsiLoad: 32, rearPsiLoad: 35, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Pajero TR4', yearFrom: 2010, yearTo: 2019, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Pajero TR4', yearFrom: 2010, yearTo: 2019, component: 'Inspeção de vedação de portas/para-brisa', intervalKm: null, intervalMonths: 12, notes: 'Infiltração de água em exemplares mais antigos.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Pajero TR4', yearFrom: 2010, yearTo: 2019, component: 'Inspeção do solenoide de acionamento do 4x4', intervalKm: null, intervalMonths: 12, notes: 'Engate involuntário do 4x4 é sinal de superaquecimento desse componente.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Pajero TR4', yearFrom: 2010, yearTo: 2019, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'Pajero TR4', yearFrom: 2010, yearTo: 2019, component: 'Fluido do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Use só o fluido especificado pela Mitsubishi.', priority: 'HIGH', order: 4 },
  { modelName: 'Pajero TR4', yearFrom: 2010, yearTo: 2019, component: 'Inspeção de corrosão do escapamento e vazamento de diferencial/caixa de transferência', intervalKm: null, intervalMonths: 12, notes: 'Atenção redobrada em região litorânea ou uso off-road frequente.', priority: 'MEDIUM', order: 5 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Pajero TR4', yearFrom: 2010, yearTo: 2019, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Mitsubishi Pajero TR4...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Mitsubishi', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Mitsubishi', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Pajero TR4', brandId: brand.id } },
    update: {}, create: { name: 'Pajero TR4', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Pajero TR4' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Pajero TR4' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Pajero TR4' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Mitsubishi Pajero TR4 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
