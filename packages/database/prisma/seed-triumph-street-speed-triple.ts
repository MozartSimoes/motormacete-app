// seed-triumph-street-speed-triple.ts — Triumph Street Triple 675/765 e Speed Triple 1050
// Naked esportiva tricilíndrica britânica. Triumph dobrou a produção no Brasil em 2024
// (fábrica de Manaus) e passou de ~20 para 38 concessionárias no país — peças e revenda
// autorizada estão mais fáceis de achar hoje do que há poucos anos.
// Execute: pnpm --filter @motormacete/database db:seed:triumph-street-speed-triple
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

// ─── STREET TRIPLE 675 / 675R (2007–2016) ────────────────────────────────────
// Motor: 675cc DOHC 3 cilindros líquido (mesmo bloco do Daytona 675) | ~105-108cv @ ~11.700rpm
// Torque ~68-69Nm @ 9.100rpm | Óleo 10W-40 sintético 2,9L (só troca) / 3,1L (com filtro)
// Vela NGK CR9EK (iridium CR9EIX) gap 0,8mm | Pneu 120/70-17 (F) / 180/55-17 (R)
// Freios: base = Nissin | 675R = Brembo radial + suspensão Öhlins
// Folga de válvulas a cada 20.000 km (adm 0,10-0,20mm / esc 0,20-0,30mm, motor frio)

const ST675_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Tensor de corrente de comando (cam chain tensioner): o ponto fraco conhecido do 675',
    body: 'O motor 675cc tem histórico de tensor de corrente de comando automático que falha silenciosamente — muitas vezes sem chocalho perceptível antes de causar desgaste interno (limalha de alumínio no óleo). Sintoma quando aparece: chocalho metálico no ralenti e baixas rotações, que some ao acelerar. A Triumph revisou o design ao longo dos anos. Recomendação de proprietários experientes: trocar por tensor manual (aftermarket, ex. APE Racing) a cada 30.000-40.000 km ou ao menor sinal de ruído — evita o risco de dano maior ao motor.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 sintético — 2,9L na troca simples / 3,1L com filtro',
    body: 'Motor 675cc DOHC com embreagem multidisco em banho de óleo. Use 10W-40 ou 10W-50 sintético de motocicleta (Motul 7100, Ipone Full Power, Castrol Power 1). Capacidade: 2,9L só óleo, 3,1L trocando o filtro (Hiflofiltro HF204RC ou similar), 3,5L no dry-fill (motor seco). Intervalo: 10.000 km ou 12 meses. Motor de alta rotação (redline ~12.700 rpm) sofre mais com óleo degradado — não estique o intervalo.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EK gap 0,8mm — troque junto da folga de válvulas',
    body: 'Vela original NGK CR9EK (equivalente iridium: NGK CR9EIX, dura bem mais). Gap: 0,8mm. Acesso relativamente fácil no motor 675 (tanque solto libera o cabeçote). Intervalo recomendado: junto com a checagem de folga de válvulas, a cada 20.000 km / 12.000 milhas. Sintoma de vela gasta: falha de ignição em alta rotação, resposta "borrachuda" acima de 8.000 rpm.',
  },
  {
    severity: 'OK',
    title: 'Diferença 675 base × 675R: suspensão e freios, motor é o mesmo',
    body: 'A Street Triple R (675R) usa suspensão Öhlins (traseira, a partir de 2009) e pinças de freio Brembo radiais com discos maiores — a base usa Nissin. O motor e a mecânica de troca de óleo/vela/corrente são idênticos. Ao comprar usada, confirme visualmente: amortecedor traseiro dourado (Öhlins) e pinças douradas/vermelhas (Brembo) indicam R. Isso importa para peças de suspensão e pastilhas de freio, que são específicas de cada versão.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70-17 (F) / 180/55-17 (R) — pressão 34/42 PSI',
    body: 'Medida original: 120/70-17 dianteiro, 180/55-17 traseiro. Pressão recomendada a frio: 34 PSI dianteiro, 42 PSI traseiro (verifique o adesivo no balanção). Pneus esportivos recomendados: Pirelli Diablo Rosso III, Michelin Power 5, Metzeler Sportec M9 — todos disponíveis em medida original no Brasil pela rede de revendas de pneus premium.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — kit relação e lubrificação frequente evitam desgaste do motor de alta giro',
    body: 'A Street Triple 675 usa corrente na bitola 520 (mais leve que o padrão 525/530 de motos maiores, adequada aos ~105-108cv). Lubrifique a cada 500-800 km — o motor de giro alto (redline perto de 12.700 rpm) castiga a corrente em acelerações. Folga correta: 25-35mm no centro do trecho inferior. Kit relação completo (corrente + pinhão + coroa): procure DID 520VX3 ou RK GB520XSO — durabilidade de 20.000-25.000 km com boa manutenção.',
  },
  {
    severity: 'OK',
    title: 'Triumph forte no Brasil hoje: peças originais e revenda muito mais fáceis que há 10 anos',
    body: 'A Triumph expandiu fortemente no país nos últimos anos, dobrando produção na fábrica de Manaus e ampliando a rede para quase 40 concessionárias. Isso facilita achar peças originais e mão de obra especializada — cenário bem diferente de quando a 675 chegava só por importação paralela. A Street Triple 675 é hoje procurada por quem já teve nakeds japonesas (Hornet, Fazer, MT) e quer um upgrade de sonoridade e chassi sem partir para uma superesportiva pura.',
  },
]

