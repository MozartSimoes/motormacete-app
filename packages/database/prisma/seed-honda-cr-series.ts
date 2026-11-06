// seed-honda-cr-series.ts — Honda CR 80 · CR 125 · CR 250 (2 tempos, motocross)
// Motos de competição 2 tempos, líquido, produção até ~2002 (CR80) / 2007 (CR125/CR250)
// NÃO têm válvulas de admissão/escape convencionais (2 tempos = orifícios de transferência)
// Óleo de câmbio separado (Gear Oil ou ATF) — NÃO confundir com premix de motor
// Manutenção de 2 tempos: top-end por horas de uso, não km
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

// ─── Macetes comuns a todos os CR ─────────────────────────────────────────────

const CR_MACETES_COMUNS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 2 TEMPOS — NÃO tem óleo de motor no cárter; lubrificação é pelo premix de gasolina+óleo 2T injetado na admissão; câmbio tem óleo separado',
    body: 'Os CR são motores 2 tempos: a lubrificação do motor vem diretamente da mistura gasolina + óleo 2T (premix). NUNCA adicionar óleo 4 tempos no cárter — não há compartimento de óleo de motor como nas 4 tempos. O câmbio (engrenagens + embreagem) tem óleo separado: Honda HP Gear Oil ou equivalente API GL-3 10W-30, capacidade ~750 mL (CR80/CR125) ou ~900 mL (CR250). Trocar câmbio a cada 5 sessões de uso (aproximadamente 50 horas de uso).',
  },
  {
    severity: 'OK',
    title: 'Premix gasolina + óleo 2T: proporção 40:1 (25 mL óleo por litro de gasolina) — usar óleo sintético de qualidade (Motul 800, Bel-Ray MC-1, Maxima Castor 927)',
    body: 'Proporção padrão para CR Honda em competição: 40:1 (1 litro de gasolina + 25 mL de óleo 2T). Uso recreativo/trilha: pode usar 32:1 (31 mL/L) para proteger mais o motor. Óleo sintético de corrida (Motul 800 Full Synthetic, Bel-Ray MC-1): R$80-150/500mL. Óleo barato caseiro (Raizin, genérico) em CR de competição: risco de gripagem por lubrificação insuficiente no power range (alta rotação). Misturar no tanque: adicionar o óleo primeiro, depois a gasolina, agitar o tanque antes de ligar.',
  },
  {
    severity: 'OK',
    title: 'Manutenção por HORAS DE USO, não km — top-end a cada 25-40 horas; fundo a cada 80-100 horas; 1 hora de uso ≈ 30-50 km de trilha',
    body: 'CR Honda são motos de competição: o intervalo correto de manutenção é em horas, não quilômetros. Estimativa: 1 hora de uso = 30-50 km dependendo da trilha. Top-end (pistão + anel + cilindro): substituir a cada 25-40 horas de uso (CR125/CR250 em competição: 20-25 horas; trilha recreativa: 35-40 horas; CR80 de criança: 40-50 horas). Fundo (rolamentos de virabrequim, biela): a cada 80-100 horas. Usar borracheiro do virabrequim a cada top-end. Registro de horas: caderno ou contador digital (Trail Tech Vapor).',
  },
  {
    severity: 'OK',
    title: 'Válvula de exaustão (power valve / ATAC) — componente crítico em 2 tempos; limpeza a cada 20-25 horas; travada ou suja = motor sem power band',
    body: 'Os CR Honda (especialmente CR125 e CR250) têm sistema de válvula de exaustão (ATAC ou HPPP — Honda Power Port System) que controla o diâmetro do escapamento conforme a rotação. Suja: depósito de carbono trava a válvula na posição fechada → motor perde toda a "pancada" em alta rotação (power band). Limpeza: a cada 20-25 horas. Produto: spray de carburador ou solvente WD-40. Desmontagem do escapamento + lateral do cárter. Mola da válvula fraca: substituir ao montar (R$20-40 a mola). CR80: tem sistema ATAC mais simples mas igualmente importante.',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK especifica para 2 tempos (NEVER use vela de 4 tempos) — BR9ES (uso geral) ou R9449A-9 (competição); trocar a cada 10-15 horas de uso',
    body: 'Velas de 2 tempos têm design diferente das 4 tempos. CR80: NGK BR8ES / BR9ES. CR125: NGK BR9EG / BR9EIX (iridium para corrida). CR250: NGK BR8EG / BR8EIX. Usar vela de 4 tempos (CR8E, DR8ES) em motor 2 tempos = vela aquece incorretamente e pode causar detonação ou quebra do eletrodo no cilindro (destruindo o motor). Troca: a cada 10-15 horas em competição (R$15-50). Leitura da vela: marrom clara = mistura correta; preta e oleosa = mistura muito rica ou óleo de má qualidade; branca = mistura pobre (risco de gripagem).',
  },
]

