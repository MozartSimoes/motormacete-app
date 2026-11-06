// seed-triumph-tiger900.ts — Triumph Tiger 900 (base, GT/GT Pro/GT Aragon, Rally/Rally Pro/Rally Aragon, Alpine e Desert Edition)
// Motor: 888cc DOHC 12v tricilíndrico T-plane crank, arrefecimento líquido, desde 2020 (sucessor da Tiger 800).
// 2020-2023: 95,2 cv (93,9 bhp) @ 8.750 rpm / 87 Nm @ 7.250 rpm. 2024+: motor revisado, 106,5 cv @ 9.500 rpm / 90 Nm @ 6.850 rpm.
// Triumph chegou/expandiu recentemente no Brasil (31 concessionárias) — Tiger 900 é um dos modelos mais vendidos da marca por aqui.
// Execute: pnpm --filter @motormacete/database db:seed:triumph-tiger900
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }

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

// ─── TIGER 900 (BASE — comum a toda a família) ───────────────────────────────
// Motor: 888cc DOHC 12v, 3 cilindros em linha, T-plane crank (ordem de disparo 1-3-2, "big bang" que imita bicilíndrico)
// 2020-2023: 95,2 cv (93,9 bhp) @ 8.750 rpm | 87 Nm @ 7.250 rpm — 2024+: 106,5 cv @ 9.500 rpm | 90 Nm @ 6.850 rpm
// Óleo 10W-40 ~3,1L (motor+filtro) | Vela NGK CR9EIX ×3, gap 0,7mm | Corrente 525 X-ring
// Tanque 20L | Freio DOT 4 | 6 marchas + embreagem assistida (slipper) | Câmbio assistido (quickshifter) de série nas Pro

const TIGER900_BASE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor T-plane crank 888cc: som e vibração de "quase bicilíndrica" — é de fábrica',
    body: 'A Tiger 900 usa um tricilíndrico com virabrequim T-plane (ordem de disparo 1-3-2, intervalos irregulares de 180°-270°-270°), diferente do motor "regular" 120° da antiga Tiger 800. O resultado é um som mais grave e entrega de torque parecida com bicilíndrica em baixa/média rotação, mas com suavidade de tricilíndrico em alta. Se você trocou de uma Tiger 800 ou de um bicilíndrico e sentiu vibração diferente no guidão em torno de 3.000-4.000 rpm, isso é característica de projeto, não defeito. A Triumph chegou com força ao Brasil nos últimos anos e a Tiger 900 é hoje um dos modelos mais vendidos da marca por aqui — vale se familiarizar com essas particularidades do motor antes de estranhar.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 — capacidade ~3,1L (motor + filtro), troca a cada 10.000 km ou 12 meses',
    body: 'A Triumph recomenda óleo 10W-40 sintético/semissintético (Triumph Genuine Oil, Motul 7100/5100 10W-40 ou Castrol Power1 10W-40 são equivalentes aceitos). Capacidade aproximada: 3,1L com troca de filtro (confirme no manual do seu ano, pode variar ligeiramente entre 2020-2023 e o motor revisado 2024+). Serviço básico a cada 10.000 km/12 meses (óleo + filtro); serviço maior a cada 20.000 km/24 meses (inclui velas, filtro de ar e checagem de folga de válvulas). Como a rede Triumph no Brasil ainda é menor que a de Honda/Yamaha, muitos donos preferem fazer a troca de óleo em oficina independente de confiança usando óleo importado equivalente — só confira a especificação JASO/API na embalagem.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EIX ×3 (gap 0,7mm) — troque sempre em trio, cilindro central dá mais trabalho',
    body: 'A Tiger 900 usa três velas iridium NGK CR9EIX, gap de fábrica 0,7mm. Custo aproximado R$ 90-150 cada no Brasil (peça importada). Troque sempre as três juntas — mesmo que só uma esteja com desgaste visível, a diferença de resistência entre uma vela nova e duas usadas causa combustão desigual entre os cilindros. O acesso ao cilindro central é o mais trabalhoso: geralmente exige levantar o tanque de combustível. Planeje a troca de velas junto com a revisão de 20.000 km para não pagar duas vezes a mão de obra de acesso.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 X-ring — lubrifique a cada 500-800 km; kit completo é caro e importado',
    body: 'A transmissão final é por corrente 525 com retentores X-ring (mais duráveis que O-ring comum). Lubrifique a cada 500-800 km ou sempre após chuva/lavagem — spray de corrente específico (Motul C4, Wurth) rende mais que óleo comum e não atrai tanta sujeira. Folga recomendada: 30-40mm no ponto mais apertado com a moto no cavalete central (confirme a medida exata no manual do seu ano, pois há variação entre fontes). Kit relação completo (corrente + pinhão + coroa) é peça de importação e custa consideravelmente mais que em nacionais — programe a troca preventiva antes que a corrente comece a "saltar" no pinhão, o que acelera o desgaste da coroa.',
  },
  {
    severity: 'WARN',
    title: 'Peças ainda escassas no Brasil — rede de concessionárias pequena, planeje prazo de importação',
    body: 'A Triumph expandiu recentemente no Brasil (cerca de 31 concessionárias no país), rede bem menor que a de marcas japonesas consolidadas. Peças específicas (plástico de carenagem, sensores, componentes elétricos) podem levar semanas para chegar via importação. Para peças de desgaste, vale usar itens de mercado: pastilha de freio EBC (compatível com os discos Nissin/Brembo conforme a versão), corrente DID ou RK 525 X-ring, filtro de óleo HifloFiltro equivalente. Para peças originais, o programa "Total Care" da Triumph cobre 2 anos de garantia e assistência 24h — vale registrar o veículo assim que possível.',
  },
  {
    severity: 'WARN',
    title: 'Bateria e conectores: eletrônica sensível (TFT, ECU, quickshifter) exige tensão estável',
    body: 'A Tiger 900 tem um pacote eletrônico denso — display TFT colorido, ECU com múltiplos modos de pilotagem, quickshifter bidirecional (nas versões Pro) e, em modelos mais recentes, radar de ponto cego. Bateria fraca ou conectores oxidados podem causar desde comportamento errático do painel até perda de potência ou o motor "engasgar". Antes de viagens longas, verifique a tensão da bateria (deve ficar acima de 12,4V em repouso, 13,5-14,5V com o motor em marcha a 4.000 rpm) e inspecione visualmente os conectores expostos, especialmente após lavagens com jato de pressão.',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio DOT 4 — troca bienal; discos e pinças variam conforme a versão',
    body: 'Sistema de freio com fluido DOT 4 (Motul RBF ou ATE Azul são boas opções), com troca recomendada a cada 2 anos independente da quilometragem — o fluido absorve umidade e perde ponto de ebulição com o tempo, o que é crítico numa moto pesada (220kg+ em ordem de marcha). Versões base/GT usam pinças Nissin de 2 pistões; versões Pro (GT Pro e Rally Pro) sobem para pinças Brembo Stylema de 4 pistões — mais mordida, mas também mais sensíveis a ar no sistema durante a purga. Sempre purgue das pinças para o reservatório.',
  },
]