const ST675_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Tensor de corrente de comando: falha pode danificar o interior do motor sem aviso claro',
    body: 'O ponto mais documentado nos fóruns Triumph 675 Forums e Triumph Rat: o tensor automático da corrente de comando pode falhar e, em casos extremos, causar limalha de alumínio circulando no óleo antes de qualquer chocalho perceptível. Se comprar uma 675 usada sem histórico, vale abrir o bujão de óleo e verificar partículas metálicas, ou pedir a um mecânico de confiança para inspecionar. Prevenção: troca preventiva do tensor (ou upgrade para manual) entre 25.000-35.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem sem sistema antihopping na versão pré-2013: cuidado com reduções bruscas',
    body: 'A Street Triple 675/675R até 2012 não tem embreagem assistida antihopping (slipper clutch) — recurso que só chegou na geração seguinte (2013+) e na 765. Reduções bruscas de marcha em alta rotação podem travar momentaneamente a roda traseira. Adapte o estilo de pilotagem: reduza com blip de acelerador (rev-match) e use a embreagem com progressividade em freadas fortes.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de posição de marcha neutra: luz de neutro que pisca ou não acende',
    body: 'Problema recorrente relatado em fóruns: o sensor de neutro (localizado na tampa da embreagem) oxida ou desgasta o contato, fazendo a luz verde de neutro falhar. Não afeta o funcionamento da moto, só a indicação. Limpeza do conector com contato elétrico resolve na maioria dos casos; se persistir, o sensor é uma peça de baixo custo (R$ 80-150) e troca simples.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico e conectores expostos: corrosão em uso com chuva frequente',
    body: 'Assim como outras motos com chicote exposto sob o tanque e perto do motor, a 675 sofre com oxidação de conectores em uso frequente na chuva. Sintomas: velocímetro digital piscando, luzes de aviso falsas no painel, falha intermitente de partida. Aplique graxa dielétrica nos conectores acessíveis a cada revisão e verifique o aterramento do motor (cabo terra entre bloco e chassi) se aparecerem falhas elétricas difusas.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pelo retentor da bengala em uso trepidado: comum acima de 30.000 km',
    body: 'As bengalas (Kayaba na base, Öhlins/Showa em algumas R) podem vazar óleo pelos retentores após uso prolongado em pavimento ruim. Sintoma: óleo escuro na parte inferior do tubo interno, amortecimento irregular. Retentores genéricos de mesma medida (41mm) resolvem — a maioria das oficinas especializadas em suspensão faz o serviço sem precisar de peça original Triumph.',
  },
]

const ST675_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Street Triple 675/675R: revisão a cada 10.000 km, folga de válvulas a cada 20.000 km',
    body: '1.000 km — Revisão de amaciamento: troca de óleo + inspeção geral. | 10.000 km — Troca de óleo (10W-40, 2,9-3,1L) + filtro. Lubrificar/verificar folga da corrente. | 12.000 km / 20.000 km (o que vier primeiro) — Trocar vela NGK CR9EK. Checar folga de válvulas (adm 0,10-0,20mm / esc 0,20-0,30mm, motor frio). | 20.000 km — Troca de fluido de freio DOT 4. Inspecionar tensor de corrente de comando (ruído no ralenti). | 25.000 km — Kit relação 520 se desgastado. | 30.000 km — Considerar upgrade do tensor de corrente para manual. Inspecionar retentores de bengala. | Anual — Verificar bateria e conectores elétricos.',
  },
]

// ─── STREET TRIPLE 765 S / R / RS / RX (2017+) ───────────────────────────────
// Motor: 765cc DOHC 3 cilindros líquido, bloco derivado do motor do Moto2 | compressão 12,65:1
// S: 111-113cv @ 11.250rpm / 73Nm @ 9.100rpm | R: 116-118cv @ 12.000rpm / 77Nm @ 9.400rpm
// RS: 121-123cv @ 11.700rpm / 77Nm @ 10.800rpm (RS 2020+ chegou a 128cv) | RX: edição especial baseada na RS
// Óleo 10W-40/50 sintético 2,88L (s/ filtro) / 3,08L (c/ filtro) | Folga de válvulas a cada 20.000 km
// Pneu 120/70-17 (F) / 180/55-17 (R), pressão 33/42 PSI | RS: Showa BPF + Öhlins STX40 + Brembo Stylema

