// seed-mv-agusta-f4-legacy.ts — MV Agusta F4 750 Oro, F4 750s Prata, F4-R312, F4-1000, F4-1000 RR, F4 1078RR 312
// Linhagem supersport 4 cilindros em linha desenhada por Massimo Tamburini (também autor da Ducati 916).
// Motos de colecionador de baixíssima produção — rede MV Agusta no Brasil é minúscula, peças originais
// são caras/raras. Ênfase forte em peças alternativas, importação e comunidade de proprietários.
// Execute: pnpm --filter @motormacete/database db:seed:mv-agusta-f4-legacy
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

// ─── F4 750 ORO (F4 750 Ouro) ──────────────────────────────────────────────────
// Motor: 749,4cc DOHC 16v, 4 cilindros em linha | 126cv @ 12.500 rpm | 72 Nm @ 10.500 rpm
// Injeção Weber-Marelli | Refrigeração líquida | Compressão 12,0:1
// Óleo: ~3,0L (motor+filtro, verificar manual) API SL/SM sintético 10W-40 ou 5W-40 | Vela: NGK CR9EB/CR9EKB
// Pneu: 120/65 ZR17 (F) / 190/50 ZR17 (R) | Corrente 525 | Tanque 21L
// Produção: 1999-2001 (revelada na EICMA 1997, entregas a partir de maio 1999), limitada a ~300 unidades no mundo
// Rodas, basculante e chassi em magnésio anodizado dourado; carenagem/tanque em fibra de carbono
// Valor de colecionador: item raríssimo, negociado na casa de €30.000-60.000+ dependendo do estado/km

const F4750ORO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo sintético 10W-40 ou 5W-40 API SL — troca anual mesmo com pouco uso',
    body: 'O motor 749,4cc DOHC 16v tem embreagem a seco (não precisa JASO MA) — pode usar óleo de moto ou automotivo de alta qualidade API SL/SM totalmente sintético 10W-40 ou 5W-40. Capacidade aproximada de 3,0L com troca de filtro (confirme no manual do proprietário específico da sua unidade — houve variação entre lotes). Marcas recomendadas: Motul 300V 10W-40 ou 15W-50 Factory Line, Shell Advance Ultra 4T. Como é moto de baixíssima quilometragem/uso esporádico (típico de colecionador), troque o óleo TODO ANO mesmo rodando pouco — o óleo degrada e absorve umidade parado na garagem.',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK CR9EB / CR9EKB — mas confirme com mecânico especializado antes de trocar',
    body: 'O manual de oficina da linha F4 lista NGK CR9EB (ou CR9EKB conforme o lote/ano) como padrão. Há relatos na comunidade internacional (MV Agusta Forum) de proprietários usando NGK CR9EIX (iridium) como upgrade para partidas mais consistentes em motos que ficam paradas por longos períodos. Como a F4 750 Oro teve produção muito pequena e variações entre unidades, o ideal é confirmar a vela correta com um especialista em MV Agusta antes de comprar — usar a vela errada pode causar falha de ignição ou detonação.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas: serviço caro e trabalhoso — requer remoção de tanque e carenagem completa',
    body: 'O motor DOHC 16v da F4 exige acesso ao topo do cabeçote para checar/ajustar folga de válvulas por pastilha (shim), e isso significa desmontar carenagem completa, tanque de combustível e airbox — um dos serviços mais trabalhosos do mercado de motos esportivas. Nos EUA/Europa, oficinas especializadas cobram o equivalente a R$ 5.000–8.000 pelo serviço completo (o que inclui aproveitar a desmontagem para trocar velas, filtro de combustível e inspecionar mangueiras). Intervalo recomendado: a cada 12.000 km ou anualmente se a moto roda pouco. NUNCA pule esse item — válvula fora de folga pode causar dano sério ao motor em uma moto que já é rara e cara de recuperar.',
  },
  {
    severity: 'DANGER',
    title: 'Peças de motor e elétrica: raríssimas no Brasil — busque em importadores especializados',
    body: 'A rede MV Agusta no Brasil é pequena e a Oro é um modelo descontinuado há mais de 20 anos — muitas peças específicas (magnésio dourado, carenagem em carbono original) não têm mais fabricação. Para peças mecânicas (juntas, retentores, rolamentos, correntes), procure fornecedores italianos especializados como Motorsport Center Italia, MV Agusta Forum (seção de classificados internacionais) ou importadoras de peças para motos exóticas europeias (ex: EuroMoto Parts, FPS Torino). Para peças de desgaste comuns ao motor 4 cilindros italiano (retentores, juntas do motor), peças genéricas de mesma medida costumam servir — mas confirme sempre a medida exata antes de comprar, pois a Oro teve variações de lote.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em partes douradas e cromadas: cuidado redobrado em climas úmidos',
    body: 'O diferencial estético da Oro — rodas, basculante e chassi anodizados em dourado — é sensível à oxidação se exposto a umidade, maresia ou produtos de limpeza abrasivos. Nunca use esponja de aço ou produtos ácidos para limpar as partes douradas. Use apenas pano de microfibra com shampoo neutro específico para motos (Meguiar\'s Bike Wash ou similar) e cera de proteção sem abrasivo. Guarde a moto coberta e, se possível, em ambiente com controle de umidade — é o maior fator de desvalorização em peças de colecionador expostas.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/65 ZR17 (dianteiro) / 190/50 ZR17 (traseiro) — troque por idade, não só por km',
    body: 'Medida original: 120/65 ZR17 dianteiro / 190/50 ZR17 traseiro — medida pouco comum hoje, verifique disponibilidade antes de precisar trocar com urgência. Marcas que ainda produzem em medidas próximas ou compatíveis: Pirelli Diablo Rosso ou Michelin Power (sob consulta de disponibilidade em 120/65-17, pode ser necessário pneu especial de encomenda). Como moto de colecionador roda pouco, o pneu borracha envelhece (perde aderência e racha) antes de gastar a banda — troque por IDADE: nunca use pneu com mais de 5-6 anos de fabricação, independente do desenho ainda parecer bom. Verifique a data de fabricação no DOT lateral do pneu.',
  },
  {
    severity: 'OK',
    title: 'Conservação de moto de baixa quilometragem: bateria, combustível e corrente pedem atenção mesmo parada',
    body: 'Moto de colecionador que roda pouco sofre mais com o tempo parado do que com uso. Cuidados essenciais: (1) mantenha a bateria em carregador de manutenção (tipo Battery Tender/Optimate) sempre que não estiver em uso — bateria ácido-chumbo descarregada sulfata em semanas; (2) use estabilizador de combustível (ex: STA-BIL) no tanque se ficar mais de 60 dias parada, pois a gasolina brasileira com etanol degrada rápido e pode danificar bicos injetores; (3) lubrifique e gire a corrente periodicamente mesmo sem rodar, para não empenar/oxidar parada numa só posição; (4) dê partida e deixe funcionar até temperatura normal ao menos uma vez por mês.',
  },
]

const F4750ORO_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador retificador: ponto de falha elétrico documentado na linha F4',
    body: 'Proprietários da linha F4 (incluindo Oro) relatam falhas no regulador/retificador que podem causar perda total de energia elétrica ou sobrecarga que queima fusíveis e chicote. Sintoma: bateria não carrega, fusível de carga (geralmente 40A) queima repetidamente, ou a moto simplesmente "morre" elétrica em uso. Verifique a tensão da bateria com o motor em marcha (multímetro): deve ficar entre 13,5-14,8V a 4.000 rpm. Se estiver fora dessa faixa, o regulador provavelmente precisa de substituição — procure peça compatível junto a especialistas em MV Agusta, pois o componente original é caro e de reposição lenta no Brasil.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em conectores elétricos: ponto úmido conhecido atrás da caixa de fusíveis',
    body: 'A comunidade internacional de proprietários da linha F4 relata entrada de água em uma região específica do chicote elétrico, próxima à caixa de fusíveis do lado direito, causando corrosão em conectores e falhas intermitentes (iluminação, sensores, partida). Se a moto apresentar comportamento elétrico errático sem causa aparente, inspecione essa região primeiro. Limpeza com spray de contato elétrico e aplicação de graxa dielétrica nos conectores previne o problema — faça isso preventivamente em revisões anuais.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos em juntas do motor: comuns em unidades com pouco uso e décadas de idade',
    body: 'Juntas de borracha e vedantes do motor endurecem com o tempo mesmo sem uso — é comum encontrar pequenos vazamentos de óleo em juntas da tampa de válvulas, retentor do eixo de câmbio ou vedantes da bengala em unidades de 20+ anos com baixa quilometragem. Inspecione visualmente embaixo do motor após períodos parados. Vazamento pequeno não é emergência, mas deve ser tratado na próxima revisão — vedantes secos e ressecados tendem a piorar rapidamente uma vez que começam a vazar.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem a seco: ruído de "matraca" em marcha lenta é normal, mas desgaste deve ser monitorado',
    body: 'A F4 750 Oro tem embreagem multidisco a SECO (diferente da maioria das motos japonesas com embreagem em banho de óleo) — por isso produz um ruído metálico característico de "matraca" em marcha lenta, que é normal e não indica defeito. O que deve ser monitorado é o desgaste dos discos: se a embreagem começar a "patinar" (moto acelera mas não ganha velocidade proporcional) ou o acionamento ficar duro/inconsistente, é hora de inspecionar os discos — peça de reposição de origem italiana, procure fornecedores especializados em embreagem a seco para motos esportivas europeias.',
  },
  {
    severity: 'DANGER',
    title: 'Sensores de injeção Weber-Marelli: falhas geram luz de erro e perda de desempenho',
    body: 'O sistema de injeção Weber-Marelli da linha F4 depende de múltiplos sensores (TPS - sensor de posição do acelerador, sensor de temperatura do motor, sensor de rotação) que, com a idade, podem apresentar leituras erráticas. Sintomas: marcha lenta instável, perda de potência em certas faixas de rotação, dificuldade de partida a frio. Diagnóstico requer scanner específico compatível com o sistema Weber-Marelli — poucas oficinas no Brasil têm esse equipamento; procure oficinas especializadas em motos europeias de alta performance (geralmente as mesmas que atendem Ducati da era anterior à Bosch).',
  },
  {
    severity: 'WARN',
    title: 'Rodas de magnésio: trincas por fadiga são raras mas exigem inspeção visual periódica',
    body: 'As rodas de magnésio da Oro são leves e resistentes, mas ligas de magnésio podem sofrer microtrincas por fadiga ao longo de décadas, especialmente se a moto já sofreu algum impacto de guidão ou queda em baixa velocidade no passado. Antes de qualquer uso em pista ou viagem longa, faça inspeção visual detalhada das rodas (procure por rachaduras próximas aos raios e ao aro) e, se possível, uma inspeção por líquido penetrante em oficina especializada em rodas de competição. Não é um problema documentado com frequência, mas o risco em caso de falha é sério o suficiente para justificar a checagem preventiva.',
  },
]

