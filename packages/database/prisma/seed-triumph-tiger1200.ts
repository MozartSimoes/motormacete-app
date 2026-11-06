// seed-triumph-tiger1200.ts — Triumph Tiger 1200: DUAS gerações mecanicamente diferentes
// Geração legado (2012-2021): motor 1215cc tricilíndrico, ~135-139 cv, tração por CARDÃ (eixo).
// Geração atual (2022+): motor novo 1160cc tricilíndrico T-plane crank, ~150 cv, ~25kg mais leve,
// tração TAMBÉM por CARDÃ (Tri-Link swingarm com eixo integrado — Triumph manteve cardã, NÃO é corrente).
// A Tiger 1200 é o topo de linha adventure da Triumph, e a marca expandiu fortemente no Brasil
// nos últimos anos (rede de concessionárias crescendo, Tiger 1200 chegou por R$ 88.990-122.990 em 2024).
// Execute: pnpm --filter @motormacete/database db:seed:triumph-tiger1200
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

// ─── GERAÇÃO LEGADO (2012-2021) ───────────────────────────────────────────────
// Motor: 1215cc DOHC tricilíndrico em linha, refrigerado a líquido | 135-139 cv @ 9.300 rpm
// Torque: 121 Nm (12,3 kgf.m) @ 6.400 rpm | Óleo 10W-40/10W-50 semissintético, 4,0L
// Vela: NGK DPR8EA-9 (troca ~16.000 km) | Tração final: CARDÃ (eixo) — sem corrente
// Óleo do cardã/bevel box: 75W-90 GL5 sintético | Pneu: 110/80-19 (F) / 150/70-17 (R)
// Peso em ordem de marcha: 259-267 kg | Tanque: 20L | Revisão de óleo: 16.000 km
// Revisão maior (folga de válvulas): 32.000 km

const LEGADO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40/10W-50 semissintético — 4,0L, troca a cada 16.000 km',
    body: 'O motor 1215cc tricilíndrico da Tiger Explorer/Tiger 1200 (2012-2021) usa óleo semissintético 10W-40 ou 10W-50 (API SL/SM), com aditivo de fricção compatível com a embreagem multidisco em banho de óleo. Capacidade: 4,0 litros na troca com filtro. Intervalo oficial: 16.000 km ou 12 meses. Marcas equivalentes: Motul 5100 10W-40, Castrol Power 1 10W-40, Mobil Super Moto 4T 10W-50. Em uso intenso (viagens longas carregado, calor extremo), reduza para 10.000-12.000 km.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DPR8EA-9 — troca a cada 16.000 km',
    body: 'A Tiger 1200 legado usa vela NGK DPR8EA-9 (código Triumph T1290024), com resistor e gap de fábrica em torno de 0,8-0,9mm — não force a abertura, use calibrador de folga. Custo aproximado: R$ 40-70 cada, três unidades por revisão completa (uma por cilindro). Sintoma de vela gasta: falha em baixa rotação, engasgo na retomada, consumo de combustível subindo. Iridium equivalente (quando disponível) dura mais, mas confirme a referência exata com o catálogo Triumph antes de comprar — motores tricilíndricos daquela geração tiveram variações de especificação entre anos.',
  },
  {
    severity: 'WARN',
    title: 'Tração por CARDÃ (eixo) — NÃO é corrente; esqueça graxa de corrente',
    body: 'Diferente de muitas adventures da categoria, a Tiger 1200 (em todas as versões, XR, XC, XCA, XCX, Explorer) usa transmissão final por cardã (shaft drive), não corrente. Isso significa: sem lubrificação de corrente, sem ajuste de folga de corrente, sem kit relação para trocar. Em compensação, o cardã tem óleo próprio (bevel box na roda traseira) que precisa ser verificado e trocado — é um erro comum de proprietários vindos de motos com corrente esquecerem que o cardã também exige manutenção, só que mais espaçada.',
  },
  {
    severity: 'WARN',
    title: 'Óleo do bevel box (cardã): 75W-90 GL5 sintético — verifique a cada revisão',
    body: 'O bevel box (caixa de engrenagens cônicas na roda traseira, parte do sistema de cardã) usa óleo hipoide 75W-90 API GL5 sintético — não é o mesmo óleo do motor. Capacidade pequena (poucas centenas de mL). Verifique vazamentos no retentor a cada revisão e troque o óleo pelo menos a cada 32.000 km ou 2 anos. Parafuso de dreno: torque de 25 Nm com arruela de vedação nova. Negligenciar esse item é a causa mais comum de falha prematura do bevel box nesta geração.',
  },
  {
    severity: 'OK',
    title: 'Pneus 110/80-19 (F) / 150/70-17 (R) — mesma medida em todas as versões legado',
    body: 'Explorer, Explorer XC, XCA, XCX, XR e XR facelift (2018-2021) compartilham a mesma medida de pneu: dianteiro 110/80-19, traseiro 150/70-17. A diferença entre as versões está na roda (cast/fundida na XR, raiada tubeless na XC/XCA/XCX para uso off-road) — mas o pneu instalado costuma ser o mesmo. Recomendados: Metzeler Tourance, Pirelli Scorpion Trail II ou Bridgestone Battlewing, todos disponíveis nessas medidas no Brasil via importadores de pneus premium.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 20L — autonomia real gira em torno de 300-350 km',
    body: 'Com consumo médio de 16-18 km/L em uso misto (a Tiger 1200 legado não é econômica, motor grande e peso de 259-267 kg em ordem de marcha), a autonomia prática do tanque de 20 litros fica entre 300 e 350 km antes da reserva. Em viagem de estrada com carga (bagageiros + garupa), o consumo piora e a autonomia cai para perto de 280 km. Planeje paradas de combustível considerando isso, especialmente em trechos com postos espaçados.',
  },
  {
    severity: 'WARN',
    title: 'Peso elevado (259-267 kg): cuidado ao manobrar em baixa velocidade e no cavalete',
    body: 'A Tiger 1200 legado é pesada para os padrões da categoria (259 kg na Explorer padrão, até 267 kg na versão XC com rodas raiadas). Em manobras de baixa velocidade, garagem ou terreno irregular, o peso concentrado alto (motor grande, tanque cheio) exige atenção redobrada — quedas em baixa velocidade são comuns entre proprietários não habituados ao porte da moto. Pratique manobras em piso plano antes de encarar trilhas ou estacionamentos apertados.',
  },
]

