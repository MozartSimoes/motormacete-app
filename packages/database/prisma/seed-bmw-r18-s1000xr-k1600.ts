/**
 * Seed BMW — R 18, S 1000 XR, K 1600 GT/GTL/BAGGER
 * Macetes, problemas e manutenção para o cruiser Big Boxer, o sport-touring
 * inline-4 e a plataforma de touring de luxo inline-6 da BMW Motorrad.
 *
 * Fontes: bmw-motorrad.com.br, bmw-motorrad.com (specs oficiais), ManualsLib
 *         (manuais oficiais), advrider.com, k1600forum.com, reclameaqui.com.br,
 *         motorcycle.com, cycleworld.com
 *
 * Execute: pnpm --filter @motormacete/database db:seed:bmw-r18-s1000xr-k1600
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

// ─── R 18 ──────────────────────────────────────────────────────────────────

const R18_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Big Boxer 1802cc: o maior boxer que a BMW já fabricou — óleo 15W-50 sintético, ~4,5L',
    body: 'O motor Big Boxer da R 18 (1.802cc, refrigerado a ar e óleo, 91 cv a 4.750 RPM, 158 Nm a 3.000 RPM) é o maior boxer de dois cilindros já produzido pela BMW. Óleo recomendado: SAE 15W-50 API SL/JASO MA2 sintético — cerca de 4,5L com troca de filtro. BMW Advantec Ultimate ou equivalente Motul 7100 15W-50. Filtro de óleo alternativo: Hiflofiltro HF204RC ou Mahle equivalente (R$ 60–R$ 100) vs R$ 150+ do original na concessionária. Intervalo: 10.000 km ou 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Válvulas hidráulicas: o R 18 dispensa ajuste manual de válvulas — diferencial em relação às boxer GS/nineT',
    body: 'Diferente da R 1200 GS, R 1250 GS e R nineT (que exigem verificação de folga de válvulas a cada 10.000–20.000 km com desmontagem do cabeçote), o motor Big Boxer usa tuchos hidráulicos autoajustáveis (hydraulic valve lifters). Isso elimina a necessidade de regulagem manual de válvulas durante toda a vida útil do motor — uma economia significativa de tempo e dinheiro em revisões. Ainda assim, ruído metálico persistente do motor frio que não desaparece após aquecimento pode indicar tucho com desgaste — item raro, mas vale investigar em unidades com mais de 60.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Vela: 2 velas (uma por cilindro), troca a cada 20.000 km — acesso facilitado pelos cilindros expostos',
    body: 'A R 18 usa 2 velas NGK iridium (gap aproximado de 0,8 mm — confirme o código exato para o ano da sua moto no manual, pois a BMW ajustou a especificação em algumas revisões). Custo: R$ 100–R$ 180 por vela. Troca a cada 20.000 km. Vantagem prática: os cilindros do Big Boxer são os maiores e mais expostos de qualquer boxer BMW — o acesso às velas é mais fácil que em uma R 1250 GS, sem precisar remover carenagens.',
  },
  {
    severity: 'OK',
    title: 'Cardã (transmissão final): troque o óleo a cada 20.000 km — sistema robusto mas não é eterno',
    body: 'A R 18 usa transmissão final por cardã (eixo cardã), sem corrente para lubrificar. Troque o óleo do cardã a cada 20.000 km ou 24 meses: aproximadamente 180–200 ml de SAE 75W-90 GL-5 hipóide. Troque também o óleo do câmbio (6 marchas) no mesmo intervalo: ~0,8–1,0L de 75W-90 GL-5. Sintoma de óleo velho: engate mais duro em frio e ruído de "clunk" ao soltar a embreagem devagar em 1ª marcha.',
  },
  {
    severity: 'WARN',
    title: 'Peso de ~345 kg: manobra em baixa velocidade exige técnica — não se apoie só na força',
    body: 'A R 18 pesa cerca de 345 kg abastecida — significativamente mais pesada que uma R 1250 GS. Diferente do K 1600 GTL/Bagger, a R 18 NÃO tem marcha à ré elétrica assistida — o peso deve ser gerenciado só com técnica de piloto: embreagem no ponto de fricção, olhar sempre para onde quer ir (não para o chão), e usar o freio traseiro (não o dianteiro) em manobras de U em baixa velocidade. Pratique em estacionamento vazio antes de levar a moto para o trânsito. Barras de proteção de motor (engine guards) custam R$ 800–R$ 1.500 e evitam danos caros em tombos parados.',
  },
  {
    severity: 'OK',
    title: 'Peças cromadas: cuidado redobrado com o clima litorâneo brasileiro',
    body: 'A R 18 tem grande quantidade de peças cromadas (motor, escapamento, rodas nos acabamentos Classic/First Edition). Em cidades litorâneas (Rio, Santos, Recife, Florianópolis), a maresia acelera oxidação do cromo — pequenos pontos de ferrugem aparecem em meses se não houver cuidado. Recomendação: lave a moto com água doce após exposição à maresia, aplique cera específica para cromo a cada 30–60 dias, e evite guardar a moto ao ar livre perto do mar. Kits de polimento para cromo automotivo (Autoglym, Meguiar\'s) custam R$ 80–R$ 150 e resolvem oxidação leve.',
  },
  {
    severity: 'OK',
    title: 'R 18 100 Anos (2023): edição comemorativa com pintura e cromados exclusivos — mesma mecânica',
    body: 'A edição R 18 100 Anos, lançada em 2023 para celebrar o centenário da BMW Motorrad, usa exatamente o mesmo motor Big Boxer 1802cc e chassi da R 18 padrão — as diferenças são pintura exclusiva (tons de branco/preto ou cinza com detalhes dourados), acabamentos cromados adicionais e emblemas numerados. Toda a rotina de manutenção (óleo, velas, cardã) é idêntica à R 18 comum. Por ser edição limitada, peças de acabamento exclusivas (banco, tampas laterais) podem ter prazo de entrega maior via concessionária — mecânica e consumíveis seguem o estoque normal.',
  },
]

const R18_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Embreagem pesada em baixa velocidade + peso de 345 kg: quedas em manobra são o incidente mais comum',
    body: 'O incidente mais relatado por donos de R 18 não é mecânico — é o tombo em baixa velocidade ou parado (sair da moto, empurrar em ladeira, manobra em estacionamento). A combinação de peso elevado (345 kg), centro de gravidade baixo mas amplo, e embreagem com curso longo pega novatos de surpresa. Prevenção: instale barras de proteção de motor (R$ 800–R$ 1.500), pratique manobras lentas em local seguro, e ao estacionar em ladeira, sempre deixe a moto engatada em 1ª marcha (câmbio manual) com o guidão virado para o lado do declive.',
  },
  {
    severity: 'WARN',
    title: 'Folga inicial na transmissão ("clunk") ao engatar 1ª marcha — característica do cardã, não defeito',
    body: 'É comum ouvir um "clunk" metálico ao engatar a 1ª marcha ou soltar a embreagem de forma abrupta na R 18 — isso é característico de sistemas de transmissão final por cardã com boxer de grande torque, não um defeito isolado. Para minimizar: solte a embreagem suavemente, evite trocas bruscas. Se o ruído aumentar progressivamente ao longo de milhares de quilômetros ou vier acompanhado de vibração na roda traseira, verifique o kit de rolamentos e a junta universal do cardã — desgaste real requer diagnóstico em concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Garfo convencional (não invertido): mergulho perceptível em frenagens fortes',
    body: 'Ao contrário de motos esportivas com garfo invertido (USD), a R 18 usa garfo telescópico convencional de 49 mm — resultado: mergulho (dive) perceptível em frenagens fortes, típico de cruisers. Isso é esperado pelo projeto, mas pode ser suavizado com upgrade de mola progressiva ou óleo de garfo de viscosidade maior (aftermarket: Wilbers, Öhlins — R$ 1.500–R$ 3.000 o kit). Para uso urbano/estrada normal, o comportamento de fábrica é adequado — a maioria dos donos não sente necessidade de upgrade.',
  },
  {
    severity: 'WARN',
    title: 'Bateria de alta capacidade: motor de partida do Big Boxer exige bateria robusta — não economize',
    body: 'O motor 1802cc de alta compressão exige torque de partida elevado — a bateria original é de grande capacidade (AGM). Baterias genéricas subdimensionadas causam partida lenta ou falha em dias frios. Use sempre reposição AGM de capacidade igual ou superior à original (Yuasa YTX20-BS AGM ou equivalente, R$ 500–R$ 800). Em períodos de guarda prolongada (mais de 3 semanas), conecte carregador de manutenção CTEK ou Optimate em modo AGM.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível varia muito com o uso: 12–18 km/L dependendo da pilotagem',
    body: 'O tanque de 16L da R 18 combinado com consumo de 12–18 km/L (dependendo de pilotagem urbana com aceleração frequente ou estrada em velocidade constante) dá autonomia de 190–290 km. Planeje paradas mais frequentes em viagens longas comparado a motos com tanques maiores. A reserva ativa é pequena — não conte com mais de 20–30 km após a luz acender.',
  },
]

const R18_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma R 18: sem regulagem de válvulas, revisões mais simples que outras boxer BMW',
    body: '1.000 km — Revisão de rodagem obrigatória (dealer): óleo 15W-50 + filtro, aperto geral, checklist elétrico. | 10.000 km — Óleo 15W-50 sintético (4,5L) + filtro Hiflofiltro HF204RC, freios verificados, corrente/cardã lubrificados. | 20.000 km — Tudo do 10k + 2 velas NGK (gap ~0,8 mm), filtro de ar novo, óleo do cardã (75W-90, ~200 ml), óleo do câmbio (75W-90, ~0,9L), fluido de freio DOT 4 trocado. | 30.000 km — Tudo do 10k. | 40.000 km — Tudo do 20k + óleo de garfo. Sem regulagem de válvulas em nenhum intervalo — tuchos hidráulicos autoajustáveis.',
  },
]

// ─── S 1000 XR ───────────────────────────────────────────────────────────────

const S1000XR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'ShiftCam no motor da XR: mesma tecnologia da S 1000 RR e R 1250 GS — óleo sintético de qualidade é obrigatório',
    body: 'A partir da geração 2020, a S 1000 XR compartilha o motor inline-4 999cc com sistema ShiftCam (variação eletro-hidráulica de came) da S 1000 RR, entregando cerca de 165 cv (121 kW) a 11.000 RPM e 114 Nm a 9.250 RPM — só que com posição de pilotagem mais ereta e voltada para touring. Como no ShiftCam da R 1250 GS, use exclusivamente óleo sintético 5W-40 JASO MA2 de qualidade certificada (BMW Advantec Ultimate ou Motul 300V) e troque a cada 10.000 km sem exceções — óleo de qualidade inferior entope os canais do atuador.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 20L: a XR tem mais autonomia que a S 1000 RR/R para viagens longas',
    body: 'Diferente da S 1000 RR (16,5L) e S 1000 R (16,5L), a S 1000 XR foi projetada para touring com tanque de 20L. Com consumo médio de 16–19 km/L em estrada, a autonomia chega a 320–380 km — ideal para viagens longas sem depender de paradas frequentes. Combine com um GPS de rota que marque postos, já que a moto tem foco esportivo e nem toda concessionária BMW fica perto de rodovias.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 525: com 165 cv, desgaste é mais rápido que em motos de menor potência — lubrifique a cada 500 km',
    body: 'A S 1000 XR usa corrente 525 (mesma da S 1000 R/RR) mas empregada em uma moto de touring que roda mais quilômetros e carrega mais peso (bagageiro, garupa). Lubrifique a cada 500 km em uso normal, 300 km em chuva. Kit completo (corrente + pinhão + coroa): R$ 700–R$ 1.200 (DID ou RK), trocar a cada 20.000–25.000 km — menos que os 30.000 km da S 1000 RR pela maior carga de uso touring.',
  },
  {
    severity: 'OK',
    title: 'Quickshifter Pro de série: use acima de 4.000 RPM para trocas suaves, igual à S 1000 R',
    body: 'A S 1000 XR vem com Quickshifter Pro (troca sem embreagem, subindo e descendo marchas) de série. Para trocas mais suaves, use preferencialmente acima de 4.000 RPM — abaixo disso o sistema pode gaguejar em algumas unidades. A BMW disponibiliza atualizações de mapa do quickshifter via concessionária — solicite sempre nas revisões maiores (20.000/30.000 km).',
  },
  {
    severity: 'WARN',
    title: 'Para-brisa ajustável manualmente: mecanismo pode arranhar/afrouxar — não force com uma mão',
    body: 'O para-brisa ajustável em altura da S 1000 XR usa um mecanismo de trava manual que exige as duas mãos para deslizar sem forçar as guias laterais. Donos relatam folga e leve chacoalho no para-brisa após uso repetido com força excessiva de um lado só. Ajuste sempre com a moto parada, empurrando/puxando com pressão simétrica. Guias de plástico sobressalentes custam R$ 50–R$ 100 no ML caso trinquem.',
  },
  {
    severity: 'OK',
    title: 'Suspensão semi-ativa DDC (opcional): recalibre para peso e bagagem antes de viagens',
    body: 'A versão com Dynamic ESA/DDC (suspensão eletrônica semi-ativa) permite configurar pré-carga e amortecimento pelo menu do painel ou app BMW Motorrad Connected: piloto solo, piloto com bagagem, piloto e garupa. Configure antes de sair — suspensão calibrada para "piloto solo" com bagageiro cheio faz a moto "afundar" no traseiro e perder curso de suspensão em buracos. A recalibração leva menos de 1 minuto pelo menu.',
  },
]

const S1000XR_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'ShiftCam: atuador pode falhar — mesmo risco documentado na R 1250 GS',
    body: 'O atuador eletro-hidráulico do ShiftCam pode sofrer entupimento por sujeira em óleo de baixa qualidade ou trocado fora do intervalo, causando perda de potência em baixo RPM (moto "achatada"). Diagnóstico requer GS-911 ou scanner BMW. Prevenção: óleo sintético certificado sempre, trocado a cada 10.000 km sem estender. Reparo do atuador fora da garantia: R$ 2.000–R$ 5.000, o mesmo problema documentado na R 1250 GS que compartilha a tecnologia.',
  },
  {
    severity: 'WARN',
    title: 'Sensor TPMS: bateria interna dura ~5 anos — substituição exige sensor novo, não recarregável',
    body: 'A S 1000 XR tem monitoramento de pressão de pneus (TPMS) com sensores internos à roda. A bateria desses sensores não é substituível isoladamente — dura em média 5 anos, depois é preciso trocar o sensor inteiro (R$ 300–R$ 600 cada, são 2). Sintoma de bateria fraca: luz de TPMS piscando ou leitura intermitente no painel mesmo com pneus calibrados corretamente.',
  },
  {
    severity: 'WARN',
    title: 'Corrente com folga: em uso com garupa/bagagem, monitore tensão com mais frequência',
    body: 'Como moto de touring, a S 1000 XR frequentemente roda com garupa e bagagem — carga extra acelera o esticamento da corrente. Verifique a folga a cada 2.000–3.000 km em uso touring pesado (vs 5.000 km recomendado para uso solo). Folga fora da especificação (consulte o manual, tipicamente 25–35 mm) causa desgaste acelerado de pinhão/coroa e, em casos extremos, risco de a corrente saltar do pinhão.',
  },
  {
    severity: 'WARN',
    title: 'Bateria de lítio (a partir de determinado ano): carregador específico obrigatório',
    body: 'Assim como a S 1000 RR, unidades mais recentes da S 1000 XR podem vir de fábrica com bateria de lítio (LiFePO4). Nunca carregue com carregador de chumbo-ácido ou AGM convencional — danifica irreversivelmente a química de lítio. Use carregador com modo Lithium explícito (CTEK, Optimate Lithium). Verifique o tipo de bateria original na etiqueta antes de comprar carregador ou reposição.',
  },
  {
    severity: 'WARN',
    title: 'Vibração no guidão em rodovia: para-brisa mal ajustado pode gerar turbulência e cansaço',
    body: 'Alguns donos relatam vibração e turbulência de vento na altura do capacete em velocidades de rodovia (100–120 km/h) quando o para-brisa está na posição intermediária — a posição "meio-termo" pode criar turbulência pior que totalmente baixo ou totalmente alto. Teste as posições extremas em viagem longa antes de assumir que é defeito — normalmente a solução é ajuste de altura, não peça trocada.',
  },
]

const S1000XR_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma S 1000 XR: ShiftCam exige óleo rigoroso, corrente pede atenção redobrada em touring',
    body: '1.000 km — Revisão de rodagem obrigatória (dealer). | 10.000 km — Óleo 5W-40 sintético certificado (~4,4L) + filtro Hiflofiltro HF160 + corrente lubrificada e tensão verificada + freios. | 20.000 km — Tudo do 10k + fluido de freio e embreagem DOT 4 + filtro de ar + verificação do quickshifter (atualização de mapa se disponível). | 25.000 km — Kit corrente completo (corrente + pinhão + coroa) se desgastado. | 30.000 km — Tudo do 20k + 4 velas NGK LMAR9FI-10G + folga das 16 válvulas + óleo de garfo. | Sensores TPMS: substitua ao sinal de bateria fraca (~5 anos). Calibragem: 2,5 bar frente / 2,9 bar atrás (solo, frios).',
  },
]

// ─── K 1600 GT ───────────────────────────────────────────────────────────────

const K1600GT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor inline-6 1649cc: suave, potente (160 cv) e compartilhado com GTL e Bagger — óleo 5W-40, ~4,5L',
    body: 'O motor 6 cilindros em linha, refrigerado a líquido, de 1.649cc entrega cerca de 118 kW (160 cv) a 7.750 RPM e 175 Nm a 5.250 RPM — a assinatura sonora e a suavidade do inline-6 são a principal razão de ser da plataforma K 1600. Óleo: SAE 5W-40 API SL/JASO MA2 sintético, ~4,5L com filtro. BMW Advantec Ultimate ou Motul 7100 5W-40. Filtro alternativo: Hiflofiltro HF204RC ou Mahle equivalente (R$ 70–R$ 110). Troca a cada 10.000 km ou 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Reverse Assist opcional na GT (de série na GTL/Bagger): marcha à ré elétrica facilita manobras',
    body: 'A K 1600 GT pesa cerca de 325 kg abastecida — a BMW oferece o Reverse Assist (marcha à ré elétrica acionada por motor auxiliar) como opcional na GT, enquanto na GTL e na Bagger costuma vir de série dado o peso ainda maior. Se sua GT não tem o sistema, retrofit não é viável — é definido na fabricação. Sem o Reverse Assist, empurre a moto para trás sempre com o motor desligado e a mão firme no guidão, nunca tentando "acelerar em marcha à ré" no motor a combustão (a K 1600 não tem essa função sem o kit elétrico).',
  },
  {
    severity: 'OK',
    title: 'Plataforma compartilhada: peças de motor e transmissão intercambiáveis entre GT, GTL e Bagger',
    body: 'GT, GTL e Bagger compartilham o mesmo motor inline-6, câmbio de 6 marchas, cardã Paralever e garfo dianteiro Duolever. Filtro de óleo, velas, kit de correia auxiliar e óleo de cardã/câmbio são idênticos entre os três. O que muda é carenagem, banco, para-brisa, iluminação traseira e configuração de suspensão traseira — por isso um mecânico que já trabalhou em uma variante K 1600 já conhece 90% da mecânica das outras duas.',
  },
  {
    severity: 'WARN',
    title: 'Vela: 6 velas NGK, troca a cada 20.000 km — planeje o custo do jogo completo',
    body: 'O motor de 6 cilindros usa 6 velas NGK (gap aproximado de 0,8 mm). Custo por vela: R$ 80–R$ 150, totalizando R$ 500–R$ 900 o jogo completo a cada 20.000 km. É mais caro que um bicilíndrico, mas ainda razoável comparado ao custo total de posse de uma touring de luxo. Acesso: exige remoção parcial de carenagem lateral — reserve tempo extra ou negocie o valor de mão de obra com o mecânico.',
  },
  {
    severity: 'OK',
    title: 'Duolever dianteiro: suspensão sem mergulho em frenagem, manutenção diferente de garfo convencional',
    body: 'A K 1600 GT usa suspensão dianteira Duolever (braço articulado, similar em conceito ao Telelever da R GS) em vez de garfo telescópico tradicional — resultado: frenagem quase sem mergulho, mesmo em freadas fortes. Não há óleo de garfo para trocar como em motos convencionais; a manutenção se resume à inspeção de buchas e rolamentos do sistema a cada 40.000 km. Em caso de queda lateral, inspecione visualmente o braço do Duolever antes de seguir viagem.',
  },
  {
    severity: 'OK',
    title: 'GT: ergonomia mais esportiva dentro da família K 1600 — para-brisa mais baixo, banco a 750 mm',
    body: 'Dentro da linha K 1600, a GT é a variante mais orientada a pilotagem esportiva/touring rápida — para-brisa elétrico mais baixo que a GTL, banco a 750 mm de altura e configuração de suspensão ligeiramente mais firme. Para pilotos que valorizam curvas mais que conforto de garupa, a GT é a escolha certa dentro da plataforma; para conforto máximo em duas pessoas, a GTL entrega mais.',
  },
]

const K1600GT_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bateria AGM: drenagem por eletrônica embarcada em motos paradas por mais de 3 semanas',
    body: 'A quantidade de módulos eletrônicos (ABS Pro, ESA, TPMS, iluminação adaptativa, painel TFT) da K 1600 GT gera dreno de corrente mesmo com a moto desligada (~5–10 mA). Em guarda prolongada (mais de 3 semanas), a bateria AGM descarrega. Use carregador de manutenção CTEK ou Optimate em modo AGM. Bateria original: R$ 800–R$ 1.200. Nunca use carregador de chumbo-ácido convencional.',
  },
  {
    severity: 'WARN',
    title: 'Sensor TPMS: leituras intermitentes reportadas — verifique antes de assumir furo',
    body: 'Sensores de pressão de pneus (TPMS) da K 1600 GT ocasionalmente apresentam leituras intermitentes ou alarme falso, especialmente após troca de pneu em borracharia não familiarizada com sensores internos. Peça sempre para a borracharia reinstalar o sensor original (não descartar) ao trocar pneus. Recalibração do sistema após troca: procedimento simples via menu do painel, mas alguns modelos exigem ferramenta BMW.',
  },
  {
    severity: 'WARN',
    title: 'Motor do Reverse Assist: falhas raras mas documentadas em fóruns internacionais',
    body: 'O motor elétrico auxiliar do sistema Reverse Assist (quando equipado) tem histórico de falhas ocasionais reportadas em fóruns de proprietários (K1600Forum, advrider) após muitos ciclos de uso ou exposição prolongada a água em lavagens de alta pressão. Sintoma: sistema não engata ou trava parcialmente. Evite jato de alta pressão direcionado à área do motor de ré. Reparo fora de garantia: consulte concessionária, peça de reposição de custo elevado.',
  },
  {
    severity: 'WARN',
    title: 'Peso de ~325 kg: risco de tombo caro parado — barras de proteção são essenciais',
    body: 'Com 325 kg abastecida, um tombo parado na K 1600 GT facilmente resulta em R$ 3.000–R$ 8.000 em reparo de carenagem, espelho e proteção lateral. Instale barras de proteção de motor (crash bars) — R$ 1.000–R$ 2.000 — assim que possível após a compra. Ao estacionar em piso irregular ou macio (asfalto quente, grama), use sempre um calço sob o cavalete lateral.',
  },
  {
    severity: 'WARN',
    title: 'Motor elétrico do para-brisa: falhas de motor/trilho reportadas em unidades com muitos ciclos',
    body: 'O para-brisa ajustável eletricamente pode apresentar falha no motor ou nos trilhos de deslizamento após uso intenso (milhares de ciclos de subida/descida). Sintoma: para-brisa para de responder ao botão ou move-se de forma irregular/ruidosa. Diagnóstico: geralmente é o motor ou a cremalheira plástica — reparo em concessionária, R$ 500–R$ 1.500 dependendo da peça.',
  },
]

const K1600GT_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma K 1600 GT: inline-6 de baixo estresse, revisão a cada 10.000 km',
    body: '1.000 km — Revisão de rodagem obrigatória (dealer): óleo + filtro + checklist elétrico completo (muitos sistemas para validar). | 10.000 km — Óleo 5W-40 sintético (~4,5L) + filtro HF204RC + freios + cardã verificado. | 20.000 km — Tudo do 10k + 6 velas NGK + filtro de ar + folga de válvulas (24 válvulas) + óleo do cardã (75W-90, ~200 ml) + óleo do câmbio (75W-90, ~1,0L) + fluido de freio e embreagem DOT 4. | 40.000 km — Tudo do 20k + inspeção de buchas do Duolever. | Refrigerante: troque a cada 4 anos (BMW G12++/G13). Calibragem: 2,5 bar frente / 2,9 bar atrás (solo).',
  },
]

// ─── K 1600 GTL ──────────────────────────────────────────────────────────────

const K1600GTL_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo inline-6 1649cc da GT/Bagger — óleo 5W-40, ~4,5L, revisão a cada 10.000 km',
    body: 'A K 1600 GTL usa o mesmo motor 6 cilindros em linha 1.649cc (118 kW/160 cv a 7.750 RPM, 175 Nm a 5.250 RPM) da GT e da Bagger — a versão "full dress" da plataforma, com carenagem maior, baú traseiro integrado e banco de garupa mais confortável. Óleo, filtro e intervalos de manutenção são idênticos aos da GT: SAE 5W-40 sintético, ~4,5L, troca a cada 10.000 km/12 meses.',
  },
  {
    severity: 'OK',
    title: 'Reverse Assist de série: essencial dado o peso de ~348 kg da versão mais equipada da linha',
    body: 'Ao contrário da GT (onde o Reverse Assist é opcional), a GTL normalmente já sai de fábrica com o sistema de marcha à ré elétrica — faz sentido, já que é a variante mais pesada da família K 1600 (aproximadamente 348 kg abastecida com baú). Use o Reverse Assist sempre que precisar recuar em subida ou terreno irregular — evita o esforço físico de empurrar quase 350 kg sozinho.',
  },
  {
    severity: 'OK',
    title: 'Baú traseiro integrado (top case): trava e dobradiças pedem lubrificação periódica',
    body: 'O baú traseiro integrado da GTL (diferencial em relação à GT e à Bagger, que não trazem baú de série) tem mecanismo de trava e dobradiças metálicas expostas ao tempo. Lubrifique com spray de silicone (não graxa, que atrai poeira) a cada 6 meses ou antes de uma viagem longa. Trava emperrada em clima muito úmido é reclamação recorrente — um spray preventivo de WD-40 seco resolve a maioria dos casos.',
  },
  {
    severity: 'OK',
    title: 'Encosto de garupa ajustável: regule antes de cada viagem com passageiro diferente',
    body: 'A GTL tem encosto traseiro (passenger backrest) ajustável em ângulo e distância — item que diferencia a experiência de garupa em relação à GT e à Bagger. Antes de sair com um passageiro novo, ajuste a posição pelo mecanismo manual sob o banco. Encosto mal ajustado transmite mais fadiga ao passageiro em viagens longas e pode gerar reclamação de desconforto lombar.',
  },
  {
    severity: 'WARN',
    title: 'Vela: 6 velas NGK, troca a cada 20.000 km — mesmo custo da GT/Bagger',
    body: 'Assim como GT e Bagger, a GTL usa 6 velas NGK (gap ~0,8 mm), custo R$ 500–R$ 900 o jogo completo, trocadas a cada 20.000 km. Acesso exige remoção de parte da carenagem, mais trabalhosa na GTL pela carenagem maior — considere pedir orçamento de mão de obra maior que o de uma GT na mesma revisão.',
  },
  {
    severity: 'OK',
    title: 'Para-brisa maior: mais proteção contra vento, mas exige atenção a ruído aerodinâmico em alta velocidade',
    body: 'O para-brisa da GTL é maior que o da GT — mais proteção térmica e contra vento em viagens longas. Em compensação, alguns donos relatam mais ruído/turbulência sonora dentro do capacete acima de 120 km/h dependendo da altura ajustada. Teste diferentes posições em viagem — a posição de menor ruído nem sempre é a de maior proteção contra vento.',
  },
]

const K1600GTL_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Trava do baú traseiro: mecanismo pode emperrar — problema específico da GTL',
    body: 'Diferente da GT e da Bagger, a GTL tem baú traseiro integrado com fechadura própria. Em uso com exposição a chuva/maresia sem lubrificação preventiva, a trava pode emperrar ou exigir força excessiva para abrir. Lubrifique a cada 6 meses (ver macete acima). Em caso de emperramento total, não force a chave — procure assistência para evitar quebrar a chave dentro da fechadura.',
  },
  {
    severity: 'WARN',
    title: 'Peso de ~348 kg: a mais pesada da linha K 1600 — risco de tombo ainda maior que a GT',
    body: 'A GTL é a variante mais pesada da família K 1600 (~348 kg abastecida com baú e acessórios). Mesmas recomendações da GT em relação a barras de proteção (crash bars) e cuidado redobrado em manobras de baixa velocidade — mas com margem de erro ainda menor pelo peso extra. Recomenda-se fortemente o uso do Reverse Assist em qualquer manobra de ré, mesmo em piso plano.',
  },
  {
    severity: 'WARN',
    title: 'Bateria AGM: mesmo dreno elétrico da GT, agravado por mais acessórios elétricos (aquecimento de banco/punho)',
    body: 'A GTL costuma vir mais equipada em opcionais elétricos (banco aquecido, punhos aquecidos, tomada 12V adicional) — isso aumenta ligeiramente o dreno de bateria parada em comparação à GT. Use carregador de manutenção sempre que a moto ficar parada mais de 3 semanas. Bateria AGM original: R$ 800–R$ 1.200.',
  },
  {
    severity: 'WARN',
    title: 'Sensor TPMS: mesmo comportamento intermitente reportado na GT',
    body: 'Compartilhando a mesma plataforma eletrônica da GT, a GTL apresenta os mesmos relatos ocasionais de leitura intermitente do TPMS após trocas de pneu malfeitas. Sempre reinstale o sensor original ao trocar pneus, nunca descarte.',
  },
  {
    severity: 'WARN',
    title: 'Reverse Assist: mesmo risco de falha do motor auxiliar documentado na GT — uso mais frequente na GTL',
    body: 'Como a GTL usa o Reverse Assist com mais frequência (moto mais pesada, manobras mais difíceis sem o sistema), o desgaste acumulado do motor elétrico auxiliar tende a aparecer mais cedo que na GT. Evite lavagem de alta pressão direcionada à região do sistema.',
  },
]

const K1600GTL_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma K 1600 GTL: igual à GT no motor, com item extra de manutenção do baú',
    body: '1.000 km — Revisão de rodagem (dealer). | 10.000 km — Óleo 5W-40 (~4,5L) + filtro HF204RC + freios + cardã verificado. | 20.000 km — Tudo do 10k + 6 velas NGK + filtro de ar + folga de válvulas + óleo do cardã + óleo do câmbio + fluido de freio/embreagem DOT 4. | A cada 6 meses — Lubrificação da trava e dobradiças do baú traseiro. | 40.000 km — Inspeção de buchas do Duolever. | Refrigerante: a cada 4 anos. Calibragem: 2,5 bar frente / 2,9 bar atrás (solo) — atenção redobrada com garupa e baú cheio.',
  },
]

// ─── K 1600 BAGGER ───────────────────────────────────────────────────────────

const K1600BAGGER_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo inline-6 1649cc da GT/GTL — óleo 5W-40, ~4,5L, mesma revisão de 10.000 km',
    body: 'A K 1600 Bagger compartilha o motor 6 cilindros em linha 1.649cc (118 kW/160 cv a 7.750 RPM, 175 Nm a 5.250 RPM) com a GT e a GTL — a diferença é o estilo "American cruiser touring", com traseira sem baú integrado, banco mais baixo e visual mais robusto/escurecido. Óleo, filtro e cronograma de manutenção seguem exatamente o mesmo padrão da GT/GTL.',
  },
  {
    severity: 'OK',
    title: 'Banco mais baixo (~720 mm): acessibilidade melhor para pilotos de menor estatura',
    body: 'A Bagger tem altura de assento de aproximadamente 720 mm — mais baixa que os 750 mm da GT/GTL — resultado de uma configuração de suspensão traseira ajustada para o visual cruiser. Isso facilita apoiar os pés no chão para pilotos menores, mas reduz um pouco o curso de suspensão traseira disponível em comparação com a GT.',
  },
  {
    severity: 'OK',
    title: 'Reverse Assist de série: essencial no estilo cruiser sem baú de apoio traseiro para manobra',
    body: 'Assim como a GTL, a Bagger normalmente vem com Reverse Assist de série. Com ~341 kg abastecida e traseira estilo cruiser mais baixa, o uso do sistema elétrico de ré é recomendado em qualquer manobra em subida ou piso irregular.',
  },
  {
    severity: 'OK',
    title: 'Alforjes rígidos (saddlebags) sem baú central: capacidade de carga diferente da GTL',
    body: 'Diferente da GTL (que tem baú central + alforjes), a Bagger conta apenas com alforjes laterais rígidos, sem baú traseiro central — visual mais limpo, estilo americano. A capacidade de carga total é menor que a GTL — planeje bagagem de viagem considerando isso, ou avalie um bagageiro traseiro adicional (aftermarket, R$ 800–R$ 1.500) se precisar de mais espaço.',
  },
  {
    severity: 'OK',
    title: 'Vela: 6 velas NGK, troca a cada 20.000 km — mesmo custo da GT/GTL',
    body: 'Mesma especificação de vela (6× NGK, gap ~0,8 mm) e mesmo intervalo de 20.000 km das outras variantes K 1600. Custo do jogo completo: R$ 500–R$ 900. A carenagem reduzida da Bagger no visual cruiser pode, em alguns pontos, facilitar levemente o acesso comparado à GTL.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão traseira com curso reduzido: atenção redobrada em buracos e lombadas',
    body: 'A configuração de assento mais baixo da Bagger vem à custa de menor curso de suspensão traseira comparado à GT. Em pisos ruins ou lombadas altas, a sensação de "fundo" na suspensão é mais perceptível que na GT/GTL. Ajuste a pré-carga (manual ou eletrônica, conforme versão) para o peso do piloto + garupa antes de viagens — ajuda a compensar parte da limitação de curso.',
  },
]

const K1600BAGGER_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor do Reverse Assist: mesmo risco de falha reportado na GT/GTL',
    body: 'Compartilhando o mesmo sistema elétrico das outras variantes K 1600, a Bagger apresenta o mesmo histórico ocasional de falha no motor auxiliar de marcha à ré em uso intenso ou após lavagem de alta pressão mal direcionada. Evite jato direto na região do motor de ré.',
  },
  {
    severity: 'WARN',
    title: 'Ground clearance reduzido em curvas: banco baixo tira ângulo de inclinação disponível',
    body: 'A configuração de suspensão traseira mais baixa da Bagger (para o banco a ~720 mm) reduz ligeiramente a distância ao solo em curvas fechadas comparado à GT — pilotos que vêm de motos esportivas podem sentir a moto "raspando" mais cedo em curvas de raio pequeno. Isso é característica de projeto (estilo cruiser), não defeito — ajuste o ritmo de pilotagem em estradas sinuosas.',
  },
  {
    severity: 'WARN',
    title: 'Fecho dos alforjes rígidos: relatos de dificuldade de trava em clima frio/úmido',
    body: 'Donos relatam ocasionalmente dificuldade para travar/destravar os alforjes rígidos em temperaturas baixas ou após exposição a muita umidade — a borracha de vedação endurece e o mecanismo de trava fica mais duro. Lubrifique as dobradiças e o mecanismo de fecho com spray de silicone periodicamente, principalmente antes de viagens em regiões frias (Serra Gaúcha, Serra da Mantiqueira).',
  },
  {
    severity: 'WARN',
    title: 'Bateria AGM: mesmo dreno elétrico da GT/GTL — atenção em guarda prolongada',
    body: 'Mesma recomendação das outras variantes: use carregador de manutenção CTEK/Optimate em modo AGM sempre que a moto ficar parada mais de 3 semanas. Bateria original: R$ 800–R$ 1.200.',
  },
  {
    severity: 'WARN',
    title: 'Sensor TPMS: mesmo comportamento intermitente documentado nas outras K 1600',
    body: 'Compartilhando a plataforma eletrônica, a Bagger apresenta os mesmos relatos ocasionais de leitura intermitente do TPMS após trocas de pneu malfeitas — sempre reinstale o sensor original.',
  },
]

const K1600BAGGER_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma K 1600 Bagger: igual à GT/GTL no motor, com atenção extra à suspensão traseira e alforjes',
    body: '1.000 km — Revisão de rodagem (dealer). | 10.000 km — Óleo 5W-40 (~4,5L) + filtro HF204RC + freios + cardã verificado. | 20.000 km — Tudo do 10k + 6 velas NGK + filtro de ar + folga de válvulas + óleo do cardã + óleo do câmbio + fluido de freio/embreagem DOT 4. | Periodicamente — Lubrificação das dobradiças/fechos dos alforjes rígidos, principalmente antes de viagens para regiões frias/úmidas. | 40.000 km — Inspeção de buchas do Duolever + verificação do motor de Reverse Assist. | Refrigerante: a cada 4 anos. Calibragem: 2,5 bar frente / 2,7 bar atrás (solo) — ajuste de pré-carga traseira antes de viagens com garupa/carga pelo curso de suspensão reduzido.',
  },
]

// ─── Blocos de modelos ────────────────────────────────────────────────────────

const bmwModels: ModelBlock[] = [
  {
    modelName: 'R 18',
    yearFrom: 2020,
    yearTo: null,
    MACETES: R18_MACETES,
    PROBLEMAS: R18_PROBLEMAS,
    MANUTENCAO: R18_MANUTENCAO,
  },
  {
    modelName: 'S 1000 XR',
    yearFrom: 2015,
    yearTo: null,
    MACETES: S1000XR_MACETES,
    PROBLEMAS: S1000XR_PROBLEMAS,
    MANUTENCAO: S1000XR_MANUTENCAO,
  },
  {
    modelName: 'K 1600 GT',
    yearFrom: 2011,
    yearTo: null,
    MACETES: K1600GT_MACETES,
    PROBLEMAS: K1600GT_PROBLEMAS,
    MANUTENCAO: K1600GT_MANUTENCAO,
  },
  {
    modelName: 'K 1600 GTL',
    yearFrom: 2011,
    yearTo: null,
    MACETES: K1600GTL_MACETES,
    PROBLEMAS: K1600GTL_PROBLEMAS,
    MANUTENCAO: K1600GTL_MANUTENCAO,
  },
  {
    modelName: 'K 1600 BAGGER',
    yearFrom: 2018,
    yearTo: null,
    MACETES: K1600BAGGER_MACETES,
    PROBLEMAS: K1600BAGGER_PROBLEMAS,
    MANUTENCAO: K1600BAGGER_MANUTENCAO,
  },
]

// ─── Calibragem de pneus ──────────────────────────────────────────────────────

const bmwTirePressures: TirePressureInput[] = [
  {
    modelName: 'R 18',
    yearFrom: 2020,
    yearTo: null,
    tireSize: 'Dianteiro 120/70 R19 | Traseiro 180/65 B16',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: 36,
    rearPsiLoad: 43,
    notes: 'Cruiser pesada (~345 kg) — nunca rode com pressão abaixo do recomendado, pois o peso deforma o pneu rapidamente com pressão baixa. Traseiro 180/65 B16 é medida típica de cruiser grande, com boa disponibilidade no Brasil (Pirelli Night Dragon, Metzeler Marathon). Solo: 36/42 PSI. Com garupa: 36/43 PSI. Verifique sempre com pneus frios.',
  },
  {
    modelName: 'S 1000 XR',
    yearFrom: 2015,
    yearTo: null,
    tireSize: 'Dianteiro 120/70 ZR17 | Traseiro 190/55 ZR17',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: 36,
    rearPsiLoad: 46,
    notes: 'Mesma medida da S 1000 R/RR — pneus esportivos de alta performance com boa disponibilidade (Pirelli Diablo Rosso IV, Michelin Power GP2, Bridgestone Battlax). Solo: 36/42 PSI frios. Com garupa e bagageiro cheio (uso touring): 36/46 PSI no traseiro. Verificar sempre frio, moto parada há mais de 2h.',
  },
  {
    modelName: 'K 1600 GT',
    yearFrom: 2011,
    yearTo: null,
    tireSize: 'Dianteiro 120/70 ZR17 | Traseiro 190/55 ZR17',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: 38,
    rearPsiLoad: 49,
    notes: 'Medida compartilhada entre GT, GTL e Bagger. Solo: 36/42 PSI. Com garupa e bagagem (uso touring pesado, comum na GT): 38/49 PSI — a moto pesada exige atenção redobrada à pressão traseira com carga máxima. Pneus recomendados: Metzeler Roadtec 01, Bridgestone Battlax T32 GT, Michelin Road 6 GT.',
  },
  {
    modelName: 'K 1600 GTL',
    yearFrom: 2011,
    yearTo: null,
    tireSize: 'Dianteiro 120/70 ZR17 | Traseiro 190/55 ZR17',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: 38,
    rearPsiLoad: 50,
    notes: 'Mesma medida da GT/Bagger. Sendo a variante mais pesada da linha (~348 kg com baú), a pressão traseira com garupa e bagagem completa (baú + alforjes) deve ficar em 50 PSI para não deformar o pneu sob carga máxima. Solo: 36/42 PSI. Verifique com mais frequência em viagens longas de dois.',
  },
  {
    modelName: 'K 1600 BAGGER',
    yearFrom: 2018,
    yearTo: null,
    tireSize: 'Dianteiro 120/70 ZR17 | Traseiro 190/55 ZR17',
    frontPsi: 36,
    rearPsi: 40,
    frontPsiLoad: 36,
    rearPsiLoad: 46,
    notes: 'Mesma medida de pneu da GT/GTL, mas a configuração de suspensão traseira mais baixa/macia da Bagger costuma rodar com 2 PSI a menos no traseiro em uso solo (40 PSI) para manter o perfil de contato correto com o curso reduzido. Com garupa e alforjes carregados: 36/46 PSI. Confirme sempre com a etiqueta de calibragem na moto, pois a configuração pode variar por ano/mercado.',
  },
]

// ─── Cronogramas de manutenção ────────────────────────────────────────────────

const bmwMaintenanceItems: MaintenanceItemInput[] = [

  // ── R 18 ───────────────────────────────────────────────────────────────────
  { modelName: 'R 18', yearFrom: 2020, yearTo: null, order: 0,
    component: 'Óleo do motor (15W-50 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: ~4,5L com filtro. SAE 15W-50 API SL/JASO MA2. BMW Advantec Ultimate ou Motul 7100 15W-50. Filtro alternativo: Hiflofiltro HF204RC.' },
  { modelName: 'R 18', yearFrom: 2020, yearTo: null, order: 1,
    component: 'Vela (2 velas, gap ~0,8 mm)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'NGK iridium — confirme código exato para o ano no manual. Acesso facilitado pelos cilindros expostos do Big Boxer.' },
  { modelName: 'R 18', yearFrom: 2020, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca a cada 20.000 km, junto com as velas.' },
  { modelName: 'R 18', yearFrom: 2020, yearTo: null, order: 3,
    component: 'Óleo do cardã (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'HIGH',
    notes: '~200 ml de SAE 75W-90 GL-5 hipóide. Sistema de cardã robusto mas requer troca periódica.' },
  { modelName: 'R 18', yearFrom: 2020, yearTo: null, order: 4,
    component: 'Óleo do câmbio (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'MEDIUM',
    notes: '~0,9L de 75W-90 GL-5. Troque junto com o cardã.' },
  { modelName: 'R 18', yearFrom: 2020, yearTo: null, order: 5,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos.' },
  { modelName: 'R 18', yearFrom: 2020, yearTo: null, order: 6,
    component: 'Óleo de garfo (bengala dianteira)', intervalKm: 40000, intervalMonths: null, priority: 'LOW',
    notes: 'Garfo telescópico convencional (49 mm). Troca a cada 40.000 km. Inspecione retentores para vazamento a cada revisão.' },
  { modelName: 'R 18', yearFrom: 2020, yearTo: null, order: 7,
    component: 'Peças cromadas — inspeção e cuidado preventivo', intervalKm: null, intervalMonths: 6, priority: 'LOW',
    notes: 'Aplicação de cera para cromo a cada 30–60 dias em regiões litorâneas. Inspecione a cada 6 meses para oxidação precoce.' },

  // ── S 1000 XR ──────────────────────────────────────────────────────────────
  { modelName: 'S 1000 XR', yearFrom: 2015, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético — ShiftCam exige qualidade)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: ~4,4L com filtro. BMW Advantec Ultimate 5W-40 obrigatório para ShiftCam (a partir da geração 2020). Filtro: Hiflofiltro HF160.' },
  { modelName: 'S 1000 XR', yearFrom: 2015, yearTo: null, order: 1,
    component: 'Vela NGK LMAR9FI-10G (4 velas)', intervalKm: 30000, intervalMonths: null, priority: 'HIGH',
    notes: '4 velas (motor 4 cilindros). Custo ~R$ 800+ o jogo. Troca a cada 30.000 km.' },
  { modelName: 'S 1000 XR', yearFrom: 2015, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 30000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca a cada 30.000 km.' },
  { modelName: 'S 1000 XR', yearFrom: 2015, yearTo: null, order: 3,
    component: 'Folga das válvulas (16 válvulas)', intervalKm: 30000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor DOHC 4 cilindros com ShiftCam: 16 válvulas. Verificação a cada 30.000 km — serviço complexo, mecânico especializado.' },
  { modelName: 'S 1000 XR', yearFrom: 2015, yearTo: null, order: 4,
    component: 'Corrente 525 — lubrificação', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'A cada 500 km (300 km em chuva). Desgaste mais rápido que motos de menor potência.' },
  { modelName: 'S 1000 XR', yearFrom: 2015, yearTo: null, order: 5,
    component: 'Kit corrente completo (corrente + pinhão + coroa)', intervalKm: 22500, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Troca a cada 20.000–25.000 km em uso touring — menos que a S 1000 RR pela maior carga de uso.' },
  { modelName: 'S 1000 XR', yearFrom: 2015, yearTo: null, order: 6,
    component: 'Fluido de freio e embreagem (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos. Embreagem hidráulica: DOT 4 também.' },
  { modelName: 'S 1000 XR', yearFrom: 2015, yearTo: null, order: 7,
    component: 'Óleo de garfo', intervalKm: 30000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Troca a cada 30.000 km.' },
  { modelName: 'S 1000 XR', yearFrom: 2015, yearTo: null, order: 8,
    component: 'Sensores TPMS — substituição de bateria', intervalKm: null, intervalMonths: 60, priority: 'LOW',
    notes: 'Bateria interna dura cerca de 5 anos, não é substituível isoladamente — troca do sensor inteiro (R$ 300–R$ 600 cada).' },

  // ── K 1600 GT ──────────────────────────────────────────────────────────────
  { modelName: 'K 1600 GT', yearFrom: 2011, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: ~4,5L com filtro. BMW Advantec Ultimate 5W-40 ou Motul 7100 5W-40. Filtro: Hiflofiltro HF204RC.' },
  { modelName: 'K 1600 GT', yearFrom: 2011, yearTo: null, order: 1,
    component: 'Vela (6 velas, gap ~0,8 mm)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor inline-6 = 6 velas NGK. Custo R$ 500–900 o jogo. Acesso exige remoção parcial de carenagem.' },
  { modelName: 'K 1600 GT', yearFrom: 2011, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca a cada 20.000 km, junto com as velas.' },
  { modelName: 'K 1600 GT', yearFrom: 2011, yearTo: null, order: 3,
    component: 'Folga de válvulas (24 válvulas)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor inline-6 DOHC: 24 válvulas. Verificação a cada 20.000 km com motor frio.' },
  { modelName: 'K 1600 GT', yearFrom: 2011, yearTo: null, order: 4,
    component: 'Óleo do cardã (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'HIGH',
    notes: '~200 ml de SAE 75W-90 GL-5. Transmissão final Paralever.' },
  { modelName: 'K 1600 GT', yearFrom: 2011, yearTo: null, order: 5,
    component: 'Óleo do câmbio (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'MEDIUM',
    notes: '~1,0L de 75W-90 GL-5. Troque junto com o cardã.' },
  { modelName: 'K 1600 GT', yearFrom: 2011, yearTo: null, order: 6,
    component: 'Fluido de freio e embreagem (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos.' },
  { modelName: 'K 1600 GT', yearFrom: 2011, yearTo: null, order: 7,
    component: 'Refrigerante (troca completa)', intervalKm: null, intervalMonths: 48, priority: 'LOW',
    notes: 'A cada 4 anos. BMW G12++ ou G13.' },
  { modelName: 'K 1600 GT', yearFrom: 2011, yearTo: null, order: 8,
    component: 'Bateria AGM — inspeção e carga de manutenção', intervalKm: null, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Alta carga eletrônica embarcada gera dreno em repouso. Use carregador com modo AGM em paradas superiores a 3 semanas.' },

  // ── K 1600 GTL ─────────────────────────────────────────────────────────────
  { modelName: 'K 1600 GTL', yearFrom: 2011, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: ~4,5L com filtro. Idêntico à GT. Filtro: Hiflofiltro HF204RC.' },
  { modelName: 'K 1600 GTL', yearFrom: 2011, yearTo: null, order: 1,
    component: 'Vela (6 velas, gap ~0,8 mm)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Mesma especificação da GT. Acesso mais trabalhoso pela carenagem maior.' },
  { modelName: 'K 1600 GTL', yearFrom: 2011, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca a cada 20.000 km.' },
  { modelName: 'K 1600 GTL', yearFrom: 2011, yearTo: null, order: 3,
    component: 'Folga de válvulas (24 válvulas)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Verificação a cada 20.000 km com motor frio.' },
  { modelName: 'K 1600 GTL', yearFrom: 2011, yearTo: null, order: 4,
    component: 'Óleo do cardã e do câmbio (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'HIGH',
    notes: 'Cardã ~200 ml + câmbio ~1,0L, ambos 75W-90 GL-5.' },
  { modelName: 'K 1600 GTL', yearFrom: 2011, yearTo: null, order: 5,
    component: 'Fluido de freio e embreagem (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos.' },
  { modelName: 'K 1600 GTL', yearFrom: 2011, yearTo: null, order: 6,
    component: 'Trava e dobradiças do baú traseiro — lubrificação', intervalKm: null, intervalMonths: 6, priority: 'LOW',
    notes: 'Item exclusivo da GTL (baú integrado). Use spray de silicone, não graxa. Evita emperramento em clima úmido.' },
  { modelName: 'K 1600 GTL', yearFrom: 2011, yearTo: null, order: 7,
    component: 'Bateria AGM — inspeção e carga de manutenção', intervalKm: null, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Dreno elétrico ligeiramente maior que a GT pelos opcionais elétricos (banco/punho aquecidos).' },

  // ── K 1600 BAGGER ──────────────────────────────────────────────────────────
  { modelName: 'K 1600 BAGGER', yearFrom: 2018, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: ~4,5L com filtro. Idêntico à GT/GTL. Filtro: Hiflofiltro HF204RC.' },
  { modelName: 'K 1600 BAGGER', yearFrom: 2018, yearTo: null, order: 1,
    component: 'Vela (6 velas, gap ~0,8 mm)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Mesma especificação da GT/GTL.' },
  { modelName: 'K 1600 BAGGER', yearFrom: 2018, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca a cada 20.000 km.' },
  { modelName: 'K 1600 BAGGER', yearFrom: 2018, yearTo: null, order: 3,
    component: 'Folga de válvulas (24 válvulas)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Verificação a cada 20.000 km com motor frio.' },
  { modelName: 'K 1600 BAGGER', yearFrom: 2018, yearTo: null, order: 4,
    component: 'Óleo do cardã e do câmbio (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'HIGH',
    notes: 'Cardã ~200 ml + câmbio ~1,0L, ambos 75W-90 GL-5.' },
  { modelName: 'K 1600 BAGGER', yearFrom: 2018, yearTo: null, order: 5,
    component: 'Fluido de freio e embreagem (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos.' },
  { modelName: 'K 1600 BAGGER', yearFrom: 2018, yearTo: null, order: 6,
    component: 'Fechos e dobradiças dos alforjes rígidos — lubrificação', intervalKm: null, intervalMonths: 6, priority: 'LOW',
    notes: 'Evita emperramento em clima frio/úmido. Use spray de silicone.' },
  { modelName: 'K 1600 BAGGER', yearFrom: 2018, yearTo: null, order: 7,
    component: 'Motor de Reverse Assist — verificação', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Sistema de série na Bagger, usado com mais frequência pelo peso do modelo. Evite lavagem de alta pressão direcionada.' },
]

// ─── Runner ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed BMW R 18 / S 1000 XR / K 1600 iniciando...\n')

  const motoType = await prisma.vehicleType.upsert({
    where: { slug: 'moto' },
    update: {},
    create: { slug: 'moto', label: 'Moto' },
  })

  const bmwBrand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BMW', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'BMW', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${bmwBrand.name}`)

  for (const block of bmwModels) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: bmwBrand.id } },
      update: {},
      create: { name: block.modelName, brandId: bmwBrand.id },
    })

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })

    const allTips: { cat: Cat; tip: TipInput }[] = [
      ...block.MACETES.map(t => ({ cat: 'MACETES' as Cat, tip: t })),
      ...block.PROBLEMAS.map(t => ({ cat: 'PROBLEMAS' as Cat, tip: t })),
      ...block.MANUTENCAO.map(t => ({ cat: 'MANUTENCAO' as Cat, tip: t })),
    ]

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

    const counts = {
      m: block.MACETES.length,
      p: block.PROBLEMAS.length,
      mt: block.MANUTENCAO.length,
    }
    console.log(
      `  🔧 ${block.modelName} (${block.yearFrom ?? '?'}–${block.yearTo ?? 'atual'}): ` +
      `${counts.m} macetes, ${counts.p} problemas, ${counts.mt} manutenção`,
    )
  }

  console.log('\n  📏 Calibragem de pneus...')
  for (const tp of bmwTirePressures) {
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
    console.log(`  ✅ ${tp.modelName}: ${tp.frontPsi}/${tp.rearPsi} PSI`)
  }

  console.log('\n  🔧 Cronogramas de manutenção...')
  const modelNames = [...new Set(bmwMaintenanceItems.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: bmwMaintenanceItems.map(item => ({
      modelName: item.modelName,
      yearFrom: item.yearFrom,
      yearTo: item.yearTo,
      component: item.component,
      intervalKm: item.intervalKm,
      intervalMonths: item.intervalMonths,
      notes: item.notes,
      priority: item.priority,
      order: item.order,
    })),
  })
  for (const name of modelNames) {
    const count = bmwMaintenanceItems.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = bmwModels.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed BMW R 18 / S 1000 XR / K 1600 concluído: ${bmwModels.length} modelos, ${totalTips} dicas, ${bmwTirePressures.length} calibragens, ${bmwMaintenanceItems.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