const F4750ORO_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma F4 750 Oro: revisão anual mesmo com baixa km — moto de colecionador exige atenção por idade',
    body: 'Uso anual (mesmo com poucos km rodados) — Troca de óleo sintético 10W-40/5W-40 (~3,0L) + filtro. Verificar bateria e sistema de carga (13,5-14,8V @ 4.000 rpm). Inspeção visual de vazamentos e conectores elétricos (região atrás da caixa de fusíveis). | A cada 6.000-8.000 km ou 2 anos — Vela NGK CR9EB/CR9EKB (confirmar com especialista). Fluido de freio DOT 4. Lubrificação/inspeção da corrente 525. | A cada 12.000 km ou anualmente — Folga de válvulas (serviço caro: requer remoção de tanque/carenagem — orçamento R$ 5.000-8.000 em oficina especializada; aproveite para trocar filtro de combustível e inspecionar mangueiras). | Pneus — trocar por IDADE (5-6 anos) independentemente do desgaste visual, checar data DOT. | Recomendação geral: por ser peça de colecionador rara, a revisão completa deve ser feita SEMPRE por mecânico com experiência específica em MV Agusta — o custo de um erro de manutenção em componente raro supera em muito a economia de uma oficina genérica.',
  },
]

// ─── F4 750s PRATA (F4 750 S / Serie Oro versão Strada em prateado) ────────────
// Motor: 749,4cc DOHC 16v, 4 cilindros em linha (mesma base da Oro) | 126cv @ 12.500 rpm | 72 Nm @ 10.500 rpm
// Injeção Weber-Marelli | Refrigeração líquida | Compressão 12,0:1
// Óleo: ~3,0L sintético 10W-40 ou 5W-40 | Vela: NGK CR9EB/CR9EKB
// Pneu: 120/65 ZR17 (F) / 190/50 ZR17 (R) | Corrente 525 | Tanque 21L
// Produção: ~2000-2004, versão "S"/Strada com acabamento prateado — produção maior que a Oro (mais unidades,
// mas ainda um modelo de nicho/exclusivo). Preço no lançamento bem abaixo da Oro por usar peças em alumínio
// (não magnésio) e sem os itens de luxo (certificado de autenticidade, emblema em ouro 24k)

const F4750PRATA_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesma base mecânica da Oro, mas com peças em alumínio — manutenção um pouco mais barata',
    body: 'A F4 750 S (versão prateada/Strada) compartilha o motor 749,4cc DOHC 16v e a maior parte da eletrônica com a Oro, mas usa rodas e basculante em alumínio ao invés de magnésio — isso simplifica um pouco a manutenção de rodas (alumínio tolera reparo/recondicionamento com mais facilidade que magnésio). Óleo sintético 10W-40 ou 5W-40 API SL, ~3,0L com filtro, troca anual mesmo com baixo uso. Marcas: Motul 300V, Shell Advance Ultra 4T.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EB — troque a cada 8.000 km ou anualmente',
    body: 'Vela padrão de fábrica: NGK CR9EB (ou CR9EKB dependendo do lote). Custo aproximado R$ 60-100 por unidade em importadoras de peças para motos europeias — vela comum de encontrar mesmo sendo específica, pois é compartilhada com outros modelos MV Agusta da era. Gap de fábrica: consulte o manual, mas gire em torno de 0,7-0,8mm como referência geral de motores 4 cilindros de alta rotação desta época.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas: mesmo procedimento caro e trabalhoso da Oro — desmontagem completa',
    body: 'Assim como na Oro, o acesso ao cabeçote para checagem/ajuste de folga de válvulas por pastilha exige remoção de tanque, carenagem e airbox. Intervalo: 12.000 km ou anualmente. Não existe atalho seguro para esse serviço — é o item de manutenção mais caro e mais frequentemente adiado por proprietários, o que é um erro grave em um motor DOHC 16v de alta rotação (redline acima de 12.500 rpm). Orçamento esperado: R$ 4.000-7.000 em oficina especializada.',
  },
  {
    severity: 'WARN',
    title: 'Peças em alumínio: recondicionamento é mais acessível que na versão Oro em magnésio',
    body: 'Rodas e basculante em alumínio da versão S podem ser recondicionados (polimento, reparo de trincas leves, pintura) em oficinas especializadas em rodas de liga leve para motos esportivas — serviço mais disponível e barato que o recondicionamento de magnésio da Oro. Ainda assim, para peças de reposição originais (não recondicionamento), o caminho é o mesmo: importadores especializados em peças italianas exóticas e comunidade internacional MV Agusta Forum.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 — kit relação de boa qualidade estende muito a vida útil',
    body: 'Corrente padrão 525, compatível com kits de relação premium (DID ERV3, RK GB525XSO) — mais fáceis de encontrar que peças específicas MV Agusta pois seguem padrão de mercado. Lubrifique a cada 500-800 km de uso ou antes de guardar a moto por período prolongado. Folga recomendada: consulte o manual específico, mas gire em torno de 25-35mm no trecho inferior como referência típica de motos esportivas desta cilindrada.',
  },
  {
    severity: 'WARN',
    title: 'Pneus 120/65 ZR17 / 190/50 ZR17 — mesma medida pouco comum da Oro, planeje a troca com antecedência',
    body: 'Medida original 120/65 ZR17 (dianteiro) / 190/50 ZR17 (traseiro). Como não é medida amplamente estocada no Brasil, pesquise disponibilidade com antecedência ao invés de esperar o pneu acabar. Marcas Pirelli e Michelin ainda cobrem essa medida em linhas esportivas/clássicas sob encomenda. Substitua por idade (5-6 anos) e não apenas por desgaste, dado o baixo uso típico deste tipo de moto.',
  },
  {
    severity: 'OK',
    title: 'Uso esporádico: bateria e combustível são os pontos mais sensíveis ao tempo parado',
    body: 'Como a maioria das F4 750 S no Brasil roda pouco (uso de fim de semana ou moto de coleção), mantenha um carregador de manutenção conectado (Battery Tender/Optimate) e use estabilizador de combustível se a moto ficar mais de 60 dias sem rodar. Dê partida periodicamente e deixe atingir temperatura de funcionamento — isso evita ressecamento de vedantes e acúmulo de condensação no cárter.',
  },
]

const F4750PRATA_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador retificador: mesmo ponto de falha elétrico documentado na linha F4 750',
    body: 'Assim como na Oro, a F4 750 S compartilha o histórico de falhas no regulador/retificador que causam perda de carga da bateria ou queima de fusíveis. Verifique tensão de carga (13,5-14,8V a 4.000 rpm) periodicamente. Se a bateria descarregar sem motivo aparente ou os fusíveis de carga queimarem repetidamente, o regulador é o suspeito número um.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em conectores elétricos na região da caixa de fusíveis',
    body: 'Mesmo ponto fraco documentado na comunidade de proprietários da linha F4: entrada de umidade na região do chicote próxima à caixa de fusíveis, causando falhas elétricas intermitentes. Inspecione e aplique graxa dielétrica nos conectores nessa área a cada revisão anual como prevenção.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos por ressecamento de vedantes em unidades de baixa quilometragem',
    body: 'Motos com muitos anos de idade mas poucos km rodados sofrem mais com ressecamento de borrachas e vedantes do que com desgaste mecânico. Inspecione visualmente juntas do motor, retentores de bengala e mangueiras de combustível/refrigeração a cada revisão — mangueiras rígidas ou trincadas devem ser substituídas preventivamente, mesmo sem vazamento visível ainda.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem a seco: ruído característico é normal, mas fique atento a patinação',
    body: 'Como a Oro, a versão S usa embreagem multidisco a seco — o ruído de "matraca" em marcha lenta é normal. Sinal de alerta real é a embreagem "patinar" (rotação sobe sem ganho proporcional de velocidade) ou acionamento ficar duro/inconsistente na alavanca — nesse caso, inspecione os discos.',
  },
  {
    severity: 'DANGER',
    title: 'Sensores do sistema de injeção Weber-Marelli podem gerar falhas de desempenho',
    body: 'O sistema Weber-Marelli desta geração de F4 750 depende de sensores (TPS, temperatura, rotação) que podem degradar com a idade. Sintomas: marcha lenta instável, perda de potência em faixas específicas de rotação, dificuldade de partida a frio. Diagnóstico requer scanner compatível — procure oficinas especializadas em motos europeias de performance dos anos 2000.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de escape: juntas e abraçadeiras oxidam e perdem estanqueidade com o tempo',
    body: 'O escape 4-em-1 característico da linha F4 tem juntas metálicas entre os coletores e o silencioso que podem perder vedação após anos de uso/exposição, causando vazamento de gases e mudança perceptível no som/desempenho. Verifique visualmente por manchas de fuligem nas junções do escape — juntas de reposição são relativamente acessíveis e o reparo é simples comparado a outros itens desta moto.',
  },
]

const F4750PRATA_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma F4 750 S (Prata): revisão anual recomendada, independente da quilometragem',
    body: 'Uso anual — Troca de óleo sintético 10W-40/5W-40 (~3,0L) + filtro. Verificar sistema de carga (13,5-14,8V @ 4.000 rpm). Inspeção de conectores elétricos e vazamentos. | A cada 8.000 km ou 2 anos — Vela NGK CR9EB. Fluido de freio DOT 4. Inspeção/lubrificação da corrente 525. | A cada 12.000 km ou anualmente — Folga de válvulas (remoção de tanque/carenagem obrigatória — orçamento R$ 4.000-7.000 em oficina especializada). Inspeção do sistema de escape (juntas/abraçadeiras). | Pneus — trocar por idade (5-6 anos) mesmo com pouco desgaste de banda. | Reforço: por ser modelo raro e sem rede de peças ampla no Brasil, prefira sempre mecânico com histórico comprovado em MV Agusta ou marcas italianas exóticas equivalentes.',
  },
]

