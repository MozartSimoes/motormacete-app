// seed-triumph-speed400-scrambler400.ts — Triumph Speed 400 e Scrambler 400 X/XC
// Motor monocilíndrico 398cc DOHC líquido, desenvolvido e FABRICADO EM PARCERIA COM A BAJAJ
// (fábrica de Chakan, Pune, Índia) — mesma linha que produz KTM 390 e Bajaj Dominar 400.
// Lançados globalmente em 2023, chegaram ao Brasil em 2024 — modelos de entrada mais
// acessíveis da Triumph, responsáveis pela expansão recente da marca no país.
// Execute: pnpm --filter @motormacete/database db:seed:triumph-speed400-scrambler400
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

// ─── SPEED 400 ────────────────────────────────────────────────────────────────
// Motor: 398,15cc DOHC 4V líquido monocilíndrico | 40cv (39,5hp) @ 8.000rpm | 37,5Nm (3,75kgf.m) @ 6.500rpm
// Bore x stroke 89,0×64,0mm | Compressão 12:1 | Óleo 10W-40 API SN/JASO MA2, 2,0L (com filtro)
// Vela NGK LKAR8AI-9 (iridium, pré-gapeada) | Corrente 520 X-ring, pinhão 15T / coroa 43T, 103 elos
// Pneu: 110/70-17 (F) / 150/60-17 (R) | Rodas fundidas 17×3in (F) / 17×4in (R) | Tanque 13L | 170kg | Assento 790mm

const SPEED400_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 API SN/JASO MA2 — só 2,0L na troca, motor barato de manter',
    body: 'O monocilíndrico 398cc da Speed 400 (o único motor de 1 cilindro de toda a linha Triumph — o resto é bi ou tricilíndrico) leva apenas 2,0L de óleo com filtro, contra 3,5–4,0L dos modelos maiores da marca. Use sempre 10W-40 API SN ou JASO MA2 (embreagem úmida — nunca óleo sem certificação JASO MA, escorrega a embreagem). Marcas testadas por proprietários: Castrol Power1 10W-40 (kit oficial de troca vendido pela própria Triumph), Motul 7100 10W-50 também é usado sem problema. Troca a cada 16.000 km ou 12 meses, o que vier primeiro — intervalo generoso para uma moto de entrada.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LKAR8AI-9 (iridium) já vem pré-gapeada — não force o calibrador',
    body: 'A vela original é a NGK LKAR8AI-9, de irídio, vendida já com o gap de fábrica ajustado — a Triumph não publica um valor de gap para reajuste manual porque não é necessário mexer. Torque de instalação: 12 Nm. Por ser irídio, a vida útil é longa (não há um número oficial divulgado, mas a experiência de proprietários aponta tranquilidade até os 20.000–24.000 km). Evite velas genéricas mais baratas — o motor de alta compressão (12:1) é mais exigente que motos chinesas de entrada.',
  },
  {
    severity: 'OK',
    title: 'Válvulas com seguidor de dedo (finger-follower) e revestimento DLC: intervalo de 32.000 km',
    body: 'A Speed 400 usa um trem de válvulas com seguidores de dedo de baixa massa recíproca e revestimento DLC (Diamond-Like Carbon) — tecnologia normalmente vista em motos esportivas maiores. Resultado: o intervalo oficial de checagem de folga de válvulas é de 32.000 km, o dobro do praticado por muitas 300–400cc concorrentes. Isso reduz bastante o custo de manutenção ao longo da vida da moto — guarde esse dado para orçar revisões: não deixe uma oficina cobrar checagem de válvula antes da hora.',
  },
  {
    severity: 'OK',
    title: 'Fabricação pela Bajaj (Chakan, Índia): peças de desgaste com mais opções de compatibilidade',
    body: 'A Speed 400 é desenvolvida e fabricada em parceria com a Bajaj Auto, na mesma fábrica de Chakan (Pune) que produz a KTM Duke 390 e a Bajaj Dominar 400. Isso é ótima notícia para o bolso: peças de desgaste como pastilhas de freio sinterizadas Brembo, kit relação (corrente + pinhão + coroa) e alguns componentes de suspensão têm compatibilidade de projeto com esses modelos irmãos. Diferente de uma Triumph 100% inglesa/tricilíndrica, aqui há mais chance de encontrar peça alternativa de qualidade e preço menor que a peça genuína importada.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 X-ring — lubrifique a cada 300 km (chuva) / 500-600 km (seco)',
    body: 'Kit relação: corrente 520 X-ring, pinhão 15 dentes, coroa 43 dentes, 103 elos. A Triumph recomenda lubrificação a cada 300 km em uso na chuva, e a cada 500–600 km em uso seco normal — inspecione a cada revisão. Corrente e coroa/pinhão de reposição (DID 520VX3 ou Rolon) custam bem menos que peça genuína Triumph e servem sem modificação. Folga recomendada: consulte o manual, mas a régua prática de 25–35mm no trecho inferior serve como referência de campo.',
  },
  {
    severity: 'OK',
    title: 'Pneus 110/70-17 (F) / 150/60-17 (R) — calibragem 26/33 PSI evita desgaste irregular',
    body: 'A Speed 400 usa rodas fundidas de liga leve, 17×3in dianteira e 17×4in traseira, com pneus 110/70-17 e 150/60-17. Calibragem recomendada: 26 PSI dianteiro / 33 PSI traseiro solo. Verifique a cada 15 dias — vários proprietários relatam perda de pressão de alguns PSI em poucos dias, então não confie apenas na inspeção visual do pneu. Pneus originais de fábrica são Michelin ou MRF (mercado indiano); substitutos com boa reputação: Michelin Road 5, Pirelli Angel GT II.',
  },
  {
    severity: 'WARN',
    title: 'Moto de entrada: cuidado com oficinas que tentam vender revisão em intervalo de moto grande',
    body: 'Por ser o modelo mais acessível da marca, a Speed 400 atrai muitos donos de primeira moto, e algumas concessionárias tentam empurrar pacotes de revisão pensados para as Triumph tricilíndricas maiores (que exigem mais óleo, mais frequência). Confira sempre o manual do proprietário: óleo a cada 16.000 km, válvulas a cada 32.000 km. Pagar por revisão fora desse intervalo é gasto desnecessário — o motor Bajaj-Triumph foi desenhado para ser barato de manter, essa é inclusive a principal vantagem de custo do modelo.',
  },
]

