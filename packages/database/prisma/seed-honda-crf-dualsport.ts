// seed-honda-crf-dualsport.ts — Honda CRF 250L (2013+) + CRF 300F (2021+)
// CRF 250L: dual-sport street-legal, 249cc DOHC liquid-cooled (derivado CBR 250R)
// CRF 300F: trail urbana, 293cc SOHC air-cooled PGM-FI (sucessor da CRF 250F no Brasil)
// 250L: uso misto asfalto/trilha, plaqueta CONAMA, documentável; 300F: uso off-road com maior motor
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

// ─── CRF 250L (2013+) — dual-sport documentável ──────────────────────────────

const CRF250L_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 249cc DOHC liquid-cooled (derivado do CBR 250R) — óleo 10W-30 JASO MA2, 1,5 L com filtro; troca a cada 5.000 km ou 6 meses; folga de válvulas IN 0,16 mm / EX 0,25 mm',
    body: 'A CRF 250L usa o motor 249cc DOHC (biárbol) derivado do CBR 250R: 4 válvulas, refrigerado a líquido, injeção PGM-FI, 24 cv. Diferença do motor CBR: cams e compressão ligeiramente diferentes para mais torque em baixas rotações (melhor para off-road em baixa marcha). Óleo: 10W-30 JASO MA2 (embreagem úmida), 1,5 L com filtro novo. Folga de válvulas: IN 0,16 ±0,03 mm / EX 0,25 ±0,03 mm com motor COMPLETAMENTE frio. Intervalo de inspeção: 12.000 km ou 24 meses — motor DOHC com baixo estresse tem vida de válvulas muito mais longa que CRF de competição. Vela: NGK CR8EH-9, gap 0,8 mm.',
  },
  {
    severity: 'OK',
    title: 'Pneu: 80/90-21 (F) · 120/80-18 (R) — pressão para asfalto 29/33 PSI; off-road 20/22 PSI; pneu de série é misto (enduro road-biased) — não pneu MX puro',
    body: 'A CRF 250L vem com pneus de uso misto (mais focado em asfalto que em terra). Pressão de fábrica para asfalto: dianteiro 200 kPa (29 PSI) / traseiro 225 kPa (33 PSI). Para off-road (trilha, terra): reduzir para 20-22 PSI F e R (melhora conformação e tração sem risco de furo com as dimensões menores). Pneus mais populares para uso misto: Michelin Anakee Wild 90/90-21 F + 120/80-18 R (melhor equilíbrio), Pirelli MT 21 Rallycross, TKC 80 (mais off-road, menos asfalto). Para uso predominante de asfalto: Dunlop D606 ou Shinko 705 (silicagem em chuva).',
  },
  {
    severity: 'OK',
    title: 'Corrente 520: lubrificar a cada 500 km (asfalto) ou após cada saída off-road; folga ideal 20-25 mm; kit completo a cada 20.000-25.000 km',
    body: 'A CRF 250L usa corrente 520 (menor que a 525 da Africa Twin). Lubrificação: spray de corrente com o-ring (Motul, WD-40 Motorcycle Chain Lube) a cada 500-700 km em asfalto; após cada saída em terra/lama (a lama arranca o lubrificante). Folga: 20-25 mm no ponto mais tenso da corrente. Inspeção de desgaste: com pé-de-cabra, puxar o ponto médio do lado de saída da corrente do pinhão traseiro — se sair mais de 1/3 do dente: corrente estourada, trocar. Kit completo: DID 520VX3 ou EK 520SR-O2 (corrente) + coroa + pinhão. Nunca trocar só a corrente sem os sprockets — desgaste irregular e vida muito mais curta.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de papel/espuma: limpar a cada 6.000 km (asfalto) ou a cada 1.500-2.000 km em uso off-road com terra; nunca rodar sem filtro',
    body: 'A CRF 250L tem filtro de ar espuma (não papel como a maioria das motos de rua). Procedimento de limpeza: lavar com sabão neutro + água morna, secar ao ar, impregar com óleo de filtro (leve). Troca do filtro: a cada 12.000 km (asfalto) ou quando com rasgos, furos ou deterioração da espuma. Em uso off-road intenso com poeira: limpar a cada 1.500-2.000 km — poeira fina de trilha passa rapidamente por espuma velha ou suja. K&N HA-6803 (se disponível para CRF 250L) — lavável mas com filtragem menor que OEM em uso de terra real. Twin Air: melhor opção aftermarket para uso misto real.',
  },
  {
    severity: 'OK',
    title: 'Posição de pilotagem: banco de 875 mm (alto para brasileiros de baixa estatura) — banco rebaixado Honda oficial -20 mm disponível; técnica de curva em pé para off-road',
    body: 'A CRF 250L tem banco a 875 mm — um dos mais altos no segmento dual-sport brasileiro. Para pilotos com menos de 1,72 m: apenas a ponta de um pé toca o chão. Opções: (1) Banco rebaixado Honda oficial: -20 mm (consultar concessionária). (2) Rebaixamento de suspensão: kits de links aftermarket baixam 25-30 mm mas reduzem clearance off-road. (3) Botas de aventura com sola alta: ganho de 20-25 mm. (4) Aceitar a altura e adaptar técnica (moto equilibrada para pilotos que dominam a posição em pé). Técnica off-road em pé: joelhos levemente dobrados, centro de gravidade baixo, guidão empurrado para baixo em curvas.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas CRF 250L: biela e pistão ProX, filtro Twin Air, rolamentos All Balls — disponibilidade boa no Brasil via importadores de peças de enduro',
    body: 'A CRF 250L tem bom suporte aftermarket no Brasil por ser uma moto de trilha popular com placa. Peças alternativas de custo-benefício: Pistão ProX 77mm — R$250-400 (importado, vs Honda R$700-1.000). Filtro de óleo Hiflofiltro HF153RC — R$20-35 (compatível, muito mais barato que Honda). Kit de retentores bengala de 41mm (Ariete ou ProX) — R$60-100. Corrente DID 520VX3 — R$170-250 (vs Honda R$380-550). Rolamentos All Balls Wheel Bearing Kit — R$180-280 para frente + trás. Onde comprar: BrazilPartes, Importadora JB Motos, TDC Motos (frete para todo Brasil).',
  },
]

