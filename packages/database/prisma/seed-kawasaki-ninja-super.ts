// seed-kawasaki-ninja-super.ts — Kawasaki Ninja ZX-4R/RR, ZX-6R (636), ZX-10R, Ninja H2/H2 SX
// Linha esportiva de alta cilindrada da Kawasaki (supersport / hypersport / superbike).
// ZX-4R/RR: 2023–presente, importação limitada, agora com venda oficial Kawasaki Brasil.
// ZX-6R: geração 636cc atual (2019–presente); geração anterior 600cc rodou 2003–2018.
// ZX-10R: superbike 998cc com eletrônica completa (quickshifter, TC, modos de pilotagem).
// Ninja H2: 998cc supercharged, altíssimo custo, poucas unidades no Brasil (venda sob encomenda).
// Execute: pnpm --filter @motormacete/database db:seed:kawasaki-ninja-super
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

// ─── NINJA ZX-4R / ZX-4RR ──────────────────────────────────────────────────────
// Motor: 399cc 4 cilindros em linha DOHC 16V | 57,0 × 39,1mm | compressão 12,3:1
// Potência: 77 cv @ 14.500 rpm (80 cv com Ram Air) | Torque: 39 Nm @ 13.000 rpm | gira acima de 15.000 rpm
// Óleo: 10W-30 API SJ ou superior, ~3,0L | Vela: NGK LMAR9G (×4) | Refrigeração líquida
// Pneu: 120/70ZR17 (F) / 160/60ZR17 (R) | Corrente: 520 | Tanque: ~15L
// ZX-4RR: embreagem assistida/deslizante + quickshifter bidirecional (KQS) de série, tabela mais esportiva

const ZX4R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 API SJ+ — capacidade ~3,0L; motor pequeno de altíssima rotação exige troca em dia',
    body: 'O motor 399cc 4 cilindros da ZX-4R/RR gira acima de 15.000 rpm — isso degrada o óleo muito mais rápido que motores de baixa rotação. Capacidade aproximada: 3,0L (confirme no manual da sua unidade/ano, pois pode variar entre mercados). Use 10W-30 semissintético ou sintético API SJ ou superior, JASO MA (embreagem úmida): Motul 300V 10W-30, Motul 7100 10W-40 (alternativa aceitável se 10W-30 não for encontrado), ou Elf HTX 10W-40. Intervalo: 6.000 km ou 6 meses — reduza para 4.000 km se rodar frequentemente acima de 12.000 rpm ou em pista.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR9G — moto com 4 velas; verifique o gap na revisão',
    body: 'A ZX-4R/RR usa 4 velas de ignição (uma por cilindro), modelo NGK LMAR9G — vela de tecnologia laser-platina projetada para motores de altíssima rotação. Diferente de motos mais simples, o gap já vem calibrado de fábrica e normalmente não precisa de ajuste manual; apenas verifique o estado do eletrodo. Substitua o conjunto de 4 sempre junto, nunca uma isolada — desgaste desigual causa falha de combustão em um cilindro específico. Custo aproximado: R$ 200–350 pelo conjunto de 4 (importadas, poucas lojas no Brasil têm em estoque — compre com antecedência).',
  },
  {
    severity: 'WARN',
    title: 'Moto de nicho no Brasil: peças e acessórios ainda são escassos fora da concessionária',
    body: 'A ZX-4R/RR chegou à venda oficial na Kawasaki Brasil recentemente (linha 2025/2026), mas o volume de vendas é baixo comparado a motos populares — é um nicho de entusiastas de moto esportiva pequena cilindrada de alta rotação. Peças de desgaste comuns (óleo, filtro, corrente, pastilha) geralmente precisam ser encomendadas com antecedência na concessionária Kawasaki, pois lojas de peças avulsas raramente têm estoque de itens específicos dessa moto. Planeje revisões com folga de 1–2 semanas para chegada de peças, especialmente fora das capitais.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — lubrifique a cada 500-600 km; kit relação de qualidade compensa o investimento',
    body: 'A ZX-4R/RR usa corrente 520 — mais estreita que a 525/530 de motos maiores, mas ainda assim precisa de manutenção rigorosa dado o giro alto do motor. Lubrifique a cada 500–600 km com spray de corrente O-ring compatível (Motul C3 Chain Lube, DID Chain Lube). Kits de reposição DID 520VX3 ou RK 520MXZ com O-ring são as opções mais robustas — evite corrente sem O-ring nesta moto pelo regime de giro elevado. Folga correta: consulte o manual (tipicamente 25–35mm no centro do trecho inferior).',
  },
  {
    severity: 'OK',
    title: 'Pneus radiais obrigatórios — Dunlop GPR300 de fábrica; substitutos Pirelli e Michelin disponíveis no Brasil',
    body: 'A ZX-4R/RR sai de fábrica com pneus Dunlop Sportmax GPR300 nas medidas 120/70ZR17 (dianteiro) e 160/60ZR17 (traseiro). No Brasil, boas alternativas de reposição incluem Pirelli Diablo Rosso IV, Michelin Power 6 e Metzeler Sportec M9 RR — todas disponíveis em lojas especializadas de pneus esportivos. Evite pneus de linha popular (bias/diagonal) — a moto foi projetada para desempenho radial e a diferença de aderência em curva é grande.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem assistida/deslizante (RR) — não é adaptável para embreagem convencional sem kit completo',
    body: 'A ZX-4RR vem com embreagem do tipo assistida e deslizante (assist & slipper clutch) de fábrica, que reduz o esforço na alavanca e evita travamento da roda traseira em downshifts agressivos. Se notar folga excessiva na alavanca ou patinação sob aceleração forte, o ajuste é mais delicado que embreagens convencionais — procure a concessionária Kawasaki ou oficina especializada em motos esportivas de alta cilindrada para não danificar o mecanismo de rampas (cames) do cesto.',
  },
  {
    severity: 'OK',
    title: 'Rodagem: respeite o limite de giro nos primeiros 1.000 km apesar da tentação de explorar os 15.000 rpm',
    body: 'O motor de 4 cilindros de altíssima rotação da ZX-4R/RR é uma peça de engenharia fina — a rodagem correta preserva anéis de pistão e mancais. Kawasaki recomenda variar a rotação sem prender o acelerador fixo, evitando ultrapassar aproximadamente 4/5 da faixa de giro (varie entre 3.000–10.000 rpm) nos primeiros 800–1.000 km. Troque o óleo ao final da rodagem mesmo que o intervalo oficial ainda não tenha vencido — resíduos metálicos finos do amaciamento contaminam o óleo original.',
  },
]

