// seed-ktm-exc-2tempos.ts — KTM EXC 2 tempos: 125, 150, 200, 250, 300 (+ Six Days), 380
// Linha de enduro/trilha 2 tempos da KTM. Gerações antigas: carburador Keihin/Mikuni + pré-mistura manual.
// Gerações modernas (2018+ na 125/150/250/300): TPI (Transfer Port Injection) — óleo injetado eletronicamente, sem pré-mistura.
// 380 EXC: produzida ~1998–2003, descontinuada, um dos maiores 2T de enduro já feitos — ainda circula usada no Brasil.
// Execute: pnpm --filter @motormacete/database db:seed:ktm-exc-2tempos
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

// ─── EXC 125 ──────────────────────────────────────────────────────────────────
// Motor: 124,8cc monocilíndrico 2T refrigerado a líquido | ~34 cv (versões carburadas antigas: ~30-33 cv)
// Carburador Keihin PWK 36 (carburada) OU TPI (2018+, injeção eletrônica de combustível + óleo injetado)
// Pré-mistura (versões carburadas): 60:1 com óleo sintético de qualidade | Vela NGK BR8EG / BR9EG
// Pneu: 90/90-21 (F) / 110/90-18 ou 120/90-18 (R) | Corrente 520 | Tanque ~8,5-9L | Peso ~98-102 kg

const EXC125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pré-mistura 60:1 (versões carburadas) — óleo sintético 2T de qualidade, nunca mineral',
    body: 'Nas versões carburadas (até ~2017), a KTM 125 EXC roda com pré-mistura manual na proporção 60:1 (aproximadamente 167mL de óleo por 10L de gasolina), usando óleo sintético 2T de alta qualidade. Motul 800 2T Factory Line (off-road) ou Motorex Cross Power 2T são as referências usadas pela própria KTM e revendedores no Brasil. NUNCA use óleo mineral barato — em motor de alta rotação como o 125cc EXC, o mineral não aguenta a temperatura e causa engripamento. Meça o óleo com seringa dosadora, não "no olho".',
  },
  {
    severity: 'OK',
    title: 'Versões TPI (2018+): óleo injetado eletronicamente — sem pré-mistura manual',
    body: 'A partir da geração 2018, a linha EXC 2T (incluindo a 125, mas essa cilindrada chegou ao TPI depois — verifique o ano exato do seu chassi) usa o sistema TPI (Transfer Port Injection): dois bicos injetores nas janelas de transferência do cilindro injetam combustível, e um reservatório separado de óleo (~0,7L, rende cerca de 5-6 tanques cheios) injeta lubrificante automaticamente na proporção correta conforme a rotação. Abasteça o tanque de óleo separado só com Motorex Cross Power 2T (ou equivalente sintético JASO FD, viscosidade ≤60 cST) — nunca gasolina misturada no tanque de combustível.',
  },
  {
    severity: 'WARN',
    title: 'Jetting por altitude: ajuste o giclê principal ao subir para a serra',
    body: 'Em versão carburada (Keihin PWK 36), o giclê principal de fábrica é calibrado para nível do mar. Subindo para altitudes acima de 800-1000m (comum em trilhas de serra no Sul e Sudeste), o ar mais rarefeito exige giclê principal menor (reduza 2-5 pontos, ex: de 168 para 165). Sintoma de jetting muito rico em altitude: fumaça preta excessiva, engasgo em alta rotação, vela encharcada. Leve um jogo de giclês Keihin sobressalentes (custam pouco, R$ 15-30 cada) se for rodar em altitudes variadas no mesmo dia.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR8EG ou BR9EG — 2T pede vela mais fria que 4T equivalente',
    body: 'A 125 EXC usa vela NGK BR8EG (gap ~0,6-0,7mm); em uso mais agressivo ou trilha muito quente, muitos preparadores recomendam a BR9EG (mais fria) para evitar pré-ignição. Iridium NGK BR8EIX é uma opção de maior durabilidade. Troque a cada 15-20 horas de uso ou ao notar dificuldade de partida a frio e perda de resposta em alta rotação — motor 2T de alta performance suja vela rápido, principalmente com jetting rico ou pré-mistura fora da proporção.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma com óleo específico — limpeza após CADA trilha',
    body: 'O filtro de espuma da 125 EXC deve ser limpo depois de todo uso em trilha (não só periodicamente). Lave com desengraxante de filtro (Motorex Bio Foam Cleaner ou similar), seque completamente e aplique óleo específico para filtro de espuma (Motorex Air Filter Oil, Bel-Ray Foam Filter Oil) — nunca óleo de motor comum, que endurece a espuma. Um filtro seco ou mal aplicado é a principal causa de entrada de poeira e desgaste prematuro do cilindro/pistão em uso off-road.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 e relação — reduza dentes da coroa para mais tração em trilha técnica',
    body: 'A 125 EXC de fábrica vem com relação equilibrada para enduro geral. Para trilha técnica e morros, muitos pilotos aumentam a coroa em +1 ou +2 dentes (mais tração em baixa, sacrificando velocidade máxima). Corrente 520 com retentor (O-ring): DID 520VX3 ou RK 520MXZ são referências. Lubrifique a cada saída de trilha — a lama e areia agridem a corrente muito mais rápido que uso urbano.',
  },
  {
    severity: 'WARN',
    title: 'Peças alternativas: pistão e anéis Wössner/Vertex/ProX são compatíveis e mais baratos',
    body: 'Pistão e anéis originais KTM são caros e às vezes têm prazo de importação longo. Marcas alternativas amplamente usadas por preparadores — Wössner (alemã, forjada), Vertex (italiana) e ProX — fabricam kits específicos para o motor 125cc EXC com a mesma medida e ótima qualidade, custando 30-50% menos. No Brasil, lojas como mxmoto.com.br e mxparts.com.br vendem esses kits prontos para entrega. Sempre informe o código do cilindro (gravado no bloco) para garantir a medida correta de reparo (STD ou 1ª/2ª oversize).',
  },
  {
    severity: 'OK',
    title: 'Escape: limpe o carbono do tubo de expansão a cada 20-30 horas',
    body: 'Motor 2T acumula carbono no tubo de expansão (silencioso/panela) e na janela de escape do cilindro. Sintoma de excesso de carbono: perda de potência em alta rotação, "engasgamento" acima de 8.000 rpm. Desmonte o tubo de expansão e raspe o carbono internamente (ou use produto decarbonizante) a cada 20-30 horas de trilha. Aproveite para verificar e limpar a janela de escape do cilindro pelo mesmo acesso, se possível sem remover o cilindro.',
  },
]

const EXC125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Desgaste acelerado de pistão em uso extremo — sinal de detonação ou jetting pobre',
    body: 'Se a moto foi usada de forma agressiva (giro alto constante, trilha em areia/poeira, jetting pobre demais), o pistão pode "engripar" (agarrar no cilindro) bem antes do intervalo normal, às vezes com menos de 20-30 horas. Sinais de alerta: perda súbita de potência, ruído metálico agudo no motor, fumaça branca excessiva. Pare imediatamente ao notar esses sintomas — continuar rodando com pistão danificado risca o cilindro e pode exigir cilindrada nova (não só reparo), custo muito mais alto.',
  },
  {
    severity: 'WARN',
    title: 'Carburador entope com sujeira de trilha — principal causa de marcha lenta irregular',
    body: 'Poeira e lama que passam pelo filtro de ar mal vedado entopem o giclê de marcha lenta do carburador Keihin PWK. Sintoma: marcha lenta que morre sozinha, dificuldade de manter baixa rotação em trilha técnica. Solução: desmontar o carburador, limpar todos os giclês com spray específico (Bardahl Carb Cleaner) e ar comprimido — nunca arame ou objeto metálico dentro dos furos calibrados. Verifique também a vedação da borracha do filtro de ar com o carburador — vazamento aqui é convite para sujeira.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trilha lenta e lamacenta — radiador sem fluxo de ar suficiente',
    body: 'Em trilha muito lenta e técnica (lama, subidas em baixa rotação), o radiador não recebe fluxo de ar suficiente e a temperatura pode subir. Sintoma: vapor saindo da tampa do radiador, perda de potência por proteção térmica. Verifique o nível do líquido de arrefecimento (mistura 50/50 com água destilada) antes de cada saída e as aletas do radiador quanto a lama compactada, que bloqueia a troca de calor — limpe com jato de água leve após cada trilha.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem escorregando após uso extremo de trilha e travessias de rio',
    body: 'A embreagem multidisco em banho de óleo é robusta, mas uso extremo (arrancadas constantes, travessias de rio que lavam o óleo/contaminam) desgasta os discos mais rápido que uso normal. Sintoma: rotação sobe sem corresponder ao ganho de velocidade, cheiro de queimado após esforço. Verifique o nível e a qualidade do óleo (óleo contaminado por água fica leitoso) e troque os discos de fricção (kit completo com discos de aço) quando a folga da alavanca não for suficiente para regular.',
  },
  {
    severity: 'WARN',
    title: 'Palheta (reed valve) rachada ou deformada — perda de potência em baixa rotação',
    body: 'As lâminas (pétalas) de fibra de carbono da palheta de admissão têm vida útil limitada e podem rachar ou perder a curvatura original com o tempo e uso intenso. Sintoma: perda de resposta em baixa/média rotação, dificuldade de manter marcha lenta, "borbulhar" no carburador ao acelerar. Inspecione a cada limpeza de carburador — as pétalas devem estar planas e sem trincas. Kits de reposição (bloco + pétalas) para o motor 125cc EXC são vendidos por Boyesen, Moto Tassinari (VForce) ou peças originais KTM.',
  },
]

