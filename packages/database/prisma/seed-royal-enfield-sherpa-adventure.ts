// seed-royal-enfield-sherpa-adventure.ts — Royal Enfield Himalayan 411 (+ edição Sleet),
// Himalayan 450, Guerrilla 450 e Scram 411.
// Royal Enfield chegou "oficialmente forte" ao Brasil recentemente e vem vendendo muito —
// duas gerações de motor convivem no mercado nacional:
//   • LS410 (411cc) — SOHC 2 válvulas, refrigerado a AR + ÓLEO, carter seco, 5 marchas.
//     Usado na Himalayan 411 (2016+) e na Scram 411 (2022+, chassi/motor da 411 com rodas
//     menores e pegada mais urbana). Plataforma madura, com anos de histórico e problemas
//     bem documentados internacionalmente (ADVrider, Himalayan Riders forum, Team-BHP).
//   • Sherpa 452 (452cc) — DOHC 4 válvulas, refrigerado a LÍQUIDO, injeção eletrônica,
//     6 marchas, embreagem assistida (slipper/APS). Usado na Himalayan 450 (2024+) e na
//     Guerrilla 450 (2024+, mesma mecânica em chassi roadster/urbano). É um salto técnico
//     GRANDE sobre o LS410: motor totalmente novo, moderno, mais potente (~40cv vs ~24,3cv)
//     e mais complexo — plataforma novíssima, com pouco histórico de longo prazo ainda.
// Nomes de modelName seguem estratégia de substring cobrindo os nomes EXATOS da API FIPE
// (marca Royal Enfield, código 192): "Himalayan 411 EFI", "Himalayan Sleet 411 EFI",
// "Himalayan 450 Mid/Premium/Top", "Guerrilla 450 Mid/Top", "Scram 411 EFI".
// A edição "Sleet" quebra a contiguidade "Himalayan ... 411" (tem "Sleet" no meio), por isso
// tem bloco próprio com modelName igual ao nome completo da FIPE, reaproveitando o mesmo
// conteúdo técnico da Himalayan 411 padrão (mesma mecânica, só visual/acessórios diferentes).
// Execute: pnpm --filter @motormacete/database db:seed:royal-enfield-sherpa-adventure
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

// ─── HIMALAYAN 411 (+ edição SLEET) ──────────────────────────────────────────
// Motor: LS410 — 411cc monocilíndrico SOHC 2 válvulas, refrigerado a AR + ÓLEO
// (oil cooler — primeira Royal Enfield da Índia com esse sistema) | ~24,3-24,5 cv @ 6.500 rpm
// Torque: ~32 Nm (3,2 kgf.m) @ 4.000-4.500 rpm | Injeção eletrônica (EFI) | Câmbio 5 marchas
// Óleo: 15W-50 API SL / JASO MA2 semissintético — capacidade ~2,0-2,3L (varia entre 1ª carga
// e trocas seguintes; confirme na vareta) | Vela: BOSCH UR5CC (gap 0,7-0,8mm); equivalente
// NGK CR8EIX iridium também usado como referência aftermarket
// Corrente: passo 525 × 110 elos | Pneu: 90/90-21 (F) / 120/90-17 (R) | Tanque: ~15L
// Peso: ~199kg (pronta pra rodar) | Lançada 2016 (chegou ao Brasil ~2019-2020), produção
// mundial encerrada gradualmente entre 2024-2025 com a chegada da nova geração 450.
// Diferença técnica chave vs Sherpa 450: motor SOHC 2 válvulas × DOHC 4 válvulas, refrigeração
// a ar+óleo × líquida, 5 × 6 marchas, ~24 cv × ~40 cv — são motores de gerações totalmente
// diferentes, sem peças em comum.

const HIMALAYAN411_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 API SL / JASO MA2 — troque a cada 3.000 km (uso severo) ou até 5.000-6.000 km em uso leve',
    body: 'O manual indica intervalo de referência mais longo em uso rodoviário leve, mas a maioria dos mecânicos especializados em Royal Enfield no Brasil recomenda 3.000-4.000 km para o motor a ar+óleo LS410, especialmente em clima quente ou uso urbano parado — o óleo aqui também ajuda a resfriar o motor, então degrada mais rápido que num motor líquido-refrigerado. Capacidade: cerca de 2,0-2,3L (confirme pela vareta ao completar, varia entre a primeira carga de fábrica e trocas seguintes). Use sempre 15W-50 semissintético ou sintético API SL com JASO MA2 (embreagem úmida) — Motul 5100 15W-50, Motul 7100 15W-50 (sintético) ou Royal Enfield Genuine Oil são as opções mais usadas nas concessionárias e oficinas independentes.',
  },
  {
    severity: 'OK',
    title: 'Vela BOSCH UR5CC gap 0,7-0,8mm — iridium NGK CR8EIX/CR7EIX como alternativa de maior durabilidade',
    body: 'A vela original de fábrica é a BOSCH UR5CC (mesma peça usada também nos bicilíndricos 650 da marca). Gap: 0,7-0,8mm. Muitos proprietários no Brasil optam pela NGK CR8EIX (iridium) como alternativa de maior vida útil e partida a frio mais fácil — é vendida especificamente para Himalayan/Scram 411 em lojas de peças para motos importadas e Mercado Livre. Troca recomendada: a cada 10.000-15.000 km (convencional) ou 20.000 km+ (iridium). Inspecione o gap a cada 5.000 km.',
  },
  {
    severity: 'OK',
    title: 'Corrente passo 525 × 110 elos — lubrifique a cada 500 km; folga 20-30mm',
    body: 'A transmissão final é por corrente 525 com 110 elos. Lubrifique a cada 500 km ou após pegar chuva/lama — uso misto off-road exige atenção redobrada porque terra e poeira aceleram o desgaste. Folga correta: 20-30mm no centro do trecho inferior, moto no cavalete central e câmbio em ponto morto. Kits de relação (corrente + pinhão + coroa) compatíveis DID, RK ou Royal Enfield Genuine custam na faixa de R$ 400-700 no Brasil — a rede de concessionárias já vende peça original para esse item com razoável disponibilidade, já que é item de desgaste comum a todas as gerações.',
  },
  {
    severity: 'WARN',
    title: 'Peças da Himalayan 411: rede RE ainda em expansão — planeje-se e considere fornecedores alternativos',
    body: 'A Royal Enfield tem hoje pouco mais de 40 concessionárias no Brasil (com planos de chegar a 60 até 2026), concentradas principalmente no Sudeste — em cidades menores ou outras regiões, a distância até uma loja oficial pode ser grande. Para peças de desgaste comuns (filtros, velas, correntes, pastilhas), muitas já são encontradas via distribuidores de peças genuínas parceiros e até em grandes marketplaces (Mercado Livre, lojas especializadas em importados). Para peças de motor/elétrica mais específicas, o caminho mais confiável ainda é a concessionária oficial ou pedidos diretos via importadores internacionais (Hitchcocks Motorcycles no Reino Unido, ProCycle e outros nos EUA) — planeje com antecedência, pois o frete internacional pode levar semanas.',
  },
  {
    severity: 'OK',
    title: 'Proteção de cárter e guidão são praticamente obrigatórios para quem usa off-road/misto',
    body: 'O motor LS410 fica bem exposto na parte inferior do chassi, com o cárter de óleo e o oil cooler vulneráveis a impactos com pedras em trilha. Um protetor de cárter (skid plate) resistente — muitos proprietários preferem opções aftermarket em aço mais robustas que o plástico de fábrica — evita reparo caro em caso de pancada. Proteções de guidão (handguards) também protegem alavancas de embreagem/freio em queda leve e reduzem o vento frio em viagem. Ambos os itens são vendidos como acessórios originais Royal Enfield e também por marcas aftermarket (SW-Motech, Hepco & Becker) com encaixe específico para Himalayan/Scram 411.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas: verificação periódica é obrigatória — motor SOHC com ajuste manual por parafuso',
    body: 'Diferente do novo motor Sherpa 450 (que tem folga maior entre revisões), o LS410 pede verificação de folga de válvulas a cada 5.000-8.000 km. Faixas de referência mais citadas: admissão por volta de 0,08-0,10mm e escape por volta de 0,23-0,25mm, sempre com motor frio — mas confirme os valores exatos no manual do proprietário da sua unidade/ano específico, pois pequenas variações entre versões e revisões de fábrica podem existir. Ajuste incorreto pode causar consumo de válvula prematuro ou ruído de "batida" no motor.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de óleo e filtro de ar: troque nos intervalos certos — motor a ar não perdoa sujeira',
    body: 'Filtro de óleo: troca recomendada a cada 10.000 km junto com a troca de óleo mais robusta (o kit já vem com arruelas/vedações — procure "kit revisão Himalayan 411" em lojas de peças, custa na faixa de R$ 80-150). Filtro de ar: inspecione a cada 5.000 km e substitua por volta de 10.000 km — em uso off-road com muita poeira, reduza esse intervalo pela metade. Um filtro de ar sujo é causa comum de perda de potência e consumo alto reportada por proprietários no Brasil.',
  },
  {
    severity: 'OK',
    title: 'Pneus recomendados para uso misto: Ceat, Pirelli e Metzeler têm opções específicas para a 411',
    body: 'A Himalayan 411 tem pneus originais Ceat Gripp XL (dianteiro 90/90-21, traseiro 120/90-17) com perfil intermediário entre estrada e trilha leve. Para quem faz mais estrada, o Pirelli MT60 ou Metzeler Tourance são upgrades populares com melhor comportamento no asfalto molhado. Para quem prioriza trilha, o Metzeler Karoo 3 ou Michelin Anakee Wild entregam mais tração em terra solta, ao custo de mais ruído e desgaste no asfalto. Preços na faixa de R$ 500-900 o par, dependendo da marca e disponibilidade no Brasil.',
  },
  {
    severity: 'WARN',
    title: 'Rodagem dos primeiros 1.000-1.500 km: respeite o limite de rotação recomendado',
    body: 'Como qualquer motor novo, os primeiros 1.000-1.500 km da Himalayan 411 pedem cuidado: evite manter rotação constante acima de 5.000-5.500 rpm e evite acelerações bruscas repetidas. A primeira troca de óleo geralmente é feita nas primeiras centenas de km dentro do plano de revisões gratuitas da concessionária (geralmente as 3 primeiras revisões cobertas até ~15.000 km ou 18 meses) — não pule essa revisão inicial mesmo que o óleo pareça limpo, é quando partículas metálicas de amaciamento são removidas.',
  },
]

