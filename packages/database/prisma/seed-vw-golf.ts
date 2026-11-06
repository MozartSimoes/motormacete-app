/**
 * Seed Volkswagen Golf — macetes, problemas, manutenção e calibragem de pneus
 * Ícone da VW no Brasil por 25 anos seguidos (chegou como importado GTI em
 * 1994, saiu de linha em dezembro de 2020). 3 blocos:
 *  - 1994-1999 (Mk3): GTI 1.8 Turbo/2.0 importado desde 1994, GL/GLX
 *    1.8/2.0 8V nacionalizados a partir de 1995/1999, Variant, raras
 *    unidades VR6 2.8. Motor família AP/EA827.
 *  - 1999-2014 (Mk4, incl. facelift Mk4.5 de 2007 — o único Golf com
 *    design/desenvolvimento feito no Brasil): 1.6/2.0 8V, 1.8T 20V Turbo
 *    (150-180cv), depois Total Flex 1.6 (2006-2014). Produção nacional
 *    na Planta Anchieta, São Bernardo do Campo/SP. Mk5 e Mk6 nunca
 *    tiveram venda oficial da VW no Brasil (só unidades importadas de
 *    forma avulsa/rara) — por isso não há bloco dedicado a eles aqui.
 *  - 2014-2020 (Mk7): importado em 2014, nacionalizado a partir de 2015.
 *    1.4 TSI 140cv (EA211) com câmbio manual raro ou DSG7 de embreagem
 *    seca (DQ200) — defeito crônico de mecatrônica amplamente
 *    documentado, com recall em outros países mas não no Brasil. Entrada
 *    de linha com 1.6 MSI aspirado (2016) e depois 1.0 200 TSI turbo
 *    (2018). GTI com 2.0 TSI (EA888) e câmbio DSG6 de embreagem molhada,
 *    mais robusto que o DSG7. Facelift 2018 "250 TSI". Encerrou a carreira
 *    no Brasil em dezembro de 2020 com a versão híbrida GTE (2019-2020).
 * Execute: pnpm --filter @motormacete/database db:seed:vw-golf
 *
 * Fontes: car.blog.br, autoentusiastas.com.br, cnnbrasil.com.br,
 *         en.wikipedia.org (Golf Mk4/Mk6/Mk7), autossegredos.com.br,
 *         flatout.com.br, noticiasautomotivas.com.br, oficinabrasil.com.br,
 *         reclameaqui.com.br, farolalto.com.br, mobiauto.com.br,
 *         parallelum.com.br/fipe (tabela FIPE)
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── 1994-1999 — Mk3: GTI 1.8 Turbo/2.0 importado, GL/GLX 1.8/2.0 8V, VR6 ──
const MACETES_94: TipInput[] = [
  { severity: 'OK', title: 'Motor família AP/EA827: peça abundante e barata', body: 'Os motores 1.8 e 2.0 8V dessa geração são da família AP (AP/EA827), a mesma usada em Gol, Voyage, Santana e Quantum da época. Isso significa peça de mecânica básica fácil de achar e barata, inclusive em desmanches, mesmo décadas depois.' },
  { severity: 'OK', title: 'GTI chegou importado em 1994, antes da produção nacional', body: 'O Golf GTI foi o primeiro a chegar ao Brasil, importado a partir de 1994. As versões GL/GLX de acesso vieram na sequência, e a nacionalização da linha começou por volta de 1999 — por isso um Golf 1994-1998 tende a ser um exemplar importado, com particularidades de manutenção (peça de acabamento e elétrica pode ser mais difícil de achar que a de motor).' },
  { severity: 'WARN', title: 'VR6 2.8: raridade com manutenção mais cara e especializada', body: 'O Golf VR6 2.8 (motor V6 "estreito") vendido em número muito pequeno no Brasil é uma raridade hoje. Peça de motor e injeção é bem mais cara e difícil de achar que a dos 1.8/2.0 4 cilindros — procure oficina especializada em VR6 antes de comprar ou fazer manutenção grande.' },
]
const PROBLEMAS_94: TipInput[] = [
  { severity: 'WARN', title: 'Corrosão e ferrugem em pontos típicos de carro com 25-30 anos', body: 'Nessa idade, o ponto de atenção mais comum não é defeito de projeto, é desgaste natural: ferrugem em soleiras, para-lamas e assoalho, vazamento de óleo por retentor ressecado e folga em buchas de suspensão. Inspecione bem esses pontos antes de comprar um exemplar dessa geração.' },
  { severity: 'WARN', title: 'Sistema elétrico (vidro elétrico, trava) sujeito a falhas pela idade', body: 'Motor de vidro elétrico e atuadores de trava central são pontos comuns de falha em unidades muito antigas, mais por idade dos componentes que por defeito de projeto. Considerado normal para a idade, não indica carro malcuidado.' },
]
const MANUTENCAO_94: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Golf 1994-1999 (Mk3, motores AP 1.8/2.0/1.8T/VR6)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão e vazamentos. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada + tensor + bomba d\'água (motor interferente, não atrase). | GTI/VR6 — use sempre oficina com experiência nesses motores para diagnóstico e ajuste de injeção/ignição.' },
]

// ─── 1999-2014 — Mk4 (facelift Mk4.5 em 2007), nacional em SBC ────────────
const MACETES_99: TipInput[] = [
  { severity: 'OK', title: 'Produção nacional na Planta Anchieta (São Bernardo do Campo/SP)', body: 'Diferente do Mk3 (que começou importado), o Golf Mk4 foi fabricado nacionalmente na Planta Anchieta, o que ajudou a manter peça de reposição mais disponível e acessível durante os 15 anos de produção dessa geração no Brasil.' },
  { severity: 'OK', title: 'GTI Mk4.5 (2007): único Golf com design e desenvolvimento feitos no Brasil', body: 'Para dar continuidade à linha esportiva sem trazer o caro Mk5 global, a VW do Brasil desenvolveu localmente o facelift do GTI a partir de 2007 (Mk4.5) — um caso único na história do Golf. Fique atento a esse detalhe na hora de comprar peça de carroceria/acabamento: nem tudo é intercambiável com o GTI Mk4 original europeu.' },
  { severity: 'OK', title: 'Motor 1.8T 20V Turbo: forte, mas exige óleo em dia e sem "carona" de manutenção adiada', body: 'O 1.8T 20V Turbo (150cv, depois 180cv a partir de 2002) é um motor robusto e querido até hoje por preparadores, mas turbo sofre muito mais com óleo velho ou de baixa qualidade que motor aspirado. Nunca atrase a troca de óleo nesse motor.' },
  { severity: 'WARN', title: 'Total Flex 1.6 (2006-2014): ajuste de injeção depende de mecânico com prática em flex', body: 'A versão flex-fuel do 1.6 chegou em 2006 mantendo a base do motor AT/AP. Para rodar bem em álcool sem perda de desempenho ou dificuldade de partida a frio, prefira revisar em oficina com bastante prática em motores flex dessa família, não só em Golf especificamente.' },
]
const PROBLEMAS_99: TipInput[] = [
  { severity: 'WARN', title: 'Tensor da correia dentada do 1.8 Turbo pode vazar óleo pelo pistão de atuação', body: 'No motor 1.8T, o rolete tensionador da correia dentada tem histórico de vazamento de óleo pelo pistão de atuação. Ao fazer a troca da correia dentada, é recomendado orçar a troca do tensor junto, não só da correia — economiza uma segunda intervenção.' },
  { severity: 'DANGER', title: 'Bomba d\'água travada pode quebrar a correia dentada e danificar o motor', body: 'Há casos documentados de rotor da bomba d\'água que trava e provoca a quebra da carcaça e, em sequência, da própria correia dentada — o que pode causar dano grave ao motor (motor é interferente: válvula dobrada, pistão quebrado). Por isso a bomba d\'água deve sempre ser trocada junto com a correia dentada, mesmo que pareça estar funcionando.' },
  { severity: 'WARN', title: 'Itens elétricos (vidro, trava, sensores) mais sujeitos a falha com o tempo', body: 'Como em qualquer VW dessa era, componentes elétricos (motor de vidro, atuador de trava, sensores) tendem a apresentar falha intermitente com o passar dos anos. Não é exclusividade do Golf, mas vale inspecionar bem em unidade usada mais antiga dessa geração.' },
]
const MANUTENCAO_99: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Golf 1999-2014 (Mk4/Mk4.5, motores 1.6/2.0 8V, 1.8T 20V, 1.6 Total Flex)', body: '10.000 km — Troca de óleo do motor + filtro (essencial no 1.8T Turbo). | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada + tensor + bomba d\'água juntos (motor interferente). | Flex — prefira álcool/gasolina de posto de confiança para evitar problema de partida a frio.' },
]

// ─── 2014-2020 — Mk7, importado 2014-2015, nacional a partir de 2015 ──────
const MACETES_14: TipInput[] = [
  { severity: 'OK', title: 'GTI usa DSG6 de embreagem molhada — mais robusto que o DSG7 seco do 1.4 TSI', body: 'O Golf GTI (2.0 TSI) usa câmbio DSG de 6 marchas com embreagem molhada (banhada a óleo), tecnicamente mais tolerante a trânsito parado e menos sujeito ao superaquecimento que o DSG7 de embreagem seca usado no 1.4 TSI das versões de entrada. Ao comprar usado, vale saber qual dos dois câmbios seu Golf tem — não são o mesmo tipo de DSG.' },
  { severity: 'WARN', title: 'DSG7 (1.4 TSI): evite ficar "pisando na embreagem" em trânsito parado', body: 'O câmbio DSG7 de dupla embreagem seca (DQ200) do 1.4 TSI sofre mais com uso urbano de trânsito parado e engavetado, por gerar mais calor na embreagem seca do que o DSG6 molhado. Evite manter o pé no freio com o carro "segurando" em subida ou ficar muito tempo em ponto morto com o motor ligado em trânsito parado; prefira deixar em neutro (N) quando parado por mais tempo.' },
  { severity: 'OK', title: '1.0 TSI 200 (2018+): motor pequeno turbo de entrada, troca de óleo é o item mais crítico', body: 'A partir de 2018 a versão de entrada passou a usar o motor 1.0 turbo (nomeado "200 TSI" pela VW, referência ao torque em altitude/etanol), substituindo o 1.6 MSI aspirado. Por ser um motor pequeno sob pressão de turbo, a troca de óleo em dia é ainda mais importante que em motor aspirado equivalente.' },
  { severity: 'OK', title: 'Golf Mk7 nacional a partir de 2015, mas chegou importado já em 2014', body: 'As primeiras unidades do Golf Mk7 vendidas no Brasil em 2014 vieram importadas; a produção nacional começou em 2015. Isso pode afetar disponibilidade de algumas peças de acabamento específicas do lote importado — verifique o ano de fabricação exato, não só o modelo, ao comprar peça.' },
]
const PROBLEMAS_14: TipInput[] = [
  { severity: 'DANGER', title: 'Mecatrônica do DSG7 (DQ200): defeito crônico documentado, recall em outros países mas não no Brasil', body: 'O câmbio DSG7 de embreagem seca (DQ200) tem um defeito crônico amplamente documentado na unidade de mecatrônica: perda de pressão hidráulica por trinca no acumulador de pressão, causando sintomas como perda de força repentina, marcha "escorregando", engasgo e, em casos extremos, perda total de tração em movimento. A Volkswagen já fez recall desse problema em países como EUA, Japão, China, Austrália, Nova Zelândia e Malásia — mas não no Brasil até o momento. Se seu Golf 1.4 TSI apresentar esses sintomas, não ignore: procure a concessionária e documente tudo, é falha de projeto reconhecida internacionalmente.' },
  { severity: 'WARN', title: 'GTI 2.0 TSI (EA888): desgaste do tensor da corrente de comando é queixa recorrente', body: 'O motor 2.0 TSI (família EA888) do GTI usa corrente de comando em vez de correia — não tem troca preventiva programada, mas há relatos recorrentes de desgaste do tensor da corrente que gera folga e ruído característico ("chocalho") no motor, mais comum a partir de alta quilometragem. Ruído metálico na partida a frio ou marcha lenta irregular merece diagnóstico imediato, incluindo checagem de código de falha na central eletrônica.' },
  { severity: 'WARN', title: 'Fim das operações do modelo no Brasil deixa suporte pós-venda mais incerto', body: 'Com o fim da produção do Golf no Brasil em dezembro de 2020, a disponibilidade de peça específica (principalmente eletrônica e acabamento) tende a ficar mais escassa com o tempo. Vale já ter um mecânico de confiança especializado em VW/grupo MQB antes de precisar de reparo maior.' },
]
const MANUTENCAO_14: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Golf 2014-2020 (Mk7, 1.0 TSI/1.4 TSI/1.6 MSI/2.0 TSI GTI/GTE híbrido)', body: '10.000 km — Troca de óleo do motor + filtro (essencial nos motores turbo 1.0/1.4/2.0 TSI). | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000 km — Óleo do câmbio DSG (6 ou 7 marchas conforme a versão) — não pule, mesmo sendo "câmbio automático sem troca". | Qualquer tranco, engasgo ou perda de força no DSG7 — pare e leve à concessionária, pode ser o defeito conhecido de mecatrônica.' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Golf', yearFrom: 1994, yearTo: 1999, MACETES: MACETES_94, PROBLEMAS: PROBLEMAS_94, MANUTENCAO: MANUTENCAO_94 },
  { modelName: 'Golf', yearFrom: 1999, yearTo: 2014, MACETES: MACETES_99, PROBLEMAS: PROBLEMAS_99, MANUTENCAO: MANUTENCAO_99 },
  { modelName: 'Golf', yearFrom: 2014, yearTo: 2020, MACETES: MACETES_14, PROBLEMAS: PROBLEMAS_14, MANUTENCAO: MANUTENCAO_14 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Golf', yearFrom: 1994, yearTo: 1999, tireSize: '175/70 R13 · 185/60 R14 (GTI/VR6, referência)', frontPsi: 28, rearPsi: 28, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Valor de referência — confirme sempre na etiqueta da coluna da porta do motorista.' },
  { modelName: 'Golf', yearFrom: 1999, yearTo: 2014, tireSize: '185/65 R14 · 195/55 R15 (GTI, referência)', frontPsi: 30, rearPsi: 30, frontPsiLoad: 32, rearPsiLoad: 35, sparePsi: 60, notes: 'Valor de referência — confirme sempre na etiqueta da coluna da porta do motorista.' },
  { modelName: 'Golf', yearFrom: 2014, yearTo: 2020, tireSize: '195/60 R16 (Comfortline/Highline) · 225/45 R17 (GTI, referência)', frontPsi: 32, rearPsi: 32, frontPsiLoad: 34, rearPsiLoad: 36, sparePsi: 60, notes: 'Confirme sempre o valor exato na etiqueta da coluna da porta do motorista — varia conforme aro e versão.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Golf', yearFrom: 1994, yearTo: 1999, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Golf', yearFrom: 1994, yearTo: 1999, component: 'Correia dentada + tensor + bomba d\'água', intervalKm: 60000, intervalMonths: 48, notes: 'Motor interferente — troque os três juntos.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Golf', yearFrom: 1999, yearTo: 2014, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Essencial no 1.8T Turbo.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Golf', yearFrom: 1999, yearTo: 2014, component: 'Correia dentada + tensor + bomba d\'água', intervalKm: 60000, intervalMonths: 48, notes: 'Motor interferente — troque os três juntos, evita quebra em cascata.', priority: 'CRITICAL', order: 3 },
  { modelName: 'Golf', yearFrom: 1999, yearTo: 2014, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'Golf', yearFrom: 2014, yearTo: 2020, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Essencial nos motores turbo 1.0/1.4/2.0 TSI.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Golf', yearFrom: 2014, yearTo: 2020, component: 'Óleo do câmbio DSG (6 ou 7 marchas)', intervalKm: 60000, intervalMonths: 48, notes: 'Não pule mesmo sendo automático — antecipe se notar tranco.', priority: 'HIGH', order: 6 },
  { modelName: 'Golf', yearFrom: 2014, yearTo: 2020, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'Golf', yearFrom: 2014, yearTo: 2020, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
]

async function main() {
  console.log('🚗 Seed Volkswagen Golf...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Golf', brandId: brand.id } },
    update: {}, create: { name: 'Golf', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Golf' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Golf' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Golf' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Volkswagen Golf concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