const EXC125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma EXC 125 — 2T se mede por HORAS de uso, não só km',
    body: 'Para motores 2T de enduro, o desgaste está mais ligado às horas de motor em giro alto do que à distância percorrida (uso de trilha tem médias baixas de km/h mas rotação constante). Use um horímetro (a maioria das EXC modernas já vem com um no painel). A cada uso — limpar/reoleificar filtro de ar. 5-10h — verificar/trocar vela, limpar carburador (versão carburada) ou verificar código de erro TPI. 15-20h — trocar óleo da caixa de câmbio (não é óleo de motor: 2T não mistura óleo no cárter, exceto lubrificação por pré-mistura/TPI). 20-30h — decarbonizar tubo de escape, inspecionar janela de escape do cilindro. 40-60h — inspeção de pistão/anéis (trocar se desgaste visível ou folga excessiva no anel). 60-100h — reforma preventiva do pistão mesmo sem sintomas, em uso de trilha regular. Suspensão dianteira (óleo do garfo): a cada 20-25h de trilha pesada ou 50h de uso misto. Suspensão traseira (amortecedor): revisão completa a cada 60-100h. Sempre reaperte parafusos do motor e chassi após as primeiras horas de uma moto nova ou pós-reforma.',
  },
]

// ─── EXC 150 ──────────────────────────────────────────────────────────────────
// Motor: 143,99cc monocilíndrico 2T refrigerado a líquido | ~38 cv
// Carburador Keihin PWK 36 (carburada) ou TPI (2018+) | Pré-mistura 60:1 | Vela NGK BR8EG
// Pneu: 90/90-21 (F) / 110/100-18 (R) | Corrente 520 | Tanque ~9L

const EXC150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Meio-termo entre 125 e 250: pré-mistura 60:1 com óleo sintético premium',
    body: 'A 150 EXC (motor 143,99cc) é um "meio-termo" entre a 125 (mais leve de giro) e a 200/250 (mais torque). Pré-mistura 60:1 com Motul 800 2T Factory Line ou Motorex Cross Power 2T é a recomendação padrão para uso de trilha. Em uso competitivo/exigente, alguns preparadores usam 50:1 para mais margem de segurança térmica, ao custo de um pouco mais de fumaça e resíduo. Sempre misture em recipiente calibrado antes de abastecer — nunca despeje óleo e gasolina separadamente no tanque.',
  },
  {
    severity: 'OK',
    title: 'TPI (gerações modernas): óleo injetado + jetting eletrônico ajustado por altitude automaticamente',
    body: 'Nas versões TPI (2018+), a ECU ajusta automaticamente a mistura de combustível conforme altitude e temperatura — praticamente elimina o trabalho manual de jetting que a versão carburada exige. O tanque de óleo separado (~0,7L) deve ser reabastecido só com óleo sintético JASO FD (Motorex Cross Power 2T). Fique atento à luz de aviso de nível de óleo no painel — rodar seco de óleo em modelo TPI destrói o motor rapidamente, já que não há reserva de lubrificação por pré-mistura.',
  },
  {
    severity: 'WARN',
    title: 'Jetting: giclê principal e agulha ajustam a resposta em alta rotação',
    body: 'No carburador Keihin PWK 36 da 150 EXC carburada, o giclê principal padrão (aprox. 168-172, varia por ano) atende nível do mar com boa margem. Para trilhas em altitude (serra, planalto) ou clima muito quente, reduza 2-4 pontos no giclê principal para evitar mistura rica excessiva. A agulha (posição do clipe) ajusta a resposta em 1/4 a 3/4 de abertura — suba um entalhe se sentir "buraco" na aceleração progressiva.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR8EG gap 0,6-0,7mm — troque cedo, 2T suja vela rápido',
    body: 'Vela recomendada: NGK BR8EG (equivalente Denso W24EPR-U). Em uso de trilha pesada com pré-mistura fora da proporção ideal ou jetting rico, a vela pode sujar em poucas horas. Leve sempre uma vela sobressalente na bolsa de ferramentas — é a causa mais comum de "moto morreu no meio do mato" e a troca leva menos de 5 minutos.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma — Twin Air ou original, sempre com óleo específico',
    body: 'O filtro Twin Air (referência de mercado para motocross/enduro, disponível no Brasil via mxmoto.com.br e outras lojas especializadas) é uma alternativa popular ao filtro original, com boa vedação e fácil manutenção. Aplique óleo específico para filtro de espuma (Motorex, Bel-Ray, Twin Air próprio) — a espuma seca ou com óleo de motor comum não veda partículas finas de poeira, principal causa de desgaste prematuro do cilindro.',
  },
  {
    severity: 'OK',
    title: 'Corrente e relação: DID ou RK com O-ring aguentam mais barro e água',
    body: 'Para uso intenso em trilha com travessia de rios e lama, prefira correntes 520 com retentor (O-ring ou X-ring) como DID 520VX3 ou RK 520MXZ4 — a vedação interna retém a graxa mesmo após lavagem com água/lama. Correntes sem retentor (mais baratas) exigem lubrificação muito mais frequente. Lubrifique a corrente a cada saída de trilha, sempre com a corrente ainda morna (poros abertos absorvem melhor o lubrificante).',
  },
  {
    severity: 'WARN',
    title: 'Peças alternativas: cilindro/pistão e kit de anéis genéricos custam bem menos',
    body: 'Peças originais KTM para o motor 150cc EXC podem ter fila de importação. Kits de pistão e anéis Wössner, Vertex e ProX são amplamente compatíveis e vendidos prontos no Brasil (mxmoto.com.br, mxparts.com.br). Considerando que o motor 150 EXC compartilha muita arquitetura com o 125/144cc de motocross (150 SX), peças de reparo do cilindro às vezes têm equivalência entre os dois — sempre confirme a medida exata (código do cilindro) antes de comprar.',
  },
]

const EXC150_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Detonação por jetting pobre ou pré-mistura errada danifica pistão rapidamente',
    body: 'O motor 150cc EXC gira em rotações altas e é sensível a mistura pobre (giclê pequeno demais) ou pré-mistura com proporção errada de óleo (pouco óleo = menos lubrificação e mais calor). Detonação prolongada risca o pistão e pode causar apreensão total do motor em poucas horas de uso. Sintomas de alerta: ruído metálico agudo, perda de potência súbita, pistão "batendo" em alta rotação. Ao notar qualquer sintoma, pare o motor imediatamente e verifique jetting e proporção de óleo antes de continuar.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de carburador por sujeira de trilha — problema recorrente em uso extremo',
    body: 'Poeira fina que passa por um filtro de ar mal vedado ou seco entope os giclês pequenos (marcha lenta, agulha) do carburador Keihin. Sintoma: marcha lenta oscilante, engasgo ao acelerar suavemente. Solução: limpeza completa do carburador com spray específico e verificação da vedação do filtro de ar. Prevenção: trocar o óleo do filtro de espuma a cada saída e verificar a vedação da caixa do filtro.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trilha lamacenta ou subidas longas em baixa velocidade',
    body: 'Sem fluxo de ar suficiente pelo radiador em trechos muito lentos, a temperatura pode subir rapidamente. Sintoma: vapor pela tampa do radiador, perda de potência protetiva. Verifique nível de líquido de arrefecimento (mistura com água destilada) antes de cada saída e limpe lama compactada nas aletas do radiador após o uso.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem escorregando após esforço prolongado em subidas técnicas',
    body: 'Uso intenso em subidas técnicas (embreagem "arrastada" para controlar tração) desgasta os discos de fricção mais rápido que uso de estrada. Sintoma: rotação sobe sem ganho proporcional de velocidade, cheiro de queimado. Verifique o nível e estado do óleo da transmissão e troque os discos de fricção quando a folga de regulagem da alavanca não for mais suficiente.',
  },
  {
    severity: 'WARN',
    title: 'Palheta de admissão com pétalas trincadas — perda de resposta em baixa rotação',
    body: 'As pétalas de fibra de carbono da palheta desgastam com o tempo e uso intenso, perdendo a curvatura ideal ou trincando. Sintoma: falta de resposta em baixa/média rotação, dificuldade de manter marcha lenta estável. Inspecione durante a limpeza do carburador — pétalas com trincas visíveis ou empenadas devem ser substituídas (kits Boyesen, VForce ou originais KTM).',
  },
]

const EXC150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma EXC 150 — por horas de uso, complementado por quilometragem em uso rodoviário',
    body: 'A cada uso — limpar e reoleificar filtro de ar de espuma. 10h — verificar vela, limpar carburador (versão carburada) ou checar diagnóstico TPI. 15-20h — trocar óleo da caixa de câmbio. 20-30h — decarbonizar tubo de expansão do escape e verificar janela de escape do cilindro. 40-60h — inspecionar desgaste de pistão e anéis (folga da ponta do anel fora da especificação = trocar). 60-100h — reforma preventiva do kit pistão/anéis mesmo sem sintomas evidentes em uso regular de trilha. Suspensão dianteira: óleo do garfo a cada 20-25h (trilha pesada) ou 50h (uso misto). Suspensão traseira: revisão do amortecedor a cada 60-100h. Palheta de admissão: inspeção a cada limpeza de carburador (10-15h). Líquido de arrefecimento: troca a cada 12 meses ou 100h.',
  },
]

