/**
 * Seed Volkswagen Tera — macetes, problemas, manutenção e calibragem de pneus
 * SUV subcompacto lançado no Brasil em 2025, produzido em São José dos Pinhais/PR
 * na mesma plataforma MQB A0 de Polo/Nivus/T-Cross/Virtus. #21 no ranking de
 * vendas 2025 (48.143 un., mesmo tendo entrado no mercado no meio do ano).
 * Três combinações de motor/câmbio: 1.0 MPI aspirado 84cv + manual 5 marchas
 * (entrada), 1.0 170 TSI turbo 116cv + manual 6 marchas, e 1.0 170 TSI turbo
 * 116cv + automático 6 marchas (Comfort/High AT).
 *
 * IMPORTANTE: modelo muito recente — ainda não existe histórico consolidado de
 * problemas reportados por proprietários (diferente de modelos com anos de
 * mercado). O conteúdo abaixo foca em cuidados preventivos de primeiro ano,
 * pontos de atenção herdados da plataforma compartilhada (Polo/Nivus/T-Cross)
 * e boas práticas gerais — evitando inventar "defeitos conhecidos" que ainda
 * não existem de fato.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-tera
 *
 * Fontes: vw.com.br, car.blog.br, jantes-e-pneus.com, calibragemdepneu.com.br
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
    title: 'Três motorizações diferentes: confirme a sua antes de comprar peça ou óleo',
    body: 'O Tera vem com 1.0 MPI aspirado 84cv (manual 5 marchas, versão de entrada), 1.0 170 TSI turbo 116cv manual 6 marchas, ou o mesmo 170 TSI com câmbio automático 6 marchas (versões Comfort/High AT). São motores fisicamente diferentes (aspirado vs. turbo) com necessidades de óleo, vela e intervalo de manutenção distintos — confira o motor exato na nota fiscal ou na etiqueta sob o capô antes de comprar peças.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.0 MPI aspirado: mais simples e mais barato de manter que o turbo',
    body: 'Se você tem a versão de entrada com motor 1.0 MPI aspirado (84cv), a boa notícia é manutenção mais simples e barata: sem intercooler, sem turbina para monitorar, óleo com especificação menos exigente que o turbo. Em compensação, desempenho mais modesto — normal para o perfil de uso urbano que essa versão busca atender.',
  },
  {
    severity: 'OK',
    title: 'Motor 170 TSI turbo: etanol tende a render mais potência que gasolina',
    body: 'Como em outros turbo flex da VW, o motor 170 TSI do Tera tende a entregar mais potência com etanol do que com gasolina, por causa da maior octanagem do combustível permitir mais avanço de ignição. Se você abastece bastante com etanol, aproveite — o motor foi calibrado para isso.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático 6 marchas: mesma família do Nivus/T-Cross, não é DSG',
    body: 'A versão automática do Tera usa câmbio convencional de 6 marchas com conversor de torque (tecnologia da mesma família usada em Nivus e T-Cross), não o câmbio DSG de dupla embreagem. É uma escolha mais robusta para uso severo urbano — ainda assim, siga o intervalo de troca de óleo do câmbio, não é vitalício em uso severo brasileiro.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com Polo/Nivus/T-Cross (mesma plataforma MQB A0)',
    body: 'O Tera compartilha plataforma, motores e boa parte da mecânica com Polo, Nivus e T-Cross. Em oficinas independentes, se ainda não houver cadastro específico do Tera no sistema, peça peças "para Polo/Nivus 1.0 TSI" (versões turbo) ou "Polo 1.0 MPI" (versão aspirada) — filtro de óleo, velas e componentes de suspensão dianteira costumam ser intercambiáveis.',
  },
  {
    severity: 'WARN',
    title: 'Modelo recém-lançado: documente qualquer anomalia desde o primeiro mês',
    body: 'Como o Tera é um modelo novo no mercado brasileiro, os primeiros lotes de produção costumam concentrar os eventuais ajustes de linha que toda montadora faz depois do lançamento. Se notar qualquer ruído, folga ou comportamento estranho nos primeiros meses, registre com data, quilometragem e vídeo/foto antes de levar à concessionária — isso ajuda tanto no seu atendimento quanto a identificar se é um padrão de lote.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Modelo muito recente: ainda não há histórico consolidado de problemas',
    body: 'O Tera chegou ao mercado brasileiro em 2025 — não existe ainda uma base grande de relatos de longo prazo (2-3+ anos de uso) como para modelos mais antigos. Isso não significa que o carro é "perfeito", só que ainda não deu tempo de aparecer um padrão. Fique atento a fóruns e grupos de proprietários (ex: grupos de marca no Facebook, YouTube) ao longo dos próximos 1-2 anos — atualizaremos esta seção assim que surgirem relatos consistentes.',
  },
  {
    severity: 'WARN',
    title: 'Pontos de atenção herdados da plataforma compartilhada (Polo/Nivus/T-Cross)',
    body: 'Como o Tera usa a mesma base mecânica de Polo, Nivus e T-Cross, vale ficar atento aos pontos que já apareceram nesses "primos": ruídos de suspensão dianteira em baixa quilometragem, e (nas versões com central multimídia VW Play mais completa) possíveis travamentos de tela que costumam ser resolvidos com atualização de firmware gratuita na concessionária. Não é garantido que o Tera repita esses padrões, mas vale monitorar.',
  },
  {
    severity: 'OK',
    title: 'Câmbio manual: normal ter uma leve "dureza" nos primeiros milhares de km',
    body: 'Em câmbios manuais novos é comum uma sensação de engate um pouco mais "seco"/duro nos primeiros 2.000-3.000 km, que suaviza com o uso normal conforme os componentes internos assentam. Se a dificuldade for muito acentuada ou não melhorar depois disso, vale uma inspeção — mas não é motivo de alarme imediato.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tera — 1.0 MPI, 170 TSI manual e 170 TSI automático (VW + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (viscosidade conforme motor: MPI aspirado usa especificação mais simples; TSI turbo exige sintético de alta performance) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 30.000-40.000 km — Velas de ignição (turbo TSI: grau térmico específico; MPI aspirado: intervalo pode ser um pouco maior). | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio (manual: fluido específico a cada troca grande; automático 6 marchas: inspeção/troca antecipada em uso severo mesmo com manual sugerindo "vitalício"). | 80.000 km — Correia auxiliar do motor.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Tera',
    yearFrom: 2025,
    yearTo: null,
    tireSize: '205/60 R16 (versão base, rodas de aço) · 205/55 R17 (Comfort/Highline)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Versão base (aro 16, rodas de aço): 205/60 R16. Versões Comfort e Highline (aro 17): 205/55 R17. Pressão de fábrica estimada 32/32 PSI vazio, 35/38 PSI com carga máxima — por ser modelo recém-lançado, confirme sempre o valor exato na etiqueta da coluna da porta do motorista, que é a fonte oficial e pode variar por versão/ano.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Tera', yearFrom: 2025, yearTo: null, component: 'Óleo do motor (1.0 MPI ou 170 TSI conforme versão)', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme a viscosidade exata no manual — difere entre o motor aspirado e o turbo.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Tera', yearFrom: 2025, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Tera', yearFrom: 2025, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza para 10.000-15.000 km em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Tera', yearFrom: 2025, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Tera', yearFrom: 2025, yearTo: null, component: 'Velas de ignição', intervalKm: 40000, intervalMonths: null, notes: 'Motor 170 TSI turbo exige grau térmico específico — não usar vela genérica de motor aspirado.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Tera', yearFrom: 2025, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Tera', yearFrom: 2025, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela VW.', priority: 'HIGH', order: 6 },
  { modelName: 'Tera', yearFrom: 2025, yearTo: null, component: 'Óleo do câmbio (manual ou automático 6 marchas)', intervalKm: 60000, intervalMonths: 48, notes: 'Versão automática: câmbio convencional com conversor de torque, não DSG. Antecipe em uso severo mesmo se o manual sugerir "vitalício".', priority: 'CRITICAL', order: 7 },
  { modelName: 'Tera', yearFrom: 2025, yearTo: null, component: 'Correia auxiliar do motor', intervalKm: 80000, intervalMonths: null, notes: 'Inspecionar ressecamento/trincas antes de decidir trocar.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Tera', yearFrom: 2025, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Aproveite para checar desgaste irregular por alinhamento.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Tera',
    yearFrom: 2025,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volkswagen Tera...')

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

  console.log('✅ Volkswagen Tera concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
