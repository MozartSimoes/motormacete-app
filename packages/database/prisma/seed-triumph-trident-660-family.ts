// seed-triumph-trident-660-family.ts — Triumph Trident 660, Trident 660 Triple Tribute,
// Trident 800, Daytona 660 e Tiger 660 Sport (plataforma tricilíndrica 660cc/798cc de entrada)
// Todos derivados do motor tricilíndrico 660cc lançado no Trident 660 em 2021 (~80cv),
// que recebeu atualização global para ~95cv no ano-modelo 2026 (corpo de borboleta triplo).
// São os modelos mais acessíveis e recentes da Triumph — montagem nacional em Manaus (AM),
// importantes para quem está entrando na marca agora com a expansão da Triumph no Brasil.
// Execute: pnpm --filter @motormacete/database db:seed:triumph-trident-660-family
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

// ─── TRIDENT 660 ──────────────────────────────────────────────────────────────
// Motor: 660cc DOHC tricilíndrico líquido-refrigerado, 12 válvulas, ordem de disparo 240°
// 2021–2025: ~80cv @ 10.250 rpm / 64 Nm @ 6.250 rpm (corpo de borboleta único)
// 2026+: atualizado para 95cv @ 11.250 rpm / 68 Nm @ 8.250 rpm (3 corpos de borboleta 44mm,
//        cabeçote revisado, admissão maior, giro máximo 12.650 rpm) — mesma base do Daytona 660
// Óleo 10W-40/10W-50 JASO MA2 — seco 3,20L / com filtro 2,80L / sem filtro 2,60L
// Vela NGK CR9EK (gap pré-ajustado ~0,7mm) | Corrente 520 X-ring × 120 elos
// Pneu: 120/70-17 (F) / 180/55-17 (R) — pressão única 34/42 PSI (2,35/2,90 bar)
// Montagem nacional em Manaus (AM). Preço 2026 no Brasil: R$ 56.990.

const TRIDENT660_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40/10W-50 JASO MA2 — 2,80L com troca de filtro; intervalo 16.000 km/12 meses',
    body: 'O motor tricilíndrico 660cc é lubrificado e tem embreagem assistida (não necessariamente úmida com fricção metal-metal como as chinesas, mas o óleo precisa ser JASO MA2/API SN ou superior). Capacidade: 3,20L a seco, 2,80L trocando o filtro, 2,60L sem trocar o filtro. Use semissintético ou sintético 10W-40 (ou 10W-50 em climas muito quentes) — Motul 7100 10W-40, Castrol Power1 10W-40 ou Mobil 1 Racing 4T são equivalentes ao especificado pela Triumph. Intervalo oficial: 16.000 km ou 12 meses, o que vier primeiro.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EK já vem pré-gaseada (~0,7mm) — troca junto com o filtro de ar a cada 32.000 km',
    body: 'A vela original é a NGK CR9EK, e o gap de fábrica já vem correto (~0,7mm) — normalmente não precisa regular. O intervalo de troca da vela e do filtro de ar do Trident 660 é incomum entre as Triumph: 32.000 km (outras triplas da marca trocam a cada 16.000–24.000 km). Aproveite essa revisão de 32.000 km para também conferir a folga de válvulas, que cai no mesmo ponto.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 X-ring × 120 elos — lubrifique a cada 500–800 km',
    body: 'Kit relação com corrente 520 selada (X-ring), 120 elos. Por ser corrente com anéis de vedação, não deve ser lavada com solvente forte (danifica os X-rings) — use produto específico para corrente selada (Motul C2, Putoline). Lubrifique a cada 500–800 km ou após andar na chuva. A vida útil típica com manutenção correta é de 20.000–25.000 km.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70-17 (F) / 180/55-17 (R) — pressão única 34/42 PSI',
    body: 'Diferente de muitas motos que têm tabela separada para solo e com garupa, o manual do Trident 660 especifica uma única pressão de referência: 34 PSI (2,35 bar) dianteiro e 42 PSI (2,90 bar) traseiro, a frio. Meça sempre com a moto fria e não use o sensor de pressão do painel (quando equipado) para calibrar — ele serve apenas de alerta, não é preciso o suficiente para ajuste fino.',
  },
  {
    severity: 'WARN',
    title: 'Ano-modelo importa: 2021–2025 tem ~80cv, 2026+ tem 95cv (motor mais potente)',
    body: 'Em janeiro de 2026 a Triumph atualizou o Trident 660 globalmente: de um único corpo de borboleta para três corpos de 44mm (um por cilindro), cabeçote revisado com válvulas de escape maiores, admissão maior e giro máximo elevado para 12.650 rpm. Resultado: de ~80cv/64Nm (2021–2025) para 95cv/68Nm (2026+), equiparando o Trident ao Daytona 660 em potência (respeitando o limite da categoria A2 europeia). Ao comprar peças ou buscar specs de válvulas/injeção, confirme o ano-modelo exato — muita coisa mudou internamente entre as duas gerações apesar do nome idêntico.',
  },
  {
    severity: 'OK',
    title: 'Montagem nacional em Manaus (AM) — não é moto importada',
    body: 'Diferente da geração anterior, o Trident 660 atualizado é montado no polo industrial de Manaus, o que ajudou a Triumph a baixar o preço de lançamento no Brasil (R$ 56.990 na versão 2026) mesmo com câmbio desfavorável. Isso também facilita a logística de peças de reposição pela rede de concessionárias nacionais, ao contrário de marcas 100% importadas.',
  },
  {
    severity: 'OK',
    title: 'Entrada acessível na marca Triumph — moto de referência para quem troca de categoria',
    body: 'O Trident 660 é hoje a porta de entrada mais barata da Triumph no Brasil, junto com o Tiger 660 Sport e o Daytona 660. Para quem vem de nacionais 300cc–500cc e quer dar o próximo passo, o Trident entrega torque generoso em baixa rotação (90% do pico já em 3.600 rpm), postura naked confortável e uma rede de concessionárias que cresceu bastante no país nos últimos anos — mas ainda é bem menor que a de marcas japonesas, então planeje revisões com antecedência.',
  },
]

