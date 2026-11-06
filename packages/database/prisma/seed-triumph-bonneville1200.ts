// seed-triumph-bonneville1200.ts — Triumph Bonneville "modern classics" plataforma 1200cc
// Motor bicilíndrico paralelo 270° firing order, refrigerado a líquido, SOHC 8 válvulas.
// Duas afinações: High Torque (HT, ~77-80cv, cruiser/clássico) e High Power (HP, ~96-105cv, esportivo).
// Triumph expandiu fortemente no Brasil: fábrica de Manaus dobrou produção em 2024 (crescimento
// de ~88% em emplacamentos vs 2023), ampliando rede de concessionárias e disponibilidade de peças.
// Execute: pnpm --filter @motormacete/database db:seed:triumph-bonneville1200
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

// ─── BONNEVILLE T120 / T120 ACE / T120 BLACK / T120 BLACK STEALTH EDITION ────
// Motor: 1200cc High Torque (HT) SOHC 8V | ~79,1 cv @ 6.550 rpm | 105 Nm @ 3.500 rpm
// Óleo 10W-40/10W-50 semissintético — 3,2L sem filtro / 3,4L com filtro | Vela NGK LMAR8A-9 (iridium, gap 0,8-0,9mm)
// Pneu: 100/90-18 (F) / 150/70-17 (R), Pirelli Phantom Sportscomp | Corrente 525 (pinhão 17T / coroa 37T)
// Tanque 14,5L | Peso ~243kg | Serviço: 16.000 km/12 meses (menor) | 32.000 km (válvulas + vela)

const T120_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40/10W-50 semissintético — 3,2L sem filtro / 3,4L com filtro; troca a cada 16.000 km ou 12 meses',
    body: 'O motor 1200 High Torque (HT) da linha T120 usa óleo 10W-40 ou 10W-50 semissintético (Castrol Power1, Motul 5100, Mobil Super 4T). Capacidade: 3,2L em troca simples, 3,4L quando o filtro também é trocado. Intervalo oficial Triumph: 16.000 km ou 12 meses — o que vier primeiro. Mesmo rodando pouco, faça a troca anual: o óleo degrada por oxidação e absorção de umidade independente da quilometragem. Filtro de óleo original Triumph (código T1218001) ou equivalentes K&N.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR8A-9 (iridium) já vem pré-gapada de fábrica — não regapear',
    body: 'A vela original de toda a linha 1200 (HT e HP) desde 2016 é a NGK LMAR8A-9, código Triumph T1290745. Ela sai de fábrica com gap correto (0,8–0,9mm) e não deve ser reajustada manualmente — a ponta de irídio é frágil e forçar o calibrador pode danificá-la. Vida útil típica: 32.000 km (coincide com a revisão de folga de válvulas). Custo por unidade: R$ 60–100. Compre sempre pelo código completo, pois plugues "genéricos NGK 1200 iridium" de procedência duvidosa têm gap incorreto.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 525 — lubrifique a cada 500–800 km; kit relação pinhão 17T / coroa 37T',
    body: 'A linha T120 usa corrente de passo 525 (mais robusta que as motos nacionais de menor cilindrada). Folga correta: 20–30mm no trecho inferior, verificada com a moto em pé sobre o cavalete central. Lubrifique a cada 500–800 km ou após rodar na chuva — sprays de corrente com PTFE (Motul C2, Muc-Off) rendem mais que óleo comum. Kit relação completo (corrente DID VX525 ou RK 525 + pinhão 17T + coroa 37T): R$ 900–1.600 em distribuidoras de peças para motos grandes.',
  },
  {
    severity: 'OK',
    title: 'Vibração de "firing order 270°" é característica, não defeito',
    body: 'O motor bicilíndrico paralelo com virabrequim em 270° (mesmo ângulo de disparo de um V-twin) gera uma vibração rítmica de baixa frequência que é proposital — Triumph projetou o "caráter" do motor assim, com balance shaft reduzindo mas não eliminando essa sensação. Não confunda com desbalanceamento real: vibração que aumenta progressivamente com o uso ou que aparece só acima de certa rotação específica indica folga em coxins do motor ou desgaste de rolamentos, não o comportamento normal do propulsor.',
  },
  {
    severity: 'WARN',
    title: 'Porca serrilhada do cabo de embreagem pode afrouxar com a vibração — confira periodicamente',
    body: 'A regulagem do ponto de acionamento da embreagem no punho é feita por uma porca serrilhada (knurled nut) na extremidade do cabo. A vibração do motor 270° pode afrouxar essa porca com o tempo, alterando o curso da alavanca até a embreagem começar a patinar em marcha alta. Verifique o aperto a cada 5.000 km e aplique uma gota de trava química leve (Loctite 243) se ela voltar a soltar com frequência.',
  },
  {
    severity: 'OK',
    title: 'Triumph investiu forte no Brasil — peças e assistência ficaram mais acessíveis',
    body: 'A fábrica de Manaus dobrou a produção em 2024, e a marca bateu recorde histórico de emplacamentos no país (crescimento de ~88% frente a 2023). Isso expandiu a rede de concessionárias autorizadas e reduziu o tempo de espera por peças de reposição — diferente de alguns anos atrás, quando peças para modelos 1200 HT/HP dependiam quase sempre de importação direta. Ainda assim, para peças de desgaste (pastilhas, correntes, filtros), marcas compatíveis (EBC, DID, K&N, Hiflofiltro) chegam mais rápido e custam bem menos que a peça genuína Triumph.',
  },
  {
    severity: 'WARN',
    title: 'Bateria fraca é a causa nº1 de "não liga" — e o interruptor da embreagem também trava a partida',
    body: 'Se a T120 não dá partida, o primeiro suspeito é a bateria: abaixo de 12,4V em repouso, o motor de partida gira fraco ou nem gira. Segunda causa comum: o interruptor de segurança da embreagem (clutch switch) — o motor só liga com a alavanca de embreagem puxada até o fim; se o interruptor estiver sujo ou desregulado, a moto simplesmente não parte mesmo com bateria nova. Bateria recomendada: YTZ10S (12V). Contatos do interruptor podem ser limpos com spray de contato elétrico.',
  },
]

