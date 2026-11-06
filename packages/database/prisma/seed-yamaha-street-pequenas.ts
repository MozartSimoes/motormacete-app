// seed-yamaha-street-pequenas.ts — Yamaha YZF R-15 · XV 250 Virago · ZR 125 Connected
// Três modelos até 250cc que não se encaixam nas famílias já cobertas (Fazer/Crosser/YBR-Factor).
// YZF R-15: sportbike de entrada, motor 155cc DOHC líquido, importada da Índia.
// XV 250 Virago: cruiser histórica, motor 249cc V-twin a ar, carburada.
// ZR 125 Connected: scooter automático 125cc com sistema híbrido leve (Blue Core Hybrid),
//   lançado no Brasil em 2026. NÃO é uma moto convencional — é scooter CVT com Power Assist elétrico.
// Execute: pnpm --filter @motormacete/database db:seed:yamaha-street-pequenas (se configurado)
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

// ─── YZF R-15 ──────────────────────────────────────────────────────────────
// Motor: 155cc monocilíndrico DOHC 4V, líquido, VVA (válvulas de admissão variável) | 18,8 cv @ 10.000 rpm
// Torque: 1,5 kgf.m @ 8.500 rpm | Injeção eletrônica | Câmbio 6 marchas com embreagem deslizante/assistida
// Óleo: Yamalube 10W-40 semissintético (API SJ/JASO MA), ~1,05L | Vela: NGK MR8E-9, gap ~0,8mm
// Corrente: 520H × pinhão 14T / coroa 48T | Pneu: 100/80-17 (F) / 140/70-17 (R) | Tanque: 11L (reserva 1,9L)
// Peso: 141 kg | Freios: disco 282mm (F) / 220mm (R), ambos com ABS | Lançada no Brasil em 2023 (dez/2023)

const R15_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Yamalube 10W-40 semissintético — capacidade ~1,05L; primeira troca aos 1.000 km',
    body: 'O motor 155cc DOHC líquido-refrigerado da R-15 usa óleo 10W-40 semissintético, especificação API SJ ou superior + JASO MA (obrigatório por causa da embreagem úmida deslizante/assistida). Capacidade aproximada: 1,05L na troca comum (sem mexer no filtro), pouco mais ao trocar o filtro de tela. Use Yamalube 10W-40 (produto oficial Yamaha) ou equivalente semissintético JASO MA como Motul 5100 10W-40 ou Lubrax Moto 4T 10W-40. Primeira troca: 1.000 km ou 6 meses (revisão de rodagem). Trocas seguintes: a cada 5.000 km ou 6 meses. NUNCA use óleo JASO MB (para scooter/câmbio separado) — a embreagem vai escorregar.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK MR8E-9 — gap aproximado 0,8mm; motor de alta rotação exige atenção',
    body: 'A vela original da YZF R-15 é a NGK MR8E-9 (rosca curta, grau térmico 8 — adequado para o regime de giro alto do motor VVA que passa de 10.000 rpm). Gap de fábrica: aproximadamente 0,8mm — confira sempre com calibrador de palheta antes de instalar, mesmo vela nova de fábrica pode vir levemente fora. Custo: R$ 35–60 a unidade em loja Yamaha ou parceiros (Motos Neno, Mercado Livre). Como o motor trabalha em rotações elevadas com frequência, não estique o intervalo além de 6.000–8.000 km — vela gasta em motor de giro alto causa perda de potência perceptível e engasgos acima de 8.000 rpm.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520H com pinhão 14T / coroa 48T — kit relação e lubrificação frequente',
    body: 'A relação de transmissão da R-15 usa corrente padrão 520H, pinhão de 14 dentes e coroa de 48 dentes. Por ser moto esportiva de giro alto, a corrente sofre mais estresse térmico — lubrifique a cada 500 km (spray de corrente com O-ring como Motul C2 ou similar). Folga recomendada: 25–35mm no centro do trecho inferior, corrente fria. Kits de relação compatíveis são vendidos por lojas especializadas (Galo Motos, Dona Motos, Chapa Moto Parts) com opção reforçada — vale o investimento para quem usa a moto em ritmo mais esportivo, pois dura mais que o kit padrão.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar e revisões: intervalo oficial Yamaha é 1.000 km (inicial) + 5.000 km',
    body: 'Segundo o padrão Yamaha para a linha R15/Fazer/Factor no Brasil, a primeira revisão acontece aos 1.000 km ou 6 meses (o que vier primeiro), e as seguintes a cada 5.000 km ou 6 meses. O filtro de ar é de papel — inspecionar a cada revisão e trocar quando sujo (normalmente entre 10.000–12.000 km em uso urbano, menos em ambiente com muita poeira). Não tente lavar o filtro de papel: ele é descartável. Em uso intenso na cidade com muito trânsito parado, reduza o intervalo de inspeção para 8.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Peças de carenagem: R-15 tem carenagem completa cara — cuidado em quedas e tombos',
    body: 'Por ser uma sportbike com carenagem completa (fairing), a R-15 tem custo de reposição de plásticos bem mais alto que motos naked da mesma cilindrada. Uma queda baixa pode custar R$ 800–2.000+ em peças de carenagem originais. Alternativas: buscar plásticos de reposição não-original (réplica) em lojas especializadas em sportbikes ou peças recuperadas de desmonte (grupos de R15 no Facebook e Mercado Livre) — custam 40-60% menos que peças originais Yamaha. Considere um slider de proteção (protetor de motor/carenagem) instalado preventivamente — R$ 150–300 o kit, evita danos maiores em tombos de baixa velocidade.',
  },
  {
    severity: 'OK',
    title: 'Pneus originais MRF (India) — trocar por Pirelli/Michelin melhora grip mas custa mais',
    body: 'A R-15 vem de fábrica com pneus MRF Nylogrip Zapper-FX1 (dianteiro 100/80-17) e MRF Revz-S (traseiro 140/70-17) — pneus indianos adequados ao uso mas com grip inferior às marcas europeias. Ao trocar, opções recomendadas: Pirelli Diablo Rosso (mais esportivo), Michelin Pilot Street (equilíbrio custo-benefício) ou Technic Sport (nacional, mais barato). Preço do par MRF original de reposição: R$ 500–700. Par Pirelli/Michelin equivalente: R$ 900–1.400. Para quem anda em ritmo mais forte ou pista de trackday, o upgrade de pneu compensa bastante o investimento.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem deslizante e assistida: não é a mesma coisa que embreagem hidráulica',
    body: 'A R-15 tem embreagem "deslizante e assistida" (slipper + assist) só no sistema mecânico a cabo — não confundir com embreagem hidráulica. O sistema deslizante reduz o efeito de "travamento" da roda traseira em reduções bruscas de marcha, e o assistido deixa o acionamento mais leve na alavanca. Regulagem de folga do cabo: 10–15mm de folga na ponta da alavanca. Se a embreagem estiver "pesada" ou patinando, verifique primeiro o nível de óleo (óleo velho ou fora de especificação JASO MA afeta diretamente o comportamento da embreagem úmida) antes de suspeitar de desgaste do disco.',
  },
]

