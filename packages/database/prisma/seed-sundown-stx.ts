// seed-sundown-stx.ts — Sundown STX 125cc, STX 200cc, STX MOTARD 125cc, STX MOTARD 200cc
// Sundown: fabricante brasileira (Manaus/AM), linhagem de motores derivados do grupo
// Zongshen/Jincheng (chinês). STX = trail on/off-road (aro 21/18, pneu cross).
// STX MOTARD = variante street/supermotard: mesma base de motor, suspensão mais curta,
// rodas menores (aro 17) com pneus de rua em vez de pneus cross.
// Execute: pnpm --filter @motormacete/database db:seed:sundown-stx
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

// ─── STX 125cc ─────────────────────────────────────────────────────────────
// Motor: 124cc monocilíndrico OHC a ar, carburado (base chinesa Zongshen/Jincheng,
// bloco compartilhado com várias trail nacionais de entrada) | ~9,5 cv @ 7.500 rpm
// (estimado) | torque ~0,95 kgf.m @ 6.000 rpm (estimado)
// Carburador PZ19/PZ20 | Óleo 20W-50 JASO MA ~0,9L | Vela A7TC/C7HSA gap 0,6–0,7mm
// Pneu: 2.75-21 (F) / 4.10-18 (R) — pneu cross/trail | Corrente 428H | Tanque ~10L

const STX125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — ~0,9L; troque a cada 2.000–2.500 km',
    body: 'O motor 124cc monocilíndrico da STX 125 tem embreagem úmida banhada no mesmo óleo do motor — use sempre óleo com selo JASO MA (nunca JASO MB de escúter, ele deixa a embreagem escorregar). Capacidade aproximada: 0,9L na troca simples. Recomenda-se 20W-50 mineral (Lubrax Moto 4T, Shell Advance 4T) pela folga de tolerâncias maior desse motor de origem chinesa. Intervalo: 2.000–2.500 km, mais curto que uma trail japonesa por causa do uso off-road que suja o óleo mais rápido.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ19/PZ20: entope com etanol parado — drene antes de guardar',
    body: 'O carburador da STX 125 é pequeno (PZ19 ou PZ20 conforme o lote) e sensível ao verniz que o etanol degradado forma na cuba. Sintoma clássico: moto que "engasga" ou morre em marcha lenta depois de ficar parada por semanas. Antes de guardar por mais de 20 dias, feche o registro de combustível e deixe o carburador rodar até morrer sozinho (esvazia a cuba). Limpeza preventiva a cada 6 meses com spray de carburador (Bardahl, WD-40 Injetor) resolve a maioria dos casos sem precisar desmontar.',
  },
  {
    severity: 'OK',
    title: 'Vela A7TC (ou C7HSA/NGK equivalente) gap 0,6–0,7mm — troque a cada 6.000 km',
    body: 'A STX 125 usa vela do padrão A7TC/C7HSA (rosca curta, calibre 10mm), equivalente ao NGK C7HSA. Gap correto: 0,6–0,7mm com calibrador de palheta. Custo baixo, R$ 10–20. Sinais de vela gasta: partida a frio difícil e leve engasgo em aceleração brusca. Como o motor é usado em trilha com poeira, prefira inspeção visual a cada 3.000 km — eletrodo empastado de terra/óleo é comum em uso off-road intenso.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428H off-road: lubrifique a cada 300–400 km (mais frequente que na rua)',
    body: 'Em uso de trilha, areia e poeira aderem ao lubrificante e aceleram o desgaste da corrente 428H. Lubrifique a cada 300–400 km (mais frequente que os 500 km recomendados para uso urbano) e sempre depois de atravessar água ou lama — lave levemente e relubrifique. Folga correta: 20–30mm no trecho inferior. Kit relação completo (pinhão 14T + coroa 40T aprox. + corrente) gira em torno de R$ 90–160 em lojas de peças para trail nacional.',
  },
  {
    severity: 'OK',
    title: 'Suspensão trail: bengala de curso longo pede óleo mais firme se usar muito em trilha',
    body: 'A STX 125 tem bengala dianteira de curso relativamente longo para absorver buracos e trilha leve. Se notar "fundo de curso" frequente (a bengala bate no batente) em uso off-road, considere óleo de bengala mais viscoso (ex.: SAE 15W no lugar do 10W de fábrica) — ajuda a segurar melhor sem exigir troca de mola. Verifique o nível de óleo da bengala a cada 10.000 km; ele perde volume lentamente por vedação e reduz o amortecimento com o tempo.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar: em trilha, inspecione a cada 1.000 km — poeira reduz a vida do motor',
    body: 'O filtro de ar de espuma da STX 125 satura rápido em uso off-road com poeira. Inspecione a cada 1.000 km em uso de trilha (contra 5.000 km em uso só de asfalto). Lave com querosene ou desengraxante neutro, seque completamente e umedeça com uma fina camada de óleo de filtro (ou óleo de motor diluído) antes de reinstalar — filtro seco demais não retém poeira fina. Filtro ressecado ou rasgado é causa comum de desgaste prematuro do cilindro em motos de trilha de entrada.',
  },
  {
    severity: 'OK',
    title: 'Peças compatíveis: motor de bloco chinês genérico facilita reposição',
    body: 'O motor 124cc da STX 125 compartilha muitas medidas com outros monocilíndricos chineses de 125cc usados por marcas nacionais de entrada (Sundown, Shineray, alguns modelos Traxx). Pistão, anéis, junta do cabeçote e retentores costumam ter equivalentes genéricos vendidos como "motor 125cc CG-like" ou por medida (ex.: pistão 56,5mm). Antes de comprar peça original (cara e difícil de achar), pergunte na loja de peças por "compatível motor chinês 125cc" com a medida do componente.',
  },
]

