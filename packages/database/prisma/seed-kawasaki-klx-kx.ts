// seed-kawasaki-klx-kx.ts — Kawasaki KLX 110 / KLX 300R / KX 112 / KX 250 / KX 450
// Linha off-road (trail) e motocross da Kawasaki vendida oficialmente no Brasil.
// KLX 110: trail infantil 4T ar | KLX 300R: trail recreativa 4T líquido (só trilha, sem placa)
// KX 112: motocross júnior 2T líquido | KX 250 / KX 450: motocross 4T DOHC líquido (cobre variantes X)
// Execute: pnpm --filter @motormacete/database db:seed:kawasaki-klx-kx
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

// ─── KLX 110 (KLX 110R / KLX 110R L / KLX 110 MONSTER) ────────────────────────
// Motor: 112cc SOHC monocilíndrico 4T, refrigerado a ar | 53,0 × 50,6mm | compressão 9,5:1
// Potência: ~6,3 cv @ 7.000 rpm | Carburador | Câmbio: 4 velocidades semiautomático (sem embreagem manual)
// versão "R L" tem roda maior e assento mais alto para pilotos em crescimento
// Óleo: ~0,9–1,0L 10W-40 JASO MA | Vela: NGK CR6HSA | Pneu: 2.50-14 (F) / 3.00-12 (R)
// Corrente 428 | Redução final 2,923 (38/13) | Tanque: 3,8L | Suspensão: curso 110mm (F/R)

const KLX110_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — troque a cada 500–1.000 km de uso infantil',
    body: 'Motor 112cc SOHC ar, cárter úmido com embreagem compartilhando óleo (mesmo nas versões automáticas — a embreepa centrífuga também banha em óleo). Use sempre JASO MA, nunca óleo de carro puro. Capacidade aproximada: 0,9–1,0L na troca. Marcas OK no Brasil: Motul 3000 10W-40, Lubrax Moto 4T 10W-40, Motorex Formula 4T. Como é moto de treino/uso intenso em curtas distâncias e giro alto constante, o óleo degrada rápido — troque a cada 500–1.000 km ou a cada 3 meses de uso recreativo.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR6HSA — verifique o gap a cada limpeza de filtro',
    body: 'Vela recomendada: NGK CR6HSA (equivalente Denso U20FSR-U). Gap padrão: 0,6–0,7mm. Como a KLX 110 é usada por iniciantes que muitas vezes deixam a moto ligada em marcha lenta por longos períodos (aula de pilotagem), a vela suja de carbono é comum — limpe ou troque a cada 15–20 horas de uso. Custo: R$ 20–30. Leve sempre uma vela reserva na bolsa de ferramentas em passeios de trilha com crianças.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático (centrífugo) x manual: não force trocas de marcha na versão automática',
    body: 'A KLX 110 clássica vem com câmbio semiautomático de 4 velocidades — sem alavanca de embreagem, a troca é só no pedal. Já a "KLX 110 MONSTER" (edição usada em pit bike/monster energy replica) e algumas variantes trazem embreagem manual convencional. Confirme qual versão você tem antes de orientar a criança: forçar troca de marcha "pisando com pressa" na automática desgasta o mecanismo centrífugo prematuramente. Deixe o giro cair naturalmente entre trocas.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma — lave e reoleie a cada uso em trilha/terra',
    body: 'O filtro é de espuma (não papel). Após cada saída em trilha ou terra batida, remova, lave com detergente neutro ou removedor de filtro específico (Motorex Foam Filter Cleaner, ou querosene em último caso), seque completamente e reoleie com óleo de filtro específico (Motul A1, Twin Air Filter Oil) — nunca óleo de motor comum, que endurece a espuma. Filtro seco ou mal oleado é a causa nº1 de desgaste prematuro de cilindro em motos infantis usadas em terra.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 e redução 38/13 — lubrifique após cada uso em pó/lama',
    body: 'Corrente passo 428, redução final 2,923 (coroa 38 dentes / pinhão 13 dentes). Como a moto roda em terra/pó, a corrente suja rápido — lubrifique com spray de corrente após cada sessão de uso, não espere pelo calendário de km (crianças rodam poucos km mas em condições abrasivas). Marcas: Motul Chain Lube Road/Off-Road, DID Chain Lube. Verifique folga de 20–30mm no trecho inferior.',
  },
  {
    severity: 'OK',
    title: 'Suspensão simples (110mm curso) — não é ajustável; controle pelo peso e pressão do pneu',
    body: 'A KLX 110 tem suspensão básica sem ajustes de pré-carga ou amortecimento (curso de 110mm dianteiro e traseiro, adequado ao peso leve de crianças/iniciantes). Não tente "regular" — não há parafuso de ajuste na maioria das versões. Para conforto em terrenos irregulares, a principal variável de controle é a pressão do pneu (ver calibragem) e o peso do piloto. Molas mais duras (kit de reposição) só valem a pena se o piloto já pesar acima de 45–50kg.',
  },
]

const KLX110_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carburador engasgando após longos períodos parada: etanol degrada rápido em tanque pequeno',
    body: 'Com tanque de apenas 3,8L, a gasolina com etanol degrada relativamente rápido se a moto ficar parada por mais de 30–45 dias (comum em motos infantis usadas só em fins de semana). Sintoma: dificuldade de partida, marcha lenta instável. Solução preventiva: drene o carburador (parafuso de dreno na cuba) antes de guardar por período longo, ou use aditivo estabilizador de combustível (Motul Fuel Stabilizer). Se já engasgou, limpeza do carburador com spray específico resolve na maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste do mecanismo de embreagem centrífuga (versão automática) por trocas bruscas',
    body: 'Pais e instrutores que aceleram e freiam bruscamente "no ensino" desgastam prematuramente os calços da embreagem centrífuga automática. Sintoma: patinação em subidas, cheiro de queimado leve, e perda de força na saída de marcha lenta. Inspeção: a cada 20–30 horas de uso, um mecânico deve abrir a tampa do câmbio e verificar o desgaste dos calços — troca custa R$ 80–150 em peça + mão de obra.',
  },
  {
    severity: 'WARN',
    title: 'Retentor da bengala dianteira vazando após queda ou uso intenso em terra',
    body: 'Como a moto é usada por iniciantes, quedas são frequentes — o impacto pode danificar o retentor da bengala. Sintoma: óleo escuro na parte externa do tubo interno. A areia e poeira que entram durante a queda aceleram o desgaste do retentor. Inspecione visualmente após cada queda relevante. Troca de retentor: peça genérica de medida compatível (consulte a medida gravada no retentor antigo), R$ 15–30 + mão de obra simples.',
  },
  {
    severity: 'WARN',
    title: 'Corrente destensionando rápido em uso constante fora de estrada',
    body: 'Por rodar sempre em terra/trilha com trepidação constante, a corrente 428 da KLX 110 perde tensão mais rápido que em uso na cidade. Verifique a folga (20–30mm) a cada 3–5 saídas — corrente frouxa pode saltar da coroa em um solavanco, travando a roda traseira repentinamente (risco de queda). Reajuste é simples: solte o eixo traseiro, deslize a roda usando os tensores, reaperte.',
  },
  {
    severity: 'WARN',
    title: 'Vela suja de carbono por giro baixo constante em treino de iniciantes',
    body: 'Aulas de pilotagem para crianças costumam manter a moto girando baixo por longos períodos (aprendendo a soltar a embreagem/marcha devagar). Isso suja a vela de carbono mais rápido que uso normal. Sintoma: dificuldade de pegar na segunda partida do dia, falha em marcha lenta. Solução: apertar o giro por alguns segundos periodicamente durante o treino ("limpar" a vela) e trocar a vela preventivamente a cada 15–20 horas em uso intensivo de aula.',
  },
]