const SPEED400_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Suspensão sem graxa de fábrica: caso documentado no Brasil (Reclame Aqui)',
    body: 'Há relato documentado de proprietário brasileiro que precisou gastar cerca de R$ 1.600 em mecânico independente porque a suspensão (bengala dianteira) saiu de fábrica sem graxa/lubrificante aplicado corretamente na montagem, causando ruído e funcionamento seco prematuro. Se a sua Speed 400 apresentar ruído metálico ou rigidez anormal na suspensão dianteira ainda nos primeiros milhares de km, exija inspeção em garantia antes de pagar do próprio bolso — é um defeito de montagem, não de desgaste.',
  },
  {
    severity: 'DANGER',
    title: 'ABS e controle de tração com falhas intermitentes reportadas',
    body: 'Múltiplos relatos (Brasil e Índia) de painel de ABS e controle de tração desligando ou falhando de forma intermitente durante o uso, deixando o piloto sem esses sistemas de segurança em pleno funcionamento. Se a luz de ABS/TC acender e não apagar, ou se você notar que o sistema não está atuando em frenagens de teste em piso escorregadio, leve para a concessionária imediatamente — não é um problema para adiar, é falha de sistema de segurança ativa.',
  },
  {
    severity: 'DANGER',
    title: 'Parafuso do disco de freio soltando — trave a inspeção nas primeiras revisões',
    body: 'Existe relato de proprietário que teve parafuso de fixação do disco de freio se soltando durante o uso, travando a roda em movimento — risco real de queda. Nas revisões (ou por conta própria com torquímetro), verifique o torque dos parafusos do disco de freio dianteiro e traseiro. Qualquer ruído de "tec-tec" vindo da roda ou vibração no freio que não existia antes merece parada imediata para inspeção.',
  },
  {
    severity: 'WARN',
    title: 'Consumo excessivo de óleo — luz de óleo já acendendo a partir de 7.600 km em alguns casos',
    body: 'Há relato de consumo de óleo acima do normal, com a luz de alerta de nível baixo acendendo já aos 7.600 km — bem antes do intervalo de troca de 16.000 km. Não é a norma para o motor, mas se acontecer com o seu, meça o nível a cada 1.000 km por um tempo para quantificar o consumo real. Se cair mais de ~150-200mL entre revisões sem vazamento visível, documente e acione a garantia — pode indicar problema nos anéis do pistão ou retentores de válvula.',
  },
  {
    severity: 'WARN',
    title: 'Infiltração de água: banco, setas e painel — vede juntas antes do período de chuva',
    body: 'Relatos de água entrando pelo banco (por costura invertida que direciona água para dentro em vez de escorrer), acúmulo de água dentro das lanternas de seta, e embaçamento constante do painel digital por entrada de umidade. Antes da temporada de chuvas, aplique silicone automotivo nas bordas do assento e verifique se os conectores das setas têm graxa dielétrica. Painel embaçando por dentro do visor é sinal de vedação da carcaça comprometida — leve à garantia, não tente abrir e vedar por conta própria (perde garantia do módulo).',
  },
  {
    severity: 'WARN',
    title: 'Cabo de embreagem frouxo/quase se soltando — relato de folga excessiva',
    body: 'Proprietário relatou cabo de embreagem chegando quase a se desprender por folga excessiva. Verifique periodicamente a folga da alavanca de embreagem (referência: 2–3mm de folga antes de sentir resistência) e o estado da capa/terminal do cabo próximo à manete e ao motor. Cabo de embreagem para essa família de motos é peça simples e barata de trocar preventivamente — não espere soltar em movimento.',
  },
]

