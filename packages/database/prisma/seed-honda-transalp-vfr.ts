// seed-honda-transalp-vfr.ts — Honda adventure tourers + VFR sport tourers
// XL 700V TRANSALP (2008–2012) | XL 750 TRANSALP (2023+) | XL 1000V VARADERO (2003–2013)
// VFR 1200F (2010–2016) | VFR 1200X CROSSTOURER (2012–2018)
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

// ─── XL 700V TRANSALP (2008–2012) ────────────────────────────────────────────
// Motor: 680cc DOHC parallel twin 8v liquid-cooled | 61 cv @ 8.000 rpm
// Óleo: 10W-30 JASO MA2, 2,5 L (serviço) / 3,0 L (completo)
// Vela: NGK IZFR6K-11 iridium (×2) gap 1,0 mm | Pneus: 110/80-19 (F) / 130/80-17 (R)
// Bateria: YTX14-BS | Tanque: 17,7 L | ABS disponível | 6 marchas

const XL700V_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — 2,5 L (serviço) / 3,0 L (completo); a cada 8.000 km',
    body: 'Motor 680cc DOHC parallel twin: 10W-30 JASO MA2 full sintético. Honda HP4 ou Motul 7100. Capacidade: 2,5 L (troca com filtro) / 3,0 L (enchimento inicial). Intervalo: 8.000 km. Para viagens longas com carga total: troque o óleo antes de partir se estiver próximo do intervalo. O Transalp é usadíssimo em viagens Brasil-Argentina-Colômbia — óleo fresco é essencial. Verifique o nível a cada parada de abastecimento em viagem.',
  },
  {
    severity: 'OK',
    title: 'Velas iridium NGK IZFR6K-11 — gap 1,0 mm; 2 velas; 16.000 km',
    body: '2 velas IZFR6K-11 (R$70–100 cada). Gap: 1,00 mm. Acesso: remover a carenagem lateral para o cilindro traseiro (embutido sob o tanque). O Transalp tem motor em V inclinado em 52° — cilindro dianteiro acessível, traseiro exige desmontagem parcial. Troca em conjunto. Sintomas de vela desgastada em viagem: perda de potência notável em altitudes altas (Andes, Serra Gaúcha) — a mistura já empobrecida destaca a falha de ignição.',
  },
  {
    severity: 'OK',
    title: 'Pneus 110/80-19 (F) / 130/80-17 (R) — combinação adventure; pressão específica',
    body: 'Pneus de perfil alto (80%) em aros 19/17 — excelentes em off-road leve e irregularidades. Para uso misto (70% asfalto / 30% terra): Michelin Anakee 3 ou Metzeler Tourance Next. Para off-road sério: Pirelli Scorpion Rally STR. Pressão: F 29 / R 33 PSI solo; R 36 PSI com garupa + bagagem. Em terra: F 23 / R 26 PSI. Os pneus 19/17 dão excelente absorção de solavancos — vantagem clara da TRANSALP vs motos 17/17.',
  },
  {
    severity: 'OK',
    title: 'Tanque 17,7 L — autonomia real 450–520 km com pilotagem econômica',
    body: 'Consumo real: 22–28 km/L (misto aventureiro). Autonomia: 400–500 km. A TRANSALP é famosa pela autonomia em viagens: com vento contrário e carga (alforjes + bolsa) o consumo sobe para 18–20 km/L. A luz de reserva acende com ~3 L. Em serras e altitudes: consumo piora ligeiramente (ar rarefeito, mistura mais rica necessária). Para maximizar: pilotagem em 4.500–6.000 rpm (faixa de torque eficiente do twin de baixa rotação).',
  },
  {
    severity: 'OK',
    title: 'Suspensão adventurosa — ajuste para carga total em viagens',
    body: 'Garfo dianteiro 43 mm: ajuste de pré-carga (parafuso no topo). Amortecedor traseiro: pré-carga via rosca (solo: 1–2; garupa + alforjes: 3–4 de 5 voltas). Para uso off-road: endureça a compressão (máximo 2 cliques). Para estrada longa: suavize a rebatida para conforto. A TRANSALP tem um dos melhores equilíbrios estrada/off-road do segmento até 700cc — respeite os limites da suspensão: é adventure intermediária, não enduro.',
  },
]

