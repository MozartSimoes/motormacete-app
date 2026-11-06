// seed-ktm-sx-motocross.ts — KTM linha SX de motocross: 50, 65, 85, 125, 250/250F, 300, 350F, 450F
// Motos de competição pura (motocross), sem placa, uso em pista/trilha. Manutenção por HORAS de uso.
// Execute: pnpm --filter @motormacete/database db:seed:ktm-sx-motocross
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

// ─── KTM 50 SX (motocross infantil) ───────────────────────────────────────────
// Motor: ~49,9cc monocilíndrico 2 tempos refrigerado a líquido | ~5,4 cv @ 11.500 rpm
// Câmbio: automático (embreagem centrífuga, sem alavanca de embreagem) | Partida: elétrica/coice conforme versão
// Pneu: 60/100-10 (F, aro 12) / 2.75-10 (R, aro 10) conforme versão | Tanque: ~2,3L
// Uso: crianças ~4-8 anos. Peso ~45kg. Mistura de combustível 2T obrigatória.

const SX50_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mistura de combustível 2T: siga a proporção da embalagem do óleo (tipicamente 50:1 a 60:1)',
    body: 'A 50 SX é motor 2 tempos puro — não tem tanque de óleo separado, a lubrificação vem da mistura na gasolina. Use óleo sintético 2T específico para motocross: Motul 800 2T (competição) ou Motul 600 2T (treino/lazer). A proporção varia por marca de óleo — siga sempre a embalagem, mas a faixa usual gira entre 50:1 e 60:1. Prepare a mistura em recipiente próprio, nunca direto no tanque — a proporção errada mata o motor rapidamente (motor 2T sem óleo suficiente gripa em minutos).',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático (embreagem centrífuga): não force trocas de marcha inexistentes',
    body: 'A 50 SX não tem embreagem manual nem marchas trocáveis — o câmbio é automático via embreagem centrífuga, como uma moto de criança deve ser. Isso simplifica muito a manutenção comparado às SX maiores: não há cabo de embreagem para ajustar. O ponto de atenção é a limpeza da embreagem centrífuga a cada poucas horas de uso — poeira que entra pela ventilação do cárter pode grudar as sapatas da embreagem e causar patinação ou engate brusco.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma com óleo específico — o item mais importante da moto',
    body: 'Em motocross infantil, o filtro de ar é ainda mais crítico proporcionalmente porque o motor é pequeno e qualquer entrada de poeira danifica rapidamente o cilindro. Use óleo de filtro específico (Motul A1 Air Filter Oil, Bel-Ray Foam Filter Oil) — nunca óleo de motor comum, que não retém poeira da mesma forma. Limpeza: gasolina ou removedor específico, espremer (nunca torcer), secar, aplicar óleo e espremer o excesso até não pingar. Verifique e limpe após CADA sessão de treino — é a rotina mais importante para prolongar a vida do motor.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR9EG (ou equivalente) — gap pequeno, troque a cada 10-15 horas',
    body: 'Vela recomendada para o motor 49,9cc: NGK BR9EG ou equivalente indicado no manual (varia por ano/versão — confirme no manual do proprietário specific do ano da moto). Gap típico de motor 2T pequeno: 0,5-0,6mm. Como é motor 2T com mistura de óleo, a vela suja mais rápido que um 4 tempos — troque preventivamente a cada 10-15 horas de uso ou antes se a moto começar a "engasgar" ou ter dificuldade de partida. Custo baixo, R$ 25-40.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 415 ou 420 pequena — lubrifique após cada treino em pó/areia',
    body: 'A 50 SX usa corrente de passo pequeno (415 ou 420 conforme versão/ano). Como o uso é sempre em pista de terra, a corrente acumula abrasivo rapidamente. Lubrifique com spray de corrente para motocross (Motul C2 Chain Lube ou similar) após cada dia de treino, e limpe com escova antes de lubrificar — lubrificar por cima da sujeira só cria uma pasta abrasiva que acelera o desgaste. Kit relação (pinhão + coroa + corrente) para as SX pequenas: R$ 150-300 em lojas especializadas em motocross.',
  },
  {
    severity: 'OK',
    title: 'Peças infantis: kits de pistão e juntas disponíveis via importadores de motocross',
    body: 'Por ser moto de baixo volume de venda no Brasil, peças de motor (pistão, anéis, juntas do cilindro) geralmente precisam ser encomendadas de importadores especializados em motocross (lojas como MXPro, Just1 Racing, ou diretamente via concessionária KTM). Tenha à mão o número de chassi e ano exato da moto ao pedir peças — a 50 SX teve pequenas mudanças de motor entre gerações (ex: versão "Mini" vs "Standard" com cursos de suspensão diferentes).',
  },
]

const SX50_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Gripagem do motor por mistura de combustível errada ou vencida',
    body: 'O erro mais comum e mais caro em motos 2T infantis: mistura de combustível fora da proporção correta (pouco óleo) ou gasolina/mistura velha (mais de 30 dias) perdendo a lubrificação. Sintoma de gripagem iminente: motor esquenta mais que o normal, perde potência, "engasga" em alta rotação. Se isso acontecer, pare imediatamente — continuar rodando pode destruir o cilindro e pistão (reparo caro, R$ 800-1.500+ em peças e mão de obra). Prepare mistura nova a cada treino, não guarde sobra por semanas.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste severo por poeira: filtro de ar mal cuidado é a causa #1 de motor gasto cedo',
    body: 'Motos de motocross infantil rodam sempre em pista de terra — a poeira em suspensão é constante. Um filtro de ar mal limpo ou seco (sem óleo) deixa poeira passar para dentro do motor, causando desgaste acelerado de cilindro/pistão em poucas dezenas de horas. Sintoma: perda de potência gradual, consumo de mistura maior, fumaça de escape mais intensa que o normal. Prevenção: limpar o filtro após cada uso, nunca rodar sem filtro "para dar mais potência" (mito perigoso e caro).',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de suspensão dianteira (WP) por uso constante em pista',
    body: 'As bengalas WP da 50 SX (curso reduzido, ~275mm) têm retentores pequenos que endurecem com a exposição à poeira e ao sol. Sintoma: película de óleo visível no tubo interno da bengala, amortecimento "ressecado". Como é moto infantil de baixo peso, o desgaste é mais lento que nas SX grandes, mas ainda assim recomenda-se inspeção a cada 20-30 horas de uso. Troca de retentor: serviço de oficina especializada em motocross, R$ 150-300 nas duas bengalas.',
  },
  {
    severity: 'WARN',
    title: 'Corrente esticando/desgastando rápido: ajuste de folga a cada poucos treinos',
    body: 'A corrente pequena (415/420) da 50 SX estica e desgasta rapidamente com o uso em terra — normal para o segmento. Se não ajustada, pode saltar do pinhão em uso mais agressivo. Verifique a folga a cada 2-3 sessões de treino (folga recomendada geralmente entre 5-10mm no manual, conferir para o ano específico). Corrente e kit relação são consumíveis — trocar corrente e pinhão a cada 15-25 horas de uso intenso é normal para esta categoria.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem centrífuga com patinação por sapatas desgastadas ou sujas',
    body: 'Sintoma: moto "não puxa" mesmo em alta rotação, cheiro de queimado leve perto da embreagem. Causa comum: sapatas da embreagem centrífuga desgastadas (normal após uso intenso) ou contaminadas por poeira que entrou pela ventilação do cárter. Solução: limpeza ou substituição das sapatas — serviço relativamente simples em oficina especializada em motocross infantil, mas peça específica que pode precisar de encomenda.',
  },
]

const SX50_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 50 SX por HORAS de uso (não km) — pista de terra desgasta muito mais rápido',
    body: 'Motocross usa manutenção por horas de motor rodando, não por quilometragem — em pista de terra o desgaste não tem relação direta com a distância percorrida. Referência aproximada: 1 hora de treino em motocross infantil equivale a ~15-25 km rodados (velocidades baixas, mas motor sempre em alta rotação). Cronograma: A CADA TREINO — limpar filtro de ar, verificar folga de corrente, verificar aperto de parafusos (vibração solta parafusos facilmente). A cada 5-10 horas — trocar vela, verificar embreagem centrífuga. A cada 10-15 horas — verificar/trocar corrente e pinhão, revisão de suspensão (limpeza externa das bengalas). A cada 20-30 horas — inspeção de retentores de suspensão, revisão geral do motor por mecânico especializado em motocross (equivalente a ~300-500 km rodados).',
  },
]

// ─── KTM 65 SX (motocross júnior) ─────────────────────────────────────────────
// Motor: 64,85cc monocilíndrico 2 tempos refrigerado a líquido, válvula de palheta | bore/stroke 45/40,8mm
// Câmbio: manual 6 velocidades com embreagem | Mistura: ~60:1 (verificar embalagem do óleo)
// Pneu: 60/100-14 (F) / 80/100-12 (R) | Corrente: 420 | Óleo de câmbio/transmissão separado (SAE 10W-40 ou específico KTM)

const SX65_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mistura 2T ~60:1 — use óleo sintético de motocross e prepare fresco a cada treino',
    body: 'A 65 SX é 2 tempos com câmbio manual (diferente da 50 SX automática). Proporção de mistura recomendada gira em torno de 60:1 — confirme sempre na embalagem do óleo escolhido, pois a proporção varia por marca e composição química. Óleos recomendados: Motul 800 2T Factory Line (competição), Motul 600 2T (treino), Bel-Ray SI-7. Misture em recipiente calibrado, nunca "no olho". Combustível parado por mais de 2-3 semanas perde qualidade — descarte e prepare mistura nova.',
  },
  {
    severity: 'OK',
    title: 'Câmbio manual 6 marchas: óleo de transmissão separado do motor — não confunda',
    body: 'Diferente da 50 SX, a 65 SX tem câmbio manual com embreagem — e o óleo da transmissão é separado da mistura de combustível do motor (2T puro não lubrifica engrenagens com a mistura). Use óleo específico para câmbio de 2 tempos KTM (ou SAE 10W-40 se indicado no manual do ano específico) — capacidade pequena, geralmente ~500-700mL. Troque a cada 15-20 horas de uso — óleo de câmbio contaminado com partículas metálicas acelera desgaste das engrenagens.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma: rotina crítica, verificar/limpar a cada treino',
    body: 'Assim como toda a linha SX, o filtro de ar é o componente mais importante para a longevidade do motor. Use óleo específico (Motul A1, Bel-Ray Foam Filter Oil, Twin Air Filter Oil) — nunca óleo de motor. Processo: lavar com removedor específico ou gasolina, espremer sem torcer, secar completamente, aplicar óleo generosamente e espremer o excesso. Verifique após CADA sessão — pista de terra em categoria júnior tem tanta poeira quanto categorias maiores.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR9EG/BR8EG conforme ano — gap ~0,5-0,6mm; troque a cada 10-15h',
    body: 'Vela recomendada varia por ano/configuração de jato do carburador — confirme no manual específico do ano. Faixa comum de trabalho: NGK BR8EG a BR9EG dependendo do uso (competição x treino, clima quente x frio). Como todo 2T com mistura de óleo, a vela suja mais rápido — inspecione a cor do eletrodo a cada poucas horas (marrom claro = ok, preto fuliginoso = mistura rica ou filtro sujo, branco = mistura pobre, risco de gripagem).',
  },
  {
    severity: 'OK',
    title: 'Corrente 420 + kit relação — peças compatíveis fáceis de achar em lojas de motocross',
    body: 'A 65 SX usa corrente 420, tamanho comum em motos pequenas de motocross — encontrado facilmente em lojas especializadas (DID, RK). Kit relação completo: R$ 200-400. Lubrifique após cada treino com spray específico para motocross (Motul C2, Bel-Ray). A poeira gruda no lubrificante e forma pasta abrasiva se não for limpa antes de nova aplicação — sempre escove a corrente antes de lubrificar de novo.',
  },
  {
    severity: 'WARN',
    title: 'Peças de motor 2T: kits de pistão/anéis disponíveis, mas confirme medida exata do ano',
    body: 'O motor 64,85cc teve pequenas revisões ao longo dos anos — sempre confirme o código de peça pelo número de chassi/ano exato antes de comprar kit de pistão ou junta do cilindro. Lojas especializadas em motocross (importadoras de peças KTM/Pro-X/Wossner) vendem kits completos (pistão + anéis + junta) para reforma do motor 2T — essencial em moto de competição que passa por muitas horas de uso intenso.',
  },
]

