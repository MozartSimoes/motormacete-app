// seed-triumph-tiger800.ts — Triumph Tiger 800 (2010-2020): base, SPORT, XC, XCA, XCX, XR, XRT, XRX, XRXL
// Motor 799cc tricilíndrico DOHC 12V líquido-refrigerado, 94 cv @ 9.300 rpm / 79 Nm @ 7.850 rpm — potência
// idêntica nas duas gerações (2010-2014 "gen 1" carburetor-free EFI a cabo | 2015-2020 "gen 2" ride-by-wire,
// alternador 476W, radiador maior). Foi o adventure-trail best-seller da Triumph no Brasil antes da Tiger 900.
// Execute: pnpm --filter @motormacete/database db:seed:triumph-tiger800
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

// ─── TIGER 800 — CONTEÚDO GENÉRICO (motor/elétrica, vale para toda a linha) ───
// Motor: 799cc tricilíndrico DOHC 12V líquido-refrigerado | 94 cv (70kW) @ 9.300 rpm | torque 79 Nm @ 7.850 rpm
// Compressão 12,0:1 | Óleo 10W-40/10W-50 JASO MA2 — 3,6L com filtro / 3,4L só óleo / 4,1L a seco
// Vela NGK CR9EK gap 0,7mm | Filtro de óleo Hiflofiltro HF204 | Corrente 525 × 122-124 elos, pinhão 16T / coroa 50T
// Válvulas: admissão 0,10-0,20mm / escape 0,325-0,375mm | Tanque ~19L | Peso em ordem de marcha ~215kg (XC)

const TIGER800_GENERIC_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40/10W-50 semissintético JASO MA2 — 3,6L com troca de filtro',
    body: 'O tricilíndrico 799cc da Tiger 800 usa embreagem úmida — óleo obrigatoriamente JASO MA2 (nunca MB de carro). Capacidade: 3,4L só óleo / 3,6L trocando o filtro Hiflofiltro HF204 / 4,1L a seco (motor novo/reconstruído). Marcas usadas por concessionárias Triumph no Brasil: Motul 5100/7100 10W-40, Castrol Power1 10W-40. Intervalo oficial: 10.000 km ou 12 meses, o que vier primeiro — reduza para 6.000-8.000 km se o uso for predominantemente urbano ou em trilha com poeira.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EK gap 0,7mm — inspecione junto com a troca de óleo',
    body: 'Vela original: NGK CR9EK, gap de fábrica 0,7mm. Verifique o gap a cada troca de óleo (10.000 km) e planeje a troca das três velas na revisão maior (~19.000-20.000 km / 12.000 milhas). Custo aproximado por unidade em distribuidoras NGK no Brasil: R$ 40-70 — compre o kit completo de 3 velas de uma vez, já que o acesso ao cabeçote exige remoção de carenagem/tanque.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 525 (pinhão 16T / coroa 50T) — lubrifique a cada 500-800 km',
    body: 'Kit de relação original: corrente 525 com X-ring (122 a 124 elos, varia conforme ano/mercado), pinhão 16 dentes, coroa 50 dentes. Lubrifique a cada 500-800 km com spray específico para corrente com X-ring (não usar óleo comum, que dissolve o vedante). Kits compatíveis DID 525VX3 ou RK 525 GXW são amplamente vendidos no Brasil para reposição — custo do kit completo (corrente + pinhão + coroa) fica na faixa de R$ 600-1.200 dependendo da marca.',
  },
  {
    severity: 'OK',
    title: 'Motor tricilíndrico 799cc: um dos mais confiáveis da categoria trail média',
    body: 'A Tiger 800 é considerada uma das motos mais confiáveis já vendidas pela Triumph no Brasil — o motor de origem Daytona/Street Triple (adaptado para baixa rotação) tem histórico sólido quando a manutenção básica é respeitada. Isso, somado ao volume de unidades vendidas entre 2011-2020, faz da Tiger 800 usada uma opção sensata para quem quer entrar na marca com menor risco de dor de cabeça mecânica, desde que o exemplar tenha o cartão de manutenção em dia.',
  },
  {
    severity: 'WARN',
    title: 'Balanceamento dos corpos de borboleta a cada revisão — evita marcha lenta irregular',
    body: 'O sistema de injeção com 3 corpos de borboleta (um por cilindro) precisa estar sincronizado. Sintomas de dessincronização: marcha lenta oscilante, vibração acima do normal, resposta "borrachuda" do acelerador. Serviço requer manômetro de vácuo triplo (ou ferramenta digital Triumph) — geralmente feito junto da troca de óleo em concessionária ou oficina especializada em motos importadas. Custo do serviço avulso: R$ 150-300.',
  },
  {
    severity: 'OK',
    title: 'Peças e suporte de concessionária Triumph disponíveis no Brasil',
    body: 'Diferente de marcas que encerraram operação no país, a Triumph mantém rede de concessionárias ativa no Brasil, com peças originais disponíveis por encomenda (embora com preço mais alto que motos nacionais). Para peças de desgaste (filtros, pastilhas, correntes, velas), há alternativas compatíveis de mercado (Hiflofiltro, EBC, NGK, DID/RK) que reduzem bastante o custo comparado à peça genuína Triumph.',
  },
  {
    severity: 'WARN',
    title: 'Combustível: evite deixar o tanque parado por meses com etanol/gasolina comum',
    body: 'Se a moto ficar parada por longos períodos (mais de 60-90 dias), abasteça com o tanque cheio (reduz condensação) e considere um estabilizador de combustível. Prefira gasolina aditivada de posto de confiança — o sistema de injeção eletrônica é sensível a combustível de baixa qualidade ou com água/impurezas, podendo causar falhas intermitentes de marcha lenta.',
  },
]