const XL700V_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Retificador/regulador — falha crônica na XL 700V; verificação essencial',
    body: 'A XL 700V TRANSALP compartilha o sistema de carga com outros I2/V2 Honda da mesma geração e tem o mesmo ponto fraco: retificador original falha. Em viagem: bateria sem carga ou sobrecarga são as situações mais perigosas. Leve sempre um multímetro de bolso. Diagnóstico: 13,5–14,5V a 4.000 rpm. Substitua preventivamente após 50.000 km: Chiaratto ou Mosfet (R$150–300). Colete de tour com ferramentas mínimas + carregador solar como backup em viagens longas.',
  },
  {
    severity: 'WARN',
    title: 'Peças difíceis de encontrar em alguns estados — planeje revisões antes de viagens',
    body: 'A XL 700V foi descontinuada em 2012. Peças de motor na rede Honda existem, mas com prazo de 1–3 semanas em algumas regiões. Para viagens internacionais: leve kit de velas, filtro de óleo, corrente e pastilhas. As peças elétricas (retificador, estator) podem demorar. Comunidade TRANSALP Brasil (Facebook + ADVBrasil.com) é excelente para informações sobre fornecedores regionais.',
  },
  {
    severity: 'OK',
    title: 'Motor V-twin 52° — aquecimento assimétrico; cilindro traseiro mais quente',
    body: 'O cilindro traseiro da XL 700V (em V 52°, posicionado sob o tanque) aquece mais que o dianteiro. Em trânsito urbano prolongado ou subidas longas: ventilador do radiador liga para compensar. Deixe o motor em marcha lenta por 1–2 min após parada em calor antes de desligar (heat soak). Óleo de qualidade é especialmente importante para o cilindro traseiro — degradação por temperatura alta é acelerada.',
  },
]

// ─── XL 750 TRANSALP (2023+) ─────────────────────────────────────────────────
// Motor: 755cc SOHC parallel twin 8v liquid-cooled (plataforma nova) | 91,5 cv @ 9.500 rpm
// Óleo: 10W-30 JASO MA2, 2,9 L (serviço) / 3,4 L (completo)
// Vela: NGK IZFR6K-11 iridium (×2) gap 1,0 mm | Pneus: 110/80-19 (F) / 150/70-17 (R)
// ABS + HSTC de série | DCT disponível | Tanque: 16,5 L | 6 marchas

const XL750_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — 2,9 L (serviço) / 3,4 L (completo); a cada 8.000 km',
    body: 'Motor 755cc SOHC parallel twin de nova geração (não derivado da XL 700V). Usa 10W-30 JASO MA2 full sintético. Honda HP4 ou Motul 7100. Intervalo: 8.000 km. A XL 750 tem motor significativamente mais potente que a XL 700V (91,5 cv vs 61 cv): exige óleo de qualidade. Versão DCT: o óleo é compartilhado com a caixa automática — troca pontual ainda mais importante. Verificar nível pelo visor lateral direito.',
  },
  {
    severity: 'OK',
    title: 'ABS + HSTC de série — HSTC desabilitável para off-road; configurações de modos de marcha',
    body: 'XL 750 tem ABS (1 canal frontal / 2 canais estrada) e HSTC (controle de tração Honda). Em off-road: desative o HSTC pelo painel para permitir alguma patinagem controlada da roda traseira. 3 modos: Tour (confort + tração moderada), Sport (resposta mais rápida), Gravel (para off-road, ABS traseiro relaxado). Use Gravel em terra — ABS traseiro 2 canais em off-road pode causar travamento indesejado.',
  },
  {
    severity: 'OK',
    title: 'Pneus 110/80-19 (F) / 150/70-17 (R) — nova geração tem traseiro 150 (mais agarre em asfalto)',
    body: 'XL 750 usa pneu traseiro 150/70-17 (vs 130/80-17 da XL 700V): mais agarre em asfalto molhado. Frente: 110/80-19 mantém off-road. Pneus de origem: Metzeler Tourance Next 2 ou Michelin Anakee Adventure. Pressão: F 29 / R 33 PSI solo; R 36 PSI com carga total. Off-road: F 22 / R 25 PSI. Com 91,5 cv, a XL 750 "come" pneus traseiros mais rápido que a 700V em uso esportivo na estrada. Troca: 15.000–20.000 km (traseiro); 20.000–25.000 km (dianteiro).',
  },
]

const XL750_PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'XL 750 TRANSALP: modelo recente (2023+) com excelente qualidade de fábrica',
    body: 'A XL 750 é uma das motos mais bem avaliadas do segmento adventure 700–850cc. Problemas graves não documentados até 2025. Ponto de atenção para motos 2023: atualizar o software da ECU na concessionária — Honda frequentemente lança maps revisados nos primeiros 12 meses de um novo modelo. Garantia Honda: 2 anos. Reporte qualquer anomalia à concessionária durante a garantia para registro.',
  },
  {
    severity: 'WARN',
    title: 'Manutenção do DCT (versão automática): exige scanner Honda para diagnóstico',
    body: 'A versão DCT da XL 750 TRANSALP (quando disponível no Brasil) não deve ser enviada a oficinas sem treinamento Honda. O sistema DCT requer scanner HDS para diagnóstico de falhas no módulo de embreagem. Custo de manutenção do DCT é maior que o câmbio manual — considere isso na decisão de compra. DCT da Honda nesta geração tem vida útil superior às 150.000 km com manutenção adequada (óleo em dia).',
  },
]

