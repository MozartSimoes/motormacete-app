// seed-honda-cbr1000.ts — Honda CBR 1000 (todos os modelos FIPE)
// CBR 1000 F (1991–96) · CBR 1000 RR Fireblade (2004–20) · RR SP (2017–20)
// CBR 1000 RR-R Fireblade SP (2020–26) · RR-R SP 30TH EDITION (2023–24)
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface MaintenanceItemInput {
  modelName: string; yearFrom: number | null; yearTo: number | null
  component: string; intervalKm: number | null; intervalMonths: number | null
  notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number
}

// ═══════════════════════════════════════════════════════════════════════════════
// CBR 1000 F (SC21/SC24 — 1991–1996) — GT esportivo carburado
// ═══════════════════════════════════════════════════════════════════════════════

const CBR1000F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — ~4,0 L com filtro; troca a cada 5.000 km',
    body: 'Motor 998cc DOHC inline-4 carburado exige 10W-40 API SN/SP com JASO MA2 (embreagem úmida). Capacidade: ~3,8 L sem filtro; ~4,0 L com filtro novo. Use Motul 7100 4T 10W-40, Honda HP4 10W-40 ou Castrol Power1 Racing 10W-40. Nunca use óleo de carro com modificadores de atrito — destroem a embreagem multidisco. A CBR 1000 F tem motor robusto de GT, mas os 113 HP em 9.500 rpm exigem óleo de qualidade sem extensão de prazo.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK CR9EH-9 — jogo de 4; troque completo a cada 12.000 km',
    body: 'Motor 4 cilindros = 4 velas. Vela padrão NGK CR9EH-9 (gap 0,8–0,9 mm). Iridium opcional: NGK CR9EIX (gap 0,8 mm, dura ~20.000 km). Troque sempre o jogo de 4 completo — gap desigual causa vibração perceptível no inline-4. Torque de aperto: 16 N.m. Na CBR 1000 F a troca exige remoção do airbox e dos 4 carburadores em bloco — planeje 2–3 horas de serviço. Garanta que os cabos de vela (HT leads) estejam em boas condições ao mesmo tempo, pois são componentes de envelhecimento natural com 30+ anos de moto.',
  },
  {
    severity: 'WARN',
    title: 'Sincronismo dos 4 carburadores Keihin VB40A — a cada 8.000 km; afeta diretamente o desempenho',
    body: 'A CBR 1000 F tem 4 carburadores Keihin VB40A em linha. O sincronismo desregula naturalmente após 8.000–10.000 km, causando vibração, marcha lenta irregular, afogamento em aceleração e consumo elevado. Regulagem feita com manômetro de coluna de mercúrio (synchrometer) nas tomadas de vácuo de cada cilindro, com marcha lenta a 1.000–1.200 rpm. Verifique e ajuste o cabo de acelerador (zero folga na meia volta do guidão). Em oficina especializada: R$200–400. Moto mal sincronizada em inline-4 vibra de forma desconfortável e perde 10–15% de rendimento.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de válvulas DOHC 16 válvulas — a cada 12.000 km; serviço exige desmontagem significativa',
    body: 'Folgas especificadas com motor frio: admissão 0,08–0,18 mm / escape 0,18–0,28 mm (confirme no manual SC21/SC24 do seu ano). Intervalo menor que nas RR modernas por ser motor mais antigo com revestimento de assentos diferente. Serviço trabalhoso na F: requer remoção dos carburadores, airbox e capa de válvulas. Em oficina especializada: R$500–900. Sintomas de folga excessiva: "clack-clack" metálico em marcha lenta. Folga insuficiente: perda de compressão sem ruído — mais perigoso pois passa despercebido.',
  },
  {
    severity: 'OK',
    title: 'Corrente 530 o-ring — lubrifique a cada 800 km; kit completo a cada 20.000 km',
    body: 'A CBR 1000 F usa corrente 530 (o-ring). Com 254 kg em ordem de marcha e uso GT de longa distância, a corrente acumula carga considerável. Lubrifique com spray específico a cada 800–1.000 km. Folga correta: 20–30 mm no ponto médio inferior com piloto sentado. Kit relação (corrente + coroa + pinhão): DID 530ZVM-X ou RK GB520XSO + JT Sprockets — troque os 3 juntos. Configuração original: pinhão 15T + coroa 42T (confirme no seu ano). A corrente 530 é mais robusta que a 520 das RR, mas menos eficiente mecanicamente.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70 ZR17 (F) e 170/60 ZR17 (R) — pressões 36/40 PSI solo; verificar data de fabricação',
    body: 'A CBR 1000 F usa traseiro 170/60 ZR17, diferente das RR que usam 190/50. Pressões: 36 PSI dianteiro / 40 PSI traseiro solo; 36 PSI / 42 PSI com garupa. Recomendados para o perfil GT da F: Michelin Road 6, Bridgestone Battlax T32, Metzeler Roadtec 02 — compostos que equilibram aderência com durabilidade em longas distâncias. Em motos de 25+ anos, verifique o código DOT nos pneus: pneu com mais de 6 anos deve ser substituído mesmo sem dano visual — o composto endurece e perde aderência crítica.',
  },
  {
    severity: 'OK',
    title: 'Líquido de arrefecimento — troca a cada 2 anos; nunca use água pura no alumínio',
    body: 'Use Honda Long Life Coolant (roxo) ou equivalente etileno-glicol 50/50 com água destilada. Nunca use água pura — corrói o alumínio do motor e do radiador em meses. Capacidade: ~2,4 L (confirme no manual do seu ano). Troca a cada 2 anos ou 30.000 km. Verifique o estado das mangueiras de borracha — com 25+ anos, a borracha original endurece e desenvolve micro-rachaduras invisíveis externamente. Palpando a mangueira fria: se estalar ou estiver muito rígida, substitua imediatamente.',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio DOT 4 — troca a cada 2 anos; 3 circuitos independentes na F',
    body: 'A CBR 1000 F tem sistema de freios com 3 circuitos (2 dianteiros + 1 traseiro). DOT 4 absorve umidade continuamente — troca bienal obrigatória independente de quilometragem. Use apenas DOT 4 (nunca DOT 5 silicone — incompatível com as borrachas). Total: ~400–500 mL para os 3 circuitos. Discos dianteiros: 296 mm × 2. Pastilhas: EBC HH (R$100–150/par) ou Brembo SC (R$140–200/par) superam o original com melhor mordida e durabilidade.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar — troca a cada 12.000 km; caixa de filtro veda com cuidado',
    body: 'A CBR 1000 F tem filtro de ar de papel posicionado na caixa de ar acima dos carburadores. Com 4 carburadores em linha, qualquer folga ou vedação defeituosa na caixa de ar altera o equilíbrio de ar entre os cilindros, desfazendo o sincronismo. Sempre verifique as vedações da tampa do airbox ao instalar o filtro novo. Upgrade K&N (HA-1004 ou equivalente, R$150–250) lavável é alternativa viável — a cada limpeza verifique que o óleo do K&N não está em excesso (excesso de óleo pode atingir as agulhas dos carburadores).',
  },
  {
    severity: 'OK',
    title: 'Verificação do sistema de cargas elétrico — regulador/retificador e bateria anualmente',
    body: 'Anualmente, com motor em 4.000 rpm, meça a tensão nos terminais da bateria: 13,8–14,8 V = sistema OK; abaixo de 13,5 V = regulador com problema; acima de 15 V = regulador com defeito (pode danificar bateria e estátor). A CBR 1000 F de 30+ anos frequentemente tem bateria sulfonada e regulador original na vida útil limite. Substituição do regulador por MOSFET (Shindengen FH020AA ou similar, R$250–400 importado) é o upgrade mais inteligente — elimina o vício crônico de aquecimento da Honda da era.',
  },
]