const ST765_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40/50 sintético — 2,88L sem filtro / 3,08L trocando o filtro',
    body: 'O motor 765cc (derivado do bloco usado no Moto2) exige óleo sintético de qualidade — 10W-40 ou 10W-50 JASO MA2 (Motul 7100, Castrol Power 1, Ipone Full Power). Capacidade: 2,88L na troca simples, 3,08L trocando também o filtro de óleo. Intervalo oficial: 10.000 km / 12 meses. Uso em pista ou muita rotação alta: reduza para 6.000-8.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Quickshifter: sensor na embreagem é sensível a manete/peças de terceiros',
    body: 'O quickshifter bidirecional de série (todas as versões 765) atua por corte momentâneo de ignição/injeção (~60ms). Falhas relatadas: engate "molenga" ou que exige mais de uma tentativa, principalmente na troca de 4ª para 5ª em uso urbano. Causa comum documentada em fóruns: manete de embreagem aftermarket instalado sem os bushings corretos, que deixa o sensor sob a manete "bambo" e perde o contato. Se o quickshifter falhar, confira primeiro a folga e o alinhamento do sensor antes de suspeitar da ECU.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas a cada 20.000 km — motor tolera intervalo longo',
    body: 'A folga de válvulas do 765 é verificada a cada 20.000 km / 12.000 milhas — intervalo relativamente longo para um tricilíndrico esportivo, graças ao desenho de balancins do motor atual. Motor frio obrigatório para a medição. Esse é um serviço de oficina especializada (acesso ao cabeçote exige desmontagem de carenagem/tanque) — reserve meio período de serviço.',
  },
  {
    severity: 'OK',
    title: 'RS: suspensão Showa BPF + Öhlins STX40 — regule a pré-carga para o seu peso',
    body: 'A Street Triple RS vem com garfo invertido Showa BPF (Big Piston Fork) dianteiro e monoamortecedor Öhlins STX40 totalmente ajustável (pré-carga, compressão e retorno) na traseira. Vale a pena ajustar a pré-carga traseira para o peso do piloto + carga — a maioria das RS sai de fábrica ajustada para um piloto de 75-80kg. Freios Brembo Stylema (a partir de 2020) são um upgrade real de mordida em frenagens fortes comparado ao Brembo M4.32 anterior.',
  },
  {
    severity: 'OK',
    title: 'Diferença S / R / RS / RX: potência, suspensão e eletrônica, motor-base é o mesmo bloco 765cc',
    body: 'S (~111-113cv): entrada, suspensão convencional Showa, sem quickshifter de série em alguns anos-modelo. R (~116-118cv): meio-termo, suspensão Showa ajustável. RS (~121-128cv conforme ano): topo de linha, Showa BPF + Öhlins STX40, Brembo, modos de pilotagem completos. RX: edição especial limitada baseada na RS, com grafismo e acabamentos exclusivos, mesma mecânica. Para peças de motor (óleo, vela, corrente, filtro), todas as versões compartilham especificação.',
  },
  {
    severity: 'OK',
    title: 'Rede Triumph em expansão no Brasil facilita atendimento em garantia e peças',
    body: 'A Street Triple 765 é um dos carros-chefe da Triumph no Brasil hoje, junto com a linha de 400cc fabricada em Manaus. Com quase 40 concessionárias no país, encontrar uma oficina autorizada para o serviço de folga de válvulas ou atualização de firmware da ECU (comum em recalls de quickshifter) ficou bem mais fácil do que na geração 675.',
  },
]

const ST765_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Quickshifter com falha intermitente de engate',
    body: 'Alguns proprietários relatam que a alavanca de câmbio se move mas a marcha não engata de primeira, exigindo repetir o movimento — mais comum em uso urbano de baixa rotação do que em alta giro. Antes de levar à concessionária, verifique se o manete de embreagem é original (peças de terceiros sem bucha correta são a causa mais comum) e se o cabo/sensor está bem conectado. Atualizações de firmware da ECU em alguns anos-modelo melhoraram a resposta em baixa marcha.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de posição de marcha: falsos neutros e hesitação entre trocas',
    body: 'Falha do sensor de posição de marcha pode causar falsos neutros (a moto parece "pular" a marcha), hesitação na troca e acendimento de luzes de aviso no painel digital. Diagnóstico exige leitor de diagnóstico Triumph (a maioria das concessionárias tem). Não é um problema generalizado, mas aparece com frequência suficiente nos fóruns para valer a checagem se a moto apresentar troca de marcha inconsistente.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem assistida (torque-assist): desgaste do conjunto de rampas em uso muito agressivo',
    body: 'A embreagem multidisco com sistema torque-assist/antihopping deixa a manete mais leve e evita travamento da roda em reduções bruscas. Em uso muito agressivo (muitas reduções fortes, pilotagem de track day), as rampas do sistema podem desgastar mais rápido que o normal e causar patinação sob aceleração forte. Inspecione o desgaste dos discos a cada revisão maior (20.000 km) se você anda em pista com frequência.',
  },
  {
    severity: 'WARN',
    title: 'Bateria fraca afeta toda a eletrônica: quickshifter, modos de pilotagem e TFT',
    body: 'O 765 depende de uma rede elétrica mais complexa que a 675 (modos de pilotagem, TFT colorido, quickshifter, controle de tração). Bateria com tensão abaixo de 12,4V em repouso pode causar comportamento errático nesses sistemas — luzes piscando, quickshifter instável, tela reiniciando. Mantenha a bateria de série (geralmente selada, sem manutenção) sempre carregada; troque preventivamente a cada 3-4 anos mesmo sem sintomas.',
  },
]