const R15_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Medidor de combustível impreciso — reclamação comum na linha Yamaha injetada',
    body: 'Assim como em outros modelos Yamaha injetados no Brasil (Fazer 250, Factor), proprietários relatam que o marcador de combustível da R-15 pode oscilar ou não ser totalmente linear — mostrando queda rápida no início e depois estabilizando. Não é falha de segurança, mas pode assustar. Acompanhe pelo hodômetro parcial (trip) nas primeiras semanas para calibrar sua expectativa real de autonomia por tanque (tanque de 11L, consumo médio declarado de ~30 km/l = autonomia teórica de ~300 km, mas conte com reserva de 1,9L antes do limite).',
  },
  {
    severity: 'WARN',
    title: 'Vibração em alta rotação: motor de giro alto (VVA) tem vibração perceptível acima de 8.000 rpm',
    body: 'Por ser um monocilíndrico de giro muito alto (potência máxima a 10.000 rpm), a R-15 vibra mais que motos bicilíndricas na mesma faixa de rotação — é característica de projeto, não defeito. Se a vibração aumentar de forma anormal ou aparecer ruído metálico, verifique o aperto dos parafusos do motor no chassi e o estado dos coxins de guidão/retrovisores (os espelhos podem embaçar por vibração excessiva). Uso constante acima de 9.000 rpm em trânsito urbano acelera o desgaste — reserve giros altos para ultrapassagens e estradas.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de relação desgasta mais rápido que em motos street por causa do giro alto',
    body: 'Por rodar em rotações mais altas com mais frequência (motor esportivo), a corrente de transmissão da R-15 tende a esticar e desgastar antes do que em uma Factor ou Fazer 150 com uso equivalente em quilometragem. Fique atento à folga (25-35mm) a cada 2.000 km e não deixe passar de 15.000-18.000 km sem avaliar o kit relação completo. Rodar com corrente maltratada (seca, esticada) desgasta pinhão e coroa de forma acelerada e pode causar salto de marcha em acelerações fortes — situação perigosa em moto esportiva.',
  },
  {
    severity: 'DANGER',
    title: 'Peças de reposição para versões mais antigas (importadas antes de 2023) são escassas no Brasil',
    body: 'A R-15 tem histórico de importação paralela e venda por concessionárias não-oficiais antes da chegada oficial da Yamaha do Brasil em dezembro de 2023. Se sua moto for uma unidade trazida por esse canal (geração anterior, gen 3 ou 2), peças de motor e elétrica podem não ser as mesmas do modelo oficial nacional (BPE1, a partir de 2024) e a rede Yamaha pode recusar atendimento em garantia ou não ter peças em estoque. Antes de comprar uma R-15 usada, confirme com a concessionária se o chassi é de importação oficial Yamaha do Brasil — isso muda completamente a disponibilidade de peças e suporte técnico.',
  },
  {
    severity: 'WARN',
    title: 'ABS de canal único ou duplo: confirme a especificação da sua unidade antes de serviços',
    body: 'A R-15 comercializada no Brasil possui ABS nos dois discos (dianteiro 282mm e traseiro 220mm). Ao levar para manutenção do sistema de freios, informe ao mecânico que se trata de sistema com ABS duplo — o sangramento e a purga do sistema hidráulico com ABS exigem procedimento diferente de motos sem ABS (a bomba/módulo ABS retém fluido e ar de forma diferente). Oficinas não especializadas em motos com ABS podem fazer manutenção incompleta, deixando ar no sistema e causando frenagem "esponjosa".',
  },
]

const R15_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo YZF R-15: baseado no padrão oficial Yamaha Brasil + prática de proprietários',
    body: '1.000 km — Primeira revisão obrigatória: troca de óleo (Yamalube 10W-40, ~1,05L), inspeção geral, aperto de parafusos, ajuste de corrente. | 5.000 km — Troca de óleo. Lubrificação e ajuste de folga da corrente (25-35mm). Inspeção de vela (gap 0,8mm). | 8.000 km — Troca da vela NGK MR8E-9 se necessário (giro alto desgasta mais rápido). Verificação do sistema de embreagem deslizante/assistida. | 10.000 km — Troca de óleo. Inspeção/troca do filtro de ar (papel, não lavável). | 12.000-15.000 km — Avaliar kit relação completo (corrente 520H + pinhão 14T + coroa 48T) conforme desgaste. | 15.000 km — Fluido de freio DOT das duas rodas (sistema com ABS). | 20.000 km — Revisão geral de suspensão, rolamentos de roda e direção, folga de válvulas em oficina especializada Yamaha (motor DOHC 4V exige ferramental específico).',
  },
]

