// seed-ktm-exc-4tempos-lc4.ts — KTM EXC-F 250/350, EXC-F 300 Six Days, EXC 400/450/520/525 (LC4), 690 Enduro/Enduro R, LC4 640 Trail
// Linha enduro/trilha 4 tempos monocilíndrica da KTM: EXC-F moderna (DOHC, injeção Keihin) e a família
// histórica LC4 (SOHC/DOHC, carburador Keihin/Mikuni), incluindo os dual-sport de grande cilindrada
// 690 Enduro/Enduro R e sua predecessora LC4 640 Adventure/Trail.
// Execute: pnpm --filter @motormacete/database db:seed:ktm-exc-4tempos-lc4
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

// ─── KTM 250 EXC-F (2007–presente, inclui edição SIX DAYS) ───────────────────
// Motor: 249,9cc monocilíndrico DOHC 4V, refrigerado a líquido, bomba de óleo dupla
// Bore × stroke: 78 × 52,3mm | Compressão ~13,4:1 | Potência: ~42cv
// Injeção eletrônica Keihin EMS (restritor de fluxo 42mm em versões EU) | Câmbio 6 marchas
// Óleo: 1,2L com filtro, 10W-50 sintético JASO MA2 | Vela: NGK LMAR9AI-10, gap ~1,0mm
// Folga de válvulas: adm 0,10–0,15mm / esc 0,13–0,18mm (motor frio)
// Pneu: 90/90-21 (F) / 120/90-18 (R) | Corrente 520 | Tanque: 8,5–9L | Peso seco ~106kg
// A versão SIX DAYS é uma edição especial anual com componentes premium (suspensão, grafismo,
// partida elétrica de série) — mecanicamente equivalente à 250 EXC-F padrão.

const EXCF250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-50 sintético JASO MA2 — 1,2L com filtro; troque a cada 2.000–3.000 km',
    body: 'O motor DOHC 249,9cc da 250 EXC-F gira em rotações bem mais altas que motos de rua — o óleo sofre mais estresse térmico. Capacidade: 1,2L incluindo filtro (verifique com o visor/vareta, cárter seco com bomba dupla). Use sintético 10W-50 JASO MA2 (compatível com embreagem úmida DDS): Motorex Power Synt 4T 10W-50 (recomendado de fábrica), Motul 300V 10W-50 Off Road ou Motul 7100 10W-50. Intervalo recomendado por uso: lazer/trilha leve a cada 1.500–2.000 km, competição a cada 500–1.000 km. Nunca use óleo automotivo comum — a embreagem escorrega.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas é item CRÍTICO — verifique a cada 10.000 km ou antes se motor ficar difícil de dar partida',
    body: 'Motor DOHC de alta rotação com "finger followers" (seguidores de dedo) — a folga de válvulas fecha com o desgaste mais rápido que em motos de rua. Especificação a frio: admissão 0,10–0,15mm / escape 0,13–0,18mm. Sintomas de folga fora do padrão: dificuldade de partida a frio, ruído metálico no cabeçote, perda de potência. Se a folga fechar demais, pode causar contato entre válvula e pistão em alta rotação — dano caro. Verificação exige jogo de calços (shims) — leve a um mecânico especializado em off-road ou aprenda o procedimento pelo manual (não é trivial, requer desmontagem do cabeçote).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR9AI-10 (gap ~1,0mm) — vela de irídio, dura mais mas é mais cara',
    body: 'A 250 EXC-F usa vela de irídio NGK LMAR9AI-10 (rosca curta, adequada ao cabeçote compacto). Gap de fábrica: cerca de 1,0mm — confira o manual do ano específico. Custo: R$ 60–100 (importada/revenda especializada em off-road, ex. lojas de peças KTM ou importados de trilha). Não substitua por vela comum de rosca genérica sem confirmar a medida — rosca errada danifica o cabeçote. Inspecione a cada revisão de válvulas (10.000 km); troque se o eletrodo estiver desgastado ou a cor indicar mistura rica/pobre.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma dupla — limpe a cada 500–1.000 km em uso off-road pesado',
    body: 'O filtro de ar (espuma bicamada) da 250 EXC-F é crítico: entrada de poeira/areia pode destruir o motor DOHC rapidamente. Em trilha com pó/areia: limpe a cada saída ou no máximo 500 km. Em uso misto leve: 1.000 km. Limpeza: lavar com desengraxante específico para filtro (Motul A1 Air Filter Cleaner ou querosene), secar completamente, aplicar óleo específico para filtro de espuma (Motul A2, Twin Air) — nunca use óleo de motor, resseca a espuma. Filtro seco sem óleo = poeira passa direto para o motor.',
  },
  {
    severity: 'OK',
    title: 'Kit relação 520 — pinhão/coroa desgastados aceleram o desgaste da corrente',
    body: 'Corrente 520 (ou variantes O-ring/X-ring para uso misto estrada+trilha). Em uso predominante off-road, muitos preferem corrente sem retentor (mais leve, mais fácil de limpar) — DID 520ERT3 ou RK 520MXZ são referências. Para uso misto com mais estrada, corrente com O-ring dura mais: DID 520VX3. Lubrifique após cada lavagem/trilha com barro — o barro seca e vira abrasivo. Verifique o desgaste do pinhão/coroa junto: dentes em "gancho" indicam necessidade de trocar o kit completo, não só a corrente.',
  },
  {
    severity: 'WARN',
    title: 'Peças e revenda: procure especialistas em off-road, não a rede de rua genérica',
    body: 'A 250 EXC-F é vendida em baixo volume no Brasil — peças de desgaste (pastilhas, filtro, corrente, retentores de bengala) são mais fáceis de achar em lojas especializadas em motocross/enduro (ex. lojas que atendem pilotos de trilha) do que em concessionárias de rua. Marcas compatíveis amplamente disponíveis: pastilhas EBC ou Galfer (compatíveis Brembo), retentores de bengala genéricos WP 48mm, filtro de ar Twin Air (referência internacional para off-road, disponível via importadores). Consulte grupos de enduro no Facebook/WhatsApp para indicação de fornecedores confiáveis no Brasil.',
  },
  {
    severity: 'OK',
    title: 'Edição SIX DAYS: mesma mecânica, suspensão e acabamento premium',
    body: 'A KTM 250 EXC-F Six Days é uma edição especial de produção limitada lançada anualmente (grafismo dourado/preto em homenagem ao Six Days Enduro), com componentes de suspensão um pouco mais refinados e itens de série que na versão padrão podem ser opcionais (ex. partida elétrica, proteções). O motor, óleo, vela e intervalos de manutenção são idênticos à 250 EXC-F normal — trate como a mesma moto para efeitos de manutenção.',
  },
]

const EXCF250_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Desgaste acelerado de válvulas em uso de alta rotação constante',
    body: 'Motor DOHC de corrida projetado para rotações altas — uso constante próximo ao limite de giro (competição, trilha rápida) acelera o desgaste do trem de válvulas mais que em motos de rua de baixa rotação. Sinal de alerta: folga de válvula fechando rápido entre revisões, perda progressiva de potência, dificuldade de partida a frio piorando com o tempo. Prevenção: siga o intervalo de verificação (10.000 km) rigorosamente e não pule revisões — a KTM off-road de alta performance não perdoa manutenção postergada como uma moto de rua comum.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor da bengala WP — comum em uso off-road com impactos',
    body: 'A bengala invertida WP (43-48mm dependendo do ano) sofre desgaste do retentor com impactos de trilha, pedras e areia entrando pela haste. Sintoma: óleo escuro na parte inferior do tubo. Retentores genéricos compatíveis (medida conforme o diâmetro da bengala do ano) custam R$ 40–90 o par. Troca requer desmontagem da bengala — serviço técnico especializado em suspensão off-road (R$ 150–350 mão de obra). Limpe as hastes após cada trilha para prolongar a vida do retentor.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em uso muito lento/técnico (trial, subidas travadas)',
    body: 'O radiador pequeno e leve (otimizado para peso, não para trânsito parado) pode levar o motor a superaquecer em trechos muito lentos e técnicos sem vento de arrefecimento — situação incomum em trilha rápida mas real em trial/enduro extremo. Sintoma: vapor saindo pelo vaso de expansão, perda de potência. Solução: em trechos técnicos muito lentos e prolongados, dê "respiros" em rotação mais alta periodicamente para forçar a bomba d\'água. Verifique o nível do líquido de arrefecimento antes de cada saída.',
  },
  {
    severity: 'WARN',
    title: 'Vibração e afrouxamento de parafusos — motor monocilíndrico de alta rotação',
    body: 'Monocilíndricos de alta rotação vibram mais que multicilíndricos — parafusos de proteção do motor, suportes de radiador e parafusos de carenagem podem afrouxar com o uso. Faça inspeção visual de todos os parafusos externos após cada saída de trilha mais exigente. Use trava-rosca (Loctite azul 243) em parafusos que historicamente soltam. Um parafuso de proteção de motor perdido em trilha pode custar caro em caso de impacto sem proteção.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem DDS: desgaste acelerado em pilotagem agressiva ou embreagem "arrastada"',
    body: 'A embreagem multidisco em banho de óleo com acionamento hidráulico Brembo (DDS — Damped Diaphragm Steel clutch) é robusta, mas pilotagem que abusa da embreagem (arrastar em subidas técnicas, patinar demais) desgasta os discos mais rápido que o normal. Sintoma: embreagem "patinando" mesmo com alavanca solta, ponto de acionamento mudando. Discos de embreagem genéricos ou originais custam R$ 200–450 o kit completo. Purgue o sistema hidráulico com fluido DOT 4 se a alavanca ficar esponjosa.',
  },
]

const EXCF250_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo KTM 250 EXC-F: motor DOHC de alta rotação exige atenção redobrada',
    body: '500 km — Troca de óleo inicial (rodagem). Verificar aperto geral. | 1.500–2.000 km — Troca de óleo (10W-50, 1,2L). Limpeza do filtro de ar. | 5.000 km — Troca de óleo + filtro de óleo. Lubrificação/inspeção da corrente. Verificar pastilhas de freio. | 10.000 km — Folga de válvulas (adm 0,10–0,15mm / esc 0,13–0,18mm, motor frio) — item crítico. Vela NGK LMAR9AI-10 (inspecionar/trocar). Fluido de freio e embreagem (DOT 4). | 15.000 km — Retentor de bengala (inspecionar/trocar se vazando). Kit relação 520 se desgastado. | 20.000 km — Revisão geral de motor recomendada por especialista off-road (rolamentos de biela em uso intenso/competição).',
  },
]

// ─── KTM 350 EXC-F (2012–presente, inclui edição SIX DAYS) ───────────────────
// Motor: 349,7cc monocilíndrico DOHC 4V, refrigerado a líquido, bore × stroke 88 × 57,5mm
// Compressão 12,3:1 | Potência: ~43-45cv | Injeção Keihin EFI (restritor 42mm em versões EU)
// Óleo: 1,2L com filtro, 10W-50 sintético JASO MA2 | Vela: NGK LMAR9AI-8, gap ~0,8mm
// Folga de válvulas: adm 0,10–0,15mm / esc 0,13–0,18mm (motor frio)
// Pneu: 90/90-21 (F) / 140/80-18 (R) | Corrente 520 | Tanque: 9L | Peso seco ~107,5kg
// Considerada por muitos pilotos o "meio-termo perfeito" da linha enduro 4T: mais torque que a
// 250, mais ágil que a 450. A versão SIX DAYS segue o mesmo padrão de edição especial anual.

