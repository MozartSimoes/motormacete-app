/**
 * Seed Land Rover Range Rover Velar — macetes, problemas, manutenção e calibragem
 * NÃO inclui o Range Rover "grande" (flagship), o Range Rover Sport nem o
 * Range Rover Evoque — são modelos mecanicamente distintos, cada um com seu
 * próprio arquivo de seed e seu próprio modelName.
 * O Velar (plataforma L560) chegou ao mercado global em 2017/2018, posicionado
 * entre o Evoque e o Range Rover Sport em tamanho e preço — o nome "Velar" é
 * uma homenagem ao codinome usado nos protótipos do Range Rover original de
 * 1969. Até o momento existe uma única geração, com um facelift em 2021
 * (ano-modelo) que trocou a central multimídia Touch Pro Duo (tela dupla)
 * pela Pivi Pro (tela única) e introduziu a versão híbrida plug-in P400e.
 * Execute: npx tsx prisma/seed-landrover-rangerover-velar.ts
 *
 * Fontes: autopapo.com.br, landrover.com.br (comunicados de recall),
 *         clickpetroleoegas.com.br, reclameaqui.com.br, velarforums.co.uk,
 *         royalrebuilds.co.uk, apexengines.co.uk, go-parts.com,
 *         magsuspensoes.com.br, aerosus.pt, opinautos.com.br,
 *         parallelum.com.br/fipe (tabela FIPE, marca Land Rover)
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 2018-2020 (pré-facelift — Touch Pro Duo, Ingenium 2.0 ou V6 3.0, topo V8 5.0 SVAutobiography) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Velar fica entre o Evoque e o Range Rover Sport — não confunda com o Range Rover "grande" nem com o Sport',
    body: 'O Velar é um modelo próprio (plataforma L560), posicionado entre o Evoque (compacto) e o Range Rover Sport em tamanho e preço. Ele não compartilha plataforma nem boa parte da mecânica com o Range Rover flagship ou com o Sport — se o problema que você está pesquisando veio de um desses outros modelos, procure o conteúdo específico deles.',
  },
  {
    severity: 'OK',
    title: 'Tela travada no Touch Pro Duo? Tente reiniciar antes de levar à concessionária',
    body: 'A central multimídia de tela dupla (Touch Pro Duo) usada até o facelift tem histórico de travar, apagar ou reiniciar sozinha. Segurar os botões físicos de volume e liga/desliga por cerca de 20 segundos costuma reiniciar o sistema e resolver o travamento pontual. Se o problema for recorrente, unidades fabricadas antes do ano-modelo 2020 se beneficiam da atualização de software 18D (ou posterior) feita na concessionária.',
  },
  {
    severity: 'OK',
    title: 'Motor Ingenium é compartilhado com vários Jaguar e Land Rover da mesma época',
    body: 'O motor 2.0 turbo Ingenium (gasolina ou diesel) usado no Velar é o mesmo motor, com pequenas variações, usado no Jaguar F-Pace, XE e XF e em outros Land Rover contemporâneos (Discovery Sport, Evoque). Isso amplia bastante a rede de oficinas especializadas e a disponibilidade de peça — vale pesquisar por essas referências cruzadas.',
  },
  {
    severity: 'OK',
    title: 'Chassi do Velar no Brasil começa com "SALYA" — útil para conferir recall pelo VIN completo',
    body: 'Os chassis de Velar comercializados no Brasil observados em comunicados oficiais de recall começam com o prefixo "SALYA". Ao consultar a situação de recall do seu carro em www.landrover.com.br/ownership/recall, tenha o número de chassi completo em mãos — está na coluna da porta do motorista e no documento do veículo.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL confirmado — parafuso da polia do virabrequim pode quebrar',
    body: 'A Land Rover confirmou recall no Brasil para o Velar (ano-modelo 2019, chassi SALYA2BV9KA202359, fabricado entre 10/10/2018 e 19/12/2018) por especificação incorreta do parafuso da polia central do virabrequim. Se o parafuso quebrar, a polia passa a oscilar e falha, podendo danificar o motor e comprometer o comportamento do veículo — risco de perda de controle e acidente. Reparo gratuito, cerca de 84 minutos. Confira o chassi em www.landrover.com.br/ownership/recall ou pelo 0800 012 2733.',
  },
  {
    severity: 'WARN',
    title: 'RECALL confirmado — atuador do climatizador pode embaçar o para-brisa',
    body: 'Recall confirmado no Brasil para 391 unidades do Velar (ano-modelo 2018, fabricadas entre 12/04/2017 e 17/11/2017) por falha no braço atuador do sistema de climatização que controla a saída de ar. Em temperaturas baixas, o para-brisa pode embaçar de forma a comprometer a visibilidade. Reparo gratuito (troca do atuador + reprogramação do software do ar-condicionado), cerca de 144 minutos. Nenhum acidente relacionado foi registrado no Brasil, mas vale confirmar o chassi.',
  },
  {
    severity: 'WARN',
    title: 'RECALL confirmado — cotovelo plástico do sistema de arrefecimento pode romper e vazar',
    body: 'Recall de maio/2023 para Velar com chassi entre PA356749 e PA356810 (ano-modelo 2018 a 2023, fabricados entre 28/03/2017 e 05/01/2023): o cotovelo plástico da tubulação de arrefecimento montado no motor pode não resistir a um superaquecimento súbito, rompendo e vazando líquido de arrefecimento. Reparo gratuito na concessionária — troca do cotovelo e do tubo de alimentação de refrigeração do motor.',
  },
  {
    severity: 'WARN',
    title: 'Touch Pro Duo: tela travando, apagando ou reiniciando é a reclamação eletrônica mais comum',
    body: 'Entre os problemas mais reportados por donos está a tela superior do Touch Pro Duo ficando preta e não recolhendo ao desligar o carro, com a tela inferior piscando, ou ambas as telas apagando durante a condução (com o carro seguindo funcionando normalmente). Não é reparável pelo usuário — a solução definitiva costuma ser troca da unidade de controle na concessionária, muitas vezes coberta por garantia.',
  },
  {
    severity: 'WARN',
    title: 'Motor 2.0 Ingenium diesel: corrente de comando/tensor e diluição de óleo, mais comum em unidades pré-2020',
    body: 'As primeiras unidades do motor 2.0 diesel Ingenium tiveram problema documentado de corrente de comando e tensor, além de diluição do óleo por combustível não queimado (agravada por trajetos curtos). A JLR atualizou a corrente/tensor a partir do final de 2019, com redução visível de casos a partir daí. Trocar o óleo dentro do intervalo (nunca esticar) reduz bastante o risco nas unidades mais antigas.',
  },
  {
    severity: 'WARN',
    title: 'Motor 2.0 diesel Ingenium: solenoide de resfriamento do pistão pode falhar por vazamento no alojamento do termostato',
    body: 'Defeito documentado no 2.0 diesel Ingenium: vazamento de líquido de arrefecimento pelo alojamento do termostato pode atingir e danificar o solenoide/conector da válvula de resfriamento do pistão, gerando falha do componente. Ao notar consumo de líquido de arrefecimento sem vazamento visível no chão, vale investigar esse ponto.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão a ar: vazamento nas bolsas de ar é a causa mais comum de falha do compressor',
    body: 'Assim como no restante da família Range Rover, o ponto mais frágil da suspensão a ar costuma ser a bolsa (mola pneumática), não o compressor em si. Ao notar o carro "baixando" sozinho, demorando para nivelar ou som de ar vazando, verifique primeiro as bolsas — trocar só o compressor sem resolver o vazamento faz o componente novo falhar rápido de novo.',
  },
  {
    severity: 'WARN',
    title: 'Reclamações recorrentes de eletrônica, farol alto automático e ruído na coluna de direção',
    body: 'No Reclame Aqui aparecem relatos recorrentes de tela travando e derrubando junto áudio/navegação/climatização, farol alto automático acendendo atrás de outros carros no trânsito, e barulho seco ("estalo") na coluna ou caixa de direção. Vale levar à revisão com diagnóstico eletrônico completo (módulos e conectores) caso qualquer um desses sintomas apareça.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Velar 2018-2020 (Ingenium 2.0 turbo gasolina/diesel ou V6 3.0 gasolina/SDV6 diesel, topo V8 5.0 SVAutobiography)',
    body: '15.000 km — Troca de óleo do motor sintético + filtro, não atrasar (diluição de óleo é problema documentado no 2.0 diesel). | 20.000 km — Verificação da suspensão a ar (altura em repouso, ruído do compressor, estado das bolsas). | 20.000 km — Sistema de arrefecimento (mangueiras, cotovelo plástico — ponto de recall). | Sempre — reset/atualização de software (18D ou posterior) se a tela do Touch Pro Duo travar com frequência. | 40.000 km — Fluido de freio e filtro de ar/cabine. | Assim que possível — conferir os 3 recalls confirmados (parafuso da polia, atuador do climatizador, cotovelo de arrefecimento) pelo chassi.',
  },
]

// ---------- 2021-atual (facelift — central Pivi Pro, chegada do híbrido plug-in P400e) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Facelift trocou a Touch Pro Duo pela central única Pivi Pro — infotainment bem mais estável',
    body: 'A partir do facelift (ano-modelo 2021 em diante) o Velar passou a usar a central Pivi Pro, com tela única e resposta mais rápida, substituindo o sistema de tela dupla Touch Pro Duo. A maior parte das reclamações de tela travando/apagando reportadas na versão pré-facelift não se aplica a essa central.',
  },
  {
    severity: 'OK',
    title: 'P400e (plug-in híbrido): bateria de 19,2 kWh, até 64 km no elétrico puro',
    body: 'A versão híbrida plug-in P400e (motor 2.0 turbo + motor elétrico) usa bateria de 19,2 kWh, com autonomia elétrica de até 64 km em ciclo misto. Carregador AC de 7 kW carrega de 0 a 100% em cerca de 2h30; em carregador DC de 50 kW dá para ir de 0 a 80% em 30 minutos. Não existe modo "Charge" para carregar a bateria enquanto dirige — a recarga em movimento acontece via frenagem regenerativa e pelo motor a combustão em modo híbrido.',
  },
  {
    severity: 'OK',
    title: 'Corrente/tensor do Ingenium já vem atualizado de fábrica nessa geração',
    body: 'A atualização de corrente de comando e tensor que a JLR introduziu no motor 2.0 Ingenium a partir do final de 2019 já está presente de fábrica nas unidades dessa geração facelift, reduzindo bastante o risco do problema documentado nas unidades mais antigas. Mesmo assim, não vale a pena atrasar a troca de óleo.',
  },
  {
    severity: 'OK',
    title: 'Motor Ingenium segue compartilhado com Jaguar F-Pace/XE/XF e outros Land Rover da família',
    body: 'A mesma vantagem de rede de peças e oficina especializada do período pré-facelift continua valendo: o motor 2.0 Ingenium (gasolina, diesel ou a base do híbrido P400e) é compartilhado com vários Jaguar e Land Rover contemporâneos.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'RECALL do cotovelo de arrefecimento também cobre unidades desta geração até ano-modelo 2023',
    body: 'O recall do cotovelo plástico do sistema de arrefecimento (chassi entre PA356749 e PA356810, fabricação até 05/01/2023) cobre veículos de ano-modelo 2018 a 2023 — ou seja, alcança parte das unidades já com a central Pivi Pro. Mesmo em um Velar "mais novo" da leva facelift, vale confirmar o chassi em www.landrover.com.br/ownership/recall.',
  },
  {
    severity: 'OK',
    title: 'Recall global de conector de airbag (Defender/Discovery/Range Rover) NÃO lista o Velar até o momento',
    body: 'A Land Rover confirmou recall no Brasil relacionado a corrosão no conector do airbag do motorista (mesma campanha que atingiu 250.857 unidades nos EUA), mas os comunicados até agora citam apenas Defender, Discovery e Range Rover (o "grande") como modelos afetados — o Velar não aparece na lista de nomes divulgada. Como o processo no Brasil ainda está em andamento junto aos órgãos reguladores, vale checar periodicamente o chassi no site oficial, mas não há confirmação de que essa campanha específica se estenda ao Velar.',
  },
  {
    severity: 'WARN',
    title: 'P400e: motor a combustão ligando mesmo com bateria cheia após visita à concessionária',
    body: 'Alguns donos relatam que, após uma revisão ou atualização feita na concessionária, o motor a combustão do P400e passa a ligar toda vez que o carro é ligado, mesmo com a bateria de tração totalmente carregada — quando antes era possível rodar só no elétrico dentro da cidade. Se notar essa mudança de comportamento, peça para verificarem a programação do sistema híbrido.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão a ar segue sendo ponto de atenção nessa geração',
    body: 'O mesmo padrão de falha por vazamento nas bolsas de ar (mola pneumática) da geração pré-facelift se repete nessa geração. Diagnóstico precoce ao notar nivelamento irregular ou ruído de ar vazando evita reparo mais caro no compressor depois.',
  },
  {
    severity: 'WARN',
    title: 'Eletrônica e módulos seguem aparecendo em reclamações de donos',
    body: 'Assim como na versão pré-facelift, seguem aparecendo relatos de câmeras e sensores parando de funcionar de forma intermitente e de ruído seco na coluna/caixa de direção. Vale diagnóstico eletrônico completo (módulos e conectores) na revisão anual, mesmo sem sintoma aparente.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Velar 2021+ (Ingenium 2.0 turbo gasolina/diesel, V6 3.0 ou híbrido plug-in P400e)',
    body: '15.000 km — Troca de óleo do motor + filtro. | 20.000 km — Verificação da suspensão a ar (altura em repouso, ruído do compressor, estado das bolsas). | 20.000 km — Sistema de arrefecimento (mangueiras, cotovelo plástico — recall alcança até ano-modelo 2023). | P400e: sempre — inspeção visual do cabo de recarga e da tomada de carregamento, evitar deixar a bateria de tração descarregada por longos períodos. | Anual — Diagnóstico eletrônico completo (módulos/conectores) e checagem de atualização de software da central Pivi Pro e do sistema híbrido. | 40.000 km — Fluido de freio e filtro de ar/cabine.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Range Rover Velar', yearFrom: 2018, yearTo: 2020, tireSize: '235/65 R19 a 265/45 R21 conforme versão', frontPsi: 32, rearPsi: 35, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta do motorista ou manual do proprietário. Muitas unidades saem de fábrica sem estepe (kit de reparo de pneu) — confira o porta-malas.' },
  { modelName: 'Range Rover Velar', yearFrom: 2021, yearTo: null, tireSize: '235/60 R20 a 265/40 R22 conforme versão', frontPsi: 33, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 39, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta do motorista ou manual do proprietário. Na versão híbrida P400e o peso extra da bateria pede atenção redobrada à pressão traseira. Muitas unidades saem de fábrica sem estepe (kit de reparo de pneu) — confira o porta-malas.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Range Rover Velar', yearFrom: 2018, yearTo: 2020, component: 'Óleo do motor sintético + filtro', intervalKm: 15000, intervalMonths: 12, notes: 'Ingenium 2.0 turbo (gasolina ou diesel) ou V6 3.0 gasolina/SDV6 diesel; não atrasar no diesel (diluição de óleo é problema documentado).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Range Rover Velar', yearFrom: 2018, yearTo: 2020, component: 'Verificação da suspensão a ar', intervalKm: 20000, intervalMonths: 12, notes: 'Vazamento nas bolsas de ar é a causa mais comum de falha do compressor.', priority: 'HIGH', order: 1 },
  { modelName: 'Range Rover Velar', yearFrom: 2018, yearTo: 2020, component: 'Sistema de arrefecimento (mangueiras, cotovelo plástico)', intervalKm: 20000, intervalMonths: 12, notes: 'Ponto de recall confirmado — confira o chassi mesmo com o sistema aparentando normalidade.', priority: 'HIGH', order: 2 },
  { modelName: 'Range Rover Velar', yearFrom: 2018, yearTo: 2020, component: 'Atualização de software da central Touch Pro Duo', intervalKm: null, intervalMonths: 12, notes: 'Versão 18D ou posterior reduz travamentos/apagões de tela em unidades pré-2020.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Range Rover Velar', yearFrom: 2018, yearTo: 2020, component: 'Fluido de freio e filtro de ar/cabine', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'Range Rover Velar', yearFrom: 2018, yearTo: 2020, component: 'Conferência de recall pelo chassi', intervalKm: null, intervalMonths: null, notes: 'Recalls confirmados: parafuso da polia do virabrequim, atuador do climatizador, cotovelo do sistema de arrefecimento.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Range Rover Velar', yearFrom: 2021, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 15000, intervalMonths: 12, notes: 'Ingenium 2.0 turbo (gasolina, diesel ou base do híbrido P400e) ou V6 3.0.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Range Rover Velar', yearFrom: 2021, yearTo: null, component: 'Verificação da suspensão a ar', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'Range Rover Velar', yearFrom: 2021, yearTo: null, component: 'Sistema de arrefecimento (mangueiras, cotovelo plástico)', intervalKm: 20000, intervalMonths: 12, notes: 'Recall alcança unidades fabricadas até 05/01/2023.', priority: 'HIGH', order: 8 },
  { modelName: 'Range Rover Velar', yearFrom: 2021, yearTo: null, component: 'Bateria de alta tensão e cabo de recarga (P400e)', intervalKm: null, intervalMonths: 12, notes: 'Inspeção visual do cabo/tomada de recarga; evitar deixar a bateria de tração descarregada por longos períodos; carregar em carregador AC 7 kW ou DC 50 kW conforme disponibilidade.', priority: 'HIGH', order: 9 },
  { modelName: 'Range Rover Velar', yearFrom: 2021, yearTo: null, component: 'Diagnóstico eletrônico completo (módulos/conectores) e atualização de software', intervalKm: null, intervalMonths: 12, notes: 'Central Pivi Pro e sistema híbrido (P400e).', priority: 'MEDIUM', order: 10 },
  { modelName: 'Range Rover Velar', yearFrom: 2021, yearTo: null, component: 'Fluido de freio e filtro de ar/cabine', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 11 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Range Rover Velar', yearFrom: 2018, yearTo: 2020, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Range Rover Velar', yearFrom: 2021, yearTo: null, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
]

async function main() {
  console.log('🚗 Seed Land Rover Range Rover Velar...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Land Rover', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Land Rover', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Range Rover Velar', brandId: brand.id } },
    update: {}, create: { name: 'Range Rover Velar', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Range Rover Velar' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Range Rover Velar' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Range Rover Velar' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Land Rover Range Rover Velar concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
