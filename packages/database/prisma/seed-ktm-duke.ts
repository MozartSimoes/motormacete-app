// seed-ktm-duke.ts — KTM Duke 200/ABS, Duke 390, Duke 640/Duke II 640, Duke 690 e 990 Duke
// Linha "naked street" austríaca. Rede de peças no Brasil menor que Honda/Yamaha —
// muitos itens de manutenção dependem de importação, distribuidores especializados KTM
// ou compatibilidade com peças genéricas europeias/indianas (Bajaj, no caso da 200/390).
// Execute: pnpm --filter @motormacete/database db:seed:ktm-duke
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

// ─── DUKE 200/ABS ──────────────────────────────────────────────────────────────
// Motor: 199,5cc monocilíndrico DOHC 4 válvulas, refrigerado a líquido | ~25 cv @ 10.000 rpm
// Torque: ~1,9 kgf.m @ 8.000 rpm | Injeção eletrônica (Keihin/Bosch) | Fabricada pela Bajaj (Índia)
// Óleo: 10W-30/10W-40 API SL JASO MA, ~1,5L (cárter) | Vela: NGK padrão (equivalente iridium disponível)
// Pneu: 110/70-17 (F) / 140/70-17 (R) | Corrente 520 | Relação 42x14 | Tanque 13,7L (11L em versões antigas)

const DUKE200_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 (ou 10W-40) API SL JASO MA — cárter leva ~1,5L; troque a cada 7.500 km',
    body: 'A KTM recomenda óleo 10W-30 API SL JASO MA para o motor 199,5cc DOHC da Duke 200. Capacidade do cárter: aproximadamente 1,5L (alguns manuais/kits de troca no Brasil usam referência de até 1,6-1,7L incluindo galeria e filtro — sempre complete olhando o visor lateral, não só pela quantidade despejada). JASO MA é obrigatório por causa da embreagem multidisco em banho de óleo. Opções vendidas no Brasil: Motul 5100 10W-40 semissintético (custo-benefício) ou Motul 300V 15W50 (mais usado por concessionárias/preparadores, também JASO MA aprovado). Intervalo oficial: 7.500 km — reduza para 5.000 km em uso urbano intenso com trânsito parado.',
  },
  {
    severity: 'OK',
    title: 'Vela de ignição: troque junto com o filtro de óleo; use NGK iridium para folga maior entre trocas',
    body: 'A Duke 200 usa vela de ignição NGK (verifique o código exato na tampa da vela ou manual, pois variou entre gerações 2012-2015 vs 2016+). Vela iridium NGK (linha "I" ou "IX") dura sensivelmente mais que a convencional e mantém a centelha mais estável em baixa rotação — vale o investimento (~R$ 60-90) considerando que concessionárias KTM cobram mão de obra mais cara que rede genérica. Intervalo recomendado: inspeção a cada 7.500 km, troca a cada 15.000 km (convencional) ou 20.000+ km (iridium).',
  },
  {
    severity: 'WARN',
    title: 'Corrente e relação 520 (42x14): ovalização do pinhão é queixa recorrente — troque o KIT completo',
    body: 'Um dos problemas mais relatados por donos de Duke 200 no Brasil é a ovalização (desgaste irregular) do conjunto corrente/pinhão/coroa, às vezes já por volta de 15.000-17.000 km — bem antes do esperado para uma moto de uso urbano. Sintoma: engasgos leves, trepidação na retomada, folga excessiva mesmo após ajuste. Solução: substituir SEMPRE o kit relação completo (corrente 520 + pinhão 14 dentes + coroa 42 dentes) — marca Vaz é vendida no Brasil como opção nacional/compatível, custo mais em conta que peça KTM original. Lubrifique a corrente a cada 500 km para não acelerar esse desgaste.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo original é caro — filtro compatível de outras KTM pequenas serve',
    body: 'O filtro de óleo da Duke 200 é compartilhado com outros modelos de plataforma Bajaj/KTM pequena (Duke 390, RC200, RC390 da mesma geração usam peças de motor semelhantes). Ao comprar em concessionária, compare o preço do filtro genuíno com opções de fornecedores de peças para motos importadas — a diferença de preço costuma ser grande e a compatibilidade é real na maioria dos casos. Sempre lubrifique o O-ring do filtro novo com óleo limpo antes de instalar.',
  },
  {
    severity: 'WARN',
    title: 'Peças elétricas: regulador retificador tem opções nacionais (Wortech, Chiaratto) bem mais baratas que a original',
    body: 'A rede de peças KTM no Brasil é bem menor que Honda/Yamaha, e isso pesa mais em itens elétricos. Boa notícia: já existem reguladores retificadores compatíveis específicos para Duke 200 fabricados por marcas nacionais (Wortech, Chiaratto), vendidos por uma fração do preço da peça genuína KTM — geralmente funcionam bem como reposição. Evite instalar LED de alta potência sem checar a compatibilidade elétrica: há relatos de sobrecarga no sistema de carga com lâmpadas LED genéricas, o que pode até queimar módulo e chicote.',
  },
  {
    severity: 'OK',
    title: 'Pneus: Duke 200 é leve e ágil — Pirelli e Michelin têm linha específica para o aro 17/17',
    body: 'Medida original: 110/70-17 dianteiro e 140/70-17 traseiro. Boas opções vendidas no Brasil: Pirelli Sport Demon (mais econômico, bom para uso urbano), Michelin Pilot Street (equilíbrio custo-benefício), ou Pirelli Diablo Rosso (mais esportivo, para quem gosta de explorar a agilidade da moto). Evite pneus muito baratos sem marca reconhecida — a Duke 200 tem centro de gravidade alto e responde de forma mais nervosa a pneus de banda de rodagem ruim.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem "pulando" na redução de marcha: normalmente é folga do cabo, não desgaste do disco',
    body: 'Alguns donos relatam a embreagem "pulando" ou engatando de forma abrupta durante reduções de marcha. Antes de suspeitar de disco de embreagem gasto, verifique a folga do cabo de embreagem (ou do atuador hidráulico em versões que tiverem) — regulagem incorreta é a causa mais comum e mais barata de resolver. Se o problema persistir mesmo com a folga correta, aí sim vale investigar discos e mola de embreagem, cujo desgaste acelera com trocas de marcha muito bruscas ou embreagem "arrastada" no trânsito.',
  },
]

const DUKE200_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ovalização do pinhão/coroa é o problema mais comum reportado por donos brasileiros',
    body: 'Diversos relatos de proprietários de Duke 200 no Brasil mencionam desgaste irregular (ovalização) do pinhão de saída antes dos 20.000 km, alguns casos ainda mais cedo. É considerado praticamente uma característica conhecida da plataforma Bajaj/KTM pequena no uso urbano brasileiro (trânsito parado, embreagem sendo usada com frequência, calor do motor). Prevenção: lubrificação frequente da corrente (a cada 500 km) e trocar o kit relação completo ao primeiro sinal de folga irregular — não insista em rodar com o pinhão gasto, pois acelera o desgaste da coroa e da própria corrente.',
  },
  {
    severity: 'WARN',
    title: 'Regulador retificador: cintilação de luzes e bateria que não segura carga',
    body: 'Sintomas relatados: farol/luzes de painel cintilando (principalmente em acelerações/desacelerações), bateria descarregando mesmo após recarga completa ou substituição. A causa mais frequente é o regulador retificador não entregando a tensão de carga correta ao sistema. Diagnóstico com multímetro: tensão na bateria deve ficar entre 13,5-14,8V com o motor em rotação de marcha (~4.000 rpm). Fora dessa faixa, o regulador é o suspeito número um. Peças compatíveis nacionais (Wortech, Chiaratto) resolvem por preço bem menor que a peça KTM original.',
  },
  {
    severity: 'WARN',
    title: 'Custo de manutenção considerado alto pelos proprietários — revisões a cada 7.500 km em concessionária saem caras',
    body: 'É queixa recorrente entre donos de Duke 200 no Brasil o custo das revisões programadas em concessionária (intervalo de 7.500 km é mais curto que muitas concorrentes japonesas/chinesas de mesma cilindrada, e a mão de obra + peças KTM tendem a ser mais caras). Alternativa: aprender a fazer trocas de óleo e itens simples em casa (óleo, filtro, vela, corrente) usando peças compatíveis, reservando a concessionária apenas para itens que exigem ferramenta especial ou estão na garantia.',
  },
  {
    severity: 'DANGER',
    title: 'Modificações elétricas (LED, alarmes) sem cuidado podem sobrecarregar o sistema de carga',
    body: 'Casos relatados de sistema elétrico sobrecarregado após instalação de lâmpadas LED de alta potência ou acessórios elétricos sem o devido cuidado com a fiação — resultado: derretimento de conectores do chicote, queima de regulador retificador e até de módulo de injeção em casos extremos. Se for instalar qualquer acessório elétrico, use fiação de bitola adequada, fusível próprio e, idealmente, um relé — nunca puxe corrente direto de um conector do chicote original sem saber sua capacidade.',
  },
  {
    severity: 'WARN',
    title: 'Protetor de corrente (cobre-corrente) tem baixa eficiência — corrente exposta suja com facilidade',
    body: 'Vários proprietários notam que o protetor de corrente de fábrica da Duke 200 protege pouco contra sujeira e água, deixando a corrente exposta a graxa/sujeira da estrada. Isso acelera o desgaste se a lubrificação não for feita com frequência. Recomenda-se limpar a corrente com querosene ou desengraxante específico e lubrificar a cada 500 km (ou sempre depois de pegar chuva), sem depender do protetor de fábrica para isso.',
  },
]

