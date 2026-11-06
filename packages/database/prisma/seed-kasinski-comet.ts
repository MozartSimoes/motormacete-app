// seed-kasinski-comet.ts — Kasinski Comet 150, Comet 250cc/GT/GTR e Comet GT 650/650R V2power
// Kasinski encerrou atividades ~2016. Modelos 250/650cc: base Hyosung GT250/GT650.
// Modelos 150cc: motor chinês genérico 149cc OHC monocilíndrico.
// Execute: pnpm --filter @motormacete/database db:seed:kasinski-comet
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

// ─── COMET 150 ───────────────────────────────────────────────────────────────
// Motor: 149cc OHC monocilíndrico a ar | 12,9 cv @ 8.000 rpm | torque 1,24 kgf.m @ 6.000 rpm
// Carburador PZ26/PZ27 | Óleo 20W-50 JASO MA 1,0L | Vela D8EA gap 0,6–0,7mm
// Pneu: 2.75/18 (F) / 90/90-18 (R) | Corrente 428H × 128 | Tanque 13L

const COMET150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — 1,0L na troca; cada 3.000 km é o máximo',
    body: 'Motor 149cc chinês OHC de partilha de óleo com a embreagem úmida (JASO MA obrigatório). Capacidade: 1,0L. Use 20W-50 mineral — é o viscosidade projetada para tolerâncias mais largas do motor. NUNCA 10W-40 fino, pode vazar pela junta do cabeçote. Marcas OK: Lubrax Moto 4T 20W-50, Shell Advance 4T 20W-50. Troca a cada 3.000 km ou 6 meses — o motor esquenta mais que japoneses pela menor qualidade dos metais.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ26: boia entupida = marcha lenta desregulada',
    body: 'O carburador PZ26 da Comet 150 é sensível a etanol degradado (verniz). Sintomas: marcha lenta que sobe e não estabiliza, afogamento na largada fria, corte no meio-giro. Limpeza: jatos com valetador WD-40 Injetor ou spray carburador Bardahl — o jato principal é 105 (marcado no corpo do jet). Nível da boia: 21mm da face do corpo do carburador. Se a agulha da boia não veda bem, substituir por agulha genérica 150cc — custa R$ 10–20.',
  },
  {
    severity: 'OK',
    title: 'Vela D8EA (NGK) gap 0,6–0,7mm — troca a cada 8.000 km',
    body: 'A Comet 150 usa vela NGK D8EA (equivalentes: Denso U24ES, Champion RN4C). Gap: 0,6–0,7mm — apertado para motores de motor chinês. Use calibrador de palheta, não de roda. Custo: R$ 15–25. Sintoma de vela gasta: dificuldade na partida a frio, engasgo leve sob carga, consumo aumenta ~10%. Não deixe passar de 10.000 km. Iridium NGK D8EIX: dura 20.000 km (~R$ 55) — bom upgrade.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428H × 128 — lubrifique a cada 500 km ou após chuva',
    body: 'A corrente original tem qualidade básica. Lubrificação a cada 500 km dobra a vida útil (de ~12.000 para 20.000+ km). Use spray de corrente, óleo 80W-90 ou até óleo de motor usado (na falta de spray). Folga correta: 20–30mm na parte inferior da corrente. Kit de relação completo (corrente + pinhão 14T + coroa 40T): R$ 80–180 em distribuidoras de peças para motos chinesas.',
  },
  {
    severity: 'WARN',
    title: 'Peças Kasinski escassas — use compatíveis com motor genérico 150cc chinês',
    body: 'A Kasinski encerrou operações no Brasil por volta de 2016. Peças originais são encontradas apenas em desmontes (Mercado Livre). A boa notícia: o motor 149cc da Comet 150 é derivado do motor genérico chinês usado por dezenas de marcas (Shineray, Sundown, pop 100 derivados). Peças que servem: pistão 62mm × 49,5mm STD, anéis de pistão (busca por "anel motor 150cc 62mm"), biela (medida igual à Shineray 150cc). Procure em lojas de motos importadas ou distribuidoras de peças chinesas.',
  },
  {
    severity: 'OK',
    title: 'Rodagem: primeiros 1.000 km não passe de 6.000 rpm',
    body: 'O motor da Comet 150 tem tolerâncias maiores que japonesas — a rodagem é mais crítica. Nos primeiros 1.000 km: máximo 6.000 rpm (de 8.000 rpm do motor). Troque o óleo nas primeiras 500 km com motor morno (20W-50, 1,0L). Na revisão de 1.000 km: troque o óleo novamente e aperte os parafusos do cabeçote com torque (14–16 Nm em padrão cruzado) — eles soltam durante a rodagem e podem causar vazamento.',
  },
]

