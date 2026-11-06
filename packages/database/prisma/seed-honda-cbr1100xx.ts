// seed-honda-cbr1100xx.ts — Honda CBR 1100 XX SuperBlackbird (1997–2006)
// FIPE: "CBR 1100 XX SUPER BLACKBIRD" (código 2773) — SC35 (1137cc)
// SC35-I (1997–1998): 4 carburadores Keihin VB40G 40mm
// SC35-II (1999–2006): injeção PGM-FI — primeira Honda esportiva com injeção eletrônica
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

// ─── CBR 1100 XX SuperBlackbird — Macetes ─────────────────────────────────────

const CBR1100XX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — 3,7 L com filtro; motor inline-4 DOHC 1.137cc exige qualidade',
    body: 'Motor SC35 de 1.137cc DOHC 16 válvulas exige óleo 10W-40 com certificação JASO MA ou MA2 (embreagem úmida). Capacidade: ~3,4 L sem filtro; 3,7 L com filtro novo. Use sempre óleo 4T certificado: Motul 7100 4T 10W-40, Honda HP4 10W-40, Castrol Power1 Racing 10W-40. Nunca óleo para carro — modificadores de atrito destroem a embreagem multidisco molhada. Troque a cada 5.000 km em uso misto ou 3.000 km em uso urbano intenso. Em motos adquiridas sem histórico, faça a primeira troca imediatamente e inspecione o óleo retirado: brilho metálico pode indicar desgaste de componentes internos.',
  },
  {
    severity: 'OK',
    title: 'Duas gerações na mesma família — carburado (1997–1998) vs. injeção PGM-FI (1999–2006)',
    body: 'A SuperBlackbird existe em duas gerações distintas com manutenção diferente: (1) SC35-I (1997–1998): 4 carburadores Keihin VB40G 40mm com venturi constante — exige sincronização dos carbs a cada 12.000 km e jets de mistura ajustados para altitude/temperatura. Carburadores entopem com gasolina com alto teor de etanol brasileiro; (2) SC35-II (1999–2006): injeção PGM-FI — primeira Honda de grande cilindrada esportiva com injeção eletrônica; sistema mais confiável e adaptável ao etanol, porém bomba e injetores têm vida útil limitada. Ao comprar uma SuperBlackbird usada, identifique a geração: carburada tem 4 câmaras de carburador visíveis na lateral do motor; injetada tem 4 corpos de injeção com rail de combustível.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK CR9EH-9 — jogo de 4; gap 0,9 mm; troca a cada 12.000 km',
    body: 'Motor inline-4 = 4 velas. Vela padrão para todas as gerações: NGK CR9EH-9 (gap 0,9 mm, código de calor 9 = fria, ideal para motor de alta performance). Opção iridium: NGK DCPR9EIX (gap pré-ajustado, durabilidade ~24.000 km, vale o investimento pela dificuldade de acesso). Troque sempre o jogo completo de 4 — uma vela com gap diferente cria desequilíbrio perceptível em motor de 1.137cc de alta rotação. Torque de aperto: 16 N.m. A troca na SuperBlackbird exige remoção do airbox e parte do semi-carenamento frontal — serviço de 2–3 horas em oficina. Na versão carburada, verifique a cor das velas para diagnóstico de mistura: bege = ideal; branca = mistura pobre; preta e oleosa = mistura rica ou anel de pistão.',
  },
  {
    severity: 'WARN',
    title: 'Sincronização dos 4 carburadores (modelos 1997–1998) — obrigatória a cada 12.000 km; use manômetro de coluna de mercúrio',
    body: 'Os 4 carburadores Keihin VB40G do SC35-I devem estar sincronizados (mesma depressão no coletor) para funcionamento suave. Fora de sincronismo: vibração excessiva em marcha lenta, instabilidade entre marchas, consumo irregular. A sincronização exige manômetro de 4 colunas (vacuômetro) ligado ao coletor de admissão de cada cilindro — depressão-alvo: ~26 cmHg (350 mbar) em todos os cilindros uniformemente. Serviço que requer acesso com o airbox removido. Em oficina especializada: R$200–400. A CBR 1100 XX carburada foi importada principalmente por particulares do Japão (JDM) sem restrição de potência — esses carbs estão calibrados para 164 HP e combustível japonês. Com a gasolina brasileira (base etanol), a agulha do carburador pode precisar de ajuste fino de um clique para mistura ligeiramente mais rica.',
  },
  {
    severity: 'OK',
    title: 'Garfo invertido Ø43 mm ajustável — configure para seu peso e estilo de pilotagem',
    body: 'A SuperBlackbird usa garfo invertido de 43 mm (diferente dos garfos telescópicos convencionais) com ajuste de compressão e extensão. Para piloto solo até 80 kg em uso estrada/touring: compressão em configuração-fábrica (geralmente 2 cliques a partir do totalmente fechado). Para piloto pesado (+95 kg) ou uso esportivo: adicione 2–3 cliques de compressão. Para uso touring com garupa + bagagem: adicione 2–4 cliques de compressão no amortecedor traseiro + aumente pré-carga. O garfo invertido da SuperBlackbird é mais resistente a torsão que garfo convencional mas os retentores de 43 mm são mais caros — substitua assim que houver qualquer vazamento de óleo no tubo, pois óleo no disco dianteiro reduz frenagem em 40–60%.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão 530 — lubrifique a cada 800 km; kit completo (DID + JT) a cada 20.000 km',
    body: 'A SuperBlackbird usa corrente padrão 530 × 108 elos. Com 256 kg em ordem de marcha, a transmissão final carrega peso elevado. Lubrifique a cada 800–1.000 km com spray de corrente específico para o-ring (Motul Chain Paste, WD-40 Specialist Moto). Folga correta no ponto médio inferior da corrente: 20–30 mm. Kit transmissão recomendado: DID 530ZVM-X (corrente x-ring de alta performance) + JT Sprockets JTF1321 pinhão (17T) + JTR1332 coroa (40T) — substitua sempre os 3 juntos. Nunca instale corrente nova em coroa/pinhão desgastados: a nova corrente salta dos dentes antigos durante aceleração intensa, com risco de bloqueio da roda traseira.',
  },
  {
    severity: 'OK',
    title: 'A SuperBlackbird foi a moto de série mais rápida do mundo em 1996 — mas pilotagem no Brasil exige adaptação',
    body: 'A Honda CBR 1100 XX SuperBlackbird foi lançada em 1996 especificamente para destronar a Kawasaki ZX-11 e retomar o título de moto de produção mais rápida do mundo — alcançava 300+ km/h. O nome "Blackbird" homenageia o avião espião SR-71 Blackbird, o avião mais rápido do mundo. No Brasil, o exemplar típico em circulação é importado do Japão (JDM), com 164 HP sem restrições. Para uso em estradas brasileiras: (1) a aerodinâmica da carenagem integral a torna extremamente estável em alta velocidade; (2) em baixas rotações (<4.000 rpm) em trânsito, o motor grande esquenta bastante; (3) a posição de pilotagem é mais ereta (sport-touring) do que a CBR 900 RR, facilitando viagens longas. Ideal para rodovias — não é a moto ideal para trânsito urbano intenso.',
  },
  {
    severity: 'OK',
    title: 'Regulador/retificador MOSFET — substitua preventivamente o original tipo SCRI antes que destrua o estátor',
    body: 'O regulador/retificador original da SuperBlackbird SC35 é do tipo SCRI (dissipação por resistência), que converte o excesso de energia elétrica em calor. Em uso brasileiro — trânsito, temperatura elevada, farol sempre aceso — esse calor se acumula e carboniza progressivamente o conector de 6 vias do regulador. O upgrade preventivo ao regulador MOSFET (Shindengen SH847-12, Rick\'s Motorsport ou equivalente) é um dos investimentos mais importantes em motos Honda de grande cilindrada: o MOSFET controla o excesso de energia sem gerar calor excessivo. Custo: R$300–600 importado. Diagnóstico rápido: tensão nos terminais da bateria com motor em 4.000 rpm deve estar entre 13,8 V e 14,8 V. Valores fora dessa faixa indicam regulador com defeito.',
  },
  {
    severity: 'OK',
    title: 'Freios duplos dianteiros 4 pistões 310 mm — pastilhas sinterizadas EBC HH superam o original com o peso da moto',
    body: 'A SuperBlackbird tem sistema de freio dianteiro duplo com discos 310 mm e pinças de 4 pistões cada (2 pares). Com 256 kg em ordem de marcha + piloto, a capacidade de desaceleração é crítica. As pastilhas originais Honda são adequadas, mas pastilhas sinterizadas EBC HH (R$120–180/par, necessário 2 pares) ou Brembo SC (R$160–240/par) oferecem melhor mordida inicial, menos fade térmico em frenagem longa em descidas e maior durabilidade. O fluido DOT 4 deve estar em dia — com 4 pistões por pinça e 2 pinças, o sistema gera temperatura considerável em frenagem intensa. Troque as pastilhas em pares por pinça (nunca só uma pinça) para manter frenagem simétrica.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 22 litros e consumo 15–18 km/L — autonomia até 380 km em rodovia',
    body: 'Com tanque de 22 litros e motor de 1.137cc, a SuperBlackbird surpreende pelo consumo relativamente econômico para sua cilindrada: 15–18 km/L em rodovias a 100–120 km/h, graças à aerodinâmica otimizada da carenagem integral. Em trânsito urbano: 12–14 km/L. Pilotagem esportiva com acelerações frequentes: 10–12 km/L. A luz de reserva acende com ~3,5 L restantes. Use sempre gasolina de qualidade: a PGM-FI (modelos 1999+) adapta a mistura ao teor de etanol, mas injetores se degradam com combustível adulterado. Nas versões carburadas (1997–1998), evite gasolina com mais de 20% de etanol — os jets dos carburadores foram calibrados para combustível de baixo teor de etanol.',
  },
  {
    severity: 'OK',
    title: 'IACV (Idle Air Control Valve) — limpeza obrigatória nos modelos PGM-FI (1999–2006) a cada 20.000 km',
    body: 'Os modelos SuperBlackbird com injeção PGM-FI (1999–2006) possuem a válvula IACV que controla a quantidade de ar em marcha lenta. Com o tempo, depósitos de óleo de blow-by e poeira entupem o pequeno orifício de controle. Sintomas: marcha lenta instável (sobe e desce entre 900–1.500 rpm), motor afoga logo após a partida a frio, dificuldade de manter marcha lenta consistente. Limpeza: spray de carburador/limpador de throttle body no orifício da IACV sem desmontagem completa. Se a limpeza não resolver, a IACV original Honda custa R$400–700; alternativa: verificar se os parafusos de ajuste de marcha lenta dos 4 corpos de injeção estão uniformes.',
  },
  {
    severity: 'OK',
    title: 'Pneus Michelin Road 6 ou Bridgestone T32 — perfil sport-touring ideal para a SuperBlackbird',
    body: 'A SuperBlackbird é uma moto de sport-touring: rápida em estradas mas confortável para viagens longas. Os pneus ideais refletem esse caráter: Michelin Road 6 (120/70 ZR17 dianteiro + 180/55 ZR17 traseiro) ou Bridgestone Battlax T32 oferecem a combinação certa de aderência, durabilidade e conforto. Evite pneus puramente esportivos (Pirelli Diablo Supercorsa, Bridgestone RS11) na SuperBlackbird — o composto super-macio se desgasta rapidamente com o peso de 256 kg e as viagens longas. Pressões corretas calibradas frios: 36 PSI dianteiro / 40 PSI traseiro solo; 36 PSI / 43 PSI com garupa e carga. Verifique o código DOT dos pneus em motos paradas — pneus com mais de 6 anos devem ser substituídos independente do aspecto.',
  },
]

