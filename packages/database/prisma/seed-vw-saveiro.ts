/**
 * Seed Volkswagen Saveiro — macetes, problemas, manutenção e calibragem
 * Picape compacta derivada do Gol, vendida continuamente no Brasil desde
 * julho de 1982 — uma das picapes mais antigas em produção ininterrupta do
 * país. Cobrimos dois nameplates distintos, cada um com seu próprio
 * VehicleModel:
 *  - "Saveiro": linha principal, 7 blocos de geração (1982-1997 "quadrada",
 *    1997-2005 "bolinha" G2/G3, 2005-2009 G4, 2009-2013 G5, 2013-2016 G6
 *    1ª fase, 2016-2023 G6 2ª fase/EA211, 2023-atual facelift).
 *  - "Grand Saveiro": versão rara de entre-eixos estendido (Street/XTreme),
 *    conversão artesanal feita pela concessionária Sopave (SP) em 2001-2002,
 *    vendida pela rede Volkswagen — não é um trim de fábrica convencional.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-saveiro
 *
 * Fontes: blogauto.com.br, carrosegaragem.com.br, autoentusiastas.com.br,
 *         carroscomcamanzi.com.br, autopapo.com.br, motorshow.com.br,
 *         autoo.com.br, terra.com.br, carro.blog.br, reclameaqui.com.br,
 *         calibragemdepneu.com.br, procon.sp.gov.br, parallelum.com.br/fipe
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── SAVEIRO 1982-1997 — 1ª geração "Quadrada" ─────────────────────────────
const MACETES_82: TipInput[] = [
  { severity: 'OK', title: 'Mecânica simples, sem eletrônica — manutenção caseira é viável', body: 'A Saveiro "quadrada" usa motor a álcool/gasolina com carburador (injeção eletrônica só chegou perto do fim dessa fase) e nenhuma eletrônica embarcada de motor. Regulagem, troca de peça e ajuste básico podem ser feitos por qualquer mecânico de bairro ou dono com prática — não depende de scanner nem software de concessionária.' },
  { severity: 'OK', title: 'Peça mecânica ainda fácil de achar, mesmo em exemplar com mais de 40 anos', body: 'Por ter vendido em volume grande e compartilhar mecânica com o Gol da mesma época, peça básica de motor, embreagem e suspensão da Saveiro quadrada ainda é encontrada com relativa facilidade em desmanches e lojas de autopeças populares.' },
  { severity: 'OK', title: 'Motor a álcool: dê partida a frio com o afogador/ignição corretos', body: 'Em exemplar movido a álcool com carburador, a partida a frio depende do afogador (ou do sistema de partida a frio, em versões com ele) funcionando bem. Se o carro "engasgar" para pegar de manhã, esse é o primeiro ponto a checar antes de suspeitar de motor de arranque ou bateria.' },
]
const PROBLEMAS_82: TipInput[] = [
  { severity: 'WARN', title: 'Corrosão estrutural é o principal risco em exemplar de uso comercial', body: 'Picape usada para trabalho por décadas acumula corrosão na caçamba, assoalho e longarinas, agravada por transporte de carga úmida ou produtos corrosivos. Antes de comprar um exemplar dessa geração, inspecione bem por baixo do carro — ferrugem estrutural nesse tipo de veículo é mais comum que em carro de passeio equivalente.' },
  { severity: 'WARN', title: 'Vazamento de óleo pela tampa de válvulas, retentor ou junta do cabeçote', body: 'Vazamento de óleo é queixa comum em motor dessa idade, seja pela tampa de válvulas, retentor do virabrequim ou junta do cabeçote ressecada. Verifique manchas no chão e o nível de óleo com regularidade — vazamento pequeno não tratado vira consumo alto de óleo com o tempo.' },
  { severity: 'WARN', title: 'Chicote elétrico e conexões degradados pela idade', body: 'Fiação e conectores de mais de 30-40 anos costumam ressecar, oxidar ou apresentar mau contato, causando falhas intermitentes de luz, painel ou ignição. Problema elétrico "fantasma" que some e volta sozinho costuma ter origem em conexão degradada, não em peça nova com defeito.' },
]
const MANUTENCAO_82: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Saveiro 1982-1997 (motor carburado)', body: '5.000 km — Troca de óleo do motor + filtro (motor carburado antigo pede intervalo mais curto que motor moderno). | 5.000 km — Regulagem de carburador e ponto de ignição. | 10.000 km — Inspeção de freios, suspensão e vazamentos de óleo/fluido. | 20.000 km — Velas e platinado/cabos de ignição (conforme o ano/motor). | A cada revisão — Inspeção visual de corrosão no assoalho e caçamba, principalmente em uso comercial.' },
]

// ─── SAVEIRO 1997-2005 — 2ª/3ª geração "Bolinha" (G2/G3) ──────────────────
const MACETES_97: TipInput[] = [
  { severity: 'OK', title: 'Motor AP: reputação de robustez e peça farta em qualquer cidade', body: 'O motor AP (1.6/1.8/2.0, a partir de 1997 com injeção eletrônica multiponto em boa parte da linha) construiu fama de durável e simples de manter — peça original e alternativa é fácil de achar em praticamente qualquer oficina do país, o que barateia a manutenção mesmo hoje.' },
  { severity: 'OK', title: 'Capacidade de carga cresceu para 700 kg nessa geração', body: 'A caçamba foi ampliada (mais de 860 litros) e a capacidade de carga subiu para cerca de 700 kg em relação à geração anterior. Ao carregar a picape perto do limite, reforce a calibragem dos pneus traseiros — ver seção de calibragem — para não rodar com o pneu murcho sob peso.' },
  { severity: 'OK', title: 'Injeção eletrônica multiponto trouxe partida a frio mais confiável', body: 'A partir da injeção eletrônica multiponto, a partida a frio (inclusive a álcool) ficou bem mais consistente que nas versões carburadas anteriores. Se o motor ainda assim engasgar para pegar frio, o mais provável é sonda lambda, bico injetor sujo ou bateria fraca — não é característica normal do motor.' },
]
const PROBLEMAS_97: TipInput[] = [
  { severity: 'WARN', title: 'Trepidação dianteira perto de 80 km/h — checar junta homocinética e balanceamento', body: 'Relato recorrente de trepidação na dianteira justamente perto de 80 km/h. Antes de suspeitar de algo maior no motor, cheque balanceamento das rodas e o estado das juntas homocinéticas do semieixo — causa mais comum na prática.' },
  { severity: 'WARN', title: 'Embreagem desgasta mais rápido em uso comercial com carga', body: 'Picape usada para carregar carga com frequência desgasta o kit de embreagem bem mais rápido que uso só de passeio. Se notar patinação ao acelerar em subida carregada ou embreagem "alta", não adie a inspeção — rodar assim acelera o dano no volante e no cárter de direção.' },
]
const MANUTENCAO_97: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Saveiro 1997-2005 (motor AP)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de embreagem e freios (redobre a atenção em uso com carga). | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada (motor interferente, não atrase).' },
]

// ─── SAVEIRO 2005-2009 — 4ª geração (G4) ──────────────────────────────────
const MACETES_05: TipInput[] = [
  { severity: 'OK', title: 'Total Flex chegou nessa geração — atenção redobrada ao etanol puro no frio', body: 'A tecnologia Total Flex (bicombustível gasolina/etanol) se popularizou na Saveiro G4. Em dias muito frios, dar partida com tanque cheio de etanol puro pode ser mais difícil — o sistema de partida a frio auxiliar (com reservatório de gasolina) precisa estar em boas condições; se notar dificuldade de partida no frio, esse é o primeiro item a checar.' },
  { severity: 'OK', title: 'Versões City, Sportline e Crossover: identifique a trim antes de procurar peça', body: 'A G4 foi vendida nas versões City, Sportline e Crossover, com motor 1.6 (até 99 cv) e 1.8 (até 106 cv) flex. Peça de acabamento e alguns itens de suspensão variam conforme a versão — confirme a trim exata ao procurar peça específica.' },
]
const PROBLEMAS_05: TipInput[] = [
  { severity: 'WARN', title: 'Suspensão traseira desgasta mais rápido com uso de carga constante', body: 'Uso comercial com carga frequente próxima do limite acelera o desgaste de amortecedores e buchas da suspensão traseira. Ruído seco em lombada ou traseira "balançando" depois de passar por buraco são sinais de alerta — não são normais mesmo em picape de trabalho.' },
  { severity: 'WARN', title: 'Vela de ignição do motor flex de 1ª geração pede troca mais frequente com etanol', body: 'Motor flex das primeiras gerações tende a pedir troca de vela um pouco antes do intervalo "padrão" quando rodado predominantemente com etanol. Não é defeito, é característica do combustível — sintoma de vela gasta é falha leve na aceleração ou consumo maior.' },
]
const MANUTENCAO_05: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Saveiro 2005-2009 (Total Flex 1.6/1.8)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e suspensão traseira (uso com carga acelera o desgaste). | 20.000 km — Filtro de ar. | 30.000 km — Velas de ignição (redobre atenção com uso intenso de etanol). | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada.' },
]

// ─── SAVEIRO 2009-2013 — 5ª geração (G5) ──────────────────────────────────
const MACETES_09: TipInput[] = [
  { severity: 'OK', title: 'Redesenho completo: motor passou a ser transversal', body: 'A G5 (lançada no fim de 2009) trouxe plataforma, design e mecânica totalmente renovados em relação à geração anterior — o motor passou a ser montado transversalmente. Peça de suspensão e motor da G4 não serve mais; confirme sempre a geração exata ao comprar peça.' },
  { severity: 'OK', title: 'Saveiro Cross (a partir de 2011) tem visual elevado, mas não é 4x4', body: 'A versão Cross, lançada nessa geração, tem suspensão com visual mais elevado, para-choques reforçados e apelo aventureiro — mas segue com tração dianteira simples, sem sistema 4x4. Não trate a Cross como picape off-road de verdade em terreno pesado.' },
]
const PROBLEMAS_09: TipInput[] = [
  { severity: 'WARN', title: 'Embreagem: desgaste acelerado segue sendo queixa comum em uso comercial', body: 'Assim como em gerações anteriores, uso comercial com carga frequente desgasta a embreagem bem antes do intervalo esperado para uso só de passeio. Evite arrancar em subida "segurando" o carro só com a embreagem — use o freio de mão para isso.' },
  { severity: 'WARN', title: 'Ruído de suspensão em piso irregular', body: 'Há relatos de ruído vindo da suspensão dianteira/traseira em pisos irregulares e lombadas. Se o barulho for recorrente, peça inspeção de buchas, amortecedores e batentes — não é normal mesmo em picape usada para trabalho.' },
]
const MANUTENCAO_09: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Saveiro 2009-2013 (EA111 1.6 Total Flex)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de embreagem, freios e suspensão. | 20.000 km — Filtro de ar e filtro de cabine (versões equipadas). | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada (motor interferente).' },
]

// ─── SAVEIRO 2013-2016 — 6ª geração, 1ª fase (G6) ─────────────────────────
const MACETES_13: TipInput[] = [
  { severity: 'OK', title: 'Cabine dupla chegou em 2014 — opção real para quem carrega gente e carga', body: 'A partir de 2014 a Saveiro passou a oferecer versão de cabine dupla, com banco traseiro para até três pessoas — antes disso, transportar mais de dois ocupantes exigia adaptações não homologadas. Se o uso combina carga e passageiros, vale considerar essa versão em vez de gambiarra no banco.' },
  { severity: 'OK', title: 'Controle de estabilidade passou a equipar a linha', body: 'Essa geração trouxe controle eletrônico de estabilidade (ESC) para a linha Saveiro, item relevante de segurança principalmente em picape carregada, que tem comportamento diferente do carro vazio em curva ou frenagem de emergência.' },
]
const PROBLEMAS_13: TipInput[] = [
  { severity: 'DANGER', title: 'RECALL — pinça de freio traseira mal fixada (unidades 2013-2017)', body: 'A Volkswagen convocou recall para Saveiro produzida entre 17/06/2013 e 16/08/2017 (faixa de chassi não sequencial de EP035775 a JP100759, ~185.797 unidades, ano/modelo 2014 a 2018) por falha na fixação dos elementos de montagem da pinça de freio traseira — risco de a pinça se soltar em movimento, com travamento de roda e ruído de frenagem. Reparo gratuito na concessionária, leva cerca de 40 minutos. Se seu exemplar está nessa faixa e nunca passou pelo recall, confira o chassi no site da Volkswagen ou ligue 0800 019 8866.' },
  { severity: 'WARN', title: 'Embreagem: uso comercial intenso continua sendo o maior fator de desgaste', body: 'Segue valendo o padrão das gerações anteriores — uso comercial/carga frequente desgasta o kit de embreagem bem antes do previsto para uso só de passeio. Dirija suave em arrancadas com carga e evite "segurar" o carro em rampa só com a embreagem.' },
]
const MANUTENCAO_13: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Saveiro 2013-2016 (G6, 1ª fase)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios (confira se o recall de pinça traseira já foi feito) e embreagem. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada.' },
]

// ─── SAVEIRO 2016-2023 — 6ª geração, 2ª fase (EA211) ──────────────────────
const MACETES_16: TipInput[] = [
  { severity: 'OK', title: 'Motor EA211 1.6 16V passou a ser o único disponível, com 120 cv', body: 'A partir da reestilização de 2016 (pico na linha 2017), a Saveiro padronizou o motor EA211 1.6 16V Total Flex, com 120 cv e 16,8 kgfm — o mais potente já usado no modelo até então. Frente mais robusta e painel redesenhado, com central multimídia disponível conforme a versão.' },
  { severity: 'OK', title: 'Várias linhas de acabamento: Trendline, Highline, Cross, Robust, Pepper', body: 'Essa geração teve muitas versões de acabamento ao longo dos anos (Trendline, Highline, Cross, Robust, Pepper, edições especiais como Rock in Rio). Confirme sempre a versão exata ao procurar peça de acabamento específica — a mecânica de base é compartilhada, mas detalhe de trim varia.' },
]
const PROBLEMAS_16: TipInput[] = [
  { severity: 'WARN', title: 'Desgaste de pastilha e disco de freio mais rápido que o esperado', body: 'Há relatos de proprietários sobre desgaste acelerado de pastilhas e discos de freio. Fique atento a ruído de frenagem ou pedal "fundo" antes do previsto e considere inspecionar antes do intervalo padrão se notar esses sinais — mais ainda em uso com carga frequente.' },
  { severity: 'WARN', title: 'Ruído na direção/suspensão dianteira em piso irregular', body: 'Proprietários relatam ruído na caixa de direção e suspensão dianteira ao passar por piso irregular. Vale checar coifas, terminais de direção e buchas na revisão — desgaste prematuro nesses itens não é incomum nessa geração.' },
  { severity: 'WARN', title: 'Embreagem segue como item de desgaste sensível em uso comercial', body: 'O padrão histórico do modelo se mantém — embreagem tende a durar menos em uso comercial com carga frequente. Considere inspeção antecipada se notar patinação ou pedal com curso estranho.' },
]
const MANUTENCAO_16: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Saveiro 2016-2023 (EA211 1.6 16V 120cv)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios (pastilhas/discos) e embreagem. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Correia dentada (motor interferente) — confirme se sua versão não passou para corrente, verificando o manual.' },
]

// ─── SAVEIRO 2023-atual — facelift (ago/2023) ─────────────────────────────
const MACETES_23: TipInput[] = [
  { severity: 'OK', title: 'Facelift de agosto de 2023: frente redesenhada, mesma base mecânica', body: 'A reestilização de agosto de 2023 trouxe frente com novo desenho de para-choque e grade, além de painel atualizado — a base mecânica (motor 1.6 16V Total Flex) segue a mesma da fase anterior. Peça de mecânica pesada (motor, câmbio, suspensão) da geração 2016-2023 costuma servir; peça de acabamento dianteiro, não.' },
]
const PROBLEMAS_23: TipInput[] = [
  { severity: 'DANGER', title: 'RECALL — airbag frontal do passageiro incorreto (unidades 2023-2025)', body: 'Recall aberto em 23/09/2025 para Saveiro, Nivus e Virtus fabricados entre 12/05/2022 e 22/11/2024 (ano/modelo 2023 a 2025): o airbag frontal do passageiro instalado pode não ser o componente correto para o modelo, oferecendo proteção inadequada em caso de colisão — risco de ferimento grave. A Volkswagen faz inspeção e, se necessário, substituição gratuita, procedimento de cerca de 1 hora. Confira pelo chassi no site oficial da Volkswagen ou pelo 0800 019 8866 se o seu exemplar está na faixa afetada.' },
  { severity: 'WARN', title: 'Relato de desgaste prematuro de embreagem em quilometragem baixa', body: 'Há reclamação registrada de proprietário de Saveiro Trendline 2023 com problema de embreagem já aos 14.000 km, com inspeção revelando platô quebrado. Se notar embreagem "alta", trepidação ou dificuldade de engate ainda no início de vida do carro, não normalize — leve para inspeção o quanto antes, mesmo dentro da garantia.' },
]
const MANUTENCAO_23: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Saveiro 2023-atual (facelift, EA211 1.6 16V)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e embreagem (fique atento a sinais precoces de desgaste). | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | A cada revisão — Confirme na concessionária se o recall de airbag do passageiro já foi verificado/atendido.' },
]

// ─── GRAND SAVEIRO 2001-2003 — conversão Sopave (Street/XTreme) ──────────
const MACETES_GS: TipInput[] = [
  { severity: 'OK', title: 'Não é um trim de fábrica: conversão artesanal da concessionária Sopave', body: 'A Grand Saveiro não foi um lançamento oficial de linha da Volkswagen, e sim uma conversão feita pela concessionária paulista Sopave (Sociedade Paulista de Veículos) em 2001-2002, com entre-eixos estendido em cerca de 28 cm a partir de uma Saveiro comum — vendida pela rede Volkswagen em pequena escala, nas versões Street (uso urbano, suspensão mais baixa, rodas 16") e XTreme (suspensão elevada, rodas 15", visual aventureiro). Saber disso ajuda a entender por que a peça de carroceria é rara.' },
  { severity: 'OK', title: 'Motor único: 2.0 AP injetado de 112 cv', body: 'Toda Grand Saveiro usou o motor 2.0 AP com injeção eletrônica e 112 cv — o mesmo motor, com a mesma disponibilidade de peça de reposição, das demais Saveiro 2.0 da época. A parte rara para achar é a peça específica da extensão de carroceria e da suspensão modificada, não a mecânica do motor em si.' },
  { severity: 'OK', title: 'Exemplar raro e colecionável — documente a procedência antes de comprar', body: 'Por ter sido produzida em escala pequena (conversão sob encomenda, não produção seriada), um exemplar Grand Saveiro hoje é praticamente um item de colecionador. Antes de comprar, confirme a procedência e, se possível, documentação da própria Sopave ou histórico de propriedade — facilita revenda e evita divergência de placa/chassi por modificação estrutural.' },
]
const PROBLEMAS_GS: TipInput[] = [
  { severity: 'WARN', title: 'Inspecione com atenção redobrada a solda da extensão de entre-eixos', body: 'A extensão de entre-eixos foi feita com corte na altura da coluna B e inserção de assoalho e reforços laterais adicionais — uma modificação estrutural real. Em exemplar com mais de duas décadas, vale inspecionar essa região com atenção especial a corrosão e fadiga de solda, algo que não existe na Saveiro comum de fábrica.' },
  { severity: 'WARN', title: 'Oficina com experiência específica no modelo é rara', body: 'Por ser um projeto de baixíssima escala, é difícil achar oficina ou mecânico com experiência prévia especificamente na Grand Saveiro. Para a mecânica do motor 2.0 AP, qualquer oficina que atenda Saveiro/Gol da época resolve — mas para questão estrutural da extensão, vale buscar recomendação específica ou clube de proprietários antigos.' },
]
const MANUTENCAO_GS: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Grand Saveiro (motor 2.0 AP)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão modificada e vazamentos. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada (motor interferente). | Anual — Inspeção visual da solda/reforço da extensão de entre-eixos, item exclusivo desse modelo.' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Saveiro', yearFrom: 1982, yearTo: 1997, MACETES: MACETES_82, PROBLEMAS: PROBLEMAS_82, MANUTENCAO: MANUTENCAO_82 },
  { modelName: 'Saveiro', yearFrom: 1997, yearTo: 2005, MACETES: MACETES_97, PROBLEMAS: PROBLEMAS_97, MANUTENCAO: MANUTENCAO_97 },
  { modelName: 'Saveiro', yearFrom: 2005, yearTo: 2009, MACETES: MACETES_05, PROBLEMAS: PROBLEMAS_05, MANUTENCAO: MANUTENCAO_05 },
  { modelName: 'Saveiro', yearFrom: 2009, yearTo: 2013, MACETES: MACETES_09, PROBLEMAS: PROBLEMAS_09, MANUTENCAO: MANUTENCAO_09 },
  { modelName: 'Saveiro', yearFrom: 2013, yearTo: 2016, MACETES: MACETES_13, PROBLEMAS: PROBLEMAS_13, MANUTENCAO: MANUTENCAO_13 },
  { modelName: 'Saveiro', yearFrom: 2016, yearTo: 2023, MACETES: MACETES_16, PROBLEMAS: PROBLEMAS_16, MANUTENCAO: MANUTENCAO_16 },
  { modelName: 'Saveiro', yearFrom: 2023, yearTo: null, MACETES: MACETES_23, PROBLEMAS: PROBLEMAS_23, MANUTENCAO: MANUTENCAO_23 },
  { modelName: 'Grand Saveiro', yearFrom: 2001, yearTo: 2003, MACETES: MACETES_GS, PROBLEMAS: PROBLEMAS_GS, MANUTENCAO: MANUTENCAO_GS },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Saveiro', yearFrom: 1982, yearTo: 1997, tireSize: '165/70 R13 · 175/70 R13 (referência)', frontPsi: 26, rearPsi: 28, frontPsiLoad: 28, rearPsiLoad: 34, sparePsi: 60, notes: 'Valor de referência para a época — confirme na etiqueta da coluna da porta ou manual do proprietário do exemplar.' },
  { modelName: 'Saveiro', yearFrom: 1997, yearTo: 2005, tireSize: '175/70 R13 · 185/65 R14 (referência)', frontPsi: 28, rearPsi: 30, frontPsiLoad: 30, rearPsiLoad: 36, sparePsi: 60, notes: 'Reforce a traseira ao carregar a caçamba perto do limite de 700 kg. Confirme na etiqueta da coluna da porta.' },
  { modelName: 'Saveiro', yearFrom: 2005, yearTo: 2009, tireSize: '185/65 R14 (referência)', frontPsi: 29, rearPsi: 30, frontPsiLoad: 30, rearPsiLoad: 36, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta. Com carga, priorize reforçar a pressão traseira.' },
  { modelName: 'Saveiro', yearFrom: 2009, yearTo: 2013, tireSize: '185/65 R14 · 205/60 R15 (Cross)', frontPsi: 29, rearPsi: 30, frontPsiLoad: 30, rearPsiLoad: 38, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — valor varia conforme aro/versão.' },
  { modelName: 'Saveiro', yearFrom: 2013, yearTo: 2016, tireSize: '175/70 R14 (CE) · 205/60 R15 (Cross)', frontPsi: 30, rearPsi: 31, frontPsiLoad: 30, rearPsiLoad: 39, sparePsi: 60, notes: 'Valor de fábrica para pneu 205/60 R15 — confirme sempre na etiqueta da coluna da porta, varia por versão/aro.' },
  { modelName: 'Saveiro', yearFrom: 2016, yearTo: 2023, tireSize: '175/70 R14 · 205/60 R15 (Cross/Robust)', frontPsi: 30, rearPsi: 31, frontPsiLoad: 30, rearPsiLoad: 39, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — valor varia por versão/aro (14" a 15").' },
  { modelName: 'Saveiro', yearFrom: 2023, yearTo: null, tireSize: '175/70 R14 · 205/60 R15 (referência)', frontPsi: 30, rearPsi: 32, frontPsiLoad: 30, rearPsiLoad: 40, sparePsi: 60, notes: 'Estimativa com base nas gerações recentes — confirme sempre o valor exato na etiqueta da coluna da porta do motorista.' },
  { modelName: 'Grand Saveiro', yearFrom: 2001, yearTo: 2003, tireSize: '195/60 R16 (Street) · 205/70 R15 (XTreme) — referência', frontPsi: 30, rearPsi: 32, frontPsiLoad: 32, rearPsiLoad: 40, sparePsi: 60, notes: 'Estimativa — veículo de conversão de baixíssima escala, sem etiqueta padrão de fábrica documentada. Confirme com o manual do exemplar específico ou clube de proprietários.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Saveiro', yearFrom: 1982, yearTo: 1997, component: 'Óleo do motor + filtro', intervalKm: 5000, intervalMonths: 6, notes: 'Motor carburado antigo pede intervalo mais curto.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Saveiro', yearFrom: 1982, yearTo: 1997, component: 'Regulagem de carburador e ponto de ignição', intervalKm: 5000, intervalMonths: 6, notes: null, priority: 'MEDIUM', order: 1 },
  { modelName: 'Saveiro', yearFrom: 1982, yearTo: 1997, component: 'Inspeção de corrosão (assoalho e caçamba)', intervalKm: null, intervalMonths: 12, notes: 'Mais crítico em uso comercial.', priority: 'HIGH', order: 2 },

  { modelName: 'Saveiro', yearFrom: 1997, yearTo: 2005, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 3 },
  { modelName: 'Saveiro', yearFrom: 1997, yearTo: 2005, component: 'Inspeção de embreagem', intervalKm: 10000, intervalMonths: null, notes: 'Uso com carga desgasta bem mais rápido.', priority: 'HIGH', order: 4 },
  { modelName: 'Saveiro', yearFrom: 1997, yearTo: 2005, component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: 'Motor interferente.', priority: 'CRITICAL', order: 5 },

  { modelName: 'Saveiro', yearFrom: 2005, yearTo: 2009, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 6 },
  { modelName: 'Saveiro', yearFrom: 2005, yearTo: 2009, component: 'Inspeção de suspensão traseira', intervalKm: 10000, intervalMonths: null, notes: 'Uso com carga constante acelera desgaste de amortecedores/buchas.', priority: 'HIGH', order: 7 },
  { modelName: 'Saveiro', yearFrom: 2005, yearTo: 2009, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor flex de 1ª geração — atenção com uso intenso de etanol.', priority: 'MEDIUM', order: 8 },

  { modelName: 'Saveiro', yearFrom: 2009, yearTo: 2013, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 9 },
  { modelName: 'Saveiro', yearFrom: 2009, yearTo: 2013, component: 'Inspeção de embreagem', intervalKm: 10000, intervalMonths: null, notes: 'Uso comercial reduz vida útil.', priority: 'HIGH', order: 10 },
  { modelName: 'Saveiro', yearFrom: 2009, yearTo: 2013, component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'CRITICAL', order: 11 },

  { modelName: 'Saveiro', yearFrom: 2013, yearTo: 2016, component: 'Verificação do recall de pinça de freio traseira', intervalKm: null, intervalMonths: null, notes: 'Unidades produzidas 17/06/2013 a 16/08/2017 — confira chassi na Volkswagen.', priority: 'CRITICAL', order: 12 },
  { modelName: 'Saveiro', yearFrom: 2013, yearTo: 2016, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 13 },
  { modelName: 'Saveiro', yearFrom: 2013, yearTo: 2016, component: 'Inspeção de embreagem', intervalKm: 10000, intervalMonths: null, notes: 'Uso comercial reduz vida útil.', priority: 'HIGH', order: 14 },

  { modelName: 'Saveiro', yearFrom: 2016, yearTo: 2023, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor EA211 1.6 16V.', priority: 'CRITICAL', order: 15 },
  { modelName: 'Saveiro', yearFrom: 2016, yearTo: 2023, component: 'Pastilhas e discos de freio — inspeção antecipada', intervalKm: 10000, intervalMonths: null, notes: 'Relatos de desgaste mais rápido que o esperado.', priority: 'MEDIUM', order: 16 },
  { modelName: 'Saveiro', yearFrom: 2016, yearTo: 2023, component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: 'Confirme no manual se sua versão não passou para corrente.', priority: 'CRITICAL', order: 17 },

  { modelName: 'Saveiro', yearFrom: 2023, yearTo: null, component: 'Verificação do recall de airbag do passageiro', intervalKm: null, intervalMonths: null, notes: 'Unidades produzidas 12/05/2022 a 22/11/2024 — confira chassi na Volkswagen.', priority: 'CRITICAL', order: 18 },
  { modelName: 'Saveiro', yearFrom: 2023, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 19 },
  { modelName: 'Saveiro', yearFrom: 2023, yearTo: null, component: 'Inspeção de embreagem', intervalKm: 10000, intervalMonths: null, notes: 'Relato de desgaste prematuro em quilometragem baixa.', priority: 'HIGH', order: 20 },

  { modelName: 'Grand Saveiro', yearFrom: 2001, yearTo: 2003, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.0 AP.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Grand Saveiro', yearFrom: 2001, yearTo: 2003, component: 'Inspeção estrutural da extensão de entre-eixos', intervalKm: null, intervalMonths: 12, notes: 'Item exclusivo desse modelo — checar solda/reforço.', priority: 'HIGH', order: 1 },
  { modelName: 'Grand Saveiro', yearFrom: 2001, yearTo: 2003, component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: 'Motor interferente.', priority: 'CRITICAL', order: 2 },
]

async function main() {
  console.log('🚗 Seed Volkswagen Saveiro...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  const modelNames = [...new Set(BLOCKS.map((b) => b.modelName))]

  for (const modelName of modelNames) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: modelName, brandId: brand.id } },
      update: {},
      create: { name: modelName, brandId: brand.id },
    })
  }

  await prisma.tip.deleteMany({ where: { modelName: { in: modelNames } } })

  for (const modelName of modelNames) {
    const blocksForModel = BLOCKS.filter((b) => b.modelName === modelName)
    let order = 0
    for (const block of blocksForModel) {
      const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
      const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
      await prisma.tip.createMany({
        data: allTips.map(({ cat, tip }) => ({
          modelName: block.modelName,
          category: cat,
          severity: tip.severity,
          title: tip.title,
          body: tip.body,
          yearFrom: block.yearFrom,
          yearTo: block.yearTo,
          order: order++,
        })),
      })
      console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
    }
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: { in: modelNames } } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? '...'})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: modelNames } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volkswagen Saveiro concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