const DUKE200_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Duke 200/ABS: revisões a cada 7.500 km conforme manual KTM',
    body: '1.000 km — Primeira revisão gratuita (torque geral, óleo se necessário). | 7.500 km — Troca de óleo (10W-30/10W-40 JASO MA, ~1,5L) + filtro de óleo. Inspeção de vela, corrente e folga de embreagem. | 15.000 km — Troca de óleo + filtro. Troca de vela. Inspeção de válvulas. Verificar desgaste do kit relação (pinhão/coroa/corrente) — troque se houver ovalização. | 22.500 km — Óleo + filtro novamente. Fluido de freio (verificar nível/cor). | 30.000 km — Óleo + filtro + vela. Revisão de válvulas (folga). Verificação de rolamentos de roda e direção. Substituir kit relação preventivamente se ainda não trocado. | Lubrificação de corrente: a cada 500 km, sempre.',
  },
]

// ─── DUKE 390 ──────────────────────────────────────────────────────────────────
// Motor: monocilíndrico DOHC 4 válvulas refrigerado a líquido — 373cc (2013-2016 primeira geração
// e também 2017-2023 segunda geração com atualizações) evoluindo para 399cc na terceira geração (2024+)
// Potência: ~44 cv (373cc, ambas as gerações) / ~44,25 cv (399cc, geração atual) | Torque: ~3,5-3,9 kgf.m
// Injeção eletrônica Bosch | Óleo: ~1,7-1,8L JASO MA (verificar sempre pelo visor lateral)
// Pneu: 110/70-17 (F) / 150/60-17 (R, geração atual — versões antigas usaram 150/70-17)
// Corrente 520 | Tanque: 13,4L | Quickshifter de fábrica nas versões mais recentes

const DUKE390_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Três gerações de motor: confira o ano antes de comprar peças — 373cc (2013-2023) e 399cc (2024+)',
    body: 'A Duke 390 já passou por três gerações de motor mono-cilíndrico DOHC: a primeira (2013-2016) com 375cc entregando cerca de 44 cv, a segunda (2017-2023) com 373,2cc atualizado (mesma potência de ~44 cv mas curva de torque revisada), e a mais recente (2024+) com 399cc, curso mais longo (89x64mm) e ~44,25 cv com maior eficiência de combustível. Peças de motor (pistão, anéis, junta de cabeçote) NÃO são intercambiáveis entre gerações — sempre confira o ano/geração exata da moto antes de comprar peça de motor, mesmo que o "modelo" pareça igual.',
  },
  {
    severity: 'OK',
    title: 'Óleo JASO MA — capacidade prática gira em torno de 1,7-1,8L; complete sempre olhando o visor',
    body: 'O manual indica cerca de 1,6-1,7L de óleo sem troca de filtro, mas relatos de proprietários mostram que, na prática, muitas vezes é necessário completar até 1,8-1,9L para atingir o nível correto no visor lateral (a diferença varia com posicionamento da moto e resíduo de óleo antigo). Regra de ouro: NUNCA confie apenas na quantidade despejada — sempre confira com a moto na vertical (cavalete central, se tiver, ou nivelada) e o motor morno, olhando o visor de inspeção lateral. Use óleo JASO MA (Motul 5100 10W-40 ou Motul 300V 15W50, ambos comuns em kits de troca vendidos no Brasil).',
  },
  {
    severity: 'OK',
    title: 'Vela e velas de ignição: consulte o código exato por geração — não são todas iguais',
    body: 'O código da vela NGK varia conforme a geração do motor (373cc vs 399cc) e ano de fabricação — sempre confirme no manual do proprietário específico do seu ano ou pelo código gravado na vela antiga antes de comprar a de reposição. Prefira NGK Iridium quando disponível para o seu ano/modelo — a folga entre trocas aumenta e a resposta em baixa rotação é mais estável, importante num monocilíndrico de alta rotação como o da 390.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 520 e coroa: ovalização do pinhão de saída é queixa recorrente, assim como na Duke 200',
    body: 'Assim como a Duke 200 (que compartilha base de projeto Bajaj), a Duke 390 também tem relatos de ovalização prematura do pinhão de saída, em alguns casos por volta de 15.000-17.000 km. Sintoma: engasgo leve em uso urbano, sensação de "corrente arrastando", necessidade de embreagem e acelerações extras para compensar folga. Ao notar esse comportamento, não adianta só ajustar a corrente — troque o kit relação completo (520). Lubrifique a corrente a cada 500 km para maximizar a vida útil.',
  },
  {
    severity: 'WARN',
    title: 'Peças no Brasil: rede menor que Honda/Yamaha — priorize concessionária ou importadores especializados KTM',
    body: 'A Duke 390 tem rede de peças mais restrita no Brasil comparada a marcas japonesas populares. Itens de desgaste comuns (pastilha de freio, kit relação, filtros) muitas vezes só são encontrados em concessionária KTM ou importadores especializados (ex: fóruns e grupos de proprietários costumam indicar fornecedores confiáveis). Pneus (Pirelli, Michelin, Metzeler) e óleo (Motul) têm distribuição nacional ampla e não costumam ser um problema. Planeje-se: peças de motor ou elétrica específica podem levar semanas para chegar se não estiverem em estoque local.',
  },
  {
    severity: 'OK',
    title: 'Quickshifter (quando equipado): sensor de troca é sensível — cuide da instalação e calibragem',
    body: 'Versões mais recentes da Duke 390 vêm com quickshifter bidirecional de fábrica. Há relatos de mau funcionamento intermitente (funciona só uma vez após reset, ou some o sinal), geralmente ligado ao sensor de troca no pedal ou a folga/desgaste da haste de câmbio. Antes de suspeitar de defeito eletrônico caro, cheque a fixação mecânica do sensor e a haste de câmbio — folga ali é a causa mais comum e mais barata de corrigir.',
  },
]

