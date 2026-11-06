// seed-honda-crf-competition.ts — Honda CRF motocross/enduro 4T competição
// CRF 250 R · CRF 250 RX · CRF 250 X · CRF 450 R · CRF 450 RX · CRF 450 X
// Motos de competição 4 tempos — alta manutenção por horas de uso, não km
// CRF 250R/RX/X: 249cc DOHC, liquid-cooled; CRF 450R/RX/X: 449cc DOHC, liquid-cooled
// Top-end: piston/rings a cada 40-60h (250) ou 20-30h (450); rebuild total a cada 80-100h
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

// ─── CRF 250 R (2004+) — motocross 4T intermediário ─────────────────────────

const CRF250R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 249cc DOHC 4 válvulas, liquid-cooled — manutenção por HORAS de uso, não por km; top-end a cada 40-60 horas (uso em competição)',
    body: 'A CRF 250R é uma moto de competição: seu ciclo de manutenção é baseado em horas de uso, não km. Piston e anéis: a cada 40-60 h de corrida (ou 50-80 h para uso recreativo). Válvulas: inspeção a cada 20 h (folga IN 0,10-0,15 mm / EX 0,15-0,20 mm com motor frio). Rebuild completo (biela, rolamentos, câmbio): a cada 100-120 h. Use um horímetro instalado no guidão (Koso, Trail Tech — R$80-180) para controle preciso. Óleo: 10W-30 JASO MA, ~750 mL com filtro. Troca: a cada 5-7 horas de uso ou após cada final de semana de corrida.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LBPR7EIX (iridium) — gap 0,6 mm; trocar a cada 20-25 horas de uso; vela descartada precocemente = melhor performance constante',
    body: 'A CRF 250R usa vela NGK LBPR7EIX (iridium de competição). Gap: 0,6 mm. Em competição, muitos pilotos trocam a cada 20 h — a iridium já teve degradação perceptível e pode causar falhas de ignição sob alta carga. Vela com eletrodo preto/fuligem: mistura rica ou filtro de ar sujo. Vela com eletrodo branco: mistura pobre, possível superaquecimento — ajustar jetting do carburador (modelos pré-2014). Torque de instalação: 10-12 N.m (cuidado com rosca de alumínio no cabeçote). Sempre usar pasta de cobre na rosca da vela.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar espuma: limpar e reimpregar após CADA saída; moto de competição não tolera filtro sujo — motor aspira partículas de terra diretamente',
    body: 'O filtro de ar da CRF 250R é espuma de célula aberta (foam). Procedimento após cada corrida: (1) Remover filtro (anel de travamento, 2 min). (2) Lavar com sabão neutro e água morna. (3) Secar completamente. (4) Aplicar óleo de filtro de motocross (Bel-Ray, Motorex, No-Toil) — impregnar completamente e tirar o excesso com pano limpo. (5) Reinstalar com vedação de graxa nas bordas do airbox. Filtro seco: motor aspira terra fina diretamente → risca o cilindro Nikasil. Dano por filtro sujo custa R$2.000-5.000 em retífica de cilindro (Nikasil não é reparável, exige substituição ou replating).',
  },
  {
    severity: 'OK',
    title: 'Embreagem da CRF 250R: configurar alavanca antes de pilotar; discos de embreagem têm vida curta em competição (30-50 horas)',
    body: 'A embreagem da CRF 250R em uso de motocross se desgasta muito mais rápido que em trail. Discos de fibra e aço: inspeção a cada 30-40 h. Disco de fibra limite: espessura < 2,6 mm. Molas de embreagem: progressivas (Prox, Barnett) aumentam performance em largada e reduzem escorregamento. Ajuste da alavanca: 2 mm de folga livre antes de começar a trabalhar — muito folga = embreagem não desengata completamente; pouca folga = embreagem escorrega em potência. Para corridas de enduro (mais tempo de uso): substituição preventiva completa a cada 80 h.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520: verificar antes de CADA saída; corrente esticada em motocross = risco de pular no salto e travar a roda traseira',
    body: 'A CRF 250R usa corrente 520 x 114 elos. Folga: 40-50 mm no ponto mais tenso (mais que motos de rua — pino de roda longa tem mais variação em movimentos de suspensão). Em motocross com saltos e aterrissagens: corrente mal tensionada pode pular da roda ou do pinhão no impacto da aterrissagem — travamento instantâneo da roda traseira. Lubrificação: spray específico de motocross (não o-ring friendly pois o-rings em correntes de competição são raros). DID 520MX ou RK 520MXZ4: correntes sem o-ring para competição (R$150-220). Troca: a cada 25.000 km de trilha ou ~150 h de uso pesado.',
  },
  {
    severity: 'WARN',
    title: 'Radiadores sujeitos a colisão em trilha/motocross — grade de proteção é investimento obrigatório (R$120-250)',
    body: 'Os radiadores da CRF 250R são expostos nas laterais do quadro. Em motocross ou trilha com arbustos e quedas: amassado no radiador = perda de refrigeração = motor superaquece em segundos. Grade de proteção de alumínio (Works Connection, Devol, UFO): R$120-250 o par. Sintoma de radiador parcialmente bloqueado: temperatura sobe mais rápido que o normal, motor perde potência no final de cada manche. Se radiador vazar: parar IMEDIATAMENTE — motor em alta RPM sem refrigeração líquida funde dentro de 2-3 minutos. Selante de radiador de emergência (Bar\'s Leaks Radiator) no kit de viagem.',
  },
  {
    severity: 'OK',
    title: 'Pneus: 80/100-21 (F) · 110/90-19 (R) — calibrar 10-13 PSI para motocross; variar por tipo de terreno; sem câmara interna (tubeless) disponível para uso de trilha',
    body: 'Pressão para motocross: dianteiro 10-12 PSI / traseiro 12-13 PSI. Em terreno duro (loam compacto, rocha): até 13-14 PSI para mais responsividade. Em areia: reduzir para 9-10 PSI (mais área de contato). Pneus de competição mais usados: Dunlop MX33 (bom para condições intermediárias), Dunlop MX14 (solo mole), Pirelli MX32 Pro (versátil). A CRF 250R usa câmara de borracha interna (tube type) — furo em corrida exige suporte de borracheiro na pista. Mousse de espuma (Mefo, Dunlop): elimina furagem, custo ~R$200-350 por roda, mas ride quality muda.',
  },
]

