// seed-honda-cbx750r.ts — Honda CBX 750 R (1988–1990)
// FIPE: "CBX 750 R" (código 2784), ano de referência 1990
// RC17E: motor 747cc inline-4 DOHC 16v refrigerado a ar, 4 carburadores Keihin CV
// Moto de 30+ anos em circulação — manutenção vintage + dicas para proprietários ativos
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

// ─── CBX 750 R — Macetes ──────────────────────────────────────────────────────

const CBX750R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor RC17E 747cc DOHC 16 válvulas — 4 carburadores Keihin CV exigem sincronização a cada 12.000 km sem exceção',
    body: 'O RC17E é um motor inline-4 de 747cc com DOHC (2 cames duplos) e 16 válvulas refrigerado a ar, com 4 carburadores Keihin CV (constant velocity) de 34 mm. Com 4 venturis individuais, qualquer desbalanceamento entre cilindros causa vibração, perda de potência, consumo alto e marcha lenta instável. Sincronização a cada 12.000 km com vacuômetro de 4 colunas (manômetro de mercúrio ou digital) é mandatória — diferença maior que 2–3 cmHg entre cilindros já é perceptível na pilotagem. Serviço em oficina especializada em vintage: R$200–400. Em motos reativadas de longa parada: comece a sincronização DEPOIS de limpar e reconstruir os carburadores — não faz sentido sincronizar carburadores sujos. O RC17E bem calibrado é um motor refinado e prazeroso; mal calibrado é frustrante.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — capacidade ~3,5 L com filtro; troque a cada 4.000 km ou 6 meses',
    body: 'O RC17E usa 10W-40 com certificação JASO MA ou MA2 (obrigatório para motores com embreagem molhada integrada). Capacidade: ~3,2 L sem filtro / ~3,5 L com filtro novo. Recomendados: Motul 7100 4T 10W-40, Castrol Power1 Racing 10W-40, Honda HP4. Em motores de 30+ anos, as vedações envelhecidas permitem maior contaminação por gases de blow-by — reduza o intervalo para 4.000 km (não ultrapasse 5.000 km mesmo com sintético). Óleo retirado escuro e com partículas metálicas brilhantes indica desgaste interno acelerado — diagnóstico urgente. Óleo turvo e aquoso (aparência "café com leite") = fluido de arrefecimento misturado = junta de cabeçote comprometida. A CBX 750 R não tem arrefecimento a líquido, então óleo turvo aqui indica contaminação por condensação — cheque tampa do respiro e vedação do cabeçote.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK DR8ES-L — 4 unidades; gap 0,6–0,7 mm; troca a cada 12.000 km ou 24 meses',
    body: '4 cilindros = 4 velas. A vela padrão da CBX 750 R é a NGK DR8ES-L (rosca roscada longa 19 mm, calor 8). Gap: 0,6–0,7 mm. Troque sempre o conjunto completo de 4 velas — uma vela gasta num inline-4 desequilibra a combustão e cria vibração irregular perceptível. Torque de aperto: 18–20 N.m com graxa anti-grippante na rosca. Em motores parados por anos, substitua as velas ANTES de tentar a primeira partida: eletrodo oxidado impede ignição; vela emperrada no cabeçote (oxidação na rosca) pode quebrar durante remoção — use penetrante (WD-40) e aguarde 30 minutos. Alternativa: NGK DR8ES (sem L = rosca curta 12 mm) — confirme o tipo no cabeçote do seu RC17E antes de comprar. Custo do jogo de 4: R$80–150.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão 530 — lubrifique a cada 500 km; kit DID 530VX3 + JT Sprockets é o substituto de referência',
    body: 'A CBX 750 R usa corrente padrão 530 (passo 5/8", 3/8" de largura) com ~104 elos. Kits originais Honda para esse modelo estão descontinuados — use aftermarket de qualidade. Kit recomendado: DID 530VX3 (x-ring) ou RK 530GXW + JT Sprockets. Para confirmar os dentes certos (pinhão e coroa) do seu exemplar, conte os dentes do kit original antes de desmontar ou consulte o manual RC17. Lubrificação: a cada 500 km com spray de corrente para x-ring/o-ring — no correto, não em excesso (excesso atrai poeira). Em motos de 30+ anos com corrente original: não tente "salvar" corrente enferrujada com graxa — elos enferrujados são frágeis internamente e podem romper em aceleração. Custo do kit novo: R$350–600 importado.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador SCRI original — substituição por MOSFET é medida preventiva obrigatória antes de qualquer saída',
    body: 'O regulador/retificador original da CBX 750 R é do tipo SCRI (shunt/Zener), que dissipa o excesso de carga em calor. Com 30+ anos de uso, esse componente está no limite da vida útil. O modo de falha característico: começa carregando em tensão ligeiramente alta (15–17V) ao invés de 13,8–14,8V, o que destrói o estátor do alternador progressivamente (bobinas da armadura queimam por sobrecorrente). Depois que o estátor queima, a moto fica sem carga e para na rua. Custo do estrago: estátor R$800–1.500 + regulador. Prevenção: substitua o regulador SCRI original por regulador MOSFET universal de 3 fases antes que queime. Recomendados: Shindengen SH847-12 ou equivalente Rick\'s Motorsport / Electrosport para Honda da era. Preço: R$150–350 importado. Verifique o estátor antes da troca (resistência 0,5–1,5 Ohm entre cada par de fases).',
  },
  {
    severity: 'OK',
    title: 'Sistema de freio dianteiro duplo disco — 2 pinças, 2 conjuntos de pastilhas; fluido DOT 4 obrigatório a cada 2 anos',
    body: 'A CBX 750 R tem freio dianteiro com duplo disco e 2 pinças flutuantes — característica esportiva da época. Dois discos = 2 conjuntos de pastilhas para trocar. Pastilhas recomendadas: EBC HH Sintered (busque o código correto para Honda CBX 750 / RC17) ou Ferodo FDB. Fluido de freio: DOT 4, substituição a cada 24 meses. O DOT 4 absorve umidade continuamente e perde o ponto de ebulição — em motos de coleção com anos parada, o fluido pode estar com ponto de ebulição abaixo de 160°C. A primeira freada intensa pode vaporizar o fluido e anular o freio (vapor lock). Troca de fluido ANTES da primeira saída após longa parada é item de segurança primário. Inspect também os pinos de guia das pinças — travados = pastilha desgastando de forma desigual.',
  },
  {
    severity: 'OK',
    title: 'Tensor da corrente de comando RC17 — inspecione a cada 24.000 km; ruído metálico a frio indica problema',
    body: 'O RC17E tem corrente de comando (timing chain) para acionar os dois cames. O tensor hidráulico/mecânico pode desgastar após décadas de uso. Sintoma característico: ruído metálico "tatatata" ou "tric-tric" nos primeiros segundos após a partida a frio, que some quando o motor aquece e o tensor se pressuriza com óleo. Se o ruído persiste com motor quente ou piora progressivamente, o tensor atingiu o fim da vida útil. Riscos de tensor falho: se a corrente pular dentes, as válvulas colidem com os pistões (interferência no cabeçote do RC17E) — dano catastrófico. Inspeção: a cada 24.000 km ou 24 meses. Peça original Honda rara; fabricantes japoneses de terceiros (Morse, Tsubaki) podem ter equivalente — leve o número do tensor para comparar dimensões.',
  },
  {
    severity: 'WARN',
    title: '4 carburadores Keihin CV 34 mm — diafragmas de borracha com 30+ anos; inspecione antes de qualquer diagnóstico de desempenho',
    body: 'Os 4 carburadores Keihin CV da CBX 750 R têm diafragmas de borracha que controlam a válvula slide. Após 30+ anos, esses diafragmas INEVITAVELMENTE estão ressecados, endurecidos ou com microfuros invisíveis a olho nu. Diagnóstico simples: remova a tampa superior de cada carburador (4 parafusos por carb), levante o slide e inspecione o diafragma contra a luz — qualquer furo ou rasgo, substitua. Com diafragma furado: ar entra direto sem dosagem correta, causando marcha lenta elevada (acima de 2.000 rpm), consumo alto, dificuldade de desacelerar e falha de aceleração. Kit de diafragmas de reposição: All Balls Racing (EUA) ou Keyster (Japão) produzem kits compatíveis. 4 carbs × R$80–150/diafragma = R$320–600. Em moto parada por anos: a reconstrução completa dos 4 carbs é o item de maior impacto na restauração — não pule.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito parado — inline-4 refrigerado a ar fica perigosamente quente parado mais de 10 minutos',
    body: 'O RC17E é refrigerado APENAS por ar — sem líquido de arrefecimento, sem radiador, sem ventilador elétrico. Em movimento, o fluxo de ar sobre as aletas das camisas é suficiente para manter a temperatura. Parado no trânsito por mais de 10 minutos em dia quente, a temperatura das camisas pode subir a ponto de queimar a perna do piloto (especialmente a perna direita, próxima ao carburador #4 e escapamento). Medidas preventivas: (1) Em cidades congestionadas, escolha rotas alternativas ou horários melhores; (2) Nunca bloqueie as entradas de ar laterais com adesivos ou modificações estéticas; (3) Em paradas prolongadas, desligue o motor — ligar novamente é menos danoso que superaquecer; (4) Use calça de couro ou tecido protetor — contato direto com a tampa lateral do motor pode causar queimaduras graves. A CBX 750 R foi projetada para estradas abertas, não para cidade congestionada.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo — HifloFiltro HF204 ou K&N KN-204; troque junto com o óleo, nunca pule essa etapa',
    body: 'O filtro de óleo da CBX 750 R tem equivalente no mercado: HifloFiltro HF204 ou K&N KN-204 (verifique cruzamento por código Honda antes de comprar, pois pode variar por ano). Nunca rode sem filtro de óleo ou com filtro velho reutilizado — o filtro retém partículas de desgaste que atacam mancais e tuchos. No RC17E de 30+ anos, um filtro entupido pode causar queda de pressão de óleo e desgaste de mancal em quilômetros. Dica de inspeção: no filtro retirado, corte ao meio com alicate e examine o elemento filtrante — material cinza/preto é normal; partículas metálicas brilhantes indicam desgaste interno acelerado. Custo: R$25–50.',
  },
  {
    severity: 'OK',
    title: 'Tanque de aço 20 L — ferrugem interna é quase certa em motos paradas; tratamento com POR-15 é pré-requisito',
    body: 'O tanque de aço de 20L da CBX 750 R parada por 5+ anos com combustível velho (gasolina brasileira com etanol envelhece em 90 dias e produz verniz e ácidos) tem alta probabilidade de ferrugem interna. Ferrugem em flocos que chega aos carburadores entope os jets e destrói o trabalho de limpeza. Procedimento obrigatório: (1) Remova o tanque e inspecione com lanterna; (2) Esvazie completamente e lave com mistura água + sabão; (3) Aplique limpador de ferrugem fosfórico (Ferroferro, Metal Ready); (4) Após secar, aplique selante interno de tanque (POR-15 Tank Sealer ou Caswell Tank Liner) — R$200–350 o kit; (5) Após cura de 48h, instale filtro de combustível inline novo. Tanque sem tratamento com ferrugem visível = carburadores entopem em poucos quilômetros. Perfurações pequenas: soldagem TIG especializada em tanque de combustível (R$150–300 em funileiro especializado).',
  },
  {
    severity: 'OK',
    title: 'Sistema elétrico de 30+ anos — conector principal do chicote é ponto de falha crítico; limpeza preventiva salva diagnósticos difíceis',
    body: 'O chicote elétrico da CBX 750 R tem conectores de plástico que ficam opacos, frágeis e com pinos oxidados após 30 anos. Oxidação nos conectores cria resistência elétrica — problema intermitente impossível de diagnosticar sem abrir fisicamente cada conector. O conector principal de 6 pinos verde (ignição) é o mais crítico: resistência nesse ponto causa falhas intermitentes de ignição, especialmente em temperatura alta ou vibração. Roteiro preventivo: (1) Desconecte e reconecte cada conector para quebrar a oxidação inicial; (2) Aplique spray de contato elétrico WD-40 Specialist Electrical ou CRC 2-26 em todos os conectores; (3) Reconecte e aplique vaselina técnica ou Vaseline NF nos terminais para bloquear umidade; (4) Verifique o estado da fiação sob o tanque (ponto de calor + vibração). Um chicote elétrico da CBX 750 R em bom estado é difícil de achar — cuide do original.',
  },
]