const SPEED400_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma oficial Speed 400 — motor monocilíndrico com intervalos generosos',
    body: '300–600 km — Primeira lubrificação de corrente (uso seco/chuva). | 1.000 km — Revisão inicial de rodagem: inspeção geral, torque de parafusos do motor e carenagens. | 16.000 km ou 12 meses — Troca de óleo (10W-40, 2,0L) + filtro de óleo, limpeza do coador de óleo, inspeção geral completa (freios, suspensão, elétrica, fluido de freio, arrefecimento). | 32.000 km — Checagem/ajuste de folga de válvulas (trem finger-follower com DLC — intervalo longo). | A cada revisão — Lubrificação de corrente (300 km na chuva / 500-600 km no seco), inspeção de pastilhas de freio, verificação de tensão de bateria, calibragem de pneus (26 PSI F / 33 PSI R). | 40.000 km — Fluido de arrefecimento (troca conforme especificação do líquido usado).',
  },
]

// ─── SCRAMBLER 400 X / SCRAMBLER 400 XC ──────────────────────────────────────
// Mesmo motor: 398cc DOHC 4V líquido monocilíndrico | 40cv (39,5hp) @ 8.000rpm | 37,5Nm @ 6.500rpm
// Óleo 10W-40 API SN/JASO MA2, 2,0L | Vela NGK LKAR8AI-9 | Corrente 520 X-ring endless, 106 elos
// 400 X: pneu 100/90-19 (F) / 140/80-17 (R), roda fundida | 400 XC: mesmos pneus, roda raiada Excel TUBELESS
// Suspensão: garfo Showa BPF 43mm invertido NÃO ajustável (mesmo em ambas versões) 150mm curso
// Monochoque com pré-carga ajustável, 150mm curso | Tanque 13L | X: 179kg / XC: ~186kg | Assento 835mm

