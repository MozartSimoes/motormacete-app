// seed-daelim.ts — Daelim: Altino 100cc, Message 50cc, VC 125 Advanced, VF 125 D,
// VS 125 Custom, VT 125 Custom (Magma), VX 125
//
// Daelim é fabricante sul-coreana que teve importação oficial no Brasil entre o
// fim dos anos 1990 e meados dos 2010, principalmente com scooters pequenas
// (Altino, Message) e "mini custom" 125cc de cilindro único refrigerado a ar
// (VC/VS/VT/VX — família que compartilha bloco de motor, e a VF 125 D, versão
// naked/street da mesma base). A importação oficial encolheu bastante — hoje a
// maior parte da frota é de motos usadas, com rede de peças oficiais escassa.
// Por isso o conteúdo aqui dá peso extra a compatibilidade de peças genéricas e
// garimpo em desmanches/mercado paralelo.
//
// Fontes: soymotero.net, custom125.com (fórum específico de custom 125cc),
//         motonline.com.br (guia de modelos), autoevolution.com, moto-data.net,
//         daelimparts.com / koreanbikeparts.com (compatibilidade de peças),
//         50factory.com, revista.moto.com.br, Reclame Aqui, grupos Daelim Brasil
//         no Facebook, fóruns de motociclismo (iMotor, Webmotors).
// Algumas especificações de modelos menos documentados (ex.: VX 125) são
// estimativas plausíveis baseadas na família de motores compartilhada — marcadas
// como estimativa no texto.
//
// Execute: pnpm --filter @motormacete/database db:seed:daelim
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

// ─── ALTINO 100cc ──────────────────────────────────────────────────────────────
// Motor: monocilíndrico 4T SOHC 2 válvulas, ar-refrigerado, ~100cc | ~7,5 cv
// Transmissão: manual de 4 marchas com embreagem centrífuga automática (sem manete
// de embreagem — "semi-automática", incomum no Brasil) | corrente 415
// Freios: disco dianteiro pequeno / tambor traseiro | Partida elétrica + pedal
// Consumo: 30–40 km/l (um dos scooters mais econômicos já vendidos no Brasil)

const ALTINO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Embreagem centrífuga automática: sem manete, mas exige óleo JASO MA correto',
    body: 'A Altino 100cc tem câmbio manual de 4 marchas, mas sem manete de embreagem — a embreagem é centrífuga e automática, engatando sozinha conforme a rotação sobe (troca-se só o pedal/pé de marcha). Como a embreagem fica banhada no óleo do motor, é obrigatório usar óleo JASO MA — nunca JASO MB (o tipo "escorregadio" usado em scooter CVT comum) sob risco de a embreagem patinar e a moto "não puxar". Use 20W-50 mineral ou semissintético JASO MA de moto, nunca óleo de scooter automático genérico vendido para CVT.',
  },
  {
    severity: 'OK',
    title: 'Óleo: ~0,8L de 20W-50, troca a cada 2.000 km — motor pequeno esquenta rápido no trânsito',
    body: 'O motor de ~100cc a ar da Altino tem capacidade de óleo pequena (aproximadamente 0,8L) e por isso satura e degrada mais rápido que motores maiores. Recomendação de proprietários e oficinas especializadas em scooters antigas: troque a cada 2.000 km, não os 3.000 km "genéricos" de motos maiores. Marcas acessíveis: Lubrax Moto 4T 20W-50, Shell Advance 4T 20W-50. Sempre motor frio ao verificar o nível pela vareta/visor.',
  },
  {
    severity: 'OK',
    title: 'Vela equivalente NGK C7HSA — gap 0,6–0,7mm, troca a cada 6.000 km',
    body: 'A vela original da Altino é de referência similar à NGK C7HSA (rosca curta, motor de baixa cilindrada). Gap: 0,6–0,7mm. Custo: R$ 15–25. Como a peça original Daelim é praticamente impossível de achar em loja de balcão, use o equivalente genérico por medida de rosca e alcance térmico — qualquer oficina de scooter chinesa/coreana da época sabe identificar. Troque a cada 6.000 km — sinais de vela gasta: partida a frio difícil e fumaça leve na saída do escapamento.',
  },
  {
    severity: 'OK',
    title: 'Corrente pequena passo 415: lubrifique a cada 500 km, é o ponto fraco do trem de força',
    body: 'A Altino usa corrente de passo miúdo (415), típica de scooters/motos pequenas com pouco torque. É barata (kit completo corrente + pinhão + coroa: R$ 60–120) mas desgasta rápido se não lubrificada — a cada 500 km ou sempre após pegar chuva. Folga: 15–20mm no trecho inferior (menor que motos de 125cc+ por ser corrente mais fina). Corrente seca nesse porte de moto causa ruído de "chicoteio" audível já em baixa velocidade.',
  },
  {
    severity: 'WARN',
    title: 'Peças escassas: procure por "motor scooter 100cc 4 tempos" genérico, não só "Daelim"',
    body: 'A Daelim encerrou a importação oficial da linha Altino há anos — peças com código de fábrica praticamente não existem em estoque no Brasil. Como o motor é um 4 tempos ar-refrigerado de arquitetura simples, muita peça de desgaste (pistão, anéis, retentores, jogo de juntas) tem equivalente genérico vendido para scooters chinesas/coreanas de cilindrada semelhante da mesma época — pesquise pela medida (diâmetro do pistão, medida do retentor) em vez do nome da marca. Grupos "Daelim Brasil" no Facebook e fóruns de scooter antigo ajudam a identificar equivalências confirmadas por outros donos.',
  },
  {
    severity: 'OK',
    title: 'Pneus pequenos: aro dianteiro/traseiro reduzido tem menos opção — pesquise antes de precisar',
    body: 'A Altino usa rodas de aro pequeno, típicas de scooter urbano compacto. A oferta de pneus nessa medida encolheu no Brasil com a saída de vários modelos similares de linha — não fique sem procurar até faltar. Marcas que ainda produzem medidas de scooter pequeno: Rinaldi, Levorin, Pirelli (linha scooter urbano). Leve a medida exata gravada na lateral do pneu atual para a loja — scooters pequenas de origem asiática desse período às vezes têm variações discretas de medida entre lotes.',
  },
  {
    severity: 'OK',
    title: 'Consumo de 30–40 km/l: mantenha filtro de ar limpo e pressão dos pneus em dia para não perder isso',
    body: 'A Altino é um dos veículos a gasolina mais econômicos já vendidos no Brasil — 30 a 40 km/l em uso urbano moderado. Para manter essa marca: filtro de ar limpo (obstrução engorda a mistura e aumenta consumo), pressão de pneus sempre calibrada (pneu murcho aumenta o atrito de rolamento sensivelmente num veículo tão leve) e vela sem depósito de carvão. Consumo caindo abaixo de 25 km/l é sinal de carburador desregulado ou filtro de ar entupido — não é normal na Altino.',
  },
]

const ALTINO_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e retificador/regulador: peças elétricas com código Daelim fora de linha',
    body: 'O CDI (módulo de ignição) e o retificador/regulador da Altino são itens com numeração exclusiva Daelim sem fabricação atual. Se o CDI falhar (sintoma: moto não pega, sem faísca na vela), procure CDI genérico de scooter/moto pequena por contagem de pinos e voltagem — muitos modelos chineses/coreanos de 100–125cc compartilham pinagem. Leve o CDI antigo (mesmo quebrado) para comparar fisicamente com o candidato antes de comprar. Retificador: busque por "retificador regulador scooter 100cc" com a mesma configuração de fios da peça original.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor do eixo de manivela — comum acima de 15.000 km',
    body: 'Com o uso, o retentor do eixo de manivela (lado do volante do motor) começa a ressecar e vazar óleo pela lateral do motor. Sintoma: mancha de óleo característica embaixo do carter, nível de óleo caindo mais rápido que o normal sem fumaça visível no escapamento. Retentor genérico de mesma medida resolve — troca simples para mecânico experiente com motor pequeno, cerca de 1h de serviço. Não adie: nível de óleo baixo em motor de embreagem centrífuga acelera o desgaste dos discos de embreagem.',
  },
  {
    severity: 'WARN',
    title: 'Conectores elétricos oxidados: sintomas elétricos "fantasmas" após alguns anos',
    body: 'O chicote elétrico da Altino, como o de muitas motos pequenas importadas da época, usa conectores de qualidade básica que oxidam com o tempo — principalmente em regiões litorâneas ou úmidas. Sintomas: lanterna intermitente, buzina fraca, partida elétrica que falha só às vezes. Solução: desmontar os conectores acessíveis, limpar com spray de contato elétrico e aplicar graxa dielétrica nos terminais. Persistindo o problema num ponto específico, troque o conector por um genérico de mesma bitola (R$ 5–10).',
  },
  {
    severity: 'WARN',
    title: 'Embreagem centrífuga desgastada: trepidação ou engate brusco ao sair do ponto morto',
    body: 'Com o desgaste dos discos/sapatas da embreagem centrífuga, o engate da 1ª marcha fica brusco (a moto "pula" para frente) ou, no sentido oposto, patina em subida (moto acelera sem ganhar velocidade proporcional). Isso não se resolve com ajuste de cabo (não existe cabo de embreagem nesse sistema) — é desgaste mecânico interno que exige abertura do motor para inspeção das sapatas/mola. Se notar esses sintomas, não prolongue o uso: a patinação prolongada aquece e desgasta ainda mais rápido o conjunto.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito parado: motor a ar sofre mais em engarrafamento longo',
    body: 'Por ser refrigerado só a ar (sem ventoinha auxiliar na maioria das unidades), a Altino aquece mais que o normal em engarrafamento parado sob sol forte. Sintomas: cheiro de óleo quente, dificuldade de reengatar em ponto morto, leve perda de potência até esfriar. Evite ficar em ponto morto com o motor ligado por mais de 3–5 minutos parado no sol — desligue e ligue de novo quando o trânsito andar. Óleo em bom estado e no nível correto amortece bastante esse efeito.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro a tambor perde eficiência com o desgaste da lona sem aviso claro',
    body: 'O freio traseiro a tambor da Altino não tem indicador de desgaste visual óbvio como um disco — a lona vai perdendo espessura aos poucos e o freio "amolece" gradualmente, o que muitos donos só percebem numa frenagem de emergência. Abra o tambor para inspeção visual a cada 6.000 km. Lona genérica de tambor pequeno (mesma medida de diâmetro/largura) resolve, custo baixo (R$ 20–40 o jogo). Regule o cabo/haste do freio traseiro sempre que sentir curso excessivo no pedal.',
  },
]