const CRF250L_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bengala de 41mm telescópica convencional (não invertida): rigidez insuficiente para off-road pesado — considerar amortecedor traseiro e bengala mais rígidos para uso intenso',
    body: 'A CRF 250L foi configurada com suspensão de compromisso (asfalto + trilha leve): bengala dianteira 41mm convencional e amortecedor traseiro com linkage simples. Para uso predominante off-road em trilha mais técnica: a suspensão padrão "mergulha" demais em frenagem e comprime na base em impactos. Ajuste fácil (sem custo): bengala — aumentar pré-carga com O-rings adicionais na mola; amortecedor — ajustar anel de pré-carga para posição mais firme. Upgrade para uso sério off-road: amortecedor Ohlins ou YSS (R$600-1.200), bengala Race-Tech Gold Valve (R$400-600). Para uso de asfalto: suspensão padrão é adequada.',
  },
  {
    severity: 'WARN',
    title: 'Potência limitada (24 cv) frustra em asfalto acima de 100 km/h — a CRF 250L não é moto de estrada; peso de 145 kg torna o motor suficiente apenas para uso misto',
    body: 'A CRF 250L foi projetada para uso misto, não para viagens de estrada rápidas. Na velocidade de cruzeiro de rodovias (100-120 km/h): motor opera próximo do limite, consumo sobe para 22-24 km/L, vibração aumenta. Para pilotos que querem fazer estradas longas + off-road: considerar NX 500, CB 500X ou Africa Twin (mais adequadas para ambos). A CRF 250L brilha em uso real misto: cidade + trilha no mesmo dia, travessias de terra, aventuras de fim de semana com acesso difícil. Limitar estrada a 90-100 km/h para conforto e consumo ideal (28-32 km/L).',
  },
  {
    severity: 'DANGER',
    title: 'Líquido de arrefecimento: verificar nível mensalmente — motor DOHC liquid-cooled tem radiador compacto; qualquer vazamento em trilha causa superaquecimento rápido',
    body: 'O motor DOHC da CRF 250L é refrigerado a líquido com radiador compacto (menor que o de motos de alta performance). Qualquer vazamento de líquido em uso off-road causa superaquecimento acelerado — sem reservatório de expansão grande. Verificação mensal: nível entre MIN e MAX no reservatório de expansão (tanque transparente ao lado do radiador). Troca do líquido: a cada 2 anos / 24.000 km. Anticongelante Honda ou equivalente OAT (Organic Acid Technology) diluído 50/50 em água destilada. NUNCA água pura — corrói internamente o bloco de alumínio. Carregar 200 mL de anticongelante diluído em trilhas longas como reserva.',
  },
  {
    severity: 'WARN',
    title: 'Fraqueza conhecida: suporte de placa/farol traseiro em uso off-road — quebra por vibração e impacto; reforçar com suporte aftermarket antes de saída de trilha pesada',
    body: 'A CRF 250L tem suporte de placa/farol traseiro plástico de série que quebra facilmente em trilha com impactos ou quedas laterais. O suporte de alumínio aftermarket (Moose Racing, UFO, ou fabricação local) elimina o problema. Custo: R$150-350. Antes de primeira trilha pesada: substituir ou reforçar. Luz traseira: LED de série na 250L (geração 2021+) — mais resistente. Na geração 2013-2020: bulbo de filamento solta o contato em vibração intensa. Upgrade LED traseiro: R$60-120 e elimina o problema definitivamente. Também considerar guard de motor de alumínio (R$200-400) para proteger o carter em trilha com pedras.',
  },
]