const T120_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Embreagem escorregando ao acelerar em qualquer marcha — reportado com frequência em fóruns',
    body: 'Donos de T120/Bobber relatam embreagem que "sobe de giro" sem transmitir potência total, especialmente acima de 4.000 rpm. Antes de trocar discos, verifique: (1) folga do cabo/atuador hidráulico dentro do especificado, (2) nível do óleo do motor correto (excesso também pode causar patinação por afetar a pressão do sistema), (3) porca serrilhada do cabo não afrouxada. Se os discos já estão gastos (uso acima de 40.000 km ou puxadas agressivas constantes), o kit de reposição (discos + molas) custa R$ 800–1.500 de peça.',
  },
  {
    severity: 'WARN',
    title: 'Alavanca de câmbio rígida — queda no lado esquerdo pode empenar o eixo seletor',
    body: 'O pedal de câmbio da linha T120 é montado de forma rígida, sem a folga de segurança que motos japonesas têm contra impacto. Uma queda de baixa velocidade no lado esquerdo transmite o impacto diretamente ao eixo seletor de marchas dentro do motor, podendo causar dificuldade para engatar ou "marchas fantasma". Após qualquer tombamento, mesmo leve, teste todas as marchas antes de rodar — o reparo do eixo seletor empenado exige abertura parcial do motor.',
  },
  {
    severity: 'DANGER',
    title: 'Corrosão em peças cromadas (escapamento, tampas do motor) em regiões litorâneas ou úmidas',
    body: 'O acabamento cromado do escapamento, das tampas do motor e de partes do guidão da T120/T120 Black é bonito mas sensível à maresia e à umidade constante. Em regiões litorâneas do Brasil, manchas de ferrugem superficial podem aparecer em menos de 1 ano sem manutenção. Lave a moto após exposição à chuva ou maresia, seque bem e aplique cera protetora para cromados (Autoglym Metal Polish, Meguiar\'s) a cada 60–90 dias. Corrosão avançada em tampas de motor pode exigir troca — peças cromadas Triumph são caras (R$ 1.500+).',
  },
  {
    severity: 'WARN',
    title: 'Interruptor de embreagem (clutch switch) com falha impede a partida mesmo com bateria boa',
    body: 'Um problema recorrente reportado em fóruns: moto com bateria carregada, luzes e painel normais, mas o motor de partida não aciona. Antes de suspeitar do motor de arranque ou da ECU, teste o interruptor de segurança da embreagem — ele é a causa mais comum desse sintoma específico. O interruptor fica na base da alavanca de embreagem e é sensível a sujeira e água. Substituição é simples e a peça custa R$ 80–150.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico e conectores podem oxidar — sinalizadores e velocímetro com falhas intermitentes',
    body: 'Assim como em outras motos com fiação exposta a variações climáticas, os conectores do chicote da T120 podem oxidar com o tempo, causando sinalizadores intermitentes, luz de instrumentos piscando ou informações erradas no painel digital. Limpe os conectores acessíveis (embaixo do banco, próximo à bateria) com spray de contato elétrico e aplique graxa dielétrica nos terminais. Se o problema persistir em um ponto específico, o conector Deutsch/Tyco correspondente pode ser substituído individualmente.',
  },
]

const T120_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma T120/T120 ACE/T120 Black: motor 1200 HT — revisões a cada 16.000 km',
    body: '1.000 km — Revisão de amaciamento (verificação geral, sem troca de óleo obrigatória, mas recomendada). | 16.000 km / 12 meses — Troca de óleo (10W-40/10W-50, 3,2–3,4L) e filtro. Verificar tensão da corrente. Verificar fluido de freio. | 32.000 km / 24 meses — Troca de vela NGK LMAR8A-9. Checagem/ajuste de folga de válvulas (item crítico do motor SOHC). Retorque de parafusos do motor. | A cada 500–800 km — Lubrificação da corrente 525. | Anual (mesmo com baixa km) — Troca de óleo do motor. | Bienal — Fluido de freio DOT 4. | 40.000 km — Kit relação completo (corrente + pinhão + coroa) se desgastado.',
  },
]

// ─── BONNEVILLE BOBBER / BOBBER BLACK / CHROME / ICON / SPEEDMASTER 1200cc ──
// Motor: 1200cc High Torque (HT) SOHC 8V | ~76,9 cv @ 6.100 rpm | 106 Nm @ 4.000 rpm
// Óleo 10W-40/10W-50 semissintético — ~3,4L com filtro | Vela NGK LMAR8A-9 (iridium)
// Pneu: Bobber 2017-2020: 100/90-19 (F) / 150/80-16 (R) | Bobber Black/pós-2021 e Speedmaster: 130/90-16 (F) / 150/80-16 (R)
// Corrente 525 | Suspensão traseira: mono-shock KYB oculto sob o banco, só pré-carga ajustável
// Speedmaster: cruiser 2-up no mesmo chassi/rodas do Bobber, banco duplo e guidão diferente

