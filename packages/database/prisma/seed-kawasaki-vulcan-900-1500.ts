// seed-kawasaki-vulcan-900-1500.ts — Kawasaki Vulcan 900 (VN900 Classic/Custom/Classic LT)
// e Vulcan 1500 (VN1500 Classic/Nomad).
// Cruisers CLÁSSICAS Kawasaki muito comuns no mercado de usados brasileiro. VN900: motor líquido-
// refrigerado com INJEÇÃO ELETRÔNICA e transmissão final por CORREIA (belt drive) — mais moderna
// que a família 500/750/800 (ver seed-kawasaki-vulcan-classic.ts). VN1500: uma das cruisers mais
// longevas da Kawasaki (1987-2008), motor V-twin grande com CARBURADOR (até ~1999-2004 conforme
// versão) ou EFI (a partir de 2000 na Classic FI e desde o lançamento na Nomad), transmissão final
// por EIXO CARDÃ (shaft drive).
// Nomes de modelName seguem EXATAMENTE as strings da API FIPE (parallelum.com.br) para casar
// corretamente com matchesStoredName (regra de word-boundary — não abreviar "cc"/"LT"/"CLASSIC").
// Execute: pnpm --filter @motormacete/database db:seed:kawasaki-vulcan-900-1500
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

// ─── VULCAN 900 / VN900 (CLASSIC / CUSTOM / CLASSIC LT) ──────────────────────
// Motor: 903cc V-twin 55° SOHC 4 válvulas/cilindro, refrigerado a LÍQUIDO, INJEÇÃO ELETRÔNICA
// (substituiu a VN800 a carburador) | ~50 cv | Compressão ~9,5:1
// Óleo: 10W-40 API SG/SH — 3,2L com troca de filtro / 3,7L a seco (motor zerado) | confirme no manual
// Vela: NGK/Champion CPR7EA-9 (gap ~0,9mm / 0,036 pol.) ou CPR8EA-9 (1 grau mais fria), 2 unidades
// TRANSMISSÃO FINAL POR CORREIA (belt drive, Kevlar/carbono, dentada) — NÃO tem corrente nem cardã
// Pneu: 130/90-16 (F) / 170/80-15 ou 180/70-15 (R, variação conforme fonte/ano — confirme no flanco)
// Tanque ~17L | Peso ~270-290kg conforme versão | Produção mundial: 2006-2016ish
// No Brasil: chegou importada em 2006 (substituindo a 800), nacionalizada em Manaus (AM) a partir
// de ~2010 — moto com boa disponibilidade no mercado de usados nacional até hoje

const VULCAN900_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Transmissão por CORREIA (belt drive) — sem lubrificação, mas exige inspeção visual regular',
    body: 'Diferente de quase toda a linha Vulcan anterior (corrente na 500/800, cardã na 750/1500), a Vulcan 900 usa transmissão final por correia dentada reforçada com Kevlar/fibra de carbono — não precisa de lubrificação nem ajuste de folga como corrente. Em compensação, exige inspeção visual periódica: procure fios de Kevlar expostos, rachaduras, desgaste na borda ou objetos presos entre os dentes e a polia (pedrinhas, gravetos). NUNCA lave a correia com solventes ou aplique qualquer lubrificante nela — resseca e degrada o composto. Vida útil típica bem documentada: 40.000-60.000 km, mas inspecione a cada troca de óleo mesmo sem sintoma.',
  },
  {
    severity: 'WARN',
    title: 'Correia original Kawasaki é cara e escassa no Brasil — genérica compatível (Gates) é alternativa real',
    body: 'A correia original Kawasaki (peça 59011-0021, 153 dentes) já não é fácil de encontrar no Brasil e, quando disponível, tem preço elevado por ser item de importação. Existem correias compatíveis genéricas (marca Gates e similares, mesma medida/perfil HTD, passo 14mm, largura 26mm, 153 dentes) vendidas por importadores de peças para motos americanas e também em plataformas como eBay/Amazon — confirme sempre a contagem de dentes e a medida exata antes de comprar, pois há variações entre anos/versões da 900. Vale a pena consultar oficinas especializadas em cruiser importada para saber de fornecedores nacionais confiáveis.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 — 3,2L com troca de filtro / 3,7L a seco; confirme no manual da sua unidade',
    body: 'O motor 903cc V-twin líquido-refrigerado com injeção eletrônica usa óleo 10W-40 API SG/SH ou superior, com capacidade de referência de 3,2L quando o filtro também é trocado (3,7L em enchimento completo a seco) — mas sempre confirme pela vareta/visor de nível ao completar, pois pequenas variações existem entre anos. Marcas recomendadas no Brasil: Motul 5100 10W-40, Lubrax Moto 4T 10W-40, Shell Advance 4T 10W-40. Intervalo para moto com muitos anos de uso: 4.000-5.000 km, mais curto que o original de fábrica.',
  },
  {
    severity: 'OK',
    title: 'Vela CPR7EA-9 (gap ~0,9mm) em par — injeção eletrônica facilita diagnóstico comparado a carburador',
    body: 'A Vulcan 900 tem 2 velas (uma por cilindro do V-twin 55°), referência NGK/Champion CPR7EA-9 com gap de aproximadamente 0,9mm (0,036 pol.) — a CPR8EA-9 (um grau mais fria) também é usada por alguns proprietários em uso mais exigente. Por ter injeção eletrônica em vez de carburador, esta é a Vulcan clássica mais fácil de diagnosticar problemas de combustão: qualquer scanner OBD genérico compatível ou ferramenta de diagnóstico Kawasaki lê códigos de falha, o que reduz muito o "chute" que é comum em carburador. Troque as velas em par a cada 8.000-10.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Peças específicas da linha 900 (Custom x Classic x Classic LT) não são intercambiáveis em tudo — confirme a versão',
    body: 'A Custom tem visual mais "hot rod"/chopper (guidão alto, banco solo, sem para-brisa), a Classic é o cruiser tradicional com para-lamas dianteiro grande, e a Classic LT acrescenta bolsas laterais rígidas e para-brisa (versão touring). Peças de motor, correia e elétrica são compartilhadas entre as três, mas itens de carenagem, banco, para-brisa e bolsas são exclusivos de cada versão — ao comprar peça usada ou de desmanche, confirme a versão exata antes de fechar negócio. Como a Kawasaki nacionalizou a 900 em Manaus, peças de desgaste mecânico (retentores, filtros, kits de embreagem) têm equivalentes genéricos de fácil acesso; peças de acabamento exclusivas seguem escassas.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo e de ar: genéricos por medida atendem sem problema',
    body: 'Tanto o filtro de óleo quanto o filtro de ar da Vulcan 900 têm equivalentes genéricos de marcas como Tecfil, Fram ou HiFlofiltro vendidos por medida/aplicação em qualquer boa loja de peças para moto — não é necessário insistir em peça genuína Kawasaki, que é mais cara e mais difícil de achar. Ao comprar, informe o modelo e ano exatos na loja para garantir compatibilidade correta.',
  },
  {
    severity: 'WARN',
    title: 'Regulador retificador e stator: itens de desgaste conhecidos — considere upgrade aftermarket',
    body: 'É um dos pontos mais citados em fóruns internacionais (vulcanforums.com, kawasakimotorcycle.org) sobre a plataforma 900: falha de stator que danifica o regulador/retificador (ou vice-versa, regulador ruim "queimando" o stator novo). Monitore a tensão da bateria com o motor em marcha (3.000-4.000 rpm): deve subir para a faixa de 14,2-15,2V. Fora dessa faixa, investigue os dois componentes juntos — trocar só um e manter o outro degradado tende a repetir a falha em pouco tempo. Reguladores aftermarket compatíveis (mais baratos que o genuíno Kawasaki) resolvem bem quando a peça é de qualidade reconhecida.',
  },
  {
    severity: 'OK',
    title: 'Moto pesada de uso esporádico: cuidados antes de rodar após período parado',
    body: 'É comum encontrar Vulcan 900 usadas que ficaram meses ou anos paradas. Antes de rodar: (1) teste ou troque a bateria — não force partida com bateria sulfatada; (2) combustível com etanol degradado pode ter formado verniz no sistema de injeção — em caso de dúvida, drene o tanque e abasteça com combustível novo antes de insistir na partida; (3) verifique aspecto do óleo (leitoso indica água/condensação); (4) inspecione a correia de transmissão quanto a ressecamento ou rachaduras antes de rodar distâncias longas; (5) revise mangueiras de combustível e de arrefecimento quanto a ressecamento.',
  },
]