const ZX4R_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste acelerado de corrente/relação pelo regime de giro elevado',
    body: 'Como o motor da ZX-4R/RR opera rotineiramente em rotações muito mais altas que motos de cilindrada similar (picos de torque próximos a 13.000 rpm), a corrente de transmissão sofre mais estresse térmico e de tração por km rodado. Proprietários relatam necessidade de troca do kit relação mais cedo que o esperado (entre 15.000–20.000 km) quando a lubrificação não é feita rigorosamente a cada 500 km. Mantenha a lubrificação em dia — é o fator que mais influencia a vida útil da corrente nesta moto.',
  },
  {
    severity: 'WARN',
    title: 'Sensibilidade do quickshifter (KQS) em baixa rotação — ajuste requer atenção',
    body: 'Assim como em outros modelos Kawasaki com Kawasaki Quick Shifter (KQS), alguns usuários relatam trocas de marcha "grudadas" ou hesitantes ao usar o quickshifter em rotações muito baixas ou com o acelerador fechado. Isso não é defeito — o sistema é otimizado para trocas com o acelerador levemente aberto e rotação de médio a alto giro (esportivo). Em trânsito urbano de baixa rotação, prefira usar a embreagem manualmente.',
  },
  {
    severity: 'WARN',
    title: 'Custo de reposição de velas e peças elétricas específicas — sempre 4 unidades',
    body: 'Por ter 4 cilindros pequenos, qualquer peça relacionada à ignição (velas, bobinas) é multiplicada por 4 no orçamento — diferente de motos monocilíndricas ou bicilíndricas da mesma faixa de cilindrada. Planeje o orçamento de manutenção considerando esse fator: uma troca de velas custa proporcionalmente mais que em uma moto de 2 cilindros de cilindrada similar.',
  },
  {
    severity: 'OK',
    title: 'Vibração e sensação "zangão" em baixa rotação é característica do motor, não defeito',
    body: 'O motor de 4 cilindros em linha de pequena cilindrada e altíssima rotação da ZX-4R/RR tem sonoridade e comportamento de giro muito diferentes de motos bicilíndricas — em baixa rotação (abaixo de 4.000 rpm) pode parecer "sem força" e vibrar de forma diferente do que se espera. Isso é a assinatura do motor (elogiada pelos entusiastas pelo som em alta rotação) e não indica problema mecânico. A moto entrega a maior parte da potência acima de 10.000 rpm.',
  },
  {
    severity: 'DANGER',
    title: 'Superaquecimento em trânsito parado — como em toda esportiva de alta performance, evite parado com motor ligado por muito tempo',
    body: 'Motos esportivas de carenagem completa como a ZX-4R/RR têm fluxo de ar reduzido para o radiador quando paradas no trânsito. Em congestionamentos longos e dias quentes, observe o ponteiro/indicador de temperatura — se subir muito acima do normal, desligue o motor em vez de aguardar parado. Isso preserva o radiador, mangueiras e junta do cabeçote, evitando o estresse térmico repetitivo típico de uso urbano em moto não projetada para isso.',
  },
]

const ZX4R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma ZX-4R/ZX-4RR: motor de altíssima rotação exige revisões mais frequentes que motos convencionais',
    body: '1.000 km — Revisão de amaciamento: troca de óleo (10W-30, ~3,0L) + inspeção geral + torque de parafusos do motor. | 6.000 km — Troca de óleo e filtro. Lubrificar corrente. Inspecionar pastilhas de freio. | 12.000 km — Troca de óleo. Verificar folga de válvulas (item crítico em motor de alta rotação — siga tabela específica do manual). Trocar velas NGK LMAR9G (as 4). | 18.000 km — Troca de óleo. Filtro de ar. Fluido de freio DOT 4. | 20.000–24.000 km — Kit relação 520 completo. | 24.000 km — Segunda verificação de folga de válvulas. Revisão geral de sistema elétrico e conectores.',
  },
]

// ─── NINJA ZX-6R (636) ──────────────────────────────────────────────────────────
// Motor: 636cc 4 cilindros em linha DOHC 16V, refrigeração líquida | injeção eletrônica
// Potência: ~127 cv @ 13.000 rpm (2019-2023) / ~122 cv (2024, ajuste de emissões) | Torque: ~69 Nm @ 11.000 rpm
// Óleo: 10W-40 (JASO MA), 2,8L sem filtro / 3,1L com filtro | Vela: NGK CR9E / CR9EIX gap 0,8-0,9mm
// Pneu: 120/70-17 (F) / 180/55-17 (R) | Tanque: 17L | Peso: ~198kg
// Nota histórica: existiu geração anterior 600cc (2003-2018), motor menor, sem o "636" no nome em todos os anos