// ─── F4-R312 (F4 R 312) ────────────────────────────────────────────────────────
// Motor: 998cc DOHC 16v, 4 cilindros em linha | 183cv @ 12.400 rpm | 115 Nm @ 10.000 rpm
// Injeção Weber Marelli 1,6M / ignição 5SM | Refrigeração líquida | Compressão 13,0:1
// Óleo: ~3,3L (motor+filtro, confirmar manual) sintético 10W-40 ou 15W-50 | Vela: NGK CR9EB/CR9EKB (par avançado, confirmar)
// Pneu: 120/70 ZR17 (F) / 180/55 ZR17 (R) | Corrente 525, relação 15x40 | Tanque 21L
// Produção: 2007-2008 (lançada como modelo 2008), sucessora/evolução da F4 1000 R
// "312" = velocidade máxima reivindicada de 312 km/h. Chassi/suspensão/freios herdados da 1000 R,
// motor com válvulas de admissão em titânio (30mm), cames modificados e corpos de borboleta 48mm

const F4R312_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo sintético 10W-40 ou 15W-50 — capacidade aproximada 3,3L; confirme no manual da sua unidade',
    body: 'O motor 998cc DOHC 16v da R 312 (evolução direta da linhagem F4 1000) usa óleo sintético de alta performance. Marcas recomendadas: Motul 300V 15W-50 Factory Line (a mesma linha usada em competição) ou Motul 300V 10W-40 para climas mais frios. Capacidade estimada em torno de 3,3L com troca de filtro — CONFIRME a especificação exata no manual do proprietário ou com concessionária/especialista, pois não há fonte 100% consolidada para este modelo específico (produção limitada e pouco documentada em português). Intervalo: 6.000-8.000 km ou anualmente.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas: motor de alto giro (redline acima de 13.000 rpm) exige inspeção rigorosa',
    body: 'O motor da R 312 foi revisado para cumprir Euro 3 com válvulas de admissão em titânio de 30mm e cames modificados — a folga correta é ainda mais crítica que nos modelos anteriores por causa da rotação de trabalho elevada. Assim como toda a linha F4, o acesso exige desmontagem de tanque, carenagem e airbox. Intervalo recomendado: 10.000-12.000 km. Orçamento de oficina especializada: R$ 5.000-8.000. Não é um serviço para fazer "quando sobrar tempo" — é item de segurança do motor.',
  },
  {
    severity: 'WARN',
    title: 'Vela — provável NGK CR9EB/CR9EKB, mas confirme com especialista antes da compra',
    body: 'A linha F4 1000/R312 historicamente usa velas da família NGK CR9E (CR9EB de fábrica, CR9EIX iridium como upgrade documentado por proprietários para melhorar consistência de partida). Como a R 312 teve produção pequena e specs de detalhe menos documentadas publicamente, confirme a vela exata com uma oficina especializada em MV Agusta antes de comprar em lote. Trocar sempre as 4 velas juntas — motor 4 cilindros com uma vela desgastada sofre de vibração e perda de potência desproporcional.',
  },
  {
    severity: 'WARN',
    title: 'Corpos de borboleta 48mm: sincronização é serviço especializado, não genérico',
    body: 'Os corpos de borboleta 48mm da R 312 (maiores que nos F4 1000 anteriores) precisam de sincronização periódica para o motor rodar redondo em toda a faixa de rotação. Esse ajuste requer equipamento específico (analisador de sincronismo compatível com Weber Marelli) — a maioria das oficinas genéricas de moto não tem essa ferramenta. Procure oficina especializada em motos europeias de alta performance; sintoma de dessincronização: vibração irregular em marcha lenta, resposta de acelerador inconsistente.',
  },
  {
    severity: 'WARN',
    title: 'Peças específicas de motor: modelo de transição raro — combine peças da linha 1000 R quando possível',
    body: 'Como a R 312 usa chassi, suspensão e freios herdados da F4 1000 R (mudando principalmente o motor e alguns detalhes de acabamento), muitas peças de chassi/suspensão/freio são intercambiáveis com a 1000 R — isso amplia o universo de peças compatíveis disponíveis em importadores. Já peças específicas do motor (válvulas de titânio, cames modificados) são exclusivas e mais difíceis de achar — procure em fóruns internacionais (MV Agusta Forum) e especialistas em preparação de motos italianas de alta performance.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525, relação 15x40 — kit de qualidade suporta melhor os 183cv',
    body: 'Com quase 183cv, a corrente sofre mais estresse que em modelos de menor potência — priorize kits de relação premium (DID ERV3 ou similar de alta resistência) ao invés de correntes genéricas baratas. Lubrifique a cada 500 km de uso. Relação original: pinhão 15 dentes / coroa 40 dentes. Inspecione o esticador de corrente automático (se equipado) periodicamente — desgaste nesse componente pode mascarar folga real da corrente.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70 ZR17 (F) / 180/55 ZR17 (R) — medida mais fácil de encontrar que a linha 750',
    body: 'Diferente da linha F4 750 (que usa 190/50 ZR17 traseiro, medida rara), a R 312 usa 180/55 ZR17 traseiro — medida padrão de superesportivas, muito mais fácil de encontrar no Brasil. Marcas recomendadas para o potencial de 183cv: Pirelli Diablo Rosso IV/Corsa, Michelin Power GP ou Power 5. Ainda assim, respeite a troca por idade (pneu com mais de 5-6 anos deve ser trocado independente do desenho) já que é moto de uso esporádico típico de colecionador.',
  },
]

const F4R312_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador retificador: falha elétrica documentada em toda a linha F4 1000/R312',
    body: 'A comunidade internacional de proprietários MV Agusta documenta falhas recorrentes de regulador/retificador na linha F4 1000, incluindo a R 312 (mesma base elétrica). Sintomas: bateria descarrega sem motivo aparente, fusível de carga (geralmente 40A) queima repetidamente, perda total de energia elétrica em uso. Meça a tensão de carga com multímetro (13,5-14,8V a 4.000 rpm) periodicamente. É recomendável ter o contato de um especialista em MV Agusta para diagnóstico e fornecimento de peça de reposição compatível.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em conectores atrás da caixa de fusíveis — ponto fraco conhecido da linha F4',
    body: 'Mesmo ponto de entrada de umidade documentado em outros modelos F4: região do chicote elétrico próxima à caixa de fusíveis do lado direito da moto. Inspecione e aplique graxa dielétrica nos conectores anualmente como prevenção — problema recorrente que causa falhas intermitentes de iluminação, sensores e sistema de partida.',
  },
  {
    severity: 'WARN',
    title: 'Sensores de injeção Weber Marelli 1,6M: falhas causam instabilidade de marcha lenta',
    body: 'O sistema de injeção/ignição integrado Weber Marelli 5SM da R 312 depende de sensores (TPS, temperatura do motor, posição do virabrequim) que podem degradar com o tempo. Sintomas: marcha lenta instável, perda de potência em faixas específicas, dificuldade de partida a frio. Diagnóstico exige scanner compatível com o sistema — procure oficinas especializadas em motos europeias de alta performance com equipamento adequado.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: verifique acionamento e desgaste em uso intenso (moto de alta potência)',
    body: 'Com quase 183cv, a embreagem da R 312 trabalha sob mais estresse que em versões anteriores da linha F4. Fique atento a sinais de patinação (rotação sobe sem ganho proporcional de velocidade, mais perceptível em acelerações fortes) ou acionamento inconsistente na alavanca. Como é embreagem de origem italiana especializada, o reparo/reposição deve ser feito por oficina com experiência específica em motos de alta performance europeias.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos e ressecamento de vedantes em unidades de baixa quilometragem e uso esporádico',
    body: 'Como boa parte das R 312 no Brasil são motos de garagem/coleção com uso esporádico, o ressecamento de vedantes e mangueiras pelo tempo parado é mais comum que desgaste por quilometragem. Inspecione visualmente juntas do motor, retentores de bengala e mangueiras de combustível a cada revisão anual — substitua preventivamente mangueiras rígidas ou com sinais de rachadura.',
  },
  {
    severity: 'WARN',
    title: 'Esticador de corrente automático: desgaste pode mascarar folga real da transmissão',
    body: 'Se equipada com esticador de corrente automático, esse componente pode desgastar e passar uma folga aparente incorreta mesmo com a corrente em bom estado (ou vice-versa). Em caso de dúvida sobre a folga real da corrente, faça a checagem manual tradicional (sem depender só da posição do esticador) e, se necessário, substitua o esticador junto com o próximo kit de relação.',
  },
]

const F4R312_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma F4 R 312: motor de alta rotação e alta potência exige revisão rigorosa',
    body: 'Uso anual — Troca de óleo sintético 10W-40/15W-50 (~3,3L, confirmar no manual) + filtro. Verificar sistema de carga (13,5-14,8V @ 4.000 rpm). Inspeção de conectores elétricos, vazamentos e mangueiras. | A cada 6.000-8.000 km ou 2 anos — Velas (4x, confirmar referência exata com especialista). Fluido de freio DOT 4. Lubrificação da corrente 525 a cada 500 km de uso. | A cada 10.000-12.000 km ou anualmente — Folga de válvulas (motor de alto giro, redline >13.000 rpm — desmontagem completa de tanque/carenagem obrigatória; orçamento R$ 5.000-8.000). Sincronização dos corpos de borboleta 48mm (equipamento específico Weber Marelli). | Pneus — trocar por idade (5-6 anos) mesmo com pouco uso. | Nota geral: modelo com produção pequena e documentação técnica menos consolidada — sempre prefira mecânico especializado em MV Agusta e confirme specs específicas da sua unidade (chassi/ano) antes de qualquer serviço maior.',
  },
]