const EXCF350_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-50 sintético JASO MA2 — 1,2L com filtro; a "350" é referência de equilíbrio motor/manutenção',
    body: 'O motor DOHC 349,7cc da 350 EXC-F é considerado por muitos pilotos o melhor equilíbrio da linha enduro 4T da KTM — mais torque que a 250 e mais leve/ágil que a 450, com desgaste de motor intermediário. Capacidade de óleo: 1,2L com filtro. Use sintético 10W-50 JASO MA2: Motorex Power Synt 4T 10W-50 (recomendação de fábrica), Motul 300V 10W-50 ou Motul 7100. Intervalo: 1.500–2.500 km em uso de lazer, 500–1.000 km em competição.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas a cada 10.000 km — mesma criticidade da 250, motor ainda mais estressado',
    body: 'Especificação a frio: admissão 0,10–0,15mm / escape 0,13–0,18mm. O motor 350 opera em faixa de torque um pouco mais baixa que a 250 mas ainda é um DOHC de alta performance — não negligencie a verificação. Sinal de alerta: dificuldade de partida a frio ou ruído de "batida" no cabeçote em marcha lenta. Vela recomendada para verificação: NGK LMAR9AI-8 (gap 0,8mm) — ligeiramente diferente da 250 (que usa AI-10), confirme a especificação do ano do seu modelo antes de comprar.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar Twin Air ou similar — troque o hábito de limpeza conforme intensidade de uso',
    body: 'Assim como a 250, a 350 EXC-F depende de filtro de ar bem cuidado para proteger o motor DOHC de poeira/areia. Uso intenso de trilha: limpar a cada saída. Uso misto leve: a cada 1.000 km. Produtos recomendados: Twin Air Cleaner Fluid + Twin Air Bio Filter Oil, ou linha Motul A1/A2 equivalente. Tenha sempre um filtro extra limpo e pronto na garagem — trocar por um limpo antes de sair é mais seguro que limpar o sujo depois.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 e kit relação — ajuste de relação (pinhão/coroa) conforme o uso',
    body: 'De fábrica a 350 EXC-F vem com relação equilibrada entre trilha técnica e transporte em estrada. Para uso mais técnico (trilha lenta, subidas): considerar pinhão 1 dente a menos para mais tração em baixa. Para uso misto com mais estrada: manter relação original ou até 1 dente a mais no pinhão para reduzir rotação em velocidade de estrada. Corrente 520 O-ring (DID 520VX3) dura mais em uso misto; sem retentor (DID 520ERT3) é mais leve para competição pura.',
  },
  {
    severity: 'OK',
    title: 'Vela e injeção eletrônica: a 350 aceita melhor variações climáticas que carburador antigo',
    body: 'Diferente da geração LC4 mais antiga (carburador), a 350 EXC-F com injeção eletrônica Keihin EMS ajusta a mistura automaticamente por altitude e temperatura — praticamente elimina o trabalho de "rejetar" o carburador ao subir serra ou mudar de estação, comum nas motos antigas. Mantenha a bateria (mesmo pequena, tipo lítio ou selada) sempre carregada, pois a injeção depende de tensão estável para funcionar bem.',
  },
  {
    severity: 'WARN',
    title: 'Peças no Brasil: revendedores autorizados KTM ou importadores especializados em off-road',
    body: 'A 350 EXC-F tem uma base de proprietários maior que a 300 Six Days ou os modelos LC4 antigos, mas ainda assim é nicho no Brasil. Concessionárias KTM autorizadas atendem peças originais; para consumíveis (filtro, pastilha, corrente) vale procurar lojas especializadas em motocross/enduro que trabalham com marcas como Twin Air, EBC, DID, Renthal — geralmente mais baratas e com entrega mais rápida que peça genuína importada.',
  },
  {
    severity: 'OK',
    title: 'Edição SIX DAYS 350: componentes de suspensão premium, mesma mecânica de manutenção',
    body: 'A 350 EXC-F Six Days segue o padrão da linha: edição especial com grafismo e suspensão/acabamento superiores, mas motor, óleo, vela e intervalos de manutenção idênticos à 350 EXC-F padrão. Trate como a mesma moto nas revisões.',
  },
]

const EXCF350_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Desgaste de válvulas por alta rotação em uso competitivo',
    body: 'Assim como a 250, a 350 EXC-F pode sofrer desgaste acelerado do trem de válvulas em uso de competição/trilha rápida constante. Sinais: folga fechando rápido, perda de potência progressiva, dificuldade de partida a frio piorando. Respeite o intervalo de 10.000 km para verificação — postergar pode resultar em contato válvula/pistão, dano estrutural caro de reparar.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pelo retentor de bengala WP em uso off-road pesado',
    body: 'Mesma vulnerabilidade da 250 EXC-F: impactos de trilha, areia e pedras aceleram o desgaste do retentor da bengala invertida WP. Sintoma: óleo escuro escorrendo pela haste interna. Limpe as hastes após cada saída de trilha (pano limpo, sem produtos abrasivos) para prolongar a vida útil. Retentores genéricos: R$ 40–90 o par; mão de obra especializada em suspensão off-road: R$ 150–350.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trechos muito lentos e técnicos',
    body: 'Radiador dimensionado para peso mínimo, não para trânsito parado ou trechos extremamente lentos e técnicos (trial). Se notar vapor no vaso de expansão ou perda de potência em trecho técnico prolongado, dê rotações mais altas periodicamente para forçar circulação. Verifique o líquido de arrefecimento antes de cada saída — nível baixo agrava rapidamente o problema.',
  },
  {
    severity: 'WARN',
    title: 'Vibração de monocilíndrico grande solta parafusos externos',
    body: 'Mesmo sendo uma 350cc, a vibração do monocilíndrico de alta rotação é perceptível e pode afrouxar parafusos de proteção de motor, suportes e carenagem ao longo do tempo. Inspecione visualmente após trilhas mais exigentes. Trava-rosca (Loctite 243) nos pontos que historicamente soltam evita perda de peças em uso off-road.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem hidráulica Brembo: ponto de acionamento muda com desgaste dos discos',
    body: 'Uso agressivo de embreagem (arrastar em subidas técnicas) desgasta os discos e muda o ponto de acionamento da alavanca ao longo do tempo. Se a alavanca ficar "mole" ou o ponto de pega mudar muito, purgue o sistema com fluido DOT 4 novo primeiro; se persistir, inspecione os discos (kit completo: R$ 200–450).',
  },
]

const EXCF350_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo KTM 350 EXC-F',
    body: '500 km — Troca de óleo inicial (rodagem). | 1.500–2.500 km — Troca de óleo (10W-50, 1,2L). Limpeza do filtro de ar. | 5.000 km — Troca de óleo + filtro. Lubrificação/inspeção da corrente 520. Pastilhas de freio. | 10.000 km — Folga de válvulas (adm 0,10–0,15mm / esc 0,13–0,18mm, motor frio). Vela NGK LMAR9AI-8. Fluido de freio/embreagem DOT 4. | 15.000 km — Retentor de bengala WP (inspecionar). Kit relação 520 se desgastado. | 20.000 km — Revisão geral por especialista off-road (rolamentos, biela em uso intenso).',
  },
]

// ─── KTM 350 EXC-F (SIX DAYS, cadastrado na FIPE como "EXC-F 300 SIX DAYS") ──
// NOTA IMPORTANTE DE HONESTIDADE TÉCNICA: a tabela FIPE cadastra o nome "EXC-F 300 SIX DAYS",
// mas a KTM não tem, na linha atual, uma versão EXC-F de 300cc — a gama 4 tempos moderna salta
// direto de 250cc para 350cc. Há registro de um modelo de transição "300 EXC-F Six Days" (2012-13)
// que, segundo especificações técnicas encontradas, usava o MESMO motor de 349,7cc da 350 EXC-F
// (bore/stroke 88 × 57,5mm), sugerindo que "300" era uma nomenclatura comercial de transição/nicho
// e não uma cilindrada real de 300cc. É possível também que a FIPE tenha um erro de catalogação,
// confundindo com a KTM 300 EXC (2 tempos, essa sim genuinamente 300cc). Diante da incerteza,
// o conteúdo abaixo assume a hipótese mais tecnicamente sustentada — motor 349,7cc equivalente
// à 350 EXC-F Six Days — mas o proprietário deve confirmar a cilindrada exata pelo chassi/manual.

const EXCF300SD_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Atenção: confirme a cilindrada real da sua moto pelo número de chassi antes de seguir estas dicas',
    body: 'O nome "EXC-F 300 SIX DAYS" cadastrado na tabela FIPE não corresponde a nenhum modelo atual da KTM com essa cilindrada exata em 4 tempos — a gama EXC-F moderna vai de 250cc para 350cc sem uma versão "300F" regular. Há registro histórico de uma "300 EXC-F Six Days" (2012-2013) que aparentemente usava o motor de 349,7cc da 350 EXC-F com essa nomenclatura de edição especial. Antes de seguir qualquer especificação técnica (óleo, folga de válvulas, vela), confirme a cilindrada real gravada no bloco do motor ou no manual do proprietário que acompanha o chassi — as informações abaixo assumem compatibilidade com o motor 349,7cc da linha 350 EXC-F.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-50 sintético JASO MA2 — 1,2L (assumindo motor 349,7cc equivalente à 350)',
    body: 'Assumindo o motor de 349,7cc (mesma base da 350 EXC-F Six Days), use óleo sintético 10W-50 JASO MA2: Motorex Power Synt 4T 10W-50, Motul 300V 10W-50 ou Motul 7100. Capacidade: 1,2L com filtro. Intervalo: 1.500–2.500 km em uso de lazer, mais frequente em competição. Se a inspeção do chassi confirmar cilindrada diferente, ajuste a capacidade e intervalo conforme o manual específico daquele motor.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas — item crítico independente da cilindrada exata',
    body: 'Seja qual for a cilindrada real desta unidade específica, todos os motores DOHC da linha EXC-F exigem verificação periódica de folga de válvulas a cada 10.000 km — este é o item de manutenção mais crítico e mais frequentemente negligenciado nesta família de motos. Faixa típica da linha 250/350: admissão 0,10–0,15mm / escape 0,13–0,18mm (motor frio). Não pule esta verificação.',
  },
  {
    severity: 'OK',
    title: 'Vela de irídio NGK (confirme código exato pelo manual do chassi)',
    body: 'A linha EXC-F 250/350 usa velas de irídio NGK série LMAR9AI (variando o sufixo -8 ou -10 conforme o modelo/ano) com gap entre 0,8–1,0mm. Como esta unidade tem nomenclatura não-padrão, recomenda-se confirmar o código exato da vela pelo manual físico que acompanha o chassi ou por um concessionário KTM antes da compra, para evitar vela com rosca ou alcance térmico incompatível.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar — cuidado redobrado em motor DOHC de alta rotação',
    body: 'Independente da cilindrada exata, o cuidado com o filtro de ar é o mesmo da linha EXC-F: limpe a cada saída em uso intenso de trilha com poeira/areia, ou a cada 1.000 km em uso misto leve. Use produtos específicos para filtro de espuma (Twin Air ou Motul A1/A2) — nunca óleo de motor comum.',
  },
  {
    severity: 'WARN',
    title: 'Peças: procure por "350 EXC-F Six Days" do ano mais próximo ao chassi como referência',
    body: 'Por ser uma nomenclatura de nicho/transição, peças específicas rotuladas "300 EXC-F Six Days" são raras no mercado. Ao buscar peças de reposição (pistão, anéis, junta do cabeçote, kit relação), use como referência as peças da "350 EXC-F" ou "350 EXC-F Six Days" do ano mais próximo — mas SEMPRE confirme a medida física (ex. diâmetro do pistão) antes de comprar, pois isso é o único jeito de garantir compatibilidade sem o número de peça oficial exato.',
  },
]

const EXCF300SD_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Risco de manutenção incorreta por identificação equivocada do motor',
    body: 'O maior risco prático desta unidade não é mecânico, mas de identificação: usar especificações erradas de óleo, vela ou folga de válvulas por assumir a cilindrada errada pode causar dano ao motor. Antes de qualquer serviço, um mecânico especializado em KTM deve confirmar o código do motor gravado no bloco (geralmente próximo ao cárter) e cruzar com a tabela de especificações do fabricante.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas fora do padrão — mesmo risco da linha EXC-F padrão',
    body: 'Assumindo motor DOHC da família 250/350, o risco de dano por folga de válvulas não verificada é o mesmo: contato entre válvula e pistão em alta rotação se a folga fechar demais. Verifique a cada 10.000 km sem exceção.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor de bengala — mesmo padrão da linha EXC-F',
    body: 'Se a suspensão for WP (like a linha EXC-F padrão), espere o mesmo padrão de desgaste do retentor em uso off-road pesado: óleo escuro na haste interna após uso intenso em trilha com impactos. Limpe as hastes após cada saída para prolongar a vida útil.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em uso técnico lento',
    body: 'Assumindo radiador dimensionado para peso mínimo (padrão da linha EXC-F), trechos muito lentos e técnicos podem levar a superaquecimento. Verifique o líquido de arrefecimento antes de cada saída e dê "respiros" de rotação em trechos muito lentos prolongados.',
  },
  {
    severity: 'WARN',
    title: 'Dificuldade de encontrar histórico de manutenção e peças de reposição documentadas',
    body: 'Por ser uma nomenclatura rara/de nicho, é mais difícil encontrar fóruns, manuais ou vendedores de peças que reconheçam especificamente o "300 EXC-F Six Days". Isso aumenta o risco de comprar peça errada ou seguir orientação incorreta de manutenção. Priorize sempre a confirmação física da cilindrada (medição do cilindro, se necessário) antes de qualquer serviço maior.',
  },
]

