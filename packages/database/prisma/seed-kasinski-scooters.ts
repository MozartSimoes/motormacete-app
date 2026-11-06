// seed-kasinski-scooters.ts — Kasinski PRIMA 50, PRIMA 150, PRIMA RALLY 50cc, SOFT 50cc,
//   PRIMA ELECTRA 2000W, WIN ELECTRA 1000W, MOTOKAR FURGÃO 174cc, MOTOKAR TAXI-KAR 174cc
// PRIMA 50 / PRIMA RALLY 50cc: motor 49cc 2T, ar, scooter — MISTURA gasolina + óleo 2T
// PRIMA 150: motor 149cc OHC 4T, CVT automático, scooter de estilo italiano
// SOFT 50cc: 49cc OHC 4T, scooter compacto
// PRIMA ELECTRA 2000W / WIN ELECTRA 1000W: motores elétricos — sem óleo, sem vela
// MOTOKAR FURGÃO / TAXI-KAR 174cc: triciclos comerciais 174cc 4T
// Execute: pnpm --filter @motormacete/database db:seed:kasinski-scooters
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

// ─── PRIMA 50 ─────────────────────────────────────────────────────────────────
// Motor: 49cc 2T monocilíndrico, ar forçado — DOIS TEMPOS
// 6,5 cv @ 6.500 rpm | 0,73 kgf.m @ 6.000 rpm
// Transmissão: CVT automático
// Pneus: 120/70-12 (F e R) | Tanque: 4,8L | Peso: 84 kg
// Produção: ~1999–2012

const PRIMA50_MACETES: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor 2T: NUNCA use óleo 4T puro no motor',
    body: 'A PRIMA 50 tem motor 2 tempos. O motor 2T precisa de lubrificação pela MISTURA gasolina + óleo 2T OU por bomba de óleo autolubrificante separada. Sem essa lubrificação, o motor gripa em minutos. Confirme se o seu modelo tem bomba autolubrificante. Se não tiver, misture 20mL de óleo 2T por litro de gasolina (proporção 50:1).',
  },
  {
    severity: 'OK',
    title: 'Óleo 2T: use sintético ou semissintético JASO FC ou FD',
    body: 'Óleo 2T de boa qualidade é essencial: Motul 2T, Bardahl 2T ou similar. Qualidade do óleo impacta diretamente na vida do motor e na quantidade de fumaça. Óleo mineral comum produz mais fuligem e contamina mais a vela.',
  },
  {
    severity: 'OK',
    title: 'CVT automático: sem pedal de embreagem, sem trocas de marcha',
    body: 'A PRIMA 50 é totalmente automática. Sem embreagem, sem marchas. Acelerador e freio apenas. Para novos pilotos: excelente para aprender equilíbrio e direção sem se preocupar com câmbio.',
  },
  {
    severity: 'WARN',
    title: 'Rolos do variador: troque a cada 20.000 km',
    body: 'Rolos do CVT com desgaste (ovalizados) causam aceleração "soluçante", decolagem lenta do ponto e ruído no variador. Rolos padrão PRIMA 50: ø15mm × 12mm, peso 6g. Kit custa R$20–40. Nunca use rolos de peso diferente do original.',
  },
  {
    severity: 'OK',
    title: 'Combustível: esvazie o carburador ao parar por mais de 30 dias',
    body: 'Gasolina velha no carburador de scooter 2T vira verniz em 30 dias. Para estocagem: feche a torneira de combustível e deixe o motor parado até o motor apagar (esgota o carburador). Ou adicione estabilizador de combustível.',
  },
  {
    severity: 'WARN',
    title: 'Correia do CVT: troque preventivamente a cada 30.000 km',
    body: 'Correia partida = scooter parado. Troque preventivamente. Correia padrão PRIMA 50: tipo 669/18/30 (confirme as dimensões do seu modelo). Custo: R$30–60. Sintoma de correia desgastada: perda de aceleração, vibração no CVT.',
  },
  {
    severity: 'OK',
    title: 'Pneus Pirelli: específicos para PRIMA 50 originais',
    body: 'A PRIMA 50 saiu de fábrica com pneus Pirelli S83 120/70-12 — desenvolvidos especificamente para este modelo. Ao substituir, use pneus de boa marca para scooter 12" (Michelin City Grip, Pirelli Angel Scooter ou equivalente). Pressão: F e R 28 PSI.',
  },
]

const PRIMA50_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor gripa sem lubrificação 2T: a causa número 1 de destruição',
    body: 'Motor 2T sem lubrificação adequada gripa (pistão trava no cilindro) sem aviso prévio. Custo de reparo: R$400–800 (retífica + pistão + anéis). Sempre cheque o reservatório de óleo 2T antes de usar, se autolubrificante.',
  },
  {
    severity: 'WARN',
    title: 'Vela B7HS coberta de fuligem: sinal de mistura rica ou óleo ruim',
    body: 'Eletrodo preto em motor 2T é normal, mas cobertura ESPESSA indica mistura muito rica ou óleo 2T de baixa qualidade. Use óleo 2T semissintético. Vela: NGK B7HS, gap 0,6–0,7mm. Troque a cada 6.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Partida difícil: carburador com verniz ou vela gasta',
    body: 'PRIMA 50 que não parte: verifique vela (troque), limpe o carburador (spray carburador) e cheque o enrichecedor/starter. Carburador PW18 (ou PD18) — jato principal #68–72 para altitude até 500m.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro tambor: ruído ao frear com lona gasta',
    body: 'Ruído metálico ao frear traseiro = lona com espessura < 2mm. Com lona gasta, o metal do sapato risca o tambor. Lona de reposição universal para scooter tambor ø110mm. Custo: R$15–30.',
  },
  {
    severity: 'WARN',
    title: 'Peças PRIMA 50: específicas Kasinski são raras pós-2016',
    body: 'Carenagens, painéis e peças estéticas específicas da PRIMA 50 são difíceis. Motor, correia CVT, rolos e vela são universais para scooter 2T 50cc de origem chinesa.',
  },
]