const TRIDENT660_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall: mangueira do sensor MAP obstruída pode causar marcha lenta irregular e apagão do motor',
    body: 'Unidades 2021–2024 (produzidas até agosto de 2023) podem ter a mangueira do sensor MAP (pressão absoluta do coletor) obstruída, fazendo o sensor enviar leitura incorreta para a ECU — sintoma: marcha lenta instável e risco de o motor apagar sem aviso, inclusive em movimento. Recall SRAN 609 / NHTSA 23V-583, ~7.500 unidades afetadas nos EUA. A Triumph troca a mangueira gratuitamente em concessionária. Se você comprou uma unidade usada deste período, verifique com o número de chassi se o recall já foi aplicado.',
  },
  {
    severity: 'WARN',
    title: 'Falha de ABS impede a partida após a moto ficar parada por semanas',
    body: 'Um problema relatado com frequência: a moto não liga e mostra falha de ABS no painel depois de ficar parada por um período longo (garagem, viagem). Geralmente é combinação de bateria fraca + sensor de ABS que "trava" com tensão baixa. Antes de desconfiar de defeito grave, tente: carregar a bateria totalmente com carregador externo (não só dar partida com cabos), aguardar alguns minutos e ligar novamente. Se persistir, o sensor de ABS ou a central podem precisar de diagnóstico em concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Ruído de "tique-taque" crescente com a rotação = hora de checar a folga de válvulas',
    body: 'Um estalido rítmico que aumenta com o giro do motor, principalmente em unidades com mais de 30.000 km, costuma indicar folga de válvulas fora da especificação (o Trident tem intervalo de checagem incomum de 32.000 km, mais longo que o normal). Não é motivo de pânico, mas não ignore por muito tempo — folga excessiva desgasta o came e pode evoluir para dano maior. Agende a revisão de válvulas assim que notar o ruído, mesmo que ainda não tenha batido a quilometragem oficial.',
  },
  {
    severity: 'WARN',
    title: 'Glitches elétricos leves: painel, luzes e sensores intermitentes',
    body: 'Proprietários relatam ocasionalmente pequenas falhas elétricas — piscar de luzes, informações erradas no painel TFT, sensores que reiniciam sozinhos. Normalmente são intermitentes e não recorrentes na mesma unidade. Antes de levar à concessionária, verifique conectores acessíveis (bateria, chicote sob o tanque) e atualize o firmware do painel se houver atualização disponível via My Triumph Connectivity (quando equipado).',
  },
  {
    severity: 'WARN',
    title: 'Rede de concessionárias Triumph ainda é enxuta no Brasil — planeje revisões com antecedência',
    body: 'Apesar do crescimento recente da marca no país, a Triumph tem muito menos pontos de atendimento que Honda, Yamaha ou BMW. Agende revisões programadas (especialmente as de 32.000 km, que envolvem vela + filtro de ar + válvulas) com bastante antecedência, principalmente fora das capitais. Peças de reposição para o motor 660cc costumam ter prazo de importação de 1–3 semanas quando não há estoque local.',
  },
]

const TRIDENT660_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma oficial Trident 660 (2021–2025 e 2026+)',
    body: '1.000 km — Revisão de entrega (torques gerais, óleo verificado). | A cada 500–800 km — lubrificar corrente 520. | 16.000 km / 12 meses — Troca de óleo + filtro (2,80L, 10W-40/10W-50 JASO MA2). | 32.000 km / 24 meses — Troca de vela NGK CR9EK, troca do filtro de ar, checagem da folga de válvulas (intervalo mais longo que o padrão Triumph). | 24.000 km ou 24 meses — Fluido de freio DOT 4 (frente e trás). | Kit relação (corrente 520 X-ring + pinhão + coroa): a cada 20.000–25.000 km, conforme desgaste. | Anual — Verificar recall de mangueira MAP se a moto for 2021–2023 e o número de chassi ainda não tiver sido atualizado.',
  },
]

// ─── TRIDENT 660 TRIPLE TRIBUTE ────────────────────────────────────────────────
// Edição especial em homenagem ao '67 "Slippery Sam" (5x vencedora da Isle of Man TT)
// Mesmo motor 660cc base do Trident 660 (81cv/64Nm na versão listada — pode já vir com
// a atualização de 95cv dependendo do ano de fabricação; confirme na nota fiscal/manual)
// Suspensão Showa 41mm invertida + monoamortecedor com pré-carga ajustável
// Freios: 2 pinças Nissin de 2 pistões + discos 310mm | Pneus Michelin Road 5
// Rodas vermelhas, altura do assento 805mm | Preço de lançamento (EUA): US$ 8.745

const TRIPLE_TRIBUTE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mecânica idêntica ao Trident 660 — só suspensão, freios e pintura mudam',
    body: 'A edição Triple Tribute usa exatamente o mesmo motor, câmbio, chicote elétrico e ECU do Trident 660 padrão. As diferenças são: garfo Showa 41mm invertido (o Trident base usa garfo convencional), pinças Nissin de 2 pistões dianteiras, pneus Michelin Road 5 (em vez do Michelin Road 5/pneu padrão de fábrica variável), rodas vermelhas e grafismo "67" em homenagem à Slippery Sam, moto pentacampeã da Isle of Man TT nos anos 1970. Para revisões de motor, óleo, vela e corrente, siga exatamente o cronograma do Trident 660.',
  },
  {
    severity: 'OK',
    title: 'Garfo Showa invertido 41mm — vedantes de melhor qualidade, mas ainda pedem atenção',
    body: 'O garfo invertido Showa da Triple Tribute é upgrade em relação ao garfo convencional do Trident base — melhor rigidez e resposta. Ainda assim, os retentores (vedantes de óleo) merecem inspeção visual a cada troca de óleo do motor: procure manchas de óleo escuro na parte inferior dos tubos. Óleo de garfo recomendado: SAE 10W, conforme handbook Trident/Tiger Sport 660.',
  },
  {
    severity: 'OK',
    title: 'Pastilhas de freio: pinças Nissin — use compostos sinterizados para não perder mordida',
    body: 'As pinças Nissin de 2 pistões da Triple Tribute com discos de 310mm entregam frenagem forte mas dependem de pastilha de qualidade. Prefira pastilhas sinterizadas (EBC HH, Brembo Sinter) em vez de orgânicas — a diferença de mordida é perceptível, especialmente em frenagens de emergência. Fluido de freio DOT 4, troca a cada 24 meses.',
  },
  {
    severity: 'OK',
    title: 'Pneus Michelin Road 5 de fábrica — bom para todo uso, mas desgaste é mais rápido que pneu econômico',
    body: 'O Michelin Road 5 equipado de fábrica é um pneu esportivo/turismo com excelente aderência em piso molhado, mas desgasta mais rápido que pneus econômicos — espere 10.000–14.000 km no traseiro em uso misto. Ao repor, mantenha a mesma medida (120/70-17 / 180/55-17) e evite baixar de categoria de pneu, já que a moto foi calibrada com esse composto em mente.',
  },
  {
    severity: 'WARN',
    title: 'Edição de tiragem limitada — confirme o ano de fabricação para saber a potência real do motor',
    body: 'A Triple Tribute foi lançada como edição especial em 2025/2026, período exatamente em que o Trident 660 passou pela atualização global de potência (de ~80cv para 95cv). Dependendo do lote de produção da sua unidade, o motor pode ser a versão anterior (corpo de borboleta único) ou a nova versão (3 corpos de 44mm). Confirme no manual/nota fiscal do seu chassi específico antes de comprar peças de admissão ou ECU, pois não são intercambiáveis entre as duas gerações.',
  },
]