const CRF250R_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Válvulas de titânio "apertam" progressivamente — quando folga chega a zero, queima o assento sem aviso; motor perde compressão e para de ligar a frio',
    body: 'As válvulas de escape da CRF 250R (titânio nas competições, aço nas versões mais acessíveis) têm tendência de apertar com horas de uso: a folga diminui progressivamente. Quando a folga chega a zero: a válvula não fecha completamente → gases quentes passam em detalhe pela vedação → assento queimado → perda de compressão. Sintoma inicial: dificuldade de ligar a frio mesmo com motor saudável. Sintoma avançado: motor que para de subir de rotação, perda severa de potência. Verificação obrigatória: a cada 20 h de uso intenso. Troca de assento de válvula: R$800-1.500 (retífica especializada).',
  },
  {
    severity: 'WARN',
    title: 'Desgaste prematuro do pino do pistão entre 40-60 horas em motos de competição — rolamento de biela e pino são componentes críticos de vida curta',
    body: 'O pino de pistão (wrist pin) e seu rolamento se desgastam rapidamente em motores de alta rotação de competição. Sintoma: trincado metálico leve ao acelerar em marcha morna ("batida" no cabeçote). Verificação: a cada 60 h de uso. Kit de rebuild de top-end (pistão, anéis, pino, rolamento de biela): Prox Racing ou Wiseco — R$400-700 importado. Usar SEMPRE kit completo: trocar só o pino sem o rolamento = falha garantida em 20 h. Ao fazer top-end: medir cilindro com micrometro — se fora de especificação, Nikasil comprometido (exige troca de cilindro ou replating).',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de líquido de arrefecimento pelo bomba d\'água (water pump) — comum após 60-80 h; retentores e vedações têm vida curta em uso intenso',
    body: 'A bomba d\'água da CRF 250R tem retentores que se desgastam com horas de uso. Sintoma: líquido de arrefecimento aparece no lado direito do motor, abaixo da tampa da bomba d\'água; óleo emulsificado (aspecto marrom-leitoso no visor ou na tampa) indica que o retentor interno falhou e o líquido contaminou o óleo. Troca de retentores: a cada 80-100 h preventivamente. Kit de retentores (Athena, Prox): R$80-150. Se óleo contaminado por líquido: parar a moto, lavar completamente o circuito de óleo com diesel e trocar imediatamente — motor funciona por horas contaminado antes de falhar definitivamente.',
  },
  {
    severity: 'WARN',
    title: 'Bengala invertida Showa 48/49mm (modelos 2010+): atenção ao nível de óleo e retentores — retentor com névoa oleosa = trocar imediatamente antes de danificar a haste cromada',
    body: 'A CRF 250R usa bengala invertida (forks) 48-49mm Showa (modelos 2010+) ou Kayaba. Retentores: inspeção visual a cada 20-25 h (mais frequente que motos de rua por vibração extrema). Névoa oleosa na haste: retentor começando a falhar. Gota de óleo acumulada: troca imediata. Haste riscada por partícula de terra: estraga o retentor novo em segundos — proteger as hastes com protetor de neoprene (Kayaba Protex, R$60-120). Nível de óleo: verificar e ajustar na revisão de bengala — mais alto = mais rigidez; mais baixo = mais maciez. Óleo de bengala: Showa SS-05 5W ou Motul Fork Oil 5W, ~450-500 mL por tubo (confirmar no manual do ano).',
  },
  {
    severity: 'DANGER',
    title: 'Superaquecimento rápido em motocross (pausa longa ou lareiras de motor) — motor de alumínio de alta compressão danifica em 3-5 minutos sem circulação de arrefecimento',
    body: 'A CRF 250R tem motor de alta compressão (13,5-14,0:1) que gera muito calor. Em condições de superaquecimento: (1) pausa na pista com motor ligado parado por >2 min; (2) travamento de roda traseira que para o motor de golpe após bloco quente; (3) radiador bloqueado por terra. Sintoma: vapor saindo do canal de retorno do radiador ou de sob a tampa; vapor na saída do escapamento (líquido no cilindro — pior cenário). Ação imediata: desligar motor, abrir a tampa do radiador devagar com pano para liberar pressão, aguardar 15 min antes de verificar nível. Preventivo: verificar nível antes de cada manche; adicionar aditivo Wetter Water (anti-espuma) no radiador para melhor transferência de calor.',
  },
]

// ─── CRF 250 X (2004–2017) — enduro florestal/off-road (baseada na 250R mas adaptada) ──

