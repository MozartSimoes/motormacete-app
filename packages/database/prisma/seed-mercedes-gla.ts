/**
 * Seed Mercedes-Benz GLA — macetes, problemas, manutenção e calibragem
 * 1ª geração (X156) vendida no Brasil de 2014 a 2020/2021 — inicialmente
 * importada, com produção nacional em Iracemápolis (SP) a partir de
 * 2016 (mesma fábrica do Classe C). Motor 1.6 turbo (156cv) ou 2.0 turbo
 * (211cv, GLA 250) e câmbio automatizado de dupla embreagem 7G-DCT;
 * topo de linha GLA 45 AMG com 2.0 turbo de altíssima potência e tração
 * 4MATIC. A 2ª geração (H247) chegou em 2021, agora um SUV "de verdade"
 * (a 1ª geração era um hatch alto sobre plataforma de A-Classe), com
 * motor 1.3 turbo (co-desenvolvido com a aliança Renault-Nissan) e
 * versões híbridas leves (EQ Boost), além de GLA 35/45 AMG mais potentes.
 * Nenhum recall específico do GLA no Brasil foi localizado nas fontes
 * consultadas.
 * Execute: pnpm --filter @motormacete/database db:seed:mercedes-gla
 *
 * Fontes: imprensa.mercedes-benz.com.br, flatout.com.br,
 *         comprecar.com.br, autoo.com.br, icarros.com.br,
 *         en.wikipedia.org (M270/M274 engine), motorreviewer.com,
 *         furiamotor.com, thelemonfirm.com, auto-doc.pt,
 *         portalmercedes.com, stockes.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 2014-2020 (1ª geração X156 — motor M270/M274, câmbio 7G-DCT) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Corrente de distribuição do M270/M274 tem vida útil menor que o esperado — fique atento a ruído na partida',
    body: 'A corrente de distribuição desses motores tende a desgastar mais rápido que o normal, na faixa de 120.000-140.000 km, acelerada pelo esticador. Ruído metálico ao dar partida (principalmente a frio) é sinal de alerta — não ignore, a falha completa da corrente pode causar dano grave ao motor.',
  },
  {
    severity: 'OK',
    title: 'Atuadores do comando de válvulas ficam barulhentos a frio depois de 100.000-115.000 km — peça atualizada dura mais',
    body: 'Os atuadores (solenoides) do comando de válvulas variável desses motores costumam ficar barulhentos a frio depois de 100-115 mil km, sinal de desgaste interno. A partir de 2014 a Mercedes passou a usar uma versão atualizada da peça (código A2700501147) com vida útil maior — ao trocar, confirme se a oficina está usando essa versão.',
  },
  {
    severity: 'OK',
    title: 'Câmbio 7G-DCT: adaptação via STAR Diagnosis a cada 40.000 km evita trancos',
    body: 'O câmbio automatizado de dupla embreagem 7G-DCT precisa de uma "adaptação" eletrônica periódica feita pelo equipamento de diagnóstico oficial da Mercedes (STAR) — sem isso, trancos e atrasos na troca de marcha (principalmente da 2ª para 3ª a frio) tendem a aparecer a partir de 60.000-100.000 km. Peça essa adaptação em toda revisão, mesmo sem sintoma ainda.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Disco de embreagem do 7G-DCT gasto é causa comum de tranco — verifique a espessura antes de trocar peça maior',
    body: 'Análises técnicas apontam disco de embreagem desgastado (espessura abaixo de 1,8mm) como causa em boa parte dos casos de tranco/atraso na troca de marcha do 7G-DCT. Antes de assumir reparo maior no câmbio, peça a medição da espessura do disco — pode ser um reparo bem mais barato.',
  },
  {
    severity: 'WARN',
    title: 'Trinca de pistão documentada em alguns exemplares do motor M274 (2015-2016)',
    body: 'Há casos documentados internacionalmente de trinca e quebra de pistão em unidades do motor 2.0 turbo M274 fabricadas em 2015-2016. Se sua unidade é desse período, fique atento a ruído de motor anormal ou perda de potência repentina e não adie o diagnóstico.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma GLA 2014-2020 (1.6 turbo M270 ou 2.0 turbo M274, 7G-DCT)',
    body: '10.000-15.000 km — Troca de óleo do motor + filtro, sintético de qualidade. | 40.000 km — Adaptação eletrônica do câmbio 7G-DCT via STAR Diagnosis. | 60.000 km — Óleo do câmbio 7G-DCT, somente fluido DCTF especificado. | Sempre — atenção a ruído metálico na partida (corrente de distribuição) e ruído a frio (atuadores do comando). | 40.000 km — Fluido de freio e filtro de ar/cabine.',
  },
]

// ---------- 2021-atual (2ª geração H247 — motor 1.3 turbo, híbrido leve, AMG 35/45) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1.3 turbo é co-desenvolvido com a aliança Renault-Nissan — peça de injeção pode ter equivalência cruzada',
    body: 'O motor 1.3 turbo (GLA 200) dessa geração nasceu de uma parceria de desenvolvimento entre Mercedes-Benz e a aliança Renault-Nissan. Peça de sistema de injeção e alguns componentes auxiliares podem ter equivalência com motores turbo 1.3 da Renault/Nissan da mesma época — vale pesquisar essa referência cruzada ao orçar peça, embora a calibração e alguns componentes específicos sejam exclusivos da Mercedes.',
  },
  {
    severity: 'OK',
    title: 'Versões híbridas leves (EQ Boost) têm bateria de 48V — não confunda com manutenção de híbrido convencional',
    body: 'As versões com sistema híbrido leve (EQ Boost) usam uma bateria auxiliar de 48V para auxiliar o motor a combustão, diferente de um híbrido convencional com propulsão elétrica independente. A manutenção da bateria de 48V e do sistema de recuperação de energia é específica — consulte o manual e leve a revisão em concessionária ou oficina com equipamento certificado para esse sistema.',
  },
]

const PROBLEMAS_G2: TipInput[] = []

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma GLA 2021+ (1.3 turbo, híbrido leve EQ Boost ou AMG 35/45)',
    body: '15.000 km — Troca de óleo do motor + filtro, sintético de qualidade. | 40.000 km — Adaptação eletrônica do câmbio via diagnóstico oficial da Mercedes. | 60.000 km — Óleo do câmbio, fluido especificado conforme versão. | 40.000 km — Fluido de freio e filtro de ar/cabine. | Conforme manual — verificação do sistema de 48V nas versões híbridas leves.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'GLA', yearFrom: 2014, yearTo: 2020, tireSize: '215/60 R17 (GLA 200) ou 235/50 R19 (GLA 250/45 AMG)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual — versões AMG usam aro maior e pressão diferente.' },
  { modelName: 'GLA', yearFrom: 2021, yearTo: null, tireSize: '215/65 R17 (GLA 200) ou 235/45 R20 (GLA 35/45 AMG)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — versões AMG usam aro maior e pressão diferente.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'GLA', yearFrom: 2014, yearTo: 2020, component: 'Óleo do motor + filtro', intervalKm: 12500, intervalMonths: 12, notes: 'Motor 1.6 ou 2.0 turbo (M270/M274).', priority: 'CRITICAL', order: 0 },
  { modelName: 'GLA', yearFrom: 2014, yearTo: 2020, component: 'Adaptação eletrônica do câmbio 7G-DCT (STAR Diagnosis)', intervalKm: 40000, intervalMonths: 24, notes: 'Reduz trancos e atrasos na troca de marcha.', priority: 'HIGH', order: 1 },
  { modelName: 'GLA', yearFrom: 2014, yearTo: 2020, component: 'Óleo do câmbio 7G-DCT (fluido DCTF)', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'GLA', yearFrom: 2014, yearTo: 2020, component: 'Fluido de freio e filtro de ar/cabine', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'GLA', yearFrom: 2021, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 15000, intervalMonths: 12, notes: 'Motor 1.3 turbo ou AMG 2.0 turbo.', priority: 'CRITICAL', order: 4 },
  { modelName: 'GLA', yearFrom: 2021, yearTo: null, component: 'Adaptação eletrônica do câmbio (diagnóstico oficial)', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'GLA', yearFrom: 2021, yearTo: null, component: 'Óleo do câmbio', intervalKm: 60000, intervalMonths: 48, notes: 'Fluido especificado conforme versão.', priority: 'HIGH', order: 6 },
  { modelName: 'GLA', yearFrom: 2021, yearTo: null, component: 'Verificação do sistema híbrido de 48V (versões EQ Boost)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'GLA', yearFrom: 2021, yearTo: null, component: 'Fluido de freio e filtro de ar/cabine', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'GLA', yearFrom: 2014, yearTo: 2020, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'GLA', yearFrom: 2021, yearTo: null, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
]

async function main() {
  console.log('🚗 Seed Mercedes-Benz GLA...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Mercedes-Benz', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Mercedes-Benz', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'GLA', brandId: brand.id } },
    update: {}, create: { name: 'GLA', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'GLA' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'GLA' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'GLA' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Mercedes-Benz GLA concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