const TRIPLE_TRIBUTE_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Mesmo recall de mangueira MAP do Trident 660 base se a unidade for do período afetado',
    body: 'Como compartilha o motor e a ECU do Trident 660, unidades da Triple Tribute fabricadas no período do recall SRAN 609 / NHTSA 23V-583 (mangueira do sensor MAP obstruída, risco de apagão do motor) também podem estar na lista. Verifique o número de chassi no site oficial de recalls da Triumph.',
  },
  {
    severity: 'WARN',
    title: 'Peças específicas da edição (rodas vermelhas, garfo Showa) têm disponibilidade menor',
    body: 'Por ser edição de tiragem limitada, peças exclusivas como as rodas vermelhas, o kit gráfico "67" e componentes específicos do garfo Showa têm estoque menor nas concessionárias brasileiras do que as peças do Trident 660 padrão. Em caso de acidente ou dano estético, planeje prazo de importação mais longo para essas peças específicas.',
  },
  {
    severity: 'WARN',
    title: 'Poucos relatos de longo prazo — é modelo muito recente',
    body: 'Por ser lançamento recente (2025/2026), ainda não há histórico consolidado de problemas específicos da Triple Tribute em fóruns e comunidades de proprietários. O que se sabe hoje é essencialmente o histórico do Trident 660 base, já que compartilham motor e eletrônica. Trate o cronograma de manutenção do Trident 660 como referência até que surjam relatos específicos da edição.',
  },
  {
    severity: 'WARN',
    title: 'Assento baixo (805mm) é ótimo para pilotos baixos, mas reduz curso de suspensão traseira',
    body: 'A altura de assento de 805mm da Triple Tribute é uma das mais baixas da categoria, facilitando o apoio dos pés para pilotos de estatura menor. Isso vem de uma calibração de suspensão traseira ligeiramente mais dura/curta. Em pisos muito ruins ou com garupa + bagagem, a moto pode "fundear" com mais facilidade — ajuste a pré-carga do monoamortecedor conforme o peso transportado.',
  },
]

const TRIPLE_TRIBUTE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Triple Tribute — idêntico ao Trident 660, mais atenção ao garfo Showa',
    body: '1.000 km — Revisão de entrega. | 500–800 km — lubrificar corrente 520. | 16.000 km / 12 meses — Óleo + filtro (2,80L, 10W-40/10W-50 JASO MA2). | 32.000 km / 24 meses — Vela NGK CR9EK, filtro de ar, folga de válvulas. | 24 meses — Fluido de freio DOT 4 (pinças Nissin dianteiras). | A cada troca de óleo — inspecionar visualmente os retentores do garfo Showa 41mm invertido. | Verificar recall de mangueira MAP conforme número de chassi.',
  },
]

// ─── TRIDENT 800 ───────────────────────────────────────────────────────────────
// Motor: novo tricilíndrico 798cc (mesmo diâmetro de cilindro 78mm do Street Triple 765,
// curso alongado para 55,7mm) | 115cv (PS) @ 10.750 rpm / 84 Nm @ 8.500 rpm | giro máx. 11.500 rpm
// Câmbio 6 marchas com quickshifter de série + embreagem assistida/deslizante
// Suspensão Showa totalmente ajustável | Freios radiais 4 pistões, discos duplos 310mm, ABS em curva
// Pneus 120/70R17 (F) / 180/55R17 (R) — Michelin Road 6
// Lançamento Brasil: a partir de maio de 2026, R$ 62.490 — modelo recém-chegado, sem histórico
// consolidado de propriet ários. Óleo, vela e corrente ainda não têm especificação oficial
// amplamente publicada nas fontes consultadas — trate como pendente de confirmação.

const TRIDENT800_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor novo de 798cc — não é o mesmo bloco do Trident 660, mas parente do Street Triple 765',
    body: 'O Trident 800 usa um motor tricilíndrico totalmente novo, com o mesmo diâmetro de cilindro (78mm) do consagrado Street Triple 765, mas com curso alongado (55,7mm) para render 798cc. Potência declarada: 115cv @ 10.750 rpm e 84 Nm de torque @ 8.500 rpm — bem acima dos 95cv do Trident 660 atualizado. Câmbio de 6 marchas com quickshifter e embreagem assistida/deslizante vêm de série, algo que no Trident 660 é opcional/ausente em algumas versões.',
  },
  {
    severity: 'OK',
    title: 'Suspensão Showa totalmente ajustável — vale configurar para o seu peso e uso',
    body: 'Diferente do Trident 660 (suspensão com ajustes limitados), o Trident 800 vem com garfo e monoamortecedor Showa totalmente ajustáveis (pré-carga, compressão e retorno). Vale a pena pedir para a concessionária configurar a suspensão para o seu peso e estilo de pilotagem na entrega — a maioria das motos sai de fábrica com ajuste neutro/médio, que raramente é o ideal para o peso real do piloto brasileiro médio.',
  },
  {
    severity: 'OK',
    title: 'Pneus Michelin Road 6 — medida 120/70R17 (F) / 180/55R17 (R)',
    body: 'O Trident 800 sai de fábrica com pneus Michelin Road 6, um dos pneus de rua mais modernos da Michelin para essa categoria (substituto do Road 5). Ao repor, mantenha a mesma medida — 120/70R17 dianteiro e 180/55R17 traseiro — mesma medida do Trident 660 e Daytona 660, o que facilita achar pneu compatível em qualquer borracharia especializada em moto.',
  },
  {
    severity: 'OK',
    title: 'Freios radiais de 4 pistões com ABS em curva — de série, não é opcional',
    body: 'O Trident 800 vem com pinças radiais de 4 pistões e discos duplos de 310mm, além de ABS otimizado para curva (cornering ABS) — recurso que no Trident 660 costuma estar em versões mais caras ou ausente. Isso eleva o padrão de segurança de frenagem em relação ao 660, especialmente em frenagens de emergência inclinado.',
  },
  {
    severity: 'WARN',
    title: 'Modelo recém-lançado no Brasil (maio de 2026) — óleo, vela e corrente ainda sem especificação amplamente divulgada',
    body: 'Até a data desta consulta, as fontes disponíveis (site oficial, imprensa especializada) não publicaram de forma consolidada a capacidade exata de óleo, código da vela de ignição nem tipo/medida de corrente para o Trident 800 — motor é novo o suficiente para que essas especificações detalhadas ainda estejam concentradas apenas no manual oficial do proprietário. Ao fazer a primeira revisão, confirme esses números diretamente na concessionária Triumph ou no manual que acompanha a moto, e não presuma que são idênticos ao Trident 660 (o motor é diferente).',
  },
  {
    severity: 'OK',
    title: 'Preço de lançamento Brasil: R$ 62.490 — posicionado acima do Trident 660 e do Tiger 660 Sport',
    body: 'O Trident 800 chega ao Brasil por R$ 62.490 (lançamento), valor superior ao Trident 660 (R$ 56.990) e ao Tiger 660 Sport (R$ 62.990, praticamente empatado). Ele ocupa a posição de "Trident mais robusto" dentro da linha, mirando quem quer mais potência sem sair do conceito naked de entrada da marca. Chegada às concessionárias globais a partir de março de 2026 (Reino Unido/Europa) e maio de 2026 no Brasil.',
  },
]