const EXCF300SD_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma (assumindo motor 349,7cc equivalente à linha 350 EXC-F)',
    body: 'IMPORTANTE: confirme a cilindrada real pelo chassi antes de seguir este cronograma. 500 km — Troca de óleo inicial. | 1.500–2.500 km — Troca de óleo (10W-50, 1,2L). Limpeza do filtro de ar. | 5.000 km — Troca de óleo + filtro. Corrente. Pastilhas de freio. | 10.000 km — Folga de válvulas (adm 0,10–0,15mm / esc 0,13–0,18mm, motor frio) — CRÍTICO. Vela de irídio NGK (confirmar código exato). Fluido de freio/embreagem DOT 4. | 15.000 km — Retentor de bengala. Kit relação se desgastado. | Antes de qualquer serviço maior — confirmar cilindrada real com mecânico especializado KTM.',
  },
]

// ─── KTM EXC 400 (2000–2002) — família LC4 histórica ─────────────────────────
// Motor: 398cc monocilíndrico SOHC 4V, refrigerado a líquido, motor LC4
// Bore × stroke: 89 × 64mm | Compressão 11,1:1 | Potência: ~44cv @ 8.000 rpm
// Carburador: Keihin MX-FCR 39 | Óleo: ~1,25L, 10W-50 sintético JASO MA
// Vela: NGK DCPR8E | Pneu: 90/90-21 (F) / 140/80-18 (R) | Corrente: X-ring 14:50
// Tanque: 8,5L | Peso seco ~112kg | Descontinuada em favor da linha EXC-F moderna a partir de meados dos anos 2000

const EXC400_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-50 sintético JASO MA — ~1,25L; motor LC4 de 400cc gira mais que os grandes 520/525',
    body: 'O motor SOHC 398cc LC4 é o "menor" da família histórica de enduro grande da KTM, mas ainda assim exige cuidado de motor de alta performance. Capacidade aproximada: 1,25L (confirme pelo visor de óleo do ano específico — modelos LC4 variam a rota de óleo). Use sintético 10W-50 JASO MA: Motorex Power Synt 4T 10W-50 ou equivalente Motul 7100/300V. Troque a cada 2.000–3.000 km em uso de lazer — motor com mais de duas décadas de uso normalmente já passou por retífica, então acompanhe de perto o consumo de óleo.',
  },
  {
    severity: 'OK',
    title: 'Carburador Keihin MX-FCR 39 — jato principal e agulha exigem ajuste por altitude',
    body: 'Sem injeção eletrônica, o carburador Keihin FCR 39 precisa de rejetagem manual ao subir serra ou mudar de estação/temperatura — diferente das EXC-F modernas injetadas. Sintomas de mistura errada: fumaça preta no escape (rica) ou motor "engasgando"/superaquecendo (pobre). Jato principal típico: ao redor de 175-180 (varia por altitude — consulte tabela de jetting específica do modelo/ano). Limpeza da cuba e boia a cada 5.000 km ou se a moto ficar parada por meses (combustível velho forma verniz).',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK DCPR8E — gap padrão 0,6–0,7mm; troque com mais frequência que motos modernas',
    body: 'A vela NGK DCPR8E é a referência para o motor LC4 400/450 desta geração. Gap: 0,6–0,7mm. Por ser carburada (mistura menos precisa que injeção eletrônica), a vela suja e desgasta mais rápido — inspecione a cada 3.000-4.000 km. Custo: R$ 25-40. Cor do eletrodo indica a mistura: marrom claro é ideal, preto fuliginoso indica mistura rica (ajustar carburador), branco/queimado indica mistura pobre (risco de dano ao motor).',
  },
  {
    severity: 'OK',
    title: 'Peças: moto descontinuada há 20+ anos — busque em desmontes e fóruns internacionais',
    body: 'A EXC 400 foi descontinuada há mais de duas décadas. Peças de motor (pistão, anéis, junta do cabeçote) raramente têm estoque em concessionária — busque em desmontes especializados em off-road, ThumperTalk (fórum internacional com seção de peças) ou grupos de colecionadores KTM vintage. Peças de desgaste comum (retentores, kit relação, pastilhas) muitas vezes têm equivalente genérico de medida compatível — meça sempre antes de comprar.',
  },
  {
    severity: 'OK',
    title: 'Corrente X-ring 14:50 — moto mais pesada e antiga exige relação mais robusta',
    body: 'Kit relação com pinhão 14 dentes / coroa 50 dentes, corrente com retentor X-ring (mais durável que O-ring simples). Por ser moto com 20+ anos, verifique também o estado da coroa e do cubo de roda traseira (amortecedores de borracha do cubo, se equipado, ressecam com o tempo). Kit relação genérico compatível: DID ou RK 520, medida X-ring.',
  },
  {
    severity: 'WARN',
    title: 'Restauração/revisão geral recomendada para unidades muito antigas',
    body: 'Se você adquiriu uma EXC 400 de 2000-2002 sem histórico de manutenção recente, recomenda-se uma revisão geral completa antes de uso intenso: troca de todos os fluidos, inspeção de mangueiras de arrefecimento (borracha ressecada com 20+ anos é comum), retentores de bengala e amortecedor, rolamentos de roda e de direção. Motor com histórico desconhecido merece inspeção de folga de válvulas e compressão antes de confiar em uso pesado de trilha.',
  },
]

const EXC400_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Desgaste de válvulas por alta rotação — ainda mais crítico em unidades sem manutenção recente',
    body: 'O motor SOHC LC4 400cc, assim como toda a família de alta rotação da KTM, sofre desgaste acelerado do trem de válvulas em uso intenso. Em unidades com 20+ anos, é comum que a folga já esteja fora do padrão especialmente se não há histórico de manutenção. Verifique a folga antes de qualquer uso intenso — o risco de contato válvula/pistão é real e o custo de retífica de cabeçote é alto para uma moto deste valor de mercado.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor do eixo virabrequim/embreagem — comum em motores desta idade',
    body: 'Retentores de borracha ressecam e endurecem com 20+ anos, mesmo sem uso intenso. Vazamento pelo lado da embreagem ou do eixo de saída é comum em unidades antigas. Sintoma: mancha de óleo na carcaça do motor, nível de óleo caindo sem explicação. Retentores genéricos de medida compatível custam R$ 15-40 cada — troca requer desmontagem parcial do motor, recomenda-se mecânico especializado em motor LC4.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em uso lento — radiador pequeno, mesma limitação da linha toda',
    body: 'Assim como as EXC-F modernas, o radiador da EXC 400 é dimensionado para peso mínimo, não para trânsito parado. Em uso muito lento e técnico, monitore a temperatura e dê "respiros" de rotação para forçar circulação do líquido de arrefecimento.',
  },
  {
    severity: 'WARN',
    title: 'Vibração de monocilíndrico grande — desgasta coxins do motor e solta parafusos com o tempo',
    body: 'O monocilíndrico LC4 vibra de forma perceptível, e em unidades de 20+ anos os coxins de borracha de fixação do motor (se equipados) já podem estar ressecados/rachados, amplificando a vibração sentida pelo piloto. Inspecione visualmente e substitua coxins rachados. Verifique também o aperto de todos os parafusos de fixação do motor no quadro — soltos pioram ainda mais a vibração e podem causar dano ao chassi a longo prazo.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem a cabo (não hidráulica nesta geração): desgaste do cabo e ajuste manual',
    body: 'Diferente das EXC-F modernas (embreagem hidráulica Brembo), a EXC 400 desta geração usa acionamento a cabo. Cabos ressecados ou desgastados causam alavanca "dura" ou ponto de acionamento incorreto. Lubrifique o cabo periodicamente (óleo fino ou lubrificante específico para cabos) e ajuste a folga na alavanca (tipicamente 2-3mm de folga antes de acionar). Substitua o cabo se notar fios partidos ou dificuldade de retorno da alavanca.',
  },
]

const EXC400_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma KTM EXC 400 (motor LC4 carburado, considerar idade do veículo)',
    body: '500 km (pós-restauração/revisão) — Troca de óleo. | 2.000–3.000 km — Troca de óleo (10W-50, ~1,25L). Limpeza do carburador Keihin FCR 39. | 3.000-4.000 km — Inspeção/troca da vela NGK DCPR8E (gap 0,6-0,7mm). | 5.000 km — Folga de válvulas (motor frio) — item crítico. Ajuste de jetting do carburador se mudou de altitude/estação. | 8.000 km — Kit relação X-ring 14:50 se desgastado. Retentores de bengala (inspecionar). | Anual (independente de km, dada a idade) — Inspeção de mangueiras de arrefecimento, retentores de motor, rolamentos de roda e direção.',
  },
]

// ─── KTM EXC 450 (2003–2007) — família LC4/LC4e histórica ────────────────────
// Motor: 447,9cc monocilíndrico SOHC 4V, refrigerado a líquido, motor LC4/LC4e
// Bore × stroke: 89 × 72mm | Compressão 11,1:1 | Potência: ~48-50cv
// Carburador: Keihin MX-FCR 39 | Óleo: 1,25L, 10W-50 sintético JASO MA (Motorex Power Synt recomendado)
// Vela: NGK DCPR8E | Pneu: 90/90-21 (F) / 140/80-18 (R) | Corrente: X-ring 14:52
// Tanque: 9L | Peso seco ~113,5kg | Evolução direta da EXC 400 com curso maior (72mm vs 64mm)

const EXC450_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-50 sintético JASO MA — 1,25L; motor com mais torque que a 400, mesma atenção',
    body: 'O motor SOHC 447,9cc é a evolução da EXC 400 com curso maior (72mm), entregando mais torque em baixa/média rotação. Capacidade: 1,25L, sintético 10W-50 JASO MA (Motorex Power Synt 4T 10W-50 é a recomendação de fábrica da época, mas Motul 7100/300V são equivalentes aceitos). Troque a cada 2.000-3.000 km em uso de lazer. Motores desta idade (quase duas décadas) merecem inspeção do consumo de óleo — consumo elevado pode indicar necessidade de retífica.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Keihin FCR 39 — mesma necessidade de rejetagem por altitude da EXC 400',
    body: 'Sem injeção eletrônica, ajuste manual do jato principal e da agulha é necessário ao mudar de altitude ou estação. Sintomas de mistura errada: fumaça preta (rica) ou engasgo/superaquecimento (pobre). Limpe a cuba e boia a cada 5.000 km, e sempre que a moto ficar parada por mais de 2-3 meses (combustível formando verniz é a causa mais comum de mau funcionamento em motos guardadas).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DCPR8E — mesma referência da EXC 400, gap 0,6–0,7mm',
    body: 'Vela idêntica à usada na EXC 400 (motor da mesma família). Inspecione a cada 3.000-4.000 km pela natureza carburada do motor (mistura menos precisa que injeção eletrônica desgasta a vela mais rápido). Custo: R$ 25-40. Leia a cor do eletrodo para diagnosticar a mistura antes de mexer no carburador.',
  },
  {
    severity: 'OK',
    title: 'Peças compatíveis com a EXC 400/520/525 da mesma geração — motor LC4 compartilhado',
    body: 'A família LC4 desta era (400/450/520/525) compartilha muitos componentes de chassi, suspensão e elétrica — mesmo com diferenças internas do motor (curso, pistão). Retentores de bengala, kit relação, pastilhas de freio e componentes elétricos frequentemente são intercambiáveis entre estes modelos do mesmo período. Confirme sempre a medida física antes de comprar, mas essa compatibilidade cruzada facilita muito achar peças no mercado de usados/desmontes.',
  },
  {
    severity: 'OK',
    title: 'Kit relação 520 (14:52) — revisão do estado geral em unidades de uso misto trilha/estrada',
    body: 'Pinhão 14 dentes / coroa 52 dentes, corrente 520 com retentor X-ring. Para uso predominante em trilha (sem muito deslocamento em asfalto), muitos preferem reduzir 1 dente no pinhão para mais tração em baixa. Lubrifique a cada 300-500 km em uso de trilha com barro/poeira.',
  },
  {
    severity: 'WARN',
    title: 'Revisão geral recomendada para unidades sem histórico — motor com quase 20 anos',
    body: 'Assim como a EXC 400, a EXC 450 desta geração já tem quase duas décadas. Antes de uso intenso, faça revisão completa: fluidos, mangueiras de arrefecimento, retentores, rolamentos. Verifique também a condição geral do quadro/chassi contra corrosão em unidades guardadas em ambiente úmido.',
  },
]