const BOBBER_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Suspensão traseira: mono-shock KYB escondido sob o banco — pré-carga ajustável por chave tipo C',
    body: 'O visual "hardtail" do Bobber é uma ilusão: existe um amortecedor mono KYB escondido embaixo do banco, acionado por um sistema de link que simula um chassi rígido tradicional. A pré-carga é ajustável através de uma chave tipo C que acessa o anel de regulagem por baixo do banco — é preciso remover o banco (2 parafusos) para chegar lá. Ajuste a pré-carga conforme o peso do piloto: fábrica vem regulada para um piloto de ~75kg sem bagagem.',
  },
  {
    severity: 'WARN',
    title: 'Curso de suspensão traseira curto (~76mm) — pavimento irregular transmite mais impacto',
    body: 'O mono-shock do Bobber tem apenas cerca de 3 polegadas (76mm) de curso, bem menos que uma moto touring. Isso é intencional para manter a linha estética baixa e "rígida", mas em buracos e lombadas o impacto chega mais seco à coluna do piloto. Não há ajuste de compressão/rebound de fábrica, só pré-carga. Quem roda muito em pavimento ruim costuma trocar por kits Fox (oficial Triumph), Öhlins, Matris ou Hagon — todos vendidos como upgrade direto, sem modificação de chassi.',
  },
  {
    severity: 'OK',
    title: 'Pneu traseiro largo 150/80-16 — Avon Cobra (original) ou Metzeler ME888 Marathon Ultra',
    body: 'O pneu traseiro 150/80R16 do Bobber/Speedmaster é bem mais largo que o do T120 — visual cruiser clássico. Pressões: 36 PSI dianteiro / 42 PSI traseiro (solo). O pneu original de fábrica é o Avon Cobra (composto e carcaça específicos para o peso e geometria do Bobber). Alternativa popular: Metzeler ME888 Marathon Ultra, com composto de maior durabilidade e boa aderência em piso molhado — mantém a mesma banda de rodagem "cruiser".',
  },
  {
    severity: 'WARN',
    title: 'Bobber pré-2021 tem roda dianteira 19"; Bobber Black e modelos pós-2021 têm roda de 16" — não são intercambiáveis',
    body: 'O Bonneville Bobber original (2017–2020) usa roda dianteira de 19 polegadas com pneu 100/90-19. Já o Bobber Black e a atualização geral da linha (a partir de 2021) mudaram para roda de 16 polegadas com pneu 130/90-16 — visual ainda mais "cruiser". Antes de comprar pneu, confira o aro real da moto (medida gravada na roda), pois as duas configurações não são compatíveis entre si e um pneu errado sequer entra no aro.',
  },
  {
    severity: 'OK',
    title: 'Speedmaster compartilha chassi, rodas e suspensão traseira com o Bobber — mesmas medidas de pneu',
    body: 'A Bonneville Speedmaster é construída sobre o mesmo chassi e conjunto de rodas do Bobber, com banco duplo (2-up) e guidão mais alto para postura de cruiser touring. Isso significa que pneus, câmaras de ar, rolamentos de roda e o próprio mono-shock traseiro (KYB oculto sob o banco) são intercambiáveis entre os dois modelos. Pressões e medida de pneu traseiro (150/80-16) são idênticas ao Bobber Black.',
  },
  {
    severity: 'WARN',
    title: 'Peças cromadas do Bobber Chrome Edition e da Speedmaster exigem cuidado redobrado contra maresia',
    body: 'As versões Chrome Edition (Bobber) e a Speedmaster têm bastante acabamento cromado — tanque, guarda-lamas, escapamento. Em uso litorâneo ou com lavagem irregular, pontos de oxidação aparecem rapidamente sob o cromado, especialmente em parafusos e soldas. Lave com sabão neutro após exposição à maresia, seque completamente e aplique cera para metal a cada 60 dias. Reparo de cromado corroído normalmente exige troca da peça — não há "polimento" que remova ferrugem já instalada sob o cromo.',
  },
]

const BOBBER_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão traseira sem ajuste de compressão/rebound de fábrica — reclamação recorrente em fóruns',
    body: 'O mono-shock KYB do Bobber/Speedmaster só tem ajuste de pré-carga — sem compressão ou rebound reguláveis, ao contrário de motos com suspensão mais sofisticada. Em pilotos mais pesados ou uso com carona frequente, o amortecimento pode ficar aquém do ideal mesmo com a pré-carga no máximo. A solução mais comum na comunidade é o upgrade para kit Fox Performance (oficial Triumph, plug-and-play) ou Öhlins/Matris — custo de R$ 3.000–6.000 dependendo da marca.',
  },
  {
    severity: 'WARN',
    title: 'Mesma questão de embreagem e cabo do T120: porca serrilhada solta com a vibração',
    body: 'Por compartilhar o motor 1200 HT com a linha T120, o Bobber e a Speedmaster têm o mesmo ponto de atenção na regulagem da embreagem: a porca serrilhada do cabo pode afrouxar com a vibração do motor 270°, alterando o ponto de acionamento até a embreagem escorregar. Verifique o aperto a cada 5.000 km, principalmente antes de viagens longas.',
  },
  {
    severity: 'DANGER',
    title: 'Corrosão em peças cromadas do Bobber Chrome/Speedmaster — inspecionar a cada 3 meses',
    body: 'Em climas úmidos ou litorâneos, pontos de corrosão sob o cromo aparecem tipicamente entre 12 e 24 meses de uso sem manutenção preventiva. As áreas mais críticas são a base do escapamento (exposta a calor + umidade) e parafusaria da suspensão dianteira. Inspecione visualmente a cada 3 meses procurando bolhas ou manchas amarronzadas sob o cromo — sinal de que a corrosão já começou por baixo e vai piorar mesmo com polimento externo.',
  },
  {
    severity: 'WARN',
    title: 'Banco solo do Bobber: conforto limitado em viagens longas, poucos ajustes de posição',
    body: 'O desenho de banco solo do Bobber (herança do estilo bobber clássico) prioriza estética sobre ergonomia — o acolchoamento é fino e a posição de condução muda pouco. Para uso predominante em viagens longas, muitos donos trocam o banco original por opções com mais espuma (Corbin, Mustang ou seleiros artesanais brasileiros) sem alterar a geometria da moto. A Speedmaster, com banco duplo, tende a ser mais confortável para percursos longos.',
  },
  {
    severity: 'WARN',
    title: 'Bateria fraca e interruptor de embreagem: mesmas causas comuns de "não liga" da linha 1200',
    body: 'Bobber e Speedmaster compartilham a eletrônica de partida da linha T120: bateria abaixo de 12,4V em repouso ou interruptor de segurança da embreagem sujo/desregulado são as duas causas mais frequentes de falha de partida. Teste ambos antes de suspeitar de motor de arranque, CDI ou ECU.',
  },
]