const TRIDENT800_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sem histórico consolidado de problemas — modelo lançado há poucos meses',
    body: 'Por ser lançamento muito recente (chegada às concessionárias globais em março de 2026 e no Brasil em maio de 2026), ainda não existe volume relevante de relatos de proprietários em fóruns (Triumph Rat, ADVrider, TWT) sobre falhas ou defeitos recorrentes do Trident 800. Isso não significa ausência de problemas — significa apenas que a amostra de uso real ainda é pequena. Acompanhe canais oficiais de recall da Triumph nos primeiros 12–18 meses de uso.',
  },
  {
    severity: 'WARN',
    title: 'Histórico de recall do Daytona 660 (mesma família 660/800) é motivo para atenção redobrada com lubrificação',
    body: 'Em 2025, a Triumph precisou recolher unidades do Daytona 660 (motor irmão do 660, plataforma que deu origem ao 800) por lubrificação insuficiente do virabrequim sob desaceleração agressiva. Embora o Trident 800 use motor novo (798cc, não o 660cc), a proximidade de engenharia entre as famílias reforça a importância de monitorar o nível de óleo regularmente nos primeiros meses de uso e não ignorar qualquer ruído metálico anormal — reporte à concessionária imediatamente.',
  },
  {
    severity: 'WARN',
    title: 'Rede de concessionárias e disponibilidade de peças ainda mais restrita que o Trident 660',
    body: 'Sendo o lançamento mais recente da linha, o Trident 800 tem disponibilidade de peças de reposição ainda mais limitada que o Trident 660/Daytona 660/Tiger 660 Sport, que já estão no mercado brasileiro há mais tempo. Para peças de motor específicas do 798cc (não compartilhadas com o 660cc), espere prazos de importação mais longos nos primeiros anos do modelo no país.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão totalmente ajustável exige conhecimento técnico para não ser mal configurada',
    body: 'Ao contrário de suspensões com ajuste único de pré-carga, o conjunto Showa totalmente ajustável do Trident 800 (pré-carga + compressão + retorno, dianteiro e traseiro) pode ser configurado incorretamente por quem não tem experiência, resultando em comportamento pior do que a suspensão mais simples do Trident 660. Se notar a moto "batendo" no fim do curso ou instável em curva, procure uma concessionária ou preparador para reconfigurar do zero em vez de mexer aleatoriamente nos ajustes.',
  },
]

const TRIDENT800_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma inicial Trident 800 (baseado no padrão da linha Trident/Tiger Sport — confirme no manual)',
    body: '1.000 km — Revisão de entrega. | Lubrificação de corrente conforme uso (500–800 km é o padrão da linha 660; confirme se o 800 segue igual). | Primeira troca de óleo — siga rigorosamente o intervalo do manual oficial do Trident 800 (ainda não confirmado de forma ampla nas fontes públicas — pode diferir do Trident 660). | Fluido de freio DOT 4 — a cada 24 meses, padrão Triumph. | Acompanhar boletins de recall da Triumph nos primeiros 12–18 meses, dado o histórico recente de recall de lubrificação no Daytona 660 (motor da mesma geração de plataforma 660/800).',
  },
]

// ─── DAYTONA 660 ───────────────────────────────────────────────────────────────
// Motor: mesmo bloco 660cc do Trident, tune esportivo — 95cv (93,6–95hp conforme fonte) @ 11.250 rpm
// / 69 Nm @ 8.250 rpm, giro máximo 12.650 rpm | 17% mais potência e 9% mais torque que o Trident 660 (tune antigo)
// Óleo 10W-40/10W-50 JASO MA2 — 3,20L seco / 2,80L com filtro / 2,60L sem filtro
// Pneus 120/70 ZR17 (F) / 180/55 ZR17 (R) Michelin Power 6 — pressão 34/42 PSI (2,35/2,90 bar)
// Corrente DID 520VM4 × 120 elos | Garfo Showa USD 41mm, freios radiais 4 pistões, discos duplos 310mm
// Lançamento Brasil: outubro/2024 ("Daytona Day", 35 concessionárias), R$ 56.490 (2024/2025);
// R$ 60.990 (2026); Cup Limited Edition R$ 64.990

const DAYTONA660_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 660cc com tune esportivo: 95cv @ 11.250 rpm / 69 Nm @ 8.250 rpm',
    body: 'O Daytona 660 usa o mesmo bloco tricilíndrico 660cc do Trident/Tiger 660 Sport, mas com afinação mais esportiva desde o lançamento (2024): ~95cv a 11.250 rpm e 69 Nm de torque a 8.250 rpm, giro máximo de 12.650 rpm. É cerca de 17% mais potente e 9% mais torque do que o Trident 660 na afinação original (pré-2026). Isso faz do Daytona a versão mais alta de giro e mais esportiva da família — combustível recomendado: gasolina aditivada, octanagem mínima 95 (premium/podium conforme disponibilidade).',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40/10W-50 JASO MA2 — mesma capacidade da família 660: 2,80L com filtro',
    body: 'Capacidade de óleo idêntica ao Trident/Tiger 660 Sport: 3,20L a seco, 2,80L trocando o filtro, 2,60L sem trocar. Use 10W-40 sintético/semissintético JASO MA2, API SN ou superior. Com uso mais esportivo em giro alto constante (pista, trackday), reduza o intervalo de 16.000 km para 8.000–10.000 km — o motor do Daytona sofre mais estresse térmico em uso de alta rotação sustentada.',
  },
  {
    severity: 'OK',
    title: 'Pneus Michelin Power 6 120/70 ZR17 (F) / 180/55 ZR17 (R) — pressão 34/42 PSI',
    body: 'De fábrica, o Daytona 660 vem com Michelin Power 6, pneu esportivo de rua com boa aderência a frio — importante porque o motor de giro alto convida a pilotagem mais agressiva. Pressão de referência: 34 PSI (2,35 bar) dianteiro / 42 PSI (2,90 bar) traseiro, a frio. Em uso de trackday, pressões um pouco mais baixas (aquecimento extra do pneu em pista) podem ser recomendadas — consulte o fabricante do pneu para ajuste específico de pista.',
  },
  {
    severity: 'OK',
    title: 'Corrente DID 520VM4 × 120 elos — mais robusta para a potência extra do motor esportivo',
    body: 'O kit relação do Daytona usa corrente DID 520VM4 (selo X-ring reforçado), adequada ao torque mais alto entregue pelo motor esportivo. Lubrifique a cada 500–800 km, ainda mais importante em uso com acelerações fortes (a corrente sofre mais estresse com o giro alto do Daytona). Kit relação completo (corrente + pinhão + coroa): considere trocar entre 18.000–22.000 km em uso misto rua/pista.',
  },
  {
    severity: 'OK',
    title: 'Garfo Showa USD 41mm + freios radiais 4 pistões com discos duplos 310mm',
    body: 'A postura esportiva do Daytona vem acompanhada de garfo invertido Showa de 41mm e freios radiais de 4 pistões com discos duplos de 310mm — configuração mais robusta que a do Trident 660 base. Use pastilhas sinterizadas de qualidade (EBC HH, Brembo Sinter) para acompanhar o potencial de frenagem, e troque o fluido DOT 4 religiosamente a cada 24 meses (uso esportivo degrada o fluido mais rápido pelo calor gerado nos discos).',
  },
  {
    severity: 'OK',
    title: 'Lançamento nacional simultâneo — "Daytona Day" em outubro de 2024, moto sem geração anterior no Brasil',
    body: 'O Daytona 660 chegou ao Brasil em outubro de 2024 com lançamento simultâneo em 35 concessionárias ("Daytona Day"), por R$ 56.490. Diferente do Trident e do Tiger 660 Sport (que têm histórico de anos no mercado), o Daytona é 100% modelo novo por aqui — não existe geração anterior nacional para comparar desgaste ou durabilidade de longo prazo específica do mercado brasileiro.',
  },
]

