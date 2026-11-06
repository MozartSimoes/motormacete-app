/**
 * Seed Volkswagen Fox (família) — macetes, problemas, manutenção e calibragem
 * Cobre os 4 nameplates derivados da plataforma PQ24: Fox (hatch, 2003-2021),
 * CrossFox (versão aventureira elevada, 2005-2017), SpaceFox (perua/sportvan,
 * 2006-2018) e SpaceCross (versão elevada da SpaceFox, 2011-2017). Todos
 * fabricados no Brasil (São Bernardo do Campo/São José dos Pinhais) ou, no
 * caso da SpaceFox/SpaceCross, em General Pacheco (Argentina) e importados.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-fox
 *
 * Fontes: parallelum.com.br/fipe (API FIPE), en.wikipedia.org/wiki/Volkswagen_Fox,
 *         car.blog.br, blogauto.com.br, turboway.com.br, autopapo.com.br,
 *         mobiauto.com.br, motoragora.com.br, oficinabrasil.com.br,
 *         canaldapeca.com.br, blog.mixauto.com.br, vrum.com.br,
 *         autossegredos.com.br, gazetadopovo.com.br, revistacarro.com.br,
 *         reclameaqui.com.br, calibrapneu.com.br
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
// FOX (hatch) — 2003/2004 a 2021, 18 anos de produção no Brasil
// ============================================================

const FOX_G1_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1.0 Total Flex EA111, mecânica simples e barata de manter',
    body: 'O Fox chegou ao Brasil em outubro de 2003 com motores 1.0 8V e 1.6 8V Total Flex da família EA111, os mesmos usados no Gol e no Voyage da época. É uma mecânica simples, com ampla rede de oficinas e peças acessíveis em qualquer cidade.',
  },
  {
    severity: 'OK',
    title: 'Câmbio manual de 5 marchas — sem opção automática nesta geração',
    body: 'Toda a primeira geração (2003-2009) veio só com câmbio manual de 5 marchas. Não existe versão automática ou automatizada do Fox neste período — o I-Motion só chegaria a partir de 2009/2010.',
  },
  {
    severity: 'OK',
    title: 'Plataforma PQ24 compartilhada com o Polo — peças fáceis de achar',
    body: 'O Fox usa a plataforma PQ24, também usada no Polo Hatch/Sedan da época. Muita coisa de suspensão, freio e elétrica é compartilhada entre os modelos, o que ajuda a encontrar peça de reposição com mais facilidade e preço melhor.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.6 8V é a opção mais forte desta geração',
    body: 'Quem busca mais desempenho na geração 2003-2009 deve procurar a versão 1.6 8V — o 1.0 8V é mais econômico, mas visivelmente mais fraco em subidas e com carro cheio.',
  },
]

const FOX_G1_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Embreagem com desgaste prematuro em uso urbano',
    body: 'É um problema recorrente relatado por donos e oficinas: a embreagem do Fox tende a durar menos que a média da categoria em trânsito parado e engasgado. Evite ficar com o pé apoiado no pedal e troque de marcha só quando necessário.',
  },
  {
    severity: 'WARN',
    title: 'Bieletas e amortecedores dianteiros com desgaste acelerado',
    body: 'Ruído na dianteira ao passar por buracos e lombadas costuma vir do desgaste de bieletas e amortecedores, agravado pelas condições das vias brasileiras. Vale inspecionar a cada revisão.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível acima do esperado no ciclo urbano',
    body: 'Vários proprietários relatam consumo maior que o divulgado, principalmente em trajetos urbanos com trânsito parado. Manutenção em dia (velas, filtro de ar, calibragem de pneus) ajuda a manter o consumo mais próximo do esperado.',
  },
  {
    severity: 'WARN',
    title: 'Carro já com 15+ anos: atenção redobrada a borrachas e folgas',
    body: 'Unidades desta geração já passaram dos 15-20 anos de fabricação. Além dos itens de manutenção programada, vale checar coifas, buchas e borrachas de suspensão, que endurecem e rachão com o tempo mesmo sem rodagem alta.',
  },
]

const FOX_G1_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Fox 2003-2009 (motores 1.0/1.6 8V EA111)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Correia dentada + tensor (motor 1.0/1.6 8V EA111) — item crítico, ruptura pode danificar o motor. | 60.000 km — Fluido de arrefecimento. | A cada revisão — Checar embreagem, bieletas e amortecedores dianteiros, pontos de desgaste conhecidos desta geração.',
  },
  {
    severity: 'WARN',
    title: 'Correia dentada é item crítico — não estique o prazo',
    body: 'O motor 1.0/1.6 8V EA111 desta geração tem correia dentada (não corrente). Se romper em movimento, pode dobrar válvulas e exigir retífica cara. Respeite os 60.000 km ou o prazo do manual, o que vier primeiro.',
  },
]

const FOX_G2_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Facelift 2010 alinhado ao Polo europeu',
    body: 'Em 2010 o Fox recebeu sua primeira reestilização (2ª geração), com painel e visual externo alinhados ao Polo vendido na Europa na época. Motores 1.0 e 1.6 Total Flex EA111 seguiram os mesmos.',
  },
  {
    severity: 'OK',
    title: 'Versões BlueMotion mais econômicas',
    body: 'Nesta fase surgiram as versões BlueMotion 1.0 e 1.6, com ajustes de aerodinâmica, pneus de menor resistência e relação de câmbio revisada para reduzir consumo — vale considerar se economia é prioridade.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automatizado I-Motion passa a ser oferecido',
    body: 'A partir desta geração o Fox passou a oferecer o câmbio automatizado I-Motion (base manual com atuador eletrônico de embreagem, desenvolvido com a Magneti Marelli) em algumas versões, opção à transmissão manual de 5 marchas.',
  },
]

const FOX_G2_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'I-Motion: dificuldade de engate e trancos nas trocas',
    body: 'O problema mais relatado no câmbio automatizado I-Motion é dificuldade ou até impossibilidade de engatar marcha, além de trancos nas trocas — especialmente da 1ª para a 2ª. Muitas vezes resolve com diagnóstico via scanner, mas pode indicar desgaste do atuador.',
  },
  {
    severity: 'WARN',
    title: 'Atuador de embreagem do I-Motion sujeito a falha',
    body: 'Há casos documentados de atuador de embreagem estourado no Fox I-Motion, causando trocas de marcha mais bruscas e com mais trancos. É a peça mais visada quando o câmbio automatizado começa a engatar mal.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo do motor acima do esperado em algumas unidades',
    body: 'Parte dos proprietários relata consumo de óleo maior que o normal entre trocas, principalmente em motores com mais quilometragem. Vale conferir o nível a cada abastecimento se notar isso.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira segue com desgaste acima da média',
    body: 'Assim como na geração anterior, bieletas, amortecedores e buchas dianteiras desgastam mais rápido que a média em vias esburacadas. Ruído na dianteira é o primeiro sinal.',
  },
]

const FOX_G2_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Fox 2010-2014',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 20.000 km — Filtro de ar e filtro de cabine (se equipado). | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Correia dentada (motor 1.0/1.6 8V EA111) — item crítico. | A cada revisão — Nas versões I-Motion, testar engate e trocas de marcha; qualquer tranco incomum merece diagnóstico do atuador de embreagem.',
  },
  {
    severity: 'WARN',
    title: 'Óleo do câmbio I-Motion — não ignore em versões automatizadas',
    body: 'Mesmo sendo uma caixa manual automatizada, o I-Motion tem óleo próprio para embreagem e atuador. Antecipe a inspeção se notar qualquer dificuldade de engate.',
  },
]

const FOX_G3_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Última reestilização (linha 2015): dianteira inspirada no Golf',
    body: 'Em 2014, já como linha 2015, o Fox recebeu seu retoque visual final: dianteira com traços inspirados no Golf da época e traseira com lanternas horizontais no lugar das arredondadas. Foi a última grande atualização de estilo do modelo no Brasil.',
  },
  {
    severity: 'OK',
    title: 'Fim de produção em 2021, após 18 anos de mercado',
    body: 'A Volkswagen confirmou o fim da produção do Fox em 2021, encerrando 18 anos de história no Brasil. Se está comprando um Fox desta fase final, considere que peças de acabamento específicas podem ficar mais escassas com o tempo.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.6 passa a ser MSI (EA211) nesta fase',
    body: 'Nesta geração final o motor 1.6 passou a usar a arquitetura MSI (EA211), mais moderna que o EA111 das gerações anteriores. O 1.0 seguiu Total Flex. Confirme qual motor equipa a unidade específica antes de comprar peças.',
  },
  {
    severity: 'OK',
    title: 'Diversas versões: Comfortline, Highline, Connect, Sportline, Pepper, Track',
    body: 'Esta geração final teve o maior número de versões e edições especiais do Fox no Brasil. Itens de equipamento e acabamento variam bastante entre elas — confira a ficha técnica exata da versão antes de negociar.',
  },
]

const FOX_G3_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall real: falha na fixação do volante (direção) — Fox e CrossFox linha 2015',
    body: 'A Volkswagen convocou para recall unidades de Fox e CrossFox fabricadas entre 03/02/2014 e 21/01/2015 (chassis na faixa F4000024 a F4900425, numeração não sequencial), por peças com dimensional fora da especificação na região de fixação do volante, com risco de perda de controle da direção. Recall anunciado em 26/02/2015. Verifique gratuitamente pelo chassi em vwapps.volkswagen.com.br/Recall ou pelo 0800 019 8866 — o reparo é a troca do volante.',
  },
  {
    severity: 'WARN',
    title: 'Motor 1.6 MSI (EA211) com histórico de consumo elevado de óleo',
    body: 'O motor 1.6 MSI (EA211) usado nesta fase final tem relatos frequentes de consumo de óleo lubrificante acima do normal entre trocas. Verifique o nível periodicamente e não espere a luz de óleo acender para agir.',
  },
  {
    severity: 'WARN',
    title: 'I-Motion segue com problemas de engate nesta geração',
    body: 'O câmbio automatizado I-Motion continuou disponível nesta fase e segue com o mesmo histórico de dificuldade de engate e trancos relatado nas gerações anteriores — é um ponto recorrente nos fóruns oficiais de proprietários da marca.',
  },
  {
    severity: 'WARN',
    title: 'Luz de óleo acesa com frequência pode indicar comando de válvulas',
    body: 'Além do consumo de óleo do motor MSI, alguns proprietários relatam a luz de óleo acendendo com frequência, ligada a desgaste no comando de válvulas em motores com manutenção irregular. Reforça a importância de não misturar marcas/tipos de óleo e não estourar o prazo de troca.',
  },
]

const FOX_G3_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Fox 2015-2021 (motor 1.6 MSI / 1.0 Total Flex)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo (siga a especificação exata do manual para o motor MSI). | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | A cada revisão — Nas versões I-Motion, testar engate e trocas de marcha.',
  },
  {
    severity: 'DANGER',
    title: 'Consulte o recall de direção pelo chassi antes de rodar',
    body: 'Se sua unidade foi fabricada entre 03/02/2014 e 21/01/2015, confirme se está na lista do recall de direção (fixação do volante) no site oficial da Volkswagen antes de continuar usando o carro normalmente.',
  },
]

// ============================================================
// CROSSFOX — 2005 a 2017, versão aventureira elevada do Fox
// ============================================================

const CROSSFOX_G1_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Versão aventureira elevada do Fox, lançada em 2005',
    body: 'O CrossFox chegou em 2005 como a "primeira tentativa de SUV" da Volkswagen no Brasil: altura livre do solo 5,3 cm maior que o Fox, pneus de uso misto e apliques plásticos, sem deixar de ser, mecanicamente, um Fox.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.6 8V VHT Total Flex, câmbio manual de 5 marchas',
    body: 'Toda a primeira geração veio com motor 1.6 8V VHT Total Flex e câmbio manual de 5 marchas — não havia opção automática nesta fase.',
  },
  {
    severity: 'OK',
    title: 'Plataforma PQ24 compartilhada com Fox e Polo',
    body: 'Por dividir a plataforma e boa parte da mecânica com o Fox, peças de motor, freio e elétrica costumam ser mais fáceis de achar do que em SUVs de nicho da época.',
  },
]

const CROSSFOX_G1_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Consumo elevado, principalmente no trânsito urbano',
    body: 'Assim como o Fox da época, o CrossFox 1.6 8V tem consumo relatado acima do esperado em uso urbano — manutenção em dia ajuda a minimizar a diferença.',
  },
  {
    severity: 'WARN',
    title: 'Bieletas e amortecedores dianteiros com desgaste acelerado',
    body: 'Ruído na dianteira ao passar por buracos costuma vir do desgaste prematuro de bieletas e amortecedores — ponto fraco conhecido desta geração.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem com desgaste prematuro',
    body: 'Assim como no Fox, a embreagem do CrossFox tende a exigir troca antes do esperado em uso urbano intenso, com trânsito parado.',
  },
]

const CROSSFOX_G1_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma CrossFox 2005-2009',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Correia dentada + tensor (motor 1.6 8V VHT) — item crítico. | A cada revisão — Checar bieletas, amortecedores dianteiros e embreagem.',
  },
  {
    severity: 'OK',
    title: 'Suspensão elevada pede atenção extra em revisões',
    body: 'A altura livre do solo maior do CrossFox é conquistada com molas e amortecedores próprios — não são os mesmos do Fox comum. Garanta que a oficina use peças específicas do CrossFox, não do Fox, ao trocar.',
  },
]

const CROSSFOX_G2_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Câmbio I-Motion passa a ser oferecido a partir de 2009/2010',
    body: 'Nesta fase o CrossFox ganhou a opção do câmbio automatizado I-Motion, além do manual de 5 marchas — mesma base mecânica do Fox da época.',
  },
  {
    severity: 'OK',
    title: 'Atualização MSI 1.6 16V chega em 2014',
    body: 'Em 2014 o CrossFox recebeu o motor 1.6 16V MSI (mais moderno que o VHT anterior), com câmbio manual de 6 marchas ou I-Motion.',
  },
]

const CROSSFOX_G2_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'I-Motion: engasgos nas trocas e aceleração lenta',
    body: 'Nas versões automatizadas 2009-2014, é comum relato de engasgos nas trocas de marcha e resposta lenta na aceleração — ponto recorrente também no Fox e na SpaceFox equipados com o mesmo sistema.',
  },
  {
    severity: 'WARN',
    title: 'Manutenção do I-Motion pode sair cara: recalibração e atuador',
    body: 'Quando o câmbio automatizado apresenta falha, o reparo costuma envolver recalibração do sistema ou troca do atuador de embreagem — itens que encarecem a manutenção em relação à versão manual equivalente.',
  },
  {
    severity: 'WARN',
    title: 'Falha no módulo eletrônico pode travar o câmbio',
    body: 'Há relatos de mau contato nos conectores do sistema robotizado causando falhas de engate ou até travamento total do câmbio. Um diagnóstico por scanner costuma identificar rapidamente se o problema é elétrico ou mecânico.',
  },
]

const CROSSFOX_G2_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma CrossFox 2010-2014',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Correia dentada (motor 1.6 8V VHT) ou verificar tipo de comando no 1.6 MSI a partir de 2014. | A cada revisão — Nas versões I-Motion, testar engate e trocas de marcha.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão elevada: use peças específicas do CrossFox',
    body: 'Ao trocar amortecedores e molas, confirme que são as peças específicas do CrossFox (altura elevada), não as do Fox comum — a troca errada compromete a altura livre do solo característica do modelo.',
  },
]

const CROSSFOX_G3_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Última geração do CrossFox, descontinuado em 2017',
    body: 'Esta foi a última fase do CrossFox antes de sair de linha em 2017 — a Volkswagen concentrou o segmento de SUVs compactos em modelos como o T-Cross, lançado depois.',
  },
  {
    severity: 'OK',
    title: 'Compartilha motor 1.6 16V MSI e câmbio manual de 6 marchas com o Fox final',
    body: 'Nesta fase o CrossFox usa a mesma base mecânica do Fox reestilizado (2015 em diante): motor 1.6 MSI e câmbio manual de 6 marchas ou I-Motion.',
  },
]

const CROSSFOX_G3_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall real: falha na fixação do volante (direção) — Fox e CrossFox linha 2015',
    body: 'O mesmo recall de direção do Fox se aplica ao CrossFox: unidades fabricadas entre 03/02/2014 e 21/01/2015 (chassis na faixa F4000024 a F4900425), por peças fora do dimensional na fixação do volante, com risco de perda de controle da direção. Recall anunciado em 26/02/2015. Verifique pelo chassi em vwapps.volkswagen.com.br/Recall ou 0800 019 8866.',
  },
  {
    severity: 'WARN',
    title: 'Engates duros na 1ª e 2ª marcha no câmbio manual',
    body: 'Proprietários da versão manual de 6 marchas desta fase final relatam engate mais duro, principalmente nas duas primeiras marchas — vale checar o óleo do câmbio se o problema for recorrente.',
  },
  {
    severity: 'WARN',
    title: 'Ruído de plásticos internos no painel e nas portas',
    body: 'É comum surgir ruído de plástico solto no painel ou nas portas com o tempo de uso — normalmente resolvido reapertando os encaixes internos, sem custo alto.',
  },
  {
    severity: 'WARN',
    title: 'Pequenos vazamentos de óleo na tampa de válvulas',
    body: 'Há relatos de pequenos vazamentos de óleo pela junta da tampa de válvulas nesta geração final — fique atento a manchas de óleo sob o motor e ao nível do óleo entre trocas.',
  },
]

const CROSSFOX_G3_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma CrossFox 2015-2017',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | A cada revisão — Checar junta da tampa de válvulas (vazamento de óleo) e, nas versões I-Motion, testar engate e trocas de marcha.',
  },
  {
    severity: 'DANGER',
    title: 'Consulte o recall de direção pelo chassi antes de rodar',
    body: 'Se sua unidade foi fabricada entre 03/02/2014 e 21/01/2015, confirme se está na lista do recall de direção (fixação do volante) no site oficial da Volkswagen.',
  },
]

// ============================================================
// SPACEFOX — 2006 a 2018, primeira "sportvan" do Brasil
// ============================================================

const SPACEFOX_G1_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Primeira "sportvan" do Brasil, lançada em 2006',
    body: 'A SpaceFox chegou em 2006 como a primeira perua com visual esportivo e funcionalidade de minivan do mercado brasileiro, fabricada na fábrica de General Pacheco, na Argentina.',
  },
  {
    severity: 'OK',
    title: 'Motores 1.6 8V/16V Total Flex, manual ou automatizado de 5 posições',
    body: 'Ao longo desta fase a SpaceFox foi vendida com motores 1.6 8V e 1.6 16V Total Flex, com câmbio manual de 5 marchas ou automatizado (I-Motion) de 5 posições, em versões como Trendline, Comfortline e Highline.',
  },
  {
    severity: 'OK',
    title: 'Espaço interno maior que os hatches do segmento',
    body: 'O maior diferencial da SpaceFox é o espaço interno e porta-malas, bem acima do Fox hatch — vale a pena para quem prioriza espaço para família a estética esportiva.',
  },
]

const SPACEFOX_G1_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmbio 1.6 I-Motion com problemas recorrentes de engate',
    body: 'Uma avaliação de reparador especializada apontou problemas recorrentes no câmbio automatizado I-Motion da SpaceFox 1.6, comprometendo o conforto de condução prometido pelo sistema — engates lentos e trancos nas trocas.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão sofre mais com o peso extra da carroceria perua',
    body: 'Por ser mais pesada que o Fox hatch, a suspensão da SpaceFox tende a desgastar amortecedores e buchas um pouco mais rápido, principalmente quando rodada sempre carregada.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível mais alto que o Fox hatch',
    body: 'O peso e a carroceria maior da SpaceFox resultam em consumo de combustível mais alto que o Fox equivalente — considere isso ao comparar custo de uso entre os dois.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem com desgaste prematuro nas versões manuais',
    body: 'Assim como no Fox e no CrossFox da mesma plataforma, a embreagem da SpaceFox manual tende a durar menos que a média em uso urbano intenso.',
  },
]

const SPACEFOX_G1_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SpaceFox 2006-2014',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Correia dentada + tensor (motor 1.6 8V/16V) — item crítico. | A cada revisão — Nas versões I-Motion, testar engate e trocas de marcha; checar suspensão traseira pelo peso extra da carroceria.',
  },
  {
    severity: 'OK',
    title: 'Revisão do sistema I-Motion, se equipado',
    body: 'Se notar dificuldade de engate ou trancos, não adie o diagnóstico — o problema tende a piorar e o reparo do atuador de embreagem é mais caro quanto mais se posterga.',
  },
]

const SPACEFOX_G2_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Facelift final alinhado ao Fox reestilizado',
    body: 'A partir de 2015 a SpaceFox recebeu uma reestilização alinhada à do Fox da mesma época, sendo a última atualização visual do modelo antes de sair de linha.',
  },
  {
    severity: 'OK',
    title: 'Fim de produção em 2018, após quase 13 anos no Brasil',
    body: 'A Volkswagen confirmou o fim da produção da SpaceFox em 2018 (produzida desde 2006 em General Pacheco, Argentina) — as últimas unidades marcaram quase 13 anos de comercialização no Brasil. Peças específicas tendem a ficar mais escassas por ser um modelo de menor volume de vendas.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.6 passa a MSI nesta fase final',
    body: 'Assim como o Fox e o CrossFox da mesma época, a SpaceFox final passou a usar o motor 1.6 MSI, mais moderno que o VHT das gerações anteriores.',
  },
]

const SPACEFOX_G2_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmbio I-Motion segue com histórico de falhas de engate',
    body: 'O problema de engate difícil e trancos do I-Motion, já conhecido das gerações anteriores da SpaceFox e do restante da família Fox, continua presente nesta fase final.',
  },
  {
    severity: 'WARN',
    title: 'Motor 1.6 MSI com relatos de consumo de óleo elevado',
    body: 'Assim como no Fox final, o motor 1.6 MSI da SpaceFox desta fase tem relatos de consumo de óleo lubrificante acima do normal entre trocas — verifique o nível periodicamente.',
  },
  {
    severity: 'WARN',
    title: 'Peças específicas mais difíceis de achar por ser modelo descontinuado',
    body: 'Por ser um modelo de menor volume de vendas e já fora de linha, peças de acabamento e algumas peças de carroceria específicas da SpaceFox podem demorar mais para chegar do que as do Fox equivalente.',
  },
]

const SPACEFOX_G2_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SpaceFox 2015-2018',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo (motor MSI, siga a especificação exata do manual). | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | A cada revisão — Nas versões I-Motion, testar engate e trocas de marcha.',
  },
  {
    severity: 'OK',
    title: 'Modelo descontinuado: planeje peças com antecedência',
    body: 'Ao agendar revisão, confirme com antecedência a disponibilidade de peças específicas da SpaceFox na concessionária ou oficina, já que o modelo saiu de linha.',
  },
]

// ============================================================
// SPACECROSS — 2011 a 2017, versão elevada da SpaceFox
// ============================================================

const SPACECROSS_G1_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Versão aventureira elevada da SpaceFox, lançada em 2011',
    body: 'A SpaceCross chegou em 2011 como a versão elevada e mais robusta da SpaceFox, seguindo a mesma fórmula do CrossFox em relação ao Fox: suspensão mais alta e apliques plásticos.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.6 Total Flex, câmbio manual ou I-Motion',
    body: 'A SpaceCross compartilha a mecânica da SpaceFox da mesma época: motor 1.6 8V/16V Total Flex, com câmbio manual de 5 marchas ou automatizado I-Motion.',
  },
  {
    severity: 'OK',
    title: 'Maior espaço interno da família Fox, com visual mais robusto',
    body: 'Para quem quer o espaço da SpaceFox com visual mais aventureiro, a SpaceCross é a opção — mecanicamente é a mesma perua, com suspensão elevada e detalhes específicos.',
  },
]

const SPACECROSS_G1_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão elevada com desgaste acelerado em uso misto',
    body: 'A suspensão mais alta da SpaceCross, assim como a do CrossFox, tende a desgastar buchas e amortecedores mais rápido em uso misto cidade/estrada — ruído na dianteira é o primeiro sinal.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio I-Motion com os mesmos problemas de engate da família Fox',
    body: 'Nas versões automatizadas, os mesmos problemas de dificuldade de engate e trancos nas trocas relatados no Fox, CrossFox e SpaceFox também aparecem na SpaceCross, por compartilharem o sistema.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível elevado pelo peso e carroceria maior',
    body: 'Por ser mais pesada e ter suspensão elevada, a SpaceCross tende a consumir mais combustível que a SpaceFox e bem mais que o Fox hatch equivalente.',
  },
]

const SPACECROSS_G1_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SpaceCross 2011-2014',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Correia dentada + tensor (motor 1.6 8V/16V) — item crítico. | A cada revisão — Checar buchas e amortecedores da suspensão elevada; nas versões I-Motion, testar engate e trocas de marcha.',
  },
  {
    severity: 'OK',
    title: 'Use peças de suspensão específicas da SpaceCross',
    body: 'Ao trocar amortecedores e molas, confirme que são as peças específicas da suspensão elevada da SpaceCross, não as da SpaceFox comum.',
  },
]

const SPACECROSS_G2_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Última geração da SpaceCross, descontinuada com a SpaceFox',
    body: 'Esta foi a fase final da SpaceCross antes de sair de linha junto com a SpaceFox, por volta de 2017/2018, quando a Volkswagen encerrou a produção da perua no Brasil.',
  },
  {
    severity: 'OK',
    title: 'Compartilha atualização MSI 1.6 com a SpaceFox final',
    body: 'Assim como a SpaceFox da mesma época, a SpaceCross final passou a usar o motor 1.6 MSI, mais moderno que o VHT das gerações anteriores.',
  },
  {
    severity: 'OK',
    title: 'Modelo de baixo volume — pesquise bem antes de comprar usado',
    body: 'Por ser a versão elevada de um nicho já pequeno (perua), a SpaceCross final teve volume de vendas baixo. Vale pesquisar bem a procedência e o histórico de manutenção antes de fechar negócio.',
  },
]

const SPACECROSS_G2_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Mesmos problemas crônicos do câmbio I-Motion da família Fox',
    body: 'Nas versões automatizadas, os problemas de engate difícil e trancos nas trocas do I-Motion, comuns a toda a família Fox, seguem presentes nesta geração final da SpaceCross.',
  },
  {
    severity: 'WARN',
    title: 'Motor 1.6 MSI com relatos de consumo de óleo elevado',
    body: 'O motor 1.6 MSI desta fase final tem o mesmo histórico de consumo de óleo lubrificante acima do normal relatado no Fox e na SpaceFox equivalentes.',
  },
  {
    severity: 'WARN',
    title: 'Disponibilidade de peças reduzida por ser modelo descontinuado',
    body: 'Por ser um modelo de baixíssimo volume e já fora de linha, peças específicas de suspensão elevada e acabamento da SpaceCross podem demorar bem mais para chegar do que as da SpaceFox comum.',
  },
]

const SPACECROSS_G2_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SpaceCross 2015-2017',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo (motor MSI, siga a especificação exata do manual). | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | A cada revisão — Checar suspensão elevada e, nas versões I-Motion, testar engate e trocas de marcha.',
  },
  {
    severity: 'OK',
    title: 'Modelo descontinuado: planeje peças com antecedência',
    body: 'Ao agendar revisão, confirme com antecedência a disponibilidade de peças específicas da SpaceCross, já que o modelo saiu de linha junto com a SpaceFox.',
  },
]

// ============================================================

const BLOCKS: ModelBlock[] = [
  { modelName: 'Fox', yearFrom: 2003, yearTo: 2009, MACETES: FOX_G1_MACETES, PROBLEMAS: FOX_G1_PROBLEMAS, MANUTENCAO: FOX_G1_MANUTENCAO },
  { modelName: 'Fox', yearFrom: 2010, yearTo: 2014, MACETES: FOX_G2_MACETES, PROBLEMAS: FOX_G2_PROBLEMAS, MANUTENCAO: FOX_G2_MANUTENCAO },
  { modelName: 'Fox', yearFrom: 2015, yearTo: 2021, MACETES: FOX_G3_MACETES, PROBLEMAS: FOX_G3_PROBLEMAS, MANUTENCAO: FOX_G3_MANUTENCAO },

  { modelName: 'CrossFox', yearFrom: 2005, yearTo: 2009, MACETES: CROSSFOX_G1_MACETES, PROBLEMAS: CROSSFOX_G1_PROBLEMAS, MANUTENCAO: CROSSFOX_G1_MANUTENCAO },
  { modelName: 'CrossFox', yearFrom: 2010, yearTo: 2014, MACETES: CROSSFOX_G2_MACETES, PROBLEMAS: CROSSFOX_G2_PROBLEMAS, MANUTENCAO: CROSSFOX_G2_MANUTENCAO },
  { modelName: 'CrossFox', yearFrom: 2015, yearTo: 2017, MACETES: CROSSFOX_G3_MACETES, PROBLEMAS: CROSSFOX_G3_PROBLEMAS, MANUTENCAO: CROSSFOX_G3_MANUTENCAO },

  { modelName: 'SpaceFox', yearFrom: 2006, yearTo: 2014, MACETES: SPACEFOX_G1_MACETES, PROBLEMAS: SPACEFOX_G1_PROBLEMAS, MANUTENCAO: SPACEFOX_G1_MANUTENCAO },
  { modelName: 'SpaceFox', yearFrom: 2015, yearTo: 2018, MACETES: SPACEFOX_G2_MACETES, PROBLEMAS: SPACEFOX_G2_PROBLEMAS, MANUTENCAO: SPACEFOX_G2_MANUTENCAO },

  { modelName: 'SpaceCross', yearFrom: 2011, yearTo: 2014, MACETES: SPACECROSS_G1_MACETES, PROBLEMAS: SPACECROSS_G1_PROBLEMAS, MANUTENCAO: SPACECROSS_G1_MANUTENCAO },
  { modelName: 'SpaceCross', yearFrom: 2015, yearTo: 2017, MACETES: SPACECROSS_G2_MACETES, PROBLEMAS: SPACECROSS_G2_PROBLEMAS, MANUTENCAO: SPACECROSS_G2_MANUTENCAO },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Fox',
    yearFrom: 2003,
    yearTo: 2021,
    tireSize: '175/70 R14 · 185/65 R14 · 195/55 R15 (conforme versão e ano)',
    frontPsi: 30,
    rearPsi: 30,
    frontPsiLoad: 32,
    rearPsiLoad: 32,
    sparePsi: 60,
    notes: 'Valor de referência típico para a categoria — o Fox teve 18 anos de produção e diversas medidas de pneu. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista ou na tampa do tanque de combustível.',
  },
  {
    modelName: 'CrossFox',
    yearFrom: 2005,
    yearTo: 2017,
    tireSize: '205/60 R15 (a maioria das versões)',
    frontPsi: 30,
    rearPsi: 32,
    frontPsiLoad: 32,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Valor de referência típico para a categoria — a suspensão elevada e os pneus de uso misto pedem atenção redobrada à calibragem. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
  {
    modelName: 'SpaceFox',
    yearFrom: 2006,
    yearTo: 2018,
    tireSize: '185/65 R14 · 195/55 R15 (conforme versão)',
    frontPsi: 30,
    rearPsi: 32,
    frontPsiLoad: 32,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Pressão traseira normalmente maior que a dianteira por conta do peso extra da carroceria perua. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
  {
    modelName: 'SpaceCross',
    yearFrom: 2011,
    yearTo: 2017,
    tireSize: '205/60 R15',
    frontPsi: 30,
    rearPsi: 32,
    frontPsiLoad: 32,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Pressão traseira normalmente maior que a dianteira por conta do peso extra da carroceria perua elevada. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // Fox
  { modelName: 'Fox', yearFrom: 2003, yearTo: 2021, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.0/1.6 Total Flex (EA111) ou 1.6 MSI (EA211) conforme o ano — siga a especificação exata do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Fox', yearFrom: 2003, yearTo: 2021, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Fox', yearFrom: 2003, yearTo: 2014, component: 'Correia dentada + tensor', intervalKm: 60000, intervalMonths: 60, notes: 'Motores 1.0/1.6 8V EA111 (2003-2014). Ruptura em movimento pode danificar seriamente o motor.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Fox', yearFrom: 2003, yearTo: 2021, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Fox', yearFrom: 2003, yearTo: 2021, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Nem todas as versões de entrada têm filtro de cabine de série.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Fox', yearFrom: 2003, yearTo: 2021, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Fox', yearFrom: 2003, yearTo: 2021, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Volkswagen.', priority: 'HIGH', order: 6 },
  { modelName: 'Fox', yearFrom: 2009, yearTo: 2021, component: 'Câmbio I-Motion — atuador de embreagem', intervalKm: 40000, intervalMonths: 24, notes: 'Só se aplica às versões automatizadas. Antecipe se notar trancos ou dificuldade de engate.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Fox', yearFrom: 2003, yearTo: 2021, component: 'Embreagem — inspeção antecipada (versões manuais)', intervalKm: 40000, intervalMonths: null, notes: 'Histórico de desgaste mais rápido que a média em uso urbano.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Fox', yearFrom: 2003, yearTo: 2021, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 9 },

  // CrossFox
  { modelName: 'CrossFox', yearFrom: 2005, yearTo: 2017, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.6 8V VHT, 16V ou 1.6 MSI conforme o ano — siga a especificação exata do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'CrossFox', yearFrom: 2005, yearTo: 2017, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'CrossFox', yearFrom: 2005, yearTo: 2014, component: 'Correia dentada + tensor', intervalKm: 60000, intervalMonths: 60, notes: 'Motor 1.6 8V/16V VHT. Ruptura em movimento pode danificar seriamente o motor.', priority: 'CRITICAL', order: 2 },
  { modelName: 'CrossFox', yearFrom: 2005, yearTo: 2017, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CrossFox', yearFrom: 2005, yearTo: 2017, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 4 },
  { modelName: 'CrossFox', yearFrom: 2005, yearTo: 2017, component: 'Suspensão elevada — buchas e amortecedores', intervalKm: 20000, intervalMonths: 24, notes: 'Ponto de desgaste conhecido do CrossFox; use peças específicas da suspensão elevada, não as do Fox comum.', priority: 'MEDIUM', order: 5 },
  { modelName: 'CrossFox', yearFrom: 2009, yearTo: 2017, component: 'Câmbio I-Motion — atuador de embreagem', intervalKm: 40000, intervalMonths: 24, notes: 'Só se aplica às versões automatizadas. Antecipe se notar trancos ou dificuldade de engate.', priority: 'MEDIUM', order: 6 },
  { modelName: 'CrossFox', yearFrom: 2005, yearTo: 2017, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 7 },

  // SpaceFox
  { modelName: 'SpaceFox', yearFrom: 2006, yearTo: 2018, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.6 8V/16V ou 1.6 MSI conforme o ano — siga a especificação exata do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'SpaceFox', yearFrom: 2006, yearTo: 2018, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'SpaceFox', yearFrom: 2006, yearTo: 2014, component: 'Correia dentada + tensor', intervalKm: 60000, intervalMonths: 60, notes: 'Motor 1.6 8V/16V. Ruptura em movimento pode danificar seriamente o motor.', priority: 'CRITICAL', order: 2 },
  { modelName: 'SpaceFox', yearFrom: 2006, yearTo: 2018, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SpaceFox', yearFrom: 2006, yearTo: 2018, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 4 },
  { modelName: 'SpaceFox', yearFrom: 2006, yearTo: 2018, component: 'Suspensão traseira — inspeção pelo peso extra da carroceria', intervalKm: 20000, intervalMonths: 24, notes: 'A carroceria perua exige atenção maior a amortecedores e buchas traseiras.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SpaceFox', yearFrom: 2006, yearTo: 2018, component: 'Câmbio I-Motion — atuador de embreagem', intervalKm: 40000, intervalMonths: 24, notes: 'Só se aplica às versões automatizadas. Antecipe se notar trancos ou dificuldade de engate.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SpaceFox', yearFrom: 2006, yearTo: 2018, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 7 },

  // SpaceCross
  { modelName: 'SpaceCross', yearFrom: 2011, yearTo: 2017, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.6 8V/16V ou 1.6 MSI conforme o ano — siga a especificação exata do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'SpaceCross', yearFrom: 2011, yearTo: 2017, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'SpaceCross', yearFrom: 2011, yearTo: 2014, component: 'Correia dentada + tensor', intervalKm: 60000, intervalMonths: 60, notes: 'Motor 1.6 8V/16V. Ruptura em movimento pode danificar seriamente o motor.', priority: 'CRITICAL', order: 2 },
  { modelName: 'SpaceCross', yearFrom: 2011, yearTo: 2017, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SpaceCross', yearFrom: 2011, yearTo: 2017, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 4 },
  { modelName: 'SpaceCross', yearFrom: 2011, yearTo: 2017, component: 'Suspensão elevada — buchas e amortecedores', intervalKm: 20000, intervalMonths: 24, notes: 'Ponto de desgaste conhecido; use peças específicas da suspensão elevada, não as da SpaceFox comum.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SpaceCross', yearFrom: 2011, yearTo: 2017, component: 'Câmbio I-Motion — atuador de embreagem', intervalKm: 40000, intervalMonths: 24, notes: 'Só se aplica às versões automatizadas. Antecipe se notar trancos ou dificuldade de engate.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SpaceCross', yearFrom: 2011, yearTo: 2017, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 7 },
]

async function main() {
  console.log('🚗 Seed Volkswagen Fox (Fox, CrossFox, SpaceFox, SpaceCross)...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  let totalTips = 0

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

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
    totalTips += allTips.length
    console.log(`  ✅ ${block.modelName} (${block.yearFrom ?? '-'}-${block.yearTo ?? '-'}): ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: [...new Set(BLOCKS.map((b) => b.modelName))] } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log(`✅ Volkswagen Fox (família) concluído! Total: ${totalTips} tips, ${TIRE_PRESSURES.length} pressões, ${MAINTENANCE_ITEMS.length} itens de manutenção.`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
