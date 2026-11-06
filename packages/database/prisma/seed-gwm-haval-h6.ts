/**
 * Seed GWM Haval H6 — macetes, problemas, manutenção e calibragem
 * SUV médio híbrido (HEV e PHEV), o modelo mais popular da GWM no
 * Brasil. Motor 1.5 turbo a gasolina + motor(es) elétrico(s), tração
 * FWD ou AWD conforme versão.
 * Execute: pnpm --filter @motormacete/database db:seed:gwm-haval-h6
 *
 * Fontes: turbonoticias.com.br, reclameaqui.com.br, automaistv.com.br,
 *         mobiauto.com.br, consultadeplaca.net, mundodoautomovelparapcd.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

const MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Bateria de 12V descarregando na garagem: atualize o software',
    body: 'Em lotes iniciais, o software de gerenciamento não controlava bem o consumo da bateria pequena de chumbo-ácido (a de 12V comum, não a de tração) — ela descarregava em poucos dias parado na garagem. A GWM já lançou atualizações de software que resolvem bem esse consumo excessivo. Se seu carro apresenta isso, leve para atualizar o software na concessionária antes de suspeitar de bateria defeituosa.',
  },
  {
    severity: 'WARN',
    title: 'Peça de lataria pode demorar 30-90 dias — considere isso ao decidir sobre seguro',
    body: 'A logística de peças da GWM no Brasil ainda está se estruturando, e peça de lataria (para-choque, farol) frequentemente depende de importação da China, com prazo real de 30 a 90 dias. Isso é um argumento forte para manter seguro com cobertura de carro reserva, já que um reparo simples de colisão pode deixar o carro parado por bastante tempo.',
  },
  {
    severity: 'OK',
    title: 'ADAS calibrado para trânsito chinês: frenagens fantasmas são conhecidas, não é defeito isolado',
    body: 'O pacote de assistência à condução (frenagem automática de emergência) foi calibrado originalmente para o trânsito chinês e pode frear bruscamente por sombra de viaduto, placa metálica no chão ou caminhão na faixa ao lado. Não é sinal de carro com problema — é característica de calibração conhecida. Fique de mãos no volante e atento nessas situações específicas, e verifique se há atualização de software do ADAS disponível na concessionária.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'PHEV: recall por perda de potência em rodovia — válvula termostática da bateria de alta tensão',
    body: 'A GWM abriu um chamado oficial para o Haval H6 PHEV34 2025 após relatos de perda de potência em rodovia, em velocidade mais alta e com ar-condicionado ligado — causa identificada foi funcionamento irregular da válvula termostática do sistema de arrefecimento da bateria de alta tensão, que não enviava fluido para resfriar as baterias, superaquecendo o componente e ativando o Modo de Proteção. Consulte a concessionária com o chassi do seu carro para confirmar se está na faixa do chamado e agende o reparo se estiver.',
  },
  {
    severity: 'WARN',
    title: 'Bugs de multimídia são queixa recorrente',
    body: 'Instabilidade e bugs no sistema de multimídia aparecem entre as queixas mais comuns de proprietários. Mantenha o software da central sempre atualizado na concessionária — boa parte dessas instabilidades é resolvida por atualização, sem necessidade de troca de peça.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Haval H6 (HEV/PHEV)',
    body: '12.000 km — Revisão programada (óleo do motor 1.5 turbo, inspeção geral, ~R$890). | 24.000 km — Revisão programada, já incluindo inspeção do sistema híbrido (~R$1.290). | Sempre — mantenha software do carro (multimídia e módulos) atualizado na concessionária, resolve boa parte das instabilidades relatadas. | PHEV — se notar perda de potência em rodovia com ar-condicionado ligado, confirme se seu chassi está na faixa do chamado da válvula termostática da bateria.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Haval H6', yearFrom: 2022, yearTo: null, tireSize: '215/60 R18 · 235/50 R19 (referência conforme versão)', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Sem estepe na maioria das versões (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Haval H6', yearFrom: 2022, yearTo: null, component: 'Revisão programada 12.000 km (óleo + inspeção geral)', intervalKm: 12000, intervalMonths: 12, notes: 'Custo de referência ~R$890.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Haval H6', yearFrom: 2022, yearTo: null, component: 'Revisão programada 24.000 km (com inspeção do sistema híbrido)', intervalKm: 24000, intervalMonths: 24, notes: 'Custo de referência ~R$1.290.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Haval H6', yearFrom: 2022, yearTo: null, component: 'Confirmação de chamado da válvula termostática (versões PHEV)', intervalKm: null, intervalMonths: null, notes: 'Consulte a concessionária com o chassi do carro.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Haval H6', yearFrom: 2022, yearTo: null, component: 'Atualização de software (multimídia/módulos)', intervalKm: null, intervalMonths: 6, notes: 'Resolve boa parte dos bugs relatados e o consumo excessivo da bateria de 12V.', priority: 'MEDIUM', order: 3 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Haval H6', yearFrom: 2022, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed GWM Haval H6...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'GWM', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'GWM', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Haval H6', brandId: brand.id } },
    update: {}, create: { name: 'Haval H6', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Haval H6' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Haval H6' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Haval H6' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ GWM Haval H6 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
