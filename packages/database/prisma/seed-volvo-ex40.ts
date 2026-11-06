/**
 * Seed Volvo EX40 — macetes, problemas, manutenção e calibragem
 * SUV compacto 100% elétrico, plataforma CMA. É o MESMO carro que era
 * vendido como "XC40 Recharge Pure Electric" / "XC40 Recharge Twin" —
 * a partir do ano-modelo 2024/2025 a Volvo rebatizou toda a linha
 * elétrica com o prefixo "E" (EX40, EX30, EX90, EC40), mantendo o "XC"
 * só para os modelos a combustão/híbridos. Se você tem um XC40 Recharge
 * mais antigo (2021-2023), os macetes e cronograma abaixo valem igual —
 * é o mesmo hardware com nome comercial diferente.
 * Duas versões de motor: motor único traseiro (RWD, ~238-241cv) ou
 * motor duplo Twin Motor AWD (~402cv, ~494 lb-ft).
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-ex40
 *
 * Fontes: volvocars.com (suporte oficial e specs BR/US/AU), electrifying.com,
 *         topgear.com, greencarscompare.com, wheel-size.com, reclameaqui.com.br,
 *         mecanicaonline.com.br, carrosegaragem.com.br
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
    title: 'EX40 é o XC40 Recharge com outro nome — macetes de fórum antigo continuam válidos',
    body: 'Se você pesquisar sobre problemas ou dicas do EX40 e achar muito material citando "XC40 Recharge", "XC40 Pure Electric" ou "XC40 Twin", pode usar sem medo: é o mesmo carro, só o nome comercial mudou a partir de 2024/2025 dentro da estratégia da Volvo de identificar todo elétrico puro com a letra "E". A plataforma CMA, os motores e a bateria não mudaram na troca de nome.',
  },
  {
    severity: 'OK',
    title: 'Carga entre 20% e 80% no dia a dia preserva a bateria de alta tensão',
    body: 'Como em praticamente todo elétrico com bateria NMC, evite manter o EX40 sempre com 100% de carga ou deixá-lo zerar com frequência — isso acelera a degradação da bateria. Configure o limite de carga do carro (ajustável no painel) para 80% no uso diário e reserve a carga até 100% só para viagens longas, carregando pouco antes de sair.',
  },
  {
    severity: 'OK',
    title: 'Carregamento DC rápido: 10-80% em cerca de 27-30 minutos, mas rende mais em carregador de 150kW+',
    body: 'Em eletroposto DC rápido compatível (150-200 kW), o EX40 vai de 10% a 80% de carga em aproximadamente meia hora. Em wallbox trifásica residencial (11 kW), uma carga completa do zero leva de 7 a 8 horas — ideal para deixar carregando durante a noite. Evite depender só da tomada residencial comum (127V/220V monofásica): o tempo de carga passa de um dia inteiro.',
  },
  {
    severity: 'OK',
    title: 'Frenagem regenerativa: pastilha dura mais, mas o disco pode enferrujar por pouco uso',
    body: 'O EX40 usa bastante frenagem regenerativa para desacelerar, especialmente no modo "One Pedal Drive" (quando disponível). Isso é ótimo para o desgaste da pastilha, mas o disco de freio fica mais tempo sem ser usado de verdade — em regiões úmidas, uma camada de ferrugem superficial pode se formar. Pise no freio convencional com um pouco mais de força de vez em quando (não precisa ser brusco) para "limpar" o disco.',
  },
  {
    severity: 'OK',
    title: 'Motor único x Twin Motor AWD: performance e consumo são bem diferentes',
    body: 'A versão de motor único (tração traseira) prioriza eficiência e autonomia; a Twin Motor AWD (~402cv) prioriza desempenho e tração nas quatro rodas, mas consome mais energia por km rodado. Ao comparar autonomia anunciada entre anúncios de usados, confirme sempre qual versão está sendo citada — a diferença é grande.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Mensagem "Propulsion System Service Urgent/Required" pode colocar o carro em modo de emergência',
    body: 'Assim como outros elétricos da plataforma CMA (C40/EC40), o EX40 pode exibir essa mensagem no painel, reduzindo drasticamente a potência disponível (modo de segurança). As causas mais comuns são falha de software, do inversor, do carregador de bordo (OBC) ou do módulo de controle da bateria (BMS). Se aparecer, não force o carro em rodovia — procure a concessionária o quanto antes; muitas vezes um simples update de software resolve.',
  },
  {
    severity: 'WARN',
    title: 'Recall de bateria de alta tensão em modelos da plataforma CMA (verificar se sua unidade está incluída)',
    body: 'A Volvo já convocou recalls envolvendo módulos de bateria de alta tensão com risco de superaquecimento em modelos eletrificados construídos sobre a plataforma CMA (que o EX40/XC40 Recharge compartilha com o C40/EC40 e o XC40 híbrido plug-in). Consulte o número de chassi no site oficial de recalls da Volvo Brasil (volvocars.com/br/l/proprietario/recalls) para confirmar se sua unidade específica está na lista — os recalls de bateria costumam ser feitos por lote de produção, não por modelo inteiro.',
  },
  {
    severity: 'WARN',
    title: 'Umidade dentro do alojamento dos faróis em clima frio/úmido',
    body: 'Há relatos de condensação/umidade visível dentro da carcaça dos faróis em dias frios ou muito úmidos. Um pouco de embaçamento leve que some sozinho depois de o farol esquentar é normal; água acumulada visivelmente ou embaçamento que não vai embora indica vedação comprometida — leve para inspeção antes que entre umidade nos contatos elétricos.',
  },
  {
    severity: 'WARN',
    title: 'Pós-venda de elétricos no Brasil: nem toda concessionária tem peça/mão de obra especializada',
    body: 'Por ser tecnologia mais recente no país, componentes de alta tensão do EX40 têm rede de assistência mais restrita que a de carros a combustão da marca. Antes de comprar, confirme quais concessionárias da sua região atendem elétricos (nem todas fazem), e documente por escrito qualquer atraso relevante em reparo de garantia.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma EX40 (Volvo + itens específicos de EV)',
    body: 'Sem troca de óleo de motor, filtro de óleo, velas ou correia — é 100% elétrico. | Inspeção anual — Pastilhas e discos de freio (checar oxidação por baixo uso, comum em EV com regenerativa forte). | 40.000 km / 24 meses — Fluido de freio DOT 4. | 20.000-30.000 km — Filtro de cabine (climatização/ar-condicionado). | 60.000-100.000 km — Fluido do sistema de arrefecimento da bateria e do inversor (confirme intervalo exato no manual do seu ano/versão). | Anual — Inspeção do sistema de alta tensão (bateria, cabos de alta tensão, porta/soquete de recarga) e verificação de recall pendente pelo chassi. | Rodízio de pneus a cada 10.000 km — peso da bateria e torque instantâneo do motor desgastam pneus mais rápido que um carro a combustão equivalente.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'EX40',
    yearFrom: 2024,
    yearTo: null,
    tireSize: '235/50 R19 · 255/45 R19 · 235/45 R20 (conforme roda de fábrica)',
    frontPsi: 41,
    rearPsi: 41,
    frontPsiLoad: null,
    rearPsiLoad: null,
    sparePsi: null,
    notes: 'Valor oficial Volvo para o aro 235/45 R20 é 41 PSI dianteira/traseira — confirme sempre na etiqueta da coluna da porta do motorista, já que o valor pode variar por tamanho de roda e versão. EX40 não tem estepe (kit reparo de furo).',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'EX40', yearFrom: 2024, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos/porta de recarga)', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual + checar recall pendente pelo número de chassi no site oficial da Volvo.', priority: 'CRITICAL', order: 0 },
  { modelName: 'EX40', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 1 },
  { modelName: 'EX40', yearFrom: 2024, yearTo: null, component: 'Freios — inspeção (oxidação por baixo uso)', intervalKm: null, intervalMonths: 12, notes: 'Frenagem regenerativa reduz uso do freio mecânico — acione os freios convencionais periodicamente para evitar oxidação do disco.', priority: 'MEDIUM', order: 2 },
  { modelName: 'EX40', yearFrom: 2024, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Reduza o intervalo em cidades com muita poluição/poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'EX40', yearFrom: 2024, yearTo: null, component: 'Fluido de arrefecimento da bateria/inversor', intervalKm: 60000, intervalMonths: null, notes: 'Confirme intervalo exato no manual do seu ano/versão.', priority: 'HIGH', order: 4 },
  { modelName: 'EX40', yearFrom: 2024, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado — peso da bateria e torque instantâneo desgastam mais rápido que carro a combustão equivalente.', priority: 'MEDIUM', order: 5 },
  { modelName: 'EX40', yearFrom: 2024, yearTo: null, component: 'Atualização de software (OTA/concessionária)', intervalKm: null, intervalMonths: 6, notes: 'Muitos alertas de "Propulsion System Service" são resolvidos por update de software — mantenha o carro atualizado.', priority: 'MEDIUM', order: 6 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'EX40',
    yearFrom: 2024,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volvo EX40...')

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

  console.log('✅ Volvo EX40 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