const CBR1000F_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Tensor da corrente de comando desgastado — ruído metálico na partida fria = emergência',
    body: 'O tensionador de corrente de comando original da CBR 1000 F (SC21/SC24) usa mola que perde força com os anos. Sinal de alerta: barulho "tick-tick-tick" metálico rítmico durante os primeiros 30 segundos após partida a frio, que desaparece com aquecimento do motor. Se ignorado, a corrente perde tensão, salta um dente do comando e provoca colisão de pistões com válvulas — rebuild de motor: R$8.000–20.000. Solução: substituir pelo tensor de parafuso ajustável aftermarket (Tsubaki PUCHR ou manual tensioner, R$300–500 importado). Nunca ignore esse ruído em moto com 25+ anos sem histórico documentado.',
  },
  {
    severity: 'WARN',
    title: 'Carburadores Keihin VB40A oxidados após períodos parados — limpeza total antes de rodar',
    body: 'Os 4 carburadores acumulam verniz (resina de gasolina oxidada) nos jatos e passagens após 6+ meses parados com combustível no flutuador. Sintomas: marcha lenta irregular, afogamento em aceleração, falha de 1 ou mais cilindros. Limpeza ultrassônica completa do bloco de 4 carburadores em oficina especializada: R$350–600. Troque os o-rings e membrana do acelerador (CV diaphragm) junto — as membranas originais de borracha racham com envelhecimento e causam atraso na aceleração. Kit de membranas aftermarket: R$80–150/carburador.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador sobreaquecendo — conector carboniza e queima estátor',
    body: 'O regulador/retificador original da CBR 1000 F tem projeto de dissipação térmica inadequado para uso urbano com farol ligado continuamente. Resultado: conector de 6 vias carboniza gradualmente; tensão instável; estátor entra em curto. Diagnóstico: tensão de carga < 13,5 V a 4.000 rpm. Inspecione o conector anualmente. Upgrade definitivo: regulador MOSFET (Shindengen FM54 ou FH020AA, R$250–400 importado). Nunca parte sem verificar a carga se a bateria estiver com comportamento estranho — moto antiga com sistema elétrico degradado pode deixar você parado longe de casa.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem interna no tanque de aço — contamina carburadores e filtro',
    body: 'O tanque original de aço de 20 L desenvolveu ferrugem interna em praticamente todos os exemplares de 25+ anos, especialmente os que ficaram parados com pouco combustível. A ferrugem em flocos atinge os carburadores, entupindo jatos e provocando falhas intermitentes difíceis de diagnosticar. Inspeção obrigatória: iluminação interna com lanterna pela abertura do bujão. Tratamento: limpeza com solução de ácido fosfórico + selante POR-15 Tank Sealer (~R$250–350). Após tratar o tanque, substitua o filtro de combustível inline e limpe ultrassonicamente os carburadores.',
  },
  {
    severity: 'WARN',
    title: 'Mancal do link system traseiro endurecido — batida seca ao passar em buracos',
    body: 'A CBR 1000 F usa sistema Pro-Link com braço oscilante e conjunto de rolamentos/silentblocks no link de amortecimento. Após 25+ anos, as borrachas dos silentblocks endurecem e os rolamentos do link oxidam, transmitindo choques diretamente ao chassi (sensação de "batida seca" em irregularidades). O problema é fácil de ignorar pois surgiu gradualmente. Revisão do link system: ~R$400–700 em peças + mão de obra. Rolamentos SKF ou FAG são substitutos de qualidade superior ao original. Silentblocks aftermarket em poliuretano são mais duráveis que os de borracha — mas transmitem ligeiramente mais vibração.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// CBR 1000 RR Fireblade (SC57/SC59/SC77 — 2004–2020)
// ═══════════════════════════════════════════════════════════════════════════════

const CBR1000RR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — ~3,8 L com filtro; troca a cada 5.000 km (3.000 km em uso esportivo)',
    body: 'A Honda especifica 10W-30 (não 10W-40) para a CBR 1000 RR — o motor de alto regime exige viscosidade menor para circulação eficiente acima de 10.000 rpm. Use 10W-30 API SN/SP com JASO MA2: Motul 7100 4T 10W-30, Honda HP4 10W-30, Liqui-Moly Racing Scooter 10W-30 (também serve 10W-40 em clima tropical acima de 30°C). Capacidade: ~3,5 L sem filtro; ~3,8 L com filtro novo. Em uso de pista ou esportivo intenso: troque a cada 3.000 km — o motor de 999cc a 12.000+ rpm degrada o óleo rapidamente.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK IMR9C-9H (iridium) — jogo de 4; intervalo 16.000 km; gap 0,8 mm',
    body: 'A CBR 1000 RR usa velas iridium específicas NGK IMR9C-9H (não a CR9EH-9 das motos mais simples). Gap: 0,8 mm — nunca abra além desse valor, pois o sistema de ignição digital é dimensionado para esse gap. Iridium dura 16.000–20.000 km. Troque sempre o jogo de 4 completo. Torque de aperto: 13 N.m (cuidado: rosca fina M10 em algumas gerações). A troca na RR exige remoção do tanque e do airbox — planeie 2–3 horas. Vela com gap errado numa superbike de alto regime causa detonação perceptível acima de 8.000 rpm.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de válvulas DOHC 16 válvulas — a cada 16.000 km; o serviço mais caro e trabalhoso da RR',
    body: 'O motor de superbike DOHC exige regulagem de folgas de válvulas a cada 16.000 km. Folgas (motor frio): admissão 0,16 ± 0,03 mm / escape 0,27 ± 0,03 mm (SC57); verifique o manual para SC59/SC77 — podem variar. Serviço que requer desmontagem quase completa da parte superior do motor: remoção de tanque, airbox, corpo de borboleta e capa de válvulas. Em concessionária Honda: R$1.500–2.500. Em oficina especializada em superbikes: R$900–1.500. É normal em moto de alto rendimento — o custo é justificado. Moto comprada sem histórico: esse é o primeiro serviço a fazer antes de qualquer uso.',
  },
  {
    severity: 'OK',
    title: 'Corrente DID 520 (ERT3/ZVM-X) — lubrifique 800 km; kit completo a cada 15.000 km',
    body: 'A CBR 1000 RR usa corrente 520 (mais leve e eficiente que a 530 das motos GT). Com 170–192 HP dependendo do ano, a corrente 520 trabalha próxima de sua capacidade em acelerações esportivas. Use DID 520 ERV3 (uso misto, R$350–500) ou DID 520 ZVM-X (alto desempenho, R$600–900). Pinhão + coroa: JT Sprockets JTF1304 + JTR302 (configuração padrão 16T/42T). Lubrifique a cada 800 km com spray de corrente específico — Motul Chain Lube Road ou Ipone Chainspray. Kit relação dura menos em uso esportivo: calcule 12.000–15.000 km em uso misto.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70 ZR17 (F) e 190/50 ZR17 (R) — 36 PSI F / 42 PSI R frios',
    body: 'A CBR 1000 RR usa traseiro 190/50 ZR17 (não 180/55). Pressões frios: 36 PSI dianteiro / 42 PSI traseiro. Em pista ou uso esportivo, pressões podem ser ajustadas (28–32 PSI em pneus slick/sport, conforme fabricante). Para uso na rua: Pirelli Diablo Rosso IV, Michelin Power 6, Bridgestone S23. Para uso misto pista/rua: Pirelli Diablo Supercorsa SP V4. Nunca monte pneus abaixo do índice ZR — a velocidade máxima da moto supera 280 km/h. Em motos adquiridas paradas: verifique o código DOT — pneus com mais de 6 anos devem ser trocados independente do aspecto visual.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar K&N HA-1004 como upgrade — washable, sem perda de performance',
    body: 'O filtro de ar original de papel para a CBR 1000 RR deve ser trocado a cada 12.000 km. O K&N HA-1004 (para a maioria das gerações SC57/SC59) é um upgrade simples: lavável, dura a vida da moto e melhora marginalmente o fluxo de ar. Custo: R$200–350. Após lavar o K&N, aguarde secar completamente (mínimo 24h) e aplique o óleo K&N levemente — excesso de óleo pode contaminar o sensor MAP/IAT. Se a moto tem mapa de injeção modificado (ECU flash): o filtro K&N já deve ser considerado na recalibração.',
  },
  {
    severity: 'OK',
    title: 'Pastilhas Brembo SC ou EBC HH — upgrade real para as pinças Nissin dianteiras',
    body: 'As CBR 1000 RR SC57/SC59 têm pinças Nissin 4 pistões radiais dianteiras. As pastilhas originais Honda são adequadas para uso misto, mas pastilhas sinterizadas oferecem mordida superior e maior durabilidade em uso esportivo. Brembo SC (R$180–250/par): resposta firme e linear, ótimas a quente — 2 pares para as duas pinças. EBC HH (R$120–180/par): excelente custo-benefício, bom desempenho mesmo a frio. Troque sempre em par por pinça. Os SC77 (2017-2020) já têm pinças Brembo de série — nesse caso use pastilhas Brembo SC ou Brembo Z04 (pista).',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio DOT 4 — troca a cada 2 anos; sistema de ABS exige procedimento específico',
    body: 'Troca bienal obrigatória. Use apenas DOT 4 (Castrol React ou Motul RBF 600 para uso mais esportivo — DOT 4 ponto ebulição seco: mín. 230°C; Motul RBF 600: 312°C). Quantidade total: ~350 mL para os 3 circuitos. Modelos com ABS (C-ABS nos SC59 de 2010+ ou Cornering ABS no SC77): o módulo ABS requer sangramento específico seguindo o procedimento do manual — nunca sangre o sistema com ABS da mesma forma que uma moto simples. Em oficina sem ferramenta Honda HDS (scanner): use o método de sangramento por gravidade.',
  },
  {
    severity: 'OK',
    title: 'Líquido de arrefecimento — troca a cada 2 anos; capacidade ~2,7 L',
    body: 'Use Honda Long Life Coolant (roxo) ou equivalente etileno-glicol 50/50 em água destilada. Nunca água pura — corrói o alumínio do cabeçote e do radiador. Capacidade: ~2,5–2,7 L (confirme no manual do seu ano). Em uso de pista com alta temperatura ambiente, adicione pastilha de água destilada (Water Wetter ou Evans) para melhorar a condutividade térmica. Verifique o termostato a cada 30.000 km — termostato preso aberto causa aquecimento excessivo do motor.',
  },
  {
    severity: 'OK',
    title: 'Suspensão Showa BPF (SC77 2017–2020) — ajuste de compressão e rebote para seu peso',
    body: 'A CBR 1000 RR SC77 tem o Big Piston Fork (BPF) Showa de alta performance. Os ajustes externos (compressão e rebote nos topos dos garfos, pré-carga traseira) são configurados de fábrica para piloto padrão de 75 kg. Se seu peso for diferente: (1) ajuste a pré-carga da mola dianteira para que o afundamento estático fique em 20–25 mm; (2) ajuste o rebote traseiro para 2–3 cliques a partir do máximo. Recomendado: levar a uma oficina com experiência em setup de suspensão para a sua estatura e estilo de pilotagem antes de qualquer uso agressivo.',
  },
  {
    severity: 'WARN',
    title: 'HSTC e Cornering ABS (SC77 2017–2020) — nunca desabilite completamente em vias públicas',
    body: 'O Honda Selectable Torque Control (HSTC) e o Cornering ABS (SC77/SC77 SP) são sistemas de segurança ativos. Em uso de pista, a configuração recomendada pelos treinadores Honda é HSTC nível 1 (mínima intervenção) e ABS desabilitado. Em vias públicas, use HSTC nível 2–3 e ABS ativo — imprevistos como mancha de óleo ou areia na faixa de frenagem são realidade brasileira. Nota: o Cornering ABS usa o sensor de IMU (Inertial Measurement Unit) — se a moto caiu e o sensor ficou exposto ao impacto, verifique a calibração antes de voltar a rodar.',
  },
  {
    severity: 'OK',
    title: 'Revisão anual do regulador/retificador — upgrade MOSFET preventivo recomendado acima de 40.000 km',
    body: 'Mesmo nas gerações mais novas da RR (SC59/SC77), o regulador/retificador original tem projeto de dissipação térmica limitado para uso urbano intenso. Anualmente: (1) meça tensão de carga entre terminais da bateria a 4.000 rpm: 13,8–14,8 V = OK; (2) inspecione o conector por pinos carbonizados. Upgrade para regulador MOSFET (Shindengen FM54 para SC57/SC59, R$300–500 importado) é o melhor investimento elétrico em motos com 40.000+ km. O MOSFET não desperdiça energia em calor — mantém o sistema estável mesmo em trânsito lento com farol de LED ligado.',
  },
]