const LEGADO_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Bevel box (cardã traseiro): ponto fraco conhecido — falha cara acima de 80.000 km',
    body: 'O bevel box (caixa de engrenagens do cardã, na roda traseira) é documentado como ponto fraco da geração 2012-2021 em fóruns internacionais (Triumph Rat, Tiger-Explorer.com). Sintomas de falha iminente: ronco/rangido na tração ao acelerar e desacelerar, vazamento de óleo pelo retentor. Vida útil típica: em torno de 80.000 km (50.000 milhas) antes de precisar de reparo ou substituição — serviço caro, muitas vezes exigindo troca do conjunto completo. Prevenção: trocar o óleo do bevel box regularmente e não ignorar ruídos anormais na tração.',
  },
  {
    severity: 'WARN',
    title: 'Retificador/regulador: falhas elétricas reportadas — pode superaquecer bateria',
    body: 'Proprietários relatam falhas no retificador/regulador de tensão (componente que converte AC para DC e carrega a bateria) em unidades da geração legado. Sintoma: bateria não carrega corretamente, sobrecarga que pode danificar a própria bateria. Verifique periodicamente a tensão da bateria com o motor em marcha (multímetro, 4.000 rpm): deve ficar entre 13,5-14,5V. Fora dessa faixa, suspeite do retificador antes de trocar a bateria.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de combustível pela mangueira entre tanque e chassi (lote de fábrica)',
    body: 'Um lote de unidades apresentou vazamento de combustível pela mangueira de borracha entre o tanque e o chassi — problema de fábrica em algumas unidades, sem recall formal emitido pela Triumph, mas resolvido em concessionária mediante troca do tanque/mangueira sob garantia. Se sentir cheiro de combustível ou notar manchas na região do tanque, leve para inspeção imediatamente — é questão de segurança (risco de incêndio), não apenas estética.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo na parte inferior do motor — investigar retentores e juntas',
    body: 'Vazamentos de óleo na região inferior do motor são reportados com alguma frequência nesta geração. Antes de assumir que é o motor "suando" normalmente, verifique: junta do cárter, retentor do eixo de saída de força, e mangueiras do radiador de óleo (se equipado). Vazamento persistente que baixa o nível do óleo entre trocas é sinal de que precisa de reparo — não é normal em moto com essa quilometragem se for recente.',
  },
  {
    severity: 'WARN',
    title: 'Ruído de "tique-tique" no motor em marcha lenta (lote de cabeçotes)',
    body: 'Alguns lotes iniciais da Tiger Explorer 1200 (2012-2013) apresentaram ruído de tique-tique no motor em marcha lenta, atribuído a um lote específico de cabeçotes na produção. Se a moto tem esse ruído desde a compra e o óleo está sempre em dia, provavelmente é esse problema documentado — não é necessariamente grave, mas vale registrar com a concessionária Triumph para verificar se a unidade está dentro do lote afetado e se há orientação de garantia disponível.',
  },
  {
    severity: 'WARN',
    title: 'Funcionamento irregular / falha ao dar partida — checar chicote e conectores',
    body: 'Relatos de funcionamento irregular (rough running), engasgos e até falha total de partida aparecem na comunidade internacional de proprietários da geração 2012-2021. Antes de suspeitar de problema grave no motor ou na injeção, verifique: conectores do chicote elétrico (oxidação, mau contato), fusíveis, e a bateria (tensão em repouso mínima 12,4V). Boa parte dos casos reportados foi resolvida com limpeza de conectores e substituição de bateria fraca.',
  },
]