// ─── CRF 300F (2021+) — trail/enduro urbano 293cc ────────────────────────────

const CRF300F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 293cc SOHC air-cooled PGM-FI (evolução do CRF 250F) — óleo 10W-30 JASO MA, 1,5 L com filtro; folga IN 0,10 mm / EX 0,15 mm; troca a cada 3.000-4.000 km (trilha)',
    body: 'A CRF 300F é o sucessor da CRF 250F no Brasil com motor 43cc maior (293cc vs 249cc). Motor SOHC de 2 válvulas, refrigerado a ar, injeção PGM-FI. Folga de válvulas: IN 0,10 ±0,03 mm / EX 0,15 ±0,03 mm com motor FRIO (mesma spec da CRF 250F — ajuste por calços/shims, não parafuso). Óleo: 10W-30 JASO MA (embreagem úmida — NUNCA JASO MB), 1,5 L com filtro. Intervalo: 3.000 km em trilha pesada / 4.000 km em uso misto. Vela: NGK LMAR7H-9DS (específica para motores de trilha de alta compressão — mesma da CRF 250F). Torque da vela: 14 N.m. Ganho de potência vs 250F: ~20% de torque adicional em baixo giro — percepção de "mais gás" imediato em subidas.',
  },
  {
    severity: 'OK',
    title: 'PGM-FI na CRF 300F: sem ajuste de carburador como na CRF 230F — sistema auto-adaptativo para altitude e temperatura; pré-aquecimento de 60 s antes de sair em dia frio',
    body: 'A CRF 300F tem injeção eletrônica PGM-FI com sensor de oxigênio (lambda). Vantagem sobre a CRF 230F carburada: não precisa ajustar jatos para altitude ou temperatura — a ECU calibra automaticamente. Em altitudes acima de 1.500 m (Serra Gaúcha, Minas Gerais, Chapada Diamantina): a 300F mantém desempenho constante; a 230F carburada perderia 8-15% de potência sem jetting manual. Partida a frio: aguardar 60 s em marcha lenta para aquecimento do motor e estabilização da ECU. Luz FI (laranja no painel): se permanecer acesa (não piscando): código de falha — ligar/desligar a ignição 3x para ler código pelo piscar da luz; código 2 = sensor de O2; código 1 = sensor de pressão.',
  },
  {
    severity: 'OK',
    title: 'Pneu: 80/100-21 (F) · 100/100-18 (R) — mesmas dimensões da CRF 250F; calibrar 13-15 PSI em trilha; em asfalto até 20 PSI; pneus NHS de série',
    body: 'A CRF 300F usa os mesmos tamanhos de pneu da CRF 250F. Pressão em trilha: dianteiro 13-15 PSI / traseiro 13-15 PSI (uso off-road geral). Em terreno de pedra dura: subir para 16-18 PSI (reduz risco de furo). Para transitar em asfalto entre sessões de trilha: elevar para 18-20 PSI — nunca rodar pneus NHS em asfalto a mais de 80 km/h e pressão baixa. Pneus mais vendidos para CRF 300F: Dunlop D739 (original), Pirelli MT 21 Rallycross (melhor durabilidade em asfalto), Michelin Enduro Medium (melhor aderência em terra mole). Câmara de borracha interna (tube type) — sempre carregar câmara reserva e kit de remendo em trilhas.',
  },
  {
    severity: 'OK',
    title: 'Corrente 420 (passo menor que os modelos de competição) — mais sensível ao desgaste; verificar folga (25-35 mm) antes de cada saída; não usar WD-40 puro como lubrificante',
    body: 'A CRF 300F usa corrente 420 — a mesma da CRF 250F. Passo 420 é mais fino que o 428 ou 520 de motos maiores: desgasta mais rápido sob carga. Folga correta: 25-35 mm no ponto mais tenso (moto com piloto sentado). Lubrificação: spray de corrente com o-ring a cada 500-700 km ou após qualquer saída em lama. WD-40 puro: apenas para lavar lama, não como lubrificante permanente. Kit de corrente 420: DID 420D (sem o-ring, para trilha de peso leve) ou EK 420SR (com o-ring, para uso misto). Coroa e pinhão: trocar juntos com a corrente — nunca só a corrente em desgaste. Troca: a cada 15.000-20.000 km de trilha (mais rápido que motos de rua).',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas CRF 300F: usa muitas peças em comum com CRF 250F (corrente, filtro, pneus) — diferenças: pistão 78mm (vs 73mm da 250F), vela igual',
    body: 'A CRF 300F compartilha muitos componentes com a CRF 250F. Intercambiáveis: corrente 420, pneus 80/100-21 F + 100/100-18 R, filtro de ar, filtro de óleo HF303, vela NGK LMAR7H-9DS, kit de corrente. Diferente: pistão 78mm (vs 73mm da CRF 250F — NÃO intercambiável), cabeçote (maior câmara de combustão), carburador inexistente (300F é injetada enquanto 250F antiga era carburada). Disponibilidade de peças: crescente no Brasil desde 2021 — concessionárias Honda já estocam. Pistão aftermarket: Wiseco 78mm STD (kit completo com anéis e pino) — R$400-600 importado.',
  },
]