const ALTINO_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Altino 100cc: intervalos curtos, mas serviço barato e rápido',
    body: '500 km — Troca de óleo inicial de rodagem (20W-50, ~0,8L). | 2.000 km — Troca de óleo. Verificar folga e lubrificar corrente 415. | 4.000 km — Troca de óleo. Limpeza do filtro de ar. Verificar gap da vela (0,6–0,7mm). | 6.000 km — Troca de vela (equivalente NGK C7HSA). Inspeção da lona do freio traseiro. | 8.000 km — Troca de óleo + filtro de ar (se descartável). Verificar folga de válvulas. | 10.000 km — Kit corrente 415 completo se desgastado. Inspeção do retentor do eixo de manivela. | 15.000 km — Revisão geral do sistema elétrico (conectores) e da embreagem centrífuga.',
  },
]

// ─── MESSAGE 50cc ───────────────────────────────────────────────────────────────
// Motor: monocilíndrico 2 tempos ar-refrigerado, 49cc, injeção de óleo automática (mistura via bomba)
// Transmissão: CVT automática (variador + correia + embreagem centrífuga)
// Freios: tambor / tambor | Pneus: 3.00-10 (F) / 3.00-10 (R) | Tanque: 4,8L | Peso seco: ~85 kg

const MESSAGE_MACETES: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor 2 tempos com bomba de óleo automática — NUNCA deixe o reservatório de óleo secar',
    body: 'A Message 50cc é um dos poucos modelos da linha com motor 2 tempos — a lubrificação é feita por uma bomba que injeta óleo 2T automaticamente misturado à gasolina (sistema "autolube"), separado do tanque de combustível. Isso é diferente de qualquer outro Daelim da lista. Reservatório de óleo 2T vazio = motor rodando sem lubrificação interna = fundição do motor em minutos, não em quilômetros. Verifique o nível do reservatório de óleo 2T a cada abastecimento de gasolina — é tão importante quanto olhar o combustível. Use óleo 2T sintético API TC de qualidade (Mobil 2T, Motul 800 2T, Lubrax 2T) — óleo 2T ruim entope a bomba dosadora.',
  },
  {
    severity: 'OK',
    title: 'Vela equivalente NGK BR8HS: motor 2T "engorda" de carvão com facilidade — troque cedo',
    body: 'A vela da Message tem referência equivalente à NGK BR8HS (motores 2 tempos pequenos), gap 0,6mm. Motores 2 tempos sujam a vela de carvão com muito mais facilidade que 4 tempos — principalmente com uso predominante em trajetos curtos e baixa rotação. Troque a cada 3.000–4.000 km, não espere os 6.000–8.000 km comuns em moto 4 tempos. Custo: R$ 12–20. Vela encarvoada é a causa nº1 de "moto engasgada" e falha de partida a frio na Message.',
  },
  {
    severity: 'OK',
    title: 'Correia e roletes do variador (CVT): troque o kit a cada 15.000–20.000 km',
    body: 'A transmissão CVT da Message usa correia + roletes (pesos centrífugos) no variador — desgaste natural que reduz a "retomada" da scooter (ela demora mais para acelerar do zero). Kit correia + jogo de roletes: R$ 100–200 em lojas de peças para scooter. Sinal de correia no fim da vida: trepidação leve na aceleração e ruído de atrito na área do variador (lado esquerdo do motor). Não é uma peça exclusiva Daelim — kits genéricos de scooter pequena costumam servir por medida.',
  },
  {
    severity: 'OK',
    title: 'Descarbonização periódica do escapamento: item que motor 2 tempos exige e 4 tempos não',
    body: 'Motores 2 tempos acumulam depósito de carbono no cilindro, na janela de escape e no silencioso ao longo do tempo — isso é normal e reduz potência gradualmente se não for tratado. Recomenda-se descarbonizar (limpeza mecânica do escape e da cabeça do pistão) a cada 10.000 km ou quando notar perda de retomada mesmo com correia/vela em dia. Serviço de mecânico especializado em 2 tempos (cada vez mais raro, procure quem atende scooter/moto 2T antiga): R$ 80–150.',
  },
  {
    severity: 'WARN',
    title: 'Carburador pequeno: sensível a etanol parado — drene se a moto ficar semanas sem uso',
    body: 'O carburador pequeno da Message entope facilmente com o verniz que o etanol degradado deixa nos jatos internos — problema agravado em motor pequeno com passagens finas. Se a moto vai ficar parada por mais de 3–4 semanas, drene a cuba do carburador (parafuso de dreno na base) para evitar que a gasolina evapore e deixe resíduo. Sintoma de carburador sujo: marcha lenta instável, dificuldade de pegar a frio mesmo com vela boa. Limpeza: spray de carburador ou desmontagem completa em oficina especializada.',
  },
  {
    severity: 'WARN',
    title: 'Peças escassas, mas motor 2T pequeno tem paralelo com scooters chinesas da mesma época',
    body: 'A Daelim descontinuou a Message há anos e peças com código de fábrica são raras. A vantagem: motores 2 tempos de ~49cc com bomba de óleo automática foram um padrão comum em várias scooters de entrada da época (marcas chinesas e coreanas concorrentes) — pistão, anel, retentores e até bomba de óleo genérica costumam ter equivalente por medida. Leve a peça desgastada para comparação física em lojas de peças para scooter popular antes de fechar a compra.',
  },
  {
    severity: 'OK',
    title: 'Pneus 3.00-10: aro pequeno raro hoje, mas ainda fabricado por algumas marcas',
    body: 'A Message usa pneus 3.00-10 nas duas rodas — medida de scooter compacto que ficou menos comum com a saída de vários modelos pequenos de linha. Ainda é fabricada por marcas como Rinaldi e Levorin (linha scooter urbano popular). Como o peso da moto é baixo (~85 kg em ordem de marcha), não force pressões altas demais pensando em "durabilidade" — siga a calibragem recomendada para não perder aderência no piso molhado, já que o contato do pneu pequeno com o chão é reduzido.',
  },
]

const MESSAGE_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Falha da bomba de óleo 2T: sinal de fumaça excessiva ou motor "duro" exige parada imediata',
    body: 'Se a bomba de óleo automática falhar ou entupir, o motor 2 tempos passa a rodar com lubrificação insuficiente — o risco é de agarramento (motor trava) em poucos minutos de uso, não é um desgaste gradual como em motor 4 tempos. Sinais de alerta: fumaça branca/azulada muito acima do normal (indica excesso, bomba com defeito abrindo demais) OU ausência quase total de fumaça combinada com ruído metálico agudo (indica falta de óleo, sinal mais grave). Em qualquer sinal de ruído metálico novo, pare o motor imediatamente e verifique o nível do reservatório antes de continuar.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT ressecada por tempo parado, não só por quilometragem',
    body: 'Como a Message costuma ser usada como segunda moto ou moto de uso ocasional hoje em dia (modelo mais antigo, já fora de linha), a correia do variador CVT frequentemente resseca e trinca por tempo parado em garagem, mesmo com poucos quilômetros rodados. Se a moto ficou parada por mais de 1 ano, inspecione visualmente a correia (rachaduras na borracha, brilho excessivo nas bordas) antes de rodar longas distâncias — correia rompida em uso deixa a moto sem tração instantaneamente.',
  },
  {
    severity: 'WARN',
    title: 'Retificador/regulador: componente elétrico frágil, igual em toda a linha Daelim pequena',
    body: 'O retificador da Message tem a mesma fragilidade observada em outros modelos pequenos Daelim da época — falha causa bateria fraca mesmo com moto ligada (tensão abaixo de 13V a 4.000 rpm no teste com multímetro) ou, no extremo oposto, sobrecarga que "frita" a bateria. Substitua por retificador genérico compatível de scooter pequena com a mesma configuração de fios — R$ 60–120.',
  },
  {
    severity: 'WARN',
    title: 'Fumaça excessiva persistente: normalmente mistura de óleo incorreta, não motor gasto',
    body: 'Fumaça branca-azulada moderada é normal em 2 tempos, mas fumaça muito densa e constante indica dosagem de óleo alta demais (bomba desregulada) ou uso de óleo 2T de baixa qualidade que queima mal. Antes de suspeitar de motor desgastado (anéis, cilindro), verifique a calibração da bomba de óleo e troque para um óleo 2T sintético de marca confiável — na maioria dos casos resolve o problema sem precisar abrir o motor.',
  },
  {
    severity: 'WARN',
    title: 'Freios tambor/tambor: frenagem fraca é característica, reforce a manutenção preventiva',
    body: 'A Message tem freio a tambor nas duas rodas — frenagem naturalmente mais fraca que disco, especialmente perceptível com a moto carregada (piloto + carona). Mantenha as lonas sempre dentro da espessura mínima e os cabos/hastes de acionamento bem regulados, sem folga excessiva no punho/pedal. Não é um "problema" da moto em si, mas exige respeito à distância de frenagem maior em comparação com motos de disco.',
  },
  {
    severity: 'WARN',
    title: 'Conectores elétricos oxidados: mesmo padrão de falha "fantasma" da linha Daelim antiga',
    body: 'Como em outros modelos pequenos Daelim do período, os conectores do chicote elétrico da Message oxidam com o tempo, causando falhas intermitentes de luz, seta e partida elétrica. Limpeza com spray de contato elétrico e graxa dielétrica nos terminais resolve a maioria dos casos. Persistindo, substitua o conector específico por um genérico de mesma bitola.',
  },
]