const VULCAN900_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Falha de stator/regulador retificador: problema elétrico mais documentado da plataforma',
    body: 'É o problema mais citado em fóruns internacionais dedicados à Vulcan 900 — falha do stator (gerador) que compromete o regulador/retificador, ou o caminho inverso (regulador com defeito sobrecarrega e queima um stator novo). Sintomas: bateria não segura carga, farol perde intensidade em marcha lenta, moto "morre" no trânsito com bateria aparentemente boa. Teste a tensão da bateria com o motor em marcha a 3.000-4.000 rpm — deve ficar entre 14,2-15,2V; fora dessa faixa, ambos os componentes (stator e regulador) devem ser avaliados juntos, não isoladamente, para não repetir a falha em poucas semanas.',
  },
  {
    severity: 'WARN',
    title: 'Conector do regulador retificador: corrosão e superaquecimento por posicionamento exposto',
    body: 'Proprietários relatam pinos queimados e plástico derretido/rachado no conector do regulador retificador — a peça fica montada em posição baixa no chassi, exposta a água de chuva e sujeira da pista, o que acelera corrosão e mau contato. Ao trocar o regulador (preventivamente ou por falha), aproveite para inspecionar e limpar o conector, aplicando graxa dielétrica nos terminais para retardar nova corrosão.',
  },
  {
    severity: 'WARN',
    title: 'Correia de transmissão: desgaste ou dano por objeto preso passa despercebido sem inspeção',
    body: 'Como a correia não faz barulho de corrente gasta nem exige lubrificação, muitos proprietários simplesmente não a inspecionam — o primeiro sinal de problema costuma ser a correia partindo ou perdendo dentes, deixando a moto sem tração de repente. Pedrinhas ou detritos presos entre a correia e a polia dianteira/traseira podem causar desgaste localizado e até corte da correia. Inspeção visual a cada troca de óleo é a prevenção mais simples e barata contra esse tipo de pane.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem com desgaste acelerado em moto pesada usada predominantemente em trânsito urbano',
    body: 'O peso elevado da Vulcan 900 (na faixa de 270-290kg conforme versão) faz a embreagem trabalhar mais em arrancadas urbanas e trânsito parado do que em uso rodoviário constante. Sintoma de desgaste: patinação em marchas altas sob aceleração forte, ponto de engate alto/impreciso na alavanca. Como peça de desgaste natural, revise o disco de embreagem em unidades muito rodadas ou com histórico de uso predominantemente urbano.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em partes cromadas expostas: comum em moto de uso esporádico ou guardada ao relento',
    body: 'A Vulcan 900, como qualquer cruiser com muitas peças cromadas (motor, escapamento, guidão, acabamentos), sofre com pontos de ferrugem/oxidação sob o cromo quando exposta à umidade por longos períodos ou lavada com produtos abrasivos. É mais estético que mecânico na maioria dos casos, mas corrosão em superfícies de vedação (hastes de bengala, por exemplo) pode evoluir para vazamento de óleo. Limpeza regular com produto específico para cromo e cobertura da moto quando parada por longos períodos ajudam a preservar o acabamento e evitar problemas mecânicos derivados.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito parado: moto grande e pesada sofre mais em engarrafamento',
    body: 'Por ser um motor V-twin grande refrigerado a líquido em uma moto pesada, a Vulcan 900 tende a esquentar mais que motos menores quando parada em trânsito lento por muito tempo, especialmente em dias quentes. Verifique se a ventoinha do radiador está acionando corretamente (deve ligar automaticamente a partir de uma temperatura predeterminada) e mantenha o nível de líquido de arrefecimento sempre correto. Ventoinha que não liga ou líquido de arrefecimento baixo/vencido são as causas mais comuns de superaquecimento nesta plataforma.',
  },
]

