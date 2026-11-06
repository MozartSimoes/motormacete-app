// seed-triumph-scrambler1200.ts — Triumph Scrambler 1200 X, X Icon Edition, XC, XE, XE Chrome Edition, XE Icon Edition
// Motor bicilíndrico paralelo 1200cc "High Torque", DOHC 8 válvulas, refrigerado a líquido, virabrequim 270°, embreagem assistida
// Triumph expandiu fortemente a operação no Brasil nos últimos anos — o Scrambler 1200 é um dos modelos premium mais desejados da marca por aqui
// Execute: pnpm --filter @motormacete/database db:seed:triumph-scrambler1200 (criar o script correspondente no package.json se ainda não existir)
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

// ─── SCRAMBLER 1200 — BASE (comum a X, X Icon Edition, XC, XE, XE Chrome Edition, XE Icon Edition) ────
// Motor: 1200cc paralelo-twin DOHC 8V "High Torque" refrigerado a líquido, virabrequim 270°
// Potência/torque variam por ano: 89–90 cv @ 7.000–7.400 rpm | 110 Nm @ 3.950–4.500 rpm | Câmbio 6 marchas, embreagem assistida (torque-assist)
// Óleo: 10W/40 ou 10W/50 sintético/semissintético API SH+ JASO MA, ~4,0L total (troca com filtro ~3,4L / sem filtro ~3,2L) | Vela NGK LMAR8A-9 gap 0,9mm (+0,0/-0,1mm), torque 12 Nm
// Corrente DID 525 | Pneus: 90/90-21 (dianteiro, roda raiada tubeless 21×2.15, 36 raios) / 150/70R17 (traseiro, roda raiada tubeless 17×4.25, 32 raios)
// Pressão recomendada: 36 PSI (F) / 42 PSI (R) solo | Peso: 205–230kg dependendo da versão e ano (XC/XE mais leves em 2019, todas mais pesadas nas gerações seguintes)