const DUKE390_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Tensor de corrente de comando (corrente de distribuição): já gerou reclamações formais no Brasil',
    body: 'Há registros de reclamações de proprietários brasileiros (inclusive em canais como Reclame Aqui) sobre falha no tensor da corrente de comando interna do motor, que em casos relatados se fragmentou e caiu dentro da tampa da embreagem, causando vazamento de óleo pela junta e exigindo desmontagem para substituição de vedações. Se notar ruído metálico anormal vindo da região do motor (não confundir com o ronco normal do monocilíndrico) ou vazamento de óleo pela tampa lateral, procure uma concessionária/oficina especializada em KTM imediatamente — não é item de manutenção simples de fazer em casa.',
  },
  {
    severity: 'WARN',
    title: 'Engasgo/falha em rotação de uso urbano: geralmente ligado a excesso de óleo ou desgaste do kit relação',
    body: 'Proprietários relatam episódios de engasgo ou hesitação em baixa/média rotação durante uso urbano. Em vários casos documentados, a causa identificada foi excesso de óleo no cárter (acima do nível do visor, gerando aeração e espuma que prejudica a lubrificação) combinado com ovalização do pinhão de saída. Antes de levar para diagnóstico eletrônico caro, confira o nível de óleo e o estado da corrente/pinhão — muitas vezes resolve o sintoma.',
  },
  {
    severity: 'WARN',
    title: 'Marcha "travando": primeira marcha às vezes não sai para neutro/segunda',
    body: 'Alguns usuários relatam dificuldade ocasional para tirar a moto da primeira marcha (trava, não vai para neutro nem segunda), o que por vezes tem sido associado a uma mola interna da caixa de câmbio que se solta e interfere no mecanismo de troca. É um problema mecânico interno — não tente resolver sozinho; leve à concessionária/oficina especializada KTM para inspeção da caixa de câmbio, principalmente se o sintoma for recorrente (não apenas um evento isolado de troca malfeita).',
  },
  {
    severity: 'DANGER',
    title: 'Retificador/regulador: mesmo padrão de falha de outras KTM pequenas — monitore a tensão da bateria',
    body: 'Como em outras KTM de motor único (200, 390 compartilham parte da base elétrica), o regulador retificador é um ponto de atenção. Sintomas: farol/luzes piscando de forma anormal, bateria não segurando carga, ou (caso mais grave) superaquecimento do regulador. Monitore a tensão da bateria periodicamente (13,5-14,8V com o motor em rotação de marcha lenta alta) e substitua preventivamente se notar qualquer instabilidade — um regulador com defeito, além de deixar a bateria descarregada, pode sobrecarregar e danificar o sistema de carga inteiro.',
  },
  {
    severity: 'WARN',
    title: '"Água no painel" e embreagem "pulando": relatos documentados em canais de reclamação',
    body: 'Existem registros de reclamações formais sobre infiltração de umidade no painel digital (display piscando ou com condensação visível) e sobre a embreagem "pulando" durante reduções de marcha. Para a umidade no painel: verifique a vedação do conector do display e evite lavagem com jato de alta pressão direcionado à região do painel. Para a embreagem: primeiro cheque a folga do cabo/atuador antes de suspeitar de desgaste do kit de embreagem.',
  },
]

const DUKE390_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Duke 390: monocilíndrico de alta rotação exige atenção redobrada em válvulas e corrente',
    body: '1.000 km — Primeira revisão (torque geral). | 7.500 km — Troca de óleo (JASO MA, ~1,7-1,9L conferido pelo visor) + filtro. Inspeção de corrente/pinhão, vela, fluido de freio. | 15.000 km — Óleo + filtro + vela. Verificação de folga de válvulas (motor frio). Trocar kit relação se houver sinal de ovalização do pinhão. | 22.500 km — Óleo + filtro. Fluido de freio (troca se em uso há 2 anos). Verificar tensor de corrente de comando (ruído anormal = inspeção imediata). | 30.000 km — Óleo + filtro + vela. Revisão de válvulas. Kit relação (preventivo, se ainda não trocado). Verificar tensão do regulador retificador. | Lubrificação de corrente: a cada 500 km.',
  },
]

// ─── DUKE 640 / DUKE II 640 ────────────────────────────────────────────────────
// Motor: LC4 monocilíndrico SOHC 4 válvulas refrigerado a líquido, 625-640cc | ~55-63 cv @ 6.750-7.000 rpm
// Torque: ~60 Nm (~6,1 kgf.m) @ 5.500 rpm | Carburador Dell'Orto/Mikuni (moto pré-injeção eletrônica)
// Óleo: seco (dry sump) ~2,2L (2,1L com filtro) | Vela: NGK DR8EA / DRBEA (dupla vela em alguns anos)
// Pneu: 120/70-17 (F) / 160/60-17 (R) | Corrente 520 | Tanque: ~11-14L conforme versão | Produção: ~1994-2006

const DUKE640_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Moto histórica descontinuada há quase 20 anos — peças de motor exigem paciência e rede de importados',
    body: 'A Duke 640/Duke II 640 foi produzida aproximadamente entre 1994 e 2006/2007 e não tem mais rede de peças ativa da KTM no Brasil — quem ainda roda uma hoje depende de estoque residual, desmontes, importação via eBay/fóruns internacionais (KTM Forums, KTM LC4 HOW) ou peças genéricas compatíveis com o motor LC4 (que também equipou o KTM 640 Adventure e 640 Supermoto — todos compartilham boa parte do motor). Ao buscar peça, pesquise pelo código do motor "LC4 640" ou "LC4-E" e não só pelo nome "Duke", pois amplia MUITO as opções de compatibilidade.',
  },
  {
    severity: 'OK',
    title: 'Óleo: motor de cárter seco (dry sump) — capacidade ~2,2L (2,1L com troca de filtro)',
    body: 'O LC4 640 usa sistema de lubrificação por cárter seco (dry sump), com tanque de óleo separado do bloco — isso significa que o nível deve ser verificado com procedimento específico do manual (geralmente com o motor ligado e quente, verificando o visor do tanque de óleo, não do cárter). Capacidade aproximada: 2,2L sem troca de filtro, 2,1L com filtro novo. Use óleo mineral ou semissintético 10W-40/15W-50 JASO MA — motores antigos como este toleram bem viscosidades um pouco mais altas, o que ajuda a compensar folgas maiores por desgaste natural da idade.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DR8EA/DRBEA — motores desta era muitas vezes têm dupla vela por cilindro',
    body: 'A KTM 640 Duke II usa vela NGK (referências DR8EA ou DRBEA dependendo do ano/versão — confirme pelo código gravado na vela antiga, pois o motor LC4 teve pequenas revisões ao longo dos anos de produção). Alguns anos/versões do motor LC4 usam duas velas por cilindro (ignição dupla) para melhorar a combustão do monocilíndrico grande — se for o seu caso, troque sempre as duas juntas. Por ser moto antiga, vale a pena trocar por vela nova mesmo que a usada pareça "boa", já que o tempo de uso e possível ressecamento do cabo de vela são fatores tão importantes quanto o desgaste do eletrodo.',
  },
  {
    severity: 'WARN',
    title: 'Corrente e retentores: motos desta idade quase sempre precisam de retentor de câmbio e bengala revisados',
    body: 'Pela idade do modelo (produção encerrada há quase 20 anos), é comum encontrar exemplares com retentores de bengala e do eixo de câmbio já ressecados ou vazando, mesmo com baixa quilometragem — a borracha se deteriora com o tempo independente do uso. Ao comprar uma Duke 640/Duke II usada, inspecione atentamente vazamentos na bengala dianteira e na base do motor. Corrente: usa corrente 520 — kit relação genérico compatível com motor LC4 é mais fácil de achar que peças específicas "Duke".',
  },
  {
    severity: 'WARN',
    title: 'Carburador (Dell\'Orto/Mikuni, pré-injeção): revisão e limpeza são praticamente obrigatórias em uso esporádico',
    body: 'A Duke 640/Duke II é anterior à era da injeção eletrônica na linha Duke — usa carburador (Dell\'Orto ou Mikuni, dependendo do ano/mercado). Se a moto ficar parada por longos períodos com combustível no tanque (comum em motos de coleção/uso ocasional), o etanol da gasolina brasileira degrada e forma verniz dentro do carburador, entupindo jatos e a agulha da boia. Antes de reativar uma unidade parada, é essencial desmontar e limpar o carburador completamente — não adianta só trocar a gasolina.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70-17 (F) / 160/60-17 (R): opções atuais de mercado ainda cobrem essa medida',
    body: 'Apesar da idade do modelo, a medida de pneu 120/70-17 dianteiro e 160/60-17 traseiro ainda é amplamente produzida e vendida no mercado atual (usada em várias naked médias/grandes). Boas opções: Michelin Pilot Road (mais voltado a uso misto/viagem, adequado ao perfil roadster da Duke 640) ou Pirelli Sport Demon (mais econômico). Como a moto tem bastante torque para uma única roda motriz, evite pneus muito gastos ou ressecados pela idade — borracha de pneu também degrada com o tempo, não só com o uso.',
  },
]