const VULCAN900_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Vulcan 900 (VN900): correia sem lubrificação, mas com inspeção obrigatória',
    body: '4.000-5.000 km ou 6 meses — Troca de óleo 10W-40 (3,2L com filtro / 3,7L a seco, confirme no manual). Inspeção visual da correia de transmissão (rachaduras, fios expostos, objetos presos). | 8.000-10.000 km — Trocar as 2 velas CPR7EA-9 (gap ~0,9mm). Verificar filtro de ar. | 12.000 km — Fluido de freio DOT 4. Inspeção do disco de embreagem em uso predominantemente urbano (sintoma: patinação). | 24 meses (independente do km) — Troca preventiva de mangueiras de combustível e de arrefecimento — borracha original ressecada por etanol e pela idade é risco de vazamento. | Anual — Teste de tensão do sistema de carga (14,2-15,2V @ 3.000-4.000 rpm) e inspeção do conector do regulador retificador quanto a corrosão — principal ponto de falha elétrica documentado da plataforma. | 40.000-60.000 km — Avaliar substituição preventiva da correia de transmissão mesmo sem sintoma aparente, conforme uso e inspeções visuais acumuladas. | Antes de rodar após período parado — testar bateria, verificar aspecto do óleo e do combustível, inspecionar a correia visualmente antes de qualquer viagem.',
  },
]

// ─── VULCAN 1500 / VN1500 (CLASSIC / NOMAD) ──────────────────────────────────
// Motor: 1470cc V-twin 50° SOHC 4 válvulas/cilindro, refrigerado a LÍQUIDO
// ~64-65 cv @ 4.700 rpm | torque ~11,5-11,6 kgf.m @ 2.800-3.800 rpm (torque forte em baixa rotação)
// Alimentação: CARBURADOR único Keihin CVK40 (modelos até ~1999/2004 conforme versão, compressão
// 8,6:1) OU INJEÇÃO ELETRÔNICA (EFI, a partir de 2000 na Classic FI — convivendo com a carburada
// até 2004 — e desde o lançamento na Nomad em 1998; compressão 9,0:1 nos modelos EFI)
// Óleo: 10W-40 API SG/SH — capacidade de referência ~3,5-4,0L com filtro (VARIA por versão/ano —
// confirme SEMPRE no manual da sua unidade, item historicamente controverso entre proprietários)
// Vela: gap ~0,9mm (0,035 pol.), 2 unidades (confirme código exato pelo ano/versão)
// TRANSMISSÃO FINAL POR EIXO CARDÃ (shaft drive — NÃO tem corrente nem correia)
// Tanque: ~16L carburada / ~19L nas versões EFI | Pneu Classic: 130/90-16 (F) / 150/80-16 (R)
// Pneu Nomad: 150/80-16 (F e R, mesma medida nas duas rodas em algumas configurações — confirme no
// flanco da sua unidade) | Produção mundial: 1987-2008 — uma das cruisers mais longevas da Kawasaki

const VULCAN1500_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Transmissão por EIXO CARDÃ — a Vulcan 1500 NÃO tem corrente nem correia; manutenção é diferente',
    body: 'A Vulcan 1500 usa transmissão final por eixo cardã (shaft drive), assim como a Vulcan 750 — não existe corrente ou correia para lubrificar, ajustar folga ou trocar. Em compensação, o óleo da caixa de transmissão final (diferencial traseiro) precisa de troca periódica com óleo específico para engrenagens hipoides (SAE 80W-90 GL-5) — item frequentemente esquecido por quem está acostumado a moto com corrente. Verifique o nível a cada revisão e troque a cada 20.000-24.000 km — falta de troca é causa documentada de desgaste prematuro da coroa do cardã, reparo caro por envolver desmontagem da transmissão traseira.',
  },
  {
    severity: 'WARN',
    title: 'Confirme se sua unidade é a carburador (Keihin CVK40) ou injeção eletrônica (EFI) antes de comprar peças',
    body: 'A Vulcan 1500 teve carburador único Keihin CVK40 nos modelos mais antigos (Classic até por volta de 1999, convivendo com a versão FI até cerca de 2004) e injeção eletrônica nos modelos EFI (Classic FI a partir de 2000, e a Nomad já nasceu majoritariamente com EFI desde 1998) — as peças de alimentação de combustível NÃO são intercambiáveis entre as duas versões. Verifique a plaqueta de identificação (código do modelo, ex.: VN1500-E para carburada, VN1500-N para FI) antes de comprar kit de reparo, bomba de combustível ou sensor. Modelos EFI são mais fáceis de diagnosticar com scanner OBD genérico compatível; carburados dependem de diagnóstico manual.',
  },
  {
    severity: 'WARN',
    title: 'Peças Kawasaki originais para a 1500 são raras e caras no Brasil — recorra a desmanches e importadores',
    body: 'A Vulcan 1500 nunca teve grande volume de venda oficial no Brasil e a Kawasaki não mantém estoque relevante de peças originais para essa plataforma há anos. Alternativas práticas: (1) peças de desgaste comuns (retentores, filtros, kit de reparo de carburador, mangueiras) têm equivalente genérico por medida em lojas especializadas de rolamentos/motopeças; (2) importadores de peças para clássicos americanos (RonAyers, Partzilla, eBay) atendem o Brasil, mas frete e imposto pesam — vale agrupar pedidos; (3) grupos "Vulcan Brasil" no Facebook e fóruns como vulcanforums.com e vulcanbagger.com (específico de Nomad/versões touring) têm proprietários brasileiros compartilhando fornecedores confiáveis; (4) para peças de acabamento exclusivas da Nomad (bolsas rígidas, para-brisa), desmanches de moto importada são a fonte mais provável.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 — capacidade varia bastante entre versões; confirme sempre no manual ou pela vareta',
    body: 'O motor 1470cc V-twin líquido-refrigerado usa óleo 10W-40 API SG/SH, mas a capacidade de referência (em torno de 3,5-4,0L com troca de filtro) varia mais entre versões/anos da Vulcan 1500 do que em outras Vulcan — é um dos temas mais debatidos em fóruns internacionais, com proprietários relatando capacidades diferentes até dentro do mesmo ano-modelo. Sempre complete aos poucos e confirme pela vareta/visor de nível, nunca confie cegamente em um valor de tabela genérica. Marcas recomendadas no Brasil: Motul 5100 10W-40, Lubrax Moto 4T 10W-40. Intervalo para moto antiga: 4.000-5.000 km.',
  },
  {
    severity: 'OK',
    title: 'Vela em par: cilindro traseiro do V-twin 50° tem acesso mais restrito',
    body: 'A Vulcan 1500 tem 2 velas (uma por cilindro), gap de referência em torno de 0,9mm (0,035 pol.) — confirme o código exato pelo ano e versão (carburada ou EFI) da sua unidade, pois pode variar. O cilindro traseiro, como em toda a família Vulcan V-twin, tem acesso mais difícil que o dianteiro. Troque sempre as duas velas juntas para evitar desmontagem repetida em pouco tempo.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Keihin CVK40 (modelos carburados): combustível parado forma goma — limpeza preventiva antes de rodar',
    body: 'Nos modelos a carburador, é comum encontrar boia emperrada e jatos entupidos por verniz de combustível degradado após meses parada, especialmente com o etanol da gasolina brasileira. Produtos de limpeza de sistema de combustível (tipo Seafoam) direto na cuba, deixando de molho durante a noite, resolve boa parte dos casos sem desmontagem completa. Drene o combustível velho do carburador antes de guardar a moto por mais de 30 dias.',
  },
  {
    severity: 'OK',
    title: 'Bolsas rígidas da Nomad: verifique borrachas de vedação e ferragens de fixação',
    body: 'A Nomad se diferencia da Classic pelas bolsas laterais rígidas (hard saddlebags) e para-brisa grande — itens que agregam peso e exigem atenção própria: as borrachas de vedação das bolsas ressecam com a idade e podem deixar entrar água, e as ferragens de fixação (parafusos, suportes) sofrem vibração constante e merecem checagem de aperto periódica. Ao comprar Nomad usada, teste a vedação das bolsas e confira se todas as ferragens originais estão presentes — reposição de ferragem específica da Nomad é item raro no mercado de peças.',
  },
  {
    severity: 'OK',
    title: 'Moto pesada de uso esporádico: protocolo de cuidado antes de rodar após período parado',
    body: 'Vulcan 1500 usada e parada há meses/anos merece checagem preventiva completa: drenar combustível velho do carburador (nos modelos carburados) ou verificar se o sistema de injeção não tem sinais de combustível degradado nos modelos EFI; testar/trocar bateria antes de forçar partida; verificar aspecto do óleo do motor e da transmissão do cardã; inspecionar mangueiras de combustível e de arrefecimento quanto a ressecamento antes de pressurizar o sistema pela primeira vez. Gire o motor manualmente (com a vela removida) antes da primeira partida para garantir lubrificação prévia das partes internas.',
  },
]