// ─── EXC 200 ──────────────────────────────────────────────────────────────────
// Motor: 193,3cc monocilíndrico 2T refrigerado a líquido | ~38-42 cv @ 8.700 rpm
// Carburador Keihin PWK 38 AG | Bore x Stroke 64 x 60mm | Pré-mistura 60:1 | Vela NGK BR8EG
// Pneu: 90/90-21 (F) / 120/90-18 (R) | Embreagem multidisco em banho de óleo hidráulica

const EXC200_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pré-mistura 60:1 — cilindrada intermediária que entrega bom torque com leveza de giro',
    body: 'A 200 EXC (193,3cc, bore 64mm x stroke 60mm) usa pré-mistura 60:1 com óleo sintético 2T de qualidade (Motul 800 2T Factory Line ou Motorex Cross Power 2T). É uma cilindrada "escondida" muito querida por pilotos de trilha técnica: menos peso de giro que a 250, mas mais torque que a 125/150. Nunca foi lançada em versão TPI — toda a linha 200 EXC permanece carburada (Keihin PWK 38 AG) até sua descontinuação em alguns mercados.',
  },
  {
    severity: 'WARN',
    title: 'Jetting Keihin PWK 38 AG: giclê principal e ar afetam resposta em alta',
    body: 'O carburador Keihin PWK 38 AG da 200 EXC responde bem a ajuste fino de jetting. Para trilha em altitude (acima de 800-1000m), reduza o giclê principal em 3-5 pontos. Para climas muito quentes (acima de 30°C), considere reduzir também o giclê de ar ou aumentar levemente o giclê piloto para compensar a mistura mais pobre naturalmente causada pelo ar quente e rarefeito. Jogo de giclês Keihin sobressalentes: R$ 15-30 cada, valem a pena levar na bolsa de ferramentas.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR8EG — equivalentes e opção iridium para mais durabilidade',
    body: 'Vela padrão: NGK BR8EG, gap 0,6-0,7mm. Iridium NGK BR8EIX é compatível e dura consideravelmente mais em uso normal, embora em uso muito agressivo de trilha (jetting rico, pré-mistura imprecisa) a vantagem de durabilidade diminua. Custo da BR8EG convencional: R$ 20-35. Troque preventivamente a cada 15-20 horas de trilha.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma: vedação é mais importante que a marca',
    body: 'Filtro original KTM ou Twin Air (ambos disponíveis no Brasil) funcionam bem — o ponto crítico é a vedação completa contra a caixa do filtro. Aplique óleo específico para espuma (nunca óleo de motor comum) e verifique se não há folga entre a espuma e a caixa: mesmo uma pequena brecha permite entrada de poeira fina que desgasta o cilindro rapidamente.',
  },
  {
    severity: 'OK',
    title: 'Corrente e relação: ajuste a coroa conforme o tipo de trilha',
    body: 'Para trilha técnica e morros pesados, aumentar a coroa em +1 ou +2 dentes melhora a tração em baixa rotação. Para trilhas mais rápidas e abertas, a relação de fábrica é adequada. Use corrente 520 com O-ring (DID 520VX3, RK 520MXZ4) para maior durabilidade em condições de lama e água. Lubrifique a cada saída.',
  },
  {
    severity: 'WARN',
    title: 'Peças alternativas: pistão/anéis Wössner, Vertex e ProX cobrem o motor 200cc',
    body: 'O motor 193,3cc da 200 EXC tem boa disponibilidade de peças alternativas de reparo — Wössner (forjado, alemão), Vertex (italiano) e ProX fabricam kits específicos vendidos no Brasil por mxmoto.com.br e mxparts.com.br a preços 30-50% menores que peças originais KTM, com qualidade equivalente para uso recreativo e até competitivo amador.',
  },
  {
    severity: 'OK',
    title: 'Embreagem hidráulica multidisco: verifique fluido e desgaste dos discos',
    body: 'A 200 EXC usa embreagem multidisco em banho de óleo com acionamento hidráulico (não por cabo) em gerações mais recentes. Verifique o nível do fluido do reservatório da embreagem periodicamente — fluido baixo ou com ar no sistema causa acionamento "esponjoso" ou embreagem que não desengata totalmente. Sangre o sistema (bleed) se notar folga excessiva na alavanca ou dificuldade de trocar marchas.',
  },
]

const EXC200_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Desgaste de pistão por detonação em jetting pobre ou pré-mistura fraca',
    body: 'Assim como toda a linha 2T EXC, a 200 é vulnerável a detonação se o jetting estiver pobre (giclê pequeno) ou a pré-mistura tiver pouco óleo. Sintomas: ruído metálico agudo, perda súbita de potência, fumaça branca excessiva. Ao notar qualquer sinal, pare imediatamente — continuar rodando risca o cilindro e pode transformar um simples reparo de pistão em troca de cilindro inteiro.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento do carburador Keihin PWK por sujeira fina de trilha',
    body: 'Poeira que passa por filtro de ar mal vedado entope os giclês pequenos do PWK 38 AG. Sintoma: marcha lenta oscilante, dificuldade de manter baixa rotação em trechos técnicos. Limpe o carburador com spray específico e ar comprimido, verificando toda a vedação do filtro de ar antes de remontar.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trilha lenta e lamacenta',
    body: 'Trechos muito lentos reduzem o fluxo de ar pelo radiador. Sintoma: vapor pela tampa do radiador, perda de potência. Verifique o nível do líquido de arrefecimento antes de cada saída e limpe lama compactada nas aletas do radiador regularmente.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem escorregando em uso extremo ou após travessia de rios',
    body: 'Travessias de água podem contaminar o óleo da embreagem/transmissão, deixando-o leitoso e reduzindo a capacidade de fricção dos discos. Sintoma: rotação sobe sem ganho de velocidade correspondente. Troque o óleo imediatamente após qualquer travessia significativa e inspecione os discos de fricção.',
  },
  {
    severity: 'WARN',
    title: 'Palheta com pétalas desgastadas — perda de resposta em baixa/média rotação',
    body: 'As pétalas de carbono da palheta de admissão perdem a curvatura ou trincam com uso intenso. Sintoma: falta de resposta ao acelerar suavemente, dificuldade de marcha lenta estável. Inspecione durante a limpeza do carburador e substitua quando notar trincas ou deformação visível.',
  },
]

const EXC200_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma EXC 200 — intervalo por horas de motor, típico de 2T de enduro',
    body: 'A cada uso — limpar e reoleificar filtro de ar. 10-15h — verificar/trocar vela, limpar carburador. 15-20h — trocar óleo da caixa de câmbio. 20-30h — decarbonizar tubo de expansão e verificar janela de escape do cilindro. 40-60h — inspecionar pistão e anéis quanto a desgaste (folga da ponta do anel). 60-100h — reforma preventiva do kit pistão/anéis. Suspensão dianteira: óleo do garfo a cada 20-25h (trilha pesada) ou 50h (uso misto). Suspensão traseira: revisão do amortecedor a cada 60-100h. Palheta: inspeção a cada limpeza de carburador. Fluido da embreagem hidráulica: verificação a cada 20h, troca anual. Líquido de arrefecimento: troca anual ou a cada 100h.',
  },
]

// ─── EXC 250 ──────────────────────────────────────────────────────────────────
// Motor: 249cc monocilíndrico 2T refrigerado a líquido | ~45-50 cv | Bore x Stroke 66,4 x 72mm (aprox.)
// Carburador Mikuni TMX ou Keihin (carburada) / TPI (2018+) | Pré-mistura 50-60:1 | Vela NGK BR7ES / BR8ECM (TPI)
// Pneu: 90/90-21 (F) / 140/80-18 (R) | Uma das cilindradas mais populares em enduro mundial