// ─── CBX 750 R — Problemas ────────────────────────────────────────────────────

const CBX750R_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Ligar o motor após anos de parada sem preparação — risco de destruição dos mancais em minutos ou incêndio',
    body: 'NUNCA ligue o motor de uma CBX 750 R parada por 2+ anos sem a seguinte preparação mínima: (1) Troque o óleo e filtro — o óleo velho tem ácidos e água acumulados que atacam mancais na primeira partida quando o motor está seco; (2) Retire as 4 velas, borrife óleo de motor nos cilindros e gire o motor à mão (chave de ignição desligada) até sentir compressão equilibrada — lubrifica os anéis antes da ignição; (3) Inspecione TODAS as mangueiras de combustível por rachadura e ressecamento — uma mangueira que estoura com gasolina vaporizada próxima a superfícies quentes = incêndio imediato; (4) Verifique a torneira de combustível (petcock) — a membrana de borracha pode estar colada na posição aberta mesmo na posição OFF; (5) Limpe e reconstrua os 4 carburadores com kit de reconstrução antes da partida. Preparação adequada: 2–3 fins de semana. Ligar sem preparo pode queimar mancais em minutos (motor seco) ou causar incêndio por mangueira rachada.',
  },
  {
    severity: 'DANGER',
    title: 'Mangueiras de combustível ressecadas — risco de incêndio; inspecione e substitua antes de qualquer saída',
    body: 'As mangueiras de combustível de borracha da CBX 750 R têm 30+ anos e estão inevitavelmente ressecadas. Uma rachadura invisível externamente numa mangueira entre a torneira petcock e os carburadores derrama gasolina sobre o cabeçote quente ou o escape — a temperatura de ignição da gasolina vaporizada é de ~280°C, muito abaixo da temperatura de escapamento. Consequência: incêndio enquanto pilota. Substituição obrigatória antes de rodar: (1) Todas as mangueiras de combustível (tanque → petcock → carburadores); (2) Mangueiras de vácuo do sistema de ventilação dos carburadores; (3) A membrana de borracha interna do petcock (torneira) — verifique se veda na posição OFF. Substituição: silicone de combustível de Ø5, Ø6 e Ø8 mm vendido por metro em autopeças (R$15–30/metro) — mais resistente que borracha original e dura décadas. Custo total: R$50–120 em material.',
  },
  {
    severity: 'WARN',
    title: 'Diafragmas dos 4 carburadores perished — raiz de 80% dos problemas de desempenho em CBX 750 R de coleção',
    body: 'Os diafragmas de borracha dos 4 carburadores Keihin CV da CBX 750 R com 30+ anos são a causa mais comum de problemas de desempenho. Sintomas de diafragma furado: marcha lenta instável ou muito alta (1.500–3.000 rpm sem toque no acelerador), engasgo na aceleração, consumo anormalmente alto, dificulade de afinar a sincronização. O diagnóstico correto exige inspeção visual direta — muitas oficinas trocam agulha, boia e jets (R$200+) sem inspecionar os diafragmas, resolvendo nada. Inspeção: tampa superior de cada carburador (4 parafusos), levante o slide, inspecione o diafragma contra luz — qualquer ponto sem transparência uniforme = furo. Kits de 4 diafragmas: importados de All Balls Racing (EUA) ou Keyster (Japão). Preço total: R$400–700. Após instalação dos diafragmas novos, o motor responde de forma radicalmente diferente — proprietários descrevem como "moto rejuvenescida".',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador SCRI queima o estátor progressivamente — verifique tensão de carga antes de colocar bateria nova',
    body: 'O regulador original tipo SCRI da CBX 750 R começa a falhar de forma gradual: ao invés de regular em 13,8–14,8V, passa a regular em 15–17V. Essa sobretensão destrói o estátor do alternador progressivamente (isolamento das bobinas queima por calor excessivo). Diagnóstico: meça a tensão na bateria com motor em 4.000 rpm — acima de 15V = regulador com defeito. Um estátor queimado parcialmente pode passar em teste estático mas falhar sob carga em temperatura de operação. Custo do estrago completo: estátor R$800–1.500 (importado ou rebobinagem) + regulador R$150–350. Prevenção: substitua o regulador por MOSFET (Shindengen SH847 ou Rick\'s Motorsport) ANTES de instalar bateria nova. A bateria nova será destruída em poucas semanas se o regulador defeituoso permanecer. Bateria recomendada: Yuasa YTX14-BS ou Moura equivalente 12Ah.',
  },
  {
    severity: 'WARN',
    title: 'Vibração excessiva — inline-4 com coxins de motor desgastados; piloto confunde com problema mecânico interno',
    body: 'O RC17E é naturalmente um motor de baixa vibração para um inline-4 de 30 anos — quando bem calibrado, é notavelmente suave. Vibração excessiva em CBX 750 R vintage quase sempre tem causa externa ao motor: (1) Coxins de borracha de fixação do motor ao quadro ressecados e trincados — depois de 30 anos, a borracha endurece e perde a função de amortecimento. Inspeção: observe as borrachas de montagem do motor; qualquer rachadura = troque. Equivalentes universais por diâmetro de furo e dureza (Shore 50–60A). (2) Balanceamento de rodas — rodas sem balanceamento causam vibração em velocidades específicas; balanceamento dinâmico custa R$30–50/roda; (3) Amortecedor traseiro com borrachas internas desgastadas transmite mais vibração ao piloto; (4) Espelhos e proteções de guidão com fixações frouxas amplificam qualquer vibração. Primeiro diagnóstico: sincronize os carburadores e substitua os coxins — 90% da vibração some.',
  },
  {
    severity: 'WARN',
    title: 'Bateria morta após parada longa — nunca coloque bateria nova sem verificar o regulador primeiro',
    body: 'Bateria de uma CBX 750 R parada por 3+ anos está irrecuperável — após 3 anos sem carga mínima de manutenção, a bateria chumbo-ácido sulfata e não aceita mais carga. Mas o erro mais comum e caro dos proprietários é: comprar bateria nova → instalar sem checar o regulador → regulador defeituoso destrói a nova bateria em dias/semanas. Sequência correta: (1) Verifique o regulador/retificador (tensão de carga: 13,8–14,8V a 4.000 rpm) antes de instalar a bateria nova; (2) Se o regulador estiver fora da faixa, substitua primeiro; (3) Instale a bateria nova; (4) Verifique novamente a tensão de carga após instalação. Bateria de substituição: Yuasa YTX14-BS (12V, 12Ah) — disponível como Yuasa original R$380–420 ou Moura/Bosch equivalente R$220–320. Alternativa moderna: bateria de lítio LiFePO4 equivalente (Antigravity, Shorai) — menor peso, maior vida útil, R$600–1.000.',
  },
  {
    severity: 'WARN',
    title: 'Rolamentos de 30+ anos — roda dianteira, traseira e direção precisam de substituição preventiva antes de qualquer saída intensa',
    body: 'Os rolamentos de roda e da coluna de direção de uma CBX 750 R de 30+ anos têm graxa envelhecida que perdeu as propriedades lubrificantes. Graxa velha = rolamento com maior atrito = aquecimento excessivo = falha progressiva. Sintoma de rolamento de roda: vibração em alta velocidade que se agrava; som de "rolha" girando ou "grão de areia" ao girar a roda com a moto suspensa. Sintoma de rolamento da direção: guidão com "ponto morto" no centro (fica "preso" em linha reta) ou folga perceptível ao segurar os tubos de garfo e tentar mover para frente/trás. Diagnóstico: com a moto no cavalete central, gire cada roda devagar e palpe o rolamento em busca de crepitação. Substituição: rolamentos de roda são universais (SKF, FAG, NSK) — anote o número gravado no rolamento e compre equivalente. Rolamento de direção: kit cônico (tapered) All Balls Racing para Honda da era. Custo total de 3 conjuntos: R$200–450.',
  },
  {
    severity: 'WARN',
    title: 'Óleo de garfo envelhecido — amortecimento comprometido aumenta risco em curvas e frenagens intensas',
    body: 'O óleo de garfo da CBX 750 R com anos de parada está oxidado, contaminado com partículas internas e perdeu viscosidade original. Consequência prática: garfo que desce muito facilmente numa frenagem intensa (falta de amortecimento hidráulico = perda de rastreamento da roda dianteira) ou que fica "duro" em irregularidades por oxidação (não amortece impactos). Ambos os cenários comprometem a segurança em velocidade. Troca: drene o óleo pelas tampas de dreno inferiores de cada perna de garfo; substitua por Honda SS-8 10W ou Motul Fork Oil Expert Light 7,5W/10W. Quantidade por perna: consulte o manual RC17 (~400–500 mL por perna é típico para inline-4 da era). Aproveite para: inspecionar os retentores superiores (vedações de óleo — ressecadas = garfo vazando na estrada), e substituir se necessário. Kit de retentores para garfo da CBX 750 R: medição do diâmetro dos tubos de garfo + busca por equivalente (tipicamente 37–38 mm × 50 mm × 11 mm).',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName:    'CBX 750 R',
    yearFrom:     1988,
    yearTo:       1990,
    tireSize:     '100/90-18 (F) · 130/80-18 (R)',
    frontPsi:     29,
    rearPsi:      33,
    frontPsiLoad: 29,
    rearPsiLoad:  36,
    notes:        'Pneus bias-ply de índice V (até 240 km/h) ou H (até 210 km/h). Verifique o código DOT — pneus com mais de 6 anos devem ser substituídos mesmo com sulcos aparentes. Substituições modernas compatíveis: Pirelli MT66, Dunlop K555, Metzeler ME77 (todos disponíveis em 18"). Pressão superior ao recomendado melhora estabilidade em estrada mas reduz conforto e aderência — nunca ultrapasse 32 PSI na dianteira.',
  },
]