const BOBBER_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Bobber/Bobber Black/Chrome/Icon/Speedmaster: motor 1200 HT — mesma base do T120',
    body: '1.000 km — Revisão de amaciamento. | 16.000 km / 12 meses — Troca de óleo (10W-40/10W-50, ~3,4L com filtro) e filtro. Verificar tensão da corrente 525. Verificar fluido de freio. | 32.000 km / 24 meses — Troca de vela NGK LMAR8A-9. Checagem de folga de válvulas. Retorque de parafusos do motor. | A cada 500–800 km — Lubrificação da corrente. | A cada 3 meses — Inspeção visual de peças cromadas (Chrome Edition/Speedmaster) contra corrosão. | Conforme uso/peso — Reajuste da pré-carga do mono-shock traseiro (chave tipo C sob o banco). | Bienal — Fluido de freio DOT 4. | 40.000 km — Kit relação completo se desgastado.',
  },
]

// ─── THRUXTON R / SPEED TWIN / SPEED TWIN RS / SPEED TWIN STEALTH EDITION ───
// Motor: 1200cc High Power (HP) SOHC 8V | Thruxton R: ~96,5 cv @ 6.750 rpm / 112 Nm | Speed Twin: ~100-103,5 cv @ 7.750 rpm / 112 Nm @ 4.250 rpm
// Óleo 10W-40/10W-50 semissintético | Vela NGK LMAR8A-9 (mesma peça do HT)
// Thruxton R: Showa BPF + Öhlins traseiro, freios Brembo monobloco, pneu 120/70-17 (F) / 160/60-17 (R), Pirelli Diablo Rosso Corsa, 34F/42R PSI
// Speed Twin: pneu 120/70-17 (F) / 160/60-17 (R), Pirelli Rosso III (base) / Diablo Rosso Corsa (RS), 36F/42R PSI. RS: suspensão Öhlins + freios Brembo M50

const SPORT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1200 High Power (HP): mesma base do HT, mas cabeçote/comando/escape ajustados para giro alto',
    body: 'O motor 1200 High Power usado no Thruxton R e no Speed Twin compartilha o bloco básico do motor HT (mesmo deslocamento, 270° firing order), mas tem cabeçote, árvore de comando, pistões e sistema de escape recalibrados para entregar potência em rotações mais altas — até 6.750 rpm (Thruxton R, ~96,5 cv) e 7.750 rpm (Speed Twin, ~100–103,5 cv). Torque de pico é próximo do HT (~112 Nm), mas entregue em rotação mais alta (4.250 rpm vs 3.500–4.000 rpm do HT). Na prática: motor mais "esportivo", exige giro para render.',
  },
  {
    severity: 'OK',
    title: 'Suspensão de alto nível: Showa Big Piston Fork + Öhlins (Thruxton R) e Öhlins traseiro (Speed Twin RS)',
    body: 'O Thruxton R vem com garfo dianteiro Showa Big Piston Fork (BPF) invertido e amortecedores traseiros duplos Öhlins, ambos totalmente ajustáveis (pré-carga, compressão, rebound). A Speed Twin RS sobe o nível com suspensão traseira Öhlins e freios Brembo M50 (upgrade da versão base). Regule a pré-carga conforme o peso do piloto + bagagem antes de viagens — o manual traz a tabela de cliques de referência por faixa de peso.',
  },
  {
    severity: 'OK',
    title: 'Freios Brembo monobloco — pastilhas de qualidade e fluido DOT 4 fazem diferença real',
    body: 'O Thruxton R e a Speed Twin RS usam pinças Brembo monobloco (M50 na RS) com discos duplos dianteiros — sistema de frenagem muito acima da média da categoria. Para manter a resposta, use pastilhas de qualidade (EBC HH sintered ou Brembo original) e troque o fluido DOT 4 a cada 2 anos, mesmo sem sintoma aparente — fluido antigo absorve umidade e reduz o ponto de ebulição, causando "esponjosidade" no acionamento sob uso intenso.',
  },
  {
    severity: 'WARN',
    title: 'Pneus esportivos (Pirelli Diablo Rosso Corsa/Rosso III) desgastam mais rápido que pneus touring',
    body: 'O Thruxton R sai de fábrica com Pirelli Diablo Rosso Corsa (composto esportivo, ótima aderência mas vida útil menor). A Speed Twin usa Pirelli Rosso III na versão base e Diablo Rosso Corsa na RS. Pneus deste perfil rendem 8.000–12.000 km em uso misto, bem menos que um pneu touring. Pressões de referência: Thruxton R 34 PSI dianteiro / 42 PSI traseiro; Speed Twin 36 PSI dianteiro / 42 PSI traseiro (solo, a frio).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR8A-9 — mesma peça da linha HT, gap 0,8–0,9mm pré-ajustado',
    body: 'Apesar da diferença de afinação, o motor HP usa a mesma vela da linha HT: NGK LMAR8A-9 (código Triumph T1290745), iridium, pré-gapada de fábrica. Não regape manualmente. Como o motor HP trabalha em rotações mais altas com frequência, monitore o gap a cada 20.000 km e substitua sem hesitar aos 32.000 km — velas gastas em motor de giro alto penalizam mais a resposta do que em motores de baixa rotação.',
  },
  {
    severity: 'WARN',
    title: 'Postura café-racer do Thruxton R é mais exigente ergonomicamente que a linha T120/Speed Twin',
    body: 'O guidão baixo e os semi-guidões (clip-ons) do Thruxton R colocam mais peso sobre os punhos e o pescoço fica mais esticado — postura de café racer clássico, ótima para curvas rápidas mas cansativa em trânsito parado ou viagens longas. A Speed Twin, com guidão reto tipo naked/roadster, é sensivelmente mais confortável no dia a dia mantendo o mesmo motor e chassi de base.',
  },
]