const VULCAN1500_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Superaquecimento em trânsito parado: moto grande e pesada sofre mais em engarrafamento e uso urbano',
    body: 'É um dos problemas mais relatados por proprietários da Vulcan 1500, especialmente em clima quente e trânsito parado: o motor V-twin grande refrigerado a líquido pode superaquecer se a ventoinha do radiador não acionar corretamente, se houver vazamento de líquido de arrefecimento, ou se o radiador estiver com colmeia obstruída por sujeira acumulada em décadas de uso. Sintoma: ponteiro de temperatura subindo além do normal em trânsito lento, vapor ou cheiro de líquido de arrefecimento. Verifique acionamento da ventoinha, nível e estado do líquido de arrefecimento, e limpeza do radiador regularmente — é item de segurança, não apenas de conforto.',
  },
  {
    severity: 'WARN',
    title: 'Falha de stator/regulador retificador: mesma causa-raiz elétrica das demais Vulcan clássicas',
    body: 'Como em toda a linha Vulcan desta geração, o stator (gerador) e o regulador/retificador da 1500 são pontos de desgaste conhecidos, com um componente degradado frequentemente levando o outro a falhar em sequência. Sintoma: bateria não segura carga, drenagem mesmo com bateria nova, farol fraco em marcha lenta. Teste a tensão da bateria com o motor em marcha (3.000-4.000 rpm) — fora da faixa de 13,5-14,8V, avalie estator e regulador juntos antes de substituir apenas um dos dois.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem "prende" ou falha a quente: problema documentado em uso prolongado sob calor',
    body: 'Proprietários relatam casos de embreagem que perde acionamento ("no clutch") especialmente depois de rodar tempo prolongado com o motor quente — o calor do motor grande V-twin próximo à embreagem pode afetar o óleo do cárter e o comportamento do sistema de acionamento, além do desgaste natural acelerado pelo peso elevado da moto em arrancadas urbanas. Se notar dificuldade progressiva de engate conforme a moto esquenta, verifique nível e estado do óleo do motor (a embreagem é banhada a óleo) e o ajuste do cabo/sistema hidráulico de acionamento antes de suspeitar de dano interno grave.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pela junta do cárter e retentores em unidades de alta quilometragem/idade',
    body: 'Como qualquer motor com décadas de uso, as juntas de vedação da Vulcan 1500 endurecem e podem vazar óleo, mesmo em unidades com km moderado, apenas pela idade da borracha. Inspecione visualmente o motor a cada revisão em busca de manchas de óleo na base do cárter e ao redor da tampa de válvulas. É item de baixo custo em peça, mas a mão de obra pode ser elevada dependendo do ponto de vazamento por causa do tamanho do motor.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em partes cromadas expostas — comum em cruiser grande de uso esporádico ou litorâneo',
    body: 'A Vulcan 1500 tem grande quantidade de peças cromadas (motor, escapamento duplo, guidão, acabamentos) suscetíveis a pontos de ferrugem sob o cromo quando expostas à umidade por longos períodos, principalmente em regiões litorâneas. Mais estético que mecânico na maioria dos casos, mas corrosão em pontos de vedação (haste de bengala, por exemplo) pode evoluir para vazamento. Limpeza regular e cobertura da moto quando parada ajudam a preservar tanto a estética quanto peças mecânicas próximas.',
  },
  {
    severity: 'WARN',
    title: 'Carburador (modelos carburados): vazamento ou transbordamento por boia/agulha desgastada',
    body: 'Nos modelos com o carburador Keihin CVK40, boia ou agulha da boia desgastadas com o tempo podem causar vazamento de combustível pelo próprio carburador ou transbordamento para dentro do motor — sintoma: cheiro forte de gasolina, poça de combustível sob a moto parada, dificuldade de partida por afogamento. É item de segurança: combustível vazando perto do motor quente é risco real de incêndio. Kit de reparo (boia + agulha + juntas) resolve a maioria dos casos e é item de baixo custo, mesmo genérico.',
  },
]