const EXC250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pré-mistura 50:1 a 60:1 (versão carburada) — a proporção mais debatida entre os pilotos de 250',
    body: 'A KTM 250 EXC carburada aceita tanto 50:1 quanto 60:1 dependendo do manual/ano e do óleo usado — com Motorex Cross Power 2T ou Motul 800 2T Factory Line (ambos sintéticos de alta qualidade), 60:1 é seguro para uso normal de trilha. Para uso mais exigente (competição, calor extremo, giro constante em alta rotação), muitos preparadores recomendam voltar para 50:1 por margem de segurança térmica extra. Regra prática: na dúvida, prefira 50:1 — o custo extra de óleo é insignificante perto do risco de um motor fundido.',
  },
  {
    severity: 'OK',
    title: 'TPI (2018+): tanque de óleo separado com proporção eletrônica em torno de 80:1',
    body: 'Nas versões TPI da 250 EXC, o óleo é injetado eletronicamente pela ECU numa proporção média de aproximadamente 80:1 (mais econômica que a pré-mistura manual, pois a injeção é mais eficiente e precisa). O reservatório de óleo (~0,7L) dura cerca de 5-6 tanques de combustível cheios. Use exclusivamente óleo sintético JASO FD recomendado pela KTM (Motorex Cross Power 2T) — não abasteça esse tanque com qualquer outro óleo 2T genérico sem confirmar a especificação JASO FD.',
  },
  {
    severity: 'WARN',
    title: 'Jetting Mikuni TMX / Keihin: ajuste fino é essencial para aproveitar o motor 250',
    body: 'O jetting de fábrica da 250 EXC carburada costuma vir levemente rico de fábrica (para segurança em garantia). Jetting típico relatado pela comunidade (ano 2017, nível do mar): agulha na posição de clipe intermediária, giclê principal por volta de 450, giclê piloto por volta de 40 — mas isso varia MUITO por ano/mercado, então trate como ponto de partida e ajuste observando a cor da vela (marrom claro é ideal; preto/fuligem = rico demais; branco/cinza claro = pobre demais). Reduza o giclê principal em 3-5 pontos ao subir de altitude.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR7ES (carburada) — mais quente que a BR8; 2T de alta cilindrada dissipa calor diferente',
    body: 'A 250 EXC carburada geralmente usa NGK BR7ES como padrão (versão mais recente pode variar) — mais "quente" na numeração que a BR8 usada em cilindradas menores, já que o motor maior tem características de dissipação de calor distintas. Sempre confirme a vela recomendada no manual do ano/versão específica da sua moto antes de trocar, pois isso varia mais nesta cilindrada do que nas menores. Gap: 0,6-0,7mm.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: Twin Air ou original, com atenção redobrada — motor 250 puxa mais ar',
    body: 'Com mais deslocamento e potência, a 250 EXC processa mais ar por ciclo — qualquer folha ou vedação imperfeita no filtro compromete rapidamente o cilindro. Use filtro Twin Air ou original bem oleificado (óleo específico Motorex/Bel-Ray) e verifique a vedação da caixa a cada limpeza. Leve um filtro sobressalente já preparado para trocar em trilhas longas.',
  },
  {
    severity: 'OK',
    title: 'Peças no Brasil: 250 EXC é a cilindrada com MAIS opções de peças alternativas',
    body: 'Por ser uma das cilindradas mais populares mundialmente em enduro, a 250 EXC tem a maior disponibilidade de peças alternativas no Brasil entre toda a linha EXC 2T. Pistão/anéis Wössner, Vertex, ProX; embreagem Hinson ou original; corrente DID/RK — tudo encontrado com facilidade em mxmoto.com.br, mxparts.com.br e Mercado Livre, muitas vezes com pronta entrega nacional (sem espera de importação).',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 com O-ring — relação de fábrica é bem equilibrada para uso geral',
    body: 'A relação de fábrica da 250 EXC atende bem tanto trilha técnica quanto enduro mais rápido. Para provas de motocross misto ou hard enduro extremo, considerar +1 dente na coroa para mais tração em baixa. Corrente recomendada: DID 520VX3 ou RK 520MXZ4 (com retentor). Lubrifique a cada saída, especialmente após lama ou travessias de água.',
  },
]

const EXC250_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Detonação e engripamento de pistão — o problema mais caro e mais evitável da linha 2T',
    body: 'Jetting pobre demais, pré-mistura com pouco óleo ou giro constante em alta rotação sob calor extremo levam à detonação, que pode engripar o pistão no cilindro em minutos. Sintomas: ruído metálico agudo repentino, perda de potência abrupta, motor "trava" ao tentar acelerar. PARE imediatamente ao notar qualquer sintoma — insistir transforma um reparo de R$ 800-1.500 (pistão/anéis) em um cilindro riscado que exige usinagem ou substituição completa (R$ 3.000+).',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de carburador por sujeira de trilha — sintoma clássico de marcha lenta instável',
    body: 'Poeira fina que passa por vedação imperfeita do filtro de ar entope os giclês de marcha lenta e progressão do carburador. Sintoma: moto morre em marcha lenta, engasga ao acelerar suavemente em trilha técnica. Limpeza completa do carburador com spray específico resolve — mas a causa raiz quase sempre é vedação de filtro de ar comprometida, verifique e corrija também.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trilha lenta e lamacenta',
    body: 'Trechos técnicos muito lentos reduzem o fluxo de ar pelo radiador, elevando a temperatura do motor. Sintoma: vapor pela tampa do radiador, perda de potência protetiva (em versões com sensor). Verifique nível de líquido de arrefecimento antes de cada saída e mantenha as aletas do radiador livres de lama compactada.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem escorregando em uso extremo ou competição',
    body: 'Uso competitivo ou trilha muito exigente (arrancadas constantes, embreagem "arrastada" em subidas técnicas) desgasta os discos de fricção mais rápido. Sintoma: rotação sobe sem ganho de velocidade correspondente, cheiro de queimado. Verifique óleo da transmissão e inspecione/troque discos de fricção — kits Hinson ou originais KTM são as referências de mercado.',
  },
  {
    severity: 'WARN',
    title: 'Palheta com pétalas trincadas — perda de torque em baixa rotação',
    body: 'As pétalas de carbono da palheta de admissão trincam ou perdem curvatura com uso intenso e alta rotação frequente. Sintoma: falta de torque em baixa/média rotação, "borbulhar" perceptível no carburador. Inspecione durante a limpeza do carburador (a cada 10-15h) e substitua ao notar qualquer trinca — kits Boyesen, VForce3 ou originais KTM.',
  },
]

const EXC250_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma EXC 250 — referência da linha, cilindrada com uso mais documentado',
    body: 'A cada uso — limpar e reoleificar filtro de ar. 10-15h — verificar/trocar vela, limpar carburador (versão carburada) ou verificar diagnóstico TPI. 15-20h — trocar óleo da caixa de câmbio (2T não usa óleo no cárter para lubrificação do motor, apenas para a transmissão). 20-30h — decarbonizar tubo de expansão e verificar janela de escape. 40-60h — inspecionar desgaste do pistão e anéis (medir folga da ponta do anel com apalpador). 60-100h — reforma preventiva do kit pistão/anéis, mesmo sem sintomas, em uso de trilha regular; competidores costumam trocar a cada 20-30h. Suspensão dianteira: óleo do garfo a cada 20-25h (trilha pesada/competição) ou 50h (uso recreativo). Suspensão traseira: revisão do amortecedor a cada 60-100h. Palheta: inspeção a cada 10-15h. Líquido de arrefecimento: troca anual ou a cada 100h.',
  },
]

// ─── EXC 300 (inclui edição Six Days) ────────────────────────────────────────
// Motor: 293,2cc monocilíndrico 2T refrigerado a líquido | ~55-58 cv | A "rainha" do enduro 2T mundial
// Carburador Keihin PWK / Mikuni TMX (carburada) ou TPI (2018+) | Pré-mistura 50-60:1 | Vela NGK BR7ES / BR8ECM
// Pneu: 90/90-21 (F) / 140/80-18 (R) | Edição Six Days: suspensão Factory, grafismos, peças em alumínio/CNC

const EXC300_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'A "rainha" do enduro 2T: torque generoso permite pré-mistura 60:1 sem sacrificar durabilidade',
    body: 'A 300 EXC (293,2cc) é considerada por muitos enduristas a melhor cilindrada 2T já feita para trilha — combina leveza de um 2T com torque comparável a 4T maiores. Pré-mistura recomendada: 60:1 com óleo sintético de alta qualidade (Motorex Cross Power 2T, Motul 800 2T Factory Line). Como entrega torque em rotações mais baixas que a 250, o motor trabalha com menos estresse térmico proporcional — mas isso NÃO é desculpa para negligenciar a proporção de óleo ou usar óleo mineral barato.',
  },
  {
    severity: 'OK',
    title: 'TPI (2018+): a versão mais popular da linha atualmente — óleo injetado, sem pré-mistura',
    body: 'A 300 EXC TPI injeta combustível eletronicamente (dois bicos nas janelas de transferência) e também injeta óleo automaticamente de um reservatório separado (~0,7L, cerca de 5-6 tanques de autonomia), numa proporção que varia com a rotação mas gira em torno de 80:1 em média. Use exclusivamente Motorex Cross Power 2T (JASO FD, viscosidade ≤60 cST) no tanque de óleo. A grande vantagem do TPI na 300: ajuste automático de mistura por altitude e temperatura, eliminando praticamente todo o trabalho manual de jetting que a versão carburada exige.',
  },
  {
    severity: 'OK',
    title: 'Edição Six Days: suspensão Factory, grafismos exclusivos e peças premium — vale o investimento extra?',
    body: 'A edição especial "Six Days" da 300 EXC (celebrando o histórico da KTM no International Six Days Enduro) traz suspensão com ajustes específicos de fábrica (garfo WP XACT com calibração Factory, amortecedor WP XPLOR PDS com ajuste de compressão por clique manual), quadro na cor laranja brilhante, rodas GIANT de liga com cubos usinados em CNC, protetor de quadro, banco específico, disco de freio dianteiro semi-flutuante, pneus Metzeler 6 Days Extreme e componentes CNC anodizados em laranja (talas de direção, saca-eixo). Para uso competitivo sério ou quem valoriza acabamento e suspensão pronta de fábrica sem precisar de setup adicional, a diferença de preço costuma compensar. Para uso recreativo, a EXC 300 padrão entrega 90% do desempenho por um custo bem menor.',
  },
  {
    severity: 'WARN',
    title: 'Jetting (versão carburada): giro mais baixo exige giclê principal proporcionalmente maior',
    body: 'Por trabalhar em rotações médias mais baixas com mais torque por explosão, a 300 EXC carburada tende a precisar de giclê principal um pouco mais generoso que a 250 na mesma marca de carburador. Jetting é sempre específico de altitude/temperatura/altitude — trate qualquer configuração encontrada em fóruns como ponto de partida, nunca como valor definitivo. Observe a cor da vela após uso em trilha: marrom claro é ideal.',
  },
  {
    severity: 'OK',
    title: 'Vela: 2T de maior cilindrada dissipa calor diferente — confirme grau térmico no manual do ano',
    body: 'A faixa de vela recomendada (NGK BR7ES ou similar, variando por ano/versão) precisa ser confirmada no manual específico do seu chassi, já que a 300 tem histórico de recomendações variadas entre gerações. Gap padrão: 0,6-0,7mm. Leve sempre uma sobressalente — é a peça mais barata e mais comum de causar parada em trilha.',
  },
  {
    severity: 'OK',
    title: 'Peças no Brasil: alta disponibilidade por ser a cilindrada mais popular da linha',
    body: 'Sendo a 300 EXC a cilindrada mais vendida e mais desejada entre enduristas, a disponibilidade de peças alternativas no Brasil é excelente. Pistão/anéis Wössner, Vertex, ProX; discos de embreagem Hinson; correntes DID/RK — tudo com pronta entrega em mxmoto.com.br, mxparts.com.br e Mercado Livre, muitas vezes até peças específicas para a versão Six Days (grafismos, protetores).',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar e corrente: mesma disciplina das demais EXC, mas com folga de torque maior',
    body: 'Filtro de espuma (Twin Air ou original) com óleo específico, limpeza após cada trilha. Corrente 520 com O-ring (DID 520VX3, RK 520MXZ4), lubrificação a cada saída. A relação de fábrica da 300 já é calibrada para o torque generoso do motor — poucos pilotos alteram a coroa, diferente da 125/150 onde ajustar dentes é mais comum.',
  },
]

