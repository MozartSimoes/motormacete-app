/**
 * Seed BYD Tang — macetes, problemas, manutenção e calibragem de pneus
 * SUV elétrico grande de 7 lugares (2+3+2), tração integral AWD com um motor
 * elétrico em cada eixo (dianteiro 180 kW + traseiro 200 kW, 517 cv
 * combinados, 70 kgfm), bateria Blade LFP de 108,8 kWh, autonomia de até
 * 430 km (ciclo PBEV/Inmetro) após o facelift 2025 (antes: bateria 86,4 kWh
 * e 309 km). Recarga rápida DC 110 kW (30-80% em ~30 min). Suspensão
 * adaptativa DiSus-C, rodas de 22". Preço a partir de aprox. R$ 530-537 mil.
 * Primeiro carro da BYD vendido no Brasil, plataforma e-Platform 3.0.
 *
 * PECULIARIDADE CRÍTICA DE NOMENCLATURA (FIPE): o endpoint de tips
 * (apps/web/app/api/tips/route.ts) casa `Tip.modelName` como SUBSTRING
 * (regex \b...\b, case-insensitive) contra a string completa do modelo na
 * tabela FIPE. Confirmamos via API oficial da FIPE
 * (parallelum.com.br/fipe/api/v1/carros/marcas/238/modelos) que o nome
 * cadastrado lá é "TAN EV 4x4 (Elétrico)" — SEM o "G" final, um erro de
 * digitação real da própria FIPE (o correto seria "TANG"). Curiosamente a
 * própria BYD Brasil replica essa grafia em material oficial (byd.com/br/car/tan
 * e no Manual do Proprietário, nomeado "TAN_MP_..."), então não é só um erro
 * isolado da FIPE. Por isso, TODOS os registros abaixo (Tip, TirePressure,
 * MaintenanceItem, VehicleModel) usam `modelName: 'Tan EV'` — é a única forma
 * de casar como substring de "TAN EV 4x4 (Elétrico)". Isso é apenas a CHAVE
 * interna de matching no banco. No texto voltado ao usuário (título/corpo dos
 * tips), sempre escrevemos corretamente "BYD Tang" (com G), nunca "Tan".
 * Execute: pnpm --filter @motormacete/database db:seed:byd-tang
 *
 * Fontes: byd.com/br/car/tan, byd.com (Manual do Proprietário TAN EV, PDF),
 *         carroseletricosbrasil.com, cnnbrasil.com.br, mobiauto.com.br,
 *         webmotors.com.br, reclameaqui.com.br, autopapo.com.br,
 *         carnewschina.com, cnevpost.com, tpmsreset.com, wheel-size.com
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
    title: 'Carregue sempre que possível — não espere a bateria zerar',
    body: 'Com bateria Blade LFP de 108,8 kWh, o BYD Tang aceita ciclos parciais de recarga sem prejuízo de vida útil (diferente de baterias NMC). Prefira manter a carga entre 20% e 90% no dia a dia e reserve a carga até 100% para viagens longas — isso ajuda a preservar a bateria e evita ficar dependente de recarga rápida DC com frequência.',
  },
  {
    severity: 'OK',
    title: 'Autonomia real varia bastante com uso do ar-condicionado e velocidade',
    body: 'A BYD anuncia até 430 km no ciclo PBEV/Inmetro, mas relatos de proprietários indicam algo entre 350 e 380 km em uso urbano real com ar-condicionado ligado, e menos em estradas com velocidade constante alta. Planeje viagens longas com folga e use o modo de condução Eco para esticar a autonomia quando precisar.',
  },
  {
    severity: 'WARN',
    title: 'Peças e atendimento pós-venda ainda dependem só da concessionária',
    body: 'Por ser um SUV grande e recente, o Tang praticamente não tem peças no mercado paralelo — tudo passa pela rede BYD, que já registrou atrasos de semanas a mais de 90 dias para peças específicas em outros modelos da marca no Brasil. Antes de comprar, verifique a proximidade e a reputação da concessionária mais próxima, e considere negociar carro reserva em caso de reparo prolongado.',
  },
  {
    severity: 'WARN',
    title: 'Rodas de 22" exigem atenção redobrada em buracos e lombadas',
    body: 'O perfil baixo dos pneus nas rodas de 22" do Tang deixa a roda e o pneu mais vulneráveis a danos em buracos e lombadas mal feitas, comuns nas ruas brasileiras. Reduza a velocidade em pavimento irregular e evite encostar a roda no meio-fio ao estacionar, para não amassar a roda ou cortar a lateral do pneu.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Recall de 2025 na China não afeta as unidades vendidas no Brasil',
    body: 'Em outubro de 2025 a BYD abriu recall na China para cerca de 44.500 unidades do Tang de geração antiga (híbrido plug-in fabricado entre 2015 e 2017), por risco de falha na controladora do motor elétrico. Esse recall é específico do mercado chinês e da geração PHEV mais antiga — não tem relação com o BYD Tang EV vendido no Brasil, de geração e plataforma diferentes (e-Platform 3.0). Ainda assim, fique de olho em comunicados oficiais da BYD Brasil, prática recomendada para qualquer veículo.',
  },
  {
    severity: 'WARN',
    title: 'Ruído e desgaste irregular na suspensão dianteira relatados em outros modelos BYD',
    body: 'Como em outros carros da marca no Brasil, há relatos de ruído na suspensão dianteira e desgaste irregular de pneus por alinhamento/cambagem não ajustados corretamente após reparo. Se notar barulho na suspensão do Tang, exija da concessionária alinhamento e cambagem completos após qualquer troca de peça, não apenas a substituição isolada do componente.',
  },
  {
    severity: 'WARN',
    title: 'Demora no atendimento pós-venda é o ponto mais criticado da marca no Brasil',
    body: 'Reportagens e reclamações registradas no Reclame Aqui e em veículos especializados (AutoPapo) apontam a espera por agendamento, diagnóstico e chegada de peças como o principal problema dos donos de BYD no Brasil — não a qualidade do carro em si. Documente datas e protocolos de atendimento desde o primeiro contato, isso ajuda a cobrar prazos e, se necessário, acionar o Procon ou a garantia legal.',
  },
  {
    severity: 'WARN',
    title: 'Defeitos de acabamento e pintura relatados na entrega',
    body: 'Assim como em outros modelos da marca, há relatos de pequenas falhas de pintura e acabamento identificadas já na entrega. Faça uma vistoria minuciosa de pintura, frestas e funcionamento de todos os equipamentos (telas, som, ADAS) no ato do recebimento, antes de assinar o termo — problema registrado na entrega é mais fácil de resolver na garantia.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tang (BYD + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Inspeção geral (freios, suspensão, direção, níveis de fluido) e verificação do sistema de recarga (carregador portátil e porta de recarga). | 10.000 km — Rodízio de pneus, considerando o desgaste mais acentuado das rodas de 22". | 20.000 km — Filtro de cabine (ar-condicionado). | 40.000 km — Fluido de freio DOT 4. | Anual — Inspeção do sistema de alta tensão (bateria Blade, cabos de alta tensão, isolamento) por técnico certificado BYD. | A cada abastecimento/recarga — Checar visualmente pneus e rodas de 22" por cortes ou amassados após pavimento irregular. | Conforme uso — Software/firmware: mantenha as atualizações OTA (over-the-air) em dia, elas costumam trazer correções de ADAS e do sistema de recarga.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Tan EV',
    yearFrom: 2023,
    yearTo: null,
    tireSize: '265/40 R22',
    frontPsi: 38,
    rearPsi: 42,
    frontPsiLoad: null,
    rearPsiLoad: null,
    sparePsi: null,
    notes: 'Confirme sempre o valor exato na etiqueta da coluna da porta do motorista. O Tang não tem estepe (apenas kit reparador) — calibre com atenção redobrada e verifique com frequência por ser SUV pesado com rodas de perfil baixo (22").',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Tan EV', yearFrom: 2023, yearTo: null, component: 'Inspeção geral (freios, suspensão, direção)', intervalKm: 10000, intervalMonths: 12, notes: 'Revisão programada BYD, sem troca de óleo de motor por ser 100% elétrico.', priority: 'HIGH', order: 0 },
  { modelName: 'Tan EV', yearFrom: 2023, yearTo: null, component: 'Sistema de recarga (carregador portátil e porta de recarga)', intervalKm: 10000, intervalMonths: 12, notes: 'Verifique o cabo, o conector e o funcionamento em diferentes tensões.', priority: 'HIGH', order: 1 },
  { modelName: 'Tan EV', yearFrom: 2023, yearTo: null, component: 'Pneus — rodízio e verificação de desgaste', intervalKm: 10000, intervalMonths: null, notes: 'Rodas de 22" com perfil baixo, mais sensíveis a buracos; sem estepe, apenas kit reparador.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Tan EV', yearFrom: 2023, yearTo: null, component: 'Filtro de cabine (ar-condicionado)', intervalKm: 20000, intervalMonths: 12, notes: 'Impacta consumo de energia do ar-condicionado e, indiretamente, a autonomia.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Tan EV', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km — mesmo com uso reduzido do freio via regeneração.', priority: 'HIGH', order: 4 },
  { modelName: 'Tan EV', yearFrom: 2023, yearTo: null, component: 'Sistema de alta tensão (bateria Blade, cabos, isolamento)', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual obrigatória por técnico certificado BYD para manter garantia da bateria (8 anos).', priority: 'CRITICAL', order: 5 },
  { modelName: 'Tan EV', yearFrom: 2023, yearTo: null, component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: null, notes: 'Essencial após qualquer reparo de suspensão — histórico de ruído relatado em outros modelos BYD quando alinhamento não é refeito corretamente.', priority: 'MEDIUM', order: 6 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Tan EV',
    yearFrom: 2023,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed BYD Tang...')

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

  console.log('✅ BYD Tang concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