// ─── XV 250 VIRAGO ─────────────────────────────────────────────────────────
// Motor: 249cc V-twin (2 cilindros em V a 60°) 4 tempos, refrigerado a ar, SOHC 2V/cilindro
// Potência: ~20-21 cv @ 8.000 rpm | Torque: ~2,1 kgf.m @ 6.500 rpm | Carburador (sem injeção)
// Óleo: 10W-40 ou 20W-40 mineral/semissintético JASO MA, ~1,4L sem filtro / 1,6L com filtro
// Vela: NGK CR6HS | Corrente: compatível CB400/450 com O-ring (retentor de borracha)
// Pneu: 90/90-18 (F, com câmara) / 130/90-15 (R, com câmara) — original Pirelli MT66
// Tanque: 9,5L (reserva 2,6L) | Peso seco: ~139 kg | Produzida no Brasil ~1989-2002 (períodos com hiato)

const VIRAGO250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 ou 20W-40 JASO MA — capacidade 1,4L sem filtro / 1,6L com filtro',
    body: 'O motor V-twin a ar da XV 250 Virago pede óleo mineral ou semissintético 10W-40 (clima ameno) ou 20W-40 (clima quente/uso urbano intenso), sempre com especificação JASO MA — a embreagem é úmida e compartilha o óleo com o motor. Capacidade: aproximadamente 1,4L numa troca simples (sem mexer no filtro) e 1,6L quando o filtro de óleo também é trocado. Marcas recomendadas: Lubrax Moto 4T 20W-50 (boa opção para clima brasileiro, viscosidade um pouco mais alta protege bem motor refrigerado a ar), Motul 3000 20W-50 ou Yamalube 20W-40. Troque a cada 3.000 km em uso urbano — motor a ar sofre mais com trânsito parado que motor líquido.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR6HS — verifique gap e estado a cada 5.000 km',
    body: 'A vela original da Virago 250 é a NGK CR6HS (rosca resistor, grau térmico 6, adequado ao motor V-twin de baixa/média rotação). Como o motor é carburado e a mistura pode variar (principalmente por descalibração do carburador com o tempo), a vela é um bom indicador de saúde do motor: cor marrom-clara = mistura adequada; cor preta fuliginosa = mistura rica (rever regulagem do carburador); cor muito clara/esbranquiçada = mistura pobre. Custo da vela: R$ 20-35. Como são duas velas (uma por cilindro do V-twin), sempre troque o par junto, mesmo que só uma pareça gasta.',
  },
  {
    severity: 'OK',
    title: 'Carburador: motor à base de mistura ar-combustível exige limpeza periódica contra etanol',
    body: 'Por ser 100% carburada (sem injeção eletrônica), a Virago 250 sofre bastante com a formação de verniz/borra quando fica parada por muito tempo com etanol no tanque — sintomas: marcha lenta instável, dificuldade de pegar a frio, engasgos. Recomenda-se limpeza do carburador a cada 15.000-20.000 km ou anualmente. Se a moto ficar parada por mais de 30 dias, drene o combustível do carburador (torneira de dreno na cuba) para evitar entupimento dos jatos finos. Use aditivo de limpeza de sistema de combustível (Bardahl, Wynn\'s) a cada poucos tanques como prevenção.',
  },
  {
    severity: 'OK',
    title: 'Corrente compatível CB400/450 com retentor (O-ring) — durabilidade muito melhor',
    body: 'Um "macete" bastante conhecido entre proprietários de Virago 250: a corrente de transmissão aceita substitutos compatíveis com a linha Honda CB400/450 desde que tenham retentor de borracha entre os elos (O-ring), que reduz atrito interno e prolonga muito a vida útil comparado à corrente sem retentor. Ao comprar peça de reposição, peça especificamente "corrente com retentor" ou "corrente O-ring" compatível — evite a versão sem retentor, que desgasta muito mais rápido no uso diário. Lubrifique a cada 500-700 km.',
  },
  {
    severity: 'WARN',
    title: 'Engrenagens plásticas da bomba de óleo: peça crítica e frágil — substitua preventivamente',
    body: 'Um ponto de atenção específico e bem documentado da Virago 250: as engrenagens da bomba de óleo são feitas de material plástico/nylon e podem desgastar ou quebrar com o tempo, comprometendo a lubrificação do motor. Se você notar queda de pressão de óleo, ruído metálico incomum no motor frio ou luz de óleo piscando, suspeite primeiro dessas engrenagens antes de desmontar o motor todo. Em revisões acima de 40.000-50.000 km ou em motos muito antigas com histórico desconhecido, vale a pena inspecionar (ou substituir preventivamente) essas engrenagens — peça de baixo custo que evita dano grave ao motor.',
  },
  {
    severity: 'OK',
    title: 'Pneus originais Pirelli MT66 (90/90-18 dianteiro / 130/90-15 traseiro) — medida incomum',
    body: 'A Virago 250 usa uma combinação de aro pouco comum hoje em dia: 18" na frente e 15" atrás, ambos com câmara de ar. O pneu original é o Pirelli MT66 nos dois tamanhos — ainda fabricado e fácil de encontrar em lojas de pneus para motos custom/clássicas. Alternativas: Michelin Macadam ou pneus genéricos para cruiser pequena. Como usa câmara de ar, sempre verifique o estado da câmara e do aro (ferrugem, rebarbas) ao trocar o pneu — furos em pneu com câmara são mais frequentes que em pneu sem câmara (tubeless).',
  },
  {
    severity: 'OK',
    title: 'Ergonomia baixa facilita manutenção básica — ótima moto para aprender mecânica',
    body: 'A altura do banco de aproximadamis 685mm e o peso seco de ~139 kg tornam a Virago 250 uma moto acessível não só para pilotar mas também para trabalhar em casa: fácil de colocar no cavalete central, componentes de fácil acesso (motor exposto, sem carenagem), e mecânica simples (carburador, sem eletrônica complexa). Para quem quer aprender manutenção básica de moto, é um dos melhores modelos para começar — só cuidado redobrado com a bomba de óleo plástica mencionada acima.',
  },
]

