// seed-honda-cbr450.ts — Honda CBR 450 e CBR 450 SR (1990–1995)
// FIPE: "CBR 450" (código 2774) e "CBR 450 SR" (código 2775)
// PC26: motor 444cc bicilíndrico paralelo DOHC refrigerado a líquido
// CBR 450 = versão base (carenagem parcial/naked)
// CBR 450 SR = Super Road (carenagem completa, full-fairing)
// Motos com 30+ anos em circulação — manutenção de vintage é o foco principal
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

// ─── CBR 450 — Macetes ────────────────────────────────────────────────────────

const CBR450_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — ~3,0 L com filtro; motor bicilíndrico de 444cc DOHC exige qualidade e frequência',
    body: 'Motor PC26 de 444cc bicilíndrico paralelo DOHC usa 10W-40 com certificação JASO MA (ou MA2). Capacidade: ~2,8 L sem filtro; ~3,0 L com filtro novo. Em motos com 30+ anos de vida, o óleo se degrada ainda mais rápido por conta de vedações de borracha envelhecidas que permitem pequena contaminação por gases de blow-by. Troque a cada 3.000–4.000 km ou 6 meses, o que vier primeiro. Recomendados: Motul 7100 4T 10W-40, Castrol Power1 Racing 10W-40. Após cada troca, observe o óleo retirado: metalizado indica desgaste interno; turvo e aquoso indica contaminação por fluido de arrefecimento (junta de cabeçote comprometida — emergência). Em motores parados por anos, complete a primeira troca com óleo mais leve 10W-30 para lavar o acúmulo interno antes de trocar novamente com 10W-40.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK CR8EH-9 — 2 velas no bicilíndrico; gap 0,9 mm; troca a cada 8.000 km',
    body: 'O motor tem 2 cilindros = 2 velas. Vela padrão: NGK CR8EH-9 (código de calor 8, gap 0,9 mm). Troque sempre o par completo — uma vela gasta e outra nova cria desequilíbrio de queima notável num bicilíndrico. Em motos paradas por anos, substitua as velas imediatamente antes de tentar a partida: eletrodo oxidado e depósito de carbono impedem a ignição e o pior caso é vela quebrada no cabeçote por torque errado de desmontagem. Torque de aperto: 16 N.m. Sintomas de vela comprometida: partida difícil a frio, funcionamento irregular entre cilindros (sente-se como "coxeio"), fumaça azul num lado do escapamento apenas.',
  },
  {
    severity: 'WARN',
    title: 'Carburadores Keihin CV 32 mm — diafragmas de borracha têm 30+ anos; inspecione antes de qualquer outra coisa',
    body: 'Os 2 carburadores Keihin CV (constant velocity) da CBR 450 têm diafragmas de borracha que controlam a agulha de dosagem. Depois de 30+ anos, esses diafragmas INEVITAVELMENTE estão ressecados, endurecidos ou furados — mesmo que a moto "funcione", um diafragma furado causa marcha lenta elevada, consumo alto e perda de potência progressiva. Diagnóstico: remova a tampa superior de cada carburador (4 parafusos), levante o conjunto e inspecione o diafragma contra a luz — qualquer furo ou rasgo, substitua. Diafragmas de reposição: fabricantes como All Balls Racing (EUA), Keyster ou Carburetor Parts Shop produzem kits compatíveis. Preço importado: R$80–180 por carburador. Nunca "pule" essa inspeção em motos de colecção paradas há anos.',
  },
  {
    severity: 'OK',
    title: 'Kit de reconstrução dos carburadores — limpeza ultrassônica + jets + agulha + diafragma = motor novo',
    body: 'Numa CBR 450 com anos de parada, os carburadores quase certamente precisam de reconstrução completa: (1) Desmonte os 2 carburadores completamente; (2) Limpeza ultrassônica de todos os componentes metálicos — R$80–150 em loja de ultrassom; (3) Substitua diafragmas, agulha de dosagem, boia, válvula de boia e jets se desgastados — kit Keyster ou All Balls ~R$200–350 por carburador; (4) Depois de montar, sincronize os 2 carburadores com vacuômetro de coluna (depressão igual nos 2 coletores). A CBR 450 carburada responde dramaticamente a carburadores limpos e bem regulados — pilotos frequentemente relatam "parece outra moto" após uma reconstrução completa dos carbs num exemplar neglenciado.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de válvulas DOHC 8 válvulas — a cada 12.000 km; especialmente crítica em motor parado por anos',
    body: 'Motor DOHC com 4 válvulas por cilindro (8 total) exige regulagem periódica. Folgas com motor frio: admissão ~0,15 mm / escape ~0,20 mm (confirme no manual específico do seu ano). Em moto parada por 5+ anos, as folgas de válvula mudam por oxidação dos shims e desgaste dos assentos — não assuma que estão corretas. Nunca ligue o motor de uma CBR 450 reativada sem antes checar as folgas de válvula: motor sem óleo nas cames (que leva minutos para chegar) + folgas incorretas = desgaste acelerado na partida. Procedimento: aqueça o motor brevemente (se possível), desligue, aguarde esfriar e meça. Serviço em oficina especializada em vintage: R$300–600.',
  },
  {
    severity: 'OK',
    title: 'Sistema de arrefecimento a líquido — hoses de borracha de 30 anos são uma emergência silenciosa',
    body: 'A CBR 450 tem motor refrigerado a líquido com radiador, termostato e mangueiras de borracha. Depois de 30 anos, as mangueiras de borracha endurecem, racham internamente (o exterior pode parecer OK) e podem estourar sob pressão em temperatura de operação. Consequência: motor superaquece em segundos; junta de cabeçote queima; custo R$800–2.000+. Procedimento de reativação de uma CBR 450 vintage: (1) substitua TODAS as mangueiras do sistema de arrefecimento antes da primeira saída longa; (2) troque o fluido de arrefecimento (etileno-glicol 50/50); (3) substitua o termostato preventivamente (peça barata, R$50–80 equivalente universal); (4) inspecione as aletas do radiador por entupimento. Mangueiras universais de silicone (azul, vermelho) do mesmo diâmetro são alternativas duráveis e mais resistentes ao calor que borracha original.',
  },
  {
    severity: 'OK',
    title: 'Corrente 530 — lubrifique a cada 800 km; kit DID 530VX3 + JT Sprockets substitui o original descontinuado',
    body: 'A CBR 450 usa corrente padrão 530 × 104 elos. Kits originais Honda são descontinuados para essa moto — use aftermarket de qualidade. Recomendado: DID 530VX3 ou RK 530GXW (x-ring) + JT Sprockets para a CBR 450 (pinhão 14T, coroa 42T — confirme com o manual do seu ano, pode variar). Lubrifique a cada 800 km com spray de corrente para o-ring. Sinais de corrente gasta em moto de colecção: elos enferrujados, links que não se curvam suavemente, alongamento visível (mais de 2 cm além da marca máxima de ajuste). Nunca tente "rejuvenescer" corrente enferrujada de moto parada — ela fraca internamente e pode quebrar em aceleração. Custo do kit novo: R$300–500 importado.',
  },
  {
    severity: 'OK',
    title: 'Peças de reposição OEM descontinuadas — conheça os fornecedores alternativos antes de precisar',
    body: 'Com 30+ anos, muitas peças originais Honda para a CBR 450 estão descontinuadas no Brasil e no Japão. Estratégia de manutenção para vintage: (1) Mercado americano: RevZilla, BikeBandit e Amazon EUA ainda têm peças NOS (new old stock) e aftermarket; (2) Mercado japonês: Webike Japan e Yahoo Auctions Japan são fontes de peças originais usadas e NOS; (3) Clubs de proprietários: CBR 450 tem comunidade ativa no Brasil — grupos no Facebook/WhatsApp são fontes de peças e informação; (4) Peças intercambiáveis: alguns componentes da CBR 450 compartilham especificações com a CB 450 DX e CBR 400 da mesma era (verifique por código de peça Honda); (5) Para borrachas e vedações sem código: medição com paquímetro + busca por equivalente universal funciona bem.',
  },
  {
    severity: 'OK',
    title: 'Sistema elétrico de 30 anos — conectores oxidados são a causa raiz de 80% dos problemas elétricos',
    body: 'O chicote elétrico de uma CBR 450 de 1990–1995 tem conectores que oxidam ao longo das décadas, aumentando a resistência elétrica e causando problemas intermitentes impossíveis de diagnosticar sem inspecionar fisicamente. Checklist elétrico para qualquer CBR 450 vintage: (1) Desmonte e limpe TODOS os conectores com spray de contato elétrico WD-40 Specialist Electrical ou CRC 2-26; (2) Aplique vaselina nos conectores reconectados para proteger da umidade; (3) Verifique o estado da fiação no quadro (pontos de fricção e calor — sob o tanque e próximo ao motor); (4) O regulador/retificador original dessas motos é SCRI e provavelmente precisará de substituição — versões MOSFET universais (Shindengen, Rick\'s Motorsport) são alternativas duráveis.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro a tambor (maioria dos modelos CBR 450) — ajuste e lona são muitas vezes negligenciados',
    body: 'A maioria dos modelos CBR 450 da era 1990–1995 usa freio traseiro a tambor (drum brake), diferente da versão SR que pode ter disco. O freio a tambor é eficiente quando ajustado e com lona em bom estado, mas em motos paradas por anos: (1) a lona pode ter absorvido óleo se o retentor do eixo traseiro vazou — lona oleada não freia (substitua, não limpe com solventem); (2) o cabo de aço do freio traseiro pode estar emperrado internamente — lubrifique com Loctite 8102 ou substitua; (3) o ajuste do tambor é por tensão do cabo — após anos de uso, a lona desgastou e a tensão máxima do cabo pode ser insuficiente. Lona de reposição para CBR 450: busque por kits universais de lona com a mesma espessura e arco.',
  },
  {
    severity: 'OK',
    title: 'Tanque de combustível de aço — ferrugem interna é quase certa em motos paradas; tratamento obrigatório',
    body: 'Todo tanque de aço de moto parada por 5+ anos com pouco ou nenhum combustível tem ferrugem interna. Ferrugem + carburadores = desastre. Procedimento antes de ligar a moto: (1) Remova o tanque e inspecione o interior com lanterna — ferrugem em flocos indica problema sério; (2) Lave com água + sabão, esvazie completamente; (3) Trate com limpador de ferrugem à base de ácido fosfórico (Ferroferro, POR-15 Tank Prep); (4) Aplique selante interno de tanque (POR-15 Tank Sealer ou Caswell Fuel Tank Liner) — R$180–350 o kit completo; (5) Substitua o filtro de combustível inline após o tratamento. Em casos de ferrugem avançada com perfurações, solda especializada em tanque de combustível (R$150–400 em funileiro especializado) é mais econômica que tanque original descontinuado.',
  },
  {
    severity: 'OK',
    title: 'Pneus de época ressecados — substitua ANTES de rodar, mesmo que pareçam bons visualmente',
    body: 'Pneus de uma CBR 450 vintage têm alto risco de estar com borracha ressecada e microfissuras, independente do nível de desgaste aparente. Pneu com mais de 6 anos perde entre 30–50% do coeficiente de atrito original — o composto endurece e a capacidade de agarrar em piso molhado cai dramaticamente. Verifique o código DOT: 4 dígitos nos flancos do pneu (ex: 2318 = 23ª semana de 2018). Em motos de colecção dos anos 90 que ficaram paradas: troque ambos os pneus ANTES da primeira saída. Para a CBR 450, pneus 110/80-17 (F) e 130/80-17 (R) ainda são produzidos por Pirelli (MT66), Dunlop (K555) e Metzeler (ME77). Nunca faça testes de aceleração ou curvas agressivas com pneus vintage — é risco de vida real.',
  },
]