const CRF250X_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Diferença chave da CRF 250 X vs 250 R: motor desintonizado para durabilidade, ignição com mapa para enduro, embreagem mais suave, partida elétrica em alguns anos',
    body: 'A CRF 250X compartilha a base da 250R mas foi otimizada para enduro (uso off-road de longa duração, não velocidade). Diferenças: menor taxa de compressão (relação 11,7:1 vs 14:1 da 250R), mapa de ignição para entrega mais suave (melhor para terrenos técnicos), embreagem com força de acionamento mais baixa (dedos não cansam em trilha de horas), razão de transmissão mais longa (mais torque em low-speed). Disponível com partida elétrica (versões 2006-2017). Intervalo de manutenção: menos crítico que a 250R — top-end a cada 60-80 h, não 40-60 h.',
  },
  {
    severity: 'OK',
    title: 'Mapa de ignição alterável via jumper no chicote — "Race map" (250R-like) vs "Woods map" (padrão) — conectar/desconectar conforme o terreno',
    body: 'A CRF 250X tem dois mapas de ignição acessíveis via jumper no chicote do motor (consultar manual do ano para localização exata). Mapa Woods (padrão): entrega suave de potência no baixo giro, ideal para trilha técnica, floresta densa, rochas. Mapa Race (jumper conectado): avanço de ignição mais agressivo, potência mais alta acima de 8.000 rpm, mais próximo da 250R. Para enduro de dia inteiro: usar Woods map — menos fadiga mental, moto mais "relaxada". Para seções rápidas ou MX em campo de enduro: comutar para Race. A comutação leva 30 segundos com o motor frio.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas para CRF 250X (2004-2017): piston Wiseco 77mm, filtro de ar Twin Air, rolamentos SKF — mercado de peças de enduro bem estabelecido no Brasil',
    body: 'A CRF 250X foi vendida por 13 anos no mesmo modelo base, criando grande disponibilidade de peças aftermarket. Peças alternativas de qualidade: Pistão Wiseco (77mm de série) com kit de anéis separado — R$350-550 (importado). Filtro de ar Twin Air (espuma dupla) — R$120-180, mais filtragem que original. Rolamentos de roda SKF (R$45-80 cada) duram mais que Honda OEM em uso off-road pesado. Kit de retentores bengala ProX 47mm (versão X usa 47mm vs 48mm da R). Kit de vedações completo Athena: R$280-450. Cadê encontrar: DI Bikes, JO Trilha, TDC Motos (todas com envio nacional).',
  },
]

const CRF250X_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Partida elétrica (modelos com kick+elétrica): motor de arranque fraco em motor frio — bateria YTZ7S se descarrega em 5-6 tentativas; carregar entre as saídas',
    body: 'A CRF 250X com partida elétrica usa bateria YTZ7S (6 Ah). Problema em tempo frio (<15°C) ou motor longo parado: o motor de partida gira muito devagar e não consegue superar a alta compressão do motor frio. Sintoma: relê de partida "claqueteia" em vez de girar o motor. Soluções: (1) Usar alavanca de decompressor manual (se disponível) junto com a elétrica; (2) Dar o kick 2-3 vezes sem ignição (para lubrificar o pistão a frio) antes de acionar a elétrica; (3) Manter bateria em carregador de manutenção (CTEK M10, R$180-250) quando a moto ficar mais de 2 semanas parada. Bateria substituta: Yuasa YTZ7S ou equivalente R$200-350.',
  },
  {
    severity: 'WARN',
    title: 'Junta do cabeçote: vida útil de 80-120 h em uso de competição — queimar a junta (head gasket) em motor 4T de alta compressão causa dano progressivo ao cilindro',
    body: 'A CRF 250X tem cabeçote removido para rebuild a cada 80-120 h. A junta do cabeçote é um componente de desgaste: com ciclos de calor/frio, ela perde capacidade de vedação. Sintoma de junta queimada: bolhas no radiador ao ligar o motor; vapor branco no escapamento (líquido passando para câmara de combustão); baixa compressão em teste; líquido no óleo (nível de óleo sobe, aspecto leitoso). Torque de reinstalação do cabeçote: CRÍTICO — usar ordem cruzada (padrão Honda), apertar em 4 estágios até 35-38 N.m. Usar junta de cabeçote OEM Honda (Cometic pode ser usada) — nunca reutilizar a junta antiga.',
  },
]

// ─── CRF 250 RX (2019+) — enduro/rally road-legal ────────────────────────────

const CRF250RX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CRF 250 RX: baseada na 250R de competição mas com luzes, suporte de placa e mapa de motor otimizado para enduro — documentação possível em alguns estados do Brasil',
    body: 'A CRF 250RX é a versão "enduro" licenciada da CRF 250R: usa o mesmo motor e suspensão da 250R mas adiciona farol, luz traseira/freio, buzina e suporte de placa. É documentável em estados brasileiros onde a legislação aceita motos de enduro com kit de rua. Diferença de comportamento vs 250R: mapa de ignição ligeiramente diferente para entrega mais linear em baixo-médio giro (enduro exige controle fino em terreno técnico). Vantagem sobre a 250X: motor mais potente (taxa de compressão próxima à 250R), suspensão de competição (Showa invertida), mais leve (~107 kg vs ~130 kg da 250X).',
  },
  {
    severity: 'OK',
    title: 'Sistema elétrico mínimo (farol, luz de freio, buzina) — bateria pequena YTZ4L; não sobrecarregar com acessórios; conector de GPS de alta resistência recomendado',
    body: 'A CRF 250RX tem sistema elétrico minimal: gerador pequeno dimensionado apenas para luz e carga básica. Adicionar GPS, celular via USB e luz extra: risco de sobrecarga do gerador (alternador com ~80W). Para enduro com GPS: usar GPS com bateria interna (Garmin Montana, Garmin Etrex) — não depender da tomada da moto. Fio de aterramento (ground wire) adicional do quadro para bateria: melhora partida elétrica e estabilidade do sistema em uso off-road. Bateria YTZ4L: verificar carga a cada 3 meses se moto ficar parada.',
  },
  {
    severity: 'OK',
    title: 'Peças: mesmos consumíveis da CRF 250R (piston, rolamentos, filtro, vela) — vantagem de intercambialidade amplia disponibilidade de peças no Brasil',
    body: 'A maior vantagem da CRF 250RX para manutenção: compartilha virtualmente todos os componentes internos com a CRF 250R (motor, suspensão, transmissão). Isso significa que qualquer loja de MX bem abastecida terá peças compatíveis. Diferenças: chassi ligeiramente diferente (suporte de placa, protetor de motor de série), pneu traseiro de série diferente (mais road-biased que o MX puro da 250R). Pneus originais 250RX: Dunlop D803 ou similar (perfil enduro, não MX puro) — mais durável em uso misto asfalto/terra.',
  },
]