const SCRAMBLER_BASE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W/40 ou 10W/50 JASO MA — ~4,0L; troca a cada 16.000 km ou 12 meses',
    body: 'O motor 1200cc "High Torque" da família Scrambler compartilha óleo com a embreagem assistida (torque-assist) — por isso o óleo precisa ser JASO MA, nunca JASO MB (escorrega a embreagem). Especificação: 10W/40 ou 10W/50 sintético ou semissintético API SH ou superior. Capacidade total com motor seco é de aproximadamente 4,0L; na troca com substituição do filtro fica em torno de 3,4L, e sem trocar o filtro cerca de 3,2L (confira o nível pelo visor lateral com a moto na vertical). Intervalo oficial Triumph: 16.000 km (10.000 milhas) ou 12 meses, o que vier primeiro. Marcas recomendadas: Motul 7100 10W-40/10W-50, Castrol Power 1 10W-40 ou o óleo original Triumph.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR8A-9 — gap 0,9mm (+0,0/-0,1mm), torque 12 Nm',
    body: 'Vela original de fábrica: NGK LMAR8A-9, com gap de 0,9mm (tolerância +0,0mm/-0,1mm). Ao instalar, aperte com torquímetro a 12 Nm — vela apertada demais pode danificar a rosca de alumínio do cabeçote (caro para reparar). Intervalo de troca: 32.000 km (20.000 milhas). Como o motor é bicilíndrico com duas velas (uma por cilindro), troque sempre em par mesmo que só uma pareça gasta, para manter a combustão equilibrada nos dois cilindros.',
  },
  {
    severity: 'OK',
    title: 'Corrente DID 525 — folga 20–30mm, lubrifique a cada 300 km',
    body: 'Corrente de transmissão 525 (DID original). Lubrifique a cada 300 km (200 milhas) ou sempre que rodar na chuva/estrada molhada — aplique o spray nas laterais dos roletes e deixe a moto parada por pelo menos 8 horas (de preferência durante a noite) para o lubrificante penetrar. Folga correta: 20–30mm medida no meio do trecho inferior, com a moto no cavalete central e sem peso. Ao trocar por desgaste, substitua sempre corrente e coroa/pinhão juntos — só trocar a corrente com os dentes gastos acelera o desgaste da peça nova.',
  },
  {
    severity: 'WARN',
    title: 'Peso elevado (205–230kg) exige atenção em manobras de baixa velocidade',
    body: 'Apesar da estética off-road, o Scrambler 1200 é uma moto pesada para o segmento — de 205kg seco (XC/XE 2019) a até 230kg em ordem de marcha nas versões mais recentes. Em manobras lentas, U-turns e ao arrastar a moto do cavalete lateral, o peso alto no centro de gravidade (motor grande + tanque cheio) surpreende pilotos vindos de motos menores. Pratique manobras de baixa velocidade em local seguro antes de aventurar-se em trilhas técnicas — é o ponto mais citado por quem troca de uma trail média para o Scrambler 1200.',
  },
  {
    severity: 'OK',
    title: 'Embreagem assistida (torque-assist/slipper) — ajuste de folga do cabo',
    body: 'O sistema de embreagem assistida reduz o esforço na alavanca e ajuda a evitar travamento da roda traseira em reduções bruscas (função slipper). Verifique a folga da alavanca periodicamente — deve haver um pequeno curso livre antes de sentir resistência. Se a embreagem estiver "dura" demais ou "solta" demais, ajuste pelo regulador na própria alavanca (modelos com ajuste manual) antes de levar à oficina. Fluido/cabo: a maioria das versões usa acionamento por cabo, não hidráulico — verifique o manual da sua versão específica.',
  },
  {
    severity: 'WARN',
    title: 'Pneus tubeless em roda raiada: verifique vedação nos raios após remendo',
    body: 'As rodas raiadas tubeless do Scrambler 1200 (21" dianteira / 17" traseira) usam vedação especial nos raios para funcionar sem câmara — diferente da roda raiada tradicional. Ao consertar um furo, use kit de reparo específico para pneu tubeless (cogumelo ou macarrão vulcanizado) e sempre calibre a pressão correta depois (36 PSI dianteiro / 42 PSI traseiro solo). Pneus originais: Metzeler Tourance (dual-sport rodoviário); para uso off-road mais sério, Metzeler Karoo 4 ou Pirelli Scorpion Rally STR são as trocas mais recomendadas pela comunidade — mantendo a mesma medida 90/90-21 e 150/70R17.',
  },
  {
    severity: 'OK',
    title: 'Triumph investiu forte no Brasil — rede autorizada crescendo e peças mais acessíveis',
    body: 'A Triumph expandiu significativamente sua operação no Brasil nos últimos anos, com mais concessionárias autorizadas e melhor disponibilidade de peças genuínas — o que facilita muito a manutenção comparado a alguns anos atrás. O Scrambler 1200 (X e XE) é um dos modelos premium mais desejados da marca por aqui, com preços de tabela em torno de R$ 74.000–84.000 dependendo da versão. Ainda assim, peças de desgaste como pastilhas, corrente e filtros também têm equivalentes de marcas como EBC, DID, Hiflofiltro e Metzeler — geralmente mais baratos que a peça genuína Triumph e fáceis de importar ou encontrar em distribuidoras de peças para motos premium.',
  },
]

