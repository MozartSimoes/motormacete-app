// seed-royal-enfield-650-twins.ts — Royal Enfield linha 650 Twin (motor bicilíndrico paralelo 648cc)
// Classic 650, Continental GT 650 (+ 120 Year Edition), Interceptor 650 (+ 120 Year Edition),
// Interceptor Bear 650, Shotgun 650 e Super Meteor 650.
// Todas compartilham o mesmo motor-base 648cc SOHC 8v, refrigerado a ar+óleo, injeção eletrônica,
// ~47 cv @ 7.100-7.250 rpm / ~52 Nm @ 5.200-5.650 rpm, embreagem multidisco a óleo com slipper clutch,
// câmbio 6 marchas — mas cada família tem geometria, ergonomia, suspensão, pneus e propósito diferentes.
// Linha mais nova e mais vendida de médio/alto padrão da Royal Enfield no Brasil (chegada: GT/Interceptor
// em 2019, Super Meteor 2023, Shotgun e Interceptor Bear 2024/2025, Classic 650 2025/2026).
// Nomes de modelName escolhidos para casar via substring (word-boundary) com as strings exatas da API
// FIPE (parallelum.com.br/fipe/api/v1/motos/marcas/192/modelos), sem misturar famílias diferentes:
//   - "Classic 650"              -> casa com "Classic 650 Base/Mid/Top"
//   - "Continental GT 650"       -> casa com "Continental GT 650", "Continental GT 650 Custom ",
//                                    "Continental GT 650 Special Colorway "
//   - "Continental GT 120 Year Edition" -> casa exclusivamente com "Continental GT 120 Year Edition 650"
//   - "Interceptor 650"          -> casa com "Interceptor 650 Custom ", "Interceptor 650 Special Colorway ",
//                                    "Interceptor 650 Standard" (NÃO casa com "Interceptor Bear 650..." pois
//                                    "Bear" quebra a contiguidade da substring)
//   - "Interceptor 120 Year Edition" -> casa exclusivamente com "Interceptor 120 Year Edition 650"
//   - "Interceptor Bear 650"     -> casa com "Interceptor Bear 650 Custom /Premium/Top"
//   - "Shotgun 650"              -> casa com "Shotgun 650 Base/Mid/Top"
//   - "Super Meteor 650"         -> casa com "Super Meteor 650 Astral /Celestial /Interstellar"
// Execute: pnpm --filter @motormacete/database db:seed:royal-enfield-650-twins
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

// ═══════════════════════════════════════════════════════════════════════════
// CLASSIC 650 — cruiser retro clássica, lançamento global 2025 (Brasil 2025/2026)
// Motor: 648cc SOHC 8v paralelo-twin, refrigerado a ar+óleo | 46,4 cv @ 7.250 rpm | 51,5 Nm @ 5.650 rpm
// Injeção eletrônica | Câmbio 6 marchas com slipper clutch | Óleo 15W-50 semissintético, ~3,1L
// Velas: 2× (uma por cilindro) gap 0,7-0,8mm | Pneu: 100/90-19 (F) · 140/70-18 (R)
// Corrente 525 | Tanque 14,8L | Freio: disco 320mm (F) + disco 300mm (R), ABS de série (dual-channel)
// Peso: ~243kg | Altura do assento: 800mm | Suspensão: garfo Showa 43mm (120mm curso) + bi-amortecedor
// traseiro (90mm curso) | Substitui/complementa a antiga Classic 500 (motor monocilíndrico 499cc)
// ═══════════════════════════════════════════════════════════════════════════

const CLASSIC650_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 semissintético — 3,1L na troca com filtro; intervalo 5.000 km',
    body: 'O motor 648cc SOHC da Classic 650 pede óleo 15W-50 semissintético API SN/SM ou superior — a própria Royal Enfield recomenda essa viscosidade para o clima tropical (diferente do 10W-50/10W-60 usado em mercados mais frios). Capacidade: cerca de 3,1L incluindo filtro. Marcas disponíveis no Brasil: Motul 7100 15W-50, Motul 300V (para quem roda mais forte), Rock Oil Torquemaster — muitas concessionárias RE já vendem óleo de marca própria co-desenvolvido com a Motul. Intervalo oficial: 5.000 km ou 6 meses, o que vier primeiro. Como a linha 650 ainda é nova no Brasil, não economize na qualidade do óleo — é o item que mais protege o motor bicilíndrico refrigerado a ar.',
  },
  {
    severity: 'OK',
    title: 'Duas velas (uma por cilindro), gap 0,7-0,8mm — troque sempre em par',
    body: 'O motor twin tem uma vela por cilindro, ambas de acesso relativamente fácil na Classic 650 (motor exposto, sem carenagem). Gap recomendado: 0,7-0,8mm. NGK e Bosch são as marcas de referência — modelos iridium (ex. NGK linha IX) duram bem mais e ajudam na partida a frio, compensando o custo maior. Troque sempre as duas ao mesmo tempo: uma vela nova com uma gasta gera combustão desigual entre os cilindros e vibração perceptível no guidão.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 com O-ring — relação de transmissão específica da Classic; não troque por peça de outra família 650',
    body: 'A Classic 650 usa corrente 525 com O-ring. Mesmo compartilhando motor com Interceptor/GT/Shotgun/Super Meteor, a relação final (dentes do pinhão e da coroa) pode variar por família por causa do propósito diferente de cada moto — confirme sempre pelo manual ou pela contagem de dentes antes de comprar kit de relação. Marcas confiáveis disponíveis no Brasil: DID, RK, Vaz Corrente. Lubrifique a cada 500-600 km e verifique a folga (20-30mm no trecho inferior, moto no cavalete central).',
  },
  {
    severity: 'WARN',
    title: 'Rede de concessionárias RE ainda em expansão — planeje peças e revisões com antecedência',
    body: 'A Royal Enfield vem crescendo rápido no Brasil, mas a rede de concessionárias e centros de serviço ainda é bem menor que a de marcas japonesas — em muitos estados há apenas 1-2 pontos autorizados. Para a Classic 650 (modelo mais recente da linha), peças de reposição específicas (tanque, para-lamas, banco) podem ter prazo de importação de semanas em caso de acidente ou dano. Itens de desgaste comuns (velas, filtros, pastilhas, corrente) já são encontrados em lojas de peças para motos importadas nas grandes capitais. Cadastre-se no site oficial (royalenfield.com.br) para localizar o centro de serviço mais próximo e considere agendar revisões com antecedência, especialmente em cidades menores.',
  },
  {
    severity: 'OK',
    title: 'Pneus: 100/90-19 (dianteiro) e 140/70-18 (traseiro) — medidas de cruiser clássica, poucas opções',
    body: 'A Classic 650 usa aro 19" na frente e 18" atrás — medidas típicas de cruiser retro, com menos opções de marca no Brasil que pneus esportivos convencionais (17"). Pirelli Sport Demon e Michelin Anakee (para quem gosta de rodar mais offroad leve) são as referências mais fáceis de achar. CEAT (indiana, parceira da própria Royal Enfield na Índia) também está entrando forte no mercado brasileiro para pneus de moto — vale cotar. Como a disponibilidade regional varia, se for viajar, leve um estepe reserva de câmara (mesmo sendo pneu tubeless) ou pelo menos um kit de reparo.',
  },
  {
    severity: 'OK',
    title: 'Postura ereta e guidão alto: ideal para uso urbano, mas cansa em curvas rápidas por conta do peso',
    body: 'A Classic 650 mantém a filosofia "retro cruiser" com guidão alto e assento baixo (800mm) — ótima ergonomia para cidade e passeios, mas o peso de ~243kg concentrado baixo pede atenção redobrada em manobras de baixa velocidade (estacionar, sair de garagem). Pratique o "peso morto" com a moto ainda desligada antes de rodar em trânsito guiado. Para quem vem de motos mais leves, o maior cuidado é nos primeiros freios D+R combinados — o ABS dual-channel ajuda, mas a inércia da moto é maior que o esperado visualmente.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de papel: troque, não tente lavar — motor a ar/óleo é sensível a poeira',
    body: 'Diferente de motos com filtro de espuma lavável, a linha 650 usa filtro de ar de papel/celulose. Não lave com água ou solventes — isso danifica as fibras e deixa passar poeira fina, que é especialmente prejudicial num motor refrigerado a ar (a poeira interfere na troca de calor pelas aletas do cilindro além de contaminar o óleo). Troque no intervalo do manual (geralmente 10.000-20.000 km) e antecipe a troca se rodar muito em estrada de terra ou cidade com muita poeira.',
  },
  {
    severity: 'WARN',
    title: 'Cromados e peças metálicas: cuide da ferrugem mesmo em moto novinha, principalmente perto do litoral',
    body: 'A Royal Enfield tem histórico conhecido (décadas de reputação, inclusive nos modelos clássicos indianos) de peças cromadas e parafusaria que enferrujam mais rápido que a concorrência japonesa, especialmente perto do mar ou em garagem úmida. Mesmo a Classic 650 sendo novíssima no Brasil, já há relatos de pontos de oxidação leve em parafusos e suportes cromados após poucos meses de uso em cidades litorâneas. Aplique cera ou produto anticorrosivo (tipo Autoglym ou WD-40 Specialist) nas partes cromadas a cada lavagem, e lave a moto (sem jato direto em rolamentos/elétrica) sempre que rodar perto da praia.',
  },
]