const STX125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e regulador/retificador: itens elétricos frágeis do lote nacional',
    body: 'Relatos de proprietários em fóruns de trail nacionais (Sundown Clube, grupos de Facebook) apontam o CDI e o regulador/retificador como pontos de falha elétrica recorrentes na STX 125, especialmente em unidades com vários anos de sol e chuva. Sintoma do CDI: moto sem faísca, não pega do nada. Sintoma do retificador: bateria não carrega (luz de bateria acesa, farol fraco em marcha lenta). Ambos têm equivalentes genéricos por pinagem (CDI 5 ou 6 pinos, retificador 3 fios monofásico) vendidos em casas de peças para motos chinesas — leve a peça velha para conferir a pinagem antes de comprar.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pelo retentor do câmbio/embreagem após uso intenso em trilha',
    body: 'Como em outras trails de motor chinês de entrada, o retentor do eixo de saída da caixa de câmbio da STX 125 tende a endurecer e vazar após 15.000–20.000 km, principalmente se a moto pega muito sol parada (endurece a borracha). Sintoma: mancha de óleo perto do pinhão de saída, corrente sempre "encharcada". Retentor genérico de mesma medida (peça de baixo custo, R$ 8–15); troca simples com a caixa aberta, mas exige retirar a tampa do motor.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro: perde firmeza cedo em uso de trilha pesada',
    body: 'O amortecedor traseiro (mono ou duplo, conforme o ano/lote) da STX 125 não é regulável em muitas versões de entrada e tende a "amolecer" com uso de trilha pesada e saltos, por volta de 20.000–25.000 km. Sintoma: traseira "balança" em curvas, fundo de curso em buracos. Como não há reparo econômico do amortecedor original em muitas oficinas, a solução comum entre trilheiros é substituir por amortecedor genérico compatível (procurar por medida entre olhais) de marcas como Cofap ou similares regionais.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em parafusos e componentes expostos: lave e lubrifique após trilha',
    body: 'Por rodar em trilha, lama e água parada, parafusos de fixação de carenagem, suporte de motor e o próprio quadro da STX 125 sofrem corrosão mais cedo que em uso urbano puro. Lave a moto (sem jato de alta pressão direto em rolamentos/carburador) após cada saída em trilha e aplique óleo protetivo ou WD-40 em parafusos expostos e articulações do freio traseiro. Parafusos empenados/enferrujados demais para soltar: aqueça levemente com maçarico antes de forçar, para não quebrar a cabeça.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível varia bastante com uso em trilha vs. asfalto',
    body: 'Proprietários relatam consumo médio de 28–33 km/l em uso misto rua/trilha leve, caindo para 20–25 km/l em trilha pesada com rotação alta constante. Se o consumo cair abruptamente sem mudança de uso, suspeite de: filtro de ar sujo (mistura rica), vela gasta, ou jato principal do carburador desregulado por sujeira. Verifique esses três itens antes de suspeitar de problema estrutural do motor.',
  },
]

const STX125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário STX 125: uso misto trilha/rua exige revisões mais frequentes',
    body: '500 km — Troca de óleo inicial (rodagem). | 1.000 km — Segunda troca de óleo + reaperto geral (parafusos do motor, cabeçote, escapamento). | 2.500 km — Troca de óleo (20W-50 ~0,9L). Lubrificar corrente. | 3.000 km — Inspeção da vela (gap 0,6–0,7mm). | 5.000 km — Troca da vela. Limpeza do carburador. Filtro de ar (lavar espuma). | 6.000 km — Folga de válvulas (adm 0,05mm / esc 0,08mm, motor frio). | 10.000 km — Verificar óleo da bengala dianteira. Kit relação se desgastado. | 15.000 km — Inspecionar retentor de câmbio. Rolamentos de roda. | 20.000 km — Avaliar amortecedor traseiro (firmeza/vazamento).',
  },
]

// ─── STX 200cc ─────────────────────────────────────────────────────────────
// Motor: 196cc monocilíndrico OHC a ar, carburado (mesma família de bloco chinês
// ampliada) | ~16 cv @ 7.500 rpm (estimado) | torque ~1,55 kgf.m @ 5.500 rpm (estimado)
// Carburador PZ26/PZ27 | Óleo 20W-50 JASO MA ~1,1L | Vela D8EA gap 0,6–0,7mm
// Pneu: 2.75-21 (F) / 4.10-18 (R) — pneu cross/trail | Corrente 428H | Tanque ~12L