const SCRAMBLER_BASE_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Desgaste prematuro da cesta de embreagem — defeito documentado em unidades de primeiras remessas',
    body: 'Proprietários relataram (registrado em fóruns como ADVrider) desgaste prematuro da cesta de embreagem (clutch basket) em algumas unidades do Scrambler 1200, causando folga excessiva, ruído metálico na embreagem e trepidação na alavanca. A Triumph reconheceu o problema em unidades específicas e cobriu a substituição em garantia em vários casos documentados. Se notar barulho metálico vindo da região da embreagem, folga anormal na alavanca ou dificuldade em engatar marchas suavemente, leve a uma concessionária autorizada o quanto antes — mesmo fora do prazo de garantia original, vale consultar sobre campanhas de boa vontade (goodwill) da marca.',
  },
  {
    severity: 'WARN',
    title: 'Falhas no painel digital e conectores elétricos por infiltração de umidade',
    body: 'Alguns proprietários relataram falhas no painel/instrumento digital (tela apagando, informações erráticas) após exposição prolongada a chuva ou lavagem com jato de alta pressão. A causa mais comum é oxidação em conectores elétricos, especialmente os localizados próximos à traseira/suspensão, onde ficam mais expostos a respingos de água e barro. Evite jato de alta pressão diretamente nos conectores e no painel. Se o painel apresentar comportamento errático, o primeiro passo (barato) é desconectar a bateria por alguns minutos para resetar o sistema; se persistir, inspecione os conectores com contato dielétrico antes de suspeitar de defeito na própria central.',
  },
  {
    severity: 'WARN',
    title: 'Engasgo/afogamento em baixa rotação com motor frio (abaixo de 30°C)',
    body: 'É um comportamento documentado do motor 1200 "High Torque": com o motor frio (temperatura ambiente abaixo de ~30°C), engatado em marcha e com a embreagem sendo solta lentamente, o motor pode engasgar ou morrer de forma inesperada — mais perceptível em baixa rotação e abertura leve de acelerador. Deixe o motor aquecer alguns minutos em marcha lenta antes de partir em dias frios, e evite embreagem "arrastada" com giro muito baixo logo na partida. Não é indicativo de defeito grave, mas pode assustar quem não conhece a característica.',
  },
  {
    severity: 'WARN',
    title: 'Avisos de OCABS/OCTC (ABS e controle de tração em curva) piscando ou desativando',
    body: 'O Scrambler 1200 usa sensor de inclinação (IMU) para o ABS e controle de tração otimizados em curva (Optimized Cornering ABS/Traction Control). Alguns proprietários relatam o aviso de "OCABS desativado" ou "OCTC desativado" piscando no painel durante o uso, normalmente resolvido ao parar e reiniciar a moto (desligar/ligar a ignição). Se o aviso persistir mesmo após reiniciar, ou vier acompanhado de luz de falha do ABS acesa, é recomendável escanear os códigos de falha na concessionária antes de rodar — o sistema pode estar operando sem a proteção de curva mesmo que o ABS convencional continue funcionando.',
  },
  {
    severity: 'WARN',
    title: 'Relé de partida (starter relay) — moto não dá partida mesmo com bateria boa',
    body: 'Existem relatos recorrentes de falha no relé de partida do motor de arranque, que se manifesta como a moto "não pegar" (sem o motor de arranque girar) mesmo com a bateria testando tensão adequada. Antes de trocar bateria ou motor de arranque por suspeita, teste o relé de partida — é uma peça relativamente barata e de troca simples, geralmente localizada perto da bateria. Verifique também os fusíveis principais antes de desmontar qualquer componente maior.',
  },
  {
    severity: 'WARN',
    title: 'Peso elevado aumenta o risco em quedas de baixa velocidade no off-road',
    body: 'Com 205–230kg dependendo da versão, uma queda de baixa velocidade em terreno irregular (areia fofa, subida técnica, atravessando riacho) é mais difícil de segurar e mais trabalhosa de levantar sozinho do que em trail bikes leves. Proteção de motor (bash plate/skid plate) e capacete/manoplas reforçadas são recomendados para quem pretende usar a moto fora do asfalto com regularidade. Pratique o "pick up" da moto sozinho (técnica de levantar moto pesada usando as pernas, não as costas) antes de sair em trilhas isoladas.',
  },
]

const SCRAMBLER_BASE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Triumph Scrambler 1200 (X/XC/XE) — baseado no manual oficial + experiência de proprietários',
    body: '300 km (contínuo) — Lubrificar a corrente. | 1.000 km — Revisão inicial de rodagem (torque geral, checagem visual de vazamentos). | 16.000 km (10.000 mi) / 12 meses — Troca de óleo e filtro (10W/40 ou 10W/50 JASO MA, ~3,4L). Verificar folga da corrente. Trocar filtro de ar. | 32.000 km (20.000 mi) — Troca das velas NGK LMAR8A-9 (par). Verificar/ajustar folga de válvulas. Verificar fluido de freio (trocar a cada 24 meses, independente da km). | 48.000 km (30.000 mi) — Kit relação (corrente 525 + coroa + pinhão) se desgastado. Inspecionar mangueiras de arrefecimento e nível do coolant (D2053 OAT, ~1,9L). | A cada 24 meses — Troca do fluido de freio DOT 4 (dianteiro e traseiro) independente da quilometragem.',
  },
]