const ZX6R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — 2,8L sem filtro / 3,1L com troca de filtro; troque a cada 6.000 km',
    body: 'O motor 636cc DOHC 4 cilindros da ZX-6R (geração atual, 2019+) usa óleo 10W-40 com certificação JASO MA (obrigatória — embreagem em banho de óleo). Capacidade: 2,8L em troca simples, 3,1L quando o filtro também é trocado. Marcas recomendadas: Motul 7100 10W-40, Motul 300V se for usar em pista, ou Lubrax Moto Racing 10W-40 como opção nacional mais em conta. Intervalo: 6.000 km ou 6 meses em uso de rua; reduza para 3.000–4.000 km se rodar em pista com frequência (o óleo degrada mais rápido em altas temperaturas sustentadas).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9E (convencional) ou CR9EIX (iridium) — gap 0,8-0,9mm',
    body: 'A ZX-6R 636 usa vela NGK CR9E de fábrica, gap 0,8–0,9mm. Para maior durabilidade e melhor resposta em alta rotação, a versão iridium NGK CR9EIX é um upgrade popular entre proprietários (dura cerca do dobro da convencional). Como o motor tem 4 cilindros, troque sempre o conjunto completo. Custo aproximado: R$ 40–70 por vela convencional, R$ 90–140 por vela iridium — planeje R$ 350-560 pelo conjunto de 4 se optar pela iridium.',
  },
  {
    severity: 'OK',
    title: 'Duas gerações distintas — não confunda peças da 600cc (2003-2018) com a atual 636cc',
    body: 'A ZX-6R teve uma geração anterior de 600cc (aproximadamente 2003–2018, com variações de potência e nome "636" usado em alguns anos específicos daquele período) e a geração atual, relançada com motor 636cc definitivo a partir de 2019. As peças de motor (pistão, biela, cabeçote) NÃO são intercambiáveis entre as duas gerações — sempre confirme o ano e código do motor (estampado no bloco) antes de comprar peças, principalmente em compras de peças usadas ou de desmonte.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 — kit relação de qualidade compensa pela potência de ~127cv',
    body: 'A ZX-6R 636 usa corrente 525 (mais robusta que a 520 de motos de cilindrada menor), necessária pela potência entregue. Lubrifique a cada 500-600 km. Kits recomendados: DID 525VX3 ou RK 525XSO, ambos com O-ring de alta resistência. Kit completo (corrente + pinhão + coroa): R$ 450–750 dependendo da marca. Ajuste a folga sempre com a moto no cavalete central ou descarregada, seguindo a especificação do manual (a marca de referência está na escala do braço oscilante).',
  },
  {
    severity: 'OK',
    title: 'Pneus: pressão mais alta que motos de rua comuns — calibre a frio antes de cada saída',
    body: 'Sendo uma moto esportiva pura, a ZX-6R exige calibragem mais frequente e precisa que motos de uso misto. Pressões de fábrica ficam na faixa de 36 PSI dianteiro / 42 PSI traseiro em uso normal de rua — sempre calibre com pneu frio, nunca após rodar. Marcas de pneu recomendadas para reposição no Brasil: Pirelli Diablo Rosso IV, Michelin Power GP2, Bridgestone Battlax S23 — todas disponíveis em lojas especializadas.',
  },
  {
    severity: 'WARN',
    title: 'Uso em pista: reduza a pressão traseira e monitore a temperatura do óleo',
    body: 'Para dias de pista (track day), reduza a pressão traseira para cerca de 32 PSI a frio (a pressão sobe naturalmente com o aquecimento do pneu em uso intenso) — consulte sempre a orientação do instrutor/organização do evento, pois a pressão ideal varia com o pneu usado (slick vs rodado). Após uso intensivo em pista, verifique o nível de óleo com mais frequência, pois a demanda térmica é muito maior que em uso de rua.',
  },
]

const ZX6R_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador: histórico de falhas documentado, especialmente em gerações mais antigas',
    body: 'A ZX-6R tem histórico conhecido em fóruns internacionais (zx6r.com) de queima de estator e falha do regulador/retificador — inclusive relatos de recall de fábrica em anos específicos (início dos anos 2010) que nem sempre resolveu definitivamente o problema. Sintomas: bateria não carrega (abaixo de 13V com moto em marcha a 4.000 rpm), retificador aquecendo excessivamente ao toque, cheiro de queimado. Verifique a tensão de carga periodicamente com multímetro. Se o retificador falhar, ele pode drenar corrente excessiva do estator e danificá-lo também — não adie a troca ao primeiro sinal.',
  },
  {
    severity: 'WARN',
    title: 'Conectores próximos ao retificador: oxidação e folga aceleram a falha do sistema de carga',
    body: 'Proprietários recomendam inspecionar e trocar preventivamente o conector elétrico localizado ao lado do regulador/retificador — conectores com folga ou sinais de oxidação nesse ponto específico podem causar aquecimento excessivo e até derretimento do plugue, agravando a falha do sistema de carga. Aplique graxa dielétrica nos contatos durante revisões preventivas, especialmente em motos usadas em regiões litorâneas ou úmidas.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio: gerações antigas (2003-2006) tinham relatos de "pular" a 2ª/3ª marcha',
    body: 'Um problema documentado nas gerações mais antigas (aproximadamente 2003–2006) da ZX-6R 636 é a tendência de pular ou falhar a troca entre 2ª e 3ª marcha, geralmente ligado a desgaste dos garfos de câmbio (shift forks) ou uso agressivo prolongado sem manutenção adequada do óleo. Nas gerações atuais (2019+) esse problema específico é raro, mas trocas de marcha "falsas" (neutro falso) em uso muito agressivo com o quickshifter ainda podem ocorrer — evite trocar em plena aceleração com o acelerador todo aberto.',
  },
  {
    severity: 'WARN',
    title: 'Consumo elevado de pastilhas e disco em uso misto rua/pista',
    body: 'Pela potência entregue (~127cv) e o peso relativamente baixo, o sistema de freios da ZX-6R é solicitado com intensidade se usado com frequência em pista ou pilotagem esportiva. Pastilhas de composto orgânico duram significativamente menos nesse uso — considere pastilhas semi-metálicas ou sintéticas (EBC HH, Brembo Z04) se fizer track days regularmente, e monitore a espessura do disco (limite mínimo geralmente marcado no próprio disco).',
  },
  {
    severity: 'WARN',
    title: 'Calor irradiado no trânsito parado é intenso — proteja as pernas em dias quentes',
    body: 'Como toda esportiva pura de carenagem fechada e motor de alta performance, a ZX-6R irradia bastante calor do radiador e do escapamento em trânsito parado, mais perceptível que em motos naked ou de uso misto. Isso não é defeito — é característica do design voltado para aerodinâmica e desempenho em pista. Evite ficar parado por longos períodos com o motor ligado; se possível, desligue em engarrafamentos prolongados.',
  },
]

const ZX6R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma ZX-6R 636: revisão a cada 6.000 km é a base, com itens críticos em intervalos maiores',
    body: '1.000 km — Revisão de amaciamento: troca de óleo + inspeção geral. | 6.000 km — Troca de óleo (10W-40, 2,8-3,1L) + filtro. Lubrificar corrente 525. Verificar tensão do sistema de carga (retificador). | 12.000 km — Troca de óleo/filtro. Velas NGK CR9E (conjunto de 4). Filtro de ar. Fluido de freio DOT 4. | 18.000 km — Troca de óleo/filtro. Folga de válvulas (item DOHC 16V — siga tabela do manual, tipicamente verificado a cada 24.000 km). | 20.000-24.000 km — Kit relação 525 completo. Pastilhas de freio (conforme desgaste). | 24.000 km — Folga de válvulas (verificação obrigatória). Inspeção completa do sistema elétrico e conectores do retificador.',
  },
]

// ─── NINJA ZX-10R ────────────────────────────────────────────────────────────────
// Motor: 998cc 4 cilindros em linha DOHC 16V, refrigeração líquida | compressão 13,0:1
// Potência: ~203 cv @ 13.200 rpm (213 cv com Ram Air) | Torque: ~11,7 kgf.m (~114,9 Nm)
// Óleo: 10W-40 JASO MA, ~3,0-4,0L com filtro (confirme no manual do ano específico)
// Vela: NGK iridium (CR9EIA-9 em gerações anteriores) gap 0,8-0,9mm | Corrente: 525
// Pneu: 120/70ZR17 (F) / 190/55ZR17 (R) | Tanque: 17L
// Eletrônica: quickshifter bidirecional, controle de tração multi-nível, modos de pilotagem, IMU (6 eixos)