const CBR1000RR_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'SC57 (2004–2007): tensor de corrente de comando falha SEM RUÍDO — destruição repentina do motor',
    body: 'O tensionador de corrente de comando dos modelos SC57 (2004–2007) tem um defeito documentado mundialmente: ao contrário de outras Hondas que emitem ruído antes de falhar, o tensor do SC57 pode ceder SEM QUALQUER AVISO SONORO. A corrente salta o comando, pistões colidem com válvulas e o motor é destruído instantaneamente — sem chance de parar antes do dano. Custo de rebuild: R$12.000–25.000. Diagnóstico preventivo: com motor frio, inspecione o tensor pelo orifício de inspeção lateral; guias de corrente desgastados ou tensor com jogo excessivo = substitua IMEDIATAMENTE. Solução definitiva: tensor aftermarket manual tipo "parafuso" (Tsubaki PUCHR ou manual tensioner, R$300–500 importado). Se você tem SC57 sem histórico de tensor substituído, PARE DE USAR A MOTO até resolver isso.',
  },
  {
    severity: 'WARN',
    title: 'IACV (Idle Air Control Valve) entupida — SC59/SC77 com marcha lenta irregular',
    body: 'A válvula de ar de marcha lenta (IACV) dos modelos SC59 (2008–2016) e SC77 (2017–2020) entope com verniz de combustível após longos períodos sem uso ou com uso de combustível de baixa qualidade. Sintoma: marcha lenta que varia entre 500 e 1.800 rpm de forma irregular ao aquecer, especialmente nos primeiros 5 minutos após a partida. A IACV fica posicionada no corpo de borboleta — limpeza com spray de carburador/TBI (Wurth, Motul) via desmontagem: R$300–600 em mão de obra. Peça nova: R$400–800. Em moto que ficou parada 6+ meses: limpe preventivamente antes de qualquer revisão.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador sobreaquecendo — SC57/SC59 com conector queimando e estátor em curto',
    body: 'Vício documentado da série CBR 1000 RR SC57/SC59: o regulador original dissipa o excesso de energia elétrica em calor diretamente no componente. Em uso urbano lento, o calor acumula, o conector de 6 vias carboniza e o estátor recebe picos de tensão que queimam espiras. Sinais: bateria que não carrega completamente, tensão < 13,5 V a 4.000 rpm, farol com intensidade variando. Custo de reparo: regulador R$400–800 + estátor R$800–1.500 + mão de obra. Solução definitiva: regulador MOSFET (Shindengen FM54, R$300–500 importado). SC77 2017+ tem regulador com dissipação melhorada, mas a inspeção anual ainda é recomendada.',
  },
  {
    severity: 'WARN',
    title: 'Sonda lambda (sensor O2) falhando em SC59 de alta quilometragem — instabilidade de injeção',
    body: 'A sonda lambda dos modelos SC59 (2008–2016) tem vida útil de 40.000–60.000 km em uso misto. Falha característica: gradual, com a injeção entrando em modo de emergência (open loop) que usa mapa fixo sem feedback de oxigênio. Resultado: consumo aumentado, marcha lenta irregular e perda de potência em aceleração parcial. Diagnóstico via scanner (HDS Honda) ou OBD-II genérico — erro P0136/P0141 é o mais comum. Sonda original Honda: R$600–1.200. Alternativas: Bosch LSM11 ou NGK NTK (R$200–450) compatíveis com adaptador. Após troca, reapague os erros com scanner.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste prematuro do pinhão dianteiro — corrente 520 sensível ao uso agressivo',
    body: 'A corrente 520 da CBR 1000 RR é mais leve que a 530, mas desgasta mais rápido sob uso esportivo com acelerações bruscas e saídas de curva agressivas. O pinhão dianteiro é o primeiro componente a mostrar desgaste: dentes "afiados" em vez de arredondados indicam que o kit precisa ser trocado. Nunca troque apenas o pinhão ou apenas a corrente — o desgaste assimétrico acelera a degradação do componente novo. DID 520 ZVM-X (R$600–900) tem vida útil 20–30% maior que os kits básicos. Inspecione o kit relação a cada 5.000 km em uso esportivo.',
  },
  {
    severity: 'WARN',
    title: 'ECU com mapa conservador de fábrica — perda de desempenho real sem flash',
    body: 'As versões importadas para o Brasil da CBR 1000 RR chegam com ECU em mapa para gasolina de 87 octanas (padrão internacional mínimo). Com a gasolina brasileira de 92 octanas, o mapa conservador resulta em avanço de ignição aquém do ideal, com perda estimada de 8–15 HP e resposta de acelerador mais "preguiçosa". Um flash da ECU (reprogramação) com mapa para gasolina brasileira de alta qualidade + tira o limitador de velocidade: R$400–800 em estabelecimentos especializados (Woolich, Power Commander V). É uma das modificações com melhor custo-benefício para a RR.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// CBR 1000 RR Fireblade SP (SC77 SP — 2017–2020) — Öhlins + Brembo de série
// ═══════════════════════════════════════════════════════════════════════════════

const CBR1000RR_SP_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Suspensão Öhlins Smart EC 2.0 — modos A/B/C; calibre para SEU peso antes do primeiro uso',
    body: 'A CBR 1000 RR SP tem o sistema Öhlins Smart EC 2.0 (eletrônico) que ajusta automaticamente a compressão e o rebote entre 3 modos: A (Sport), B (Standard), C (Comfort). Os valores-base de fábrica são para piloto de 75 kg. Configure a pré-carga estática antes de rodar: sag estático dianteiro 20–25 mm; sag estático traseiro 25–30 mm. Recomendado: leve a um técnico Öhlins certificado para setup inicial conforme seu peso e altura. Isso faz mais diferença que qualquer modificação — uma Öhlins bem calibrada transforma a moto.',
  },
  {
    severity: 'OK',
    title: 'Freios Brembo M50 4 pistões radiais — pastilhas Brembo SC ou Z04; nunca use genérico',
    body: 'A SP tem pinças Brembo M50 monobloco de 4 pistões — o sistema de freio mais avançado disponível em superbike de série. Use pastilhas Brembo originais: SC (rua/pista mista, R$200–300/par) ou Z04 (pista, R$300–450/par). NUNCA use pastilhas genéricas nas M50 — o canal de pistão é preciso e pastilhas com material de atrito irregular causam desgaste assimétrico nos pistões de alumínio. Discos: Brembo T-Drive ou disco original Honda — não misture marcas de disco e pastilha sem validação. Fluido: Motul RBF 600 (DOT 4, ponto de ebulição 312°C seco) para uso em pista.',
  },
  {
    severity: 'OK',
    title: 'Rodas Marchesini forjadas — inspecione por micro-trincas após queda ou impacto severo',
    body: 'A SP tem rodas Marchesini forjadas em alumínio — mais leves e resistentes que as rodas fundidas da versão padrão. Em caso de queda ou impacto severo (buraco em alta velocidade): nunca presuma que a roda está OK só visualmente. Micro-trincas no alumínio forjado são invisíveis a olho nu mas causam falha catastrófica em velocidade. Inspeção por líquido penetrante ou ultrassom: R$150–300 por roda em laboratório especializado. Uma roda Marchesini em bom estado: R$2.500–4.000 nova. Não vale o risco de usar sem inspeção após impacto.',
  },
  {
    severity: 'WARN',
    title: 'Fluido das unidades Öhlins — troca a cada 2 anos; use APENAS Öhlins Oil 01 no garfo',
    body: 'O sistema Öhlins Smart EC tem fluido específico que degrada com o tempo por absorção de umidade e cisalhamento mecânico. Use APENAS Öleo Öhlins Fork Oil 01 (1W) para o garfo e Öhlins Shock Oil para o amortecedor traseiro — outros óleos alteram as características de amortecimento para as quais o sistema eletrônico foi calibrado. Troca a cada 2 anos ou 25.000 km. Em caso de queda com impacto no garfo: troque o fluido imediatamente mesmo que a troca não esteja programada. Custo: R$300–600 em fluido + mão de obra.',
  },
  {
    severity: 'OK',
    title: 'ABS Cornering com IMU 6 eixos — verifique calibração da IMU após queda ou impacto',
    body: 'A SP tem ABS de curva (Cornering ABS) gerenciado por IMU de 6 eixos posicionada sob o assento. A IMU precisa estar nivelada para funcionar corretamente — após queda com impacto lateral ou se a moto ficou de lado por longos períodos, a calibração pode ser afetada. Sintoma de IMU descalibrada: ABS intervindo em momentos inadequados, HSTC com comportamento errático ou luz de aviso no painel. Recalibração com ferramenta Honda HDS: R$200–400 em oficina autorizada. Nunca ignore avisos de IMU na SP.',
  },
  {
    severity: 'OK',
    title: 'Mesma especificação de óleo, velas e válvulas da RR padrão — serviços iguais, custos iguais',
    body: 'Motor da SP é idêntico ao da CBR 1000 RR SC77 padrão: 999cc DOHC 16v PGM-FI. Toda a especificação de manutenção de motor é idêntica: óleo 10W-30 JASO MA2 a cada 5.000 km, velas NGK IMR9C-9H a cada 16.000 km, válvulas a cada 16.000 km. O custo maior da SP na manutenção vem das peças da suspensão Öhlins e freios Brembo M50 — não do motor. Em concessionária ou oficina Honda, especifique sempre que é a versão SP ao solicitar orçamento, para não receber peças da versão padrão.',
  },
  {
    severity: 'OK',
    title: 'Corrente DID 520 ZVM-X — a mesma da RR padrão, mas a SP é frequentemente usada em pista',
    body: 'A corrente da SP é a mesma 520 da RR padrão, mas o perfil de uso tipicamente mais esportivo (pista, trackdays) degrada a corrente mais rápido. Em uso de pista: lubrifique a cada 200–300 km (cada dia de trackday) com spray de corrente para pista. Inspecione visualmente os elos laterais após cada dia de pista. Em uso misto pista/rua: espere vida útil de 10.000–12.000 km. No asfalto molhado: o risco de corrente desgastada saltar sob frenagem brusca é real — mantenha a manutenção em dia.',
  },
]

