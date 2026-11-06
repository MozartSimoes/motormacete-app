/**
 * Seed Volkswagen Touareg — macetes, problemas, manutenção e calibragem
 * SUV grande de luxo, importado, baixo volume no Brasil. 1ª geração
 * (2004-2010, plataforma PL71 compartilhada com Audi Q7 e Porsche Cayenne
 * da mesma época) com motores 3.2 V6 e 4.2 V8 a gasolina, câmbio Tiptronic
 * e tração integral 4Motion permanente. 2ª geração (2011-2018, plataforma
 * MLB compartilhada novamente com Q7/Cayenne) com motor 3.6 FSI V6 e 4.2
 * V8 (inclusive versão R-Line 360cv), câmbio Tiptronic de 8 marchas. A
 * 3ª geração (2018+) NÃO teve lançamento oficial confirmado no Brasil —
 * não consta na tabela FIPE nacional, por isso não está coberta aqui.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-touareg
 *
 * Fontes: FIPE (parallelum.com.br/fipe), planetcarsz.com, autoevolution.com,
 *         alvaromatiassa.wordpress.com, motoragora.com.br, auto-doc.pt,
 *         4x4brasil.com.br (fórum), carroclub.com.br, encontracarros.com.br
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

// ---------------------------------------------------------------------------
// 1ª geração (2004-2010) — 3.2 V6 / 4.2 V8, Tiptronic 5/6 marchas, 4Motion
// ---------------------------------------------------------------------------

const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Plataforma compartilhada com Audi Q7 e Porsche Cayenne',
    body: 'O Touareg de 1ª geração nasceu na mesma plataforma PL71 do Audi Q7 e do Porsche Cayenne (fase inicial, até 2010). Muitas peças de suspensão, freio e motor têm equivalência entre os três — mecânicos especializados em Audi/Porsche costumam ter mais experiência prática nesse conjunto do que oficinas VW comuns.',
  },
  {
    severity: 'OK',
    title: 'Tração integral 4Motion permanente, não desligue por economia',
    body: 'O sistema 4Motion desse Touareg é permanente (não desconectável), com diferencial central Torsen. Não existe modo "2 rodas" para economizar combustível — é assim que o sistema foi projetado. Desconfie de oficinas que sugerem "desativar" a tração integral.',
  },
  {
    severity: 'WARN',
    title: 'Peças de importação: pesquise disponibilidade antes de comprar',
    body: 'Por ser um SUV importado de baixo volume, várias peças específicas (suspensão a ar, módulos eletrônicos, sensores) só chegam por importação e podem levar semanas. Antes de comprar um usado, pesquise com uma oficina especializada em VW premium/Audi a disponibilidade e o prazo de peças na sua região.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão a ar (quando equipado): inspeção preventiva evita gasto maior',
    body: 'Versões com suspensão pneumática (opcional em algumas configurações) tendem a apresentar vazamentos nos coxins e desgaste do compressor com o tempo, mesmo com poucos quilômetros rodados — a borracha resseca. Inspecione mangueiras e coxins periodicamente; identificar um vazamento pequeno é muito mais barato que trocar o compressor inteiro depois de uma pane.',
  },
  {
    severity: 'OK',
    title: 'V8 4.2 exige combustível de qualidade e troca de óleo rigorosa',
    body: 'O motor 4.2 V8 é sensível à qualidade do combustível e do óleo. Abasteça sempre em postos de confiança e não estique o intervalo de troca de óleo — é o motor mais caro de recuperar em caso de negligência nesse conjunto.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio Tiptronic: troca de fluido mesmo em "caixa selada"',
    body: 'A VW chamava esse câmbio automático de "manutenção vitalícia" na época, mas a experiência prática mostra que trocar o fluido (ATF) por volta de 60.000-80.000 km prolonga muito a vida útil da transmissão, especialmente em uso urbano com trânsito parado.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamentos e falhas no compressor da suspensão a ar',
    body: 'É um dos problemas mais documentados nesse Touareg: vazamentos nos coxins pneumáticos e falha do compressor, deixando o carro "torto" ou baixo de um lado ao ligar. Peças no Brasil custam caro (compressor pode passar de R$ 10 mil) — mecânicos relatam desgaste do compressor ao redor de 80.000-90.000 km em uso mais intenso.',
  },
  {
    severity: 'WARN',
    title: 'Falha na bomba de combustível causando desligamento repentino',
    body: 'Há relatos de desligamento súbito do motor em movimento associado a falha na bomba de combustível. Se o carro apresentar falhas de partida, oscilação de marcha lenta ou perda de força, não ignore — vale diagnóstico do sistema de alimentação antes que piore.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento e superaquecimento do fluido de câmbio',
    body: 'Vazamentos no câmbio automático levando a superaquecimento do fluido são relatados nesse período. Fique atento a manchas de óleo sob o carro e a trancos nas trocas de marcha — sinais de que o nível ou a qualidade do ATF precisam ser verificados com urgência.',
  },
  {
    severity: 'WARN',
    title: 'Vibração entre 50-60 km/h',
    body: 'Proprietários relatam vibração perceptível na faixa de 50-60 km/h, geralmente associada a desbalanceamento de rodas/cardã. Se notar esse padrão, peça balanceamento das quatro rodas e inspeção do eixo cardã/homocinéticas.',
  },
  {
    severity: 'DANGER',
    title: 'Avisos de falha de freio e ESP no painel',
    body: 'Há relatos de acendimento de avisos de falha de freio e piscar do ESP no painel nesse Touareg. Como se trata de sistema de segurança ativa, qualquer aviso desse tipo deve ser diagnosticado imediatamente em concessionária ou oficina especializada — não dirija ignorando o alerta.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Touareg 1ª geração 3.2 V6 / 4.2 V8 (uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de suspensão a ar (vazamentos, coxins) quando equipado. | 10.000 km — Inspeção de freios e pneus. | 20.000 km — Filtro de ar do motor e filtro de cabine. | 20.000 km — Verificação da bomba de combustível e mangueiras (histórico de falhas). | 40.000 km — Fluido de freio DOT 4. | 60.000-80.000 km — Fluido do câmbio automático (ATF), mesmo sendo anunciado como "vitalício". | 60.000 km — Fluido de arrefecimento e revisão do diferencial central Torsen. | A cada revisão — Checar avisos de painel relacionados a freio/ESP e vibração em rodas/cardã.',
  },
]

// ---------------------------------------------------------------------------
// 2ª geração (2011-2018) — 3.6 V6 FSI / 4.2 V8 (inclusive R-Line 360cv)
// ---------------------------------------------------------------------------

const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Plataforma MLB, de novo compartilhada com Q7 e Cayenne',
    body: 'A 2ª geração (2011-2018) usa a plataforma MLB do grupo Volkswagen, também usada pelo Audi Q7 e pelo Porsche Cayenne da época. Assim como na geração anterior, oficinas especializadas em Audi/Porsche costumam ter mais bagagem prática com esse conjunto mecânico do que uma oficina VW genérica.',
  },
  {
    severity: 'OK',
    title: 'Câmbio Tiptronic de 8 marchas: troca de fluido preventiva',
    body: 'Diferente do câmbio de 6 marchas da 1ª geração, esse Touareg usa Tiptronic de 8 marchas (ZF). Mesmo classificado como "manutenção reduzida" pelo fabricante, trocar o fluido por volta de 60.000-80.000 km ajuda a evitar trancos e prolonga a vida útil, especialmente em uso urbano.',
  },
  {
    severity: 'WARN',
    title: 'Versão R-Line 4.2 V8 360cv: peças e mão de obra de alto custo',
    body: 'A versão R-Line com motor 4.2 V8 de 360cv é rara no Brasil e tem custo de manutenção elevado — peças específicas dessa configuração podem exigir importação. Antes de comprar usada, confirme com uma oficina especializada a disponibilidade de peças para essa versão específica na sua região.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão a ar: inspeção preventiva a cada 30.000 km',
    body: 'Assim como na geração anterior, as versões com suspensão pneumática merecem inspeção preventiva de mangueiras e coxins a cada 30.000 km — identificar um pequeno vazamento cedo evita a troca do compressor completo, que é a falha mais cara desse sistema.',
  },
  {
    severity: 'OK',
    title: 'Motor 3.6 V6 FSI: injeção direta pede combustível de qualidade',
    body: 'O motor 3.6 V6 FSI usa injeção direta de combustível, mais sensível à qualidade da gasolina do que motores de injeção indireta. Abasteça em postos de confiança para reduzir o risco de acúmulo de carbono nas válvulas de admissão, problema típico de motores FSI/TSI em uso prolongado com combustível de baixa qualidade.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com Q7/Cayenne facilitam achar equivalências',
    body: 'Ao procurar peças (filtros, pastilhas, amortecedores), pesquise também pelo código de peça do Audi Q7 ou Porsche Cayenne do mesmo período — muitas são idênticas ou equivalentes e podem estar mais disponíveis ou com preço melhor em lojas especializadas nessas marcas.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão a ar: vazamentos e falha de compressor continuam',
    body: 'O mesmo padrão de falha da geração anterior se repete: vazamentos nos coxins pneumáticos e desgaste do compressor, deixando o carro baixo ou "torto" de um lado. Custo de peças no Brasil é alto e a disponibilidade depende de importação — inspeção preventiva é o melhor custo-benefício.',
  },
  {
    severity: 'WARN',
    title: 'Trancos e hesitação nas trocas do câmbio automático',
    body: 'Há relatos de trancos e hesitação ao trocar de marcha, muitas vezes ligados a fluido de câmbio degradado ou vencido. Se notar esse comportamento, a primeira verificação deve ser o nível e a condição do ATF antes de considerar reparo mais caro na transmissão.',
  },
  {
    severity: 'WARN',
    title: 'Falhas no sistema de chave presencial (keyless) e imobilizador',
    body: 'Proprietários relatam falhas ocasionais no sistema de entrada sem chave (keyless) e no imobilizador, dificultando a partida do motor. Mantenha a bateria da chave sempre em boa condição e, em caso de recusa de partida recorrente, peça diagnóstico do módulo de imobilizador.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de pressão dos pneus (TPMS) com falhas intermitentes',
    body: 'Há relatos de erros intermitentes no sistema de monitoramento de pressão dos pneus (TPMS), acendendo aviso no painel mesmo com os pneus calibrados corretamente. Confirme a calibragem manualmente antes de assumir defeito no sensor.',
  },
  {
    severity: 'WARN',
    title: 'Dificuldade e custo elevado para encontrar peças específicas',
    body: 'Por ser um modelo importado de baixo volume, mecânicos relatam dificuldade real para encontrar certas peças — algumas só disponíveis via importação direta, encarecendo e atrasando reparos. Vale mapear com antecedência uma oficina de confiança especializada em VW premium/Audi/Porsche antes de precisar dela com urgência.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Touareg 2ª geração 3.6 V6 / 4.2 V8 (uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, pneus e calibragem manual (TPMS pode falhar). | 15.000-20.000 km — Filtro de ar do motor e filtro de cabine. | 30.000 km — Inspeção da suspensão a ar (mangueiras, coxins, compressor) quando equipada. | 40.000 km — Fluido de freio DOT 4. | 60.000-80.000 km — Fluido do câmbio automático de 8 marchas (ATF). | 60.000 km — Fluido de arrefecimento. | A cada revisão — Testar sistema keyless/imobilizador e checar avisos falsos de TPMS.',
  },
]

// ---------------------------------------------------------------------------

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Touareg',
    yearFrom: 2004,
    yearTo: 2010,
    tireSize: '235/65 R17 · 255/55 R18 (conforme versão)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Estimativa para SUV grande dessa categoria — Touareg de 1ª geração não tem tabela pública consolidada. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista ou no manual do proprietário.',
  },
  {
    modelName: 'Touareg',
    yearFrom: 2011,
    yearTo: 2018,
    tireSize: '235/60 R18 · 265/50 R19 (R-Line) conforme versão',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 36,
    rearPsiLoad: 39,
    sparePsi: 60,
    notes: 'Estimativa para SUV grande dessa categoria — confirme sempre o valor exato na etiqueta da coluna da porta do motorista ou no manual do proprietário, pois varia conforme aro e versão.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Touareg', yearFrom: 2004, yearTo: 2010, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 3.2 V6 ou 4.2 V8 — use sempre a especificação exata do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Touareg', yearFrom: 2004, yearTo: 2010, component: 'Suspensão a ar — inspeção de vazamentos', intervalKm: 10000, intervalMonths: 12, notes: 'Falha mais cara e mais documentada do modelo. Quando equipado.', priority: 'HIGH', order: 1 },
  { modelName: 'Touareg', yearFrom: 2004, yearTo: 2010, component: 'Fluido do câmbio automático (ATF)', intervalKm: 80000, intervalMonths: 60, notes: 'Anunciado como "vitalício", mas troca preventiva prolonga a vida útil.', priority: 'HIGH', order: 2 },
  { modelName: 'Touareg', yearFrom: 2004, yearTo: 2010, component: 'Bomba de combustível — inspeção', intervalKm: 40000, intervalMonths: 24, notes: 'Histórico de falhas causando desligamento repentino do motor.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Touareg', yearFrom: 2004, yearTo: 2010, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 4 },
  { modelName: 'Touareg', yearFrom: 2004, yearTo: 2010, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Volkswagen.', priority: 'MEDIUM', order: 5 },

  { modelName: 'Touareg', yearFrom: 2011, yearTo: 2018, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 3.6 V6 FSI ou 4.2 V8 — use sempre a especificação exata do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Touareg', yearFrom: 2011, yearTo: 2018, component: 'Suspensão a ar — inspeção de vazamentos', intervalKm: 30000, intervalMonths: 24, notes: 'Mangueiras, coxins e compressor. Quando equipado.', priority: 'HIGH', order: 1 },
  { modelName: 'Touareg', yearFrom: 2011, yearTo: 2018, component: 'Fluido do câmbio automático de 8 marchas (ATF)', intervalKm: 80000, intervalMonths: 60, notes: 'Antecipe se notar trancos ou hesitação nas trocas.', priority: 'HIGH', order: 2 },
  { modelName: 'Touareg', yearFrom: 2011, yearTo: 2018, component: 'Filtro de ar do motor e filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Reduza o intervalo em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Touareg', yearFrom: 2011, yearTo: 2018, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 4 },
  { modelName: 'Touareg', yearFrom: 2011, yearTo: 2018, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Volkswagen.', priority: 'MEDIUM', order: 5 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Touareg',
    yearFrom: 2004,
    yearTo: 2010,
    MACETES: MACETES_G1,
    PROBLEMAS: PROBLEMAS_G1,
    MANUTENCAO: MANUTENCAO_G1,
  },
  {
    modelName: 'Touareg',
    yearFrom: 2011,
    yearTo: 2018,
    MACETES: MACETES_G2,
    PROBLEMAS: PROBLEMAS_G2,
    MANUTENCAO: MANUTENCAO_G2,
  },
]

async function main() {
  console.log('🚗 Seed Volkswagen Touareg...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Touareg', brandId: brand.id } },
    update: {},
    create: { name: 'Touareg', brandId: brand.id },
  })

  await prisma.tip.deleteMany({ where: { modelName: 'Touareg' } })

  for (const block of BLOCKS) {
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
    console.log(`  ✅ ${block.modelName} (${block.yearFrom ?? '—'}-${block.yearTo ?? '—'}): ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: 'Touareg' } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom ?? '—'}-${tp.yearTo ?? '—'})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Touareg' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volkswagen Touareg concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