const ZX10R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — troque a cada 6.000 km; reduza pela metade em uso de pista frequente',
    body: 'O motor 998cc da ZX-10R (superbike homologada para pista) usa óleo 10W-40 JASO MA. A capacidade varia por ano/versão (consulte o manual do proprietário da sua unidade específica — modelos com sistema de lubrificação a cárter seco/semi-seco de versões de competição podem diferir). Marcas recomendadas para uso intenso: Motul 300V 10W-40 (100% sintético éster, referência para motor de superbike), ou Motul 7100 10W-40 para uso misto rua/ocasional pista. Se rodar em pista regularmente, reduza o intervalo para 3.000 km — o óleo sofre degradação térmica muito mais rápida em regime de altíssima rotação sustentada.',
  },
  {
    severity: 'OK',
    title: 'Eletrônica de superbike: use os modos de pilotagem e controle de tração a seu favor',
    body: 'A ZX-10R vem com IMU de 6 eixos, controle de tração multi-nível (KTRC), controle de wheelie, modos de pilotagem pré-configurados e quickshifter bidirecional (KQS) de série. Para uso diário/rua, prefira o modo "Rain" ou "Road" com controle de tração em nível alto — isso não "atrapalha" a moto, protege contra perda de aderência em piso irregular ou molhado. Reserve modos mais agressivos e menor intervenção eletrônica para pista fechada, onde o risco é administrado.',
  },
  {
    severity: 'OK',
    title: 'Vela iridium NGK — gap 0,8-0,9mm; conjunto de 4, sempre trocado junto',
    body: 'A ZX-10R usa velas iridium de fábrica (referências variam por geração — confirme o código exato para o ano/versão da sua moto, geralmente na família CR9EIA ou equivalente atual). Gap de fábrica: 0,8–0,9mm. Por ser moto de altíssima performance, não compense com vela de menor qualidade — o conjunto de 4 velas iridium originais custa na faixa de R$ 400-700, mas garante ignição consistente em alta rotação, essencial para não perder potência ou danificar o catalisador por combustão incompleta.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 de alta resistência — a potência de +200cv exige kit de qualidade',
    body: 'Com mais de 200cv na roda traseira, a ZX-10R demanda um kit de relação robusto: corrente 525 com O-ring ou X-ring de alta resistência (DID 525ZVMX ou RK 525GXW são referências para superbikes). Lubrifique a cada 500 km — em uso de pista, lubrifique antes e depois de cada sessão. Kit completo: R$ 700–1.200 dependendo da marca. Nunca economize nesse item — uma corrente inadequada para a potência entregue pode arrebentar em plena aceleração, risco real de acidente grave.',
  },
  {
    severity: 'WARN',
    title: 'Pneus: pressão alta e pneu de composto esportivo são obrigatórios pela potência da moto',
    body: 'A ZX-10R exige pneus radiais de alta performance — nunca ande com pneus gastos ou de composto inadequado dada a potência entregue. Pressão de fábrica gira em torno de 36 PSI dianteiro / 42 PSI traseiro para uso de rua a frio. Marcas recomendadas: Pirelli Diablo Supercorsa (uso misto/pista), Bridgestone Battlax RS11, Michelin Power GP2. Para pista, consulte a tabela específica do fabricante do pneu — a pressão ideal varia com o composto e a temperatura do dia.',
  },
  {
    severity: 'WARN',
    title: 'Aquecimento de pneus antes de exigir a moto — essencial em moto desse nível de performance',
    body: 'Diferente de motos de uso urbano, a ZX-10R entrega torque e potência que exigem pneus com temperatura de trabalho adequada antes de qualquer manobra brusca (curvas fechadas, acelerações fortes). Nos primeiros quilômetros de qualquer saída — especialmente com moto fria ou dia frio — pilote de forma progressiva, evitando ângulos de inclinação extremos ou acelerações plenas até sentir o pneu "vivo" (aderência normal). Isso vale tanto para rua quanto para as primeiras voltas em pista.',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio e pastilhas de alta performance — freios de disco duplo com pinças radiais',
    body: 'A ZX-10R usa pinças de freio radiais (Brembo em versões SE/superiores) com discos duplos dianteiros — sistema de frenagem de referência para pista. Use fluido DOT 4 de boa qualidade (Motul RBF600 para uso intenso em pista, que tem ponto de ebulição mais alto e resiste melhor ao fading). Pastilhas: considere compostos semi-metálicos ou sintéticos de alta performance (EBC HH, Brembo Z04) se pilotar agressivamente com frequência.',
  },
]

const ZX10R_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Quickshifter (KQS): trocas falhas em uso muito agressivo podem danificar caixa de câmbio',
    body: 'Relatos de proprietários e mecânicos especializados apontam que trocas de marcha muito agressivas com o quickshifter em alta rotação e aceleração plena — especialmente gerando "neutro falso" — podem causar dano ao eixo de entrada da transmissão e quebra de dentes de engrenagem em casos extremos. Use o quickshifter com o acelerador levemente aberto e de forma consistente (nem excessivamente lento nem "socado"); evite trocar em pleno wheelie ou tração no limite.',
  },
  {
    severity: 'WARN',
    title: 'Haste de câmbio (shift rod): item de desgaste conhecido em uso intenso',
    body: 'A haste que conecta o pedal de câmbio ao mecanismo interno é um ponto de desgaste documentado em uso muito intenso (pista, uso agressivo). Inspecione periodicamente por folga excessiva no pedal de câmbio ou dificuldade progressiva para engatar marchas — a peça de reposição é relativamente barata, mas a falha em movimento pode deixar a moto sem condições de trocar de marcha.',
  },
  {
    severity: 'DANGER',
    title: 'Corrente/relação subdimensionada é risco real — nunca use kit genérico sem especificação para +200cv',
    body: 'Dada a potência elevadíssima da ZX-10R, usar um kit de relação de qualidade inferior ou sem classificação adequada de carga é um risco de segurança real — ruptura de corrente em plena aceleração pode travar a roda traseira ou causar queda grave. Sempre use corrente com classificação de carga compatível com superbikes (525 com O-ring/X-ring de marca reconhecida) e substitua o kit completo (corrente + pinhão + coroa) ao primeiro sinal de desgaste desigual.',
  },
  {
    severity: 'WARN',
    title: 'Sensibilidade eletrônica: sensores de inclinação e velocidade exigem calibração correta após queda ou troca de peça',
    body: 'O sistema de IMU de 6 eixos e os sensores de velocidade/inclinação da ZX-10R são sensíveis a desalinhamento após queda, troca de roda ou serviço na suspensão. Sintomas de descalibração: controle de tração intervindo de forma incoerente, indicador de ângulo de inclinação errático no painel. Após qualquer serviço estrutural (suspensão, roda, chassi) ou incidente, uma verificação/calibração em concessionária Kawasaki é recomendada antes de uso esportivo intenso.',
  },
  {
    severity: 'WARN',
    title: 'Consumo elevado de combustível em uso esportivo — Ram Air demanda gasolina de qualidade',
    body: 'Em pilotagem esportiva com uso frequente de altas rotações, o consumo da ZX-10R pode cair significativamente comparado ao ciclo urbano tranquilo. Use sempre gasolina premium (octanagem mais alta) — a alta taxa de compressão (13,0:1) e o sistema Ram Air (que aumenta a pressão de admissão em alta velocidade) tornam a moto mais sensível à qualidade do combustível que motos de menor performance; combustível de baixa qualidade pode causar detonação/pré-ignição.',
  },
]

