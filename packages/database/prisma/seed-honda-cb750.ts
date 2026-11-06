// seed-honda-cb750.ts — Honda CB 750 — todas as gerações
// CB 750 Four SOHC (1969–1978) | CB 750 F Super Sport (1975–1978)
// CB 750 DOHC (1979–1982) | CB 750 Nighthawk (1991–2003) | CB 750 Hornet (2023+)
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface MaintenanceItemInput {
  modelName: string; yearFrom: number | null; yearTo: number | null
  component: string; intervalKm: number | null; intervalMonths: number | null
  notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number
}

// ─── CB 750 Four SOHC K-Series (1969–1978) — 736cc, I4, ar, 67cv ─────────────

const CB750_FOUR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — câmbio integrado no banho; capacidade 3,3 L na troca',
    body: 'Use SAE 10W-40 com classificação API SF/SG e JASO MA (o padrão JASO MA2 não existia em 1969, mas qualquer JASO MA2 moderno é compatível e superior). Capacidade na troca: 3,3 L (7 US pints); na desmontagem completa do cárter: ~3,8 L. O motor tem câmbio integrado no mesmo banho de óleo — jamais use óleo automotivo sem classificação JASO MA. Troque a cada 4.000–5.000 km ou 6 meses. Após a troca, ligue o motor por 1 minuto, desligue, aguarde 5 minutos e confira o nível com a moto na vertical em superfície plana.',
  },
  {
    severity: 'OK',
    title: 'Quatro velas NGK D8EA — gap 0,6–0,7 mm; sempre troque o jogo completo',
    body: 'Vela original: NGK D8ES (K0–K6) / DR8ES-L (K7). Equivalente moderno: NGK D8EA — mais fácil de encontrar e igualmente eficaz. Gap: 0,6–0,7 mm (0,024–0,028 in). São 4 cilindros = 4 velas — troque sempre o jogo completo para garantir ignição simétrica. Intervalo: 8.000–10.000 km. Remova as 4 ao mesmo tempo e numere-as — a análise visual comparativa revela muito sobre o estado de cada cilindro: eletrodo cinza = normal; preto = mistura rica ou óleo queimando; branco = mistura pobre.',
  },
  {
    severity: 'OK',
    title: 'Sistema elétrico: K0–K1 são 6V, K2 em diante são 12V — confirme antes de trocar peças',
    body: 'Os primeiros CB 750 (K0 e K1, 1969–1970) usam sistema elétrico de 6V. A partir do K2 (1971), passaram para 12V. Antes de instalar qualquer componente elétrico (farol, bateria, retificador, buzina), identifique o ano e o sistema da sua moto. Instalar peça de 12V em sistema 6V (ou vice-versa) pode queimar imediatamente a peça instalada ou os componentes existentes. A identificação está na plaqueta de chassi e no número de série do motor.',
  },
  {
    severity: 'OK',
    title: 'Quatro carburadores Keihin 28mm — sincronismo é essencial a cada 10.000 km',
    body: 'O CB 750 Four tem um carburador Keihin 28mm (slide-valve VM28) por cilindro. Fora de sincronia, a moto trepida, consome mais e perde desempenho nas retomadas. Sincronize a cada 10.000 km usando manômetro de vácuo de 4 vias (rack de 4 manômetros). O procedimento exige ajuste dos parafusos de regulagem de ar de cada carburador até que o vácuo em todos os 4 cilindros seja idêntico em marcha lenta (~900–1.000 rpm). Não tente sincronizar "no ouvido" — é impossível sem instrumento.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas: IN 0,05 mm / EX 0,08 mm — verificar a cada 10.000 km com motor frio',
    body: 'Folgas de válvulas (motor FRIO): admissão (IN) 0,05 mm (0,002 in) / escapamento (EX) 0,08 mm (0,003 in). São 2 válvulas por cilindro = 8 válvulas no total. Verifique a cada 10.000 km. Os valores originais de fábrica são considerados apertados pela comunidade de CB 750 vintage — muitos mecânicos experientes preferem folgar levemente para 0,05 / 0,10 mm a fim de prolongar a vida dos assentos das válvulas. Nunca regule as válvulas com o motor quente: a folga térmica dilatada vai gerar leitura incorreta.',
  },
  {
    severity: 'OK',
    title: 'Tensionador de corrente de distribuição — ajuste manual, inspecione a cada 5.000 km',
    body: 'O tensor da corrente de distribuição é manual (não automático). A guia e a roda de nylon envelhecem e endurecem com o tempo — em motos com mais de 30 anos, inspecione sempre. Corrente frouxa bate no cabeçote produzindo barulho metálico ao dar partida e nos primeiros segundos de marcha lenta. Em casos avançados, a corrente pode pular dentes e destruir o motor. Ao ajustar, siga o procedimento do manual: afrouxe o contra-pino, gire o parafuso de ajuste e retorne 1/4 de volta, então trave.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão — folga 20–30 mm, lubrificação a cada 600–1.000 km',
    body: 'Lubrifique a corrente a cada 600–1.000 km com spray específico para corrente O-ring (ou cadeia selada, se a sua corrente for de reposição moderna). A corrente original não tem vedação, portanto seque e lubrifique mais frequentemente após chuva. Ajuste a folga vertical para 20–30 mm no ponto mais tensionado da corrente. Corrente demasiado esticada sobrecarrega os rolamentos do eixo traseiro e da caixa de transmissão; corrente muito frouxa pode saltar e causar dano grave.',
  },
  {
    severity: 'OK',
    title: 'K0 "Sandcast" — cárter diferente, peças não intercambiáveis com K1 em diante',
    body: 'O CB 750 K0 de 1969 (produção de ~7.000 unidades) tem o cárter fundido em areia (sandcast), com textura granulada visível. A partir do K1 (1970), a Honda adotou a fundição em molde de alumínio (pressão). Muitas peças do K0 não são intercambiáveis com versões posteriores: parafusos do cárter, fixação do alternador e detalhes do cabeçote. Se adquirir ou restaurar um K0, confirme a autenticidade do cárter — a diferença visual é clara ao toque e à comparação fotográfica. K0 originais são bens de coleção de alto valor.',
  },
]

const CB750_FOUR_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador de selênio original — falha causa dano elétrico em cascata',
    body: 'O retificador original do CB 750 Four usa selênio (geração K0–K5) ou diodos simples (K6–K7), ambos propensos à falha por envelhecimento e calor. Quando falha, o alternador pode sobrecarregar a bateria (tensão acima de 16V), queimando bateria, bobinas e outros componentes. Sintomas: bateria que não segura carga, farol que oscila com a rotação, moto que para inesperadamente. Teste com multímetro a 4.000 rpm: tensão deve estar entre 13,5 e 14,5V. Substituição por retificador moderno de estado sólido (MOSFET, ~R$ 200–400) é o upgrade mais importante que se faz em qualquer CB 750 clássica.',
  },
  {
    severity: 'WARN',
    title: 'Agulheiro (needle jet) dos carburadores — gasolina vaza para o cárter',
    body: 'Com o envelhecimento das borrachas internas dos carburadores, a sede da agulha (agulheiro) deixa de vedar completamente quando a torneira (petcock) está aberta e a moto desligada. A gasolina escorre para o cárter, diluindo o óleo (nível sobe e o óleo cheira a gasolina). Continuar rodando com óleo diluído é altamente prejudicial — a mistura perde viscosidade e pode causar dano irreversível ao motor. Diagnóstico: cheire a vareta de óleo após a moto ficar parada 1 dia. Solução: kit de reparo dos carburadores (jatos, agulheiros e membranas — disponíveis por fornecedores vintage).',
  },
  {
    severity: 'WARN',
    title: 'Guia e roda de nylon do tensor de corrente — envelhecimento crítico após 30–50 anos',
    body: 'As peças de nylon (plástico) do sistema tensor da corrente de distribuição ressecam, racham e podem se fragmentar com o tempo. Em motos originais com mais de 30 anos e sem restauração, este é um risco real. Sintomas de desgaste avançado: ruído metálico ao dar partida, marcha lenta instável, perda de compressão. Em casos extremos, a corrente salta dos dentes e destrói o motor em segundos. Em qualquer restauração ou compra de CB 750 clássica, substitua preventivamente a guia e o tensor de nylon por novas (disponíveis em lojas de peças para vintage japonesas).',
  },
  {
    severity: 'WARN',
    title: 'Múltiplos vazamentos de óleo — juntas e retentores envelhecem após décadas',
    body: 'Em motos com 40–55 anos, os retentores de borracha e as juntas envelhecem e ressecam naturalmente, causando vazamentos em múltiplos pontos: junta do cabeçote, retentores do eixo de saída, tampas do taquímetro e do pinhão. Não é raro uma CB 750 Four completamente original apresentar 3–5 pontos de vazamento simultaneamente. Em restauração, substitua preventivamente todos os retentores e juntas antes de montar — o custo preventivo é muito menor que a desmontagem por goteira depois de pronto. Kits de juntas completos estão disponíveis por fornecedores de peças vintage.',
  },
]