const ST765_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Street Triple 765 (S/R/RS/RX): revisão a cada 10.000 km, folga de válvulas a cada 20.000 km',
    body: '1.000 km — Revisão de amaciamento. | 10.000 km — Troca de óleo (10W-40/50, 2,88-3,08L) + filtro. Inspeção de corrente (folga 25-35mm). | 10.000 km — Verificar funcionamento do quickshifter e folga do manete de embreagem. | 20.000 km — Folga de válvulas (adm/esc conforme manual, motor frio). Troca de vela. Fluido de freio DOT 4. | 20.000 km — Inspeção do conjunto de embreagem assistida (uso intenso/pista). | 30.000 km — Kit relação se desgastado. Verificar sensor de posição de marcha se houver falsos neutros. | Anual — Atualização de firmware da ECU na concessionária (melhoria de resposta do quickshifter em alguns anos-modelo).',
  },
]

// ─── SPEED TRIPLE 1050i / 1050R (2005–2017) ──────────────────────────────────
// Motor: 1050cc DOHC 3 cilindros líquido | 1050i (2005-2010): 131cv @ 9.100rpm / 105Nm @ 5.100rpm
// 1050R (2011-2015): 135cv @ 9.400rpm / 111Nm @ 7.750rpm (versão com Öhlins e rodas forjadas)
// Óleo 10W-40 sintético ~3,2L (com filtro) | Vela NGK CR9EK gap 0,7mm | Compressão 12,0:1
// Pneu 120/70-17 (F) / 180/55-17 (R), pressão 34/42 PSI | Corrente ~106 elos, relação 18/42
// Retificador/regulador SCR de série é ponto fraco crônico, principalmente no 1050i

const SP1050_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Retificador/regulador original (SCR): considere upgrade para MOSFET preventivamente',
    body: 'O retificador/regulador de série do Speed Triple 1050 (tecnologia SCR) é um ponto fraco documentado — superaquece e falha com curto elétrico, podendo queimar o estator do alternador junto. Upgrade recomendado pela comunidade: retificador MOSFET tipo FH012AB (ou equivalente compatível), mais eficiente termicamente e muito mais confiável. Custo do upgrade: R$ 400-900 dependendo do fornecedor. Mantenha o óleo sempre no nível máximo (ou levemente acima) — o óleo ajuda a resfriar a bobina do alternador, que fica no cárter.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 sintético — cerca de 3,2L com troca de filtro',
    body: 'Motor 1050cc DOHC de alta performance, compressão 12,0:1. Use 10W-40 sintético de motocicleta (Motul 7100, Castrol Power 1). Capacidade aproximada: 3,2L com troca de filtro. Intervalo: 10.000 km / 6 meses conforme cronograma Triumph. Marcas japonesas equivalentes (Honda SS T4, Yamalube) também são compatíveis em viscosidade, mas prefira sintético puro pela alta rotação do motor.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EK gap 0,7mm — algumas unidades usam CR8EK/CR8EIX',
    body: 'A vela padrão do Speed Triple 1050 é a NGK CR9EK, gap 0,7mm. Dependendo do ano/mercado de origem da moto importada, algumas especificações citam NGK CR8EK ou a versão iridium CR8EIX (maior durabilidade, até 20.000 km). Confirme o código gravado na vela atual antes de comprar reposição — evite misturar graus térmicos diferentes entre os 3 cilindros.',
  },
  {
    severity: 'OK',
    title: 'Corrente com ~106 elos, relação 18/42 — folga a cada 800 km',
    body: 'O Speed Triple 1050 usa corrente robusta adequada aos ~131-135cv do motor, com pinhão 18 dentes e coroa 42 dentes (106 elos). Verifique a folga a cada 800 km — motor com torque elevado em baixa rotação castiga a transmissão. Kit relação completo (DID ou RK reforçada): invista em corrente com retentor X-ring para durabilidade em uso de alta potência.',
  },
  {
    severity: 'OK',
    title: '1050R: suspensão Öhlins e rodas forjadas — diferencial sobre o 1050i',
    body: 'O Speed Triple 1050R (2011+) trouxe suspensão totalmente ajustável Öhlins (garfo dianteiro e monoamortecedor traseiro) e rodas forjadas mais leves, além de ganho de potência e torque sobre o 1050i original. Peças de suspensão Öhlins específicas da R não são intercambiáveis com o 1050i — confirme a versão antes de comprar componentes de suspensão usados.',
  },
  {
    severity: 'OK',
    title: 'Naked de maior cilindrada da Triumph disponível no mercado nacional — procurada por quem vem de nakeds grandes japonesas',
    body: 'O Speed Triple 1050 (geração anterior à atual 1200, que ainda não circula pela tabela FIPE) é a naked tricilíndrica de maior cilindrada da marca facilmente encontrada usada no Brasil. Com a Triumph consolidando rede de concessionárias e peças no país, motociclistas vindos de nakeds grandes japonesas (Z1000, MT-09, CB 1000R) encontram hoje bem mais suporte técnico do que há uma década.',
  },
]