const PRIMA50_MANUTENCAO: TipInput[] = [
  { severity: 'DANGER', title: 'Óleo 2T JASO FC/FD — verificar nível DIARIAMENTE', body: 'Autolubrificante: reservatório acima do mínimo SEMPRE. Mistura manual: 20mL óleo 2T / litro gasolina (50:1). Motor 2T sem óleo gripa em minutos.' },
  { severity: 'OK', title: 'Vela NGK B7HS (gap 0,6–0,7mm) — 6.000 km', body: 'Motor 2T: vela suja mais rápido. Inspecionar a 3.000 km. Eletrodo preto = normal.' },
  { severity: 'WARN', title: 'Correia CVT (tipo 669/18/30) — 30.000 km', body: 'Troca preventiva. Sintoma de desgaste: perda de aceleração, vibração.' },
  { severity: 'OK', title: 'Rolos variador (ø15×12mm, 6g) — 20.000 km', body: 'Ovalizados = aceleração irregular. Kit R$20–40.' },
  { severity: 'OK', title: 'Pastilha freio dianteiro + lona traseira (tambor) — 10.000 km', body: 'Pastilha < 1,5mm = troca. Lona < 2mm = troca.' },
  { severity: 'OK', title: 'Limpeza caixa variador (CVT) — 20.000 km', body: 'Spray freios (seco). NUNCA óleo ou graxa no variador.' },
  { severity: 'OK', title: 'Limpeza carburador PW18/PD18 — 10.000 km', body: 'Spray carburador + agulha fina. Jato principal #68–72.' },
  { severity: 'OK', title: 'Pneus 120/70-12 — calibrar semanalmente', body: 'F e R: 28 PSI solo. 32 PSI com carona.' },
]

// ─── PRIMA RALLY 50cc ─────────────────────────────────────────────────────────
// Motor: 49cc 2T — mesma base técnica que PRIMA 50
// Estilo: rally/adventure scooter com visual diferenciado
// Produção: ~2003–2010

const PRIMARALLY_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor 2T da PRIMA 50: manutenção idêntica',
    body: 'A PRIMA RALLY 50cc usa o mesmo motor 49cc 2T da PRIMA 50 padrão. Toda manutenção é idêntica: verificação diária de óleo 2T, vela NGK B7HS, correia CVT e rolos do variador.',
  },
  {
    severity: 'OK',
    title: 'Visual rally: pneus semissulcados melhoram aderência em piso molhado',
    body: 'A PRIMA RALLY pode ter pneus com perfil mais agressivo (semissulcado) que a PRIMA padrão. Mantém melhor aderência em piso molhado e paralelepípedo. Pressão: 26–28 PSI (verifique etiqueta lateral).',
  },
  {
    severity: 'WARN',
    title: 'Motor 2T: nunca negligencie o óleo 2T',
    body: 'Mesmo alerta da PRIMA 50: motor 2T SEM óleo gripa em minutos. Verifique o reservatório autolubrificante diariamente. O modelo Rally tem uso mais "animado" pelo perfil aventureiro — exige atenção dobrada ao óleo.',
  },
]

const PRIMARALLY_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor 2T: gripagem é silenciosa e irreversível sem reparo',
    body: 'Mesmo risco da PRIMA 50 padrão. Motor 2T gripa sem aviso. Custo de retífica + pistão: R$400–800. Prevenção: verificar óleo 2T DIARIAMENTE.',
  },
  {
    severity: 'WARN',
    title: 'Peças estéticas da versão RALLY: mais raras que a PRIMA padrão',
    body: 'A PRIMA RALLY tinha produção menor que a PRIMA padrão. Carenagens e peças estéticas são extremamente raras pós-2016. Componentes mecânicos (correia, rolos, vela) são universais para scooter 2T 50cc.',
  },
]

const PRIMARALLY_MANUTENCAO: TipInput[] = [
  { severity: 'DANGER', title: 'Óleo 2T JASO FC/FD — verificar DIARIAMENTE', body: 'Motor 2T. Reservatório abaixo do mínimo = gripagem. Mistura manual: 20mL / litro gasolina.' },
  { severity: 'OK', title: 'Vela NGK B7HS (gap 0,6–0,7mm) — 6.000 km', body: 'Inspecionar 3.000 km.' },
  { severity: 'WARN', title: 'Correia CVT — 30.000 km', body: 'Troca preventiva.' },
  { severity: 'OK', title: 'Rolos variador — 20.000 km', body: 'Mesmo padrão da PRIMA 50.' },
  { severity: 'OK', title: 'Pneus (verificar tamanho no lateral) — calibrar semanalmente', body: '26–28 PSI. Verifique etiqueta do veículo.' },
]

// ─── PRIMA 150 ────────────────────────────────────────────────────────────────
// Motor: 149cc OHC 4T monocilíndrico, ar, 12,2 cv @ 8.000 rpm, 1,1 kgf.m @ 7.000 rpm
// ø63mm × 59mm | Carburador: PD27 | CVT automático
// Pneus: 130/60-13 (F e R) | Tanque: 8L | Peso: ~120 kg
// Design: italiano (CPI / Sym-based) | Produção: ~2011–2015
// NÃO confundir com PRIMA 50 (2T): a PRIMA 150 é 4T

const PRIMA150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 4T: MUITO diferente da PRIMA 50 — use óleo 4T adequado',
    body: 'Atenção: PRIMA 150 é motor 4 tempos! Use óleo 20W-50 JASO MA (ou 10W-40 JASO MA). NUNCA misture gasolina com óleo 2T neste modelo. Capacidade: ~1,1L com filtro. Troca a cada 3.000 km.',
  },
  {
    severity: 'OK',
    title: 'Design italiano com motor chinês: visual bonito, manutenção simples',
    body: 'A PRIMA 150 foi importada com design italiano mas motor 149cc OHC de origem chinesa. A manutenção é simples: vela NGK C7HSA (gap 0,6–0,7mm), óleo 20W-50 JASO MA, CVT automático. Estilo europeu, praticidade oriental.',
  },
  {
    severity: 'WARN',
    title: 'Rolos do variador (CVT): troque a cada 20.000 km',
    body: 'CVT 4T: rolos com mais massa que os 2T da PRIMA 50 (~8–10g). Rolos ovalizados causam aceleração irregular. Verifique o peso exato no manual. Kit custa R$30–60.',
  },
  {
    severity: 'OK',
    title: 'Carburador PD27: limpeza fundamental para bom desempenho',
    body: 'A PRIMA 150 usa carburador PD27 com puxada automática de agulha (diferente de carburadores convencionais). Limpeza a cada 10.000 km. Jato principal: #98–102. Sintoma de carburador sujo: aceleração irregular, consumo alto.',
  },
  {
    severity: 'OK',
    title: 'Pneus 130/60-13: menos comuns que os 10" da PRIMA 50',
    body: 'Pneus 130/60-13 são aro 13", mais comuns em scooters europeus de médio porte. Verifique disponibilidade na sua cidade. Michelin City Grip e Pirelli Angel Scooter 130/60-13 são as melhores opções.',
  },
  {
    severity: 'WARN',
    title: 'Freio dianteiro hidráulico: pastilha e fluido DOT 4 bienal',
    body: 'Diferente da PRIMA 50 que tem freio dianteiro hidráulico simples, a PRIMA 150 tem sistema mais robusto. Fluido DOT 4 bienal obrigatório. Pastilha: mínimo 1,5mm antes de trocar.',
  },
]