const ZX10R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma ZX-10R: superbike de +200cv exige rigor — revisões mais frequentes que motos de rua comuns',
    body: '1.000 km — Revisão de amaciamento: troca de óleo + inspeção geral + torque de componentes críticos. | 6.000 km — Troca de óleo (10W-40 JASO MA) + filtro. Lubrificar corrente 525 (a cada 500 km entre revisões). Verificar pastilhas de freio. | 12.000 km — Troca de óleo/filtro. Velas iridium (conjunto de 4). Filtro de ar. Fluido de freio DOT 4 (anual recomendado dado o uso esportivo). | 18.000 km — Troca de óleo/filtro. Verificar folga de válvulas (DOHC 16V — item crítico, siga tabela oficial do ano/versão). | 20.000-24.000 km — Kit relação 525 completo de alta resistência. | 24.000 km — Folga de válvulas (revisão obrigatória). Calibração/verificação de sensores eletrônicos (IMU, TC) em concessionária.',
  },
]

// ─── NINJA H2 / NINJA H2 SX SE ─────────────────────────────────────────────────
// Motor: 998cc 4 cilindros em linha DOHC 16V com SUPERCHARGER (compressor mecânico) próprio, refrigeração líquida
// Potência: H2 ~197-200cv | H2 SX SE (touring) ~197cv @ 11.000 rpm, ~137Nm | Versões R/RR de pista: 310+cv (uso exclusivo em pista, sem emplacamento)
// Óleo: 10W-40 JASO MA, ~4,4L (H2/H2 SX, confirme capacidade exata no manual do ano) | Gap de vela: 0,028-0,031in (~0,7-0,8mm)
// Pneu: 120/70ZR17 (F) / 190/55ZR17 (R) | Tanque: H2 17L / H2 SX SE 19L (touring)
// H2 SX SE: versão sport-touring com bolsas, suspensão eletrônica e maior autonomia — NÃO confundir com a H2 "pura" superbike de rua

const H2_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor supercharged: óleo 10W-40 JASO MA de alta qualidade não é opcional, é obrigatório',
    body: 'O motor 998cc da Ninja H2 tem compressor mecânico (supercharger) desenvolvido pela própria Kawasaki (tecnologia derivada da divisão aeroespacial/turbinas a gás do grupo). Isso eleva MUITO a temperatura e pressão internas comparado a um motor aspirado equivalente. Use exclusivamente óleo sintético de alta qualidade 10W-40 JASO MA — Motul 300V é a referência técnica mais indicada para esse motor. Capacidade aproximada: 4,4L (confirme no manual específico do seu ano/versão — H2 base e H2 SX SE podem ter pequenas variações). Nunca prorrogue a troca de óleo além do intervalo recomendado; a lubrificação inadequada em motor sobrealimentado tem consequências muito mais caras que em motor aspirado.',
  },
  {
    severity: 'OK',
    title: 'H2 SX SE é a versão sport-touring — não confunda com a H2 "pura"',
    body: 'A Ninja H2 "pura" é uma superbike de rua com foco esportivo direto (carenagem agressiva, posição de pilotagem radical). Já a H2 SX SE é uma versão sport-touring: tanque maior (~19L vs 17L), suspensão semi-ativa eletrônica, bolsas laterais integradas, posição de pilotagem mais ereta e conforto para viagens longas — mesma base de motor supercharged, mas calibração de potência e propósito diferentes (a SX prioriza entrega de torque em rotações mais baixas para uso em estrada). Ao pesquisar peças ou specs, sempre confirme qual das duas versões você tem, pois filtros, escape e alguns componentes de suspensão diferem.',
  },
  {
    severity: 'DANGER',
    title: 'Manutenção exclusiva em concessionária oficial — não há mercado paralelo de peças no Brasil',
    body: 'Diferente de praticamente qualquer outra moto deste catálogo, a Ninja H2/H2 SX SE tem volume de vendas extremamente baixo no Brasil (moto de R$ 130.000 a R$ 180.000+, vendida sob encomenda). NÃO existe mercado de peças alternativas, desmontes ou oficinas de bairro com experiência nesse motor sobrealimentado. Toda manutenção — principalmente qualquer serviço relacionado ao supercharger, sistema de injeção e eletrônica — deve ser feita em concessionária Kawasaki autorizada, com técnico treinado especificamente para essa linha. Isso deve ser considerado no custo total de propriedade antes da compra.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar do supercharger: item crítico para a vida útil do compressor',
    body: 'O supercharger da H2 é sensível a partículas de sujeira no ar admitido — diferente de um motor aspirado comum, contaminação no filtro de ar pode acelerar o desgaste interno do compressor mecânico, uma peça de reposição extremamente cara. Nunca rode com o filtro de ar sujo ou danificado, e siga rigorosamente o intervalo de troca do manual. Evite uso da moto em ambientes com muita poeira (estradas de terra) — a H2 não foi projetada para isso e o risco ao supercharger não compensa.',
  },
  {
    severity: 'OK',
    title: 'Corrente de alta resistência: a potência entregue exige o melhor kit disponível',
    body: 'Com quase 200cv (ou mais de 300cv nas variações R/RR de pista), a Ninja H2 exige corrente e kit de relação de altíssima resistência — normalmente 530 nas versões de maior torque. Use exclusivamente kits originais Kawasaki ou equivalentes de altíssima performance (DID ZVMX, RK GXW) recomendados especificamente para essa potência. Lubrifique a cada 500 km sem exceção. Como toda peça desta moto, o custo de reposição do kit de relação é significativamente mais alto que em motos convencionais.',
  },
  {
    severity: 'WARN',
    title: 'Pneus: pressão calibrada e composto de alta performance, atenção redobrada ao desgaste',
    body: 'Pressão recomendada de fábrica: aproximadamente 36 PSI dianteiro / 42 PSI traseiro a frio, em uso de rua. Dada a potência entregue, o desgaste do pneu traseiro é acelerado — monitore o sulco com frequência maior que em motos convencionais. Marcas recomendadas: Bridgestone Battlax Hypersport S23, Pirelli Diablo Rosso IV/Supercorsa, Michelin Power GP2 — sempre em composto compatível com o peso e potência da moto, nunca opte por pneu de reposição genérico ou de menor categoria.',
  },
]