// ─── F4-1000 ────────────────────────────────────────────────────────────────────
// Motor: 998cc DOHC 16v, 4 cilindros em linha | 166cv @ 11.750 rpm | 108 Nm @ 10.200 rpm
// Injeção eletrônica multiponto Weber-Marelli | Refrigeração líquida | Compressão 12,0:1
// Bore x Stroke: 76 x 55mm | Óleo: ~3,3L (motor+filtro) sintético 10W-40 | Vela: NGK CR9EB/CR9EKB
// Pneu: 120/70 ZR17 (F) / 190/55 ZR17 (R, conforme manual de oficina oficial) | Corrente 525 | Tanque 21L
// Produção: 2004-2009 aproximadamente (lançada em 2004 como F4 1000 S, vendida em paralelo com a 750)
// Evolução direta da linhagem 750 para 1000cc — chassi derivado do 750, garfo Showa 49mm com revestimento
// titânio-nitrogênio, amortecedor traseiro Sachs Racing

const F41000_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo sintético 10W-40 API SL/SM — capacidade aproximada 3,0-3,3L; troque anualmente',
    body: 'Motor 998cc DOHC 16v com embreagem a seco. Óleo sintético 10W-40 de alta qualidade: Motul 300V 10W-40 ou Shell Advance Ultra 4T. Capacidade estimada 3,0-3,3L com filtro (há alguma variação entre fontes — confirme com o manual da sua unidade específica, já que houve pequenas mudanças entre os lotes 2004-2009). Troca recomendada a cada 6.000 km de uso ou anualmente, o que vier primeiro — moto de baixa quilometragem/uso esporádico degrada o óleo pelo tempo, não só pela distância rodada.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EB / CR9EKB — troca das 4 unidades a cada 8.000-10.000 km',
    body: 'Vela de fábrica: NGK CR9EB (alguns lotes/anos usam CR9EKB). Há relatos consistentes na comunidade internacional de proprietários (MV Agusta Forum) de uso de NGK CR9EIX (iridium) como solução para problemas de marcha lenta instável e partida a frio em motos de uso esporádico — vale considerar como upgrade se a moto ficar muito tempo parada entre usos. Troque sempre as 4 velas juntas.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas: item mais caro da manutenção — desmontagem de tanque e carenagem obrigatória',
    body: 'Como em toda a linha F4, checar/ajustar a folga de válvulas do motor DOHC 16v exige remoção completa de tanque de combustível, carenagem e airbox para acessar o cabeçote. Intervalo recomendado: 10.000-12.000 km ou anualmente. Custo típico em oficina especializada: R$ 4.000-7.000 (o valor exato varia conforme quantas pastilhas/shims precisam ser trocadas). Aproveite a desmontagem para trocar filtro de combustível, inspecionar mangueiras e trocar velas — assim você paga a mão de obra de acesso uma vez só.',
  },
  {
    severity: 'WARN',
    title: 'Peças de motor e chassi: procure fornecedores especializados em MV Agusta e peças compatíveis com a linha 750',
    body: 'A F4 1000 compartilha boa parte do chassi com a linha 750 (evolução direta), o que amplia um pouco o universo de peças de suspensão/freio compatíveis entre os modelos. Para peças específicas do motor 998cc, procure especialistas em peças italianas exóticas: MV Agusta Forum (classificados internacionais), importadoras como EuroMoto Parts ou FPS Torino, e desmanches especializados em motos europeias de alta performance (raros no Brasil, mas existem em São Paulo e Rio de Janeiro). Confirme sempre a compatibilidade exata pelo número de chassi antes de comprar.',
  },
  {
    severity: 'OK',
    title: 'Garfo Showa 49mm com revestimento titânio-nitrogênio: manutenção especializada, óleo específico',
    body: 'O garfo dianteiro Showa 49mm com revestimento TiN (titânio-nitrogênio) da F4 1000 precisa de óleo de suspensão de viscosidade específica (geralmente SAE 5W ou 7,5W para garfos de competição — confirme a especificação exata com o manual ou especialista) e troca a cada 20.000-25.000 km ou 2-3 anos de uso, mesmo esporádico, pois o óleo de suspensão perde propriedades com o tempo independente da quilometragem. Evite lavar o revestimento TiN com produtos abrasivos.',
  },
  {
    severity: 'OK',
    title: 'Amortecedor Sachs Racing: regulagem e manutenção especializada',
    body: 'O amortecedor traseiro Sachs Racing da linha F4 1000 é um item de alta performance que se beneficia de regulagem profissional (pré-carga, compressão, retorno) alinhada ao peso e estilo de pilotagem do proprietário. Para moto de coleção com uso esporádico, verifique se o amortecedor não está vazando óleo (mancha na haste) a cada revisão anual — vazamento indica necessidade de recondicionamento em oficina especializada em suspensão de competição.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 e pneus 120/70 ZR17 / 190/55 ZR17 — medidas mais fáceis de repor que a linha 750',
    body: 'A F4 1000 usa corrente 525 (padrão de mercado, kits DID/RK facilmente encontrados) e pneus em medidas mais comuns que a linha 750 Oro/Prata. Traseiro 190/55 ZR17 conforme manual de oficina oficial (note que há fontes que citam 190/50 — confirme a medida exata gravada no flanco do pneu original ou manual específico do seu chassi antes de comprar). Marcas recomendadas: Pirelli Diablo Rosso III, Michelin Power 5. Troque por idade (5-6 anos) dado o uso esporádico típico.',
  },
]

const F41000_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador retificador e falhas elétricas: problema mais documentado da linha F4 1000',
    body: 'Fóruns internacionais de proprietários (MV Agusta Forum, threads específicas sobre F4 1000/1000S) documentam extensivamente falhas de regulador/retificador causando descarga total da bateria, fusíveis de carga queimados repetidamente e perda de energia elétrica em uso. Há também relatos de dano ao regulador por inversão acidental dos cabos da bateria durante manutenção — cuidado redobrado ao mexer na bateria. Meça a tensão de carga periodicamente (13,5-14,8V a 4.000 rpm) e troque o regulador preventivamente se notar qualquer sinal de instabilidade elétrica.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em conectores atrás da caixa de fusíveis — água entra por ponto específico do chicote',
    body: 'Proprietários documentam entrada de água em uma região específica do chicote elétrico das unidades 1000S, próxima à caixa de fusíveis do lado direito, causando corrosão severa em conectores e falhas intermitentes de vários sistemas elétricos. Inspecione essa região preventivamente e aplique graxa dielétrica nos conectores a cada revisão anual — problema conhecido o suficiente para ser tratado como item de checklist de manutenção preventiva, não apenas reativa.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos e ressecamento de vedantes/mangueiras em unidades de baixa quilometragem',
    body: 'Unidades com muitos anos de idade mas poucos km rodados sofrem mais com o tempo parado do que com desgaste de uso. Inspecione vedantes do motor, retentores da bengala e mangueiras de combustível/refrigeração a cada revisão anual — mangueiras endurecidas ou trincadas devem ser trocadas preventivamente antes de vazar.',
  },
  {
    severity: 'DANGER',
    title: 'Sensores de injeção Weber-Marelli: instabilidade de marcha lenta e perda de potência',
    body: 'O sistema de injeção eletrônica multiponto Weber-Marelli depende de sensores que podem degradar com a idade. Sintomas comuns relatados: marcha lenta instável (moto "engasga" ou morre parada), perda de potência em faixas específicas de rotação, dificuldade de partida a frio. Diagnóstico requer scanner compatível com o sistema Weber-Marelli — procure oficinas especializadas em motos europeias de performance dos anos 2000 (frequentemente as mesmas que atendem Ducati anteriores à era Bosch/Magneti Marelli moderna).',
  },
  {
    severity: 'WARN',
    title: 'Embreagem a seco: ruído de matraca é normal, mas fique atento a desgaste dos discos',
    body: 'A F4 1000 mantém a embreagem multidisco a seco característica da linha F4 — o ruído metálico em marcha lenta é normal e esperado. Sinal real de desgaste: patinação perceptível (rotação sobe sem ganho proporcional de velocidade) ou acionamento inconsistente na alavanca. Peça de reposição de origem italiana especializada — procure fornecedores focados em embreagens de moto de alta performance europeia.',
  },
  {
    severity: 'WARN',
    title: 'Vibração ou ruído anormal em alta rotação: verifique balanceamento e fixação do motor',
    body: 'Como motor 4 cilindros em linha de alta rotação (redline próximo a 12.700 rpm), qualquer vibração fora do padrão em altas rotações merece atenção imediata — pode indicar desde desbalanceamento de roda/pneu (mais comum e barato de resolver) até folga em parafusos de fixação do motor no chassi ou, em casos mais sérios, desgaste interno do motor. Comece pela checagem mais simples (balanceamento de rodas, aperto dos parafusos do motor) antes de assumir problema mecânico interno.',
  },
]

const F41000_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma F4 1000: motor 998cc de alta rotação exige revisão anual rigorosa',
    body: 'Uso anual — Troca de óleo sintético 10W-40 (~3,0-3,3L, confirmar no manual) + filtro. Verificar sistema de carga (13,5-14,8V @ 4.000 rpm). Inspeção de conectores elétricos (região da caixa de fusíveis) e vazamentos. | A cada 6.000-8.000 km ou 2 anos — Velas NGK CR9EB (4x). Fluido de freio DOT 4. Lubrificação da corrente 525 a cada 500 km de uso. | A cada 20.000-25.000 km ou 2-3 anos — Óleo do garfo Showa 49mm TiN. Inspeção do amortecedor Sachs Racing (vazamento na haste). | A cada 10.000-12.000 km ou anualmente — Folga de válvulas (desmontagem completa de tanque/carenagem; orçamento R$ 4.000-7.000 em oficina especializada). | Pneus — trocar por idade (5-6 anos) mesmo com pouco desgaste de banda. | Reforço: mecânico especializado em MV Agusta é fortemente recomendado dado o histórico de falhas elétricas documentado e a complexidade do sistema de injeção Weber-Marelli.',
  },
]

