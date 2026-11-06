/**
 * Seed Toyota RAV4 — macetes, problemas, manutenção e calibragem
 * SUV médio, gerações mais recentes com motor híbrido 2.5 (motor a
 * combustão + motores elétricos, sistema HSD com bateria de alta tensão),
 * versões S Connect/SX Connect/XSE (Híbrido) 4x4. Gerações anteriores
 * (2.0/2.4 aspirados) ainda em circulação, mecânica bem mais simples.
 * #84 no ranking de vendas 2025 no Brasil (2.981 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:toyota-rav4
 *
 * Fontes: auto-doc.pt, reclameaqui.com.br, cnnbrasil.com.br,
 *         mecanicaonline.com.br, garagem360.com.br, mercadoveiculos.com
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
    title: 'Confirme se sua unidade é a versão híbrida (2.5) ou aspirada antiga (2.0/2.4)',
    body: 'O RAV4 teve gerações com motor 2.0 ou 2.4 aspirado (mecânica simples, sem sistema híbrido) e a geração atual com motor híbrido 2.5 (motor a combustão + motores elétricos, bateria de alta tensão). São mecânicas completamente diferentes — confirme sempre qual equipa sua unidade antes de orçar peça ou revisão.',
  },
  {
    severity: 'OK',
    title: 'Cobertura estendida da Toyota para componentes híbridos',
    body: 'A Toyota do Brasil oferece cobertura adicional de 36 meses contra defeitos de fabricação para componentes específicos do sistema híbrido, totalizando até 96 meses ou 200.000 km (o que ocorrer primeiro). Guarde a documentação de todas as revisões — é o que garante a validade dessa cobertura estendida.',
  },
  {
    severity: 'WARN',
    title: 'Sistema híbrido: fique atento a sinais de degradação a partir de 100.000 km',
    body: 'Em motores híbridos complexos como o do RAV4 (três motores elétricos + motor a combustão), é comum surgirem os primeiros sinais de desgaste do sistema de gestão de energia por volta de 100.000-120.000 km — redução da autonomia elétrica, ruídos incomuns no compartimento do motor e mensagens de aviso na tela. Não ignore esses sinais precoces; diagnosticar cedo evita chegar a uma falha mais séria (que tende a aparecer entre 200.000-250.000 km) com o carro entrando em modo de emergência e consumo bem mais alto.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall: painel de instrumentos pode apagar completamente com o carro em movimento',
    body: 'A Toyota convocou recall no Brasil (327 unidades de RAV4 híbrido/PHEV fabricadas entre dezembro de 2023 e agosto de 2024, além de Corolla, Corolla Cross e GR Corolla) por falha na programação do software do painel de instrumentos — o sistema grava informação em excesso na memória do equipamento, causando desgaste e podendo levar ao apagamento completo do painel. Isso significa perder informações essenciais como velocidade, nível de combustível e luzes de aviso repentinamente, inclusive com o carro em movimento — risco real de acidente. Verifique se sua unidade está na faixa de fabricação afetada e agende a reprogramação/substituição do painel na concessionária Toyota imediatamente, mesmo sem sintomas.',
  },
  {
    severity: 'WARN',
    title: 'Defeitos recorrentes no sistema eletrônico das portas (2022/2023)',
    body: 'Proprietários de unidades híbridas 2022/2023 relatam defeitos recorrentes no sistema eletrônico-mecânico de abertura, fechamento e travamento das portas, com atendimento pós-venda considerado inconsistente por parte dos donos. Se notar dificuldade para travar/destravar ou abrir/fechar portas eletricamente, documente a ocorrência e insista em diagnóstico completo do módulo, não apenas ajuste pontual.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma RAV4 (Toyota + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (2.0/2.4 aspirado ou 2.5 híbrido, conforme sua versão) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Fluido de arrefecimento (motor a combustão e, na versão híbrida, também do sistema de arrefecimento da bateria/eletrônica de potência). | Versão híbrida — Inspeção anual do sistema de alta tensão (bateria/cabos), com atenção redobrada a partir de 100.000 km. | Verificar recall de painel de instrumentos pendente (unidades dez/2023-ago/2024) na primeira visita à concessionária.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'RAV4',
    yearFrom: null,
    yearTo: null,
    tireSize: '225/65 R17 · 225/60 R18 (versões mais recentes)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Confirme sempre o valor exato do seu aro/versão/geração na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'RAV4', yearFrom: null, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor (2.0/2.4 aspirado ou 2.5 híbrido).', priority: 'CRITICAL', order: 0 },
  { modelName: 'RAV4', yearFrom: null, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'RAV4', yearFrom: null, yearTo: null, component: 'Recall de painel de instrumentos (unidades híbridas dez/2023-ago/2024)', intervalKm: null, intervalMonths: null, notes: 'Risco de apagamento total do painel em movimento — verificar na concessionária imediatamente.', priority: 'CRITICAL', order: 2 },
  { modelName: 'RAV4', yearFrom: null, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos) — versão híbrida', intervalKm: null, intervalMonths: 12, notes: 'Atenção redobrada a partir de 100.000 km pelo histórico de degradação relatado.', priority: 'HIGH', order: 3 },
  { modelName: 'RAV4', yearFrom: null, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 4 },
  { modelName: 'RAV4', yearFrom: null, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 5 },
  { modelName: 'RAV4', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'RAV4', yearFrom: null, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Toyota.', priority: 'HIGH', order: 7 },
  { modelName: 'RAV4', yearFrom: null, yearTo: null, component: 'Sistema eletrônico das portas — verificação', intervalKm: null, intervalMonths: 12, notes: 'Histórico de defeitos recorrentes relatado em unidades 2022/2023.', priority: 'MEDIUM', order: 8 },
  { modelName: 'RAV4', yearFrom: null, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'RAV4',
    yearFrom: null,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Toyota RAV4...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Toyota', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Toyota', vehicleTypeId: carroType.id },
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

  console.log('✅ Toyota RAV4 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