const MESSAGE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Message 50cc: rotina de motor 2 tempos é diferente da maioria dos Daelim da linha',
    body: 'A cada abastecimento — Verificar nível do reservatório de óleo 2T (não deixar secar, é o item mais crítico da moto). | 1.000 km — Revisão de rodagem: checar bomba de óleo, vela, folga de cabos. | 3.000 km — Troca de vela NGK BR8HS (gap 0,6mm). | 5.000 km — Limpeza do carburador e do filtro de ar. Lubrificação de cabos. | 10.000 km — Descarbonização do escapamento e da cabeça do pistão. Inspeção da correia CVT e roletes. | 15.000 km — Kit correia + roletes do variador (se desgastado). Lonas de freio dianteira e traseira. | 20.000 km — Verificação do retificador/regulador (13,5–14,5V a 4.000 rpm).',
  },
]

// ─── VC 125 ADVANCED ─────────────────────────────────────────────────────────
// Motor: monocilíndrico 4T SOHC 2 válvulas, ar-refrigerado, ~124cc | ~11 cv (estimado
// dentro da faixa da família VS/VT) | Transmissão: manual 5 marchas, corrente 428
// Freios: disco dianteiro / tambor traseiro | Carburador CV | "Advanced" = trim com
// painel mais completo e partida elétrica de série

const VC125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor da família custom Daelim: peças compartilhadas com VS 125, VT 125 e VX 125',
    body: 'A VC 125 Advanced usa o mesmo bloco de motor monocilíndrico ar-refrigerado de ~124cc da família de "mini customs" da Daelim (VS 125 Custom, VT 125 Custom/Magma, VX 125) — só muda o chassi e a carenagem. Isso é uma vantagem enorme para manutenção hoje em dia: pistão, anéis, retentores, corrente de comando e bomba d\'óleo costumam ser intercambiáveis entre os quatro modelos. Se a peça exata "VC 125" não aparecer numa busca, procure pelo mesmo item nos outros três nomes — a chance de ser a peça idêntica é alta.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA, ~1,0–1,1L — troca a cada 3.000 km',
    body: 'O motor a ar de ~124cc da VC 125 usa embreagem molhada, então o óleo precisa ser JASO MA obrigatoriamente (nunca JASO MB de scooter automático). Capacidade aproximada: 1,0–1,1L com troca de filtro/tela. Use 20W-50 mineral ou semissintético — Lubrax Moto 4T, Shell Advance 4T, Motul 3000. Intervalo: 3.000 km ou 6 meses, o que vier primeiro. Sinal de óleo vencido: embreagem começando a "escorregar" em acelerações mais fortes.',
  },
  {
    severity: 'OK',
    title: 'Vela genérica gap 0,6–0,7mm: troque a cada 6.000–8.000 km',
    body: 'A vela original tem referência de rosca curta compatível com o padrão de motores pequenos ar-refrigerados da época (equivalente NGK série C7HSA/CR7HSA dependendo da versão de cabeçote). Gap: 0,6–0,7mm. Custo: R$ 15–30. Como a peça original Daelim é difícil de achar em loja de balcão, leve a vela usada para comparação de rosca/alcance térmico ao comprar o equivalente genérico.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428: lubrifique a cada 500 km — kit completo é barato e fácil de achar',
    body: 'A VC 125 usa corrente de passo 428 (padrão de moto pequena/média), com kit completo (corrente + pinhão + coroa) amplamente disponível por ser medida comum a várias marcas — não é item exclusivo Daelim. Custo: R$ 100–200. Lubrifique a cada 500 km ou após pegar chuva. Folga: 20–30mm no trecho inferior. Troque o kit completo (nunca só a corrente) a cada 15.000–20.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Carburador CV: regulagem de marcha lenta e mistura sofre com etanol parado',
    body: 'O carburador de diafragma (CV) da VC 125 é sensível ao verniz que o etanol degradado deixa nos jatos e na agulha da boia — sintomas: marcha lenta oscilante, engasgo na retomada, dificuldade de pegar a frio. Se a moto ficar parada por semanas, drene a cuba pelo parafuso de dreno na base do carburador. Limpeza completa em oficina especializada em carburador (não injeção): R$ 80–150.',
  },
  {
    severity: 'OK',
    title: 'Painel "Advanced" mais completo: sensor de nível de combustível pode falhar isolado',
    body: 'A versão Advanced da VC 125 traz um painel mais completo que outras variantes da família (conta-giros, marcador de combustível analógico). O sensor de nível do tanque (boia interna) é um ponto isolado de falha comum em motos com muitos anos de uso — sintoma: ponteiro de combustível travado no cheio ou no vazio mesmo com nível real diferente. Antes de suspeitar de problema grave na injeção/carburação, teste primeiro o sensor de combustível — a peça é relativamente barata em desmanches.',
  },
  {
    severity: 'WARN',
    title: 'Peças escassas: garimpe em desmanches e compare com a família VS/VT/VX antes de importar',
    body: 'Como a Daelim reduziu drasticamente a presença no Brasil, peças com código exclusivo VC 125 praticamente não existem em estoque de concessionária. Antes de importar do exterior (processo caro e demorado), procure em desmanches de moto e grupos de venda de peças usadas Daelim — como o motor é compartilhado com VS/VT/VX, a chance de achar a peça certa com outro nome no anúncio é real. Mecânicos que atendem a família Daelim custom (procure em grupos de Facebook regionais) costumam ter esse conhecimento de equivalência.',
  },
]

const VC125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador: ponto de falha elétrica mais comum na família Daelim custom',
    body: 'O retificador/regulador é o componente elétrico que mais falha nos "mini custom" Daelim (VC/VS/VT/VX) segundo relatos de proprietários. Sintoma: bateria não carrega mesmo com moto funcionando (tensão abaixo de 13V a 4.000 rpm no teste com multímetro), ou luz de carga acesa no painel. Substitua por retificador genérico compatível — a pinagem costuma ser padrão de moto pequena de 4 fios. Custo: R$ 80–180. Substituição preventiva recomendada por volta dos 40.000 km em unidades com muitos anos de uso.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala: vazamento após 20.000–25.000 km em uso de rua com buracos',
    body: 'O retentor da bengala dianteira convencional tem vida útil limitada em pavimento ruim. Sintoma: óleo escuro no tubo interno da bengala, amortecimento irregular perceptível em lombadas. Retentor genérico de mesma medida resolve — troca de mão de obra simples (R$ 100–250) mais peça (R$ 20–50). Ao trocar, complete com óleo de bengala novo (SAE 10W ou 15W, ~150–180mL por tubo).',
  },
  {
    severity: 'WARN',
    title: 'Cabo de embreagem esticando: engate impreciso é sintoma de ajuste, não de defeito',
    body: 'Como muitas motos com cabo de embreagem mecânico, o cabo da VC 125 estica naturalmente com o uso, deixando o ponto de engate impreciso ou o câmbio "raspando" ao trocar de marcha. Antes de suspeitar de embreagem gasta internamente, ajuste a folga do cabo no regulador (geralmente perto da alavanca no guidão) — folga ideal de 10–15mm na ponta da alavanca. Lubrifique o cabo periodicamente para evitar que ele emperre dentro da capa.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas fora do padrão causa partida difícil a frio',
    body: 'Motor pequeno ar-refrigerado de baixa cilindrada é sensível à folga de válvulas fora do especificado — o sintoma mais comum é dificuldade de pegar a frio (partida elétrica gira mas demora a "pegar") e leve ruído de tique-taque em aceleração leve. Verifique a folga a cada 6.000–8.000 km com o motor completamente frio; ajuste por contra-porca (não usa pastilha/shim neste motor).',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico com conectores de qualidade básica: falhas intermitentes',
    body: 'Assim como em outros modelos Daelim de entrada da mesma geração, os conectores do chicote elétrico da VC 125 oxidam e causam falhas intermitentes (pisca, luz de freio, partida elétrica) com o tempo, principalmente em regiões úmidas. Limpe com spray de contato elétrico e aplique graxa dielétrica nos terminais acessíveis.',
  },
  {
    severity: 'WARN',
    title: 'Interruptor de segurança do cavalete lateral: falha comum causa corte no motor sem aviso',
    body: 'O interruptor de segurança do cavalete lateral (que corta a ignição se o cavalete estiver abaixado com marcha engatada) pode falhar por oxidação ou desgaste do contato interno, causando corte do motor mesmo com o cavalete recolhido, ou o inverso (não corta quando deveria). Se a moto morre sozinha em marcha lenta de forma intermitente, teste esse interruptor antes de desconfiar de CDI ou bobina — é uma causa muito mais barata e comum de resolver.',
  },
]

const VC125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma VC 125 Advanced: igual à família de mini customs Daelim',
    body: '1.000 km — Revisão de rodagem: óleo 20W-50 + aperto geral + folga de cabos. | 3.000 km — Troca de óleo (1,0–1,1L) + lubrificação de corrente 428. | 6.000 km — Vela nova (gap 0,6–0,7mm) + folga de válvulas verificada + limpeza do filtro de ar. | 10.000 km — Filtro de ar (troca, se descartável) + regulagem do carburador CV + fluido de freio dianteiro. | 15.000 km — Kit corrente completo (se desgastado) + retentor de bengala inspecionado. | 20.000 km — Verificação do retificador (13,5–14,5V a 4.000 rpm) + lona do freio traseiro.',
  },
]

// ─── VF 125 D ─────────────────────────────────────────────────────────────────
// Motor: monocilíndrico 4T ar-refrigerado, 125cc | ~10 cv | Transmissão manual 5
// marchas | Freios: disco dianteiro / tambor traseiro | Peso: ~115 kg | Consumo
// até 40 km/l | Categoria naked/street (não é da linha custom VS/VT/VC/VX)