// ─── CBR 450 — Problemas ──────────────────────────────────────────────────────

const CBR450_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Ligar o motor após anos de parada sem preparação — risco imediato de destruição em segundos',
    body: 'NUNCA ligue o motor de uma CBR 450 que ficou parada por 2+ anos sem a seguinte preparação mínima: (1) Troque o óleo e filtro — o óleo antigo tem ácidos e partículas que atacam mancais na primeira partida; (2) Retire as velas e borrife óleo de motor nos cilindros, gire o motor à mão algumas vezes para lubrificar antes da ignição; (3) Verifique o nível de fluido de arrefecimento; (4) Inspecione o sistema de combustível — filtro entupido causa funcionamento irregular mas também pode explodir mangueiras de combustível envelhecidas sob pressão da bomba; (5) Verifique o óleo de freio (ponto de ebulição cai drasticamente com absorção de umidade por anos). Preparação adequada: 1–2 fins de semana de trabalho. Ligar sem preparação pode destruir o motor em minutos (mancais secos) ou causar incêndio (mangueiras de combustível rachadas com vapor de gasolina próximo a superfícies quentes).',
  },
  {
    severity: 'DANGER',
    title: 'Mangueiras de combustível e vácuo ressecadas — risco de incêndio ou perda de controle',
    body: 'As mangueiras de combustível e vácuo de borracha da CBR 450 têm 30+ anos e estão inevitavelmente ressecadas. Uma mangueira de combustível que racha em movimento derrama gasolina sobre o motor quente — o resultado pode ser incêndio imediato. Substituição obrigatória antes de rodar: (1) Toda mangueira de combustível entre tanque, torneira petcock e carburadores; (2) Mangueiras de vácuo do sistema de ventilação dos carburadores; (3) A torneira petcock (reserve/ON/OFF) também tem membrana de borracha que pode estar colada ou perfurada — teste se veda corretamente na posição OFF. Mangueiras de substituição: silicone de combustível Ø6mm e Ø8mm vendidas por metro em autopeças — R$15–25/metro. Este é o item de segurança número 1 em qualquer CBR 450 vintage.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador original tipo SCRI — queima e deixa a bateria sem carga ou destrói o estátor',
    body: 'O regulador/retificador original da CBR 450 (30+ anos de uso) está no limite da vida útil mesmo que a moto "funcione". O tipo SCRI dissipa o excesso de energia em calor — com o conector plástico original já quebradiço, o risco de curto é alto. Sintomas: bateria não carrega, luzes piscando em aceleração, fusíveis queimando com frequência. Solução: substitua por regulador MOSFET universal de 3 fases, disponível em sites especializados (Electrosport, Rick\'s Motorsport, ou equivalentes chineses para Honda vintage). Preço: R$150–400. Cuidado: confira se o estátor do alternador ainda está funcional (meça a resistência das bobinas: devem estar entre 0,5–1,5 Ohm cada fase). Se o estátor queimou junto com o regulador: rebobinagem em oficina elétrica R$300–600.',
  },
  {
    severity: 'WARN',
    title: 'Rolamentos de roda e direção — após 30 anos são obrigatoriamente desgastados; substituição preventiva',
    body: 'Os rolamentos de roda dianteira, traseira e da coluna de direção de uma CBR 450 com 30+ anos têm graxa envelhecida que perdeu as propriedades lubrificantes e podem ter pistas com oxidação superficial. Sintoma de rolamento de roda: vibração em alta velocidade que piora progressivamente, som de "rolha" girando ou ranger ao girar a roda à mão. Diagnóstico da direção: suspenso no cavaleiro central, segure o garfo pelos tubos e tente mover para frente/trás — qualquer folga = rolamento desgastado. Substituição: rolamentos de roda são peças universais (SKF, FAG, NSK) — leve o número de série ao mercado de rolamentos. Rolamento da direção: kits cônicos tapered disponíveis (All Balls Racing #22-1016 ou similar para Honda da era). Custo total dos 3 pares de rolamentos: R$150–350 em peças.',
  },
  {
    severity: 'WARN',
    title: 'Junta do cabeçote queimando — sintoma confunde com carburador ruim; diagnóstico obrigatório',
    body: 'Em motores de 30+ anos, a junta do cabeçote pode estar comprometida por uso anterior inadequado (superaquecimento, parafusos mal torqueados). Sintomas que imitam problema de carburador: (1) Perda de potência progressiva num cilindro; (2) Consumo excessivo de fluido de arrefecimento sem vazamento visível; (3) Óleo com aparência "emulsionada" (café com leite) — fluido de arrefecimento misturado ao óleo; (4) Gases de escapamento com fumaça branca intensa e cheiro adocicado (mesmo com motor quente). Diagnóstico definitivo: teste de compressão (ambos os cilindros devem estar acima de 1.000 kPa, com variação máxima de 200 kPa entre eles). Junta do cabeçote para CBR 450 ainda é encontrada em importadores especializados. Troca inclui verificação do plano do cabeçote (retífica se necessário).',
  },
  {
    severity: 'WARN',
    title: 'Bateria original morta — bateria de 30 anos não aceita carga; substitua por YTX9-BS ou equivalente',
    body: 'A bateria original de uma CBR 450 de 30 anos está completamente morta e não será recuperada por nenhum carregador. A capacidade de uma bateria chumbo-ácido se degrada a cada ciclo de carga/descarga e ao longo do tempo mesmo parada — após 3+ anos parada, está irrecuperável. Bateria de substituição: YTX9-BS ou YTX12-BS (verifique o compartimento) — disponível como Yuasa (R$300–400), Moura (R$200–280) ou Bosch (R$200–260). Alternativa moderna: bateria de lítio LiFePO4 equivalente (Antigravity ou Shorai) — menor peso, maior vida útil, mas custo de R$500–800. Atenção: ao instalar bateria nova, verifique tensão do regulador/retificador antes de carregar a nova — regulador defeituoso destrói a nova bateria em poucas horas.',
  },
  {
    severity: 'WARN',
    title: 'Pastilhas e fluido de freio dianteiro — 30 anos de DOT 4 absorvendo umidade; vapor no freio é risco de morte',
    body: 'O fluido de freio DOT 4 absorve umidade continuamente — após anos parado, o ponto de ebulição cai de 230°C para abaixo de 160°C. Na primeira frenagem intensa, o fluido vaporiza dentro da pinça (vapor não transmite pressão), resultando em pedal/alavanca que vai ao fundo sem frear. É chamado de "vapor lock" — acontece sem aviso. Procedimento obrigatório antes de rodar qualquer CBR 450 vintage: (1) Sangre e substitua TODO o fluido de freio; (2) Inspecione as mangueiras de freio por rachaduras ou balonamento — em mangueiras metálicas de 30 anos, o miolo interno pode ter rachaduras; (3) Inspecione os pistões da pinça por oxidação — pistão de pinça oxidado pode emperrar e causar aquecimento do disco e da pastilha. Custo de rebuild de pinça: R$100–250 em peças (kit vedação).',
  },
  {
    severity: 'WARN',
    title: 'Óleo de garfo envelhecido — garfo rígido ou muito mole impede manuseio seguro',
    body: 'O óleo de garfo de uma CBR 450 parada por anos está oxidado, com contaminação de partículas de desgaste internas e perdeu as propriedades de amortecimento originais. Um garfo com óleo velho pode ficar rígido demais (óleo engrossado pelo frio e oxidação) ou mole demais (óleo degradado). Qualquer dos dois compromete o comportamento em curvas e absorção de impactos. Troca simples: drene o óleo de garfo pelos parafusos de dreno inferiores de cada perna do garfo; substitua por Honda SS-8 10W (ou Motul Fork Oil Expert 10W); quantidade por perna: ~400–450 mL (confirme no manual). Aproveitando a oportunidade: inspecione os retentores superiores por restos de óleo seco acumulado — retentores ressecados = vazamento futuro inevitável. Kit de retentores para garfo 41 mm da CBR 450: busque por equivalentes universais (tamanho: 41 × 54 × 11 mm tipicamente).',
  },
]

