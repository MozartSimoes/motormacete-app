/**
 * Seed DAFRA (parte 2) — macetes, problemas e manutenção
 * Kansas 250, NH 300, NHX 190, Roadwin 250R
 *
 * CONTEXTO IMPORTANTE: a parceria DAFRA↔TVS terminou em 03/2024, mas a DAFRA segue
 * operando no Brasil normalmente, agora com foco na parceria com a SYM (motor taiwanês).
 * Isso NÃO é um encerramento da marca — a marca nunca fechou.
 *
 * Os 4 modelos deste arquivo se dividem em dois grupos bem diferentes:
 *
 * 1) KANSAS 250 e ROADWIN 250R são modelos legados, descontinuados há anos:
 *    - Kansas 250 (2009–2012): série limitada (852 unidades produzidas), motor
 *      bicilíndrico em V 248,7cc de origem chinesa. Peças específicas do V-twin são
 *      raras hoje — não porque a DAFRA "fechou", mas por baixíssimo volume original
 *      e idade do modelo (15+ anos).
 *    - Roadwin 250R (2012–2015): na verdade um Daelim Roadwin 250R rebatizado
 *      (motor coreano DOHC líquido, injeção KEFICO). Produção encerrada há quase
 *      uma década — peças específicas de carenagem/injeção são escassas.
 *
 * 2) NH 300 e NHX 190 são, na verdade, modelos ATUAIS da parceria DAFRA-SYM —
 *    NÃO são legados nem descontinuados:
 *    - NH 300 (2023+): trail médio, motor SYM 278,3cc líquido injetado, ABS,
 *      embreagem deslizante. Em produção e à venda em concessionárias DAFRA hoje.
 *    - NHX 190 (lançada em 12/2024): naked urbana "irmã" da nova geração da NH 190
 *      (2025+), plataforma SYM compartilhada — motor 183cc líquido injetado, ABS
 *      dual-channel, LED, painel digital. Modelo recém-lançado, ainda em produção.
 *    Por serem modelos correntes, os problemas documentados aqui são de qualidade/
 *    confiabilidade reportados por proprietários (Reclame Aqui, fóruns) — não de
 *    escassez de peças, já que peças e garantia estão disponíveis normalmente via
 *    rede DAFRA-SYM.
 *
 * Fontes: manuais oficiais e "Programa de Manutenção" da Dafra (daframotos.com.br/
 *         documentos/pos-vendas-*), motonline.com.br, motorium.com.br,
 *         magodoscarros.com, motoscustom.com.br (fórum), dafra.forumeiros.com,
 *         reclameaqui.com.br/dafra-motos, revista.moto.com.br, motociclismoonline.com.br
 *
 * Execute: pnpm --filter @motormacete/database db:seed  (ou script equivalente que
 *          rode este arquivo isoladamente — NÃO faz parte do runner de seed-dafra.ts)
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

// ─── KANSAS 250 ──────────────────────────────────────────────────────────────
// Motor bicilíndrico em V, 248,7cc, SOHC, ar, carburador BDS26, 5 marchas
// Série limitada (852 unidades), 2009–2012 — descontinuado há mais de 10 anos

const KANSAS250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor bicilíndrico em V 248,7cc: vibração em marcha lenta é característica, não defeito',
    body: 'O Kansas 250 tem motor bicilíndrico em V (49x66mm, taxa 10:1) — arquitetura rara entre as motos chinesas/nacionais de entrada. É normal sentir uma vibração levemente mais grossa em marcha lenta comparado a motores monocilíndricos da mesma cilindrada; isso vem do balanceamento entre os dois cilindros. Vibração excessiva ou irregular (motor "engasgando" sozinho parado) já é sinal de desregulagem de um dos dois carburadores/cilindros — não ignore.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W50 mineral: motor V-twin de projeto simples não pede sintético',
    body: 'Assim como o Kansas 150, o motor do Kansas 250 é de projeto mecânico simples e funciona bem com óleo mineral 20W50 na maior parte do ano no Brasil. Em climas muito frios (serra, sul no inverno), troque para 10W40 semissintético. A Dafra não lista mais este V-twin na tabela oficial de óleos/fluidos vigente (modelo fora de linha) — use a vareta/visor de nível como referência, nunca complete "no olho".',
  },
  {
    severity: 'WARN',
    title: 'Mangueira de dreno do carburador é comprida e vaza água — vede antes da chuva',
    body: 'Proprietários relatam um defeito de projeto conhecido: a mangueira de dreno do carburador do Kansas 250 é longa e desce quase até o chão, virando um caminho fácil para água entrar em poças e chuva forte — a moto morre no meio do trânsito quando isso acontece. Prevenção: inspecione a mangueira, corte o excesso de comprimento e garanta que a ponta fique dobrada para cima ou protegida, sem ficar solta perto do pneu dianteiro.',
  },
  {
    severity: 'OK',
    title: 'Lubrifique a corrente a cada 500–800 km — evita esticar e economiza no kit relação',
    body: 'A corrente original do Kansas 250 tem a mesma durabilidade limitada dos demais modelos DAFRA de entrada. Lubrificação regular (spray de corrente ou óleo 80W90 na lateral interna) a cada 500–800 km estende a vida útil de forma significativa e evita que o motor V-twin, que tem mais torque que o Kansas 150, acelere o desgaste do kit relação.',
  },
  {
    severity: 'WARN',
    title: 'Pneus de medida incomum (3.00-18 dianteiro / 130/90-15 traseiro): compre com antecedência',
    body: 'O Kansas 250 usa medidas de pneu pouco comuns no mercado nacional (3.00-18 na frente, 130/90-15 atrás, originalmente Pirelli City Demon). Não é raro faltar em estoque de borracharias de bairro. Ao perceber desgaste, pesquise e reserve o pneu com 1–2 semanas de antecedência em vez de esperar furar ou "careca" — evita ficar parado.',
  },
  {
    severity: 'OK',
    title: 'Partida a frio: use o afogador e aguarde a rotação estabilizar antes de andar',
    body: 'Com dois carburadores (um por cilindro), a partida a frio do Kansas 250 exige mais paciência que um monocilíndrico. Acione o afogador, dê a partida, e aguarde a rotação estabilizar sozinha por 30–60 segundos antes de desativar o afogador gradualmente. Desligar o afogador cedo demais ou acelerar bruscamente com motor frio é a causa mais comum de "engasgo" e apagamento logo após ligar.',
  },
  {
    severity: 'WARN',
    title: 'Moto pesada na dianteira: cuidado redobrado em manobras de baixa velocidade',
    body: 'Com 137 kg a seco e motor V-twin posicionado mais à frente que um monocilíndrico cruiser comum, o Kansas 250 tem mais peso sentido no guidão em manobras lentas (garagem, embarque, retorno em U). Praticar essas manobras em local seguro antes de enfrentar trânsito é especialmente recomendado para quem vem de motos mais leves.',
  },
]

const KANSAS250_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Quadro/chassi relatado como frágil por proprietários: inspecione solda e fixações',
    body: 'Há relatos recorrentes na comunidade DAFRA (fóruns e blogs de proprietários) de trincas no quadro do Kansas 250, incluindo casos de motociclistas machucados. Não há recall oficial documentado, mas o risco é levado a sério pela comunidade. Recomendação: a cada 5.000 km, inspecione visualmente os pontos de solda do quadro (perto do motor, da coluna de direção e da fixação do amortecedor traseiro) por trincas, ferrugem saindo pela tinta ou folga anormal. Ao menor sinal, leve a um soldador especializado em quadros de moto antes de continuar rodando.',
  },
  {
    severity: 'DANGER',
    title: 'Série limitada de apenas 852 unidades: peças específicas do V-twin praticamente inexistentes',
    body: 'O Kansas 250 foi vendido em série limitada (852 unidades produzidas entre 2009 e 2012) — o motor V-twin 248,7cc não foi usado em nenhum outro modelo DAFRA, ao contrário dos motores monocilíndricos "CG-type" compartilhados por Kansas 150/Speed/Laser. Isso torna peças específicas do motor (pistões, comando, virabrequim) muito mais difíceis de achar do que nos irmãos 150cc. Caminho alternativo reportado pela comunidade: peças de motor compatíveis com a Yamaha Virago 250 e V-Star 250 (motores V-twin de cilindrada e arquitetura próximas) — meça e compare antes de comprar. Grupos "Mundo Kansas" e fóruns Motos Custom são as principais fontes de compatibilidade.',
  },
  {
    severity: 'WARN',
    title: 'Nível de óleo historicamente controverso: sempre confira pela vareta, não confie de olho',
    body: 'Existe uma polêmica antiga entre proprietários do Kansas 250 sobre o volume de óleo especificado ser insuficiente para o motor V-twin, causando desgaste prematuro de rolamentos e, em casos extremos relatados, até fusão do motor. Como o modelo já não consta na tabela oficial de óleos e fluidos da Dafra, não dá para confirmar o valor exato hoje. Prática mais segura: complete sempre até a marca MAX da vareta ou visor lateral, nunca "por cálculo", e troque o óleo a cada 3.000 km sem exceção.',
  },
  {
    severity: 'WARN',
    title: 'Dificuldade de partida elétrica a frio: técnica errada agrava o problema',
    body: 'Diversos proprietários relatam dificuldade para dar partida elétrica com o motor frio, mesmo com afogador acionado — o motor não pega e o esforço repetido de partida descarrega a bateria rapidamente. Antes de insistir na chave várias vezes seguidas, verifique a carga da bateria e a limpeza dos bornes. Evite acelerar junto com o afogador na partida a frio — isso afoga ainda mais o(s) carburador(es) e piora o problema.',
  },
  {
    severity: 'WARN',
    title: 'Unidades com pedaleiras desalinhadas de fábrica: verifique o espaçamento antes de rodar muito',
    body: 'Por ser uma série limitada com controle de qualidade menos rigoroso, alguns Kansas 250 saíram de fábrica com as pedaleiras (apoio dos pés) montadas incorretamente, deixando pouco espaço entre o pedal de câmbio/freio e o apoio do pé — dificultando trocas de marcha e frenagem por tato. Se você notar desconforto ou dificuldade recorrente para encontrar os pedais, meça o alinhamento e ajuste a fixação antes de assumir que é "estilo de pilotagem".',
  },
]

const KANSAS250_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Kansas 250: V-twin exige atenção a dois carburadores e ao quadro',
    body: '1.000 km — Troca de óleo inicial (20W50 mineral, aproximadamente 1,0–1,2 L — confira na vareta). | 3.000 km — Troca de óleo rotineira + lubrificar corrente. | 5.000 km — Inspecionar visualmente o quadro (solda, trincas, ferrugem saindo da tinta). Verificar nível de óleo. | 800 km — Lubrificar corrente (repetir a cada 800 km). | 10.000 km — Vela NGK CR6HSA (ou CR6HIX iridium). Regular/limpar os dois carburadores BDS26 e verificar a mangueira de dreno. Inspecionar mangueira de dreno do carburador (chuva). | 15.000 km — Fluido DOT 4 (freio a disco duplo). | 20.000 km — Kit relação (corrente + pinhão + coroa). Filtro de ar (limpar/trocar). | 30.000 km — Folga de válvulas. Rolamentos de roda.',
  },
]

// ─── NH 300 ──────────────────────────────────────────────────────────────────
// Modelo ATUAL da parceria DAFRA-SYM (2023+) — trail médio, motor 278,3cc
// monocilíndrico 4V líquido injetado, 6 marchas, embreagem deslizante, ABS.
// NÃO é modelo legado/descontinuado — em produção e venda ativa hoje.

const NH300_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor líquido 278,3cc: verifique o reservatório de arrefecimento a cada 1.000 km',
    body: 'O programa oficial de manutenção da NH 300 pede verificação do líquido de arrefecimento (Mobil Delvac Extended Life 50/50, 950 ml) a cada revisão. O reservatório auxiliar é translúcido — o nível deve ficar entre MIN e MAX com o motor frio. Complete apenas com a mistura 50% aditivo + 50% água destilada; nunca use água de torneira, que incrusta o radiador com o tempo.',
  },
  {
    severity: 'OK',
    title: 'Embreagem deslizante (slipper clutch): aproveite em reduções bruscas de marcha',
    body: 'A NH 300 tem embreagem multidisco a óleo com sistema deslizante (slipper), que reduz o efeito de "arrasto" da roda traseira em reduções de marcha rápidas — útil em descidas ou frenagens fortes em terra. Isso não substitui uma pilotagem cuidadosa, mas dá mais margem de segurança em reduções mal calculadas comparado a modelos sem esse sistema, como a linha mais antiga de trails DAFRA.',
  },
  {
    severity: 'OK',
    title: 'Câmbio de 6 marchas: use a 1ª/2ª mais cedo em trilha para poupar a embreagem',
    body: 'Com mais torque disponível em baixa rotação que a NH 190, a NH 300 permite andar em marchas mais altas em trechos de terra sem perder tração — mas em subidas técnicas ou lama, prefira engatar a 1ª ou 2ª cedo. Isso reduz o esforço sobre a embreagem multidisco e evita superaquecimento do óleo do motor (que também lubrifica a embreagem) em uso off-road prolongado.',
  },
  {
    severity: 'WARN',
    title: 'ABS dual-channel: não tente desativar — ajuda especialmente em piso irregular',
    body: 'A NH 300 vem com ABS nas duas rodas (disco 228mm dianteiro com 2 pistões, 222mm traseiro com 1 pistão). Em pisos irregulares ou com pedras soltas — comum em trilhas leves — o ABS evita o travamento da roda em frenagens de emergência. Não há necessidade nem recomendação de desativá-lo para uso off-road leve/moderado, que é o perfil real da maioria dos donos desta trail.',
  },
  {
    severity: 'OK',
    title: 'Óleo Mobil Super Moto 4T MX 10W-30: troque a cada 3.000 km após a revisão de 1.000 km',
    body: 'O programa oficial de manutenção da Dafra pede troca de óleo motor (Mobil Super Moto 4T MX 10W-30, 1,5 L) em toda revisão, a partir da revisão de rodagem aos 1.000 km e depois a cada 3.000 km. Junto com o óleo, o filtro de papel também é substituído em toda revisão — não pule essa troca para economizar, o filtro é barato comparado ao desgaste do motor.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de transmissão: ajuste e lubrifique a cada revisão (3.000 km)',
    body: 'O programa de manutenção oficial da NH 300 inclui ajuste e lubrificação da corrente em toda revisão de 3.000 km — não é opcional. Corrente seca ou frouxa desgasta o kit relação prematuramente e, em uso off-road, aumenta bastante o risco de saltar dente. Se você roda em terra com frequência, lubrifique também entre as revisões, a cada 500–800 km.',
  },
]

const NH300_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Quebra de raios das rodas: problema crônico relatado por múltiplos proprietários',
    body: 'Há registros recorrentes no Reclame Aqui de quebra de raios (dianteiros e traseiros) na NH 300, em alguns casos relatados como problema crônico que se repete mesmo após reparo, e com divergência sobre cobertura de garantia. Prevenção: verifique o aperto e a tensão dos raios a cada revisão (item já previsto no programa oficial de manutenção) e não ignore ruído ou vibração nova na roda — raio frouxo é o estágio anterior à quebra.',
  },
  {
    severity: 'WARN',
    title: 'Defeito na caixa de câmbio relatado nos primeiros meses de uso por alguns donos',
    body: 'Proprietários relataram defeitos na caixa de câmbio da NH 300 já nos primeiros meses de uso, com disputas sobre cobertura de garantia e longos períodos de moto parada na concessionária aguardando peças. Se você notar dificuldade para engatar marchas, ruído metálico na troca ou marcha "falsa neutra" fora do esperado, procure a concessionária DAFRA imediatamente e documente por escrito a data e o defeito relatado — a NH 300 ainda está na garantia de fábrica por ser modelo recente.',
  },
  {
    severity: 'WARN',
    title: 'Relatos de montagem/acabamento inconsistente: inspecione bem na entrega',
    body: 'Alguns compradores relataram problemas de montagem e acabamento na NH 300 logo na retirada da concessionária. Como o modelo é recente e a rede de concessionárias ainda está se adaptando ao volume, vale inspecionar com atenção no ato da entrega: alinhamento de carenagens e para-lamas, aperto de parafusos visíveis, funcionamento de toda a parte elétrica (faróis, ABS, painel) antes de sair rodando.',
  },
  {
    severity: 'WARN',
    title: 'Substituição precoce de rolamentos relatada em alguns casos',
    body: 'Há relatos pontuais de rolamentos (de roda ou de motor) precisando de troca já nos primeiros milhares de quilômetros, exigindo visitas à concessionária. Não é a maioria dos relatos, mas se você perceber ruído de rolamento (assobio ou "rugido" que muda com a velocidade) ou folga na roda, não adie a inspeção — quanto mais cedo detectado, mais barato o reparo.',
  },
  {
    severity: 'DANGER',
    title: 'Modelo recente: pesquise o histórico do vendedor antes de comprar usada',
    body: 'Por ser um modelo lançado a partir de 2023, a NH 300 ainda tem poucos anos de estrada e um volume relevante de reclamações registradas no Reclame Aqui sobre qualidade e atendimento em garantia. Isso não significa que a moto seja ruim — mas reforça a importância de, ao comprar uma NH 300 usada, exigir nota fiscal de manutenção, verificar se as revisões do programa oficial foram feitas em concessionária DAFRA e testar bem o câmbio, o ABS e o aperto dos raios antes de fechar negócio.',
  },
]

const NH300_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma oficial NH 300 (2025 em diante): revisões a cada 3.000 km após rodagem',
    body: '1.000 km (rodagem) — Óleo motor (Mobil Super Moto 4T MX 10W-30, 1,5 L) + filtro de óleo (papel) + reaperto geral + calibragem de pneus + verificar aperto dos raios. | A cada 3.000 km — Repetir troca de óleo motor e filtro, limpeza do filtro de ar, ajuste/lubrificação de corrente, verificação de raios, freios e sistema elétrico. | A cada 6.000 km — Regulagem de folga de válvulas (verificar e ajustar se necessário). | 12.000 km e 24.000 km — Troca da vela NGK CR8E (gap 0,7–0,8 mm) e do elemento do filtro de ar. | 15.000 km e 30.000 km — Troca do óleo da suspensão dianteira (ATF 10W, 270 ml cada lado). | Anualmente — Troca do fluido de freio DOT 4 (Mobil Brake Fluid), mesmo sem atingir a quilometragem. | A cada 3 anos — Troca do líquido de arrefecimento (Mobil Delvac Extended Life 50/50, 950 ml).',
  },
]

// ─── NHX 190 ─────────────────────────────────────────────────────────────────
// Modelo ATUAL da parceria DAFRA-SYM, lançado em dezembro/2024 — naked urbana
// "irmã" da nova geração da NH 190 (2025+), plataforma mecânica compartilhada:
// motor monocilíndrico 4V líquido injetado ~183cc, 6 marchas, ABS dual-channel.
// NÃO é modelo legado/descontinuado — em produção e venda ativa hoje.

const NHX190_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor líquido injetado, plataforma nova: não confunda com a NH 190 antiga (2014–2017)',
    body: 'A NHX 190 usa a plataforma mecânica da nova geração da NH 190 (2025 em diante) — motor monocilíndrico 4 válvulas líquido, injeção eletrônica e câmbio de 6 marchas. É um projeto completamente diferente da NH 190 carburada a ar de 2014–2017. Ao procurar peças, manuais ou vídeos de manutenção, confirme sempre se a fonte é da NH 190 "nova" (pós-2025)/NHX 190 e não da NH 190 antiga — motor, injeção e arrefecimento não têm nada em comum.',
  },
  {
    severity: 'OK',
    title: 'ABS dual-channel: freie com confiança em piso molhado ou irregular',
    body: 'A NHX 190 vem com ABS de série nas duas rodas. Em piso molhado, com areia ou pedrinhas — comuns em vias urbanas mal conservadas — o sistema evita o travamento da roda em freadas de emergência. Para tirar proveito, use ambos os freios (dianteiro e traseiro) na frenagem, sem "economizar" no dianteiro por medo de travar a roda — o ABS já cuida disso.',
  },
  {
    severity: 'OK',
    title: 'Óleo semissintético 10W-30: troque a cada 3.000 km, capacidade de ~1,0 L',
    body: 'O programa oficial de manutenção pede troca do óleo motor (Mobil Super Moto 4T semissintético, aproximadamente 1,0 L) em toda revisão a partir dos 1.000 km (rodagem), repetindo a cada 3.000 km. Junto, limpe o filtro de tela do óleo — previsto em toda revisão no cronograma oficial.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 428H136 (relação 47x15): lubrifique a cada 500 km em uso urbano intenso',
    body: 'A NHX 190 usa corrente 428H136 com relação de transmissão 47 dentes (coroa) por 15 dentes (pinhão). O programa oficial prevê ajuste/lubrificação em toda revisão de 3.000 km, mas em uso urbano intenso ou com chuva frequente, lubrificar a cada 500 km prolonga bastante a vida útil e evita ruído seco característico de corrente ressecada.',
  },
  {
    severity: 'OK',
    title: 'Painel digital e carregador USB: aproveite para monitorar consumo e carregar o celular',
    body: 'O painel digital completo da NHX 190 traz informações úteis (consumo médio, autonomia estimada, relógio) que ajudam a identificar consumo anormal — sinal precoce de problema no motor ou na injeção. O carregador USB embutido é conveniente para navegação por aplicativo, mas evite deixar o celular carregando com a moto desligada por longos períodos — isso consome a bateria da moto sem o alternador para repor.',
  },
  {
    severity: 'WARN',
    title: 'Lave e seque bem após chuva: relatos de corrosão precoce em protetores e parafusos',
    body: 'Por ser um modelo muito recente, alguns proprietários já relataram início de corrosão em protetores de motor e parafusos com poucos meses e poucos quilômetros de uso, mesmo com exposição normal à chuva. Prevenção simples: após pegar chuva ou lavar a moto, seque bem as áreas metálicas expostas (protetor de motor, parafusos, escapamento) e aplique um spray anticorrosivo/óleo protetor a cada 2–3 meses, especialmente em regiões litorâneas.',
  },
]

const NHX190_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Luz de temperatura acendendo em rodovia com calor: relatos recorrentes — não ignore',
    body: 'Há relatos de proprietários de que a luz de temperatura do motor acende após poucos minutos de rodovia em dias quentes. Isso pode indicar desde um sensor com falha até um problema real de arrefecimento (nível baixo de líquido, ventoinha não acionando, radiador sujo). Se a luz acender, pare em local seguro assim que possível, deixe o motor esfriar antes de abrir qualquer tampa e verifique o nível do reservatório de arrefecimento. Não continue rodando ignorando o alerta — motor líquido superaquecido pode empenar o cabeçote.',
  },
  {
    severity: 'WARN',
    title: 'Cabo de embreagem com relatos de ruptura prematura',
    body: 'Múltiplos proprietários relataram ruptura do cabo de embreagem em uso considerado normal, algumas vezes repetidas vezes no mesmo veículo. Inspecione o cabo periodicamente por fiapos ou desgaste visível próximo à manopla e ao motor, e considere lubrificá-lo preventivamente. Ande sempre com um cabo de embreagem reserva se for viajar para fora da cidade — é uma peça barata e fácil de trocar na estrada, mas paralisante se quebrar sem reposição.',
  },
  {
    severity: 'WARN',
    title: 'Quebra de raios das rodas: mesmo problema já relatado na NH 300 (plataforma compartilhada)',
    body: 'Assim como na NH 300, há relatos de quebra de raios de roda na NHX 190 — coerente com o compartilhamento de plataforma e componentes entre os dois modelos da nova geração DAFRA-SYM. Verifique o aperto e a tensão dos raios a cada revisão e não ignore vibração ou ruído novo na roda.',
  },
  {
    severity: 'WARN',
    title: 'Falha de aceleração e problema na tampa/capa da vela relatados por volta de 1.200 km',
    body: 'Há relato específico de falha de aceleração já nos primeiros 1.200 km, associado a problema na tampa (capa) da vela de ignição que precisou ser substituída. Se a moto apresentar perda de potência súbita ou falha na aceleração ainda no início do uso, verifique primeiro a conexão da capa da vela antes de assumir problemas mais graves na injeção — e leve à concessionária DAFRA, ainda dentro da garantia de fábrica.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão precoce em protetor de motor relatada com menos de 700 km',
    body: 'Um proprietário relatou corrosão visível no protetor do motor com menos de 700 km rodados, após lavagens normais e exposição típica à chuva — sem uso severo ou litorâneo. Se você notar ferrugem aparecendo muito cedo, documente com fotos e data para eventual acionamento de garantia, além de aplicar as medidas preventivas de secagem e proteção anticorrosiva descritas nos macetes.',
  },
  {
    severity: 'WARN',
    title: 'Suporte do amortecedor traseiro e caixa de direção: falhas relatadas mesmo em uso leve',
    body: 'Proprietários relataram falhas no suporte de fixação do amortecedor traseiro e na caixa de direção mesmo com uso considerado leve (sem trilha, sem sobrecarga). Preste atenção a ruídos novos na suspensão traseira ou folga/dureza incomum na direção ao fazer manobras de baixa velocidade — e não hesite em levar à concessionária ainda no período de garantia.',
  },
]

const NHX190_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma oficial NHX 190 (plataforma NH 190 nova geração): revisões a cada 3.000 km',
    body: '1.000 km (rodagem) — Óleo motor (Mobil Super Moto 4T semissintético, ~1,0 L) + reaperto geral + calibragem de pneus + ajuste de folga dos raios das rodas. | A cada 3.000 km — Repetir troca de óleo motor, limpeza do filtro de tela do óleo, ajuste/verificação da corrente 428H136, verificação de freios, embreagem e sistema elétrico. | A cada 6.000 km e 18.000 km — Regulagem de válvulas (verificar e ajustar). | 9.000 km, 18.000 km, 27.000 km e 36.000 km — Troca do elemento do filtro de ar. | 12.000 km, 24.000 km e 36.000 km — Troca da vela de ignição CPR8EA-9 (gap 0,8–0,9 mm). | 15.000 km e 30.000 km — Troca do óleo da suspensão dianteira (ATF, 270 ml cada lado). | Anualmente — Troca do fluido de freio DOT 4. | Verificar sempre o líquido de arrefecimento (Mobil Delvac 50/50) e trocar preventivamente por volta de 24.000 km ou ao menor sinal de contaminação.',
  },
]

// ─── ROADWIN 250R ────────────────────────────────────────────────────────────
// Na verdade um Daelim Roadwin 250R (Coreia do Sul) rebatizado pela DAFRA.
// Motor 247cc monocilíndrico DOHC 4V líquido, injeção eletrônica KEFICO,
// 24cv a 9.000 rpm, torque 1,92 kgf.m a 7.000 rpm, câmbio 5 marchas.
// Vendida ~2012–2015, descontinuada há quase uma década.

const ROADWIN250R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor DOHC líquido injetado: monitore o arrefecimento como em um carro pequeno',
    body: 'A Roadwin 250R tem motor 247cc DOHC 4 válvulas refrigerado a líquido com injeção eletrônica KEFICO (fornecedora coreana usada também em carros Hyundai/Kia) — mecânica mais sofisticada que a maioria das motos de entrada DAFRA da época. Trate o sistema de arrefecimento como você trataria em um carro: verifique o nível do reservatório mensalmente e nunca rode com a luz de temperatura acesa.',
  },
  {
    severity: 'OK',
    title: 'Injeção eletrônica KEFICO: não precisa de afogador — dê a partida direto',
    body: 'Diferente de motos carburadas da mesma época, a Roadwin 250R tem injeção eletrônica e não precisa de afogador manual para partida a frio — a própria ECU enriquece a mistura automaticamente. Se a moto está demorando para pegar mesmo assim, o problema provavelmente está na bateria, na bomba de combustível ou em algum sensor, não na técnica de partida.',
  },
  {
    severity: 'WARN',
    title: 'Pneus Pirelli Sport Demon aro 17": pesquise a medida certa antes de trocar',
    body: 'A Roadwin 250R usa pneus 110/70-17 na dianteira e 140/70-17 na traseira, originalmente Pirelli Sport Demon. Por ser um modelo descontinuado há quase 10 anos, confirme sempre a medida gravada no próprio pneu antes de comprar substituto — evite "chutar" pela memória, já que outras Dafra 250/300 da época usam medidas próximas mas diferentes.',
  },
  {
    severity: 'OK',
    title: 'Óleo Mobil Super Moto 4T MX 15W-50: viscosidade mais alta que a maioria da linha DAFRA',
    body: 'A Roadwin 250R pede óleo Mobil Super Moto 4T MX 15W-50 (capacidade 1,3 L) — mais viscoso que o 10W-30/10W-40 usado na maior parte da linha DAFRA, adequado ao motor DOHC de rotação mais alta. Não substitua por um 10W-30/10W-40 achando que "dá no mesmo": a viscosidade errada pode comprometer a lubrificação em alta rotação (o motor entrega potência máxima a 9.000 rpm).',
  },
  {
    severity: 'WARN',
    title: 'Consumo declarado de até 31 km/l: pilotagem suave é essencial para chegar perto disso',
    body: 'A Roadwin 250R declarava consumo de até 31 km/l — número otimista que só se aproxima com pilotagem econômica (acelerações suaves, manter rotação moderada). Em uso esportivo real, explorando as 4 válvulas e os 24 cv, o consumo cai bastante. Se o consumo estiver muito abaixo do esperado mesmo com pilotagem tranquila, suspeite de sensor de oxigênio ou TPS desregulado antes de qualquer coisa.',
  },
  {
    severity: 'OK',
    title: 'Freio dianteiro com dois discos de 290mm: frenagem forte, mas exige fluido em dia',
    body: 'O freio dianteiro com dois discos de 290mm da Roadwin 250R tem poder de frenagem generoso para uma 250cc — mas só funciona bem com fluido DOT 4 trocado em dia. Fluido de freio contaminado com umidade (comum após 1–2 anos sem troca) causa perda de eficiência e sensação "esponjosa" no manete, especialmente perceptível num sistema de dois discos.',
  },
]

const ROADWIN250R_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Modelo descontinuado desde 2015: peças específicas de injeção e carenagem são escassas',
    body: 'A DAFRA parou de vender a Roadwin 250R por volta de 2015 — não por a marca ter fechado (ela segue operando com foco na SYM), mas por este modelo específico, de baixo volume, ter saído de linha. Um detalhe pouco divulgado: a Roadwin 250R é, na essência, um Daelim Roadwin 250R (fabricante sul-coreana) rebatizado — peças de injeção, ECU e componentes do motor DOHC podem ter equivalentes catalogados sob o nome "Daelim Roadwin 250" em fóruns e lojas especializadas em motos coreanas. Peças de carenagem, por outro lado, tendem a ser exclusivas e mais difíceis de achar — pesquise em grupos de proprietários e no Reclame Aqui/fóruns antes de assumir que a peça "não existe mais".',
  },
  {
    severity: 'WARN',
    title: 'Relatos de carenagens mal ajustadas já na entrega de fábrica',
    body: 'Compradores relataram carenagens com encaixe desigual entre os lados já na retirada da concessionária, em alguns casos mesmo após solicitar inspeção prévia. Ao comprar uma Roadwin 250R usada, verifique simetria visual das carenagens dos dois lados e o alinhamento dos parafusos de fixação — folgas ou desalinhamento indicam ou defeito de fábrica não corrigido, ou reparo malfeito após queda.',
  },
  {
    severity: 'WARN',
    title: 'Falhas elétricas relatadas: luz de freio e alarme com mau funcionamento',
    body: 'Há relatos de luz de freio que não acendia mesmo após solicitação de reparo, além de problemas no alarme. Antes de qualquer viagem, teste manualmente: acione o freio dianteiro e traseiro separadamente observando a luz de freio, e teste o alarme (se equipado) em ambiente controlado. Sistemas elétricos de motos com 10+ anos tendem a ter conectores oxidados — limpeza com contato limpo e graxa dielétrica resolve boa parte dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Nível de óleo impreciso relatado em revisões de concessionária',
    body: 'Proprietários relataram confusão sobre a quantidade correta de óleo do motor, com queixas de que o nível estava abaixo do adequado mesmo após revisão em concessionária. Depois de qualquer troca de óleo, confira você mesmo o nível pela vareta/visor com a moto em pé e nivelada, sem confiar cegamente no serviço prestado — vale para qualquer oficina, mas especialmente em modelo já fora de linha onde o mecânico pode ter menos familiaridade com o motor.',
  },
  {
    severity: 'WARN',
    title: 'Peças soltando em uso com garupa ou estrada ruim: revise fixações antes de viajar',
    body: 'Há relatos de peças da descarga e da carenagem se soltando em uso com garupa em pisos irregulares. Antes de qualquer viagem mais longa ou uso com passageiro em estrada ruim, faça um reaperto geral dos parafusos visíveis (carenagem, descarga, retrovisores) — a folga acumulada em uma moto com mais de 10 anos de uso tende a ser maior do que se imagina.',
  },
]

const ROADWIN250R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Roadwin 250R: motor DOHC líquido injetado exige atenção ao arrefecimento',
    body: '1.000 km — Troca de óleo inicial (Mobil Super Moto 4T MX 15W-50, 1,3 L). | 500 km — Lubrificar corrente (Mobil Chain Lube), repetir a cada 500 km. | 3.000 km — Troca de óleo rotineira. | 5.000 km — Limpar filtro de ar. Verificar aperto geral de carenagens e descarga. | 10.000 km — Verificar vela de ignição (gap conforme manual — confirme o código com o vendedor de peças, especificação oficial não documentada publicamente para este modelo). | 15.000 km — Fluido de freio DOT 4 (dois discos dianteiros + traseiro). Óleo da suspensão dianteira (SAE 10W, 0,245 L cada lado). Folga de válvulas (motor DOHC). | 20.000 km — Kit relação (corrente + pinhão + coroa). | 24 meses — Trocar líquido de arrefecimento (Mobil Delvac Extended Life 50/50, 1 L). | 30.000 km — Rolamentos de roda.',
  },
]

// ─── BLOCKS ──────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'KANSAS 250',
    yearFrom: 2009,
    yearTo: 2012,
    MACETES: KANSAS250_MACETES,
    PROBLEMAS: KANSAS250_PROBLEMAS,
    MANUTENCAO: KANSAS250_MANUTENCAO,
  },
  {
    modelName: 'NH 300',
    yearFrom: 2023,
    yearTo: null,
    MACETES: NH300_MACETES,
    PROBLEMAS: NH300_PROBLEMAS,
    MANUTENCAO: NH300_MANUTENCAO,
  },
  {
    modelName: 'NHX 190',
    yearFrom: 2024,
    yearTo: null,
    MACETES: NHX190_MACETES,
    PROBLEMAS: NHX190_PROBLEMAS,
    MANUTENCAO: NHX190_MANUTENCAO,
  },
  {
    modelName: 'ROADWIN 250R',
    yearFrom: 2012,
    yearTo: 2015,
    MACETES: ROADWIN250R_MACETES,
    PROBLEMAS: ROADWIN250R_PROBLEMAS,
    MANUTENCAO: ROADWIN250R_MANUTENCAO,
  },
]

// ─── TIRE PRESSURES ──────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'KANSAS 250',
    yearFrom: 2009,
    yearTo: 2012,
    tireSize: '3.00-18 (F) · 130/90-15 (R)',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 28,
    rearPsiLoad: 36,
    notes: 'Cruiser V-twin 250cc. Valor estimado por analogia ao Kansas 150 e ao peso do modelo (137 kg) — a Dafra não lista mais pressão oficial para este modelo fora de linha. Com garupa: traseiro 36 PSI.',
  },
  {
    modelName: 'NH 300',
    yearFrom: 2023,
    yearTo: null,
    tireSize: '100/90-19 (F) · 130/80-17 (R)',
    frontPsi: 25,
    rearPsi: 32,
    frontPsiLoad: 25,
    rearPsiLoad: 36,
    notes: 'Trail média cilindrada, aro 19 dianteiro. Valores convertidos da especificação oficial (1,75 kgf/cm² dianteiro · 2,25 kgf/cm² traseiro). Com garupa ou bagagem: traseiro 36 PSI.',
  },
  {
    modelName: 'NHX 190',
    yearFrom: 2024,
    yearTo: null,
    tireSize: '100/80-17 (F) · 130/70-17 (R)',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 29,
    rearPsiLoad: 36,
    notes: 'Naked urbana, rodas de liga 17" nas duas pontas. Com garupa: traseiro 36 PSI. Calibre sempre com pneu frio.',
  },
  {
    modelName: 'ROADWIN 250R',
    yearFrom: 2012,
    yearTo: 2015,
    tireSize: '110/70-17 (F) · 140/70-17 (R)',
    frontPsi: 30,
    rearPsi: 33,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    notes: 'Esportiva carenada 250cc. Valor estimado por padrão de motos esportivas 250/300cc da mesma linha — pressão oficial não encontrada publicamente para este modelo fora de linha. Não ultrapasse 36 PSI no traseiro.',
  },
]

// ─── MAINTENANCE ITEMS ────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // KANSAS 250
  { modelName: 'KANSAS 250', yearFrom: 2009, yearTo: 2012, component: 'Óleo motor (20W50 mineral, ~1,0–1,2 L — confira na vareta)', intervalKm: 3000, intervalMonths: 6, notes: 'Dafra não lista mais capacidade oficial para este V-twin fora de linha', priority: 'HIGH', order: 1 },
  { modelName: 'KANSAS 250', yearFrom: 2009, yearTo: 2012, component: 'Lubrificar corrente de transmissão', intervalKm: 800, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'KANSAS 250', yearFrom: 2009, yearTo: 2012, component: 'Inspecionar quadro/chassi (solda, trincas, ferrugem na tinta)', intervalKm: 5000, intervalMonths: null, notes: 'Problema estrutural relatado pela comunidade — não ignore sinais', priority: 'CRITICAL', order: 3 },
  { modelName: 'KANSAS 250', yearFrom: 2009, yearTo: 2012, component: 'Verificar nível de óleo pela vareta', intervalKm: 3000, intervalMonths: null, notes: 'Histórico de subabastecimento reportado — nunca complete "no olho"', priority: 'HIGH', order: 4 },
  { modelName: 'KANSAS 250', yearFrom: 2009, yearTo: 2012, component: 'Limpar filtro de ar', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'KANSAS 250', yearFrom: 2009, yearTo: 2012, component: 'Vela NGK CR6HSA (ou CR6HIX iridium)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'KANSAS 250', yearFrom: 2009, yearTo: 2012, component: 'Regular/limpar os dois carburadores BDS26 e checar mangueira de dreno', intervalKm: 10000, intervalMonths: null, notes: 'Mangueira de dreno longa é causa conhecida de engasgo/apagamento na chuva', priority: 'HIGH', order: 7 },
  { modelName: 'KANSAS 250', yearFrom: 2009, yearTo: 2012, component: 'Fluido de freio DOT 4 (disco duplo hidráulico)', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'KANSAS 250', yearFrom: 2009, yearTo: 2012, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'KANSAS 250', yearFrom: 2009, yearTo: 2012, component: 'Folga de válvulas', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'KANSAS 250', yearFrom: 2009, yearTo: 2012, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 11 },

  // NH 300
  { modelName: 'NH 300', yearFrom: 2023, yearTo: null, component: 'Óleo motor (Mobil Super Moto 4T MX 10W-30, 1,5 L)', intervalKm: 3000, intervalMonths: 6, notes: 'Revisão inicial de rodagem aos 1.000 km, depois a cada 3.000 km', priority: 'HIGH', order: 1 },
  { modelName: 'NH 300', yearFrom: 2023, yearTo: null, component: 'Filtro de óleo (papel)', intervalKm: 3000, intervalMonths: null, notes: 'Trocado em toda revisão junto com o óleo', priority: 'HIGH', order: 2 },
  { modelName: 'NH 300', yearFrom: 2023, yearTo: null, component: 'Limpar elemento do filtro de ar', intervalKm: 3000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'NH 300', yearFrom: 2023, yearTo: null, component: 'Ajuste/lubrificação da corrente de transmissão', intervalKm: 3000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'NH 300', yearFrom: 2023, yearTo: null, component: 'Verificar aperto dos raios das rodas', intervalKm: 3000, intervalMonths: null, notes: 'Quebra de raio é reclamação recorrente entre proprietários — não pule esta verificação', priority: 'HIGH', order: 5 },
  { modelName: 'NH 300', yearFrom: 2023, yearTo: null, component: 'Regulagem de folga de válvulas (verificar e ajustar)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'NH 300', yearFrom: 2023, yearTo: null, component: 'Vela NGK CR8E (gap 0,7–0,8 mm)', intervalKm: 12000, intervalMonths: null, notes: 'Verificar nas revisões intermediárias de 3.000 km', priority: 'HIGH', order: 7 },
  { modelName: 'NH 300', yearFrom: 2023, yearTo: null, component: 'Trocar elemento do filtro de ar', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'NH 300', yearFrom: 2023, yearTo: null, component: 'Óleo da suspensão dianteira (ATF 10W, 270 ml cada lado)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'NH 300', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 12, notes: 'Substituir anualmente ou na quilometragem indicada, o que ocorrer primeiro', priority: 'HIGH', order: 10 },
  { modelName: 'NH 300', yearFrom: 2023, yearTo: null, component: 'Líquido de arrefecimento (Mobil Delvac Extended Life 50/50, 950 ml)', intervalKm: null, intervalMonths: 36, notes: 'Verificar nível a cada revisão; substituir a cada 3 anos', priority: 'HIGH', order: 11 },
  { modelName: 'NH 300', yearFrom: 2023, yearTo: null, component: 'Verificar/lubrificar rolamentos e eixo da balança', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 12 },
  { modelName: 'NH 300', yearFrom: 2023, yearTo: null, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 13 },

  // NHX 190
  { modelName: 'NHX 190', yearFrom: 2024, yearTo: null, component: 'Óleo motor (Mobil Super Moto 4T semissintético 10W-30, ~1,0 L)', intervalKm: 3000, intervalMonths: 6, notes: 'Revisão inicial de rodagem aos 1.000 km, depois a cada 3.000 km', priority: 'HIGH', order: 1 },
  { modelName: 'NHX 190', yearFrom: 2024, yearTo: null, component: 'Limpeza do filtro de tela do óleo do motor', intervalKm: 3000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'NHX 190', yearFrom: 2024, yearTo: null, component: 'Verificar aperto dos raios das rodas', intervalKm: 3000, intervalMonths: null, notes: 'Mesmo problema de quebra de raio já relatado na NH 300 (plataforma compartilhada)', priority: 'HIGH', order: 3 },
  { modelName: 'NHX 190', yearFrom: 2024, yearTo: null, component: 'Ajuste/lubrificação da corrente 428H136 (relação 47x15)', intervalKm: 3000, intervalMonths: null, notes: 'Lubrificar a cada 500 km em uso urbano intenso', priority: 'HIGH', order: 4 },
  { modelName: 'NHX 190', yearFrom: 2024, yearTo: null, component: 'Verificar cabo de embreagem', intervalKm: 6000, intervalMonths: null, notes: 'Relatos de ruptura prematura — ande com cabo reserva em viagens', priority: 'MEDIUM', order: 5 },
  { modelName: 'NHX 190', yearFrom: 2024, yearTo: null, component: 'Regulagem de válvulas (verificar e ajustar)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'NHX 190', yearFrom: 2024, yearTo: null, component: 'Inspecionar elemento do filtro de ar / trocar', intervalKm: 9000, intervalMonths: null, notes: 'Limpeza/inspeção nas revisões intermediárias de 3.000 km', priority: 'MEDIUM', order: 7 },
  { modelName: 'NHX 190', yearFrom: 2024, yearTo: null, component: 'Vela CPR8EA-9 (gap 0,8–0,9 mm)', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'NHX 190', yearFrom: 2024, yearTo: null, component: 'Inspecionar suporte do amortecedor traseiro e caixa de direção', intervalKm: 10000, intervalMonths: null, notes: 'Falhas relatadas mesmo em uso leve — atenção a ruído novo', priority: 'HIGH', order: 9 },
  { modelName: 'NHX 190', yearFrom: 2024, yearTo: null, component: 'Óleo da suspensão dianteira (ATF, 270 ml cada lado)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'NHX 190', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 12, notes: 'Substituir anualmente ou na quilometragem indicada, o que ocorrer primeiro', priority: 'HIGH', order: 11 },
  { modelName: 'NHX 190', yearFrom: 2024, yearTo: null, component: 'Líquido de arrefecimento (Mobil Delvac 50/50)', intervalKm: 24000, intervalMonths: null, notes: 'Verificar sempre; luz de temperatura acendendo em rodovia foi relatada por proprietários', priority: 'HIGH', order: 12 },
  { modelName: 'NHX 190', yearFrom: 2024, yearTo: null, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 13 },

  // ROADWIN 250R
  { modelName: 'ROADWIN 250R', yearFrom: 2012, yearTo: 2015, component: 'Óleo motor (Mobil Super Moto 4T MX 15W-50, 1,3 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'ROADWIN 250R', yearFrom: 2012, yearTo: 2015, component: 'Lubrificar corrente de transmissão (Mobil Chain Lube)', intervalKm: 500, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'ROADWIN 250R', yearFrom: 2012, yearTo: 2015, component: 'Limpar filtro de ar', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'ROADWIN 250R', yearFrom: 2012, yearTo: 2015, component: 'Verificar aperto geral (carenagens, descarga, retrovisores)', intervalKm: 5000, intervalMonths: null, notes: 'Relatos de peças soltando com uso e garupa em piso irregular', priority: 'MEDIUM', order: 4 },
  { modelName: 'ROADWIN 250R', yearFrom: 2012, yearTo: 2015, component: 'Verificar vela de ignição (confirmar código com o vendedor de peças)', intervalKm: 10000, intervalMonths: null, notes: 'Especificação oficial de vela não documentada publicamente para este modelo', priority: 'HIGH', order: 5 },
  { modelName: 'ROADWIN 250R', yearFrom: 2012, yearTo: 2015, component: 'Fluido de freio DOT 4 (2 discos dianteiros + traseiro)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'ROADWIN 250R', yearFrom: 2012, yearTo: 2015, component: 'Óleo da suspensão dianteira (SAE 10W, 0,245 L cada lado)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'ROADWIN 250R', yearFrom: 2012, yearTo: 2015, component: 'Folga de válvulas (motor DOHC)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'ROADWIN 250R', yearFrom: 2012, yearTo: 2015, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'ROADWIN 250R', yearFrom: 2012, yearTo: 2015, component: 'Trocar líquido de arrefecimento (Mobil Delvac Extended Life 50/50, 1 L)', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'ROADWIN 250R', yearFrom: 2012, yearTo: 2015, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 11 },
]

// ─── RUNNER ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed DAFRA (Kansas 250 / NH 300 / NHX 190 / Roadwin 250R) iniciado...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'DAFRA', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'DAFRA', vehicleTypeId: motoType.id },
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

  console.log('✅ Seed DAFRA (Kansas 250 / NH 300 / NHX 190 / Roadwin 250R) concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