const VIRAGO250_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Bomba de óleo com engrenagens plásticas: pode falhar e causar dano sério ao motor',
    body: 'Esse é o problema mais crítico documentado da Virago 250: as engrenagens plásticas da bomba de óleo desgastam com o tempo e, em casos extremos, podem quebrar — interrompendo a lubrificação do motor e causando fundição de mancais/biela. Sinais de alerta: luz de óleo piscando intermitentemente, ruído metálico seco no motor frio que some ao esquentar, consumo de óleo acima do normal. Se sua moto tem histórico desconhecido e mais de 40.000 km, considere inspeção preventiva da bomba antes que o problema se manifeste de forma súbita — o custo de trocar as engrenagens é muito menor que reconstruir o motor.',
  },
  {
    severity: 'WARN',
    title: 'Motos com muitos anos de fabricação: elétrica original envelhecida (chicote, conectores)',
    body: 'Por ser um modelo com produção iniciada ainda nos anos 1990 no Brasil, unidades mais antigas da Virago 250 (final da década de 1990 a começo dos anos 2000) frequentemente apresentam chicote elétrico ressecado e conectores oxidados após 20+ anos de uso. Sintomas comuns: lanterna intermitente, sinalizadores fracos, dificuldade de partida elétrica por queda de tensão em conector mal contactado. Solução: revisão completa do chicote com troca de conectores oxidados e aplicação de graxa dielétrica nos pontos de contato — serviço acessível (R$ 100-250) que resolve a maioria dos problemas elétricos "fantasmas".',
  },
  {
    severity: 'WARN',
    title: 'Carburador dessincronizado/desregulado em motos com muitos anos sem manutenção',
    body: 'Motos Virago 250 com histórico de pouca manutenção apresentam carburador desregulado, causando marcha lenta instável, consumo elevado e perda de potência. Diferente de modelos multi-carburador (como a linha Comet 250 V-twin), a Virago 250 tem um único carburador alimentando os dois cilindros através de um coletor — então o problema típico não é sincronização entre carburadores, mas sim entupimento de jatos e desgaste da agulha/boia por uso prolongado com etanol. Limpeza completa do carburador: R$ 150-300 em oficina especializada em motos carburadas antigas.',
  },
  {
    severity: 'WARN',
    title: 'Peça descontinuada: Virago 250 não é mais fabricada — planeje-se para peças de desmonte/importadas',
    body: 'A Yamaha descontinuou a Virago 250 no mercado brasileiro há bastante tempo. Peças de plástico (tampas, para-lamas) e itens específicos do modelo (não compartilhados com outras Yamaha) podem ser difíceis de achar novos — desmontes e Mercado Livre são as fontes mais comuns. Peças mecânicas do motor (pistão, anéis, juntas) geralmente ainda são encontradas por serem baseadas em uma plataforma de motor V-twin usada em várias versões da família Virago ao redor do mundo (250/125), então uma boa alternativa é buscar por "Virago 250" em fóruns e lojas internacionais de peças (eBay, Yambits) quando não encontrar no Brasil.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em peças cromadas (característica de moto cruiser exposta)',
    body: 'Como moto estilo cruiser com bastante metal cromado exposto (escapamento duplo, guidão, alguns componentes do motor), a Virago 250 é mais sensível à corrosão que motos com plástico/carenagem, especialmente em regiões litorâneas ou de garagem úmida. Lave e aplique cera automotiva ou produto específico para cromados a cada 2-3 meses para preservar o acabamento. Escapamento enferrujado por dentro (não só na aparência externa) pode indicar também formação de água de condensação — rodar trajetos mais longos periodicamente ajuda a evaporar essa umidade interna do sistema de escape.',
  },
]

const VIRAGO250_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo XV 250 Virago: motor V-twin carburado a ar exige atenção redobrada ao óleo e carburador',
    body: '500 km — Troca de óleo inicial (rodagem), inspeção geral. | 3.000 km — Troca de óleo (10W-40 ou 20W-40 JASO MA, 1,4L sem filtro). Lubrificar corrente. | 5.000 km — Inspeção e regulagem do carburador (marcha lenta, mistura). Verificação das duas velas NGK CR6HS. | 6.000 km — Troca de óleo + filtro (1,6L). Verificação da bomba de óleo (ruído, pressão). | 10.000 km — Troca das velas. Limpeza completa do carburador. Inspeção do chicote elétrico (conectores). | 12.000 km — Kit relação (corrente com retentor O-ring compatível CB400/450 + pinhão/coroa) se desgastado. | 15.000 km — Óleo da bengala dianteira. Revisão de freios (pastilha dianteira/lona traseira). | 20.000 km — Regulagem de válvulas (motor SOHC, folga conforme manual). Inspeção detalhada da bomba de óleo (engrenagens plásticas). | 40.000 km+ — Considerar substituição preventiva das engrenagens da bomba de óleo.',
  },
]