const CB750_FOUR_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 750 Four', yearFrom: 1969, yearTo: 1978, component: 'Óleo do motor', intervalKm: 5000, intervalMonths: 6, notes: '3,3 L na troca; SAE 10W-40 JASO MA / API SF-SG', priority: 'CRITICAL', order: 1 },
  { modelName: 'CB 750 Four', yearFrom: 1969, yearTo: 1978, component: 'Tela de óleo (no lugar de filtro)', intervalKm: 10000, intervalMonths: 12, notes: 'CB 750 Four usa tela, não cartucho — limpar e inspecionar', priority: 'HIGH', order: 2 },
  { modelName: 'CB 750 Four', yearFrom: 1969, yearTo: 1978, component: 'Velas de ignição (NGK D8EA)', intervalKm: 10000, intervalMonths: 12, notes: '4 velas em conjunto; gap 0,6–0,7 mm', priority: 'HIGH', order: 3 },
  { modelName: 'CB 750 Four', yearFrom: 1969, yearTo: 1978, component: 'Folga de válvulas', intervalKm: 10000, intervalMonths: 12, notes: 'IN 0,05 mm / EX 0,08 mm; motor frio; 8 válvulas SOHC', priority: 'HIGH', order: 4 },
  { modelName: 'CB 750 Four', yearFrom: 1969, yearTo: 1978, component: 'Sincronismo dos 4 carburadores Keihin 28mm', intervalKm: 10000, intervalMonths: 12, notes: 'Manômetro de vácuo de 4 vias; marcha lenta 900–1.000 rpm', priority: 'HIGH', order: 5 },
  { modelName: 'CB 750 Four', yearFrom: 1969, yearTo: 1978, component: 'Tensor da corrente de distribuição', intervalKm: 5000, intervalMonths: 6, notes: 'Ajuste manual; inspecionar guia e roda de nylon', priority: 'HIGH', order: 6 },
  { modelName: 'CB 750 Four', yearFrom: 1969, yearTo: 1978, component: 'Filtro de ar (caixa úmida)', intervalKm: 12000, intervalMonths: 12, notes: 'Limpar a cada 6.000 km; trocar anualmente ou se saturado', priority: 'MEDIUM', order: 7 },
  { modelName: 'CB 750 Four', yearFrom: 1969, yearTo: 1978, component: 'Corrente de transmissão', intervalKm: 1000, intervalMonths: null, notes: 'Lubrificar a cada 600–1.000 km; folga 20–30 mm', priority: 'MEDIUM', order: 8 },
  { modelName: 'CB 750 Four', yearFrom: 1969, yearTo: 1978, component: 'Fluido de freio dianteiro (DOT 3 ou 4)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos; verificar nível mensalmente', priority: 'HIGH', order: 9 },
  { modelName: 'CB 750 Four', yearFrom: 1969, yearTo: 1978, component: 'Retificador de voltagem', intervalKm: 30000, intervalMonths: null, notes: 'Substituir preventivamente por unidade MOSFET moderna; testar tensão (13,5–14,5V a 4.000 rpm)', priority: 'HIGH', order: 10 },
  { modelName: 'CB 750 Four', yearFrom: 1969, yearTo: 1978, component: 'Borrachas e carburadores', intervalKm: null, intervalMonths: 60, notes: 'Inspecionar agulheiros, o-rings e membranas — ressecam com o tempo', priority: 'HIGH', order: 11 },
  { modelName: 'CB 750 Four', yearFrom: 1969, yearTo: 1978, component: 'Juntas e retentores de óleo', intervalKm: null, intervalMonths: 120, notes: 'Substituir kit completo em restaurações; pontos críticos: cabeçote, eixo de saída, tampas', priority: 'MEDIUM', order: 12 },
  { modelName: 'CB 750 Four', yearFrom: 1969, yearTo: 1978, component: 'Bateria', intervalKm: null, intervalMonths: 24, notes: 'K0–K1 usam 6V; K2+ usam 12V — confirmar sistema antes de comprar', priority: 'MEDIUM', order: 13 },
]

// ─── CB 750 F Super Sport SOHC (1975–1978) — 736cc, I4, ar, esportiva ────────

const CB750_F_SUPER_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesma mecânica do K-series — óleo, velas, válvulas e carburadores idênticos',
    body: 'O CB 750 F Super Sport usa o mesmo bloco 736cc SOHC do K-series. Todos os itens de motor são idênticos: óleo 10W-40 JASO MA (3,3 L), 4 velas NGK D8EA (gap 0,6–0,7 mm), folgas IN 0,05 mm / EX 0,08 mm e 4 carburadores Keihin 28mm. A diferença entre o F e o K está no chassi, na afinação e nos componentes externos — o coração é o mesmo. Siga os mesmos intervalos de manutenção do CB 750 Four K-series.',
  },
  {
    severity: 'OK',
    title: 'Escapamento 4-em-1 — juntas do coletor críticas; vedação diferente do K-series 4-em-4',
    body: 'O CB 750 F usa escapamento 4-em-1 (4 cabeçotes → 1 saída), diferente do 4-em-4 do K-series. O coletor central concentra calor e esforço mecânico — as juntas entre os cabeçotes e o coletor central tendem a vazar gases quentes após anos de uso, gerando faísca e cheiro de queimado. Inspecione as juntas anualmente e aperte os parafusos de fixação dos coletores com torque correto (aproximadamente 12–15 Nm). Nunca aperte parafusos do escapamento com o motor quente — o metal dilatado pode partir os parafusos.',
  },
  {
    severity: 'OK',
    title: 'F1 (1975–76): freio traseiro a disco — novidade em relação ao K-series tambor',
    body: 'O CB 750 F1 (1975–1976) foi um dos primeiros a ter freio traseiro a disco na família CB 750, diferente do tambor do K-series. Use fluido DOT 4 (não misture com DOT 3). Troque o fluido a cada 2 anos. As pastilhas do F1 são específicas — diferentes do K-series. Em motos com mais de 40 anos, verifique o estado do disco por empenamento (distorção lateral máxima: 0,3 mm) antes de usar em condições de trânsito — disco empenado provoca pulsação e reduz eficiência de frenagem.',
  },
  {
    severity: 'OK',
    title: 'F2 (1977–78): cames mais agressivos e válvulas maiores — revisão de válvulas é mais crítica',
    body: 'O CB 750 F2 (1977–1978) recebeu cames com perfil mais agressivo e válvulas ligeiramente maiores em relação ao F1 e ao K-series. Isso eleva marginalmente o desgaste dos assentos de válvulas, tornando a revisão periódica ainda mais importante. Não pule a verificação de folgas a cada 10.000 km. As especificações de folga são as mesmas do K-series (IN 0,05 mm / EX 0,08 mm), mas a agressividade dos cames faz com que os shims/calços migrem para fora da tolerância mais rapidamente. Use gasolina de boa qualidade (maior octanagem reduz o stress sobre as válvulas).',
  },
  {
    severity: 'OK',
    title: 'F2 com rodas ComStar — sem espoque, manutenção diferente das rodas de raios',
    body: 'O CB 750 F2 introduziu no Brasil/export as rodas ComStar (de raios de alumínio perfis). Ao contrário das rodas de raio tradicionais, as ComStar não precisam de regulagem de raios, mas os rolamentos de roda precisam ser inspecionados e graxados a cada 20.000 km. Não tente espraiá-las em casa com ferramentas de raios comuns. Para balanceamento, use balanceadora de roda — o processo é idêntico ao das rodas modernas. Lavar a moto com jatos d\'água diretos nos cubos acelera o desgaste dos rolamentos.',
  },
  {
    severity: 'OK',
    title: 'Pneus vintage de seção baixa — 3.25-19 dianteiro / 4.00-18 traseiro em diagonal',
    body: 'O CB 750 F Super Sport usa pneus de diagonal (bias-ply) de perfil original: dianteiro 3.25-19 e traseiro 4.00-18 — os mesmos do K-series. No mercado brasileiro, pneus nesse perfil são cada vez mais raros e precisam ser importados. Marcas como Shinko, Avon e Metzeler fabricam equivalentes modernos de diagonal para motos vintage. Não monte pneus radiais em rodas projetadas para diagonal sem consultar um especialista — a rigidez diferente pode comprometer o comportamento da moto. Calibragem: dianteiro 30–32 PSI, traseiro 32–36 PSI.',
  },
]

