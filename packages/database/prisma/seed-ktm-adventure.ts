// seed-ktm-adventure.ts — KTM linha Adventure (640/950/990/1190/890/1290 Super Adventure)
// Motos de touring/off-road de longo curso, historicamente conhecidas por robustez do
// motor LC4/LC8/LC8c, mas também por problemas elétricos (regulador/retificador) e,
// em modelos recentes, desgaste prematuro de comando de válvulas (LC8c 790/890).
// Execute: pnpm --filter @motormacete/database db:seed:ktm-adventure
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

// ─── KTM 640 ADVENTURE (LC4) ───────────────────────────────────────────────────
// Motor: 625cc monocilíndrico LC4 4T, refrigerado a líquido, SOHC 4V | ~54cv @ 7.000rpm
// Torque: ~55Nm @ 5.500rpm | Carburador Mikuni CV (a partir de 1998) / Dell'Orto (1997)
// Óleo: Motorex 10W-50 sintético, ~2,0L (motor seco/câmbio integrado) | Vela NGK DCPR8E
// Pneu: 90/90-21 (D) / 140/80-17 (T) | Corrente 520 | Tanque 12–28L (versão R/Travel maior)
// Produção: 1997–2007 (moto histórica, base do sucesso da KTM em rali/Dakar nos anos 90)

const KTM640_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motorex 10W-50 sintético — motor seco compartilha óleo com câmbio',
    body: 'O monocilíndrico LC4 de 625cc tem cárter seco (lubrificação forçada) e o mesmo óleo lubrifica motor e câmbio — por isso precisa ser 100% sintético de alta qualidade. Use Motorex Power Synt 4T 10W-50 (óleo oficial KTM da época) ou equivalente Motul 7100 10W-50. Capacidade aproximada: 2,0L na troca. Troque a cada 3.000 km em uso misto ou a cada 1.500–2.000 km em uso off-road pesado — o motor monocilíndrico de alta compressão gera mais calor e contamina o óleo mais rápido que um V-twin.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DCPR8E — gap 0,7mm; verifique a cada 5.000 km',
    body: 'Vela recomendada: NGK DCPR8E (equivalente Denso X24EPR-U9), gap 0,7mm. O motor LC4 de alta taxa de compressão (11,5:1) exige vela em bom estado — sinais de desgaste incluem partida a frio difícil e falha em alta rotação. Troque a cada 8.000–10.000 km. Custo: R$ 25–40. Como a KTM tem rede de peças menor no Brasil, compre 2 velas reserva ao fazer manutenção — encomendas de reposição podem demorar.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de câmbio (cam chain) do LC4: verifique tensionador em motores antigos',
    body: 'O motor LC4 usa corrente de comando interna com tensionador automático. Em unidades com mais de 60.000 km e histórico de troca de óleo irregular, o tensionador pode gastar e causar ruído metálico na tampa do motor em marcha lenta. Não é falha comum se o óleo for trocado no intervalo correto, mas em moto de procedência desconhecida vale checar o ruído antes de comprar. Reparo requer abertura parcial do motor — procure oficina especializada em KTM monocilíndricas (poucas no Brasil, mas grupos de proprietários indicam boas opções em SP e RS).',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão 520 e kit relação — lubrifique a cada 500 km',
    body: 'Kit relação: pinhão 16T + coroa 42T (varia por versão) + corrente 520 × 118 links. Como é moto de trilha/viagem longa, lubrifique a corrente a cada 500 km ou após qualquer travessia de rio/lama. Marcas recomendadas: DID 520VX3 (X-ring) ou RK 520XSO — mais resistentes que O-ring padrão para uso off-road. Kit completo: R$ 350–600 via importadores de peças para motos off-road (Trilha Racing, Bike Center e similares vendem kits DID/RK compatíveis).',
  },
  {
    severity: 'WARN',
    title: 'Peças originais KTM escassas no Brasil — recorra a compatibilidade e importação',
    body: 'A rede de concessionárias e distribuidores KTM no Brasil é pequena comparada a marcas japonesas, e a 640 Adventure já saiu de linha há quase 20 anos. Peças de desgaste (juntas, retentores, kit relação, filtros) geralmente têm equivalente genérico compatível — pesquise pela medida exata em vez do código KTM. Para peças de motor específicas (pistão, biela, comando), compre via importadores especializados em KTM (KTM Twins nos EUA, Rally Raid UK) ou fóruns como Horizons Unlimited, que têm seção de peças usadas de proprietários que desmontaram motos.',
  },
  {
    severity: 'OK',
    title: 'Preparação para viagem longa: proteção de cárter e reforço do subchassi traseiro',
    body: 'A 640 Adventure é lendária em viagens de longa distância (Cape Town a Londres, Dakar amador), mas o cárter fica exposto a impactos. Instale um skid plate (protetor de cárter) de alumínio — modelos genéricos para LC4 custam R$ 400–800 via importação. Verifique também o subchassi traseiro (onde prende o rack de bagagem) a cada viagem — solturas de solda são um problema documentado em uso com bagagem pesada. Reforce com suporte extra se for carregar mais de 15kg atrás.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: espuma dupla — limpe a cada 3.000 km em uso off-road',
    body: 'O filtro de ar de espuma (dupla camada, tipo Twin Air) precisa de manutenção frequente em uso off-road/trilha — poeira reduz drasticamente a vida útil se não for limpo. Lave com desengraxante específico para filtro de espuma (não usar gasolina — resseca a espuma), seque completamente e aplique óleo específico para filtro (Twin Air Filter Oil ou Motul A1). Em uso rodoviário puro, o intervalo pode ser estendido para 5.000 km.',
  },
]

const KTM640_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador/retificador: ponto de falha elétrica clássico do LC4',
    body: 'O regulador/retificador de tensão da 640 Adventure é um ponto fraco documentado — falha comum causa bateria descarregando em viagem ou, no outro extremo, sobrecarga que danifica a bateria e o estator. Sintoma: farol fraco em marcha lenta, bateria não segura carga, luz de bateria acesa. Diagnóstico: multímetro na bateria a 4.000 rpm, deve marcar 13,5–14,8V. Substitutos com tecnologia MOSFET (ex.: Rick\'s Motorsport Electrics, SH775) são upgrades populares na comunidade de proprietários por serem mais confiáveis que o regulador original a tiristor.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pelo retentor da embreagem hidráulica ou cabo (conforme versão)',
    body: 'Versões com embreagem hidráulica podem apresentar vazamento no cilindro mestre com o tempo — sintoma: ponto de embreagem "mole" ou perda progressiva de acionamento. Versões a cabo sofrem desgaste do cabo em uso off-road (dobras e sujeira aceleram o desgaste). Inspecione o nível de fluido (DOT 4) a cada revisão e lubrifique o cabo de embreagem a cada 3.000 km com óleo fino ou lubrificante específico para cabos.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito parado — sistema de arrefecimento exige atenção',
    body: 'O motor monocilíndrico de alta compressão esquenta rapidamente em trânsito parado ou trilha lenta em dia quente. Verifique o nível do líquido de arrefecimento (mistura 50/50 com anticongelante) a cada mês e o funcionamento da eletroventoinha. Radiadores duplos (um de cada lado) do LC4 são vulneráveis a impactos de pedras em trilha — proteções de radiador (tela) são recomendadas para uso off-road intenso.',
  },
  {
    severity: 'WARN',
    title: 'Vibração e afrouxamento de parafusos: característica do monocilíndrico de grande cilindrada',
    body: 'Por ser um monocilíndrico de 625cc de alta compressão, o LC4 vibra mais que motos multicilíndricas — isso é inerente ao projeto, não defeito. Consequência prática: parafusos de carenagem, espelhos, suporte de bagageiro e conexões elétricas soltam com mais frequência. Faça inspeção visual de aperto a cada 1.000 km em viagens longas, usando trava-rosca (Loctite azul) em parafusos que soltam repetidamente.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em componentes elétricos e parafusaria em moto usada em chuva/trilha úmida',
    body: 'Motos desta era e uso (trilha, viagem, chuva) sofrem corrosão em conectores elétricos, parafusos de fixação do motor e carcaças de alumínio expostas. Aplique graxa dielétrica nos conectores elétricos acessíveis a cada 6 meses e verifique sinais de oxidação branca (alumínio) ou ferrugem (aço) em parafusaria — troque por parafusos inox quando possível em peças estruturais expostas.',
  },
]

const KTM640_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 640 Adventure + preparação para viagem longa',
    body: '1.000 km — Troca de óleo de amaciamento (Motorex 10W-50, ~2,0L) + inspeção geral de aperto. | 3.000 km — Troca de óleo. Lubrificar corrente e cabo de embreagem. Limpar filtro de ar. | 5.000 km — Verificar/trocar vela NGK DCPR8E. Verificar folga de válvulas (adm 0,10mm / esc 0,15mm, motor frio). | 8.000 km — Kit relação se desgastado. Verificar tensão do regulador (13,5–14,8V). | 10.000 km — Fluido de freio DOT 4. Verificar retentores de bengala. | 15.000 km — Revisão geral de motor (folgas, vazamentos, corrosão). PRÉ-VIAGEM LONGA (Dakar amador, cruzamento de continente): revisar corrente/kit relação mesmo com poucos km rodados, testar eletroventoinha e nível de arrefecimento, levar câmara de ar reserva + kit de remendo, ferramenta específica KTM (chave Torx/Allen do kit original), e mapear oficinas KTM ou genéricas no trajeto — a rede é escassa fora de grandes cidades.',
  },
]

// ─── KTM 950 ADVENTURE ──────────────────────────────────────────────────────────
// Motor: 942cc V-twin LC8 75°, DOHC 4V, refrigerado a líquido | ~102cv @ 8.000rpm
// Torque: ~97Nm @ 6.000rpm | Injeção Keihin EFI | Óleo Motorex 10W-50 sintético, 3,0L com filtro
// Vela: NGK CR8EK / CR8EIX, gap 0,7mm | Pneu: 90/90-21 (D) / 150/70-18 (T)
// Corrente 525 | Tanque 22L | Arrefecimento 2,1L (mistura 40/60) | Produção: 2003–2006