const COMET150_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Kasinski encerrou: peças elétricas (CDI, retificador) são difíceis de encontrar',
    body: 'O CDI e o retificador/regulador da Comet 150 são peças com código Kasinski que não têm mais fabricação. Se o CDI falhar (sintoma: moto não pega, sem faísca), busque por CDI genérico de 6 pinos para motos 150cc chinesas — muitos são compatíveis por pinagem. Retificador: busca por "retificador regulador 150cc 3 pinos DC" — custo R$ 35–80. Leve a uma oficina que trabalha com motos chinesas para verificar a pinagem antes da compra. Grupos no Facebook "Kasinski Brasil" costumam ter indicações.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor do eixo primário: problema crônico acima de 20.000 km',
    body: 'Após 20.000–25.000 km, o retentor do eixo primário da transmissão começa a vazar óleo para o exterior da caixa de câmbio. Sintoma: mancha de óleo no centro-baixo do motor, corrente suja de óleo excessivamente. Solução: retentor genérico de mesma medida (medida marcada no retentor antigo — tipicamente 20×32×7mm). Custo: R$ 5–15. Troca simples para mecânico, ~1h de serviço. Se não trocar, o óleo vai diminuir e causar desgaste acelerado.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira com retentor fraco: vaza óleo após 15.000 km',
    body: 'O retentor da bengala dianteira (ø35mm) da Comet 150 tem vida útil curta em uso com buracos. Sintoma: óleo escuro aparece no tubo interno da bengala, amortecimento irregular. Troca do retentor: R$ 20–40 (peça genérica 35×47×11mm). Procedimento: desmontar a bengala, empurrar o retentor novo com tubo de PVC de diâmetro similar. Complete com ~180mL de óleo SAE 10W (ou específico para bengala) por tubo ao remontar.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico com chicote de qualidade inferior: conectores oxidam',
    body: 'O chicote elétrico original da Comet 150 usa conectores de baixa qualidade que oxidam em 2–3 anos de uso, especialmente em regiões úmidas. Problemas típicos: lanterna traseira intermitente, pisca-pisca que para, velocímetro errático. Solução: limpar todos os conectores acessíveis com spray WD-40 Contato Elétrico e aplicar graxa dielétrica. Se o problema persistir em algum ponto, substituir o conector por modelo Tyco/AMP de mesma bitola — R$ 5–10 por conector.',
  },
  {
    severity: 'WARN',
    title: 'Vibração excessiva acima de 7.000 rpm: característica do motor',
    body: 'A Comet 150 vibra mais que motos japonesas da mesma cilindrada — isso é normal para o motor monocilíndrico OHC chinês sem contrapeso refinado. Mantenha o uso entre 4.000–7.000 rpm para conforto ideal. Se a vibração piorou recentemente: verifique os antivibração do guidão (plugs de borracha nas extremidades — R$ 10–20 o par) e aperte os parafusos de fixação do motor. Porcas de motor vibrando para fora são comuns nestes motores.',
  },
]

const COMET150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário completo Comet 150: baseado no manual + experiência de proprietários',
    body: '500 km — Troca de óleo inicial (rodagem). | 1.000 km — Segunda troca de óleo + apertar parafusos do cabeçote. | 3.000 km — Troca de óleo (20W-50 1,0L). Lubrificar corrente. | 5.000 km — Limpar filtro de ar (espuma: lavar + secar + umedecer levemente com óleo). Verificar gap da vela. | 8.000 km — Troca da vela D8EA. Regular folga de válvulas (adm 0,05mm / esc 0,08mm, motor frio). | 10.000 km — Trocar filtro de ar (papel: não lavar). | 12.000 km — Kit relação se desgastado. | 15.000 km — Inspecionar retentor da bengala. | 20.000 km — Inspecionar retentor do eixo primário. Rolamentos de roda.',
  },
]

// ─── COMET 250cc / COMET GT 250cc / COMET GT-R 250cc ─────────────────────────
// Motor: 249cc DOHC V-twin ar+óleo (base Hyosung GT250) | 28 cv (carb) / 35 cv (EFI GTR)
// Vela: NGK CR8E (×2) gap 0,7–0,8mm | Óleo 10W-40 JASO MA 2,0L | Corrente 520
// Pneu: 110/70-17 (F) / 150/70-17 (R) | Tanque: 17L