const LEGADO_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tiger 1200 legado (1215cc, 2012-2021): revisão a cada 16.000 km',
    body: '1.000 km — Revisão inicial de amaciamento (verificação geral, torques). | 16.000 km — Troca de óleo (10W-40/10W-50, 4,0L) e filtro. Verificar óleo do bevel box (cardã). Inspecionar pastilhas de freio. | 32.000 km — Revisão maior: troca de velas (NGK DPR8EA-9 ×3), folga de válvulas (checar/ajustar, motor frio), troca do óleo do bevel box (75W-90 GL5), fluido de freio DOT 4 (frente e trás), filtro de ar. | 48.000 km — Repetir ciclo de 16.000 km. Verificar tensão do retificador (13,5-14,5V @ 4.000 rpm). | 64.000 km — Revisão maior novamente. Inspecionar retentores do bevel box com atenção redobrada (ponto fraco conhecido acima de 80.000 km). | Anual — Verificar mangueira de combustível tanque-chassi (lote com histórico de vazamento) e bateria.',
  },
]

// ─── GERAÇÃO ATUAL (2022+) — GT / RALLY ───────────────────────────────────────
// Motor: 1160cc tricilíndrico totalmente novo, T-plane crank (ordem de explosão irregular) |
// ~150 cv @ 9.000 rpm | Torque: 13,2 kgf.m / 129 Nm @ 7.000 rpm | ~25 kg mais leve que o legado
// Óleo: 10W-40/10W-50, 3,65L sem filtro / 3,85L com filtro | Vela: NGK LMAR9E-J gap 0,6-0,7mm
// Tração final: CARDÃ (Tri-Link swingarm com eixo integrado, mais leve que o modelo anterior)
// GT: rodas fundidas tubeless 19"(F)/18"(R) — uso estrada | Rally: rodas raiadas tubeless 21"(F)/18"(R) — uso off-road
// Peso: ~249 kg (GT Pro/Rally Pro) | Tanque: ~20L | Revisão de óleo: 16.000 km | Revisão maior: 32.000 km

