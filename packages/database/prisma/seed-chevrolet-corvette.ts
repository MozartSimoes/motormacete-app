/**
 * Seed Chevrolet Corvette — macetes, problemas, manutenção e calibragem de pneus
 * Esportivo importado de baixíssimo volume no Brasil, motor V8, nunca teve
 * venda oficial da GM aqui até a chegada da geração C7 (anúncio de importação
 * oficial pela Chevrolet a partir de 2015) — exemplares anteriores (C3 a C5,
 * décadas de 1970 a 2004) circulam no país por importação paralela/particular.
 * Dado o baixíssimo volume e a escassez de fonte confiável específica por
 * geração no contexto brasileiro, o conteúdo abaixo é dividido em dois blocos
 * amplos — clássico (C3-C5, carburado/injeção primitiva) e moderno (C6-C8,
 * eletrônica computadorizada) — com foco nos cuidados de manutenção típicos
 * de um esportivo importado de baixa frota, não em detalhe técnico por ano.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-corvette
 *
 * Fontes: flatout.com.br, getgaragehub.com, miamiimports.com.br,
 *         gruposentinela.com.br, caarros.com.br, corvetteforum.com,
 *         stingrayforums.com, jantes-e-pneus.com, motorshow.com.br
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

// ─── Corvette clássico — C3 a C5 (1968-2004) ───────────────────────────────

const MACETES_CLASSICO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor V8 pushrod: mecânica relativamente simples, mas peça é toda de importação',
    body: 'O V8 pequeno bloco (small block Chevy) usado nas gerações C3 a C5 é conceitualmente simples — mesma família usada em picapes e carros americanos da época, o que ajuda a achar informação técnica genérica. O desafio no Brasil não é a complexidade do motor, é a origem da peça: praticamente tudo específico do Corvette (não do motor genérico) precisa ser importado.',
  },
  {
    severity: 'WARN',
    title: 'Carburador ou injeção primitiva: cuidado com "modernização" malfeita',
    body: 'Dependendo do ano, o Corvette clássico pode ter carburador (C3) ou sistemas de injeção eletrônica primitivos (C4/C5, como TPI e as primeiras gerações LT1/LS1). Adaptações mal executadas para "modernizar" a alimentação de combustível são causa comum de problema de partida a frio e afogamento. Procure sempre um especialista com experiência específica em Corvette antes de qualquer intervenção nesse sistema.',
  },
  {
    severity: 'WARN',
    title: 'Uso esporádico degrada combustível e resseca borracha — rode o carro com regularidade',
    body: 'Corvette clássico costuma ser carro de baixa quilometragem anual, guardado a maior parte do tempo. Combustível parado por muito tempo se degrada e pode causar problema de alimentação, e mangueiras de combustível e coxins de borracha ressecam com o tempo parado, mesmo sem uso. Antes de rodar depois de um período parado, vale inspecionar mangueiras e, se possível, trocar o combustível.',
  },
  {
    severity: 'OK',
    title: 'Carroceria em fibra de vidro: o chassi de aço é o ponto que mais importa inspecionar',
    body: 'A carroceria do Corvette clássico é em fibra de vidro, que não enferruja como aço — mas o chassi por baixo é de aço convencional e pode corroer normalmente. Ao avaliar um exemplar, inspecione o chassi por baixo com mais atenção do que a lataria, que costuma "esconder" bem o estado real de conservação.',
  },
  {
    severity: 'WARN',
    title: 'Estoque peças de desgaste antes de precisar — elas não estão na esquina',
    body: 'Peças de suspensão, freio e vedação específicas do Corvette (diferentes das usadas em picapes/carros comuns com o mesmo motor) são raras no Brasil. A prática mais comum entre proprietários é importar de fornecedores especializados dos EUA (ex.: Corvette Central, Zip Corvette) e manter um pequeno estoque de itens de desgaste, em vez de esperar quebrar para procurar.',
  },
]

const PROBLEMAS_CLASSICO: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ressecamento de borrachas e vazamentos por baixo uso',
    body: 'O problema mais recorrente em Corvette clássico não é desgaste por quilometragem, é o oposto: baixo uso resseca borrachas de vedação, mangueiras de combustível e coxins, causando vazamentos que só aparecem quando o carro volta a rodar depois de tempo parado. Inspecione essas borrachas periodicamente mesmo que o carro mal saia da garagem.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico envelhecido causa falhas intermitentes',
    body: 'Em carros com décadas de idade, conexões elétricas e chicotes originais podem apresentar falhas intermitentes (luzes, instrumentos, ignição) difíceis de diagnosticar. Um chicote com reparo malfeito no passado costuma ser a causa mais comum — vale inspeção elétrica completa por alguém com experiência no modelo antes de assumir defeito em algum módulo caro.',
  },
  {
    severity: 'WARN',
    title: 'Poucas oficinas especializadas no Brasil, concentradas em poucas cidades',
    body: 'A oferta de mecânicos com experiência real em Corvette clássico é pequena no Brasil e tende a se concentrar em São Paulo e Rio de Janeiro. Fora dessas praças, o proprietário costuma depender de oficinas de carros antigos em geral (não necessariamente especializadas em Corvette) — vale pesquisar clubes de marca e fóruns antes de escolher onde levar o carro.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio (manual ou automático de época) tem peça cada vez mais escassa',
    body: 'Componentes do câmbio original (seja manual ou automático da época) ficam mais difíceis de repor à medida que o tempo passa. Problemas de embreagem ou engate merecem diagnóstico cedo — esperar demais pode transformar um reparo simples em uma busca demorada por peça de importação.',
  },
]

const MANUTENCAO_CLASSICO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Corvette clássico (C3-C5) — recomendações gerais para carro de coleção/baixa km',
    body: 'Troque o óleo do motor por tempo (a cada 6-12 meses), não só por quilometragem — carro de baixo uso acumula pouca km mas o óleo degrada com o tempo mesmo parado. | Inspecione mangueiras de combustível e coxins de borracha periodicamente, principalmente antes de longas viagens depois de período parado. | Troque o combustível se o carro ficar muito tempo (meses) sem rodar, para evitar degradação na linha de alimentação. | Use mantenedor de bateria sempre que o carro ficar parado por semanas. | Inspecione o chassi de aço por baixo contra corrosão pelo menos uma vez por ano. | Qualquer intervenção em carburador/injeção primitiva ou câmbio de época — procure especialista com experiência específica em Corvette, evite "solução genérica" de oficina não familiarizada com o carro.',
  },
]

// ─── Corvette moderno — C6 a C8 (2005-) ────────────────────────────────────

const MACETES_MODERNO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor LS/LT moderno é confiável, mas a peça continua vindo de fora',
    body: 'Os motores LS2/LS3/LS7 (C6/C7) e LT1/LT2 (C7/C8) são bem mais modernos e confiáveis que os motores clássicos, com eletrônica computadorizada equivalente à de carros atuais. A rede oficial Chevrolet cobre parte da geração C7/C8 desde a importação oficial anunciada em 2015, mas o estoque de peça específica ainda pode ser mais lento que o de um carro nacional — sempre pergunte prazo antes de fechar o serviço.',
  },
  {
    severity: 'WARN',
    title: 'Uso esporádico: os mesmos cuidados de qualquer esportivo de garagem',
    body: 'Como boa parte da frota roda pouco, os cuidados clássicos de carro de baixo uso valem aqui também: mantenedor de bateria quando parado por mais de uma semana, e uma rodada periódica em rodovia para evitar ponto de pneu (flat-spot) e manter fluidos circulando.',
  },
  {
    severity: 'WARN',
    title: 'Gerenciamento de cilindros (AFM/DoD) pode gerar ruído de tucho/guia de tuchos',
    body: 'O sistema que desativa cilindros para economizar combustível (AFM ou Dynamic Fuel Management, dependendo da geração) é compartilhado com outros V8 GM, e o guia de tuchos associado a esse sistema pode desgastar e gerar ruído — o mesmo problema relatado em outros modelos GM com motor V8 da mesma família. Não ignore ruído tipo "tec-tec" vindo do motor.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão magnética (MagneRide): amortecedor eletrônico caro, evite buracos com força',
    body: 'Nas versões com suspensão adaptativa MagneRide (opcional em Z51/Grand Sport e outras versões de performance), os amortecedores são eletrônicos e caros para repor, sendo item de importação. Redobre o cuidado ao passar por buracos e lombadas mal niveladas — o custo de substituição é bem mais alto que o de um amortecedor convencional.',
  },
  {
    severity: 'OK',
    title: 'Pneus run-flat: sem estepe, planeje-se para não ficar na mão',
    body: 'A maioria das configurações do Corvette moderno usa pneu run-flat e não traz estepe. Como a medida do pneu é rara no Brasil, uma furada pode significar dias esperando peça. Vale considerar manter um pneu extra guardado (principalmente antes de viagens) e já saber de antemão onde importar rápido em caso de necessidade.',
  },
]

const PROBLEMAS_MODERNO: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Guia de tuchos do sistema de gerenciamento de cilindros',
    body: 'O mesmo problema relatado em outros V8 GM com sistema de desativação de cilindros aparece no Corvette: o guia de tuchos desgasta e pode gerar ruído ou perda de funcionamento de um cilindro. Diagnóstico e reparo cedo evitam dano maior ao motor.',
  },
  {
    severity: 'WARN',
    title: 'Baixíssima frota no Brasil = pouca troca de experiência entre proprietários',
    body: 'Diferente de mercados como os EUA, onde fóruns como corvetteforum.com concentram décadas de relatos por geração, no Brasil o volume de carros é pequeno demais para gerar um histórico de "problema recorrente" bem documentado localmente. Vale acompanhar fóruns americanos e traduzir o que for relevante, sempre considerando que peça e serviço aqui têm prazo e custo diferentes.',
  },
  {
    severity: 'WARN',
    title: 'Peça de carroceria/estética é cara e sob encomenda',
    body: 'Peças de acabamento externo e interno (para-choque, para-lama, itens específicos de versão) tendem a ser caras e sob encomenda, sem alternativa de mercado paralelo local — planeje prazo e orçamento maiores que os de um carro nacional para qualquer reparo estético.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio de dupla embreagem (C8): exige óleo específico e oficina capacitada',
    body: 'O C8 usa câmbio automático de dupla embreagem (DCT), que exige fluido específico e conhecimento técnico que poucas oficinas fora da rede oficial têm no Brasil. Procure sempre um especialista com experiência real nesse câmbio antes de qualquer serviço relacionado à transmissão.',
  },
]

const MANUTENCAO_MODERNO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Corvette moderno (C6-C8) — recomendações gerais, siga também o computador de bordo',
    body: 'Troca de óleo sintético do motor a cada 10.000-12.000 km ou conforme o monitor de vida útil do óleo no painel (o que vier primeiro). | Inspeção de amortecedores MagneRide (se equipado) — evite buracos com força, item eletrônico caro. | Verificação de pneus run-flat quanto a desgaste e dano — não há estepe na maioria das versões. | Mantenedor de bateria sempre que o carro ficar mais de uma semana parado. | Rodada periódica em rodovia para evitar flat-spot nos pneus e manter fluidos circulando. | Óleo do câmbio DCT (C8) apenas em oficina especializada, com fluido específico. | Revisões, sempre que possível, na rede oficial Chevrolet ou em oficina com histórico comprovado em Corvette.',
  },
]

// ─── Consolidação ───────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Corvette',
    yearFrom: 1968,
    yearTo: 2004,
    tireSize: 'Varia por geração (C3 a C5) — confirme a medida específica do exemplar antes de calibrar',
    frontPsi: 30,
    rearPsi: 30,
    frontPsiLoad: null,
    rearPsiLoad: null,
    sparePsi: null,
    notes: 'Gerações clássicas tiveram diversas combinações de pneu ao longo de mais de 30 anos de produção — não existe medida única confiável para "o Corvette clássico". Consulte a etiqueta do exemplar, o manual original ou um especialista antes de calibrar.',
  },
  {
    modelName: 'Corvette',
    yearFrom: 2005,
    yearTo: null,
    tireSize: 'Staggered — dianteiro mais estreito que o traseiro, medida específica por geração/versão (Z51, Grand Sport, Z06)',
    frontPsi: 30,
    rearPsi: 30,
    frontPsiLoad: null,
    rearPsiLoad: null,
    sparePsi: null,
    notes: 'Valor de referência histórico citado por proprietários em torno de 30 psi a frio (algumas versões/anos com etiqueta pedindo até 35 psi) — como não há estepe na maioria das configurações (pneu run-flat), confirme sempre o valor exato na etiqueta da porta antes de calibrar.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Corvette', yearFrom: 1968, yearTo: 2004, component: 'Óleo do motor', intervalKm: 5000, intervalMonths: 12, notes: 'Troque por tempo, não só por km — carro de baixo uso anual acumula pouca quilometragem.', priority: 'HIGH', order: 0 },
  { modelName: 'Corvette', yearFrom: 1968, yearTo: 2004, component: 'Mangueiras de combustível e coxins de borracha — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Ressecam com o carro parado, mesmo sem uso. Principal causa de vazamento nessa geração.', priority: 'HIGH', order: 1 },
  { modelName: 'Corvette', yearFrom: 1968, yearTo: 2004, component: 'Troca/renovação do combustível após período parado', intervalKm: null, intervalMonths: 6, notes: 'Combustível degradado após meses parado pode causar problema de alimentação.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Corvette', yearFrom: 1968, yearTo: 2004, component: 'Bateria — mantenedor de carga', intervalKm: null, intervalMonths: null, notes: 'Use sempre que o carro ficar parado por semanas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Corvette', yearFrom: 1968, yearTo: 2004, component: 'Inspeção do chassi de aço contra corrosão', intervalKm: null, intervalMonths: 12, notes: 'Carroceria em fibra de vidro não enferruja, mas o chassi por baixo é de aço.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Corvette', yearFrom: 2005, yearTo: null, component: 'Óleo sintético do motor V8', intervalKm: 12000, intervalMonths: 12, notes: 'Siga também o monitor de vida útil do óleo no painel.', priority: 'HIGH', order: 5 },
  { modelName: 'Corvette', yearFrom: 2005, yearTo: null, component: 'Bateria — mantenedor de carga', intervalKm: null, intervalMonths: null, notes: 'Use sempre que o carro ficar mais de uma semana parado.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Corvette', yearFrom: 2005, yearTo: null, component: 'Pneus run-flat — inspeção de desgaste e dano', intervalKm: 5000, intervalMonths: null, notes: 'Sem estepe na maioria das versões — medida rara no Brasil, planeje-se para eventual furo.', priority: 'HIGH', order: 7 },
  { modelName: 'Corvette', yearFrom: 2005, yearTo: null, component: 'Amortecedores MagneRide — inspeção (se equipado)', intervalKm: null, intervalMonths: 12, notes: 'Item eletrônico caro e de importação. Evite buracos com força.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Corvette', yearFrom: 2005, yearTo: null, component: 'Óleo do câmbio DCT (C8)', intervalKm: 40000, intervalMonths: 36, notes: 'Fluido específico — somente oficina especializada nesse câmbio.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Corvette',
    yearFrom: 1968,
    yearTo: 2004,
    MACETES: MACETES_CLASSICO,
    PROBLEMAS: PROBLEMAS_CLASSICO,
    MANUTENCAO: MANUTENCAO_CLASSICO,
  },
  {
    modelName: 'Corvette',
    yearFrom: 2005,
    yearTo: null,
    MACETES: MACETES_MODERNO,
    PROBLEMAS: PROBLEMAS_MODERNO,
    MANUTENCAO: MANUTENCAO_MODERNO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Corvette...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Chevrolet', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Chevrolet', vehicleTypeId: carroType.id },
  })

  const modelNames = [...new Set(BLOCKS.map((b) => b.modelName))]

  for (const modelName of modelNames) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: modelName, brandId: brand.id } },
      update: {},
      create: { name: modelName, brandId: brand.id },
    })
  }

  await prisma.tip.deleteMany({ where: { modelName: { in: modelNames } } })

  const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
  let order = 0
  const allTipsData = BLOCKS.flatMap((block) =>
    cats.flatMap((cat) =>
      block[cat].map((tip) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: order++,
      }))
    )
  )
  await prisma.tip.createMany({ data: allTipsData })
  console.log(`  ✅ ${allTipsData.length} tips`)

  await prisma.tirePressure.deleteMany({ where: { modelName: { in: modelNames } } })
  await prisma.tirePressure.createMany({ data: TIRE_PRESSURES })
  console.log(`  🔵 TirePressures: ${TIRE_PRESSURES.length}`)

  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: modelNames } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Chevrolet Corvette concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