const KLX110_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma KLX 110 (R / R L / MONSTER): baseado em horas de uso, não só km — moto infantil roda pouca distância',
    body: 'Uso recreativo/treino: acompanhe por HORAS de uso (motos infantis rodam poucos km mas em giro alto constante). Equivalência aproximada: 1 hora de trilha ≈ 15–25 km. | Após cada saída em terra — Limpar e reoleiar filtro de ar (espuma). Lubrificar corrente. | 500 km (~20–30h) — Primeira troca de óleo (10W-40, ~0,9–1,0L). | 1.000 km (~40–50h) — Segunda troca de óleo. Verificar vela CR6HSA (gap 0,6–0,7mm). Verificar folga de corrente 428 (20–30mm). | 15–20h de aula intensiva — Trocar vela preventivamente. | 2.000 km — Verificar embreagem centrífuga (versão automática) quanto a desgaste dos calços. | 3.000 km — Trocar kit relação 428 (coroa 38T / pinhão 13T) se desgastado. Inspecionar retentores da bengala. | Anual — Revisão geral: folgas de válvula, aperto geral de parafusos (vibram soltos com uso em terra).',
  },
]

// ─── KLX 300R ──────────────────────────────────────────────────────────────────
// Motor: 292cc DOHC monocilíndrico 4T, refrigerado a líquido (2 radiadores) | 29 cv @ 8.000 rpm | torque 2,7 kgf.m @ 7.000 rpm
// Injeção eletrônica DFI, corpo de borboleta Keihin 34mm | Câmbio 6 velocidades
// Vendida no Brasil como trail SOMENTE PARA USO OFF-ROAD (sem farol/pisca homologados para uso em via pública em todas as versões — confirme junto à concessionária/Detran local)
// Óleo: aprox. 1,0–1,2L 10W-40 JASO MA (estimado por semelhança à família KLX/KX — confirme no manual, valor exato não encontrado)
// Vela: NGK padrão da família KX/KLX DOHC (modelo exato não confirmado — provável CR8E/CPR8EB-9 ou similar, verifique no manual)
// Pneu: 80/100-21 (F) / 100/100-18 (R) | Corrente 520 × 50/14 (redução 3,57:1) | Suspensão: 285mm curso (F/R) | Tanque: 7,9L | Peso: 128kg

const KLX300R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 292cc DOHC líquido: óleo 10W-40 JASO MA — troque a cada 1.000–1.500 km de trilha',
    body: 'O motor DOHC da KLX 300R é refrigerado a líquido com dois radiadores — bem mais moderno que a linha KLX pequena. Use óleo 10W-40 JASO MA semissintético (Motul 5100, Motorex Power Synt 4T, Lubrax GT). A capacidade exata varia conforme a fonte disponível (não encontramos o valor oficial confirmado em litros nas fichas públicas) — como referência de motores DOHC de cilindrada semelhante da própria Kawasaki, espere algo entre 1,0–1,2L; confirme o valor exato no manual do proprietário antes da primeira troca. Intervalo: 1.000–1.500 km de uso em trilha (mais curto que uso em asfalto por causa de poeira e temperatura).',
  },
  {
    severity: 'OK',
    title: 'Radiador duplo — verifique o líquido de arrefecimento antes e depois de trilhas longas',
    body: 'Diferente da linha KLX 110 (ar) e da maioria das KX (também líquido, mas orientadas a pista), a KLX 300R tem dois radiadores para lidar com uso prolongado em trilha e velocidade baixa (onde há menos fluxo de ar). Verifique o nível no vaso de expansão antes de cada saída. Use coolant específico para moto (Motul Motocool, Radiator Xtreme) — nunca água pura, que corrói o sistema. Após trilhas com muita lama, verifique se as colmeias dos radiadores não estão obstruídas com barro seco.',
  },
  {
    severity: 'OK',
    title: 'Injeção eletrônica DFI (corpo 34mm Keihin): sem regulagem de carburador, mas cuide do filtro de ar',
    body: 'A KLX 300R é injetada (DFI), não tem carburador — isso elimina boa parte dos problemas clássicos de sujeira em jatos que afetam motos a carburador. Em compensação, a injeção depende de um filtro de ar limpo para a leitura correta do sensor de fluxo/pressão. Filtro de espuma: lave com Motorex Foam Filter Cleaner e reoleie com óleo específico (Twin Air, Motul A1) após cada trilha com poeira. Filtro sujo pode acionar modo de segurança da ECU e cortar potência.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 e relação 50/14 (3,57:1) — kit relação DID ou RK dura bem em uso misto',
    body: 'Corrente passo 520, coroa 50 dentes / pinhão 14 dentes, redução final 3,57:1. Para trilha com muita lama e areia, prefira corrente com O-ring ou X-ring (DID 520VX3, RK 520XSO) — dura mais que corrente comum mesmo exposta à sujeira. Lubrifique após cada saída de trilha, não espere pelo calendário. Kit relação completo: R$ 300–550 em distribuidoras nacionais.',
  },
  {
    severity: 'OK',
    title: 'Suspensão invertida 43mm (285mm curso): ajuste pré-carga conforme peso do piloto e bagagem',
    body: 'Garfo invertido de 43mm com 285mm de curso — generoso para uso misto trilha/aventura. Se a moto "afunda" muito na frenagem ou balança na saída de curva, ajuste a pré-carga da mola traseira (anel rosqueado no monoamortecedor) conforme o peso do piloto + eventual bagagem. Revisão de óleo de suspensão (garfo e monoamortecedor) a cada 6.000–8.000 km ou anualmente em oficina especializada em suspensão off-road — custo R$ 200–400 o par.',
  },
  {
    severity: 'WARN',
    title: 'Uso off-road apenas: confirme documentação antes de circular em via pública',
    body: 'A KLX 300R é vendida no Brasil primariamente como moto de uso off-road/trilha. Diferente de uma dual-sport com emplacamento garantido em todo o país, a regularização para uso em vias públicas pode variar por estado/Detran e depender de itens de série (farol, pisca, buzina) e da nota fiscal emitida pela concessionária. Confirme com a concessionária Kawasaki no ato da compra se o modelo vendido já sai emplacável na sua região antes de circular fora de trilha/propriedade privada.',
  },
]

const KLX300R_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Superaquecimento em trechos lentos e technical (baixa velocidade, alta rotação)',
    body: 'Trilhas técnicas com muitas subidas lentas em baixa marcha e giro alto reduzem o fluxo de ar nos radiadores, podendo elevar a temperatura do motor. Sintoma: ventilação da tampa de expansão liberando vapor, perda de potência. Se isso acontecer, pare em local seguro, deixe o motor em marcha lenta (não desligue de imediato) até estabilizar, e verifique nível de coolant após esfriar. Evite arrancar em primeira marcha muito alta rotação em subidas — controle o embreagem para manter giro médio.',
  },
  {
    severity: 'WARN',
    title: 'Retentores de suspensão (garfo e amortecedor traseiro) desgastam rápido em lama/areia',
    body: 'Uso constante em trilha com lama e areia acelera o desgaste dos retentores tanto do garfo invertido quanto do monoamortecedor traseiro. Sintoma: óleo escuro na parte externa dos tubos, perda de amortecimento. Limpe os tubos do garfo com pano úmido após cada trilha (areia entalada nos retentores corta a vedação). Vida útil esperada: 6.000–10.000 km em uso pesado versus 15.000+ km em uso mais leve.',
  },
  {
    severity: 'WARN',
    title: 'Corrente e kit relação desgastando rápido em uso com lama/areia abrasiva',
    body: 'Mesmo com corrente O-ring, o ambiente de trilha com partículas abrasivas (areia, poeira fina) desgasta o kit relação mais rápido que uso em asfalto. Inspecione visualmente a cada saída — corrente "enferrujada" com pontos secos ou coroa com dentes em formato de "gancho" (desgastados) precisam de substituição do kit completo, não só da corrente.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de posição do acelerador/TPS sensível a sujeira e vibração intensa',
    body: 'Motos injetadas de uso off-road podem apresentar falhas intermitentes de aceleração (marcha lenta instável, aceleração irregular) por sujeira ou folga em conectores do chicote elétrico causada pela vibração constante do terreno. Verifique periodicamente se os conectores da injeção estão bem encaixados e sem oxidação, principalmente após lavagens com jato de água ou trilhas com muita água/lama.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem com desgaste acelerado em uso técnico (muito acionamento em subidas)',
    body: 'Pilotagem técnica em trilha exige uso constante da embreagem para dosar tração em subidas e obstáculos — isso desgasta os discos de embreagem mais rápido que uso rodoviário. Sintoma: patinação sob carga, especialmente em subidas íngremes. Verifique o nível de óleo do motor (a embreagem é banhada em óleo) e considere óleo JASO MA de boa qualidade, trocado no intervalo correto, como principal prevenção.',
  },
]