const TIGER900_BASE_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Display TFT: tela azul em chuva forte, travamentos e parafusos que folgam',
    body: 'Problema bem documentado em fóruns internacionais (Triumph Rat, Tiger800.co.uk): o display TFT de 5 polegadas pode apresentar tela azul/corrompida em chuva intensa, travamentos ocasionais e, em alguns casos, os parafusos de fixação do display folgam com o tempo, causando mau contato. Causas reportadas: tensão de bateria baixa, pinos de conector com contato ruim, relé de partida com defeito, ou o próprio display danificado. Solução: verificar bateria e conectores primeiro (mais barato), reapertar os parafusos de fixação, e em último caso reflashear a ECU ou substituir o display na concessionária (item de garantia se dentro do prazo).',
  },
  {
    severity: 'WARN',
    title: 'Quickshifter (câmbio assistido) falha ou fica intermitente quando molhado',
    body: 'O quickshifter bidirecional de série nas versões Pro é reportado como sensível à umidade — vários donos relatam que ele "para de funcionar quando molha", geralmente por infiltração de água no sensor de curso da haste de câmbio ou falha de vedação. Sintoma: trocas de marcha que passam a exigir embreagem manual mesmo com o sistema ativado. A Triumph reconhece o problema e a substituição costuma ser feita em garantia — leve à concessionária ao primeiro sinal de intermitência, antes que o prazo de garantia expire.',
  },
  {
    severity: 'WARN',
    title: 'Moto "engasga" ou desliga em modo chuva ("Rain") ou ao reduzir marcha',
    body: 'Relatos de motor que morre durante a condução, mais comum no modo de pilotagem "Rain" ou ao fazer reduções de marcha. Causas apontadas pela comunidade: erro de software da ECU, tensão de bateria baixa, bicos injetores sujos, ou problema no circuito de marcha lenta. Primeira ação: verificar/atualizar o software da ECU na concessionária (Triumph lançou atualizações corretivas para alguns lotes) e checar a tensão da bateria. Se persistir, limpar os bicos injetores com aditivo de qualidade (Seafoam ou similar) costuma resolver quando a causa é acúmulo de resíduo de combustível.',
  },
  {
    severity: 'WARN',
    title: 'Perda de potência em uso — geralmente ligada a bateria ou conectores, não ao motor',
    body: 'Queda perceptível de desempenho (mais notada em altitude ou velocidade de cruzeiro) tem sido associada, na maioria dos relatos, a causas elétricas: bateria fraca, conectores com mau contato, ou bicos injetores sujos — raramente é problema mecânico do motor em si. Antes de suspeitar de algo mais grave, teste a bateria, inspecione conectores próximos ao chicote principal e considere limpeza de injetores. Combustível de baixa qualidade também é apontado como fator agravante.',
  },
  {
    severity: 'WARN',
    title: 'Recall SRAN 582 (refletor traseiro) — não chegou a ser aplicado no Brasil',
    body: 'Em agosto de 2020 a Triumph abriu o recall SRAN 582 para o refletor vermelho traseiro da Tiger 900, que podia se soltar da carenagem (defeito de fixação/cola). Relatos internacionais descrevem o refletor caindo sozinho durante o uso. Esse recall foi aplicado na maioria dos mercados, mas o Brasil (e a China) ficaram de fora da convocação oficial — se você notar o refletor traseiro solto ou frouxo na sua unidade nacional, vale levar à concessionária para avaliação, já que a peça e o procedimento de fixação são os mesmos.',
  },
]