const VF125D_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Naked simples e leve: mesma base de motor 125cc da família custom Daelim',
    body: 'A VF 125 D é a versão naked/street da Daelim — usa essencialmente a mesma base de motor monocilíndrico ar-refrigerado de 125cc da linha custom (VC/VS/VT/VX), só que num chassi tubular mais leve (~115 kg) e sem a carenagem "cruiser". Isso significa que boa parte da manutenção de motor (óleo, vela, corrente, folga de válvulas) segue a mesma especificação e peças compartilhadas — só muda a carroceria/estética.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA, ~1,0L — troca a cada 3.000 km',
    body: 'Mesma especificação da família: óleo JASO MA obrigatório (embreagem molhada), 20W-50 mineral ou semissintético, capacidade aproximada de 1,0L. Troca a cada 3.000 km ou 6 meses. Marcas acessíveis: Lubrax Moto 4T, Shell Advance 4T.',
  },
  {
    severity: 'OK',
    title: 'Consumo de até 40 km/l: moto leve e de baixa cilindrada favorece a economia',
    body: 'Com ~115 kg em ordem de marcha e motor de baixa cilindrada, a VF 125 D pode chegar a 40 km/l em uso moderado — um dos consumos mais baixos entre as motos "de verdade" (não scooter) vendidas no Brasil na época. Para manter essa marca: pneus calibrados, filtro de ar limpo e carburador bem regulado.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428: lubrifique a cada 500 km, kit fácil de achar por ser medida comum',
    body: 'Assim como a VC 125, a VF 125 D usa corrente de passo 428 — item comum a várias marcas, não exclusivo Daelim, com kit completo (corrente + pinhão + coroa) fácil de encontrar em qualquer loja de peças de moto. Custo: R$ 100–200. Folga: 20–30mm no trecho inferior.',
  },
  {
    severity: 'OK',
    title: 'Suspensão traseira de duplo amortecedor: pré-carga regulável, ajuste para o seu peso',
    body: 'A VF 125 D usa suspensão traseira convencional de dois amortecedores (não monoshock), com pré-carga regulável por anel roscado ou came. Ajuste conforme o peso do piloto (e se costuma andar com garupa) — suspensão mal regulada nesse tipo de chassi leve prejudica bastante o conforto e a estabilidade em pisos irregulares.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: regulagem de marcha lenta e mistura sensível a etanol degradado',
    body: 'O carburador da VF 125 D sofre com o mesmo problema clássico de motos pequenas carburadas no Brasil: verniz de etanol degradado entupindo jatos finos. Sintomas: marcha lenta oscilante, dificuldade de pegar a frio. Drene a cuba se a moto for ficar parada por semanas. Limpeza completa em oficina especializada: R$ 80–150.',
  },
  {
    severity: 'WARN',
    title: 'Freio disco/tambor: mantenha o fluido de freio em dia mesmo com pouco uso',
    body: 'A combinação disco dianteiro / tambor traseiro da VF 125 D é eficiente para o peso da moto, mas o fluido de freio (DOT 4) do sistema dianteiro absorve umidade com o tempo mesmo sem uso intenso — troque a cada 24 meses independente da quilometragem rodada. Fluido de freio velho e escurecido reduz a eficiência de frenagem gradualmente, sem um aviso claro no dia a dia.',
  },
]

const VF125D_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador: mesmo ponto crítico elétrico da família Daelim de entrada',
    body: 'Como nos outros modelos pequenos Daelim da época, o retificador/regulador da VF 125 D é frágil e tende a falhar após alguns anos de uso — sintoma: bateria não carrega (abaixo de 13V a 4.000 rpm), moto morre em marcha lenta com bateria fraca. Substitua por retificador genérico compatível de moto pequena de 4 fios. Custo: R$ 80–180.',
  },
  {
    severity: 'WARN',
    title: 'Peças escassas: base compartilhada com a família custom ajuda a compensar',
    body: 'A VF 125 D também sofre com a escassez geral de peças com código Daelim exclusivo. A vantagem é a mesma da linha custom: como compartilha o bloco do motor com VC/VS/VT/VX, muitas peças de motor (pistão, retentores, corrente de comando) têm equivalente entre os modelos — vale procurar anúncios pelos outros nomes da família ao buscar peça.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala: vazamento após uso prolongado em pavimento ruim',
    body: 'O retentor da bengala dianteira convencional vaza com o tempo, especialmente em cidades com muito buraco. Sintoma: mancha de óleo no tubo interno da bengala. Troca de retentor genérico + óleo de bengala novo resolve — não adie, óleo pingando perto do disco de freio dianteiro é risco de perda de frenagem.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas fora do padrão: partida difícil a frio é o primeiro sintoma',
    body: 'Mesmo comportamento da família: folga de válvulas desregulada causa dificuldade de partida a frio e ruído de tique-taque leve. Verifique a cada 6.000–8.000 km com motor frio.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico com conectores básicos: falhas intermitentes com o tempo',
    body: 'Conectores de qualidade básica oxidam e causam falhas de luz, seta e partida com o tempo — mesmo padrão observado em toda a linha Daelim de entrada da época. Limpeza com spray de contato elétrico e graxa dielétrica costuma resolver a maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Cabo de embreagem estica com o uso: ajuste antes de suspeitar de defeito interno',
    body: 'Assim como na VC 125, o cabo de embreagem mecânico da VF 125 D estica naturalmente e deixa o câmbio impreciso. Ajuste a folga no regulador da alavanca (10–15mm de folga ideal) antes de investigar problema interno na embreagem.',
  },
]

const VF125D_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma VF 125 D: mesma rotina da família de motor 125cc Daelim',
    body: '1.000 km — Revisão de rodagem: óleo 20W-50 + aperto geral. | 3.000 km — Troca de óleo (~1,0L) + lubrificação da corrente 428. | 6.000 km — Vela nova + folga de válvulas verificada + limpeza do filtro de ar. | 10.000 km — Filtro de ar (troca) + regulagem do carburador + fluido de freio dianteiro. | 15.000 km — Kit corrente completo se desgastado + retentor de bengala inspecionado. | 20.000 km — Verificação do retificador (13,5–14,5V a 4.000 rpm) + lona do freio traseiro + regulagem da suspensão traseira.',
  },
]

// ─── VS 125 CUSTOM ────────────────────────────────────────────────────────────
// Motor: monocilíndrico 4T, ar/óleo-refrigerado, 124,1cc | 11,8 cv @ 9.000 rpm
// Bore x stroke: 56,5 x 49,5mm | Compressão: 10,7:1 | Transmissão manual 5
// marchas, corrente 428 | Freios: disco dianteiro / tambor traseiro
// Painel: velocímetro, conta-giros, marcador de combustível, hodômetro/trip

const VS125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 124,1cc com radiador de óleo: refrigeração mista incomum nessa cilindrada',
    body: 'A VS 125 Custom tem refrigeração a ar combinada com um pequeno radiador de óleo (ar/óleo) — recurso mais sofisticado que o ar puro da maioria dos concorrentes de mesma cilindrada da época. Isso ajuda a manter a temperatura mais estável em trânsito parado, mas exige atenção redobrada ao nível de óleo: óleo baixo prejudica tanto a lubrificação quanto a troca de calor pelo radiador. Verifique o nível a cada abastecimento em uso urbano intenso.',
  },
  {
    severity: 'OK',
    title: 'Bore x stroke 56,5 x 49,5mm, compressão 10,7:1 — motor "curto", 11,8 cv a 9.000 rpm',
    body: 'A VS 125 tem motor de curso relativamente curto para a cilindrada, o que favorece giro mais livre (potência de pico em 9.000 rpm) em vez de torque bruto em baixo. Na prática: prefira trocar de marcha um pouco mais cedo em vez de "espremer" o motor em baixa rotação — ele responde melhor girando. Compressão de 10,7:1 pede gasolina de qualidade (evite postos suspeitos de adulteração) para não correr risco de detonação/batida de pino.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor compartilhadas com VT 125, VC 125 Advanced e VX 125',
    body: 'O bloco de motor da VS 125 Custom é o mesmo (ou muito próximo) da família de mini customs Daelim — VT 125 Custom/Magma, VC 125 Advanced e VX 125. Pistão, anéis, corrente de comando, retentores e bomba d\'óleo costumam ser intercambiáveis. Ao procurar peça, pesquise também pelos outros três nomes — aumenta muito a chance de achar em desmanches ou lojas especializadas em Daelim/mini custom.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA, ~1,0–1,1L — troca a cada 3.000 km, atenção ao radiador de óleo',
    body: 'Capacidade de óleo um pouco maior que uma moto só a ar equivalente, por causa do circuito extra do radiador de óleo — cerca de 1,0–1,1L. JASO MA obrigatório (embreagem molhada). Troque a cada 3.000 km e sempre verifique se não há vazamento nas mangueiras do radiador de óleo (borracha ressecada com o tempo é o ponto mais provável de vazamento nesse sistema).',
  },
  {
    severity: 'OK',
    title: 'Painel completo: sensor de combustível e conta-giros são pontos isolados de falha',
    body: 'A VS 125 Custom tem painel relativamente completo para a categoria — velocímetro, conta-giros e marcador de combustível analógico. Com o tempo, o sensor de nível do tanque (boia) e o cabo do conta-giros mecânico são os itens que mais falham isoladamente. Antes de suspeitar de problema elétrico geral, teste esses dois pontos específicos — geralmente mais baratos de resolver que parecem.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428: lubrifique a cada 500 km — motor de giro mais alto desgasta a corrente mais rápido',
    body: 'Como a VS 125 tende a rodar em rotações um pouco mais altas que uma custom de torque baixo, a corrente 428 pede atenção extra à lubrificação — a cada 500 km ou após chuva. Folga: 20–30mm no trecho inferior. Kit completo (corrente + pinhão + coroa): R$ 100–200, item comum não exclusivo Daelim.',
  },
  {
    severity: 'WARN',
    title: 'Gasolina de qualidade é mais importante nessa moto por causa da compressão 10,7:1',
    body: 'Com compressão de 10,7:1 — mais alta que muitas concorrentes de baixa cilindrada da época — a VS 125 Custom é mais sensível a gasolina adulterada ou de octanagem baixa. Sintoma de detonação: ruído metálico agudo ("batida de pino") em aceleração forte, principalmente subindo ladeira. Abasteça sempre em postos de confiança — o custo de reparo de um motor com detonação crônica (pistão, junta do cabeçote) é muito maior que a diferença de preço da gasolina boa.',
  },
]