const CB750_F_SUPER_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador original — mesma falha elétrica em cascata do K-series',
    body: 'O CB 750 F Super Sport tem o mesmo retificador frágil do K-series. Falha causa sobrecarga elétrica: tensão acima de 16V queima bateria, bobinas e componentes. Sintomas: farol que oscila, bateria que não carrega, moto que para sem aviso. Teste: multímetro na bateria com motor a 4.000 rpm — deve marcar 13,5–14,5V. Substitua preventivamente por retificador MOSFET moderno. É a manutenção preventiva de maior impacto que você pode fazer em qualquer CB 750 clássica.',
  },
  {
    severity: 'WARN',
    title: 'Juntas do coletor 4-em-1 — gases quentes escapam pelo coletor com o tempo',
    body: 'O escapamento 4-em-1 concentra stress térmico no ponto de união dos 4 coletores. Após anos de uso, as juntas de cobre ou grafite do coletor começam a vazar gases quentes. Sintoma: cheiro de queimado, faísca visível no escuro próxima ao coletor, mancha de queimado no motor. Se ignorado, os gases quentes podem danificar cabos e mangueiras próximas. Verifique o torque dos parafusos do coletor anualmente e substitua as juntas do coletor a cada restauração.',
  },
  {
    severity: 'WARN',
    title: 'F2: desgaste acelerado de cames e válvulas — jamais pule revisão de válvulas',
    body: 'O perfil de came mais agressivo do F2 (1977–78) desgasta os assentos de válvulas mais rapidamente que o K-series padrão. Em motos com mais de 50.000 km sem revisão de cabeçote, é comum encontrar assento de válvula de exaustão com rebaixamento que exige retífica. Após retífica de cabeçote em um F2, sempre instale inserção de assento endurecida (hardened valve seat insert) para aguentar gasolina com etanol brasileiro. A gasolina com etanol acelera o desgaste dos assentos de válvulas projetados para combustíveis sem aditivo de chumbo.',
  },
]

const CB750_F_SUPER_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 750 F Super Sport', yearFrom: 1975, yearTo: 1978, component: 'Óleo do motor', intervalKm: 5000, intervalMonths: 6, notes: '3,3 L na troca; SAE 10W-40 JASO MA / API SF-SG', priority: 'CRITICAL', order: 1 },
  { modelName: 'CB 750 F Super Sport', yearFrom: 1975, yearTo: 1978, component: 'Tela de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Limpar e inspecionar; não é cartucho descartável', priority: 'HIGH', order: 2 },
  { modelName: 'CB 750 F Super Sport', yearFrom: 1975, yearTo: 1978, component: 'Velas de ignição (NGK D8EA)', intervalKm: 10000, intervalMonths: 12, notes: '4 velas em conjunto; gap 0,6–0,7 mm', priority: 'HIGH', order: 3 },
  { modelName: 'CB 750 F Super Sport', yearFrom: 1975, yearTo: 1978, component: 'Folga de válvulas', intervalKm: 10000, intervalMonths: 12, notes: 'IN 0,05 mm / EX 0,08 mm; motor frio — mais crítico no F2 por cames agressivos', priority: 'HIGH', order: 4 },
  { modelName: 'CB 750 F Super Sport', yearFrom: 1975, yearTo: 1978, component: 'Sincronismo dos 4 carburadores', intervalKm: 10000, intervalMonths: 12, notes: '4x Keihin 28mm; manômetro de vácuo de 4 vias', priority: 'HIGH', order: 5 },
  { modelName: 'CB 750 F Super Sport', yearFrom: 1975, yearTo: 1978, component: 'Tensor da corrente de distribuição', intervalKm: 5000, intervalMonths: 6, notes: 'Ajuste manual; inspecionar guia de nylon', priority: 'HIGH', order: 6 },
  { modelName: 'CB 750 F Super Sport', yearFrom: 1975, yearTo: 1978, component: 'Juntas do coletor do escapamento 4-em-1', intervalKm: null, intervalMonths: 24, notes: 'Inspecionar e apertar parafusos; substituir juntas se vazar gases', priority: 'MEDIUM', order: 7 },
  { modelName: 'CB 750 F Super Sport', yearFrom: 1975, yearTo: 1978, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Limpar a cada 6.000 km; trocar anualmente', priority: 'MEDIUM', order: 8 },
  { modelName: 'CB 750 F Super Sport', yearFrom: 1975, yearTo: 1978, component: 'Corrente de transmissão', intervalKm: 1000, intervalMonths: null, notes: 'Lubrificar a cada 600–1.000 km; folga 20–30 mm', priority: 'MEDIUM', order: 9 },
  { modelName: 'CB 750 F Super Sport', yearFrom: 1975, yearTo: 1978, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'F1/F2 com disco traseiro — trocar a cada 2 anos; verificar nível mensalmente', priority: 'HIGH', order: 10 },
  { modelName: 'CB 750 F Super Sport', yearFrom: 1975, yearTo: 1978, component: 'Retificador de voltagem', intervalKm: 30000, intervalMonths: null, notes: 'Substituir por MOSFET moderno preventivamente; testar 13,5–14,5V a 4.000 rpm', priority: 'HIGH', order: 11 },
  { modelName: 'CB 750 F Super Sport', yearFrom: 1975, yearTo: 1978, component: 'Rolamentos de roda (rodas ComStar no F2)', intervalKm: 20000, intervalMonths: null, notes: 'F2: rodar ComStar sem raio — inspecionar e greasing dos rolamentos a cada 20.000 km', priority: 'MEDIUM', order: 12 },
  { modelName: 'CB 750 F Super Sport', yearFrom: 1975, yearTo: 1978, component: 'Bateria', intervalKm: null, intervalMonths: 24, notes: 'Sistema 12V; vida útil ~3 anos', priority: 'MEDIUM', order: 13 },
]

// ─── CB 750 DOHC (1979–1982) — 749cc, I4 DOHC, ar, 78cv ─────────────────────