// ─── SCRAMBLER 1200 XE (topo de linha — XE, XE Chrome Edition, XE Icon Edition) ────────────────────────
// Suspensão: 2019–2023 garfo Showa 47mm invertido (dianteiro) + par de amortecedores Öhlins (traseiro), ambos totalmente ajustáveis (pré-carga, compressão, retorno), curso 250mm nas duas rodas
// A partir de 2024: garfo e amortecedores Marzocchi (substituindo Showa/Öhlins), também totalmente ajustáveis, curso mantido em 250mm
// Freios: Brembo Stylema Monoblock radial, discos duplos flutuantes de 320mm (dianteiro) + disco 255mm com pinça Nissin (traseiro) | Altura do assento: 870mm
// Peso: ~207kg seco (2019) / ~230kg em ordem de marcha (versões recentes) — é a versão mais capaz off-road e mais cara da família

const SCRAMBLER_XE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Suspensão totalmente ajustável 250mm — regule pré-carga conforme peso e uso',
    body: 'A XE é a versão de maior curso de suspensão da família: 250mm dianteiro e traseiro, com ajuste completo de pré-carga, compressão e retorno (garfo Showa + amortecedores Öhlins até 2023; garfo e amortecedores Marzocchi a partir de 2024 — ambos igualmente totalmente ajustáveis). Para uso misto (asfalto + trilha leve), comece com a regulagem de fábrica. Para uso predominantemente off-road ou com bagagem/carona frequente, aumente a pré-carga traseira. Anote os cliques de ajuste original antes de mexer, para conseguir voltar à referência de fábrica se precisar.',
  },
  {
    severity: 'OK',
    title: 'Freios Brembo Stylema — discos duplos 320mm; pastilhas de alta performance',
    body: 'A XE usa pinças Brembo Stylema Monoblock radiais na dianteira, com discos duplos flutuantes de 320mm — sistema de frenagem superior ao da versão X (que usa pinças Nissin com discos de 310mm). Pastilhas de reposição de alta performance (composto sinterizado/sport) são recomendadas para manter a resposta da pinça Brembo. Ao trocar pastilhas, sangre o sistema se notar alavanca esponjosa — pinças radiais de alta performance são mais sensíveis a ar no sistema do que pinças convencionais.',
  },
  {
    severity: 'OK',
    title: 'Altura do assento 870mm — maior capacidade off-road, mas menos amigável para pilotos baixos',
    body: 'A altura de assento de 870mm (34") da XE é consideravelmente maior que a da versão X (820mm/32,3" nas gerações mais recentes) — reflexo direto do maior curso de suspensão. Para pilotos com menos de 1,70m, vale testar o alcance ao solo antes de comprar; a Triumph oferece assento baixo opcional em alguns mercados. A vantagem é justamente essa altura maior: ângulo de ataque melhor em obstáculos e mais curso disponível para absorver buracos em alta velocidade fora do asfalto.',
  },
  {
    severity: 'WARN',
    title: 'Roda dianteira 21" com pneu específico — estoque de pneus mais restrito',
    body: 'A XE compartilha a roda dianteira raiada tubeless de 21" com a XC (a versão X usa a mesma medida, mas vale sempre conferir pela etiqueta do modelo específico). Pneus 90/90-21 de qualidade off-road (Metzeler Karoo 4, Pirelli Scorpion Rally) têm estoque mais limitado em borracharias comuns comparado a medidas de 17"/19" mais populares — planeje a troca com antecedência, especialmente antes de viagens longas, e considere manter um pneu sobressalente se for rodar em regiões remotas.',
  },
  {
    severity: 'OK',
    title: 'Peso mais alto que a versão X — compense com pneus e pressão adequados off-road',
    body: 'A XE é a versão mais pesada da família (em torno de 230kg em ordem de marcha nas versões recentes, ~207kg seco em 2019), resultado do maior curso de suspensão e maior tanque/estrutura. Em terreno off-road, reduzir levemente a pressão dos pneus (dentro da faixa segura, nunca abaixo do recomendado pelo fabricante do pneu) melhora a tração e amortece melhor o peso extra da moto em terreno irregular — sempre recalibrando para a pressão de estrada (36/42 PSI) antes de voltar ao asfalto.',
  },
  {
    severity: 'WARN',
    title: 'Edições especiais (Chrome/Icon Edition): mesma mecânica, acabamento diferenciado exige mais cuidado',
    body: 'As edições XE Chrome Edition e XE Icon Edition compartilham toda a mecânica da XE padrão — motor, suspensão, freios e cronograma de manutenção são idênticos. A diferença está no acabamento: tanque cromado ou pintura especial, que exige cuidado extra na lavagem (evite produtos abrasivos ou jato de alta pressão muito próximo das peças cromadas/pintadas) para preservar o valor e a aparência da edição limitada.',
  },
]