const SPORT_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Consumo de pneu traseiro acelerado com uso esportivo — troque sempre em par quando o desgaste for desigual',
    body: 'O uso mais agressivo típico de quem escolhe Thruxton R/Speed Twin acelera o desgaste do pneu traseiro em relação ao dianteiro. Rodar com desgaste muito desigual entre os dois altera a geometria de direção e a estabilidade em curva. Quando o traseiro chegar ao TWI (indicador de desgaste) bem antes do dianteiro, considere trocar o par junto — misturar composto novo/velho entre os eixos piora o comportamento em piso molhado.',
  },
  {
    severity: 'WARN',
    title: 'Fluido de freio contaminado reduz a resposta das pinças Brembo monobloco',
    body: 'Sistemas de freio de alta performance como o Brembo monobloco do Thruxton R/Speed Twin RS são mais sensíveis à qualidade do fluido do que sistemas simples. Fluido DOT 4 vencido ou contaminado com umidade causa sensação "esponjosa" na alavanca e queda perceptível de eficiência em frenagens repetidas (fading). Respeite a troca bienal rigorosamente — não espere sintoma aparecer, porque nesse ponto o fluido já está bem degradado.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo nos retentores da suspensão Showa BPF/Öhlins após anos de uso intenso',
    body: 'Suspensões de alto desempenho como a Showa Big Piston Fork do Thruxton R e os amortecedores Öhlins da Speed Twin RS têm retentores de alta precisão que podem começar a vazar óleo após vários anos de uso, especialmente com exposição a poeira e sujeira sem limpeza regular das hastes. Sintoma: mancha de óleo na parte inferior do tubo do garfo. Limpe as hastes cromadas após cada lavagem e considere capas de proteção (fork boots) em uso off-pavimentado.',
  },
  {
    severity: 'DANGER',
    title: 'Corrosão em componentes de alumínio polido/peças expostas com uso em maresia',
    body: 'O acabamento de alumínio polido e peças expostas (tampas de motor, garfo invertido) do Thruxton R e Speed Twin podem sofrer oxidação por pites (pitting) em uso litorâneo frequente, diferente da corrosão superficial de peças cromadas — esse tipo de dano é mais difícil de reverter com polimento simples. Lave com água doce após qualquer exposição a maresia e aplique produto específico para alumínio (não usar produtos abrasivos genéricos).',
  },
  {
    severity: 'WARN',
    title: 'Embreagem e interruptor de segurança: mesmos pontos de atenção da linha HT',
    body: 'Por compartilhar a base do motor 1200 com a linha HT, o Thruxton R e a Speed Twin apresentam os mesmos pontos de atenção reportados em fóruns: porca serrilhada do cabo de embreagem que afrouxa com a vibração, e interruptor de segurança da embreagem sujo impedindo a partida mesmo com bateria boa. Verifique ambos antes de diagnósticos mais complexos.',
  },
]