const SX65_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Gripagem por mistura errada ou filtro de ar entupido — motor 2T sem tolerância a erro',
    body: 'Assim como toda a linha 2T da KTM, o motor da 65 SX não perdoa erros de mistura de combustível ou filtro de ar sujo. Sintomas de aviso: perda de potência progressiva, motor esquentando mais que o normal, ruído metálico agudo. Pare imediatamente ao notar qualquer sintoma — continuar rodando transforma um problema de R$ 200 (limpeza/ajuste) em um de R$ 1.000+ (pistão, cilindro, biela).',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de embreagem manual por uso competitivo (arrancadas frequentes)',
    body: 'Diferente da 50 SX automática, a 65 SX tem embreagem manual multidisco que sofre desgaste acelerado com uso competitivo — arrancadas na largada, uso agressivo da embreagem em curvas técnicas. Sintoma: patinação sob carga, ponto de embreagem mudando (precisa ajustar o cabo com mais frequência). Discos de embreagem são consumíveis nesta categoria — inspecionar a cada 20-30 horas de uso, trocar quando a espessura estiver no limite inferior especificado no manual.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de suspensão dianteira WP — comum após uso intenso',
    body: 'As bengalas WP da 65 SX trabalham com curso considerável para uma moto júnior e sofrem com a exposição constante a poeira e impactos de pista. Sintoma: óleo visível escorrendo pelo tubo interno da bengala, perda de amortecimento (moto "batendo" mais nos saltos). Inspecionar retentores a cada 20-25 horas de uso — troca é serviço de oficina especializada em motocross, R$ 200-350 nas duas bengalas.',
  },
  {
    severity: 'WARN',
    title: 'Corrente esticando rapidamente e desgaste de coroa/pinhão',
    body: 'Uso competitivo em pista de motocross desgasta corrente e relação muito mais rápido que uso de rua. Se a folga da corrente ficar maior que o especificado, risco de saltar do pinhão em aterrissagens de saltos — situação perigosa. Verifique a folga a cada 2-3 treinos. Corrente/pinhão/coroa costumam durar 20-30 horas de uso competitivo intenso antes de precisarem de substituição.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de filtro de ar por poeira causando desgaste prematuro do motor',
    body: 'Problema documentado em toda a linha SX pequena: pilotos que pulam a limpeza do filtro entre treinos ou usam óleo de filtro inadequado sofrem desgaste de cilindro muito antes do esperado. Sinal de alerta: consumo de mistura aumentando, fumaça de escape mais escura/intensa, perda de resposta em alta rotação. A prevenção (limpeza a cada uso) custa uma fração do reparo de motor.',
  },
]

const SX65_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 65 SX por HORAS de uso — equivalência aproximada em km para referência',
    body: 'Manutenção por horas de motor, não por km — em motocross júnior, 1 hora de pista equivale a aproximadamente 20-30 km rodados (velocidades moderadas, motor sempre em regime de alta rotação). A CADA TREINO — limpar filtro de ar, verificar folga de corrente e aperto geral de parafusos. A cada 10-15 horas (~200-400 km) — trocar vela, verificar/trocar óleo de câmbio, inspecionar embreagem. A cada 15-25 horas (~300-600 km) — corrente/pinhão/coroa, revisão de suspensão (limpeza externa, checar vazamento). A cada 25-40 horas — revisão geral de motor (pistão/anéis) por mecânico especializado em motocross, retentores de suspensão nas bengalas WP.',
  },
]

// ─── KTM 85 SX (motocross júnior/amador) ──────────────────────────────────────
// Motor: 84,93cc monocilíndrico 2 tempos refrigerado a líquido, válvula de palheta | bore/stroke 47/48,95mm
// Câmbio: manual 6 velocidades | Mistura: ~40:1 (verificar embalagem — algumas indicações citam também faixas próximas de 60:1 conforme óleo)
// Pneu: 70/100-17 ou 80/100-17 (F) / 90/100-14 (R) conforme versão (17/14 ou 19/16) | Corrente: 420
// Uma das SX mais populares — ponte entre motos infantis e as "motos grandes" (125+)

const SX85_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mistura 2T ~40:1 (confirme na embalagem do óleo) — óleo sintético de competição recomendado',
    body: 'A 85 SX tem proporção de mistura mais rica em óleo que a 65 SX (tipicamente próxima de 40:1, mas SEMPRE confirme na embalagem específica do óleo escolhido — proporções variam por formulação). Óleos recomendados: Motul 800 2T Factory Line para competição, Motul 600 2T para treino regular, Bel-Ray SI-7. Como é uma das SX mais usadas em competição, muitos pilotos preparam mistura fresca antes de cada evento — não reutilize sobra de mistura de treinos anteriores.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma dupla camada — a rotina mais importante desta moto',
    body: 'A 85 SX é usada intensamente em competição, e o filtro de ar de dupla camada de espuma precisa de atenção redobrada. Óleo específico: Motul A1 Air Filter Oil, Twin Air Filter Oil ou Bel-Ray Foam Filter Oil — nunca óleo de motor comum (não retém poeira da mesma forma e pode saturar a espuma). Limpe e reaplique óleo após CADA sessão de treino ou prova — é o item #1 responsável por evitar desgaste prematuro do motor nesta categoria.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR9EG/BR8ES (conforme ano/jato) — inspecione a cor do eletrodo a cada uso',
    body: 'Vela recomendada varia conforme o ano e a regulagem de carburação (clima, altitude, jato principal usado). Faixa típica de trabalho: NGK BR8ES a BR9EG. Inspecione a cor do eletrodo regularmente: marrom-claro/acinzentado é ideal, preto fuliginoso indica mistura rica ou filtro sujo, branco/queimado indica mistura pobre (risco real de gripagem em moto de alta performance como a 85 SX). Troca preventiva a cada 10-15 horas de uso.',
  },
  {
    severity: 'OK',
    title: 'Corrente 420 reforçada — categoria mais exigente que 65 SX, trocar kit com mais frequência',
    body: 'A 85 SX tem mais potência que as SX menores e desgasta a corrente 420 mais rápido, especialmente em uso competitivo com pilotos mais pesados/agressivos. Kits de relação (DID, RK) disponíveis em lojas especializadas em motocross: R$ 250-450. Lubrifique com spray específico (Motul C2, Bel-Ray) após cada treino, sempre limpando a sujeira acumulada antes de aplicar lubrificante novo.',
  },
  {
    severity: 'OK',
    title: 'Peças de reforma de motor: kits de pistão Wossner/Pro-X disponíveis via importadores',
    body: 'Por ser uma das SX mais populares no mundo (moto de transição para categorias maiores), há bom suporte de peças aftermarket: kits de pistão forjado (Wossner, Pro-X, Vertex), juntas completas, e kits de reforma de embreagem são vendidos por importadores especializados em motocross no Brasil. Confirme sempre a versão exata (17/14 ou 19/16, referente aos tamanhos de roda) antes de comprar peças de suspensão ou corrente/relação, pois variam entre as duas configurações.',
  },
  {
    severity: 'WARN',
    title: 'Ajuste de suspensão WP para o peso do piloto — item frequentemente esquecido',
    body: 'A 85 SX atende pilotos de faixas de peso e altura variadas (categoria de transição), e a suspensão WP de fábrica costuma vir para um piloto "médio". Se o piloto for muito leve ou muito pesado para a calibração padrão, a suspensão pode ceder demais ou ficar dura demais, acelerando desgaste de retentores e buchas. Recomenda-se ajuste de mola e óleo de suspensão em oficina especializada em motocross conforme o peso real do piloto — não é item de "macete" caseiro, é ajuste técnico que vale o investimento.',
  },
]

const SX85_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Gripagem de motor por mistura incorreta ou superaquecimento em uso competitivo',
    body: 'A 85 SX, por ter mais potência e ser usada em competição mais intensa que as SX menores, é mais sensível a erros de mistura de combustível e superaquecimento (baixo nível de líquido de arrefecimento). Sintomas de alerta: perda de potência súbita, motor "travando" momentaneamente em alta rotação, cheiro de queimado. Verifique sempre o nível do radiador antes de rodar e nunca economize na qualidade do óleo 2T.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento do filtro de ar por poeira — causa mais comum de desgaste prematuro nesta categoria',
    body: 'Por ser usada intensamente em treinos e provas, a 85 SX sofre com pilotos (ou responsáveis) que não seguem a rotina de limpeza do filtro a cada sessão. Resultado: desgaste de cilindro muito antes do esperado, perda de compressão, consumo de mistura elevado. É o problema mais evitável e mais caro de ignorar em toda a linha de motocross infantil/júnior.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de suspensão dianteira e traseira — comum em uso competitivo',
    body: 'As bengalas WP e o amortecedor traseiro da 85 SX sofrem desgaste de retentores mais rápido que categorias menores, devido ao maior curso de suspensão e uso mais agressivo (saltos maiores). Sintoma dianteiro: óleo visível no tubo interno da bengala. Sintoma traseiro: vazamento de óleo/nitrogênio no corpo do amortecedor, perda de amortecimento. Inspecionar a cada 15-20 horas de uso; reforma completa de suspensão (retentores + óleo) recomendada a cada temporada de uso competitivo intenso.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de embreagem por arrancadas de largada frequentes',
    body: 'Uso competitivo com largadas frequentes desgasta os discos de embreagem mais rápido que uso recreativo. Sintoma: patinação sob carga em subidas ou acelerações fortes, ponto de acionamento mudando com frequência. Discos e molas de embreagem são consumíveis — inspecionar a cada 20-25 horas, com kits de reposição disponíveis em lojas especializadas em motocross.',
  },
  {
    severity: 'WARN',
    title: 'Corrente esticando/saltando em pilotos mais pesados ou uso muito agressivo',
    body: 'Pilotos na faixa superior de peso para a 85 SX (transição para motos grandes) desgastam a corrente 420 mais rápido, podendo causar folga excessiva e risco de salto do pinhão em aterrissagens de saltos — situação de risco real de queda. Verifique a folga a cada 2-3 sessões e não hesite em trocar o kit relação preventivamente antes de competições importantes.',
  },
]