const VS125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador: falha elétrica mais comum de toda a família Daelim custom',
    body: 'Mesmo padrão de falha da linha: retificador/regulador frágil, sintoma de bateria não carregando (abaixo de 13V a 4.000 rpm) ou sobrecarga que danifica a bateria. Substitua por peça genérica compatível de 4 fios. Custo: R$ 80–180. Substituição preventiva recomendada em unidades com muitos anos de uso e histórico desconhecido de manutenção elétrica.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento nas mangueiras do radiador de óleo: item exclusivo desse sistema ar/óleo',
    body: 'As mangueiras que levam óleo até o radiador (ressecam com o tempo, como qualquer mangueira de borracha exposta ao calor do motor) são um ponto de vazamento específico da VS 125 que não existe em concorrentes só a ar. Inspecione visualmente a cada troca de óleo — mangueira rachada ou ressecada deve ser trocada preventivamente antes de vazar em uso.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala: vazamento após 20.000–25.000 km em pavimento ruim',
    body: 'Mesmo padrão da família: retentor da bengala dianteira convencional vaza com o tempo, mancha de óleo visível no tubo interno. Troca de retentor genérico + óleo de bengala novo (SAE 10W/15W) resolve.',
  },
  {
    severity: 'WARN',
    title: 'Cabo de embreagem estica com o uso: ajuste antes de investigar embreagem internamente',
    body: 'Câmbio impreciso ou "raspando" ao trocar de marcha costuma ser folga de cabo de embreagem, não desgaste interno. Ajuste no regulador perto da alavanca (10–15mm de folga ideal) antes de abrir o motor.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas desregulada: sintoma principal é partida difícil a frio',
    body: 'Assim como nos demais modelos da família, folga de válvulas fora do padrão causa dificuldade de pegar a frio e ruído leve em aceleração. Verifique a cada 6.000–8.000 km, motor completamente frio.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico com conectores básicos: falhas intermitentes de luz e partida',
    body: 'Conectores que oxidam com o tempo causam falhas intermitentes clássicas da linha Daelim de entrada — limpeza com spray de contato elétrico e graxa dielétrica resolve a maioria dos casos antes de suspeitar de peça mais cara.',
  },
]

const VS125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma VS 125 Custom: rotina da família custom + atenção ao radiador de óleo',
    body: '1.000 km — Revisão de rodagem: óleo 20W-50 + aperto geral + inspeção das mangueiras do radiador de óleo. | 3.000 km — Troca de óleo (1,0–1,1L) + lubrificação de corrente 428. | 6.000 km — Vela nova + folga de válvulas verificada + limpeza do filtro de ar. | 10.000 km — Filtro de ar (troca) + regulagem do carburador + fluido de freio dianteiro + inspeção visual das mangueiras do radiador de óleo. | 15.000 km — Kit corrente completo se desgastado + retentor de bengala. | 20.000 km — Verificação do retificador (13,5–14,5V a 4.000 rpm) + lona do freio traseiro + teste do sensor de combustível.',
  },
]

// ─── VT 125 CUSTOM (Magma) ────────────────────────────────────────────────────
// Motor: monocilíndrico 4T ar-refrigerado, 124cc | 13,1 cv (a mais potente da
// família de mini customs Daelim) | Transmissão manual 5 marchas, corrente 428
// Freios: disco dianteiro / tambor traseiro | Versões: "Evolution" (rodas raiadas)
// e "Magma" (trim posterior, rodas de liga/mais cromado)

const VT125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'A mais "encorpada" da família: 13,1 cv, acima da VS 125 e da VC 125 Advanced',
    body: 'A VT 125 Custom (linha que inclui a versão posterior conhecida informalmente como "Magma") entrega 13,1 cv — a maior potência entre os mini customs Daelim de 125cc da lista. Na prática isso significa retomada um pouco mais viva no trânsito, mas também desgaste um pouco mais rápido de corrente e pastilha/lona de freio para quem explora esse plus de potência com frequência.',
  },
  {
    severity: 'OK',
    title: 'Rodas de liga (Magma) vs. raiadas (Evolution): identifique sua versão antes de comprar pneu',
    body: 'A denominação "Magma" costuma aparecer em versões posteriores da VT 125 Custom com rodas de liga leve, diferente das rodas raiadas mais comuns em versões anteriores ("Evolution"). Isso muda a opção de pneu: rodas de liga aceitam pneu tubeless (sem câmara), enquanto rodas raiadas tradicionais geralmente exigem câmara de ar. Confirme visualmente o tipo de roda da sua unidade antes de comprar pneu — usar tubeless numa roda raiada sem preparo adequado é inseguro.',
  },
  {
    severity: 'OK',
    title: 'Motor compartilhado com VS 125, VC 125 Advanced e VX 125: mesma vantagem de peças',
    body: 'Assim como os demais mini customs Daelim, a VT 125 compartilha o bloco de motor de ~124cc com VS 125, VC 125 Advanced e VX 125. Pistão, anéis, retentores e corrente de comando costumam ser intercambiáveis — ao procurar peça, pesquise também pelos outros nomes da família em desmanches e lojas especializadas.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA, ~1,0L — troca a cada 3.000 km',
    body: 'Mesma especificação da família: óleo JASO MA obrigatório por causa da embreagem molhada, 20W-50 mineral ou semissintético, capacidade aproximada de 1,0L. Troca a cada 3.000 km ou 6 meses. Motor com mais potência que a média da família merece atenção redobrada ao intervalo — não estenda além do recomendado.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento cromado: proteja contra corrosão, principalmente perto do litoral',
    body: 'O acabamento cromado típico dessa linha custom Daelim sofre com maresia e chuva ácida em regiões litorâneas — o escapamento é o item que mais mostra pontos de ferrugem sob o cromo com o tempo. Lave e passe cera/óleo protetor específico para cromo periodicamente, principalmente depois de rodar perto do mar. Escapamento cromado de reposição genérico compatível costuma ser mais barato que peça original importada.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428: lubrifique a cada 500 km — potência extra da VT exige atenção redobrada',
    body: 'Por ter a maior potência da família, a corrente 428 da VT 125 tende a desgastar um pouco mais rápido que nas outras versões se não for bem lubrificada. Lubrifique a cada 500 km ou após chuva, mantenha a folga entre 20–30mm no trecho inferior. Kit completo: R$ 100–200.',
  },
  {
    severity: 'OK',
    title: 'Consumo em torno de 30–35 km/l: fique atento a quedas bruscas de rendimento',
    body: 'Em uso urbano moderado, espera-se consumo na faixa de 30–35 km/l — um pouco menor que os concorrentes menos potentes da família por causa da relação de compressão e potência mais altas. Queda brusca abaixo de 25 km/l costuma indicar vela suja, filtro de ar entupido ou carburador desregulado, não desgaste normal do motor.',
  },
]

const VT125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador: mesma falha crônica de toda a família Daelim custom',
    body: 'A VT 125 sofre do mesmo ponto fraco elétrico da linha: retificador/regulador que falha com poucos anos de uso, causando bateria fraca (tensão abaixo de 13V a 4.000 rpm) ou sobrecarga que danifica a bateria. Substitua por peça genérica compatível de 4 fios. Custo: R$ 80–180.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão sob o cromo do escapamento: comece a monitorar antes de furar',
    body: 'O acabamento cromado da VT 125 esconde pontos de ferrugem que começam por baixo, na parte interna ou em soldas, antes de aparecer visivelmente por fora. Se notar bolhas no cromo ou pontos ásperos, trate rápido — escapamento furado por corrosão interna é mais comum de acontecer de repente do que parece, e afeta diretamente a mistura ar-combustível se houver vazamento antes da saída do silencioso.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala: vazamento após 20.000–25.000 km em pavimento ruim',
    body: 'Mesmo padrão da família de mini customs: retentor da bengala dianteira convencional vaza com o tempo, mancha de óleo visível no tubo interno. Troca de retentor genérico + óleo de bengala novo resolve.',
  },
  {
    severity: 'WARN',
    title: 'Cabo de embreagem estica com o uso: ajuste antes de suspeitar de defeito interno',
    body: 'Câmbio impreciso costuma ser folga de cabo, não desgaste interno da embreagem. Ajuste no regulador perto da alavanca (10–15mm de folga ideal) antes de investigar mais fundo.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas desregulada: partida difícil a frio é o primeiro sintoma',
    body: 'Mesmo comportamento da família — folga fora do padrão causa dificuldade de pegar a frio e ruído leve em aceleração. Verifique a cada 6.000–8.000 km, motor frio.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico com conectores básicos: falhas intermitentes clássicas da linha',
    body: 'Conectores oxidados causam falhas intermitentes de luz, seta e partida — limpeza com spray de contato elétrico e graxa dielétrica resolve a maioria dos casos.',
  },
]

const VT125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma VT 125 Custom (Evolution/Magma): rotina da família + cuidado extra com o cromado',
    body: '1.000 km — Revisão de rodagem: óleo 20W-50 + aperto geral. | 3.000 km — Troca de óleo (~1,0L) + lubrificação de corrente 428. | 6.000 km — Vela nova + folga de válvulas verificada + limpeza do filtro de ar. | 10.000 km — Filtro de ar (troca) + regulagem do carburador + fluido de freio dianteiro. | 15.000 km — Kit corrente completo se desgastado + retentor de bengala + inspeção do cromado do escapamento. | 20.000 km — Verificação do retificador (13,5–14,5V a 4.000 rpm) + lona do freio traseiro.',
  },
]