const TIGER800_GENERIC_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador retificador (tipo shunt) pode queimar o estator — monitore a tensão da bateria',
    body: 'Problema elétrico mais reportado nos fóruns internacionais da Tiger 800 (tiger800.co.uk, Triumph Rat Forums): o regulador/retificador é do tipo shunt, ou seja, o estator trabalha sempre em potência máxima e o regulador "descarta" o excesso para o terra — isso desgasta o estator ao longo do tempo, e quando uma fase queima, pode levar o regulador junto. Sintoma: bateria descarregando mesmo com moto rodando, luz de bateria acesa, farol/instrumentos piscando. Diagnóstico: multímetro na bateria a 4.000 rpm — deve marcar entre 13,5V e 14,5V. Fora dessa faixa, teste o estator (resistência entre as 3 fases, valores simétricos) antes de trocar só o regulador.',
  },
  {
    severity: 'WARN',
    title: 'Tensionador da corrente de comando: barulho de "clack" na partida a frio',
    body: 'Documentado em vários motores tricilíndricos Triumph da época (Tiger 800, Street Triple, Daytona 675): um estalo/clique metálico nos primeiros segundos após dar partida a frio, tipicamente entre 1.800-2.000 rpm, causado pelo tensionador de corrente de comando hidráulico perdendo pressão residual enquanto a moto fica parada. Na maioria dos casos é inofensivo e some assim que o óleo pressuriza o tensionador, mas se o ruído persistir com o motor já quente ou aumentar de intensidade, vale inspecionar o tensionador (alguns proprietários trocam por versão manual/ajustável para eliminar o folga residual).',
  },
  {
    severity: 'WARN',
    title: 'Dificuldade de dar partida com o motor quente ("heat soak") em unidades mais rodadas',
    body: 'Problema bem discutido nos fóruns internacionais: em dias quentes, após desligar e tentar religar em poucos minutos, o motor de partida pode "engasgar" ou não girar direito. Causas mais comuns, em ordem de probabilidade: escovas do motor de partida desgastadas (exemplares com mais quilometragem), conexões de terra do motor/chassi oxidadas (aumentam resistência quando quentes), ou bateria no limite da vida útil. Antes de trocar o motor de partida (peça cara), limpe e reaperte os cabos de terra do motor e da bateria e teste a tensão em repouso (mínimo 12,4V).',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em conectores elétricos sob o banco — mais comum em regiões litorâneas/úmidas',
    body: 'A caixa elétrica sob o banco (relés, fusíveis, conector principal do chicote) pode acumular umidade se o dreno estiver obstruído, favorecendo corrosão nos contatos — relatos de relés "encharcados" já foram registrados em unidades usadas perto do mar ou guardadas em garagem úmida. Sintomas: falhas elétricas intermitentes (pisca, buzina, ventoinha do radiador), sensores com leitura errática. Prevenção: verificar o dreno da caixa elétrica a cada revisão e aplicar spray dielétrico/protetor de contato (tipo Fluid Film ou similar) nos conectores expostos, especialmente após lavagens.',
  },
  {
    severity: 'WARN',
    title: 'Cilindro escravo de embreagem: vazamento de fluido em alguns exemplares',
    body: 'Vazamento no cilindro escravo hidráulico da embreagem foi reportado por proprietários da linha Tiger — o sintoma é perda progressiva do curso da embreagem ou mancha de fluido (DOT 4) próxima à tampa do lado esquerdo do motor. Não é uma falha epidêmica, mas vale inspecionar visualmente a cada revisão. Se confirmado o vazamento, a troca do kit de vedação (ou do cilindro completo, dependendo da disponibilidade de peças) deve ser feita por mecânico com experiência em Triumph.',
  },
]

