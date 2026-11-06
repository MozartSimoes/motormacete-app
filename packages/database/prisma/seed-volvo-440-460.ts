/**
 * Seed Volvo 440/460 — macetes, problemas, manutenção e calibragem de pneus
 * Hatch (440) e sedan (460) compactos de tração dianteira (FWD), produzidos
 * pela Volvo na fábrica de Born (Holanda, antiga NedCar/DAF) entre 1988 e
 * 1996/1997. Motores 1.7/1.8/2.0 (aspirados e Turbo). Volume baixo no
 * Brasil — carro raro hoje, mantido principalmente por entusiastas.
 * Sem gerações separadas por ano: tratamos 440 e 460 como blocos distintos
 * por serem carrocerias diferentes (hatch x sedan) sobre a mesma mecânica.
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-440-460
 *
 * Fontes: volvoforums.org.uk, carroclub.com.br, forum.motorguia.net,
 *         pt.wikipedia.org (Volvo 440/460), volvotips.com
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
    title: 'Carro raro no Brasil: peça original é caso de importação/comunidade',
    body: 'O 440/460 nunca teve volume de vendas relevante no Brasil, então esqueça achar peça específica em autopeças de bairro. O caminho real é a comunidade de entusiastas Volvo (grupos e fóruns de clube do Volvo) para localizar peça usada nacional, e encomenda de peça nova/recondicionada via fornecedores europeus para quem topa importar. Antes de gastar tempo procurando "para 440/460", pergunte no grupo de clube qual outro Volvo da época compartilha a peça.',
  },
  {
    severity: 'OK',
    title: 'Motor e câmbio manual são a parte mais simples de manter',
    body: 'A mecânica do 440/460 (motores 1.7/1.8/2.0 e câmbio manual) é relativamente convencional para a época, sem a complexidade eletrônica de carros modernos. A maior dor de cabeça normalmente não é o motor em si, mas achar peça de acabamento, elétrica específica e borrachas/vedações originais — planeje a manutenção em torno disso.',
  },
  {
    severity: 'WARN',
    title: 'Versão Turbo pede troca de óleo em dia, sem exceção',
    body: 'Nas versões Turbo, não estique o intervalo de troca de óleo do motor "porque ainda parece limpo" — motor turbo de final dos anos 80/90 sofre bem mais com óleo degradado que motor aspirado, e reposição de turbina é peça cara e difícil de achar hoje. Se comprou um exemplar Turbo usado sem histórico claro de manutenção, troque o óleo antes de rodar muito com o carro.',
  },
  {
    severity: 'OK',
    title: 'Infiltração de água é o maior inimigo depois de tantos anos',
    body: 'É queixa recorrente em exemplares dessa geração: infiltração de água pelo para-brisa, vidro traseiro, portamalas e faróis, que encharca o carpete e acelera a ferrugem no assoalho. Se for comprar ou já tem um 440/460, levante o carpete e cheque o piso e as bordas dos vidros — é o ponto que mais determina se o carro "vale a pena" de recuperar.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Infiltração de água pelo para-brisa, vidro traseiro, portamalas e faróis',
    body: 'Vazamentos nessas regiões são o problema mais reportado por donos de 440/460 ao redor do mundo, resultando em carpete encharcado e ferrugem no assoalho quando não tratado. Vede novamente as borrachas de vedação suspeitas e não ignore cheiro de mofo ou carpete úmido — quanto mais tempo a água fica parada, maior o dano estrutural.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem nos arcos das rodas traseiras e na base das portas',
    body: 'Depois de décadas de uso, é comum aparecer ferrugem nos arcos (abas) das rodas traseiras e na parte de baixo das portas. Inspecione essas regiões periodicamente, principalmente se o carro rodou muito tempo perto do litoral — tratar cedo é bem mais barato que reparar depois de furar a chapa.',
  },
  {
    severity: 'WARN',
    title: 'Marcador de combustível que não funciona direito',
    body: 'Falha no marcador/boia de combustível é queixa conhecida nessa geração de Volvo. Se o ponteiro do combustível se comporta de forma estranha (trava, não desce, ou "engana"), não confie cegamente nele — controle a autonomia por quilometragem até resolver o problema, para não ficar na mão.',
  },
  {
    severity: 'WARN',
    title: 'Coxins do motor e buchas da alavanca de câmbio desgastados',
    body: 'Coxim traseiro do motor (fixado na caixa de câmbio) e as buchas da alavanca de câmbio são pontos de desgaste natural com a idade — sintoma comum é trepidação maior que o normal e alavanca de câmbio "bamba". São peças relativamente baratas e fáceis de trocar, não vale a pena conviver com o desconforto.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela junta/retentor do câmbio',
    body: 'Vazamento de óleo pela vedação da alavanca de câmbio embaixo do carro é comum — fique de olho no nível do óleo do câmbio manual e complete sempre que precisar, em vez de deixar rodar seco até dar problema mais sério na caixa.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 440/460 (referência genérica — poucos dados específicos de Brasil disponíveis)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo (mais curto nas versões Turbo se o histórico anterior for incerto). | 10.000 km — Inspeção de freios, embreagem e níveis de fluido. | 20.000 km — Filtro de ar. | 20.000-30.000 km — Velas de ignição. | Sempre — Vistoria de vazamento de água pelo para-brisa/vidro traseiro/portamalas/faróis, e de ferrugem nos arcos das rodas traseiras e base das portas. | Correia dentada e componentes de arrefecimento — troque preventivamente em qualquer exemplar sem histórico documentado, dada a idade do carro hoje. | Câmbio manual — verifique nível de óleo periodicamente por causa do vazamento conhecido na vedação da alavanca.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: '440',
    yearFrom: 1988,
    yearTo: 1996,
    tireSize: '175/70 R14 · 185/60 R14 (versões Turbo/GLT)',
    frontPsi: 28,
    rearPsi: 28,
    frontPsiLoad: 30,
    rearPsiLoad: 32,
    sparePsi: 60,
    notes: 'Valor de referência genérico para o período — carro raro no Brasil, sem etiqueta padronizada fácil de confirmar. Sempre que possível, confira a etiqueta original na coluna da porta do motorista do exemplar específico ou o manual do proprietário.',
  },
  {
    modelName: '460',
    yearFrom: 1988,
    yearTo: 1997,
    tireSize: '175/70 R14 · 185/60 R14 (versões Turbo/GLT)',
    frontPsi: 28,
    rearPsi: 28,
    frontPsiLoad: 30,
    rearPsiLoad: 32,
    sparePsi: 60,
    notes: 'Valor de referência genérico para o período — carro raro no Brasil, sem etiqueta padronizada fácil de confirmar. Sempre que possível, confira a etiqueta original na coluna da porta do motorista do exemplar específico ou o manual do proprietário.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: '440', yearFrom: 1988, yearTo: 1996, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Antecipe em versões Turbo sem histórico de manutenção conhecido.', priority: 'HIGH', order: 0 },
  { modelName: '440', yearFrom: 1988, yearTo: 1996, component: 'Inspeção de vazamento de água (para-brisa, vidro traseiro, portamalas, faróis)', intervalKm: null, intervalMonths: 12, notes: 'Problema mais reportado nessa geração — leva à ferrugem no assoalho se ignorado.', priority: 'HIGH', order: 1 },
  { modelName: '440', yearFrom: 1988, yearTo: 1996, component: 'Inspeção de ferrugem (arcos das rodas traseiras, base das portas)', intervalKm: null, intervalMonths: 12, notes: 'Trate cedo — reparo de ferrugem avançada é bem mais caro.', priority: 'MEDIUM', order: 2 },
  { modelName: '440', yearFrom: 1988, yearTo: 1996, component: 'Nível de óleo do câmbio manual', intervalKm: 20000, intervalMonths: null, notes: 'Vazamento pela vedação da alavanca de câmbio é conhecido nessa geração.', priority: 'MEDIUM', order: 3 },
  { modelName: '440', yearFrom: 1988, yearTo: 1996, component: 'Correia dentada e componentes de arrefecimento', intervalKm: 60000, intervalMonths: 48, notes: 'Troque preventivamente se o exemplar não tiver histórico documentado, dada a idade do carro.', priority: 'HIGH', order: 4 },
  { modelName: '460', yearFrom: 1988, yearTo: 1997, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Antecipe em versões Turbo sem histórico de manutenção conhecido.', priority: 'HIGH', order: 5 },
  { modelName: '460', yearFrom: 1988, yearTo: 1997, component: 'Inspeção de vazamento de água (para-brisa, vidro traseiro, portamalas, faróis)', intervalKm: null, intervalMonths: 12, notes: 'Problema mais reportado nessa geração — leva à ferrugem no assoalho se ignorado.', priority: 'HIGH', order: 6 },
  { modelName: '460', yearFrom: 1988, yearTo: 1997, component: 'Inspeção de ferrugem (arcos das rodas traseiras, base das portas)', intervalKm: null, intervalMonths: 12, notes: 'Trate cedo — reparo de ferrugem avançada é bem mais caro.', priority: 'MEDIUM', order: 7 },
  { modelName: '460', yearFrom: 1988, yearTo: 1997, component: 'Nível de óleo do câmbio manual', intervalKm: 20000, intervalMonths: null, notes: 'Vazamento pela vedação da alavanca de câmbio é conhecido nessa geração.', priority: 'MEDIUM', order: 8 },
  { modelName: '460', yearFrom: 1988, yearTo: 1997, component: 'Correia dentada e componentes de arrefecimento', intervalKm: 60000, intervalMonths: 48, notes: 'Troque preventivamente se o exemplar não tiver histórico documentado, dada a idade do carro.', priority: 'HIGH', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: '440', yearFrom: 1988, yearTo: 1996, MACETES, PROBLEMAS, MANUTENCAO },
  { modelName: '460', yearFrom: 1988, yearTo: 1997, MACETES, PROBLEMAS, MANUTENCAO },
]

async function main() {
  console.log('🚗 Seed Volvo 440/460...')

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

  console.log('✅ Volvo 440/460 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