const KLX300R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma KLX 300R: uso misto trilha/estrada, monitore por km E por horas de uso técnico',
    body: 'Após cada trilha — Limpar e reoleiar filtro de ar. Verificar nível de coolant. Lubrificar corrente 520. Limpar radiadores de barro/folhas. | 500 km — Primeira troca de óleo (10W-40 JASO MA — confirme capacidade exata no manual, estimado 1,0–1,2L). | 1.000–1.500 km — Trocas de óleo subsequentes. Verificar vela. | 3.000 km — Trocar vela (modelo conforme manual — provável linha CR/CPR NGK). Verificar folga de válvulas (consulte manual — DOHC exige folga apertada e regular). | 5.000 km — Troca do kit relação 520 se desgastado (mais cedo em uso pesado de lama/areia). Revisão da suspensão (óleo do garfo e monoamortecedor). | 8.000 km — Revisão completa da suspensão em oficina especializada. Rolamentos de roda e de direção. | Anual — Fluido de freio, mangueiras, chicote elétrico (conectores).',
  },
]

// ─── KX 112 ─────────────────────────────────────────────────────────────────────
// Motor: 112cc 2 tempos monocilíndrico refrigerado a líquido, válvula KIPS | 52,5 × 51,6mm
// Compressão 9,9:1 (baixa) / 8,6:1 (alta) | Carburador Keihin 28mm | Ignição digital DC-CDI
// Câmbio 6 velocidades | Pré-mistura de óleo 2T proporção 32:1 | Partida elétrica
// Pneu: 70/100-19 (F) / 90/100-16 (R) aprox. (medidas de aro conforme concessionária: 19"F/16"R)
// Suspensão: garfo invertido 36mm, 275mm curso (F) | Uni-Trak 275mm curso (R)
// Freios: disco pétala 220mm (F) / 184mm (R) | Tanque: 5L | Peso seco: 76kg

const KX112_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mistura 32:1 SEMPRE pré-misturada — nunca use lubrificador automático nem gasolina pura',
    body: 'Motor 2 tempos de válvula KIPS exige mistura pré-feita na proporção 32:1 (1 litro de óleo para 32 litros de gasolina) — misture SEMPRE no galão antes de abastecer, nunca direto no tanque "no olho". Use óleo específico para 2T de motocross: Motul 800 2T (mistura ou injeção), Putoline MX2, Castrol Power 1 2T Racing. Óleo errado (ex: óleo de 2T para roçadeira) pode não ter os aditivos anti-fricção necessários para giro alto constante e travar o motor.',
  },
  {
    severity: 'OK',
    title: 'Vela: use a temperatura térmica correta e troque a cada 5–10 horas de uso competitivo',
    body: 'Motores 2T de motocross sujam vela rápido, principalmente em giro baixo/médio constante (uso de iniciante/júnior). Leve sempre vela reserva. Em uso recreativo mais leve, a vela pode durar mais; em treino/competição intensos, troque a cada 5–10 horas. Consulte a concessionária Kawasaki para o código NGK exato recomendado para o KX112 — modelos 2T pequenos da Kawasaki tipicamente usam a família NGK BR (ex.: BR9EG ou similar), mas confirme no manual antes de comprar.',
  },
  {
    severity: 'OK',
    title: 'Válvula KIPS: limpe o carbono acumulado a cada 10–15 horas de uso',
    body: 'O sistema KIPS (Kawasaki Integrated Powervalve System) usa uma válvula de escape variável que acumula carbono rapidamente em motores 2T. Válvula suja reduz a potência em giro alto e pode travar. Limpeza: remoção da tampa de escape, raspagem cuidadosa do carbono com ferramenta plástica (não risque a válvula), limpeza do canal com spray desengraxante. Serviço recomendado por mecânico especializado em 2T a cada 10–15 horas de uso intenso.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma dupla camada — lave e reoleie após CADA sessão de uso',
    body: 'Motor 2T de pequena cilindrada é extremamente sensível a poeira — uma partícula de areia que entra pelo filtro pode riscar o cilindro rapidamente. Lave o filtro (espuma) a cada uso com removedor específico (Motorex Foam Filter Cleaner, Twin Air Cleaner), seque bem e reoleie generosamente com óleo de filtro específico (Twin Air, Motul A1, Putoline Bio Foam Filter Oil). Nunca rode sem óleo suficiente no filtro — é a causa nº1 de gripagem em 2T júnior.',
  },
  {
    severity: 'OK',
    title: 'Refrigeração líquida: verifique o coolant antes de cada treino/corrida',
    body: 'Diferente de muitas motos 2T infantis mais simples (ar), a KX112 é refrigerada a líquido — mais eficiente para giro alto sustentado de competição. Verifique visualmente o nível no radiador/vaso de expansão antes de cada uso. Use coolant específico de moto (não água de torneira, que oxida o sistema por dentro). Após quedas que possam ter dobrado uma aleta do radiador, verifique vazamentos antes da próxima saída.',
  },
  {
    severity: 'OK',
    title: 'Kit relação 2T desgasta rápido em uso de treino — inspecione a cada 3–5 sessões',
    body: 'A demanda de torque instantâneo de um motor 2T em pista de motocross desgasta corrente e coroa mais rápido que 4T equivalente. Inspecione visualmente o kit relação a cada 3–5 sessões de treino — dentes em formato de "gancho" ou corrente com folga excessiva mesmo após ajuste indicam hora de trocar o kit completo (corrente + coroa + pinhão). Consulte a concessionária para o kit específico do KX112 (passo e número de elos variam conforme o ano/versão).',
  },
]