// ─── XL 1000V VARADERO (2003–2013) ───────────────────────────────────────────
// Motor: 996cc 90° V-twin DOHC 8v liquid-cooled | 95 cv @ 8.000 rpm
// Óleo: 10W-30 JASO MA2, 3,5 L (serviço) / 4,0 L (completo)
// Vela: NGK IZFR5K-11 iridium (×2) gap 1,0 mm | Pneus: 110/80-19 (F) / 150/70-17 (R)
// Bateria: YTX14L-BS | Tanque: 25 L (!!) | ABS disponível

const VARADERO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — 3,5 L (serviço) / 4,0 L (completo); a cada 8.000 km',
    body: 'Motor 996cc V-twin DOHC: 10W-30 JASO MA2 full sintético. Capacidade: 3,5 L com troca do filtro. Para uso em viagens longas (muito aquecimento do motor): Motul 7100 10W-30 ou Motul 300V 10W-40. Intervalo: 8.000 km. V-twin 90° tem aquecimento mais uniforme que os 52° do Transalp, mas o cilindro traseiro ainda aquece mais. Motor de 95 cv é potente — troca em dia é seguro para o touring.',
  },
  {
    severity: 'OK',
    title: 'Tanque 25 L — autonomia excepcional de 500–650 km; uma das maiores do segmento',
    body: 'A Varadero tem um dos maiores tanques entre motos de estrada (25 L). Consumo real: 18–24 km/L. Autonomia real: 450–550 km com pilotagem mista. Em uso econômico (110 km/h): 550–650 km em um único abastecimento. Atenção: tanque cheio + piloto + alforjes = ~300+ kg total. Peso influencia a frenagem e as curvas. A luz de reserva acende com ~3 L (~65 km). Excelente para viagens no interior do Brasil onde postos são espaçados.',
  },
  {
    severity: 'OK',
    title: 'Motor V-twin 996cc: torque abundante a partir de 3.500 rpm — pilotagem em baixa rotação',
    body: 'O V-twin 996cc da Varadero produz torque máximo (95 Nm) em 6.000 rpm. Para touring confortável: mantenha 4.000–5.500 rpm. A moto funciona bem em 4ª em estrada (60–80 km/h) sem esforço. Aceleração brusca em 3ª ou 4ª a baixa velocidade pode causar "solavanco" — característica do twin V de longo curso. Faixa verde: 4.000–7.500 rpm. Limite de rpm: 10.000 rpm (não recomendado para touring).',
  },
  {
    severity: 'OK',
    title: 'Suspensão de alto curso (220 mm dianteiro / 175 mm traseiro) — pilotagem aventureira real',
    body: 'Varadero tem um dos maiores cursos de suspensão do segmento adventure. Dianteiro: garfo 45 mm com 220 mm. Traseiro: monoshock com 175 mm. Para carga total: aumente pré-carga traseira (3–4 de 5 voltas). Off-road leve: excele. Off-road pesado: o peso de 235 kg (cheio) é desvantagem. Altura do assento: 845 mm (alta para iniciantes). Suspensão: troca de óleo do garfo a cada 20.000 km (10 wt).',
  },
]

const VARADERO_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Peso de 235 kg cheio: exige prática para manobras lentas; cuidado em curvas apertadas',
    body: 'Com tanque cheio (25 L de gasolina = 18,5 kg só do combustível) + alforjes cheios: facilmente 280–300 kg totais. Moto pesada em manobra. Curva em U em estacionamento: precisa de espaço generoso. Queda em baixa velocidade: sozinho é difícil levantar (270 kg com piloto). Aprendizado: pratique baixa velocidade em espaço aberto antes de viajar. Cavalete lateral: verifique sempre que o chão está nivelado antes de estacionar.',
  },
  {
    severity: 'WARN',
    title: 'Cilindro traseiro com superaquecimento em trânsito urbano prolongado',
    body: 'V-twin 90°: cilindro traseiro (central) é mais difícil de resfriar. Em trânsito parado por 15+ min em dia quente: temperatura sobe. O ventilador do radiador compensa, mas em calor extremo: monitore o painel de temperatura. Sintoma de problema: temperatura máxima + motor falhando em baixa rotação. Solução imediata: saia do trânsito e deixe em marcha lenta por 3–5 min. Para uso predominantemente urbano: Varadero não é a escolha ideal.',
  },
  {
    severity: 'WARN',
    title: 'Peças de reposição com disponibilidade reduzida (descontinuada em 2013)',
    body: 'Varadero foi descontinuada. Peças de motor ainda disponíveis via rede Honda com prazo de 1–2 semanas. Peças de carenagem: muito caras ou difíceis (caixa de farol LED é item caro). Recomendação: ao comprar usada, inspecione carenagem e eletrônica cuidadosamente. Mangueiras e vedações: inspecione em motos com mais de 10 anos (material borracha resseca). Comunidade Varadero Brasil: ativa no Facebook.',
  },
]