const CRF300F_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Válvulas da CRF 300F: motor mais potente que o 250F = válvulas apertam ligeiramente mais rápido em uso de trilha intensa; verificar a cada 5.000 km (não 6.000 como o manual sugere)',
    body: 'Com o motor 293cc gerando mais potência que o 249cc da 250F, as válvulas sofrem mais carga térmica. Em uso de trilha intensa (motores em altas rotações em subidas): verificar folga a cada 5.000 km vs os 6.000 km do manual. Sintoma de válvula apertada: dificuldade de partida a frio progressiva; motor "trava" levemente ao dar o kick/partida; perda de potência gradual. Ajuste de calços (shims): requer ferramentas especiais e um mecânico com experiência em motores SOHC de trilha — serviço custa R$200-400 em mão de obra. Não tentar ajustar sem conhecimento — calço errado causa dano imediato na partida.',
  },
  {
    severity: 'WARN',
    title: 'IACV (Idle Air Control Valve) sujeito a entupimento em trilha com poeira fina — sintoma: marcha lenta oscilante ou motor apagando no neutro após trilha',
    body: 'O sistema PGM-FI da CRF 300F tem uma Válvula de Controle de Ar de Ralenti (IACV) que em uso intenso em regiões de pó fino pode entupir com partículas. Sintoma: motor oscila entre 700-1.400 rpm em marcha lenta após trilha em poeira; motor apaga no semáforo ao chegar na cidade depois da trilha; partida difícil a quente. Limpeza preventiva a cada 10.000 km (ou após trilha muito empoeirada): spray de limpeza de injeção (EFI Cleaner) na entrada da IACV (acesso sem desmontar o motor na maioria dos casos). IACV Honda original: R$250-450 se danificado. Prevenir: filtro de ar em bom estado e mantido impregnado reduz drasticamente a entrada de poeira.',
  },
  {
    severity: 'WARN',
    title: 'Protetor de motor e carenagem inferiores: ausentes de série na CRF 300F — trilha com pedras causa danos ao cárter rapidamente; guard de alumínio é acessório obrigatório',
    body: 'A CRF 300F não vem com protetor de motor de série (a Honda vende como acessório). Em trilha com pedras e corredeiras: o cárter de alumínio é vulnerável a impactos. Um único impacto em pedra pode criar fissura no cárter → vazamento de óleo → motor sem lubrificação em segundos. Guard de motor aftermarket (alumínio 3mm): Acerbis, Moose Racing, UFO ou produção nacional — R$180-350. Recomendação: instalar guard ANTES da primeira saída de trilha. Para trilha muito técnica (etapas com riachos): guard de motor waterproof também protege contra areia nas aberturas.',
  },
]