const TIGER800_GENERIC_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma geral Tiger 800 (motor/elétrica) — válido para toda a linha 2010-2020',
    body: '10.000 km ou 12 meses — Troca de óleo 10W-40/10W-50 (3,6L) + filtro HF204. Balanceamento dos corpos de borboleta. Verificar gap das velas (NGK CR9EK, 0,7mm). Lubrificar/checar folga da corrente. | 19.000-20.000 km (12.000 milhas) — Grande revisão: folga de válvulas (admissão 0,10-0,20mm / escape 0,325-0,375mm, motor frio), troca das 3 velas, filtro de ar. Algumas fontes/mercados citam checagem de válvulas só aos 24.000 km — confirme no manual do exemplar específico. | 24.000 km — Fluido de freio DOT 4 (frente e trás). | 30.000 km — Kit relação 525 (corrente + pinhão 16T + coroa 50T) se desgastado. | 40.000 km — Avaliação preventiva do regulador/retificador e do estator (ponto de falha elétrica mais comum da geração).',
  },
]

// ─── TIGER 800 XC / XCA / XCX — off-road (rodas raiadas 21"/17", suspensão longo curso) ───
// Pneu: 90/90-21 (F) · 150/70-17 (R) | Pressão solo 36F / 42R PSI
// XC (2010-2014): versão off-road original | XCX (2015-2018): intermediária | XCA (2015-2020): topo de linha,
// suspensão semi-ativa WP eletrônica

const TIGER800_XC_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pneu dianteiro 90/90-21 raiado — pressão 36 PSI (F) / 42 PSI (R) a frio',
    body: 'A família XC/XCA/XCX usa roda dianteira raiada de 21" (pneu 90/90-21) e traseira de 17" (150/70-17), combinação típica de trail/adventure para uso misto estrada-trilha. Pressão recomendada de fábrica: 36 PSI dianteiro / 42 PSI traseiro, sempre calibrado a frio. Pneus recomendados para uso misto: Metzeler Karoo 3, Michelin Anakee Wild ou Pirelli Scorpion Rally — todos disponíveis no mercado brasileiro de pneus para adventure.',
  },
  {
    severity: 'WARN',
    title: 'Protetor de cárter é item recomendado para quem usa a moto em trilha',
    body: 'O motor da Tiger 800 XC fica relativamente exposto na parte inferior. Para uso off-road regular, instale um protetor de cárter (skid plate) de alumínio — reduz o risco de dano por impacto de pedras no cárter do motor e no radiador de óleo. Modelos de reposição (SW-Motech, Touratech) são facilmente encontrados para importação ou em lojas especializadas em adventure no Brasil.',
  },
  {
    severity: 'OK',
    title: 'Rodas raiadas 21"/17" — verifique o aperto dos raios a cada revisão',
    body: 'Diferente das rodas fundidas da linha XR, as rodas raiadas da XC/XCA/XCX pedem verificação periódica do aperto dos raios (o "tensionamento"), principalmente após uso mais intenso em trilha ou pavimento ruim. Raios soltos causam empenamento ao longo do tempo e desbalanceamento perceptível em velocidade de estrada.',
  },
  {
    severity: 'WARN',
    title: 'Vedantes de bengala de curso longo desgastam mais rápido com poeira e lama',
    body: 'A suspensão de curso mais longo da XC (dianteira e traseira) fica mais exposta a poeira e lama em uso off-road, o que acelera o desgaste dos vedantes (retentores) da bengala em comparação com o uso apenas asfáltico. Limpe os tubos internos da bengala após cada saída em trilha (pano limpo, sem solvente agressivo) e fique atento a manchas de óleo — sinal de que o vedante já está no fim da vida útil.',
  },
  {
    severity: 'OK',
    title: 'XCA (2015-2020): suspensão semi-ativa WP eletrônica é o grande diferencial da versão topo de linha',
    body: 'A Tiger 800 XCA trouxe suspensão semi-ativa WP com ajuste eletrônico de amortecimento (dianteiro e traseiro), selecionável entre modos de pilotagem. É a versão mais sofisticada da família XC — boa opção de compra usada para quem já conhece a marca e quer o pacote mais completo, mas atenção redobrada ao estado do sistema eletrônico da suspensão na hora de comprar (veja PROBLEMAS abaixo).',
  },
  {
    severity: 'OK',
    title: 'Modelo consolidado da Triumph no Brasil — bom histórico para quem busca usada',
    body: 'A Tiger 800 (toda a família XC) foi o adventure best-seller da Triumph no país por quase uma década, antes da chegada da Tiger 900. Isso significa maior volume de unidades em circulação, mais oficinas com experiência no modelo e mercado de peças de reposição mais maduro que em lançamentos recentes — fatores que pesam a favor de quem considera comprar uma usada.',
  },
]

