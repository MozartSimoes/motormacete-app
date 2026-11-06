/**
 * Seed Volkswagen Polo — macetes, problemas, manutenção e calibragem
 * Cobre 3 gerações reais vendidas no Brasil sob o nome "Polo":
 *  1) Polo Classic (1997-2002) — sedã importado da Argentina, motor 1.8 AP,
 *     substituiu Voyage/Logus/Pointer como intermediário da VW.
 *  2) Polo nacional (2002-2014) — hatch e sedã fabricados em São Bernardo do
 *     Campo (SP), motores 1.0/1.6 EA111 e 1.8 20V Turbo (GTI)/2.0 (GT/Sportline),
 *     câmbio manual e, a partir de ~2010, automatizado I-Motion.
 *  3) Novo Polo (desde 2018, plataforma MQB) — motores 1.0 MPI, 1.0 TSI 128cv
 *     e 1.4 TSI 150cv (GTS), câmbio manual ou automático Aisin de 6 marchas
 *     (não é DSG — solução exclusiva do Brasil), facelift em 2023 (Track/Robust).
 *     Compartilha plataforma com o Virtus (sedã irmão).
 * Execute: pnpm --filter @motormacete/database db:seed:vw-polo
 *
 * Fontes: parallelum.com.br/fipe (códigos e anos FIPE), mercadolivre.com.br/blog,
 *         motorshow.com.br, seucarrousado.com.br, brasilacelera.com.br,
 *         oficinabrasil.com.br, reclameaqui.com.br, canaldapeca.com.br,
 *         despachantedok.com.br, otempo.com.br, noticiasautomotivas.com.br,
 *         mercadoveiculos.com (calibragem), vw.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput {
  severity: Sev
  title: string
  body: string
}

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
  sparePsi: number | null
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

// ============================================================
// BLOCO 1 — Polo Classic (1997-2002), sedã importado, motor 1.8 AP
// ============================================================

const MACETES_CLASSIC: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1.8 AP: robusto e com peças baratas',
    body: 'O Polo Classic foi vendido no Brasil só com o motor 1.8 Mi (o 1.6 chegou a ser cogitado, mas a VW decidiu importar apenas o 1.8 após pesquisas de mercado). O bloco AP é o mesmo usado em Gol, Voyage, Saveiro e Santana da época — lendário pela robustez e pela facilidade de achar peça e mecânico que entenda dele em qualquer cidade.',
  },
  {
    severity: 'OK',
    title: 'Direção hidráulica já de série',
    body: 'Diferente de boa parte da concorrência da época, o Polo Classic já vinha com direção hidráulica de série mesmo nas versões de entrada — um dos diferenciais que justificavam o preço mais alto (a partir de R$ 20.990 no lançamento, em dezembro de 1996).',
  },
  {
    severity: 'OK',
    title: 'Peças de acabamento e suspensão: procure em desmanches',
    body: 'Componentes de suspensão, acabamento interno e elétrica específicos do Classic (que não são compartilhados com o Gol/Parati da época) são mais caros e difíceis de achar em loja convencional. Cadastre-se em desmanches e grupos de proprietários — costuma ser o caminho mais rápido e barato.',
  },
  {
    severity: 'OK',
    title: 'Câmbio manual de 5 marchas, sem versão automática',
    body: 'O Polo Classic só foi vendido no Brasil com câmbio manual de 5 marchas. Não existe versão automática desse modelo — desconfie de anúncios que afirmem o contrário.',
  },
]

const PROBLEMAS_CLASSIC: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmbio frágil: folga e quebra da alavanca de seleção',
    body: 'É queixa recorrente de proprietários: folga nos engates, trocas imprecisas e até quebra da haste/alavanca seletora dentro do câmbio. A peça específica é difícil de achar em loja nova — geralmente só em desmanche. Evite forçar a troca de marcha com o carro ainda em movimento de embreagem mal regulada.',
  },
  {
    severity: 'WARN',
    title: 'Vidros e travas elétricas falham, curto na caixa de fusíveis',
    body: 'Vidros elétricos, travas elétricas e a caixa de fusíveis são pontos frequentes de falha nesse modelo — proprietários relatam desde vidro que para de subir/descer até curto-circuito na caixa de fusíveis. Ao comprar um usado, teste todos os vidros e travas antes de fechar negócio.',
  },
  {
    severity: 'WARN',
    title: 'Bandejas e buchas de suspensão desgastam rápido',
    body: 'Bandejas dianteiras e buchas de suspensão são apontadas por donos como itens de troca frequente — relatos indicam necessidade de substituição a cada 1,5 a 2 anos de uso normal, bem abaixo do que se espera de outros modelos da época. Fique atento a ruído de "estalo" em lombada e buraco.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível e sensores com defeito',
    body: 'Falhas na bomba de combustível e em sensores diversos (temperatura, rotação) são relatadas com alguma frequência. Dificuldade para ligar a frio ou marcha lenta instável são sinais de alerta que valem investigação antes de piorar.',
  },
]

const MANUTENCAO_CLASSIC: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Polo Classic (motor 1.8 AP)',
    body: '10.000 km/6 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de suspensão dianteira (bandejas/buchas), item de desgaste rápido documentado neste modelo. | 40.000-60.000 km — Correia dentada, tensor e bomba d\'água (motor AP, item crítico). | A cada revisão — Testar vidros, travas elétricas e caixa de fusíveis, pontos de falha conhecidos. | Periodicamente — Verificar folga no câmbio manual antes que vire quebra da alavanca seletora.',
  },
]

// ============================================================
// BLOCO 2 — Polo nacional (2002-2014), hatch/sedã, EA111/GTI/I-Motion
// ============================================================

const MACETES_NACIONAL: TipInput[] = [
  {
    severity: 'OK',
    title: 'Primeiro Polo fabricado no Brasil, em São Bernardo do Campo',
    body: 'A partir de 2002 o Polo passou a ser produzido na fábrica da VW em São Bernardo do Campo (SP), com linha robotizada, solda a laser e padrão de qualidade inédito para um compacto nacional até então — foi um marco de modernização da produção da VW no país.',
  },
  {
    severity: 'OK',
    title: 'I-Motion é câmbio automatizado, não automático convencional',
    body: 'Nas versões com I-Motion (a partir de ~2010) o câmbio é uma embreagem robotizada sobre uma base manual, não um automático de conversor de torque nem CVT. Ele funciona melhor quando você tira levemente o pé do acelerador no instante da troca de marcha — isso reduz o "solavanco" característico desse tipo de câmbio.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.0 16V para cidade, 1.6 para quem roda mais',
    body: 'O 1.0 8V/16V é mais econômico e suficiente para uso urbano; o 1.6 EA111 entrega mais disposição para quem roda em rodovia ou carrega mais peso com frequência. Avalie o seu uso real antes de pagar mais por um motor maior.',
  },
  {
    severity: 'OK',
    title: 'GTI e GT/Sportline: peças de desempenho custam mais',
    body: 'As versões esportivas — GTI 1.8 20V Turbo e GT/Sportline 2.0 — têm componentes específicos (turbina, intercooler, suspensão) mais caros e menos disponíveis que os das versões de entrada. Antes de comprar uma dessas, confirme com o vendedor o histórico de manutenção do sistema de turbo/injeção.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com Gol/Fox/Golf facilitam manutenção',
    body: 'Diversos componentes mecânicos e elétricos do Polo dessa geração são compartilhados com Gol, Fox e Golf da mesma era, o que facilita achar peça e mão de obra especializada em qualquer oficina de bairro.',
  },
]

const PROBLEMAS_NACIONAL: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmbio I-Motion: dificuldade de engate e falhas após 100.000 km',
    body: 'É o problema mais reclamado do Polo dessa geração: dificuldade ou impossibilidade de engatar marcha, engate brusco, marcha que "escapa" ou trava na 2ª só saindo em modo manual. Defeitos costumam aparecer após 100.000 km por desgaste de componentes mecânicos (atuador de embreagem, solenoide) — a VW chegou a anunciar o fim do I-Motion em 2019 por causa do volume de reclamações. Fluido e revisão em dia ajudam a adiar o problema, mas não eliminam o risco.',
  },
  {
    severity: 'WARN',
    title: 'Correia dentada, tensor e bomba d\'água (motor 1.6 EA111)',
    body: 'O motor 1.6 EA111 usa correia dentada (não corrente) — troque o kit completo (correia + tensor + bomba d\'água) rigorosamente no intervalo do manual. Ruído estranho vindo da região da correia é sinal de atenção imediata; a quebra pode causar dano sério ao motor.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento e entupimento no sistema PCV/blow-by',
    body: 'É queixa recorrente: o respiro do sistema de ventilação positiva do cárter (PCV/blow-by) entope, causando vazamento de óleo e fumaça no escapamento. Verifique esse componente nas revisões — é barato de trocar quando pego a tempo.',
  },
  {
    severity: 'WARN',
    title: 'Eletroventilador liga direto — defeito no módulo do radiador',
    body: 'Há relatos de ventoinha do radiador (eletroventilador) funcionando sem parar mesmo com o motor frio, por defeito no módulo/relé de controle. Além de gastar bateria em repouso, pode mascarar um problema real de temperatura — vale investigar se notar o ventilador sempre ligado.',
  },
  {
    severity: 'WARN',
    title: 'Falhas eletrônicas no painel e trincas no eixo traseiro',
    body: 'Proprietários relatam falhas eletrônicas intermitentes no painel de instrumentos e, em alguns casos, trincas no eixo de torção traseiro (torsion beam) após rodagem intensa em pisos ruins. Vale inspecionar a região do eixo traseiro periodicamente, principalmente em carros com muita quilometragem em estrada esburacada.',
  },
  {
    severity: 'WARN',
    title: 'Bobina de ignição e velas — marcha lenta irregular',
    body: 'No motor 1.6, falha na bobina de ignição costuma se manifestar como marcha lenta irregular, perda de força na aceleração ou luz de injeção acesa. Troca de velas e bobina dentro do intervalo do manual evita boa parte desses sintomas.',
  },
]

const MANUTENCAO_NACIONAL: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Polo nacional 2002-2014 (motores 1.0/1.6/1.8 Turbo/2.0)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção do sistema PCV/blow-by e do eletroventilador, itens com falha documentada. | 40.000-60.000 km — Kit de correia dentada completo (correia + tensor + bomba d\'água), motor 1.6 EA111. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | A cada revisão — Verificar folga e comportamento do câmbio I-Motion (quando equipado); troca antecipada do fluido se notar engate brusco.',
  },
  {
    severity: 'WARN',
    title: 'Fluido do câmbio I-Motion: não estique o intervalo',
    body: 'Nas versões com câmbio automatizado I-Motion, respeite rigorosamente a troca do fluido — historicamente esse foi o câmbio com mais reclamações da VW no Brasil, e a manutenção preventiva em dia é a única forma de reduzir o risco de falha antes dos 100.000 km.',
  },
]

// ============================================================
// BLOCO 3 — Novo Polo (MQB, desde 2018), motores 1.0 MPI/TSI/1.4 TSI GTS
// ============================================================

const MACETES_MQB: TipInput[] = [
  {
    severity: 'OK',
    title: 'Câmbio automático Aisin de 6 marchas, não é DSG',
    body: 'O câmbio automático do Polo brasileiro (versões 200 TSI/250 TSI Aut.) é um Tiptronic de conversor de torque de 6 marchas fabricado pela Aisin (configuração AQ250) — diferente do DSG de dupla embreagem usado no Polo europeu. É uma solução exclusiva do mercado brasileiro, com histórico de confiabilidade melhor que o DSG seco em trânsito parado. A VW já anunciou a troca gradual para uma versão de 8 marchas (AQ300) nos modelos mais recentes.',
  },
  {
    severity: 'OK',
    title: 'Compartilha plataforma MQB com o Virtus',
    body: 'O Novo Polo usa a mesma plataforma MQB e os mesmos motores do Virtus, seu irmão sedã. Em oficinas independentes, informações técnicas e peças do Virtus costumam servir de referência quando o cadastro específico do Polo ainda não está disponível.',
  },
  {
    severity: 'OK',
    title: 'Escolha o motor pelo uso: 1.0 MPI, 1.0 TSI ou 1.4 TSI GTS',
    body: 'O 1.0 MPI aspirado (12V) é a opção mais simples e barata de manter; o 1.0 TSI turbo de 3 cilindros (128cv) equilibra economia e desempenho; o 1.4 TSI do GTS (150cv) é o mais potente, mas com manutenção mais cara. Avalie o seu perfil de uso antes de pagar a mais por potência que não vai aproveitar no dia a dia.',
  },
  {
    severity: 'OK',
    title: 'Facelift 2023 trouxe o Track de entrada e o Robust "aventureiro"',
    body: 'A partir de 2023 a linha ganhou reestilização, com a versão Track assumindo a entrada da gama (substituindo nomes antigos como Comfortline/Trendline) e o Robust como versão com visual mais "off-road". Ao pesquisar preço e ficha técnica, confirme a versão exata pelo nome atual.',
  },
  {
    severity: 'OK',
    title: 'Use sempre gasolina para extrair todo o desempenho do turbo',
    body: 'Nos motores 1.0 TSI e 1.4 TSI flex, rodar com gasolina (em vez de etanol) entrega mais potência e torque, já que o motor eleva automaticamente a pressão de turbo com combustíveis de maior octanagem. Para quem prioriza desempenho, vale considerar o custo-benefício de cada combustível na sua região.',
  },
]

const PROBLEMAS_MQB: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor 1.0 TSI: coxins/calços do motor e vibração relatados',
    body: 'Proprietários do 1.0 TSI 3 cilindros relatam vibração/trepidação em marcha lenta e ruído de motor associados a desgaste prematuro dos coxins (calços) do motor. Se sentir vibração fora do normal, principalmente parado com o motor ligado, vale pedir inspeção dos coxins na concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Reclamações recorrentes sobre bicos injetores',
    body: 'Há um volume relevante de reclamações de proprietários sobre falha recorrente nos bicos injetores dos motores 1.0 TSI, com necessidade de substituição mais de uma vez dentro da garantia em alguns relatos. Fique atento a falha de partida a frio, marcha lenta irregular ou consumo anormal de combustível.',
  },
  {
    severity: 'WARN',
    title: 'Ruído de motor a frio relatado por alguns donos',
    body: 'Alguns proprietários relatam ruído estranho do motor na partida a frio, descrito como possível batida de válvula, que some após alguns segundos de funcionamento. Se o ruído persistir além do aquecimento inicial, vale registrar e levar para avaliação — não é comportamento esperado do motor.',
  },
  {
    severity: 'DANGER',
    title: 'Recall 2026: alavanca do freio de mão pode falhar sem avisar',
    body: 'A Volkswagen convocou recall (anunciado em 2026) para mais de 150.000 veículos — incluindo Polo 2026 e Polo Track 2025/2026 (faixas de chassi TP002478 a TP028076 e ST089057 a TT022003), além de Tera, Nivus, T-Cross e Virtus — fabricados entre maio e outubro de 2025. A trava interna da alavanca do freio de mão pode falhar silenciosamente: a alavanca dá a sensação de estar travada, mas o mecanismo interno não segura o carro, que pode se mover sozinho em terreno inclinado. Reparo gratuito, cerca de 2 horas. Consulte seu chassi em vw.com.br/pt/servicos-e-acessorios/aviso-recall.html.',
  },
  {
    severity: 'DANGER',
    title: 'Recall 2026: painel de instrumentos pode apagar completamente',
    body: 'Recall anunciado em 4 de maio de 2026 (mais de 118.000 veículos) por erro de software no painel de instrumentos, que pode ficar totalmente apagado mesmo com a ignição ligada — deixando o motorista sem visualizar velocímetro, combustível e avisos de sistemas críticos. Afeta o Novo Polo 2024-2026 (chassi RT644253 a TT640545), fabricado entre 23/10/2020 e 14/10/2025, além de Virtus, Nivus, T-Cross e Tera. Correção é uma atualização de software gratuita, disponível desde 11/05/2026. Consulte seu chassi no canal oficial de recall da VW.',
  },
]

const MANUTENCAO_MQB: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Novo Polo (Volkswagen + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (especificação exata do manual, motores 1.0/1.4 TSI) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e coxins do motor (atenção ao relato de vibração no 1.0 TSI). | 20.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático Aisin (6 ou 8 marchas conforme o ano/versão). | A cada revisão — Consultar recalls pendentes pelo chassi (freio de mão e painel de instrumentos são recalls ativos em 2026).',
  },
]

// ============================================================
// Pressão de pneus e itens de manutenção
// ============================================================

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Polo',
    yearFrom: 1997,
    yearTo: 2002,
    tireSize: '175/70 R13 (referência)',
    frontPsi: 28,
    rearPsi: 26,
    frontPsiLoad: 30,
    rearPsiLoad: 32,
    sparePsi: 60,
    notes: 'Modelo antigo — confirme sempre na etiqueta da coluna da porta ou no manual do proprietário, já que a etiqueta original pode ter se perdido com o tempo.',
  },
  {
    modelName: 'Polo',
    yearFrom: 2002,
    yearTo: 2014,
    tireSize: '175/70 R13 ou 185/60 R14/15 conforme versão (GTI/Sportline com aro maior)',
    frontPsi: 29,
    rearPsi: 27,
    frontPsiLoad: 32,
    rearPsiLoad: 33,
    sparePsi: 60,
    notes: 'Confirme sempre o valor exato na etiqueta da coluna da porta do motorista — varia conforme a versão e o aro original.',
  },
  {
    modelName: 'Polo',
    yearFrom: 2018,
    yearTo: null,
    tireSize: '185/60 R15 (Track/Comfortline) · 195/55 R16 (Highline/Sense) · 205/45 R17 (GTS)',
    frontPsi: 31,
    rearPsi: 29,
    frontPsiLoad: 33,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Valores de referência alinhados à plataforma MQB compartilhada com Virtus/T-Cross. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Polo', yearFrom: 1997, yearTo: 2002, component: 'Óleo do motor + filtro (1.8 AP)', intervalKm: 10000, intervalMonths: 6, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Polo', yearFrom: 1997, yearTo: 2002, component: 'Kit de correia dentada + bomba d\'água', intervalKm: 60000, intervalMonths: 60, notes: 'Motor 1.8 AP.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Polo', yearFrom: 1997, yearTo: 2002, component: 'Suspensão dianteira (bandejas/buchas)', intervalKm: null, intervalMonths: 24, notes: 'Item de desgaste rápido relatado neste modelo — inspecione a cada 1,5-2 anos.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Polo', yearFrom: 2002, yearTo: 2014, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motores 1.0/1.6 EA111, 1.8 20V Turbo (GTI) ou 2.0 (GT/Sportline).', priority: 'CRITICAL', order: 3 },
  { modelName: 'Polo', yearFrom: 2002, yearTo: 2014, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: 'Correia + tensor + bomba d\'água, motor 1.6 EA111.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Polo', yearFrom: 2002, yearTo: 2014, component: 'Fluido do câmbio I-Motion', intervalKm: 40000, intervalMonths: 24, notes: 'Câmbio automatizado com histórico de falhas após 100.000 km — não estique este intervalo.', priority: 'HIGH', order: 5 },
  { modelName: 'Polo', yearFrom: 2002, yearTo: 2014, component: 'Sistema PCV/blow-by', intervalKm: 20000, intervalMonths: 24, notes: 'Ponto recorrente de entupimento/vazamento de óleo.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Polo', yearFrom: 2018, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motores 1.0 MPI, 1.0 TSI ou 1.4 TSI — siga a especificação exata do manual.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Polo', yearFrom: 2018, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 8 },
  { modelName: 'Polo', yearFrom: 2018, yearTo: null, component: 'Coxins/calços do motor — inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Relatos de desgaste prematuro no 1.0 TSI, causando vibração.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Polo', yearFrom: 2018, yearTo: null, component: 'Filtro de ar do motor e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 10 },
  { modelName: 'Polo', yearFrom: 2018, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 11 },
  { modelName: 'Polo', yearFrom: 2018, yearTo: null, component: 'Óleo do câmbio automático Aisin', intervalKm: 60000, intervalMonths: 48, notes: '6 ou 8 marchas conforme o ano/versão.', priority: 'HIGH', order: 12 },
  { modelName: 'Polo', yearFrom: 2018, yearTo: null, component: 'Verificar recalls pendentes pelo chassi', intervalKm: null, intervalMonths: 6, notes: 'Recalls ativos em 2026: freio de mão e painel de instrumentos.', priority: 'CRITICAL', order: 13 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Polo', yearFrom: 1997, yearTo: 2002, MACETES: MACETES_CLASSIC, PROBLEMAS: PROBLEMAS_CLASSIC, MANUTENCAO: MANUTENCAO_CLASSIC },
  { modelName: 'Polo', yearFrom: 2002, yearTo: 2014, MACETES: MACETES_NACIONAL, PROBLEMAS: PROBLEMAS_NACIONAL, MANUTENCAO: MANUTENCAO_NACIONAL },
  { modelName: 'Polo', yearFrom: 2018, yearTo: null, MACETES: MACETES_MQB, PROBLEMAS: PROBLEMAS_MQB, MANUTENCAO: MANUTENCAO_MQB },
]

async function main() {
  console.log('🚗 Seed Volkswagen Polo...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Polo', brandId: brand.id } },
    update: {},
    create: { name: 'Polo', brandId: brand.id },
  })

  await prisma.tip.deleteMany({ where: { modelName: 'Polo' } })

  let order = 0
  for (const block of BLOCKS) {
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
    console.log(`  ✅ Polo (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: 'Polo' } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: Polo (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Polo' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volkswagen Polo concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
