/**
 * Seed Volkswagen Delivery — macetes, problemas, manutenção e calibragem
 * Caminhão leve/VUC (Veículo Urbano de Carga) fabricado pela Volkswagen
 * Caminhões e Ônibus na fábrica de Resende-RJ, sob o sistema de "Consórcio
 * Modular". 1ª geração "Delivery" (1995-2018): motores MWM Sprint e Cummins,
 * Euro III, câmbio manual de 5 marchas, faixa de 4 a 13 toneladas. 2ª geração
 * "Delivery Express"/"Delivery II" (2018-presente, catalogada na FIPE como
 * "Delivery Express Turbo Diesel (E6)" e "Delivery Express+ Turbo Diesel"):
 * motor Cummins 2.8 ISF turbodiesel (150cv/36,7kgfm), câmbio manual de 6
 * marchas, atendendo Proconve P7/P8 (Euro V/VI) com pós-tratamento SCR/Arla
 * 32 nas versões mais recentes. Existe também a versão elétrica e-Delivery
 * (desde 2018/2020, 11t e 14,3t), mecânica totalmente distinta e não coberta
 * por este seed. Execute: pnpm --filter @motormacete/database db:seed:vw-delivery
 *
 * Fontes: en.wikipedia.org/wiki/Volkswagen_Delivery, vwco.com.br,
 *         procon.sp.gov.br (recall cinto de segurança, jan/2019),
 *         reclameaqui.com.br/man-latin-america (diferencial, embreagem,
 *         suspensão, pós-tratamento), tabelafipebrasil.com, michelin.com.br
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
    title: 'VUC fabricado em Resende-RJ pelo sistema de Consórcio Modular',
    body: 'O Delivery é montado na fábrica da Volkswagen Caminhões e Ônibus em Resende-RJ, onde fornecedores parceiros montam módulos dentro da própria planta ("Consórcio Modular"). Para peças e serviço, procure a rede de concessionárias VW Caminhões e Ônibus — ela é separada da rede de carros de passeio VW e tem peças e técnicos específicos para o Delivery.',
  },
  {
    severity: 'OK',
    title: 'Motor Cummins 2.8 ISF e câmbio manual de 6 marchas (geração Delivery Express)',
    body: 'A geração atual (Delivery Express/Delivery II, a partir de 2018) usa motor Cummins 2.8 ISF turbodiesel (cerca de 150cv e 36,7kgfm) com câmbio manual de 6 marchas. As versões mais recentes atendem Proconve P7/P8 (Euro V/VI), algumas com sistema de pós-tratamento SCR que exige Arla 32.',
  },
  {
    severity: 'WARN',
    title: 'Nunca rode com o reservatório de Arla 32 vazio',
    body: 'Nas versões com pós-tratamento SCR, deixar o Arla 32 acabar faz o motor entrar em modo de potência reduzida e, se ignorado, pode limitar a velocidade ou impedir a partida — conforme exigido pelas normas de emissão Proconve. Reabasteça sempre que o alerta acender no painel, não espere a luz de reserva.',
  },
  {
    severity: 'OK',
    title: 'Respeite o PBT homologado da configuração (chassi + carroceria)',
    body: 'O Delivery é vendido em chassi e a carroceria (baú, sider, grade baixa) é montada por encarroçadoras terceiras. Sobrecarregar acima do PBT (peso bruto total) homologado para a configuração acelera o desgaste de suspensão, diferencial, freios e pneus — e pode invalidar a garantia desses componentes.',
  },
  {
    severity: 'OK',
    title: 'Delivery pré-2018 (1ª geração) tem mecânica diferente da Delivery Express',
    body: 'Se o seu Delivery for anterior a 2018 (1ª geração, com motor MWM Sprint ou Cummins mais antigo, câmbio de 5 marchas e Euro III), as peças, óleos e procedimentos são diferentes da geração Delivery Express atual. Informe o ano exato do chassi ao mecânico para evitar peça ou especificação de óleo trocada.',
  },
  {
    severity: 'WARN',
    title: 'Uso comercial intenso pede troca de óleo e filtros por tempo, não só por km',
    body: 'Em rotas urbanas de entrega com muitas paradas e marcha lenta prolongada (parado descarregando), o óleo e os filtros degradam mais rápido do que a quilometragem sozinha indicaria. Considere antecipar trocas se a rotina for de paradas frequentes e baixa velocidade média.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Diferencial traseiro: quebras recorrentes relatadas no Delivery Express',
    body: 'Há múltiplas reclamações registradas no Reclame Aqui sobre quebra repetida do diferencial traseiro do Delivery Express, em alguns casos voltando a quebrar poucos dias após o reparo, mesmo com carga dentro do limite nominal. Fique atento a ruído, vibração ou folga vindos do eixo traseiro e não adie a inspeção — documente tudo caso precise acionar a garantia.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem com desgaste acelerado em rotina de entrega urbana',
    body: 'O uso típico de VUC — muitas paradas, arranques e recuos em manobra de carga/descarga — desgasta a embreagem mais rápido que o uso rodoviário contínuo. Troque ao primeiro sinal de patinação, cheiro de queimado ou ponto de acionamento alto, para não danificar o volante bimassa ou o câmbio.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira: estalos e vazamento de amortecedor relatados',
    body: 'Proprietários relatam ruídos de estalo/batida na suspensão dianteira mesmo sem carga, além de vazamento de óleo em amortecedores. Algumas concessionárias negam a garantia alegando desgaste natural — vale insistir, pedir laudo por escrito e, se necessário, recorrer ao Procon ou à central de atendimento da VW Caminhões.',
  },
  {
    severity: 'WARN',
    title: 'Falhas no sistema de pós-tratamento (catalisador/sensor NOx)',
    body: 'Unidades mais recentes têm relatos de falha no catalisador e no sensor de NOx, com perda de desempenho ou luz de Arla acesa mesmo com o reservatório cheio — em alguns casos a causa é elétrica (fiação do dosador de Arla partida ou mal contatada), não falta de fluido. Peça diagnóstico eletrônico antes de simplesmente completar o Arla 32.',
  },
  {
    severity: 'DANGER',
    title: 'Recall: fivela do cinto de segurança do motorista (chassis 02/2017 a 11/2018)',
    body: 'A Volkswagen Caminhões e Ônibus convocou (recall registrado em janeiro/2019 no Procon-SP) unidades do Delivery Express e das famílias 4.150/6.160/9.170/11.180 fabricadas entre 20/02/2017 e 09/11/2018 devido a microtrincas na fivela do cinto de segurança do motorista, com risco de rompimento em caso de acionamento. Confirme se o chassi do seu veículo foi convocado em vwco.com.br/recall antes de continuar usando.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Delivery Express (Volkswagen + ajuste uso comercial BR)',
    body: '15.000 km ou 12 meses (o que vier primeiro) — Troca de óleo do motor Cummins 2.8 + filtro de óleo (confirme o intervalo exato na tabela de manutenção do chassi, pode variar por versão). | A cada abastecimento — Verificar nível de Arla 32 e completar antes de esvaziar. | 15.000-30.000 km — Filtro de combustível diesel / separador de água (dreno regular, mais frequente que em carro de passeio). | 20.000-30.000 km — Filtro de ar do motor (reduza o intervalo em rotas com muita poeira). | A cada revisão — Inspeção de pastilhas/lonas de freio (desgaste mais rápido por causa da carga) e do diferencial traseiro (ruído/vibração). | 40.000-60.000 km — Óleo do câmbio manual e do diferencial. | A cada 10.000 km ou antes de viagem longa — Rodízio e inspeção de pneus, incluindo o estepe, considerando o peso transportado.',
  },
  {
    severity: 'WARN',
    title: 'Checklist diário para uso comercial (entrega/frota)',
    body: 'Antes de sair para a rota do dia: teste os freios, confira a pressão de todos os pneus (inclusive estepe) considerando se vai rodar carregado ou vazio, verifique o nível de Arla 32, cheque a fixação da carroceria/baú na estrutura do chassi e teste as luzes. Em uso comercial intenso, pequenos problemas ignorados viram parada não programada e prejuízo de frete.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Delivery',
    yearFrom: 2018,
    yearTo: null,
    tireSize: '215/75 R17.5 ou 225/75 R16C, conforme versão/configuração de rodas do chassi',
    frontPsi: 65,
    rearPsi: 75,
    frontPsiLoad: 75,
    rearPsiLoad: 85,
    sparePsi: 85,
    notes: 'Pressão varia bastante conforme a medida de pneu, o rodado (simples ou duplo atrás) e a carga transportada — os valores acima são uma estimativa para uso típico de VUC e PRECISAM ser confirmados na etiqueta do chassi ou no manual do proprietário antes de calibrar. Sempre calibre considerando se vai rodar carregado ou vazio.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Delivery', yearFrom: 2018, yearTo: null, component: 'Óleo do motor', intervalKm: 15000, intervalMonths: 12, notes: 'Motor Cummins 2.8 ISF — confirme intervalo exato na tabela do chassi, uso severo (paradas frequentes) pode exigir antecipação.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Delivery', yearFrom: 2018, yearTo: null, component: 'Filtro de óleo', intervalKm: 15000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Delivery', yearFrom: 2018, yearTo: null, component: 'Arla 32 (fluido de arrefecimento de gases)', intervalKm: null, intervalMonths: null, notes: 'Completar sempre antes de esvaziar — nunca rodar com reservatório vazio (limita potência).', priority: 'CRITICAL', order: 2 },
  { modelName: 'Delivery', yearFrom: 2018, yearTo: null, component: 'Filtro de combustível diesel / separador de água', intervalKm: 20000, intervalMonths: 12, notes: 'Drenar água periodicamente, mais frequente que em carro de passeio.', priority: 'HIGH', order: 3 },
  { modelName: 'Delivery', yearFrom: 2018, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 25000, intervalMonths: 12, notes: 'Reduza o intervalo em rotas com muita poeira.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Delivery', yearFrom: 2018, yearTo: null, component: 'Pastilhas/lonas de freio', intervalKm: 15000, intervalMonths: null, notes: 'Desgaste mais rápido devido à carga transportada — inspecione a cada revisão.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Delivery', yearFrom: 2018, yearTo: null, component: 'Diferencial traseiro — inspeção de ruído/vibração', intervalKm: 15000, intervalMonths: null, notes: 'Há relatos recorrentes de quebra; não adiar inspeção se notar ruído ou folga.', priority: 'HIGH', order: 6 },
  { modelName: 'Delivery', yearFrom: 2018, yearTo: null, component: 'Embreagem — inspeção de desgaste', intervalKm: 30000, intervalMonths: null, notes: 'Uso urbano de entrega desgasta mais rápido; trocar ao notar patinação ou ponto alto.', priority: 'HIGH', order: 7 },
  { modelName: 'Delivery', yearFrom: 2018, yearTo: null, component: 'Óleo do câmbio manual', intervalKm: 50000, intervalMonths: 36, notes: 'Confirme especificação exata na tabela do chassi.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Delivery', yearFrom: 2018, yearTo: null, component: 'Óleo do diferencial', intervalKm: 50000, intervalMonths: 36, notes: 'Antecipe se notar ruído no eixo traseiro.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Delivery', yearFrom: 2018, yearTo: null, component: 'Pneus — rodízio e inspeção (inclui estepe)', intervalKm: 10000, intervalMonths: null, notes: 'Calibre considerando se vai rodar carregado ou vazio.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Delivery',
    yearFrom: 2018,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚚 Seed Volkswagen Delivery...')

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

  console.log('✅ Volkswagen Delivery concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
