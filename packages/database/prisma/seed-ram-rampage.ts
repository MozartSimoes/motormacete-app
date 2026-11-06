/**
 * Seed RAM Rampage — macetes, problemas, manutenção e calibragem de pneus
 * Picape média lançada no Brasil em 2023, produzida em Goiana/PE (Stellantis,
 * mesma plataforma "Small Wide 4x4" do Fiat Toro/Jeep Compass). PRIMEIRA marca
 * RAM cadastrada no MotorMacete — não existia nenhum modelo RAM no catálogo.
 * #33 no ranking de vendas 2025 no Brasil (26.140 un.). Duas motorizações:
 * 2.2 turbodiesel (Big Horn/Rebel/Laramie) e 2.0 turbo gasolina "Hurricane"
 * (Laramie/R/T — versão flex/etanol chegou apenas na linha 2026/2027 mais
 * recente). Ambas com câmbio automático ZF de 9 marchas e tração 4x4.
 * Execute: pnpm --filter @motormacete/database db:seed:ram-rampage
 *
 * Fontes: rambrasil.com.br, autoo.com.br, reclameaqui.com.br, mobiauto.com.br,
 *         turbonoticias.com.br, media.stellantis.com, mercadoveiculos.com
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
    severity: 'DANGER',
    title: 'Diesel: use SOMENTE o aditivo/fluido de câmbio homologado — contaminação destrói o câmbio',
    body: 'Existe um problema documentado e caro na versão 2.2 turbodiesel: quando o aditivo ARLA 32 ou qualquer fluido errado contamina o câmbio automático ZF de 9 marchas, os componentes internos (pacote de embreagens, solenoides) são destruídos — o reparo raramente sai por menos de R$ 20.000. NUNCA deixe ninguém "dar um jeito" com produto genérico perto do câmbio ou do sistema de escapamento/ARLA. Use somente postos e oficinas que conheçam exatamente onde fica cada bocal de abastecimento do seu Rampage diesel.',
  },
  {
    severity: 'WARN',
    title: 'Diesel: DPF (filtro de partículas) exige rodagem em rodovia periodicamente',
    body: 'O motor 2.2 turbodiesel tem filtro de partículas (DPF) que precisa de regeneração periódica — isso só acontece de forma eficiente com o motor em rotação mais alta por tempo prolongado (viagem de rodovia), não em uso 100% urbano com trajetos curtos. Se você usa o Rampage diesel só na cidade, faça uma rodagem de pelo menos 20-30 minutos em rodovia a cada poucas semanas para permitir a regeneração automática do DPF e evitar entupimento.',
  },
  {
    severity: 'OK',
    title: '9 marchas ZF: em descidas de serra, use o modo manual/sequencial',
    body: 'O câmbio automático ZF de 9 marchas é excelente para economia, mas em descidas longas (serra), puxe para o modo manual/sequencial e reduza marchas para usar o freio-motor — evita sobrecarregar os freios e superaquecer o câmbio em uso constante do pedal.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com Fiat Toro/Jeep Compass (mesma plataforma)',
    body: 'O Rampage usa a mesma plataforma "Small Wide 4x4" da Stellantis compartilhada com Fiat Toro e Jeep Compass — vários componentes de suspensão, freios e elétrica são intercambiáveis. Em oficinas independentes, principalmente fora dos grandes centros onde a rede RAM ainda é menor, pergunte por peças "Toro"/"Compass" equivalentes quando não houver cadastro específico do Rampage — pode agilizar bastante o reparo.',
  },
  {
    severity: 'OK',
    title: 'Motor 2.0 turbo gasolina "Hurricane": combustível de qualidade é ainda mais importante',
    body: 'O motor 2.0 Hurricane turbo entrega bastante potência (até 272cv nas versões mais recentes) através de alta pressão de turbo — isso o torna mais sensível a combustível de má procedência que motores aspirados. Abasteça sempre em postos de bandeira conhecida, principalmente em viagens por cidades menores.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Perda de potência e "modo de emergência" no motor diesel — problema crônico confirmado por técnicos',
    body: 'A combinação de luz do DPF acesa no painel, perda de potência repentina e o motor entrando em modo de emergência (limitado a ~2.000 RPM) é um padrão de queixa recorrente e já confirmado como problema comum por técnicos especializados na marca — não é um caso isolado. Se isso acontecer, não force o carro em modo de emergência por muito tempo tentando "resolver sozinho" — leve à concessionária o quanto antes para diagnóstico do sistema de DPF/injeção.',
  },
  {
    severity: 'DANGER',
    title: 'Câmbio automático diesel: reparo por contaminação de fluido pode passar de R$ 20.000',
    body: 'Reforçando o ponto mais crítico do carro (ver macetes): a contaminação do câmbio ZF por fluido/aditivo incorreto destrói componentes internos caros. Somado à falta de peças que muitos donos relatam (ver abaixo), um problema desses pode deixar o carro parado por semanas/meses esperando peça, além do custo alto. Prevenção rigorosa vale mais que remédio aqui.',
  },
  {
    severity: 'WARN',
    title: 'Falhas elétricas: som, fechadura da caçamba e central multimídia',
    body: 'Relatos frequentes de problemas elétricos diversos — sistema de som com falhas, fechadura elétrica da tampa traseira da caçamba não funcionando corretamente, e problemas na central multimídia. Isoladamente não são graves, mas o volume de relatos sugere vale a pena testar TODOS os itens elétricos ainda no pátio da concessionária, antes de sair com o carro 0km.',
  },
  {
    severity: 'WARN',
    title: 'Falta de peças: planeje manutenções com bastante antecedência',
    body: 'A falta de peças em estoque é um dos pontos de maior frustração relatados por proprietários, com atrasos significativos em reparos — mesmo dentro da garantia. Se notar qualquer sintoma de problema, não espere piorar: agende a inspeção o quanto antes, já que o tempo de espera pela peça certa pode ser longo.',
  },
  {
    severity: 'WARN',
    title: 'Banco elétrico: teste o ajuste elétrico dos bancos na entrega do 0km',
    body: 'Há relato de motor de ajuste elétrico do banco apresentando defeito já nos primeiros dias de uso, confirmado pela concessionária como defeito de fábrica. Teste todos os ajustes elétricos (banco, retrovisores, vidros) na hora de retirar o carro — problemas identificados na entrega são resolvidos mais rápido que os descobertos depois.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Rampage — 2.2 turbodiesel e 2.0 turbo gasolina (RAM + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (diesel: sintético 5W30 API específico para DPF; gasolina: 5W30/5W20 conforme manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 15.000-20.000 km — Filtro de combustível diesel (item crítico — combustível brasileiro tem mais impurezas). | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 30.000-40.000 km — Velas de ignição (motor gasolina turbo). | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio ZF de 9 marchas — use SOMENTE fluido homologado, nunca genérico (ver ponto crítico em macetes/problemas). | Rodovia periódica (diesel) — pelo menos 20-30 min de rodagem em velocidade de rodovia a cada poucas semanas para regeneração do DPF em uso predominantemente urbano.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Rampage',
    yearFrom: 2023,
    yearTo: null,
    tireSize: '235/60 R18 (maioria das versões)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 40,
    sparePsi: 60,
    notes: 'Pressão de fábrica estimada 32/32 PSI vazio. Como picape, a pressão traseira deve subir bastante com carga na caçamba (até 40 PSI ou mais, conforme peso transportado) — ajuste sempre conforme o peso da carga, não use o valor "vazio" com a caçamba carregada. Confirme na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Rampage', yearFrom: 2023, yearTo: null, component: 'Óleo do motor (2.2 diesel ou 2.0 turbo gasolina)', intervalKm: 10000, intervalMonths: 12, notes: 'Diesel: sintético específico compatível com DPF. Gasolina: conforme especificação do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Rampage', yearFrom: 2023, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Rampage', yearFrom: 2023, yearTo: null, component: 'Filtro de combustível (diesel)', intervalKm: 20000, intervalMonths: null, notes: 'Item crítico no diesel — combustível brasileiro exige atenção redobrada.', priority: 'HIGH', order: 2 },
  { modelName: 'Rampage', yearFrom: 2023, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza para 10.000-15.000 km em uso off-road/estradas de terra.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Rampage', yearFrom: 2023, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Rampage', yearFrom: 2023, yearTo: null, component: 'Velas de ignição (motor gasolina turbo)', intervalKm: 40000, intervalMonths: null, notes: 'Grau térmico específico para motor turbo de alta potência.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Rampage', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Rampage', yearFrom: 2023, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela RAM.', priority: 'HIGH', order: 7 },
  { modelName: 'Rampage', yearFrom: 2023, yearTo: null, component: 'Óleo do câmbio automático ZF (9 marchas)', intervalKm: 60000, intervalMonths: 48, notes: 'PONTO CRÍTICO — use somente fluido homologado. Contaminação por produto errado destrói o câmbio (reparo R$ 20.000+).', priority: 'CRITICAL', order: 8 },
  { modelName: 'Rampage', yearFrom: 2023, yearTo: null, component: 'Fluido ARLA 32 (diesel)', intervalKm: null, intervalMonths: null, notes: 'Reabasteça conforme indicação do painel. NUNCA deixe misturar/contaminar com outros fluidos do carro.', priority: 'CRITICAL', order: 9 },
  { modelName: 'Rampage', yearFrom: 2023, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Importante em picape 4x4 pelo desgaste desigual entre eixos.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Rampage',
    yearFrom: 2023,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed RAM Rampage...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'RAM', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'RAM', vehicleTypeId: carroType.id },
  })
  console.log(`  ✅ Marca criada/confirmada: ${brand.name}`)

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

  console.log('✅ RAM Rampage concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