const TIGER800_XC_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cárter e radiador de óleo expostos a impacto de pedras em uso off-road',
    body: 'Sem protetor de cárter instalado, o uso frequente em trilha aumenta o risco de amassamento ou perfuração do cárter/radiador de óleo por impacto de pedras. Após qualquer saída off-road mais pesada, inspecione visualmente a parte inferior do motor em busca de vazamento ou marcas de impacto recentes.',
  },
  {
    severity: 'WARN',
    title: 'Vedante de bengala (uso off-road exigente): troca mais frequente que na versão de estrada',
    body: 'Em comparação com a linha XR, a XC/XCA/XCX tende a precisar de troca de vedante de bengala dianteira mais cedo quando o uso off-road é frequente (poeira/lama abrasiva). Fique atento a óleo escuro escorrendo pelo tubo interno — é o primeiro sinal visível.',
  },
  {
    severity: 'WARN',
    title: 'XCA: falha do sensor da suspensão eletrônica WP pode gerar código de erro no painel',
    body: 'Por ser um sistema eletrônico mais complexo, a suspensão semi-ativa WP da XCA pode apresentar falha de sensor, resultando em código de erro exibido no painel TFT e a suspensão "travando" em um modo padrão de segurança. O diagnóstico correto exige o scanner de diagnóstico Triumph (disponível em concessionárias) — antes de comprar uma XCA usada, vale testar todos os modos de suspensão para confirmar que o sistema responde normalmente.',
  },
  {
    severity: 'WARN',
    title: 'Corrente e kit relação desgastam mais rápido com poeira/lama do uso off-road',
    body: 'O ambiente de trilha (poeira, lama, água) acelera o desgaste do kit de relação em comparação com uso apenas em asfalto. Para quem usa a XC/XCA/XCX regularmente fora de estrada, reduza o intervalo de lubrificação da corrente para 300-500 km (em vez dos 500-800 km padrão) e inspecione visualmente após cada saída.',
  },
]

const TIGER800_XC_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma específico XC/XCA/XCX (itens de chassi/suspensão off-road)',
    body: 'Após cada saída off-road — Inspeção visual do cárter, radiador de óleo e vedantes de bengala. Limpeza dos tubos internos da suspensão. | 3.000-6.000 km — Verificar aperto dos raios das rodas. Inspecionar protetor de cárter (se instalado). | 6.000 km — Lubrificação mais frequente da corrente (300-500 km em uso off-road intenso). | 12.000 km — Inspeção de vedantes de bengala dianteira e dos amortecedores traseiros. | Anual (XCA) — Diagnóstico do sistema de suspensão eletrônica WP na concessionária, especialmente antes de viagens longas.',
  },
]

// ─── TIGER 800 (base) / SPORT / XR / XRT / XRX / XRXL — road (rodas fundidas 19"/17") ───
// Pneu: 100/90-19 (F) · 150/70-17 (R) | Pressão 36F / 42R PSI
// Base (2010-2014): versão de estrada original, antes da nomenclatura XR existir | XR/XRX (2015-2018/2020):
// ride-by-wire, cruise control eletrônico nas versões "x" | XRT (2018-2020): topo de linha, suspensão WP eletrônica
// | XRXL (2015-2018): assento/tanque mais baixo | SPORT: versão road mais recente, foco em uso rodoviário

