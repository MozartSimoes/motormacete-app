// seed-honda-cbr250r.ts — Honda CBR 250R (2011–2015)
// FIPE: "CBR 250R" (código 6041) — MC41 (249cc, PGM-FI, monocilíndrico DOHC)
// Versões: Standard (sem ABS) e ABS — mesmo motor, mesma manutenção
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

// ─── CBR 250R — Macetes ───────────────────────────────────────────────────────

const CBR250R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — 1,4 L com filtro; troca a cada 5.000 km ou 6 meses',
    body: 'Motor monocilíndrico MC41 de 249cc DOHC usa 10W-30 com certificação JASO MA (ou MA2). Capacidade: ~1,3 L sem filtro; 1,4 L com filtro novo. Por ter apenas 1 cilindro, o volume de óleo é pequeno — o óleo degrada mais rapidamente em uso urbano com paradas e partidas frequentes. Troque rigorosamente a cada 5.000 km ou 6 meses, o que vier primeiro. Recomendados: Motul 5100 10W-30, Honda Ultra G3 10W-30, Castrol Power1 10W-30. Em uso urbano intenso (cidade com trânsito pesado), considere reduzir o intervalo para 3.000 km — o pequeno motor compensa qualidade com frequência de troca. NUNCA use óleo para carro: modificadores de atrito destroem a embreagem multidisco molhada em poucos milhares de km.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR7EH-9 — apenas 1 vela no monocilíndrico; gap 0,9 mm; troca a cada 8.000 km',
    body: 'O motor MC41 tem apenas 1 cilindro e, portanto, 1 vela. Vela padrão: NGK CR7EH-9 (gap 0,9 mm, código de calor 7 = fria-intermediária). Opção iridium: NGK CR7EIX (gap pré-ajustado, durabilidade ~16.000 km). A única vela do motor é crítica — qualquer problema e a moto para imediatamente. Sintomas de vela gasta: dificuldade de partida a frio, marcha lenta instável, perda de potência sutil, consumo ligeiramente aumentado. Torque de aperto: 16 N.m. A troca é simples e acessível mesmo para o próprio dono: remova a carenagem lateral esquerda (4–6 parafusos), localize a vela sob o capuz do motor, use chave de vela 18 mm. Custo: R$20–35 a vela original; iridium R$60–90. Mantenha sempre uma vela reserva na mala para emergências.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de válvulas DOHC 4 válvulas — a cada 12.000 km; fundamental em monocilíndrico de alta rotação',
    body: 'O motor DOHC tem 4 válvulas (2 admissão + 2 escape) e requer regulagem periódica de folgas. Com motor frio: admissão 0,15 ± 0,03 mm / escape 0,23 ± 0,03 mm. O monocilíndrico de 249cc gira até 10.000+ rpm — válvulas fora de ajuste causam desgaste acelerado dos assentos e guias de válvula. Sintoma de folga grande: ruído seco tipo "tick-tick" em marcha lenta; folga pequena demais: motor áspero sem ruído mas com perda de compressão e aquecimento anormal. Em oficina Honda: R$300–500; especializada: R$200–350. Em motos adquiridas sem histórico documentado de regulagem, priorize este serviço — é o item de manutenção mais frequentemente negligenciado na CBR 250R de segunda mão.',
  },
  {
    severity: 'OK',
    title: 'Injeção PGM-FI 38 mm — sistema confiável; mantenha o filtro de ar limpo para manter calibração',
    body: 'A CBR 250R usa injeção eletrônica PGM-FI com corpo de injeção único de 38 mm e sensor de oxigênio lambda. O sistema adapta automaticamente a mistura ao teor de etanol do combustível brasileiro — vantagem importante sobre motos carburadas. O sensor TPS (posição da borboleta), MAP (pressão de admissão) e IAT (temperatura do ar) trabalham em conjunto. Cuidado: um filtro de ar entupido altera a leitura do MAP e faz a ECU injetar mistura mais rica do que o necessário, aumentando consumo e carbono nas válvulas. Troque o filtro de ar a cada 12.000 km ou 12 meses — em cidades com tráfego intenso ou estradas de terra, reduza para 8.000 km. O filtro de ar original Honda custa R$40–70; filtro esportivo lavável K&N (R$200–280) paga-se em 3–4 trocas.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — lubrifique a cada 500 km; kit DID 520VX3 + JT Sprockets a cada 15.000–18.000 km',
    body: 'A CBR 250R usa corrente mais leve 520 × 104 elos (vs. 530 das motos maiores). A corrente 520 é eficiente mas requer lubrificação mais frequente por ter elos menores que acumulam menos lubrificante. Lubrifique a cada 500 km com spray de corrente para o-ring. Folga correta: 15–25 mm no ponto médio inferior. Kit recomendado: DID 520VX3 ou DID 520ERV3 + JT Sprockets JTF284 pinhão (14T) + JTR1792 coroa (36T) — R$250–400 completo. Trocando os 3 juntos. Sinais de corrente gasta: links rígidos que não se curvam suavemente, manchas de ferrugem, desgaste nos dentes da coroa em forma de "gancho". Com a corrente 520 mais fina, o desgaste costuma ser mais rápido que nos modelos maiores — monitore a cada 3.000 km.',
  },
  {
    severity: 'OK',
    title: 'Pneus 110/70 R17 (F) + 140/70 R17 (R) — não confunda R17 com ZR17; pressões mais baixas que motos maiores',
    body: 'Os pneus da CBR 250R são classificação R (radial) e não ZR — a diferença é o índice de velocidade: R = até 170 km/h, ZR = acima de 240 km/h. Sempre monte pneus R17 ou ZR17 (compatíveis no aro, mas ZR é superiores). Pressões frias corretas: 29 PSI dianteiro / 33 PSI traseiro solo; 29 PSI / 36 PSI com garupa. Com apenas 161 kg de moto + piloto leve, pressões muito altas (>35 PSI dianteiro) reduzem a área de contato e comprometem a tração em curvas molhadas. Recomendados: Pirelli Angel City (pneu de rua econômico, ~R$280–360 o par), Michelin Pilot Street 2 (melhor aderência, ~R$350–480 o par), Dunlop Sportmax GPR300 (esportivo mas compatível com 250cc). Verifique o código DOT — pneus com mais de 5 anos devem ser substituídos mesmo se com sulcos.',
  },
  {
    severity: 'OK',
    title: 'Tanque 13 litros e consumo 22–28 km/L — autonomia de até 340 km; uma das melhores relações da categoria',
    body: 'A CBR 250R é referência em eficiência: consumo médio de 22–28 km/L (motor injetado + aerodinâmica da carenagem). Em rodovias a 100 km/h: 26–30 km/L. Em trânsito urbano com acelerações: 20–24 km/L. A luz de reserva acende com ~2,5 L restantes — autonomia real é 12–13 L antes da reserva. Dica de abastecimento: use gasolina tipo A (sem adição extra de etanol além do obrigatório 27%). A PGM-FI adapta a mistura ao teor de etanol, mas gasolina mais pura costuma resultar em partidas mais fáceis a frio e marcha lenta mais estável. Nunca use gasolina abaixo de 87 octanas (a bomba da maioria dos postos brasileiros que cumpre a norma está OK). O consumo excepcional torna a CBR 250R ideal para uso diário com custo de combustível baixo.',
  },
  {
    severity: 'OK',
    title: 'Vibração do motor monocilíndrico — característica do projeto; gripsets e contra-pesos reduzem desconforto',
    body: 'Todo monocilíndrico de 250cc vibra — é física, não defeito. O MC41 usa contrapeso de balanceamento interno, o que reduz significativamente a vibração bruta, mas em rotações médias (4.500–6.500 rpm) a vibração nos pés e no guidão é perceptível. Isso incomoda mais pilotos acostumados com multicilíndricos. Soluções práticas: (1) Gripsets de gel (Renthal Twinring, Oxford Comfort, R$80–150) para as manoplas — amortece vibração na palma das mãos; (2) Luvas com amortecimento de gel para uso em trajetos longos; (3) A vibração diminui muito acima de 7.000 rpm — em rodovias a 100 km/h em 6ª marcha, o motor está em ~7.500 rpm e a vibração é tolerável. Em trânsito urbano em 3ª/4ª marcha com muita aceleração/frenagem é onde a vibração é mais sentida.',
  },
  {
    severity: 'OK',
    title: 'Versão ABS — sensor de roda sensível à sujeira; limpe o anel fônico a cada troca de pastilha',
    body: 'A versão CBR 250R ABS tem sensores de velocidade de roda dianteira e traseira com anel fônico dentado. A luz de ABS acessa no painel pode ser disparada simplesmente por sujeira, ferrugem ou graxa no anel fônico ou no sensor. Procedimento de limpeza: a cada troca de pastilhas de freio (ou anualmente), limpe os anéis fônicos com pano seco e inspecione os sensores — limpe com contato elétrico spray. O sistema ABS da CBR 250R é do tipo Combined ABS (CBS), que distribui automaticamente a força de frenagem entre dianteiro e traseiro ao acionar qualquer dos dois freios. Benefício real em piso molhado: reduz significativamente o risco de trava de roda. Nunca desabilite o ABS da CBR 250R — o sistema é calibrado para o peso e suspensão da moto.',
  },
  {
    severity: 'OK',
    title: 'Bateria YTZ7S (12V 6 Ah) pequena — mantenha com carregador flutuante se a moto ficar parada',
    body: 'A CBR 250R usa bateria de 12V 6 Ah (YTZ7S ou equivalente), que é pequena para a potência de partida exigida pelo monocilíndrico. Em motos paradas por mais de 2 semanas, a bateria pode descarregar completamente pelo consumo parasita do sistema PGM-FI (a ECU mantém pequeno consumo em standby). Bateria descarregada completamente repetidamente = vida útil reduzida. Solução: carregador flutuante (Battery Tender Junior, R$80–120) ligado quando a moto fica parada. Substituição por bateria equivalente: Yuasa YTZ7S (R$250–350), Moura YBZ7 (R$180–240) ou Bosch M4 compatível (R$160–200). Em motos com instalações elétricas adicionais (GPS, carregador USB), use bateria de 7 Ah para compensar o aumento de consumo.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo K&N KN-303 ou HifloFiltro HF303 — alternativa econômica ao original Honda',
    body: 'O filtro de óleo original Honda para a CBR 250R custa R$35–60 e deve ser trocado a cada troca de óleo. Alternativas homologadas e amplamente utilizadas pela comunidade CBR 250R: K&N KN-303 (R$60–80, lavável e reutilizável por 50.000 km — paga-se em 10 trocas), HifloFiltro HF303 (R$20–35, descartável mas de qualidade equivalente ao original). Não use filtros genéricos sem marcação de qualidade — filtro de baixa qualidade pode colapsar internamente com temperatura, cortando o fluxo de óleo para o motor. Ao trocar o filtro: aplique um fio de óleo limpo na borracha de vedação antes de instalar, aperte à mão + 3/4 de volta (nunca com chave — plástico da carcaça pode rachar).',
  },
  {
    severity: 'OK',
    title: 'Protetor de motor (slider/bail) — investimento obrigatório para evitar danos caros em quedas urbanas',
    body: 'A CBR 250R em uso urbano tem risco considerável de queda lenta em manobras de garagem, pilotagem iniciante ou terreno escorregadio. Os danos em queda sem proteção: espelho R$80–150, manopla R$40–80, alavanca R$60–120, carenagem lateral R$400–800, tampa de motor R$300–600. Investimento preventivo recomendado: (1) Protetores/sliders de quadro (crash bungs) R$150–300 — absorvem impacto em queda lateral; (2) Protetores de alavancas dobráveis R$80–150 — a alavanca dobra em vez de quebrar; (3) Protetor de motor (belly pan guard) R$100–200 — protege o cárter em impacto com lombada. Esse conjunto de R$330–650 pode evitar R$1.500–2.000+ em peças de reposição. Especialmente importante para pilotos iniciantes que usam a CBR 250R como primeira moto esportiva.',
  },
]