const STX200_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — ~1,1L; a cada 2.500–3.000 km',
    body: 'O motor 196cc monocilíndrico da STX 200 é uma versão de maior cilindrada da mesma família de bloco a ar usada na 125. Capacidade de óleo: aproximadamente 1,1L. Use 20W-50 JASO MA (embreagem úmida). Intervalo: 2.500–3.000 km em uso misto, reduza para 2.000 km se rodar bastante em trilha com poeira e calor. Óleo mineral é suficiente; semissintético (Motul 3000 20W-50) ajuda a segurar melhor a viscosidade em dias muito quentes.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ26/PZ27: jato principal maior que a 125 — regule a mistura com cuidado',
    body: 'A STX 200 usa carburador PZ26/PZ27, maior que o da 125cc, com jato principal dimensionado para mais cilindrada. Sintomas de mistura pobre (jato entupido ou parcialmente obstruído): superaquecimento, "estouros" no escapamento em desaceleração. Sintomas de mistura rica (filtro de ar sujo ou boia alta): fumaça escura no escapamento, fuligem preta na vela. Limpeza do jato principal e da agulha a cada 6 meses evita os dois problemas. Nível da boia: cerca de 21mm da face do corpo (referência de família de carburador Keihin/Mikuni genérico usado nesse porte).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK D8EA gap 0,6–0,7mm — troque a cada 7.000–8.000 km',
    body: 'A STX 200 usa vela padrão D8EA (mesma referência usada em várias trails/street nacionais de motor a ar dessa faixa de cilindrada). Gap: 0,6–0,7mm. Troca recomendada a cada 7.000–8.000 km em uso normal; a cada 5.000 km se o uso for predominantemente em trilha com muita poeira. Vela iridium D8EIX é um upgrade que estende o intervalo para cerca de 15.000–18.000 km e melhora levemente a resposta em baixa rotação.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428H com mais torque: tensione e lubrifique com atenção redobrada',
    body: 'Por ter mais torque que a 125cc, a corrente 428H da STX 200 desgasta um pouco mais rápido se ficar sem lubrificação. Lubrifique a cada 400–500 km, mais frequente após trilha com água/lama. Folga: 20–30mm no trecho inferior — corrente esticada demais (folga maior) castiga o retentor do câmbio e o pinhão. Kit relação completo: pinhão 14–15T + coroa ~38–40T + corrente, dependendo do lote — confira a contagem de dentes originais antes de comprar kit genérico.',
  },
  {
    severity: 'OK',
    title: 'Refrigeração a ar: evite marcha lenta prolongada em dias muito quentes',
    body: 'Como todo motor a ar de cilindrada maior (196cc), a STX 200 depende do vento de deslocamento para resfriar adequadamente. Em trânsito parado por muito tempo em dias quentes (acima de 32°C), o motor pode aquecer visivelmente (cheiro de óleo quente, motor "ríspido" na retomada). Evite ficar muito tempo em marcha lenta parado ao sol; se possível, desligue em paradas longas. Verifique sempre o nível de óleo — óleo baixo agrava o superaquecimento em motor a ar.',
  },
  {
    severity: 'OK',
    title: 'Freio traseiro a tambor: regule o curso do pedal a cada 3.000 km',
    body: 'A maioria das versões da STX 200 usa freio traseiro a tambor. O cabo/haste de acionamento estica com o uso e o curso do pedal aumenta gradualmente, reduzindo a eficácia da frenagem. Regule o curso do pedal (referência: 20–30mm de folga antes de começar a frear) a cada 3.000 km. Lonas de tambor gastas (abaixo de 2mm) devem ser trocadas — sinal de troca: pedal precisa ser pisado quase no fim do curso para frear.',
  },
  {
    severity: 'WARN',
    title: 'Compatibilidade de peças: motor 196cc é comum em trails nacionais de entrada',
    body: 'O bloco de 196cc a ar da STX 200 segue a mesma linhagem de motores chineses usados por diversas trails de entrada vendidas no Brasil. Isso ajuda na reposição: pistão, anéis, junta do cabeçote e correntes de comando (se aplicável) costumam ter equivalentes genéricos vendidos por medida. Ao comprar peça, tenha em mãos o diâmetro do pistão e a medida do retentor — evita comprar peça errada em lojas que não têm catálogo específico Sundown.',
  },
]

const STX200_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador: falha elétrica mais reportada por proprietários',
    body: 'Assim como na STX 125, o retificador/regulador é apontado como o componente elétrico mais frágil da STX 200 em relatos de fóruns e grupos de trilheiros. Sintoma: bateria descarregando mesmo com a moto rodando, farol fraco em marcha lenta, luz de bateria (se houver) acesa. Diagnóstico simples: multímetro na bateria com moto a 4.000 rpm, deve marcar 13,5–14,5V. Retificador genérico compatível (3 fios, monofásico, para motor a ar de até 200cc) custa R$ 40–90 e resolve a maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela junta do cárter/cabeçote após uso prolongado',
    body: 'Motos com mais de 25.000–30.000 km sem reaperto dos parafusos do motor apresentam vazamento leve de óleo pela junta do cárter ou da tampa do cabeçote — a vibração do monocilíndrico afrouxa os parafusos com o tempo. Reaperto geral (torque de fábrica, tipicamente 10–14 Nm nesses parafusos menores, em padrão cruzado) a cada 10.000 km evita boa parte dos vazamentos. Se já vazando, troque a junta (papelão ou borracha, conforme o ponto) — peça barata, mão de obra é o principal custo.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira: vedante da bengala fraco em uso off-road pesado',
    body: 'Assim como a 125, a bengala dianteira ø33–35mm (conforme lote) da STX 200 tem vedante com vida útil reduzida quando exposta a impactos de trilha e pedras. Sintoma: óleo escurecido escorrendo pelo tubo interno da bengala, amortecimento "seco" ou irregular. Vedante genérico de medida equivalente resolve — anote a medida do vedante antigo antes de comprar. Complete com óleo de bengala SAE 10W (~150–180mL por tubo, conforme a versão) ao remontar.',
  },
  {
    severity: 'WARN',
    title: 'Vibração no guidão em alta rotação: normal, mas fique atento a piora súbita',
    body: 'O monocilíndrico de 196cc a ar da STX 200 vibra mais que motores multi-cilindro na mesma faixa de rotação — isso é esperado e não indica defeito por si só. Uso confortável fica entre 4.000–6.500 rpm. Se a vibração piorar de forma perceptível e repentina, verifique: parafusos de fixação do motor no quadro (soltam com a vibração constante), buchas/coxins do guidão, e balanceamento da roda dianteira após qualquer batida forte em trilha.',
  },
]