const SX85_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 85 SX por HORAS de uso — categoria mais exigente entre as infantis/júnior',
    body: 'Manutenção por horas de motor, não por km — 1 hora de motocross na 85 SX equivale a aproximadamente 25-35 km rodados (mais potência e velocidade que as SX menores). A CADA TREINO/PROVA — limpar filtro de ar, verificar folga de corrente, verificar nível de líquido de arrefecimento, aperto geral de parafusos. A cada 10-15 horas (~250-450 km) — trocar vela, verificar óleo de câmbio, inspecionar discos de embreagem. A cada 15-20 horas (~350-600 km) — corrente/pinhão/coroa, inspeção de retentores de suspensão dianteira e traseira. A cada 25-40 horas — reforma de motor (pistão/anéis) e reforma de suspensão (retentores + óleo) por mecânico especializado em motocross — essencial antes de temporada de competição.',
  },
]

// ─── KTM 125 SX (motocross 2 tempos, categoria muito competitiva) ─────────────
// Motor: 124,8cc monocilíndrico 2 tempos refrigerado a líquido | ~34-38cv conforme ano/preparação
// Câmbio: manual 6 velocidades | Mistura: ~40:1 (confirme embalagem do óleo)
// Pneu: 80/100-21 (F) / 100/90-19 (R) — aros 21"/19" padrão motocross adulto | Corrente: 520
// Categoria extremamente popular e competitiva mundialmente (Mundial de MX2, categorias amadoras)

const SX125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mistura 2T ~40:1 com óleo de competição — a base de tudo em uma 125 2T',
    body: 'A 125 SX é uma das 2 tempos mais respeitadas do motocross mundial — mas isso só se traduz em performance real com mistura de combustível correta. Proporção comum: 40:1 (sempre confirme na embalagem do óleo específico usado). Óleos recomendados para competição: Motul 800 2T Factory Line, Bel-Ray SI-7, Maxima Castor 927. Use gasolina de alta octanagem (aditivada ou de posto de confiança) — combustível de baixa qualidade prejudica muito a performance de uma 125 2T bem preparada.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar Twin Air/OEM com óleo específico — poeira é o maior inimigo do motor 2T de alta performance',
    body: 'O motor 124,8cc de alta rotação da 125 SX é extremamente sensível a partículas de poeira — motores 2T de competição têm folgas mais justas que 4 tempos equivalentes. Use óleo de filtro específico (Twin Air Filter Oil, Motul A1, Bel-Ray Foam Filter Oil) e limpe o filtro após CADA sessão de treino/prova, sem exceção. Muitos pilotos de competição carregam filtro reserva já limpo e oleado para trocar entre motos (baterias eliminatórias).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR9EG/BR8ES conforme jato — leitura da vela ensina a regular a carburação',
    body: 'A vela recomendada varia com a regulagem de carburador (jato principal, agulha, altitude, temperatura ambiente) — consulte a tabela do manual para o ano específico. Faixa comum: NGK BR8ES a BR9EG. A "leitura da vela" (cor do eletrodo após rodar em aceleração plena e desligar imediatamente) é técnica clássica para verificar se a mistura ar/combustível está correta: marrom-claro = ideal, branco/queimado = mistura pobre (perigoso, risco de gripagem), preto fuliginoso = mistura rica ou filtro sujo.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 + kit relação DID/RK — categoria com alta potência específica exige corrente robusta',
    body: 'A 125 SX usa corrente 520, mais robusta que as SX menores, compatível com a potência e o uso competitivo intenso da categoria. Kits de relação (DID, RK) disponíveis facilmente em lojas especializadas em motocross no Brasil: R$ 300-550. Lubrifique após cada sessão com spray específico para motocross (Motul C2, Bel-Ray, Maxima Chain Wax) — nunca óleo de motor puro, que não gruda bem e "voa" com a rotação alta característica dos 2T.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor amplamente disponíveis: categoria muito popular facilita reposição',
    body: 'Por ser uma das categorias 2T mais populares e competitivas do motocross mundial, peças de motor (kits de pistão Wossner/Pro-X/Vertex/Wiseco, juntas completas, kits de embreagem, cilindros reformados) têm boa disponibilidade via importadores especializados em motocross no Brasil (MXPro, Just1, lojas parceiras de concessionárias KTM). Preços de kit de pistão completo (pistão + anéis + junta): faixa de R$ 400-900 dependendo da marca e se é original ou aftermarket.',
  },
  {
    severity: 'WARN',
    title: 'Válvula de escape controlada eletronicamente (Power Valve): limpeza periódica evita perda de potência',
    body: 'A 125 SX tem sistema de válvula de escape (power valve) que controla o timing de abertura do escape conforme a rotação — componente que acumula carbono com o uso e pode perder eficiência. Sintoma de válvula suja: perda de potência na faixa média de rotação, resposta "morna". Limpeza da válvula de escape é serviço recomendado a cada 15-20 horas de uso em oficina especializada em motocross — remove o acúmulo de carbono que trava o mecanismo.',
  },
]

const SX125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Gripagem por mistura pobre ou combustível de baixa qualidade — risco real em moto de alta performance',
    body: 'A 125 SX roda em rotações muito altas (motor 2T de competição), o que a torna mais sensível a erros de mistura de combustível que motos de menor performance. Mistura pobre em óleo, gasolina de baixa qualidade, ou vela com gap/grau térmico incorreto podem causar gripagem em minutos de uso em alta rotação. Sinais de alerta: perda súbita de potência, motor "travando" momentaneamente, ruído metálico agudo. Pare imediatamente ao notar qualquer sintoma.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste severo de pistão/anéis por uso competitivo intenso — item de reposição regular, não defeito',
    body: 'Motores 2T de competição desgastam pistão e anéis muito mais rápido que 4 tempos equivalentes — é característica da categoria, não defeito de fabricação. Pilotos de competição costumam trocar pistão/anéis a cada 20-30 horas de uso intenso (treino + prova), enquanto uso recreativo mais leve pode estender esse intervalo. Sintoma de desgaste: queda de compressão, perda de potência, consumo de mistura aumentando. Kits de pistão (Wossner, Pro-X, Wiseco) facilitam a reforma preventiva.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de filtro de ar por poeira causando desgaste prematuro do cilindro',
    body: 'Problema documentado e recorrente em toda a linha SX: pular a limpeza do filtro de ar entre sessões acelera drasticamente o desgaste do motor. Na 125 SX, com motor de alta performance e folgas mais justas, o efeito é ainda mais rápido que em motos maiores de 4 tempos. Consumo de mistura aumentando e fumaça de escape mais intensa são sinais de alerta precoce.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de suspensão dianteira WP AER/USD — comum após temporada de uso competitivo',
    body: 'A bengala dianteira WP (a ar em versões mais recentes, ou convencional em versões anteriores) sofre desgaste de retentor com o uso intenso em saltos e terreno irregular típico de motocross competitivo. Sintoma: óleo visível no tubo interno, perda de amortecimento progressiva. Reforma de suspensão completa (retentores + óleo + verificação de pressão de ar em versões AER) recomendada a cada temporada de competição, R$ 300-600 de serviço especializado.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: patinação sob carga em pilotos que abusam da alavanca em largadas',
    body: 'A embreagem multidisco da 125 SX sofre desgaste acelerado com uso agressivo em largadas de competição (embreagem parcialmente acionada em alta rotação para "segurar" o motor no ponto ideal). Sintoma: patinação em acelerações fortes, cheiro de queimado. Discos e molas de embreagem são consumíveis de competição — muitos pilotos trocam preventivamente antes de provas importantes.',
  },
]

const SX125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 125 SX por HORAS de uso — categoria de alta performance exige atenção redobrada',
    body: 'Manutenção por horas de motor, não por km — 1 hora de motocross na 125 SX equivale a aproximadamente 30-40 km rodados (alta rotação constante, velocidades maiores que categorias júnior). A CADA TREINO/PROVA — limpar filtro de ar, verificar folga de corrente e nível de líquido de arrefecimento. A cada 10-15 horas (~350-500 km) — trocar vela, verificar óleo de câmbio, limpar válvula de escape (power valve). A cada 15-20 horas (~500-700 km) — corrente/pinhão/coroa, inspeção de suspensão dianteira/traseira, embreagem. A cada 20-30 horas (~700-1.100 km) — reforma de pistão/anéis (padrão para uso competitivo intenso), reforma completa de suspensão antes de temporada.',
  },
]

// ─── KTM 250 SX (2 tempos) / KTM 250 SX-F (4 tempos) ──────────────────────────
// FIPE unifica as duas versões no nome "SX 250/ SX 250 F" — são motores DIFERENTES, tratados juntos aqui.
// 250 SX (2T): motor ~249cc refrigerado a líquido | ~45-52cv conforme preparação | mistura ~40:1
// 250 SX-F (4T): motor ~249,9cc DOHC 4 válvulas refrigerado a líquido | ~42-44cv | óleo 4T ~1,2L SAE 10W-50
// Ambas: câmbio manual 6 velocidades | Pneu: 80/100-21 (F) / 100/90-19 (R) | Corrente: 520
// Categoria MX2 mundial — uma das mais disputadas do motocross internacional