const SCRAMBLER_XE_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Amortecedores Öhlins (2019–2023): manutenção especializada tem custo mais alto',
    body: 'Os amortecedores Öhlins traseiros da XE (modelos 2019–2023, antes da troca para Marzocchi em 2024) são componentes premium que exigem manutenção especializada — revisão de óleo interno e vedantes por um serviço autorizado Öhlins, não uma oficina de suspensão genérica. O custo desse serviço é sensivelmente mais alto que o de um amortecedor convencional. Se notar vazamento de óleo pela haste do amortecedor ou perda de amortecimento (moto "pulando" em buracos), não adie — deixar o vedante vazando pode danificar o interior do amortecedor e encarecer ainda mais o reparo.',
  },
  {
    severity: 'WARN',
    title: 'Curso de suspensão longo (250mm) exige atenção redobrada ao centro de gravidade em manobras',
    body: 'O maior curso de suspensão da XE (250mm) eleva o centro de gravidade em relação à X e resulta em mais movimento da moto ao frear forte ou acelerar bruscamente — sensação diferente de uma moto de suspensão mais curta. Pilotos migrando de motos de rua "baixas" notam mais balanço em manobras de estacionamento e em curvas muito fechadas em baixa velocidade. Não é defeito, é característica do projeto off-road — adapte o estilo de pilotagem, especialmente em baixa velocidade.',
  },
  {
    severity: 'WARN',
    title: 'Discos de freio duplos 320mm: inspecione empenamento após uso intenso off-road',
    body: 'Uso off-road frequente com água/lama seguido de frenagens fortes pode acelerar o desgaste desigual e, em casos raros, empenar levemente os discos duplos de 320mm da XE. Sintoma: trepidação na alavanca de freio ao frear forte, mais perceptível em velocidade baixa. Inspecione visualmente os discos após trilhas com rios/poças e meça o empenamento com relógio comparador se sentir trepidação — discos originais flutuantes têm alguma tolerância a variação térmica, mas trepidação constante indica necessidade de retífica ou troca.',
  },
  {
    severity: 'WARN',
    title: 'Preço de peças de suspensão e freios acima da média — reserve orçamento maior para manutenção',
    body: 'Por usar componentes premium (Öhlins/Marzocchi na suspensão, Brembo Stylema nos freios), o custo de manutenção da XE tende a ser mais alto que o da versão X equivalente quando essas peças específicas precisam de reparo ou substituição. Vedantes, kits de reparo de suspensão e pastilhas de alta performance para pinças Brembo Stylema custam mais que os equivalentes genéricos. Ao orçar a manutenção de longo prazo da XE, considere esse diferencial de custo em relação à versão X.',
  },
]

