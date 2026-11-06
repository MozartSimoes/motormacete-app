/**
 * Seed DAFRA — SUPER 100, SUPER 50, ZIG 100, ZIG 100+, ZIG 50, SMART 125cc
 * Macetes, problemas e manutenção para as motos/scooters de entrada mais simples
 * e antigas da linha DAFRA registradas na Tabela FIPE Brasil
 *
 * CONTEXTO: a parceria DAFRA↔TVS terminou em 03/2024 (a fábrica de Manaus parou de montar
 * motos TVS/Apache) — isso NÃO é um encerramento total da marca. A DAFRA segue operando no
 * Brasil, agora com foco na parceria com a SYM. Os modelos cobertos aqui (Super 100/50,
 * Zig 100/100+/50, Smart 125cc) são motos/scooters de entrada muito simples e de baixo custo,
 * lançadas entre 2008 e 2016 aproximadamente — a produção destes modelos específicos foi
 * encerrada há anos por serem projetos antigos e de baixo volume, não porque a marca tenha
 * fechado. Há indícios de que o nome "Super 50"/"Zig 50" tenha voltado ao catálogo em anos
 * recentes como ciclomotor de entrada — trate isso como incerto e não afirme categoricamente
 * nem que "a marca fechou" nem datas de descontinuação exatas sem qualificar como estimativa.
 *
 * PLATAFORMA: Super 100, Super 50, Zig 100, Zig 100+ e Zig 50 compartilham a mesma família de
 * motor monocilíndrico 4 tempos OHC refrigerado a ar, câmbio "semiautomático" (transmissão
 * rotativa de 4 marchas + embreagem centrífuga automática, sem alavanca de embreagem manual,
 * troca de marcha com o pé cortando o acelerador) e a mesma vela de ignição — apenas a
 * cilindrada muda entre a versão 50cc e a 100cc. Isso significa boa parte de peças de motor e
 * elétrica intercambiáveis entre essas quatro variantes. A Smart 125cc é a exceção: scooter com
 * câmbio CVT automático e (segundo especificação oficial) injeção eletrônica — mais sofisticada
 * mecanicamente que as demais desta leva, mas ainda um projeto simples e de entrada.
 *
 * IMPORTANTE — especificações não encontradas com confirmação total (marcadas como estimativa
 * no corpo dos tips): pressão de pneu exata da Smart 125cc (fonte oficial não localizada — usei
 * valor de referência para scooter de rodas pequenas 10"), pressão de pneu da Super 50 (assumida
 * igual à Super 100 por compartilhar rodas/pneus), datas exatas de início/fim de produção de
 * cada variante (fontes de tabela FIPE/revistas divergem em detalhes de ano), potência exata do
 * motor da Zig 100 original vs Zig 100+ (fontes variam entre 7,0 e 7,8 cv — mesma faixa, sem
 * confirmação de qual ano corresponde a qual número exato).
 *
 * Fontes: magodoscarros.com, motonline.com.br, tabelademotos.com.br, mecanicamotoshow.blogspot.com
 *         (fichas técnicas + dicas de mecânica específicas destes modelos), turismo2rodas.com,
 *         daframotos.com.br (documentos oficiais de pós-venda), dafra.forumeiros.com (relatos de
 *         proprietários), motorede.com.br, olhonocarro.com.br, tuningparts.com.br /
 *         mercadolivre.com.br (compatibilidade de peças entre os modelos da família 50/100cc)
 *
 * Execute: pnpm --filter @motormacete/database db:seed:dafra-super-zig-smart (ajuste o script conforme necessário)
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

// ─── SUPER 100 (motor 97,2cc, câmbio semiautomático 4 marchas, freios a tambor) ──
// Fonte: motonline.com.br, magodoscarros.com, mecanicamotoshow.blogspot.com

const SUPER100_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Câmbio semiautomático: troque marcha cortando o acelerador, sem alavanca de embreagem',
    body: 'A Super 100 (97,2cc) não tem alavanca de embreagem no guidão — o câmbio é do tipo "semiautomático" com embreagem multidisco centrífuga automática em banho de óleo. A sequência do pedal é rotativa: N-1-2-3-4 e depois volta para N. Para trocar suavemente, corte o acelerador no exato momento de pisar o pedal — trocar sem aliviar o gás desgasta o mecanismo do câmbio e faz a moto "pinotear". É a mesma lógica de motos tipo Honda Biz/Pop.',
  },
  {
    severity: 'OK',
    title: 'Óleo API SF/SG JASO MA 20W50: a embreagem é lubrificada pelo mesmo óleo do motor',
    body: 'A embreagem centrífuga multidisco da Super 100 fica em banho de óleo — o mesmo óleo que lubrifica o motor. Por isso é obrigatório usar óleo com especificação JASO MA (ou MA2), nunca óleo de câmbio separado nem óleo de carro. Capacidade: ~0,7 litro após drenagem simples, ~0,9 litro após desmontagem completa do motor. Óleo sem JASO MA (com aditivos redutores de atrito) faz a embreagem escorregar.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ6-10#: marcha lenta em 1.500 rpm — não regule mais baixo que isso',
    body: 'O carburador PZ6-10# original tem marcha lenta especificada em 1.500 ± 100 rpm. Regular abaixo disso faz o motor morrer parado em cruzamentos e semáforos, especialmente a frio. Etanol de baixa qualidade (comum em postos de estrada) entope os jatos finos deste carburador pequeno em poucas semanas — se notar dificuldade de partida a frio ou engasgo, a limpeza do carburador costuma resolver.',
  },
  {
    severity: 'OK',
    title: 'Freio a tambor nas duas rodas: sem disco — ajuste do cabo é a manutenção mais importante',
    body: 'Diferente da Zig 100 (que tem disco dianteiro), a Super 100 usa freio a tambor de expansão interna na roda dianteira E traseira. Sem o reforço hidráulico de um disco, a eficiência de frenagem depende inteiramente do ajuste correto do cabo e do estado da lona. Mantenha 10-15 mm de folga livre no acionamento antes de sentir resistência — cabo muito esticado ou muito frouxo prejudica a frenagem de forma perceptível.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão: lubrifique a cada 500 km — item frequentemente esquecido',
    body: 'A Super 100 tem transmissão final por corrente (não é CVT). Sem lubrificação regular, a corrente estica rápido e desgasta o kit relação (pinhão + coroa) prematuramente. Aplique spray de corrente ou óleo 80W90 a cada 500 km e verifique a folga — 20-30 mm de jogo vertical no ponto mais tenso é o ideal para este tipo de motor pequeno.',
  },
  {
    severity: 'OK',
    title: 'Consumo esperado: 40+ km/L — abaixo disso, investigue carburador e vela',
    body: 'Com motor de 97,2cc e baixo peso (85 kg peso seco), a Super 100 é feita para economizar combustível — o esperado é acima de 40 km/L em uso urbano moderado. Consumo bem abaixo disso costuma indicar carburador desregulado (mistura rica), vela gasta, filtro de ar sujo ou pneus com pressão baixa. Tanque de 10 L (reserva de 0,8 L) dá autonomia generosa para o dia a dia.',
  },
]

const SUPER100_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Modelo com produção encerrada há anos: peças originais escassas, mas motor é compartilhado com a linha 100cc/50cc',
    body: 'A Super 100 é um modelo antigo e de baixo volume — sua produção específica foi encerrada há bastante tempo, não porque a DAFRA tenha fechado, mas porque é um projeto simples que saiu de linha. A boa notícia: o motor 97,2cc e a vela de ignição são compartilhados com a Zig 100, Zig 50 e Super 50 — vendedores de peças costumam anunciar "vela Zig 100/Zig 50/Super 100/Super 50" como um único item, o que amplia bastante a disponibilidade de peças de motor e ignição comparado a um modelo isolado.',
  },
  {
    severity: 'WARN',
    title: 'Falha de partida por fio solto ou conector oxidado — checagem simples antes de levar à oficina',
    body: 'Relatos de proprietários em fóruns da marca mostram que a causa mais comum de "não pega de jeito nenhum" (nem com afogador, nem com pedal) é um fio solto ou conector oxidado no chicote — não necessariamente peça queimada. Antes de gastar com diagnóstico: verifique se há fios soltos sob o assoalho/carenagem, confira se há gasolina saindo pelo parafuso de dreno do carburador e teste se a vela solta uma centelha forte e azulada. Esses três testes resolvem boa parte dos casos de partida.',
  },
  {
    severity: 'WARN',
    title: 'Vedante da bengala dianteira: vaza óleo após uso prolongado em pavimento ruim',
    body: 'O vedante da bengala dianteira da Super 100 tem vida útil limitada em cidades com buracos frequentes. Sinal: mancha de óleo na parte inferior da bengala ou no pneu dianteiro. Bengala vazando perde eficiência de amortecimento — risco em freadas bruscas. Troca do vedante é serviço simples de oficina, custo baixo por se tratar de peça pequena e genérica amplamente disponível para motos 100cc chinesas/nacionais desse porte.',
  },
  {
    severity: 'WARN',
    title: 'Regulador de tensão de qualidade modesta — queima lâmpadas com frequência',
    body: 'Como em praticamente toda a linha de entrada da DAFRA, o regulador de tensão (retificador) original da Super 100 permite picos de tensão que queimam lâmpadas do farol e da lanterna com frequência acima do normal. Diagnóstico: com o motor girando por volta de 4.000 rpm, meça a tensão na bateria com multímetro — acima de 14,8V indica regulador com defeito. Trocar por um regulador genérico compatível resolve o problema; lâmpadas LED de encaixe direto também ajudam a resistir aos picos.',
  },
  {
    severity: 'WARN',
    title: 'Freio a tambor perde eficiência com o desgaste da lona — atenção redobrada por não ter disco',
    body: 'Como a Super 100 não tem freio a disco em nenhuma roda, o desgaste da lona do tambor é mais crítico para a segurança do que em modelos com disco. Lona gasta ou cabo desregulado aumenta a distância de frenagem de forma perceptível. Inspecione a folga do pedal/manete a cada poucas semanas de uso e não espere o freio "ficar fraco" para agir — troque a lona ao primeiro sinal de perda de mordida.',
  },
]

const SUPER100_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Super 100: motor simples e barato de manter, mas com dois itens de atenção redobrada (freio a tambor e câmbio semiautomático)',
    body: '500 km — Lubrificar corrente de transmissão. | 1.000 km — Troca de óleo motor (20W50 API SF/SG JASO MA, ~0,7 L). | 3.000 km — Troca de óleo rotineira. Verificar tensão da corrente (20-30 mm de folga). Ajuste do cabo de freio (dianteiro e traseiro, tambor). | 5.000 km — Limpar filtro de ar (elemento de papel — inspecionar e trocar se estiver sujo/rasgado). Inspecionar vela. | 10.000 km — Trocar vela de ignição. Limpar carburador PZ6-10# (jatos e bóia). Lona de freio (inspecionar). | 15.000 km — Kit relação (corrente + pinhão + coroa, se desgastado). Verificar vedante da bengala dianteira. | 20.000 km — Filtro de ar novo. Inspecionar regulador de tensão (teste de tensão na bateria). | 25.000–30.000 km — Revisão geral do motor e do câmbio semiautomático (embreagem centrífuga).',
  },
]

// ─── SUPER 50 (motor 49,5-49,9cc, irmã pequena da Super 100, carburador PZ16) ────

const SUPER50_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 49,5cc irmão reduzido da Super 100: mesmo câmbio semiautomático, mesma vela',
    body: 'A Super 50 usa a mesma arquitetura de motor monocilíndrico OHC a ar e o mesmo câmbio semiautomático (rotativo 4 marchas, embreagem centrífuga automática, sem alavanca de embreagem) da Super 100, apenas reduzido para 49,5-49,9cc. A vela de ignição (NGK CR7HSA/C7HSA) costuma ser vendida como item compartilhado com a Super 100, Zig 100 e Zig 50 — boa notícia para quem procura peça de reposição.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ16: menor que o da Super 100 — entope ainda mais rápido com etanol ruim',
    body: 'O carburador PZ16 da Super 50 tem passagens de combustível ainda menores que o PZ6-10# da Super 100. Etanol de baixa qualidade ou moto parada por mais de 2-3 semanas com gasolina no tanque tende a entupir os jatos finos rapidamente. Sintomas: dificuldade de partida a frio, engasgo na retomada e consumo acima do normal. Limpeza preventiva é mais barata que deixar o carburador entupir de vez.',
  },
  {
    severity: 'OK',
    title: 'Ciclomotor: categoria de trânsito diferenciada por ter motor de até 50cc',
    body: 'Por ter motor de até 50cc e velocidade limitada, a Super 50 se enquadra na categoria de "ciclomotor" da legislação de trânsito brasileira — categoria com regras de habilitação diferentes de uma moto convencional. Antes de rodar, confirme junto ao Detran a documentação exigida para o seu caso, já que a fiscalização e a exigência de habilitação para ciclomotores variam conforme o órgão de trânsito.',
  },
  {
    severity: 'OK',
    title: 'Câmbio semiautomático: mesma técnica da Super 100 — corte o gás ao trocar de marcha',
    body: 'Assim como a Super 100, a Super 50 não tem embreagem manual — o câmbio é semiautomático com pedal rotativo N-1-2-3-4. Para preservar o mecanismo, sempre alivie o acelerador no instante de acionar o pedal de câmbio. Trocar marcha "pisando fundo" desgasta a embreagem centrífuga e o mecanismo de engate prematuramente.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão: lubrifique a cada 500 km — motor pequeno não perdoa negligência',
    body: 'A Super 50 tem transmissão final por corrente. Com motor de baixa cilindrada, qualquer perda de eficiência mecânica (corrente seca, mal ajustada) é proporcionalmente mais perceptível no desempenho do que em motos maiores. Lubrifique a cada 500 km e mantenha 20-30 mm de folga no ponto mais tenso.',
  },
  {
    severity: 'OK',
    title: 'Consumo alto divulgado (~50 km/L): trate como estimativa de marketing, não garantia',
    body: 'Divulgações da marca mencionam consumo de até 50 km/L para versões renovadas da Super 50. Na prática, em uso urbano real com paradas frequentes, o consumo costuma ficar um pouco abaixo disso — ainda assim, é normal esperar economia bem acima de 40 km/L com o motor e o carburador em bom estado. Consumo muito abaixo disso é sinal de regulagem de carburador, vela ou filtro de ar.',
  },
]

const SUPER50_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Modelo muito simples com produção descontinuada há anos em algumas fases — comunidade pequena de proprietários',
    body: 'A Super 50 é um dos modelos mais simples e de menor valor de revenda da linha DAFRA, o que historicamente resultou em produção intermitente ao longo dos anos (a marca já apresentou "novas gerações" com visual atualizado mantendo a mesma mecânica). Isso não significa que a DAFRA tenha fechado — apenas que este nicho de ciclomotor de entrada tem produção menor e mais irregular. Peças de motor e elétrica compartilhadas com a Zig 50/Zig 100/Super 100 ajudam bastante na hora de procurar reposição.',
  },
  {
    severity: 'WARN',
    title: 'Falha de partida por fio solto: problema recorrente relatado em fóruns de proprietários',
    body: 'Relatos de donos de Super 50 mostram casos de moto que "não pega de jeito nenhum" resolvidos ao encontrar um fio fino desconectado embaixo da carenagem (geralmente um par verde/preto do chicote de ignição). Antes de suspeitar de CDI ou bobina queimada, vale a pena inspecionar visualmente as conexões do chicote — é um problema barato e comum de resolver.',
  },
  {
    severity: 'WARN',
    title: 'Regulador de tensão: mesmo ponto fraco elétrico do restante da linha DAFRA de entrada',
    body: 'O regulador de tensão original da Super 50 tem a mesma fragilidade observada em toda a linha de motos de entrada da marca: picos de tensão acima do normal queimam lâmpadas com frequência. Teste com multímetro na bateria a 4.000 rpm — acima de 14,8V indica regulador defeituoso. Substituição por peça genérica compatível resolve a maior parte dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Vedante de bengala dianteira: vazamento após uso prolongado em ruas com buracos',
    body: 'Com peso reduzido e suspensão simples, a bengala dianteira da Super 50 ainda assim sofre desgaste do vedante em uso com pavimentação ruim. Manchas de óleo na parte inferior da bengala indicam necessidade de troca do retentor — serviço simples e de baixo custo em qualquer oficina de motos.',
  },
]

const SUPER50_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Super 50: ciclomotor simples — atenção ao carburador pequeno e ao câmbio semiautomático',
    body: '500 km — Lubrificar corrente de transmissão. | 1.000 km — Troca de óleo motor (20W50 API SF/SG JASO MA, ~0,7-0,8 L). | 3.000 km — Troca de óleo rotineira. Verificar tensão da corrente. | 5.000 km — Limpar filtro de ar. Inspecionar vela NGK CR7HSA/C7HSA. | 8.000-10.000 km — Trocar vela. Limpar carburador PZ16 (jatos finos entopem fácil). Ajuste do freio a tambor (folga 10-15 mm no acionamento). | 15.000 km — Kit relação (corrente + pinhão + coroa) se desgastado. Verificar vedante da bengala dianteira. | 20.000 km — Filtro de ar novo. Inspecionar regulador de tensão. | 25.000 km — Revisão geral do motor e do câmbio semiautomático.',
  },
]

// ─── ZIG 100 (2009-2011, lançamento original — motor 101,8cc, disco dianteiro) ───
// Fonte: revista.moto.com.br, motonline.com.br, mecanicamotoshow.blogspot.com

const ZIG100_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Primeiro CUB da DAFRA: câmbio rotativo + embreagem centrífuga automática, sem alavanca de embreagem',
    body: 'Lançada em 2009 como o primeiro modelo da categoria "CUB" da DAFRA, a Zig 100 (101,8cc) usa a mesma lógica de câmbio semiautomático da Super 100/Super 50: pedal rotativo N-1-2-3-4, embreagem centrífuga automática. Para andar suave, corte o acelerador no instante de trocar a marcha — força excessiva no pedal com o motor "puxando" desgasta o mecanismo de engate.',
  },
  {
    severity: 'OK',
    title: 'Freio dianteiro a disco com pinça dupla: melhor frenagem que a Super 100, mas exige fluido em dia',
    body: 'Diferente da Super 100 (que tem tambor nas duas rodas), a Zig 100 tem freio dianteiro a disco com pinça de dois pistões — item mais moderno para a categoria. Isso melhora a frenagem, mas exige atenção ao fluido de freio (DOT 3/4), que deve ser trocado periodicamente mesmo em uma moto de entrada — fluido velho absorve umidade e reduz a eficiência de frenagem sem dar aviso óbvio.',
  },
  {
    severity: 'OK',
    title: 'Rodas de liga leve compartilhadas com a Zig 50: pneus 2,50-17 (frente) e 2,75-17 (traseira)',
    body: 'A Zig 100 usa rodas de liga leve aro 17 com pneus 2,50-17 na frente e 2,75-17 atrás — a mesma medida usada na Zig 50 (motor menor, mesmo chassi/rodas). Isso amplia a disponibilidade de pneus de reposição no mercado, já que lojas costumam anunciar o mesmo pneu para "Zig 50/Zig 100".',
  },
  {
    severity: 'OK',
    title: 'Bateria selada 12V 5Ah: baixa capacidade — carregador de manutenção evita descarga em moto parada',
    body: 'A bateria original da Zig 100 é selada, 12V 5Ah — capacidade pequena, típica de moto de entrada. Se a moto ficar parada por semanas (uso ocasional, segunda moto da casa), a bateria descarrega e perde vida útil mais rápido que baterias maiores. Um carregador/mantenedor de bateria (tipo "trickle charger", R$ 80-150) evita esse desgaste em motos de uso esporádico.',
  },
  {
    severity: 'WARN',
    title: 'Carburador pequeno: etanol de baixa qualidade entope os jatos em poucas semanas',
    body: 'Assim como os demais modelos desta linha de entrada, o carburador da Zig 100 tem passagens finas sensíveis a etanol de má qualidade (comum em postos de estrada/interior). Se notar dificuldade de partida a frio ou engasgo na retomada, considere a limpeza do carburador antes de suspeitar de problemas maiores no motor.',
  },
  {
    severity: 'OK',
    title: 'Consumo esperado: 35-40 km/L em uso urbano moderado',
    body: 'Com motor de 101,8cc e baixo peso, a Zig 100 costuma entregar entre 35 e 40 km/L em uso urbano. Consumo bem abaixo disso indica filtro de ar sujo, vela gasta, carburador desregulado (mistura rica) ou pressão de pneu baixa — verifique esses itens antes de suspeitar de problema no motor.',
  },
]

const ZIG100_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Modelo com produção encerrada há anos: peças de motor compartilhadas com Super 100/Super 50/Zig 50 ajudam',
    body: 'A produção específica da Zig 100 original (2009-2011) foi encerrada há bastante tempo — não por a marca ter fechado, mas por ser um projeto de entrada antigo e substituído depois pela Zig 100+. A vantagem: o motor 101,8cc e a vela de ignição são praticamente os mesmos da Super 100, e as rodas/pneus são os mesmos da Zig 50 — vendedores de peças costumam anunciar itens compatíveis com toda essa família de modelos, o que facilita bastante encontrar reposição de motor e elétrica.',
  },
  {
    severity: 'WARN',
    title: 'Vedante de bengala dianteira: vaza óleo após uso prolongado em pavimento irregular',
    body: 'O vedante da bengala dianteira tem vida útil limitada em cidades com buracos frequentes — sinal claro é mancha de óleo na parte inferior da bengala ou no pneu dianteiro. Bengala vazando compromete o amortecimento e aumenta o risco em freadas bruscas. Peça e troca são de baixo custo por se tratar de item padrão de motos de entrada desse porte.',
  },
  {
    severity: 'WARN',
    title: 'Regulador de tensão de qualidade modesta: queima lâmpadas com frequência',
    body: 'O regulador de tensão original da Zig 100 compartilha o mesmo ponto fraco do restante da linha de entrada da DAFRA: picos de tensão acima do normal queimam lâmpadas do farol e da lanterna. Meça a tensão na bateria a 4.000 rpm — acima de 14,8V indica regulador com defeito. Substituição por peça genérica compatível resolve a maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico: conectores oxidam após alguns anos, causando falhas intermitentes',
    body: 'Os conectores do chicote elétrico da Zig 100 não têm a mesma qualidade de vedação de marcas japonesas — em regiões litorâneas ou com chuva frequente, oxidam com o tempo. Sintomas: pisca-pisca que falha, luz de freio intermitente, dificuldade ocasional de partida. Limpeza com spray de contato e aplicação de graxa dielétrica nos conectores costuma resolver a maioria dos casos sem precisar trocar peças.',
  },
]

const ZIG100_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Zig 100: motor 101,8cc simples — disco dianteiro pede atenção ao fluido de freio',
    body: '500 km — Lubrificar corrente de transmissão. | 1.000 km — Troca de óleo motor (20W50 API SF/SG JASO MA, ~1,0 L; ~0,8 L após drenagem simples). | 3.000 km — Troca de óleo rotineira. Verificar tensão da corrente. | 5.000 km — Limpar filtro de ar. Inspecionar vela e pastilhas do freio dianteiro a disco. | 10.000 km — Trocar vela (NGK C7HSA/CR7HSA). Limpar carburador. Inspecionar bateria selada 12V 5Ah. | 15.000 km — Fluido de freio DOT 3/4 (dianteiro). Kit relação se desgastado. | 20.000 km — Filtro de ar novo. Vedante da bengala dianteira (se vazando). Regulador de tensão (inspecionar). | 25.000-30.000 km — Revisão geral do motor e do câmbio semiautomático.',
  },
]

// ─── ZIG 100+ (2012-2016, facelift — mesma mecânica, visual atualizado) ─────────
// NOTA: "ZIG 100+" também casa com o bloco "ZIG 100" acima (regex \bZIG 100\b casa com
// "ZIG 100+" pois "+" é quebra de palavra) — as dicas dos dois blocos se somam.

const ZIG100PLUS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Zig 100+ (2012-2016): visual renovado, mecânica praticamente idêntica à Zig 100 original',
    body: 'A Zig 100+ é a versão facelift da Zig 100 original, com carenagem e detalhes visuais atualizados a partir de 2012 — mas o motor 101,8cc, o câmbio semiautomático e as rodas de liga leve aro 17 seguem a mesma base mecânica. Consulte também as dicas do bloco "ZIG 100" (motor, câmbio, carburador, bateria) — elas se aplicam integralmente à versão +.',
  },
  {
    severity: 'WARN',
    title: 'Identifique a geração exata antes de comprar peça de carenagem',
    body: 'Como a Zig 100+ mudou o desenho de para-lamas, carenagem lateral e óptica em relação à Zig 100 original, peças de plástico/carenagem não são sempre intercambiáveis entre as duas versões — mesmo com motor e chassi muito parecidos. Ao comprar peça de carroceria, confirme o ano exato do seu veículo e, se possível, compare fotos com o vendedor antes de fechar a compra.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor, elétrica e rodas seguem compartilhadas com toda a família 50/100cc',
    body: 'Apesar da mudança visual, a Zig 100+ mantém o mesmo motor, vela, câmbio e pneus (2,50-17 frente / 2,75-17 atrás) das demais variantes desta família — Super 100, Super 50 e Zig 50. Isso significa que, para peças mecânicas (diferente das peças de carenagem), a busca por compatibilidade pode ser ampliada para qualquer uma dessas quatro nomenclaturas.',
  },
  {
    severity: 'WARN',
    title: 'CDI de ignição: mesmo ponto de atenção térmica herdado da geração anterior',
    body: 'A unidade CDI da Zig 100+ é da mesma família da usada na Zig 100 original e tende a apresentar o mesmo padrão de falha térmica após vários anos de uso: moto funciona bem a frio, mas passa a cortar ou engasgar depois de 15-20 minutos rodando, normalizando após esfriar. Esse padrão de sintoma aponta para CDI com fadiga térmica — troca por peça genérica compatível costuma resolver.',
  },
]

const ZIG100PLUS_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Versão facelift ainda mais rara que a Zig 100 original — comunidade de proprietários pequena',
    body: 'Por ter sido produzida em um período mais curto e substituída depois no catálogo da marca, a Zig 100+ tem uma base de proprietários ativa menor que a Zig 100 original. Isso não indica que a marca tenha fechado — apenas que este nicho de moto de entrada e baixo valor de revenda tem histórico de produção mais curto. Ao procurar peças de motor/elétrica, busque também pela nomenclatura "Zig 100" (sem o +) — a mecânica é essencialmente a mesma.',
  },
  {
    severity: 'WARN',
    title: 'Carenagem específica da versão + é mais difícil de encontrar do que peças mecânicas',
    body: 'Peças plásticas específicas do desenho da Zig 100+ (para-lamas, carenagem lateral, óptica) têm reposição mais escassa do que peças de motor, já que o desenho não é o mesmo da Zig 100 original. Priorize a compra de uma unidade com carenagem completa e em bom estado, já que reposição de plástico específico costuma ser o item mais difícil de resolver neste modelo.',
  },
  {
    severity: 'WARN',
    title: 'Mesmos pontos fracos elétricos herdados da geração anterior (regulador, chicote)',
    body: 'Por compartilhar a base elétrica da Zig 100 original, a Zig 100+ herda os mesmos pontos de atenção: regulador de tensão que permite picos acima do normal e conectores do chicote que oxidam com o tempo. Consulte as dicas do bloco "ZIG 100" para diagnóstico e solução desses dois itens.',
  },
]

const ZIG100PLUS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Zig 100+: idêntico ao da Zig 100 original — mesma base mecânica',
    body: 'O cronograma de manutenção da Zig 100+ segue exatamente os mesmos intervalos e itens do bloco "ZIG 100" (óleo, corrente, vela, carburador, freio a disco dianteiro, bateria, fluido de freio) — a mudança entre as duas versões foi apenas visual/de carenagem, não mecânica. Consulte o cronograma completo no bloco "ZIG 100" desta mesma marca.',
  },
]

// ─── ZIG 50 (motor 49,5-49,9cc, irmã pequena da Zig 100, mesmas rodas) ──────────

const ZIG50_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 49,5cc irmão reduzido da Zig 100: mesmo câmbio rotativo, mesma vela de ignição',
    body: 'A Zig 50 compartilha a base mecânica da Zig 100 (câmbio rotativo com embreagem centrífuga automática, sem alavanca de embreagem manual), apenas com motor reduzido para 49,5-49,9cc. A vela de ignição (NGK CR7HSA) costuma ser vendida como item compatível com toda a família Zig/Super 50/100cc — facilita bastante achar peça de reposição.',
  },
  {
    severity: 'OK',
    title: 'Ciclomotor: categoria de trânsito diferenciada por ter motor de até 50cc',
    body: 'Por ser um ciclomotor (motor de até 50cc), a Zig 50 se enquadra em regras de habilitação diferentes das motos convencionais na legislação brasileira. Confirme com o Detran da sua região a documentação exigida antes de rodar — a exigência específica pode variar conforme o órgão de trânsito local.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ16: entope rápido com etanol de baixa qualidade',
    body: 'Assim como na Super 50, o carburador pequeno da Zig 50 tem jatos finos sensíveis a etanol ruim (comum em postos de estrada) e a longos períodos parado com gasolina no tanque. Dificuldade de partida a frio e engasgo na retomada costumam indicar a necessidade de limpeza do carburador.',
  },
  {
    severity: 'OK',
    title: 'Pneus e rodas compartilhados com a Zig 100: 2,50-17 (frente) e 2,75-17 (traseira)',
    body: 'A Zig 50 usa a mesma medida de pneu e roda de liga leve aro 17 da Zig 100 — 2,50-17 na frente e 2,75-17 atrás. Isso amplia a disponibilidade de pneus no mercado de reposição, já que muitas lojas anunciam o mesmo item para os dois modelos.',
  },
  {
    severity: 'OK',
    title: 'Consumo divulgado de até 67 km/L: trate como número de marketing, não expectativa garantida',
    body: 'Material de divulgação da marca menciona consumo de até 67 km/L para a Zig 50. Na prática de uso urbano real, com paradas frequentes e trânsito, o consumo tende a ficar mais modesto — ainda assim é normal esperar economia bem acima de 40-50 km/L com carburador e vela em bom estado. Consumo muito abaixo disso indica regulagem ou peça de motor a verificar.',
  },
]

const ZIG50_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Modelo simples com produção encerrada há anos nesta versão específica — peças compartilhadas com a família ajudam',
    body: 'A Zig 50 é um ciclomotor de entrada e baixo valor de revenda, com histórico de produção intermitente ao longo dos anos (a marca já relançou versões atualizadas do nome no catálogo). Isso não é sinal de a DAFRA ter fechado — apenas reflete o nicho pequeno desse tipo de veículo. Motor, vela e rodas compartilhados com a Zig 100/Super 50/Super 100 ajudam bastante na hora de procurar peça de reposição.',
  },
  {
    severity: 'WARN',
    title: 'Falha elétrica por conector oxidado ou solto — verifique antes de suspeitar do CDI',
    body: 'Como em outros modelos desta família, boa parte dos casos de falha de partida ou funcionamento intermitente da Zig 50 tem origem em conectores do chicote oxidados ou soltos, não necessariamente em peças caras como CDI ou bobina. Vale inspecionar visualmente as conexões antes de trocar peças por suspeita.',
  },
  {
    severity: 'WARN',
    title: 'Regulador de tensão: mesmo ponto fraco elétrico do restante da linha de entrada',
    body: 'O regulador de tensão original da Zig 50 tem o mesmo padrão de falha do restante da linha DAFRA de entrada — picos de tensão que queimam lâmpadas com frequência. Teste com multímetro na bateria a 4.000 rpm: acima de 14,8V indica regulador defeituoso.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro a tambor: perde eficiência com o desgaste da lona — ajuste periódico é essencial',
    body: 'O freio traseiro a tambor da Zig 50 desregula com o uso e o esticamento do cabo. Mantenha 10-15 mm de folga livre no acionamento antes de sentir resistência e troque a lona ao primeiro sinal de perda de mordida — a moto é leve, mas a segurança na frenagem não deve ser negligenciada.',
  },
]

const ZIG50_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Zig 50: ciclomotor simples, mesma base mecânica da Zig 100 reduzida',
    body: '500 km — Lubrificar corrente de transmissão. | 1.000 km — Troca de óleo motor (20W50 API SF/SG JASO MA, ~0,8-1,0 L). | 3.000 km — Troca de óleo rotineira. Verificar tensão da corrente. | 5.000 km — Limpar filtro de ar. Inspecionar vela NGK CR7HSA. | 8.000-10.000 km — Trocar vela. Limpar carburador PZ16. Ajuste do freio traseiro a tambor. | 15.000 km — Kit relação se desgastado. Verificar vedante da bengala dianteira. | 20.000 km — Filtro de ar novo. Inspecionar regulador de tensão e conectores do chicote. | 25.000 km — Revisão geral do motor e do câmbio rotativo.',
  },
]

// ─── SMART 125cc (motor 124,6cc CVT, injeção eletrônica — a mais sofisticada do grupo) ─
// Fonte: manual de serviço oficial DAFRA Smart 125 (scribd/slideshare), motonline.com.br,
//        mecanicamotoshow.blogspot.com

const SMART125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Injeção eletrônica num scooter simples de entrada: raridade nesta categoria de veículo',
    body: 'A Smart 125cc tem motor 124,6cc com injeção eletrônica — um sistema mais sofisticado do que o esperado para um scooter simples e antigo desta categoria (a maioria dos concorrentes de entrada da época usava carburador). Isso trouxe partida mais consistente e menor sensibilidade a variações de combustível, mas também significa que qualquer defeito no sistema de injeção precisa de diagnóstico mais específico do que um carburador comum.',
  },
  {
    severity: 'WARN',
    title: 'Primeiras trocas de óleo em intervalos curtos: 1.000, 2.000 e 3.000 km — depois a cada 1.500 km',
    body: 'O manual de serviço oficial da Smart 125cc especifica um cronograma de rodagem incomum: primeira troca de óleo aos 1.000 km, segunda aos 2.000 km, terceira aos 3.000 km — e a partir daí, a cada 1.500 km (intervalo mais curto que a maioria das motos desta categoria). Seguir esse cronograma nos primeiros quilômetros protege o motor durante o período de acomodação das peças internas.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR7HSA: gap de 0,7-0,8 mm — troque ao primeiro sinal de depósito de carbono',
    body: 'A vela original da Smart 125cc é a NGK CR7HSA, com abertura de eletrodos especificada em 0,7-0,8 mm. O manual de serviço orienta: se houver depósito de carbono visível, não tente limpar — troque a vela diretamente. Eletrodo desgastado, isolante trincado ou fio danificado também são critérios de troca imediata.',
  },
  {
    severity: 'WARN',
    title: 'Pneus 3.50-10 sem câmara (tubeless): medida pequena com menos opções no mercado',
    body: 'A Smart 125cc usa pneus 3.50-10 tubeless nas duas rodas — uma medida de aro pequeno (10") com menos variedade de marcas disponíveis no mercado comparado aos aros 14/17 mais comuns. Ao trocar, pesquise com antecedência a disponibilidade local, já que pode ser necessário encomendar.',
  },
  {
    severity: 'OK',
    title: 'CVT: correia e roletes do variador são os itens de desgaste mais importantes',
    body: 'Como todo scooter automático, a Smart 125cc depende de correia CVT e roletes do variador para a transmissão. Aceleração "escorregada" ou arranque fraco geralmente indica correia estendida ou roletes ovalizados — inspecione a cada poucos milhares de quilômetros, já que uma correia rompida imobiliza o veículo imediatamente.',
  },
  {
    severity: 'OK',
    title: 'Lubrificação forçada por bomba trocoidal: motor mais robusto que um simples "banho de óleo"',
    body: 'Diferente de motores mais simples que dependem só de respingo, o motor da Smart 125cc tem sistema de lubrificação forçada por bomba trocoidal combinado com banho de óleo — isso melhora a distribuição de óleo para as partes internas do motor mesmo em marcha lenta prolongada, comum no trânsito urbano.',
  },
]

const SMART125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Injeção eletrônica com peças raríssimas: modelo com produção encerrada há anos',
    body: 'Por ser um scooter de entrada com produção encerrada há bastante tempo (não por a marca ter fechado, mas por ser um modelo antigo e de baixo volume), peças específicas do sistema de injeção eletrônica da Smart 125cc — como o módulo de injeção e sensores — são as mais difíceis de encontrar entre todos os componentes do veículo. Antes de comprar uma Smart 125cc usada, teste toda a partida e o funcionamento em temperatura de operação, e pergunte ao vendedor se há peças de reposição disponíveis.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT e roletes do variador: desgaste típico de scooter automático',
    body: 'Como qualquer scooter com câmbio CVT, a correia e os roletes do variador da Smart 125cc desgastam com o uso. Sinais: arranque "escorregado", ronco crescente na aceleração, queda de velocidade máxima. É item de manutenção previsível — não um defeito, mas exige inspeção periódica para não deixar quebrar em uso.',
  },
  {
    severity: 'WARN',
    title: 'Regulador de tensão: mesmo ponto fraco elétrico da linha de entrada da DAFRA',
    body: 'O regulador de tensão original da Smart 125cc compartilha a mesma fragilidade observada nos demais modelos de entrada da marca — picos de tensão acima do normal que queimam lâmpadas com frequência. Teste com multímetro na bateria a 4.000 rpm: acima de 14,8V indica regulador com defeito.',
  },
  {
    severity: 'WARN',
    title: 'Vedante da bengala dianteira (curso de 70 mm): vaza óleo após uso prolongado',
    body: 'A suspensão dianteira da Smart 125cc é um garfo telescópico simples com apenas 70 mm de curso — vedantes de vida útil limitada em uso com pavimento irregular. Manchas de óleo na parte inferior da bengala indicam necessidade de troca do retentor.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro a tambor (130 mm): ajuste periódico necessário mesmo com disco na dianteira',
    body: 'Apesar de ter freio a disco de 180 mm na dianteira (item mais moderno para a categoria), a Smart 125cc mantém tambor de 130 mm na roda traseira, que precisa de ajuste de cabo periódico para manter a eficiência de frenagem — o desgaste da lona e o esticamento do cabo reduzem a mordida gradualmente sem aviso óbvio.',
  },
]

const SMART125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Smart 125cc: scooter CVT com injeção eletrônica — respeite os intervalos curtos de rodagem',
    body: '1.000 km — Primeira troca de óleo motor. | 2.000 km — Segunda troca de óleo (rodagem). | 3.000 km — Terceira troca de óleo (rodagem). | A partir daí, a cada 1.500 km — Troca de óleo motor rotineira. | 5.000-6.000 km — Vela NGK CR7HSA (gap 0,7-0,8 mm — trocar se houver depósito de carbono). Inspecionar correia CVT e roletes do variador. | 10.000 km — Filtro de ar. Pastilhas do freio dianteiro a disco (180 mm). Lona do freio traseiro a tambor (130 mm). | 15.000 km — Fluido de freio DOT 4 (dianteiro). Correia CVT (inspecionar rachaduras — trocar se necessário). | 20.000 km — Kit de roletes do variador. Vedante da bengala dianteira (se vazando). Inspecionar regulador de tensão. | 25.000-30.000 km — Revisão geral do conjunto CVT e do sistema de injeção eletrônica.',
  },
]

// ─── BLOCKS ──────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'SUPER 100',
    yearFrom: 2008,
    yearTo: 2015,
    MACETES: SUPER100_MACETES,
    PROBLEMAS: SUPER100_PROBLEMAS,
    MANUTENCAO: SUPER100_MANUTENCAO,
  },
  {
    modelName: 'SUPER 50',
    yearFrom: 2008,
    yearTo: null,
    MACETES: SUPER50_MACETES,
    PROBLEMAS: SUPER50_PROBLEMAS,
    MANUTENCAO: SUPER50_MANUTENCAO,
  },
  {
    modelName: 'ZIG 100',
    yearFrom: 2009,
    yearTo: 2011,
    MACETES: ZIG100_MACETES,
    PROBLEMAS: ZIG100_PROBLEMAS,
    MANUTENCAO: ZIG100_MANUTENCAO,
  },
  // NOTA: 'ZIG 100+' casa também com o bloco 'ZIG 100' acima via regex \bZIG 100\b
  // (o caractere "+" é uma quebra de palavra) — as dicas de ambos os blocos se somam
  // para veículos com esse nome exato no FIPE. Ver comentário no schema/task original.
  {
    modelName: 'ZIG 100+',
    yearFrom: 2012,
    yearTo: 2016,
    MACETES: ZIG100PLUS_MACETES,
    PROBLEMAS: ZIG100PLUS_PROBLEMAS,
    MANUTENCAO: ZIG100PLUS_MANUTENCAO,
  },
  {
    modelName: 'ZIG 50',
    yearFrom: 2012,
    yearTo: null,
    MACETES: ZIG50_MACETES,
    PROBLEMAS: ZIG50_PROBLEMAS,
    MANUTENCAO: ZIG50_MANUTENCAO,
  },
  {
    modelName: 'SMART 125cc',
    yearFrom: 2010,
    yearTo: 2015,
    MACETES: SMART125_MACETES,
    PROBLEMAS: SMART125_PROBLEMAS,
    MANUTENCAO: SMART125_MANUTENCAO,
  },
]

// ─── TIRE PRESSURES ──────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'SUPER 100',
    yearFrom: 2008,
    yearTo: 2015,
    tireSize: '2,50-17 (F) · 2,75-17 (R)',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    notes: 'Rodas raiadas aro 17, freios a tambor nas duas rodas. Calibre sempre com pneu frio.',
  },
  {
    modelName: 'SUPER 50',
    yearFrom: 2008,
    yearTo: null,
    tireSize: '2,50-17 (F) · 2,75-17 (R) — estimativa por compartilhar rodas com a Super 100',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    notes: 'Valor não confirmado em fonte oficial específica — assumido igual à Super 100 por compartilhar plataforma/rodas. Confirme com o manual do seu ano/versão.',
  },
  {
    modelName: 'ZIG 100',
    yearFrom: 2009,
    yearTo: 2011,
    tireSize: '2,50-17 (F) · 2,75-17 (R)',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 33,
    rearPsiLoad: 36,
    notes: 'Rodas de liga leve aro 17, freio dianteiro a disco. Calibre sempre com pneu frio.',
  },
  {
    modelName: 'ZIG 100+',
    yearFrom: 2012,
    yearTo: 2016,
    tireSize: '2,50-17 (F) · 2,75-17 (R)',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 33,
    rearPsiLoad: 36,
    notes: 'Mesmas rodas e pneus da Zig 100 original — mudança entre as versões foi apenas visual.',
  },
  {
    modelName: 'ZIG 50',
    yearFrom: 2012,
    yearTo: null,
    tireSize: '2,50-17 (F) · 2,75-17 (R)',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 33,
    rearPsiLoad: 36,
    notes: 'Mesma medida de roda/pneu da Zig 100 (plataforma compartilhada, motor reduzido).',
  },
  {
    modelName: 'SMART 125cc',
    yearFrom: 2010,
    yearTo: 2015,
    tireSize: '3.50-10 (F) · 3.50-10 (R), tubeless',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 30,
    rearPsiLoad: 35,
    notes: 'Estimativa — fonte oficial de calibragem específica não localizada. Valores de referência para scooter de roda pequena (aro 10) tubeless; confirme com o manual do proprietário do seu ano.',
  },
]

// ─── MAINTENANCE ITEMS ────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // SUPER 100
  { modelName: 'SUPER 100', yearFrom: 2008, yearTo: 2015, component: 'Lubrificar corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 1 },
  { modelName: 'SUPER 100', yearFrom: 2008, yearTo: 2015, component: 'Óleo motor (20W50 API SF/SG JASO MA, ~0,7 L)', intervalKm: 3000, intervalMonths: 6, notes: 'Lubrifica também a embreagem centrífuga em banho de óleo', priority: 'HIGH', order: 2 },
  { modelName: 'SUPER 100', yearFrom: 2008, yearTo: 2015, component: 'Ajuste do cabo de freio (dianteiro e traseiro, tambor)', intervalKm: 3000, intervalMonths: null, notes: '10-15 mm de folga livre no acionamento', priority: 'HIGH', order: 3 },
  { modelName: 'SUPER 100', yearFrom: 2008, yearTo: 2015, component: 'Limpar filtro de ar (elemento de papel)', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'SUPER 100', yearFrom: 2008, yearTo: 2015, component: 'Vela de ignição (inspecionar/trocar)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'SUPER 100', yearFrom: 2008, yearTo: 2015, component: 'Limpar carburador PZ6-10#', intervalKm: 10000, intervalMonths: null, notes: 'Antecipar se sentir engasgo ou dificuldade de partida a frio', priority: 'MEDIUM', order: 6 },
  { modelName: 'SUPER 100', yearFrom: 2008, yearTo: 2015, component: 'Lona de freio (tambor, dianteiro e traseiro)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'SUPER 100', yearFrom: 2008, yearTo: 2015, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'SUPER 100', yearFrom: 2008, yearTo: 2015, component: 'Inspecionar regulador de tensão', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'SUPER 100', yearFrom: 2008, yearTo: 2015, component: 'Revisão geral do câmbio semiautomático', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },

  // SUPER 50
  { modelName: 'SUPER 50', yearFrom: 2008, yearTo: null, component: 'Lubrificar corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 1 },
  { modelName: 'SUPER 50', yearFrom: 2008, yearTo: null, component: 'Óleo motor (20W50 API SF/SG JASO MA, ~0,7-0,8 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'SUPER 50', yearFrom: 2008, yearTo: null, component: 'Limpar filtro de ar', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'SUPER 50', yearFrom: 2008, yearTo: null, component: 'Vela NGK CR7HSA/C7HSA (inspecionar)', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'SUPER 50', yearFrom: 2008, yearTo: null, component: 'Trocar vela + limpar carburador PZ16', intervalKm: 10000, intervalMonths: null, notes: 'Jatos finos entopem fácil com etanol de baixa qualidade', priority: 'HIGH', order: 5 },
  { modelName: 'SUPER 50', yearFrom: 2008, yearTo: null, component: 'Ajuste do freio a tambor', intervalKm: 5000, intervalMonths: null, notes: '10-15 mm de folga livre no acionamento', priority: 'HIGH', order: 6 },
  { modelName: 'SUPER 50', yearFrom: 2008, yearTo: null, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'SUPER 50', yearFrom: 2008, yearTo: null, component: 'Inspecionar vedante da bengala dianteira', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'SUPER 50', yearFrom: 2008, yearTo: null, component: 'Inspecionar regulador de tensão', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'SUPER 50', yearFrom: 2008, yearTo: null, component: 'Revisão geral do motor e câmbio semiautomático', intervalKm: 25000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },

  // ZIG 100
  { modelName: 'ZIG 100', yearFrom: 2009, yearTo: 2011, component: 'Lubrificar corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 1 },
  { modelName: 'ZIG 100', yearFrom: 2009, yearTo: 2011, component: 'Óleo motor (20W50 API SF/SG JASO MA, ~1,0 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'ZIG 100', yearFrom: 2009, yearTo: 2011, component: 'Limpar filtro de ar', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'ZIG 100', yearFrom: 2009, yearTo: 2011, component: 'Inspecionar pastilhas do freio dianteiro (disco)', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'ZIG 100', yearFrom: 2009, yearTo: 2011, component: 'Vela NGK C7HSA/CR7HSA (trocar) + limpar carburador', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'ZIG 100', yearFrom: 2009, yearTo: 2011, component: 'Inspecionar bateria selada 12V 5Ah', intervalKm: 10000, intervalMonths: 12, notes: 'Usar mantenedor de carga se a moto ficar parada por semanas', priority: 'MEDIUM', order: 6 },
  { modelName: 'ZIG 100', yearFrom: 2009, yearTo: 2011, component: 'Fluido de freio DOT 3/4 (dianteiro)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'ZIG 100', yearFrom: 2009, yearTo: 2011, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'ZIG 100', yearFrom: 2009, yearTo: 2011, component: 'Inspecionar vedante da bengala dianteira', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'ZIG 100', yearFrom: 2009, yearTo: 2011, component: 'Revisão geral do motor e câmbio semiautomático', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },

  // ZIG 100+
  { modelName: 'ZIG 100+', yearFrom: 2012, yearTo: 2016, component: 'Lubrificar corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 1 },
  { modelName: 'ZIG 100+', yearFrom: 2012, yearTo: 2016, component: 'Óleo motor (20W50 API SF/SG JASO MA, ~1,0 L)', intervalKm: 3000, intervalMonths: 6, notes: 'Mesmo cronograma da Zig 100 original — mecânica idêntica', priority: 'HIGH', order: 2 },
  { modelName: 'ZIG 100+', yearFrom: 2012, yearTo: 2016, component: 'Limpar filtro de ar', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'ZIG 100+', yearFrom: 2012, yearTo: 2016, component: 'Vela NGK C7HSA/CR7HSA (trocar) + limpar carburador', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'ZIG 100+', yearFrom: 2012, yearTo: 2016, component: 'Fluido de freio DOT 3/4 (dianteiro)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'ZIG 100+', yearFrom: 2012, yearTo: 2016, component: 'Inspecionar CDI (corte no quente = falha térmica)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'ZIG 100+', yearFrom: 2012, yearTo: 2016, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'ZIG 100+', yearFrom: 2012, yearTo: 2016, component: 'Revisão geral do motor e câmbio semiautomático', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },

  // ZIG 50
  { modelName: 'ZIG 50', yearFrom: 2012, yearTo: null, component: 'Lubrificar corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 1 },
  { modelName: 'ZIG 50', yearFrom: 2012, yearTo: null, component: 'Óleo motor (20W50 API SF/SG JASO MA, ~0,8-1,0 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'ZIG 50', yearFrom: 2012, yearTo: null, component: 'Limpar filtro de ar', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'ZIG 50', yearFrom: 2012, yearTo: null, component: 'Vela NGK CR7HSA (trocar) + limpar carburador PZ16', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'ZIG 50', yearFrom: 2012, yearTo: null, component: 'Ajuste do freio traseiro a tambor', intervalKm: 5000, intervalMonths: null, notes: '10-15 mm de folga livre no acionamento', priority: 'HIGH', order: 5 },
  { modelName: 'ZIG 50', yearFrom: 2012, yearTo: null, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'ZIG 50', yearFrom: 2012, yearTo: null, component: 'Inspecionar vedante da bengala dianteira', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'ZIG 50', yearFrom: 2012, yearTo: null, component: 'Inspecionar regulador de tensão e conectores do chicote', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'ZIG 50', yearFrom: 2012, yearTo: null, component: 'Revisão geral do motor e câmbio rotativo', intervalKm: 25000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },

  // SMART 125cc
  { modelName: 'SMART 125cc', yearFrom: 2010, yearTo: 2015, component: 'Primeira troca de óleo motor (rodagem)', intervalKm: 1000, intervalMonths: null, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'SMART 125cc', yearFrom: 2010, yearTo: 2015, component: 'Segunda troca de óleo motor (rodagem)', intervalKm: 2000, intervalMonths: null, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'SMART 125cc', yearFrom: 2010, yearTo: 2015, component: 'Terceira troca de óleo motor (rodagem)', intervalKm: 3000, intervalMonths: null, notes: 'A partir daqui, intervalo passa a ser 1.500 km', priority: 'HIGH', order: 3 },
  { modelName: 'SMART 125cc', yearFrom: 2010, yearTo: 2015, component: 'Óleo motor rotineiro', intervalKm: 1500, intervalMonths: 3, notes: 'Intervalo oficial do manual de serviço — mais curto que a maioria das motos desta categoria', priority: 'HIGH', order: 4 },
  { modelName: 'SMART 125cc', yearFrom: 2010, yearTo: 2015, component: 'Vela NGK CR7HSA (gap 0,7-0,8 mm)', intervalKm: 6000, intervalMonths: null, notes: 'Trocar imediatamente se houver depósito de carbono — não tentar limpar', priority: 'HIGH', order: 5 },
  { modelName: 'SMART 125cc', yearFrom: 2010, yearTo: 2015, component: 'Inspecionar correia CVT e roletes do variador', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'SMART 125cc', yearFrom: 2010, yearTo: 2015, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'SMART 125cc', yearFrom: 2010, yearTo: 2015, component: 'Pastilhas de freio dianteiro (disco 180 mm)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'SMART 125cc', yearFrom: 2010, yearTo: 2015, component: 'Lona de freio traseiro (tambor 130 mm)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'SMART 125cc', yearFrom: 2010, yearTo: 2015, component: 'Fluido de freio DOT 4 (dianteiro)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'SMART 125cc', yearFrom: 2010, yearTo: 2015, component: 'Correia CVT (trocar se houver rachaduras)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 11 },
  { modelName: 'SMART 125cc', yearFrom: 2010, yearTo: 2015, component: 'Kit de roletes do variador', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 12 },
  { modelName: 'SMART 125cc', yearFrom: 2010, yearTo: 2015, component: 'Revisão geral do CVT e do sistema de injeção eletrônica', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 13 },
]

// ─── RUNNER ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed DAFRA Super/Zig/Smart iniciado...')

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

  console.log('✅ Seed DAFRA Super/Zig/Smart concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
