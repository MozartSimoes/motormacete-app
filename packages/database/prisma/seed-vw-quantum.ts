/**
 * Seed Volkswagen Quantum — macetes, problemas, manutenção e calibragem de pneus
 * Perua (station wagon) média de 4 portas, derivada da mesma plataforma do
 * Santana sedan (Passat B2 "brasileiro"), motor longitudinal e tração
 * dianteira (FWD) — ao contrário do que muita gente supõe, NÃO é tração
 * traseira. Produzida no Brasil de 1985 a 1997 sob o nome "Quantum"
 * (depois disso a perua seguiu no catálogo já rebatizada dentro da linha
 * Santana). Duas eras bem distintas: motor AP a carburador (1985-1993) e
 * motor AP com injeção eletrônica multiponto "Mi" (1994-1997).
 * Execute: pnpm --filter @motormacete/database db:seed:vw-quantum
 *
 * Fontes: pt.wikipedia.org (Volkswagen Santana Quantum, Volkswagen AP),
 *         oficinabrasil.com.br, carroclub.com.br, guiacarros.com.br,
 *         fichacompleta.com.br, vrum.com.br, autolivraria.com.br
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

// ─── Geração carburada (1985-1993) — AP 1.8/2.0 a carburador ──────────────

const MACETES_CARB: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor AP: correia dentada NÃO é interferente — folga de segurança rara',
    body: 'O motor AP (1.8 e 2.0) usado na Quantum é conhecido por não ser "interferente": se a correia dentada arrebentar rodando, na grande maioria dos casos o motor simplesmente para, sem válvula bater no pistão. Isso não é desculpa para atrasar a troca (o carro fica na pista sem previsão), mas reduz bastante o risco de dano grave em comparação com motores modernos de correia interferente.',
  },
  {
    severity: 'OK',
    title: 'Mecânica simples e peças ainda fartas no mercado paralelo',
    body: 'O motor AP foi usado em praticamente toda a linha VW por décadas (Gol, Voyage, Parati, Saveiro, Santana) — isso significa peças de motor, ignição e arrefecimento ainda abundantes e baratas em qualquer cidade, mesmo décadas depois de a Quantum sair de linha. Ao comprar peça, procure "para motor AP 1.8/2.0" em vez de "para Quantum" — amplia muito a busca.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: prepare-se para dificuldade de achar peça original',
    body: 'Nos modelos a carburador (pré-1994), a resistência do afogador (choke) elétrico e outras peças específicas do carburador Solex/Weber já são difíceis de achar novas. Muitos donos recorrem a peças recondicionadas ou adaptação — antes de trocar, procure oficinas especializadas em carburador (cada vez mais raras) em vez de mecânica geral, o ajuste fino faz toda diferença no consumo e na partida a frio.',
  },
  {
    severity: 'OK',
    title: 'Câmbio manual robusto, direção hidráulica só nas versões GLS+',
    body: 'O câmbio manual de 4 ou 5 marchas do AP é considerado muito durável. Já a direção hidráulica (presente nas versões mais completas) é ponto de atenção — vazamento é queixa recorrente. Verifique o nível do reservatório de fluido de direção periodicamente e observe ruído de "chiado" ao virar o volante parado, sinal clássico de baixo nível ou bomba no fim da vida.',
  },
]

const PROBLEMAS_CARB: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Superaquecimento — válvula termostática é suspeita nº 1',
    body: 'Queixa recorrente entre donos: motor esquentando mais que o normal, principalmente em velocidade mais alta ou trânsito parado. Antes de suspeitar de problema grave (junta de cabeçote), verifique a válvula termostática — travada fechada ou parcialmente obstruída é a causa mais comum e mais barata de resolver nesse motor.',
  },
  {
    severity: 'WARN',
    title: 'Perda de força em subida e ultrapassagem',
    body: 'Relato comum é sensação de "motor sem força" em subida ou ao tentar ultrapassar, mais evidente no 1.8. Antes de mexer no motor, cheque regulagem/limpeza do carburador e o estado das velas — na maioria dos casos o problema é ajuste de mistura desregulado, não desgaste mecânico.',
  },
  {
    severity: 'WARN',
    title: 'Carburador vazando álcool',
    body: 'Vazamento de combustível pelo carburador (mais comum nas versões a álcool) é queixa frequente — além do risco óbvio de incêndio, indica junta ou boia desgastada. Não rode com vazamento visível ou cheiro forte de combustível no vão do motor; é conserto relativamente barato que não vale a pena adiar.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento na direção hidráulica (versões equipadas)',
    body: 'Nas versões com direção hidráulica, vazamento pelas mangueiras ou pela bomba é comum em carros com mais idade — reponha o fluido correto (não misture tipos) e não deixe o reservatório operar seco por muito tempo, isso acelera o desgaste da bomba.',
  },
]

const MANUTENCAO_CARB: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Quantum AP a carburador (1985-1993)',
    body: '5.000-10.000 km — Troca de óleo do motor + filtro de óleo (uso do período pedia intervalos mais curtos que carros modernos). | 10.000 km — Regulagem do carburador e limpeza dos bicos/jets. | 10.000 km — Inspeção de freios, embreagem e níveis de fluido. | 20.000 km — Filtro de ar. | 20.000-30.000 km — Velas de ignição, platinado/condensador (se ainda com ignição por platinado nos primeiros anos) ou módulo eletrônico de ignição (versões posteriores). | 60.000 km — Correia dentada (não interferente, mas evite rodar com ela vencida mesmo assim). | 60.000 km — Fluido de arrefecimento + revisão da válvula termostática. | Sempre — verifique vazamento de combustível no carburador e de fluido na direção hidráulica (versões equipadas) a cada revisão.',
  },
]

// ─── Geração injetada Mi (1994-1997) — AP 1.8/2.0 injeção multiponto ──────

const MACETES_MI: TipInput[] = [
  {
    severity: 'OK',
    title: 'Injeção eletrônica multiponto: adeus aos ajustes manuais de carburador',
    body: 'A partir de meados dos anos 1990 a Quantum passou a usar injeção eletrônica multiponto ("Mi") no lugar do carburador — ganho real de confiabilidade na partida a frio e consumo mais previsível. Se for comprar um exemplar usado, prefira a versão injetada quando possível: menos dor de cabeça de regulagem e peça de reposição eletrônica ainda mais fácil de achar que peça de carburador hoje em dia.',
  },
  {
    severity: 'OK',
    title: 'Perua com porta-malas gigante — vantagem real para quem carrega peso',
    body: 'A Quantum foi vendida exclusivamente como perua de 4 portas, com um dos maiores porta-malas da categoria na época. Se for usar para trabalho/carga, ajuste a pressão traseira dos pneus para o valor de carga máxima da etiqueta (bem mais alto que o vazio) — evita desgaste irregular e melhora a estabilidade com o porta-malas cheio.',
  },
  {
    severity: 'WARN',
    title: 'Versão Evidence e Exclusive: bancos e volante de outros modelos VW facilitam achar estofamento',
    body: 'As versões de topo Evidence (volante do Gol GTI, bancos do Gol TSi) e Exclusive compartilham peças de acabamento com outros modelos VW da época — útil na hora de procurar estofamento, volante ou peça de acabamento em desmanches, já que buscar só "para Quantum" limita muito o resultado.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático disponível nas versões GLS — troque o fluido, não é vitalício',
    body: 'As versões GLS+ ofereciam câmbio automático opcional. Diferente do que muita gente pensa, câmbio automático dessa época NÃO é vitalício — troque o fluido (ATF) periodicamente mesmo que o carro "não dê trancos", isso evita desgaste acelerado das bandas internas.',
  },
]

const PROBLEMAS_MI: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sensor e chicote da injeção eletrônica envelhecidos',
    body: 'Em exemplares hoje com 25-30+ anos, chicotes elétricos ressecados e conectores oxidados da injeção eletrônica são causa comum de falha intermitente (motor falhando ou não pegando de vez em quando). Antes de trocar sensor caro por sensor caro, vale inspecionar visualmente os conectores e limpar contatos — resolve boa parte dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento continua sendo o ponto fraco',
    body: 'Mesmo na versão injetada, superaquecimento por válvula termostática ou radiador com colmeia obstruída (natural após décadas de uso) segue sendo a queixa mais comum. Fique de olho no marcador de temperatura sempre, principalmente em trânsito parado no verão.',
  },
  {
    severity: 'WARN',
    title: 'Peça de injeção eletrônica original cada vez mais rara',
    body: 'Diferente da mecânica do motor AP em si (ainda farta), peças específicas da central de injeção multiponto desses anos (final dos anos 90) já são mais difíceis de achar novas — a saída costuma ser peça recondicionada ou de desmanche, verificada por oficina especializada em injeção eletrônica antiga antes de instalar.',
  },
]

const MANUTENCAO_MI: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Quantum AP injetado Mi (1994-1997)',
    body: '10.000 km — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios, embreagem, direção hidráulica e níveis de fluido. | 20.000 km — Filtro de ar. | 20.000-30.000 km — Velas de ignição. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada (motor não interferente, mas não vale a pena arriscar ficar na pista). | 60.000 km — Fluido de arrefecimento + revisão da válvula termostática e do radiador. | 60.000-80.000 km — Fluido do câmbio automático (versões equipadas) — não é vitalício. | Sempre — inspecione conectores e chicote da injeção eletrônica em carros com mais de 20 anos, causa comum de falha intermitente.',
  },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Quantum',
    yearFrom: 1985,
    yearTo: 1993,
    MACETES: MACETES_CARB,
    PROBLEMAS: PROBLEMAS_CARB,
    MANUTENCAO: MANUTENCAO_CARB,
  },
  {
    modelName: 'Quantum',
    yearFrom: 1994,
    yearTo: 1997,
    MACETES: MACETES_MI,
    PROBLEMAS: PROBLEMAS_MI,
    MANUTENCAO: MANUTENCAO_MI,
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Quantum',
    yearFrom: 1985,
    yearTo: 1993,
    tireSize: '175/70 R14 (CLi/CL/GL) · 185/65 R14 (GLS)',
    frontPsi: 28,
    rearPsi: 30,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Valores de referência aproximados para o período — confirme sempre na etiqueta da coluna da porta do motorista ou manual do proprietário do exemplar específico. Reforce a traseira com porta-malas carregado.',
  },
  {
    modelName: 'Quantum',
    yearFrom: 1994,
    yearTo: 1997,
    tireSize: '185/65 R14 (CL/GL) · 195/60 R14 (GLS/Evidence/Exclusive)',
    frontPsi: 28,
    rearPsi: 30,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Valores de referência aproximados — confirme na etiqueta da coluna da porta do motorista ou manual do proprietário. Reforce a pressão traseira com o porta-malas carregado.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Quantum', yearFrom: 1985, yearTo: 1993, component: 'Óleo do motor + filtro', intervalKm: 5000, intervalMonths: 6, notes: 'Intervalo curto típico da época — óleos e motores atuais toleram mais, este não.', priority: 'HIGH', order: 0 },
  { modelName: 'Quantum', yearFrom: 1985, yearTo: 1993, component: 'Regulagem/limpeza do carburador', intervalKm: 10000, intervalMonths: 12, notes: 'Procure oficina especializada em carburador — ajuste ruim é a causa nº1 de perda de força e consumo alto.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Quantum', yearFrom: 1985, yearTo: 1993, component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: 'Motor não interferente (menor risco se romper), mas não vale a pena arriscar ficar na pista.', priority: 'HIGH', order: 2 },
  { modelName: 'Quantum', yearFrom: 1985, yearTo: 1993, component: 'Válvula termostática — inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Suspeita nº1 em caso de superaquecimento.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Quantum', yearFrom: 1985, yearTo: 1993, component: 'Fluido de direção hidráulica (versões equipadas)', intervalKm: null, intervalMonths: 12, notes: 'Verifique nível e vazamento nas mangueiras/bomba a cada revisão.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Quantum', yearFrom: 1994, yearTo: 1997, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'Quantum', yearFrom: 1994, yearTo: 1997, component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: 'Motor não interferente, mas troque no prazo.', priority: 'HIGH', order: 6 },
  { modelName: 'Quantum', yearFrom: 1994, yearTo: 1997, component: 'Válvula termostática e radiador — inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Colmeia do radiador obstruída após décadas de uso é comum hoje em exemplares originais.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Quantum', yearFrom: 1994, yearTo: 1997, component: 'Conectores e chicote da injeção eletrônica — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Causa comum de falha intermitente em carros com 20+ anos.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Quantum', yearFrom: 1994, yearTo: 1997, component: 'Fluido do câmbio automático (versões equipadas)', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício, mesmo sem apresentar trancos.', priority: 'HIGH', order: 9 },
]

async function main() {
  console.log('🚗 Seed Volkswagen Quantum...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Quantum', brandId: brand.id } },
    update: {},
    create: { name: 'Quantum', brandId: brand.id },
  })

  const distinctModelNames = [...new Set(BLOCKS.map((b) => b.modelName))]
  for (const modelName of distinctModelNames) {
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

  console.log('✅ Volkswagen Quantum concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