const KTM950_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motorex 10W-50 sintético — 3,0L com filtro; troque a cada 7.500 km',
    body: 'O V-twin LC8 de 942cc exige óleo sintético de alta qualidade (Motorex Power Synt 4T 10W-50 é o especificado pela KTM). Capacidade: 3,0L com troca de filtro. Intervalo oficial: 7.500 km, mas em uso off-road ou viagem com temperatura elevada, reduza para 5.000 km. Motul 7100 10W-50 é substituto equivalente e mais fácil de achar no Brasil. Nunca use óleo mineral — a embreagem multidisco e as folgas do motor são calibradas para viscosidade sintética.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK CR8EK (×2) gap 0,7mm — sempre troque em par',
    body: 'O V-twin tem duas velas de ignição (uma por cilindro): NGK CR8EK convencional ou CR8EIX iridium (mais duradoura, ~20.000 km). Gap: 0,7mm. Troque sempre as duas juntas — vela gasta em apenas um cilindro causa vibração e perda de potência perceptível no V-twin. Custo do par: R$ 60–100 (convencional) ou R$ 140–200 (iridium). Acesso ao cilindro traseiro é mais trabalhoso, exige remoção de carenagem/tanque parcial.',
  },
  {
    severity: 'WARN',
    title: 'Peças KTM 950 escassas no Brasil — priorize compatibilidade com irmãs 990/1190',
    body: 'A rede de peças KTM no Brasil é pequena e a 950 Adventure já não é fabricada há quase 20 anos. Muitos componentes de desgaste (filtros, correntes, pastilhas, retentores) têm medidas compatíveis com a 990 Adventure (sucessora direta) — ao comprar peças, pesquise por medida/especificação técnica, não apenas pelo código KTM 950. Grupos de proprietários no Facebook e fóruns internacionais (ADVrider, Horizons Unlimited) têm listas de peças cruzadas testadas pela comunidade.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 e kit relação — pinhão 17T + coroa 42T, lubrifique a cada 500-700 km',
    body: 'A 950 Adventure usa corrente 525, mais robusta que a 520 da 640. Kit relação: pinhão 17T + coroa 42T + corrente 525 × 120 links (varia por ano). Lubrifique a cada 500-700 km, mais frequente após chuva ou trilha com poeira/lama. Marcas recomendadas para uso adventure: DID 525VX3 (X-ring) ou RK 525XSO. Kit completo: R$ 500–800.',
  },
  {
    severity: 'OK',
    title: 'Retentor de válvulas e embreagem: sinais de desgaste em unidades com +50.000 km',
    body: 'Unidades com alta quilometragem podem apresentar consumo leve de óleo (retentores de válvula) ou embreagem "patinando" sob carga máxima. Consumo de até 300-400mL de óleo a cada 5.000 km é considerado aceitável para o motor; acima disso, vale inspecionar retentores. Para a embreagem, verifique o desgaste dos discos (kit de embreagem completo compatível com Hinson ou Barnett — fabricantes que produzem kits para o LC8 — custa R$ 800–1.500 importado).',
  },
  {
    severity: 'OK',
    title: 'Pneus para uso misto: Continental TKC80 ou Metzeler Karoo para trilha pesada',
    body: 'Para uso rodoviário predominante, pneus como Pirelli Scorpion Trail ou Michelin Anakee equilibram bem asfalto e trilha leve. Para uso off-road mais intenso, Continental TKC80 ou Metzeler Karoo 3 (90/90-21 dianteiro / 150/70-18 traseiro) oferecem mais tração em terra/lama, ao custo de desgaste mais rápido no asfalto e mais ruído. A 950 é pesada (~215kg) para pneu de taco puro — misto é o equilíbrio recomendado pela maioria dos proprietários.',
  },
]

const KTM950_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador/retificador: falha elétrica documentada — pode superaquecer e queimar',
    body: 'É o problema elétrico mais reportado pela comunidade de proprietários da 950/990 Adventure: o regulador/retificador original (tipo tiristor) pode falhar de duas formas — parar de carregar a bateria (tensão cai para ~12,4V mesmo em alta rotação) ou parar de regular, disparando a tensão para valores destrutivos que queimam a bateria e o estator. Localização perto do cano de escape/coletor "Y" contribui para o superaquecimento em trânsito parado. Diagnóstico: multímetro na bateria a 5.000 rpm — deve marcar 14–15V. Substitutos com tecnologia MOSFET (ex.: Compufire, SH775, DPNRV) são mais confiáveis e recomendados como upgrade preventivo.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão no tubo de ligação (link pipe) entre os escapamentos',
    body: 'O tubo de ligação entre os dois escapamentos (que equaliza pressão entre os cilindros) fica em posição que acumula sujeira e umidade, sendo propenso a corrosão em climas úmidos — a peça de reposição é cara e às vezes difícil de encontrar. Inspecione visualmente a cada revisão anual; trate sinais iniciais de ferrugem com produtos anticorrosivos e mantenha a moto limpa após uso em chuva ou trilha úmida/salgada (regiões litorâneas).',
  },
  {
    severity: 'WARN',
    title: 'Vazamento no cilindro mestre da embreagem hidráulica',
    body: 'Os retentores internos do cilindro mestre da embreagem hidráulica têm vida útil limitada e podem vazar fluido com o tempo — problema documentado e considerado de reparo simples (troca do kit de reparo interno é barata), mas deve ser feito assim que notado. Sintoma: ponto de embreagem progressivamente mais "mole" ou perda total de acionamento. Verifique o nível de fluido DOT 4 no reservatório a cada revisão.',
  },
  {
    severity: 'WARN',
    title: 'Trinca no escapamento do cilindro traseiro — problema ocasional documentado',
    body: 'Alguns proprietários relatam trincas no tubo de escape do cilindro traseiro, provavelmente por fadiga térmica/vibração. Não é o problema mais comum, mas vale inspecionar visualmente a solda e a região próxima ao cabeçote traseiro durante revisões, especialmente em motos com uso intenso em trilha (impactos e vibração agravam fadiga metálica).',
  },
  {
    severity: 'WARN',
    title: 'Sensor de temperatura e conectores elétricos oxidados em moto de uso off-road',
    body: 'Em motos usadas com frequência em trilha/chuva, conectores elétricos do chicote (sensores, bobinas de ignição, conexões do regulador) sofrem oxidação e mau contato, causando falhas intermitentes difíceis de diagnosticar (motor falhando aleatoriamente, luzes de painel piscando). Aplique graxa dielétrica em todos os conectores acessíveis a cada 6 meses como prevenção — é a causa mais comum de "fantasmas elétricos" nesta geração de LC8.',
  },
]

const KTM950_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 950 Adventure + preparação pré-viagem longa',
    body: '1.000 km — Troca de óleo de amaciamento. | 7.500 km — Troca de óleo Motorex 10W-50 (3,0L) + filtro. Verificar velas NGK CR8EK (par). Lubrificar corrente 525. | 15.000 km — Trocar velas. Folga de válvulas (adm 0,10mm / esc 0,15mm, motor frio — DOHC 8 válvulas). Fluido de freio e embreagem DOT 4. | 20.000 km — Kit relação 525. Verificar tensão do regulador (14–15V a 5.000 rpm) — substituir preventivamente por unidade MOSFET se moto tiver mais de 5 anos. | 30.000 km — Revisão de vedantes de bengala, mangueiras de arrefecimento, tubo de ligação dos escapamentos (corrosão). PRÉ-VIAGEM LONGA: revisar corrente/kit relação, testar carga da bateria e regulador, verificar mangueiras e nível de arrefecimento, levar câmara reserva e kit de remendo, mapear oficinas no trajeto (rede KTM escassa fora de capitais).',
  },
]

// ─── KTM 990 ADVENTURE ──────────────────────────────────────────────────────────
// Motor: 999cc V-twin LC8 75°, DOHC 4V, refrigerado a líquido | ~98cv @ 8.500rpm
// Torque: ~96Nm @ 6.000rpm | Injeção Keihin EFI | Óleo Motorex 10W-50 sintético, 3,0L com filtro
// Vela: NGK CR8EK / CR8EIX, gap 0,7mm | Pneu: 90/90-21 (D) / 150/70-18 (T)
// Corrente 525 | Tanque 22L | Produção: 2006–2013 (evolução direta da 950)

const KTM990_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motorex 10W-50 sintético — 3,0L com filtro; intervalo oficial 7.500 km',
    body: 'Mesmo padrão da 950: motor V-twin LC8 exige sintético puro (Motorex Power Synt 4T 10W-50 ou Motul 7100 10W-50). Capacidade: 3,0L com filtro. Intervalo: 7.500 km em uso normal, 5.000 km em uso off-road/viagem intensa com calor. A 990 recebeu ajustes de mapa de injeção e câmbio em relação à 950, mas o sistema de lubrificação é essencialmente o mesmo.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK CR8EK/CR8EIX (×2) gap 0,7mm — troque sempre em par',
    body: 'Mesma especificação da 950: duas velas NGK CR8EK (convencional, ~10.000 km) ou CR8EIX (iridium, ~20.000 km), gap 0,7mm. Vibração e queda de potência perceptíveis se uma vela estiver mais gasta que a outra no V-twin — troque sempre o par junto.',
  },
  {
    severity: 'OK',
    title: 'Peças compatíveis entre 950/990/1190 facilitam manutenção no Brasil',
    body: 'A boa notícia da 990 Adventure é o grande volume de unidades vendidas mundialmente comparado à 950 — mais peças de reposição em circulação e compatibilidade direta com muitos itens da 950 (kit relação, filtros, pastilhas). No Brasil, com a rede KTM reduzida, muitos mecânicos independentes que atendem KTM off-road (comuns em cidades com forte cena de trilha/enduro) conseguem localizar peças compatíveis mais rápido que concessionárias.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 e kit relação — lubrifique a cada 500-700 km',
    body: 'Mesma especificação da 950: corrente 525, pinhão 17T + coroa 42T (verificar relação exata por versão/ano). Lubrificação a cada 500-700 km prolonga a vida útil para 20.000-25.000 km. DID 525VX3 ou RK 525XSO são as opções mais recomendadas pela comunidade adventure para uso misto.',
  },
  {
    severity: 'WARN',
    title: 'Versão R/Dakar: suspensão WP de curso longo exige manutenção mais frequente',
    body: 'A versão 990 Adventure R/Dakar tem suspensão WP com curso de 210mm (vs. ~190mm da versão standard), calibrada para uso off-road pesado. Óleo da suspensão (bengala e monoamortecedor) deve ser trocado a cada 15.000-20.000 km em uso intenso de trilha (metade do intervalo de uso rodoviário puro), pois a suspensão trabalha muito mais e contamina o óleo mais rápido. Retentores de bengala também desgastam mais rápido nesta versão.',
  },
  {
    severity: 'OK',
    title: 'Pneus 90/90-21 / 150/70-18: Continental TKC80 e Metzeler Karoo para off-road',
    body: 'Para a versão R/Dakar com foco off-road, pneus Continental TKC80 ou Metzeler Karoo 3/Karoo Street equilibram bem o uso misto. Para uso majoritariamente rodoviário na versão standard, Pirelli Scorpion Trail II ou Michelin Anakee III oferecem mais durabilidade no asfalto e estabilidade em curva. Pressão de pneu deve ser reduzida (para 15-20 PSI) apenas em trilha/areia — sempre recalibrar para uso normal antes de voltar ao asfalto.',
  },
]

const KTM990_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador/retificador: mesmo ponto fraco elétrico da geração LC8',
    body: 'A 990 Adventure herda o mesmo problema documentado da 950: regulador/retificador original propenso a falhar por superaquecimento (localização próxima ao escape) ou desgaste do componente tiristor. Sintomas: tensão de carga abaixo de 13V a 5.000 rpm, bateria fraca mesmo após uso, ou, em caso de falha oposta, sobrecarga que queima a bateria. Substituição preventiva por unidade MOSFET (Compufire, SH775 ou equivalente) após 40.000-50.000 km é recomendada pela comunidade de proprietários como prevenção.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento no cilindro mestre de embreagem — mesmo padrão da 950',
    body: 'Kit de reparo interno do cilindro mestre de embreagem hidráulica tem vida útil limitada; vazamentos são documentados na comunidade. Verifique nível de fluido DOT 4 e firmeza do acionamento da embreagem a cada revisão. Reparo é barato (kit de vedantes) se feito no início do problema.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em componentes elétricos e tubo de ligação dos escapamentos',
    body: 'Mesmo padrão da 950 Adventure: o tubo de ligação entre os escapamentos e conectores elétricos do chicote são propensos a corrosão em uso com chuva/trilha úmida. Aplique graxa dielétrica nos conectores a cada 6 meses e inspecione visualmente a região do escapamento e cabeçote a cada revisão anual.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de embreagem em uso off-road agressivo (arrancadas em subida/areia)',
    body: 'Uso off-road agressivo (arrancadas com patinação controlada em subida ou areia) acelera o desgaste dos discos de embreagem multidisco. Sintoma: embreagem "patinando" sob aceleração forte mesmo com ajuste correto do cabo/fluido. Kits de embreagem de reposição (Barnett, Hinson) são compatíveis e recomendados para quem usa a moto intensamente em trilha.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de junta de cabeçote em unidades de alta quilometragem (+60.000 km)',
    body: 'Documentado ocasionalmente na comunidade: unidades de alta quilometragem sem retorque periódico dos parafusos do cabeçote podem apresentar leve vazamento de óleo pela junta. Prevenção: retorque conforme especificação a cada 20.000-30.000 km (verificar torque específico no manual de serviço, pois difere entre 950 e 990). Se notar óleo escuro entre os cilindros, vale investigar antes que piore.',
  },
]