const CLASSIC650_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vibração perceptível em faixas específicas de rotação — característica do motor, mas fique atento a piora',
    body: 'O motor bicilíndrico paralelo 648cc tem um contrapeso balanceado, mas ainda assim proprietários relatam vibração mais perceptível em certas faixas de rpm (tipicamente entre 4.500-5.500 rpm) que se propaga para o guidão e os apoia-pés. É esperado em algum grau — mas se a vibração aumentar de forma súbita ou aparecer em rotações diferentes do habitual, verifique o aperto dos coxins do motor no chassi e o balanceamento dos pneus antes de suspeitar de problema interno.',
  },
  {
    severity: 'WARN',
    title: 'Folga/dureza da embreagem logo após a primeira revisão — ajuste é normal, mas fique de olho',
    body: 'É um dos pontos mais relatados por proprietários da linha 650 em fóruns internacionais (Royal Enfield 650 Twins Forum, r/royalenfield): a alavanca de embreagem fica pesada/dura logo após as primeiras centenas de quilômetros, por acomodação do cabo e dos discos novos. Na maioria dos casos resolve com o ajuste simples do cabo (parafuso de regulagem na alavanca ou no motor) feito na revisão de 500-1.000 km. Se a dureza persistir mesmo ajustada, o cabo pode estar ressecando no capuz — lubrifique ou troque o cabo (peça de baixo custo).',
  },
  {
    severity: 'WARN',
    title: 'Problemas elétricos ocasionais: velocímetro/painel digital reiniciando ou luzes de alerta falsas',
    body: 'Relatos ocasionais (não generalizados, mas documentados em fóruns internacionais) de painel Tripper/digital reiniciando sozinho ou acendendo luz de alerta (check engine, ABS) sem motivo aparente, geralmente ligados a mau contato em conectores do chicote elétrico ou bateria com carga baixa. Antes de levar à concessionária, verifique a tensão da bateria em repouso (deve ficar acima de 12,4V) e os conectores acessíveis atrás do painel. Se o alerta persistir, é caso de diagnóstico via scanner na rede autorizada — a ECU da linha 650 é compartilhada entre os modelos e o código de erro ajuda a identificar rapidamente a causa.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem em peças cromadas e parafusaria — reputação histórica da marca ainda se aplica aos modelos novos',
    body: 'Mesmo com motor moderno e injeção eletrônica, a Royal Enfield mantém fama antiga (justificada por relatos recorrentes mesmo em modelos 650 novos) de qualidade inferior de zincagem/cromagem em parafusos, suportes e peças de acabamento comparado a marcas japonesas. Pontos de ferrugem superficial em poucos meses de uso não são incomuns, especialmente em regiões litorâneas ou de clima muito úmido. Não indica problema estrutural, mas prejudica a valorização de revenda — vale investir em manutenção preventiva de acabamento (cera, verniz automotivo em pontos específicos, revisão visual mensal).',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas fora de especificação em revisões precoces — ajuste necessário mais cedo que motos japonesas equivalentes',
    body: 'Diferente de muitas motos japonesas modernas com ajustadores hidráulicos, o motor 650 twin da Royal Enfield tem regulagem manual de folga de válvulas por parafuso/contra-porca. É comum a folga já estar fora do padrão na primeira revisão de 10.000-12.000 km, mais cedo que se costuma ver em concorrentes — não é defeito, é característica do desenho do motor, mas exige atenção do mecânico e não deve ser pulado mesmo que a moto "pareça" estar rodando bem.',
  },
  {
    severity: 'DANGER',
    title: 'Vazamento de óleo pela tampa de válvulas ou base do cilindro em unidades com juntas mal assentadas de fábrica',
    body: 'Há relatos documentados (fóruns internacionais e alguns casos no Brasil) de vazamento de óleo pela junta da tampa de válvulas ou pela base do cilindro em unidades específicas, geralmente por junta que não assentou corretamente de fábrica ou parafusos que soltaram com o calor. Sintoma: mancha de óleo visível na base do motor, cheiro de óleo queimando em uso prolongado. Não rode a moto com vazamento ativo até a inspeção — risco de nível de óleo cair abaixo do mínimo e causar dano sério ao motor. Casos assim geralmente estão cobertos pela garantia de fábrica (3 anos/unlimited km em muitos mercados, confirme a política vigente no Brasil) — leve à concessionária o quanto antes.',
  },
]

const CLASSIC650_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Classic 650: baseado no manual do proprietário + primeiras revisões no Brasil',
    body: '500-1.000 km (revisão de rodagem) — Troca de óleo (15W-50, ~3,1L). Ajuste do cabo de embreagem. Aperto geral de parafusaria (coxins do motor, escapamento). Verificação de vazamentos. | 5.000 km — Troca de óleo + filtro. Lubrificação da corrente 525. Verificação do gap das velas (0,7-0,8mm). | 10.000-12.000 km — Troca de óleo + filtro. Folga de válvulas (regulagem manual — motor frio, seguir especificação exata do manual por ano/versão). Troca das velas (par). Inspeção do filtro de ar. | 15.000 km — Fluido de freio DOT 4 (frente e trás) se atingir 24 meses. Inspeção de pastilhas. | 20.000 km — Kit relação 525 (corrente + pinhão + coroa) se desgastado. Retorque geral do motor. | 24 meses (independente do km) — Troca preventiva do fluido de freio DOT 4. Inspeção visual de ferrugem em cromados e parafusaria — mais frequente que o usual para a marca. | Revisões subsequentes seguem o padrão de 10.000 km para óleo/filtro e 20.000 km para itens maiores, sempre alternando entre concessionária autorizada (para manter garantia) e mecânico de confiança para itens simples.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// CONTINENTAL GT 650 — cafe racer esportiva, lançamento global 2018 (Brasil 2019)
// Motor: idêntico à base 648cc, 47 cv @ 7.150 rpm | 52 Nm @ 5.250 rpm
// Óleo 15W-50, ~3,1L | Velas ×2 gap 0,7-0,8mm | Pneu: 100/90-18 (F) · 130/70-18 (R)
// Corrente 520/525 | Tanque 12,5L (menor que a Interceptor) | Freio: disco 320mm (F) + 240mm (R), ABS
// Peso: ~198-214kg (variação por fonte/versão) | Altura do assento: 793mm
// Guidão baixo tipo clip-on, posição de pilotagem mais esportiva/inclinada — a "irmã cafe racer" da Interceptor
// Inclui também a edição comemorativa "120 Year Edition" (120 anos da marca, tiragem limitada 480 unidades
// mundiais, 60 GT + 60 Interceptor por região) e variantes "Custom"/"Special Colorway"
// ═══════════════════════════════════════════════════════════════════════════

const GT650_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 semissintético — 3,1L; postura esportiva não muda a mecânica, só a troca de calor no motor exposto',
    body: 'Mesmo motor-base da linha 650, mesma recomendação: 15W-50 semissintético API SN+, ~3,1L com filtro, troca a cada 5.000 km. Como a GT tem carenagem/painéis menores e motor bem exposto ao vento, a refrigeração a ar tende a funcionar até um pouco melhor em movimento — mas em trânsito parado por muito tempo (comum em capitais brasileiras), monitore a temperatura e evite ficar muito tempo com o motor em marcha lenta sob sol forte.',
  },
  {
    severity: 'OK',
    title: 'Postura cafe racer: guidão baixo cansa em viagens longas — ajuste a postura e faça paradas mais frequentes',
    body: 'A GT 650 tem o guidão tipo clip-on baixo, inclinando o piloto para frente — visual clássico de cafe racer, ótimo para trechos curtos e sinuosos, mas que sobrecarrega pulsos, ombros e lombar em viagens de mais de 1-2 horas seguidas. Para uso em rodovia, considere um guidão ligeiramente mais alto (aftermarket, mantendo a geometria do garfo) ou pare a cada 60-90 minutos para alongar. Muitos proprietários trocam para um guidão "risers" de poucos centímetros sem descaracterizar o visual da moto.',
  },
  {
    severity: 'OK',
    title: 'Duas velas gap 0,7-0,8mm — acesso relativamente fácil, sem carenagem lateral bloqueando',
    body: 'Assim como as demais 650 twin, a GT tem uma vela por cilindro. Diferente de esportivas carenadas convencionais, a GT tem acesso bom às velas sem precisar remover carenagem — facilita a troca em casa com ferramenta básica. Gap 0,7-0,8mm, sempre troque em par. NGK Iridium é recomendado para quem roda mais forte (a GT convida a rotações mais altas que a Interceptor pela postura esportiva).',
  },
  {
    severity: 'WARN',
    title: 'Peças de carenagem/acabamento específicas da GT: rede ainda em expansão, procure lojas especializadas em importados',
    body: 'Peças mecânicas (motor, embreagem, corrente) são compartilhadas com toda a linha 650 e mais fáceis de achar. Já peças específicas de acabamento da GT — tanque, banco individual (single seat cowl), guidão clip-on original — dependem mais da rede de concessionárias oficiais, ainda menor que a de marcas japonesas em várias regiões do Brasil. Grupos de proprietários (Royal Enfield 650 Twins Forum internacional, grupos de Facebook/Telegram "Royal Enfield Brasil") são boa fonte para achar peças usadas ou indicações de importadores confiáveis.',
  },
  {
    severity: 'OK',
    title: 'Pneus 100/90-18 (F) e 130/70-18 (R) — aro 18 nas duas rodas, boa disponibilidade de esportivos de médio porte',
    body: 'A medida 18"/18" da GT tem mais opções de pneu esportivo/turismo que as medidas de aro 19"/16" ou 19"/17" de outras famílias da linha. Pirelli Sport Demon (perfil retro, combina com o visual cafe racer) e Michelin Road/Pilot Street são boas opções à venda no Brasil. Para quem gosta de levar a GT em curva com mais empenho, Pirelli Angel GT também é compatível na medida e entrega mais aderência, ao custo de durabilidade um pouco menor.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520/525 com O-ring — confirme a medida exata da sua unidade antes de comprar kit',
    body: 'Houve variação de especificação de corrente entre anos/mercados da GT 650 (520 em algumas versões, 525 em outras) — sempre confira a medida gravada nos elos da corrente original ou consulte o manual da sua unidade antes de comprar kit de relação. DID e RK são referências de qualidade disponíveis no Brasil via importadores de peças de moto. Lubrifique a cada 500-600 km — a postura esportiva da GT tende a levar a uso mais dinâmico (mais acelerações/freadas), o que desgasta a corrente um pouco mais rápido que em uso de cruiser tranquilo.',
  },
  {
    severity: 'WARN',
    title: 'Edição 120 Year Edition: cuidados especiais com o banco de couro e acabamento black-chrome',
    body: 'A Continental GT 120 Year Edition (tiragem limitada mundial de 480 unidades, 60 delas destinadas às Américas) tem banco de couro trançado diamond-stitch marrom e acabamento especial "black-chrome" desenvolvido na fábrica original de Chennai — ambos exigem cuidado redobrado. Não use produtos de limpeza abrasivos no banco de couro (use hidratante de couro automotivo específico) e evite esponjas ásperas no acabamento black-chrome (é mais sensível a risco que cromado convencional). Guarde a moto coberta quando parada por longos períodos para preservar o valor de colecionador.',
  },
]