const TIGER800_XR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pneu dianteiro 100/90-19 (rodas fundidas) — pressão 36 PSI (F) / 42 PSI (R) a frio',
    body: 'A linha road (base, SPORT, XR, XRT, XRX, XRXL) usa rodas fundidas em liga leve — dianteira 19" (pneu 100/90-19) e traseira 17" (150/70-17), diferente das rodas raiadas 21" da família XC. Pressão de fábrica: 36 PSI dianteiro / 42 PSI traseiro, a frio. Por rodar majoritariamente em asfalto, pneus mais voltados a rodovia (Pirelli Scorpion Trail, Metzeler Tourance) rendem melhor quilometragem que os off-road da XC.',
  },
  {
    severity: 'OK',
    title: 'XR/XRT/XRX (2015+): ride-by-wire e cruise control eletrônico nas versões "x" e no XRT',
    body: 'A atualização de 2015 trouxe acelerador eletrônico (ride-by-wire) para toda a linha, com mapas de potência selecionáveis e cruise control eletrônico disponível nas versões XRx e no topo de linha XRT. Ao comprar uma unidade usada, teste o cruise control e a troca de mapas de potência no painel — são os itens eletrônicos mais visados nessas versões.',
  },
  {
    severity: 'OK',
    title: 'XRT: suspensão WP eletronicamente ajustável é o diferencial da versão topo de linha',
    body: 'A XRT (2018-2020) é a versão de estrada mais completa da família, com suspensão WP com ajuste eletrônico de amortecimento — equivalente em sofisticação à XCA da linha off-road, mas com geometria e pneus voltados a asfalto. Antes de comprar usada, teste todos os modos de suspensão disponíveis no painel.',
  },
  {
    severity: 'OK',
    title: 'XRXL: assento e tanque mais baixos — boa opção para pilotos de estatura menor',
    body: 'A variante XRXL (2015-2018) tem altura de assento reduzida em relação à XRX, mantendo a mesma mecânica. É uma alternativa interessante para quem gosta da Tiger 800 mas tem dificuldade de apoiar os pés na versão padrão — vale considerar na busca por uma usada se a estatura do piloto for um fator decisivo.',
  },
  {
    severity: 'WARN',
    title: 'Pneus de estrada 19" desgastam mais rápido com uso constante em rodovia/cidade',
    body: 'Por rodar quase exclusivamente em asfalto, a linha road tende a gastar o pneu traseiro mais rápido que a XC em uso equivalente, especialmente em pilotagem mais acelerada. Fique atento ao desgaste irregular (mais no centro em uso predominante de rodovia reta) e faça rotação/balanceamento nas revisões.',
  },
]

const TIGER800_XR_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vibração perceptível em alta velocidade — verifique o balanceamento das rodas fundidas',
    body: 'Se surgir vibração no guidão ou nos pés a partir de determinada velocidade (tipicamente acima de 100 km/h), o primeiro suspeito é o balanceamento das rodas fundidas — mais sensível a esse tipo de vibração que as rodas raiadas da XC. Balanceamento pode ser feito em qualquer borracheiro; se a vibração persistir, verifique também o aperto dos parafusos de fixação do motor e o estado dos rolamentos de roda.',
  },
  {
    severity: 'WARN',
    title: 'Cruise control eletrônico (XRx/XRT): falha de sensor no punho do acelerador',
    body: 'Em versões equipadas com cruise control eletrônico, uma falha no sensor de posição do punho do acelerador pode desativar o recurso ou causar resposta irregular de aceleração. Se o cruise control parar de funcionar ou o acelerador ficar "duro"/inconsistente, o diagnóstico deve ser feito com scanner Triumph antes de se assumir troca de peça.',
  },
  {
    severity: 'WARN',
    title: 'XRT: sensor de inclinação (lean angle) do ABS cornering é sensível a quedas/pancadas',
    body: 'A XRT conta com ABS sensível à inclinação (cornering ABS), que depende de um sensor de ângulo/giroscópio. Quedas ou pancadas na região onde o sensor está instalado podem descalibrar o sistema, acendendo luz de alerta no painel. Ao comprar uma XRT usada com histórico de queda, vale confirmar que o sistema de ABS cornering está funcionando corretamente.',
  },
  {
    severity: 'WARN',
    title: 'Mesma vulnerabilidade elétrica da geração: regulador/retificador e estator',
    body: 'A linha road compartilha o mesmo motor e sistema de carga da linha XC — portanto está sujeita ao mesmo ponto de falha elétrica mais comum da geração (regulador tipo shunt que pode levar o estator junto). Veja os detalhes e o procedimento de diagnóstico no bloco geral de PROBLEMAS da Tiger 800.',
  },
]

