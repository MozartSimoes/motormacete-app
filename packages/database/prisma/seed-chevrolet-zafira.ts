/**
 * Seed Chevrolet Zafira — macetes, problemas, manutenção e calibragem de pneus
 * Minivan de 7 lugares da GM no Brasil entre 2001 e 2012, baseada na
 * plataforma do Vectra/Astra. Motor 2.0 8V/16V a gasolina (Família II),
 * versões Comfort/Elegance/Elite/Collection. Problema clássico do modelo:
 * correia dentada e junta do cabeçote (motor é interferente).
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-zafira
 *
 * Fontes: opinautos.com(.br), reclameaqui.com.br, sabo.com.br,
 *         autopapo.com.br, calibrapneu.com.br, calibragemdepneu.com.br,
 *         maxturbos.com.br
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
    title: 'Correia dentada é o item mais crítico da Zafira — nunca deixe passar do prazo',
    body: 'O motor 2.0 da Zafira é interferente, e há relatos de correia dentada arrebentando bem antes do intervalo recomendado pelo manual (casos registrados por volta de 38.000 km, quando o intervalo oficial fica perto de 60.000 km). Quando a correia rompe, o estrago costuma ser generalizado — comando de válvulas, válvulas de admissão/escape, junta do cabeçote e, às vezes, o próprio cabeçote. Trate a troca da correia como prioridade máxima, e não confie apenas na quilometragem: se o carro tem mais de 5 anos desde a última troca, antecipe.',
  },
  {
    severity: 'OK',
    title: 'Correia dentada banhada a óleo: use só o óleo especificado no manual',
    body: 'Em algumas versões/anos a GM utilizou correia dentada banhada a óleo, que não tem a mesma durabilidade de uma correia seca convencional e é sensível ao tipo de óleo usado no motor. Use exclusivamente a especificação de óleo indicada no manual da Zafira — óleo fora da especificação acelera a degradação dessa correia.',
  },
  {
    severity: 'OK',
    title: '7 lugares: ajuste a pressão traseira com a 3ª fileira ocupada',
    body: 'Assim como em outras minivans de 7 lugares, a Zafira ganha peso considerável na traseira quando a terceira fileira está ocupada e com bagagem. Aumente a pressão traseira dos pneus conforme a tabela de carga da etiqueta da porta sempre que for rodar com o carro cheio — melhora estabilidade e reduz desgaste irregular.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor compartilhadas com Vectra/Astra facilitam manutenção',
    body: 'O motor 2.0 8V/16V da Zafira é o mesmo bloco Família II usado no Vectra e no Astra da mesma época — em oficina, peça peças "para motor 2.0 GM Vectra/Astra/Zafira" quando o sistema da loja não tiver cadastro específico para Zafira. Isso amplia bastante as opções de marca e preço.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Ruptura da correia dentada — dano generalizado ao motor',
    body: 'É o problema mais grave e mais citado sobre a Zafira: quando a correia dentada rompe, o motor pode sofrer danos em cascata — correia, roda dentada, tensor, balancins/comando de válvulas, válvula de admissão e escape, junta do cabeçote, além de possível retificação. Alguns casos ocorreram com quilometragem bem abaixo do intervalo recomendado pelo manual (60.000 km). Se não houver certeza sobre a data/km da última troca, priorize essa inspeção antes de qualquer outra manutenção.',
  },
  {
    severity: 'WARN',
    title: 'Junta do cabeçote — atenção a superaquecimento e perda de líquido de arrefecimento',
    body: 'Consequência comum de correia dentada com folga/desgaste ou de superaquecimento é o comprometimento da junta do cabeçote. Sintomas: perda de líquido de arrefecimento sem vazamento visível no chão, óleo com aspecto leitoso/emulsionado, superaquecimento do motor no trânsito. Não rode com esses sintomas — o dano se agrava rapidamente e o reparo fica bem mais caro.',
  },
  {
    severity: 'WARN',
    title: 'Bobina de ignição e sensores — mesma fragilidade da família Vectra/Astra',
    body: 'Por compartilhar mecânica com Vectra e Astra, a Zafira apresenta as mesmas queixas de bobina de ignição e sensores de fluxo de ar (MAF) com vida útil curta quando a peça usada não é original ou de marca confiável. Priorize procedência ao trocar esses itens.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Zafira 2.0 8V/16V (ajustado para uso severo/carro antigo no Brasil)',
    body: '10.000 km/12 meses — Troca de óleo do motor (especificação exata do manual, importante para a correia banhada a óleo) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 50.000-60.000 km ou 5 anos (o que vier primeiro) — Correia dentada + tensor + bomba d\'água preventivamente — item crítico, não adie. | 60.000 km — Fluido de arrefecimento. | Rodízio de pneus a cada 10.000 km — reforce a pressão traseira quando os 7 lugares estiverem ocupados.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Zafira',
    yearFrom: 2001,
    yearTo: null,
    tireSize: '195/65 R15 · 205/55 R16 (conforme versão/aro)',
    frontPsi: 30,
    rearPsi: 30,
    frontPsiLoad: 32,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Pressão traseira sobe consideravelmente com carga por ser minivan de 7 lugares — ajuste sempre conforme ocupação da 3ª fileira e bagagem. Confirme o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Zafira', yearFrom: 2001, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Use exatamente a especificação do manual — importante para a durabilidade da correia dentada banhada a óleo em algumas versões.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Zafira', yearFrom: 2001, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Zafira', yearFrom: 2001, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Zafira', yearFrom: 2001, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Zafira', yearFrom: 2001, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor aspirado — intervalo mais generoso que motores turbo.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Zafira', yearFrom: 2001, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Zafira', yearFrom: 2001, yearTo: null, component: 'Correia dentada + tensor', intervalKm: 55000, intervalMonths: 60, notes: 'CRÍTICO: há relatos de ruptura bem antes do intervalo oficial. Motor interferente — dano generalizado se romper. Não ultrapasse 5 anos mesmo com pouca km.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Zafira', yearFrom: 2001, yearTo: null, component: 'Bomba d\'água — troca preventiva', intervalKm: 55000, intervalMonths: 60, notes: 'Troque junto com a correia dentada.', priority: 'HIGH', order: 7 },
  { modelName: 'Zafira', yearFrom: 2001, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet. Monitore nível com frequência — perda inexplicada é sinal de alerta de junta do cabeçote.', priority: 'HIGH', order: 8 },
  { modelName: 'Zafira', yearFrom: 2001, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce pressão traseira quando rodar com 7 lugares ocupados.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Zafira',
    yearFrom: 2001,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Zafira...')

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

  console.log('✅ Chevrolet Zafira concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