// ─── CBR 450 SR — Macetes ─────────────────────────────────────────────────────

const CBR450SR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CBR 450 SR — carenagem completa Full-Fairing de 30 anos; plásticos frágeis exigem manuseio cuidadoso',
    body: 'A CBR 450 SR é a versão Sport Road com carenagem integral completa. Após 30+ anos, os plásticos ABS originais ficam frágeis e quebradiços — especialmente na parte inferior (belly pan) exposta a calor e vibração. Ao remover qualquer peça da carenagem: (1) Nunca force clipes ou presilhas plásticas — use paleta plástica para soltar delicadamente; (2) Antes de qualquer manutenção que exija acesso ao motor, fotografe todos os plásticos removidos e suas fixações (parafusos, arruelas borracha, presilhas) para não perder a sequência; (3) Clipes plásticos quebrados são substituíveis por clipes universais de mesmo diâmetro (R$1–3 cada); (4) Peças de carenagem originais são virtualmente impossíveis de encontrar no Brasil — comunidades online de vintage têm moldadores/pintores especializados em restauração. Trate cada peça original da SR como insubstituível.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — mesmo motor PC26 da CBR 450; ~3,0 L com filtro; troca a cada 3.000–4.000 km',
    body: 'A CBR 450 SR compartilha o mesmo motor PC26 de 444cc bicilíndrico paralelo DOHC. Capacidade: ~3,0 L com filtro. Use 10W-40 JASO MA: Motul 7100 4T, Castrol Power1 Racing ou Honda HP4. Em motores de colecção restaurados, mantenha intervalo de troca reduzido (3.000–4.000 km) — vedações antigas permitem maior contaminação e o óleo perde qualidade mais rápido. Filtro de óleo: o original Honda pode não ter equivalente direto mais disponível — leve o filtro original a uma loja de filtros industriais e busque por equivalente por dimensões (rosca + diâmetro externo + altura). Filtros Hiflo ou K&N para modelos Honda similares da era (CBR 400, CB 450 DX) podem ser compatíveis — verifique por código cruzado.',
  },
  {
    severity: 'WARN',
    title: 'Carburadores Keihin CV 32 mm com diafragmas de 30 anos — prioridade máxima na reativação',
    body: 'Idêntico à CBR 450 base — os 2 carburadores Keihin CV têm diafragmas de borracha que envelhecem inevitavelmente. Na SR com carenagem completa, o acesso aos carburadores é mais trabalhoso: exige remoção de peças da carenagem lateral e do airbox. Aproveite cada vez que abrir a carenagem para inspecionar o estado dos diafragmas. Kit de reconstrução completo: diafragma + agulha + boia + jatos = R$200–350 por carburador (importado de All Balls, Keyster ou equivalente). Após reconstrução e reinstalação, a sincronização dos carburadores é obrigatória com vacuômetro de 4 colunas — na SR, com a carenagem dificultando o acesso, muitas oficinas pulam essa etapa. Exija a sincronização.',
  },
  {
    severity: 'OK',
    title: 'Disco de freio dianteiro — a SR tem disco dianteiro de alumínio; verifique espessura mínima',
    body: 'A CBR 450 SR tem disco de freio dianteiro (a versão base pode ter tambor traseiro na SR que pode ter disco traseiro). O disco de aço inoxidável/alumínio de 30 anos pode ter: (1) espessura abaixo do mínimo por desgaste — mínimo típico gravado no próprio disco (ex: 3,5 mm); (2) empenamento por superaquecimento passado — disco empenado causa vibração na alavanca de freio proporcional à velocidade; (3) ranhuras profundas que reduzem a área de contato com a pastilha. Diagnóstico de empenamento: com a roda suspensa, gire lentamente e observe o disco próximo a uma pastilha estática — oscilação lateral > 0,3 mm = disco empenado. Troca do disco: peça original descontinuada; use disco universal de mesmo diâmetro (busque por código de bolsa no disco). Pastilhas: EBC FA093HH são alternativas modernas de qualidade.',
  },
  {
    severity: 'OK',
    title: 'Corrente 530 — mesma especificação da CBR 450 base; lubrifique a cada 800 km',
    body: 'CBR 450 SR usa corrente 530 × 104 elos, igual à versão base. Mesmas recomendações: DID 530VX3 ou RK 530GXW + JT Sprockets. Detalhe específico da SR: com a carenagem completa, o acesso à corrente para lubrificação é ligeiramente mais limitado. Instale suporte de lubrificador automático de corrente (Scott Oiler, R$200–350) — elimina a lubrificação manual e aumenta a vida útil da corrente. A SR com carenagem completa também protege melhor a corrente da chuva comparada à versão naked — mas não elimina a necessidade de lubrificação frequente. Em motos com carenagem, é comum que o proprietário esqueça de lubrificar a corrente por "não ver" a sujeira acumulada — inspecione mesmo que não pareça sujo por fora.',
  },
  {
    severity: 'OK',
    title: 'Sistema elétrico — verifique o feixe de cabos sob a carenagem frontal; ponto crítico de oxidação',
    body: 'Na CBR 450 SR com carenagem completa, o feixe de cabos elétrico fica encapsulado entre a carenagem frontal e o motor — área de alto calor e umidade acumulada. Depois de 30 anos, o isolamento plástico dos cabos sob a carenagem pode ter rachaduras causadas pelo calor cíclico. Ao remover a carenagem frontal durante qualquer manutenção: (1) Inspecione visualmente o estado de CADA cabo visível — isolamento rachado pode criar curto com chassis; (2) Verifique os pontos de passagem de cabos pelo quadro (grommets borracha que podem ter secado); (3) Identifique qualquer cabo emendado com fita isolante — re-faça com cabo original soldado e termorretráil. Problema elétrico num feixe de 30 anos é difícil de diagnosticar após o fato — inspeção preventiva enquanto está aberto é muito mais eficiente.',
  },
  {
    severity: 'OK',
    title: 'Valor de mercado da SR — carenagem original completa e intacta é o item mais valioso do conjunto',
    body: 'A CBR 450 SR com carenagem original completa, sem raladuras nem quebras, tem valor de mercado significativamente superior a exemplares incompletos. No mercado de motos vintage no Brasil, uma SR bem conservada com carenagem original pode valer 50–100% mais que a mesma moto com carenagem danificada. Dica para proprietários: (1) Mantenha as peças originais mesmo que instale peças de proteção aftermarket — guarde a carenagem original em local seco para revenda; (2) Nunca pinte a carenagem com cores diferentes das originais sem documentar o esquema original; (3) Adesivos/decals originais da CBR 450 SR podem ser reproduzidos por plotters especializados em motos vintage — uma cópia fiel aumenta o valor de apresentação; (4) Fotografie a moto completa e bem iluminada para registro histórico.',
  },
  {
    severity: 'WARN',
    title: 'Vedações de óleo do motor — retentores de 30 anos vazam; mancha no chão embaixo do motor é alerta',
    body: 'Em motores de 30+ anos, os retentores de óleo de virabrequim, eixo de saída e tampas laterais do motor secam progressivamente. Sintomas: mancha de óleo no chão embaixo do motor após uma noite estacionado, gotejamento de óleo pelo ponteiro do tacômetro (retentores de eixo de instrumentos), e vazamento pelas tampas de inspeção das cames. Um motor que perde óleo de forma contínua pode secar em quilômetros (especialmente num bicilíndrico com apenas 3,0 L de capacidade). Prioridade de substituição: retentores de virabrequim esquerdo e direito + eixo da embreagem. Estas peças podem ter equivalentes universais pelo tamanho (meça o eixo + alojamento com paquímetro antes de buscar o equivalente). Custo típico de retentores: R$20–60 cada, em borrachas industriais.',
  },
]

