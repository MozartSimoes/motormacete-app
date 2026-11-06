/**
 * Seed Volkswagen Caravelle e Eurovan — macetes, problemas, manutenção e calibragem
 * Duas nomenclaturas comerciais para a mesma van, a Volkswagen Transporter T4
 * (a "herdeira" da Kombi no exterior) — Caravelle era a versão de passageiros
 * mais completa (3 fileiras de bancos, acabamento executivo) e Eurovan a
 * versão mais voltada para uso comercial/utilitário, ambas sobre a mesma
 * plataforma T4, mesmo motor e mesma mecânica. Chegaram juntas ao Brasil via
 * importação oficial em 1998 e saíram de linha por aqui em 2000/2001 —
 * volume baixíssimo, nunca foram fabricadas localmente. Motor único: 2.4
 * diesel 5 cilindros em linha, aspiração natural (códigos de motor AAB/AJA),
 * ~75-78cv a 3.700rpm e ~16,3kgfm a 1.900rpm, câmbio manual de 5 marchas.
 * A FIPE só lista "2.4 Diesel" para os anos 1998, 1999 e 2000 em ambos os
 * nomes — não há versão a gasolina ou automática catalogada para o Brasil.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-caravelle-eurovan
 *
 * Fontes: parallelum.com.br/fipe (API pública FIPE, marca 59, modelos 2365
 *         e 2369), en.wikipedia.org/wiki/Volkswagen_Transporter_(T4),
 *         falando-sobre-carros.blogspot.com, blog.checkcarro.com.br,
 *         auto-data.net, netkar.com.br (peças importadas), regicarautopecas.com.br
 *
 * NOTA: recall real específico para Caravelle/Eurovan no Brasil não foi
 * localizado em busca — se um dia for encontrado, adicionar aqui.
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

// ─── Caravelle — versão de passageiros/executiva da T4 ─────────────────────
const MACETES_CARAVELLE: TipInput[] = [
  {
    severity: 'OK',
    title: 'Caravelle é a versão de passageiros da Volkswagen Transporter T4',
    body: 'A Caravelle é a versão com 3 fileiras de bancos e acabamento mais completo da mesma van conhecida na Europa como Transporter/Multivan e nos EUA como EuroVan. É mecanicamente idêntica à Eurovan vendida no Brasil na mesma época — motor, câmbio, freios e suspensão são intercambiáveis entre as duas.',
  },
  {
    severity: 'OK',
    title: 'Motor 2.4 diesel 5 cilindros (AAB/AJA): robusto, mas raro no Brasil',
    body: 'O motor é um 2.4 diesel de 5 cilindros em linha, aspirado (sem turbo), com cerca de 75-78cv. É um projeto conhecido e durável na Europa, mas raro no Brasil — procure oficina com experiência em diesel europeu/vans VW (T4/T5), não uma concessionária ou oficina de carro popular nacional.',
  },
  {
    severity: 'OK',
    title: 'Câmbio manual de 5 marchas simples, sem eletrônica para dar problema',
    body: 'O câmbio é manual convencional de 5 marchas, sem módulo eletrônico embarcado — menos pontos de falha "moderna" para se preocupar, mas ainda assim exige troca de óleo do câmbio dentro do prazo para não desgastar sincronizadores.',
  },
  {
    severity: 'WARN',
    title: 'Importação oficial parou entre 2000 e 2001: volume baixíssimo no Brasil',
    body: 'A Caravelle chegou ao Brasil via importação oficial em 1998 e saiu de linha por aqui pouco depois (a FIPE só cataloga os anos 1998-2000). É um veículo raro nas ruas — procure clube de proprietários de VW T4/Eurovan/Caravelle e oficinas especializadas em van importada antes de procurar peça ou serviço em loja genérica.',
  },
  {
    severity: 'OK',
    title: 'Ao comprar um exemplar hoje, exija comprovação de correia dentada e bomba injetora',
    body: 'Um exemplar de 1998-2000 já passou dos 25 anos de idade. Antes de comprar, exija nota fiscal ou comprovante de troca recente da correia dentada e revisão da bomba injetora — sem essa documentação, negocie o preço já considerando que provavelmente esses itens precisarão de atenção imediata.',
  },
]

const PROBLEMAS_CARAVELLE: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor é interferente: correia dentada vencida pode destruir o motor',
    body: 'O motor 2.4 diesel é do tipo interferente — se a correia dentada arrebentar ou pular dente rodando, o pistão colide com a válvula e normalmente exige troca do cabeçote (e às vezes do motor inteiro). Nunca estique o prazo de troca da correia, especialmente em um veículo raro onde encontrar motor de reposição no Brasil é difícil e caro.',
  },
  {
    severity: 'WARN',
    title: 'Bomba injetora e velas de pré-aquecimento são pontos de falha documentados',
    body: 'Relatos de proprietários e oficinas especializadas apontam a bomba injetora e as velas de pré-aquecimento (glow plugs) como itens sujeitos a falha nesse motor. Sintomas incluem dificuldade para dar partida a frio, fumaça excessiva ou funcionamento irregular do motor — não ignore esses sinais, peça inspeção específica desses dois componentes.',
  },
  {
    severity: 'WARN',
    title: 'Bomba d\'água é item de desgaste conhecido nos motores AAB/AJA',
    body: 'A bomba d\'água desse motor é um item de desgaste conhecido — se notar superaquecimento, vazamento de fluido de arrefecimento perto do motor ou ruído metálico na região da correia, suspeite da bomba d\'água antes de qualquer outra coisa.',
  },
  {
    severity: 'WARN',
    title: 'Peças de reposição raras no Brasil — dependem de importação',
    body: 'Peça específica de Caravelle é escassa no mercado nacional. Existem importadoras especializadas em peça VW importada que atendem esse modelo, mas prazo de entrega pode ser longo. Planeje com antecedência qualquer reparo que exija peça original — evite ficar sem o veículo esperando peça que podia ter sido encomendada antes.',
  },
]

const MANUTENCAO_CARAVELLE: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Caravelle (motor 2.4 diesel AAB/AJA)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro (motor diesel, respeite a especificação de óleo para diesel). | 10.000 km — Inspeção de freios, suspensão e vazamentos. | 20.000 km — Filtro de ar e filtro de combustível (diesel exige troca de filtro de combustível mais frequente). | 40.000 km — Fluido de freio. | 60.000-80.000 km — Correia dentada + tensor (motor interferente — não atrase, veja PROBLEMAS). | A cada revisão — Inspeção de bomba injetora, velas de pré-aquecimento e bomba d\'água, itens com relato de desgaste nesse motor.',
  },
  {
    severity: 'WARN',
    title: 'Veículo raro: mantenha histórico documentado de toda manutenção',
    body: 'Como é um veículo de baixíssimo volume no Brasil, sem uma rede de concessionária dedicada, manter nota fiscal e registro de cada serviço facilita muito tanto a manutenção preventiva quanto uma futura venda — comprador de veículo raro valoriza histórico completo mais do que em carro popular.',
  },
]

// ─── Eurovan — versão comercial/utilitária da T4 ───────────────────────────
const MACETES_EUROVAN: TipInput[] = [
  {
    severity: 'OK',
    title: 'Eurovan é a versão comercial/utilitária da mesma Volkswagen Transporter T4',
    body: 'A Eurovan foi vendida no Brasil ao mesmo tempo que a Caravelle (a partir de 1998), como opção mais voltada para uso comercial — acabamento mais simples, configuração de bancos mais flexível. É a mesma base mecânica da T4: motor, câmbio, freios e suspensão intercambiáveis com a Caravelle da mesma época.',
  },
  {
    severity: 'OK',
    title: 'Motor 2.4 diesel 5 cilindros (AAB/AJA): robusto, mas raro no Brasil',
    body: 'Motor 2.4 diesel de 5 cilindros em linha, aspirado (sem turbo), com cerca de 75-78cv e câmbio manual de 5 marchas. É um motor conhecido por durabilidade na Europa, mas raro no Brasil — busque oficina especializada em diesel europeu ou em vans VW (T4/T5), não oficina de carro popular nacional.',
  },
  {
    severity: 'WARN',
    title: 'Importação oficial parou entre 2000 e 2001: volume baixíssimo no Brasil',
    body: 'Assim como a Caravelle, a Eurovan chegou ao Brasil em 1998 e saiu de linha logo em seguida (FIPE cataloga só 1998-2000). É rara nas ruas — procure clube de proprietários VW T4/Eurovan/Caravelle e oficina especializada em van importada em vez de rede de concessionária comum.',
  },
  {
    severity: 'OK',
    title: 'Uso comercial: inspecione a suspensão traseira com carga real periodicamente',
    body: 'Se a Eurovan for usada para transporte de carga ou passageiros com frequência, vale inspecionar molas, amortecedores traseiros e batentes de suspensão com o veículo carregado como no uso real — desgaste de suspensão em van usada para trabalho tende a ser mais rápido que em uso só de passeio.',
  },
]

const PROBLEMAS_EUROVAN: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor é interferente: correia dentada vencida pode destruir o motor',
    body: 'O motor 2.4 diesel é interferente — correia dentada arrebentando ou pulando dente rodando normalmente causa colisão entre pistão e válvula, exigindo retífica de cabeçote ou até troca de motor. Não estique o prazo de troca, principalmente considerando a dificuldade de achar motor de reposição no Brasil para esse modelo.',
  },
  {
    severity: 'WARN',
    title: 'Bomba injetora e velas de pré-aquecimento são pontos de falha documentados',
    body: 'Assim como na Caravelle (mesmo motor), há relatos de falha na bomba injetora e nas velas de pré-aquecimento. Fique atento a dificuldade de partida a frio, fumaça excessiva ou funcionamento irregular do motor — sinais de que esses componentes precisam de inspeção.',
  },
  {
    severity: 'WARN',
    title: 'Peças de reposição raras no Brasil — dependem de importação',
    body: 'Peça específica de Eurovan é escassa no mercado nacional, mesmo mais que peça de modelo de alto volume. Há importadoras especializadas em peça VW importada que atendem o modelo, mas o prazo de entrega pode ser longo — planeje reparos com antecedência.',
  },
]

const MANUTENCAO_EUROVAN: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Eurovan (motor 2.4 diesel AAB/AJA)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro (óleo específico para diesel). | 10.000 km — Inspeção de freios, suspensão (atenção redobrada se usada para carga) e vazamentos. | 20.000 km — Filtro de ar e filtro de combustível. | 40.000 km — Fluido de freio. | 60.000-80.000 km — Correia dentada + tensor (motor interferente — não atrase). | A cada revisão — Inspeção de bomba injetora, velas de pré-aquecimento e bomba d\'água.',
  },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Caravelle',
    yearFrom: 1998,
    yearTo: 2000,
    MACETES: MACETES_CARAVELLE,
    PROBLEMAS: PROBLEMAS_CARAVELLE,
    MANUTENCAO: MANUTENCAO_CARAVELLE,
  },
  {
    modelName: 'Eurovan',
    yearFrom: 1998,
    yearTo: 2000,
    MACETES: MACETES_EUROVAN,
    PROBLEMAS: PROBLEMAS_EUROVAN,
    MANUTENCAO: MANUTENCAO_EUROVAN,
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Caravelle',
    yearFrom: 1998,
    yearTo: 2000,
    tireSize: '205/65 R15 (referência para a plataforma T4)',
    frontPsi: 30,
    rearPsi: 50,
    frontPsiLoad: 35,
    rearPsiLoad: 65,
    sparePsi: 60,
    notes: 'Estimativa baseada na classe do veículo (van RWD com maior carga sobre o eixo traseiro) — não foi possível confirmar o valor exato de fábrica. Confirme sempre na etiqueta da coluna da porta do motorista ou no manual antes de calibrar.',
  },
  {
    modelName: 'Eurovan',
    yearFrom: 1998,
    yearTo: 2000,
    tireSize: '205/65 R15 (referência para a plataforma T4)',
    frontPsi: 30,
    rearPsi: 52,
    frontPsiLoad: 35,
    rearPsiLoad: 68,
    sparePsi: 60,
    notes: 'Estimativa baseada na classe do veículo (van RWD com uso comercial/carga, pressão traseira mais alta que a Caravelle) — não foi possível confirmar o valor exato de fábrica. Confirme sempre na etiqueta da coluna da porta do motorista ou no manual antes de calibrar.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Caravelle', yearFrom: 1998, yearTo: 2000, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor diesel — use óleo com especificação para diesel.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Caravelle', yearFrom: 1998, yearTo: 2000, component: 'Correia dentada + tensor', intervalKm: 70000, intervalMonths: 48, notes: 'Motor interferente — atraso pode destruir o motor.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Caravelle', yearFrom: 1998, yearTo: 2000, component: 'Filtro de combustível', intervalKm: 20000, intervalMonths: 12, notes: 'Motor diesel exige troca mais frequente que motor a gasolina.', priority: 'HIGH', order: 2 },
  { modelName: 'Caravelle', yearFrom: 1998, yearTo: 2000, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'Caravelle', yearFrom: 1998, yearTo: 2000, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'Caravelle', yearFrom: 1998, yearTo: 2000, component: 'Inspeção de bomba injetora e velas de pré-aquecimento', intervalKm: 40000, intervalMonths: null, notes: 'Itens com relato de falha documentado nesse motor.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Eurovan', yearFrom: 1998, yearTo: 2000, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor diesel — use óleo com especificação para diesel.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Eurovan', yearFrom: 1998, yearTo: 2000, component: 'Correia dentada + tensor', intervalKm: 70000, intervalMonths: 48, notes: 'Motor interferente — atraso pode destruir o motor.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Eurovan', yearFrom: 1998, yearTo: 2000, component: 'Filtro de combustível', intervalKm: 20000, intervalMonths: 12, notes: 'Motor diesel exige troca mais frequente que motor a gasolina.', priority: 'HIGH', order: 8 },
  { modelName: 'Eurovan', yearFrom: 1998, yearTo: 2000, component: 'Suspensão traseira (molas/amortecedores) — inspeção com carga', intervalKm: 20000, intervalMonths: 12, notes: 'Uso comercial/carga acelera o desgaste.', priority: 'MEDIUM', order: 9 },
]

async function main() {
  console.log('🚗 Seed Volkswagen Caravelle e Eurovan...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
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

  console.log('✅ Volkswagen Caravelle e Eurovan concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
