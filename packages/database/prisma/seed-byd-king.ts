/**
 * Seed BYD King — macetes, problemas, manutenção e calibragem de pneus
 * Sedã híbrido plug-in DM-i, concorrente direto do Corolla/Civic. Motor 1.5
 * aspirado + motor(es) elétrico(s), bateria Blade LFP, câmbio CVT dedicado
 * ao sistema híbrido. Duas versões: GL e GS (mais equipada). #52 no ranking
 * de vendas 2025 no Brasil (12.412 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:byd-king
 *
 * Fontes: autoo.com.br, reclameaqui.com.br, mobiauto.com.br,
 *         pcdcarros.com.br, voltarapida.net, byd.com (manual/ficha técnica)
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
    title: 'Consumo real próximo ao anunciado — hábito de recarga ainda importa',
    body: 'O King promete até 26,5 km/l (Inmetro) e proprietários confirmam consumo próximo ao anunciado no uso real. Ainda assim, para aproveitar ao máximo o sistema híbrido plug-in, recarregue sempre que possível em tomada residencial/wallbox — rodar só no modo híbrido sem nunca recarregar reduz a economia real que o carro pode entregar.',
  },
  {
    severity: 'WARN',
    title: 'Carregador portátil: confirme a tensão antes de usar em tomada 220V',
    body: 'Há relatos de carregador portátil que, apesar de anunciado como compatível com tensões de até 250V, só funciona corretamente em tomadas 127V em algumas unidades. Antes de contar com o carregador portátil como solução para recarga fora de casa, teste-o na tensão disponível no local e tenha um plano B (wallbox dedicado) caso ele não funcione.',
  },
  {
    severity: 'WARN',
    title: 'Pneus originais: monitore o desgaste com mais frequência',
    body: 'Proprietários relatam desgaste prematuro dos pneus de fábrica, com poucos milhares de km rodados. Verifique a profundidade dos sulcos e o padrão de desgaste a cada abastecimento/recarga, e mantenha o alinhamento e balanceamento sempre em dia — isso ajuda a identificar desgaste irregular cedo e prolongar a vida útil.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ruído e defeito na suspensão dianteira, mesmo em carros com poucos meses de uso',
    body: 'Assim como em outros modelos da BYD, há relatos de ruído e defeito na suspensão dianteira do King mesmo em unidades com poucos meses de uso — em alguns casos, a concessionária trocou o setor de direção mas identificou que as bieletas também estavam com defeito, e o barulho persistiu mesmo após reparo. Se notar ruído na suspensão, documente e exija diagnóstico completo (não apenas troca de uma peça isolada) antes de aceitar o carro de volta.',
  },
  {
    severity: 'WARN',
    title: 'Defeitos de acabamento relatados na entrega (0km)',
    body: 'Compradores relatam manchas de pintura, folgas em peças do interior, cintos de segurança que não regulam altura corretamente e itens que soltam já na primeira limpeza. Faça uma vistoria minuciosa de pintura, acabamento e funcionamento de todos os itens (cintos, painel digital) no ato da entrega, antes de assinar o termo de recebimento.',
  },
  {
    severity: 'WARN',
    title: 'Luz de injeção acesa e dificuldade de carregamento relatadas',
    body: 'Alguns proprietários relatam luz de injeção acendendo no painel e dificuldade para completar o processo de carregamento da bateria. Se notar qualquer um desses sintomas, procure a concessionária para diagnóstico — e, segundo relatos, fique atento também à qualidade do carro reserva oferecido durante o reparo, apontado como inadequado por alguns clientes.',
  },
  {
    severity: 'WARN',
    title: 'Volante descascando após poucos meses de uso',
    body: 'Há relatos de revestimento do volante descascando já nos primeiros meses de uso, sem solução definitiva reportada em alguns casos. Registre o problema formalmente na primeira ocorrência para reforçar o histórico caso precise acionar a garantia com mais insistência.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma King (BYD + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor a combustão + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão dianteira (atenção a ruídos) e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 40.000-60.000 km — Fluido do câmbio CVT/DM-i dedicado ao sistema híbrido. | Anual — Inspeção do sistema de alta tensão (bateria/cabos) e do carregador (portátil e porta de recarga). | A cada abastecimento/recarga — Verificar visualmente o desgaste dos pneus, item com histórico de desgaste prematuro relatado.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'King',
    yearFrom: 2024,
    yearTo: null,
    tireSize: '225/60 R16 (GL) · 215/55 R17 (GS)',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 36,
    rearPsiLoad: 38,
    sparePsi: null,
    notes: 'Confirme sempre o valor exato na etiqueta da coluna da porta do motorista, já que pode variar por versão. Verifique se sua unidade tem estepe ou apenas kit reparador.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'King', yearFrom: 2024, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.5 aspirado do sistema híbrido DM-i.', priority: 'CRITICAL', order: 0 },
  { modelName: 'King', yearFrom: 2024, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'King', yearFrom: 2024, yearTo: null, component: 'Suspensão dianteira — inspeção detalhada', intervalKm: 10000, intervalMonths: null, notes: 'Histórico de ruído/defeito relatado mesmo em carros novos — exigir diagnóstico completo, não só troca de peça isolada.', priority: 'HIGH', order: 2 },
  { modelName: 'King', yearFrom: 2024, yearTo: null, component: 'Pneus — verificação de desgaste', intervalKm: 5000, intervalMonths: null, notes: 'Relatos de desgaste prematuro nos pneus de fábrica.', priority: 'MEDIUM', order: 3 },
  { modelName: 'King', yearFrom: 2024, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 4 },
  { modelName: 'King', yearFrom: 2024, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 5 },
  { modelName: 'King', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'King', yearFrom: 2024, yearTo: null, component: 'Fluido do câmbio CVT/DM-i', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício — antecipe se notar tranco ou solavanco.', priority: 'HIGH', order: 7 },
  { modelName: 'King', yearFrom: 2024, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos) e carregador', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual, incluindo teste do carregador portátil em diferentes tensões.', priority: 'HIGH', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'King',
    yearFrom: 2024,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed BYD King...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BYD', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'BYD', vehicleTypeId: carroType.id },
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

  console.log('✅ BYD King concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
