/**
 * Seed Chevrolet C-10 / C-20 / D-10 / D-20 / Veraneio — macetes, problemas,
 * manutenção e calibragem de pneus
 * Família de picapes e utilitário pesado da GM do Brasil (versão local das
 * picapes americanas C/K), produzida de 1964 a 1997. C-10/C-20 são as versões
 * a gasolina (ou álcool, badge A-10/A-20) com motor 6 cilindros em linha (série
 * "Brasil" 4.1/4.3, depois 4.1/250 pol³); D-10/D-20 são as versões a diesel,
 * com motor Perkins (4.236 turbo na maior parte da produção). A Veraneio é o
 * utilitário/SUV de 5 portas sobre o mesmo chassi C/D, disponível a gasolina
 * ou diesel turbo, muito usada em fazenda e zona rural até hoje. A Bonanza
 * (1989-1994, cerca de 4 mil unidades) é uma variante 2 portas derivada do
 * chassi encurtado da série 20 (C-20/D-20) — não tem arquivo próprio por ser
 * raridade de baixíssimo volume, mas compartilha mecânica com C-20/D-20.
 * Toda a família compartilha boa parte de suspensão, freio e componentes do
 * motor 6 cilindros entre si — peça de uma serve, com poucas variações, nas
 * outras.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-c10-d20-veraneio
 *
 * Fontes: pt.wikipedia.org (Chevrolet Série 10 / D-10, Chevrolet Bonanza),
 *         en.wikipedia.org (Chevrolet D-20), curbsideclassic.com,
 *         clubedavera.blogspot.com, 4x4brasil.com.br/forum,
 *         picapesgm.com.br/forum, calibragemdepneu.com.br
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

const MACETES_COMUM_GAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 6 cilindros em linha é extremamente robusto — peça ainda circula bem no mercado paralelo',
    body: 'O motor 6 em linha a gasolina/álcool (série "Brasil", 4.1/4.3) ficou em produção por décadas em picapes e na Veraneio — é um dos motores mais duráveis já vendidos no Brasil. Blocos, cabeçotes, virabrequim e a maior parte da peça de retífica ainda são fáceis de achar via desmanche, mercado paralelo e oficinas especializadas em picape GM antiga.',
  },
  {
    severity: 'OK',
    title: 'Suspensão e freio são compartilhados entre C-10, C-20, D-10, D-20 e Veraneio',
    body: 'Boa parte dos componentes de suspensão (molas, amortecedores, buchas, pivô) e freio (cilindro, lona/pastilha, tambor) é compartilhada entre toda a família de picapes série 10/20 e a Veraneio, com poucas variações de robustez entre a série 10 (mais leve) e a série 20 (mais pesada/reforçada). Ao procurar peça, informe qual série (10 ou 20) o veículo é — isso evita comprar peça mais fraca ou mais forte do que o necessário.',
  },
  {
    severity: 'OK',
    title: 'Uso rural exige atenção redobrada a filtro de ar e óleo — poeira reduz muito a vida do motor',
    body: 'Veículos que rodam em estrada de terra/fazenda sofrem desgaste acelerado por poeira entrando no motor. Reduza os intervalos de troca de óleo e filtro de ar em relação ao uso urbano — é o macete mais simples e mais efetivo para prolongar a vida desses motores em uso rural.',
  },
]

const MACETES_DIESEL: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor diesel Perkins (D-10/D-20) é conhecido pela robustez e durabilidade em uso pesado/rural',
    body: 'O motor diesel Perkins (4.236, turbo na maior parte da produção) que equipa D-10 e D-20 é reconhecido por aguentar rotina pesada de fazenda/zona rural com manutenção correta. Peças de motor ainda são encontradas via especialistas em diesel Perkins — vale procurar oficina com experiência específica nesse motor, não qualquer diesel.',
  },
  {
    severity: 'WARN',
    title: 'Bomba injetora exige oficina especializada — não é serviço para mecânico generalista',
    body: 'A bomba injetora do motor diesel é peça de precisão que exige regulagem por oficina especializada em diesel/bomba injetora, não qualquer mecânico. Sintomas de bomba desregulada incluem perda de potência, fumaça excessiva e partida difícil — resolver na oficina certa evita gasto em peça trocada por engano.',
  },
]

const MACETES_VERANEIO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Ainda muito usada em fazenda — robustez e simplicidade mecânica são o forte do modelo',
    body: 'A Veraneio continua rodando em propriedades rurais até hoje justamente pela robustez do chassi e do motor (gasolina 4.1 ou diesel turbo), simplicidade mecânica e disponibilidade de peça de suspensão/freio compartilhada com C-10/C-20/D-10/D-20. Para uso rural pesado, é ainda hoje referência de confiabilidade entre utilitários antigos.',
  },
]

const PROBLEMAS_COMUM: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento de óleo em diversos pontos do motor',
    body: 'É queixa recorrente em toda a família — vazamentos pela junta do cárter (que na maioria das versões exige remoção do motor para troca completa) e por outros pontos de vedação do motor 6 cilindros. Monitore o nível de óleo com frequência e não adie o reparo — vazamento contínuo mascara nível baixo e aumenta risco de dano ao motor.',
  },
  {
    severity: 'WARN',
    title: 'Manutenção constante de pivô e buchas de suspensão dianteira',
    body: 'A suspensão dianteira dessa família exige manutenção periódica de pivô e buchas — é ponto de desgaste conhecido, mais acentuado em veículos que rodam em estrada ruim/terra. Ignorar folga no pivô compromete a direção e o desgaste dos pneus dianteiros.',
  },
  {
    severity: 'WARN',
    title: 'Folga em cilindro/pinça de freio com o tempo de uso',
    body: 'Folga no sistema de freio (cilindro de roda, pinça) é queixa relatada em unidades mais antigas ou com manutenção irregular — pedal mais "esponjoso" ou curso maior que o normal é sinal de alerta. Freio é item de segurança crítica nesses veículos pesados — não adie a inspeção.',
  },
  {
    severity: 'WARN',
    title: 'Adaptação de motor mais moderno exige reforço de suspensão e alterações no painel corta-fogo',
    body: 'É comum tentar modernizar essas picapes/Veraneio trocando o motor original por um mais novo e potente — mas isso normalmente exige reforçar a suspensão (motor mais pesado) e alterar o painel corta-fogo/coxins. Se for considerar essa troca, planeje o orçamento incluindo essas adaptações, não apenas o motor em si.',
  },
]

const MANUTENCAO_COMUM: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma básico da família C-10/C-20/D-10/D-20/Veraneio (uso misto urbano/rural)',
    body: '3.000-5.000 km — Troca de óleo do motor + filtro (reduza para 3.000 km em uso rural com muita poeira). | 5.000 km — Filtro de óleo diesel (D-10/D-20) e sangria do sistema de combustível se houver água no diesel. | 10.000 km — Lubrificação de pivô e buchas da suspensão dianteira — item que não pode ser negligenciado nessa família. | 10.000 km — Inspeção do sistema de freio (cilindro, lona/pastilha, folga do pedal). | 15.000-20.000 km — Filtro de ar — reduza bastante o intervalo em uso rural/estrada de terra. | 20.000-30.000 km — Regulagem da bomba injetora por oficina especializada (D-10/D-20). | Anual — Fluido de freio. | Anual — Inspeção de vazamento de óleo no motor e no cárter.',
  },
]

function buildBlock(
  modelName: string,
  yearFrom: number,
  yearTo: number | null,
  isDiesel: boolean,
  extraMacetes: TipInput[] = [],
): ModelBlock {
  return {
    modelName,
    yearFrom,
    yearTo,
    MACETES: [...MACETES_COMUM_GAS, ...(isDiesel ? MACETES_DIESEL : []), ...extraMacetes],
    PROBLEMAS: PROBLEMAS_COMUM,
    MANUTENCAO: MANUTENCAO_COMUM,
  }
}

const BLOCKS: ModelBlock[] = [
  buildBlock('C-10', 1964, 1985, false),
  buildBlock('C-20', 1964, 1996, false),
  buildBlock('D-10', 1978, 1985, true),
  buildBlock('D-20', 1978, 1996, true),
  buildBlock('Veraneio', 1968, 1993, true, MACETES_VERANEIO),
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'C-10',
    yearFrom: 1964,
    yearTo: 1985,
    tireSize: '6.50-16 · 185 R14 LT (varia por época/versão)',
    frontPsi: 28,
    rearPsi: 30,
    frontPsiLoad: 32,
    rearPsiLoad: 40,
    sparePsi: 40,
    notes: 'Picape leve — traseira sobe bastante com carga na caçamba. Valores aproximados de referência; confirme na etiqueta da coluna da porta ou manual do proprietário.',
  },
  {
    modelName: 'C-20',
    yearFrom: 1964,
    yearTo: 1996,
    tireSize: '7.00-16 · 7.50-16 (varia por época/versão)',
    frontPsi: 30,
    rearPsi: 32,
    frontPsiLoad: 34,
    rearPsiLoad: 45,
    sparePsi: 45,
    notes: 'Picape média/pesada — capacidade de carga maior exige pressão traseira bem mais alta com caçamba cheia. Confirme na etiqueta da coluna da porta ou manual do proprietário.',
  },
  {
    modelName: 'D-10',
    yearFrom: 1978,
    yearTo: 1985,
    tireSize: '6.50-16 · 7.50-16 (varia por época/versão)',
    frontPsi: 28,
    rearPsi: 30,
    frontPsiLoad: 32,
    rearPsiLoad: 35,
    sparePsi: 40,
    notes: 'Versão diesel da série 10 — mesma referência de pneu/pressão do C-10, ajuste a traseira conforme carga transportada. Confirme na etiqueta da coluna da porta.',
  },
  {
    modelName: 'D-20',
    yearFrom: 1978,
    yearTo: 1996,
    tireSize: '7.00-16 · 7.50-16 (varia por época/versão)',
    frontPsi: 30,
    rearPsi: 32,
    frontPsiLoad: 34,
    rearPsiLoad: 45,
    sparePsi: 45,
    notes: 'Versão diesel da série 20 — mesma referência de pneu/pressão do C-20, ajuste a traseira conforme carga transportada. Confirme na etiqueta da coluna da porta.',
  },
  {
    modelName: 'Veraneio',
    yearFrom: 1968,
    yearTo: 1993,
    tireSize: '215/80 R16 · 7.00-16 (varia por época/versão, gasolina ou diesel)',
    frontPsi: 30,
    rearPsi: 32,
    frontPsiLoad: 32,
    rearPsiLoad: 38,
    sparePsi: 40,
    notes: 'Utilitário pesado sobre chassi série 20 — ajuste a pressão traseira conforme ocupação/carga (uso rural costuma rodar com mais peso). Confirme na etiqueta da coluna da porta ou manual do proprietário.',
  },
]

const MAINTENANCE_TEMPLATE: Array<Omit<MaintenanceItemInput, 'modelName' | 'yearFrom' | 'yearTo'>> = [
  { component: 'Óleo do motor + filtro', intervalKm: 4000, intervalMonths: 6, notes: 'Reduza para 3.000 km em uso rural/estrada de terra com muita poeira.', priority: 'CRITICAL', order: 0 },
  { component: 'Lubrificação de pivô e buchas da suspensão dianteira', intervalKm: 10000, intervalMonths: 6, notes: 'Item de manutenção constante e conhecido dessa família — não negligenciar.', priority: 'HIGH', order: 1 },
  { component: 'Sistema de freio (cilindro, lona/pastilha, folga do pedal)', intervalKm: 10000, intervalMonths: 12, notes: 'Veículo pesado — folga no freio é item de segurança crítica.', priority: 'CRITICAL', order: 2 },
  { component: 'Filtro de ar', intervalKm: 15000, intervalMonths: 12, notes: 'Reduza bastante o intervalo em uso rural/estrada de terra.', priority: 'MEDIUM', order: 3 },
  { component: 'Vazamento de óleo no motor/cárter — inspeção', intervalKm: 10000, intervalMonths: 12, notes: 'Vazamento pela junta do cárter é queixa recorrente na família.', priority: 'HIGH', order: 4 },
  { component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
]

const MAINTENANCE_TEMPLATE_DIESEL_EXTRA: Array<Omit<MaintenanceItemInput, 'modelName' | 'yearFrom' | 'yearTo'>> = [
  { component: 'Regulagem da bomba injetora', intervalKm: 30000, intervalMonths: 24, notes: 'Serviço de oficina especializada em diesel — não é para mecânico generalista.', priority: 'HIGH', order: 6 },
  { component: 'Sangria do sistema de combustível (água no diesel)', intervalKm: 5000, intervalMonths: 6, notes: 'Verifique o filtro/decantador de água periodicamente.', priority: 'MEDIUM', order: 7 },
]

function buildMaintenanceItems(modelName: string, yearFrom: number, yearTo: number | null, isDiesel: boolean): MaintenanceItemInput[] {
  const base = MAINTENANCE_TEMPLATE.map((item) => ({ ...item, modelName, yearFrom, yearTo }))
  const diesel = isDiesel
    ? MAINTENANCE_TEMPLATE_DIESEL_EXTRA.map((item) => ({ ...item, modelName, yearFrom, yearTo }))
    : []
  return [...base, ...diesel]
}

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...buildMaintenanceItems('C-10', 1964, 1985, false),
  ...buildMaintenanceItems('C-20', 1964, 1996, false),
  ...buildMaintenanceItems('D-10', 1978, 1985, true),
  ...buildMaintenanceItems('D-20', 1978, 1996, true),
  ...buildMaintenanceItems('Veraneio', 1968, 1993, true),
]

async function main() {
  console.log('🚗 Seed Chevrolet C-10/C-20/D-10/D-20/Veraneio...')

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

  console.log('✅ Chevrolet C-10/C-20/D-10/D-20/Veraneio concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
