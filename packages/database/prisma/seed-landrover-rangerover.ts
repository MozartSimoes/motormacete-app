/**
 * Seed Land Rover Range Rover (flagship) — macetes, problemas, manutenção e calibragem
 * Este arquivo cobre APENAS o Range Rover "grande"/tradicional (flagship), NÃO o
 * Range Rover Sport, Range Rover Evoque nem o Range Rover Velar — são modelos
 * mecanicamente distintos, com plataformas próprias, tratados em arquivos de seed
 * separados. Como "Range Rover" é substring literal de "Range Rover Sport",
 * "Range Rover Evoque" e "Range Rover Velar" nos nomes FIPE, o motor de busca do
 * app (regex de word-boundary) pode fazer essas dicas aparecerem também em buscas
 * desses outros modelos — por isso a primeira dica do bloco mais antigo é um
 * aviso explícito de desambiguação (mesmo padrão já usado para Discovery vs
 * Discovery Sport em seed-landrover-discovery.ts).
 *
 * Gerações cobertas:
 * - P38A (1994-2002): 2ª geração, V8 Rover 4.0/4.6 (bloco de origem Buick) a
 *   gasolina ou 6-cilindros BMW M51 2.5 TD a diesel (mesmo motor do BMW 525tds
 *   da época). A partir de 1999 o V8 a gasolina passou a usar gerenciamento
 *   eletrônico Bosch de origem BMW (Série 7), substituindo o antigo Lucas GEMS.
 * - L322 (2002-2012): 3ª geração. De 2002 a 2005/2006 usou o V8 4.4 BMW M62,
 *   compartilhado com BMW 540i (E39), 740i (E38) e X5 4.4i/4.6is — peças de
 *   motor (corrente de distribuição, selos de VANOS, bobinas de ignição) são
 *   intercambiáveis. A partir de 2005/2006 passou a usar V8 de origem Jaguar
 *   (4.4 aspirado e 4.2 Supercharged) e, de 2007 em diante, o diesel TDV8 3.6.
 * - L405 (2013-2021): 4ª geração, carroceria monobloco em alumínio (bem mais
 *   leve que a estrutura em aço/alumínio híbrida do L322). Motor SDV8 4.4
 *   diesel, V8 5.0 Supercharged a gasolina, e a partir do facelift de 2018 o
 *   híbrido plug-in P400e.
 * - L460 (2022-atual): 5ª geração, nova plataforma MLA-Flex (compartilhada com
 *   o novo Defender). Novo V8 4.4 biturbo de origem BMW (substituindo o antigo
 *   V8 5.0 de origem Jaguar), 6-cilindros diesel/gasolina mild-hybrid, e
 *   variantes plug-in hybrid P440e/P460e/P510e/P550e.
 * Execute: pnpm --filter @motormacete/database db:seed:landrover-rangerover
 *
 * Fontes: procon.sp.gov.br, landrover.com.br, landrover.com.br/ownership/electric,
 *         nhtsa.gov, rangerovers.net, landyzone.co.uk, roverparts.eu,
 *         roverspares.co.za, en.wikipedia.org (Range Rover P38A / L322 / L460),
 *         motorhungry.com, motor1.com, autoblog.com, topclassactions.com,
 *         opinautos.com.br, aronline.co.uk
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1994-2002 (P38A — V8 Rover 4.0/4.6 gasolina ou 2.5 TD BMW M51 diesel) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Este é o Range Rover "tradicional"/flagship — não confunda com Sport, Evoque ou Velar',
    body: 'As dicas cadastradas aqui são específicas do Range Rover "grande" (o flagship original da marca). Se o seu carro é um Range Rover Sport, Range Rover Evoque ou Range Rover Velar, essas informações NÃO se aplicam — são modelos mecanicamente diferentes, com motor, plataforma e histórico de problemas próprios. Procure o conteúdo específico desse modelo na nossa base (arquivos separados para cada um).',
  },
  {
    severity: 'OK',
    title: 'Diesel 2.5 TD é o mesmo motor do BMW 525tds — peças cruzam com BMW da época',
    body: 'O motor 6 cilindros 2.5 TD (BMW M51) usado no P38A diesel é o mesmo motor do BMW 525tds daquela geração. Peças de motor (bicos, bomba injetora, correia de distribuição) podem ser pesquisadas também por essa referência cruzada com o BMW da época — amplia bastante as opções de encontrar peça.',
  },
  {
    severity: 'OK',
    title: 'A partir de 1999 o V8 a gasolina ganhou gerenciamento eletrônico de origem BMW',
    body: 'Em 1999 o V8 a gasolina passou a usar sistema de gerenciamento Bosch de origem BMW (Série 7), substituindo o antigo Lucas GEMS. Se o carro for de 1999 em diante, tenha isso em mente ao diagnosticar falha elétrica/de injeção — o sistema é diferente do usado nos exemplares mais antigos do mesmo P38A.',
  },
  {
    severity: 'WARN',
    title: 'Nunca rode com vazamento na suspensão a ar — isso queima o compressor',
    body: 'Se notar o carro "afundando" de um lado ou demorando para subir, não continue rodando esperando "resolver sozinho". Vazamento de ar force o compressor a trabalhar continuamente tentando manter a altura, e isso costuma ser o que realmente queima o compressor — um reparo bem mais caro do que consertar o vazamento a tempo.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão a ar: vazamentos, desgaste do compressor e corrosão da ECU são as falhas mais recorrentes',
    body: 'O P38A é conhecido por falhas na suspensão pneumática — vazamento nos foles de ar, compressor desgastado, e corrosão nos contatos da ECU da suspensão (o módulo fica exposto a umidade). Ao notar altura irregular, ruído de compressor trabalhando demais ou luz de suspensão acesa, vale diagnóstico cedo.',
  },
  {
    severity: 'WARN',
    title: 'V8 Rover: válvulas "grudentas" por acúmulo de carbono são queixa comum',
    body: 'É comum relato de válvulas ficando "pegajosas" (sticky valves) por acúmulo excessivo de carbono no V8 Rover 4.0/4.6, causando marcha lenta irregular e perda de suavidade do motor. Uso de combustível de qualidade e troca de óleo em dia ajuda a reduzir esse acúmulo.',
  },
  {
    severity: 'WARN',
    title: 'Maioria das falhas elétricas envolve o sistema de segurança/imobilizador',
    body: 'No P38A, boa parte dos problemas elétricos relatados está ligada ao sistema de segurança — imobilizador de motor e trava eletrônica dando falso positivo e impedindo a partida. Antes de suspeitar de bateria ou motor de arranque, vale checar o sistema de imobilizador/alarme.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Range Rover P38A 1994-2002 (V8 4.0/4.6 gasolina ou 2.5 TD BMW diesel)',
    body: '10.000 km (ou 5.000 km em uso urbano intenso/off-road pesado) — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo no diesel 2.5 TD (motor interferente). | 20.000 km — Inspeção da suspensão a ar: vazamento nos foles, ruído do compressor, corrosão nos contatos da ECU. | 20.000 km — Verificação do sistema de imobilizador/alarme se houver dificuldade recorrente de partida. | 10.000 km — Graxa nas articulações/juntas homocinéticas.',
  },
]

// ---------- 2002-2012 (L322 — V8 BMW M62 4.4 até 2005/06, depois V8 Jaguar e TDV8 3.6 diesel) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: '2002-2005/06: V8 4.4 é o BMW M62 — peças cruzam com BMW 540i, 740i e X5',
    body: 'Nos primeiros anos do L322 (2002 até 2005/2006) o motor V8 4.4 é o BMW M62TU, o mesmo usado no BMW 540i (E39), 740i (E38) e X5 4.4i/4.6is da época. Corrente de distribuição, kit de selos de VANOS e bobinas de ignição são intercambiáveis com peças desses BMW — útil para achar peça genuína equivalente por um preço melhor.',
  },
  {
    severity: 'OK',
    title: 'A partir de 2005/06 o V8 passa a ser de origem Jaguar — não confunda peça de motor',
    body: 'A partir do facelift de 2005/2006 o L322 trocou o V8 BMW pelo V8 de origem Jaguar (4.4 aspirado e 4.2 Supercharged). Ao comprar peça de motor (junta, corrente, bomba d\'água), confirme o ano exato do seu chassi antes — peça do BMW M62 não serve no V8 Jaguar e vice-versa.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão a ar: falha de compressor é o problema mais recorrente do L322',
    body: 'A causa mais comum de falha do compressor da suspensão a ar é vazamento em algum dos foles — o compressor entra em ciclo curto tentando compensar e acaba superaquecendo/queimando. Ao notar o carro baixo pela manhã, demorando muito para subir, ou ruído forte de motor do compressor vindo do porta-malas, resolva o vazamento primeiro; trocar só o compressor sem eliminar o vazamento condena a peça nova rapidamente.',
  },
  {
    severity: 'WARN',
    title: 'TDV8 3.6 diesel (2007+): turbo e válvula EGR são os itens caros mais discutidos',
    body: 'No motor diesel TDV8 3.6, os problemas mais comentados e caros envolvem a turbina e a válvula EGR — em geral o dano na turbina é consequência de EGR ou injetor já com defeito há tempo. EGR que não fecha direito ou sensor de posição errado costuma causar marcha lenta instável; balanceamento de injetor ruim também gera instabilidade do motor. Mangueiras do intercooler rachando é falha simples e barata; junta do cabeçote é rara e associada a uso severo/manutenção atrasada.',
  },
  {
    severity: 'WARN',
    title: 'V8 4.4 BMW (2002-2005): perda de potência e marcha lenta irregular têm causas conhecidas',
    body: 'Perda de potência e funcionamento irregular no V8 4.4 dessa fase costumam vir de vazamento de vácuo, corrente de distribuição desgastada, catalisador saturado, bomba de combustível fraca ou válvula EGR com defeito. Vale checar esses pontos em sequência antes de assumir reparo de motor maior.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL confirmado no Brasil — vazamento nos tubos flexíveis do freio dianteiro (Vogue 2005-2012)',
    body: 'A Land Rover Brasil convocou proprietários do Range Rover Vogue fabricado entre março de 2005 e julho de 2012 (chassi de SALLMAM546A198146 a SALLMAMJ3CA393639) para substituição dos tubos flexíveis do sistema de freio dianteiro — foi identificado risco de vazamento de fluido de freio. Reparo gratuito em concessionária. Confira se o chassi do seu carro está na faixa informada em www.landrover.com.br/ownership/recall.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma Range Rover L322 2002-2012 (V8 BMW/Jaguar gasolina ou TDV8 3.6 diesel)',
    body: '10.000 km — Troca de óleo do motor sintético + filtro. | 60.000 km/5 anos — Corrente/kit de distribuição conforme o motor (BMW M62 até 2005/06, Jaguar depois). | 20.000 km — Verificação da suspensão a ar: procurar vazamento nos foles ANTES de trocar o compressor. | 20.000 km — TDV8 diesel: checar EGR, turbina e mangueiras do intercooler. | Sempre — abastecer diesel só em posto de confiança. | Verificar recall dos tubos flexíveis de freio (Vogue 2005-2012) pelo chassi em landrover.com.br/ownership/recall.',
  },
]

// ---------- 2013-2021 (L405 — monobloco em alumínio, SDV8 4.4 diesel, V8 5.0 Supercharged, P400e híbrido) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Carroceria monobloco em alumínio: reparo de lataria exige oficina especializada nesse material',
    body: 'A partir dessa geração a carroceria é monobloco em alumínio — bem mais leve que a estrutura em aço/alumínio híbrida do L322 anterior. Após qualquer batida, reparo de lataria precisa de oficina com equipamento e certificação específicos para alumínio; solda e técnica de reparo são diferentes do aço convencional, e oficina genérica sem esse preparo pode comprometer a estrutura.',
  },
  {
    severity: 'OK',
    title: '5.0 Supercharged: óleo em dia protege a corrente de distribuição',
    body: 'A corrente de distribuição secundária (que aciona os comandos de admissão) do V8 5.0 Supercharged é sensível a atraso de troca de óleo — óleo degradado ou baixo priva os tensionadores hidráulicos de lubrificação e acelera o desgaste, causando chiado/ronco no motor frio. Cumprir o intervalo de troca à risca é a forma mais barata de evitar reparo caro nesse item.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão a ar: compressor Wabco sofre corte térmico por vazamento no fole — mesmo padrão de gerações anteriores',
    body: 'O compressor Wabco da suspensão a ar entra em corte por superaquecimento quando algum fole está vazando e o compressor fica ciclando sem parar tentando manter a altura. É o mesmo padrão de falha que já aparece nas gerações anteriores do Range Rover — sinais: carro baixo e demorando para subir na partida, ruído de motor "cansado" vindo de baixo do porta-malas, luz de suspensão acesa, ou carro assentado nos batentes em falha total. Resolva o vazamento antes de trocar o compressor.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de distribuição do 5.0 Supercharged: chiado/ronco a frio indica tensionador gasto',
    body: 'Ruído de corrente batendo ou chiando na partida a frio no V8 5.0 Supercharged costuma indicar desgaste do tensionador/guias da corrente secundária. Esse desgaste é agravado por troca de óleo atrasada ou uso de óleo fora da especificação — não é defeito raro nessa geração.',
  },
  {
    severity: 'WARN',
    title: 'Central multimídia e módulos eletrônicos: telas piscando, comandos travando, sensores falhando',
    body: 'É comum relato de tela da central multimídia piscando (falha do módulo de controle), volume/AC/USB sem resposta (geralmente módulo BCM ou fusível), lentidão/travamento do sistema InControl Touch Pro, e mau funcionamento de sensor de estacionamento, câmera ou trava elétrica com o tempo de uso. Antes de assumir defeito grave, um diagnóstico eletrônico completo costuma isolar bem o módulo culpado.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL confirmado no Brasil — mangueira de vácuo do sistema de freio (Vogue 2013-2014)',
    body: 'A Land Rover convocou o Range Rover Vogue (2013-2014) — junto com o Range Rover Sport (2014-2015) — para inspeção e possível substituição de uma mangueira de vácuo do sistema de freio. Reparo gratuito em concessionária. Confira se o seu chassi está na campanha em www.landrover.com.br/ownership/recall.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL confirmado no Brasil — pré-tensionador do cinto de segurança dianteiro (Vogue 2016/2017)',
    body: 'A Land Rover Brasil convocou o Range Rover Vogue fabricado entre 12/07/2016 e 26/10/2016 (chassi de SALGS2EF7GA304537 a SALGS2FK1HA320598) para inspeção e possível substituição do conjunto pré-tensionador do cinto de segurança dianteiro — havia risco do equipamento não acionar em uma colisão. Reparo gratuito, leva cerca de 30 minutos. Confira o chassi em www.landrover.com.br/ownership/recall ou ligue 0800 012 2733.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma Range Rover L405 2013-2021 (SDV8 4.4 diesel, V8 5.0 Supercharged ou P400e híbrido)',
    body: '10.000-15.000 km conforme motor — Troca de óleo do motor + filtro, NUNCA atrasar no 5.0 Supercharged (protege a corrente de distribuição). | 20.000 km — Verificação da suspensão a ar: procurar vazamento no fole antes de mexer no compressor. | Anual — Diagnóstico eletrônico completo dos módulos (central multimídia, BCM, sensores). | 40.000 km — Fluido de freio e filtro de ar/cabine. | Após qualquer batida — reparo de lataria só em oficina certificada para alumínio. | Verificar recalls (mangueira de vácuo do freio 2013-2014, pré-tensionador do cinto 2016/2017) pelo chassi em landrover.com.br/ownership/recall.',
  },
]

// ---------- 2022-atual (L460 — plataforma MLA-Flex, V8 4.4 biturbo BMW, híbrido/PHEV) ----------
const MACETES_G4: TipInput[] = [
  {
    severity: 'OK',
    title: 'Novo V8 4.4 biturbo é de origem BMW — substitui o antigo V8 5.0 Jaguar',
    body: 'Nessa geração o Range Rover deixou de usar o V8 5.0 de origem Jaguar e passou a usar um novo V8 4.4 biturbo de origem BMW, além de motor 6 cilindros diesel/gasolina mild-hybrid. É um motor novo na linha Range Rover — ainda com pouco histórico de falha documentado no Brasil, então vale redobrar atenção ao cronograma oficial de manutenção nos primeiros anos.',
  },
  {
    severity: 'OK',
    title: 'PHEV (P440e/P460e/P510e/P550e): mantenha a carga entre 30% e 80% no dia a dia',
    body: 'Para preservar a bateria de 38,2 kWh no longo prazo, evite deixar o carro sempre com carga em 100% ou totalmente descarregado — mantenha entre 30% e 80% no uso diário e reserve a carga completa para viagens longas. Evite também depender de carregamento rápido DC (CC) com frequência excessiva; ele gera mais calor nas células do que o carregador AC de parede. A bateria tem garantia de 6 anos/100.000 km.',
  },
  {
    severity: 'OK',
    title: 'Plataforma MLA-Flex é compartilhada com o novo Defender',
    body: 'A partir dessa geração o Range Rover passou a usar a plataforma MLA-Flex, a mesma estrutura modular do Defender atual. Isso não significa peça de carroceria compartilhada, mas oficinas já familiarizadas com o Defender novo tendem a ter mais experiência acumulada com essa base mecânica.',
  },
]

const PROBLEMAS_G4: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL confirmado no Brasil — corrosão no conector do airbag (clockspring)',
    body: 'A Land Rover confirmou recall para o Range Rover 2022-2026, dentro de uma campanha maior que também inclui o Defender 2020-2026 e o Discovery 2021-2026: corrosão pode se desenvolver no conector "clockspring" do sistema de airbag, aumentando a resistência elétrica do circuito e podendo impedir o acionamento do airbag em uma colisão. O reparo (aplicação de gel lubrificante protetor no conector) é gratuito. Confira o chassi em www.landrover.com.br/ownership/recall ou consulte uma concessionária — não adie essa verificação.',
  },
  {
    severity: 'OK',
    title: 'Geração ainda recente: poucos padrões de falha crônica documentados até agora',
    body: 'Por ser uma geração lançada em 2022, ainda não há grande volume de relatos de falha crônica em alta quilometragem como existe para P38A, L322 e L405. O ponto de atenção histórico da família Range Rover — falha de suspensão a ar por vazamento no fole/compressor — é o item mais plausível de repetir também nessa geração; vale ficar atento aos mesmos sinais (carro baixo, demora para subir, ruído de compressor).',
  },
]

const MANUTENCAO_G4: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Range Rover L460 2022+ (V8 4.4 biturbo, 6cc diesel/gasolina mild-hybrid ou PHEV)',
    body: '15.000 km ou conforme indicador de vida do óleo — Troca de óleo do motor + filtro. | 20.000 km — Verificação da suspensão a ar (altura em repouso, ruído do compressor). | PHEV — manter carga entre 30-80% no uso diário, evitar DC rápido em excesso. | Anual — Diagnóstico eletrônico completo (módulos/conectores, incluindo verificação do recall do conector do airbag). | 40.000 km — Fluido de freio e filtro de ar/cabine.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Range Rover', yearFrom: 1994, yearTo: 2002, tireSize: '235/70 R16 (referência)', frontPsi: 30, rearPsi: 35, frontPsiLoad: 36, rearPsiLoad: 42, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual do proprietário — a pressão traseira costuma ser maior por causa do peso do carro.' },
  { modelName: 'Range Rover', yearFrom: 2002, yearTo: 2012, tireSize: '255/55 R19 ou 275/40 R20 conforme versão', frontPsi: 32, rearPsi: 38, frontPsiLoad: 38, rearPsiLoad: 44, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — a suspensão a ar pode exigir recalibração junto com o ajuste de altura.' },
  { modelName: 'Range Rover', yearFrom: 2013, yearTo: 2021, tireSize: '255/60 R18 ou 275/45 R21 conforme versão', frontPsi: 34, rearPsi: 38, frontPsiLoad: 38, rearPsiLoad: 44, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — a suspensão a ar pode exigir recalibração junto com o ajuste de altura.' },
  { modelName: 'Range Rover', yearFrom: 2022, yearTo: null, tireSize: '275/45 R21 ou 285/45 R22 conforme versão', frontPsi: 36, rearPsi: 39, frontPsiLoad: 39, rearPsiLoad: 44, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta — versões PHEV são mais pesadas por causa da bateria e podem pedir pressão levemente maior. Muitas versões não trazem estepe.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Range Rover', yearFrom: 1994, yearTo: 2002, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Reduzir para 5.000 km em uso urbano intenso/off-road pesado.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Range Rover', yearFrom: 1994, yearTo: 2002, component: 'Kit de correia de distribuição (diesel 2.5 TD BMW M51)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Range Rover', yearFrom: 1994, yearTo: 2002, component: 'Inspeção da suspensão a ar (foles, compressor, ECU)', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Range Rover', yearFrom: 1994, yearTo: 2002, component: 'Verificação do sistema de imobilizador/alarme', intervalKm: null, intervalMonths: 12, notes: 'Principal causa de falha elétrica reportada.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Range Rover', yearFrom: 2002, yearTo: 2012, component: 'Óleo do motor sintético + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'V8 BMW/Jaguar gasolina ou TDV8 3.6 diesel.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Range Rover', yearFrom: 2002, yearTo: 2012, component: 'Corrente/kit de distribuição', intervalKm: 60000, intervalMonths: 60, notes: 'BMW M62 até 2005/06, Jaguar depois.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Range Rover', yearFrom: 2002, yearTo: 2012, component: 'Verificação da suspensão a ar (foles antes do compressor)', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'Range Rover', yearFrom: 2002, yearTo: 2012, component: 'EGR, turbina e mangueiras do intercooler (TDV8 diesel)', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'Range Rover', yearFrom: 2002, yearTo: 2012, component: 'Verificação de recall — tubos flexíveis do freio (Vogue 2005-2012)', intervalKm: null, intervalMonths: null, notes: 'Consultar chassi em landrover.com.br/ownership/recall.', priority: 'CRITICAL', order: 8 },
  { modelName: 'Range Rover', yearFrom: 2013, yearTo: 2021, component: 'Óleo do motor + filtro', intervalKm: 15000, intervalMonths: 12, notes: 'NUNCA atrasar no 5.0 Supercharged — protege a corrente de distribuição.', priority: 'CRITICAL', order: 9 },
  { modelName: 'Range Rover', yearFrom: 2013, yearTo: 2021, component: 'Verificação da suspensão a ar (foles antes do compressor)', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'Range Rover', yearFrom: 2013, yearTo: 2021, component: 'Diagnóstico eletrônico completo (módulos/conectores)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 11 },
  { modelName: 'Range Rover', yearFrom: 2013, yearTo: 2021, component: 'Fluido de freio e filtro de ar/cabine', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 12 },
  { modelName: 'Range Rover', yearFrom: 2013, yearTo: 2021, component: 'Verificação de recalls (mangueira de vácuo 2013-2014, pré-tensionador do cinto 2016/2017)', intervalKm: null, intervalMonths: null, notes: 'Consultar chassi em landrover.com.br/ownership/recall.', priority: 'CRITICAL', order: 13 },
  { modelName: 'Range Rover', yearFrom: 2022, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 15000, intervalMonths: 12, notes: 'Ou conforme indicador de vida do óleo.', priority: 'CRITICAL', order: 14 },
  { modelName: 'Range Rover', yearFrom: 2022, yearTo: null, component: 'Verificação da suspensão a ar', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 15 },
  { modelName: 'Range Rover', yearFrom: 2022, yearTo: null, component: 'Gestão de carga da bateria (PHEV)', intervalKm: null, intervalMonths: null, notes: 'Manter entre 30-80% no uso diário; evitar DC rápido em excesso.', priority: 'MEDIUM', order: 16 },
  { modelName: 'Range Rover', yearFrom: 2022, yearTo: null, component: 'Verificação de recall — conector do airbag (clockspring)', intervalKm: null, intervalMonths: null, notes: 'Consultar chassi em landrover.com.br/ownership/recall.', priority: 'CRITICAL', order: 17 },
  { modelName: 'Range Rover', yearFrom: 2022, yearTo: null, component: 'Diagnóstico eletrônico completo', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 18 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Range Rover', yearFrom: 1994, yearTo: 2002, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Range Rover', yearFrom: 2002, yearTo: 2012, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Range Rover', yearFrom: 2013, yearTo: 2021, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
  { modelName: 'Range Rover', yearFrom: 2022, yearTo: null, MACETES: MACETES_G4, PROBLEMAS: PROBLEMAS_G4, MANUTENCAO: MANUTENCAO_G4 },
]

async function main() {
  console.log('🚗 Seed Land Rover Range Rover...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Land Rover', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Land Rover', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Range Rover', brandId: brand.id } },
    update: {}, create: { name: 'Range Rover', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Range Rover' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Range Rover' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Range Rover' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Land Rover Range Rover concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