// ─── CBR 250R — Problemas ─────────────────────────────────────────────────────

const CBR250R_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulagem de válvulas atrasada — retentor de válvula colapsa silenciosamente e destroi o motor',
    body: 'A consequência mais grave de não fazer a regulagem de válvulas no prazo é a válvula com folga pequena demais (não se fecha completamente): a sede de válvula sofre impacto repetido de ponto fixo, o retentor colapsa e a válvula colide com o pistão. No motor monocilíndrico de 249cc, com apenas 1 pistão, essa falha destrói o motor instantaneamente sem aviso sonoro prévio. Custo de rebuild de motor após colisão pistão-válvula: R$2.500–5.000 (motor de 250cc inteiro pode custar menos). Em motos compradas de segunda mão sem histórico de serviço documentado, NUNCA adie a inspeção das válvulas. Sintoma de válvula grudada (sinal de falha iminente): motor com temperatura de operação mais alta que o normal sem explicação aparente.',
  },
  {
    severity: 'WARN',
    title: 'Calor nas pernas do piloto em trânsito urbano parado — motor posicionado próximo ao piloto',
    body: 'O motor monocilíndrico de 249cc é posicionado à frente e próximo das coxas do piloto. Em trânsito parado com temperatura ambiente alta (Brasília, SP, RJ no verão), o radiador transfere calor diretamente para as pernas. O ventilador elétrico do radiador aciona frequentemente (normal, não é defeito). Isso não causa dano ao motor — é apenas incômodo para o piloto. Soluções para uso diário: (1) Calça de motociclismo com proteção e ventilação (kevlar com zíperes de ventilação) dissipa calor melhor que calça jeans; (2) Protetor térmico para o escapamento (wrap de silicone, R$50–100) reduz temperatura irradiada; (3) Nos momentos de parada longa, coloque o pé esquerdo no chão e afaste a perna direita levemente da moto. Monitore o nível de fluido de arrefecimento mensalmente — vazamento do sistema de resfriamento piora o problema.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 520 sem lubrificação adequada — desgaste em 8.000–10.000 km ao invés de 15.000–18.000 km',
    body: 'A corrente 520 é mais fina e leve que a 530, mas requer lubrificação mais frequente. Pilotos que lubrificam apenas na troca (ou nunca) relatam desgaste completo da corrente em 8.000–10.000 km — menos da metade da vida útil esperada com manutenção correta. Corrente seca em alta rotação esquenta, alonga rapidamente e perde a tensão — o perigo real: corrente extremamente frouxa pode sair da coroa em desaceleração abrupta e travar a roda traseira. Lubrifique a cada 500 km (urbano) ou 800 km (estrada). Sinal de corrente gasta: folga acima de 30 mm no ponto médio, "enrijecimento" de elos individuais ao dobrar a corrente à mão. Custo de um kit corrente + coroa + pinhão de qualidade: R$250–380 — negligência de manutenção sai mais caro.',
  },
  {
    severity: 'WARN',
    title: 'Garfo convencional Ø41 mm sem ajuste — mola muito mole para piloto acima de 85 kg ou uso esportivo',
    body: 'A CBR 250R usa garfo telescópico convencional de 41 mm sem qualquer ajuste de compressão, extensão ou pré-carga — o único parâmetro ajustável é a pré-carga traseira no monoamortecedor. Para pilotos até 80 kg em uso de estrada normal, é adequado. Para piloto acima de 85–90 kg: a suspensão dianteira mergulha excessivamente nas frenagens, comprometendo a espaçamento de caixa do garfo. Soluções: (1) Aumentar a viscosidade do óleo de garfo (de 7,5W para 10W) para aumentar amortecimento sem custo; (2) Instalar pré-carga adicional no garfo (anilhas de espaçamento internas, R$50–100 com serviço); (3) Para uso em pista/esportivo, considerar upgrade para garfo invertido de outra Honda (requer adaptação). Em uso de rua normal, aceite a limitação e respeite as curvas em velocidade compatível.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível falhando acima de 50.000 km — sintoma intermitente que frustra o diagnóstico',
    body: 'A bomba de combustível elétrica submersa no tanque de 13 litros tem vida útil típica de 50.000–70.000 km na CBR 250R. A falha é caracteristicamente intermitente: moto para no meio do caminho, espera 5–10 minutos e volta a funcionar (a bomba superaquece ao falhar e para por proteção térmica). Diagnóstico mais preciso: medição de pressão no rail de combustível (deve ser ~350 kPa com motor ligado). Bomba original Honda: R$400–700; alternativa compatível (Delphi ou Facet): R$200–350. O procedimento exige remoção do tanque de 13 L e desmontagem do módulo da bomba — serviço de 1,5–2 horas. Em motos com mais de 50.000 km sem registro de troca da bomba, considere substituição preventiva antes de uma falha em estrada.',
  },
  {
    severity: 'WARN',
    title: 'Luz de ABS acesa no painel — na maioria dos casos é sujeira no anel fônico, não defeito elétrico',
    body: 'Um dos problemas mais relatados pela comunidade CBR 250R ABS: luz de ABS que acende e apaga aleatoriamente, especialmente após chuva ou lavagem da moto. A causa mais comum: sujeira, graxa ou ferrugem no anel fônico dentado do sensor de roda (dianteiro ou traseiro). O sistema ABS interpreta a leitura irregular como falha de sensor. Solução fácil: limpe os anéis fônicos com pano e o sensor com spray de contato elétrico. Se a luz continuar acesa após limpeza: (1) verifique os conectores do sensor de velocidade por oxidação; (2) verifique a folga entre sensor e anel fônico (deve ser 0,8–1,2 mm); (3) apenas se nada resolver, leve ao dealer para leitura de código de erro com scanner Honda. Nunca desative o ABS permanentemente — a moto perde a principal vantagem de segurança da versão premium.',
  },
  {
    severity: 'WARN',
    title: 'Pastilhas de freio originais com desgaste rápido em uso urbano — sinterizadas duram 3x mais',
    body: 'As pastilhas originais Honda da CBR 250R são semi-metálicas e adequadas para uso leve, mas em uso urbano intenso com frenagens frequentes, desgastam em 8.000–12.000 km. Upgrade recomendado para pastilhas sinterizadas: EBC FA158HH dianteiro (R$80–120) ou Braking sinterizadas compatíveis. As sinterizadas duram 20.000–30.000 km, têm melhor mordida inicial e fade térmico reduzido. Atenção: pastilhas sinterizadas novas precisam de 100–200 km de "rodagem" com frenagens progressivas para assentar no disco — nas primeiras frenagens, a eficiência é menor que pastilhas originais semi-novas. Troque pastilhas sempre em par (ambos os lados da pinça) e nunca misture materiais diferentes entre as duas metades da pinça.',
  },
  {
    severity: 'WARN',
    title: 'IACV entupida — marcha lenta instável que sobe e desce; confundida com problema de carburador',
    body: 'A CBR 250R com PGM-FI tem a válvula IACV (Idle Air Control Valve) que controla a quantidade de ar em marcha lenta. Com o tempo, depósitos de óleo do blow-by e poeira fina entopem o pequeno orifício. Sintomas: marcha lenta que oscila entre 900–1.500 rpm sem razão aparente, motor que afoga logo após a partida a frio, dificuldade de manter 1.100 rpm estáveis em temperatura de operação. Pilotos frequentemente acham que é problema de "carburador sujo" e levam a moto a mecânicos que não identificam a real causa. Solução simples: limpeza do orifício da IACV com spray de limpeza de carburador/throttle body sem desmontagem total. Se persistir: IACV original Honda para CBR 250R: R$300–500; verifique no serviço se a garantia de 5 anos ainda cobre o componente.',
  },
]