// ─── VFR 1200F (2010–2016) ────────────────────────────────────────────────────
// Motor: 1237cc DOHC V4 76° liquid-cooled | 172 cv @ 10.000 rpm | 132 Nm @ 8.750 rpm
// Óleo: 10W-30 JASO MA2, 4,3 L (serviço) | Pneus: 120/70-ZR17 (F) / 190/55-ZR17 (R)
// Bateria: YTZ14S | Tanque: 18,5 L | ABS + CBS Honda de série | DCT disponível
// Transmissão: 6 marchas manuais ou DCT

const VFR1200F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 full sintético — 4,3 L; a cada 8.000 km; V4 complexo exige qualidade',
    body: 'Motor V4 1237cc com 172 cv: use exclusivamente 10W-30 JASO MA2 full sintético de alta qualidade. Capacidade: 4,3 L. Motul 300V 10W-40 ou Mobil 1 Racing 10W-30. Intervalo: 8.000 km. O V4 Honda tem ângulo de bancada de 76° — lubrificação dos cilindros externos é mais exigida. Óleo degradado em V4 de alta performance causa desgaste desigual nos assentos de válvulas. Nunca estenda o intervalo acima de 10.000 km — motor de 172 cv não perdoa.',
  },
  {
    severity: 'OK',
    title: 'Motor V4 — a configuração mais refinada da Honda; som característico; 4 escapamentos',
    body: 'O VFR 1200F usa o motor V4 76° com sistema de palhetas de admissão (sem corrente dupla de fase diferente como o V4 90°). Resultado: som V4 suave e alto torque. A configuração de 4 escapamentos (2+2 para baixo, depois combinando) é parte do design. Parafusos e juntas do coletor de escapamento: verifique vazamentos acústicos (sopros) a cada 20.000 km. As juntas de grafite têm vida útil limitada com o calor do V4.',
  },
  {
    severity: 'OK',
    title: 'ABS + CBS Honda — sistema combinado avançado; purge anual com scanner',
    body: 'O VFR 1200F tem sistema C-ABS (Combined ABS) com distribuição de freio frontal/traseiro integrada. O C-ABS é mais complexo que ABS simples: requer purge com scanner HDS para garantir que o fluido seja trocado nos acumuladores. Fluido DOT 4 Honda: troca anual em uso esportivo ou a cada 2 anos em uso touring. Pastilhas dianteiras: EBC HH series para pinça radial Nissin de 6 pistões. Disco dianteiro 320 mm + traseiro 276 mm.',
  },
  {
    severity: 'OK',
    title: 'Pneu traseiro 190/55-ZR17 — largo; exige pneus de alta performance; custo elevado',
    body: 'O pneu traseiro 190/55-ZR17 é um dos mais largos do mercado para motos de estrada. Michelin Pilot Power 4S, Bridgestone Battlax RS11, Pirelli Diablo Supercorsa SP. O pneu 190 custa R$800–1.200 o traseiro só. Vida útil: 10.000–14.000 km (traseiro com 172 cv). Pressão: F 36 / R 42 PSI. Em uso puramente touring: Michelin Road 6 GT leva 15.000–18.000 km atrás.',
  },
  {
    severity: 'OK',
    title: 'DCT VFR 1200F — embreagem dupla com modos Tour/Sport/Manual; diferente do NC 750X',
    body: 'O DCT do VFR 1200F é uma versão mais avançada que o do NC 750X, com modos Tour, Sport e Manual (via paddle ou alavanca). No modo Manual: trocas por paddle no guidão (esquerda = reduzir, direita = subir). Para pilotagem esportiva: modo S + manual dá o melhor dos dois mundos. Para estrada: modo Tour com trocas suaves. Manutenção DCT: óleo em dia é crítico — o câmbio de 172 cv tem muito mais torque para transmitir que o NC 750X de 54 cv.',
  },
]

const VFR1200F_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Manutenção V4 com custo elevado — calcule o custo total antes de comprar',
    body: 'VFR 1200F: custo de revisão completa entre os mais altos do mercado. Estimativa de revisão com velas (×4) + filtro + óleo + fluido de freio: R$2.000–3.000. Regulagem de válvulas V4 (shims): R$1.000–1.500 em mão de obra. Pneus: R$1.000–1.500 por conjunto. Pastilhas: R$400–600 o conjunto. Custo anual de manutenção conservador: R$2.500–4.000. É uma moto de alto padrão com custo de manutenção condizente.',
  },
  {
    severity: 'WARN',
    title: 'Velas de difícil acesso no V4 — troca exige desmontagem significativa',
    body: 'As 4 velas do VFR 1200F têm acesso muito trabalhoso: é necessário remover quase toda a carenagem dianteira + tanque + suporte do tanque. Custo de mão de obra apenas para a troca das velas: R$600–1.000. Justifica fazer tudo junto (velas + revisão de válvulas + filtros). Com iridium: troca a cada 20.000 km mitiga o custo diluindo as visitas. Oficinas sem experiência com VFR: risco de dano à carenagem durante a desmontagem.',
  },
  {
    severity: 'OK',
    title: 'Carenagem cara e específica — slots e peças exclusivas; difícil reposição',
    body: 'Carenagem do VFR 1200F é específica e cara. Peças originais custam R$500–2.000 por painel. Em um tombo sem proteção: carenagem pode somar R$5.000–15.000 em danos. Sliders de chassi (crashpads): investimento obrigatório (R$400–700 o kit). O design com quatro saídas de escape compõe a carenagem — dano em uma seção afeta toda a estética. Peças de desmanche em São Paulo (Brás) ou MG.',
  },
]