const KX112_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Gripagem do motor por mistura incorreta ou filtro de ar seco — risco real em 2T pequeno',
    body: 'O erro mais grave e mais comum em motos 2T de motocross júnior: mistura de óleo errada (proporção incorreta ou óleo de baixa qualidade) ou filtro de ar seco/mal vedado. Sintomas de gripagem iminente: motor "prende" momentaneamente em giro alto, perda súbita de potência, fumaça anormal. Se notar qualquer sintoma, PARE imediatamente e não force o motor — continuar rodando pode destruir cilindro e pistão, gerando reparo caro (R$ 800–2.000+). Sempre confira a mistura e o filtro antes de cada saída.',
  },
  {
    severity: 'WARN',
    title: 'Válvula KIPS travada por acúmulo de carbono: perda de potência em giro alto',
    body: 'Se a válvula de escape KIPS não for limpa periodicamente, o acúmulo de carbono pode travá-la parcialmente aberta ou fechada, prejudicando a curva de potência (moto "não puxa" em cima). Sintoma progressivo: perda de força gradual notada pelos pais/instrutor antes mesmo da criança perceber. Solução: limpeza da válvula por mecânico especializado em 2T — não é reparo caro, mas requer conhecimento técnico específico do sistema KIPS.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem multidisco desgastando rápido com uso agressivo de iniciante',
    body: 'Pilotos júnior em aprendizado tendem a "arrastar" a embreagem (uso parcial prolongado) para controlar velocidade em vez de dosar acelerador — isso desgasta discos de embreagem rapidamente. Sintoma: patinação sob carga mesmo com embreagem solta, cheiro de queimado leve. Kit de discos de embreagem: consulte concessionária Kawasaki para peça específica do KX112. Ensinar a criança a usar mais o acelerador/freio e menos "arrastar embreagem" prolonga a vida útil.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de coolant por mangueiras ressecadas ou radiador amassado em queda',
    body: 'Quedas são parte do aprendizado em motocross — o radiador (posicionado exposto na lateral) pode amassar ou furar em tombos. Verifique visualmente antes de cada saída: manchas verdes/rosadas de coolant seco indicam vazamento. Mangueiras de silicone ressecadas pelo calor do motor também podem rachar com o tempo — inspecione anualmente ou após qualquer queda significativa.',
  },
  {
    severity: 'WARN',
    title: 'Vela encharcada em partidas repetidas com motor frio (afogamento)',
    body: 'Motores 2T pequenos afogam facilmente se a criança tentar dar partida repetidamente sem o procedimento correto (acelerador levemente aberto, sem excesso de afogador). Sintoma: cheiro forte de gasolina, vela molhada ao remover. Solução: remova a vela, seque, dê algumas partidas com acelerador todo aberto sem a vela para "limpar" o excesso de mistura no cilindro, reinstale a vela seca e tente novamente. Ensine a criança o procedimento correto de partida para evitar recorrência.',
  },
]

const KX112_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma KX112: motocross usa HORÍMETRO, não odômetro — km abaixo é estimativa aproximada',
    body: 'Motos de motocross não têm conta-km — o controle correto é por HORAS de motor (horímetro), pois o desgaste depende de giro/uso, não de distância percorrida. Equivalência aproximada usada aqui: 1 hora de pista ≈ 20–30 km, apenas para referência de manutenção baseada em odômetro se a moto tiver um instalado. | Após cada uso — Lavar e reoleiar filtro de ar. Verificar mistura de combustível preparada corretamente (32:1). Verificar nível de coolant. Lubrificar corrente. | 3–5 horas (~100 km) — Trocar vela se suja. Verificar tensão da corrente. | 10 horas (~250 km) — Limpeza da válvula KIPS (carbono). Verificar folga de embreagem. | 15–20 horas (~400–500 km) — Revisão geral do motor 2T por mecânico especializado: anéis de pistão, retentores do virabrequim. | 20–25 horas — Trocar kit relação se desgastado. Revisão da suspensão (óleo do garfo 36mm e monoamortecedor Uni-Trak). | Anual ou pós-temporada — Revisão completa do motor (pistão/cilindro), mangueiras de coolant, cabos.',
  },
]

// ─── KX 250 (cobre "KX 250/ 250 F" e "KX 250 X") ───────────────────────────────
// Motor: 249cc DOHC monocilíndrico 4T, refrigerado a líquido | 78,0 × 52,2mm | compressão 14,2:1
// Injeção eletrônica DFI, corpo Keihin 44mm com injetores duplos | Câmbio 5 velocidades
// Óleo: cárter semisseco (semi-dry sump) — aprox. 1,0L | Vela: NGK CPR8EB-9 (ou CR8E em anos anteriores)
// Pneu: 80/100-21 (F) / 100/90-19 (R) — versão "X" usa roda traseira 18" com pneu 110/90-18
// Corrente 520 | Suspensão: garfo invertido 48mm | Uni-Trak traseiro | Tanque: 6,4L
// KX 250 X: focada em cross-country/enduro — roda traseira 18" (pneu de perfil mais alto), relação de marchas mais fechada para trilha, suspensão com ajuste diferente do KX 250 puro motocross

const KX250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cárter semisseco: óleo 10W-40 API SL JASO MA2 — troque a cada 5–8 horas de pista',
    body: 'O KX 250 usa sistema de lubrificação semi-dry sump (cárter semisseco com bomba dupla) — mais moderno que 2T, mas ainda assim exige troca frequente pelo giro alto constante de motocross (até 13.000+ rpm). Capacidade aproximada 1,0L (confirme no manual, pois modelos/anos variam ligeiramente). Use 10W-40 API SL JASO MA2 — Motul 300V 4T Off-Road, Motorex Formula Racing 4T, Putoline DX4. Intervalo recomendado: a cada 5 horas em competição, até 8 horas em treino recreativo mais leve.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR8EB-9 — troque a cada 10–15 horas ou antes se notar perda de potência',
    body: 'Vela recomendada nos modelos mais recentes: NGK CPR8EB-9 (versão colder disponível: CPR9EB-9 para uso em alta temperatura/pista dura). Modelos mais antigos (pré-injeção) usavam NGK CR8E. Compressão alta (14,2:1) exige vela em bom estado — vela gasta causa detonação e perda de potência perceptível em giro alto. Troque preventivamente a cada 10–15 horas de uso em competição.',
  },
  {
    severity: 'OK',
    title: 'Injeção DFI com corpo 44mm e injetores duplos: sem regulagem de carburador, mas fique de olho no filtro',
    body: 'O KX250 moderno é 100% injetado (DFI) com corpo de acelerador Keihin de 44mm e sistema de injetores duplos para melhor atomização em giro alto. Isso elimina regulagem de carburador, mas a ECU depende de leitura correta de sensores — filtro de ar sujo ou entupido pode acionar mapa de segurança e cortar potência. Lave e reoleie o filtro de espuma (Twin Air, Motorex) após CADA sessão de treino/corrida.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 DID ERT3 (ou equivalente) — kit relação específico para motocross dura menos que uso de trilha',
    body: 'Corrente 520 de alta performance (referência: DID ER 520ERT3, sem O-ring, mais leve — usada em competição pois reduz peso rotativo). Para uso recreativo/trilha, uma corrente com O-ring (DID 520VX3) dura mais mas pesa um pouco mais. Lubrifique após cada sessão. Em uso competitivo intenso, o kit relação pode durar apenas 15–20 horas; em uso recreativo, 30–40 horas.',
  },
  {
    severity: 'OK',
    title: 'KX 250 X (cross-country): roda traseira 18" e relação de marchas mais fechada para trilha técnica',
    body: 'A versão "X" do KX250 é voltada para cross-country/enduro, não motocross puro. Principais diferenças: roda traseira de 18" (vs 19" do KX250 padrão) com pneu de perfil mais alto (melhor para pedras e raízes), relação de câmbio mais curta/fechada para trechos técnicos de baixa velocidade, ajuste de suspensão mais voltado a absorver irregularidades constantes de trilha do que a saltos de pista. Peças de motor (óleo, vela, filtro) são as mesmas do KX250 padrão — a diferença é no chassi/rodagem.',
  },
  {
    severity: 'OK',
    title: 'Suspensão invertida 48mm: revise o óleo a cada 15–20 horas de uso competitivo',
    body: 'Garfo invertido de 48mm de alta performance. Em uso de competição, o óleo da suspensão perde propriedades rapidamente pelo calor e trabalho constante — revisão recomendada a cada 15–20 horas (mais cedo que motos de trilha recreativa). Em uso recreativo, pode esticar para 30–40 horas. Serviço deve ser feito por oficina especializada em suspensão de motocross — ajustes incorretos de mola/óleo afetam diretamente a segurança em saltos.',
  },
]