const PRIMA150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Peças PRIMA 150: scooter de nicho com peças específicas difíceis',
    body: 'A PRIMA 150 foi importada por tempo limitado. Peças específicas (carenagem, pára-brisa, painéis) são escassas. Componentes do motor (vela, filtro, CVT) são genéricos para 150cc scooter.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT: troque antes de arrebentar para não ficar na mão',
    body: 'Correia partida = scooter imobilizada. Troque preventivamente a cada 25.000–30.000 km. Leve uma correia reserva em viagens longas. Correia PRIMA 150: verifique dimensões (tipo Dayco ou Gates para 150cc scooter).',
  },
  {
    severity: 'WARN',
    title: 'CDI/ECM: falhas elétricas em exemplares mais velhos',
    body: 'Em scooters 150cc de origem chinesa com mais de 5–7 anos, o CDI pode apresentar falhas. Sintoma: motor que morre em alta rotação ou em dias quentes. CDI universal para scooter 150cc 4T custa R$50–100.',
  },
]

const PRIMA150_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 20W-50 JASO MA (1,1L) — 3.000 km ou 6 meses', body: 'Motor 149cc OHC 4T. NUNCA 2T. Mineral JASO MA.' },
  { severity: 'OK', title: 'Vela NGK C7HSA (gap 0,6–0,7mm) — 8.000 km', body: 'Inspecionar 5.000 km. Torque 10–12 Nm.' },
  { severity: 'WARN', title: 'Correia CVT — 25.000–30.000 km', body: 'Troca preventiva. Verifique dimensões específicas.' },
  { severity: 'OK', title: 'Rolos variador (~8–10g) — 20.000 km', body: 'Ovalizados = aceleração irregular.' },
  { severity: 'WARN', title: 'Fluido de freio DOT 4 (dianteiro) — 2 anos', body: 'Bienal obrigatório. Freio hidráulico dianteiro.' },
  { severity: 'OK', title: 'Pastilha freio dianteiro — 10.000 km', body: 'Espessura mínima 1,5mm.' },
  { severity: 'OK', title: 'Limpeza carburador PD27 — 10.000 km', body: 'Jato principal #98–102. Spray carburador.' },
  { severity: 'OK', title: 'Filtro de ar — limpar 5.000 km', body: 'Espuma ou papel: não lave se for de papel — troque.' },
  { severity: 'OK', title: 'Pneus 130/60-13 (F e R) — calibrar semanalmente', body: 'Solo: 28 PSI. Com carona: 32 PSI.' },
  { severity: 'OK', title: 'Limpeza caixa variador (CVT) — 20.000 km', body: 'Spray freios (seco). Nunca lubrificante no variador.' },
]

// ─── SOFT 50cc ────────────────────────────────────────────────────────────────
// Motor: 49cc OHC 4T monocilíndrico, ar — scooter compacto (NÃO é 2T)
// CVT automático | Estilo: scooter urbano compacto
// Produção: ~2011–2013

const SOFT50_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 4T (NÃO 2T): diferente da PRIMA 50',
    body: 'A SOFT 50cc tem motor 49cc OHC 4 tempos — diferente da PRIMA 50 (2T). Use óleo 4T convencional 20W-50 JASO MA, ~0,7L. Nunca misture gasolina com óleo 2T no motor.',
  },
  {
    severity: 'OK',
    title: 'Scooter compacto: ideal para mobilidade urbana em espaços reduzidos',
    body: 'A SOFT 50cc é pequena e leve. Pode ser estacionada em espaços mínimos. Limite de velocidade: ~45–50 km/h máximo. Adequada para cidades com velocidade máxima de 50 km/h em bairros.',
  },
  {
    severity: 'WARN',
    title: 'CVT automático: rolos e correia são manutenção obrigatória',
    body: 'CVT 4T 50cc: rolos de peso leve (~6g). Correia: verifique dimensões específicas da SOFT 50. Inspecione a cada 15.000 km e substitua preventivamente.',
  },
  {
    severity: 'OK',
    title: 'Vela: NGK C7HSA para motor 4T 50cc OHC',
    body: 'Motor OHC 49cc 4T: vela NGK C7HSA, gap 0,6–0,7mm. Mesma vela dos CUBs 110cc. Troca a cada 8.000 km.',
  },
]

const SOFT50_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desempenho limitado: 49cc em subidas longas ou com carona',
    body: '49cc 4T tem potência de ~4–5 cv — suficiente para percursos planos, mas limitado em subidas ou com carona. Para cidades com topografia acidentada, o 49cc exige mais do motor. Troque o óleo no prazo para máxima eficiência.',
  },
  {
    severity: 'WARN',
    title: 'Peças SOFT 50cc: modelo de baixo volume, peças escassas',
    body: 'A SOFT 50cc foi produzida de 2011 a 2013 com baixo volume. Peças específicas são raras. Componentes de motor (vela, filtro, correia CVT) são genéricos para scooter 50cc 4T.',
  },
]

const SOFT50_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 20W-50 JASO MA (~0,7L) — 3.000 km ou 6 meses', body: 'Motor 49cc OHC 4T. NUNCA 2T.' },
  { severity: 'OK', title: 'Vela NGK C7HSA (gap 0,6–0,7mm) — 8.000 km', body: 'Inspecionar 5.000 km.' },
  { severity: 'WARN', title: 'Correia CVT — 15.000 km (inspecionar)', body: 'Troca preventiva. Confirme dimensões.' },
  { severity: 'OK', title: 'Rolos variador (~6g) — 15.000 km', body: 'Ovalizados = aceleração irregular.' },
  { severity: 'OK', title: 'Filtro de ar — limpar 5.000 km', body: 'Espuma: querosene + secar + óleo fino.' },
  { severity: 'OK', title: 'Pneus (verificar tamanho no lateral) — calibrar semanalmente', body: '26–28 PSI. Confirmar no manual.' },
]

// ─── PRIMA ELECTRA 2000W ──────────────────────────────────────────────────────
// Motor: Elétrico 2000W (assíncrono ou brushless)
// Autonomia: ~50–60 km | Velocidade máx: ~50 km/h
// Bateria: chumbo-ácido (original) ou lítio (upgrade)
// SEM motor a combustão: NÃO tem óleo de motor, NÃO tem vela
// Produção: ~2012–2014

