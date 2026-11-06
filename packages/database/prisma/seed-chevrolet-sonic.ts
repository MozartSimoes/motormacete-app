/**
 * Seed Chevrolet Sonic — macetes, problemas, manutenção e calibragem de pneus
 * Hatch e sedan compactos vendidos no Brasil entre 2012 e 2014, posicionado
 * como "premium" dentro da linha GM da época, motor 1.6 Ecotec 16V (aspirado,
 * flex), câmbio manual 5 marchas ou automático 6 marchas, versões LT/LTZ.
 * Vendas baixas levaram ao fim da comercialização no Brasil ainda em 2014
 * (o nome "Sonic" seguiu em outros mercados e foi retomado pela Chevrolet
 * no Brasil só a partir de 2026 num SUV cupê totalmente novo e sem relação
 * mecânica com este hatch/sedan — não confundir os dois ao procurar peça).
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-sonic
 *
 * Fontes: alvaromatiassa.wordpress.com, motoragora.com.br, turbonoticias.com.br,
 *         opinautos.com.br, reclameaqui.com.br, canaltech.com.br
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
    title: 'Motor Ecotec 1.6: bom motor, mas exige calibração específica para etanol nacional',
    body: 'O motor Ecotec 1.6 16V do Sonic foi originalmente desenvolvido para outros mercados e, no Brasil, precisou de calibração específica para rodar bem com etanol. Se comprar um usado, verifique se a ECU está com o software/calibração correta para flex nacional — parte dos relatos de engasgo e falta de potência tem raiz nisso.',
  },
  {
    severity: 'WARN',
    title: 'Modelo raro no Brasil — planeje-se para peças com prazo maior',
    body: 'O Sonic foi vendido por pouco tempo no Brasil (2012-2014), então a frota remanescente é bem menor que a de Celta/Corsa/Onix. Algumas peças de carroceria e itens específicos (não-mecânicos) podem ter prazo de entrega maior ou custar mais caro por baixa demanda — vale pesquisar fornecedor antes de precisar com urgência.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático: fique atento a qualquer travamento de marcha',
    body: 'O câmbio automático do Sonic tem relatos de travamento tanto em "R" quanto em "D", impedindo a troca para outra posição. Se notar qualquer dificuldade ou resistência ao trocar de marcha, mesmo pequena, não ignore — leve para diagnóstico antes que vire um travamento completo.',
  },
  {
    severity: 'OK',
    title: 'Coxins do motor ajudam a reduzir ruído — não é "carro barulhento por natureza"',
    body: 'Parte dos ruídos internos relatados no Sonic está associada a desgaste dos coxins do motor, não a um problema de isolamento acústico de fábrica. Se o carro estiver mais barulhento que o normal, vale inspecionar os coxins antes de aceitar o ruído como "característica do modelo".',
  },
  {
    severity: 'WARN',
    title: 'Alternador: fique de olho na luz da bateria no painel',
    body: 'Há relatos de falha prematura no alternador. Se a luz de bateria acender no painel ou os elétricos começarem a funcionar de forma instável (faróis piscando, vidro elétrico lento), teste o alternador antes de trocar a bateria — o problema pode estar na recarga, não no armazenamento.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Engasgo do motor após desligamento e falta de potência',
    body: 'Relatos de falhas na programação/calibração do motor Ecotec 1.6, com engasgo do propulsor logo após desligar e sensação de falta de potência. Os problemas costumam estar associados ao uso de etanol nacional numa calibração que, em alguns lotes, não foi totalmente ajustada para esse combustível.',
  },
  {
    severity: 'WARN',
    title: 'Travamento de marcha no câmbio automático (R e D)',
    body: 'Alguns donos relatam travamento de marcha tanto na posição "R" (ré) quanto em "D" (drive), impedindo a mudança para outra posição do câmbio. É um dos defeitos mais sérios relatados no modelo — qualquer sinal de dificuldade ao trocar de marcha merece diagnóstico imediato.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento na junta da tampa de válvulas',
    body: 'A tampa de válvulas do motor apresenta defeito na junta, o que pode gerar vazamento de óleo e, em casos mais avançados, falha de funcionamento do motor. Verifique visualmente a região do cabeçote a cada troca de óleo.',
  },
  {
    severity: 'WARN',
    title: 'Ruído "toc-toc" na suspensão dianteira por desgaste de bieletas e buchas',
    body: 'Relatos de ruído constante tipo "toc-toc" ou "nhec-nhec" na suspensão dianteira ao passar por pisos irregulares, associado a desgaste prematuro de bieletas, buchas da barra estabilizadora e amortecedores. É desgaste de peças relativamente baratas de trocar.',
  },
  {
    severity: 'WARN',
    title: 'Bateria com vida útil curta em algumas unidades',
    body: 'Relatos de bateria "estufando" ou durando menos que 18 meses em alguns casos. Antes de simplesmente trocar a bateria de novo, verifique se o alternador está carregando corretamente — bateria descarregando/inchando repetidamente pode ser sintoma de sobrecarga do alternador.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Sonic 1.6 Ecotec (manual e automático)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios e suspensão (atenção a bieletas/buchas). | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Correia dentada + tensionador (confirme no manual se sua versão usa correia ou corrente) + bomba d\'água preventivamente. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático (versões AT). | Rodízio de pneus a cada 10.000 km. | Verifique o alternador se notar bateria descarregando com frequência.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Sonic',
    yearFrom: 2012,
    yearTo: 2014,
    tireSize: '195/55 R16 (aro 16) · 205/50 R17 (versões LTZ, aro 17)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 34,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Faixa de 32-34 PSI é comum para uso normal, subindo com carro carregado. Confirme o valor exato na etiqueta da coluna da porta do motorista, específico da sua versão (hatch ou sedan) e tamanho de pneu.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Sonic', yearFrom: 2012, yearTo: 2014, component: 'Óleo do motor 1.6 Ecotec', intervalKm: 10000, intervalMonths: 12, notes: 'Use a viscosidade e especificação exatas do manual.', priority: 'HIGH', order: 0 },
  { modelName: 'Sonic', yearFrom: 2012, yearTo: 2014, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Sonic', yearFrom: 2012, yearTo: 2014, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em cidades com muita poeira.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Sonic', yearFrom: 2012, yearTo: 2014, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Sonic', yearFrom: 2012, yearTo: 2014, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor 1.6 aspirado — vela convencional.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Sonic', yearFrom: 2012, yearTo: 2014, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Sonic', yearFrom: 2012, yearTo: 2014, component: 'Correia dentada + tensionador', intervalKm: 60000, intervalMonths: 60, notes: 'Confirme no manual se sua versão usa correia ou corrente. Aproveite para trocar a bomba d\'água junto.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Sonic', yearFrom: 2012, yearTo: 2014, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 7 },
  { modelName: 'Sonic', yearFrom: 2012, yearTo: 2014, component: 'Óleo do câmbio automático (versões AT)', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar dificuldade/travamento na troca de marchas.', priority: 'HIGH', order: 8 },
  { modelName: 'Sonic', yearFrom: 2012, yearTo: 2014, component: 'Bieletas e buchas da barra estabilizadora — inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Suspeito nº1 em caso de ruído "toc-toc" na suspensão dianteira.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Sonic', yearFrom: 2012, yearTo: 2014, component: 'Alternador — teste de carga', intervalKm: 30000, intervalMonths: null, notes: 'Verifique se a bateria descarregar ou "estufar" com frequência.', priority: 'MEDIUM', order: 10 },
  { modelName: 'Sonic', yearFrom: 2012, yearTo: 2014, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 11 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Sonic',
    yearFrom: 2012,
    yearTo: 2014,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Sonic...')

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

  console.log('✅ Chevrolet Sonic concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