const GT650_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vibração em faixas específicas de rotação, mais perceptível pela postura esportiva com peso nos punhos',
    body: 'Por causa do guidão baixo, o piloto sente mais diretamente qualquer vibração do motor nos punhos, comparado à postura ereta da Interceptor com o mesmo motor. A faixa mais citada é entre 4.500-5.500 rpm. Verifique o aperto dos coxins do motor e o balanceamento dos pneus se a vibração parecer aumentar com o tempo — mas algum nível é esperado e considerado normal para o motor bicilíndrico da linha.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem dura/travando nas primeiras centenas de quilômetros — ajuste resolve a maioria dos casos',
    body: 'Mesmo relato da linha inteira: alavanca de embreagem pesada logo após a compra, por acomodação de cabo e discos. Resolve com ajuste no parafuso de regulagem feito na primeira revisão. Se persistir, verifique ressecamento do cabo.',
  },
  {
    severity: 'WARN',
    title: 'Espelhos retrovisores pequenos e vibrando em velocidade de rodovia',
    body: 'É uma reclamação recorrente entre proprietários de toda a linha 650 (não só a GT): os espelhos originais, apesar do motor ser relativamente suave, vibram e embaçam a imagem em velocidades de rodovia (acima de 100 km/h). Não é falha mecânica, mas prejudica a visibilidade. Solução popular: trocar por espelhos aftermarket com haste mais rígida ou adicionar contrapeso de borracha na base — item de baixo custo que melhora bastante a experiência em viagem.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem em parafusaria e peças cromadas, inclusive em unidades com poucos meses de uso',
    body: 'Reputação histórica da marca se confirma também na linha 650: proprietários relatam pontos de oxidação em parafusos do motor, suporte do escapamento e peças cromadas mesmo em motos com menos de um ano, principalmente em regiões litorâneas ou de garagem úmida. Aplique produto anticorrosivo preventivo e lave a moto regularmente evitando jato de alta pressão direto em rolamentos e conectores elétricos.',
  },
  {
    severity: 'WARN',
    title: 'Fadiga postural em viagens longas: dores no pulso e ombro por causa do guidão baixo clip-on',
    body: 'Não é uma falha mecânica, mas é o problema mais citado por proprietários que usam a GT para viagens longas — a postura cafe racer castiga punhos, ombros e cervical em trechos de rodovia prolongados. Quem faz viagens frequentes de longa distância deve considerar o guidão mais alto da Interceptor 650 (mesmo motor, postura mais ereta) ou investir em risers de guidão compatíveis para a GT.',
  },
  {
    severity: 'DANGER',
    title: 'Vazamento de óleo pela junta da tampa de válvulas ou base do cilindro — mesmo risco documentado da linha 650',
    body: 'Casos pontuais reportados de vazamento por junta mal assentada de fábrica ou parafusos que soltaram com ciclos de calor. Sintoma: mancha de óleo na base do motor. Interrompa o uso e leve à concessionária assim que notar — a garantia de fábrica cobre esse tipo de defeito na maioria dos mercados.',
  },
]

const GT650_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Continental GT 650: mesma base da linha 650, atenção redobrada à postura em viagem',
    body: '500-1.000 km (rodagem) — Troca de óleo (15W-50, ~3,1L). Ajuste do cabo de embreagem. Aperto de parafusaria. | 5.000 km — Troca de óleo + filtro. Lubrificação da corrente. Verificação do gap das velas (0,7-0,8mm). | 10.000-12.000 km — Troca de óleo + filtro. Folga de válvulas (regulagem manual, motor frio). Troca das velas (par). Filtro de ar. | 15.000 km — Fluido de freio DOT 4 (24 meses). Inspeção de pastilhas dianteiras e traseiras. | 20.000 km — Kit relação (confirme medida 520 ou 525 da sua unidade). Retorque geral. | 24 meses — Fluido de freio. Inspeção de ferrugem em cromados e parafusaria. | Para a edição 120 Year Edition — cuidado extra na limpeza do banco de couro e do acabamento black-chrome a cada lavagem.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// INTERCEPTOR 650 — roadster clássica, lançamento global 2018 (Brasil 2019, junto com a GT)
// Motor: idêntico à base 648cc, 47 cv @ 7.150-7.250 rpm | 52 Nm @ 5.250-5.650 rpm
// Óleo 15W-50, ~3,1L | Velas ×2 gap 0,7-0,8mm | Pneu: 100/90-18 (F) · 130/70-18 (R)
// Corrente 520/525 | Tanque 13,7L (maior que a GT) | Freio: disco 320mm (F) + 240mm (R), ABS
// Peso: ~213kg | Altura do assento: 804mm
// Guidão alto tipo "flat/pullback", posição ereta e confortável — compartilha motor e chassi com a GT
// mas com ergonomia voltada a conforto/touring leve. Inclui também "120 Year Edition", "Custom",
// "Special Colorway" e "Standard"
// ═══════════════════════════════════════════════════════════════════════════

const INTERCEPTOR650_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 semissintético — 3,1L; mesma recomendação da linha, troque a cada 5.000 km',
    body: 'Motor idêntico à GT 650 e demais da linha: 15W-50 API SN+ semissintético, ~3,1L com filtro, troca a cada 5.000 km ou 6 meses. A Interceptor tende a ser usada em trajetos mais urbanos/mistos que a GT (postura mais confortável convida a isso), então monitore o óleo em uso muito parado no trânsito — o motor a ar sofre mais nessas condições.',
  },
  {
    severity: 'OK',
    title: 'Guidão alto e postura ereta: a mais confortável da linha 650 para o dia a dia e viagens moderadas',
    body: 'A Interceptor foi desenhada como a "irmã confortável" da GT — guidão alto tipo flat/pullback, banco mais largo, posição ereta que não cansa a coluna. É a recomendação natural para quem quer o motor 650 twin mas pretende usar no trânsito diário e em viagens de fim de semana sem sofrer com a ergonomia. Ainda assim, para viagens de muitas horas seguidas, um banco com espuma mais firme (aftermarket) melhora bastante o conforto lombar.',
  },
  {
    severity: 'OK',
    title: 'Velas em par, gap 0,7-0,8mm — mesmo procedimento e intervalo da GT/demais 650',
    body: 'Duas velas, uma por cilindro, acesso facilitado (motor exposto sem carenagem). Gap 0,7-0,8mm. Troque sempre em par. NGK convencional (troca a cada 8.000-10.000 km) ou iridium (dura bem mais, recomendado para quem faz muita estrada).',
  },
  {
    severity: 'OK',
    title: 'Tanque de 13,7L: maior autonomia que a GT (12,5L) — bom para viagens moderadas',
    body: 'Com consumo médio em torno de 20-23 km/l em uso misto, a Interceptor entrega autonomia de aproximadamente 270-310 km por tanque — suficiente para trechos de viagem sem parar toda hora para abastecer. Combustível: gasolina comum já atende (compressão moderada do motor), mas aditivada ajuda a manter o sistema de injeção limpo no médio prazo, especialmente com a qualidade variável do etanol/gasolina em postos de estrada.',
  },
  {
    severity: 'WARN',
    title: 'Peças compartilhadas com a GT facilitam manutenção — mas confirme sempre a compatibilidade exata',
    body: 'Motor, embreagem, elétrica e muitos componentes de suspensão são compartilhados entre Interceptor e GT 650 — isso amplia bastante a disponibilidade de peças mecânicas no Brasil, já que qualquer concessionária RE atende as duas. Peças específicas de acabamento (tanque, banco, guidão) não são intercambiáveis por causa do visual diferente. Sempre informe o modelo exato (Interceptor vs. GT vs. edições especiais) ao pedir peça, mesmo quando o vendedor disser "é tudo igual".',
  },
  {
    severity: 'OK',
    title: 'Pneus 100/90-18 (F) e 130/70-18 (R) — mesma medida da GT, boa disponibilidade de opções',
    body: 'Mesma medida de pneu da Continental GT. Pirelli Sport Demon (visual retro combina bem com o estilo roadster clássico da Interceptor) e Michelin Road 5/Pilot Street são referências de boa relação custo-benefício disponíveis no Brasil.',
  },
  {
    severity: 'OK',
    title: 'Edições especiais (120 Year, Custom, Special Colorway): mesma mecânica, cuidados de acabamento específicos',
    body: 'A Interceptor 120 Year Edition (tiragem limitada mundial, 60 unidades para as Américas) tem o mesmo acabamento black-chrome e banco de couro diamond-stitch da GT equivalente — cuidados de limpeza específicos (produto de couro automotivo, sem abrasivos no acabamento especial). As versões "Custom" e "Special Colorway" têm pintura e grafismos exclusivos — evite polidor abrasivo em pinturas com detalhes/faixas para não desgastar o verniz da arte.',
  },
]

