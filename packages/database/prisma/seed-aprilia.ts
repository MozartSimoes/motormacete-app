/**
 * Seed APRILIA — macetes, problemas e manutenção
 * Cobre os principais modelos Aprilia vendidos no Brasil
 *
 * Motor 2T Rotax 122/123 (125cc esportivo): RS 125
 * Motor 2T Minarelli horizontal (50cc): SR 50
 * Motor 4T Piaggio LEADER (125-150cc): Scarabeo 150, Atlantic 125
 * Motor 4T Rotax water-cooled (125cc): Leonardo 125
 *
 * Fontes: Tabela FIPE Brasil, gmoto.pt, apriliaforum.com, Mercado Livre Brasil,
 *         50factory.com (Rotax 122), Racing Planet USA (Minarelli horizontal),
 *         Pirelli motorcycle catalog, heavy-tuned.de, scooter-attack.de
 *
 * Execute: pnpm --filter @motormacete/database db:seed:aprilia
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

// ─── Base compartilhada — Motor Piaggio LEADER (4T 125–150cc) ────────────────
// Usado em Scarabeo 150 e Atlantic 125 — mesmo motor que Vespa LX 150 e Piaggio Fly 150

const MACETES_PIAGGIO_LEADER_BASE: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Diga "motor Piaggio Leader 150" e as portas abrem — é o mesmo motor da Vespa',
    body: 'O motor Piaggio LEADER de 125/150cc equipa também a Vespa LX 150, Piaggio Liberty 150 e Piaggio Fly 150 — todas da família Piaggio Group. Qualquer concessionária Vespa ou Piaggio no Brasil tem as peças que você precisa. No Mercado Livre, pesquise "motor Piaggio Leader 150" para encontrar cilindro, pistão, juntas, vela, variador, correia CVT e filtro de ar — tudo disponível e barato. Nunca peça "peças de Aprilia" ao mecânico — ele provavelmente não saberá do que se trata. Diga: "o motor é Piaggio Leader 150, compatível com Vespa LX" e o problema vira rotina.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT Gates ou Bando + rolos: troque a cada 20.000 km preventivamente',
    body: 'A transmissão CVT usa correia trapezoidal e rolos (roletes) do variador. Para a correia, pesquise "correia CVT Piaggio Leader 150" ou "correia CVT Vespa LX 150" no ML — marcas Gates e Bando custam R$ 80–R$ 200 e têm boa durabilidade. Rolos do variador: pesos típicos do LEADER são 7,5g–9g. Quando desgastam (forma de batata ao invés de cilíndrica), a aceleração fica mole e surgem vibrações. Kit correia + rolos no ML: "kit variador Piaggio 150" — R$ 120–R$ 280.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR7HSA: R$ 20–35 e troca a cada 6.000 km — diagnóstico barato',
    body: 'A vela padrão do motor Piaggio LEADER é a NGK CR7HSA. Troque a cada 6.000 km. Sintomas de vela gasta: dificuldade para ligar frio, falha ao acelerar, consumo aumentado. Ao trocar, observe a coloração da vela velha: marrom-acinzentado = mistura correta; preta e molhada = mistura rica ou óleo entrando; branca = mistura pobre (risco de superaquecimento). Torque de instalação: 12–14 N·m — nunca aperte sem torquímetro em cabeçote de alumínio.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar da Vespa LX 150 serve direto: disponível em qualquer Piaggio',
    body: 'O filtro de ar do motor Piaggio LEADER 150 é o mesmo da Vespa LX 150 e Piaggio Fly. Troque a cada 10.000–12.000 km ou anualmente. Custo: R$ 30–R$ 60 original, R$ 15–R$ 30 genérico. Pesquise "filtro ar Vespa LX 150" ou "filtro ar Piaggio Leader 150" no ML. Instale sempre seco — nunca umedeça com óleo.',
  },
  {
    severity: 'OK',
    title: 'Importação da Europa para peças originais: gmoto.pt e ebay.de são os endereços',
    body: '1. gmoto.pt (Portugal) — estoque amplo de peças Aprilia/Piaggio, frete para Brasil ~R$ 150–250, prazo 7–14 dias. Melhor custo-benefício para peças originais. 2. ebay.de (eBay Alemanha) — ampla oferta de peças novas e usadas de scooters Piaggio/Aprilia/Vespa europeus, frete com DHL R$ 200–350, prazo 10–20 dias. Para peças com valor declarado até USD 100, geralmente passam pelos Correios sem tributação adicional.',
  },
]

const PROBLEMAS_PIAGGIO_LEADER_BASE: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Correia CVT rompida = tração zero: troque antes de acontecer',
    body: 'Correia CVT rompida deixa o scooter completamente imóvel — sem tração. Sinais antes da ruptura: aceleração progressivamente mais fraca, vibrações ao acelerar, cheiro de borracha queimada. Inspecione visualmente a cada 10.000 km — rachaduras ou fissuras = troca imediata. Troca preventiva a cada 20.000 km custa R$ 80–R$ 200 e é muito mais barato do que ficar parado. Kit correia + rolos no ML: R$ 120–R$ 280.',
  },
  {
    severity: 'WARN',
    title: 'Vedante da haste do kickstart/variador: vaza óleo pelo lado esquerdo',
    body: 'O etanol E27 do combustível brasileiro degrada os vedantes externos do motor Piaggio LEADER ao longo do tempo. Sintoma mais comum: mancha de óleo sob o scooter no lado esquerdo (tampa do variador CVT ou haste do kickstart). Custo do reparo: R$ 40–R$ 80 em peças (kit de vedantes Piaggio/Vespa) + mão de obra. Mecânicos de scooter Vespa fazem esse serviço rotineiramente e rápido.',
  },
  {
    severity: 'WARN',
    title: 'Rodete tensor da correia com barulho: troque antes de a correia pular',
    body: 'O motor LEADER tem tensor de correia auxiliar com rodete que, ao desgastar, emite ruído de "arranha-disco" ou "tique-taque" em marcha lenta. Ignorar esse ruído pode resultar em correia que pula do tensor e danifica outras peças. Custo da peça: R$ 50–R$ 120. Pesquise "tensor correia Piaggio Leader" ou leve ao mecânico de Vespa para identificar o componente exato.',
  },
  {
    severity: 'WARN',
    title: 'Injeção eletrônica (modelos EFI): combustível adulterado danifica o bico injetor',
    body: 'Nos modelos mais recentes com injeção eletrônica (EFI), combustível adulterado danifica o bico injetor e a bomba de combustível. Sintomas: moto falhando ao acelerar, ralenti instável, consumo alto. Sempre abasteça em postos confiáveis. Se suspeitar do combustível: aditivo limpa-injetor (R$ 20–R$ 30) no tanque como primeiro passo. Falha persistente: limpeza ultrassônica do bico injetor em oficina de injeção (R$ 60–R$ 120).',
  },
]

const MANUTENCAO_PIAGGIO_LEADER_BASE: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo motor 10W-40 semissintético: troque a cada 3.000 km',
    body: 'O motor Piaggio LEADER 4T usa 10W-40 semissintético API SJ ou superior. Capacidade: ~0,9–1,0L. Troque o óleo a cada 3.000 km. Marcas recomendadas: Motul 3000+ 10W-40, Castrol Go 10W-40, Shell Advance 4T. Nunca use 20W-50 convencional — o LEADER opera quente e precisa de óleo de boa fluidez. Troque o filtro de óleo a cada 6.000 km (em toda segunda troca de óleo).',
  },
  {
    severity: 'OK',
    title: 'Correia CVT: inspeção a cada 10.000 km, troca preventiva a cada 20.000 km',
    body: 'Abra a tampa do variador (parafusos Phillips) a cada 10.000 km e observe a correia: rachaduras, desgaste lateral ou fissuras transversais = troca imediata. Troca preventiva: 20.000 km. Ao trocar a correia, troque também os rolos do variador e inspecione a embreagem centrífuga. Kit completo: R$ 150–R$ 300 dependendo da marca.',
  },
  {
    severity: 'OK',
    title: 'Pastilha de freio: inspeção a cada 5.000 km — scooters urbanos desgastam rápido',
    body: 'Scooters no trânsito urbano desgastam pastilhas rapidamente. Inspecione a cada 5.000 km. Espessura mínima: 1–1,5mm. Pastilhas para "Piaggio Leader 150" ou "Vespa LX 150" são compatíveis — R$ 30–R$ 80 o par no ML. Ao trocar as pastilhas, limpe o pistão do pino com graxa específica para freio (sem silicone) — evita rangido.',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio DOT 4: troca a cada 2 anos independente da quilometragem',
    body: 'O DOT 4 absorve umidade ao longo do tempo mesmo sem abrir o circuito. Troque a cada 2 anos. Sintoma de fluido velho: alavanca com curso maior que o normal, freio que perde "mordida" em descidas longas. Sangre o sistema ao trocar para garantir que não ficou ar no circuito.',
  },
]

// ─── RS 125 — Motor Rotax 122/123, 2 tempos esportivo ───────────────────────
const RS125_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor Rotax 122 é exclusivo da Aprilia — peças específicas chegam da Europa em 2–4 semanas',
    body: 'O RS 125 usa o motor Rotax 122 (ou Rotax 123 nos modelos anteriores a ~2006) — desenvolvido exclusivamente para Aprilia pela Bombardier-Rotax austríaca. Peças de desgaste (corrente, vela, pastilha, filtros) são genéricas e baratas no Brasil. As peças específicas do motor (cilindro Nikasil, pistão, CDI, válvula RAVE) precisam ser importadas: gmoto.pt (Portugal, frete ~R$ 180–250, prazo 7–12 dias), ebay.de (Alemanha, maior variedade, ~R$ 220–380) ou motorparts24.de. Compre sempre peças originais Rotax ou de marcas homologadas (ITALKIT, POLINI) — o cilindro Nikasil não tolera réplicas de baixa qualidade.',
  },
  {
    severity: 'OK',
    title: 'A válvula RAVE é o coração do RS 125 — limpe-a a cada 5.000 km',
    body: 'O RS 125 usa válvula de escape variável RAVE (Rotax Adjustable Variable Exhaust). Ela se abre em ~7.000 RPM e libera a potência máxima — é o que transforma o motor de um 125 "lento" para algo que surpreende. Quando entope de carbono por óleo 2T de qualidade inferior, o motor perde potência drasticamente na faixa de 7.000–9.000 RPM. Limpeza preventiva a cada 5.000 km: retire a capa da RAVE (3 parafusos Phillips no cilindro, lado esquerdo), remova a guilhotina e a mola, limpe com WD-40 e pano seco. A guilhotina deve deslizar livremente. Não use graxa — atrai mais depósito.',
  },
  {
    severity: 'OK',
    title: 'Carburador Dell\'Orto PHBH 28: limpeza ultrassônica resolve 90% dos problemas',
    body: 'O carburador original é o Dell\'Orto PHBH 28 — excelente qualidade, muito durável, mas sensível a sujeira. Nunca instale carburador genérico chinês no RS 125 — o Rotax 122 é sensível à mistura e vai afogar, detonar ou perder potência. Primeiro tente limpeza ultrassônica (R$ 60–R$ 120 em oficinas de injetores) — resolve 90% dos casos. Se precisar trocar: pesquise "Dell\'Orto PHBH 28" no ML (unidades usadas por R$ 200–R$ 400) ou importe de gmoto.pt. Em cidades acima de 800m, o jato principal pode precisar de ajuste (original ~102–105).',
  },
  {
    severity: 'OK',
    title: 'CDI do RS 125: Rotax 122 e Rotax 123 têm CDIs diferentes — confira antes de comprar',
    body: 'O CDI (módulo de ignição) é específico ao motor Rotax e os modelos 122 e 123 têm CDIs incompatíveis — curvas de ignição diferentes, não são intercambiáveis. Antes de comprar, identifique seu motor pelo número gravado no cárter. Na versão de série, o CDI limita em ~11.000 RPM. Sintoma de CDI defeituoso: ignição errática em alta rotação, moto que para após aquecer. CDI compatível no ML: "CDI Aprilia RS 125" — opções de R$ 200–R$ 400. CDI original novo importado: R$ 600–R$ 1.200.',
  },
  {
    severity: 'OK',
    title: 'Corrente 420 pitch: qualquer DID, RK ou JT funciona perfeitamente',
    body: 'A transmissão usa corrente 420 (passo 420). No ML: "corrente 420 moto 106 elos" — marcas DID, RK ou JT custam R$ 80–R$ 150. Pinhoneira (13–14 dentes) e coroa (38–42 dentes) são padrão de mercado. Troque o kit completo (corrente + pinhoneira + coroa) a cada 15.000–20.000 km. Dica: pinhoneira 1 dente maior = mais velocidade máxima, menos aceleração; pinhoneira 1 dente menor = aceleração mais agressiva.',
  },
  {
    severity: 'WARN',
    title: 'Câmara de expansão entupida = perda de 20–30% da potência',
    body: 'No RS 125, o escapamento (câmara de expansão) faz parte ativa do processo de combustão 2T — amassado ou com carbonização interna reduz a potência drasticamente. Limpeza a cada 15.000 km: retire o escapamento e coloque no fogo por 10 minutos ao ar livre para queimar os depósitos. Após esfriar, bata com martelo de borracha — o carbono cai. Escapamento aftermarket (Arrow, DEP Pipes): transforma o motor mas exige recarburação. ML: "escapamento Aprilia RS 125" — R$ 300–R$ 1.500.',
  },
  {
    severity: 'OK',
    title: 'Os 3 sites que todo dono de RS 125 precisa conhecer para importar peças',
    body: '1. gmoto.pt (Portugal) — melhor custo para peças originais, frete para SP ~R$ 180–250, prazo 7–12 dias. 2. ebay.de (eBay Alemanha) — maior variedade de peças novas e usadas, DHL ~R$ 220–380. 3. motorparts24.de — alemão especializado em peças originais e aftermarket (ITALKIT, POLINI, Malossi). Para importar: peças com valor declarado até USD 100 geralmente passam pelos Correios sem tributação adicional. Acima disso, há risco de 60% de imposto sobre (valor + frete) — calcule antes.',
  },
]

const RS125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cilindro Nikasil não pode ser retificado — anel partido = troca do cilindro inteiro',
    body: 'O cilindro do Rotax 122 tem revestimento Nikasil (carboneto de silício eletrodeposita no alumínio). Quando o anel do pistão parte por falta de óleo 2T ou uso de óleo de qualidade inferior, ele risca o Nikasil e o cilindro precisa ser trocado — não pode ser retificado como ferro fundido. Custo de um cilindro Rotax 122 novo importado: R$ 900–R$ 2.000. Prevenção total: use APENAS óleo 2T sintético de qualidade (Yamalube 2T, Motul 710/800, Castrol Power 1) na proporção correta de 2% (20mL por litro). Isso é inegociável.',
  },
  {
    severity: 'WARN',
    title: 'Válvula RAVE emperrada: potência some entre 7.000–9.000 RPM',
    body: 'Sintoma inconfundível: o RS 125 empurra suavemente até ~6.000 RPM mas não explode na zona de potência (8.000–11.500 RPM). A guilhotina da RAVE ficou presa por depósito de carbono. Diagnóstico: retire a capa da RAVE (3 parafusos lado esquerdo do cilindro) e verifique se a guilhotina desliza livre. Solução: mergulhe em diesel por 12h, limpe com escova e reinstale. Se a mola de retorno quebrou: pesquise "kit RAVE Aprilia RS 125" no ML ou importe de gmoto.pt — R$ 80–R$ 250.',
  },
  {
    severity: 'DANGER',
    title: 'Mistura pobre derrete o pistão — a cor da vela diz tudo antes que aconteça',
    body: 'Mistura pobre (ar em excesso) causa superaquecimento e funde o pistão + risca o cilindro Nikasil — prejuízo de R$ 1.000+. Causas: agulha do carburador desgastada, jato entupido, tampa do tanque sem respiro, altitude diferente da carburação original. Diagnóstico preventivo: retire a vela após rodagem intensa. Cinza clara-marrom = perfeito. Branca ou amarelada = mistura pobre — PARE e ajuste o carburador. Preta e molhada = mistura rica (seguro, só desperdício).',
  },
  {
    severity: 'WARN',
    title: 'CDI que para a quente: moto desliga após 20–30 minutos e volta após resfriar',
    body: 'CDI defeituoso frequentemente falha só aquecido — a moto arranca normal, roda 20–30 minutos e desliga. Esfria por 10 minutos, pega de novo. Diagnóstico: quando ocorrer, verifique se a vela está dando faísca (desconecte o cabo, encoste no motor, tente dar a partida — deve ver faísca azul). Sem faísca com motor quente = CDI com defeito térmico. Confirmação rápida em casa: aqueça o CDI com secador de cabelo por 3 minutos e tente dar a partida.',
  },
  {
    severity: 'WARN',
    title: 'Vedante do eixo do motor: vaza óleo 2T após 25.000–35.000 km',
    body: 'O retentor (vedante de óleo) do eixo principal do Rotax 122 se desgasta entre 25.000–35.000 km e começa a vazar óleo 2T para o combustível — sinal: fumaça azulada excessiva no escape mesmo com proporção de óleo correta. Ignorar causa afogamento da vela, mistura excessivamente rica e falhas de ignição. Reparo requer abertura do motor. Custo de mão de obra: R$ 200–R$ 400. Kit de vedantes importado de gmoto.pt: R$ 60–R$ 150.',
  },
]

const RS125_MANUTENCAO: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Óleo 2T sintético: 2% (20mL/litro) — nunca economize nesse item',
    body: 'Use sempre óleo 2T sintético ou semi-sintético de qualidade: Yamalube 2T (R$ 35/500mL), Motul 710 ou 800 (R$ 45–65/500mL), Castrol Power 1 2T (R$ 30–40/500mL). Mistura: 20mL por litro de gasolina (1:50 = 2%). Nunca misture marcas diferentes no mesmo tanque. Nunca use óleo 2T de motor de roçadeira ou barco — formulação diferente, não adequada para motor de alta rotação. Com óleo ruim, a RAVE acumula depósito e o risco de gripagem do Nikasil aumenta drasticamente.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR9EG: troca a cada 3.000 km',
    body: 'A vela padrão é NGK BR9EG (sufixo G para motores 2T esportivos). Troque a cada 3.000 km. Custo: R$ 25–R$ 40. Ao retirar, observe a coloração: cinza-marrom claro = mistura correta; preta úmida = mistura rica; branca/amarelada = mistura pobre (alerta máximo). Torque de aperto: 12–15 N·m.',
  },
  {
    severity: 'OK',
    title: 'Corrente 420: lubrificação a cada 500 km, troca a cada 15.000–20.000 km',
    body: 'Lubrifique a corrente a cada 500 km ou após chuva com spray específico (Motul Chain Lube, WD-40 Specialist Chain). Nunca óleo de motor — suja rápido. Folga correta: ~2cm no ponto mais tenso com a moto no cavalete central. Troque corrente + pinhoneira + coroa juntos a cada 15.000–20.000 km.',
  },
  {
    severity: 'OK',
    title: 'Válvula RAVE: limpeza preventiva a cada 5.000 km',
    body: 'Procedimento: retire a capa da RAVE (3 parafusos Phillips, lado esquerdo do cilindro). Remova guilhotina e mola. Limpe depósitos de carbono com WD-40 e pano seco. A guilhotina deve deslizar absolutamente livre no canal. Reinstale SEM graxa — graxa acumula carbono mais rápido. O-ring da capa: se ressecado ou amassado, troque (O-ring 14×2mm de borracharia).',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio DOT 4: troca a cada 2 anos — pastilhas a cada 8.000–12.000 km',
    body: 'Freio a disco dianteiro e traseiro. Fluido DOT 4: troque a cada 2 anos (absorve umidade mesmo sem abrir o circuito). Sangre o sistema ao trocar. Pastilhas: inspecione a cada 8.000 km, troque quando abaixo de 1,5mm. Pesquise "pastilha Aprilia RS 125" no ML — genéricos por R$ 40–R$ 80 o par. Pastilhas EBC ou Galfer são melhores e duram mais.',
  },
]

// ─── SR 50 — Motor Minarelli horizontal, 2T 50cc ────────────────────────────
const SR50_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Diga "motor Minarelli horizontal" e compre no ecossistema Yamaha Jog',
    body: 'O Aprilia SR 50 usa o motor Minarelli horizontal de 50cc — exatamente o mesmo motor do Yamaha Aerox 50, Yamaha Jog 50 e MBK Nitro. Ignore o nome Aprilia ao procurar peças. No ML, pesquise "Minarelli horizontal" ou "Yamaha Jog 50cc" para encontrar carburador, CDI, kit de pistão, correia CVT, rolos do variador e vela. Qualquer mecânico de scooter que conhece o Jog 50 conhece o motor do seu SR 50 — o design italiano esconde um coração que todo mecânico de scooter brasileiro já mexeu.',
  },
  {
    severity: 'OK',
    title: 'Carburador Dell\'Orto PHVA 17.5 original; genérico PZ17 resolve por R$ 40–80',
    body: 'O carburador original é o Dell\'Orto PHVA 17.5 (17,5mm). Funciona bem se limpo — tente limpeza profunda com spray de carburador antes de trocar. Se precisar substituir: o genérico PZ17 compatível com "Minarelli horizontal" custa R$ 40–R$ 80 no ML. O bystarter (choke automático elétrico) integrado é crítico: quando falha, a moto afoga no frio. Comprando o carburador completo, já vem com bystarter incluso (mais barato do que o bystarter separado).',
  },
  {
    severity: 'OK',
    title: 'CDI AC de 5 pinos: genérico por R$ 30–50 resolve na hora',
    body: 'O CDI do SR 50 é um AC-CDI de 5 pinos padrão para scooter Minarelli 2T. Falha: moto sem faísca, para de repente em temperatura ou ignição errática. Diagnóstico rápido: aqueça o CDI com secador de cabelo por 2 minutos — se a moto para de funcionar, o CDI está quebrando pelo calor. ML: "CDI scooter 2 tempos 50cc 5 pinos" — qualquer AC-CDI de 5 pinos para Minarelli funciona. Custo: R$ 30–R$ 60. Guarde o CDI fora do baú — calor excessivo é a causa número 1 de falha.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT + rolos variador: a revisão que evita parar na estrada',
    body: 'Dois itens causam 90% dos problemas de transmissão: correia e rolos do variador. Correia: inspecione a cada 5.000 km — rachaduras = troca imediata. Preventivo: 12.000–15.000 km. Para saber a dimensão, meça a correia velha (comprimento × largura em mm). Rolos: originais com ~15mm de diâmetro; quando desgastam para ~14,5mm, a aceleração fica mole. ML: "kit variador scooter Minarelli horizontal" ou "roletes 15g scooter". Kit correia + rolos: R$ 80–R$ 200.',
  },
  {
    severity: 'WARN',
    title: 'Etanol E27 corrói os vedantes do carburador original em 1–2 anos',
    body: 'O carburador do SR 50 foi projetado para gasolina europeia sem etanol. O E27 brasileiro ataca as borrachas internas — boia e vedantes da agulha. Sintoma: carburador vaza combustível pelo dreno, moto afoga com choke desligado. Solução rápida: kit de reparo com vedantes resistentes a etanol — "kit reparo carburador scooter 50cc" no ML, R$ 25–R$ 50. Solução definitiva: carburador PZ17 novo (materiais mais resistentes) + 1mL de aditivo anticorrosão por litro.',
  },
]

const SR50_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Moto não pega no frio: bystarter (choke automático) travado',
    body: 'O SR 50 tem choke automático elétrico (bystarter). Quando falha preso na posição "choke ativado", a moto afoga e não funciona normalmente. Diagnóstico: desconecte o cabo elétrico do bystarter — se a moto funcionar melhor, o bystarter está travado. Solução temporária: deixe o motor aquecer 2–3 minutos antes de rodar. Solução definitiva: troque o bystarter. Como vem junto no kit do carburador completo (R$ 40–80), sai mais barato trocar o carburador inteiro do que o bystarter separado (R$ 30–50).',
  },
  {
    severity: 'WARN',
    title: 'Vela preta de óleo: anel do pistão desgastado ou proporção de óleo incorreta',
    body: 'Vela preta e molhada de óleo indica excesso de óleo 2T ou anel de pistão desgastado. Primeiro verifique a proporção: 2% (20mL por litro). Se correta e vela continua sujando: anel desgastado. Kit pistão + anel para Minarelli 50cc horizontal: "kit pistão 40mm Minarelli horizontal" no ML — R$ 50–R$ 120. Verifique a cota do cilindro antes de instalar.',
  },
  {
    severity: 'WARN',
    title: 'Aceleração mole com vibrações: rolos e correia CVT desgastados',
    body: 'Sintoma clássico com quilometragem: acelera mas parece "sem força", especialmente 0–30 km/h. Causa: rolos do variador desgastados (abaixo de 14,5mm) travam o variador em baixa rotação. Troca dos rolos: R$ 30–R$ 80 para kit de 6 rolos. Se correia também com fissuras: troca completa. Aproveite e inspecione a embreagem centrífuga (pastilhas desgastadas = patinamento em alta rotação).',
  },
  {
    severity: 'WARN',
    title: 'Conectores elétricos oxidados: falhas intermitentes impossíveis de diagnosticar',
    body: 'Os conectores elétricos do SR 50 oxidam rapidamente no clima úmido brasileiro — especialmente em cidades litorâneas. Sintoma: falhas elétricas intermitentes, luzes que oscilam, moto que "tropeça" ao acelerar sem razão aparente. Diagnóstico: dobre levemente cada conector enquanto a moto está ligada — se uma falha aparecer e desaparecer ao mexer, está oxidado. Solução: WD-40 Contact Cleaner (spray de contato elétrico, R$ 20–R$ 30) nos conectores + vaselina para proteção.',
  },
]

const SR50_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 2T: mantenha o reservatório sempre cheio — use semissintético no mínimo',
    body: 'O SR 50 tem reservatório de óleo 2T separado com injeção automática. Inspecione o nível a cada abastecimento. Capacidade: ~0,5L. Use óleo 2T semissintético ou sintético: Yamalube 2T, Motul 710/800 ou Castrol Power 1. Nunca coloque óleo de motor 4T no reservatório de 2T. Nunca deixe esvaziar completamente — a bomba pode sugar ar e a gripagem acontece em segundos.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR8HS: troca a cada 5.000 km',
    body: 'A vela padrão do SR 50 é a NGK BR8HS. Troque a cada 5.000 km. Custo: R$ 15–R$ 25. Se a moto está com dificuldade de ligar ou falhas na aceleração, troque a vela como primeiro passo de diagnóstico antes de qualquer outra intervenção — é a peça mais barata e frequentemente mais efetiva.',
  },
  {
    severity: 'OK',
    title: 'Calibragem: dianteiro 22 PSI, traseiro 25 PSI — sempre a frio',
    body: 'Calibre os pneus sempre a frio (moto parada por no mínimo 30 minutos). Dianteiro: 22 PSI (1,5 bar). Traseiro: 25 PSI (1,7 bar). Com garupa: traseiro 27 PSI. Nunca calibre quente. Pneu murcho em scooter de aro pequeno afeta muito mais a estabilidade do que em motos de aro grande — mantenha sempre em dia. Os pneus do SR 50 são 130/60-13.',
  },
  {
    severity: 'OK',
    title: 'Revisão CVT a cada 10.000 km: correia, rolos e embreagem',
    body: 'Abra a tampa do variador e inspecione: correia CVT (rachaduras ou ressecamento = troca), rolos do variador (meça com paquímetro, troque se abaixo de 14,5mm), embreagem centrífuga (desgaste das pastilhas). Substitua preventivamente a correia a cada 15.000 km — muito mais barato do que ser surpreendido na estrada.',
  },
]

// ─── Scarabeo 150 — Motor Piaggio LEADER 4T 150cc ───────────────────────────
const SCARABEO150_MACETES: TipInput[] = [
  ...MACETES_PIAGGIO_LEADER_BASE,
  {
    severity: 'OK',
    title: 'Scarabeo 150: estilo italiano com coração Vespa — o mais fácil de manter da linha Aprilia',
    body: 'O Scarabeo 150 tem uma vantagem enorme sobre outros modelos Aprilia no Brasil: usa o motor Piaggio LEADER 150cc, que equipa também a Vespa LX 150 e a Piaggio Fly 150. Qualquer concessionária Vespa ou mecânico de scooter Piaggio tem as peças no estoque. Para manutenção: qualquer mecânico experiente em Vespa atende seu Scarabeo. Dica de emergência: se estiver longe de casa com problema, procure qualquer oficina que atenda Vespa — é o mesmo motor, o mesmo diagnóstico, as mesmas peças.',
  },
]

const SCARABEO150_MANUTENCAO: TipInput[] = [
  ...MANUTENCAO_PIAGGIO_LEADER_BASE,
  {
    severity: 'OK',
    title: 'Calibragem: dianteiro 22 PSI, traseiro 26 PSI (aro 12")',
    body: 'O Scarabeo 150 usa pneus de aro 12". Calibre sempre a frio: dianteiro 22 PSI (1,5 bar), traseiro 26 PSI (1,8 bar). Com garupa: traseiro 28–29 PSI. Tamanhos comuns: dianteiro 120/70-12, traseiro 130/70-12. Disponíveis no Brasil: Pirelli SL26, Michelin S1, Metzeler Roadtec. Pneu murcho em aro pequeno afeta muito mais a estabilidade — calibre semanalmente.',
  },
]

// ─── Atlantic 125 — Motor Piaggio LEADER 4T 125cc ───────────────────────────
const ATLANTIC125_MACETES: TipInput[] = [
  ...MACETES_PIAGGIO_LEADER_BASE,
  {
    severity: 'OK',
    title: 'Atlantic 125: maxi-scooter com motor de Vespa — o mecânico certo é o de Piaggio',
    body: 'O Atlantic 125/200 usa o motor Piaggio LEADER (mesma família da Vespa GT 125/200 e Piaggio X8 200). Para manutenção, busque mecânicos especializados em Vespa ou Piaggio — eles conhecem o motor de trás para frente. Peças: pesquise com "Piaggio Leader 125" ou "Vespa GT 125" para encontrar alternativas compatíveis mais baratas do que com o nome Aprilia. O porta-objetos generoso do Atlantic é conveniente para guardar o manual e histórico de manutenção.',
  },
]

const ATLANTIC125_MANUTENCAO: TipInput[] = [
  ...MANUTENCAO_PIAGGIO_LEADER_BASE,
  {
    severity: 'OK',
    title: 'Calibragem: dianteiro 22 PSI, traseiro 26 PSI — traseiro desgasta mais rápido',
    body: 'O Atlantic 125 usa pneus de aro 14" (dianteiro) e 13" (traseiro). Calibre sempre a frio: dianteiro 22 PSI (1,5 bar), traseiro 26 PSI (1,8 bar). Com garupa ou carga: traseiro 29 PSI. Tamanhos típicos: dianteiro 120/70-14, traseiro 140/70-13. Maxi-scooters concentram mais peso na roda traseira — o desgaste do pneu traseiro é mais rápido, inspecione a cada 3.000 km.',
  },
]

// ─── Leonardo 125 — Motor Rotax 4T refrigerado a água ───────────────────────
const LEONARDO125_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Leonardo 125 Rotax: motor sofisticado dos anos 90 — peças difíceis no Brasil, fáceis na Europa',
    body: 'O Leonardo 125/150 com motor Rotax 4T refrigerado a água é um scooter muito bem feito — mas as peças internas de motor não têm equivalente no mercado brasileiro. Peças de desgaste (vela, filtro de ar, pastilha de freio, correia CVT) são genéricas e fáceis de achar. Peças internas do Rotax 4T precisam ser importadas: scooter-attack.de e heavy-tuned.de têm boa cobertura dessa linha. Antes de comprar um Leonardo 125 usado: verifique qual versão do motor é — Rotax (mais difícil de manter) ou Piaggio LEADER (mais fácil). Com LEADER, qualquer Vespa resolve; com Rotax, o suporte é europeu.',
  },
  {
    severity: 'OK',
    title: 'Líquido de arrefecimento: verifique mensalmente — motor refrigerado a água requer atenção',
    body: 'O Leonardo Rotax é refrigerado a água — um diferencial de performance mas que requer cuidado extra. Verifique o nível no reservatório de expansão mensalmente (NUNCA abra o radiador com motor quente — risco de queimadura grave). Use mistura 50%/50% de coolant + água destilada. Se o nível cair frequentemente sem vazamento visível: inspecione a bomba d\'água. Um motor Rotax 4T superaquecido por falta de líquido = dano sério ao cabeçote.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT: meça a correia velha e pesquise por dimensão — peça pode ser adaptada',
    body: 'O Leonardo usa CVT como qualquer scooter. Para a correia, meça as dimensões da correia velha (comprimento × largura em mm) e busque equivalente no ML: "correia scooter [medidas]". Para peças específicas do Leonardo Rotax: scooter-attack.de (Alemanha) tem boa cobertura. Ao trocar a correia, troque também os rolos do variador — rolos desgastados (forma de batata) causam aceleração ruim independentemente da condição da correia.',
  },
  {
    severity: 'OK',
    title: 'Importação: heavy-tuned.de e scooter-attack.de cobrem bem o Leonardo Rotax',
    body: 'Para peças do Leonardo 125 Rotax: 1. heavy-tuned.de (Alemanha) — bom estoque e preços competitivos. 2. scooter-attack.de (Alemanha) — especializado em scooters italianos/europeus. Frete DHL para Brasil: R$ 200–R$ 400 dependendo do peso. Ao encomendar: sempre informe o número do chassi (VIN) e o código do motor Rotax (gravado no cárter) — facilita a identificação do ano exato e versão, pois o Leonardo teve variações ao longo dos anos.',
  },
]

const LEONARDO125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Superaquecimento súbito: motor refrigerado a água não dá aviso progressivo',
    body: 'O Leonardo Rotax mantém temperatura estável com o líquido — mas quando o líquido acaba ou a bomba falha, o superaquecimento é súbito e severo (diferente de um motor a ar que aquece progressivamente). Sinais: indicador de temperatura acima do normal, vapor saindo do reservatório, ruídos metálicos incomuns. Ação: PARE IMEDIATAMENTE. Verifique: nível do líquido, funcionamento da bomba d\'água (ouvir se está circulando), integridade das mangueiras, obstrução no radiador.',
  },
  {
    severity: 'WARN',
    title: 'Bomba d\'água: vedante desgasta entre 20.000–30.000 km — mistura fluidos',
    body: 'O vedante da bomba d\'água do Leonardo Rotax se desgasta e começa a misturar líquido de arrefecimento ao óleo do motor. Sinais: óleo com aparência "café com leite" (emulsão), consumo de líquido de arrefecimento sem vazamento externo visível, óleo no reservatório de expansão. O reparo preventivo do vedante da bomba a cada 20.000 km sai muito mais barato do que reparar um motor com fluidos misturados.',
  },
  {
    severity: 'WARN',
    title: 'Juntas e vedantes deteriorados pelo etanol E27 — troque o coolant a cada 2 anos',
    body: 'As juntas e vedantes do Rotax 4T foram projetados para condições europeias. O E27 brasileiro acelera o envelhecimento dos elastômeros. Sintoma de junta de cabeçote deteriorada: bolhas no reservatório de expansão, óleo com aparência leitosa. Preventivo: troque o líquido de arrefecimento a cada 2 anos usando coolant de qualidade (Prestone, Motorcraft) — fluido fresco mantém o pH protetor do sistema.',
  },
  {
    severity: 'WARN',
    title: 'Peças descontinuadas: inspecione tudo antes de comprar um Leonardo usado',
    body: 'O Leonardo 125 Rotax tem mais de 20 anos e algumas peças originais foram descontinuadas. Antes de comprar um usado: exija inspeção completa (compressão, verificação de vazamentos, teste a frio e a quente). Verifique o custo de importação das peças que suspeitar precisar — faça isso ANTES de fechar negócio. Pechinche no preço considerando que qualquer reparo de motor vai requerer importação europeia.',
  },
]

const LEONARDO125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo motor 10W-40 semissintético: troca a cada 3.000 km',
    body: 'O Rotax 4T do Leonardo usa 10W-40 semissintético. Capacidade: ~1,0–1,2L. Troque a cada 3.000 km. Use: Motul 3100 4T Gold, Castrol Go 4T, Shell Advance 4T. Troque o filtro de óleo a cada 6.000 km. Ao trocar o óleo, verifique simultaneamente o nível do líquido de arrefecimento — dois fluidos críticos para controlar neste motor.',
  },
  {
    severity: 'OK',
    title: 'Líquido de arrefecimento: inspeção mensal, troca completa a cada 2 anos',
    body: 'Verifique mensalmente o nível no reservatório de expansão (nunca abra o radiador com motor quente). Troca completa a cada 2 anos com mistura 50%/50% coolant + água destilada (não use água de torneira — cal calcifica o sistema). Marcas: Prestone, Motorcraft, Shell Coolant. Ao trocar, inspecione as mangueiras — estufadas, rachadas ou quebradiças = troque imediatamente.',
  },
  {
    severity: 'OK',
    title: 'Vela: consulte o manual para o código exato — troca a cada 6.000 km',
    body: 'Consulte o manual do proprietário ou anote o código gravado na vela original do seu ano/versão do Leonardo Rotax (ex: NGK CR8EH ou similar). Troca a cada 6.000 km. Custo: R$ 20–R$ 40. Ao instalar, aplique leve camada de anti-seize nas roscas se o cabeçote for de alumínio — evita emperrar ao remover futuramente. Torque: 12–14 N·m.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT: inspeção a cada 10.000 km, troca preventiva a cada 18.000 km',
    body: 'Inspecione a correia CVT a cada 10.000 km. Troca preventiva a cada 18.000 km. Para a dimensão exata do seu ano/versão, consulte o VIN do chassi e pesquise no heavy-tuned.de ou scooter-attack.de para o part number correto. Ao trocar a correia, troque também os rolos do variador se mostrarem desgaste.',
  },
]

// ─── Pegaso 650CC — Motor Rotax 655, 4T monocilíndrico, trail/adventure ─────
const PEGASO650_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sistema elétrico é a maior fraqueza da Pegaso — faça a reforma preventiva antes de precisar',
    body: 'O problema mais relatado pelos donos de Pegaso 650 no Brasil é o sistema elétrico: falhas intermitentes que surgem sem aviso em motos com mais de 15 anos. Causas mais comuns: conectores oxidados, aterramento (massa) com mau contato e a chave do descanso lateral (side stand switch) que para o motor aleatoriamente. Reforma preventiva — faça antes de qualquer problema aparecer: 1. Abra todos os conectores elétricos e aplique WD-40 Contact Cleaner + graxa dielétrica. 2. Adicione fio de aterramento extra do motor direto ao chassi. 3. Verifique a chave do descanso lateral — muitos donos fazem by-pass com resistor (busque o procedimento no Clube Pegaso 650: clubepegaso650.directorioforuns.com). 4. Bateria fraca causa cascata de problemas elétricos — uma nova bateria resolve surpresas inexplicáveis.',
  },
  {
    severity: 'OK',
    title: 'Carburador Mikuni BST33: limpe a cada 10.000 km e resolva 80% dos problemas de marcha',
    body: 'A Pegaso 650 usa o carburador Mikuni BST33 (tipo slide de 33mm) — qualidade boa, mas sensível a depósitos de combustível brasileiro. Sintomas de carburador sujo: motor que afoga ao acelerar do ralenti, dificuldade para ligar frio, consumo alto, marcha irregular. Limpeza: desmonte completamente, sopre os jatos com ar comprimido (nunca use arame), verifique a agulha de aceleração e a boia (float). Especificação do jato principal: 107.5 (versão padrão). Kit de reparo Mikuni BST33 no ML: "kit reparo carburador Mikuni BST" — custo R$ 40–R$ 80. Preventivo: se a moto ficar parada por mais de 3 semanas, drene o combustível do carburador pelo parafuso de dreno.',
  },
  {
    severity: 'WARN',
    title: 'Motor Rotax 655: peças internas difíceis no Brasil — a comunidade sabe onde achar',
    body: 'O motor Rotax 655 da Pegaso é robusto e durável quando bem mantido, mas suas peças internas não têm equivalente acessível no Brasil. A boa notícia: há uma comunidade ativa de donos que mapeou cada fornecedor. Antes de ir a qualquer oficina, acesse: portalbigtrails.com.br (seção Aprilia Pegaso) e o Clube Pegaso 650 (clubepegaso650.directorioforuns.com) — membros indicam mecânicos especializados por estado e fornecedores testados. Para importação de peças: GHMparts (Portugal, ghmparts.com), gmoto.pt e ebay.de são os mais recomendados pela comunidade brasileira.',
  },
  {
    severity: 'OK',
    title: 'NGK + SAE 5W-40: as duas peças que você sempre acha no Brasil para a Pegaso',
    body: 'Independente de qual peça estiver difícil de achar, estas nunca vão te deixar na mão: vela NGK (qualquer loja de moto ou auto-peças) e óleo SAE 5W-40 (padrão de alta performance, disponível em qualquer posto ou auto-peças). A Pegaso 650 usa 2,2L de óleo com o filtro — especificação API SG mínimo (qualquer 5W-40 semissintético ou sintético atual atende). Atenção ao comprar a vela: a Pegaso requer cap com resistor (resistor-cap spark plug) para compatibilidade com o CDI — especifique isso ao vendedor.',
  },
  {
    severity: 'OK',
    title: 'Importe via Portugal: frete razoável e estoque completo para a Pegaso',
    body: 'Para peças originais: GHMparts (Portugal) é o site mais recomendado pela comunidade brasileira — estoque amplo de peças Aprilia e Rotax, frete para Brasil ~R$ 200–300, prazo 10–15 dias. eBay Alemanha (ebay.de): maior variedade de peças novas e usadas, frete DHL R$ 220–380, prazo 10–20 dias. Para importar formalmente: peças com valor declarado até USD 100 geralmente passam pelos Correios sem tributação adicional. Acima disso: pode incidir 60% de imposto sobre (valor declarado + frete) — calcule antes de comprar.',
  },
]

const PEGASO650_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sistema elétrico instável: falhas intermitentes são a reclamação número 1 dos donos',
    body: 'Motor que para de repente enquanto anda (especialmente após 30–40 min de uso), lanternas que oscilam, dificuldade de dar partida mesmo com bateria boa — são os sintomas clássicos do sistema elétrico envelhecido da Pegaso 650. Diagnóstico em etapas: 1. Troque a bateria por uma nova (bateria fraca é causa-raiz de muitas falhas elétricas). 2. Limpe todos os conectores com WD-40 Contact Cleaner. 3. Desconecte temporariamente a chave do descanso lateral (side stand switch) para verificar se o motor para de travar. Se o problema persistir após essas três ações: revisão completa da fiação por eletricista de motos experiente.',
  },
  {
    severity: 'WARN',
    title: 'CDI Denso 070000-2170 que para a quente: moto desliga após 30–40 minutos',
    body: 'O CDI original da Pegaso 650 (módulo Denso 070000-2170) é suscetível à falha por calor — especialmente em modelos 1998–2000. Sintoma: moto arranca normal, anda 30–40 minutos e para abruptamente. Esfria 15–20 minutos, pega de novo. Diagnóstico: quando ocorrer, verifique se a vela dá faísca (desconecte o cabo, encoste no motor, tente dar a partida — deve ver faísca azul). Sem faísca com motor quente = CDI com defeito térmico. Solução: CDI substituto — pesquise no Clube Pegaso 650 (clubepegaso650.directorioforuns.com) quais módulos compatíveis a comunidade usa. Custo de importação: R$ 300–R$ 600.',
  },
  {
    severity: 'WARN',
    title: 'Assento de válvula desgastado: compressão cai após 40.000 km sem ajuste de folga',
    body: 'O motor Rotax 655 tem 5 válvulas por cilindro (3 admissão, 2 escape). Quando o ajuste de folga é ignorado, o assento sofre desgaste prematuro (pitting) por vibração — resultado: queda de compressão, dificuldade de ligar, perda de potência. Sintoma de folga excessiva: ruído metálico em "tique-taque" no cabeçote. Diagnóstico definitivo: teste de compressão (valor normal: 150–180 psi). Solução: ajuste de folga em oficina especializada. Se houver pitting no assento: retificação do cabeçote em mecânica de precisão (R$ 300–R$ 800).',
  },
  {
    severity: 'WARN',
    title: 'Boia do carburador travada: combustível escorre pelo dreno e motor afoga',
    body: 'A boia (float) do Mikuni BST33 pode travar na posição aberta por goma de combustível velho — especialmente se a moto ficou parada com combustível no tanque por semanas. Sintoma: cheiro forte de gasolina, combustível escorrendo pelo dreno do carburador, motor afogando rico (fumaça preta, vela preta e molhada). Solução imediata: feche o registro de combustível, desmonte o carburador e mergulhe a boia em combustível limpo por 30 minutos. Boia danificada: pesquise "float Mikuni BST33" no ML ou importe. Preventivo: sempre drene o carburador pelo parafuso de dreno se a moto ficar parada mais de 3 semanas.',
  },
]

const PEGASO650_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo SAE 5W-40: troca a cada 20.000 km ou 24 meses — 2,2L com o filtro',
    body: 'O motor Rotax 655 tem intervalos longos de troca de óleo: 20.000 km ou 24 meses, o que ocorrer primeiro. Capacidade: 2,15L sem filtro, 2,2L com filtro novo. Especificação: SAE 5W-40 API SG ou superior. Use semissintético ou sintético: Motul 3000+ 5W-40, Castrol Actevo 4T 5W-40, Shell Advance Ultra 4T 5W-40. Troque o filtro de óleo em toda troca. O número do filtro original Rotax pode ser cruzado para equivalentes no ML — pesquise pelo código gravado no filtro velho.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: verificação obrigatória a cada 20.000 km — entrada 0,10mm, saída 0,15mm',
    body: 'O motor Rotax 655 com 5 válvulas por cilindro exige verificação de folga a cada 20.000 km com motor FRIO. Folgas corretas: admissão 0,10mm; escape 0,15mm. Use calibradores (feeler gauges) de precisão. Esse trabalho requer desmontagem da tampa do cabeçote e experiência em motores com múltiplas válvulas — leve a um mecânico especializado. Nunca pule essa manutenção: folga fora de especificação causa desgaste prematuro do assento de válvula e queda progressiva de compressão.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: checagem a cada 6.000 km, troca a cada 12.000 km',
    body: 'Inspecione o filtro de ar a cada 6.000 km. Troque a cada 12.000 km — ou 6.000 km se usar a moto em estradas de terra ou com chuva frequente. O filtro de ar da Pegaso 650 pode ser encontrado em aftermarket no ML pesquisando "filtro ar Aprilia Pegaso 650" ou por dimensão. Instale sempre seco — nunca umedeça com óleo.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK com cap resistor: checagem a cada 10.000 km, troca a cada 20.000 km',
    body: 'A Pegaso 650 requer vela com cap de resistor (supressor de ruído) para compatibilidade com o sistema CDI. Ao comprar NGK, especifique que precisa do cap com resistor. Troca: a cada 20.000 km ou ao detectar falha de ignição. Custo: R$ 25–R$ 50. Torque de instalação: 12–15 N·m em cabeçote de alumínio.',
  },
  {
    severity: 'OK',
    title: 'Fluido de arrefecimento: inspeção mensal, troca completa a cada 2 anos',
    body: 'A Pegaso 650 é refrigerada a água. Verifique o nível no reservatório de expansão mensalmente — NUNCA abra o radiador com motor quente (risco de queimadura grave). Troca completa a cada 2 anos com mistura 50%/50% de coolant + água destilada (não use água de torneira — calcário entope o sistema). Use Prestone, Motorcraft ou equivalente. Ao trocar, inspecione as mangueiras: estufadas ou rachadas = troque imediatamente.',
  },
]

// ─── RSV 4 R (2009-2014) ────────────────────────────────────────────────────
// Motor: V4 65° 999cc DOHC 16v refrigerado a água, 180cv, 6 marchas
// Não importada oficialmente pela Piaggio Brasil — peças via importação

const RSV4R_MACETES: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall das bielas (NHTSA 10V029000): exija comprovante antes de comprar ou rodar',
    body: 'Motos fabricadas entre julho e outubro de 2009 saíram de fábrica com bielas defeituosas — risco de quebra catastrófica do motor em movimento. A Piaggio realizou recall e substituiu os motores completos gratuitamente. Se a moto do anúncio é de 2009 (número de série confirma a data de fabricação), exija comprovante de que o recall foi executado (nota fiscal de troca de motor, declaração do proprietário anterior ou verificação no NHTSA.gov buscando "10V029000"). Motores substituídos pós-recall são confiáveis — mas a checagem é inegociável antes de qualquer compra.',
  },
  {
    severity: 'WARN',
    title: 'Estator que queima: o problema elétrico mais relatado — kit RMSTATOR é a solução definitiva',
    body: 'O maior ponto fraco da RSV4 R primeira geração é o sistema de carregamento. O volante original usa ímãs de neodímio muito fortes que geram corrente AC excessiva, sobrecarregando o estator e queimando o retificador. Sintomas: bateria que não carrega, luz de baixo regime que oscila, moto que morre em ralenti. Solução temporária: substituir o retificador por um modelo MOSFET (roda mais frio, prolonga a vida útil). Solução definitiva: kit RMSTATOR (rmstator.com) com volante Kokusan + estator reforçado — elimina o excesso de calor na raiz. Custo USD 400–600, enviam para o Brasil. Importe antes que o problema apareça se a moto tiver mais de 30.000 km e nunca tiver passado por isso.',
  },
  {
    severity: 'OK',
    title: 'NGK CR9EB e Pirelli Diablo: o que você consegue no Brasil sem importar',
    body: 'A RSV4 R usa 4 velas — e a NGK CR9EB (a mesma de várias motos japonesas) está disponível em qualquer distribuidora NGK no Brasil. Custo: R$ 30–60 por vela, total de R$ 120–240 por troca. Para pneus: o Pirelli Diablo Rosso IV (120/70-17 dianteiro, 190/55-17 traseiro) é fabricado pela Pirelli em Feira de Santana (BA) e disponível em revendedores nacionais, embora o traseiro 190/55-17 exija encomenda prévia. Óleo SAE 15W-50 (Motul, Castrol, Shell), fluido DOT 4, corrente 525 RK ou DID — tudo disponível no mercado nacional. O restante precisa vir de fora.',
  },
  {
    severity: 'OK',
    title: 'AF1 Racing (EUA) e gmoto.pt (Portugal): os dois melhores fornecedores para peças OEM',
    body: 'Com a Piaggio Brasil fora de operação, a fonte de peças originais é importação direta. Os mais recomendados pela comunidade: AF1 Racing (af1racing.com) — especialistas em Aprilia nos EUA, catálogo completo para RSV4 2009-2020, envio internacional. gmoto.pt (Portugal) — frete menor para o Brasil do que os EUA, bom estoque de peças Aprilia italianas. eBay Alemanha (ebay.de) — para peças usadas e NOS (New Old Stock) a preços menores. Ao importar peças de moto (NCM 8714.10.00): valores até USD 50 via postal geralmente passam sem taxação; acima disso prepare para 60% de imposto sobre (valor + frete). Estratégia: agrupe várias peças em um único pedido para diluir o frete.',
  },
  {
    severity: 'OK',
    title: 'HealTech ESE-A01: elimina erro de válvula de escape sem reprogramar a ECU',
    body: 'Se você trocou o escapamento por um aftermarket (comum nessa moto), o erro de válvula AVC aparece no painel e em casos extremos a moto fica em modo de emergência. Solução sem precisar de remap: HealTech Exhaust Servo Eliminator ESE-A01 (motorvista.es ou smartmoto-electronics.com) — plugue-e-use, engana a ECU e elimina o erro. Para quem quer extrair mais potência: Power Commander V (Dynojet part 10-001, dynojet.com) ou UpMap (upmap.it) são as opções de tunagem mais usadas na RSV4 R. Há mecânicos especializados em motos italianas em SP que fazem flash via cabo EOBD.',
  },
]

const RSV4R_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Tensor da corrente do comando (CCT): barulho a frio nos primeiros segundos de partida',
    body: 'O tensor de corrente do comando (cam chain tensioner) original perde pressão de óleo quando o motor fica parado, causando um rangido ou barulho metálico nos primeiros 2–3 segundos após a partida a frio — some quando o motor aquece. Não é crítico imediatamente, mas indica desgaste progressivo da corrente e do tensor. Fix oficial Aprilia: retrofitar a arruela de borracha (part# B045476, 15x6x2mm) mais o tensor atualizado (part# 2A000111, disponível em af1racing.com / apworkshops.co.uk). Se a sua moto é 2009-2010, vale executar esse update preventivamente.',
  },
  {
    severity: 'WARN',
    title: 'Sensor da boia lateral (side stand switch) corroído: moto não liga ou corta em curva',
    body: 'O primeiro item a falhar em quase todos os RSV4. O sensor fica sob o cavalete lateral, exposto a barro, água e respingos — corrói rapidamente no clima brasileiro. Sintomas: moto não dá partida com o cavalete recolhido, ou corta o motor inexplicavelmente em curva. Diagnóstico: com cavalete recolhido e chave de ignição ligada, meça continuidade no conector do sensor — deve ter 0 ohms. Sem continuidade = sensor morto. Troca simples e barata (peça via af1racing.com). Compre dois: um para instalar agora e um de reserva.',
  },
  {
    severity: 'WARN',
    title: 'Tanque de combustível pressurizado pelo etanol: tampa difícil de abrir, cheiro forte',
    body: 'O tanque de polímero da RSV4 R não é adequadamente ventilado para combustíveis com alto teor de etanol. O E27 brasileiro (27% de etanol) agrava o problema de pressurização — o tanque infla com o calor, tornando a tampa difícil ou impossível de abrir após uso. Sintomas adicionais: cheiro persistente de combustível no estacionamento, deformação visual do tanque após uso. Workaround imediato: abra a tampa do tanque antes de guardar a moto para liberar a pressão. Use sempre combustível premium (menor concentração de etanol) quando possível. Existe kit de ventilação aftermarket para solução permanente.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível: falha intermitente por uso com nível baixo ou moto parada longa',
    body: 'Falhas intermitentes da bomba de combustível são relatadas, especialmente em motos com nível habitualmente baixo no tanque (a bomba é refrigerada pelo combustível — rodar com pouca gasolina diminui a vida útil) ou após período de inatividade longa. Sintomas: motor que corta em alta velocidade, mensagem "Service Urgent" no painel, ausência do som da bomba ao ligar a chave (prime típico). Diagnóstico: verifique fusíveis, conectores da bomba e pressão de combustível. Peça de reposição: importar via af1racing.com ou eBay.de. Prevenção: nunca deixar o nível cair abaixo de 1/4 do tanque.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito urbano: temperatura escala acima de 110°C no calor brasileiro',
    body: 'A RSV4 R é uma moto de pista com margens menores de refrigeração para velocidades baixas. Em cidades com trânsito pesado e calor (SP, RJ, etc.) a temperatura pode escalar rapidamente. Temperatura normal de operação: até 100°C. Acima de 105–110°C o ventilador do radiador entra. Acima de 115°C = problema a investigar. Verificação imediata: confirme se o ventilador ativa ao chegar em 105°C (teste com moto parada aquecendo). Manutenção preventiva: troque o líquido de arrefecimento se desconhecido (perde eficiência ao envelhecer). Em congestionamentos: pequenas acelerações periódicas aumentam o fluxo interno de óleo e ar.',
  },
]

const RSV4R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo SAE 15W-50 sintético: troca a cada 10.000 km (5.000 km em uso de pista) — 4L com filtro',
    body: 'A RSV4 R usa motor de alto desempenho — use sempre óleo fully synthetic SAE 15W-50 (recomendação Aprilia/AGIP TEC 4T). Equivalentes aceitos no Brasil: Motul 300V 15W-50, Castrol Power 1 Racing 10W-50, Mobil 1 Racing 4T 10W-40. Capacidade: ~3,8–4,0L com troca de filtro. Intervalo: 10.000 km em uso de rua; 5.000 km se usado em pista ou em climas muito quentes. Troque sempre o filtro junto. Ao drenar: atenção ao parafuso de drenagem no cárter — torque de aperto 20 N·m. Use junta nova a cada troca.',
  },
  {
    severity: 'WARN',
    title: 'Valvulagem: verificação obrigatória a cada 19.000 km — folgas pequenas indicam desgaste de assento',
    body: 'Verifique folgas de válvulas a cada ~19.000 km (12.000 milhas) com motor FRIO. Especificações: admissão 0,10–0,15 mm; escape 0,20–0,25 mm. Se as folgas estiverem consistentemente menores que o mínimo (0,10 mm admissão, 0,20 mm escape), isso indica desgaste dos assentos de válvula — não ignore. O acesso às válvulas no motor V4 compacto é trabalhoso: conta como serviço maior em qualquer oficina (custo elevado de mão de obra). Se comprar a moto sem histórico de manutenção, priorize esse item. Oficina de preferência: busque mecânicos com experiência em motos italianas ou superbikes.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK CR9EB: 4 unidades por troca — verificação a cada 12.000-15.000 km',
    body: 'A RSV4 R usa 4 velas — NGK CR9EB (disponível em distribuidoras NGK no Brasil, R$ 30–60 cada). Gap: 0,7–0,8 mm. Para uso de pista, use a versão mais fria NGK CR10EB. Intervalo: verificação a cada 12.000–15.000 km, troca a cada 20.000 km ou quando necessário. Ao instalar: aplique torque de 12 N·m no cabeçote de alumínio. A troca exige remover o radiador ou pelo menos deslocá-lo — trabalho de ~2 horas em oficina. Acesso às velas traseiras é especialmente limitado no motor V4.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 RK GXW ou DID VX3: lubrificar a cada 500 km, trocar a cada 20.000-25.000 km',
    body: 'A RSV4 R usa corrente final 525 com 106 elos. Relação original: 16 dentes frente / 40 dentes trás. Marcas disponíveis no Brasil: RK (GXW 525) e DID (525VX3) — distribuidores nacionais existem (Protork distribui RK). Lubrificação: a cada 500–600 km ou após chuva, com lubrificante de corrente spray (não use WD-40). Verificação de tensão: com moto no cavalete, afrouxamento máximo de 25–35 mm medido no ponto mais frouxo da corrente inferior. Troca: a cada 20.000–25.000 km (sempre troque corrente e coroas juntos).',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio e embreagem DOT 4: troca a cada 2 anos — RSV4 R 2009-2011 não tem ABS',
    body: 'A RSV4 R 2009-2011 não tem ABS (o ABS chegou no modelo 2013). Há dois circuitos hidráulicos: freios dianteiro/traseiro + embreagem hidráulica — todos usam DOT 4, troca a cada 2 anos independente da quilometragem (absorve umidade e perde ponto de ebulição). Disponível em qualquer posto ou loja no Brasil. Dica: quando trocar o fluido, inspecione os mancais da pinça Brembo M4 dianteira — pastilhas originais têm custo elevado de importação; alternativas EBC FA375HH são aprovadas para uso intenso e podem ser encontradas em lojas de performance ou importadas. Fluido de arrefecimento: 50%/50% coolant + água destilada, troca a cada 2 anos.',
  },
]

// ─── Blocos por modelo ──────────────────────────────────────────────────────
const apriliaModels: ModelBlock[] = [
  {
    modelName: 'RS 125',
    yearFrom: 1994,
    yearTo: 2012,
    MACETES:    RS125_MACETES,
    PROBLEMAS:  RS125_PROBLEMAS,
    MANUTENCAO: RS125_MANUTENCAO,
  },
  {
    modelName: 'SR 50',
    yearFrom: 1994,
    yearTo: 2010,
    MACETES:    SR50_MACETES,
    PROBLEMAS:  SR50_PROBLEMAS,
    MANUTENCAO: SR50_MANUTENCAO,
  },
  {
    modelName: 'SCARABEO 150',
    yearFrom: 2002,
    yearTo: 2015,
    MACETES:    SCARABEO150_MACETES,
    PROBLEMAS:  PROBLEMAS_PIAGGIO_LEADER_BASE,
    MANUTENCAO: SCARABEO150_MANUTENCAO,
  },
  {
    modelName: 'ATLANTIC 125',
    yearFrom: 2002,
    yearTo: 2010,
    MACETES:    ATLANTIC125_MACETES,
    PROBLEMAS:  PROBLEMAS_PIAGGIO_LEADER_BASE,
    MANUTENCAO: ATLANTIC125_MANUTENCAO,
  },
  {
    modelName: 'LEONARDO 125',
    yearFrom: 1997,
    yearTo: 2004,
    MACETES:    LEONARDO125_MACETES,
    PROBLEMAS:  LEONARDO125_PROBLEMAS,
    MANUTENCAO: LEONARDO125_MANUTENCAO,
  },
  {
    modelName: 'PEGASO 650CC',
    yearFrom: 1998,
    yearTo: 2002,
    MACETES:    PEGASO650_MACETES,
    PROBLEMAS:  PEGASO650_PROBLEMAS,
    MANUTENCAO: PEGASO650_MANUTENCAO,
  },
  {
    modelName: 'RSV 4 R',
    yearFrom: 2009,
    yearTo: 2014,
    MACETES:    RSV4R_MACETES,
    PROBLEMAS:  RSV4R_PROBLEMAS,
    MANUTENCAO: RSV4R_MANUTENCAO,
  },
]

// ─── Calibragem de pneus ────────────────────────────────────────────────────
const apriliaPressoesCalibr: TirePressureInput[] = [
  {
    modelName: 'RS 125',
    yearFrom: 1994,
    yearTo: 2012,
    tireSize: 'Dianteiro 110/70-17 | Traseiro 150/60-17',
    frontPsi: 29,
    rearPsi: 32,
    frontPsiLoad: 31,
    rearPsiLoad: 36,
    notes: 'Versão clássica (1994–2012). Calibre sempre a frio com moto no cavalete. Pneus esportivos de aro 17" — Pirelli Diablo Rosso, Michelin Pilot Power disponíveis nessa medida.',
  },
  {
    modelName: 'SR 50',
    yearFrom: 1994,
    yearTo: 2010,
    tireSize: '130/60-13 (dianteiro e traseiro)',
    frontPsi: 22,
    rearPsi: 25,
    frontPsiLoad: 24,
    rearPsiLoad: 28,
    notes: 'Pneus simétricos 130/60-13 aro 13". Calibre a frio. Com garupa: traseiro 28 PSI. Disponíveis no Brasil: Pirelli SL38, Michelin S1.',
  },
  {
    modelName: 'SCARABEO 150',
    yearFrom: 2002,
    yearTo: 2015,
    tireSize: 'Dianteiro 120/70-12 | Traseiro 130/70-12',
    frontPsi: 22,
    rearPsi: 26,
    frontPsiLoad: 24,
    rearPsiLoad: 29,
    notes: 'Aro 12". Calibre sempre a frio. Com garupa: traseiro 29 PSI. Pirelli SL26 ou Michelin S1 disponíveis nessa medida no Brasil.',
  },
  {
    modelName: 'ATLANTIC 125',
    yearFrom: 2002,
    yearTo: 2010,
    tireSize: 'Dianteiro 120/70-14 | Traseiro 140/70-13',
    frontPsi: 22,
    rearPsi: 26,
    frontPsiLoad: 24,
    rearPsiLoad: 29,
    notes: 'Aro 14" dianteiro, 13" traseiro. Calibre sempre a frio. Maxi-scooters concentram mais peso no traseiro — não descuide da calibragem.',
  },
  {
    modelName: 'LEONARDO 125',
    yearFrom: 1997,
    yearTo: 2004,
    tireSize: 'Dianteiro 100/80-16 | Traseiro 120/80-16',
    frontPsi: 22,
    rearPsi: 26,
    frontPsiLoad: 24,
    rearPsiLoad: 29,
    notes: 'Aro 16" — medidas típicas do Leonardo 125. Confirme no manual do proprietário ou na etiqueta do chassis. Calibre sempre a frio.',
  },
  {
    modelName: 'PEGASO 650CC',
    yearFrom: 1998,
    yearTo: 2002,
    tireSize: 'Dianteiro 100/90-19 | Traseiro 130/80-17',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 32,
    rearPsiLoad: 36,
    notes: 'Trail com aro 19" dianteiro e 17" traseiro. Calibre sempre a frio. Com garupa ou carga: traseiro 36 PSI. Marcas disponíveis no Brasil: Michelin Anakee, Pirelli MT60, Mitas E-07, Continental TKC70 — todas compatíveis com uso misto (asfalto + terra).',
  },
  {
    modelName: 'RSV 4 R',
    yearFrom: 2009,
    yearTo: 2014,
    tireSize: 'Dianteiro 120/70-ZR17 | Traseiro 190/55-ZR17',
    frontPsi: 33,
    rearPsi: 36,
    frontPsiLoad: 36,
    rearPsiLoad: 41,
    notes: 'Superbike V4, aro 17" dianteiro e traseiro. Calibre sempre a frio. Com garupa: dianteiro 36 PSI, traseiro 41 PSI. Pneus disponíveis no Brasil: Pirelli Diablo Rosso IV (fabricado em Feira de Santana/BA — o 190/55-17 traseiro exige encomenda prévia), Michelin Power RS, Bridgestone Battlax RS11. Em pista: consulte as especificações do pneu escolhido — pressões para uso em circuito são distintas das de rua.',
  },
]

// ─── Cronogramas de Manutenção por Modelo ────────────────────────────────────

const apriliaMaintenanceItems: MaintenanceItemInput[] = [

  // ── RS 125 (2T Rotax 122/123, carburador Dell'Orto PHBH 28, corrente 420) ──
  { modelName: 'RS 125', yearFrom: 1994, yearTo: 2012, order: 0,
    component: 'Óleo 2T sintético — proporção 2% (20 mL/litro)', intervalKm: null, intervalMonths: null, priority: 'CRITICAL',
    notes: 'INEGOCIÁVEL: use sempre óleo 2T sintético ou semissintético (Yamalube 2T, Motul 710/800, Castrol Power 1 2T). Proporção: 20 mL por litro de gasolina (1:50 = 2%). Nunca misture marcas no mesmo tanque. Óleo barato de roçadeira ou barco degrada a válvula RAVE com depósito de carbono e aumenta o risco de gripagem do cilindro Nikasil — dano irreparável.' },
  { modelName: 'RS 125', yearFrom: 1994, yearTo: 2012, order: 1,
    component: 'Vela NGK BR9EG', intervalKm: 3000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor 2T de alta rotação exige troca frequente. Troque a cada 3.000 km. Ao retirar, leia a cor: cinza-marrom claro = mistura correta; preta e úmida = mistura rica; branca/amarelada = mistura POBRE (risco de fundir pistão — pare imediatamente e ajuste o carburador). Custo: R$ 25–40 em distribuidoras NGK.' },
  { modelName: 'RS 125', yearFrom: 1994, yearTo: 2012, order: 2,
    component: 'Válvula RAVE — limpeza preventiva', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'A válvula RAVE (Rotax Adjustable Variable Exhaust) abre em ~7.000 RPM e libera a faixa de potência. Quando entope de carbono, o motor perde tudo acima de 7.000 RPM. Limpeza a cada 5.000 km: retire a capa (3 parafusos Phillips, lado esquerdo do cilindro), remova guilhotina e mola, limpe com WD-40 e pano seco. Reinstale SEM graxa — graxa atrai mais carbono.' },
  { modelName: 'RS 125', yearFrom: 1994, yearTo: 2012, order: 3,
    component: 'Corrente 420 — lubrificação e tensão', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'Lubrificação a cada 500 km ou após chuva com spray específico (não WD-40). Tensão correta: ~20 mm de folga no ponto mais frouxo com moto no cavalete central. Kit (corrente + pinhoneira + coroa) a cada 15.000–20.000 km.' },
  { modelName: 'RS 125', yearFrom: 1994, yearTo: 2012, order: 4,
    component: 'Câmara de expansão — limpeza interna', intervalKm: 15000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'O escapamento 2T faz parte do processo de combustão — carbonização interna reduz potência em 20–30%. Limpeza a cada 15.000 km: retire o escapamento, coloque brevemente no fogo ao ar livre, bata com martelo de borracha após esfriar — o carbono cai. Nunca tente limpar com produtos químicos por dentro.' },
  { modelName: 'RS 125', yearFrom: 1994, yearTo: 2012, order: 5,
    component: 'Pastilhas de freio — inspeção', intervalKm: 8000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Disco dianteiro e traseiro. Inspecione a cada 8.000 km. Espessura mínima: 1,5 mm. Pastilhas genéricas para "Aprilia RS 125" disponíveis no ML (R$ 40–80 o par). EBC ou Galfer são upgrades que duram mais e mordem melhor.' },
  { modelName: 'RS 125', yearFrom: 1994, yearTo: 2012, order: 6,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'LOW',
    notes: 'Troque a cada 2 anos — o DOT 4 absorve umidade mesmo sem abrir o circuito. Sangre o sistema ao trocar. Freio esponjoso ou com curso maior que o normal = fluido degradado ou ar no circuito.' },

  // ── SR 50 (2T Minarelli horizontal, CVT, reservatório de óleo 2T separado) ──
  { modelName: 'SR 50', yearFrom: 1994, yearTo: 2010, order: 0,
    component: 'Nível de óleo 2T — verificação a cada uso', intervalKm: null, intervalMonths: null, priority: 'CRITICAL',
    notes: 'O SR 50 tem bomba de óleo 2T com reservatório separado (~0,5 L). Verifique o nível ANTES DE SAIR toda vez. Se o reservatório esvaziar enquanto anda, a gripagem acontece em segundos — dano irreparável ao cilindro. Use semissintético ou sintético: Yamalube 2T, Motul 710, Castrol Power 1 2T. Nunca coloque óleo 4T no reservatório.' },
  { modelName: 'SR 50', yearFrom: 1994, yearTo: 2010, order: 1,
    component: 'Correia CVT + rolos variador — inspeção', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a correia a cada 5.000 km: rachaduras, fissuras ou desgaste lateral = troca imediata. Troca preventiva: 12.000–15.000 km. Rolos do variador: meça com paquímetro — abaixo de 14,5 mm de diâmetro (forma de batata) = troque. ML: "kit variador scooter Minarelli horizontal" ou "rolos 15g scooter" — R$ 80–200 o kit.' },
  { modelName: 'SR 50', yearFrom: 1994, yearTo: 2010, order: 2,
    component: 'Vela NGK BR8HS', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troque a cada 5.000 km. Custo: R$ 15–25. Sintomas de vela gasta: dificuldade de ligar, falhas na aceleração, aumento de consumo de óleo 2T. Ao instalar: gap 0,6–0,7 mm, torque 12 N·m (não aperte demais no cabeçote de alumínio).' },
  { modelName: 'SR 50', yearFrom: 1994, yearTo: 2010, order: 3,
    component: 'Filtro de ar (esponja) — limpeza', intervalKm: 3000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Lave com detergente neutro, seque completamente e aplique leve camada de óleo de filtro. Troque a cada 6.000 km se desgastado. Filtro sujo causa mistura rica, aumento de consumo de óleo e fumaça azul excessiva.' },
  { modelName: 'SR 50', yearFrom: 1994, yearTo: 2010, order: 4,
    component: 'Pastilhas de freio e embreagem CVT', intervalKm: 5000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Pastilhas do freio dianteiro: mínimo 1,5 mm. Tambor traseiro: lonas mínimo 2 mm. A embreagem centrífuga dentro do variador tem pastilhas que desgastam: sintoma de embreagem gasta = patinamento em alta rotação (motor acelera mas scooter não acompanha). Troque embreagem + correia juntos quando necessário.' },
  { modelName: 'SR 50', yearFrom: 1994, yearTo: 2010, order: 5,
    component: 'Conectores elétricos — limpeza anual', intervalKm: null, intervalMonths: 12, priority: 'LOW',
    notes: 'Desconecte e reconecte todos os conectores elétricos anualmente. Aplique spray dielétrico (WD-40 Contact Cleaner + vaselina) nos conectores para evitar oxidação. CDI defeituoso é comum — guarde-o fora do baú para evitar superaquecimento. Bateria fraca causa falhas intermitentes inexplicáveis.' },

  // ── SCARABEO 150 (4T Piaggio LEADER 150cc, CVT, ar refrigerado) ─────────────
  { modelName: 'SCARABEO 150', yearFrom: 2002, yearTo: 2015, order: 0,
    component: 'Óleo do motor (10W40 semissintético API SJ)', intervalKm: 3000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: ~0,9–1,0 L. Use 10W40 semissintético API SJ: Motul 3000+ 10W40, Castrol Go 10W40, Shell Advance 4T. NÃO use 20W50 — o motor Piaggio LEADER opera quente e precisa de óleo fluido. Troque o filtro de óleo a cada 6.000 km (em toda segunda troca de óleo). Compatível com Vespa LX 150 e Piaggio Fly 150.' },
  { modelName: 'SCARABEO 150', yearFrom: 2002, yearTo: 2015, order: 1,
    component: 'Correia CVT + rolos variador — inspeção', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: 'Abra a tampa do variador (parafusos Phillips) a cada 10.000 km. Inspecione a correia: rachaduras, fissuras ou desgaste lateral = troca imediata. Troca preventiva: 20.000 km. Ao trocar a correia, troque também os rolos e inspecione a embreagem centrífuga. ML: "kit variador Piaggio 150" ou "correia CVT Vespa LX 150" — R$ 120–280.' },
  { modelName: 'SCARABEO 150', yearFrom: 2002, yearTo: 2015, order: 2,
    component: 'Vela NGK CR7HSA', intervalKm: 6000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troque a cada 6.000 km. Custo: R$ 20–35. Cor da vela velha: marrom-acinzentado = mistura correta; preta e molhada = mistura rica; branca = mistura pobre. Torque: 12–14 N·m. Qualquer concessionária Vespa ou mecânico de scooter Piaggio tem acesso a essa vela.' },
  { modelName: 'SCARABEO 150', yearFrom: 2002, yearTo: 2015, order: 3,
    component: 'Pastilhas de freio — inspeção', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'Scooters urbanos desgastam pastilhas rapidamente. Inspecione a cada 5.000 km. Espessura mínima: 1–1,5 mm. Pesquise "pastilha Piaggio Leader 150" ou "pastilha Vespa LX 150" no ML — R$ 30–80 o par. Ao trocar, limpe o pistão da pinça com graxa específica para freio.' },
  { modelName: 'SCARABEO 150', yearFrom: 2002, yearTo: 2015, order: 4,
    component: 'Filtro de ar (Vespa LX 150) — substituição', intervalKm: 10000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'O filtro de ar do Scarabeo é o mesmo da Vespa LX 150. Troque a cada 10.000–12.000 km ou anualmente. Custo: R$ 30–60 original, R$ 15–30 genérico. Pesquise "filtro ar Vespa LX 150" no ML. Instale sempre seco — nunca umedeça com óleo.' },
  { modelName: 'SCARABEO 150', yearFrom: 2002, yearTo: 2015, order: 5,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'LOW',
    notes: 'Troque a cada 2 anos. Sangre o sistema ao trocar. Alavanca com curso maior que o normal ou freio que perde mordida em descidas = fluido degradado ou ar no circuito.' },

  // ── ATLANTIC 125 (4T Piaggio LEADER 125cc, CVT, ar refrigerado) ─────────────
  { modelName: 'ATLANTIC 125', yearFrom: 2002, yearTo: 2010, order: 0,
    component: 'Óleo do motor (10W40 semissintético API SJ)', intervalKm: 3000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: ~0,9–1,0 L. Use 10W40 semissintético API SJ. Mesmo motor Piaggio LEADER da família Vespa GT 125 — qualquer mecânico de scooter Piaggio/Vespa conhece. NÃO use 20W50. Troque o filtro de óleo a cada 6.000 km.' },
  { modelName: 'ATLANTIC 125', yearFrom: 2002, yearTo: 2010, order: 1,
    component: 'Correia CVT + rolos variador — inspeção', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a cada 10.000 km. Troca preventiva: 20.000 km. Pesquise "correia CVT Piaggio Leader 125" ou "correia CVT Vespa GT 125" no ML. Ao trocar, substitua também os rolos do variador e inspecione a embreagem centrífuga. Correia rompida = scooter imóvel sem saída.' },
  { modelName: 'ATLANTIC 125', yearFrom: 2002, yearTo: 2010, order: 2,
    component: 'Vela NGK CR7HSA', intervalKm: 6000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troque a cada 6.000 km. Custo: R$ 20–35. O maxi-scooter Atlantic tem porta-objetos amplo — guarde uma vela reserva junto com o manual. Torque de instalação: 12–14 N·m em cabeçote de alumínio.' },
  { modelName: 'ATLANTIC 125', yearFrom: 2002, yearTo: 2010, order: 3,
    component: 'Pastilhas de freio — inspeção', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'O Atlantic concentra mais peso no eixo traseiro que scooters menores — desgaste do pneu traseiro e das pastilhas é mais acelerado. Inspecione a cada 5.000 km. Espessura mínima: 1,5 mm. Compatível com peças Vespa GT 125.' },
  { modelName: 'ATLANTIC 125', yearFrom: 2002, yearTo: 2010, order: 4,
    component: 'Filtro de ar (Piaggio Leader 125) — substituição', intervalKm: 10000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Mesmo filtro da família Piaggio LEADER 125. Troque anualmente ou a cada 10.000 km. Custo: R$ 25–55 original ou genérico. Filtro sujo aumenta consumo e pode causar funcionamento irregular da EFI (modelos mais novos).' },
  { modelName: 'ATLANTIC 125', yearFrom: 2002, yearTo: 2010, order: 5,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'LOW',
    notes: 'Troque a cada 2 anos. Sangre o circuito dianteiro e traseiro ao trocar. O Atlantic tem porte maior e mais peso — fluido degradado piora muito a distância de frenagem.' },

  // ── LEONARDO 125 (4T Rotax refrigerado a água, CVT) ────────────────────────
  { modelName: 'LEONARDO 125', yearFrom: 1997, yearTo: 2004, order: 0,
    component: 'Óleo do motor (10W40 semissintético)', intervalKm: 3000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: ~1,0–1,2 L. Use 10W40 semissintético API SJ: Motul 3100 4T Gold, Castrol Go 4T, Shell Advance 4T. Troque o filtro de óleo a cada 6.000 km. Ao trocar o óleo, verifique simultaneamente o nível do líquido de arrefecimento — dois fluidos críticos neste motor.' },
  { modelName: 'LEONARDO 125', yearFrom: 1997, yearTo: 2004, order: 1,
    component: 'Fluido de arrefecimento — inspeção e troca', intervalKm: null, intervalMonths: 24, priority: 'CRITICAL',
    notes: 'Verifique o nível no reservatório de expansão MENSALMENTE (NUNCA abra o radiador com motor quente — risco de queimadura grave). Troca completa a cada 2 anos com mistura 50%/50% coolant + água destilada (não use água de torneira — cal calcifica o sistema). Prestone, Motorcraft ou Shell Coolant. Inspecione as mangueiras ao trocar.' },
  { modelName: 'LEONARDO 125', yearFrom: 1997, yearTo: 2004, order: 2,
    component: 'Correia CVT + rolos variador — inspeção', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a cada 10.000 km. Troca preventiva: 18.000 km. Para o Leonardo Rotax, consulte heavy-tuned.de ou scooter-attack.de para o part number correto da correia pelo VIN do chassi. Ao trocar, substitua os rolos do variador se mostrarem desgaste.' },
  { modelName: 'LEONARDO 125', yearFrom: 1997, yearTo: 2004, order: 3,
    component: 'Vela (NGK CR8EH ou conforme manual) — troca', intervalKm: 6000, intervalMonths: null, priority: 'HIGH',
    notes: 'Consulte o manual ou o código gravado na vela atual — o Leonardo Rotax teve variações ao longo dos anos. Modelo frequente: NGK CR8EH ou similar. Troque a cada 6.000 km. Aplique leve camada de anti-seize nas roscas em cabeçote de alumínio. Torque: 12–14 N·m.' },
  { modelName: 'LEONARDO 125', yearFrom: 1997, yearTo: 2004, order: 4,
    component: 'Pastilhas de freio — inspeção', intervalKm: 5000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Inspecione a cada 5.000 km. Espessura mínima: 1,5 mm. Para peças específicas do Leonardo Rotax, consulte scooter-attack.de ou heavy-tuned.de (Alemanha). Frete DHL para Brasil: R$ 200–400 conforme o peso.' },
  { modelName: 'LEONARDO 125', yearFrom: 1997, yearTo: 2004, order: 5,
    component: 'Filtro de ar — substituição', intervalKm: 8000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Troque a cada 8.000 km ou anualmente. Peça específica do Leonardo Rotax — importar de scooter-attack.de ou heavy-tuned.de. Se não disponível, meça o filtro original e busque por dimensão no ML como alternativa.' },
  { modelName: 'LEONARDO 125', yearFrom: 1997, yearTo: 2004, order: 6,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'LOW',
    notes: 'Troque a cada 2 anos. Sangre o circuito ao trocar. Ao trocar, verifique também o vedante da bomba d\'água — desgaste entre 20.000–30.000 km causa mistura de fluidos (óleo com aparência de "café com leite").' },

  // ── PEGASO 650CC (4T Rotax 655, carburador Mikuni BST33, corrente, liquid) ──
  { modelName: 'PEGASO 650CC', yearFrom: 1998, yearTo: 2002, order: 0,
    component: 'Óleo SAE 5W40 API SG (2,2 L com filtro)', intervalKm: 20000, intervalMonths: 24, priority: 'CRITICAL',
    notes: 'Intervalo LONGO específico do Rotax 655: 20.000 km ou 24 meses. Volume: 2,15 L sem filtro / 2,2 L com filtro novo. Use 5W40 semissintético ou sintético API SG: Motul 3000+ 5W40, Castrol Actevo 4T 5W40, Shell Advance Ultra. Troque sempre o filtro junto. Filtre o número do filtro original para encontrar equivalente no ML.' },
  { modelName: 'PEGASO 650CC', yearFrom: 1998, yearTo: 2002, order: 1,
    component: 'Fluido de arrefecimento — inspeção e troca', intervalKm: null, intervalMonths: 24, priority: 'CRITICAL',
    notes: 'Verifique mensalmente o nível no reservatório de expansão (NUNCA abra o radiador com motor quente). Troca completa a cada 2 anos com mistura 50%/50% coolant + água destilada. Prestone ou Motorcraft. Ao trocar: inspecione mangueiras (estufadas ou rachadas = troque imediatamente). Mangueiras do Rotax 655 importar de GHMparts.com (Portugal) ou eBay.de.' },
  { modelName: 'PEGASO 650CC', yearFrom: 1998, yearTo: 2002, order: 2,
    component: 'Folga de válvulas (IN 0,10 / EX 0,15 mm) — 5 válvulas', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor Rotax 655 com 5 válvulas por cilindro (3 admissão, 2 escape). Verifique com motor FRIO a cada 20.000 km. IN: 0,10 mm. EX: 0,15 mm. Use calibradores (feeler gauges) de precisão. Folga fora de especificação causa desgaste prematuro do assento e queda progressiva de compressão. Serviço para mecânico especializado.' },
  { modelName: 'PEGASO 650CC', yearFrom: 1998, yearTo: 2002, order: 3,
    component: 'Corrente — lubrificação e tensão', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'Lubrificação a cada 500 km ou após chuva com spray de corrente. Tensão: ~25 mm de folga no ponto mais frouxo. A comunidade Clube Pegaso 650 (clubepegaso650.directorioforuns.com) indica kits compatíveis testados — consulte antes de comprar corrente ou coroas avulsas.' },
  { modelName: 'PEGASO 650CC', yearFrom: 1998, yearTo: 2002, order: 4,
    component: 'Filtro de ar — inspeção e troca', intervalKm: 6000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Inspecione a cada 6.000 km. Troque a cada 12.000 km — ou 6.000 km se usar em estradas de terra ou com chuva frequente. Pesquise "filtro ar Aprilia Pegaso 650" no ML ou por dimensão. Instale sempre seco.' },
  { modelName: 'PEGASO 650CC', yearFrom: 1998, yearTo: 2002, order: 5,
    component: 'Vela NGK (cap com resistor) — troca', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'A Pegaso requer vela com CAP DE RESISTOR (supressor de ruído) — especifique ao comprar NGK. Troca a cada 20.000 km ou ao detectar falha de ignição. Custo: R$ 25–50. Torque: 12–15 N·m. O CDI Denso 070000-2170 original é suscetível a falha por calor após 30–40 min — verifique faísca quando suspeitar.' },
  { modelName: 'PEGASO 650CC', yearFrom: 1998, yearTo: 2002, order: 6,
    component: 'Carburador Mikuni BST33 — limpeza preventiva', intervalKm: 10000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Limpe o Mikuni BST33 a cada 10.000 km: desmonte completamente, sopre os jatos com ar comprimido (nunca arame), verifique agulha de aceleração e boia. Kit de reparo: "kit reparo carburador Mikuni BST" no ML — R$ 40–80. PREVENTIVO: se a moto ficar parada 3+ semanas, drene o carburador pelo parafuso de dreno para evitar boia travada.' },
  { modelName: 'PEGASO 650CC', yearFrom: 1998, yearTo: 2002, order: 7,
    component: 'Fluido de freio (DOT 4) e sistema elétrico', intervalKm: null, intervalMonths: 24, priority: 'LOW',
    notes: 'Troque o DOT 4 a cada 2 anos. Reforma elétrica preventiva: limpeza de todos os conectores com WD-40 Contact Cleaner + graxa dielétrica. Fio extra de aterramento do motor ao chassi. Verifique a chave do descanso lateral (side stand switch) — causa principal de motor que para inesperadamente.' },

  // ── RSV 4 R (V4 999cc DOHC, 4 velas, corrente 525, liquid-cooled) ────────────
  { modelName: 'RSV 4 R', yearFrom: 2009, yearTo: 2014, order: 0,
    component: 'Óleo SAE 15W50 sintético (4,0 L com filtro)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Motor V4 de alto desempenho — apenas fully synthetic SAE 15W50 (AGIP TEC 4T ou equivalente). Alternativas aceitas: Motul 300V 15W50, Castrol Power 1 Racing 10W50, Mobil 1 Racing 4T 10W40. Volume: ~4,0 L com filtro. Intervalo: 10.000 km em uso de rua; 5.000 km em uso de pista ou calor extremo. Sempre troque o filtro junto.' },
  { modelName: 'RSV 4 R', yearFrom: 2009, yearTo: 2014, order: 1,
    component: 'Fluido de arrefecimento — inspeção e troca', intervalKm: null, intervalMonths: 24, priority: 'CRITICAL',
    notes: 'Verifique o nível mensalmente. Troca completa a cada 2 anos: mistura 50%/50% coolant + água destilada. Em congestionamentos com calor (SP, RJ): acompanhe o indicador de temperatura — normal até 100°C; acima de 105°C o ventilador entra; acima de 115°C = problema. Confirme que o ventilador ativa ao aquecer (teste com moto parada).' },
  { modelName: 'RSV 4 R', yearFrom: 2009, yearTo: 2014, order: 2,
    component: 'Valvulagem (IN 0,10–0,15 / EX 0,20–0,25 mm)', intervalKm: 19000, intervalMonths: null, priority: 'HIGH',
    notes: 'Verifique folgas a cada ~19.000 km (~12.000 mi) com motor FRIO. IN: 0,10–0,15 mm. EX: 0,20–0,25 mm. Folgas consistentemente abaixo do mínimo = desgaste de assentos de válvula — não ignore. O acesso ao motor V4 compacto é trabalhoso (conta como serviço maior). Oficinas com experiência em superbikes italianas fazem esse serviço.' },
  { modelName: 'RSV 4 R', yearFrom: 2009, yearTo: 2014, order: 3,
    component: 'Velas NGK CR9EB — 4 unidades', intervalKm: 15000, intervalMonths: null, priority: 'HIGH',
    notes: '4 velas por troca — NGK CR9EB (disponível em distribuidoras NGK no Brasil, R$ 30–60 cada = R$ 120–240 total). Gap: 0,7–0,8 mm. Para uso de pista, use CR10EB (mais fria). A troca exige remover ou deslocar o radiador — serviço de ~2 horas. As velas traseiras do V4 são de acesso especialmente limitado.' },
  { modelName: 'RSV 4 R', yearFrom: 2009, yearTo: 2014, order: 4,
    component: 'Corrente 525 RK/DID — lubrificação', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'Lubrificação a cada 500–600 km com spray de corrente. Tensão: 25–35 mm de folga no ponto mais frouxo inferior com moto no cavalete. Relação original: 16/40. Troca (corrente + coroas juntos): 20.000–25.000 km. Distribuidores nacionais: RK (GXW 525) via Protork; DID (525VX3) em lojas de performance.' },
  { modelName: 'RSV 4 R', yearFrom: 2009, yearTo: 2014, order: 5,
    component: 'Fluido de freio + embreagem (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Três circuitos hidráulicos: freio dianteiro, freio traseiro e embreagem hidráulica — todos usam DOT 4, troca a cada 2 anos. A RSV4 2009-2011 NÃO tem ABS. Pastilhas Brembo M4 dianteiras têm custo de importação elevado — alternativas EBC FA375HH são aprovadas para uso intenso.' },
  { modelName: 'RSV 4 R', yearFrom: 2009, yearTo: 2014, order: 6,
    component: 'Filtro de ar — verificação', intervalKm: 10000, intervalMonths: null, priority: 'LOW',
    notes: 'Verifique a cada 10.000 km. Troque quando sujo ou danificado. Peça via af1racing.com (EUA) ou gmoto.pt (Portugal). Atenção ao sistema elétrico: o estator original é o principal ponto fraco — se a moto tiver mais de 30.000 km sem nunca ter passado por problema de carregamento, considere atualizar preventivamente para kit RMSTATOR.' },
]

// ─── Runner ─────────────────────────────────────────────────────────────────
async function main() {
  console.log('🏍️  Seed APRILIA iniciando...\n')

  const motoType = await prisma.vehicleType.upsert({
    where: { slug: 'moto' },
    update: {},
    create: { slug: 'moto', label: 'Moto' },
  })

  const aprilBrand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'APRILIA', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'APRILIA', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${aprilBrand.name}`)

  for (const block of apriliaModels) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: aprilBrand.id } },
      update: {},
      create: { name: block.modelName, brandId: aprilBrand.id },
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
      `  🔧 ${block.modelName} (${block.yearFrom ?? '?'}–${block.yearTo ?? '?'}): ` +
      `${counts.m} macetes, ${counts.p} problemas, ${counts.mt} manutenção`,
    )
  }

  console.log('\n  📏 Calibragem de pneus...')
  for (const tp of apriliaPressoesCalibr) {
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
  const modelNames = [...new Set(apriliaMaintenanceItems.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: apriliaMaintenanceItems.map(item => ({
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
    const count = apriliaMaintenanceItems.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = apriliaModels.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed APRILIA concluído: ${apriliaModels.length} modelos, ${totalTips} dicas, ${apriliaPressoesCalibr.length} calibragens, ${apriliaMaintenanceItems.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