const SCRAMBLER400_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor 398cc da Speed 400: manutenção igualmente barata (óleo 2,0L, válvulas a 32.000 km)',
    body: 'A Scrambler 400 X e a topo de linha 400 XC usam o mesmo motor monocilíndrico 398cc DOHC da Speed 400 — 40cv @ 8.000rpm, 37,5Nm @ 6.500rpm. Óleo: 10W-40 API SN/JASO MA2, apenas 2,0L, trocado a cada 16.000 km/12 meses. Válvulas com trem finger-follower revestido em DLC: checagem só a cada 32.000 km. É a mesma vantagem de custo de manutenção da Speed 400 — só muda a carroceria, suspensão de curso maior e postura mais aventureira.',
  },
  {
    severity: 'OK',
    title: 'Diferença real entre X e XC: rodas — não é suspensão nem motor',
    body: 'Marketing à parte, o motor e a suspensão (garfo Showa 43mm Big Piston Fork, NÃO ajustável, 150mm de curso; monochoque traseiro com ajuste de pré-carga, 150mm de curso) são praticamente idênticos entre a 400 X e a 400 XC. A diferença que realmente importa na hora de escolher: a XC tem rodas raiadas tubeless (aro Excel de alumínio, pneus Metzeler Karoo Street) contra a roda fundida da 400 X. Rodas tubeless facilitam reparo de furo na estrada (kit de buchas, sem precisar desmontar o pneu) — vantagem prática para quem roda estrada de terra.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LKAR8AI-9 (a mesma da Speed 400) — pré-gapeada, torque 12 Nm',
    body: 'Scrambler 400 X e XC usam a mesma vela NGK LKAR8AI-9 de irídio da Speed 400 (mesmo motor). Vem pré-gapeada de fábrica — não é necessário reajustar. Torque de instalação: 12 Nm. Boa notícia: por ser peça compartilhada entre os três modelos da família 400cc da Triumph, encontrar a vela em concessionárias e lojas de peças é mais fácil do que buscar item exclusivo de um único modelo.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 X-ring com 106 elos — mais longa que a Speed 400 pela geometria off-road',
    body: 'Por causa da roda dianteira maior (19") e curso de suspensão mais longo (150mm), a corrente da Scrambler 400 X/XC tem 106 elos (contra 103 da Speed 400), mesmo pitch 520 X-ring. Lubrifique a cada 300 km em uso na chuma/lama, 500-600 km em uso seco normal. Há relatos de proprietários trocando pinhão/coroa por peças compatíveis com a KTM Duke 390 e Bajaj Dominar 400 (mesma fábrica Bajaj) com sucesso — vale pesquisar antes de pagar preço de peça genuína importada.',
  },
  {
    severity: 'OK',
    title: 'Fabricação Bajaj: pastilhas de freio Brembo sinterizadas compartilhadas com KTM/Bajaj',
    body: 'Assim como a Speed 400, a linha Scrambler 400 é fabricada em parceria com a Bajaj em Chakan (Índia), na mesma linha da KTM Duke 390 e Bajaj Dominar 400. Pastilhas de freio Brembo sinterizadas originais têm compatibilidade documentada entre essas marcas do mesmo grupo. Isso é uma vantagem real de custo no Brasil: ao invés de esperar peça genuína Triumph importada (mais cara e com prazo mais longo), vale consultar lojas especializadas em peças KTM/Bajaj para pastilhas e itens de desgaste equivalentes.',
  },
  {
    severity: 'WARN',
    title: 'Pneus Metzeler Karoo Street (XC): ótimos off-road leve, mas desgastam mais rápido no asfalto',
    body: 'A Scrambler 400 XC vem com pneus Metzeler Karoo Street, com desenho misto (on/off-road). Em uso 100% asfalto urbano, o desgaste é mais acelerado que um pneu rodoviário puro — normal para esse tipo de desenho. Se seu uso é majoritariamente urbano/estrada, considerar um pneu mais rodoviário na segunda troca pode compensar em durabilidade, mas perde um pouco de capacidade em terra. Avalie o seu uso real antes de decidir.',
  },
  {
    severity: 'OK',
    title: 'Peso: X (179kg) e XC (~186kg) — moto de entrada leve para pilotos iniciantes',
    body: 'A Scrambler 400 X pesa 179kg em ordem de marcha, a XC cerca de 186kg (rodas raiadas + reforços off-road pesam um pouco mais). Comparado a modelos maiores da própria Triumph (que passam de 200kg), é uma moto significativamente mais leve e manejável — parte do motivo de ser a porta de entrada da marca para novos pilotos no Brasil, incluindo quem vem de 300cc ou está subindo de cilindrada pela primeira vez.',
  },
]