const KTM990_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 990 Adventure/R/Dakar + preparação pré-viagem longa',
    body: '1.000 km — Troca de óleo de amaciamento. | 7.500 km — Troca de óleo Motorex 10W-50 (3,0L) + filtro. Velas NGK CR8EK (par). Lubrificar corrente 525. | 15.000 km — Trocar velas. Folga de válvulas (adm 0,10mm / esc 0,15mm, motor frio). Fluido de freio e embreagem DOT 4. Óleo da suspensão WP (versão R/Dakar: reduzir para 15.000 km se uso off-road intenso). | 20.000 km — Kit relação 525. Verificar tensão do regulador (13,5-15V a 5.000 rpm). | 30.000 km — Retorque parafusos do cabeçote. Inspecionar tubo de ligação dos escapamentos (corrosão). Vedantes de bengala. | 40.000-50.000 km — Substituição preventiva do regulador/retificador por unidade MOSFET. PRÉ-VIAGEM LONGA: revisar corrente, testar carga da bateria/regulador, verificar suspensão e vedantes, levar câmara reserva, ferramentas específicas Torx/Allen, mapear oficinas KTM/genéricas no trajeto.',
  },
]

// ─── KTM 1190 ADVENTURE ─────────────────────────────────────────────────────────
// Motor: 1195cc V-twin LC8 75°, DOHC 4V, refrigerado a líquido | ~150cv @ 9.500rpm
// Torque: ~125Nm @ 7.500rpm | Injeção Keihin EFI 52mm | Óleo Motorex 10W-50 sintético, ~3,5L com filtro
// Vela: NGK LKAR9BI-10 iridium (dupla ignição), gap conforme fábrica | Embreagem PASC (slipper)
// Pneu: 120/70 ZR19 (D) / 170/60 ZR17 (T) | Tanque 23L (3,5L reserva) | ABS/MTC Bosch
// Produção: 2013–2016 (versão de rodas de liga, mais rodoviária)

const KTM1190_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motorex 10W-50 sintético — troca a cada 10.000-15.000 km conforme uso',
    body: 'O V-twin de 1195cc de alta performance (150cv) exige óleo sintético Motorex Power Synt 4T 10W-50 (especificação oficial) ou Motul 7100 10W-50 como alternativa mais acessível no Brasil. Capacidade aproximada: 3,5L com filtro (confirme no manual da unidade específica, pode variar). Intervalo: 10.000-15.000 km em uso normal; reduza se usar a moto com frequência em rotações altas ou perseguição esportiva.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem PASC (slipper): ajuste do curso da alavanca influencia durabilidade',
    body: 'A 1190 usa embreagem antirreflexo PASC (Power Assisted Slipper Clutch), hidráulica. Mantenha o fluido DOT 4 sempre no nível correto e sangre o sistema se sentir ponto "esponjoso". A tecnologia slipper reduz o efeito de bloqueio da roda traseira em reduções agressivas, mas os discos ainda desgastam com uso urbano intenso (embreagem parcial em trânsito). Kit de discos original ou compatível (Barnett) custa caro — evite arrastar a embreagem desnecessariamente no dia a dia.',
  },
  {
    severity: 'OK',
    title: 'Vela iridium NGK LKAR9BI-10 (dupla ignição) — dura mais, mas troque no par correto',
    body: 'O motor usa velas iridium de encaixe específico (dupla ignição por cilindro em alguns anos/versões). Consulte o código exato para sua unidade — NGK LKAR9BI-10 é referência comum na linha 1190/1290. Vida útil de 20.000-25.000 km. Por serem peças de fornecedor específico, encomende com antecedência via importadores de peças NGK/KTM, pois nem sempre há estoque em lojas de peças comuns no Brasil.',
  },
  {
    severity: 'OK',
    title: 'Sistema eletrônico Bosch (ABS/MTC): mantenha bateria sempre carregada',
    body: 'A 1190 tem pacote eletrônico Bosch MSC completo (ABS, controle de tração, controle de wheelie). Todo esse sistema depende de tensão elétrica estável — bateria fraca pode gerar códigos de erro no painel ou desativar assistências. Use bateria de qualidade (YTZ10S ou equivalente Shorai/lítio para quem quer reduzir peso) e verifique a tensão em repouso mensalmente (mínimo 12,4V).',
  },
  {
    severity: 'OK',
    title: 'Rede de peças KTM: compre baterias/consumíveis básicos com folga',
    body: 'Apesar de a 1190 Adventure ser um modelo mais recente que a 950/990, a rede de concessionárias e distribuidores KTM no Brasil ainda é pequena. Itens de desgaste rápido (pastilhas de freio, filtros, correia/corrente) valem ser comprados com folga (2 unidades) ao fazer pedido, evitando parar a moto por falta de peça em caso de viagem ou uso intenso.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70-19 / 170/60-17: prioridade rodoviária — Michelin Anakee III ou Pirelli Scorpion Trail II',
    body: 'A 1190 Adventure (não-R) tem rodas de liga e é mais orientada ao asfalto/estrada que a versão R. Pneus recomendados: Michelin Anakee III, Pirelli Scorpion Trail II, ou Continental TrailAttack 2/3 — todos equilibrados para asfalto com capacidade limitada de estrada de terra batida. Evite pneus 100% off-road (tipo taco) nesta versão — a roda de liga não é compatível com uso severo de trilha como a versão R com rodas raiadas.',
  },
]

const KTM1190_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste de comando de válvulas (camshaft) em unidades mal lubrificadas',
    body: 'A geração LC8 de 1195cc de alta performance é mais sensível a intervalos de troca de óleo estendidos do que motores menos potentes. Uso de óleo fora da especificação ou troca atrasada acelera desgaste prematuro do came e seguidores. Sinal de alerta: ruído metálico crescente na parte superior do motor, perda de potência. Respeite rigorosamente o intervalo de óleo e use somente sintético de alta qualidade (Motorex ou Motul equivalente).',
  },
  {
    severity: 'WARN',
    title: 'Falhas intermitentes de eletrônica — chicote e conectores em moto de alta tecnologia',
    body: 'Motos com pacote eletrônico completo (ABS, MTC, múltiplos sensores) são mais sensíveis a falhas de conector/chicote do que modelos mais simples. Sintomas de "fantasma elétrico": luzes de alerta piscando aleatoriamente, ABS/MTC desativando sem motivo aparente, indicadores errados no painel. Antes de suspeitar de defeito grave na ECU, verifique conectores por oxidação/mau contato — aplique graxa dielétrica preventivamente a cada 6 meses.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento em cilindro mestre de embreagem hidráulica PASC',
    body: 'Assim como nas gerações anteriores (950/990), o sistema hidráulico de embreagem pode apresentar vazamento nos vedantes internos do cilindro mestre com o tempo. Verifique o nível de fluido DOT 4 regularmente e a firmeza do acionamento. Reparo com kit de vedantes é relativamente barato se feito no início do problema.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador: ainda um ponto de atenção, mesmo com eletrônica mais moderna',
    body: 'Embora a eletrônica da 1190 seja mais avançada que a das gerações 950/990, o sistema de carga ainda pode apresentar falhas relacionadas a superaquecimento do regulador em uso intenso ou trânsito parado. Monitore a tensão da bateria periodicamente (13,5-14,8V a 4.000-5.000 rpm com motor ligado) como parte da rotina preventiva.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão e oxidação em componentes expostos com uso em litoral/chuva',
    body: 'Como as demais Adventure, a 1190 sofre com corrosão em parafusaria, escape e conectores quando usada com frequência perto do mar ou sob chuva sem lavagem adequada. Lave a moto após exposição a maresia, aplique produto anticorrosivo em pontos de solda do escapamento e verifique conectores elétricos expostos a cada poucos meses.',
  },
]

const KTM1190_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 1190 Adventure + preparação pré-viagem longa',
    body: '1.000 km — Troca de óleo de amaciamento. | 10.000-15.000 km — Troca de óleo Motorex 10W-50 + filtro. Verificar vela iridium NGK LKAR9BI-10. Fluido de freio/embreagem DOT 4. | 15.000-20.000 km — Folga de válvulas (verificar especificação exata no manual — motor DOHC de alta performance é mais sensível a folgas fora do padrão). Kit relação se desgastado. | 20.000 km — Verificar tensão do regulador (13,5-14,8V). Inspecionar conectores elétricos (graxa dielétrica preventiva). | 25.000 km — Trocar velas. Revisão geral de vedantes de suspensão. | 30.000 km — Retorque de parafusos críticos do motor. Inspeção detalhada de corrosão em escapamento e chicote. PRÉ-VIAGEM LONGA: checar bateria e regulador, revisar corrente/kit relação, testar ABS/MTC, levar câmara reserva e ferramentas específicas Torx/Allen, mapear oficinas no trajeto (rede KTM ainda limitada fora de capitais).',
  },
]

// ─── KTM 1190 ADVENTURE R ────────────────────────────────────────────────────────
// Motor: 1195cc V-twin LC8 75° (mesmo bloco da 1190 standard) | ~150cv @ 9.500rpm
// Torque: ~125Nm @ 7.500rpm | Suspensão WP totalmente ajustável, 220mm curso, 250mm garra ao solo
// Óleo: Motorex 10W-50 sintético, ~3,5L com filtro | Vela: NGK LKAR9BI-10 iridium
// Pneu: 90/90-21 (D) / 150/70ZR18 (T) — rodas raiadas com câmara/tubeless conforme versão
// Eletrônica: Bosch MSC (ABS + MTC + controle de wheelie), ABS desligável para off-road
// Produção: 2013–2016 (versão off-road da 1190, rodas raiadas e suspensão de curso maior)