const KX250_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Detonação por vela gasta ou combustível de baixa octanagem — risco em compressão 14,2:1',
    body: 'Com taxa de compressão de 14,2:1, o KX250 é sensível a combustível de baixa qualidade/octanagem e vela gasta — ambos podem causar detonação (micro-explosões fora de tempo), que danificam pistão e biela rapidamente se não corrigido. Use sempre gasolina de boa procedência (evite postos com histórico de adulteração) e nunca ultrapasse o intervalo de troca de vela recomendado. Sintoma de detonação: ruído metálico agudo em aceleração forte, perda de potência progressiva.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem desgastando rápido em uso competitivo agressivo',
    body: 'Pilotagem de competição com uso intenso de embreagem em largadas e curvas fechadas desgasta os discos rapidamente. Sintoma: patinação em giro alto sob carga máxima, ponto de engate mudando. Kit de discos de embreagem específico KX250: consulte concessionária Kawasaki ou revendedores de peças de motocross (M3 Parts, Kawaparts). Em uso competitivo semanal, inspecione a cada 15–20 horas.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de suspensão (garfo 48mm) após uso intenso em pista com saltos',
    body: 'O impacto repetido de saltos de motocross desgasta os retentores do garfo invertido mais rápido que uso de trilha. Sintoma: óleo visível na parte externa dos tubos internos, perda de amortecimento perceptível na frenagem. Limpe os tubos após cada uso (areia/lama entalada corta a vedação). Troca de retentor: serviço de oficina especializada, R$ 150–300 por conjunto completo (retentor + guarda-pó).',
  },
  {
    severity: 'WARN',
    title: 'Kit relação (corrente/coroa/pinhão) desgastando rápido — inspecione a cada sessão',
    body: 'O torque elevado do motor 4T de 249cc em giro alto desgasta o kit relação rapidamente em uso competitivo. Corrente com "pontos duros" (não dobra uniformemente) ou dentes de coroa em formato de gancho são sinais de substituição necessária. Não economize trocando só a corrente com coroa gasta — isso acelera o desgaste da corrente nova.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar mal vedado: entrada de poeira causa desgaste severo do cilindro',
    body: 'Se o filtro de ar não estiver perfeitamente vedado na caixa de admissão (falha comum ao remontar após lavagem, ou guarnição de vedação desgastada), poeira entra diretamente no motor. Isso é especialmente crítico com a compressão alta e as tolerâncias apertadas de um motor de competição — pode causar desgaste severo do cilindro e anéis em poucas horas. Sempre confira o encaixe perfeito da guarnição de vedação do filtro antes de fechar a caixa de ar.',
  },
]

const KX250_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma KX250 / KX250X: baseado em HORÍMETRO — motocross de competição exige manutenção rigorosa',
    body: 'Motocross usa horas de motor como referência principal (não odômetro). Equivalência aproximada: 1 hora de pista ≈ 25–35 km, usada aqui só como referência. | Após cada sessão — Lavar/reoleiar filtro de ar. Lubrificar corrente 520. Verificar nível de óleo (visor ou vareta). | 5 horas (~150 km) — Troca de óleo (10W-40 API SL JASO MA2, ~1,0L) em uso competitivo. | 8–10 horas (~250–300 km) — Troca de óleo em uso recreativo. Verificar vela CPR8EB-9. | 15 horas (~450 km) — Trocar vela preventivamente. Revisão de suspensão (óleo do garfo 48mm e Uni-Trak). Inspecionar kit relação. | 20–25 horas — Revisão geral do motor: folga de válvulas (DOHC, consulte manual para valores exatos — apertada e crítica em alta compressão), estado dos anéis de pistão. | Pós-temporada / anual — Revisão completa: pistão/cilindro, rolamentos de roda e direção, mangueiras de coolant, sistema de freios.',
  },
]

// ─── KX 450 (cobre "KX 450 F" e "KX 450 X") ────────────────────────────────────
// Motor: 449cc DOHC monocilíndrico 4T, refrigerado a líquido | compressão 12,5:1 | Câmbio 5 velocidades
// Potência: 54 cv @ 9.000 rpm | Torque: 4,3 kgf.m @ 6.700 rpm | Injeção eletrônica
// Óleo: 10W-40 API SL JASO MA2 — capacidade 1,0L | Vela: NGK CPR8EB-9 (colder: CPR9EB-9)
// Pneu: 80/100-21 (F) / 110/90-18 ou 120/80-19 conforme versão (R) | Pressão: 14 PSI (F) / 18 PSI (R) — valores de fábrica, mais altos que o usual de pista (ajuste conforme terreno)
// Corrente 520 | Suspensão: garfo invertido 49mm | Uni-Trak traseiro | Tanque: 6,2L | Peso: ~105kg
// KX 450 X: cross-country — roda traseira 18" (vs 19" do KX450 padrão), suspensão com curso/ajuste voltado a trilha, permite pneus de perfil mais alto e pressões mais baixas

const KX450_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 API SL JASO MA2 — 1,0L — troque a cada 5 horas em competição',
    body: 'Capacidade de óleo do motor: 1,0L (conferido em ficha oficial). Use 10W-40 API SL JASO MA2 de qualidade racing: Motul 300V 4T Off-Road, Motorex Formula Racing 4T, Putoline DX4. O motor de 449cc com 54 cv trabalha em giro alto constante em motocross — troque a cada 5 horas de competição, até 8 horas em uso recreativo mais tranquilo. Nunca ultrapasse esse intervalo — a lubrificação semisseca depende de óleo limpo para proteger virabrequim e biela sob carga alta.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR8EB-9 (ou CPR9EB-9 colder) — inspecione a cada 8–10 horas',
    body: 'Vela padrão de fábrica: NGK CPR8EB-9. Para uso em pista muito quente ou giro sustentado muito alto (competição em clima quente), a versão "colder" NGK CPR9EB-9 previne detonação prematura. Gap conforme especificação NGK padrão para a família (verifique embalagem — tipicamente 0,7-0,8mm). Inspecione a cada 8–10 horas de uso; troque preventivamente antes de competições importantes.',
  },
  {
    severity: 'OK',
    title: 'Pressão de pneu: referência de fábrica 14 PSI (F) / 18 PSI (R) — ajuste conforme terreno',
    body: 'A especificação oficial de fábrica indica 14 PSI dianteiro e 18 PSI traseiro — valores mais altos que o comumente usado em pista de motocross pura (onde pilotos experientes costumam rodar 12–13 PSI F / 12,5–13,5 PSI R para maior aderência). Para uso geral seguro (especialmente iniciantes ou terreno pedregoso, onde pressão baixa demais aumenta risco de fura por pinch/beliscão na câmara), a referência de fábrica é o ponto de partida mais seguro. Pilotos avançados ajustam para baixo conforme o tipo de solo — consulte um setup específico com mecânico de pista antes de reduzir muito a pressão.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — kit relação de alta performance dura 15–25h conforme uso',
    body: 'Corrente passo 520 (leve, própria para competição). Em uso de motocross competitivo, a corrente pode durar apenas 15–20 horas por causa do torque elevado do 449cc; em uso recreativo mais tranquilo, 25–30 horas. Lubrifique após cada sessão de uso. Marcas recomendadas: DID ERT3 (competição, sem O-ring) ou DID VX3 (O-ring, mais durável para uso misto).',
  },
  {
    severity: 'OK',
    title: 'KX 450 X (cross-country): roda traseira 18" permite pneus de perfil mais alto e pressões mais baixas',
    body: 'A versão X troca a roda traseira de 19" (KX450 padrão) por 18", possibilitando o uso de pneus com parede mais alta — mais conforto e aderência em trilha, com margem para rodar em pressões um pouco mais baixas sem risco elevado de beliscão em relação à roda de 19". Suspensão (garfo 49mm invertido + Uni-Trak) recebe calibração de fábrica voltada a absorver irregularidades constantes de trilha em vez de saltos de pista de motocross. Peças de motor são compartilhadas com o KX450 padrão.',
  },
  {
    severity: 'OK',
    title: 'Suspensão 49mm invertida: revisão de óleo a cada 15–20 horas em uso competitivo',
    body: 'Garfo invertido de 49mm com ajuste de fábrica voltado a corrida. Em competição intensa, revise o óleo da suspensão a cada 15–20 horas — o calor e o trabalho constante degradam as propriedades do óleo, afetando diretamente a resposta em saltos e frenagens fortes. Em uso recreativo, pode esticar para 30 horas. Serviço deve ser feito em oficina especializada em suspensão — ajuste incorreto compromete segurança em saltos de motocross.',
  },
]

