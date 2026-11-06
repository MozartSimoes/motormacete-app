/**
 * Seed Volvo XC40 — macetes, problemas, manutenção e calibragem
 * SUV compacto premium, no mercado desde 2017/2018, plataforma CMA (Compact
 * Modular Architecture) — a mesma base compartilhada com o C40 Recharge e a
 * EX40 elétrica (tratada em arquivo separado), e não com o S60/V60/S90 (que
 * usam a plataforma maior SPA). Duas famílias mecânicas nesta ficha: motor
 * 2.0 turbo T4/T5 a gasolina (com mild-hybrid 48V nas versões badge B4/B5) e
 * a plug-in hybrid "Recharge T5" (motor 1.5 turbo 3 cilindros + motor
 * elétrico traseiro). A versão 100% elétrica com o mesmo desenho de
 * carroceria foi rebatizada "EX40" e é tratada em seed-volvo-ex40.ts.
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-xc40
 *
 * Fontes: justanswer.com, xc40forum.com, xc40forums.co.uk,
 *         clickmechanic.com, topgear.com, mercadoveiculos.com,
 *         volvocars.com/br, michelin.com.br
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
    title: 'Duas famílias mecânicas: confirme se sua unidade é mild-hybrid ou plug-in hybrid',
    body: 'A XC40 é vendida com motor 2.0 turbo T4/T5 a gasolina (versões com badge B4/B5 têm mild-hybrid 48V, com motor de arranque-gerador auxiliando o motor a combustão) ou com a plug-in hybrid "Recharge T5" (motor 1.5 turbo 3 cilindros + motor elétrico no eixo traseiro, bateria recarregável). São sistemas de manutenção bem diferentes — confirme sempre qual equipa seu carro antes de orçar peça ou revisão.',
  },
  {
    severity: 'OK',
    title: 'Zumbido/ruído ao frear no mild-hybrid é normal, não é defeito',
    body: 'Nas versões mild-hybrid (B4/B5), um leve zumbido ou "drone" ao frear é comportamento esperado do sistema de frenagem regenerativa recuperando energia para a bateria de 48V — concessionárias confirmam que esse som é normal e não indica problema no sistema de freios.',
  },
  {
    severity: 'OK',
    title: 'Recharge T5: autonomia elétrica cai bastante no frio e com aquecimento ligado',
    body: 'A autonomia elétrica anunciada (em torno de 45 km) costuma cair bastante em dias frios, e usar o aquecimento para desembaçar o vidro no modo 100% elétrico consome uma fatia considerável dessa autonomia de uma só vez. Ajuste a expectativa de uso: em clima frio, use o modo híbrido combinado em vez de insistir no modo elétrico puro para trajetos mais longos.',
  },
  {
    severity: 'OK',
    title: 'Mantenha o software do carro atualizado — resolve boa parte das reclamações',
    body: 'Grande parte das reclamações desta geração de Volvos (indicador de seta que falha, tela de infotainment travando, câmera 360º ficando preta) tem origem em software, não em peça física — atualizações via Wi-Fi (OTA) ou feitas na concessionária resolvem a maioria dos casos. Antes de pagar por diagnóstico caro, confirme se o carro está com o software atualizado.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Hastes do porta-malas falham com frequência em todas as versões',
    body: 'As hastes a gás que sustentam a tampa do porta-malas são um ponto fraco conhecido em praticamente todas as versões da XC40 — a tampa perde força e não fica sustentada aberta, podendo cair sozinha. É peça de desgaste normal, mas a Volvo cobra caro pela peça original; vale cotar alternativa compatível antes de fechar o reparo na concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Sistema mild-hybrid: falhas eletrônicas e luzes de aviso intermitentes',
    body: 'Nas versões B4/B5, já foram relatadas falhas de carregamento da bateria de 48V e luzes de aviso no painel relacionadas ao sistema elétrico — na maioria dos casos ligadas a conexões de bateria fracas ou glitches de software no módulo de controle, não a defeito mecânico grave. O sistema mild-hybrid adiciona uma camada extra de eletrônica ao carro, o que naturalmente aumenta a chance desse tipo de falha intermitente em comparação a um motor puramente a combustão.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático (T4/T5): hesitação ou atraso ao trocar de marcha',
    body: 'Algumas unidades automáticas apresentam engate atrasado ou hesitação ao trocar de marcha, principalmente em marchas mais baixas — na maioria dos relatos, uma atualização de software da transmissão feita na concessionária resolve o comportamento sem necessidade de intervenção mecânica.',
  },
  {
    severity: 'WARN',
    title: 'Recharge T5: transição do modo elétrico para o motor a combustão pode ser brusca',
    body: 'Ao esgotar a carga da bateria durante o uso no modo elétrico, a transição para o motor a combustão é relatada como pouco suave, especialmente em dias frios — sensação parecida com dar partida em motor frio, com resposta mais lenta do turbo por alguns instantes. Não é defeito isolado, é característica do sistema desta versão; ajuste a expectativa de dirigibilidade nesse momento de transição.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XC40 (Volvo + ajuste uso severo BR)',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor (T4/T5 ou Recharge T5, especificação exata do manual) + filtro de óleo — siga o sistema de manutenção adaptativo do carro. | Inspeção anual — Freios, suspensão e níveis de fluido. | 20.000-30.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | Sempre — confirme se o software do carro está atualizado antes de trocar peça por conta de comportamento estranho de tela/seta/câmera. | Mild-hybrid (B4/B5) — verificação anual das conexões e do estado da bateria de 48V. | Recharge T5 — inspeção anual do sistema de alta tensão (bateria/cabos/porta de recarga). | Sempre — inspecione as hastes do porta-malas; ponto de desgaste conhecido em toda a linha.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'XC 40',
    yearFrom: 2017,
    yearTo: null,
    tireSize: '205/65 R16 · 235/50 R18 · 235/45 R19 (versões superiores/R-Design)',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 36,
    rearPsiLoad: 39,
    sparePsi: null,
    notes: 'Muitas unidades vêm sem estepe, apenas kit de reparo (selante + compressor) — confirme o que equipa seu exemplar. A etiqueta oficial fica na coluna da porta do motorista; a versão Recharge T5 (plug-in) costuma pedir pressão um pouco maior pelo peso extra da bateria. Verifique ao menos uma vez por mês, sempre com pneus frios.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'XC 40', yearFrom: 2017, yearTo: null, component: 'Óleo do motor', intervalKm: 15000, intervalMonths: 12, notes: 'Confirme especificação conforme motor (T4/T5 ou Recharge T5) e siga o sistema de manutenção adaptativo do carro.', priority: 'CRITICAL', order: 0 },
  { modelName: 'XC 40', yearFrom: 2017, yearTo: null, component: 'Filtro de óleo', intervalKm: 15000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'XC 40', yearFrom: 2017, yearTo: null, component: 'Atualização de software do veículo', intervalKm: null, intervalMonths: 6, notes: 'Resolve boa parte das reclamações de infotainment, seta e câmera 360º. Verifique disponibilidade via Wi-Fi ou na concessionária.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XC 40', yearFrom: 2017, yearTo: null, component: 'Bateria de 48V (mild-hybrid B4/B5) — verificação de conexões', intervalKm: null, intervalMonths: 12, notes: 'Falhas de carregamento e luzes de aviso costumam ser conexão fraca ou software, não peça física.', priority: 'MEDIUM', order: 3 },
  { modelName: 'XC 40', yearFrom: 2017, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos/porta de recarga) — versão Recharge T5', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual nas versões plug-in hybrid.', priority: 'HIGH', order: 4 },
  { modelName: 'XC 40', yearFrom: 2017, yearTo: null, component: 'Hastes do porta-malas — inspeção', intervalKm: null, intervalMonths: 24, notes: 'Ponto fraco conhecido em toda a linha. Cuidado ao carregar embaixo do porta-malas aberto se estiver fraca.', priority: 'LOW', order: 5 },
  { modelName: 'XC 40', yearFrom: 2017, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 30000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'XC 40', yearFrom: 2017, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 7 },
  { modelName: 'XC 40', yearFrom: 2017, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 8 },
  { modelName: 'XC 40', yearFrom: 2017, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Volvo.', priority: 'HIGH', order: 9 },
  { modelName: 'XC 40', yearFrom: 2017, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'XC 40',
    yearFrom: 2017,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volvo XC 40...')

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

  console.log('✅ Volvo XC 40 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