// ─── F4-1000 RR ───────────────────────────────────────────────────────────────
// Motor: 998cc DOHC 16v, 4 cilindros em linha | 174cv @ 13.000 rpm (2007-08) a ~186cv @ 12.900 rpm (2009-10)
// Torque: 111-114 Nm | Injeção Weber-Marelli | Refrigeração líquida | Compressão ~13,0:1 (versões mais recentes)
// Óleo: ~3,3L sintético 10W-40 ou 15W-50 | Vela: NGK CR9EB/CR9EKB
// Pneu: 120/70 ZR17 (F) / 190/55 ZR17 (R) | Corrente 525 | Tanque 21L
// Produção: 2005-2010 aproximadamente (nomenclatura "R" ou "RR" variou conforme ano/mercado — verifique
// o chassi da unidade específica). Versão de maior desempenho/track-focused da F4 1000, com suspensão
// mais sofisticada (Öhlins em algumas versões) e eletrônica revisada ao longo dos anos de produção

const F41000RR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo sintético 10W-40 ou 15W-50 — motor de mais potência pede troca mais frequente em uso em pista',
    body: 'Motor 998cc DOHC 16v com potência entre 174-186cv dependendo do ano/versão. Óleo sintético de alta performance: Motul 300V 15W-50 Factory Line (recomendado se a moto for usada em pista/trackday) ou 10W-40 para uso de rua/coleção. Capacidade estimada 3,3L com filtro — confirme no manual específico do ano da sua unidade, pois houve revisões técnicas ao longo da produção 2005-2010. Troca a cada 4.000-6.000 km se usada em pista, ou anualmente se for moto de baixo uso.',
  },
  {
    severity: 'WARN',
    title: 'Nomenclatura R/RR variou por ano e mercado — confirme specs pelo chassi antes de comprar peças',
    body: 'A MV Agusta usou nomenclaturas "F4 1000 R" e "F4 1000 RR" ao longo dos anos com mudanças técnicas entre versões (potência, suspensão, eletrônica) que nem sempre são claramente documentadas em fontes públicas. Antes de comprar peças específicas de motor ou suspensão, confirme o ano exato de fabricação e a especificação técnica da sua unidade pelo número de chassi junto a um especialista MV Agusta — comprar peça pela nomenclatura do nome comercial sem confirmar o chassi é risco real de incompatibilidade nesta linha.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas: motor de altíssima rotação (redline 13.000+ rpm) exige rigor ainda maior',
    body: 'Com redline acima de 13.000 rpm nas versões mais potentes, a checagem de folga de válvulas é ainda mais crítica que em versões anteriores da linha F4 1000. Procedimento: desmontagem completa de tanque, carenagem e airbox para acesso ao cabeçote DOHC 16v. Intervalo: 10.000-12.000 km ou anualmente, e mais frequente se usada em pista. Orçamento em oficina especializada: R$ 5.000-8.000. Não adie esse serviço — motor de alta rotação com folga incorreta corre risco real de dano grave.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EB/CR9EKB — considere iridium CR9EIX para uso esporádico ou pista',
    body: 'Vela de fábrica na família NGK CR9E. Para moto usada esporadicamente (comum em coleções), a versão iridium CR9EIX tende a manter melhor a capacidade de ignição após longos períodos parada, reduzindo problemas de partida a frio documentados na comunidade de proprietários. Para uso em pista, mantenha o intervalo de troca mais curto (6.000-8.000 km) já que a vela sofre mais em altas rotações sustentadas.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão de alto desempenho (Öhlins em algumas versões): manutenção especializada e cara',
    body: 'Dependendo do ano/versão, a F4 1000 RR pode ter equipamento de suspensão Öhlins de alta performance. A manutenção desses componentes (troca de óleo interno, recondicionamento de válvulas) deve ser feita exclusivamente por oficina especializada em suspensão de competição (representantes Öhlins no Brasil atendem esse tipo de serviço). Intervalo recomendado: a cada 20.000-25.000 km ou 2-3 anos, mesmo com uso esporádico, pois o óleo interno degrada com o tempo.',
  },
  {
    severity: 'WARN',
    title: 'Peças de motor de alta performance: procure preparadores especializados em MV Agusta de competição',
    body: 'Como versão mais voltada a performance/pista, a F4 1000 RR pode ter peças específicas de motor (pistões forjados, bielas reforçadas em algumas variantes) que não são intercambiáveis com a F4 1000 padrão. Para peças de reposição de alta performance, procure preparadores especializados em motos italianas de competição — geralmente as mesmas oficinas que atendem equipes de superbike ou trackday com MV Agusta, Ducati e Aprilia.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 de alta resistência — potência elevada exige kit de relação premium',
    body: 'Com até 186cv, a corrente sofre estresse elevado — use exclusivamente kits de relação premium (DID ERV3 ou equivalente de alta resistência), nunca correntes genéricas de baixo custo. Lubrifique a cada 500 km de uso, mais frequente em uso de pista/trackday. Inspecione o desgaste do kit completo (corrente + pinhão + coroa) a cada 15.000-20.000 km, substituindo o conjunto completo quando necessário — nunca só a corrente isolada.',
  },
]

const F41000RR_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador retificador: falha elétrica documentada em toda a linha F4 1000',
    body: 'Mesmo problema documentado nos outros modelos F4 1000: falhas de regulador/retificador causando descarga da bateria ou queima de fusíveis de carga. Ainda mais crítico na RR pela maior demanda elétrica de eventuais sistemas eletrônicos adicionais conforme o ano/versão. Meça tensão de carga periodicamente (13,5-14,8V a 4.000 rpm) e substitua preventivamente ao menor sinal de instabilidade.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em conectores elétricos — mesmo ponto fraco documentado na linha F4',
    body: 'Região do chicote próxima à caixa de fusíveis do lado direito é ponto conhecido de entrada de umidade em toda a linha F4, incluindo a 1000 RR. Inspecione e aplique graxa dielétrica anualmente como prevenção contra falhas intermitentes.',
  },
  {
    severity: 'DANGER',
    title: 'Sensores de injeção e eletrônica de motor: mais complexos que versões anteriores',
    body: 'Dependendo do ano/versão, a F4 1000 RR pode ter eletrônica de motor mais sofisticada que a F4 1000 padrão (possíveis mapas de injeção adicionais, sensores extras). Falhas nesses componentes causam sintomas como marcha lenta instável, perda de potência em faixas específicas e dificuldade de partida. Diagnóstico exige scanner compatível e conhecimento técnico específico do ano/versão exata — procure especialista MV Agusta que atenda a linha RR especificamente, não apenas F4 genérico.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste acelerado de pneus e corrente em uso de pista/trackday',
    body: 'Proprietários que usam a RR (versão mais voltada a performance) em pista relatam desgaste bem mais rápido de pneus e corrente que no uso de rua — natural dado o propósito da moto. Ajuste os intervalos de inspeção proporcionalmente: se a moto faz trackdays regulares, inspecione corrente e pneus a cada evento, não apenas no cronograma padrão por quilometragem.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem sob maior estresse: desgaste mais rápido com uso esportivo',
    body: 'Com potência de até 186cv e uso mais esportivo típico do perfil de proprietário da RR, a embreagem a seco multidisco sofre desgaste mais acelerado que em uso de rua tranquilo. Fique atento a sinais de patinação, especialmente em arrancadas fortes ou uso de pista. Reposição de discos deve ser feita por oficina especializada em embreagens de moto de alta performance europeia.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos e ressecamento em unidades de baixa quilometragem e uso de coleção',
    body: 'Como muitas RR no Brasil são hoje motos de coleção com uso esporádico, o ressecamento de vedantes e mangueiras pelo tempo parado é uma preocupação tão real quanto o desgaste por uso em pista. Inspecione vedantes do motor, mangueiras de combustível e retentores de bengala/amortecedor anualmente, independente da quilometragem total.',
  },
]

const F41000RR_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma F4 1000 RR: ajuste conforme uso — rua/coleção exige calendário anual, pista exige mais frequência',
    body: 'Uso anual (moto de rua/coleção) — Troca de óleo sintético 10W-40/15W-50 (~3,3L) + filtro. Verificar sistema de carga (13,5-14,8V @ 4.000 rpm). Inspeção de conectores elétricos e vazamentos. | A cada 4.000-6.000 km (uso em pista) ou 6.000-8.000 km (uso de rua) — Velas NGK CR9EB (4x). Fluido de freio DOT 4. Lubrificação da corrente 525 a cada 500 km. | A cada 20.000-25.000 km ou 2-3 anos — Manutenção da suspensão (Öhlins, se equipada) por especialista certificado. | A cada 10.000-12.000 km ou anualmente — Folga de válvulas (motor de altíssima rotação — desmontagem completa; orçamento R$ 5.000-8.000). | Kit de relação — inspecionar a cada 15.000-20.000 km, trocar conjunto completo quando desgastado. | Reforço: confirme a especificação exata da sua unidade (ano/chassi) com especialista MV Agusta antes de qualquer serviço maior, dado que a nomenclatura R/RR variou tecnicamente ao longo da produção.',
  },
]

// ─── F4 1078RR 312 (F4 1078 RR) ────────────────────────────────────────────────
// Motor: 1078cc DOHC 16v, 4 cilindros em linha — o maior motor 4 cilindros já usado na linha F4
// Potência: 190cv @ 10.000 rpm | Torque: 124 Nm @ 8.200 rpm | Compressão 13,0:1
// Injeção/ignição integrada Weber Marelli 5SM | Refrigeração líquida
// Bore x Stroke: 79 x 55mm | Óleo: ~3,3L sintético 15W-50 | Vela: NGK CR9EB/CR9EKB (confirmar)
// Pneu: 120/70 ZR17 (F) / 180/55 ZR17 (R) | Corrente 525 | Tanque 21L
// Produção: 2008-2009/2010 aproximadamente. "312" reivindica velocidade máxima de 312 km/h em pista de testes.
// Freios dianteiros com discos de 320mm e pinças 4 pistões. O topo absoluto da linhagem F4 clássica antes
// da geração F4 RC/Superveloce moderna (que não faz parte deste catálogo)