const EXC450_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Desgaste de válvulas — motor SOHC de curso longo tem sua própria dinâmica de desgaste',
    body: 'O curso maior (72mm) da EXC 450 em relação à 400 (64mm) muda a dinâmica de força sobre o trem de válvulas. Verifique a folga de válvulas regularmente — negligência pode causar contato válvula/pistão. Em unidades antigas sem manutenção documentada, uma verificação de compressão antes de uso intenso é recomendada.',
  },
  {
    severity: 'WARN',
    title: 'Retentores ressecados por idade — vazamento de óleo é comum em unidades desta época',
    body: 'Motores com quase 20 anos frequentemente apresentam vazamento por retentores ressecados (eixo virabrequim, embreagem, seletor de marchas). Inspecione visualmente todas as juntas de vedação do motor. Substituição de retentores é relativamente barata (R$ 15-40 cada) mas exige desmontagem parcial — vale fazer tudo de uma vez ao abrir o motor.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em uso técnico lento — mesma limitação da família LC4',
    body: 'Radiador dimensionado para peso, não para uso parado. Em trechos técnicos lentos prolongados, monitore a temperatura e force circulação com rotações mais altas periódicas.',
  },
  {
    severity: 'WARN',
    title: 'Vibração e afrouxamento — mais evidente em curso longo que na 400',
    body: 'O curso maior do motor 450 pode gerar vibração ligeiramente mais perceptível que a 400 em certas faixas de rotação. Verifique periodicamente os parafusos de fixação do motor e da carenagem. Coxins de borracha ressecados por idade agravam a sensação de vibração.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem a cabo: desgaste e necessidade de ajuste periódico',
    body: 'Assim como a EXC 400, esta geração usa cabo de embreagem (não hidráulica). Cabos endurecidos ou com fios partidos causam alavanca dura ou ponto de acionamento incorreto. Ajuste a folga (2-3mm na ponta da alavanca) e lubrifique o cabo periodicamente.',
  },
]

const EXC450_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma KTM EXC 450 (motor LC4 carburado, curso longo)',
    body: '500 km (pós-revisão) — Troca de óleo. | 2.000–3.000 km — Troca de óleo (10W-50, 1,25L). Limpeza do carburador FCR 39. | 3.000-4.000 km — Vela NGK DCPR8E (inspecionar/trocar, gap 0,6-0,7mm). | 5.000 km — Folga de válvulas (motor frio) — crítico. Jetting do carburador se mudou de altitude. | 8.000 km — Kit relação 520 (14:52) se desgastado. Retentores de bengala. | Anual — Inspeção de mangueiras, retentores de motor, rolamentos, estado do cabo de embreagem.',
  },
]

// ─── KTM EXC 520 (2000–2002) — família LC4 histórica, grande cilindrada ──────
// Motor: 510,4cc monocilíndrico SOHC 4V, refrigerado a líquido, com eixo balanceador
// Compressão ~11,7:1 | Potência: ~50-55cv (estimativa por faixa da família 500cc+ LC4) | Torque elevado em baixa
// Carburador: Keihin MX-FCR 39/41 | Óleo: 10W-50 sintético JASO MA (API SG/SH mínimo)
// Vela: NGK DCPR8E | Pneu: 90/90-21 (F) / 140/80-18 (R) | Peso ~112kg
// Predecessora direta da 525 EXC — motor de maior cilindrada da família LC4 de sua época

const EXC520_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-50 sintético JASO MA — motor grande LC4 exige troca frequente e óleo de qualidade',
    body: 'O motor SOHC 510,4cc é o maior da família EXC LC4 desta geração (2000-2002), com eixo balanceador para reduzir vibração. Use sintético 10W-50 JASO MA de qualidade (API SG/SH mínimo, mas prefira sintético completo dado o estresse térmico do motor grande): Motorex Power Synt 4T 10W-50, Motul 300V ou 7100. Troque a cada 2.000-3.000 km — motor de grande cilindrada e alta compressão gera mais calor no óleo que os menores 250/400.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Keihin FCR 39/41 — jetting específico para grande cilindrada, mais sensível à altitude',
    body: 'O motor 520 tem maior volume de admissão que os menores da família, tornando o ajuste do carburador ainda mais sensível a mudanças de altitude/temperatura. Leve sempre jatos sobressalentes (principal e piloto) em viagens que mudam muito de altitude. Sintomas de mistura errada: fumaça preta (rica) ou superaquecimento/engasgo (pobre) — mais crítico em motor grande pois o dano por superaquecimento tende a ser mais caro de reparar.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DCPR8E — mesma referência da família LC4, mas troque com mais atenção no motor grande',
    body: 'Gap 0,6-0,7mm. Como o motor 520 tem mais volume e compressão, a vela trabalha sob mais estresse térmico — inspecione a cada 3.000 km. Custo R$ 25-40. Tenha sempre uma reserva na bagagem em viagens longas de trilha/enduro.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com a família 400/450/525 do mesmo período',
    body: 'Muitos componentes de chassi, suspensão, elétrica e freios são compartilhados entre os modelos LC4 EXC desta geração (400/450/520/525). O que muda mais é o kit motor interno (pistão, curso). Ao buscar peças de desgaste (bengala, kit relação, pastilhas), consulte também anúncios/peças da 525 EXC (motor de cilindrada muito próxima, 510cc) — a compatibilidade costuma ser alta.',
  },
  {
    severity: 'OK',
    title: 'Eixo balanceador reduz vibração, mas ainda exige atenção em parafusos externos',
    body: 'O 520 EXC tem eixo balanceador (diferente do 400 mais simples), o que reduz mas não elimina a vibração típica de monocilíndrico grande. Ainda assim, inspecione parafusos de proteção de motor e fixação de carenagem após uso intenso de trilha.',
  },
  {
    severity: 'WARN',
    title: 'Unidade de 20+ anos: revisão geral obrigatória antes de uso intenso',
    body: 'Sendo o modelo mais antigo desta linha (2000-2002), qualquer unidade encontrada hoje precisa de revisão completa antes de confiar em uso pesado: fluidos, mangueiras, retentores, rolamentos, cabo de embreagem, e principalmente verificação de compressão e folga de válvulas antes de qualquer viagem longa de trilha.',
  },
]

const EXC520_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor de grande cilindrada: desgaste de válvulas ainda mais crítico',
    body: 'O motor 510cc de alta compressão sofre desgaste de válvulas de forma ainda mais impactante que os menores da família se a folga não for verificada. Combinado com a idade do veículo (20+ anos), a chance de encontrar uma unidade com folga fora do padrão é alta. Verificação de compressão e folga de válvulas é obrigatória antes de qualquer uso intenso.',
  },
  {
    severity: 'WARN',
    title: 'Retentores ressecados — motor com duas décadas de idade',
    body: 'Vazamentos por retentores ressecados (virabrequim, embreagem, seletor de marchas) são esperados em unidades desta idade. Inspecione visualmente antes de qualquer uso e substitua preventivamente se o histórico de manutenção for desconhecido.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento — motor grande gera mais calor, radiador da época é pequeno',
    body: 'O motor 520 gera mais calor que os menores da família, e o radiador desta geração não é grande. Em uso lento e técnico, monitore atentamente a temperatura. Considere upgrade de radiador maior (peças de reposição/aftermarket para motos vintage) se for usar a moto intensivamente em trilha técnica lenta.',
  },
  {
    severity: 'WARN',
    title: 'Vibração residual mesmo com eixo balanceador',
    body: 'Apesar do eixo balanceador, o motor grande ainda vibra de forma perceptível, especialmente em rotações médias sustentadas. Parafusos de fixação de motor e carenagem soltam com o tempo — inspecione regularmente.',
  },
  {
    severity: 'WARN',
    title: 'Peças originais escassas — dependa de compatibilidade cruzada com 525 EXC',
    body: 'Sendo o modelo mais antigo e de menor volume de produção desta linha, peças originais são raras. A melhor estratégia é buscar compatibilidade com a 525 EXC (sucessora direta, cilindrada muito próxima) ou peças genéricas de medida compatível, sempre confirmando fisicamente antes de instalar.',
  },
]

const EXC520_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma KTM EXC 520 (motor LC4 grande, carburado, unidade vintage)',
    body: 'Antes de qualquer uso — Revisão geral completa se histórico desconhecido (fluidos, retentores, compressão, folga de válvulas). | 2.000-3.000 km — Troca de óleo (10W-50 sintético). Limpeza do carburador FCR 39/41. | 3.000 km — Inspeção da vela NGK DCPR8E (gap 0,6-0,7mm). | 5.000 km — Folga de válvulas (motor frio) — crítico. | 8.000 km — Kit relação, retentores de bengala. | Anual — Mangueiras de arrefecimento, cabo de embreagem, estado geral do chassi contra corrosão.',
  },
]

// ─── KTM EXC 525 (2003–2007) — sucessora da 520, família LC4 histórica ───────
// Motor: 510cc monocilíndrico SOHC 4V (mesma cilindrada real da 520, apesar do nome "525")
// Potência: ~61cv @ 8.000 rpm | Torque: ~61Nm @ ~6.500 rpm (uma das mais potentes da família LC4)
// Carburador: Keihin MX-FCR 39 | Vela: NGK DCPR8E gap 0,6-0,7mm | Tanque: 8,5L (c/ reserva de 1L)
// Pneu: 90/90-21 (F) / 140/80-18 (R) | Câmbio 6 marchas
// NOTA: apesar do nome comercial "525", a cilindrada real é 510cc — mesma base do motor 520,
// com ajustes internos (comando, pistão, mapeamento de carburador) que elevam a potência.

const EXC525_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Atenção ao nome: "525" tem cilindrada real de 510cc — mesma base do motor 520',
    body: 'Apesar do nome comercial sugerir 525cc, a KTM 525 EXC tem cilindrada real de 510cc — a mesma base do motor da 520 EXC anterior, com ajustes internos (relação de compressão, comando de válvulas, carburação) que elevam a potência para cerca de 61cv. Isso significa que muitas peças internas de motor são compatíveis ou muito próximas entre 520 e 525 — mas SEMPRE confirme a medida física antes de comprar peça de reposição.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-50 sintético JASO MA — motor mais potente da família exige troca ainda mais rigorosa',
    body: 'Sendo o motor mais potente desta linha histórica (~61cv), a 525 EXC merece troca de óleo rigorosa: a cada 2.000-2.500 km em uso de lazer, mais frequente em uso competitivo. Sintético 10W-50 JASO MA: Motorex Power Synt 4T, Motul 300V ou 7100. Motor de alta performance com histórico de uso desconhecido (unidade de quase 20 anos) merece atenção redobrada ao consumo de óleo entre trocas.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Keihin FCR 39 — jetting mais agressivo que o 520, ajuste fino por altitude',
    body: 'O jato principal de referência para a família 450/525 EXC Racing é próximo de #178 (varia por altitude e ano — confirme com tabela de jetting específica). Jato de partida ao redor de #85, jato de marcha lenta próximo de #42. Leve jatos sobressalentes em viagens que cruzam grandes variações de altitude. Mistura errada em motor de alta compressão como este pode causar dano mais sério que em motores menores da família.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DCPR8E gap 0,6–0,7mm — mesma referência da família, inspeção mais frequente',
    body: 'Dado o maior estresse térmico do motor de maior potência, inspecione a vela a cada 2.500-3.000 km. Custo R$ 25-40. Leve reserva em viagens de trilha longas.',
  },
  {
    severity: 'OK',
    title: 'Compatibilidade de peças com 450 EXC Racing e 520 EXC da mesma geração',
    body: 'A 525 EXC compartilha muitos componentes de chassi e diversas peças de motor com a 450 EXC Racing e a 520 EXC do mesmo período (jetting muito próximo entre 450 e 525, segundo especificações técnicas de época). Ao buscar peças raras, considere anúncios destes modelos irmãos como fonte alternativa — sempre confirmando a medida física.',
  },
  {
    severity: 'WARN',
    title: 'Revisão geral obrigatória em unidades sem histórico — moto de alta performance envelhecida',
    body: 'Sendo o motor mais potente da família histórica e com quase duas décadas de idade, qualquer unidade sem histórico de manutenção documentado deve passar por revisão completa antes de uso intenso: compressão, folga de válvulas, estado de retentores e mangueiras, fluidos completos.',
  },
]