const H2_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Recall de tensor de corrente de comando (CCT) documentado em algumas unidades',
    body: 'Existe registro de campanha de recall/atualização relacionada ao tensor da corrente de comando (cam chain tensioner) em algumas unidades da linha H2 SX. Se você possui uma Ninja H2 ou H2 SX (qualquer versão), verifique junto à concessionária Kawasaki se há campanhas de recall pendentes para o chassi da sua moto — é um serviço gratuito quando aplicável e não deve ser ignorado, dado que envolve componente interno do motor.',
  },
  {
    severity: 'OK',
    title: 'Confiabilidade do supercharger é boa em uso dentro do especificado — problema surge com modificações',
    body: 'Relatos de proprietários de longo prazo (incluindo uso intenso com viagens de longa distância e trackdays) indicam que o supercharger da H2 é robusto e confiável quando a moto permanece de fábrica (stock) e recebe manutenção pela concessionária conforme o cronograma oficial. Os raros problemas relatados aparecem associados a modificações no sistema de admissão/escape ou remapeamento não homologado. Não modifique o sistema de admissão do supercharger — o risco de dano é alto e a peça é caríssima para reposição.',
  },
  {
    severity: 'DANGER',
    title: 'Peso e potência exigem pilotagem respeitosa — moto não perdoa erro de iniciante',
    body: 'A Ninja H2 entrega torque de forma muito mais linear e constante que uma superbike aspirada equivalente (efeito do supercharger), o que pode enganar pilotos menos experientes sobre o quão rápido a velocidade sobe. A combinação de peso elevado (~238kg a seco na H2 SX) com potência de quase 200cv exige pilotagem respeitosa, principalmente em piso molhado ou frio. Esta não é uma moto recomendada para iniciantes de moto esportiva.',
  },
  {
    severity: 'WARN',
    title: 'Custo elevado de qualquer serviço — planeje o orçamento de manutenção antes da compra',
    body: 'Todo item de manutenção da H2 (óleo sintético premium, velas, kit relação, pastilhas, revisões em concessionária) custa significativamente mais que em motos convencionais — é reflexo direto da raridade da moto e da ausência de peças alternativas no mercado brasileiro. Antes de comprar uma H2 usada, é essencial levantar o custo real de manutenção com a concessionária Kawasaki mais próxima, pois pode surpreender proprietários vindos de motos mais populares.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico/eletrônico complexo — bateria fraca afeta múltiplos sistemas',
    body: 'A Ninja H2 (especialmente a versão SX SE com suspensão semi-ativa eletrônica) tem um sistema elétrico muito mais complexo que motos convencionais — suspensão eletrônica, múltiplos modos de pilotagem, painel TFT, controle de tração e cruise control (SX SE) dependem de tensão estável da bateria. Mantenha a bateria sempre bem carregada (considere um carregador de manutenção tipo Optimate/Battery Tender se a moto ficar parada por períodos longos) — problemas elétricos intermitentes em sistemas tão integrados podem ser difíceis e caros de diagnosticar.',
  },
]