const CBR1000RR_SP_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Custo de manutenção elevado — peças Öhlins e Brembo importadas têm prazo longo de entrega',
    body: 'A SP tem custo de manutenção significativamente mais alto que a RR padrão por conta da suspensão Öhlins e freios Brembo. Pastilhas Brembo SC: R$200–300/par (2 pares necessários). Fluido Öhlins: R$150–250/litro importado. Vedações do garfo Öhlins: R$300–500 o par. Rebobinamento do amortecedor Öhlins: R$800–1.500. Importação de peças Öhlins via revendedor oficial: prazo de 30–60 dias. Mantenha estoque de pastilhas e fluido para não ficar parado. Oficinas não autorizadas sem experiência com Öhlins podem danificar o sistema eletrônico ao tentarem abrir as unidades.',
  },
  {
    severity: 'WARN',
    title: 'IMU descalibrada após queda — HSTC e Cornering ABS com comportamento errático',
    body: 'A IMU (Inertial Measurement Unit) de 6 eixos da SP é sensível a impactos físicos. Queda com impacto lateral, transporte em caminhão sem ancoragem adequada ou até moto armazenada inclinada por meses pode descalibrar a IMU. Sintomas: HSTC intervindo em aceleração reta sem motivo, Cornering ABS frenando antes do necessário, luz amarela no painel. Recalibração exige ferramenta Honda HDS em oficina autorizada. Nunca tente recalibrar manualmente pela reset do painel — o procedimento correto exige comunicação com a ECU via software.',
  },
  {
    severity: 'WARN',
    title: 'Mesmo risco do SC77 padrão: regulador/retificador em uso urbano — inspeção anual obrigatória',
    body: 'Apesar das melhorias da versão SP na suspensão e freios, o sistema elétrico compartilha o mesmo regulador/retificador da versão padrão SC77. O risco de sobreaquecimento em uso urbano lento com elétricos ligados persiste. Inspeção anual: tensão de carga entre 13,8–14,8 V a 4.000 rpm e verificação do conector. A SP frequentemente tem mais elétricos (IMU, sistema Öhlins eletrônico, ABS de curva) que consomem mais energia — o sistema de carga trabalha mais intensamente. Upgrade MOSFET preventivo é especialmente recomendado na SP usada para deslocamentos diários.',
  },
  {
    severity: 'WARN',
    title: 'Ergonomia de pista — não é moto para uso diário prolongado; causa fadiga em trajetos longos',
    body: 'A CBR 1000 RR SP tem posição de pilotagem derivada das configurações de pista: guidão baixo, apoios de pé altos, tanque largo. Em trajetos urbanos de 30+ minutos ou viagens de 200+ km, o piloto sente tensão nos punhos, joelhos e cervical. Isso não é defeito — é design para máximo desempenho em circuito. Para uso misto pista/rua: considere instalar guidom mais alto (R$200–400) e apoios de pé levemente rebaixados. Nunca use a SP como moto de trabalho diário — o custo de manutenção de uma superbike de uso intenso diário é proibitivo.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// CBR 1000 RR-R Fireblade SP (SC82 — 2020–2026) — derivado do MotoGP RC213V
// ═══════════════════════════════════════════════════════════════════════════════

const CBR1000RRR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — ~3,8 L com filtro; troca a cada 5.000 km; use óleo de alta performance',
    body: 'O motor SC82 de 1.000cc DOHC derivado do RC213V-S (MotoGP) opera a até 14.500 rpm — é o motor de série Honda mais exigente da história. Use 10W-30 API SN/SP JASO MA2 de alta performance: Motul 300V 4T 10W-40 (éster, para uso esportivo intenso), Motul 7100 4T 10W-30, Honda HP4 10W-30. Para uso de pista: troque a cada 3.000 km ou a cada fim de semana de trackday. Nunca estenda além de 5.000 km — o motor de alto regime MotoGP degrada o óleo muito mais rápido que motores convencionais. Capacidade: ~3,5 L sem filtro; ~3,8 L com filtro.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK ILFR6H-11 (iridium duplo) — jogo de 4; intervalo 16.000 km; gap 1,1 mm',
    body: 'O SC82 usa velas de iridium duplo NGK ILFR6H-11 com gap maior (1,1 mm) — específicas para o alto regime e pressão de ignição do motor MotoGP. Nunca substitua por velas de gap menor ou por CR9EH-9 convencionais — a ignição foi dimensionada para esse gap específico. Troque o jogo de 4 completo a cada 16.000 km ou antes em uso de pista intenso. A troca no SC82 exige remoção do tanque e de partes da carenagem — planeie 3–4 horas. Confirme no manual do seu ano: a especificação pode ser atualizada em revisões de produção.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de válvulas — a cada 16.000 km; servico mais caro da indústria de superbikes',
    body: 'O motor SC82 com 217 HP e regime de 14.500 rpm exige regulagem de válvulas com precisão extrema. Folgas (motor frio): admissão 0,19 ± 0,03 mm / escape 0,29 ± 0,03 mm (confirme no manual 2020+). Serviço que exige desmontagem profunda do motor — não é serviço para oficinas sem experiência em superbikes de alto regime. Em concessionária Honda Racing-certificada: R$3.000–5.000. Em oficina muito especializada: R$1.500–2.500. Este é o maior custo de manutenção preventiva da RR-R e deve ser planejado no orçamento antes da compra.',
  },
  {
    severity: 'OK',
    title: 'Corrente DID 520 ERV3 ou ERT3 — lubrifique a cada 800 km; vida útil menor em uso de pista',
    body: 'O SC82 usa corrente 520 sob carga de 217 HP. A DID 520 ERV3 (R$600–900) é a especificação recomendada. Em uso de pista: lubrifique a cada 200 km e inspecione os elos a cada dia de trackday. Com potência de MotoGP numa corrente de rua 520, a vida útil cai para 10.000–12.000 km em uso misto. Pinhão/coroa: JT Sprockets ou Sunstar — configuração padrão 16T/42T (confirme no manual). A RR-R usa swingarm derivado do MotoGP com regulagem de tensão de corrente pelos excentrícos — siga o procedimento do manual para a folga correta (20–25 mm).',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70 ZR17 (F) e 200/55 ZR17 (R) — traseiro MAIS LARGO que as gerações anteriores',
    body: 'O SC82 usa traseiro 200/55 ZR17, mais largo que o 190/50 das gerações anteriores — exige pneus específicos. Pressões: 36 PSI dianteiro / 42 PSI traseiro para uso na rua. Em pista: siga as recomendações do fabricante do pneu (tipicamente 28–34 PSI dependendo do composto e temperatura). Pneus homologados para a RR-R: Pirelli Diablo Supercorsa SP V4 (vem de série), Michelin Power RS+, Bridgestone Battlax Racing R11. O traseiro mais largo melhora a estabilidade em saídas de curva, mas restringe as opções de pneus — verifique compatibilidade antes de comprar.',
  },
  {
    severity: 'OK',
    title: 'Winglets aerodinâmicos — não são estética; não os remova para uso acima de 200 km/h',
    body: 'Os winglets do SC82 são componentes funcionais que geram downforce dianteira a altas velocidades: a 200 km/h, geram ~12 kg de carga aerodinâmica sobre o eixo dianteiro. Isso melhora a estabilidade em frenagem de alta velocidade e impede o wheeling indesejado. Remover os winglets para "visual mais limpo" reduz a estabilidade acima de 200 km/h de forma mensurável. Em trackdays de alta velocidade (como autódromo de Interlagos ou Goiânia em configuração completa), os winglets fazem diferença real na segurança. Os winglets originais são caros para substituição: R$1.500–3.000 por lado importado.',
  },
  {
    severity: 'OK',
    title: 'Quickshifter/autoblipper DQS bidirecional — calibre o ponto de mudança para seu estilo',
    body: 'O SC82 tem o sistema DQS (Dual Quickshifter) bidirecional de série: trocas sem embreagem tanto para cima quanto para baixo. O sistema tem sensibilidade ajustável: nível 1 (mais sensível, ideal para pista com movimentos firmes) a nível 3 (mais tolerante, melhor para rua com trocas mais vagarosas). Para uso urbano, configure no nível 3 — trocas involuntárias no trânsito são desconfortáveis. Para pista: nível 1 ou 2. O DQS funciona melhor acima de 4.000 rpm — em velocidades muito baixas, use a embreagem normalmente para evitar trancos.',
  },
  {
    severity: 'WARN',
    title: 'Calor excessivo em tráfego urbano — motor de MotoGP gera muito mais calor que motos convencionais',
    body: 'O motor SC82 gera calor significativamente maior que superbikes convencionais em uso urbano, especialmente em trânsito parado. Isso é consequência direta do motor de especificação MotoGP com altas taxas de compressão e câmara de combustão otimizada para regime. Medidas: (1) nunca desligue o motor em paradas longas no calor — o ventilador elétrico do radiador funciona apenas com o motor ligado; (2) após parada longa em trânsito, deixe o motor em marcha lenta por 3–5 minutos antes de desligar; (3) nunca use moletom ou calça de nylon sem proteções térmicas — o calor do escapamento pode causar queimaduras.',
  },
  {
    severity: 'OK',
    title: 'Freios Brembo Stylema 4 pistões — os melhores freios de série da Honda; pastilhas Brembo SC ou Z04',
    body: 'Os Brembo Stylema são considerados as melhores pinças de freio disponíveis em motocicleta de série. Use pastilhas Brembo SC (rua/misto, R$250–350/par) ou Brembo Z04 (pista, R$350–500/par). Nunca use pastilhas genéricas — o projeto dos pistões do Stylema é sensível ao material de atrito. Fluido: Motul RBF 700 (ponto de ebulição 330°C seco) para uso em pista. Discos originais Honda (310 mm × 2): inspecione a espessura mínima a cada troca de pastilhas. Em uso de pista intenso, os discos podem atingir espessura mínima em 15.000–20.000 km.',
  },
  {
    severity: 'OK',
    title: 'Suspensão Öhlins NPX + TTX GP — fluido anual; nunca tente abrir sem ferramenta específica',
    body: 'O garfo Öhlins NPX pressurizado e o amortecedor TTX GP do SC82 são os componentes mais avançados da suspensão de série disponíveis. O NPX usa nitrогênio pressurizado no interior dos garfos — NUNCA tente abrir o garfo sem a ferramenta específica de despressurização (Öhlins tool kit). Uma abertura incorreta resulta em saída violenta de componentes pressurizados, causando risco de lesão grave. Revisão dos garfos NPX: Öhlins Service Center credenciado — R$1.000–2.000. Troque o fluido dos garfos a cada 2 anos ou 20.000 km.',
  },
  {
    severity: 'OK',
    title: 'E-Clutch (embreagem automática, disponível 2024+) — modo TC e modo Auto; aprenda antes de usar em pista',
    body: 'Os modelos SC82 de 2024+ podem ter o sistema E-Clutch (embreagem eletrônica automática) opcional. O E-Clutch permite partida e parada sem usar a alavanca de embreagem, atuando eletricamente. Em modo Auto: dispensa a embreagem completamente. Em modo TC: mantém o controle manual mas com assistência eletrônica. Em pista: use o modo Manual para controle total. O E-Clutch requer aprendizado antes de usar em velocidades altas — o comportamento é diferente de uma embreagem convencional. Revisão do atuador eletrônico: a cada 30.000 km em concessionária Honda.',
  },
]