const SPORT_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Thruxton R/Speed Twin/Speed Twin RS/Stealth Edition: motor 1200 HP — revisões a cada 16.000 km',
    body: '1.000 km — Revisão de amaciamento. | 16.000 km / 12 meses — Troca de óleo (10W-40/10W-50 semissintético) e filtro. Verificar tensão da corrente 525. Inspecionar pastilhas Brembo. | 32.000 km / 24 meses — Troca de vela NGK LMAR8A-9. Checagem de folga de válvulas (motor HP exige atenção redobrada por girar mais alto). Retorque de parafusos do motor. | A cada 500–800 km — Lubrificação da corrente. | 8.000–12.000 km — Pneus (Diablo Rosso Corsa/Rosso III desgastam mais rápido que pneus touring). | Bienal — Fluido de freio DOT 4 (crítico nas pinças Brembo monobloco/M50). | Anual — Limpeza e inspeção das hastes de suspensão Showa BPF/Öhlins contra vazamento nos retentores.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'BONNEVILLE T120',
    yearFrom: 2016,
    yearTo: null,
    MACETES: T120_MACETES,
    PROBLEMAS: T120_PROBLEMAS,
    MANUTENCAO: T120_MANUTENCAO,
  },
  {
    modelName: 'BONNEVILLE T120 ACE',
    yearFrom: 2018,
    yearTo: null,
    MACETES: T120_MACETES,
    PROBLEMAS: T120_PROBLEMAS,
    MANUTENCAO: T120_MANUTENCAO,
  },
  {
    modelName: 'BONNEVILLE T120 BLACK',
    yearFrom: 2016,
    yearTo: null,
    MACETES: T120_MACETES,
    PROBLEMAS: T120_PROBLEMAS,
    MANUTENCAO: T120_MANUTENCAO,
  },
  {
    modelName: 'BONNEVILLE T120 BLACK STEALTH EDITION',
    yearFrom: 2020,
    yearTo: null,
    MACETES: T120_MACETES,
    PROBLEMAS: T120_PROBLEMAS,
    MANUTENCAO: T120_MANUTENCAO,
  },
  {
    modelName: 'BONNEVILLE BOBBER 1200cc',
    yearFrom: 2017,
    yearTo: null,
    MACETES: BOBBER_MACETES,
    PROBLEMAS: BOBBER_PROBLEMAS,
    MANUTENCAO: BOBBER_MANUTENCAO,
  },
  {
    modelName: 'BONNEVILLE BOBBER BLACK 1200cc',
    yearFrom: 2018,
    yearTo: null,
    MACETES: BOBBER_MACETES,
    PROBLEMAS: BOBBER_PROBLEMAS,
    MANUTENCAO: BOBBER_MANUTENCAO,
  },
  {
    modelName: 'BONNEVILLE BOBBER CHROME EDITION 1200cc',
    yearFrom: 2020,
    yearTo: null,
    MACETES: BOBBER_MACETES,
    PROBLEMAS: BOBBER_PROBLEMAS,
    MANUTENCAO: BOBBER_MANUTENCAO,
  },
  {
    modelName: 'BONNEVILLE BOBBER ICON EDITION 1200cc',
    yearFrom: 2021,
    yearTo: null,
    MACETES: BOBBER_MACETES,
    PROBLEMAS: BOBBER_PROBLEMAS,
    MANUTENCAO: BOBBER_MANUTENCAO,
  },
  {
    modelName: 'BONNEVILLE SPEEDMASTER 1200cc',
    yearFrom: 2018,
    yearTo: null,
    MACETES: BOBBER_MACETES,
    PROBLEMAS: BOBBER_PROBLEMAS,
    MANUTENCAO: BOBBER_MANUTENCAO,
  },
  {
    modelName: 'THRUXTON R 1200cc',
    yearFrom: 2016,
    yearTo: null,
    MACETES: SPORT_MACETES,
    PROBLEMAS: SPORT_PROBLEMAS,
    MANUTENCAO: SPORT_MANUTENCAO,
  },
  {
    modelName: 'Speed Twin 1200cc',
    yearFrom: 2019,
    yearTo: null,
    MACETES: SPORT_MACETES,
    PROBLEMAS: SPORT_PROBLEMAS,
    MANUTENCAO: SPORT_MANUTENCAO,
  },
  {
    modelName: 'Speed Twin 1200cc RS',
    yearFrom: 2021,
    yearTo: null,
    MACETES: SPORT_MACETES,
    PROBLEMAS: SPORT_PROBLEMAS,
    MANUTENCAO: SPORT_MANUTENCAO,
  },
  {
    modelName: 'Speed Twin 1200cc STEALTH EDITION',
    yearFrom: 2023,
    yearTo: null,
    MACETES: SPORT_MACETES,
    PROBLEMAS: SPORT_PROBLEMAS,
    MANUTENCAO: SPORT_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'BONNEVILLE T120',
    yearFrom: 2016, yearTo: null,
    tireSize: '100/90-18 (F) · 150/70-17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 41,
    notes: 'Solo: F 32 / R 36 PSI. Com carona/bagagem: F 32 / R 41 PSI. Pneu original Pirelli Phantom Sportscomp. Mesma medida vale para T120 ACE/Black/Black Stealth Edition (mesmas rodas e chassi).',
  },
  {
    modelName: 'BONNEVILLE BOBBER 1200cc',
    yearFrom: 2017, yearTo: 2020,
    tireSize: '100/90-19 (F) · 150/80-16 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo/com carga: F 36 / R 42 PSI. Configuração original (2017–2020) com roda dianteira de 19". Pneu original Avon Cobra; alternativa Metzeler ME888 Marathon Ultra.',
  },
  {
    modelName: 'BONNEVILLE BOBBER BLACK 1200cc',
    yearFrom: 2018, yearTo: null,
    tireSize: '130/90-16 (F) · 150/80-16 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo/com carga: F 36 / R 42 PSI. Roda dianteira de 16" (diferente do Bobber original 2017-2020, que usa aro 19"). Não intercambiar pneus entre as duas configurações.',
  },
  {
    modelName: 'BONNEVILLE SPEEDMASTER 1200cc',
    yearFrom: 2018, yearTo: null,
    tireSize: '130/90-16 (F) · 150/80-16 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo/com carona: F 36 / R 42 PSI. Compartilha rodas e medidas de pneu com o Bobber Black. Pneu original Avon Cobra Chrome.',
  },
  {
    modelName: 'THRUXTON R 1200cc',
    yearFrom: 2016, yearTo: null,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 34, rearPsi: 42,
    frontPsiLoad: 34, rearPsiLoad: 42,
    notes: 'Solo: F 34 / R 42 PSI. Pneu original Pirelli Diablo Rosso Corsa (composto esportivo). Vida útil menor que pneu touring — 8.000-12.000 km em uso misto.',
  },
  {
    modelName: 'Speed Twin 1200cc',
    yearFrom: 2019, yearTo: null,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo: F 36 / R 42 PSI. Pneu original Pirelli Rosso III (versão base). Mesma medida para Speed Twin RS (Diablo Rosso Corsa) e Stealth Edition.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // BONNEVILLE T120
  { modelName: 'BONNEVILLE T120', yearFrom: 2016, yearTo: null, component: 'Óleo 10W-40/10W-50 semissintético (3,2L s/ filtro / 3,4L c/ filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Troque também anualmente mesmo com baixa quilometragem — óleo oxida com o tempo.', priority: 'HIGH', order: 1 },
  { modelName: 'BONNEVILLE T120', yearFrom: 2016, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Folga 20-30mm no trecho inferior. Spray com PTFE rende mais.', priority: 'HIGH', order: 2 },
  { modelName: 'BONNEVILLE T120', yearFrom: 2016, yearTo: null, component: 'Vela NGK LMAR8A-9 (iridium, pré-gapada)', intervalKm: 32000, intervalMonths: 24, notes: 'Não regapear manualmente — ponta de irídio é frágil.', priority: 'MEDIUM', order: 3 },
  { modelName: 'BONNEVILLE T120', yearFrom: 2016, yearTo: null, component: 'Folga de válvulas (checagem/ajuste)', intervalKm: 32000, intervalMonths: 24, notes: 'Item crítico do motor SOHC. Fazer junto com a troca de vela.', priority: 'HIGH', order: 4 },
  { modelName: 'BONNEVILLE T120', yearFrom: 2016, yearTo: null, component: 'Kit relação 525 (pinhão 17T + coroa 37T + corrente)', intervalKm: 40000, intervalMonths: null, notes: 'Trocar kit completo, não só a corrente.', priority: 'HIGH', order: 5 },
  { modelName: 'BONNEVILLE T120', yearFrom: 2016, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório mesmo sem sintoma aparente.', priority: 'HIGH', order: 6 },
  { modelName: 'BONNEVILLE T120', yearFrom: 2016, yearTo: null, component: 'Verificação da porca serrilhada do cabo de embreagem', intervalKm: 5000, intervalMonths: null, notes: 'Pode afrouxar com a vibração do motor 270°. Aplicar trava química leve se necessário.', priority: 'MEDIUM', order: 7 },
  { modelName: 'BONNEVILLE T120', yearFrom: 2016, yearTo: null, component: 'Bateria — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'Mínimo 12,4V em repouso. Bateria fraca é causa nº1 de falha de partida.', priority: 'MEDIUM', order: 8 },

  // BONNEVILLE BOBBER 1200cc
  { modelName: 'BONNEVILLE BOBBER 1200cc', yearFrom: 2017, yearTo: null, component: 'Óleo 10W-40/10W-50 semissintético (~3,4L c/ filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Mesma base de motor 1200 HT do T120.', priority: 'HIGH', order: 1 },
  { modelName: 'BONNEVILLE BOBBER 1200cc', yearFrom: 2017, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Folga 20-30mm.', priority: 'HIGH', order: 2 },
  { modelName: 'BONNEVILLE BOBBER 1200cc', yearFrom: 2017, yearTo: null, component: 'Vela NGK LMAR8A-9', intervalKm: 32000, intervalMonths: 24, notes: 'Não regapear manualmente.', priority: 'MEDIUM', order: 3 },
  { modelName: 'BONNEVILLE BOBBER 1200cc', yearFrom: 2017, yearTo: null, component: 'Folga de válvulas (checagem/ajuste)', intervalKm: 32000, intervalMonths: 24, notes: 'Fazer junto com a troca de vela.', priority: 'HIGH', order: 4 },
  { modelName: 'BONNEVILLE BOBBER 1200cc', yearFrom: 2017, yearTo: null, component: 'Reajuste de pré-carga do mono-shock traseiro (chave tipo C)', intervalKm: null, intervalMonths: 12, notes: 'Ajustar conforme peso do piloto/bagagem. Acesso remove o banco.', priority: 'MEDIUM', order: 5 },
  { modelName: 'BONNEVILLE BOBBER 1200cc', yearFrom: 2017, yearTo: null, component: 'Inspeção visual de peças cromadas (corrosão)', intervalKm: null, intervalMonths: 3, notes: 'Crítico em uso litorâneo/úmido — inspecionar base do escapamento e parafusaria.', priority: 'MEDIUM', order: 6 },
  { modelName: 'BONNEVILLE BOBBER 1200cc', yearFrom: 2017, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 7 },
  { modelName: 'BONNEVILLE BOBBER 1200cc', yearFrom: 2017, yearTo: null, component: 'Kit relação 525 completo', intervalKm: 40000, intervalMonths: null, notes: 'Trocar corrente + pinhão + coroa juntos.', priority: 'HIGH', order: 8 },

  // BONNEVILLE SPEEDMASTER 1200cc
  { modelName: 'BONNEVILLE SPEEDMASTER 1200cc', yearFrom: 2018, yearTo: null, component: 'Óleo 10W-40/10W-50 semissintético (~3,4L c/ filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Mesmo motor 1200 HT do Bobber.', priority: 'HIGH', order: 1 },
  { modelName: 'BONNEVILLE SPEEDMASTER 1200cc', yearFrom: 2018, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Folga 20-30mm.', priority: 'HIGH', order: 2 },
  { modelName: 'BONNEVILLE SPEEDMASTER 1200cc', yearFrom: 2018, yearTo: null, component: 'Vela NGK LMAR8A-9', intervalKm: 32000, intervalMonths: 24, notes: 'Não regapear manualmente.', priority: 'MEDIUM', order: 3 },
  { modelName: 'BONNEVILLE SPEEDMASTER 1200cc', yearFrom: 2018, yearTo: null, component: 'Folga de válvulas (checagem/ajuste)', intervalKm: 32000, intervalMonths: 24, notes: 'Junto com a troca de vela.', priority: 'HIGH', order: 4 },
  { modelName: 'BONNEVILLE SPEEDMASTER 1200cc', yearFrom: 2018, yearTo: null, component: 'Reajuste de pré-carga do mono-shock traseiro', intervalKm: null, intervalMonths: 12, notes: 'Chassi e suspensão compartilhados com o Bobber. Considerar peso de carona.', priority: 'MEDIUM', order: 5 },
  { modelName: 'BONNEVILLE SPEEDMASTER 1200cc', yearFrom: 2018, yearTo: null, component: 'Inspeção de peças cromadas (Avon Cobra Chrome / acabamento)', intervalKm: null, intervalMonths: 3, notes: 'Acabamento cromado extenso — atenção redobrada em uso litorâneo.', priority: 'MEDIUM', order: 6 },
  { modelName: 'BONNEVILLE SPEEDMASTER 1200cc', yearFrom: 2018, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal.', priority: 'HIGH', order: 7 },

  // THRUXTON R 1200cc
  { modelName: 'THRUXTON R 1200cc', yearFrom: 2016, yearTo: null, component: 'Óleo 10W-40/10W-50 semissintético', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 1200 High Power — mesma capacidade base da linha 1200.', priority: 'HIGH', order: 1 },
  { modelName: 'THRUXTON R 1200cc', yearFrom: 2016, yearTo: null, component: 'Vela NGK LMAR8A-9', intervalKm: 32000, intervalMonths: 24, notes: 'Mesma peça do motor HT. Monitorar gap a cada 20.000 km por girar mais alto.', priority: 'MEDIUM', order: 2 },
  { modelName: 'THRUXTON R 1200cc', yearFrom: 2016, yearTo: null, component: 'Folga de válvulas (checagem/ajuste)', intervalKm: 32000, intervalMonths: 24, notes: 'Motor HP exige atenção redobrada por rodar em rotações mais altas.', priority: 'HIGH', order: 3 },
  { modelName: 'THRUXTON R 1200cc', yearFrom: 2016, yearTo: null, component: 'Pneus Pirelli Diablo Rosso Corsa', intervalKm: 10000, intervalMonths: null, notes: 'Composto esportivo, vida útil menor que pneu touring (8.000-12.000 km em uso misto).', priority: 'MEDIUM', order: 4 },
  { modelName: 'THRUXTON R 1200cc', yearFrom: 2016, yearTo: null, component: 'Fluido de freio DOT 4 (pinças Brembo monobloco)', intervalKm: null, intervalMonths: 24, notes: 'Sistema sensível à contaminação — respeitar bienal rigorosamente.', priority: 'HIGH', order: 5 },
  { modelName: 'THRUXTON R 1200cc', yearFrom: 2016, yearTo: null, component: 'Limpeza/inspeção das hastes de suspensão Showa BPF / Öhlins', intervalKm: null, intervalMonths: 12, notes: 'Verificar vazamento nos retentores. Limpar hastes cromadas após cada lavagem.', priority: 'MEDIUM', order: 6 },
  { modelName: 'THRUXTON R 1200cc', yearFrom: 2016, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Folga 20-30mm.', priority: 'HIGH', order: 7 },

  // Speed Twin 1200cc
  { modelName: 'Speed Twin 1200cc', yearFrom: 2019, yearTo: null, component: 'Óleo 10W-40/10W-50 semissintético', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 1200 High Power.', priority: 'HIGH', order: 1 },
  { modelName: 'Speed Twin 1200cc', yearFrom: 2019, yearTo: null, component: 'Vela NGK LMAR8A-9', intervalKm: 32000, intervalMonths: 24, notes: 'Monitorar gap a cada 20.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Speed Twin 1200cc', yearFrom: 2019, yearTo: null, component: 'Folga de válvulas (checagem/ajuste)', intervalKm: 32000, intervalMonths: 24, notes: 'Motor HP — atenção redobrada.', priority: 'HIGH', order: 3 },
  { modelName: 'Speed Twin 1200cc', yearFrom: 2019, yearTo: null, component: 'Pneus Pirelli Rosso III / Diablo Rosso Corsa (RS)', intervalKm: 10000, intervalMonths: null, notes: 'Vida útil menor que pneu touring.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Speed Twin 1200cc', yearFrom: 2019, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'RS com pinças Brembo M50: ainda mais sensível à contaminação.', priority: 'HIGH', order: 5 },
  { modelName: 'Speed Twin 1200cc', yearFrom: 2019, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Folga 20-30mm.', priority: 'HIGH', order: 6 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Triumph Bonneville 1200 (T120 / Bobber / Speedmaster / Thruxton R / Speed Twin)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'TRIUMPH', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'TRIUMPH', vehicleTypeId: motoType.id },
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

  console.log('✅ Triumph Bonneville 1200 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