// ─── CBR 1100 XX SuperBlackbird — Problemas ───────────────────────────────────

const CBR1100XX_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Tensor da corrente de comando com ruído na partida a frio — risco imediato de destruição do motor',
    body: 'O SC35 usa tensionador hidráulico de corrente de comando. Em motores de alta quilometragem (80.000+ km) ou com longos períodos parados, o tensionador pode perder pressão, resultando em folga na corrente de cames. Sintoma de alerta: ruído seco tipo "tick-tick-tick" nos primeiros 15–30 segundos após partida a frio que desaparece com o aquecimento. Se ignorado progressivamente, a corrente pula um dente do comando, causando colisão entre pistões e válvulas. Custo de rebuild de motor após esse evento: R$15.000–30.000 dependendo dos danos. Qualquer ruído suspeito de corrente deve ser investigado ANTES de ligar o motor pela segunda vez. Em motos compradas sem histórico documentado, inspecione o guia de corrente pelo visor de inspeção da tampa lateral do motor.',
  },
  {
    severity: 'DANGER',
    title: 'Regulador/retificador original destrói o estátor progressivamente — falha elétrica total sem aviso claro',
    body: 'O regulador/retificador tipo SCRI original da SuperBlackbird dissipa o excesso de energia em calor direto. O conector de 6 vias é o ponto de falha: oxida e carboniza gradualmente, a resistência elétrica aumenta, o calor cresce — ciclo destrutivo. Quando o regulador falha: (1) bateria não carrega → moto para no meio do caminho; (2) o excesso de tensão vai direto ao estátor do alternador — espiras em curto, troca obrigatória. Substituição regulador: R$400–800; estátor: R$1.000–2.000 + mão de obra R$300–500. A SuperBlackbird SC35 é especialmente susceptível por rodar muitos km em estradas e o regulador original não foi projetado para uso intenso com farol de LED (maior consumo médio) — o upgrade MOSFET é a solução definitiva.',
  },
  {
    severity: 'WARN',
    title: 'Carburadores Keihin VB40G (modelos 1997–1998) com problemas de marcha lenta e jatos entupidos',
    body: 'Os 4 carburadores Keihin VB40G do SC35-I são sensíveis a combustível com alto teor de etanol (acima de 22%) e a longos períodos de parada. Os jets de combustível têm orifícios minúsculos (calibre 0,3–0,6 mm) que entopem com verniz de gasolina estagnada. Sintomas: marcha lenta instável ou impossível de manter, afogamento na aceleração de saída das curvas, ralenti diferente entre cilindros. Solução: limpeza ultrassônica dos 4 carburadores desmontados + substituição dos jatos e agulhas gastas + sincronização. Custo: R$600–1.200 em oficina especializada. Se a moto ficou parada mais de 6 meses, esvazie o combustível antigo, limpe o tanque e refaça a regulagem dos carburadores antes de tentar ligar.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível elétrica falhando (modelos PGM-FI 1999–2006) — sintoma intermitente frustrante',
    body: 'A bomba de combustível submersa no tanque de 22 litros tem vida útil típica de 60.000–80.000 km. A falha característica é intermitente: moto para completamente sem sinal de problema anterior, espera 10 minutos com motor resfriando e volta a funcionar normalmente. Isso ocorre porque a bomba sobreaquece quando começa a falhar e para por proteção térmica. Diagnóstico definitivo: medição de pressão no rail de combustível (deve ser 300–350 kPa). Uma bomba falhando pode gerar 220–280 kPa — suficiente para funcionar em marcha, mas que falha sob demanda em aceleração intensa. Bomba original Honda: R$800–1.500; alternativas compatíveis Facet ou Walbro (R$300–500). Exige remoção do tanque de 22 L — serviço de 2–3 horas.',
  },
  {
    severity: 'WARN',
    title: 'Retentores do garfo invertido Ø43 mm — mais caros de trocar que garfo convencional; vazamento contamina disco',
    body: 'O garfo invertido Ø43 mm da SuperBlackbird usa retentores internos de maior complexidade que garfos telescópicos convencionais. Troca dos retentores: R$300–500 em peças + R$500–800 em mão de obra especializada em garfo invertido (serviço mais complexo que garfo convencional). O risco crítico: qualquer vazamento de óleo de garfo que atinja o disco dianteiro de 310 mm compromete GRAVEMENTE a frenagem — óleo no disco reduz eficiência de frenagem em 40–60%. Em estrada, isso pode ser fatal. Inspecione os garfos visualmente antes de cada saída longa: mancha de óleo no tubo do garfo (parte superior que fica exposta) indica retentor falhando. Troque os retentores dos dois garfos sempre juntos.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito urbano — motor de 1.137cc esquenta muito em baixas velocidades',
    body: 'A SuperBlackbird foi projetada para estradas e alta velocidade: o sistema de arrefecimento a líquido é dimensionado para velocidades acima de 60 km/h. Em trânsito parado ou baixa velocidade (<30 km/h), o fluxo de ar pelo radiador é insuficiente — o motor pode atingir 110–120°C de temperatura do fluido. Sintoma: visor do painel mostrando temperatura elevada, ventilador elétrico do radiador ligando com frequência, possível vapor pelo overflow do reservatório de expansão. Providências: (1) verifique nível de fluido de arrefecimento mensalmente; (2) troque o fluido a cada 2 anos (etileno-glicol 50/50 desmineralizado); (3) mantenha o termostato em perfeito funcionamento — termostato emperrado aberto causa superaquecimento; (4) limpe as grades do radiador periodicamente (insetos entupem os dutos). Não use a SuperBlackbird em trânsito intenso diário — ela não foi feita para isso.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo acima de 80.000 km — retentores de válvulas ou anéis de pistão desgastados',
    body: 'Com 80.000+ km, o motor SC35 pode apresentar consumo de óleo acima de 300 mL a cada 1.000 km. Causas: (1) retentores de válvula ressecados — óleo escorrega pelo guia de válvula → fumaça azul ao desacelerar/parar no semáforo; (2) anéis de pistão desgastados → fumaça azul constante em aceleração. Com 4 cilindros e 16 válvulas, o custo de intervenção é elevado: retentores de válvula: R$1.200–2.000; anéis de pistão: retífica completa de motor R$5.000–10.000. Diagnóstico: teste de compressão individual por cilindro (deve ser 1.200–1.400 kPa, variação máxima de 200 kPa entre cilindros). Monitore o nível de óleo a cada 1.000 km em motos de alta quilometragem.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem interna no tanque de aço de 22 litros — contamina injetores/carburadores e bomba de combustível',
    body: 'O tanque de aço de 22 litros é suscetível a ferrugem interna quando a moto fica parada por longo período com pouco combustível — a condensação de umidade dentro do tanque inicia o processo. Ferrugem em floco ou pó pode chegar aos carburadores (bloqueando jets) ou injetores (orifícios de 0,2–0,3 mm entopem facilmente) ou à bomba de combustível (desgastando a impelidor). Sintomas: falhas de cilindro intermitentes, perda de potência progressiva, pressão de combustível irregular. Inspeção: lanterna pela abertura do bujão para verificar o interior do tanque. Tratamento: limpeza química com ácido fosfórico (produto POR-15 Tank Prep ou Ferroferro) + selante interno (POR-15 Tank Sealer, ~R$250–400). Após tratar, substitua obrigatoriamente o filtro de combustível e limpe os injetores/carburadores.',
  },
]