const EXC525_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Desgaste de válvulas — motor de maior potência da família, folga fecha mais rápido',
    body: 'Sendo o motor mais potente (~61cv) da linha histórica LC4, a 525 EXC tende a apresentar desgaste de válvulas ainda mais perceptível em uso intenso/competitivo. Verificação de folga a cada 5.000 km é essencial — não estenda o intervalo pensando que "está funcionando bem", pois o desgaste é progressivo e o dano por contato válvula/pistão é caro.',
  },
  {
    severity: 'WARN',
    title: 'Retentores ressecados por idade — mesmo padrão da família LC4 vintage',
    body: 'Motor com quase 20 anos: vazamentos por retentores ressecados são esperados. Inspecione antes de qualquer uso intenso. Peças genéricas de medida compatível resolvem a maioria dos casos por preço baixo (R$ 15-40).',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em uso técnico lento — motor de alta potência gera mais calor',
    body: 'Sendo o motor mais potente da família, gera proporcionalmente mais calor em uso lento/técnico prolongado. Monitore a temperatura de perto nestas condições e verifique o líquido de arrefecimento antes de cada saída.',
  },
  {
    severity: 'WARN',
    title: 'Vibração perceptível em rotações médias-altas',
    body: 'Motor de maior potência tende a vibrar de forma mais perceptível em uso sustentado de rotação média-alta. Inspecione parafusos de fixação de motor e carenagem regularmente, especialmente após trilhas mais exigentes.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem sob mais estresse — motor com mais torque desgasta discos mais rápido',
    body: 'O maior torque do motor 525 comparado aos menores da família impõe mais estresse à embreagem a cabo desta geração. Ajuste a folga do cabo regularmente e inspecione os discos se notar a alavanca "patinando" ou o ponto de acionamento mudando muito.',
  },
]

const EXC525_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma KTM EXC 525 (motor LC4 mais potente da família histórica)',
    body: 'Antes de qualquer uso — Revisão geral completa se histórico desconhecido. | 2.000–2.500 km — Troca de óleo (10W-50 sintético). Limpeza do carburador FCR 39. | 2.500-3.000 km — Inspeção da vela NGK DCPR8E (gap 0,6-0,7mm). | 5.000 km — Folga de válvulas (motor frio) — crítico, motor de maior potência da família. | 8.000 km — Kit relação, retentores de bengala, ajuste do cabo de embreagem. | Anual — Mangueiras de arrefecimento, estado geral do chassi, compressão do motor.',
  },
]

// ─── KTM 690 ENDURO / ENDURO R (2008–presente) ───────────────────────────────
// Motor: 690cc/693cc monocilíndrico DOHC LC4, refrigerado a líquido, injeção Keihin EMS
// Pré-2019: bore/stroke 102 × 84,5mm, compressão ~12,6:1 | Pós-2019: bore/stroke 105 × 80mm, compressão ~12,7:1
// Potência: ~65cv (versões antigas) a ~74-79cv (versão atual) | Torque: ~70-73Nm
// Óleo: 1,7L com filtro, 10W-50 (ou 10W-60) sintético JASO MA2 | Vela: NGK LKAR8AI-9 / LMAR7DI-10 (pós-2019, duas velas)
// Folga de válvulas: adm 0,10-0,15mm / esc 0,22-0,27mm (pós-2019, motor frio)
// Pneu: 90/90-21 (F) / 140/80-18 (R) | Corrente 520 | Tanque: ~13,5L | Peso ~145-150kg
// Dual-sport de grande cilindrada monocilíndrica — uma perna na trilha, outra na estrada/viagem longa

const ENDURO690_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-50 sintético JASO MA2 — 1,7L com filtro; troque a cada 10.000 km (uso misto)',
    body: 'O motor DOHC 690cc/693cc é o maior monocilíndrico de produção em série da KTM, usado tanto em trilha quanto em estrada/viagem longa. Capacidade: 1,7L com filtro. Use sintético 10W-50 JASO MA2 (algumas versões aceitam 10W-60 para clima muito quente): Motorex Power Synt 4T 10W-50 (recomendação de fábrica), Motul 7100 ou 300V. Intervalo oficial: 10.000 km ou anual. Em uso predominante de trilha pesada, reduza para 5.000-7.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: intervalo maior que a linha EXC-F, mas ainda é item importante',
    body: 'Diferente da linha EXC-F de competição (10.000 km), a 690 Enduro tem intervalo de verificação de folga de válvulas também de 10.000 km — mas por ser motor de maior cilindrada e uso mais "estrada" (menos rotação extrema constante), o desgaste tende a ser mais previsível. Especificação pós-2019: admissão 0,10-0,15mm / escape 0,22-0,27mm (motor frio). Não pule esta verificação mesmo em uso predominante de estrada — negligência ainda pode causar dano caro.',
  },
  {
    severity: 'OK',
    title: 'Vela(s) NGK — versões pós-2019 usam DUAS velas por cilindro (dupla ignição)',
    body: 'A partir da atualização de motor de 2019, a 690 Enduro R passou a usar sistema de ignição dupla (twin ignition) com duas velas: NGK LKAR9BI-10 (interna) e LMAR7DI-10 (externa) — confirme especificação exata pelo manual do ano. Versões anteriores a 2019 usam vela única NGK LKAR8AI-9, gap 0,9mm. Troque a cada 20.000 km (a cada duas revisões). Este sistema de dupla ignição melhora a combustão e reduz emissões, mas encarece um pouco a manutenção (duas velas por revisão).',
  },
  {
    severity: 'OK',
    title: 'Kit relação 520 e uso misto: ajuste conforme predominância trilha vs. estrada',
    body: 'Corrente 520, geralmente com O-ring para uso misto (DID 520VX3 é referência). Para uso predominante em viagem/estrada, o kit original equilibra bem economia de combustível e capacidade de trilha leve. Para quem usa mais fora de estrada, considerar 1 dente a menos no pinhão para mais tração em baixa (sacrifica um pouco de velocidade máxima em estrada). Lubrifique a cada 1.000 km (ou após chuva/trilha com barro).',
  },
  {
    severity: 'OK',
    title: 'Pneus para uso misto: Pirelli Scorpion Rally, Continental TKC80 ou Michelin Anakee Wild',
    body: 'Para quem usa a 690 Enduro em viagens de longa distância misturando trilha e estrada, os pneus mais recomendados pela comunidade são: Continental TKC80 (equilíbrio trilha/estrada, referência internacional para viagem off-road), Pirelli Scorpion Rally STR (mais voltado a asfalto/terra compactada), Michelin Anakee Wild (mais trilha pesada). Medida: 90/90-21 dianteiro / 140/80-18 traseiro. Pneus com câmara reforçada ou sistema Tubliss reduzem risco de furo em trilha com pedras.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar K&N ou equivalente — acesso fácil, mas não negligencie em uso off-road',
    body: 'O filtro de ar (K&N KT-6908 é referência de mercado, mas o filtro original de espuma também é eficaz) precisa de atenção redobrada em uso off-road com poeira. Limpe a cada 5.000-10.000 km em uso misto, ou a cada saída em trilha com muita poeira/areia. Produtos: Motul A1/A2 ou específicos para filtro de espuma. Moto de longo curso — leve um filtro extra limpo em viagens longas de trilha.',
  },
  {
    severity: 'WARN',
    title: 'Bateria: injeção eletrônica e ignição dupla exigem tensão estável, mesmo com moto parada',
    body: 'A 690 Enduro depende totalmente de injeção eletrônica (sem carburador) — bateria fraca causa partida difícil ou funcionamento errático. Mantenha a bateria carregada, especialmente se a moto ficar parada por semanas (comum em quem usa só aos finais de semana). Use um carregador de manutenção (tender) se a moto ficar parada por mais de 2-3 semanas.',
  },
]

const ENDURO690_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Desgaste de válvulas em uso de alta rotação constante (trilha rápida/competição)',
    body: 'Apesar do intervalo de verificação ser o mesmo da linha EXC-F (10.000 km), uso muito agressivo em trilha rápida ou pista acelera o desgaste do trem de válvulas do motor 690cc DOHC. Sintomas: dificuldade de partida a frio piorando, ruído do cabeçote, perda de potência progressiva. Não estenda o intervalo de verificação em uso intenso.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de bengala WP — uso off-road pesado acelera o desgaste',
    body: 'A bengala invertida WP da 690 Enduro (43-48mm dependendo do ano/versão) sofre o mesmo padrão de desgaste de retentor observado em toda a linha off-road da KTM: impactos, poeira e areia entrando pela haste desgastam o vedante. Sintoma: óleo escuro na parte inferior do tubo. Limpe as hastes após cada saída de trilha. Retentores genéricos: R$ 50-100 o par; mão de obra especializada: R$ 200-400.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito parado urbano (uso misto trilha/cidade)',
    body: 'Por ser usada também em trânsito urbano (dual-sport), a 690 Enduro pode superaquecer em congestionamento — o radiador é dimensionado para movimento constante, não parado prolongado. Sintoma: ventoinha ligada constantemente, temperatura subindo no marcador (se equipado). Em trânsito parado longo, considere desligar o motor em paradas prolongadas. Verifique o líquido de arrefecimento regularmente.',
  },
  {
    severity: 'WARN',
    title: 'Vibração característica do monocilíndrico grande — mais perceptível em viagens longas de estrada',
    body: 'Sendo o maior monocilíndrico de produção da KTM, a vibração em velocidade constante de estrada (viagem longa) é mais perceptível que em motos multicilíndricas de cilindrada similar. Isso é característica do motor, não defeito — mas vale inspecionar periodicamente coxins do motor, suportes de bagageiro e parafusos de acessórios (baú, suporte de GPS) que podem soltar com a vibração sustentada em viagens longas.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem hidráulica Brembo: desgaste acelerado com uso off-road técnico',
    body: 'Embreagem multidisco em banho de óleo com acionamento hidráulico Brembo. Uso técnico de trilha (arrastar embreagem em subidas) desgasta os discos mais rápido que uso apenas de estrada. Sintoma: ponto de acionamento mudando, alavanca "patinando" mesmo solta. Purgue com DOT 4 se a alavanca ficar esponjosa; inspecione os discos se o problema persistir.',
  },
]

const ENDURO690_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo KTM 690 Enduro/Enduro R (dual-sport de grande cilindrada)',
    body: '1.000 km — Troca de óleo inicial (rodagem). Lubrificação da corrente. | 10.000 km — Troca de óleo + filtro (10W-50, 1,7L). Folga de válvulas (adm 0,10-0,15mm / esc 0,22-0,27mm, motor frio). Filtro de ar. Verificar tensão da corrente. | 20.000 km — Troca de vela(s) NGK. Fluido de freio/embreagem (DOT 4 ou 5.1) — a cada 2 anos independente da km. | 30.000 km — Kit relação 520 se desgastado. Retentor de bengala WP (inspecionar). | 40.000 km (ou 4 anos) — Troca do líquido de arrefecimento (Motorex Coolant M3.0 ou equivalente sem silicato).',
  },
]

