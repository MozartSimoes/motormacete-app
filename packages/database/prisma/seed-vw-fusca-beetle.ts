/**
 * Seed Volkswagen Fusca + New Beetle — macetes, problemas, manutenção e calibragem
 * Dois nameplates distintos, tratados como VehicleModel separados:
 *
 * FUSCA — dois blocos de produção no Brasil:
 *   1) 1959-1986: produção original em São Bernardo do Campo (SP). Motor
 *      boxer 4 cilindros a ar (sem líquido de arrefecimento), cilindradas
 *      variando ao longo dos anos (1200 → 1300 → 1500 → 1600). Sistema
 *      elétrico 6V até meados dos anos 1960, depois 12V. Freios a tambor
 *      nas quatro rodas na maior parte da produção.
 *   2) 1993-1996: retorno da produção ("Fusca Itamar"), por iniciativa do
 *      governo do então presidente Itamar Franco dentro do programa do
 *      carro popular. Motor 1.6 a ar mantido, mas com freios a disco nas
 *      rodas dianteiras e itens de acabamento atualizados. Produção
 *      encerrada definitivamente em 28/06/1996 (Série Ouro).
 *
 * NEW BEETLE — hatch retrô sobre a plataforma do Golf 4 (motor EA113 2.0 8V,
 *   115cv), totalmente importado do México, vendido no Brasil entre 1999/2000
 *   e 2011. Câmbio manual ou automático de 4 marchas (evoluindo ao longo da
 *   produção). Sem relação mecânica com o Fusca clássico, além do nome/design.
 *
 * Nenhum recall formal foi localizado para Fusca ou New Beetle no Brasil —
 * para o Fusca clássico isso é esperado dado a época (décadas antes da
 * legislação brasileira de recall, que só se consolidou a partir dos anos
 * 1990); para o New Beetle, também não há campanha de recall documentada
 * pela Volkswagen do Brasil ou pelo Procon até o momento desta pesquisa.
 *
 * Execute: pnpm --filter @motormacete/database db:seed:vw-fusca-beetle
 *
 * Fontes: retornar.com.br, automaistv.com.br, oficialfpa.com.br,
 *         garagem360.com.br, cnnbrasil.com.br (Fusca Itamar), en.wikipedia.org
 *         (Volkswagen Beetle A5), autoo.com.br, vrum.com.br, seucarrousado.com.br,
 *         olhonocarro.com.br, motoragora.com.br, carroclub.com.br (New Beetle),
 *         totalfusca.blogspot.com, fusca4ever.com.br, autopapo.com.br,
 *         fuscashow.com.br, pneuponto.com.br, calibragemdepneu.com.br,
 *         parallelum.com.br/fipe (API pública FIPE, marca Volkswagen cód. 59)
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

// ─── Fusca — produção original (1959-1986) ────────────────────────────────

const MACETES_FUSCA_CLASSICO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor a ar: sem radiador, mas a correia do ventilador é vital',
    body: 'O motor boxer do Fusca é refrigerado a ar, não existe radiador nem líquido de arrefecimento tradicional. Quem faz o ar circular pelo motor é uma ventoinha movida pela única correia do motor — se essa correia arrebentar ou escapar, o motor superaquece em minutos. Verifique o estado e a tensão da correia com frequência e ande sempre com uma reserva no porta-malas.',
  },
  {
    severity: 'OK',
    title: 'Identifique a cilindrada exata antes de comprar peça de motor',
    body: 'Ao longo dos 27 anos de produção original, o Fusca passou por motor 1200, depois 1300, 1500 e por fim 1600 cc — cada um com particularidades de pistão, cabeçote e carburação. Confirme a cilindrada exata do seu carro (geralmente identificável pelo número do motor gravado no bloco) antes de comprar peça, para evitar comprar o item errado.',
  },
  {
    severity: 'OK',
    title: 'Sistema elétrico 6V (até meados dos anos 1960) x 12V (depois)',
    body: 'Fuscas mais antigos (grosso modo, até cerca de 1966/1967) saíram de fábrica com sistema elétrico de 6V; a partir daí a produção migrou para 12V. Peças elétricas (motor de arranque, bobina, lâmpadas, chicote) não são intercambiáveis entre os dois sistemas sem adaptação — confirme a voltagem do seu carro antes de comprar qualquer peça elétrica.',
  },
  {
    severity: 'OK',
    title: 'Peça mecânica ainda é fácil de achar; acabamento e cromados são o ponto caro',
    body: 'Por ter sido produzido em larga escala por quase três décadas, o mercado de peças mecânicas do Fusca (motor, câmbio, freio, suspensão) continua bem abastecido e relativamente barato. O gargalo real hoje está em peças de acabamento, borrachas originais e cromados — esses itens específicos de cada fase da produção podem ser caros e difíceis de achar.',
  },
  {
    severity: 'OK',
    title: 'Estoque de itens baratos de desgaste evita ficar parado na estrada',
    body: 'Correia do ventilador, jogo de velas, platinado, condensador, fusíveis e relés são baratos e compactos — vale manter um kit desses guardado no porta-malas. São as causas mais comuns de pane simples nesse tipo de motor, e a troca costuma ser rápida mesmo na beira da estrada.',
  },
  {
    severity: 'OK',
    title: 'Prefira oficina especializada em motor a ar refrigerado',
    body: 'Motor a ar tem lógica de ajuste (folga de válvulas, ponto de ignição, carburação) diferente do motor a água que domina as oficinas hoje. Procurar um mecânico ou clube de proprietários especializado em Fusca/motor a ar VW evita ajustes malfeitos por quem só tem prática com carro moderno.',
  },
]

const PROBLEMAS_FUSCA_CLASSICO: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Ferrugem estrutural — assoalho, caixas de roda e "chapéu de napoleão"',
    body: 'É o maior risco de um Fusca antigo: água que não escoa corretamente (borrachas de vidro ressecadas, furos de drenagem das portas entupidos) fica parada e ataca a chapa em pontos estruturais — assoalho, caixas de roda e o "chapéu de napoleão" (painel estrutural sob o para-brisa). Inspecione esses pontos regularmente; ferrugem estrutural avançada compromete a segurança do carro e o reparo correto exige funilaria especializada.',
  },
  {
    severity: 'WARN',
    title: 'Platinado desgastado desregula o ponto e pode impedir o carro de pegar',
    body: 'Motores com ignição por platinado (a grande maioria da produção original) dependem do contato entre os platinados para gerar a centelha. Com o desgaste, a folga entre os polos se altera, o ponto de ignição desregula e em casos mais graves o carro simplesmente não pega. Verifique a folga do platinado periodicamente e troque platinado + condensador junto com as velas.',
  },
  {
    severity: 'WARN',
    title: 'Fuscas com dínamo têm histórico de ficar mais parados que os com alternador',
    body: 'Unidades mais antigas usam dínamo em vez de alternador para gerar energia elétrica — o dínamo é menos eficiente e mais propenso a falhas em marcha lenta ou uso urbano parado. Se o seu Fusca ainda tem dínamo original, fique atento a sinais de bateria fraca (partida lenta, faróis fracos) e considere a manutenção preventiva desse componente.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo por retentores do motor é comum',
    body: 'Vazamentos leves de óleo pelos retentores do motor a ar são queixa recorrente entre proprietários de Fusca — não é necessariamente sinal de problema grave, mas deve ser monitorado. Acompanhe o nível de óleo com mais frequência do que faria em um carro moderno e resolva o vazamento assim que possível.',
  },
  {
    severity: 'WARN',
    title: 'Mão de obra especializada em motor a ar está cada vez mais rara',
    body: 'Com o motor refrigerado a água dominando o mercado há décadas, cada vez menos oficinas têm prática real com motor a ar. Encontrar um bom mecânico ou clube de Fusca na sua região vale mais do que economizar numa oficina genérica que só vai "aprender no seu carro".',
  },
]

const MANUTENCAO_FUSCA_CLASSICO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma básico Fusca clássico (motor a ar, ignição por platinado)',
    body: '3.000 km — Troca de óleo do motor + filtro (motor antigo pede intervalo bem mais curto que carro moderno). | A cada troca de óleo — Inspeção visual da correia do ventilador e dos retentores (vazamento). | 10.000 km — Platinado, condensador e velas — ajuste do ponto de ignição. | 10.000 km — Ajuste/regulagem das lonas de freio a tambor (dianteiro e traseiro). | 10.000 km — Verificação da folga do cabo de embreagem. | 20.000 km — Óleo do câmbio/diferencial. | Anual — Inspeção estrutural de ferrugem (assoalho, caixas de roda, chapéu de napoleão) e das borrachas de vedação de portas/vidros. | Anual — Fluido de freio.',
  },
]

// ─── Fusca — retorno "Itamar" (1993-1996) ─────────────────────────────────

const MACETES_FUSCA_ITAMAR: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesma base mecânica do fim da produção original — os macetes do Fusca clássico valem aqui também',
    body: 'O Fusca Itamar (1993-1996) manteve o motor boxer 1.6 a ar do fim da produção original de 1986, então todo o conhecimento sobre motor a ar, correia do ventilador, cilindrada e mão de obra especializada do bloco "Fusca clássico" se aplica integralmente a essa versão.',
  },
  {
    severity: 'OK',
    title: 'Freio a disco nas rodas dianteiras — atualização real em relação ao Fusca antigo',
    body: 'Diferente da maior parte da produção original (freio a tambor nas quatro rodas), o Fusca Itamar trouxe freio a disco nas rodas dianteiras, além de ajustes de suspensão e acabamento interno mais moderno. Ao comprar peça de freio dianteiro, confirme que é o kit de disco específico dessa versão, não o kit de tambor do Fusca mais antigo.',
  },
  {
    severity: 'OK',
    title: 'Volume de produção bem menor — peças específicas da série podem ser mais escassas',
    body: 'Por ter sido produzido em quantidade muito menor que os 27 anos da linha original, algumas peças específicas do Fusca Itamar (itens de acabamento e alguns componentes atualizados de freio/suspensão) podem ser mais difíceis de achar que a peça equivalente do Fusca "normal". Vale procurar clubes de proprietários e fóruns especializados antes de recorrer a peça genérica.',
  },
  {
    severity: 'OK',
    title: 'Modelo hoje colecionável — decida conscientemente entre originalidade e uso diário',
    body: 'O Fusca Itamar é um capítulo curto e simbólico da história do carro no Brasil (retorno por decisão do governo, produção encerrada em 1996 com a Série Ouro) e tem apelo de colecionador. Se pretende usar o carro no dia a dia, aceite que algumas adaptações modernas (peça remanufaturada, item elétrico atualizado) podem ser necessárias — e isso é uma escolha razoável, não "descaracterizar" o carro.',
  },
]

const PROBLEMAS_FUSCA_ITAMAR: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Mesma vulnerabilidade a ferrugem estrutural do Fusca clássico',
    body: 'A carroceria do Fusca Itamar segue a mesma lógica estrutural do Fusca original, incluindo os mesmos pontos fracos de drenagem de água (portas, para-brisa). Aplique a mesma rotina de inspeção de ferrugem em assoalho, caixas de roda e chapéu de napoleão descrita no bloco do Fusca clássico.',
  },
  {
    severity: 'WARN',
    title: 'Peças específicas da série 1993-1996 mais escassas que a peça "genérica" de Fusca',
    body: 'Itens de acabamento e alguns componentes atualizados (disco de freio dianteiro, suspensão) são específicos dessa leva de produção — nem sempre a peça vendida como "peça de Fusca" na loja de esquina serve. Pesquise em fóruns e clubes especializados antes de comprar.',
  },
  {
    severity: 'WARN',
    title: 'Cuidados do motor a ar do Fusca clássico valem sem exceção',
    body: 'Correia do ventilador, platinado (ou eventual atualização de ignição), vazamento pelos retentores e necessidade de oficina especializada em motor a ar — todos os pontos de atenção do Fusca clássico se aplicam integralmente ao Fusca Itamar, já que o motor é essencialmente o mesmo.',
  },
]

const MANUTENCAO_FUSCA_ITAMAR: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Fusca Itamar — base do Fusca clássico + freio a disco dianteiro',
    body: 'Siga o cronograma mecânico completo do Fusca clássico (óleo, correia do ventilador, ignição, câmbio/diferencial, inspeção de ferrugem). Itens adicionais específicos desta versão: 10.000 km — Inspeção de pastilhas e disco de freio dianteiro (item que o Fusca clássico não tem). | Anual — Fluido de freio (troca por tempo, não só por km, com atenção redobrada pelo sistema misto disco/tambor).',
  },
]

// ─── New Beetle (1999-2011) ────────────────────────────────────────────────

const MACETES_NEW_BEETLE: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 2.0 8V (família EA113) — o mesmo bloco do Golf/Polo da época',
    body: 'O New Beetle vendido no Brasil usa o motor 2.0 8V a gasolina da família EA113, o mesmo bloco (com variações) usado no Golf 4 e em outros modelos VW do período. Isso significa que peças de motor, apesar do carro em si ser relativamente raro nas ruas, costumam ser mais fáceis de achar do que se imagina — procure também por peça de "Golf" ou "Polo 2.0" da mesma geração.',
  },
  {
    severity: 'OK',
    title: 'Carro totalmente importado — peça de carroceria/acabamento específica pode demorar mais',
    body: 'Diferente do motor (compartilhado com modelos nacionais), peças de carroceria, acabamento interno e itens exclusivos do design retrô do New Beetle não têm equivalente em outros modelos VW do Brasil — foi um carro 100% importado do México. Para esses itens específicos, pesquise com antecedência e considere prazos de entrega maiores.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático evoluiu ao longo da produção — confirme a versão exata do seu carro',
    body: 'As primeiras unidades vendidas no Brasil trouxeram câmbio automático de 4 marchas; ao longo da produção (facelift em meados dos anos 2000) a transmissão automática foi atualizada. Antes de orçar serviço ou peça de câmbio, confirme com a concessionária/oficina especializada qual versão exata equipa seu carro pelo chassi.',
  },
  {
    severity: 'OK',
    title: 'Design retrô, mecânica convencional — procure oficina especializada em VW linha EA113/Golf 4',
    body: 'Apesar da carroceria e do design serem únicos, a base mecânica do New Beetle é a mesma da plataforma do Golf 4 da época. Uma oficina que atende bem Golf/Polo dessa geração normalmente resolve bem o New Beetle também — não é necessário procurar apenas oficina "de New Beetle".',
  },
]

const PROBLEMAS_NEW_BEETLE: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Falhas na bobina de ignição — motor "engasgando" e marcha lenta instável',
    body: 'É uma das queixas mais recorrentes do motor 2.0 8V dessa geração: bobina de ignição com defeito causa falha de ignição, motor "engasgando", trepidação e aumento de consumo. Se notar esses sintomas, principalmente entre 60.000 e 90.000 km, considere a bobina como suspeita inicial antes de investigar problemas mais complexos.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático de 4 marchas das primeiras unidades — lentidão e travamentos ocasionais',
    body: 'Proprietários das unidades mais antigas relatam certa lentidão na resposta das trocas de marcha e, em casos esporádicos, travamentos momentâneos do câmbio automático de 4 marchas. Não ignore sintomas de tranco ou demora anormal na troca — a manutenção preventiva do fluido de câmbio ajuda a minimizar o problema.',
  },
  {
    severity: 'WARN',
    title: 'Ruído na suspensão traseira sem solução definitiva simples',
    body: 'Há relatos recorrentes de ruído vindo da suspensão traseira que nem sempre desaparece após a primeira tentativa de reparo. Vale insistir com a oficina na identificação exata da origem do barulho (buchas, amortecedor, batente) antes de trocar peça por peça.',
  },
  {
    severity: 'WARN',
    title: 'Problemas elétricos diversos são queixa recorrente entre proprietários',
    body: 'Além da bobina de ignição, proprietários relatam problemas elétricos pontuais em itens de conforto (vidro elétrico, travas, comandos). Não costuma ser um único defeito crônico específico, mas vale testar todos os itens elétricos com atenção na hora de comprar um usado.',
  },
]

const MANUTENCAO_NEW_BEETLE: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma New Beetle (motor 2.0 8V EA113)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão (atenção ao ruído traseiro relatado) e níveis de fluido. | 20.000-30.000 km — Jogo de velas. | 20.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Kit de correia dentada completo com tensor e bomba d\'água (item crítico, motor interferente). | 60.000 km — Inspeção preventiva da bobina de ignição, ponto de falha conhecido dessa geração. | 60.000-80.000 km — Fluido do câmbio automático (conforme a versão). | A cada revisão — Testar itens elétricos de conforto (vidro, travas).',
  },
]

// ─── Calibragem de pneus ────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Fusca',
    yearFrom: 1959,
    yearTo: 1986,
    tireSize: '5.60-15 (pneu diagonal, até fim dos anos 1970) · 165 R15 ou 155 R15 (radial, a partir dos anos 1980)',
    frontPsi: 18,
    rearPsi: 28,
    frontPsiLoad: 20,
    rearPsiLoad: 30,
    sparePsi: 30,
    notes: 'Valor histórico de referência da época — pneu diagonal pede pressão um pouco mais baixa que radial (nesse caso considere 20/28). A pressão exata varia por motorização e ano; confirme na etiqueta original da coluna da porta ou manual do proprietário, quando disponíveis.',
  },
  {
    modelName: 'Fusca',
    yearFrom: 1993,
    yearTo: 1996,
    tireSize: '165 R15 (radial)',
    frontPsi: 20,
    rearPsi: 28,
    frontPsiLoad: 22,
    rearPsiLoad: 30,
    sparePsi: 30,
    notes: 'Referência para pneu radial padrão de fábrica da série Itamar. Confirme sempre na etiqueta da coluna da porta ou manual do proprietário.',
  },
  {
    modelName: 'New Beetle',
    yearFrom: 1999,
    yearTo: 2011,
    tireSize: '205/55 R16 (aro padrão da maioria das versões vendidas no Brasil)',
    frontPsi: 30,
    rearPsi: 32,
    frontPsiLoad: 32,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Estimativa razoável para o padrão do motor 2.0/câmbio dessa plataforma (Golf 4) — confirme sempre o valor exato na etiqueta da coluna da porta do motorista ou no manual do proprietário, pois pode variar conforme a versão/ano.',
  },
]

// ─── Itens de manutenção programada ─────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Fusca', yearFrom: 1959, yearTo: 1986, component: 'Óleo do motor + filtro', intervalKm: 3000, intervalMonths: 6, notes: 'Motor a ar antigo pede intervalo bem mais curto que carro moderno.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Fusca', yearFrom: 1959, yearTo: 1986, component: 'Correia do ventilador — inspeção e troca preventiva', intervalKm: 10000, intervalMonths: 12, notes: 'Motor refrigerado a ar depende exclusivamente dela — arrebentar causa superaquecimento rápido.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Fusca', yearFrom: 1959, yearTo: 1986, component: 'Platinado, condensador e velas', intervalKm: 10000, intervalMonths: 12, notes: 'Ignição por platinado — desgaste desregula o ponto e pode impedir a partida.', priority: 'HIGH', order: 2 },
  { modelName: 'Fusca', yearFrom: 1959, yearTo: 1986, component: 'Ajuste das lonas de freio a tambor', intervalKm: 10000, intervalMonths: 12, notes: 'Freio a tambor nas quatro rodas na maior parte da produção original.', priority: 'HIGH', order: 3 },
  { modelName: 'Fusca', yearFrom: 1959, yearTo: 1986, component: 'Folga do cabo de embreagem', intervalKm: 10000, intervalMonths: null, notes: 'Item barato, mantenha reserva.', priority: 'LOW', order: 4 },
  { modelName: 'Fusca', yearFrom: 1959, yearTo: 1986, component: 'Óleo do câmbio/diferencial', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'Fusca', yearFrom: 1959, yearTo: 1986, component: 'Inspeção estrutural de ferrugem (assoalho, caixas de roda, chapéu de napoleão)', intervalKm: null, intervalMonths: 12, notes: 'Maior risco de segurança em Fusca antigo — não adie.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Fusca', yearFrom: 1959, yearTo: 1986, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 7 },

  { modelName: 'Fusca', yearFrom: 1993, yearTo: 1996, component: 'Óleo do motor + filtro', intervalKm: 3000, intervalMonths: 6, notes: 'Mesmo motor 1.6 a ar do fim da produção original.', priority: 'CRITICAL', order: 8 },
  { modelName: 'Fusca', yearFrom: 1993, yearTo: 1996, component: 'Correia do ventilador — inspeção e troca preventiva', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 9 },
  { modelName: 'Fusca', yearFrom: 1993, yearTo: 1996, component: 'Platinado, condensador e velas', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'Fusca', yearFrom: 1993, yearTo: 1996, component: 'Pastilhas e disco de freio dianteiro', intervalKm: 10000, intervalMonths: null, notes: 'Item novo em relação ao Fusca clássico — freio a disco só nas dianteiras.', priority: 'HIGH', order: 11 },
  { modelName: 'Fusca', yearFrom: 1993, yearTo: 1996, component: 'Inspeção estrutural de ferrugem', intervalKm: null, intervalMonths: 12, notes: 'Mesma vulnerabilidade estrutural do Fusca clássico.', priority: 'CRITICAL', order: 12 },
  { modelName: 'Fusca', yearFrom: 1993, yearTo: 1996, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: 'Sistema misto disco/tambor — atenção redobrada.', priority: 'HIGH', order: 13 },

  { modelName: 'New Beetle', yearFrom: 1999, yearTo: 2011, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.0 8V EA113.', priority: 'CRITICAL', order: 0 },
  { modelName: 'New Beetle', yearFrom: 1999, yearTo: 2011, component: 'Kit de correia dentada (com tensor e bomba d\'água)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente — não estique o intervalo.', priority: 'CRITICAL', order: 1 },
  { modelName: 'New Beetle', yearFrom: 1999, yearTo: 2011, component: 'Bobina de ignição — inspeção preventiva', intervalKm: 60000, intervalMonths: null, notes: 'Ponto de falha conhecido dessa geração do motor 2.0.', priority: 'MEDIUM', order: 2 },
  { modelName: 'New Beetle', yearFrom: 1999, yearTo: 2011, component: 'Jogo de velas', intervalKm: 30000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'New Beetle', yearFrom: 1999, yearTo: 2011, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'New Beetle', yearFrom: 1999, yearTo: 2011, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'New Beetle', yearFrom: 1999, yearTo: 2011, component: 'Fluido do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Confirme a versão exata (4 marchas ou atualizada) antes do serviço.', priority: 'HIGH', order: 6 },
  { modelName: 'New Beetle', yearFrom: 1999, yearTo: 2011, component: 'Suspensão traseira — inspeção de ruído', intervalKm: 20000, intervalMonths: null, notes: 'Queixa recorrente entre proprietários; identifique a origem exata antes de trocar peça.', priority: 'MEDIUM', order: 7 },
  { modelName: 'New Beetle', yearFrom: 1999, yearTo: 2011, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Fusca', yearFrom: 1959, yearTo: 1986, MACETES: MACETES_FUSCA_CLASSICO, PROBLEMAS: PROBLEMAS_FUSCA_CLASSICO, MANUTENCAO: MANUTENCAO_FUSCA_CLASSICO },
  { modelName: 'Fusca', yearFrom: 1993, yearTo: 1996, MACETES: MACETES_FUSCA_ITAMAR, PROBLEMAS: PROBLEMAS_FUSCA_ITAMAR, MANUTENCAO: MANUTENCAO_FUSCA_ITAMAR },
  { modelName: 'New Beetle', yearFrom: 1999, yearTo: 2011, MACETES: MACETES_NEW_BEETLE, PROBLEMAS: PROBLEMAS_NEW_BEETLE, MANUTENCAO: MANUTENCAO_NEW_BEETLE },
]

async function main() {
  console.log('🚗 Seed Volkswagen Fusca + New Beetle...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  const modelNames = Array.from(new Set(BLOCKS.map((b) => b.modelName)))

  for (const modelName of modelNames) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: modelName, brandId: brand.id } },
      update: {},
      create: { name: modelName, brandId: brand.id },
    })
    await prisma.tip.deleteMany({ where: { modelName } })
  }

  let order = 0
  let prevModelName: string | null = null
  for (const block of BLOCKS) {
    if (block.modelName !== prevModelName) {
      order = 0
      prevModelName = block.modelName
    }

    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: order++,
      })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }

  const tireModelNames = Array.from(new Set(TIRE_PRESSURES.map((tp) => tp.modelName)))
  for (const modelName of tireModelNames) {
    await prisma.tirePressure.deleteMany({ where: { modelName } })
  }
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: modelNames } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volkswagen Fusca + New Beetle concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
