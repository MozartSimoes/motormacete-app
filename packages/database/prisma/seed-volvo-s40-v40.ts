/**
 * Seed Volvo S40/V40 — macetes, problemas, manutenção e calibragem
 * ATENÇÃO ao nome repetido: existem gerações mecanicamente NÃO
 * relacionadas usando os mesmos nomes.
 * - S40 geração 1 (1996-2004) e V40 geração 1 (1996-2004, perua/hatch
 *   irmã do S40 gen1): plataforma FWD desenvolvida com a Mitsubishi
 *   (irmã do Carisma), motor 1.8/2.0/2.4, produzida na NedCar (Holanda).
 * - S40 geração 2 (2004-2012): plataforma P1, irmã do V50/C30, motor
 *   1.6/1.8/2.0/2.4/T5, também com opções diesel.
 * - V40 geração 2 (2012-2019): HATCH totalmente novo, plataforma
 *   compartilhada com XC40/S60 modernos — reaproveita só o nome "V40",
 *   motor 1.6/2.0 turbo (T-3/T-4/T-5). É outro carro, não confunda peça
 *   ou macete entre as gerações.
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-s40-v40
 *
 * Fontes: problemaserecalls.com, auto-doc.pt, motorguia.net,
 *         reclameaqui.com.br, carroclub.com.br, opinautos.com.br
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

// ─── Geração 1 (1996-2004) — S40 sedan / V40 perua, irmãs do Mitsubishi Carisma ─

const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Plataforma irmã do Mitsubishi Carisma: procure peça compartilhada',
    body: 'Essa geração de S40/V40 foi desenvolvida em parceria com a Mitsubishi e é mecanicamente aparentada do Carisma da mesma época. Ao procurar peça de motor, elétrica ou suspensão que não conste como "para Volvo" no cadastro da loja, vale procurar também "para Mitsubishi Carisma" — amplia bastante as opções em desmanche e autopeças.',
  },
  {
    severity: 'OK',
    title: 'Verifique o nível de óleo a cada 1.000 km em uso mais puxado',
    body: 'É recomendação recorrente entre donos dessa geração verificar o nível de óleo do motor a cada 1.000 km ou a cada abastecimento em uso mais intenso — motor dessa idade tende a consumir mais óleo do que carro moderno, então não espere só o intervalo de troca programado para checar o nível.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Conversor catalítico, vazamento de óleo e sensor MAF entre as queixas mais comuns',
    body: 'Nessa geração, problema no conversor catalítico, vazamento de óleo do motor e falha no sensor MAF (medidor de fluxo de ar) aparecem como queixas recorrentes de proprietários. Sintoma de MAF com defeito costuma incluir marcha lenta instável e perda de potência — vale considerar esse sensor antes de suspeitar de problema mais caro na injeção.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de ar-condicionado: falha de compressor entre 40-80 mil km',
    body: 'O sistema de ar-condicionado tem ponto fraco conhecido nessa faixa de quilometragem, com falha de compressor e vazamento nas linhas de refrigerante. Se notar perda de eficiência do ar gradual, não espere parar de gelar de vez — geralmente é mais barato resolver no início.',
  },
  {
    severity: 'WARN',
    title: 'Teto solar (versões equipadas) com vazamento',
    body: 'Vazamento pelo teto solar é queixa reportada nessa geração — se notar carpete ou forro do teto úmido sem explicação, cheque as borrachas de vedação e o dreno do teto solar antes de suspeitar de outro ponto de infiltração.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma S40/V40 geração 1 (1996-2004, motor 1.8/2.0/2.4)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo (verifique nível a cada 1.000 km em uso intenso). | 10.000 km — Inspeção de freios, embreagem e níveis de fluido. | 20.000 km — Filtro de ar. | 20.000-30.000 km — Velas de ignição. | 40.000-80.000 km — Inspeção do sistema de ar-condicionado (compressor e linhas de refrigerante). | 60.000 km — Correia dentada + bomba d\'água. | Sempre — verifique vazamento pelo teto solar (versões equipadas) e sensor MAF em caso de marcha lenta instável.',
  },
]

// ─── Geração 2 do S40 (2004-2012) — plataforma P1, irmã do V50/C30 ────────

const MACETES_S40_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Plataforma P1: peça compartilhada com V50 e C30',
    body: 'O S40 dessa geração usa a plataforma P1, a mesma do V50 (perua) e do C30 (hatch) — motor, suspensão e boa parte da elétrica são intercambiáveis entre os três. Ao procurar peça, pesquise também "para Volvo V50" e "para Volvo C30" além de "S40", amplia bastante a busca.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático Powershift: troque o óleo, não é vitalício',
    body: 'Nas versões com câmbio automático dessa plataforma, o óleo da transmissão não é vitalício apesar do que muita gente pensa — trocar periodicamente evita trancos e falha de engate prematura. Antecipe a troca se notar qualquer irregularidade na troca de marchas.',
  },
]

const PROBLEMAS_S40_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Falha na transmissão automática costuma aparecer entre 100-150 mil km',
    body: 'Mudanças de marcha irregulares, atraso no engate e, em casos mais avançados, falha total da transmissão automática são queixas comuns nessa faixa de quilometragem. Óleo de transmissão de qualidade e trocado no prazo certo é o fator que mais influencia se o problema vai aparecer cedo ou tarde.',
  },
  {
    severity: 'WARN',
    title: 'Direção hidráulica: vazamento e bomba desgastada',
    body: 'Vazamento de fluido de direção hidráulica, muitas vezes ligado a bomba no fim de vida, deixa o volante mais pesado de virar. Verifique o nível do reservatório periodicamente e não ignore ruído de "chiado" ao virar o volante parado.',
  },
]

const MANUTENCAO_S40_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma S40 geração 2 (2004-2012, plataforma P1)',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão, direção hidráulica e níveis de fluido. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Óleo da transmissão automática (versões AT) — não é vitalício. | 60.000 km — Fluido de arrefecimento.',
  },
]

// ─── Geração 2 do V40 (2012-2019) — hatch novo, plataforma diferente ──────

const MACETES_V40_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Atenção: esse V40 NÃO tem nenhuma relação mecânica com a perua de 1996-2004',
    body: 'O nome "V40" voltou em 2012 num hatch totalmente novo, sobre plataforma compartilhada com XC40/S60 modernos — motor, câmbio e praticamente toda a peça são diferentes da perua V40 de 1996-2004. Ao pesquisar peça ou macete, confirme sempre o ano do seu carro: aplicar dica de um V40 no outro pode levar você a comprar peça errada.',
  },
  {
    severity: 'OK',
    title: 'Suspensão europeia: revise a calibragem se sentir o carro "duro" nas ruas brasileiras',
    body: 'A suspensão desse V40 foi ajustada para o padrão europeu, mais firme que muito carro nacional equivalente — parte das reclamações de "carro duro" ou desgaste de pneu mais rápido em pista ruim tem relação com isso. Mantenha a calibragem exata da etiqueta e evite rodar com pneu murcho, que agrava bastante o desconforto em buraco e lombada.',
  },
]

const PROBLEMAS_V40_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor 1.8/T-3 turbo: turbina, velas e arrefecimento entre 70-110 mil km',
    body: 'No motor turbo dessa geração, falhas relacionadas a turbocompressor, velas de ignição e sistema de arrefecimento tendem a aparecer entre 70.000 e 110.000 km, podendo causar perda de potência significativa e funcionamento irregular. Não adie manutenção nesses itens quando notar qualquer perda de desempenho.',
  },
  {
    severity: 'WARN',
    title: 'T-4: bomba de combustível de alta pressão pode falhar entre 100-140 mil km',
    body: 'Nas versões com injeção direta (T-4), a bomba de combustível de alta pressão é um ponto de falha conhecido nessa faixa de quilometragem. Sintoma costuma ser perda de potência ou dificuldade de partida — leve para diagnóstico assim que notar.',
  },
  {
    severity: 'WARN',
    title: 'Câmera de ré e central multimídia com falhas após atualização',
    body: 'Falha ou perda total da câmera de ré entre 70.000-100.000 km e problemas na tela/central multimídia (não responde ou não liga, principalmente após atualização de software) são queixas relatadas por proprietários. Não são itens de segurança crítica, mas valem inspeção se notar mau funcionamento.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedores dianteiros com vazamento a partir de 60-80 mil km',
    body: 'Vazamento e sinais de desgaste nos amortecedores dianteiros aparecem com relativa frequência nessa faixa de quilometragem. Ruído seco em buraco/lombada e carro "balançando" mais que o normal são os primeiros sinais.',
  },
]

const MANUTENCAO_V40_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma V40 geração 2 (2012-2019, motor turbo 1.6/2.0 T-3/T-4/T-5)',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor turbo + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão (atenção aos amortecedores dianteiros) e níveis de fluido. | 20.000-30.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 60.000-80.000 km — Inspeção do turbo, velas e sistema de arrefecimento. | 100.000-140.000 km — Bomba de combustível de alta pressão (versões T-4/injeção direta) — fique atento a perda de potência. | Sempre — mantenha a calibragem exata da etiqueta, a suspensão europeia é mais sensível a pneu murcho em pista ruim.',
  },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'S40', yearFrom: 1996, yearTo: 2004, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'S40', yearFrom: 2004, yearTo: 2012, MACETES: MACETES_S40_G2, PROBLEMAS: PROBLEMAS_S40_G2, MANUTENCAO: MANUTENCAO_S40_G2 },
  { modelName: 'V40', yearFrom: 1996, yearTo: 2004, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'V40', yearFrom: 2012, yearTo: 2019, MACETES: MACETES_V40_G2, PROBLEMAS: PROBLEMAS_V40_G2, MANUTENCAO: MANUTENCAO_V40_G2 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'S40',
    yearFrom: 1996,
    yearTo: 2004,
    tireSize: '185/65 R15 · 195/60 R15',
    frontPsi: 28,
    rearPsi: 28,
    frontPsiLoad: 30,
    rearPsiLoad: 32,
    sparePsi: 60,
    notes: 'Valor de referência genérico — confirme na etiqueta original da coluna da porta do motorista ou manual do exemplar específico.',
  },
  {
    modelName: 'S40',
    yearFrom: 2004,
    yearTo: 2012,
    tireSize: '195/60 R15 · 205/55 R16 · 225/45 R17 (T5)',
    frontPsi: 30,
    rearPsi: 30,
    frontPsiLoad: 32,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Confirme na etiqueta original da coluna da porta do motorista ou manual do exemplar específico.',
  },
  {
    modelName: 'V40',
    yearFrom: 1996,
    yearTo: 2004,
    tireSize: '185/65 R15 · 195/60 R15',
    frontPsi: 28,
    rearPsi: 30,
    frontPsiLoad: 30,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Reforce a traseira com porta-malas carregado (versão perua). Confirme na etiqueta original da coluna da porta do motorista.',
  },
  {
    modelName: 'V40',
    yearFrom: 2012,
    yearTo: 2019,
    tireSize: '205/55 R16 · 225/45 R17 · 225/40 R18 (R-Design/T5)',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'A etiqueta oficial fica na coluna da porta do motorista. Mantenha a calibragem exata — a suspensão dessa geração é mais sensível a pneu murcho em pista ruim.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'S40', yearFrom: 1996, yearTo: 2004, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Verifique nível a cada 1.000 km em uso intenso.', priority: 'HIGH', order: 0 },
  { modelName: 'S40', yearFrom: 1996, yearTo: 2004, component: 'Correia dentada + bomba d\'água', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'S40', yearFrom: 1996, yearTo: 2004, component: 'Sistema de ar-condicionado — inspeção do compressor', intervalKm: 60000, intervalMonths: null, notes: 'Ponto fraco conhecido entre 40-80 mil km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'S40', yearFrom: 2004, yearTo: 2012, component: 'Óleo do motor + filtro', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'S40', yearFrom: 2004, yearTo: 2012, component: 'Óleo da transmissão automática (versões AT)', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício, mesmo sem apresentar trancos.', priority: 'HIGH', order: 4 },
  { modelName: 'S40', yearFrom: 2004, yearTo: 2012, component: 'Fluido de direção hidráulica', intervalKm: null, intervalMonths: 12, notes: 'Verifique nível e vazamento nas mangueiras/bomba.', priority: 'MEDIUM', order: 5 },
  { modelName: 'V40', yearFrom: 1996, yearTo: 2004, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Verifique nível a cada 1.000 km em uso intenso.', priority: 'HIGH', order: 6 },
  { modelName: 'V40', yearFrom: 1996, yearTo: 2004, component: 'Correia dentada + bomba d\'água', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'V40', yearFrom: 1996, yearTo: 2004, component: 'Inspeção de vazamento pelo teto solar (versões equipadas)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'V40', yearFrom: 2012, yearTo: 2019, component: 'Óleo do motor turbo + filtro', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 9 },
  { modelName: 'V40', yearFrom: 2012, yearTo: 2019, component: 'Inspeção do turbo, velas e arrefecimento', intervalKm: 70000, intervalMonths: null, notes: 'Ponto de falha conhecido entre 70-110 mil km.', priority: 'HIGH', order: 10 },
  { modelName: 'V40', yearFrom: 2012, yearTo: 2019, component: 'Bomba de combustível de alta pressão (versões T-4/injeção direta)', intervalKm: 100000, intervalMonths: null, notes: 'Fique atento a perda de potência ou dificuldade de partida.', priority: 'MEDIUM', order: 11 },
  { modelName: 'V40', yearFrom: 2012, yearTo: 2019, component: 'Amortecedores dianteiros — inspeção', intervalKm: 60000, intervalMonths: null, notes: 'Vazamento e desgaste comuns a partir de 60-80 mil km.', priority: 'MEDIUM', order: 12 },
]

async function main() {
  console.log('🚗 Seed Volvo S40/V40...')

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

  console.log('✅ Volvo S40/V40 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