// ─── VX 125 ───────────────────────────────────────────────────────────────────
// Motor: monocilíndrico 4T ar-refrigerado, ~124cc | ~11,5 cv (estimado, dentro da
// faixa de 11,8–13,1 cv observada na família VS/VT) | Transmissão manual 5
// marchas, corrente 428 | Freios: disco dianteiro / tambor traseiro
// Nota: a VX 125 é o modelo menos documentado publicamente da linha custom Daelim
// no Brasil — specs abaixo seguem a faixa consistente da família compartilhada

const VX125_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Modelo pouco documentado: use as especificações da família VS/VT/VC como referência segura',
    body: 'A VX 125 é o modelo Daelim custom com menos informação técnica disponível publicamente hoje em dia — provavelmente por ter vendido menos unidades que VS 125 e VT 125 no Brasil. Todo o conteúdo abaixo segue a faixa de especificação consistente observada na família compartilhada (motor ~124cc ar-refrigerado, corrente 428, câmbio 5 marchas) e deve ser tratado como estimativa bem fundamentada, não como dado exato de manual de fábrica. Antes de qualquer reparo maior, confira a etiqueta de especificações no próprio chassi/motor quando possível.',
  },
  {
    severity: 'OK',
    title: 'Motor da mesma família VS/VT/VC: peças provavelmente intercambiáveis',
    body: 'Pela arquitetura e cilindrada, o motor da VX 125 é da mesma família dos demais mini customs Daelim (VS 125, VT 125, VC 125 Advanced). Ao procurar peça e não achar nada com o nome "VX 125", pesquise pelos outros três nomes — boa parte de pistão, retentores, corrente de comando e bomba d\'óleo costuma ser compatível por serem do mesmo bloco básico. Confirme fisicamente as medidas antes de comprar, já que não há confirmação 100% documentada dessa equivalência para a VX especificamente.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA, ~1,0L (estimado) — troca a cada 3.000 km',
    body: 'Seguindo o padrão da família (embreagem molhada, motor ar-refrigerado de baixa cilindrada), use óleo JASO MA obrigatoriamente — 20W-50 mineral ou semissintético, capacidade estimada de ~1,0L. Troca a cada 3.000 km ou 6 meses. Verifique o nível pela vareta/visor do próprio motor para confirmar a capacidade exata da sua unidade, já que pode haver pequena variação entre versões.',
  },
  {
    severity: 'OK',
    title: 'Vela genérica gap 0,6–0,7mm: mesmo padrão da família de mini customs',
    body: 'A vela segue o mesmo padrão de motor pequeno ar-refrigerado da família — equivalente genérico por medida de rosca e alcance térmico, gap 0,6–0,7mm. Troque a cada 6.000–8.000 km. Leve a vela usada para comparação em loja de peças, já que a peça original com código Daelim é praticamente impossível de achar em estoque.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428: lubrifique a cada 500 km, kit fácil de achar por ser medida comum',
    body: 'A VX 125 usa corrente 428, mesma medida da família — item comum a diversas marcas, não exclusivo Daelim. Lubrifique a cada 500 km ou após chuva, folga de 20–30mm no trecho inferior. Kit completo (corrente + pinhão + coroa): R$ 100–200.',
  },
  {
    severity: 'OK',
    title: 'Vibração acima de 6.000 rpm: característica normal de monocilíndrico pequeno',
    body: 'Como todo motor monocilíndrico de baixa cilindrada sem contrapeso sofisticado, a VX 125 vibra perceptivelmente acima de 6.000 rpm — isso é característica do motor, não defeito. Se a vibração piorou de forma perceptível recentemente, verifique primeiro os parafusos de fixação do motor no chassi (afrouxam com o tempo) antes de suspeitar de problema interno.',
  },
  {
    severity: 'WARN',
    title: 'Peças escassas: modelo menos comum torna o garimpo em desmanches ainda mais necessário',
    body: 'Por ser o modelo menos vendido/documentado da linha custom Daelim no Brasil, a VX 125 provavelmente tem estoque de peças ainda mais restrito que VS/VT/VC. Priorize grupos especializados em Daelim/mini custom no Facebook e mecânicos que já atenderam o modelo — o reconhecimento visual e por medida das peças compartilhadas com o resto da família é o caminho mais viável para manter a moto rodando sem depender de importação.',
  },
]

const VX125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador: mesmo ponto de falha elétrico crônico da família Daelim custom',
    body: 'Segue o mesmo padrão observado em toda a linha de mini customs Daelim: retificador/regulador frágil, sintoma de bateria fraca (tensão abaixo de 13V a 4.000 rpm) ou sobrecarga. Substitua por peça genérica compatível de 4 fios. Custo estimado: R$ 80–180.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala: vazamento esperado após 20.000–25.000 km, mesmo padrão da família',
    body: 'Retentor da bengala dianteira convencional tende a vazar com o tempo em pavimento ruim, seguindo o comportamento observado nos demais mini customs Daelim. Sintoma: mancha de óleo no tubo interno da bengala. Retentor genérico + óleo de bengala novo resolve.',
  },
  {
    severity: 'WARN',
    title: 'Cabo de embreagem estica com o uso: ajuste antes de suspeitar de defeito interno',
    body: 'Câmbio impreciso ao trocar de marcha normalmente é folga de cabo de embreagem, não desgaste interno. Ajuste no regulador perto da alavanca (10–15mm de folga ideal).',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas desregulada: partida difícil a frio, mesmo sintoma da família',
    body: 'Folga de válvulas fora do padrão causa dificuldade de pegar a frio e ruído leve em aceleração — verifique a cada 6.000–8.000 km com o motor completamente frio.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico com conectores básicos: falhas intermitentes de luz e partida',
    body: 'Conectores que oxidam com o tempo causam falhas intermitentes de luz, seta e partida — comportamento consistente em toda a linha Daelim de entrada da época. Limpeza com spray de contato elétrico e graxa dielétrica resolve a maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Diagnóstico mais difícil por falta de documentação: procure mecânico com experiência prévia em Daelim',
    body: 'Como há menos informação pública sobre a VX 125 especificamente, diagnósticos "no olho" por mecânico sem experiência prévia com a marca tendem a ser menos precisos. Vale mais a pena procurar diretamente um mecânico ou grupo especializado em Daelim/mini custom — mesmo que mais distante — do que confiar em tentativa e erro numa oficina genérica sem histórico com a marca.',
  },
]

const VX125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma VX 125: baseado na família de mini customs Daelim (VS/VT/VC), confirme na etiqueta do motor',
    body: '1.000 km — Revisão de rodagem: óleo 20W-50 + aperto geral. | 3.000 km — Troca de óleo (~1,0L, confirme capacidade na etiqueta do motor) + lubrificação de corrente 428. | 6.000 km — Vela nova (gap 0,6–0,7mm) + folga de válvulas verificada + limpeza do filtro de ar. | 10.000 km — Filtro de ar (troca) + regulagem do carburador + fluido de freio dianteiro. | 15.000 km — Kit corrente completo se desgastado + retentor de bengala inspecionado. | 20.000 km — Verificação do retificador (13,5–14,5V a 4.000 rpm) + lona do freio traseiro.',
  },
]

// ─── Blocos de modelos ─────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'ALTINO 100cc',
    yearFrom: 1998,
    yearTo: 2008,
    MACETES: ALTINO_MACETES,
    PROBLEMAS: ALTINO_PROBLEMAS,
    MANUTENCAO: ALTINO_MANUTENCAO,
  },
  {
    modelName: 'MESSAGE 50cc',
    yearFrom: 1998,
    yearTo: 2005,
    MACETES: MESSAGE_MACETES,
    PROBLEMAS: MESSAGE_PROBLEMAS,
    MANUTENCAO: MESSAGE_MANUTENCAO,
  },
  {
    modelName: 'VC 125 ADVANCED',
    yearFrom: 2000,
    yearTo: 2012,
    MACETES: VC125_MACETES,
    PROBLEMAS: VC125_PROBLEMAS,
    MANUTENCAO: VC125_MANUTENCAO,
  },
  {
    modelName: 'VF 125 D',
    yearFrom: 1996,
    yearTo: 2008,
    MACETES: VF125D_MACETES,
    PROBLEMAS: VF125D_PROBLEMAS,
    MANUTENCAO: VF125D_MANUTENCAO,
  },
  {
    modelName: 'VS 125 CUSTOM',
    yearFrom: 1998,
    yearTo: 2012,
    MACETES: VS125_MACETES,
    PROBLEMAS: VS125_PROBLEMAS,
    MANUTENCAO: VS125_MANUTENCAO,
  },
  {
    modelName: 'VT 125 CUSTOM',
    yearFrom: 1998,
    yearTo: 2012,
    MACETES: VT125_MACETES,
    PROBLEMAS: VT125_PROBLEMAS,
    MANUTENCAO: VT125_MANUTENCAO,
  },
  {
    modelName: 'VX 125',
    yearFrom: 2000,
    yearTo: 2012,
    MACETES: VX125_MACETES,
    PROBLEMAS: VX125_PROBLEMAS,
    MANUTENCAO: VX125_MANUTENCAO,
  },
]