const DUKE640_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento de óleo por retentores ressecados pela idade — praticamente esperado em exemplares antigos',
    body: 'Por ser um modelo com produção encerrada há quase duas décadas, é extremamente comum encontrar vazamentos de óleo por retentores da bengala dianteira, do eixo de câmbio ou da tampa de válvulas, mesmo em unidades de baixa quilometragem — a borracha resseca com o tempo independentemente do uso. Ao comprar ou revisar uma Duke 640/Duke II, considere a substituição preventiva desses retentores como parte da recomissão da moto, não apenas quando o vazamento já for visível.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em peças cromadas e de alumínio: comum em exemplares guardados ou pouco rodados',
    body: 'Motos desta idade guardadas por longos períodos (garagem úmida, sem uso regular) frequentemente apresentam corrosão em peças cromadas (talas de escapamento, suportes) e oxidação em peças de alumínio (carcaça do motor, rodas). Isso é mais um problema de armazenamento do que de projeto, mas é queixa comum entre quem compra exemplares "de garagem" pensando estarem em melhor estado do que realmente estão. Inspecione com atenção antes de negociar a compra.',
  },
  {
    severity: 'DANGER',
    title: 'Sistema elétrico antigo: chicote, conectores e CDI têm décadas de uso — falhas intermitentes são esperadas',
    body: 'O sistema elétrico de uma moto de fabricação entre 1994-2006/2007 já passou por muitos ciclos de calor e vibração. Falhas intermitentes de ignição, CDI ou conectores oxidados são esperadas e às vezes difíceis de diagnosticar por serem intermitentes. Um chicote elétrico revisado (limpeza de todos os conectores com contato elétrico + graxa dielétrica) é recomendado como manutenção preventiva em qualquer exemplar que ainda esteja rodando com a fiação original.',
  },
  {
    severity: 'WARN',
    title: 'Carburador entupido após longos períodos parado: sintoma clássico de moto de coleção mal preparada para armazenamento',
    body: 'Se a moto ficou parada por meses/anos com gasolina (especialmente gasolina com etanol) no tanque e carburador, é praticamente certo que haverá entupimento de jatos por verniz/borra formada pela degradação do combustível. Sintomas: dificuldade de pegar, marcha lenta instável, morre ao acelerar. Solução: drenar todo o combustível velho, desmontar e limpar o carburador com produto específico (ex: spray carburador) e reabastecer com gasolina nova antes de tentar dar partida novamente.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: desgaste do disco é esperado em unidades com muitos anos de uso — verifique patinação',
    body: 'Como o motor LC4 tem bastante torque para um monocilíndrico, o disco de embreagem sofre desgaste real ao longo dos anos, especialmente se a moto foi usada com carga (bagageiro, garupa frequente) ou em uso mais esportivo (supermotard). Teste de patinação: acelere em marcha alta e solte a embreagem rapidamente — se o motor "sobe" de giro sem corresponder proporcionalmente ao ganho de velocidade, a embreagem está patinando e precisa de disco/mola novos.',
  },
]

const DUKE640_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Duke 640/Duke II 640: moto de coleção — priorize recomissão completa antes de rodar regularmente',
    body: 'Revisão inicial de recomissão (para exemplares parados/comprados usados): drenar e trocar todo o óleo do sistema de cárter seco (~2,2L), limpar carburador completamente, trocar vela, inspecionar e trocar retentores de bengala e câmbio se houver qualquer sinal de vazamento, verificar todo o chicote elétrico. | A cada 3.000-5.000 km em uso regular — Troca de óleo (10W-40/15W-50 JASO MA). Lubrificação de corrente a cada 500 km. | A cada 8.000-10.000 km — Vela nova (ou par, se dupla ignição). Revisão do carburador. Fluido de freio. | A cada 15.000 km ou anualmente — Kit relação 520 completo. Revisão de válvulas (folga, motor frio). Inspeção geral de mangueiras e vedações (idade do modelo pesa mais que a quilometragem aqui).',
  },
]

// ─── DUKE 690 ──────────────────────────────────────────────────────────────────
// Motor: LC4 monocilíndrico DOHC 4 válvulas refrigerado a líquido, 690/693cc | ~70-75 cv (2019+: ~73-75cv @ 8.000rpm)
// Torque: ~7,1-7,6 kgf.m (2019+) @ 6.550-6.650 rpm | Injeção eletrônica com dupla vela por cilindro
// Óleo: SAE 10W-50 (Motorex Power Synt 4T) ou 10W-60, ~1,7L com filtro, JASO MA/T903
// Vela: NGK LKAR8BI-9 (interna) + LMAR7A-9 (externa) — variou por ano, confirme pelo manual do ano específico
// Pneu: 120/70-17 (F) / 160/60-17 (R) | PSI: 29-32 (F) / 29-32 solo, +carga R maior | Tanque: 14L | Produção: 2008-presente

const DUKE690_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motorex Power Synt 4T 10W-50 (ou 10W-60) — ~1,7L com filtro; JASO T903 MA obrigatório',
    body: 'A KTM recomenda oficialmente óleo Motorex (parceira técnica da marca) 10W-50 Power Synt 4T ou 10W-60 Cross Power 4T, ambos com especificação JASO T903 MA (embreagem multidisco em banho de óleo). Capacidade: aproximadamente 1,7L com troca de filtro. Motorex é vendido no Brasil em lojas especializadas em motos importadas/premium, mas custa mais caro que marcas populares — alternativas aceitáveis com mesma especificação JASO MA: Motul 300V 10W-50 ou Motul 7100 10W-60. Intervalo: 7.500-10.000 km dependendo do ano/geração (confirme no manual do seu ano específico).',
  },
  {
    severity: 'WARN',
    title: 'Duas velas por cilindro: LKAR8BI-9 (interna) + LMAR7A-9 (externa) — códigos mudaram entre gerações',
    body: 'O motor LC4 da Duke 690 (a partir de 2012) usa duas velas por cilindro para melhorar a queima do monocilíndrico grande. Para modelos pós-2011: NGK LKAR8BI-9 (vela interna) e LMAR7A-9 (vela externa), gap de 0,9mm em ambas. ATENÇÃO: o modelo 2017+ mudou para NGK LKAR9BI-10 (interna) e LMAR7DI-10 (externa) — os códigos NÃO são intercambiáveis entre gerações, então confirme sempre pelo ano exato da sua moto antes de comprar. Uma opção de vela iridium NGK pode ter grau térmico diferente do Bosch original de fábrica em algumas versões — se notar falha em baixa rotação após trocar de marca, volte para o código NGK específico do manual.',
  },
  {
    severity: 'OK',
    title: 'Consumo de combustível abaixo de 5,5L/100km em uso normal — moto eficiente para a categoria',
    body: 'Apesar da potência elevada para um monocilíndrico (73-75 cv), a Duke 690 mantém consumo relativamente eficiente em uso normal de estrada/urbano, geralmente abaixo de 5,5L/100km (equivalente a mais de 18 km/l). Isso é resultado direto do trabalho de balanceamento do motor LC4 (eixo balanceador dedicado) que permite alta rotação sem vibração excessiva nem perda de eficiência térmica. Use gasolina premium/aditivada quando disponível — a alta taxa de compressão do motor se beneficia de octanagem mais alta.',
  },
  {
    severity: 'WARN',
    title: 'Peças no Brasil: rede reduzida — priorize concessionária KTM ou grupos de proprietários para peças específicas',
    body: 'A Duke 690 tem volume de vendas bem menor no Brasil que modelos populares japoneses, então itens específicos do motor LC4 (jogo de vela dupla, componentes de injeção, peças de embreagem) muitas vezes só são encontrados em concessionária oficial ou por importação. Itens de desgaste "genéricos" (pneu, corrente, pastilha de freio de marcas como EBC) têm distribuição nacional normal. Fóruns como o "KTM Duke Forum" e grupos de proprietários brasileiros são fonte valiosa de indicação de fornecedores confiáveis para peças específicas.',
  },
  {
    severity: 'OK',
    title: 'Corrente e kit relação: lubrifique a cada 500 km — moto entrega bastante torque para um monocilíndrico',
    body: 'Com torque de até 7,6 kgf.m em um monocilíndrico, a corrente da Duke 690 trabalha sob carga elevada em acelerações — lubrificação regular (a cada 500 km ou após pegar chuva) é ainda mais importante que em motos de potência menor. Marcas de corrente O-ring/X-ring recomendadas para essa faixa de torque: DID 520VX3 ou RK 520XSO. Verifique a folga da corrente com mais frequência que numa moto de potência menor — o próprio uso de aceleração forte tensiona e desgasta o kit relação mais rápido.',
  },
  {
    severity: 'OK',
    title: 'Tensor da corrente de comando: item conhecido de atenção nos monocilíndricos KTM — inspecione em revisões',
    body: 'Assim como relatado em outros modelos monocilíndricos KTM (200, 390), o tensor da corrente de comando (distribuição interna) é um item que merece atenção redobrada em revisões — ruído metálico anormal na parte superior do motor pode indicar desgaste do tensor. Como o acesso é interno ao motor, essa inspeção deve ser feita por mecânico especializado em KTM (idealmente durante a troca de óleo/filtro), não é item de manutenção caseira.',
  },
]