const F41078RR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo sintético 15W-50 — motor de 1078cc, o maior 4 cilindros da linha F4, pede lubrificação de alta performance',
    body: 'O maior motor 4 cilindros em linha já usado na linhagem F4 exige óleo sintético de altíssima qualidade: Motul 300V 15W-50 Factory Line é a referência para este tipo de motor de competição adaptado à rua. Capacidade estimada 3,3L com filtro — confirme com especialista MV Agusta dado que specs detalhadas deste modelo específico são pouco documentadas em fontes de fácil acesso. Troca recomendada a cada 5.000-6.000 km de uso ou anualmente para moto de baixa quilometragem.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas: motor de 190cv e compressão 13:1 — item crítico e caro, sem exceção',
    body: 'Com compressão de 13,0:1 e 190cv a 10.000 rpm, a folga de válvulas correta é fundamental para a saúde do motor 1078cc. Como em toda a linha F4, o acesso ao cabeçote exige desmontagem completa de tanque, carenagem e airbox. Intervalo: 10.000-12.000 km ou anualmente. Orçamento: R$ 5.000-8.000 em oficina especializada — pode ser ainda mais alto dado que é o motor mais raro e menos comum entre mecânicos, mesmo especializados em MV Agusta. Vale a pena viajar para uma oficina com experiência comprovada nesse motor específico ao invés de arriscar com quem nunca trabalhou nele.',
  },
  {
    severity: 'WARN',
    title: 'Vela — família NGK CR9E, mas modelo raro o suficiente para exigir confirmação individual',
    body: 'A família de velas NGK CR9E (CR9EB/CR9EKB) é a referência histórica da linha F4 1000/1078, mas como o 1078RR teve produção pequena e specs pouco publicadas, a recomendação mais segura é confirmar a vela exata com um especialista MV Agusta ou pelo manual específico da sua unidade antes de comprar em lote. Trocar sempre as 4 velas juntas.',
  },
  {
    severity: 'DANGER',
    title: 'Peças de motor 1078cc: as mais raras de toda a linha F4 legada — planeje com antecedência',
    body: 'Por ser o maior motor da linha F4 clássica e ter tido produção limitada, peças específicas do motor 1078cc (pistões, bielas, componentes internos) são as mais difíceis de encontrar de toda esta linhagem. Antes de qualquer serviço que exija peça de reposição de motor, contate especialistas MV Agusta com antecedência — pode ser necessário importar diretamente da Itália via fóruns especializados (MV Agusta Forum, F4 Owners Forum) ou preparadores que atendem motos de competição desta cilindrada. Não é incomum que o prazo de espera por peça específica seja de semanas a meses.',
  },
  {
    severity: 'OK',
    title: 'Freios dianteiros 320mm com pinças 4 pistões: mantenha fluido e pastilhas em dia dado o potencial da moto',
    body: 'Com discos dianteiros de 320mm e pinças de 4 pistões, o sistema de freio da 1078RR é dimensionado para o desempenho elevado da moto (190cv). Use pastilhas de alta performance (EBC HH ou Brembo específicas para aplicação esportiva) e fluido DOT 4 de qualidade (Motul RBF 600 se houver uso ocasional em pista). Troque o fluido a cada 2 anos sem falta — freio é item de segurança não negociável numa moto deste desempenho.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70 ZR17 / 180/55 ZR17 — priorize composto para alta performance dado os 190cv',
    body: 'Medida 180/55 ZR17 traseiro (mais comum que a medida da linha 750, facilita reposição). Dado o potencial de 190cv e 312 km/h reivindicados, use pneus de linha esportiva de ponta: Pirelli Diablo Supercorsa (uso misto rua/pista) ou Diablo Rosso IV (uso predominante de rua). Troque por idade (5-6 anos) se a moto for de uso esporádico — pneu envelhecido perde aderência de forma perigosa numa moto deste desempenho, independente do desenho ainda parecer bom.',
  },
  {
    severity: 'OK',
    title: 'Conservação para moto de baixíssimo uso: cuidados redobrados dado o valor de colecionador',
    body: 'A F4 1078RR 312 é o topo da linhagem F4 clássica e tende a ter valor de colecionador elevado — muitas unidades no Brasil rodam pouquíssimo. Mantenha carregador de manutenção na bateria sempre que parada, use estabilizador de combustível se ficar mais de 60 dias sem uso, gire a roda/corrente periodicamente para não empenar em uma posição fixa, e dê partida mensalmente até atingir temperatura de funcionamento. Guarde coberta em ambiente com controle de umidade sempre que possível — é o maior fator de preservação de valor em peças raras como esta.',
  },
]

const F41078RR_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador retificador: mesmo padrão de falha documentado em toda a linha F4',
    body: 'A linha F4 1078RR compartilha a base elétrica da família F4 1000, com o mesmo histórico documentado de falhas de regulador/retificador — descarga de bateria, queima de fusíveis de carga, perda de energia elétrica. Dado que é o modelo mais raro e caro da linhagem, um diagnóstico rápido e correto evita danos secundários (queima de outros componentes elétricos). Meça a tensão de carga regularmente (13,5-14,8V a 4.000 rpm) e não hesite em substituir o regulador preventivamente ao menor sinal de instabilidade.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em conectores elétricos — ponto fraco conhecido da linha F4',
    body: 'Mesma região de risco documentada em toda a linha F4: chicote próximo à caixa de fusíveis do lado direito, sujeito a entrada de umidade e corrosão em conectores. Inspecione e aplique graxa dielétrica anualmente.',
  },
  {
    severity: 'DANGER',
    title: 'Sistema de injeção Weber Marelli 5SM: motor de alta compressão é sensível a falhas de sensores',
    body: 'Com compressão de 13,0:1, o motor 1078cc é particularmente sensível a informações incorretas de sensores de injeção — uma falha de leitura pode gerar detonação (batida de pino) ao invés de apenas perda de desempenho, o que é mais sério que em motores de compressão menor. Ao primeiro sinal de marcha lenta instável, perda de potência ou ruído metálico anormal do motor, pare de usar a moto e procure diagnóstico especializado imediatamente — não continue rodando "para ver se piora".',
  },
  {
    severity: 'WARN',
    title: 'Embreagem sob estresse elevado: 190cv exige atenção redobrada ao desgaste',
    body: 'Com a maior potência de toda a linha F4 clássica (190cv), a embreagem a seco multidisco do 1078RR sofre o maior estresse da linhagem. Fique atento a sinais de patinação e acionamento inconsistente. Peça de reposição rara — procure especialistas com experiência específica em preparação de motos italianas de competição desta potência.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos e ressecamento de vedantes: risco elevado em unidades de coleção com pouquíssimo uso',
    body: 'Sendo o modelo mais valorizado da linhagem F4 clássica, é comum que unidades no Brasil rodem muito pouco — o que paradoxalmente aumenta o risco de ressecamento de vedantes, mangueiras e borrachas pelo tempo parado. Inspecione visualmente todo o sistema de vedação do motor e mangueiras de combustível/freio a cada revisão anual, mesmo que a moto tenha rodado poucos quilômetros no período.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão de alta performance: verifique vazamentos e regulagem antes de qualquer uso mais intenso',
    body: 'Dado o desempenho elevado do 1078RR, a suspensão (garfo dianteiro e amortecedor traseiro) trabalha em regime mais exigente quando a moto é usada com intensidade. Antes de qualquer trackday ou uso mais esportivo após período parada, verifique vazamentos nas hastes do garfo e do amortecedor, e considere regulagem profissional de pré-carga/compressão/retorno alinhada ao peso do piloto.',
  },
]