// ─── Calibragens ────────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'ALTINO 100cc',
    yearFrom: 1998, yearTo: 2008,
    tireSize: '3.50-10 (F) · 3.50-10 (R)',
    frontPsi: 24, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 32,
    notes: 'Solo: F 24 / R 28 PSI. Com carona: F 26 / R 32 PSI. Rodas pequenas de scooter — verifique semanalmente, pneu pequeno perde pressão proporcionalmente mais rápido. Medida cada vez mais rara no Brasil: pesquise disponibilidade antes de precisar trocar.',
  },
  {
    modelName: 'MESSAGE 50cc',
    yearFrom: 1998, yearTo: 2005,
    tireSize: '3.00-10 (F) · 3.00-10 (R)',
    frontPsi: 22, rearPsi: 26,
    frontPsiLoad: 24, rearPsiLoad: 30,
    notes: 'Solo: F 22 / R 26 PSI. Com carona: F 24 / R 30 PSI. Moto muito leve (~85 kg em ordem de marcha) — não exagere na pressão pensando em durabilidade, prejudica a aderência em piso molhado.',
  },
  {
    modelName: 'VC 125 ADVANCED',
    yearFrom: 2000, yearTo: 2012,
    tireSize: '90/90-18 (F) · 130/90-15 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 32,
    notes: 'Solo: F 26 / R 28 PSI. Com carona: F 26 / R 32 PSI. Medida típica de mini custom — dianteiro estreito, traseiro mais largo. Verifique sempre com pneus frios.',
  },
  {
    modelName: 'VF 125 D',
    yearFrom: 1996, yearTo: 2008,
    tireSize: '2.75-18 (F) · 90/90-18 (R)',
    frontPsi: 24, rearPsi: 26,
    frontPsiLoad: 24, rearPsiLoad: 30,
    notes: 'Solo: F 24 / R 26 PSI. Com carona: F 24 / R 30 PSI. Pneus mais estreitos e simétricos que a linha custom, típico de naked leve de baixa cilindrada.',
  },
  {
    modelName: 'VS 125 CUSTOM',
    yearFrom: 1998, yearTo: 2012,
    tireSize: '90/90-18 (F) · 130/90-15 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 32,
    notes: 'Solo: F 26 / R 28 PSI. Com carona: F 26 / R 32 PSI. Mesma medida da VC 125 Advanced — família compartilha configuração de rodas.',
  },
  {
    modelName: 'VT 125 CUSTOM',
    yearFrom: 1998, yearTo: 2012,
    tireSize: '90/90-18 (F) · 130/90-15 (R)',
    frontPsi: 26, rearPsi: 29,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 29 PSI. Com carona: F 26 / R 33 PSI. Traseiro um pouco mais calibrado que VS/VC pela potência levemente maior (13,1 cv). Em rodas de liga (versão Magma), verifique se o pneu instalado é tubeless antes de aplicar calibragem sem câmara.',
  },
  {
    modelName: 'VX 125',
    yearFrom: 2000, yearTo: 2012,
    tireSize: '90/90-18 (F) · 130/90-15 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 32,
    notes: 'Solo: F 26 / R 28 PSI (estimado com base na família VS/VC, mesma configuração de rodas). Com carona: F 26 / R 32 PSI. Confirme a medida gravada na lateral do pneu da sua unidade específica.',
  },
]