const CRF250RX_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Mesmos problemas de válvulas da CRF 250R (base do mesmo motor) — inspeção a cada 20 horas permanece obrigatória mesmo em uso de enduro mais leve',
    body: 'A CRF 250RX compartilha o motor da 250R. Todos os problemas de válvulas, top-end e superaquecimento da 250R se aplicam igualmente. A diferença: uso de enduro (velocidades menores, menos RPM de pico constante) faz o motor trabalhar em faixa mais estreita, reduzindo levemente o estresse térmico. Mesmo assim: não estender o intervalo de válvulas além de 25 h — em competição de enduro real, o motor trabalha em RPM altas por períodos prolongados tanto quanto no MX. Registro: anotar as horas de cada revisão para manter o histórico.',
  },
]

// ─── CRF 450 R (2002+) — motocross 4T profissional ───────────────────────────

const CRF450R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 449cc DOHC de altíssimo desempenho — manutenção MUITO mais rigorosa que 250cc; top-end a cada 15-25 horas; motor que ultrapassa 13.000 rpm regularmente',
    body: 'A CRF 450R é o ápice do motocross 4 tempos Honda. Motor 449cc DOHC com taxa de compressão de 13,5-14,5:1 (varia por geração). A manutenção é mais intensa que qualquer outra moto catalogada aqui: Piston + anéis: a cada 15-25 h de corrida (alguns pilotos amadores fazem 30-35 h, mas risco alto de falha). Biela + rolamento: a cada 40-60 h. Válvulas: inspeção a cada 15 h (a 450 aperta as válvulas mais rápido que a 250). Óleo: trocar a cada 2-3 h de corrida ou após CADA final de semana de MX. Em competições nacionais: mecânicos profissionais fazem rebuild de motor a cada 3-4 manches.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA, 1.000-1.100 mL (com filtro) — trocar a cada 2-3 horas de uso real; não confiar apenas na aparência do óleo',
    body: 'A CRF 450R exige troca de óleo frequentíssima: a cada 2-3 horas de uso em competição (1 fim de semana de treino). A razão: alta temperatura e taxa de cisalhamento do motor de 449cc degrade o óleo muito mais rápido. Óleo recomendado: Honda HP4M 10W-30 ou equivalente JASO MA de alta qualidade (Motul 300V 10W-40 é muito usado em competição). Nunca use óleo de carro — aditivos de atrito interferem na embreagem úmida. Filtro de óleo: trocar a CADA troca de óleo (nunca reutilizar). Capacidade: 1.000 mL sem filtro / 1.100 mL com filtro novo.',
  },
  {
    severity: 'WARN',
    title: 'Potência muito alta (50+ cv) exige piloto experiente — a CRF 450R é inadequada para iniciantes; erros de pilotagem causam acidentes graves',
    body: 'A CRF 450R produz ~56 cv em ~10.000 rpm em um pacote de ~107 kg. A relação potência/peso é maior que a de muitas superbikes de rua. Para pilotos iniciantes ou em transição da 250cc: fazer um período de adaptação obrigatório antes de ir à pista. A 450 "perdoa menos": em saltos, a potência de frenagem do motor é muito maior (risco de travar roda ao soltar o acelerador em plena velocidade). Na partida (holeshot): manter roleto no guidão e pé no freio até a bandeira cair — largada impulsiva = queda ou salto forçado.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LBPR7EIX: trocar a cada 15 horas — mais frequente que na 250cc por maior carga térmica do motor de 450cc; sempre ter vela reserva no kit de corrida',
    body: 'Mesma vela da CRF 250R, mas o intervalo de troca é mais curto: 15 h (vs 20-25 h na 250R). O motor de 449cc gera muito mais calor por combustão e a vela se desgasta mais rápido. Manter 2 velas reserva no kit de corrida: uma para emergência durante a corrida (troca de vela: 5 min com ferramentas), uma para a revisão pós-corrida. Gap: 0,6 mm — medir com calibrador de lâmina (não fio) para precisão. Importante: nunca abrir o gap além de 0,7 mm — motor de alta compressão tem dificuldade de saltar o arco com gap maior.',
  },
  {
    severity: 'OK',
    title: 'Partida: sistema de "EZ Start" em modelos 2017+ (câmara de decompressão automática) — em modelos anteriores, usar decompressor manual no kick com técnica correta',
    body: 'Modelos CRF 450R 2017+ têm sistema de decompressão automática no kick (facilita a partida). Modelos anteriores (2002-2016) exigem técnica: (1) Levar o pé até o PMS de compressão devagar (resistência máxima); (2) Puxar a alavanca de decompressor e avançar o kick ligeiramente além do PMS; (3) Soltar o decompressor e dar o kick completo com força. Errar a técnica = kick "bate de volta" no pé com força total do motor de 450cc — risco de lesão no joelho. Nunca tentar ligar a CRF 450R com o pé no kick sem passar pelo PMS primeiro. Partida elétrica disponível em modelos 2018+.',
  },
]