const SX250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'IMPORTANTE: identifique se sua 250 SX é 2 tempos ou a 4 tempos (SX-F) antes de qualquer manutenção',
    body: 'A ficha FIPE agrupa "SX 250" (2 tempos) e "SX 250 F" (4 tempos, SX-F) no mesmo registro, mas são motores completamente diferentes — mistura de combustível, óleo, vela e intervalos de manutenção NÃO são intercambiáveis entre as duas versões. A SX 250 (2T) usa mistura de combustível (gasolina + óleo 2T) e NÃO tem cárter de óleo de motor. A SX-F 250 (4T) usa óleo de motor separado (~1,2L, SAE 10W-50) e gasolina pura, sem mistura. Confirme no manual/etiqueta da sua moto qual versão você tem antes de comprar óleo ou peças.',
  },
  {
    severity: 'OK',
    title: '250 SX (2T): mistura ~40:1 com óleo de competição — mesma lógica da 125 SX em cilindrada maior',
    body: 'A 250 SX 2 tempos usa proporção de mistura próxima de 40:1 (confirme na embalagem do óleo escolhido). Óleos recomendados: Motul 800 2T Factory Line para competição, Bel-Ray SI-7, Maxima Castor 927. Entrega mais potência bruta que a 250 SX-F em pistas rápidas e abertas — mas exige atenção redobrada à qualidade do combustível e da mistura, já que erro de proporção pode gripar o motor rapidamente na potência elevada desta cilindrada.',
  },
  {
    severity: 'OK',
    title: '250 SX-F (4T): óleo SAE 10W-50 sintético ~1,2L — troque a cada 8-10 horas de uso competitivo',
    body: 'A 250 SX-F 4 tempos usa óleo de motor sintético (não mistura na gasolina). Capacidade aproximada: 1,2L. Use óleo sintético de motocross JASO MA2: Motul 300V 4T Factory Line 10W-50 (competição), Motul 7100 10W-50 (uso regular), Bel-Ray EXS 10W-50. Troque a cada 8-10 horas de uso competitivo intenso (equivalente a ~250-350 km) — motor de alta rotação sofre estresse térmico maior que motos de rua, o óleo degrada mais rápido.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar Twin Air/OEM: rotina obrigatória para ambas as versões, sem exceção',
    body: 'Tanto a 250 SX quanto a 250 SX-F dependem totalmente da limpeza do filtro de ar para a saúde do motor. Óleo específico: Twin Air Filter Oil, Motul A1, Bel-Ray Foam Filter Oil. Limpe após CADA sessão de treino ou prova — pilotos de competição costumam ter 2-3 filtros de reserva já limpos e oleados prontos para troca rápida entre baterias.',
  },
  {
    severity: 'OK',
    title: 'Vela: 250 SX 2T usa NGK BR8ES/BR9EG conforme jato; 250 SX-F 4T usa NGK LKAR8AI-9 ou similar iridium',
    body: 'A vela correta depende da versão do motor. 250 SX (2T): faixa NGK BR8ES a BR9EG conforme regulagem de carburador. 250 SX-F (4T): geralmente vela iridium de rosca longa tipo NGK LKAR8AI-9 (confirme código exato no manual do ano específico) — troca recomendada a cada 20-30 horas de uso na versão 4T (vela iridium dura mais que velas convencionais dos 2T).',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 + kit relação: mesma especificação para as duas versões',
    body: 'Tanto a 250 SX quanto a 250 SX-F usam corrente 520, compatível com a potência de ambas. Kits de relação DID ou RK disponíveis em lojas especializadas em motocross: R$ 350-600. Lubrifique após cada sessão de uso com spray específico (Motul C2, Bel-Ray, Maxima Chain Wax) — nunca deixe a corrente seca em uso competitivo, o desgaste acelera muito com poeira grudada na graxa ressecada.',
  },
]

const SX250_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: '250 SX (2T): gripagem por mistura incorreta ou combustível de baixa qualidade',
    body: 'A versão 2 tempos da 250 SX é sensível a erros de mistura de combustível na mesma medida que a 125 SX, mas com cilindrada e potência maiores o dano de uma gripagem tende a ser mais caro para reparar. Sinais de alerta: perda súbita de potência, motor "travando" momentaneamente em alta rotação. Pare imediatamente e verifique a mistura/filtro antes de continuar rodando.',
  },
  {
    severity: 'WARN',
    title: '250 SX-F (4T): desgaste de válvulas por uso competitivo intenso — folga deve ser verificada com frequência',
    body: 'O motor 4 tempos DOHC da 250 SX-F tem válvulas que trabalham em altíssima rotação constante durante competição, desgastando as folgas mais rápido que motos de rua equivalentes. Sintoma de folga fora de especificação: motor barulhento (tique-taque metálico), perda de performance na faixa alta de rotação, dificuldade de partida a frio. Verificação de folga de válvulas recomendada a cada 15-20 horas de uso competitivo — item que exige mecânico especializado com jogo de pastilhas (shims) para ajuste.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de filtro de ar por poeira — causa raiz do desgaste prematuro em ambas as versões',
    body: 'Independente de ser 2T ou 4T, o filtro de ar mal cuidado é a causa mais comum de desgaste prematuro de motor na linha SX 250. Em uso competitivo com muita poeira em suspensão, negligenciar a limpeza entre sessões pode reduzir a vida útil do motor de centenas de horas para poucas dezenas.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de suspensão dianteira WP AER/USD e amortecedor traseiro',
    body: 'Ambas as versões (2T e 4T) compartilham a mesma suspensão WP, que sofre desgaste de retentores com uso competitivo intenso em saltos e terreno irregular. Sintoma dianteiro: óleo visível no tubo interno da bengala. Sintoma traseiro: perda de amortecimento, vazamento no corpo do amortecedor. Reforma completa recomendada a cada temporada de competição — R$ 400-700 de serviço especializado nas duas pontas.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: desgaste acelerado com uso competitivo agressivo em ambas as versões',
    body: 'A embreagem multidisco sofre desgaste mais rápido com uso de largadas e trocas agressivas de marcha típicas de competição. Sintoma: patinação sob carga, ponto de acionamento mudando. Discos e molas são consumíveis de competição — muitos pilotos de nível competitivo trocam preventivamente antes de provas importantes, especialmente na versão 2T que exige mais uso da embreagem para manter o motor na faixa de potência.',
  },
]

const SX250_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 250 SX/SX-F por HORAS de uso — atenção: intervalos diferem entre 2T e 4T',
    body: 'Manutenção por horas de motor, não por km — 1 hora de motocross na 250 SX/SX-F equivale a aproximadamente 30-40 km rodados. A CADA TREINO/PROVA (ambas as versões) — limpar filtro de ar, verificar folga de corrente, nível de líquido de arrefecimento. VERSÃO 2T — a cada 8-10 horas: trocar vela, verificar óleo de câmbio; a cada 20-30 horas: reforma de pistão/anéis (padrão em uso competitivo intenso). VERSÃO 4T (SX-F) — a cada 8-10 horas (~250-350 km): trocar óleo do motor (1,2L SAE 10W-50); a cada 15-20 horas: verificar folga de válvulas; a cada 20-30 horas: trocar vela iridium. AMBAS — a cada 15-20 horas: corrente/pinhão/coroa, inspeção de suspensão dianteira/traseira e embreagem.',
  },
]

// ─── KTM 300 SX (2 tempos, categoria "Open" 2T) ───────────────────────────────
// Motor: ~293,2cc monocilíndrico 2 tempos refrigerado a líquido | ~55-58cv conforme preparação
// Câmbio: manual 6 velocidades | Mistura: ~60:1 conforme óleo (verificar embalagem)
// Pneu: 80/100-21 (F) / 110/90-19 (R) | Corrente: 520 | Injeção eletrônica (TBI) em modelos mais recentes

const SX300_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mistura 2T ~60:1 com óleo de alta performance — categoria "Open" exige óleo de qualidade máxima',
    body: 'A 300 SX é a maior 2 tempos da linha KTM motocross, entregando torque muito superior às SX 2T menores. Proporção de mistura recomendada gira próxima de 60:1 (confirme sempre na embalagem — modelos mais recentes com TBI/injeção eletrônica podem ter recomendação ligeiramente diferente, verifique o manual do ano específico). Óleos recomendados: Motul 800 2T Factory Line, Bel-Ray SI-7, Maxima Castor 927 — nunca economize no óleo desta moto, o motor de maior cilindrada 2T sofre mais com lubrificação inadequada.',
  },
  {
    severity: 'OK',
    title: 'Modelos com TBI (injeção eletrônica): mistura ainda necessária, mas dosagem de ar é eletrônica',
    body: 'A partir de determinados anos, a 300 SX passou a usar corpo de borboleta com injeção eletrônica (TBI - Throttle Body Injection) no lugar do carburador tradicional, mantendo a lubrificação por mistura de óleo na gasolina (a injeção dosa apenas o ar/combustível, não substitui a mistura 2T). Vantagem: partida a frio mais fácil e resposta mais consistente em diferentes altitudes/temperaturas. Mesmo assim, a rotina de mistura de combustível com óleo 2T continua obrigatória.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: crítico ainda mais nesta cilindrada — motor de maior torque puxa mais ar e poeira',
    body: 'O motor 293,2cc de maior cilindrada da linha 2T da KTM tem maior fluxo de ar admitido, o que também significa maior volume de poeira passando pelo filtro em uso intenso. Use óleo específico (Twin Air Filter Oil, Motul A1, Bel-Ray Foam Filter Oil) e limpe após cada sessão sem exceção — a folga maior do motor "Open" não o torna mais tolerante a poeira, pelo contrário.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR9EG ou similar — categoria de torque elevado exige atenção ao grau térmico correto',
    body: 'A vela recomendada para a 300 SX geralmente fica na faixa NGK BR8ES a BR9EG dependendo da regulagem/altitude — confirme no manual do ano. Como o motor entrega torque elevado desde baixas rotações, o grau térmico da vela precisa estar corretamente ajustado à altitude e clima de uso — vela com grau errado pode causar detonação (grau muito quente) ou acúmulo de carbono (grau muito frio).',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 reforçada — torque elevado desgasta relação mais rápido que 250cc',
    body: 'A 300 SX usa corrente 520, mas o torque elevado do motor desgasta corrente e relação mais rápido que a 250 SX 2T equivalente. Kits de relação DID ou RK premium (com O-ring/X-ring para maior durabilidade): R$ 400-650. Lubrifique após cada sessão de uso — corrente seca nesta moto de alto torque desgasta visivelmente mais rápido que em motos menores.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor: kits de pistão forjado disponíveis, mas confirme se sua moto é carburada ou TBI',
    body: 'Antes de comprar kits de reforma de motor (pistão Wossner/Pro-X/Wiseco, juntas, cilindro), confirme se sua 300 SX é a versão carburada (anos anteriores) ou com injeção eletrônica TBI (anos mais recentes) — os componentes de admissão são diferentes entre as duas versões, embora o motor 2T em si compartilhe muitas peças internas. Importadores especializados em motocross conseguem essas peças, mas peça sempre pelo ano/chassi exato.',
  },
]