const COMET250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Hyosung 249cc DOHC V-twin: usa DUAS velas — troque sempre em par',
    body: 'O motor V-twin 249cc da Comet 250/GT/GTR é derivado do Hyosung GT250. Tem duas velas de ignição — uma por cilindro. Vela correta: NGK CR8E, gap 0,7–0,8mm. Equivalentes: Denso IU22, Champion RG4HC. Custo: R$ 20–35 por unidade (compre o par). Troque sempre em par — uma vela nova com uma gasta causa combustão desigual e vibração. Intervalo: 8.000–10.000 km com vela convencional, 16.000–20.000 km com iridium NGK CR8EIX.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — 2,0L sem filtro / 2,2L com filtro; cada 5.000 km',
    body: 'O motor DOHC V-twin da Comet 250 compartilha óleo com a embreagem úmida — JASO MA obrigatório. Capacidade: 2,0L sem troca de filtro / 2,2L com novo filtro. Use 10W-40 JASO MA semissintético: Motul 5100 10W-40, Lubrax GT 10W-40 ou Shell Advance 4T 10W-40. Intervalo: 5.000 km ou 6 meses. Nunca use óleo de carro (API SM sem JASO MA) — pode fazer a embreagem escorregar.',
  },
  {
    severity: 'WARN',
    title: 'Carburador duplo (versão carburada): sincronize os dois antes de regular a marcha lenta',
    body: 'A Comet 250/GT (versão carburada) tem dois carburadores Mikuni em V — um por cilindro. Problema clássico: motor "puxando" para um lado, consumo alto, marcha lenta irregular. Causa: carburadores desincronizados. Sincronização correta requer manômetros de vácuo duplo (vacuômetro). Custo do serviço: R$ 80–150 em oficina especializada. Se sentir que um cilindro está trabalhando menos, toque nas escapadas individuais com cuidado — o cilindro mais frio está recebendo menos mistura.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — lubrifique a cada 500 km; kit relação dura 20.000 km bem mantido',
    body: 'A Comet 250/GT usa corrente 520 (mais robusta que a 428H do 150cc). Kit relação: pinhão 15T + coroa 45T + corrente 520 × 110 links. Com lubrificação a cada 500 km, a corrente dura 20.000–25.000 km. Folga correta: 25–35mm no centro do trecho inferior. Correntes compatíveis: DID 520VX (O-ring), RK 520GXW, JT Drive. Kit completo: R$ 250–450 em distribuidoras de correntes.',
  },
  {
    severity: 'OK',
    title: 'Compatibilidade com Hyosung GT250: vantagem enorme para encontrar peças',
    body: 'O maior diferencial da Comet 250/GT/GTR: o motor e vários componentes são compatíveis com o Hyosung GT250 coreano, vendido no mundo todo. Isso significa que peças ainda são encontradas: filtro de óleo (Hiflofiltro HF152), pistão, junta do cabeçote, rolamentos, bomba d\'água — tudo compatível. Busque "Hyosung GT250 parts" em sites como Bikebandit, Rocky Mountain ATV (EUA) ou Ali Express com filtro "Hyosung 250". Peças de motor chegam em 2–4 semanas por importação direta, custo razoável.',
  },
  {
    severity: 'WARN',
    title: 'EFI (GTR 250 injetado): ECU é item crítico — cuide da tensão da bateria',
    body: 'A Comet GT-R 250 EFI tem sistema de injeção baseado na ECU Hyosung. Bateria fraca (abaixo de 11,8V) causa funcionamento errático da injeção — o motor pode não pegar ou travar em marcha lenta irregular. Mantenha a bateria carregada e substitua quando a tensão em repouso cair abaixo de 12,4V. Bateria recomendada: YTX7A-BS (12V 7Ah). Se a ECU der problema, mecânicos especializados em Hyosung conseguem reprogramar — custo R$ 200–500. ECU nova importada do Alibaba pode custar R$ 300–600.',
  },
]

const COMET250_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador: ponto de falha #1 da série 250cc',
    body: 'O retificador/regulador do Comet 250/GT/GTR é o componente elétrico que mais falha — especialmente em climas quentes. Sintoma: bateria não carrega mesmo com moto funcionando (tensão abaixo de 13V a 4.000 rpm), superaquecimento do retificador (localizado sob a carenagem lateral direita). Diagnóstico: multímetro na bateria com moto a 4.000 rpm — deve marcar 13,5–14,5V. Substituição: retificador compatível com Hyosung GT250 (mesmo modelo). Custo: R$ 120–250. Substitua preventivamente após 40.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Bomba d\'água (versão líquida): verifique o nível do líquido de arrefecimento a cada 3 meses',
    body: 'Nota: o motor 249cc DOHC da Comet 250 é arrefecido a ar + óleo (não tem líquido de arrefecimento). Se alguém mencionar problema de temperatura, é pelo radiador de óleo (oil cooler lateral). Verifique regularmente o nível de óleo — com o motor quente, o óleo circulando pelo radiador diminui o nível aparente no visor. Leia sempre com motor frio e moto vertical no cavalete central.',
  },
  {
    severity: 'WARN',
    title: 'Junta do cabeçote: pode soltar entre 30.000–40.000 km se os parafusos não foram retorqueados',
    body: 'Problema documentado na comunidade Hyosung/Kasinski 250cc: a junta do cabeçote pode soltar nos parafusos da tampa do cabeçote após 30.000–40.000 km, causando vazamento de óleo para as aletas de arrefecimento. Prevenção: retorque dos parafusos da tampa do cabeçote a cada 20.000 km (torque: 10–12 Nm). Junta de reposição: compatível com Hyosung GT250 — custo R$ 40–80. Se já está vazando, limpe com desengraxante e troque a junta antes que o óleo queime nas aletas.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira ø41mm: vedante fraco em uso off-road ou pavimento ruim',
    body: 'A bengala dianteira ø41mm da Comet GT 250 tem vedante (retentor) com vida útil de 20.000–30.000 km em uso normal. Em pavimento ruim, pode ceder mais cedo. Sintoma: óleo escuro na parte inferior do tubo interno da bengala. Vedante compatível com Hyosung GT250: 41×53×10mm (genérico). Troca: R$ 150–300 de mão de obra + R$ 30–60 de peça. Ao trocar o vedante, substitua também o óleo da bengala (SAE 10W, ~400mL por tubo).',
  },
]

const COMET250_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Comet 250/GT/GTR: motor V-twin Hyosung exige mais atenção que monocilíndrico',
    body: '1.000 km — Troca de óleo inicial (10W-40 2,0L). | 5.000 km — Troca de óleo + filtro de óleo. Vela (verificar gap 0,7–0,8mm). Lubrificar corrente. | 8.000 km — Trocar velas (par NGK CR8E). Sincronizar carburadores (versão carburada). Regular marcha lenta (1.500 rpm). | 10.000 km — Filtro de ar. Folga de válvulas (adm 0,10mm / esc 0,15mm, motor frio). | 15.000 km — Fluido de freio DOT 4 (frente e trás). | 20.000 km — Kit relação. Retorque dos parafusos do cabeçote. Verificar tensão do retificador. | 30.000 km — Inspecionar vedante bengala. Pastilhas de freio dianteiro (2 discos).',
  },
]