const CRF450R_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Overrev ("ultrapassar a rotação máxima") destrói motor em segundos — em saltos, soltar o acelerador imediatamente ao perceber que a roda sair do chão',
    body: 'Em saltos de motocross, quando a roda traseira sai do chão e não tem resistência: o motor sobre para rotação máxima em décimos de segundo (overrev). Em motores de 250cc isso é tolerado por alguns segundos. Em 450cc com suas tolerâncias de precisão: 2-3 segundos de overrev podem quebrar a biela, fundir o pistão ou estourar o motor. Técnica correta no salto: (1) Recolher o acelerador ao sair da rampa; (2) Usar freio traseiro levemente no ar para reduzir a rotação da roda; (3) Selecionar marcha correta antes da aterrissagem. Limitador eletrônico de rotação (rev limiter): presente, mas projetado para uso em terra, não para absorver overrev de salto.',
  },
  {
    severity: 'DANGER',
    title: 'Válvulas de titânio da CRF 450R têm vida curta — folga zero = motor fundido; em pilotos que fazem holeshots e alta RPM constante, verificar a cada 10-12 horas',
    body: 'As válvulas de titânio da 450R "apertam" muito mais rápido que na 250R pela maior temperatura de combustão. Em pilotos que competem em ritmo intenso: inspeção de válvulas a cada 10-12 h (mais cedo que o recomendado de 15 h). Folga de escape apertando → gases quentes escapam durante a ignição → assento queimado → perda de compressão → motor para de ligar ou perde metade da potência. O assento queimado na 450R é mais caro de reparar: R$1.200-2.500 em retífica especializada. Prevenção: manter horímetro calibrado e nunca pular a revisão de válvulas.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro (linkage shock) desgasta ponteiras e rolamentos em uso intenso — checar folgas na ligagem a cada 25 horas',
    body: 'O amortecedor traseiro da CRF 450R e seu sistema de ligagem (Pro-Link) têm rolamentos agulha e bronzes que se desgastam com o impacto contínuo de saltos e bumps. Sintoma: "folga" ou "batida" seca na parte traseira ao frear ou em impactos. Verificação: segurar a moto pelos dois lados e balançar o subquadro — qualquer folga indica rolamentos desgastados. Kit de rolamentos de ligagem: R$150-300 (All Balls Racing, compatível com CRF 450R). Troca preventiva: a cada 80-100 h. Negligenciar os rolamentos de ligagem resulta em desgaste acelerado do próprio amortecedor traseiro (dano colateral de R$800-2.500).',
  },
]

// ─── CRF 450 X (2005–2017) — enduro/off-road pesado ──────────────────────────

const CRF450X_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CRF 450 X: versão enduro da 450R — motor com mapa mais linear, embreagem hydraulica Magura de série, tanque maior (9,5 L), mais pesada (127 kg vs 107 kg)',
    body: 'A CRF 450X é a 450R configurada para enduro de longa distância: embreagem hydraulica Magura (acionamento suave para dedos em trilha longa), tanque de 9,5 L (vs ~1,9 L da 450R — autonomia para provas de 150-200 km). Mapa de ignição: menos agressivo no baixo-médio giro (melhor controle em terreno técnico). Freio dianteiro: disco maior que a 450R (melhor para descidas longas em enduro). Chassi: configurado para equilíbrio em velocidade média (enduro) não para manobrabilidade extrema (MX). A 450X aceita kit de luzes para documentação (mais fácil que a 450R).',
  },
  {
    severity: 'OK',
    title: 'Embreagem hidráulica Magura (sistema fechado) — não tem ajuste de cabo; verificar nível de fluido no reservatório a cada 10 horas; purgar quando alavanca ficou esponjosa',
    body: 'A embreagem hidráulica Magura da CRF 450X é um diferencial para uso em enduro longo: acionamento mais leve, sem necessidade de ajuste de folga de cabo, consistência constante em longos percursos. Fluido: DOT 4 (pureza essencial — nunca DOT 5 à base de silicone). Nível: reservatório transparente na alavanca, verificar a cada 10 h. Alavanca esponjosa: purga (bleeding) necessária — ar no sistema. Purga da embreagem hidráulica Magura: usar seringa de purga de freio na parte mais alta do sistema (haste do master cylinder). Se fluido azul ou preto: trocar completamente. Kit de reparo Magura HC1: R$120-200.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas CRF 450X: pistão Wiseco 96mm, válvulas Kibblewhite (aço inox, mais duráveis que titânio), rolamentos All Balls — reduzem custo total de posse',
    body: 'A CRF 450X tem excelente suporte aftermarket. Peças alternativas de qualidade com melhor custo-benefício: Pistão Wiseco 96mm (padrão) ou ProX: R$500-800 importado vs R$1.200-1.800 Honda OEM. Válvulas Kibblewhite de aço inox: mais caras que as de titânio originais mas duram 2-3x mais em uso de enduro (menor risco de apertar). Não usar em MX onde peso de válvula importa. Rolamentos de roda: All Balls Complete Bearing Kit — R$180-280 (roda F+R) vs R$400-600 Honda. Pneus: Pirelli Scorpion Rally ou Michelin Enduro Medium para uso misto.',
  },
]