const SP1050_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador SCR: pode queimar o estator se não for trocado a tempo',
    body: 'O problema elétrico mais documentado do Speed Triple 1050, especialmente no 1050i (2005-2010): o retificador/regulador original em tecnologia SCR falha com um curto interno e, ao superaquecer, pode danificar o estator do alternador junto — transformando um reparo barato em um reparo caro. Sintoma de alerta precoce: bateria não segura carga, luz de bateria piscando, tensão abaixo de 13V a 4.000 rpm no multímetro. Troque o retificador (idealmente por um MOSFET) ao primeiro sinal, não espere o estator queimar também.',
  },
  {
    severity: 'WARN',
    title: 'Tensor de corrente de comando e embreagem sprag: itens de atenção em revisões de rotina',
    body: 'Fóruns especializados em Speed Triple citam o tensor de corrente de comando e a embreagem sprag (roda-livre do motor de partida) como itens a verificar em revisões de rotina, junto com o nível de óleo — sintomas incluem ruído metálico na partida a frio ou no ralenti. Não é uma falha tão disseminada quanto no 675, mas vale pedir a inspeção em revisões de moto usada com histórico desconhecido.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de junta do cabeçote/tampa de válvulas acima de 40.000 km',
    body: 'Em motos com mais quilometragem, é comum aparecer leve vazamento de óleo pela junta da tampa de válvulas, geralmente por parafusos que perderam torque ao longo dos anos. Solução: retorque dos parafusos da tampa (torque conforme manual) e, se persistir, troca da junta — peça de baixo custo, mas o acesso exige remoção de tanque e carenagens.',
  },
  {
    severity: 'WARN',
    title: 'Vibração acima de 8.000 rpm: normal para o motor, mas fique atento a pontos soltos',
    body: 'O tricilíndrico 1050cc vibra de forma perceptível em altas rotações — parte do caráter do motor. Se a vibração aumentar de forma incomum ou aparecer em faixas de rotação específicas que antes eram suaves, verifique o aperto dos parafusos de fixação do motor no chassi e o balanceamento das rodas (mais crítico nas rodas forjadas do 1050R, mais sensíveis a desbalanceamento após reparo de pneu furado).',
  },
]