const CB750_DOHC_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 749cc DOHC completamente novo — NÃO use as mesmas specs do SOHC',
    body: 'O CB 750 DOHC (1979–1982) não é uma evolução do SOHC: é um motor completamente diferente, 749cc com DOHC e 4 válvulas por cilindro (16 válvulas no total). A cilindrada, os specs de óleo, velas, folgas de válvulas e carburadores são diferentes das gerações SOHC anteriores. Qualquer manual ou lista de peças específico desta geração deve ser usado — nunca aplique specs do CB 750 K-series ou F Super Sport no DOHC. A potência saltou de 67 cv para 78 cv, e o motor apresenta 2 correntes de distribuição em vez de 1.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DR8ES-L — gap 0,6–0,7 mm; jogo de 4; diferente das velas do SOHC',
    body: 'A vela do CB 750 DOHC é a NGK DR8ES-L (ou equivalente NGK DR8ESL). Gap: 0,6–0,7 mm (0,024–0,028 in). São 4 cilindros = 4 velas — troque sempre o jogo completo. A vela é diferente da D8EA usada no SOHC — não misture. Intervalo: 8.000–10.000 km. Remova numerando cada posição para análise comparativa do estado de cada cilindro. Em motos que ficaram paradas por longo tempo, as velas podem estar oxidadas ou com carbono depositado — limpeza ou substituição antes de forçar a partida.',
  },
  {
    severity: 'OK',
    title: 'DOIS tensionadores de corrente — admissão E escapamento; verificar separadamente',
    body: 'O maior diferencial de manutenção do DOHC em relação ao SOHC: existem DUAS correntes de distribuição (uma para o eixo de came de admissão, outra para o de escapamento) e portanto DOIS tensionadores. Ambos precisam de verificação separada. O tensionador da corrente de admissão tem histórico de vazar óleo pelo o-ring do ajustador com o envelhecimento. Inspecione os dois a cada 5.000 km: ruído metálico ao dar partida ou marcha lenta instável indica corrente frouxa. Mantenha os vedantes dos ajustadores em bom estado — vazamento de óleo do tensionador pode esvaziar o cárter silenciosamente.',
  },
  {
    severity: 'OK',
    title: 'Carburadores Keihin CV — diafragmas de borracha envelhecem; inspecione a cada revisão',
    body: 'O DOHC usa 4 carburadores Keihin de vácuo constante (CV — Constant Vacuum). Esses carburadores têm diafragmas de borracha que criam vácuo variável para mover a agulha. Com o tempo (10–20 anos), os diafragmas furam ou ressecam, causando: marcha lenta errática, perda de desempenho nas retomadas, dificuldade de afinação. Inspecione o diafragma de cada carburador a cada revisão profunda: segure o contra a luz e procure micro-furos ou ressecamento. Kit de diafragmas de reposição está disponível em fornecedores de peças vintage japonesas.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — 3,5 L com troca; 16 válvulas exigem boa lubrificação',
    body: 'Use SAE 10W-40 JASO MA / API SF-SG. Capacidade na troca: ~3,4–3,5 L (confirme a régua após completar). O DOHC tem 16 válvulas (4 por cilindro) e 2 eixos de came por cabeçote — a demanda de lubrificação dos cames é significativamente maior que o SOHC de 8 válvulas. Nunca economize no óleo: use marca confiável e troque a cada 4.000–5.000 km. O resfriamento e a lubrificação dos cames dependem diretamente do óleo em bom estado.',
  },
  {
    severity: 'OK',
    title: 'Sincronismo dos 4 Keihin CV — manômetro de 4 vias; diferente dos carbs de slide',
    body: 'Os carburadores CV do DOHC requerem sincronismo a cada 10.000 km com manômetro de vácuo de 4 vias. O procedimento é diferente dos carburadores de slide do SOHC: nos CV, o ajuste é feito pelos parafusos de sincronização entre os corpos dos carburadores (borboletas), não pela agulha. Marcha lenta ideal: 1.000–1.100 rpm. Um conjunto desincronizado causa vibração, consumo irregular e resposta errática na transição de aceleração. Se nunca foi feito, sincronia urgente antes de tentar ajustar qualquer outra coisa.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão — folga 20–30 mm; lubrificar a cada 600–1.000 km',
    body: 'Mesma recomendação do SOHC: lubrifique a corrente a cada 600–1.000 km com spray para corrente O-ring. Ajuste a folga vertical para 20–30 mm no ponto mais tenso. O DOHC com 78 cv transmite mais torque à corrente que o SOHC — corrente desgastada e frouxa pode causar arco e impacto nas placas de cobertura da transmissão. Troque a corrente e a relação (pinhão + coroa) juntos a cada 20.000–25.000 km ou quando o desgaste dos dentes for visível.',
  },
]

const CB750_DOHC_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Tensionadores das duas correntes DOHC — falha simultânea pode destruir o motor',
    body: 'O problema mais crítico e documentado do CB 750 DOHC: os dois tensionadores de corrente (admissão e escape) desgastam as guias de plástico/borracha e podem vazar óleo pelo o-ring de ajuste. Se o tensionador da corrente de admissão perder o o-ring, o óleo pressurizado pode esvaziarse silenciosamente, levando o motor à falha catastrófica por falta de lubrificação. Sintoma de alerta: mancha de óleo abaixo do tensionador esquerdo ao estacionar. Inspecione os dois tensionadores a cada 5.000 km. Em qualquer restauração do DOHC, substitua os o-rings dos tensionadores preventivamente.',
  },
  {
    severity: 'WARN',
    title: 'Parafusos da embreagem de partida — afrouxam por vibração e emperram o arranque',
    body: 'Os parafusos que fixam a embreagem do motor de partida (starter clutch) têm tendência documentada de afrouxar com a vibração do motor. Quando afrouxam, a embreagem patina ou deixa de acionar — o motor de arranque gira, mas o motor não pega. Diagnóstico: se o arranque funciona mas o motor não gira, pressione o pedal do kick e verifique se há resistência. Solução: reaper a embreagem de partida e reapertar os parafusos com trava química (Loctite 243 ou similar). Verifique o torque correto no manual — parafusos frouxos voltam a afrouxar sem trava química.',
  },
  {
    severity: 'WARN',
    title: 'Diafragmas dos carburadores CV — furam após 20+ anos, causam perda de desempenho',
    body: 'Os diafragmas de borracha dos carburadores Keihin CV do DOHC furam ou ressecam após décadas de uso. Sintoma: marcha lenta instável, "surging" (rotação que sobre e desce em marcha lenta), perda de potência nas retomadas e dificuldade de afinação. A afinação do carburador com diafragma furado é impossível — o efeito de vácuo variável está comprometido. Kit de diafragmas de reposição por volta de US$ 15–30 por carburador (disponível em Kijiji, eBay ou fornecedores vintage).',
  },
  {
    severity: 'WARN',
    title: 'Retificador de voltagem — mesma fraqueza elétrica do SOHC',
    body: 'O CB 750 DOHC mantém a vulnerabilidade elétrica das gerações anteriores: o retificador original falha por calor e envelhecimento, podendo sobrecarregar a bateria e queimar componentes elétricos em cascata. Teste preventivo: multímetro na bateria com motor a 4.000 rpm — deve marcar 13,5–14,5V. Se ultrapassar 14,8V, o retificador está falhando. Substitua por unidade MOSFET moderna — é o upgrade elétrico prioritário para qualquer CB 750 vintage. O custo é R$ 200–400 e evita prejuízo muito maior.',
  },
]