// ─── ZR 125 CONNECTED ────────────────────────────────────────────────────────
// ATENÇÃO — modelo confirmado, mas é um SCOOTER automático, não moto convencional:
// "Yamaha ZR Hybrid Connected" — scooter 125cc lançado oficialmente no Brasil em 2026,
// produzido em Manaus (AM). Motor Blue Core 125cc + sistema híbrido leve (Power Assist elétrico
// + Stop&Start). Transmissão CVT (correia, sem corrente/câmbio manual). Painel digital conectado
// via Bluetooth ao app Yamaha Motor On. Fonte oficial: yamaha-motor.com.br (produto "ZR Hybrid
// Connected") e cobertura de imprensa especializada (Motoo, AutoIndústria, Revista Duas Rodas).
// Especificações abaixo combinam dados oficiais Yamaha Brasil (peso, dimensões, preço, sistema
// híbrido) com especificações técnicas do motor 125cc Blue Core usado na família Ray ZR/Fluo
// (mesma base de motor SOHC 2V ar-refrigerado usada em outros mercados) — ONDE HOUVER DÚVIDA
// SOBRE UM NÚMERO EXATO (capacidade de óleo, gap de vela), isso está sinalizado no texto abaixo.
// Motor: 125cc SOHC 2V, refrigerado a ar, Blue Core + Hybrid (Power Assist + Stop&Start)
// Potência combustão: ~8,2 cv @ 6.500 rpm | Torque: ~1,0 kgf.m @ 5.000 rpm | Transmissão CVT
// Tanque: ~5,2L | Peso: ~98 kg | Freio dianteiro a disco, traseiro a tambor

const ZR125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'ZR Connected é scooter automático CVT — não tem corrente, câmbio manual nem embreagem a cabo',
    body: 'Diferente da maioria das motos deste catálogo, o Yamaha ZR 125 Connected é um scooter automático: a transmissão é por correia CVT (variação contínua), sem marchas manuais e sem corrente de transmissão exposta. Isso simplifica bastante a manutenção do dia a dia — não há relação (pinhão/coroa/corrente) para lubrificar nem embreagem a cabo para regular. Em compensação, a correia CVT e o variador (polias) exigem inspeção periódica em oficina especializada em scooter automático — não é o mesmo tipo de serviço que uma moto street convencional.',
  },
  {
    severity: 'OK',
    title: 'Óleo do motor: use produto JASO MB (scooter automático), NÃO o mesmo óleo de motos com embreagem manual',
    body: 'ATENÇÃO importante: scooters automáticos com câmbio CVT geralmente usam óleo de motor especificação JASO MB (para motores sem embreagem úmida compartilhando o óleo, já que a variação é por correia/polias, não embreagem a disco tradicional) — diferente do JASO MA usado em motos com câmbio manual como a R-15 ou a Virago. Confirme com concessionária Yamaha a especificação exata indicada no manual do proprietário do seu ZR Connected antes de trocar o óleo, e use sempre Yamalube ou produto explicitamente indicado para scooter automático Yamaha. Buscar o manual oficial Yamaha (disponível em yamaha-motor.com.br) é o caminho mais seguro para confirmar a capacidade exata em litros, pois não foi possível confirmar esse número com certeza nesta pesquisa.',
  },
  {
    severity: 'OK',
    title: 'Sistema híbrido leve (Power Assist + Stop&Start): não precisa de manutenção especial, mas cuide da bateria',
    body: 'O ZR Connected usa um sistema híbrido leve — não é um híbrido plug-in como carro, mas um auxílio elétrico que ajuda na arrancada por até 3 segundos (Power Assist) e desliga o motor em paradas (Stop&Start) para economizar combustível. Esse sistema depende de uma bateria em bom estado para funcionar corretamente — se a bateria estiver fraca, o Stop&Start pode parar de funcionar ou o Power Assist ficar menos perceptível (não é falha grave, é proteção do sistema). Mantenha a bateria carregada e, se notar o Stop&Start "sumindo", esse é o primeiro ponto a verificar antes de suspeitar de problema elétrico maior.',
  },
  {
    severity: 'OK',
    title: 'Painel digital conectado ao app Yamaha Motor On — use para acompanhar consumo e alertas',
    body: 'O ZR Connected tem painel 100% digital com Bluetooth integrado ao aplicativo Yamaha Motor On, que mostra informações do smartphone diretamente no display e pode ajudar a acompanhar consumo médio e alertas de manutenção. Vale a pena parear o app desde a compra — muitos scooters modernos usam esse tipo de app também para registrar lembretes de revisão programada, o que ajuda a não perder prazo de manutenção preventiva (crítico em CVT, que desgasta a correia de forma menos perceptível que uma corrente tradicional).',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT: inspecione por volta de 10.000-18.000 km — desgaste é menos visível que corrente',
    body: 'Como não existe corrente exposta para verificar visualmente a folga, o desgaste da correia CVT do ZR Connected é mais "silencioso": sintomas incluem perda de retomada, arranco mais fraco, ou trepidação leve na aceleração. A correia fica dentro da carcaça do CVT, que precisa ser aberta para inspeção — não é serviço de garagem, procure oficina especializada em scooter automático Yamaha (Fluo, NMax, Neo compartilham conceito similar de manutenção). Como referência de outros scooters Yamaha 125cc no Brasil, o intervalo de inspeção da correia costuma ficar na faixa de 10.000 a 18.000 km — confirme o valor exato no manual do seu ZR Connected, pois pode variar por ser modelo recente.',
  },
  {
    severity: 'OK',
    title: 'Pneus sem câmara (tubeless) em rodas menores — pressão calibrada semanalmente',
    body: 'Scooters pequenos como o ZR Connected usam rodas de aro reduzido (compare com a família Ray ZR/Fluo, que usa 12" dianteiro / 10" traseiro tipicamente) com pneus sem câmara. Rodas menores perdem pressão de forma mais perceptível no dia a dia — vale calibrar semanalmente, não só mensalmente como em motos de roda maior. Pneu murcho em scooter pequeno afeta a estabilidade em curva de forma mais notável que em moto grande. Marcas recomendadas para reposição: Pirelli Angel Scooter ou Michelin City Grip, ambos disponíveis nas medidas típicas de scooter 125cc automático.',
  },
]