const CBR1000RRR_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Custo de manutenção extremamente elevado — planeje R$3.000–5.000 por revisão de válvulas',
    body: 'O SC82 é a motocicleta de rua com maior custo de manutenção preventiva da Honda. Regulagem de válvulas a cada 16.000 km: R$3.000–5.000 em concessionária. Pastilhas Brembo Stylema (2 pares): R$500–1.000. Pneus Pirelli Supercorsa SP (par): R$1.800–2.800. Revisão da suspensão Öhlins: R$1.000–2.000. Kit de corrente 520 de qualidade: R$800–1.200. Estimativa de custo anual de manutenção em uso de 10.000 km/ano com trackdays mensais: R$6.000–10.000. Antes de comprar uma RR-R, calcule o custo total de propriedade — é proporcionalmente maior que qualquer outra moto Honda.',
  },
  {
    severity: 'WARN',
    title: 'Motor inapropriado para uso diário — não é uma naked, não é uma sport-touring',
    body: 'O SC82 tem 217 HP, ergonomia de corrida e suspensão calibrada para circuito. Em uso urbano diário: (1) o calor do motor no trânsito é desconfortável; (2) a posição de pilotagem causa fadiga em 30+ minutos; (3) o consumo em tráfego baixo a médio chega a 10–12 km/L com tanque de 16 L (autonomia de ~160 km em cidade); (4) qualquer queda em manobra de estacionamento causa danos de R$5.000–20.000+ em peças de carbono e titânio. A RR-R foi projetada para ir à pista. Se você quer performance para a rua: a CBR 1000 RR SC77 ou até a CB 1000 R oferecem 90% da diversão com 40% do custo de propriedade.',
  },
  {
    severity: 'WARN',
    title: 'Sistema eletrônico complexo — qualquer manutenção fora da rede autorizada pode criar conflitos de ECU',
    body: 'O SC82 tem ECU de última geração gerenciando HSTC, Cornering ABS, DQS, Öhlins eletrônico e E-Clutch (2024+) em comunicação constante via CAN bus. Substituição de qualquer sensor, atuador ou módulo eletrônico FORA da rede Honda autorizada cria o risco de incompatibilidade de firmware — resultando em falhas intermitentes impossíveis de diagnosticar sem o scanner HDS Honda. Nunca instale acessórios elétricos cortando os fios do arnês original. Use sempre conectores plug-and-play com derivação (T-harness) para qualquer adicional elétrico.',
  },
  {
    severity: 'WARN',
    title: 'Peças de reposição com alto custo e prazo de importação — estocar itens de desgaste é essencial',
    body: 'Itens exclusivos do SC82 com prazo de importação de 30–90 dias: pastilhas Brembo Stylema originais, vedações dos garfos Öhlins NPX, discos de freio 310 mm originais, winglets de carbono, tanque de titânio (modelos SP). Mantenha em estoque: 1 jogo de pastilhas Brembo SC, 1 litro de Motul RBF 600/700, 1 kit de vedações Öhlins. Um fim de semana de pista cancelado por falta de pastilhas importadas é comum entre donos de RR-R. Verifique disponibilidade de peças com revendedores antes de comprar o modelo.',
  },
  {
    severity: 'WARN',
    title: 'Não é moto para iniciantes — a potência do SC82 supera o controle em situações de emergência',
    body: 'Com 217 HP e 201 kg, a RR-R tem uma relação potência/peso que exige piloto experiente com habilidades de contra-esterçamento, transferência de peso e controle de acelerador bem desenvolvidas. O HSTC e o ABS de curva são sistemas de segurança, não substitutos de técnica. Em situação de emergência (obstáculo repentino, mancha de óleo), a resposta da moto exige reflexos treinados. Recomendação: antes de usar a RR-R em vias públicas com qualquer frequência, complete um curso de pilotagem avançada (Honda Escola de Pilotos ou equivalente) e acumule horas em pista sob supervisão.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// CBR 1000 RR-R Fireblade SP 30TH EDITION (2023–2024) — edição comemorativa
// ═══════════════════════════════════════════════════════════════════════════════

const CBR1000RRR_30TH_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Especificações técnicas idênticas ao RR-R SP — toda manutenção segue o mesmo protocolo',
    body: 'A 30TH ANNIVERSARY EDITION é o SC82 com pintura HRC Tricolor especial para comemorar os 30 anos da Fireblade (lançada em 1992). Motor, suspensão Öhlins NPX/TTX GP, freios Brembo Stylema, eletrônica e todos os intervalos de manutenção são idênticos ao RR-R SP padrão. Siga todas as recomendações do RR-R SP: óleo 10W-30 5.000 km, velas NGK ILFR6H-11 jogo de 4 a cada 16.000 km, válvulas 16.000 km, pastilhas Brembo SC. O que muda é o acabamento estético — não a mecânica.',
  },
  {
    severity: 'WARN',
    title: 'Pintura HRC Tricolor especial — dano em carenagem multiplica o custo de reparo',
    body: 'A pintura HRC Tricolor da 30TH EDITION tem maior valor de revenda que a SP padrão, o que torna qualquer dano à carenagem mais custoso. Carenagem dianteira importada: R$4.000–8.000. Bolha do tanque: R$1.500–3.000. Uma queda estática em estacionamento pode gerar danos de R$10.000–20.000 apenas em plásticos/fibra de carbono. Instale protetores de chassi (frame sliders) em pontos estratégicos — R$400–800 — e cobre a moto sempre que estacionada ao ar livre para proteger o verniz. Nunca use lava-rápido com jato de alta pressão na pintura HRC.',
  },
  {
    severity: 'OK',
    title: 'Valor de colecionador — mantenha histórico completo de manutenção; valoriza na revenda',
    body: 'A 30TH EDITION tem produção limitada e apelo de colecionador. Motos com histórico completo de manutenção documentado (notas fiscais de peças e serviços) valem 15–25% mais na revenda do que exemplares sem histórico. Mantenha toda documentação: revisões, troca de pneus, pastilhas, kit de corrente. Registre quilometragem de cada serviço. Se a moto foi à pista, documente as condições (pneus de pista separados dos de rua, fluido de freio específico). Um comprador sério de RR-R 30TH vai exigir esse histórico e a falta dele impacta diretamente o preço.',
  },
  {
    severity: 'OK',
    title: 'Seguro específico para superbike de edição limitada — valor assegurado precisa cobrir a reposição',
    body: 'A 30TH EDITION tem preço de mercado acima de R$100.000. O seguro padrão de motocicleta frequentemente subestima o valor de reposição de superbikes de edição limitada — verifique se a apólice cobre o valor real de mercado (FIPE + ágio de colecionador). Inclua na apólice: cobertura de equipamentos e acessórios (capacete de R$3.000+, jaqueta R$1.500+). Algumas seguradoras exigem rastreador dedicado para liberar cobertura de furto em superbikes acima de R$80.000 — instale antes de contratar o seguro.',
  },
]