const TIGER900_BASE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tiger 900: revisão básica a cada 10.000 km, maior a cada 20.000 km',
    body: '1.000 km — Revisão de amaciamento (verificação geral, torque de parafusos, óleo se recomendado pela concessionária). | 10.000 km / 12 meses — Troca de óleo e filtro (10W-40, ~3,1L). Verificar tensão e lubrificação da corrente 525. Inspeção visual de pastilhas de freio e conectores elétricos. | 20.000 km / 24 meses — Serviço maior: troca das 3 velas NGK CR9EIX (gap 0,7mm), troca do filtro de ar, verificação da folga de válvulas, troca de óleo e filtro. Verificar tensão da bateria (13,5-14,5V @ 4.000 rpm). | 30.000 km — Óleo e filtro. Considerar substituição do kit relação (corrente + pinhão + coroa) conforme desgaste. | 40.000 km — Segundo serviço maior: velas, filtro de ar, folga de válvulas novamente. | A cada 2 anos, independente da km — Fluido de freio DOT 4 (frente e trás). Nota: os intervalos exatos de folga de válvulas variam ligeiramente entre o motor 2020-2023 e o motor revisado 2024+ — confirme no manual/addendum específico do seu ano de fabricação.',
  },
]

// ─── TIGER 900 GT / GT PRO / GT ARAGON EDITION ───────────────────────────────
// Rodas fundidas tubeless 19" (F) / 17" (R) — foco rodoviário/asfalto
// Pneu: 100/90-19 (F) · 150/70-17 (R) | PSI solo: 36 (F) / 42 (R)
// Suspensão Showa (GT) ou Marzocchi (GT Pro, eletrônica semi-ativa) — curso mais curto que a Rally

const TIGER900_GT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Rodas fundidas tubeless 19"/17" — conserto de furo simples, sem precisar tirar o pneu',
    body: 'A GT usa rodas fundidas com pneus tubeless (câmara não necessária), diferente da Rally que usa raiadas com câmara. Isso significa que um furo simples de prego pode ser reparado com kit de buchas a quente/frio sem desmontar a roda — útil em viagem. Pneus rodoviários recomendados para essa configuração: Metzeler Tourance Next, Michelin Anakee Adventure ou Pirelli Scorpion Trail II, todos disponíveis no mercado brasileiro em medida 100/90-19 (F) e 150/70-17 (R).',
  },
  {
    severity: 'OK',
    title: 'Suspensão Showa (GT) vs Marzocchi eletrônica (GT Pro): ajuste a pré-carga para bagagem',
    body: 'A GT básica usa suspensão Showa convencional com ajuste manual de pré-carga; a GT Pro (e Aragon Edition) sobe para suspensão semi-ativa Marzocchi (ou Showa eletrônica dependendo do ano), que se auto-ajusta conforme o modo de pilotagem. Em qualquer versão, ao carregar bagagem ou pilotar com garupa, aumente a pré-carga traseira — na GT básica isso é manual (chave/anel), na Pro é feito pelo menu do TFT. Suspensão sem esse ajuste faz o curso trabalhar quase todo no fim do curso, piorando o conforto e acelerando desgaste de buchas.',
  },
  {
    severity: 'OK',
    title: 'Freios: Nissin 2 pistões (GT) vs Brembo Stylema (GT Pro) — mordida mais forte pede purga cuidadosa',
    body: 'A GT básica usa pinças Nissin de 2 pistões; a GT Pro e a Aragon Edition sobem para Brembo Stylema de 4 pistões (a mesma família usada em esportivas). A Stylema tem mordida mais progressiva e forte, mas também é mais sensível a ar residual no sistema — se sentir a alavanca "esponjosa" após qualquer intervenção no sistema de freio, purgue novamente com calma, das pinças para o reservatório. Pastilhas compatíveis de mercado: EBC FA slot específico para o modelo de pinça (confirme o código antes de comprar).',
  },
  {
    severity: 'WARN',
    title: 'Radar de ponto cego (GT Pro recente): limpe os sensores regularmente',
    body: 'Versões mais recentes da GT Pro trazem o sistema de radar de ponto cego (blind spot) integrado ao painel. Os sensores ficam na traseira, próximos à luz de freio, e podem acumular sujeira, lama ou sal (regiões litorâneas) o suficiente para gerar alertas falsos ou parar de detectar veículos. Limpe os sensores com pano úmido a cada lavagem e evite produtos abrasivos na região. Se o sistema parar de funcionar completamente, geralmente é problema de conector solto — verificar antes de cogitar troca do módulo.',
  },
  {
    severity: 'OK',
    title: 'Compatibilidade parcial com peças da Tiger 800: ajuda a contornar a rede de peças menor',
    body: 'Como a Tiger 900 evoluiu diretamente da Tiger 800, alguns componentes de suspensão, parafusos de carenagem e itens de acabamento têm medidas compatíveis entre as gerações — vale perguntar ao mecânico especializado em Triumph antes de esperar semanas por uma peça importada específica da 900. Isso não vale para peças do motor (o 888cc é substancialmente diferente do 800cc), mas ajuda bastante em itens de chassi e carenagem.',
  },
]