const EXC300_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Detonação/engripamento — mesmo risco da linha, mitigado por torque em rotação mais baixa',
    body: 'Embora a 300 trabalhe em rotações médias mais baixas (menos estresse térmico por ciclo comparado à 250 no limite), jetting pobre ou pré-mistura fraca ainda causam detonação e podem engripar o pistão. Sintomas: ruído metálico agudo, perda súbita de potência. Pare imediatamente ao notar qualquer sinal — o custo de reparo do pistão é muito menor que o de um cilindro riscado.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de carburador por sujeira de trilha (versão carburada)',
    body: 'Poeira fina que passa por filtro de ar mal vedado entope giclês pequenos do carburador. Sintoma: marcha lenta instável, engasgo ao acelerar suavemente. Limpeza completa do carburador e verificação da vedação do filtro resolvem a maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trilha lenta e lamacenta',
    body: 'Trechos muito lentos e técnicos reduzem o fluxo de ar pelo radiador. Sintoma: vapor pela tampa do radiador, perda de potência protetiva. Verifique nível de líquido de arrefecimento e mantenha as aletas do radiador livres de lama compactada.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem escorregando em uso extremo — o torque maior da 300 exige discos em bom estado',
    body: 'O torque superior da 300 exige mais dos discos de embreagem em subidas técnicas com embreagem "arrastada". Sintoma: rotação sobe sem ganho de velocidade correspondente, cheiro de queimado. Verifique óleo da transmissão regularmente e troque discos de fricção (Hinson ou originais) quando a folga de regulagem não for mais suficiente.',
  },
  {
    severity: 'WARN',
    title: 'Palheta com pétalas desgastadas — perda de resposta em baixa rotação',
    body: 'Pétalas de carbono da palheta de admissão trincam ou deformam com uso intenso. Sintoma: falta de resposta em baixa rotação, "borbulhar" no carburador. Inspecione durante limpeza do carburador e substitua ao notar trincas (kits Boyesen, VForce3 ou originais KTM).',
  },
]

const EXC300_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma EXC 300 (inclui Six Days) — por horas de motor, mesma disciplina da linha 2T premium',
    body: 'A cada uso — limpar e reoleificar filtro de ar. 10-15h — verificar/trocar vela, limpar carburador (versão carburada) ou checar diagnóstico TPI. 15-20h — trocar óleo da caixa de câmbio. 20-30h — decarbonizar tubo de expansão e verificar janela de escape do cilindro. 40-60h — inspecionar desgaste do pistão e anéis. 60-100h — reforma preventiva do kit pistão/anéis; uso competitivo reduz esse intervalo para 20-30h. Suspensão dianteira (garfo WP XACT, ou Factory na versão Six Days): óleo a cada 20-25h (trilha pesada) ou 50h (uso misto) — a versão Six Days já vem calibrada de fábrica mas segue o mesmo intervalo de manutenção. Suspensão traseira (amortecedor WP XPLOR PDS): revisão completa a cada 60-100h. Palheta: inspeção a cada 10-15h. Líquido de arrefecimento: troca anual ou a cada 100h.',
  },
]

// ─── EXC 380 ──────────────────────────────────────────────────────────────────
// Motor: 368cc monocilíndrico 2T refrigerado a líquido, admissão por palheta no cárter | ~54 cv estimados
// Produzida ~1998-2003 — descontinuada, mas ainda encontrada usada no Brasil. Um dos maiores 2T de enduro já feitos.
// Carburador Keihin PWK 38 AG | Pré-mistura 1:40 a 1:60 com óleo sintético premium | Vela NGK BR8ECM, gap 0,6mm
// Pneu: 90/90-21 (F) / 140/80-18 (R) | Peso seco ~109 kg | Tanque 9,5-12L

const EXC380_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pré-mistura 1:40 a 1:60 — moto antiga exige óleo sintético premium sem exceção',
    body: 'A 380 EXC (368cc, um dos maiores 2T de enduro já produzidos) aceita proporção de 1:40 a 1:60 conforme o manual original, dependendo do óleo usado. Como é uma moto com 20+ anos de fabricação, NUNCA use óleo mineral ou semissintético genérico — apenas óleo sintético premium de qualidade atual (Motul 800 2T Factory Line, Motorex Cross Power 2T). Em uso mais leve/lazer, 1:50 é um bom meio-termo; para uso mais puxado, prefira 1:40 para maior margem de segurança térmica no motor grande.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Keihin PWK 38 AG: peças de reparo (kit de reparo, boia) podem exigir busca em fóruns/importação',
    body: 'Sendo uma moto descontinuada há mais de 20 anos, encontrar kit de reparo original do carburador Keihin PWK 38 AG no Brasil pode exigir paciência. Kits de reparo genéricos Keihin PWK (usados em várias motos de motocross/enduro da época) frequentemente servem — pesquise por "kit reparo Keihin PWK 38" em lojas de peças para motocross. Fóruns como ThumperTalk e grupos de KTM antigas no Facebook têm indicações valiosas de compatibilidade.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR8ECM gap 0,6mm — confirme com o manual, pois a numeração de vela variou entre anos',
    body: 'A vela de referência para a 380 EXC é a NGK BR8ECM (gap 0,6mm) segundo especificações de época, mas sempre confirme no manual do ano específico do seu chassi, já que a KTM ajustou recomendações de vela ao longo da produção 1998-2003. Equivalentes aproximados: Denso W24EP-U. Leve sempre vela sobressalente.',
  },
  {
    severity: 'WARN',
    title: 'Peças de motor: pistão/anéis genéricos ou de desmonte — moto rara exige planejamento',
    body: 'Por ser uma moto fora de linha há duas décadas, peças originais de motor (pistão, anéis, junta) são escassas e caras quando encontradas. Marcas como Wössner, Vertex e ProX historicamente fabricaram kits para o motor 368cc EXC — verifique disponibilidade atual em mxmoto.com.br, mxparts.com.br ou importadores especializados em peças de motocross vintage/clássico. Desmontes e Mercado Livre são fontes alternativas para peças de acabamento e elétrica.',
  },
  {
    severity: 'OK',
    title: 'Suspensão WP: 50mm invertida (dianteira) e PDS (traseira) — revisão completa é mandatória em moto usada',
    body: 'A 380 EXC usa garfo WP Extreme invertido de 50mm (280mm de curso) e amortecedor WP PDS (320mm de curso). Em moto com essa idade, é essencial fazer revisão completa da suspensão antes de qualquer uso intenso — troca de óleo do garfo, retentores, e verificação do amortecedor traseiro (vedação e nitrogênio). Oficinas especializadas em suspensão off-road (não genéricas) são a melhor opção para esse serviço em moto de coleção/vintage.',
  },
  {
    severity: 'OK',
    title: 'Ignição KOKUSAN 2K-2: componentes elétricos de época podem precisar de substituição preventiva',
    body: 'O sistema de ignição KOKUSAN 2K-2 da 380 EXC, com 20+ anos, pode apresentar falhas por fadiga de componentes eletrônicos (CDI, bobina). Se a moto tiver histórico de falhas intermitentes de ignição, considere substituição preventiva do CDI — modelos genéricos compatíveis com KOKUSAN 2K-2 circulam em fóruns e lojas especializadas em motos KTM clássicas.',
  },
  {
    severity: 'OK',
    title: 'Escape com sistema de válvula de potência: limpeza de carbono é ainda mais crítica em motor grande',
    body: 'A 380 EXC tem sistema de controle de válvula de escape (power valve) de dupla válvula. Acúmulo de carbono nessa válvula prejudica seu funcionamento e reduz drasticamente a potência em toda a faixa de giro (não só em alta rotação). Desmonte e limpe a válvula de potência e o tubo de expansão a cada 20-25 horas de uso — em motor desse porte, carbono acumulado é ainda mais perceptível na perda de desempenho.',
  },
]