// ─── Itens de manutenção ─────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // ALTINO 100cc
  { modelName: 'ALTINO 100cc', yearFrom: 1998, yearTo: 2008, component: 'Óleo 20W-50 JASO MA (~0,8L)', intervalKm: 2000, intervalMonths: 6, notes: 'Embreagem centrífuga banhada a óleo — JASO MA obrigatório, nunca JASO MB.', priority: 'HIGH', order: 1 },
  { modelName: 'ALTINO 100cc', yearFrom: 1998, yearTo: 2008, component: 'Vela equivalente NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 6000, intervalMonths: null, notes: 'Peça original Daelim escassa — usar equivalente genérico por medida.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ALTINO 100cc', yearFrom: 1998, yearTo: 2008, component: 'Lubrificação corrente 415', intervalKm: 500, intervalMonths: null, notes: 'Corrente fina, folga 15–20mm no trecho inferior.', priority: 'HIGH', order: 3 },
  { modelName: 'ALTINO 100cc', yearFrom: 1998, yearTo: 2008, component: 'Filtro de ar — limpeza', intervalKm: 4000, intervalMonths: 12, notes: 'Filtro entupido aumenta consumo sensivelmente no motor pequeno.', priority: 'MEDIUM', order: 4 },
  { modelName: 'ALTINO 100cc', yearFrom: 1998, yearTo: 2008, component: 'Folga de válvulas', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório. Ajuste por contra-porca.', priority: 'MEDIUM', order: 5 },
  { modelName: 'ALTINO 100cc', yearFrom: 1998, yearTo: 2008, component: 'Embreagem centrífuga — inspeção de desgaste', intervalKm: 15000, intervalMonths: 24, notes: 'Trepidação ou patinação em subida indicam desgaste das sapatas.', priority: 'MEDIUM', order: 6 },
  { modelName: 'ALTINO 100cc', yearFrom: 1998, yearTo: 2008, component: 'Lona do freio traseiro (tambor)', intervalKm: 6000, intervalMonths: 12, notes: 'Sem indicador visual óbvio — inspecione fisicamente o tambor.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ALTINO 100cc', yearFrom: 1998, yearTo: 2008, component: 'Retentor do eixo de manivela', intervalKm: 15000, intervalMonths: null, notes: 'Vazamento comum acima de 15.000 km — peça genérica por medida.', priority: 'MEDIUM', order: 8 },
  { modelName: 'ALTINO 100cc', yearFrom: 1998, yearTo: 2008, component: 'Verificação de conectores elétricos', intervalKm: null, intervalMonths: 12, notes: 'Limpeza com spray de contato + graxa dielétrica previne falhas intermitentes.', priority: 'LOW', order: 9 },

  // MESSAGE 50cc
  { modelName: 'MESSAGE 50cc', yearFrom: 1998, yearTo: 2005, component: 'Nível do reservatório de óleo 2T', intervalKm: null, intervalMonths: null, notes: 'Verificar a cada abastecimento — reservatório vazio funde o motor em minutos.', priority: 'CRITICAL', order: 1 },
  { modelName: 'MESSAGE 50cc', yearFrom: 1998, yearTo: 2005, component: 'Vela equivalente NGK BR8HS (gap 0,6mm)', intervalKm: 3500, intervalMonths: null, notes: 'Motor 2T engorda de carvão rápido — troca mais frequente que 4 tempos.', priority: 'HIGH', order: 2 },
  { modelName: 'MESSAGE 50cc', yearFrom: 1998, yearTo: 2005, component: 'Correia + roletes do variador CVT', intervalKm: 17500, intervalMonths: null, notes: 'Kit genérico de scooter pequena costuma servir por medida.', priority: 'HIGH', order: 3 },
  { modelName: 'MESSAGE 50cc', yearFrom: 1998, yearTo: 2005, component: 'Descarbonização do escapamento e cabeça do pistão', intervalKm: 10000, intervalMonths: 24, notes: 'Item exclusivo de motor 2 tempos — acúmulo de carbono reduz potência.', priority: 'MEDIUM', order: 4 },
  { modelName: 'MESSAGE 50cc', yearFrom: 1998, yearTo: 2005, component: 'Limpeza do carburador', intervalKm: 5000, intervalMonths: 12, notes: 'Drenar cuba se a moto ficar semanas parada — etanol degradado entope jatos finos.', priority: 'MEDIUM', order: 5 },
  { modelName: 'MESSAGE 50cc', yearFrom: 1998, yearTo: 2005, component: 'Lonas de freio dianteiro e traseiro (tambor/tambor)', intervalKm: 6000, intervalMonths: 12, notes: 'Sem disco — inspeção física do tambor necessária.', priority: 'MEDIUM', order: 6 },
  { modelName: 'MESSAGE 50cc', yearFrom: 1998, yearTo: 2005, component: 'Verificação do retificador/regulador (13,5–14,5V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Componente elétrico frágil — falha comum em toda a linha Daelim de entrada.', priority: 'CRITICAL', order: 7 },
  { modelName: 'MESSAGE 50cc', yearFrom: 1998, yearTo: 2005, component: 'Inspeção visual da correia CVT (moto parada por tempo prolongado)', intervalKm: null, intervalMonths: 12, notes: 'Correia resseca e trinca com o tempo, mesmo com poucos km rodados.', priority: 'MEDIUM', order: 8 },

  // VC 125 ADVANCED
  { modelName: 'VC 125 ADVANCED', yearFrom: 2000, yearTo: 2012, component: 'Óleo 20W-50 JASO MA (~1,0–1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Embreagem molhada — JASO MA obrigatório.', priority: 'HIGH', order: 1 },
  { modelName: 'VC 125 ADVANCED', yearFrom: 2000, yearTo: 2012, component: 'Vela genérica (gap 0,6–0,7mm)', intervalKm: 7000, intervalMonths: null, notes: 'Equivalente por medida de rosca e alcance térmico.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VC 125 ADVANCED', yearFrom: 2000, yearTo: 2012, component: 'Lubrificação corrente 428', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm no trecho inferior.', priority: 'HIGH', order: 3 },
  { modelName: 'VC 125 ADVANCED', yearFrom: 2000, yearTo: 2012, component: 'Kit relação 428 completo', intervalKm: 17500, intervalMonths: null, notes: 'Item comum, não exclusivo Daelim — fácil de achar.', priority: 'MEDIUM', order: 4 },
  { modelName: 'VC 125 ADVANCED', yearFrom: 2000, yearTo: 2012, component: 'Folga de válvulas', intervalKm: 7000, intervalMonths: 12, notes: 'Motor frio. Sintoma de folga errada: partida difícil a frio.', priority: 'HIGH', order: 5 },
  { modelName: 'VC 125 ADVANCED', yearFrom: 2000, yearTo: 2012, component: 'Regulagem do carburador CV', intervalKm: 10000, intervalMonths: 12, notes: 'Sensível a etanol degradado — drenar cuba se parada prolongada.', priority: 'MEDIUM', order: 6 },
  { modelName: 'VC 125 ADVANCED', yearFrom: 2000, yearTo: 2012, component: 'Fluido de freio dianteiro (disco)', intervalKm: null, intervalMonths: 24, notes: 'DOT 4, troca por tempo mesmo com pouco uso.', priority: 'MEDIUM', order: 7 },
  { modelName: 'VC 125 ADVANCED', yearFrom: 2000, yearTo: 2012, component: 'Retentor de bengala dianteira', intervalKm: 22500, intervalMonths: null, notes: 'Vazamento comum em pavimento ruim.', priority: 'MEDIUM', order: 8 },
  { modelName: 'VC 125 ADVANCED', yearFrom: 2000, yearTo: 2012, component: 'Verificação do retificador/regulador (13,5–14,5V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha elétrica mais comum da família custom Daelim.', priority: 'CRITICAL', order: 9 },
  { modelName: 'VC 125 ADVANCED', yearFrom: 2000, yearTo: 2012, component: 'Interruptor de segurança do cavalete lateral', intervalKm: null, intervalMonths: 12, notes: 'Falha causa corte de motor intermitente — mais barato que parece.', priority: 'LOW', order: 10 },

  // VF 125 D
  { modelName: 'VF 125 D', yearFrom: 1996, yearTo: 2008, component: 'Óleo 20W-50 JASO MA (~1,0L)', intervalKm: 3000, intervalMonths: 6, notes: 'Embreagem molhada — JASO MA obrigatório.', priority: 'HIGH', order: 1 },
  { modelName: 'VF 125 D', yearFrom: 1996, yearTo: 2008, component: 'Vela genérica (gap 0,6–0,7mm)', intervalKm: 7000, intervalMonths: null, notes: 'Equivalente por medida — mesmo padrão da família custom.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VF 125 D', yearFrom: 1996, yearTo: 2008, component: 'Lubrificação corrente 428', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm no trecho inferior.', priority: 'HIGH', order: 3 },
  { modelName: 'VF 125 D', yearFrom: 1996, yearTo: 2008, component: 'Kit relação 428 completo', intervalKm: 17500, intervalMonths: null, notes: 'Item comum, fácil de achar.', priority: 'MEDIUM', order: 4 },
  { modelName: 'VF 125 D', yearFrom: 1996, yearTo: 2008, component: 'Folga de válvulas', intervalKm: 7000, intervalMonths: 12, notes: 'Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'VF 125 D', yearFrom: 1996, yearTo: 2008, component: 'Regulagem do carburador', intervalKm: 10000, intervalMonths: 12, notes: 'Sensível a etanol degradado.', priority: 'MEDIUM', order: 6 },
  { modelName: 'VF 125 D', yearFrom: 1996, yearTo: 2008, component: 'Fluido de freio dianteiro (disco)', intervalKm: null, intervalMonths: 24, notes: 'DOT 4, troca por tempo.', priority: 'MEDIUM', order: 7 },
  { modelName: 'VF 125 D', yearFrom: 1996, yearTo: 2008, component: 'Suspensão traseira — regulagem de pré-carga', intervalKm: null, intervalMonths: 12, notes: 'Duplo amortecedor com came/anel regulável — ajustar ao peso do piloto.', priority: 'LOW', order: 8 },
  { modelName: 'VF 125 D', yearFrom: 1996, yearTo: 2008, component: 'Verificação do retificador/regulador (13,5–14,5V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha elétrica mais comum da linha Daelim de entrada.', priority: 'CRITICAL', order: 9 },

  // VS 125 CUSTOM
  { modelName: 'VS 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Óleo 20W-50 JASO MA (~1,0–1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Embreagem molhada. Verificar mangueiras do radiador de óleo na troca.', priority: 'HIGH', order: 1 },
  { modelName: 'VS 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Vela genérica (gap 0,6–0,7mm)', intervalKm: 7000, intervalMonths: null, notes: 'Equivalente por medida de rosca e alcance térmico.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VS 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Lubrificação corrente 428', intervalKm: 500, intervalMonths: null, notes: 'Motor de giro mais alto — atenção redobrada à lubrificação.', priority: 'HIGH', order: 3 },
  { modelName: 'VS 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Inspeção das mangueiras do radiador de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Ponto de vazamento exclusivo do sistema ar/óleo da VS 125.', priority: 'HIGH', order: 4 },
  { modelName: 'VS 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Folga de válvulas', intervalKm: 7000, intervalMonths: 12, notes: 'Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'VS 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Kit relação 428 completo', intervalKm: 17500, intervalMonths: null, notes: 'Item comum, fácil de achar.', priority: 'MEDIUM', order: 6 },
  { modelName: 'VS 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Fluido de freio dianteiro (disco)', intervalKm: null, intervalMonths: 24, notes: 'DOT 4, troca por tempo.', priority: 'MEDIUM', order: 7 },
  { modelName: 'VS 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Teste do sensor de nível de combustível', intervalKm: null, intervalMonths: 24, notes: 'Ponto isolado de falha do painel completo da VS 125.', priority: 'LOW', order: 8 },
  { modelName: 'VS 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Verificação do retificador/regulador (13,5–14,5V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha elétrica mais comum da família custom Daelim.', priority: 'CRITICAL', order: 9 },

  // VT 125 CUSTOM
  { modelName: 'VT 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Óleo 20W-50 JASO MA (~1,0L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor mais potente da família (13,1 cv) — não estenda o intervalo.', priority: 'HIGH', order: 1 },
  { modelName: 'VT 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Vela genérica (gap 0,6–0,7mm)', intervalKm: 7000, intervalMonths: null, notes: 'Equivalente por medida — mesmo padrão da família.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VT 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Lubrificação corrente 428', intervalKm: 500, intervalMonths: null, notes: 'Potência extra desgasta a corrente um pouco mais rápido.', priority: 'HIGH', order: 3 },
  { modelName: 'VT 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Kit relação 428 completo', intervalKm: 17500, intervalMonths: null, notes: 'Item comum, fácil de achar.', priority: 'MEDIUM', order: 4 },
  { modelName: 'VT 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Folga de válvulas', intervalKm: 7000, intervalMonths: 12, notes: 'Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'VT 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Regulagem do carburador', intervalKm: 10000, intervalMonths: 12, notes: 'Sensível a etanol degradado.', priority: 'MEDIUM', order: 6 },
  { modelName: 'VT 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Inspeção do cromado do escapamento', intervalKm: null, intervalMonths: 12, notes: 'Corrosão sob o cromo é mais frequente perto do litoral.', priority: 'LOW', order: 7 },
  { modelName: 'VT 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Fluido de freio dianteiro (disco)', intervalKm: null, intervalMonths: 24, notes: 'DOT 4, troca por tempo.', priority: 'MEDIUM', order: 8 },
  { modelName: 'VT 125 CUSTOM', yearFrom: 1998, yearTo: 2012, component: 'Verificação do retificador/regulador (13,5–14,5V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha elétrica mais comum da família custom Daelim.', priority: 'CRITICAL', order: 9 },

  // VX 125
  { modelName: 'VX 125', yearFrom: 2000, yearTo: 2012, component: 'Óleo 20W-50 JASO MA (~1,0L, estimado)', intervalKm: 3000, intervalMonths: 6, notes: 'Confirme capacidade exata na etiqueta do motor da sua unidade.', priority: 'HIGH', order: 1 },
  { modelName: 'VX 125', yearFrom: 2000, yearTo: 2012, component: 'Vela genérica (gap 0,6–0,7mm)', intervalKm: 7000, intervalMonths: null, notes: 'Equivalente por medida — mesmo padrão da família VS/VT/VC.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VX 125', yearFrom: 2000, yearTo: 2012, component: 'Lubrificação corrente 428', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm no trecho inferior.', priority: 'HIGH', order: 3 },
  { modelName: 'VX 125', yearFrom: 2000, yearTo: 2012, component: 'Kit relação 428 completo', intervalKm: 17500, intervalMonths: null, notes: 'Item comum, fácil de achar.', priority: 'MEDIUM', order: 4 },
  { modelName: 'VX 125', yearFrom: 2000, yearTo: 2012, component: 'Folga de válvulas', intervalKm: 7000, intervalMonths: 12, notes: 'Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'VX 125', yearFrom: 2000, yearTo: 2012, component: 'Regulagem do carburador', intervalKm: 10000, intervalMonths: 12, notes: 'Sensível a etanol degradado.', priority: 'MEDIUM', order: 6 },
  { modelName: 'VX 125', yearFrom: 2000, yearTo: 2012, component: 'Retentor de bengala dianteira', intervalKm: 22500, intervalMonths: null, notes: 'Vazamento comum em pavimento ruim, mesmo padrão da família.', priority: 'MEDIUM', order: 7 },
  { modelName: 'VX 125', yearFrom: 2000, yearTo: 2012, component: 'Fluido de freio dianteiro (disco)', intervalKm: null, intervalMonths: 24, notes: 'DOT 4, troca por tempo.', priority: 'MEDIUM', order: 8 },
  { modelName: 'VX 125', yearFrom: 2000, yearTo: 2012, component: 'Verificação do retificador/regulador (13,5–14,5V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha elétrica mais comum da família custom Daelim.', priority: 'CRITICAL', order: 9 },
]

// ─── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Daelim iniciando...\n')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'DAELIM', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'DAELIM', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${brand.name}`)

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
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
        yearFrom: null,
        yearTo: null,
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
    console.log(`  ✅ ${tp.modelName}: ${tp.frontPsi}/${tp.rearPsi} PSI`)
  }

  console.log('\n  🔧 Cronogramas de manutenção...')
  const modelNames = [...new Set(MAINTENANCE_ITEMS.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: MAINTENANCE_ITEMS.map(item => ({
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
    const count = MAINTENANCE_ITEMS.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = BLOCKS.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed Daelim concluído: ${BLOCKS.length} modelos, ${totalTips} dicas, ` +
    `${TIRE_PRESSURES.length} calibragens, ${MAINTENANCE_ITEMS.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
