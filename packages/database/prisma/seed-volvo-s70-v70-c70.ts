/**
 * Seed Volvo S70/V70/C70 — macetes, problemas, manutenção e calibragem
 * Três carrocerias sobre a mesma plataforma FWD que sucedeu o 850:
 * S70 (sedan, 1997-2000), V70 (perua, 1997-2000, incluindo a variante
 * aventureira "V70 Cross Country"/V70 XC) e C70 (cupê e conversível,
 * 1997-2005 na primeira geração — a segunda geração de C70 de 2006-2013
 * é outro carro, plataforma compartilhada com S40/V50/C30, tratada em
 * arquivo de seed separado do C30/V50 se necessário). Motor 5 cilindros
 * em linha 2.0/2.3/2.4/2.5, aspirado ou Turbo, versões GLT/T-5/R —
 * evolução direta do motor que estreou no 850.
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-s70-v70-c70
 *
 * Fontes: auto-doc.pt (Volvo V70, C70), matthewsvolvosite.com,
 *         forum.motorguia.net, problemaserecalls.com
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

// ─── Macetes/problemas/manutenção compartilhados pela família (mesmo motor) ─

const MACETES_COMUM: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 5 cilindros: peça compartilhada com o 850 e entre S70/V70/C70',
    body: 'O motor 5 cilindros dessa geração é evolução direto do que estreou no 850 — ao procurar peça de motor (bomba d\'água, sensores, kit de correia), pesquise também "para Volvo 850" e para as outras carrocerias da família (S70/V70/C70), já que muita coisa é intercambiável entre elas.',
  },
  {
    severity: 'WARN',
    title: 'Turbo T-5/R: troque óleo em dia e não desligue o motor quente sem esfriar',
    body: 'Nas versões turbinadas (T-5, R), consumo de óleo alto e fumaça azulada no escapamento a partir de 120.000-180.000 km são sintomas conhecidos de desgaste do turbo — as vedações do turbo já podem falhar a partir de 80.000 km sem manutenção adequada. Não atrase a troca de óleo e deixe o motor em marcha lenta um pouco antes de desligar após uso em estrada/velocidade alta.',
  },
  {
    severity: 'OK',
    title: 'Peça original cara: comunidade de entusiastas e importação são o caminho',
    body: 'Peça original Volvo dessa geração é cara e nem sempre disponível em revenda nacional. A comunidade de entusiastas Volvo (clubes e grupos online) é onde a maioria dos donos de longa data encontra peça de desmanche ou intermedia encomenda de importação — vale entrar nesses grupos antes de pagar preço de concessionária.',
  },
]

const PROBLEMAS_COMUM: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Turbo: perda de potência, consumo de óleo e fumaça azul entre 120-180 mil km',
    body: 'Nas versões turbo (T-5, R, GLT), perda de potência, aumento de consumo de óleo (até cerca de 1 litro a cada 1.000 km em casos avançados) e fumaça azulada no escapamento entre 120.000 e 180.000 km indicam desgaste do turbo, que costuma exigir reparo extenso. Não ignore esses sintomas — quanto mais tempo rodando assim, maior o risco de dano ao motor.',
  },
  {
    severity: 'WARN',
    title: 'Bobinas de ignição falhando já a partir de 60-80 mil km',
    body: 'Falha nas bobinas de ignição é queixa relativamente comum nessa faixa de quilometragem, causando falha de ignição e funcionamento irregular do motor. É item de troca relativamente simples — não é motivo para desconfiar de problema mais grave no motor.',
  },
  {
    severity: 'WARN',
    title: 'Coxins do motor desgastados após 120-150 mil km, mais nas versões turbo',
    body: 'Coxins de motor gastos causam trepidação e ruído fora do normal, principalmente nas versões T-5/R de maior potência que exigem mais dos coxins. É desgaste natural pela idade/uso — troque em par para não desbalancear o assentamento do motor.',
  },
]

const MANUTENCAO_COMUM: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma da família S70/V70/C70 (motor 5 cilindros 2.0-2.5)',
    body: '15.000 km/12 meses — Troca de óleo do motor de alta qualidade (intervalo mais curto prolonga bastante a vida do turbo e evita reparos caros). | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar e filtro de cabine. | 20.000-30.000 km — Velas de ignição. | 40.000 km — Fluido de freio. | 60.000-80.000 km — Bobinas de ignição, verifique se há falha de ignição. | 60.000 km — Correia dentada + tensor + bomba d\'água (troque em conjunto). | 120.000 km — Inspeção dos coxins do motor, principalmente em versões turbo.',
  },
]

// ─── Notas específicas por carroceria ──────────────────────────────────────

const MACETES_V70: TipInput[] = [
  ...MACETES_COMUM,
  {
    severity: 'OK',
    title: 'V70 Cross Country (V70 XC): mesma mecânica, suspensão elevada',
    body: 'A variante aventureira V70 Cross Country/V70 XC usa basicamente a mesma mecânica da V70 comum, com suspensão elevada e tração integral (AWD) em boa parte das versões — para efeito de manutenção e peça de motor, trate como V70 normal, só redobre atenção com o sistema de tração integral se o exemplar for AWD.',
  },
  {
    severity: 'OK',
    title: 'Perua com porta-malas grande: ajuste a pressão traseira com carga',
    body: 'Por ser perua, a V70 aguenta bem mais carga no porta-malas que o sedan S70. Ajuste a pressão traseira dos pneus para o valor de carga máxima da etiqueta sempre que for rodar com o porta-malas cheio — evita desgaste irregular e mantém a estabilidade.',
  },
]

const MACETES_C70: TipInput[] = [
  ...MACETES_COMUM,
  {
    severity: 'WARN',
    title: 'Atenção: existe uma segunda geração de C70 com mecânica totalmente diferente',
    body: 'O nome C70 voltou em 2006-2013 numa segunda geração que usa plataforma compartilhada com S40/V50/C30 (motor e mecânica diferentes desta primeira geração de 1997-2005). Ao procurar peça ou macete, confirme sempre o ano do seu C70 antes de aplicar qualquer dica — são carros mecanicamente não relacionados apesar do nome igual.',
  },
  {
    severity: 'OK',
    title: 'Capota do conversível: manutenção da lona evita vazamento e mofo',
    body: 'Na versão conversível, a lona/mecanismo de capota precisa de cuidado — lubrifique as articulações periodicamente e trate a lona com produto impermeabilizante adequado. Vazamento de água pela capota mal vedada é queixa recorrente em conversíveis dessa idade e pode danificar o carpete e a parte elétrica embaixo do banco.',
  },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'S70', yearFrom: 1997, yearTo: 2000, MACETES: MACETES_COMUM, PROBLEMAS: PROBLEMAS_COMUM, MANUTENCAO: MANUTENCAO_COMUM },
  { modelName: 'V70', yearFrom: 1997, yearTo: 2000, MACETES: MACETES_V70, PROBLEMAS: PROBLEMAS_COMUM, MANUTENCAO: MANUTENCAO_COMUM },
  { modelName: 'C70', yearFrom: 1997, yearTo: 2005, MACETES: MACETES_C70, PROBLEMAS: PROBLEMAS_COMUM, MANUTENCAO: MANUTENCAO_COMUM },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'S70',
    yearFrom: 1997,
    yearTo: 2000,
    tireSize: '195/65 R15 · 205/55 R16 (T-5/R)',
    frontPsi: 29,
    rearPsi: 29,
    frontPsiLoad: 32,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Valor de referência genérico — confirme na etiqueta original da coluna da porta do motorista ou manual do exemplar específico.',
  },
  {
    modelName: 'V70',
    yearFrom: 1997,
    yearTo: 2000,
    tireSize: '195/65 R15 · 205/55 R16 (T-5/R) · 215/65 R16 (Cross Country/XC)',
    frontPsi: 29,
    rearPsi: 30,
    frontPsiLoad: 32,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Reforce a pressão traseira com o porta-malas carregado. Confirme sempre na etiqueta original da coluna da porta do motorista.',
  },
  {
    modelName: 'C70',
    yearFrom: 1997,
    yearTo: 2005,
    tireSize: '205/55 R16 · 225/45 R17 (T-5/versões esportivas)',
    frontPsi: 29,
    rearPsi: 29,
    frontPsiLoad: 32,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Valor de referência genérico — confirme na etiqueta original da coluna da porta do motorista ou manual do exemplar específico.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'S70', yearFrom: 1997, yearTo: 2000, component: 'Óleo do motor de alta qualidade', intervalKm: 15000, intervalMonths: 12, notes: 'Intervalo curto prolonga a vida do turbo nas versões T-5/R.', priority: 'CRITICAL', order: 0 },
  { modelName: 'S70', yearFrom: 1997, yearTo: 2000, component: 'Correia dentada + tensor + bomba d\'água', intervalKm: 60000, intervalMonths: 48, notes: 'Troque em conjunto.', priority: 'HIGH', order: 1 },
  { modelName: 'S70', yearFrom: 1997, yearTo: 2000, component: 'Bobinas de ignição — inspeção', intervalKm: 70000, intervalMonths: null, notes: 'Causa comum de falha de ignição a partir de 60-80 mil km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'S70', yearFrom: 1997, yearTo: 2000, component: 'Inspeção do turbo (fumaça azul, consumo de óleo) — versões T-5/GLT', intervalKm: 100000, intervalMonths: null, notes: 'Risco maior entre 120-180 mil km.', priority: 'HIGH', order: 3 },
  { modelName: 'V70', yearFrom: 1997, yearTo: 2000, component: 'Óleo do motor de alta qualidade', intervalKm: 15000, intervalMonths: 12, notes: 'Intervalo curto prolonga a vida do turbo nas versões T-5/R.', priority: 'CRITICAL', order: 4 },
  { modelName: 'V70', yearFrom: 1997, yearTo: 2000, component: 'Correia dentada + tensor + bomba d\'água', intervalKm: 60000, intervalMonths: 48, notes: 'Troque em conjunto.', priority: 'HIGH', order: 5 },
  { modelName: 'V70', yearFrom: 1997, yearTo: 2000, component: 'Bobinas de ignição — inspeção', intervalKm: 70000, intervalMonths: null, notes: 'Causa comum de falha de ignição a partir de 60-80 mil km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'V70', yearFrom: 1997, yearTo: 2000, component: 'Sistema de tração integral (AWD) — inspeção (versões Cross Country/XC)', intervalKm: 40000, intervalMonths: 24, notes: 'Apenas versões equipadas com AWD.', priority: 'MEDIUM', order: 7 },
  { modelName: 'C70', yearFrom: 1997, yearTo: 2005, component: 'Óleo do motor de alta qualidade', intervalKm: 15000, intervalMonths: 12, notes: 'Intervalo curto prolonga a vida do turbo nas versões T-5.', priority: 'CRITICAL', order: 8 },
  { modelName: 'C70', yearFrom: 1997, yearTo: 2005, component: 'Correia dentada + tensor + bomba d\'água', intervalKm: 60000, intervalMonths: 48, notes: 'Troque em conjunto.', priority: 'HIGH', order: 9 },
  { modelName: 'C70', yearFrom: 1997, yearTo: 2005, component: 'Lona e mecanismo da capota (versão conversível)', intervalKm: null, intervalMonths: 12, notes: 'Lubrifique articulações e trate a lona contra vazamento e mofo.', priority: 'MEDIUM', order: 10 },
]

async function main() {
  console.log('🚗 Seed Volvo S70/V70/C70...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volvo', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volvo', vehicleTypeId: carroType.id },
  })

  const distinctModelNames = [...new Set(BLOCKS.map((b) => b.modelName))]
  for (const modelName of distinctModelNames) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: modelName, brandId: brand.id } },
      update: {},
      create: { name: modelName, brandId: brand.id },
    })
    await prisma.tip.deleteMany({ where: { modelName } })
  }

  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: order++,
      })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }

  const distinctTpModelNames = [...new Set(TIRE_PRESSURES.map((t) => t.modelName))]
  for (const modelName of distinctTpModelNames) {
    await prisma.tirePressure.deleteMany({ where: { modelName } })
  }
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: distinctModelNames } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volvo S70/V70/C70 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