const EXC380_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor de 20+ anos: desgaste geral requer inspeção completa antes de uso intenso',
    body: 'Qualquer 380 EXC ainda em uso hoje tem pelo menos duas décadas — mesmo com baixa quilometragem, borrachas, retentores e vedações endurecem com o tempo (não só com uso). Antes de qualquer trilha mais exigente, faça uma inspeção completa: retentores de motor, mangueiras de arrefecimento, diafragma do carburador, vedações da suspensão. Um motor "parado" por anos tem riscos diferentes de um motor com uso regular e manutenção contínua.',
  },
  {
    severity: 'WARN',
    title: 'Detonação por jetting desatualizado ou combustível moderno com etanol',
    body: 'O jetting original de fábrica foi calibrado para gasolina da época (sem ou com pouco etanol). Combustíveis brasileiros atuais com maior teor de etanol podem exigir ajuste de jetting (tipicamente giclê principal um pouco maior para compensar a queima mais rápida do etanol). Sintomas de jetting desatualizado: detonação, perda de potência, superaquecimento. Reavalie o jetting com um mecânico especializado em 2T antes de assumir que a calibração original ainda é ideal com o combustível atual.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento por retentores e borrachas ressecados pelo tempo',
    body: 'Mesmo sem muito uso, retentores de motor e suspensão ressecam e racham com os anos. Sintoma: vazamento de óleo pela base do motor, vazamento na bengala mesmo em moto pouco rodada. Substitua preventivamente todos os retentores acessíveis (motor e suspensão) em uma moto de procedência desconhecida antes de confiar nela para trilha.',
  },
  {
    severity: 'WARN',
    title: 'Peças elétricas escassas: CDI, bobina e chicote são pontos de atenção',
    body: 'Componentes elétricos originais da era 1998-2003 estão descontinuados pela KTM. Se o sistema de ignição falhar, a busca por CDI compatível (KOKUSAN 2K-2 ou equivalente) pode levar tempo — pesquise em fóruns de KTM clássica/vintage e grupos especializados antes que a moto pare de funcionar em uma trilha remota.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem e transmissão: desgaste por uso extremo ou anos de inatividade',
    body: 'Discos de embreagem parados por anos podem colar levemente (ainda que reversível na maioria dos casos) e o óleo antigo pode ter perdido propriedades lubrificantes. Antes de qualquer uso intenso, troque o óleo da transmissão e verifique o funcionamento da embreagem com a moto fria e depois quente — qualquer aspereza ou escorregamento indica necessidade de inspeção dos discos.',
  },
]

const EXC380_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma EXC 380 — moto vintage: manutenção por horas de uso + inspeção geral por idade',
    body: 'A cada uso — limpar e reoleificar filtro de ar; verificar vazamentos visíveis (moto antiga merece checagem visual sempre). 10-15h — verificar/trocar vela, limpar carburador. 15-20h — trocar óleo da caixa de câmbio. 20-25h — decarbonizar tubo de expansão e limpar a válvula de potência (power valve) — mais crítico nesta cilindrada que nas menores. 40-60h — inspecionar desgaste de pistão e anéis. 60-90h — reforma preventiva do kit pistão/anéis (intervalo um pouco mais curto que motos modernas, dada a idade dos componentes). ANUALMENTE (independente de horas, por ser moto de coleção/uso esporádico) — trocar todos os fluidos (óleo da transmissão, líquido de arrefecimento, óleo do garfo), inspecionar todos os retentores e mangueiras visíveis, e verificar o sistema elétrico (CDI, bobina, chicote) quanto a oxidação e fadiga de isolamento. Suspensão: revisão completa do garfo WP 50mm e do amortecedor PDS a cada 40-60h de uso ativo ou anualmente se a moto ficar parada por longos períodos entre usos.',
  },
]

// ─── BLOCOS ────────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'EXC 125',
    yearFrom: null,
    yearTo: null,
    MACETES: EXC125_MACETES,
    PROBLEMAS: EXC125_PROBLEMAS,
    MANUTENCAO: EXC125_MANUTENCAO,
  },
  {
    modelName: 'EXC 150',
    yearFrom: null,
    yearTo: null,
    MACETES: EXC150_MACETES,
    PROBLEMAS: EXC150_PROBLEMAS,
    MANUTENCAO: EXC150_MANUTENCAO,
  },
  {
    modelName: 'EXC 200',
    yearFrom: null,
    yearTo: null,
    MACETES: EXC200_MACETES,
    PROBLEMAS: EXC200_PROBLEMAS,
    MANUTENCAO: EXC200_MANUTENCAO,
  },
  {
    modelName: 'EXC 250',
    yearFrom: null,
    yearTo: null,
    MACETES: EXC250_MACETES,
    PROBLEMAS: EXC250_PROBLEMAS,
    MANUTENCAO: EXC250_MANUTENCAO,
  },
  {
    modelName: 'EXC 300',
    yearFrom: null,
    yearTo: null,
    MACETES: EXC300_MACETES,
    PROBLEMAS: EXC300_PROBLEMAS,
    MANUTENCAO: EXC300_MANUTENCAO,
  },
  {
    modelName: 'EXC 380',
    yearFrom: 1998,
    yearTo: 2003,
    MACETES: EXC380_MACETES,
    PROBLEMAS: EXC380_PROBLEMAS,
    MANUTENCAO: EXC380_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ──────────────────────────────────────────────────────────────
// Off-road: pressões bem mais baixas que motos de rua — referência oficial KTM ~15 PSI (1,0 bar) em trilha.

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'EXC 125',
    yearFrom: null, yearTo: null,
    tireSize: '90/90-21 (F) · 110/90-18 ou 120/90-18 (R)',
    frontPsi: 13, rearPsi: 12,
    frontPsiLoad: 15, rearPsiLoad: 15,
    notes: 'Trilha/off-road: F 13 / R 12 PSI (referência KTM ~15 PSI / 1,0 bar como teto para uso off-road). Estrada/transporte: F 15 / R 15 PSI (1,0-1,5 bar). Pressões mais baixas em trilha aumentam a área de contato e absorção de impactos — ajuste conforme peso do piloto e tipo de terreno (lama/pedra pede um pouco mais para evitar furo por aro, areia pede um pouco menos para flutuação).',
  },
  {
    modelName: 'EXC 150',
    yearFrom: null, yearTo: null,
    tireSize: '90/90-21 (F) · 110/100-18 (R)',
    frontPsi: 13, rearPsi: 12,
    frontPsiLoad: 15, rearPsiLoad: 15,
    notes: 'Trilha/off-road: F 13 / R 12 PSI. Estrada/transporte: F 15 / R 15 PSI. Mantenha diferença máxima de 2 PSI entre frente e trás para não comprometer o comportamento em curva. Pneus off-road recomendados: Pirelli Scorpion MX, Michelin Enduro Competition VI.',
  },
  {
    modelName: 'EXC 200',
    yearFrom: null, yearTo: null,
    tireSize: '90/90-21 (F) · 120/90-18 (R)',
    frontPsi: 13, rearPsi: 12,
    frontPsiLoad: 15, rearPsiLoad: 15,
    notes: 'Trilha/off-road: F 13 / R 12 PSI. Estrada/transporte: F 15 / R 15 PSI. Uso com câmara mousse (sem risco de furo) permite pressões ainda mais baixas em competição — consulte especificação do fabricante do mousse.',
  },
  {
    modelName: 'EXC 250',
    yearFrom: null, yearTo: null,
    tireSize: '90/90-21 (F) · 140/80-18 (R)',
    frontPsi: 13, rearPsi: 12,
    frontPsiLoad: 15, rearPsiLoad: 15,
    notes: 'Trilha/off-road: F 13 / R 12 PSI. Estrada/transporte: F 15 / R 15 PSI. Pneu traseiro 140/80-18 mais largo que nas cilindradas menores — verifique folga na balança traseira ao trocar por pneus de outras marcas/perfis.',
  },
  {
    modelName: 'EXC 300',
    yearFrom: null, yearTo: null,
    tireSize: '90/90-21 (F) · 140/80-18 (R)',
    frontPsi: 13, rearPsi: 12,
    frontPsiLoad: 15, rearPsiLoad: 15,
    notes: 'Trilha/off-road: F 13 / R 12 PSI. Estrada/transporte: F 15 / R 15 PSI. Edição Six Days vem de fábrica com pneus Metzeler 6 Days Extreme — pressões seguem a mesma referência da 300 EXC padrão.',
  },
  {
    modelName: 'EXC 380',
    yearFrom: 1998, yearTo: 2003,
    tireSize: '90/90-21 (F) · 140/80-18 (R)',
    frontPsi: 13, rearPsi: 13,
    frontPsiLoad: 15, rearPsiLoad: 15,
    notes: 'Trilha/off-road: F 13 / R 13 PSI (moto mais pesada e potente, leve incremento na traseira ajuda estabilidade). Estrada/transporte: F 15 / R 15 PSI. Em pneus antigos ou de procedência desconhecida, inspecione o estado da borracha antes de confiar em qualquer pressão — ressecamento é comum em pneus com muitos anos.',
  },
]