const HIMALAYAN411_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmbio duro e dificuldade de engatar marcha (principalmente 1ª/2ª): defeito de embreagem documentado em unidades antigas',
    body: 'É um dos problemas mais citados internacionalmente em fóruns (royalenfieldowners.com, forum.himalayan-tools.com) para a Himalayan 411, especialmente em unidades mais antigas (por volta de 2016-2019): câmbio duro, dificuldade de achar o ponto morto, ou engate difícil entre 1ª e 2ª marcha logo nos primeiros milhares de km. A causa relatada com mais frequência é defeito de fabricação no conjunto de embreagem (não apenas nos discos) — quando identificado ainda dentro da garantia, a solução é a troca do conjunto completo pela concessionária. Se sua unidade (mesmo usada) apresentar esse sintoma persistente mesmo após regulagem de cabo, vale inspecionar o conjunto de embreagem antes de rodar muito mais.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela tampa do cabeçote: aperto insuficiente de parafusos é causa comum',
    body: 'Vazamento de óleo na região do cabeçote é relatado com alguma frequência pela comunidade internacional de proprietários — na maioria dos casos, resolvido com o simples reaperto dos parafusos da tampa de válvulas no torque correto (consulte o manual de serviço ou uma oficina especializada RE para o valor exato). Se o vazamento persistir após o reaperto, a junta da tampa pode estar endurecida e precisa ser substituída — peça de baixo custo, mão de obra é o item principal.',
  },
  {
    severity: 'DANGER',
    title: 'Bateria descarrega sozinha em poucos dias/semanas parada: problema recorrente reportado internacionalmente',
    body: 'É descrito como praticamente endêmico em fóruns internacionais da Himalayan 411: a bateria perde toda a carga após a moto ficar parada por poucos dias a poucas semanas, mesmo sem uso de acessórios extras. A causa mais provável é consumo residual do sistema elétrico (imobilizador, painel) mesmo com a moto desligada. Muitos proprietários instalam um interruptor de corte de bateria (battery cutoff switch) sob o banco para desconectar fisicamente o polo negativo quando a moto ficar parada por mais de alguns dias — solução simples e barata (R$ 30-60) que evita ter que trocar a bateria prematuramente ou precisar de chupeta com frequência.',
  },
  {
    severity: 'WARN',
    title: 'Marcha lenta alta e irregular, com cortes na aceleração: sintoma relatado em unidades EFI',
    body: 'Proprietários relatam marcha lenta instável (sobe e desce sozinha) com cortes ao acelerar bruscamente ou trocar de marcha em algumas unidades. Em alguns casos, o ajuste veio de uma reprogramação/remapeamento da ECU (piggyback) feito por preparadores especializados — mas isso deve ser feito com cautela e preferencialmente por oficina de confiança, pois mexer na injeção pode afetar a emissão de poluentes e a garantia. Antes de qualquer remapeamento, descarte causas simples: vela gasta, filtro de ar sujo, corpo de borboleta sujo (limpeza com spray específico resolve boa parte dos casos).',
  },
  {
    severity: 'WARN',
    title: 'Ruptura do cabo de embreagem/acelerador perto do ponto de fixação superior: lote com defeito relatado',
    body: 'Há relatos internacionais de cabos (embreagem e acelerador) se rompendo perto do ponto de fixação superior (perto do guidão) antes do esperado, atribuídos a um lote específico de cabos com defeito de fabricação. Cabos de boa qualidade (trocados ou originais de lotes posteriores) duram bem mais de 20.000 km sem problema. Sintoma de alerta: cabo começando a "desfiar" ou embreagem/acelerador ficando progressivamente mais duros — inspecione visualmente o cabo perto do guidão periodicamente e troque ao primeiro sinal de desgaste, carregar um cabo reserva em viagens longas é uma prática comum entre adventure riders.',
  },
  {
    severity: 'WARN',
    title: 'Ressecamento de graxa em rolamentos de bieletas e articulações do balancim traseiro',
    body: 'É comum encontrar relatos de graxa ressecada ou insuficiente nos rolamentos das bieletas (droplinks) e no pivô do balancim traseiro, especialmente em motos usadas mais em uso off-road/misto ou expostas a lavagens frequentes com jato de água. Sintoma: ruído de "estalo" seco na suspensão traseira em trepidação de buraco. Solução: desmontagem e reengraxamento — não é reparo caro, mas requer atenção periódica que muitos proprietários não fazem por desconhecimento, resultando em desgaste acelerado dos rolamentos.',
  },
  {
    severity: 'OK',
    title: 'Vibração perceptível é característica do monocilíndrico — não confundir com defeito',
    body: 'O motor monocilíndrico 411cc da Himalayan/Scram tem vibração perceptível em certas faixas de rotação (tipicamente acima de 5.500-6.000 rpm), especialmente sentida nos apoios de pé e no guidão — isso é esperado para esse tipo de motor e não indica problema. Vibração que piora progressivamente, muda de padrão repentinamente, ou vem acompanhada de ruído metálico diferente do normal é que merece investigação (aperto de coxins do motor, balanceamento de roda, folga de válvulas fora do especificado).',
  },
]

const HIMALAYAN411_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Himalayan 411 / Scram 411 (motor LS410, mesma base mecânica)',
    body: 'Revisão inicial (dentro do 1º mês/1.000 km, coberta pela concessionária) — troca de óleo de amaciamento, inspeção geral, reaperto de parafusos do cabeçote. | 3.000-4.000 km — Troca de óleo 15W-50 API SL/JASO MA2 (~2,0-2,3L). Lubrificar corrente. | 5.000 km — Inspecionar vela (gap 0,7-0,8mm) e filtro de ar. Verificar/ajustar folga de válvulas (adm ~0,08-0,10mm / esc ~0,23-0,25mm, motor frio — confirme no manual da sua unidade). | 10.000 km — Trocar vela BOSCH UR5CC (ou NGK CR8EIX). Trocar filtro de óleo e filtro de ar. Nova verificação de folga de válvulas. | 15.000 km — Kit relação (corrente 525 + pinhão + coroa) se desgastado. Inspecionar cabos de embreagem/acelerador. | 20.000 km — Fluido de freio DOT 4 (frente e trás). Óleo da bengala dianteira (10W). Reengraxar bieletas/pivô do balancim traseiro. | Anual (independente do km) — Testar tensão do sistema de carga com multímetro, inspecionar chicote elétrico e conectores quanto a oxidação, considerar instalar interruptor de corte de bateria se a moto ficar parada com frequência.',
  },
]

// ─── HIMALAYAN SLEET 411 EFI (edição especial camuflada) ────────────────────
// Mesma mecânica exata da Himalayan 411 padrão (motor LS410, ~24,3-25 cv @ 6.500 rpm,
// torque ~32 Nm/3,26 kgf.m @ 4.250 rpm) — a Sleet é uma EDIÇÃO ESPECIAL de visual (pintura
// camuflada em tons de cinza inspirada em neve/gelo do Himalaia) que já vem de fábrica com
// kit de acessórios: bagageiros laterais rígidos resistentes à água, ponteiras de guidão
// com peso adicional (reduz vibração) e protetor de motor com pintura eletrostática.
// Todo o conteúdo técnico de manutenção/problemas é idêntico ao da Himalayan 411 — o bloco
// abaixo reaproveita o mesmo conteúdo, seguindo o padrão de reuso já usado em outros seeds
// da base (ex.: variantes Vulcan clássicas compartilhando o mesmo conteúdo técnico).