const SX300_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Gripagem por mistura incorreta — motor de maior cilindrada 2T tem menor margem de erro',
    body: 'O motor 293,2cc da 300 SX, sendo a maior 2 tempos da linha, sofre danos mais caros quando a mistura de combustível está incorreta ou o filtro de ar está sujo. Sinais de alerta: perda súbita de potência, motor "travando" momentaneamente em alta rotação, ruído metálico agudo vindo do cilindro. Pare imediatamente — o custo de reparo (cilindro/pistão de 300cc) é consideravelmente maior que nas SX 2T menores.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste severo de pistão/anéis por uso competitivo — troca preventiva é a norma nesta categoria',
    body: 'Assim como as outras 2T da linha SX, o pistão e anéis da 300 SX são consumíveis de competição. Com o torque elevado desta cilindrada, muitos pilotos competitivos trocam pistão/anéis a cada 15-25 horas de uso intenso — intervalo até menor que a 125 SX, devido às cargas maiores no motor. Sintoma de desgaste: queda de compressão, fumaça de escape mais intensa, perda de potência progressiva.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de filtro de ar causando desgaste prematuro — mesmo padrão de toda a linha SX',
    body: 'A negligência na limpeza do filtro de ar entre sessões é a causa mais comum de desgaste prematuro de motor documentada em toda a linha de motocross KTM, e a 300 SX não é exceção. Com maior fluxo de ar admitido pelo motor de maior cilindrada, o efeito de um filtro sujo tende a ser ainda mais rápido.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de suspensão — cargas maiores desta moto aceleram o desgaste',
    body: 'A suspensão WP da 300 SX trabalha sob cargas maiores devido ao peso e torque superiores desta moto em relação às SX menores. Retentores de bengala dianteira e amortecedor traseiro tendem a apresentar vazamento um pouco mais cedo que em categorias menores, especialmente com pilotos mais pesados. Inspeção recomendada a cada 15-20 horas de uso competitivo.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: desgaste acelerado pelo torque elevado do motor 300cc',
    body: 'O torque elevado da 300 SX exige mais da embreagem multidisco, especialmente em uso competitivo com largadas e trocas de marcha agressivas. Sintoma: patinação sob carga em subidas ou acelerações fortes. Muitos pilotos usam kits de mola de embreagem reforçada (aftermarket) para lidar melhor com o torque elevado desta cilindrada.',
  },
]

const SX300_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 300 SX por HORAS de uso — categoria "Open" 2T exige intervalos mais curtos de reforma de motor',
    body: 'Manutenção por horas de motor, não por km — 1 hora de motocross na 300 SX equivale a aproximadamente 35-45 km rodados (torque elevado, velocidades maiores em pistas abertas). A CADA TREINO/PROVA — limpar filtro de ar, verificar folga de corrente, nível de líquido de arrefecimento. A cada 8-10 horas (~300-400 km) — trocar vela, verificar óleo de câmbio. A cada 15-20 horas (~550-800 km) — corrente/pinhão/coroa, inspeção de suspensão dianteira/traseira e embreagem. A cada 15-25 horas (~550-1.000 km) — reforma de pistão/anéis (intervalo mais curto que 125/250cc devido ao torque elevado) por mecânico especializado em motocross.',
  },
]

// ─── KTM 350 SX-F (4 tempos) ──────────────────────────────────────────────────
// NOTA: FIPE registra "SX 350 / 350 F" — a KTM não fabricou uma SX 350 2 tempos de fábrica;
// o conteúdo abaixo foca na SX-F 350 real (4 tempos), mantendo o modelName exato da FIPE.
// Motor: ~349,7cc DOHC 4 válvulas refrigerado a líquido | ~45-48cv | óleo ~1,2-1,3L SAE 10W-50
// Câmbio: manual 6 velocidades | Suspensão WP XACT USD ø48mm (curso ~310mm F / ~300mm R)
// Pneu: 80/100-21 (F) / 100/90-19 (R) | Corrente: 520 — meio-termo técnico entre 250F e 450F

const SX350_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Atenção: a FIPE junta "SX 350 / 350 F" mas a moto real vendida é a SX-F 350 (4 tempos)',
    body: 'A KTM nunca produziu de fábrica uma versão 2 tempos da SX 350 — a nomenclatura da FIPE que junta "SX 350 / 350 F" reflete apenas a forma como a base de dados agrupa o nome, mas na prática o modelo real no mercado é a 350 SX-F, motor 4 tempos DOHC. Todo o conteúdo de manutenção abaixo é específico para essa moto 4 tempos.',
  },
  {
    severity: 'OK',
    title: 'Óleo SAE 10W-50 sintético ~1,2-1,3L — troque a cada 8-10 horas de uso competitivo',
    body: 'A 350 SX-F usa óleo de motor sintético JASO MA2, capacidade aproximada 1,2-1,3L (verificar manual do ano específico, pode variar levemente com/sem troca de filtro). Óleos recomendados: Motul 300V 4T Factory Line 10W-50 (competição), Motul 7100 10W-50 (uso regular), Bel-Ray EXS 10W-50. Motor de alta rotação — troque a cada 8-10 horas de uso competitivo (~300-400 km) ou a cada 15 horas em uso mais recreativo.',
  },
  {
    severity: 'OK',
    title: 'Meio-termo entre 250F e 450F: peso menor da 250F com mais torque — cuide da carburação/injeção fina',
    body: 'A 350 SX-F é elogiada tecnicamente por combinar chassi leve (próximo da 250 SX-F) com torque considerável (próximo da 450 SX-F). Isso significa que pequenos ajustes de mapa de injeção eletrônica (via ferramenta de diagnóstico KTM ou app conforme o ano) fazem grande diferença na entrega de potência — vale a pena buscar orientação de mecânico especializado em motocross para ajustar o mapa ao estilo do piloto e ao tipo de pista.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar Twin Air/OEM: mesma criticidade de toda a linha SX',
    body: 'Use óleo específico (Twin Air Filter Oil, Motul A1, Bel-Ray Foam Filter Oil) e limpe após cada sessão de treino ou prova. O motor DOHC de alta rotação da 350 SX-F sofre tanto quanto qualquer outra SX com poeira entrando pelo filtro mal cuidado — não existe "imunidade" por ser 4 tempos.',
  },
  {
    severity: 'OK',
    title: 'Vela iridium NGK (rosca longa, tipo LKAR8AI-9 ou similar) — dura mais que velas 2T',
    body: 'A 350 SX-F usa vela iridium de rosca longa (confirme código exato para o ano no manual — geralmente na família NGK LKAR7A/LKAR8AI). Vantagem sobre as versões 2T da linha: a vela iridium dura mais, tipicamente 20-30 horas de uso competitivo antes de precisar troca, versus 8-15 horas nas velas convencionais dos modelos 2 tempos.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 + kit relação: mesma especificação das 250 SX/SX-F',
    body: 'A 350 SX-F usa corrente 520, compatível com kits DID ou RK disponíveis em lojas especializadas em motocross: R$ 350-600. Lubrifique após cada sessão de uso, sempre limpando a sujeira acumulada antes de aplicar lubrificante novo.',
  },
]

const SX350_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste de válvulas por uso competitivo intenso — folga deve ser verificada regularmente',
    body: 'Assim como a 250 SX-F e a 450 SX-F, o motor DOHC da 350 SX-F desgasta a folga de válvulas com o uso competitivo em alta rotação. Sintoma: motor barulhento (tique-taque metálico), perda de performance na faixa alta, dificuldade de partida a frio. Verificação de folga recomendada a cada 15-20 horas de uso competitivo — serviço de mecânico especializado com jogo de pastilhas (shims).',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de filtro de ar por poeira — causa raiz do desgaste prematuro de motor',
    body: 'Mesmo padrão documentado em toda a linha SX: pular a limpeza do filtro entre sessões acelera drasticamente o desgaste do cilindro e anéis do pistão. Sinais de alerta: perda de compressão, consumo de óleo aumentando entre trocas.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de suspensão WP XACT USD ø48mm — comum após temporada de competição',
    body: 'A bengala dianteira WP XACT (curso ~310mm) sofre desgaste de retentor com o uso intenso em saltos e terreno irregular. Sintoma: óleo visível no tubo interno, perda progressiva de amortecimento. Reforma completa (retentores + óleo) recomendada a cada temporada de competição — R$ 350-650 de serviço especializado.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: desgaste acelerado com uso competitivo agressivo',
    body: 'A embreagem multidisco sofre desgaste mais rápido com uso de largadas e trocas agressivas de marcha típicas de competição. Sintoma: patinação sob carga, ponto de acionamento mudando com frequência. Discos e molas são consumíveis de competição.',
  },
  {
    severity: 'WARN',
    title: 'Corrente esticando/desgastando rápido em uso competitivo intenso',
    body: 'A corrente 520 desgasta rapidamente com o torque da 350 SX-F em uso competitivo. Verifique a folga a cada 2-3 sessões de treino — folga excessiva traz risco real de a corrente saltar do pinhão em aterrissagens de saltos.',
  },
]

const SX350_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 350 SX-F por HORAS de uso — meio-termo entre os intervalos da 250F e da 450F',
    body: 'Manutenção por horas de motor, não por km — 1 hora de motocross na 350 SX-F equivale a aproximadamente 35-40 km rodados. A CADA TREINO/PROVA — limpar filtro de ar, verificar folga de corrente, nível de líquido de arrefecimento. A cada 8-10 horas (~300-400 km) — trocar óleo do motor (1,2-1,3L SAE 10W-50). A cada 15-20 horas (~600-800 km) — verificar folga de válvulas, trocar vela iridium, corrente/pinhão/coroa. A cada 20-30 horas (~800-1.200 km) — inspeção/reforma de suspensão dianteira e traseira, revisão de embreagem, revisão geral de motor por mecânico especializado em motocross antes de temporada de competição.',
  },
]

// ─── KTM 450 SX-F (4 tempos, categoria "Open"/premier class) ─────────────────
// NOTA: FIPE registra "SX 450/ SX 450F" — foco na SX-F 450 real, 4 tempos.
// Motor: ~449,3cc DOHC 4 válvulas refrigerado a líquido | ~55-63cv @ ~9.500 rpm | torque ~74 Nm
// Câmbio: manual 5-6 velocidades | Óleo ~1,3L SAE 10W-40/10W-50 conforme ano | Sprocket comum 14/52
// Pneu: 80/100-21 (F) / 110/90-19 (R) | Corrente: 520 — categoria "premier"/Open do motocross mundial