const ELECTRA2000_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Moto elétrica: sem óleo de motor, sem vela, sem combustível',
    body: 'A PRIMA ELECTRA não tem motor a combustão. Sem troca de óleo, sem vela, sem filtro de ar. O custo de manutenção é muito menor. Foco na BATERIA: é o componente mais caro e crítico.',
  },
  {
    severity: 'WARN',
    title: 'Bateria de chumbo-ácido: vida útil de 2–3 anos, 300–500 ciclos',
    body: 'Bateria chumbo-ácido original da PRIMA ELECTRA: vida útil de 2–3 anos ou 300–500 ciclos de carga. Sinais de degradação: autonomia caindo, dificuldade de partir. Troca: kit de baterias chumbo-ácido seladas (3–4 unidades de 12V/20Ah) ou upgrade para Lítio LiFePO4.',
  },
  {
    severity: 'OK',
    title: 'Upgrade de bateria para Lítio: tripla a autonomia e vida útil',
    body: 'Upgrade de chumbo (15–20 kg) para Lítio LiFePO4 (48V/30Ah): autonomia aumenta de ~50 km para 80–120 km e vida útil de 300 para 2.000+ ciclos. Custo: R$1.500–3.000. Leva a PRIMA ELECTRA para um patamar totalmente diferente.',
  },
  {
    severity: 'OK',
    title: 'Carregamento: não descarregue abaixo de 20% da capacidade',
    body: 'Baterias chumbo-ácido degradam rapidamente se descarregadas abaixo de 20%. Carregue após cada uso. Nunca deixe descarregada por mais de 24h. Lítio LiFePO4 é mais tolerante — pode descarregar até 80% sem danos.',
  },
  {
    severity: 'WARN',
    title: 'Controlador eletrônico: componente sensível à alta temperatura',
    body: 'O controlador do motor elétrico pode superaquecer em uso intenso (subidas longas + calor). Deixe a moto "respirar" após subidas longas. Se o controlador apagar o motor por superaquecimento, aguarde 10–15 min antes de continuar.',
  },
]

const ELECTRA2000_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bateria fraca: a queixa mais comum dos proprietários',
    body: 'Baterias chumbo-ácido originais da PRIMA ELECTRA degradam rapidamente, especialmente com cargas rápidas repetidas ou em climas muito quentes. Após 2 anos, a autonomia cai 30–50%. Plano: troque por Lítio LiFePO4 quando chegar a hora.',
  },
  {
    severity: 'WARN',
    title: 'Assistência técnica: mecânicos de motos elétricas são raros',
    body: 'Não vá a qualquer mecânico: motor elétrico, controlador e BMS (gerenciador de bateria) requerem conhecimento específico. Procure técnicos em veículos elétricos ou lojas de patinetes/bikes elétricas.',
  },
  {
    severity: 'WARN',
    title: 'Freios: uso mais intenso por regeneração limitada',
    body: 'A PRIMA ELECTRA não tem freio regenerativo eficiente. Todo o frenagem é mecânica. Pastilhas e lonas desgastam como em qualquer scooter convencional. Inspecione a cada 10.000 km.',
  },
]

const ELECTRA2000_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Bateria chumbo-ácido — verificar tensão mensalmente', body: 'Tensão em repouso: 48V+ (12 células × 4V). Abaixo de 44V em repouso: bateria degradada. Troque antes de ficar na mão.' },
  { severity: 'OK', title: 'Carregamento completo — após cada uso', body: 'Nunca deixe descarregar abaixo de 20%. Tempo de carga: 6–8h (carregador padrão).' },
  { severity: 'OK', title: 'Verificação dos bornes e cabos da bateria — anual', body: 'Limpe oxidação dos terminais com lixa fina e aplique vaselina técnica.' },
  { severity: 'OK', title: 'Pastilha freio dianteiro + lona traseira — 10.000 km', body: 'Freio mecânico convencional. Pastilha < 1,5mm = troca.' },
  { severity: 'OK', title: 'Pneus (verificar tamanho) — calibrar mensalmente', body: '28–30 PSI. Verifique etiqueta do veículo.' },
  { severity: 'OK', title: 'Verificação do controlador — anual (técnico especializado)', body: 'Parâmetros de tensão e corrente. Sem oscilações ou superaquecimento.' },
  { severity: 'OK', title: 'Substituição da bateria — 2–3 anos ou quando autonomia cair >40%', body: 'Chumbo: R$400–700 (kit). Upgrade Lítio LiFePO4 48V: R$1.500–3.000.' },
]

// ─── WIN ELECTRA 1000W ────────────────────────────────────────────────────────
// Motor: Elétrico 1000W | Estilo: CUB elétrico (visual da WIN 110)
// Autonomia: ~30–40 km | Velocidade máx: ~40–45 km/h
// Bateria: chumbo-ácido 48V | Produção: ~2012–2014

const WINELECTRA_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Versão elétrica da WIN: visual CUB, motor elétrico 1000W',
    body: 'A WIN ELECTRA 1000W tem o visual da WIN 110 convencional mas com motor elétrico de 1000W e bateria 48V. Sem óleo, sem vela, sem combustível. Manutenção focada na bateria.',
  },
  {
    severity: 'WARN',
    title: 'Motor de 1000W: menos potente que a PRIMA ELECTRA 2000W',
    body: 'Com 1000W, a WIN ELECTRA tem performance limitada — mais restrita em subidas e cargas. Velocidade máxima ~40–45 km/h. Autonomia ~30–40 km. Ideal para percursos curtos e planos.',
  },
  {
    severity: 'WARN',
    title: 'Bateria chumbo-ácido: troque por Lítio LiFePO4 ao primeiro sinal de degradação',
    body: 'Mesma recomendação da PRIMA ELECTRA: a bateria chumbo degrada em 2–3 anos. Upgrade para 48V Lítio LiFePO4 (20–30Ah) aumenta autonomia e vida útil. Custo: R$1.000–2.000.',
  },
  {
    severity: 'OK',
    title: 'Corrente: a WIN ELECTRA usa corrente convencional (diferente de scooters)',
    body: 'O estilo CUB da WIN ELECTRA mantém a transmissão por corrente (diferente de scooters CVT). Lubrifique a corrente normalmente a cada 500 km. Folga 20–30mm.',
  },
]

const WINELECTRA_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Autonomia real menor que o especificado: 25–35 km reais',
    body: 'A autonomia "especificada" de elétricos é sempre em condições ideais. Na prática, com peso do piloto, vento, subidas e temperatura: WIN ELECTRA faz 25–35 km com baterias em bom estado.',
  },
  {
    severity: 'WARN',
    title: 'Componentes elétricos: difíceis de encontrar peças originais',
    body: 'Controlador, BMS e carcaça do motor são específicos. Técnicos em veículos elétricos leves (patinetes e bikes) têm mais conhecimento que mecânicos convencionais de moto.',
  },
]

