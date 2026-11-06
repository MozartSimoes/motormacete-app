/**
 * Seed Fiat Fiorino — macetes, problemas, manutenção e calibragem de pneus
 * Furgão/utilitário leve, ícone do mercado comercial brasileiro desde 1988.
 * Geração atual convive com dois motores: 1.4 Fire Evo flex (86cv etanol/85cv
 * gasolina, versões Furgão/Working) e o novo 1.3 Firefly aspirado (98cv gasolina/
 * 107cv etanol, versão Endurance, desde 2025 — ~14% mais econômico). #36 no
 * ranking de vendas 2025 no Brasil (21.329 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:fiat-fiorino
 *
 * Fontes: car.blog.br, autossegredos.com.br, conexaoautomotivabr.com,
 *         mixvale.com.br, seminovos.localiza.com, cimbaju.com.br,
 *         mercadoveiculos.com, media.stellantis.com
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
    title: 'Dois motores na linha: confira qual equipa a sua unidade',
    body: 'Desde 2025, a Fiorino Endurance passou a usar o motor 1.3 Firefly aspirado (98cv gasolina/107cv etanol), cerca de 14% mais econômico que o 1.4 Fire Evo (85-86cv) que ainda equipa as versões Working e Furgão. São motores diferentes em bloco, injeção e peças de manutenção — ao comprar peças ou agendar revisão, confirme qual motor sua unidade tem antes de pedir peça errada no balcão.',
  },
  {
    severity: 'OK',
    title: 'Robustez mecânica: peça histórica com peças baratas e fartas',
    body: 'A Fiorino está no mercado brasileiro desde 1988 e é referência em baixo custo de manutenção para uso comercial — peças de suspensão, motor 1.4 Fire e itens de desgaste têm ampla disponibilidade e preço baixo em qualquer cidade, mesmo em oficinas de bairro. Essa robustez é o principal motivo de milhares de empreendedores escolherem o modelo para entrega e transporte de carga.',
  },
  {
    severity: 'OK',
    title: 'Piso plano e capacidade de 650 kg: organize a carga com cuidado',
    body: 'O compartimento de carga suporta até 650 kg de peso útil, com aproximadamente 3,1 m³ de volume interno. Distribua a carga de forma equilibrada sobre o piso plano — cargas concentradas de um lado ou muito à frente/atrás afetam a dirigibilidade e o desgaste dos pneus. Prateleiras, ganchos e divisórias podem ser instalados nas laterais preparadas para adaptação.',
  },
  {
    severity: 'WARN',
    title: 'Uso comercial intenso pede troca de óleo mais frequente',
    body: 'Se a Fiorino roda em regime de entregas (paradas e partidas constantes, carga pesada, motor sempre exigido), considere antecipar a troca de óleo para 8.000-9.000 km em vez de esperar os 10.000 km cheios — esse tipo de uso é classificado como "severo" pelos manuais e acelera a degradação do óleo.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall 2024/2025: infiltração de água na central eletrônica pode desligar o motor',
    body: 'A Fiat convocou recall (anunciado em maio de 2025) para unidades fabricadas entre 2024 e 2025 por risco de infiltração de água na central eletrônica (ECM), localizada na parte frontal do cofre do motor. Quando molhado, o módulo pode fazer o motor desligar de forma inesperada com o veículo em movimento — risco real em situação de trânsito. O reparo é gratuito nas concessionárias Fiat. Verifique se o chassi da sua Fiorino está na faixa afetada e agende o reparo o quanto antes, mesmo que o carro pareça funcionar normalmente.',
  },
  {
    severity: 'WARN',
    title: 'Falhas elétricas: sensores, injeção e luzes',
    body: 'Queixa comum entre proprietários são falhas elétricas diversas — sensores, sistema de injeção eletrônica e mau funcionamento de luzes/acessórios internos. Se notar luz de injeção acesa no painel ou comportamento elétrico inconsistente, não ignore: agende diagnóstico por scanner o quanto antes, já que esses sintomas tendem a piorar gradualmente.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de temperatura pode não acionar o ventilador corretamente',
    body: 'Há registros de falha no sensor de temperatura do motor que impedem o acionamento correto do ventilador de arrefecimento, fazendo o motor operar em temperaturas mais altas que o normal sem alertar o motorista a tempo. Fique atento ao ponteiro/indicador de temperatura no painel, especialmente em trânsito parado ou dias quentes, e não confie apenas no ventilador para perceber superaquecimento.',
  },
  {
    severity: 'WARN',
    title: 'Ruídos e vibrações na traseira',
    body: 'Reclamação frequente entre donos é a presença de estalos e vibrações, principalmente na parte traseira da carroceria — mais perceptível com o compartimento de carga vazio, já que a estrutura amplifica o ruído sem o amortecimento do peso da carga. Na maioria dos casos é folga de acabamento/fixação e não afeta a mecânica, mas vale checar se não é item solto na área de carga.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Fiorino (Fiat + ajuste uso comercial/severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (1.4 Fire Evo ou 1.3 Firefly, conforme sua versão) + filtro de óleo; antecipe para 8.000-9.000 km em uso comercial intenso. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido — mais frequente pelo desgaste natural do transporte de carga. | 20.000 km — Filtro de ar do motor; reduza o intervalo se rodar muito em vias empoeiradas. | 20.000 km — Filtro de cabine. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 40.000-60.000 km — Correia dentada e tensionadores (motor 1.4 Fire Evo — confirme no manual se sua versão usa correia ou corrente). | 60.000 km — Fluido de arrefecimento. | A cada revisão — Verificar amortecedores e molas traseiras, que trabalham sob carga variável e desgastam mais rápido que em um carro de passeio.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Fiorino',
    yearFrom: null,
    yearTo: null,
    tireSize: '175/70 R14',
    frontPsi: 30,
    rearPsi: 31,
    frontPsiLoad: 32,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Por ser furgão de carga, a pressão traseira sobe bastante conforme a carga transportada — pode chegar a 38 PSI com o veículo em carga máxima (650 kg). Sempre confirme os valores exatos (vazio e carregado) na etiqueta da coluna da porta do motorista, já que variam um pouco entre versões e anos.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Fiorino', yearFrom: null, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Antecipe para 8.000-9.000 km em uso comercial intenso (entregas, paradas constantes).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Fiorino', yearFrom: null, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Fiorino', yearFrom: null, yearTo: null, component: 'Central eletrônica (ECM) — verificar recall', intervalKm: null, intervalMonths: null, notes: 'Unidades 2024/2025: risco de infiltração de água e desligamento do motor em movimento. Reparo gratuito na concessionária.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Fiorino', yearFrom: null, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em rotas com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Fiorino', yearFrom: null, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Fiorino', yearFrom: null, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor aspirado — intervalo mais generoso que motores turbo.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Fiorino', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km — reforçado pelo uso com carga frequente.', priority: 'HIGH', order: 6 },
  { modelName: 'Fiorino', yearFrom: null, yearTo: null, component: 'Amortecedores e molas traseiras — inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Trabalham sob carga variável (carga útil de até 650 kg) e desgastam mais rápido que em carro de passeio.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Fiorino', yearFrom: null, yearTo: null, component: 'Correia dentada e tensionadores (motor 1.4 Fire Evo)', intervalKm: 60000, intervalMonths: 48, notes: 'Confirme no manual se a sua versão usa correia ou corrente antes de agendar.', priority: 'HIGH', order: 8 },
  { modelName: 'Fiorino', yearFrom: null, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Fiat.', priority: 'HIGH', order: 9 },
  { modelName: 'Fiorino', yearFrom: null, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce a pressão traseira sempre que rodar com carga.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Fiorino',
    yearFrom: null,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Fiat Fiorino...')

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

  console.log('✅ Fiat Fiorino concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
