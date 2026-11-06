/**
 * Seed ADLY (Her Chee Industrial) — macetes, problemas e manutenção
 * Cobre os principais scooters ADLY vendidos/importados no Brasil
 *
 * Motor 2T Minarelli (1E40QMB): JAGUAR JT-50, RT-50, GTA-50, Noble-50, Thunder Bike-50
 * Motor 2T 100cc: JAGUAR JT-100
 *
 * Fontes: ADLY RT-50 Service Manual (ManualsLib #880930), Monster Scooter Parts,
 *         Bikez.com/motorcycles/adly, 50factory.com, VMC Chinese Parts,
 *         scooter-attack.com, Tabela FIPE Brasil, Wemoto UK, OLX/ML Brasil
 *
 * Execute: pnpm --filter @motormacete/database db:seed:adly
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

// ─── Dicas compartilhadas — plataforma Minarelli 1E40QMB (2 tempos 50cc) ─────
// Usadas com variações pelos modelos JAGUAR JT-50, RT-50, GTA-50, Noble-50, Thunder Bike

const MACETES_MINARELLI_BASE: TipInput[] = [
  {
    severity: 'WARN',
    title: 'O segredo para achar qualquer peça: diga "motor Minarelli 1E40QMB"',
    body: 'O maior problema do dono de ADLY é o mecânico que nunca ouviu falar da marca. A solução: ignore o nome ADLY. O motor dos scooters 50cc da marca é o Minarelli 1E40QMB (ou 1PE40QMB) — exatamente o mesmo motor do Yamaha Jog 50, Yamaha Vino e MBK Nitro 50. Qualquer mecânico que conhece scooter 50cc de duas rodas conhece esse motor. No Mercado Livre, pesquise "Minarelli 1E40QMB" antes de qualquer pesquisa específica de ADLY — você encontrará carburador, CDI, kit de cilindro, pistão, correia, rolos, bobina e vela prontos para entrega.',
  },
  {
    severity: 'OK',
    title: 'Carburador PZ19J: por ~R$ 60 no ML você resolve o problema mais comum',
    body: 'O carburador original é o PZ19J (19mm de diâmetro de admissão) — o mesmo usado em qualquer scooter 50cc 2T de plataforma Minarelli/Jog. Pesquise no Mercado Livre: "carburador PZ19 scooter 2 tempos" ou "carburador Yamaha Jog 50cc". Preço médio: R$ 50–R$ 120. O bystarter (choke automático elétrico) é parte crítica: quando falha, a moto afoga no frio e anda rica. Se trocar o carburador todo, já vem com bystarter incluso — não compre o bystarter separado, pois o conjunto completo sai mais barato. Instale sempre o filtro de combustível antes do carburador — o tanque enferruja por dentro e a ferrugem entope o carburador em semanas.',
  },
  {
    severity: 'OK',
    title: 'CDI com defeito? Substituição por R$ 30–50 resolve na hora',
    body: 'O CDI da plataforma Minarelli (2 tempos) é um módulo AC-CDI de 5 pinos, o mais simples e barato do mercado de scooters. Quando falha: moto não pega faísca, para de repente em temperatura (falha a quente) ou fica com ignição errática. Diagnóstico rápido: esquente o CDI com secador de cabelo por 2 minutos — se a moto para de funcionar, o CDI está com componente quebrado pelo calor. Compre na ML: "CDI scooter 2 tempos 50cc" ou "CDI Minarelli" — qualquer AC-CDI de 5 pinos para Minarelli funciona. Custo: R$ 30–R$ 60. Instale o CDI novo em local com ventilação, fora do baú, para evitar acúmulo de calor.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT e rolos do variador: a revisão que evita parar na estrada',
    body: 'O scooter ADLY usa CVT automática (sem câmbio manual). Dois itens falham e deixam você sem tração: a correia e os rolos do variador. Correia: inspecione a cada 5.000 km — rachadura ou desgaste visível = troca imediata. Troque preventivamente a cada 12.000–15.000 km. Pesquise no ML pela dimensão da correia original (meça a correia velha: comprimento × largura em mm). Rolos (roletes do variador): originais com 15,0 mm de diâmetro. Quando desgastam para 14,5 mm, a aceleração fica mole e surgem vibrações. Troque quando desgastados. Pesquise: "rolo variador scooter 50cc 15mm" ou "roletes CVT Minarelli". Kit correia + rolos: R$ 80–R$ 180 genérico, dura bem.',
  },
  {
    severity: 'WARN',
    title: 'Etanol E27 do Brasil corrói os vedantes do carburador em 1–2 anos',
    body: 'O carburador dos ADLYs foi projetado para gasolina pura (sem etanol). O combustível brasileiro E27 (27% de etanol) ataca as borrachas internas — especialmente o float (boia plástica) e os vedantes do assento da agulha. Sintoma: carburador vaza combustível pelo dreno, moto afoga mesmo com o choke desligado, ou fica com mistura muito rica. Solução 1 (curto prazo): kit de reparo com vedantes resistentes a etanol — pesquise "kit reparo carburador scooter 50cc 2 tempos". Custo: R$ 25–R$ 50. Solução 2 (definitiva): instale carburador novo PZ19J e adicione 1 mL de aditivo anticorrosão por litro de combustível para prolongar a vida útil.',
  },
  {
    severity: 'OK',
    title: 'Pastilhas de freio, filtros e rolamentos: tudo é "scooter chinês 50cc"',
    body: 'ADLY usa componentes genéricos da plataforma Minarelli/50cc chinesa. Quando precisar: Pastilhas de freio dianteiro (disco): meça as dimensões das pastilhas velhas (largura × altura × espessura) e procure no ML por "pastilha scooter 50cc disco". Qualquer fabricante que forneça para "scooter chinês" vai ter. Filtro de óleo (4T) ou filtro de ar: "filtro ar scooter 50cc 2 tempos". Rolamentos de roda: anote o código gravado no rolamento (ex: 6301, 6302) e compre qualquer NSK, SKF ou FAG — mesma qualidade, dez vezes mais barato que OEM. Tambor traseiro: "lona freio scooter 110mm" ou 130mm dependendo do modelo.',
  },
  {
    severity: 'OK',
    title: 'Importação direta: adlyparts.com (EUA) e AliExpress "1E40QMB" para peças OEM',
    body: 'Para peças que não encontrar no Brasil, importe diretamente. adlyparts.com (EUA) tem catálogo completo para todos os modelos Her Chee — use o modelo exato. Frete para Brasil: ~USD 25–40, prazo 15–25 dias. No AliExpress, pesquise "1E40QMB parts" ou "Minarelli engine parts" — piston kit, crankshaft, reed valve, head gasket. Preços 60–80% mais baratos que ML com a mesma qualidade (mesma fábrica). Na Europa: scooter-attack.com e scooter-center.com têm estoque completo Minarelli. Lembre: importações acima de USD 50 podem ter taxas na alfândega brasileira.',
  },
]

const PROBLEMAS_MINARELLI_BASE: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Peças originais ADLY são praticamente inexistentes no Brasil',
    body: 'Não existe importador oficial da ADLY no Brasil com estoque de peças. Nenhum mecânico terá peças ADLY no estoque. Ao precisar de manutenção, a estratégia correta é abandonar a busca por "peça ADLY" e substituir diretamente por equivalentes Minarelli 1E40QMB (para motores 2 tempos) ou GY6/QMB139 (para modelos 4 tempos mais novos). Peças OEM só via importação do exterior (adlyparts.com nos EUA ou scooter-attack.com na Europa) — prazo 2–4 semanas, custo de frete. Para uso no Brasil, peças genéricas Minarelli são a solução prática e econômica.',
  },
  {
    severity: 'WARN',
    title: 'CDI falha a quente — sintoma clássico: para depois de 10–15 min de uso',
    body: 'A falha mais comum na plataforma Minarelli é o CDI que funciona no frio mas para depois que o motor esquenta. Se a moto funciona bem nos primeiros 10 minutos e depois perde ignição ou para completamente, o CDI é o suspeito número 1. Deixe a moto esfriar 20 minutos — se voltar a funcionar, CDI confirmado. Diagnóstico alternativo: com o motor aquecido e a moto parada, segure o CDI com a mão — se estiver quente demais para segurar, está superaquecendo. Solução: CDI novo da plataforma Minarelli (~R$ 40) instalado em local ventilado fora do baú.',
  },
  {
    severity: 'WARN',
    title: 'Carburador entupido pelo etanol: o problema mais frequente em ADLYs parados',
    body: 'Scooters ADLY que ficam parados por mais de 30 dias com gasolina no tanque desenvolvem entupimento no carburador por ressecamento/oxidação dos resíduos de etanol. A gasolina E27 evapora deixando um verniz marrom que entope o piloto automático e o difusor. Sintoma: moto não pega mesmo com bateria e faísca boas, ou pega muito mal no frio. Solução: desmonte o carburador, mergulhe em "limpa carburador" por 30 minutos, passe ar comprimido em todos os orifícios. Se os vedantes estiverem duros/rachados, use kit de reparo com borrachas resistentes ao etanol. Se o carburador estiver muito comprometido: um PZ19J novo custa R$ 60–R$ 100 e resolve definitivamente.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT rompe sem aviso — inspecione antes de qualquer viagem longa',
    body: 'A correia CVT é o item mais crítico para a mobilidade do scooter ADLY. Quando rompe, a moto perde toda tração instantaneamente — a roda traseira trava, com risco de queda. Correias de plataforma Minarelli duram 10.000–15.000 km em condições normais, mas envelhecimento por calor e ozônio pode rachá-la com menos quilometragem. Inspecione visualmente a cada 5.000 km ou a cada 12 meses: rachuras visíveis, desgaste nas bordas ou fios expostos = troca imediata. Sempre tenha uma correia reserva se for rodar acima de 50 km de distância.',
  },
  {
    severity: 'OK',
    title: 'Conectores elétricos oxidados: a causa invisível de falhas elétricas',
    body: 'Os conectores elétricos genéricos dos scooters ADLY oxidam rapidamente no clima úmido brasileiro. Oxidação nos conectores causa falhas intermitentes: luz que pisca, CDI que corta, farol que apaga sozinho. Diagnóstico: sacuda o chicote elétrico com a moto ligada — se os problemas surgem/somem com movimento, são conectores. Solução: desconecte cada conector, limpe com contato elétrico spray, reconecte. Aplique graxa de dieletric (silicone) nos conectores reconectados. Custo: R$ 15–R$ 25 por spray. Faça isso preventivamente se a moto tiver mais de 5 anos.',
  },
]

const MANUTENCAO_MINARELLI_BASE: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Reservatório de óleo 2T: verifique antes de cada saída — nunca esvaziar',
    body: 'Os scooters ADLY 2 tempos com injeção automática de óleo têm um reservatório lateral (~1,1 L) que alimenta a bomba de óleo. Se o reservatório esvaziar enquanto o motor está girando, o pistão funde em segundos — sem aviso, sem segunda chance. Antes de cada uso, verifique o nível pela janelinha do reservatório. Mantenha sempre acima de 1/4 do reservatório. Use óleo 2T sintético ou semissintético (Motul 510, Ipone Samourai, Bardahl). Em viagens longas (acima de 100 km), leve um frasco de óleo 2T na mochila.',
  },
  {
    severity: 'OK',
    title: 'Vela de ignição: NGK BP7HS ou BPR7HS — disponível em qualquer autopeças',
    body: 'A vela correta para os modelos ADLY 50cc 2 tempos (Minarelli) é a NGK BP7HS ou BPR7HS (com rosca de cobre). A vela original dos modelos JAGUAR pode ser especificada como B7HSL — substitua por NGK B7HS sem problemas. Abertura do eletrodo: 0,6–0,7 mm. Inspecione a cada 3.000 km e troque a cada 4.000–5.000 km. Uma vela gasta causa dificuldade de partida, consumo maior de óleo 2T e perda de potência. Custo: R$ 18–R$ 35 na NGK. Leve sempre uma vela reserva no suporte porta-ferramentas.',
  },
  {
    severity: 'OK',
    title: 'Calibragem dos pneus: 21 PSI dianteiro, 25 PSI traseiro (frio)',
    body: 'Conforme o manual de serviço oficial ADLY RT-50, a pressão correta é 1,50 kgf/cm² (21 PSI) no pneu dianteiro e 1,75 kgf/cm² (25 PSI) no pneu traseiro — sempre medida com o pneu frio (moto parada há pelo menos 30 minutos). Scooters 50cc têm pneus pequenos (10" ou 12") e a pressão incorreta afeta dramaticamente a estabilidade em curvas. Não exceda 27 PSI traseiro mesmo com garupa — risco de deslizamento em piso molhado.',
  },
  {
    severity: 'OK',
    title: 'CVT: troque a correia a cada 12.000–15.000 km e os rolos a cada 8.000 km',
    body: 'Manutenção preventiva da CVT evita a parada brusca por quebra de correia. Correia: inspecione a cada 5.000 km (rachuras ou desgaste nas bordas = troca imediata), troca preventiva a cada 12.000–15.000 km. Rolos do variador (originais: 15,0 mm de diâmetro): meça com paquímetro a cada 8.000 km — substitua quando abaixo de 14,5 mm. Sintoma de rolos desgastados: scooter sai devagar do zero e vibra em aceleração. Pesquise no ML: "rolo variador 15mm scooter" ou "kit CVT scooter 50cc". Troque correia e rolos sempre juntos.',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio DOT 4: troca a cada 2 anos nos modelos com freio a disco',
    body: 'Os ADLYs com freio dianteiro a disco usam fluido DOT 4. O fluido absorve umidade ao longo do tempo, abaixando o ponto de ebulição — em frenagens longas pode "ferver" e deixar o freio esponjoso. Troque o fluido a cada 2 anos com sangria completa do sistema. Use sempre DOT 4 (nunca DOT 3). Inspecione também a pastilha de freio: quando a espessura chegar a 2 mm, troque — pesquise no ML por "pastilha scooter 50cc disco" e meça as dimensões da pastilha original para garantir compatibilidade.',
  },
]

// ─── Blocos por modelo ────────────────────────────────────────────────────────

const adlyTips: ModelBlock[] = [

  // ── JAGUAR JT 50 (1997–1999) ────────────────────────────────────────────────
  // Motor: 2 tempos 50cc Minarelli | Tipo: scooter step-through
  // Vela: B7HSL original (= NGK B7HS)
  {
    modelName: 'JAGUAR JT 50',
    yearFrom: 1997,
    yearTo: 1999,

    MACETES: [
      ...MACETES_MINARELLI_BASE,
      {
        severity: 'OK',
        title: 'Vela B7HSL é intercambiável com NGK B7HS — encontre em qualquer loja',
        body: 'O código B7HSL original do JAGUAR JT-50 é equivalente direto à NGK B7HS, vendida em qualquer autopeças do Brasil por R$ 18–R$ 30. A mesma vela é usada no Suzuki AG100, Caloi AE50 e outros scooters da mesma era — o código cruzado garante disponibilidade mesmo em cidades pequenas. Abertura: 0,6–0,7 mm.',
      },
      {
        severity: 'WARN',
        title: 'Com mais de 25 anos de fabricação: verifique chassis e pinos de ancoragem',
        body: 'O JAGUAR JT 50 foi fabricado entre 1997 e 1999 — as unidades que ainda circulam no Brasil têm pelo menos 25 anos. Verifique os pinos do guidão, parafusos do freio traseiro e ancoragem do motor antes de cada temporada. Preste atenção em ferrugem nos parafusos do escapamento — se não soltar, use penetrante (WD-40) 24h antes. Nunca force — a rosca do cabeçote alumínio parte facilmente.',
      },
    ],

    PROBLEMAS: [
      ...PROBLEMAS_MINARELLI_BASE,
      {
        severity: 'WARN',
        title: 'Mangueiras de combustível endurecidas — vazamento silencioso',
        body: 'Com mais de 25 anos, as mangueiras de borracha que conduzem combustível do tanque ao carburador estão endurecidas e com microfissuras. Vazamento de combustível em scooter é risco de incêndio. Troque todas as mangueiras por borracha resistente a etanol (NBR ou Viton) — compre no metro em loja de borrachas industriais. Diâmetro interno típico: 6 mm. Custo: R$ 5–R$ 10 por metro. Inspecione visualmente as mangueiras em toda troca de óleo.',
      },
    ],

    MANUTENCAO: [
      ...MANUTENCAO_MINARELLI_BASE,
    ],
  },

  // ── JAGUAR JT 100 (1997–1998) ───────────────────────────────────────────────
  // Motor: 2 tempos 100cc | Tipo: scooter
  {
    modelName: 'JAGUAR JT 100',
    yearFrom: 1997,
    yearTo: 1998,

    MACETES: [
      ...MACETES_MINARELLI_BASE,
      {
        severity: 'OK',
        title: 'Motor 100cc: mais peças compatíveis com Suzuki AG100 e similares',
        body: 'O JAGUAR JT-100 tem motor 2 tempos 100cc — diferente do 50cc dos outros ADLYs. Para este motor, além das pesquisas por "Minarelli 100cc", também pesquise por "scooter 100cc 2 tempos" e compare com o Suzuki AG100 e Honda/Dax 100cc da era. A vela B7HSL é compartilhada com o Suzuki AG100 e o Caloi AE50. Para o carburador e CDI, meça e compare o motor físico com scooters 100cc 2T da época — as plataformas asiáticas de 100cc dessa geração têm alto grau de compatibilidade de peças.',
      },
      {
        severity: 'WARN',
        title: 'Unidade de produção limitada: veja se as peças do JT-50 encaixam antes de importar',
        body: 'O JAGUAR JT-100 foi produzido por apenas 2 anos (1997–1998) em volume pequeno. Para peças estruturais específicas (carenagem, quadro, tanque), a importação é praticamente obrigatória via adlyparts.com ou scooter-attack.com. Antes de importar peças do motor, verifique se a versão 50cc (1E40QMB) é compatível — algumas peças do bloco são compartilhadas entre versões 50 e 100cc na mesma família de motores.',
      },
    ],

    PROBLEMAS: [
      ...PROBLEMAS_MINARELLI_BASE,
      {
        severity: 'WARN',
        title: 'Peças ainda mais escassas que o JT-50 pelo menor volume de produção',
        body: 'O JAGUAR JT-100 teve produção menor que o JT-50, tornando peças específicas (carenagem, tanque, guidão, painel) mais difíceis de encontrar. O motor em si segue a família 2T 100cc com mais compatibilidade cross-marca. Para estrutura e carenagem, a única opção prática é importar via adlyparts.com (EUA) usando o código do modelo "JAGUAR JT 100". Alternativamente, lojas especializadas em scooters taiwaneses antigos podem ter peças de outros modelos Her Chee adaptáveis.',
      },
    ],

    MANUTENCAO: [
      ...MANUTENCAO_MINARELLI_BASE,
    ],
  },

  // ── RT 50 ────────────────────────────────────────────────────────────────────
  // Motor: 49cc 2T Minarelli 1E40QMB | Vela: NGK BP7HS | Carb: PZ19J
  // Pneus: tipicamente 3.50-10 ou 100/90-10 (scooter 10")
  {
    modelName: 'RT 50',
    yearFrom: null,
    yearTo: null,

    MACETES: [
      ...MACETES_MINARELLI_BASE,
      {
        severity: 'OK',
        title: 'Pneus 3.50-10: mesmos dos scooters Yamaha Jog — fáceis de achar',
        body: 'O RT-50 usa pneus aro 10" (3.50-10 ou equivalente 100/90-10) — exatamente os mesmos dos scooters Yamaha Jog 50, Biz 100 e similares da era. Qualquer loja de motos que atende scooters vai ter esse pneu em estoque. Marcas nacionais (Pirelli Sava SC1, Rinaldi BS32) e importadas (Michelin City Grip, Maxxis) encaixam perfeitamente. Nunca instale pneu de largura maior sem conferir a folga da carenagem — risco de atrito em curva.',
      },
      {
        severity: 'OK',
        title: 'Reed valve (palheta de admissão): inspecione a cada 10.000 km',
        body: 'O motor Minarelli 1E40QMB do RT-50 usa palheta de admissão (reed valve) de plástico ou fibra de carbono. Quando a palheta racha ou perde elasticidade, o motor perde potência, aumenta o consumo de óleo e fica com partida difícil. Inspecione visualmente a cada 10.000 km ou quando a moto estiver com perda de potência inexplicada. Pesquise no ML: "reed valve Minarelli 50cc" ou "palheta admissão scooter 2T". Custo: R$ 30–R$ 70. Troque sempre que houver dúvida — é barata e faz grande diferença.',
      },
    ],

    PROBLEMAS: [
      ...PROBLEMAS_MINARELLI_BASE,
    ],

    MANUTENCAO: [
      ...MANUTENCAO_MINARELLI_BASE,
      {
        severity: 'OK',
        title: 'Vela NGK BP7HS: especificação oficial do RT-50 pelo manual ADLY',
        body: 'O manual de serviço oficial ADLY RT-50 especifica a vela NGK BP7HS (código 5111). Esta vela é encontrada em qualquer autopeças por R$ 20–R$ 35. Inspecione a cada 3.000 km e troque a cada 4.000–5.000 km. Observe a cor do eletrodo após 1.000 km: marrom claro = mistura ideal; preto e molhado = mistura rica (problema no bystarter); branco = mistura pobre (perigo de motor quente). A vela "fala" o estado do motor.',
      },
    ],
  },

  // ── GTA 50 ───────────────────────────────────────────────────────────────────
  // Motor: 49cc 2T Minarelli | CVT | Freio: disco dianteiro, tambor traseiro
  {
    modelName: 'GTA 50',
    yearFrom: null,
    yearTo: null,

    MACETES: [
      ...MACETES_MINARELLI_BASE,
      {
        severity: 'OK',
        title: 'Freio disco dianteiro + tambor traseiro: manutenção simples e peças genéricas',
        body: 'O GTA-50 tem freio dianteiro a disco (pinça chinesa de pistão simples) e tambor traseiro — a combinação mais comum em scooters asiáticos 50cc. Pastilha de freio dianteiro: meça as dimensões da pastilha original (ex: 33 × 34 × 7 mm) e pesquise no ML por tamanho — qualquer fabricante "scooter chinês" vai encaixar. Lona de freio traseira: informe o diâmetro do tambor (geralmente 110 mm) ao comprar — pesquise "lona freio tambor 110mm". Ambas as peças custam R$ 30–R$ 60 e são trocáveis por qualquer mecânico.',
      },
    ],

    PROBLEMAS: [
      ...PROBLEMAS_MINARELLI_BASE,
    ],

    MANUTENCAO: [
      ...MANUTENCAO_MINARELLI_BASE,
    ],
  },

  // ── Thunder Bike (2004–2010) ─────────────────────────────────────────────────
  // Motor: 49.3cc 2T Minarelli | Pneus 120/70-12 (aro 12) | Peso seco: 77 kg
  // Potência: 3,7 cv @ 5.500 rpm | Tanque: 6 L | Vela: NGK BPR7HS ou NGK 6422
  {
    modelName: 'Thunder Bike',
    yearFrom: 2004,
    yearTo: 2010,

    MACETES: [
      ...MACETES_MINARELLI_BASE,
      {
        severity: 'OK',
        title: 'Pneus 120/70-12: aro 12" incomum, mas encaixa pneus de maxi-scooter chinês',
        body: 'O Thunder Bike usa pneus 120/70-12 (aro 12") nas duas rodas — diferente do aro 10" da maioria dos scooters. Essa medida é encontrada em maxi-scooters chineses de 125cc–150cc (Dafra Citycom, Kasinski Flash, Sundown Freemax) e em alguns pneus importados. No ML pesquise: "pneu 120 70 12 scooter" — há opções da Pirelli (SL36), Michelin (City Grip) e marcas chinesas. O aro 12" proporciona melhor amortecimento que o 10" em piso deteriorado. Evite pneus de aro 10" mesmo com adaptadores — risco de contato na carenagem.',
      },
      {
        severity: 'OK',
        title: 'Com 77 kg de peso seco e estilo naked: exige mais atenção nos rolamentos de roda',
        body: 'O Thunder Bike tem estrutura mais robusta que os scooters tradicionais de carenagem fechada — 77 kg seco é considerável para um 50cc. Os rolamentos das rodas sofrem mais esforço, especialmente nas bordas de calçada e buracos. Inspecione os rolamentos das duas rodas a cada 15.000 km: gire a roda levantada — se sentir repuxo ou ruído, troque. Anote o código do rolamento original (geralmente estampado na lateral: 6301, 6302 ou similar) e compre em distribuidoras de rolamentos (NSK, SKF, FAG) por 1/5 do preço de OEM.',
      },
      {
        severity: 'OK',
        title: 'Tanque de 6 L: autonomia de ~90–110 km — planeje abastecimentos',
        body: 'Com motor 2T de 49cc e consumo de ~55–65 km/L, o tanque de 6 L do Thunder Bike dá autonomia real de 90–110 km. Em viagens, planeje abastecimentos a cada 80 km para margem de segurança. A moto não tem medidor de combustível — use o hodômetro e o reserva (alguns modelos têm torneira de reserva, verifique o seu). Gasolina pura (se disponível) melhora o consumo e preserva os vedantes do carburador vs. etanol E27.',
      },
    ],

    PROBLEMAS: [
      ...PROBLEMAS_MINARELLI_BASE,
      {
        severity: 'WARN',
        title: 'Estilo naked expõe o motor: verifique proteção de componentes elétricos',
        body: 'Ao contrário dos scooters com carenagem fechada, o Thunder Bike tem o motor mais exposto. Em chuva, os conectores elétricos e o CDI ficam expostos a respingos. Aplique graxa dielétrica em todos os conectores e envolva o CDI em borracha isolante ou posicione-o em local protegido. Se a moto para na chuva e volta a funcionar quando seca, é sinal de conector ou CDI sem proteção adequada.',
      },
    ],

    MANUTENCAO: [
      ...MANUTENCAO_MINARELLI_BASE,
      {
        severity: 'OK',
        title: 'Vela NGK BPR7HS ou NGK 6422: especificação para o Thunder Bike',
        body: 'Os modelos Thunder Bike 50 usam NGK BPR7HS (com resistência interna) ou NGK 6422 como equivalente — confirme o modelo exato do seu motor para não errar. A letra "R" indica resistência interna (suprimir interferência elétrica), importante em motos com painel digital. Abertura: 0,6–0,7 mm. Troque a cada 4.000–5.000 km ou ao perceber dificuldade de partida. Custo: R$ 22–R$ 40.',
      },
    ],
  },

  // ── Noble 50 ─────────────────────────────────────────────────────────────────
  // Motor: 49cc 2T Minarelli | Scooter step-through
  {
    modelName: 'Noble 50',
    yearFrom: null,
    yearTo: null,

    MACETES: [
      ...MACETES_MINARELLI_BASE,
    ],

    PROBLEMAS: [
      ...PROBLEMAS_MINARELLI_BASE,
    ],

    MANUTENCAO: [
      ...MANUTENCAO_MINARELLI_BASE,
    ],
  },
]

// ─── Calibragem de pneus ──────────────────────────────────────────────────────

const adlyTirePressures: TirePressureInput[] = [
  // RT-50: dados do manual oficial ADLY (ManualsLib #880930)
  {
    modelName: 'RT 50',
    yearFrom: null,
    yearTo: null,
    tireSize: '3.50-10 / 3.50-10',
    frontPsi: 21,
    rearPsi: 25,
    frontPsiLoad: null,
    rearPsiLoad: null,
    notes: 'Pressão do manual oficial ADLY RT-50: 1,50 kgf/cm² diant. e 1,75 kgf/cm² tras. Sempre medir com pneu frio.',
  },
  // Thunder Bike 50: pneus 120/70-12 (aro 12")
  {
    modelName: 'Thunder Bike',
    yearFrom: 2004,
    yearTo: 2010,
    tireSize: '120/70-12 / 120/70-12',
    frontPsi: 21,
    rearPsi: 25,
    frontPsiLoad: null,
    rearPsiLoad: 28,
    notes: 'Pneus aro 12" — mesma pressão base dos scooters Minarelli. Com garupa, adicionar 3 PSI no traseiro.',
  },
  // JAGUAR JT-50 / JT-100: pneus aro 10" típicos de scooter da era
  {
    modelName: 'JAGUAR JT 50',
    yearFrom: 1997,
    yearTo: 1999,
    tireSize: '3.50-10 / 3.50-10',
    frontPsi: 20,
    rearPsi: 23,
    frontPsiLoad: null,
    rearPsiLoad: 26,
    notes: 'Pneus aro 10" típicos da geração. Pressão estimada por plataforma — sempre ajuste conforme a carga e o tipo de piso.',
  },
  {
    modelName: 'JAGUAR JT 100',
    yearFrom: 1997,
    yearTo: 1998,
    tireSize: '3.50-10 / 3.50-10',
    frontPsi: 21,
    rearPsi: 25,
    frontPsiLoad: null,
    rearPsiLoad: 28,
    notes: 'Motor 100cc gera mais peso no trem traseiro — calibre o traseiro 2 PSI a mais que o RT-50 sob carga.',
  },
  // GTA-50: similar ao RT-50
  {
    modelName: 'GTA 50',
    yearFrom: null,
    yearTo: null,
    tireSize: '3.50-10 / 3.50-10',
    frontPsi: 21,
    rearPsi: 25,
    frontPsiLoad: null,
    rearPsiLoad: 28,
    notes: 'Mesma plataforma do RT-50 — pressões idênticas. Com garupa, suba o traseiro para 28 PSI.',
  },
  // Noble-50: similar ao RT-50
  {
    modelName: 'Noble 50',
    yearFrom: null,
    yearTo: null,
    tireSize: '3.50-10 / 3.50-10',
    frontPsi: 21,
    rearPsi: 25,
    frontPsiLoad: null,
    rearPsiLoad: 28,
    notes: 'Plataforma Minarelli 50cc. Pressão base: 21/25 PSI. Verifique se seu modelo usa aro 10" ou 12".',
  },
]

// ─── Runner ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed ADLY — iniciando...')

  const motoType = await prisma.vehicleType.upsert({
    where: { slug: 'moto' },
    update: {},
    create: { slug: 'moto', label: 'Moto' },
  })

  const adlyBrand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'ADLY', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'ADLY', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${adlyBrand.name}`)

  for (const block of adlyTips) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: adlyBrand.id } },
      update: {},
      create: { name: block.modelName, brandId: adlyBrand.id },
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
  for (const tp of adlyTirePressures) {
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

  const totalTips = adlyTips.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed ADLY concluído: ${adlyTips.length} modelos, ${totalTips} dicas, ${adlyTirePressures.length} calibragens.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
