/**
 * Seed Volkswagen Eos — macetes, problemas, manutenção e calibragem
 * Cupê-conversível importado da Alemanha/Portugal (AutoEuropa), vendido no
 * Brasil em baixíssimo volume entre 2009 e 2012 (~120 unidades, apenas 74
 * emplacadas pela Fenabrave em 2009). Única versão oferecida: motor 2.0
 * TSI/Turbo FSI de 200cv com câmbio automático de dupla embreagem DSG,
 * sobre a plataforma PQ35 compartilhada com o Golf Mk5. Sua marca registrada
 * é a capota rígida retrátil de 5 peças com teto solar de vidro embutido,
 * que abre mesmo com a capota fechada — mecanismo complexo, cheio de
 * vedações de borracha e sensível a manutenção, considerado o ponto mais
 * delicado do carro. Foi o último conversível vendido pela VW no Brasil e um
 * fracasso comercial.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-eos
 *
 * Fontes: autopapo.com.br, vrum.com.br, en.wikipedia.org/wiki/Volkswagen_Eos,
 *         procon.sp.gov.br (recall ABS), mppr.mp.br (recall airbag),
 *         parallelum.com.br/fipe (código FIPE 4857, anos 2008-2012)
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
    title: 'Versão única no Brasil: 2.0 TSI 200cv + câmbio DSG',
    body: 'O Eos foi vendido no Brasil em versão única: motor 2.0 Turbo FSI (TSI) de 200cv com câmbio automático DSG de dupla embreagem, sobre a plataforma PQ35 compartilhada com o Golf Mk5. Peças de motor e câmbio desses modelos irmãos ajudam quando a concessionária ou a oficina não tem cadastro específico do Eos.',
  },
  {
    severity: 'OK',
    title: 'Capota rígida retrátil de 5 peças: sempre operar parado e em local plano',
    body: 'O teto do Eos é uma capota rígida dobrável em 5 partes com um teto solar de vidro embutido que abre até com a capota fechada. Acione o mecanismo sempre com o carro parado, em piso nivelado e sem interromper o ciclo (leva cerca de 25 segundos) — parar no meio do movimento é uma das causas mais comuns de desalinhamento e falha do sistema.',
  },
  {
    severity: 'OK',
    title: 'Sem estepe: kit de reparo de pneu no lugar da roda sobressalente',
    body: 'Como o mecanismo da capota ocupa parte do porta-malas, o Eos não traz roda estepe — o padrão é um kit de reparo (selante + compressor). Confira a validade do selante periodicamente e leve um calibrador próprio; um furo maior deixará o carro imobilizado até um reboque ou uma borracharia.',
  },
  {
    severity: 'OK',
    title: 'Porta-malas encolhe de 300L para 190L com a capota aberta',
    body: 'Com o teto guardado, o porta-malas cai de 300 para cerca de 190 litros. Organize a bagagem e feche a capota antes de embarcar volumes maiores — não dá para abrir o teto com o porta-malas cheio além do espaço reservado ao mecanismo.',
  },
  {
    severity: 'OK',
    title: 'Carro raro no Brasil: poucas peças de acabamento em estoque local',
    body: 'Foram importadas cerca de 120 unidades entre 2009 e 2012, com apenas 74 emplacamentos registrados na Fenabrave em 2009. Peças de acabamento, vedações e itens específicos do teto costumam precisar de importação — pesquise com antecedência e considere prazos mais longos para reparo.',
  },
  {
    severity: 'WARN',
    title: 'Oficinas especializadas em capota retrátil ajudam mesmo sem peças compatíveis',
    body: 'O mecanismo de capota rígida retrátil do Eos é tecnicamente parecido com o de outros conversíveis de teto duro da época (como Peugeot 307 CC e Renault Mégane CC), mesmo sem peças intercambiáveis. Oficinas com experiência nesse tipo de sistema tendem a diagnosticar falhas de motor elétrico, bomba hidráulica e sensores mais rápido do que uma oficina genérica.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento de água pelas vedações da capota',
    body: 'É um problema documentado no Eos, mais comum a partir de cerca de 100.000 km, quando as borrachas de vedação da capota perdem elasticidade e passam a deixar entrar água. Após chuva forte, confira o carpete do porta-malas e o forro interno em busca de umidade — a troca preventiva das vedações evita dano maior ao módulo elétrico do teto.',
  },
  {
    severity: 'WARN',
    title: 'Falhas no mecanismo do teto após cerca de 60.000 km',
    body: 'O sistema hidráulico e o motor elétrico que movem as 5 peças da capota podem apresentar movimento hesitante, paradas no meio do ciclo ou ruído fora do padrão, especialmente depois de 60.000 km. Ao notar qualquer alteração no funcionamento, leve para revisão antes que a falha evolua e imobilize o teto aberto ou fechado.',
  },
  {
    severity: 'WARN',
    title: 'Batida na lataria pode desalinhar o vão do teto',
    body: 'O encaixe da capota depende de alinhamento fino da carroceria. Mesmo uma batida leve na traseira ou nas laterais pode desalinhar o vão por onde o teto se movimenta e travar ou dificultar o fechamento. Depois de qualquer reparo de funilaria, teste o ciclo completo de abertura e fechamento antes de considerar o carro pronto.',
  },
  {
    severity: 'WARN',
    title: 'Peças de reposição escassas no mercado nacional',
    body: 'Pelo baixíssimo volume importado, peças específicas do Eos — sobretudo do mecanismo do teto e itens de acabamento — não costumam ter estoque em concessionárias ou no mercado de reposição nacional. Planeje prazo maior para conserto e pesquise fornecedores especializados em peças importadas antes de fechar orçamento.',
  },
  {
    severity: 'DANGER',
    title: 'Recall (2009-2010): falha no módulo ABS pode desativar ABS/ESC',
    body: 'A Volkswagen convocou no Brasil os chassis 9V001044 a 9V021237 (ano-modelo 2009) do Eos, junto com Jetta e Jetta Variant, por falha no sistema ABS que podia causar perda da função antibloqueio de frenagem e/ou do controle eletrônico de estabilidade durante a ativação. O reparo foi atualização de software e, se necessário, substituição do módulo eletrônico ABS. Confira pelo chassi no site oficial da Volkswagen (vwapps.volkswagen.com.br/Recall) se o carro já passou por esse recall.',
  },
  {
    severity: 'DANGER',
    title: 'Recall (fev/2016): possível falha na espiral de contato do airbag do motorista',
    body: 'Recall aberto em 19/02/2016 para os chassis AV013181 a BV002845 (anos-modelo 2010-2011) por risco de ruptura do cabo flat na espiral de contato do airbag do motorista, causada por entrada de fios de cabelo ou fibras de tecido, o que pode gerar perda de conexão elétrica e falha do airbag em caso de colisão. O reparo consistiu na instalação de um componente adicional no conjunto da espiral de contato. Verifique pelo chassi se o seu Eos foi contemplado.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Eos (motor 2.0 TSI + câmbio DSG)',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor 2.0 TSI (especificação exata do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Óleo/fluido do câmbio DSG (crítico — não estique esse prazo). | 60.000 km — Fluido de arrefecimento. | A cada revisão — Testar o ciclo completo da capota, inspecionar vedações de borracha e verificar validade do kit de reparo de pneu (não há estepe).',
  },
  {
    severity: 'WARN',
    title: 'Manutenção preventiva do mecanismo do teto retrátil',
    body: 'Lubrifique e inspecione periodicamente as vedações de borracha, trilhos e dobradiças da capota — mesmo sem sinais de falha. É a manutenção mais específica (e mais cara se negligenciada) do Eos, e boa parte dos problemas relatados no modelo se origina justamente da falta desse cuidado preventivo.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Eos',
    yearFrom: 2009,
    yearTo: 2012,
    tireSize: '225/45 R17 ou 235/40 R18 (conforme rodas originais da versão)',
    frontPsi: 32,
    rearPsi: 30,
    frontPsiLoad: 35,
    rearPsiLoad: 33,
    sparePsi: null,
    notes: 'Valores estimados para a plataforma PQ35 (Golf Mk5) — o Eos não traz roda estepe, apenas kit de reparo de pneu. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Eos', yearFrom: 2009, yearTo: 2012, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.0 TSI/Turbo FSI — siga exatamente a especificação do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Eos', yearFrom: 2009, yearTo: 2012, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Eos', yearFrom: 2009, yearTo: 2012, component: 'Óleo/fluido do câmbio DSG', intervalKm: 60000, intervalMonths: 48, notes: 'Não estique este prazo — câmbio de dupla embreagem é sensível a fluido degradado.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Eos', yearFrom: 2009, yearTo: 2012, component: 'Vedações e trilhos da capota retrátil', intervalKm: 20000, intervalMonths: 12, notes: 'Lubrificação e inspeção preventiva — item mais sensível do carro.', priority: 'HIGH', order: 3 },
  { modelName: 'Eos', yearFrom: 2009, yearTo: 2012, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em regiões com muita poeira.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Eos', yearFrom: 2009, yearTo: 2012, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Eos', yearFrom: 2009, yearTo: 2012, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Eos', yearFrom: 2009, yearTo: 2012, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Volkswagen.', priority: 'HIGH', order: 7 },
  { modelName: 'Eos', yearFrom: 2009, yearTo: 2012, component: 'Kit de reparo de pneu (selante/compressor)', intervalKm: null, intervalMonths: 24, notes: 'Não há estepe — confira a validade do selante periodicamente.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Eos', yearFrom: 2009, yearTo: 2012, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Eos',
    yearFrom: 2009,
    yearTo: 2012,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volkswagen Eos...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
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

  console.log('✅ Volkswagen Eos concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
