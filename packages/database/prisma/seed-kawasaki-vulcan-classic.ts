// seed-kawasaki-vulcan-classic.ts — Kawasaki Vulcan 500 (EN500), Vulcan 750 (VN750) e Vulcan 800 (VN800)
// Cruisers CLÁSSICAS Kawasaki, motores antigos refrigerados a ar (500) ou líquido (750/800),
// carburadas, produzidas entre décadas de 1980-2000. Plataformas mecânicas totalmente diferentes
// da Vulcan S / Eliminator 500 modernas (ver seed-kawasaki-vulcan-eliminator.ts).
// Nomes de modelName seguem EXATAMENTE as strings da API FIPE (parallelum.com.br) para casar
// corretamente com matchesStoredName (regra de word-boundary — não abreviar "cc"/"LTD"/"CLASSIC").
// Execute: pnpm --filter @motormacete/database db:seed:kawasaki-vulcan-classic
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

// ─── VULCAN 500 / EN500 (LTD) ────────────────────────────────────────────────
// Motor: 498cc paralelo-twin SOHC 2 válvulas/cilindro, refrigerado a AR | ~50 cv @ 8.000 rpm
// Carburador: 2× Keihin CVK (um por cilindro) | Compressão ~9,5:1
// Óleo: 10W-40 — 3,0L sem filtro / 3,4L com troca de filtro | Vela NGK DR9EA (gap 0,7mm)
// Folga de válvulas: adm 0,13-0,18mm / esc 0,18-0,23mm (motor frio)
// Pneu: 100/90-19 (F) / 140/90-15 (R) | Corrente 520 com O-ring | Tanque ~13L
// Produção mundial: 1990-2009 (chegou ao Brasil via importação ao longo dos anos 1990-2000)

const VULCAN500_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 — 3,0L sem filtro / 3,4L com troca de filtro; motor a ar exige troca em dia',
    body: 'O motor 498cc SOHC da Vulcan 500 é refrigerado a AR (sem radiador de água), o que faz o óleo trabalhar sob temperatura mais alta e degradar mais rápido que num motor líquido. Capacidade: 3,0L na troca simples, 3,4L quando o filtro também é trocado. Use 10W-40 API SG/SH ou superior — mineral ou semissintético já atende bem, mas em uso intenso ou clima muito quente, considere um semissintético (Motul 5100 10W-40, Lubrax Moto 4T 10W-40). Troque a cada 3.000-4.000 km — motor a ar é mais sensível a óleo velho que motores refrigerados a líquido.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DR9EA gap 0,7mm — motor a ar pede vela correta para dissipar calor',
    body: 'A vela original é a NGK DR9EA (gap 0,7mm / 0,028 pol.), com opção iridium DR9EIX para maior durabilidade e partida a frio mais fácil. Como o motor é refrigerado a ar, a vela também ajuda a dissipar calor da câmara de combustão — não use vela de grau térmico diferente do especificado, pode causar pré-ignição em dias quentes. Troca a cada 8.000-10.000 km (convencional) ou 15.000-20.000 km (iridium). Custo: R$ 25-45 (convencional) ou R$ 60-90 (iridium), geralmente importadas.',
  },
  {
    severity: 'WARN',
    title: 'Peças Kawasaki escassas no Brasil: recorra a peças genéricas/importadas e desmanches',
    body: 'A Vulcan 500 nunca teve importação oficial de grande volume no Brasil — peças originais Kawasaki para o mercado nacional são raras e caras (muitas vezes só sob encomenda dos EUA). Alternativas práticas: (1) peças de desgaste comuns (retentores, filtros, correntes, kits de carburador) têm equivalentes genéricos por medida — leve a peça velha a uma boa loja de rolamentos/retentores e meça; (2) para peças de motor e carenagem, importadores especializados em peças para motos clássicas americanas (eBay, RonAyers, PartsHawk) enviam ao Brasil, mas o frete e o imposto de importação pesam no bolso — agrupe pedidos; (3) grupos de Facebook "Vulcan Brasil" e fóruns como vulcanforums.com têm proprietários brasileiros trocando dicas de fornecedores locais.',
  },
  {
    severity: 'WARN',
    title: 'Carburador duplo Keihin CVK: etanol brasileiro degrada mais rápido que gasolina americana',
    body: 'Os 2 carburadores CVK (um por cilindro) foram projetados para gasolina pura americana dos anos 1990-2000 — o etanol da gasolina brasileira (E27) resseca vedações internas e forma verniz/goma nos jatos mais rápido. Se a moto ficar parada por mais de 30 dias, escoe o combustível dos carburadores (parafuso de dreno na cuba) para evitar entupimento. Sintomas de carburador sujo: marcha lenta instável, afogamento a frio, um cilindro "morto". Kits de reparo (jogo de juntas + agulha + boia) para Keihin CVK genérico custam R$ 80-150 o par e são fáceis de encontrar por medida, mesmo sem ser a marca Kawasaki.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 com O-ring — mantenha lubrificada; kit de relação genérico serve perfeitamente',
    body: 'A transmissão final é por corrente 520 com O-ring (não é eixo cardã como a Vulcan 750). Lubrifique a cada 500-800 km — corrente seca em motor a ar sofre mais porque a moto tende a rodar em trajetos mais urbanos e parados. Folga correta: 20-30mm no centro do trecho inferior, moto no cavalete central. Kits de relação (corrente 520 + pinhão + coroa) de marcas como DID, RK ou até genéricos chineses de boa qualidade servem sem problema — não é necessário pagar caro por peça "original" nesse item.',
  },
  {
    severity: 'OK',
    title: 'Moto parada por meses: cuidados antes de tentar dar partida',
    body: 'É comum encontrar Vulcan 500 usadas que passaram anos paradas em garagem. Antes de tentar ligar após longo período parado: (1) NÃO force a partida com a bateria original — troque ou carregue lentamente uma bateria nova, baterias de chumbo-ácido se sulfatam parada; (2) drene o combustível velho dos carburadores e do tanque — combustível com etanol degradado pode ter se decomposto em verniz; (3) verifique se o óleo não está com aspecto leitoso (água misturada, sinal de condensação); (4) gire o motor manualmente pela vela removida antes da primeira partida para garantir lubrificação; (5) revise mangueiras de combustível — borracha resseca e pode romper na primeira pressurização.',
  },
  {
    severity: 'OK',
    title: 'Óleo e pneus: marcas disponíveis no Brasil que atendem bem a Vulcan 500',
    body: 'Óleo: Lubrax Moto 4T 10W-40, Motul 5100 10W-40, Shell Advance 4T 10W-40 — qualquer um com API SG/SH atende, não precisa ser JASO MA pois a embreagem é a seco na maioria das versões (confirme na sua unidade). Pneus: Pirelli Sport Demon, Michelin Commander II ou Metzeler Marathon nas medidas 100/90-19 (dianteiro) e 140/90-15 (traseiro) — pneus de perfil alto típico de cruiser, poucas opções no Brasil, planeje a compra com antecedência ou importe via Mercado Livre/lojas especializadas.',
  },
  {
    severity: 'WARN',
    title: 'Regulador retificador: item de desgaste conhecido — considere upgrade preventivo',
    body: 'O regulador/retificador da Vulcan 500 tem histórico documentado de falha prematura nesta geração de motores a ar Kawasaki dos anos 1990-2000, especialmente em uso com muito calor no motor. Sintomas: bateria não carrega, farol fraco em marcha lenta, bateria "morre" em pouco tempo. Como a peça original é difícil de achar no Brasil, um regulador retificador aftermarket compatível (busque por medida de conector e amperagem, não por número de peça Kawasaki) resolve bem e custa uma fração do preço da peça genuína importada.',
  },
]