const CB750_DOHC_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 750 DOHC', yearFrom: 1979, yearTo: 1982, component: 'Óleo do motor', intervalKm: 5000, intervalMonths: 6, notes: '~3,5 L na troca; SAE 10W-40 JASO MA / API SF-SG', priority: 'CRITICAL', order: 1 },
  { modelName: 'CB 750 DOHC', yearFrom: 1979, yearTo: 1982, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Cartucho (diferente do SOHC que usa tela)', priority: 'HIGH', order: 2 },
  { modelName: 'CB 750 DOHC', yearFrom: 1979, yearTo: 1982, component: 'Velas de ignição (NGK DR8ES-L)', intervalKm: 10000, intervalMonths: 12, notes: '4 velas em conjunto; gap 0,6–0,7 mm', priority: 'HIGH', order: 3 },
  { modelName: 'CB 750 DOHC', yearFrom: 1979, yearTo: 1982, component: 'Folga de válvulas (16 válvulas DOHC)', intervalKm: 10000, intervalMonths: 12, notes: 'IN 0,05 mm / EX 0,08 mm; motor frio; 4 válvulas por cilindro', priority: 'HIGH', order: 4 },
  { modelName: 'CB 750 DOHC', yearFrom: 1979, yearTo: 1982, component: 'Tensionadores das correntes (2 unidades)', intervalKm: 5000, intervalMonths: 6, notes: 'Inspecionar AMBOS os tensionadores (admissão + escape); verificar o-rings por vazamento de óleo', priority: 'HIGH', order: 5 },
  { modelName: 'CB 750 DOHC', yearFrom: 1979, yearTo: 1982, component: 'Sincronismo dos 4 carburadores CV', intervalKm: 10000, intervalMonths: 12, notes: '4x Keihin CV; manômetro de vácuo de 4 vias; marcha lenta 1.000–1.100 rpm', priority: 'HIGH', order: 6 },
  { modelName: 'CB 750 DOHC', yearFrom: 1979, yearTo: 1982, component: 'Diafragmas dos carburadores CV', intervalKm: null, intervalMonths: 60, notes: 'Inspecionar contra a luz por micro-furos; substituir se ressecados ou furados', priority: 'HIGH', order: 7 },
  { modelName: 'CB 750 DOHC', yearFrom: 1979, yearTo: 1982, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: 12, notes: 'Limpar e inspecionar; trocar se danificado', priority: 'MEDIUM', order: 8 },
  { modelName: 'CB 750 DOHC', yearFrom: 1979, yearTo: 1982, component: 'Corrente de transmissão', intervalKm: 1000, intervalMonths: null, notes: 'Lubrificar a cada 600–1.000 km; folga 20–30 mm', priority: 'MEDIUM', order: 9 },
  { modelName: 'CB 750 DOHC', yearFrom: 1979, yearTo: 1982, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos; verificar nível mensalmente', priority: 'HIGH', order: 10 },
  { modelName: 'CB 750 DOHC', yearFrom: 1979, yearTo: 1982, component: 'Retificador de voltagem', intervalKm: 30000, intervalMonths: null, notes: 'Substituir por MOSFET moderno preventivamente; testar 13,5–14,5V a 4.000 rpm', priority: 'HIGH', order: 11 },
  { modelName: 'CB 750 DOHC', yearFrom: 1979, yearTo: 1982, component: 'Parafusos da embreagem de partida', intervalKm: null, intervalMonths: 24, notes: 'Verificar torque e aplicar trava química (Loctite 243)', priority: 'MEDIUM', order: 12 },
  { modelName: 'CB 750 DOHC', yearFrom: 1979, yearTo: 1982, component: 'Bateria', intervalKm: null, intervalMonths: 24, notes: 'Sistema 12V; vida útil ~3 anos', priority: 'MEDIUM', order: 13 },
]

// ─── CB 750 Nighthawk (1991–2003) — 747cc DOHC, ar+resfriador de óleo ─────────

const CB750_NIGHTHAWK_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 747cc DOHC com resfriador de óleo — mais robusto que as gerações vintage',
    body: 'O Nighthawk usa um motor 747cc DOHC completamente redesenhado, com refrigeração a ar complementada por um resfriador de óleo (oil cooler) externo. É significativamente mais resistente ao calor e ao uso intenso do que os motores das gerações 1969–1982. Os intervalos de manutenção são mais longos e o motor é muito mais tolerante a variações. É comum ver Nighthawks com 160.000–200.000 km funcionando perfeitamente com manutenção adequada. Não trate como vintage frágil — é uma moto robusta com alta longevidade.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DPR8EA-9 — gap 0,8–0,9 mm; diferente de todas as gerações anteriores',
    body: 'Vela do Nighthawk: NGK DPR8EA-9 (gap 0,8–0,9 mm / 0,031–0,035 in). São 4 cilindros = 4 velas — troque sempre o jogo completo. A vela é diferente da D8EA (SOHC) e da DR8ES-L (DOHC 1979–82) — não use equivalentes das gerações anteriores no Nighthawk. Intervalo: 16.000 km. Em motos com menos quilometragem mas muitos anos de uso (gasolina velha, combustível com etanol alto), inspecione as velas anualmente independente do km.',
  },
  {
    severity: 'OK',
    title: 'Folgas de válvulas IN e EX idênticas: 0,10 mm — mais fácil que os vintage',
    body: 'Uma das particularidades do Nighthawk: folgas de admissão (IN) e escape (EX) têm o mesmo valor: 0,10 mm (0,004 in) com motor frio. Muito mais simples que regulagens assimétricas dos vintage. Verifique a cada 24.000 km. São 16 válvulas (4 por cilindro) — processo demorado mas não complicado. Se a moto apresenta desempenho reduzido ou ruído seco no cabeçote, verifique as válvulas antes de qualquer outra intervenção. Muitas Nighthawk importadas chegam ao Brasil sem registro de revisão de válvulas — prioridade na compra.',
  },
  {
    severity: 'OK',
    title: 'Quatro carburadores Keihin 34mm CV — sincronismo a cada 24.000 km',
    body: 'O Nighthawk usa 4 carburadores Keihin de 34mm, do tipo CV (vácuo constante). Sincronize a cada 24.000 km com manômetro de vácuo de 4 vias. Marcha lenta: ~1.000–1.200 rpm. Os diafragmas desses carburadores duram muito mais que os dos DOHC vintage, mas após 20 anos de uso podem apresentar enrijecimento. Gasolina do Brasil (com etanol) resseca mais rápido as borrachas internas — se a moto ficar parada por mais de 2 meses, esvazie os carburadores ou use estabilizador de combustível.',
  },
  {
    severity: 'OK',
    title: 'Pneus modernos 110/80-18 (F) / 140/70-17 (R) — calibragem 33 PSI solo',
    body: 'O Nighthawk usa pneus radiais modernos de seção assimétrica: dianteiro 110/80-18 e traseiro 140/70-17. Pressão: dianteiro 33 PSI solo / traseiro 33 PSI solo (até 90 kg de carga); traseiro 41 PSI com carga máxima. Pneus nesses tamanhos são facilmente encontrados em marcas como Michelin, Pirelli, Dunlop e Metzeler no Brasil. O tamanho dianteiro é diferente da maioria das motos modernas (aro 18" em vez de 17"), mas há boa disponibilidade de opções de qualidade.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 API SF/SG — 2,7 L na drenagem padrão; resfriador de óleo não altera capacidade',
    body: 'Use SAE 10W-40 com API SF/SG ou superior. IMPORTANTE: a capacidade do Nighthawk na drenagem padrão é 2,7 L — significativamente menos que os modelos vintage (3,3 L). Não complete até 3,5 L "por segurança": excesso de óleo pode ser expelido pelo respiro e causar sujeira. Após drenagem completa (com desmontagem do cárter): ~3,6 L. Use sempre a vareta de medição com a moto na vertical. O resfriador de óleo externo é passivo — não altera a capacidade nem requer dreno próprio.',
  },
  {
    severity: 'OK',
    title: 'Longevidade excepcional — manutenção preventiva simples garante 200.000 km+',
    body: 'O Nighthawk é reconhecido nas comunidades internacionais como uma das motos de 4 cilindros mais longevas da história Honda. São comuns relatos de 200.000–300.000 km com óleo trocado regularmente, válvulas verificadas e carburadores limpos. O motor, por ser relativamente detuned (75 cv) para sua capacidade, trabalha sempre abaixo do estresse máximo. Se você comprou um Nighthawk com alta quilometragem: faça a revisão das válvulas, limpe os carburadores, troque o fluido de freio e a corrente — e a moto provavelmente durará por mais 100.000 km.',
  },
]