const TIGER800_XR_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma específico linha road (pneus/eletrônica de estrada)',
    body: '10.000 km — Rotação e inspeção de desgaste dos pneus 100/90-19 (F) e 150/70-17 (R). Balanceamento das rodas fundidas. | Anual (a partir de 2015) — Verificação de firmware/atualizações do sistema ride-by-wire, cruise control e painel TFT na concessionária — modelos 2010-2014 usam acelerador a cabo convencional e não se aplicam a este item. | Ao comprar usada — Testar todos os modos de suspensão eletrônica (XRT) e o funcionamento do cruise control (XRx/XRT) antes de fechar negócio.',
  },
]

// ─── BLOCOS DE TIPS (hierárquico: genérico "TIGER 800" casa com todas as variantes + blocos específicos) ───

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'TIGER 800',
    yearFrom: 2010,
    yearTo: 2020,
    MACETES: TIGER800_GENERIC_MACETES,
    PROBLEMAS: TIGER800_GENERIC_PROBLEMAS,
    MANUTENCAO: TIGER800_GENERIC_MANUTENCAO,
  },
  {
    modelName: 'TIGER 800 XC',
    yearFrom: 2010,
    yearTo: 2014,
    MACETES: TIGER800_XC_MACETES,
    PROBLEMAS: TIGER800_XC_PROBLEMAS,
    MANUTENCAO: TIGER800_XC_MANUTENCAO,
  },
  {
    modelName: 'TIGER 800 XCA',
    yearFrom: 2015,
    yearTo: 2020,
    MACETES: TIGER800_XC_MACETES,
    PROBLEMAS: TIGER800_XC_PROBLEMAS,
    MANUTENCAO: TIGER800_XC_MANUTENCAO,
  },
  {
    modelName: 'TIGER 800 XCX',
    yearFrom: 2015,
    yearTo: 2018,
    MACETES: TIGER800_XC_MACETES,
    PROBLEMAS: TIGER800_XC_PROBLEMAS,
    MANUTENCAO: TIGER800_XC_MANUTENCAO,
  },
  {
    modelName: 'TIGER 800 SPORT',
    yearFrom: 2019,
    yearTo: 2020,
    MACETES: TIGER800_XR_MACETES,
    PROBLEMAS: TIGER800_XR_PROBLEMAS,
    MANUTENCAO: TIGER800_XR_MANUTENCAO,
  },
  {
    modelName: 'TIGER 800 XR',
    yearFrom: 2015,
    yearTo: 2020,
    MACETES: TIGER800_XR_MACETES,
    PROBLEMAS: TIGER800_XR_PROBLEMAS,
    MANUTENCAO: TIGER800_XR_MANUTENCAO,
  },
  {
    modelName: 'TIGER 800 XRT',
    yearFrom: 2018,
    yearTo: 2020,
    MACETES: TIGER800_XR_MACETES,
    PROBLEMAS: TIGER800_XR_PROBLEMAS,
    MANUTENCAO: TIGER800_XR_MANUTENCAO,
  },
  {
    modelName: 'TIGER 800 XRX',
    yearFrom: 2015,
    yearTo: 2018,
    MACETES: TIGER800_XR_MACETES,
    PROBLEMAS: TIGER800_XR_PROBLEMAS,
    MANUTENCAO: TIGER800_XR_MANUTENCAO,
  },
  {
    modelName: 'TIGER 800 XRXL',
    yearFrom: 2015,
    yearTo: 2018,
    MACETES: TIGER800_XR_MACETES,
    PROBLEMAS: TIGER800_XR_PROBLEMAS,
    MANUTENCAO: TIGER800_XR_MANUTENCAO,
  },
]

// ─── CALIBRAGENS (agrupadas por geração/versão — off-road 21" vs road 19") ────

const XC_TIRE_FAMILY = [
  { modelName: 'TIGER 800 XC', yearFrom: 2010, yearTo: 2014 },
  { modelName: 'TIGER 800 XCA', yearFrom: 2015, yearTo: 2020 },
  { modelName: 'TIGER 800 XCX', yearFrom: 2015, yearTo: 2018 },
]