const WINELECTRA_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Bateria chumbo-ácido 48V — verificar mensalmente', body: 'Tensão em repouso: 48V+. Abaixo de 44V = degradada. Carregue após cada uso.' },
  { severity: 'OK', title: 'Lubrificação corrente — 500 km', body: 'CUB elétrico: corrente convencional. Folga 20–30mm.' },
  { severity: 'OK', title: 'Pastilha / lona de freio — 10.000 km', body: 'Freio mecânico convencional.' },
  { severity: 'OK', title: 'Pneus — calibrar mensalmente', body: '26–28 PSI. Verifique etiqueta do veículo.' },
  { severity: 'OK', title: 'Troca da bateria — 2–3 anos', body: 'Chumbo ou upgrade Lítio LiFePO4 48V.' },
]

// ─── MOTOKAR FURGÃO 174cc ─────────────────────────────────────────────────────
// Motor: 174cc OHC 4T monocilíndrico, ar — Triciclo de carga
// Câmbio: 4 marchas + marcha à ré (em alguns modelos)
// 3 rodas: 2 traseiras + 1 dianteira (tipo scooter) ou 2 dianteiras (tipo rickshaw)
// Uso: entrega, transporte de carga, pequeno comércio
// Produção: ~2002–2012

const MOTOFURGAO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Triciclo de trabalho: manutenção de motor como CUB 175cc',
    body: 'O MOTOKAR FURGÃO usa motor 174cc OHC 4T monocilíndrico — similar a CUBs de 175cc. Óleo: 20W-50 JASO MA, ~1,2L. Vela: NGK C7HSA (gap 0,6–0,7mm). Carburador: VM22 ou PZ22.',
  },
  {
    severity: 'WARN',
    title: 'Balanceamento da carga: distribua o peso uniformemente na caçamba',
    body: 'Triciclo com carga mal distribuída: instabilidade em curvas e desgaste assimétrico dos pneus traseiros. Distribua a carga centralmente. Nunca ultrapasse a capacidade de carga — sobrecarrega a suspensão traseira e o eixo.',
  },
  {
    severity: 'WARN',
    title: 'Diferencial traseiro: inspecione o óleo do diferencial anualmente',
    body: 'O MOTOKAR tem diferencial no eixo traseiro. Troque o óleo do diferencial (80W-90 GL4) a cada 20.000 km. Nível baixo causa barulho e desgaste. Capacidade: verificar no manual (~0,5L).',
  },
  {
    severity: 'OK',
    title: 'Uso comercial intenso: troque o óleo do motor a cada 2.000 km',
    body: 'Uso em entrega com carga pesada diária: reduza o intervalo de troca de óleo de 3.000 km para 2.000 km. Motor trabalhando mais que em moto convencional.',
  },
  {
    severity: 'WARN',
    title: 'Pneus traseiros: calibrem mais alto com carga pesada',
    body: 'Pneus traseiros: 4.00-8" ou 3.50-8" (confirme no manual). Com carga máxima: aumente pressão traseira para 35–40 PSI. Solo (vazio): 30 PSI. Pneu baixo com carga pesada rasga lateralmente.',
  },
]

const MOTOFURGAO_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Rolamento do eixo traseiro: desgaste por carga pesada constante',
    body: 'Com uso de entrega diária com carga, os rolamentos do eixo traseiro duram 30.000–50.000 km. Sintoma: barulho de "RRRRR" vindo do eixo em velocidade. Rolamentos padrão: 6205-2RS (confirme tamanho).',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em subidas longas com carga',
    body: 'Motor 174cc em subida longa com carga máxima pode superaquecer. Sintoma: perda de potência, óleo borbulhando. Use a marcha correta (2ª ou 3ª em subidas). Troque o óleo regularmente para manter a lubrificação eficiente.',
  },
  {
    severity: 'WARN',
    title: 'Peças de transmissão e diferencial: difíceis de encontrar',
    body: 'O MOTOKAR era um produto de nicho. Peças de motor (genéricas 175cc) são fáceis. Peças do diferencial e eixo traseiro são específicas — busque em desmanches ou importadores de triciclos chineses.',
  },
]

const MOTOFURGAO_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo motor 20W-50 JASO MA (1,2L) — 2.000 km (uso carga) / 3.000 km (leve)', body: 'Motor 174cc OHC. Mineral JASO MA. Uso intenso: 2.000 km.' },
  { severity: 'OK', title: 'Vela NGK C7HSA (gap 0,6–0,7mm) — 8.000 km', body: 'Inspecionar 5.000 km.' },
  { severity: 'WARN', title: 'Óleo diferencial traseiro (80W-90 GL4, ~0,5L) — 20.000 km', body: 'Componente específico. Barulho = diferencial com problema.' },
  { severity: 'OK', title: 'Corrente — lubrificar 500 km', body: 'Folga 20–30mm. Uso intenso: lubrificar 300 km.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,05 / esc 0,08mm) — 8.000 km', body: 'Motor frio obrigatório.' },
  { severity: 'OK', title: 'Filtro de ar — limpar 5.000 km', body: 'Espuma: querosene + secar + óleo fino.' },
  { severity: 'OK', title: 'Rolamento eixo traseiro — inspecionar 30.000 km', body: 'Barulho = rolamento desgastado. Substitua antes de travar.' },
  { severity: 'OK', title: 'Pneus traseiros (4.00-8" ou 3.50-8") — calibrar semanalmente', body: 'Solo: 30 PSI. Com carga máxima: 35–40 PSI.' },
  { severity: 'WARN', title: 'Freios (tambor dianteiro + traseiros) — inspecionar 8.000 km', body: 'Lona < 2mm = troca. Ajuste o cabo de freio para curso 20–30mm no pedal.' },
]

// ─── MOTOKAR TAXI-KAR 174cc ───────────────────────────────────────────────────
// Motor: 174cc OHC 4T — versão de taxi/transporte de passageiros do MOTOKAR
// 3 rodas com carroceria de passageiros (tipo rickshaw)
// Produção: ~2002–2012

const TAXIKAR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesma mecânica do MOTOKAR FURGÃO: manutenção idêntica de motor',
    body: 'O MOTOKAR TAXI-KAR usa o mesmo motor 174cc OHC 4T do FURGÃO. Toda manutenção de motor é idêntica: óleo 20W-50 JASO MA 1,2L, vela NGK C7HSA, corrente lubrificada, folga de válvulas adm 0,05/esc 0,08mm.',
  },
  {
    severity: 'WARN',
    title: 'Carroceria de passageiros: peso total maior que o FURGÃO',
    body: 'A carroceria de passageiros mais o peso dos passageiros sobrecarrega mais o motor que a versão FURGÃO vazia. Troque o óleo a cada 2.000 km em uso de taxi intenso.',
  },
  {
    severity: 'OK',
    title: 'Passageiros: máximo de peso suportado conforme manual',
    body: 'Respeite o limite de passageiros e peso do TAXI-KAR. Sobrecarga desgasta suspensão, rolamentos e motor prematuramente. Geralmente: 2–3 passageiros adultos + piloto.',
  },
  {
    severity: 'WARN',
    title: 'Banco e estofamento: manutenção para conforto dos passageiros',
    body: 'Em uso intenso de taxi, o banco dos passageiros desgasta rapidamente. Retapeçaria com espuma rígida (D33) mantém a firmeza sem perder conforto.',
  },
]