const CB750_NIGHTHAWK_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Diafragmas dos carburadores — furam após 20+ anos mesmo com baixa quilometragem',
    body: 'Os diafragmas de borracha dos 4 carburadores Keihin CV do Nighthawk têm vida útil de aproximadamente 20–25 anos, independentemente da quilometragem. Moto que ficou parada por anos pode ter diafragmas enrijecidos ou com micro-furos. Sintoma: marcha lenta que sobe e desce ("surging"), dificuldade de afinação, perda de potência nas retomadas. A borracha deteriorada não é recuperável — exige substituição. Kit de 4 diafragmas está disponível em fornecedores de peças vintage (Kijiji, eBay, Forwardworks). Custo: ~US$ 50–80 o kit.',
  },
  {
    severity: 'WARN',
    title: 'Switch de partida (RUN/OFF) — falha intermitente causa pane sem aviso',
    body: 'O interruptor de partida (chave RUN/OFF no guidão direito) do Nighthawk tem histórico de falha intermitente por oxidação interna dos contatos. Em motos com 15+ anos, o switch pode criar resistência de contato que não aciona o farol corretamente (indicativo de falha) ou, em casos mais avançados, corta a corrente inesperadamente fazendo a moto parar. Limpeza com contato elétrico spray pode resolver temporariamente. Substituição definitiva por switch novo é a solução permanente. Antes de suspeitar de problema no motor, verifique o switch de partida.',
  },
  {
    severity: 'WARN',
    title: 'Petcock (torneira de combustível) — vaza na posição OFF após envelhecimento',
    body: 'O petcock do Nighthawk usa membranas de borracha que ressecam com o tempo e passam a vazar combustível mesmo na posição OFF. Sintoma: gasolina gotejando do dreno da cuba dos carburadores, ou óleo do motor com cheiro de gasolina (gasolina vazando para o cárter via carburador). Não é raro em Nighthawks importados com 20+ anos. Kit de reparo do petcock custa ~US$ 10–15 e geralmente resolve; se o corpo plástico estiver rachado, substituição total é necessária. Verifique sempre antes de guardar a moto por longa data.',
  },
  {
    severity: 'WARN',
    title: 'Corrente do alternador — pode romper; causou recalls em gerações relacionadas',
    body: 'A corrente que aciona o alternador interno pode se romper em Nighthawks com alta quilometragem e manutenção negligenciada. A corrente fica acessível via tampa lateral esquerda. Sintoma de desgaste: ruído metálico rítmico em marcha lenta que muda com a rotação, ou falha no sistema de carga. O problema foi documentado em gerações relacionadas da família CB 750/800. Inspecione a corrente do alternador a cada 40.000 km ou ao fazer revisão profunda do motor.',
  },
]

const CB750_NIGHTHAWK_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 750 Nighthawk', yearFrom: 1991, yearTo: 2003, component: 'Óleo do motor', intervalKm: 8000, intervalMonths: 12, notes: '2,7 L na troca padrão; SAE 10W-40 API SF/SG', priority: 'CRITICAL', order: 1 },
  { modelName: 'CB 750 Nighthawk', yearFrom: 1991, yearTo: 2003, component: 'Filtro de óleo', intervalKm: 16000, intervalMonths: 12, notes: 'Cartucho descartável; trocar junto com o óleo a cada 2 trocas', priority: 'HIGH', order: 2 },
  { modelName: 'CB 750 Nighthawk', yearFrom: 1991, yearTo: 2003, component: 'Velas de ignição (NGK DPR8EA-9)', intervalKm: 16000, intervalMonths: null, notes: '4 velas em conjunto; gap 0,8–0,9 mm', priority: 'HIGH', order: 3 },
  { modelName: 'CB 750 Nighthawk', yearFrom: 1991, yearTo: 2003, component: 'Filtro de ar', intervalKm: 16000, intervalMonths: 12, notes: 'Inspecionar a cada 8.000 km; trocar se saturado', priority: 'HIGH', order: 4 },
  { modelName: 'CB 750 Nighthawk', yearFrom: 1991, yearTo: 2003, component: 'Folga de válvulas (IN e EX = 0,10 mm)', intervalKm: 24000, intervalMonths: null, notes: 'Motor frio; 16 válvulas DOHC; admissão e escape com mesma folga (0,10 mm)', priority: 'HIGH', order: 5 },
  { modelName: 'CB 750 Nighthawk', yearFrom: 1991, yearTo: 2003, component: 'Sincronismo dos 4 carburadores Keihin 34mm', intervalKm: 24000, intervalMonths: null, notes: 'CV (vácuo constante); manômetro de 4 vias; marcha lenta ~1.000–1.200 rpm', priority: 'HIGH', order: 6 },
  { modelName: 'CB 750 Nighthawk', yearFrom: 1991, yearTo: 2003, component: 'Corrente de transmissão', intervalKm: 1000, intervalMonths: null, notes: 'Lubrificar a cada 1.000 km; ajustar folga conforme manual', priority: 'MEDIUM', order: 7 },
  { modelName: 'CB 750 Nighthawk', yearFrom: 1991, yearTo: 2003, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos; verificar nível mensalmente', priority: 'HIGH', order: 8 },
  { modelName: 'CB 750 Nighthawk', yearFrom: 1991, yearTo: 2003, component: 'Óleo do garfo dianteiro', intervalKm: 40000, intervalMonths: 60, notes: 'Garfo telescópico convencional; SAE 10 fork oil', priority: 'MEDIUM', order: 9 },
  { modelName: 'CB 750 Nighthawk', yearFrom: 1991, yearTo: 2003, component: 'Diafragmas dos carburadores', intervalKm: null, intervalMonths: 120, notes: 'Inspecionar a cada 10 anos; substituir se furados ou ressecados', priority: 'HIGH', order: 10 },
  { modelName: 'CB 750 Nighthawk', yearFrom: 1991, yearTo: 2003, component: 'Petcock (torneira de combustível)', intervalKm: null, intervalMonths: 60, notes: 'Inspecionar membranas de borracha; kit de reparo disponível', priority: 'MEDIUM', order: 11 },
  { modelName: 'CB 750 Nighthawk', yearFrom: 1991, yearTo: 2003, component: 'Corrente do alternador', intervalKm: 40000, intervalMonths: null, notes: 'Inspecionar via tampa esquerda; risco de ruptura em alta quilometragem', priority: 'MEDIUM', order: 12 },
  { modelName: 'CB 750 Nighthawk', yearFrom: 1991, yearTo: 2003, component: 'Bateria', intervalKm: null, intervalMonths: 36, notes: 'Vida útil ~3 anos; tensão mínima 12,6V', priority: 'MEDIUM', order: 13 },
]

// ─── CB 750 Hornet (2023+) — 755cc Unicam twin, líquido, injeção, 90,5cv ─────