const KTM1190R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor da 1190 standard: óleo Motorex 10W-50, 3,5L com filtro',
    body: 'A 1190 Adventure R compartilha o bloco V-twin de 1195cc da versão standard — mesma especificação de óleo (Motorex Power Synt 4T 10W-50 ou Motul 7100 10W-50 equivalente), capacidade ~3,5L com filtro. Intervalo: 10.000-15.000 km, reduzindo para 8.000-10.000 km em uso off-road intenso (mais estresse térmico e poeira contaminando o óleo mais rápido).',
  },
  {
    severity: 'OK',
    title: 'Rodas raiadas 21"/18": vantagem para pneus off-road e reparo de emergência',
    body: 'Diferente da 1190 standard (rodas de liga), a versão R usa rodas raiadas com pneu 90/90-21 dianteiro e 150/70ZR18 traseiro — permite usar pneus totalmente off-road (Continental TKC80, Michelin Desert, Mitas E-09) e, em algumas configurações, câmara de ar, o que facilita reparo de furo em trilha remota com kit básico. Leve sempre câmara reserva e kit de remendo em viagens off-road distantes de assistência.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão WP de curso longo (220mm): manutenção mais frequente em uso off-road pesado',
    body: 'A suspensão WP totalmente ajustável da versão R tem curso de 220mm (dianteiro e traseiro), calibrada para trilha pesada. Em uso off-road intenso, o óleo da suspensão deve ser trocado a cada 15.000 km (contra 20.000-25.000 km em uso rodoviário misto) — o curso maior gera mais aquecimento e desgaste do óleo. Vedantes de bengala também merecem inspeção mais frequente (a cada 5.000-8.000 km em trilha pesada) por conta de poeira e impacto de detritos.',
  },
  {
    severity: 'OK',
    title: 'ABS desligável e MTC em modo off-road: use conforme o terreno',
    body: 'A eletrônica Bosch MSC permite desligar o ABS traseiro (ou modo off-road, que reduz intervenção) — essencial para técnicas de frenagem em terra solta/areia onde travamento controlado da roda traseira ajuda a parar mais rápido. Aprenda a configurar o modo antes de encarar trilha técnica, e sempre restabeleça o modo padrão ao voltar ao asfalto para manter a segurança da frenagem ABS completa.',
  },
  {
    severity: 'OK',
    title: 'Proteção de motor e chassi: skid plate reforçado recomendado para uso off-road real',
    body: 'Para quem usa a 1190 R como o projeto propõe (off-road de verdade, não só estética), um skid plate de alumínio reforçado (compatível com a linha, disponível via importadores como Touratech, SW-Motech ou genéricos) protege o cárter e o filtro de óleo de impactos com pedras. Também vale considerar protetores de motor lateral (crash bars) para reduzir dano em quedas de baixa velocidade em trilha.',
  },
  {
    severity: 'OK',
    title: 'Peças compatíveis com 1190 standard facilitam manutenção no Brasil',
    body: 'Como compartilha o motor e boa parte da eletrônica com a 1190 standard, a versão R se beneficia da mesma base de peças compatíveis (filtros, velas, kit relação, pastilhas). A diferença fica nos componentes específicos de suspensão WP de curso longo e rodas raiadas, que exigem peças mais específicas — procure importadores especializados em suspensão off-road (Touratech, Rally Raid) para vedantes e kits de reparo da suspensão.',
  },
]

const KTM1190R_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste de comando de válvulas em uso off-road intenso com óleo fora de especificação',
    body: 'Mesmo risco da versão standard, potencialmente agravado pelo uso off-road mais extremo típico da versão R (mais estresse térmico, mais poeira contaminando o óleo). Respeite rigorosamente o intervalo de troca de óleo — reduza para 8.000-10.000 km se a moto for usada com frequência em trilha pesada.',
  },
  {
    severity: 'WARN',
    title: 'Vedantes de suspensão WP desgastam rápido em uso off-road com poeira/lama',
    body: 'A suspensão de curso longo da versão R é mais exposta a poeira e detritos em uso off-road intenso, acelerando o desgaste dos retentores (vedantes) de bengala e monoamortecedor. Sintoma: óleo escuro escorrendo pela bengala, perda de amortecimento. Limpe os tubos da bengala após cada saída off-road (retire poeira acumulada antes que ela raspe o vedante) e troque vedantes preventivamente a cada 20.000-30.000 km em uso misto intenso.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador e conectores elétricos: mesmo ponto de atenção da geração LC8',
    body: 'Monitore a tensão de carga periodicamente (13,5-14,8V a 4.000-5.000 rpm). Em uso off-road, os conectores elétricos ficam mais expostos a vibração e umidade — aplique graxa dielétrica preventivamente e verifique fixação do chicote a cada revisão, especialmente após quedas em trilha.',
  },
  {
    severity: 'WARN',
    title: 'Danos estruturais por quedas em trilha: verifique geometria da suspensão e chassi',
    body: 'Por seu perfil de uso mais off-road, a 1190 R está mais sujeita a quedas em baixa velocidade em trilha. Após qualquer queda, verifique alinhamento do garfo dianteiro (rodas alinhadas, sem torção), integridade do subchassi e fixações do skid plate/crash bar. Pequenas torções não percebidas visualmente podem causar desgaste irregular de pneu e instabilidade em alta velocidade depois.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão acelerada em uso off-road com lama/água salobra',
    body: 'Uso frequente em trilha com travessia de rios ou lama acelera a corrosão de parafusaria, corrente e componentes elétricos expostos comparado ao uso apenas rodoviário. Lave a moto com água doce após cada saída com exposição a lama/água salobra, seque bem os conectores elétricos expostos e aplique lubrificante anticorrosivo em pontos estruturais.',
  },
]

const KTM1190R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 1190 Adventure R + preparação pré-viagem off-road',
    body: '1.000 km — Troca de óleo de amaciamento. | 8.000-10.000 km (uso off-road intenso) ou 10.000-15.000 km (uso misto) — Troca de óleo Motorex 10W-50 + filtro. Verificar vela iridium. | 15.000 km — Óleo da suspensão WP (uso off-road pesado) ou 20.000-25.000 km (uso misto). Folga de válvulas. Fluido de freio/embreagem DOT 4. | 20.000 km — Kit relação. Verificar tensão do regulador. Inspecionar vedantes de bengala. | 5.000-8.000 km (uso off-road pesado) — Limpeza dos tubos de bengala e inspeção visual de vedantes. | 30.000 km — Retorque geral, inspeção de corrosão, revisão de suspensão completa. PRÉ-VIAGEM OFF-ROAD: revisar corrente e kit relação, testar suspensão e vedantes, levar câmara reserva + kit de remendo (rodas raiadas facilitam reparo), verificar fixação de skid plate e crash bars, mapear oficinas e postos de combustível no trajeto.',
  },
]

// ─── KTM 890 ADVENTURE R ─────────────────────────────────────────────────────────
// Motor: 889cc paralelo-twin LC8c, DOHC 4V, refrigerado a líquido | ~105cv @ 8.000rpm
// Torque: ~100Nm (10,2 kgf.m) @ 6.500rpm | Injeção Bosch EFI | Cárter semisseco com 2 bombas
// Óleo: Motorex 10W-50 sintético (JASO MA2), ~3,0L com filtro | Vela: NGK dupla ignição
// Pneu: 90/90-21 (D) / 150/70-18 (T) — rodas raiadas com câmara | Suspensão WP Xplor 220mm
// Tanque: 20L | Peso seco: ~196kg | Produção: 2021–presente

const KTM890R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motorex 10W-50 JASO MA2 — 3,0L com filtro; intervalo oficial 15.000 km',
    body: 'O motor paralelo-twin LC8c de 889cc usa cárter semisseco com duas bombas de óleo — precisa de sintético de qualidade JASO MA2, como Motorex Power Synt 4T 10W-50 (especificação oficial KTM) ou Motul 7100 10W-50. Capacidade: ~3,0L com filtro. Intervalo oficial: 15.000 km, mas dado o histórico de desgaste de comando de válvulas nesta geração de motor (LC8c 790/890), muitos proprietários e mecânicos experientes recomendam reduzir para 8.000-10.000 km como prevenção.',
  },
  {
    severity: 'WARN',
    title: 'Troque o óleo mais cedo que o recomendado — histórico de desgaste do comando de válvulas',
    body: 'O motor LC8c (compartilhado com 790/890 Duke e Adventure) teve casos documentados de desgaste prematuro do comando de válvulas em unidades de 2019-2021, atribuído a bomba de óleo de baixo volume e passagens de óleo desalinhadas em algumas unidades. A KTM revisou o projeto a partir de 2021 (seguidores de balancim mais largos) e adicionou filtro extra de óleo desde 2020, mas a prevenção mais eficaz continua sendo troca de óleo mais frequente que o intervalo oficial (8.000-10.000 km) e uso exclusivo de óleo sintético de qualidade.',
  },
  {
    severity: 'OK',
    title: 'Vela dupla ignição — verifique especificação exata do ano/versão antes de comprar',
    body: 'O LC8c usa sistema de dupla ignição por cilindro em algumas configurações. Antes de comprar velas de reposição, confirme a especificação exata (código NGK) para o ano específico da sua unidade — pequenas variações existem entre anos de produção. Compre pelo menos um jogo reserva, já que a disponibilidade em lojas comuns de peças no Brasil ainda é limitada para códigos específicos KTM recentes.',
  },
  {
    severity: 'OK',
    title: 'Rodas raiadas 21"/18" com câmara: pneus off-road de verdade (TKC80, Karoo, Mitas)',
    body: 'A 890 Adventure R tem foco off-road forte — rodas raiadas com pneus 90/90-21 (D) e 150/70-18 (T) permitem usar borrachas totalmente off-road: Continental TKC80, Metzeler Karoo 4, Mitas E-09/E-10 ou Michelin Anakee Wild. Para quem usa a moto majoritariamente em trilha, esses pneus valem o desgaste mais rápido no asfalto. Leve sempre câmara reserva e kit de remendo em viagens distantes de assistência técnica.',
  },
  {
    severity: 'OK',
    title: 'Suspensão WP Xplor de 220mm: reduza pressão de pneu para trilha e recalibre no asfalto',
    body: 'A suspensão WP Xplor totalmente ajustável (220mm de curso) é calibrada de fábrica para uso misto — em trilha técnica/areia, reduza a pressão dos pneus (para 15-18 PSI aproximadamente) para melhorar tração e conforto sobre irregularidades, mas SEMPRE recalibre para pressão rodoviária normal antes de retornar ao asfalto, já que pressão baixa em alta velocidade na estrada é perigosa e desgasta o pneu de forma irregular.',
  },
  {
    severity: 'OK',
    title: 'Skid plate e crash bars: essenciais para uso off-road real, não apenas estético',
    body: 'Para quem usa a 890 Adventure R como o projeto propõe — trilha de verdade — um skid plate de alumínio robusto (não o plástico de série, insuficiente para impactos fortes) e crash bars laterais são praticamente obrigatórios. Marcas como SW-Motech, Touratech e AltRider produzem kits específicos para o modelo, disponíveis via importação. Protege cárter, bomba de óleo e radiador de impactos com pedras/troncos.',
  },
]

const KTM890R_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Desgaste prematuro do comando de válvulas (camshaft) — problema conhecido do motor LC8c',
    body: 'É o problema mais documentado e discutido da geração LC8c (790/890 Duke e Adventure, incluindo Husqvarna Norden 901 de motor similar): desgaste anormal do comando de válvulas e seguidores, atribuído pela comunidade a metalurgia do came, bomba de óleo de baixo volume e passagens de óleo desalinhadas. A KTM reconheceu o problema e implementou política de "goodwill" (reparo gratuito fora de garantia, caso a caso) para unidades de 2021 e anteriores, além de melhorias de projeto (balancins mais largos a partir de 2021, filtro extra de óleo desde 2020). Sintoma de alerta: ruído metálico crescente no topo do motor. Se sua unidade é de 2021 ou anterior, procure uma concessionária KTM para inspeção preventiva — o número de casos reportados é pequeno proporcionalmente ao total de motos vendidas, mas o reparo é caro se não coberto.',
  },
  {
    severity: 'WARN',
    title: 'Falhas ocasionais de troca de marcha em 5ª/6ª — reportado por proprietários',
    body: 'Alguns proprietários relatam dificuldade ocasional para engatar 5ª ou 6ª marcha, especialmente em motos com poucos km ainda em amaciamento ou com óleo de câmbio/motor fora de especificação. Use sempre o óleo correto (JASO MA2) e evite trocas de marcha muito rápidas/agressivas nos primeiros 1.000 km. Se o problema persistir após o amaciamento correto, procure a concessionária — pode ser ajuste de garfo de câmbio sob garantia.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador e sistema elétrico: ponto de atenção mesmo em motor mais moderno',
    body: 'Apesar da eletrônica mais moderna que gerações anteriores da Adventure, o sistema de carga ainda merece monitoramento — verifique tensão da bateria periodicamente (13,5-14,8V com motor em rotação média). Uso off-road intenso expõe conectores a vibração e umidade; aplique graxa dielétrica preventivamente a cada 6 meses.',
  },
  {
    severity: 'WARN',
    title: 'Danos por queda em trilha: verifique alinhamento e fixações após cada tombamento',
    body: 'Como moto de perfil off-road forte, a 890 R está sujeita a quedas em baixa velocidade durante uso em trilha técnica. Após qualquer queda, verifique alinhamento do garfo dianteiro, integridade das fixações de skid plate/crash bars e funcionamento correto da suspensão. Pequenas torções não percebidas visualmente podem gerar desgaste irregular de pneu depois.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em uso off-road com travessia de água/lama frequente',
    body: 'Como as demais Adventure, uso intenso em trilha com travessia de rios ou lama acelera corrosão de parafusaria, corrente e conectores elétricos expostos. Lave com água doce após cada saída com exposição a lama/água salobra e verifique conectores elétricos periodicamente.',
  },
]