// ─── MANUTENÇÃO (schedule items) ─────────────────────────────────────────────

const CRF250L_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CRF 250L', yearFrom: 2013, yearTo: null, component: 'Óleo 10W-30 JASO MA2 + filtro HF153RC (1,5 L)', intervalKm: 5000, intervalMonths: 6, notes: 'Off-road intenso: 4.000 km. Filtro Hiflofiltro HF153RC (R$20-35) compatível e muito mais barato que Honda OEM.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CRF 250L', yearFrom: 2013, yearTo: null, component: 'Vela NGK CR8EH-9 — gap 0,8 mm', intervalKm: 8000, intervalMonths: 12, notes: 'Torque 10-12 N.m. Iridium CR8EHIX-9 dura até 16.000 km. Sempre levar reserva em trilhas.', priority: 'HIGH', order: 2 },
  { modelName: 'CRF 250L', yearFrom: 2013, yearTo: null, component: 'Filtro de ar espuma — limpeza', intervalKm: 3000, intervalMonths: 3, notes: 'Off-road/poeira: a cada 1.500-2.000 km. Lavar com sabão neutro, secar, impregnar levemente com óleo.', priority: 'HIGH', order: 3 },
  { modelName: 'CRF 250L', yearFrom: 2013, yearTo: null, component: 'Filtro de ar — troca', intervalKm: 12000, intervalMonths: 24, notes: 'Substituir se espuma rasgada, porosa ou sem elasticidade. Twin Air: melhor que OEM para uso misto.', priority: 'MEDIUM', order: 4 },
  { modelName: 'CRF 250L', yearFrom: 2013, yearTo: null, component: 'Corrente 520 — lubrificação e tensão (20-25 mm)', intervalKm: 500, intervalMonths: null, notes: 'Após cada saída off-road: lavar lama e relubrifar. DID 520VX3 para reposição.', priority: 'HIGH', order: 5 },
  { modelName: 'CRF 250L', yearFrom: 2013, yearTo: null, component: 'Kit corrente + coroa + pinhão', intervalKm: 22000, intervalMonths: null, notes: 'Off-road pesado: 15.000-18.000 km. Sempre trocar os três juntos. DID 520VX3 + coroa 44T + pinhão 14T.', priority: 'HIGH', order: 6 },
  { modelName: 'CRF 250L', yearFrom: 2013, yearTo: null, component: 'Válvulas DOHC (IN 0,16 / EX 0,25 mm) — inspeção', intervalKm: 12000, intervalMonths: 24, notes: 'Motor COMPLETAMENTE frio, PMS compressão. Ajuste por calços (shims). Custo em oficina: R$200-400.', priority: 'CRITICAL', order: 7 },
  { modelName: 'CRF 250L', yearFrom: 2013, yearTo: null, component: 'Fluido de freio DOT 4 — troca', intervalKm: null, intervalMonths: 24, notes: 'DOT 4 absorve umidade. Frear em descidas longas com freio velho causa fadiga do freio.', priority: 'HIGH', order: 8 },
  { modelName: 'CRF 250L', yearFrom: 2013, yearTo: null, component: 'Líquido de arrefecimento — inspeção e troca', intervalKm: 24000, intervalMonths: 24, notes: 'Honda Ultra-Cool ou OAT 50/50 em água destilada. Verificar nível mensalmente. NUNCA água pura.', priority: 'HIGH', order: 9 },
  { modelName: 'CRF 250L', yearFrom: 2013, yearTo: null, component: 'Pastilhas dianteiras + pastilha/lona traseira', intervalKm: 8000, intervalMonths: null, notes: 'Off-road com lama: 5.000-6.000 km. Disco dianteiro mín 3,0 mm. EBC SFA série para uso misto.', priority: 'HIGH', order: 10 },
  { modelName: 'CRF 250L', yearFrom: 2013, yearTo: null, component: 'Retentores de bengala 41mm — inspeção', intervalKm: 15000, intervalMonths: null, notes: 'Névoa oleosa na haste = troca. Off-road: verificar a cada 8.000-10.000 km. Ariete 41mm compatível.', priority: 'MEDIUM', order: 11 },
  { modelName: 'CRF 250L', yearFrom: 2013, yearTo: null, component: 'Rolamentos de roda — inspeção', intervalKm: 12000, intervalMonths: 12, notes: 'Uso off-road frequente: verificar a cada 8.000 km. All Balls kit completo F+R: R$180-280.', priority: 'MEDIUM', order: 12 },
]