const SP1050_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Speed Triple 1050i/1050R: atenção especial ao sistema de carga',
    body: '1.000 km — Revisão de amaciamento. | 10.000 km / 6 meses — Troca de óleo (10W-40, ~3,2L) + filtro. | 800 km — Verificar folga da corrente (18/42, ~106 elos). | 16.000 km / 10.000 milhas — Checar folga de válvulas (adm 0,10-0,20mm / esc 0,20-0,30mm, motor frio) e trocar vela NGK CR9EK. | Anual — Medir tensão do sistema de carga com multímetro a 4.000 rpm (13,5-14,5V esperado); trocar retificador preventivamente se a moto tiver mais de 8-10 anos ou histórico desconhecido. | 20.000 km — Fluido de freio DOT 4. Retorque da tampa de válvulas. | 30.000 km — Kit relação completo. Inspecionar suspensão Öhlins (1050R).',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'STREET TRIPLE 675',
    yearFrom: 2007,
    yearTo: 2012,
    MACETES: ST675_MACETES,
    PROBLEMAS: ST675_PROBLEMAS,
    MANUTENCAO: ST675_MANUTENCAO,
  },
  {
    modelName: 'STREET TRIPLE 675R',
    yearFrom: 2009,
    yearTo: 2016,
    MACETES: ST675_MACETES,
    PROBLEMAS: ST675_PROBLEMAS,
    MANUTENCAO: ST675_MANUTENCAO,
  },
  {
    modelName: 'STREET TRIPLE 765 S',
    yearFrom: 2017,
    yearTo: null,
    MACETES: ST765_MACETES,
    PROBLEMAS: ST765_PROBLEMAS,
    MANUTENCAO: ST765_MANUTENCAO,
  },
  {
    modelName: 'STREET TRIPLE 765 R',
    yearFrom: 2017,
    yearTo: null,
    MACETES: ST765_MACETES,
    PROBLEMAS: ST765_PROBLEMAS,
    MANUTENCAO: ST765_MANUTENCAO,
  },
  {
    modelName: 'STREET TRIPLE 765 RS',
    yearFrom: 2017,
    yearTo: null,
    MACETES: ST765_MACETES,
    PROBLEMAS: ST765_PROBLEMAS,
    MANUTENCAO: ST765_MANUTENCAO,
  },
  {
    modelName: 'STREET TRIPLE 765 RX',
    yearFrom: 2018,
    yearTo: 2019,
    MACETES: ST765_MACETES,
    PROBLEMAS: ST765_PROBLEMAS,
    MANUTENCAO: ST765_MANUTENCAO,
  },
  {
    modelName: 'SPEED TRIPLE 1050i',
    yearFrom: 2005,
    yearTo: 2010,
    MACETES: SP1050_MACETES,
    PROBLEMAS: SP1050_PROBLEMAS,
    MANUTENCAO: SP1050_MANUTENCAO,
  },
  {
    modelName: 'SPEED TRIPLE 1050R',
    yearFrom: 2011,
    yearTo: 2017,
    MACETES: SP1050_MACETES,
    PROBLEMAS: SP1050_PROBLEMAS,
    MANUTENCAO: SP1050_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'STREET TRIPLE 675',
    yearFrom: 2007, yearTo: 2012,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 34, rearPsi: 42,
    frontPsiLoad: 34, rearPsiLoad: 42,
    notes: 'Solo/com carona: F 34 / R 42 PSI (Triumph recomenda a mesma pressão máxima, ajustada pelo adesivo no balanção). Pneus recomendados: Pirelli Diablo Rosso III, Michelin Power 5, Metzeler Sportec M9 em medida original.',
  },
  {
    modelName: 'STREET TRIPLE 675R',
    yearFrom: 2009, yearTo: 2016,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 34, rearPsi: 42,
    frontPsiLoad: 34, rearPsiLoad: 42,
    notes: 'Mesma calibragem da versão base. Versão R com suspensão Öhlins/freios Brembo — pneus esportivos de boa qualidade aproveitam melhor o potencial do chassi.',
  },
  {
    modelName: 'STREET TRIPLE 765 S',
    yearFrom: 2017, yearTo: null,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 33, rearPsi: 42,
    frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Solo/com carona: F 33 / R 42 PSI. Muitos proprietários reduzem levemente a pressão traseira (para ~38-40 PSI) em uso solo urbano — o valor de fábrica é calibrado para carga máxima.',
  },
  {
    modelName: 'STREET TRIPLE 765 R',
    yearFrom: 2017, yearTo: null,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 33, rearPsi: 42,
    frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Mesma especificação da versão S. Suspensão Showa ajustável aproveita bem pneus esportivos como Pirelli Diablo Rosso IV ou Metzeler Racetec.',
  },
  {
    modelName: 'STREET TRIPLE 765 RS',
    yearFrom: 2017, yearTo: null,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 33, rearPsi: 42,
    frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Suspensão Showa BPF + Öhlins STX40 e freios Brembo pedem pneu esportivo de alta performance — Pirelli Supercorsa SP ou Metzeler Racetec para uso em pista.',
  },
  {
    modelName: 'STREET TRIPLE 765 RX',
    yearFrom: 2018, yearTo: 2019,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 33, rearPsi: 42,
    frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Edição especial baseada na RS — mesma especificação de pneus e calibragem.',
  },
  {
    modelName: 'SPEED TRIPLE 1050i',
    yearFrom: 2005, yearTo: 2010,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 34, rearPsi: 42,
    frontPsiLoad: 34, rearPsiLoad: 42,
    notes: 'Solo/com carona: F 34 / R 42 PSI (2,35 bar / 2,9 bar). Pneus recomendados: Pirelli Diablo Rosso, Metzeler Sportec — priorize pneus com boa reputação em torque alto de baixo giro.',
  },
  {
    modelName: 'SPEED TRIPLE 1050R',
    yearFrom: 2011, yearTo: 2017,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 34, rearPsi: 42,
    frontPsiLoad: 34, rearPsiLoad: 42,
    notes: 'Mesma calibragem do 1050i. Rodas forjadas mais leves — verifique balanceamento com atenção após qualquer reparo de furo.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // STREET TRIPLE 675
  { modelName: 'STREET TRIPLE 675', yearFrom: 2007, yearTo: 2012, component: 'Óleo 10W-40 sintético (2,9L / 3,1L c/ filtro)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 675cc DOHC, embreceatura úmida. JASO MA2 obrigatório.', priority: 'HIGH', order: 1 },
  { modelName: 'STREET TRIPLE 675', yearFrom: 2007, yearTo: 2012, component: 'Vela NGK CR9EK (gap 0,8mm)', intervalKm: 20000, intervalMonths: 12, notes: 'Trocar junto com a checagem de folga de válvulas.', priority: 'MEDIUM', order: 2 },
  { modelName: 'STREET TRIPLE 675', yearFrom: 2007, yearTo: 2012, component: 'Folga de válvulas (adm 0,10-0,20mm / esc 0,20-0,30mm)', intervalKm: 20000, intervalMonths: 12, notes: 'Motor frio obrigatório. Serviço de oficina especializada.', priority: 'HIGH', order: 3 },
  { modelName: 'STREET TRIPLE 675', yearFrom: 2007, yearTo: 2012, component: 'Inspeção do tensor de corrente de comando', intervalKm: 25000, intervalMonths: null, notes: 'Ponto fraco documentado do motor 675. Ouvir ruído no ralenti; considerar upgrade para tensor manual.', priority: 'CRITICAL', order: 4 },
  { modelName: 'STREET TRIPLE 675', yearFrom: 2007, yearTo: 2012, component: 'Lubrificação/folga da corrente 520', intervalKm: 700, intervalMonths: null, notes: 'Folga 25-35mm. Kit relação DID 520VX3 ou equivalente.', priority: 'HIGH', order: 5 },
  { modelName: 'STREET TRIPLE 675', yearFrom: 2007, yearTo: 2012, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },

  // STREET TRIPLE 675R
  { modelName: 'STREET TRIPLE 675R', yearFrom: 2009, yearTo: 2016, component: 'Óleo 10W-40 sintético (2,9L / 3,1L c/ filtro)', intervalKm: 10000, intervalMonths: 12, notes: 'Mesmo motor 675cc da versão base.', priority: 'HIGH', order: 1 },
  { modelName: 'STREET TRIPLE 675R', yearFrom: 2009, yearTo: 2016, component: 'Vela NGK CR9EK (gap 0,8mm)', intervalKm: 20000, intervalMonths: 12, notes: 'Trocar junto com folga de válvulas.', priority: 'MEDIUM', order: 2 },
  { modelName: 'STREET TRIPLE 675R', yearFrom: 2009, yearTo: 2016, component: 'Folga de válvulas (adm 0,10-0,20mm / esc 0,20-0,30mm)', intervalKm: 20000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 3 },
  { modelName: 'STREET TRIPLE 675R', yearFrom: 2009, yearTo: 2016, component: 'Inspeção do tensor de corrente de comando', intervalKm: 25000, intervalMonths: null, notes: 'Mesmo ponto de atenção do bloco 675 base.', priority: 'CRITICAL', order: 4 },
  { modelName: 'STREET TRIPLE 675R', yearFrom: 2009, yearTo: 2016, component: 'Suspensão Öhlins — inspeção/regulagem', intervalKm: 20000, intervalMonths: 24, notes: 'Verificar vazamento do amortecedor traseiro e regular pré-carga.', priority: 'MEDIUM', order: 5 },
  { modelName: 'STREET TRIPLE 675R', yearFrom: 2009, yearTo: 2016, component: 'Pastilhas de freio Brembo radial', intervalKm: 15000, intervalMonths: null, notes: 'Verificar espessura; discos maiores que a versão base.', priority: 'MEDIUM', order: 6 },
  { modelName: 'STREET TRIPLE 675R', yearFrom: 2009, yearTo: 2016, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 7 },

  // STREET TRIPLE 765 S
  { modelName: 'STREET TRIPLE 765 S', yearFrom: 2017, yearTo: null, component: 'Óleo 10W-40/50 sintético (2,88L / 3,08L c/ filtro)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 765cc derivado do bloco Moto2.', priority: 'HIGH', order: 1 },
  { modelName: 'STREET TRIPLE 765 S', yearFrom: 2017, yearTo: null, component: 'Folga de válvulas', intervalKm: 20000, intervalMonths: 12, notes: 'Intervalo longo graças ao desenho de balancins atual.', priority: 'HIGH', order: 2 },
  { modelName: 'STREET TRIPLE 765 S', yearFrom: 2017, yearTo: null, component: 'Verificação do quickshifter e manete de embreagem', intervalKm: 10000, intervalMonths: null, notes: 'Confirmar peças originais no manete — terceiros sem bucha causam falha do sensor.', priority: 'MEDIUM', order: 3 },
  { modelName: 'STREET TRIPLE 765 S', yearFrom: 2017, yearTo: null, component: 'Lubrificação/folga da corrente', intervalKm: 700, intervalMonths: null, notes: 'Folga 25-35mm.', priority: 'HIGH', order: 4 },
  { modelName: 'STREET TRIPLE 765 S', yearFrom: 2017, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 5 },

  // STREET TRIPLE 765 R
  { modelName: 'STREET TRIPLE 765 R', yearFrom: 2017, yearTo: null, component: 'Óleo 10W-40/50 sintético (2,88L / 3,08L c/ filtro)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 765cc, mesmo bloco de todas as versões.', priority: 'HIGH', order: 1 },
  { modelName: 'STREET TRIPLE 765 R', yearFrom: 2017, yearTo: null, component: 'Folga de válvulas', intervalKm: 20000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 2 },
  { modelName: 'STREET TRIPLE 765 R', yearFrom: 2017, yearTo: null, component: 'Verificação do quickshifter e sensor de marcha', intervalKm: 10000, intervalMonths: null, notes: 'Falsos neutros: verificar sensor de posição de marcha.', priority: 'MEDIUM', order: 3 },
  { modelName: 'STREET TRIPLE 765 R', yearFrom: 2017, yearTo: null, component: 'Lubrificação/folga da corrente', intervalKm: 700, intervalMonths: null, notes: 'Folga 25-35mm.', priority: 'HIGH', order: 4 },
  { modelName: 'STREET TRIPLE 765 R', yearFrom: 2017, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 5 },

  // STREET TRIPLE 765 RS
  { modelName: 'STREET TRIPLE 765 RS', yearFrom: 2017, yearTo: null, component: 'Óleo 10W-40/50 sintético (2,88L / 3,08L c/ filtro)', intervalKm: 10000, intervalMonths: 12, notes: 'Uso em pista: reduzir para 6.000-8.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'STREET TRIPLE 765 RS', yearFrom: 2017, yearTo: null, component: 'Folga de válvulas', intervalKm: 20000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 2 },
  { modelName: 'STREET TRIPLE 765 RS', yearFrom: 2017, yearTo: null, component: 'Suspensão Showa BPF + Öhlins STX40 — regulagem de pré-carga', intervalKm: null, intervalMonths: 12, notes: 'Ajustar pré-carga traseira para o peso do piloto.', priority: 'MEDIUM', order: 3 },
  { modelName: 'STREET TRIPLE 765 RS', yearFrom: 2017, yearTo: null, component: 'Pastilhas de freio Brembo Stylema/M4.32', intervalKm: 15000, intervalMonths: null, notes: 'Verificar espessura, principalmente em uso de pista.', priority: 'MEDIUM', order: 4 },
  { modelName: 'STREET TRIPLE 765 RS', yearFrom: 2017, yearTo: null, component: 'Embreagem torque-assist — inspeção de desgaste', intervalKm: 20000, intervalMonths: null, notes: 'Uso intenso/track day desgasta rampas mais rápido.', priority: 'MEDIUM', order: 5 },
  { modelName: 'STREET TRIPLE 765 RS', yearFrom: 2017, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },

  // STREET TRIPLE 765 RX
  { modelName: 'STREET TRIPLE 765 RX', yearFrom: 2018, yearTo: 2019, component: 'Óleo 10W-40/50 sintético (2,88L / 3,08L c/ filtro)', intervalKm: 10000, intervalMonths: 12, notes: 'Mesma mecânica da RS.', priority: 'HIGH', order: 1 },
  { modelName: 'STREET TRIPLE 765 RX', yearFrom: 2018, yearTo: 2019, component: 'Folga de válvulas', intervalKm: 20000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 2 },
  { modelName: 'STREET TRIPLE 765 RX', yearFrom: 2018, yearTo: 2019, component: 'Suspensão Showa BPF + Öhlins STX40 — regulagem', intervalKm: null, intervalMonths: 12, notes: 'Edição especial com mesma suspensão da RS.', priority: 'MEDIUM', order: 3 },
  { modelName: 'STREET TRIPLE 765 RX', yearFrom: 2018, yearTo: 2019, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 4 },

  // SPEED TRIPLE 1050i
  { modelName: 'SPEED TRIPLE 1050i', yearFrom: 2005, yearTo: 2010, component: 'Óleo 10W-40 sintético (~3,2L c/ filtro)', intervalKm: 10000, intervalMonths: 6, notes: 'Motor 1050cc DOHC, compressão 12,0:1.', priority: 'HIGH', order: 1 },
  { modelName: 'SPEED TRIPLE 1050i', yearFrom: 2005, yearTo: 2010, component: 'Vela NGK CR9EK (gap 0,7mm)', intervalKm: 16000, intervalMonths: 12, notes: 'Confirmar código gravado — algumas unidades usam CR8EK/CR8EIX.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SPEED TRIPLE 1050i', yearFrom: 2005, yearTo: 2010, component: 'Folga de válvulas (adm 0,10-0,20mm / esc 0,20-0,30mm)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 3 },
  { modelName: 'SPEED TRIPLE 1050i', yearFrom: 2005, yearTo: 2010, component: 'Verificação do retificador/regulador (13,5-14,5V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha crítico documentado (tecnologia SCR). Considerar upgrade MOSFET FH012AB preventivo.', priority: 'CRITICAL', order: 4 },
  { modelName: 'SPEED TRIPLE 1050i', yearFrom: 2005, yearTo: 2010, component: 'Folga/lubrificação da corrente (18/42, ~106 elos)', intervalKm: 800, intervalMonths: null, notes: 'Motor de alto torque castiga a transmissão.', priority: 'HIGH', order: 5 },
  { modelName: 'SPEED TRIPLE 1050i', yearFrom: 2005, yearTo: 2010, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },

  // SPEED TRIPLE 1050R
  { modelName: 'SPEED TRIPLE 1050R', yearFrom: 2011, yearTo: 2017, component: 'Óleo 10W-40 sintético (~3,2L c/ filtro)', intervalKm: 10000, intervalMonths: 6, notes: 'Motor 1050cc com potência revisada para cima em relação ao 1050i.', priority: 'HIGH', order: 1 },
  { modelName: 'SPEED TRIPLE 1050R', yearFrom: 2011, yearTo: 2017, component: 'Vela NGK CR9EK (gap 0,7mm)', intervalKm: 16000, intervalMonths: 12, notes: 'Confirmar código gravado na vela atual.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SPEED TRIPLE 1050R', yearFrom: 2011, yearTo: 2017, component: 'Folga de válvulas (adm 0,10-0,20mm / esc 0,20-0,30mm)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 3 },
  { modelName: 'SPEED TRIPLE 1050R', yearFrom: 2011, yearTo: 2017, component: 'Verificação do retificador/regulador (13,5-14,5V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Sistema de carga revisado, mas ainda vale checar anualmente.', priority: 'HIGH', order: 4 },
  { modelName: 'SPEED TRIPLE 1050R', yearFrom: 2011, yearTo: 2017, component: 'Suspensão Öhlins — inspeção/regulagem', intervalKm: 20000, intervalMonths: 24, notes: 'Garfo dianteiro e monoamortecedor totalmente ajustáveis.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SPEED TRIPLE 1050R', yearFrom: 2011, yearTo: 2017, component: 'Folga/lubrificação da corrente (18/42, ~106 elos)', intervalKm: 800, intervalMonths: null, notes: 'Motor de alto torque.', priority: 'HIGH', order: 6 },
  { modelName: 'SPEED TRIPLE 1050R', yearFrom: 2011, yearTo: 2017, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 7 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Triumph Street Triple / Speed Triple...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'TRIUMPH', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'TRIUMPH', vehicleTypeId: motoType.id },
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

  console.log('✅ Triumph Street Triple / Speed Triple concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