const TAXIKAR_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Superaquecimento em roteiro de subidas com passageiros',
    body: 'Motor 174cc com passageiros em subida = alto estresse térmico. Use marchas mais baixas, não force o motor. Troque o óleo preventivamente a cada 2.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Diferencial: peça mais vulnerável ao uso intenso de taxi',
    body: 'Partidas e paradas frequentes (taxi) desgastam o diferencial mais rápido que uso de entrega. Troque o óleo do diferencial a cada 15.000 km (vs 20.000 km do FURGÃO).',
  },
]

const TAXIKAR_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo motor 20W-50 JASO MA (1,2L) — 2.000 km', body: 'Uso taxi intenso: 2.000 km. Motor 174cc OHC.' },
  { severity: 'OK', title: 'Vela NGK C7HSA — 8.000 km', body: 'Gap 0,6–0,7mm.' },
  { severity: 'WARN', title: 'Óleo diferencial (80W-90 GL4) — 15.000 km', body: 'Uso taxi: intervalo menor que FURGÃO.' },
  { severity: 'OK', title: 'Corrente — lubrificar 300 km', body: 'Uso intenso taxi: intervalo menor.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,05 / esc 0,08mm) — 8.000 km', body: 'Motor frio.' },
  { severity: 'OK', title: 'Freios (tambor) — inspecionar 6.000 km', body: 'Uso frequente parada/partida taxi: desgaste mais rápido.' },
  { severity: 'OK', title: 'Pneus (verificar tamanho no lateral) — calibrar semanalmente', body: 'Com passageiros: aumente pressão 5 PSI acima do solo.' },
]

// ─── Blocos ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'PRIMA 50',
    yearFrom: 1999, yearTo: 2012,
    MACETES: PRIMA50_MACETES,
    PROBLEMAS: PRIMA50_PROBLEMAS,
    MANUTENCAO: PRIMA50_MANUTENCAO,
  },
  {
    modelName: 'PRIMA RALLY 50cc',
    yearFrom: 2003, yearTo: 2010,
    MACETES: PRIMARALLY_MACETES,
    PROBLEMAS: PRIMARALLY_PROBLEMAS,
    MANUTENCAO: PRIMARALLY_MANUTENCAO,
  },
  {
    modelName: 'PRIMA 150',
    yearFrom: 2011, yearTo: 2015,
    MACETES: PRIMA150_MACETES,
    PROBLEMAS: PRIMA150_PROBLEMAS,
    MANUTENCAO: PRIMA150_MANUTENCAO,
  },
  {
    modelName: 'SOFT 50cc',
    yearFrom: 2011, yearTo: 2013,
    MACETES: SOFT50_MACETES,
    PROBLEMAS: SOFT50_PROBLEMAS,
    MANUTENCAO: SOFT50_MANUTENCAO,
  },
  {
    modelName: 'PRIMA ELECTRA 2000W (Elétrica)',
    yearFrom: 2012, yearTo: 2014,
    MACETES: ELECTRA2000_MACETES,
    PROBLEMAS: ELECTRA2000_PROBLEMAS,
    MANUTENCAO: ELECTRA2000_MANUTENCAO,
  },
  {
    modelName: 'WIN ELECTRA 1000W (Elétrica)',
    yearFrom: 2012, yearTo: 2014,
    MACETES: WINELECTRA_MACETES,
    PROBLEMAS: WINELECTRA_PROBLEMAS,
    MANUTENCAO: WINELECTRA_MANUTENCAO,
  },
  {
    modelName: 'MOTOKAR FURGÃO/ PICK-UP 174cc',
    yearFrom: 2002, yearTo: 2012,
    MACETES: MOTOFURGAO_MACETES,
    PROBLEMAS: MOTOFURGAO_PROBLEMAS,
    MANUTENCAO: MOTOFURGAO_MANUTENCAO,
  },
  {
    modelName: 'MOTOKAR TAXI-KAR 174cc',
    yearFrom: 2002, yearTo: 2012,
    MACETES: TAXIKAR_MACETES,
    PROBLEMAS: TAXIKAR_PROBLEMAS,
    MANUTENCAO: TAXIKAR_MANUTENCAO,
  },
]

// ─── Calibragens ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'PRIMA 50',
    yearFrom: 1999, yearTo: 2012,
    tireSize: '120/70-12 (F) · 120/70-12 (R)',
    frontPsi: 28, rearPsi: 28,
    frontPsiLoad: 28, rearPsiLoad: 32,
    notes: 'Solo: F 28 / R 28 PSI. Com carona: F 28 / R 32 PSI. Scooter 12": calibre semanalmente. Pneus originais Pirelli S83 — substitua por Michelin City Grip ou Pirelli Angel Scooter 120/70-12.',
  },
  {
    modelName: 'PRIMA RALLY 50cc',
    yearFrom: 2003, yearTo: 2010,
    tireSize: '120/70-12 (F) · 120/70-12 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 32,
    notes: 'Solo: F 26 / R 28 PSI. Com carona: F 26 / R 32 PSI. Verificar tamanho específico na etiqueta lateral do veículo.',
  },
  {
    modelName: 'PRIMA 150',
    yearFrom: 2011, yearTo: 2015,
    tireSize: '130/60-13 (F) · 130/60-13 (R)',
    frontPsi: 28, rearPsi: 28,
    frontPsiLoad: 28, rearPsiLoad: 32,
    notes: 'Solo: F 28 / R 28 PSI. Com carona: F 28 / R 32 PSI. Aro 13" — mais estável que 12" da PRIMA 50. Recomendados: Michelin City Grip 130/60-13 ou Pirelli Angel Scooter 130/60-13.',
  },
  {
    modelName: 'SOFT 50cc',
    yearFrom: 2011, yearTo: 2013,
    tireSize: '100/80-10 (F) · 100/80-10 (R)',
    frontPsi: 25, rearPsi: 28,
    frontPsiLoad: 25, rearPsiLoad: 30,
    notes: 'Solo: F 25 / R 28 PSI. Com carona: F 25 / R 30 PSI. Aro 10" compacto. Calibre semanalmente.',
  },
]

