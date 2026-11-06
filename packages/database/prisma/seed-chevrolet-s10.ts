/**
 * Seed Chevrolet S10 — macetes, problemas, manutenção e calibragem de pneus
 * modelName "S10" casa por substring com QUALQUER trim FIPE que contenha
 * "S10", incluindo a antiga SUV "S10 Blazer" e a picape antiga "S10 Pick-Up"
 * (1995-2011) — por isso as gerações antigas ficam neste mesmo arquivo/
 * modelName, diferenciadas apenas por yearFrom/yearTo:
 *  - S10 antiga (1995-2011): picape e SUV Blazer, motores 2.2/2.4 gasolina,
 *    2.5/2.8 diesel turbo, 4.3 V6
 *  - S10 atual (2012+): picape, motor 2.8 Duramax turbodiesel 4 cilindros,
 *    câmbio manual/automático, tração 4x2/4x4, LS/LT/LTZ/High Country/Z71
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-s10
 *
 * Fontes: oficinaconectada.com.br, mecanicaoffroad.com.br, vrum.com.br,
 *         carroclub.com.br, oficinabrasil.com.br, mobiauto.com.br,
 *         autolivraria.com.br, mercadoveiculos.com, suaoficinaonline.com.br
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

// ─── S10 antiga (1995-2011) — picape e SUV Blazer, 2.2/2.4 gas, 2.5/2.8 diesel, 4.3 V6 ──

const MACETES_ANTIGA: TipInput[] = [
  {
    severity: 'OK',
    title: 'Confirme o motor da sua unidade antes de comprar peça — a família antiga teve 5 opções diferentes',
    body: 'Entre 1995 e 2011, a S10/Blazer foi vendida com motores muito diferentes entre si: 2.2 gasolina (4 cilindros), 2.4 gasolina (4 cilindros, versão mais recente da família), 2.5 diesel turbo (mais antigo), 2.8 diesel turbo (MWM Sprint, depois com intercooler) e 4.3 V6 gasolina/a álcool (mais potente, menos comum). Antes de orçar qualquer peça de motor, confirme exatamente qual equipa sua unidade — a cilindrada gravada no capô ou manual nem sempre bate com o motor real após troca ou retífica ao longo dos anos.',
  },
  {
    severity: 'OK',
    title: 'Motor 4.3 V6: superaquecimento é o ponto de atenção nº1',
    body: 'O 4.3 V6 é o motor mais potente da família antiga, mas o histórico de superaquecimento é conhecido — geralmente ligado a vazamento no radiador ou defeito na bomba d\'água. Monitore o indicador de temperatura com atenção redobrada neste motor e não ignore perda de nível do reservatório de arrefecimento sem vazamento aparente no chão.',
  },
  {
    severity: 'OK',
    title: 'Vazamento pela tampa de válvulas é praticamente "de fábrica" nesta geração — não é motivo de pânico',
    body: 'Um defeito clássico e amplamente conhecido em toda a família de motores desta geração é vazamento de óleo pela tampa de válvulas, com a gaxeta endurecendo com o tempo. É um reparo simples e barato (gaxeta nova) — comum o suficiente para não ser motivo de desconfiar do carro inteiro, mas vale verificar em qualquer unidade usada antes de comprar.',
  },
  {
    severity: 'OK',
    title: 'Peças de suspensão e elétrica são fartas — mecânica simples, muito conhecida em qualquer cidade',
    body: 'Por ter ficado 16 anos em produção com poucas mudanças estruturais, a S10/Blazer desta geração tem peças de suspensão, freio e elétrica amplamente disponíveis, inclusive alternativas de mercado — inclusive em cidades pequenas. É uma vantagem real na hora de manter o carro rodando com custo baixo.',
  },
]

const PROBLEMAS_ANTIGA: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Falhas na suspensão dianteira a partir de 30.000 km — defeito característico da geração',
    body: 'A partir de aproximadamente 30.000 km, é comum começarem a aparecer falhas na suspensão dianteira — folgas, ruídos e desgaste de buchas/terminais. É apontado como um defeito característico desta geração, não uma exceção. Inclua a suspensão dianteira na lista de itens a verificar em qualquer revisão, mesmo antes do intervalo programado.',
  },
  {
    severity: 'WARN',
    title: 'Ruído de cardã em ponto-morto e folga na caixa de direção',
    body: 'Entre as queixas mais citadas por proprietários estão ruído vindo do cardã com o carro em ponto-morto e folga na caixa de direção — cada uma citada por parcela relevante dos donos consultados. Nenhum dos dois costuma ser grave isoladamente, mas ambos pioram a sensação de dirigibilidade se acumulados sem manutenção.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento do motor 4.3 V6 — vazamento de radiador ou bomba d\'água',
    body: 'O motor 4.3 V6 tem histórico de superaquecimento associado a vazamentos no radiador ou defeito na bomba d\'água. Se notar temperatura subindo no painel sem explicação óbvia, não continue rodando "para ver se estabiliza" — pare, verifique nível do reservatório e procure vazamento antes de causar dano maior ao motor.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pela tampa de válvulas',
    body: 'Vazamento de óleo pela tampa de válvulas, causado por gaxeta ressecada, é queixa recorrente em toda a família de motores desta geração. Reparo simples e barato — não deixe se acumular a ponto de sujar componentes elétricos ou correias próximas.',
  },
  {
    severity: 'WARN',
    title: 'Falhas elétricas: painel de instrumentos, vidros elétricos e faróis',
    body: 'Problemas elétricos como panes no painel de instrumentos, mau funcionamento de vidros elétricos e faróis são queixas comuns em unidades mais antigas, geralmente ligadas ao ressecamento de fios e conectores oxidados ao longo dos anos. Antes de trocar um componente inteiro (motor de vidro, módulo do painel), vale checar e limpar conectores — muitas vezes resolve sem gasto maior.',
  },
  {
    severity: 'WARN',
    title: 'Pintura fraca: descascamento é queixa crônica relatada por proprietários',
    body: 'Descascamento de pintura é apontado como problema crônico por proprietários da geração antiga. É mais estético que estrutural na maioria dos casos, mas exposição prolongada da chapa pode evoluir para ferrugem em regiões litorâneas ou de clima muito úmido — retoque preventivo vale a pena.',
  },
]

const MANUTENCAO_ANTIGA: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma S10/Blazer antiga (Chevrolet + ajuste uso severo BR) — varia conforme o motor',
    body: '10.000 km/12 meses — Troca de óleo do motor (viscosidade conforme motor específico — gasolina e diesel têm especificações diferentes) + filtro de óleo. | 10.000 km — Inspeção de suspensão dianteira (defeito característico da geração), freios e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de combustível (motores diesel). | 30.000 km — Velas de ignição (motores a gasolina/álcool). | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Fluido de arrefecimento — atenção redobrada no motor 4.3 V6. | 60.000 km — Verificação da tampa de válvulas e gaxetas (vazamento de óleo é comum). | Rodízio de pneus a cada 10.000 km.',
  },
]

// ─── S10 atual (2012+) — motor 2.8 Duramax turbodiesel ────────────────────────

const MACETES_ATUAL: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 2.8 Duramax: robusto, mas exige diesel limpo e filtros em dia',
    body: 'O motor 2.8 Duramax turbodiesel é reconhecido por durabilidade quando bem mantido, mas o sistema common rail moderno é sensível à qualidade do diesel. Abasteça sempre em postos de confiança, priorize diesel S10 e nunca deixe o tanque zerar completamente — sujeira do fundo do tanque é uma das causas mais comuns de problema no sistema de injeção.',
  },
  {
    severity: 'WARN',
    title: 'Erro de baixa pressão no rail (P0087): comece pelos filtros antes de suspeitar da bomba',
    body: 'Erros de baixa pressão no rail (código P0087) estão frequentemente ligados a filtros de combustível sujos — a causa mais comum reportada. Antes de assumir problema caro na bomba de alta pressão, garanta que os filtros de combustível e de ar estejam em dia e limpos; muitos casos se resolvem apenas com essa troca.',
  },
  {
    severity: 'WARN',
    title: 'Válvula wastegate do turbo: proteja a entrada de ar da sujeira',
    body: 'A válvula wastegate funciona por vácuo, acionada por uma válvula eletromagnética na parte traseira do motor com conexões expostas — entrada de ar sem proteção deixa sujeira entrar e travar a parte eletromagnética, causando perda de potência ou comportamento irregular do turbo. Mantenha a região limpa e verifique mangueiras de vácuo na revisão.',
  },
  {
    severity: 'OK',
    title: 'Filtro blow-by entupido é causa clássica de vazamento pela tampa de válvulas',
    body: 'O defeito clássico de vazamento pela tampa de válvulas nesta geração normalmente é causado pelo entupimento do filtro blow-by, que fica interno à tampa — geralmente por troca de óleo atrasada além do período recomendado. Manter o intervalo de óleo em dia previne boa parte desse problema, além de ser mais barato que resolver o vazamento depois.',
  },
  {
    severity: 'OK',
    title: 'Suspensão dianteira: comece a inspecionar já a partir de 30.000 km',
    body: 'Assim como na geração anterior, falhas na suspensão dianteira começam a aparecer a partir de cerca de 30.000 km — é um defeito característico da linha S10 que atravessou gerações. Inclua a suspensão dianteira em toda revisão, mesmo antes do intervalo programado pelo manual.',
  },
]

const PROBLEMAS_ATUAL: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Perda de potência repentina: raramente é "motor cansado" — geralmente é admissão, combustível ou escape',
    body: 'Muitos donos relatam perda de força repentina, dificuldade em subir ladeiras e resposta lenta ao acelerar. Segundo mecânicos especializados em diesel moderno, esses sintomas quase nunca são desgaste geral do motor — são falhas previsíveis e localizadas no sistema de admissão, combustível (filtros/bomba) ou escape (EGR, sensores). Vale diagnóstico específico por scanner antes de assumir que o motor está "no fim".',
  },
  {
    severity: 'WARN',
    title: 'Erro de baixa pressão no rail (P0087) e falha na bomba de alta pressão',
    body: 'Há relatos de troca de todos os filtros de combustível e ar, dos 4 bicos injetores e reparo na bomba de alta pressão para resolver perda de pressão no sistema common rail. É um problema que pode escalar em custo se não tratado logo na fase de "apenas filtros sujos" — diagnóstico precoce economiza dinheiro.',
  },
  {
    severity: 'WARN',
    title: 'Falha em mangueira do turbo — cerca de 1 em cada 10 relatos de donos',
    body: 'Falha em mangueira do sistema do turbo aparece em uma parcela relevante dos relatos de proprietários (cerca de 10%). Sintoma típico é ruído de assobio em aceleração ou perda de potência — mangueiras de silicone de reposição resolvem a maioria dos casos com custo relativamente baixo comparado a reparos no turbo em si.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pela tampa de válvulas por filtro blow-by entupido',
    body: 'Defeito clássico desta geração: vazamento de óleo pela tampa de válvulas causado pelo entupimento do filtro blow-by interno, geralmente ligado a troca de óleo além do período recomendado. Manter o óleo em dia é a prevenção mais eficaz e barata.',
  },
  {
    severity: 'WARN',
    title: 'Falhas na suspensão dianteira a partir de 30.000 km',
    body: 'Mesmo defeito característico da geração anterior da linha: falhas na suspensão dianteira começam a se manifestar a partir de aproximadamente 30.000 km. Inclua essa verificação em toda revisão, independentemente do intervalo programado pela concessionária.',
  },
]

const MANUTENCAO_ATUAL: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma S10 2.8 Duramax (Chevrolet + ajuste uso severo BR) — plano oficial vai até 120.000 km',
    body: '10.000 km/12 meses — Troca de óleo do motor (diesel, especificação do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão dianteira (defeito característico) e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000-30.000 km/2 anos — Filtro de combustível diesel — antecipe se notar perda de potência ou erro de pressão no rail. | 20.000 km/2 anos — Fluido de freio (verificação a cada revisão, troca obrigatória a cada 20.000 km/2 anos). | 60.000 km — Fluido de arrefecimento. | 60.000-100.000 km — Correia de sincronismo: 240.000 km em uso normal, mas reduza para até 100.000 km em uso severo (segundo orientação de manutenção preventiva do sistema). | 120.000 km — Lubrificante dos diferenciais dianteiro e traseiro (versões 4x4). | Rodízio de pneus a cada 10.000 km.',
  },
]

// ─── Tire Pressures ────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'S10',
    yearFrom: 1995,
    yearTo: 2011,
    tireSize: '205/70 R15 · 235/75 R15 (cabine dupla) · 245/70 R16 (versões mais equipadas)',
    frontPsi: 30,
    rearPsi: 32,
    frontPsiLoad: 32,
    rearPsiLoad: 40,
    sparePsi: 60,
    notes: 'Pressão traseira sobe bastante com carga na caçamba (versão pickup). Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
  {
    modelName: 'S10',
    yearFrom: 2012,
    yearTo: null,
    tireSize: '235/75 R15 · 245/70 R16 · 265/65 R17 (LTZ/High Country/Z71)',
    frontPsi: 34,
    rearPsi: 34,
    frontPsiLoad: 35,
    rearPsiLoad: 44,
    sparePsi: 60,
    notes: 'Pressão traseira aumenta bastante com carga na caçamba (até ~44 PSI). Etiqueta fica na coluna "B", abaixo do batente da porta do motorista. Verifique a cada 15 dias com pneus frios.',
  },
]

// ─── Maintenance Items ──────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // S10/Blazer antiga (1995-2011)
  { modelName: 'S10', yearFrom: 1995, yearTo: 2011, component: 'Óleo do motor (conforme motor: gasolina ou diesel)', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme o motor da sua unidade (2.2/2.4 gasolina, 2.5/2.8 diesel ou 4.3 V6).', priority: 'CRITICAL', order: 0 },
  { modelName: 'S10', yearFrom: 1995, yearTo: 2011, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'S10', yearFrom: 1995, yearTo: 2011, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em uso severo/estradas de terra.', priority: 'MEDIUM', order: 2 },
  { modelName: 'S10', yearFrom: 1995, yearTo: 2011, component: 'Filtro de combustível (motores diesel)', intervalKm: 20000, intervalMonths: 24, notes: 'Antecipe se notar perda de potência.', priority: 'HIGH', order: 3 },
  { modelName: 'S10', yearFrom: 1995, yearTo: 2011, component: 'Velas de ignição (motores gasolina/álcool)', intervalKm: 30000, intervalMonths: null, notes: 'Não se aplica aos motores diesel.', priority: 'MEDIUM', order: 4 },
  { modelName: 'S10', yearFrom: 1995, yearTo: 2011, component: 'Suspensão dianteira — inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Defeito característico da geração — folgas e desgaste de buchas a partir deste km.', priority: 'HIGH', order: 5 },
  { modelName: 'S10', yearFrom: 1995, yearTo: 2011, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'S10', yearFrom: 1995, yearTo: 2011, component: 'Tampa de válvulas — verificação de vazamento', intervalKm: 40000, intervalMonths: null, notes: 'Vazamento por gaxeta ressecada é queixa clássica desta geração.', priority: 'MEDIUM', order: 7 },
  { modelName: 'S10', yearFrom: 1995, yearTo: 2011, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Atenção redobrada no motor 4.3 V6, com histórico de superaquecimento.', priority: 'HIGH', order: 8 },
  { modelName: 'S10', yearFrom: 1995, yearTo: 2011, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce pressão traseira com carga na caçamba.', priority: 'MEDIUM', order: 9 },

  // S10 atual (2012+, Duramax)
  { modelName: 'S10', yearFrom: 2012, yearTo: null, component: 'Óleo do motor 2.8 Duramax (diesel)', intervalKm: 10000, intervalMonths: 12, notes: 'Siga a especificação exata do manual — motor common rail é sensível a óleo fora do padrão.', priority: 'CRITICAL', order: 0 },
  { modelName: 'S10', yearFrom: 2012, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo — atenção ao filtro blow-by interno da tampa de válvulas.', priority: 'HIGH', order: 1 },
  { modelName: 'S10', yearFrom: 2012, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em uso severo/estradas de terra.', priority: 'MEDIUM', order: 2 },
  { modelName: 'S10', yearFrom: 2012, yearTo: null, component: 'Filtro de combustível diesel', intervalKm: 30000, intervalMonths: 24, notes: 'Causa mais comum de erro de baixa pressão no rail (P0087). Antecipe se notar perda de potência.', priority: 'CRITICAL', order: 3 },
  { modelName: 'S10', yearFrom: 2012, yearTo: null, component: 'Suspensão dianteira — inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Defeito característico da linha S10, presente também nesta geração.', priority: 'HIGH', order: 4 },
  { modelName: 'S10', yearFrom: 2012, yearTo: null, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: 'Verificação a cada revisão, troca obrigatória a cada 20.000 km/2 anos.', priority: 'HIGH', order: 5 },
  { modelName: 'S10', yearFrom: 2012, yearTo: null, component: 'Correia de sincronismo + tensionador', intervalKm: 100000, intervalMonths: null, notes: 'Até 240.000 km em uso normal; reduza para 100.000 km em uso severo. Troque sempre o tensionador junto.', priority: 'HIGH', order: 6 },
  { modelName: 'S10', yearFrom: 2012, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 7 },
  { modelName: 'S10', yearFrom: 2012, yearTo: null, component: 'Lubrificante dos diferenciais (versões 4x4)', intervalKm: 120000, intervalMonths: null, notes: 'Dianteiro e traseiro.', priority: 'MEDIUM', order: 8 },
  { modelName: 'S10', yearFrom: 2012, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce pressão traseira com carga na caçamba.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'S10', yearFrom: 1995, yearTo: 2011, MACETES: MACETES_ANTIGA, PROBLEMAS: PROBLEMAS_ANTIGA, MANUTENCAO: MANUTENCAO_ANTIGA },
  { modelName: 'S10', yearFrom: 2012, yearTo: null, MACETES: MACETES_ATUAL, PROBLEMAS: PROBLEMAS_ATUAL, MANUTENCAO: MANUTENCAO_ATUAL },
]

async function main() {
  console.log('🚗 Seed Chevrolet S10...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Chevrolet', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Chevrolet', vehicleTypeId: carroType.id },
  })

  const distinctModelNames = [...new Set(BLOCKS.map((b) => b.modelName))]
  for (const modelName of distinctModelNames) {
    await prisma.tip.deleteMany({ where: { modelName } })
  }

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

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
    console.log(`  ✅ ${block.modelName} (${block.yearFrom ?? '?'}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }

  const distinctTpModelNames = [...new Set(TIRE_PRESSURES.map((t) => t.modelName))]
  for (const modelName of distinctTpModelNames) {
    await prisma.tirePressure.deleteMany({ where: { modelName } })
  }
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom ?? '?'}-${tp.yearTo ?? 'atual'})`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map((b) => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Chevrolet S10 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