// ─── CBR 1100 XX SuperBlackbird — Calibragem ──────────────────────────────────

const CBR1100XX_TIRE = {
  modelName:    'CBR 1100 XX SUPER BLACKBIRD',
  yearFrom:     1997,
  yearTo:       2006,
  tireSize:     '120/70 ZR17 (F) · 180/55 ZR17 (R)',
  frontPsi:     36,
  rearPsi:      40,
  frontPsiLoad: 36,
  rearPsiLoad:  43,
  notes:        'Calibre SEMPRE com pneus frios (antes de rodar ou 2h+ parado). Com 256 kg em ordem de marcha, subestimar a pressão traseira aumenta desgaste irregular e reduz estabilidade em alta velocidade. Com garupa e carga: traseiro 43 PSI. Use obrigatoriamente pneus radiais ZR17 — jamais substitua por categorias H ou V.',
}

// ─── CBR 1100 XX SuperBlackbird — Manutenção ──────────────────────────────────

const CBR1100XX_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CBR 1100 XX SUPER BLACKBIRD', yearFrom: 1997, yearTo: 2006, component: 'Óleo do motor (10W-40 JASO MA/MA2) + filtro', intervalKm: 5000, intervalMonths: 6, notes: 'Capacidade: ~3,7 L com filtro. Motul 7100 4T, Honda HP4 ou Castrol Power1 Racing.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CBR 1100 XX SUPER BLACKBIRD', yearFrom: 1997, yearTo: 2006, component: 'Velas de ignição (NGK CR9EH-9) — jogo de 4', intervalKm: 12000, intervalMonths: 24, notes: 'Gap 0,9 mm. Iridium NGK DCPR9EIX dura ~24.000 km. Troque o jogo completo de 4.', priority: 'HIGH', order: 2 },
  { modelName: 'CBR 1100 XX SUPER BLACKBIRD', yearFrom: 1997, yearTo: 2006, component: 'Regulagem de válvulas (DOHC 16 válvulas)', intervalKm: 16000, intervalMonths: 24, notes: 'Adm: 0,15 ± 0,03 mm / Esc: 0,27 ± 0,03 mm com motor frio. Serviço de alta complexidade.', priority: 'CRITICAL', order: 3 },
  { modelName: 'CBR 1100 XX SUPER BLACKBIRD', yearFrom: 1997, yearTo: 1998, component: 'Sincronização dos 4 carburadores Keihin VB40G', intervalKm: 12000, intervalMonths: 12, notes: 'SOMENTE modelos carburados 1997–1998. Exige vacuômetro de 4 colunas. Depressão-alvo: ~26 cmHg.', priority: 'HIGH', order: 4 },
  { modelName: 'CBR 1100 XX SUPER BLACKBIRD', yearFrom: 1997, yearTo: 2006, component: 'Lubrificação da corrente de transmissão (530)', intervalKm: 800, intervalMonths: null, notes: 'Spray de corrente específico para o-ring. Nunca WD-40 puro. Folga: 20–30 mm ponto médio inferior.', priority: 'HIGH', order: 5 },
  { modelName: 'CBR 1100 XX SUPER BLACKBIRD', yearFrom: 1997, yearTo: 2006, component: 'Verificação/ajuste da tensão da corrente', intervalKm: 3000, intervalMonths: 1, notes: 'Ajuste pelos blocos excêntricos do eixo traseiro. Verifique desgaste lateral nos elos.', priority: 'HIGH', order: 6 },
  { modelName: 'CBR 1100 XX SUPER BLACKBIRD', yearFrom: 1997, yearTo: 2006, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro de papel original. Em uso em cidade com poluição: 8.000 km. Afeta diretamente a mistura nos carbs.', priority: 'MEDIUM', order: 7 },
  { modelName: 'CBR 1100 XX SUPER BLACKBIRD', yearFrom: 1999, yearTo: 2006, component: 'Filtro de combustível (modelos PGM-FI)', intervalKm: 12000, intervalMonths: 12, notes: 'SOMENTE modelos injetados 1999–2006. Posicionado inline. Honda original ou Mann/Fram compatível.', priority: 'MEDIUM', order: 8 },
  { modelName: 'CBR 1100 XX SUPER BLACKBIRD', yearFrom: 1997, yearTo: 2006, component: 'Fluido de freio (DOT 4) — circuitos dianteiro e traseiro', intervalKm: null, intervalMonths: 24, notes: 'Pinças 4 pistões duplas dianteiras + freio traseiro. ~300–400 mL total. Nunca DOT 5 silicone.', priority: 'HIGH', order: 9 },
  { modelName: 'CBR 1100 XX SUPER BLACKBIRD', yearFrom: 1997, yearTo: 2006, component: 'Líquido de arrefecimento (etileno-glicol 50/50)', intervalKm: null, intervalMonths: 24, notes: 'Honda Long Life Coolant ou equivalente certificado. Nunca água pura. ~2,5 L totais.', priority: 'HIGH', order: 10 },
  { modelName: 'CBR 1100 XX SUPER BLACKBIRD', yearFrom: 1997, yearTo: 2006, component: 'Óleo do garfo invertido Ø43 mm + retentores', intervalKm: 25000, intervalMonths: null, notes: 'Honda SS-8 (10W) ou Motul Fork Oil Expert 10W. Troque os retentores de 43 mm ao primeiro sinal de vazamento.', priority: 'MEDIUM', order: 11 },
  { modelName: 'CBR 1100 XX SUPER BLACKBIRD', yearFrom: 1997, yearTo: 2006, component: 'Kit de transmissão (corrente 530 + coroa + pinhão)', intervalKm: 20000, intervalMonths: null, notes: 'DID 530ZVM-X + JT Sprockets JTF1321 (17T) + JTR1332 (40T). Troque os 3 juntos. Folga: 20–30 mm.', priority: 'HIGH', order: 12 },
  { modelName: 'CBR 1100 XX SUPER BLACKBIRD', yearFrom: 1997, yearTo: 2006, component: 'Verificação do regulador/retificador + estátor', intervalKm: null, intervalMonths: 12, notes: 'Tensão de carga: 13,8–14,8 V a 4.000 rpm. Inspecionar conector 6 vias por pinos queimados/carbonizados.', priority: 'HIGH', order: 13 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  {
    modelName: 'CBR 1100 XX SUPER BLACKBIRD',
    yearFrom:  1997,
    yearTo:    2006,
    MACETES:   CBR1100XX_MACETES,
    PROBLEMAS: CBR1100XX_PROBLEMAS,
  },
]

// ─── Runner ───────────────────────────────────────────────────────────────────

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

  // TirePressure
  await prisma.tirePressure.deleteMany({ where: { modelName: CBR1100XX_TIRE.modelName } })
  await prisma.tirePressure.create({ data: CBR1100XX_TIRE })
  console.log(`🔵 TirePressure: ${CBR1100XX_TIRE.modelName}`)

  // MaintenanceItems
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map(b => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: CBR1100XX_MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${CBR1100XX_MANUTENCAO.length} itens`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