const NOVA_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor novo 1160cc T-plane crank: ordem de explosão irregular dá sonoridade de V-twin',
    body: 'A geração 2022+ da Tiger 1200 estreou um motor tricilíndrico totalmente novo (1160cc, não é evolução do 1215cc anterior), com virabrequim T-plane — ordem de explosão irregular que imita a entrega de torque e a sonoridade de um V-twin, mas com a suavidade em alta rotação de um tricilíndrico. Resultado: ~150 cv @ 9.000 rpm e 13,2 kgf.m @ 7.000 rpm, com ~25 kg a menos que a geração anterior. É um motor essencialmente novo — peças e óleo do motor legado (1215cc) NÃO são intercambiáveis.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40/10W-50 — 3,65L sem filtro / 3,85L com filtro; troca a cada 16.000 km',
    body: 'Capacidade menor que o motor legado por ser um projeto mais compacto e leve: 3,65 litros na troca simples, 3,85L quando o filtro também é substituído. Use semissintético ou sintético 10W-40/10W-50 de qualidade (Motul 7100, Castrol Power RS). Intervalo oficial: 16.000 km ou 12 meses. Motor ainda recente no mercado (lançado 2022) — siga à risca o intervalo do manual, sem "esticar" a troca como às vezes se faz em motores mais antigos e testados.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR9E-J — gap 0,6-0,7mm, troca a cada 16.000-32.000 km',
    body: 'Vela iridium laser NGK LMAR9E-J, usada também em outros tricilíndricos modernos da Triumph. Gap de fábrica: 0,6-0,7mm — não force, use calibrador de folga tipo lâmina. Por ser iridium, tende a durar mais que a vela convencional do motor legado — verifique no manual se a recomendação é troca a cada 16.000 km (junto da troca de óleo) ou postergada para a revisão de 32.000 km, pois há variação entre versões e anos.',
  },
  {
    severity: 'OK',
    title: 'Ainda é cardã (shaft drive) — Triumph manteve o eixo, apesar do boato de corrente',
    body: 'Mesmo com o motor totalmente novo e o peso reduzido, a Triumph manteve a tração final por cardã na geração 2022+, agora com um swingarm "Tri-Link" mais leve (cerca de 1,5kg mais leve que o sistema single-sided anterior) e um bevel box menor e mais leve. Ou seja: continua sem corrente, sem graxa de corrente, sem kit relação — mas o óleo do cardã (bevel box) ainda precisa de atenção, com troca recomendada a cada 2 anos pela Triumph.',
  },
  {
    severity: 'WARN',
    title: 'GT (rodas fundidas 19"/18") vs Rally (rodas raiadas 21"/18"): pneus e uso são diferentes',
    body: 'A linha GT (GT Pro, GT Explorer) usa rodas fundidas tubeless de 19" dianteira e 18" traseira, com pneu 120/70-19 (F) / 150/70-18 (R) — perfil mais rodoviário. A linha Rally (Rally Pro, Rally Explorer, Rally Black Edition) usa rodas raiadas tubeless de 21" dianteira e 18" traseira, pneu 90/90-21 (F) / 150/70-18 (R) — perfil off-road, roda dianteira maior para vencer obstáculos. Não troque pneu de uma versão pela medida da outra sem considerar que a geometria e o comportamento em curva mudam bastante entre 19" e 21" na dianteira.',
  },
  {
    severity: 'OK',
    title: 'Redução Ativa de Pré-carga: ajuda a alcançar o chão, mas não é suspensão automática completa',
    body: 'As versões 2024+ da Tiger 1200 no Brasil trazem Redução Ativa de Pré-carga, que abaixa a altura do assento em até 20mm automaticamente quando a moto reduz a velocidade (parando no sinal, por exemplo), facilitando apoiar os pés no chão — recurso importante numa moto de ~249 kg com assento alto. Não confundir com suspensão semi-ativa eletrônica (que também existe na moto, ajustando amortecimento): são sistemas complementares, mas com funções diferentes.',
  },
  {
    severity: 'OK',
    title: 'Triumph forte no Brasil: rede de concessionárias e importação oficial facilitam manutenção',
    body: 'A Tiger 1200 é o topo de linha da família adventure da Triumph, e a marca expandiu significativamente sua presença no Brasil nos últimos anos, com mais concessionárias oficiais e peças de importação direta. A versão 2024 chegou ao mercado nacional entre R$ 88.990 (Black Edition) e R$ 122.990 (Rally Explorer), com garantia de fábrica e rede autorizada — diferente da situação de marcas descontinuadas no Brasil, encontrar peças originais e suporte técnico para a Tiger 1200 atual é bem mais simples.',
  },
]