// ─── ITENS DE MANUTENÇÃO ───────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // EXC 125
  { modelName: 'EXC 125', yearFrom: null, yearTo: null, component: 'Pré-mistura óleo/gasolina 60:1 (ou óleo TPI conforme geração)', intervalKm: null, intervalMonths: null, notes: 'Sempre com óleo sintético 2T de qualidade (Motul 800 2T, Motorex Cross Power 2T). Medir com seringa dosadora, nunca a olho.', priority: 'CRITICAL', order: 1 },
  { modelName: 'EXC 125', yearFrom: null, yearTo: null, component: 'Filtro de ar de espuma — limpeza e reoleificação', intervalKm: null, intervalMonths: null, notes: 'A CADA saída de trilha, sem exceção. Óleo específico para espuma, nunca óleo de motor comum.', priority: 'CRITICAL', order: 2 },
  { modelName: 'EXC 125', yearFrom: null, yearTo: null, component: 'Vela NGK BR8EG/BR9EG (gap 0,6-0,7mm)', intervalKm: null, intervalMonths: null, notes: 'A cada 15-20 horas de uso. Leve sempre uma sobressalente na bolsa de ferramentas.', priority: 'HIGH', order: 3 },
  { modelName: 'EXC 125', yearFrom: null, yearTo: null, component: 'Pistão e anéis — inspeção/troca', intervalKm: null, intervalMonths: null, notes: 'Inspecionar a 40-60h; reforma preventiva a 60-100h. Wössner/Vertex/ProX são alternativas confiáveis mais baratas.', priority: 'CRITICAL', order: 4 },
  { modelName: 'EXC 125', yearFrom: null, yearTo: null, component: 'Palheta (reed valve) — inspeção das pétalas', intervalKm: null, intervalMonths: null, notes: 'A cada limpeza de carburador (10-15h). Trocar se houver trincas ou deformação.', priority: 'HIGH', order: 5 },
  { modelName: 'EXC 125', yearFrom: null, yearTo: null, component: 'Decarbonização do tubo de expansão (escape)', intervalKm: null, intervalMonths: null, notes: 'A cada 20-30 horas de uso. Verificar também a janela de escape do cilindro.', priority: 'MEDIUM', order: 6 },
  { modelName: 'EXC 125', yearFrom: null, yearTo: null, component: 'Óleo da caixa de câmbio', intervalKm: null, intervalMonths: null, notes: 'A cada 15-20 horas. Não confundir com óleo do motor — 2T não usa óleo no cárter para lubrificação do motor.', priority: 'HIGH', order: 7 },
  { modelName: 'EXC 125', yearFrom: null, yearTo: null, component: 'Suspensão dianteira — óleo do garfo', intervalKm: null, intervalMonths: null, notes: 'A cada 20-25h (trilha pesada) ou 50h (uso misto).', priority: 'MEDIUM', order: 8 },
  { modelName: 'EXC 125', yearFrom: null, yearTo: null, component: 'Suspensão traseira — revisão do amortecedor', intervalKm: null, intervalMonths: null, notes: 'Revisão completa a cada 60-100h.', priority: 'MEDIUM', order: 9 },
  { modelName: 'EXC 125', yearFrom: null, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 12, notes: 'Mistura 50/50 com água destilada. Verificar nível antes de cada saída.', priority: 'MEDIUM', order: 10 },

  // EXC 150
  { modelName: 'EXC 150', yearFrom: null, yearTo: null, component: 'Pré-mistura óleo/gasolina 60:1 (ou óleo TPI conforme geração)', intervalKm: null, intervalMonths: null, notes: 'Óleo sintético 2T de qualidade. Em uso competitivo, considerar 50:1.', priority: 'CRITICAL', order: 1 },
  { modelName: 'EXC 150', yearFrom: null, yearTo: null, component: 'Filtro de ar de espuma — limpeza e reoleificação', intervalKm: null, intervalMonths: null, notes: 'A cada saída de trilha. Twin Air ou original com óleo específico.', priority: 'CRITICAL', order: 2 },
  { modelName: 'EXC 150', yearFrom: null, yearTo: null, component: 'Vela NGK BR8EG (gap 0,6-0,7mm)', intervalKm: null, intervalMonths: null, notes: 'A cada 10-15 horas de uso.', priority: 'HIGH', order: 3 },
  { modelName: 'EXC 150', yearFrom: null, yearTo: null, component: 'Pistão e anéis — inspeção/troca', intervalKm: null, intervalMonths: null, notes: 'Inspecionar a 40-60h; reforma preventiva a 60-100h.', priority: 'CRITICAL', order: 4 },
  { modelName: 'EXC 150', yearFrom: null, yearTo: null, component: 'Palheta (reed valve) — inspeção das pétalas', intervalKm: null, intervalMonths: null, notes: 'A cada limpeza de carburador (10-15h).', priority: 'HIGH', order: 5 },
  { modelName: 'EXC 150', yearFrom: null, yearTo: null, component: 'Decarbonização do tubo de expansão (escape)', intervalKm: null, intervalMonths: null, notes: 'A cada 20-30 horas de uso.', priority: 'MEDIUM', order: 6 },
  { modelName: 'EXC 150', yearFrom: null, yearTo: null, component: 'Óleo da caixa de câmbio', intervalKm: null, intervalMonths: null, notes: 'A cada 15-20 horas.', priority: 'HIGH', order: 7 },
  { modelName: 'EXC 150', yearFrom: null, yearTo: null, component: 'Suspensão dianteira — óleo do garfo', intervalKm: null, intervalMonths: null, notes: 'A cada 20-25h (trilha pesada) ou 50h (uso misto).', priority: 'MEDIUM', order: 8 },
  { modelName: 'EXC 150', yearFrom: null, yearTo: null, component: 'Suspensão traseira — revisão do amortecedor', intervalKm: null, intervalMonths: null, notes: 'Revisão completa a cada 60-100h.', priority: 'MEDIUM', order: 9 },
  { modelName: 'EXC 150', yearFrom: null, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 12, notes: 'Verificar nível antes de cada saída, troca anual ou a cada 100h.', priority: 'MEDIUM', order: 10 },

  // EXC 200
  { modelName: 'EXC 200', yearFrom: null, yearTo: null, component: 'Pré-mistura óleo/gasolina 60:1', intervalKm: null, intervalMonths: null, notes: 'Toda a linha 200 EXC permanece carburada — sem versão TPI. Óleo sintético de qualidade.', priority: 'CRITICAL', order: 1 },
  { modelName: 'EXC 200', yearFrom: null, yearTo: null, component: 'Filtro de ar de espuma — limpeza e reoleificação', intervalKm: null, intervalMonths: null, notes: 'A cada saída de trilha, vedação completa da caixa é essencial.', priority: 'CRITICAL', order: 2 },
  { modelName: 'EXC 200', yearFrom: null, yearTo: null, component: 'Vela NGK BR8EG (gap 0,6-0,7mm)', intervalKm: null, intervalMonths: null, notes: 'A cada 15-20 horas de uso.', priority: 'HIGH', order: 3 },
  { modelName: 'EXC 200', yearFrom: null, yearTo: null, component: 'Pistão e anéis — inspeção/troca', intervalKm: null, intervalMonths: null, notes: 'Inspecionar a 40-60h; reforma preventiva a 60-100h.', priority: 'CRITICAL', order: 4 },
  { modelName: 'EXC 200', yearFrom: null, yearTo: null, component: 'Palheta (reed valve) — inspeção das pétalas', intervalKm: null, intervalMonths: null, notes: 'A cada limpeza de carburador.', priority: 'HIGH', order: 5 },
  { modelName: 'EXC 200', yearFrom: null, yearTo: null, component: 'Decarbonização do tubo de expansão (escape)', intervalKm: null, intervalMonths: null, notes: 'A cada 20-30 horas de uso.', priority: 'MEDIUM', order: 6 },
  { modelName: 'EXC 200', yearFrom: null, yearTo: null, component: 'Fluido da embreagem hidráulica', intervalKm: null, intervalMonths: 12, notes: 'Verificação a cada 20h, troca anual. Sangrar se notar folga ou acionamento esponjoso.', priority: 'HIGH', order: 7 },
  { modelName: 'EXC 200', yearFrom: null, yearTo: null, component: 'Óleo da caixa de câmbio', intervalKm: null, intervalMonths: null, notes: 'A cada 15-20 horas.', priority: 'HIGH', order: 8 },
  { modelName: 'EXC 200', yearFrom: null, yearTo: null, component: 'Suspensão dianteira — óleo do garfo', intervalKm: null, intervalMonths: null, notes: 'A cada 20-25h (trilha pesada) ou 50h (uso misto).', priority: 'MEDIUM', order: 9 },
  { modelName: 'EXC 200', yearFrom: null, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 12, notes: 'Troca anual ou a cada 100h.', priority: 'MEDIUM', order: 10 },

  // EXC 250
  { modelName: 'EXC 250', yearFrom: null, yearTo: null, component: 'Pré-mistura óleo/gasolina 50:1 a 60:1 (ou óleo TPI conforme geração)', intervalKm: null, intervalMonths: null, notes: 'Cilindrada mais popular da linha. Preferir 50:1 em uso competitivo/calor extremo.', priority: 'CRITICAL', order: 1 },
  { modelName: 'EXC 250', yearFrom: null, yearTo: null, component: 'Filtro de ar de espuma — limpeza e reoleificação', intervalKm: null, intervalMonths: null, notes: 'A cada saída de trilha. Motor maior puxa mais ar — vedação crítica.', priority: 'CRITICAL', order: 2 },
  { modelName: 'EXC 250', yearFrom: null, yearTo: null, component: 'Vela NGK BR7ES (confirmar no manual do ano)', intervalKm: null, intervalMonths: null, notes: 'A cada 10-15 horas de uso. Numeração varia mais entre gerações nesta cilindrada.', priority: 'HIGH', order: 3 },
  { modelName: 'EXC 250', yearFrom: null, yearTo: null, component: 'Pistão e anéis — inspeção/troca', intervalKm: null, intervalMonths: null, notes: 'Inspecionar a 40-60h; reforma preventiva a 60-100h (competidores: 20-30h).', priority: 'CRITICAL', order: 4 },
  { modelName: 'EXC 250', yearFrom: null, yearTo: null, component: 'Palheta (reed valve) — inspeção das pétalas', intervalKm: null, intervalMonths: null, notes: 'A cada 10-15h. Boyesen/VForce3 são alternativas às originais.', priority: 'HIGH', order: 5 },
  { modelName: 'EXC 250', yearFrom: null, yearTo: null, component: 'Decarbonização do tubo de expansão (escape)', intervalKm: null, intervalMonths: null, notes: 'A cada 20-30 horas de uso.', priority: 'MEDIUM', order: 6 },
  { modelName: 'EXC 250', yearFrom: null, yearTo: null, component: 'Óleo da caixa de câmbio', intervalKm: null, intervalMonths: null, notes: 'A cada 15-20 horas.', priority: 'HIGH', order: 7 },
  { modelName: 'EXC 250', yearFrom: null, yearTo: null, component: 'Suspensão dianteira — óleo do garfo', intervalKm: null, intervalMonths: null, notes: 'A cada 20-25h (trilha pesada/competição) ou 50h (uso recreativo).', priority: 'MEDIUM', order: 8 },
  { modelName: 'EXC 250', yearFrom: null, yearTo: null, component: 'Suspensão traseira — revisão do amortecedor', intervalKm: null, intervalMonths: null, notes: 'Revisão completa a cada 60-100h.', priority: 'MEDIUM', order: 9 },
  { modelName: 'EXC 250', yearFrom: null, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 12, notes: 'Troca anual ou a cada 100h.', priority: 'MEDIUM', order: 10 },

  // EXC 300 (inclui Six Days)
  { modelName: 'EXC 300', yearFrom: null, yearTo: null, component: 'Pré-mistura óleo/gasolina 60:1 (ou óleo TPI conforme geração)', intervalKm: null, intervalMonths: null, notes: 'Torque generoso em rotação mais baixa — mesmo cuidado com proporção de óleo.', priority: 'CRITICAL', order: 1 },
  { modelName: 'EXC 300', yearFrom: null, yearTo: null, component: 'Filtro de ar de espuma — limpeza e reoleificação', intervalKm: null, intervalMonths: null, notes: 'A cada saída de trilha.', priority: 'CRITICAL', order: 2 },
  { modelName: 'EXC 300', yearFrom: null, yearTo: null, component: 'Vela NGK BR7ES/BR8ECM (confirmar no manual do ano)', intervalKm: null, intervalMonths: null, notes: 'A cada 10-15 horas de uso.', priority: 'HIGH', order: 3 },
  { modelName: 'EXC 300', yearFrom: null, yearTo: null, component: 'Pistão e anéis — inspeção/troca', intervalKm: null, intervalMonths: null, notes: 'Inspecionar a 40-60h; reforma preventiva a 60-100h (competição: 20-30h).', priority: 'CRITICAL', order: 4 },
  { modelName: 'EXC 300', yearFrom: null, yearTo: null, component: 'Palheta (reed valve) — inspeção das pétalas', intervalKm: null, intervalMonths: null, notes: 'A cada 10-15h.', priority: 'HIGH', order: 5 },
  { modelName: 'EXC 300', yearFrom: null, yearTo: null, component: 'Decarbonização do tubo de expansão (escape)', intervalKm: null, intervalMonths: null, notes: 'A cada 20-30 horas de uso.', priority: 'MEDIUM', order: 6 },
  { modelName: 'EXC 300', yearFrom: null, yearTo: null, component: 'Óleo da caixa de câmbio', intervalKm: null, intervalMonths: null, notes: 'A cada 15-20 horas.', priority: 'HIGH', order: 7 },
  { modelName: 'EXC 300', yearFrom: null, yearTo: null, component: 'Suspensão dianteira — garfo WP XACT (ou Factory na versão Six Days)', intervalKm: null, intervalMonths: null, notes: 'Óleo a cada 20-25h (trilha pesada) ou 50h (uso misto), mesmo na versão Six Days calibrada de fábrica.', priority: 'MEDIUM', order: 8 },
  { modelName: 'EXC 300', yearFrom: null, yearTo: null, component: 'Suspensão traseira — amortecedor WP XPLOR PDS', intervalKm: null, intervalMonths: null, notes: 'Revisão completa a cada 60-100h.', priority: 'MEDIUM', order: 9 },
  { modelName: 'EXC 300', yearFrom: null, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 12, notes: 'Troca anual ou a cada 100h.', priority: 'MEDIUM', order: 10 },

  // EXC 380
  { modelName: 'EXC 380', yearFrom: 1998, yearTo: 2003, component: 'Pré-mistura óleo/gasolina 1:40 a 1:60', intervalKm: null, intervalMonths: null, notes: 'Óleo sintético premium obrigatório (moto de 20+ anos). Preferir 1:40 em uso mais puxado.', priority: 'CRITICAL', order: 1 },
  { modelName: 'EXC 380', yearFrom: 1998, yearTo: 2003, component: 'Filtro de ar de espuma — limpeza e reoleificação', intervalKm: null, intervalMonths: null, notes: 'A cada saída de trilha; verificar vazamentos visíveis (moto antiga).', priority: 'CRITICAL', order: 2 },
  { modelName: 'EXC 380', yearFrom: 1998, yearTo: 2003, component: 'Vela NGK BR8ECM (gap 0,6mm, confirmar no manual)', intervalKm: null, intervalMonths: null, notes: 'A cada 10-15 horas de uso.', priority: 'HIGH', order: 3 },
  { modelName: 'EXC 380', yearFrom: 1998, yearTo: 2003, component: 'Pistão e anéis — inspeção/troca', intervalKm: null, intervalMonths: null, notes: 'Inspecionar a 40-60h; reforma preventiva a 60-90h (intervalo reduzido pela idade dos componentes).', priority: 'CRITICAL', order: 4 },
  { modelName: 'EXC 380', yearFrom: 1998, yearTo: 2003, component: 'Válvula de potência (power valve) — limpeza de carbono', intervalKm: null, intervalMonths: null, notes: 'A cada 20-25h. Mais crítico nesta cilindrada que nas menores.', priority: 'HIGH', order: 5 },
  { modelName: 'EXC 380', yearFrom: 1998, yearTo: 2003, component: 'Óleo da caixa de câmbio', intervalKm: null, intervalMonths: 12, notes: 'A cada 15-20 horas ou anualmente se uso esporádico.', priority: 'HIGH', order: 6 },
  { modelName: 'EXC 380', yearFrom: 1998, yearTo: 2003, component: 'Retentores de motor e suspensão — inspeção geral', intervalKm: null, intervalMonths: 12, notes: 'Ressecamento por idade, não só por uso. Inspeção anual obrigatória em moto de coleção.', priority: 'HIGH', order: 7 },
  { modelName: 'EXC 380', yearFrom: 1998, yearTo: 2003, component: 'Suspensão — garfo WP 50mm e amortecedor PDS', intervalKm: null, intervalMonths: 12, notes: 'Revisão completa a cada 40-60h de uso ativo ou anualmente se pouco usada.', priority: 'MEDIUM', order: 8 },
  { modelName: 'EXC 380', yearFrom: 1998, yearTo: 2003, component: 'Sistema elétrico (CDI KOKUSAN 2K-2, bobina, chicote)', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual quanto a oxidação e fadiga — componentes descontinuados pela KTM.', priority: 'MEDIUM', order: 9 },
  { modelName: 'EXC 380', yearFrom: 1998, yearTo: 2003, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 12, notes: 'Troca anual, independente de horas de uso.', priority: 'MEDIUM', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed KTM EXC 2 tempos (125 / 150 / 200 / 250 / 300 / 380)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'KTM', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'KTM', vehicleTypeId: motoType.id },
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
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
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

  console.log('✅ KTM EXC 2 tempos concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