const CRF450X_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Detonação (pinging/knocking) em gasolina de baixa octanagem — a CRF 450X tem alta compressão e requer mínimo 95 octanas; no interior do Brasil, usar aditivada 92 é arriscar detonação',
    body: 'O motor da CRF 450X com sua alta taxa de compressão exige combustível de boa qualidade. Em regiões do interior onde a gasolina aditivada tem 92 octanas (abaixo da especificação): o motor pode detonar (knocking) em aceleração forte. Sintoma: "ping" ou "knock" metálico ao acelerar em marcha pesada, especialmente em subidas. Detonação contínua: destruição de pistão e biela em poucas horas. Solução: usar gasolina Podium/Aditivada de postos confiáveis de rodovias. Na falta: misturar álcool anidro (etanol 99,9%) na proporção 20% etanol + 80% gasolina para elevar a octanagem. Ajustar jetting do carburador ao usar mistura com etanol.',
  },
  {
    severity: 'WARN',
    title: 'Bengala Showa 47mm da CRF 450X: coil spring mais mole que a 450R (para conforto em enduro) — em trilha técnica pesada, considerar mola mais dura e ajuste de compressão',
    body: 'A bengala dianteira Showa da CRF 450X vem com mola um grau mais mole que a 450R, para conforto em longas horas de enduro. Para pilotos acima de 80 kg em trilha técnica (pedras grandes, raízes): a mola padrão pode ser pouco — "mergulhos" excessivos em frenagem e compressão total em impactos grandes. Solução: mola progressiva Eibach ou Race-Tech (R$350-600 o par). Ajuste de pré-carga e compressão/rebound: consultar Race-Tech Gold Valve Kit para otimização customizada. Óleo de bengala: começar com 5W e ajustar para 7,5W se quiser mais amortecimento na compressão.',
  },
]

// ─── CRF 450 RX (2017+) — enduro licenciado 450cc ────────────────────────────

const CRF450RX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CRF 450 RX: versão enduro licenciada da 450R (2017+) — substitui a 450X com chassis moderno da 450R + kit de rua; mais leve e capaz que a 450X',
    body: 'A CRF 450RX (2017+) é a sucessora da 450X: usa o chassis e motor moderno da 450R de competição, mas adiciona farol LED, luz traseira, kit de rua para documentação. Diferença vs 450X: 20 kg mais leve (~108 kg), motor revisado com mais potência, suspensão totalmente nova Showa (igual à 450R). Mapa de ignição: alterável entre Enduro e Race mode. Para enduro de alta intensidade (ISDE, SERA): a 450RX substituiu completamente a 450X na preferência de pilotos profissionais brasileiros. Manutenção: segue os mesmos ciclos da CRF 450R (mais intensa que a 450X pela maior potência).',
  },
  {
    severity: 'OK',
    title: 'Tanque de 2,0 L de série (menor que a 450X) — instalar tanque de corrida IMS 11 L ou Clarke 11 L para enduro de longa distância; sem extensão de tanque, autonomia ~40-50 km em trilha pesada',
    body: 'O ponto fraco da CRF 450RX para enduro de longa distância é o tanque de série de 2,0 L (próximo ao volume da 450R de MX). Autonomia real em trilha pesada: 40-50 km. Para provas de enduro acima de 50 km sem abastecimento: OBRIGATÓRIO instalar tanque maior. Tanques compatíveis: IMS 11 L (importado, R$700-1.000), Clarke 11 L (importado), Acerbis Double Tank 10 L. Alternativamente: mochila hidratação tipo Camelback com válvula de abastecimento (Acerbis Fuel Pack — transfere combustível via gravidade no campo). Em provas SERA e enduro nacional: verificar regras sobre tanques auxiliares.',
  },
]

const CRF450RX_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Mesmos problemas críticos da CRF 450R (válvulas, piston, overrev) — a 450RX é uma 450R com kit de rua, não uma moto "suavizada"',
    body: 'A CRF 450RX usa o mesmo motor e transmissão da 450R de competição. Todos os problemas críticos da 450R se aplicam integralmente: válvulas de titânio que apertam a cada 15 h, piston com vida de 20-25 h, overrev destrói motor em segundos, óleo troca a cada 2-3 h. Não se deixar enganar pelo kit de rua — a 450RX não é uma moto de enduro tolerante como a antiga 450X. Pilotos que migram da 450X para a 450RX precisam adaptar seu programa de manutenção ao ritmo da 450R de MX.',
  },
]

// ─── MANUTENÇÃO (schedule items) por modelo ───────────────────────────────────

