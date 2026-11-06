// seed-sundown-hunter-max-vblade.ts — Sundown Hunter 90/100/125 SE, Max 125 SE/SED, VBlade 250cc
// Sundown Motos (Manaus-AM) — marca brasileira com trajetória turbulenta: dificuldades financeiras
// e troca de sócios por volta de 2010-2011 deixaram peças escassas para modelos mais antigos.
// Motor 124,5cc OHV da linha Hunter 125/Max 125 é uma cópia do bloco Honda CG125 — grande vantagem
// de compatibilidade de peças. Motores 86cc/97,2cc da Hunter 90/100 são um bloco OHC menor, exclusivo
// da linha Sundown de entrada. VBlade 250cc é a "minicustom" da marca — raro V-twin nacional de 249cc.
// Execute: pnpm --filter @motormacete/database db:seed:sundown-hunter-max-vblade
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

// ─── HUNTER 90 ─────────────────────────────────────────────────────────────
// Motor: 86cc 4T OHC monocilíndrico a ar | 5,7 cv @ 8.500 rpm | torque 0,59 kgf.m @ 5.500 rpm
// Partida: só a pedal (versão de entrada da linha, sem elétrica) | Carburador simples de diafragma
// Óleo 20W-50 ~0,8L | Vela NGK C7HSA gap 0,6-0,7mm | Corrente 428 | Pneu 2.75-18 (F) / 90/90-18 (R)

const HUNTER90_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 20W-50 mineral — 0,8L na troca; motor pequeno exige troca mais frequente',
    body: 'O motor 86cc OHC da Hunter 90 é o menor da linha trail Sundown. Capacidade de óleo: aproximadamente 0,8L (confira o nível pela vareta com moto na vertical, motor morno). Use 20W-50 mineral API SF/SG — não precisa ser sintético, o motor é simples e de tolerâncias largas. Como a embreagem é úmida (banho no mesmo óleo do motor), evite óleo JASO MB (para scooter/CVT) que pode fazer a embreagem escorregar. Troca a cada 1.500 km — intervalo curto, mas o custo do óleo é baixo e protege um motor sem filtro de óleo substituível (só tela).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA gap 0,6-0,7mm — mesma vela da família Hunter/Max 125',
    body: 'A vela NGK C7HSA (rosca 10mm) é usada em praticamente toda a linha pequena da Sundown — Hunter 90, Hunter 100, Hunter 125 SE e Max 125. Isso facilita: comprar 2-3 velas reserva serve para qualquer moto da família. Gap: 0,6-0,7mm com calibrador de palheta. Sintoma de vela gasta: partida difícil a frio (o motor não tem elétrica na Hunter 90, então uma vela ruim + bateria... na verdade aqui é só a pedal, então conte com boa compressão e vela nova para não cansar a perna). Troque a cada 6.000-8.000 km.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 com relação baixa (mais torque) — ideal para trilha, mas gasta mais rápido',
    body: 'A Hunter 90 usa corrente 428 com relação de transmissão voltada para torque (pinhão pequeno / coroa grande), típico de trail. Isso significa mais tração em subida mas desgaste de corrente mais rápido que numa moto de estrada. Lubrifique a cada 400-500 km, mais frequente se rodar em trilha com poeira/lama (a poeira vira pasta abrasiva misturada ao lubrificante — depois de trilha, limpe a corrente com querosene antes de lubrificar de novo). Folga: 20-30mm no trecho inferior.',
  },
  {
    severity: 'WARN',
    title: 'Motor 86cc é exclusivo da linha — pistão/anéis não têm equivalente CG125',
    body: 'Diferente da Hunter 125 (motor cópia do CG125, com peças fartas), o bloco 86cc da Hunter 90 é uma medida própria da Sundown, sem correspondente direto na linha Honda. Para pistão e anéis, procure por "pistão 86cc Sundown Hunter" em desmontes e distribuidoras de peças para motos nacionais/chinesas — o diâmetro do cilindro (~47mm) por vezes bate com motores chineses genéricos de mesma cilindrada usados por outras pequenas marcas da época. Sempre leve a peça original para conferir a medida antes de comprar equivalente.',
  },
  {
    severity: 'OK',
    title: 'Carburador simples — regule a marcha lenta pelo parafuso de ar antes de mexer no combustível',
    body: 'O carburador da Hunter 90 é básico, sem muitos ajustes. Se a marcha lenta estiver instável: primeiro gire o parafuso de ar (mistura) em pequenos incrementos de 1/4 de volta — geralmente a posição ideal é 1,5-2,5 voltas abertas a partir do fechado. Só depois mexa no parafuso de marcha lenta (rotação). Limpeza do jato principal a cada 6 meses evita entupimento por etanol degradado — comum em motos que ficam paradas por semanas.',
  },
  {
    severity: 'OK',
    title: 'Pneus 2.75-18 (F) / 90/90-18 (R) com câmara — calibre baixo para trilha, mais alto para estrada',
    body: 'A Hunter 90 usa pneus com câmara de ar em aro 18 nas duas rodas — medida comum a toda a linha Hunter. Para uso misto trilha/estrada, calibre um pouco abaixo da tabela de fábrica quando for pegar terra solta (melhora tração), e volte à pressão cheia para rodar em asfalto (evita desgaste irregular e reduz risco de furo por aro em buracos).',
  },
]

const HUNTER90_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Peças escassas para unidades antigas — Sundown teve reestruturação societária em 2010-2011',
    body: 'A Sundown passou por dificuldades financeiras e troca de sócios/direção por volta de 2010-2011, período em que revendas relataram falta de peças e dificuldade de contato com a fábrica. Para uma Hunter 90 (modelo mais antigo da linha), muitas peças específicas de plástico (carenagem, painel) e elétricas hoje só aparecem em desmontes ou grupos de compra/venda "Sundown Brasil" no Facebook/Mercado Livre. Peças mecânicas (corrente, vela, filtro) seguem disponíveis por serem padrão de mercado.',
  },
  {
    severity: 'WARN',
    title: 'Erros de regulagem de fábrica/revenda: confira óleo, carburador e válvulas na primeira revisão',
    body: 'É um problema documentado nos fóruns de proprietários Sundown: motos que saem da revenda com regulagem incorreta de óleo, carburador ou folga de válvulas — dependendo de quem fez a preparação de entrega. Como muitos compradores são novatos, o problema só aparece depois, como consumo alto ou ruído de válvula. Recomendação: na primeira revisão (500-1.000 km), confira pessoalmente (ou peça para o mecânico confirmar por escrito) o nível de óleo, a regulagem do carburador e a folga de válvulas.',
  },
  {
    severity: 'WARN',
    title: 'Parafuso do basculante (balança traseira) solta com uso em trilha — confira semanalmente',
    body: 'Um problema recorrente relatado por donos de motos trail Sundown é o parafuso de fixação do basculante traseiro afrouxando com vibração de uso em trilha/terra, a ponto de precisar reaperto semanal em uso intenso. Torque recomendado: 35-45 Nm (confira a especificação do parafuso específico). Use trava química (Loctite azul) na rosca ao reapertar — reduz a folga recorrente. Se o parafuso continuar afrouxando mesmo com trava química, o furo pode estar ovalizado e precisa de bucha nova.',
  },
  {
    severity: 'WARN',
    title: 'Sem partida elétrica: cuide da técnica de pedal para não cansar ou machucar o tornozelo',
    body: 'A Hunter 90 (diferente da 100 e 125) não tem partida elétrica — só pedal (kickstarter). Em dias frios ou motor "afogado", pode ser necessário puxar o afogador (choke), girar o acelerador levemente e pedalar com o peso do corpo, não só a perna. Se a moto não pega em 3-4 tentativas, pare e verifique vela (pode estar encharcada de combustível) antes de continuar tentando — evita cansaço e reduz risco de estalo de retorno (contragolpe) no pedal.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem em peças de fixação: uso misto trilha/chuva acelera oxidação',
    body: 'Parafusos, grampos e presilhas plásticas da Hunter 90 não têm proteção anticorrosiva reforçada. Em uso frequente com lama e chuva, parafusos de fixação de carenagem enferrujam e a cabeça "arredonda" na hora de soltar. Prevenção: aplique WD-40 ou graxa de cobre nos parafusos externos a cada poucos meses. Se um parafuso enferrujado não sair, aplique óleo penetrante e aguarde 15-20 minutos antes de forçar — evita quebrar a cabeça e ter que furar/extrair.',
  },
]