const XR_TIRE_FAMILY = [
  { modelName: 'TIGER 800', yearFrom: 2010, yearTo: 2014 },
  { modelName: 'TIGER 800 SPORT', yearFrom: 2019, yearTo: 2020 },
  { modelName: 'TIGER 800 XR', yearFrom: 2015, yearTo: 2020 },
  { modelName: 'TIGER 800 XRT', yearFrom: 2018, yearTo: 2020 },
  { modelName: 'TIGER 800 XRX', yearFrom: 2015, yearTo: 2018 },
  { modelName: 'TIGER 800 XRXL', yearFrom: 2015, yearTo: 2018 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  ...XC_TIRE_FAMILY.map((m) => ({
    modelName: m.modelName,
    yearFrom: m.yearFrom,
    yearTo: m.yearTo,
    tireSize: '90/90-21 (F) · 150/70-17 (R)',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: null,
    rearPsiLoad: null,
    notes: 'Rodas raiadas 21"/17" (versão off-road). Pressão de fábrica a frio: 36 PSI (F) / 42 PSI (R). O manual do proprietário não especifica pressão diferenciada com garupa/bagagem — mantenha 36/42 PSI também com carga, priorizando o ajuste da pré-carga da suspensão traseira para compensar o peso extra. Pneus recomendados: Metzeler Karoo 3, Michelin Anakee Wild.',
  })),
  ...XR_TIRE_FAMILY.map((m) => ({
    modelName: m.modelName,
    yearFrom: m.yearFrom,
    yearTo: m.yearTo,
    tireSize: '100/90-19 (F) · 150/70-17 (R)',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: null,
    rearPsiLoad: null,
    notes: 'Rodas fundidas 19"/17" (versão de estrada). Pressão de fábrica a frio: 36 PSI (F) / 42 PSI (R). O manual do proprietário não especifica pressão diferenciada com garupa/bagagem — mantenha 36/42 PSI também com carga, priorizando o ajuste da pré-carga da suspensão traseira para compensar o peso extra. Pneus recomendados: Pirelli Scorpion Trail II, Metzeler Tourance Next.',
  })),
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const GENERIC_MAINT_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'TIGER 800', yearFrom: 2010, yearTo: 2020, component: 'Óleo 10W-40/10W-50 JASO MA2 + filtro Hiflofiltro HF204 (3,6L)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor tricilíndrico 799cc com embreagem úmida. Nunca usar óleo JASO MB. Reduza para 6.000-8.000 km em uso urbano ou off-road intenso.', priority: 'HIGH', order: 1 },
  { modelName: 'TIGER 800', yearFrom: 2010, yearTo: 2020, component: 'Vela NGK CR9EK ×3 (gap 0,7mm)', intervalKm: 19000, intervalMonths: null, notes: 'Verificar gap a cada troca de óleo. Troca das 3 velas na grande revisão (~12.000 milhas).', priority: 'MEDIUM', order: 2 },
  { modelName: 'TIGER 800', yearFrom: 2010, yearTo: 2020, component: 'Lubrificação corrente 525 (pinhão 16T / coroa 50T)', intervalKm: 600, intervalMonths: null, notes: 'Usar spray específico para corrente com X-ring. Intervalo de 500-800 km conforme uso.', priority: 'HIGH', order: 3 },
  { modelName: 'TIGER 800', yearFrom: 2010, yearTo: 2020, component: 'Balanceamento dos 3 corpos de borboleta', intervalKm: 10000, intervalMonths: 12, notes: 'Requer manômetro de vácuo triplo ou ferramenta digital Triumph. Sintoma de dessincronia: marcha lenta oscilante.', priority: 'MEDIUM', order: 4 },
  { modelName: 'TIGER 800', yearFrom: 2010, yearTo: 2020, component: 'Folga de válvulas (adm 0,10-0,20mm / esc 0,325-0,375mm)', intervalKm: 19000, intervalMonths: null, notes: 'Motor frio. Algumas fontes citam checagem só aos 24.000 km — confirmar no manual do exemplar.', priority: 'HIGH', order: 5 },
  { modelName: 'TIGER 800', yearFrom: 2010, yearTo: 2020, component: 'Filtro de ar', intervalKm: 19000, intervalMonths: 24, notes: 'Trocar junto com a grande revisão (folga de válvulas + velas).', priority: 'MEDIUM', order: 6 },
  { modelName: 'TIGER 800', yearFrom: 2010, yearTo: 2020, component: 'Fluido de freio DOT 4 (frente + trás)', intervalKm: 24000, intervalMonths: 24, notes: 'Bienal obrigatório — o fluido absorve umidade e perde ponto de ebulição.', priority: 'HIGH', order: 7 },
  { modelName: 'TIGER 800', yearFrom: 2010, yearTo: 2020, component: 'Kit relação 525 (corrente + pinhão 16T + coroa 50T)', intervalKm: 30000, intervalMonths: null, notes: 'Trocar kit completo, nunca só a corrente com coroa/pinhão desgastados.', priority: 'HIGH', order: 8 },
  { modelName: 'TIGER 800', yearFrom: 2010, yearTo: 2020, component: 'Verificação do regulador/retificador (13,5-14,5V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha elétrica mais comum da geração — regulador tipo shunt pode levar o estator junto.', priority: 'CRITICAL', order: 9 },
  { modelName: 'TIGER 800', yearFrom: 2010, yearTo: 2020, component: 'Inspeção do cilindro escravo de embreagem (vazamento de fluido)', intervalKm: 10000, intervalMonths: 12, notes: 'Verificar visualmente próximo à tampa do lado esquerdo do motor a cada revisão.', priority: 'MEDIUM', order: 10 },
]