const DAYTONA660_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall 2024–2025: lubrificação insuficiente do virabrequim sob desaceleração forte',
    body: 'Unidades 2024 e 2025 do Daytona 660 podem sofrer queda de pressão de óleo sob desaceleração agressiva — o óleo "balança" dentro do cárter e o sistema de lubrificação do virabrequim/mancais pode ficar sem pressão momentaneamente, sem qualquer aviso ao piloto no painel. Isso pode causar dano prematuro ao motor e, no limite, risco de travamento em movimento. Recall NHTSA 25V531 (~1.929 unidades nos EUA, mas o defeito é de projeto, não de lote isolado). A correção oficial: aumento da quantidade de óleo no motor + nova vareta medidora redesenhada com o nível correto marcado, feito gratuitamente em concessionária. Se você tem um Daytona 660 2024/2025, procure a Triumph para confirmar se o recall já foi aplicado ao seu chassi — é o item de segurança mais crítico documentado até hoje nesta família de motos.',
  },
  {
    severity: 'WARN',
    title: 'Ruído de batida em baixa rotação/aceleração forte pode indicar desgaste da biela — não ignore',
    body: 'Alguns proprietários relatam um estalo/batida grave e rítmico em baixo giro ou em acelerações fortes, associado a desgaste do mancal de biela — sintoma que se agrava conforme a quilometragem sobe. Dada a relação com o recall de lubrificação do virabrqueixo, qualquer ruído metálico novo, especialmente em motos ainda não atualizadas pelo recall, merece diagnóstico imediato em concessionária, não "esperar para ver".',
  },
  {
    severity: 'WARN',
    title: 'Hesitação na injeção eletrônica relatada por alguns proprietários',
    body: 'Há relatos (não generalizados) de hesitação/tranco leve na resposta do acelerador em baixa rotação, especialmente em transições de aceleração suave. Antes de levar para diagnóstico, verifique se há atualização de mapa de injeção disponível via concessionária — a Triumph já lançou revisões de calibração de ECU para modelos da linha 660 desde o lançamento.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos no sistema de arrefecimento mencionados por proprietários — verifique nível regularmente',
    body: 'Alguns relatos de proprietários mencionam pequenos vazamentos no sistema de arrefecimento líquido do Daytona 660. Verifique o nível do reservatório de expansão a cada abastecimento nas primeiras semanas de uso e fique atento a manchas esverdeadas/rosadas (líquido de arrefecimento) embaixo da moto após ela ficar parada por horas.',
  },
  {
    severity: 'WARN',
    title: 'Sportbike de entrada com manutenção mais cara que o Trident/Tiger equivalente',
    body: 'Por ter carenagem completa e componentes mais esportivos (garfo invertido, freios radiais, corrente reforçada), o custo de manutenção e o valor de peças de reposição do Daytona 660 tendem a ser mais altos que o Trident 660 equivalente — carenagens danificadas em queda, por exemplo, custam significativamente mais para substituir do que o painel plástico simples de uma naked.',
  },
]

const DAYTONA660_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Daytona 660 — inclui verificação obrigatória do recall de lubrificação',
    body: 'PRIORIDADE — Confirmar aplicação do recall NHTSA 25V531 (aumento de óleo + nova vareta) em concessionária Triumph se a moto for 2024/2025. | 1.000 km — Revisão de entrega. | 500–800 km — lubrificar corrente DID 520VM4. | 16.000 km / 12 meses (8.000–10.000 km se uso em pista) — Óleo + filtro (2,80L, 10W-40/10W-50 JASO MA2). | 32.000 km / 24 meses — Vela, filtro de ar, folga de válvulas (padrão família 660). | 24 meses — Fluido de freio DOT 4 (freios radiais 4 pistões). | Monitorar nível de líquido de arrefecimento a cada abastecimento nos primeiros meses de uso.',
  },
]

// ─── TIGER 660 SPORT ────────────────────────────────────────────────────────────
// (nome comercial internacional: Tiger Sport 660 — no Brasil listado na Tabela FIPE como
// "TIGER 660 SPORT"). Chegou ao Brasil em fevereiro de 2023 (versão Touring, R$ 62.873).
// Motor: mesmo bloco 660cc do Trident — 81cv @ 10.250 rpm / 64 Nm @ 6.250 rpm (2022–2025)
// 2026+: atualizado para 95cv @ 11.250 rpm / 68 Nm @ 8.250 rpm (mesma atualização do Trident 660)
// Óleo 3,20L seco / 2,80L com filtro | Vela NGK CR9EK (gap ~0,6–0,75mm)
// Pneus 120/70-17 (F) / 180/55-17 (R) | Corrente 122 elos | Peso em ordem de marcha ~206kg
// Preço Brasil 2026: R$ 62.990