const STX200_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário STX 200: revisões um pouco mais espaçadas que a 125cc, mas atenção ao motor a ar',
    body: '500 km — Troca de óleo inicial (rodagem). | 1.000 km — Segunda troca de óleo + reaperto geral do motor. | 3.000 km — Troca de óleo (20W-50 ~1,1L). Regular curso do pedal de freio traseiro. Lubrificar corrente. | 5.000 km — Limpeza do carburador PZ26/PZ27. Filtro de ar (lavar). | 7.000 km — Troca da vela D8EA. Folga de válvulas (adm 0,05mm / esc 0,08mm, motor frio). | 10.000 km — Reaperto geral (parafusos do motor/cárter). Verificar óleo da bengala. | 15.000 km — Kit relação se desgastado. Vedante da bengala (inspeção). | 25.000 km — Inspecionar junta do cárter/cabeçote quanto a vazamento. Rolamentos de roda.',
  },
]

// ─── STX MOTARD 125cc ──────────────────────────────────────────────────────
// Motor: idêntico ao da STX 125cc (124cc OHC a ar carburado) — mesma mecânica,
// mudam apenas suspensão (curso mais curto) e rodas/pneus (aro 17, pneu de rua)
// Pneu: 90/90-17 ou 100/80-17 (F) / 110/70-17 ou 120/70-17 (R) — pneu street/supermotard
// Freios geralmente a disco em ambas as rodas na versão Motard

const STXMOTARD125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor idêntico à STX 125 trail — mesma rotina de óleo (20W-50, ~0,9L, 2.000–2.500 km)',
    body: 'A STX MOTARD 125 compartilha o mesmo motor 124cc OHC a ar da STX 125 trail — o que muda é suspensão (curso mais curto, mais firme) e rodas (aro 17 com pneu de rua no lugar do aro 21/18 com pneu cross). A rotina de óleo é idêntica: 20W-50 JASO MA, ~0,9L, troca a cada 2.000–2.500 km. Como o uso da Motard é predominantemente asfalto, o óleo suja menos rápido que na trail — pode esticar levemente para 2.500–3.000 km se o uso for só urbano.',
  },
  {
    severity: 'OK',
    title: 'Pneus de rua (aro 17): pressão calibrada semanalmente, diferente da trail',
    body: 'Diferente da STX 125 trail (pneu cross de carcaça mais flexível), a MOTARD 125 usa pneu de rua tipo street/supermotard em aro 17 — a pressão correta é mais importante aqui para estabilidade em curva. Calibre semanalmente (pneus de rua perdem pressão de forma mais perceptível no comportamento do que pneus cross). Pneus recomendados: Pirelli MT60 ou similar semi-slick supermotard para quem gosta de andar mais "esportivo", ou pneu 100% rua (Levorin Dinamic Pro) para uso majoritariamente urbano.',
  },
  {
    severity: 'WARN',
    title: 'Freios a disco (dianteiro e traseiro): fluido DOT 4 anual pela exigência de frenagem em asfalto',
    body: 'A versão Motard, por rodar em asfalto com mais velocidade e frenagens mais bruscas que a trail, costuma vir com disco nas duas rodas (dependendo do lote). Troque o fluido de freio DOT 4 anualmente (mais frequente que os 15.000 km/24 meses de uma trail, pela exigência maior de frenagem em uso urbano/esportivo). Pastilhas: inspecione a cada 4.000 km — o uso mais agressivo em asfalto desgasta pastilha mais rápido que em trilha.',
  },
  {
    severity: 'OK',
    title: 'Suspensão mais firme: rodagem em buraco de rua exige atenção redobrada',
    body: 'A suspensão da Motard tem curso mais curto e é ajustada para resposta mais firme em asfalto — isso significa menos "sobra" de curso para absorver buracos grandes de rua comparado à trail. Evite buracos profundos em velocidade; a bengala e o amortecedor podem bater no batente mais facilmente que na versão trail. Verifique o nível de óleo da bengala a cada 8.000 km (mais cedo que a trail, pelo trabalho mais intenso da suspensão em uso urbano).',
  },
  {
    severity: 'OK',
    title: 'Corrente 428H em uso urbano: lubrifique a cada 500 km (menos crítico que a trail)',
    body: 'Sem a exposição a lama e poeira da trilha, a corrente da Motard 125 dura mais entre lubrificações — a cada 500 km é suficiente (contra 300–400 km da versão trail em uso off-road). Mesma folga de referência: 20–30mm no trecho inferior. Kit relação idêntico ao da STX 125 trail (mesmo motor, mesma caixa de câmbio).',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com a STX 125 trail: motor, elétrica e câmbio são iguais',
    body: 'Para peças de motor (pistão, anéis, junta, CDI, retificador, bobina), a Motard 125 usa exatamente as mesmas peças da STX 125 trail — só suspensão, rodas, pneus e alguns componentes de carenagem/guidão mudam. Isso amplia bastante as opções de reposição, já que qualquer peça de motor genérica compatível com a linha STX 125 serve nas duas versões.',
  },
]