const CB750_HORNET_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 755cc parallel twin Unicam — virabrequim 270°, som e pulso de V-twin',
    body: 'O CB 750 Hornet 2023 usa um motor twin (bicilíndrico paralelo) de 755cc com tecnologia Unicam: o cabeçote tem um único eixo de came (SOHC) que aciona diretamente as válvulas de admissão e usa balancins (rocker arms) para as de escape. O virabrequim com defasagem de 270° cria um intervalo de explosão irregular que confere som e resposta semelhantes a um V-twin. NÃO confunda com inline-4 das gerações antigas de CB 750 — é uma arquitetura completamente diferente em todos os aspectos: potência, sound, manutenção e peças.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — 3,5 L com filtro; troca a cada 12.000 km (o dobro da CB 500)',
    body: 'Use SAE 10W-30 JASO MA (manual Honda oficial). Capacidade: 3,3 L sem filtro / 3,5 L com filtro. O intervalo de troca do CB 750 Hornet é 12.000 km (ou 1 ano) — o dobro do CB 500F/X. Isso reflete a tecnologia mais avançada do motor e os maiores tolerâncias de projeto. Em uso predominantemente urbano intenso (paradas frequentes, calor extremo), reduza para 8.000 km. Como referência: o CB 750 Hornet tem maior capacidade de motor e mais potência que o CB 500 Hornet — respeite o JASO MA (não MA2 necessariamente, mas qualquer MA é compatível).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK SILMAR8A9S — gap 0,8–0,9 mm; intervalo de 48.000 km (troca rara)',
    body: 'Vela original: NGK SILMAR8A9S — vela de iridium-rutênio de longa duração. Gap: 0,8–0,9 mm. São 2 cilindros = 2 velas. O intervalo oficial Honda para substituição é de 48.000 km — praticamente o dobro de qualquer outra moto Honda da linha. Não troque antes do prazo; a vela é fabricada para durar. Verifique o gap ao instalar. A vela do CB 750 Hornet é específica e diferente de toda a família CB 500 — nunca instale CPR8EA-9 ou similares do CB 500 no CB 750 Hornet.',
  },
  {
    severity: 'OK',
    title: 'Três modos de condução + User — Sport, Standard, Rain, mais personalizado',
    body: 'O CB 750 Hornet tem 4 perfis de condução selecionáveis: Sport (potência total, resposta agressiva, freio motor forte), Standard (equilíbrio geral), Rain (potência reduzida, resposta suavizada, HSTC mais conservador) e User (personalizado pelo piloto). O modo User permite ajustar independentemente: EP (Engine Power — 3 níveis), EB (Engine Braking — 3 níveis) e HSTC (controle de tração — 3 níveis + desligado). Para o dia a dia urbano brasileiro, Standard ou Rain são os mais práticos. Para pista ou uso esportivo, Sport com HSTC nível 1 ou desligado.',
  },
  {
    severity: 'OK',
    title: 'Quickshifter bidirecional com 3 sensibilidades — upshift E downshift sem embreagem',
    body: 'Diferentemente do CB 500 Hornet, o CB 750 Hornet tem quickshifter bidirecional (upshift E downshift sem embreagem). Funciona nas 3 sensibilidades: Soft (ativação em forças menores — recomendado para uso normal), Medium e Hard (para pista). O sistema de downshift faz auto-blip (controla brevemente o acelerador para igualar as rotações). Para usa o QS: subida — pressione a marcha para cima sem tirar o gás; descida — puxe a marcha para baixo sem embreagem. Abaixo de ~4.000 rpm o QS pode não funcionar de forma confiável — use embreagem em velocidades muito baixas.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas: IN 0,16 mm / EX 0,24 mm a cada 24.000 km — maior intervalo que CB 500',
    body: 'Folgas com motor FRIO: admissão 0,16 mm (±0,03) / escapamento 0,24 mm (±0,02). Intervalo de verificação: 24.000 km — metade mais raro que o CB 500F/X (16.000 km). O escape tem valor diferente do CB 500 (0,24 mm vs 0,27 mm no CB 500F). São 2 cilindros com 4 válvulas cada = 8 válvulas totais. A regulagem usa shims (anilhas calibradas) — exige compressor de mola de válvula e kit de shims. Trabalho de oficina especializada. Não ignore: válvulas fora de folga no Unicam causam perda de potência e risco de queima do assento.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70ZR17 / 160/60ZR17 — pressão 36/42 PSI (mais cheio que outros Hondas)',
    body: 'O CB 750 Hornet usa pneus ZR (radiais de alto desempenho): dianteiro 120/70ZR17 e traseiro 160/60ZR17. A pressão recomendada pela Honda é 36 PSI dianteiro e 42 PSI traseiro — significativamente mais alta que o CB 500 Hornet (32/36 PSI). Calibre sempre com pneus frios. A pressão mais alta é necessária para a velocidade máxima e potência do 750 Hornet. Não reduza para valores do CB 500 — o handling e a segurança podem ser comprometidos. Pneus aptos para o CB 750 Hornet devem ter classificação Z (>240 km/h).',
  },
  {
    severity: 'OK',
    title: 'HSTC com Wheelie Control — controle de tração desligável pelo piloto',
    body: 'O Honda Selectable Torque Control (HSTC) do CB 750 Hornet inclui controle de empinamento (Wheelie Control). Em 3 níveis de intervenção + desligável, o sistema usa sensores de velocidade das rodas e acelerômetro para detectar derrapagem traseira e empinamento, cortando a potência brevemente. Para uso em pista com pneus aquecidos, pode ser conveniente reduzir o nível ou desligar. Para chuva ou pisos escorregadios, mantenha no nível mais alto. O HSTC não substitui técnica de pilotagem — é uma rede de segurança, não uma ferramenta de performance.',
  },
]

const CB750_HORNET_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Resposta do acelerador irregular em 1ª e 2ª marchas em marcha lenta urbana',
    body: 'Múltiplos testistas profissionais (Motorcycle News, Bennetts, Visordown) reportaram que a transição off-on-off do acelerador em baixa velocidade (1ª e 2ª marchas, trânsito lento) pode ser soluçante — sensação de "arranca-para" causada pelo mapeamento agressivo da injeção. Não é falha mecânica; é característica de software. No modo Rain ou com EP (Engine Power) no nível 1, o comportamento melhora significativamente. Em uso urbano intenso, o modo Standard com HSTC ativo também suaviza a resposta. Honda pode oferecer updates de mapeamento via concessionária em versões futuras.',
  },
  {
    severity: 'WARN',
    title: 'Modelo recente (2023) — histórico de falhas crônicas ainda em formação; registre o chassi para recalls',
    body: 'O CB 750 Hornet chegou ao mercado em 2023 e ainda não tem histórico extenso de falhas crônicas documentadas. Até 2025, não há relatos sistemáticos de falhas mecânicas críticas. Isso é positivo, mas significa que o mercado ainda está avaliando a confiabilidade de longo prazo. Recomendações práticas: (1) registre o número de chassi no site Honda e ative notificações de recall; (2) faça todas as revisões dentro do prazo; (3) monitore fóruns e grupos de proprietários para estar entre os primeiros a saber de problemas emergentes. O motor 755cc twin é novidade para a linha Honda.',
  },
  {
    severity: 'OK',
    title: 'Banco estreito — desconforto em viagens longas (>200 km) para pilotos mais altos',
    body: 'Múltiplos proprietários e testistas relatam desconforto no assento original após 2–3 horas de uso contínuo, especialmente pilotos com mais de 1,80 m ou com silhueta mais larga. O assento é projetado para a estética naked agressiva da Hornet, priorizando visual sobre ergonomia de longa distância. Não é falha de qualidade — é decisão de design. Soluções: short breaks a cada 100–150 km em viagens longas, ou substituição por assento aftermarket mais largo e acolchoado (mercado europeu tem mais opções). Não afeta segurança ou mecânica.',
  },
]

const CB750_HORNET_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 750 Hornet', yearFrom: 2023, yearTo: null, component: 'Óleo do motor', intervalKm: 12000, intervalMonths: 12, notes: '3,5 L com filtro; SAE 10W-30 JASO MA (manual Honda oficial)', priority: 'CRITICAL', order: 1 },
  { modelName: 'CB 750 Hornet', yearFrom: 2023, yearTo: null, component: 'Filtro de óleo', intervalKm: 24000, intervalMonths: 24, notes: 'Trocar a cada 2 trocas de óleo', priority: 'HIGH', order: 2 },
  { modelName: 'CB 750 Hornet', yearFrom: 2023, yearTo: null, component: 'Velas de ignição (NGK SILMAR8A9S)', intervalKm: 48000, intervalMonths: null, notes: '2 velas em par; gap 0,8–0,9 mm; iridium de longa duração', priority: 'HIGH', order: 3 },
  { modelName: 'CB 750 Hornet', yearFrom: 2023, yearTo: null, component: 'Filtro de ar', intervalKm: 36000, intervalMonths: null, notes: 'Inspecionar a cada 12.000 km em ambientes com poeira ou chuva', priority: 'HIGH', order: 4 },
  { modelName: 'CB 750 Hornet', yearFrom: 2023, yearTo: null, component: 'Folga de válvulas (Unicam)', intervalKm: 24000, intervalMonths: null, notes: 'IN 0,16 mm (±0,03) / EX 0,24 mm (±0,02); motor frio; 8 válvulas', priority: 'HIGH', order: 5 },
  { modelName: 'CB 750 Hornet', yearFrom: 2023, yearTo: null, component: 'Corrente de transmissão', intervalKm: 1000, intervalMonths: null, notes: 'Lubrificar a cada 1.000 km; folga 25–35 mm', priority: 'MEDIUM', order: 6 },
  { modelName: 'CB 750 Hornet', yearFrom: 2023, yearTo: null, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos; verificar nível mensalmente', priority: 'HIGH', order: 7 },
  { modelName: 'CB 750 Hornet', yearFrom: 2023, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 36, notes: 'Trocar a cada 3 anos; mistura 50/50 água destilada + anticongelante Honda', priority: 'HIGH', order: 8 },
  { modelName: 'CB 750 Hornet', yearFrom: 2023, yearTo: null, component: 'Pastilhas de freio', intervalKm: 20000, intervalMonths: null, notes: 'Inspecionar a cada 10.000 km; disco duplo dianteiro 310mm + disco traseiro', priority: 'HIGH', order: 9 },
  { modelName: 'CB 750 Hornet', yearFrom: 2023, yearTo: null, component: 'Óleo do garfo USD', intervalKm: 25000, intervalMonths: null, notes: 'Garfo invertido 41mm; inspecionar vedadores a cada 10.000 km', priority: 'HIGH', order: 10 },
  { modelName: 'CB 750 Hornet', yearFrom: 2023, yearTo: null, component: 'Sensores ABS / anéis fônicos', intervalKm: null, intervalMonths: 12, notes: 'Inspecionar limpeza e fixação; não instalar acessórios nos cubos', priority: 'LOW', order: 11 },
  { modelName: 'CB 750 Hornet', yearFrom: 2023, yearTo: null, component: 'Quickshifter — sensor de câmbio', intervalKm: null, intervalMonths: 12, notes: 'Inspecionar fixação e contatos; limpar se travamentos ocorrerem', priority: 'LOW', order: 12 },
  { modelName: 'CB 750 Hornet', yearFrom: 2023, yearTo: null, component: 'Bateria', intervalKm: null, intervalMonths: 36, notes: 'Vida útil ~3 anos; tensão mínima 12,6V; manter carregada se parada >30 dias', priority: 'MEDIUM', order: 13 },
]