// ─── CBR 250R — Calibragem ────────────────────────────────────────────────────

const CBR250R_TIRE = {
  modelName:    'CBR 250R',
  yearFrom:     2011,
  yearTo:       2015,
  tireSize:     '110/70 R17 (F) · 140/70 R17 (R)',
  frontPsi:     29,
  rearPsi:      33,
  frontPsiLoad: 29,
  rearPsiLoad:  36,
  notes:        'Calibre SEMPRE com pneus frios (antes de rodar ou 2h+ parado). Pneus R17 (índice de velocidade H/S); não use acima de 160 km/h por tempo prolongado. Com garupa: traseiro 36 PSI. Pressão alta demais (>35 PSI dianteiro) reduz área de contato e compromete tração em piso molhado.',
}

// ─── CBR 250R — Manutenção ────────────────────────────────────────────────────

const CBR250R_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CBR 250R', yearFrom: 2011, yearTo: 2015, component: 'Óleo do motor (10W-30 JASO MA) + filtro', intervalKm: 5000, intervalMonths: 6, notes: 'Capacidade: ~1,4 L com filtro. Motul 5100 10W-30, Honda Ultra G3 ou Castrol Power1. Filtro: K&N KN-303 ou HifloFiltro HF303.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CBR 250R', yearFrom: 2011, yearTo: 2015, component: 'Vela de ignição (NGK CR7EH-9) — 1 vela', intervalKm: 8000, intervalMonths: 12, notes: 'Gap 0,9 mm. Iridium NGK CR7EIX dura ~16.000 km. Mantenha 1 vela reserva sempre na mala.', priority: 'HIGH', order: 2 },
  { modelName: 'CBR 250R', yearFrom: 2011, yearTo: 2015, component: 'Regulagem de válvulas (DOHC 4 válvulas)', intervalKm: 12000, intervalMonths: 24, notes: 'Adm: 0,15 ± 0,03 mm / Esc: 0,23 ± 0,03 mm com motor frio. Serviço prioritário em motos sem histórico.', priority: 'CRITICAL', order: 3 },
  { modelName: 'CBR 250R', yearFrom: 2011, yearTo: 2015, component: 'Lubrificação da corrente de transmissão (520)', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente para o-ring. Nunca WD-40 puro. Folga: 15–25 mm ponto médio inferior. Urbano: a cada 500 km.', priority: 'HIGH', order: 4 },
  { modelName: 'CBR 250R', yearFrom: 2011, yearTo: 2015, component: 'Verificação/ajuste da tensão da corrente', intervalKm: 2000, intervalMonths: 1, notes: 'Ajuste pelo excêntrico do eixo traseiro. Verifique folga e desgaste lateral dos elos a cada 2.000 km.', priority: 'HIGH', order: 5 },
  { modelName: 'CBR 250R', yearFrom: 2011, yearTo: 2015, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Original Honda ou K&N lavável. Urbano com poluição ou terra: 8.000 km. Afeta leitura do sensor MAP.', priority: 'MEDIUM', order: 6 },
  { modelName: 'CBR 250R', yearFrom: 2011, yearTo: 2015, component: 'Filtro de combustível inline', intervalKm: 12000, intervalMonths: 12, notes: 'Posicionado no circuito de combustível. Substituição preventiva a cada 12.000 km.', priority: 'MEDIUM', order: 7 },
  { modelName: 'CBR 250R', yearFrom: 2011, yearTo: 2015, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Circuito dianteiro e traseiro. ~150–200 mL total. Nunca DOT 5 silicone. Versão ABS: sangrar com cuidado no módulo ABS.', priority: 'HIGH', order: 8 },
  { modelName: 'CBR 250R', yearFrom: 2011, yearTo: 2015, component: 'Líquido de arrefecimento (etileno-glicol 50/50)', intervalKm: null, intervalMonths: 24, notes: 'Honda Long Life Coolant ou equivalente. Nunca água pura. ~1,1 L totais no sistema.', priority: 'HIGH', order: 9 },
  { modelName: 'CBR 250R', yearFrom: 2011, yearTo: 2015, component: 'Óleo do garfo convencional Ø41 mm', intervalKm: 20000, intervalMonths: null, notes: 'Honda SS-7 (7,5W) ou Motul Fork Oil Light 7,5W. Pilotos >85 kg: upgrade para 10W aumenta amortecimento.', priority: 'MEDIUM', order: 10 },
  { modelName: 'CBR 250R', yearFrom: 2011, yearTo: 2015, component: 'Kit de transmissão (corrente 520 + coroa + pinhão)', intervalKm: 16000, intervalMonths: null, notes: 'DID 520VX3 + JT Sprockets JTF284 (14T) + JTR1792 (36T). Troque os 3 juntos. Nunca misture novos com usados.', priority: 'HIGH', order: 11 },
  { modelName: 'CBR 250R', yearFrom: 2011, yearTo: 2015, component: 'Limpeza da IACV (Idle Air Control Valve)', intervalKm: 20000, intervalMonths: null, notes: 'Spray de throttle body cleaner no orifício da IACV. Previne marcha lenta instável e afogamento a frio.', priority: 'MEDIUM', order: 12 },
  { modelName: 'CBR 250R', yearFrom: 2011, yearTo: 2015, component: 'Sensor de ABS e anel fônico (versão ABS)', intervalKm: null, intervalMonths: 12, notes: 'SOMENTE versão ABS. Limpar anéis fônicos e sensores anualmente. Folga sensor-anel: 0,8–1,2 mm.', priority: 'MEDIUM', order: 13 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  {
    modelName: 'CBR 250R',
    yearFrom:  2011,
    yearTo:    2015,
    MACETES:   CBR250R_MACETES,
    PROBLEMAS: CBR250R_PROBLEMAS,
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
  await prisma.tirePressure.deleteMany({ where: { modelName: CBR250R_TIRE.modelName } })
  await prisma.tirePressure.create({ data: CBR250R_TIRE })
  console.log(`🔵 TirePressure: ${CBR250R_TIRE.modelName}`)

  // MaintenanceItems
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map(b => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: CBR250R_MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${CBR250R_MANUTENCAO.length} itens`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