const ZR125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Modelo muito recente no Brasil (2026): histórico de problemas ainda em formação',
    body: 'IMPORTANTE: o Yamaha ZR Hybrid Connected foi lançado oficialmente no Brasil em 2026 — é um modelo muito recente, o que significa que ainda não existe um histórico consolidado de problemas comuns reportados por proprietários brasileiros (diferente da R-15 e da Virago 250, que têm anos de uso documentado). As informações aqui são baseadas em características de projeto (sistema híbrido leve, CVT, motor Blue Core) e no padrão observado em outros scooters automáticos Yamaha (Fluo, NMax, Neo). Recomenda-se acompanhar fóruns e grupos de proprietários à medida que mais unidades rodam mais quilometragem.',
  },
  {
    severity: 'WARN',
    title: 'Sistema híbrido é peça mais complexa e cara que scooter convencional em caso de falha',
    body: 'O sistema Power Assist + Stop&Start agrega componentes eletrônicos adicionais (controle do sistema híbrido, sensores) que um scooter 125cc convencional sem essa tecnologia não tem. Em caso de falha desses componentes fora da garantia (a Yamaha oferece garantia estendida de 4 anos para este modelo, segundo material oficial de lançamento), o custo de reparo tende a ser mais alto que em um scooter simples, e a disponibilidade de peças eletrônicas específicas do sistema híbrido pode ser limitada nos primeiros anos após o lançamento, concentrada na rede oficial Yamaha.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro a tambor: manutenção diferente do freio a disco, atenção à regulagem',
    body: 'O ZR Connected usa freio dianteiro a disco hidráulico e freio traseiro a tambor mecânico (configuração comum em scooters de entrada). O freio a tambor não avisa desgaste de forma tão visual quanto o disco (não dá para ver a pastilha "de fora") — fique atento à necessidade de acionar a alavanca/pedal cada vez mais fundo para frear, sinal de que a lona está gasta ou o cabo/haste de acionamento precisa de regulagem. Inspecione a cada revisão programada.',
  },
  {
    severity: 'WARN',
    title: 'Consumo real pode variar da média declarada de fábrica dependendo do uso do Stop&Start',
    body: 'A eficiência de consumo declarada para scooters híbridos leves como o ZR Connected considera uso urbano típico com o Stop&Start atuando com frequência em paradas (semáforo, trânsito). Se o proprietário desativar essa função (quando disponível) ou rodar predominantemente em vias rápidas sem paradas, a economia de combustível esperada do sistema híbrido pode ser bem menor que a média anunciada. Não é defeito — é a natureza do sistema, que rende mais benefício em trânsito urbano parado do que em rodovia.',
  },
  {
    severity: 'WARN',
    title: 'Rodas pequenas (scooter): mais sensíveis a buracos e imperfeições do asfalto que motos de roda grande',
    body: 'Por usar rodas de diâmetro reduzido, típico de scooters urbanos de entrada, o ZR Connected é mais sensível a buracos, lombadas e imperfeições do pavimento que uma moto street/sportbike com rodas maiores — o impacto é transmitido de forma mais direta à suspensão e ao piloto. Reduza a velocidade em vias esburacadas e mantenha a pressão dos pneus sempre correta (pneu murcho piora bastante esse efeito). Inspecione a suspensão dianteira e traseira periodicamente em busca de vazamento de óleo ou folga excessiva, especialmente se a moto roda com frequência em vias urbanas malcuidadas.',
  },
]