const HUNTER90_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário Hunter 90: motor pequeno OHC exige atenção frequente mas barata',
    body: '500 km — Troca de óleo inicial (rodagem, 20W-50). | 1.500 km — Troca de óleo. Verificar folga de corrente e vela. | 3.000 km — Troca de óleo. Limpar filtro de ar (espuma: lavar com querosene, secar, umedecer com óleo). | 6.000 km — Troca da vela NGK C7HSA. Regular folga de válvulas (motor frio). | 8.000 km — Kit relação (corrente + pinhão + coroa) se desgastado. Verificar parafusos do basculante. | 10.000 km — Trocar filtro de ar se for do tipo papel. Revisar carburador (limpeza do jato principal). | 12.000 km — Rolamentos de roda e direção — inspeção.',
  },
]

// ─── HUNTER 100 95cc ───────────────────────────────────────────────────────
// Motor: 97,2cc 4T OHC monocilíndrico a ar | 7,07 cv @ 8.000 rpm | torque 0,66 kgf.m @ 6.000 rpm
// Bore/stroke 50,0×49,5mm (cilindro 3mm maior que a Hunter 90) | Partida elétrica + pedal
// Câmbio 4 marchas rotativo | Óleo 20W-50 ~0,8L | Vela NGK C7HSA | Pneu 2.75-18 (F) / 90/90-18 (R)

const HUNTER100_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Evolução da Hunter 90: cilindro 3mm maior (86cc → 97,2cc) e ganho real de fôlego',
    body: 'A Hunter 100 é a Hunter 90 com o cilindro alargado em 3mm (50,0mm de diâmetro), elevando a cilindrada de 86cc para 97,2cc e a potência de 5,7 cv para 7,07 cv @ 8.000 rpm. Compressão 8,8:1. Na prática, isso significa retomadas mais folgadas e menos necessidade de "descer marcha" em subida — mas o motor continua sendo da mesma família construtiva da Hunter 90, então boa parte dos macetes de manutenção (óleo, vela, corrente) valem para as duas.',
  },
  {
    severity: 'OK',
    title: 'Câmbio 4 marchas rotativo: sem neutro entre as marchas — aprenda o ciclo N-1-2-3-4-N',
    body: 'A Hunter 100 usa câmbio rotativo de 4 marchas: N-1-2-3-4 e depois volta para N (ponto morto só aparece entre a 1ª e a 4ª, não entre as demais). Se você pisar demais achando que vai "descer uma marcha e parar", pode voltar direto para o neutro sem querer. É comum quem troca de moto (vindo de câmbio sequencial comum) sentir estranheza nos primeiros dias — pratique em local seguro antes de rodar no trânsito.',
  },
  {
    severity: 'OK',
    title: 'Partida elétrica: bateria pequena — não force o motor de partida repetidamente',
    body: 'A Hunter 100 ganhou partida elétrica (a 90 não tem) além do pedal. A bateria é pequena (tipicamente 12V 4-5Ah) — se o motor não pegar em 3-4 tentativas de 3-5 segundos cada, pare e use o pedal, ou espere 30 segundos para a bateria "recuperar". Insistir na elétrica com bateria fraca pode danificar o motor de arranque ou descarregar totalmente a bateria, exigindo empurrão.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 ~0,8L a cada 1.500-2.000 km — mesmo padrão da Hunter 90',
    body: 'Capacidade de óleo semelhante à Hunter 90 (~0,8L), motor OHC com embreagem em banho de óleo (não use JASO MB). Como o motor 97,2cc trabalha um pouco mais quente que o 86cc por ter mais potência específica, prefira o intervalo mais curto (1.500 km) se usar a moto para entrega/uso intenso, ou 2.000 km em uso urbano leve.',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK C7HSA compartilhada com toda a linha Hunter/Max — compre reserva',
    body: 'Mesma vela da Hunter 90/125 e Max 125: NGK C7HSA, gap 0,6-0,7mm. Como é peça de giro rápido (troca a cada 6.000-8.000 km) e barata (R$ 12-20), vale ter uma reserva na bagageira — evita ficar na mão longe de casa por vela afogada ou gasta.',
  },
  {
    severity: 'OK',
    title: 'Pneus e câmara: aro 18 nas duas rodas — mesma medida da Hunter 90 e 125',
    body: 'Pneu 2.75-18 (dianteiro) / 90/90-18 (traseiro), com câmara de ar. Como a Hunter 100 é mais usada em ambiente urbano/misto que a 90 (menos trilha pura), calibre a pressão de tabela para uso em asfalto na maior parte do tempo, reduzindo alguns PSI só quando for enfrentar terra solta ou barro.',
  },
]

const HUNTER100_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor de partida/relé: primeiro ponto elétrico a falhar em uso com poeira/lama',
    body: 'A adição da partida elétrica trouxe um ponto de falha extra que a Hunter 90 não tem: o motor de arranque e o relé de partida ficam expostos a poeira e umidade em uso trail. Sintoma: clique do relé mas o motor não gira, ou nada acontece ao acionar a partida. Antes de trocar peça, limpe os contatos do relé e os terminais da bateria (oxidação é a causa mais comum). Motor de arranque genérico compatível: busque por medida/pinagem em lojas de peças para motos 100-125cc nacionais.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio rotativo: "falso neutro" incomoda quem troca de moto recentemente',
    body: 'Reclamação comum em fóruns de proprietários: sensação de "engatar errado" ou cair em ponto morto sem querer nas primeiras semanas com câmbio rotativo. Isso normalmente é adaptação, não defeito — mas se a moto cair em neutro sozinha durante a marcha (com pedal solto), pode ser desgaste do mecanismo seletor. Vale inspecionar se o problema persistir após o período de adaptação (~500 km).',
  },
  {
    severity: 'WARN',
    title: 'Peças escassas para modelos anteriores a 2010 — mesma situação da linha Hunter 90',
    body: 'A Hunter 100 também foi afetada pela reestruturação da Sundown em 2010-2011. Peças mecânicas comuns (corrente, filtro, vela, pastilha) seguem fáceis de achar por serem padrão de mercado; peças específicas de plástico/elétrica de unidades mais antigas exigem desmonte ou grupos de proprietários.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de fábrica/revenda inconsistente — mesma orientação da Hunter 90',
    body: 'Assim como a Hunter 90, há relatos de motos entregues com carburador ou válvulas mal regulados. Confira pessoalmente (ou com mecânico de confiança) na primeira revisão: nível de óleo, marcha lenta do carburador e folga de válvulas.',
  },
]

const HUNTER100_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário Hunter 100: acrescenta checagem do sistema elétrico de partida',
    body: '500 km — Troca de óleo inicial. | 1.500-2.000 km — Troca de óleo. Verificar corrente e vela. | 3.000 km — Troca de óleo. Limpar filtro de ar. Testar partida elétrica (bateria e relé). | 6.000 km — Troca da vela NGK C7HSA. Regular folga de válvulas. | 8.000 km — Kit relação se desgastado. Limpar contatos do motor de arranque. | 10.000 km — Trocar filtro de ar (papel). Revisar carburador. | 12.000 km — Rolamentos de roda/direção. Testar tensão da bateria (mín. 12,4V em repouso).',
  },
]