// ─── VFR 1200X CROSSTOURER (2012–2018) ───────────────────────────────────────
// Motor: mesmo 1237cc V4 76° | Mais voltada para adventure touring
// Pneus: 120/70-17 (F) / 180/55-17 (R) (menores que o VFR 1200F)
// DCT de série | Tanque: 18,5 L | Altura assento: 830 mm | ABS

const VFR1200X_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'VFR 1200X CROSSTOURER: mesmo V4, postura upright — versão touring premium da família',
    body: 'A VFR 1200X usa o mesmo motor V4 1237cc do VFR 1200F, mas com postura ereta (upright) de adventure tourer. Toda a manutenção de motor é idêntica: óleo 10W-30 JASO MA2 (4,3 L), velas V4 iridium a cada 20.000 km, regulagem de válvulas a cada 24.000 km. A diferença está nas pneus (120/70-17 / 180/55-17 vs 120/70-17 / 190/55-17 do F) e na suspensão mais suave (touring) e no DCT de série.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70-17 (F) / 180/55-17 (R) — touring adventure; mais escolhas que o 190mm do 1200F',
    body: 'Com pneu traseiro 180/55-17 (vs 190mm do VFR 1200F), a XCrosstourer tem mais opções de pneu e custo ligeiramente menor. Michelin Road 5 GT, Bridgestone Battlax T32 GT, Metzeler Roadtec 02. Custo: R$600–900 o traseiro. Vida útil: 15.000–18.000 km (traseiro touring). Pressão: F 33 / R 39 PSI solo; R 42 PSI com garupa + bagagem. Para a Crosstourer com uso de viagem: Michelin Road 6 GT é escolha natural.',
  },
  {
    severity: 'OK',
    title: 'DCT de série na Crosstourer — operação ideal para viagens; configure modos de acordo com o trecho',
    body: 'A VFR 1200X vem com DCT de série — não há versão manual no Brasil. Em viagens longas: modo Tour é o mais confortável (trocas suaves em alto rpm). Em serras e curvas: modo S (Sport) com intervenção manual pelos paddles dá mais controle. No modo S em subidas: DCT antecipa as reduções ao frear — muito eficiente. Peso da Crosstourer: 260 kg (cheio) — o DCT facilita o manuseio em manobras lentas (sem embreagem).',
  },
]

const VFR1200X_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Peso de 260 kg — significativo para off-road mesmo que seja "crosstourer"',
    body: 'A VFR 1200X CROSSTOURER é uma tourer com estética adventure, não uma adventure de verdade. 260 kg de peso limita o off-road real. Pneus 17/17 também não são ideais para terra pesada. Para uso predominante em asfalto + estrada de terra compactada: excelente. Para off-road sério: considere Africa Twin ou XL 750 Transalp. A 1200X brilha em rodovias europeias/sul-americanas com asfalto de qualidade.',
  },
  {
    severity: 'WARN',
    title: 'Manutenção DCT em motor de 172 cv: não economize em óleo ou intervalo',
    body: 'O DCT transmitindo 172 cv de V4 é muito mais exigente que o DCT do NC 750X (54 cv). Óleo degradado causa desgaste nas embreagens duplas. Use exclusivamente 10W-30 JASO MA2 full sintético, troque a cada 8.000 km. Custo de revisão do módulo DCT em falha: R$3.000–8.000 (peças + mão de obra). Prevenção é muito mais barata que a revisão.',
  },
]

// ─── Manutenções ──────────────────────────────────────────────────────────────