// ─── CR 80 ────────────────────────────────────────────────────────────────────

const CR80_MACETES: TipInput[] = [
  ...CR_MACETES_COMUNS,
  {
    severity: 'OK',
    title: 'CR80R: motor 80cc líquido-refrigerado, ~25 cv — moto de criança/adolescente; virabrequim desequilibrado ao montar é a causa #1 de quebra de biela prematura',
    body: 'O CR80R é moto de competição para crianças a partir de 8 anos (versão Standard) e adolescentes (versão Expert com banco mais alto). Motor 80cc de alta performance: 25 cv a 9.000+ rpm. Na reconstrução do top-end: NUNCA montar o novo pistão sem checar a folga na camisa (entre pistão e cilindro): 0,055-0,065 mm. Folga errada = gripagem no primeiro uso. Virabrequim: ao reconstruir o fundo do motor, o virabrequim deve ser equilibrado dinamicamente em oficina especializada.',
  },
  {
    severity: 'WARN',
    title: 'Peças de reposição escassas no Brasil (CR80 não é mais fabricado desde 2002) — fornecedores: Wiseco (EUA), Vertex, ProX para pistão/anel; cilindro por replating',
    body: 'O CR80R foi descontinuado em 2002 (substituído pelo CR85R). Peças originais Honda: raras e caras no Brasil (importação). Alternativas confiáveis: pistão Wiseco (importado, R$200-350), anel Vertex, kit de reconstrução do fundo ProX (biela + rolamentos, R$400-700). Cilindro desgastado: servicing (replating) por empresas especializadas em replating de 2 tempos (Moto Klass SP, RE Cylinders) — R$300-600 vs cilindro novo importado R$600-1.200.',
  },
]

const CR80_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Gripagem por falta ou má qualidade do premix — causa #1 de destruição de motor 2 tempos; sintoma: motor trava de repente; custo do reparo: R$600-1.500',
    body: 'Gripagem: pistão se expande (superaquece) e trava no cilindro. Causas: (1) premix mal misturado (pouco óleo); (2) óleo 2T de má qualidade (marcas desconhecidas, óleo vegetal barato); (3) mistura muito pobre (jato de agulha errado); (4) vela muito fria (aquecendo demais). Sintoma: motor fica "pesado" gradualmente e depois trava (pior cenário: biela dobra, rolamento estilhaça). Após gripagem: checar todos os itens, cilindro precisa replating ou troca, pistão e anel sempre trocados, rolamento de biela e pino de biela verificar.',
  },
  {
    severity: 'WARN',
    title: 'Junta do cilindro soprando (head gasket blow) após top-end mal montado — torque dos parafusos em cruz, 25-30 N.m; junta de alumínio reutilizável com sealant específico',
    body: 'Após montagem do top-end, junta soprando é comum em quem não usa torquímetro. Sintoma: fumaça branca ou presença de óleo no coletor de admissão, perda de potência visível. Torque dos parafusos do cabeçote (4-6 parafusos): 25-30 N.m em esquema cruzado (nunca apertar sequencialmente). Usar sealant de grafite (Permatex High Temp ou Honda Hylomar) apenas nas bordas externas — nunca no interior da câmara de combustão. Reapertar após primeira sessão de uso (30 minutos de uso + esfriamento = verificar torque novamente).',
  },
  {
    severity: 'WARN',
    title: 'Cabo de acelerador quebrando dentro do guidão — fricção repetida em uso agressivo; manter cabo com lubrificante de cabo e verificar a cada 15 horas',
    body: 'Uso de corrida estressa o cabo de acelerador (trottle cable): movimentos rápidos e frequentes ao longo de dia inteiro de competição. Lubrificação: spray de cabo (WD-40 não é suficiente — usar graxa ou óleo de cabo específico). A cada 15-20 horas: verificar o interior do guidão onde o cabo curva — é onde arrebenta. Kit cabo de acelerador: R$30-80 (Honda original) ou aftermarket. Levar cabo reserva em competição — cabo arrebentado = dia perdido.',
  },
]