const KTM890R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 890 Adventure R + preparação pré-viagem off-road',
    body: '1.000 km — Revisão de amaichamento (verificar torques, funcionamento geral). | 8.000-10.000 km (recomendado, mais conservador que o oficial de 15.000 km) — Troca de óleo Motorex 10W-50 JASO MA2 (3,0L) + filtro — prevenção contra desgaste de comando de válvulas. Verificar velas. | 15.000 km — Óleo da suspensão WP Xplor (uso off-road intenso: antecipar para 10.000-12.000 km). Fluido de freio/embreagem DOT 4. | 20.000-25.000 km — Kit relação. Folga de válvulas conforme manual (motor DOHC LC8c). Verificar tensão do regulador. | Anual — Inspeção do comando de válvulas em concessionária KTM se a moto for 2021 ou anterior (verificar elegibilidade ao programa de goodwill da KTM para desgaste de came). PRÉ-VIAGEM OFF-ROAD: revisar corrente/kit relação, testar suspensão, levar câmara reserva (rodas raiadas com câmara facilitam reparo), verificar fixação de skid plate/crash bars, checar bateria e sistema de carga.',
  },
]

// ─── KTM 1290 SUPER ADVENTURE (S / R / T) ────────────────────────────────────────
// Motor: 1301cc V-twin LC8 75°, DOHC 4V, refrigerado a líquido | ~160cv @ 9.500rpm
// Torque: ~140Nm @ 6.500rpm (108Nm já a partir de 2.500rpm) | Injeção Keihin EFI 52mm
// Óleo: Motorex 10W-50 sintético JASO MA2, ~3,5L com filtro | Vela: NGK LKAR9BI-10 (dupla ignição)
// Versão S: rodas de liga 19"/17", suspensão WP semi-ativa, foco touring/rodoviário
// Versão R: rodas raiadas 21"/18", suspensão WP mais curso, foco off-road
// Pneu S: 120/70-19 (D) / 170/60-17 (T) | Pneu R: 90/90-21 (D) / 150/70-18 (T)
// Tanque: 23L (S) / 30L (T) | Produção: 2015–presente

const KTM1290SA_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motorex 10W-50 JASO MA2 — ~3,5L com filtro; intervalo oficial ~15.000 km',
    body: 'O V-twin de 1301cc de alta performance (160cv) exige óleo sintético de qualidade — Motorex Power Synt 4T 10W-50 (especificação oficial KTM) ou Motul 7100 10W-50 equivalente. Capacidade aproximada: 3,5L com filtro (confirme no manual, pode variar ligeiramente por versão). Intervalo oficial: cerca de 15.000 km; reduza para 10.000 km em uso esportivo/off-road intenso ou clima muito quente.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK LKAR9BI-10 (dupla ignição) — dure mais, mas encomende com antecedência',
    body: 'A linha 1290 usa velas iridium de dupla ignição (uma referência comum é NGK LKAR9BI-10). Vida útil de 20.000-25.000 km. Como é peça de fornecedor específico e a rede KTM no Brasil ainda é limitada fora de capitais, encomende com antecedência via concessionária ou importador — evite ficar sem reposição em caso de necessidade de troca em viagem.',
  },
  {
    severity: 'WARN',
    title: 'Versão S: suspensão semi-ativa WP exige atualização de firmware e cuidado com sensores',
    body: 'A versão S tem suspensão eletronicamente ajustável (semi-ativa), que depende de sensores e atuadores eletrônicos funcionando corretamente. Mantenha o software da moto atualizado nas revisões de concessionária KTM — atualizações de firmware frequentemente corrigem comportamento da suspensão. Se notar suspensão "dura" ou "mole" demais sem motivo aparente, verifique códigos de erro no painel antes de mexer manualmente em ajustes.',
  },
  {
    severity: 'OK',
    title: 'Versão R: rodas raiadas 21"/18" — pneus off-road robustos (TKC80, Karoo)',
    body: 'A versão R, com foco off-road, usa rodas raiadas com pneu 90/90-21 dianteiro e 150/70-18 traseiro — compatível com pneus totalmente off-road como Continental TKC80 ou Metzeler Karoo 4. Para quem usa a 1290 R fora do asfalto com regularidade, vale o desgaste mais rápido no asfalto em troca de tração muito superior em terra/lama.',
  },
  {
    severity: 'OK',
    title: 'Embreagem PASC hidráulica: mantenha fluido DOT 4 e sangre se sentir ponto esponjoso',
    body: 'Toda a linha 1290 usa embreagem antirreflexo (slipper) hidráulica PASC. Verifique nível de fluido DOT 4 regularmente e sangre o sistema caso o ponto de acionamento fique "esponjoso". Com 160cv e uso urbano intenso (embreagem parcial em trânsito), os discos desgastam — evite arrastar a embreagem desnecessariamente para prolongar a vida útil.',
  },
  {
    severity: 'OK',
    title: 'Peso elevado (230kg+) exige atenção redobrada em pneus e freios',
    body: 'A linha 1290 Super Adventure é pesada (mais de 230kg abastecida). Isso exige pneus sempre em boas condições (sulco adequado, pressão correta) e pastilhas de freio de qualidade — EBC HH ou Brembo originais/compatíveis são recomendadas por oferecerem melhor resposta com o peso elevado da moto, especialmente na versão T (touring, tanque de 30L, ainda mais pesada carregada).',
  },
]

const KTM1290SA_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste de comando de válvulas — mesma família de motor V-twin de alta performance',
    body: 'Embora o problema mais documentado de desgaste de came seja do motor LC8c (790/890, paralelo-twin), o V-twin LC8 de 1301cc de alta potência também é sensível a intervalos de óleo estendidos ou uso de óleo fora de especificação. Respeite rigorosamente o intervalo de troca e use apenas sintético de qualidade JASO MA2 — motores de alta performance não perdoam negligência na lubrificação.',
  },
  {
    severity: 'WARN',
    title: 'Sensores de suspensão semi-ativa (versão S) podem apresentar falhas eletrônicas',
    body: 'A suspensão semi-ativa da versão S depende de sensores de curso e atuadores eletrônicos — componentes que podem falhar ou dar erro intermitente, especialmente em unidades mais antigas ou com umidade nos conectores. Sintoma: código de erro no painel relacionado à suspensão, comportamento inconsistente do amortecimento. Verifique conectores dos sensores de suspensão a cada revisão e mantenha o software atualizado.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento em cilindro mestre de embreagem hidráulica PASC',
    body: 'Mesmo padrão de outras gerações KTM Adventure: os vedantes internos do cilindro mestre de embreagem podem vazar com o tempo. Verifique nível de fluido DOT 4 e firmeza do acionamento regularmente — reparo com kit de vedantes é relativamente barato se feito no início do problema.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador e sistema elétrico: monitore mesmo em modelos recentes',
    body: 'Apesar da eletrônica mais avançada, monitore a tensão de carga periodicamente (13,5-14,8V com motor em rotação média) como parte da rotina preventiva — histórico da marca mostra que o sistema de carga é ponto de atenção recorrente em toda a linha Adventure, independente da geração.',
  },
  {
    severity: 'WARN',
    title: 'Versão R: danos por queda em trilha — verifique alinhamento após tombamentos',
    body: 'A versão R, usada com mais frequência em off-road, está sujeita a quedas em baixa velocidade durante uso em trilha técnica — a moto é pesada e uma queda pode gerar mais dano que em modelos mais leves. Após qualquer queda, verifique alinhamento do garfo dianteiro, integridade das fixações de proteção (skid plate/crash bars) e funcionamento da suspensão antes de continuar a viagem.',
  },
]

const KTM1290SA_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 1290 Super Adventure (S/R/T) + preparação pré-viagem longa',
    body: '1.000 km — Revisão de amaciamento. | 10.000-15.000 km — Troca de óleo Motorex 10W-50 JASO MA2 (~3,5L) + filtro. Verificar vela NGK LKAR9BI-10. Fluido de freio/embreagem DOT 4. | 15.000-20.000 km — Folga de válvulas conforme manual. Kit relação se desgastado. Atualização de firmware da suspensão (versão S) em concessionária. | 20.000-25.000 km — Trocar velas. Verificar tensão do regulador. Inspecionar conectores dos sensores de suspensão (versão S). | 30.000 km — Retorque de parafusos críticos do motor. Revisão de vedantes de bengala (mais frequente na versão R com uso off-road). PRÉ-VIAGEM LONGA: checar bateria e regulador, revisar corrente/kit relação, testar eletrônica de suspensão/ABS/MTC, levar câmara reserva (versão R com rodas raiadas facilita reparo), mapear oficinas e concessionárias KTM no trajeto — rede ainda concentrada em capitais no Brasil.',
  },
]

