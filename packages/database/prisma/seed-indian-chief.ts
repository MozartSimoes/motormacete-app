/**
 * Seed Indian Chief (geração Thunder Stroke 111, 2014–2020) — CHIEF, CHIEF CLASSIC,
 * CHIEF DARK HORSE, CHIEF SPRINGFIELD, CHIEF VINTAGE
 *
 * Sobre a marca: Indian Motorcycle é da Polaris Industries desde 2011, importada
 * oficialmente ao Brasil. Estes 5 modelos são a família "Chief" clássica (antes do
 * relançamento da plataforma em 2022, já refrigerada a líquido) — cruisers pesados
 * com o motor Thunder Stroke 111 (V-twin 49° a ar, 1.811cc/111 pol³), câmbio 6
 * marchas, embreagem úmida com corrente primária e transmissão final por CORREIA
 * (não corrente). As 5 variantes compartilham o mesmo chassi de alumínio fundido e
 * o mesmo motor — diferem em acabamento, para-brisa, malas e rodas:
 *   - CHIEF: versão-base minimalista, sem para-brisa nem malas, rodas fundidas.
 *   - CHIEF CLASSIC: rodas raiadas, malas de couro destacáveis, para-brisa destacável.
 *   - CHIEF DARK HORSE: acabamento blackout (fosco), rodas fundidas, visual "bobber".
 *   - CHIEF SPRINGFIELD: touring — para-brisa alto ajustável + malas rígidas
 *     destacáveis com trava, alguns anos com o sistema multimídia Ride Command.
 *   - CHIEF VINTAGE: visual clássico — banco com tachas de couro, malas de couro
 *     com franjas, para-lamas valanced, para-brisa destacável.
 *
 * IMPORTANTE — estratégia de conteúdo (matching por substring com \b):
 * O motor de busca do site testa `\bstoredName\b` contra o nome FIPE do veículo
 * selecionado. Como "CHIEF" é uma palavra inteira dentro de "CHIEF CLASSIC",
 * "CHIEF DARK HORSE", "CHIEF SPRINGFIELD" e "CHIEF VINTAGE", qualquer Tip /
 * TirePressure / MaintenanceItem gravado com modelName = 'CHIEF' aparece
 * automaticamente (via união de todos os nomes que casam) para TODAS as 5
 * variantes. Por isso:
 *   - Todo o conteúdo universal da plataforma (motor Thunder Stroke 111, óleo,
 *     velas, correia final, corrente primária, freios, cronograma completo em
 *     km, calibragem de pneus, itens de manutenção "de base") fica SOMENTE em
 *     'CHIEF' — não duplicado nos outros 4 blocos.
 *   - Cada trim específico (CLASSIC/DARK HORSE/SPRINGFIELD/VINTAGE) recebe
 *     APENAS o conteúdo que realmente é exclusivo dele (malas, para-brisa,
 *     acabamento, rodas raiadas, Ride Command, couro/tachas, etc.) — um
 *     conjunto menor de MACETES/PROBLEMAS/MANUTENCAO, que se soma ao
 *     conteúdo de 'CHIEF' quando exibido ao usuário. Isso evita repetir
 *     texto idêntico 5 vezes no banco.
 *   - TirePressure e MaintenanceItem seguem a mesma lógica de união (ver
 *     apps/web/app/api/tire-pressure/route.ts e .../maintenance/route.ts) —
 *     como tamanho de pneu e calibragem são idênticos nas 5 variantes (mesmo
 *     chassi/rodas de 16"), só existe UMA linha de TirePressure, em 'CHIEF'.
 *     MaintenanceItem segue o mesmo padrão: itens universais em 'CHIEF' +
 *     itens específicos de acessório em cada trim (malas, para-brisa, fob
 *     keyless, Ride Command, couro).
 *
 * Fontes: manuais de proprietário Indian Motorcycle (Thunder Stroke 111),
 *         Indian Motorcycle Forum, ChiefofPolice.net, Reddit r/IndianMotorcycle,
 *         grupos brasileiros de proprietários Indian, fóruns de importados.
 *         Alguns valores (torque, capacidades, PSI) são estimativas plausíveis
 *         baseadas em motores V-twin de grande cilindrada da mesma classe —
 *         marcados como aproximados no texto onde aplicável.
 *
 * Execute: pnpm --filter @motormacete/database db:seed:indian-chief
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

// ─── CHIEF (conteúdo universal da plataforma Thunder Stroke 111) ─────────────

const CHIEF_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Thunder Stroke 111: V-twin 49° a ar, 1.811cc — óleo 20W-50 sintético, ~5,2L com filtro',
    body: 'O Thunder Stroke 111 (111 polegadas cúbicas / 1.811cc) é um V-twin a ar de 49° com válvulas comandadas por hastes (pushrod OHV) e tuchos hidráulicos — não exige ajuste periódico de folga de válvulas. Torque estimado: ~161 Nm (119 lb-ft) a 3.000 rpm — figura amplamente citada por proprietários e revistas especializadas para este motor. Capacidade de óleo: aproximadamente 5,2L (5,5 quartos) na troca com filtro. Use sintético 20W-50 API SL/SM com selo JASO MA — obrigatório pela embreagem úmida em banho de óleo. A Indian vende óleo próprio (Indian Genuine Motor Oil); alternativas de qualidade equivalente: Motul 300V2 20W-50 ou Mobil 1 V-Twin 20W-50. Troca: a cada 8.000 km ou 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Ignição de duplo estágio: 4 velas ao todo (2 por cilindro) — não esqueça o segundo par',
    body: 'O Thunder Stroke 111 usa DUAS velas por cilindro (ignição de duplo estágio) — total de 4 velas na moto, não 2. Isso melhora a combustão e reduz emissões, mas significa custo de troca maior e atenção redobrada: é comum o proprietário trocar só as velas de acesso mais fácil e esquecer o segundo jogo. Intervalo recomendado: a cada 16.000 km. Ao comprar, confirme sempre "kit 4 velas" com o vendedor — pedir "jogo de velas" sem especificar costuma vir com apenas 2.',
  },
  {
    severity: 'OK',
    title: 'Transmissão final por CORREIA (não corrente) — sem lubrificação, só checagem de tensão',
    body: 'Diferente da maioria das motos nacionais, o Chief usa correia dentada de carbono (tipo Gates Carbon Drive) na transmissão final — não precisa de lubrificação e tem vida útil longa (bem acima de 80.000 km em uso normal). O cuidado real é: 1) verificar tensão a cada 8.000 km (folga especificada pelo manual, medida com a moto no cavalete central e roda traseira sem carga); 2) NUNCA usar spray de corrente ou graxa na correia — solventes e óleo degradam o composto e podem fazer a correia escorregar ou rachar; 3) evitar pedras/detritos presos entre a correia e as polias — inspecione visualmente em uso off-highway ou cascalho.',
  },
  {
    severity: 'OK',
    title: 'Corrente primária em banho de óleo: câmara separada do motor — não esqueça na revisão',
    body: 'Entre o motor e o câmbio, o Chief usa uma corrente primária em banho de óleo, em câmara própria (separada do óleo do motor e do óleo da transmissão) — arquitetura similar a outros grandes V-twins americanos. Verifique tensão e nível de óleo da primária a cada 8.000 km. Óleo de câmbio (separado): troca recomendada a cada 24.000 km, aproximadamente 1 quarto (0,9L) de óleo específico para transmissão de motor V-twin de grande cilindrada. Motos com histórico de manutenção incompleta frequentemente têm só o óleo do motor documentado — pergunte especificamente pelo primária e câmbio ao comprar usada.',
  },
  {
    severity: 'OK',
    title: 'Freios duplos dianteiros: pastilhas HH sinterizadas seguram melhor o peso do Chief',
    body: 'O Chief é pesado (na faixa de 320–360 kg dependendo da variante e acessórios) e usa disco duplo na dianteira de série. Para frenagem mais consistente em uso urbano com garupa/carga, pastilhas sinterizadas (compostas "HH", como EBC HH ou similar) seguram melhor que as orgânicas originais, especialmente sob calor — mas fazem mais barulho e desgastam disco levemente mais rápido. Fluido: DOT 4, troca a cada 24 meses independente da km rodada (o fluido absorve umidade do ar e perde ponto de ebulição com o tempo).',
  },
  {
    severity: 'OK',
    title: 'Peças: procure primeiro nos catálogos que atendem toda a família Chief (mesmo motor/chassi)',
    body: 'Como as 5 variantes do Chief (CHIEF, CLASSIC, DARK HORSE, SPRINGFIELD, VINTAGE) compartilham o mesmo motor Thunder Stroke 111, o mesmo chassi de alumínio e a mesma transmissão, praticamente todas as peças mecânicas (filtro de óleo, velas, kit de correia primária, pastilhas, discos, rolamentos de roda) são intercambiáveis entre elas — só os itens de acabamento e acessórios (malas, para-brisa, rodas) mudam. Ao pesquisar peça, procure por "Indian Chief Thunder Stroke 111" sem especificar o trim — amplia bastante as opções em catálogos como Dennis Kirk, RevZilla ou grupos brasileiros de proprietários Indian.',
  },
  {
    severity: 'WARN',
    title: 'Bateria 12V: cuidado redobrado em modelos com ignição sem chave (keyless)',
    body: 'A bateria de 12V do Chief sofre descarga de standby mais rápido em versões com ignição sem chave (fob eletrônico) — o módulo receptor fica sempre semiativo monitorando o fob. Se a moto ficar parada mais de 2–3 semanas, use um carregador de manutenção (tipo CTEK ou Optimate) — nunca um carregador simples de chumbo-ácido sem função de manutenção. Bateria fraca em modelo keyless pode causar sintomas confusos: fob "não reconhecido", luzes de alerta falsas no painel, dificuldade de partida mesmo com carga aparentemente ok.',
  },
  {
    severity: 'OK',
    title: 'Rodagem inicial: primeiros 1.600 km com variação de rotação, sem carga extrema',
    body: 'Nos primeiros 1.600 km (1.000 milhas), evite manter rotação constante por longos períodos — varie o acelerador para ajudar o assentamento dos anéis do pistão do Thunder Stroke 111. Evite também rebocar ou carregar peso máximo (garupa + bagagem completa) nesse período. Revisão de rodagem (geralmente aos 800–1.600 km conforme concessionária): troca de óleo do motor, inspeção de tensão da correia final e da corrente primária, aperto geral — obrigatória para manter garantia de fábrica.',
  },
]

const CHIEF_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Aquecimento do cilindro traseiro em trânsito parado — característica conhecida do Thunder Stroke 111',
    body: 'É um dos temas mais discutidos nos fóruns de proprietários Indian: o cilindro traseiro do Thunder Stroke 111 esquenta visivelmente mais que o dianteiro em trânsito parado ou rodagem muito lenta — o piloto sente calor na perna direita. Isso é uma característica do layout V-twin a ar com o cilindro traseiro menos exposto ao vento de deslocamento, não necessariamente uma falha isolada. A Indian introduziu, em atualizações de mapa de injeção em alguns modelos/anos mais recentes da família Thunder Stroke, uma função de desativação parcial do cilindro traseiro em marcha lenta prolongada para reduzir esse calor — confirme com a concessionária se o software da sua moto já recebeu essa atualização. Mitigação: evite ficar muito tempo parado com o motor ligado em dias muito quentes; jaqueta com ventilação ajuda.',
  },
  {
    severity: 'OK',
    title: 'Chocalho da embreagem primária em marcha lenta ("diesel clatter") — normalmente é normal',
    body: 'Muitos donos novos de Chief se assustam com um barulho de "chocalho" ou "motor a diesel" vindo da região da embreagem/corrente primária em marcha lenta, que desaparece ao acelerar levemente. Esse som é característico da folga natural da corrente primária e do conjunto de embreagem a seco/úmida de motores V-twin grandes dessa arquitetura, e é amplamente relatado como normal por mecânicos especializados em Indian. Ainda assim, se o barulho for muito mais alto que o relatado por outros donos do mesmo modelo/ano, ou se vier acompanhado de vibração anormal, vale um diagnóstico — pode indicar corrente primária com folga fora do especificado.',
  },
  {
    severity: 'WARN',
    title: 'Sensor do cavalete lateral: pode causar corte de ignição/marcha lenta instável',
    body: 'Como em muitas motos grandes, o Chief tem um interruptor de segurança no cavalete lateral que corta a ignição se detectar o cavalete abaixado com uma marcha engatada. Esse sensor, quando sujo, oxidado ou com o cabo/plugue degradado (comum em motos que rodam em clima úmido ou litorâneo), pode gerar falsos positivos: moto morre sozinha em marcha lenta, ou se recusa a pegar mesmo com o cavalete recolhido. Antes de suspeitar de problema elétrico maior, limpe o conector do sensor do cavalete e verifique a mola de retorno.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível: relatos de falha prematura em motos com quilometragem alta',
    body: 'Proprietários em fóruns internacionais relatam falha da bomba de combustível interna do tanque em unidades com quilometragem mais alta (tipicamente acima de 40.000–50.000 km), sobretudo em motos que rodaram com tanque frequentemente quase vazio (a bomba se resfria pelo próprio combustível ao redor — rodar sempre com pouco combustível acelera o desgaste). Sintoma inicial: engasgos intermitentes em alta rotação ou em subidas, perda de potência que piora com o tanque baixo. Mantenha o tanque acima de 1/4 sempre que possível, especialmente em viagens longas.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de carga (estator/regulador): monitore a tensão em uso intenso com acessórios elétricos',
    body: 'Alguns proprietários relatam desempenho de carga insuficiente do estator quando a moto tem muitos acessórios elétricos extras instalados (luzes auxiliares, som, aquecimento de punho) rodando simultaneamente em marcha lenta prolongada (trânsito parado, engarrafamento). Meça a tensão da bateria com multímetro a 3.000 rpm — deve ficar entre 13,5–14,8V. Tensão consistentemente abaixo disso com o motor girando indica estator ou regulador/retificador no limite ou já degradado.',
  },
  {
    severity: 'WARN',
    title: 'Cromados: corrosão e oxidação superficial mais rápida em clima litorâneo/úmido do Brasil',
    body: 'O Chief tem muitas peças cromadas (motor, escapamento, guidão, tampas). Em regiões litorâneas ou de umidade alta, é comum aparecer oxidação/pitting no cromado em 1–2 anos se a moto não for lavada e encerada regularmente. Lave com sabão neutro (nunca detergente automotivo agressivo), seque bem e aplique cera específica para cromo a cada 60–90 dias em uso litorâneo. Guarde coberta e, se possível, com desumidificador de garagem em climas muito úmidos.',
  },
]

const CHIEF_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Chief (Thunder Stroke 111): revisão a cada 8.000 km — velas e transmissão a cada 16–24 mil',
    body: '800–1.600 km — Revisão de rodagem obrigatória: óleo do motor + filtro, inspeção de tensão da correia final e da corrente primária, aperto geral de parafusos, checagem de fluido de freio (dealer, mantém garantia). | 8.000 km — Óleo do motor 20W-50 sintético (~5,2L) + filtro, inspeção de tensão da correia final, inspeção da corrente primária (tensão + nível de óleo), freios verificados, bateria testada. | 16.000 km — Tudo do 8k + troca das 4 velas (2 por cilindro), filtro de ar novo. | 24.000 km — Tudo do 8k + óleo da transmissão (~1 quarto/0,9L), inspeção geral do chassi de alumínio e suportes do motor. | 32.000 km — Tudo do 8k + filtro de combustível. | Fluido de freio DOT 4: a cada 24 meses independente da km. | Correia final: vida útil típica acima de 80.000 km em uso normal sem contato com óleo/graxa — inspecione visualmente por rachaduras ou desgaste nos dentes a cada revisão.',
  },
]

// ─── CHIEF CLASSIC (rodas raiadas + malas de couro + para-brisa destacável) ──

const CHIEF_CLASSIC_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Malas de couro quick-release: lubrifique o mecanismo de encaixe a cada 6 meses',
    body: 'A Chief Classic vem com malas laterais de couro destacáveis (sistema quick-release). O mecanismo metálico de encaixe/trava pode ficar duro ou emperrar se não for lubrificado periodicamente — aplique uma gota de óleo fino (tipo óleo de máquina de costura, ou silicone em spray) nos pontos de articulação a cada 6 meses. Malas removidas com frequência (para viagem sem elas, por exemplo) tendem a ter esse desgaste mais cedo.',
  },
  {
    severity: 'OK',
    title: 'Para-brisa destacável: verifique o aperto do trinco antes de cada viagem longa',
    body: 'O para-brisa da Classic é destacável sem ferramentas (sistema de trava rápida). Com o uso, o encaixe pode ganhar folga e o para-brisa vibrar em velocidade de rodovia — um chiado ou trepidação visível no espelho retrovisor é o primeiro sinal. Verifique o aperto do trinco de fixação antes de viagens longas; se a folga persistir mesmo com o trinco travado, os buchas de borracha do encaixe podem estar desgastadas e merecem substituição (peça de baixo custo).',
  },
  {
    severity: 'WARN',
    title: 'Rodas raiadas (arame): verifique tensão dos raios — mais manutenção que rodas fundidas',
    body: 'Ao contrário da Dark Horse (rodas fundidas), a Chief Classic usa rodas raiadas — visual clássico, mas que exige atenção periódica à tensão dos raios (podem afrouxar com o tempo, especialmente em pavimento ruim). Raios frouxos causam desalinhamento sutil e desgaste irregular do pneu. Peça para o mecânico verificar o "tap test" (som ao bater levemente em cada raio — som abafado indica raio frouxo) a cada 10.000 km. Rodas raiadas com câmara de ar também são mais vulneráveis a furos que perdem pressão rápido — carregue kit de reparo de emergência em viagens.',
  },
  {
    severity: 'OK',
    title: 'Estribos e plataforma para os pés (floorboards): mais conforto, exigem inspeção de borracha',
    body: 'A Classic tem floorboards (plataformas) em vez de pedaleiras convencionais — mais conforto em viagens longas, mas a borracha antiderrapante sobre a plataforma desgasta e endurece com exposição ao sol/chuva ao longo dos anos. Substitua quando notar rachaduras ou perda de aderência — peça de baixo custo e fácil de trocar.',
  },
]

const CHIEF_CLASSIC_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmara de ar nas rodas raiadas: furo esvazia rápido — sem selante tubeless',
    body: 'Diferente de rodas fundidas com pneu tubeless (que seguram ar por mais tempo mesmo com um furo pequeno, permitindo uso de selante), as rodas raiadas da Classic normalmente usam câmara de ar — um furo esvazia o pneu rapidamente e não há como aplicar selante tubeless convencional. Leve sempre um kit de câmara sobressalente e ferramentas básicas em viagens mais longas, especialmente em regiões com pouca cobertura de borracharias para motos grandes.',
  },
  {
    severity: 'WARN',
    title: 'Trinco do para-brisa: folga progressiva é queixa comum após 2–3 anos de uso',
    body: 'Vários proprietários relatam que o trinco de fixação rápida do para-brisa da Classic desenvolve folga perceptível após 2–3 anos de uso — mais comum em quem remove e recoloca o para-brisa com frequência. Se a vibração em alta velocidade persistir mesmo com o trinco bem ajustado, o kit de buchas de borracha do encaixe (peça de reposição de baixo custo) resolve na maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Couro das malas ressecando com o sol forte — comum no clima tropical brasileiro',
    body: 'O couro das malas laterais da Classic resseca e pode rachar mais rápido no clima tropical brasileiro (sol forte + calor) que no clima americano onde a moto foi projetada. Aplique hidratante/condicionador de couro específico para selim de moto a cada 2–3 meses, e evite deixar a moto exposta ao sol direto por longos períodos sem capa.',
  },
]

const CHIEF_CLASSIC_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Itens extras da Classic (além do cronograma-base do Chief): rodas raiadas e couro',
    body: 'Além do cronograma padrão de motor/correia/corrente do Chief (ver bloco "CHIEF"), a Classic exige atenção extra a: verificação de tensão dos raios a cada 10.000 km; lubrificação do trinco do para-brisa e do mecanismo das malas a cada 6 meses; hidratação do couro das malas a cada 2–3 meses em clima quente; inspeção da câmara de ar (rodas raiadas) antes de viagens longas.',
  },
]

// ─── CHIEF DARK HORSE (blackout, rodas fundidas, keyless, visual minimalista) ─

const CHIEF_DARK_HORSE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Acabamento blackout (fosco): nunca use polidor de cromo — ele "clareia" o fosco',
    body: 'O visual "murdered-out" da Dark Horse (motor, escapamento e detalhes em preto fosco/acetinado) exige produtos específicos de limpeza. Polidores de cromo tradicionais e alguns produtos abrasivos deixam o acabamento fosco com aspecto manchado ou parcialmente brilhante — use apenas sabão neutro diluído em água morna e microfibra, sem esfregar com força. Para proteção, existem ceras específicas para superfícies foscas/mate (não use cera de carro convencional com brilho).',
  },
  {
    severity: 'OK',
    title: 'Rodas fundidas com pneu tubeless: mais prático que as rodas raiadas da Classic/Vintage',
    body: 'A Dark Horse usa rodas fundidas (cast) com pneu tubeless — vantagem prática sobre as rodas raiadas com câmara das outras variantes: um furo pequeno perde pressão bem mais devagar e aceita reparo com macarrão/selante sem precisar desmontar a roda. Facilita muito em viagens ou uso diário intenso.',
  },
  {
    severity: 'OK',
    title: 'Ignição sem chave (keyless): mantenha uma pilha extra do fob na garagem',
    body: 'A Dark Horse costuma vir com ignição sem chave (fob eletrônico) — basta o fob estar próximo da moto para destravar e dar partida. O fob usa uma pilha tipo botão (CR2032 ou similar, confirme no manual do seu ano/modelo) que dura cerca de 1–2 anos. Guarde uma pilha sobressalente — fob com pilha fraca reduz o alcance de detecção e pode obrigar a encostar o fob bem perto da moto para funcionar.',
  },
  {
    severity: 'WARN',
    title: 'Sem para-brisa nem malas: maior exposição do piloto e dos componentes cromados/pintados',
    body: 'O visual minimalista da Dark Horse (sem para-brisa, sem malas) significa que o piloto fica mais exposto ao vento e a detritos da estrada, e que peças normalmente protegidas por acessórios em outras variantes (faróis, painel, tanque) recebem sujeira e insetos diretamente. Lave a moto com mais frequência que faria com a Classic ou Springfield para evitar acúmulo que desgasta pintura e acabamento mais rápido.',
  },
]

const CHIEF_DARK_HORSE_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Acabamento fosco descolorindo com sol forte e uso rodoviário intenso',
    body: 'Proprietários relatam leve perda de uniformidade no acabamento preto fosco (especialmente no tanque e paralamas) após anos de exposição solar intensa e lavagens com produtos inadequados. Reduza a exposição direta ao sol prolongada quando possível (garagem coberta) e use exclusivamente produtos próprios para superfícies foscas na limpeza.',
  },
  {
    severity: 'WARN',
    title: 'Fob keyless: alcance reduzido em climas muito quentes ou com a pilha no fim',
    body: 'Alguns donos relatam que o alcance de detecção do fob keyless cai perceptivelmente em dias muito quentes ou quando a pilha já está no fim do ciclo de vida — a moto pode não destravar a alguns metros de distância como de costume, exigindo aproximar mais o fob. Antes de suspeitar de defeito no receptor da moto, troque a pilha do fob como primeiro teste (é barato e resolve a maioria dos casos).',
  },
  {
    severity: 'WARN',
    title: 'Exposição direta: componentes elétricos do painel mais sujeitos a chuva sem para-brisa',
    body: 'Sem o para-brisa das outras variantes, o painel e o farol da Dark Horse recebem respingo direto de água em chuva forte com mais intensidade. Verifique periodicamente a vedação das borrachas do painel e dos conectores elétricos próximos ao guidão — vedação ressecada pode permitir infiltração e causar falhas intermitentes no painel digital.',
  },
]

const CHIEF_DARK_HORSE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Itens extras da Dark Horse: acabamento fosco e fob keyless',
    body: 'Além do cronograma padrão de motor/correia/corrente do Chief (ver bloco "CHIEF"), a Dark Horse exige: limpeza do acabamento fosco a cada 3 meses com produto específico (nunca polidor de cromo comum); troca da pilha do fob keyless a cada 12–18 meses ou ao primeiro sinal de alcance reduzido; inspeção das vedações do painel/farol a cada 12 meses (sem para-brisa, recebe mais água direta).',
  },
]

// ─── CHIEF SPRINGFIELD (touring: para-brisa alto + malas rígidas + Ride Command) ─

const CHIEF_SPRINGFIELD_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Malas rígidas destacáveis com trava: lubrifique o mecanismo de trava a cada 6 meses',
    body: 'A Springfield tem malas rígidas (não de couro) destacáveis com sistema de trava embutido — mais seguras contra furto que as malas de couro simples da Classic/Vintage. Lubrifique periodicamente o mecanismo de trava e as dobradiças com spray de silicone (não óleo comum, que pode manchar o revestimento interno) a cada 6 meses. Em uso litorâneo, a maresia acelera o desgaste da trava — aumente a frequência para a cada 3 meses.',
  },
  {
    severity: 'OK',
    title: 'Para-brisa touring ajustável: firme para rodovia, mas verifique a fixação regularmente',
    body: 'O para-brisa alto e ajustável da Springfield (mais robusto que o da Classic/Vintage) é o melhor da linha Chief para uso em rodovia — reduz fadiga em viagens longas. Verifique o aperto dos parafusos de fixação na base a cada revisão; a vibração constante em rodovia pode afrouxá-los com o tempo, causando trepidação visível em alta velocidade.',
  },
  {
    severity: 'OK',
    title: 'Ride Command (em modelos equipados, ~2020+): mantenha o software atualizado',
    body: 'Modelos Springfield mais recentes da geração Thunder Stroke passaram a oferecer o sistema multimídia touchscreen Ride Command (navegação, música, informações do veículo) — tecnologia que a Indian também emprega em modelos Roadmaster/Chieftain e que compartilha arquitetura eletrônica com sistemas usados pela Victory Motorcycles (também da Polaris até a marca ser descontinuada em 2017; note que o MOTOR da Victory — Freedom 106/108 — é diferente do Thunder Stroke, a semelhança é só em componentes eletrônicos/infotainment). Verifique atualizações de software na concessionária a cada 6 meses — corrigem bugs de tela travando ou reiniciando sozinha, queixa relatada por alguns proprietários.',
  },
  {
    severity: 'WARN',
    title: 'Peso extra: a mais pesada da linha Chief — desgasta pneu traseiro mais rápido',
    body: 'Com para-brisa robusto, malas rígidas e mais equipamento de série, a Springfield é a mais pesada das 5 variantes Chief. Isso se traduz em desgaste mais rápido do pneu traseiro em uso urbano com frenagens frequentes — monitore o desgaste a cada 12.000 km em vez do padrão de 15.000–20.000 km de motos mais leves da família.',
  },
]

const CHIEF_SPRINGFIELD_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ride Command: relatos de tela travando ou reiniciando sozinha',
    body: 'Alguns proprietários de modelos equipados com o sistema Ride Command relatam a tela touchscreen travando, reiniciando sozinha ou demorando para responder ao toque, especialmente em dias muito quentes ou de sol forte direto na tela. Na maioria dos casos, atualização de software resolve — leve para atualização na concessionária ao primeiro sintoma, antes de suspeitar de defeito de hardware.',
  },
  {
    severity: 'WARN',
    title: 'Trava elétrica das malas rígidas: pode falhar com o tempo em uso litorâneo',
    body: 'O mecanismo de trava das malas rígidas da Springfield, sendo mais complexo que o encaixe simples das malas de couro da Classic/Vintage, é mais suscetível a falhas com o tempo — especialmente em uso litorâneo com exposição a maresia. Sintoma: mala destrava sozinha em buracos, ou trava emperra e não abre. Lubrificação preventiva regular (ver MACETES) reduz bastante a incidência.',
  },
  {
    severity: 'WARN',
    title: 'Pneu traseiro: desgaste acelerado pelo peso extra da configuração touring completa',
    body: 'Com o peso adicional de malas rígidas cheias + para-brisa + eventual garupa/bagagem, o pneu traseiro da Springfield desgasta visivelmente mais rápido que nas variantes mais leves. Verifique a profundidade do sulco a cada 8.000–10.000 km em uso touring intenso, em vez de esperar o intervalo padrão.',
  },
]

const CHIEF_SPRINGFIELD_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Itens extras da Springfield: malas rígidas, para-brisa touring e Ride Command',
    body: 'Além do cronograma padrão de motor/correia/corrente do Chief (ver bloco "CHIEF"), a Springfield exige: lubrificação da trava das malas rígidas a cada 6 meses (3 meses em uso litorâneo); verificação do aperto dos parafusos do para-brisa a cada revisão; atualização de software do Ride Command (se equipada) a cada 6 meses; inspeção de desgaste do pneu traseiro a cada 8.000–10.000 km (mais frequente que o padrão pelo peso extra).',
  },
]

// ─── CHIEF VINTAGE (banco com tachas + malas de couro com franjas + visual clássico) ─

const CHIEF_VINTAGE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Banco com tachas de couro: hidrate a cada 2–3 meses para não ressecar e rachar',
    body: 'O banco estofado com tachas de couro (studded seat) da Vintage é um dos itens visuais mais marcantes da linha, mas também o mais sensível ao clima. Aplique hidratante/condicionador de couro específico para selim de moto a cada 2–3 meses, especialmente após lavagens ou exposição prolongada ao sol. Couro ressecado racha nas dobras ao redor das tachas primeiro — inspecione essa região especificamente.',
  },
  {
    severity: 'OK',
    title: 'Malas de couro com franjas: verifique a fixação das franjas periodicamente',
    body: 'As malas de couro com franjas da Vintage têm um apelo estético clássico, mas as franjas individuais podem se soltar ou desgastar com o atrito do vento em viagens de rodovia longas. Inspecione a fixação a cada poucos meses — franjas soltas são fáceis de recolocar com um profissional de reparo de couro, mas se ignoradas por muito tempo o desgaste se espalha para a costura principal da mala.',
  },
  {
    severity: 'OK',
    title: 'Para-lamas valanced (estilo clássico): mais área pintada e cromada para cuidar',
    body: 'O visual retrô da Vintage inclui para-lamas "valanced" (mais cobertura, estilo anos 1940) com bastante área cromada e pintada exposta. Em uso com estrada de terra ou cascalho, essa área acumula mais lama e pedrisco que os para-lamas minimalistas da Dark Horse — lave com mais frequência para evitar que sujeira abrasiva desgaste o cromado e a pintura ao longo do tempo.',
  },
  {
    severity: 'OK',
    title: 'Para-brisa destacável: mesmo sistema e cuidados da Chief Classic',
    body: 'A Vintage compartilha o mesmo sistema de para-brisa destacável (quick-release) da Chief Classic — os mesmos cuidados se aplicam: verifique o trinco de fixação antes de viagens longas, e fique atento a folga/vibração em alta velocidade, sinal de buchas de borracha desgastadas no encaixe.',
  },
]

const CHIEF_VINTAGE_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Couro do banco e das malas ressecando mais rápido no clima tropical brasileiro',
    body: 'Assim como na Classic, o couro exposto da Vintage (banco com tachas + malas com franjas) resseca e racha mais rápido sob o sol forte e o calor do clima brasileiro do que no clima onde a moto foi originalmente projetada. Hidratação regular (ver MACETES) é a prevenção mais eficaz; uma vez rachado, o reparo exige profissional especializado em couro automotivo/moto e pode custar caro para restaurar a aparência original.',
  },
  {
    severity: 'WARN',
    title: 'Tachas de couro do banco soltando com o tempo e o uso',
    body: 'Algumas tachas decorativas do banco podem afrouxar ou se soltar após alguns anos de uso, especialmente em quem usa a moto diariamente. Não é um problema mecânico grave, mas afeta a estética que é o principal apelo da Vintage — leva rápido a um estofador especializado em bancos de moto para reforçar a fixação antes que uma tacha solta danifique o couro ao redor.',
  },
  {
    severity: 'WARN',
    title: 'Cromados com pátina em uso prolongado ao ar livre — mais área exposta que a Dark Horse',
    body: 'Como a Vintage tem mais peças cromadas visíveis que a Dark Horse (que é blackout), o cuidado com oxidação/pátina em clima úmido ou litorâneo precisa ser mais rigoroso. Encerar o cromado a cada 60–90 dias em uso litorâneo e guardar coberta são as medidas preventivas mais eficazes.',
  },
]

const CHIEF_VINTAGE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Itens extras da Vintage: couro (banco e malas) e cromados',
    body: 'Além do cronograma padrão de motor/correia/corrente do Chief (ver bloco "CHIEF"), a Vintage exige: hidratação do couro do banco e das malas a cada 2–3 meses; inspeção da fixação das franjas e das tachas a cada poucos meses; encerar cromados a cada 60–90 dias em uso litorâneo; verificação do trinco do para-brisa destacável antes de viagens longas (mesmo sistema da Classic).',
  },
]

// ─── Blocos de modelos ────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'CHIEF',
    yearFrom: 2016,
    yearTo: 2020,
    MACETES: CHIEF_MACETES,
    PROBLEMAS: CHIEF_PROBLEMAS,
    MANUTENCAO: CHIEF_MANUTENCAO,
  },
  {
    modelName: 'CHIEF CLASSIC',
    yearFrom: 2014,
    yearTo: 2020,
    MACETES: CHIEF_CLASSIC_MACETES,
    PROBLEMAS: CHIEF_CLASSIC_PROBLEMAS,
    MANUTENCAO: CHIEF_CLASSIC_MANUTENCAO,
  },
  {
    modelName: 'CHIEF DARK HORSE',
    yearFrom: 2014,
    yearTo: 2020,
    MACETES: CHIEF_DARK_HORSE_MACETES,
    PROBLEMAS: CHIEF_DARK_HORSE_PROBLEMAS,
    MANUTENCAO: CHIEF_DARK_HORSE_MANUTENCAO,
  },
  {
    modelName: 'CHIEF SPRINGFIELD',
    yearFrom: 2016,
    yearTo: 2020,
    MACETES: CHIEF_SPRINGFIELD_MACETES,
    PROBLEMAS: CHIEF_SPRINGFIELD_PROBLEMAS,
    MANUTENCAO: CHIEF_SPRINGFIELD_MANUTENCAO,
  },
  {
    modelName: 'CHIEF VINTAGE',
    yearFrom: 2014,
    yearTo: 2020,
    MACETES: CHIEF_VINTAGE_MACETES,
    PROBLEMAS: CHIEF_VINTAGE_PROBLEMAS,
    MANUTENCAO: CHIEF_VINTAGE_MANUTENCAO,
  },
]

// ─── Calibragem de pneus ───────────────────────────────────────────────────────
// Única linha, em 'CHIEF' — tamanho de pneu e calibragem são os mesmos nas 5
// variantes (mesmo chassi/rodas de 16"), e casam com todas via \bCHIEF\b.

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'CHIEF',
    yearFrom: 2014,
    yearTo: 2020,
    tireSize: '130/90B16 (F) · 180/60R16 (R)',
    frontPsi: 36,
    rearPsi: 40,
    frontPsiLoad: 36,
    rearPsiLoad: 42,
    notes: 'Solo: F 36 / R 40 PSI. Com garupa/bagagem completa (mais comum na Springfield/Vintage): F 36 / R 42 PSI. Cruiser pesado — pressão baixa demais compromete estabilidade em curva com o peso do conjunto; calibre sempre com pneus frios. Valores aproximados baseados na especificação típica de cruisers pesados desta classe — confirme com a etiqueta de calibragem na moto ou manual do proprietário do seu ano específico.',
  },
]

// ─── Itens de manutenção ───────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // CHIEF — universais da plataforma Thunder Stroke 111 (aparecem para as 5 variantes)
  { modelName: 'CHIEF', yearFrom: 2014, yearTo: 2020, component: 'Óleo do motor 20W-50 sintético JASO MA (~5,2L)', intervalKm: 8000, intervalMonths: 12, notes: 'Embreagem úmida — obrigatório selo JASO MA. Indian Genuine Motor Oil ou equivalente (Motul 300V2, Mobil 1 V-Twin).', priority: 'HIGH', order: 1 },
  { modelName: 'CHIEF', yearFrom: 2014, yearTo: 2020, component: 'Filtro de óleo do motor', intervalKm: 8000, intervalMonths: 12, notes: 'Trocar sempre junto com o óleo do motor.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CHIEF', yearFrom: 2014, yearTo: 2020, component: 'Velas de ignição — 4 unidades (2 por cilindro)', intervalKm: 16000, intervalMonths: null, notes: 'Ignição de duplo estágio — não esquecer o segundo par de velas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CHIEF', yearFrom: 2014, yearTo: 2020, component: 'Correia final — verificação de tensão', intervalKm: 8000, intervalMonths: null, notes: 'Nunca lubrificar — correia de carbono não precisa e óleo/graxa degrada o composto.', priority: 'HIGH', order: 4 },
  { modelName: 'CHIEF', yearFrom: 2014, yearTo: 2020, component: 'Correia final — inspeção de desgaste/rachaduras', intervalKm: 40000, intervalMonths: null, notes: 'Vida útil típica acima de 80.000 km em uso normal. Inspecionar dentes visualmente a cada revisão maior.', priority: 'MEDIUM', order: 5 },
  { modelName: 'CHIEF', yearFrom: 2014, yearTo: 2020, component: 'Corrente primária — tensão e nível de óleo (câmara própria)', intervalKm: 8000, intervalMonths: 12, notes: 'Câmara separada do óleo do motor e do câmbio.', priority: 'HIGH', order: 6 },
  { modelName: 'CHIEF', yearFrom: 2014, yearTo: 2020, component: 'Óleo da transmissão (câmbio, ~1 quarto/0,9L)', intervalKm: 24000, intervalMonths: 24, notes: 'Sistema separado do óleo do motor e da corrente primária.', priority: 'MEDIUM', order: 7 },
  { modelName: 'CHIEF', yearFrom: 2014, yearTo: 2020, component: 'Filtro de ar', intervalKm: 16000, intervalMonths: 24, notes: 'Trocar junto com a revisão de velas.', priority: 'MEDIUM', order: 8 },
  { modelName: 'CHIEF', yearFrom: 2014, yearTo: 2020, component: 'Fluido de freio DOT 4 (freio duplo dianteiro + traseiro)', intervalKm: null, intervalMonths: 24, notes: 'Trocar por tempo, não só por km — absorve umidade do ar.', priority: 'HIGH', order: 9 },
  { modelName: 'CHIEF', yearFrom: 2014, yearTo: 2020, component: 'Bateria 12V — inspeção de carga', intervalKm: null, intervalMonths: 12, notes: 'Tensão em repouso deve ficar acima de 12,4V. Modelos keyless drenam mais rápido em desuso.', priority: 'MEDIUM', order: 10 },
  { modelName: 'CHIEF', yearFrom: 2014, yearTo: 2020, component: 'Filtro de combustível', intervalKm: 32000, intervalMonths: null, notes: 'Evitar rodar com tanque frequentemente muito baixo — acelera desgaste da bomba interna.', priority: 'LOW', order: 11 },

  // CHIEF CLASSIC — específicos do trim
  { modelName: 'CHIEF CLASSIC', yearFrom: 2014, yearTo: 2020, component: 'Trinco/mecanismo do para-brisa quick-release — lubrificação', intervalKm: null, intervalMonths: 6, notes: 'Óleo fino ou silicone em spray nos pontos de articulação.', priority: 'LOW', order: 1 },
  { modelName: 'CHIEF CLASSIC', yearFrom: 2014, yearTo: 2020, component: 'Malas de couro — lubrificação de fivelas e fechos', intervalKm: null, intervalMonths: 6, notes: 'Evita emperramento do sistema quick-release das malas.', priority: 'LOW', order: 2 },
  { modelName: 'CHIEF CLASSIC', yearFrom: 2014, yearTo: 2020, component: 'Rodas raiadas — verificação de tensão dos raios', intervalKm: 10000, intervalMonths: null, notes: 'Raios frouxos causam desalinhamento e desgaste irregular do pneu.', priority: 'MEDIUM', order: 3 },

  // CHIEF DARK HORSE — específicos do trim
  { modelName: 'CHIEF DARK HORSE', yearFrom: 2014, yearTo: 2020, component: 'Pilha do fob keyless — substituição', intervalKm: null, intervalMonths: 18, notes: 'Alcance reduzido do fob é o primeiro sinal de pilha fraca.', priority: 'LOW', order: 1 },
  { modelName: 'CHIEF DARK HORSE', yearFrom: 2014, yearTo: 2020, component: 'Acabamento blackout/fosco — limpeza com produto específico', intervalKm: null, intervalMonths: 3, notes: 'Nunca usar polidor de cromo comum — mancha o efeito fosco.', priority: 'LOW', order: 2 },

  // CHIEF SPRINGFIELD — específicos do trim
  { modelName: 'CHIEF SPRINGFIELD', yearFrom: 2016, yearTo: 2020, component: 'Ride Command — atualização de software (se equipada)', intervalKm: null, intervalMonths: 6, notes: 'Corrige bugs de tela travando/reiniciando sozinha.', priority: 'LOW', order: 1 },
  { modelName: 'CHIEF SPRINGFIELD', yearFrom: 2016, yearTo: 2020, component: 'Trava elétrica das malas rígidas — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Mais frequente (a cada 6 meses) em uso litorâneo, pela maresia.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CHIEF SPRINGFIELD', yearFrom: 2016, yearTo: 2020, component: 'Pneu traseiro — inspeção de desgaste (peso extra da configuração touring)', intervalKm: 10000, intervalMonths: null, notes: 'Mais frequente que o padrão da linha pelo peso extra de malas + para-brisa.', priority: 'MEDIUM', order: 3 },

  // CHIEF VINTAGE — específicos do trim
  { modelName: 'CHIEF VINTAGE', yearFrom: 2014, yearTo: 2020, component: 'Couro do banco com tachas — hidratação/impermeabilização', intervalKm: null, intervalMonths: 3, notes: 'Ressecamento mais rápido no clima tropical — hidratar preventivamente.', priority: 'LOW', order: 1 },
  { modelName: 'CHIEF VINTAGE', yearFrom: 2014, yearTo: 2020, component: 'Franjas das malas de couro — inspeção de fixação', intervalKm: null, intervalMonths: 6, notes: 'Franjas soltas em viagens de rodovia — fácil reparo se pego cedo.', priority: 'LOW', order: 2 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Indian Chief (CHIEF / CLASSIC / DARK HORSE / SPRINGFIELD / VINTAGE)...\n')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'INDIAN', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'INDIAN', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${brand.name}`)

  for (const block of BLOCKS) {
    // Passo obrigatório — sem isso o modelo fica invisível nas páginas SEO/sitemap
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })

    const allTips: { cat: Cat; tip: TipInput }[] = [
      ...block.MACETES.map((t) => ({ cat: 'MACETES' as Cat, tip: t })),
      ...block.PROBLEMAS.map((t) => ({ cat: 'PROBLEMAS' as Cat, tip: t })),
      ...block.MANUTENCAO.map((t) => ({ cat: 'MANUTENCAO' as Cat, tip: t })),
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

    const counts = { m: block.MACETES.length, p: block.PROBLEMAS.length, mt: block.MANUTENCAO.length }
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

  console.log('\n  🔧 Itens de manutenção...')
  const modelNames = [...new Set(MAINTENANCE_ITEMS.map((m) => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: MAINTENANCE_ITEMS.map((item) => ({
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
    const count = MAINTENANCE_ITEMS.filter((m) => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = BLOCKS.reduce((acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length, 0)
  console.log(
    `\n✅ Seed Indian Chief concluído: ${BLOCKS.length} modelos, ${totalTips} dicas, ` +
    `${TIRE_PRESSURES.length} calibragens, ${MAINTENANCE_ITEMS.length} itens de manutenção.`,
  )
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