// ─── COMET GT 650 / COMET GT 650R V2power ────────────────────────────────────
// Motor: 647cc DOHC V-twin ar+óleo (base Hyosung GT650) | 73 cv (GT650) / 89,6 cv @ 9.250 rpm (650R)
// Vela: NGK CR8E (×2) gap 0,7–0,8mm | Óleo 10W-40 JASO MA 4,0L | Corrente 530
// Pneu: 120/70-17 (F) / 160/60-17 (R) | Tanque: 17L

const COMET650_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 647cc V-twin: 4,0L de óleo 10W-40 JASO MA — troque a cada 5.000 km',
    body: 'O motor V-twin 647cc da Comet GT 650 / 650R V2power é derivado do Hyosung GT650. Capacidade de óleo: 4,0L (motor + filtro). Use 10W-40 JASO MA — obrigatório por causa da embreagem úmida. Semissintético é suficiente (Motul 5100 10W-40, Shell Advance Ultra 10W-40). Intervalo: 5.000 km. Com uso em alta rotação (acima de 7.000 rpm frequente): 4.000 km. Filtro de óleo: compatível com Hyosung GT650 — custo R$ 30–60.',
  },
  {
    severity: 'WARN',
    title: 'DUAS velas NGK CR8E — gap 0,7–0,8mm; inspecione a cada 5.000 km',
    body: 'Duas velas por motor — uma por cilindro. NGK CR8E, gap 0,7–0,8mm. Troque sempre em par a cada 10.000 km ou se uma estiver gasta (risco de combustão desigual e trepidação). Opção iridium: NGK CR8EIX, dura 20.000 km. Acesso: cilindro frontal acessível; cilindro traseiro requer desmontagem da carenagem lateral — planejar a troca junto com outras revisões.',
  },
  {
    severity: 'OK',
    title: 'Compatibilidade Hyosung GT650: facilita manutenção — peças ainda encontradas',
    body: 'A base mecânica Hyosung GT650 é a grande vantagem do Comet 650 para manutenção após o fechamento da Kasinski. Componentes compatíveis: filtro de óleo (HF152 ou equivalente), rolamentos, vedantes de bengala, pistão e anéis, junta do cabeçote, bomba d\'água, sensor de temperatura, pastilhas EBC FA407/FA408. Busque "Hyosung GT650 parts" no Ali Express ou importadores de peças para motos coreanas. Mecânicos especializados em Hyosung também atendem Comet 650.',
  },
  {
    severity: 'OK',
    title: 'Corrente 530 — Kit relação dura 25.000 km com manutenção correta',
    body: 'A Comet GT 650/650R usa corrente 530 (robusta, adequada para os 89,6 cv). Kit relação: pinhão 15T + coroa 43T + corrente 530 × 112 links. Lubrifique a corrente a cada 500–700 km (spray corrente ou óleo 80W-90 no trecho inferior). Folga: 25–35mm no centro do trecho inferior. Kit completo DID ou RK 530GXW: R$ 400–700. Não substitua somente a corrente — coroa e pinhão desgastados comem corrente nova rapidamente.',
  },
  {
    severity: 'WARN',
    title: 'Temperatura de operação: 650cc aquece mais — respeite paradas longas',
    body: 'O motor V-twin 647cc refrigerado a ar + óleo pode atingir temperatura elevada no trânsito parado (acima de 100°C). Sintomas de superaquecimento: crepitações de metal, marcha lenta instável, parada brusca. Em congestionamentos longos: se possível, evite ou ligue o ventilador de resfriamento (se instalado). Após viagem longa, deixe o motor idle por 2 minutos antes de desligar — permite que o óleo quente circule e resfrie as peças internas. Nível de óleo baixo intensifica o problema.',
  },
  {
    severity: 'OK',
    title: 'Freios: 2 discos dianteiros (versão R) — fluido DOT 4 bienal obrigatório',
    body: 'A Comet GT 650R V2power tem dois discos dianteiros com pinças duplas. Pastilhas compatíveis EBC FA407HH (dianteiro) e FA147HH (traseiro). Fluido DOT 4: troca bienal obrigatória — o fluido absorve umidade e perde ponto de ebulição, causando fading em frenagens intensas. Fluido recomendado: Motul DOT 4, ATE Blue (azul) ou equivalente. Ao purgar o sistema, purgue das pinças mais distantes para o reservatório.',
  },
]