// ─── BLOCOS ────────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'ADVENTURE 640 ST',
    yearFrom: 1997,
    yearTo: 2007,
    MACETES: KTM640_MACETES,
    PROBLEMAS: KTM640_PROBLEMAS,
    MANUTENCAO: KTM640_MANUTENCAO,
  },
  {
    modelName: 'ADVENTURE 950cc',
    yearFrom: 2003,
    yearTo: 2006,
    MACETES: KTM950_MACETES,
    PROBLEMAS: KTM950_PROBLEMAS,
    MANUTENCAO: KTM950_MANUTENCAO,
  },
  {
    modelName: 'ADVENTURE 990cc',
    yearFrom: 2006,
    yearTo: 2013,
    MACETES: KTM990_MACETES,
    PROBLEMAS: KTM990_PROBLEMAS,
    MANUTENCAO: KTM990_MANUTENCAO,
  },
  {
    modelName: 'ADVENTURE R / DAKAR 990cc',
    yearFrom: 2009,
    yearTo: 2013,
    MACETES: KTM990_MACETES,
    PROBLEMAS: KTM990_PROBLEMAS,
    MANUTENCAO: KTM990_MANUTENCAO,
  },
  {
    modelName: 'ADVENTURE 1190cc',
    yearFrom: 2013,
    yearTo: 2016,
    MACETES: KTM1190_MACETES,
    PROBLEMAS: KTM1190_PROBLEMAS,
    MANUTENCAO: KTM1190_MANUTENCAO,
  },
  {
    modelName: 'ADVENTURE 1190 R',
    yearFrom: 2013,
    yearTo: 2016,
    MACETES: KTM1190R_MACETES,
    PROBLEMAS: KTM1190R_PROBLEMAS,
    MANUTENCAO: KTM1190R_MANUTENCAO,
  },
  {
    modelName: 'ADVENTURE 890 R',
    yearFrom: 2021,
    yearTo: null,
    MACETES: KTM890R_MACETES,
    PROBLEMAS: KTM890R_PROBLEMAS,
    MANUTENCAO: KTM890R_MANUTENCAO,
  },
  {
    modelName: 'SUPER ADVENTURE 1290',
    yearFrom: 2015,
    yearTo: null,
    MACETES: KTM1290SA_MACETES,
    PROBLEMAS: KTM1290SA_PROBLEMAS,
    MANUTENCAO: KTM1290SA_MANUTENCAO,
  },
  {
    modelName: 'SUPER ADVENTURE 1290 R',
    yearFrom: 2015,
    yearTo: null,
    MACETES: KTM1290SA_MACETES,
    PROBLEMAS: KTM1290SA_PROBLEMAS,
    MANUTENCAO: KTM1290SA_MANUTENCAO,
  },
  {
    modelName: 'SUPER ADVENTURE 1290 S',
    yearFrom: 2015,
    yearTo: null,
    MACETES: KTM1290SA_MACETES,
    PROBLEMAS: KTM1290SA_PROBLEMAS,
    MANUTENCAO: KTM1290SA_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'ADVENTURE 640 ST',
    yearFrom: 1997, yearTo: 2007,
    tireSize: '90/90-21 (F) · 140/80-17 (R)',
    frontPsi: 26, rearPsi: 29,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 29 PSI. Com carona/bagagem: F 28 / R 33 PSI. Em trilha/off-road técnico, reduza para 18-22 PSI (F/R) e recalibre para pressão normal ao voltar ao asfalto. Pneus recomendados: Pirelli MT60, Metzeler Karoo ou Michelin Anakee Wild para uso misto.',
  },
  {
    modelName: 'ADVENTURE 950cc',
    yearFrom: 2003, yearTo: 2006,
    tireSize: '90/90-21 (F) · 150/70-18 (R)',
    frontPsi: 29, rearPsi: 36,
    frontPsiLoad: 29, rearPsiLoad: 40,
    notes: 'Solo: F 29 / R 36 PSI (2,0/2,5 bar). Com carona/bagagem: F 29 / R 40 PSI. Em off-road/trilha, reduza para 18-22 PSI e recalibre depois. Pneus mistos recomendados: Pirelli Scorpion Trail, Michelin Anakee, ou Continental TKC80/Metzeler Karoo para uso off-road mais intenso.',
  },
  {
    modelName: 'ADVENTURE 990cc',
    yearFrom: 2006, yearTo: 2013,
    tireSize: '90/90-21 (F) · 150/70-18 (R)',
    frontPsi: 35, rearPsi: 38,
    frontPsiLoad: 35, rearPsiLoad: 41,
    notes: 'Solo: F 35 / R 38 PSI (2,4/2,6 bar). Com carona/bagagem: F 35 / R 41 PSI. Off-road: reduza para 18-22 PSI, sempre recalibrando antes do asfalto. Recomendado: Pirelli Scorpion Trail II ou Michelin Anakee III para uso rodoviário predominante.',
  },
  {
    modelName: 'ADVENTURE R / DAKAR 990cc',
    yearFrom: 2009, yearTo: 2013,
    tireSize: '90/90-21 (F) · 150/70-18 (R)',
    frontPsi: 35, rearPsi: 38,
    frontPsiLoad: 35, rearPsiLoad: 41,
    notes: 'Solo: F 35 / R 38 PSI. Com carona/bagagem: F 35 / R 41 PSI. Versão R/Dakar com foco off-road: em trilha, reduza para 15-18 PSI para mais tração/conforto, sempre recalibrando antes do asfalto. Recomendado para trilha: Continental TKC80 ou Metzeler Karoo 3.',
  },
  {
    modelName: 'ADVENTURE 1190cc',
    yearFrom: 2013, yearTo: 2016,
    tireSize: '120/70 ZR19 (F) · 170/60 ZR17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo e com carona: F 36 / R 42 PSI (2,5/2,9 bar) — rodas de liga, foco rodoviário. Verifique pressão a frio semanalmente. Pneus recomendados: Michelin Anakee III, Pirelli Scorpion Trail II ou Continental TrailAttack — uso predominante em asfalto/estrada batida.',
  },
  {
    modelName: 'ADVENTURE 1190 R',
    yearFrom: 2013, yearTo: 2016,
    tireSize: '90/90-21 (F) · 150/70 ZR18 (R)',
    frontPsi: 35, rearPsi: 38,
    frontPsiLoad: 35, rearPsiLoad: 41,
    notes: 'Solo: F 35 / R 38 PSI. Com carona/bagagem: F 35 / R 41 PSI. Versão off-road com rodas raiadas: em trilha, reduza para 15-18 PSI, recalibrando antes de retomar o asfalto. Recomendado: Continental TKC80, Metzeler Karoo 3 ou Mitas E-09/E-10.',
  },
  {
    modelName: 'ADVENTURE 890 R',
    yearFrom: 2021, yearTo: null,
    tireSize: '90/90-21 (F) · 150/70-18 (R)',
    frontPsi: 35, rearPsi: 35,
    frontPsiLoad: 38, rearPsiLoad: 42,
    notes: 'Solo (F/R): 35/35 PSI (2,4/2,4 bar). Com bagagem/carona completa: F 38 / R 42 PSI. Off-road/trilha: reduza para 26 PSI (F/R) conforme manual KTM, ou 18-22 PSI em terreno técnico/areia — sempre recalibrando antes de retomar o asfalto. Pneus recomendados: Continental TKC80, Metzeler Karoo 4 ou Mitas E-09/E-10.',
  },
  {
    modelName: 'SUPER ADVENTURE 1290',
    yearFrom: 2015, yearTo: null,
    tireSize: '120/70-19 (F) · 170/60-17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 38, rearPsiLoad: 42,
    notes: 'Solo: F 36 / R 42 PSI (2,5/2,9 bar). Com carona/bagagem (versão T/S): F 38 / R 42 PSI. Nota: alguns anos/mercados recomendam até 38 PSI dianteiro para versões R — confirme na etiqueta interna do garfo/manual da unidade. Pneus recomendados: Michelin Anakee III, Pirelli Scorpion Trail II ou Continental Trail Attack.',
  },
  {
    modelName: 'SUPER ADVENTURE 1290 R',
    yearFrom: 2015, yearTo: null,
    tireSize: '90/90-21 (F) · 150/70-18 (R)',
    frontPsi: 36, rearPsi: 40,
    frontPsiLoad: 38, rearPsiLoad: 42,
    notes: 'Solo: F 36 / R 40 PSI. Com carona/bagagem: F 38 / R 42 PSI. Versão R com rodas raiadas: off-road, reduza para 18-22 PSI, recalibrando antes do asfalto. Recomendado: Continental TKC80 ou Metzeler Karoo 4 para trilha.',
  },
  {
    modelName: 'SUPER ADVENTURE 1290 S',
    yearFrom: 2015, yearTo: null,
    tireSize: '120/70-19 (F) · 170/60-17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 38, rearPsiLoad: 42,
    notes: 'Solo: F 36 / R 42 PSI (2,5/2,9 bar). Com carona/bagagem: F 38 / R 42 PSI. Versão S touring com suspensão semi-ativa: mantenha pressão sempre correta para o funcionamento adequado do sistema eletrônico. Pneus recomendados: Michelin Anakee III ou Pirelli Scorpion Trail II.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // ADVENTURE 640 ST
  { modelName: 'ADVENTURE 640 ST', yearFrom: 1997, yearTo: 2007, component: 'Óleo Motorex 10W-50 sintético (~2,0L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor seco compartilha óleo com câmbio. Reduzir para 1.500-2.000 km em uso off-road pesado.', priority: 'CRITICAL', order: 1 },
  { modelName: 'ADVENTURE 640 ST', yearFrom: 1997, yearTo: 2007, component: 'Vela NGK DCPR8E (gap 0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Verificar a cada 5.000 km. Alta compressão exige vela em bom estado.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ADVENTURE 640 ST', yearFrom: 1997, yearTo: 2007, component: 'Corrente 520 e kit relação', intervalKm: 15000, intervalMonths: null, notes: 'Lubrificar a cada 500 km. DID 520VX3 ou RK 520XSO recomendados para off-road.', priority: 'HIGH', order: 3 },
  { modelName: 'ADVENTURE 640 ST', yearFrom: 1997, yearTo: 2007, component: 'Filtro de ar (espuma dupla)', intervalKm: 3000, intervalMonths: 12, notes: 'Limpar mais frequente em uso off-road/poeira. Usar óleo específico para filtro de espuma.', priority: 'HIGH', order: 4 },
  { modelName: 'ADVENTURE 640 ST', yearFrom: 1997, yearTo: 2007, component: 'Folga de válvulas (adm 0,10mm / esc 0,15mm)', intervalKm: 5000, intervalMonths: 12, notes: 'Motor frio. Monocilíndrico de alta compressão.', priority: 'HIGH', order: 5 },
  { modelName: 'ADVENTURE 640 ST', yearFrom: 1997, yearTo: 2007, component: 'Fluido de freio/embreagem DOT 4', intervalKm: 10000, intervalMonths: 24, notes: 'Verificar nível e firmeza a cada revisão.', priority: 'MEDIUM', order: 6 },
  { modelName: 'ADVENTURE 640 ST', yearFrom: 1997, yearTo: 2007, component: 'Verificação do regulador/retificador', intervalKm: null, intervalMonths: 12, notes: 'Multímetro na bateria a 4.000 rpm: 13,5-14,8V. Upgrade MOSFET recomendado.', priority: 'HIGH', order: 7 },
  { modelName: 'ADVENTURE 640 ST', yearFrom: 1997, yearTo: 2007, component: 'Inspeção geral de corrosão e aperto (viagem/off-road)', intervalKm: 1000, intervalMonths: null, notes: 'Vibração do monocilíndrico solta parafusos. Corrosão em conectores/parafusaria.', priority: 'MEDIUM', order: 8 },

  // ADVENTURE 950cc
  { modelName: 'ADVENTURE 950cc', yearFrom: 2003, yearTo: 2006, component: 'Óleo Motorex 10W-50 sintético (3,0L com filtro)', intervalKm: 7500, intervalMonths: 12, notes: 'Reduzir para 5.000 km em uso off-road/calor intenso.', priority: 'CRITICAL', order: 1 },
  { modelName: 'ADVENTURE 950cc', yearFrom: 2003, yearTo: 2006, component: 'Velas NGK CR8EK ×2 (gap 0,7mm)', intervalKm: 10000, intervalMonths: null, notes: 'Sempre em par. Iridium CR8EIX dura ~20.000 km.', priority: 'HIGH', order: 2 },
  { modelName: 'ADVENTURE 950cc', yearFrom: 2003, yearTo: 2006, component: 'Corrente 525 e kit relação', intervalKm: 20000, intervalMonths: null, notes: 'Lubrificar a cada 500-700 km. DID 525VX3 ou RK 525XSO.', priority: 'HIGH', order: 3 },
  { modelName: 'ADVENTURE 950cc', yearFrom: 2003, yearTo: 2006, component: 'Folga de válvulas (adm 0,10mm / esc 0,15mm)', intervalKm: 15000, intervalMonths: 12, notes: 'DOHC 8 válvulas. Motor frio.', priority: 'HIGH', order: 4 },
  { modelName: 'ADVENTURE 950cc', yearFrom: 2003, yearTo: 2006, component: 'Fluido de freio/embreagem DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Verificar vazamento no cilindro mestre da embreagem (problema documentado).', priority: 'HIGH', order: 5 },
  { modelName: 'ADVENTURE 950cc', yearFrom: 2003, yearTo: 2006, component: 'Verificação/substituição do regulador-retificador', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha #1. 14-15V @ 5.000 rpm. Substituir por MOSFET após 40-50 mil km.', priority: 'CRITICAL', order: 6 },
  { modelName: 'ADVENTURE 950cc', yearFrom: 2003, yearTo: 2006, component: 'Inspeção do tubo de ligação dos escapamentos (corrosão)', intervalKm: null, intervalMonths: 12, notes: 'Área propensa a acúmulo de sujeira/corrosão.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ADVENTURE 950cc', yearFrom: 2003, yearTo: 2006, component: 'Filtro de óleo', intervalKm: 7500, intervalMonths: 12, notes: 'Trocar junto com o óleo.', priority: 'MEDIUM', order: 8 },
  { modelName: 'ADVENTURE 950cc', yearFrom: 2003, yearTo: 2006, component: 'Bateria — verificação de carga', intervalKm: null, intervalMonths: 6, notes: 'Mínimo 12,4V em repouso.', priority: 'MEDIUM', order: 9 },

  // ADVENTURE 990cc
  { modelName: 'ADVENTURE 990cc', yearFrom: 2006, yearTo: 2013, component: 'Óleo Motorex 10W-50 sintético (3,0L com filtro)', intervalKm: 7500, intervalMonths: 12, notes: 'Reduzir para 5.000 km em uso off-road/calor intenso.', priority: 'CRITICAL', order: 1 },
  { modelName: 'ADVENTURE 990cc', yearFrom: 2006, yearTo: 2013, component: 'Velas NGK CR8EK/CR8EIX ×2 (gap 0,7mm)', intervalKm: 10000, intervalMonths: null, notes: 'Sempre em par.', priority: 'HIGH', order: 2 },
  { modelName: 'ADVENTURE 990cc', yearFrom: 2006, yearTo: 2013, component: 'Corrente 525 e kit relação', intervalKm: 20000, intervalMonths: null, notes: 'Lubrificar a cada 500-700 km.', priority: 'HIGH', order: 3 },
  { modelName: 'ADVENTURE 990cc', yearFrom: 2006, yearTo: 2013, component: 'Folga de válvulas (adm 0,10mm / esc 0,15mm)', intervalKm: 15000, intervalMonths: 12, notes: 'DOHC 8 válvulas. Motor frio.', priority: 'HIGH', order: 4 },
  { modelName: 'ADVENTURE 990cc', yearFrom: 2006, yearTo: 2013, component: 'Fluido de freio/embreagem DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Verificar vazamento no cilindro mestre.', priority: 'HIGH', order: 5 },
  { modelName: 'ADVENTURE 990cc', yearFrom: 2006, yearTo: 2013, component: 'Verificação/substituição do regulador-retificador', intervalKm: null, intervalMonths: 12, notes: '13,5-15V @ 5.000 rpm. Substituir por MOSFET após 40-50 mil km.', priority: 'CRITICAL', order: 6 },
  { modelName: 'ADVENTURE 990cc', yearFrom: 2006, yearTo: 2013, component: 'Retorque dos parafusos do cabeçote', intervalKm: 25000, intervalMonths: null, notes: 'Previne vazamento de junta em alta km.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ADVENTURE 990cc', yearFrom: 2006, yearTo: 2013, component: 'Filtro de óleo', intervalKm: 7500, intervalMonths: 12, notes: 'Trocar junto com óleo.', priority: 'MEDIUM', order: 8 },
  { modelName: 'ADVENTURE 990cc', yearFrom: 2006, yearTo: 2013, component: 'Bateria — verificação de carga', intervalKm: null, intervalMonths: 6, notes: 'Mínimo 12,4V em repouso.', priority: 'MEDIUM', order: 9 },

  // ADVENTURE R / DAKAR 990cc
  { modelName: 'ADVENTURE R / DAKAR 990cc', yearFrom: 2009, yearTo: 2013, component: 'Óleo Motorex 10W-50 sintético (3,0L com filtro)', intervalKm: 7500, intervalMonths: 12, notes: 'Reduzir para 5.000 km em uso off-road intenso.', priority: 'CRITICAL', order: 1 },
  { modelName: 'ADVENTURE R / DAKAR 990cc', yearFrom: 2009, yearTo: 2013, component: 'Velas NGK CR8EK/CR8EIX ×2 (gap 0,7mm)', intervalKm: 10000, intervalMonths: null, notes: 'Sempre em par.', priority: 'HIGH', order: 2 },
  { modelName: 'ADVENTURE R / DAKAR 990cc', yearFrom: 2009, yearTo: 2013, component: 'Óleo da suspensão WP (curso 210mm)', intervalKm: 15000, intervalMonths: null, notes: 'Uso off-road intenso: antecipar para 15.000 km (vs 20-25 mil km rodoviário).', priority: 'HIGH', order: 3 },
  { modelName: 'ADVENTURE R / DAKAR 990cc', yearFrom: 2009, yearTo: 2013, component: 'Corrente 525 e kit relação', intervalKm: 20000, intervalMonths: null, notes: 'Lubrificar a cada 500-700 km, mais em trilha/lama.', priority: 'HIGH', order: 4 },
  { modelName: 'ADVENTURE R / DAKAR 990cc', yearFrom: 2009, yearTo: 2013, component: 'Folga de válvulas (adm 0,10mm / esc 0,15mm)', intervalKm: 15000, intervalMonths: 12, notes: 'DOHC 8 válvulas. Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'ADVENTURE R / DAKAR 990cc', yearFrom: 2009, yearTo: 2013, component: 'Fluido de freio/embreagem DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Verificar vazamento no cilindro mestre.', priority: 'HIGH', order: 6 },
  { modelName: 'ADVENTURE R / DAKAR 990cc', yearFrom: 2009, yearTo: 2013, component: 'Verificação/substituição do regulador-retificador', intervalKm: null, intervalMonths: 12, notes: '13,5-15V @ 5.000 rpm. Substituir por MOSFET após 40-50 mil km.', priority: 'CRITICAL', order: 7 },
  { modelName: 'ADVENTURE R / DAKAR 990cc', yearFrom: 2009, yearTo: 2013, component: 'Vedantes de bengala (uso off-road)', intervalKm: 15000, intervalMonths: null, notes: 'Desgastam mais rápido que a versão standard.', priority: 'MEDIUM', order: 8 },
  { modelName: 'ADVENTURE R / DAKAR 990cc', yearFrom: 2009, yearTo: 2013, component: 'Filtro de óleo', intervalKm: 7500, intervalMonths: 12, notes: 'Trocar junto com óleo.', priority: 'MEDIUM', order: 9 },

  // ADVENTURE 1190cc
  { modelName: 'ADVENTURE 1190cc', yearFrom: 2013, yearTo: 2016, component: 'Óleo Motorex 10W-50 sintético (~3,5L com filtro)', intervalKm: 12500, intervalMonths: 12, notes: 'Confirmar capacidade exata no manual. Reduzir se uso esportivo/off-road intenso.', priority: 'CRITICAL', order: 1 },
  { modelName: 'ADVENTURE 1190cc', yearFrom: 2013, yearTo: 2016, component: 'Vela iridium NGK LKAR9BI-10 (dupla ignição)', intervalKm: 22000, intervalMonths: null, notes: 'Confirmar código exato para o ano/versão específica.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ADVENTURE 1190cc', yearFrom: 2013, yearTo: 2016, component: 'Fluido de freio/embreagem DOT 4 (PASC)', intervalKm: 15000, intervalMonths: 24, notes: 'Sangrar se ponto ficar esponjoso.', priority: 'HIGH', order: 3 },
  { modelName: 'ADVENTURE 1190cc', yearFrom: 2013, yearTo: 2016, component: 'Folga de válvulas', intervalKm: 17500, intervalMonths: 12, notes: 'Verificar especificação exata no manual — motor de alta performance sensível a folgas incorretas.', priority: 'HIGH', order: 4 },
  { modelName: 'ADVENTURE 1190cc', yearFrom: 2013, yearTo: 2016, component: 'Verificação da tensão do regulador', intervalKm: null, intervalMonths: 12, notes: '13,5-14,8V @ 4.000-5.000 rpm.', priority: 'HIGH', order: 5 },
  { modelName: 'ADVENTURE 1190cc', yearFrom: 2013, yearTo: 2016, component: 'Inspeção de conectores elétricos (graxa dielétrica)', intervalKm: null, intervalMonths: 6, notes: 'Previne falhas intermitentes de ABS/MTC.', priority: 'MEDIUM', order: 6 },
  { modelName: 'ADVENTURE 1190cc', yearFrom: 2013, yearTo: 2016, component: 'Kit relação', intervalKm: 22000, intervalMonths: null, notes: 'Verificar desgaste a cada revisão.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ADVENTURE 1190cc', yearFrom: 2013, yearTo: 2016, component: 'Bateria — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'Mínimo 12,4V em repouso. Essencial para eletrônica Bosch MSC.', priority: 'HIGH', order: 8 },
  { modelName: 'ADVENTURE 1190cc', yearFrom: 2013, yearTo: 2016, component: 'Pastilhas de freio', intervalKm: 15000, intervalMonths: null, notes: 'EBC HH ou Brembo compatível — peso elevado exige boa resposta.', priority: 'MEDIUM', order: 9 },

  // ADVENTURE 1190 R
  { modelName: 'ADVENTURE 1190 R', yearFrom: 2013, yearTo: 2016, component: 'Óleo Motorex 10W-50 sintético (~3,5L com filtro)', intervalKm: 10000, intervalMonths: 12, notes: 'Reduzir de 12-15 mil km padrão para 8-10 mil km em uso off-road intenso.', priority: 'CRITICAL', order: 1 },
  { modelName: 'ADVENTURE 1190 R', yearFrom: 2013, yearTo: 2016, component: 'Óleo da suspensão WP (curso 220mm)', intervalKm: 15000, intervalMonths: null, notes: 'Uso off-road pesado: antecipar para 15.000 km (vs 20-25 mil km misto).', priority: 'HIGH', order: 2 },
  { modelName: 'ADVENTURE 1190 R', yearFrom: 2013, yearTo: 2016, component: 'Vela iridium NGK LKAR9BI-10 (dupla ignição)', intervalKm: 20000, intervalMonths: null, notes: 'Confirmar código exato para o ano/versão.', priority: 'MEDIUM', order: 3 },
  { modelName: 'ADVENTURE 1190 R', yearFrom: 2013, yearTo: 2016, component: 'Limpeza e inspeção dos tubos de bengala', intervalKm: 6000, intervalMonths: null, notes: 'Remover poeira acumulada após cada saída off-road; previne dano ao vedante.', priority: 'HIGH', order: 4 },
  { modelName: 'ADVENTURE 1190 R', yearFrom: 2013, yearTo: 2016, component: 'Fluido de freio/embreagem DOT 4 (PASC)', intervalKm: 15000, intervalMonths: 24, notes: 'Sangrar se ponto ficar esponjoso.', priority: 'HIGH', order: 5 },
  { modelName: 'ADVENTURE 1190 R', yearFrom: 2013, yearTo: 2016, component: 'Folga de válvulas', intervalKm: 17500, intervalMonths: 12, notes: 'Verificar especificação exata no manual.', priority: 'HIGH', order: 6 },
  { modelName: 'ADVENTURE 1190 R', yearFrom: 2013, yearTo: 2016, component: 'Verificação da tensão do regulador', intervalKm: null, intervalMonths: 12, notes: '13,5-14,8V @ 4.000-5.000 rpm.', priority: 'HIGH', order: 7 },
  { modelName: 'ADVENTURE 1190 R', yearFrom: 2013, yearTo: 2016, component: 'Kit relação', intervalKm: 20000, intervalMonths: null, notes: 'Verificar desgaste com mais frequência em uso off-road.', priority: 'MEDIUM', order: 8 },
  { modelName: 'ADVENTURE 1190 R', yearFrom: 2013, yearTo: 2016, component: 'Inspeção pós-queda (alinhamento e fixações)', intervalKm: null, intervalMonths: null, notes: 'Verificar garfo, subchassi e skid plate/crash bars após qualquer tombamento em trilha.', priority: 'HIGH', order: 9 },

  // ADVENTURE 890 R
  { modelName: 'ADVENTURE 890 R', yearFrom: 2021, yearTo: null, component: 'Óleo Motorex 10W-50 JASO MA2 (~3,0L com filtro)', intervalKm: 9000, intervalMonths: 12, notes: 'Recomendado antecipar do intervalo oficial de 15.000 km para 8-10 mil km, prevenção contra desgaste de comando de válvulas do motor LC8c.', priority: 'CRITICAL', order: 1 },
  { modelName: 'ADVENTURE 890 R', yearFrom: 2021, yearTo: null, component: 'Inspeção do comando de válvulas (concessionária KTM)', intervalKm: null, intervalMonths: 12, notes: 'Verificar elegibilidade ao programa de goodwill KTM para unidades 2021 ou anteriores.', priority: 'CRITICAL', order: 2 },
  { modelName: 'ADVENTURE 890 R', yearFrom: 2021, yearTo: null, component: 'Vela dupla ignição (verificar código do ano)', intervalKm: 20000, intervalMonths: null, notes: 'Confirmar especificação exata para a unidade.', priority: 'MEDIUM', order: 3 },
  { modelName: 'ADVENTURE 890 R', yearFrom: 2021, yearTo: null, component: 'Óleo da suspensão WP Xplor (curso 220mm)', intervalKm: 12000, intervalMonths: null, notes: 'Antecipar para 10-12 mil km em uso off-road intenso.', priority: 'HIGH', order: 4 },
  { modelName: 'ADVENTURE 890 R', yearFrom: 2021, yearTo: null, component: 'Fluido de freio/embreagem DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Verificar nível e firmeza.', priority: 'HIGH', order: 5 },
  { modelName: 'ADVENTURE 890 R', yearFrom: 2021, yearTo: null, component: 'Folga de válvulas', intervalKm: 22000, intervalMonths: 12, notes: 'DOHC LC8c. Motor frio.', priority: 'HIGH', order: 6 },
  { modelName: 'ADVENTURE 890 R', yearFrom: 2021, yearTo: null, component: 'Kit relação', intervalKm: 22000, intervalMonths: null, notes: 'Lubrificar corrente a cada 500-700 km.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ADVENTURE 890 R', yearFrom: 2021, yearTo: null, component: 'Verificação da tensão do regulador', intervalKm: null, intervalMonths: 12, notes: '13,5-14,8V com motor em rotação média.', priority: 'HIGH', order: 8 },
  { modelName: 'ADVENTURE 890 R', yearFrom: 2021, yearTo: null, component: 'Bateria — verificação de carga', intervalKm: null, intervalMonths: 6, notes: 'Mínimo 12,4V em repouso.', priority: 'MEDIUM', order: 9 },

  // SUPER ADVENTURE 1290 (base) / 1290 R / 1290 S — mesmos itens nas 3 variantes
  { modelName: 'SUPER ADVENTURE 1290', yearFrom: 2015, yearTo: null, component: 'Óleo Motorex 10W-50 JASO MA2 (~3,5L com filtro)', intervalKm: 12000, intervalMonths: 12, notes: 'Intervalo oficial ~15.000 km; reduzir para 10.000 km em uso esportivo/off-road intenso.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SUPER ADVENTURE 1290', yearFrom: 2015, yearTo: null, component: 'Vela iridium NGK LKAR9BI-10 (dupla ignição)', intervalKm: 22000, intervalMonths: null, notes: 'Encomendar com antecedência — rede KTM Brasil limitada.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SUPER ADVENTURE 1290', yearFrom: 2015, yearTo: null, component: 'Fluido de freio/embreagem DOT 4 (PASC)', intervalKm: 15000, intervalMonths: 24, notes: 'Sangrar se ponto ficar esponjoso.', priority: 'HIGH', order: 3 },
  { modelName: 'SUPER ADVENTURE 1290', yearFrom: 2015, yearTo: null, component: 'Folga de válvulas', intervalKm: 17500, intervalMonths: 12, notes: 'Motor V-twin de alta performance sensível a folgas fora do padrão.', priority: 'HIGH', order: 4 },
  { modelName: 'SUPER ADVENTURE 1290', yearFrom: 2015, yearTo: null, component: 'Kit relação', intervalKm: 22000, intervalMonths: null, notes: 'Lubrificar corrente a cada 500-700 km.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SUPER ADVENTURE 1290', yearFrom: 2015, yearTo: null, component: 'Verificação da tensão do regulador', intervalKm: null, intervalMonths: 12, notes: '13,5-14,8V com motor em rotação média.', priority: 'HIGH', order: 6 },
  { modelName: 'SUPER ADVENTURE 1290', yearFrom: 2015, yearTo: null, component: 'Atualização de firmware da suspensão (versão S semi-ativa)', intervalKm: null, intervalMonths: 12, notes: 'Fazer em concessionária KTM — corrige comportamento da suspensão eletrônica.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SUPER ADVENTURE 1290', yearFrom: 2015, yearTo: null, component: 'Pastilhas de freio (EBC HH ou Brembo compatível)', intervalKm: 15000, intervalMonths: null, notes: 'Peso elevado (230kg+) exige pastilhas de qualidade.', priority: 'MEDIUM', order: 8 },
  { modelName: 'SUPER ADVENTURE 1290', yearFrom: 2015, yearTo: null, component: 'Bateria — verificação de carga', intervalKm: null, intervalMonths: 6, notes: 'Mínimo 12,4V em repouso.', priority: 'MEDIUM', order: 9 },

  { modelName: 'SUPER ADVENTURE 1290 R', yearFrom: 2015, yearTo: null, component: 'Óleo Motorex 10W-50 JASO MA2 (~3,5L com filtro)', intervalKm: 12000, intervalMonths: 12, notes: 'Intervalo oficial ~15.000 km; reduzir para 10.000 km em uso esportivo/off-road intenso.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SUPER ADVENTURE 1290 R', yearFrom: 2015, yearTo: null, component: 'Vela iridium NGK LKAR9BI-10 (dupla ignição)', intervalKm: 22000, intervalMonths: null, notes: 'Encomendar com antecedência — rede KTM Brasil limitada.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SUPER ADVENTURE 1290 R', yearFrom: 2015, yearTo: null, component: 'Fluido de freio/embreagem DOT 4 (PASC)', intervalKm: 15000, intervalMonths: 24, notes: 'Sangrar se ponto ficar esponjoso.', priority: 'HIGH', order: 3 },
  { modelName: 'SUPER ADVENTURE 1290 R', yearFrom: 2015, yearTo: null, component: 'Folga de válvulas', intervalKm: 17500, intervalMonths: 12, notes: 'Motor V-twin de alta performance sensível a folgas fora do padrão.', priority: 'HIGH', order: 4 },
  { modelName: 'SUPER ADVENTURE 1290 R', yearFrom: 2015, yearTo: null, component: 'Kit relação', intervalKm: 22000, intervalMonths: null, notes: 'Lubrificar corrente a cada 500-700 km, mais em trilha/lama.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SUPER ADVENTURE 1290 R', yearFrom: 2015, yearTo: null, component: 'Verificação da tensão do regulador', intervalKm: null, intervalMonths: 12, notes: '13,5-14,8V com motor em rotação média.', priority: 'HIGH', order: 6 },
  { modelName: 'SUPER ADVENTURE 1290 R', yearFrom: 2015, yearTo: null, component: 'Vedantes de bengala (uso off-road)', intervalKm: 15000, intervalMonths: null, notes: 'Rodas raiadas/foco off-road: desgaste mais rápido que a versão S.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SUPER ADVENTURE 1290 R', yearFrom: 2015, yearTo: null, component: 'Pastilhas de freio (EBC HH ou Brembo compatível)', intervalKm: 15000, intervalMonths: null, notes: 'Peso elevado (230kg+) exige pastilhas de qualidade.', priority: 'MEDIUM', order: 8 },
  { modelName: 'SUPER ADVENTURE 1290 R', yearFrom: 2015, yearTo: null, component: 'Bateria — verificação de carga', intervalKm: null, intervalMonths: 6, notes: 'Mínimo 12,4V em repouso.', priority: 'MEDIUM', order: 9 },

  { modelName: 'SUPER ADVENTURE 1290 S', yearFrom: 2015, yearTo: null, component: 'Óleo Motorex 10W-50 JASO MA2 (~3,5L com filtro)', intervalKm: 12000, intervalMonths: 12, notes: 'Intervalo oficial ~15.000 km; reduzir para 10.000 km em uso esportivo intenso.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SUPER ADVENTURE 1290 S', yearFrom: 2015, yearTo: null, component: 'Vela iridium NGK LKAR9BI-10 (dupla ignição)', intervalKm: 22000, intervalMonths: null, notes: 'Encomendar com antecedência — rede KTM Brasil limitada.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SUPER ADVENTURE 1290 S', yearFrom: 2015, yearTo: null, component: 'Fluido de freio/embreagem DOT 4 (PASC)', intervalKm: 15000, intervalMonths: 24, notes: 'Sangrar se ponto ficar esponjoso.', priority: 'HIGH', order: 3 },
  { modelName: 'SUPER ADVENTURE 1290 S', yearFrom: 2015, yearTo: null, component: 'Folga de válvulas', intervalKm: 17500, intervalMonths: 12, notes: 'Motor V-twin de alta performance sensível a folgas fora do padrão.', priority: 'HIGH', order: 4 },
  { modelName: 'SUPER ADVENTURE 1290 S', yearFrom: 2015, yearTo: null, component: 'Kit relação', intervalKm: 22000, intervalMonths: null, notes: 'Lubrificar corrente a cada 500-700 km.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SUPER ADVENTURE 1290 S', yearFrom: 2015, yearTo: null, component: 'Verificação da tensão do regulador', intervalKm: null, intervalMonths: 12, notes: '13,5-14,8V com motor em rotação média.', priority: 'HIGH', order: 6 },
  { modelName: 'SUPER ADVENTURE 1290 S', yearFrom: 2015, yearTo: null, component: 'Atualização de firmware da suspensão semi-ativa', intervalKm: null, intervalMonths: 12, notes: 'Fazer em concessionária KTM — versão S touring com suspensão eletrônica.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SUPER ADVENTURE 1290 S', yearFrom: 2015, yearTo: null, component: 'Pastilhas de freio (EBC HH ou Brembo compatível)', intervalKm: 15000, intervalMonths: null, notes: 'Peso elevado (230kg+) exige pastilhas de qualidade.', priority: 'MEDIUM', order: 8 },
  { modelName: 'SUPER ADVENTURE 1290 S', yearFrom: 2015, yearTo: null, component: 'Bateria — verificação de carga', intervalKm: null, intervalMonths: 6, notes: 'Mínimo 12,4V em repouso.', priority: 'MEDIUM', order: 9 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed KTM Adventure (640/950/990/1190/890R/1290 Super Adventure)...')

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

  console.log('✅ KTM Adventure concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