const F41078RR_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma F4 1078RR 312: o modelo mais exigente e caro de manter de toda a linha F4 clássica',
    body: 'Uso anual — Troca de óleo sintético 15W-50 (~3,3L, confirmar no manual) + filtro. Verificar sistema de carga (13,5-14,8V @ 4.000 rpm). Inspeção rigorosa de conectores elétricos, vazamentos e mangueiras — motor de alta compressão é mais sensível a qualquer irregularidade. | A cada 5.000-6.000 km ou 2 anos — Velas NGK CR9E (4x, confirmar referência com especialista). Fluido de freio DOT 4 (Motul RBF 600 se uso em pista). Lubrificação da corrente 525 a cada 500 km. | A cada 10.000-12.000 km ou anualmente — Folga de válvulas (motor 1078cc de alta compressão — desmontagem completa de tanque/carenagem obrigatória; orçamento R$ 5.000-8.000+, pode ser mais alto pela raridade do motor). | Pneus — trocar por idade (5-6 anos) mesmo com pouco uso, dado o potencial de 190cv. | Reforço máximo: este é o motor mais raro e caro de toda a linhagem F4 legada — use exclusivamente mecânico com experiência comprovada especificamente no 1078RR, não apenas "MV Agusta em geral". O custo de um erro de manutenção neste modelo específico é o mais alto de toda a linha.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'F4 750 (Ouro',
    yearFrom: 1999,
    yearTo: 2001,
    MACETES: F4750ORO_MACETES,
    PROBLEMAS: F4750ORO_PROBLEMAS,
    MANUTENCAO: F4750ORO_MANUTENCAO,
  },
  {
    modelName: 'F4 750s (Prata',
    yearFrom: 2000,
    yearTo: 2004,
    MACETES: F4750PRATA_MACETES,
    PROBLEMAS: F4750PRATA_PROBLEMAS,
    MANUTENCAO: F4750PRATA_MANUTENCAO,
  },
  {
    modelName: 'F4- R312',
    yearFrom: 2007,
    yearTo: 2008,
    MACETES: F4R312_MACETES,
    PROBLEMAS: F4R312_PROBLEMAS,
    MANUTENCAO: F4R312_MANUTENCAO,
  },
  {
    modelName: 'F4-1000',
    yearFrom: 2004,
    yearTo: 2009,
    MACETES: F41000_MACETES,
    PROBLEMAS: F41000_PROBLEMAS,
    MANUTENCAO: F41000_MANUTENCAO,
  },
  {
    modelName: 'F4-1000 RR',
    yearFrom: 2005,
    yearTo: 2010,
    MACETES: F41000RR_MACETES,
    PROBLEMAS: F41000RR_PROBLEMAS,
    MANUTENCAO: F41000RR_MANUTENCAO,
  },
  {
    modelName: 'F4 1078RR 312',
    yearFrom: 2008,
    yearTo: 2010,
    MACETES: F41078RR_MACETES,
    PROBLEMAS: F41078RR_PROBLEMAS,
    MANUTENCAO: F41078RR_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'F4 750 (Ouro',
    yearFrom: 1999, yearTo: 2001,
    tireSize: '120/65 ZR17 (F) · 190/50 ZR17 (R)',
    frontPsi: 33, rearPsi: 39,
    frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Solo: F 33 / R 39 PSI. Com carona: F 33 / R 42 PSI. Medida rara (120/65-17), pesquise disponibilidade com antecedência. Pneus recomendados: Pirelli Diablo Rosso ou Michelin Power sob encomenda. Verifique sempre a pressão exata no manual do proprietário da sua unidade específica — valores podem variar por lote.',
  },
  {
    modelName: 'F4 750s (Prata',
    yearFrom: 2000, yearTo: 2004,
    tireSize: '120/65 ZR17 (F) · 190/50 ZR17 (R)',
    frontPsi: 33, rearPsi: 39,
    frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Solo: F 33 / R 39 PSI. Com carona: F 33 / R 42 PSI. Mesma medida rara da versão Oro. Confirme no manual específico do ano — pode haver variação entre lotes de produção.',
  },
  {
    modelName: 'F4- R312',
    yearFrom: 2007, yearTo: 2008,
    tireSize: '120/70 ZR17 (F) · 180/55 ZR17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 45,
    notes: 'Solo: F 36 / R 42 PSI. Com carona: F 36 / R 45 PSI. Medida mais comum que a linha 750 — facilita reposição. Pneus recomendados para os 183cv: Pirelli Diablo Rosso IV/Corsa ou Michelin Power GP/Power 5.',
  },
  {
    modelName: 'F4-1000',
    yearFrom: 2004, yearTo: 2009,
    tireSize: '120/70 ZR17 (F) · 190/55 ZR17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 45,
    notes: 'Solo: F 36 / R 42 PSI. Com carona: F 36 / R 45 PSI. Traseiro conforme manual de oficina oficial (190/55) — há fontes que citam 190/50 para alguns lotes; confirme a medida gravada no flanco do pneu original antes de comprar substituto.',
  },
  {
    modelName: 'F4-1000 RR',
    yearFrom: 2005, yearTo: 2010,
    tireSize: '120/70 ZR17 (F) · 190/55 ZR17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 45,
    notes: 'Solo: F 36 / R 42 PSI. Com carona: F 36 / R 45 PSI. Para uso em pista/trackday, pressões podem variar (geralmente reduzidas ligeiramente) — consulte recomendação específica do fabricante do pneu escolhido.',
  },
  {
    modelName: 'F4 1078RR 312',
    yearFrom: 2008, yearTo: 2010,
    tireSize: '120/70 ZR17 (F) · 180/55 ZR17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 45,
    notes: 'Solo: F 36 / R 42 PSI. Com carona: F 36 / R 45 PSI. Modelo de maior potência da linha (190cv) — priorize pneus de linha esportiva de ponta como Pirelli Diablo Supercorsa. Verifique idade do pneu (DOT) antes de qualquer uso mais intenso.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // F4 750 (Ouro)
  { modelName: 'F4 750 (Ouro', yearFrom: 1999, yearTo: 2001, component: 'Óleo sintético 10W-40/5W-40 (~3,0L) + filtro', intervalKm: 6000, intervalMonths: 12, notes: 'Embreagem a seco — não precisa JASO MA. Motul 300V ou Shell Advance Ultra 4T. Confirmar capacidade exata no manual da unidade.', priority: 'HIGH', order: 1 },
  { modelName: 'F4 750 (Ouro', yearFrom: 1999, yearTo: 2001, component: 'Vela NGK CR9EB/CR9EKB (4x)', intervalKm: 8000, intervalMonths: 12, notes: 'Confirmar referência exata com especialista MV Agusta antes de comprar em lote.', priority: 'MEDIUM', order: 2 },
  { modelName: 'F4 750 (Ouro', yearFrom: 1999, yearTo: 2001, component: 'Folga de válvulas (shim, DOHC 16v)', intervalKm: 12000, intervalMonths: 12, notes: 'Requer desmontagem de tanque, carenagem e airbox. Orçamento R$ 5.000-8.000 em oficina especializada.', priority: 'CRITICAL', order: 3 },
  { modelName: 'F4 750 (Ouro', yearFrom: 1999, yearTo: 2001, component: 'Embreagem a seco — inspeção de discos', intervalKm: 15000, intervalMonths: 24, notes: 'Verificar patinação e acionamento. Peça de origem italiana especializada.', priority: 'MEDIUM', order: 4 },
  { modelName: 'F4 750 (Ouro', yearFrom: 1999, yearTo: 2001, component: 'Corrente 525 — lubrificação e inspeção', intervalKm: 800, intervalMonths: null, notes: 'Kit de relação premium recomendado. Gire e lubrifique periodicamente mesmo sem uso.', priority: 'MEDIUM', order: 5 },
  { modelName: 'F4 750 (Ouro', yearFrom: 1999, yearTo: 2001, component: 'Fluido de freio DOT 4 (frente + trás)', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório. Freios dianteiros: 2 discos 310mm, pinças 6 pistões.', priority: 'HIGH', order: 6 },
  { modelName: 'F4 750 (Ouro', yearFrom: 1999, yearTo: 2001, component: 'Bateria — carregador de manutenção', intervalKm: null, intervalMonths: 1, notes: 'Battery Tender/Optimate sempre conectado quando parada. Verificar tensão mensalmente.', priority: 'MEDIUM', order: 7 },
  { modelName: 'F4 750 (Ouro', yearFrom: 1999, yearTo: 2001, component: 'Regulador retificador — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: 'Medir 13,5-14,8V a 4.000 rpm. Ponto de falha documentado na linha F4.', priority: 'CRITICAL', order: 8 },
  { modelName: 'F4 750 (Ouro', yearFrom: 1999, yearTo: 2001, component: 'Pneus 120/65 ZR17 / 190/50 ZR17', intervalKm: null, intervalMonths: 60, notes: 'Trocar por idade (5-6 anos) independente do desgaste — medida rara, planeje com antecedência.', priority: 'HIGH', order: 9 },

  // F4 750s (Prata)
  { modelName: 'F4 750s (Prata', yearFrom: 2000, yearTo: 2004, component: 'Óleo sintético 10W-40/5W-40 (~3,0L) + filtro', intervalKm: 6000, intervalMonths: 12, notes: 'Mesma base mecânica da Oro. Motul 300V ou Shell Advance Ultra 4T.', priority: 'HIGH', order: 1 },
  { modelName: 'F4 750s (Prata', yearFrom: 2000, yearTo: 2004, component: 'Vela NGK CR9EB (4x)', intervalKm: 8000, intervalMonths: 12, notes: 'Custo aproximado R$ 60-100/unidade em importadoras especializadas.', priority: 'MEDIUM', order: 2 },
  { modelName: 'F4 750s (Prata', yearFrom: 2000, yearTo: 2004, component: 'Folga de válvulas (shim, DOHC 16v)', intervalKm: 12000, intervalMonths: 12, notes: 'Desmontagem de tanque/carenagem obrigatória. Orçamento R$ 4.000-7.000.', priority: 'CRITICAL', order: 3 },
  { modelName: 'F4 750s (Prata', yearFrom: 2000, yearTo: 2004, component: 'Embreagem a seco — inspeção de discos', intervalKm: 15000, intervalMonths: 24, notes: 'Verificar patinação. Peça italiana especializada.', priority: 'MEDIUM', order: 4 },
  { modelName: 'F4 750s (Prata', yearFrom: 2000, yearTo: 2004, component: 'Corrente 525 — lubrificação e inspeção', intervalKm: 800, intervalMonths: null, notes: 'Kits DID ERV3 ou RK GB525XSO recomendados.', priority: 'MEDIUM', order: 5 },
  { modelName: 'F4 750s (Prata', yearFrom: 2000, yearTo: 2004, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'F4 750s (Prata', yearFrom: 2000, yearTo: 2004, component: 'Regulador retificador — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: '13,5-14,8V a 4.000 rpm. Mesmo ponto de falha da Oro.', priority: 'CRITICAL', order: 7 },
  { modelName: 'F4 750s (Prata', yearFrom: 2000, yearTo: 2004, component: 'Rodas de alumínio — inspeção/recondicionamento', intervalKm: null, intervalMonths: 24, notes: 'Mais fácil de recondicionar que magnésio da Oro. Oficinas especializadas em rodas de liga leve.', priority: 'LOW', order: 8 },
  { modelName: 'F4 750s (Prata', yearFrom: 2000, yearTo: 2004, component: 'Pneus 120/65 ZR17 / 190/50 ZR17', intervalKm: null, intervalMonths: 60, notes: 'Trocar por idade (5-6 anos). Medida rara, planeje com antecedência.', priority: 'HIGH', order: 9 },

  // F4- R312
  { modelName: 'F4- R312', yearFrom: 2007, yearTo: 2008, component: 'Óleo sintético 10W-40/15W-50 (~3,3L) + filtro', intervalKm: 7000, intervalMonths: 12, notes: 'Motul 300V Factory Line recomendado. Confirmar capacidade exata com especialista.', priority: 'HIGH', order: 1 },
  { modelName: 'F4- R312', yearFrom: 2007, yearTo: 2008, component: 'Vela NGK CR9E (4x) — confirmar referência', intervalKm: 8000, intervalMonths: 12, notes: 'Trocar sempre as 4 juntas. Confirmar código exato com especialista.', priority: 'MEDIUM', order: 2 },
  { modelName: 'F4- R312', yearFrom: 2007, yearTo: 2008, component: 'Folga de válvulas (motor alto giro, redline >13.000 rpm)', intervalKm: 12000, intervalMonths: 12, notes: 'Desmontagem completa. Orçamento R$ 5.000-8.000. Válvulas de admissão em titânio.', priority: 'CRITICAL', order: 3 },
  { modelName: 'F4- R312', yearFrom: 2007, yearTo: 2008, component: 'Sincronização dos corpos de borboleta 48mm', intervalKm: 12000, intervalMonths: 12, notes: 'Requer analisador compatível Weber Marelli. Oficina especializada obrigatória.', priority: 'HIGH', order: 4 },
  { modelName: 'F4- R312', yearFrom: 2007, yearTo: 2008, component: 'Corrente 525, relação 15x40 — kit premium', intervalKm: 500, intervalMonths: null, notes: 'DID ERV3 ou similar de alta resistência dado os 183cv.', priority: 'HIGH', order: 5 },
  { modelName: 'F4- R312', yearFrom: 2007, yearTo: 2008, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal. Freios herdados da F4 1000 R.', priority: 'HIGH', order: 6 },
  { modelName: 'F4- R312', yearFrom: 2007, yearTo: 2008, component: 'Regulador retificador — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: '13,5-14,8V a 4.000 rpm. Falha documentada em toda linha F4 1000.', priority: 'CRITICAL', order: 7 },
  { modelName: 'F4- R312', yearFrom: 2007, yearTo: 2008, component: 'Pneus 120/70 ZR17 / 180/55 ZR17', intervalKm: null, intervalMonths: 60, notes: 'Medida padrão, fácil reposição. Pirelli Diablo Rosso IV/Corsa recomendados.', priority: 'HIGH', order: 8 },

  // F4-1000
  { modelName: 'F4-1000', yearFrom: 2004, yearTo: 2009, component: 'Óleo sintético 10W-40 (~3,0-3,3L) + filtro', intervalKm: 6000, intervalMonths: 12, notes: 'Motul 300V 10W-40 ou Shell Advance Ultra 4T. Confirmar capacidade no manual do lote específico.', priority: 'HIGH', order: 1 },
  { modelName: 'F4-1000', yearFrom: 2004, yearTo: 2009, component: 'Vela NGK CR9EB/CR9EKB (4x)', intervalKm: 8000, intervalMonths: 12, notes: 'Iridium CR9EIX como upgrade para uso esporádico — melhora partida a frio.', priority: 'MEDIUM', order: 2 },
  { modelName: 'F4-1000', yearFrom: 2004, yearTo: 2009, component: 'Folga de válvulas (DOHC 16v)', intervalKm: 11000, intervalMonths: 12, notes: 'Desmontagem de tanque/carenagem. Orçamento R$ 4.000-7.000.', priority: 'CRITICAL', order: 3 },
  { modelName: 'F4-1000', yearFrom: 2004, yearTo: 2009, component: 'Óleo do garfo Showa 49mm TiN', intervalKm: 22000, intervalMonths: 30, notes: 'Viscosidade específica de garfo de competição — confirmar com manual/especialista.', priority: 'MEDIUM', order: 4 },
  { modelName: 'F4-1000', yearFrom: 2004, yearTo: 2009, component: 'Amortecedor Sachs Racing — inspeção de vazamento', intervalKm: null, intervalMonths: 12, notes: 'Verificar mancha de óleo na haste. Recondicionamento em oficina especializada se necessário.', priority: 'MEDIUM', order: 5 },
  { modelName: 'F4-1000', yearFrom: 2004, yearTo: 2009, component: 'Corrente 525 — lubrificação e inspeção', intervalKm: 500, intervalMonths: null, notes: 'Kits DID/RK padrão de mercado, fáceis de encontrar.', priority: 'HIGH', order: 6 },
  { modelName: 'F4-1000', yearFrom: 2004, yearTo: 2009, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 7 },
  { modelName: 'F4-1000', yearFrom: 2004, yearTo: 2009, component: 'Regulador retificador — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: '13,5-14,8V a 4.000 rpm. Problema mais documentado da linha F4 1000.', priority: 'CRITICAL', order: 8 },
  { modelName: 'F4-1000', yearFrom: 2004, yearTo: 2009, component: 'Pneus 120/70 ZR17 / 190/55 ZR17', intervalKm: null, intervalMonths: 60, notes: 'Confirmar medida traseira exata gravada no pneu original (190/55 ou 190/50 conforme lote).', priority: 'HIGH', order: 9 },

  // F4-1000 RR
  { modelName: 'F4-1000 RR', yearFrom: 2005, yearTo: 2010, component: 'Óleo sintético 10W-40/15W-50 (~3,3L) + filtro', intervalKm: 5000, intervalMonths: 12, notes: '15W-50 Factory Line se usada em pista. 10W-40 para uso de rua/coleção.', priority: 'HIGH', order: 1 },
  { modelName: 'F4-1000 RR', yearFrom: 2005, yearTo: 2010, component: 'Vela NGK CR9EB/CR9EKB (4x)', intervalKm: 7000, intervalMonths: 12, notes: 'Reduzir intervalo se uso frequente em pista/trackday.', priority: 'MEDIUM', order: 2 },
  { modelName: 'F4-1000 RR', yearFrom: 2005, yearTo: 2010, component: 'Folga de válvulas (redline 13.000+ rpm)', intervalKm: 11000, intervalMonths: 12, notes: 'Desmontagem completa obrigatória. Orçamento R$ 5.000-8.000.', priority: 'CRITICAL', order: 3 },
  { modelName: 'F4-1000 RR', yearFrom: 2005, yearTo: 2010, component: 'Suspensão Öhlins (se equipada) — manutenção especializada', intervalKm: 22000, intervalMonths: 30, notes: 'Troca de óleo interno e recondicionamento de válvulas por representante Öhlins.', priority: 'MEDIUM', order: 4 },
  { modelName: 'F4-1000 RR', yearFrom: 2005, yearTo: 2010, component: 'Kit de relação 525 completo (corrente + pinhão + coroa)', intervalKm: 17000, intervalMonths: null, notes: 'DID ERV3 ou equivalente premium dado o desgaste acelerado em uso esportivo.', priority: 'HIGH', order: 5 },
  { modelName: 'F4-1000 RR', yearFrom: 2005, yearTo: 2010, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Motul RBF 600 se uso em pista.', priority: 'HIGH', order: 6 },
  { modelName: 'F4-1000 RR', yearFrom: 2005, yearTo: 2010, component: 'Regulador retificador — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: '13,5-14,8V a 4.000 rpm.', priority: 'CRITICAL', order: 7 },
  { modelName: 'F4-1000 RR', yearFrom: 2005, yearTo: 2010, component: 'Embreagem a seco — inspeção de desgaste', intervalKm: 13000, intervalMonths: 24, notes: 'Desgaste mais rápido em uso esportivo. Verificar patinação.', priority: 'MEDIUM', order: 8 },
  { modelName: 'F4-1000 RR', yearFrom: 2005, yearTo: 2010, component: 'Pneus 120/70 ZR17 / 190/55 ZR17', intervalKm: null, intervalMonths: 60, notes: 'Confirmar ano/chassi exato antes de comprar peça — nomenclatura R/RR variou tecnicamente.', priority: 'HIGH', order: 9 },

  // F4 1078RR 312
  { modelName: 'F4 1078RR 312', yearFrom: 2008, yearTo: 2010, component: 'Óleo sintético 15W-50 (~3,3L) + filtro', intervalKm: 5500, intervalMonths: 12, notes: 'Motul 300V 15W-50 Factory Line — referência para motor de maior compressão da linha (13,0:1).', priority: 'HIGH', order: 1 },
  { modelName: 'F4 1078RR 312', yearFrom: 2008, yearTo: 2010, component: 'Vela NGK CR9E (4x) — confirmar referência', intervalKm: 7000, intervalMonths: 12, notes: 'Confirmar com especialista dado documentação técnica limitada deste modelo específico.', priority: 'MEDIUM', order: 2 },
  { modelName: 'F4 1078RR 312', yearFrom: 2008, yearTo: 2010, component: 'Folga de válvulas (motor 1078cc, compressão 13:1)', intervalKm: 11000, intervalMonths: 12, notes: 'Item mais caro de toda a linha — orçamento R$ 5.000-8.000+. Motor mais raro entre mecânicos.', priority: 'CRITICAL', order: 3 },
  { modelName: 'F4 1078RR 312', yearFrom: 2008, yearTo: 2010, component: 'Fluido de freio DOT 4 (discos 320mm, pinças 4 pistões)', intervalKm: null, intervalMonths: 24, notes: 'Motul RBF 600 se uso ocasional em pista. Item de segurança não negociável.', priority: 'CRITICAL', order: 4 },
  { modelName: 'F4 1078RR 312', yearFrom: 2008, yearTo: 2010, component: 'Pastilhas de freio dianteiras (EBC HH ou Brembo esportivas)', intervalKm: 12000, intervalMonths: null, notes: 'Dado o desempenho de 190cv, priorize pastilhas de alta performance.', priority: 'HIGH', order: 5 },
  { modelName: 'F4 1078RR 312', yearFrom: 2008, yearTo: 2010, component: 'Corrente 525 — lubrificação e inspeção', intervalKm: 500, intervalMonths: null, notes: 'Kit premium obrigatório dado os 190cv.', priority: 'HIGH', order: 6 },
  { modelName: 'F4 1078RR 312', yearFrom: 2008, yearTo: 2010, component: 'Regulador retificador — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: '13,5-14,8V a 4.000 rpm. Falha documentada em toda a linha F4.', priority: 'CRITICAL', order: 7 },
  { modelName: 'F4 1078RR 312', yearFrom: 2008, yearTo: 2010, component: 'Suspensão de alta performance — inspeção de vazamento', intervalKm: null, intervalMonths: 12, notes: 'Verificar hastes do garfo e amortecedor antes de uso mais intenso.', priority: 'MEDIUM', order: 8 },
  { modelName: 'F4 1078RR 312', yearFrom: 2008, yearTo: 2010, component: 'Pneus 120/70 ZR17 / 180/55 ZR17', intervalKm: null, intervalMonths: 60, notes: 'Pirelli Diablo Supercorsa recomendado dado o potencial de 190cv.', priority: 'HIGH', order: 9 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed MV Agusta F4 (legado 750/1000/1078 — linha 4 cilindros clássica)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'MV AGUSTA', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'MV AGUSTA', vehicleTypeId: motoType.id },
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

  console.log('✅ MV Agusta F4 legado concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