// ─── HUNTER 125 SE ─────────────────────────────────────────────────────────
// Motor: 124,5cc 4T OHV monocilíndrico a ar — CÓPIA DO BLOCO HONDA CG125
// 12,5 cv @ 8.500 rpm | torque 0,92 kgf.m @ 7.000 rpm | Vela NGK C7HSA gap 0,6-0,7mm
// Óleo 20W-50 ~1,0L | Pneu 2.75-18 (F) / 90/90-18 (R) | Tanque ~12L (fontes variam 10-13L)

const HUNTER125SE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor cópia do CG125: a melhor notícia para quem tem Hunter 125 — peças fartas',
    body: 'O bloco 124,5cc OHV da Hunter 125 SE é uma cópia do motor Honda CG125, um dos motores mais produzidos e com mais peças de reposição do Brasil. Isso significa: pistão, anéis, junta do cabeçote, corrente de comando, corrente de transmissão, kit relação, retentores e até algumas peças de embreagem da linha CG125/Fan 125 costumam servir ou ter equivalente direto em qualquer loja de peças para motos. Antes de procurar peça "Sundown" específica (mais cara e rara), pergunte por peça "CG125" na loja — geralmente resolve mais rápido e mais barato.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 mineral ~1,0L — intervalo real de uso costuma ser mais curto que o manual',
    body: 'Capacidade de óleo próxima de 1,0L (motor OHV CG-derivado). Use 20W-50 mineral API SF/SG (embreagem úmida — nunca óleo JASO MB de scooter). O manual costuma indicar troca a cada 2.000-3.000 km, mas motos usadas para entrega/trabalho no Brasil costumam trocar a cada 1.500 km na prática — o custo do óleo mineral é baixo frente ao desgaste evitado.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA gap 0,6-0,7mm — mesma peça de toda a linha Hunter/Max',
    body: 'Vela padrão NGK C7HSA, compartilhada com Hunter 90, Hunter 100 e Max 125 SE/SED. Gap 0,6-0,7mm. Troque a cada 6.000-8.000 km. Sintoma de vela gasta em motor OHV: perda de força em subida, engasgo ao acelerar bruscamente.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas do motor OHV: regule a cada 6.000 km — motor com tucho/vareta é sensível',
    body: 'Diferente do OHC da Hunter 90/100, a Hunter 125 SE tem motor OHV (válvulas no cabeçote, acionadas por varetas e balancins a partir do eixo de comando no bloco). Esse arranjo pede regulagem de folga mais frequente. Valores de referência (baseados no padrão CG125, motor frio): admissão ~0,05mm / escape ~0,08mm. Ruído de "tec-tec" alto no motor é sinal de folga excessiva — não ignore, o desgaste do tucho acelera.',
  },
  {
    severity: 'OK',
    title: 'Corrente de comando (dentro do motor): item que muitos donos esquecem',
    body: 'Além da corrente de transmissão externa, o motor OHV tem uma corrente de comando interna (aciona o eixo de comando de válvulas) — igual à do CG125. Ela tem tensionador automático na maioria das versões, mas se você ouvir um chiado metálico agudo vindo de dentro do motor (mais agudo que ruído de válvula), pode ser corrente de comando frouxa ou esticada. Serviço de mecânico especializado em motor CG — a peça é barata mas a desmontagem exige experiência.',
  },
  {
    severity: 'OK',
    title: 'Tanque ~12L (fontes variam entre 10 e 13L conforme ano) — planeje autonomia com folga',
    body: 'A capacidade exata do tanque varia um pouco entre anos/fontes (10-13L). Para não ficar na mão, considere autonomia prática de ~180-220 km com consumo médio de 30 km/l em uso urbano misto — reabasteça antes de "raspar o tanque" para não puxar sujeira/ferrugem do fundo pelo filtro de combustível.',
  },
  {
    severity: 'OK',
    title: 'Kit relação padrão CG125 — pinhão, coroa e corrente 428 fáceis de achar',
    body: 'Assim como o motor, a relação de transmissão da Hunter 125 SE segue o padrão de corrente 428 usado no CG125 e em dezenas de outras motos 125cc nacionais. Kit relação completo (corrente + pinhão + coroa): R$ 60-120 em qualquer loja de peças para motos populares — não precisa buscar peça "Sundown" específica.',
  },
]

const HUNTER125SE_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Regulagem de fábrica/revenda inconsistente — confira na primeira revisão',
    body: 'Mesmo padrão relatado nas Hunter 90/100: motos entregues com carburador ou válvulas mal ajustados, dependendo do preparo da revenda. Confira nível de óleo, marcha lenta e folga de válvulas na primeira revisão (500-1.000 km).',
  },
  {
    severity: 'WARN',
    title: 'Peças de carenagem/plástico específicas ainda escassas, mesmo com motor CG125-compatível',
    body: 'A boa notícia da compatibilidade CG125 vale para o motor. Peças de plástico (carenagem lateral, painel, protetor de corrente) continuam sendo item exclusivo Sundown, e ficaram mais raras após a reestruturação da marca em 2010-2011. Desmontes e grupos de proprietários (Facebook, Mercado Livre) são a fonte mais confiável para essas peças.',
  },
  {
    severity: 'WARN',
    title: 'Uso em trilha desgasta corrente/coroa mais rápido que em uso 100% asfalto',
    body: 'Por ser uma trail, a Hunter 125 SE frequentemente roda em terra/pedra, o que acelera o desgaste do kit relação em comparação com uma moto urbana da mesma cilindrada. Se notar "salto" da corrente na coroa ao acelerar (sinal de desgaste avançado), troque o kit completo — não só a corrente, senão a coroa gasta acelera o desgaste da corrente nova.',
  },
  {
    severity: 'WARN',
    title: 'Conectores elétricos oxidam em uso com lama/água — lanterna e pisca são os primeiros a falhar',
    body: 'Sintomas comuns: lanterna traseira intermitente, pisca-pisca falhando. Limpe os conectores acessíveis com spray de contato elétrico e aplique graxa dielétrica, especialmente após rodar em trilha molhada.',
  },
  {
    severity: 'WARN',
    title: 'Bateria pequena da partida elétrica exige atenção em uso pouco frequente',
    body: 'Se a moto ficar parada por 2-3 semanas sem uso, a bateria pequena (12V 4-5Ah) tende a descarregar abaixo do necessário para a partida elétrica. Tenha sempre o pedal como alternativa e considere um carregador/mantenedor de bateria se a moto ficar parada com frequência.',
  },
]

const HUNTER125SE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário Hunter 125 SE: motor OHV CG125-compatível — siga o padrão CG',
    body: '500-1.000 km — Troca de óleo inicial (rodagem). Reaperto de parafusos do cabeçote. | 1.500-2.000 km — Troca de óleo (20W-50, ~1,0L). Verificar corrente e vela. | 3.000 km — Troca de óleo. Limpar filtro de ar. | 6.000 km — Troca da vela NGK C7HSA. Regular folga de válvulas (adm ~0,05mm / esc ~0,08mm). | 8.000 km — Verificar corrente de comando interna (ruído). Kit relação externo se desgastado. | 10.000 km — Trocar filtro de ar (papel). Revisar carburador. | 12.000 km — Pastilha/lona de freio. Rolamentos de roda e direção. | 15.000 km — Retentores de bengala dianteira — inspeção.',
  },
]