const VULCAN500_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador/retificador: principal ponto de falha elétrica — troque preventivamente',
    body: 'É o componente elétrico mais citado em fóruns internacionais (vulcanforums.com, kawasakimotorcycle.org) como causa de falha nesta plataforma. Sintoma: tensão da bateria abaixo de 13V com o motor em marcha (meça com multímetro a 3.000-4.000 rpm — deve ficar entre 13,5-14,8V). Se ultrapassar 15V ou ficar abaixo de 13V, o regulador está falhando e pode até sobrecarregar e danificar o estator. Como o motor é refrigerado a ar, o regulador (montado próximo ao motor) sofre mais calor que em motos líquido-refrigeradas — falha mais cedo. Substitua preventivamente por volta de 40.000-50.000 km rodados ou em qualquer sintoma de carga irregular.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelas juntas do motor a ar — comum em motos com muitos anos de uso',
    body: 'Motores a ar antigos sofrem mais com endurecimento e trinca das juntas de vedação (tampa de válvulas, cárter, tampa de embreagem) por causa dos ciclos de dilatação térmica maiores que num motor líquido-refrigerado. É comum encontrar Vulcan 500 usadas com pequenos vazamentos nessas juntas. Solução: troca das juntas por peça genérica de mesma medida (a maioria são intercambiáveis com juntas universais de motor a ar bicilíndrico) — custo de peça baixo (R$ 30-80), mão de obra é o item principal (requer desmontagem parcial).',
  },
  {
    severity: 'WARN',
    title: 'Carburadores dessincronizados: motor "capenga" e consumo alto em unidades com muitos km',
    body: 'Com o desgaste natural de válvulas de admissão de ar e vedações do carburador ao longo de décadas de uso, é comum os 2 carburadores da Vulcan 500 ficarem dessincronizados — um cilindro trabalha mais que o outro, causando vibração irregular, consumo alto e dificuldade na marcha lenta. Sincronização requer vacuômetro duplo (serviço de oficina especializada em carburador, R$ 100-200). Antes de suspeitar de problema grave no motor, sempre descarte esse ajuste básico primeiro.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em conectores elétricos e chicote — motos importadas antigas sofrem mais',
    body: 'Motos importadas dos EUA/Canadá para o Brasil (oficial ou não) muitas vezes não tiveram o chicote elétrico adaptado para o clima tropical úmido — conectores oxidam, causando falhas intermitentes de luz, pisca e instrumentos. Limpe conectores acessíveis com spray de contato elétrico (WD-40 Especialista Contato Elétrico) e aplique graxa dielétrica nos terminais expostos. Problema mais crítico em motos que rodaram anos no litoral ou ficaram guardadas em local úmido.',
  },
  {
    severity: 'WARN',
    title: 'Corrente e kit relação gastos por falta de manutenção em moto de uso esporádico',
    body: 'Motos de uso esporádico (rodar pouco, ficar parada meses) sofrem desgaste acelerado da corrente por falta de lubrificação regular, mesmo rodando pouco quilômetro. Corrente enferrujada ou ressecada "engripa" nos elos e desgasta o kit de relação de forma desproporcional ao km rodado. Ao comprar uma Vulcan 500 usada parada há tempo, inspecione a corrente antes de rodar — se estiver enferrujada ou com elos duros, troque o kit completo antes de qualquer viagem.',
  },
  {
    severity: 'OK',
    title: 'Vibração perceptível em alta rotação: característica do motor paralelo-twin sem eixo balanceador robusto',
    body: 'O motor 498cc paralelo-twin da Vulcan 500 tem vibração mais perceptível acima de 5.500-6.000 rpm que motos com eixo balanceador mais moderno — isso é característica de projeto dos anos 1990, não defeito. A moto foi pensada para cruzeiro em rotações mais baixas (3.000-4.500 rpm), onde a vibração é mínima e agradável. Evite manter rotações altas por longos períodos — além do desconforto, acelera o afrouxamento de parafusos e conectores.',
  },
]

const VULCAN500_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Vulcan 500 (EN500): adaptado para moto antiga com uso esporádico e km elevado',
    body: '3.000-4.000 km ou 6 meses — Troca de óleo 10W-40 (3,0L sem filtro / 3,4L com filtro). Lubrificar corrente. | 6.000 km — Verificar/limpar filtro de ar. Inspeção visual de vazamentos nas juntas do motor a ar. | 8.000-10.000 km — Troca de vela NGK DR9EA (gap 0,7mm). Verificar folga de válvulas (adm 0,13-0,18mm / esc 0,18-0,23mm, motor frio). Sincronizar os 2 carburadores. | 12.000 km — Kit relação (corrente 520 + pinhão + coroa) se desgastado. Fluido de freio (se dianteiro a disco). | 24 meses (independente do km) — Troca preventiva de TODAS as mangueiras de combustível: a borracha original tem 20-30+ anos e resseca com o etanol brasileiro, risco real de rachadura e vazamento/incêndio. | 24 meses — Retentores de bengala dianteira: inspecionar e trocar se houver qualquer sinal de óleo externo — em moto antiga, a borracha endurece mesmo sem uso. | Antes de rodar após período parado (+30 dias): drenar combustível velho dos carburadores, verificar aspecto do óleo, testar bateria, lubrificar corrente antes de qualquer viagem. | 40.000-50.000 km — Substituição preventiva do regulador/retificador (ponto de falha elétrica mais comum da plataforma).',
  },
]

// ─── VULCAN 750 / VN750 ──────────────────────────────────────────────────────
// Motor: 749cc V-twin 54° SOHC 4 válvulas/cilindro, refrigerado a LÍQUIDO | 66 cv @ 7.500 rpm | torque 6,5 kgf.m @ 6.000 rpm
// Carburador: 2× Keihin CVK34 | Compressão 10,3:1 | Válvulas com ajustadores hidráulicos (SEM regulagem manual de folga)
// Óleo: 10W-40 API SG/SH, ~2,7-3,0L na troca com filtro (confirme no manual da sua unidade — varia por ano)
// Vela: NGK DPR8EA-9 ou equivalente (2 unidades) | TRANSMISSÃO FINAL POR EIXO CARDÃ (shaft drive — NÃO tem corrente)
// Pneu: 100/90-19 (F) / 150/90-15 (R) | Tanque ~13,5L | Peso seco ~219kg | Altura do assento ~730mm
// Produção mundial: 1985-2006 — uma das Vulcan mais longevas, motor muito robusto e durável

