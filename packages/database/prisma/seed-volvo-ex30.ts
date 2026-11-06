/**
 * Seed Volvo EX30 — macetes, problemas, manutenção e calibragem
 * SUV compacto 100% elétrico. Nomenclatura "E40"/"E60" identifica a BATERIA,
 * não a carroceria: E40 = pacote de 51 kWh química LFP (química mais estável
 * termicamente, motor único); E60 = pacote de 69 kWh química NMC (motor único
 * Extended Range OU duplo motor Twin Motor Performance AWD, versão de topo
 * "Ultra Twin"). A partir do ano-modelo 2026 a linha ganhou a versão
 * "Cross Country": Twin Motor Performance AWD de série, suspensão ~19mm mais
 * alta, para-choques reforçados, protetores de cárter (skid plates) e rodas
 * de 19" de série — visual mais "aventureiro", mecânica igual ao Ultra Twin.
 * #79 no ranking de vendas 2025 no Brasil (3.511 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-ex30
 *
 * Fontes: reclameaqui.com.br, motorshow.com.br, insurtalks.com.br,
 *         volvocars.com (suporte oficial), jantes-e-pneus.com, canalve.com.br,
 *         cnnbrasil.com.br, electrive.com, mixvale.com.br, wheel-size.com
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
    title: 'Verifique se sua unidade está na faixa afetada pelo recall de bateria antes de configurar o limite de carga',
    body: 'Antes de aplicar as recomendações genéricas de "carregar até 80-90%" válidas para EVs em geral, confirme primeiro se sua unidade está na faixa afetada pelo recall de bateria (ver PROBLEMAS) — nesse caso, siga a orientação específica da Volvo de limitar a carga entre 20% e 70%, que é diferente da prática recomendada para EVs sem esse problema.',
  },
  {
    severity: 'OK',
    title: 'Motor único x duplo: confirme a versão antes de comparar autonomia',
    body: 'A EX30 é vendida em versão de motor único (tração traseira, E40/E60) ou motor duplo (Twin-Motor Performance AWD, E60 Twin Ultra). A versão Twin tem mais desempenho mas consome mais energia — não compare autonomia anunciada entre versões diferentes sem considerar essa diferença.',
  },
  {
    severity: 'OK',
    title: 'Frenagem regenerativa reduz bastante o desgaste das pastilhas',
    body: 'Assim como outros elétricos, a frenagem regenerativa da EX30 faz boa parte do trabalho de desaceleração no dia a dia, reduzindo o uso dos freios mecânicos. Isso é positivo para o desgaste das pastilhas, mas acione os freios convencionais de vez em quando (mesmo sem necessidade) para evitar oxidação por falta de uso.',
  },
  {
    severity: 'OK',
    title: 'Bateria E40 (LFP) x E60 (NMC): o hábito de carga ideal é diferente',
    body: 'A química da bateria muda o cuidado recomendado. Na versão E40 (51 kWh, química LFP), é seguro e até recomendado carregar até 100% regularmente — isso ajuda o sistema de gerenciamento a calibrar a leitura de carga corretamente, e a LFP não sofre o mesmo desgaste acelerado que a NMC quando fica sempre cheia. Já na E60 (69 kWh, química NMC, presente no Extended Range e no Twin Ultra), vale a regra clássica de EV: mantenha a rotina entre 20% e 80%, reservando 100% só para viagens longas. Confirme a química do seu pacote no manual ou na etiqueta antes de decidir sua rotina de carga.',
  },
  {
    severity: 'OK',
    title: 'Versão Cross Country: suspensão mais alta, mas mecânica é a mesma do Ultra Twin',
    body: 'A EX30 Cross Country (a partir do ano-modelo 2026) vem sempre com Twin Motor Performance AWD, suspensão levemente mais alta (cerca de 19mm/0,75") e protetores de cárter/para-choques reforçados para uso leve fora de estrada. Mecanicamente é o mesmo conjunto de motor e bateria do Ultra Twin — os cuidados de bateria, freios e pneus valem igual. A diferença prática de manutenção fica por conta da inspeção visual dos protetores inferiores após uso em terra/cascalho, algo que as versões de rodagem 100% urbana não precisam.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall (janeiro de 2026): bateria de alta tensão com risco de superaquecimento e incêndio — só afeta a bateria E60 (NMC)',
    body: 'A Volvo convocou recall de cerca de 40.300 unidades da EX30 globalmente por falha de fabricação nas células da bateria de alta tensão, que pode causar curto-circuito interno, superaquecimento e, em casos mais graves, incêndio. O recall atinge apenas as versões com bateria E60 de 69 kWh química NMC — ou seja, Single-Motor Extended Range e Twin-Motor Performance (Ultra Twin e Cross Country) fabricadas entre setembro de 2024 e outubro de 2025. A versão de entrada com bateria E40 (51 kWh, química LFP) NÃO está na lista de afetados. Unidades afetadas recebem um alerta no painel sobre superaquecimento da bateria, com aviso de risco de fumaça e possibilidade de fogo. A solução definitiva é a substituição do módulo da bateria; enquanto isso não é feito, a orientação da Volvo é limitar a carga entre 20% e 70% (reduzindo a autonomia útil em cerca de 30%). Verifique imediatamente na concessionária se sua unidade está na faixa afetada, mesmo sem o alerta ter aparecido ainda.',
  },
  {
    severity: 'WARN',
    title: 'Queda de autonomia real relatada mesmo fora do escopo direto do recall',
    body: 'Há relatos de queda perceptível de autonomia com o uso — em um caso, um proprietário com cerca de 34.000 km relatou autonomia útil bem abaixo da indicada no painel após carga completa. Se notar queda de autonomia muito além do esperado para degradação natural, registre o histórico de recarga (padrão de uso, temperatura, DC rápido) e leve para diagnóstico — pode estar relacionado ao recall de bateria ou a degradação acelerada por outros fatores.',
  },
  {
    severity: 'WARN',
    title: 'Pós-venda no Brasil considerado lento por parte dos proprietários',
    body: 'Alguns proprietários relatam demora de meses para solução de problemas de bateria mesmo após abertura de chamado, incluindo casos de unidades zero km. Documente cada contato com a concessionária/SAC por escrito e, se a demora for excessiva diante de um problema de segurança (bateria), considere acionar o Procon.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma EX30 (Volvo + itens específicos de EV)',
    body: 'Sem troca de óleo de motor — é 100% elétrico. | Inspeção anual — Freios (mesmo com pouco uso pela regenerativa, verificar oxidação), suspensão e níveis de fluido de freio. | 40.000 km — Fluido de freio DOT 4. | 60.000-100.000 km — Fluido do sistema de arrefecimento da bateria e do motor elétrico (conforme manual). | Verificar recall de bateria pendente na primeira visita à concessionária, independentemente de o alerta ter aparecido no painel. | Anual — Inspeção do sistema de alta tensão (bateria/cabos/porta de recarga).',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'EX30',
    yearFrom: 2024,
    yearTo: null,
    tireSize: '235/45 R20 · 245/40 R20 (versões superiores)',
    frontPsi: 36,
    rearPsi: 36,
    frontPsiLoad: 38,
    rearPsiLoad: 42,
    sparePsi: null,
    notes: 'EVs costumam pedir pressão mais alta que carros a combustão equivalentes, pelo peso extra da bateria. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista — a EX30 não tem estepe. A versão Cross Country vem com rodas de 19" de série (pneu de perfil um pouco mais alto que o 235/45 R20 do Ultra) — a pressão recomendada pode variar; confirme na etiqueta específica do seu exemplar.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'EX30', yearFrom: 2024, yearTo: null, component: 'Recall de bateria de alta tensão', intervalKm: null, intervalMonths: null, notes: 'Risco de superaquecimento/incêndio — verificar na concessionária imediatamente, mesmo sem o alerta ter aparecido no painel.', priority: 'CRITICAL', order: 0 },
  { modelName: 'EX30', yearFrom: 2024, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos/porta de recarga)', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual.', priority: 'CRITICAL', order: 1 },
  { modelName: 'EX30', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 2 },
  { modelName: 'EX30', yearFrom: 2024, yearTo: null, component: 'Freios — inspeção (oxidação por baixo uso)', intervalKm: null, intervalMonths: 12, notes: 'Frenagem regenerativa reduz uso do freio mecânico — acionar os freios convencionais periodicamente evita oxidação.', priority: 'MEDIUM', order: 3 },
  { modelName: 'EX30', yearFrom: 2024, yearTo: null, component: 'Fluido de arrefecimento da bateria/motor elétrico', intervalKm: 60000, intervalMonths: null, notes: 'Confirme intervalo exato no manual.', priority: 'HIGH', order: 4 },
  { modelName: 'EX30', yearFrom: 2024, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado — peso extra da bateria desgasta mais os pneus dianteiros.', priority: 'MEDIUM', order: 5 },
  { modelName: 'EX30', yearFrom: 2024, yearTo: null, component: 'Protetores de cárter e para-choques (versão Cross Country)', intervalKm: null, intervalMonths: 12, notes: 'Inspeção visual após uso em terra/cascalho — não se aplica às versões de rodagem 100% urbana.', priority: 'LOW', order: 6 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'EX30',
    yearFrom: 2024,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volvo EX30...')

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

  console.log('✅ Volvo EX30 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