// ─── MAX 125 SE ────────────────────────────────────────────────────────────
// Motor: mesmo bloco 124,5cc OHV CG125-derivado da Hunter 125 (bore/stroke 56,5×49,5mm)
// 12,5 cv @ 8.500 rpm | torque 0,92 kgf.m @ 7.000 rpm | compressão 9,0:1
// Freios: tambor dianteiro e traseiro | Consumo 30-40 km/l | Pneu 2.75-18 (F) / 90/90-18 (R)
// SE = versão com freio a tambor nas duas rodas (SED tem disco dianteiro — ver bloco seguinte)

const MAX125SE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor CG125-derivado da Hunter 125 SE — peças e macetes de óleo/vela valem igual',
    body: 'A Max 125 SE usa o mesmo bloco 124,5cc OHV cópia do CG125 que equipa a Hunter 125 SE (bore/stroke 56,5×49,5mm, compressão 9,0:1). Isso significa que pistão, anéis, corrente de comando, corrente de transmissão e a maioria das peças internas do motor são intercambiáveis entre Max 125 e Hunter 125 — útil se você tem as duas ou está garimpando peça em desmonte.',
  },
  {
    severity: 'OK',
    title: 'Consumo declarado 30-40 km/l — motor comuta/urbano bem econômico quando bem regulado',
    body: 'A Max 125 SE é a versão urbana/comuta do motor Sundown 125, com consumo declarado entre 30 e 40 km/l dependendo do uso. Para chegar perto do topo dessa faixa: mantenha a vela nova, filtro de ar limpo, pneus calibrados e evite acelerões bruscos repetidos — o carburador simples não perdoa uso agressivo em termos de consumo.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 ~1,0L — mesma especificação da Hunter 125 SE',
    body: 'Capacidade e tipo de óleo idênticos à Hunter 125 SE: 20W-50 mineral API SF/SG, ~1,0L, embreagem úmida (nunca JASO MB). Troca a cada 1.500-2.000 km em uso intenso (entrega/trabalho — uso muito comum para este modelo), ou até 3.000 km em uso urbano leve.',
  },
  {
    severity: 'OK',
    title: 'Freios a tambor nas duas rodas: regule o cabo periodicamente — não espere a alavanca "afundar"',
    body: 'A Max 125 SE tem tambor dianteiro e traseiro (a versão SED tem disco na frente — ver seção específica). Freio a tambor perde eficiência gradualmente conforme a lona desgasta e o cabo estica. Regule a folga do cabo (rosca de ajuste no punho ou no braço da roda) assim que sentir a alavanca "afundando" mais que o normal antes de frear — não espere perder eficiência de frenagem para agir.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA e kit relação 428 — mesmos itens padrão da linha Hunter',
    body: 'Vela: NGK C7HSA, gap 0,6-0,7mm. Kit relação: corrente 428 padrão CG125, fácil de achar em qualquer loja de peças. Como a Max é usada com frequência para entrega/trabalho, o desgaste do kit relação tende a ser mais rápido que em uso de lazer — inspecione a folga da corrente a cada 1.000 km se for uso comercial.',
  },
  {
    severity: 'OK',
    title: 'Carenagem plástica: parafusos com borracha de vedação evitam trinca por vibração',
    body: 'Ao remontar carenagens/painéis após manutenção, confira se as borrachas de vedação dos parafusos ainda estão no lugar — sem elas, o plástico vibra direto contra o parafuso e trinca com o tempo. Se perdeu alguma borracha, um anel de borracha genérico de mesma medida resolve.',
  },
]

const MAX125SE_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Uso comercial intenso acelera desgaste de embreagem e corrente',
    body: 'Por ser um modelo muito usado para trabalho/entrega, a Max 125 SE frequentemente roda mais km/mês que uma moto de lazer equivalente. Embreagem (discos) e kit relação desgastam proporcionalmente mais rápido. Se notar a embreagem "patinando" (moto acelera sem ganhar velocidade proporcional) ou dificuldade de engatar marcha, vale inspecionar os discos de embreagem — peça padrão CG125, fácil de achar.',
  },
  {
    severity: 'WARN',
    title: 'Freio a tambor com lona gasta some de eficiência aos poucos — muitos donos notam tarde',
    body: 'Como o desgaste do tambor é gradual e não tem indicador visual óbvio (diferente do disco com pastilha visível), muitos donos só percebem quando a frenagem já está bem comprometida. Regra prática: se a alavanca/pedal precisar de curso muito maior que há alguns meses, já é hora de abrir o tambor e conferir a espessura da lona (mínimo ~2mm).',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de fábrica/revenda inconsistente — mesmo padrão da linha Hunter',
    body: 'Confira pessoalmente óleo, marcha lenta do carburador e folga de válvulas na primeira revisão — problema documentado em toda a linha Sundown de entrada.',
  },
  {
    severity: 'WARN',
    title: 'Peças de plástico/elétrica específicas da Max ainda escassas para modelos mais antigos',
    body: 'Mesma situação da Hunter: peças mecânicas do motor CG125-derivado são fáceis de achar, mas carenagem, painel e chicote elétrico específicos da Max podem exigir desmonte ou grupos de proprietários, principalmente para unidades anteriores a 2010.',
  },
]

const MAX125SE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário Max 125 SE: uso comercial pede intervalos mais curtos na prática',
    body: '500-1.000 km — Troca de óleo inicial. | 1.500 km — Troca de óleo (uso comercial/entrega) ou 2.000-3.000 km (uso leve). | 3.000 km — Limpar filtro de ar. Verificar folga do cabo de freio (F e R). | 6.000 km — Troca da vela NGK C7HSA. Regular folga de válvulas. | 8.000 km — Inspecionar lona de freio (F e R). Kit relação se desgastado. | 10.000 km — Trocar filtro de ar (papel). Revisar discos de embreagem se houver patinação. | 12.000 km — Rolamentos de roda/direção.',
  },
]

// ─── MAX 125 SED ───────────────────────────────────────────────────────────
// Mesmo motor da Max 125 SE (124,5cc OHV CG125-derivado). Diferença principal: freio a disco
// dianteiro de 267mm com pinça de 2 pistões, em vez do tambor da versão SE (traseiro segue tambor).

const MAX125SED_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Freio a disco dianteiro 267mm — diferencial da SED sobre a SE',
    body: 'A principal diferença da Max 125 SED para a SE é o freio a disco dianteiro (267mm, pinça de 2 pistões) no lugar do tambor. O traseiro continua a tambor nas duas versões. O disco dá frenagem mais consistente, especialmente em piso molhado — mas exige manutenção diferente: fluido de freio (não cabo) e pastilhas (não lona).',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio DOT 4 — troca a cada 2 anos, mesmo sem uso intenso',
    body: 'O sistema hidráulico do disco dianteiro usa fluido DOT 4, que absorve umidade do ar com o tempo (higroscópico) mesmo que a moto não seja muito usada. Troque a cada 2 anos independente da quilometragem. Sinal de fluido velho: pedal/manete de freio "esponjoso" ou perda de eficiência em frenagens repetidas.',
  },
  {
    severity: 'OK',
    title: 'Pastilhas de freio dianteiro: inspecione junto com a troca de óleo — motor é o mesmo da SE',
    body: 'Fora o sistema de freio dianteiro, motor, óleo, vela e kit relação são idênticos à Max 125 SE (bloco 124,5cc OHV CG125-derivado, ~1,0L de óleo 20W-50, vela NGK C7HSA, corrente 428). Aproveite a troca de óleo para checar a espessura das pastilhas — abaixo de ~2mm, troque.',
  },
  {
    severity: 'OK',
    title: 'Pinça de 2 pistões: limpe e lubrifique os pinos-guia para evitar desgaste desigual das pastilhas',
    body: 'Pinças de freio com 2 pistões acumulam sujeira nos pinos-guia (deslizantes) com o tempo, especialmente em uso com poeira/lama. Se notar a moto "puxando" para um lado ao frear ou desgaste desigual entre as pastilhas, limpe os pinos-guia e aplique graxa específica para freio (resistente a alta temperatura) — evita que a pinça trave parcialmente.',
  },
  {
    severity: 'OK',
    title: 'Disco de 267mm: meça a espessura mínima antes de assumir que "só precisa de pastilha nova"',
    body: 'Se a frenagem continuar fraca mesmo com pastilha nova, o disco pode estar abaixo da espessura mínima de segurança (varia por fabricante, geralmente marcada em baixo relevo na borda do disco) ou empenado (sensação de pulsação na alavanca ao frear). Disco empenado ou muito fino deve ser trocado, não retificado — em disco fino a retífica pode deixar abaixo do limite de segurança.',
  },
]