const VULCAN750_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Transmissão por EIXO CARDÃ — a Vulcan 750 NÃO tem corrente; manutenção é diferente',
    body: 'Diferente da Vulcan 500 e da 800 (que usam corrente), a Vulcan 750 tem transmissão final por eixo cardã (shaft drive) — não existe corrente, pinhão ou coroa para lubrificar/trocar. Em compensação, o óleo da caixa de transmissão final (diferencial traseiro) precisa de troca periódica com óleo específico para engrenagens hipoides (SAE 80W-90 GL-5), algo que muitos donos desconhecem e acabam nunca trocando. Verifique o nível a cada revisão e troque a cada 20.000-24.000 km — a ausência de troca é causa comum de desgaste prematuro da coroa do cardã.',
  },
  {
    severity: 'OK',
    title: 'Válvulas com ajustadores hidráulicos: sem regulagem manual, mas fique atento a ruído',
    body: 'A Vulcan 750 tem ajustadores hidráulicos de válvula (hydraulic valve lash adjusters) — diferente da maioria das motos da época, NÃO existe regulagem manual periódica de folga de válvulas com sonda de espessura. O sistema se autorregula com a pressão do óleo. Isso simplifica a manutenção, mas exige óleo sempre no nível correto e trocado em dia — óleo velho ou baixo pode causar ruído de "batida" na tampa de válvulas. Se ouvir ruído metálico persistente do motor após a troca de óleo, procure um mecânico especializado — pode ser ajustador hidráulico com folga de ar.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 — confirme a capacidade exata no manual da sua unidade (varia por ano)',
    body: 'O motor 749cc V-twin líquido-refrigerado usa óleo 10W-40 API SG/SH, com capacidade de referência em torno de 2,7-3,0L na troca com filtro — mas a Vulcan 750 teve variações de especificação ao longo de mais de 20 anos de produção (1985-2006), então confirme no manual do proprietário específico do ano da sua moto ou meça pela vareta/visor ao completar. Marcas recomendadas no Brasil: Lubrax Moto 4T 10W-40, Motul 5100 10W-40. Intervalo: 4.000-5.000 km — motor antigo com muitos km se beneficia de troca mais frequente que o intervalo original de fábrica.',
  },
  {
    severity: 'WARN',
    title: 'Peças específicas da Vulcan 750 são raras no Brasil — junction box e reguladores são os itens mais buscados',
    body: 'A Kawasaki não vende mais peças originais para a VN750 há muitos anos, e a moto nunca teve grande volume de importação oficial no Brasil. Os itens mais buscados e mais difíceis: junction box (caixa de junção elétrica, item propenso a corrosão — ver seção de problemas), regulador/retificador, kit de reparo do carburador duplo. Fontes: importadores de peças para clássicos americanos (RonAyers, Partzilla, eBay), grupos "VN750 Riders"/vulcanforums.com onde proprietários no mundo todo compartilham onde comprar, e desmanches de moto importada no Brasil. Para itens de desgaste simples (retentores, mangueiras, correias de acessórios), meça a peça original e busque equivalente genérico — não é necessário ser peça Kawasaki.',
  },
  {
    severity: 'OK',
    title: 'Vela em par: acesso ao cilindro traseiro exige mais desmontagem',
    body: 'A Vulcan 750 tem 2 velas (uma por cilindro do V-twin 54°). O cilindro dianteiro tem acesso fácil; o cilindro traseiro fica mais escondido sob o tanque/carenagem, exigindo mais tempo de mão de obra. Vela recomendada: NGK DPR8EA-9 ou equivalente (confirme código exato pelo ano de fabricação, pois pode variar). Planeje trocar sempre as duas juntas, mesmo que uma pareça em bom estado — evita nova desmontagem em breve.',
  },
  {
    severity: 'WARN',
    title: 'Carburador duplo Keihin CVK34: combustível parado forma goma — limpeza preventiva antes de rodar moto parada',
    body: 'É um dos carburadores mais difíceis de remover da categoria segundo relatos de proprietários — a limpeza costuma ser feita com o carburador ainda montado quando possível. Se a moto ficou parada por meses, é comum encontrar boia emperrada e jatos entupidos por verniz de combustível degradado, especialmente com etanol brasileiro. Produtos como Seafoam ou similar (limpador de sistema de combustível) direto nas cubas, deixando de molho durante a noite, resolve boa parte dos casos sem precisar desmontar. Drene o combustível velho antes de guardar a moto por mais de 30 dias.',
  },
  {
    severity: 'OK',
    title: 'Motor extremamente durável: 80.000+ km bem documentados com manutenção correta',
    body: 'Apesar da idade da plataforma, o motor V-twin 749cc da Vulcan 750 é conhecido internacionalmente pela robustez — há relatos confiáveis de motos ultrapassando 80.000-100.000 km com a manutenção básica em dia (óleo, carburador, elétrica). O ponto fraco não é o motor em si, mas os componentes elétricos (junction box, regulador) e o desgaste natural de itens de borracha pela idade. Um comprador de Vulcan 750 usada não deve temer km alto se a moto tiver histórico de manutenção — deve sim inspecionar a parte elétrica com atenção.',
  },
]

const VULCAN750_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Junction box (caixa de junção elétrica): problema crônico documentado — corrosão interna',
    body: 'É o problema elétrico mais citado e documentado internacionalmente para a Vulcan 750 (vn750.com, vulcanforums.com têm tópicos extensos sobre o tema). A caixa de junção (que centraliza relés e conexões) tem vedação contra umidade insuficiente — água ou até eletrólito de bateria vazado corroem os contatos internos ao longo dos anos, causando falhas intermitentes: moto não liga, farol não acende, carga elétrica instável. Em casos extremos, o curto interno pode até estufar/derreter a caixa. Solução definitiva usada por muitos proprietários: eliminar a junction box, reconstruindo o circuito com relés externos modernos e uma caixa de fusíveis separada — é um retrofit bem documentado nos fóruns internacionais, procure um eletricista de motos experiente para esse serviço.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste do embreagem de partida (starter clutch): dificuldade para dar partida',
    body: 'É um problema documentado nesta plataforma — o starter clutch (embreagem unidirecional do motor de arranque) desgasta com o tempo, causando dificuldade crescente para a moto pegar (motor de partida gira mas não engata o motor, ou engata com ruído de "catraca patinando"). Diagnóstico: ruído metálico de deslizamento na partida. Reparo requer desmontagem parcial do motor — não é serviço simples, procure oficina com experiência em motor Kawasaki antigo.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pela junta do cárter/tampa de válvulas em motos com muitos anos de uso',
    body: 'Assim como qualquer motor antigo, as juntas de vedação da Vulcan 750 endurecem e podem vazar óleo após décadas de ciclos térmicos, especialmente se a moto ficou longos períodos parada (a borracha resseca mais parada que em uso). Inspecione visualmente o motor a cada revisão — mancha de óleo na base do cárter ou ao redor da tampa de válvulas indica necessidade de troca da junta (peça de baixo custo, mão de obra é o principal item).',
  },
  {
    severity: 'WARN',
    title: 'Petcock (torneira de combustível a vácuo): diafragma ressecado vaza combustível para o óleo',
    body: 'O petcock da Vulcan 750 funciona a vácuo — puxa o diafragma através de uma mangueira conectada ao carburador para liberar o fluxo de combustível. Com a idade, esse diafragma resseca e pode vazar combustível líquido para dentro da linha de vácuo e, em casos piores, para dentro do motor via admissão, diluindo o óleo. Sintoma: cheiro forte de combustível no óleo, nível de óleo subindo sem explicação. Kit de reparo do petcock (diafragma + vedações) é item de baixo custo e resolve o problema — mas ignorar o sintoma pode causar dano ao motor por lubrificação deficiente.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste do tensor de corrente de comando (timing chain tensioner) em motos de alta quilometragem',
    body: 'Mecânicos especializados relatam que, historicamente, o tensor de corrente de comando (que fica dentro do motor, não confundir com a inexistente corrente de transmissão) pode apresentar desgaste depois de aproximadamente 80.000 km, causando ruído metálico do motor em marcha lenta. Não é um problema universal — muitas unidades passam desse km sem sintomas — mas é um ponto de atenção em compra de moto muito rodada. Ruído tipo "matraca" vindo do centro do motor, mais audível em marcha lenta fria, é o sinal de alerta.',
  },
  {
    severity: 'WARN',
    title: 'Bateria e sistema de carga: monitore a tensão regularmente',
    body: 'Proprietários relatam problemas de carga (bateria descarregando mesmo com a moto rodando) associados tanto a rotor do alternador desgastado quanto a conexões corroídas na já mencionada junction box. Meça a tensão da bateria com o motor em marcha (3.000-4.000 rpm): deve ficar entre 13,5-14,5V. Fora dessa faixa, investigue estator, regulador/retificador e os contatos da junction box, nessa ordem de verificação mais comum.',
  },
]

