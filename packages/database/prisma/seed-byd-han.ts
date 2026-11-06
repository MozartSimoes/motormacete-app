/**
 * Seed BYD Han — macetes, problemas, manutenção e calibragem de pneus
 * Sedã elétrico grande, modelo de topo de linha (flagship) da BYD no Brasil.
 * Versão única "Han EV", 100% elétrico, dois motores (dianteiro + traseiro)
 * com tração integral (AWD) sob demanda, potência combinada de 494 cv e
 * 69,3 kgfm de torque, 0-100 km/h em 3,9s. Bateria Blade LFP própria da BYD,
 * autonomia de até ~500 km (Inmetro/ciclo do fabricante). Lançado no Brasil
 * em abril de 2022, preço na faixa de R$ 540.000-560.000.
 * Execute: pnpm --filter @motormacete/database db:seed:byd-han
 *
 * Fontes: byd.com/br/car/han, icarros.com.br, mobiauto.com.br,
 *         webmotors.com.br, reclameaqui.com.br, autopapo.com.br,
 *         cnnbrasil.com.br, mercadoveiculos.com, autoevolution.com
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
    title: 'Recalls recentes da BYD na China não afetam o Han vendido no Brasil',
    body: 'A BYD fez recalls na China envolvendo modelos como Dolphin, Yuan Plus, Tang e Qin Plus DM-i, por questões de unidade de controle de direção e risco em bateria. A própria BYD Brasil esclareceu publicamente que essas convocações são exclusivas do mercado chinês, já que a produção para exportação segue linha e fornecedores diferentes da produção interna da China — não há recall do Han no Brasil relacionado a esses casos. Ainda assim, vale acompanhar comunicados oficiais da BYD Brasil periodicamente.',
  },
  {
    severity: 'WARN',
    title: 'Pinças de freio podem grudar por baixo uso do freio a fricção',
    body: 'Como a maior parte da frenagem do Han é feita pela regeneração elétrica, o freio a fricção (disco/pastilha) trabalha pouco no dia a dia — o que é ótimo para durabilidade, mas pode favorecer oxidação e "colamento" das pinças com o tempo, principalmente em quem roda pouco ou mora perto do litoral. Uma vez por mês, em local seguro, pise fundo no freio algumas vezes para garantir que pinças e discos continuem trabalhando normalmente.',
  },
  {
    severity: 'OK',
    title: 'Planeje a recarga: AC residencial é lento, DC rápido é a exceção',
    body: 'O carregamento em corrente alternada (tomada/wallbox residencial) leva cerca de 12 horas para completar a bateria — planeje recarregar durante a noite ou no período parado na garagem. Em carregador DC rápido, compatível com o Han, é possível chegar a 80% em cerca de 30-35 minutos, mas a rede de eletropostos rápidos ainda é limitada em muitas cidades brasileiras — não conte só com carregamento rápido para o uso diário.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Pós-venda BYD: peças mais complexas podem demorar, vindas da China',
    body: 'Reclamações recorrentes de clientes BYD no Brasil (Reclame Aqui, AutoPapo) apontam demora no atendimento e na chegada de peças de reposição, principalmente as mais específicas, que às vezes precisam ser encomendadas diretamente da China quando não há estoque no centro de distribuição nacional da marca. Sendo o Han um modelo de baixo volume de vendas comparado a Dolphin/Song/Seal, o risco de peça de acabamento ou componente específico não estar em estoque local é maior — pergunte à concessionária sobre disponibilidade de peças antes de fechar a compra e, em caso de sinistro, questione prazos com antecedência.',
  },
  {
    severity: 'WARN',
    title: 'Tela central DiLink: instabilidade ocasional relatada em unidades globais',
    body: 'Em mercados onde o Han circula há mais tempo (China, Europa, Oriente Médio), há relatos de reinicializações esporádicas da tela giratória de 15,6" e de desconexões do Apple CarPlay/Android Auto, que temporariamente afetam climatização, câmera de ré e navegação exibidas na tela. Se notar o comportamento, atualize o software do sistema multimídia sempre que a concessionária oferecer e reinicie o veículo (chave, aguardar alguns segundos, ligar novamente) como primeira medida.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão: histórico de ruído/desgaste prematuro em outros modelos da marca',
    body: 'Não há um padrão amplamente documentado de defeito de suspensão especificamente no Han, mas outros modelos da BYD vendidos no Brasil (como Seagull e King) têm relatos frequentes de ruído e desgaste prematuro em componentes da suspensão dianteira, incluindo casos de troca de peça que não resolveu o barulho de primeira. Por precaução, preste atenção a ruídos na suspensão desde os primeiros meses de uso e, se ocorrerem, exija diagnóstico completo (não apenas troca de uma peça isolada) na garantia.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Han EV (BYD + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Inspeção geral: freios, pneus, suspensão, níveis de fluido e funcionamento do carregador (cabo/porta). | 10.000 km — Rodízio dos pneus. | 20.000 km — Filtro de cabine (ar-condicionado). | 20.000 km/12 meses — Verificação do sistema de ar-condicionado/climatização (usado também para condicionar a bateria). | 40.000 km/24 meses — Fluido de freio DOT 4 (troca por tempo, não só por km). | 40.000-60.000 km — Verificação/troca do fluido de arrefecimento do sistema de tração e da bateria. | Anual — Inspeção do sistema de alta tensão: bateria, cabos de alta tensão, conectores de carga (AC e DC) e estado do carregador portátil/wallbox. | Mensal — Acionar o freio a fundo algumas vezes para evitar oxidação das pinças, já que a regeneração reduz muito o uso do freio a fricção no dia a dia.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Han EV',
    yearFrom: 2022,
    yearTo: null,
    tireSize: '245/45 R19',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 36,
    rearPsiLoad: 38,
    sparePsi: null,
    notes: 'Confirme sempre o valor exato na etiqueta da coluna da porta do motorista — o Han costuma vir com kit reparador em vez de estepe. Como o carro é pesado (~2.170 kg), pressão baixa acelera desgaste e aumenta o consumo de energia.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Han EV', yearFrom: 2022, yearTo: null, component: 'Pastilhas e discos de freio — verificação', intervalKm: 10000, intervalMonths: 12, notes: 'Desgaste é lento por causa da regeneração, mas pinças podem grudar por baixo uso — pise fundo no freio periodicamente.', priority: 'MEDIUM', order: 0 },
  { modelName: 'Han EV', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por quilometragem — o fluido absorve umidade mesmo com pouco uso do freio a fricção.', priority: 'HIGH', order: 1 },
  { modelName: 'Han EV', yearFrom: 2022, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas; troque antes se notar odor ou perda de vazão no ar-condicionado.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Han EV', yearFrom: 2022, yearTo: null, component: 'Fluido de arrefecimento do sistema de tração/bateria', intervalKm: 60000, intervalMonths: 48, notes: 'Refrigeração líquida da bateria Blade e dos motores elétricos — siga o intervalo do manual, essencial para a vida útil da bateria.', priority: 'HIGH', order: 3 },
  { modelName: 'Han EV', yearFrom: 2022, yearTo: null, component: 'Rodízio dos pneus', intervalKm: 10000, intervalMonths: null, notes: 'Ajuda a compensar o desgaste diferente entre eixo dianteiro e traseiro no AWD.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Han EV', yearFrom: 2022, yearTo: null, component: 'Sistema de alta tensão (bateria, cabos, conectores de carga)', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual, incluindo estado do cabo/carregador portátil e da porta de carga AC/DC.', priority: 'HIGH', order: 5 },
  { modelName: 'Han EV', yearFrom: 2022, yearTo: null, component: 'Sistema de ar-condicionado/climatização', intervalKm: 20000, intervalMonths: 12, notes: 'Também participa do resfriamento da bateria em alguns modos — verifique gás e funcionamento geral.', priority: 'LOW', order: 6 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Han EV',
    yearFrom: 2022,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed BYD Han...')

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

  console.log('✅ BYD Han concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