const CBR1000RRR_30TH_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Mesmos problemas do RR-R SP padrão — calor, custo e complexidade eletrônica se aplicam igualmente',
    body: 'A 30TH EDITION compartilha todos os pontos de atenção do RR-R SP: calor excessivo em uso urbano, custo de manutenção de R$3.000–5.000 por revisão de válvulas, peças com prazo longo de importação, ergonomia de pista inadequada para uso diário e sistema eletrônico que requer ferramental Honda HDS para diagnóstico. Não presuma que o apelo de colecionador reduz os custos operacionais — é o mesmo motor SC82, as mesmas pastilhas Brembo Stylema, o mesmo garfo Öhlins NPX pressurizado. Leia os problemas do RR-R SP antes de comprar a 30TH EDITION.',
  },
  {
    severity: 'WARN',
    title: 'Peças de carenagem da edição especial com disponibilidade limitada — prazo de reposição pode superar 90 dias',
    body: 'Em caso de dano à carenagem da 30TH EDITION, as peças com pintura HRC Tricolor original não estão disponíveis em estoque no Brasil — importação sob demanda com prazo de 60–120 dias. A alternativa é repintar carenagem padrão SP na cor HRC Tricolor: R$3.000–6.000 numa boa funilaria. Se a moto tiver acidente parcial com dano em carenagem, avalie com cuidado se vale pedir peças originais (longo prazo, custo alto) ou optar pela repintura. A garantia da pintura original pode ser perdida com repintura — consulte a Honda antes de decidir.',
  },
  {
    severity: 'WARN',
    title: 'Risco de furto elevado para superbike de alto valor — investimento em segurança ativa é obrigatório',
    body: 'Superbikes com valor acima de R$100.000 são alvo frequente de furto especializado no Brasil, especialmente em capitais. Medidas mínimas obrigatórias: (1) rastreador com bloqueio remoto certificado (Autotrac, Sascar, Cobli); (2) cadeado de disco nos 2 freios dianteiros; (3) nuca de aço no eixo traseiro. Nunca deixe a moto sem cadeado em estacionamentos públicos, mesmo por curtos períodos. Em garagem: cavalete de chão + cadeado ligando a moto a ponto fixo. Furto de RR-R 30TH resultante de negligência em segurança dificilmente é coberto integralmente pelo seguro.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// Calibragens de Pneus
// ═══════════════════════════════════════════════════════════════════════════════

const TIRE_PRESSURES = [
  {
    modelName:    'CBR 1000 F',
    yearFrom:     1991,
    yearTo:       1996,
    tireSize:     '120/70 ZR17 (F) · 170/60 ZR17 (R)',
    frontPsi:     36,
    rearPsi:      40,
    frontPsiLoad: 36,
    rearPsiLoad:  42,
    notes:        'Traseiro usa 170/60 ZR17 (mais estreito que as RR). Calibrar SEMPRE com pneus frios. GT de longa distância: pressão adequada aumenta autonomia e durabilidade dos pneus.',
  },
  {
    modelName:    'CBR 1000 RR Fireblade',
    yearFrom:     2004,
    yearTo:       2020,
    tireSize:     '120/70 ZR17 (F) · 190/50 ZR17 (R)',
    frontPsi:     36,
    rearPsi:      42,
    frontPsiLoad: 36,
    rearPsiLoad:  42,
    notes:        'Superbike sem garupa habitual. Em pista: siga recomendação do fabricante do pneu (tipicamente 28–34 PSI dependendo do composto e temperatura ambiente). Nunca use abaixo de 32 PSI na rua.',
  },
  {
    modelName:    'CBR 1000 RR Fireblade SP',
    yearFrom:     2017,
    yearTo:       2020,
    tireSize:     '120/70 ZR17 (F) · 190/50 ZR17 (R)',
    frontPsi:     36,
    rearPsi:      42,
    frontPsiLoad: 36,
    rearPsiLoad:  42,
    notes:        'Mesmos pneus da RR padrão SC77. Em uso de pista com Pirelli Supercorsa SP: siga a tabela Pirelli de temperatura e pressão. Öhlins Smart EC pode ser afetado por pressões fora do padrão (sag muda).',
  },
  {
    modelName:    'CBR 1000 RR-R Fireblade SP',
    yearFrom:     2020,
    yearTo:       2026,
    tireSize:     '120/70 ZR17 (F) · 200/55 ZR17 (R)',
    frontPsi:     36,
    rearPsi:      42,
    frontPsiLoad: 36,
    rearPsiLoad:  42,
    notes:        'Traseiro 200/55 ZR17 — MAIS LARGO que as gerações anteriores. Pneus específicos: Pirelli Diablo Supercorsa SP V4 (original de série). Em pista: consulte o tech sheet Pirelli para a temperatura ideal. Verifique sempre com o motor frio.',
  },
  {
    modelName:    'CBR 1000 RR-R Fireblade SP 30TH EDITION',
    yearFrom:     2023,
    yearTo:       2024,
    tireSize:     '120/70 ZR17 (F) · 200/55 ZR17 (R)',
    frontPsi:     36,
    rearPsi:      42,
    frontPsiLoad: 36,
    rearPsiLoad:  42,
    notes:        'Mesma especificação do RR-R SP padrão. Pneus Pirelli Supercorsa SP V4 de série. Calibrar frios. Em pista: siga recomendação Pirelli para o composto utilizado.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// Itens de Manutenção
// ═══════════════════════════════════════════════════════════════════════════════

const MANUTENCAO: MaintenanceItemInput[] = [
  // CBR 1000 F
  { modelName: 'CBR 1000 F', yearFrom: 1991, yearTo: 1996, component: 'Óleo do motor (10W-40 JASO MA2) + filtro', intervalKm: 5000, intervalMonths: 6, notes: '~4,0 L com filtro. Motul 7100 4T, Honda HP4 ou Castrol Power1 Racing.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CBR 1000 F', yearFrom: 1991, yearTo: 1996, component: 'Velas de ignição (NGK CR9EH-9) — jogo de 4', intervalKm: 12000, intervalMonths: 24, notes: 'Gap 0,8–0,9 mm. Iridium NGK CR9EIX dura ~20.000 km. Verifique cabos de vela (HT leads).', priority: 'HIGH', order: 2 },
  { modelName: 'CBR 1000 F', yearFrom: 1991, yearTo: 1996, component: 'Regulagem de válvulas (DOHC 16 válvulas)', intervalKm: 12000, intervalMonths: 24, notes: 'Adm: 0,08–0,18 mm / Esc: 0,18–0,28 mm frio. Intervalo menor que nas RR modernas.', priority: 'CRITICAL', order: 3 },
  { modelName: 'CBR 1000 F', yearFrom: 1991, yearTo: 1996, component: 'Sincronismo dos 4 carburadores Keihin VB40A', intervalKm: 8000, intervalMonths: 12, notes: 'Synchrometer nas 4 tomadas de vácuo. Marcha lenta 1.000–1.200 rpm.', priority: 'HIGH', order: 4 },
  { modelName: 'CBR 1000 F', yearFrom: 1991, yearTo: 1996, component: 'Lubrificação da corrente de transmissão (530)', intervalKm: 800, intervalMonths: null, notes: 'Spray de corrente específico. Folga: 20–30 mm ponto médio inferior.', priority: 'HIGH', order: 5 },
  { modelName: 'CBR 1000 F', yearFrom: 1991, yearTo: 1996, component: 'Verificação/ajuste da tensão da corrente (530)', intervalKm: 3000, intervalMonths: 1, notes: 'Ajuste pelos excentrícos do eixo traseiro. Verifique desgaste lateral dos elos.', priority: 'HIGH', order: 6 },
  { modelName: 'CBR 1000 F', yearFrom: 1991, yearTo: 1996, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro de papel original. Verificar vedações da caixa de ar ao reinstalar.', priority: 'MEDIUM', order: 7 },
  { modelName: 'CBR 1000 F', yearFrom: 1991, yearTo: 1996, component: 'Fluido de freio (DOT 4) — 3 circuitos', intervalKm: null, intervalMonths: 24, notes: '~400–500 mL total. Pastilhas EBC HH ou Brembo SC superam o original.', priority: 'HIGH', order: 8 },
  { modelName: 'CBR 1000 F', yearFrom: 1991, yearTo: 1996, component: 'Líquido de arrefecimento (etileno-glicol 50/50)', intervalKm: null, intervalMonths: 24, notes: '~2,4 L. Nunca água pura. Verificar estado das mangueiras de borracha (30+ anos).', priority: 'HIGH', order: 9 },
  { modelName: 'CBR 1000 F', yearFrom: 1991, yearTo: 1996, component: 'Óleo do garfo telescópico + retentores', intervalKm: 25000, intervalMonths: null, notes: 'Honda SS-8 (10W). Substituir retentores se houver mancha de óleo nos tubos.', priority: 'MEDIUM', order: 10 },
  { modelName: 'CBR 1000 F', yearFrom: 1991, yearTo: 1996, component: 'Kit de transmissão (corrente 530 + coroa + pinhão)', intervalKm: 20000, intervalMonths: null, notes: 'DID 530ZVM-X + JT Sprockets. Troque os 3 juntos. Configuração padrão 15T/42T.', priority: 'HIGH', order: 11 },
  { modelName: 'CBR 1000 F', yearFrom: 1991, yearTo: 1996, component: 'Verificação do regulador/retificador + estátor', intervalKm: null, intervalMonths: 12, notes: 'Tensão de carga: 13,8–14,8 V a 4.000 rpm. Inspecionar conector de 6 vias.', priority: 'HIGH', order: 12 },

  // CBR 1000 RR Fireblade
  { modelName: 'CBR 1000 RR Fireblade', yearFrom: 2004, yearTo: 2020, component: 'Óleo do motor (10W-30 JASO MA2) + filtro', intervalKm: 5000, intervalMonths: 6, notes: '~3,8 L com filtro. Motul 7100 4T 10W-30 ou Honda HP4. Em pista: troque a cada 3.000 km.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CBR 1000 RR Fireblade', yearFrom: 2004, yearTo: 2020, component: 'Velas de ignição (NGK IMR9C-9H iridium) — jogo de 4', intervalKm: 16000, intervalMonths: 24, notes: 'Gap 0,8 mm. Específica da RR — não substitua por CR9EH-9. Troque o jogo completo.', priority: 'HIGH', order: 2 },
  { modelName: 'CBR 1000 RR Fireblade', yearFrom: 2004, yearTo: 2020, component: 'Regulagem de válvulas (DOHC 16 válvulas)', intervalKm: 16000, intervalMonths: 24, notes: 'Adm: 0,16 ± 0,03 mm / Esc: 0,27 ± 0,03 mm frio. Serviço de R$900–2.500.', priority: 'CRITICAL', order: 3 },
  { modelName: 'CBR 1000 RR Fireblade', yearFrom: 2004, yearTo: 2020, component: 'Lubrificação da corrente de transmissão (520)', intervalKm: 800, intervalMonths: null, notes: 'DID 520 ERV3 ou ZVM-X. Spray de corrente específico. Em pista: a cada 200–300 km.', priority: 'HIGH', order: 4 },
  { modelName: 'CBR 1000 RR Fireblade', yearFrom: 2004, yearTo: 2020, component: 'Verificação/ajuste da tensão da corrente (520)', intervalKm: 3000, intervalMonths: 1, notes: 'Folga: 20–30 mm. Inspecione desgaste nos elos — corrente afilada = troca imediata.', priority: 'HIGH', order: 5 },
  { modelName: 'CBR 1000 RR Fireblade', yearFrom: 2004, yearTo: 2020, component: 'Filtro de ar (ou K&N HA-1004 lavável)', intervalKm: 12000, intervalMonths: 12, notes: 'K&N washable é upgrade econômico. Não aplique óleo K&N em excesso (pode atingir sensor MAP).', priority: 'MEDIUM', order: 6 },
  { modelName: 'CBR 1000 RR Fireblade', yearFrom: 2004, yearTo: 2020, component: 'Fluido de freio (DOT 4 ou Motul RBF 600)', intervalKm: null, intervalMonths: 24, notes: 'Motul RBF 600 para uso esportivo/pista. Com ABS: sangramento requer procedimento específico.', priority: 'HIGH', order: 7 },
  { modelName: 'CBR 1000 RR Fireblade', yearFrom: 2004, yearTo: 2020, component: 'Líquido de arrefecimento (etileno-glicol 50/50)', intervalKm: null, intervalMonths: 24, notes: '~2,7 L. Honda Long Life Coolant roxo ou equivalente. Verificar termostato a cada 30.000 km.', priority: 'HIGH', order: 8 },
  { modelName: 'CBR 1000 RR Fireblade', yearFrom: 2004, yearTo: 2020, component: 'Óleo e vedações do garfo dianteiro', intervalKm: 25000, intervalMonths: null, notes: 'Showa BPF (SC77) ou garfo convencional (SC57/SC59). Honda SS-8 ou Motul Fork Oil 10W.', priority: 'MEDIUM', order: 9 },
  { modelName: 'CBR 1000 RR Fireblade', yearFrom: 2004, yearTo: 2020, component: 'Kit de transmissão (corrente 520 + coroa + pinhão)', intervalKm: 15000, intervalMonths: null, notes: 'Em uso esportivo: 12.000 km. DID 520 ZVM-X + JT Sprockets. Configuração 16T/42T padrão.', priority: 'HIGH', order: 10 },
  { modelName: 'CBR 1000 RR Fireblade', yearFrom: 2004, yearTo: 2020, component: 'Verificação do regulador/retificador + estátor', intervalKm: null, intervalMonths: 12, notes: 'Tensão: 13,8–14,8 V a 4.000 rpm. SC57/SC59: upgrade MOSFET recomendado acima de 40.000 km.', priority: 'HIGH', order: 11 },
  { modelName: 'CBR 1000 RR Fireblade', yearFrom: 2008, yearTo: 2020, component: 'Limpeza da IACV (Idle Air Control Valve)', intervalKm: 20000, intervalMonths: null, notes: 'SC59/SC77: válvula entope com verniz após parada prolongada. Spray TBI Wurth/Motul.', priority: 'MEDIUM', order: 12 },

  // CBR 1000 RR Fireblade SP
  { modelName: 'CBR 1000 RR Fireblade SP', yearFrom: 2017, yearTo: 2020, component: 'Óleo do motor (10W-30 JASO MA2) + filtro', intervalKm: 5000, intervalMonths: 6, notes: '~3,8 L com filtro. Mesmo motor da RR padrão SC77. Em pista: 3.000 km.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CBR 1000 RR Fireblade SP', yearFrom: 2017, yearTo: 2020, component: 'Velas de ignição (NGK IMR9C-9H) — jogo de 4', intervalKm: 16000, intervalMonths: 24, notes: 'Idêntico à RR SC77 padrão. Gap 0,8 mm. Troque o jogo completo.', priority: 'HIGH', order: 2 },
  { modelName: 'CBR 1000 RR Fireblade SP', yearFrom: 2017, yearTo: 2020, component: 'Regulagem de válvulas (DOHC 16 válvulas)', intervalKm: 16000, intervalMonths: 24, notes: 'Mesmo motor SC77. Custo R$1.500–2.500 em oficina especializada.', priority: 'CRITICAL', order: 3 },
  { modelName: 'CBR 1000 RR Fireblade SP', yearFrom: 2017, yearTo: 2020, component: 'Fluido dos garfos Öhlins NPX + fluido amortecedor TTX', intervalKm: null, intervalMonths: 24, notes: 'Apenas Öhlins Fork Oil 01 (1W) nos garfos. NUNCA abra os garfos sem ferramenta de despressurização.', priority: 'HIGH', order: 4 },
  { modelName: 'CBR 1000 RR Fireblade SP', yearFrom: 2017, yearTo: 2020, component: 'Pastilhas Brembo M50 (2 pares dianteiro)', intervalKm: null, intervalMonths: null, notes: 'Brembo SC (rua) ou Z04 (pista). Nunca use pastilhas genéricas nos pistões M50.', priority: 'HIGH', order: 5 },
  { modelName: 'CBR 1000 RR Fireblade SP', yearFrom: 2017, yearTo: 2020, component: 'Lubrificação da corrente (520)', intervalKm: 800, intervalMonths: null, notes: 'Em pista: a cada 200–300 km. DID 520 ZVM-X recomendado.', priority: 'HIGH', order: 6 },
  { modelName: 'CBR 1000 RR Fireblade SP', yearFrom: 2017, yearTo: 2020, component: 'Kit de transmissão (corrente 520 + coroa + pinhão)', intervalKm: 12000, intervalMonths: null, notes: 'Vida útil menor em uso de pista frequente. DID 520 ZVM-X + JT Sprockets.', priority: 'HIGH', order: 7 },
  { modelName: 'CBR 1000 RR Fireblade SP', yearFrom: 2017, yearTo: 2020, component: 'Fluido de freio (Motul RBF 600/700)', intervalKm: null, intervalMonths: 24, notes: 'RBF 700 recomendado para uso de pista. Sangramento com ABS requer procedimento específico Honda HDS.', priority: 'HIGH', order: 8 },
  { modelName: 'CBR 1000 RR Fireblade SP', yearFrom: 2017, yearTo: 2020, component: 'Líquido de arrefecimento (etileno-glicol 50/50)', intervalKm: null, intervalMonths: 24, notes: '~2,7 L. Honda Long Life Coolant. Verificar termostato a cada 30.000 km.', priority: 'HIGH', order: 9 },
  { modelName: 'CBR 1000 RR Fireblade SP', yearFrom: 2017, yearTo: 2020, component: 'Verificação da IMU (Inertial Measurement Unit)', intervalKm: null, intervalMonths: 12, notes: 'Recalibração obrigatória após queda com impacto lateral. Exige ferramenta Honda HDS.', priority: 'MEDIUM', order: 10 },

  // CBR 1000 RR-R Fireblade SP
  { modelName: 'CBR 1000 RR-R Fireblade SP', yearFrom: 2020, yearTo: 2026, component: 'Óleo do motor (10W-30 JASO MA2) + filtro', intervalKm: 5000, intervalMonths: 6, notes: '~3,8 L com filtro. Motul 300V 4T para uso de pista. Em pista: 3.000 km ou por fim de semana.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CBR 1000 RR-R Fireblade SP', yearFrom: 2020, yearTo: 2026, component: 'Velas de ignição (NGK ILFR6H-11 iridium duplo) — jogo de 4', intervalKm: 16000, intervalMonths: 24, notes: 'Gap 1,1 mm — específicas do SC82. Não substitua por velas de gap menor.', priority: 'HIGH', order: 2 },
  { modelName: 'CBR 1000 RR-R Fireblade SP', yearFrom: 2020, yearTo: 2026, component: 'Regulagem de válvulas (DOHC 16 válvulas SC82)', intervalKm: 16000, intervalMonths: 24, notes: 'Adm: 0,19 ± 0,03 mm / Esc: 0,29 ± 0,03 mm. Custo R$3.000–5.000 em concessionária.', priority: 'CRITICAL', order: 3 },
  { modelName: 'CBR 1000 RR-R Fireblade SP', yearFrom: 2020, yearTo: 2026, component: 'Lubrificação da corrente (520)', intervalKm: 800, intervalMonths: null, notes: 'Em pista: a cada 200 km. DID 520 ERV3 ou superior. 217 HP exige corrente em perfeito estado.', priority: 'HIGH', order: 4 },
  { modelName: 'CBR 1000 RR-R Fireblade SP', yearFrom: 2020, yearTo: 2026, component: 'Kit de transmissão (corrente 520 + coroa + pinhão)', intervalKm: 12000, intervalMonths: null, notes: 'DID 520 ERV3/ZVM-X + JT Sprockets. Inspecione a cada 5.000 km em uso esportivo.', priority: 'HIGH', order: 5 },
  { modelName: 'CBR 1000 RR-R Fireblade SP', yearFrom: 2020, yearTo: 2026, component: 'Pastilhas Brembo Stylema (2 pares dianteiro)', intervalKm: null, intervalMonths: null, notes: 'Brembo SC (rua) ou Z04 (pista). Motul RBF 700 para fluido de pista.', priority: 'HIGH', order: 6 },
  { modelName: 'CBR 1000 RR-R Fireblade SP', yearFrom: 2020, yearTo: 2026, component: 'Fluido dos garfos Öhlins NPX pressurizado', intervalKm: null, intervalMonths: 24, notes: 'Apenas Öhlins Fork Oil 01. NUNCA abra sem ferramenta de despressurização — risco de lesão.', priority: 'HIGH', order: 7 },
  { modelName: 'CBR 1000 RR-R Fireblade SP', yearFrom: 2020, yearTo: 2026, component: 'Fluido de freio (Motul RBF 700 DOT 4)', intervalKm: null, intervalMonths: 12, notes: 'Troca anual em uso de pista frequente. Sangramento Cornering ABS: procedimento HDS obrigatório.', priority: 'HIGH', order: 8 },
  { modelName: 'CBR 1000 RR-R Fireblade SP', yearFrom: 2020, yearTo: 2026, component: 'Líquido de arrefecimento (etileno-glicol 50/50)', intervalKm: null, intervalMonths: 24, notes: 'Honda Long Life Coolant. Motor SC82 gera muito calor — verifique nível mensalmente.', priority: 'HIGH', order: 9 },
  { modelName: 'CBR 1000 RR-R Fireblade SP', yearFrom: 2020, yearTo: 2026, component: 'Verificação/calibração da IMU 6 eixos', intervalKm: null, intervalMonths: 12, notes: 'Recalibração após queda ou impacto. Ferramenta Honda HDS obrigatória.', priority: 'MEDIUM', order: 10 },
  { modelName: 'CBR 1000 RR-R Fireblade SP', yearFrom: 2020, yearTo: 2026, component: 'Revisão do sistema DQS (quickshifter bidirecional)', intervalKm: 20000, intervalMonths: null, notes: 'Verificar sensores de carga no seletor de marchas. Em caso de falha: oficina autorizada Honda.', priority: 'MEDIUM', order: 11 },
  { modelName: 'CBR 1000 RR-R Fireblade SP', yearFrom: 2020, yearTo: 2026, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Original Honda ou K&N equivalente. Nunca rode sem filtro — dano imediato aos injetores.', priority: 'MEDIUM', order: 12 },

  // CBR 1000 RR-R Fireblade SP 30TH EDITION
  { modelName: 'CBR 1000 RR-R Fireblade SP 30TH EDITION', yearFrom: 2023, yearTo: 2024, component: 'Óleo do motor (10W-30 JASO MA2) + filtro', intervalKm: 5000, intervalMonths: 6, notes: 'Idêntico ao RR-R SP padrão. ~3,8 L com filtro. Motul 300V 4T ou Honda HP4.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CBR 1000 RR-R Fireblade SP 30TH EDITION', yearFrom: 2023, yearTo: 2024, component: 'Velas (NGK ILFR6H-11 iridium duplo) — jogo de 4', intervalKm: 16000, intervalMonths: 24, notes: 'Gap 1,1 mm. Mesma especificação do RR-R SP.', priority: 'HIGH', order: 2 },
  { modelName: 'CBR 1000 RR-R Fireblade SP 30TH EDITION', yearFrom: 2023, yearTo: 2024, component: 'Regulagem de válvulas (DOHC 16 válvulas SC82)', intervalKm: 16000, intervalMonths: 24, notes: 'Mesmo motor SC82. Custo R$3.000–5.000. Não postergue além do intervalo.', priority: 'CRITICAL', order: 3 },
  { modelName: 'CBR 1000 RR-R Fireblade SP 30TH EDITION', yearFrom: 2023, yearTo: 2024, component: 'Pastilhas Brembo Stylema + fluido de freio RBF 700', intervalKm: null, intervalMonths: 24, notes: 'Brembo SC (rua) ou Z04 (pista). Fluido: Motul RBF 700 para uso esportivo.', priority: 'HIGH', order: 4 },
  { modelName: 'CBR 1000 RR-R Fireblade SP 30TH EDITION', yearFrom: 2023, yearTo: 2024, component: 'Lubrificação da corrente + kit relação (520)', intervalKm: 800, intervalMonths: null, notes: 'Lubrificação 800 km. Kit completo a cada 12.000 km em uso misto.', priority: 'HIGH', order: 5 },
  { modelName: 'CBR 1000 RR-R Fireblade SP 30TH EDITION', yearFrom: 2023, yearTo: 2024, component: 'Fluido Öhlins NPX (garfo) + amortecedor TTX GP', intervalKm: null, intervalMonths: 24, notes: 'Öhlins Fork Oil 01 apenas. Revisão por Centro de Serviço Öhlins credenciado.', priority: 'HIGH', order: 6 },
  { modelName: 'CBR 1000 RR-R Fireblade SP 30TH EDITION', yearFrom: 2023, yearTo: 2024, component: 'Filtro de ar + líquido de arrefecimento', intervalKm: 12000, intervalMonths: 24, notes: 'Arrefecimento: Honda Long Life Coolant 50/50 em água destilada. ~2,5 L.', priority: 'HIGH', order: 7 },
  { modelName: 'CBR 1000 RR-R Fireblade SP 30TH EDITION', yearFrom: 2023, yearTo: 2024, component: 'Verificação da IMU + calibração do DQS', intervalKm: null, intervalMonths: 12, notes: 'Recalibração após queda. Ferramenta Honda HDS obrigatória para diagnóstico eletrônico.', priority: 'MEDIUM', order: 8 },
]

// ═══════════════════════════════════════════════════════════════════════════════
// BLOCKS
// ═══════════════════════════════════════════════════════════════════════════════

const BLOCKS = [
  { modelName: 'CBR 1000 F',                             yearFrom: 1991, yearTo: 1996, MACETES: CBR1000F_MACETES,        PROBLEMAS: CBR1000F_PROBLEMAS },
  { modelName: 'CBR 1000 RR Fireblade',                  yearFrom: 2004, yearTo: 2020, MACETES: CBR1000RR_MACETES,       PROBLEMAS: CBR1000RR_PROBLEMAS },
  { modelName: 'CBR 1000 RR Fireblade SP',               yearFrom: 2017, yearTo: 2020, MACETES: CBR1000RR_SP_MACETES,    PROBLEMAS: CBR1000RR_SP_PROBLEMAS },
  { modelName: 'CBR 1000 RR-R Fireblade SP',             yearFrom: 2020, yearTo: 2026, MACETES: CBR1000RRR_MACETES,      PROBLEMAS: CBR1000RRR_PROBLEMAS },
  { modelName: 'CBR 1000 RR-R Fireblade SP 30TH EDITION',yearFrom: 2023, yearTo: 2024, MACETES: CBR1000RRR_30TH_MACETES, PROBLEMAS: CBR1000RRR_30TH_PROBLEMAS },
]

// ═══════════════════════════════════════════════════════════════════════════════
// Runner
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map(t => ({ ...t, category: 'MACETES' as Cat })),
      ...block.PROBLEMAS.map(t => ({ ...t, category: 'PROBLEMAS' as Cat })),
    ]

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })
    await prisma.tip.createMany({
      data: allTips.map((tip, i) => ({
        modelName: block.modelName,
        yearFrom:  null,
        yearTo:    null,
        severity:  tip.severity,
        category:  tip.category,
        title:     tip.title,
        body:      tip.body,
        order:     i,
      })),
    })

    console.log(`✅ ${block.modelName}: ${allTips.length} tips`)
  }

  // TirePressures
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`🔵 TirePressure: ${tp.modelName}`)
  }

  // MaintenanceItems
  const modelNames = BLOCKS.map(b => b.modelName)
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: modelNames } } })
  await prisma.maintenanceItem.createMany({ data: MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${MANUTENCAO.length} itens`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
