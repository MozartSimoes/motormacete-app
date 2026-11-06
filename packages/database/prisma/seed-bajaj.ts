/**
 * Seed BAJAJ — macetes, problemas e manutenção
 * Cobre os principais modelos Bajaj comercializados no Brasil
 *
 * Plataformas:
 * - DTS-i Ar (2 velas/cilindro): Pulsar 135 LS, 150, 180/180F, 220F, Avenger 220
 * - Triple Spark Líquido (3 velas/cilindro): Pulsar 200 NS, RS 200
 * - Triple Spark DOHC Líquido (3 velas): Dominar 400
 * - Monovela utilitário: Boxer 150
 *
 * Fontes: bajajauto.com (India), bajaj.com.br, ManualsLib (service manuals oficiais),
 *         bikewale.com, 91wheels.com, autoevolution.com, team-bhp.com,
 *         reclameaqui.com.br, NGK BR (tabela de aplicação), Mercado Livre Brasil,
 *         Reclame Aqui, grupos Facebook Pulsar Club Brasil / Bajaj Brasil
 *
 * Execute: pnpm --filter @motormacete/database db:seed:bajaj
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

// ─── Base compartilhada — Plataforma DTS-i Ar Refrigerado ────────────────────
// Pulsar 135 LS, Pulsar 150, Pulsar 180/180F, Pulsar 220F, Avenger 220
// DTS-i = Digital Twin Spark Ignition = 2 velas por cilindro

const MACETES_DTSI_AR: TipInput[] = [
  {
    severity: 'WARN',
    title: 'DTS-i = 2 velas por cilindro: se uma falha, a outra esconde o problema',
    body: 'O sistema DTS-i (Digital Twin Spark Ignition) usa DOIS eletrodos de ignição por cilindro para queima mais eficiente. Quando uma das velas falha, a outra mantém o motor funcionando — mas com perda de potência, consumo aumentado e falhas irregulares. Muitos donos trocam só a vela mais acessível e deixam a segunda com defeito por meses. Regra de ouro: SEMPRE troque as duas velas ao mesmo tempo. Código padrão para a maioria das Pulsars e Avenger DTS-i: NGK CPR8EA-9 (rosca M10 × 1,0 mm, hex 16 mm). Troque o par a cada 10.000 km. Custo: R$ 25–R$ 45 cada no Mercado Livre. Pesquise: "NGK CPR8EA9 vela moto" para encontrar facilmente.',
  },
  {
    severity: 'DANGER',
    title: 'Regulador/retificador de tensão: o componente que mais mata Bajaj no Brasil',
    body: 'O regulador de tensão (voltage regulator/rectifier) é o problema número 1 reportado em TODAS as Pulsars no Brasil. Quando falha, pode gerar dois cenários: 1) Subtensão — bateria não carrega, moto não pega, luzes fracas. 2) Sobretensão — picos de 16V+ destroem bateria, ECU e outros componentes elétricos em horas. Sintomas iniciais: farol oscila com o acelerador, bateria sempre descarregada, moto esquenta mais que o normal. Diagnóstico rápido: com moto ligada em 4.000 RPM, meça a tensão nos terminais da bateria com multímetro — deve estar entre 13,5 V e 14,5 V. Acima de 15 V = regulador morto. Substitua imediatamente. Procure no ML: "regulador retificador Bajaj Pulsar" — versões aftermarket de maior capacidade custam R$ 80–R$ 200 e duram mais que o original.',
  },
  {
    severity: 'OK',
    title: 'Como achar qualquer peça Bajaj no Brasil sem enlouquecer',
    body: 'A rede Bajaj Brasil é pequena, mas há saídas: 1) Mercado Livre Brasil tem vendedores que importam peças originais da Índia — pesquise em inglês (ex: "Bajaj Pulsar 150 carburetor", "Bajaj rectifier") para encontrar importadores indianos com estoque aqui. 2) Grupos Facebook "Pulsar Club Brasil" e "Bajaj Pulsar Brasil" — comunidades ativas onde donos trocam indicações de fornecedores. 3) AliExpress tem peças genéricas compatíveis para motor, freios e elétrica a preços baixos — qualidade variável, bom para peças não-críticas. 4) Mecânicos especializados em Yamaha YBR 125 / Factor 150 conseguem adaptar peças de motor (motores de 150cc similares). Guarde SEMPRE o número do chassi (VIN) e código do motor — facilitam a identificação com vendedores online.',
  },
  {
    severity: 'WARN',
    title: 'Corrente final: lubrificar a cada 500 km — não é exagero, é sobrevivência',
    body: 'No trânsito urbano brasileiro (poeira, chuva, calor) a corrente perde lubrificação rapidamente. Sem lubrificação, o desgaste de corrente + coroa + pinhão se acelera drasticamente — um kit completo (corrente + coroas) custa R$ 200–R$ 500. Frequência: lubrificar a cada 500 km ou após qualquer chuva. Produto correto: spray de corrente (DID, Motul C2, WD-40 Specialist Chain Lube) — nunca use óleo diesel, graxa de rolamento ou WD-40 padrão (evaporam rápido e atraem sujeira). Tensão correta: com moto no cavalete, afrouxamento da corrente na parte inferior deve ser de 20–30 mm. Maior que isso: ajuste nos tensores do eixo traseiro antes de trocar.',
  },
  {
    severity: 'WARN',
    title: 'Válvulas desreguladas: a manutenção mais ignorada que destrói motores silenciosamente',
    body: 'A maioria das Bajaj usadas no Brasil nunca teve regulagem de válvulas — e esse é o serviço mais crítico do motor. Válvulas com folga incorreta causam: perda de potência gradual (folga grande demais), desgaste prematuro do assento (folga pequena ou zero), barulho metálico a quente, e no pior caso, válvula que não fecha = pistão destruído = motor fundido. Sintoma mais comum: moto perde potência progressivamente, começa "bater vareta" ao aquecer. Intervalo: verifique e ajuste a cada 10.000 km com motor COMPLETAMENTE FRIO. Folgas padrão DTS-i ar: admissão 0,05 mm, escape 0,10 mm. O serviço é simples em motor monocilíndrico — qualquer mecânico com experiência em motos 150cc consegue. Custo: R$ 60–R$ 120 de mão de obra.',
  },
  {
    severity: 'OK',
    title: 'Embreagem que patina não é defeito: é sinal de óleo errado',
    body: 'Se a embreagem da sua Bajaj DTS-i começa a patinar (motor acelera mas a moto não avança proporcionalmente), antes de culpar as lamelas verifique o óleo. Os motores Bajaj usam embreagem ÚMIDA — as lamelas ficam no banho do mesmo óleo do motor. Óleos de carro com "friction modifiers" (redutores de atrito) fazem a embreagem patinar mesmo que as lamelas estejam novas. Sempre use SAE 20W50 com certificação JASO MA ou MA2 — esse selo garante que o óleo não tem friction modifier e é seguro para embreagem úmida. Se já colocou óleo de carro, drene imediatamente e coloque o óleo correto. Em muitos casos a embreagem volta ao normal após 200 km com óleo adequado.',
  },
]

const PROBLEMAS_DTSI_AR: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador de tensão queimado: bateria que não carrega, sistema elétrico em risco',
    body: 'Quando o regulador/retificador falha em modo "aberto" (open circuit), o alternador para de carregar a bateria. A moto vai perdendo energia progressivamente — luzes fracas, partida fraca, até não pegar mais. Quando falha em curto, gera sobretensão e destrói bateria e ECU. Diagnóstico: com multímetro nos terminais da bateria com moto em 4.000 RPM — abaixo de 13,0 V ou acima de 15,0 V = regulador ruim. Substituição: antes de instalar o novo, verifique o fio do alternador (estator) — sobretensão pode ter queimado o enrolamento. Resistência normal do estator: 0,2–0,5 ohm entre cada fase. Compre regulador aftermarket com capacidade ≥1A acima do original para maior durabilidade.',
  },
  {
    severity: 'WARN',
    title: 'Carburador atacado pelo etanol brasileiro: sintomas e solução definitiva',
    body: 'O etanol E27 (gasolina com 27% etanol) do Brasil corrói borrachas internas do carburador mais rápido que gasolina pura. Sintomas: dificuldade para ligar a frio, engasgos ao acelerar da marcha lenta, consumo acima do normal, carburador vazando pelo dreno lateral. Diagnóstico: remova o carburador, abra e observe — borrachas ressecadas, assento da agulha com marcas de corrosão, boia deformada. Solução curto prazo: kit de reconstrução (rebuild kit) com vedantes resistentes a etanol — R$ 25–R$ 60 no ML para carburadores Mikuni BS26 e similares. Solução longa: suba o jato principal 2–3 tamanhos para compensar o menor poder calorífico do etanol. Instale sempre filtro de combustível inline (R$ 5–R$ 15) antes do carburador — evita detritos que entopem os jatos.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de distribuição barulhenta: o "cascavel" que aparece a frio',
    body: 'Um barulho metálico rítmico ("tic-tic-tic" ou "cascavel") que surge nos primeiros 5–10 segundos após a partida a frio e some quando o motor aquece indica desgaste da corrente de distribuição (timing chain) ou do seu tensor. Causa mais comum: intervalos longos entre trocas de óleo ou óleo de qualidade ruim — o tensor hidráulico perde pressão quando o óleo está degradado. O barulho que SOME quando o motor aquece não é emergência imediata, mas indica desgaste em progresso. O que NÃO é normal: barulho que PERSISTE com motor quente — nesse caso, tensor e corrente precisam de inspeção. Prevenção: troque o óleo a cada 3.000–4.000 km no calor brasileiro (não espere 10.000 km como diz o manual indiano).',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de combustível no carburador: boia plástica deformada pelo etanol',
    body: 'A boia (float) de plástico do carburador das Pulsars mais antigas pode deformar com exposição prolongada ao etanol, alterando o nível correto de combustível e causando vazamento pelo dreno ou pelo respiro. Sintoma: moto cheira muito a gasolina em repouso, poça de combustível embaixo após estacionar. Diagnóstico: abra o carburador e verifique a boia pressionando-a — deve estar vazia e leve. Se tiver combustível dentro ou estiver deformada, troque. Boia de latão (substituição aftermarket): R$ 15–R$ 40 no ML para carburadores Mikuni — mais resistente ao etanol que a boia plástica original. Instale também o kit de vedantes completo ao abrir o carburador — o trabalho já está feito.',
  },
  {
    severity: 'WARN',
    title: 'Ponteiro do velocímetro "pulando" ou parado: cabo seco ou sensor sujo',
    body: 'Velocímetros com ponteiro que pula, oscila aleatoriamente ou para de funcionar são comuns em Pulsars mais antigas (modelos com velocímetro mecânico de cabo). Causa: cabo do velocímetro seco ou com trinca interna. Solução: lubrifique o cabo com spray silicone uma vez por ano — desmonte o cabo pelo lado inferior do painel, insira o lubrificante pela ponta superior e deixe descer pela extensão. Cabo quebrado: substitua por genérico compatível (R$ 30–R$ 60 no ML — meça comprimento e tipo de conector). Nos modelos com sensor digital (Hall effect sensor na roda dianteira): verifique se o sensor ou o imã na roda estão com contato elétrico e alinhamento corretos — limpeza com contato elétrico resolve na maioria dos casos.',
  },
]

const MANUTENCAO_DTSI_AR: TipInput[] = []

// ─── Base compartilhada — Motor 200cc Líquido Triple Spark ───────────────────
// Pulsar 200 NS e Pulsar RS 200 — 199.5cc, refrigerado a líquido, 3 velas/cilindro

const MACETES_200CC_LIQUIDO: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Triple Spark = 3 velas por cilindro: troque TODAS as 3 juntas, sempre',
    body: 'O motor da Pulsar 200 NS e RS 200 usa TRÊS velas de ignição por cilindro (Triple Spark). Quando uma das três falha, o motor ainda funciona mas com combustão irregular, perda de potência e consumo alto. Identificar qual das três velas falhou sem equipamento exige testar uma a uma — trabalho tedioso. Protocolo: SEMPRE troque as 3 velas juntas a cada 10.000 km. Código NGK: CPR8EA-9 (mesmas das DTS-i convencionais). Custo de 3 velas NGK: R$ 75–R$ 135. Localização das velas: uma no topo central do cabeçote, duas nas laterais — o acesso exige desmontagem parcial da carenagem. Consulte o manual de serviço PDF no ManualsLib ("Bajaj Pulsar NS200 service manual") antes da primeira troca.',
  },
  {
    severity: 'OK',
    title: 'Refrigeração a líquido: verifique o nível do fluido semanalmente',
    body: 'O motor da 200 NS e RS 200 é refrigerado a líquido — diferente das Pulsars ar refrigerado, superaquecimento aqui acontece mais silenciosamente. O reservatório de expansão fica sob o cabeçote, na frente da moto. Verifique o nível com moto fria — deve estar entre as marcas MIN e MAX. Fluido correto: anticongelante OAT (Organic Acid Technology, cor laranja ou rosa) diluído 50%/50% com água destilada. NUNCA use água pura — corrói o alumínio internamente e forma incrustações. Troque o fluido a cada 2 anos independente da quilometragem. Superaquecimento em trânsito parado: a ventoinha do radiador deve ligar automaticamente ao chegar em ~105°C — se não ligar, verifique o fusível e o termostato (peça acessível no ML: "termostato Bajaj NS200").',
  },
  {
    severity: 'OK',
    title: 'KTM Duke 200: plataforma irmã com peças intercambiáveis — use isso a seu favor',
    body: 'A Bajaj tem joint venture industrial com a KTM — o motor de 199.5cc da Pulsar 200 NS compartilha a mesma origem de projeto com o KTM Duke 200. Isso é uma vantagem enorme no Brasil onde peças KTM têm mais presença em lojas de performance. Peças CONFIRMEDAMENTE compatíveis: pneus (100/80-17 dianteiro, 130/70-17 traseiro), pastilhas de freio disco hidráulico, fluido de freio DOT 4, corrente final. Peças que DIFEREM: carenagens, suspensão, motor — não tente intercambiar. Para pastilhas de freio de melhor qualidade: pesquise catálogo EBC ou Galfer para "KTM Duke 200" — as medidas são iguais e você encontra versões sintered (metálica) bem superiores às originais, disponíveis em lojas de performance nacionais.',
  },
]

const PROBLEMAS_200CC_LIQUIDO: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento de óleo nas juntas: problema de montagem reportado no Brasil (2018–2020)',
    body: 'Vazamento de óleo nas juntas do cabeçote e tampa lateral foi o problema mais relatado nas Pulsars 200 NS e Dominar 400 quando chegaram ao Brasil em 2018–2019. A Bajaj Brasil realizou revisão em concessionárias para resolver. Se sua moto é de 2018–2019 e apresenta manchas de óleo no chão, cheiro de queimado ou nível caindo, consulte a concessionária. Para motos fora do período: kit de juntas da NS200 (R$ 60–R$ 150 no ML) + aplicação de RTV Loctite 5900 nos pontos críticos. Regra fundamental: não substitua junta sem limpar COMPLETAMENTE as superfícies de alumínio com acetona — nova junta não veda sobre resíduo de óleo ou silicone antigo.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de neutro e buzina: falhas elétricas após chuva ou lavagem',
    body: 'Problemas elétricos específicos da série 200cc reportados no Brasil: 1) Buzina trava ligada após chuva intensa — conector da buzina mal vedado enche de água e trava o contato. Solução: seque o conector com ar comprimido, aplique spray dielétrico. 2) Sensor de posição neutra falha com vibração ou umidade, enviando sinal "neutro" com moto em marcha — corta o motor abruptamente. Sensor fica na tampa da embreagem. Solução: limpe o conector, verifique o contato. Se persistir, troque o sensor (peça barata no ML: "sensor neutro Bajaj NS200"). 3) Sensor do interruptor de freio traseiro trava acionado — luz de freio fica sempre acesa, queima bateria. Ajuste o curso do interruptor no tambor traseiro.',
  },
  {
    severity: 'WARN',
    title: 'Vibração em 5.000–7.000 RPM: característica do motor — o que é normal e o que não é',
    body: 'A Pulsar 200 NS e RS 200 vibram perceptivelmente na faixa de 5.000–7.000 RPM — isso é intrínseco ao motor monocilíndrico de alta performance sem contrapeso secundário de balanceamento e não é defeito. O que NÃO é normal: vibração que aumentou progressivamente ao longo do tempo (parafusos do motor soltos ou desequilíbrio do rotor), vibração acompanhada de barulho metálico (rolamento ou componente interno), ou vibração que surgiu após queda. Verificação preventiva: a cada 5.000 km, confira o aperto dos parafusos de fixação do motor no chassi. Melhoria fácil: troque os manoplas (grips) originais por versões com antivibração — reduz a sensação de vibração nas mãos significativamente.',
  },
]

const MANUTENCAO_200CC_LIQUIDO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Fluido de refrigeração OAT: troque a cada 2 anos com água destilada',
    body: 'O fluido de arrefecimento perde eficiência anticorrosão ao envelhecer — troque a cada 2 anos. Volume do sistema: ~0,7–0,8L. Use anticongelante OAT diluído 50/50 com água destilada — nunca água de torneira. Processo: drene pelo parafuso inferior do radiador, encha pela parte superior com motor ligado e tampa aberta para purgar o ar, complete o nível no reservatório quando esfriar.',
  },
  {
    severity: 'OK',
    title: 'Pastilhas EBC FA ou Galfer: upgrade direto nas medidas da NS200 e RS200',
    body: 'As pastilhas originais da Pulsar 200 NS e RS 200 são funcionais mas de vida útil média. Upgrade sem modificação: pastilhas EBC FA (orgânicas) ou Galfer DF (standard) nas mesmas medidas das originais — mordida melhor e maior durabilidade. Consulte o catálogo EBC/Galfer para "KTM Duke 200" (medidas idênticas à NS200). Encontre no Brasil em lojas de performance. Custo: R$ 80–R$ 180 o par dianteiro. Processo de break-in das pastilhas novas: 10 acelerações a 40 km/h seguidas de frenagem firme (não de emergência) — cria a camada de transferência necessária para performance máxima. Ao trocar pastilhas, limpe o pistão da pinça com spray de freio e aplique pasta antisserra nas laterais da pastilha (não na face de frenagem).',
  },
]

// ─── Pulsar 135 LS — dicas exclusivas ───────────────────────────────────────

const PULSAR135_MACETES: TipInput[] = [
  ...MACETES_DTSI_AR,
  {
    severity: 'WARN',
    title: 'Pulsar 135 LS descontinuada: monte seu estoque de peças agora',
    body: 'A Bajaj descontinuou a Pulsar 135 LS globalmente. Peças originais estão ficando escassas nas concessionárias. Estratégia de sobrevivência: 1) Estoque peças de desgaste — filtro de ar, 2 velas NGK CPR8EA-9, kit de pistão+anel (diâmetro 54 mm). 2) No ML, procure vendedores que importam da Índia — o mercado de reposição indiano ainda tem partes disponíveis. 3) O carburador é Mikuni BS26 — genérico abundante no Brasil, pesquise "carburador Mikuni BS26 moto". 4) Muitas peças do motor da Pulsar 150 são intercambiáveis (mesma família DTS-i). 5) Baixe o manual de serviço PDF: ManualsLib → "Bajaj Pulsar 135 service manual" — documente as peças críticas do seu exemplar antes que a informação suma.',
  },
  {
    severity: 'OK',
    title: 'Motor de 135cc leve: ideal para cidade, mas o ralenti alto causa desgaste',
    body: 'A Pulsar 135 LS é a mais leve da família Pulsar — vantagem no trânsito urbano. Um ajuste frequentemente ignorado: o ralenti (marcha lenta) de fábrica é programado alto para os invernos indianos. No Brasil o ideal é entre 1.200–1.400 RPM. Ralenti alto demais (acima de 1.800 RPM) causa desgaste prematuro das lamelas da embreagem centrífuga e aumenta o consumo. Ajuste o parafuso de ralenti no carburador: gire no sentido anti-horário para reduzir. Use tacômetro de mão (R$ 30–R$ 60 no ML) ou app de celular com microfone para medir o RPM sem velocímetro. Ajuste sempre com motor aquecido.',
  },
]

const PULSAR135_PROBLEMAS: TipInput[] = [
  ...PROBLEMAS_DTSI_AR,
  {
    severity: 'WARN',
    title: 'Motor enriquece com etanol: suba o jato do carburador Mikuni BS26',
    body: 'A Pulsar 135 LS veio calibrada para gasolina pura (mercado indiano). O etanol E27 brasileiro tem menor poder calorífico, exigindo mais combustível por ciclo. Sintomas de mistura rica: consumo acima de 30 km/L, vela preta e molhada, motor "afogando" em baixa rotação, excesso de fumaça preta. Solução: suba o jato principal do carburador Mikuni BS26 em 2–3 tamanhos (ex: de #95 para #98 ou #100). Desmonte o carburador, localize o jato principal (parafuso de latão central), substitua. Mecânicos de carburador cobram R$ 40–R$ 80 pelo serviço. Alternativa: use gasolina aditivada (menor teor de etanol) se o mercado local tiver acesso.',
  },
]

const PULSAR135_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma preventivo Pulsar 135 LS: revisões por quilometragem',
    body: '1.000 km — Primeira revisão (gratuita na concessionária): troca de óleo, limpeza de filtro de tela no cárter, aperto de todos os parafusos, ajuste de corrente e freios. Remova resíduos de break-in antes de completar 1.200 km. | 5.000 km — Troca de óleo (1,0L 20W50 JASO MA), limpeza do filtro de ar de espuma (lave + seque completamente), lubrificação da corrente 428, verificação de pneus (80/100-17 frente 26 PSI, 100/90-17 traseiro 28 PSI). | 10.000 km — Troca de óleo + filtro de tela, par de velas NGK CPR8EA-9 (troque as 2 juntas), regulagem de válvulas (admissão 0,05 mm / escape 0,10 mm, motor frio), filtro de ar novo, inspeção de pastilha dianteira e ajuste de freio traseiro a tambor, inspeção de corrente (troque kit se desgastada). | 20.000 km — Tudo do 10.000 + limpeza interna do carburador Mikuni BS26 (vedantes + boia), lubrificação de cabos de acelerador/freio/embreagem, troca de fluido de freio DOT 4, kit corrente 428 + coroa + pinhão. | 40.000 km — Teste de compressão (deve estar 130–160 PSI a frio), inspeção de rolamentos de roda e cabeçote de direção.',
  },
  {
    severity: 'OK',
    title: 'Óleo do motor: 1,0L SAE 20W50 JASO MA — troque a cada 3.000–4.000 km no Brasil',
    body: 'Capacidade: 1,0L na troca completa (drena + filtro de tela limpo). O manual indiano indica 10.000 km de intervalo — intervalo calculado para o clima ameno indiano sem etanol. No Brasil: 3.000 km em uso urbano intenso, 4.000 km em uso normal. Use SAE 20W50 JASO MA/MA2 — certificação obrigatória para embreagem úmida. Marcas: Motul 3000+ 4T (R$ 35–50/L), Castrol Go 4T (R$ 25–35/L), Ipiranga Moto 4T (R$ 20–30/L). Ao trocar: limpe também o filtro de tela centrífugo dentro da tampa do motor (detritos não saem com a drenagem). Verifique o nível pelo visor lateral com moto em posição vertical e motor frio — cavalete lateral dá leitura errada.',
  },
  {
    severity: 'OK',
    title: '2 velas NGK CPR8EA-9 (DTS-i): gap 0,7–0,8 mm, troque o par a cada 10.000 km',
    body: 'A Pulsar 135 LS usa DUAS velas (sistema DTS-i) — código NGK CPR8EA-9, rosca M10 × 1,0 mm, hex 16 mm. Troque as 2 sempre juntas. Gap: 0,7–0,8 mm (meça com calibrador de vela antes de instalar as novas). Torque: 10–12 N·m — use torquímetro, não aperte no braço em cabeçote de alumínio. Custo: R$ 25–45 cada. Leia a coloração das velas velhas: marrom-cinza = mistura correta; preta/seca = mistura rica (ajuste o carburador); preta/molhada = óleo no cilindro (anéis); branca = mistura pobre (risco de superaquecimento). Intervalo: 10.000 km ou quando houver dificuldade de partida, engasgos ou consumo elevado.',
  },
  {
    severity: 'WARN',
    title: 'Válvulas: admissão 0,05 mm / escape 0,10 mm — verifique a cada 10.000 km com motor frio',
    body: 'A regulagem de válvulas é o serviço mais crítico e mais negligenciado na Pulsar 135 LS. Motor deve estar completamente frio (mínimo 4h). Posicione o pistão no PMS da compressão — ambas as válvulas fechadas. Folgas: admissão 0,05 mm, escape 0,10 mm. Use feeler gauge de qualidade (R$ 15–30). Se fora do range ±0,02 mm: afrouxe o contra-pino, ajuste o parafuso, reaperte (7–9 N·m) e confirme. Sintomas de válvulas desreguladas: perda de força progressiva, dificuldade de partida a quente, barulho de "batida de vareta" ao aquecer. Custo do serviço: R$ 60–120 de mão de obra.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428: lubrificar a cada 500 km, tensão 20–25 mm, kit a cada 20.000 km',
    body: 'Corrente 428 (passo 12,7 mm) — a mais fácil de encontrar no Brasil. Lubrificação: a cada 500 km com spray de corrente DID, Motul C2 ou similar — nunca WD-40 padrão. Tensão correta: com moto no cavalete central, afrouxamento de 20–25 mm na parte inferior. Inspeção visual a cada 3.000 km: dentes da coroa em "gancho de anzol" ou roletes desgastados = kit na hora. Kit (corrente O-ring 428 + coroa + pinhão): R$ 150–280. Sempre troque coroa e pinhão junto com a corrente — corrente nova em coroa gasta desgasta 3× mais rápido. Comprimento: ~110–114 elos (confirme na corrente velha).',
  },
  {
    severity: 'WARN',
    title: 'Pulsar 135 LS descontinuada: revisão anual preventiva é mais importante que nunca',
    body: 'Com a Pulsar 135 LS descontinuada, peças ficam cada vez mais escassas. A revisão anual preventiva é a melhor proteção: mesmo abaixo de 5.000 km/ano, troque o óleo anualmente (óleo envelhece mesmo parado), verifique válvulas, calibragem de pneus e estado dos vedantes do carburador. A partir de 30.000 km: faça teste de compressão (deve estar 130–160 PSI frio). Abaixo de 120 PSI indica anéis desgastados. Estoque preventivamente: 2 velas NGK CPR8EA-9, 1 filtro de ar, 1 kit de vedantes do carburador Mikuni BS26, 1 kit corrente 428 — peças que ficam difíceis de encontrar com o modelo descontinuado.',
  },
]

// ─── Pulsar 150 — dicas exclusivas ──────────────────────────────────────────

const PULSAR150_MACETES: TipInput[] = [
  ...MACETES_DTSI_AR,
  {
    severity: 'OK',
    title: 'A Pulsar 150 mais vendida do Brasil: vantagem de peças disponíveis em todo lugar',
    body: 'A Pulsar 150 é um dos modelos de moto mais vendidos no Brasil e na Índia — isso significa que o ecossistema de peças é mais desenvolvido que qualquer outra Bajaj. Peças genéricas compatíveis encontradas no ML: carburador completo (R$ 80–R$ 180), kit pistão+anel padrão (R$ 60–R$ 120), kit de filtro de ar (R$ 20–R$ 50), kit de embreagem completo (R$ 80–R$ 150), cabo de acelerador (R$ 20–R$ 40), cabo de embreagem (R$ 20–R$ 40). Para freios: pastilhas e lonas de tambor compatíveis com motos 150cc de plataforma similar (Yamaha YBR 125, Honda CG 150 em alguns itens). Se você usa para entrega: inspecione a corrente a cada 300 km em vez de 500 km — o peso da carga e as paradas frequentes aceleram o desgaste.',
  },
  {
    severity: 'WARN',
    title: 'Versão carburada vs injetada (FI): diagnóstico e manutenção são diferentes',
    body: 'A Pulsar 150 foi vendida no Brasil em versões carburada (modelos até ~2019) e injetada/FI (modelos mais recentes BS-VI). A distinção importa na manutenção: Carburada: ajuste do carburador, jatos, limpeza periódica. Sintoma de problema: engasgos, dificuldade a frio. Injetada: sistema fechado com sensores — não abra a injeção sem equipamento. Sintoma de problema: luz de "check engine" no painel. Diagnóstico FI: leitor de código OBD genérico de 12V funciona na versão FI — pesquise "scanner OBD moto" no ML (R$ 50–R$ 120). Mecânicos de injeção de moto conseguem fazer o diagnóstico. Nunca tente limpar bico injetor com ar comprimido — desmonte apenas com limpeza ultrassônica.',
  },
]

const PULSAR150_PROBLEMAS: TipInput[] = [
  ...PROBLEMAS_DTSI_AR,
  {
    severity: 'WARN',
    title: 'Corrente de 428 se desgastando rápido: moto sendo usada para entrega?',
    body: 'A Pulsar 150 é amplamente usada para delivery e mototaxi no Brasil — uso que acelera drasticamente o desgaste da corrente. Peso de entrega + paradas frequentes + aceleração forte = corrente desgastada em 10.000–15.000 km em vez dos 20.000–25.000 km típicos. Sintomas de corrente gasta: barulho de "corrente batendo", ajuste de tensão ao limite, moto "tracionando" com solavanco ao engatar. Kit completo (corrente 428 O-ring + coroa + pinhão): R$ 180–R$ 320. Para uso pesado de entrega: lubrificar a cada 300 km, tensionar a cada inspeção, considerar upgrade para corrente 428 X-ring (selada a vácuo, dura 40% mais). O pinhão desgasta mais rápido que a coroa — inspecione visualmente ambos ao abrir para lubrificação.',
  },
]

const PULSAR150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma preventivo Pulsar 150: revisões por quilometragem',
    body: '1.000 km — Primeira revisão: troca de óleo (1,0L 20W50 JASO MA) com filtro de tela limpo, aperto geral de parafusos, ajuste de corrente e freios. Break-in libera partículas metálicas — troque antes de 1.200 km. | 5.000 km — Troca de óleo, limpeza do filtro de ar (espuma: lave + seque totalmente), lubrificação de corrente 428, verificação de calibragem dos pneus e folga da embreagem (10–15 mm no punho). | 10.000 km — Óleo + filtro de tela, 2 velas NGK CPR8EA-9 (troque o par), regulagem de válvulas (IN 0,05 mm / EX 0,05–0,10 mm com motor frio), filtro de ar novo, ajuste do freio traseiro a tambor, inspeção da corrente 428. | 20.000 km — Tudo do 10.000 + kit corrente 428 + coroa + pinhão (se desgastados), limpeza interna do carburador (versão carburada) ou aditivo limpador de injetor (versão FI), lubrificação dos cabos, troca de fluido de freio DOT 4. | Uso de entrega: reduza o intervalo de óleo para 3.000 km e lubrifique a corrente a cada 300 km.',
  },
  {
    severity: 'OK',
    title: 'Óleo do motor: 1,0L SAE 20W50 JASO MA — 3.000 km em entrega, 4.000 km uso normal',
    body: 'Capacidade: 1,0L na troca completa. JASO MA/MA2 é obrigatório — embreagem úmida no banho de óleo. Sem essa certificação, o óleo causa patinação da embreagem mesmo com lamelas novas. Intervalo Brasil: 3.000 km para entrega/mototaxi (paradas frequentes degradam o óleo mais rápido), 4.000 km para uso urbano normal. A cada troca de óleo: verifique também tensão da corrente, folga da embreagem e calibragem dos pneus — esses três itens juntos determinam 80% da durabilidade da moto. Verifique o nível pelo visor lateral com moto vertical e motor frio a cada 1.000 km.',
  },
  {
    severity: 'OK',
    title: '2 velas NGK CPR8EA-9 (DTS-i): troque o par a cada 10.000 km — gap 0,7–0,8 mm',
    body: 'A Pulsar 150 usa DUAS velas (DTS-i) — código NGK CPR8EA-9. Troque as 2 sempre juntas: uma vela nova + outra gasta mantém ignição desequilibrada. Gap: 0,7–0,8 mm. Torque: 10–12 N·m. Intervalo: 10.000 km. Leia a coloração das velas velhas ao trocar: marrom-cinza = ok; preta/seca = carburador rico (ajuste o jato); preta/molhada = óleo no cilindro; branca = mistura pobre (risco de superaquecimento). Custo: R$ 25–45 cada no ML. Para versão FI: as velas são o mesmo código, mas o sistema de combustível não permite ajuste manual de mistura.',
  },
  {
    severity: 'WARN',
    title: 'Válvulas: IN 0,05 mm / EX 0,05–0,10 mm — verifique a cada 10.000 km com motor frio',
    body: 'Folgas de válvula da Pulsar 150 DTS-i: admissão 0,05 mm, escape 0,05–0,10 mm (confirme no manual do seu ano específico — diferentes versões têm variações). Motor completamente frio (mínimo 4h parado). Pistão no PMS da compressão — ambas as válvulas fechadas. Use feeler gauge de qualidade. Ajuste se fora do range ±0,02 mm: afrouxe o contra-pino, ajuste o parafuso, reaperte (7–9 N·m), confirme. Em motos de entrega com quilometragem alta (acima de 40.000 km): verifique a cada 8.000 km. Custo do serviço: R$ 60–R$ 120 de mão de obra.',
  },
  {
    severity: 'OK',
    title: 'Freio traseiro a tambor: ajuste de cabo e inspeção de lonas a cada 5.000 km',
    body: 'A Pulsar 150 tem tambor traseiro. Manutenção: 1) A cada 5.000 km — ajuste o cabo pelo tensor na manopla ou no terminal junto ao tambor. A alavanca deve firmar com no máximo 1/3 de curso. 2) A cada 10.000 km — inspecione as lonas pela janela de inspeção no tambor: espessura mínima 2 mm. 3) Sinal de lona gasta: alavanca vai ao guidão sem frear, rangido de metal em metal. 4) Lonas de reposição: R$ 20–R$ 50 no ML (diâmetro 130 mm na maioria das versões). Tambor com sulcos profundos: precisa de torneamento antes de novas lonas — custo R$ 40–R$ 80 em torneiro mecânico.',
  },
  {
    severity: 'OK',
    title: 'Versão FI: manutenção adicional do sistema de injeção eletrônica',
    body: 'Para Pulsar 150 com injeção (modelos BS-VI mais recentes): 1) A cada 20.000 km — adicione 1 frasco de limpa-injetor (Wynns, STP, Liqui-Moly Injection Cleaner, R$ 20–40) no tanque — dissolve depósitos de etanol no bico injetor. 2) Filtro de combustível inline: verifique a cada 10.000 km, troque se houver sedimento visível. 3) Sensor TPS (posição do acelerador): problema causa consumo alto e ralenti instável — diagnóstico via leitor OBD moto (R$ 50–120 no ML). 4) Bateria: a ECU é sensível a bateria fraca. Bateria com mais de 3 anos: substitua preventivamente (R$ 80–150 para bateria de moto 7Ah).',
  },
]

// ─── Pulsar 180 / 180F — dicas exclusivas ───────────────────────────────────

const PULSAR180_MACETES: TipInput[] = [
  ...MACETES_DTSI_AR,
  {
    severity: 'OK',
    title: 'Corrente 520 (Pulsar 180): mais resistente que a 428, mas mais cara para trocar',
    body: 'A Pulsar 180 usa corrente 520 (passo 15,875 mm, rolo maior que a 428) — mais robusta para o motor mais potente. Vantagem: maior durabilidade. Desvantagem: kit completo (corrente + coroas) custa R$ 250–R$ 450 — mais caro que o kit da 150. Opções de qualidade para 520: DID 520VX3 (X-ring, melhor escolha), RK 520KRO (O-ring), Vaz 520 (econômica). Comprimento: ~116 elos (confirme na corrente velha). A Pulsar 180F com carenagem lateral dificulta a inspeção visual da corrente — inspecione pelo lado direito levantando a saia da carenagem. Lubrifique a cada 500 km sem exceção.',
  },
  {
    severity: 'WARN',
    title: 'Semi-carenagem da 180F: armadilha de umidade que acelera corrosão',
    body: 'A Pulsar 180F tem semi-carenagem (fairing lateral) que, quando não vedada corretamente, acumula umidade e sujeira atrás dos painéis. Com o tempo, isso acelera a corrosão do chassi e dos componentes elétricos nessa área. Prevenção: ao lavar a moto, abra os parafusos da carenagem a cada 3 meses e seque a área interna com ar comprimido. Aplique spray anticorrosivo (Tectyl, Rustoleum) nas partes metálicas expostas dentro da carenagem. Conectores elétricos atrás da carenagem: pulverize com spray dielétrico anualmente. Não use jato de água forte direto nas junções da carenagem — a água penetra e fica represada dentro.',
  },
]

const PULSAR180_PROBLEMAS: TipInput[] = [
  ...PROBLEMAS_DTSI_AR,
  {
    severity: 'WARN',
    title: 'Vibração alta acima de 80 km/h: verifique balanceamento dos pneus e parafusos',
    body: 'A Pulsar 180 e 180F podem desenvolver vibração perceptível em velocidades acima de 80 km/h ao longo do tempo. Causas mais comuns: 1) Pneus desbalanceados — pesos de balanceamento que caem são comuns em buracos e meios-fios. Solução: balanceamento na borracharia (R$ 20–R$ 40 por roda). 2) Parafusos do motor soltos no chassi — verificação simples com chave de boca. 3) Rolamento de cabeçote desgastado — o mais ignorado: agite o guidão para frente e para trás com a roda dianteira no ar. Se sentir "baque" ou jogo, o rolamento precisa de ajuste ou troca. 4) Rolamentos de roda com folga — verifique agitando cada roda lateralmente com moto no cavalete.',
  },
]

const PULSAR180_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma preventivo Pulsar 180/180F: revisões por quilometragem',
    body: '1.000 km — Primeira revisão obrigatória: troca de óleo 1,1L SAE 20W50 JASO MA, limpeza do filtro de tela, aperto geral dos parafusos (carenagem na 180F), ajuste da corrente 520. | 5.000 km — Troca de óleo + filtro de ar (espuma: lave, seque, reaproveite ou troque), ajuste dos freios, calibragem dos pneus. | 10.000 km — Óleo + 2 velas NGK CPR8EA-9 (par DTS-i), regulagem de válvulas (admissão 0,05 mm / escape 0,10 mm com motor frio), filtro de ar novo, inspeção da corrente 520. | 20.000 km — Tudo do 10.000 + kit corrente 520 (corrente + coroa + pinhão), troca de fluido de freio DOT 4, limpeza interna do carburador. | 180F: a cada 10.000 km inspecione o interior da carenagem por umidade acumulada e corrija com spray anticorrosivo.',
  },
  {
    severity: 'OK',
    title: 'Óleo: 1,1L SAE 20W50 JASO MA semissintético — 3.500 km trânsito, 5.000 km estrada',
    body: 'A Pulsar 180 usa ~1,1L de óleo na troca completa. O motor de 178cc gera mais calor que o de 150cc em uso urbano parado. Use semissintético SAE 20W50 JASO MA para maior proteção térmica (Motul 3000+ 4T, Castrol Power 1 4T, Shell Advance 4T). Intervalo recomendado no Brasil: 3.500 km em uso urbano e entrega, 5.000 km em uso misto/estrada. Verifique o nível a cada 1.000 km pelo visor lateral com moto vertical e motor frio. Nunca opere com nível abaixo da marca mínima — motor de maior potência danifica mais rápido com óleo insuficiente.',
  },
  {
    severity: 'OK',
    title: '2 velas NGK CPR8EA-9 (DTS-i): gap 0,7–0,8 mm — troque o par a cada 10.000 km',
    body: 'A Pulsar 180/180F usa DUAS velas por ser DTS-i. Código: NGK CPR8EA-9 (mesmo das Pulsars 135 e 150). Troque as 2 sempre juntas. Gap: 0,7–0,8 mm. Torque: 10–12 N·m. Custo: R$ 25–R$ 45 cada no ML. Na 180F com carenagem: o acesso às velas exige remover o painel superior da carenagem. Aprenda a fazer: são 4–6 parafusos Phillips. Leia a coloração ao trocar — marrom-cinza = ok, preta = mistura rica (carburador), branca = mistura pobre (risco de pinar). Motores mais quentes (178cc) desgastam velas mais rápido que os de 150cc em uso intenso.',
  },
  {
    severity: 'WARN',
    title: 'Válvulas: IN 0,05 mm / EX 0,10 mm — cheque a cada 10.000 km com motor frio',
    body: 'Folgas de válvula da Pulsar 180 DTS-i: admissão 0,05 mm, escape 0,10 mm. Motor completamente frio (mínimo 4h parado), pistão no PMS da compressão. Use feeler gauge calibrado. Ajuste se fora do range ±0,02 mm. Motores de maior potência têm desgaste de assentos de válvula ligeiramente mais rápido — em motos com mais de 50.000 km, verifique a cada 8.000 km. Sinal de válvulas desreguladas: dificuldade de partida a quente, consumo de combustível aumentado, ronco metálico sutil no cabeçote. Custo do serviço: R$ 60–R$ 130 de mão de obra.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 da Pulsar 180: lubrificar a cada 500 km, kit a cada 20.000 km',
    body: 'A Pulsar 180 usa corrente 520 (maior que a 428 da Pulsar 150). Tensão: afrouxamento de 25–30 mm na parte inferior com moto no cavalete central. Lubrificação: a cada 500 km com spray de corrente (Motul Chain Lube Road, DID O-ring Lube, Wurth HHS 2000). Kit corrente + coroa + pinhão para Pulsar 180: R$ 250–R$ 450 — troque o conjunto completo (corrente nova em coroas velhas desgasta 3× mais rápido). Corrente de qualidade recomendada: DID 520VX3 (X-ring) ou RK 520KRO (O-ring). Na 180F: o acesso para ajuste da corrente é pelo lado direito levantando a saia da carenagem.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar da Pulsar 180: elemento de espuma — lave a cada 5.000 km',
    body: 'A Pulsar 180 usa filtro de ar de espuma (não papel). Manutenção: 1) A cada 5.000 km — remova, lave com detergente neutro, enxágue abundantemente, seque completamente ao ar (nunca ao sol direto que endurece a espuma). 2) Após secar, aplique uma pequena quantidade de óleo de filtro de ar (ou óleo motor limpo) na espuma e esprema para distribuir — o óleo melhora a filtragem. 3) A cada 20.000 km ou quando a espuma estiver deteriorada — troque (R$ 20–R$ 50 no ML). Filtro de ar sujo é perda de potência imediata e consumo aumentado — em ambientes com pó ou terra, limpe com o dobro da frequência.',
  },
]

// ─── Pulsar 200 NS — dicas exclusivas ───────────────────────────────────────

const PULSAR200NS_MACETES: TipInput[] = [
  ...MACETES_200CC_LIQUIDO,
  {
    severity: 'OK',
    title: 'Naked sem carenagem = motor exposto: priorize proteção contra chuva e sujeira',
    body: 'A Pulsar 200 NS é uma naked (sem carenagem) — vantagem de acesso fácil ao motor, desvantagem de exposição total aos elementos. Cuidados preventivos: 1) Depois de chuva forte, seque os conectores elétricos expostos com ar comprimido — especialmente o sensor de posição neutra (tampa da embreagem) e o regulador de tensão. 2) Aplique spray dielétrico em todos os conectores do chicote elétrico uma vez por ano. 3) O radiador fica exposto — inspecione as aletas regularmente por deformação de pedrinhas (deforma mas continua refrigerando até perda significativa de área). 4) A corrente fica totalmente exposta — lubrificação a cada 500 km é ainda mais crítica que em motos com carenagem.',
  },
  {
    severity: 'OK',
    title: 'Upgrade gratuito de potência: desobstrua o escape e limpe o filtro de ar',
    body: 'A Pulsar 200 NS chega ao Brasil com restrições de emissão (filtro de ar mais restritivo que o modelo indiano e silenciador com catalisador). Para extrair mais do motor sem modificações ilegais: 1) Verifique se o filtro de ar está limpo — filtro sujo é perda de potência imediata. 2) O escapamento aftermarket abre potência mas exige rejetting da injeção (não recomendado sem mapeamento). 3) O mapeamento da ECU com Power Commander V (Dynojet) ou remapeamento via OBD é a forma mais eficaz de aumentar potência — procure preparadores de moto em SP, RJ, BH que trabalham com motos indianas. 4) Aumento de corroa traseira (1–2 dentes a mais): reduz velocidade máxima mas melhora aceleração em cidade sem custo de eletrônica.',
  },
]

const PULSAR200NS_PROBLEMAS: TipInput[] = [
  ...PROBLEMAS_200CC_LIQUIDO,
  {
    severity: 'DANGER',
    title: 'Regulador de tensão: problema crítico na série 200cc também',
    body: 'Assim como nas DTS-i ar, o regulador/retificador de tensão da Pulsar 200 NS também tem histórico de falha prematura no Brasil. O sistema elétrico mais complexo (injeção, ABS nos modelos mais novos, painel digital) torna a sobretensão ainda mais destrutiva — uma ECU de injeção danificada por sobretensão custa R$ 600–R$ 1.500 para substituir. Monitoramento preventivo: use multímetro mensalmente para verificar tensão da bateria com motor em 4.000 RPM. Compre regulador aftermarket de melhor qualidade (R$ 120–R$ 250 no ML) antes que o original falhe. Se a bateria morreu sem motivo aparente, o regulador é o primeiro suspeito.',
  },
]

const PULSAR200NS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma preventivo Pulsar 200 NS: revisões por quilometragem',
    body: '1.000 km — Primeira revisão obrigatória: troca de óleo 1,5L SAE 20W50 JASO MA + filtro de óleo, aperto geral, ajuste da corrente 520, verificação do nível do fluido de arrefecimento. | 5.000 km — Troca de óleo, filtro de ar, ajuste da corrente, verificação dos freios a disco (frente e trás), inspeção visual do sistema de arrefecimento. | 10.000 km — Óleo + filtro + 2 velas (código Triple Spark se a versão for NS200 Triple Spark — verifique no manual), regulagem de válvulas (IN 0,04–0,06 mm / EX 0,07–0,09 mm), kit corrente se desgastada. | 20.000 km — Tudo do 10.000 + fluido de freio DOT 4, fluido de arrefecimento OAT, pastilhas de freio se desgastadas. | A cada 2 anos — troca de fluido de arrefecimento e fluido de freio independente de quilometragem.',
  },
  {
    severity: 'OK',
    title: 'Óleo: 1,5L SAE 20W50 JASO MA — motor refrigerado a líquido exige mais volume',
    body: 'A Pulsar 200 NS usa ~1,5L de óleo na troca completa com filtro. O motor refrigerado a líquido tem temperatura mais estável que os DTS-i ar, mas o óleo ainda faz trabalho de lubrificação da embreagem úmida. Use SAE 20W50 JASO MA/MA2. Intervalo: 5.000 km (motor bem refrigerado tolera intervalo maior que os DTS-i ar). A cada 2 trocas de óleo: troque o filtro de óleo (cartucho roscado no cárter — R$ 20–R$ 50 no ML). Verifique o nível semanalmente pelo visor lateral — motor nakend tem o visor mais exposto e fácil de checar.',
  },
  {
    severity: 'OK',
    title: 'Fluido de arrefecimento OAT: verifique mensalmente, troque a cada 2 anos',
    body: 'O sistema de arrefecimento da NS200 usa fluido OAT (Organic Acid Technology) diluído 50%/50% com água destilada. Verificação mensal: nível no reservatório de expansão (marcas MIN/MAX). Se cair com frequência sem vazamento visível: verifique a junta do cabeçote (teste do gás de combustão no reservatório com kit de detecção, R$ 80–120 no ML). Troca a cada 2 anos: volume ~0,7–0,8L. Use anticongelante OAT vermelho ou verde — NÃO misture cores/marcas diferentes. Após troca: purgue o ar ligando o motor com tampa aberta até a ventoinha entrar, complete o nível e feche. Nunca abra o sistema com motor quente — queimadura de vapor.',
  },
  {
    severity: 'WARN',
    title: 'Válvulas da NS200: IN 0,04–0,06 mm / EX 0,07–0,09 mm — diferentes das DTS-i ar',
    body: 'As folgas de válvula da Pulsar 200 NS são DIFERENTES das demais Pulsars DTS-i ar. Admissão: 0,04–0,06 mm (ideal: 0,05 mm). Escape: 0,07–0,09 mm (ideal: 0,08 mm). Motor completamente frio (4h+ parado). Pistão no PMS da compressão — ambas as válvulas fechadas. Na NS200 naked, o acesso ao cabeçote é mais fácil que nas versões carenadas — retire a tampa traseira do cabeçote. Verifique a cada 10.000 km. Motor com válvulas fora do range perde compressão a quente e tem dificuldade de partir após uso em temperatura alta — sintoma muito comum em NS200 usadas sem histórico.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520: O-ring ou X-ring — kit completo a cada 20.000 km',
    body: 'A NS200 usa corrente 520 com ~110 elos. Use corrente com O-ring ou X-ring (DID 520VX3, RK 520KRO) — a graxa interna vedada aumenta durabilidade em 30–50%. Tensão: afrouxamento de 25–30 mm na parte inferior com moto no cavalete central. Lubrificar a cada 500 km. Kit completo NS200: R$ 280–R$ 500 dependendo da marca. Ao trocar a corrente: troque sempre também a coroa traseira e o pinhão dianteiro — corrente nova em coroas velhas desgasta 3× mais rápido. Motor mais potente = mais carga na corrente = desgaste mais rápido se mal lubrificada ou com tensão errada.',
  },
  {
    severity: 'OK',
    title: 'Pastilhas de freio a disco dianteiro e traseiro: verifique a cada 5.000 km',
    body: 'A NS200 tem freio a disco dianteiro e traseiro. Verificação das pastilhas: olhe pela parte frontal da pinça — as pastilhas novas têm ~5 mm de material, substitua quando chegar a ~1,5 mm. Não espere o squeal metálico (rangido) — nesse ponto o disco já está sendo arranhado. Pastilhas compatíveis com NS200: Galfer FD449G1054 (original quality), Brembo LA ou EX (R$ 50–R$ 150 o jogo no ML). Não use pastilhas semimetálicas baratas — aumentam o desgaste do disco e reduzem a eficiência em frenagens de emergência. Ao trocar pastilhas: encha a pinça com pistão comprimido, verifique o nível do fluido de freio.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: elemento de espuma ou papel — limpe/troque a cada 5.000 km',
    body: 'A NS200 usa filtro de ar de espuma. Manutenção: 1) A cada 5.000 km — remova, lave com detergente neutro, enxágue bem, seque completamente ao ar. Após secar, aplique óleo de filtro leve e reinstale. 2) A cada 20.000 km — troque por filtro novo (R$ 30–R$ 60 no ML). Em ambientes com poeira ou terra: dobre a frequência de limpeza. Filtro de ar sujo causa consumo aumentado, ralenti instável e piora a aceleração — na NS200 com injeção eletrônica, filtro sujo também afeta o mapeamento da ECU (mais ar = ECU fica fora do ponto ótimo de injeção de combustível).',
  },
]

// ─── Pulsar 220F — dicas exclusivas ─────────────────────────────────────────

const PULSAR220F_MACETES: TipInput[] = [
  ...MACETES_DTSI_AR,
  {
    severity: 'OK',
    title: 'Motor oil-cooled (com radiador de óleo): o sistema único da 220F que mecânicos ignoram',
    body: 'A Pulsar 220F usa um sistema híbrido de refrigeração: ar + radiador de óleo (oil cooler). O óleo quente circula pelo pequeno radiador na frente da moto e volta resfriado ao cárter. Isso não é refrigeração a líquido — não há anticongelante. Mas exige atenção: 1) O radiador de óleo fica exposto e pode ser entupido por insetos e sujeira — limpe as aletas com jato suave de ar comprimido a cada 5.000 km. 2) Use óleo de melhor qualidade (semissintético SAE 20W50 JASO MA) porque o óleo faz trabalho extra de refrigeração. 3) Nível de óleo mais crítico que nas DTS-i convencionais — verifique semanalmente. Capacidade: 1,45L com troca completa (drenagem + 1,2L de refill).',
  },
  {
    severity: 'WARN',
    title: 'Fairing completa da 220F: custo de reparo alto em quedas — proteja com sliders',
    body: 'A Pulsar 220F tem fairing (carenagem) completa — em quedas ou mesmo em derrubadas de baixa velocidade (estacionamento), o custo de reparo é alto. Uma carenagem lateral nova original: R$ 300–R$ 600. Proteção inteligente: instale slider de chassi (protetor de moto) — encaixam nos parafusos do motor e impedem que a carenagem toque o chão nas quedas. Custo: R$ 80–R$ 200 para um par. Pesquise: "slider protetor Bajaj Pulsar 220F" no ML. Procure versões de polietileno (PE) resistente a impacto — as de plástico barato quebram e não protegem. Segunda prioridade: protetor de motor (engine guard/crash bar) para proteção nas quedas maiores.',
  },
]

const PULSAR220F_PROBLEMAS: TipInput[] = [
  ...PROBLEMAS_DTSI_AR,
  {
    severity: 'WARN',
    title: 'Consumo de óleo acima de 30.000 km: anéis desgastados pedem revisão',
    body: 'A Pulsar 220F com mais de 30.000 km pode começar a consumir óleo perceptivelmente (fumaça azulada no escapamento, nível caindo entre trocas sem vazamento visível). Causa: desgaste dos anéis do pistão — o motor de 220cc trabalha com temperatura elevada, especialmente no trânsito urbano brasileiro. Diagnóstico preliminar: coloque um pano branco no escapamento com motor quente e acelere — mancha azul/preta oleosa confirma consumo de óleo. Solução: retifica do cilindro + kit de pistão e anéis novos (R$ 200–R$ 400 em peças + mão de obra). Antes de chegar a esse ponto: não deixe o nível de óleo cair abaixo da metade do visor — óleo insuficiente acelera o desgaste dos anéis.',
  },
  {
    severity: 'WARN',
    title: 'Carenagem com barulho de "crepitar": parafusos e presilhas soltos com vibração',
    body: 'A carenagem plástica da Pulsar 220F é presa por uma combinação de parafusos e presilhas (clips) de plástico que afrouxam com a vibração do motor e as variações de temperatura do dia. Resultado: barulho de "crepitar" ou "chocalhar" que irrita durante o uso. Solução preventiva: a cada 10.000 km, aperte todos os parafusos da carenagem (são muitos — consulte o manual para não esquecer nenhum) e substitua presilhas quebradas por novas genéricas do tipo "push pin" de plástico (R$ 5–R$ 20 o pacote no ML — meça o diâmetro da presilha original). Para os parafusos: use porcas de nylon (Nylstop) nas que ficam mais sujeitas a vibração — impedem o afrouxamento progressivo.',
  },
]

const PULSAR220F_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma preventivo Pulsar 220F: revisões por quilometragem',
    body: '1.000 km — Primeira revisão obrigatória: troca de óleo 1,2L SAE 20W50 JASO MA semissintético (refill) + filtro de tela limpo, aperto geral da carenagem (presilhas e parafusos), ajuste da corrente 520, verificação do radiador de óleo (aletas limpas). | 5.000 km — Troca de óleo, filtro de ar (espuma), ajuste dos freios a disco, calibragem dos pneus, limpeza das aletas do radiador de óleo com ar comprimido. | 10.000 km — Óleo semissintético + 2 velas NGK CR8EGP (platina — código DIFERENTE das outras Pulsars), regulagem de válvulas (IN 0,05 mm / EX 0,10 mm), filtro de ar novo. | 20.000 km — Tudo do 10.000 + kit corrente 520, fluido de freio DOT 4, limpeza do carburador, inspeção da carenagem por oxidação interna.',
  },
  {
    severity: 'OK',
    title: 'Óleo: 1,45L total ou 1,2L de refill — semissintético obrigatório pelo radiador de óleo',
    body: 'A Pulsar 220F usa sistema oil-cooled (radiador de óleo) que eleva a exigência do lubrificante. Use SAE 20W50 JASO MA/MA2 semissintético — o óleo circula pelo radiador em ciclos mais longos e deve manter viscosidade sob temperatura maior. Capacidade: 1,45L no overhaul completo (drenagem total + filtro de tela), 1,2L na troca simples. Intervalo: 3.500 km no trânsito urbano (calor intenso + paradas frequentes), 5.000 km em uso misto. Filtro de tela (strainer): limpe a cada troca de óleo — acessa pelo tampão no fundo do cárter. Troque o filtro de papel (quando houver) a cada 2 trocas de óleo.',
  },
  {
    severity: 'WARN',
    title: 'ATENÇÃO: velas da 220F são NGK CR8EGP (platina) — código diferente de todas as outras Pulsars',
    body: 'A Pulsar 220F usa velas NGK CR8EGP (platina) — código DIFERENTE das CPR8EA-9 usadas nas Pulsars 135, 150 e 180. A diferença: CR8EGP tem eletrodo de platina, não é intercambiável com as outras. Troque o par a cada 15.000 km (platina dura mais que iridium convencional). Gap: 0,7–0,8 mm (verifique o gap mesmo em velas de platina — às vezes vêm ligeiramente erradas de fábrica). Custo: R$ 40–R$ 80 cada no ML. Na 220F com carenagem full: o acesso às velas exige remover o painel superior da carenagem (4–6 parafusos). Aprenda a fazer — economiza R$ 60–R$ 100 de mão de obra a cada troca.',
  },
  {
    severity: 'WARN',
    title: 'Válvulas: IN 0,05 mm / EX 0,10 mm — cheque a cada 10.000 km com motor frio',
    body: 'Folgas de válvula da Pulsar 220F: admissão 0,05 mm, escape 0,10 mm. Motor completamente frio (mínimo 4h parado). O acesso ao cabeçote na 220F exige remoção do painel superior da carenagem — não pule essa manutenção pela dificuldade de acesso. Motor com oil-cooler mantém temperatura de operação mais estável, o que teoricamente deveria dar maior durabilidade às válvulas — mas em uso urbano intenso (paradas frequentes sem atingir temperatura ideal), o desgaste por partidas a frio repetidas acontece. Verifique a cada 10.000 km. Custo com desmontagem de carenagem: R$ 100–R$ 180 de mão de obra.',
  },
  {
    severity: 'OK',
    title: 'Radiador de óleo da 220F: limpe as aletas a cada 5.000 km com ar comprimido',
    body: 'O radiador de óleo frontal da Pulsar 220F é um componente exclusivo que precisa de manutenção própria. A cada 5.000 km: com moto fria, use pistola de ar comprimido (ou bomba manual de pneu na falta) para remover insetos, pó e sujeira das aletas. Lave com jato de água suave de trás para frente (não use esguicho de alta pressão — dobra as aletas). Aletas dobradas: endireite com pinça plana lentamente — não rasga, apenas deforma. Nível de óleo crítico no sistema oil-cooled: verifique semanalmente. Perda de nível acelera aquecimento excessivo e degradação mais rápida do óleo. Capacidade total: 1,45L.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 + carenagem: inspeção pelo lado direito levantando a saia',
    body: 'A Pulsar 220F usa corrente 520. A carenagem lateral dificulta a inspeção visual — acesse pelo lado direito levantando a saia da carenagem. Tensão: afrouxamento de 25–30 mm na parte inferior com moto no cavalete central. Lubrificação: a cada 500 km. Kit corrente + coroa + pinhão para 220F: R$ 250–R$ 500 (520 X-ring ou O-ring). Ajuste da corrente na 220F: afrouxe o eixo traseiro, ajuste os tensores bilateralmente (esquerdo e direito em posições iguais para manter o alinhamento da roda), reaperte o eixo e verifique o alinhamento pela marcação no suporte do eixo — descalinhamento desgasta pneu traseiro de forma assimétrica.',
  },
]

// ─── Pulsar RS 200 — dicas exclusivas ───────────────────────────────────────

const PULSARRS200_MACETES: TipInput[] = [
  ...MACETES_200CC_LIQUIDO,
  {
    severity: 'WARN',
    title: 'Carenagem full da RS200: acesso ao motor exige desmontagem — aprenda a fazer sozinho',
    body: 'A Pulsar RS 200 tem carenagem completa (full fairing) que, ao contrário das nakeds, dificulta o acesso ao motor para manutenção básica como verificação de nível de óleo e das velas. Para verificar o nível de óleo: há uma janela na carenagem lateral ou acesso pelo painel inferior — consulte o manual do seu ano específico. Para troca de velas (3 velas!): é necessário remover pelo menos o painel superior da carenagem. Custo de mão de obra em qualquer manutenção é maior que na NS200 naked — aí está o preço da estética esportiva. Invista em aprender a montar/desmontar a carenagem sozinho: vídeos específicos no YouTube e o manual de serviço PDF (ManualsLib: "Bajaj Pulsar RS200 service manual").',
  },
  {
    severity: 'OK',
    title: 'Postura de pilotagem agressiva: prevenção de dores e ajuste de ergonomia',
    body: 'A RS 200 tem postura mais inclinada para frente que a NS200 naked. Em trajetos acima de 1 hora, isso gera dores nos punhos e no pescoço. Ajustes simples: 1) Posição do guidão: alguns exemplares permitem ajuste do ângulo dos semi-guidões (clip-ons) — pequenas mudanças fazem grande diferença no conforto. 2) Altura do assento: verificar se o proprietário anterior não rebaixou em excesso a suspensão (afeta conforto e manuseio). 3) Manoplas com gel ou antivibração: reduzem fadiga nas mãos significativamente. 4) Pré-carga do monoshock traseiro: ajustar para o peso do piloto — mola muito apertada transmite mais impacto para os punhos do que mola calibrada corretamente.',
  },
]

const PULSARRS200_PROBLEMAS: TipInput[] = [
  ...PROBLEMAS_200CC_LIQUIDO,
  {
    severity: 'WARN',
    title: 'Carenagem danificada por pedrinhas: protetores de tanque e de farol são essenciais',
    body: 'A carenagem branca ou colorida da RS 200 acumula marcas de pedrinhas e insetos com o tempo — especialmente o farol, o para-brisa e a parte inferior da carenagem. Proteção preventiva: 1) Película protetora de pintura (PPF) nas áreas mais expostas — frontais, na asa dianteira e no para-lama. Custo: R$ 200–R$ 500 com aplicação. 2) Para o para-brisa: protetor de acrílico sobreposto (encontre no ML: "protetor para-brisa moto transparente"). 3) Para pedrinhas no motor e radiador: tela protetora de radiador (R$ 30–R$ 80). Peças de carenagem originais são caras e têm disponibilidade limitada no Brasil — a prevenção de dano é muito mais barata.',
  },
]

const PULSARRS200_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma preventivo Pulsar RS 200: revisões por quilometragem',
    body: '1.000 km — Primeira revisão obrigatória: troca de óleo 1,5L SAE 20W50 JASO MA + filtro, aperto geral incluindo toda a carenagem full (muitos parafusos — use lista do manual), ajuste da corrente 520, nível do fluido de arrefecimento. | 5.000 km — Troca de óleo + filtro de óleo, filtro de ar, verificação dos freios a disco (frente/trás), sistema de arrefecimento (nível e vazamentos). | 10.000 km — Óleo + velas (Triple Spark: 3 velas — confirme o código no manual para a versão RS200), regulagem de válvulas (IN 0,04–0,06 mm / EX 0,07–0,09 mm), corrente 520. | 20.000 km — Tudo do 10.000 + fluido de freio DOT 4 (ABS depende disso), fluido de arrefecimento OAT, kit corrente, pastilhas de freio. | A cada 2 anos — DOT 4 e arrefecimento independente de km.',
  },
  {
    severity: 'OK',
    title: 'Óleo: 1,5L SAE 20W50 JASO MA — motor refrigerado a líquido com 25 cv',
    body: 'A RS200 usa ~1,5L de óleo na troca completa. Motor com injeção + refrigeração líquida tem temperatura mais controlada, mas o óleo ainda lubrifica a embreagem úmida. Use SAE 20W50 JASO MA/MA2 semissintético. Intervalo: 5.000 km (aceita intervalo maior que DTS-i ar pela temperatura controlada). A cada 10.000 km: troque o filtro de óleo cartucho. Verifique o nível a cada 1.000 km — na RS200 com carenagem full, o visor lateral tem acesso por uma abertura específica ou pela carenagem inferior. Consulte o manual para localizar o visor no seu ano específico.',
  },
  {
    severity: 'OK',
    title: 'Fluido de arrefecimento OAT: verifique mensalmente, troque a cada 2 anos',
    body: 'A RS200 usa fluido OAT 50%/50% com água destilada. Volume: ~0,7–0,8L. Verificação: reservatório de expansão visível com a carenagem inferior parcialmente removida ou por abertura de acesso (consulte manual). Se o nível cair sem vazamento visível: suspeite de junta do cabeçote comprometida — teste com kit de detecção de gás de combustão (R$ 80–120 no ML). Troca a cada 2 anos: drene pelo bujão inferior do motor, lave o sistema com água destilada, encha com OAT novo. Não misture marcas/cores de anticongelante. Purga do ar após troca obrigatória: motor ligado com tampa aberta até ventoinha entrar.',
  },
  {
    severity: 'WARN',
    title: 'Válvulas: IN 0,04–0,06 mm / EX 0,07–0,09 mm — acesso difícil pela carenagem full',
    body: 'Folgas de válvula da RS200: admissão 0,04–0,06 mm, escape 0,07–0,09 mm (igual à NS200). Motor frio, pistão no PMS. Na RS200 com carenagem full, o acesso ao cabeçote é o mais difícil de toda a família Bajaj — exige remoção de pelo menos o painel superior e a carenagem lateral. Muitos mecânicos cobram mais caro por isso. Aprenda a montar/desmontar a carenagem sozinho: cada painel tem pontos de encaixe específicos — fotografe antes de desmontar. Vídeos no YouTube: "Bajaj RS200 fairing removal". A cada 10.000 km essa manutenção é crítica — não pule por dificuldade de acesso.',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio DOT 4: troque a cada 2 anos — ABS depende de fluido limpo',
    body: 'A Pulsar RS 200 (versões com ABS) tem sistema hidráulico com módulo ABS. DOT 4 absorve umidade com o tempo — ponto de ebulição cai de 230°C (novo) para ~150°C (saturado de umidade), perigoso em frenagens repetidas. Troque a cada 2 anos, independente de quilometragem. Circuito dianteiro e traseiro separados — troque os dois. Processo: seringa para sugar o fluido velho do reservatório, encha com DOT 4 novo, sangre as linhas até sair fluido limpo e sem bolhas. Não misture DOT 3 com DOT 4. DOT 4 corrói pintura imediatamente — proteja a carenagem com pano úmido ao abrir o sistema. Módulo ABS tem limpador automático — o processo de sangria é o mesmo de um freio convencional.',
  },
  {
    severity: 'OK',
    title: 'Carenagem full: manutenção preventiva para não virar dívida em quedas',
    body: 'A carenagem completa da RS200 é o que mais valoriza e ao mesmo tempo mais onera o custo de manutenção. Preventivas: 1) Instale sliders de chassi — protegem a carenagem em quedas leves (R$ 80–200 o par). 2) A cada 10.000 km: reaperte todos os parafusos e substitua presilhas quebradas (push pins genéricos, R$ 5–20 o pacote). 3) Aplique cera automotiva nas peças plásticas da carenagem — protege da oxidação UV. 4) Crepitar da carenagem: instale fitas de espuma antivibração (adesivas) nas junções entre painéis — reduz 80% dos barulhos. 5) Pesquise sempre por carenagens paralelas no ML — custo 40–60% menor que original Bajaj.',
  },
]

// ─── Boxer 150 — dicas exclusivas ───────────────────────────────────────────

const BOXER150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Boxer 150: a moto de trabalho mais resistente da Bajaj — mas tem seus pontos críticos',
    body: 'A Boxer 150 foi projetada para uso intenso em países em desenvolvimento — simplificada, robusta e com manutenção barata. No Brasil, é muito usada para delivery, mototaxi e uso rural. Ponto forte: motor simples de 144,8cc com poucas eletrônicas = fácil de consertar. Pontos críticos: 1) Corrente final: com carga extra de entrega, desgasta 50% mais rápido. Lubrificar a cada 300–400 km em uso de entrega. 2) Sistema de freio a tambor (frente e trás): inspecionar as lonas a cada 5.000 km — uso intenso desgasta rápido e tambor aquecido perde eficiência. 3) Pneus: a Boxer aguenta mais carga que as Pulsars, mas os pneus têm pressão específica que deve ser respeitada com carga.',
  },
  {
    severity: 'WARN',
    title: 'Sobrecarga na Boxer: o erro mais comum dos entregadores que destrói a moto',
    body: 'A Boxer 150 tem capacidade de carga especificada — ultrapassar esse limite regularmente destrói a suspensão, os pneus e o motor prematuramente. Limite de carga oficial: verifique no manual do proprietário (geralmente ~150 kg total entre piloto + carga). Sinais de sobrecarga frequente: pneu traseiro com desgaste assimétrico, amortecedor traseiro que "bate" no fundo com frequência, corrente que estica rapidamente, consumo de óleo aumentado. Para delivery pesado: use os pneus na pressão máxima permitida para carga (geralmente 36 PSI traseiro com carga, em vez de 33 PSI vazio), inspecione os parafusos do bagageiro a cada 2.000 km (vibração solta), e troque o amortecedor traseiro por um de maior capacidade (R$ 100–R$ 200 para opções aftermarket).',
  },
  {
    severity: 'OK',
    title: 'Freio a tambor da Boxer: ajuste regular do cabo é essencial para segurança',
    body: 'Ao contrário das Pulsars com disco dianteiro, a Boxer 150 tem tambor em ambas as rodas. O freio a tambor requer ajuste periódico do cabo e da haste — à medida que a lona desgasta, a folga aumenta e o acionamento fica esponjoso. Ajuste o freio dianteiro (porca na manopla ou no terminal do cabo) quando a alavanca percorrer mais de 1/3 do curso antes de sentir resistência. Ajuste o traseiro (porca na haste junto ao pedal) similarmente. Em uso intenso: inspecione a cada 3.000 km. Quando mesmo com o ajuste no limite o freio ainda fica esponjoso: lonas gastas — troque. Lonas de tambor para Boxer 150: R$ 20–R$ 50 o par no ML (verifique o diâmetro: 130 mm ou 160 mm dependendo da versão).',
  },
  {
    severity: 'OK',
    title: 'Peças genéricas de 150cc funcionam bem na Boxer: velas, filtros e corrente',
    body: 'A Boxer 150 usa componentes genéricos compatíveis com o amplo ecossistema de motos utilitárias de 150cc no Brasil. Itens fáceis de encontrar: Vela: NGK C7HSA (rosca M10 × 1,0 mm) ou equivalente Champion RA6HC — R$ 10–R$ 20 cada, disponível em qualquer posto ou loja de moto. Filtro de ar: espuma genérica de monocilíndrico 150cc utilitário — R$ 10–R$ 25. Corrente: depende da versão BM ou CT — 428 ou 520, verifique na corrente velha. Pastilhas de freio a tambor (lonas): meça o diâmetro do tambor e procure "lona freio tambor 130mm" ou "lona freio tambor 160mm". Kit de embreagem completo: compatível com a maioria das motos 150cc genéricas asiáticas — R$ 60–R$ 120.',
  },
]

const BOXER150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor da Boxer "perdendo força" gradualmente: válvulas e anéis são os culpados',
    body: 'Em Boxers com mais de 30.000 km sem manutenção regular, a perda de força gradual é quase certa. Dois culpados mais comuns: 1) Válvulas com folga incorreta (muito comum): motor perde compressão, dificulta partida a quente, consome mais combustível. Solução: regulagem de válvulas (R$ 60–R$ 100 de mão de obra). 2) Anéis do pistão desgastados: consumo de óleo, fumaça azulada no escapamento. Solução: retifica + kit de pistão/anéis (R$ 150–R$ 300 em peças). Diagnóstico: teste de compressão com compressímetro — compressão abaixo de 130 psi no motor frio indica problema. Qualquer mecânico de moto faz esse teste. Priorize a regulagem de válvulas primeiro — é mais barato e resolve em muitos casos.',
  },
  {
    severity: 'WARN',
    title: 'Regulador de tensão da Boxer: mesma fraqueza das Pulsars',
    body: 'A Boxer 150 compartilha a fraqueza elétrica da família Bajaj: o regulador/retificador de tensão tem durabilidade aquém do esperado. Em uso de delivery com acessórios elétricos (baú com luz, GPS, celular carregando), a carga adicional acelera ainda mais a falha do regulador. Sintomas: bateria que não segura carga, motor que para sozinho em semáforo (quando a bateria fica muito baixa), dificuldade de partida. Diagnóstico e substituição: mesmo processo das Pulsars. Custo do regulador aftermarket para Boxer: R$ 60–R$ 150 no ML. Se usar acessórios elétricos regularmente: instale um voltímetro digital (R$ 15–R$ 30) no painel para monitorar a tensão em tempo real — alerta precoce antes do dano total.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro com vazamento: primeiro sinal de sobrecarga crônica',
    body: 'O amortecedor traseiro da Boxer 150 tem durabilidade limitada em uso de entrega com sobrecarga. Primeiro sinal de problema: mancha de óleo na haste do amortecedor (vedante rompido por pressão excessiva). Quando o amortecedor vaza, perde a capacidade de amortecimento — a moto começa a "pular" em ondulações e as demais peças de suspensão e chassi sofrem mais. Troca: amortecedor original Bajaj (disponível em concessionárias ou ML) ou versão aftermarket de maior capacidade (R$ 100–R$ 250 o par) que aguenta melhor a carga. Ao trocar o amortecedor, verifique também os silentblocks (borrachas de fixação) — endurecem e quebram com o tempo.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico frágil em uso intenso: conexões oxidadas cortam o motor',
    body: 'Em Boxers usadas para entrega diária com exposição constante à chuva e umidade, o chicote elétrico deteriora mais rápido. Conectores oxidados causam falhas intermitentes difíceis de diagnosticar: motor que corta ao passar em lombada, luz que acende e apaga, não pega em dias úmidos. Prevenção anual: pulverize spray dielétrico em TODOS os conectores do chicote. Limpe os terminais com lixa fina (600 ou espuma de limpeza de contatos). Aplique vaselina industrial ou graxa dielétrica nos conectores após limpar para prevenir reoxidação. Pontos críticos: conector da bobina de ignição, conector do CDI, conector do retificador. Um chicote novo completo da Boxer custa R$ 80–R$ 200 no ML e substitui todo o problema de uma vez.',
  },
]

const BOXER150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo SAE 20W50 JASO MA: troque a cada 3.000 km em uso de entrega sem exceção',
    body: 'Em uso de delivery (paradas frequentes, motor que liga e desliga dezenas de vezes por dia, carga pesada), o óleo degrada mais rápido que o manual prevê. Intervalo para delivery: 3.000 km — sem exceção. Capacidade da Boxer 150: ~1,0–1,1L (varia por versão BM ou CT). Use SAE 20W50 JASO MA — embreagem úmida. Economizar no óleo em moto de trabalho é a conta mais cara que existe: retifica de motor por uso de óleo degradado começa em R$ 600 e vai a R$ 1.500+. Ao trocar: limpe o filtro de tela (strainer) no fundo do cárter — ele acumula detritos que o dreno normal não remove. Desmonte o tampão da tela, lave com gasolina, seque e reinstale.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA: a mais barata e fácil de encontrar no Brasil',
    body: 'A Boxer 150 usa motor monocilíndrico com UMA vela (ao contrário das Pulsars DTS-i). Código: NGK C7HSA ou equivalente — disponível em postos, lojas de moto e farmácias de autopeça por R$ 10–R$ 20 cada. Troque a cada 8.000–10.000 km ou quando surgir dificuldade de partida ou engasgos. Leitura da vela velha: marrom-cinza = ok; preta e seca = mistura rica (carburador); preta e molhada = óleo no cilindro; branca = mistura pobre (risco de superaquecimento). Torque de instalação: 10–12 N·m. Em uso de delivery intenso: leve uma vela nova sobressalente no baú — é um dos componentes que mais falham em campo e a troca leva 5 minutos.',
  },
  {
    severity: 'OK',
    title: 'Revisão completa de trabalho: o checklist mensal do entregador inteligente',
    body: 'Para quem usa a Boxer 150 como ferramenta de trabalho, este checklist mensal previne paradas inesperadas: ✓ Tensão da corrente (afrouxamento 20–25 mm) e lubrificação. ✓ Freios dianteiro e traseiro — folga do cabo, eficiência do freio. ✓ Pneus — pressão (30/33 PSI vazio, 32/36 PSI com carga), desgaste e estado da borracha. ✓ Nível de óleo do motor pelo visor. ✓ Lâmpadas funcionando (farol, pisca, freio). ✓ Parafusos do bagageiro e do banco. ✓ Tensão da bateria em ralenti (~13 V no multímetro). ✓ Estado dos cabos de freio e embreagem — desgaste na ponteira que encosta na manopla. Esse checklist leva 20 minutos e economiza dias de moto parada.',
  },
]

// ─── Dominar 400 — dicas exclusivas ─────────────────────────────────────────

const DOMINAR400_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Triple Spark + DOHC: 3 velas e motor avançado exigem manutenção precisa',
    body: 'O Dominar 400 tem o motor mais sofisticado da linha Bajaj no Brasil: DOHC (dupla árvore de comando) com 4 válvulas e Triple Spark (3 velas/cilindro). Isso significa: 3 velas por troca (custo triplo das DTS-i convencionais), 2 árvores de cames para regular (admissão e escape separados), e sistema de injeção eletrônica sensível à qualidade do combustível. Velas: NGK Iridium para motores de alta performance 4T 373cc — confirme o código no manual de serviço ou com o revendedor NGK. Custo de 3 velas NGK Iridium: R$ 150–R$ 350. Intervalo: a cada 20.000 km (iridium dura mais). Não economize com velas convencionais no Dominar — o motor desnível o desempenho com velas de qualidade inferior.',
  },
  {
    severity: 'DANGER',
    title: 'Vazamento de óleo nas juntas: o problema mais reportado no Dominar 400 no Brasil',
    body: 'Vazamento de óleo pelas juntas do motor (principalmente tampa esquerda e cabeçote) foi o problema mais relatado nas Dominar 400 vendidas no Brasil em 2018–2020. A Bajaj reconheceu o problema e realizou revisões nas concessionárias. Se você tem Dominar de 2018–2019 com esse problema ainda: consulte a concessionária Bajaj mais próxima. Para motos fora do período ou sem solução definitiva: o vazamento geralmente é na junta da tampa esquerda do motor (cobre a embreagem). Kit de juntas DOMINAR 400 (R$ 80–R$ 200 no ML). Ao substituir: limpe as superfícies com acetona, aplique selante de juntas Loctite 5900 nos pontos de canto, aperte na sequência cruzada com torque adequado. Nunca aperte além do torque — alumínio em parafuso é irreversível.',
  },
  {
    severity: 'OK',
    title: 'Dominar é Bajaj com DNA KTM 390: peças de performance KTM podem ser adaptadas',
    body: 'O motor do Dominar 400 de 373cc é derivado do mesmo projeto que o KTM Duke 390 (399cc). Essa relação beneficia o dono: 1) Peças de performance KTM são relativamente mais disponíveis em lojas especializadas de SP, RJ, BH. 2) Correia de distribuição, sistema de arrefecimento e componentes de transmissão têm alto grau de compatibilidade — verifique especificamente antes de usar. 3) Escapamentos aftermarket para Duke 390 frequentemente têm versão para Dominar 400. 4) Tunagem de ECU: preparadores que trabalham com KTM geralmente têm know-how para o Dominar. Comunidade online: grupo Facebook "Bajaj Dominar Brasil" tem mapeamento de quais peças são de fato intercambiáveis.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 de 120 elos: kit de qualidade é investimento essencial nessa moto',
    body: 'O Dominar 400 usa corrente 520 com 120 elos — especificação oficial da fábrica. Com 35 Nm de torque, o motor exige uma corrente de qualidade para durabilidade adequada. Use DID 520VX3 (X-ring) ou RK 520RXW (X-ring) — ambas com graxa interna vedada, máxima durabilidade. Custo do kit corrente + coroa + pinhão para Dominar: R$ 400–R$ 700 dependendo da marca. Não economize aqui — corrente de qualidade inferior em motor de 373cc dura 30–40% menos. Tensão correta: afrouxamento de 25–35 mm na parte inferior com moto no cavalete central. Lubrife a cada 500 km com spray de corrente de qualidade (Motul C2, DID O/X-ring chain lube).',
  },
  {
    severity: 'OK',
    title: 'ABS do Dominar 400: benefício e ponto de atenção — nunca descole os sensores',
    body: 'O Dominar 400 tem ABS de fábrica — grande vantagem de segurança. Ponto de atenção: o sistema ABS usa sensores de velocidade nas rodas (anel fônico + sensor magnético). Esses sensores são vulneráveis a: 1) Sujeira e ferrugem no anel fônico — limpe a cada lavagem da moto. 2) Desalinhamento após batidas nos freios ou substituição de pneus em borracharia despreparada — o sensor deve ficar a ~1 mm do anel fônico. 3) Conector do sensor solto por vibração — aplique spray dielétrico anualmente. Luz do ABS acesa de forma contínua = sistema desativado. Não ignore: verifique o sensor e o anel fônico antes de concluir que é a unidade eletrônica (módulo ABS é caro — R$ 800–R$ 2.000).',
  },
]

const DOMINAR400_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Sensor de posição de neutro falho: motor desliga em movimento — risco real de acidente',
    body: 'Um dos problemas elétricos mais perigosos reportados no Dominar 400 no Brasil: o sensor de posição de neutro (neutral position sensor) falha e envia sinal falso de "neutro" com a moto em movimento, desligando o motor abruptamente em velocidade. Isso acontece especialmente após chuva ou lavagem. Sintoma: motor corta do nada em marcha, volta a funcionar após alguns segundos parado. O sensor fica na tampa da embreagem, exposto. Solução imediata: seque os conectores elétricos da tampa da embreagem com ar comprimido e aplique spray dielétrico. Se persistir: substitua o sensor (peça acessível no ML). Não ignore esse problema — corte de motor em velocidade é risco de acidente.',
  },
  {
    severity: 'WARN',
    title: 'Vibração e barulho após desmontagem do motor: risco de torque incorreto',
    body: 'Casos reportados de vibração e barulho novos após desmontagem do motor para correção de vazamento de junta. Causa: parafusos do motor não reapertos na sequência e torque corretos. O Dominar 400, sendo DOHC, tem muitos parafusos de cabeçote com sequência de aperto crítica. Ao fazer qualquer serviço que envolva abertura do motor: 1) Sempre consulte o manual de serviço oficial (ManualsLib: "Bajaj Dominar 400 service manual") para a sequência e torque exatos. 2) Use torquímetro — não "no braço". 3) Para serviços de motor nessa moto: prefira mecânicos com experiência em motores DOHC de performance. Um serviço mal feito custa 3× mais para corrigir.',
  },
  {
    severity: 'WARN',
    title: 'Entrega de peças de reposição no Brasil: planeje com antecedência',
    body: 'O Dominar 400 é o modelo mais sofisticado da Bajaj no Brasil e tem a menor rede de suporte de peças. Problemas com prazo de entrega de peças de reposição foram amplamente reportados no Reclame Aqui Brasil. Estratégia de manutenção: 1) Nunca espere a peça falhar para encomendar — estoque peças de desgaste (filtro de óleo, filtro de ar, correia de distribuição). 2) Para peças de importação da Índia: planeje 3–6 semanas de espera. 3) Importe pelo AliExpress para peças não-críticas — menores preços mas qualidade variável. 4) A comunidade online "Dominar Club Brasil" e grupos de Facebook têm mapas de importadores confiáveis e qual peça de KTM 390 funciona na Dominar.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito urbano pesado: limites do motor liquid-cooled',
    body: 'O Dominar 400, apesar de refrigerado a líquido, pode apresentar temperaturas altas em trânsito urbano pesado (SP, RJ) com calor intenso. O sistema de arrefecimento foi dimensionado para velocidade mínima de circulação de ar. Em paradas longas, a ventoinha deve entrar automaticamente — se não entrar ao chegar em ~105°C, verifique o fusível da ventoinha e o conector do termostato. Temperatura normal de operação: até 100°C. Ação preventiva: verifique o nível do fluido de arrefecimento mensalmente, troque o fluido a cada 2 anos, e certifique-se de que as aletas do radiador estejam limpas (insetos e barro bloqueiam o fluxo de ar).',
  },
]

const DOMINAR400_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W30 API SJ: especificação diferente das outras Bajaj — não use 20W50',
    body: 'O Dominar 400 com motor DOHC de alta performance usa 10W30 API SJ ou superior — DIFERENTE das Pulsars que usam 20W50. O 10W30 tem menor viscosidade para lubrificar mais rapidamente os componentes do DOHC em partidas a frio. Usar 20W50 no Dominar causará lubrificação inadequada nos primeiros segundos de cada partida. Capacidade: 1,7L com troca de filtro. Intervalo: 5.000 km (primeira troca: 1.000 km). Use semissintético ou sintético para maior proteção. Marcas disponíveis no Brasil em 10W30: Motul 5100 10W30, Castrol Power 1 10W30, Shell Advance 10W30. Confirme sempre a certificação JASO MA/MA2 — embreagem úmida também no Dominar.',
  },
  {
    severity: 'OK',
    title: 'Revisão de 5.000 km do Dominar: o checklist de itens críticos',
    body: 'O Dominar 400 tem revisões mais complexas que as Pulsars simples. Checklist a cada 5.000 km: ✓ Troca de óleo (10W30 JASO MA, 1,7L) + filtro a cada 6.000 km. ✓ Nível do fluido de arrefecimento (reservatório de expansão). ✓ Tensão e lubrificação da corrente 520/120 elos. ✓ Verificação dos freios ABS (pastilhas dianteiras e traseiras, estado dos discos). ✓ Calibragem dos pneus (veja na etiqueta do chassi). ✓ Limpeza dos filtros do bico injetor (aditivo limpa-injetor no tanque a cada 10.000 km). ✓ Verificação do nível do fluido de freio (reservatório guidão e pinça traseira). ✓ Inspeção visual das juntas do motor por vazamento de óleo.',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio DOT 4 + arrefecimento OAT: dois fluidos que a maioria esquece trocar',
    body: 'O Dominar 400 tem dois fluidos frequentemente esquecidos: 1) Fluido de freio DOT 4 (dianteiro e traseiro): troque a cada 2 anos. Fluido velho com umidade absorvida pode ferver em frenagens longas — especialmente problemático com ABS. 2) Fluido de arrefecimento (anticongelante OAT 50%/50% água destilada): troque a cada 2 anos. Fluido degradado perde eficiência de refrigeração e protege menos o alumínio contra corrosão. Volume do sistema de arrefecimento: ~1,0–1,2L. Processo de purga do ar do sistema de arrefecimento após a troca: ligue o motor com tampa do reservatório aberta, aguarde a ventoinha entrar, complete o nível e feche. Não feche o reservatório com o motor quente — vapor sob pressão pode escalar e causar queimaduras.',
  },
]

// ─── Avenger 220 — dicas exclusivas ─────────────────────────────────────────

const AVENGER220_MACETES: TipInput[] = [
  ...MACETES_DTSI_AR,
  {
    severity: 'OK',
    title: 'Cruiser com alma de Pulsar: as vantagens e armadilhas da posição baixa',
    body: 'A Avenger 220 tem estilo cruiser americano (guidão alto, posição reclinada, bagagem baixa) mas motor DTS-i de Pulsar. Vantagens: conforto em viagens longas, Centro de gravidade baixo, facilidade para pé no chão. Armadilhas: 1) Altura do escapamento muito baixa — cuidado com cordões de sarjeta altos e rampas íngremes que podem encostar o escapamento e machucar o piloto. 2) Manuseio em curvas fechadas: o chassi cruiser tem geometria mais travada que as Pulsars — respeite os limites de inclinação. 3) A posição reclinada das pernas facilita o cansaço em trânsito lento. 4) Bagagem de rio/chuva pode entrar no farol traseiro rebaixado — instale vedação adicional ou bolsa de banco com boa vedação.',
  },
  {
    severity: 'WARN',
    title: 'Pneu traseiro 140/70-17: medida menos comum que custa mais — busque com antecedência',
    body: 'A Avenger 220 usa pneu traseiro 140/70-17 — medida menos popular que as usadas nas Pulsars (100/90 e 120/80). Em cidades menores, pode ser difícil encontrar esse pneu de pronto na borracharia. Marcas disponíveis no Brasil: Pirelli MT15, Michelin Pilot Street, Metzeler ME22, MRF Revz — pesquise disponibilidade online antes de precisar. Dica: quando trocar o pneu traseiro, compre o dianteiro 100/90-17 ao mesmo tempo — e reserve um sobressalente de traseiro para situações de emergência em viagens. Pressão recomendada: 28 PSI dianteiro, 32–33 PSI traseiro (33 PSI com garupa).',
  },
  {
    severity: 'OK',
    title: 'Viagem de longa distância com Avenger: ajustes antes de sair',
    body: 'A Avenger 220 é uma das Bajaj mais adequadas para viagens de estrada, mas exige preparação. Lista pré-viagem: 1) Calibragem dos pneus (28/32 PSI a frio). 2) Tensão da corrente (20–30 mm de afrouxamento). 3) Nível de óleo e lubrificantes. 4) Freios: folga correta no cabo dianteiro (alavanca percorre até 1/3 do curso antes de resistir) e pedal traseiro. 5) Lâmpadas (levante a moto, verifique freio, pisca, farol alto/baixo). 6) Correia da transmissão ou corrente: inspecione rachaduras. 7) Carregue 1 litro de óleo, 1 par de velas, 1 fusível extra (15A), lubrificante de corrente e kit de remendo de câmara — os básicos que podem salvar uma viagem.',
  },
]

const AVENGER220_PROBLEMAS: TipInput[] = [
  ...PROBLEMAS_DTSI_AR,
  {
    severity: 'WARN',
    title: 'Escapamento muito baixo: oxidação e amassados em buracos e meios-fios',
    body: 'O escapamento da Avenger 220 fica próximo ao chão pela geometria cruiser — mais vulnerável a amassados em buracos profundos, meios-fios altos e lombadas agressivas. Com o tempo, o escapamento original também oxida mais rápido que o das Pulsars, pois fica mais exposto à água da pista e respingos de poças. Proteção: aplique spray anticorrosivo de alta temperatura (Rustoleum High Heat, CRC Zinc Coat) nas partes de aço do escapamento que não são cromadas. Amassados leves: não comprometem o fluxo dos gases e são apenas estéticos. Amassados severos que estrangulam o tubo: levam a perda de potência perceptível — exige retificação ou substituição da seção amassada.',
  },
  {
    severity: 'WARN',
    title: 'Guidão alto amplia força do vento: dificulta viagens acima de 100 km/h',
    body: 'O guidão alto e a posição ereta da Avenger 220 expõem o piloto à força do vento em velocidades acima de 100 km/h. Em rodovias, isso causa fadiga mais rápida que em motos com carenagem. Mitigação: 1) Jaqueta aerodinâmica (não jaqueta larga que inflaCOM o vento). 2) Velocidade de cruzeiro ideal na Avenger: 80–90 km/h (conforto máximo + consumo ótimo). 3) Para quem faz muitas rodovias: bolha (windshield) aftermarket de acrílico para Avenger 220 — reduz a pressão do vento significativamente. Pesquise "bolha windshield Bajaj Avenger 220" no ML — modelos específicos disponíveis. 4) Mãos embaixo do guidão (como se fosse apertar de baixo) é ergonomia mais natural para longas distâncias na posição cruiser.',
  },
]

const AVENGER220_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma preventivo Avenger 220: revisões por quilometragem',
    body: '1.000 km — Primeira revisão: troca de óleo 1,15L SAE 20W50 JASO MA + filtro de tela, aperto geral de todos os parafusos, ajuste da corrente 520, verificação das aletas do oil-cooler. | 5.000 km — Troca de óleo, filtro de ar (espuma), ajuste dos freios (disco dianteiro + tambor traseiro), calibragem dos pneus (28/32 PSI), limpeza do radiador de óleo com ar comprimido. | 10.000 km — Óleo + 2 velas NGK CPR8EA-9 (DTS-i — troque o par), regulagem de válvulas (IN 0,05 mm / EX 0,10 mm com motor frio), filtro de ar novo, kit corrente 520 se necessário. | 20.000 km — Tudo do 10.000 + kit corrente completo (corrente + coroa + pinhão), troca fluido de freio DOT 4, inspeção das lonas do tambor traseiro. | A cada 2 anos — DOT 4 e lubrificação de todos os cabos.',
  },
  {
    severity: 'OK',
    title: 'Óleo: 1,15L (refill) ou 1,3L (overhaul) SAE 20W50 JASO MA — oil-cooled exige semissintético',
    body: 'A Avenger 220 tem motor DTS-i oil-cooled (220cc) — o óleo faz trabalho adicional de refrigeração circulando pelo radiador de óleo frontal. Use SAE 20W50 JASO MA semissintético obrigatoriamente. Capacidade: 1,15L troca simples, 1,3L overhaul completo com limpeza do filtro de tela interno. Versões BS-VI (mais recentes): Bajaj recomenda 10W50 sintético — confirme no manual do seu ano específico. Intervalo: 3.500 km no trânsito urbano brasileiro. Verifique o nível semanalmente pelo visor lateral com moto VERTICAL (não no cavalete lateral — dá leitura errada) e motor frio.',
  },
  {
    severity: 'OK',
    title: '2 velas NGK CPR8EA-9 (DTS-i): gap 0,7–0,8 mm — troque o par a cada 10.000 km',
    body: 'A Avenger 220 usa motor DTS-i com DUAS velas. Código NGK: CPR8EA-9. Troque as 2 sempre juntas. Gap: 0,7–0,8 mm. Torque: 10–12 N·m. Custo: R$ 25–R$ 45 cada no ML. Intervalo: 10.000 km. Nas versões BS-VI mais recentes, verifique no manual se o código mudou. Leia a cor das velas velhas: marrom-cinza = ok, preta = mistura rica (carburador entupido com etanol), branca = mistura pobre (risco de superaquecimento). Na Avenger de estilo cruiser, o acesso às velas é mais direto que nas versões carenadas — é um dos serviços mais fáceis de fazer em casa.',
  },
  {
    severity: 'WARN',
    title: 'Válvulas: IN 0,05 mm / EX 0,10 mm — a cada 10.000 km com motor frio',
    body: 'Folgas de válvula da Avenger 220: admissão 0,05 mm, escape 0,10 mm. Motor completamente frio (mínimo 4h parado). Pistão no PMS da compressão. Na Avenger, o acesso ao cabeçote é relativamente fácil — estilo cruiser sem carenagem. Motor com válvulas desreguladas em moto de estrada é especialmente perigoso: válvulas muito fechadas perdem compressão em velocidade de cruzeiro (motor "sufoca" acima de 100 km/h). Custo do serviço: R$ 60–R$ 120 de mão de obra. Em motos acima de 40.000 km: reduza o intervalo de verificação para 8.000 km.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520: lubrife antes de cada viagem longa e a cada 400 km em rodovia',
    body: 'A Avenger 220 em uso de estrada percorre longas distâncias entre lubrificações — corrente seca em velocidade alta desgasta 3× mais rápido que em cidade. Regra de viagem: lubrifique a corrente antes de partir e a cada 400 km durante a viagem (não espere os 500 km do uso urbano). Corrente 520 para Avenger: DID 520VX3 (X-ring) ou RK 520KRO (O-ring) — comprimento ~108–110 elos (verifique na corrente velha). Tensão: afrouxamento de 20–30 mm. Kit corrente + coroas: R$ 280–R$ 450. Em viagem: leve spray de corrente na bolsa — lubrifique ao parar para abastecer.',
  },
  {
    severity: 'OK',
    title: 'Freio traseiro a tambor + disco dianteiro: manutenção do sistema misto',
    body: 'A Avenger 220 tem disco dianteiro + tambor traseiro. 1) Disco dianteiro — pastilhas: verifique espessura a cada 5.000 km (substituir com <2 mm). Fluido DOT 4: troque a cada 2 anos. 2) Tambor traseiro — lonas: ajuste o cabo quando a alavanca percorrer mais de 1/3 do curso. Inspecione as lonas pela janela de inspeção do tambor a cada 10.000 km (mínimo 2 mm de espessura). 3) Característica do cruiser: o peso maior da Avenger vs. Pulsars leves exige mais frenagem na traseira em descidas longas — não use só o freio dianteiro. Lonas para Avenger 220: diâmetro 130 mm — R$ 20–R$ 50 o par. Em viagens longas: descidas prolongadas aquecem o tambor e reduzem a eficiência — alterne com o dianteiro.',
  },
]

// ─── Blocos por modelo ──────────────────────────────────────────────────────

const bajajModels: ModelBlock[] = [
  {
    modelName: 'PULSAR 135 LS',
    yearFrom: 2009,
    yearTo: 2016,
    MACETES:    PULSAR135_MACETES,
    PROBLEMAS:  PULSAR135_PROBLEMAS,
    MANUTENCAO: PULSAR135_MANUTENCAO,
  },
  {
    modelName: 'PULSAR 150',
    yearFrom: 2006,
    yearTo: null,
    MACETES:    PULSAR150_MACETES,
    PROBLEMAS:  PULSAR150_PROBLEMAS,
    MANUTENCAO: PULSAR150_MANUTENCAO,
  },
  {
    modelName: 'PULSAR 180',
    yearFrom: 2002,
    yearTo: null,
    MACETES:    PULSAR180_MACETES,
    PROBLEMAS:  PULSAR180_PROBLEMAS,
    MANUTENCAO: PULSAR180_MANUTENCAO,
  },
  {
    modelName: 'PULSAR 200 NS',
    yearFrom: 2012,
    yearTo: null,
    MACETES:    PULSAR200NS_MACETES,
    PROBLEMAS:  PULSAR200NS_PROBLEMAS,
    MANUTENCAO: PULSAR200NS_MANUTENCAO,
  },
  {
    modelName: 'PULSAR 220F',
    yearFrom: 2009,
    yearTo: null,
    MACETES:    PULSAR220F_MACETES,
    PROBLEMAS:  PULSAR220F_PROBLEMAS,
    MANUTENCAO: PULSAR220F_MANUTENCAO,
  },
  {
    modelName: 'PULSAR RS 200',
    yearFrom: 2016,
    yearTo: null,
    MACETES:    PULSARRS200_MACETES,
    PROBLEMAS:  PULSARRS200_PROBLEMAS,
    MANUTENCAO: PULSARRS200_MANUTENCAO,
  },
  {
    modelName: 'BOXER 150',
    yearFrom: 2004,
    yearTo: null,
    MACETES:    BOXER150_MACETES,
    PROBLEMAS:  BOXER150_PROBLEMAS,
    MANUTENCAO: BOXER150_MANUTENCAO,
  },
  {
    modelName: 'DOMINAR 400',
    yearFrom: 2018,
    yearTo: null,
    MACETES:    DOMINAR400_MACETES,
    PROBLEMAS:  DOMINAR400_PROBLEMAS,
    MANUTENCAO: DOMINAR400_MANUTENCAO,
  },
  {
    modelName: 'AVENGER 220',
    yearFrom: 2013,
    yearTo: null,
    MACETES:    AVENGER220_MACETES,
    PROBLEMAS:  AVENGER220_PROBLEMAS,
    MANUTENCAO: AVENGER220_MANUTENCAO,
  },
]

// ─── Calibragem de pneus ────────────────────────────────────────────────────

const bajajTirePressures: TirePressureInput[] = [
  {
    modelName: 'PULSAR 135 LS',
    yearFrom: 2009,
    yearTo: 2016,
    tireSize: 'Dianteiro 80/100-17 | Traseiro 100/90-17',
    frontPsi: 26,
    rearPsi: 28,
    frontPsiLoad: 28,
    rearPsiLoad: 32,
    notes: 'Aro 17" em ambas as rodas. Calibre sempre a frio com moto em posição vertical (não no cavalete lateral). Com garupa: traseiro 32 PSI. Pneus disponíveis no Brasil: Pirelli Sport Demon, MRF Zapper (importado), Metzeler Sportec. A medida 80/100-17 dianteiro é comum — disponível em borracharias de moto na maioria das cidades.',
  },
  {
    modelName: 'PULSAR 150',
    yearFrom: 2006,
    yearTo: null,
    tireSize: 'Dianteiro 80/100-17 | Traseiro 100/90-17',
    frontPsi: 26,
    rearPsi: 30,
    frontPsiLoad: 28,
    rearPsiLoad: 34,
    notes: 'Calibre sempre a frio. Com garupa ou carga de entrega: dianteiro 28 PSI, traseiro 34 PSI. Em uso de delivery com carga pesada: traseiro 36 PSI máximo. Pneus disponíveis no Brasil: Pirelli Sport Demon, Michelin Pilot Street, MRF Revz. Versão NS/S pode usar pneus mais largos — confirme na etiqueta do chassi.',
  },
  {
    modelName: 'PULSAR 180',
    yearFrom: 2002,
    yearTo: null,
    tireSize: 'Dianteiro 90/90-17 | Traseiro 120/80-17',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    notes: 'Aro 17". Calibre a frio. Com garupa: dianteiro 30 PSI, traseiro 36 PSI. O traseiro 120/80-17 é mais largo que o das Pulsars 135/150 — confirme a medida na borracharia. Disponíveis: Pirelli Sport Demon 120/80-17, Michelin Pilot Street 120/80-17, Metzeler Sportec M5.',
  },
  {
    modelName: 'PULSAR 200 NS',
    yearFrom: 2012,
    yearTo: null,
    tireSize: 'Dianteiro 100/80-17 | Traseiro 130/70-17',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    notes: 'Aro 17" em ambas. Mesmo tamanho de pneu que o KTM Duke 200 — facilita encontrar opções. Dianteiro 100/80-17: Pirelli Diablo Rosso II, Michelin Pilot Power 2CT disponíveis. Traseiro 130/70-17: também disponível em lojas especializadas. Com garupa: 30/36 PSI. Sempre calibre a frio antes de sair.',
  },
  {
    modelName: 'PULSAR 220F',
    yearFrom: 2009,
    yearTo: null,
    tireSize: 'Dianteiro 90/90-17 | Traseiro 120/80-17',
    frontPsi: 28,
    rearPsi: 30,
    frontPsiLoad: 30,
    rearPsiLoad: 34,
    notes: 'Aro 17". O pneu traseiro 120/80-17 é mais alto que o 120/70 — confirme a medida na borracharia para não instalar perfil errado. Calibre a frio. Com garupa: 30/34 PSI. A carenagem da 220F dificulta visualizar o pneu traseiro — inspecione visualmente o estado dos pneus com maior atenção na revisão mensal.',
  },
  {
    modelName: 'PULSAR RS 200',
    yearFrom: 2016,
    yearTo: null,
    tireSize: 'Dianteiro 100/80-17 | Traseiro 130/70-17',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 31,
    rearPsiLoad: 36,
    notes: 'Mesma medida de pneu da NS200 (100/80-17 e 130/70-17). Aro 17" esportivo. Calibre sempre a frio antes de cada uso esportivo — pressão fora do especificado afeta significativamente a performance em curvas. Com garupa: 31/36 PSI. Para uso misto: mantenha a especificação de fábrica. Para uso exclusivo de pista: consulte o fabricante do pneu para pressões de circuito.',
  },
  {
    modelName: 'BOXER 150',
    yearFrom: 2004,
    yearTo: null,
    tireSize: 'Dianteiro 2.75-18 | Traseiro 3.00-18',
    frontPsi: 30,
    rearPsi: 33,
    frontPsiLoad: 32,
    rearPsiLoad: 36,
    notes: 'Aro 18" com pneus de perfil convencional (medida em polegadas) — típico de motos utilitárias. Com carga de entrega no baú: traseiro 36 PSI. Pneus disponíveis no Brasil em aro 18 polegadas estilo utilitário: Pirelli Sport Demon 2.75-18, MRF Nylogrip (importado), Vee Rubber. Cuidado com sobrepressão: acima de 38 PSI no traseiro com carga reduz a área de contato e piora a estabilidade.',
  },
  {
    modelName: 'DOMINAR 400',
    yearFrom: 2018,
    yearTo: null,
    tireSize: 'Dianteiro 110/70-17 | Traseiro 150/60-17',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 32,
    rearPsiLoad: 36,
    notes: 'Aro 17" com pneus esportivos de perfil baixo. O traseiro 150/60-17 é mais largo que as Pulsars. Com garupa ou carga: dianteiro 32 PSI, traseiro 36 PSI. Pneus disponíveis: Pirelli Diablo Rosso III ou IV (130/70 e 150/60), Michelin Power RS, MRF Revz C — confirme compatibilidade com aro 17. ABS: a pressão correta dos pneus é crítica para o funcionamento adequado do sistema ABS — nunca opere com pneus abaixo de 25 PSI.',
  },
  {
    modelName: 'AVENGER 220',
    yearFrom: 2013,
    yearTo: null,
    tireSize: 'Dianteiro 100/90-17 | Traseiro 140/70-17',
    frontPsi: 26,
    rearPsi: 32,
    frontPsiLoad: 28,
    rearPsiLoad: 33,
    notes: 'Aro 17". O dianteiro 100/90-17 é medida comum. O traseiro 140/70-17 é menos usual — ligue para a borracharia antes de se deslocar. Com garupa: dianteiro 28 PSI, traseiro 33 PSI. Para viagens longas: pressão de rodovias (moto mais responsiva = dianteiro 28 PSI, traseiro 33 PSI). Em cidade: dianteiro 26 PSI, traseiro 32 PSI para maior conforto.',
  },
]

// ─── Cronogramas de Manutenção por Modelo ────────────────────────────────────

const bajajMaintenanceItems: MaintenanceItemInput[] = [

  // ── PULSAR 135 LS (DTS-i, ar refrigerado, corrente 428) ────────────────────
  { modelName: 'PULSAR 135 LS', yearFrom: 2009, yearTo: null, order: 0,
    component: 'Óleo do motor (20W50 JASO MA)', intervalKm: 3000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 1,0 L (com filtro: 1,1 L). Use 20W50 mineral ou semissintético com certificação JASO MA — obrigatório para embreagem úmida. Troque o filtro de óleo a cada 2 trocas.' },
  { modelName: 'PULSAR 135 LS', yearFrom: 2009, yearTo: null, order: 1,
    component: 'Velas NGK CPR8EA-9 — par DTS-i', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: 'DTS-i = 2 velas por cilindro. Troque sempre o par junto — uma vela velha compensa a nova e o problema some. Gap: 0,7–0,8 mm. Não use velas avulsas ou de outras marcas sem confirmar equivalência.' },
  { modelName: 'PULSAR 135 LS', yearFrom: 2009, yearTo: null, order: 2,
    component: 'Corrente 428 — lubrificação', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'Lubrificação a cada 500 km (ou 200 km em chuva). Tensão correta: 10–15 mm de folga no ponto mais tenso. Kit corrente + coroas a cada 20.000–25.000 km.' },
  { modelName: 'PULSAR 135 LS', yearFrom: 2009, yearTo: null, order: 3,
    component: 'Filtro de ar (espuma)', intervalKm: 5000, intervalMonths: 6, priority: 'MEDIUM',
    notes: 'Lave com detergente neutro, seque à sombra, aplique óleo de filtro e recoloque. Em rodovias ou zonas de pó, inspecione a cada 2.500 km.' },
  { modelName: 'PULSAR 135 LS', yearFrom: 2009, yearTo: null, order: 4,
    component: 'Folga de válvulas (IN 0,05 / EX 0,10 mm)', intervalKm: 10000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Verifique e ajuste com motor frio. Folga entrada: 0,05 mm. Folga saída: 0,05–0,10 mm. Válvulas apertadas não produzem som mas danificam o assento — não negligencie.' },
  { modelName: 'PULSAR 135 LS', yearFrom: 2009, yearTo: null, order: 5,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'LOW',
    notes: 'Troque a cada 2 anos mesmo sem uso intenso — o DOT 4 absorve umidade e perde ponto de ebulição. Inspecione mangueiras e pastilhas junto. Freio traseiro a tambor: ajuste o cabo a cada 5.000 km.' },

  // ── PULSAR 150 (DTS-i, ar refrigerado, corrente 428) ───────────────────────
  { modelName: 'PULSAR 150', yearFrom: 2003, yearTo: null, order: 0,
    component: 'Óleo do motor (20W50 JASO MA)', intervalKm: 3000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 1,0 L (com filtro: 1,1 L). Use 20W50 JASO MA. Em uso normal (não entregador): pode estender para 4.000 km. Sempre verifique o nível antes de sair com a moto fria no cavalete lateral.' },
  { modelName: 'PULSAR 150', yearFrom: 2003, yearTo: null, order: 1,
    component: 'Velas NGK CPR8EA-9 — par DTS-i', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: '2 velas por cilindro (DTS-i). Gap padrão: 0,7–0,8 mm. Troque o par completo — vela velha numa ponta reduz potência e aumenta consumo mesmo com a outra nova. Versão FI: zere o TPS após qualquer trabalho no sistema de admissão.' },
  { modelName: 'PULSAR 150', yearFrom: 2003, yearTo: null, order: 2,
    component: 'Corrente 428 — lubrificação e tensão', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'Lubrificação a cada 500 km. Folga recomendada: 10–15 mm. Kit (corrente + coroas) a cada 20.000 km. Sempre verifique o alinhamento da roda traseira ao ajustar a corrente.' },
  { modelName: 'PULSAR 150', yearFrom: 2003, yearTo: null, order: 3,
    component: 'Filtro de ar (espuma)', intervalKm: 5000, intervalMonths: 6, priority: 'MEDIUM',
    notes: 'Lave com detergente, seque à sombra e aplique óleo de filtro. Versão FI: verifique também a mangueira de conexão ao corpo de injeção — ressecamento gera trinca e entrada de ar falsa.' },
  { modelName: 'PULSAR 150', yearFrom: 2003, yearTo: null, order: 4,
    component: 'Folga de válvulas (IN 0,05 / EX 0,05–0,10 mm)', intervalKm: 10000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Motor frio. Entrada (IN): 0,05 mm. Saída (EX): 0,05–0,10 mm. Válvula de escape mais sujeita a desgaste — priorize a verificação antes de qualquer viagem longa.' },
  { modelName: 'PULSAR 150', yearFrom: 2003, yearTo: null, order: 5,
    component: 'Freio traseiro a tambor — ajuste e inspeção', intervalKm: 5000, intervalMonths: null, priority: 'LOW',
    notes: 'Ajuste o cabo para 20–30 mm de jogo no pedal. Inspecione as lonas — espessura mínima: 2 mm. Lonas gastas produzem ruído metálico ao frear. Tambor gasto exige substituição (não retífica em motos leves).' },

  // ── PULSAR 180 / 180F (DTS-i, ar refrigerado, corrente 520) ────────────────
  { modelName: 'PULSAR 180', yearFrom: 2001, yearTo: null, order: 0,
    component: 'Óleo do motor (20W50 JASO MA)', intervalKm: 3500, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 1,1 L (com filtro: 1,2 L). Use 20W50 semissintético com JASO MA — o motor 180cc opera em rotações mais altas e agradece a proteção extra. Em uso de entrega ou urbano intenso: mantenha 3.500 km. Em rodovia: pode ir até 5.000 km.' },
  { modelName: 'PULSAR 180', yearFrom: 2001, yearTo: null, order: 1,
    component: 'Velas NGK CPR8EA-9 — par DTS-i', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: '2 velas por cilindro (DTS-i). Gap: 0,7–0,8 mm. Troque sempre o par — uma falha compensa a outra e esconde o problema. Reaperto: 12–15 Nm com torquímetro (rosca M10×1,0, não aperte a seco).' },
  { modelName: 'PULSAR 180', yearFrom: 2001, yearTo: null, order: 2,
    component: 'Corrente 520 — lubrificação e tensão', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'Lubrificação a cada 500 km (200 km em chuva). Folga: 10–15 mm no ponto de menor jogo. Kit a cada 20.000 km. A 180F tem semi-carenagem — acesse a corrente pelo lado direito da saia plástica.' },
  { modelName: 'PULSAR 180', yearFrom: 2001, yearTo: null, order: 3,
    component: 'Filtro de ar (espuma)', intervalKm: 5000, intervalMonths: 6, priority: 'MEDIUM',
    notes: 'Lave com detergente neutro, seque à sombra, aplique óleo de filtro levemente. Caixas de filtro da 180 retêm umidade — verifique se há acúmulo de água no fundo antes de reinstalar.' },
  { modelName: 'PULSAR 180', yearFrom: 2001, yearTo: null, order: 4,
    component: 'Folga de válvulas (IN 0,05 / EX 0,10 mm)', intervalKm: 10000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Motor frio. IN: 0,05 mm. EX: 0,10 mm (a 180 tem folga de escape maior que a 150 — não confunda as especificações entre modelos). Ruído de "tique-taque" em aceleração = válvulas folgadas.' },
  { modelName: 'PULSAR 180', yearFrom: 2001, yearTo: null, order: 5,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'LOW',
    notes: 'Troque a cada 2 anos. Inspecione pastilhas dianteiras (mínimo: 2 mm). Freio traseiro a tambor: ajuste do cabo a cada 5.000 km, lonas mínimo 2 mm.' },

  // ── PULSAR 200 NS (Triple Spark, líquido refrigerado, corrente 520) ─────────
  { modelName: 'PULSAR 200 NS', yearFrom: 2012, yearTo: null, order: 0,
    component: 'Óleo do motor (20W50 JASO MA)', intervalKm: 5000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 1,5 L (com filtro). Use 20W50 semissintético JASO MA. Intervalo de 5.000 km em uso normal. Troque também o filtro de óleo a cada troca. Verifique o nível semanalmente — o motor 200cc de alto rendimento consome mais em uso intenso.' },
  { modelName: 'PULSAR 200 NS', yearFrom: 2012, yearTo: null, order: 1,
    component: 'Fluido de arrefecimento (OAT)', intervalKm: null, intervalMonths: 24, priority: 'CRITICAL',
    notes: 'Troque a cada 2 anos com anticongelante OAT diluído 50/50 em água destilada. Volume: ~0,7–0,8 L. Drene pelo parafuso inferior do radiador, encha com motor quente e tampa aberta para purgar o ar. Verifique o nível mensalmente no reservatório lateral.' },
  { modelName: 'PULSAR 200 NS', yearFrom: 2012, yearTo: null, order: 2,
    component: 'Velas Triple Spark (3 eletrodos) — verificação', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor Triple Spark: 3 eletrodos de ignição por cilindro. Verifique gap a cada 10.000 km (0,7–0,8 mm). Troque o conjunto a cada 20.000 km. Use somente velas com especificação Bajaj — não improvise.' },
  { modelName: 'PULSAR 200 NS', yearFrom: 2012, yearTo: null, order: 3,
    component: 'Corrente 520 O-ring/X-ring — lubrificação', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'Lubrificação a cada 500 km. Folga: 10–15 mm. A NS200 usa corrente O-ring ou X-ring — não use graxa comum (destrói o anel). Use spray específico para corrente O-ring. Kit a cada 20.000 km.' },
  { modelName: 'PULSAR 200 NS', yearFrom: 2012, yearTo: null, order: 4,
    component: 'Pastilhas de freio (disco D+T)', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione dianteiro e traseiro a cada 5.000 km. Espessura mínima: 2 mm (dianteira) e 2 mm (traseira). A NS200 tem disco sólido dianteiro e disco traseiro — verifique desgaste lateral do disco (limite: 1 mm abaixo do original).' },
  { modelName: 'PULSAR 200 NS', yearFrom: 2012, yearTo: null, order: 5,
    component: 'Folga de válvulas (IN 0,04–0,06 / EX 0,07–0,09 mm)', intervalKm: 10000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Folgas diferentes da plataforma DTS-i ar. Motor frio. IN: 0,04–0,06 mm. EX: 0,07–0,09 mm. Cabeçote de maior performance — válvulas mais rígidas exigem conferência mais frequente em uso esportivo.' },
  { modelName: 'PULSAR 200 NS', yearFrom: 2012, yearTo: null, order: 6,
    component: 'Filtro de ar (espuma)', intervalKm: 5000, intervalMonths: 6, priority: 'MEDIUM',
    notes: 'Lave ou substitua a cada 5.000 km. Em rodovias com pó: inspecione a cada 2.500 km. O corpo de injeção (FI) é sensível a sujeira — filtro limpo evita consumo de injetores.' },
  { modelName: 'PULSAR 200 NS', yearFrom: 2012, yearTo: null, order: 7,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'LOW',
    notes: 'Troque a cada 2 anos. O DOT 4 absorve umidade e perde ponto de ebulição — freio esponjoso ou mole é sinal de troca. Utilize somente DOT 4 (NÃO DOT 5 silicone — incompatível com o sistema).' },

  // ── PULSAR 220F (DTS-i, óleo refrigerado, corrente 520) ────────────────────
  { modelName: 'PULSAR 220F', yearFrom: 2006, yearTo: null, order: 0,
    component: 'Óleo do motor 20W50 semissintético (JASO MA)', intervalKm: 4000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume total: 1,45 L / refill: 1,2 L. Use semissintético 20W50 JASO MA obrigatoriamente — o radiador de óleo exige melhor proteção térmica. Troque também o filtro a cada 2 trocas. O radiador de óleo aumenta o volume circulante: não confunda com refrigeração a líquido.' },
  { modelName: 'PULSAR 220F', yearFrom: 2006, yearTo: null, order: 1,
    component: 'Velas NGK CR8EGP (platina) — par DTS-i', intervalKm: 15000, intervalMonths: null, priority: 'HIGH',
    notes: 'ATENÇÃO: a 220F usa NGK CR8EGP (platina), código DIFERENTE das outras Pulsars (CPR8EA-9). 2 velas por cilindro (DTS-i). Intervalo maior: 15.000 km graças ao eletrodo de platina. Não substitua por velas comuns — aumenta consumo e reduz potência. Gap: 0,6–0,7 mm.' },
  { modelName: 'PULSAR 220F', yearFrom: 2006, yearTo: null, order: 2,
    component: 'Radiador de óleo — limpeza das aletas', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'Limpe as aletas do radiador de óleo com ar comprimido a cada 5.000 km. Acúmulo de insetos e sujeira reduz a eficiência de arrefecimento e aumenta a temperatura do óleo. A carenagem full da 220F protege o radiador, mas também retém calor — atenção no trânsito lento.' },
  { modelName: 'PULSAR 220F', yearFrom: 2006, yearTo: null, order: 3,
    component: 'Corrente 520 — lubrificação e tensão', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'Lubrificação a cada 500 km. Folga: 10–15 mm. Acesso à corrente pela lateral direita levantando a saia da carenagem inferior — parafusos plásticos tipo quarter-turn. Kit a cada 20.000–25.000 km.' },
  { modelName: 'PULSAR 220F', yearFrom: 2006, yearTo: null, order: 4,
    component: 'Filtro de ar (espuma)', intervalKm: 5000, intervalMonths: 6, priority: 'MEDIUM',
    notes: 'A carenagem full protege o filtro, mas também acumula calor. Limpe a cada 5.000 km. Se a moto consumir mais combustível ou engasgar na abertura, cheque o filtro e também o TPS do carburador/injeção.' },
  { modelName: 'PULSAR 220F', yearFrom: 2006, yearTo: null, order: 5,
    component: 'Folga de válvulas (IN 0,05 / EX 0,10 mm)', intervalKm: 10000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Motor frio. IN: 0,05 mm. EX: 0,10 mm. Acesso ao cabeçote exige remoção parcial da carenagem full — reserve 2–3 horas. Válvulas folgadas produzem tique-taque metálico em aceleração; apertadas não fazem barulho mas danificam o assento.' },
  { modelName: 'PULSAR 220F', yearFrom: 2006, yearTo: null, order: 6,
    component: 'Fluido de freio (DOT 4) e pastilhas', intervalKm: null, intervalMonths: 24, priority: 'LOW',
    notes: 'Troque o DOT 4 a cada 2 anos. Pastilhas dianteiras (disco): mínimo 2 mm. Freio traseiro a tambor: ajuste cabo e inspecione lonas. A 220F tem sistema de freio eficiente — não negligenciar fluido envelhecido.' },

  // ── PULSAR RS 200 (Triple Spark, líquido refrigerado, carenagem full) ────────
  { modelName: 'PULSAR RS 200', yearFrom: 2015, yearTo: null, order: 0,
    component: 'Óleo do motor (20W50 JASO MA)', intervalKm: 5000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 1,5 L (com filtro). Use 20W50 semissintético JASO MA. A RS200 tem motor de alto rendimento — não use mineral. Troque sempre com filtro de óleo. Intervalo de 5.000 km em uso normal; 3.500 km em uso intenso/pista.' },
  { modelName: 'PULSAR RS 200', yearFrom: 2015, yearTo: null, order: 1,
    component: 'Fluido de arrefecimento (OAT)', intervalKm: null, intervalMonths: 24, priority: 'CRITICAL',
    notes: 'Troque a cada 2 anos. Use anticongelante OAT diluído 50/50 em água destilada. Volume: ~0,8 L. A carenagem full da RS200 retém calor — em trânsito lento, monitore o indicador de temperatura. Nunca abra o radiador com motor quente.' },
  { modelName: 'PULSAR RS 200', yearFrom: 2015, yearTo: null, order: 2,
    component: 'Velas Triple Spark (3 eletrodos) — verificação', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: '3 eletrodos de ignição por cilindro (Triple Spark). Gap: 0,7–0,8 mm. Verifique a cada 10.000 km, troque a cada 20.000 km. Acesso às velas na RS200 exige remoção do painel dianteiro da carenagem — reserve 45 min.' },
  { modelName: 'PULSAR RS 200', yearFrom: 2015, yearTo: null, order: 3,
    component: 'Fluido de freio (DOT 4) — ABS', intervalKm: null, intervalMonths: 24, priority: 'HIGH',
    notes: 'O ABS da RS200 depende criticamente do DOT 4 sem degradação. Troque a cada 2 anos. Fluido contaminado pode travar o módulo ABS. Purgue o sistema corretamente: nunca misture com DOT 5 silicone.' },
  { modelName: 'PULSAR RS 200', yearFrom: 2015, yearTo: null, order: 4,
    component: 'Corrente 520 O-ring — lubrificação', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'Lubrificação a cada 500 km com spray específico O-ring. Folga: 10–15 mm. Acesso pela lateral da saia da carenagem. Kit (corrente + coroas) a cada 20.000–25.000 km.' },
  { modelName: 'PULSAR RS 200', yearFrom: 2015, yearTo: null, order: 5,
    component: 'Folga de válvulas (IN 0,04–0,06 / EX 0,07–0,09 mm)', intervalKm: 10000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Motor frio. IN: 0,04–0,06 mm. EX: 0,07–0,09 mm. Acesso ao cabeçote na RS200 requer remoção completa da carenagem frontal — tarefa para mecânico experiente ou reservar uma manhã inteira.' },
  { modelName: 'PULSAR RS 200', yearFrom: 2015, yearTo: null, order: 6,
    component: 'Filtro de ar e injeção — verificação', intervalKm: 5000, intervalMonths: 6, priority: 'MEDIUM',
    notes: 'Troque ou lave o filtro de ar a cada 5.000 km. Na FI: limpe o injetor a cada 20.000 km com aditivo de tanque ou limpeza por ultrassom. Sensor TPS fora de calibração causa engasgos na abertura rápida.' },
  { modelName: 'PULSAR RS 200', yearFrom: 2015, yearTo: null, order: 7,
    component: 'Carenagem full — presilhas e parafusos', intervalKm: null, intervalMonths: 12, priority: 'LOW',
    notes: 'Inspecione todas as presilhas plásticas (clips) anualmente — vibração solta fixadores e causa rangidos. Aplique cera automotiva nas partes plásticas pintadas a cada 6 meses. Fitas antivibração nas juntas evitam riscos internos.' },

  // ── BOXER 150 (monovela, uso utilitário, entrega) ──────────────────────────
  { modelName: 'BOXER 150', yearFrom: 2002, yearTo: null, order: 0,
    component: 'Óleo do motor (20W50 JASO MA)', intervalKm: 3000, intervalMonths: 6, priority: 'CRITICAL',
    notes: 'Volume: 1,0 L. Use 20W50 mineral JASO MA. Em uso de entrega (8+ horas/dia), troque a cada 3.000 km sem exceção — ciclo de trabalho alto degrada o óleo mais rápido. Nunca pule a troca: é o principal causador de motor fundido em entregadores.' },
  { modelName: 'BOXER 150', yearFrom: 2002, yearTo: null, order: 1,
    component: 'Corrente 428 — lubrificação e tensão', intervalKm: 400, intervalMonths: null, priority: 'CRITICAL',
    notes: 'Em uso de entrega, lubrificação a cada 400 km (mais frequente que motos esportivas). A corrente da Boxer trabalha com carga constante e se desgasta rápido. Folga: 10–15 mm. Kit a cada 15.000–18.000 km — nunca troque só a corrente sem as coroas.' },
  { modelName: 'BOXER 150', yearFrom: 2002, yearTo: null, order: 2,
    component: 'Vela NGK C7HSA (única vela)', intervalKm: 8000, intervalMonths: null, priority: 'HIGH',
    notes: 'A Boxer tem 1 vela apenas (não é DTS-i). Use NGK C7HSA — código específico para motor de trabalho, resistente a sujeira. Gap: 0,6–0,7 mm. Vela com eletrodo desgastado causa partida difícil no frio e consumo alto. Troque a cada 8.000 km.' },
  { modelName: 'BOXER 150', yearFrom: 2002, yearTo: null, order: 3,
    component: 'Filtro de ar (espuma) — limpeza', intervalKm: 3000, intervalMonths: null, priority: 'HIGH',
    notes: 'Em entrega urbana: limpe ou troque a cada 3.000 km. Filtro sujo aumenta consumo de 15–20% e causa fumaça preta. Em zonas de terra ou construção: inspecione a cada 1.000 km. O filtro é acessível sem ferramentas — rotina semanal recomendada.' },
  { modelName: 'BOXER 150', yearFrom: 2002, yearTo: null, order: 4,
    component: 'Freios (tambor D+T) — ajuste e inspeção', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'Boxer tem freio a tambor nas duas rodas. Ajuste os cabos para 20–30 mm de jogo. Lonas mínimas: 2 mm. Em entrega, os freios trabalham intensamente em paradas rápidas — inspecione as lonas a cada 5.000 km. Tambor riscado reduz frenagem e precisa de substituição.' },
  { modelName: 'BOXER 150', yearFrom: 2002, yearTo: null, order: 5,
    component: 'Pneus — verificação semanal', intervalKm: null, intervalMonths: null, priority: 'MEDIUM',
    notes: 'A Boxer carrega peso (baú + entregador) constantemente. Calibre semanalmente: dianteiro 28 PSI, traseiro 32 PSI (com carga: 32/36 PSI). Desgaste irregular indica geometria de roda fora de ponto. Pneu careca = risco grave em frenagem molhada.' },
  { modelName: 'BOXER 150', yearFrom: 2002, yearTo: null, order: 6,
    component: 'Folga de válvulas (IN 0,05 / EX 0,10 mm)', intervalKm: 10000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Motor frio. IN: 0,05 mm. EX: 0,10 mm. Em uso de entrega contínua, verifique a cada 8.000 km. Válvulas folgadas produzem tique-taque — válvulas apertadas não fazem barulho mas queimam o assento.' },

  // ── DOMINAR 400 (Triple Spark DOHC, líquido refrigerado, ABS) ──────────────
  { modelName: 'DOMINAR 400', yearFrom: 2017, yearTo: null, order: 0,
    component: 'Óleo do motor (10W30 API SJ JASO MA)', intervalKm: 5000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'ATENÇÃO: a Dominar usa 10W30, NÃO 20W50 como as outras Bajaj. Volume: 1,7 L (com filtro). Use 10W30 semissintético API SJ JASO MA. Usar 20W50 causa superaquecimento por maior resistência ao fluxo no DOHC. Troque sempre com filtro de óleo.' },
  { modelName: 'DOMINAR 400', yearFrom: 2017, yearTo: null, order: 1,
    component: 'Fluido de arrefecimento (OAT)', intervalKm: null, intervalMonths: 24, priority: 'CRITICAL',
    notes: 'Troque a cada 2 anos. Use anticongelante OAT diluído 50/50 em água destilada. Volume: ~1,1 L. A Dominar tem motor maior e gera mais calor — nunca substitua por anticongelante comum ou verde (tipo PARABLU). Verifique o nível mensalmente.' },
  { modelName: 'DOMINAR 400', yearFrom: 2017, yearTo: null, order: 2,
    component: 'Velas Triple Spark DOHC — verificação', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor DOHC com Triple Spark (3 eletrodos). Gap: 0,7–0,8 mm. Verifique a cada 10.000 km. Troque a cada 20.000 km. Use somente as velas especificadas no manual — o DOHC é sensível à especificação exata de calorífico.' },
  { modelName: 'DOMINAR 400', yearFrom: 2017, yearTo: null, order: 3,
    component: 'Fluido de freio (DOT 4) — ABS', intervalKm: null, intervalMonths: 24, priority: 'HIGH',
    notes: 'O sistema ABS da Dominar depende de DOT 4 de qualidade. Troque a cada 2 anos. Fluido degradado causa acionamento indevido do ABS ou falha de modulação. Purge dianteiro e traseiro separadamente. Não misture marcas.' },
  { modelName: 'DOMINAR 400', yearFrom: 2017, yearTo: null, order: 4,
    component: 'Corrente 520 — lubrificação e tensão', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'Lubrificação a cada 500 km com spray específico O-ring. Folga: 10–15 mm. A Dominar 400 transmite torque considerável — corrente esticada demais ou frouxa prejudica a transmissão e pode romper. Kit a cada 20.000 km.' },
  { modelName: 'DOMINAR 400', yearFrom: 2017, yearTo: null, order: 5,
    component: 'Filtro de ar — inspeção e limpeza', intervalKm: 5000, intervalMonths: 6, priority: 'MEDIUM',
    notes: 'Limpe ou substitua a cada 5.000 km. O injetor da Dominar é calibrado para ar limpo — filtro sujo causa mau funcionamento e possível código de falha no ECU. Em viagem com pó ou estrada de terra: inspecione a cada 1.500 km.' },
  { modelName: 'DOMINAR 400', yearFrom: 2017, yearTo: null, order: 6,
    component: 'Pastilhas de freio (disco D+T)', intervalKm: 5000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Inspecione dianteiro (duplo disco na 400 BS6) e traseiro a cada 5.000 km. Espessura mínima: 2 mm. A Dominar tem peso elevado (~182 kg) — pastilhas desgastam mais rápido do que em motos leves. EBC FA ou Galfer são upgrades diretos.' },
  { modelName: 'DOMINAR 400', yearFrom: 2017, yearTo: null, order: 7,
    component: 'Folga de válvulas DOHC', intervalKm: 10000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Motor DOHC de 4 válvulas. Verifique folgas com motor frio a cada 10.000 km. Consulte o manual de serviço para as folgas específicas do seu ano (BS4 e BS6 podem diferir). Serviço recomendado em oficina especializada Bajaj.' },

  // ── AVENGER 220 (DTS-i, óleo refrigerado, cruiser) ─────────────────────────
  { modelName: 'AVENGER 220', yearFrom: 2005, yearTo: null, order: 0,
    component: 'Óleo do motor 20W50 JASO MA (óleo refrigerado)', intervalKm: 4000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume refill: 1,15 L / overhaul (com filtro): 1,3 L. Use 20W50 semissintético JASO MA. O radiador de óleo exige melhor proteção térmica — não use mineral. Em trânsito lento/urbano, troque a cada 3.500 km: o motor óleo-refrigerado aquece mais parado.' },
  { modelName: 'AVENGER 220', yearFrom: 2005, yearTo: null, order: 1,
    component: 'Velas NGK CPR8EA-9 — par DTS-i', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: '2 velas por cilindro (DTS-i). Gap: 0,7–0,8 mm. Troque o par junto — a segunda vela esconde a falha da primeira. Não use NGK CR8EGP (da 220F): são velas diferentes. Reaperto: 12–15 Nm.' },
  { modelName: 'AVENGER 220', yearFrom: 2005, yearTo: null, order: 2,
    component: 'Radiador de óleo — limpeza das aletas', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'Limpe as aletas com ar comprimido a cada 5.000 km. A Avenger tem posição de pilotagem baixa (cruiser) e o radiador de óleo fica exposto a mais sujeira do asfalto. Acumulo de resíduos reduz eficiência e aumenta temperatura do óleo.' },
  { modelName: 'AVENGER 220', yearFrom: 2005, yearTo: null, order: 3,
    component: 'Corrente 520 — lubrificação a cada 400 km', intervalKm: 400, intervalMonths: null, priority: 'HIGH',
    notes: 'Em viagem longa: lubrificação a cada 400 km (não 500 km) — a posição deitada de cruiser muda a tensão da corrente em curvas. Folga: 10–15 mm. A corrente da Avenger fica mais exposta à sujeira (posição baixa). Kit a cada 20.000 km.' },
  { modelName: 'AVENGER 220', yearFrom: 2005, yearTo: null, order: 4,
    component: 'Filtro de ar (espuma)', intervalKm: 5000, intervalMonths: 6, priority: 'MEDIUM',
    notes: 'Lave e aplique óleo de filtro a cada 5.000 km. A posição de pilotagem baixa aspira mais ar do nível do asfalto — filtro mais sujeito a sujeira. Limpe antes de viagens longas.' },
  { modelName: 'AVENGER 220', yearFrom: 2005, yearTo: null, order: 5,
    component: 'Folga de válvulas (IN 0,05 / EX 0,10 mm)', intervalKm: 10000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Motor frio. IN: 0,05 mm. EX: 0,10 mm. Mesmas folgas da Pulsar 180. O motor DTS-i da Avenger 220 é mais silencioso — ruído de válvula pode ser confundido com o rangido do banco ou guidão. Verifique primeiro a origem do som.' },
  { modelName: 'AVENGER 220', yearFrom: 2005, yearTo: null, order: 6,
    component: 'Freio misto (disco D + tambor T) — inspeção', intervalKm: 5000, intervalMonths: null, priority: 'LOW',
    notes: 'Disco dianteiro: pastilhas mínimo 2 mm, disco mínimo 4 mm de espessura. Tambor traseiro: lonas mínimo 2 mm, ajuste do pedal 20–30 mm de jogo. Fluido DOT 4: troque a cada 2 anos. O estilo de pilotagem de cruiser usa mais o freio traseiro — lonas desgastam mais rápido.' },
]

// ─── Runner ─────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed BAJAJ iniciando...\n')

  const motoType = await prisma.vehicleType.upsert({
    where: { slug: 'moto' },
    update: {},
    create: { slug: 'moto', label: 'Moto' },
  })

  const bajajBrand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BAJAJ', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'BAJAJ', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${bajajBrand.name}`)

  for (const block of bajajModels) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: bajajBrand.id } },
      update: {},
      create: { name: block.modelName, brandId: bajajBrand.id },
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
      `  🔧 ${block.modelName} (${block.yearFrom ?? '?'}–${block.yearTo ?? 'atual'}): ` +
      `${counts.m} macetes, ${counts.p} problemas, ${counts.mt} manutenção`,
    )
  }

  console.log('\n  📏 Calibragem de pneus...')
  for (const tp of bajajTirePressures) {
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
  const modelNames = [...new Set(bajajMaintenanceItems.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: bajajMaintenanceItems.map(item => ({
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
    const count = bajajMaintenanceItems.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = bajajModels.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed BAJAJ concluído: ${bajajModels.length} modelos, ${totalTips} dicas, ${bajajTirePressures.length} calibragens, ${bajajMaintenanceItems.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