const VULCAN1500_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Vulcan 1500 (VN1500): shaft drive e foco em arrefecimento por ser moto grande e pesada',
    body: '4.000-5.000 km ou 6 meses — Troca de óleo do motor 10W-40 (confirme capacidade no manual da sua unidade, ~3,5-4,0L, item que varia bastante entre versões). | 8.000 km — Verificar filtro de ar. Inspeção visual de vazamento no cárter/tampa de válvulas. | 10.000 km — Trocar as 2 velas (par). Nos modelos carburados: limpeza/sincronização do carburador Keihin CVK40. Nos modelos EFI: checagem de códigos de falha com scanner compatível. | 12.000 km — Fluido de freio DOT 4. Inspeção da embreagem quanto a engate impreciso a quente. | 20.000-24.000 km — Trocar óleo do diferencial do cardã (SAE 80W-90 GL-5) — item frequentemente esquecido por não ter corrente/correia para lembrar da manutenção da transmissão final. | 24 meses (independente do km) — Troca preventiva de TODAS as mangueiras de combustível e de arrefecimento: borracha de décadas ressecada por etanol, risco de vazamento e superaquecimento. | Anual — Teste de tensão do sistema de carga (13,5-14,8V @ 3.000-4.000 rpm). Limpeza do radiador e teste de acionamento da ventoinha — item crítico por ser motor grande em moto pesada. | Nomad — Verificar vedação das bolsas rígidas e aperto das ferragens de fixação anualmente. | Antes de rodar após período parado — drenar combustível velho do carburador (se aplicável), testar bateria, verificar óleo do motor e da transmissão do cardã antes de qualquer viagem.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────