const INTERCEPTOR650_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vibração em faixa específica de rotação (4.500-5.500 rpm) — mesma característica do motor da linha',
    body: 'Mesmo motor da GT, mesmo padrão de vibração nessa faixa de rotação. Na Interceptor, a postura ereta com guidão alto absorve melhor essa vibração que a postura esportiva da GT, tornando-a menos incômoda no dia a dia.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem dura logo após a compra — mesmo comportamento documentado em toda a linha 650',
    body: 'Ajuste do cabo na primeira revisão resolve a maioria dos casos. Se persistir, verifique ressecamento/desgaste do cabo de embreagem.',
  },
  {
    severity: 'WARN',
    title: 'Marcador de combustível impreciso — comum em toda a linha 650, confirme manualmente',
    body: 'É queixa recorrente entre proprietários: o marcador de combustível do painel (analógico ou Tripper) pode não refletir com precisão o nível real, especialmente próximo da reserva — às vezes demora a subir após o abastecimento completo ou passa muito tempo "piscando" no mínimo antes de realmente zerar. Não é falha grave, mas em viagem, é mais seguro monitorar a quilometragem rodada desde o último abastecimento do que confiar cegamente no marcador.',
  },
  {
    severity: 'WARN',
    title: 'Espelhos retrovisores vibrando em velocidade de rodovia',
    body: 'Mesma reclamação da linha inteira: espelhos pequenos que vibram e embaçam a imagem acima de 100 km/h. Trocar por espelho aftermarket com haste mais rígida resolve.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem precoce em cromados e parafusaria, mesmo em unidades recentes',
    body: 'Mesmo padrão histórico da marca, presente também na Interceptor: pontos de oxidação em parafusos e peças cromadas em poucos meses, principalmente perto do litoral. Manutenção preventiva com produto anticorrosivo é recomendada.',
  },
  {
    severity: 'DANGER',
    title: 'Vazamento de óleo pela tampa de válvulas — mesmo risco documentado do motor 650 twin',
    body: 'Casos pontuais de junta mal assentada de fábrica. Interrompa o uso e leve à concessionária ao notar mancha de óleo na base do motor — cobertura de garantia se aplica na maioria dos casos.',
  },
]

const INTERCEPTOR650_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Interceptor 650: mesma base mecânica da linha, foco em conforto e uso diário',
    body: '500-1.000 km (rodagem) — Troca de óleo (15W-50, ~3,1L). Ajuste do cabo de embreagem. Aperto de parafusaria. | 5.000 km — Troca de óleo + filtro. Lubrificação da corrente. Verificação do gap das velas (0,7-0,8mm). | 10.000-12.000 km — Troca de óleo + filtro. Folga de válvulas (regulagem manual, motor frio). Troca das velas (par). Filtro de ar. | 15.000 km — Fluido de freio DOT 4 (24 meses). Inspeção de pastilhas. | 20.000 km — Kit relação (confirme medida 520 ou 525). Retorque geral. | 24 meses — Fluido de freio. Inspeção de ferrugem em cromados e parafusaria. | Para as edições especiais (120 Year, Custom, Special Colorway) — cuidados extras de limpeza de acabamento a cada lavagem.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// INTERCEPTOR BEAR 650 — scrambler/adventure baseada na Interceptor, lançamento 2024/2025 no Brasil
// Motor: idêntico à base 648cc, 47 cv @ 7.150 rpm | 52 Nm @ 5.250 rpm
// Óleo 15W-50, ~3,1L | Velas ×2 gap 0,7-0,8mm | Pneu: 19" (F) · 17" (R) tipo scrambler/misto
// Suspensão: garfo Showa USD com curso maior que a Interceptor convencional, roda dianteira maior (19"),
// guidão mais alto, protetor de cárter de série | Altura do assento: ~830mm | Maior curso de suspensão
// e maior distância ao solo (~183mm) que a Interceptor padrão — vocação scrambler/leve aventura
// Lançamento global: outubro de 2024
// ═══════════════════════════════════════════════════════════════════════════

const BEAR650_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 semissintético — 3,1L; mesma base mecânica, mas suspensão de curso maior pede atenção extra às buchas do motor',
    body: 'Mesmo motor e mesma recomendação de óleo (15W-50, ~3,1L, troca a cada 5.000 km) da Interceptor convencional. Como a Bear 650 é usada com mais frequência fora do asfalto (estrada de terra, cascalho), a poeira em suspensão aumenta o desgaste do filtro de ar mais rápido que nas irmãs de uso 100% urbano — antecipe a inspeção do filtro se rodar bastante em terra.',
  },
  {
    severity: 'OK',
    title: 'Suspensão dianteira Showa USD de curso maior: aperte o protetor de cárter regularmente após uso off-road',
    body: 'A Bear 650 tem garfo invertido Showa com curso de suspensão maior que a Interceptor padrão, além de proteção de cárter de série — pensada para trilhas leves e estradas de terra. Após qualquer saída off-road, verifique o aperto dos parafusos do protetor de cárter (pancadas de pedras podem afrouxá-los) e inspecione visualmente o garfo em busca de vazamento pelos retentores, que sofrem mais com poeira entrando pelos batentes de vedação.',
  },
  {
    severity: 'OK',
    title: 'Roda dianteira 19" com pneu misto: cuidado ao trocar por pneu 100% rodoviário',
    body: 'A roda dianteira maior (19") da Bear 650 pede pneu com perfil misto (on/off-road) para manter a estabilidade em terra que é a proposta da moto. Se for usar a Bear só na cidade e asfalto, um pneu rodoviário melhora a aderência em curva, mas reduz a capacidade em terra — avalie o uso real antes de trocar o pneu original. Pirelli Scorpion Rally STR e Michelin Anakee Adventure são referências de pneu misto disponíveis no Brasil compatíveis com a medida.',
  },
  {
    severity: 'OK',
    title: 'Guidão mais alto que a Interceptor: postura em pé facilitada, mas ajuste retrovisores e alavancas para uso misto',
    body: 'O guidão da Bear 650 é mais alto e com maior largura que o da Interceptor convencional, facilitando pilotagem em pé em trechos de terra — mas exige reposicionar retrovisores e alavancas de freio/embreagem para uma postura confortável tanto sentado (asfalto) quanto em pé (terra). Regule a altura das alavancas com a moto no cavalete e teste as duas posturas antes de sair para rodar.',
  },
  {
    severity: 'WARN',
    title: 'Lançamento recente no Brasil: peças específicas do kit scrambler ainda mais escassas que a Interceptor comum',
    body: 'Por ser a variante mais nova da família Interceptor a chegar ao Brasil (2024/2025), peças exclusivas da Bear 650 — protetor de cárter, guidão alto específico, para-lamas dianteiro alto — têm disponibilidade ainda mais limitada que a Interceptor convencional, concentrada nas concessionárias oficiais. Itens mecânicos compartilhados com o resto da linha 650 (motor, corrente, filtros) já têm boa disponibilidade em lojas especializadas.',
  },
  {
    severity: 'OK',
    title: 'Corrente com folga maior recomendada por causa do curso extra de suspensão traseira',
    body: 'Como a Bear 650 tem curso de suspensão traseira ligeiramente maior que a Interceptor padrão, a variação de distância entre pinhão e coroa ao longo do curso é maior — verifique a folga da corrente com a moto no cavalete central e, se possível, também com o peso do piloto sobre a moto, ajustando para o meio-termo recomendado no manual (evite folga insuficiente que pode arrebentar a corrente no fundo de curso).',
  },
  {
    severity: 'OK',
    title: 'Marca CEAT (parceira histórica da Royal Enfield na Índia) já disponível no Brasil para pneus mistos',
    body: 'A CEAT, fabricante indiana de pneus e fornecedora original de vários modelos Royal Enfield, vem expandindo distribuição no Brasil — vale cotar como opção mais em conta que Pirelli/Michelin para quem usa a Bear 650 principalmente na cidade, mantendo qualidade adequada ao perfil misto da moto.',
  },
]

const BEAR650_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vibração em faixa específica de rotação — mesmo motor, mesma característica da linha 650',
    body: 'Mesma faixa citada pelas outras famílias (4.500-5.500 rpm). Na Bear 650, o guidão mais alto e a suspensão de curso maior ajudam a absorver parte dessa vibração antes de chegar às mãos do piloto.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem dura nas primeiras centenas de km — mesmo padrão da linha 650',
    body: 'Ajuste do cabo na primeira revisão resolve a maioria dos casos, mesmo comportamento documentado nas demais famílias.',
  },
  {
    severity: 'WARN',
    title: 'Retentores de garfo mais expostos a poeira em uso off-road — vazamento prematuro se não limpar após trilha',
    body: 'Por ser a única da linha com vocação declarada para terra, a Bear 650 sofre mais com poeira grudando nos retentores do garfo dianteiro — se não for limpo, o pó atua como lixa e acelera o desgaste do retentor, causando vazamento de óleo pelo tubo interno. Limpe os tubos do garfo com pano úmido após cada saída off-road, antes que a poeira se acumule.',
  },
  {
    severity: 'WARN',
    title: 'Marcador de combustível impreciso — mesma queixa documentada em toda a linha 650',
    body: 'Painel pode não refletir com precisão o nível real de combustível. Monitore pela quilometragem rodada em trechos mais remotos, já que a vocação aventureira da Bear pode levar a rotas com posto de gasolina mais distante.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem em cromados e parafusaria — reputação histórica da marca, agravada por uso em terra/poeira',
    body: 'Mesmo padrão da linha, possivelmente agravado pelo uso off-road que expõe mais partes do chassi a poeira, lama e água. Lavagem e produto anticorrosivo preventivo são ainda mais importantes nesta variante.',
  },
  {
    severity: 'DANGER',
    title: 'Vazamento de óleo pela tampa de válvulas — mesmo risco documentado do motor 650 twin',
    body: 'Casos pontuais de junta mal assentada de fábrica, mesmo risco de toda a linha. Interrompa o uso e procure a concessionária ao notar vazamento.',
  },
]