// ─── CR 125 ───────────────────────────────────────────────────────────────────

const CR125_MACETES: TipInput[] = [
  ...CR_MACETES_COMUNS,
  {
    severity: 'OK',
    title: 'CR125R: motor 125cc líquido, ~36 cv — cartucho de bengala ajustável; câmbio com 6 marchas + embreagem manual; embreagem hidráulica na versão de 2005+',
    body: 'O CR125R (última geração 2007) é motor 125cc monocilíndrico de alta performance (~36 cv a 11.000+ rpm). Diferente do CR80, tem câmbio de 6 marchas e embreagem manual. Ajuste do cartucho da bengala: compressão/extensão ajustáveis nos rebites laterais. Configuração para areia: compressão mais suave + extensão mais lenta. Configuração para terra dura: compressão média + extensão média. Lubrificante de câmbio: Honda HP Gear Oil 80W-85 ou ATF Dexron II, 750 mL, troca a cada 5 sessões.',
  },
  {
    severity: 'WARN',
    title: 'Potência concentrada em banda estreita (power band) — motor "morto" abaixo de 8.000 rpm, "explode" acima disso; piloto não familiarizado com 2 tempos pode ser surpreendido',
    body: 'A curva de potência do CR125R é extremamente agressiva: abaixo de 7.500 rpm, parece uma moto fraca. Acima de 8.000 rpm: entrega os 36 cv de golpe. Piloto de 4 tempos que vai pela primeira vez num CR: manter as marchas BAIXAS e rotação ALTA nas curvas — não atrás de "encher" a rotação como num motor 4 tempos. Técnica de saída: embreagem soltando no pico de torque (9.000-10.000 rpm). Válvula ATAC ajuda a alargar a banda mas não elimina o caráter 2 tempos.',
  },
  {
    severity: 'OK',
    title: 'Pneus 80/100-21 (F) · 100/90-19 (R) — pneus de competição MX (Dunlop MX3S, Bridgestone M403/404); nunca reutilizar pneu rasgado de lado',
    body: 'Pneus do CR125R: 80/100-21 (F) · 100/90-19 (R). Pressão de motocross: 10-13 PSI F e R (muito baixo intencionalmente para máximo contato). Em trilha de pedra: 15 PSI. Pneus de MX são projetados para durar 1-3 corridas no limite — em trilha recreativa, duram 15-30 horas. Nunca reutilizar pneu com rasgo na lateral (banda de rodagem desgastada ainda dá tração mas flanco rasgado pode explodir). Câmara: sempre trocar a câmara ao trocar o pneu — câmaras velhas rompem dentro.',
  },
]