// ─── CBR 450 SR — Problemas ───────────────────────────────────────────────────

const CBR450SR_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Mangueiras de combustível e vácuo de 30 anos — risco de incêndio; substitua ANTES de rodar',
    body: 'Idêntico à CBR 450 base, mas na SR o acesso às mangueiras é mais difícil com a carenagem. Todas as mangueiras de combustível e vácuo de borracha DEVEM ser substituídas antes da primeira saída. Na SR, aproveite a remoção da carenagem (que será necessária para acesso ao motor) para trocar mangueiras em todo o trajeto do circuito de combustível. Mangueiras de combustível de silicone colorido (azul, vermelho) de diâmetro correto ficam bonitas à vista quando a carenagem é aberta para manutenção — além de mais duráveis que a borracha original. A torneira petcock da CBR 450 SR tem membrana de vácuo que aciona a abertura do combustível — se esta membrana estiver perfurada, a gasolina goteja continuamente independente da posição da torneira. Substitua a membrana do petcock antes de qualquer outra coisa.',
  },
  {
    severity: 'WARN',
    title: 'Parafusos de fixação da carenagem arruinados — fendas dilaceradas e roscas soltando do plástico',
    body: 'Após 30 anos de abertura e fechamento por mecânicos (com chaves de fenda ruins ou impacto), os parafusos autorroscantes da carenagem da CBR 450 SR têm fendas dilaceradas e os receptáculos plásticos perdem a rosca. Isso cria painéis que ficam soltos e vibram em alta velocidade — incômodo e potencialmente perigoso se um painel soltar em movimento. Soluções: (1) Parafusos com cabeça danificada: use extrator de parafusos (easy-out) ou solde uma porca na cabeça para ter pega; (2) Furos plásticos com rosca danificada: insertos de reparo de rosca plástica (HeliCoil para plástico) ou cola de borracha + novo parafuso menor; (3) Substitua parafusos Phillips antigos por parafusos tipo Torx ou Allen — muito mais resistentes a ferramentas inadequadas de mecânicos futuros.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador e estátor — os mesmos problemas da CBR 450 base, agravados pelo encapsulamento da carenagem',
    body: 'Na CBR 450 SR, o regulador/retificador fica posicionado próximo ao motor e encapsulado pela carenagem lateral — temperatura ainda mais alta que na versão aberta. O risco de falha é idêntico ao da versão base, mas a consequência de bateria sem carga é mais difícil de notar em baixa velocidade (com carenagem, você não vê o chicote ou conectores facilmente). Sintomas específicos na SR: instrumentos com leitura errática em rotação alta, farol que pulsa em aceleração, luz de bateria intermitente. Diagnóstico: tensão nos bornes da bateria com motor em 4.000 rpm — deve estar entre 13,8 V e 14,8 V. Abaixo de 12,5 V = regulador falhou. A SR com carenagem dificulta a dissipação de calor do regulador MOSFET de reposição — instale o novo regulador em local com boa ventilação, não encapsulado contra a carenagem.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento com carenagem completa em trânsito — o airbox original é fundamental para ventilação do motor',
    body: 'A carenagem integral da CBR 450 SR foi projetada para conduzir o ar de forma aerodinamicamente eficiente tanto para o motor (combustão) quanto para o radiador (arrefecimento). Motos que sofreram modificações no airbox ou na entrada de ar da carenagem podem superaquecer em trânsito lento, pois o fluxo original de ar para o radiador é comprometido. Se a SR está superaquecendo em trânsito: (1) verifique se o airbox original está presente e sem entupimentos; (2) verifique se as aberturas dianteiras da carenagem não estão obstruídas por dirt ou insetos; (3) o ventilador elétrico do radiador deve ligar automaticamente quando o fluido atinge ~100°C — teste se está funcionando. Nunca remova o airbox original para "respirar melhor" — prejudica tanto o carburador quanto o arrefecimento.',
  },
  {
    severity: 'WARN',
    title: 'Buchas do balancim de direção (steering damper) e cabeçote — vibração no guidão em alta velocidade',
    body: 'A CBR 450 SR tem um sistema de amortecimento de direção (steering damper) que após 30 anos pode ter buchas de borracha envelhecidas. Com as buchas gastas, a moto exibe oscilação do guidão (tank slapper) em alta velocidade acima de 120 km/h — especialmente ao passar por irregularidades no asfalto. Diagnóstico: com a moto no cavaleiro central e a roda suspensa, movimente o guidão de ponta a ponta — qualquer folga além do movimento suave indica problema. Buchas universais de mesmo diâmetro (borracha ou poliuretano) substituem as originais descontinuadas. A cabeça de direção (steering head bearings) também deve ser inspecionada nessa oportunidade — substitua pelos rolamentos cônicos tapered (All Balls ou equivalente) se houver folga.',
  },
  {
    severity: 'WARN',
    title: 'Peças de carenagem originais impossíveis de encontrar — cada peça perdida ou quebrada é potencialmente irrecuperável',
    body: 'A maior "dor de dono" específica da CBR 450 SR é a impossibilidade de encontrar peças de carenagem originais em caso de queda ou dano. Estratégias para preservação do conjunto: (1) Instale protetores de tanque e carenagem (gel pad, film de proteção transparente) para evitar arranhões cotidianos; (2) Em estacionamentos, sempre use capa protetora para evitar quedas de outras motos sobre a carenagem; (3) Comunidades de CBR vintage no Facebook têm grupos específicos de classificados — quando aparecem peças originais, o tempo de resposta deve ser horas, não dias; (4) Fibra de vidro ou poliuretano moldado: um moldador especializado pode reproduzir painéis a partir de uma peça intacta como molde — custo R$300–800 por peça reproduzida, mas preserva o visual; (5) Imprimir em 3D suportes e peças menores (presilhas, brackets) que são impossíveis de achar.',
  },
]