const SX450_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Atenção: a FIPE junta "SX 450/ SX 450F" mas a moto real é a SX-F 450 (4 tempos, categoria Open)',
    body: 'Assim como a 350, a nomenclatura FIPE "SX 450/ SX 450F" reflete apenas o agrupamento da base de dados — a moto vendida de fato é sempre a 450 SX-F, motor 4 tempos DOHC, maior cilindrada e potência da linha de motocross da KTM (categoria "Open"/premier class, usada nas competições de elite do motocross mundial).',
  },
  {
    severity: 'OK',
    title: 'Óleo SAE 10W-40 ou 10W-50 sintético ~1,3L — troque a cada 6-8 horas em uso competitivo de elite',
    body: 'A 450 SX-F, sendo a moto de maior potência e uso mais exigente da linha, pede troca de óleo mais frequente que a 250F/350F em uso competitivo intenso. Capacidade aproximada: 1,3L (confirme o ano específico — grau de viscosidade pode variar entre 10W-40 e 10W-50 conforme atualização de motor). Óleos recomendados: Motul 300V 4T Factory Line (competição), Motul 7100 10W-50, Bel-Ray EXS. Troque a cada 6-8 horas de uso competitivo (~250-350 km) ou 10-12 horas em uso recreativo mais leve.',
  },
  {
    severity: 'OK',
    title: 'Sprocket 14/52 (pinhão/coroa) padrão de fábrica — ajuste conforme tipo de pista',
    body: 'A relação padrão de fábrica é 14 dentes no pinhão e 52 na coroa, mas pilotos ajustam essa relação conforme o tipo de pista: coroas maiores (53-54T) para pistas técnicas com muitas curvas fechadas, menores (50-51T) para pistas rápidas e abertas. Corrente 520 compatível com kits DID ou RK — disponíveis em lojas especializadas em motocross no Brasil, R$ 350-650 o kit completo.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: motor de maior cilindrada admite mais ar — limpeza após CADA sessão é inegociável',
    body: 'O motor 449,3cc de maior cilindrada da linha SX tem o maior fluxo de ar admitido entre as motocross da KTM, o que também significa maior volume de poeira potencialmente entrando no motor. Use óleo específico (Twin Air Filter Oil, Motul A1, Bel-Ray Foam Filter Oil) e trate a limpeza do filtro como rotina obrigatória, não opcional — é a moto mais cara da linha para reformar o motor.',
  },
  {
    severity: 'OK',
    title: 'Vela iridium NGK rosca longa — troque a cada 15-25 horas conforme uso',
    body: 'Vela recomendada geralmente na família NGK LKAR7A/LKAR8AI (confirme código exato para o ano no manual). Como a 450 SX-F tem a maior demanda de potência da linha, muitos pilotos de competição optam por trocar a vela com mais frequência (a cada 15-20 horas) mesmo sendo iridium, para manter a resposta de ignição sempre no ponto ideal em provas importantes.',
  },
  {
    severity: 'OK',
    title: 'Peças amplamente disponíveis: categoria "Open" tem forte suporte de peças de reforma no Brasil',
    body: 'Por ser a categoria mais disputada e visada (premier class), a 450 SX-F tem excelente disponibilidade de peças de reforma via importadores especializados em motocross: kits de pistão forjado (Wossner, Pro-X, Vertex, CP), kits de válvulas, juntas completas, kits de embreagem reforçada. Preços de kit de pistão completo: R$ 500-1.000+ dependendo da marca.',
  },
]

const SX450_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor de maior potência da linha: erros de manutenção custam mais caro para reparar',
    body: 'A 450 SX-F é a moto mais potente e mais cara de reformar da linha SX. Erros que em uma 125cc ou 250cc custam algumas centenas de reais (filtro sujo, óleo vencido, folga de válvula fora de especificação) na 450 SX-F podem resultar em reparo de motor de R$ 3.000-6.000+ se ignorados. Leve a manutenção preventiva a sério — não é a moto para "economizar" em óleo ou filtro de ar.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste severo de válvulas por uso competitivo — verificação de folga é item crítico',
    body: 'O motor DOHC de alta performance da 450 SX-F desgasta folga de válvulas de forma mais perceptível que categorias menores, devido ao torque e à demanda de potência elevados. Sintoma: motor barulhento (tique-taque metálico), perda de performance na faixa alta de rotação. Verificação recomendada a cada 12-15 horas de uso competitivo — intervalo mais curto que a 250F/350F, dado o estresse maior do motor.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de filtro de ar causando desgaste prematuro — o problema mais caro de ignorar nesta moto',
    body: 'Assim como toda a linha SX, filtro de ar mal cuidado é a causa raiz mais comum de desgaste prematuro de motor. Na 450 SX-F, com o custo de reforma de motor mais alto da linha, negligenciar essa rotina simples é o erro mais caro que um piloto/mecânico pode cometer.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de suspensão dianteira e traseira — cargas máximas da linha SX',
    body: 'A suspensão WP da 450 SX-F trabalha sob as maiores cargas de toda a linha de motocross KTM devido ao peso e à potência superiores desta moto. Retentores de bengala dianteira e amortecedor traseiro tendem a apresentar vazamento mais cedo que nas categorias menores, especialmente com pilotos pesados ou uso agressivo em saltos grandes. Inspeção recomendada a cada 12-15 horas de uso competitivo.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: desgaste acelerado pelo torque máximo da linha SX',
    body: 'O torque de ~74 Nm da 450 SX-F exige o máximo da embreagem multidisco entre toda a linha de motocross, especialmente em uso competitivo com largadas e trocas de marcha agressivas. Sintoma: patinação sob carga em acelerações fortes. Muitos pilotos de elite usam kits de mola de embreagem reforçada (aftermarket) para lidar com o torque elevado desta cilindrada.',
  },
]

