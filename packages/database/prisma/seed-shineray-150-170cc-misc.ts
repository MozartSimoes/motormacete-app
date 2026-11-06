/**
 * Seed Shineray 150–175cc (linha urbana/utilitária) — macetes, problemas e manutenção
 * Modelos: SUN 150, WORKER 150, JEF 170, SHI 170, SHI 175, SHI 175 S EFI,
 *          FREE 150 EFI, URBAN 150 EFI, URBAN LITE 150
 *
 * Fontes: shineray.com.br (fichas técnicas e manuais de proprietário oficiais),
 *         cimbaju.com.br, motociclismoonline.com.br, motoo.com.br, magodoscarros.com,
 *         mobiauto.com.br, motoragora.com.br, tudodemotos.com.br, arevista.com.br,
 *         reclameaqui.com.br (padrão de reclamações da marca), turismo2rodas.com,
 *         experiência de mecânicos com motores chineses OHC/SOHC ar-refrigerados
 *         desta faixa de cilindrada (base de motor amplamente compartilhada entre
 *         marcas — Shineray, Sundown, Kasinski Comet 150 etc.)
 *
 * ─── SOBRE O MECANISMO DE CASAMENTO DE NOME (REGEX \b SUBSTRING) ──────────────
 * O site casa o `modelName` armazenado contra o nome FIPE exato do veículo via
 * `new RegExp('\\b' + storedName + '\\b', 'i').test(fipeName)` — ou seja, o
 * modelName precisa aparecer como substring contígua com bordas de palavra
 * dentro do nome FIPE, e TODOS os modelName que derem match são UNIDOS (union)
 * no resultado exibido para aquele veículo.
 *
 * Neste conjunto de 9 modelos:
 *   - 'SHI 175' É SUBSTRING de 'SHI 175 S EFI' (a string "SHI 175" aparece
 *     literalmente seguida de espaço dentro de "SHI 175 S EFI", então a borda
 *     de palavra bate). Por isso:
 *       • o bloco 'SHI 175' recebe o conteúdo COMPARTILHADO do motor base
 *         173,6cc (óleo, vela, corrente, pneus, problemas mecânicos gerais,
 *         cronograma de revisão do motor) — esse conteúdo será exibido tanto
 *         para quem tem uma SHI 175 carburada quanto para quem tem a S EFI;
 *       • o bloco 'SHI 175 S EFI' recebe SOMENTE conteúdo específico da
 *         injeção eletrônica (bico injetor, TPS, bomba de combustível, ECU,
 *         chicote da injeção) — para não duplicar o que já vem por union do
 *         bloco 'SHI 175'. Por isso também NÃO criamos TirePressure nem
 *         MaintenanceItem de pneu/óleo/corrente duplicados para 'SHI 175 S EFI'
 *         — eles já chegam via union do bloco 'SHI 175' (mesmo chassi/rodas).
 *   - Os demais 7 modelos ('SUN 150', 'WORKER 150', 'JEF 170', 'SHI 170',
 *     'FREE 150 EFI', 'URBAN 150 EFI', 'URBAN LITE 150') foram checados um a
 *     um e NÃO têm overlap de substring entre si nem com os dois acima:
 *       • 'URBAN 150 EFI' vs 'URBAN LITE 150' — depois de "URBAN " o texto
 *         diverge imediatamente ("150 EFI" vs "LITE 150"), então nenhum é
 *         substring do outro.
 *       • 'SHI 170' vs 'SHI 175' / 'SHI 175 S EFI' — "170" vs "175" divergem
 *         logo após "SHI ", sem overlap.
 *       • 'JEF 170' não colide com 'SHI 170' (prefixos diferentes).
 *       • 'SUN 150', 'WORKER 150', 'FREE 150 EFI' não aparecem como substring
 *         de nenhum outro nome do conjunto (prefixos únicos: SUN/WORKER/FREE).
 *     Cada um desses 7 modelos recebe conteúdo full e independente.
 *
 * Execute: pnpm --filter @motormacete/database db:seed:shineray-150-170cc-misc
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

// ─── SUN 150 ───────────────────────────────────────────────────────────────
// Motor: 149,5cc SOHC 2 válvulas ar-refrigerado | 57,5×58,0mm | 10,2:1
// 9,8 cv @ 7.500 rpm | 10,5 Nm @ 7.000 rpm | Carburador | Ignição CDI
// Câmbio de 4 marchas com embreagem centrífuga automática (sem alavanca de
// embreagem no guidão — típico de underbones chineses desta faixa de preço)

const SUN150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — 1,0L; a cada 3.000 km no uso urbano intenso',
    body: 'O motor 149,5cc da SUN 150 compartilha óleo com a embreagem centrífuga (JASO MA obrigatório — nunca use óleo de carro puro API SM sem selo JASO). Capacidade: ~1,0L. Use 20W-50 mineral ou semissintético (Lubrax Moto 4T, Shell Advance 4T). Troca a cada 3.000 km ou 6 meses — no trânsito parado com moto de 4 marchas e embreagem automática, o motor esquenta mais do que rodando solto, o que degrada o óleo mais rápido.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA gap 0,6–0,7mm — troca a cada 8.000–10.000 km',
    body: 'Vela padrão para este motor OHC de baixa cilindrada: NGK C7HSA (equivalente Denso U22FSU). Gap 0,6–0,7mm — meça sempre com calibrador de palheta. Custo: R$ 15–25. Sintomas de vela gasta: partida a frio demorada, engasgo leve em aceleração, consumo subindo ~10%. Vela de iridium (NGK CR7HIX, se compatível com o cachimbo) dura o dobro por cerca de R$ 50–60.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: etanol brasileiro empasta o jato principal em pouco tempo parado',
    body: 'O carburador da SUN 150 é sensível ao etanol — se a moto fica parada mais de 3–4 semanas com tanque cheio, o combustível degrada e forma verniz nos jatos. Sintoma: marcha lenta instável, afogamento, corte em aceleração. Limpeza preventiva: spray de limpeza de carburador (Bardahl, WD-40 Especialista) a cada 6 meses, mesmo sem sintoma. Se for guardar a moto por mais de 1 mês, esvazie o carburador pelo parafuso dreno da cuba.',
  },
  {
    severity: 'OK',
    title: 'Embreagem centrífuga automática: sem alavanca, mas exige regulagem de folga do pedal de câmbio',
    body: 'A SUN 150 troca marchas sem alavanca de embreagem — o sistema centrífugo desacopla sozinho abaixo de certa rotação. Isso simplifica o uso, mas exige atenção à regulagem do pedal de câmbio (folga correta evita engates falsos/pulados). Se sentir "trancos" ao trocar de marcha em baixa rotação, o problema normalmente é ajuste da embreagem centrífuga (parafuso de regulagem no cárter direito) — não é defeito grave, é ajuste de rotina a cada revisão.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — lubrifique a cada 500 km; kit relação dura mais que o dobro',
    body: 'Lubrificação regular (spray de corrente ou óleo 80W-90 aplicado no trecho inferior) estende a vida da corrente de ~12.000 km para 20.000+ km. Folga correta: 20–30mm no ponto central da parte inferior. Kit relação completo (corrente + pinhão + coroa) para motor 150cc chinês: R$ 90–180 em lojas de peças para motos populares — sempre troque os três juntos.',
  },
  {
    severity: 'WARN',
    title: 'Peças de motor: compatibilidade com a família de motores 150cc chineses genéricos',
    body: 'O motor da SUN 150 é derivado da mesma base 149,5cc usada por diversas marcas chinesas vendidas no Brasil (Sundown, antiga Kasinski Comet 150 etc.). Isso ajuda muito na hora de comprar peças: pistão 57,5mm STD, anéis, biela e muitos componentes internos têm equivalência entre essas marcas. Ao comprar peça em loja especializada em motos populares, leve a peça velha ou a medida para conferência — pedir só pelo nome "SUN 150" pode não achar estoque, mas pedir pela medida do motor resolve.',
  },
  {
    severity: 'OK',
    title: 'Rodagem: primeiros 1.000 km sem passar de 6.000 rpm',
    body: 'Motor de tolerâncias mais largas que um motor japonês equivalente — rodagem bem feita evita consumo de óleo prematuro e vazamentos. Nos primeiros 1.000 km, evite ultrapassar 6.000 rpm (de um redline perto de 8.500 rpm) e troque o óleo já nos primeiros 500 km. Reaperte os parafusos do cabeçote na revisão de 1.000 km — é comum soltarem levemente durante a rodagem inicial.',
  },
]

const SUN150_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e estator: falha elétrica é a reclamação mais comum de motos Shineray desta faixa',
    body: 'Relatos no Reclame Aqui de proprietários Shineray apontam bobina do estator se soltando e danificando o CDI, exigindo troca dos dois componentes juntos. Sintoma inicial: moto falha em ligar, faísca fraca ou intermitente, apaga sozinha em marcha lenta. Se notar esses sinais, não adie o diagnóstico — rodar com estator solto pode acelerar o dano ao CDI (peça mais cara de repor). CDI genérico compatível com motor 150cc chinês de 5 ou 6 pinos custa bem menos que peça original de concessionária — confirme a pinagem antes de comprar.',
  },
  {
    severity: 'WARN',
    title: 'Disponibilidade de peças e pós-venda: reclamação recorrente da marca no Brasil',
    body: 'Reclamações frequentes sobre demora e falta de peças em concessionárias Shineray, especialmente fora das grandes capitais. Recomendação prática: ao comprar a moto, já localize 1–2 oficinas independentes especializadas em motos populares/chinesas na sua região — muitas peças de desgaste (filtros, corrente, retentores, pastilhas) têm equivalente genérico de prateleira e não dependem da rede autorizada.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor do eixo de câmbio: comum após 20.000 km',
    body: 'Assim como outros motores da mesma família construtiva, o retentor do eixo primário da caixa de câmbio da SUN 150 tende a vazar depois de 20.000–25.000 km. Sintoma: mancha de óleo na parte baixa do motor, corrente ficando suja de óleo com mais frequência. Retentor genérico (confira a medida com o antigo — tipicamente 20×32×7mm) custa R$ 5–15 e a troca é rápida em oficina de bairro.',
  },
  {
    severity: 'WARN',
    title: 'Conectores elétricos oxidam em 2–3 anos em regiões úmidas',
    body: 'Chicote elétrico com conectores de qualidade básica — comum nesta faixa de preço. Sintomas típicos: lanterna intermitente, pisca que para de funcionar, painel com leitura errática. Solução preventiva: aplicar graxa dielétrica nos conectores acessíveis a cada revisão e limpar contatos oxidados com spray de contato elétrico (WD-40 Contato). Se o problema persistir num ponto específico, troque o conector por um Tyco/AMP de mesma bitola.',
  },
  {
    severity: 'WARN',
    title: 'Vibração acima de 6.500–7.000 rpm é característica do motor, mas piora com manutenção atrasada',
    body: 'Vibração perceptível em rotações mais altas é normal para este motor monocilíndrico sem contrapeso refinado. Se piorar de forma perceptível, verifique: parafusos de fixação do motor no chassi (afrouxam com a vibração contínua), coxins/borrachas do guidão, e balanceamento da roda dianteira. Não é sintoma isolado de defeito grave, mas indica que uma revisão está atrasada.',
  },
]

const SUN150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SUN 150: revisões por quilometragem',
    body: '500 km — Troca de óleo inicial de rodagem. | 1.000 km — Segunda troca de óleo (20W-50, 1,0L) + reaperto dos parafusos do cabeçote + ajuste da embreagem centrífuga. | 3.000 km — Troca de óleo + lubrificação da corrente + verificação da marcha lenta. | 5.000 km — Limpeza do filtro de ar (espuma: lavar, secar, reumedecer com óleo) + limpeza do carburador se necessário. | 8.000 km — Troca da vela NGK C7HSA + regulagem da folga de válvulas (adm. 0,05mm / esc. 0,08mm, motor frio). | 10.000 km — Kit relação (corrente + pinhão + coroa) se desgastado + inspeção do retentor do eixo de câmbio. | 15.000 km — Rolamentos de roda + revisão geral do sistema elétrico (conectores).',
  },
]

// ─── WORKER 150 ────────────────────────────────────────────────────────────
// Motor: 144,8cc SOHC 2 válvulas ar-refrigerado | 8,5 cv @ 7.500 rpm | 10,2 Nm @ 7.500 rpm
// Câmbio 4 marchas manual | Carburador | Carga máx. 150kg | Bateria 12V/5Ah
// Pneu: 2.75-18 (F) / 90/90-17 (R) | Freio disco (F) + tambor (R)
// Perfil "cargo/utilitário" — vendida para uso de entrega/trabalho intenso

const WORKER150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Uso de carga: reduza o intervalo de óleo se rodar carregado todo dia',
    body: 'A WORKER 150 é vendida como moto de trabalho (carga máxima declarada de 150 kg). Motor sob carga constante e trânsito parado (motoboy/entrega) aquece e degrada o óleo mais rápido que uso de lazer. Se você carrega baú ou bagageiro pesado diariamente, reduza o intervalo de troca de óleo de 3.000 km para 2.000–2.500 km. Use 20W-50 JASO MA — a viscosidade mais alta ajuda a manter a película de óleo sob carga térmica maior.',
  },
  {
    severity: 'WARN',
    title: 'Corrente e coroa desgastam mais rápido em uso de carga — inspecione a cada 15 dias',
    body: 'Com carga extra no bagageiro, a tensão na corrente de transmissão aumenta. Em uso de entrega/trabalho, inspecione a folga da corrente a cada 15 dias (não espere a revisão programada) e lubrifique a cada 400–500 km — menos que o intervalo padrão de moto de lazer. Sinal de coroa gasta prematuramente por excesso de carga: dentes em "gancho" visíveis a olho nu. Kit relação 428/420 completo: R$ 90–180.',
  },
  {
    severity: 'OK',
    title: 'Suspensão traseira monoamortecida: regule a pré-carga para o peso transportado',
    body: 'A WORKER 150 tem suspensão traseira monoamortecida (um único amortecedor central), diferente de motos com par de amortecedores convencionais. Se você carrega peso com frequência (baú, mercadoria), ajuste a pré-carga do monoshock (anel regulador na base) para compensar — suspensão mole demais sob carga faz o para-lama traseiro bater no pneu em buracos e desgasta o amortecedor mais rápido.',
  },
  {
    severity: 'OK',
    title: 'Freio dianteiro a disco + traseiro a tambor: pastilha e lona têm vida útil bem diferente',
    body: 'A combinação disco (frente) + tambor (trás) é comum nesta categoria. Em uso de carga/entrega, o freio dianteiro a disco desgasta mais rápido (mais frenagens de emergência com peso extra). Pastilha dianteira genérica compatível com motor 150cc chinês: R$ 25–45 o jogo. Lona de tambor traseiro dura bem mais (troque só quando sentir o pedal/pé de freio "fundo"). Verifique os dois a cada 6.000 km se usar a moto para trabalho.',
  },
  {
    severity: 'OK',
    title: 'Bateria 12V/5Ah: mantenha carregada — partida elétrica em moto de trabalho sofre mais ciclos',
    body: 'Moto de trabalho liga e desliga várias vezes ao dia (entregas, paradas). Isso gasta mais a bateria de 5Ah do que uso de lazer com 1–2 partidas diárias. Se notar a partida elétrica enfraquecendo, teste a tensão em repouso (deve estar acima de 12,4V) antes de trocar — muitas vezes o problema é o retificador não estar carregando corretamente, não a bateria em si. Bateria genérica 12V/5Ah selada: R$ 90–150.',
  },
  {
    severity: 'WARN',
    title: 'Pneu 2.75-18 dianteiro / 90/90-17 traseiro: calibre acima do padrão se rodar sempre carregado',
    body: 'Com uso de carga constante, calibre os pneus 2–3 psi acima do valor "solo" recomendado para reduzir o risco de deformação lateral e desgaste irregular sob peso extra. Verifique a calibragem semanalmente em uso de trabalho (pneu perde pressão mais rápido sob carga térmica de uso intenso). Pneu murcho sob carga é a causa mais comum de "bicicletada" (deformação da carcaça) em motos de entrega.',
  },
  {
    severity: 'OK',
    title: 'USB e acessórios: cuidado ao instalar carga elétrica extra (rastreador, suporte com carregador)',
    body: 'Motos de trabalho costumam ganhar acessórios elétricos extras (rastreador GPS, suporte de celular com carregador USB, luz auxiliar). O sistema elétrico de 12V/5Ah tem folga limitada. Sempre instale um fusível extra dedicado ao acessório (não puxe direto da bateria sem proteção) e prefira ligar via chave geral (não direto na bateria) para não descarregar a moto parada. Isso evita boa parte dos problemas elétricos que motos de entrega apresentam depois de "gambiarras".',
  },
]

const WORKER150_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Suspensão e corrente sofrem desgaste acelerado em uso de carga contínua além do especificado',
    body: 'A carga máxima declarada é 150 kg (piloto + carga). Ultrapassar esse limite com frequência (comum em uso de entrega informal) acelera o desgaste de suspensão traseira, corrente/coroa e rolamentos de roda — e em casos extremos compromete a geometria do quadro. Se a moto é usada para trabalho pesado, respeite o limite de carga e faça inspeção visual da suspensão e da corrente semanalmente, não apenas na revisão programada.',
  },
  {
    severity: 'WARN',
    title: 'CDI e retificador: mesmo ponto de falha elétrica da linha Shineray em geral',
    body: 'Como em outros modelos da marca, CDI e retificador/regulador são os componentes elétricos mais suscetíveis a falha, especialmente com o uso intenso de moto de trabalho (mais ciclos de liga/desliga, mais vibração acumulada). Sintoma: bateria não carrega (teste com multímetro a 4.000 rpm — deve ficar entre 13,5–14,5V), ou falha de ignição intermitente. Troca preventiva do retificador em torno de 30.000–40.000 km reduz o risco de ficar parado no meio do trabalho.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala dianteira: vaza mais cedo com uso em vias ruins e carga extra',
    body: 'O peso extra transportado e o uso em ruas esburacadas (comum em rotas de entrega urbana) aceleram o desgaste do retentor da bengala dianteira. Sintoma: óleo escuro no tubo interno da bengala, amortecimento irregular. Troca: R$ 20–40 em peça genérica + mão de obra simples. Não adie — óleo pingando no disco de freio dianteiro compromete a frenagem.',
  },
  {
    severity: 'WARN',
    title: 'Carburador engasga com uso de etanol de baixa qualidade em abastecimentos de posto de rota',
    body: 'Motos de entrega abastecem em postos variados ao longo do dia — a qualidade do etanol nem sempre é a mesma. Sinais de combustível ruim: perda de potência, engasgo em aceleração, consumo maior que o normal. Limpeza do carburador a cada 6 meses (ou ao primeiro sintoma) evita parada não programada. Se possível, prefira sempre os mesmos postos de confiança para reabastecer durante a rotina de trabalho.',
  },
]

const WORKER150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma WORKER 150: revisão mais frequente por causa do uso de carga/trabalho',
    body: '500 km — Troca de óleo inicial. | 1.000 km — Segunda troca de óleo + reaperto geral (cabeçote, motor no chassi, bagageiro). | 2.000–2.500 km — Troca de óleo (20W-50, ~1,0L) se em uso de carga diária (ou 3.000 km em uso leve). | 5.000 km — Filtro de ar (limpeza) + inspeção da suspensão traseira monoamortecida + pastilha de freio dianteira. | 8.000 km — Vela NGK C7HSA + folga de válvulas + kit relação se desgastado (uso de carga acelera). | 10.000 km — Filtro de ar (troca) + lona do freio traseiro (inspeção) + retentor de bengala (inspeção). | 15.000 km — Rolamentos de roda + verificação do retificador (13,5–14,5V a 4.000 rpm).',
  },
]

// ─── JEF 170 ───────────────────────────────────────────────────────────────
// Motor: 169,3cc SOHC 2 válvulas ar-refrigerado | 63,5×53,5mm | 9:1
// 13,59 cv @ 8.000 rpm | ~14,7 Nm (1,5 kgf.m) @ 6.000 rpm | Carburador
// 5 marchas, embreagem manual multidisco banhada a óleo | Corrente
// Freio disco 235mm hidráulico (F) + tambor 128mm (R) com CBS
// Bateria 12V/7Ah | Full LED | USB 5V/1A | Tanque 12L (reserva 3,5L)

const JEF170_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 20W-50 (ou 15W-50) JASO MA2 — ~1,1L; motor maior exige atenção redobrada à viscosidade',
    body: 'O motor 169,3cc da JEF 170 é maior que o da linha 150cc — capacidade de óleo em torno de 1,1L. Use JASO MA2 (padrão mais exigente que MA, obrigatório para a embreagem multidisco em banho de óleo). Marcas OK: Lubrax Moto 4T, Shell Advance 4T, Motul 3000 20W-50. Troca a cada 3.000 km ou 6 meses. Não estenda o intervalo achando que "motor maior aguenta mais" — o oposto costuma ser verdade em motores air-cooled desta faixa.',
  },
  {
    severity: 'WARN',
    title: 'Carburador de motor maior: regulagem de marcha lenta mais sensível que na linha 150cc',
    body: 'O carburador da JEF 170 alimenta um motor de maior cilindrada, então pequenos desvios na regulagem de marcha lenta ou no jato principal se notam mais (engasgo, consumo alto). Limpeza preventiva a cada 6 meses com spray específico (Bardahl, WD-40 Especialista). Se a moto ficar parada mais de 1 mês com tanque cheio, esvazie a cuba pelo parafuso dreno — etanol degradado é a causa mais comum de entupimento de jato nesta faixa de motor.',
  },
  {
    severity: 'OK',
    title: 'CBS (freio combinado): entenda como funciona antes de confiar só no pedal traseiro',
    body: 'A JEF 170 tem sistema CBS que distribui parte da frenagem para o disco dianteiro (235mm) quando você aciona o pedal traseiro. Isso ajuda a reduzir distância de frenagem para pilotos que usam mais o pedal do que a manete — mas não substitui o uso da manete dianteira em frenagens de emergência. Revise o CBS (cabos/atuador) a cada 10.000 km — cabo desregulado faz o sistema não distribuir a frenagem corretamente.',
  },
  {
    severity: 'OK',
    title: 'USB 5V/1A de série: útil, mas não carregue celular exigente demais',
    body: 'A saída USB 5V/1A é adequada para manter a carga do celular em uso de navegação leve, mas 1A é baixo para carregar rapidamente aparelhos modernos com tela grande em uso intenso de GPS. Se notar o celular descarregando mesmo plugado, é porque o consumo do app está maior que a corrente fornecida — normal, não é defeito da moto.',
  },
  {
    severity: 'OK',
    title: 'Embreagem multidisco em banho de óleo: use sempre óleo JASO MA2, nunca aditivo "anti-fricção"',
    body: 'Diferente de motos com embreagem seca, a JEF 170 tem embreagem multidisco banhada no mesmo óleo do motor. Aditivos "redutores de atrito" de prateleira de autopeças (para motor de carro) fazem a embreagem escorregar — nunca use. Use somente óleo com selo JASO MA2 na embalagem. Se a embreagem estiver patinando (moto acelera sem ganhar velocidade proporcional), primeiro suspeite do óleo errado antes de trocar discos.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de transmissão: lubrifique a cada 500 km — motor mais forte desgasta mais rápido',
    body: 'Com mais torque que a linha 150cc, a corrente da JEF 170 sofre mais e pede lubrificação a cada 500 km (spray de corrente ou óleo 90W no trecho inferior). Folga correta: 20–30mm. Kit relação completo para este porte de motor: R$ 120–220. Sinais de troca necessária: corrente "ondulando" mesmo com folga ajustada, ou dentes da coroa em formato de gancho.',
  },
]

const JEF170_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI/retificador: mesmo ponto de falha elétrica reportado em toda a linha Shineray',
    body: 'Assim como em outros modelos da marca, o CDI e o retificador/regulador da JEF 170 aparecem entre os componentes elétricos mais propensos a falha. Sintomas: bateria não carrega (meça 13,5–14,5V a 4.000 rpm com multímetro), falha de ignição intermitente, moto desliga sozinha em marcha lenta. Substituição preventiva do retificador em torno de 30.000–40.000 km reduz o risco de pane repentina.',
  },
  {
    severity: 'WARN',
    title: 'Freio a tambor traseiro: regulagem de folga precisa ser revisada com mais frequência que disco',
    body: 'O tambor traseiro de 128mm da JEF 170 perde eficiência gradualmente conforme a lona desgasta, e ao contrário de um disco, isso não é tão perceptível no dia a dia — a folga do pedal aumenta devagar. Verifique a folga do pedal de freio traseiro a cada 3.000 km; se estiver "fundo demais" antes de travar, regule pelo esticador (ou troque a lona se já estiver no limite).',
  },
  {
    severity: 'WARN',
    title: 'Peças e pós-venda: mesma limitação de disponibilidade reportada para a marca no Brasil',
    body: 'Por ser lançamento relativamente recente (linha JEF 170 chegou ao Brasil como evolução da JEF 150), peças específicas do motor 169,3cc ainda são menos disseminadas em desmontes/estoques de lojas populares do que a linha 150cc mais antiga. Itens de desgaste comuns (filtro, corrente, pastilha) já têm equivalência genérica; peças internas do motor podem depender mais da rede autorizada nos primeiros anos do modelo — confirme disponibilidade antes de fechar negócio em concessionária distante.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pelo retentor do eixo de câmbio: mesmo padrão de desgaste da família de motores da marca',
    body: 'Como em outros modelos Shineray desta faixa, o retentor do eixo primário da caixa de câmbio tende a começar a vazar por volta de 20.000–25.000 km. Sintoma: mancha de óleo na parte baixa do motor, corrente suja com mais frequência que o normal. Retentor genérico de mesma medida do antigo: R$ 5–15, troca simples.',
  },
]

const JEF170_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma JEF 170: motor 169,3cc pede atenção um pouco maior que a linha 150cc',
    body: '500 km — Troca de óleo inicial de rodagem. | 1.000 km — Segunda troca de óleo (20W-50 JASO MA2, ~1,1L) + reaperto do cabeçote. | 3.000 km — Troca de óleo + lubrificação da corrente + limpeza do carburador se necessário. | 5.000 km — Filtro de ar (limpeza) + verificação do CBS (cabos) + folga do pedal de freio traseiro. | 8.000–10.000 km — Vela + folga de válvulas + filtro de ar (troca) + kit relação se desgastado. | 15.000 km — Lona do tambor traseiro (inspeção) + pastilha do disco dianteiro + retentor do eixo de câmbio (inspeção). | Anual — Verificação de tensão do retificador (13,5–14,5V a 4.000 rpm).',
  },
]

// ─── SHI 170 ───────────────────────────────────────────────────────────────
// Motor: 169,3cc SOHC 2 válvulas ar-refrigerado + EFI | 63,5×53,5mm | 9:1
// 13,59 cv @ 8.000 rpm | ~11,5 Nm (1,17 kgf.m) @ 7.200 rpm | Injeção eletrônica
// 5 marchas, embreagem manual multidisco banhada a óleo | Corrente | Painel digital
// Mesma base mecânica da JEF 170, mas com sistema de alimentação por injeção

const SHI170_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesma base mecânica da JEF 170 — peças de motor/chassi compatíveis, mas o sistema de alimentação é outro',
    body: 'A SHI 170 usa essencialmente o mesmo bloco 169,3cc SOHC da JEF 170 (mesma medida de bore/stroke), mas com injeção eletrônica no lugar do carburador. Isso significa que óleo, vela, corrente, retentores e freio têm boa chance de compatibilidade entre os dois modelos — mas NUNCA troque peças do sistema de alimentação entre eles (bico injetor não serve em carburador e vice-versa, óbvio, mas vale reforçar para quem troca peças "no olho" em oficina de bairro).',
  },
  {
    severity: 'OK',
    title: 'Injeção eletrônica: partida a frio mais fácil, mas dependente de bateria em boas condições',
    body: 'A grande vantagem da SHI 170 sobre a versão carburada é a partida a frio consistente — sem "afogar" a moto batendo acelerador. Isso exige bateria com boa carga: sistema de injeção consome mais energia na partida que ignição CDI simples de carburador. Se a bateria estiver fraca (abaixo de 12V em repouso), a partida pode ficar difícil mesmo com o motor mecanicamente saudável — teste a bateria antes de suspeitar da injeção.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA2 — ~1,1L; mesmo padrão da JEF 170',
    body: 'Capacidade e especificação de óleo iguais à JEF 170 (motor idêntico): ~1,1L de 20W-50 JASO MA2 a cada 3.000 km ou 6 meses. A embreagem multidisco banhada a óleo exige selo JASO MA2 — nunca use óleo com aditivo anti-fricção de carro.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de combustível da injeção: item que não existe no carburador — não esqueça na revisão',
    body: 'Ao contrário da versão carburada (JEF 170), a SHI 170 tem um filtro de combustível dedicado ao sistema de injeção, geralmente embutido no conjunto da bomba dentro do tanque. Se não for trocado periodicamente, entope aos poucos e causa perda de potência progressiva (sintoma fácil de confundir com "motor fraco"). Verifique com o mecânico se a sua revisão programada inclui esse item — muitas oficinas acostumadas com carburador esquecem de checar.',
  },
  {
    severity: 'OK',
    title: 'Painel digital: use o hodômetro parcial para controlar seus próprios intervalos de manutenção',
    body: 'A SHI 170 vem com painel digital com hodômetro parcial — zere-o a cada troca de óleo/revisão para acompanhar exatamente quando a próxima manutenção vence, em vez de depender de memória ou de etiqueta de adesivo (que costuma sumir ou desbotar em pouco tempo em moto usada no dia a dia).',
  },
  {
    severity: 'WARN',
    title: 'Corrente e freio: mesmos cuidados da JEF 170 (motor idêntico, mais torque que a linha 150cc)',
    body: 'Lubrifique a corrente a cada 500 km e mantenha a folga entre 20–30mm — o torque do motor 169,3cc desgasta a transmissão mais rápido que a linha 150cc. Se a SHI 170 tiver a mesma configuração de freio CBS da JEF 170 (disco dianteiro + tambor traseiro combinado), revise os cabos do sistema a cada 10.000 km.',
  },
]

const SHI170_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'ECU/módulo de injeção sensível a queda de tensão da bateria — mantenha sempre carregada',
    body: 'Sistemas de injeção eletrônica em motos populares desta faixa de preço tendem a ser mais sensíveis a instabilidade elétrica do que o CDI simples de um carburador. Bateria fraca ou retificador com defeito pode causar: falha de partida, funcionamento errático em marcha lenta, ou luz de injeção (se houver) acendendo no painel. Antes de suspeitar de defeito na ECU, sempre meça a tensão da bateria em repouso (mín. 12,4V) e a tensão de carga do sistema (13,5–14,5V a 4.000 rpm).',
  },
  {
    severity: 'WARN',
    title: 'Rede de assistência especializada em injeção eletrônica de moto popular ainda é limitada fora de capitais',
    body: 'Diagnóstico de falhas de injeção exige scanner compatível — nem toda oficina de bairro acostumada a carburador tem essa ferramenta. Em cidades menores, pode ser necessário levar a uma concessionária Shineray ou oficina especializada em injeção de motos populares para diagnóstico preciso. Vale pesquisar previamente quem atende esse tipo de sistema na sua região antes de precisar em uma emergência.',
  },
  {
    severity: 'WARN',
    title: 'CDI/retificador ainda é ponto de atenção mesmo em versão injetada',
    body: 'Apesar de ter injeção eletrônica, a SHI 170 ainda depende de um retificador/regulador de tensão que segue o mesmo padrão de falha reportado em toda a linha Shineray. Se a bateria não segura carga mesmo depois de testada boa, meça a tensão de carga do sistema a 4.000 rpm — fora da faixa 13,5–14,5V, o retificador é o suspeito número um.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pelo retentor do eixo de câmbio: mesmo padrão de desgaste do motor compartilhado com a JEF 170',
    body: 'Por usar o mesmo bloco motor da JEF 170, a SHI 170 apresenta o mesmo padrão de desgaste do retentor do eixo primário da caixa de câmbio a partir de 20.000–25.000 km — mancha de óleo na parte baixa do motor é o sinal de alerta. Troca simples e barata (retentor genérico, R$ 5–15).',
  },
]

const SHI170_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SHI 170: mesma base mecânica da JEF 170, com atenção extra ao sistema de injeção',
    body: '500 km — Troca de óleo inicial de rodagem. | 1.000 km — Segunda troca de óleo (20W-50 JASO MA2, ~1,1L) + reaperto do cabeçote + verificação de tensão da bateria. | 3.000 km — Troca de óleo + lubrificação da corrente. | 5.000 km — Filtro de ar (limpeza) + inspeção visual do chicote e conectores da injeção. | 8.000–10.000 km — Vela + folga de válvulas + filtro de ar (troca) + filtro de combustível da injeção (verificação/troca). | 15.000 km — Kit relação se desgastado + retentor do eixo de câmbio (inspeção). | Anual — Tensão do retificador (13,5–14,5V a 4.000 rpm) + diagnóstico de injeção em oficina especializada, se disponível na região.',
  },
]

// ─── SHI 175 (motor base 173,6cc — compartilhado com SHI 175 S EFI) ────────
// Motor: 173,6cc OHC 2 válvulas ar-refrigerado | 16,31 cv @ 7.500 rpm | 18 Nm @ 6.000 rpm
// 5 marchas, embreagem manual multidisco banhada a óleo | Tanque 15L
// "SHI 175" (sem sufixo) = versão carburada | "SHI 175 S EFI" = versão injetada
// Conteúdo aqui é o COMPARTILHADO (motor, câmbio, chassi, pneus) — chega por
// union também para quem tem a versão S EFI.

const SHI175_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA2 — ~1,15L; motor de maior potência da linha 150–175cc da marca',
    body: 'Com 16,31 cv, o motor 173,6cc da SHI 175 é o mais potente entre os modelos desta faixa da Shineray no Brasil. Capacidade de óleo: ~1,15L. Use 20W-50 JASO MA2 semissintético (Motul 3000, Shell Advance 4T) — a potência maior sugere não economizar na qualidade do óleo. Troca a cada 3.000 km ou 6 meses.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 15L: uma das maiores autonomias da linha popular de 150–175cc',
    body: 'Com consumo médio informado entre 28 e 35 km/l dependendo do uso (urbano x rodovia), o tanque de 15L da SHI 175 rende entre 420 e 525 km por tanque — autonomia bem generosa para a categoria. Ainda assim, não conte com a reserva para planejar trechos longos sem posto: abasteça sempre que possível abaixo de 1/4 de tanque em viagens.',
  },
  {
    severity: 'OK',
    title: 'Vela e corrente: motor mais forte pede atenção redobrada ao intervalo de troca',
    body: 'Com mais torque que os modelos 150cc/170cc da linha, a corrente de transmissão da SHI 175 sofre mais desgaste — lubrifique a cada 500 km e verifique a folga (20–30mm) semanalmente se usar a moto com regularidade. Vela: gap conforme especificação do fabricante para motor OHC desta cilindrada (verifique no manual do proprietário a referência exata da vela, pois pode variar por lote/ano do modelo).',
  },
  {
    severity: 'WARN',
    title: 'Versão carburada (SHI 175 "simples"): mesmos cuidados de etanol das demais motos carburadas da linha',
    body: 'Se a sua unidade é a versão sem o sufixo "S EFI" (carburada), o cuidado com etanol degradado se aplica normalmente: limpeza do carburador a cada 6 meses, esvaziar a cuba se a moto ficar parada mais de 1 mês. Se você não tem certeza se a sua SHI 175 é carburada ou injetada, verifique a etiqueta/adesivo próximo ao motor ou a nota fiscal — a diferença de manutenção entre as duas versões é significativa.',
  },
  {
    severity: 'OK',
    title: 'Embreagem multidisco banhada a óleo: nunca use aditivo anti-fricção',
    body: 'Assim como na JEF 170/SHI 170, a embreagem multidisco da SHI 175 é banhada no óleo do motor — use somente óleo com selo JASO MA2. Aditivos "redutores de atrito" para motor de carro fazem a embreagem escorregar sob aceleração.',
  },
  {
    severity: 'OK',
    title: 'Pneus 80/100-18 (F) / 100/90-18 (R): estimativa baseada na categoria "trail compacta"',
    body: 'A SHI 175 é posicionada como trail urbana compacta — pneus com perfil um pouco mais alto que uma naked pura. Se a sua unidade vier com medida diferente da estimada aqui, confira a etiqueta de calibragem original (geralmente na proteção da corrente ou no manual) e ajuste a pressão de referência proporcionalmente.',
  },
]

const SHI175_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI/retificador: mesmo padrão de falha elétrica da linha Shineray, com motor mais potente sob mais carga elétrica',
    body: 'Sistema elétrico segue o mesmo padrão de risco reportado em toda a linha da marca no Brasil — CDI e retificador são os pontos mais frágeis. Com o motor mais potente da linha (16,31 cv), a demanda elétrica do sistema de ignição/carga também é um pouco maior. Meça a tensão de carga a 4.000 rpm (13,5–14,5V esperado) se notar sintomas de bateria fraca ou falha de ignição intermitente.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pelo retentor do eixo de câmbio: padrão de desgaste comum à família de motores da marca',
    body: 'Como nos demais modelos desta linha, o retentor do eixo primário da caixa de câmbio tende a começar a vazar a partir de 20.000–25.000 km. Mancha de óleo na parte baixa do motor é o sinal de alerta — troca simples e barata.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala dianteira: desgaste mais cedo em uso com carga de piloto+garupa constante',
    body: 'Sendo o modelo mais "encorpado" da linha 150–175cc, a SHI 175 costuma ser usada com garupa com mais frequência. Isso acelera o desgaste do retentor da bengala dianteira. Sintoma: óleo escuro no tubo interno, amortecimento irregular. Inspecione a cada 15.000 km se usar frequentemente com passageiro.',
  },
  {
    severity: 'WARN',
    title: 'Reclamações de disponibilidade de peças específicas do motor 173,6cc',
    body: 'Por ser o motor de maior cilindrada da linha popular da marca no Brasil, peças internas específicas (pistão, anéis, componentes de embreagem) podem ter estoque mais limitado em lojas populares do que os motores 150cc mais disseminados. Itens de desgaste comum (filtro, corrente, pastilha, vela) normalmente já têm equivalência genérica de prateleira.',
  },
]

const SHI175_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SHI 175 (base mecânica — válido para carburada e S EFI): motor mais potente da linha',
    body: '500 km — Troca de óleo inicial de rodagem. | 1.000 km — Segunda troca de óleo (20W-50 JASO MA2, ~1,15L) + reaperto do cabeçote. | 3.000 km — Troca de óleo + lubrificação da corrente. | 5.000 km — Filtro de ar (limpeza) + verificação de freios. | 8.000–10.000 km — Vela + folga de válvulas + filtro de ar (troca) + kit relação se desgastado. | 15.000 km — Retentor de bengala dianteira (inspeção) + retentor do eixo de câmbio (inspeção) + rolamentos de roda. | Anual — Tensão do retificador (13,5–14,5V a 4.000 rpm). Para a versão S EFI, consulte também o cronograma específico de itens de injeção.',
  },
]

// ─── SHI 175 S EFI (SOMENTE conteúdo específico de injeção eletrônica — o
// conteúdo mecânico compartilhado já chega por union do bloco 'SHI 175') ────

const SHI175SEFI_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Bico injetor e corpo de borboleta: limpeza preventiva evita perda de potência progressiva',
    body: 'Na SHI 175 S EFI, sujeira acumulada no bico injetor e no corpo de borboleta (throttle body) reduz o rendimento aos poucos — sintoma difícil de notar de um dia para o outro, mas perceptível na comparação de consumo/potência ao longo de meses. Limpeza preventiva com spray específico para sistema de injeção (aplicado conforme instrução do produto, geralmente com o motor em funcionamento) a cada 10.000–15.000 km ajuda a manter a resposta do acelerador consistente.',
  },
  {
    severity: 'OK',
    title: 'Partida a frio consistente é a principal vantagem sobre a versão carburada',
    body: 'A grande diferença prática da S EFI para a SHI 175 carburada é a partida a frio: sem "afogar" batendo acelerador, sem variação de mistura por temperatura ambiente. Isso reduz o desgaste da bateria/motor de partida no dia a dia — mas exige que a bateria esteja sempre bem carregada, já que o sistema de injeção consome mais corrente na partida do que a ignição simples de um carburador.',
  },
  {
    severity: 'OK',
    title: 'Filtro de combustível da injeção: item que não existe na versão carburada — inclua na revisão',
    body: 'A S EFI tem um filtro de combustível dedicado (geralmente parte do módulo da bomba dentro do tanque) que a versão carburada não possui. Entupimento gradual causa perda de potência que pode ser confundida com "motor fraco" ou problema de vela. Confirme com o mecânico se a revisão programada inclui a checagem desse item — muitas oficinas acostumadas a carburador não pensam nele por padrão.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível: EFI tende a ser mais econômico, mas depende de calibração correta da bomba/pressão',
    body: 'Motos injetadas desta faixa costumam apresentar consumo um pouco melhor que a versão carburada equivalente, por causa da dosagem mais precisa de combustível. Se notar consumo pior do que o esperado (abaixo de ~28 km/l em uso misto), suspeite primeiro de: filtro de ar sujo, filtro de combustível parcialmente entupido, ou sensor de oxigênio/TPS fora de calibração — não é "normal de injeção", é sinal de manutenção pendente.',
  },
  {
    severity: 'OK',
    title: 'Painel digital com indicadores de injeção: use como diagnóstico rápido',
    body: 'O painel digital da S EFI costuma trazer indicadores relacionados ao sistema de injeção (luz de falha/MIL, se equipada). Preste atenção a qualquer luz acesa no painel além das convencionais — pode ser um código de falha de sensor armazenado na ECU, útil para o mecânico consultar via scanner antes de abrir o motor desnecessariamente.',
  },
  {
    severity: 'WARN',
    title: 'Bateria: sistema de injeção é mais dependente de tensão estável que o CDI do carburador',
    body: 'Diferente da versão carburada (que funciona com ignição CDI relativamente tolerante a bateria fraca), a S EFI depende de tensão estável para a ECU, bomba de combustível e bico injetor funcionarem corretamente. Bateria em fim de vida útil pode causar sintomas de "moto engasgando" que na verdade são falta de tensão, não defeito no sistema de injeção em si. Teste a bateria (mín. 12,4V em repouso) antes de qualquer diagnóstico mais invasivo de injeção.',
  },
]

const SHI175SEFI_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'ECU sensível a queda de tensão: retificador com defeito pode causar falhas erráticas difíceis de diagnosticar',
    body: 'Se o retificador/regulador (ponto de falha elétrica mais comum na linha Shineray) apresentar defeito, a instabilidade de tensão pode causar sintomas confusos no sistema de injeção da S EFI: marcha lenta oscilando, perda de potência intermitente, luz de falha piscando sem padrão claro. Antes de suspeitar de bico injetor, sensor ou ECU danificados, sempre meça a tensão do sistema de carga a 4.000 rpm (13,5–14,5V esperado) — resolver o retificador primeiro evita trocar peça de injeção desnecessariamente.',
  },
  {
    severity: 'WARN',
    title: 'Diagnóstico de injeção depende de scanner — nem toda oficina de bairro tem o equipamento',
    body: 'Diferente da versão carburada (ajustável "no olho" por qualquer mecânico experiente), a S EFI exige scanner compatível para ler códigos de falha da ECU com precisão. Em cidades menores, isso pode significar depender da concessionária Shineray ou de oficina especializada em injeção de motos populares. Vale pesquisar previamente quem atende esse tipo de sistema na sua região.',
  },
  {
    severity: 'WARN',
    title: 'Bico injetor entupido por combustível de baixa qualidade ou tempo parado com tanque cheio',
    body: 'Assim como o carburador é sensível a etanol degradado, o bico injetor da S EFI também pode sofrer com combustível de baixa qualidade acumulado por tempo parado (embora de forma diferente — não "engoma" como um jato de carburador, mas pode ter o spray de injeção prejudicado por resíduos). Se a moto ficar parada mais de 1–2 meses, dê partida periodicamente (a cada 2–3 semanas) para circular o combustível pelo sistema.',
  },
  {
    severity: 'WARN',
    title: 'Sensor TPS (posição do acelerador) desregulado causa resposta irregular ao acelerador',
    body: 'Se a moto apresentar aceleração "em degraus" (não linear) ou engasgo em rotações específicas, o sensor TPS pode estar fora da calibração de fábrica — problema mais comum após reparos no corpo de borboleta feitos sem o cuidado de recalibrar o sensor. Esse ajuste normalmente requer ferramenta de diagnóstico; não é recomendado tentar "no olho" sem o equipamento correto.',
  },
]

const SHI175SEFI_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Itens específicos de injeção da SHI 175 S EFI (complementar ao cronograma mecânico da SHI 175 base)',
    body: 'A cada 10.000 km — Limpeza do corpo de borboleta e verificação do bico injetor (spray específico de sistema de injeção). | A cada 15.000–20.000 km — Troca do filtro de combustível da injeção (dentro do módulo da bomba, no tanque). | A cada revisão — Verificação de códigos de falha armazenados na ECU (se a oficina tiver scanner compatível) e checagem da tensão de carga do sistema (13,5–14,5V a 4.000 rpm), já que a ECU é mais sensível a instabilidade elétrica que a ignição CDI da versão carburada. | Se a moto ficar parada mais de 1 mês — dê partida a cada 2–3 semanas para circular o combustível pelo sistema de injeção.',
  },
]

// ─── FREE 150 EFI ────────────────────────────────────────────────────────────
// Motor: ~149,5cc SOHC 2 válvulas ar-refrigerado + EFI | ~11 cv classe
// Pneu: 80/100-18 (F) / 90/90-18 (R) | Freio disco 210mm hidráulico (F) + tambor 130mm (R)
// Chassi diamond em aço | Transmissão por corrente | Suspensão traseira com
// DOIS amortecedores convencionais (não monoshock) | Painel 100% digital

const FREE150EFI_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Suspensão traseira com PAR de amortecedores: troque sempre os dois juntos, nunca só um',
    body: 'Diferente da WORKER 150 (monoshock), a FREE 150 EFI usa dois amortecedores traseiros convencionais. Se um estiver vazando ou gasto, troque o par — amortecedores com rigidez diferente de cada lado desalinham a moto em curva e desgastam o pneu de forma irregular. Par de amortecedores genéricos compatíveis com este porte de moto: R$ 120–220.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — ~1,0L; motor EFI da linha 150cc',
    body: 'Capacidade de óleo em torno de 1,0L, especificação 20W-50 JASO MA (embreagem multidisco em banho de óleo). Troca a cada 3.000 km ou 6 meses. Mesmo sendo injetada, a exigência de óleo com selo JASO continua igual à de motor carburado — o que muda é apenas o sistema de alimentação de combustível, não a lubrificação.',
  },
  {
    severity: 'OK',
    title: 'Freio dianteiro a disco hidráulico 210mm: troque o fluido a cada 2 anos mesmo sem sintoma',
    body: 'O disco dianteiro de 210mm com acionamento hidráulico da FREE 150 EFI precisa de fluido de freio DOT 4 trocado a cada 24 meses — o fluido absorve umidade do ar com o tempo e perde eficiência mesmo sem uso intenso. Pastilha genérica compatível: R$ 25–45 o jogo. Verifique o nível do reservatório a cada revisão.',
  },
  {
    severity: 'OK',
    title: 'Painel 100% digital: use o indicador de marcha e o de combustível para planejar paradas',
    body: 'A FREE 150 EFI tem painel digital completo com indicador de marcha engatada e nível de combustível — use esses recursos para não depender só da luz de reserva. Com tanque relativamente compacto para uso urbano intenso, planejar abastecimento pelo indicador digital evita ficar sem combustível em trecho sem posto por perto.',
  },
  {
    severity: 'OK',
    title: 'Rodas 18" nos dois eixos (80/100-18 F / 90/90-18 R): pneus com boa disponibilidade no mercado popular',
    body: 'A medida 18" em ambas as rodas é comum na categoria de motos populares no Brasil, então a disponibilidade de pneus de reposição é boa em qualquer borracharia. Marcas populares compatíveis: Pirelli Cordoba, Levorin Duna, Rinaldi. Calibre semanalmente — pneu murcho é a causa mais comum de desgaste irregular prematuro nesta categoria.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de combustível da injeção: item específico da versão EFI, não esqueça na revisão',
    body: 'Por ser injetada, a FREE 150 EFI tem filtro de combustível dedicado ao sistema (geralmente integrado ao módulo da bomba no tanque). Entupimento gradual causa perda de potência progressiva. Confirme com a oficina se esse item está incluído no plano de revisão — nem toda oficina de bairro acostumada a carburador verifica isso por padrão.',
  },
]

const FREE150EFI_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI/retificador: mesmo ponto de falha elétrica da linha Shineray',
    body: 'Segue o mesmo padrão de risco elétrico reportado nos demais modelos da marca — CDI e retificador/regulador são os componentes mais suscetíveis a falha. Sintomas: bateria não carrega (meça 13,5–14,5V a 4.000 rpm), falha de ignição intermitente. Substituição preventiva do retificador entre 30.000–40.000 km reduz o risco de pane.',
  },
  {
    severity: 'WARN',
    title: 'ECU sensível a bateria fraca — sintomas de injeção que na verdade são elétricos',
    body: 'Como em outros modelos EFI da linha, bateria fraca ou retificador com defeito pode causar sintomas confundíveis com problema de injeção (marcha lenta instável, dificuldade de partida). Sempre teste a tensão da bateria e do sistema de carga antes de suspeitar de bico injetor ou ECU.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala dianteira: vazamento comum após 15.000–20.000 km em uso urbano com buracos',
    body: 'Pavimento irregular acelera o desgaste do retentor da bengala dianteira. Sintoma: óleo escuro visível no tubo interno, amortecimento perdendo eficiência. Troca: R$ 20–40 em peça genérica + mão de obra simples.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pelo retentor do eixo de câmbio: padrão de desgaste comum à linha da marca',
    body: 'Como nos demais modelos desta faixa da Shineray, o retentor do eixo primário da caixa de câmbio tende a vazar a partir de 20.000–25.000 km — mancha de óleo na parte baixa do motor é o sinal de alerta.',
  },
]

const FREE150EFI_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma FREE 150 EFI: motor EFI da linha 150cc com suspensão traseira de par de amortecedores',
    body: '500 km — Troca de óleo inicial de rodagem. | 1.000 km — Segunda troca de óleo (20W-50 JASO MA, ~1,0L) + reaperto do cabeçote. | 3.000 km — Troca de óleo + lubrificação da corrente. | 5.000 km — Filtro de ar (limpeza) + inspeção do par de amortecedores traseiros. | 8.000–10.000 km — Vela + folga de válvulas + filtro de ar (troca) + filtro de combustível da injeção (verificação). | 15.000 km — Kit relação se desgastado + retentor do eixo de câmbio (inspeção) + retentor de bengala (inspeção). | 24 meses — Fluido de freio DOT 4 (disco dianteiro 210mm). | Anual — Tensão do retificador (13,5–14,5V a 4.000 rpm).',
  },
]

// ─── URBAN 150 EFI ───────────────────────────────────────────────────────────
// Scooter automática: 149cc SOHC 2 válvulas ar-refrigerado + EFI | CVT
// 12,91 cv @ 8.500 rpm | 13 Nm @ 6.500 rpm | Tanque 13,5L
// ABS nas duas rodas (240mm F / 220mm R) | Roda 14" (F) / 13" (R)
// Pneu 100/80-14 (F) / 130/70-13 (R) | Start/Stop eletrônico | USB

const URBAN150EFI_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CVT: troque o óleo do cubo de transmissão final separadamente do óleo do motor',
    body: 'Por ser uma scooter automática, a URBAN 150 EFI tem DOIS reservatórios de óleo distintos: o do motor (lubrifica pistão/válvulas/embreagem) e o do cubo de transmissão final/redutor da CVT (engrenagens finais). São óleos diferentes e trocados em intervalos diferentes — não confunda os dois na hora da revisão. O óleo do motor: ~0,8L, JASO MA. O óleo do cubo final: volume bem menor (~100-120mL), geralmente 80W-90 ou específico do fabricante — confirme no manual do proprietário.',
  },
  {
    severity: 'WARN',
    title: 'Correia (belt) da CVT: item de desgaste que carburadores/câmbio manual não têm — verifique a cada 8.000–10.000 km',
    body: 'A correia de transmissão da CVT é um item que scooters têm e motos com câmbio manual (como a WORKER 150 ou JEF 170) não têm. Ela desgasta com o tempo e o uso, e uma correia gasta causa perda de aceleração e ruído característico. Inspecione visualmente (trincas, desgaste lateral) a cada 8.000–10.000 km e troque preventivamente por volta de 20.000–25.000 km, mesmo sem sintoma evidente — a ruptura em uso causa perda total de tração instantânea.',
  },
  {
    severity: 'OK',
    title: 'ABS nas duas rodas: mantenha os sensores limpos, principalmente em dias de chuva/lama',
    body: 'A URBAN 150 EFI tem ABS dianteiro (240mm) e traseiro (220mm) — recurso raro nesta faixa de preço/cilindrada. Os sensores de velocidade das rodas (rotor dentado + sensor magnético) precisam estar limpos para funcionar corretamente. Após rodar em poça de barro ou lama, lave levemente a região dos discos e cubos de roda — sujeira acumulada pode acionar a luz de falha do ABS no painel sem que haja defeito real no sistema.',
  },
  {
    severity: 'OK',
    title: 'Sistema Start/Stop: desligue-o se estiver preso em trânsito muito lento e engarrafado',
    body: 'O sistema Start/Stop eletrônico desliga o motor automaticamente após alguns segundos parado e religa ao acelerar — bom para economia de combustível em paradas longas (semáforo), mas pode incomodar em trânsito "para-e-anda" muito frequente (desgaste extra do motor de partida em ciclos curtos e repetidos). Verifique no manual se há botão de desativação manual do sistema para esses cenários.',
  },
  {
    severity: 'OK',
    title: 'Consumo declarado de 38–42 km/l: rendimento acima da média para a categoria',
    body: 'O consumo declarado pelo fabricante (38 a 42 km/l conforme uso) é bom para uma scooter automática 150cc com ABS e injeção — CVTs costumam ser um pouco menos eficientes que câmbio manual, mas a injeção eletrônica compensa parte dessa perda. Para manter esse rendimento, mantenha a calibragem dos pneus em dia e não acelere bruscamente repetidamente (uso da CVT em "meio gás" constante é mais eficiente que solavancos).',
  },
  {
    severity: 'WARN',
    title: 'Rodas de liga 14"/13": pneus específicos, disponibilidade menor que a linha 18" das motos manuais',
    body: 'As medidas 100/80-14 (dianteiro) e 130/70-13 (traseiro) são específicas de scooter e têm disponibilidade menor em borracharias de bairro do que as medidas 18" comuns das motos manuais da linha (WORKER, JEF, SHI, FREE). Ao trocar, pesquise com antecedência em lojas especializadas em pneus de scooter/moto grande — não deixe para resolver de última hora em viagem.',
  },
]

const URBAN150EFI_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI/retificador: mesmo ponto de falha elétrica da linha Shineray, com carga elétrica extra do ABS',
    body: 'A URBAN 150 EFI tem mais componentes elétricos ativos que os modelos manuais da linha (ABS, injeção, Start/Stop), o que aumenta a dependência de um sistema de carga saudável. O retificador/regulador segue sendo o ponto mais frágil relatado na marca — se o ABS acender luz de falha no painel COM frequência, meça primeiro a tensão do sistema de carga (13,5–14,5V a 4.000 rpm) antes de suspeitar do módulo ABS em si.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT rompida em uso: perda de tração instantânea, sem aviso mecânico prévio na maioria dos casos',
    body: 'Diferente de uma corrente que costuma dar sinais visuais de desgaste (folga excessiva, ruído), uma correia CVT pode romper de forma mais repentina se ultrapassar muito o intervalo de troca recomendado. O sintoma é a moto "não puxar" mesmo com o motor acelerando normalmente. Respeite o intervalo preventivo de troca (20.000–25.000 km) em vez de esperar sintoma.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de cavalete lateral: se a moto não ligar ou morrer sozinha, verifique o cavalete antes de tudo',
    body: 'Scooters com sensor de segurança no cavalete lateral (comum nesta categoria) não ligam, ou desligam o motor automaticamente, se o cavalete estiver baixado. Se a moto "não pega" sem motivo aparente, o primeiro passo é confirmar que o cavalete está totalmente recolhido — é a causa mais comum e mais frequentemente esquecida de "pane" nesse tipo de veículo.',
  },
  {
    severity: 'WARN',
    title: 'Disponibilidade de peças específicas de CVT/ABS ainda limitada fora da rede autorizada',
    body: 'Por ser um modelo com tecnologia mais avançada que a linha manual da marca (ABS, CVT), peças específicas (sensores ABS, correia CVT original, kit de embreagem centrífuga da CVT) têm disponibilidade menor em lojas populares. Itens básicos (óleo, filtro de ar, pastilha) já têm equivalência genérica normalmente.',
  },
]

const URBAN150EFI_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma URBAN 150 EFI: scooter automática com ABS — itens de CVT substituem os de corrente/câmbio manual',
    body: '500 km — Troca de óleo do motor inicial de rodagem. | 1.000 km — Segunda troca de óleo do motor (~0,8L JASO MA) + verificação geral. | 3.000 km — Troca de óleo do motor + inspeção visual da correia CVT. | 5.000 km — Filtro de ar (limpeza) + troca do óleo do cubo de transmissão final (~100-120mL). | 8.000–10.000 km — Vela + inspeção detalhada da correia CVT + rolamentos do variador. | 20.000–25.000 km — Troca preventiva da correia CVT. | Sempre que a luz de ABS acender — limpeza dos sensores de roda antes de levar para diagnóstico eletrônico. | Anual — Tensão do retificador (13,5–14,5V a 4.000 rpm) + fluido de freio DOT 4 (sistema ABS duplo).',
  },
]

// ─── URBAN LITE 150 ──────────────────────────────────────────────────────────
// Scooter automática: 149,48cc SOHC 2 válvulas ar-refrigerado + EFI | CVT
// 13,5 cv @ 7.500 rpm | 11 Nm @ 5.000 rpm | Tanque 8L (com reserva)
// Rodas 13" (F e R) | Freio disco 230mm hidráulico (F) + tambor 130mm mecânico (R) com CBS
// SEM ABS (diferencial de custo em relação à URBAN 150 EFI) | Full LED | USB-A + USB-C

const URBANLITE150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Versão de entrada da linha Urban: injetada, mas sem ABS — CBS faz o papel de segurança extra',
    body: 'Diferente da URBAN 150 EFI (com ABS nas duas rodas), a URBAN LITE 150 usa CBS (freio combinado) sem ABS — mais barata, mas ainda com alguma distribuição inteligente de frenagem entre disco dianteiro e tambor traseiro. Isso significa que em piso molhado ou escorregadio, o risco de travamento de roda é maior do que na versão com ABS — reforce a atenção redobrada nesses cenários.',
  },
  {
    severity: 'OK',
    title: 'Tanque de apenas 8L: autonomia menor, planeje abastecimentos mais frequentes',
    body: 'O tanque de 8L (incluindo reserva) da URBAN LITE 150 é bem menor que o da URBAN 150 EFI (13,5L) ou da SHI 175 (15L). Mesmo com consumo eficiente típico de CVT injetada urbana, a autonomia total fica limitada — não é a scooter ideal para trechos longos sem posto no caminho. Para uso urbano diário, o tanque menor raramente é problema, mas vale ter isso em mente ao planejar deslocamentos maiores.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT: mesmo cuidado da URBAN 150 EFI — inspecione a cada 8.000–10.000 km',
    body: 'Por compartilhar o conceito de transmissão CVT com a URBAN 150 EFI, a URBAN LITE 150 tem o mesmo item de desgaste específico: a correia de transmissão. Inspecione visualmente a cada 8.000–10.000 km e troque preventivamente por volta de 20.000–25.000 km. Óleo do cubo de transmissão final também é item separado do óleo do motor — não esqueça de trocar os dois.',
  },
  {
    severity: 'OK',
    title: 'USB-A + USB-C: verifique qual porta seu carregador de cabo realmente usa antes de comprar acessório',
    body: 'A URBAN LITE 150 vem com as duas portas USB (A e C) — bom para compatibilidade com diferentes celulares. Ao comprar suporte/carregador veicular extra, confira qual porta está disponível na sua unidade específica (pode variar por versão/ano) para não comprar cabo ou adaptador errado.',
  },
  {
    severity: 'OK',
    title: 'Rodas 13" nos dois eixos: pneus compactos, iguais nas duas pontas facilita comprar par',
    body: 'Diferente da URBAN 150 EFI (14" na frente, 13" atrás), a URBAN LITE 150 usa 13" nos dois eixos — o que facilita comprar um par de pneus da mesma medida de uma vez (às vezes com desconto de loja para compra do par) em vez de duas medidas diferentes.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro a tambor mecânico: acionamento por cabo, folga precisa ser regulada periodicamente',
    body: 'Ao contrário da URBAN 150 EFI (tambor traseiro com CBS, mas em geral com acionamento mais integrado), a URBAN LITE 150 tem tambor traseiro com acionamento mecânico por cabo — a folga aumenta gradualmente com o desgaste da lona e precisa de regulagem manual periódica (esticador no braço do tambor). Se o pedal/manete do freio traseiro estiver "fundo demais", regule antes de trocar peça.',
  },
]

const URBANLITE150_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Ausência de ABS: atenção redobrada em frenagem de emergência em piso molhado',
    body: 'Por ser a versão de entrada sem ABS, a URBAN LITE 150 exige mais técnica do piloto em frenagens de emergência — travar a roda dianteira em piso molhado ou irregular pode causar queda, algo que o ABS da URBAN 150 EFI ajudaria a evitar. Pratique frenagem progressiva (não "esmagar" a manete de uma vez) e redobre a distância de segurança em dias de chuva.',
  },
  {
    severity: 'WARN',
    title: 'CDI/retificador: mesmo ponto de falha elétrica de toda a linha Shineray',
    body: 'Mesmo padrão de risco elétrico reportado nos demais modelos da marca — retificador/regulador é o componente mais frágil. Se a bateria não segurar carga, meça a tensão do sistema a 4.000 rpm (13,5–14,5V esperado) antes de trocar a bateria por engano.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT rompida sem aviso prévio se o intervalo preventivo for ignorado',
    body: 'Assim como na URBAN 150 EFI, a correia CVT pode romper de forma relativamente repentina se ultrapassar muito o intervalo recomendado, causando perda total de tração instantânea. Respeite o intervalo de troca preventiva (20.000–25.000 km).',
  },
  {
    severity: 'WARN',
    title: 'Sensor de cavalete lateral: causa mais comum de "moto não liga" nesta categoria',
    body: 'Se a URBAN LITE 150 não ligar ou desligar sozinha sem motivo aparente, verifique primeiro se o cavalete lateral está totalmente recolhido — sensores de segurança deste tipo bloqueiam o funcionamento do motor com o cavalete baixado, e é a causa mais frequentemente esquecida de "pane" em scooters desta categoria.',
  },
]

const URBANLITE150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma URBAN LITE 150: scooter automática de entrada — CVT sem ABS, freio traseiro a cabo',
    body: '500 km — Troca de óleo do motor inicial de rodagem. | 1.000 km — Segunda troca de óleo do motor + verificação geral. | 3.000 km — Troca de óleo do motor + inspeção visual da correia CVT + regulagem do cabo do freio traseiro. | 5.000 km — Filtro de ar (limpeza) + troca do óleo do cubo de transmissão final. | 8.000–10.000 km — Vela + inspeção detalhada da correia CVT + lona do freio traseiro (inspeção). | 20.000–25.000 km — Troca preventiva da correia CVT. | Anual — Tensão do retificador (13,5–14,5V a 4.000 rpm) + fluido de freio DOT 4 (disco dianteiro 230mm).',
  },
]

// ─── Blocos de modelos ────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'SUN 150',
    yearFrom: null,
    yearTo: null,
    MACETES: SUN150_MACETES,
    PROBLEMAS: SUN150_PROBLEMAS,
    MANUTENCAO: SUN150_MANUTENCAO,
  },
  {
    modelName: 'WORKER 150',
    yearFrom: null,
    yearTo: null,
    MACETES: WORKER150_MACETES,
    PROBLEMAS: WORKER150_PROBLEMAS,
    MANUTENCAO: WORKER150_MANUTENCAO,
  },
  {
    modelName: 'JEF 170',
    yearFrom: null,
    yearTo: null,
    MACETES: JEF170_MACETES,
    PROBLEMAS: JEF170_PROBLEMAS,
    MANUTENCAO: JEF170_MANUTENCAO,
  },
  {
    modelName: 'SHI 170',
    yearFrom: null,
    yearTo: null,
    MACETES: SHI170_MACETES,
    PROBLEMAS: SHI170_PROBLEMAS,
    MANUTENCAO: SHI170_MANUTENCAO,
  },
  {
    modelName: 'SHI 175',
    yearFrom: null,
    yearTo: null,
    MACETES: SHI175_MACETES,
    PROBLEMAS: SHI175_PROBLEMAS,
    MANUTENCAO: SHI175_MANUTENCAO,
  },
  {
    modelName: 'SHI 175 S EFI',
    yearFrom: null,
    yearTo: null,
    MACETES: SHI175SEFI_MACETES,
    PROBLEMAS: SHI175SEFI_PROBLEMAS,
    MANUTENCAO: SHI175SEFI_MANUTENCAO,
  },
  {
    modelName: 'FREE 150 EFI',
    yearFrom: null,
    yearTo: null,
    MACETES: FREE150EFI_MACETES,
    PROBLEMAS: FREE150EFI_PROBLEMAS,
    MANUTENCAO: FREE150EFI_MANUTENCAO,
  },
  {
    modelName: 'URBAN 150 EFI',
    yearFrom: null,
    yearTo: null,
    MACETES: URBAN150EFI_MACETES,
    PROBLEMAS: URBAN150EFI_PROBLEMAS,
    MANUTENCAO: URBAN150EFI_MANUTENCAO,
  },
  {
    modelName: 'URBAN LITE 150',
    yearFrom: null,
    yearTo: null,
    MACETES: URBANLITE150_MACETES,
    PROBLEMAS: URBANLITE150_PROBLEMAS,
    MANUTENCAO: URBANLITE150_MANUTENCAO,
  },
]

// ─── Calibragens de pneus ──────────────────────────────────────────────────────
// Valores estimados com base na medida do pneu e no peso típico da categoria
// (dados oficiais de calibragem não estão sempre publicados) — confira sempre
// a etiqueta/adesivo de calibragem da unidade específica quando disponível.
// SHI 175 S EFI não recebe registro próprio: herda a calibragem da SHI 175
// (mesmo chassi/rodas — só o sistema de alimentação muda).

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'SUN 150',
    yearFrom: null, yearTo: null,
    tireSize: '2.75-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 30 PSI. Com garupa: F 26 / R 33 PSI. Estimativa baseada na medida de pneu típica da categoria (confirme na etiqueta de calibragem da unidade, se disponível).',
  },
  {
    modelName: 'WORKER 150',
    yearFrom: null, yearTo: null,
    tireSize: '2.75-18 (F) · 90/90-17 (R)',
    frontPsi: 26, rearPsi: 32,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo: F 26 / R 32 PSI. Com carga (uso de trabalho, até 150 kg declarados): F 28 / R 36 PSI. Uso de carga constante pede verificação semanal — o pneu perde pressão mais rápido sob peso extra.',
  },
  {
    modelName: 'JEF 170',
    yearFrom: null, yearTo: null,
    tireSize: '2.75-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 30 PSI. Com garupa: F 28 / R 33 PSI. Estimativa baseada na medida de pneu típica da categoria — confirme na etiqueta de calibragem, se disponível.',
  },
  {
    modelName: 'SHI 170',
    yearFrom: null, yearTo: null,
    tireSize: '2.75-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Mesma medida e calibragem de referência da JEF 170 (mesmo chassi/rodas, motor idêntico, muda apenas o sistema de alimentação para EFI).',
  },
  {
    modelName: 'SHI 175',
    yearFrom: null, yearTo: null,
    tireSize: '80/100-18 (F) · 100/90-18 (R)',
    frontPsi: 27, rearPsi: 32,
    frontPsiLoad: 27, rearPsiLoad: 36,
    notes: 'Solo: F 27 / R 32 PSI. Com garupa: F 27 / R 36 PSI. Valores de referência para a categoria "trail urbana compacta" — válido também para a versão S EFI (mesmo chassi/rodas).',
  },
  {
    modelName: 'FREE 150 EFI',
    yearFrom: null, yearTo: null,
    tireSize: '80/100-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 30 PSI. Com garupa: F 26 / R 33 PSI. Rodas 18" nos dois eixos — boa disponibilidade de pneus de reposição no mercado popular.',
  },
  {
    modelName: 'URBAN 150 EFI',
    yearFrom: null, yearTo: null,
    tireSize: '100/80-14 (F) · 130/70-13 (R)',
    frontPsi: 28, rearPsi: 33,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo: F 28 / R 33 PSI. Com garupa: F 28 / R 36 PSI. Scooter automática com ABS — pneus de medida específica de scooter, disponibilidade menor que pneus 18" das motos manuais da linha.',
  },
  {
    modelName: 'URBAN LITE 150',
    yearFrom: null, yearTo: null,
    tireSize: '100/80-13 (F) · 110/70-13 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 30 PSI. Com garupa: F 26 / R 33 PSI. Rodas 13" nos dois eixos — medida estimada com base na categoria (scooter automática de entrada); confirme na etiqueta de calibragem da unidade.',
  },
]

// ─── Itens de manutenção ────────────────────────────────────────────────────
// SHI 175 S EFI recebe SOMENTE itens específicos de injeção (os itens
// mecânicos compartilhados — óleo, vela, corrente, freio — já chegam por
// union do bloco 'SHI 175', que tem o mesmo chassi/motor base).

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // SUN 150
  { modelName: 'SUN 150', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA (~1,0L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 149,5cc SOHC. Embreagem centrífuga automática banhada a óleo — nunca use JASO MB.', priority: 'HIGH', order: 1 },
  { modelName: 'SUN 150', yearFrom: null, yearTo: null, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Verificar gap a cada 5.000 km. Iridium CR7HIX dura o dobro.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SUN 150', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente 428', intervalKm: 500, intervalMonths: null, notes: 'Spray corrente ou óleo 80W-90. Folga 20–30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'SUN 150', yearFrom: null, yearTo: null, component: 'Limpeza do carburador', intervalKm: null, intervalMonths: 6, notes: 'Etanol degradado empasta o jato principal. Fazer mesmo sem sintoma se a moto passar semanas parada.', priority: 'MEDIUM', order: 4 },
  { modelName: 'SUN 150', yearFrom: null, yearTo: null, component: 'Regulagem da embreagem centrífuga', intervalKm: 8000, intervalMonths: 12, notes: 'Parafuso de regulagem no cárter direito. Evita trancos ao trocar marcha em baixa rotação.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SUN 150', yearFrom: null, yearTo: null, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'SUN 150', yearFrom: null, yearTo: null, component: 'Retentor do eixo de câmbio', intervalKm: 20000, intervalMonths: null, notes: 'Peça genérica ~20×32×7mm. Sinal: mancha de óleo na parte baixa do motor.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SUN 150', yearFrom: null, yearTo: null, component: 'Verificação do CDI e retificador', intervalKm: null, intervalMonths: 12, notes: 'Medir tensão com multímetro a 4.000 rpm: deve ser 13,5–14,5V.', priority: 'HIGH', order: 8 },

  // WORKER 150
  { modelName: 'WORKER 150', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA (~1,0L)', intervalKm: 2500, intervalMonths: 6, notes: 'Reduzir para 2.000–2.500 km se em uso de carga/trabalho diário.', priority: 'HIGH', order: 1 },
  { modelName: 'WORKER 150', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Uso de carga extra acelera o desgaste — inspecionar folga a cada 15 dias em uso de trabalho.', priority: 'HIGH', order: 2 },
  { modelName: 'WORKER 150', yearFrom: null, yearTo: null, component: 'Inspeção da suspensão traseira monoamortecida', intervalKm: 5000, intervalMonths: 6, notes: 'Regular pré-carga conforme carga transportada.', priority: 'MEDIUM', order: 3 },
  { modelName: 'WORKER 150', yearFrom: null, yearTo: null, component: 'Pastilha de freio dianteiro (disco)', intervalKm: 6000, intervalMonths: null, notes: 'Desgaste mais rápido em uso de entrega/carga.', priority: 'HIGH', order: 4 },
  { modelName: 'WORKER 150', yearFrom: null, yearTo: null, component: 'Lona do freio traseiro (tambor)', intervalKm: 10000, intervalMonths: 12, notes: 'Verificar folga do pedal a cada revisão.', priority: 'MEDIUM', order: 5 },
  { modelName: 'WORKER 150', yearFrom: null, yearTo: null, component: 'Vela NGK C7HSA + folga de válvulas', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio para folga de válvulas.', priority: 'MEDIUM', order: 6 },
  { modelName: 'WORKER 150', yearFrom: null, yearTo: null, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 12000, intervalMonths: null, notes: 'Uso de carga acelera desgaste — inspecionar dentes da coroa (formato de gancho = trocar).', priority: 'HIGH', order: 7 },
  { modelName: 'WORKER 150', yearFrom: null, yearTo: null, component: 'Verificação da bateria e retificador', intervalKm: null, intervalMonths: 6, notes: 'Mais ciclos de partida em uso de trabalho. Medir 13,5–14,5V a 4.000 rpm.', priority: 'HIGH', order: 8 },

  // JEF 170
  { modelName: 'JEF 170', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA2 (~1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 169,3cc. Embreagem multidisco banhada a óleo — nunca usar aditivo anti-fricção.', priority: 'HIGH', order: 1 },
  { modelName: 'JEF 170', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Motor mais forte desgasta a corrente mais rápido que a linha 150cc.', priority: 'HIGH', order: 2 },
  { modelName: 'JEF 170', yearFrom: null, yearTo: null, component: 'Limpeza do carburador', intervalKm: null, intervalMonths: 6, notes: 'Regulagem de marcha lenta mais sensível em motor maior.', priority: 'MEDIUM', order: 3 },
  { modelName: 'JEF 170', yearFrom: null, yearTo: null, component: 'Verificação do sistema CBS (cabos)', intervalKm: 10000, intervalMonths: 12, notes: 'Cabo desregulado faz o CBS não distribuir a frenagem corretamente.', priority: 'MEDIUM', order: 4 },
  { modelName: 'JEF 170', yearFrom: null, yearTo: null, component: 'Vela + folga de válvulas', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório para folga.', priority: 'HIGH', order: 5 },
  { modelName: 'JEF 170', yearFrom: null, yearTo: null, component: 'Lona do freio traseiro (tambor 128mm)', intervalKm: 10000, intervalMonths: 12, notes: 'Verificar folga do pedal a cada 3.000 km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'JEF 170', yearFrom: null, yearTo: null, component: 'Retentor do eixo de câmbio', intervalKm: 20000, intervalMonths: null, notes: 'Sinal: mancha de óleo na parte baixa do motor.', priority: 'MEDIUM', order: 7 },
  { modelName: 'JEF 170', yearFrom: null, yearTo: null, component: 'Verificação do retificador', intervalKm: null, intervalMonths: 12, notes: 'Medir 13,5–14,5V a 4.000 rpm.', priority: 'HIGH', order: 8 },

  // SHI 170
  { modelName: 'SHI 170', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA2 (~1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Mesmo motor 169,3cc da JEF 170, versão EFI.', priority: 'HIGH', order: 1 },
  { modelName: 'SHI 170', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Mesmo cuidado da JEF 170 — motor com mais torque que a linha 150cc.', priority: 'HIGH', order: 2 },
  { modelName: 'SHI 170', yearFrom: null, yearTo: null, component: 'Filtro de combustível da injeção', intervalKm: 15000, intervalMonths: null, notes: 'Item que não existe na versão carburada JEF 170. Entupimento causa perda de potência progressiva.', priority: 'HIGH', order: 3 },
  { modelName: 'SHI 170', yearFrom: null, yearTo: null, component: 'Verificação da tensão da bateria', intervalKm: null, intervalMonths: 6, notes: 'Sistema de injeção mais sensível a bateria fraca que ignição CDI de carburador. Mín. 12,4V em repouso.', priority: 'HIGH', order: 4 },
  { modelName: 'SHI 170', yearFrom: null, yearTo: null, component: 'Vela + folga de válvulas', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'SHI 170', yearFrom: null, yearTo: null, component: 'Retentor do eixo de câmbio', intervalKm: 20000, intervalMonths: null, notes: 'Mesmo padrão de desgaste do motor compartilhado com a JEF 170.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SHI 170', yearFrom: null, yearTo: null, component: 'Verificação do retificador', intervalKm: null, intervalMonths: 12, notes: 'Medir 13,5–14,5V a 4.000 rpm.', priority: 'HIGH', order: 7 },

  // SHI 175 (base mecânica — compartilhada com S EFI)
  { modelName: 'SHI 175', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA2 (~1,15L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 173,6cc, o mais potente da linha (16,31 cv).', priority: 'HIGH', order: 1 },
  { modelName: 'SHI 175', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Mais torque que a linha 150cc/170cc — desgaste mais rápido.', priority: 'HIGH', order: 2 },
  { modelName: 'SHI 175', yearFrom: null, yearTo: null, component: 'Vela + folga de válvulas', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório. Confirme referência exata da vela no manual (pode variar por lote/ano).', priority: 'HIGH', order: 3 },
  { modelName: 'SHI 175', yearFrom: null, yearTo: null, component: 'Retentor de bengala dianteira', intervalKm: 15000, intervalMonths: null, notes: 'Desgaste mais cedo em uso frequente com garupa.', priority: 'MEDIUM', order: 4 },
  { modelName: 'SHI 175', yearFrom: null, yearTo: null, component: 'Retentor do eixo de câmbio', intervalKm: 20000, intervalMonths: null, notes: 'Sinal: mancha de óleo na parte baixa do motor.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SHI 175', yearFrom: null, yearTo: null, component: 'Rolamentos de roda', intervalKm: 15000, intervalMonths: null, notes: 'Inspecionar folga axial.', priority: 'LOW', order: 6 },
  { modelName: 'SHI 175', yearFrom: null, yearTo: null, component: 'Verificação do retificador', intervalKm: null, intervalMonths: 12, notes: 'Medir 13,5–14,5V a 4.000 rpm. Motor mais potente exige sistema de carga saudável.', priority: 'HIGH', order: 7 },

  // SHI 175 S EFI (SOMENTE itens específicos de injeção)
  { modelName: 'SHI 175 S EFI', yearFrom: null, yearTo: null, component: 'Limpeza do bico injetor e corpo de borboleta', intervalKm: 12000, intervalMonths: null, notes: 'Spray específico para sistema de injeção. Evita perda de potência progressiva.', priority: 'MEDIUM', order: 1 },
  { modelName: 'SHI 175 S EFI', yearFrom: null, yearTo: null, component: 'Troca do filtro de combustível da injeção', intervalKm: 17000, intervalMonths: null, notes: 'Integrado ao módulo da bomba no tanque. Não existe na versão carburada.', priority: 'HIGH', order: 2 },
  { modelName: 'SHI 175 S EFI', yearFrom: null, yearTo: null, component: 'Verificação de códigos de falha da ECU (scanner)', intervalKm: null, intervalMonths: 12, notes: 'Requer oficina com scanner compatível com injeção de motos populares.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SHI 175 S EFI', yearFrom: null, yearTo: null, component: 'Verificação da tensão da bateria e do sistema de carga', intervalKm: null, intervalMonths: 6, notes: 'ECU mais sensível a instabilidade elétrica que a ignição CDI da versão carburada. Mín. 12,4V em repouso, 13,5–14,5V a 4.000 rpm.', priority: 'HIGH', order: 4 },

  // FREE 150 EFI
  { modelName: 'FREE 150 EFI', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA (~1,0L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor EFI da linha 150cc.', priority: 'HIGH', order: 1 },
  { modelName: 'FREE 150 EFI', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 2 },
  { modelName: 'FREE 150 EFI', yearFrom: null, yearTo: null, component: 'Inspeção do par de amortecedores traseiros', intervalKm: 5000, intervalMonths: 6, notes: 'Suspensão com DOIS amortecedores convencionais — trocar sempre em par.', priority: 'MEDIUM', order: 3 },
  { modelName: 'FREE 150 EFI', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 4 (disco dianteiro 210mm)', intervalKm: null, intervalMonths: 24, notes: 'Trocar mesmo sem sintoma — o fluido absorve umidade com o tempo.', priority: 'HIGH', order: 4 },
  { modelName: 'FREE 150 EFI', yearFrom: null, yearTo: null, component: 'Filtro de combustível da injeção', intervalKm: 15000, intervalMonths: null, notes: 'Item específico da versão EFI, não existe em carburador.', priority: 'MEDIUM', order: 5 },
  { modelName: 'FREE 150 EFI', yearFrom: null, yearTo: null, component: 'Vela + folga de válvulas', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'FREE 150 EFI', yearFrom: null, yearTo: null, component: 'Retentor do eixo de câmbio', intervalKm: 20000, intervalMonths: null, notes: 'Sinal: mancha de óleo na parte baixa do motor.', priority: 'MEDIUM', order: 7 },
  { modelName: 'FREE 150 EFI', yearFrom: null, yearTo: null, component: 'Verificação do retificador', intervalKm: null, intervalMonths: 12, notes: 'Medir 13,5–14,5V a 4.000 rpm.', priority: 'HIGH', order: 8 },

  // URBAN 150 EFI
  { modelName: 'URBAN 150 EFI', yearFrom: null, yearTo: null, component: 'Óleo do motor (~0,8L JASO MA)', intervalKm: 3000, intervalMonths: 6, notes: 'Scooter CVT automática — óleo do motor é separado do óleo do cubo de transmissão final.', priority: 'HIGH', order: 1 },
  { modelName: 'URBAN 150 EFI', yearFrom: null, yearTo: null, component: 'Óleo do cubo de transmissão final (~100–120mL)', intervalKm: 5000, intervalMonths: 12, notes: 'Item exclusivo de CVT — não confundir com o óleo do motor. Confirme especificação exata no manual.', priority: 'MEDIUM', order: 2 },
  { modelName: 'URBAN 150 EFI', yearFrom: null, yearTo: null, component: 'Inspeção da correia CVT', intervalKm: 8000, intervalMonths: null, notes: 'Verificar trincas e desgaste lateral.', priority: 'HIGH', order: 3 },
  { modelName: 'URBAN 150 EFI', yearFrom: null, yearTo: null, component: 'Troca preventiva da correia CVT', intervalKm: 22000, intervalMonths: null, notes: 'Ruptura em uso causa perda total de tração instantânea — não espere sintoma.', priority: 'HIGH', order: 4 },
  { modelName: 'URBAN 150 EFI', yearFrom: null, yearTo: null, component: 'Limpeza dos sensores de roda do ABS', intervalKm: null, intervalMonths: 6, notes: 'Sujeira acumulada pode acionar luz de falha do ABS sem defeito real.', priority: 'MEDIUM', order: 5 },
  { modelName: 'URBAN 150 EFI', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 4 (sistema ABS duplo)', intervalKm: null, intervalMonths: 12, notes: 'Sistema com ABS nas duas rodas — verificar anualmente.', priority: 'HIGH', order: 6 },
  { modelName: 'URBAN 150 EFI', yearFrom: null, yearTo: null, component: 'Vela', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar gap conforme manual.', priority: 'MEDIUM', order: 7 },
  { modelName: 'URBAN 150 EFI', yearFrom: null, yearTo: null, component: 'Verificação do retificador', intervalKm: null, intervalMonths: 12, notes: 'Medir 13,5–14,5V a 4.000 rpm. Mais componentes elétricos ativos (ABS, injeção, Start/Stop) exigem sistema de carga saudável.', priority: 'HIGH', order: 8 },

  // URBAN LITE 150
  { modelName: 'URBAN LITE 150', yearFrom: null, yearTo: null, component: 'Óleo do motor', intervalKm: 3000, intervalMonths: 6, notes: 'Scooter CVT automática — óleo do motor é separado do óleo do cubo de transmissão final.', priority: 'HIGH', order: 1 },
  { modelName: 'URBAN LITE 150', yearFrom: null, yearTo: null, component: 'Óleo do cubo de transmissão final', intervalKm: 5000, intervalMonths: 12, notes: 'Item exclusivo de CVT — confirme especificação exata no manual.', priority: 'MEDIUM', order: 2 },
  { modelName: 'URBAN LITE 150', yearFrom: null, yearTo: null, component: 'Inspeção da correia CVT', intervalKm: 8000, intervalMonths: null, notes: 'Verificar trincas e desgaste lateral.', priority: 'HIGH', order: 3 },
  { modelName: 'URBAN LITE 150', yearFrom: null, yearTo: null, component: 'Troca preventiva da correia CVT', intervalKm: 22000, intervalMonths: null, notes: 'Ruptura em uso causa perda total de tração instantânea.', priority: 'HIGH', order: 4 },
  { modelName: 'URBAN LITE 150', yearFrom: null, yearTo: null, component: 'Regulagem do cabo do freio traseiro (tambor mecânico)', intervalKm: 3000, intervalMonths: null, notes: 'Sem ABS/CBS integrado como a URBAN 150 EFI — acionamento por cabo, folga aumenta com o desgaste da lona.', priority: 'MEDIUM', order: 5 },
  { modelName: 'URBAN LITE 150', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 4 (disco dianteiro 230mm)', intervalKm: null, intervalMonths: 12, notes: 'Verificar anualmente mesmo sem sintoma.', priority: 'HIGH', order: 6 },
  { modelName: 'URBAN LITE 150', yearFrom: null, yearTo: null, component: 'Vela', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar gap conforme manual.', priority: 'MEDIUM', order: 7 },
  { modelName: 'URBAN LITE 150', yearFrom: null, yearTo: null, component: 'Verificação do retificador', intervalKm: null, intervalMonths: 12, notes: 'Medir 13,5–14,5V a 4.000 rpm.', priority: 'HIGH', order: 8 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Shineray 150–170cc (linha urbana/utilitária)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'SHINERAY', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'SHINERAY', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${brand.name}`)

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })

    const allTips: { cat: Cat; tip: TipInput }[] = [
      ...block.MACETES.map((t) => ({ cat: 'MACETES' as Cat, tip: t })),
      ...block.PROBLEMAS.map((t) => ({ cat: 'PROBLEMAS' as Cat, tip: t })),
      ...block.MANUTENCAO.map((t) => ({ cat: 'MANUTENCAO' as Cat, tip: t })),
    ]

    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }, idx) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: idx,
      })),
    })

    console.log(
      `  🔧 ${block.modelName}: ${block.MACETES.length} macetes, ${block.PROBLEMAS.length} problemas, ${block.MANUTENCAO.length} manutenção`,
    )
  }

  console.log('\n  📏 Calibragem de pneus...')
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
    console.log(`  ✅ ${tp.modelName}: ${tp.frontPsi}/${tp.rearPsi} PSI`)
  }

  console.log('\n  🔧 Itens de manutenção...')
  const modelNames = [...new Set(MAINTENANCE_ITEMS.map((m) => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  for (const name of modelNames) {
    const count = MAINTENANCE_ITEMS.filter((m) => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = BLOCKS.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed Shineray 150–170cc concluído: ${BLOCKS.length} modelos, ${totalTips} dicas, ${TIRE_PRESSURES.length} calibragens, ${MAINTENANCE_ITEMS.length} itens de manutenção.`,
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