const MAX125SED_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Pinça de disco pode "prender" (êmbolo emperrado) em moto que ficou parada ou rodou muito na chuva',
    body: 'Sistemas de freio a disco de motos econômicas como a Max SED sofrem mais com oxidação do êmbolo da pinça quando a moto fica parada por longos períodos ou roda muito na chuva sem manutenção preventiva. Sintoma: disco esquentando mesmo sem frear (arrasto), ou frenagem puxando para um lado. Solução: desmontar a pinça, limpar e lubrificar o êmbolo com graxa específica de freio — se o êmbolo estiver com ferrugem visível, o kit de reparo (êmbolo + retentores) é mais barato que a pinça completa.',
  },
  {
    severity: 'WARN',
    title: 'Uso comercial intenso acelera desgaste de embreagem e corrente — mesmo perfil da SE',
    body: 'Mesma observação da Max 125 SE: por ser modelo muito usado para trabalho, embreagem e kit relação pedem inspeção mais frequente que em moto de lazer.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de fábrica/revenda inconsistente — mesmo padrão da linha Sundown',
    body: 'Confira óleo, marcha lenta e folga de válvulas na primeira revisão.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro a tambor (mesmo problema da SE): desgaste gradual sem indicador visual',
    body: 'O traseiro da SED continua sendo a tambor, com o mesmo risco de desgaste "silencioso" da lona relatado na versão SE. Inspecione a espessura da lona periodicamente, não só quando sentir a frenagem fraca.',
  },
]

const MAX125SED_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário Max 125 SED: soma a rotina de disco dianteiro ao calendário padrão da linha',
    body: '500-1.000 km — Troca de óleo inicial. | 1.500 km — Troca de óleo (uso comercial) ou 2.000-3.000 km (uso leve). | 3.000 km — Limpar filtro de ar. Inspecionar pastilhas dianteiras e lona traseira. | 6.000 km — Troca da vela NGK C7HSA. Regular folga de válvulas. | 8.000 km — Kit relação se desgastado. Limpar pinos-guia da pinça de freio. | 10.000 km — Trocar filtro de ar (papel). | 12.000 km — Rolamentos de roda/direção. | 24 meses — Troca do fluido de freio DOT 4, independente da km rodada.',
  },
]

// ─── VBLADE 250cc ──────────────────────────────────────────────────────────
// Motor: 249cc 4T SOHC V-twin (2 cilindros em V) refrigerado a ar — raro V-twin nacional pequeno
// Bore/stroke 49×66mm por cilindro | 1 carburador único alimentando os 2 cilindros | Partida elétrica
// ~19,5-22 cv @ 8.000 rpm (varia por ano/fonte) | torque ~1,58 kgf.m @ 6.000 rpm (estimado)
// 5 marchas | Pneu 3.00-18 (F) / 130/90-15 (R) | Tanque 14L | Peso seco ~163kg | "Minicustom" nacional

const VBLADE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'V-twin 249cc raro no Brasil: bore/stroke 49×66mm por cilindro, SOHC, 1 carburador só',
    body: 'A VBlade é uma das poucas motos V-twin pequenas fabricadas no Brasil — 249cc divididos em 2 cilindros de ~124,5cc cada (bore/stroke 49×66mm), SOHC, refrigeração a ar. Diferente de V-twins maiores (como o Kasinski Comet 250, que usa 2 carburadores), a VBlade usa 1 carburador único alimentando os dois cilindros por um coletor em Y — projeto mais simples e barato, mas que exige atenção ao balanceamento do coletor (ver PROBLEMAS).',
  },
  {
    severity: 'OK',
    title: 'Duas velas — troque sempre em par, mesmo padrão gap 0,6-0,7mm',
    body: 'Por ser V-twin, a VBlade tem duas velas de ignição (uma por cilindro). Use NGK C7HSA (ou equivalente de mesma rosca/alcance térmico) nas duas, gap 0,6-0,7mm. Troque sempre em par — uma vela nova e outra gasta causa combustão desigual entre os cilindros e vibração perceptível no guidão.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — motor com embreagem úmida, capacidade estimada ~1,2-1,4L',
    body: 'Não há capacidade oficial amplamente divulgada para o motor V-twin da VBlade — pela cilindrada (249cc, próxima à Comet 250 que usa 2,0L) e por ser motor mais compacto de 2 cilindros pequenos, uma estimativa razoável é 1,2-1,4L. Confirme sempre pela vareta/visor com a moto na vertical antes de fechar. Use 20W-50 JASO MA — a embreagem é úmida.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão — provavelmente 520 dado o porte da moto (163kg, ~20cv)',
    body: 'A VBlade tem porte e potência intermediários entre uma trail 125cc e um V-twin maior — dado o peso seco de ~163kg e ~20cv, uma corrente 520 (mais robusta que a 428 das motos menores da Sundown) é a estimativa mais provável para a relação de transmissão original. Confirme a bitola gravada nos elos da corrente original antes de comprar kit de reposição.',
  },
  {
    severity: 'OK',
    title: 'Pneus 3.00-18 (F) / 130/90-15 (R) — combinação incomum, atenção na hora de repor',
    body: 'A medida traseira 130/90-15 é menos comum que aro 17/18 típico de outras motos de mesma cilindrada — confirme disponibilidade antes de precisar trocar com urgência. Marcas que costumam ter essa medida em linha: Pirelli, Rinaldi, Levorin — vale ligar antes para a loja confirmar estoque.',
  },
  {
    severity: 'OK',
    title: 'Peso seco ~163kg e tanque 14L: bike "minicustom" pede pilotagem mais suave em curva',
    body: 'Com centro de gravidade baixo (estilo custom) e ~163kg, a VBlade tem comportamento estável em reta mas exige mais atenção em curvas fechadas por causa da geometria (guidão alto, ângulo de cáster mais deitado, típico de customs). Isso não é defeito — é característica do estilo. Ajuste a pressão dos pneus (ver TirePressure) antes de julgar a moto "dura" ou "boiando" em curva.',
  },
]