const TRANSALP700_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'XL 700V TRANSALP', yearFrom: 2008, yearTo: 2012, component: 'Óleo 10W-30 JASO MA2 (2,5 L serviço / 3,0 L completo)', intervalKm: 8000, intervalMonths: 12, notes: 'Full sintético. Honda HP4 ou Motul 7100.', priority: 'HIGH', order: 1 },
  { modelName: 'XL 700V TRANSALP', yearFrom: 2008, yearTo: 2012, component: 'Velas NGK IZFR6K-11 iridium (×2) — gap 1,0 mm', intervalKm: 16000, intervalMonths: null, notes: 'Cilindro traseiro: desmontagem parcial. Troca em conjunto.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XL 700V TRANSALP', yearFrom: 2008, yearTo: 2012, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50. Inspecionar mangueiras.', priority: 'HIGH', order: 3 },
  { modelName: 'XL 700V TRANSALP', yearFrom: 2008, yearTo: 2012, component: 'Pastilhas dianteiras ABS + fluido DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Inspecionar a cada 7.000 km. DOT 4: bienal.', priority: 'HIGH', order: 4 },
  { modelName: 'XL 700V TRANSALP', yearFrom: 2008, yearTo: 2012, component: 'Retificador/regulador — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: '13,5–14,5V a 4.000 rpm. Substituição preventiva após 50.000 km.', priority: 'HIGH', order: 5 },
  { modelName: 'XL 700V TRANSALP', yearFrom: 2008, yearTo: 2012, component: 'Kit transmissão (corrente + pinhão + coroa)', intervalKm: 25000, intervalMonths: null, notes: 'Lubrificar a cada 600 km. Folga: 25–35 mm.', priority: 'HIGH', order: 6 },
]

const TRANSALP750_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'XL 750 TRANSALP', yearFrom: 2023, yearTo: null, component: 'Óleo 10W-30 JASO MA2 (2,9 L serviço / 3,4 L completo)', intervalKm: 8000, intervalMonths: 12, notes: 'Full sintético. DCT compartilha o óleo — qualidade obrigatória.', priority: 'HIGH', order: 1 },
  { modelName: 'XL 750 TRANSALP', yearFrom: 2023, yearTo: null, component: 'Velas NGK IZFR6K-11 iridium (×2) — gap 1,0 mm', intervalKm: 16000, intervalMonths: null, notes: 'Motor novo SOHC. Acesso melhor que o XL 700V.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XL 750 TRANSALP', yearFrom: 2023, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50.', priority: 'HIGH', order: 3 },
  { modelName: 'XL 750 TRANSALP', yearFrom: 2023, yearTo: null, component: 'ABS + HSTC — fluido DOT 4 bienal', intervalKm: null, intervalMonths: 24, notes: 'ABS 2 canais + HSTC de série. Purge guiado com scanner.', priority: 'HIGH', order: 4 },
  { modelName: 'XL 750 TRANSALP', yearFrom: 2023, yearTo: null, component: 'Kit transmissão (corrente + pinhão + coroa)', intervalKm: 25000, intervalMonths: null, notes: 'Lubrificar a cada 600 km. Motor de 91,5 cv: inspecionar mais frequentemente.', priority: 'HIGH', order: 5 },
]

const VARADERO_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'XL 1000V VARADERO', yearFrom: 2003, yearTo: 2013, component: 'Óleo 10W-30 JASO MA2 (3,5 L serviço / 4,0 L completo)', intervalKm: 8000, intervalMonths: 12, notes: 'V-twin 996cc: full sintético. Motul 7100 recomendado.', priority: 'HIGH', order: 1 },
  { modelName: 'XL 1000V VARADERO', yearFrom: 2003, yearTo: 2013, component: 'Velas NGK IZFR5K-11 iridium (×2) — gap 1,0 mm', intervalKm: 16000, intervalMonths: null, notes: 'Cilindro traseiro: acesso difícil. Troca em conjunto.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XL 1000V VARADERO', yearFrom: 2003, yearTo: 2013, component: 'Fluido de arrefecimento — troca + inspeção de mangueiras', intervalKm: null, intervalMonths: 24, notes: 'Mangueiras de borracha envelhecem em motos 10+ anos. Substituir se ressecadas.', priority: 'HIGH', order: 3 },
  { modelName: 'XL 1000V VARADERO', yearFrom: 2003, yearTo: 2013, component: 'Pastilhas dianteiras + fluido DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Disco 296 mm. Inspecionar a cada 7.000 km.', priority: 'HIGH', order: 4 },
  { modelName: 'XL 1000V VARADERO', yearFrom: 2003, yearTo: 2013, component: 'Óleo do garfo (10 wt) + vedações', intervalKm: 20000, intervalMonths: null, notes: 'Garfo 45 mm com longo curso. Vedações: 30.000 km ou ao notar vazamento.', priority: 'MEDIUM', order: 5 },
]