const makeCRFComp250 = (m: string, yf: number, yt: number | null): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-30 JASO MA + filtro (750-850 mL)', intervalKm: null, intervalMonths: null, notes: 'Trocar a cada 5-7 horas de uso ou após cada final de semana de corrida. JASO MA obrigatório (embreagem úmida). Honda HP4M 10W-30 ou Motul 300V.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção e ajuste de válvulas (IN 0,10-0,15 / EX 0,15-0,20 mm)', intervalKm: null, intervalMonths: null, notes: 'A cada 20 horas de uso. Motor FRIO. Válvulas de titânio "apertam" — não pular esta revisão. Calços (shims) de ajuste.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar espuma — lavar e reimpregar com óleo de filtro', intervalKm: null, intervalMonths: null, notes: 'Após CADA saída (corrida ou treino). Usar óleo Twin Air, Bel-Ray ou No-Toil. Borda do airbox: graxa para vedação. Filtro molhado: não usar.', priority: 'CRITICAL', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pistão, anéis e pino — inspeção e troca preventiva', intervalKm: null, intervalMonths: null, notes: 'A cada 40-60 horas de uso intenso (competição). Usar kit Wiseco ou ProX. Medir cilindro (Nikasil) — desgaste > 0,1 mm exige replating.', priority: 'CRITICAL', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK LBPR7EIX — troca', intervalKm: null, intervalMonths: null, notes: 'A cada 20-25 horas. Gap 0,6 mm. Torque 10-12 N.m (cabeçote de alumínio). Pasta de cobre na rosca.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 520 — tensão e lubrificação', intervalKm: null, intervalMonths: null, notes: 'Antes de CADA saída. Folga: 40-50 mm. Spray para corrente de competição (sem o-ring). Troca kit completo: a cada ~150 h.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Retentores de bengala invertida Showa — inspeção', intervalKm: null, intervalMonths: null, notes: 'A cada 20-25 h. Névoa oleosa na haste = troca. Proteger hastes com wrap de neoprene em trilha.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Rebuild completo (biela, rolamentos, câmbio)', intervalKm: null, intervalMonths: null, notes: 'A cada 80-120 horas de uso de competição. Levar a oficina especializada com horímetro registrado.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Líquido de arrefecimento — troca e inspeção de mangueiras', intervalKm: null, intervalMonths: 12, notes: 'Anual ou a cada 60 h. Adicionar Wetter Water (anti-espuma) para melhor transferência de calor em condições extremas.', priority: 'HIGH', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Rolamentos de roda e ligagem — inspeção', intervalKm: null, intervalMonths: null, notes: 'A cada 50-60 h. All Balls Complete Kit. Folga em qualquer articulação = troca imediata.', priority: 'MEDIUM', order: 10 },
]

const makeCRFComp450 = (m: string, yf: number, yt: number | null): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-30 JASO MA + filtro (1.000-1.100 mL)', intervalKm: null, intervalMonths: null, notes: 'A cada 2-3 horas de uso (1 fim de semana de MX = 1 troca). Sempre trocar filtro junto. Honda HP4M ou Motul 300V 10W-40.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de válvulas (IN 0,10-0,15 / EX 0,15-0,20 mm)', intervalKm: null, intervalMonths: null, notes: 'A cada 10-15 horas. Válvulas de titânio apertam rápido. Motor FRIO. Calços. Custo negligência: R$1.200-2.500 em retífica.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar espuma — lavar e reimpregar', intervalKm: null, intervalMonths: null, notes: 'Após CADA corrida ou treino. Twin Air, Bel-Ray. Borda com graxa. Moto de 450cc com filtro sujo = risco imediato de dano Nikasil.', priority: 'CRITICAL', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pistão, anéis e rolamento de biela — troca preventiva', intervalKm: null, intervalMonths: null, notes: 'A cada 15-25 horas de competição. Kit Wiseco, ProX ou Honda OEM. Medir cilindro com micrometro. Biela a cada 40-60 h.', priority: 'CRITICAL', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK LBPR7EIX', intervalKm: null, intervalMonths: null, notes: 'A cada 15 horas. Gap 0,6 mm. Sempre carregar reserva. Torque 10-12 N.m.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 520 — verificação e lubrificação', intervalKm: null, intervalMonths: null, notes: 'Antes de cada corrida. Folga 40-50 mm. Troca preventiva: a cada 100-120 h ou ao detectar desgaste no pinhão.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Rolamentos da ligagem traseira — inspeção', intervalKm: null, intervalMonths: null, notes: 'A cada 25 h. All Balls kit. Folga na ligagem = amortecedor traseiro em colapso iminente.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Rebuild completo do motor', intervalKm: null, intervalMonths: null, notes: 'A cada 40-60 horas (biela, rolamentos, câmbio, vedações). Oficina especializada CRF 450 — alta precisão necessária.', priority: 'CRITICAL', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Líquido de arrefecimento + mangueiras', intervalKm: null, intervalMonths: 12, notes: 'Anual ou a cada 40 h. Adicionar aditivo Wetter Water. Mangueiras: verificar clamps e sinais de ressecamento.', priority: 'HIGH', order: 9 },
]

// ─── Tire pressures ───────────────────────────────────────────────────────────

const tirePressures = [
  { modelName: 'CRF 250 R',  yearFrom: 2004, yearTo: null, tireSize: '80/100-21 (F) · 100/90-19 (R)', frontPsi: 11, rearPsi: 12, frontPsiLoad: 12, rearPsiLoad: 13, sparePsi: null, notes: 'Motocross: F 10-12 PSI / R 12-13 PSI. Solo duro: 12/13 PSI. Areia: 9-10 PSI F e R. Nunca usar acima de 14 PSI — pneu NHS (Not Highway Safe).' },
  { modelName: 'CRF 250 RX', yearFrom: 2019, yearTo: null, tireSize: '80/100-21 (F) · 100/90-19 (R)', frontPsi: 12, rearPsi: 13, frontPsiLoad: 13, rearPsiLoad: 14, sparePsi: null, notes: 'Enduro: F 12-13 PSI / R 13-14 PSI. Terreno técnico: baixar para 10-11 PSI. Asfalto (transposição): 18-20 PSI.' },
  { modelName: 'CRF 250 X',  yearFrom: 2004, yearTo: 2017, tireSize: '80/100-21 (F) · 100/90-18 (R)', frontPsi: 12, rearPsi: 13, frontPsiLoad: 13, rearPsiLoad: 14, sparePsi: null, notes: 'Enduro florestal: F 12 PSI / R 13 PSI. Pedra/rocha: aumentar para 14 PSI F e R para evitar furo. Areia: 9-10 PSI.' },
  { modelName: 'CRF 450 R',  yearFrom: 2002, yearTo: null, tireSize: '80/100-21 (F) · 110/90-19 (R)', frontPsi: 11, rearPsi: 12, frontPsiLoad: 12, rearPsiLoad: 13, sparePsi: null, notes: 'Motocross: F 10-12 PSI / R 12-13 PSI. Solo duro: 12/13 PSI. Mousse disponível para eliminar risco de furo em provas.' },
  { modelName: 'CRF 450 RX', yearFrom: 2017, yearTo: null, tireSize: '80/100-21 (F) · 110/90-19 (R)', frontPsi: 12, rearPsi: 13, frontPsiLoad: 13, rearPsiLoad: 14, sparePsi: null, notes: 'Enduro: F 12-13 PSI / R 13-14 PSI. Pedra: 14 PSI F e R. Asfalto (transposição): mínimo 18 PSI — pneu NHS.' },
  { modelName: 'CRF 450 X',  yearFrom: 2005, yearTo: 2017, tireSize: '80/100-21 (F) · 110/100-18 (R)', frontPsi: 12, rearPsi: 13, frontPsiLoad: 13, rearPsiLoad: 15, sparePsi: null, notes: 'Enduro pesado: F 12-13 PSI / R 13-15 PSI (pneu 18" traseiro, mais volume). Lama: 10 PSI F e R para máxima penetração.' },
]

