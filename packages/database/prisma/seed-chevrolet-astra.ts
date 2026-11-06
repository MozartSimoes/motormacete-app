/**
 * Seed Chevrolet Astra — macetes, problemas, manutenção e calibragem de pneus
 * Compacto médio no Brasil entre 1994 e 2011, em duas gerações (Astra "GSi"
 * 1994-1998 importado/CKD e Astra nacional 1998-2011, hatch 3p/5p e sedã,
 * plataforma compartilhada com Vectra/Zafira). Motores 1.8/2.0 8V/16V a
 * gasolina, e a partir de ~2007 também Flexpower (etanol/gasolina) nas
 * versões finais. Versões GL/GLS/Advantage/Elegance/Elite/Comfort/CD/GSi,
 * incluindo a edição limitada "Astra 500 Sedan". Problema clássico: sensor
 * de fluxo de ar (MAF) e bobina de ignição.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-astra
 *
 * Fontes: opinautos.com(.br), acciolygm.com.br, metropecaspr.com.br,
 *         consumocombustivel.com.br, michelin.com.br, calibrapneu.com.br,
 *         calibragemdepneu.com.br
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
    title: 'Mecânica Família II: robusta e com peças fartas no mercado paralelo',
    body: 'Os motores 1.8/2.0 8V/16V do Astra (bloco "Família II" da GM, o mesmo usado em Vectra, Zafira, Omega 4-cilindros e Meriva) são conhecidos pela robustez e pela disponibilidade enorme de peças alternativas — bombas de água e óleo, coxins, juntas e sensores têm opção de marcas como Bosch, SKF, Ina, Cofap e Nakata em qualquer loja de autopeças, sem depender de concessionária. Isso mantém o custo de manutenção baixo mesmo com o carro fora de linha há mais de uma década.',
  },
  {
    severity: 'WARN',
    title: 'Sensor MAF e bobina: use peça original ou de marca confiável, não a mais barata',
    body: 'É queixa recorrente entre donos de Astra que sensores MAF (fluxo de ar) e bobinas de ignição genéricas/paralelas de procedência duvidosa duram pouco ou dão problema logo após a instalação — em vários relatos a bobina genérica "morre" depois de pouco tempo de uso, enquanto a original ou de marca homologada (Bosch, Magneti Marelli) resolve de forma definitiva. Ao trocar essas peças, priorize procedência confiável mesmo pagando um pouco mais — sai mais barato que trocar duas ou três vezes.',
  },
  {
    severity: 'OK',
    title: 'Correia dentada: troque por tempo, não só por quilometragem',
    body: 'O manual da Chevrolet recomenda a troca da correia dentada dos motores 1.8/2.0 8V a cada 50.000-60.000 km, mas em carros com 15-30 anos de idade (a realidade de boa parte da frota de Astra hoje) a borracha degrada com o tempo mesmo rodando pouco. Se não houver registro de troca nos últimos 5 anos, troque preventivamente junto com o tensor — a quebra da correia neste motor é de "cabeçote encontra pistão", com risco real de dano grave ao motor.',
  },
  {
    severity: 'OK',
    title: 'Astra Flexpower: identifique a versão antes de abastecer só com etanol',
    body: 'Nem todo Astra é flex — a bicombustível (Flexpower) só chegou nas versões finais, por volta de 2007-2011. Confirme se sua unidade é flex (etiqueta no vidro traseiro ou tampa do tanque, ou consulte a ficha técnica pelo chassi) antes de abastecer com etanol puro; em unidades só a gasolina isso pode causar sérios danos ao motor.',
  },
  {
    severity: 'OK',
    title: 'Astra 500 Sedan e versões de topo: revise os itens de conforto elétrico à parte',
    body: 'Nas versões mais completas (Elite, Elegance, e a edição limitada "Astra 500 Sedan"), itens elétricos como vidro, trava e comandos do painel envelhecem e dão problema de contato com o tempo — isso é independente da parte mecânica do motor/câmbio. Ao comprar um usado dessas versões, teste todos os acessórios elétricos separadamente, pois defeito nesses itens não indica problema mecânico geral do carro.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sensor MAF (fluxo de ar) — falha clássica do motor 1.8/2.0',
    body: 'O sensor de fluxo de massa de ar (MAF) é um dos itens que mais falha nos motores 1.8/2.0 do Astra. Sintomas: demora para "pegar", marcha lenta instável, o carro perde força e acelera de forma irregular, luz de injeção (check engine) acesa. Em muitos casos a limpeza do sensor com produto específico resolve temporariamente, mas a solução definitiva costuma ser a troca por peça de procedência confiável.',
  },
  {
    severity: 'WARN',
    title: 'Bobina de ignição falhando — falha de centelha em um ou mais cilindros',
    body: 'Bobina de ignição com defeito é queixa muito comum, geralmente afetando os cilindros 1 e 2 primeiro. Sintomas: o motor "engasga" ou trepida em marcha lenta, perde potência, acende o check engine, e em casos mais graves o carro desliga sozinho e demora a voltar a funcionar até esfriar. Não convém rodar muito tempo com falha de ignição confirmada — isso pode danificar o catalisador.',
  },
  {
    severity: 'WARN',
    title: 'Cheiro de combustível e falhas no sistema de alimentação',
    body: 'Há relatos de cheiro de gasolina no habitáculo ou no vão do motor, geralmente ligado a mangueiras/vedações do sistema de alimentação ressecadas pela idade do carro. Não ignore esse sintoma — pare o carro, verifique visualmente por vazamento e leve para uma oficina; é risco de incêndio, não apenas desconforto.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático (versões com automático): dificuldade para engatar marcha',
    body: 'Proprietários relatam ocasionalmente dificuldade nas trocas de marcha ou "não engata" no câmbio automático de algumas versões. Antes de suspeitar do câmbio em si, vale checar nível e condição do fluido — em muitos casos o problema está ligado a fluido vencido ou baixo, não ao conjunto mecânico.',
  },
  {
    severity: 'OK',
    title: 'Chicote e conectores ressecados pela idade do veículo',
    body: 'Em unidades mais antigas (20-30 anos), problemas elétricos intermitentes muitas vezes têm origem em chicotes e conectores ressecados/oxidados, não necessariamente no componente que "parece" estar com defeito. Antes de trocar um sensor ou módulo caro por suspeita de defeito, vale inspecionar e limpar os conectores da região — resolve boa parte dos casos de falha intermitente.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Astra 1.8/2.0 8V/16V (ajustado para uso severo/carro antigo no Brasil)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine (versões que possuem). | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 50.000-60.000 km ou 5 anos (o que vier primeiro) — Correia dentada + tensor + bomba d\'água preventivamente. | 60.000 km — Fluido de arrefecimento. | Rodízio de pneus a cada 10.000 km. | Atenção especial: em carros com mais de 15 anos, revise mangueiras, coxins e borrachas de suspensão por ressecamento, independente da quilometragem.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Astra',
    yearFrom: 1994,
    yearTo: null,
    tireSize: '185/65 R14 · 195/60 R15 · 205/50 R16 (conforme versão/aro)',
    frontPsi: 28,
    rearPsi: 28,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Pressão varia por aro/versão (14, 15 ou 16 polegadas) e época de fabricação — confirme sempre na etiqueta da coluna da porta do motorista ou tampa do tanque de combustível, que é onde a Chevrolet especifica o valor exato do seu chassi.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Astra', yearFrom: 1994, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Use sempre a viscosidade especificada no manual da sua versão/ano.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Astra', yearFrom: 1994, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Astra', yearFrom: 1994, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Astra', yearFrom: 1994, yearTo: null, component: 'Sensor MAF (fluxo de ar) — limpeza/inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Ponto de falha conhecido do motor 1.8/2.0. Limpeza com produto específico ajuda a prevenir falhas de marcha lenta.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Astra', yearFrom: 1994, yearTo: null, component: 'Bobina de ignição — inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Falha comum, principalmente cilindros 1 e 2. Use peça original ou de marca confiável.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Astra', yearFrom: 1994, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor aspirado — intervalo mais generoso que motores turbo.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Astra', yearFrom: 1994, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Astra', yearFrom: 1994, yearTo: null, component: 'Correia dentada + tensor', intervalKm: 55000, intervalMonths: 60, notes: 'CRÍTICO: quebra causa dano grave ao motor (encontro de válvula com pistão). Em carro antigo, respeite o prazo de 5 anos mesmo com pouca km rodada — a borracha envelhece com o tempo.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Astra', yearFrom: 1994, yearTo: null, component: 'Bomba d\'água — troca preventiva', intervalKm: 55000, intervalMonths: 60, notes: 'Troque junto com a correia dentada — mesmo procedimento de desmontagem.', priority: 'HIGH', order: 8 },
  { modelName: 'Astra', yearFrom: 1994, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 9 },
  { modelName: 'Astra', yearFrom: 1994, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado, conforme tipo de tração.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Astra',
    yearFrom: 1994,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Astra...')

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

  console.log('✅ Chevrolet Astra concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