const CR125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Top-end a cada 25 horas em competição — ignorar este intervalo = pistão desgasta, anel gripa no cilindro, biela dobra; custo do descuido: R$800-2.000',
    body: 'A regra de ouro do CR125R: top-end (pistão + anel) a cada 25 horas de corrida. Em trilha recreativa: 35-40 horas. Sintoma de pistão desgastado: fumaça azul na saída do escapamento (óleo queimando), leve perda de potência no power band. Medição da folga pistão-cilindro: deve ser 0,040-0,050 mm. Acima de 0,065 mm: trocar. Kit pistão Wiseco (R$250-400). Sempre replating ou troca do cilindro ao trocar o pistão — liners de ferro fundido riscan com o pistão desgastado.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem escorregando em competição — discos de fibra e aço desgastam com uso intenso; sinais: rpm sobem mas velocidade não acompanha em acelerações',
    body: 'Discos de embreagem do CR125R: 6 discos de fibra + 7 discos de aço. Sinais de desgaste: embreagem começa a escorregar quando o motor entra na power band. Medição: espessura do disco de fibra mínima 2,8 mm (novo: 3,0 mm). Conjunto de discos: Hinson ou Pro Circuit (R$300-500) ou Honda original (R$200-350). Óleo de câmbio impacta a embreagem: oil certo = embreagem com acionamento preciso; óleo de 4 tempos (MA2) no lugar do gear oil = embreagem com deslize excessivo.',
  },
  {
    severity: 'WARN',
    title: 'Rolamento de roda traseira desgasta rapidamente em uso competitivo — verificar play axial a cada 20 horas; rolamento SKF CR série CR125 disponível',
    body: 'Pista de motocross exige mudanças rápidas de direção → carga lateral nos rolamentos de roda. Inspeção: com a roda no ar, testar o play lateral (deve ser zero). Play perceptível = rolamento desgastado. Rolamentos: SKF 6201 2RS (roda dianteira) e 6202 2RS (traseira). Troca: a cada 30-40 horas de competição (preventiva) ou ao detectar play. Sempre usar rolamentos de qualidade (SKF, NSK, Timken) — rolamentos genéricos chineses chegam ao fim em 5-10 horas.',
  },
]

// ─── CR 250 ───────────────────────────────────────────────────────────────────

const CR250_MACETES: TipInput[] = [
  ...CR_MACETES_COMUNS,
  {
    severity: 'OK',
    title: 'CR250R: motor 250cc líquido, ~70 cv — uma das motos mais velozes de motocross da era; 5 marchas + embreagem manual; peso 95 kg; exige experiência de piloto',
    body: 'O CR250R (última versão 2007) é uma das lendas do motocross: motor 250cc de 70 cv, a peso ultra-baixo de 95 kg (seco). Relação potência/peso: ~0,74 cv/kg — mais que superbikes das décadas anteriores. Câmbio de 5 marchas. Embreagem de alavanca com assistência hidráulica (última geração). Pneus: 80/100-21 (F) · 110/90-19 (R). Câmbio: 900 mL Honda HP Gear Oil. A CR250R NÃO é moto para iniciante — piloto sem experiência em 2 tempos de competição pode perder o controle facilmente.',
  },
  {
    severity: 'OK',
    title: 'Jateamento do carburador crítico para altitude — jato principal #172 na altitude zero; subindo cada 500 m requer redução de ~2-3 pontos no jato',
    body: 'O carburador Keihin da CR250R (34-38mm dependendo do ano) é extremamente sensível à altitude. Jato principal de fábrica: ~#172 para altitude zero (litoral). Acima de 500 m: #170. Acima de 1.000 m (Belo Horizonte, Brasília): #165-167. Acima de 1.500 m (Serra Gaúcha, Campos do Jordão): #162. Jato errado = motor perde potência significativa (muito rico) ou risca o pistão (muito pobre). Kit de jatos deve acompanhar a moto em competições em altitudes variadas.',
  },
  {
    severity: 'WARN',
    title: 'CR250R de competição em trilha de lazer — manutenção MUITO mais frequente que esperado; motor produz o dobro do desgaste em trilha vs percurso de MX',
    body: 'Em trilha de lazer (velocidades variadas, sobe/desce, lama): a CR250R demanda top-end a cada 20-25 horas (mais frequente que os 30-40h de trilha da CR125 por ser motor maior com mais calor). O motor 250cc 2T em trilha "tenta" constantemente porque o piloto usa faixa de rotação mais ampla que em MX (onde o motor fica muito no power band). Resultado: pistão trabalha em temperaturas muito variáveis → desgaste de anel mais rápido. Solução: usar óleo sintético premium e fazer análise do óleo do câmbio a cada 3-4 sessões.',
  },
  {
    severity: 'OK',
    title: 'Suspensão Showa 49mm (F) + monoamortecedor com linkagem — ajuste profissional recomendado; setup de fábrica é para piloto de 70-80 kg em solo americano de MX',
    body: 'A CR250R tem bengala Showa 49mm com ajustes internos de compressão (clique superior) e extensão (clique inferior). Amortecedor traseiro com linkagem progressiva. Setup de fábrica: piloto 70-80 kg em pista de MX americana (terra solta e rápida). Para piloto brasileiro mais pesado (85-95 kg) em trilha: aumentar a dureza das molas ou usar molas progressivas (Eibach, Racetech). Setup errado = moto "afunda" nas depressões e amortece de forma dura nos saltos. Um setup de suspensão profissional custa R$300-600 mas economiza muita energia e aumenta a segurança.',
  },
]