const SCRAMBLER_XE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma adicional específico da XE — suspensão e freios premium exigem revisão dedicada',
    body: '16.000 km / 12 meses — Inspecionar vedantes do garfo Showa/Marzocchi (procurar sinais de vazamento de óleo). | 24 meses — Fluido de freio DOT 4 (2 pinças dianteiras Brembo Stylema + 1 traseira Nissin — mais pontos de purga que a versão X). | 30.000–40.000 km — Revisão completa da suspensão (óleo interno e vedantes) em serviço especializado Öhlins (2019–2023) ou Marzocchi (2024+) — não postergar se notar vazamento visível. | Anual — Inspecionar discos duplos de 320mm quanto a empenamento e desgaste desigual, especialmente após temporada de uso off-road intenso.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────
// "SCRAMBLER 1200" casa (via regex \b…\b) com todas as variantes FIPE: X, X ICON EDITION, XC, XE, XE CHROME EDITION, XE ICON EDITION
// "SCRAMBLER 1200 XE" casa apenas com XE, XE CHROME EDITION e XE ICON EDITION — o sistema soma as dicas dos dois blocos para essas variantes

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'SCRAMBLER 1200',
    yearFrom: 2019,
    yearTo: null,
    MACETES: SCRAMBLER_BASE_MACETES,
    PROBLEMAS: SCRAMBLER_BASE_PROBLEMAS,
    MANUTENCAO: SCRAMBLER_BASE_MANUTENCAO,
  },
  {
    modelName: 'SCRAMBLER 1200 XE',
    yearFrom: 2019,
    yearTo: null,
    MACETES: SCRAMBLER_XE_MACETES,
    PROBLEMAS: SCRAMBLER_XE_PROBLEMAS,
    MANUTENCAO: SCRAMBLER_XE_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────
// Preenchido para os modelNames principais: X, XC, XE (cada um casa apenas com sua própria variante + edições derivadas)

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'SCRAMBLER 1200 X',
    yearFrom: 2024, yearTo: null,
    tireSize: '90/90-21 (F) · 150/70R17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Solo: F 36 / R 42 PSI (spec oficial Triumph). Pressão com carga/carona não localizada de forma confiável nas fontes consultadas — a Triumph publica esse valor na tabela de pressões do manual do proprietário (verificar página específica "Tyre Inflation Pressures"); como referência geral de motos adventure/scrambler, costuma-se adicionar cerca de +3 a +4 PSI no pneu traseiro com carona/bagagem. Rodas raiadas tubeless 21" (F, 36 raios) / 17" (R, 32 raios). Pneu original: Metzeler Tourance.',
  },
  {
    modelName: 'SCRAMBLER 1200 XC',
    yearFrom: 2019, yearTo: 2023,
    tireSize: '90/90-21 (F) · 150/70R17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Solo: F 36 / R 42 PSI. Mesma medida e roda raiada tubeless 21"/17" da XE. Versão descontinuada em 2023, substituída pela X. Pressão com carga não confirmada com segurança nas fontes consultadas — consulte o manual do proprietário da sua unidade específica.',
  },
  {
    modelName: 'SCRAMBLER 1200 XE',
    yearFrom: 2019, yearTo: null,
    tireSize: '90/90-21 (F) · 150/70R17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Solo: F 36 / R 42 PSI. Roda raiada tubeless 21" dianteira (36 raios) / 17" traseira (32 raios) — maior curso de suspensão (250mm) da família. Pneus recomendados para uso off-road: Metzeler Karoo 4 ou Pirelli Scorpion Rally STR, mantendo a mesma medida. Pressão com carga não confirmada nas fontes consultadas.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // SCRAMBLER 1200 X
  { modelName: 'SCRAMBLER 1200 X', yearFrom: 2024, yearTo: null, component: 'Óleo 10W/40 ou 10W/50 JASO MA (~4,0L / ~3,4L com filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 1200cc High Torque. Nunca usar JASO MB (escorrega embreagem assistida).', priority: 'HIGH', order: 1 },
  { modelName: 'SCRAMBLER 1200 X', yearFrom: 2024, yearTo: null, component: 'Vela NGK LMAR8A-9 ×2 (gap 0,9mm, torque 12 Nm)', intervalKm: 32000, intervalMonths: null, notes: 'Trocar sempre em par (uma por cilindro).', priority: 'MEDIUM', order: 2 },
  { modelName: 'SCRAMBLER 1200 X', yearFrom: 2024, yearTo: null, component: 'Folga de válvulas', intervalKm: 32000, intervalMonths: null, notes: 'Verificar/ajustar a cada 32.000 km (20.000 mi) conforme manual oficial.', priority: 'HIGH', order: 3 },
  { modelName: 'SCRAMBLER 1200 X', yearFrom: 2024, yearTo: null, component: 'Lubrificação da corrente DID 525', intervalKm: 300, intervalMonths: null, notes: 'Também após rodar na chuva. Folga 20–30mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'SCRAMBLER 1200 X', yearFrom: 2024, yearTo: null, component: 'Filtro de ar', intervalKm: 16000, intervalMonths: 12, notes: 'Trocar junto com a revisão de óleo.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SCRAMBLER 1200 X', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4 (dianteiro Nissin duplo + traseiro)', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório independente da km rodada.', priority: 'HIGH', order: 6 },
  { modelName: 'SCRAMBLER 1200 X', yearFrom: 2024, yearTo: null, component: 'Kit relação (corrente 525 + coroa + pinhão)', intervalKm: 48000, intervalMonths: null, notes: 'Trocar completo quando desgastado — nunca só a corrente com coroa gasta.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SCRAMBLER 1200 X', yearFrom: 2024, yearTo: null, component: 'Verificação do nível/qualidade do coolant (D2053 OAT, ~1,9L)', intervalKm: null, intervalMonths: 12, notes: 'Refrigeração líquida. Não misturar tipos diferentes de coolant OAT.', priority: 'MEDIUM', order: 8 },
  { modelName: 'SCRAMBLER 1200 X', yearFrom: 2024, yearTo: null, component: 'Pastilhas de freio dianteiro (Nissin, discos 310mm)', intervalKm: 16000, intervalMonths: null, notes: 'Inspecionar espessura a cada revisão; substituir conforme desgaste.', priority: 'MEDIUM', order: 9 },

  // SCRAMBLER 1200 XC
  { modelName: 'SCRAMBLER 1200 XC', yearFrom: 2019, yearTo: 2023, component: 'Óleo 10W/40 ou 10W/50 JASO MA (~4,0L / ~3,4L com filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 1200cc High Torque. Nunca usar JASO MB.', priority: 'HIGH', order: 1 },
  { modelName: 'SCRAMBLER 1200 XC', yearFrom: 2019, yearTo: 2023, component: 'Vela NGK LMAR8A-9 ×2 (gap 0,9mm, torque 12 Nm)', intervalKm: 32000, intervalMonths: null, notes: 'Trocar sempre em par.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SCRAMBLER 1200 XC', yearFrom: 2019, yearTo: 2023, component: 'Folga de válvulas', intervalKm: 32000, intervalMonths: null, notes: 'Verificar/ajustar a cada 32.000 km (20.000 mi).', priority: 'HIGH', order: 3 },
  { modelName: 'SCRAMBLER 1200 XC', yearFrom: 2019, yearTo: 2023, component: 'Lubrificação da corrente DID 525', intervalKm: 300, intervalMonths: null, notes: 'Folga 20–30mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'SCRAMBLER 1200 XC', yearFrom: 2019, yearTo: 2023, component: 'Filtro de ar', intervalKm: 16000, intervalMonths: 12, notes: 'Trocar junto com a revisão de óleo.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SCRAMBLER 1200 XC', yearFrom: 2019, yearTo: 2023, component: 'Fluido de freio DOT 4 (dianteiro + traseiro)', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'SCRAMBLER 1200 XC', yearFrom: 2019, yearTo: 2023, component: 'Suspensão ajustável (200mm curso) — revisão de vedantes', intervalKm: 30000, intervalMonths: null, notes: 'Inspecionar vazamento de óleo no garfo e no(s) amortecedor(es) traseiro(s).', priority: 'MEDIUM', order: 7 },
  { modelName: 'SCRAMBLER 1200 XC', yearFrom: 2019, yearTo: 2023, component: 'Kit relação (corrente 525 + coroa + pinhão)', intervalKm: 48000, intervalMonths: null, notes: 'Trocar completo quando desgastado.', priority: 'MEDIUM', order: 8 },
  { modelName: 'SCRAMBLER 1200 XC', yearFrom: 2019, yearTo: 2023, component: 'Verificação do nível/qualidade do coolant', intervalKm: null, intervalMonths: 12, notes: 'D2053 OAT ou HD4X (versões mais antigas). Não misturar tipos.', priority: 'MEDIUM', order: 9 },

  // SCRAMBLER 1200 XE
  { modelName: 'SCRAMBLER 1200 XE', yearFrom: 2019, yearTo: null, component: 'Óleo 10W/40 ou 10W/50 JASO MA (~4,0L / ~3,4L com filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 1200cc High Torque. Nunca usar JASO MB.', priority: 'HIGH', order: 1 },
  { modelName: 'SCRAMBLER 1200 XE', yearFrom: 2019, yearTo: null, component: 'Vela NGK LMAR8A-9 ×2 (gap 0,9mm, torque 12 Nm)', intervalKm: 32000, intervalMonths: null, notes: 'Trocar sempre em par.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SCRAMBLER 1200 XE', yearFrom: 2019, yearTo: null, component: 'Folga de válvulas', intervalKm: 32000, intervalMonths: null, notes: 'Verificar/ajustar a cada 32.000 km (20.000 mi).', priority: 'HIGH', order: 3 },
  { modelName: 'SCRAMBLER 1200 XE', yearFrom: 2019, yearTo: null, component: 'Lubrificação da corrente DID 525', intervalKm: 300, intervalMonths: null, notes: 'Folga 20–30mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'SCRAMBLER 1200 XE', yearFrom: 2019, yearTo: null, component: 'Fluido de freio DOT 4 (Brembo Stylema duplo dianteiro + Nissin traseiro)', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório. Mais pontos de purga que a versão X (2 pinças dianteiras Brembo).', priority: 'HIGH', order: 5 },
  { modelName: 'SCRAMBLER 1200 XE', yearFrom: 2019, yearTo: null, component: 'Revisão da suspensão (250mm curso) — Showa/Öhlins (2019–2023) ou Marzocchi (2024+)', intervalKm: 30000, intervalMonths: null, notes: 'Revisão de óleo interno e vedantes em serviço especializado — custo mais alto que suspensão convencional.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SCRAMBLER 1200 XE', yearFrom: 2019, yearTo: null, component: 'Filtro de ar', intervalKm: 16000, intervalMonths: 12, notes: 'Trocar junto com a revisão de óleo.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SCRAMBLER 1200 XE', yearFrom: 2019, yearTo: null, component: 'Kit relação (corrente 525 + coroa + pinhão)', intervalKm: 48000, intervalMonths: null, notes: 'Trocar completo quando desgastado.', priority: 'MEDIUM', order: 8 },
  { modelName: 'SCRAMBLER 1200 XE', yearFrom: 2019, yearTo: null, component: 'Discos de freio duplos 320mm — inspeção de empenamento', intervalKm: 16000, intervalMonths: 12, notes: 'Mais crítico após temporada de uso off-road intenso com água/lama.', priority: 'MEDIUM', order: 9 },
  { modelName: 'SCRAMBLER 1200 XE', yearFrom: 2019, yearTo: null, component: 'Verificação do nível/qualidade do coolant (D2053 OAT, ~1,9L)', intervalKm: null, intervalMonths: 12, notes: 'Não misturar tipos diferentes de coolant OAT.', priority: 'MEDIUM', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Triumph Scrambler 1200 (X / XC / XE)...')

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
    where: { modelName: { in: ['SCRAMBLER 1200 X', 'SCRAMBLER 1200 XC', 'SCRAMBLER 1200 XE'] } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Triumph Scrambler 1200 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