// ─── Blocos de modelos ────────────────────────────────────────────────────────

const BLOCKS: {
  modelName: string; yearFrom: number; yearTo: number | null
  MACETES: TipInput[]; PROBLEMAS: TipInput[]
}[] = [
  { modelName: 'CB 750 Four',        yearFrom: 1969, yearTo: 1978, MACETES: CB750_FOUR_MACETES,       PROBLEMAS: CB750_FOUR_PROBLEMAS       },
  { modelName: 'CB 750 F Super Sport', yearFrom: 1975, yearTo: 1978, MACETES: CB750_F_SUPER_MACETES,    PROBLEMAS: CB750_F_SUPER_PROBLEMAS    },
  { modelName: 'CB 750 DOHC',        yearFrom: 1979, yearTo: 1982, MACETES: CB750_DOHC_MACETES,       PROBLEMAS: CB750_DOHC_PROBLEMAS       },
  { modelName: 'CB 750 Nighthawk',   yearFrom: 1991, yearTo: 2003, MACETES: CB750_NIGHTHAWK_MACETES,  PROBLEMAS: CB750_NIGHTHAWK_PROBLEMAS  },
  { modelName: 'CB 750 Hornet',      yearFrom: 2023, yearTo: null,  MACETES: CB750_HORNET_MACETES,     PROBLEMAS: CB750_HORNET_PROBLEMAS     },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...CB750_FOUR_MANUTENCAO,
  ...CB750_F_SUPER_MANUTENCAO,
  ...CB750_DOHC_MANUTENCAO,
  ...CB750_NIGHTHAWK_MANUTENCAO,
  ...CB750_HORNET_MANUTENCAO,
]

const TIRE_PRESSURES = [
  {
    modelName: 'CB 750 Four',
    yearFrom: 1969, yearTo: 1978,
    tireSize: '3.25-19 (F) · 4.00-18 (R)',
    frontPsi: 30, rearPsi: 32,
    frontPsiLoad: 30, rearPsiLoad: 36,
    notes: 'Pneus de diagonal (bias-ply) — perfil vintage. Solo: F 28–32 PSI / R 30–34 PSI (use 30/32 como base). Com garupa ou bagagem: F 30 PSI / R 36–38 PSI. Pneus bias-ply aceitam ampla variação de pressão sem alteração visual — use manômetro. No Brasil, pneus 3.25-19 e 4.00-18 são raros; marcas importadas como Avon, Shinko e Metzeler oferecem equivalentes. Não monte pneus radiais modernos em rodas projetadas para diagonal sem consulta especializada.',
  },
  {
    modelName: 'CB 750 F Super Sport',
    yearFrom: 1975, yearTo: 1978,
    tireSize: '3.25-19 (F) · 4.00-18 (R)',
    frontPsi: 30, rearPsi: 32,
    frontPsiLoad: 30, rearPsiLoad: 36,
    notes: 'Mesmo pneu e calibragem do CB 750 Four K-series. Pneus de diagonal (bias-ply). Solo: F 30 PSI / R 32 PSI. Com carga: F 30 PSI / R 36 PSI. O F2 com rodas ComStar usa os mesmos tamanhos e pressões — o tipo de roda não muda a calibragem. Calibre sempre com pneus frios. Marcas disponíveis para pneus vintage: Avon, Shinko, Metzeler, Dunlop K70.',
  },
  {
    modelName: 'CB 750 DOHC',
    yearFrom: 1979, yearTo: 1982,
    tireSize: '3.25-19 (F) · 4.00-18 (R)',
    frontPsi: 30, rearPsi: 32,
    frontPsiLoad: 30, rearPsiLoad: 36,
    notes: 'Mesmos pneus de diagonal do CB 750 SOHC. Solo: F 28–32 PSI / R 30–34 PSI. Com carga: R pode ser aumentado até 38 PSI. Algumas versões CB 750 SC (1982) usaram pneu dianteiro 3.50-18 em vez de 3.25-19 — verifique o pneu instalado antes de calibrar. Pneus tubeless ou com câmara dependem do tipo de roda (ComStar = tubeless; raios = com câmara).',
  },
  {
    modelName: 'CB 750 Nighthawk',
    yearFrom: 1991, yearTo: 2003,
    tireSize: '110/80-18 (F) · 140/70-17 (R)',
    frontPsi: 33, rearPsi: 33,
    frontPsiLoad: 33, rearPsiLoad: 41,
    notes: 'Pneus radiais modernos (aro assimétrico: 18" dianteiro, 17" traseiro). Solo até 90 kg: F 33 PSI / R 33 PSI. Com carga máxima: F 33 PSI / R 41 PSI. Calibre sempre com pneus frios. Pneus 110/80-18 dianteiros têm boa disponibilidade no Brasil (Michelin, Pirelli, Dunlop). O aro 18" dianteiro é menos comum que o 17" — confirme disponibilidade antes de desmontar.',
  },
  {
    modelName: 'CB 750 Hornet',
    yearFrom: 2023, yearTo: null,
    tireSize: '120/70ZR17 (F) · 160/60ZR17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Pneus radiais ZR de alto desempenho. Pressão oficial Honda (manual do proprietário): F 36 PSI / R 42 PSI. Esses valores são superiores ao CB 500 Hornet (32/36 PSI) — respeite a diferença. Calibre com pneus frios. O pneu traseiro 160/60ZR17 é mais largo que o CB 500F/X (160/60-17 sem Z) — confirme especificação Z ao comprar. Pneus recomendados para o CB 750 Hornet: Michelin Road 6, Pirelli Rosso IV, Bridgestone S23.',
  },
]

// ─── Seed principal ───────────────────────────────────────────────────────────

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map(t => ({ ...t, category: 'MACETES' as Cat })),
      ...block.PROBLEMAS.map(t => ({ ...t, category: 'PROBLEMAS' as Cat })),
    ]

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })
    await prisma.tip.createMany({
      data: allTips.map((tip, i) => ({
        modelName: block.modelName,
        yearFrom:  null,
        yearTo:    null,
        severity:  tip.severity,
        category:  tip.category,
        title:     tip.title,
        body:      tip.body,
        order:     i,
      })),
    })

    console.log(`✅ ${block.modelName}: ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: { ...tp } })
  }
  console.log(`🔵 TirePressure: ${TIRE_PRESSURES.map(t => t.modelName).join(', ')}`)

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map(b => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  const totalTips = BLOCKS.reduce((sum, b) => sum + b.MACETES.length + b.PROBLEMAS.length, 0)
  console.log(`\n✅ Honda CB 750 seed concluído! ${BLOCKS.length} modelos, ${totalTips} tips, ${TIRE_PRESSURES.length} calibragens, ${MAINTENANCE_ITEMS.length} itens de manutenção`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