const TIGER900_GT_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vedante da bengala dianteira pode vazar após uso intenso ou pavimento ruim',
    body: 'Assim como reportado em outras adventures de peso elevado, o vedante (retentor) da bengala dianteira da GT pode começar a vazar óleo perceptivelmente após uso intenso em pavimento irregular — sintoma: mancha de óleo na parte inferior do tubo interno da bengala, do lado exposto à sujeira. Solução: troca do kit de retentores (vedante + guarda-pó) em oficina especializada em suspensão de moto, geralmente não coberta por garantia por ser item de desgaste.',
  },
  {
    severity: 'WARN',
    title: 'Vibração em alta velocidade: balanceamento das rodas fundidas',
    body: 'Se notar vibração no guidão que aparece especificamente acima de 100-120 km/h e não em rotações específicas do motor, o mais provável é desbalanceamento das rodas fundidas ou desgaste irregular do pneu — não é característica do motor T-plane. Balanceamento pode ser feito em qualquer borracheiro que atenda motos grandes; combine com o rodízio/inspeção de desgaste do pneu traseiro, que tende a se desgastar de forma mais acentuada no centro em uso predominante de estrada.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em parafusos e carenagem em uso litorâneo — comum em todo o segmento',
    body: 'Em regiões litorâneas ou com muito uso de sal na pista (áreas costeiras do Nordeste e Sul do Brasil), parafusos de fixação de carenagem e componentes elétricos expostos podem corroer mais rápido que o esperado para uma moto premium. Prevenção: lavagem regular com água doce após exposição a maresia, e aplicação de spray anticorrosivo (tipo ACF-50) em conectores e parafusos visíveis a cada 2-3 meses nessas regiões.',
  },
]

const TIGER900_GT_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Itens específicos GT/GT Pro além do cronograma base: suspensão e freios Brembo',
    body: 'Além do cronograma padrão da família (óleo a cada 10.000 km, serviço maior a cada 20.000 km), a GT Pro/Aragon Edition com suspensão semi-ativa Marzocchi deve ter os sensores de curso inspecionados a cada revisão maior (20.000 km) — falha nesses sensores faz o sistema cair em modo manual fixo. Pastilhas de freio Brembo Stylema (GT Pro): inspecionar a cada 10.000 km, vida útil média 15.000-20.000 km em uso misto. Sensores do radar de ponto cego: limpeza a cada lavagem, teste funcional a cada revisão.',
  },
]

// ─── TIGER 900 RALLY / RALLY PRO / RALLY ARAGON EDITION ──────────────────────
// Rodas raiadas tubeless 21" (F) / 17" (R) — foco off-road/misto
// Pneu: 90/90-21 (F) · 150/70-17 (R) | PSI solo: 34 (F) / 38 (R) (pneus tipo Scorpion Rally STR/Battlax Adventure)
// Suspensão de curso mais longo (~240mm), protetor de motor (skid plate) de série

const TIGER900_RALLY_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Rodas raiadas tubeless 21"/17" — vantagem rara: resistência off-road com conveniência tubeless',
    body: 'A Rally usa rodas raiadas (spoked) que aceitam pneus tubeless — combinação incomum no segmento, já que a maioria das raiadas exige câmara. Isso une a resistência a impacto das raiadas em terreno irregular com a facilidade de reparo de furo do sistema tubeless. Pneu dianteiro 90/90-21, traseiro 150/70-17. Para uso misto (estrada + terra), pneus tipo Pirelli Scorpion Rally STR ou Metzeler Tourance são bons meio-termo; para off-road mais sério, Bridgestone Battlax Adventure ou Michelin Anakee Wild.',
  },
  {
    severity: 'OK',
    title: 'Pressões mais baixas que a GT — calibre com cuidado conforme o terreno',
    body: 'Por causa do pneu de perfil mais alto e uso fora de asfalto, a Rally roda com pressões solo menores que a GT (aproximadamente 34 PSI dianteiro / 38 PSI traseiro, contra 36/42 da GT — confirme a etiqueta do balanço/manual do seu ano, pois pode variar com o pneu instalado). Em trilha, reduzir ainda mais a pressão (dentro do limite do fabricante do pneu) melhora a tração, mas lembre de recalibrar para o valor de estrada antes de pegar asfalto em velocidade — pressão baixa demais em rodovia gera calor excessivo e desgaste irregular.',
  },
  {
    severity: 'OK',
    title: 'Suspensão de curso longo (~240mm) — ajuste a pré-carga conforme peso e terreno',
    body: 'A Rally tem curso de suspensão maior que a GT, pensado para absorver irregularidades off-road. Para uso misto no dia a dia (a maioria dos donos brasileiros), vale reduzir um pouco o amortecimento traseiro em relação à configuração "máxima dureza" de fábrica para trilha — melhora o conforto em asfalto ruim sem prejudicar muito o desempenho off-road ocasional. A Rally Pro e a Aragon/Alpine/Desert Edition trazem suspensão semi-ativa que facilita esse ajuste pelo menu do TFT.',
  },
  {
    severity: 'OK',
    title: 'Protetor de motor (skid plate) de série — inspecione após trilha',
    body: 'Diferente de muitas concorrentes que cobram o skid plate como acessório, a Rally já sai de fábrica com proteção robusta do cárter. Depois de uso off-road, vale inspecionar se a fixação não afrouxou e se não há amassados que possam pressionar contra o cárter do motor. Aproveite para verificar também os protetores de mão (handguards) e o para-lama alto dianteiro, que recebem impacto direto de pedras em trilha.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: limpeza mais frequente em uso off-road com poeira',
    body: 'Se você usa a Rally regularmente em estradas de terra ou trilhas, reduza o intervalo de inspeção do filtro de ar — poeira fina satura o elemento bem antes do intervalo padrão de 20.000 km da família. Inspecione a cada 5.000-8.000 km em uso off-road frequente e limpe/substitua conforme necessário. Um filtro saturado por poeira reduz potência e, em casos extremos, deixa passar partículas abrasivas para dentro do motor.',
  },
  {
    severity: 'WARN',
    title: 'Peso elevado (220kg+) em baixa velocidade off-road exige técnica, não força',
    body: 'A Rally Pro em ordem de marcha passa de 220kg — bem mais pesada que uma trail média. Em trechos técnicos de baixa velocidade, isso exige técnica (peso no estribo de fora da curva, embreagem/freio traseiro dosados) em vez de tentar segurar a moto na força quando ela começa a pender. Quedas em baixa velocidade são praticamente inevitáveis para quem começa no off-road com essa moto — considere protetores de motor, alavancas dobráveis e protetor de mão antes de sair da trilha batida.',
  },
]