const VFR1200F_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'VFR 1200F', yearFrom: 2010, yearTo: 2016, component: 'Óleo 10W-30 JASO MA2 full sintético (4,3 L)', intervalKm: 8000, intervalMonths: 12, notes: 'V4 172 cv: Motul 300V 10W-40 ou Mobil 1 Racing. DCT (onde aplicável): compartilha o óleo.', priority: 'CRITICAL', order: 1 },
  { modelName: 'VFR 1200F', yearFrom: 2010, yearTo: 2016, component: 'Velas iridium V4 (×4) — gap específico', intervalKm: 20000, intervalMonths: null, notes: '4 velas. Acesso: desmontagem significativa. Fazer junto com revisão de válvulas.', priority: 'HIGH', order: 2 },
  { modelName: 'VFR 1200F', yearFrom: 2010, yearTo: 2016, component: 'Regulagem de válvulas V4 DOHC 16v', intervalKm: 24000, intervalMonths: null, notes: 'Por shims. Oficina VFR especializada. Custo: R$1.000–1.500 mão de obra.', priority: 'CRITICAL', order: 3 },
  { modelName: 'VFR 1200F', yearFrom: 2010, yearTo: 2016, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50.', priority: 'HIGH', order: 4 },
  { modelName: 'VFR 1200F', yearFrom: 2010, yearTo: 2016, component: 'C-ABS Honda — fluido DOT 4 + purge scanner', intervalKm: null, intervalMonths: 12, notes: 'Sistema C-ABS complexo: purge anual com HDS scanner. Pastilhas Nissin 6 pistões.', priority: 'HIGH', order: 5 },
  { modelName: 'VFR 1200F', yearFrom: 2010, yearTo: 2016, component: 'Bateria YTZ14S (12V 11,2Ah) — verificação', intervalKm: null, intervalMonths: 12, notes: 'Manter carregada. Repouso: 12,6V. Tensão em carga: 13,5–14,5V.', priority: 'MEDIUM', order: 6 },
  // VFR 1200X herda tudo do VFR 1200F com pequenas diferenças
  { modelName: 'VFR 1200X CROSSTOURER', yearFrom: 2012, yearTo: 2018, component: 'Óleo 10W-30 JASO MA2 full sintético (4,3 L)', intervalKm: 8000, intervalMonths: 12, notes: 'Mesmo motor V4 do VFR 1200F. DCT de série — óleo crítico.', priority: 'CRITICAL', order: 1 },
  { modelName: 'VFR 1200X CROSSTOURER', yearFrom: 2012, yearTo: 2018, component: 'Velas iridium V4 (×4)', intervalKm: 20000, intervalMonths: null, notes: 'Idêntico ao VFR 1200F. Acesso similar.', priority: 'HIGH', order: 2 },
  { modelName: 'VFR 1200X CROSSTOURER', yearFrom: 2012, yearTo: 2018, component: 'Regulagem de válvulas V4 DOHC 16v', intervalKm: 24000, intervalMonths: null, notes: 'Por shims. Mesmo procedimento do VFR 1200F.', priority: 'CRITICAL', order: 3 },
  { modelName: 'VFR 1200X CROSSTOURER', yearFrom: 2012, yearTo: 2018, component: 'ABS + fluido DOT 4 bienal + pastilhas', intervalKm: null, intervalMonths: 24, notes: 'Pneu traseiro 180/55-17 (vs 190/55-17 do 1200F). Mesmas pastilhas Nissin.', priority: 'HIGH', order: 4 },
]

// ─── Calibragens ──────────────────────────────────────────────────────────────

const XL700V_CALIBRAGEM = {
  modelName: 'XL 700V TRANSALP',
  yearFrom: 2008, yearTo: 2012,
  tireSize: '110/80-19 (F) · 130/80-17 (R)',
  frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
  sparePsi: null,
  notes: 'Solo: F 29 / R 33 PSI. Com garupa + bagagem: F 29 / R 36 PSI. Off-road leve: F 22 / R 26 PSI. Michelin Anakee 3, Metzeler Tourance Next, Pirelli Scorpion Rally STR.',
}

const XL750_CALIBRAGEM = {
  modelName: 'XL 750 TRANSALP',
  yearFrom: 2023, yearTo: null,
  tireSize: '110/80-19 (F) · 150/70-17 (R)',
  frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
  sparePsi: null,
  notes: 'Solo: F 29 / R 33 PSI. Carga total: F 29 / R 36 PSI. Off-road (Gravel mode): F 22 / R 25 PSI. Michelin Anakee Adventure, Metzeler Karoo Street.',
}

const VARADERO_CALIBRAGEM = {
  modelName: 'XL 1000V VARADERO',
  yearFrom: 2003, yearTo: 2013,
  tireSize: '110/80-19 (F) · 150/70-17 (R)',
  frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
  sparePsi: null,
  notes: 'Solo: F 29 / R 33 PSI. Com garupa + bagagem (tanque cheio 25L!): F 29 / R 36 PSI. Off-road leve: F 22 / R 26 PSI. Michelin Anakee 3, Metzeler Tourance Next.',
}

const VFR1200F_CALIBRAGEM = {
  modelName: 'VFR 1200F',
  yearFrom: 2010, yearTo: 2016,
  tireSize: '120/70-ZR17 (F) · 190/55-ZR17 (R)',
  frontPsi: 36, rearPsi: 42, frontPsiLoad: 36, rearPsiLoad: 42,
  sparePsi: null,
  notes: 'Solo e com garupa: F 36 / R 42 PSI. ZR17 de alta performance. Michelin Road 6 GT (touring), Bridgestone Battlax RS11 (sport), Pirelli Diablo Supercorsa (pista).',
}