const CRF300F_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CRF 300F', yearFrom: 2021, yearTo: null, component: 'Óleo 10W-30 JASO MA + filtro HF303 (1,5 L)', intervalKm: 3000, intervalMonths: 6, notes: 'Trilha pesada: 2.500-3.000 km. Filtro Hiflofiltro HF303 compatível. JASO MA obrigatório (embreagem úmida).', priority: 'CRITICAL', order: 1 },
  { modelName: 'CRF 300F', yearFrom: 2021, yearTo: null, component: 'Vela NGK LMAR7H-9DS — troca', intervalKm: 6000, intervalMonths: 12, notes: 'Torque 14 N.m. Gap 0,8 mm. Trilha intensa: 5.000 km. Vela específica — não substituir por vela comum.', priority: 'HIGH', order: 2 },
  { modelName: 'CRF 300F', yearFrom: 2021, yearTo: null, component: 'Filtro de ar espuma — limpeza e impregnação', intervalKm: 3000, intervalMonths: 3, notes: 'Poeira/trilha árida: cada 1.500 km. Lavar, secar completamente, óleo de filtro nas bordas. Nunca usar molhado.', priority: 'HIGH', order: 3 },
  { modelName: 'CRF 300F', yearFrom: 2021, yearTo: null, component: 'Filtro de ar — troca', intervalKm: 12000, intervalMonths: 24, notes: 'Twin Air ou OEM. Substituir se espuma sem elasticidade ou com furos.', priority: 'MEDIUM', order: 4 },
  { modelName: 'CRF 300F', yearFrom: 2021, yearTo: null, component: 'Corrente 420 — lubrificação e tensão (25-35 mm)', intervalKm: 400, intervalMonths: null, notes: 'Trilha: antes de cada saída. Folga máx 35 mm (risco de pular do pinhão). Lavar lama antes de lubrifcar.', priority: 'HIGH', order: 5 },
  { modelName: 'CRF 300F', yearFrom: 2021, yearTo: null, component: 'Kit corrente 420 + coroa + pinhão', intervalKm: 18000, intervalMonths: null, notes: 'Trilha intensa: 12.000-15.000 km. DID 420D ou EK 420SR. Coroa e pinhão sempre junto com corrente.', priority: 'HIGH', order: 6 },
  { modelName: 'CRF 300F', yearFrom: 2021, yearTo: null, component: 'Válvulas SOHC (IN 0,10 / EX 0,15 mm) — inspeção', intervalKm: 5000, intervalMonths: null, notes: 'Trilha intensa: 5.000 km (mais frequente que manual). Motor FRIO. Ajuste por calços. Officina especializada.', priority: 'CRITICAL', order: 7 },
  { modelName: 'CRF 300F', yearFrom: 2021, yearTo: null, component: 'Fluido de freio DOT 4 — troca (F + R)', intervalKm: null, intervalMonths: 24, notes: 'Sistema CBS. Purge completo. DOT 4 — nunca DOT 3 ou DOT 5.', priority: 'HIGH', order: 8 },
  { modelName: 'CRF 300F', yearFrom: 2021, yearTo: null, component: 'Pastilhas dianteiras + lona/pastilha traseira', intervalKm: 5000, intervalMonths: null, notes: 'Trilha com lama: 3.000-4.000 km. CRF 300F tem freio traseiro a tambor — lona Fras-le ou Honda.', priority: 'HIGH', order: 9 },
  { modelName: 'CRF 300F', yearFrom: 2021, yearTo: null, component: 'IACV — limpeza', intervalKm: 10000, intervalMonths: null, notes: 'Uso em região poeirenta: 7.000-8.000 km. Spray EFI Cleaner na entrada. Sintoma: marcha lenta oscilante após trilha.', priority: 'MEDIUM', order: 10 },
  { modelName: 'CRF 300F', yearFrom: 2021, yearTo: null, component: 'Retentores de bengala 37mm — inspeção', intervalKm: 15000, intervalMonths: null, notes: 'Bengala de 37mm (não invertida). Off-road intenso: verificar cada 8.000 km. Ariete 37mm compatível.', priority: 'MEDIUM', order: 11 },
]