const TIGERSPORT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor 660cc do Trident, tune de torque em baixa: 81cv (95cv a partir de 2026)',
    body: 'O Tiger 660 Sport usa o mesmo bloco tricilíndrico 660cc do Trident, com afinação priorizando torque em baixa/média rotação para uso touring/urbano: 81cv @ 10.250 rpm e 64 Nm @ 6.250 rpm nas unidades 2022–2025, com 90% do torque disponível já a partir de 3.000 rpm. A partir do ano-modelo 2026, recebeu a mesma atualização do Trident 660 (3 corpos de borboleta de 44mm, cabeçote revisado): 95cv @ 11.250 rpm / 68 Nm @ 8.250 rpm. Confirme o ano-modelo do seu chassi antes de comprar peças de admissão/injeção.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40/10W-50 JASO MA2 — mesma capacidade da família 660: 2,80L com filtro',
    body: 'Capacidade idêntica ao Trident/Daytona: 3,20L a seco, 2,80L trocando o filtro, 2,60L sem trocar o filtro. Use 10W-40 sintético/semissintético JASO MA2. Intervalo padrão: 16.000 km ou 12 meses. Em uso de viagem longa/touring (perfil natural desta moto), monitore o nível a cada abastecimento em viagens acima de 500km.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EK, gap 0,6–0,75mm — troca junto com filtro de ar a 32.000 km',
    body: 'Mesma vela da família 660cc: NGK CR9EK, com gap especificado entre 0,6 e 0,75mm conforme catálogo (alguns catálogos citam a CR8EK como alternativa equivalente — confirme com o código do motor da sua unidade antes de comprar). Intervalo de troca alinhado com filtro de ar e folga de válvulas: 32.000 km.',
  },
  {
    severity: 'OK',
    title: 'Corrente 122 elos, pinhão 16T/coroa 51T — mais robusta que o Trident por causa do peso extra',
    body: 'O Tiger 660 Sport usa corrente com 122 elos e relação pinhão 16 dentes / coroa 51 dentes — ligeiramente diferente do Trident por causa do peso maior (~206kg em ordem de marcha) e do perfil de uso touring. Lubrifique a cada 500–800 km. Em uso com bagageiro e bauleto carregados (perfil comum desta moto), aumente a frequência de inspeção da tensão da corrente.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70-17 (F) / 180/55-17 (R) — pressão de referência em torno de 2,5 bar (36 PSI) nos dois eixos',
    body: 'Catálogos técnicos apontam pressão de referência próxima de 2,5 bar (36 PSI) tanto no dianteiro quanto no traseiro do Tiger 660 Sport — diferente do Trident/Daytona, que têm pressões diferentes entre os eixos (34/42 PSI). Como há alguma divergência entre fontes consultadas, confirme sempre no manual do proprietário específico do seu ano/versão (Touring ou padrão) antes de calibrar, especialmente se for viajar com bagagem e garupa.',
  },
  {
    severity: 'OK',
    title: 'Versão Touring: bauleto e proteções de série valem a pena para quem viaja',
    body: 'A versão Touring do Tiger 660 Sport, vendida no Brasil desde fevereiro de 2023, já vem com bauleto traseiro e quickshifter de fábrica — itens que custam caro para instalar depois como acessório. Se o uso planejado inclui viagens longas, vale considerar a versão Touring em vez de instalar os acessórios avulsos posteriormente.',
  },
]

const TIGERSPORT_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Mesmo recall de mangueira MAP do Trident 660 — unidades 2021–2024',
    body: 'O Tiger 660 Sport compartilha motor e ECU com o Trident 660 e foi incluído no mesmo recall de mangueira do sensor MAP obstruída (risco de marcha lenta irregular e apagão do motor sem aviso) — SRAN 609 / NHTSA 23V-583, ~7.500 unidades entre os dois modelos nos EUA. Confirme com o número de chassi se a sua unidade (2021–2024) já recebeu a atualização da mangueira em concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Circlips/presilhas do apoio de pés quebram — trocados em garantia',
    body: 'Alguns proprietários relataram falha nos circlips (presilhas) que fixam os apoios de pé/pedaleiras, exigindo substituição. Na maioria dos casos relatados, o reparo foi coberto em garantia sem custo. Se notar folga ou barulho na pedaleira, leve à concessionária antes que o apoio solte completamente em movimento.',
  },
  {
    severity: 'WARN',
    title: 'Tampa do balancim (swingarm cover) pode soltar/cair',
    body: 'Há relatos da tampa plástica do balancim se soltando ou caindo com o uso, especialmente em pisos ruins. É item cosmético/de proteção, não estrutural, mas vale verificar o encaixe periodicamente e reforçar com presilha extra se notar folga.',
  },
  {
    severity: 'WARN',
    title: 'Calor do motor perceptível e ventoinha demorando a desligar em trânsito parado',
    body: 'Proprietários relatam calor elevado vindo do motor em trânsito parado, com a ventoinha do radiador continuando a funcionar por 1–2 minutos mesmo depois de a moto ser desligada. É comportamento normal de dissipação térmica pós-desligamento na maioria dos casos, mas se o calor for excessivo a ponto de incomodar as pernas constantemente mesmo em movimento, vale checar o funcionamento do termostato com a concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Para-brisa original é curto — muitos proprietários trocam por versão maior aftermarket',
    body: 'Reclamação recorrente: o para-brisa de fábrica é curto demais para bloquear bem o vento em velocidades de rodovia, especialmente para pilotos mais altos. Para-brisas maiores aftermarket resolvem o problema, mas alguns modelos de reposição soltam com vibração em buracos — prefira kits com fixação reforçada e revise o aperto periodicamente.',
  },
]

const TIGERSPORT_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tiger 660 Sport (2022–2025 e 2026+)',
    body: '1.000 km — Revisão de entrega. | 500–800 km — lubrificar corrente (122 elos). | 16.000 km / 12 meses — Óleo + filtro (2,80L, 10W-40/10W-50 JASO MA2). | 32.000 km / 24 meses — Vela NGK CR9EK, filtro de ar, folga de válvulas. | 24 meses — Fluido de freio DOT 4. | Verificar recall de mangueira MAP (unidades 2021–2024). | Inspecionar circlips das pedaleiras e fixação da tampa do balancim nas revisões periódicas. | Kit relação: a cada 20.000–25.000 km conforme desgaste, considerando peso extra de bagagem em uso touring.',
  },
]