const HIMALAYAN_SLEET_MACETES: TipInput[] = HIMALAYAN411_MACETES
const HIMALAYAN_SLEET_PROBLEMAS: TipInput[] = HIMALAYAN411_PROBLEMAS
const HIMALAYAN_SLEET_MANUTENCAO: TipInput[] = HIMALAYAN411_MANUTENCAO

// ─── HIMALAYAN 450 (Mid / Premium / Top) ─────────────────────────────────────
// Motor: Sherpa 452 — 452cc monocilíndrico DOHC 4 válvulas, refrigerado a LÍQUIDO
// (primeira Royal Enfield com esse sistema) | Diâmetro × curso: 84mm × 81,5mm
// Taxa de compressão: 11,5:1 | Potência: ~40 cv @ 8.000 rpm | Torque: ~40 Nm (4 kgf.m) @ 5.500 rpm
// Câmbio: 6 marchas | Embreagem multidisco banhada a óleo com assistida/slipper (APS)
// Óleo: 10W-50 API SN / JASO MA2 (algumas fontes citam 10W-40 — confirme no manual da sua
// unidade/ano, especificação pode variar por mercado) | Vela: NGK CR8E (referência — moto
// novíssima, confirme código exato na concessionária ao trocar)
// Pneu: 90/90-21 (F) / 140/80-17 (R) | Tanque: ~17L | Corrente com kit relação — confirme
// especificação exata na concessionária (moto lançada em 2024, pouco tempo de mercado)
// Chassi: twin-spar novo (diferente do chassi tubular simples da 411) | Suspensão Showa
// (dianteira invertida) | Painel TFT com navegação Google Maps integrada via Bluetooth
// Quickshifter: opcional/disponível em algumas versões | Lançada 2024 — chegou ao Brasil
// em 2025, entre as motos mais vendidas da marca no lançamento nacional.

const HIMALAYAN450_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-50 API SN / JASO MA2 — troca a cada 6.000 km; confirme viscosidade exata no manual da sua unidade',
    body: 'O motor Sherpa 452 líquido-refrigerado usa óleo 10W-50 semissintético (algumas fontes e revendedores citam 10W-40 — a diferença pode ser regional/por ano de fabricação, então confirme com a concessionária ou no manual específico da sua moto antes de comprar). Intervalo oficial: 6.000 km ou anual. Marcas disponíveis no Brasil: Motul 7100 10W-50 (sintético, recomendado para o perfil mais esportivo do motor DOHC), Royal Enfield Genuine Oil (vendido nas concessionárias). Por ser motor novo e mais sofisticado que o 411, não economize no óleo — use sempre a viscosidade e classificação corretas (JASO MA2 obrigatório pela embreagem úmida).',
  },
  {
    severity: 'WARN',
    title: 'Radiador e líquido de arrefecimento: cuidado redobrado — é a primeira Royal Enfield com esse sistema',
    body: 'A Himalayan 450 é a primeira Royal Enfield de produção a usar refrigeração líquida — verifique o nível do reservatório de expansão regularmente (a cada abastecimento é um bom hábito) e fique atento a qualquer queda súbita de nível, que pode indicar vazamento na mangueira ou no próprio radiador (posicionado na frente do motor, exposto a impacto de pedras em uso off-road). Líquido de arrefecimento recomendado: base etilenoglicol (ex.: Total Coolelf ou equivalente compatível com motor de alumínio). Troca do líquido: a cada 24.000 km ou 3 anos. Em uso off-road pesado, considere uma tela de proteção adicional para o radiador — não é item padrão de fábrica em todas as versões.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR8E (referência) — moto novíssima, confirme código exato na concessionária',
    body: 'Como a Himalayan 450 foi lançada em 2024 e chegou ao Brasil em 2025, o código exato de vela pode variar entre revisões de fábrica — a referência mais citada é NGK CR8E, mas SEMPRE confirme o código correto na concessionária Royal Enfield ao trocar, pois o motor DOHC de alta compressão (11,5:1) é sensível ao grau térmico certo da vela. Diferente do LS410 (motor a ar), o Sherpa 452 líquido-refrigerado tolera melhor variações de temperatura ambiente, mas ainda assim vela errada pode causar detonação/pré-ignição.',
  },
  {
    severity: 'WARN',
    title: 'Peças da Himalayan 450: modelo novíssimo — dependência quase total da rede oficial ainda',
    body: 'Diferente da Himalayan 411 (que já tem alguns anos de mercado e peças de desgaste disponíveis em fontes alternativas), a Himalayan 450 é lançamento recentíssimo (2024/2025) — praticamente toda peça de reposição, incluindo itens de desgaste, ainda depende da rede oficial de concessionárias Royal Enfield (pouco mais de 40 lojas no Brasil, com expansão prevista para 60 até 2026, concentradas no Sudeste). Se você mora longe de uma concessionária, planeje revisões com antecedência e considere isso na decisão de compra — não espere ainda encontrar peças compatíveis genéricas ou de desmanche como ocorre com o 411.',
  },
  {
    severity: 'OK',
    title: 'Corrente e kit relação: lubrifique a cada 500 km — sistema convencional apesar do motor novo',
    body: 'Apesar do salto tecnológico do motor, a transmissão final da Himalayan 450 continua sendo por corrente (não é cardã nem correia). Lubrifique a cada 500 km, especialmente em uso misto com trilha/poeira — a mesma disciplina de manutenção do 411 se aplica aqui. Confirme o passo exato e a quantidade de elos na concessionária ao comprar kit de reposição, já que a especificação pode diferir do 525×110 usado no 411 (motor com mais torque pode pedir corrente mais robusta).',
  },
  {
    severity: 'OK',
    title: 'Suspensão Showa invertida: uso off-road pede atenção ao curso e à pressão correta dos amortecedores',
    body: 'A suspensão dianteira Showa invertida da Himalayan 450 tem curso generoso, adequado para uso misto/trilha. Em uso off-road intenso, verifique o aperto dos parafusos de fixação da bengala após cada saída mais pesada e mantenha o óleo da suspensão (se ajustável) dentro da especificação — como é suspensão premium recém-lançada, qualquer reparo fora da concessionária ainda é raro no Brasil; encare a suspensão como item que exige cuidado preventivo em vez de espera por defeito.',
  },
  {
    severity: 'OK',
    title: 'Quickshifter (quando equipado): use com moderação até pegar o jeito da resposta do câmbio de 6 marchas',
    body: 'A Himalayan 450 introduziu câmbio de 6 marchas (uma a mais que o 411) e, em versões com quickshifter, permite trocar sem acionar a embreagem. Para quem vem de motos mais simples, vale rodar um período se acostumando à resposta do sistema antes de trocas muito bruscas em alta rotação — uso incorreto pode acelerar desgaste da embrecagem ou do próprio mecanismo do câmbio, mesmo sendo item projetado para isso.',
  },
  {
    severity: 'WARN',
    title: 'Painel TFT com navegação: mantenha o firmware atualizado via app do celular',
    body: 'O painel TFT com navegação Google Maps integrada via Bluetooth depende de atualizações de firmware para funcionar de forma estável — proprietários relatam melhora em bugs de conexão/tela após atualizações. Sempre pareie o painel ao app oficial Royal Enfield e mantenha o aplicativo atualizado. Problemas de tela travando ou perda de conexão Bluetooth costumam ser resolvidos com reinicialização simples (desligar/ligar a moto) ou atualização de firmware — se persistir, procure a concessionária, já que é sistema eletrônico novo com histórico ainda curto.',
  },
]