const VULCAN750_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Vulcan 750 (VN750): shaft drive exige atenção diferente de moto com corrente',
    body: '4.000-5.000 km ou 6 meses — Troca de óleo do motor 10W-40 (confirme capacidade no manual da sua unidade, ~2,7-3,0L). | 8.000 km — Verificar filtro de ar. Inspeção visual de vazamento no cárter/tampa de válvulas. | 10.000 km — Trocar as 2 velas (par). Sincronizar os carburadores duplos. | 12.000 km — Fluido de freio (dianteiro a disco / traseiro conforme versão). | 20.000-24.000 km — Trocar óleo do diferencial do cardã (SAE 80W-90 GL-5) — item frequentemente esquecido por não ter corrente para lembrar da manutenção da transmissão. | 24 meses (independente do km) — Troca preventiva de TODAS as mangueiras de combustível e a mangueira de vácuo do petcock: borracha de décadas resseca com etanol brasileiro, risco de vazamento. | 24 meses — Inspeção do diafragma do petcock — sintoma de falha é cheiro de combustível no óleo. | Anual — Teste de tensão do sistema de carga (13,5-14,5V @ 3.000-4.000 rpm) e inspeção visual da junction box quanto a corrosão — problema crônico documentado da plataforma. | Antes de rodar após período parado — drenar combustível velho dos 2 carburadores, testar bateria, verificar aspecto do óleo.',
  },
]

// ─── VULCAN 800 / VN800 (inclui CLASSIC) ─────────────────────────────────────
// Motor: 805cc V-twin 55° SOHC 4 válvulas/cilindro, refrigerado a LÍQUIDO | ~55-61 cv | Compressão ~9,5:1
// Carburador: Keihin 36mm único com bomba de aceleração (accelerator pump)
// Óleo: 10W-40 API SG/SH — capacidade de referência ~2,8-3,2L com filtro (confirme no manual da sua unidade)
// Vela: NGK DPR7EA-9 ou equivalente (2 unidades, confirme pelo ano) | Corrente 530 (NÃO é cardã — diferente da 750!)
// Pneu VN800 base (A): 80/90-21 (F) / 150/80-16 (R) | Pneu VN800 Classic (B): 130/90-16 (F) / 150/80-16 (R)
// Tanque ~15L | Peso ~239kg | Altura do assento ~71cm | Produção mundial: 1995-2006

const VULCAN800_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Corrente 530 — a Vulcan 800 usa corrente, diferente da 750 (cardã); confirme antes de comprar kit',
    body: 'Atenção a essa diferença dentro da própria família Vulcan: a 750 tem eixo cardã, mas a 800 volta a usar corrente 530 na transmissão final. Ao pesquisar peças, confirme sempre o modelo exato para não comprar peça errada. Kit de relação (corrente 530 + pinhão + coroa) de marcas como DID, RK ou genéricas de qualidade atende bem — não é necessário pagar por peça Kawasaki original, que é rara e cara no Brasil. Lubrifique a cada 500-800 km, folga de 20-30mm no trecho inferior.',
  },
  {
    severity: 'OK',
    title: 'Carburador único Keihin 36mm com bomba de aceleração: resposta rápida mas exige manutenção preventiva',
    body: 'Diferente da 500 e da 750 (que têm 2 carburadores, um por cilindro), a Vulcan 800 usa um único carburador Keihin de 36mm com bomba de aceleração (accelerator pump) alimentando os dois cilindros — desenho mais simples de sincronizar, mas a bomba de aceleração tem diafragma de borracha que resseca com a idade e com o etanol brasileiro. Sintoma de bomba de aceleração ressecada: hesitação ao acelerar bruscamente. Kit de reparo do carburador (diafragmas + agulha + boia) é item padrão de manutenção preventiva em moto com mais de 15-20 anos, mesmo sem sintoma aparente.',
  },
  {
    severity: 'WARN',
    title: 'Duas configurações de roda dianteira: confirme a medida antes de comprar pneu',
    body: 'A família Vulcan 800 teve duas configurações de roda dianteira ao longo da produção: a versão "base"/standard (VN800A) usa aro 21" com pneu 80/90-21, visual mais clássico/chopper; já a versão Classic (VN800B, com o para-lamas dianteiro grande estilo americano) usa aro 16" com pneu 130/90-16. O pneu traseiro é o mesmo nas duas versões: 150/80-16. Sempre confira a medida gravada no flanco do pneu ou o aro da sua moto específica antes de fechar a compra — comprar a medida errada por presumir que "é tudo igual" é erro comum.',
  },
  {
    severity: 'WARN',
    title: 'Peças específicas da Vulcan 800 Classic (para-lamas, acabamentos) são as mais raras',
    body: 'Os itens mecânicos (motor, carburador, corrente) têm boa disponibilidade de compatíveis genéricos, mas as peças de acabamento exclusivas da versão Classic (para-lamas dianteiro grande, capa do motor cromada, banco solo) são as mais difíceis de encontrar no Brasil — praticamente só em desmanches ou importação direta dos EUA via eBay/RonAyers. Para peças mecânicas de desgaste (retentores, juntas, kits de carburador, correntes), busque por medida em lojas de rolamentos e distribuidoras de peças para motos importadas, sem necessidade de ser peça genuína Kawasaki.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 — confirme capacidade exata no manual (varia ligeiramente entre A e B)',
    body: 'O motor 805cc V-twin líquido-refrigerado usa óleo 10W-40 API SG/SH, com capacidade de referência em torno de 2,8-3,2L com troca de filtro — mas confirme a capacidade exata no manual do proprietário da sua unidade específica (varia levemente entre as versões A/base e B/Classic e entre anos). Marcas recomendadas: Motul 5100 10W-40, Lubrax Moto 4T 10W-40. Intervalo recomendado para moto antiga: 4.000-5.000 km, mais curto que o original de fábrica para compensar o desgaste acumulado do motor.',
  },
  {
    severity: 'OK',
    title: 'Vela em par: cilindro traseiro requer mais desmontagem, planeje troca simultânea',
    body: 'Assim como a 750, a Vulcan 800 tem 2 velas — uma por cilindro do V-twin 55°. Vela de referência: NGK DPR7EA-9 ou equivalente (confirme código pelo ano/versão específica, pode variar). O cilindro traseiro tem acesso mais restrito. Troque sempre as duas juntas para evitar desmontagem repetida em pouco tempo — planeje a troca de velas junto com outras revisões que já exigem acesso à parte superior do motor.',
  },
  {
    severity: 'WARN',
    title: 'Moto parada por longos períodos: siga o mesmo protocolo de cuidado das outras Vulcan clássicas',
    body: 'Vulcan 800 usada e parada há meses/anos merece a mesma checagem preventiva: drenar combustível velho do carburador (verniz/goma é o problema #1 relatado em fóruns para essa plataforma), testar/trocar bateria antes de forçar partida, verificar aspecto do óleo, inspecionar mangueiras de combustível e vácuo quanto a ressecamento antes de pressurizar o sistema pela primeira vez. Gire o motor manualmente (com a vela removida) antes da primeira partida para garantir que o óleo já circulou pelas partes internas.',
  },
]