const VFR1200X_CALIBRAGEM = {
  modelName: 'VFR 1200X CROSSTOURER',
  yearFrom: 2012, yearTo: 2018,
  tireSize: '120/70-17 (F) · 180/55-17 (R)',
  frontPsi: 33, rearPsi: 39, frontPsiLoad: 33, rearPsiLoad: 42,
  sparePsi: null,
  notes: 'Solo: F 33 / R 39 PSI. Com garupa + bagagem: F 33 / R 42 PSI. Michelin Road 6 GT, Metzeler Roadtec 02, Bridgestone Battlax T32 GT.',
}

// ─── Upsert helpers ───────────────────────────────────────────────────────────

async function upsertTips(modelName: string, category: Cat, tips: TipInput[]) {
  await prisma.tip.deleteMany({ where: { modelName, category } })
  for (let i = 0; i < tips.length; i++) {
    const t = tips[i]
    await prisma.tip.create({
      data: { modelName, category, order: i + 1, severity: t.severity, title: t.title, body: t.body },
    })
  }
}

async function upsertMaintenance(items: MaintenanceItemInput[]) {
  const modelNames = [...new Set(items.map(i => i.modelName))]
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: modelNames } } })
  for (const item of items) {
    await prisma.maintenanceItem.create({ data: item })
  }
}

async function upsertTirePressure(tp: { modelName: string; yearFrom: number; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number; rearPsiLoad: number; sparePsi: number | null; notes: string }) {
  await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
  await prisma.tirePressure.create({
    data: tp,
  })
}

async function upsertVehicleModel(name: string, brandName: string, yearFrom: number, yearTo: number | null) {
  const brand = await prisma.brand.findFirst({ where: { name: brandName } })
  if (!brand) { console.warn(`Brand ${brandName} not found`); return }
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name, brandId: brand.id } },
    create: { name, brandId: brand.id },
    update: {},
  })
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Honda TRANSALP + VARADERO + VFR...')

  await upsertVehicleModel('XL 700V TRANSALP', 'Honda', 2008, 2012)
  await upsertVehicleModel('XL 750 TRANSALP', 'Honda', 2023, null)
  await upsertVehicleModel('XL 1000V VARADERO', 'Honda', 2003, 2013)
  await upsertVehicleModel('VFR 1200F', 'Honda', 2010, 2016)
  await upsertVehicleModel('VFR 1200X CROSSTOURER', 'Honda', 2012, 2018)

  await upsertTips('XL 700V TRANSALP', 'MACETES', XL700V_MACETES)
  await upsertTips('XL 700V TRANSALP', 'PROBLEMAS', XL700V_PROBLEMAS)
  await upsertMaintenance(TRANSALP700_MANUTENCAO)
  await upsertTirePressure(XL700V_CALIBRAGEM)

  await upsertTips('XL 750 TRANSALP', 'MACETES', XL750_MACETES)
  await upsertTips('XL 750 TRANSALP', 'PROBLEMAS', XL750_PROBLEMAS)
  await upsertMaintenance(TRANSALP750_MANUTENCAO)
  await upsertTirePressure(XL750_CALIBRAGEM)

  await upsertTips('XL 1000V VARADERO', 'MACETES', VARADERO_MACETES)
  await upsertTips('XL 1000V VARADERO', 'PROBLEMAS', VARADERO_PROBLEMAS)
  await upsertMaintenance(VARADERO_MANUTENCAO)
  await upsertTirePressure(VARADERO_CALIBRAGEM)

  await upsertTips('VFR 1200F', 'MACETES', VFR1200F_MACETES)
  await upsertTips('VFR 1200F', 'PROBLEMAS', VFR1200F_PROBLEMAS)
  await upsertTips('VFR 1200X CROSSTOURER', 'MACETES', VFR1200X_MACETES)
  await upsertTips('VFR 1200X CROSSTOURER', 'PROBLEMAS', VFR1200X_PROBLEMAS)
  await upsertMaintenance(VFR1200F_MANUTENCAO)
  await upsertTirePressure(VFR1200F_CALIBRAGEM)
  await upsertTirePressure(VFR1200X_CALIBRAGEM)

  const models = ['XL 700V TRANSALP', 'XL 750 TRANSALP', 'XL 1000V VARADERO', 'VFR 1200F', 'VFR 1200X CROSSTOURER']
  const tipCount = await prisma.tip.count({ where: { modelName: { in: models } } })
  const maintCount = await prisma.maintenanceItem.count({ where: { modelName: { in: models } } })

  console.log(`✅ ${models.length} modelos TRANSALP/VARADERO/VFR — ${tipCount} dicas, ${maintCount} itens de manutenção`)
  console.log('✅ Seed concluído!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