const BEAR650_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Interceptor Bear 650: mesma base da linha 650, com atenção extra ao uso misto/off-road',
    body: '500-1.000 km (rodagem) — Troca de óleo (15W-50, ~3,1L). Ajuste do cabo de embreagem. Aperto de parafusaria, incluindo parafusos do protetor de cárter. | 5.000 km — Troca de óleo + filtro. Lubrificação da corrente (folga verificada com peso do piloto). Verificação do gap das velas. | 10.000-12.000 km — Troca de óleo + filtro. Folga de válvulas (regulagem manual, motor frio). Troca das velas (par). Filtro de ar — antecipar se rodar muito em terra. | 15.000 km — Fluido de freio DOT 4. Inspeção de pastilhas e do garfo dianteiro USD quanto a vazamento por poeira nos retentores. | 20.000 km — Kit relação. Retorque geral, incluindo protetor de cárter. | Após cada saída off-road — Limpeza dos tubos do garfo e verificação do aperto do protetor de cárter. | 24 meses — Fluido de freio. Inspeção de ferrugem, com atenção redobrada por exposição a terra/lama.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// SHOTGUN 650 — bobber/cruiser moderna, lançamento global e Brasil 2024
// Motor: idêntico à base 648cc, 46-47 cv @ 7.250 rpm | 52 Nm @ 5.650 rpm
// Óleo 15W-50, ~3,1L | Velas ×2 gap 0,7-0,8mm | Pneu: 100/90 R18 (F) · 150/70 R17 (R)
// Freio: disco 320mm (F, pinça flutuante 2 pistões) + disco 300mm (R, pinça 2 pistões), ABS
// Peso: ~240kg | Altura do assento: 795mm | Tanque: 13,8L | Visual customizado de fábrica,
// banco solo (single seat), guidão tipo "riser" moderno (não é ape hanger extremo, mas mais alto/puxado
// que a Interceptor) | Ground clearance ~140mm
// ═══════════════════════════════════════════════════════════════════════════

const SHOTGUN650_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 semissintético — 3,1L; mesma base do motor 650 twin, troca a cada 5.000 km',
    body: 'Mesma especificação de óleo de toda a linha: 15W-50 semissintético API SN+, ~3,1L com filtro, troca a cada 5.000 km ou 6 meses. Motul 7100 15W-50 e óleo de marca própria RE (co-desenvolvido com Motul) são as opções mais indicadas nas concessionárias oficiais.',
  },
  {
    severity: 'WARN',
    title: 'Pintura customizada de fábrica: evite produtos abrasivos e polimento agressivo nas cores foscas',
    body: 'A Shotgun 650 vem com acabamentos de pintura customizados de fábrica (cores foscas tipo "Sheet Metal Grey", "Drill Green", "Plasma Blue", "Stencil White") — pintura fosca exige cuidado diferente da pintura brilhante convencional. Nunca use polidor ou cera para pintura brilhante em superfície fosca — isso cria manchas e brilho irregular permanente. Use apenas produtos específicos para pintura fosca (shampoo neutro + microfibra, sem cera comum) e evite panos ásperos que podem "abrir" o acabamento.',
  },
  {
    severity: 'OK',
    title: 'Duas velas gap 0,7-0,8mm — mesmo procedimento do motor-base da linha',
    body: 'Uma vela por cilindro, gap 0,7-0,8mm, troca sempre em par. NGK convencional ou iridium conforme uso — a Shotgun tende a ser pilotada com mais aceleração/frenagem por seu caráter mais "moderno/customizado", então iridium compensa pela maior durabilidade.',
  },
  {
    severity: 'OK',
    title: 'Banco solo (single seat): conforto reduzido em viagens longas, considere banco com espuma extra para trechos maiores',
    body: 'O desenho de banco solo da Shotgun prioriza estética sobre conforto de longa distância — é uma bobber/cruiser feita para trechos curtos e médios com estilo. Para quem pretende viajar mais, um banco aftermarket com espuma mais espessa (mantendo a base de fixação original) melhora bastante o conforto sem descaracterizar tanto o visual.',
  },
  {
    severity: 'OK',
    title: 'Pneu traseiro 150/70 R17 mais largo — combina estética cruiser com boa estabilidade',
    body: 'O pneu traseiro 150/70-17 da Shotgun é mais largo que o das irmãs Interceptor/GT (130/70-18), reforçando o visual "musculoso" moderno de bobber e melhorando a estabilidade em curva a despeito do peso. Pirelli Diablo Rosso e Michelin Road 5/Anakee (dependendo do uso, mais esportivo ou mais misto) atendem bem a medida no Brasil.',
  },
  {
    severity: 'WARN',
    title: 'Guidão tipo riser mais alto que a Interceptor: verifique a extensão dos cabos após qualquer troca de guidão',
    body: 'O guidão da Shotgun é levemente mais alto/puxado que o padrão da Interceptor, mudando a rota dos cabos de embreagem e acelerador e do chicote elétrico. Se for trocar o guidão por outro modelo (mais alto tipo "ape hanger" real, comum em customização de bobber), confira se os cabos e mangueira de freio originais têm folga suficiente — cabos curtos demais podem forçar a direção ou puxar componentes na curva máxima do guidão.',
  },
  {
    severity: 'OK',
    title: 'Freios: 2 discos (320mm dianteiro + 300mm traseiro) com pinças de 2 pistões — fluido DOT 4 bienal',
    body: 'Sistema de freio robusto para o peso de ~240kg da moto. Fluido DOT 4, troca a cada 24 meses (o fluido absorve umidade e perde eficiência com o tempo, mesmo sem uso intenso). Marcas recomendadas: Motul DOT 4, ATE. Pastilhas: EBC ou Bosch compatíveis, disponíveis via importadores de peças de moto no Brasil.',
  },
  {
    severity: 'WARN',
    title: 'Rede RE ainda em expansão: modelo mais recente da linha exige planejamento de peças de acabamento',
    body: 'A Shotgun 650 chegou ao Brasil como um dos lançamentos mais recentes da linha 650 — peças de acabamento específicas (banco solo, guidão riser, para-lamas curto traseiro) ainda dependem quase exclusivamente da rede de concessionárias oficiais, que segue em expansão pelo país. Itens mecânicos padrão da linha (motor, embreagem, corrente) já são bem atendidos.',
  },
]

const SHOTGUN650_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vibração em faixa específica de rotação — mesmo motor, mesma característica da linha 650',
    body: 'Mesma faixa citada nas demais famílias (4.500-5.500 rpm). No guidão riser da Shotgun, a vibração chega de forma um pouco diferente que na Interceptor, mas segue sendo uma característica do motor, não defeito.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem dura logo após a compra — mesmo padrão documentado em toda a linha 650',
    body: 'Ajuste do cabo na primeira revisão resolve a maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste acelerado da pintura fosca customizada se limpa com produto errado',
    body: 'Diferente de um problema mecânico, é um problema de manutenção: proprietários que usam cera ou polidor convencional (para pintura brilhante) na pintura fosca da Shotgun relatam manchas de brilho irregular permanentes, sem solução fácil além de repintura. Sempre use produtos específicos para pintura fosca.',
  },
  {
    severity: 'WARN',
    title: 'Marcador de combustível impreciso — mesma queixa documentada em toda a linha 650',
    body: 'Painel pode não refletir com precisão o nível real. Monitore pela quilometragem rodada.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem em cromados e parafusaria mesmo em unidades recentes',
    body: 'Mesmo padrão histórico da marca. Cuidado redobrado em regiões litorâneas.',
  },
  {
    severity: 'DANGER',
    title: 'Vazamento de óleo pela tampa de válvulas — mesmo risco documentado do motor 650 twin',
    body: 'Casos pontuais de junta mal assentada de fábrica. Interrompa o uso e procure a concessionária ao notar vazamento visível na base do motor.',
  },
]

const SHOTGUN650_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Shotgun 650: mesma base da linha 650, com atenção extra ao acabamento customizado',
    body: '500-1.000 km (rodagem) — Troca de óleo (15W-50, ~3,1L). Ajuste do cabo de embreagem. Aperto de parafusaria. | 5.000 km — Troca de óleo + filtro. Lubrificação da corrente. Verificação do gap das velas. | 10.000-12.000 km — Troca de óleo + filtro. Folga de válvulas (regulagem manual, motor frio). Troca das velas (par). Filtro de ar. | 15.000 km — Fluido de freio DOT 4 (frente e trás). Inspeção de pastilhas (2 discos). | 20.000 km — Kit relação. Retorque geral. | A cada lavagem — Usar produto específico para pintura fosca, nunca cera/polidor convencional. | 24 meses — Fluido de freio. Inspeção de ferrugem em cromados e parafusaria.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// SUPER METEOR 650 — cruiser de maior porte, touring-oriented, lançamento 2023 (Brasil 2023/2024)
// Motor: idêntico à base 648cc, 47 cv @ 7.250 rpm | 52 Nm @ 5.250 rpm (torque mais cedo que as demais)
// Óleo 15W-50, ~3,1L | Velas ×2 gap 0,7-0,8mm | Pneu: 100/90-19 (F) · 150/80 B16 (R)
// Suspensão traseira: bi-amortecedor com pré-carga ajustável em 5 posições, curso 101mm
// Suspensão dianteira: garfo USD Showa 43mm, curso 120mm | Freio: disco 320mm (F) + 300mm (R), ABS
// Peso: ~241-245kg (a mais pesada da linha) | Altura do assento: 740mm (a mais baixa da linha)
// Tanque: 15,7L | Para-brisa disponível como acessório oficial | Mais orientada a touring/conforto
// que a Shotgun (mais bobber/customizada)
// ═══════════════════════════════════════════════════════════════════════════