const SX450_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 450 SX-F por HORAS de uso — categoria Open exige os intervalos mais curtos da linha SX',
    body: 'Manutenção por horas de motor, não por km — 1 hora de motocross na 450 SX-F equivale a aproximadamente 35-45 km rodados (maior potência e velocidades da linha). A CADA TREINO/PROVA — limpar filtro de ar, verificar folga de corrente, nível de líquido de arrefecimento. A cada 6-8 horas (~250-350 km) — trocar óleo do motor. A cada 12-15 horas (~500-650 km) — verificar folga de válvulas, inspecionar embreagem. A cada 15-20 horas (~650-900 km) — trocar vela iridium, corrente/pinhão/coroa, inspeção de suspensão dianteira/traseira. A cada 20-25 horas (~900-1.100 km) — reforma completa de suspensão e revisão geral de motor por mecânico especializado em motocross antes de temporada de competição — intervalos mais curtos que 250F/350F devido ao maior estresse do motor.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'SX 50',
    yearFrom: null,
    yearTo: null,
    MACETES: SX50_MACETES,
    PROBLEMAS: SX50_PROBLEMAS,
    MANUTENCAO: SX50_MANUTENCAO,
  },
  {
    modelName: 'SX 65',
    yearFrom: null,
    yearTo: null,
    MACETES: SX65_MACETES,
    PROBLEMAS: SX65_PROBLEMAS,
    MANUTENCAO: SX65_MANUTENCAO,
  },
  {
    modelName: 'SX 85',
    yearFrom: null,
    yearTo: null,
    MACETES: SX85_MACETES,
    PROBLEMAS: SX85_PROBLEMAS,
    MANUTENCAO: SX85_MANUTENCAO,
  },
  {
    modelName: 'SX 125',
    yearFrom: null,
    yearTo: null,
    MACETES: SX125_MACETES,
    PROBLEMAS: SX125_PROBLEMAS,
    MANUTENCAO: SX125_MANUTENCAO,
  },
  {
    modelName: 'SX 250/ SX 250 F',
    yearFrom: null,
    yearTo: null,
    MACETES: SX250_MACETES,
    PROBLEMAS: SX250_PROBLEMAS,
    MANUTENCAO: SX250_MANUTENCAO,
  },
  {
    modelName: 'SX 300',
    yearFrom: null,
    yearTo: null,
    MACETES: SX300_MACETES,
    PROBLEMAS: SX300_PROBLEMAS,
    MANUTENCAO: SX300_MANUTENCAO,
  },
  {
    modelName: 'SX 350 / 350 F',
    yearFrom: null,
    yearTo: null,
    MACETES: SX350_MACETES,
    PROBLEMAS: SX350_PROBLEMAS,
    MANUTENCAO: SX350_MANUTENCAO,
  },
  {
    modelName: 'SX 450/ SX 450F',
    yearFrom: null,
    yearTo: null,
    MACETES: SX450_MACETES,
    PROBLEMAS: SX450_PROBLEMAS,
    MANUTENCAO: SX450_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────
// Motocross usa pressões MUITO baixas comparado a motos de rua — ajuste conforme terreno.

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'SX 50',
    yearFrom: null, yearTo: null,
    tireSize: '60/100-10 (F) · 2.75-10 (R) — varia conforme versão/aro',
    frontPsi: 6, rearPsi: 6,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Pressão de motocross infantil: 6 PSI dianteiro e traseiro é referência usual para pista firme. Terreno mais macio/arenoso: reduzir para 5 PSI. Pressão baixa aumenta a área de contato do pneu, mas aumenta o risco de "beliscar" a câmara em impactos fortes — não exagere para baixo.',
  },
  {
    modelName: 'SX 65',
    yearFrom: null, yearTo: null,
    tireSize: '60/100-14 (F) · 80/100-12 (R)',
    frontPsi: 8, rearPsi: 8,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Faixa usual de motocross júnior: 7-9 PSI. Pista dura/com pedras: aumentar para 9-10 PSI (reduz risco de furo/beliscada). Pista de areia/lama: reduzir para 6-7 PSI (mais tração).',
  },
  {
    modelName: 'SX 85',
    yearFrom: null, yearTo: null,
    tireSize: '70/100-17 ou 80/100-17 (F) · 90/100-14 (R) — conforme versão 17/14 ou 19/16',
    frontPsi: 10, rearPsi: 10,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Faixa usual: 9-12 PSI conforme terreno. Pista dura/pedregosa: 12-13 PSI. Pista macia/areia: 8-9 PSI. Pneus recomendados: Michelin Starcross, Pirelli Scorpion MX Mid Soft.',
  },
  {
    modelName: 'SX 125',
    yearFrom: null, yearTo: null,
    tireSize: '80/100-21 (F) · 100/90-19 (R)',
    frontPsi: 12, rearPsi: 12,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Ponto de partida clássico de motocross adulto: 12 PSI dianteiro e traseiro, ajustando 2 PSI para mais ou para menos conforme terreno (faixa geral 10-14 PSI). Pista dura/root/pedregosa: 13-16 PSI para evitar beliscada de câmara. Areia/lama: 10-11 PSI para mais tração. Pneus recomendados: Michelin Starcross 5/6, Pirelli Scorpion MX32/MX Extra X.',
  },
  {
    modelName: 'SX 250/ SX 250 F',
    yearFrom: null, yearTo: null,
    tireSize: '80/100-21 (F) · 100/90-19 (R)',
    frontPsi: 12, rearPsi: 13,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Ponto de partida: 12 PSI dianteiro, 13 PSI traseiro (faixa geral 10-14 PSI, ambas versões 2T e 4T). Terreno com raízes/pedras: subir para 14-16 PSI. Sand/lama: descer para 10-11 PSI. Pneus recomendados: Michelin Starcross 5/6, Pirelli Scorpion MX32.',
  },
  {
    modelName: 'SX 300',
    yearFrom: null, yearTo: null,
    tireSize: '80/100-21 (F) · 110/90-19 (R)',
    frontPsi: 12, rearPsi: 13,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Ponto de partida: 12 PSI dianteiro, 13 PSI traseiro. Torque elevado desta moto favorece pressão traseira levemente maior para evitar deformação excessiva sob aceleração forte. Terreno duro: 14-16 PSI. Pneus recomendados: Michelin Starcross 6, Pirelli Scorpion MX32.',
  },
  {
    modelName: 'SX 350 / 350 F',
    yearFrom: null, yearTo: null,
    tireSize: '80/100-21 (F) · 100/90-19 (R)',
    frontPsi: 12, rearPsi: 13,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Ponto de partida: 12 PSI dianteiro, 13 PSI traseiro (faixa geral 10-14 PSI). Mesmo padrão da 250F, ajustando conforme peso do piloto e terreno. Pneus recomendados: Michelin Starcross 6, Pirelli Scorpion MX32/MX Extra X.',
  },
  {
    modelName: 'SX 450/ SX 450F',
    yearFrom: null, yearTo: null,
    tireSize: '80/100-21 (F) · 110/90-19 (R)',
    frontPsi: 13, rearPsi: 13,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Ponto de partida: 13 PSI dianteiro e traseiro — moto de maior peso/potência da linha, pressão levemente mais alta ajuda a evitar beliscada de câmara sob impactos fortes. Terreno macio/areia: reduzir para 11 PSI. Pneus recomendados: Michelin Starcross 6, Pirelli Scorpion MX32, Dunlop Geomax MX33.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // SX 50
  { modelName: 'SX 50', yearFrom: null, yearTo: null, component: 'Mistura de combustível 2T (óleo sintético competição)', intervalKm: null, intervalMonths: null, notes: 'Preparar mistura fresca a cada treino — proporção conforme embalagem do óleo (faixa usual 50:1-60:1). Motul 800/600 2T, Bel-Ray SI-7.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SX 50', yearFrom: null, yearTo: null, component: 'Filtro de ar (espuma com óleo específico)', intervalKm: 15, intervalMonths: null, notes: 'Limpar e reoleá-lo após CADA sessão de treino (~15-25 km equivalentes). Óleo Motul A1 ou Bel-Ray Foam Filter Oil — nunca óleo de motor.', priority: 'CRITICAL', order: 2 },
  { modelName: 'SX 50', yearFrom: null, yearTo: null, component: 'Vela NGK BR9EG (ou conforme manual do ano)', intervalKm: 300, intervalMonths: null, notes: 'Troca a cada 10-15 horas de uso (~300-500 km equivalentes).', priority: 'MEDIUM', order: 3 },
  { modelName: 'SX 50', yearFrom: null, yearTo: null, component: 'Corrente 415/420 — lubrificação e folga', intervalKm: 25, intervalMonths: null, notes: 'Limpar e lubrificar após cada treino. Verificar folga a cada 2-3 sessões.', priority: 'HIGH', order: 4 },
  { modelName: 'SX 50', yearFrom: null, yearTo: null, component: 'Embreagem centrífuga — limpeza/inspeção', intervalKm: 400, intervalMonths: null, notes: 'Verificar sapatas a cada 15-20 horas; poeira contaminando causa patinação.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SX 50', yearFrom: null, yearTo: null, component: 'Suspensão WP dianteira/traseira — inspeção de retentores', intervalKm: 600, intervalMonths: null, notes: 'A cada 20-30 horas (~300-500 km equivalentes).', priority: 'MEDIUM', order: 6 },
  { modelName: 'SX 50', yearFrom: null, yearTo: null, component: 'Aperto geral de parafusos', intervalKm: 25, intervalMonths: null, notes: 'A cada treino — vibração do motor 2T solta parafusos facilmente em moto infantil.', priority: 'HIGH', order: 7 },
  { modelName: 'SX 50', yearFrom: null, yearTo: null, component: 'Revisão geral de motor (mecânico especializado motocross)', intervalKm: 500, intervalMonths: 12, notes: 'A cada 20-30 horas de uso (~300-500 km equivalentes) ou anualmente.', priority: 'HIGH', order: 8 },

  // SX 65
  { modelName: 'SX 65', yearFrom: null, yearTo: null, component: 'Mistura de combustível 2T ~60:1', intervalKm: null, intervalMonths: null, notes: 'Preparar fresca a cada treino. Motul 800/600 2T, Bel-Ray SI-7 — confirmar proporção na embalagem.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SX 65', yearFrom: null, yearTo: null, component: 'Filtro de ar (espuma com óleo específico)', intervalKm: 20, intervalMonths: null, notes: 'Limpar após cada sessão de treino (~20-30 km equivalentes).', priority: 'CRITICAL', order: 2 },
  { modelName: 'SX 65', yearFrom: null, yearTo: null, component: 'Óleo de câmbio/transmissão (separado do motor)', intervalKm: 300, intervalMonths: null, notes: 'A cada 15-20 horas (~300-450 km). SAE 10W-40 ou específico KTM conforme manual.', priority: 'HIGH', order: 3 },
  { modelName: 'SX 65', yearFrom: null, yearTo: null, component: 'Vela NGK BR8EG/BR9EG (conforme ano)', intervalKm: 300, intervalMonths: null, notes: 'Troca a cada 10-15 horas de uso.', priority: 'MEDIUM', order: 4 },
  { modelName: 'SX 65', yearFrom: null, yearTo: null, component: 'Corrente 420 — lubrificação e folga', intervalKm: 30, intervalMonths: null, notes: 'Lubrificar após cada treino; verificar folga a cada 2-3 sessões.', priority: 'HIGH', order: 5 },
  { modelName: 'SX 65', yearFrom: null, yearTo: null, component: 'Embreagem manual — inspeção de discos', intervalKm: 500, intervalMonths: null, notes: 'A cada 20-30 horas de uso competitivo.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SX 65', yearFrom: null, yearTo: null, component: 'Suspensão WP — inspeção de retentores', intervalKm: 450, intervalMonths: null, notes: 'A cada 20-25 horas de uso.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SX 65', yearFrom: null, yearTo: null, component: 'Kit relação (corrente/pinhão/coroa) — substituição', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-25 horas de uso competitivo intenso.', priority: 'HIGH', order: 8 },
  { modelName: 'SX 65', yearFrom: null, yearTo: null, component: 'Revisão de motor (pistão/anéis) — mecânico especializado', intervalKm: 800, intervalMonths: 12, notes: 'A cada 25-40 horas de uso ou anualmente.', priority: 'HIGH', order: 9 },

  // SX 85
  { modelName: 'SX 85', yearFrom: null, yearTo: null, component: 'Mistura de combustível 2T ~40:1', intervalKm: null, intervalMonths: null, notes: 'Confirmar proporção na embalagem — não reutilizar sobra de treinos anteriores. Motul 800 2T Factory Line para competição.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SX 85', yearFrom: null, yearTo: null, component: 'Filtro de ar (espuma dupla camada)', intervalKm: 25, intervalMonths: null, notes: 'Limpar após CADA sessão de treino/prova. Twin Air ou Motul A1.', priority: 'CRITICAL', order: 2 },
  { modelName: 'SX 85', yearFrom: null, yearTo: null, component: 'Vela NGK BR8ES/BR9EG (conforme jato/ano)', intervalKm: 350, intervalMonths: null, notes: 'Inspecionar cor do eletrodo regularmente; troca a cada 10-15 horas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SX 85', yearFrom: null, yearTo: null, component: 'Óleo de câmbio/transmissão', intervalKm: 350, intervalMonths: null, notes: 'A cada 10-15 horas de uso.', priority: 'HIGH', order: 4 },
  { modelName: 'SX 85', yearFrom: null, yearTo: null, component: 'Corrente 420 reforçada — lubrificação e folga', intervalKm: 30, intervalMonths: null, notes: 'Lubrificar após cada treino; kits DID/RK para reposição.', priority: 'HIGH', order: 5 },
  { modelName: 'SX 85', yearFrom: null, yearTo: null, component: 'Embreagem — inspeção de discos', intervalKm: 500, intervalMonths: null, notes: 'A cada 20-25 horas — desgaste acelerado por largadas competitivas.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SX 85', yearFrom: null, yearTo: null, component: 'Suspensão WP dianteira/traseira — inspeção e ajuste ao peso do piloto', intervalKm: 450, intervalMonths: null, notes: 'A cada 15-20 horas. Ajustar mola/óleo conforme peso real do piloto.', priority: 'HIGH', order: 7 },
  { modelName: 'SX 85', yearFrom: null, yearTo: null, component: 'Kit relação — substituição completa', intervalKm: 600, intervalMonths: null, notes: 'A cada 20-30 horas de uso competitivo.', priority: 'HIGH', order: 8 },
  { modelName: 'SX 85', yearFrom: null, yearTo: null, component: 'Reforma de motor (pistão/anéis) + suspensão', intervalKm: 900, intervalMonths: 12, notes: 'A cada 25-40 horas ou por temporada de competição.', priority: 'HIGH', order: 9 },

  // SX 125
  { modelName: 'SX 125', yearFrom: null, yearTo: null, component: 'Mistura de combustível 2T ~40:1 (competição)', intervalKm: null, intervalMonths: null, notes: 'Motul 800 2T Factory Line, Bel-Ray SI-7, Maxima Castor 927. Gasolina de alta octanagem.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SX 125', yearFrom: null, yearTo: null, component: 'Filtro de ar Twin Air/OEM', intervalKm: 30, intervalMonths: null, notes: 'Limpar após CADA sessão — ter filtro reserva já limpo para trocas rápidas em prova.', priority: 'CRITICAL', order: 2 },
  { modelName: 'SX 125', yearFrom: null, yearTo: null, component: 'Vela NGK BR8ES/BR9EG (leitura de vela)', intervalKm: 400, intervalMonths: null, notes: 'Troca a cada 10-15 horas; usar leitura de cor do eletrodo para checar carburação.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SX 125', yearFrom: null, yearTo: null, component: 'Óleo de câmbio/transmissão', intervalKm: 400, intervalMonths: null, notes: 'A cada 10-15 horas de uso.', priority: 'HIGH', order: 4 },
  { modelName: 'SX 125', yearFrom: null, yearTo: null, component: 'Limpeza da válvula de escape (power valve)', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas — remove acúmulo de carbono que reduz potência na faixa média.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SX 125', yearFrom: null, yearTo: null, component: 'Corrente 520 — lubrificação e folga', intervalKm: 40, intervalMonths: null, notes: 'Lubrificar após cada sessão. Kits DID/RK.', priority: 'HIGH', order: 6 },
  { modelName: 'SX 125', yearFrom: null, yearTo: null, component: 'Embreagem — inspeção/troca de discos', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas — desgaste por largadas de competição.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SX 125', yearFrom: null, yearTo: null, component: 'Suspensão dianteira/traseira WP — inspeção', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas de uso competitivo.', priority: 'HIGH', order: 8 },
  { modelName: 'SX 125', yearFrom: null, yearTo: null, component: 'Reforma de pistão/anéis (padrão competição)', intervalKm: 900, intervalMonths: 12, notes: 'A cada 20-30 horas de uso intenso — normal para 2T de competição, não é defeito.', priority: 'HIGH', order: 9 },

  // SX 250/ SX 250 F
  { modelName: 'SX 250/ SX 250 F', yearFrom: null, yearTo: null, component: 'Combustível: mistura 2T (~40:1) OU óleo motor 4T (~1,2L 10W-50) conforme versão', intervalKm: null, intervalMonths: null, notes: 'CONFIRME a versão da sua moto (2T ou 4T/SX-F) antes de qualquer manutenção — procedimentos são diferentes.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SX 250/ SX 250 F', yearFrom: null, yearTo: null, component: 'Filtro de ar Twin Air/OEM', intervalKm: 35, intervalMonths: null, notes: 'Limpar após CADA sessão — ambas as versões (2T e 4T).', priority: 'CRITICAL', order: 2 },
  { modelName: 'SX 250/ SX 250 F', yearFrom: null, yearTo: null, component: 'Troca de óleo do motor (SX-F 4T) — 1,2L SAE 10W-50', intervalKm: 300, intervalMonths: null, notes: 'Apenas versão SX-F 4T. A cada 8-10 horas de uso competitivo (~250-350 km).', priority: 'HIGH', order: 3 },
  { modelName: 'SX 250/ SX 250 F', yearFrom: null, yearTo: null, component: 'Vela: NGK BR8ES/BR9EG (2T) ou iridium LKAR8AI-9 (4T)', intervalKm: 400, intervalMonths: null, notes: 'Verificar código exato conforme versão e ano no manual.', priority: 'MEDIUM', order: 4 },
  { modelName: 'SX 250/ SX 250 F', yearFrom: null, yearTo: null, component: 'Folga de válvulas (apenas SX-F 4T)', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas de uso competitivo — requer jogo de pastilhas (shims).', priority: 'HIGH', order: 5 },
  { modelName: 'SX 250/ SX 250 F', yearFrom: null, yearTo: null, component: 'Corrente 520 — lubrificação e folga', intervalKm: 40, intervalMonths: null, notes: 'Lubrificar após cada sessão de uso — ambas as versões.', priority: 'HIGH', order: 6 },
  { modelName: 'SX 250/ SX 250 F', yearFrom: null, yearTo: null, component: 'Embreagem — inspeção/troca', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas — desgaste por uso competitivo.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SX 250/ SX 250 F', yearFrom: null, yearTo: null, component: 'Suspensão dianteira/traseira WP — inspeção', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas de uso competitivo — ambas as versões.', priority: 'HIGH', order: 8 },
  { modelName: 'SX 250/ SX 250 F', yearFrom: null, yearTo: null, component: 'Reforma de pistão/anéis (2T) — padrão competição', intervalKm: 1000, intervalMonths: 12, notes: 'Apenas versão 2T. A cada 20-30 horas de uso intenso.', priority: 'HIGH', order: 9 },

  // SX 300
  { modelName: 'SX 300', yearFrom: null, yearTo: null, component: 'Mistura de combustível 2T ~60:1 (alta performance)', intervalKm: null, intervalMonths: null, notes: 'Motul 800 2T Factory Line, Bel-Ray SI-7 — confirmar proporção na embalagem. Versões TBI mantêm mistura.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SX 300', yearFrom: null, yearTo: null, component: 'Filtro de ar Twin Air/OEM', intervalKm: 40, intervalMonths: null, notes: 'Motor de maior cilindrada admite mais ar — limpeza após CADA sessão é essencial.', priority: 'CRITICAL', order: 2 },
  { modelName: 'SX 300', yearFrom: null, yearTo: null, component: 'Vela NGK BR8ES/BR9EG (grau térmico conforme altitude)', intervalKm: 400, intervalMonths: null, notes: 'Troca a cada 8-10 horas de uso competitivo.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SX 300', yearFrom: null, yearTo: null, component: 'Óleo de câmbio/transmissão', intervalKm: 400, intervalMonths: null, notes: 'A cada 8-10 horas de uso.', priority: 'HIGH', order: 4 },
  { modelName: 'SX 300', yearFrom: null, yearTo: null, component: 'Corrente 520 reforçada — lubrificação e folga', intervalKm: 40, intervalMonths: null, notes: 'Torque elevado desgasta corrente mais rápido — lubrificar após cada sessão.', priority: 'HIGH', order: 5 },
  { modelName: 'SX 300', yearFrom: null, yearTo: null, component: 'Embreagem — inspeção/troca (kit de mola reforçada opcional)', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas — torque elevado exige mais da embreagem.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SX 300', yearFrom: null, yearTo: null, component: 'Suspensão dianteira/traseira WP — inspeção', intervalKm: 550, intervalMonths: null, notes: 'A cada 15-20 horas — cargas maiores que categorias menores.', priority: 'HIGH', order: 7 },
  { modelName: 'SX 300', yearFrom: null, yearTo: null, component: 'Kit relação — substituição completa', intervalKm: 650, intervalMonths: null, notes: 'A cada 15-20 horas de uso competitivo.', priority: 'HIGH', order: 8 },
  { modelName: 'SX 300', yearFrom: null, yearTo: null, component: 'Reforma de pistão/anéis — intervalo mais curto que 125/250cc', intervalKm: 850, intervalMonths: 12, notes: 'A cada 15-25 horas devido ao torque elevado do motor 293,2cc.', priority: 'HIGH', order: 9 },

  // SX 350 / 350 F
  { modelName: 'SX 350 / 350 F', yearFrom: null, yearTo: null, component: 'Óleo do motor SAE 10W-50 (~1,2-1,3L)', intervalKm: 350, intervalMonths: null, notes: 'A cada 8-10 horas de uso competitivo (~300-400 km). Motul 300V 4T Factory Line, Bel-Ray EXS.', priority: 'HIGH', order: 1 },
  { modelName: 'SX 350 / 350 F', yearFrom: null, yearTo: null, component: 'Filtro de ar Twin Air/OEM', intervalKm: 35, intervalMonths: null, notes: 'Limpar após CADA sessão de treino/prova.', priority: 'CRITICAL', order: 2 },
  { modelName: 'SX 350 / 350 F', yearFrom: null, yearTo: null, component: 'Vela iridium NGK (rosca longa, tipo LKAR8AI-9)', intervalKm: 700, intervalMonths: null, notes: 'A cada 20-30 horas de uso — dura mais que velas 2T convencionais.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SX 350 / 350 F', yearFrom: null, yearTo: null, component: 'Folga de válvulas', intervalKm: 700, intervalMonths: null, notes: 'A cada 15-20 horas — requer jogo de pastilhas (shims) e mecânico especializado.', priority: 'HIGH', order: 4 },
  { modelName: 'SX 350 / 350 F', yearFrom: null, yearTo: null, component: 'Corrente 520 — lubrificação e folga', intervalKm: 40, intervalMonths: null, notes: 'Lubrificar após cada sessão de uso.', priority: 'HIGH', order: 5 },
  { modelName: 'SX 350 / 350 F', yearFrom: null, yearTo: null, component: 'Embreagem — inspeção/troca de discos', intervalKm: 700, intervalMonths: null, notes: 'A cada 15-20 horas de uso competitivo.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SX 350 / 350 F', yearFrom: null, yearTo: null, component: 'Suspensão WP XACT USD ø48mm — inspeção', intervalKm: 750, intervalMonths: null, notes: 'A cada 20-30 horas de uso.', priority: 'HIGH', order: 7 },
  { modelName: 'SX 350 / 350 F', yearFrom: null, yearTo: null, component: 'Kit relação (corrente/pinhão/coroa)', intervalKm: 800, intervalMonths: null, notes: 'A cada 20-25 horas de uso competitivo.', priority: 'HIGH', order: 8 },
  { modelName: 'SX 350 / 350 F', yearFrom: null, yearTo: null, component: 'Revisão geral de motor por mecânico especializado', intervalKm: 1100, intervalMonths: 12, notes: 'A cada 20-30 horas ou anualmente, antes de temporada de competição.', priority: 'HIGH', order: 9 },

  // SX 450/ SX 450F
  { modelName: 'SX 450/ SX 450F', yearFrom: null, yearTo: null, component: 'Óleo do motor SAE 10W-40/10W-50 (~1,3L)', intervalKm: 300, intervalMonths: null, notes: 'A cada 6-8 horas de uso competitivo (~250-350 km). Motul 300V 4T Factory Line, Bel-Ray EXS.', priority: 'HIGH', order: 1 },
  { modelName: 'SX 450/ SX 450F', yearFrom: null, yearTo: null, component: 'Filtro de ar Twin Air/OEM', intervalKm: 35, intervalMonths: null, notes: 'Limpar após CADA sessão — maior fluxo de ar admitido da linha SX.', priority: 'CRITICAL', order: 2 },
  { modelName: 'SX 450/ SX 450F', yearFrom: null, yearTo: null, component: 'Vela iridium NGK (rosca longa)', intervalKm: 650, intervalMonths: null, notes: 'A cada 15-25 horas — muitos pilotos de elite trocam mais cedo por segurança em provas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SX 450/ SX 450F', yearFrom: null, yearTo: null, component: 'Folga de válvulas', intervalKm: 550, intervalMonths: null, notes: 'A cada 12-15 horas — intervalo mais curto que 250F/350F devido ao maior estresse do motor.', priority: 'HIGH', order: 4 },
  { modelName: 'SX 450/ SX 450F', yearFrom: null, yearTo: null, component: 'Sprocket/corrente 520 (pinhão 14T / coroa 52T padrão)', intervalKm: 40, intervalMonths: null, notes: 'Lubrificar após cada sessão; ajustar relação conforme tipo de pista.', priority: 'HIGH', order: 5 },
  { modelName: 'SX 450/ SX 450F', yearFrom: null, yearTo: null, component: 'Embreagem — inspeção/troca (kit reforçado opcional)', intervalKm: 600, intervalMonths: null, notes: 'A cada 12-15 horas — maior torque da linha exige mais da embreagem.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SX 450/ SX 450F', yearFrom: null, yearTo: null, component: 'Suspensão dianteira/traseira WP — inspeção', intervalKm: 650, intervalMonths: null, notes: 'A cada 12-15 horas — maiores cargas de toda a linha SX.', priority: 'HIGH', order: 7 },
  { modelName: 'SX 450/ SX 450F', yearFrom: null, yearTo: null, component: 'Kit relação — substituição completa', intervalKm: 750, intervalMonths: null, notes: 'A cada 15-20 horas de uso competitivo.', priority: 'HIGH', order: 8 },
  { modelName: 'SX 450/ SX 450F', yearFrom: null, yearTo: null, component: 'Revisão geral de motor por mecânico especializado', intervalKm: 950, intervalMonths: 12, notes: 'A cada 20-25 horas — intervalos mais curtos da linha SX devido ao maior estresse do motor.', priority: 'HIGH', order: 9 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed KTM SX Motocross (50/65/85/125/250/300/350F/450F)...')

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

  console.log('✅ KTM SX Motocross concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