const SCRAMBLER400_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'ABS e controle de tração com falhas intermitentes — mesmo problema da Speed 400',
    body: 'Por compartilhar a central eletrônica com a Speed 400, a família Scrambler 400 X/XC também tem relatos de ABS e controle de tração falhando de forma intermitente. Se a luz do painel acender e não apagar, ou se notar ausência de atuação do ABS em frenagem de teste em piso molhado/escorregadio, não continue rodando — leve à concessionária em caráter de urgência, é sistema de segurança ativa.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo acima do esperado — mesmo padrão relatado na Speed 400',
    body: 'Assim como na Speed 400 (motor idêntico), há relatos de consumo de óleo acima do normal na família Scrambler 400, com luz de alerta acendendo antes do intervalo oficial de 16.000 km. Monitore o nível a cada 1.000 km nos primeiros meses de uso para conhecer o padrão da sua unidade específica. Consumo que ultrapasse ~150-200mL entre trocas sem vazamento visível deve ser documentado e reportado à garantia.',
  },
  {
    severity: 'WARN',
    title: 'Infiltração de água em banco, setas e painel — reforce a vedação antes da chuva',
    body: 'Mesmos relatos da Speed 400: água entrando pelo assento (costura direcionando água para dentro), acúmulo em lanternas de seta e embaçamento do painel digital. Antes da temporada de chuvas, verifique as vedações do banco e aplique graxa dielétrica nos conectores das setas. Painel embaçando por dentro é sinal de vedação da carcaça comprometida — não abra por conta própria, acione a garantia.',
  },
  {
    severity: 'WARN',
    title: 'Chocalho/vibração no protetor de escapamento em uso off-road',
    body: 'Alguns proprietários relatam ruído de chocalho vindo do protetor térmico do escapamento após uso mais intenso em trilha ou pavimento irregular — os parafusos de fixação do heat shield tendem a folgar com vibração constante. Verifique o aperto desses parafusos a cada saída off-road mais puxada; é ajuste simples que evita ruído incômodo e desgaste prematuro da braçadeira.',
  },
  {
    severity: 'WARN',
    title: 'Perda de pressão dos pneus em poucos dias — cheque a válvula antes de suspeitar de furo',
    body: 'Relatos de perda perceptível de pressão dos pneus (alguns PSI) em poucos dias de uso normal, sem furo visível. Antes de desconfiar de furo, teste a válvula do aro com água e sabão — é o ponto mais comum de perda lenta nesse tipo de roda (tanto fundida quanto raiada tubeless). Na versão XC (roda raiada tubeless), confirme também se o aro Excel está bem selado nos raios — vedação de roda raiada tubeless exige mais cuidado na instalação que roda fundida.',
  },
]