// ─── BLOCOS ────────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'TRIDENT 660',
    yearFrom: 2021,
    yearTo: null,
    MACETES: TRIDENT660_MACETES,
    PROBLEMAS: TRIDENT660_PROBLEMAS,
    MANUTENCAO: TRIDENT660_MANUTENCAO,
  },
  {
    modelName: 'TRIDENT 660 TRIPLE TRIBUTE',
    yearFrom: 2025,
    yearTo: null,
    MACETES: TRIPLE_TRIBUTE_MACETES,
    PROBLEMAS: TRIPLE_TRIBUTE_PROBLEMAS,
    MANUTENCAO: TRIPLE_TRIBUTE_MANUTENCAO,
  },
  {
    modelName: 'TRIDENT 800',
    yearFrom: 2026,
    yearTo: null,
    MACETES: TRIDENT800_MACETES,
    PROBLEMAS: TRIDENT800_PROBLEMAS,
    MANUTENCAO: TRIDENT800_MANUTENCAO,
  },
  {
    modelName: 'DAYTONA 660',
    yearFrom: 2024,
    yearTo: null,
    MACETES: DAYTONA660_MACETES,
    PROBLEMAS: DAYTONA660_PROBLEMAS,
    MANUTENCAO: DAYTONA660_MANUTENCAO,
  },
  {
    modelName: 'TIGER 660 SPORT',
    yearFrom: 2023,
    yearTo: null,
    MACETES: TIGERSPORT_MACETES,
    PROBLEMAS: TIGERSPORT_PROBLEMAS,
    MANUTENCAO: TIGERSPORT_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ───────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'TRIDENT 660',
    yearFrom: 2021, yearTo: null,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 34, rearPsi: 42,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Pressão única especificada pelo manual (não há tabela separada solo/com garupa): F 34 / R 42 PSI (2,35/2,90 bar), a frio. Pneus de fábrica variam por lote — mantenha a medida 120/70-17 (F) / 180/55-17 (R) ao repor.',
  },
  {
    modelName: 'TRIDENT 660 TRIPLE TRIBUTE',
    yearFrom: 2025, yearTo: null,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 34, rearPsi: 42,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Mesma pressão de referência do Trident 660 base: F 34 / R 42 PSI a frio. Pneu de fábrica: Michelin Road 5.',
  },
  {
    modelName: 'TRIDENT 800',
    yearFrom: 2026, yearTo: null,
    tireSize: '120/70R17 (F) · 180/55R17 (R)',
    frontPsi: 34, rearPsi: 42,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Pneu de fábrica: Michelin Road 6. Pressão estimada com base no padrão da linha Trident/Tiger Sport 660 (34/42 PSI) — modelo muito recente, confirme com o manual oficial do proprietário assim que disponível, pois a Triumph ainda não publicou amplamente a tabela específica do 800.',
  },
  {
    modelName: 'DAYTONA 660',
    yearFrom: 2024, yearTo: null,
    tireSize: '120/70 ZR17 (F) · 180/55 ZR17 (R)',
    frontPsi: 34, rearPsi: 42,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'F 34 / R 42 PSI (2,35/2,90 bar) a frio. Pneu de fábrica: Michelin Power 6. Em trackday, pressões ligeiramente mais baixas podem ser recomendadas pelo fabricante do pneu conforme a pista.',
  },
  {
    modelName: 'TIGER 660 SPORT',
    yearFrom: 2023, yearTo: null,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 36, rearPsi: 36,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Catálogos técnicos indicam pressão de referência próxima de 2,5 bar (~36 PSI) nos dois eixos, diferente da tabela do Trident/Daytona (34/42 PSI). Há divergência entre fontes — confirme sempre no manual do proprietário da sua versão (padrão ou Touring) antes de calibrar, principalmente com garupa e bagagem.',
  },
]