const XC_MAINT_FAMILY = [
  { modelName: 'TIGER 800 XC', yearFrom: 2010, yearTo: 2014 },
  { modelName: 'TIGER 800 XCA', yearFrom: 2015, yearTo: 2020 },
  { modelName: 'TIGER 800 XCX', yearFrom: 2015, yearTo: 2018 },
]

const XC_MAINT_EXTRA: Omit<MaintenanceItemInput, 'modelName' | 'yearFrom' | 'yearTo'>[] = [
  { component: 'Inspeção do protetor de cárter e vedantes de bengala (uso off-road)', intervalKm: 3000, intervalMonths: 6, notes: 'Realizar após saídas de trilha mais intensas — verificar impacto de pedras e vazamento de óleo pelos vedantes.', priority: 'HIGH', order: 11 },
  { component: 'Aperto dos raios das rodas raiadas 21"/17"', intervalKm: 6000, intervalMonths: 12, notes: 'Raios soltos causam empenamento e desbalanceamento em velocidade de estrada.', priority: 'MEDIUM', order: 12 },
  { component: 'Lubrificação da corrente em uso off-road intenso', intervalKm: 300, intervalMonths: null, notes: 'Reduzir o intervalo padrão de 500-800 km para 300-500 km quando o uso for predominantemente em trilha (poeira/lama).', priority: 'HIGH', order: 13 },
]

const XR_MAINT_FAMILY = [
  { modelName: 'TIGER 800 SPORT', yearFrom: 2019, yearTo: 2020 },
  { modelName: 'TIGER 800 XR', yearFrom: 2015, yearTo: 2020 },
  { modelName: 'TIGER 800 XRT', yearFrom: 2018, yearTo: 2020 },
  { modelName: 'TIGER 800 XRX', yearFrom: 2015, yearTo: 2018 },
  { modelName: 'TIGER 800 XRXL', yearFrom: 2015, yearTo: 2018 },
]

const XR_MAINT_EXTRA: Omit<MaintenanceItemInput, 'modelName' | 'yearFrom' | 'yearTo'>[] = [
  { component: 'Rotação/inspeção de desgaste dos pneus 100/90-19 (F) e 150/70-17 (R)', intervalKm: 10000, intervalMonths: null, notes: 'Rodas fundidas: mais sensível a vibração por desbalanceamento que as rodas raiadas da XC.', priority: 'MEDIUM', order: 11 },
  { component: 'Verificação de firmware/eletrônica (ride-by-wire, cruise control, painel TFT)', intervalKm: null, intervalMonths: 12, notes: 'Aplica-se a partir de 2015 (ride-by-wire de série). Modelos 2010-2014 usam acelerador a cabo convencional.', priority: 'LOW', order: 12 },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...GENERIC_MAINT_ITEMS,
  ...XC_MAINT_FAMILY.flatMap((m) =>
    XC_MAINT_EXTRA.map((item) => ({ modelName: m.modelName, yearFrom: m.yearFrom, yearTo: m.yearTo, ...item })),
  ),
  ...XR_MAINT_FAMILY.flatMap((m) =>
    XR_MAINT_EXTRA.map((item) => ({ modelName: m.modelName, yearFrom: m.yearFrom, yearTo: m.yearTo, ...item })),
  ),
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Triumph Tiger 800 (base / SPORT / XC / XCA / XCX / XR / XRT / XRX / XRXL)...')

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

  console.log('✅ Triumph Tiger 800 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