const KX450_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Detonação em compressão 12,5:1 por combustível ruim ou vela gasta — risco de dano ao motor',
    body: 'Com taxa de compressão de 12,5:1 e 54 cv de potência, o motor do KX450 é sensível a combustível de baixa qualidade e vela gasta. Detonação sob carga alta pode danificar pistão, anéis e biela rapidamente. Use gasolina de posto confiável e nunca ultrapasse o intervalo de troca de vela. Sintoma: ruído metálico agudo em aceleração plena, perda de potência progressiva ao longo de uma sessão.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem desgastando rápido com o torque elevado do 449cc em uso competitivo',
    body: 'O torque de 4,3 kgf.m aliado a uso agressivo em largadas e curvas fechadas desgasta discos de embreagem rapidamente — mais que no KX250, dado o torque maior. Sintoma: patinação sob carga máxima, ponto de engate mudando de posição no manete. Kit de discos: consulte concessionária Kawasaki (M3 Parts, Kawaparts) para peça específica do modelo/ano. Inspecione a cada 15 horas em uso competitivo semanal.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor do garfo 49mm após uso intenso em saltos',
    body: 'O impacto de saltos de motocross de uma moto mais pesada e potente (449cc) desgasta os retentores do garfo mais rápido que motos menores. Sintoma: óleo na parte externa dos tubos internos, perda perceptível de amortecimento na frenagem forte antes de curvas. Limpe os tubos após cada uso — areia/lama entalada corta a vedação. Troca de retentores: serviço de oficina especializada em suspensão, R$ 200–350 por conjunto.',
  },
  {
    severity: 'WARN',
    title: 'Kit relação 520 desgastando rápido pelo torque elevado — inspecione a cada sessão',
    body: 'O torque alto do KX450 desgasta corrente e coroa mais rápido que motos de cilindrada menor. Corrente "endurecida" em pontos (não dobra uniformemente) ou coroa com dentes em formato de gancho indicam necessidade de troca do kit completo. Trocar só a corrente com coroa gasta acelera o desgaste da peça nova — sempre troque o conjunto.',
  },
  {
    severity: 'WARN',
    title: 'Radiador exposto: risco de dano em quedas — verifique vazamento antes de cada uso',
    body: 'Como em toda moto de motocross, o radiador fica exposto lateralmente e pode amassar ou furar em quedas/tombos. Verifique visualmente antes de cada sessão: manchas esverdeadas/rosadas de coolant seco no chassi indicam vazamento. Mangueiras de silicone ressecadas pelo calor também podem rachar com o tempo — inspecione periodicamente, principalmente após qualquer impacto relevante.',
  },
]

