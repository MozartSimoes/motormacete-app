/**
 * Seed Fiat Titano — macetes, problemas, manutenção e calibragem
 * Picape grande, acima do Toro no portfólio Fiat, motor 2.2 turbodiesel
 * (BlueHDi/Multijet, mesma família usada em vans Fiat/Peugeot/Citroën na
 * Europa) com tração 4x4. Linha 2024-2025: 180cv/40,8kgfm, câmbio
 * automático 6 marchas. Linha 2026: motor atualizado para 200cv/45,9kgfm
 * e câmbio automático de 8 marchas. #60 no ranking de vendas 2025 no
 * Brasil (6.437 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:fiat-titano
 *
 * Fontes: turbonoticias.com.br, mobiauto.com.br, cnnbrasil.com.br,
 *         carrosbr.com, reclameaqui.com.br, pcdcarros.com.br
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
    title: 'Suspensão traseira "dura" vazia é característica, não defeito',
    body: 'A suspensão traseira (feixe de molas) foi calibrada para priorizar robustez e capacidade de carga (mais de 1.000 kg), não conforto de carro de passeio. Com a caçamba vazia, é normal a picape "pular" mais em buracos e lombadas que rivais mais tropicalizadas para conforto. Isso não é um defeito a ser reparado — é a natureza do projeto, mais parecido com picapes de trabalho tradicionais.',
  },
  {
    severity: 'WARN',
    title: 'Nunca ande com o reservatório de ARLA 32 vazio',
    body: 'O motor 2.2 diesel usa sistema de pós-tratamento com ARLA 32 (fluido de redução de emissões) — rodar com o reservatório vazio pode acionar restrição de potência (limp mode). Monitore o nível de ARLA 32 com a mesma disciplina que o diesel e abasteça sempre que o alerta aparecer.',
  },
  {
    severity: 'OK',
    title: 'Turbo lag: antecipe ultrapassagens em baixa rotação',
    body: 'Há uma demora perceptível de resposta ao acelerar em baixas rotações (turbo lag), mais notável na linha 2024-2025 (180cv/6 marchas) que na linha 2026 atualizada. Antecipe ultrapassagens com mais distância e evite depender de resposta imediata do motor em situações que exigem aceleração rápida.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vibração e ruído de plástico ("grilos") com o tempo de uso',
    body: 'Queixa muito comum é o desenvolvimento de ruídos de plástico vibrando ("grilos") com o tempo de uso em asfalto brasileiro, mais perceptível com a caçamba vazia — alguns proprietários relatam até vibração que chega a formigar o braço apoiado no console. Reporte ruídos novos na revisão para ajuste/reforço de encaixes antes que se intensifiquem.',
  },
  {
    severity: 'WARN',
    title: 'Barulho de atrito metálico atribuído a borrachas desgastadas',
    body: 'Alguns proprietários relataram barulho intenso de atrito metálico na carroceria — em pelo menos um caso, a concessionária identificou a causa como duas borrachas desgastadas prematuramente. Se notar ruído metálico incomum, não assuma que é algo grave sem diagnóstico — pode ser um reparo simples e barato.',
  },
  {
    severity: 'WARN',
    title: 'Problemas de bateria e pintura relatados no primeiro ano de uso',
    body: 'Há relatos de vícios recorrentes em unidades com cerca de 1 ano de uso, incluindo problemas de bateria (descarga precoce) e pintura danificada. Vistorie a pintura com atenção na entrega (0km) e, se notar dificuldade de partida ao longo do primeiro ano, teste a bateria e o sistema de carga cedo.',
  },
  {
    severity: 'WARN',
    title: 'Suporte pós-venda considerado insuficiente por parte dos proprietários',
    body: 'Diversos relatos mencionam demora e falta de solução definitiva para problemas recorrentes em algumas concessionárias. Documente cada visita por escrito com laudo técnico e, se a demora for excessiva, considere acionar o SAC da Fiat diretamente ou o Procon como último recurso.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Titano (Fiat + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor 2.2 diesel + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de combustível diesel — use sempre diesel S10 de qualidade. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático (6 ou 8 marchas conforme o ano). | Reservatório de ARLA 32 — nunca deixar esvaziar, risco de limp mode. | A cada revisão — Reportar ruídos novos (plástico ou metal) para ajuste preventivo antes que se intensifiquem.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Titano',
    yearFrom: 2024,
    yearTo: null,
    tireSize: '265/60 R18',
    frontPsi: 34,
    rearPsi: 34,
    frontPsiLoad: 36,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Pressão traseira sobe com carga na caçamba (capacidade acima de 1.000 kg). Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Titano', yearFrom: 2024, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.2 turbodiesel.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Titano', yearFrom: 2024, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Titano', yearFrom: 2024, yearTo: null, component: 'Reservatório de ARLA 32', intervalKm: null, intervalMonths: null, notes: 'Nunca deixar esvaziar — risco de restrição de potência (limp mode).', priority: 'CRITICAL', order: 2 },
  { modelName: 'Titano', yearFrom: 2024, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Titano', yearFrom: 2024, yearTo: null, component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'Use sempre diesel S10 de qualidade.', priority: 'HIGH', order: 4 },
  { modelName: 'Titano', yearFrom: 2024, yearTo: null, component: 'Teste de bateria e sistema de carga', intervalKm: null, intervalMonths: 12, notes: 'Relatos de descarga precoce no primeiro ano de uso.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Titano', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Titano', yearFrom: 2024, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Fiat.', priority: 'HIGH', order: 7 },
  { modelName: 'Titano', yearFrom: 2024, yearTo: null, component: 'Óleo do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar tranco nas trocas.', priority: 'HIGH', order: 8 },
  { modelName: 'Titano', yearFrom: 2024, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce a pressão traseira quando rodar com carga na caçamba.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Titano',
    yearFrom: 2024,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Fiat Titano...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Fiat', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Fiat', vehicleTypeId: carroType.id },
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

  console.log('✅ Fiat Titano concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