// ─── Manutenção estruturada ───────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // PRIMA 50
  { modelName: 'PRIMA 50', yearFrom: 1999, yearTo: 2012, component: 'Óleo 2T JASO FC/FD — verificar nível DIARIAMENTE', intervalKm: null, intervalMonths: null, notes: 'Motor 2T. Autolubrificante: reservatório acima do mínimo. Mistura: 20mL / litro gasolina.', priority: 'CRITICAL', order: 1 },
  { modelName: 'PRIMA 50', yearFrom: 1999, yearTo: 2012, component: 'Vela NGK B7HS (gap 0,6–0,7mm)', intervalKm: 6000, intervalMonths: null, notes: 'Motor 2T. Inspecionar 3.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'PRIMA 50', yearFrom: 1999, yearTo: 2012, component: 'Correia CVT (tipo 669/18/30)', intervalKm: 30000, intervalMonths: null, notes: 'Troca preventiva.', priority: 'HIGH', order: 3 },
  { modelName: 'PRIMA 50', yearFrom: 1999, yearTo: 2012, component: 'Rolos variador (ø15×12mm, 6g)', intervalKm: 20000, intervalMonths: null, notes: 'Ovalizados = aceleração irregular.', priority: 'MEDIUM', order: 4 },
  { modelName: 'PRIMA 50', yearFrom: 1999, yearTo: 2012, component: 'Pastilha freio disc. (diant.) + lona tras.', intervalKm: 10000, intervalMonths: null, notes: 'Inspecionar mensalmente em uso intenso.', priority: 'HIGH', order: 5 },
  { modelName: 'PRIMA 50', yearFrom: 1999, yearTo: 2012, component: 'Limpeza caixa variador (CVT)', intervalKm: 20000, intervalMonths: null, notes: 'Spray freios (seco). Nunca graxa ou óleo.', priority: 'MEDIUM', order: 6 },

  // PRIMA RALLY 50cc
  { modelName: 'PRIMA RALLY 50cc', yearFrom: 2003, yearTo: 2010, component: 'Óleo 2T JASO FC/FD — verificar DIARIAMENTE', intervalKm: null, intervalMonths: null, notes: 'Motor 2T. Mesmo critério da PRIMA 50.', priority: 'CRITICAL', order: 1 },
  { modelName: 'PRIMA RALLY 50cc', yearFrom: 2003, yearTo: 2010, component: 'Vela NGK B7HS (gap 0,6–0,7mm)', intervalKm: 6000, intervalMonths: null, notes: 'Inspecionar 3.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'PRIMA RALLY 50cc', yearFrom: 2003, yearTo: 2010, component: 'Correia CVT', intervalKm: 30000, intervalMonths: null, notes: 'Troca preventiva.', priority: 'HIGH', order: 3 },
  { modelName: 'PRIMA RALLY 50cc', yearFrom: 2003, yearTo: 2010, component: 'Rolos variador', intervalKm: 20000, intervalMonths: null, notes: 'Mesmo padrão PRIMA 50.', priority: 'MEDIUM', order: 4 },

  // PRIMA 150
  { modelName: 'PRIMA 150', yearFrom: 2011, yearTo: 2015, component: 'Óleo 20W-50 JASO MA (1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 149cc OHC 4T. NUNCA 2T. Mineral JASO MA.', priority: 'HIGH', order: 1 },
  { modelName: 'PRIMA 150', yearFrom: 2011, yearTo: 2015, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'PRIMA 150', yearFrom: 2011, yearTo: 2015, component: 'Correia CVT (confirmar dimensões)', intervalKm: 25000, intervalMonths: null, notes: 'Troca preventiva. Sintoma: perda de aceleração.', priority: 'HIGH', order: 3 },
  { modelName: 'PRIMA 150', yearFrom: 2011, yearTo: 2015, component: 'Rolos variador (~8–10g)', intervalKm: 20000, intervalMonths: null, notes: 'Ovalizados = aceleração irregular.', priority: 'MEDIUM', order: 4 },
  { modelName: 'PRIMA 150', yearFrom: 2011, yearTo: 2015, component: 'Fluido de freio DOT 4 (dianteiro)', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'PRIMA 150', yearFrom: 2011, yearTo: 2015, component: 'Pastilha freio dianteiro', intervalKm: 10000, intervalMonths: null, notes: 'Espessura mínima 1,5mm.', priority: 'MEDIUM', order: 6 },
  { modelName: 'PRIMA 150', yearFrom: 2011, yearTo: 2015, component: 'Filtro de ar — limpar 5.000 km', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma: querosene + secar + óleo. Papel: troque.', priority: 'MEDIUM', order: 7 },
  { modelName: 'PRIMA 150', yearFrom: 2011, yearTo: 2015, component: 'Limpeza carburador PD27', intervalKm: 10000, intervalMonths: 12, notes: 'Jato principal #98–102.', priority: 'MEDIUM', order: 8 },
  { modelName: 'PRIMA 150', yearFrom: 2011, yearTo: 2015, component: 'Limpeza caixa variador (CVT)', intervalKm: 20000, intervalMonths: null, notes: 'Spray freios (seco).', priority: 'MEDIUM', order: 9 },

  // SOFT 50cc
  { modelName: 'SOFT 50cc', yearFrom: 2011, yearTo: 2013, component: 'Óleo 20W-50 JASO MA (~0,7L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 49cc OHC 4T. NUNCA 2T.', priority: 'HIGH', order: 1 },
  { modelName: 'SOFT 50cc', yearFrom: 2011, yearTo: 2013, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SOFT 50cc', yearFrom: 2011, yearTo: 2013, component: 'Correia CVT', intervalKm: 15000, intervalMonths: null, notes: 'Inspecionar; troca preventiva.', priority: 'HIGH', order: 3 },
  { modelName: 'SOFT 50cc', yearFrom: 2011, yearTo: 2013, component: 'Rolos variador (~6g)', intervalKm: 15000, intervalMonths: null, notes: 'Ovalizados = aceleração irregular.', priority: 'MEDIUM', order: 4 },
  { modelName: 'SOFT 50cc', yearFrom: 2011, yearTo: 2013, component: 'Filtro de ar — limpar 5.000 km', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma: querosene + secar + óleo fino.', priority: 'MEDIUM', order: 5 },

  // PRIMA ELECTRA 2000W
  { modelName: 'PRIMA ELECTRA 2000W (Elétrica)', yearFrom: 2012, yearTo: 2014, component: 'Bateria chumbo-ácido 48V — verificar tensão', intervalKm: null, intervalMonths: 1, notes: 'Tensão em repouso: 48V+. Abaixo de 44V: bateria degradada.', priority: 'HIGH', order: 1 },
  { modelName: 'PRIMA ELECTRA 2000W (Elétrica)', yearFrom: 2012, yearTo: 2014, component: 'Carregamento completo após cada uso', intervalKm: null, intervalMonths: null, notes: 'Nunca deixar descarregar abaixo de 20%.', priority: 'HIGH', order: 2 },
  { modelName: 'PRIMA ELECTRA 2000W (Elétrica)', yearFrom: 2012, yearTo: 2014, component: 'Bornes e cabos da bateria — inspecionar', intervalKm: null, intervalMonths: 12, notes: 'Limpar oxidação. Vaselina técnica nos terminais.', priority: 'MEDIUM', order: 3 },
  { modelName: 'PRIMA ELECTRA 2000W (Elétrica)', yearFrom: 2012, yearTo: 2014, component: 'Pastilha freio dianteiro + lona traseira', intervalKm: 10000, intervalMonths: null, notes: 'Freio mecânico convencional.', priority: 'MEDIUM', order: 4 },
  { modelName: 'PRIMA ELECTRA 2000W (Elétrica)', yearFrom: 2012, yearTo: 2014, component: 'Substituição da bateria', intervalKm: null, intervalMonths: 36, notes: 'Chumbo: 2–3 anos. Upgrade Lítio LiFePO4 48V: R$1.500–3.000.', priority: 'HIGH', order: 5 },

  // WIN ELECTRA 1000W
  { modelName: 'WIN ELECTRA 1000W (Elétrica)', yearFrom: 2012, yearTo: 2014, component: 'Bateria chumbo-ácido 48V — verificar tensão', intervalKm: null, intervalMonths: 1, notes: 'Tensão em repouso: 48V+. Carregue após cada uso.', priority: 'HIGH', order: 1 },
  { modelName: 'WIN ELECTRA 1000W (Elétrica)', yearFrom: 2012, yearTo: 2014, component: 'Lubrificação corrente (elétrica CUB)', intervalKm: 500, intervalMonths: null, notes: 'Corrente convencional. Folga 20–30mm.', priority: 'MEDIUM', order: 2 },
  { modelName: 'WIN ELECTRA 1000W (Elétrica)', yearFrom: 2012, yearTo: 2014, component: 'Pastilha / lona de freio', intervalKm: 10000, intervalMonths: null, notes: 'Freio mecânico convencional.', priority: 'MEDIUM', order: 3 },
  { modelName: 'WIN ELECTRA 1000W (Elétrica)', yearFrom: 2012, yearTo: 2014, component: 'Substituição da bateria', intervalKm: null, intervalMonths: 36, notes: 'Chumbo: 2–3 anos. Upgrade Lítio LiFePO4 48V.', priority: 'HIGH', order: 4 },

  // MOTOKAR FURGÃO
  { modelName: 'MOTOKAR FURGÃO/ PICK-UP 174cc', yearFrom: 2002, yearTo: 2012, component: 'Óleo motor 20W-50 JASO MA (1,2L)', intervalKm: 2000, intervalMonths: 6, notes: 'Uso carga intenso: 2.000 km. Motor 174cc OHC.', priority: 'HIGH', order: 1 },
  { modelName: 'MOTOKAR FURGÃO/ PICK-UP 174cc', yearFrom: 2002, yearTo: 2012, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'MOTOKAR FURGÃO/ PICK-UP 174cc', yearFrom: 2002, yearTo: 2012, component: 'Óleo diferencial traseiro (80W-90 GL4, ~0,5L)', intervalKm: 20000, intervalMonths: null, notes: 'Componente específico. Verificar nível anualmente.', priority: 'HIGH', order: 3 },
  { modelName: 'MOTOKAR FURGÃO/ PICK-UP 174cc', yearFrom: 2002, yearTo: 2012, component: 'Lubrificação corrente — 500 km', intervalKm: 500, intervalMonths: null, notes: 'Uso intenso: 300 km. Folga 20–30mm.', priority: 'HIGH', order: 4 },
  { modelName: 'MOTOKAR FURGÃO/ PICK-UP 174cc', yearFrom: 2002, yearTo: 2012, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'MOTOKAR FURGÃO/ PICK-UP 174cc', yearFrom: 2002, yearTo: 2012, component: 'Freios (tambor diant. + tras.) — inspecionar', intervalKm: 8000, intervalMonths: 12, notes: 'Lona < 2mm = troca. Ajuste cabo freio.', priority: 'HIGH', order: 6 },
  { modelName: 'MOTOKAR FURGÃO/ PICK-UP 174cc', yearFrom: 2002, yearTo: 2012, component: 'Filtro de ar — limpar 5.000 km', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma: querosene + secar + óleo fino.', priority: 'MEDIUM', order: 7 },
  { modelName: 'MOTOKAR FURGÃO/ PICK-UP 174cc', yearFrom: 2002, yearTo: 2012, component: 'Rolamento eixo traseiro — inspecionar 30.000 km', intervalKm: 30000, intervalMonths: null, notes: 'Barulho = desgaste. Rolamento 6205-2RS (confirme tamanho).', priority: 'MEDIUM', order: 8 },

  // MOTOKAR TAXI-KAR
  { modelName: 'MOTOKAR TAXI-KAR 174cc', yearFrom: 2002, yearTo: 2012, component: 'Óleo motor 20W-50 JASO MA (1,2L)', intervalKm: 2000, intervalMonths: 6, notes: 'Uso taxi intenso: 2.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'MOTOKAR TAXI-KAR 174cc', yearFrom: 2002, yearTo: 2012, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'MOTOKAR TAXI-KAR 174cc', yearFrom: 2002, yearTo: 2012, component: 'Óleo diferencial traseiro (80W-90 GL4)', intervalKm: 15000, intervalMonths: null, notes: 'Uso taxi: intervalo menor que FURGÃO.', priority: 'HIGH', order: 3 },
  { modelName: 'MOTOKAR TAXI-KAR 174cc', yearFrom: 2002, yearTo: 2012, component: 'Lubrificação corrente — 300 km (taxi intenso)', intervalKm: 300, intervalMonths: null, notes: 'Paradas/partidas frequentes desgastam mais.', priority: 'HIGH', order: 4 },
  { modelName: 'MOTOKAR TAXI-KAR 174cc', yearFrom: 2002, yearTo: 2012, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'MOTOKAR TAXI-KAR 174cc', yearFrom: 2002, yearTo: 2012, component: 'Freios (tambor) — inspecionar 6.000 km', intervalKm: 6000, intervalMonths: null, notes: 'Uso taxi: freadas frequentes. Lona < 2mm = troca urgente.', priority: 'HIGH', order: 6 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🛵  Seed Kasinski Scooters + Elétricos + Motokar...')

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

  console.log('✅ Kasinski Scooters/Elétricos/Motokar concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
