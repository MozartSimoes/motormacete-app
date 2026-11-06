/**
 * Seed Caoa Chery Tiggo 8 — macetes, problemas, manutenção e calibragem de pneus
 * SUV 7 lugares topo de linha da marca no Brasil. Três variantes de trem de
 * força na linha atual: 1.6 TGDi turbo flex (Pro/Max Drive, câmbio automático
 * de dupla embreagem) e 1.5 turbo Plug-in Hybrid DHT (Pro Max, 317cv
 * combinados, bateria 19,27 kWh, ~54 km de autonomia elétrica). #42 no
 * ranking de vendas 2025 no Brasil (17.884 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:caoachery-tiggo8
 *
 * Fontes: reclameaqui.com.br, mobiauto.com.br, caoachery.com.br,
 *         cnnbrasil.com.br, blogauto.com.br, 54psi.com, pneuponto.com.br
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
    title: 'Três trens de força na linha: confirme qual equipa sua unidade',
    body: 'A linha Tiggo 8 combina motor 1.6 TGDi turbo flex (versões Pro e Max Drive, câmbio automático de dupla embreagem) e o Pro Max Plug-in Hybrid, com motor 1.5 turbo + dois motores elétricos entregando 317cv combinados via câmbio DHT (transmissão dedicada a híbridos). São mecânicas bem diferentes — confirme qual equipa sua unidade antes de agendar revisão ou comprar peça.',
  },
  {
    severity: 'OK',
    title: 'Pro Max PHEV: gerencie o nível mínimo de bateria conforme seu uso',
    body: 'No Pro Max Plug-in Hybrid, o motorista pode configurar o nível mínimo de reserva da bateria (entre 20% e 70%) pela central multimídia. Para uso urbano no dia a dia, manter uma reserva menor (20-30%) maximiza o uso do modo elétrico; para viagens ou rotas com pouca infraestrutura de recarga, aumente a reserva mínima para garantir mais força do motor elétrico disponível quando precisar.',
  },
  {
    severity: 'OK',
    title: 'Freio regenerativo ajuda a poupar as pastilhas no PHEV',
    body: 'No Pro Max, o sistema de frenagem regenerativa recupera energia cinética nas desacelerações e devolve à bateria. Isso reduz o desgaste das pastilhas e discos de freio convencionais em uso urbano — mas não deixe de inspecionar o sistema de freios nas revisões, já que o regenerativo não substitui completamente o freio a disco em frenagens fortes.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio de dupla embreagem (versões turbo): evite ficar parado engatado por muito tempo',
    body: 'Nas versões 1.6 TGDi (Pro/Max Drive) com câmbio automático de dupla embreagem, evite manter o carro parado por longos períodos com a marcha engatada e o pé no freio — coloque em Neutro/Park em paradas longas. Esse cuidado reduz o desgaste do conjunto de embreagens do câmbio dupla embreagem.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Falhas no ar-condicionado são queixa recorrente',
    body: 'O ar-condicionado é um dos problemas mais citados por proprietários do Tiggo 8, afetando tanto versões a combustão quanto híbridas, em carros novos e já rodados. Peças de reposição do sistema custam entre R$ 2.540 e R$ 2.839, mais R$ 550-765 de mão de obra. Se notar perda de eficiência de resfriamento, não adie o diagnóstico — o problema tende a se agravar.',
  },
  {
    severity: 'DANGER',
    title: 'Sistemas de segurança: relatos de frenagem/alerta de colisão disparando sem motivo',
    body: 'Há relato documentado de ativação inesperada do freio automático de emergência e do alerta de colisão em um Tiggo 8 Pro Hybrid, causando lesão em ocupante mesmo com cinto de segurança. Se sua unidade apresentar frenagens ou alertas de colisão sem motivo aparente, procure a concessionária imediatamente para calibração/diagnóstico dos sensores ADAS — não é comportamento normal do sistema.',
  },
  {
    severity: 'WARN',
    title: 'Multimídia trava e exige reset frequente',
    body: 'Proprietários relatam necessidade de resetar a central multimídia com frequência e recursos que deveriam funcionar automaticamente precisando ser reativados manualmente. Mantenha o software da central sempre atualizado na concessionária — várias dessas instabilidades são corrigidas por atualização, sem necessidade de troca de peça.',
  },
  {
    severity: 'WARN',
    title: 'Ruído interno excessivo e desalinhamento de direção relatados',
    body: 'Alguns proprietários relatam ruído interno acima do esperado para a categoria e sensação de direção desalinhada, comprometendo a dirigibilidade. Se notar o carro "puxando" para um lado ou vibração no volante, peça alinhamento e balanceamento — em alguns casos o problema é resolvido com ajuste de geometria de suspensão, não com troca de peça.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tiggo 8 (Caoa Chery + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (1.6 TGDi ou 1.5 turbo híbrido) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Óleo do câmbio de dupla embreagem (versões Pro/Max Drive) ou do câmbio DHT (versão Pro Max) — não é vitalício, antecipe se notar tranco. | 60.000 km — Fluido de arrefecimento. | Pro Max (PHEV) — Inspeção anual do sistema de alta tensão (bateria/cabos) e do sistema de recarga. | Ar-condicionado — Verificar gás e funcionamento a cada revisão, dado o histórico de falhas relatado.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Tiggo 8',
    yearFrom: null,
    yearTo: null,
    tireSize: '235/55 R18 · 235/50 R19 (versões Max Drive/Pro Max)',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'SUV 7 lugares — pressão traseira sobe consideravelmente com o carro cheio (3ª fileira + bagagem). Confirme o valor exato na etiqueta da coluna da porta e recalibre a cada 15 dias.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Tiggo 8', yearFrom: null, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme a especificação exata conforme motor (1.6 TGDi ou 1.5 turbo híbrido).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Tiggo 8', yearFrom: null, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Tiggo 8', yearFrom: null, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Tiggo 8', yearFrom: null, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Tiggo 8', yearFrom: null, yearTo: null, component: 'Sistema de ar-condicionado — verificação', intervalKm: null, intervalMonths: 12, notes: 'Histórico de falhas relatado por proprietários — verifique gás e funcionamento a cada revisão.', priority: 'HIGH', order: 4 },
  { modelName: 'Tiggo 8', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Tiggo 8', yearFrom: null, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Caoa Chery.', priority: 'HIGH', order: 6 },
  { modelName: 'Tiggo 8', yearFrom: null, yearTo: null, component: 'Óleo do câmbio (dupla embreagem ou DHT)', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício. Antecipe se notar tranco ou solavanco nas trocas.', priority: 'HIGH', order: 7 },
  { modelName: 'Tiggo 8', yearFrom: null, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos) — versão Pro Max PHEV', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual do sistema elétrico de alta tensão e do sistema de recarga.', priority: 'HIGH', order: 8 },
  { modelName: 'Tiggo 8', yearFrom: null, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce a pressão traseira quando rodar com os 7 lugares ocupados.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Tiggo 8',
    yearFrom: null,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Caoa Chery Tiggo 8...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Caoa Chery', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Caoa Chery', vehicleTypeId: carroType.id },
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

  console.log('✅ Caoa Chery Tiggo 8 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