// ─── Manutenção ───────────────────────────────────────────────────────────────

const CBX750R_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CBX 750 R', yearFrom: 1988, yearTo: 1990, component: 'Óleo do motor (10W-40 JASO MA) + filtro HifloFiltro HF204', intervalKm: 4000, intervalMonths: 6, notes: 'Capacidade: ~3,5 L com filtro. Motul 7100 4T, Castrol Power1 Racing ou Honda HP4. Em vintage: reduza para 3.500 km — vedações antigas aceleram degradação.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CBX 750 R', yearFrom: 1988, yearTo: 1990, component: 'Limpeza e sincronização dos 4 carburadores Keihin CV', intervalKm: 12000, intervalMonths: 12, notes: 'Vacuômetro de 4 colunas. Diferença máxima 2–3 cmHg entre cilindros. Em moto vintage reativada: reconstrução completa antes da sincronização.', priority: 'HIGH', order: 2 },
  { modelName: 'CBX 750 R', yearFrom: 1988, yearTo: 1990, component: 'Regulagem de válvulas DOHC (16 válvulas — 4 por cilindro)', intervalKm: 12000, intervalMonths: 12, notes: 'Adm: ~0,10 mm / Esc: ~0,15 mm com motor frio (confirme no manual RC17). OBRIGATÓRIO antes de reativar moto parada por anos.', priority: 'CRITICAL', order: 3 },
  { modelName: 'CBX 750 R', yearFrom: 1988, yearTo: 1990, component: 'Velas de ignição NGK DR8ES-L — jogo de 4', intervalKm: 12000, intervalMonths: 24, notes: 'Gap 0,6–0,7 mm. Torque: 18–20 N.m. Substitua todas antes de reativar moto parada — eletrodo oxidado impede ignição.', priority: 'HIGH', order: 4 },
  { modelName: 'CBX 750 R', yearFrom: 1988, yearTo: 1990, component: 'Lubrificação da corrente de transmissão (530)', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente para x-ring/o-ring. Verificar tensão e desgaste a cada 2.000 km. Corrente enferrujada = troca imediata.', priority: 'MEDIUM', order: 5 },
  { modelName: 'CBX 750 R', yearFrom: 1988, yearTo: 1990, component: 'Kit de transmissão (corrente 530 + coroa + pinhão)', intervalKm: 18000, intervalMonths: null, notes: 'DID 530VX3 ou RK 530GXW + JT Sprockets. OEM descontinuado. Troque sempre os 3 componentes juntos.', priority: 'HIGH', order: 6 },
  { modelName: 'CBX 750 R', yearFrom: 1988, yearTo: 1990, component: 'Filtro de combustível inline', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro inline universal Ø6 mm (R$15–30). Substitua imediatamente após tratar ferrugem do tanque. Entupimento = 4 carburadores com starving.', priority: 'HIGH', order: 7 },
  { modelName: 'CBX 750 R', yearFrom: 1988, yearTo: 1990, component: 'Fluido de freio DOT 4 (dianteiro + traseiro)', intervalKm: null, intervalMonths: 24, notes: 'Sistema duplo disco dianteiro + disco traseiro. Troca obrigatória em moto de coleção. Vapor lock = perda total de freio.', priority: 'HIGH', order: 8 },
  { modelName: 'CBX 750 R', yearFrom: 1988, yearTo: 1990, component: 'Pastilhas de freio (2 pinças dianteiras + pinça traseira)', intervalKm: 8000, intervalMonths: null, notes: 'EBC HH Sintered para Honda RC17 (dianteiro e traseiro). Inspecione pistões das pinças por oxidação — pistão travado = disco aquece e empe.', priority: 'HIGH', order: 9 },
  { modelName: 'CBX 750 R', yearFrom: 1988, yearTo: 1990, component: 'Tensor da corrente de comando', intervalKm: 24000, intervalMonths: 24, notes: 'Ruído "tatatata" a frio = tensor desgastado. Falha do tensor = corrente pula dentes = válvulas batem nos pistões. Emergência.', priority: 'HIGH', order: 10 },
  { modelName: 'CBX 750 R', yearFrom: 1988, yearTo: 1990, component: 'Diafragmas dos 4 carburadores Keihin CV', intervalKm: null, intervalMonths: null, notes: 'Borracha de 30 anos inevitavelmente perished. All Balls Racing ou Keyster (4 kits). Inspecione visualmente antes de qualquer outro diagnóstico de carburador.', priority: 'CRITICAL', order: 11 },
  { modelName: 'CBX 750 R', yearFrom: 1988, yearTo: 1990, component: 'Mangueiras de combustível e vácuo (substituir por silicone)', intervalKm: null, intervalMonths: 60, notes: 'Borracha de 30 anos = risco de incêndio por ruptura. Silicone de combustível Ø5–8 mm (R$15–30/metro). Inclui membrana do petcock.', priority: 'CRITICAL', order: 12 },
  { modelName: 'CBX 750 R', yearFrom: 1988, yearTo: 1990, component: 'Verificação do regulador/retificador + estátor do alternador', intervalKm: 6000, intervalMonths: 12, notes: 'Tensão de carga: 13,8–14,8 V a 4.000 rpm. Regulador original SCRI: substitua por MOSFET (Shindengen SH847). Estátor: 0,5–1,5 Ohm/fase.', priority: 'HIGH', order: 13 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  {
    modelName: 'CBX 750 R',
    yearFrom:  1988,
    yearTo:    1990,
    MACETES:   CBX750R_MACETES,
    PROBLEMAS: CBX750R_PROBLEMAS,
  },
]

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
  await prisma.maintenanceItem.createMany({ data: CBX750R_MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${CBX750R_MANUTENCAO.length} itens`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