const NOVA_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cilindro auxiliar da embreagem: vazamento reportado em unidades de produção inicial',
    body: 'Proprietários de unidades 2022 (início de produção) relataram problema de embreagem que não desengatava totalmente já com poucos quilômetros rodados — rastreado a vazamento no cilindro auxiliar (slave cylinder) da embreagem hidráulica. Triumph tratou o problema em garantia nas unidades afetadas, substituindo o cilindro. Se a moto é de lote inicial (2022) e a embreagem parece "arrastar" ou não desengatar limpo, verifique com a concessionária se a peça já foi substituída ou se há campanha de atualização pendente.',
  },
  {
    severity: 'WARN',
    title: 'Recall de pneu (fabricante do pneu, não da moto): Metzeler/Pirelli Tourance Next',
    body: 'Houve um recall de segurança de pneus Metzeler/Pirelli Tourance Next equipados de fábrica em algumas Tiger 1200 — recall do FABRICANTE DO PNEU, não um defeito de projeto da moto. Se a sua unidade tem esse pneu original, verifique o número de lote junto à Pirelli/Metzeler ou à concessionária Triumph para saber se está na faixa afetada e trocar sem custo, se aplicável.',
  },
  {
    severity: 'WARN',
    title: 'Histórico ainda curto (lançada em 2022): poucos problemas crônicos documentados até agora',
    body: 'Por ser um motor e chassi totalmente novos desde 2022, a Tiger 1200 atual (1160cc) ainda tem histórico de longo prazo limitado comparado à geração legado de quase 10 anos de estrada. Os registros oficiais (NHTSA e similares) mostram poucas reclamações formais até o momento. Isso não significa ausência de problemas futuros — apenas que ainda não há um "ponto fraco crônico" tão documentado quanto o bevel box da geração anterior. Continue acompanhando fóruns (TriumphRat, ADVrider) à medida que as unidades acumulam quilometragem.',
  },
  {
    severity: 'WARN',
    title: 'Peso elevado ainda impõe cuidado, mesmo com a redução de ~25 kg',
    body: 'Apesar de ~25 kg mais leve que a geração 2012-2021, a Tiger 1200 atual ainda pesa cerca de 249 kg em ordem de marcha (Rally Pro/GT Pro) — segue sendo uma moto grande e pesada para manobras de baixa velocidade e uso off-road mais técnico, especialmente nas versões Rally com roda dianteira de 21". Quedas em manobra e em terreno irregular continuam sendo o incidente mais comum entre novos proprietários vindos de motos mais leves.',
  },
  {
    severity: 'WARN',
    title: 'Eletrônica embarcada extensa: bateria fraca afeta múltiplos sistemas',
    body: 'A Tiger 1200 atual tem suspensão semi-ativa, painel TFT, múltiplos modos de pilotagem e Redução Ativa de Pré-carga — sistemas que dependem de tensão elétrica estável. Bateria fraca ou em queda pode gerar comportamento errático em vários desses sistemas simultaneamente (não só dificuldade de partida). Mantenha a bateria sempre carregada e substitua preventivamente antes que a tensão em repouso caia abaixo de 12,4V, especialmente se a moto ficar parada por longos períodos.',
  },
]