const STXMOTARD125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e retificador: mesma fragilidade elétrica da STX 125 trail',
    body: 'Por compartilhar motor e sistema elétrico com a STX 125 trail, a Motard 125 tem os mesmos pontos fracos: CDI e retificador/regulador. Sintomas e diagnóstico são idênticos (ver STX 125 trail). A diferença prática é que, em uso urbano, a falha do retificador é notada mais rápido pelo motorista (farol e pisca são mais usados de noite na cidade do que na trilha).',
  },
  {
    severity: 'WARN',
    title: 'Desgaste acelerado de pneu traseiro em uso "esportivo"/derrapagem controlada',
    body: 'Parte do público que compra Motard gosta de andar de forma mais esportiva (frenagens fortes, derrapagem controlada em curva). Isso desgasta o pneu traseiro bem mais rápido que uso urbano tranquilo — trocas a cada 6.000–10.000 km em uso agressivo, contra 12.000–15.000 km em uso normal. Fique de olho no indicador de desgaste (TWI) na banda de rodagem.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pelo retentor de câmbio: mesmo ponto fraco da STX 125 trail',
    body: 'O retentor do eixo de saída da caixa de câmbio, compartilhado com a STX 125 trail, também vaza após 15.000–20.000 km na versão Motard — a causa (borracha que endurece com o tempo/sol) é a mesma, independente do tipo de uso. Sintoma: mancha de óleo perto do pinhão de saída, corrente sempre engordurada.',
  },
  {
    severity: 'WARN',
    title: 'Disco de freio empenado: atenção a frenagens bruscas repetidas em asfalto quente',
    body: 'Em dias muito quentes, com frenagens fortes e repetidas (uso esportivo), o disco de freio dianteiro pode empenar levemente — sintoma: pulsação na manopla do freio ao frear. Verifique o disco com relógio comparador se disponível, ou visualmente rodando a roda devagar e observando se a pinça "pulsa". Disco empenado além do limite de fábrica (geralmente ~0,15–0,20mm de empeno) deve ser trocado — usar disco empenado reduz a eficácia de frenagem.',
  },
]

const STXMOTARD125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário STX MOTARD 125: mesma base da STX 125 trail, ajustado para uso urbano/asfalto',
    body: '500 km — Troca de óleo inicial (rodagem). | 1.000 km — Segunda troca de óleo + reaperto geral. | 2.500 km — Troca de óleo (20W-50 ~0,9L). Lubrificar corrente. | 4.000 km — Inspecionar pastilhas de freio (uso urbano/esportivo desgasta mais rápido). | 5.000 km — Troca da vela A7TC/C7HSA. Limpeza do carburador. Filtro de ar. | 6.000 km — Folga de válvulas (adm 0,05mm / esc 0,08mm, motor frio). | 8.000 km — Verificar óleo da bengala dianteira (trabalho mais intenso que na trail). | 10.000 km — Fluido de freio DOT 4 (frente e trás). Kit relação se desgastado. | 15.000 km — Inspecionar retentor de câmbio.',
  },
]

// ─── STX MOTARD 200cc ──────────────────────────────────────────────────────
// Motor: idêntico ao da STX 200cc (196cc OHC a ar carburado) — mesma mecânica,
// mudam apenas suspensão (curso mais curto) e rodas/pneus (aro 17, pneu de rua)
// Pneu: 100/80-17 ou 110/70-17 (F) / 130/70-17 ou 140/70-17 (R) — pneu street/supermotard
// Freios a disco em ambas as rodas

const STXMOTARD200_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor idêntico à STX 200 trail — óleo 20W-50, ~1,1L, a cada 2.500–3.000 km',
    body: 'A STX MOTARD 200 usa o mesmo motor 196cc OHC a ar da STX 200 trail. A rotina de óleo é a mesma: 20W-50 JASO MA, ~1,1L, troca a cada 2.500–3.000 km. Pelo uso predominantemente urbano/asfalto, o óleo tende a sujar um pouco mais devagar que na versão trail — mas não estique além de 3.000 km, o motor a ar sofre mais com óleo velho em trânsito parado.',
  },
  {
    severity: 'OK',
    title: 'Pneus de rua maiores (aro 17): calibragem semanal é essencial para estabilidade',
    body: 'A Motard 200 tem mais potência que a 125 e pneus de rua um pouco mais largos (tipicamente 100/80-17 ou 110/70-17 na frente, 130/70-17 ou 140/70-17 atrás, conforme o lote). Pressão errada nesses pneus afeta bastante a estabilidade em curva a essa potência — calibre semanalmente. Pneus recomendados: Pirelli MT60 (perfil semi-slick, bom equilíbrio para uso misto esportivo/urbano) ou Levorin Dinamic Pro para uso 100% urbano.',
  },
  {
    severity: 'WARN',
    title: 'Freios a disco duplo: fluido DOT 4 anual, mais crítico pela potência maior',
    body: 'Com mais potência que a versão 125, a Motard 200 exige ainda mais atenção ao sistema de freios. Fluido DOT 4: troca anual. Pastilhas: inspecione a cada 4.000 km, principalmente se o uso incluir frenagens fortes ou derrapagem controlada (prática comum entre donos de supermotard). Purgue o sistema sempre que sentir a manopla "esponjosa".',
  },
  {
    severity: 'OK',
    title: 'Carburador PZ26/PZ27 herdado da trail: mesma atenção à limpeza semestral',
    body: 'O carburador da Motard 200 é o mesmo PZ26/PZ27 da STX 200 trail. Mesma recomendação: limpeza do jato principal e da agulha a cada 6 meses para evitar mistura pobre (superaquecimento, estouros no escape) ou rica (fumaça escura, fuligem na vela). Em uso urbano com trânsito parado frequente, a tendência a entupimento por etanol degradado é até maior que na trail (mais tempo em marcha lenta).',
  },
  {
    severity: 'OK',
    title: 'Suspensão firme + potência maior: cuidado redobrado com buracos em velocidade',
    body: 'A combinação de suspensão de curso curto (ajuste Motard) com o torque maior do motor de 196cc exige atenção a buracos e lombadas em velocidade — o curso reduzido da bengala/amortecedor "estoura" mais fácil em impactos fortes que a versão trail com curso longo. Verifique óleo da bengala a cada 8.000 km e fique atento a ruído metálico seco (fim de curso) como sinal de suspensão sobrecarregada.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com a STX 200 trail: motor, elétrica e câmbio idênticos',
    body: 'Toda peça de motor (pistão, anéis, junta, CDI, retificador, bobina, carburador) da Motard 200 é intercambiável com a STX 200 trail — só mudam suspensão, rodas, pneus e partes da carenagem/guidão. Isso facilita bastante encontrar peça de reposição, já que o motor 196cc dessa linhagem é usado em vários outros modelos de entrada nacionais.',
  },
]