// ─── Calibragens ──────────────────────────────────────────────────────────────

const tirePressures = [
  {
    modelName: 'CRF 250L', yearFrom: 2013, yearTo: null,
    tireSize: '80/90-21 (F) · 120/80-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    sparePsi: null,
    notes: 'Asfalto: F 29 / R 33 PSI. Off-road: F 20 / R 22 PSI. Com garupa: R 36 PSI. Pneus misto — não usar abaixo de 18 PSI em asfalto.',
  },
  {
    modelName: 'CRF 300F', yearFrom: 2021, yearTo: null,
    tireSize: '80/100-21 (F) · 100/100-18 (R)',
    frontPsi: 14, rearPsi: 15, frontPsiLoad: 16, rearPsiLoad: 17,
    sparePsi: null,
    notes: 'Trilha geral: F 13-15 / R 13-15 PSI. Pedra dura: 16-18 PSI. Asfalto (transição): 18-20 PSI. Pneu NHS — não exceder 80 km/h em asfalto.',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
  console.log('🏍️ Seed Honda CRF dual-sport (CRF 250L + CRF 300F)...')

  await upsertModel('CRF 250L')
  await upsertTips('CRF 250L', 'MACETES', CRF250L_MACETES)
  await upsertTips('CRF 250L', 'PROBLEMAS', CRF250L_PROBLEMAS)
  await upsertMaintenance(CRF250L_MANUTENCAO)
  console.log('✅ CRF 250L')

  await upsertModel('CRF 300F')
  await upsertTips('CRF 300F', 'MACETES', CRF300F_MACETES)
  await upsertTips('CRF 300F', 'PROBLEMAS', CRF300F_PROBLEMAS)
  await upsertMaintenance(CRF300F_MANUTENCAO)
  console.log('✅ CRF 300F')

  for (const tp of tirePressures) {
    await upsertTirePressure(tp)
  }
  console.log('✅ Calibragens CRF dual-sport')

  const tipCount = await prisma.tip.count({ where: { modelName: { in: ['CRF 250L', 'CRF 300F'] } } })
  console.log(`\n📊 ${tipCount} dicas inseridas para CRF dual-sport`)
  console.log('✅ Seed concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