const TIGER900_RALLY_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vedante de bengala em uso off-road intenso — desgaste mais rápido que na GT',
    body: 'Pela natureza do uso (impacto maior, mais poeira/lama), o vedante da bengala dianteira da Rally tende a exigir atenção mais cedo que na GT. Sintoma: óleo escuro na parte inferior do tubo, geralmente aparecendo primeiro do lado mais exposto à sujeira. Limpe a bengala após cada saída off-road (pano + querosene nas hastes) para prolongar a vida do vedante — sujeira acumulada na haste é o que corta o retentor por dentro a cada curso da suspensão.',
  },
  {
    severity: 'WARN',
    title: 'Raios (spokes) podem afrouxar após trilha pesada — inspecione a tensão',
    body: 'Rodas raiadas, mesmo sendo tubeless, podem ter raios que afrouxam gradualmente com o impacto repetido de trilhas mais exigentes. Sintoma: leve folga perceptível ao girar a roda no ar e apertar os raios com a mão, ou ruído metálico sutil em buracos. Recomenda-se verificar a tensão dos raios a cada 3.000-5.000 km de uso off-road intenso, ou imediatamente após uma queda — raio solto que passa despercebido pode evoluir para quebra e desalinhamento da roda.',
  },
  {
    severity: 'WARN',
    title: '"Engasgo"/desligamento no modo chuva ou reduções — mesmo problema documentado da família',
    body: 'O mesmo problema relatado para a família Tiger 900 (motor que morre durante a condução, mais comum no modo "Rain" ou em reduções de marcha) se aplica à Rally. Verificar tensão de bateria e considerar atualização de software da ECU na concessionária são os primeiros passos recomendados pela comunidade antes de suspeitar de problema mecânico mais sério.',
  },
  {
    severity: 'WARN',
    title: 'Altura do assento e peso dificultam recuperação de queda sozinho em trilha',
    body: 'Com assento alto (por volta de 850-875mm, ajustável) e peso elevado, erguer a Rally sozinho após uma queda em terreno irregular é fisicamente exigente — vale aprender a técnica correta (de costas para a moto, usando as pernas) antes de sair sozinho em trilhas isoladas. Isso não é um defeito da moto, mas uma característica de categoria que pega muitos donos de primeira viagem em adventures grandes de surpresa.',
  },
]

const TIGER900_RALLY_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Itens específicos Rally/Rally Pro além do cronograma base: rodas raiadas e suspensão off-road',
    body: 'Além do cronograma padrão da família (óleo a cada 10.000 km, serviço maior a cada 20.000 km), a Rally exige: verificação de tensão dos raios a cada 3.000-5.000 km em uso off-road intenso (ou após qualquer queda). Filtro de ar: inspeção a cada 5.000-8.000 km se uso off-road frequente (mais cedo que os 20.000 km padrão da família em uso majoritariamente asfáltico). Vedantes de bengala: inspeção visual a cada lavagem pós-trilha. Protetor de motor (skid plate) e handguards: inspecionar fixação após cada saída off-road.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────