const SCRAMBLER400_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma oficial Scrambler 400 X/XC — idêntico à Speed 400 (mesmo motor)',
    body: '300–600 km — Primeira lubrificação da corrente 520 (106 elos). | 1.000 km — Revisão inicial: inspeção geral, torque de parafusos do motor e proteções off-road (barra, protetor de motor). | 16.000 km ou 12 meses — Troca de óleo (10W-40, 2,0L) + filtro, limpeza do coador de óleo, inspeção geral (freios, suspensão Showa BPF, elétrica, arrefecimento). | 32.000 km — Checagem/ajuste de folga de válvulas (trem finger-follower DLC). | A cada revisão — Lubrificação de corrente (300 km chuva/lama, 500-600 km seco), inspeção de pastilhas Brembo, calibragem de pneus (mesma pressão de referência da Speed 400: ~26 PSI F / 33 PSI R, ajustar para uso com bagagem/carona), inspeção da vedação do aro na versão XC tubeless. | 40.000 km — Fluido de arrefecimento.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'SPEED 400',
    yearFrom: 2024,
    yearTo: null,
    MACETES: SPEED400_MACETES,
    PROBLEMAS: SPEED400_PROBLEMAS,
    MANUTENCAO: SPEED400_MANUTENCAO,
  },
  {
    modelName: 'SCRAMBLER 400',
    yearFrom: 2024,
    yearTo: null,
    MACETES: SCRAMBLER400_MACETES,
    PROBLEMAS: SCRAMBLER400_PROBLEMAS,
    MANUTENCAO: SCRAMBLER400_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'SPEED 400',
    yearFrom: 2024, yearTo: null,
    tireSize: '110/70-17 (F) · 150/60-17 (R)',
    frontPsi: 26, rearPsi: 33,
    frontPsiLoad: 26, rearPsiLoad: 36,
    notes: 'Solo: F 26 / R 33 PSI. Com carona/bagagem: F 26 / R 36 PSI (referência prática — confirme no manual da unidade). Rodas fundidas de liga leve 17×3in (F) / 17×4in (R). Vários proprietários relatam perda de pressão em poucos dias — verifique a cada 15 dias.',
  },
  {
    modelName: 'SCRAMBLER 400',
    yearFrom: 2024, yearTo: null,
    tireSize: '100/90-19 (F) · 140/80-17 (R)',
    frontPsi: 26, rearPsi: 33,
    frontPsiLoad: 26, rearPsiLoad: 36,
    notes: 'Solo: F 26 / R 33 PSI (mesma referência da Speed 400 — ajuste conforme manual). Com carona/bagagem: F 26 / R 36 PSI. 400 X: roda fundida 19×2.5in (F)/17×3.5in (R). 400 XC: roda raiada tubeless aro Excel, mesmos tamanhos de pneu, pneus Metzeler Karoo Street. Reduza levemente a pressão para uso em terra/trilha e recalibre ao voltar ao asfalto.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // SPEED 400
  { modelName: 'SPEED 400', yearFrom: 2024, yearTo: null, component: 'Óleo 10W-40 API SN/JASO MA2 (2,0L) + filtro', intervalKm: 16000, intervalMonths: 12, notes: 'Motor monocilíndrico 398cc. Embreagem úmida — JASO MA2 obrigatório. Kit oficial Castrol Power1 10W-40.', priority: 'HIGH', order: 1 },
  { modelName: 'SPEED 400', yearFrom: 2024, yearTo: null, component: 'Lubrificação da corrente 520 X-ring', intervalKm: 500, intervalMonths: null, notes: '300 km em uso na chuva, 500-600 km em uso seco. Kit: pinhão 15T / coroa 43T / 103 elos.', priority: 'HIGH', order: 2 },
  { modelName: 'SPEED 400', yearFrom: 2024, yearTo: null, component: 'Vela NGK LKAR8AI-9 (iridium)', intervalKm: 20000, intervalMonths: null, notes: 'Pré-gapeada de fábrica, não precisa reajustar. Torque de instalação: 12 Nm.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SPEED 400', yearFrom: 2024, yearTo: null, component: 'Folga de válvulas (trem finger-follower DLC)', intervalKm: 32000, intervalMonths: null, notes: 'Intervalo oficial Triumph — bem mais longo que a maioria das 300-400cc concorrentes.', priority: 'MEDIUM', order: 4 },
  { modelName: 'SPEED 400', yearFrom: 2024, yearTo: null, component: 'Filtro de ar — inspeção/troca', intervalKm: 16000, intervalMonths: 12, notes: 'Verificar junto com a troca de óleo. Trocar se sujo ou danificado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SPEED 400', yearFrom: 2024, yearTo: null, component: 'Pastilhas de freio (dianteira 300mm 4 pistões / traseira 230mm)', intervalKm: 12000, intervalMonths: null, notes: 'Brembo sinterizada — compatibilidade com peças KTM/Bajaj do mesmo grupo Bajaj.', priority: 'HIGH', order: 6 },
  { modelName: 'SPEED 400', yearFrom: 2024, yearTo: null, component: 'Kit relação 520 (pinhão 15T + coroa 43T + corrente 103 elos)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar kit completo quando desgastado, não só a corrente.', priority: 'HIGH', order: 7 },
  { modelName: 'SPEED 400', yearFrom: 2024, yearTo: null, component: 'Calibragem de pneus (26 PSI F / 33 PSI R)', intervalKm: null, intervalMonths: 1, notes: 'Verificar a cada 15 dias — relatos de perda de pressão mais rápida que o normal.', priority: 'MEDIUM', order: 8 },
  { modelName: 'SPEED 400', yearFrom: 2024, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 40000, intervalMonths: 36, notes: 'Verificar nível a cada revisão; troca conforme especificação do fabricante do líquido.', priority: 'MEDIUM', order: 9 },
  { modelName: 'SPEED 400', yearFrom: 2024, yearTo: null, component: 'Inspeção de ABS/controle de tração e torque do parafuso do disco de freio', intervalKm: null, intervalMonths: 6, notes: 'Falhas intermitentes documentadas. Verificar acionamento em teste e torque dos parafusos do disco.', priority: 'CRITICAL', order: 10 },

  // SCRAMBLER 400 (X e XC)
  { modelName: 'SCRAMBLER 400', yearFrom: 2024, yearTo: null, component: 'Óleo 10W-40 API SN/JASO MA2 (2,0L) + filtro', intervalKm: 16000, intervalMonths: 12, notes: 'Mesmo motor 398cc da Speed 400. Embreagem úmida — JASO MA2 obrigatório.', priority: 'HIGH', order: 1 },
  { modelName: 'SCRAMBLER 400', yearFrom: 2024, yearTo: null, component: 'Lubrificação da corrente 520 X-ring (106 elos)', intervalKm: 500, intervalMonths: null, notes: '300 km em uso na chuva/lama, 500-600 km em uso seco. Corrente mais longa que a Speed 400.', priority: 'HIGH', order: 2 },
  { modelName: 'SCRAMBLER 400', yearFrom: 2024, yearTo: null, component: 'Vela NGK LKAR8AI-9 (iridium)', intervalKm: 20000, intervalMonths: null, notes: 'Mesma vela da Speed 400 — peça compartilhada, fácil de encontrar.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SCRAMBLER 400', yearFrom: 2024, yearTo: null, component: 'Folga de válvulas (trem finger-follower DLC)', intervalKm: 32000, intervalMonths: null, notes: 'Intervalo oficial Triumph, idêntico à Speed 400.', priority: 'MEDIUM', order: 4 },
  { modelName: 'SCRAMBLER 400', yearFrom: 2024, yearTo: null, component: 'Filtro de ar — inspeção/troca', intervalKm: 16000, intervalMonths: 12, notes: 'Uso off-road/poeira pode exigir inspeção mais frequente.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SCRAMBLER 400', yearFrom: 2024, yearTo: null, component: 'Pastilhas de freio (dianteira 320mm 4 pistões / traseira 230mm)', intervalKm: 12000, intervalMonths: null, notes: 'Brembo sinterizada — compatibilidade com KTM Duke 390/Bajaj Dominar 400.', priority: 'HIGH', order: 6 },
  { modelName: 'SCRAMBLER 400', yearFrom: 2024, yearTo: null, component: 'Kit relação 520 (106 elos)', intervalKm: 20000, intervalMonths: null, notes: 'Verificar compatibilidade com pinhão/coroa Bajaj/KTM antes de comprar peça genuína importada.', priority: 'HIGH', order: 7 },
  { modelName: 'SCRAMBLER 400', yearFrom: 2024, yearTo: null, component: 'Vedação do aro tubeless (somente versão XC)', intervalKm: 12000, intervalMonths: 6, notes: 'Roda raiada Excel tubeless exige mais atenção à vedação nos raios do que roda fundida.', priority: 'MEDIUM', order: 8 },
  { modelName: 'SCRAMBLER 400', yearFrom: 2024, yearTo: null, component: 'Torque dos parafusos do protetor de escapamento (heat shield)', intervalKm: null, intervalMonths: 6, notes: 'Uso off-road solta o protetor com vibração — causa chocalho característico.', priority: 'LOW', order: 9 },
  { modelName: 'SCRAMBLER 400', yearFrom: 2024, yearTo: null, component: 'Inspeção de ABS/controle de tração', intervalKm: null, intervalMonths: 6, notes: 'Mesmas falhas intermitentes documentadas na Speed 400 (central eletrônica compartilhada).', priority: 'CRITICAL', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Triumph Speed 400 / Scrambler 400 X/XC...')

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

  console.log('✅ Triumph Speed 400 / Scrambler 400 X/XC concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