const CR250_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Detonação (pinging) por octanagem insuficiente — CR250R de competição EXIGE gasolina de alta octanagem (100 octanos ou Aviation Fuel em competição)',
    body: 'O motor altamente comprimido da CR250R é sensível à octanagem. Gasolina comum (87-91 octanas) em motor ajustado para competição = detonação → dano rápido ao pistão e cilindro. Em uso recreativo: gasolina Aditivada (Petrobrás/Ipiranga Aditivada) ou Podium funciona. Em competição com ajuste fino de carburador: mistura de gasolina Podium + aditivo de octanagem (Torco Accelerator) ou combustível de aviação (avgas 100LL, disponível em aeroclubes). Detonação sob carga = pistão fura em minutos.',
  },
  {
    severity: 'WARN',
    title: 'Bearings de virabrequim com vida limitada em alta potência — inspecionar a cada 80 horas; rod bearing frouxo gera vibração e culmina em quebra catastrófica',
    body: 'O virabrequim da CR250R opera em rotações que destroem rolamentos de qualidade inferior rapidamente. Inspeção do rolamento de biela (con rod bearing): a cada 80 horas. Sintoma de desgaste: vibração anormal em alta rotação (não confundir com vibração normal de 2 tempos). Rod bearing frouxo detectado tardiamente = biela quebra e perfura o cárter. Reconstrução do fundo do motor: R$600-1.200 em peças (biela + rolamentos + vedações + virabrequim equilibrado). Melhor fazer preventivamente do que corretivo.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio "pulando" marcha em acelerações fortes — garfo seletora desgastado ou mola de retenção fraca; comum após 100+ horas em CR250R de competição',
    body: 'Em alta potência (saídas de curva, acelerações intensas) o câmbio da CR250R pode pular para o ponto morto ou marcha superior. Causa: garfo seletor com desgaste na aba de encaixe ou mola de retenção fraca (detent ball spring). Reparo: desmontagem da caixa de câmbio (junto com fundo do motor se necessário). Peças: Honda original ou aftermarket de qualidade (Pro Circuit, Rekluse). Custo: R$300-800 em peças + mão de obra de mecânico especializado em 2 tempos.',
  },
]

// ─── Tire Pressures ──────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'CR 80',
    yearFrom: 1980, yearTo: 2002,
    tireSize: '60/100-14 (F) · 80/100-12 (R)',
    frontPsi: 12, rearPsi: 12, frontPsiLoad: 14, rearPsiLoad: 14,
    notes: 'Pneus de competição miniMX. Pista de MX: 10-12 PSI. Nunca abaixo de 8 PSI. Câmara de ar obrigatória (não tubeless).',
  },
  {
    modelName: 'CR 125',
    yearFrom: 1973, yearTo: 2007,
    tireSize: '80/100-21 (F) · 100/90-19 (R)',
    frontPsi: 12, rearPsi: 13, frontPsiLoad: 15, rearPsiLoad: 15,
    notes: 'Pneus MX (Dunlop MX3S, Bridgestone M403). Pista de MX: 10-12 PSI. Terra dura/pedra: 14-16 PSI. Câmara de ar obrigatória.',
  },
  {
    modelName: 'CR 250',
    yearFrom: 1973, yearTo: 2007,
    tireSize: '80/100-21 (F) · 110/90-19 (R)',
    frontPsi: 12, rearPsi: 13, frontPsiLoad: 15, rearPsiLoad: 15,
    notes: 'Pista MX: 10-12 PSI. Trilha com pedra: 15-18 PSI. Câmara de ar obrigatória. Traseiro 110/90-19 para mais tração (volume maior).',
  },
]