// Hierarquia: "TIGER 900" casa com TODAS as variantes FIPE (substring). "TIGER 900 GT" casa com
// GT, GT PRO e GT ARAGON Edition. "TIGER 900 RALLY" casa com RALLY, RALLY PRO e RALLY ARAGON Edition.
// ALPINE e DESERT Edition (baseadas mecanicamente na Rally Pro) recebem bloco próprio reaproveitando
// o conteúdo RALLY, pois seus nomes FIPE não contêm a substring "RALLY".

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'TIGER 900',
    yearFrom: 2020,
    yearTo: null,
    MACETES: TIGER900_BASE_MACETES,
    PROBLEMAS: TIGER900_BASE_PROBLEMAS,
    MANUTENCAO: TIGER900_BASE_MANUTENCAO,
  },
  {
    modelName: 'TIGER 900 GT',
    yearFrom: 2020,
    yearTo: null,
    MACETES: TIGER900_GT_MACETES,
    PROBLEMAS: TIGER900_GT_PROBLEMAS,
    MANUTENCAO: TIGER900_GT_MANUTENCAO,
  },
  {
    modelName: 'TIGER 900 RALLY',
    yearFrom: 2020,
    yearTo: null,
    MACETES: TIGER900_RALLY_MACETES,
    PROBLEMAS: TIGER900_RALLY_PROBLEMAS,
    MANUTENCAO: TIGER900_RALLY_MANUTENCAO,
  },
  {
    modelName: 'TIGER 900 ALPINE',
    yearFrom: 2024,
    yearTo: null,
    MACETES: TIGER900_RALLY_MACETES,
    PROBLEMAS: TIGER900_RALLY_PROBLEMAS,
    MANUTENCAO: TIGER900_RALLY_MANUTENCAO,
  },
  {
    modelName: 'TIGER 900 DESERT',
    yearFrom: 2024,
    yearTo: null,
    MACETES: TIGER900_RALLY_MACETES,
    PROBLEMAS: TIGER900_RALLY_PROBLEMAS,
    MANUTENCAO: TIGER900_RALLY_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'TIGER 900',
    yearFrom: 2020, yearTo: null,
    tireSize: '100/90-19 (F) · 150/70-17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Rodas fundidas tubeless, mesma configuração da GT. Solo: F 36 / R 42 PSI a frio. Não há especificação oficial separada para uso com garupa/bagagem nas fontes consultadas — confirme na etiqueta do braço da suspensão ou manual do seu ano antes de viagens carregadas.',
  },
  {
    modelName: 'TIGER 900 GT',
    yearFrom: 2020, yearTo: null,
    tireSize: '100/90-19 (F) · 150/70-17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo: F 36 / R 42 PSI a frio (2,48 / 2,89 bar). Rodas fundidas tubeless. Pneus recomendados: Metzeler Tourance Next, Michelin Anakee Adventure, Pirelli Scorpion Trail II. Vale nunca confiar apenas no TPMS do painel — meça sempre com calibrador físico.',
  },
  {
    modelName: 'TIGER 900 RALLY',
    yearFrom: 2020, yearTo: null,
    tireSize: '90/90-21 (F) · 150/70-17 (R)',
    frontPsi: 34, rearPsi: 38,
    frontPsiLoad: 34, rearPsiLoad: 38,
    notes: 'Solo: F 34 / R 38 PSI a frio (valor aproximado para pneus tipo Pirelli Scorpion Rally STR/Bridgestone Battlax Adventure — pode variar conforme o pneu instalado, confirme na etiqueta do braço da suspensão). Rodas raiadas tubeless. Em trilha, reduza a pressão dentro do limite do fabricante do pneu e recalibre para o valor de estrada antes de retomar o asfalto.',
  },
  {
    modelName: 'TIGER 900 ALPINE',
    yearFrom: 2024, yearTo: null,
    tireSize: '90/90-21 (F) · 150/70-17 (R)',
    frontPsi: 34, rearPsi: 38,
    frontPsiLoad: 34, rearPsiLoad: 38,
    notes: 'Edição especial baseada mecanicamente na Rally Pro — mesma configuração de rodas raiadas 21"/17" e mesma calibragem solo (F 34 / R 38 PSI).',
  },
  {
    modelName: 'TIGER 900 DESERT',
    yearFrom: 2024, yearTo: null,
    tireSize: '90/90-21 (F) · 150/70-17 (R)',
    frontPsi: 34, rearPsi: 38,
    frontPsiLoad: 34, rearPsiLoad: 38,
    notes: 'Edição especial baseada mecanicamente na Rally Pro, com pacote voltado a uso off-road (estética/acessórios). Mesma configuração de rodas raiadas 21"/17" e mesma calibragem solo (F 34 / R 38 PSI) — considere pneus mais agressivos (Michelin Anakee Wild) se o uso off-road for frequente.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // TIGER 900 (base — comum a toda a família)
  { modelName: 'TIGER 900', yearFrom: 2020, yearTo: null, component: 'Óleo 10W-40 + filtro (~3,1L)', intervalKm: 10000, intervalMonths: 12, notes: 'Triumph Genuine Oil, Motul 7100/5100 ou Castrol Power1 10W-40. Confirme capacidade exata para o ano do motor (2020-2023 vs 2024+).', priority: 'HIGH', order: 1 },
  { modelName: 'TIGER 900', yearFrom: 2020, yearTo: null, component: 'Velas NGK CR9EIX ×3 (gap 0,7mm)', intervalKm: 20000, intervalMonths: 24, notes: 'Trocar sempre em trio. Acesso ao cilindro central exige levantar o tanque.', priority: 'MEDIUM', order: 2 },
  { modelName: 'TIGER 900', yearFrom: 2020, yearTo: null, component: 'Lubrificação da corrente 525 X-ring', intervalKm: 700, intervalMonths: null, notes: 'Spray específico (Motul C4, Wurth). Sempre após chuva/lavagem. Folga aproximada 30-40mm.', priority: 'HIGH', order: 3 },
  { modelName: 'TIGER 900', yearFrom: 2020, yearTo: null, component: 'Kit relação 525 (corrente + pinhão + coroa)', intervalKm: 25000, intervalMonths: null, notes: 'Peça de importação — programar substituição preventiva antes de saltar no pinhão.', priority: 'HIGH', order: 4 },
  { modelName: 'TIGER 900', yearFrom: 2020, yearTo: null, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: 24, notes: 'Reduzir intervalo se uso frequente em estrada de terra/poeira.', priority: 'MEDIUM', order: 5 },
  { modelName: 'TIGER 900', yearFrom: 2020, yearTo: null, component: 'Folga de válvulas — verificação', intervalKm: 20000, intervalMonths: 24, notes: 'Intervalo pode variar entre motor 2020-2023 e motor revisado 2024+ — confirme addendum do manual.', priority: 'HIGH', order: 6 },
  { modelName: 'TIGER 900', yearFrom: 2020, yearTo: null, component: 'Fluido de freio DOT 4 (frente e trás)', intervalKm: null, intervalMonths: 24, notes: 'Purgar das pinças para o reservatório. Motul RBF ou ATE Azul.', priority: 'HIGH', order: 7 },
  { modelName: 'TIGER 900', yearFrom: 2020, yearTo: null, component: 'Bateria — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'Mínimo 12,4V em repouso; 13,5-14,5V @ 4.000 rpm com motor ligado. Eletrônica sensível (TFT/ECU) exige tensão estável.', priority: 'MEDIUM', order: 8 },
  { modelName: 'TIGER 900', yearFrom: 2020, yearTo: null, component: 'Inspeção de conectores elétricos e chicote', intervalKm: null, intervalMonths: 12, notes: 'Especialmente após lavagens com jato de pressão. Aplicar spray dielétrico/anticorrosivo em regiões litorâneas.', priority: 'LOW', order: 9 },
  { modelName: 'TIGER 900', yearFrom: 2020, yearTo: null, component: 'Pastilhas de freio — inspeção', intervalKm: 10000, intervalMonths: null, notes: 'Varia conforme pinça (Nissin 2 pistões na base/GT, Brembo Stylema 4 pistões nas Pro).', priority: 'MEDIUM', order: 10 },

  // TIGER 900 GT / GT PRO / GT ARAGON EDITION
  { modelName: 'TIGER 900 GT', yearFrom: 2020, yearTo: null, component: 'Vedante de bengala dianteira — inspeção', intervalKm: 15000, intervalMonths: null, notes: 'Verificar mancha de óleo na parte inferior do tubo interno após uso em pavimento ruim.', priority: 'MEDIUM', order: 1 },
  { modelName: 'TIGER 900 GT', yearFrom: 2020, yearTo: null, component: 'Balanceamento das rodas fundidas', intervalKm: 10000, intervalMonths: null, notes: 'Se houver vibração acima de 100-120 km/h. Combine com inspeção de desgaste do pneu traseiro.', priority: 'LOW', order: 2 },
  { modelName: 'TIGER 900 GT', yearFrom: 2020, yearTo: null, component: 'Sensores do radar de ponto cego — limpeza (GT Pro recente)', intervalKm: null, intervalMonths: 3, notes: 'Sensores na traseira acumulam sujeira/lama/sal. Limpar a cada lavagem.', priority: 'LOW', order: 3 },
  { modelName: 'TIGER 900 GT', yearFrom: 2020, yearTo: null, component: 'Sensores de curso da suspensão semi-ativa (GT Pro/Aragon)', intervalKm: 20000, intervalMonths: 24, notes: 'Falha faz o sistema cair em modo manual fixo. Inspecionar junto com o serviço maior.', priority: 'MEDIUM', order: 4 },
  { modelName: 'TIGER 900 GT', yearFrom: 2020, yearTo: null, component: 'Pastilhas Brembo Stylema (GT Pro/Aragon)', intervalKm: 10000, intervalMonths: null, notes: 'Vida útil média 15.000-20.000 km em uso misto. EBC compatível disponível no mercado.', priority: 'MEDIUM', order: 5 },

  // TIGER 900 RALLY / RALLY PRO / RALLY ARAGON EDITION
  { modelName: 'TIGER 900 RALLY', yearFrom: 2020, yearTo: null, component: 'Tensão dos raios (spokes) — verificação', intervalKm: 4000, intervalMonths: null, notes: 'Uso off-road intenso pode afrouxar raios. Verificar também após qualquer queda.', priority: 'HIGH', order: 1 },
  { modelName: 'TIGER 900 RALLY', yearFrom: 2020, yearTo: null, component: 'Filtro de ar — inspeção em uso off-road', intervalKm: 6000, intervalMonths: null, notes: 'Poeira satura o elemento bem antes dos 20.000 km padrão da família em uso frequente fora de asfalto.', priority: 'MEDIUM', order: 2 },
  { modelName: 'TIGER 900 RALLY', yearFrom: 2020, yearTo: null, component: 'Vedante de bengala dianteira — inspeção pós-trilha', intervalKm: null, intervalMonths: null, notes: 'Limpar hastes com pano + querosene após cada saída off-road para prolongar vida do retentor.', priority: 'MEDIUM', order: 3 },
  { modelName: 'TIGER 900 RALLY', yearFrom: 2020, yearTo: null, component: 'Skid plate e handguards — fixação', intervalKm: null, intervalMonths: null, notes: 'Inspecionar após cada saída off-road — verificar amassados que possam pressionar o cárter.', priority: 'MEDIUM', order: 4 },
  { modelName: 'TIGER 900 RALLY', yearFrom: 2020, yearTo: null, component: 'Rolamentos de roda — inspeção', intervalKm: 20000, intervalMonths: 24, notes: 'Uso off-road acelera desgaste por exposição a poeira/água. Verificar folga junto ao serviço maior.', priority: 'MEDIUM', order: 5 },

  // TIGER 900 ALPINE Edition (baseada na Rally Pro — mesmos itens)
  { modelName: 'TIGER 900 ALPINE', yearFrom: 2024, yearTo: null, component: 'Tensão dos raios (spokes) — verificação', intervalKm: 4000, intervalMonths: null, notes: 'Uso off-road intenso pode afrouxar raios. Verificar também após qualquer queda.', priority: 'HIGH', order: 1 },
  { modelName: 'TIGER 900 ALPINE', yearFrom: 2024, yearTo: null, component: 'Filtro de ar — inspeção em uso off-road', intervalKm: 6000, intervalMonths: null, notes: 'Poeira satura o elemento bem antes dos 20.000 km padrão da família em uso frequente fora de asfalto.', priority: 'MEDIUM', order: 2 },
  { modelName: 'TIGER 900 ALPINE', yearFrom: 2024, yearTo: null, component: 'Vedante de bengala dianteira — inspeção pós-trilha', intervalKm: null, intervalMonths: null, notes: 'Limpar hastes com pano + querosene após cada saída off-road para prolongar vida do retentor.', priority: 'MEDIUM', order: 3 },
  { modelName: 'TIGER 900 ALPINE', yearFrom: 2024, yearTo: null, component: 'Skid plate e handguards — fixação', intervalKm: null, intervalMonths: null, notes: 'Inspecionar após cada saída off-road — verificar amassados que possam pressionar o cárter.', priority: 'MEDIUM', order: 4 },
  { modelName: 'TIGER 900 ALPINE', yearFrom: 2024, yearTo: null, component: 'Rolamentos de roda — inspeção', intervalKm: 20000, intervalMonths: 24, notes: 'Uso off-road acelera desgaste por exposição a poeira/água. Verificar folga junto ao serviço maior.', priority: 'MEDIUM', order: 5 },

  // TIGER 900 DESERT Edition (baseada na Rally Pro — mesmos itens)
  { modelName: 'TIGER 900 DESERT', yearFrom: 2024, yearTo: null, component: 'Tensão dos raios (spokes) — verificação', intervalKm: 4000, intervalMonths: null, notes: 'Uso off-road intenso pode afrouxar raios. Verificar também após qualquer queda.', priority: 'HIGH', order: 1 },
  { modelName: 'TIGER 900 DESERT', yearFrom: 2024, yearTo: null, component: 'Filtro de ar — inspeção em uso off-road', intervalKm: 6000, intervalMonths: null, notes: 'Poeira satura o elemento bem antes dos 20.000 km padrão da família em uso frequente fora de asfalto.', priority: 'MEDIUM', order: 2 },
  { modelName: 'TIGER 900 DESERT', yearFrom: 2024, yearTo: null, component: 'Vedante de bengala dianteira — inspeção pós-trilha', intervalKm: null, intervalMonths: null, notes: 'Limpar hastes com pano + querosene após cada saída off-road para prolongar vida do retentor.', priority: 'MEDIUM', order: 3 },
  { modelName: 'TIGER 900 DESERT', yearFrom: 2024, yearTo: null, component: 'Skid plate e handguards — fixação', intervalKm: null, intervalMonths: null, notes: 'Inspecionar após cada saída off-road — verificar amassados que possam pressionar o cárter.', priority: 'MEDIUM', order: 4 },
  { modelName: 'TIGER 900 DESERT', yearFrom: 2024, yearTo: null, component: 'Rolamentos de roda — inspeção', intervalKm: 20000, intervalMonths: 24, notes: 'Uso off-road acelera desgaste por exposição a poeira/água. Verificar folga junto ao serviço maior.', priority: 'MEDIUM', order: 5 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Triumph Tiger 900 (base / GT / Rally / Alpine / Desert)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'TRIUMPH', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'TRIUMPH', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
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
        yearFrom:  null,
        yearTo:    null,
        order: idx,
      })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({
      data: {
        modelName: tp.modelName,
        yearFrom: tp.yearFrom,
        yearTo: tp.yearTo,
        tireSize: tp.tireSize,
        frontPsi: tp.frontPsi,
        rearPsi: tp.rearPsi,
        frontPsiLoad: tp.frontPsiLoad,
        rearPsiLoad: tp.rearPsiLoad,
        notes: tp.notes,
      },
    })
    console.log(`  🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map((b) => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Triumph Tiger 900 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