const VBLADE_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Coletor de admissão em Y (1 carburador para 2 cilindros): vazamento causa marcha lenta irregular',
    body: 'Como um único carburador alimenta os dois cilindros através de um coletor em Y, uma junta ressecada ou rachada nesse coletor causa entrada de ar não filtrado/não medido, gerando marcha lenta instável e "sacolejo" entre os cilindros (sensação de motor "capengando"). Teste simples: borrifar um pouco de spray de limpeza de contato ou querosene nas juntas do coletor com o motor em marcha lenta — se a rotação mudar bruscamente, há vazamento naquele ponto. Reposição da junta: peça genérica de coletor de admissão, sob medida ou cortada de manta de vedação.',
  },
  {
    severity: 'DANGER',
    title: 'Peças específicas do motor V-twin são raras — VBlade é modelo de baixo volume de vendas',
    body: 'A VBlade teve produção e vendas bem menores que a linha Hunter/Max da Sundown, o que torna peças internas do motor (pistão, biela, junta do cabeçote específica do V-twin) significativamente mais raras — normalmente só em desmontes ou sob encomenda/importação. Diferente da Hunter 125 (compatível com CG125), não há um "motor doador" amplamente disponível confirmado para a VBlade. Antes de assumir que uma peça precisa ser importada, procure em oficinas especializadas em motos V-twin nacionais raras e em grupos de proprietários — pode haver equivalência com componentes chineses genéricos de motor V-twin pequeno (verificar caso a caso, não é garantido).',
  },
  {
    severity: 'WARN',
    title: 'Retificador/regulador: ponto elétrico crítico em V-twins pequenos nacionais desta geração',
    body: 'Como em outras motos V-twin nacionais da mesma época (ex: Kasinski Comet), o retificador/regulador tende a ser um dos componentes elétricos mais sensíveis, especialmente em uso com calor. Sintoma: bateria não carrega (abaixo de 13V com moto em marcha a 4.000 rpm), farol "piscando" com a rotação. Meça a tensão da bateria periodicamente — normal é 13,5-14,5V a 4.000 rpm.',
  },
  {
    severity: 'WARN',
    title: 'Cilindro traseiro do V-twin recebe menos fluxo de ar — monitore temperatura em trânsito parado',
    body: 'Como em qualquer V-twin refrigerado a ar, o cilindro traseiro fica parcialmente "escondido" do fluxo de ar pelo dianteiro, recebendo menos resfriamento direto. Em trânsito parado por muito tempo, isso pode gerar aquecimento mais acentuado nesse cilindro. Evite prolongar parado com o motor ligado sem necessidade; se possível, desligue em engarrafamentos muito longos.',
  },
]

const VBLADE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário VBlade 250cc: V-twin exige atenção redobrada ao coletor e à parte elétrica',
    body: '500-1.000 km — Troca de óleo inicial (rodagem, 20W-50 JASO MA). | 1.500-2.000 km — Troca de óleo. Verificar as duas velas. | 3.000 km — Troca de óleo. Limpar filtro de ar. Inspecionar juntas do coletor de admissão (vazamento). | 6.000 km — Troca das duas velas NGK C7HSA (sempre em par). Lubrificar corrente. | 8.000 km — Regular folga de válvulas (motor frio, estimar padrão SOHC similar a motores nacionais de porte semelhante). Medir tensão do retificador (13,5-14,5V a 4.000 rpm). | 10.000 km — Trocar filtro de ar (papel). Fluido de freio (se disco). | 15.000 km — Kit relação. Inspecionar retentores de bengala dianteira. | 20.000 km — Retorque dos parafusos do cabeçote (prática preventiva recomendada para motores V-twin a ar).',
  },
]

// ─── BLOCOS ────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'HUNTER 90',
    yearFrom: 1999,
    yearTo: 2007,
    MACETES: HUNTER90_MACETES,
    PROBLEMAS: HUNTER90_PROBLEMAS,
    MANUTENCAO: HUNTER90_MANUTENCAO,
  },
  {
    modelName: 'HUNTER 100 95cc',
    yearFrom: 2008,
    yearTo: 2012,
    MACETES: HUNTER100_MACETES,
    PROBLEMAS: HUNTER100_PROBLEMAS,
    MANUTENCAO: HUNTER100_MANUTENCAO,
  },
  {
    modelName: 'HUNTER 125 SE',
    yearFrom: 2007,
    yearTo: 2012,
    MACETES: HUNTER125SE_MACETES,
    PROBLEMAS: HUNTER125SE_PROBLEMAS,
    MANUTENCAO: HUNTER125SE_MANUTENCAO,
  },
  {
    modelName: 'MAX 125 SE',
    yearFrom: 2005,
    yearTo: 2012,
    MACETES: MAX125SE_MACETES,
    PROBLEMAS: MAX125SE_PROBLEMAS,
    MANUTENCAO: MAX125SE_MANUTENCAO,
  },
  {
    modelName: 'MAX 125 SED',
    yearFrom: 2005,
    yearTo: 2012,
    MACETES: MAX125SED_MACETES,
    PROBLEMAS: MAX125SED_PROBLEMAS,
    MANUTENCAO: MAX125SED_MANUTENCAO,
  },
  {
    modelName: 'VBLADE 250cc',
    yearFrom: 2006,
    yearTo: 2009,
    MACETES: VBLADE_MACETES,
    PROBLEMAS: VBLADE_PROBLEMAS,
    MANUTENCAO: VBLADE_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ───────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'HUNTER 90',
    yearFrom: 1999, yearTo: 2007,
    tireSize: '2.75-18 (F) · 90/90-18 (R)',
    frontPsi: 22, rearPsi: 26,
    frontPsiLoad: 22, rearPsiLoad: 30,
    notes: 'Solo: F 22 / R 26 PSI. Com carona: F 22 / R 30 PSI. Reduza alguns PSI para trilha/terra solta (melhora tração) e volte à pressão de tabela em asfalto.',
  },
  {
    modelName: 'HUNTER 100 95cc',
    yearFrom: 2008, yearTo: 2012,
    tireSize: '2.75-18 (F) · 90/90-18 (R)',
    frontPsi: 24, rearPsi: 28,
    frontPsiLoad: 24, rearPsiLoad: 32,
    notes: 'Solo: F 24 / R 28 PSI. Com carona: F 24 / R 32 PSI. Levemente acima da Hunter 90 pelo peso extra da partida elétrica/bateria.',
  },
  {
    modelName: 'HUNTER 125 SE',
    yearFrom: 2007, yearTo: 2012,
    tireSize: '2.75-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 26, rearPsiLoad: 34,
    notes: 'Solo: F 26 / R 30 PSI. Com carona: F 26 / R 34 PSI. Verifique semanalmente — pneu com câmara perde pressão mais rápido que sem câmara.',
  },
  {
    modelName: 'MAX 125 SE',
    yearFrom: 2005, yearTo: 2012,
    tireSize: '2.75-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 26, rearPsiLoad: 34,
    notes: 'Solo: F 26 / R 30 PSI. Com carona: F 26 / R 34 PSI. Uso comercial/entrega: confira semanalmente, carga extra na traseira exige atenção redobrada.',
  },
  {
    modelName: 'MAX 125 SED',
    yearFrom: 2005, yearTo: 2012,
    tireSize: '2.75-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 26, rearPsiLoad: 34,
    notes: 'Solo: F 26 / R 30 PSI. Com carona: F 26 / R 34 PSI. Mesma calibragem da SE — a diferença entre as versões é só no sistema de freio.',
  },
  {
    modelName: 'VBLADE 250cc',
    yearFrom: 2006, yearTo: 2009,
    tireSize: '3.00-18 (F) · 130/90-15 (R)',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo: F 28 / R 32 PSI. Com carona: F 28 / R 36 PSI. Estimativa baseada no peso seco de ~163kg e perfil "minicustom" — confirme com o manual do proprietário se disponível.',
  },
]

