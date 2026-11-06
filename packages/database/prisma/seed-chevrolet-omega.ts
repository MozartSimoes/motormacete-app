/**
 * Seed Chevrolet Omega — macetes, problemas, manutenção e calibragem de pneus
 * Sedã grande/executivo da GM no Brasil entre 1992 e 1998 (Omega "A"),
 * plataforma compartilhada com o Suprema (versão de luxo, incluindo a
 * edição "Suprema Diamond") e a "Omega Diamond" — mesma base mecânica.
 * Motores 2.0/2.2 4 cilindros, 4.1 reto-6 ("S/6"), 3.0 V6, e V6 importados
 * de maior cilindrada (3.8/3.6) em versões específicas. Versões GL/GLS/CD.
 * Carro de mecânica robusta, hoje raro e valorizado entre entusiastas, mas
 * com peças mais escassas que os modelos populares da mesma época —
 * dados de manutenção mais genéricos onde a fonte não é específica o
 * suficiente por modelo/motor.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-omega
 *
 * Fontes: alvaromatiassa.wordpress.com, motoragora.com.br, carroclub.com.br,
 *         vrum.com.br, oficinabrasil.com.br, flatout.com.br,
 *         opinautos.com.br, calibragemdepneu.com.br, michelin.com.br
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
    title: 'Confirme o motor exato pelo chassi antes de comprar qualquer peça',
    body: 'O Omega (e suas variantes Suprema/Suprema Diamond/Omega Diamond) foi vendido com uma variedade grande de motores ao longo da produção — 2.0, 2.2, o reto-6 4.1 ("S/6") e diferentes V6 (3.0 nacional e versões importadas de maior cilindrada). Peças de motor não são intercambiáveis entre essas famílias. Antes de comprar qualquer peça, confirme o código do motor pela documentação/chassi do carro, não confie apenas na cilindrada anunciada pelo vendedor.',
  },
  {
    severity: 'OK',
    title: 'Mecânica robusta, mas peças mais escassas que Vectra/Astra da mesma época',
    body: 'O Omega é reconhecido pela robustez mecânica geral, mas por ter sido produzido em volume bem menor que Vectra/Astra, peças específicas (principalmente do motor 4.1 e dos V6 importados) são mais difíceis de achar em autopeças comuns. Vale pesquisar em desmanches especializados e grupos/clubes de proprietários — a comunidade de entusiastas do modelo é ativa e costuma indicar fornecedor confiável.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento: monitore a temperatura com atenção redobrada',
    body: 'Superaquecimento é uma das falhas mais relatadas no Omega, independentemente do motor, com atenção especial aos motores 3.0 12V e 4.1 a álcool. Não ignore o ponteiro de temperatura subindo — pare o carro assim que for seguro e verifique nível do radiador/reservatório. Rodar com o motor superaquecendo é o caminho mais rápido para dano na junta do cabeçote ou pior.',
  },
  {
    severity: 'OK',
    title: 'Chicote da bobina/sensor de rotação: verifique conectores antes de trocar peça',
    body: 'Um problema clássico relatado é o motor de arranque girar normalmente mas o carro não "pegar" — em muitos casos a causa é o chicote da bobina ou do sensor de rotação desconectando dos pinos de contato, não uma peça queimada. Antes de comprar peça nova, verifique e reaperte esses conectores; resolve boa parte dos casos sem custo.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Dificuldade de partida — motor de arranque gira mas não pega',
    body: 'Queixa muito comum entre donos de Omega: o motor de arranque funciona normalmente, mas o motor não pega. Frequentemente relacionado a mau contato no chicote da bobina de ignição/sensor de rotação. Verifique conectores dessa região antes de assumir que é peça queimada.',
  },
  {
    severity: 'DANGER',
    title: 'Superaquecimento — a falha mais grave e mais recorrente do modelo',
    body: 'Superaquecimento aparece como uma das falhas mais citadas em qualquer motor do Omega, mas é mais frequente nos 3.0 12V e 4.1 a álcool. Fique atento a: ponteiro de temperatura subindo além do normal, nível de arrefecimento caindo sem vazamento visível, cheiro de líquido de arrefecimento quente. Rodar com o motor superaquecido pode empenar o cabeçote — reparo caro e, em casos extremos, motor perdido.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático — trancos leves a falhas mais sérias',
    body: 'O câmbio automático de algumas versões apresenta desde trancos leves nas trocas de marcha até falhas mais graves que exigem retífica ou substituição do conjunto. Se notar hesitação ao acelerar ou demora nas trocas de marcha, não adie o diagnóstico — o custo de reparo cresce bastante se o desgaste avançar.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de comando com folga após alta quilometragem',
    body: 'Em unidades com mais de 100.000 km, é comum o conjunto da corrente de comando apresentar desgaste e folga excessiva, a ponto de raspar na tampa frontal do motor em casos mais avançados. Ruído metálico na região frontal do motor, especialmente em marcha lenta, é sinal de alerta para inspecionar esse conjunto.',
  },
  {
    severity: 'WARN',
    title: 'Consumo elevado de óleo em versões com motor V6 importado',
    body: 'Unidades equipadas com V6 importados de maior cilindrada apresentam relatos de consumo elevado de óleo, geralmente ligado a desgaste dos anéis do pistão e queima de óleo na câmara de combustão. Monitore o nível de óleo com mais frequência que o normal nessas versões, e não espere a luz de alerta acender para completar.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma geral Omega/Suprema (adaptado para uso severo/carro de coleção no Brasil)',
    body: '10.000 km/12 meses — Troca de óleo do motor (viscosidade conforme manual do seu motor específico) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | Correia dentada ou corrente de comando conforme o motor: motores 2.0/2.2/4.1 usam correia dentada (troque preventivamente a cada 50.000-60.000 km ou 5 anos); alguns V6 usam corrente, que dura mais mas merece inspeção por folga/ruído após 100.000 km. Confirme o tipo do seu motor antes de definir o intervalo — não generalize entre motores diferentes. | 60.000 km — Fluido de arrefecimento — item crítico dado o histórico de superaquecimento do modelo. | Rodízio de pneus a cada 10.000 km. | Atenção especial: por ser um carro hoje com 25-35 anos de idade, priorize inspeção de mangueiras, coxins e borrachas de arrefecimento/suspensão por ressecamento, independente da km rodada.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Omega',
    yearFrom: 1992,
    yearTo: null,
    tireSize: '195/70 R14 · 205/60 R15 (conforme versão/motor/aro)',
    frontPsi: 30,
    rearPsi: 30,
    frontPsiLoad: 32,
    rearPsiLoad: 34,
    sparePsi: 60,
    notes: 'Sedã grande e pesado — pressão de referência de cerca de 30 PSI em uso normal, podendo chegar a 34-38 PSI com o carro carregado. Como o modelo teve várias motorizações e versões ao longo de 1992-1998, confirme sempre o valor exato na etiqueta da coluna da porta do motorista ou no manual do proprietário específico do seu chassi.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Omega', yearFrom: 1992, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Use a viscosidade/especificação exata do motor do seu chassi (2.0/2.2/4.1/V6 têm exigências diferentes).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Omega', yearFrom: 1992, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Omega', yearFrom: 1992, yearTo: null, component: 'Sistema de arrefecimento — inspeção de nível e vazamento', intervalKm: 5000, intervalMonths: null, notes: 'Superaquecimento é a falha mais grave e recorrente do modelo. Verifique nível com frequência, principalmente nos motores 3.0 12V e 4.1 a álcool.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Omega', yearFrom: 1992, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Omega', yearFrom: 1992, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor aspirado — intervalo mais generoso que motores turbo.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Omega', yearFrom: 1992, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km — carro pesado exige freios em dia.', priority: 'HIGH', order: 5 },
  { modelName: 'Omega', yearFrom: 1992, yearTo: null, component: 'Correia dentada ou corrente de comando — conforme motor', intervalKm: 55000, intervalMonths: 60, notes: 'Motores 2.0/2.2/4.1 usam correia dentada (troca preventiva a cada 50-60 mil km ou 5 anos). Alguns V6 usam corrente — confirme o tipo do seu motor antes de agendar o serviço.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Omega', yearFrom: 1992, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Item crítico dado o histórico de superaquecimento do modelo. Use apenas o aditivo especificado pela Chevrolet.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Omega', yearFrom: 1992, yearTo: null, component: 'Corrente de comando — inspeção de folga (motores com corrente)', intervalKm: 100000, intervalMonths: null, notes: 'Após 100.000 km é comum surgir folga excessiva. Ruído metálico na frente do motor em marcha lenta é sinal de alerta.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Omega', yearFrom: 1992, yearTo: null, component: 'Nível de óleo — checagem entre trocas (V6 importados)', intervalKm: 3000, intervalMonths: null, notes: 'Versões com V6 importado de maior cilindrada têm relatos de consumo elevado de óleo. Não espere a luz de alerta acender.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Omega', yearFrom: 1992, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Omega',
    yearFrom: 1992,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Omega...')

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

  console.log('✅ Chevrolet Omega concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
