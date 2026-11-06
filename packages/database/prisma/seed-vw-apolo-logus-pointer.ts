/**
 * Seed Volkswagen Apolo, Logus e Pointer — macetes, problemas, manutenção e calibragem
 * Três nameplates da era Autolatina (joint-venture Ford + Volkswagen no Brasil/
 * Argentina/Uruguai, 1987-1996), cada um com plataforma e período distintos:
 *
 * - Apolo (1990-1992): sedã 2 portas, essencialmente um Ford Verona rebatizado
 *   (1ª geração, carroceria derivada do Ford Escort Mk4 europeu via Orion).
 *   Só veio com motor AP 1.8. Saiu de linha em 1992 por baixas vendas.
 * - Logus (1993-1997): cupê 2 portas, irmão de plataforma do Pointer — ambos
 *   derivados do Ford Escort Mk5 europeu (a mesma base do Ford Orion argentino
 *   de 1994). Motor 1.6 CHT (AE1600) nas versões básicas, AP 1.8 e, a partir de
 *   1994, AP 2.0 na GLS/GLSi. Desenhado pelo estúdio Ghia (Itália).
 * - Pointer (1994-1996): hatch 5 portas, irmão de plataforma do Logus. Vendido
 *   no Brasil, Argentina e Uruguai. Só motores AP 1.8 e AP 2.0, câmbio manual
 *   de 5 marchas (sem automático). Versão de topo: GTi 2.0.
 *
 * Os três saíram de linha com o fim da Autolatina (parceria desfeita em 1995,
 * produção residual até 1996-1997). Não foram localizados recalls formais
 * registrados para nenhum dos três modelos nas buscas realizadas (Procon-SP,
 * imprensa especializada) — carros de baixíssimo volume e época anterior à
 * consolidação dos programas de recall no Brasil.
 *
 * Execute: pnpm --filter @motormacete/database db:seed:vw-apolo-logus-pointer
 *
 * Fontes: en.wikipedia.org (Volkswagen Logus, Volkswagen Pointer, Ford Verona),
 *         instacarro.com/blog, seucarrousado.com.br, carrosegaragem.com.br,
 *         pt.wikipedia.org/wiki/Volkswagen_AP, coffeemotors.com.br,
 *         canaldapeca.com.br/blog, carroclub.com.br (opiniões de donos),
 *         parallelum.com.br/fipe/api (tabela FIPE — marca 59 Volkswagen)
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

// ---------------------------------------------------------------------------
// APOLO (1990-1992)
// ---------------------------------------------------------------------------

const APOLO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Apolo é o Ford Verona rebatizado — mecânica compartilhada, lataria própria',
    body: 'O Apolo nasceu dentro da Autolatina como uma versão "afrancesada" do Ford Verona (1ª geração, 1989-1992), com carroceria derivada do Ford Escort Mk4 europeu via Orion. A VW deu rodas, grade, lanternas e interior exclusivos, além de suspensão mais firme — mas a base mecânica é a mesma do Verona. Ao procurar peças, forneçedores que atendem Ford Verona da mesma época costumam ajudar quando faltar cadastro específico do Apolo.',
  },
  {
    severity: 'OK',
    title: 'Só existiu com motor AP 1.8 — não confunda com o Verona 1.6',
    body: 'Diferente do Ford Verona (que teve versão com motor 1.6 CHT/AE1600), o Apolo foi vendido exclusivamente com o motor AP 1.8. Ao comprar peças de motor (comando, bomba de combustível, coletor), confirme sempre que são do AP 1.8 e não do 1.6 — mesmo em anúncios de "peças para Verona/Apolo" genéricos.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor são fáceis e baratas — peças de lataria são raras',
    body: 'O motor AP é o mesmo usado por anos em Gol, Voyage, Santana e Parati, então peças mecânicas (embreagem, bomba d\'água, coxins, correias) continuam fáceis e baratas de achar em qualquer loja de autopeças. Já peças de lataria e acabamento exclusivas do Apolo (para-choques, grade, lanternas, emblemas) são raras — procure desmanches especializados em clássicos Autolatina, clubes de proprietários e anúncios de sucata.',
  },
  {
    severity: 'OK',
    title: 'Correia dentada: troque por segurança, independente da km, se não souber a data',
    body: 'A recomendação de fábrica para o motor AP é trocar a correia dentada a cada 80.000 km. Só que num carro com mais de 30 anos, a borracha resseca com o tempo mesmo rodando pouco — se você não tem certeza de quando foi a última troca, faça-a preventivamente. Correia arrebentada em motor AP (não é "banhado a óleo" com folga livre) bate válvula no pistão.',
  },
  {
    severity: 'OK',
    title: 'Produção baixa e curta (1990-1992) — carro raro hoje',
    body: 'O Apolo saiu de linha em 1992, cedo, por causa das vendas fracas diante do Verona (que seguiu vendendo até 1996/97 numa segunda geração). Isso o tornou um modelo raro atualmente — vale a pena se aproximar de clubes de colecionadores e grupos de Autolatina antes de sair caçando peça avulsa, eles costumam saber onde ainda tem estoque.',
  },
]

const APOLO_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamentos de óleo crônicos do motor AP',
    body: 'É comum motores AP dessa idade apresentarem vazamento de óleo pela junta do cárter e pelos retentores de virabrequim/comando de válvulas. Não é motivo de pânico, mas verifique o nível de óleo com regularidade e não deixe vazamentos grandes sem reparo — óleo pingando sobre o escapamento é risco de incêndio.',
  },
  {
    severity: 'WARN',
    title: 'Relatos de problemas elétricos e de fiação',
    body: 'Proprietários relatam falhas elétricas ocasionais, esperadas em chicotes com décadas de uso — conexões oxidadas, aterramentos ruins. Se notar luzes de painel instáveis, buzina ou setas falhando, comece revisando os pontos de aterramento e conectores antes de trocar peças caras.',
  },
  {
    severity: 'WARN',
    title: 'Longarina e suspensão: pontos de atenção segundo relatos de donos',
    body: 'Há relatos de fragilidade estrutural na região da longarina e desgaste de suspensão em unidades mais usadas. Em uma inspeção pré-compra ou revisão geral, vale checar pontos de ferrugem e fadiga na longarina dianteira, além de buchas e amortecedores.',
  },
]

const APOLO_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma básico Apolo (motor AP 1.8)',
    body: '80.000 km — Correia dentada + tensor + correia poly-V (ou por segurança, independente da km, se a data da última troca for desconhecida). | 5.000-10.000 km — Troca de óleo do motor e filtro (recomendação de época; considerar intervalo mais curto pelo uso urbano e idade do motor). | A cada revisão — Verificar vazamentos no cárter e retentores, e o estado do chicote elétrico e conexões de aterramento. | Anual — Inspeção de longarina, suspensão e buchas, dado o tempo de uso do veículo.',
  },
  {
    severity: 'WARN',
    title: 'Carro de coleção: mangueiras, borrachas e fluidos vencem pelo tempo, não só pela km',
    body: 'Com mais de 30 anos de fabricação, mangueiras de radiador, coxins de motor, borrachas de suspensão e fluido de freio se degradam pelo tempo mesmo com baixa quilometragem. Se for reativar um Apolo parado ou comprar um de procedência desconhecida, faça uma revisão completa desses itens antes de rodar normalmente.',
  },
]

// ---------------------------------------------------------------------------
// LOGUS (1993-1997)
// ---------------------------------------------------------------------------

const LOGUS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Logus é o cupê da Autolatina — plataforma do Ford Escort Mk5 europeu',
    body: 'O Logus (cupê 2 portas, lançado em 1993) e o Pointer (hatch 5 portas) compartilham a mesma plataforma, derivada do Ford Escort Mk5 europeu — a mesma base do Ford Orion vendido na Argentina a partir de 1994. É uma plataforma diferente da usada no Apolo/Ford Verona (que vem do Escort Mk4 anterior). Não troque peças de suspensão/carroceria entre Apolo e Logus achando que são compatíveis.',
  },
  {
    severity: 'OK',
    title: 'Motorização variou bastante ao longo dos 4 anos — confirme antes de comprar peça',
    body: 'O Logus teve motor 1.6 CHT (AE1600) nas versões de entrada, AP 1.8 nas intermediárias e, a partir de 1994, AP 2.0 na GLS/GLSi (com a Wolfsburg Edition 2000i no topo). Antes de comprar peça de motor ou injeção, confirme a motorização exata da sua unidade — a plaqueta do motor ou o número de chassi ajudam a identificar.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor fáceis, peças de lataria raras (carroceria só dele)',
    body: 'Os motores CHT e AP eram usados em praticamente toda a linha VW e Ford da época (Gol, Voyage, Santana, Del Rey, Verona), então peça mecânica de motor é fácil e barata. Já a carroceria cupê 2 portas é exclusiva do Logus — para-choques, lanternas e acabamentos específicos exigem desmanches especializados em clássicos Autolatina ou grupos de proprietários.',
  },
  {
    severity: 'OK',
    title: 'Produção pequena e projeto interrompido pelo fim da Autolatina',
    body: 'O Logus foi desenhado pelo estúdio italiano Ghia e produzido em São Bernardo do Campo. Variantes planejadas — facelift, versão conversível e picape — nunca saíram do papel porque a Autolatina se desfez em 1995 e a produção encerrou entre 1996 e 1997. Isso o torna um modelo de baixíssimo volume, então documentação técnica original pode ser difícil de achar; consulte clubes de proprietários.',
  },
  {
    severity: 'OK',
    title: 'Correia dentada AP: troque por segurança se não souber a data da última troca',
    body: 'Para as versões com motor AP (1.8 e 2.0), a recomendação de fábrica é trocar a correia dentada a cada 80.000 km. Num carro com quase três décadas, a borracha resseca com o tempo — se a procedência ou histórico do carro for incerto, troque preventivamente antes de rodar.',
  },
]

const LOGUS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamentos de óleo crônicos nos motores AP e CHT',
    body: 'É comum encontrar vazamento de óleo pela junta do cárter e pelos retentores de virabrequim/comando em motores AP e CHT dessa idade. Fique de olho no nível de óleo e não deixe vazamentos grandes sem reparo.',
  },
  {
    severity: 'WARN',
    title: 'Peças de carroceria específicas do cupê estão descontinuadas há décadas',
    body: 'Por ser um modelo de baixíssimo volume e carroceria exclusiva (cupê 2 portas), para-choques, grades, lanternas e acabamentos originais não são mais fabricados. O caminho mais viável hoje é desmanche especializado, clubes de Autolatina/clássicos ou peças usadas anunciadas em marketplaces.',
  },
  {
    severity: 'WARN',
    title: 'Buchas e amortecedores ressecados pela idade, mesmo em baixa quilometragem',
    body: 'Borracha de bucha de suspensão e coxim de motor degradam com o tempo, não só com o uso. Mesmo um Logus rodado pouco pode ter esses itens endurecidos ou rachados — vale inspecionar antes de viagens longas ou uso mais exigente.',
  },
]

const LOGUS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma básico Logus (conforme motorização: 1.6 CHT, 1.8 AP ou 2.0 AP)',
    body: '80.000 km — Correia dentada + tensor + correia poly-V nas versões AP (1.8/2.0), ou por segurança se a data da última troca for desconhecida. | 5.000-10.000 km — Troca de óleo do motor e filtro (uso urbano e idade do motor podem justificar intervalo mais curto que o de época). | A cada revisão — Verificar vazamentos no cárter/retentores e o estado do chicote elétrico. | Anual — Inspeção de buchas de suspensão, coxins de motor e mangueiras, dado o tempo de fabricação.',
  },
]

// ---------------------------------------------------------------------------
// POINTER (1994-1996)
// ---------------------------------------------------------------------------

const POINTER_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pointer é o hatch irmão do Logus — mesma plataforma do Ford Escort Mk5 europeu',
    body: 'O Pointer (hatch 5 portas) e o Logus (cupê 2 portas) compartilham a mesma plataforma, derivada do Ford Escort Mk5 europeu — vendido no Brasil, Argentina e Uruguai entre 1994 e 1996 dentro da Autolatina. É uma base diferente da usada no Apolo/Ford Verona (Escort Mk4 anterior); não misture peças de suspensão entre os dois.',
  },
  {
    severity: 'OK',
    title: 'Só existiu com motor AP 1.8 ou AP 2.0 — sem opção 1.6 e sem automático',
    body: 'Ao contrário do Logus (que teve versão 1.6 CHT), o Pointer só foi vendido com motor AP 1.8 ou AP 2.0, sempre com câmbio manual de 5 marchas — não houve versão automática. Confirme a motorização exata antes de comprar peça de motor ou injeção.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor fáceis, peças de lataria específicas do Pointer são raras',
    body: 'O motor AP era usado em praticamente toda a linha VW da época (Gol, Voyage, Santana, Parati), então peça mecânica de motor continua fácil e barata de achar. Já para-choques, grade e lanternas específicas do Pointer exigem desmanches especializados em clássicos Autolatina, clubes de proprietários ou anúncios de peças usadas.',
  },
  {
    severity: 'OK',
    title: 'Versão GTi 2.0 é a mais rara — atenção redobrada com originalidade',
    body: 'A versão de topo GTi 2.0 foi a mais valorizada da linha (a última unidade produzida está preservada no museu da Volkswagen em Wolfsburg). Se a sua é uma GTi, tome cuidado extra com a procedência de peças de suspensão esportiva e acabamento — são as mais visadas por colecionadores e mais difíceis de repor com originalidade.',
  },
  {
    severity: 'OK',
    title: 'Correia dentada AP: troque por segurança se não souber a data da última troca',
    body: 'A recomendação de fábrica para o motor AP é trocar a correia dentada a cada 80.000 km. Num carro com cerca de 30 anos, a borracha resseca com o tempo independente da km rodada — se não tiver certeza da última troca, faça-a preventivamente antes de rodar normalmente.',
  },
]

const POINTER_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamentos de óleo crônicos do motor AP',
    body: 'É comum motores AP dessa idade apresentarem vazamento de óleo pela junta do cárter e retentores de virabrequim/comando. Verifique o nível de óleo com frequência e não deixe vazamentos maiores sem reparo.',
  },
  {
    severity: 'WARN',
    title: 'Peças de lataria e acabamento descontinuadas',
    body: 'Para-choques, grade, lanternas e emblemas específicos do Pointer não são mais fabricados. Desmanches especializados em Autolatina/clássicos e clubes de proprietários são o caminho mais confiável para encontrar peças originais hoje.',
  },
  {
    severity: 'WARN',
    title: 'Buchas e amortecedores ressecados pela idade',
    body: 'Mesmo um Pointer com baixa quilometragem pode ter buchas de suspensão e coxins de motor endurecidos ou rachados só pelo tempo de uso. Vale inspecionar antes de rodagens mais longas, especialmente em unidades GTi usadas com mais vigor.',
  },
]

const POINTER_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma básico Pointer (motor AP 1.8 ou 2.0)',
    body: '80.000 km — Correia dentada + tensor + correia poly-V, ou por segurança se a data da última troca for desconhecida. | 5.000-10.000 km — Troca de óleo do motor e filtro (considerar intervalo mais curto que o de época pelo uso urbano e idade do motor). | A cada revisão — Verificar vazamentos no cárter/retentores. | Anual — Inspeção de buchas, coxins e mangueiras, dado o tempo de fabricação do veículo.',
  },
]

// ---------------------------------------------------------------------------

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Apolo',
    yearFrom: 1990,
    yearTo: 1992,
    tireSize: '175/70 R13 (estimado)',
    frontPsi: 28,
    rearPsi: 30,
    frontPsiLoad: null,
    rearPsiLoad: null,
    sparePsi: 30,
    notes: 'Não foi possível confirmar a pressão original de fábrica para o Apolo em fontes atuais — valor estimado para a classe/época (sedã médio Autolatina, aro 13). A etiqueta original na coluna da porta ou tampa do tanque costuma estar apagada em carros desta idade; confirme com oficina especializada em clássicos VW/Ford Autolatina antes de calibrar.',
  },
  {
    modelName: 'Logus',
    yearFrom: 1993,
    yearTo: 1997,
    tireSize: '175/70 R13',
    frontPsi: 28,
    rearPsi: 30,
    frontPsiLoad: null,
    rearPsiLoad: null,
    sparePsi: 30,
    notes: 'Aro 175/70 R13 é o tamanho de pneu mais associado ao Logus na época, compartilhado com Gol/Pointer/Voyage. Pressão de fábrica exata não localizada em fontes atuais — valor estimado para a classe/época; confirme na etiqueta original (se ainda legível) ou com oficina especializada em clássicos.',
  },
  {
    modelName: 'Pointer',
    yearFrom: 1994,
    yearTo: 1996,
    tireSize: '175/70 R13',
    frontPsi: 28,
    rearPsi: 30,
    frontPsiLoad: null,
    rearPsiLoad: null,
    sparePsi: 30,
    notes: 'Aro 175/70 R13 é o tamanho de pneu mais associado ao Pointer na época, compartilhado com Gol/Logus/Voyage. Pressão de fábrica exata não localizada em fontes atuais — valor estimado para a classe/época; confirme na etiqueta original (se ainda legível) ou com oficina especializada em clássicos. Versões GTi 2.0 mais esportivas podem ter especificação diferente.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // Apolo
  { modelName: 'Apolo', yearFrom: 1990, yearTo: 1992, component: 'Correia dentada + tensor (motor AP 1.8)', intervalKm: 80000, intervalMonths: null, notes: 'Troque por segurança se desconhecer a data da última troca — borracha resseca com o tempo.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Apolo', yearFrom: 1990, yearTo: 1992, component: 'Óleo do motor + filtro', intervalKm: 5000, intervalMonths: 6, notes: 'Considere intervalo mais curto que o de época pelo uso urbano e idade do motor.', priority: 'HIGH', order: 1 },
  { modelName: 'Apolo', yearFrom: 1990, yearTo: 1992, component: 'Inspeção de vazamentos (cárter, retentores)', intervalKm: null, intervalMonths: 6, notes: 'Vazamento crônico comum em motores AP desta idade.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Apolo', yearFrom: 1990, yearTo: 1992, component: 'Mangueiras, buchas e coxins', intervalKm: null, intervalMonths: 12, notes: 'Degradam pelo tempo mesmo com baixa km — inspeção anual recomendada.', priority: 'MEDIUM', order: 3 },
  // Logus
  { modelName: 'Logus', yearFrom: 1993, yearTo: 1997, component: 'Correia dentada + tensor (versões AP 1.8/2.0)', intervalKm: 80000, intervalMonths: null, notes: 'Troque por segurança se desconhecer a data da última troca.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Logus', yearFrom: 1993, yearTo: 1997, component: 'Óleo do motor + filtro', intervalKm: 5000, intervalMonths: 6, notes: 'Considere intervalo mais curto que o de época pelo uso urbano e idade do motor.', priority: 'HIGH', order: 1 },
  { modelName: 'Logus', yearFrom: 1993, yearTo: 1997, component: 'Inspeção de vazamentos (cárter, retentores)', intervalKm: null, intervalMonths: 6, notes: 'Vazamento crônico comum em motores AP/CHT desta idade.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Logus', yearFrom: 1993, yearTo: 1997, component: 'Buchas de suspensão e coxins de motor', intervalKm: null, intervalMonths: 12, notes: 'Degradam pelo tempo mesmo com baixa km — inspeção anual recomendada.', priority: 'MEDIUM', order: 3 },
  // Pointer
  { modelName: 'Pointer', yearFrom: 1994, yearTo: 1996, component: 'Correia dentada + tensor (motor AP 1.8/2.0)', intervalKm: 80000, intervalMonths: null, notes: 'Troque por segurança se desconhecer a data da última troca.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Pointer', yearFrom: 1994, yearTo: 1996, component: 'Óleo do motor + filtro', intervalKm: 5000, intervalMonths: 6, notes: 'Considere intervalo mais curto que o de época pelo uso urbano e idade do motor.', priority: 'HIGH', order: 1 },
  { modelName: 'Pointer', yearFrom: 1994, yearTo: 1996, component: 'Inspeção de vazamentos (cárter, retentores)', intervalKm: null, intervalMonths: 6, notes: 'Vazamento crônico comum em motores AP desta idade.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Pointer', yearFrom: 1994, yearTo: 1996, component: 'Buchas de suspensão e coxins de motor', intervalKm: null, intervalMonths: 12, notes: 'Degradam pelo tempo mesmo com baixa km — atenção redobrada em unidades GTi usadas com mais vigor.', priority: 'MEDIUM', order: 3 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Apolo',
    yearFrom: 1990,
    yearTo: 1992,
    MACETES: APOLO_MACETES,
    PROBLEMAS: APOLO_PROBLEMAS,
    MANUTENCAO: APOLO_MANUTENCAO,
  },
  {
    modelName: 'Logus',
    yearFrom: 1993,
    yearTo: 1997,
    MACETES: LOGUS_MACETES,
    PROBLEMAS: LOGUS_PROBLEMAS,
    MANUTENCAO: LOGUS_MANUTENCAO,
  },
  {
    modelName: 'Pointer',
    yearFrom: 1994,
    yearTo: 1996,
    MACETES: POINTER_MACETES,
    PROBLEMAS: POINTER_PROBLEMAS,
    MANUTENCAO: POINTER_MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volkswagen Apolo / Logus / Pointer...')

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

  console.log('✅ Volkswagen Apolo / Logus / Pointer concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