const KX450_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma KX450 / KX450X: baseado em HORÍMETRO — motor de alta performance exige rigor',
    body: 'Motocross usa horas de motor como referência principal. Equivalência aproximada: 1 hora de pista ≈ 25–35 km, usada aqui só como referência para o campo de quilometragem. | Após cada sessão — Lavar/reoleiar filtro de ar. Lubrificar corrente 520. Verificar coolant. Verificar pressão dos pneus (referência 14 PSI F / 18 PSI R, ajustável por terreno). | 5 horas (~150 km) — Troca de óleo (10W-40 API SL JASO MA2, 1,0L) em uso competitivo. | 8 horas (~250 km) — Troca de óleo em uso recreativo. Inspecionar vela CPR8EB-9. | 10–15 horas (~350–450 km) — Trocar vela preventivamente. Revisão de suspensão (garfo 49mm e Uni-Trak). Inspecionar kit relação 520. | 20 horas — Revisão geral do motor: folga de válvulas DOHC (consulte manual para valores exatos), estado do pistão e anéis. Verificar discos de embreagem. | Pós-temporada / anual — Revisão completa: cilindro/pistão, rolamentos de roda e direção, sistema de freios, mangueiras de coolant e combustível.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'KLX 110',
    yearFrom: null,
    yearTo: null,
    MACETES: KLX110_MACETES,
    PROBLEMAS: KLX110_PROBLEMAS,
    MANUTENCAO: KLX110_MANUTENCAO,
  },
  {
    modelName: 'KLX 300R',
    yearFrom: null,
    yearTo: null,
    MACETES: KLX300R_MACETES,
    PROBLEMAS: KLX300R_PROBLEMAS,
    MANUTENCAO: KLX300R_MANUTENCAO,
  },
  {
    modelName: 'KX 112',
    yearFrom: null,
    yearTo: null,
    MACETES: KX112_MACETES,
    PROBLEMAS: KX112_PROBLEMAS,
    MANUTENCAO: KX112_MANUTENCAO,
  },
  {
    modelName: 'KX 250',
    yearFrom: null,
    yearTo: null,
    MACETES: KX250_MACETES,
    PROBLEMAS: KX250_PROBLEMAS,
    MANUTENCAO: KX250_MANUTENCAO,
  },
  {
    modelName: 'KX 450',
    yearFrom: null,
    yearTo: null,
    MACETES: KX450_MACETES,
    PROBLEMAS: KX450_PROBLEMAS,
    MANUTENCAO: KX450_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'KLX 110',
    yearFrom: null, yearTo: null,
    tireSize: '2.50-14 (F) · 3.00-12 (R)',
    frontPsi: 15, rearPsi: 15,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Moto infantil/iniciante de uso misto quintal-trilha leve. Pressão de referência 15 PSI em ambos os pneus — reduza para 12-13 PSI em uso só de terra macia/grama para mais aderência; mantenha 15+ se rodar também em piso batido ou asfalto curto. Valor não confirmado em manual oficial — use como ponto de partida e ajuste pela sensação de pilotagem da criança.',
  },
  {
    modelName: 'KLX 300R',
    yearFrom: null, yearTo: null,
    tireSize: '80/100-21 (F) · 100/100-18 (R)',
    frontPsi: 14, rearPsi: 14,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Uso off-road/trilha. Referência inicial 14 PSI em ambos — em trilha técnica com pedras, considere subir para 15-16 PSI (evita beliscão/pinch flat no aro); em terra macia/areia, pode reduzir para 12-13 PSI para mais tração. Pneus originais D.I.D com aro preto anodizado. Verifique sempre com pneu frio.',
  },
  {
    modelName: 'KX 112',
    yearFrom: null, yearTo: null,
    tireSize: '70/100-19 (F) · 90/100-16 (R) aprox.',
    frontPsi: 13, rearPsi: 13,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Motocross júnior — pressões baixas típicas de pista de terra. Referência 13 PSI em ambos os pneus (faixa recomendada geral para motocross: 10-14 PSI). Em pista dura/hard-pack, suba para 13-14 PSI; em areia, reduza para 11-12 PSI. Sempre calibre com pneu frio antes de cada sessão — pressão baixa demais aumenta risco de danificar o aro em pouso de salto.',
  },
  {
    modelName: 'KX 250',
    yearFrom: null, yearTo: null,
    tireSize: '80/100-21 (F) · 100/90-19 (R)',
    frontPsi: 13, rearPsi: 13,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Motocross — faixa recomendada geral 12-14 PSI conforme terreno. Referência de trabalho: 13 PSI frente e trás. Pista dura/hard-pack: 13-15 PSI (evita beliscão em pouso de salto). Areia/terra macia: 11-12 PSI (mais tração). Versão KX 250 X (cross-country, roda traseira 18"): pode rodar levemente mais baixo, 12-13 PSI traseiro, dado o pneu de perfil mais alto.',
  },
  {
    modelName: 'KX 450',
    yearFrom: null, yearTo: null,
    tireSize: '80/100-21 (F) · 110/90-18 (R)',
    frontPsi: 14, rearPsi: 18,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Valores de fábrica confirmados: 14 PSI dianteiro / 18 PSI traseiro. Nota importante: esses são valores de referência de fábrica, mais altos que a prática comum de pilotos de pista (12-13 PSI F / 12,5-13,5 PSI R). Fábrica prioriza segurança contra furo por beliscão; pilotos experientes ajustam para baixo conforme o solo. Para iniciantes ou terreno pedregoso, prefira os valores de fábrica. Versão KX 450 X (roda traseira 18"): mesma lógica, pode reduzir levemente a pressão traseira em trilha macia.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // KLX 110
  { modelName: 'KLX 110', yearFrom: null, yearTo: null, component: 'Óleo motor 10W-40 JASO MA (~0,9–1,0L)', intervalKm: 500, intervalMonths: 3, notes: 'Cárter úmido com embreagem banhada em óleo. Uso infantil/treino: giro alto constante degrada óleo rápido.', priority: 'HIGH', order: 1 },
  { modelName: 'KLX 110', yearFrom: null, yearTo: null, component: 'Filtro de ar de espuma — lavar e reoleiar', intervalKm: null, intervalMonths: null, notes: 'Após CADA saída em terra/trilha. Usar óleo específico de filtro (Motul A1, Twin Air) — nunca óleo de motor comum.', priority: 'CRITICAL', order: 2 },
  { modelName: 'KLX 110', yearFrom: null, yearTo: null, component: 'Vela NGK CR6HSA (gap 0,6–0,7mm)', intervalKm: 1000, intervalMonths: null, notes: 'Troca preventiva a cada 15–20h de uso em aula/treino intensivo.', priority: 'MEDIUM', order: 3 },
  { modelName: 'KLX 110', yearFrom: null, yearTo: null, component: 'Corrente 428 — lubrificação', intervalKm: null, intervalMonths: null, notes: 'Após cada saída em terra/pó. Folga 20–30mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'KLX 110', yearFrom: null, yearTo: null, component: 'Kit relação 428 (coroa 38T / pinhão 13T)', intervalKm: 3000, intervalMonths: null, notes: 'Redução final 2,923. Trocar kit completo quando desgastado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'KLX 110', yearFrom: null, yearTo: null, component: 'Embreagem centrífuga — inspeção de calços (versão automática)', intervalKm: 2000, intervalMonths: null, notes: 'Verificar desgaste por trocas bruscas de marcha durante aprendizado.', priority: 'MEDIUM', order: 6 },
  { modelName: 'KLX 110', yearFrom: null, yearTo: null, component: 'Retentores da bengala dianteira', intervalKm: null, intervalMonths: 12, notes: 'Inspecionar após quedas relevantes — impacto danifica vedação.', priority: 'MEDIUM', order: 7 },
  { modelName: 'KLX 110', yearFrom: null, yearTo: null, component: 'Carburador — drenar antes de guarda prolongada', intervalKm: null, intervalMonths: 1, notes: 'Se parada > 30–45 dias: drenar cuba ou usar estabilizador de combustível.', priority: 'LOW', order: 8 },
  { modelName: 'KLX 110', yearFrom: null, yearTo: null, component: 'Aperto geral de parafusos', intervalKm: null, intervalMonths: 12, notes: 'Vibração de uso em terra afrouxa parafusos — revisão geral anual.', priority: 'MEDIUM', order: 9 },

  // KLX 300R
  { modelName: 'KLX 300R', yearFrom: null, yearTo: null, component: 'Óleo motor 10W-40 JASO MA (~1,0–1,2L, confirmar no manual)', intervalKm: 1000, intervalMonths: 6, notes: 'Motor DOHC 292cc líquido. Capacidade exata não confirmada nas fichas públicas — verificar manual do proprietário.', priority: 'HIGH', order: 1 },
  { modelName: 'KLX 300R', yearFrom: null, yearTo: null, component: 'Filtro de ar de espuma — lavar e reoleiar', intervalKm: null, intervalMonths: null, notes: 'Após cada trilha. Injeção eletrônica depende de leitura correta — filtro sujo pode cortar potência.', priority: 'CRITICAL', order: 2 },
  { modelName: 'KLX 300R', yearFrom: null, yearTo: null, component: 'Vela (modelo conforme manual — família CR/CPR NGK)', intervalKm: 3000, intervalMonths: null, notes: 'Modelo exato não confirmado — consultar manual do proprietário antes da compra.', priority: 'MEDIUM', order: 3 },
  { modelName: 'KLX 300R', yearFrom: null, yearTo: null, component: 'Líquido de arrefecimento — nível', intervalKm: null, intervalMonths: null, notes: 'Verificar antes/depois de cada trilha. Usar coolant específico de moto, nunca água pura.', priority: 'HIGH', order: 4 },
  { modelName: 'KLX 300R', yearFrom: null, yearTo: null, component: 'Corrente 520 (coroa 50T / pinhão 14T) — lubrificação', intervalKm: null, intervalMonths: null, notes: 'Redução final 3,57:1. Lubrificar após cada trilha, preferir corrente O-ring/X-ring.', priority: 'HIGH', order: 5 },
  { modelName: 'KLX 300R', yearFrom: null, yearTo: null, component: 'Revisão de suspensão (garfo 43mm invertido + monoamortecedor, 285mm curso)', intervalKm: 6000, intervalMonths: 12, notes: 'Óleo de suspensão degrada com uso pesado em lama/areia. Oficina especializada.', priority: 'MEDIUM', order: 6 },
  { modelName: 'KLX 300R', yearFrom: null, yearTo: null, component: 'Folga de válvulas DOHC', intervalKm: 3000, intervalMonths: 12, notes: 'Consultar manual para valores exatos — motor de alta compressão exige folga precisa.', priority: 'HIGH', order: 7 },
  { modelName: 'KLX 300R', yearFrom: null, yearTo: null, component: 'Kit relação 520 completo', intervalKm: 5000, intervalMonths: null, notes: 'Mais cedo em uso pesado de lama/areia. Trocar corrente+coroa+pinhão juntos.', priority: 'MEDIUM', order: 8 },
  { modelName: 'KLX 300R', yearFrom: null, yearTo: null, component: 'Conectores elétricos / TPS — inspeção', intervalKm: null, intervalMonths: 6, notes: 'Vibração e água podem causar falhas intermitentes de injeção.', priority: 'LOW', order: 9 },

  // KX 112
  { modelName: 'KX 112', yearFrom: null, yearTo: null, component: 'Mistura de combustível 2T — 32:1 pré-misturada', intervalKm: null, intervalMonths: null, notes: 'SEMPRE pré-misturar no galão antes de abastecer. Óleo específico 2T motocross (Motul 800, Putoline MX2).', priority: 'CRITICAL', order: 1 },
  { modelName: 'KX 112', yearFrom: null, yearTo: null, component: 'Filtro de ar espuma dupla camada — lavar e reoleiar', intervalKm: null, intervalMonths: null, notes: 'Após CADA sessão de uso — motor 2T pequeno é extremamente sensível a poeira.', priority: 'CRITICAL', order: 2 },
  { modelName: 'KX 112', yearFrom: null, yearTo: null, component: 'Vela — família NGK BR (confirmar código exato no manual)', intervalKm: null, intervalMonths: null, notes: 'Troca a cada 5–10h de uso competitivo. Levar sempre vela reserva.', priority: 'MEDIUM', order: 3 },
  { modelName: 'KX 112', yearFrom: null, yearTo: null, component: 'Limpeza da válvula KIPS (carbono)', intervalKm: null, intervalMonths: null, notes: 'A cada 10–15h de uso. Serviço de mecânico especializado em 2T.', priority: 'HIGH', order: 4 },
  { modelName: 'KX 112', yearFrom: null, yearTo: null, component: 'Líquido de arrefecimento — nível', intervalKm: null, intervalMonths: null, notes: 'Verificar antes de cada treino/corrida. Checar radiador após quedas.', priority: 'HIGH', order: 5 },
  { modelName: 'KX 112', yearFrom: null, yearTo: null, component: 'Kit relação — inspeção', intervalKm: null, intervalMonths: null, notes: 'A cada 3–5 sessões de treino. Desgaste rápido pelo torque instantâneo do 2T.', priority: 'MEDIUM', order: 6 },
  { modelName: 'KX 112', yearFrom: null, yearTo: null, component: 'Revisão de suspensão (garfo 36mm invertido + Uni-Trak, 275mm curso)', intervalKm: null, intervalMonths: null, notes: 'A cada 20–25h de uso. Oficina especializada em suspensão de motocross júnior.', priority: 'MEDIUM', order: 7 },
  { modelName: 'KX 112', yearFrom: null, yearTo: null, component: 'Revisão geral do motor 2T (pistão/anéis/retentores)', intervalKm: null, intervalMonths: null, notes: 'A cada 15–20h — motor 2T de competição exige revisão de topo periódica.', priority: 'HIGH', order: 8 },
  { modelName: 'KX 112', yearFrom: null, yearTo: null, component: 'Discos de embreagem — inspeção', intervalKm: null, intervalMonths: null, notes: 'Desgaste acelerado por uso de "arrastar embreagem" comum em iniciantes.', priority: 'MEDIUM', order: 9 },

  // KX 250
  { modelName: 'KX 250', yearFrom: null, yearTo: null, component: 'Óleo motor 10W-40 API SL JASO MA2 (~1,0L, cárter semisseco)', intervalKm: 150, intervalMonths: null, notes: '≈5h de competição. Uso recreativo: até 8h/≈250km. Confirmar capacidade exata no manual.', priority: 'CRITICAL', order: 1 },
  { modelName: 'KX 250', yearFrom: null, yearTo: null, component: 'Filtro de ar espuma — lavar e reoleiar', intervalKm: null, intervalMonths: null, notes: 'Após CADA sessão. Vedação perfeita é crítica — poeira desgasta cilindro rápido em compressão 14,2:1.', priority: 'CRITICAL', order: 2 },
  { modelName: 'KX 250', yearFrom: null, yearTo: null, component: 'Vela NGK CPR8EB-9 (colder: CPR9EB-9)', intervalKm: 450, intervalMonths: null, notes: '≈15h de uso. Modelos antigos pré-injeção: NGK CR8E.', priority: 'HIGH', order: 3 },
  { modelName: 'KX 250', yearFrom: null, yearTo: null, component: 'Corrente 520 (DID ERT3 ou VX3) — lubrificação', intervalKm: null, intervalMonths: null, notes: 'Após cada sessão. Kit relação dura 15–40h conforme uso.', priority: 'HIGH', order: 4 },
  { modelName: 'KX 250', yearFrom: null, yearTo: null, component: 'Revisão de suspensão (garfo 48mm invertido + Uni-Trak)', intervalKm: 450, intervalMonths: null, notes: '≈15–20h em competição. Oficina especializada — ajuste incorreto compromete segurança em saltos.', priority: 'HIGH', order: 5 },
  { modelName: 'KX 250', yearFrom: null, yearTo: null, component: 'Folga de válvulas DOHC', intervalKm: 600, intervalMonths: null, notes: '≈20h. Consultar manual para valores exatos — crítico em alta compressão.', priority: 'HIGH', order: 6 },
  { modelName: 'KX 250', yearFrom: null, yearTo: null, component: 'Discos de embreagem — inspeção', intervalKm: 450, intervalMonths: null, notes: '≈15–20h em uso competitivo. Desgaste por largadas e curvas fechadas.', priority: 'MEDIUM', order: 7 },
  { modelName: 'KX 250', yearFrom: null, yearTo: null, component: 'Kit relação 520 completo', intervalKm: null, intervalMonths: null, notes: 'Corrente + coroa + pinhão juntos. Inspecionar a cada sessão.', priority: 'MEDIUM', order: 8 },
  { modelName: 'KX 250', yearFrom: null, yearTo: null, component: 'Revisão geral pós-temporada (pistão/anéis/rolamentos)', intervalKm: null, intervalMonths: 12, notes: 'Revisão completa anual ou pós-temporada de competição.', priority: 'HIGH', order: 9 },

  // KX 450
  { modelName: 'KX 450', yearFrom: null, yearTo: null, component: 'Óleo motor 10W-40 API SL JASO MA2 (1,0L)', intervalKm: 150, intervalMonths: null, notes: '≈5h de competição. Uso recreativo: até 8h/≈250km. Capacidade confirmada em ficha oficial.', priority: 'CRITICAL', order: 1 },
  { modelName: 'KX 450', yearFrom: null, yearTo: null, component: 'Filtro de ar espuma — lavar e reoleiar', intervalKm: null, intervalMonths: null, notes: 'Após CADA sessão. Compressão 12,5:1 exige vedação perfeita do filtro.', priority: 'CRITICAL', order: 2 },
  { modelName: 'KX 450', yearFrom: null, yearTo: null, component: 'Vela NGK CPR8EB-9 (colder: CPR9EB-9)', intervalKm: 300, intervalMonths: null, notes: '≈8–10h de uso. Inspecionar regularmente por detonação.', priority: 'HIGH', order: 3 },
  { modelName: 'KX 450', yearFrom: null, yearTo: null, component: 'Pressão dos pneus (14 PSI F / 18 PSI R de fábrica)', intervalKm: null, intervalMonths: null, notes: 'Verificar antes de cada sessão, sempre com pneu frio. Ajustar conforme terreno.', priority: 'MEDIUM', order: 4 },
  { modelName: 'KX 450', yearFrom: null, yearTo: null, component: 'Corrente 520 — lubrificação', intervalKm: null, intervalMonths: null, notes: 'Após cada sessão. Kit relação dura 15–30h — torque elevado desgasta rápido.', priority: 'HIGH', order: 5 },
  { modelName: 'KX 450', yearFrom: null, yearTo: null, component: 'Revisão de suspensão (garfo 49mm invertido + Uni-Trak)', intervalKm: 450, intervalMonths: null, notes: '≈15–20h em competição. Oficina especializada em suspensão de motocross.', priority: 'HIGH', order: 6 },
  { modelName: 'KX 450', yearFrom: null, yearTo: null, component: 'Folga de válvulas DOHC', intervalKm: 600, intervalMonths: null, notes: '≈20h. Consultar manual para valores exatos.', priority: 'HIGH', order: 7 },
  { modelName: 'KX 450', yearFrom: null, yearTo: null, component: 'Discos de embreagem — inspeção', intervalKm: 450, intervalMonths: null, notes: '≈15h. Torque de 4,3 kgf.m desgasta discos mais rápido que motos menores.', priority: 'MEDIUM', order: 8 },
  { modelName: 'KX 450', yearFrom: null, yearTo: null, component: 'Kit relação 520 completo', intervalKm: null, intervalMonths: null, notes: 'Corrente + coroa + pinhão. Inspecionar a cada sessão.', priority: 'MEDIUM', order: 9 },
  { modelName: 'KX 450', yearFrom: null, yearTo: null, component: 'Revisão geral pós-temporada (pistão/anéis/rolamentos/radiador)', intervalKm: null, intervalMonths: 12, notes: 'Revisão completa anual ou pós-temporada. Verificar radiador por danos de queda.', priority: 'HIGH', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Kawasaki KLX / KX (off-road & motocross)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'KAWASAKI', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'KAWASAKI', vehicleTypeId: motoType.id },
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

  console.log('✅ Kawasaki KLX / KX concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