const VULCAN800_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Vazamento/transbordamento pelo carburador: boia ou agulha da boia desgastada — risco de incêndio',
    body: 'É o problema mais documentado e mais sério desta plataforma nos fóruns internacionais (kawasakimotorcycle.org, kawasakiforums.com): combustível vazando externamente pelo carburador, às vezes saindo pelo escapamento e pingando embaixo da moto — sintoma clássico de agulha da boia (float needle) gasta, suja ou emperrada. É item de segurança crítico: combustível vazando perto do motor quente é risco real de incêndio. Se notar cheiro forte de gasolina, poça de combustível sob a moto após ficar parada, ou dificuldade de dar partida com "afogamento", NÃO ligue a moto até inspecionar o carburador. Kit de reparo (boia + agulha + juntas) resolve a grande maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento por mangueira de combustível ressecada — comum em moto com 20-30 anos',
    body: 'As mangueiras de combustível originais (cinza, com pontas afuniladas no lado do petcock) têm décadas de idade em qualquer Vulcan 800 hoje em circulação. Borracha original não foi formulada para o etanol da gasolina brasileira atual — resseca, enrijece e pode rachar, causando vazamento de combustível líquido, não apenas vapor. Substitua TODAS as mangueiras de combustível por mangueira nova compatível com etanol (busque "mangueira combustível flex" em lojas de peças automotivas/moto) preventivamente, independente de sintoma visível — é item de segurança, não só de manutenção.',
  },
  {
    severity: 'WARN',
    title: 'Ar falso na admissão (boot/coxim do carburador): marcha lenta alta e instável',
    body: 'As borrachas de vedação entre o carburador e o cilindro (intake boots) endurecem e trincam com a idade, criando entrada de ar não filtrado (ar falso) que desregula a mistura ar-combustível. Sintoma: marcha lenta alta que não estabiliza mesmo ajustando o parafuso de marcha lenta, resposta de acelerador irregular. Teste simples de oficina: borrifar spray de partida a frio (éter) ao redor da junção do carburador com o motor em marcha lenta — se o giro do motor mudar, há vazamento de ar naquele ponto. Reposição das borrachas de vedação é item de baixo custo mas crítico para o funcionamento correto do carburador único desta moto.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador: falha comum em motos desta época, mesma causa-raiz da 500 e 750',
    body: 'Como as demais Vulcan clássicas desta geração, o regulador/retificador da 800 é um ponto de desgaste conhecido — a peça fica montada próxima ao motor quente e degrada com os anos de calor acumulado. Sintoma: bateria não carrega (tensão abaixo de 13V com moto em marcha a 3.000-4.000 rpm), farol perde intensidade em marcha lenta. Substitua por peça aftermarket compatível (mais barata e mais fácil de achar que a genuína Kawasaki) ao primeiro sinal de instabilidade de carga.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pela junta do cárter e tampa de válvulas em unidades de alta quilometragem/idade',
    body: 'Como qualquer motor com décadas de uso, as juntas de vedação da Vulcan 800 endurecem com o tempo — mesmo sem km excessivo, moto guardada por anos sofre ressecamento de borracha só pela idade. Inspecione visualmente o motor a cada revisão em busca de manchas de óleo na base do cárter e ao redor da tampa de válvulas. Reposição de junta é item de baixo custo, mão de obra é o principal componente do orçamento.',
  },
  {
    severity: 'OK',
    title: 'Motor V-twin de baixa rotação: vibração é característica, não defeito',
    body: 'O motor 805cc V-twin 55° da Vulcan 800 foi projetado para entregar torque em baixa rotação com pilotagem relaxada, estilo cruiser clássico americano — vibração perceptível em marcha lenta e baixa rotação é intencional/característica de projeto (parte do "charme" do V-twin), não sinal de problema. Vibração que piora progressivamente ou aparece de forma nova e diferente do padrão da moto é que merece investigação (aperto do motor no chassi, balanceamento de roda, coxins de motor desgastados).',
  },
]

const VULCAN800_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Vulcan 800 (VN800): foco em segurança de combustível para moto com décadas de idade',
    body: '4.000-5.000 km ou 6 meses — Troca de óleo 10W-40 (confirme capacidade no manual, ~2,8-3,2L). | 8.000 km — Verificar filtro de ar. Inspeção visual de vazamento de combustível no carburador (item de segurança prioritário). | 10.000 km — Trocar as 2 velas (par). Verificar/ajustar marcha lenta e checar vedação das borrachas de admissão (ar falso). | 12.000 km — Lubrificação e ajuste de folga da corrente 530 (a cada 500-800 km) e inspeção do kit de relação. Fluido de freio. | 24 meses (independente do km) — Troca preventiva de TODAS as mangueiras de combustível — item crítico de segurança, borracha original tem décadas e não foi feita para etanol. | 24 meses — Kit de reparo do carburador (boia, agulha, diafragma da bomba de aceleração) mesmo sem sintoma aparente — moto com essa idade se beneficia de manutenção preventiva, não só corretiva. | Anual — Teste de tensão do sistema de carga (13,5-14,5V @ 3.000-4.000 rpm). Inspeção de retentores de bengala e juntas do motor quanto a vazamento. | Antes de rodar após período parado — drenar combustível velho do carburador, testar bateria, verificar óleo, lubrificar corrente antes de qualquer viagem.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────
