/**
 * Seed Volvo 850 — macetes, problemas, manutenção e calibragem de pneus
 * Sedan e perua "850 SW" de tração dianteira (FWD), produzido de 1992 a
 * 1997. Marco na história da Volvo: primeiro modelo com motor 5 cilindros
 * em linha transversal (2.0/2.3/2.4/2.5, aspirado ou Turbo), versões
 * GLE/GLT/T-5/R. O motor 5 cilindros é uma característica marcante dessa
 * geração Volvo e foi reaproveitado (com evoluções) nos S70/V70/C70
 * seguintes — muita peça de motor é compartilhada entre essas gerações.
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-850
 *
 * Fontes: matthewsvolvosite.com, forumvolvo.com (Portugal),
 *         forum.motorguia.net, autolivraria.com.br, en.wikipedia.org (Volvo 850)
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
    title: 'Motor 5 cilindros: peça compartilhada com S70/V70/C70 posteriores',
    body: 'O 850 foi o primeiro Volvo com motor 5 cilindros em linha — motor que a Volvo manteve (com evoluções) nos S70/V70/C70 lançados logo depois. Na hora de procurar peça de motor (bielas, juntas, sensores, bomba d\'água), pesquise também "para Volvo S70/V70 2.0/2.3/2.4/2.5" além de "850" — amplia bastante as opções, principalmente em peça usada de desmanche.',
  },
  {
    severity: 'OK',
    title: 'Considerado "carro zumbi": nem sempre confiável, mas raramente para de vez',
    body: 'Entre entusiastas, o 850 tem fama de "carro zumbi" — não é um carro isento de problemas, mas mesmo com defeitos acumulados costuma continuar rodando. Isso não é desculpa para ignorar manutenção: é só um lembrete de que sintoma pequeno (ruído, luz de aviso) não deve ser adiado só porque "o carro ainda anda".',
  },
  {
    severity: 'WARN',
    title: 'Relé da bomba de combustível: guarde um sobressalente',
    body: 'Falha no relé da bomba de combustível é uma causa clássica de "carro não pega do nada" no 850. É peça barata e fácil de trocar — muitos donos de longa data mantêm um relé sobressalente no porta-luvas, já que o defeito costuma aparecer sem aviso.',
  },
  {
    severity: 'OK',
    title: 'Peça original cara no Brasil: importação via comunidade é caminho real',
    body: 'Peça original Volvo dessa época é cara e escassa em revenda nacional. A comunidade de entusiastas Volvo (clubes e grupos online) é o canal mais usado para localizar peça de desmanche europeu/americano ou encomendar peça nova via importação — vale entrar nesses grupos antes de pagar preço de concessionária por item que nem sempre está disponível no Brasil.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vedação de haste de válvula e anéis de pistão desgastados com a idade',
    body: 'Vedação de haste de válvula ruim e anéis de pistão desgastados são apontados como "doenças crônicas" do motor 5 cilindros do 850 — o carro pode até rodar bem apesar disso, mas quem quer o motor durando mais deve evitar comprar um exemplar que já apresente esses sintomas (fumaça no escape, consumo de óleo alto).',
  },
  {
    severity: 'WARN',
    title: 'PCV (respiro do cárter) entupido também é queixa recorrente',
    body: 'Sistema de ventilação positiva do cárter (PCV) entupido é outro ponto fraco comum nesse motor, com sintomas parecidos aos de desgaste de anel (consumo de óleo, fumaça). Antes de assumir que o motor está "gasto", vale checar e limpar o sistema PCV — é conserto bem mais barato.',
  },
  {
    severity: 'WARN',
    title: 'Carro não pega: relé da bomba de combustível e filtro de combustível são os primeiros suspeitos',
    body: 'Além da bomba de combustível em si, filtro de combustível entupido é causa comum de dificuldade para pegar ou perda de força. São itens de manutenção simples e baratos — descarte-os antes de investigar problema mais caro na injeção.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 850 (referência genérica para o motor 5 cilindros da época)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo (mais frequente nas versões Turbo/T-5). | 10.000 km — Inspeção de freios, embreagem e níveis de fluido. | 20.000 km — Filtro de ar e filtro de combustível. | 20.000-30.000 km — Velas de ignição. | 60.000 km — Correia dentada + tensor + bomba d\'água (troque juntos preventivamente, motor antigo e peça hoje mais difícil de achar). | Sempre — mantenha um relé de bomba de combustível sobressalente; verifique sistema PCV se notar consumo de óleo alto ou fumaça no escape.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: '850',
    yearFrom: 1992,
    yearTo: 1997,
    tireSize: '185/65 R15 · 195/60 R15 (GLT/T-5) · 205/50 R16 (R)',
    frontPsi: 28,
    rearPsi: 28,
    frontPsiLoad: 30,
    rearPsiLoad: 34,
    sparePsi: 60,
    notes: 'Valor de referência genérico — confirme sempre na etiqueta original da coluna da porta do motorista ou manual do exemplar específico, já que a variação de pneu entre GLE/GLT/T-5/R é grande. Reforce a traseira na versão perua (850 SW) com porta-malas carregado.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: '850', yearFrom: 1992, yearTo: 1997, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Antecipe nas versões Turbo/T-5.', priority: 'HIGH', order: 0 },
  { modelName: '850', yearFrom: 1992, yearTo: 1997, component: 'Filtro de combustível', intervalKm: 20000, intervalMonths: 24, notes: 'Suspeito comum em caso de dificuldade para pegar ou perda de força.', priority: 'MEDIUM', order: 1 },
  { modelName: '850', yearFrom: 1992, yearTo: 1997, component: 'Relé da bomba de combustível — ter sobressalente', intervalKm: null, intervalMonths: null, notes: 'Falha clássica de "carro não pega do nada" — item barato, vale manter reserva no porta-luvas.', priority: 'MEDIUM', order: 2 },
  { modelName: '850', yearFrom: 1992, yearTo: 1997, component: 'Sistema PCV (respiro do cárter) — inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Entupimento causa sintomas parecidos com desgaste de anel de pistão (fumaça, consumo de óleo).', priority: 'MEDIUM', order: 3 },
  { modelName: '850', yearFrom: 1992, yearTo: 1997, component: 'Correia dentada + tensor + bomba d\'água', intervalKm: 60000, intervalMonths: 48, notes: 'Troque em conjunto — motor de projeto antigo, peça cada vez mais difícil de achar nova.', priority: 'HIGH', order: 4 },
  { modelName: '850', yearFrom: 1992, yearTo: 1997, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: '850', yearFrom: 1992, yearTo: 1997, MACETES, PROBLEMAS, MANUTENCAO },
]

async function main() {
  console.log('🚗 Seed Volvo 850...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volvo', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volvo', vehicleTypeId: carroType.id },
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

  console.log('✅ Volvo 850 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