const DUKE690_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Tensor da corrente de comando pode se fragmentar e cair na tampa da embreagem',
    body: 'Há relatos documentados (inclusive em canais de reclamação no Brasil, referentes à família de monocilíndricos KTM) de fragmentação do tensor da corrente de comando, com pedaços caindo dentro da tampa lateral da embreagem e causando vazamento de óleo pela junta. Se notar ruído metálico crescente vindo da parte superior/frontal do motor ou vazamento de óleo pela tampa lateral direita, pare de rodar e leve a uma oficina especializada em KTM — continuar rodando com o tensor comprometido pode causar dano maior ao motor (corrente de comando saltando de posição).',
  },
  {
    severity: 'DANGER',
    title: 'Regulador retificador: histórico de falha em monocilíndricos KTM de maior cilindrada — monitore a tensão',
    body: 'Modelos de maior cilindrada da família LC4/LC8 KTM têm histórico conhecido de falha no regulador retificador, com sintomas que vão de instabilidade nas luzes até superaquecimento do componente. Verifique periodicamente a tensão da bateria com o motor em rotação de marcha alta (~4.000 rpm): deve ficar entre 13,5-14,8V. Fora dessa faixa (para mais ou para menos), o regulador retificador é suspeito e deve ser substituído — um regulador com defeito pode, em casos extremos, sobrecarregar e ferver o eletrólito da bateria.',
  },
  {
    severity: 'WARN',
    title: 'Vibração residual em alta rotação apesar do eixo balanceador — normal para monocilíndrico desta cilindrada',
    body: 'Apesar do eixo balanceador dedicado do motor LC4 da Duke 690, ainda existe vibração perceptível em rotações mais altas (acima de 6.000-7.000 rpm) — é característica inerente de qualquer monocilíndrico de quase 700cc, mesmo com engenharia de ponta. Não confunda esse comportamento normal com desgaste: se a vibração aumentar subitamente ou vier acompanhada de folga perceptível no guidão/pedaleiras, aí sim investigue coxins do motor, parafusos de fixação e balanceamento das rodas.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: uso urbano intenso acelera desgaste do disco em motor de alto torque',
    body: 'O torque elevado do motor da Duke 690 (mais de 7 kgf.m em um único cilindro) faz com que a embreagem trabalhe sob carga elevada, especialmente em uso urbano com muita troca de marcha e arrancadas. Fique atento a sinais de patinação (motor "sobe" de giro sem ganho proporcional de velocidade) e troque o disco/mola preventivamente perto dos 30.000-40.000 km em uso urbano intenso, mesmo sem sintoma claro ainda — evita ficar na mão em situação de patinação total.',
  },
  {
    severity: 'WARN',
    title: 'Vela de grau térmico incorreto ao trocar de marca pode causar falha em baixa rotação',
    body: 'Ao substituir a vela original (Bosch de fábrica em algumas versões) por NGK iridium de reposição, há relatos de que a opção NGK disponível pode ter um grau térmico diferente (mais frio) do que o original, causando falha de ignição ("engasgo") em baixa rotação. Se notar esse sintoma após trocar de marca de vela, volte para o código NGK exato especificado no manual do seu ano/modelo, evitando substituições "aproximadas" por conta própria.',
  },
]

const DUKE690_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Duke 690: monocilíndrico grande com dupla vela exige atenção redobrada em ignição e corrente de comando',
    body: '1.000 km — Primeira revisão (torque geral, óleo se necessário). | 7.500-10.000 km (confirme intervalo do seu ano/manual) — Troca de óleo (Motorex 10W-50/10W-60 ou Motul equivalente JASO MA, ~1,7L) + filtro. Inspeção das duas velas por cilindro, corrente, tensor de corrente de comando (ouvir ruído anormal). | 15.000-20.000 km — Óleo + filtro. Troca das duas velas (par por cilindro, código específico do ano). Verificação de folga de válvulas (motor frio). Kit relação se houver desgaste. | 30.000 km — Óleo + filtro + velas. Revisão completa de válvulas. Verificação de embreagem (teste de patinação). Verificar tensão do regulador retificador (13,5-14,8V @ 4.000 rpm). | Lubrificação de corrente: a cada 500 km, essencial dado o alto torque do motor.',
  },
]

// ─── 990 DUKE ──────────────────────────────────────────────────────────────────
// Motor: LC8 V-twin 75° DOHC 8 válvulas refrigerado a líquido, 999cc | ~115-120 cv @ 9.000-9.500 rpm
// Torque: ~10 kgf.m (~100 Nm) | Injeção eletrônica dupla corpo de borboleta | Descontinuada em 2013
// Óleo: cárter seco (dry sump), ~3,0L com filtro, JASO MA | Vela: NGK DCPR8E (2005-2008) / LKAR8AI-9/LKAR8BI-9 (2010-2013)
// Pneu: 120/70-17 (F) / 180/55-17 (R) | PSI: ~35 (F) / 35 solo-38 com carona (R) | Tanque: ~15L

const DUKE990_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo cárter seco (dry sump) — ~3,0L com filtro; JASO MA obrigatório pela embreagem em banho de óleo',
    body: 'O motor LC8 V-twin 999cc da 990 Duke usa sistema de cárter seco com tanque de óleo separado — capacidade aproximada de 3,0L com troca de filtro. Como todo motor KTM com embreagem multidisco em banho de óleo, JASO MA é obrigatório. Motorex é a marca parceira oficial da KTM (Power Synt 4T 10W-50), mas Motul 300V 10W-50/15W-50 é aceito como alternativa de mesma especificação, mais fácil de achar em lojas de moto no Brasil. Sempre verifique o nível pelo procedimento correto do manual (dry sump exige checagem específica, geralmente com motor quente e em posição vertical).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK: código muda MUITO entre 2005-2008 e 2010-2013 — confirme antes de comprar',
    body: 'Modelos 2005-2008 usam vela NGK DCPR8E (ou versão iridium DCPR8EIX), com rosca de 19mm e sextavado de 16mm. Já os modelos 2010-2013 (Super Duke R e sucessores) usam NGK LKAR8AI-9 ou LKAR8BI-9, com rosca de 26,5mm e sextavado de 14mm — peças completamente diferentes fisicamente, não apenas por código. Sempre confirme o ano exato da sua 990 Duke antes de comprar velas, e troque as duas (uma por cilindro do V-twin) juntas.',
  },
  {
    severity: 'WARN',
    title: 'Peças no Brasil: modelo descontinuado desde 2013 — rede de peças reduzida, priorize importação e fóruns internacionais',
    body: 'A 990 Duke foi descontinuada globalmente em 2013 e nunca teve volume de vendas alto no Brasil, o que torna peças específicas de motor e elétrica mais difíceis de encontrar localmente hoje em dia. Fóruns internacionais como "KTM Forums" e o blog especializado "KTM 950/990 HOW" (referência técnica da comunidade) têm guias detalhados de manutenção e indicação de fornecedores. Peças compartilhadas com o KTM 990 Adventure/SMT (mesmo motor LC8) ampliam bastante as opções de compatibilidade — pesquise sempre por "LC8 990" e não só por "Super Duke".',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70-17 (F) / 180/55-17 (R): opções esportivas amplamente disponíveis mesmo em modelo antigo',
    body: 'A medida de pneu da 990 Duke (120/70-17 dianteiro, 180/55-17 traseiro) é compartilhada com diversas naked/esportivas de grande cilindrada, então a disponibilidade no Brasil não é um problema mesmo com o modelo descontinuado. Boas opções: Pirelli Diablo Rosso III, Michelin Pilot Power/Road, Metzeler Sportec M7 — todas boas escolhas para o perfil de torque elevado (~10 kgf.m) do V-twin LC8.',
  },
  {
    severity: 'WARN',
    title: 'Cilindro de acionamento (escravo) da embreagem: peça de atenção conhecida nos motores LC8',
    body: 'Motores LC8 (990 Duke, 990 Adventure, RC8 — todos compartilham base) têm histórico relatado de falha no cilindro escravo de acionamento da embreagem (clutch slave cylinder), atribuído ao calor elevado da região e a um design de pistão com um único O-ring de vedação. Sintomas: perda de pressão na embreagem, alavanca "mole" ou sem efeito. Se notar esse sintoma, inspecione o cilindro escravo antes de investigar o kit de embreagem inteiro — pode ser só a vedação/pistão do acionamento.',
  },
  {
    severity: 'OK',
    title: 'Corrente e kit relação: motor de ~10 kgf.m de torque exige lubrificação rigorosa a cada 500 km',
    body: 'Com torque próximo de 100 Nm entregue por um V-twin de resposta forte em baixa/média rotação, a corrente da 990 Duke trabalha sob esforço elevado. Lubrifique a cada 500 km sem exceção, usando corrente O-ring/X-ring de qualidade (DID 525VX3 ou RK 525XSO, dependendo da especificação do seu ano). Verifique a folga com mais frequência do que faria numa moto de potência menor — a resposta agressiva do motor desgasta o kit relação de forma mais acelerada.',
  },
]

