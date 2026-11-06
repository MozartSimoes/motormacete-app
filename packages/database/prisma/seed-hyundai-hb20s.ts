/**
 * Seed Hyundai HB20S — macetes, problemas, manutenção e calibragem de pneus
 * Sedã compacto, terceira geração (2020–presente), mesma plataforma/motores do
 * HB20 hatch mas com modelName próprio na FIPE — "HB20" e "HB20S" NÃO se casam
 * via substring (sem boundary entre "0" e "S"), por isso precisa de conteúdo
 * dedicado mesmo sendo essencialmente o mesmo carro com porta-malas separado.
 * #26 no ranking de vendas 2025 no Brasil (36.948 un., líder de sedãs compactos
 * junto com o Onix Plus). Motor 1.0 Kappa TGDI turbo 120cv + câmbio automático
 * de 6 marchas (não é CVT) nas versões turbo, ou 1.6 Gamma aspirado + manual/
 * automático nas versões de entrada.
 * Execute: pnpm --filter @motormacete/database db:seed:hyundai-hb20s
 *
 * Fontes: hyundai.com.br, reclameaqui.com.br, pcdcarros.com.br, vrum.com.br,
 *         gruposentinela.com.br, mercadoveiculos.com
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
    title: '1.0 TGDI turbo: câmbio automático de 6 marchas convencional — não é CVT',
    body: 'As versões turbo do HB20S usam câmbio automático de 6 marchas com conversor de torque tradicional, não CVT. É uma tecnologia mais robusta e previsível para uso severo urbano brasileiro do que uma CVT de correia — ainda assim, respeite o intervalo de troca do óleo do câmbio, não é vitalício.',
  },
  {
    severity: 'DANGER',
    title: 'Motor 1.0 TGDI: combustível de má procedência é o inimigo número 1',
    body: 'O motor Kappa 1.0 turbo com injeção direta (TGDI) é mais sensível à qualidade do combustível que motores de injeção indireta mais antigos. Abastecer com etanol/gasolina adulterados ou de postos duvidosos aumenta muito o risco de falhas de injeção, perda de potência repentina e, em casos extremos, forçou proprietários a chamar guincho. Abasteça sempre em postos de bandeira conhecida e evite "economizar" trocando de posto sem histórico só pelo preço.',
  },
  {
    severity: 'OK',
    title: 'Trepidação leve em marcha lenta pode ser coxim do motor — não ignore',
    body: 'Vibração perceptível com o carro parado e motor ligado (sentida no volante ou no banco) geralmente aponta para coxim de motor desgastado, não para o motor em si. É mais barato resolver cedo (coxim custa uma fração do reparo de motor) do que deixar a vibração se tornar rotina — leve para inspeção assim que notar.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas 100% com o HB20 hatch (mesma plataforma)',
    body: 'O HB20S é o HB20 hatch com porta-malas separado — mesma plataforma, mesmos motores (1.0 TGDI turbo, 1.6 Gamma aspirado), mesma suspensão e componentes elétricos. Em qualquer oficina, peça peças "para HB20" sem hesitar — motor, câmbio, freios e suspensão são idênticos entre as duas carrocerias.',
  },
  {
    severity: 'OK',
    title: 'Marcha à ré "dura" a frio (versões manuais): aguarde o óleo aquecer',
    body: 'Nas versões com câmbio manual, dificuldade para engatar a marcha à ré com o carro frio é queixa recorrente — melhora conforme o óleo do câmbio esquenta com o uso. Se a dificuldade persistir mesmo com o carro quente ou piorar com o tempo, vale inspecionar o nível/qualidade do óleo do câmbio antes de suspeitar de peça quebrada.',
  },
  {
    severity: 'OK',
    title: 'Central multimídia: reinicialização resolve boa parte dos travamentos',
    body: 'Se a tela travar ou não conectar o celular via Android Auto/Apple CarPlay, desligue o carro, aguarde a tela apagar totalmente e ligue de novo antes de suspeitar de defeito definitivo. Cabo USB de má qualidade também é causa comum de conexão instável — teste com outro cabo antes de levar à concessionária.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Relatos recorrentes de trinca no bloco do motor 1.0 TGDI (2021-2024)',
    body: 'Existe um volume relevante de reclamações praticamente idênticas no Reclame Aqui sobre trinca no bloco do motor 1.0 TGDI em unidades fabricadas entre 2021 e 2024 — um padrão que sugere vício oculto recorrente, não casos isolados. Preocupante: mesmo com carro dentro da garantia e revisões em dia na rede autorizada, há relatos de a montadora não reconhecer a falha como defeito de fábrica. Se seu carro é dessa faixa de fabricação, fique atento a qualquer sintoma de perda de líquido de arrefecimento sem vazamento visível, superaquecimento ou fumaça branca no escapamento — documente tudo com fotos/vídeos e data desde o primeiro sinal, isso fortalece muito o caso em uma eventual disputa de garantia.',
  },
  {
    severity: 'WARN',
    title: 'Funcionamento irregular do motor: perda de potência e apagões repentinos',
    body: 'Entre as queixas mais frequentes do 1.0 TGDI está funcionamento irregular com perda de potência, consumo elevado repentino e, em casos mais graves, apagão do motor em movimento. A Hyundai costuma atribuir a maioria desses casos a combustível adulterado (e nem sempre cobre pela garantia quando atribui a essa causa) — reforça a importância de abastecer em postos confiáveis, mas também vale insistir em diagnóstico eletrônico completo antes de aceitar essa explicação sem investigação.',
  },
  {
    severity: 'WARN',
    title: 'Freios: trepidação no pedal e ruído mesmo em baixa velocidade',
    body: 'Queixas de trepidação no pedal de freio e ruído durante a frenagem, inclusive em velocidades baixas. Em parte dos casos a Hyundai atribui ao funcionamento normal do ABS — mas se o ruído for constante (não só em frenagens bruscas) ou a trepidação for forte, vale inspecionar discos empenados antes de aceitar "é o ABS" como resposta final.',
  },
  {
    severity: 'WARN',
    title: 'Central multimídia: travamentos e falha de conexão Bluetooth/USB',
    body: 'Relatos de tela travando durante o uso ou simplesmente não conectando o celular. Atualização de firmware pela concessionária (gratuita) resolve boa parte dos casos persistentes — vale insistir nisso antes de aceitar o problema como "normal do carro".',
  },
  {
    severity: 'OK',
    title: 'Dificuldade de engate da marcha à ré (versões manuais): queixa crônica para alguns donos',
    body: 'Diferente do desconforto leve a frio (ver macetes), uma parcela de proprietários relata dificuldade de engate da ré persistente mesmo com o carro quente, classificando como defeito crônico. Se o problema não melhorar com o motor aquecido, não é comportamento normal — leve para diagnóstico da caixa de câmbio.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma HB20S — 1.0 TGDI turbo e 1.6 Gamma aspirado (Hyundai + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (5W30 sintético no turbo TGDI; pode variar no 1.6 aspirado) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 30.000-40.000 km — Velas de ignição (motor turbo TGDI exige grau térmico específico). | 40.000 km — Fluido de freio DOT 3/4 conforme manual. | 60.000 km — Fluido de arrefecimento — atenção redobrada dado o histórico de queixas de trinca de bloco; qualquer perda de nível sem vazamento visível merece investigação imediata. | 60.000-80.000 km — Óleo do câmbio automático 6 marchas (versões turbo) ou óleo do câmbio manual (versões 1.6). | 80.000 km — Correia auxiliar do motor.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'HB20S',
    yearFrom: 2020,
    yearTo: null,
    tireSize: '185/60 R15 (versões de entrada) · 195/55 R16 ou 205/45 R17 (versões turbo/topo)',
    frontPsi: 30,
    rearPsi: 30,
    frontPsiLoad: 33,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Pressão de fábrica 30/30 PSI vazio na maioria das versões, 33/35 PSI com carga máxima. O tamanho do pneu varia bastante por versão/aro (15" a 17") — confirme sempre na etiqueta da coluna da porta do motorista, que é a fonte oficial.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'HB20S', yearFrom: 2020, yearTo: null, component: 'Óleo do motor (1.0 TGDI turbo ou 1.6 Gamma aspirado)', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme a viscosidade exata no manual — geralmente 5W30 sintético no turbo.', priority: 'CRITICAL', order: 0 },
  { modelName: 'HB20S', yearFrom: 2020, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'HB20S', yearFrom: 2020, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza para 10.000-15.000 km em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'HB20S', yearFrom: 2020, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'HB20S', yearFrom: 2020, yearTo: null, component: 'Velas de ignição', intervalKm: 40000, intervalMonths: null, notes: 'Motor turbo TGDI exige grau térmico específico — não usar vela genérica de motor aspirado.', priority: 'MEDIUM', order: 4 },
  { modelName: 'HB20S', yearFrom: 2020, yearTo: null, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: 'DOT 3 ou 4 conforme manual — troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'HB20S', yearFrom: 2020, yearTo: null, component: 'Fluido de arrefecimento — inspeção de nível reforçada', intervalKm: 10000, intervalMonths: 6, notes: 'Dado o histórico de reclamações de trinca no bloco do motor 1.0 TGDI (2021-2024), monitore o nível com mais frequência que o padrão. Qualquer queda sem vazamento visível é sinal de alerta.', priority: 'CRITICAL', order: 6 },
  { modelName: 'HB20S', yearFrom: 2020, yearTo: null, component: 'Troca do fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Hyundai.', priority: 'HIGH', order: 7 },
  { modelName: 'HB20S', yearFrom: 2020, yearTo: null, component: 'Óleo do câmbio (automático 6 marchas ou manual)', intervalKm: 60000, intervalMonths: 48, notes: 'Automático: conversor de torque convencional, não CVT. Antecipe em uso severo mesmo se o manual sugerir "vitalício".', priority: 'HIGH', order: 8 },
  { modelName: 'HB20S', yearFrom: 2020, yearTo: null, component: 'Correia auxiliar do motor', intervalKm: 80000, intervalMonths: null, notes: 'Inspecionar ressecamento/trincas antes de decidir trocar.', priority: 'MEDIUM', order: 9 },
  { modelName: 'HB20S', yearFrom: 2020, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Aproveite para checar desgaste irregular por alinhamento.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'HB20S',
    yearFrom: 2020,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Hyundai HB20S...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Hyundai', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Hyundai', vehicleTypeId: carroType.id },
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

  console.log('✅ Hyundai HB20S concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