const SUPERMETEOR650_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 semissintético — 3,1L; motor mais usado em viagem longa, respeite o intervalo à risca',
    body: 'Mesma base de óleo da linha: 15W-50 semissintético, ~3,1L, troca a cada 5.000 km. Como a Super Meteor é a mais orientada a touring da linha (maior tanque, para-brisa disponível), é comum rodar mais quilômetros por mês que as irmãs mais urbanas — não deixe passar o intervalo de troca por estar "rodando bem", principalmente em viagens de muitas horas seguidas com o motor sob carga constante.',
  },
  {
    severity: 'OK',
    title: 'Suspensão traseira com pré-carga ajustável em 5 posições: regule conforme peso e bagagem antes de viajar',
    body: 'A Super Meteor tem bi-amortecedor traseiro com pré-carga ajustável em 5 posições (curso de 101mm) — diferencial importante para quem carrega bagagem ou anda com carona com frequência. Ajuste a pré-carga para posições mais duras ao levar carona/bagagem pesada (evita fundo de curso em buracos e mantém a geometria de direção estável) e volte para posições mais macias em uso solo na cidade, para melhor conforto. A regulagem geralmente é feita por chave/came na base do amortecedor — consulte o manual para o procedimento exato da sua unidade.',
  },
  {
    severity: 'OK',
    title: 'Duas velas gap 0,7-0,8mm — mesmo procedimento e intervalo da linha',
    body: 'Uma vela por cilindro, gap 0,7-0,8mm, sempre em par. Para quem usa a Super Meteor em viagens longas com frequência, vela iridium (NGK) compensa o custo extra pela maior durabilidade e menor manutenção no meio de uma viagem.',
  },
  {
    severity: 'OK',
    title: 'Para-brisa acessório oficial: reduz fadiga em viagem, mas verifique vibração na fixação periodicamente',
    body: 'O para-brisa (windscreen) é um acessório oficial disponível para a Super Meteor, recomendado para quem faz viagens longas de rodovia — reduz significativamente o cansaço causado pelo vento no peito/capacete em velocidade de cruzeiro. Após instalar, verifique periodicamente o aperto dos parafusos de fixação (a vibração do motor ao longo do tempo pode afrouxá-los) e a presença de rachaduras nos suportes de plástico/borracha.',
  },
  {
    severity: 'OK',
    title: 'Postura mais baixa da linha (assento a 740mm): facilita para pilotos de estatura menor, mas pé no chão exige atenção nas curvas',
    body: 'Com 740mm de altura do assento — a mais baixa entre as 6 famílias da linha 650 — a Super Meteor é a recomendação natural para pilotos de estatura menor ou que priorizam segurança ao apoiar os pés no chão em paradas. Em compensação, o ângulo de inclinação em curva é um pouco mais limitado que em cruisers com maior distância ao solo — evite acelerar demais em curvas fechadas para não raspar o estribo/escapamento no asfalto.',
  },
  {
    severity: 'WARN',
    title: 'Peso elevado (~241-245kg): pratique manobras em baixa velocidade antes de sair em viagem com bagagem',
    body: 'É a mais pesada da linha 650 — some isso à bagagem e carona e o peso total em movimento fica considerável para manobras de estacionamento e saída de garagem. Antes de uma viagem longa com bagagem cheia, pratique giros em U e manobras de baixa velocidade em local seguro (estacionamento vazio) para se acostumar com o comportamento da moto carregada.',
  },
  {
    severity: 'OK',
    title: 'Pneu traseiro 150/80 B16: medida específica desta família — confirme antes de comprar substituto',
    body: 'O pneu traseiro 150/80 B16 (construção "bias/diagonal", indicado pelo "B" na nomenclatura) é específico da Super Meteor dentro da linha 650 — não confundir com a medida radial 150/70 R17 da Shotgun. Pirelli Night Dragon e Michelin Commander III (medidas de cruiser americana) são referências que atendem bem esse perfil e já têm alguma disponibilidade no Brasil via importadores especializados em pneu de cruiser.',
  },
]

const SUPERMETEOR650_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vibração em faixa específica de rotação — mesmo motor, mesma característica da linha 650',
    body: 'Mesma faixa citada nas demais famílias (4.500-5.500 rpm). No uso touring da Super Meteor, em velocidade de cruzeiro constante, a vibração tende a ser mais perceptível por ficar mais tempo na mesma rotação — vale calibrar a rotação de cruzeiro (usando o câmbio de 6 marchas) para uma faixa mais confortável em viagens longas.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem dura logo após a compra — mesmo padrão documentado em toda a linha 650',
    body: 'Ajuste do cabo na primeira revisão resolve a maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Marcador de combustível impreciso — queixa recorrente, mais crítica em viagem longa pela maior autonomia esperada',
    body: 'Mesma imprecisão relatada em toda a linha 650, mas na Super Meteor o problema pesa mais porque a moto é usada justamente para viagens de maior distância — não confie cegamente no marcador em trechos com posto de gasolina mais espaçado, monitore pela quilometragem.',
  },
  {
    severity: 'WARN',
    title: 'Vibração/folga na fixação do para-brisa acessório após uso prolongado em rodovia',
    body: 'Especificamente para quem instala o para-brisa oficial: os pontos de fixação podem folgar com a vibração constante de viagens longas, gerando ruído de vento ou trepidação visível do próprio para-brisa. Reaperte periodicamente e considere um pouco de trava química (Loctite) nos parafusos de fixação.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem em cromados e parafusaria mesmo em unidades recentes',
    body: 'Mesmo padrão histórico da marca. A Super Meteor tem bastante acabamento cromado (para-lamas, tampa de motor, escapamento duplo) — mais superfície exposta ao risco de oxidação que os modelos com acabamento mais escovado/fosco da linha.',
  },
  {
    severity: 'DANGER',
    title: 'Vazamento de óleo pela tampa de válvulas — mesmo risco documentado do motor 650 twin',
    body: 'Casos pontuais de junta mal assentada de fábrica. Interrompa o uso e procure a concessionária ao notar vazamento visível na base do motor.',
  },
]