const HIMALAYAN450_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Reclamações de defeito de motor e ruído anormal já registradas no Brasil — modelo ainda muito novo',
    body: 'Por ser lançamento recentíssimo no Brasil (2025), a Himalayan 450 já acumula reclamações públicas (Reclame Aqui e grupos de proprietários) sobre ruído anormal de motor, alguns casos com a moto ficando semanas na oficina sem solução definitiva. É importante ser transparente: como é modelo novo, ainda não há o mesmo volume de histórico de longo prazo que existe para o 411 — problemas pontuais de lote inicial de produção são mais prováveis em qualquer moto recém-lançada de qualquer marca. Se notar ruído de motor fora do padrão, não ignore — leve à concessionária dentro da garantia o quanto antes e documente tudo.',
  },
  {
    severity: 'WARN',
    title: 'Relatos de folga em coluna de direção e desalinhamentos em unidades de lote inicial',
    body: 'Há relatos de proprietários brasileiros sobre folga na coluna de direção (jogo no rolamento) e desalinhamento de guidão/painéis em unidades recebidas recentemente — atribuído a controle de qualidade de lote inicial de produção, algo relativamente comum em lançamentos de motos totalmente novas. Ao retirar a moto na concessionária, faça uma inspeção detalhada: teste o giro do guidão de batente a batente, verifique alinhamento visual de painéis/tanque, e não hesite em recusar entrega se notar qualquer folga ou desalinhamento — é mais fácil resolver antes de sair da loja.',
  },
  {
    severity: 'WARN',
    title: 'Freios com ruído/chiado reportado logo nos primeiros dias de uso em algumas unidades',
    body: 'Alguns proprietários relataram ruído agudo de frenagem (chiado) já nos primeiros dias após a entrega. Antes de se preocupar, é comum pastilhas novas apresentarem esse comportamento nos primeiros ciclos de frenagem até "assentarem" no disco — mas se o ruído persistir além das primeiras centenas de km ou vier acompanhado de vibração no manete, leve à concessionária para inspeção, pode ser contaminação da pastilha (óleo/graxa) ou disco levemente empenado de fábrica.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de embreagem assistida (APS) e injeção: relatos de corte de potência limitando a moto a baixa velocidade',
    body: 'Existem relatos (não a maioria, mas documentados) de falha no sistema de embreagem assistida/injeção eletrônica causando corte de potência e limitação da moto a velocidades baixas (modo de segurança/"limp mode"). Esse tipo de falha em sistemas eletrônicos complexos é mais esperado em plataforma recém-lançada, à medida que a calibração de software amadurece com atualizações. Se isso ocorrer, a moto deve ir à concessionária para diagnóstico via scanner — não é reparo que uma oficina independente consegue fazer sem o software correto da Royal Enfield.',
  },
  {
    severity: 'WARN',
    title: 'Pintura do tanque e acabamentos: relatos de falha de pintura e início de oxidação em unidades específicas',
    body: 'Há relatos de bolhas/falhas na pintura do tanque e sinais de início de oxidação em pontos específicos em algumas unidades — mais uma vez, típico de ajuste de processo produtivo em lançamento recente. Inspecione a pintura cuidadosamente no ato da entrega, especialmente em dias de sol forte que revelam melhor imperfeições. Encere e faça manutenção de pintura regularmente (a cada 2-3 meses) para reduzir o risco de oxidação prematura, principalmente se a moto for usada/guardada perto do litoral.',
  },
  {
    severity: 'OK',
    title: 'Histórico de longo prazo ainda não existe — seja mais conservador nos intervalos até a moto completar 2-3 anos de mercado',
    body: 'É importante ser honesto: como a Himalayan 450 tem menos de 2 anos de mercado mundial e chegou ao Brasil ainda mais recentemente, problemas que só aparecem depois de 30.000-50.000 km ou vários anos de uso (fadiga de componentes, desgaste de longo prazo do sistema líquido-refrigerado, durabilidade real do quickshifter) ainda não têm dados suficientes documentados. Até que a comunidade de proprietários acumule mais quilometragem, a recomendação prudente é seguir os intervalos de manutenção À RISCA (sem "esticar" prazos como às vezes se faz com motos de plataforma madura) e não deixar de levar a moto às revisões programadas na concessionária.',
  },
]

const HIMALAYAN450_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Himalayan 450 (motor Sherpa 452, líquido-refrigerado) — moto nova, siga à risca',
    body: 'Revisão inicial (1º mês, coberta pela concessionária) — inspeção geral, torque de parafusos críticos, verificação de vazamentos. | 6.000 km — Troca de óleo 10W-50 API SN/JASO MA2 (confirme viscosidade exata no manual da sua unidade). Primeira verificação de folga de válvulas (motor DOHC shim-under-bucket — requer remoção do comando, serviço só de concessionária/oficina especializada). | 10.000 km — Trocar filtro de ar. Inspecionar vela NGK CR8E (confirmar código com a concessionária). Lubrificar corrente a cada 500 km continuamente. | 12.000 km — Segunda verificação de folga de válvulas (após as duas primeiras revisões a 6.000 km, intervalo de válvulas passa a ser mais espaçado, tipicamente a cada 12.000 km). | 20.000 km — Fluido de freio DOT 4. Verificar nível/vazamento do sistema de arrefecimento. | 24.000 km — Troca do líquido de arrefecimento (base etilenoglicol). | Anual — Atualização de firmware do painel TFT via app oficial. Inspeção visual de pintura/acabamentos quanto a oxidação prematura. IMPORTANTE: por ser modelo novíssimo (lançado 2024, chegada ao Brasil 2025), não há ainda histórico de longuíssimo prazo (80.000+ km) documentado — siga os intervalos oficiais sem esticar prazos.',
  },
]

// ─── GUERRILLA 450 (Mid / Top) ───────────────────────────────────────────────
// Motor: MESMO Sherpa 452 da Himalayan 450 — 452cc DOHC 4 válvulas líquido-refrigerado,
// ~40 cv @ 8.000 rpm, ~40 Nm @ 5.500 rpm, 6 marchas, embreagem assistida (APS)
// Chassi/postura: diferente da Himalayan — roadster urbana (menos curso de suspensão,
// postura mais baixa e esportiva, sem pretensão off-road séria)
// Suspensão: garfo telescópico convencional 43mm, curso 140mm (dianteiro) / monoamortecedor
// ajustável em pré-carga, curso 150mm (traseiro) — cursos mais curtos que a Himalayan 450
// Freios: disco ventilado 310mm dianteiro (pinça dupla) + 270mm traseiro (pinça simples), ABS
// Pneu: 120/70-17 (F) / 160/60-17 (R) — pneus de perfil de rua/roadster, bem diferentes dos
// pneus off-road da Himalayan | Tanque: ~11L | Entre-eixos: 1.440mm | Altura do assento: 780mm
// Peso em ordem de marcha: ~185kg | Lançada 2024 — chegou ao Brasil em 2025 com preços
// entre R$ 28.990 (Mid) e R$ 29.490 (Top), uma das novidades mais comentadas da marca

const GUERRILLA450_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor Sherpa 452 da Himalayan 450 — reaproveite o conhecimento técnico do óleo, vela e arrefecimento',
    body: 'A Guerrilla 450 usa o mesmo bloco Sherpa 452 líquido-refrigerado da Himalayan 450 — óleo recomendado 10W-50 API SN/JASO MA2 (confirme viscosidade exata na concessionária/manual da sua unidade), troca a cada 6.000 km. Sistema de arrefecimento líquido idêntico — verifique nível do reservatório de expansão regularmente. A diferença entre as duas motos está no chassi e na postura de pilotagem (roadster urbana × adventure), não no motor em si — todo cuidado com o motor líquido-refrigerado vale igualmente aqui.',
  },
  {
    severity: 'OK',
    title: 'Pneus de perfil de rua 120/70-17 (F) / 160/60-17 (R) — diferentes dos pneus off-road da Himalayan',
    body: 'Diferente da Himalayan 450 (pneus de perfil alto tipo trail 90/90-21/140/80-17), a Guerrilla 450 usa pneus radiais esportivos de rua nas medidas 120/70-17 (dianteiro) e 160/60-17 (traseiro), roda aro 17" nos dois eixos — configuração típica de roadster/naked. Pneus originais e opções de reposição populares no Brasil: Pirelli Diablo Rosso, Michelin Road 5, Metzeler Sportec — todos em medida amplamente disponível no mercado nacional (ao contrário dos pneus mais raros da linha Himalayan).',
  },
  {
    severity: 'WARN',
    title: 'Freios com pinça dupla dianteira: fluido DOT 4 e pastilhas de qualidade fazem diferença na resposta esportiva',
    body: 'O sistema de freio dianteiro da Guerrilla 450 (disco 310mm com pinça de pistão duplo) é mais robusto que o da Himalayan e pede fluido DOT 4 de qualidade e troca dentro do prazo (a cada 20.000 km ou 2 anos) para manter a resposta firme que o perfil mais esportivo da moto exige. Pastilhas EBC ou Vesrah são opções aftermarket citadas por proprietários que buscam mordida mais consistente que a pastilha original, mas isso é preferência pessoal — a original atende bem para uso urbano.',
  },
  {
    severity: 'WARN',
    title: 'Peças: mesma limitação da Himalayan 450 — modelo novíssimo depende quase totalmente da rede oficial',
    body: 'Por compartilhar a plataforma recém-lançada com a Himalayan 450, a Guerrilla 450 tem a mesma limitação de peças: praticamente tudo ainda passa pela rede oficial de concessionárias Royal Enfield no Brasil (pouco mais de 40 lojas, expansão prevista para 60 até 2026). Diferente do universo consolidado do Himalayan 411, ainda não existe uma rede de fornecedores alternativos ou peças de desmanche compatíveis para essa geração — planeje revisões com antecedência.',
  },
  {
    severity: 'OK',
    title: 'Postura roadster: menos peso na suspensão off-road significa manutenção de suspensão mais simples',
    body: 'Como a Guerrilla 450 não é pensada para uso off-road sério (curso de suspensão mais curto: 140mm dianteiro / 150mm traseiro, contra cursos maiores da Himalayan), a manutenção da suspensão tende a ser mais simples e espaçada — menos exposição a impactos de trilha, menos necessidade de reengraxamento frequente de articulações. Ainda assim, mantenha a lubrificação da corrente em dia (a cada 500 km) mesmo em uso 100% urbano — corrente seca desgasta rápido independente do tipo de solo.',
  },
  {
    severity: 'OK',
    title: 'Corrente e kit relação: mesma disciplina de manutenção do Sherpa 452, mesmo em uso urbano',
    body: 'A transmissão final por corrente da Guerrilla 450 exige a mesma atenção que qualquer moto com corrente: lubrificação a cada 500 km, ajuste de folga conforme especificação de fábrica (confirme na concessionária, especificação pode variar da Himalayan por causa da relação final diferente entre as duas motos). Uso 100% urbano com trânsito parado tende a acumular mais sujeira/graxa na corrente que uso rodoviário — limpe com desengraxante específico antes de relubrificar.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem assistida (APS): resposta mais leve no manete — não force troca de marcha sem necessidade',
    body: 'O sistema APS (assist and slipper clutch) da Guerrilla 450 deixa o manete de embreagem mais leve e ajuda a evitar travamento de roda traseira em reduções bruscas de marcha — é tecnologia relativamente nova para a marca. Evite "descontar" trocas de marcha de forma agressiva mesmo com o sistema slipper, pois ainda é desgaste mecânico real no conjunto. Como o sistema é novo na linha Royal Enfield, o histórico de durabilidade de longo prazo ainda está sendo construído pelos primeiros proprietários.',
  },
  {
    severity: 'OK',
    title: 'Uso urbano intenso: revise filtro de ar com mais frequência em cidades com muito material particulado',
    body: 'Embora não seja moto pensada para trilha, uso urbano intenso em cidades grandes (poluição, poeira de obra, trânsito parado com calor do motor de outros veículos) também suja o filtro de ar mais rápido que o esperado. Inspecione a cada 8.000-10.000 km mesmo em uso 100% asfalto — não é só trilha que suja filtro de ar.',
  },
]