// ─── ITENS DE MANUTENÇÃO ─────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // HUNTER 90
  { modelName: 'HUNTER 90', yearFrom: 1999, yearTo: 2007, component: 'Óleo 20W-50 mineral (~0,8L)', intervalKm: 1500, intervalMonths: 4, notes: 'Embreagem em banho de óleo — nunca JASO MB.', priority: 'HIGH', order: 1 },
  { modelName: 'HUNTER 90', yearFrom: 1999, yearTo: 2007, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 7000, intervalMonths: null, notes: 'Compartilhada com toda a linha Hunter/Max — vale ter reserva.', priority: 'MEDIUM', order: 2 },
  { modelName: 'HUNTER 90', yearFrom: 1999, yearTo: 2007, component: 'Lubrificação da corrente 428', intervalKm: 450, intervalMonths: null, notes: 'Mais frequente após trilha/lama — limpar com querosene antes de lubrificar.', priority: 'HIGH', order: 3 },
  { modelName: 'HUNTER 90', yearFrom: 1999, yearTo: 2007, component: 'Filtro de ar — limpeza (espuma)', intervalKm: 3000, intervalMonths: 6, notes: 'Lavar com querosene, secar, umedecer levemente com óleo.', priority: 'MEDIUM', order: 4 },
  { modelName: 'HUNTER 90', yearFrom: 1999, yearTo: 2007, component: 'Folga de válvulas', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio. Motor OHC menor da linha.', priority: 'HIGH', order: 5 },
  { modelName: 'HUNTER 90', yearFrom: 1999, yearTo: 2007, component: 'Kit relação 428 (corrente + pinhão + coroa)', intervalKm: 8000, intervalMonths: null, notes: 'Relação voltada para torque (trilha) desgasta mais rápido.', priority: 'HIGH', order: 6 },
  { modelName: 'HUNTER 90', yearFrom: 1999, yearTo: 2007, component: 'Parafuso do basculante — reaperto', intervalKm: 500, intervalMonths: null, notes: 'Torque 35-45 Nm com trava química. Problema recorrente em uso trilha.', priority: 'HIGH', order: 7 },
  { modelName: 'HUNTER 90', yearFrom: 1999, yearTo: 2007, component: 'Limpeza do carburador (jato principal)', intervalKm: null, intervalMonths: 6, notes: 'Etanol degradado entope o jato em motos paradas por semanas.', priority: 'MEDIUM', order: 8 },
  { modelName: 'HUNTER 90', yearFrom: 1999, yearTo: 2007, component: 'Rolamentos de roda e direção — inspeção', intervalKm: 12000, intervalMonths: 12, notes: 'Uso trail acelera desgaste por impacto em buracos/pedras.', priority: 'MEDIUM', order: 9 },

  // HUNTER 100 95cc
  { modelName: 'HUNTER 100 95cc', yearFrom: 2008, yearTo: 2012, component: 'Óleo 20W-50 mineral (~0,8L)', intervalKm: 1800, intervalMonths: 4, notes: 'Motor 97,2cc OHC — embreagem em banho de óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'HUNTER 100 95cc', yearFrom: 2008, yearTo: 2012, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 7000, intervalMonths: null, notes: 'Mesma peça da Hunter 90/125 e Max.', priority: 'MEDIUM', order: 2 },
  { modelName: 'HUNTER 100 95cc', yearFrom: 2008, yearTo: 2012, component: 'Lubrificação da corrente 428', intervalKm: 500, intervalMonths: null, notes: 'Limpar com querosene após trilha antes de lubrificar.', priority: 'HIGH', order: 3 },
  { modelName: 'HUNTER 100 95cc', yearFrom: 2008, yearTo: 2012, component: 'Teste da partida elétrica (bateria + relé)', intervalKm: 3000, intervalMonths: 6, notes: 'Limpar contatos oxidados antes de trocar peça.', priority: 'MEDIUM', order: 4 },
  { modelName: 'HUNTER 100 95cc', yearFrom: 2008, yearTo: 2012, component: 'Filtro de ar — limpeza (espuma)', intervalKm: 3000, intervalMonths: 6, notes: 'Lavar, secar, umedecer levemente com óleo.', priority: 'MEDIUM', order: 5 },
  { modelName: 'HUNTER 100 95cc', yearFrom: 2008, yearTo: 2012, component: 'Folga de válvulas', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio.', priority: 'HIGH', order: 6 },
  { modelName: 'HUNTER 100 95cc', yearFrom: 2008, yearTo: 2012, component: 'Kit relação 428', intervalKm: 8000, intervalMonths: null, notes: 'Trocar corrente + pinhão + coroa juntos.', priority: 'HIGH', order: 7 },
  { modelName: 'HUNTER 100 95cc', yearFrom: 2008, yearTo: 2012, component: 'Tensão da bateria (mín. 12,4V em repouso)', intervalKm: null, intervalMonths: 6, notes: 'Bateria pequena 12V 4-5Ah — some rápido se moto ficar parada.', priority: 'MEDIUM', order: 8 },
  { modelName: 'HUNTER 100 95cc', yearFrom: 2008, yearTo: 2012, component: 'Rolamentos de roda e direção — inspeção', intervalKm: 12000, intervalMonths: 12, notes: 'Uso trail/urbano misto.', priority: 'MEDIUM', order: 9 },

  // HUNTER 125 SE
  { modelName: 'HUNTER 125 SE', yearFrom: 2007, yearTo: 2012, component: 'Óleo 20W-50 mineral (~1,0L)', intervalKm: 1800, intervalMonths: 4, notes: 'Motor OHV cópia CG125 — embreagem em banho de óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'HUNTER 125 SE', yearFrom: 2007, yearTo: 2012, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 7000, intervalMonths: null, notes: 'Mesma peça de toda a linha Hunter/Max.', priority: 'MEDIUM', order: 2 },
  { modelName: 'HUNTER 125 SE', yearFrom: 2007, yearTo: 2012, component: 'Folga de válvulas (adm ~0,05mm / esc ~0,08mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor OHV com vareta/balancim — mais sensível que OHC.', priority: 'HIGH', order: 3 },
  { modelName: 'HUNTER 125 SE', yearFrom: 2007, yearTo: 2012, component: 'Corrente de comando interna — inspeção de ruído', intervalKm: 10000, intervalMonths: 12, notes: 'Chiado agudo pode indicar corrente frouxa. Padrão CG125.', priority: 'MEDIUM', order: 4 },
  { modelName: 'HUNTER 125 SE', yearFrom: 2007, yearTo: 2012, component: 'Lubrificação da corrente de transmissão 428', intervalKm: 500, intervalMonths: null, notes: 'Uso trail desgasta kit relação mais rápido.', priority: 'HIGH', order: 5 },
  { modelName: 'HUNTER 125 SE', yearFrom: 2007, yearTo: 2012, component: 'Kit relação 428 (padrão CG125)', intervalKm: 10000, intervalMonths: null, notes: 'Peça fácil de achar por compatibilidade CG125.', priority: 'HIGH', order: 6 },
  { modelName: 'HUNTER 125 SE', yearFrom: 2007, yearTo: 2012, component: 'Filtro de ar — troca (papel)', intervalKm: 10000, intervalMonths: 12, notes: 'Não lavar, apenas trocar.', priority: 'MEDIUM', order: 7 },
  { modelName: 'HUNTER 125 SE', yearFrom: 2007, yearTo: 2012, component: 'Pastilha/lona de freio — inspeção', intervalKm: 12000, intervalMonths: 12, notes: 'Espessura mínima ~2mm.', priority: 'MEDIUM', order: 8 },
  { modelName: 'HUNTER 125 SE', yearFrom: 2007, yearTo: 2012, component: 'Retentores de bengala dianteira — inspeção', intervalKm: 15000, intervalMonths: null, notes: 'Óleo escuro no tubo interno é sinal de vazamento.', priority: 'MEDIUM', order: 9 },

  // MAX 125 SE
  { modelName: 'MAX 125 SE', yearFrom: 2005, yearTo: 2012, component: 'Óleo 20W-50 mineral (~1,0L)', intervalKm: 1500, intervalMonths: 4, notes: 'Uso comercial/entrega é comum neste modelo — intervalo curto.', priority: 'HIGH', order: 1 },
  { modelName: 'MAX 125 SE', yearFrom: 2005, yearTo: 2012, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 7000, intervalMonths: null, notes: 'Mesma peça da Hunter 125.', priority: 'MEDIUM', order: 2 },
  { modelName: 'MAX 125 SE', yearFrom: 2005, yearTo: 2012, component: 'Folga do cabo de freio (dianteiro e traseiro)', intervalKm: 2000, intervalMonths: null, notes: 'Freio a tambor nas duas rodas — regular antes da alavanca "afundar".', priority: 'HIGH', order: 3 },
  { modelName: 'MAX 125 SE', yearFrom: 2005, yearTo: 2012, component: 'Lona de freio — inspeção de espessura', intervalKm: 8000, intervalMonths: 12, notes: 'Desgaste gradual sem indicador visual — inspecione proativamente.', priority: 'MEDIUM', order: 4 },
  { modelName: 'MAX 125 SE', yearFrom: 2005, yearTo: 2012, component: 'Folga de válvulas', intervalKm: 6000, intervalMonths: 12, notes: 'Motor OHV CG125-derivado.', priority: 'HIGH', order: 5 },
  { modelName: 'MAX 125 SE', yearFrom: 2005, yearTo: 2012, component: 'Kit relação 428', intervalKm: 8000, intervalMonths: null, notes: 'Uso comercial: inspecionar folga a cada 1.000 km.', priority: 'HIGH', order: 6 },
  { modelName: 'MAX 125 SE', yearFrom: 2005, yearTo: 2012, component: 'Discos de embreagem — inspeção (patinação)', intervalKm: 15000, intervalMonths: null, notes: 'Peça padrão CG125, fácil de achar.', priority: 'MEDIUM', order: 7 },
  { modelName: 'MAX 125 SE', yearFrom: 2005, yearTo: 2012, component: 'Filtro de ar — troca (papel)', intervalKm: 10000, intervalMonths: 12, notes: 'Não lavar, apenas trocar.', priority: 'MEDIUM', order: 8 },
  { modelName: 'MAX 125 SE', yearFrom: 2005, yearTo: 2012, component: 'Rolamentos de roda e direção — inspeção', intervalKm: 12000, intervalMonths: 12, notes: 'Uso urbano/comercial intenso.', priority: 'MEDIUM', order: 9 },

  // MAX 125 SED
  { modelName: 'MAX 125 SED', yearFrom: 2005, yearTo: 2012, component: 'Óleo 20W-50 mineral (~1,0L)', intervalKm: 1500, intervalMonths: 4, notes: 'Mesmo motor da SE.', priority: 'HIGH', order: 1 },
  { modelName: 'MAX 125 SED', yearFrom: 2005, yearTo: 2012, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 7000, intervalMonths: null, notes: 'Mesma peça de toda a linha.', priority: 'MEDIUM', order: 2 },
  { modelName: 'MAX 125 SED', yearFrom: 2005, yearTo: 2012, component: 'Pastilhas de freio dianteiro (disco 267mm)', intervalKm: 8000, intervalMonths: null, notes: 'Espessura mínima ~2mm.', priority: 'HIGH', order: 3 },
  { modelName: 'MAX 125 SED', yearFrom: 2005, yearTo: 2012, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Trocar por tempo, não só por km — é higroscópico.', priority: 'HIGH', order: 4 },
  { modelName: 'MAX 125 SED', yearFrom: 2005, yearTo: 2012, component: 'Limpeza dos pinos-guia da pinça de freio', intervalKm: 8000, intervalMonths: 12, notes: 'Evita êmbolo emperrado e desgaste desigual de pastilha.', priority: 'MEDIUM', order: 5 },
  { modelName: 'MAX 125 SED', yearFrom: 2005, yearTo: 2012, component: 'Lona de freio traseiro — inspeção', intervalKm: 8000, intervalMonths: 12, notes: 'Traseiro continua a tambor na versão SED.', priority: 'MEDIUM', order: 6 },
  { modelName: 'MAX 125 SED', yearFrom: 2005, yearTo: 2012, component: 'Folga de válvulas', intervalKm: 6000, intervalMonths: 12, notes: 'Motor OHV CG125-derivado.', priority: 'HIGH', order: 7 },
  { modelName: 'MAX 125 SED', yearFrom: 2005, yearTo: 2012, component: 'Kit relação 428', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar folga com mais frequência em uso comercial.', priority: 'HIGH', order: 8 },
  { modelName: 'MAX 125 SED', yearFrom: 2005, yearTo: 2012, component: 'Filtro de ar — troca (papel)', intervalKm: 10000, intervalMonths: 12, notes: 'Não lavar, apenas trocar.', priority: 'MEDIUM', order: 9 },

  // VBLADE 250cc
  { modelName: 'VBLADE 250cc', yearFrom: 2006, yearTo: 2009, component: 'Óleo 20W-50 JASO MA (~1,2-1,4L, estimado)', intervalKm: 1800, intervalMonths: 4, notes: 'Motor V-twin com embreagem úmida. Capacidade não confirmada oficialmente — confira pela vareta/visor.', priority: 'HIGH', order: 1 },
  { modelName: 'VBLADE 250cc', yearFrom: 2006, yearTo: 2009, component: 'Velas NGK C7HSA ×2 (gap 0,6-0,7mm)', intervalKm: 7000, intervalMonths: null, notes: 'Sempre trocar em par — evita combustão desigual entre cilindros.', priority: 'HIGH', order: 2 },
  { modelName: 'VBLADE 250cc', yearFrom: 2006, yearTo: 2009, component: 'Inspeção das juntas do coletor de admissão (Y)', intervalKm: 3000, intervalMonths: 6, notes: 'Vazamento causa marcha lenta irregular entre os cilindros.', priority: 'HIGH', order: 3 },
  { modelName: 'VBLADE 250cc', yearFrom: 2006, yearTo: 2009, component: 'Lubrificação da corrente (520, estimado)', intervalKm: 500, intervalMonths: null, notes: 'Bitola estimada pelo porte da moto — confirme nos elos originais.', priority: 'HIGH', order: 4 },
  { modelName: 'VBLADE 250cc', yearFrom: 2006, yearTo: 2009, component: 'Folga de válvulas', intervalKm: 8000, intervalMonths: 12, notes: 'Motor SOHC. Intervalo estimado por semelhança com motores nacionais de porte próximo.', priority: 'HIGH', order: 5 },
  { modelName: 'VBLADE 250cc', yearFrom: 2006, yearTo: 2009, component: 'Verificação do retificador/regulador (13,5-14,5V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto elétrico sensível em V-twins nacionais desta geração.', priority: 'CRITICAL', order: 6 },
  { modelName: 'VBLADE 250cc', yearFrom: 2006, yearTo: 2009, component: 'Filtro de ar — troca', intervalKm: 10000, intervalMonths: 12, notes: 'Confirmar tipo (espuma ou papel) no filtro original.', priority: 'MEDIUM', order: 7 },
  { modelName: 'VBLADE 250cc', yearFrom: 2006, yearTo: 2009, component: 'Kit relação — inspeção', intervalKm: 15000, intervalMonths: null, notes: 'Trocar completo quando desgastado.', priority: 'HIGH', order: 8 },
  { modelName: 'VBLADE 250cc', yearFrom: 2006, yearTo: 2009, component: 'Retorque dos parafusos do cabeçote', intervalKm: 20000, intervalMonths: null, notes: 'Prática preventiva recomendada para motores V-twin a ar de fabricação nacional.', priority: 'MEDIUM', order: 9 },
]

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Sundown Hunter/Max/VBlade...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'SUNDOWN', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'SUNDOWN', vehicleTypeId: motoType.id },
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

  console.log('✅ Sundown Hunter/Max/VBlade concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
