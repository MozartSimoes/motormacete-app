/**
 * Seed Volkswagen Nivus — macetes, problemas, manutenção e calibragem de pneus
 * SUV cupê desenvolvido e fabricado no Brasil (São José dos Pinhais/PR) desde 2020,
 * depois exportado para Europa e outros mercados — primeiro projeto brasileiro
 * da VW com alcance global. Plataforma MQB A0 (mesma de Polo/T-Cross/Virtus).
 * #20 no ranking de vendas 2025 no Brasil (48.703 un.). Único motor: 1.0 TSI
 * turbo 3 cilindros + câmbio automático Tiptronic de 6 marchas convencional
 * (conversor de torque — não é DSG nem CVT).
 * Execute: pnpm --filter @motormacete/database db:seed:vw-nivus
 *
 * Fontes: vw.com.br, mobiauto.com.br, vrum.com.br, reclameaqui.com.br,
 *         calibragemdepneu.com.br, jantes-e-pneus.com, newsmotor.com.br
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
    title: 'Câmbio automático Tiptronic de 6 marchas: NÃO é DSG — óleo e cuidado são diferentes',
    body: 'O Nivus usa câmbio automático convencional de 6 marchas com conversor de torque (Aisin), não o câmbio DSG de dupla embreagem usado em outros modelos VW. Isso é uma boa notícia: é uma tecnologia mais robusta e tolerante que o DSG a seco que deu problema em gerações anteriores de outros modelos. Ainda assim, troque o óleo do câmbio dentro do prazo — "automático moderno" não significa vitalício em uso severo brasileiro.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.0 TSI: etanol rende mais potência (128cv) que gasolina (116cv)',
    body: 'O motor turbo 3 cilindros do Nivus é flex e entrega mais potência com etanol (128cv) do que com gasolina (116cv) — comportamento normal em motores turbo flex brasileiros, já que o etanol tem octanagem maior e permite mais avanço de ignição sem detonação. Se você anda muito em rodovia com carga, etanol também ajuda a manter a temperatura do motor mais estável.',
  },
  {
    severity: 'WARN',
    title: 'Volante com revestimento sintético: evite produtos abrasivos e sol direto prolongado',
    body: 'O revestimento sintético do volante (courvin) tem histórico de descascar/rachar antes de completar 1 ano de uso em vários relatos de proprietários. Reduza o desgaste: evite produtos de limpeza com álcool ou abrasivos diretamente no volante, e use protetor solar de painel para reduzir a exposição prolongada ao sol quando estacionado. Se começar a descascar dentro da garantia, documente e acione — é problema reconhecido, não desgaste normal esperado.',
  },
  {
    severity: 'OK',
    title: 'Carregador por indução: posicione o celular exatamente no centro da base',
    body: 'Muitos relatos de "carregador sem fio que não carrega" são, na prática, desalinhamento entre a bobina do celular e a base — a área de carregamento por indução é pequena e sensível a poucos milímetros de deslocamento. Teste posicionar o celular em diferentes pontos da base antes de concluir que o sistema está com defeito. Capas grossas ou com metal também atrapalham a transferência de energia.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com Polo/Virtus/T-Cross (mesma plataforma MQB A0)',
    body: 'O Nivus compartilha motor (1.0 TSI), câmbio, boa parte da suspensão e vários componentes elétricos com Polo, Virtus e T-Cross — todos na plataforma MQB A0. Em oficinas independentes, peça peças "para Polo/T-Cross 1.0 TSI" quando faltar cadastro específico do Nivus — filtro de óleo, velas, kit de embreagem do motor de partida e componentes de suspensão dianteira geralmente servem.',
  },
  {
    severity: 'OK',
    title: 'VW Play (multimídia): reinicialização resolve a maioria dos travamentos',
    body: 'Se a tela ficar travada, preta ou esverdeada, tente primeiro a reinicialização simples: desligue o carro, aguarde a tela apagar completamente (alguns segundos), e ligue de novo. Se travar com frequência (mais de uma vez por semana), leve para atualização de firmware na concessionária — é gratuita e resolve a maior parte dos casos reportados.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmbio automático: vibração na troca de marcha e demora entre N e D',
    body: 'Relatos recorrentes de vibração perceptível durante as trocas de marcha e demora ao engatar entre Neutro (N) e Drive (D) — em alguns casos o carro entra em "modo seguro", limitando a potência até ser reiniciado ou levado à concessionária. Se notar esse padrão, não ignore: anote a quilometragem e a frequência antes de procurar a VW, isso ajuda a comprovar o padrão para a garantia.',
  },
  {
    severity: 'WARN',
    title: 'Ruídos na suspensão dianteira mesmo com baixa quilometragem',
    body: 'Estalos e rangidos vindos da suspensão dianteira são queixa recorrente mesmo em carros com pouco uso, geralmente ligados a buchas ou aos batentes de amortecedor. Não costuma ser falha estrutural grave, mas merece inspeção cedo — buchas soltas aceleram desgaste irregular de pneu.',
  },
  {
    severity: 'WARN',
    title: 'Multimídia VW Play: telas preta/esverdeada e reinicializações espontâneas',
    body: 'Sistema de infotainment com histórico de travamentos, reinicializações sozinho e, em alguns casos, tela ficando completamente preta ou com tom esverdeado — relatado já nos primeiros meses de uso em alguns exemplares. Atualização de firmware pela concessionária (gratuita) resolve a maioria, mas alguns casos persistem e exigem troca do módulo sob garantia.',
  },
  {
    severity: 'WARN',
    title: 'Volante: revestimento sintético descascando em menos de 1 ano',
    body: 'Um dos problemas mais citados por proprietários: o courvin do volante começa a descascar/rachar mesmo com uso e cuidado normais, muitas vezes antes de completar 12 meses. É considerado desgaste prematuro (não abuso do usuário) por boa parte dos relatos — vale acionar a garantia assim que perceber, antes que piore.',
  },
  {
    severity: 'OK',
    title: 'Carregador por indução "que não funciona": maioria é desalinhamento, não defeito',
    body: 'Antes de abrir reclamação por carregador sem fio que não carrega, teste reposicionar o celular em pontos diferentes da base e remova a capa (principalmente capas com placa metálica de suporte magnético, que bloqueiam a indução). Boa parte dos casos reportados como "defeito de fábrica" se resolve só com o posicionamento correto.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Nivus 1.0 TSI (VW + ajuste para uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (5W40 ou 0W20 sintético conforme especificação da versão) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine (ar-condicionado). | 30.000-40.000 km — Velas de ignição (motor turbo 1.0 TSI exige vela de grau térmico específico). | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Inspeção/troca do óleo do câmbio automático Tiptronic 6 marchas — mesmo sendo listado como "sem troca programada" pelo manual, uso severo (cidade grande) recomenda antecipar. | 80.000 km — Correia auxiliar do motor.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Nivus',
    yearFrom: 2020,
    yearTo: null,
    tireSize: '205/60 R16 (Comfortline) · 205/55 R17 (Highline)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Versão de entrada (aro 16): 205/60 R16. Versão Highline (aro 17): 205/55 R17. Pressão de fábrica 32/32 PSI vazio, 35/38 PSI com carga máxima. Confirme sempre na etiqueta da coluna da porta do motorista — pode variar um pouco por ano/versão.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Nivus', yearFrom: 2020, yearTo: null, component: 'Óleo do motor 1.0 TSI (sintético)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor turbo 3 cilindros. Siga a viscosidade exata do manual (varia por ano/versão entre 5W40 e 0W20).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Nivus', yearFrom: 2020, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Nivus', yearFrom: 2020, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza para 10.000-15.000 km em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Nivus', yearFrom: 2020, yearTo: null, component: 'Filtro de cabine (ar-condicionado)', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Nivus', yearFrom: 2020, yearTo: null, component: 'Velas de ignição', intervalKm: 40000, intervalMonths: null, notes: 'Motor turbo 1.0 TSI exige grau térmico específico — não usar vela genérica de motor aspirado.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Nivus', yearFrom: 2020, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Nivus', yearFrom: 2020, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela VW.', priority: 'HIGH', order: 6 },
  { modelName: 'Nivus', yearFrom: 2020, yearTo: null, component: 'Óleo do câmbio automático Tiptronic (6 marchas)', intervalKm: 60000, intervalMonths: 48, notes: 'Câmbio convencional com conversor de torque (não é DSG). Uso severo pede inspeção/troca antecipada mesmo com manual sugerindo "vitalício".', priority: 'CRITICAL', order: 7 },
  { modelName: 'Nivus', yearFrom: 2020, yearTo: null, component: 'Correia auxiliar do motor', intervalKm: 80000, intervalMonths: null, notes: 'Inspecionar ressecamento/trincas antes de decidir trocar.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Nivus', yearFrom: 2020, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Aproveite para checar desgaste irregular por alinhamento.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Nivus',
    yearFrom: 2020,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volkswagen Nivus...')

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

  console.log('✅ Volkswagen Nivus concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