const DUKE990_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador/retificador de tensão: falha amplamente documentada — pode ferver a bateria',
    body: 'A 990 Super Duke tem um dos históricos mais documentados de falha de regulador retificador entre as KTM: o componente pode sobrecarregar o sistema e causar superaquecimento/ebulição da bateria — o primeiro sinal costuma ser um assobio agudo vindo de baixo do banco (ácido da bateria fervendo e liberando vapor pela válvula de segurança). A causa raiz é o posicionamento de fábrica do regulador, próximo ao coletor de escapamento traseiro, expondo-o a temperatura muito alta. Solução preventiva amplamente adotada pela comunidade: reposicionar o regulador retificador para um local mais fresco da moto (embaixo do tanque ou lateral, longe do escape) — reduz drasticamente a taxa de falha.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de comando ruidosa: item de atenção conhecido no motor LC8',
    body: 'Ruído de corrente de comando (distribuição interna) é um problema conhecido e discutido extensamente em fóruns especializados no motor LC8. Não é necessariamente falha iminente, mas indica que o tensor de corrente de comando está no limite de sua vida útil ou desregulado. Inspeção e eventual substituição do tensor devem ser feitas por mecânico especializado em KTM/motor LC8 — há procedimentos e guias específicos documentados pela comunidade (ex: fórum "KTM 990 HOW") para essa manutenção.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas fecha com o tempo — revisão periódica é obrigatória, não opcional',
    body: 'No motor LC8, a folga das válvulas tende a diminuir (fechar) ao longo do tempo/uso, ao contrário de alguns motores onde a folga aumenta com desgaste. Isso significa que a revisão periódica de válvulas não é apenas recomendável — é necessária para evitar que a folga feche completamente e cause problemas de vedação/queima de válvula. Respeite o intervalo do manual (geralmente por volta de 15.000 km) mesmo que a moto pareça estar funcionando normalmente.',
  },
  {
    severity: 'WARN',
    title: 'Válvula anti-retorno do óleo pode entupir ou travar — sistema de cárter seco exige atenção específica',
    body: 'No sistema de lubrificação por cárter seco do LC8, existe uma válvula anti-retorno (anti-drain back valve) na tubulação que conecta ao tanque de óleo — sua tela/filtro pode entupir e a própria válvula pode travar, comprometendo o retorno correto do óleo. Esse é um ponto de inspeção que mecânicos especializados em KTM LC8 conhecem bem; vale perguntar especificamente sobre esse componente durante revisões maiores, especialmente se a moto tiver histórico de pouco uso ou revisões incompletas.',
  },
  {
    severity: 'WARN',
    title: 'Óleo pode infiltrar no conector do estator para o regulador — verifique ao investigar falha elétrica',
    body: 'Há relatos de óleo escorrendo/infiltrando no conector elétrico entre o estator e o regulador retificador no motor LC8, o que pode causar falhas intermitentes de carga difíceis de diagnosticar (parecem falha do regulador, mas na verdade são contato comprometido por contaminação de óleo). Ao investigar qualquer problema de sistema de carga na 990 Duke, inspecione visualmente esse conector antes de trocar o regulador — pode ser só limpeza e vedação do conector.',
  },
]