// ─── KTM LC4 640 TRAIL / ADVENTURE (~1998–2007) ──────────────────────────────
// Motor: 625/624,6cc monocilíndrico SOHC 4V, refrigerado a líquido, motor LC4, bore × stroke 101 × 78mm
// Compressão ~11,5-11,7:1 | Potência: ~53-55cv @ 7.000 rpm | Torque: ~55Nm @ 5.500 rpm
// Carburador: Mikuni BST 40 | Óleo: ~2,1L, 10W-50/5W-40 JASO T903 MA sintético
// Vela: NGK DRBEACPR8E (ou equivalente DR8EA) | Pneu: 90/90-21 (F) / 140/80-18 (R)
// Corrente: O-ring 5/8×1/4" relação 17:38 | Tanque: 12L | Peso ~158kg (versão Adventure, molhado)
// Predecessora histórica da 690 Enduro — motor simples e extremamente robusto, ainda muito usada
// no mercado brasileiro de usados e por viajantes de longa distância

const LC4640_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-50 ou 5W-40 sintético JASO T903 MA — ~2,1L; motor simples e robusto tolera bem uso pesado',
    body: 'O motor SOHC 625cc é conhecido por sua robustez mecânica — muitos exemplares passam de 100.000 km com manutenção básica em dia. Capacidade: aproximadamente 2,1L (confira o visor de óleo, varia ligeiramente por versão/ano). Use sintético 10W-50 ou 5W-40 JASO T903 MA: Motorex Power Synt 4T, Motul 7100 ou 300V. Troque a cada 3.000-5.000 km em uso de lazer/viagem — menos frequente que a linha EXC-F de competição, mas ainda mais rigoroso que motos de rua comuns dado o uso do óleo pela embreagem.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Mikuni BST 40 — mais simples que o Keihin FCR das EXCs, ainda assim precisa de rejetagem por altitude',
    body: 'O carburador Mikuni BST 40 é considerado mais tolerante e fácil de manter que os carburadores de competição Keihin FCR usados nas EXC. Ainda assim, viagens que cruzam grandes variações de altitude (subir serra) se beneficiam de rejetagem do jato principal. Sintomas de mistura errada: fumaça preta (rica), engasgo/perda de potência (pobre). Limpeza da cuba a cada 5.000-8.000 km ou se a moto ficar parada por meses.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DR8EA (ou DRBEACPR8E) — motor tolerante, mas gap correto ainda importa',
    body: 'Vela de referência para o motor LC4 640: NGK DR8EA ou equivalente com supressor de rádio DRBEACPR8E dependendo da versão/equipamento elétrico. Gap típico: 0,6-0,7mm. Custo: R$ 20-35. Motor mais "tolerante" que os de competição, mas ainda assim inspecione a cada 5.000 km — vela gasta aumenta consumo e dificulta partida a frio.',
  },
  {
    severity: 'OK',
    title: 'Peças ainda disponíveis no Brasil: moto muito usada por viajantes de longa distância',
    body: 'A LC4 640 Trail/Adventure tem uma base de proprietários relativamente forte no Brasil entre viajantes de longa distância (moto conhecida pela robustez e simplicidade mecânica). Peças de desgaste comum (kit relação, pastilhas, filtro de ar, retentores) são mais fáceis de encontrar que nas EXC de nicho — procure em oficinas especializadas em KTM ou grupos de viajantes/aventureiros que frequentemente compartilham fontes de peças confiáveis.',
  },
  {
    severity: 'OK',
    title: 'Corrente O-ring 5/8×1/4" (relação 17:38) — robusta, feita para viagem longa',
    body: 'Kit relação O-ring, mais durável que corrente sem retentor — adequado ao perfil de viagem longa da moto. Lubrifique a cada 500-1.000 km em viagem (mais em trilha com barro/poeira). Marcas recomendadas: DID ou RK série O-ring compatível com a medida 5/8×1/4". Kit completo: R$ 300-600.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 12L: autonomia é ponto fraco — planeje paradas em viagens remotas',
    body: 'Com tanque de 12L e consumo médio de 18-22 km/l dependendo do uso, a autonomia da LC4 640 gira em torno de 220-260 km — modesta para viagens remotas. Muitos viajantes instalam tanque auxiliar ou galões extras para trechos sem posto. Planeje o abastecimento com folga em regiões isoladas.',
  },
]

const LC4640_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste de válvulas — motor SOHC mais tolerante que os DOHC de competição, mas ainda exige verificação',
    body: 'Sendo motor SOHC de configuração mais simples que os DOHC de competição da linha EXC-F, o desgaste de válvulas é geralmente mais lento e previsível na LC4 640. Ainda assim, verifique a folga periodicamente (a cada 5.000-8.000 km) — negligência total ainda pode causar dano por contato válvula/pistão, especialmente em unidades com muitos anos de uso sem manutenção documentada.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor — motor robusto, mas retentores ressecam com a idade (moto de até 25+ anos)',
    body: 'Unidades desta geração (1998-2007) já têm entre 18-27 anos. Retentores de virabrequim, embreagem e seletor de marchas ressecam naturalmente com o tempo, independente do uso. Inspecione visualmente antes de qualquer viagem longa — vazamento em rota remota é um problema sério. Retentores genéricos: R$ 15-40 cada.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito urbano parado — mesma limitação da família LC4',
    body: 'Assim como a 690 Enduro (sua sucessora), a LC4 640 pode superaquecer em trânsito urbano parado por longos períodos — radiador dimensionado para movimento. Se usar a moto também na cidade, monitore a temperatura e evite ficar muito tempo com o motor ligado parado no sol forte.',
  },
  {
    severity: 'WARN',
    title: 'Vibração de monocilíndrico grande — desgasta suportes de bagagem em uso de viagem',
    body: 'A vibração do monocilíndrico 625cc é perceptível em velocidade de estrada constante, típica de viagem longa. Suportes de bagageiro, baús e acessórios instalados podem soltar parafusos com o tempo — inspecione antes e durante viagens longas, use trava-rosca nos pontos de fixação de acessórios.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem a cabo: ajuste periódico necessário, especialmente em viagem',
    body: 'A LC4 640 desta geração usa embreagem acionada a cabo (não hidráulica). Em viagens longas, o cabo pode esticar e a folga da alavanca aumentar — ajuste periodicamente (2-3mm de folga na ponta da alavanca é a referência típica). Leve um cabo de embreagem sobressalente em viagens remotas — é um item de falha conhecido em uso prolongado e barato de se levar como reserva.',
  },
]