// 3 modelName para a família 500 (mesma plataforma EN500, nomes distintos na FIPE),
// 1 modelName para a família 750, 2 modelName para a família 800.

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'VULCAN EN 500 LTD',
    yearFrom: 1990,
    yearTo: 2009,
    MACETES: VULCAN500_MACETES,
    PROBLEMAS: VULCAN500_PROBLEMAS,
    MANUTENCAO: VULCAN500_MANUTENCAO,
  },
  {
    modelName: 'VULCAN EN 500cc',
    yearFrom: 1990,
    yearTo: 2009,
    MACETES: VULCAN500_MACETES,
    PROBLEMAS: VULCAN500_PROBLEMAS,
    MANUTENCAO: VULCAN500_MANUTENCAO,
  },
  {
    modelName: 'VULCAN LTD CLASS 500cc',
    yearFrom: 1990,
    yearTo: 2009,
    MACETES: VULCAN500_MACETES,
    PROBLEMAS: VULCAN500_PROBLEMAS,
    MANUTENCAO: VULCAN500_MANUTENCAO,
  },
  {
    modelName: 'VULCAN VN 750cc',
    yearFrom: 1985,
    yearTo: 2006,
    MACETES: VULCAN750_MACETES,
    PROBLEMAS: VULCAN750_PROBLEMAS,
    MANUTENCAO: VULCAN750_MANUTENCAO,
  },
  {
    modelName: 'VULCAN VN 800cc',
    yearFrom: 1995,
    yearTo: 2006,
    MACETES: VULCAN800_MACETES,
    PROBLEMAS: VULCAN800_PROBLEMAS,
    MANUTENCAO: VULCAN800_MANUTENCAO,
  },
  {
    modelName: 'VULCAN 800 CLASSIC',
    yearFrom: 1995,
    yearTo: 2006,
    MACETES: VULCAN800_MACETES,
    PROBLEMAS: VULCAN800_PROBLEMAS,
    MANUTENCAO: VULCAN800_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'VULCAN EN 500 LTD',
    yearFrom: 1990, yearTo: 2009,
    tireSize: '100/90-19 (F) · 140/90-15 (R)',
    frontPsi: 28, rearPsi: 28,
    frontPsiLoad: 28, rearPsiLoad: 32,
    notes: 'Solo: F 28 / R 28 PSI (piloto até ~97kg). Com carona/bagagem: F 28 / R 32 PSI. Pneus de perfil alto típico de cruiser antiga — poucas opções no Brasil, planeje a compra com antecedência. Recomendados: Pirelli Sport Demon, Michelin Commander II, Metzeler Marathon nas medidas originais.',
  },
  {
    modelName: 'VULCAN EN 500cc',
    yearFrom: 1990, yearTo: 2009,
    tireSize: '100/90-19 (F) · 140/90-15 (R)',
    frontPsi: 28, rearPsi: 28,
    frontPsiLoad: 28, rearPsiLoad: 32,
    notes: 'Mesma especificação da Vulcan EN 500 LTD — mesma plataforma mecânica. Solo: F 28 / R 28 PSI. Com carona: F 28 / R 32 PSI.',
  },
  {
    modelName: 'VULCAN LTD CLASS 500cc',
    yearFrom: 1990, yearTo: 2009,
    tireSize: '100/90-19 (F) · 140/90-15 (R)',
    frontPsi: 28, rearPsi: 28,
    frontPsiLoad: 28, rearPsiLoad: 32,
    notes: 'Mesma especificação da família EN500 — mesma plataforma mecânica. Solo: F 28 / R 28 PSI. Com carona: F 28 / R 32 PSI.',
  },
  {
    modelName: 'VULCAN VN 750cc',
    yearFrom: 1985, yearTo: 2006,
    tireSize: '100/90-19 (F) · 150/90-15 (R)',
    frontPsi: 29, rearPsi: 33,
    frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Solo: F 29 / R 33 PSI. Com carona/bagagem: F 29 / R 36 PSI. Fontes variam entre 28-34 PSI conforme marca de pneu — sempre confira o máximo gravado no flanco e o valor da etiqueta na moto/manual da sua unidade. Pneu traseiro 150/90-15 é maior que o da Vulcan 500 (140/90-15).',
  },
  {
    modelName: 'VULCAN VN 800cc',
    yearFrom: 1995, yearTo: 2006,
    tireSize: '80/90-21 (F, versão base/standard) · 150/80-16 (R)',
    frontPsi: 28, rearPsi: 28,
    frontPsiLoad: 28, rearPsiLoad: 32,
    notes: 'Versão base (VN800A) com roda dianteira aro 21". Solo: F 28 / R 28 PSI. Com carona: F 28 / R 32 PSI. Confirme a medida gravada no flanco antes de comprar reposição — houve variações entre fontes (28-32 PSI), sempre priorize a etiqueta da sua moto.',
  },
  {
    modelName: 'VULCAN 800 CLASSIC',
    yearFrom: 1995, yearTo: 2006,
    tireSize: '130/90-16 (F, versão Classic) · 150/80-16 (R)',
    frontPsi: 28, rearPsi: 28,
    frontPsiLoad: 28, rearPsiLoad: 32,
    notes: 'Versão Classic (VN800B) com roda dianteira aro 16" (diferente da versão base, que usa aro 21"). Solo: F 28 / R 28 PSI. Com carona: F 28 / R 32 PSI. Confirme a medida gravada no flanco antes de comprar — não é intercambiável com o pneu dianteiro da versão base.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // VULCAN EN 500 LTD
  { modelName: 'VULCAN EN 500 LTD', yearFrom: 1990, yearTo: 2009, component: 'Óleo 10W-40 (3,0L s/ filtro / 3,4L c/ filtro)', intervalKm: 3500, intervalMonths: 6, notes: 'Motor a ar — troca mais frequente que motor líquido-refrigerado.', priority: 'HIGH', order: 1 },
  { modelName: 'VULCAN EN 500 LTD', yearFrom: 1990, yearTo: 2009, component: 'Vela NGK DR9EA (gap 0,7mm)', intervalKm: 9000, intervalMonths: null, notes: 'Iridium DR9EIX dura 15.000-20.000 km. Geralmente importada.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VULCAN EN 500 LTD', yearFrom: 1990, yearTo: 2009, component: 'Lubrificação corrente 520 O-ring', intervalKm: 600, intervalMonths: null, notes: 'Folga 20-30mm no centro do trecho inferior.', priority: 'HIGH', order: 3 },
  { modelName: 'VULCAN EN 500 LTD', yearFrom: 1990, yearTo: 2009, component: 'Folga de válvulas (adm 0,13-0,18mm / esc 0,18-0,23mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório. SOHC 2 válvulas/cilindro.', priority: 'HIGH', order: 4 },
  { modelName: 'VULCAN EN 500 LTD', yearFrom: 1990, yearTo: 2009, component: 'Sincronização dos 2 carburadores Keihin CVK', intervalKm: 10000, intervalMonths: 12, notes: 'Requer vacuômetro duplo. Sintoma de dessincronização: vibração irregular e consumo alto.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VULCAN EN 500 LTD', yearFrom: 1990, yearTo: 2009, component: 'Filtro de ar', intervalKm: 6000, intervalMonths: 12, notes: 'Verificar/limpar; trocar se danificado.', priority: 'MEDIUM', order: 6 },
  { modelName: 'VULCAN EN 500 LTD', yearFrom: 1990, yearTo: 2009, component: 'Kit relação 520 (corrente + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: 'Peça genérica atende bem, não precisa ser Kawasaki original.', priority: 'HIGH', order: 7 },
  { modelName: 'VULCAN EN 500 LTD', yearFrom: 1990, yearTo: 2009, component: 'Mangueiras de combustível — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item de segurança: borracha original ressecada por etanol pode rachar e vazar.', priority: 'CRITICAL', order: 8 },
  { modelName: 'VULCAN EN 500 LTD', yearFrom: 1990, yearTo: 2009, component: 'Retentores de bengala dianteira', intervalKm: null, intervalMonths: 24, notes: 'Endurece com a idade mesmo sem uso intenso.', priority: 'MEDIUM', order: 9 },
  { modelName: 'VULCAN EN 500 LTD', yearFrom: 1990, yearTo: 2009, component: 'Verificação do regulador/retificador (13,5-14,8V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha elétrica mais comum. Substituir preventivamente aos 40.000-50.000 km.', priority: 'CRITICAL', order: 10 },
  { modelName: 'VULCAN EN 500 LTD', yearFrom: 1990, yearTo: 2009, component: 'Fluido de freio DOT 4 (se dianteiro a disco)', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 11 },

  // VULCAN EN 500cc (mesmos itens da EN 500 LTD)
  { modelName: 'VULCAN EN 500cc', yearFrom: 1990, yearTo: 2009, component: 'Óleo 10W-40 (3,0L s/ filtro / 3,4L c/ filtro)', intervalKm: 3500, intervalMonths: 6, notes: 'Motor a ar — troca mais frequente que motor líquido-refrigerado.', priority: 'HIGH', order: 1 },
  { modelName: 'VULCAN EN 500cc', yearFrom: 1990, yearTo: 2009, component: 'Vela NGK DR9EA (gap 0,7mm)', intervalKm: 9000, intervalMonths: null, notes: 'Iridium DR9EIX dura 15.000-20.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VULCAN EN 500cc', yearFrom: 1990, yearTo: 2009, component: 'Lubrificação corrente 520 O-ring', intervalKm: 600, intervalMonths: null, notes: 'Folga 20-30mm no centro do trecho inferior.', priority: 'HIGH', order: 3 },
  { modelName: 'VULCAN EN 500cc', yearFrom: 1990, yearTo: 2009, component: 'Folga de válvulas (adm 0,13-0,18mm / esc 0,18-0,23mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 4 },
  { modelName: 'VULCAN EN 500cc', yearFrom: 1990, yearTo: 2009, component: 'Sincronização dos 2 carburadores Keihin CVK', intervalKm: 10000, intervalMonths: 12, notes: 'Requer vacuômetro duplo.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VULCAN EN 500cc', yearFrom: 1990, yearTo: 2009, component: 'Filtro de ar', intervalKm: 6000, intervalMonths: 12, notes: 'Verificar/limpar; trocar se danificado.', priority: 'MEDIUM', order: 6 },
  { modelName: 'VULCAN EN 500cc', yearFrom: 1990, yearTo: 2009, component: 'Kit relação 520 (corrente + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: 'Peça genérica atende bem.', priority: 'HIGH', order: 7 },
  { modelName: 'VULCAN EN 500cc', yearFrom: 1990, yearTo: 2009, component: 'Mangueiras de combustível — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item de segurança contra ressecamento por etanol.', priority: 'CRITICAL', order: 8 },
  { modelName: 'VULCAN EN 500cc', yearFrom: 1990, yearTo: 2009, component: 'Retentores de bengala dianteira', intervalKm: null, intervalMonths: 24, notes: 'Endurece com a idade mesmo sem uso intenso.', priority: 'MEDIUM', order: 9 },
  { modelName: 'VULCAN EN 500cc', yearFrom: 1990, yearTo: 2009, component: 'Verificação do regulador/retificador (13,5-14,8V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Substituir preventivamente aos 40.000-50.000 km.', priority: 'CRITICAL', order: 10 },
  { modelName: 'VULCAN EN 500cc', yearFrom: 1990, yearTo: 2009, component: 'Fluido de freio DOT 4 (se dianteiro a disco)', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 11 },

  // VULCAN LTD CLASS 500cc (mesmos itens)
  { modelName: 'VULCAN LTD CLASS 500cc', yearFrom: 1990, yearTo: 2009, component: 'Óleo 10W-40 (3,0L s/ filtro / 3,4L c/ filtro)', intervalKm: 3500, intervalMonths: 6, notes: 'Motor a ar — troca mais frequente que motor líquido-refrigerado.', priority: 'HIGH', order: 1 },
  { modelName: 'VULCAN LTD CLASS 500cc', yearFrom: 1990, yearTo: 2009, component: 'Vela NGK DR9EA (gap 0,7mm)', intervalKm: 9000, intervalMonths: null, notes: 'Iridium DR9EIX dura 15.000-20.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VULCAN LTD CLASS 500cc', yearFrom: 1990, yearTo: 2009, component: 'Lubrificação corrente 520 O-ring', intervalKm: 600, intervalMonths: null, notes: 'Folga 20-30mm no centro do trecho inferior.', priority: 'HIGH', order: 3 },
  { modelName: 'VULCAN LTD CLASS 500cc', yearFrom: 1990, yearTo: 2009, component: 'Folga de válvulas (adm 0,13-0,18mm / esc 0,18-0,23mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 4 },
  { modelName: 'VULCAN LTD CLASS 500cc', yearFrom: 1990, yearTo: 2009, component: 'Sincronização dos 2 carburadores Keihin CVK', intervalKm: 10000, intervalMonths: 12, notes: 'Requer vacuômetro duplo.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VULCAN LTD CLASS 500cc', yearFrom: 1990, yearTo: 2009, component: 'Filtro de ar', intervalKm: 6000, intervalMonths: 12, notes: 'Verificar/limpar; trocar se danificado.', priority: 'MEDIUM', order: 6 },
  { modelName: 'VULCAN LTD CLASS 500cc', yearFrom: 1990, yearTo: 2009, component: 'Kit relação 520 (corrente + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: 'Peça genérica atende bem.', priority: 'HIGH', order: 7 },
  { modelName: 'VULCAN LTD CLASS 500cc', yearFrom: 1990, yearTo: 2009, component: 'Mangueiras de combustível — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item de segurança contra ressecamento por etanol.', priority: 'CRITICAL', order: 8 },
  { modelName: 'VULCAN LTD CLASS 500cc', yearFrom: 1990, yearTo: 2009, component: 'Retentores de bengala dianteira', intervalKm: null, intervalMonths: 24, notes: 'Endurece com a idade mesmo sem uso intenso.', priority: 'MEDIUM', order: 9 },
  { modelName: 'VULCAN LTD CLASS 500cc', yearFrom: 1990, yearTo: 2009, component: 'Verificação do regulador/retificador (13,5-14,8V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Substituir preventivamente aos 40.000-50.000 km.', priority: 'CRITICAL', order: 10 },
  { modelName: 'VULCAN LTD CLASS 500cc', yearFrom: 1990, yearTo: 2009, component: 'Fluido de freio DOT 4 (se dianteiro a disco)', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 11 },

  // VULCAN VN 750cc
  { modelName: 'VULCAN VN 750cc', yearFrom: 1985, yearTo: 2006, component: 'Óleo 10W-40 (~2,7-3,0L com filtro — confirme no manual da unidade)', intervalKm: 4500, intervalMonths: 6, notes: 'Motor V-twin líquido-refrigerado. Capacidade variou entre anos de produção.', priority: 'HIGH', order: 1 },
  { modelName: 'VULCAN VN 750cc', yearFrom: 1985, yearTo: 2006, component: 'Óleo do diferencial do eixo cardã (SAE 80W-90 GL-5)', intervalKm: 22000, intervalMonths: 24, notes: 'Item frequentemente esquecido por não ter corrente. Transmissão final por shaft drive.', priority: 'HIGH', order: 2 },
  { modelName: 'VULCAN VN 750cc', yearFrom: 1985, yearTo: 2006, component: 'Velas NGK DPR8EA-9 (ou equivalente, confirmar por ano) ×2', intervalKm: 10000, intervalMonths: null, notes: 'Sempre em par. Cilindro traseiro tem acesso mais difícil.', priority: 'HIGH', order: 3 },
  { modelName: 'VULCAN VN 750cc', yearFrom: 1985, yearTo: 2006, component: 'Verificação de ruído nos ajustadores hidráulicos de válvula', intervalKm: null, intervalMonths: 12, notes: 'Sem regulagem manual — sistema autoajustável. Ruído metálico indica necessidade de checar óleo/pressão.', priority: 'MEDIUM', order: 4 },
  { modelName: 'VULCAN VN 750cc', yearFrom: 1985, yearTo: 2006, component: 'Sincronização dos carburadores Keihin CVK34 duplos', intervalKm: 10000, intervalMonths: 12, notes: 'Um dos carburadores mais difíceis de remover da categoria — limpeza in-place quando possível.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VULCAN VN 750cc', yearFrom: 1985, yearTo: 2006, component: 'Filtro de ar', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar/trocar.', priority: 'MEDIUM', order: 6 },
  { modelName: 'VULCAN VN 750cc', yearFrom: 1985, yearTo: 2006, component: 'Mangueiras de combustível e vácuo do petcock — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item crítico de segurança: borracha de décadas ressecada por etanol.', priority: 'CRITICAL', order: 7 },
  { modelName: 'VULCAN VN 750cc', yearFrom: 1985, yearTo: 2006, component: 'Inspeção do diafragma do petcock a vácuo', intervalKm: null, intervalMonths: 24, notes: 'Falha vaza combustível para o óleo — cheiro de gasolina no óleo é sintoma.', priority: 'HIGH', order: 8 },
  { modelName: 'VULCAN VN 750cc', yearFrom: 1985, yearTo: 2006, component: 'Inspeção da junction box (corrosão elétrica)', intervalKm: null, intervalMonths: 12, notes: 'Problema crônico documentado da plataforma. Considerar retrofit com relés externos.', priority: 'CRITICAL', order: 9 },
  { modelName: 'VULCAN VN 750cc', yearFrom: 1985, yearTo: 2006, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 10 },
  { modelName: 'VULCAN VN 750cc', yearFrom: 1985, yearTo: 2006, component: 'Verificação do sistema de carga (13,5-14,5V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Investigar estator, regulador e junction box nessa ordem se fora da faixa.', priority: 'HIGH', order: 11 },

  // VULCAN VN 800cc
  { modelName: 'VULCAN VN 800cc', yearFrom: 1995, yearTo: 2006, component: 'Óleo 10W-40 (~2,8-3,2L com filtro — confirme no manual da unidade)', intervalKm: 4500, intervalMonths: 6, notes: 'Motor V-twin líquido-refrigerado 805cc.', priority: 'HIGH', order: 1 },
  { modelName: 'VULCAN VN 800cc', yearFrom: 1995, yearTo: 2006, component: 'Velas NGK DPR7EA-9 (ou equivalente, confirmar por ano) ×2', intervalKm: 10000, intervalMonths: null, notes: 'Sempre em par. Cilindro traseiro com acesso mais restrito.', priority: 'HIGH', order: 2 },
  { modelName: 'VULCAN VN 800cc', yearFrom: 1995, yearTo: 2006, component: 'Lubrificação corrente 530', intervalKm: 600, intervalMonths: null, notes: 'Diferente da 750 (cardã) — a 800 usa corrente. Folga 20-30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'VULCAN VN 800cc', yearFrom: 1995, yearTo: 2006, component: 'Inspeção de vazamento no carburador único Keihin 36mm (boia/agulha)', intervalKm: 6000, intervalMonths: 6, notes: 'Problema mais documentado da plataforma — risco de incêndio se ignorado.', priority: 'CRITICAL', order: 4 },
  { modelName: 'VULCAN VN 800cc', yearFrom: 1995, yearTo: 2006, component: 'Verificação das borrachas de admissão (ar falso)', intervalKm: 12000, intervalMonths: 12, notes: 'Trincas endurecidas causam marcha lenta alta e instável.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VULCAN VN 800cc', yearFrom: 1995, yearTo: 2006, component: 'Filtro de ar', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar/trocar.', priority: 'MEDIUM', order: 6 },
  { modelName: 'VULCAN VN 800cc', yearFrom: 1995, yearTo: 2006, component: 'Mangueiras de combustível — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item crítico de segurança: risco de vazamento/incêndio com borracha ressecada.', priority: 'CRITICAL', order: 7 },
  { modelName: 'VULCAN VN 800cc', yearFrom: 1995, yearTo: 2006, component: 'Kit relação 530 (corrente + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: 'Peça genérica atende bem.', priority: 'HIGH', order: 8 },
  { modelName: 'VULCAN VN 800cc', yearFrom: 1995, yearTo: 2006, component: 'Verificação do regulador/retificador (13,5-14,5V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Mesma causa-raiz de falha que a 500/750: peça próxima ao calor do motor.', priority: 'CRITICAL', order: 9 },
  { modelName: 'VULCAN VN 800cc', yearFrom: 1995, yearTo: 2006, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 10 },

  // VULCAN 800 CLASSIC (mesmos itens da VN 800cc)
  { modelName: 'VULCAN 800 CLASSIC', yearFrom: 1995, yearTo: 2006, component: 'Óleo 10W-40 (~2,8-3,2L com filtro — confirme no manual da unidade)', intervalKm: 4500, intervalMonths: 6, notes: 'Motor V-twin líquido-refrigerado 805cc.', priority: 'HIGH', order: 1 },
  { modelName: 'VULCAN 800 CLASSIC', yearFrom: 1995, yearTo: 2006, component: 'Velas NGK DPR7EA-9 (ou equivalente, confirmar por ano) ×2', intervalKm: 10000, intervalMonths: null, notes: 'Sempre em par. Cilindro traseiro com acesso mais restrito.', priority: 'HIGH', order: 2 },
  { modelName: 'VULCAN 800 CLASSIC', yearFrom: 1995, yearTo: 2006, component: 'Lubrificação corrente 530', intervalKm: 600, intervalMonths: null, notes: 'Folga 20-30mm no centro do trecho inferior.', priority: 'HIGH', order: 3 },
  { modelName: 'VULCAN 800 CLASSIC', yearFrom: 1995, yearTo: 2006, component: 'Inspeção de vazamento no carburador único Keihin 36mm (boia/agulha)', intervalKm: 6000, intervalMonths: 6, notes: 'Problema mais documentado da plataforma — risco de incêndio se ignorado.', priority: 'CRITICAL', order: 4 },
  { modelName: 'VULCAN 800 CLASSIC', yearFrom: 1995, yearTo: 2006, component: 'Verificação das borrachas de admissão (ar falso)', intervalKm: 12000, intervalMonths: 12, notes: 'Trincas endurecidas causam marcha lenta alta e instável.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VULCAN 800 CLASSIC', yearFrom: 1995, yearTo: 2006, component: 'Filtro de ar', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar/trocar.', priority: 'MEDIUM', order: 6 },
  { modelName: 'VULCAN 800 CLASSIC', yearFrom: 1995, yearTo: 2006, component: 'Mangueiras de combustível — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item crítico de segurança: risco de vazamento/incêndio com borracha ressecada.', priority: 'CRITICAL', order: 7 },
  { modelName: 'VULCAN 800 CLASSIC', yearFrom: 1995, yearTo: 2006, component: 'Kit relação 530 (corrente + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: 'Peça genérica atende bem.', priority: 'HIGH', order: 8 },
  { modelName: 'VULCAN 800 CLASSIC', yearFrom: 1995, yearTo: 2006, component: 'Verificação do regulador/retificador (13,5-14,5V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Mesma causa-raiz de falha que a 500/750: peça próxima ao calor do motor.', priority: 'CRITICAL', order: 9 },
  { modelName: 'VULCAN 800 CLASSIC', yearFrom: 1995, yearTo: 2006, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Kawasaki Vulcan Clássicas (500/EN500, 750/VN750, 800/VN800)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'KAWASAKI', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'KAWASAKI', vehicleTypeId: motoType.id },
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

  console.log('✅ Kawasaki Vulcan Clássicas concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