// ─── Upsert helpers ───────────────────────────────────────────────────────────

async function upsertModel(name: string) {
  const brand = await prisma.brand.findFirst({ where: { name: 'Honda' } })
  if (!brand) throw new Error('Brand Honda não encontrada — rode o seed principal primeiro')
  return prisma.vehicleModel.upsert({
    where: { name_brandId: { name, brandId: brand.id } },
    update: {},
    create: { name, brandId: brand.id },
  })
}

async function upsertTips(modelName: string, category: Cat, tips: TipInput[]) {
  await prisma.tip.deleteMany({ where: { modelName, category } })
  for (let i = 0; i < tips.length; i++) {
    const t = tips[i]
    await prisma.tip.create({
      data: { modelName, category, severity: t.severity, title: t.title, body: t.body, order: i },
    })
  }
}

async function upsertMaintenance(items: MaintenanceItemInput[]) {
  if (items.length === 0) return
  const modelName = items[0].modelName
  await prisma.maintenanceItem.deleteMany({ where: { modelName } })
  await prisma.maintenanceItem.createMany({ data: items })
}

async function upsertTirePressure(tp: typeof tirePressures[0]) {
  await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName, yearFrom: tp.yearFrom } })
  await prisma.tirePressure.create({ data: tp })
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏁 Seed Honda CRF competição/enduro 4T...')

  // CRF 250 R
  await upsertModel('CRF 250 R')
  await upsertTips('CRF 250 R', 'MACETES', CRF250R_MACETES)
  await upsertTips('CRF 250 R', 'PROBLEMAS', CRF250R_PROBLEMAS)
  await upsertMaintenance(makeCRFComp250('CRF 250 R', 2004, null))
  console.log('✅ CRF 250 R')

  // CRF 250 RX
  await upsertModel('CRF 250 RX')
  await upsertTips('CRF 250 RX', 'MACETES', CRF250RX_MACETES)
  await upsertTips('CRF 250 RX', 'PROBLEMAS', CRF250RX_PROBLEMAS)
  await upsertMaintenance(makeCRFComp250('CRF 250 RX', 2019, null))
  console.log('✅ CRF 250 RX')

  // CRF 250 X
  await upsertModel('CRF 250 X')
  await upsertTips('CRF 250 X', 'MACETES', CRF250X_MACETES)
  await upsertTips('CRF 250 X', 'PROBLEMAS', CRF250X_PROBLEMAS)
  await upsertMaintenance(makeCRFComp250('CRF 250 X', 2004, 2017))
  console.log('✅ CRF 250 X')

  // CRF 450 R
  await upsertModel('CRF 450 R')
  await upsertTips('CRF 450 R', 'MACETES', CRF450R_MACETES)
  await upsertTips('CRF 450 R', 'PROBLEMAS', CRF450R_PROBLEMAS)
  await upsertMaintenance(makeCRFComp450('CRF 450 R', 2002, null))
  console.log('✅ CRF 450 R')

  // CRF 450 RX
  await upsertModel('CRF 450 RX')
  await upsertTips('CRF 450 RX', 'MACETES', CRF450RX_MACETES)
  await upsertTips('CRF 450 RX', 'PROBLEMAS', CRF450RX_PROBLEMAS)
  await upsertMaintenance(makeCRFComp450('CRF 450 RX', 2017, null))
  console.log('✅ CRF 450 RX')

  // CRF 450 X
  await upsertModel('CRF 450 X')
  await upsertTips('CRF 450 X', 'MACETES', CRF450X_MACETES)
  await upsertTips('CRF 450 X', 'PROBLEMAS', CRF450X_PROBLEMAS)
  await upsertMaintenance(makeCRFComp450('CRF 450 X', 2005, 2017))
  console.log('✅ CRF 450 X')

  // Calibragens
  for (const tp of tirePressures) {
    await upsertTirePressure(tp)
  }
  console.log('✅ Calibragens CRF competição')

  const tipCount = await prisma.tip.count({ where: { modelName: { in: ['CRF 250 R', 'CRF 250 RX', 'CRF 250 X', 'CRF 450 R', 'CRF 450 RX', 'CRF 450 X'] } } })
  console.log(`\n📊 ${tipCount} dicas inseridas para CRF competição/enduro 4T`)
  console.log('✅ Seed concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