const SUPERMETEOR650_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Super Meteor 650: mesma base da linha, com foco extra em preparação para viagem',
    body: '500-1.000 km (rodagem) — Troca de óleo (15W-50, ~3,1L). Ajuste do cabo de embreagem. Aperto de parafusaria. | 5.000 km — Troca de óleo + filtro. Lubrificação da corrente. Verificação do gap das velas. | 10.000-12.000 km — Troca de óleo + filtro. Folga de válvulas (regulagem manual, motor frio). Troca das velas (par). Filtro de ar. | 15.000 km — Fluido de freio DOT 4 (frente e trás). Inspeção de pastilhas. | 20.000 km — Kit relação. Retorque geral, incluindo fixação do para-brisa se instalado. | Antes de qualquer viagem longa — Ajustar pré-carga da suspensão traseira conforme bagagem/carona, verificar aperto do para-brisa, calibrar pneus para condição com carga. | 24 meses — Fluido de freio. Inspeção de ferrugem em cromados e parafusaria (maior área cromada da linha).',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Classic 650',
    yearFrom: 2025,
    yearTo: null,
    MACETES: CLASSIC650_MACETES,
    PROBLEMAS: CLASSIC650_PROBLEMAS,
    MANUTENCAO: CLASSIC650_MANUTENCAO,
  },
  {
    modelName: 'Continental GT 650',
    yearFrom: 2019,
    yearTo: null,
    MACETES: GT650_MACETES,
    PROBLEMAS: GT650_PROBLEMAS,
    MANUTENCAO: GT650_MANUTENCAO,
  },
  {
    modelName: 'Continental GT 120 Year Edition',
    yearFrom: 2022,
    yearTo: 2022,
    MACETES: GT650_MACETES,
    PROBLEMAS: GT650_PROBLEMAS,
    MANUTENCAO: GT650_MANUTENCAO,
  },
  {
    modelName: 'Interceptor 650',
    yearFrom: 2019,
    yearTo: null,
    MACETES: INTERCEPTOR650_MACETES,
    PROBLEMAS: INTERCEPTOR650_PROBLEMAS,
    MANUTENCAO: INTERCEPTOR650_MANUTENCAO,
  },
  {
    modelName: 'Interceptor 120 Year Edition',
    yearFrom: 2022,
    yearTo: 2022,
    MACETES: INTERCEPTOR650_MACETES,
    PROBLEMAS: INTERCEPTOR650_PROBLEMAS,
    MANUTENCAO: INTERCEPTOR650_MANUTENCAO,
  },
  {
    modelName: 'Interceptor Bear 650',
    yearFrom: 2024,
    yearTo: null,
    MACETES: BEAR650_MACETES,
    PROBLEMAS: BEAR650_PROBLEMAS,
    MANUTENCAO: BEAR650_MANUTENCAO,
  },
  {
    modelName: 'Shotgun 650',
    yearFrom: 2024,
    yearTo: null,
    MACETES: SHOTGUN650_MACETES,
    PROBLEMAS: SHOTGUN650_PROBLEMAS,
    MANUTENCAO: SHOTGUN650_MANUTENCAO,
  },
  {
    modelName: 'Super Meteor 650',
    yearFrom: 2023,
    yearTo: null,
    MACETES: SUPERMETEOR650_MACETES,
    PROBLEMAS: SUPERMETEOR650_PROBLEMAS,
    MANUTENCAO: SUPERMETEOR650_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Classic 650',
    yearFrom: 2025, yearTo: null,
    tireSize: '100/90-19 (F) · 140/70-18 (R)',
    frontPsi: 26, rearPsi: 29,
    frontPsiLoad: 27, rearPsiLoad: 33,
    notes: 'Solo (piloto até ~90kg): F 26 / R 29 PSI. Com carona/bagagem: F 27 / R 33 PSI. Valores de referência baseados no padrão de fábrica da linha 650 para essa combinação de aros — confirme sempre pela etiqueta na moto (geralmente no cavalete central ou balança) ou pelo manual específico da sua unidade, pois a Classic 650 é lançamento recente e pode haver pequenos ajustes por ano/mercado. Pneus recomendados: Pirelli Sport Demon, CEAT (parceira histórica da marca na Índia).',
  },
  {
    modelName: 'Continental GT 650',
    yearFrom: 2019, yearTo: null,
    tireSize: '100/90-18 (F) · 130/70-18 (R)',
    frontPsi: 28, rearPsi: 33,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo (piloto único): F 28 / R 33 PSI. Com carona: F 28 / R 36 PSI. Mesma medida de pneu (18"/18") da Interceptor 650, mas a GT costuma ser usada com mais empenho em curva — verifique a pressão a cada 15 dias. Recomendados: Pirelli Sport Demon (visual retro) ou Pirelli Angel GT (mais aderência).',
  },
  {
    modelName: 'Continental GT 120 Year Edition',
    yearFrom: 2022, yearTo: 2022,
    tireSize: '100/90-18 (F) · 130/70-18 (R)',
    frontPsi: 28, rearPsi: 33,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Mesma especificação da Continental GT 650 padrão — edição comemorativa não altera pneus/suspensão, apenas acabamento e banco. Solo: F 28 / R 33 PSI. Com carona: F 28 / R 36 PSI.',
  },
  {
    modelName: 'Interceptor 650',
    yearFrom: 2019, yearTo: null,
    tireSize: '100/90-18 (F) · 130/70-18 (R)',
    frontPsi: 28, rearPsi: 33,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo: F 28 / R 33 PSI. Com carona/bagagem: F 28 / R 36 PSI. Mesma medida e pressão de referência da GT 650 (compartilham chassi e rodas). Recomendados: Pirelli Sport Demon, Michelin Road 5.',
  },
  {
    modelName: 'Interceptor 120 Year Edition',
    yearFrom: 2022, yearTo: 2022,
    tireSize: '100/90-18 (F) · 130/70-18 (R)',
    frontPsi: 28, rearPsi: 33,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Mesma especificação da Interceptor 650 padrão. Solo: F 28 / R 33 PSI. Com carona: F 28 / R 36 PSI.',
  },
  {
    modelName: 'Interceptor Bear 650',
    yearFrom: 2024, yearTo: null,
    tireSize: '19" (F) · 17" (R) — pneu misto on/off-road',
    frontPsi: 25, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 32,
    notes: 'Solo em uso misto/estrada: F 25 / R 28 PSI (pressões um pouco menores que a Interceptor padrão para melhorar aderência em terra/cascalho). Em uso 100% asfalto/rodovia ou com carona, suba para F 26 / R 32 PSI. Sempre confirme na etiqueta da moto — a pressão ideal varia mais nesta família por causa do uso misto. Recomendados: Pirelli Scorpion Rally STR, Michelin Anakee Adventure, CEAT Gripp XL.',
  },
  {
    modelName: 'Shotgun 650',
    yearFrom: 2024, yearTo: null,
    tireSize: '100/90 R18 (F) · 150/70 R17 (R)',
    frontPsi: 27, rearPsi: 32,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo: F 27 / R 32 PSI. Com carona: F 28 / R 36 PSI. Pneu traseiro mais largo (150/70-17) que a Interceptor/GT (130/70-18) — não confundir na hora da compra. Recomendados: Pirelli Diablo Rosso, Michelin Road 5.',
  },
  {
    modelName: 'Super Meteor 650',
    yearFrom: 2023, yearTo: null,
    tireSize: '100/90-19 (F) · 150/80 B16 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 27, rearPsiLoad: 36,
    notes: 'Solo: F 26 / R 30 PSI. Com carona/bagagem (recomendado para viagens de touring, moto tem tanque de 15,7L e para-brisa acessório): F 27 / R 36 PSI. Pneu traseiro 150/80 B16 (construção bias) é medida específica desta família — não intercambiável com a 150/70 R17 (radial) da Shotgun. Recomendados: Pirelli Night Dragon, Michelin Commander III.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // CLASSIC 650
  { modelName: 'Classic 650', yearFrom: 2025, yearTo: null, component: 'Óleo 15W-50 semissintético (~3,1L com filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor 648cc SOHC ar+óleo. API SN+ ou superior. Motul 7100 15W-50 ou óleo de marca própria RE.', priority: 'HIGH', order: 1 },
  { modelName: 'Classic 650', yearFrom: 2025, yearTo: null, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 6, notes: 'Trocar junto com o óleo a cada revisão.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Classic 650', yearFrom: 2025, yearTo: null, component: 'Velas ×2 (gap 0,7-0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Uma por cilindro. Trocar sempre em par. NGK convencional ou iridium.', priority: 'HIGH', order: 3 },
  { modelName: 'Classic 650', yearFrom: 2025, yearTo: null, component: 'Corrente 525 — lubrificação', intervalKm: 500, intervalMonths: null, notes: 'Folga 20-30mm no trecho inferior, moto no cavalete central.', priority: 'HIGH', order: 4 },
  { modelName: 'Classic 650', yearFrom: 2025, yearTo: null, component: 'Filtro de ar (papel — trocar, não lavar)', intervalKm: 15000, intervalMonths: 12, notes: 'Antecipar se rodar muito em ambiente com poeira.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Classic 650', yearFrom: 2025, yearTo: null, component: 'Folga de válvulas (regulagem manual)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio obrigatório. Consultar especificação exata do manual (varia levemente por ano).', priority: 'HIGH', order: 6 },
  { modelName: 'Classic 650', yearFrom: 2025, yearTo: null, component: 'Embreagem — ajuste do cabo', intervalKm: 1000, intervalMonths: null, notes: 'Comum ficar dura/pesada nos primeiros km — ajuste resolve a maioria dos casos.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Classic 650', yearFrom: 2025, yearTo: null, component: 'Pastilhas de freio (disco 320mm F / 300mm R)', intervalKm: 15000, intervalMonths: null, notes: 'Inspecionar a cada revisão, trocar conforme desgaste.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Classic 650', yearFrom: 2025, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório mesmo sem sintoma — absorve umidade com o tempo.', priority: 'HIGH', order: 9 },
  { modelName: 'Classic 650', yearFrom: 2025, yearTo: null, component: 'Kit relação 525 (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar kit completo quando desgastado.', priority: 'MEDIUM', order: 10 },
  { modelName: 'Classic 650', yearFrom: 2025, yearTo: null, component: 'Bateria — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'Manter acima de 12,4V em repouso. Tensão baixa causa falsos alertas no painel digital.', priority: 'MEDIUM', order: 11 },

  // CONTINENTAL GT 650
  { modelName: 'Continental GT 650', yearFrom: 2019, yearTo: null, component: 'Óleo 15W-50 semissintético (~3,1L com filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor 648cc SOHC ar+óleo. API SN+ ou superior.', priority: 'HIGH', order: 1 },
  { modelName: 'Continental GT 650', yearFrom: 2019, yearTo: null, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 6, notes: 'Trocar junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Continental GT 650', yearFrom: 2019, yearTo: null, component: 'Velas ×2 (gap 0,7-0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Uma por cilindro, sempre em par.', priority: 'HIGH', order: 3 },
  { modelName: 'Continental GT 650', yearFrom: 2019, yearTo: null, component: 'Corrente 520/525 — lubrificação', intervalKm: 500, intervalMonths: null, notes: 'Confirme a medida exata da sua unidade (variou entre anos/mercados).', priority: 'HIGH', order: 4 },
  { modelName: 'Continental GT 650', yearFrom: 2019, yearTo: null, component: 'Filtro de ar (papel — trocar, não lavar)', intervalKm: 15000, intervalMonths: 12, notes: 'Não usar água ou solvente.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Continental GT 650', yearFrom: 2019, yearTo: null, component: 'Folga de válvulas (regulagem manual)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'Continental GT 650', yearFrom: 2019, yearTo: null, component: 'Embreagem — ajuste do cabo', intervalKm: 1000, intervalMonths: null, notes: 'Dureza inicial é comum, ajuste resolve.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Continental GT 650', yearFrom: 2019, yearTo: null, component: 'Pastilhas de freio (disco 320mm F / 240mm R)', intervalKm: 15000, intervalMonths: null, notes: 'Inspecionar a cada revisão.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Continental GT 650', yearFrom: 2019, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 9 },
  { modelName: 'Continental GT 650', yearFrom: 2019, yearTo: null, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar kit completo.', priority: 'MEDIUM', order: 10 },

  // CONTINENTAL GT 120 YEAR EDITION
  { modelName: 'Continental GT 120 Year Edition', yearFrom: 2022, yearTo: 2022, component: 'Óleo 15W-50 semissintético (~3,1L com filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'Mesma especificação da GT 650 padrão.', priority: 'HIGH', order: 1 },
  { modelName: 'Continental GT 120 Year Edition', yearFrom: 2022, yearTo: 2022, component: 'Velas ×2 (gap 0,7-0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Trocar sempre em par.', priority: 'HIGH', order: 2 },
  { modelName: 'Continental GT 120 Year Edition', yearFrom: 2022, yearTo: 2022, component: 'Corrente — lubrificação', intervalKm: 500, intervalMonths: null, notes: 'Mesma especificação da GT 650 padrão.', priority: 'HIGH', order: 3 },
  { modelName: 'Continental GT 120 Year Edition', yearFrom: 2022, yearTo: 2022, component: 'Cuidado com banco de couro diamond-stitch e acabamento black-chrome', intervalKm: null, intervalMonths: 3, notes: 'Usar hidratante de couro automotivo específico. Evitar esponja áspera no black-chrome.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Continental GT 120 Year Edition', yearFrom: 2022, yearTo: 2022, component: 'Folga de válvulas (regulagem manual)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'Continental GT 120 Year Edition', yearFrom: 2022, yearTo: 2022, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },

  // INTERCEPTOR 650
  { modelName: 'Interceptor 650', yearFrom: 2019, yearTo: null, component: 'Óleo 15W-50 semissintético (~3,1L com filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor 648cc SOHC ar+óleo. API SN+ ou superior.', priority: 'HIGH', order: 1 },
  { modelName: 'Interceptor 650', yearFrom: 2019, yearTo: null, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 6, notes: 'Trocar junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Interceptor 650', yearFrom: 2019, yearTo: null, component: 'Velas ×2 (gap 0,7-0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Uma por cilindro, sempre em par.', priority: 'HIGH', order: 3 },
  { modelName: 'Interceptor 650', yearFrom: 2019, yearTo: null, component: 'Corrente 520/525 — lubrificação', intervalKm: 500, intervalMonths: null, notes: 'Confirme medida exata da sua unidade.', priority: 'HIGH', order: 4 },
  { modelName: 'Interceptor 650', yearFrom: 2019, yearTo: null, component: 'Filtro de ar (papel — trocar, não lavar)', intervalKm: 15000, intervalMonths: 12, notes: 'Não usar água ou solvente.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Interceptor 650', yearFrom: 2019, yearTo: null, component: 'Folga de válvulas (regulagem manual)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'Interceptor 650', yearFrom: 2019, yearTo: null, component: 'Embreagem — ajuste do cabo', intervalKm: 1000, intervalMonths: null, notes: 'Dureza inicial é comum, ajuste resolve.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Interceptor 650', yearFrom: 2019, yearTo: null, component: 'Pastilhas de freio (disco 320mm F / 240mm R)', intervalKm: 15000, intervalMonths: null, notes: 'Inspecionar a cada revisão.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Interceptor 650', yearFrom: 2019, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 9 },
  { modelName: 'Interceptor 650', yearFrom: 2019, yearTo: null, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar kit completo.', priority: 'MEDIUM', order: 10 },

  // INTERCEPTOR 120 YEAR EDITION
  { modelName: 'Interceptor 120 Year Edition', yearFrom: 2022, yearTo: 2022, component: 'Óleo 15W-50 semissintético (~3,1L com filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'Mesma especificação da Interceptor 650 padrão.', priority: 'HIGH', order: 1 },
  { modelName: 'Interceptor 120 Year Edition', yearFrom: 2022, yearTo: 2022, component: 'Velas ×2 (gap 0,7-0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Trocar sempre em par.', priority: 'HIGH', order: 2 },
  { modelName: 'Interceptor 120 Year Edition', yearFrom: 2022, yearTo: 2022, component: 'Corrente — lubrificação', intervalKm: 500, intervalMonths: null, notes: 'Mesma especificação da Interceptor 650 padrão.', priority: 'HIGH', order: 3 },
  { modelName: 'Interceptor 120 Year Edition', yearFrom: 2022, yearTo: 2022, component: 'Cuidado com banco de couro diamond-stitch e acabamento black-chrome', intervalKm: null, intervalMonths: 3, notes: 'Usar hidratante de couro automotivo específico.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Interceptor 120 Year Edition', yearFrom: 2022, yearTo: 2022, component: 'Folga de válvulas (regulagem manual)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'Interceptor 120 Year Edition', yearFrom: 2022, yearTo: 2022, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },

  // INTERCEPTOR BEAR 650
  { modelName: 'Interceptor Bear 650', yearFrom: 2024, yearTo: null, component: 'Óleo 15W-50 semissintético (~3,1L com filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'Mesmo motor da linha 650.', priority: 'HIGH', order: 1 },
  { modelName: 'Interceptor Bear 650', yearFrom: 2024, yearTo: null, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 6, notes: 'Trocar junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Interceptor Bear 650', yearFrom: 2024, yearTo: null, component: 'Velas ×2 (gap 0,7-0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Uma por cilindro, sempre em par.', priority: 'HIGH', order: 3 },
  { modelName: 'Interceptor Bear 650', yearFrom: 2024, yearTo: null, component: 'Corrente — lubrificação (folga com peso do piloto)', intervalKm: 500, intervalMonths: null, notes: 'Curso de suspensão maior exige checagem de folga também com peso do piloto.', priority: 'HIGH', order: 4 },
  { modelName: 'Interceptor Bear 650', yearFrom: 2024, yearTo: null, component: 'Filtro de ar (papel — trocar, não lavar)', intervalKm: 10000, intervalMonths: 12, notes: 'Antecipar em uso frequente off-road/poeira.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Interceptor Bear 650', yearFrom: 2024, yearTo: null, component: 'Folga de válvulas (regulagem manual)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'Interceptor Bear 650', yearFrom: 2024, yearTo: null, component: 'Embreagem — ajuste do cabo', intervalKm: 1000, intervalMonths: null, notes: 'Dureza inicial é comum.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Interceptor Bear 650', yearFrom: 2024, yearTo: null, component: 'Garfo dianteiro USD — inspeção de retentores', intervalKm: null, intervalMonths: 6, notes: 'Poeira acelera desgaste em uso off-road. Limpar tubos após cada saída em terra.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Interceptor Bear 650', yearFrom: 2024, yearTo: null, component: 'Protetor de cárter — verificação de aperto', intervalKm: null, intervalMonths: 3, notes: 'Verificar após qualquer saída off-road, impactos podem afrouxar parafusos.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Interceptor Bear 650', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 10 },
  { modelName: 'Interceptor Bear 650', yearFrom: 2024, yearTo: null, component: 'Kit relação', intervalKm: 20000, intervalMonths: null, notes: 'Trocar kit completo quando desgastado.', priority: 'MEDIUM', order: 11 },

  // SHOTGUN 650
  { modelName: 'Shotgun 650', yearFrom: 2024, yearTo: null, component: 'Óleo 15W-50 semissintético (~3,1L com filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'Mesmo motor da linha 650.', priority: 'HIGH', order: 1 },
  { modelName: 'Shotgun 650', yearFrom: 2024, yearTo: null, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 6, notes: 'Trocar junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Shotgun 650', yearFrom: 2024, yearTo: null, component: 'Velas ×2 (gap 0,7-0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Uma por cilindro, sempre em par.', priority: 'HIGH', order: 3 },
  { modelName: 'Shotgun 650', yearFrom: 2024, yearTo: null, component: 'Corrente — lubrificação', intervalKm: 500, intervalMonths: null, notes: 'Folga 20-30mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'Shotgun 650', yearFrom: 2024, yearTo: null, component: 'Filtro de ar (papel — trocar, não lavar)', intervalKm: 15000, intervalMonths: 12, notes: 'Não usar água ou solvente.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Shotgun 650', yearFrom: 2024, yearTo: null, component: 'Folga de válvulas (regulagem manual)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'Shotgun 650', yearFrom: 2024, yearTo: null, component: 'Embreagem — ajuste do cabo', intervalKm: 1000, intervalMonths: null, notes: 'Dureza inicial é comum.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Shotgun 650', yearFrom: 2024, yearTo: null, component: 'Pastilhas de freio (disco 320mm F / 300mm R)', intervalKm: 15000, intervalMonths: null, notes: 'Inspecionar a cada revisão.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Shotgun 650', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 9 },
  { modelName: 'Shotgun 650', yearFrom: 2024, yearTo: null, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar kit completo.', priority: 'MEDIUM', order: 10 },

  // SUPER METEOR 650
  { modelName: 'Super Meteor 650', yearFrom: 2023, yearTo: null, component: 'Óleo 15W-50 semissintético (~3,1L com filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'Mesmo motor da linha 650, uso touring pede atenção ao intervalo.', priority: 'HIGH', order: 1 },
  { modelName: 'Super Meteor 650', yearFrom: 2023, yearTo: null, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 6, notes: 'Trocar junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Super Meteor 650', yearFrom: 2023, yearTo: null, component: 'Velas ×2 (gap 0,7-0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Uma por cilindro, sempre em par. Iridium recomendado para uso touring frequente.', priority: 'HIGH', order: 3 },
  { modelName: 'Super Meteor 650', yearFrom: 2023, yearTo: null, component: 'Corrente — lubrificação', intervalKm: 500, intervalMonths: null, notes: 'Folga 20-30mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'Super Meteor 650', yearFrom: 2023, yearTo: null, component: 'Filtro de ar (papel — trocar, não lavar)', intervalKm: 15000, intervalMonths: 12, notes: 'Não usar água ou solvente.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Super Meteor 650', yearFrom: 2023, yearTo: null, component: 'Folga de válvulas (regulagem manual)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'Super Meteor 650', yearFrom: 2023, yearTo: null, component: 'Embreagem — ajuste do cabo', intervalKm: 1000, intervalMonths: null, notes: 'Dureza inicial é comum.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Super Meteor 650', yearFrom: 2023, yearTo: null, component: 'Suspensão traseira — ajuste de pré-carga (5 posições)', intervalKm: null, intervalMonths: null, notes: 'Regular conforme bagagem/carona antes de cada viagem longa.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Super Meteor 650', yearFrom: 2023, yearTo: null, component: 'Pastilhas de freio (disco 320mm F / 300mm R)', intervalKm: 15000, intervalMonths: null, notes: 'Inspecionar a cada revisão.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Super Meteor 650', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 10 },
  { modelName: 'Super Meteor 650', yearFrom: 2023, yearTo: null, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar kit completo.', priority: 'MEDIUM', order: 11 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Royal Enfield 650 Twins (Classic / Continental GT / Interceptor / Interceptor Bear / Shotgun / Super Meteor)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Royal Enfield', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'Royal Enfield', vehicleTypeId: motoType.id },
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
        yearFrom: null,
        yearTo: null,
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

  console.log('✅ Royal Enfield 650 Twins concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