// ─── Calibragens ──────────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName:    'CBR 450',
    yearFrom:     1990,
    yearTo:       1995,
    tireSize:     '110/80-17 (F) · 130/80-17 (R)',
    frontPsi:     32,
    rearPsi:      36,
    frontPsiLoad: 32,
    rearPsiLoad:  40,
    notes:        'Pneus de moto vintage da era 1990s. Verifique o código DOT — pneus com mais de 6 anos devem ser substituídos mesmo com sulcos aparentes (borracha endurece e perde coeficiente de atrito). Use Pirelli MT66, Dunlop K555 ou Metzeler ME77 como substituições modernas compatíveis.',
  },
  {
    modelName:    'CBR 450 SR',
    yearFrom:     1990,
    yearTo:       1995,
    tireSize:     '110/80-17 (F) · 130/80-17 (R)',
    frontPsi:     32,
    rearPsi:      36,
    frontPsiLoad: 32,
    rearPsiLoad:  40,
    notes:        'Mesmas especificações de pneu da CBR 450 base. A carenagem completa SR não altera as pressões recomendadas. Confirme sempre com o adesivo na balança do banco ou no manual para o ano específico do seu exemplar.',
  },
]

// ─── Manutenção ───────────────────────────────────────────────────────────────

const CBR450_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CBR 450', yearFrom: 1990, yearTo: 1995, component: 'Óleo do motor (10W-40 JASO MA) + filtro', intervalKm: 3500, intervalMonths: 6, notes: 'Capacidade: ~3,0 L com filtro. Motul 7100 4T ou Castrol Power1. Em motor de 30+ anos, reduza para 3.000 km.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CBR 450', yearFrom: 1990, yearTo: 1995, component: 'Velas de ignição (NGK CR8EH-9) — jogo de 2', intervalKm: 8000, intervalMonths: 12, notes: 'Gap 0,9 mm. Troque o par completo. Em moto vintage reativada: substitua imediatamente antes da primeira ligada.', priority: 'HIGH', order: 2 },
  { modelName: 'CBR 450', yearFrom: 1990, yearTo: 1995, component: 'Regulagem de válvulas (DOHC 8 válvulas)', intervalKm: 12000, intervalMonths: 24, notes: 'Adm: ~0,15 mm / Esc: ~0,20 mm com motor frio. OBRIGATÓRIO antes de ligar moto parada por anos.', priority: 'CRITICAL', order: 3 },
  { modelName: 'CBR 450', yearFrom: 1990, yearTo: 1995, component: 'Reconstrução dos carburadores Keihin CV', intervalKm: null, intervalMonths: null, notes: 'Em qualquer moto parada 2+ anos: diafragmas + agulha + jets. Kit All Balls ou Keyster importado.', priority: 'CRITICAL', order: 4 },
  { modelName: 'CBR 450', yearFrom: 1990, yearTo: 1995, component: 'Lubrificação da corrente de transmissão (530)', intervalKm: 800, intervalMonths: null, notes: 'Spray de corrente para o-ring. Nunca WD-40 puro. Folga: 20–30 mm ponto médio inferior.', priority: 'HIGH', order: 5 },
  { modelName: 'CBR 450', yearFrom: 1990, yearTo: 1995, component: 'Kit de transmissão (corrente 530 + coroa + pinhão)', intervalKm: 18000, intervalMonths: null, notes: 'DID 530VX3 + JT Sprockets. Troque os 3 juntos. Peças originais descontinuadas — use aftermarket.', priority: 'HIGH', order: 6 },
  { modelName: 'CBR 450', yearFrom: 1990, yearTo: 1995, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: 12, notes: 'Original descontinuado — busque por equivalente filtro esportivo de mesmo tamanho de caixa. K&N universal cortável.', priority: 'MEDIUM', order: 7 },
  { modelName: 'CBR 450', yearFrom: 1990, yearTo: 1995, component: 'Fluido de freio DOT 4 — troca obrigatória em vintage', intervalKm: null, intervalMonths: 24, notes: 'Substituição OBRIGATÓRIA antes da primeira saída em moto de colecção. Risco de vapor lock em fluido de 30 anos.', priority: 'CRITICAL', order: 8 },
  { modelName: 'CBR 450', yearFrom: 1990, yearTo: 1995, component: 'Líquido de arrefecimento (etileno-glicol 50/50)', intervalKm: null, intervalMonths: 24, notes: 'Trocar preventivamente + TODAS as mangueiras de borracha antes da primeira saída longa. ~1,5–2,0 L totais.', priority: 'CRITICAL', order: 9 },
  { modelName: 'CBR 450', yearFrom: 1990, yearTo: 1995, component: 'Mangueiras de combustível e vácuo (silicone)', intervalKm: null, intervalMonths: 60, notes: 'Borracha de 30 anos: risco de incêndio por ruptura. Substitua por silicone de combustível universal antes de rodar.', priority: 'CRITICAL', order: 10 },
  { modelName: 'CBR 450', yearFrom: 1990, yearTo: 1995, component: 'Óleo do garfo Ø41 mm + retentores', intervalKm: 20000, intervalMonths: null, notes: 'Honda SS-8 10W ou Motul Fork Oil 10W. ~400–450 mL por perna. Retentores: kit universal 41×54×11 mm.', priority: 'MEDIUM', order: 11 },
  { modelName: 'CBR 450', yearFrom: 1990, yearTo: 1995, component: 'Rolamentos (roda dianteira, traseira e direção)', intervalKm: null, intervalMonths: null, notes: 'Em moto de 30+ anos: substitua preventivamente. SKF/FAG/NSK compatíveis por dimensão (número gravado no rolamento).', priority: 'HIGH', order: 12 },
  { modelName: 'CBR 450', yearFrom: 1990, yearTo: 1995, component: 'Verificação do regulador/retificador + estátor', intervalKm: null, intervalMonths: 12, notes: 'Tensão: 13,8–14,8 V a 4.000 rpm. Regulador original SCRI: substitua por MOSFET universal. Estátor: resistência 0,5–1,5 Ohm/fase.', priority: 'HIGH', order: 13 },
]