const STXMOTARD200_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador: mesmo ponto de falha elétrica da STX 200 trail',
    body: 'A Motard 200 herda o mesmo sistema elétrico (e a mesma fragilidade do retificador/regulador) da STX 200 trail. Sintoma e diagnóstico são idênticos: bateria não carrega, farol fraco em marcha lenta, multímetro na bateria a 4.000 rpm deve marcar 13,5–14,5V. Como a Motard costuma ter mais acessórios elétricos usados (buzina, pisca, farol de LED em algumas customizações), a queda de tensão com retificador ruim é percebida mais rápido.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pela junta do cárter/cabeçote: mesmo padrão da STX 200 trail acima de 25.000 km',
    body: 'O mesmo desgaste de junta relatado na STX 200 trail (afrouxamento de parafusos por vibração, reaperto necessário a cada 10.000 km) se aplica igualmente à Motard 200, já que o motor é idêntico. Reaperto preventivo evita a maior parte dos vazamentos.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste rápido do pneu traseiro em uso esportivo/derrapagem controlada',
    body: 'Com mais potência que a Motard 125, a versão 200 desgasta o pneu traseiro ainda mais rápido em uso esportivo — trocas a cada 5.000–8.000 km são comuns entre donos que gostam de "rabear" a moto. Fique atento ao TWI (indicador de desgaste) e evite andar com sulco muito raso, principalmente em piso molhado.',
  },
  {
    severity: 'WARN',
    title: 'Vibração em alta rotação: monitore parafusos do motor com mais frequência que na trail',
    body: 'Por ser usada em rotações mais sustentadas (uso urbano/esportivo tende a manter giro mais alto que trilha), os parafusos de fixação do motor no quadro da Motard 200 podem soltar um pouco mais cedo que na trail. Inclua a verificação desses parafusos nas revisões de rotina, especialmente após qualquer viagem longa em rodovia.',
  },
]