const GUERRILLA450_PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Modelo novíssimo — poucos problemas de longo prazo documentados ainda, avaliação preliminar apenas',
    body: 'A Guerrilla 450 foi lançada globalmente em 2024 e chegou ao Brasil apenas em 2025 — é honestamente cedo demais para afirmar quais serão os problemas crônicos de longo prazo desta moto. Compartilha o motor Sherpa 452 com a Himalayan 450 (ver problemas reportados dessa plataforma: ruído de motor em algumas unidades, folgas de montagem em lote inicial, relatos pontuais de corte de potência via sistema eletrônico) — é razoável esperar riscos similares por ser a mesma base mecânica, mas o chassi/postura diferente da Guerrilla ainda não gerou queixas específicas próprias em volume relevante até o momento desta pesquisa.',
  },
  {
    severity: 'WARN',
    title: 'Riscos típicos de plataforma nova: fique atento a ruído de motor e qualidade de acabamento na entrega',
    body: 'Como compartilha o motor Sherpa 452 recém-lançado da Himalayan 450, é prudente aplicar a mesma cautela: na entrega da moto, teste o motor em marcha lenta e em aceleração buscando ruídos anormais, verifique alinhamento de painéis/tanque e o giro livre do guidão. Documente qualquer imperfeição junto à concessionária no ato da entrega — é a melhor defesa em caso de necessidade de garantia futura.',
  },
  {
    severity: 'WARN',
    title: 'Postura esportiva pode mascarar desgaste de pneu traseiro mais rápido que o esperado',
    body: 'A postura roadster e o motor de 40 cv convidam a uma pilotagem mais esportiva que a Himalayan — isso significa desgaste de pneu traseiro potencialmente mais rápido em uso agressivo (acelerações fortes, curvas em ritmo). Monitore o desgaste do pneu 160/60-17 regularmente, especialmente se você é do tipo que "testa" a potência da moto com frequência.',
  },
  {
    severity: 'WARN',
    title: 'Sistema eletrônico (painel TFT, conectividade) compartilha os mesmos riscos de bugs da Himalayan 450',
    body: 'Por usar a mesma plataforma eletrônica da Himalayan 450 (painel TFT, conectividade Bluetooth com o app Royal Enfield), a Guerrilla 450 está sujeita aos mesmos tipos de bug reportados na irmã adventure: perda de conexão Bluetooth, necessidade de atualização de firmware. Mantenha o app e o firmware atualizados e não hesite em contatar a concessionária se a tela travar com frequência incomum.',
  },
  {
    severity: 'OK',
    title: 'Freios e suspensão mais orientados à rua: menos desgaste por impacto que a Himalayan em uso misto',
    body: 'Por não ser pensada para trilha, a Guerrilla 450 tende a sofrer menos com os problemas de exposição a impacto que afetam motos adventure (protetor de cárter, radiador exposto a pedras) — se você não pretende usar fora do asfalto, os riscos de dano por uso off-road simplesmente não se aplicam tanto quanto na Himalayan 450 ou na Scram 411.',
  },
  {
    severity: 'WARN',
    title: 'Falta de histórico de recall ou boletins de serviço de longo prazo — acompanhe comunicados da marca',
    body: 'Sendo um lançamento tão recente, ainda não há base de dados robusta sobre recalls ou boletins técnicos de serviço (TSBs) de médio/longo prazo para a Guerrilla 450 no Brasil. Recomenda-se acompanhar comunicados oficiais da Royal Enfield do Brasil e grupos de proprietários (Facebook, fóruns) para se manter informado sobre qualquer campanha de atualização ou reparo que venha a ser anunciada nos próximos anos de uso do modelo.',
  },
]

const GUERRILLA450_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Guerrilla 450 (mesmo motor Sherpa 452 da Himalayan 450, chassi roadster)',
    body: 'Revisão inicial (1º mês, coberta pela concessionária) — inspeção geral, torque de parafusos críticos. | 6.000 km — Troca de óleo 10W-50 API SN/JASO MA2 (confirme viscosidade no manual/concessionária). Primeira verificação de folga de válvulas (motor DOHC — serviço de concessionária). Lubrificação de corrente a cada 500 km continuamente. | 10.000 km — Filtro de ar (reduza o intervalo em uso urbano muito poluído). Inspecionar vela. | 12.000 km — Segunda verificação de folga de válvulas (intervalo se espaça após as duas primeiras). | 20.000 km — Fluido de freio DOT 4 (sistema com pinça dupla dianteira — mais pontos de purga). Verificar nível do líquido de arrefecimento. | 24.000 km — Troca do líquido de arrefecimento. | Anual — Atualização de firmware do painel TFT. Inspeção de pastilhas de freio (perfil esportivo desgasta mais rápido que o adventure). IMPORTANTE: modelo lançado em 2024/chegada ao Brasil em 2025 — sem histórico de longuíssimo prazo ainda, siga os intervalos oficiais sem esticar prazos.',
  },
]

// ─── SCRAM 411 ────────────────────────────────────────────────────────────────
// Motor: MESMO LS410 da Himalayan 411 — 411cc SOHC 2 válvulas, refrigerado a ar+óleo,
// ~24,3 cv @ 6.500 rpm, torque ~32 Nm @ 4.250 rpm, injeção eletrônica, 5 marchas
// Diferenças de chassi vs Himalayan 411: roda dianteira menor (19" com pneu 100/90-19,
// em vez de 21"), roda traseira 17" com pneu 120/90-17, suspensão com curso mais curto
// (garfo 41mm / monoamortecedor 180mm), visual mais urbano/scrambler, sem bagageiros
// de fábrica como a Himalayan. Freios com ABS nas duas rodas, disco 300mm (F) / 240mm (R)
// Tanque: ~15L | Peso: ~185kg (seco) / ~195kg (em ordem de marcha) | Lançada 2022 (chegou
// ao Brasil 2023) | Preço de lançamento no Brasil na faixa de R$ 24.490

