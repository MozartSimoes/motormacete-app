/**
 * Seed Land Rover Range Rover Evoque — macetes, problemas, manutenção e calibragem
 * NÃO inclui o Range Rover "grande" (flagship), o Range Rover Sport nem o
 * Range Rover Velar — são modelos e plataformas diferentes, cobertos em
 * arquivos de seed próprios.
 *
 * 1ª geração (L538, 2012-2019/2020): chegou importada em 2012 (Pure/Dynamic/
 * Prestige, 3 e 5 portas, motor 2.0 Si4 turbo gasolina, câmbio automático de
 * 6 marchas). A partir de 2016 (facelift) passou a ser montada em Itatiaia
 * (RJ) — primeira fábrica da Land Rover fora do Reino Unido — com as versões
 * SD4/Si4 SE/HSE (motor 2.2 diesel renomeado de SD4 para eD4/SD4 conforme
 * versão, câmbio automático ZF de 9 marchas) e edições especiais (ONE
 * SICILIAN, LONDON, Zanzibar). A produção nacional foi encerrada por volta
 * de 2019/2020, quando a fábrica de Itatiaia passou a produzir só o
 * Discovery Sport.
 *
 * 2ª geração (L551, plataforma lançada mundialmente em 2019): NÃO foi
 * vendida oficialmente no Brasil entre 2020 e 2022 — o Evoque ficou cerca
 * de dois anos fora do catálogo nacional. Voltou em dezembro de 2022 (linha
 * 2023), já fabricada em Itatiaia, nas versões SE e R-Dynamic HSE, com
 * motor 2.0 Ingenium turbo FLEX de 250 cv (um dos primeiros Range Rover
 * flex do país). Em julho de 2025 recebeu atualização visual/tecnológica e
 * passou a ser vendida no Brasil só na versão Autobiography (linha 2026),
 * motor 2.0 turbo flex de 249-250 cv, a partir de R$ 518.510.
 *
 * Execute: pnpm --filter @motormacete/database db:seed:landrover-rangerover-evoque
 *
 * Fontes: FIPE (parallelum.com.br/fipe/api/v1), motorshow.com.br,
 *         instacarro.com, tudocelular.com, odiariodemogi.net.br,
 *         forbes.com.br, cnnbrasil.com.br, bnewssaopaulo.com.br,
 *         autopapo.com.br, autoo.com.br, automaistv.com.br,
 *         procon.sp.gov.br, clickpetroleoegas.com.br, ohoje.com,
 *         asrgearboxrepairs.co.uk, autodoc.co.uk, rrsport.co.uk,
 *         gms-automotive.com, rrevoque.org, autotechinsight.spglobal.com
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 2012-2019/2020 (1ª geração, L538: 2.0 Si4 gasolina / 2.2 SD4/eD4 diesel, facelift 2016) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Duas fases bem diferentes: pré-facelift (2012-2015) x facelift (2016-2019)',
    body: 'O Evoque pré-facelift (Pure/Dynamic/Prestige, 2012-2015) usa câmbio automático de 6 marchas. Já o facelift (SD4/Si4 SE/HSE, 2016-2019) trocou para câmbio automático ZF de 9 marchas e renomeou as versões a diesel. Peça e código variam bastante entre as duas fases — confirme sempre o ano exato e o motor antes de comprar qualquer componente.',
  },
  {
    severity: 'OK',
    title: 'Motor 2.0 Si4 tem raízes no bloco EcoBoost da Ford',
    body: 'O motor 2.0 turbo a gasolina Si4 usado no Evoque dessa geração foi desenvolvido em parceria com a Ford (família EcoBoost/GTDI), a mesma base usada em motores Ford da época. Isso não garante peça 100% intercambiável, mas vale pesquisar cruzamento em itens como bomba de óleo, corrente de comando e alguns sensores — sempre confira o número de peça antes de comprar.',
  },
  {
    severity: 'OK',
    title: 'Sem estepe: o Evoque usa kit de reparo (selante + compressor)',
    body: 'A maioria dos Evoque L538 não vem com estepe — o carro traz um kit de reparo de pneu (mangueira, frasco de selante, compressor). Confira periodicamente a validade do selante e lembre que, depois de usar o kit, a velocidade máxima recomendada é 80 km/h até trocar o pneu definitivamente.',
  },
  {
    severity: 'OK',
    title: 'Montagem nacional em Itatiaia-RJ (a partir de 2016) facilita rede de peças',
    body: 'A partir do facelift de 2016 o Evoque passou a ser montado na fábrica da Land Rover em Itatiaia (RJ), a primeira unidade fabril da marca fora do Reino Unido. Isso ampliou a disponibilidade de peças e mão de obra especializada no Brasil, em comparação aos primeiros anos (2012-2015), quando o carro era só importado.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL confirmado no Brasil — fusível da bomba do lavador de para-brisa',
    body: 'Land Rover Brasil convocou proprietários de Evoque ano/modelo 2019/2020, fabricados entre 05/10/2018 e 04/04/2019 (faixa de chassi LH000181 a LH019195), para a troca gratuita dos fusíveis de 15A por 25A nas bombas do lavador de para-brisa dianteiro e traseiro — em condições de congelamento o motor da bomba pode falhar, comprometendo a limpeza do para-brisa e a visibilidade. Serviço gratuito, iniciado em 13/09/2019. Confira seu chassi em www.landrover.com.br/ownership/recall ou numa concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático ZF de 9 marchas (facelift 2016-2019): troca brusca e falha de software são queixa recorrente',
    body: 'A partir do facelift, o Evoque passou a usar o câmbio automático ZF 9HP. É um dos pontos mais reclamados por donos: troca de marcha brusca ou com solavanco (principalmente saindo de neutro para D, ou entre 4ª e 5ª), demora para engatar e, em alguns casos, necessidade de reprogramação do módulo (TCM) ou substituição da transmissão. Ao notar comportamento anormal de troca, não demore para levar numa oficina especializada — atualização de software resolve boa parte dos casos, mas rodar tempo demais com o problema aumenta o risco de dano interno.',
  },
  {
    severity: 'WARN',
    title: 'Motor 2.0 Si4: corrente de comando pode desgastar prematuramente a partir de 60.000 km',
    body: 'O motor 2.0 Si4 (turbo a gasolina, base EcoBoost) tem relatos de desgaste prematuro da corrente de comando a partir de 60.000 km, além de acúmulo de carbono no turbo pela injeção direta, que pode causar marcha lenta instável e maior consumo. Ruído metálico na partida a frio ou marcha lenta irregular são sinais de alerta — vale investigar cedo, já que corrente esticada pode pular dente e causar dano grave no motor.',
  },
  {
    severity: 'WARN',
    title: 'Motor 2.2 SD4/eD4 diesel: EGR e filtro de partículas exigem atenção a combustível de qualidade',
    body: 'No motor diesel 2.2 SD4/eD4, falhas na válvula EGR (códigos comuns P0409, P0403, P0504) e entupimento do filtro de partículas (DPF) são queixas frequentes — muitas vezes causadas por sensor de pressão/temperatura, sonda lambda ou injetor, raramente é só "trocar o filtro". Abastecer sempre em posto de confiança e evitar rodar só em trajetos curtos (que não deixam o DPF completar a autolimpeza/regeneração) reduz bastante o risco.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma Evoque L538 2012-2019/2020 (2.0 Si4 gasolina ou 2.2 SD4/eD4 diesel)',
    body: '15.000 km — Troca de óleo do motor + filtro, sintético de qualidade (turbo é sensível a óleo degradado). | 60.000 km — Atenção ao ruído da corrente de comando no 2.0 Si4, desgaste prematuro documentado a partir daí. | 20.000 km — Verificação do câmbio ZF 9 marchas nos modelos facelift (2016+): comportamento de troca, nível/qualidade do fluido. | 20.000 km — Diesel: checagem de EGR e filtro de partículas (DPF), evitar rodar só em trajetos curtos. | Sempre — verificar validade do selante do kit de reparo de pneu (sem estepe).',
  },
]

// ---------- 2022-atual (2ª geração, L551: 2.0 Ingenium turbo flex, nacional em Itatiaia desde dez/2022) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Evoque ficou cerca de 2 anos fora de linha no Brasil (2020-2022) antes desta 2ª geração',
    body: 'Depois do fim da produção da 1ª geração (L538) por volta de 2019/2020, o Evoque ficou sem vendas oficiais no Brasil por cerca de dois anos. A 2ª geração (plataforma L551, lançada mundialmente em 2019) só chegou ao mercado brasileiro em dezembro de 2022 (linha 2023), já nacionalizada e fabricada em Itatiaia (RJ), com motor 2.0 Ingenium turbo flex de 250 cv — um dos primeiros Range Rover flex do país. Se você tem um Evoque 2ª geração importado por conta própria de 2019-2022 (fora do catálogo oficial da Land Rover Brasil nesse período), saiba que a rede oficial e o catálogo de peças no Brasil foram estruturados a partir do carro nacional 2023 em diante — pode haver diferença de especificação/peça em relação ao seu carro.',
  },
  {
    severity: 'OK',
    title: 'Linha 2026 (a partir de jul/2025): só a versão Autobiography',
    body: 'Em julho de 2025 o Evoque recebeu atualização (visual, central multimídia com tela curva de 11,4", travamento/destravamento por aproximação), chegando ao Brasil como "linha 2026" com uma única versão, Autobiography, a partir de R$ 518.510 — diferente do período 2022-2025, quando havia as versões SE e R-Dynamic HSE. O motor seguiu o 2.0 turbo flex (249-250 cv).',
  },
  {
    severity: 'OK',
    title: 'Motor flex é calibração recente para o Brasil — abasteça sempre em posto de confiança',
    body: 'O motor 2.0 Ingenium turbo flex é uma calibração específica para o combustível brasileiro (gasolina/etanol), diferente das versões só a gasolina vendidas fora do país. Por ser recente por aqui, vale reforçar o básico: abastecer em posto de confiança e evitar combustível de procedência duvidosa reduz o risco de problema de injeção/detonação nesse motor, que ainda tem pouco histórico de campo no Brasil.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL em andamento no Brasil (2026) — corrosão em conector do airbag',
    body: 'Em junho de 2026 a Land Rover confirmou recall mundial (cerca de 250.000 unidades) por corrosão no conector do airbag em Defender, Discovery/Discovery Sport e Range Rover Evoque — a corrosão pode aumentar a resistência elétrica do circuito e comprometer o acionamento do airbag numa colisão. A JLR Brasil confirmou que os veículos vendidos aqui também serão convocados, mas na divulgação inicial a lista exata de chassis/anos para o mercado brasileiro ainda não tinha sido publicada. Acompanhe www.landrover.com.br/ownership/recall e os canais oficiais — reparo gratuito assim que a convocação local sair.',
  },
  {
    severity: 'OK',
    title: 'Pouco histórico de campo: geração ainda muito recente no Brasil',
    body: 'Como a 2ª geração só chegou oficialmente ao Brasil em dezembro de 2022 (e a linha 2026 é de meados de 2025), ainda não existe uma base grande de carros rodados o suficiente no país para mapear "problema crônico" com segurança — a maior parte dos relatos disponíveis hoje vem de mercados que receberam o carro antes (Europa, EUA). Trate qualquer alegação de defeito crônico específico do Brasil com cautela até haver mais quilometragem acumulada por aqui.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Evoque L551 2022+ (2.0 Ingenium turbo flex, 249-250 cv)',
    body: '15.000 km — Troca de óleo do motor + filtro. | Sempre — abastecer só em posto de confiança (motor flex, calibração recente para o Brasil). | 20.000 km — Diagnóstico eletrônico completo (módulos/conectores), atenção redobrada por conta do recall de conector de airbag em andamento. | 40.000 km — Fluido de freio e filtro de ar/cabine. | Sempre — verificar validade do selante do kit de reparo de pneu (sem estepe).',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Range Rover Evoque', yearFrom: 2012, yearTo: 2020, tireSize: '235/55 R19 ou 235/60 R18 conforme versão', frontPsi: 32, rearPsi: 36, frontPsiLoad: 38, rearPsiLoad: 41, sparePsi: null, notes: 'Sem estepe de série (kit de reparo com selante e compressor) — confirme a pressão exata na etiqueta da coluna da porta.' },
  { modelName: 'Range Rover Evoque', yearFrom: 2022, yearTo: null, tireSize: '235/55 R19 ou 255/45 R20 conforme versão', frontPsi: 33, rearPsi: 36, frontPsiLoad: 39, rearPsiLoad: 42, sparePsi: null, notes: 'Sem estepe de série (kit de reparo com selante e compressor) — confirme a pressão exata na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Range Rover Evoque', yearFrom: 2012, yearTo: 2020, component: 'Óleo do motor sintético + filtro', intervalKm: 15000, intervalMonths: 12, notes: '2.0 Si4 gasolina ou 2.2 SD4/eD4 diesel.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Range Rover Evoque', yearFrom: 2012, yearTo: 2020, component: 'Corrente de comando (2.0 Si4) — monitorar ruído', intervalKm: null, intervalMonths: null, notes: 'Desgaste prematuro documentado a partir de 60.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'Range Rover Evoque', yearFrom: 2012, yearTo: 2020, component: 'Verificação do câmbio automático ZF 9 marchas (facelift 2016+)', intervalKm: 20000, intervalMonths: 12, notes: 'Comportamento de troca, nível/qualidade do fluido.', priority: 'HIGH', order: 2 },
  { modelName: 'Range Rover Evoque', yearFrom: 2012, yearTo: 2020, component: 'EGR e filtro de partículas (DPF) — diesel SD4/eD4', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Range Rover Evoque', yearFrom: 2012, yearTo: 2020, component: 'Validade do selante do kit de reparo de pneu', intervalKm: null, intervalMonths: 12, notes: 'Carro não tem estepe.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Range Rover Evoque', yearFrom: 2022, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 15000, intervalMonths: 12, notes: '2.0 Ingenium turbo flex.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Range Rover Evoque', yearFrom: 2022, yearTo: null, component: 'Diagnóstico eletrônico completo (módulos/conectores)', intervalKm: null, intervalMonths: 12, notes: 'Atenção ao recall de conector de airbag em andamento.', priority: 'HIGH', order: 6 },
  { modelName: 'Range Rover Evoque', yearFrom: 2022, yearTo: null, component: 'Fluido de freio e filtro de ar/cabine', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'Range Rover Evoque', yearFrom: 2022, yearTo: null, component: 'Validade do selante do kit de reparo de pneu', intervalKm: null, intervalMonths: 12, notes: 'Carro não tem estepe.', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Range Rover Evoque', yearFrom: 2012, yearTo: 2020, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Range Rover Evoque', yearFrom: 2022, yearTo: null, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
]

async function main() {
  console.log('🚗 Seed Land Rover Range Rover Evoque...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Land Rover', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Land Rover', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Range Rover Evoque', brandId: brand.id } },
    update: {}, create: { name: 'Range Rover Evoque', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Range Rover Evoque' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Range Rover Evoque' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Range Rover Evoque' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Land Rover Range Rover Evoque concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