const COMET650_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador: o componente mais crítico do Comet 650',
    body: 'O retificador do Comet 650 falha com mais frequência que o equivalente Hyosung (qualidade de componente inferior). Sintoma clássico: bateria não carrega (tensão abaixo de 13V com moto em marcha), luz de carga acende, bateria que morre em viagem. Diagnóstico: multímetro na bateria a 4.000 rpm — deve ser 13,5–14,5V. Substitua por retificador compatível com Hyosung GT650 (custo R$ 200–450). ATENÇÃO: um retificador com defeito pode sobrecarregar e destruir a bateria e o estator do alternador — não use com retificador suspeito.',
  },
  {
    severity: 'WARN',
    title: 'Bomba d\'água: problema documentado acima de 40.000 km',
    body: 'Nota: o motor 647cc da Comet GT 650 é arrefecido a ar + radiador de óleo (NÃO tem circuito d\'água). O que existe é a bomba de óleo que circula o lubrificante pelo radiador. Se o nível de óleo cair rapidamente sem vazamento visível, inspecione o radiador de óleo e as mangueiras de conexão — rachaduras são incomuns mas ocorrem. A bomba de óleo em si raramente falha se o óleo for trocado regularmente.',
  },
  {
    severity: 'WARN',
    title: 'Balanceamento: vibração no guidão acima de 100 km/h é sintoma de pneus ou rodas',
    body: 'O motor V-twin 647cc da Comet 650 tem vibração característica — especialmente no torque máximo por volta de 5.000–7.000 rpm. Se a vibração piorar ou aparecer em velocidades específicas (80–100 km/h), verifique: balanceamento dos pneus (pode ser feito em qualquer borracheiro), aferição da roda traseira após ajuste de corrente (tensor simétrico nos dois lados), e aperto dos parafusos de fixação do motor no chassi.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo: monitor o nível a cada 1.000 km',
    body: 'O motor V-twin 647cc consome óleo de forma mais perceptível que motos japonesas da mesma categoria — consumo de 200–400mL a cada 5.000 km é considerado normal. Verifique o nível (visor lateral) a cada 1.000 km. Nível mínimo + motor quente = desgaste acelerado das buchas e biela. Se consumo ultrapassar 500mL/5.000km, inspecionar retentores de válvula (admissão) e retentores do eixo virabrequim.',
  },
]

