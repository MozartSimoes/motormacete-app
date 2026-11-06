/**
 * Seed Volvo V50 — macetes, problemas, manutenção e calibragem de pneus
 * Perua compacta de tração dianteira (FWD), 2004-2012, plataforma P1 —
 * irmã de carroceria do S40 geração 2 e do C30, com quem compartilha
 * motor, suspensão e boa parte da elétrica. Motor 2.4 aspirado e T-5
 * 2.5 Turbo entre as opções mais lembradas, além de versões diesel
 * internacionais (D2-D5).
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-v50
 *
 * Fontes: auto-doc.pt (Volvo V50), swedespeed.com, mobycar.pt,
 *         motorguia.net, carrosluxuososa2z.com
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
    title: 'Plataforma P1 compartilhada com S40 e C30: amplie a busca por peça',
    body: 'A V50 usa a mesma plataforma P1 do S40 (geração 2004-2012) e do C30 — motor, suspensão e boa parte da elétrica são intercambiáveis entre os três. Ao procurar peça que não aparece cadastrada como "para V50", pesquise também "para Volvo S40" e "para Volvo C30" da mesma época, amplia bastante as opções em desmanche e loja de autopeças.',
  },
  {
    severity: 'OK',
    title: 'T5 2.5 Turbo: troque óleo em dia, é o que mais protege o turbo',
    body: 'Na versão T-5 (2.5 Turbo), a troca de óleo em dia é o fator que mais influencia a vida útil do turbo e da própria transmissão. Não estique o intervalo achando que "o carro ainda anda bem" — desgaste de turbo costuma aparecer de forma gradual (perda de potência, consumo de óleo) antes de qualquer pane mais séria.',
  },
  {
    severity: 'OK',
    title: 'Perua com porta-malas útil: reforce a pressão traseira com carga',
    body: 'Por ser perua, a V50 aceita bem mais carga no porta-malas que o hatch/sedan da mesma plataforma. Ajuste a pressão traseira dos pneus para o valor de carga máxima da etiqueta sempre que rodar com o porta-malas cheio, evita desgaste irregular e mantém a estabilidade em curva.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Transmissão automática: trocas irregulares entre 100-150 mil km',
    body: 'Nas versões com câmbio automático (2.0 diesel, 2.4 gasolina e T-5), mudanças de marcha irregulares, atraso no engate e, em casos avançados, falha total da transmissão são queixas comuns nessa faixa de quilometragem. A qualidade do óleo de transmissão e o cumprimento do intervalo de troca são os fatores que mais determinam se o problema aparece cedo ou tarde.',
  },
  {
    severity: 'WARN',
    title: 'Ar-condicionado: falha de compressor e condensador entre 50-70 mil km',
    body: 'Falha no compressor, condensador com vazamento e válvula de expansão com defeito são queixas recorrentes nessa faixa de quilometragem. Perda gradual de eficiência do ar é o primeiro sinal — resolver cedo custa bem menos que esperar o sistema parar de gelar de vez.',
  },
  {
    severity: 'WARN',
    title: 'Direção hidráulica: vazamento deixa o volante pesado',
    body: 'Vazamento de fluido de direção hidráulica, geralmente ligado a bomba desgastada, é queixa comum e deixa o volante mais pesado para virar, principalmente em manobra de baixa velocidade. Verifique o nível do reservatório periodicamente.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma V50 (2004-2012, motor 2.4/T-5 2.5 Turbo)',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor (mais crítico na versão T-5) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão, direção hidráulica e níveis de fluido. | 20.000-30.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 50.000-70.000 km — Inspeção do sistema de ar-condicionado (compressor e condensador). | 60.000 km — Óleo da transmissão automática (versões AT) — não é vitalício. | 60.000 km — Fluido de arrefecimento. | Sempre — reforce a pressão traseira dos pneus com o porta-malas carregado.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'V50',
    yearFrom: 2004,
    yearTo: 2012,
    tireSize: '195/65 R15 · 205/55 R16 · 225/40 R18 (T5/R-Design)',
    frontPsi: 30,
    rearPsi: 32,
    frontPsiLoad: 33,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Reforce a traseira com o porta-malas carregado. Confirme sempre na etiqueta original da coluna da porta do motorista ou manual do exemplar específico.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'V50', yearFrom: 2004, yearTo: 2012, component: 'Óleo do motor + filtro', intervalKm: 15000, intervalMonths: 12, notes: 'Mais crítico na versão T-5 — protege o turbo.', priority: 'CRITICAL', order: 0 },
  { modelName: 'V50', yearFrom: 2004, yearTo: 2012, component: 'Óleo da transmissão automática (versões AT)', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício, mesmo sem apresentar trancos.', priority: 'HIGH', order: 1 },
  { modelName: 'V50', yearFrom: 2004, yearTo: 2012, component: 'Sistema de ar-condicionado — inspeção do compressor', intervalKm: 60000, intervalMonths: null, notes: 'Ponto fraco conhecido entre 50-70 mil km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'V50', yearFrom: 2004, yearTo: 2012, component: 'Fluido de direção hidráulica', intervalKm: null, intervalMonths: 12, notes: 'Verifique nível e vazamento nas mangueiras/bomba.', priority: 'MEDIUM', order: 3 },
  { modelName: 'V50', yearFrom: 2004, yearTo: 2012, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'V50', yearFrom: 2004, yearTo: 2012, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 5 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'V50', yearFrom: 2004, yearTo: 2012, MACETES, PROBLEMAS, MANUTENCAO },
]

async function main() {
  console.log('🚗 Seed Volvo V50...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volvo', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volvo', vehicleTypeId: carroType.id },
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

  console.log('✅ Volvo V50 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