// ─── ITENS DE MANUTENÇÃO ────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // TRIDENT 660
  { modelName: 'TRIDENT 660', yearFrom: 2021, yearTo: null, component: 'Óleo 10W-40/10W-50 JASO MA2 (2,80L com filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Capacidade: 3,20L a seco / 2,80L com troca de filtro / 2,60L sem trocar filtro.', priority: 'HIGH', order: 1 },
  { modelName: 'TRIDENT 660', yearFrom: 2021, yearTo: null, component: 'Lubrificação da corrente 520 X-ring', intervalKm: 700, intervalMonths: null, notes: 'Usar produto específico para corrente selada, não solvente forte (danifica os X-rings).', priority: 'HIGH', order: 2 },
  { modelName: 'TRIDENT 660', yearFrom: 2021, yearTo: null, component: 'Vela NGK CR9EK + filtro de ar', intervalKm: 32000, intervalMonths: 24, notes: 'Gap de fábrica ~0,7mm, já vem pré-ajustado. Intervalo mais longo que o padrão Triumph.', priority: 'MEDIUM', order: 3 },
  { modelName: 'TRIDENT 660', yearFrom: 2021, yearTo: null, component: 'Folga de válvulas', intervalKm: 32000, intervalMonths: 24, notes: 'Motor frio. Realizar junto com troca de vela e filtro de ar.', priority: 'HIGH', order: 4 },
  { modelName: 'TRIDENT 660', yearFrom: 2021, yearTo: null, component: 'Fluido de freio DOT 4 (frente + trás)', intervalKm: null, intervalMonths: 24, notes: 'Padrão Triumph — não misturar com DOT 3 ou 5.', priority: 'HIGH', order: 5 },
  { modelName: 'TRIDENT 660', yearFrom: 2021, yearTo: null, component: 'Kit relação 520 (corrente + pinhão + coroa)', intervalKm: 22500, intervalMonths: null, notes: 'Trocar entre 20.000–25.000 km conforme desgaste. Não trocar só a corrente com coroa gasta.', priority: 'HIGH', order: 6 },
  { modelName: 'TRIDENT 660', yearFrom: 2021, yearTo: null, component: 'Verificação do recall de mangueira MAP (SRAN 609 / NHTSA 23V-583)', intervalKm: null, intervalMonths: null, notes: 'Aplicável a unidades produzidas entre 2021 e agosto de 2023. Verificar com número de chassi.', priority: 'CRITICAL', order: 7 },

  // TRIDENT 660 TRIPLE TRIBUTE
  { modelName: 'TRIDENT 660 TRIPLE TRIBUTE', yearFrom: 2025, yearTo: null, component: 'Óleo 10W-40/10W-50 JASO MA2 (2,80L com filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Mesma capacidade do Trident 660 base.', priority: 'HIGH', order: 1 },
  { modelName: 'TRIDENT 660 TRIPLE TRIBUTE', yearFrom: 2025, yearTo: null, component: 'Lubrificação da corrente 520 X-ring', intervalKm: 700, intervalMonths: null, notes: 'Produto específico para corrente selada.', priority: 'HIGH', order: 2 },
  { modelName: 'TRIDENT 660 TRIPLE TRIBUTE', yearFrom: 2025, yearTo: null, component: 'Vela NGK CR9EK + filtro de ar', intervalKm: 32000, intervalMonths: 24, notes: 'Mesmo intervalo do Trident 660 base.', priority: 'MEDIUM', order: 3 },
  { modelName: 'TRIDENT 660 TRIPLE TRIBUTE', yearFrom: 2025, yearTo: null, component: 'Inspeção dos retentores do garfo Showa 41mm invertido', intervalKm: 16000, intervalMonths: 12, notes: 'Verificar visualmente durante a troca de óleo — procurar manchas de óleo nos tubos.', priority: 'MEDIUM', order: 4 },
  { modelName: 'TRIDENT 660 TRIPLE TRIBUTE', yearFrom: 2025, yearTo: null, component: 'Fluido de freio DOT 4 (pinças Nissin dianteiras)', intervalKm: null, intervalMonths: 24, notes: 'Discos 310mm — prefira pastilha sinterizada.', priority: 'HIGH', order: 5 },
  { modelName: 'TRIDENT 660 TRIPLE TRIBUTE', yearFrom: 2025, yearTo: null, component: 'Verificação do recall de mangueira MAP (compartilhado com Trident 660)', intervalKm: null, intervalMonths: null, notes: 'Confirmar com número de chassi se aplicável ao lote de produção.', priority: 'CRITICAL', order: 6 },

  // TRIDENT 800
  { modelName: 'TRIDENT 800', yearFrom: 2026, yearTo: null, component: 'Óleo do motor (capacidade e tipo a confirmar no manual oficial)', intervalKm: null, intervalMonths: 12, notes: 'Motor novo 798cc — especificação detalhada ainda não amplamente publicada nas fontes consultadas. Confirmar na concessionária ou manual do proprietário.', priority: 'HIGH', order: 1 },
  { modelName: 'TRIDENT 800', yearFrom: 2026, yearTo: null, component: 'Lubrificação da corrente', intervalKm: 700, intervalMonths: null, notes: 'Intervalo estimado com base no padrão da linha Trident/Tiger Sport 660.', priority: 'MEDIUM', order: 2 },
  { modelName: 'TRIDENT 800', yearFrom: 2026, yearTo: null, component: 'Fluido de freio DOT 4 (pinças radiais 4 pistões)', intervalKm: null, intervalMonths: 24, notes: 'Padrão Triumph.', priority: 'HIGH', order: 3 },
  { modelName: 'TRIDENT 800', yearFrom: 2026, yearTo: null, component: 'Monitorar nível de óleo e ruídos anormais no motor', intervalKm: 1000, intervalMonths: null, notes: 'Atenção redobrada nos primeiros meses de uso dado o histórico de recall de lubrificação em motor irmão (Daytona 660).', priority: 'HIGH', order: 4 },

  // DAYTONA 660
  { modelName: 'DAYTONA 660', yearFrom: 2024, yearTo: null, component: 'Verificação do recall de lubrificação do virabrequim (NHTSA 25V531)', intervalKm: null, intervalMonths: null, notes: 'PRIORIDADE MÁXIMA — unidades 2024/2025. Correção: aumento de óleo + nova vareta medidora, gratuito em concessionária.', priority: 'CRITICAL', order: 1 },
  { modelName: 'DAYTONA 660', yearFrom: 2024, yearTo: null, component: 'Óleo 10W-40/10W-50 JASO MA2 (2,80L com filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Reduzir para 8.000–10.000 km em uso de pista/trackday.', priority: 'HIGH', order: 2 },
  { modelName: 'DAYTONA 660', yearFrom: 2024, yearTo: null, component: 'Lubrificação da corrente DID 520VM4', intervalKm: 700, intervalMonths: null, notes: 'Mais crítico em uso esportivo com acelerações fortes.', priority: 'HIGH', order: 3 },
  { modelName: 'DAYTONA 660', yearFrom: 2024, yearTo: null, component: 'Vela NGK CR9EK + filtro de ar', intervalKm: 32000, intervalMonths: 24, notes: 'Mesmo padrão da família 660cc.', priority: 'MEDIUM', order: 4 },
  { modelName: 'DAYTONA 660', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4 (freios radiais 4 pistões)', intervalKm: null, intervalMonths: 24, notes: 'Uso esportivo degrada o fluido mais rápido pelo calor.', priority: 'HIGH', order: 5 },
  { modelName: 'DAYTONA 660', yearFrom: 2024, yearTo: null, component: 'Verificação do nível de líquido de arrefecimento', intervalKm: null, intervalMonths: 1, notes: 'Relatos de pequenos vazamentos — checar a cada abastecimento nas primeiras semanas de uso.', priority: 'MEDIUM', order: 6 },

  // TIGER 660 SPORT
  { modelName: 'TIGER 660 SPORT', yearFrom: 2023, yearTo: null, component: 'Óleo 10W-40/10W-50 JASO MA2 (2,80L com filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Monitorar nível a cada abastecimento em viagens longas acima de 500km.', priority: 'HIGH', order: 1 },
  { modelName: 'TIGER 660 SPORT', yearFrom: 2023, yearTo: null, component: 'Lubrificação da corrente (122 elos)', intervalKm: 700, intervalMonths: null, notes: 'Aumentar frequência de inspeção com bagageiro/bauleto carregados.', priority: 'HIGH', order: 2 },
  { modelName: 'TIGER 660 SPORT', yearFrom: 2023, yearTo: null, component: 'Vela NGK CR9EK (gap 0,6–0,75mm) + filtro de ar', intervalKm: 32000, intervalMonths: 24, notes: 'Confirmar código exato conforme motor do chassi (CR8EK aparece como alternativa em alguns catálogos).', priority: 'MEDIUM', order: 3 },
  { modelName: 'TIGER 660 SPORT', yearFrom: 2023, yearTo: null, component: 'Folga de válvulas', intervalKm: 32000, intervalMonths: 24, notes: 'Motor frio, junto com vela e filtro de ar.', priority: 'HIGH', order: 4 },
  { modelName: 'TIGER 660 SPORT', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Padrão Triumph.', priority: 'HIGH', order: 5 },
  { modelName: 'TIGER 660 SPORT', yearFrom: 2023, yearTo: null, component: 'Verificação do recall de mangueira MAP (SRAN 609 / NHTSA 23V-583)', intervalKm: null, intervalMonths: null, notes: 'Aplicável a unidades 2021–2024. Confirmar com número de chassi.', priority: 'CRITICAL', order: 6 },
  { modelName: 'TIGER 660 SPORT', yearFrom: 2023, yearTo: null, component: 'Inspeção de circlips das pedaleiras e fixação da tampa do balancim', intervalKm: 16000, intervalMonths: 12, notes: 'Falhas relatadas por proprietários, geralmente cobertas em garantia.', priority: 'MEDIUM', order: 7 },
  { modelName: 'TIGER 660 SPORT', yearFrom: 2023, yearTo: null, component: 'Kit relação (pinhão 16T + coroa 51T + corrente 122 elos)', intervalKm: 22500, intervalMonths: null, notes: 'Trocar entre 20.000–25.000 km conforme desgaste e uso de bagagem.', priority: 'HIGH', order: 8 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Triumph Trident 660 family (Trident 660/800, Triple Tribute, Daytona 660, Tiger 660 Sport)...')

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

  console.log('✅ Triumph Trident 660 family concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
