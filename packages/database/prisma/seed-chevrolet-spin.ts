/**
 * Seed Chevrolet Spin — macetes, problemas, manutenção e calibragem de pneus
 * Minivan/MPV de 5 ou 7 lugares, no mercado desde 2012, plataforma Onix/Prisma
 * de geração anterior à atual (Onix Plus). Motor único 1.8 SPE/4 EconoFlex
 * (4 cilindros, 8V) desde o lançamento — câmbio manual 5 marchas ou automático
 * 6 marchas (Aisin). #34 no ranking de vendas 2025 no Brasil (22.741 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-spin
 *
 * Fontes: chevrolet.com.br, mobiauto.com.br, gruposentinela.com.br,
 *         pcdcarros.com.br, opinautos.com.br, mercadoveiculos.com
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
    title: 'Motor 1.8 SPE/4: robusto e com peças fartas, mas beba mais que a média',
    body: 'O motor 1.8 de 8 válvulas equipa a Spin desde 2012 — é um motor conhecido, com peças abundantes e baratas em qualquer cidade. O lado ruim é o consumo: médias de cerca de 7 km/l na cidade com etanol são comuns, abaixo do que se espera de motores mais modernos. Não é falha, é característica do projeto — ajuste as expectativas de consumo antes de comprar pensando em economia.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático: evite trocar de marcha bruscamente em baixa velocidade',
    body: 'O câmbio automático de 6 marchas apresenta engates mais irregulares que a concorrência, especialmente em manobras de baixa velocidade. Reduza a agressividade ao alternar entre D/R em estacionamento — aguarde o carro parar completamente antes de trocar de marcha, isso reduz o desgaste das buchas de engate e a chance de tranco.',
  },
  {
    severity: 'OK',
    title: '7 lugares: ajuste a pressão traseira quando estiver com o banco extra ocupado',
    body: 'Nas versões de 7 lugares, a terceira fileira de bancos adiciona peso considerável na traseira quando ocupada. Aumente a pressão traseira dos pneus (verifique o valor de carga máxima na etiqueta da porta) sempre que for rodar com o carro cheio — isso preserva a estabilidade e reduz o desgaste irregular dos pneus traseiros.',
  },
  {
    severity: 'OK',
    title: 'Óleo de qualidade reduz risco de problema no cabeçote',
    body: 'Alguns motores 1.8 desenvolvem problema no cabeçote mesmo com baixa quilometragem — o risco aumenta muito com troca de óleo atrasada ou óleo de qualidade duvidosa. Não economize no óleo do motor: use sempre a viscosidade e especificação exatas do manual, com produto de marca confiável, e nunca ultrapasse o intervalo de troca recomendado.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com o Onix/Prisma de geração anterior',
    body: 'A Spin compartilha boa parte da mecânica (motor 1.8, componentes de suspensão) com a geração anterior de Onix/Prisma (pré-2019). Em oficinas independentes, peça peças "para Onix/Prisma antigo" ou "motor 1.8 SPE/4 GM" quando faltar cadastro específico da Spin.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Falha no cabeçote do motor 1.8 mesmo em baixa quilometragem',
    body: 'Há queixas recorrentes de falha no cabeçote do motor 1.8 mesmo em carros com baixa quilometragem — sintomas incluem perda de potência e tremores/trepidação ao ligar o motor. Se notar esses sintomas, não continue rodando "para ver se passa": leve para diagnóstico o quanto antes, já que rodar com o cabeçote comprometido pode agravar bastante o dano e o custo do reparo.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático: trancos e engates irregulares desde os primeiros meses',
    body: 'Problema crônico relatado por proprietários — trancos durante as trocas de marcha e dificuldade nos engates, às vezes já nos primeiros meses de uso. Se notar esse comportamento logo após a compra, documente e acione a garantia cedo, antes que o desgaste se acumule.',
  },
  {
    severity: 'WARN',
    title: 'Motor de arranque com falhas recorrentes',
    body: 'Falhas no motor de arranque (partida) são queixa comum entre donos de Spin. Sintoma: dificuldade ou demora para o motor "pegar" ao girar a chave/botão de partida. Custo de troca é relativamente baixo comparado a outros problemas do carro — não vale a pena conviver com partida difícil por muito tempo.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste acelerado de pneus e ruído de suspensão/bieleta',
    body: 'Relatos de desgaste de pneu acima do esperado e ruídos vindos da suspensão (frequentemente ligados à bieleta da barra estabilizadora, peça relativamente barata). Se notar ruído tipo "toc-toc" em lombadas/buracos, vale inspecionar a bieleta antes de suspeitar de problema maior — é o suspeito mais comum e mais barato de resolver.',
  },
  {
    severity: 'WARN',
    title: 'Bomba d\'água: fique atento a vazamento e superaquecimento',
    body: 'Defeito na bomba d\'água aparece nos relatos de proprietários. Sintoma: nível do líquido de arrefecimento caindo sem vazamento óbvio no chão, ou temperatura do motor subindo mais que o normal no trânsito. Verifique o nível do reservatório de arrefecimento periodicamente — perda inexplicada é sinal de alerta.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Spin 1.8 (Chevrolet + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (viscosidade conforme manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão (atenção à bieleta) e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Correia dentada (se o motor da sua versão usar correia — confirme no manual, algumas versões usam corrente) + bomba d\'água preventivamente, já que é ponto de falha conhecido. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático (versões AT) — não é vitalício em uso severo. | Rodízio de pneus a cada 10.000 km — reforce a pressão traseira quando rodar com 7 lugares ocupados.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Spin',
    yearFrom: 2012,
    yearTo: null,
    tireSize: '195/65 R15 (aro 15) · 205/60 R16 (aro 16, versões Activ/LTZ)',
    frontPsi: 32,
    rearPsi: 33,
    frontPsiLoad: 32,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Pressão traseira sobe consideravelmente com carga (até 35-36 PSI) por ser MPV de 7 lugares — ajuste sempre conforme ocupação da 3ª fileira e bagagem. Confirme o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Spin', yearFrom: 2012, yearTo: null, component: 'Óleo do motor 1.8', intervalKm: 10000, intervalMonths: 12, notes: 'Não atrase — óleo velho é fator de risco para o problema conhecido de cabeçote deste motor.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Spin', yearFrom: 2012, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Spin', yearFrom: 2012, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza para 10.000-15.000 km em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Spin', yearFrom: 2012, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Spin', yearFrom: 2012, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor 1.8 aspirado — vela convencional, intervalo mais generoso que motores turbo.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Spin', yearFrom: 2012, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Spin', yearFrom: 2012, yearTo: null, component: 'Bomba d\'água — inspeção preventiva', intervalKm: 50000, intervalMonths: null, notes: 'Ponto de falha conhecido. Verifique nível do reservatório de arrefecimento com frequência.', priority: 'HIGH', order: 6 },
  { modelName: 'Spin', yearFrom: 2012, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 7 },
  { modelName: 'Spin', yearFrom: 2012, yearTo: null, component: 'Óleo do câmbio automático (versões AT)', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício em uso severo — antecipe se notar trancos.', priority: 'HIGH', order: 8 },
  { modelName: 'Spin', yearFrom: 2012, yearTo: null, component: 'Bieleta da barra estabilizadora — inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Suspeito nº1 em caso de ruído "toc-toc" na suspensão. Peça barata, resolve boa parte dos ruídos.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Spin', yearFrom: 2012, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce pressão traseira quando rodar com 7 lugares ocupados.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Spin',
    yearFrom: 2012,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Spin...')

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

  console.log('✅ Chevrolet Spin concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