const NOVA_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tiger 1200 atual (1160cc, 2022+): revisão a cada 16.000 km',
    body: '1.000 km — Revisão inicial de amaciamento. | 16.000 km — Troca de óleo (10W-40/10W-50, 3,65L s/filtro ou 3,85L c/filtro). Verificar vela NGK LMAR9E-J (gap 0,6-0,7mm). Inspecionar pastilhas de freio e pneus (GT: 120/70-19+150/70-18; Rally: 90/90-21+150/70-18). | 32.000 km — Revisão maior: troca de velas, folga de válvulas e timing do came (checar/ajustar), filtro de ar, fluido de freio DOT 4. | 24 meses — Troca do óleo do bevel box (cardã) 75W-90 GL5, independente da quilometragem. | Anual — Verificar bateria (mínimo 12,4V em repouso) e funcionamento da suspensão semi-ativa e da Redução Ativa de Pré-carga (se equipada). | Conforme uso off-road (Rally): inspecionar rolamentos de roda e vedantes de suspensão com mais frequência.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  // Geração legado (2012-2021)
  {
    modelName: 'TIGER 1200 EXPLORER',
    yearFrom: 2012, yearTo: 2017,
    MACETES: LEGADO_MACETES, PROBLEMAS: LEGADO_PROBLEMAS, MANUTENCAO: LEGADO_MANUTENCAO,
  },
  {
    modelName: 'TIGER 1200 XC EXPLORER',
    yearFrom: 2012, yearTo: 2017,
    MACETES: LEGADO_MACETES, PROBLEMAS: LEGADO_PROBLEMAS, MANUTENCAO: LEGADO_MANUTENCAO,
  },
  {
    modelName: 'TIGER 1200 EXPLORER XCA',
    yearFrom: 2016, yearTo: 2017,
    MACETES: LEGADO_MACETES, PROBLEMAS: LEGADO_PROBLEMAS, MANUTENCAO: LEGADO_MANUTENCAO,
  },
  {
    modelName: 'TIGER 1200 EXPLORER XCX',
    yearFrom: 2016, yearTo: 2017,
    MACETES: LEGADO_MACETES, PROBLEMAS: LEGADO_PROBLEMAS, MANUTENCAO: LEGADO_MANUTENCAO,
  },
  {
    modelName: 'TIGER 1200 EXPLORER XR',
    yearFrom: 2016, yearTo: 2017,
    MACETES: LEGADO_MACETES, PROBLEMAS: LEGADO_PROBLEMAS, MANUTENCAO: LEGADO_MANUTENCAO,
  },
  {
    modelName: 'TIGER 1200 XCA',
    yearFrom: 2018, yearTo: 2021,
    MACETES: LEGADO_MACETES, PROBLEMAS: LEGADO_PROBLEMAS, MANUTENCAO: LEGADO_MANUTENCAO,
  },
  {
    modelName: 'TIGER 1200 XCX',
    yearFrom: 2018, yearTo: 2021,
    MACETES: LEGADO_MACETES, PROBLEMAS: LEGADO_PROBLEMAS, MANUTENCAO: LEGADO_MANUTENCAO,
  },
  {
    modelName: 'TIGER 1200 XR',
    yearFrom: 2018, yearTo: 2021,
    MACETES: LEGADO_MACETES, PROBLEMAS: LEGADO_PROBLEMAS, MANUTENCAO: LEGADO_MANUTENCAO,
  },
  // Geração atual (2022+)
  {
    modelName: 'TIGER 1200 GT EXPLORER',
    yearFrom: 2022, yearTo: null,
    MACETES: NOVA_MACETES, PROBLEMAS: NOVA_PROBLEMAS, MANUTENCAO: NOVA_MANUTENCAO,
  },
  {
    modelName: 'TIGER 1200 GT PRO',
    yearFrom: 2022, yearTo: null,
    MACETES: NOVA_MACETES, PROBLEMAS: NOVA_PROBLEMAS, MANUTENCAO: NOVA_MANUTENCAO,
  },
  {
    modelName: 'TIGER 1200 RALLY EXPLORER',
    yearFrom: 2022, yearTo: null,
    MACETES: NOVA_MACETES, PROBLEMAS: NOVA_PROBLEMAS, MANUTENCAO: NOVA_MANUTENCAO,
  },
  {
    modelName: 'TIGER 1200 RALLY PRO',
    yearFrom: 2022, yearTo: null,
    MACETES: NOVA_MACETES, PROBLEMAS: NOVA_PROBLEMAS, MANUTENCAO: NOVA_MANUTENCAO,
  },
  {
    modelName: 'TIGER 1200 RALLY BLACK Edition',
    yearFrom: 2024, yearTo: null,
    MACETES: NOVA_MACETES, PROBLEMAS: NOVA_PROBLEMAS, MANUTENCAO: NOVA_MANUTENCAO,
  },
  {
    modelName: 'TIGER 1200 ALPINE Edition',
    yearFrom: 2024, yearTo: null,
    MACETES: NOVA_MACETES, PROBLEMAS: NOVA_PROBLEMAS, MANUTENCAO: NOVA_MANUTENCAO,
  },
  {
    modelName: 'TIGER 1200 DESERT Edition',
    yearFrom: 2024, yearTo: null,
    MACETES: NOVA_MACETES, PROBLEMAS: NOVA_PROBLEMAS, MANUTENCAO: NOVA_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'TIGER 1200 EXPLORER',
    yearFrom: 2012, yearTo: 2017,
    tireSize: '110/80-19 (F) · 150/70-17 (R)',
    frontPsi: 32, rearPsi: 39,
    frontPsiLoad: 32, rearPsiLoad: 42,
    notes: 'Solo: F 32 / R 39 PSI. Com carga/garupa: F 32 / R 42 PSI. Mesma medida de pneu em todas as versões legado (Explorer, XC, XCA, XCX, XR). Recomendados: Metzeler Tourance, Pirelli Scorpion Trail II.',
  },
  {
    modelName: 'TIGER 1200 XR',
    yearFrom: 2018, yearTo: 2021,
    tireSize: '110/80-19 (F) · 150/70-17 (R)',
    frontPsi: 32, rearPsi: 39,
    frontPsiLoad: 32, rearPsiLoad: 42,
    notes: 'Solo: F 32 / R 39 PSI. Com carga/garupa: F 32 / R 42 PSI. Versão facelift 2018-2021 com rodas fundidas (XR) — mesma medida de pneu da geração 2012-2017.',
  },
  {
    modelName: 'TIGER 1200 GT PRO',
    yearFrom: 2022, yearTo: null,
    tireSize: '120/70-19 (F) · 150/70-18 (R) — rodas fundidas tubeless',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Uso rodoviário. F 36 / R 42 PSI (frente e trás praticamente iguais com carga na especificação Triumph). Rodas fundidas 19"(F)/18"(R), pneu de perfil mais rodoviário que a versão Rally.',
  },
  {
    modelName: 'TIGER 1200 RALLY PRO',
    yearFrom: 2022, yearTo: null,
    tireSize: '90/90-21 (F) · 150/70-18 (R) — rodas raiadas tubeless',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Uso rodoviário: F 36 / R 42 PSI. Fora de estrada (trilha leve): reduza para aproximadamente F 22 / R 25 PSI e calibre de volta ao normal antes de voltar ao asfalto — pneu tubeless mesmo com roda raiada, permite operação com pressão reduzida sem risco de desalojar o talão como em roda com câmara.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // TIGER 1200 XR (aggregador geração legado, facelift 2018-2021)
  { modelName: 'TIGER 1200 XR', yearFrom: 2018, yearTo: 2021, component: 'Óleo 10W-40/10W-50 (4,0L)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 1215cc tricilíndrico. Semissintético API SL/SM, compatível com embreagem multidisco em banho de óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'TIGER 1200 XR', yearFrom: 2018, yearTo: 2021, component: 'Vela NGK DPR8EA-9 ×3', intervalKm: 16000, intervalMonths: null, notes: 'Gap aproximado 0,8-0,9mm. Uma por cilindro, trocar sempre em conjunto.', priority: 'MEDIUM', order: 2 },
  { modelName: 'TIGER 1200 XR', yearFrom: 2018, yearTo: 2021, component: 'Óleo do bevel box (cardã) 75W-90 GL5', intervalKm: 32000, intervalMonths: 24, notes: 'Verificar vazamento no retentor a cada revisão. Ponto fraco documentado da geração — não pule esta troca.', priority: 'CRITICAL', order: 3 },
  { modelName: 'TIGER 1200 XR', yearFrom: 2018, yearTo: 2021, component: 'Folga de válvulas — checagem/ajuste', intervalKm: 32000, intervalMonths: 24, notes: 'Motor frio. Revisão maior, geralmente feita junto com troca de velas.', priority: 'HIGH', order: 4 },
  { modelName: 'TIGER 1200 XR', yearFrom: 2018, yearTo: 2021, component: 'Filtro de ar', intervalKm: 32000, intervalMonths: 24, notes: 'Inspecionar a cada 16.000 km, trocar a cada 32.000 km ou antes se sujo (uso off-road frequente).', priority: 'MEDIUM', order: 5 },
  { modelName: 'TIGER 1200 XR', yearFrom: 2018, yearTo: 2021, component: 'Fluido de freio DOT 4 (frente + trás)', intervalKm: 32000, intervalMonths: 24, notes: 'Bienal obrigatório — absorve umidade e perde ponto de ebulição.', priority: 'HIGH', order: 6 },
  { modelName: 'TIGER 1200 XR', yearFrom: 2018, yearTo: 2021, component: 'Verificação do retificador/regulador (13,5-14,5V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Falhas elétricas documentadas nesta geração. Medir com multímetro.', priority: 'HIGH', order: 7 },
  { modelName: 'TIGER 1200 XR', yearFrom: 2018, yearTo: 2021, component: 'Mangueira de combustível tanque-chassi — inspeção visual', intervalKm: null, intervalMonths: 12, notes: 'Lote com histórico de vazamento/pinhole. Verificar cheiro de combustível ou manchas.', priority: 'HIGH', order: 8 },
  { modelName: 'TIGER 1200 XR', yearFrom: 2018, yearTo: 2021, component: 'Pastilhas de freio (dianteiro duplo + traseiro)', intervalKm: 16000, intervalMonths: null, notes: 'Inspecionar a cada revisão de óleo, trocar conforme desgaste.', priority: 'MEDIUM', order: 9 },

  // TIGER 1200 GT PRO (aggregador geração atual, rodas fundidas — estrada)
  { modelName: 'TIGER 1200 GT PRO', yearFrom: 2022, yearTo: null, component: 'Óleo 10W-40/10W-50 (3,65L s/filtro / 3,85L c/filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor novo 1160cc T-plane crank. Não é o mesmo óleo/capacidade do motor legado 1215cc.', priority: 'HIGH', order: 1 },
  { modelName: 'TIGER 1200 GT PRO', yearFrom: 2022, yearTo: null, component: 'Vela NGK LMAR9E-J ×3 (gap 0,6-0,7mm)', intervalKm: 16000, intervalMonths: null, notes: 'Iridium laser. Confirmar no manual se troca é a cada 16.000 ou 32.000 km conforme ano/versão.', priority: 'MEDIUM', order: 2 },
  { modelName: 'TIGER 1200 GT PRO', yearFrom: 2022, yearTo: null, component: 'Pneu dianteiro 120/70-19 (roda fundida tubeless)', intervalKm: null, intervalMonths: 6, notes: 'Perfil rodoviário. Verificar desgaste e calibragem (36 PSI solo / 36-42 PSI carregado).', priority: 'MEDIUM', order: 3 },
  { modelName: 'TIGER 1200 GT PRO', yearFrom: 2022, yearTo: null, component: 'Folga de válvulas + timing do came — checagem/ajuste', intervalKm: 32000, intervalMonths: 24, notes: 'Revisão maior. Motor frio.', priority: 'HIGH', order: 4 },
  { modelName: 'TIGER 1200 GT PRO', yearFrom: 2022, yearTo: null, component: 'Óleo do bevel box (cardã) 75W-90 GL5', intervalKm: null, intervalMonths: 24, notes: 'Triumph recomenda troca a cada 2 anos independente da quilometragem nesta geração.', priority: 'HIGH', order: 5 },
  { modelName: 'TIGER 1200 GT PRO', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 32000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'TIGER 1200 GT PRO', yearFrom: 2022, yearTo: null, component: 'Bateria — verificação de tensão (mín. 12,4V repouso)', intervalKm: null, intervalMonths: 6, notes: 'Eletrônica extensa (suspensão semi-ativa, Redução Ativa de Pré-carga) sensível à tensão da bateria.', priority: 'MEDIUM', order: 7 },
  { modelName: 'TIGER 1200 GT PRO', yearFrom: 2022, yearTo: null, component: 'Cilindro auxiliar de embreagem — inspeção (lote 2022)', intervalKm: null, intervalMonths: 12, notes: 'Verificar histórico de troca em garantia se a unidade for de produção inicial (2022).', priority: 'MEDIUM', order: 8 },

  // TIGER 1200 RALLY PRO (aggregador geração atual, rodas raiadas — off-road)
  { modelName: 'TIGER 1200 RALLY PRO', yearFrom: 2022, yearTo: null, component: 'Óleo 10W-40/10W-50 (3,65L s/filtro / 3,85L c/filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor novo 1160cc T-plane crank. Reduzir intervalo em uso off-road intenso.', priority: 'HIGH', order: 1 },
  { modelName: 'TIGER 1200 RALLY PRO', yearFrom: 2022, yearTo: null, component: 'Vela NGK LMAR9E-J ×3 (gap 0,6-0,7mm)', intervalKm: 16000, intervalMonths: null, notes: 'Iridium laser.', priority: 'MEDIUM', order: 2 },
  { modelName: 'TIGER 1200 RALLY PRO', yearFrom: 2022, yearTo: null, component: 'Pneu dianteiro 90/90-21 (roda raiada tubeless)', intervalKm: null, intervalMonths: 6, notes: 'Perfil off-road. Recalibrar após uso em trilha (baixar para ~22 PSI e retornar a 36 PSI no asfalto).', priority: 'MEDIUM', order: 3 },
  { modelName: 'TIGER 1200 RALLY PRO', yearFrom: 2022, yearTo: null, component: 'Rolamentos de roda e vedantes de suspensão — inspeção', intervalKm: 16000, intervalMonths: 12, notes: 'Uso off-road exige inspeção mais frequente que a versão GT.', priority: 'HIGH', order: 4 },
  { modelName: 'TIGER 1200 RALLY PRO', yearFrom: 2022, yearTo: null, component: 'Folga de válvulas + timing do came — checagem/ajuste', intervalKm: 32000, intervalMonths: 24, notes: 'Revisão maior. Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'TIGER 1200 RALLY PRO', yearFrom: 2022, yearTo: null, component: 'Óleo do bevel box (cardã) 75W-90 GL5', intervalKm: null, intervalMonths: 24, notes: 'A cada 2 anos. Uso off-road pode exigir verificação mais frequente do retentor.', priority: 'HIGH', order: 6 },
  { modelName: 'TIGER 1200 RALLY PRO', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 32000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 7 },
  { modelName: 'TIGER 1200 RALLY PRO', yearFrom: 2022, yearTo: null, component: 'Bateria — verificação de tensão (mín. 12,4V repouso)', intervalKm: null, intervalMonths: 6, notes: 'Eletrônica extensa sensível à tensão da bateria.', priority: 'MEDIUM', order: 8 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Triumph Tiger 1200 (legado 1215cc / atual 1160cc GT-Rally)...')

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

  console.log('✅ Triumph Tiger 1200 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