const ZR125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma orientativo ZR 125 Connected: baseado em padrão de scooters automáticos Yamaha (confirme intervalos exatos no manual, modelo é recente)',
    body: '1.000 km — Primeira revisão: troca de óleo do motor (especificação JASO MB para CVT — confirmar exata no manual), inspeção geral, verificação do sistema híbrido/bateria. | 3.000 km — Troca de óleo do motor. | 6.000 km — Troca de óleo. Inspeção do filtro de ar. Verificação da pressão dos pneus (rodas pequenas perdem pressão mais perceptivelmente). | 10.000 km — Inspeção da correia CVT e do variador (serviço de oficina, requer abertura da carcaça). Verificação da bateria do sistema híbrido. | 12.000-18.000 km — Janela provável de troca da correia CVT conforme desgaste identificado na inspeção (varia por uso). | 15.000 km — Fluido de freio (disco dianteiro). Regulagem do freio a tambor traseiro. | 20.000 km — Revisão geral de suspensão e rolamentos de roda. Atualização de firmware do painel conectado, se disponível via concessionária. Nota: como o modelo foi lançado em 2026, use esse cronograma como referência inicial e sempre confira o manual do proprietário oficial (disponível no site yamaha-motor.com.br) para os intervalos exatos definidos pela Yamaha para este modelo específico.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'YZF R-15',
    yearFrom: 2023,
    yearTo: null,
    MACETES: R15_MACETES,
    PROBLEMAS: R15_PROBLEMAS,
    MANUTENCAO: R15_MANUTENCAO,
  },
  {
    modelName: 'XV 250 VIRAGO',
    yearFrom: 1989,
    yearTo: 2002,
    MACETES: VIRAGO250_MACETES,
    PROBLEMAS: VIRAGO250_PROBLEMAS,
    MANUTENCAO: VIRAGO250_MANUTENCAO,
  },
  {
    modelName: 'ZR 125',
    yearFrom: 2026,
    yearTo: null,
    MACETES: ZR125_MACETES,
    PROBLEMAS: ZR125_PROBLEMAS,
    MANUTENCAO: ZR125_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'YZF R-15',
    yearFrom: 2023, yearTo: null,
    tireSize: '100/80-17 (F) · 140/70-17 (R)',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo: F 28 / R 32 PSI. Com carona: F 28 / R 36 PSI (valores de referência para sportbike de entrada — confirme no manual, pressão exata de fábrica não constava no catálogo consultado). Pneus originais MRF (dianteiro diagonal Nylogrip Zapper-FX1, traseiro radial Revz-S), sem câmara. Alternativas recomendadas: Pirelli Diablo Rosso, Michelin Pilot Street.',
  },
  {
    modelName: 'XV 250 VIRAGO',
    yearFrom: 1989, yearTo: 2002,
    tireSize: '90/90-18 (F, com câmara) · 130/90-15 (R, com câmara)',
    frontPsi: 25, rearPsi: 29,
    frontPsiLoad: 29, rearPsiLoad: 33,
    notes: 'Solo (até 90kg de carga): F 25 / R 29 PSI. Com carona/carga (90-195kg): F 29 / R 33 PSI. Valores conforme manual do proprietário Yamaha Virago XV250S (175/200 kPa solo, 200/225 kPa com carga). Pneu original Pirelli MT66 nas duas rodas, ambos com câmara de ar — sempre verifique frio.',
  },
  {
    modelName: 'ZR 125',
    yearFrom: 2026, yearTo: null,
    tireSize: '90/90-12 (F) · 100/90-10 (R) — aproximado, confirmar no manual',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Valores de referência baseados em scooters automáticos 125cc Yamaha similares (família Ray ZR/Fluo) — o ZR Hybrid Connected é modelo muito recente (2026) e a pressão exata de fábrica não pôde ser confirmada nesta pesquisa. CONFIRME no manual do proprietário oficial antes de calibrar. Pneus sem câmara (tubeless), rodas pequenas — calibre semanalmente.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // YZF R-15
  { modelName: 'YZF R-15', yearFrom: 2023, yearTo: null, component: 'Óleo Yamalube 10W-40 JASO MA (~1,05L)', intervalKm: 5000, intervalMonths: 6, notes: 'Primeira troca aos 1.000 km. Motor DOHC líquido de giro alto — não atrasar a troca.', priority: 'HIGH', order: 1 },
  { modelName: 'YZF R-15', yearFrom: 2023, yearTo: null, component: 'Vela NGK MR8E-9 (gap ~0,8mm)', intervalKm: 8000, intervalMonths: null, notes: 'Motor de giro alto (10.000+ rpm) desgasta vela mais rápido. Verificar gap a cada revisão.', priority: 'MEDIUM', order: 2 },
  { modelName: 'YZF R-15', yearFrom: 2023, yearTo: null, component: 'Lubrificação corrente 520H (pinhão 14T / coroa 48T)', intervalKm: 500, intervalMonths: null, notes: 'Folga 25-35mm. Corrente sofre mais estresse térmico por giro alto do motor.', priority: 'HIGH', order: 3 },
  { modelName: 'YZF R-15', yearFrom: 2023, yearTo: null, component: 'Filtro de ar (papel, não lavável)', intervalKm: 10000, intervalMonths: 12, notes: 'Reduzir para 8.000 km em ambiente com muita poeira.', priority: 'MEDIUM', order: 4 },
  { modelName: 'YZF R-15', yearFrom: 2023, yearTo: null, component: 'Kit relação completo (corrente 520H + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: 'Avaliar desgaste — uso esportivo acelera necessidade de troca.', priority: 'HIGH', order: 5 },
  { modelName: 'YZF R-15', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT (sistema com ABS duplo)', intervalKm: 15000, intervalMonths: 24, notes: 'Purga exige procedimento específico por causa do módulo ABS — buscar oficina especializada.', priority: 'HIGH', order: 6 },
  { modelName: 'YZF R-15', yearFrom: 2023, yearTo: null, component: 'Embreagem deslizante/assistida — folga do cabo', intervalKm: 5000, intervalMonths: null, notes: 'Folga de 10-15mm na ponta da alavanca. Verificar junto da troca de óleo.', priority: 'MEDIUM', order: 7 },
  { modelName: 'YZF R-15', yearFrom: 2023, yearTo: null, component: 'Revisão de suspensão, rolamentos de roda e direção', intervalKm: 20000, intervalMonths: 24, notes: 'Oficina especializada Yamaha — motor DOHC 4V exige ferramental específico para folga de válvulas.', priority: 'MEDIUM', order: 8 },
  { modelName: 'YZF R-15', yearFrom: 2023, yearTo: null, component: 'Primeira revisão obrigatória', intervalKm: 1000, intervalMonths: 6, notes: 'Troca de óleo, inspeção geral, aperto de parafusos, ajuste de corrente — condição de garantia.', priority: 'CRITICAL', order: 9 },

  // XV 250 VIRAGO
  { modelName: 'XV 250 VIRAGO', yearFrom: 1989, yearTo: 2002, component: 'Óleo 10W-40 ou 20W-40 JASO MA (1,4L s/ filtro / 1,6L c/ filtro)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor V-twin a ar. Uso urbano intenso: preferir 20W-40. Nunca óleo sem JASO MA (embreagem úmida).', priority: 'HIGH', order: 1 },
  { modelName: 'XV 250 VIRAGO', yearFrom: 1989, yearTo: 2002, component: 'Velas NGK CR6HS ×2 (par, uma por cilindro)', intervalKm: 5000, intervalMonths: null, notes: 'Trocar sempre em par mesmo que só uma pareça gasta. Cor da vela indica mistura do carburador.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XV 250 VIRAGO', yearFrom: 1989, yearTo: 2002, component: 'Limpeza do carburador', intervalKm: 15000, intervalMonths: 12, notes: 'Motor carburado sofre com etanol degradado. Drenar cuba se moto ficar parada +30 dias.', priority: 'HIGH', order: 3 },
  { modelName: 'XV 250 VIRAGO', yearFrom: 1989, yearTo: 2002, component: 'Lubrificação corrente (compatível CB400/450 com O-ring)', intervalKm: 600, intervalMonths: null, notes: 'Corrente com retentor de borracha dura muito mais que sem retentor.', priority: 'HIGH', order: 4 },
  { modelName: 'XV 250 VIRAGO', yearFrom: 1989, yearTo: 2002, component: 'Inspeção da bomba de óleo (engrenagens plásticas)', intervalKm: 20000, intervalMonths: 12, notes: 'Ponto crítico documentado do modelo. Substituição preventiva recomendada após 40.000 km.', priority: 'CRITICAL', order: 5 },
  { modelName: 'XV 250 VIRAGO', yearFrom: 1989, yearTo: 2002, component: 'Óleo da bengala dianteira', intervalKm: 15000, intervalMonths: null, notes: 'SAE 10W, verificar volume no manual — trocar junto com vedante se necessário.', priority: 'MEDIUM', order: 6 },
  { modelName: 'XV 250 VIRAGO', yearFrom: 1989, yearTo: 2002, component: 'Regulagem de válvulas (motor SOHC)', intervalKm: 20000, intervalMonths: 24, notes: 'Motor frio. Conferir folga exata no manual de serviço — não disponível na pesquisa desta ficha.', priority: 'HIGH', order: 7 },
  { modelName: 'XV 250 VIRAGO', yearFrom: 1989, yearTo: 2002, component: 'Inspeção de freios (pastilha dianteira / lona traseira)', intervalKm: 6000, intervalMonths: 12, notes: 'Configuração mista: disco na frente, tambor atrás (verificar versão específica).', priority: 'MEDIUM', order: 8 },
  { modelName: 'XV 250 VIRAGO', yearFrom: 1989, yearTo: 2002, component: 'Revisão do chicote elétrico e conectores', intervalKm: null, intervalMonths: 24, notes: 'Unidades antigas (20+ anos) frequentemente têm conectores oxidados. Aplicar graxa dielétrica.', priority: 'MEDIUM', order: 9 },

  // ZR 125
  { modelName: 'ZR 125', yearFrom: 2026, yearTo: null, component: 'Óleo do motor (especificação JASO MB — confirmar no manual)', intervalKm: 3000, intervalMonths: 6, notes: 'Scooter CVT usa especificação diferente de motos com embreepragem manual. Confirmar na concessionária.', priority: 'HIGH', order: 1 },
  { modelName: 'ZR 125', yearFrom: 2026, yearTo: null, component: 'Inspeção da correia CVT e variador', intervalKm: 10000, intervalMonths: 12, notes: 'Serviço de oficina especializada — requer abertura da carcaça CVT. Modelo recente, confirmar intervalo exato no manual.', priority: 'HIGH', order: 2 },
  { modelName: 'ZR 125', yearFrom: 2026, yearTo: null, component: 'Verificação da bateria (sistema híbrido Power Assist/Stop&Start)', intervalKm: null, intervalMonths: 6, notes: 'Bateria fraca desativa o Stop&Start como proteção. Primeiro ponto a checar se sistema "sumir".', priority: 'HIGH', order: 3 },
  { modelName: 'ZR 125', yearFrom: 2026, yearTo: null, component: 'Filtro de ar', intervalKm: 6000, intervalMonths: 12, notes: 'Inspecionar a cada troca de óleo.', priority: 'MEDIUM', order: 4 },
  { modelName: 'ZR 125', yearFrom: 2026, yearTo: null, component: 'Pressão dos pneus (rodas pequenas, tubeless)', intervalKm: null, intervalMonths: 1, notes: 'Calibrar semanalmente — rodas pequenas perdem pressão de forma mais perceptível.', priority: 'MEDIUM', order: 5 },
  { modelName: 'ZR 125', yearFrom: 2026, yearTo: null, component: 'Fluido de freio dianteiro (disco)', intervalKm: 15000, intervalMonths: 24, notes: 'Freio traseiro é a tambor — regulagem mecânica, não fluido.', priority: 'HIGH', order: 6 },
  { modelName: 'ZR 125', yearFrom: 2026, yearTo: null, component: 'Regulagem do freio traseiro a tambor', intervalKm: 6000, intervalMonths: 12, notes: 'Lona gasta não é visível como pastilha de disco — atenção ao curso do pedal/alavanca.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ZR 125', yearFrom: 2026, yearTo: null, component: 'Primeira revisão obrigatória', intervalKm: 1000, intervalMonths: 6, notes: 'Troca de óleo, inspeção geral, verificação do sistema híbrido/bateria — condição de garantia (4 anos).', priority: 'CRITICAL', order: 8 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Yamaha Street Pequenas (YZF R-15 / XV 250 Virago / ZR 125 Connected)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Yamaha', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'Yamaha', vehicleTypeId: motoType.id },
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

  console.log('✅ Yamaha Street Pequenas concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