const CBR450SR_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CBR 450 SR', yearFrom: 1990, yearTo: 1995, component: 'Óleo do motor (10W-40 JASO MA) + filtro', intervalKm: 3500, intervalMonths: 6, notes: 'Capacidade: ~3,0 L com filtro. Mesmo motor PC26 da CBR 450. Em vintage: reduza para 3.000 km por intervalo.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CBR 450 SR', yearFrom: 1990, yearTo: 1995, component: 'Velas de ignição (NGK CR8EH-9) — jogo de 2', intervalKm: 8000, intervalMonths: 12, notes: 'Gap 0,9 mm. Substitua imediatamente em moto vintage reativada antes da primeira ligada.', priority: 'HIGH', order: 2 },
  { modelName: 'CBR 450 SR', yearFrom: 1990, yearTo: 1995, component: 'Regulagem de válvulas (DOHC 8 válvulas)', intervalKm: 12000, intervalMonths: 24, notes: 'Adm: ~0,15 mm / Esc: ~0,20 mm com motor frio. OBRIGATÓRIO antes de reativar moto parada.', priority: 'CRITICAL', order: 3 },
  { modelName: 'CBR 450 SR', yearFrom: 1990, yearTo: 1995, component: 'Reconstrução dos carburadores Keihin CV', intervalKm: null, intervalMonths: null, notes: 'Diafragmas perished em 30 anos. Kit All Balls ou Keyster. Sincronização obrigatória com vacuômetro após reinstalar.', priority: 'CRITICAL', order: 4 },
  { modelName: 'CBR 450 SR', yearFrom: 1990, yearTo: 1995, component: 'Lubrificação da corrente de transmissão (530)', intervalKm: 800, intervalMonths: null, notes: 'Corrente 530 × 104 elos. Spray o-ring compatível. Na SR com carenagem: inspecione mesmo sem ver acúmulo externo.', priority: 'HIGH', order: 5 },
  { modelName: 'CBR 450 SR', yearFrom: 1990, yearTo: 1995, component: 'Kit de transmissão (corrente 530 + coroa + pinhão)', intervalKm: 18000, intervalMonths: null, notes: 'DID 530VX3 + JT Sprockets. Peças OEM descontinuadas. Troque sempre os 3 juntos.', priority: 'HIGH', order: 6 },
  { modelName: 'CBR 450 SR', yearFrom: 1990, yearTo: 1995, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: 12, notes: 'Airbox original da SR — exige remoção de carenagem lateral para acesso. Original descontinuado; use equivalente universal.', priority: 'MEDIUM', order: 7 },
  { modelName: 'CBR 450 SR', yearFrom: 1990, yearTo: 1995, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Circuitos dianteiro (disco) e traseiro. Substituição obrigatória em moto de colecção. Vapor lock = risco de morte.', priority: 'CRITICAL', order: 8 },
  { modelName: 'CBR 450 SR', yearFrom: 1990, yearTo: 1995, component: 'Líquido de arrefecimento + mangueiras (silicone)', intervalKm: null, intervalMonths: 24, notes: 'Troque o fluido e substitua TODAS as mangueiras de borracha por silicone antes de rodar. ~1,5–2,0 L de fluido.', priority: 'CRITICAL', order: 9 },
  { modelName: 'CBR 450 SR', yearFrom: 1990, yearTo: 1995, component: 'Mangueiras de combustível e petcock', intervalKm: null, intervalMonths: 60, notes: 'Silicone de combustível universal. Membrana do petcock: verifique vedação na posição OFF antes de instalar o tanque.', priority: 'CRITICAL', order: 10 },
  { modelName: 'CBR 450 SR', yearFrom: 1990, yearTo: 1995, component: 'Óleo do garfo Ø41 mm + retentores', intervalKm: 20000, intervalMonths: null, notes: 'Motul Fork Oil 10W. ~400–450 mL por perna. Retentores universais 41×54×11 mm. Troque ao menor sinal de vazamento.', priority: 'MEDIUM', order: 11 },
  { modelName: 'CBR 450 SR', yearFrom: 1990, yearTo: 1995, component: 'Disco e pastilhas de freio dianteiro', intervalKm: null, intervalMonths: null, notes: 'Verifique espessura mínima gravada no disco. EBC FA093HH ou similar. Inspecione pistão da pinça por oxidação.', priority: 'HIGH', order: 12 },
  { modelName: 'CBR 450 SR', yearFrom: 1990, yearTo: 1995, component: 'Feixe elétrico + conectores sob a carenagem frontal', intervalKm: null, intervalMonths: 24, notes: 'Limpe todos os conectores com spray de contato elétrico. Inspecione isolamento dos cabos por rachaduras térmicas.', priority: 'HIGH', order: 13 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  {
    modelName: 'CBR 450',
    yearFrom:  1990,
    yearTo:    1995,
    MACETES:   CBR450_MACETES,
    PROBLEMAS: CBR450_PROBLEMAS,
  },
  {
    modelName: 'CBR 450 SR',
    yearFrom:  1990,
    yearTo:    1995,
    MACETES:   CBR450SR_MACETES,
    PROBLEMAS: CBR450SR_PROBLEMAS,
  },
]

const ALL_MANUTENCAO = [...CBR450_MANUTENCAO, ...CBR450SR_MANUTENCAO]

// ─── Runner ───────────────────────────────────────────────────────────────────

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

  // TirePressures
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`🔵 TirePressure: ${tp.modelName}`)
  }

  // MaintenanceItems
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map(b => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: ALL_MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${ALL_MANUTENCAO.length} itens`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