const STXMOTARD200_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário STX MOTARD 200: base da STX 200 trail, ajustado para uso urbano/esportivo em asfalto',
    body: '500 km — Troca de óleo inicial (rodagem). | 1.000 km — Segunda troca de óleo + reaperto geral do motor. | 3.000 km — Troca de óleo (20W-50 ~1,1L). Lubrificar corrente. | 4.000 km — Inspecionar pastilhas de freio (uso esportivo desgasta rápido). | 5.000 km — Limpeza do carburador PZ26/PZ27. Filtro de ar. | 7.000 km — Troca da vela D8EA. Folga de válvulas (adm 0,05mm / esc 0,08mm, motor frio). | 8.000 km — Verificar óleo da bengala dianteira. | 10.000 km — Reaperto geral do motor. Fluido de freio DOT 4. Kit relação se desgastado. | 25.000 km — Inspecionar junta do cárter/cabeçote quanto a vazamento.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'STX 125cc',
    yearFrom: null,
    yearTo: null,
    MACETES: STX125_MACETES,
    PROBLEMAS: STX125_PROBLEMAS,
    MANUTENCAO: STX125_MANUTENCAO,
  },
  {
    modelName: 'STX 200cc',
    yearFrom: null,
    yearTo: null,
    MACETES: STX200_MACETES,
    PROBLEMAS: STX200_PROBLEMAS,
    MANUTENCAO: STX200_MANUTENCAO,
  },
  {
    modelName: 'STX MOTARD 125cc',
    yearFrom: null,
    yearTo: null,
    MACETES: STXMOTARD125_MACETES,
    PROBLEMAS: STXMOTARD125_PROBLEMAS,
    MANUTENCAO: STXMOTARD125_MANUTENCAO,
  },
  {
    modelName: 'STX MOTARD 200cc',
    yearFrom: null,
    yearTo: null,
    MACETES: STXMOTARD200_MACETES,
    PROBLEMAS: STXMOTARD200_PROBLEMAS,
    MANUTENCAO: STXMOTARD200_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'STX 125cc',
    yearFrom: null, yearTo: null,
    tireSize: '2.75-21 (F) · 4.10-18 (R)',
    frontPsi: 20, rearPsi: 24,
    frontPsiLoad: 22, rearPsiLoad: 28,
    notes: 'Solo: F 20 / R 24 PSI. Com carona/bagagem: F 22 / R 28 PSI. Pressão mais baixa que uma street, típica de pneu cross/trail (carcaça mais flexível para absorver terreno irregular). Em uso 100% asfalto, pode subir levemente (F 22 / R 26) para reduzir desgaste. Verifique semanalmente — pneu cross perde ar mais perceptivelmente em pressão baixa.',
  },
  {
    modelName: 'STX 200cc',
    yearFrom: null, yearTo: null,
    tireSize: '2.75-21 (F) · 4.10-18 (R)',
    frontPsi: 21, rearPsi: 26,
    frontPsiLoad: 23, rearPsiLoad: 30,
    notes: 'Solo: F 21 / R 26 PSI. Com carona/bagagem: F 23 / R 30 PSI. Mesma medida de pneu cross/trail da 125cc; pressão levemente maior por causa do peso/potência maiores da 200cc. Verifique semanalmente.',
  },
  {
    modelName: 'STX MOTARD 125cc',
    yearFrom: null, yearTo: null,
    tireSize: '90/90-17 (F) · 110/70-17 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 30 PSI. Com carona: F 28 / R 33 PSI. Pneu de rua em aro 17 — pressão bem mais alta que a versão trail (STX 125cc), típica de pneu street/supermotard de carcaça mais rígida. NÃO usar a pressão da STX 125cc trail nesta versão. Pneus recomendados: Pirelli MT60 (semi-slick) ou Levorin Dinamic Pro (100% rua).',
  },
  {
    modelName: 'STX MOTARD 200cc',
    yearFrom: null, yearTo: null,
    tireSize: '100/80-17 (F) · 130/70-17 (R)',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 30, rearPsiLoad: 36,
    notes: 'Solo: F 28 / R 32 PSI. Com carona: F 30 / R 36 PSI. Pneu de rua em aro 17, mais largo que a Motard 125 pela potência maior da 200cc. Pressão bem acima da versão trail (STX 200cc) — não confundir as especificações entre as duas versões.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // STX 125cc
  { modelName: 'STX 125cc', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA (~0,9L)', intervalKm: 2500, intervalMonths: 6, notes: 'Motor 124cc OHC a ar. Embreagem úmida — nunca JASO MB. Reduza para 2.000 km em uso intenso de trilha.', priority: 'HIGH', order: 1 },
  { modelName: 'STX 125cc', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente 428H', intervalKm: 400, intervalMonths: null, notes: 'Uso off-road: a cada 300–400 km. Relubrificar sempre após água/lama. Folga 20–30mm.', priority: 'HIGH', order: 2 },
  { modelName: 'STX 125cc', yearFrom: null, yearTo: null, component: 'Vela A7TC/C7HSA (gap 0,6–0,7mm)', intervalKm: 6000, intervalMonths: null, notes: 'Inspeção visual a cada 3.000 km em uso de trilha (poeira empasta o eletrodo).', priority: 'MEDIUM', order: 3 },
  { modelName: 'STX 125cc', yearFrom: null, yearTo: null, component: 'Filtro de ar (espuma) — limpeza', intervalKm: 1000, intervalMonths: null, notes: 'Uso off-road: a cada 1.000 km. Lavar com querosene, secar, umedecer com óleo de filtro.', priority: 'HIGH', order: 4 },
  { modelName: 'STX 125cc', yearFrom: null, yearTo: null, component: 'Limpeza do carburador PZ19/PZ20', intervalKm: null, intervalMonths: 6, notes: 'Preventivo contra verniz de etanol degradado. Drenar cuba antes de guardar por +20 dias.', priority: 'MEDIUM', order: 5 },
  { modelName: 'STX 125cc', yearFrom: null, yearTo: null, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'STX 125cc', yearFrom: null, yearTo: null, component: 'Óleo da bengala dianteira', intervalKm: 10000, intervalMonths: null, notes: 'Verificar nível; perde volume lentamente por vedação com o tempo.', priority: 'MEDIUM', order: 7 },
  { modelName: 'STX 125cc', yearFrom: null, yearTo: null, component: 'Kit relação 428H (pinhão 14T + coroa ~40T + corrente)', intervalKm: 15000, intervalMonths: null, notes: 'Trocar kit completo, nunca só a corrente com coroa gasta.', priority: 'HIGH', order: 8 },
  { modelName: 'STX 125cc', yearFrom: null, yearTo: null, component: 'Retentor de câmbio — inspeção', intervalKm: 15000, intervalMonths: null, notes: 'Endurece e vaza com sol/uso intenso. Peça genérica de baixo custo.', priority: 'MEDIUM', order: 9 },
  { modelName: 'STX 125cc', yearFrom: null, yearTo: null, component: 'Verificação do CDI e retificador', intervalKm: null, intervalMonths: 12, notes: 'Multímetro na bateria a 4.000 rpm: deve ser 13,5–14,5V.', priority: 'MEDIUM', order: 10 },

  // STX 200cc
  { modelName: 'STX 200cc', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA (~1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 196cc OHC a ar. Reduza para 2.000 km em uso intenso de trilha/calor.', priority: 'HIGH', order: 1 },
  { modelName: 'STX 200cc', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Mais torque que a 125cc — atenção redobrada à tensão. Folga 20–30mm.', priority: 'HIGH', order: 2 },
  { modelName: 'STX 200cc', yearFrom: null, yearTo: null, component: 'Vela NGK D8EA (gap 0,6–0,7mm)', intervalKm: 7000, intervalMonths: null, notes: 'A cada 5.000 km se uso predominante em trilha com poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'STX 200cc', yearFrom: null, yearTo: null, component: 'Limpeza do carburador PZ26/PZ27', intervalKm: null, intervalMonths: 6, notes: 'Jato principal maior que a 125cc — mistura pobre causa superaquecimento.', priority: 'MEDIUM', order: 4 },
  { modelName: 'STX 200cc', yearFrom: null, yearTo: null, component: 'Filtro de ar (espuma) — limpeza', intervalKm: 2000, intervalMonths: null, notes: 'Lavar com querosene, secar, umedecer com óleo de filtro.', priority: 'HIGH', order: 5 },
  { modelName: 'STX 200cc', yearFrom: null, yearTo: null, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm)', intervalKm: 7000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'STX 200cc', yearFrom: null, yearTo: null, component: 'Curso do pedal de freio traseiro (tambor)', intervalKm: 3000, intervalMonths: null, notes: 'Regular folga de 20–30mm antes de frear. Lona < 2mm: trocar.', priority: 'MEDIUM', order: 7 },
  { modelName: 'STX 200cc', yearFrom: null, yearTo: null, component: 'Reaperto geral do motor (cárter/cabeçote)', intervalKm: 10000, intervalMonths: null, notes: 'Vibração do monocilíndrico afrouxa parafusos com o tempo. Torque ~10–14 Nm cruzado.', priority: 'MEDIUM', order: 8 },
  { modelName: 'STX 200cc', yearFrom: null, yearTo: null, component: 'Vedante da bengala dianteira', intervalKm: 15000, intervalMonths: null, notes: 'Inspecionar vazamento em uso off-road pesado.', priority: 'MEDIUM', order: 9 },
  { modelName: 'STX 200cc', yearFrom: null, yearTo: null, component: 'Verificação do retificador/regulador', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha elétrica mais reportado. 13,5–14,5V a 4.000 rpm.', priority: 'CRITICAL', order: 10 },

  // STX MOTARD 125cc
  { modelName: 'STX MOTARD 125cc', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA (~0,9L)', intervalKm: 2500, intervalMonths: 6, notes: 'Mesmo motor da STX 125cc trail. Uso urbano pode esticar levemente para 3.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'STX MOTARD 125cc', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Uso urbano: menos crítico que a trail. Folga 20–30mm.', priority: 'MEDIUM', order: 2 },
  { modelName: 'STX MOTARD 125cc', yearFrom: null, yearTo: null, component: 'Vela A7TC/C7HSA (gap 0,6–0,7mm)', intervalKm: 6000, intervalMonths: null, notes: 'Mesma peça da STX 125cc trail.', priority: 'MEDIUM', order: 3 },
  { modelName: 'STX MOTARD 125cc', yearFrom: null, yearTo: null, component: 'Pastilhas de freio (disco dianteiro/traseiro)', intervalKm: 4000, intervalMonths: null, notes: 'Uso urbano/esportivo desgasta mais rápido que uso de trilha.', priority: 'HIGH', order: 4 },
  { modelName: 'STX MOTARD 125cc', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 12, notes: 'Anual — mais frequente que a trail pela exigência maior em asfalto.', priority: 'HIGH', order: 5 },
  { modelName: 'STX MOTARD 125cc', yearFrom: null, yearTo: null, component: 'Filtro de ar — limpeza', intervalKm: 5000, intervalMonths: 12, notes: 'Uso urbano: satura mais devagar que em trilha.', priority: 'MEDIUM', order: 6 },
  { modelName: 'STX MOTARD 125cc', yearFrom: null, yearTo: null, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 7 },
  { modelName: 'STX MOTARD 125cc', yearFrom: null, yearTo: null, component: 'Óleo da bengala dianteira', intervalKm: 8000, intervalMonths: null, notes: 'Curso mais curto e firme — trabalho mais intenso que a trail.', priority: 'MEDIUM', order: 8 },
  { modelName: 'STX MOTARD 125cc', yearFrom: null, yearTo: null, component: 'Kit relação 428H', intervalKm: 15000, intervalMonths: null, notes: 'Kit idêntico ao da STX 125cc trail (mesmo motor/câmbio).', priority: 'MEDIUM', order: 9 },
  { modelName: 'STX MOTARD 125cc', yearFrom: null, yearTo: null, component: 'Retentor de câmbio — inspeção', intervalKm: 15000, intervalMonths: null, notes: 'Mesmo ponto fraco compartilhado com a versão trail.', priority: 'MEDIUM', order: 10 },

  // STX MOTARD 200cc
  { modelName: 'STX MOTARD 200cc', yearFrom: null, yearTo: null, component: 'Óleo 20W-50 JASO MA (~1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Mesmo motor da STX 200cc trail.', priority: 'HIGH', order: 1 },
  { modelName: 'STX MOTARD 200cc', yearFrom: null, yearTo: null, component: 'Lubrificação da corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'MEDIUM', order: 2 },
  { modelName: 'STX MOTARD 200cc', yearFrom: null, yearTo: null, component: 'Vela NGK D8EA (gap 0,6–0,7mm)', intervalKm: 7000, intervalMonths: null, notes: 'Mesma peça da STX 200cc trail.', priority: 'MEDIUM', order: 3 },
  { modelName: 'STX MOTARD 200cc', yearFrom: null, yearTo: null, component: 'Pastilhas de freio (disco duplo)', intervalKm: 4000, intervalMonths: null, notes: 'Uso esportivo/derrapagem controlada desgasta mais rápido.', priority: 'HIGH', order: 4 },
  { modelName: 'STX MOTARD 200cc', yearFrom: null, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 12, notes: 'Anual — mais crítico pela potência maior da 200cc.', priority: 'HIGH', order: 5 },
  { modelName: 'STX MOTARD 200cc', yearFrom: null, yearTo: null, component: 'Limpeza do carburador PZ26/PZ27', intervalKm: null, intervalMonths: 6, notes: 'Uso urbano com marcha lenta frequente aumenta risco de entupimento por etanol.', priority: 'MEDIUM', order: 6 },
  { modelName: 'STX MOTARD 200cc', yearFrom: null, yearTo: null, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm)', intervalKm: 7000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 7 },
  { modelName: 'STX MOTARD 200cc', yearFrom: null, yearTo: null, component: 'Óleo da bengala dianteira', intervalKm: 8000, intervalMonths: null, notes: 'Curso curto + torque maior — verificar nível com atenção.', priority: 'MEDIUM', order: 8 },
  { modelName: 'STX MOTARD 200cc', yearFrom: null, yearTo: null, component: 'Reaperto geral do motor (cárter/cabeçote)', intervalKm: 10000, intervalMonths: null, notes: 'Mesmo padrão de afrouxamento da STX 200cc trail.', priority: 'MEDIUM', order: 9 },
  { modelName: 'STX MOTARD 200cc', yearFrom: null, yearTo: null, component: 'Verificação do retificador/regulador', intervalKm: null, intervalMonths: 12, notes: '13,5–14,5V a 4.000 rpm. Falha percebida mais rápido pelo uso de acessórios elétricos.', priority: 'CRITICAL', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Sundown STX (125 / 200 / MOTARD 125 / MOTARD 200)...')

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

  console.log('✅ Sundown STX concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