const LC4640_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma KTM LC4 640 Trail/Adventure (motor SOHC robusto, uso de viagem/trilha)',
    body: '500 km (pós-revisão/restauração) — Troca de óleo. | 3.000-5.000 km — Troca de óleo (10W-50 ou 5W-40, ~2,1L). Limpeza do carburador Mikuni BST 40 se necessário. | 5.000 km — Inspeção da vela NGK DR8EA (gap 0,6-0,7mm). Lubrificação/inspeção da corrente O-ring. | 8.000 km — Folga de válvulas (motor frio). Kit relação 17:38 se desgastado. | 10.000 km — Retentores de bengala (inspecionar). Cabo de embreagem (ajustar/inspecionar desgaste). | Anual (ou antes de viagem longa) — Mangueiras de arrefecimento, rolamentos de roda e direção, estado geral do chassi.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'EXC-F 250',
    yearFrom: 2007,
    yearTo: null,
    MACETES: EXCF250_MACETES,
    PROBLEMAS: EXCF250_PROBLEMAS,
    MANUTENCAO: EXCF250_MANUTENCAO,
  },
  {
    modelName: 'EXC-F 350',
    yearFrom: 2012,
    yearTo: null,
    MACETES: EXCF350_MACETES,
    PROBLEMAS: EXCF350_PROBLEMAS,
    MANUTENCAO: EXCF350_MANUTENCAO,
  },
  {
    modelName: 'EXC-F 300 SIX DAYS',
    yearFrom: 2012,
    yearTo: 2013,
    MACETES: EXCF300SD_MACETES,
    PROBLEMAS: EXCF300SD_PROBLEMAS,
    MANUTENCAO: EXCF300SD_MANUTENCAO,
  },
  {
    modelName: 'EXC 400',
    yearFrom: 2000,
    yearTo: 2002,
    MACETES: EXC400_MACETES,
    PROBLEMAS: EXC400_PROBLEMAS,
    MANUTENCAO: EXC400_MANUTENCAO,
  },
  {
    modelName: 'EXC 450',
    yearFrom: 2003,
    yearTo: 2007,
    MACETES: EXC450_MACETES,
    PROBLEMAS: EXC450_PROBLEMAS,
    MANUTENCAO: EXC450_MANUTENCAO,
  },
  {
    modelName: 'EXC 520',
    yearFrom: 2000,
    yearTo: 2002,
    MACETES: EXC520_MACETES,
    PROBLEMAS: EXC520_PROBLEMAS,
    MANUTENCAO: EXC520_MANUTENCAO,
  },
  {
    modelName: 'EXC 525',
    yearFrom: 2003,
    yearTo: 2007,
    MACETES: EXC525_MACETES,
    PROBLEMAS: EXC525_PROBLEMAS,
    MANUTENCAO: EXC525_MANUTENCAO,
  },
  {
    modelName: '690 ENDURO /ENDURO R',
    yearFrom: 2008,
    yearTo: null,
    MACETES: ENDURO690_MACETES,
    PROBLEMAS: ENDURO690_PROBLEMAS,
    MANUTENCAO: ENDURO690_MANUTENCAO,
  },
  {
    modelName: 'LC4 640 TRAIL',
    yearFrom: 1998,
    yearTo: 2007,
    MACETES: LC4640_MACETES,
    PROBLEMAS: LC4640_PROBLEMAS,
    MANUTENCAO: LC4640_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'EXC-F 250',
    yearFrom: 2007, yearTo: null,
    tireSize: '90/90-21 (F) · 120/90-18 (R)',
    frontPsi: 13, rearPsi: 13,
    frontPsiLoad: 15, rearPsiLoad: 15,
    notes: 'Uso off-road puro: 12-14 PSI (F/R) para melhor aderência em trilha. Uso misto com mais estrada: 14-16 PSI. Pneus com câmara: nunca rodar abaixo de 10 PSI para evitar "pinch flat". Recomendados: Pirelli Scorpion MX/Rally, Michelin Enduro Competition VI.',
  },
  {
    modelName: 'EXC-F 350',
    yearFrom: 2012, yearTo: null,
    tireSize: '90/90-21 (F) · 140/80-18 (R)',
    frontPsi: 13, rearPsi: 13,
    frontPsiLoad: 15, rearPsiLoad: 15,
    notes: 'Uso off-road puro: 12-14 PSI. Uso misto/viagem com trecho de estrada: 14-16 PSI. Verifique antes de cada saída — pressão baixa demais aumenta risco de furo por "pinch flat" em trilha com pedras. Recomendados: Pirelli Scorpion Rally, Michelin Enduro Competition VI.',
  },
  {
    modelName: 'EXC-F 300 SIX DAYS',
    yearFrom: 2012, yearTo: 2013,
    tireSize: '90/90-21 (F) · 140/80-18 (R) — assumido igual à linha 250/350 EXC-F',
    frontPsi: 13, rearPsi: 13,
    frontPsiLoad: 15, rearPsiLoad: 15,
    notes: 'Pressões assumidas com base na linha EXC-F 250/350 (mesma família de pneus/aro). Uso off-road: 12-14 PSI. Uso misto: 14-16 PSI. Confirme a medida exata do pneu original pelo manual do chassi.',
  },
  {
    modelName: 'EXC 400',
    yearFrom: 2000, yearTo: 2002,
    tireSize: '90/90-21 (F) · 140/80-18 (R)',
    frontPsi: 13, rearPsi: 14,
    frontPsiLoad: 15, rearPsiLoad: 16,
    notes: 'Uso off-road: 12-14 PSI (F) / 13-15 PSI (R). Pneus originais de época: Bridgestone M77 (F) / M78 (R) — hoje substituíveis por Pirelli Scorpion MX ou similar de mesma medida.',
  },
  {
    modelName: 'EXC 450',
    yearFrom: 2003, yearTo: 2007,
    tireSize: '90/90-21 (F) · 140/80-18 (R)',
    frontPsi: 13, rearPsi: 14,
    frontPsiLoad: 15, rearPsiLoad: 16,
    notes: 'Uso off-road: 12-14 PSI (F) / 13-15 PSI (R). Mesma medida de pneu da EXC 400 — Pirelli Scorpion MX ou equivalente de trilha.',
  },
  {
    modelName: 'EXC 520',
    yearFrom: 2000, yearTo: 2002,
    tireSize: '90/90-21 (F) · 140/80-18 (R)',
    frontPsi: 14, rearPsi: 15,
    frontPsiLoad: 16, rearPsiLoad: 17,
    notes: 'Motor de maior cilindrada/peso — pressão ligeiramente maior que os modelos menores da família. Uso off-road: 13-15 PSI (F) / 14-16 PSI (R).',
  },
  {
    modelName: 'EXC 525',
    yearFrom: 2003, yearTo: 2007,
    tireSize: '90/90-21 (F) · 140/80-18 (R)',
    frontPsi: 14, rearPsi: 15,
    frontPsiLoad: 16, rearPsiLoad: 17,
    notes: 'Tanque 8,5L com reserva de 1L. Uso off-road: 13-15 PSI (F) / 14-16 PSI (R). Motor mais potente da família — pneu em bom estado é ainda mais importante.',
  },
  {
    modelName: '690 ENDURO /ENDURO R',
    yearFrom: 2008, yearTo: null,
    tireSize: '90/90-21 (F) · 140/80-18 (R)',
    frontPsi: 26, rearPsi: 26,
    frontPsiLoad: 29, rearPsiLoad: 32,
    notes: 'Uso rodoviário/viagem (manual oficial): F 1,8 bar (26 PSI) / R 1,8 bar (26 PSI) solo; com bagagem/carona: F 2,0 bar (29 PSI) / R 2,2 bar (32 PSI). Para trilha/off-road: reduza para 15-18 PSI (F/R). Ajuste conforme o uso do dia — dual-sport exige recalibragem frequente entre estrada e trilha.',
  },
  {
    modelName: 'LC4 640 TRAIL',
    yearFrom: 1998, yearTo: 2007,
    tireSize: '90/90-21 (F) · 140/80-18 (R)',
    frontPsi: 26, rearPsi: 29,
    frontPsiLoad: 29, rearPsiLoad: 31,
    notes: 'Uso rodoviário/viagem (manual oficial): solo F 1,8 bar (26 PSI) / R 2,0 bar (29 PSI); com carona/bagagem: F 2,0 bar (29 PSI) / R 2,2 bar (31 PSI). Para trilha: reduza para 15-18 PSI.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // EXC-F 250
  { modelName: 'EXC-F 250', yearFrom: 2007, yearTo: null, component: 'Óleo 10W-50 sintético JASO MA2 (1,2L c/ filtro)', intervalKm: 2000, intervalMonths: 6, notes: 'Motorex Power Synt 4T 10W-50 (fábrica) ou Motul 300V/7100. Reduzir para 500-1.000 km em competição.', priority: 'CRITICAL', order: 1 },
  { modelName: 'EXC-F 250', yearFrom: 2007, yearTo: null, component: 'Folga de válvulas (adm 0,10-0,15mm / esc 0,13-0,18mm)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio. Item mais crítico da manutenção — desgaste rápido em uso de alta rotação.', priority: 'CRITICAL', order: 2 },
  { modelName: 'EXC-F 250', yearFrom: 2007, yearTo: null, component: 'Vela NGK LMAR9AI-10 (irídio, gap ~1,0mm)', intervalKm: 10000, intervalMonths: null, notes: 'Inspecionar junto com folga de válvulas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'EXC-F 250', yearFrom: 2007, yearTo: null, component: 'Filtro de ar (espuma) — limpeza', intervalKm: 500, intervalMonths: null, notes: 'A cada saída em uso off-road pesado. Usar Twin Air ou Motul A1/A2.', priority: 'HIGH', order: 4 },
  { modelName: 'EXC-F 250', yearFrom: 2007, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 300, intervalMonths: null, notes: 'Mais frequente após trilha com barro/poeira.', priority: 'HIGH', order: 5 },
  { modelName: 'EXC-F 250', yearFrom: 2007, yearTo: null, component: 'Fluido de freio/embreagem DOT 4', intervalKm: null, intervalMonths: 12, notes: 'Sistema Brembo hidráulico. Purgar se alavanca ficar esponjosa.', priority: 'HIGH', order: 6 },
  { modelName: 'EXC-F 250', yearFrom: 2007, yearTo: null, component: 'Retentor de bengala WP', intervalKm: 15000, intervalMonths: null, notes: 'Inspecionar/trocar se vazando óleo pela haste.', priority: 'MEDIUM', order: 7 },
  { modelName: 'EXC-F 250', yearFrom: 2007, yearTo: null, component: 'Kit relação 520 completo', intervalKm: 15000, intervalMonths: null, notes: 'Trocar pinhão + coroa + corrente juntos.', priority: 'MEDIUM', order: 8 },
  { modelName: 'EXC-F 250', yearFrom: 2007, yearTo: null, component: 'Pastilhas de freio', intervalKm: 8000, intervalMonths: null, notes: 'EBC ou Galfer compatíveis Brembo.', priority: 'MEDIUM', order: 9 },

  // EXC-F 350
  { modelName: 'EXC-F 350', yearFrom: 2012, yearTo: null, component: 'Óleo 10W-50 sintético JASO MA2 (1,2L c/ filtro)', intervalKm: 2000, intervalMonths: 6, notes: 'Motorex Power Synt 4T 10W-50 ou Motul 300V/7100.', priority: 'CRITICAL', order: 1 },
  { modelName: 'EXC-F 350', yearFrom: 2012, yearTo: null, component: 'Folga de válvulas (adm 0,10-0,15mm / esc 0,13-0,18mm)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio. Crítico para evitar contato válvula/pistão.', priority: 'CRITICAL', order: 2 },
  { modelName: 'EXC-F 350', yearFrom: 2012, yearTo: null, component: 'Vela NGK LMAR9AI-8 (irídio, gap ~0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Confirmar código exato pelo ano do modelo.', priority: 'MEDIUM', order: 3 },
  { modelName: 'EXC-F 350', yearFrom: 2012, yearTo: null, component: 'Filtro de ar (espuma) — limpeza', intervalKm: 500, intervalMonths: null, notes: 'Twin Air ou Motul A1/A2. Crítico em trilha poeirenta.', priority: 'HIGH', order: 4 },
  { modelName: 'EXC-F 350', yearFrom: 2012, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 300, intervalMonths: null, notes: 'Mais frequente em trilha com barro.', priority: 'HIGH', order: 5 },
  { modelName: 'EXC-F 350', yearFrom: 2012, yearTo: null, component: 'Fluido de freio/embreagem DOT 4', intervalKm: null, intervalMonths: 12, notes: 'Sistema Brembo hidráulico.', priority: 'HIGH', order: 6 },
  { modelName: 'EXC-F 350', yearFrom: 2012, yearTo: null, component: 'Retentor de bengala WP', intervalKm: 15000, intervalMonths: null, notes: 'Limpar hastes após cada trilha para prolongar vida útil.', priority: 'MEDIUM', order: 7 },
  { modelName: 'EXC-F 350', yearFrom: 2012, yearTo: null, component: 'Kit relação 520 completo', intervalKm: 15000, intervalMonths: null, notes: 'Ajustar relação conforme uso trilha/estrada.', priority: 'MEDIUM', order: 8 },
  { modelName: 'EXC-F 350', yearFrom: 2012, yearTo: null, component: 'Pastilhas de freio', intervalKm: 8000, intervalMonths: null, notes: 'EBC ou Galfer compatíveis Brembo.', priority: 'MEDIUM', order: 9 },

  // EXC-F 300 SIX DAYS (assumindo motor 349,7cc equivalente à 350)
  { modelName: 'EXC-F 300 SIX DAYS', yearFrom: 2012, yearTo: 2013, component: 'CONFIRMAR cilindrada real pelo chassi antes de qualquer serviço', intervalKm: null, intervalMonths: null, notes: 'Nome incomum na FIPE — pode ser motor 349,7cc (base 350) ou nomenclatura de nicho. Confirme com mecânico KTM.', priority: 'CRITICAL', order: 1 },
  { modelName: 'EXC-F 300 SIX DAYS', yearFrom: 2012, yearTo: 2013, component: 'Óleo 10W-50 sintético JASO MA2 (assumindo 1,2L c/ filtro)', intervalKm: 2000, intervalMonths: 6, notes: 'Assumindo motor equivalente à 350 EXC-F Six Days.', priority: 'HIGH', order: 2 },
  { modelName: 'EXC-F 300 SIX DAYS', yearFrom: 2012, yearTo: 2013, component: 'Folga de válvulas (faixa típica adm 0,10-0,15mm / esc 0,13-0,18mm)', intervalKm: 10000, intervalMonths: 12, notes: 'Crítico independente da cilindrada exata.', priority: 'CRITICAL', order: 3 },
  { modelName: 'EXC-F 300 SIX DAYS', yearFrom: 2012, yearTo: 2013, component: 'Vela de irídio NGK (confirmar código pelo manual do chassi)', intervalKm: 10000, intervalMonths: null, notes: 'Série LMAR9AI, sufixo -8 ou -10 conforme modelo/ano.', priority: 'MEDIUM', order: 4 },
  { modelName: 'EXC-F 300 SIX DAYS', yearFrom: 2012, yearTo: 2013, component: 'Filtro de ar (espuma) — limpeza', intervalKm: 500, intervalMonths: null, notes: 'Twin Air ou Motul A1/A2.', priority: 'HIGH', order: 5 },
  { modelName: 'EXC-F 300 SIX DAYS', yearFrom: 2012, yearTo: 2013, component: 'Fluido de freio/embreagem DOT 4', intervalKm: null, intervalMonths: 12, notes: 'Sistema Brembo hidráulico.', priority: 'HIGH', order: 6 },
  { modelName: 'EXC-F 300 SIX DAYS', yearFrom: 2012, yearTo: 2013, component: 'Kit relação 520 completo', intervalKm: 15000, intervalMonths: null, notes: 'Confirmar medida física antes de comprar peça.', priority: 'MEDIUM', order: 7 },

  // EXC 400
  { modelName: 'EXC 400', yearFrom: 2000, yearTo: 2002, component: 'Óleo 10W-50 sintético JASO MA (~1,25L)', intervalKm: 2500, intervalMonths: 6, notes: 'Motorex Power Synt 4T ou Motul 7100/300V equivalente.', priority: 'HIGH', order: 1 },
  { modelName: 'EXC 400', yearFrom: 2000, yearTo: 2002, component: 'Vela NGK DCPR8E (gap 0,6-0,7mm)', intervalKm: 3500, intervalMonths: null, notes: 'Motor carburado desgasta vela mais rápido que injetado.', priority: 'MEDIUM', order: 2 },
  { modelName: 'EXC 400', yearFrom: 2000, yearTo: 2002, component: 'Limpeza/rejetagem carburador Keihin FCR 39', intervalKm: 5000, intervalMonths: 12, notes: 'Ajustar jetting por altitude/temporada. Limpar cuba se moto ficou parada.', priority: 'HIGH', order: 3 },
  { modelName: 'EXC 400', yearFrom: 2000, yearTo: 2002, component: 'Folga de válvulas', intervalKm: 5000, intervalMonths: 12, notes: 'Motor frio. Crítico especialmente em unidade sem histórico.', priority: 'CRITICAL', order: 4 },
  { modelName: 'EXC 400', yearFrom: 2000, yearTo: 2002, component: 'Kit relação X-ring 14:50', intervalKm: 8000, intervalMonths: null, notes: 'Verificar coroa/cubo de roda em unidades antigas.', priority: 'MEDIUM', order: 5 },
  { modelName: 'EXC 400', yearFrom: 2000, yearTo: 2002, component: 'Retentores de motor — inspeção geral', intervalKm: null, intervalMonths: 12, notes: 'Moto com 20+ anos: retentores ressecam independente do uso.', priority: 'HIGH', order: 6 },
  { modelName: 'EXC 400', yearFrom: 2000, yearTo: 2002, component: 'Mangueiras de arrefecimento — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Borracha ressecada com a idade é risco de vazamento/superaquecimento.', priority: 'HIGH', order: 7 },
  { modelName: 'EXC 400', yearFrom: 2000, yearTo: 2002, component: 'Cabo de embreagem — ajuste/lubrificação', intervalKm: 3000, intervalMonths: null, notes: 'Embreagem a cabo (não hidráulica nesta geração).', priority: 'LOW', order: 8 },

  // EXC 450
  { modelName: 'EXC 450', yearFrom: 2003, yearTo: 2007, component: 'Óleo 10W-50 sintético JASO MA (1,25L)', intervalKm: 2500, intervalMonths: 6, notes: 'Motorex Power Synt 4T (recomendação de fábrica) ou equivalente.', priority: 'HIGH', order: 1 },
  { modelName: 'EXC 450', yearFrom: 2003, yearTo: 2007, component: 'Vela NGK DCPR8E (gap 0,6-0,7mm)', intervalKm: 3500, intervalMonths: null, notes: 'Mesma referência da EXC 400.', priority: 'MEDIUM', order: 2 },
  { modelName: 'EXC 450', yearFrom: 2003, yearTo: 2007, component: 'Limpeza/rejetagem carburador Keihin FCR 39', intervalKm: 5000, intervalMonths: 12, notes: 'Ajustar por altitude/temporada.', priority: 'HIGH', order: 3 },
  { modelName: 'EXC 450', yearFrom: 2003, yearTo: 2007, component: 'Folga de válvulas', intervalKm: 5000, intervalMonths: 12, notes: 'Motor frio. Curso mais longo que a EXC 400 — dinâmica de desgaste própria.', priority: 'CRITICAL', order: 4 },
  { modelName: 'EXC 450', yearFrom: 2003, yearTo: 2007, component: 'Kit relação 520 (14:52)', intervalKm: 8000, intervalMonths: null, notes: 'Reduzir 1 dente no pinhão para uso técnico de trilha.', priority: 'MEDIUM', order: 5 },
  { modelName: 'EXC 450', yearFrom: 2003, yearTo: 2007, component: 'Retentores de motor — inspeção geral', intervalKm: null, intervalMonths: 12, notes: 'Moto próxima de 20 anos: verificar ressecamento.', priority: 'HIGH', order: 6 },
  { modelName: 'EXC 450', yearFrom: 2003, yearTo: 2007, component: 'Mangueiras de arrefecimento — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Risco de ressecamento pela idade.', priority: 'HIGH', order: 7 },
  { modelName: 'EXC 450', yearFrom: 2003, yearTo: 2007, component: 'Cabo de embreagem — ajuste/lubrificação', intervalKm: 3000, intervalMonths: null, notes: 'Embreagem a cabo.', priority: 'LOW', order: 8 },

  // EXC 520
  { modelName: 'EXC 520', yearFrom: 2000, yearTo: 2002, component: 'Óleo 10W-50 sintético JASO MA (motor grande)', intervalKm: 2500, intervalMonths: 6, notes: 'Motor de maior cilindrada da família — troca mais rigorosa.', priority: 'HIGH', order: 1 },
  { modelName: 'EXC 520', yearFrom: 2000, yearTo: 2002, component: 'Vela NGK DCPR8E (gap 0,6-0,7mm)', intervalKm: 3000, intervalMonths: null, notes: 'Inspecionar com mais frequência que motores menores da família.', priority: 'MEDIUM', order: 2 },
  { modelName: 'EXC 520', yearFrom: 2000, yearTo: 2002, component: 'Limpeza/rejetagem carburador Keihin FCR 39/41', intervalKm: 5000, intervalMonths: 12, notes: 'Motor grande é mais sensível a variação de altitude.', priority: 'HIGH', order: 3 },
  { modelName: 'EXC 520', yearFrom: 2000, yearTo: 2002, component: 'Folga de válvulas + verificação de compressão', intervalKm: 5000, intervalMonths: 12, notes: 'Obrigatório antes de uso intenso em unidade sem histórico.', priority: 'CRITICAL', order: 4 },
  { modelName: 'EXC 520', yearFrom: 2000, yearTo: 2002, component: 'Kit relação e retentores de bengala', intervalKm: 8000, intervalMonths: null, notes: 'Compatibilidade cruzada com 525 EXC ao buscar peças.', priority: 'MEDIUM', order: 5 },
  { modelName: 'EXC 520', yearFrom: 2000, yearTo: 2002, component: 'Retentores de motor — inspeção geral', intervalKm: null, intervalMonths: 12, notes: 'Moto com 20+ anos: revisão geral recomendada.', priority: 'HIGH', order: 6 },
  { modelName: 'EXC 520', yearFrom: 2000, yearTo: 2002, component: 'Mangueiras e cabo de embreagem — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Risco de ressecamento pela idade.', priority: 'HIGH', order: 7 },

  // EXC 525
  { modelName: 'EXC 525', yearFrom: 2003, yearTo: 2007, component: 'Óleo 10W-50 sintético JASO MA (motor mais potente da família)', intervalKm: 2000, intervalMonths: 6, notes: '~61cv — motor de maior performance da linha histórica LC4.', priority: 'CRITICAL', order: 1 },
  { modelName: 'EXC 525', yearFrom: 2003, yearTo: 2007, component: 'Vela NGK DCPR8E (gap 0,6-0,7mm)', intervalKm: 2500, intervalMonths: null, notes: 'Inspeção mais frequente dado o maior estresse térmico.', priority: 'MEDIUM', order: 2 },
  { modelName: 'EXC 525', yearFrom: 2003, yearTo: 2007, component: 'Limpeza/rejetagem carburador Keihin FCR 39', intervalKm: 5000, intervalMonths: 12, notes: 'Jato principal ~178, partida ~85, marcha lenta ~42 (referência, confirmar por ano).', priority: 'HIGH', order: 3 },
  { modelName: 'EXC 525', yearFrom: 2003, yearTo: 2007, component: 'Folga de válvulas', intervalKm: 5000, intervalMonths: 12, notes: 'Motor mais potente da família — folga fecha mais rápido.', priority: 'CRITICAL', order: 4 },
  { modelName: 'EXC 525', yearFrom: 2003, yearTo: 2007, component: 'Kit relação e retentores de bengala', intervalKm: 8000, intervalMonths: null, notes: 'Compatibilidade com 450 EXC Racing e 520 EXC.', priority: 'MEDIUM', order: 5 },
  { modelName: 'EXC 525', yearFrom: 2003, yearTo: 2007, component: 'Retentores de motor — inspeção geral', intervalKm: null, intervalMonths: 12, notes: 'Moto com quase 20 anos: revisão geral recomendada.', priority: 'HIGH', order: 6 },
  { modelName: 'EXC 525', yearFrom: 2003, yearTo: 2007, component: 'Cabo de embreagem — ajuste', intervalKm: 3000, intervalMonths: null, notes: 'Maior torque desgasta discos/cabo mais rápido.', priority: 'MEDIUM', order: 7 },

  // 690 ENDURO /ENDURO R
  { modelName: '690 ENDURO /ENDURO R', yearFrom: 2008, yearTo: null, component: 'Óleo 10W-50 sintético JASO MA2 (1,7L c/ filtro)', intervalKm: 10000, intervalMonths: 12, notes: 'Motorex Power Synt 4T 10W-50. Reduzir para 5.000-7.000 km em uso pesado de trilha.', priority: 'HIGH', order: 1 },
  { modelName: '690 ENDURO /ENDURO R', yearFrom: 2008, yearTo: null, component: 'Folga de válvulas (adm 0,10-0,15mm / esc 0,22-0,27mm, pós-2019)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio. Confirmar espec exata pelo ano (pré/pós atualização 2019).', priority: 'CRITICAL', order: 2 },
  { modelName: '690 ENDURO /ENDURO R', yearFrom: 2008, yearTo: null, component: 'Vela(s) NGK (LKAR8AI-9 pré-2019 / par LKAR9BI-10+LMAR7DI-10 pós-2019)', intervalKm: 20000, intervalMonths: null, notes: 'Pós-2019: sistema de ignição dupla com duas velas por cilindro.', priority: 'MEDIUM', order: 3 },
  { modelName: '690 ENDURO /ENDURO R', yearFrom: 2008, yearTo: null, component: 'Filtro de ar (K&N ou espuma original) — limpeza', intervalKm: 10000, intervalMonths: null, notes: 'Mais frequente em uso off-road com poeira.', priority: 'HIGH', order: 4 },
  { modelName: '690 ENDURO /ENDURO R', yearFrom: 2008, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 1000, intervalMonths: null, notes: 'Mais frequente após chuva ou trilha com barro.', priority: 'HIGH', order: 5 },
  { modelName: '690 ENDURO /ENDURO R', yearFrom: 2008, yearTo: null, component: 'Fluido de freio/embreagem DOT 4/5.1', intervalKm: null, intervalMonths: 24, notes: 'Sistema Brembo hidráulico.', priority: 'HIGH', order: 6 },
  { modelName: '690 ENDURO /ENDURO R', yearFrom: 2008, yearTo: null, component: 'Retentor de bengala WP', intervalKm: 30000, intervalMonths: null, notes: 'Limpar hastes após trilha para prolongar vida útil.', priority: 'MEDIUM', order: 7 },
  { modelName: '690 ENDURO /ENDURO R', yearFrom: 2008, yearTo: null, component: 'Kit relação 520 completo', intervalKm: 30000, intervalMonths: null, notes: 'Ajustar dentes do pinhão conforme uso trilha/estrada.', priority: 'MEDIUM', order: 8 },
  { modelName: '690 ENDURO /ENDURO R', yearFrom: 2008, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: 40000, intervalMonths: 48, notes: 'Motorex Coolant M3.0 ou equivalente sem silicato.', priority: 'MEDIUM', order: 9 },

  // LC4 640 TRAIL
  { modelName: 'LC4 640 TRAIL', yearFrom: 1998, yearTo: 2007, component: 'Óleo 10W-50 ou 5W-40 sintético JASO T903 MA (~2,1L)', intervalKm: 4000, intervalMonths: 6, notes: 'Motorex Power Synt 4T ou Motul 7100/300V.', priority: 'HIGH', order: 1 },
  { modelName: 'LC4 640 TRAIL', yearFrom: 1998, yearTo: 2007, component: 'Vela NGK DR8EA (gap 0,6-0,7mm)', intervalKm: 5000, intervalMonths: null, notes: 'Motor mais tolerante, mas ainda merece inspeção regular.', priority: 'MEDIUM', order: 2 },
  { modelName: 'LC4 640 TRAIL', yearFrom: 1998, yearTo: 2007, component: 'Limpeza carburador Mikuni BST 40', intervalKm: 6000, intervalMonths: 12, notes: 'Mais tolerante que Keihin FCR, mas ainda precisa de rejetagem por altitude.', priority: 'MEDIUM', order: 3 },
  { modelName: 'LC4 640 TRAIL', yearFrom: 1998, yearTo: 2007, component: 'Folga de válvulas', intervalKm: 8000, intervalMonths: 12, notes: 'Motor SOHC mais tolerante, desgaste mais lento que DOHC de competição.', priority: 'HIGH', order: 4 },
  { modelName: 'LC4 640 TRAIL', yearFrom: 1998, yearTo: 2007, component: 'Kit relação O-ring 5/8×1/4" (17:38)', intervalKm: 15000, intervalMonths: null, notes: 'Corrente O-ring mais durável, adequada a viagem longa.', priority: 'MEDIUM', order: 5 },
  { modelName: 'LC4 640 TRAIL', yearFrom: 1998, yearTo: 2007, component: 'Retentores de motor — inspeção geral', intervalKm: null, intervalMonths: 12, notes: 'Moto com até 25+ anos: retentores ressecam com a idade.', priority: 'HIGH', order: 6 },
  { modelName: 'LC4 640 TRAIL', yearFrom: 1998, yearTo: 2007, component: 'Cabo de embreagem — ajuste/reserva em viagem', intervalKm: 3000, intervalMonths: null, notes: 'Item de falha conhecido em viagem longa — leve reserva.', priority: 'MEDIUM', order: 7 },
  { modelName: 'LC4 640 TRAIL', yearFrom: 1998, yearTo: 2007, component: 'Mangueiras de arrefecimento e rolamentos — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Antes de qualquer viagem longa.', priority: 'HIGH', order: 8 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed KTM EXC-F / EXC / 690 Enduro / LC4 640 (4 tempos monocilíndrico)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'KTM', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'KTM', vehicleTypeId: motoType.id },
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

  console.log('✅ KTM EXC-F / EXC / 690 Enduro / LC4 640 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