const SCRAM411_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor LS410 da Himalayan 411 — todo o conhecimento de óleo, vela e revisão se aplica igual',
    body: 'A Scram 411 compartilha o motor LS410 411cc a ar+óleo com a Himalayan 411 — óleo 15W-50 API SL/JASO MA2, troca a cada 3.000-4.000 km em uso urbano/severo. Vela BOSCH UR5CC gap 0,7-0,8mm (ou NGK CR8EIX iridium como alternativa). Sendo o motor mais maduro da marca no Brasil (mesma base desde 2016), peças de desgaste e conhecimento de oficinas independentes já são mais consolidados que na linha 450 — aproveite esse histórico ao procurar mecânico de confiança.',
  },
  {
    severity: 'OK',
    title: 'Roda dianteira 19" com pneu 100/90-19 — diferente da 21" da Himalayan, procure a medida certa',
    body: 'A Scram 411 tem roda dianteira menor (aro 19", pneu 100/90-19) comparada à Himalayan 411 (aro 21", pneu 90/90-21) — não confunda ao comprar pneu de reposição, são medidas diferentes mesmo compartilhando motor e boa parte do chassi. Traseiro: 120/90-17, o mesmo aro 17" da Himalayan. Pneus recomendados para o perfil mais urbano da Scram: Ceat Gripp XL (original), Pirelli MT60 ou Metzeler Tourance para quem ainda quer alguma capacidade leve de terra/cascalho.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 × 110 elos e folga de válvulas: mesmos parâmetros da Himalayan 411',
    body: 'A Scram 411 usa a mesma especificação de corrente (passo 525, 110 elos) e a mesma faixa de folga de válvulas do motor LS410 (referência: admissão ~0,08-0,10mm / escape ~0,23-0,25mm, motor frio — confirme no manual da sua unidade). Lubrifique a corrente a cada 500 km. Como a suspensão da Scram é mais curta e voltada à rua, o desgaste de corrente tende a ser um pouco mais previsível que em uso off-road pesado da Himalayan.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão mais curta: não trate a Scram como off-road pesado apesar do visual scrambler',
    body: 'O visual scrambler da Scram 411 pode passar a impressão de capacidade off-road similar à Himalayan, mas o curso de suspensão é bem mais curto (garfo 41mm / monoamortecedor 180mm de curso, contra cursos maiores da Himalayan) — trilha leve e cascalho ela resolve bem, mas trilha técnica pesada ou saltos vão estressar a suspensão além do projetado, podendo causar fundo de curso repetido e desgaste acelerado de retentores.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com a Himalayan 411: aproveite a maior disponibilidade de mercado',
    body: 'Por compartilhar motor e boa parte da mecânica com a Himalayan 411 (moto no mercado desde 2016, com anos de peças de desgaste já disponíveis via distribuidores e importadores), a Scram 411 se beneficia dessa maturidade de peças — filtro de óleo, vela, kit relação e itens de desgaste geral já são mais fáceis de encontrar que os equivalentes da linha 450, mesmo com a rede de concessionárias ainda em expansão no Brasil. Itens específicos de chassi (rodas, suspensão dianteira mais curta) são exclusivos da Scram e dependem mais da rede oficial.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar e óleo: mesma disciplina do 411 — 5.000 km inspeção, 10.000 km troca',
    body: 'Filtro de ar: inspecione a cada 5.000 km, troque por volta de 10.000 km (reduza pela metade em uso com muita poeira). Filtro de óleo: troque a cada 10.000 km junto com óleo mais robusto. Kits de revisão específicos "Himalayan/Scram 411" já são vendidos com essa nomenclatura conjunta em lojas de peças, evidenciando a compatibilidade entre as duas motos.',
  },
  {
    severity: 'WARN',
    title: 'Freios ABS nas duas rodas: fluido DOT 4 em dia é ainda mais importante com discos menores (300mm/240mm)',
    body: 'A Scram 411 usa discos ligeiramente menores que outras adventures da categoria (300mm dianteiro, 240mm traseiro) — a resposta de frenagem depende ainda mais de fluido de qualidade e pastilhas em bom estado. Troque o fluido DOT 4 a cada 20.000 km ou 2 anos, e inspecione as pastilhas visualmente a cada 6.000-8.000 km, especialmente se usa a moto em trânsito urbano intenso com frenagens frequentes.',
  },
  {
    severity: 'OK',
    title: 'Rodagem inicial e revisões cobertas: mesmo protocolo de qualquer Royal Enfield nova',
    body: 'Como qualquer Royal Enfield 0km, respeite o limite de rotação nos primeiros 1.000-1.500 km (evite manter acima de 5.000-5.500 rpm por períodos longos) e não pule as revisões cobertas pela concessionária dentro do programa de manutenção gratuita inicial — é quando partículas de amaciamento são removidas do óleo e pequenos ajustes de fábrica são corrigidos sem custo.',
  },
]

const SCRAM411_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Compartilha os mesmos riscos documentados do motor LS410 da Himalayan 411',
    body: 'Por usar o mesmo bloco de motor da Himalayan 411, a Scram 411 está sujeita aos mesmos problemas documentados internacionalmente nessa plataforma: histórico de dificuldade de câmbio/embreagem em unidades mais antigas (2016-2019, menos relevante para a Scram que só existe desde 2022 com motor já revisado), vazamento ocasional pela tampa do cabeçote, bateria que descarrega rápido parada por dias, e vibração característica do monocilíndrico em alta rotação (não é defeito).',
  },
  {
    severity: 'WARN',
    title: 'Fundo de curso da suspensão em uso off-road mais pesado: consequência do curso mais curto',
    body: 'Como o curso de suspensão da Scram é mais curto que o da Himalayan (projetado para uso predominantemente urbano/rodoviário com alguma trilha leve), usá-la de forma mais agressiva em trilha técnica pode causar fundo de curso repetido — sintoma de "batida seca" na suspensão em buracos maiores ou saltos. Não é defeito de fabricação, é limitação de projeto — se você pretende fazer trilha pesada com regularidade, a Himalayan (411 ou 450) é a escolha mais adequada da linha, não a Scram.',
  },
  {
    severity: 'WARN',
    title: 'Ruído/dificuldade de câmbio em algumas unidades — mesma causa-raiz relatada na Himalayan',
    body: 'Assim como a Himalayan 411, há relatos pontuais de dificuldade de engate de marcha (especialmente 1ª/2ª) em algumas unidades da Scram 411, principalmente em modelos de lote de produção inicial (2022-2023). Se notar o sintoma persistente mesmo após ajuste de cabo de embreagem, procure a concessionária dentro da garantia — o conjunto de embreagem, se com defeito, deve ser trocado pela rede oficial.',
  },
  {
    severity: 'WARN',
    title: 'Descarga de bateria em poucos dias parada: mesmo problema relatado na Himalayan 411',
    body: 'Como compartilha boa parte do chicote elétrico e sistema de imobilizador com a Himalayan 411, a Scram 411 também tem relatos de bateria perdendo carga rapidamente quando a moto fica parada por poucos dias/semanas. A mesma solução se aplica: considerar interruptor de corte de bateria sob o banco para uso esporádico, ou desconectar o polo negativo manualmente antes de períodos longos parada.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela tampa do cabeçote: verifique reaperto em unidades com mais quilometragem',
    body: 'Assim como no motor equivalente da Himalayan, vazamento de óleo pela região da tampa de válvulas é relatado ocasionalmente e geralmente resolvido com reaperto correto dos parafusos (torque conforme manual de serviço) — se persistir, a junta pode precisar de substituição, item de baixo custo com mão de obra sendo o principal componente do reparo.',
  },
  {
    severity: 'OK',
    title: 'Menos histórico específico de problemas de chassi/suspensão que a Himalayan — moto mais nova nessa configuração',
    body: 'Como a configuração scrambler urbana da Scram 411 existe desde 2022 (mais recente que a Himalayan 411 de 2016), ainda há relativamente menos volume de relatos específicos sobre desgaste de suspensão/chassi de longuíssimo prazo (50.000+ km) comparado à Himalayan. É razoável esperar boa parte da robustez do motor consolidado, mas seja criterioso ao avaliar uma unidade muito rodada — peça histórico de manutenção documentado sempre que possível.',
  },
]

const SCRAM411_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Scram 411 (motor LS410, mesma base da Himalayan 411)',
    body: 'Revisão inicial (1º mês, coberta pela concessionária) — troca de óleo de amaciamento, inspeção geral. | 3.000-4.000 km — Troca de óleo 15W-50 API SL/JASO MA2 (~2,0-2,3L). Lubrificar corrente. | 5.000 km — Inspecionar vela (gap 0,7-0,8mm) e filtro de ar. Verificar folga de válvulas (adm ~0,08-0,10mm / esc ~0,23-0,25mm, motor frio — confirme no manual). | 10.000 km — Trocar vela BOSCH UR5CC (ou NGK CR8EIX). Trocar filtro de óleo e filtro de ar. | 15.000 km — Kit relação (corrente 525 + pinhão + coroa) se desgastado. Inspecionar cabos de embreagem/acelerador. | 20.000 km — Fluido de freio DOT 4 (frente e trás, discos 300mm/240mm). Óleo da bengala dianteira. | Anual — Testar tensão do sistema de carga, inspecionar chicote elétrico quanto a oxidação, considerar interruptor de corte de bateria para uso esporádico.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────