// 3 modelName para a família 900 (mesma plataforma VN900, nomes distintos na FIPE),
// 3 modelName para a família 1500 (mesma plataforma geral VN1500, variações de trim).

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'VULCAN 900 CLASSIC LT',
    yearFrom: 2006,
    yearTo: 2016,
    MACETES: VULCAN900_MACETES,
    PROBLEMAS: VULCAN900_PROBLEMAS,
    MANUTENCAO: VULCAN900_MANUTENCAO,
  },
  {
    modelName: 'VULCAN 900 CUSTOM',
    yearFrom: 2006,
    yearTo: 2016,
    MACETES: VULCAN900_MACETES,
    PROBLEMAS: VULCAN900_PROBLEMAS,
    MANUTENCAO: VULCAN900_MANUTENCAO,
  },
  {
    modelName: 'VULCAN VN 900 CLASSIC',
    yearFrom: 2006,
    yearTo: 2016,
    MACETES: VULCAN900_MACETES,
    PROBLEMAS: VULCAN900_PROBLEMAS,
    MANUTENCAO: VULCAN900_MANUTENCAO,
  },
  {
    modelName: 'VULCAN NOMAD 1500cc',
    yearFrom: 1998,
    yearTo: 2008,
    MACETES: VULCAN1500_MACETES,
    PROBLEMAS: VULCAN1500_PROBLEMAS,
    MANUTENCAO: VULCAN1500_MANUTENCAO,
  },
  {
    modelName: 'VULCAN VN 1500 CLASSIC/ MEAN STREAK',
    yearFrom: 1987,
    yearTo: 2008,
    MACETES: VULCAN1500_MACETES,
    PROBLEMAS: VULCAN1500_PROBLEMAS,
    MANUTENCAO: VULCAN1500_MANUTENCAO,
  },
  {
    modelName: 'VULCAN VN 1500cc',
    yearFrom: 1987,
    yearTo: 2008,
    MACETES: VULCAN1500_MACETES,
    PROBLEMAS: VULCAN1500_PROBLEMAS,
    MANUTENCAO: VULCAN1500_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────
// Pneu traseiro da 900 tem variação documentada entre fontes (170/80-15 genérico popular vs
// 180/70-15 medida de fábrica) — usamos a medida de fábrica e citamos a alternativa nas notas.

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'VULCAN 900 CLASSIC LT',
    yearFrom: 2006, yearTo: 2016,
    tireSize: '130/90-16 (F) · 180/70-15 (R, fábrica) — 170/80-15 é alternativa aftermarket comum',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 36, rearPsiLoad: 40,
    notes: 'Solo: F 28 / R 28-32 PSI (varia com peso do piloto, 28 PSI até ~97kg, sobe até 32 PSI acima disso). Com carona/bagagem (versão LT com bolsas): F 36 / R 40 PSI. Confirme sempre a medida gravada no flanco antes de comprar reposição.',
  },
  {
    modelName: 'VULCAN 900 CUSTOM',
    yearFrom: 2006, yearTo: 2016,
    tireSize: '130/90-16 (F) · 180/70-15 (R, fábrica) — 170/80-15 é alternativa aftermarket comum',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 32, rearPsiLoad: 36,
    notes: 'Solo: F 28 / R 28-32 PSI. Com carona: F 32 / R 36 PSI. Sem bolsas/para-brisa de série (versão sem carga adicional da LT) — pressão de carga um pouco mais baixa que a LT.',
  },
  {
    modelName: 'VULCAN VN 900 CLASSIC',
    yearFrom: 2006, yearTo: 2016,
    tireSize: '130/90-16 (F) · 180/70-15 (R, fábrica) — 170/80-15 é alternativa aftermarket comum',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 32, rearPsiLoad: 36,
    notes: 'Mesma especificação da família 900 — mesma plataforma mecânica. Solo: F 28 / R 28-32 PSI. Com carona: F 32 / R 36 PSI.',
  },
  {
    modelName: 'VULCAN NOMAD 1500cc',
    yearFrom: 1998, yearTo: 2008,
    tireSize: '150/80-16 (F) · 150/80-16 (R) — confirme medida exata no flanco da sua unidade',
    frontPsi: 28, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 40,
    notes: 'Versão touring com bolsas rígidas e para-brisa — peso adicional exige pressão traseira mais alta mesmo solo. Solo: F 28 / R 36 PSI (etiqueta de fábrica citada como 28/36). Com carona/bagagem nas bolsas: F 32 / R 40 PSI. Sempre confira a etiqueta de carga colada no chassi da sua unidade.',
  },
  {
    modelName: 'VULCAN VN 1500 CLASSIC/ MEAN STREAK',
    yearFrom: 1987, yearTo: 2008,
    tireSize: '130/90-16 (F) · 150/80-16 (R)',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 32, rearPsiLoad: 36,
    notes: 'Versão Classic (sem bolsas rígidas de série) — pneu dianteiro mais estreito que a Nomad. Solo: F 28 / R 32 PSI. Com carona/bagagem: F 32 / R 36 PSI. Mean Streak (versão performance da plataforma) compartilha motor e transmissão, mas pode ter roda/pneu específicos — confirme no flanco.',
  },
  {
    modelName: 'VULCAN VN 1500cc',
    yearFrom: 1987, yearTo: 2008,
    tireSize: '130/90-16 (F) · 150/80-16 (R)',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 32, rearPsiLoad: 36,
    notes: 'Mesma especificação da Classic — mesma plataforma mecânica geral da família 1500. Solo: F 28 / R 32 PSI. Com carona: F 32 / R 36 PSI.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // VULCAN 900 CLASSIC LT
  { modelName: 'VULCAN 900 CLASSIC LT', yearFrom: 2006, yearTo: 2016, component: 'Óleo 10W-40 (3,2L c/ filtro / 3,7L a seco)', intervalKm: 4500, intervalMonths: 6, notes: 'Confirme capacidade exata no manual da unidade.', priority: 'HIGH', order: 1 },
  { modelName: 'VULCAN 900 CLASSIC LT', yearFrom: 2006, yearTo: 2016, component: 'Filtro de óleo', intervalKm: 4500, intervalMonths: 6, notes: 'Genérico (Tecfil/Fram/HiFlofiltro) atende bem.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VULCAN 900 CLASSIC LT', yearFrom: 2006, yearTo: 2016, component: 'Velas CPR7EA-9 (gap ~0,9mm) ×2', intervalKm: 9000, intervalMonths: null, notes: 'Sempre em par. CPR8EA-9 é alternativa 1 grau mais fria.', priority: 'MEDIUM', order: 3 },
  { modelName: 'VULCAN 900 CLASSIC LT', yearFrom: 2006, yearTo: 2016, component: 'Inspeção visual da correia de transmissão', intervalKm: 4500, intervalMonths: 6, notes: 'Sem lubrificação — checar rachaduras, fios expostos, objetos presos.', priority: 'CRITICAL', order: 4 },
  { modelName: 'VULCAN 900 CLASSIC LT', yearFrom: 2006, yearTo: 2016, component: 'Filtro de ar', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar/trocar.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VULCAN 900 CLASSIC LT', yearFrom: 2006, yearTo: 2016, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'VULCAN 900 CLASSIC LT', yearFrom: 2006, yearTo: 2016, component: 'Verificação do sistema de carga (14,2-15,2V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Stator e regulador/retificador — falha de um pode danificar o outro.', priority: 'CRITICAL', order: 7 },
  { modelName: 'VULCAN 900 CLASSIC LT', yearFrom: 2006, yearTo: 2016, component: 'Mangueiras de combustível e arrefecimento — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item de segurança: ressecamento por etanol e idade.', priority: 'CRITICAL', order: 8 },
  { modelName: 'VULCAN 900 CLASSIC LT', yearFrom: 2006, yearTo: 2016, component: 'Inspeção da embreagem (patinação em uso urbano intenso)', intervalKm: 15000, intervalMonths: 12, notes: 'Moto pesada desgasta embreagem mais rápido em trânsito parado.', priority: 'MEDIUM', order: 9 },
  { modelName: 'VULCAN 900 CLASSIC LT', yearFrom: 2006, yearTo: 2016, component: 'Substituição preventiva da correia de transmissão', intervalKm: 50000, intervalMonths: null, notes: 'Vida útil típica documentada de 40.000-60.000 km.', priority: 'HIGH', order: 10 },

  // VULCAN 900 CUSTOM (mesmos itens)
  { modelName: 'VULCAN 900 CUSTOM', yearFrom: 2006, yearTo: 2016, component: 'Óleo 10W-40 (3,2L c/ filtro / 3,7L a seco)', intervalKm: 4500, intervalMonths: 6, notes: 'Confirme capacidade exata no manual da unidade.', priority: 'HIGH', order: 1 },
  { modelName: 'VULCAN 900 CUSTOM', yearFrom: 2006, yearTo: 2016, component: 'Filtro de óleo', intervalKm: 4500, intervalMonths: 6, notes: 'Genérico (Tecfil/Fram/HiFlofiltro) atende bem.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VULCAN 900 CUSTOM', yearFrom: 2006, yearTo: 2016, component: 'Velas CPR7EA-9 (gap ~0,9mm) ×2', intervalKm: 9000, intervalMonths: null, notes: 'Sempre em par. CPR8EA-9 é alternativa 1 grau mais fria.', priority: 'MEDIUM', order: 3 },
  { modelName: 'VULCAN 900 CUSTOM', yearFrom: 2006, yearTo: 2016, component: 'Inspeção visual da correia de transmissão', intervalKm: 4500, intervalMonths: 6, notes: 'Sem lubrificação — checar rachaduras, fios expostos, objetos presos.', priority: 'CRITICAL', order: 4 },
  { modelName: 'VULCAN 900 CUSTOM', yearFrom: 2006, yearTo: 2016, component: 'Filtro de ar', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar/trocar.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VULCAN 900 CUSTOM', yearFrom: 2006, yearTo: 2016, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'VULCAN 900 CUSTOM', yearFrom: 2006, yearTo: 2016, component: 'Verificação do sistema de carga (14,2-15,2V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Stator e regulador/retificador — falha de um pode danificar o outro.', priority: 'CRITICAL', order: 7 },
  { modelName: 'VULCAN 900 CUSTOM', yearFrom: 2006, yearTo: 2016, component: 'Mangueiras de combustível e arrefecimento — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item de segurança: ressecamento por etanol e idade.', priority: 'CRITICAL', order: 8 },
  { modelName: 'VULCAN 900 CUSTOM', yearFrom: 2006, yearTo: 2016, component: 'Inspeção da embreagem (patinação em uso urbano intenso)', intervalKm: 15000, intervalMonths: 12, notes: 'Moto pesada desgasta embreagem mais rápido em trânsito parado.', priority: 'MEDIUM', order: 9 },
  { modelName: 'VULCAN 900 CUSTOM', yearFrom: 2006, yearTo: 2016, component: 'Substituição preventiva da correia de transmissão', intervalKm: 50000, intervalMonths: null, notes: 'Vida útil típica documentada de 40.000-60.000 km.', priority: 'HIGH', order: 10 },

  // VULCAN VN 900 CLASSIC (mesmos itens)
  { modelName: 'VULCAN VN 900 CLASSIC', yearFrom: 2006, yearTo: 2016, component: 'Óleo 10W-40 (3,2L c/ filtro / 3,7L a seco)', intervalKm: 4500, intervalMonths: 6, notes: 'Confirme capacidade exata no manual da unidade.', priority: 'HIGH', order: 1 },
  { modelName: 'VULCAN VN 900 CLASSIC', yearFrom: 2006, yearTo: 2016, component: 'Filtro de óleo', intervalKm: 4500, intervalMonths: 6, notes: 'Genérico (Tecfil/Fram/HiFlofiltro) atende bem.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VULCAN VN 900 CLASSIC', yearFrom: 2006, yearTo: 2016, component: 'Velas CPR7EA-9 (gap ~0,9mm) ×2', intervalKm: 9000, intervalMonths: null, notes: 'Sempre em par. CPR8EA-9 é alternativa 1 grau mais fria.', priority: 'MEDIUM', order: 3 },
  { modelName: 'VULCAN VN 900 CLASSIC', yearFrom: 2006, yearTo: 2016, component: 'Inspeção visual da correia de transmissão', intervalKm: 4500, intervalMonths: 6, notes: 'Sem lubrificação — checar rachaduras, fios expostos, objetos presos.', priority: 'CRITICAL', order: 4 },
  { modelName: 'VULCAN VN 900 CLASSIC', yearFrom: 2006, yearTo: 2016, component: 'Filtro de ar', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar/trocar.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VULCAN VN 900 CLASSIC', yearFrom: 2006, yearTo: 2016, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'VULCAN VN 900 CLASSIC', yearFrom: 2006, yearTo: 2016, component: 'Verificação do sistema de carga (14,2-15,2V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Stator e regulador/retificador — falha de um pode danificar o outro.', priority: 'CRITICAL', order: 7 },
  { modelName: 'VULCAN VN 900 CLASSIC', yearFrom: 2006, yearTo: 2016, component: 'Mangueiras de combustível e arrefecimento — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item de segurança: ressecamento por etanol e idade.', priority: 'CRITICAL', order: 8 },
  { modelName: 'VULCAN VN 900 CLASSIC', yearFrom: 2006, yearTo: 2016, component: 'Inspeção da embreagem (patinação em uso urbano intenso)', intervalKm: 15000, intervalMonths: 12, notes: 'Moto pesada desgasta embreagem mais rápido em trânsito parado.', priority: 'MEDIUM', order: 9 },
  { modelName: 'VULCAN VN 900 CLASSIC', yearFrom: 2006, yearTo: 2016, component: 'Substituição preventiva da correia de transmissão', intervalKm: 50000, intervalMonths: null, notes: 'Vida útil típica documentada de 40.000-60.000 km.', priority: 'HIGH', order: 10 },

  // VULCAN NOMAD 1500cc
  { modelName: 'VULCAN NOMAD 1500cc', yearFrom: 1998, yearTo: 2008, component: 'Óleo 10W-40 (~3,5-4,0L com filtro — confirme no manual da unidade)', intervalKm: 4500, intervalMonths: 6, notes: 'Capacidade varia bastante entre versões/anos — confirme pela vareta.', priority: 'HIGH', order: 1 },
  { modelName: 'VULCAN NOMAD 1500cc', yearFrom: 1998, yearTo: 2008, component: 'Óleo do diferencial do eixo cardã (SAE 80W-90 GL-5)', intervalKm: 22000, intervalMonths: 24, notes: 'Item frequentemente esquecido por não ter corrente/correia. Transmissão final shaft drive.', priority: 'HIGH', order: 2 },
  { modelName: 'VULCAN NOMAD 1500cc', yearFrom: 1998, yearTo: 2008, component: 'Velas (gap ~0,9mm) ×2 — confirmar código exato pelo ano/versão', intervalKm: 9000, intervalMonths: null, notes: 'Sempre em par. Cilindro traseiro com acesso restrito.', priority: 'MEDIUM', order: 3 },
  { modelName: 'VULCAN NOMAD 1500cc', yearFrom: 1998, yearTo: 2008, component: 'Checagem de códigos de falha via scanner (versões EFI)', intervalKm: null, intervalMonths: 12, notes: 'Nomad predominantemente EFI desde o lançamento (1998).', priority: 'MEDIUM', order: 4 },
  { modelName: 'VULCAN NOMAD 1500cc', yearFrom: 1998, yearTo: 2008, component: 'Filtro de ar', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar/trocar.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VULCAN NOMAD 1500cc', yearFrom: 1998, yearTo: 2008, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'VULCAN NOMAD 1500cc', yearFrom: 1998, yearTo: 2008, component: 'Mangueiras de combustível e arrefecimento — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item crítico de segurança e contra superaquecimento.', priority: 'CRITICAL', order: 7 },
  { modelName: 'VULCAN NOMAD 1500cc', yearFrom: 1998, yearTo: 2008, component: 'Limpeza do radiador e teste da ventoinha', intervalKm: null, intervalMonths: 12, notes: 'Moto grande e pesada superaquece mais em trânsito parado.', priority: 'CRITICAL', order: 8 },
  { modelName: 'VULCAN NOMAD 1500cc', yearFrom: 1998, yearTo: 2008, component: 'Verificação do sistema de carga (13,5-14,8V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Stator e regulador/retificador — mesma causa-raiz das demais Vulcan.', priority: 'CRITICAL', order: 9 },
  { modelName: 'VULCAN NOMAD 1500cc', yearFrom: 1998, yearTo: 2008, component: 'Vedação das bolsas rígidas e aperto de ferragens', intervalKm: null, intervalMonths: 12, notes: 'Exclusivo da versão touring com bolsas laterais.', priority: 'MEDIUM', order: 10 },
  { modelName: 'VULCAN NOMAD 1500cc', yearFrom: 1998, yearTo: 2008, component: 'Inspeção da embreagem (engate impreciso a quente)', intervalKm: 15000, intervalMonths: 12, notes: 'Problema documentado em uso prolongado com motor quente.', priority: 'MEDIUM', order: 11 },

  // VULCAN VN 1500 CLASSIC/ MEAN STREAK
  { modelName: 'VULCAN VN 1500 CLASSIC/ MEAN STREAK', yearFrom: 1987, yearTo: 2008, component: 'Óleo 10W-40 (~3,5-4,0L com filtro — confirme no manual da unidade)', intervalKm: 4500, intervalMonths: 6, notes: 'Capacidade varia bastante entre versões/anos — confirme pela vareta.', priority: 'HIGH', order: 1 },
  { modelName: 'VULCAN VN 1500 CLASSIC/ MEAN STREAK', yearFrom: 1987, yearTo: 2008, component: 'Óleo do diferencial do eixo cardã (SAE 80W-90 GL-5)', intervalKm: 22000, intervalMonths: 24, notes: 'Item frequentemente esquecido. Transmissão final shaft drive.', priority: 'HIGH', order: 2 },
  { modelName: 'VULCAN VN 1500 CLASSIC/ MEAN STREAK', yearFrom: 1987, yearTo: 2008, component: 'Velas (gap ~0,9mm) ×2 — confirmar código exato pelo ano/versão', intervalKm: 9000, intervalMonths: null, notes: 'Sempre em par. Cilindro traseiro com acesso restrito.', priority: 'MEDIUM', order: 3 },
  { modelName: 'VULCAN VN 1500 CLASSIC/ MEAN STREAK', yearFrom: 1987, yearTo: 2008, component: 'Limpeza/sincronização do carburador Keihin CVK40 (modelos carburados até ~1999-2004)', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme se sua unidade é carburada ou EFI pela plaqueta (VN1500-E vs VN1500-N).', priority: 'MEDIUM', order: 4 },
  { modelName: 'VULCAN VN 1500 CLASSIC/ MEAN STREAK', yearFrom: 1987, yearTo: 2008, component: 'Filtro de ar', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar/trocar.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VULCAN VN 1500 CLASSIC/ MEAN STREAK', yearFrom: 1987, yearTo: 2008, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'VULCAN VN 1500 CLASSIC/ MEAN STREAK', yearFrom: 1987, yearTo: 2008, component: 'Mangueiras de combustível e arrefecimento — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item crítico de segurança e contra superaquecimento.', priority: 'CRITICAL', order: 7 },
  { modelName: 'VULCAN VN 1500 CLASSIC/ MEAN STREAK', yearFrom: 1987, yearTo: 2008, component: 'Limpeza do radiador e teste da ventoinha', intervalKm: null, intervalMonths: 12, notes: 'Moto grande e pesada superaquece mais em trânsito parado.', priority: 'CRITICAL', order: 8 },
  { modelName: 'VULCAN VN 1500 CLASSIC/ MEAN STREAK', yearFrom: 1987, yearTo: 2008, component: 'Verificação do sistema de carga (13,5-14,8V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Stator e regulador/retificador — mesma causa-raiz das demais Vulcan.', priority: 'CRITICAL', order: 9 },
  { modelName: 'VULCAN VN 1500 CLASSIC/ MEAN STREAK', yearFrom: 1987, yearTo: 2008, component: 'Inspeção da embreagem (engate impreciso a quente)', intervalKm: 15000, intervalMonths: 12, notes: 'Problema documentado em uso prolongado com motor quente.', priority: 'MEDIUM', order: 10 },

  // VULCAN VN 1500cc (mesmos itens da Classic)
  { modelName: 'VULCAN VN 1500cc', yearFrom: 1987, yearTo: 2008, component: 'Óleo 10W-40 (~3,5-4,0L com filtro — confirme no manual da unidade)', intervalKm: 4500, intervalMonths: 6, notes: 'Capacidade varia bastante entre versões/anos — confirme pela vareta.', priority: 'HIGH', order: 1 },
  { modelName: 'VULCAN VN 1500cc', yearFrom: 1987, yearTo: 2008, component: 'Óleo do diferencial do eixo cardã (SAE 80W-90 GL-5)', intervalKm: 22000, intervalMonths: 24, notes: 'Item frequentemente esquecido. Transmissão final shaft drive.', priority: 'HIGH', order: 2 },
  { modelName: 'VULCAN VN 1500cc', yearFrom: 1987, yearTo: 2008, component: 'Velas (gap ~0,9mm) ×2 — confirmar código exato pelo ano/versão', intervalKm: 9000, intervalMonths: null, notes: 'Sempre em par. Cilindro traseiro com acesso restrito.', priority: 'MEDIUM', order: 3 },
  { modelName: 'VULCAN VN 1500cc', yearFrom: 1987, yearTo: 2008, component: 'Limpeza/sincronização do carburador Keihin CVK40 (modelos carburados até ~1999-2004)', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme se sua unidade é carburada ou EFI pela plaqueta (VN1500-E vs VN1500-N).', priority: 'MEDIUM', order: 4 },
  { modelName: 'VULCAN VN 1500cc', yearFrom: 1987, yearTo: 2008, component: 'Filtro de ar', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar/trocar.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VULCAN VN 1500cc', yearFrom: 1987, yearTo: 2008, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'VULCAN VN 1500cc', yearFrom: 1987, yearTo: 2008, component: 'Mangueiras de combustível e arrefecimento — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item crítico de segurança e contra superaquecimento.', priority: 'CRITICAL', order: 7 },
  { modelName: 'VULCAN VN 1500cc', yearFrom: 1987, yearTo: 2008, component: 'Limpeza do radiador e teste da ventoinha', intervalKm: null, intervalMonths: 12, notes: 'Moto grande e pesada superaquece mais em trânsito parado.', priority: 'CRITICAL', order: 8 },
  { modelName: 'VULCAN VN 1500cc', yearFrom: 1987, yearTo: 2008, component: 'Verificação do sistema de carga (13,5-14,8V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Stator e regulador/retificador — mesma causa-raiz das demais Vulcan.', priority: 'CRITICAL', order: 9 },
  { modelName: 'VULCAN VN 1500cc', yearFrom: 1987, yearTo: 2008, component: 'Inspeção da embreagem (engate impreciso a quente)', intervalKm: 15000, intervalMonths: 12, notes: 'Problema documentado em uso prolongado com motor quente.', priority: 'MEDIUM', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Kawasaki Vulcan 900 (VN900) e Vulcan 1500 (VN1500)...')

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

  console.log('✅ Kawasaki Vulcan 900/1500 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