const H2_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Ninja H2/H2 SX SE: siga rigorosamente o calendário oficial da concessionária Kawasaki',
    body: '1.000 km — Revisão de amaciamento obrigatória em concessionária: troca de óleo (10W-40 JASO MA sintético) + inspeção completa. | 6.000 km — Troca de óleo/filtro. Lubrificar corrente. Inspeção do filtro de ar do supercharger. | 12.000 km — Troca de óleo/filtro. Velas (conjunto de 4). Fluido de freio DOT 4. Verificar campanhas de recall pendentes (CCT). | 18.000 km — Troca de óleo/filtro. Filtro de ar. Kit relação (inspeção de desgaste). | 24.000 km — Folga de válvulas (revisão obrigatória em concessionária — item de alta complexidade neste motor). Revisão completa do sistema de supercharger. | Todo o ciclo — priorize sempre concessionária oficial Kawasaki; não há alternativa confiável de mercado paralelo para esta moto no Brasil.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'ZX-4R',
    yearFrom: 2023,
    yearTo: null,
    MACETES: ZX4R_MACETES,
    PROBLEMAS: ZX4R_PROBLEMAS,
    MANUTENCAO: ZX4R_MANUTENCAO,
  },
  {
    modelName: 'ZX-6R',
    yearFrom: 2019,
    yearTo: null,
    MACETES: ZX6R_MACETES,
    PROBLEMAS: ZX6R_PROBLEMAS,
    MANUTENCAO: ZX6R_MANUTENCAO,
  },
  {
    modelName: 'ZX-10R',
    yearFrom: 2011,
    yearTo: null,
    MACETES: ZX10R_MACETES,
    PROBLEMAS: ZX10R_PROBLEMAS,
    MANUTENCAO: ZX10R_MANUTENCAO,
  },
  {
    modelName: 'NINJA H2',
    yearFrom: 2015,
    yearTo: null,
    MACETES: H2_MACETES,
    PROBLEMAS: H2_PROBLEMAS,
    MANUTENCAO: H2_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'ZX-4R',
    yearFrom: 2023, yearTo: null,
    tireSize: '120/70ZR17 (F) · 160/60ZR17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 33, rearPsiLoad: 39,
    notes: 'Solo: F 32 / R 36 PSI a frio. Com carona/bagagem: F 33 / R 39 PSI (estimativa baseada em motos esportivas semelhantes — confirme na etiqueta do braço oscilante ou manual do seu ano). Pneu original Dunlop Sportmax GPR300. Sempre calibrar a frio.',
  },
  {
    modelName: 'ZX-6R',
    yearFrom: 2019, yearTo: null,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo/uso de rua: F 36 / R 42 PSI a frio (250 kPa / 290 kPa). Para track day, reduzir a traseira para ~32 PSI a frio conforme orientação do composto de pneu utilizado. Sempre calibrar com pneu frio, nunca após rodar.',
  },
  {
    modelName: 'ZX-10R',
    yearFrom: 2011, yearTo: null,
    tireSize: '120/70ZR17 (F) · 190/55ZR17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo/uso de rua: F 36 / R 42 PSI a frio, conforme manual do proprietário. Superbike sem previsão de uso com carona/bagagem pesada. Para pista, ajuste conforme tabela específica do fabricante do pneu utilizado (varia com o composto).',
  },
  {
    modelName: 'NINJA H2',
    yearFrom: 2015, yearTo: null,
    tireSize: '120/70ZR17 (F) · 190/55ZR17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo/uso de rua: F 36 / R 42 PSI a frio. Versão H2 SX SE (touring, com bagageiro) pode ter recomendação de pressão traseira ligeiramente maior com carga — confirme na etiqueta específica do seu ano/versão. Sempre calibrar a frio.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // ZX-4R / ZX-4RR
  { modelName: 'ZX-4R', yearFrom: 2023, yearTo: null, component: 'Óleo 10W-30 API SJ+/JASO MA (~3,0L)', intervalKm: 6000, intervalMonths: 6, notes: 'Motor de altíssima rotação (15.000+ rpm). Reduzir para 4.000 km em uso esportivo frequente.', priority: 'HIGH', order: 1 },
  { modelName: 'ZX-4R', yearFrom: 2023, yearTo: null, component: 'Filtro de óleo', intervalKm: 12000, intervalMonths: 12, notes: 'Trocar junto com a troca de óleo alternada. Aplicar óleo no O-ring ao montar.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ZX-4R', yearFrom: 2023, yearTo: null, component: 'Velas NGK LMAR9G ×4', intervalKm: 12000, intervalMonths: null, notes: 'Trocar sempre o conjunto de 4 juntas. Peça importada — planeje com antecedência.', priority: 'HIGH', order: 3 },
  { modelName: 'ZX-4R', yearFrom: 2023, yearTo: null, component: 'Lubrificação corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Regime de giro alto acelera desgaste — não pule este item.', priority: 'HIGH', order: 4 },
  { modelName: 'ZX-4R', yearFrom: 2023, yearTo: null, component: 'Kit relação 520 completo', intervalKm: 20000, intervalMonths: null, notes: 'DID 520VX3 ou RK 520MXZ com O-ring. Trocar corrente + pinhão + coroa juntos.', priority: 'HIGH', order: 5 },
  { modelName: 'ZX-4R', yearFrom: 2023, yearTo: null, component: 'Folga de válvulas', intervalKm: 12000, intervalMonths: 12, notes: 'Motor 4 cilindros de alta rotação — item crítico, siga tabela específica do manual.', priority: 'HIGH', order: 6 },
  { modelName: 'ZX-4R', yearFrom: 2023, yearTo: null, component: 'Filtro de ar', intervalKm: 18000, intervalMonths: 12, notes: 'Inspecionar antes se rodar em ambiente com poeira.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ZX-4R', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 18000, intervalMonths: 24, notes: 'Bienal obrigatório — o fluido absorve umidade com o tempo.', priority: 'HIGH', order: 8 },
  { modelName: 'ZX-4R', yearFrom: 2023, yearTo: null, component: 'Pastilhas de freio — inspeção', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar espessura mínima marcada na própria pastilha.', priority: 'MEDIUM', order: 9 },
  { modelName: 'ZX-4R', yearFrom: 2023, yearTo: null, component: 'Embreagem assistida/deslizante (RR) — inspeção', intervalKm: 12000, intervalMonths: 12, notes: 'Ajuste delicado — procurar concessionária Kawasaki ou oficina especializada.', priority: 'MEDIUM', order: 10 },

  // ZX-6R
  { modelName: 'ZX-6R', yearFrom: 2019, yearTo: null, component: 'Óleo 10W-40 JASO MA (2,8L s/ filtro / 3,1L c/ filtro)', intervalKm: 6000, intervalMonths: 6, notes: 'Motor 636cc DOHC. Reduzir para 3.000-4.000 km em uso de pista frequente.', priority: 'HIGH', order: 1 },
  { modelName: 'ZX-6R', yearFrom: 2019, yearTo: null, component: 'Filtro de óleo', intervalKm: 12000, intervalMonths: 12, notes: 'Trocar na troca alternada de óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ZX-6R', yearFrom: 2019, yearTo: null, component: 'Velas NGK CR9E ×4 (gap 0,8-0,9mm)', intervalKm: 12000, intervalMonths: null, notes: 'Considerar upgrade para CR9EIX (iridium) — dobra a durabilidade.', priority: 'HIGH', order: 3 },
  { modelName: 'ZX-6R', yearFrom: 2019, yearTo: null, component: 'Lubrificação corrente 525', intervalKm: 500, intervalMonths: null, notes: 'Lubrificar antes/depois de cada sessão de pista.', priority: 'HIGH', order: 4 },
  { modelName: 'ZX-6R', yearFrom: 2019, yearTo: null, component: 'Kit relação 525 completo', intervalKm: 22000, intervalMonths: null, notes: 'DID 525VX3 ou RK 525XSO. Trocar corrente + pinhão + coroa juntos.', priority: 'HIGH', order: 5 },
  { modelName: 'ZX-6R', yearFrom: 2019, yearTo: null, component: 'Folga de válvulas', intervalKm: 24000, intervalMonths: 24, notes: 'DOHC 16V. Item crítico — siga tabela oficial do manual.', priority: 'HIGH', order: 6 },
  { modelName: 'ZX-6R', yearFrom: 2019, yearTo: null, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Inspecionar em revisões intermediárias.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ZX-6R', yearFrom: 2019, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Uso esportivo intenso: considerar Motul RBF600 (ponto de ebulição mais alto).', priority: 'HIGH', order: 8 },
  { modelName: 'ZX-6R', yearFrom: 2019, yearTo: null, component: 'Verificação do sistema de carga (retificador/estator)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha histórico documentado — medir tensão a 4.000 rpm (13,5-14,5V).', priority: 'CRITICAL', order: 9 },
  { modelName: 'ZX-6R', yearFrom: 2019, yearTo: null, component: 'Pastilhas de freio', intervalKm: 10000, intervalMonths: null, notes: 'Considerar composto sintético/semi-metálico (EBC HH) se usar em pista com frequência.', priority: 'MEDIUM', order: 10 },

  // ZX-10R
  { modelName: 'ZX-10R', yearFrom: 2011, yearTo: null, component: 'Óleo 10W-40 JASO MA', intervalKm: 6000, intervalMonths: 6, notes: 'Reduzir para 3.000 km em uso de pista frequente. Motul 300V recomendado para uso intenso.', priority: 'HIGH', order: 1 },
  { modelName: 'ZX-10R', yearFrom: 2011, yearTo: null, component: 'Filtro de óleo', intervalKm: 12000, intervalMonths: 12, notes: 'Trocar na troca alternada de óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ZX-10R', yearFrom: 2011, yearTo: null, component: 'Velas iridium NGK ×4 (gap 0,8-0,9mm)', intervalKm: 12000, intervalMonths: null, notes: 'Conjunto de 4, sempre trocado junto. Confirmar código exato para o ano/versão.', priority: 'HIGH', order: 3 },
  { modelName: 'ZX-10R', yearFrom: 2011, yearTo: null, component: 'Lubrificação corrente 525 de alta resistência', intervalKm: 500, intervalMonths: null, notes: 'Potência de +200cv exige corrente robusta (DID 525ZVMX ou RK 525GXW).', priority: 'HIGH', order: 4 },
  { modelName: 'ZX-10R', yearFrom: 2011, yearTo: null, component: 'Kit relação 525 completo', intervalKm: 22000, intervalMonths: null, notes: 'Nunca usar kit genérico sem classificação para alta potência — risco de ruptura.', priority: 'CRITICAL', order: 5 },
  { modelName: 'ZX-10R', yearFrom: 2011, yearTo: null, component: 'Folga de válvulas', intervalKm: 24000, intervalMonths: 24, notes: 'DOHC 16V. Item crítico e caro — siga tabela oficial do ano/versão.', priority: 'HIGH', order: 6 },
  { modelName: 'ZX-10R', yearFrom: 2011, yearTo: null, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Sistema Ram Air — manter filtro limpo preserva a resposta em alta velocidade.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ZX-10R', yearFrom: 2011, yearTo: null, component: 'Fluido de freio DOT 4 (pinças radiais)', intervalKm: 12000, intervalMonths: 12, notes: 'Uso esportivo intenso: troca anual recomendada. Motul RBF600 para pista.', priority: 'HIGH', order: 8 },
  { modelName: 'ZX-10R', yearFrom: 2011, yearTo: null, component: 'Calibração de sensores eletrônicos (IMU, TC, quickshifter)', intervalKm: null, intervalMonths: 12, notes: 'Verificar em concessionária após queda, troca de roda ou serviço de suspensão.', priority: 'MEDIUM', order: 9 },
  { modelName: 'ZX-10R', yearFrom: 2011, yearTo: null, component: 'Pastilhas de freio', intervalKm: 10000, intervalMonths: null, notes: 'Compostos semi-metálicos/sintéticos recomendados para uso esportivo (EBC HH, Brembo Z04).', priority: 'MEDIUM', order: 10 },

  // NINJA H2
  { modelName: 'NINJA H2', yearFrom: 2015, yearTo: null, component: 'Óleo 10W-40 JASO MA sintético (Motul 300V recomendado)', intervalKm: 6000, intervalMonths: 6, notes: 'Motor supercharged — não usar óleo de qualidade inferior. Capacidade ~4,4L (confirmar no manual do ano).', priority: 'CRITICAL', order: 1 },
  { modelName: 'NINJA H2', yearFrom: 2015, yearTo: null, component: 'Filtro de óleo', intervalKm: 12000, intervalMonths: 12, notes: 'Trocar em concessionária Kawasaki — sem alternativas de mercado paralelo no Brasil.', priority: 'HIGH', order: 2 },
  { modelName: 'NINJA H2', yearFrom: 2015, yearTo: null, component: 'Velas ×4', intervalKm: 12000, intervalMonths: null, notes: 'Gap 0,7-0,8mm aprox. Conjunto de 4, trocado junto, via concessionária.', priority: 'HIGH', order: 3 },
  { modelName: 'NINJA H2', yearFrom: 2015, yearTo: null, component: 'Filtro de ar do supercharger', intervalKm: 12000, intervalMonths: 12, notes: 'Item crítico — contaminação acelera desgaste do compressor mecânico.', priority: 'CRITICAL', order: 4 },
  { modelName: 'NINJA H2', yearFrom: 2015, yearTo: null, component: 'Lubrificação corrente 530 de alta resistência', intervalKm: 500, intervalMonths: null, notes: 'Kit original Kawasaki ou DID ZVMX/RK GXW específico para a potência.', priority: 'HIGH', order: 5 },
  { modelName: 'NINJA H2', yearFrom: 2015, yearTo: null, component: 'Kit relação completo', intervalKm: 20000, intervalMonths: null, notes: 'Custo elevado — orçar previamente com concessionária.', priority: 'HIGH', order: 6 },
  { modelName: 'NINJA H2', yearFrom: 2015, yearTo: null, component: 'Folga de válvulas', intervalKm: 24000, intervalMonths: 24, notes: 'Alta complexidade neste motor — somente em concessionária Kawasaki.', priority: 'CRITICAL', order: 7 },
  { modelName: 'NINJA H2', yearFrom: 2015, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 8 },
  { modelName: 'NINJA H2', yearFrom: 2015, yearTo: null, component: 'Verificação de campanhas de recall (CCT e outros)', intervalKm: null, intervalMonths: 12, notes: 'Consultar concessionária Kawasaki pelo chassi — serviço gratuito quando aplicável.', priority: 'HIGH', order: 9 },
  { modelName: 'NINJA H2', yearFrom: 2015, yearTo: null, component: 'Bateria — manutenção preventiva (carregador tipo Optimate)', intervalKm: null, intervalMonths: 3, notes: 'Sistema eletrônico complexo (suspensão semi-ativa na SX SE) é sensível a queda de tensão.', priority: 'MEDIUM', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Kawasaki Ninja Super (ZX-4R / ZX-6R / ZX-10R / Ninja H2)...')

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

  console.log('✅ Kawasaki Ninja Super concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