// 5 modelName cobrindo as 8 variantes exatas da API FIPE (marca Royal Enfield, código 192):
//   "Himalayan 411"          → casa "Himalayan 411 EFI"
//   "Himalayan Sleet 411 EFI" → casa "Himalayan Sleet 411 EFI" (nome completo — "Sleet" quebra
//                               a contiguidade de "Himalayan ... 411", exige match exato)
//   "Himalayan 450"          → casa "Himalayan 450 Mid", "Himalayan 450 Premium", "Himalayan 450 Top"
//   "Guerrilla 450"          → casa "Guerrilla 450 Mid", "Guerrilla 450 Top"
//   "Scram 411"              → casa "Scram 411 EFI"

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Himalayan 411',
    yearFrom: 2016,
    yearTo: 2025,
    MACETES: HIMALAYAN411_MACETES,
    PROBLEMAS: HIMALAYAN411_PROBLEMAS,
    MANUTENCAO: HIMALAYAN411_MANUTENCAO,
  },
  {
    modelName: 'Himalayan Sleet 411 EFI',
    yearFrom: 2019,
    yearTo: 2022,
    MACETES: HIMALAYAN_SLEET_MACETES,
    PROBLEMAS: HIMALAYAN_SLEET_PROBLEMAS,
    MANUTENCAO: HIMALAYAN_SLEET_MANUTENCAO,
  },
  {
    modelName: 'Himalayan 450',
    yearFrom: 2024,
    yearTo: null,
    MACETES: HIMALAYAN450_MACETES,
    PROBLEMAS: HIMALAYAN450_PROBLEMAS,
    MANUTENCAO: HIMALAYAN450_MANUTENCAO,
  },
  {
    modelName: 'Guerrilla 450',
    yearFrom: 2024,
    yearTo: null,
    MACETES: GUERRILLA450_MACETES,
    PROBLEMAS: GUERRILLA450_PROBLEMAS,
    MANUTENCAO: GUERRILLA450_MANUTENCAO,
  },
  {
    modelName: 'Scram 411',
    yearFrom: 2022,
    yearTo: null,
    MACETES: SCRAM411_MACETES,
    PROBLEMAS: SCRAM411_PROBLEMAS,
    MANUTENCAO: SCRAM411_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Himalayan 411',
    yearFrom: 2016, yearTo: 2025,
    tireSize: '90/90-21 (F) · 120/90-17 (R)',
    frontPsi: 25, rearPsi: 32,
    frontPsiLoad: 27, rearPsiLoad: 34,
    notes: 'Solo: F 25 / R 32 PSI. Com carona/bagagem: F 27 / R 34 PSI. Valores conforme manual internacional do proprietário — fontes têm pequena variação (25-27 PSI dianteiro), sempre confira a etiqueta da sua unidade. Em uso off-road/trilha, pode-se reduzir levemente a pressão dianteira (2-3 PSI) para melhorar tração em terra solta — recalibre para valores de estrada antes de voltar ao asfalto.',
  },
  {
    modelName: 'Himalayan Sleet 411 EFI',
    yearFrom: 2019, yearTo: 2022,
    tireSize: '90/90-21 (F) · 120/90-17 (R)',
    frontPsi: 25, rearPsi: 32,
    frontPsiLoad: 27, rearPsiLoad: 34,
    notes: 'Mesma especificação da Himalayan 411 padrão — mesma mecânica, edição visual/acessórios. Solo: F 25 / R 32 PSI. Com carona/bagagem: F 27 / R 34 PSI.',
  },
  {
    modelName: 'Himalayan 450',
    yearFrom: 2024, yearTo: null,
    tireSize: '90/90-21 (F) · 140/80-17 (R)',
    frontPsi: 26, rearPsi: 29,
    frontPsiLoad: 26, rearPsiLoad: 32,
    notes: 'Solo: F 26 / R 29 PSI (referência oficial em fontes brasileiras). Com carona/bagagem: aumentar aproximadamente +2/+3 PSI no traseiro — confirme valor exato de carga no manual, moto ainda recente com poucas fontes consolidadas. Pneu traseiro 140/80-17 é mais largo que o 120/90-17 do 411.',
  },
  {
    modelName: 'Guerrilla 450',
    yearFrom: 2024, yearTo: null,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 29, rearPsi: 33,
    frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Solo: F 29 / R 33 PSI (estimativa baseada em pneus radiais de perfil de rua equivalentes — a Royal Enfield ainda não publicou tabela de calibragem amplamente disseminada em português para este lançamento recente; confirme na concessionária ou na etiqueta da moto). Com carona: F 29 / R 36 PSI. Pneus de perfil totalmente diferente da linha Himalayan (radiais esportivos, não trail).',
  },
  {
    modelName: 'Scram 411',
    yearFrom: 2022, yearTo: null,
    tireSize: '100/90-19 (F) · 120/90-17 (R)',
    frontPsi: 26, rearPsi: 32,
    frontPsiLoad: 28, rearPsiLoad: 34,
    notes: 'Solo: F 26 / R 32 PSI. Com carona/bagagem: F 28 / R 34 PSI. Roda dianteira 19" (diferente da 21" da Himalayan) — não confunda a medida do pneu dianteiro ao comprar reposição.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // Himalayan 411
  { modelName: 'Himalayan 411', yearFrom: 2016, yearTo: 2025, component: 'Óleo 15W-50 API SL / JASO MA2 (~2,0-2,3L)', intervalKm: 4000, intervalMonths: 6, notes: 'Motor a ar+óleo LS410. Em uso severo/urbano intenso, reduzir para 3.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'Himalayan 411', yearFrom: 2016, yearTo: 2025, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Kit revisão com arruelas/vedações — R$ 80-150.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Himalayan 411', yearFrom: 2016, yearTo: 2025, component: 'Vela BOSCH UR5CC (gap 0,7-0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Alternativa iridium: NGK CR8EIX, maior durabilidade.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Himalayan 411', yearFrom: 2016, yearTo: 2025, component: 'Lubrificação da corrente 525 × 110 elos', intervalKm: 500, intervalMonths: null, notes: 'Folga 20-30mm no centro do trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'Himalayan 411', yearFrom: 2016, yearTo: 2025, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: 12, notes: 'Inspecionar a cada 5.000 km. Reduzir intervalo pela metade em uso off-road com poeira.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Himalayan 411', yearFrom: 2016, yearTo: 2025, component: 'Folga de válvulas (adm ~0,08-0,10mm / esc ~0,23-0,25mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio obrigatório. Confirme valores exatos no manual da sua unidade/ano.', priority: 'HIGH', order: 6 },
  { modelName: 'Himalayan 411', yearFrom: 2016, yearTo: 2025, component: 'Kit relação (corrente 525 + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: 'DID, RK ou Royal Enfield Genuine. R$ 400-700.', priority: 'HIGH', order: 7 },
  { modelName: 'Himalayan 411', yearFrom: 2016, yearTo: 2025, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: 'Bienal obrigatório, frente e trás.', priority: 'HIGH', order: 8 },
  { modelName: 'Himalayan 411', yearFrom: 2016, yearTo: 2025, component: 'Óleo da bengala dianteira (10W)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar junto com inspeção de retentores.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Himalayan 411', yearFrom: 2016, yearTo: 2025, component: 'Reengraxamento de bieletas e pivô do balancim traseiro', intervalKm: 20000, intervalMonths: 24, notes: 'Uso off-road/lavagem frequente acelera ressecamento da graxa.', priority: 'MEDIUM', order: 10 },
  { modelName: 'Himalayan 411', yearFrom: 2016, yearTo: 2025, component: 'Verificação do sistema de carga e conectores elétricos', intervalKm: null, intervalMonths: 12, notes: 'Bateria com histórico de descarga rápida parada — considerar interruptor de corte.', priority: 'MEDIUM', order: 11 },

  // Himalayan Sleet 411 EFI (mesmos itens da Himalayan 411)
  { modelName: 'Himalayan Sleet 411 EFI', yearFrom: 2019, yearTo: 2022, component: 'Óleo 15W-50 API SL / JASO MA2 (~2,0-2,3L)', intervalKm: 4000, intervalMonths: 6, notes: 'Mesma mecânica LS410 da Himalayan 411 padrão.', priority: 'HIGH', order: 1 },
  { modelName: 'Himalayan Sleet 411 EFI', yearFrom: 2019, yearTo: 2022, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Kit revisão com arruelas/vedações.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Himalayan Sleet 411 EFI', yearFrom: 2019, yearTo: 2022, component: 'Vela BOSCH UR5CC (gap 0,7-0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Alternativa iridium NGK CR8EIX.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Himalayan Sleet 411 EFI', yearFrom: 2019, yearTo: 2022, component: 'Lubrificação da corrente 525 × 110 elos', intervalKm: 500, intervalMonths: null, notes: 'Folga 20-30mm.', priority: 'HIGH', order: 4 },
  { modelName: 'Himalayan Sleet 411 EFI', yearFrom: 2019, yearTo: 2022, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: 12, notes: 'Inspecionar a cada 5.000 km.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Himalayan Sleet 411 EFI', yearFrom: 2019, yearTo: 2022, component: 'Folga de válvulas (adm ~0,08-0,10mm / esc ~0,23-0,25mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'Himalayan Sleet 411 EFI', yearFrom: 2019, yearTo: 2022, component: 'Kit relação (corrente 525 + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: 'Mesma peça da Himalayan 411 padrão.', priority: 'HIGH', order: 7 },
  { modelName: 'Himalayan Sleet 411 EFI', yearFrom: 2019, yearTo: 2022, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 8 },
  { modelName: 'Himalayan Sleet 411 EFI', yearFrom: 2019, yearTo: 2022, component: 'Verificação do sistema de carga e bateria', intervalKm: null, intervalMonths: 12, notes: 'Mesmo histórico de descarga rápida da Himalayan 411.', priority: 'MEDIUM', order: 9 },

  // Himalayan 450
  { modelName: 'Himalayan 450', yearFrom: 2024, yearTo: null, component: 'Óleo 10W-50 API SN / JASO MA2', intervalKm: 6000, intervalMonths: 12, notes: 'Motor Sherpa 452 líquido-refrigerado. Confirme viscosidade exata no manual/concessionária.', priority: 'HIGH', order: 1 },
  { modelName: 'Himalayan 450', yearFrom: 2024, yearTo: null, component: 'Filtro de óleo', intervalKm: 6000, intervalMonths: 12, notes: 'Trocar junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Himalayan 450', yearFrom: 2024, yearTo: null, component: 'Vela NGK CR8E (referência — confirmar código na concessionária)', intervalKm: 10000, intervalMonths: null, notes: 'Modelo novo, confirme código exato ao trocar.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Himalayan 450', yearFrom: 2024, yearTo: null, component: 'Folga de válvulas (DOHC shim-under-bucket)', intervalKm: 6000, intervalMonths: 12, notes: 'Primeiras duas revisões a 6.000 km; depois passa a 12.000 km. Só concessionária/oficina especializada.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Himalayan 450', yearFrom: 2024, yearTo: null, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Confirme passo/elos exatos na concessionária.', priority: 'HIGH', order: 5 },
  { modelName: 'Himalayan 450', yearFrom: 2024, yearTo: null, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: 12, notes: 'Inspecionar com mais frequência em uso off-road.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Himalayan 450', yearFrom: 2024, yearTo: null, component: 'Líquido de arrefecimento — verificação de nível', intervalKm: null, intervalMonths: 3, notes: 'Primeira Royal Enfield com refrigeração líquida — atenção redobrada a vazamentos.', priority: 'HIGH', order: 7 },
  { modelName: 'Himalayan 450', yearFrom: 2024, yearTo: null, component: 'Troca do líquido de arrefecimento', intervalKm: 24000, intervalMonths: 36, notes: 'Base etilenoglicol (ex.: Total Coolelf ou equivalente).', priority: 'HIGH', order: 8 },
  { modelName: 'Himalayan 450', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 9 },
  { modelName: 'Himalayan 450', yearFrom: 2024, yearTo: null, component: 'Atualização de firmware do painel TFT', intervalKm: null, intervalMonths: 12, notes: 'Via app oficial Royal Enfield — resolve boa parte dos bugs de conectividade.', priority: 'LOW', order: 10 },
  { modelName: 'Himalayan 450', yearFrom: 2024, yearTo: null, component: 'Inspeção geral (motor, acabamento, folgas) — modelo novo', intervalKm: null, intervalMonths: 6, notes: 'Sem histórico de longo prazo ainda — inspeção preventiva mais frequente recomendada.', priority: 'MEDIUM', order: 11 },

  // Guerrilla 450
  { modelName: 'Guerrilla 450', yearFrom: 2024, yearTo: null, component: 'Óleo 10W-50 API SN / JASO MA2', intervalKm: 6000, intervalMonths: 12, notes: 'Mesmo motor Sherpa 452 da Himalayan 450.', priority: 'HIGH', order: 1 },
  { modelName: 'Guerrilla 450', yearFrom: 2024, yearTo: null, component: 'Filtro de óleo', intervalKm: 6000, intervalMonths: 12, notes: 'Trocar junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Guerrilla 450', yearFrom: 2024, yearTo: null, component: 'Vela NGK CR8E (referência — confirmar código na concessionária)', intervalKm: 10000, intervalMonths: null, notes: 'Modelo novo, confirme código exato.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Guerrilla 450', yearFrom: 2024, yearTo: null, component: 'Folga de válvulas (DOHC shim-under-bucket)', intervalKm: 6000, intervalMonths: 12, notes: 'Primeiras duas revisões a 6.000 km; depois passa a 12.000 km. Só concessionária.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Guerrilla 450', yearFrom: 2024, yearTo: null, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Confirme passo/elos na concessionária — relação final pode diferir da Himalayan 450.', priority: 'HIGH', order: 5 },
  { modelName: 'Guerrilla 450', yearFrom: 2024, yearTo: null, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: 12, notes: 'Reduza intervalo em cidades com muita poluição/poeira.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Guerrilla 450', yearFrom: 2024, yearTo: null, component: 'Líquido de arrefecimento — verificação de nível', intervalKm: null, intervalMonths: 3, notes: 'Mesmo sistema líquido da Himalayan 450.', priority: 'HIGH', order: 7 },
  { modelName: 'Guerrilla 450', yearFrom: 2024, yearTo: null, component: 'Troca do líquido de arrefecimento', intervalKm: 24000, intervalMonths: 36, notes: 'Base etilenoglicol.', priority: 'HIGH', order: 8 },
  { modelName: 'Guerrilla 450', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4 (pinça dupla dianteira)', intervalKm: 20000, intervalMonths: 24, notes: 'Sistema com mais pontos de purga que a Himalayan.', priority: 'HIGH', order: 9 },
  { modelName: 'Guerrilla 450', yearFrom: 2024, yearTo: null, component: 'Pastilhas de freio — inspeção', intervalKm: 8000, intervalMonths: 12, notes: 'Perfil esportivo/urbano desgasta mais rápido que uso adventure.', priority: 'MEDIUM', order: 10 },
  { modelName: 'Guerrilla 450', yearFrom: 2024, yearTo: null, component: 'Atualização de firmware do painel TFT', intervalKm: null, intervalMonths: 12, notes: 'Via app oficial Royal Enfield.', priority: 'LOW', order: 11 },

  // Scram 411
  { modelName: 'Scram 411', yearFrom: 2022, yearTo: null, component: 'Óleo 15W-50 API SL / JASO MA2 (~2,0-2,3L)', intervalKm: 4000, intervalMonths: 6, notes: 'Mesmo motor LS410 da Himalayan 411.', priority: 'HIGH', order: 1 },
  { modelName: 'Scram 411', yearFrom: 2022, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Kit revisão compartilhado com a Himalayan 411.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Scram 411', yearFrom: 2022, yearTo: null, component: 'Vela BOSCH UR5CC (gap 0,7-0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Alternativa iridium NGK CR8EIX.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Scram 411', yearFrom: 2022, yearTo: null, component: 'Lubrificação da corrente 525 × 110 elos', intervalKm: 500, intervalMonths: null, notes: 'Folga 20-30mm.', priority: 'HIGH', order: 4 },
  { modelName: 'Scram 411', yearFrom: 2022, yearTo: null, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: 12, notes: 'Inspecionar a cada 5.000 km.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Scram 411', yearFrom: 2022, yearTo: null, component: 'Folga de válvulas (adm ~0,08-0,10mm / esc ~0,23-0,25mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio obrigatório. Confirme valores no manual da sua unidade.', priority: 'HIGH', order: 6 },
  { modelName: 'Scram 411', yearFrom: 2022, yearTo: null, component: 'Kit relação (corrente 525 + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: 'Peça compartilhada com a Himalayan 411.', priority: 'HIGH', order: 7 },
  { modelName: 'Scram 411', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4 (discos 300mm/240mm)', intervalKm: 20000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 8 },
  { modelName: 'Scram 411', yearFrom: 2022, yearTo: null, component: 'Óleo da bengala dianteira 41mm', intervalKm: 20000, intervalMonths: null, notes: 'Suspensão mais curta que a Himalayan — inspecionar fundo de curso em uso off-road.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Scram 411', yearFrom: 2022, yearTo: null, component: 'Verificação do sistema de carga e bateria', intervalKm: null, intervalMonths: 12, notes: 'Mesmo histórico de descarga rápida da Himalayan 411.', priority: 'MEDIUM', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Royal Enfield Sherpa/Adventure (Himalayan 411/450, Guerrilla 450, Scram 411)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Royal Enfield', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'Royal Enfield', vehicleTypeId: motoType.id },
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
        yearFrom: null,
        yearTo: null,
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

  console.log('✅ Royal Enfield Sherpa/Adventure concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
