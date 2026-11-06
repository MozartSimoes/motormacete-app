/**
 * Seed Peugeot e-2008 — macetes, problemas, manutenção e calibragem
 * Versão 100% elétrica do 2008, vendida no Brasil desde 2022 (trim
 * único GT na FIPE). Motor elétrico dianteiro (136cv/260Nm até a
 * atualização 2025, depois 158cv/260Nm), bateria de 50 kWh (2022-2024)
 * ou 54 kWh (2025+), câmbio e-Toggle (seletor de um toque, sem marchas
 * de verdade). SEM motor a combustão, câmbio automático tradicional ou
 * correia dentada — atenção: nosso mecanismo de busca casa "2008" como
 * substring dentro de "e-2008", então o dono do e-2008 também vai ver
 * na busca os tips do 2008 A COMBUSTÃO (motor THP/PureTech, correia
 * molhada, troca de óleo) já cadastrados no seed.ts histórico — esses
 * NÃO SE APLICAM ao e-2008 elétrico. Isso é documentado explicitamente
 * como macete abaixo para não confundir o usuário.
 * Execute: pnpm --filter @motormacete/database db:seed:peugeot-e2008
 *
 * Fontes: car.blog.br, media.stellantis.com, ultimatespecs.com,
 *         reclameaqui.com.br, autossegredos.com.br,
 *         mecanicaonline.com.br, sagapeugeot.com.br, peugeotforums.com
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
    title: 'Importante: ignore tips sobre "THP", "PureTech", correia ou troca de óleo — não se aplicam ao e-2008',
    body: 'Por semelhança de nome, esta busca também mostra dicas do Peugeot 2008 A COMBUSTÃO (motores THP 1.6 e PureTech 1.2, câmbio EAT6, correia dentada/molhada). O e-2008 é 100% elétrico: não tem motor a combustão, não tem correia dentada, não troca óleo de motor e não tem câmbio automático tradicional. Se ver um tip mencionando "correia molhada", "0W-30" ou "THP/PureTech", ele é sobre o 2008 a combustão, não sobre o seu carro — pode ignorar com segurança.',
  },
  {
    severity: 'OK',
    title: 'Confirme se sua unidade é a versão 2022-2024 (136cv/50 kWh) ou 2025+ (158cv/54 kWh)',
    body: 'O e-2008 teve atualização de motor e bateria: unidades 2022-2024 têm motor de 136cv e bateria de 50 kWh (autonomia WLTP de até 345 km); a partir de 2025 o motor passou para 158cv e a bateria para 54 kWh (autonomia PBEV/Inmetro de até 261 km — métrica de ciclo diferente do WLTP europeu, não compare os números diretamente). Confirme a versão exata da sua unidade antes de pesquisar peça de motor/bateria.',
  },
  {
    severity: 'OK',
    title: 'Carregamento DC rápido a 100 kW: 80% em ~30 minutos',
    body: 'O e-2008 aceita carregamento AC de 11 kW (wallbox residencial) e DC rápido em estações de até 100 kW, completando 80% da carga em cerca de 30 minutos. Para uso diário, carregar em wallbox durante a noite é suficiente; reserve o carregamento DC rápido para viagens mais longas.',
  },
  {
    severity: 'OK',
    title: 'Câmbio e-Toggle é só um seletor — não existe fluido de câmbio nem marcha para trocar',
    body: 'O "câmbio" e-Toggle do e-2008 é apenas um seletor eletrônico de sentido (D/R/P) com efeito visual de "um toque" — não existe transmissão com marchas de verdade, fluido de câmbio ou embreagem para dar manutenção. É tração direta do motor elétrico para as rodas dianteiras.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall: software de monitoramento da bateria pode causar perda de potência em movimento (unidades 2023)',
    body: 'A Peugeot convocou recall para e-2008 e e-208 ano/modelo 2023 por possível não conformidade no software da unidade de monitoramento da bateria de tração, que pode causar perda de potência ou impossibilitar o deslocamento do veículo — risco elevado de acidente. No Brasil, o recall envolveu apenas 7 unidades no total (5 e-2008 e 2 e-208): as unidades de e-2008 afetadas foram fabricadas entre 13 e 18 de setembro de 2022, com chassi entre PJ516661 e PJ517879. O reparo é a atualização do software na concessionária, leva cerca de 1 hora e é gratuito. Confirme o chassi da sua unidade em peugeot.com.br ou ligue 0800 703 2424 — mesmo sendo poucas unidades, vale a pena checar se a sua está na faixa afetada.',
  },
  {
    severity: 'WARN',
    title: 'Relatos de falha no carregador de bordo (onboard charger)',
    body: 'Há relatos de proprietários com falha no carregador embarcado do veículo, exigindo substituição — sintoma é falha ao tentar carregar com mensagem de aviso no painel. Se o carro parar de aceitar carga (AC ou DC) e aparecer aviso relacionado ao sistema de carregamento, procure a concessionária para diagnóstico em vez de assumir que é só a tomada/wallbox externa.',
  },
  {
    severity: 'WARN',
    title: 'Rede de assistência e peça específica ainda limitada — planeje com antecedência',
    body: 'Por ser um elétrico de volume de vendas baixo no Brasil, peça específica do sistema de tração/bateria e mão de obra especializada em EV Peugeot podem demorar mais para chegar do que em um 2008 a combustão comum. Se depende do carro no dia a dia, vale mapear com antecedência qual concessionária da sua região realmente tem histórico de atendimento a elétricos Stellantis.',
  },
  {
    severity: 'WARN',
    title: 'Garantia da bateria de reposição pode ser mais curta que a bateria original',
    body: 'Há relato de caso em que a bateria de reposição instalada em garantia recebeu cobertura de garantia menor (tratada como "peça reposta comum") do que a cobertura original de bateria do carro zero km. Antes de aceitar uma troca de bateria em garantia, pergunte por escrito qual é exatamente o prazo de garantia da peça nova instalada — não assuma que é igual ao da bateria original de fábrica.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma e-2008 (elétrico — sem óleo de motor, sem correia, sem câmbio tradicional)',
    body: '10.000 km — Rotação de pneus (motor concentrado no eixo dianteiro desgasta mais os pneus da frente). | 12 meses — Filtro de cabine. | 24 meses — Fluido de freio DOT 4 (mesmo com pouco uso do freio mecânico, já que a frenagem regenerativa faz boa parte do trabalho). | Anual — Inspeção do sistema de alta tensão (bateria/cabos) e teste do carregador embarcado em diferentes fontes (wallbox e tomada comum). | Configure o limite de carga em 80-90% para uso diário, reservando 100% para viagens mais longas. | Verificar se o recall do software de monitoramento da bateria (unidades set/2022) já foi concluído.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'e-2008', yearFrom: 2022, yearTo: null, tireSize: '215/55 R18 (referência, GT)', frontPsi: 36, rearPsi: 33, frontPsiLoad: 39, rearPsiLoad: 39, sparePsi: null, notes: 'Motor concentrado no eixo dianteiro — frontal com mais pressão. Sem estepe: kit de reparação incluso. Confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'e-2008', yearFrom: 2022, yearTo: null, component: 'Rotação de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Motor dianteiro desgasta mais os pneus da frente.', priority: 'MEDIUM', order: 0 },
  { modelName: 'e-2008', yearFrom: 2022, yearTo: null, component: 'Filtro de cabine', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 1 },
  { modelName: 'e-2008', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Troca por tempo mesmo com pouco uso do freio mecânico.', priority: 'HIGH', order: 2 },
  { modelName: 'e-2008', yearFrom: 2022, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'e-2008', yearFrom: 2022, yearTo: null, component: 'Teste do carregador embarcado (AC e DC)', intervalKm: null, intervalMonths: 12, notes: 'Há relatos de falha no carregador embarcado — testar em diferentes fontes ajuda a identificar cedo.', priority: 'MEDIUM', order: 4 },
  { modelName: 'e-2008', yearFrom: 2022, yearTo: null, component: 'Verificação do recall do software de monitoramento da bateria (unidades set/2022)', intervalKm: null, intervalMonths: null, notes: 'Risco de perda de potência ou imobilização em movimento.', priority: 'CRITICAL', order: 5 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'e-2008', yearFrom: 2022, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Peugeot e-2008...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Peugeot', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Peugeot', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'e-2008', brandId: brand.id } },
    update: {}, create: { name: 'e-2008', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'e-2008' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'e-2008' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'e-2008' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Peugeot e-2008 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