// ─── Manutenção ──────────────────────────────────────────────────────────────

const makeCR = (m: string, yf: number, yt: number, gearOilMl: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: `Óleo do câmbio (Honda HP Gear Oil 80W-85 ou ATF) — ${gearOilMl} mL`, intervalKm: null, intervalMonths: null, notes: `${gearOilMl} mL. Trocar a cada 5 sessões (~10-15 horas). Óleo de câmbio escuro com partículas metálicas = inspecionar rolamentos.`, priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Top-end: pistão + anel + verificação do cilindro', intervalKm: null, intervalMonths: null, notes: 'A cada 30-40 horas recreativo; 20-25 horas competição. Medir folga pistão-cilindro: máx 0,065 mm. Cilindro desgastado: replating. Wiseco ou Vertex.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Válvula de exaustão (ATAC/Power Valve) — limpeza', intervalKm: null, intervalMonths: null, notes: 'A cada 20-25 horas. Depósito de carbono trava a válvula. Spray solvente + escova de latão. Mola: substituir ao montar se com deformação.', priority: 'CRITICAL', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela específica 2 tempos (NGK BR8ES / BR9ES)', intervalKm: null, intervalMonths: null, notes: 'A cada 10-15 horas. NUNCA usar vela de 4 tempos. Leitura: marrom clara OK; preta oleosa = premix rico; branca = pobre (gripagem iminente).', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fundo do motor: rolamento virabrequim + rolamento biela', intervalKm: null, intervalMonths: null, notes: 'A cada 80-100 horas. Vibração anormal em alta rotação = rolamento desgastando. Custo: R$600-1.200 em peças. Virabrequim equilibrar dinamicamente.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — limpeza e relubricação', intervalKm: null, intervalMonths: null, notes: 'A cada sessão (1-2 horas). Espuma + óleo de filtro. Filtro com barro seco = motor aspira partículas abrasivas → risco de gripagem.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente — lubrificação e tensão', intervalKm: null, intervalMonths: null, notes: 'Antes de cada saída. Corrente específica de MX (428 ou 520 dependendo do modelo). DID MX72 ou RK MXZ4 (corrente aberta, sem o-ring, mais leve para MX).', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas e fluido de freio (freio disco F e R)', intervalKm: null, intervalMonths: 12, notes: 'A cada 20-30 horas de uso. Pista de MX desgasta rapidamente. Pastilhas EBC MX ou Galfer. Fluido DOT 4 anualmente ou ao perceber fading.', priority: 'HIGH', order: 8 },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeCR('CR 80',  1980, 2002, 650),
  ...makeCR('CR 125', 1973, 2007, 750),
  ...makeCR('CR 250', 1973, 2007, 900),
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'CR 80',  yearFrom: 1980, yearTo: 2002, MACETES: CR80_MACETES,  PROBLEMAS: CR80_PROBLEMAS  },
  { modelName: 'CR 125', yearFrom: 1973, yearTo: 2007, MACETES: CR125_MACETES, PROBLEMAS: CR125_PROBLEMAS },
  { modelName: 'CR 250', yearFrom: 1973, yearTo: 2007, MACETES: CR250_MACETES, PROBLEMAS: CR250_PROBLEMAS },
]

// ─── Runner ───────────────────────────────────────────────────────────────────

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({ where: { name: 'Honda', vehicleTypeId: motoType.id } })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map(t  => ({ ...t, category: 'MACETES'   as Cat })),
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
    console.log(`✅ ${block.modelName}: ${allTips.length} tips (${block.MACETES.length} macetes + ${block.PROBLEMAS.length} problemas)`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map(b => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: ALL_MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${ALL_MANUTENCAO.length} itens`)

  const totalTips = BLOCKS.reduce((s, b) => s + b.MACETES.length + b.PROBLEMAS.length, 0)
  console.log(`\n✅ Honda CR Series seed concluído! ${BLOCKS.length} modelos, ${totalTips} tips, ${TIRE_PRESSURES.length} calibragens, ${ALL_MANUTENCAO.length} itens de manutenção`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