const COMET650_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Comet GT 650/650R V2power: motor V-twin exige revisão semestral',
    body: '1.000 km — Troca de óleo inicial (10W-40, 4,0L). | 5.000 km — Troca de óleo + filtro. Velas (verificar gap 0,7–0,8mm). Corrente. | 10.000 km — Troca de velas (par NGK CR8E). Folga de válvulas (adm 0,10mm / esc 0,15mm, motor frio). Fluido de freio frente. | 15.000 km — Filtro de ar. Fluido de freio trás. Inspecionar pastilhas (2 pinças dianteiras). | 20.000 km — Kit relação. Verificar tensão retificador (13,5–14,5V a 4.000 rpm). | 30.000 km — Vedante bengala ø41mm. Rolamentos de roda. Retorque dos parafusos do motor. | 40.000 km — Substituição preventiva do retificador.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'COMET 150',
    yearFrom: 2009,
    yearTo: 2014,
    MACETES: COMET150_MACETES,
    PROBLEMAS: COMET150_PROBLEMAS,
    MANUTENCAO: COMET150_MANUTENCAO,
  },
  {
    modelName: 'COMET 250cc',
    yearFrom: 2006,
    yearTo: 2009,
    MACETES: COMET250_MACETES,
    PROBLEMAS: COMET250_PROBLEMAS,
    MANUTENCAO: COMET250_MANUTENCAO,
  },
  {
    modelName: 'COMET GT 250cc',
    yearFrom: 2009,
    yearTo: 2014,
    MACETES: COMET250_MACETES,
    PROBLEMAS: COMET250_PROBLEMAS,
    MANUTENCAO: COMET250_MANUTENCAO,
  },
  {
    modelName: 'COMET GT-R 250cc',
    yearFrom: 2009,
    yearTo: 2014,
    MACETES: COMET250_MACETES,
    PROBLEMAS: COMET250_PROBLEMAS,
    MANUTENCAO: COMET250_MANUTENCAO,
  },
  {
    modelName: 'COMET GT 650',
    yearFrom: 2006,
    yearTo: 2014,
    MACETES: COMET650_MACETES,
    PROBLEMAS: COMET650_PROBLEMAS,
    MANUTENCAO: COMET650_MANUTENCAO,
  },
  {
    modelName: 'COMET GT 650R V2power',
    yearFrom: 2008,
    yearTo: 2014,
    MACETES: COMET650_MACETES,
    PROBLEMAS: COMET650_PROBLEMAS,
    MANUTENCAO: COMET650_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'COMET 150',
    yearFrom: 2009, yearTo: 2014,
    tireSize: '2.75/18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 28 PSI. Com carona: F 26 / R 33 PSI. Pneus de perfil estreito típico de nacionais 150cc da época. Verifique pressão mensalmente. Pneus recomendados: Pirelli Sport Demon 2.75-18 (F) / 90/90-18 (R).',
  },
  {
    modelName: 'COMET 250cc',
    yearFrom: 2006, yearTo: 2009,
    tireSize: '110/70-17 (F) · 150/70-17 (R)',
    frontPsi: 29, rearPsi: 33,
    frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Solo: F 29 / R 33 PSI. Com carona: F 29 / R 36 PSI. Pneu dianteiro 110/70-17 (equivalente radial recomendado: Pirelli Diablo Strada 110/70-17). Traseiro 150/70-17.',
  },
  {
    modelName: 'COMET GT 250cc',
    yearFrom: 2009, yearTo: 2014,
    tireSize: '110/70-17 (F) · 150/70-17 (R)',
    frontPsi: 29, rearPsi: 33,
    frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Solo: F 29 / R 33 PSI. Com carona: F 29 / R 36 PSI. Mesmos pneus e pressões do Comet 250cc base.',
  },
  {
    modelName: 'COMET GT-R 250cc',
    yearFrom: 2009, yearTo: 2014,
    tireSize: '110/70-17 (F) · 150/70-17 (R)',
    frontPsi: 29, rearPsi: 33,
    frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Solo: F 29 / R 33 PSI. Com carona: F 29 / R 36 PSI. Versão GTR EFI — mesma especificação de pneus da GT carburada.',
  },
  {
    modelName: 'COMET GT 650',
    yearFrom: 2006, yearTo: 2014,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 33, rearPsi: 36,
    frontPsiLoad: 33, rearPsiLoad: 39,
    notes: 'Solo: F 33 / R 36 PSI. Com carona: F 33 / R 39 PSI. Pneus para 647cc V-twin. Recomendados: Pirelli Diablo Rosso III ou Metzeler Sportec M7 120/70-17 + 160/60-17.',
  },
  {
    modelName: 'COMET GT 650R V2power',
    yearFrom: 2008, yearTo: 2014,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 33, rearPsi: 36,
    frontPsiLoad: 33, rearPsiLoad: 39,
    notes: 'Solo: F 33 / R 36 PSI. Com carona: F 33 / R 39 PSI. Versão V2power com 89,6 cv — pneus esportivos são recomendados para o potencial da moto.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // COMET 150
  { modelName: 'COMET 150', yearFrom: 2009, yearTo: 2014, component: 'Óleo 20W-50 JASO MA (1,0L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 149cc OHC. Nunca use JASO MB (escorrega embreagem). Mineral 20W-50 adequado.', priority: 'HIGH', order: 1 },
  { modelName: 'COMET 150', yearFrom: 2009, yearTo: 2014, component: 'Lubrificação da corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Spray corrente ou óleo 80W-90. Folga 20–30mm.', priority: 'HIGH', order: 2 },
  { modelName: 'COMET 150', yearFrom: 2009, yearTo: 2014, component: 'Vela NGK D8EA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Verificar gap a cada 5.000 km. Troca a 8.000 km (convencional) ou 20.000 km (iridium D8EIX).', priority: 'MEDIUM', order: 3 },
  { modelName: 'COMET 150', yearFrom: 2009, yearTo: 2014, component: 'Filtro de ar — limpeza (espuma)', intervalKm: 5000, intervalMonths: 12, notes: 'Lavar com querosene, secar, umedecer levemente com óleo de motor antes de reinstalar.', priority: 'MEDIUM', order: 4 },
  { modelName: 'COMET 150', yearFrom: 2009, yearTo: 2014, component: 'Filtro de ar — troca', intervalKm: 10000, intervalMonths: 24, notes: 'Filtro de papel: não lavar, apenas trocar.', priority: 'MEDIUM', order: 5 },
  { modelName: 'COMET 150', yearFrom: 2009, yearTo: 2014, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório. Regular por contra-porca — não usa pastilhas (shim).', priority: 'HIGH', order: 6 },
  { modelName: 'COMET 150', yearFrom: 2009, yearTo: 2014, component: 'Kit relação 428H (pinhão 14T + coroa 40T + corrente)', intervalKm: 15000, intervalMonths: null, notes: 'Trocar kit completo — nunca só a corrente com coroa gasta.', priority: 'HIGH', order: 7 },
  { modelName: 'COMET 150', yearFrom: 2009, yearTo: 2014, component: 'Pastilha/lona de freio — inspeção', intervalKm: 6000, intervalMonths: 12, notes: 'Dianteiro: disco; traseiro: tambor. Lona com espessura < 2mm = trocar.', priority: 'MEDIUM', order: 8 },
  { modelName: 'COMET 150', yearFrom: 2009, yearTo: 2014, component: 'Retentor bengala ø35mm', intervalKm: 20000, intervalMonths: null, notes: 'Peça genérica 35×47×11mm. Trocar junto com óleo da bengala (SAE 10W, 180mL/tubo).', priority: 'MEDIUM', order: 9 },
  { modelName: 'COMET 150', yearFrom: 2009, yearTo: 2014, component: 'Verificação do CDI e retificador', intervalKm: null, intervalMonths: 12, notes: 'Medir tensão com multímetro a 4.000 rpm: deve ser 13,5–14,5V.', priority: 'MEDIUM', order: 10 },

  // COMET 250cc
  { modelName: 'COMET 250cc', yearFrom: 2006, yearTo: 2009, component: 'Óleo 10W-40 JASO MA (2,0L s/ filtro / 2,2L c/ filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor DOHC V-twin Hyosung. Semissintético 10W-40 JASO MA.', priority: 'HIGH', order: 1 },
  { modelName: 'COMET 250cc', yearFrom: 2006, yearTo: 2009, component: 'Velas NGK CR8E ×2 (gap 0,7–0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Sempre em par. Acesso cilindro traseiro requer remoção de carenagem.', priority: 'HIGH', order: 2 },
  { modelName: 'COMET 250cc', yearFrom: 2006, yearTo: 2009, component: 'Lubrificação corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Folga 25–35mm. Kit: pinhão 15T + coroa 45T + corrente 520 × 110.', priority: 'HIGH', order: 3 },
  { modelName: 'COMET 250cc', yearFrom: 2006, yearTo: 2009, component: 'Sincronização dos carburadores duplos Mikuni', intervalKm: 10000, intervalMonths: 12, notes: 'Requer vacuômetro duplo. Sintoma de dessincronização: motor irregular, consumo alto.', priority: 'HIGH', order: 4 },
  { modelName: 'COMET 250cc', yearFrom: 2006, yearTo: 2009, component: 'Folga de válvulas (adm 0,10mm / esc 0,15mm)', intervalKm: 10000, intervalMonths: 12, notes: 'DOHC 4 válvulas/cilindro × 2 cilindros = 8 válvulas totais. Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'COMET 250cc', yearFrom: 2006, yearTo: 2009, component: 'Filtro de óleo (Hiflofiltro HF152)', intervalKm: 10000, intervalMonths: 12, notes: 'Compatível com Hyosung GT250. Sempre aplicar óleo no O-ring ao montar.', priority: 'MEDIUM', order: 6 },
  { modelName: 'COMET 250cc', yearFrom: 2006, yearTo: 2009, component: 'Fluido de freio DOT 4 (frente + trás)', intervalKm: 15000, intervalMonths: 24, notes: 'Purgar das pinças para o reservatório. DOT 4: não misturar com DOT 3.', priority: 'HIGH', order: 7 },
  { modelName: 'COMET 250cc', yearFrom: 2006, yearTo: 2009, component: 'Kit relação 520 (pinhão 15T + coroa 45T)', intervalKm: 20000, intervalMonths: null, notes: 'DID 520VX com O-ring: maior durabilidade. Trocar kit completo.', priority: 'HIGH', order: 8 },
  { modelName: 'COMET 250cc', yearFrom: 2006, yearTo: 2009, component: 'Verificação do retificador/regulador (13,5–14,5V)', intervalKm: null, intervalMonths: 12, notes: 'Medir com multímetro a 4.000 rpm. Substituição preventiva após 40.000 km.', priority: 'CRITICAL', order: 9 },

  // COMET GT 250cc (mesmos itens)
  { modelName: 'COMET GT 250cc', yearFrom: 2009, yearTo: 2014, component: 'Óleo 10W-40 JASO MA (2,0L s/ filtro / 2,2L c/ filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor DOHC V-twin Hyosung. Semissintético 10W-40 JASO MA.', priority: 'HIGH', order: 1 },
  { modelName: 'COMET GT 250cc', yearFrom: 2009, yearTo: 2014, component: 'Velas NGK CR8E ×2 (gap 0,7–0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Sempre em par.', priority: 'HIGH', order: 2 },
  { modelName: 'COMET GT 250cc', yearFrom: 2009, yearTo: 2014, component: 'Lubrificação corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Folga 25–35mm no trecho inferior.', priority: 'HIGH', order: 3 },
  { modelName: 'COMET GT 250cc', yearFrom: 2009, yearTo: 2014, component: 'Sincronização dos carburadores duplos Mikuni', intervalKm: 10000, intervalMonths: 12, notes: 'Versão carburada — requere vacuômetro duplo.', priority: 'HIGH', order: 4 },
  { modelName: 'COMET GT 250cc', yearFrom: 2009, yearTo: 2014, component: 'Folga de válvulas (adm 0,10mm / esc 0,15mm)', intervalKm: 10000, intervalMonths: 12, notes: '8 válvulas totais — motor frio obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'COMET GT 250cc', yearFrom: 2009, yearTo: 2014, component: 'Verificação retificador (13,5–14,5V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha #1. Substituir preventivamente após 40.000 km.', priority: 'CRITICAL', order: 6 },
  { modelName: 'COMET GT 250cc', yearFrom: 2009, yearTo: 2014, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 7 },

  // COMET GT-R 250cc
  { modelName: 'COMET GT-R 250cc', yearFrom: 2009, yearTo: 2014, component: 'Óleo 10W-40 JASO MA (2,0L s/ filtro / 2,2L c/ filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'EFI. Motor DOHC V-twin Hyosung. Semissintético 10W-40 JASO MA.', priority: 'HIGH', order: 1 },
  { modelName: 'COMET GT-R 250cc', yearFrom: 2009, yearTo: 2014, component: 'Velas NGK CR8E ×2 (gap 0,7–0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Sempre em par. Iridium CR8EIX dura 20.000 km.', priority: 'HIGH', order: 2 },
  { modelName: 'COMET GT-R 250cc', yearFrom: 2009, yearTo: 2014, component: 'Bateria YTX7A-BS — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'Versão EFI: tensão mínima 12,4V em repouso. Bateria fraca = ECU com falhas.', priority: 'HIGH', order: 3 },
  { modelName: 'COMET GT-R 250cc', yearFrom: 2009, yearTo: 2014, component: 'Folga de válvulas (adm 0,10mm / esc 0,15mm)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio. Acesso via carenagem superior.', priority: 'HIGH', order: 4 },
  { modelName: 'COMET GT-R 250cc', yearFrom: 2009, yearTo: 2014, component: 'Verificação retificador + tensão ECU', intervalKm: null, intervalMonths: 12, notes: 'EFI: instabilidade elétrica destrói ECU. Manter 13,5–14,5V @ 4.000 rpm.', priority: 'CRITICAL', order: 5 },
  { modelName: 'COMET GT-R 250cc', yearFrom: 2009, yearTo: 2014, component: 'Lubrificação corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Folga 25–35mm.', priority: 'HIGH', order: 6 },
  { modelName: 'COMET GT-R 250cc', yearFrom: 2009, yearTo: 2014, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal. Não misturar com DOT 3.', priority: 'HIGH', order: 7 },

  // COMET GT 650
  { modelName: 'COMET GT 650', yearFrom: 2006, yearTo: 2014, component: 'Óleo 10W-40 JASO MA (4,0L)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor V-twin 647cc DOHC. Semissintético 10W-40 JASO MA. Não usar JASO MB.', priority: 'HIGH', order: 1 },
  { modelName: 'COMET GT 650', yearFrom: 2006, yearTo: 2014, component: 'Filtro de óleo (Hiflofiltro HF152)', intervalKm: 10000, intervalMonths: 12, notes: 'Compatível Hyosung GT650. Aplicar óleo no O-ring ao montar.', priority: 'MEDIUM', order: 2 },
  { modelName: 'COMET GT 650', yearFrom: 2006, yearTo: 2014, component: 'Velas NGK CR8E ×2 (gap 0,7–0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Cilindro traseiro: acesso difícil, agendar junto com outras revisões.', priority: 'HIGH', order: 3 },
  { modelName: 'COMET GT 650', yearFrom: 2006, yearTo: 2014, component: 'Lubrificação corrente 530', intervalKm: 500, intervalMonths: null, notes: 'Folga 25–35mm. Kit: pinhão 15T + coroa 43T + corrente 530 × 112.', priority: 'HIGH', order: 4 },
  { modelName: 'COMET GT 650', yearFrom: 2006, yearTo: 2014, component: 'Folga de válvulas (adm 0,10mm / esc 0,15mm)', intervalKm: 10000, intervalMonths: 12, notes: 'DOHC 8 válvulas. Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'COMET GT 650', yearFrom: 2006, yearTo: 2014, component: 'Fluido de freio DOT 4 (frente + trás)', intervalKm: 15000, intervalMonths: 24, notes: 'Purgar das pinças para o reservatório.', priority: 'HIGH', order: 6 },
  { modelName: 'COMET GT 650', yearFrom: 2006, yearTo: 2014, component: 'Retificador/regulador — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: 'Ponto crítico #1. 13,5–14,5V @ 4.000 rpm. Substituir após 40.000 km.', priority: 'CRITICAL', order: 7 },
  { modelName: 'COMET GT 650', yearFrom: 2006, yearTo: 2014, component: 'Kit relação 530 (pinhão + coroa + corrente)', intervalKm: 25000, intervalMonths: null, notes: 'DID ou RK 530GXW. Trocar kit completo.', priority: 'HIGH', order: 8 },
  { modelName: 'COMET GT 650', yearFrom: 2006, yearTo: 2014, component: 'Pastilhas de freio dianteiro (disco simples)', intervalKm: 15000, intervalMonths: null, notes: 'EBC FA407HH ou compatível Hyosung GT650.', priority: 'MEDIUM', order: 9 },

  // COMET GT 650R V2power
  { modelName: 'COMET GT 650R V2power', yearFrom: 2008, yearTo: 2014, component: 'Óleo 10W-40 JASO MA (4,0L)', intervalKm: 5000, intervalMonths: 6, notes: 'Mesma capacidade do GT 650 base. 89,6 cv — uso em alta rotação: reduzir para 4.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'COMET GT 650R V2power', yearFrom: 2008, yearTo: 2014, component: 'Velas NGK CR8E ×2 (gap 0,7–0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Par obrigatório. Versão V2power: aceleração agressiva pode diminuir vida das velas.', priority: 'HIGH', order: 2 },
  { modelName: 'COMET GT 650R V2power', yearFrom: 2008, yearTo: 2014, component: 'Lubrificação corrente 530', intervalKm: 500, intervalMonths: null, notes: 'Folga 25–35mm.', priority: 'HIGH', order: 3 },
  { modelName: 'COMET GT 650R V2power', yearFrom: 2008, yearTo: 2014, component: 'Pastilhas dianteiras (2 pinças duplas)', intervalKm: 12000, intervalMonths: null, notes: 'Versão R: 2 discos dianteiros. EBC FA407HH (×2) + FA147HH trás.', priority: 'HIGH', order: 4 },
  { modelName: 'COMET GT 650R V2power', yearFrom: 2008, yearTo: 2014, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal. 2 pinças dianteiras: mais fluido e mais pontos de purga.', priority: 'HIGH', order: 5 },
  { modelName: 'COMET GT 650R V2power', yearFrom: 2008, yearTo: 2014, component: 'Retificador/regulador — verificação + substituição preventiva', intervalKm: null, intervalMonths: 12, notes: 'Substituição preventiva aos 40.000 km. Ponto de falha crítico.', priority: 'CRITICAL', order: 6 },
  { modelName: 'COMET GT 650R V2power', yearFrom: 2008, yearTo: 2014, component: 'Folga de válvulas (adm 0,10mm / esc 0,15mm)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio. 8 válvulas DOHC.', priority: 'HIGH', order: 7 },
  { modelName: 'COMET GT 650R V2power', yearFrom: 2008, yearTo: 2014, component: 'Kit relação 530', intervalKm: 25000, intervalMonths: null, notes: 'Com uso em track: inspecionar a cada 15.000 km.', priority: 'HIGH', order: 8 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Kasinski Comet (150 / 250 / 650)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'KASINSKI', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'KASINSKI', vehicleTypeId: motoType.id },
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

  console.log('✅ Kasinski Comet concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
