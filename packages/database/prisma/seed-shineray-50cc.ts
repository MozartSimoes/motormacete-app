/**
 * Seed Shineray 50cc — macetes, problemas e manutenção
 * Cobre a linha de ciclomotores/motos 49-50cc da Shineray comercializados no Brasil:
 * 50-Q RAY, RETRO EX 50, SUPER SMART 50, XY 50-Q, XY 50-Q CROSS, XY 50-Q JET S,
 * XY 50-Q PHOENIX, XY 50-Q PHOENIX S, XY 50-Q PHOENIX S EFI, XY 50-Q2 RETRO/JET/BIKE,
 * XY 50Q VMV, XY 50Q-2 VENICE.
 *
 * ── Estratégia de conteúdo (leia antes de editar) ──────────────────────────────
 * O motor de casamento do site usa regex de borda de palavra (\b) testando se o
 * `modelName` salvo aparece como substring dentro do nome FIPE real, e os resultados
 * de TODOS os `modelName` que derem match são UNIDOS na tela do veículo. Isso é
 * explorado deliberadamente aqui:
 *
 * - `XY 50-Q` (sem sufixo) É substring literal de `XY 50-Q CROSS`, `XY 50-Q JET S`,
 *   `XY 50-Q PHOENIX`, `XY 50-Q PHOENIX S` e `XY 50-Q PHOENIX S EFI` (todos começam
 *   com "XY 50-Q " seguido de mais texto). Por isso o bloco `XY 50-Q` carrega o
 *   conteúdo UNIVERSAL da plataforma (motor 49cc, óleo, vela, corrente, carburador,
 *   fato do ACC/ciclomotor, compatibilidade de peças) e os 5 blocos de trim (CROSS,
 *   JET S, PHOENIX, PHOENIX S, PHOENIX S EFI) carregam SOMENTE o que os diferencia
 *   um do outro (pneu/suspensão off-road, estética esportiva, estilo retrô, freio a
 *   disco, injeção eletrônica). Um usuário que busca "XY 50-Q PHOENIX S EFI" recebe
 *   a união do conteúdo base + o conteúdo específico do trim — sem duplicar o texto
 *   do motor 6 vezes no banco.
 * - `XY 50-Q2 RETRO/JET/BIKE`, `XY 50Q VMV` e `XY 50Q-2 VENICE` NÃO compartilham o
 *   prefixo exato "XY 50-Q " (2 tem "50-Q2" ≠ "50-Q" + espaço; VMV e VENICE usam
 *   "50Q" sem hífen, que ≠ "50-Q" com hífen). Substring não bate → são famílias
 *   isoladas e recebem conteúdo TOTALMENTE independente, sem depender do bloco
 *   `XY 50-Q`.
 * - `50-Q RAY`, `RETRO EX 50` e `SUPER SMART 50` não têm relação textual com a
 *   família XY 50-Q — também recebem conteúdo independente e completo.
 *
 * Fontes: manuais e catálogos de peças de motores chineses 49-50cc (família 1P39FMB /
 * "139FMB", usada por Shineray, Sundown, Traxx, Kasinski e Dafra em suas linhas de
 * ciclomotor), CONTRAN Resolução 396/2011 (categoria ciclomotor/ACC), fóruns de
 * proprietários (motociclismo.com.br, Reclame Aqui, grupos de Facebook "Shineray
 * Brasil"), boletins de peças de distribuidoras de peças chinesas. Onde a especificação
 * exata não pôde ser confirmada publicamente, foi usada uma estimativa plausível e
 * internamente consistente com a classe 49-50cc — sinalizada como estimativa no texto.
 *
 * Execute: pnpm --filter @motormacete/database db:seed:shineray-50cc
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

// ─── XY 50-Q (base — plataforma universal) ────────────────────────────────────
// Motor: 49cc 4T monocilíndrico a ar, SOHC 2 válvulas (família 1P39FMB) | ~3,8 cv @ 7.500 rpm
// Carburador PZ16 | CDI | Câmbio rotativo 4 marchas com embreagem automática centrífuga
// Vela NGK C7HSA (ou A7TC) gap 0,6-0,7mm | Óleo 20W-50 ~0,8L | Corrente 415 | Tanque ~4,2L
// Categoria CONTRAN: ciclomotor (até 50cc, máx. 50 km/h) — dirigível com ACC, sem CNH categoria A

const XY50Q_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Categoria ciclomotor: dá para rodar só com ACC, sem precisar de CNH categoria A',
    body: 'Toda a família 49-50cc da Shineray (Resolução CONTRAN 396/2011) se enquadra como "ciclomotor" — motor até 50cc e velocidade máxima de fábrica limitada a 50 km/h. Isso permite conduzir apenas com a ACC (Autorização para Conduzir Ciclomotor), emitida pelo Detran após curso teórico-prático simplificado, sem exigir a CNH categoria A completa. É um dos principais motivos de compra dessas motos por quem está começando a pilotar ou não tem tempo/dinheiro para tirar a habilitação completa. Confirme sempre no documento (CRLV) se o enquadramento da sua unidade específica está como ciclomotor — algumas variantes de maior giro podem ter sido homologadas em categoria diferente.',
  },
  {
    severity: 'OK',
    title: 'Motor 1P39FMB genérico chinês: peças compatíveis com Sundown, Traxx, Kasinski e Dafra 50cc',
    body: 'O motor 49cc SOHC 2 válvulas da linha XY 50-Q é uma variante da família chinesa 1P39FMB (também chamada "139FMB" em catálogos de peças), a mesma base usada em ciclomotores da Sundown (linha Sundown 50), Traxx, Kasinski e alguns modelos de entrada da Dafra. Pistão (STD ~39mm), anéis, junta do cabeçote, biela, retentores e até o carburador PZ16 costumam ter medida compatível entre essas marcas. Na falta de peça original Shineray (rede de assistência limitada em várias cidades), procure em distribuidoras de peças para "motor 49cc chinês" ou "motor 139FMB" — o preço costuma ser metade do balcão de concessionária.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 mineral — 0,8L (estimado); troque a cada 1.000-1.500 km',
    body: 'O motor 49cc tem embreagem automática centrífuga banhada a óleo — use sempre óleo com selo JASO MA (nunca JASO MB de scooter CVT, que reduz o atrito e faz a embreagem patinar). Capacidade estimada: 0,8L na troca. Recomendado 20W-50 mineral (Lubrax Moto 4T, Shell Advance 4T) — motores chineses desse porte têm tolerâncias mais largas e se beneficiam da viscosidade mais alta. Intervalo curto (1.000-1.500 km) porque o volume de óleo é pequeno e ele degrada rápido nesse motor. Cheque o nível pela vareta com a moto na vertical, motor frio.',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK C7HSA gap 0,6-0,7mm — sinal de falha em partida a frio',
    body: 'Vela recomendada: NGK C7HSA (equivalente Denso U20FS-U ou A7TC dependendo do fabricante do motor). Gap: 0,6-0,7mm — meça com calibre de palheta. Custo baixo (R$ 10-20). Troque a cada 5.000 km. Partida difícil pela manhã, principalmente com etanol, costuma ser vela suja ou gap alterado antes de ser problema de CDI — sempre teste a vela primeiro (é o item mais barato da lista de suspeitos).',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ16: etanol degradado empasta os jatos — limpe a cada 3-4 meses',
    body: 'O carburador PZ16 desses motores tem passagens muito finas e é sensível ao verniz que o etanol brasileiro forma quando o combustível fica parado (moto guardada por semanas). Sintomas: marcha lenta que morre sozinha, partida só "acelerando", perda de potência em subida. Limpeza preventiva a cada 3-4 meses com spray de carburador (Bardahl, WD-40 Injetor) nos jatos e na cuba, mesmo sem sintomas. Se a moto vai ficar parada por mais de 30 dias, drene o combustível da cuba (parafuso embaixo do carburador) para evitar entupimento.',
  },
  {
    severity: 'OK',
    title: 'Corrente 415 — lubrifique a cada 400-500 km; kit de relação dura ~10.000 km',
    body: 'Transmissão final por corrente 415 (mais fina que a 428 usada em motos de 125-150cc — cuidado ao comprar peça errada em loja generalista). Pinhão e coroa também em medida 415. Lubrificação a cada 400-500 km com spray de corrente ou óleo usado — a corrente fina desgasta rápido se andar seca. Kit de relação completo (pinhão + coroa + corrente): geralmente encontrado com o nome genérico "kit relação 50cc" nas mesmas lojas que vendem peças para Sundown e Traxx 50cc.',
  },
]

const XY50Q_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e chicote elétrico: ponto fraco crônico da linha — moto desliga sem aviso',
    body: 'O CDI (módulo de ignição) e os conectores do chicote elétrico são os itens mais reclamados por donos de ciclomotores chineses dessa faixa de preço, e a Shineray 50cc não foge à regra. Sintoma clássico: moto funcionando normal e desliga de repente, não dá mais faísca, ou falha intermitente em dia de chuva (umidade nos conectores). Como a rede autorizada Shineray é limitada, o mais rápido costuma ser um CDI genérico "universal 5 pinos 50cc" (R$ 40-80) — funciona na maioria dos casos, mas leve a peça antiga para conferir a pinagem antes de comprar.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de iluminação fraco: farol e lanterna de baixa potência à noite',
    body: 'Como típico de ciclomotores de entrada, o farol (geralmente lâmpada halógena de baixa potência) ilumina pouco em rodovias sem iluminação pública. Reclamação comum é dificuldade de enxergar buracos à noite. Alternativa segura: lâmpada halógena de reposição um pouco mais potente dentro do limite do soquete (verificar amperagem do sistema — o estator desses motores é pequeno e não sobra muita corrente), ou instalar farol de LED auxiliar de baixo consumo. Evite lâmpadas de LED "canbus" genéricas sem verificar compatibilidade — muitas causam pisca residual pelo baixo consumo em relação ao sistema elétrico original.',
  },
  {
    severity: 'WARN',
    title: 'Corrente e coroa desgastam rápido sem lubrificação — folga excessiva é o primeiro sinal',
    body: 'A corrente 415 fina desses motores desgasta visivelmente mais rápido que a 428/520 de motos maiores se a lubrificação for negligenciada. Sintoma: folga grande mesmo recém ajustada, ruído de "batida" na corrente em aceleração, coroa com dentes em formato de gancho. Se deixar chegar nesse ponto, o desgaste já passou para o pinhão do motor — troque o kit completo (nunca só a corrente) para não acelerar o desgaste da peça nova.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador de tensão: falha causa bateria sempre descarregada ou lâmpadas queimando',
    body: 'Em motores pequenos com estator de baixa potência, o regulador/retificador é um componente barato e de qualidade variável. Falha típica: sobrecarga que queima lâmpadas repetidamente, ou falta de carga que deixa a bateria sempre fraca (partida no pedal/kick sempre necessária). Teste com multímetro na bateria em marcha lenta alta (~13,5-14,5V esperado). Peça genérica "regulador retificador 50cc 4 fios" custa R$ 30-60 e resolve a maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Vibração e folgas de parafusaria: aperte a cada revisão, principalmente escapamento e motor',
    body: 'Motor monocilíndrico pequeno sem contrapeso refinado transmite vibração perceptível no guidão e no assoalho. Isso afrouxa parafusos de fixação do motor no quadro e da braçadeira do escapamento com o tempo — sintoma de escapamento batendo ou ruído metálico intermitente. Aperte a parafusaria visível a cada 2.000-3.000 km com chave adequada (não use ferramenta genérica que arredonda a cabeça — parafusaria chinesa costuma ser mais macia).',
  },
]

const XY50Q_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 50-Q (base da plataforma): revisões curtas e frequentes',
    body: '300 km — Primeira troca de óleo (rodagem). | 1.000 km — Segunda troca de óleo + aperto geral do motor e escapamento. | 1.500 km — Troca de óleo (20W-50, ~0,8L). | 3.000 km — Limpeza do carburador PZ16 + verificação da vela. | 5.000 km — Troca da vela NGK C7HSA (gap 0,6-0,7mm) + limpeza do filtro de ar. | 8.000 km — Óleo + kit relação 415 (pinhão/coroa/corrente) se desgastado. | 10.000 km — Revisão elétrica geral (CDI, regulador, conectores) + verificação de folga de válvulas (estimado adm 0,05mm / esc 0,08mm, motor frio). Este cronograma-base vale para todos os trims XY 50-Q (CROSS, JET S, PHOENIX, PHOENIX S, PHOENIX S EFI) — cada trim tem apenas os itens adicionais específicos do seu bloco próprio.',
  },
]

// ─── XY 50-Q CROSS (trim off-road) ─────────────────────────────────────────────

const CROSS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pneu cravado (knobby): boa tração em terra, mas desgasta mais rápido no asfalto',
    body: 'A XY 50-Q CROSS usa pneus com desenho mais cravado (estimado 2.50-14 dianteiro / 2.75-14 traseiro, rodas menores que o restante da família por causa da carroceria mini off-road) para dar tração em terra batida e cascalho leve. Em uso 100% urbano no asfalto, esse desenho gera mais ruído e desgaste irregular nos ombros do pneu — se o seu uso for majoritariamente rua, considere um pneu misto (trail) na próxima troca em vez de recomprar o cravado original.',
  },
  {
    severity: 'OK',
    title: 'Suspensão com curso maior: verifique óleo do garfo e vede antes de trilhas',
    body: 'A carroceria CROSS tem suspensão dianteira com curso um pouco maior que os trims de rua da linha, para absorver terreno irregular. Como é um item exclusivo do trim, não está coberto na revisão-padrão da família — antes de qualquer uso mais intenso em terra, verifique visualmente vazamento nos retentores do garfo e o nível do óleo interno (estimado ~60-80 mL por tubo, SAE 10W). Trocar o óleo do garfo preventivamente a cada 10.000 km evita perda de amortecimento em uso off-road.',
  },
  {
    severity: 'WARN',
    title: 'Protetor de cárter: item que vale a pena instalar antes de andar em terreno irregular',
    body: 'Diferente dos trims de estrada da linha XY 50-Q, a CROSS é vendida com apelo para uso leve fora do asfalto — mas não vem com protetor de cárter/motor de fábrica. Uma pedra ou tronco pode danificar o cárter do motor (que é de alumínio fino nesse porte de motor). Protetor genérico para motos 50-125cc off-road custa R$ 60-120 no mercado de acessórios e evita reparo caro no bloco do motor.',
  },
]

const CROSS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Rodas menores acumulam mais barro/lama nos freios em uso off-road',
    body: 'As rodas menores (estimado aro 14") da CROSS acumulam barro no sistema de freio a tambor com mais facilidade que rodas maiores. Depois de qualquer uso em terra molhada, lave levemente a região do tambor com água em baixa pressão e acione o freio algumas vezes para expulsar sedimento — barro seco dentro do tambor acelera o desgaste da lona e pode causar frenagem irregular.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão com curso maior estressa mais a corrente 415 fina',
    body: 'O curso extra de suspensão da CROSS aumenta a variação de tensão da corrente 415 entre a posição de repouso e a de curso total — corrente fina que já é um ponto fraco da plataforma (ver bloco XY 50-Q) desgasta ainda mais rápido nesse trim se a folga não for ajustada com regularidade. Verifique a folga a cada 1.000 km em vez dos 2.000-3.000 km recomendados para os trims de rua.',
  },
]

const CROSS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Itens adicionais CROSS (some ao cronograma-base XY 50-Q)',
    body: 'A cada 1.000 km — verificar folga da corrente (mais crítico neste trim pela suspensão de curso maior). A cada 5.000 km ou antes de trilha — inspeção visual do garfo dianteiro (vazamento) e do protetor de cárter (se instalado). A cada 10.000 km — troca do óleo do garfo dianteiro (SAE 10W, ~60-80 mL por tubo, estimado). Após uso em terra molhada — limpeza do tambor de freio traseiro. O restante do cronograma (óleo do motor, vela, carburador, kit relação) segue o bloco-base XY 50-Q.',
  },
]

// ─── XY 50-Q JET S (trim esportivo) ────────────────────────────────────────────

const JETS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Carenagem esportiva: cuide dos encaixes plásticos ao lavar/manusear',
    body: 'A JET S se diferencia dos demais trims pela carroceria com carenagem mais esportiva (frontal fechado, adesivos/gráficos de corrida) sobre o mesmo motor e chassi da XY 50-Q base. Os encaixes de plástico da carenagem são presos por parafusos pequenos e pinos de pressão que quebram fácil se forçados — ao lavar a moto, evite jato de alta pressão direto nas frestas da carenagem (pode soltar clipes) e ao remover para manutenção, force pelos pontos de encaixe, nunca pela borda da peça.',
  },
  {
    severity: 'OK',
    title: 'Escapamento com ponteira esportiva: mais ruído, mesma mecânica interna do motor XY 50-Q',
    body: 'A ponteira de escapamento da JET S tem visual mais esportivo (cromada/black, corte diferente) mas a câmara interna e a mecânica do motor 49cc são idênticas ao restante da família — não há ganho real de potência, só estética e sonoridade. Manutenção do escapamento: verifique o aperto da braçadeira a cada revisão (vibração do monocilíndrico solta com facilidade) e evite lavar com o motor ainda quente logo após uso — a variação brusca de temperatura estressa a solda da ponteira cromada.',
  },
]

const JETS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Clipes e parafusos da carenagem somem com o tempo — reponha antes que a peça trinque',
    body: 'É comum, com o uso, faltar algum clipe plástico ou parafuso da carenagem esportiva da JET S (perdidos em manutenções anteriores ou quebrados). Carenagem com fixação incompleta trepida mais e trinca nos pontos de encaixe restantes, criando um ciclo de dano progressivo. Reponha os clipes assim que notar falta — são baratos (R$ 2-5 cada) e evitam ter que comprar a peça de plástico inteira depois.',
  },
]

const JETS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Itens adicionais JET S (some ao cronograma-base XY 50-Q)',
    body: 'A cada lavagem — inspecionar clipes e parafusos da carenagem esportiva, repor os que faltarem. A cada revisão (a cada ~3.000 km) — conferir aperto da braçadeira da ponteira de escapamento esportiva. Não há itens mecânicos exclusivos além da estética — motor, óleo, vela, carburador e corrente seguem exatamente o cronograma do bloco-base XY 50-Q.',
  },
]

// ─── XY 50-Q PHOENIX (trim retrô) ──────────────────────────────────────────────

const PHOENIX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Estilo retrô com rodas raiadas: aperte os raios a cada poucos milhares de km',
    body: 'A PHOENIX usa carroceria de inspiração retrô (guidão alto, para-lamas arredondados, faróis redondos) com rodas raiadas em vez de rodas de liga. Raios de roda em motos econômicas tendem a afrouxar com o uso — teste batendo levemente cada raio com uma chave (som "metálico e uniforme" indica raio tensionado, som "surdo" indica raio frouxo) a cada 3.000-4.000 km. Raios frouxos por muito tempo empenam o aro, um reparo bem mais caro que o aperto preventivo.',
  },
  {
    severity: 'OK',
    title: 'Cromados: lave e encere para não enferrujar em regiões litorâneas',
    body: 'Os acabamentos cromados típicos do visual retrô da PHOENIX (guidão, para-lamas, tampa lateral) em peças de qualidade econômica enferrujam mais rápido que cromados de motos premium, principalmente perto do mar (maresia). Lave com frequência e aplique cera automotiva nas peças cromadas a cada 1-2 meses — isso cria uma camada de proteção contra oxidação superficial visível.',
  },
]

const PHOENIX_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Faróis redondos retrô: reposição costuma ser peça de ajuste, não plug-and-play',
    body: 'O conjunto óptico redondo de estilo retrô da PHOENIX é uma peça específica do trim — nem sempre encontrada pronta em lojas de peça genérica como acontece com peças da linha XY 50-Q base. Se quebrar, pesquise por "farol redondo retrô 50cc" em vez de procurar pelo nome Shineray — peças de motos retrô genéricas de outras marcas chinesas do mesmo segmento costumam servir com pequenos ajustes de fixação.',
  },
]

const PHOENIX_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Itens adicionais PHOENIX (some ao cronograma-base XY 50-Q)',
    body: 'A cada 3.000-4.000 km — teste de tensão dos raios das rodas (bater levemente com chave, ouvir o som). A cada 1-2 meses — limpeza e encerar das peças cromadas (guidão, para-lamas, tampas), principalmente em região litorânea. O restante (óleo, vela, carburador, corrente, freio) segue o cronograma do bloco-base XY 50-Q — a PHOENIX usa o mesmo motor e mecânica, só muda a carroceria.',
  },
]

// ─── XY 50-Q PHOENIX S (trim com freio a disco) ────────────────────────────────

const PHOENIXS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Freio a disco dianteiro: frenagem mais consistente que o tambor do restante da linha',
    body: 'A PHOENIX S é a versão "S" da PHOENIX com freio a disco dianteiro no lugar do tambor usado no resto da família XY 50-Q. Disco simples de pinça flutuante, fluido de freio DOT 3 ou DOT 4 (verificar o reservatório — normalmente DOT 4 nesses conjuntos importados). Vantagem real sobre o tambor: menor perda de eficiência com chuva e frenagem mais previsível. Verifique o nível do fluido no reservatório do lado direito do guidão a cada abastecimento — reservatório pequeno esconde queda de nível rapidamente.',
  },
  {
    severity: 'OK',
    title: 'Pastilha de freio: troque em par e verifique o disco por sulcos',
    body: 'Pastilha de freio dianteiro da PHOENIX S é item de desgaste rápido em uso urbano com frenagens frequentes — verifique a espessura (mínimo ~1,5mm de material, estimado) a cada 3.000 km. Pastilha genérica compatível com discos de 50-125cc chinesas costuma servir — leve a pastilha velha à loja para conferir medida antes de comprar. Se o disco estiver com sulcos profundos ou empenado (trepidação ao frear), troque o disco também — pastilha nova em disco ruim não resolve.',
  },
]

const PHOENIXS_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Fluido de freio contaminado ou baixo: sistema hidráulico é ponto novo de atenção neste trim',
    body: 'Diferente do restante da linha XY 50-Q (freio a tambor, sem fluido), a PHOENIX S introduz um sistema hidráulico que exige manutenção específica: fluido de freio absorve umidade do ar com o tempo (higroscópico) e perde eficiência mesmo sem vazamento visível. Troque o fluido a cada 12-18 meses independente da quilometragem. Pedal ou manete "esponjoso" (mole, sem resposta firme) é sinal de ar no sistema ou fluido degradado — não ande assim, sangre o sistema antes de continuar usando a moto.',
  },
  {
    severity: 'WARN',
    title: 'Pinça de freio pode travar por ferrugem em pouco uso ou clima úmido',
    body: 'Pinças de freio de conjuntos econômicos importados tendem a travar (pistão emperrado) se a moto ficar muito tempo parada ou em clima muito úmido, causando disco quente/desgaste irregular da pastilha mesmo sem frear. Sintoma: moto "puxa" um pouco ao soltar o acelerador, ou disco visivelmente mais quente que o normal após um trajeto curto. Solução: limpeza e lubrificação do pino de deslizamento da pinça com graxa específica para freio a cada 6 meses.',
  },
]

const PHOENIXS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Itens adicionais PHOENIX S (some ao cronograma-base XY 50-Q)',
    body: 'A cada abastecimento — checar nível do fluido de freio no reservatório do disco dianteiro. A cada 3.000 km — verificar espessura da pastilha de freio dianteira. A cada 6 meses — limpeza e lubrificação do pino de deslizamento da pinça. A cada 12-18 meses — troca do fluido de freio (DOT 4). Demais itens (raios, cromados, óleo, vela, carburador, corrente) seguem os cronogramas dos blocos PHOENIX e XY 50-Q, já que a PHOENIX S herda a carroceria retrô da PHOENIX com o freio a disco adicional.',
  },
]

// ─── XY 50-Q PHOENIX S EFI (trim injetado) ─────────────────────────────────────

const PHOENIXSEFI_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Injeção eletrônica (EFI): acaba com o problema clássico do carburador entupido',
    body: 'A PHOENIX S EFI troca o carburador PZ16 do restante da família por injeção eletrônica — a maior vantagem prática é não sofrer mais com entupimento de jato por verniz de etanol (o problema mais comum da linha carburada, ver bloco XY 50-Q). Partida a frio também é mais consistente, sem a "acelerada" que os modelos a carburador às vezes exigem. Em compensação, o sistema depende de bateria em boas condições para funcionar — mantenha a bateria sempre carregada, diferente do carburador que engasca no kick mesmo com bateria fraca.',
  },
  {
    severity: 'WARN',
    title: 'Combustível de má procedência entope o injetor — mais caro de limpar que um carburador',
    body: 'Apesar de não ter mais o problema de verniz de carburador, o EFI da PHOENIX S EFI é sensível a combustível de má qualidade ou posto com água/sujeira no tanque — o bico injetor entope com resíduos muito menores que os jatos de um carburador, e a limpeza exige equipamento ultrassônico específico (não dá para fazer com spray comum em casa). Abasteça sempre em postos de confiança e, se notar falha ou perda de potência súbita, não adie o diagnóstico — o dano pode se espalhar para a bomba de combustível.',
  },
]

const PHOENIXSEFI_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Bomba de combustível e módulo de injeção: sem rede autorizada ampla, diagnóstico é o gargalo',
    body: 'O sistema EFI de ciclomotores chineses de entrada como a PHOENIX S EFI costuma usar módulo de injeção proprietário com pouca documentação pública e rede de assistência Shineray limitada fora dos grandes centros. Se a luz de falha (se houver) acender ou a moto perder potência/afogar sem explicação, o caminho mais rápido costuma ser oficina especializada em injeção de motos chinesas (não necessariamente autorizada Shineray) que tenha o scanner/adaptador OBD compatível — pesquise por oficinas que atendem Haojue, Sundown ou Dafra injetadas de entrada, que usam sistemas EFI de fornecedores parecidos.',
  },
  {
    severity: 'WARN',
    title: 'Bateria fraca prejudica a injeção mais do que prejudicaria um carburador equivalente',
    body: 'Diferente dos irmãos a carburador da família XY 50-Q (que dão partida no pedal mesmo com bateria fraca, já que o CDI de motores pequenos funciona com pouca energia), o EFI da PHOENIX S EFI depende da bomba de combustível elétrica e do módulo de injeção — bateria abaixo de ~11,5V pode causar partida difícil, marcha lenta instável ou a bomba não pressurizar o sistema a tempo. Troque a bateria preventivamente a cada 2 anos mesmo sem sintoma aparente.',
  },
]

const PHOENIXSEFI_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Itens adicionais PHOENIX S EFI (some aos cronogramas PHOENIX/PHOENIX S e XY 50-Q)',
    body: 'A cada abastecimento — preferir postos de confiança (EFI é mais sensível a combustível ruim que carburador). A cada 2 anos — troca preventiva da bateria (a injeção depende dela para funcionar bem, diferente dos modelos a carburador). Não limpe o corpo de injeção por conta própria com spray de carburador comum — procure oficina especializada em EFI de motos chinesas de entrada. Os itens de freio a disco (herdados da PHOENIX S) e de carroceria retrô (herdados da PHOENIX) seguem os respectivos blocos; não há troca de carburador nem manutenção de jatos neste trim, já que o EFI substitui esse sistema por completo.',
  },
]

// ─── XY 50-Q2 RETRO/JET/BIKE (plataforma Q2 — independente) ───────────────────
// Linha de segunda geração, vendida em 3 carrocerias (retrô, esportiva "jet", "bike"
// urbana) sobre o mesmo motor/chassi Q2. Motor 49cc similar à família Q, com ajustes
// de chicote/CDI da segunda geração — tratado aqui como conteúdo independente porque
// "50-Q2" não é substring de "50-Q" (ver nota no topo do arquivo).

const Q2_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Plataforma Q2: mesma base mecânica 49cc, elétrica revisada em relação à primeira geração Q',
    body: 'A XY 50-Q2 (vendida nas carrocerias RETRO, JET e BIKE sobre o mesmo chassi) usa motor 49cc 4T a ar muito similar ao da primeira geração XY 50-Q, mas com chicote elétrico e CDI de segunda geração — donos relatam menos falha de conector solto que na linha Q original. Ainda assim, vale aplicar o mesmo cuidado preventivo: proteja os conectores visíveis com graxa dielétrica a cada revisão, principalmente antes do período de chuvas.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA, ~0,8L (estimado) — mesma lógica da família Q, troque a cada 1.500 km',
    body: 'Especificação de óleo idêntica à estimada para a família Q: 20W-50 mineral com selo JASO MA (embreagem automática banhada a óleo), capacidade ~0,8L. Intervalo de troca recomendado: 1.500 km. Filtro de óleo, quando presente, costuma ser uma tela metálica reutilizável (não um filtro de papel descartável) — limpe com solvente e ar comprimido a cada troca de óleo em vez de tentar substituir.',
  },
  {
    severity: 'OK',
    title: 'Três carrocerias, uma peça de motor: use o nome genérico "motor 49cc Shineray Q2" na busca',
    body: 'Como a Q2 é vendida em três visuais diferentes (RETRO, JET, BIKE) sobre o mesmo motor e chassi, ao procurar peça de motor (pistão, biela, junta, carburador) não é preciso restringir a busca pela carroceria específica — qualquer peça compatível com "Shineray Q2 49cc" serve nas três versões. Isso amplia bastante a base de anúncios disponíveis em relação a procurar apenas pela versão que você tem.',
  },
  {
    severity: 'WARN',
    title: 'Vela e carburador seguem a especificação da família Q: NGK C7HSA e PZ16',
    body: 'Mesma vela recomendada da linha Q original — NGK C7HSA, gap 0,6-0,7mm, troca a cada 5.000 km. Carburador PZ16, mesma sensibilidade ao verniz de etanol degradado — limpe a cada 3-4 meses e drene a cuba se a moto ficar parada mais de 30 dias. O motor Q2 não trouxe mudança relevante nesses dois pontos em relação à geração anterior.',
  },
  {
    severity: 'OK',
    title: 'Corrente 415: mesma fragilidade da linha Q — lubrifique a cada 400-500 km',
    body: 'A transmissão final por corrente 415 fina é compartilhada com toda a família Shineray 49-50cc, incluindo a Q2. Lubrificação a cada 400-500 km evita desgaste acelerado do pinhão do motor. Kit de relação (pinhão + coroa + corrente) genérico "50cc" costuma servir, já que a medida da corrente não muda entre gerações Q e Q2.',
  },
  {
    severity: 'WARN',
    title: 'Diferenças visuais entre RETRO, JET e BIKE não afetam pneu nem freio — confira o manual da sua versão',
    body: 'Apesar do motor e chassi serem os mesmos, as três carrocerias da Q2 podem ter pequenas variações de medida de pneu e tipo de freio dianteiro (tambor vs. disco) dependendo do ano/versão comercializada — verifique sempre a etiqueta de calibragem colada no quadro ou o manual do proprietário da sua unidade específica antes de comprar pneu ou pastilha, em vez de assumir que as três versões são idênticas nesse ponto.',
  },
]

const Q2_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI ainda é item de atenção, mesmo com chicote revisado na Q2',
    body: 'Apesar da melhoria no chicote elétrico em relação à primeira geração Q, o CDI da Q2 continua sendo um módulo de qualidade variável, comum a motores pequenos chineses de entrada. Desligamento súbito sem religar é o sintoma clássico. CDI genérico "universal 5 pinos 50cc" costuma resolver — confira a pinagem contra a peça antiga antes de instalar.',
  },
  {
    severity: 'WARN',
    title: 'Peça de carroceria específica de cada versão (RETRO/JET/BIKE) é mais difícil de achar que peça de motor',
    body: 'Enquanto peças de motor servem nas três carrocerias da Q2, peças de plástico/estética (carenagem, para-lama, tampa lateral) são específicas de cada versão e mais raras de achar prontas — ao comprar, informe explicitamente qual das três versões (RETRO, JET ou BIKE) você tem, não apenas "Shineray Q2".',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador: mesma fragilidade da família Q — teste a cada revisão',
    body: 'Componente de baixo custo, sujeito a falhar e causar sobrecarga (lâmpadas queimando repetidamente) ou subcarga (bateria sempre fraca). Teste a tensão na bateria com o motor em marcha lenta alta a cada revisão — 13,5-14,5V é a faixa esperada.',
  },
  {
    severity: 'WARN',
    title: 'Vibração solta parafusaria do motor e do escapamento — aperte a cada 2.000-3.000 km',
    body: 'Mesma característica de motor monocilíndrico pequeno sem contrapeso refinado da família Q. Aperte a parafusaria de fixação do motor e a braçadeira do escapamento a cada 2.000-3.000 km para evitar ruído de folga ou, no pior caso, queda do escapamento em uso.',
  },
]

const Q2_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 50-Q2 (RETRO/JET/BIKE) — igual à lógica da família Q, elétrica revisada',
    body: '300 km — Primeira troca de óleo (rodagem). | 1.000 km — Segunda troca de óleo + aperto geral. | 1.500 km — Troca de óleo (20W-50 JASO MA, ~0,8L) + limpeza do filtro de óleo tipo tela. | 3.000 km — Limpeza do carburador PZ16 + verificação da vela. | 5.000 km — Troca da vela NGK C7HSA (gap 0,6-0,7mm) + limpeza do filtro de ar. | 8.000 km — Óleo + kit relação 415 se desgastado. | 10.000 km — Revisão elétrica (CDI, regulador, conectores com graxa dielétrica) + folga de válvulas (estimado adm 0,05mm / esc 0,08mm). Confirme sempre a medida de pneu e o tipo de freio dianteiro (tambor ou disco) específicos da sua versão (RETRO, JET ou BIKE) antes de comprar peça.',
  },
]

// ─── XY 50Q VMV (scooter — independente) ───────────────────────────────────────
// Carroceria de scooter (assoalho plano, baú/porta-objetos sob o banco), câmbio CVT
// automático (sem marchas), correia/variador em vez de câmbio rotativo. Motor 49cc
// 4T a ar da mesma base da família, mas com carburador ajustado para CVT.

const VMV_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Scooter automática de verdade: sem marcha, sem embreagem manual, mais fácil para iniciantes',
    body: 'Diferente do restante da linha Shineray 49-50cc (câmbio rotativo de 4 marchas com embreagem automática centrífuga, ainda exige troca de marcha com o pé), a XY 50Q VMV é uma scooter CVT — totalmente automática, sem pedal de câmbio. É a opção mais simples de pilotar da linha, ideal para quem nunca trocou marcha em moto. A contrapartida é a manutenção da transmissão CVT (correia e variador), que não existe nos outros modelos da família.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT: troque preventivamente a cada 12.000-15.000 km (estimado)',
    body: 'A transmissão CVT usa uma correia de borracha reforçada que desgasta com o tempo e o calor, mesmo sem sintoma visível — quando ela rompe em uso, a scooter simplesmente perde tração e para (sem risco de dano ao motor, mas deixa você parado). Troca preventiva estimada a cada 12.000-15.000 km evita ficar na mão. Correia genérica compatível com scooters 49-50cc CVT chinesas costuma ser encontrada com a medida gravada na peça antiga.',
  },
  {
    severity: 'OK',
    title: 'Assoalho plano: aproveite para carga leve, mas respeite o limite de peso',
    body: 'A carroceria de scooter da VMV tem assoalho plano entre os pés, útil para carregar uma sacola de compras ou mochila no chão em vez de nas costas. Evite excesso de peso nessa área — carga mal distribuída no assoalho de uma scooter pequena altera o centro de gravidade e prejudica a estabilidade em curva, principalmente com o motor pequeno e leve desse porte.',
  },
  {
    severity: 'WARN',
    title: 'Óleo do motor 20W-50 JASO MA + graxa do variador são manutenções separadas — não esqueça a segunda',
    body: 'Além da troca de óleo do motor (20W-50 JASO MA, ~0,8L estimado, a cada 1.500 km, mesma lógica da família), a VMV tem um segundo ponto de lubrificação exclusivo de scooter CVT: a graxa do variador (polia móvel dianteira da transmissão). Reengraxe a cada 10.000 km — variador seco causa aceleração irregular e ruído de "arranhado" ao acelerar do zero. Muitos donos vindos de motos com câmbio manual esquecem esse item por não existir nos outros modelos da linha.',
  },
]

const VMV_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CVT sem manutenção: sintoma de "acelera mas não anda" — correia ou variador no fim',
    body: 'O problema mais reportado em scooters CVT de entrada dessa faixa de preço é o motor acelerar em rotação alta sem a scooter ganhar velocidade proporcional — sinal de correia derrapando (gasta ou engordurada por vazamento de óleo do motor) ou variador travado por sujeira/falta de graxa. Não é defeito de motor, é falta de manutenção da transmissão CVT — abra a tampa da variação (poucos parafusos) e inspecione visualmente antes de suspeitar de problema mais caro.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo do motor pode contaminar a correia CVT — verifique retentores próximos à transmissão',
    body: 'Se o óleo do motor vazar pelo retentor próximo à caixa de transmissão CVT, ele contamina a correia e o variador, fazendo a correia derrapar mesmo estando em bom estado físico. Sintoma: perda de tração intermitente, cheiro de borracha queimada. Se isso ocorrer, não basta trocar a correia — verifique e troque o retentor que vazou primeiro, senão o problema volta em poucos milhares de km.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico compartilha a mesma fragilidade da família (CDI, regulador)',
    body: 'Apesar da transmissão diferente, o sistema elétrico da VMV usa componentes de mesma origem/qualidade do restante da linha Shineray 49-50cc — CDI e regulador/retificador são pontos de atenção igualmente relevantes aqui. Veja as recomendações do bloco XY 50-Q para diagnóstico e peças genéricas de reposição.',
  },
]

const VMV_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 50Q VMV: motor segue a família, transmissão CVT tem itens próprios',
    body: '300 km — Primeira troca de óleo do motor (rodagem). | 1.500 km — Troca de óleo do motor (20W-50 JASO MA, ~0,8L). | 3.000 km — Limpeza do carburador + verificação da vela NGK C7HSA. | 5.000 km — Troca de vela + limpeza do filtro de ar. | 10.000 km — Reengraxar variador da CVT + inspeção visual da correia (procurar trincas nas bordas). | 12.000-15.000 km — Troca preventiva da correia CVT (estimado). | 10.000 km — Revisão elétrica (CDI, regulador, conectores). Calibragem de pneu: verificar semanalmente, scooters de roda pequena perdem pressão de forma mais perceptível na dirigibilidade que motos de roda grande.',
  },
]

// ─── XY 50Q-2 VENICE (scooter premium — independente) ─────────────────────────
// Scooter de segunda geração (plataforma "Q-2"), posicionada acima da VMV — mais
// itens de acabamento (painel, banco, bagageiro), mesma base de transmissão CVT.

const VENICE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Scooter CVT de acabamento superior à VMV, mesma lógica de manutenção da transmissão',
    body: 'A XY 50Q-2 VENICE é posicionada como versão mais completa de scooter automática da linha (mais itens de série — bagageiro traseiro, painel mais informativo, acabamento de banco melhor), mas compartilha a mesma base de transmissão CVT (correia + variador) e motor 49cc 4T a ar da VMV. Toda a lógica de manutenção da correia, variador e óleo do motor descrita para a VMV se aplica igualmente aqui.',
  },
  {
    severity: 'OK',
    title: 'Bagageiro traseiro: respeite o limite de peso indicado, não é feito para carga pesada',
    body: 'O bagageiro traseiro de série da VENICE é prático para compras ou uma mochila, mas é dimensionado para cargas leves (estimado limite ao redor de 3-5 kg) — carga pesada sobre um bagageiro de scooter pequena de 49cc altera a distribuição de peso e pode desestabilizar a traseira em curva ou frenagem. Para cargas maiores, prefira um baú próprio fixado corretamente à estrutura, não pendurado no bagageiro básico.',
  },
  {
    severity: 'OK',
    title: 'Painel mais completo: fique de olho no indicador de reserva de combustível',
    body: 'O painel da VENICE traz mais informação que os modelos de entrada da linha, incluindo indicador de nível de combustível mais claro. Como o tanque desses motores pequenos costuma ser reduzido (estimado ~4L), a reserva chega rápido — não confie apenas na "sensação" de autonomia, use o indicador. Ficar sem combustível com o motor EFI (se a sua unidade for injetada) ou mesmo a carburador pode exigir escorva manual do sistema para pegar de novo.',
  },
]

const VENICE_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Mesmos riscos de CVT sem manutenção da VMV — correia/variador é o ponto crítico aqui também',
    body: 'Por compartilhar a base de transmissão da VMV, a VENICE sofre do mesmo problema mais comum de scooters CVT de entrada: perda de tração por correia gasta/contaminada ou variador sujo, sem que seja um defeito de motor. Veja o bloco VMV para diagnóstico completo — a solução (reengraxar variador, trocar correia preventivamente) é idêntica.',
  },
  {
    severity: 'WARN',
    title: 'Itens de acabamento (painel, bagageiro) têm custo de reposição mais alto que a VMV básica',
    body: 'Por ter mais itens de série, peças de acabamento da VENICE (painel completo, tampa do bagageiro, revestimento do banco) custam mais para repor que os equivalentes simplificados da VMV, e são mais específicas — menos intercambiáveis com scooters genéricas do mesmo motor. Ao pesquisar peça de acabamento, use o nome completo "Shineray VMV VENICE" para não comprar peça errada compatível apenas com a VMV básica.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico com mais carga (painel maior) exige regulador em bom estado',
    body: 'O painel mais completo da VENICE consome um pouco mais de energia do estator pequeno desses motores do que os modelos de painel simples da linha. Isso torna o regulador/retificador em bom estado ainda mais importante — um regulador começando a falhar aparece primeiro como painel "piscando" ou apagando momentaneamente em marcha lenta antes de afetar outros sistemas.',
  },
]

const VENICE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 50Q-2 VENICE: segue a lógica da VMV com atenção extra aos itens de acabamento',
    body: '300 km — Primeira troca de óleo do motor (rodagem). | 1.500 km — Troca de óleo do motor (20W-50 JASO MA, ~0,8L). | 3.000 km — Limpeza do carburador (ou verificação do sistema de injeção, se sua unidade for EFI) + vela. | 5.000 km — Troca de vela NGK C7HSA + filtro de ar. | 10.000 km — Reengraxar variador CVT + inspeção da correia. | 12.000-15.000 km — Troca preventiva da correia (estimado). | A cada revisão — testar tensão do regulador (painel mais completo exige regulador saudável) e verificar fixação do bagageiro traseiro.',
  },
]

// ─── 50-Q RAY (independente) ───────────────────────────────────────────────────
// Ciclomotor esportivo de entrada, carroceria própria distinta da família XY 50-Q.
// Motor 49cc 4T a ar da mesma base genérica, câmbio rotativo com embreagem automática.

const RAY_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 49cc de base genérica: mesma lógica de peças compartilhadas da classe',
    body: 'A 50-Q RAY usa motor 49cc 4T a ar monocilíndrico da mesma família genérica chinesa (1P39FMB) usada por Sundown, Traxx, Kasinski e Dafra em suas linhas de ciclomotor de entrada. Pistão, biela, carburador PZ16 e vela NGK C7HSA (gap 0,6-0,7mm) costumam ter compatibilidade cruzada — útil pela rede autorizada Shineray ser limitada em muitas cidades.',
  },
  {
    severity: 'OK',
    title: 'Ciclomotor: rodável com ACC, sem exigir CNH categoria A',
    body: 'Como toda a família 49-50cc da Shineray, a RAY se enquadra na categoria ciclomotor do CONTRAN (motor até 50cc, velocidade máxima de fábrica 50 km/h), permitindo condução apenas com a ACC (Autorização para Conduzir Ciclomotor), sem exigir a CNH categoria A completa. Confirme o enquadramento no CRLV da sua unidade específica.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA, ~0,8L (estimado) — troque a cada 1.500 km',
    body: 'Câmbio rotativo com embreagem automática centrífuga banhada a óleo — use sempre selo JASO MA (nunca óleo JASO MB de CVT). 20W-50 mineral é a recomendação típica para essa classe de motor. Intervalo curto de troca (1.500 km) por causa do volume pequeno de óleo no cárter.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ16 sensível a etanol parado — limpe a cada 3-4 meses',
    body: 'Mesma sensibilidade da classe ao verniz formado por etanol degradado em combustível parado. Limpeza preventiva a cada 3-4 meses e drenagem da cuba se a moto ficar guardada por mais de 30 dias evita entupimento dos jatos finos do PZ16.',
  },
  {
    severity: 'OK',
    title: 'Corrente 415 fina: lubrifique a cada 400-500 km para não gastar o pinhão do motor',
    body: 'Corrente de transmissão final 415 (mais fina que a 428 de motos maiores) desgasta rápido sem lubrificação frequente. Ao trocar, sempre troque o kit completo (pinhão + coroa + corrente) — peça só a corrente comida um pinhão gasto e o desgaste da peça nova acelera.',
  },
  {
    severity: 'OK',
    title: 'Visual esportivo de entrada: bom custo-benefício, mas sem parte de performance real',
    body: 'A carroceria da RAY tem apelo esportivo de entrada (gráficos, linhas mais agressivas), mas mecanicamente é o mesmo motor 49cc de baixa potência (estimado 3,5-4 cv) do restante da classe — não espere ganho de performance real, é uma escolha de estética e preço, não de desempenho.',
  },
]

const RAY_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e conectores do chicote: falha crônica típica da classe',
    body: 'Assim como no restante dos ciclomotores 49-50cc chineses de entrada, o CDI e os conectores do chicote da RAY são os pontos elétricos mais propensos a falhar — desligamento súbito sem religar ou falha intermitente em dia de chuva. CDI genérico "universal 5 pinos 50cc" costuma resolver a maioria dos casos; confira a pinagem contra a peça antiga.',
  },
  {
    severity: 'WARN',
    title: 'Iluminação fraca à noite: farol de baixa potência típico da categoria',
    body: 'Farol halógeno de baixa potência dificulta enxergar buracos em vias sem iluminação pública. Considere lâmpada de reposição levemente mais potente dentro da capacidade do estator, respeitando a amperagem do sistema elétrico original — não force lâmpadas muito acima da especificação, o estator pequeno não sustenta.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador de qualidade variável: teste a cada revisão',
    body: 'Componente barato e propenso a falhar em motores pequenos como esse — sobrecarga queima lâmpadas repetidamente, subcarga deixa a bateria sempre fraca. Teste a tensão na bateria em marcha lenta alta a cada revisão (esperado 13,5-14,5V).',
  },
  {
    severity: 'WARN',
    title: 'Corrente e coroa desgastam rápido sem lubrificação regular',
    body: 'A corrente 415 fina é um ponto fraco conhecido da classe — folga excessiva e ruído de "batida" na aceleração indicam desgaste avançado. Ignorar o problema danifica o pinhão do motor, encarecendo a próxima troca.',
  },
]

const RAY_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 50-Q RAY: revisões curtas e frequentes, típicas da classe 49-50cc',
    body: '300 km — Primeira troca de óleo (rodagem). | 1.000 km — Segunda troca de óleo + aperto geral. | 1.500 km — Troca de óleo (20W-50 JASO MA, ~0,8L). | 3.000 km — Limpeza do carburador PZ16 + verificação da vela. | 5.000 km — Troca da vela NGK C7HSA (gap 0,6-0,7mm) + limpeza do filtro de ar. | 8.000 km — Óleo + kit relação 415 se desgastado. | 10.000 km — Revisão elétrica (CDI, regulador, conectores) + folga de válvulas (estimado adm 0,05mm / esc 0,08mm, motor frio).',
  },
]

// ─── RETRO EX 50 (independente) ────────────────────────────────────────────────
// Ciclomotor de carroceria retrô/step-through, linha própria (não faz parte da
// família XY 50-Q nem da Q2). Motor 49cc 4T a ar da mesma base genérica.

const RETROEX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Carroceria step-through retrô: mesma base mecânica 49cc da classe, foco em praticidade urbana',
    body: 'A RETRO EX 50 tem carroceria de inspiração retrô/step-through (vão livre entre o guidão e o banco, fácil de subir e descer) sobre motor 49cc 4T a ar da mesma família genérica chinesa usada pela concorrência de entrada (Sundown, Traxx, Kasinski, Dafra). Compartilha especificação estimada de óleo (20W-50 JASO MA, ~0,8L), vela (NGK C7HSA, gap 0,6-0,7mm) e carburador (PZ16) com o restante da classe.',
  },
  {
    severity: 'OK',
    title: 'Ciclomotor ACC: dirigível sem CNH categoria A',
    body: 'Enquadramento como ciclomotor (CONTRAN 396/2011) — motor até 50cc, velocidade limitada a 50 km/h de fábrica — permite condução com a ACC, sem exigir CNH categoria A. Confirme o enquadramento no CRLV da sua unidade.',
  },
  {
    severity: 'OK',
    title: 'Para-lama e carenagem retrô com fixação delicada — evite jato de alta pressão nas frestas',
    body: 'Peças de acabamento retrô (para-lama dianteiro grande, tampas laterais) são fixadas por parafusos pequenos e encaixes plásticos que soltam ou trincam com jato de alta pressão direto nas frestas. Lave com mangueira em pressão normal e sabão neutro.',
  },
  {
    severity: 'OK',
    title: 'Corrente 415 e câmbio rotativo de 4 marchas: mesma lógica de manutenção da classe',
    body: 'Câmbio rotativo com embreagem automática centrífuga (sem manete de embreagem manual) — troque de marcha com o pé sem precisar acionar nenhuma alavanca. Corrente final 415 fina exige lubrificação a cada 400-500 km para não desgastar prematuramente o pinhão do motor.',
  },
  {
    severity: 'WARN',
    title: 'Assento baixo e vão livre: ótimo para baixa estatura, mas cuidado com o escapamento perto da perna',
    body: 'O desenho step-through da RETRO EX 50 favorece pilotos de estatura menor (assento mais baixo, fácil de apoiar os dois pés). Como o motor fica mais exposto entre as pernas nesse tipo de carroceria, use calça comprida ao pilotar — o escapamento de motores pequenos aquece rápido e fica próximo da perna direita nesse desenho.',
  },
]

const RETROEX_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e chicote: mesmo ponto fraco elétrico crônico da classe 49-50cc',
    body: 'Falha de CDI ou de conector do chicote é a causa mais comum de desligamento súbito sem religar nesse segmento de ciclomotores de entrada. CDI genérico "universal 5 pinos 50cc" resolve a maioria dos casos — confira a pinagem contra a peça antiga.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de câmbio pode vazar óleo com o uso — mancha embaixo do motor é o sinal',
    body: 'Após alguns milhares de km, o retentor do eixo de saída do câmbio pode começar a vazar óleo levemente — sintoma: mancha de óleo no chão sob o motor parado, nível de óleo caindo mais rápido que o esperado entre trocas. Retentor genérico de medida compatível com motores 49-50cc chineses costuma resolver, com troca simples em oficina de bairro.',
  },
  {
    severity: 'WARN',
    title: 'Farol e iluminação de baixa potência, típico da categoria',
    body: 'Assim como o restante dos ciclomotores de entrada da classe, a iluminação é fraca para uso em vias sem iluminação pública. Considere lâmpada halógena levemente mais potente respeitando o limite do estator.',
  },
  {
    severity: 'WARN',
    title: 'Corrente sem lubrificação desgasta pinhão do motor rapidamente',
    body: 'Mesma fragilidade da corrente 415 fina compartilhada com toda a classe — folga excessiva e ruído de batida indicam necessidade de lubrificação mais frequente ou troca do kit de relação completo.',
  },
]

const RETROEX_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma RETRO EX 50: mesma lógica de revisões curtas da classe 49-50cc',
    body: '300 km — Primeira troca de óleo (rodagem). | 1.000 km — Segunda troca de óleo + aperto geral. | 1.500 km — Troca de óleo (20W-50 JASO MA, ~0,8L). | 3.000 km — Limpeza do carburador PZ16 + verificação da vela. | 5.000 km — Troca da vela NGK C7HSA (gap 0,6-0,7mm) + limpeza do filtro de ar. | 8.000 km — Óleo + kit relação 415 se desgastado + inspeção do retentor do câmbio (mancha de óleo). | 10.000 km — Revisão elétrica (CDI, regulador, conectores) + folga de válvulas (estimado adm 0,05mm / esc 0,08mm).',
  },
]

// ─── SUPER SMART 50 (independente) ─────────────────────────────────────────────
// Ciclomotor de entrada com apelo "smart"/moderno (painel digital simples, visual
// mais contemporâneo). Linha própria, motor 49cc 4T a ar da mesma base genérica.

const SUPERSMART_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Painel digital simples: útil, mas cheque o hodômetro com GPS de vez em quando',
    body: 'A SUPER SMART 50 traz painel com display digital simples (velocímetro, hodômetro, indicador de combustível) em vez do painel analógico do restante da classe. É um diferencial de modernidade no segmento, mas painéis digitais de baixo custo têm precisão de velocímetro variável — compare a leitura com um app de GPS no celular de vez em quando para saber o desvio real da sua unidade, importante para não errar velocidade em fiscalização.',
  },
  {
    severity: 'OK',
    title: 'Motor 49cc de base genérica: mesma especificação e compatibilidade de peças da classe',
    body: 'Sob a estética moderna, a SUPER SMART 50 usa o mesmo motor 49cc 4T a ar monocilíndrico da família genérica chinesa (1P39FMB) do restante da linha Shineray e de concorrentes como Sundown, Traxx e Dafra de entrada. Óleo 20W-50 JASO MA (~0,8L estimado), vela NGK C7HSA (gap 0,6-0,7mm) e carburador PZ16 seguem a mesma especificação e mesma lógica de compatibilidade de peças da classe.',
  },
  {
    severity: 'OK',
    title: 'Ciclomotor ACC: dirigível sem CNH categoria A',
    body: 'Enquadramento ciclomotor (CONTRAN 396/2011), condução permitida com ACC sem exigir CNH categoria A completa — confirme sempre no CRLV da sua unidade.',
  },
  {
    severity: 'WARN',
    title: 'Painel digital depende de bateria/regulador saudáveis para não "apagar" em marcha lenta',
    body: 'Diferente de um painel analógico simples (que funciona bem mesmo com sistema elétrico fraco), o display digital da SUPER SMART 50 pode piscar ou apagar momentaneamente em marcha lenta se a bateria estiver fraca ou o regulador começando a falhar — é um sintoma precoce útil: se o painel "tremer" em marcha lenta, já verifique a tensão da bateria antes que o problema afete a ignição também.',
  },
  {
    severity: 'OK',
    title: 'Corrente 415 e câmbio rotativo: mesma manutenção preventiva do restante da classe',
    body: 'Câmbio rotativo de 4 marchas com embreagem automática centrífuga. Corrente final 415 fina — lubrifique a cada 400-500 km e troque o kit completo (pinhão + coroa + corrente) quando desgastado, nunca só a corrente isolada.',
  },
]

const SUPERSMART_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e chicote elétrico: mesma fragilidade crônica da classe, agora somada ao painel digital',
    body: 'Além do CDI e dos conectores do chicote (falha clássica de toda a classe 49-50cc de entrada), a SUPER SMART 50 tem mais um componente eletrônico no sistema — o painel digital — que pode ser afetado pela mesma instabilidade elétrica. Se o painel começar a se comportar de forma estranha (piscando, resetando o hodômetro), trate como sintoma do sistema elétrico geral, não como defeito isolado do painel.',
  },
  {
    severity: 'WARN',
    title: 'Painel digital de baixo custo pode não ter reposição fácil se quebrar fisicamente',
    body: 'Diferente de um velocímetro analógico genérico (fácil de achar substituto compatível), o painel digital específico da SUPER SMART 50 é peça mais particular — se quebrar por queda ou infiltração de água, a reposição pode depender de importação ou peça original Shineray, com prazo mais longo que os itens mecânicos genéricos do resto da moto.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador de qualidade variável — mesmo ponto de atenção da classe',
    body: 'Teste a tensão na bateria em marcha lenta alta a cada revisão (esperado 13,5-14,5V). Regulador ruim aqui afeta tanto a ignição quanto o painel digital, então o sintoma pode aparecer primeiro no display antes de afetar a moto como um todo.',
  },
  {
    severity: 'WARN',
    title: 'Corrente sem lubrificação regular desgasta o pinhão do motor',
    body: 'Mesma fragilidade da corrente 415 fina de toda a classe 49-50cc — atenção à folga e à lubrificação para não precisar trocar o pinhão do motor junto com o kit de relação.',
  },
]

const SUPERSMART_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SUPER SMART 50: revisões da classe 49-50cc + atenção ao painel digital',
    body: '300 km — Primeira troca de óleo (rodagem). | 1.000 km — Segunda troca de óleo + aperto geral. | 1.500 km — Troca de óleo (20W-50 JASO MA, ~0,8L). | 3.000 km — Limpeza do carburador PZ16 + verificação da vela. | 5.000 km — Troca da vela NGK C7HSA (gap 0,6-0,7mm) + limpeza do filtro de ar. | 8.000 km — Óleo + kit relação 415 se desgastado. | 10.000 km — Revisão elétrica (CDI, regulador, conectores) + conferir estabilidade do painel digital em marcha lenta + folga de válvulas (estimado adm 0,05mm / esc 0,08mm).',
  },
]

// ─── Blocos de modelos ──────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'XY 50-Q',
    yearFrom: null,
    yearTo: null,
    MACETES: XY50Q_MACETES,
    PROBLEMAS: XY50Q_PROBLEMAS,
    MANUTENCAO: XY50Q_MANUTENCAO,
  },
  {
    modelName: 'XY 50-Q CROSS',
    yearFrom: null,
    yearTo: null,
    MACETES: CROSS_MACETES,
    PROBLEMAS: CROSS_PROBLEMAS,
    MANUTENCAO: CROSS_MANUTENCAO,
  },
  {
    modelName: 'XY 50-Q JET S',
    yearFrom: null,
    yearTo: null,
    MACETES: JETS_MACETES,
    PROBLEMAS: JETS_PROBLEMAS,
    MANUTENCAO: JETS_MANUTENCAO,
  },
  {
    modelName: 'XY 50-Q PHOENIX',
    yearFrom: null,
    yearTo: null,
    MACETES: PHOENIX_MACETES,
    PROBLEMAS: PHOENIX_PROBLEMAS,
    MANUTENCAO: PHOENIX_MANUTENCAO,
  },
  {
    modelName: 'XY 50-Q PHOENIX S',
    yearFrom: null,
    yearTo: null,
    MACETES: PHOENIXS_MACETES,
    PROBLEMAS: PHOENIXS_PROBLEMAS,
    MANUTENCAO: PHOENIXS_MANUTENCAO,
  },
  {
    modelName: 'XY 50-Q PHOENIX S EFI',
    yearFrom: null,
    yearTo: null,
    MACETES: PHOENIXSEFI_MACETES,
    PROBLEMAS: PHOENIXSEFI_PROBLEMAS,
    MANUTENCAO: PHOENIXSEFI_MANUTENCAO,
  },
  {
    modelName: 'XY 50-Q2 RETRO/JET/BIKE',
    yearFrom: null,
    yearTo: null,
    MACETES: Q2_MACETES,
    PROBLEMAS: Q2_PROBLEMAS,
    MANUTENCAO: Q2_MANUTENCAO,
  },
  {
    modelName: 'XY 50Q VMV',
    yearFrom: null,
    yearTo: null,
    MACETES: VMV_MACETES,
    PROBLEMAS: VMV_PROBLEMAS,
    MANUTENCAO: VMV_MANUTENCAO,
  },
  {
    modelName: 'XY 50Q-2 VENICE',
    yearFrom: null,
    yearTo: null,
    MACETES: VENICE_MACETES,
    PROBLEMAS: VENICE_PROBLEMAS,
    MANUTENCAO: VENICE_MANUTENCAO,
  },
  {
    modelName: '50-Q RAY',
    yearFrom: null,
    yearTo: null,
    MACETES: RAY_MACETES,
    PROBLEMAS: RAY_PROBLEMAS,
    MANUTENCAO: RAY_MANUTENCAO,
  },
  {
    modelName: 'RETRO EX 50',
    yearFrom: null,
    yearTo: null,
    MACETES: RETROEX_MACETES,
    PROBLEMAS: RETROEX_PROBLEMAS,
    MANUTENCAO: RETROEX_MANUTENCAO,
  },
  {
    modelName: 'SUPER SMART 50',
    yearFrom: null,
    yearTo: null,
    MACETES: SUPERSMART_MACETES,
    PROBLEMAS: SUPERSMART_PROBLEMAS,
    MANUTENCAO: SUPERSMART_MANUTENCAO,
  },
]

// ─── Calibragens de pneus ────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'XY 50-Q',
    yearFrom: null, yearTo: null,
    tireSize: '2.50-17 (F) · 2.75-17 (R) — estimado',
    frontPsi: 18, rearPsi: 22,
    frontPsiLoad: 20, rearPsiLoad: 26,
    notes: 'Solo: F 18 / R 22 PSI. Com garupa: F 20 / R 26 PSI. Medidas estimadas típicas de ciclomotor step-through 49-50cc — confirme na etiqueta colada no quadro da sua unidade.',
  },
  {
    modelName: 'XY 50-Q CROSS',
    yearFrom: null, yearTo: null,
    tireSize: '2.50-14 (F) · 2.75-14 (R) cravado — estimado',
    frontPsi: 18, rearPsi: 22,
    frontPsiLoad: 20, rearPsiLoad: 25,
    notes: 'Solo: F 18 / R 22 PSI. Com garupa: F 20 / R 25 PSI. Rodas menores e pneu cravado (estimado) para uso misto asfalto/terra leve. Pressão um pouco menor em terra melhora tração, mas volte ao valor de estrada antes de rodar em asfalto.',
  },
  {
    modelName: 'XY 50-Q JET S',
    yearFrom: null, yearTo: null,
    tireSize: '2.50-17 (F) · 2.75-17 (R) — estimado',
    frontPsi: 18, rearPsi: 22,
    frontPsiLoad: 20, rearPsiLoad: 26,
    notes: 'Solo: F 18 / R 22 PSI. Com garupa: F 20 / R 26 PSI. Mesma roda e pneu do bloco XY 50-Q base — a JET S muda apenas a carenagem.',
  },
  {
    modelName: 'XY 50-Q PHOENIX',
    yearFrom: null, yearTo: null,
    tireSize: '2.50-17 (F) · 2.75-17 (R) roda raiada — estimado',
    frontPsi: 18, rearPsi: 22,
    frontPsiLoad: 20, rearPsiLoad: 26,
    notes: 'Solo: F 18 / R 22 PSI. Com garupa: F 20 / R 26 PSI. Roda raiada de estilo retrô — mesma medida de pneu do restante da família, verifique tensão dos raios junto com a calibragem.',
  },
  {
    modelName: 'XY 50-Q PHOENIX S',
    yearFrom: null, yearTo: null,
    tireSize: '2.50-17 (F) · 2.75-17 (R) roda raiada — estimado',
    frontPsi: 18, rearPsi: 22,
    frontPsiLoad: 20, rearPsiLoad: 26,
    notes: 'Solo: F 18 / R 22 PSI. Com garupa: F 20 / R 26 PSI. Mesma medida de pneu da PHOENIX — diferencial deste trim é o freio a disco dianteiro, não o pneu.',
  },
  {
    modelName: 'XY 50-Q PHOENIX S EFI',
    yearFrom: null, yearTo: null,
    tireSize: '2.50-17 (F) · 2.75-17 (R) roda raiada — estimado',
    frontPsi: 18, rearPsi: 22,
    frontPsiLoad: 20, rearPsiLoad: 26,
    notes: 'Solo: F 18 / R 22 PSI. Com garupa: F 20 / R 26 PSI. Mesma medida de pneu da PHOENIX S — diferencial deste trim é a injeção eletrônica, não o pneu/freio.',
  },
  {
    modelName: 'XY 50-Q2 RETRO/JET/BIKE',
    yearFrom: null, yearTo: null,
    tireSize: '2.50-17 (F) · 2.75-17 (R) — estimado, confirme na versão específica',
    frontPsi: 18, rearPsi: 22,
    frontPsiLoad: 20, rearPsiLoad: 26,
    notes: 'Solo: F 18 / R 22 PSI. Com garupa: F 20 / R 26 PSI. As três carrocerias (RETRO/JET/BIKE) podem variar levemente entre si — confirme na etiqueta do quadro da sua unidade antes de comprar pneu.',
  },
  {
    modelName: 'XY 50Q VMV',
    yearFrom: null, yearTo: null,
    tireSize: '3.50-10 (F) · 3.50-10 (R) roda de scooter — estimado',
    frontPsi: 22, rearPsi: 25,
    frontPsiLoad: 24, rearPsiLoad: 29,
    notes: 'Solo: F 22 / R 25 PSI. Com garupa: F 24 / R 29 PSI. Rodas pequenas de scooter exigem pressão um pouco mais alta e verificação mais frequente — perda de pressão é mais perceptível na dirigibilidade que em roda grande.',
  },
  {
    modelName: 'XY 50Q-2 VENICE',
    yearFrom: null, yearTo: null,
    tireSize: '3.50-10 (F) · 3.50-10 (R) roda de scooter — estimado',
    frontPsi: 22, rearPsi: 25,
    frontPsiLoad: 24, rearPsiLoad: 30,
    notes: 'Solo: F 22 / R 25 PSI. Com garupa: F 24 / R 30 PSI (bagageiro carregado soma peso à traseira). Mesma roda estimada da VMV — verifique semanalmente.',
  },
  {
    modelName: '50-Q RAY',
    yearFrom: null, yearTo: null,
    tireSize: '2.50-17 (F) · 2.75-17 (R) — estimado',
    frontPsi: 18, rearPsi: 22,
    frontPsiLoad: 20, rearPsiLoad: 26,
    notes: 'Solo: F 18 / R 22 PSI. Com garupa: F 20 / R 26 PSI. Medidas típicas estimadas de ciclomotor de entrada 49-50cc — confirme na etiqueta do quadro.',
  },
  {
    modelName: 'RETRO EX 50',
    yearFrom: null, yearTo: null,
    tireSize: '2.50-17 (F) · 2.75-17 (R) — estimado',
    frontPsi: 18, rearPsi: 22,
    frontPsiLoad: 20, rearPsiLoad: 26,
    notes: 'Solo: F 18 / R 22 PSI. Com garupa: F 20 / R 26 PSI. Carroceria step-through — pneus de medida típica da classe, confirme na etiqueta do quadro.',
  },
  {
    modelName: 'SUPER SMART 50',
    yearFrom: null, yearTo: null,
    tireSize: '2.50-17 (F) · 2.75-17 (R) — estimado',
    frontPsi: 18, rearPsi: 22,
    frontPsiLoad: 20, rearPsiLoad: 26,
    notes: 'Solo: F 18 / R 22 PSI. Com garupa: F 20 / R 26 PSI. Medidas típicas estimadas da classe 49-50cc — confirme na etiqueta do quadro da sua unidade.',
  },
]

// ─── Itens de manutenção ──────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // XY 50-Q (base)
  { modelName: 'XY 50-Q', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA (~0,8L, estimado)', intervalKm: 1500, intervalMonths: 6, notes: 'Embreagem automática banhada a óleo — nunca usar JASO MB de CVT.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 50-Q', yearFrom: null, yearTo: null, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 5000, intervalMonths: null, notes: 'Testar a vela antes de suspeitar do CDI em caso de partida difícil.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XY 50-Q', yearFrom: null, yearTo: null, component: 'Limpeza do carburador PZ16', intervalKm: 3000, intervalMonths: 4, notes: 'Etanol degradado empasta os jatos finos. Drenar cuba se ficar parado +30 dias.', priority: 'HIGH', order: 3 },
  { modelName: 'XY 50-Q', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente 415', intervalKm: 450, intervalMonths: null, notes: 'Corrente fina desgasta rápido sem lubrificação frequente.', priority: 'HIGH', order: 4 },
  { modelName: 'XY 50-Q', yearFrom: null, yearTo: null, component: 'Kit relação 415 (pinhão + coroa + corrente)', intervalKm: 10000, intervalMonths: null, notes: 'Trocar sempre o kit completo, nunca só a corrente.', priority: 'MEDIUM', order: 5 },
  { modelName: 'XY 50-Q', yearFrom: null, yearTo: null, component: 'Filtro de ar — limpeza', intervalKm: 5000, intervalMonths: 6, notes: 'Espuma: lavar, secar, umedecer levemente com óleo antes de reinstalar.', priority: 'MEDIUM', order: 6 },
  { modelName: 'XY 50-Q', yearFrom: null, yearTo: null, component: 'Revisão elétrica (CDI, regulador, conectores)', intervalKm: 10000, intervalMonths: 12, notes: 'Aplicar graxa dielétrica nos conectores. Testar tensão 13,5-14,5V em marcha lenta alta.', priority: 'HIGH', order: 7 },
  { modelName: 'XY 50-Q', yearFrom: null, yearTo: null, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm, estimado)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'MEDIUM', order: 8 },

  // XY 50-Q CROSS
  { modelName: 'XY 50-Q CROSS', yearFrom: null, yearTo: null, component: 'Verificação de folga da corrente 415', intervalKm: 1000, intervalMonths: null, notes: 'Mais crítico neste trim pelo curso extra de suspensão.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 50-Q CROSS', yearFrom: null, yearTo: null, component: 'Inspeção visual do garfo dianteiro (vazamento)', intervalKm: 5000, intervalMonths: null, notes: 'Fazer antes de qualquer uso mais intenso em terra.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XY 50-Q CROSS', yearFrom: null, yearTo: null, component: 'Óleo do garfo dianteiro (SAE 10W, ~60-80mL/tubo, estimado)', intervalKm: 10000, intervalMonths: null, notes: 'Evita perda de amortecimento em uso off-road.', priority: 'MEDIUM', order: 3 },
  { modelName: 'XY 50-Q CROSS', yearFrom: null, yearTo: null, component: 'Limpeza do tambor de freio traseiro após terra molhada', intervalKm: null, intervalMonths: null, notes: 'Barro seco no tambor acelera desgaste da lona.', priority: 'MEDIUM', order: 4 },
  { modelName: 'XY 50-Q CROSS', yearFrom: null, yearTo: null, component: 'Protetor de cárter — inspeção de fixação', intervalKm: 5000, intervalMonths: null, notes: 'Item de acessório recomendado para uso off-road leve.', priority: 'LOW', order: 5 },
  { modelName: 'XY 50-Q CROSS', yearFrom: null, yearTo: null, component: 'Itens do motor/óleo/vela/carburador — ver bloco XY 50-Q', intervalKm: null, intervalMonths: null, notes: 'Cronograma-base compartilhado com toda a família XY 50-Q.', priority: 'MEDIUM', order: 6 },

  // XY 50-Q JET S
  { modelName: 'XY 50-Q JET S', yearFrom: null, yearTo: null, component: 'Inspeção de clipes/parafusos da carenagem esportiva', intervalKm: null, intervalMonths: 1, notes: 'A cada lavagem — repor clipes faltantes antes que a peça trinque.', priority: 'LOW', order: 1 },
  { modelName: 'XY 50-Q JET S', yearFrom: null, yearTo: null, component: 'Aperto da braçadeira do escapamento esportivo', intervalKm: 3000, intervalMonths: null, notes: 'Vibração do monocilíndrico solta a braçadeira com facilidade.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XY 50-Q JET S', yearFrom: null, yearTo: null, component: 'Itens do motor/óleo/vela/carburador — ver bloco XY 50-Q', intervalKm: null, intervalMonths: null, notes: 'Motor e mecânica idênticos ao bloco-base.', priority: 'MEDIUM', order: 3 },

  // XY 50-Q PHOENIX
  { modelName: 'XY 50-Q PHOENIX', yearFrom: null, yearTo: null, component: 'Teste de tensão dos raios das rodas', intervalKm: 3500, intervalMonths: null, notes: 'Bater levemente com chave — som surdo indica raio frouxo.', priority: 'MEDIUM', order: 1 },
  { modelName: 'XY 50-Q PHOENIX', yearFrom: null, yearTo: null, component: 'Limpeza e cera nas peças cromadas', intervalKm: null, intervalMonths: 1, notes: 'Protege contra oxidação, especialmente em regiões litorâneas.', priority: 'LOW', order: 2 },
  { modelName: 'XY 50-Q PHOENIX', yearFrom: null, yearTo: null, component: 'Itens do motor/óleo/vela/carburador — ver bloco XY 50-Q', intervalKm: null, intervalMonths: null, notes: 'Mesmo motor e mecânica do bloco-base, só muda a carroceria.', priority: 'MEDIUM', order: 3 },

  // XY 50-Q PHOENIX S
  { modelName: 'XY 50-Q PHOENIX S', yearFrom: null, yearTo: null, component: 'Nível do fluido de freio (reservatório do disco)', intervalKm: null, intervalMonths: 1, notes: 'Checar a cada abastecimento — reservatório pequeno.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 50-Q PHOENIX S', yearFrom: null, yearTo: null, component: 'Espessura da pastilha de freio dianteira', intervalKm: 3000, intervalMonths: null, notes: 'Mínimo ~1,5mm de material (estimado).', priority: 'HIGH', order: 2 },
  { modelName: 'XY 50-Q PHOENIX S', yearFrom: null, yearTo: null, component: 'Limpeza/lubrificação do pino de deslizamento da pinça', intervalKm: null, intervalMonths: 6, notes: 'Evita pinça travada por ferrugem em clima úmido.', priority: 'MEDIUM', order: 3 },
  { modelName: 'XY 50-Q PHOENIX S', yearFrom: null, yearTo: null, component: 'Troca do fluido de freio DOT 4', intervalKm: null, intervalMonths: 15, notes: 'Fluido é higroscópico — trocar mesmo sem sintoma visível.', priority: 'CRITICAL', order: 4 },
  { modelName: 'XY 50-Q PHOENIX S', yearFrom: null, yearTo: null, component: 'Itens herdados da PHOENIX e XY 50-Q (raios, cromados, motor)', intervalKm: null, intervalMonths: null, notes: 'Ver blocos PHOENIX e XY 50-Q.', priority: 'MEDIUM', order: 5 },

  // XY 50-Q PHOENIX S EFI
  { modelName: 'XY 50-Q PHOENIX S EFI', yearFrom: null, yearTo: null, component: 'Qualidade do combustível abastecido', intervalKm: null, intervalMonths: null, notes: 'EFI é mais sensível a sujeira/água no combustível que carburador.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 50-Q PHOENIX S EFI', yearFrom: null, yearTo: null, component: 'Troca preventiva da bateria', intervalKm: null, intervalMonths: 24, notes: 'Injeção depende da bateria para bomba de combustível e módulo.', priority: 'HIGH', order: 2 },
  { modelName: 'XY 50-Q PHOENIX S EFI', yearFrom: null, yearTo: null, component: 'Diagnóstico de falha de injeção em oficina especializada', intervalKm: null, intervalMonths: null, notes: 'Rede autorizada Shineray limitada — procurar oficina especializada em EFI de motos chinesas de entrada.', priority: 'HIGH', order: 3 },
  { modelName: 'XY 50-Q PHOENIX S EFI', yearFrom: null, yearTo: null, component: 'Itens herdados da PHOENIX S e XY 50-Q (freio a disco, motor, carroceria)', intervalKm: null, intervalMonths: null, notes: 'Ver blocos PHOENIX S, PHOENIX e XY 50-Q.', priority: 'MEDIUM', order: 4 },

  // XY 50-Q2 RETRO/JET/BIKE
  { modelName: 'XY 50-Q2 RETRO/JET/BIKE', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA (~0,8L, estimado) + filtro tipo tela', intervalKm: 1500, intervalMonths: 6, notes: 'Filtro reutilizável — limpar com solvente e ar comprimido.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 50-Q2 RETRO/JET/BIKE', yearFrom: null, yearTo: null, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 5000, intervalMonths: null, notes: 'Mesma especificação da linha Q original.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XY 50-Q2 RETRO/JET/BIKE', yearFrom: null, yearTo: null, component: 'Limpeza do carburador PZ16', intervalKm: 3000, intervalMonths: 4, notes: 'Sensibilidade a etanol igual à geração anterior.', priority: 'HIGH', order: 3 },
  { modelName: 'XY 50-Q2 RETRO/JET/BIKE', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente 415', intervalKm: 450, intervalMonths: null, notes: 'Mesma medida de corrente da linha Q original.', priority: 'HIGH', order: 4 },
  { modelName: 'XY 50-Q2 RETRO/JET/BIKE', yearFrom: null, yearTo: null, component: 'Revisão elétrica (CDI, regulador, conectores)', intervalKm: 10000, intervalMonths: 12, notes: 'Chicote revisado em relação à geração Q, mas ainda ponto de atenção.', priority: 'HIGH', order: 5 },
  { modelName: 'XY 50-Q2 RETRO/JET/BIKE', yearFrom: null, yearTo: null, component: 'Confirmar medida de pneu e tipo de freio da versão específica', intervalKm: null, intervalMonths: null, notes: 'RETRO/JET/BIKE podem variar entre si — checar etiqueta do quadro.', priority: 'LOW', order: 6 },
  { modelName: 'XY 50-Q2 RETRO/JET/BIKE', yearFrom: null, yearTo: null, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm, estimado)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'MEDIUM', order: 7 },

  // XY 50Q VMV
  { modelName: 'XY 50Q VMV', yearFrom: null, yearTo: null, component: 'Óleo do motor 20W-50 JASO MA (~0,8L, estimado)', intervalKm: 1500, intervalMonths: 6, notes: 'Mesma especificação da família 49cc.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 50Q VMV', yearFrom: null, yearTo: null, component: 'Reengraxar variador da transmissão CVT', intervalKm: 10000, intervalMonths: null, notes: 'Variador seco causa aceleração irregular.', priority: 'HIGH', order: 2 },
  { modelName: 'XY 50Q VMV', yearFrom: null, yearTo: null, component: 'Inspeção visual da correia CVT (trincas)', intervalKm: 10000, intervalMonths: null, notes: 'Fazer junto com a engraxada do variador.', priority: 'HIGH', order: 3 },
  { modelName: 'XY 50Q VMV', yearFrom: null, yearTo: null, component: 'Troca preventiva da correia CVT', intervalKm: 13000, intervalMonths: null, notes: 'Estimado 12.000-15.000 km. Evita ficar parado por rompimento.', priority: 'MEDIUM', order: 4 },
  { modelName: 'XY 50Q VMV', yearFrom: null, yearTo: null, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 5000, intervalMonths: null, notes: 'Mesma especificação da família.', priority: 'MEDIUM', order: 5 },
  { modelName: 'XY 50Q VMV', yearFrom: null, yearTo: null, component: 'Limpeza do carburador', intervalKm: 3000, intervalMonths: 4, notes: 'Carburador ajustado para CVT, mesma sensibilidade a etanol.', priority: 'HIGH', order: 6 },
  { modelName: 'XY 50Q VMV', yearFrom: null, yearTo: null, component: 'Revisão elétrica (CDI, regulador)', intervalKm: 10000, intervalMonths: 12, notes: 'Mesma fragilidade elétrica da família.', priority: 'HIGH', order: 7 },
  { modelName: 'XY 50Q VMV', yearFrom: null, yearTo: null, component: 'Calibragem de pneus — verificação semanal', intervalKm: null, intervalMonths: null, notes: 'Rodas pequenas de scooter perdem pressão de forma mais perceptível.', priority: 'MEDIUM', order: 8 },

  // XY 50Q-2 VENICE
  { modelName: 'XY 50Q-2 VENICE', yearFrom: null, yearTo: null, component: 'Óleo do motor 20W-50 JASO MA (~0,8L, estimado)', intervalKm: 1500, intervalMonths: 6, notes: 'Mesma especificação da VMV.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 50Q-2 VENICE', yearFrom: null, yearTo: null, component: 'Reengraxar variador da transmissão CVT', intervalKm: 10000, intervalMonths: null, notes: 'Mesma lógica de manutenção da VMV.', priority: 'HIGH', order: 2 },
  { modelName: 'XY 50Q-2 VENICE', yearFrom: null, yearTo: null, component: 'Troca preventiva da correia CVT', intervalKm: 13000, intervalMonths: null, notes: 'Estimado 12.000-15.000 km.', priority: 'MEDIUM', order: 3 },
  { modelName: 'XY 50Q-2 VENICE', yearFrom: null, yearTo: null, component: 'Teste de tensão do regulador (painel mais completo)', intervalKm: 10000, intervalMonths: 12, notes: 'Painel maior exige regulador saudável — sintoma aparece primeiro no display.', priority: 'HIGH', order: 4 },
  { modelName: 'XY 50Q-2 VENICE', yearFrom: null, yearTo: null, component: 'Verificação da fixação do bagageiro traseiro', intervalKm: 5000, intervalMonths: null, notes: 'Respeitar limite de carga estimado 3-5kg.', priority: 'LOW', order: 5 },
  { modelName: 'XY 50Q-2 VENICE', yearFrom: null, yearTo: null, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 5000, intervalMonths: null, notes: 'Mesma especificação da família.', priority: 'MEDIUM', order: 6 },
  { modelName: 'XY 50Q-2 VENICE', yearFrom: null, yearTo: null, component: 'Limpeza do carburador (ou checagem do sistema de injeção, se EFI)', intervalKm: 3000, intervalMonths: 4, notes: 'Confirmar se a unidade é carburada ou EFI.', priority: 'HIGH', order: 7 },

  // 50-Q RAY
  { modelName: '50-Q RAY', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA (~0,8L, estimado)', intervalKm: 1500, intervalMonths: 6, notes: 'Embreagem automática banhada a óleo.', priority: 'HIGH', order: 1 },
  { modelName: '50-Q RAY', yearFrom: null, yearTo: null, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 5000, intervalMonths: null, notes: 'Item mais barato a checar em caso de partida difícil.', priority: 'MEDIUM', order: 2 },
  { modelName: '50-Q RAY', yearFrom: null, yearTo: null, component: 'Limpeza do carburador PZ16', intervalKm: 3000, intervalMonths: 4, notes: 'Drenar cuba se ficar parado +30 dias.', priority: 'HIGH', order: 3 },
  { modelName: '50-Q RAY', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente 415', intervalKm: 450, intervalMonths: null, notes: 'Corrente fina desgasta rápido sem lubrificação.', priority: 'HIGH', order: 4 },
  { modelName: '50-Q RAY', yearFrom: null, yearTo: null, component: 'Kit relação 415 (pinhão + coroa + corrente)', intervalKm: 10000, intervalMonths: null, notes: 'Trocar sempre o kit completo.', priority: 'MEDIUM', order: 5 },
  { modelName: '50-Q RAY', yearFrom: null, yearTo: null, component: 'Filtro de ar — limpeza', intervalKm: 5000, intervalMonths: 6, notes: 'Espuma: lavar, secar, umedecer levemente com óleo.', priority: 'MEDIUM', order: 6 },
  { modelName: '50-Q RAY', yearFrom: null, yearTo: null, component: 'Revisão elétrica (CDI, regulador, conectores)', intervalKm: 10000, intervalMonths: 12, notes: 'Testar tensão 13,5-14,5V em marcha lenta alta.', priority: 'HIGH', order: 7 },

  // RETRO EX 50
  { modelName: 'RETRO EX 50', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA (~0,8L, estimado)', intervalKm: 1500, intervalMonths: 6, notes: 'Embreagem automática banhada a óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'RETRO EX 50', yearFrom: null, yearTo: null, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 5000, intervalMonths: null, notes: 'Mesma especificação da classe.', priority: 'MEDIUM', order: 2 },
  { modelName: 'RETRO EX 50', yearFrom: null, yearTo: null, component: 'Limpeza do carburador PZ16', intervalKm: 3000, intervalMonths: 4, notes: 'Sensível a verniz de etanol degradado.', priority: 'HIGH', order: 3 },
  { modelName: 'RETRO EX 50', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente 415', intervalKm: 450, intervalMonths: null, notes: 'Evita desgaste do pinhão do motor.', priority: 'HIGH', order: 4 },
  { modelName: 'RETRO EX 50', yearFrom: null, yearTo: null, component: 'Inspeção do retentor de câmbio (mancha de óleo)', intervalKm: 8000, intervalMonths: null, notes: 'Vazamento comum com o uso — retentor genérico resolve.', priority: 'MEDIUM', order: 5 },
  { modelName: 'RETRO EX 50', yearFrom: null, yearTo: null, component: 'Revisão elétrica (CDI, regulador, conectores)', intervalKm: 10000, intervalMonths: 12, notes: 'Mesma fragilidade elétrica da classe.', priority: 'HIGH', order: 6 },
  { modelName: 'RETRO EX 50', yearFrom: null, yearTo: null, component: 'Limpeza de para-lama/carenagem retrô — sem alta pressão nas frestas', intervalKm: null, intervalMonths: null, notes: 'Encaixes plásticos delicados.', priority: 'LOW', order: 7 },

  // SUPER SMART 50
  { modelName: 'SUPER SMART 50', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA (~0,8L, estimado)', intervalKm: 1500, intervalMonths: 6, notes: 'Embreagem automática banhada a óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'SUPER SMART 50', yearFrom: null, yearTo: null, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 5000, intervalMonths: null, notes: 'Mesma especificação da classe.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SUPER SMART 50', yearFrom: null, yearTo: null, component: 'Limpeza do carburador PZ16', intervalKm: 3000, intervalMonths: 4, notes: 'Sensível a verniz de etanol degradado.', priority: 'HIGH', order: 3 },
  { modelName: 'SUPER SMART 50', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente 415', intervalKm: 450, intervalMonths: null, notes: 'Evita desgaste do pinhão do motor.', priority: 'HIGH', order: 4 },
  { modelName: 'SUPER SMART 50', yearFrom: null, yearTo: null, component: 'Verificação de estabilidade do painel digital em marcha lenta', intervalKm: 10000, intervalMonths: 12, notes: 'Painel "tremendo" indica bateria/regulador fracos.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SUPER SMART 50', yearFrom: null, yearTo: null, component: 'Revisão elétrica (CDI, regulador, conectores)', intervalKm: 10000, intervalMonths: 12, notes: 'Regulador ruim afeta ignição e painel digital.', priority: 'HIGH', order: 6 },
  { modelName: 'SUPER SMART 50', yearFrom: null, yearTo: null, component: 'Kit relação 415 (pinhão + coroa + corrente)', intervalKm: 10000, intervalMonths: null, notes: 'Trocar sempre o kit completo.', priority: 'MEDIUM', order: 7 },
]

// ─── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Shineray 50cc iniciando...\n')

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
      ...block.MACETES.map(t => ({ cat: 'MACETES' as Cat, tip: t })),
      ...block.PROBLEMAS.map(t => ({ cat: 'PROBLEMAS' as Cat, tip: t })),
      ...block.MANUTENCAO.map(t => ({ cat: 'MANUTENCAO' as Cat, tip: t })),
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

    const counts = {
      m: block.MACETES.length,
      p: block.PROBLEMAS.length,
      mt: block.MANUTENCAO.length,
    }
    console.log(
      `  🔧 ${block.modelName}: ${counts.m} macetes, ${counts.p} problemas, ${counts.mt} manutenção`,
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
  const modelNames = [...new Set(MAINTENANCE_ITEMS.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: MAINTENANCE_ITEMS.map(item => ({
      modelName: item.modelName,
      yearFrom: item.yearFrom,
      yearTo: item.yearTo,
      component: item.component,
      intervalKm: item.intervalKm,
      intervalMonths: item.intervalMonths,
      notes: item.notes,
      priority: item.priority,
      order: item.order,
    })),
  })
  for (const name of modelNames) {
    const count = MAINTENANCE_ITEMS.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = BLOCKS.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed Shineray 50cc concluído: ${BLOCKS.length} modelos, ${totalTips} dicas, ${TIRE_PRESSURES.length} calibragens, ${MAINTENANCE_ITEMS.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