const DUKE990_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 990 Duke: V-twin LC8 de alto torque — regulador e corrente de comando exigem atenção prioritária',
    body: '1.000 km — Revisão inicial (torque geral). | 7.500 km — Troca de óleo (JASO MA 10W-50, ~3,0L com filtro) + filtro. Inspeção de corrente/kit relação, velas (par NGK conforme o ano). | 15.000 km — Óleo + filtro + velas (par). Revisão de folga de válvulas (motor frio — folga tende a FECHAR com o tempo neste motor, diferente de outros). Verificar cilindro escravo de embreagem (alavanca "mole" = inspeção). | 22.500 km — Óleo + filtro. Fluido de freio. Considerar reposicionamento preventivo do regulador retificador para local mais fresco (fora do calor do escapamento). | 30.000 km — Óleo + filtro + velas. Revisão completa de válvulas. Inspeção da corrente de comando (ruído anormal = mecânico especializado). Kit relação 525. | Lubrificação de corrente: a cada 500 km, essencial dado o torque do V-twin.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'DUKE 200/ABS',
    yearFrom: 2012,
    yearTo: null,
    MACETES: DUKE200_MACETES,
    PROBLEMAS: DUKE200_PROBLEMAS,
    MANUTENCAO: DUKE200_MANUTENCAO,
  },
  {
    modelName: 'DUKE 390',
    yearFrom: 2013,
    yearTo: null,
    MACETES: DUKE390_MACETES,
    PROBLEMAS: DUKE390_PROBLEMAS,
    MANUTENCAO: DUKE390_MANUTENCAO,
  },
  {
    modelName: 'DUKE 640/ DUKE II 640',
    yearFrom: 1994,
    yearTo: 2006,
    MACETES: DUKE640_MACETES,
    PROBLEMAS: DUKE640_PROBLEMAS,
    MANUTENCAO: DUKE640_MANUTENCAO,
  },
  {
    modelName: 'DUKE 690',
    yearFrom: 2008,
    yearTo: null,
    MACETES: DUKE690_MACETES,
    PROBLEMAS: DUKE690_PROBLEMAS,
    MANUTENCAO: DUKE690_MANUTENCAO,
  },
  {
    modelName: '990 DUKE',
    yearFrom: 2005,
    yearTo: 2013,
    MACETES: DUKE990_MACETES,
    PROBLEMAS: DUKE990_PROBLEMAS,
    MANUTENCAO: DUKE990_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'DUKE 200/ABS',
    yearFrom: 2012, yearTo: null,
    tireSize: '110/70-17 (F) · 140/70-17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 40,
    notes: 'Solo: F 32 / R 36 PSI. Com garupa: F 32 / R 40 PSI. Sempre calibrar com pneus frios. Pneus recomendados: Pirelli Sport Demon ou Michelin Pilot Street 110/70-17 (F) + 140/70-17 (R).',
  },
  {
    modelName: 'DUKE 390',
    yearFrom: 2013, yearTo: null,
    tireSize: '110/70-17 (F) · 150/60-17 (R)',
    frontPsi: 33, rearPsi: 36,
    frontPsiLoad: 33, rearPsiLoad: 39,
    notes: 'Solo: F 33 / R 36 PSI. Com garupa: F 33 / R 39 PSI. Versões mais antigas (2013-2016) usaram pneu traseiro 150/70-17 — confirme a medida gravada no seu pneu antes de comprar reposição. Recomendados: Pirelli Diablo Rosso III ou Metzeler Sportec M7.',
  },
  {
    modelName: 'DUKE 640/ DUKE II 640',
    yearFrom: 1994, yearTo: 2006,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 30, rearPsi: 33,
    frontPsiLoad: 32, rearPsiLoad: 35,
    notes: 'Solo: F ~30 / R ~33 PSI (2,0-2,2 bar). Com garupa: F ~32 / R ~35 PSI (2,2-2,4 bar). Modelo antigo — confirme sempre a pressão gravada no manual do seu ano específico, pois houve pequenas variações entre versões (1994-2006). Pneu ainda disponível: Michelin Pilot Road ou Pirelli Sport Demon.',
  },
  {
    modelName: 'DUKE 690',
    yearFrom: 2008, yearTo: null,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 30, rearPsi: 32,
    frontPsiLoad: 30, rearPsiLoad: 36,
    notes: 'Solo: F 30 / R 32 PSI (2,0-2,2 bar). Com garupa: F 30 / R 36 PSI (2,2-2,5 bar). Faixa oficial do manual varia entre 29-32 PSI dependendo do ano — confirme no manual do seu ano exato. Recomendados: Pirelli Diablo Rosso III, Metzeler Sportec M7, ou Michelin Pilot Power.',
  },
  {
    modelName: '990 DUKE',
    yearFrom: 2005, yearTo: 2013,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 35, rearPsi: 35,
    frontPsiLoad: 35, rearPsiLoad: 38,
    notes: 'Solo: F 35 / R 35 PSI (2,4 bar). Com garupa: F 35 / R 38 PSI (2,4-2,6 bar). Pneu original de fábrica: Dunlop D208RR. Alternativas atuais: Pirelli Diablo Rosso III ou Metzeler Sportec M7 na mesma medida.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // DUKE 200/ABS
  { modelName: 'DUKE 200/ABS', yearFrom: 2012, yearTo: null, component: 'Óleo 10W-30/10W-40 JASO MA (~1,5L)', intervalKm: 7500, intervalMonths: 12, notes: 'Motor 199,5cc DOHC. Sempre confira nível pelo visor lateral, não só pela quantidade despejada.', priority: 'HIGH', order: 1 },
  { modelName: 'DUKE 200/ABS', yearFrom: 2012, yearTo: null, component: 'Filtro de óleo', intervalKm: 7500, intervalMonths: 12, notes: 'Trocar junto com o óleo. Lubrificar O-ring antes de instalar.', priority: 'MEDIUM', order: 2 },
  { modelName: 'DUKE 200/ABS', yearFrom: 2012, yearTo: null, component: 'Vela de ignição NGK', intervalKm: 15000, intervalMonths: 24, notes: 'Confirme código exato pelo manual do ano. Iridium dura mais e vale o investimento.', priority: 'MEDIUM', order: 3 },
  { modelName: 'DUKE 200/ABS', yearFrom: 2012, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Fazer sempre, especialmente após chuva.', priority: 'HIGH', order: 4 },
  { modelName: 'DUKE 200/ABS', yearFrom: 2012, yearTo: null, component: 'Kit relação 520 (pinhão 14T + coroa 42T)', intervalKm: 15000, intervalMonths: null, notes: 'Ovalização de pinhão é problema recorrente — trocar o kit completo, não só a corrente.', priority: 'HIGH', order: 5 },
  { modelName: 'DUKE 200/ABS', yearFrom: 2012, yearTo: null, component: 'Filtro de ar', intervalKm: 15000, intervalMonths: 24, notes: 'Verificar antes se limpeza resolve; troca completa se saturado.', priority: 'MEDIUM', order: 6 },
  { modelName: 'DUKE 200/ABS', yearFrom: 2012, yearTo: null, component: 'Folga de válvulas', intervalKm: 15000, intervalMonths: 24, notes: 'Motor frio obrigatório. Monocilíndrico DOHC de alta rotação exige atenção.', priority: 'HIGH', order: 7 },
  { modelName: 'DUKE 200/ABS', yearFrom: 2012, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 22500, intervalMonths: 24, notes: 'Verificar nível e cor a cada revisão; trocar no intervalo indicado.', priority: 'HIGH', order: 8 },
  { modelName: 'DUKE 200/ABS', yearFrom: 2012, yearTo: null, component: 'Regulador retificador — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: 'Medir 13,5-14,8V a ~4.000 rpm. Opções nacionais (Wortech, Chiaratto) são compatíveis e mais baratas.', priority: 'MEDIUM', order: 9 },
  { modelName: 'DUKE 200/ABS', yearFrom: 2012, yearTo: null, component: 'Rolamentos de roda e direção — inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Verificar folga e ruído em revisões maiores.', priority: 'LOW', order: 10 },

  // DUKE 390
  { modelName: 'DUKE 390', yearFrom: 2013, yearTo: null, component: 'Óleo JASO MA (~1,7-1,9L conferido pelo visor)', intervalKm: 7500, intervalMonths: 12, notes: 'Motor 373cc/399cc conforme geração. Motul 5100 10W-40 ou Motul 300V 15W50.', priority: 'HIGH', order: 1 },
  { modelName: 'DUKE 390', yearFrom: 2013, yearTo: null, component: 'Filtro de óleo', intervalKm: 7500, intervalMonths: 12, notes: 'Trocar junto com óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'DUKE 390', yearFrom: 2013, yearTo: null, component: 'Vela de ignição NGK', intervalKm: 15000, intervalMonths: 24, notes: 'Código varia por geração de motor (373cc vs 399cc) — confirme pelo manual do ano.', priority: 'MEDIUM', order: 3 },
  { modelName: 'DUKE 390', yearFrom: 2013, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Essencial — ovalização de pinhão é queixa recorrente sem lubrificação regular.', priority: 'HIGH', order: 4 },
  { modelName: 'DUKE 390', yearFrom: 2013, yearTo: null, component: 'Kit relação 520', intervalKm: 15000, intervalMonths: null, notes: 'Trocar ao primeiro sinal de folga irregular/ovalização do pinhão.', priority: 'HIGH', order: 5 },
  { modelName: 'DUKE 390', yearFrom: 2013, yearTo: null, component: 'Folga de válvulas', intervalKm: 15000, intervalMonths: 24, notes: 'Motor frio. Monocilíndrico DOHC de alta rotação.', priority: 'HIGH', order: 6 },
  { modelName: 'DUKE 390', yearFrom: 2013, yearTo: null, component: 'Tensor de corrente de comando — inspeção', intervalKm: 15000, intervalMonths: 12, notes: 'Item com reclamações documentadas — ruído metálico anormal exige inspeção imediata.', priority: 'CRITICAL', order: 7 },
  { modelName: 'DUKE 390', yearFrom: 2013, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 22500, intervalMonths: 24, notes: 'Trocar bienal.', priority: 'HIGH', order: 8 },
  { modelName: 'DUKE 390', yearFrom: 2013, yearTo: null, component: 'Regulador retificador — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: 'Medir 13,5-14,8V a ~4.000 rpm.', priority: 'MEDIUM', order: 9 },
  { modelName: 'DUKE 390', yearFrom: 2013, yearTo: null, component: 'Quickshifter — verificação do sensor/haste (se equipado)', intervalKm: 15000, intervalMonths: 12, notes: 'Mau funcionamento geralmente é folga mecânica do sensor, não falha eletrônica.', priority: 'LOW', order: 10 },

  // DUKE 640/ DUKE II 640
  { modelName: 'DUKE 640/ DUKE II 640', yearFrom: 1994, yearTo: 2006, component: 'Óleo 10W-40/15W-50 JASO MA (~2,2L, sistema dry sump)', intervalKm: 5000, intervalMonths: 12, notes: 'Cárter seco: verificar nível pelo procedimento específico do manual (motor quente).', priority: 'HIGH', order: 1 },
  { modelName: 'DUKE 640/ DUKE II 640', yearFrom: 1994, yearTo: 2006, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 12, notes: 'Capacidade reduz para ~2,1L com troca de filtro.', priority: 'MEDIUM', order: 2 },
  { modelName: 'DUKE 640/ DUKE II 640', yearFrom: 1994, yearTo: 2006, component: 'Vela NGK DR8EA/DRBEA (verificar se dupla ignição)', intervalKm: 8000, intervalMonths: 12, notes: 'Confirme código pela vela antiga; alguns anos usam duas velas por cilindro.', priority: 'MEDIUM', order: 3 },
  { modelName: 'DUKE 640/ DUKE II 640', yearFrom: 1994, yearTo: 2006, component: 'Revisão do carburador (Dell\'Orto/Mikuni)', intervalKm: 8000, intervalMonths: 12, notes: 'Essencial em uso esporádico — etanol degradado entope jatos.', priority: 'HIGH', order: 4 },
  { modelName: 'DUKE 640/ DUKE II 640', yearFrom: 1994, yearTo: 2006, component: 'Lubrificação da corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Sem exceção — motor de alto torque desgasta corrente seca rapidamente.', priority: 'HIGH', order: 5 },
  { modelName: 'DUKE 640/ DUKE II 640', yearFrom: 1994, yearTo: 2006, component: 'Kit relação 520', intervalKm: 15000, intervalMonths: 12, notes: 'Idade do modelo pesa tanto quanto a quilometragem na decisão de troca.', priority: 'MEDIUM', order: 6 },
  { modelName: 'DUKE 640/ DUKE II 640', yearFrom: 1994, yearTo: 2006, component: 'Retentores de bengala e câmbio — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Ressecamento pela idade é praticamente esperado — inspecionar mesmo sem sintoma visível.', priority: 'HIGH', order: 7 },
  { modelName: 'DUKE 640/ DUKE II 640', yearFrom: 1994, yearTo: 2006, component: 'Folga de válvulas', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio. SOHC 4 válvulas.', priority: 'HIGH', order: 8 },
  { modelName: 'DUKE 640/ DUKE II 640', yearFrom: 1994, yearTo: 2006, component: 'Chicote elétrico — limpeza de conectores', intervalKm: null, intervalMonths: 12, notes: 'Sistema elétrico antigo: falhas intermitentes são esperadas pela idade do chicote.', priority: 'MEDIUM', order: 9 },
  { modelName: 'DUKE 640/ DUKE II 640', yearFrom: 1994, yearTo: 2006, component: 'Embreagem — teste de patinação', intervalKm: null, intervalMonths: 12, notes: 'Disco desgasta mais em unidades usadas com carga/garupa frequente ao longo dos anos.', priority: 'MEDIUM', order: 10 },

  // DUKE 690
  { modelName: 'DUKE 690', yearFrom: 2008, yearTo: null, component: 'Óleo Motorex/Motul 10W-50 JASO MA (~1,7L com filtro)', intervalKm: 7500, intervalMonths: 12, notes: 'Confirme intervalo exato pelo manual do ano — variou entre gerações.', priority: 'HIGH', order: 1 },
  { modelName: 'DUKE 690', yearFrom: 2008, yearTo: null, component: 'Filtro de óleo', intervalKm: 7500, intervalMonths: 12, notes: 'Trocar junto com óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'DUKE 690', yearFrom: 2008, yearTo: null, component: 'Velas NGK ×2 por cilindro (dupla ignição)', intervalKm: 15000, intervalMonths: 24, notes: 'Códigos diferentes por geração (2012-2016 vs 2017+) — NÃO intercambiáveis. Troque sempre o par.', priority: 'HIGH', order: 3 },
  { modelName: 'DUKE 690', yearFrom: 2008, yearTo: null, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Alto torque em monocilíndrico — lubrificação rigorosa evita desgaste acelerado.', priority: 'HIGH', order: 4 },
  { modelName: 'DUKE 690', yearFrom: 2008, yearTo: null, component: 'Kit relação (DID 520VX3 ou RK 520XSO)', intervalKm: 15000, intervalMonths: null, notes: 'Verificar folga com mais frequência que motos de potência menor.', priority: 'HIGH', order: 5 },
  { modelName: 'DUKE 690', yearFrom: 2008, yearTo: null, component: 'Folga de válvulas', intervalKm: 15000, intervalMonths: 24, notes: 'Motor frio. DOHC monocilíndrico de alta rotação.', priority: 'HIGH', order: 6 },
  { modelName: 'DUKE 690', yearFrom: 2008, yearTo: null, component: 'Tensor de corrente de comando — inspeção', intervalKm: 15000, intervalMonths: 12, notes: 'Ruído anormal na parte superior do motor exige inspeção por especialista KTM.', priority: 'CRITICAL', order: 7 },
  { modelName: 'DUKE 690', yearFrom: 2008, yearTo: null, component: 'Embreagem — teste de patinação', intervalKm: 30000, intervalMonths: null, notes: 'Uso urbano intenso acelera desgaste do disco em motor de alto torque.', priority: 'MEDIUM', order: 8 },
  { modelName: 'DUKE 690', yearFrom: 2008, yearTo: null, component: 'Regulador retificador — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: 'Histórico de falha em monocilíndricos KTM grandes. Medir 13,5-14,8V a ~4.000 rpm.', priority: 'CRITICAL', order: 9 },
  { modelName: 'DUKE 690', yearFrom: 2008, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 22500, intervalMonths: 24, notes: 'Bienal.', priority: 'HIGH', order: 10 },

  // 990 DUKE
  { modelName: '990 DUKE', yearFrom: 2005, yearTo: 2013, component: 'Óleo JASO MA 10W-50 (~3,0L com filtro, sistema dry sump)', intervalKm: 7500, intervalMonths: 12, notes: 'Motorex Power Synt 4T (oficial) ou Motul 300V equivalente.', priority: 'HIGH', order: 1 },
  { modelName: '990 DUKE', yearFrom: 2005, yearTo: 2013, component: 'Filtro de óleo', intervalKm: 7500, intervalMonths: 12, notes: 'Trocar junto com óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: '990 DUKE', yearFrom: 2005, yearTo: 2013, component: 'Velas NGK (par — DCPR8E 2005-2008 / LKAR8AI-9 2010-2013)', intervalKm: 15000, intervalMonths: 24, notes: 'Códigos fisicamente diferentes entre gerações — confirme o ano antes de comprar.', priority: 'HIGH', order: 3 },
  { modelName: '990 DUKE', yearFrom: 2005, yearTo: 2013, component: 'Lubrificação da corrente 525', intervalKm: 500, intervalMonths: null, notes: 'V-twin de ~10 kgf.m de torque — lubrificação rigorosa é essencial.', priority: 'HIGH', order: 4 },
  { modelName: '990 DUKE', yearFrom: 2005, yearTo: 2013, component: 'Kit relação 525 (DID 525VX3 ou RK 525XSO)', intervalKm: 15000, intervalMonths: null, notes: 'Verificar folga com frequência dado o torque elevado do motor.', priority: 'HIGH', order: 5 },
  { modelName: '990 DUKE', yearFrom: 2005, yearTo: 2013, component: 'Folga de válvulas', intervalKm: 15000, intervalMonths: 12, notes: 'Motor frio. ATENÇÃO: folga tende a FECHAR com o tempo neste motor (LC8), ao contrário de outros.', priority: 'CRITICAL', order: 6 },
  { modelName: '990 DUKE', yearFrom: 2005, yearTo: 2013, component: 'Regulador retificador — reposicionamento preventivo', intervalKm: null, intervalMonths: 12, notes: 'Falha amplamente documentada. Reposicionar para local mais fresco (fora do calor do escapamento) reduz taxa de falha.', priority: 'CRITICAL', order: 7 },
  { modelName: '990 DUKE', yearFrom: 2005, yearTo: 2013, component: 'Cilindro escravo de embreagem — inspeção', intervalKm: 20000, intervalMonths: 12, notes: 'Falha conhecida nos motores LC8 — alavanca "mole" indica necessidade de revisão.', priority: 'MEDIUM', order: 8 },
  { modelName: '990 DUKE', yearFrom: 2005, yearTo: 2013, component: 'Fluido de freio DOT 4', intervalKm: 22500, intervalMonths: 24, notes: 'Bienal.', priority: 'HIGH', order: 9 },
  { modelName: '990 DUKE', yearFrom: 2005, yearTo: 2013, component: 'Corrente de comando — inspeção de ruído', intervalKm: 15000, intervalMonths: 12, notes: 'Item de atenção conhecido no motor LC8 — inspecionar por especialista.', priority: 'MEDIUM', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed KTM Duke (200/ABS, 390, 640/Duke II 640, 690, 990)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'KTM', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'KTM', vehicleTypeId: motoType.id },
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

  console.log('✅ KTM Duke concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
