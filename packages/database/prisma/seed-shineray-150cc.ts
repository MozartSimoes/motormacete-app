/**
 * Seed Shineray 150cc "XY" — macetes, problemas e manutenção
 * Cobre 8 modelos FIPE da SHINERAY (código 134) na faixa 150cc:
 *   XY 150 ZH · XY 150-5 Fire/Maxi Fire · XY 150-5 MAX · XY 150-5 SPEED ·
 *   XY 150-8 JEF · XY 150-8 JEF S · XY 150-8 JEF S EFI · XY 150-GY/EXPLORER
 *
 * Fontes: shineray.com.br (manuais de proprietário JEF150S e Free 150 EFI),
 *         mobiauto.com.br, magodoscarros.com, motonline.com.br,
 *         tabelafipebrasil.com, motorede.com.br, revista.moto.com.br,
 *         seed-kasinski-comet.ts (nota: "biela igual à Shineray 150cc" —
 *         confirma que o motor 149cc Shineray é a referência de compatibilidade
 *         de peças entre marcas chinesas de entrada no Brasil).
 *
 * ── ESTRATÉGIA DE MODELNAME (leia antes de mexer) ──────────────────────────
 * O matching do site é substring com word-boundary via regex:
 *   new RegExp('\\b' + storedName + '\\b', 'i').test(fipeName)
 * e os resultados de TODOS os modelNames que casam são UNIDOS (Tips,
 * TirePressure e MaintenanceItem — os três endpoints fazem esse mesmo
 * matching, ver apps/web/app/api/{tips,tire-pressure,maintenance}/route.ts).
 *
 * Isso significa que "XY 150-5" (sem sufixo) casa dentro de:
 *   "XY 150-5 Fire/Maxi Fire", "XY 150-5 MAX" e "XY 150-5 SPEED"
 * e "XY 150-8 JEF" casa dentro de:
 *   "XY 150-8 JEF S" e "XY 150-8 JEF S EFI"
 *
 * Por isso, para TIPS (macetes/problemas/manutenção — onde repetir texto é
 * desperdício e nunca fica estranho ao usuário ver conteúdo combinado),
 * uso um bloco-base "virtual" (XY 150-5 e XY 150-8 JEF) com o conteúdo
 * comum de plataforma/motor, e cada trim específico carrega SÓ o que o
 * diferencia (freio, acabamento, EFI vs carburador, etc). Na página de
 * qualquer trim, o usuário vê o conteúdo do trim + o conteúdo da base —
 * union automático, sem duplicação de texto no banco.
 *
 * Para TirePressure e MaintenanceItem eu NÃO uso a base virtual: cada card diminui
 * "isSpecific" de forma isolada e ter 2 pressões de pneu retornadas juntas
 * (base + trim) ficaria estranho na tela. Então cada um dos 8 modelos reais
 * tem sua própria linha de TirePressure e seu próprio grupo de 6–9
 * MaintenanceItem — sem depender do union.
 *
 * Os blocos-base "XY 150-5" e "XY 150-8 JEF" NÃO recebem VehicleModel próprio
 * (não são nomes reais da tabela FIPE) — só os 8 modelos exatamente listados
 * acima recebem o upsert de VehicleModel, senão criaríamos páginas SEO
 * fantasmas para um nome que nenhum veículo FIPE tem de verdade.
 *
 * "XY 150 ZH" e "XY 150-GY/EXPLORER" não compartilham prefixo com ninguém
 * (nem entre si) — cada um leva conteúdo 100% independente.
 *
 * Execute: pnpm --filter @motormacete/database db:seed:shineray-150cc
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

// Nomes FIPE exatos que recebem VehicleModel — os únicos 8 modelos reais.
const REAL_MODEL_NAMES = [
  'XY 150 ZH',
  'XY 150-5 Fire/Maxi Fire',
  'XY 150-5 MAX',
  'XY 150-5 SPEED',
  'XY 150-8 JEF',
  'XY 150-8 JEF S',
  'XY 150-8 JEF S EFI',
  'XY 150-GY/EXPLORER',
]

// ─── XY 150-5 (base de plataforma — Fire/Maxi Fire, MAX, SPEED) ───────────────
// Motor: 149cc monocilíndrico OHC 2 válvulas, arrefecido a ar | carburador
// Bore×curso ~62×49,5mm (mesma família do motor 150cc chinês genérico usado
// por Kasinski Comet 150 e outras marcas de entrada) | ~10–11cv @ 7.500rpm (estimado)
// 5 marchas | CDI | Corrente final | Partida elétrica + pedal
// Geração 2009–2015, substituída depois pela linha XY 150-8 JEF

const XY1505_BASE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — motor com embreagem úmida, não use óleo de carro',
    body: 'O motor 149cc da linha XY 150-5 compartilha o óleo com a embreagem úmida, então precisa de óleo classificado JASO MA (nunca JASO MB nem óleo automotivo puro API SM/SN sem essa classificação — a embreagem escorrega e a moto "patina" na retomada). Capacidade estimada: 1,0–1,1L na troca. Use 20W-50 mineral ou semissintético: Lubrax Moto 4T 20W-50, Shell Advance 4T 20W-50 ou Motul 3000 20W-50. Troca a cada 2.000–3.000 km — intervalo curto típico de motor chinês de entrada, mais frequente que uma CG150 Honda.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com outros 150cc chineses de entrada: pistão, biela, anéis',
    body: 'O bloco 149cc da linha XY 150-5 é derivado da mesma família de motor genérico usado por outras marcas de entrada vendidas no Brasil (a própria Kasinski Comet 150, por exemplo, usa biela de medida igual à Shineray 150cc). Isso ajuda muito: pistão 62mm, anéis, biela, retentores e rolamentos de motor costumam ser encontrados em lojas de peças para motos chinesas mesmo fora da rede oficial Shineray — procure por "kit pistão 150cc 62mm motor chinês" no lugar de "peça original Shineray" quando a concessionária não tiver estoque.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: etanol brasileiro empasta o jato principal se a moto ficar parada',
    body: 'O carburador da linha XY 150-5 é sensível ao etanol nacional, que forma verniz/borra no jato principal quando a moto fica parada por 2–3 semanas ou mais (comum em moto de uso ocasional). Sintomas: marcha lenta que sobe sozinha e não estabiliza, afogamento em partida a frio, corte no meio do giro. Solução preventiva: rode a moto pelo menos uma vez por semana até esquentar, ou drene o combustível da cuba antes de guardar por muito tempo (parafuso de dreno embaixo do carburador). Limpeza do carburador: spray Bardahl Carb Cleaner ou similar, jato a jato — serviço de R$ 60–120 em oficina de moto popular.',
  },
  {
    severity: 'OK',
    title: 'Vela: gap 0,6–0,7mm — troque a cada 8.000 km e o consumo melhora',
    body: 'Vela recomendada: NGK C7HSA ou D8EA (ou equivalente Denso/Champion de mesma medida) com gap 0,6–0,7mm. Custo: R$ 15–30. Vela gasta é a causa mais comum de "moto sem força" e consumo alto reportada por donos da linha 150-5 — antes de suspeitar do carburador, troque a vela. Versão iridium (NGK equivalente) dura o dobro (~16.000 km) por cerca de R$ 50–60, compensa em quem roda muito.',
  },
  {
    severity: 'OK',
    title: 'Corrente e kit relação: lubrifique a cada 500 km, kit completo dura 15.000–20.000 km',
    body: 'A linha XY 150-5 usa transmissão por corrente (medida 428, comum na categoria). Lubrificar a cada 500 km ou sempre depois de andar na chuva dobra a vida útil da corrente. Folga correta: 20–30mm no trecho inferior, moto no cavalete central. Kit relação completo (corrente + pinhão + coroa) encontrado em lojas de peças para motos populares chinesas: R$ 80–180 — troque o kit inteiro junto, nunca só a corrente com coroa já desgastada.',
  },
  {
    severity: 'WARN',
    title: 'Rede de assistência Shineray é concentrada nas capitais — leve o manual a oficinas de bairro',
    body: 'Fora de capitais e regiões metropolitanas, a rede autorizada Shineray é escassa. Isso não é motivo para pânico: como o motor é da família genérica 150cc chinesa, a maioria das oficinas de bairro que atendem motos populares (inclusive as que trabalham com Sundown, Kasinski, Dafra de entrada) consegue diagnosticar e reparar a XY 150-5 sem dificuldade. Leve o manual do proprietário (baixável em shineray.com.br) para consulta de torques e folgas — evita "adivinhação" por parte do mecânico.',
  },
]

const XY1505_BASE_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e retificador: os pontos elétricos mais frágeis da linha 150-5',
    body: 'O CDI (módulo de ignição) e o retificador/regulador de voltagem são os componentes que mais falham na linha XY 150-5, segundo relatos de donos e oficinas populares. Sintoma do CDI: moto não pega, sem faísca na vela mesmo com bateria boa. Sintoma do retificador: bateria não carrega (luz de bateria ou farol fraco em marcha lenta), ou ao contrário, sobrecarga que "frita" a bateria nova rapidamente. Peça original pode demorar para chegar fora de capitais — CDI genérico de 5-6 pinos para 150cc chinês costuma ser compatível por pinagem (confirme com multímetro antes de instalar), custo R$ 40–90.',
  },
  {
    severity: 'WARN',
    title: 'Retentor do eixo primário: vazamento de óleo depois de 20.000 km é comum',
    body: 'Depois de 20.000–25.000 km, o retentor do eixo primário da caixa de câmbio começa a ressecar e vazar óleo pela parte externa do motor, no lado esquerdo perto da tampa da corrente. Sintoma: mancha de óleo, corrente suja de óleo em excesso, nível de óleo do motor caindo mais rápido que o normal. Retentor genérico de mesma medida (geralmente 20×32×7mm — confira a medida do original) custa R$ 5–15, troca simples de cerca de 1h em qualquer oficina de moto.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico com conectores de qualidade básica: oxidam em 2–3 anos',
    body: 'Os conectores do chicote elétrico original oxidam mais rápido que o de marcas japonesas, principalmente em regiões litorâneas ou muito úmidas. Sintomas típicos: lanterna traseira ou pisca intermitente, luz de freio que falha, velocímetro com leitura errática. Solução: limpar os conectores acessíveis com spray de contato elétrico e aplicar graxa dielétrica nos plugues — evita reincidência. Conector oxidado sem solução: substitua por conector genérico Tyco/AMP de mesma bitola (R$ 5–10).',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira: retentor vaza óleo cedo em pavimento ruim',
    body: 'O retentor da bengala dianteira (~ø33-35mm) da linha 150-5 tem vida útil relativamente curta em uso com muitos buracos e lombadas — sintoma é óleo escuro escorrendo pelo tubo interno da bengala e amortecimento perdendo eficiência (moto "batendo" mais nos buracos). Troca do retentor: peça genérica de medida equivalente, R$ 20–40, mais reposição de ~150-180mL de óleo de bengala SAE 10W por tubo. Não adie: bengala vazando molha o pneu dianteiro e compromete a frenagem.',
  },
  {
    severity: 'WARN',
    title: 'Vibração acima de 7.000 rpm: normal para o motor, mas pode indicar coxim gasto',
    body: 'O monocilíndrico OHC chinês da XY 150-5 vibra mais que motos japonesas de mesma cilindrada — isso é característico do motor, principalmente acima de 7.000 rpm. Se a vibração piorou de forma perceptível, verifique: parafusos de fixação do motor no chassi (soltam com a vibração ao longo do tempo), coxins de borracha do guidão (plugs de manopla que amortecem — R$ 10–20 o par), e balanceamento das rodas. Uso constante entre 4.000–6.500 rpm é a faixa de conforto da moto.',
  },
]

const XY1505_BASE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 150-5 (plataforma base): revisão a cada 3.000 km',
    body: '500 km — Troca de óleo de rodagem (20W-50). | 1.000 km — Segunda troca de óleo + reaperto geral dos parafusos do motor e cabeçote. | 3.000 km — Troca de óleo 20W-50 (1,0–1,1L). Lubrificar corrente. | 5.000 km — Limpeza do filtro de ar (espuma: lavar com querosene, secar, umedecer levemente com óleo). Verificar gap da vela. | 8.000 km — Troca da vela (NGK C7HSA/D8EA, gap 0,6–0,7mm). Regular folga de válvulas (motor frio). | 10.000 km — Troca do filtro de ar (se for elemento de papel, não lavar). Limpeza do carburador se sinais de entupimento. | 15.000–20.000 km — Kit relação completo (corrente + pinhão + coroa) se desgastado. Inspecionar retentor do eixo primário e da bengala. | Anual — Verificar tensão do CDI/retificador com multímetro (13,5–14,5V a 4.000 rpm).',
  },
]

// Trim: Fire/Maxi Fire (versão de entrada da linha 150-5)
const XY1505_FIRE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Fire/Maxi Fire é a versão de entrada: freio a tambor nas duas rodas, foco em custo baixo',
    body: 'A versão Fire/Maxi Fire é a configuração mais simples da linha XY 150-5 — freio a tambor dianteiro e traseiro (sem disco), rodas raiadas. Isso reduz custo de manutenção: pastilha de freio a disco é mais cara que lona de tambor, então a Fire acaba sendo a mais barata de manter da família. Regule o cabo do freio dianteiro periodicamente — freio a tambor perde eficiência com o desgaste da lona antes de "avisar" tanto quanto um disco.',
  },
  {
    severity: 'WARN',
    title: 'Lona de freio a tambor: inspecione visualmente a cada 5.000 km',
    body: 'Diferente do disco (que dá para medir com paquímetro visível), a lona do tambor da Fire/Maxi Fire exige desmontagem da roda para inspeção visual. Espessura mínima: cerca de 2mm. Sinais de troca necessária: curso do pedal/manete aumentando, ruído metálico ao frear (lona rente ao rebite). Custo da lona: R$ 20-40 o jogo, troca simples.',
  },
]
const XY1505_FIRE_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Freio a tambor perde eficiência na chuva mais que o disco das outras versões',
    body: 'O sistema a tambor da Fire/Maxi Fire (dianteiro e traseiro) perde mais eficiência com água entre lona e tambor do que o disco das versões MAX/SPEED. Em dias de chuva, acione o freio levemente algumas vezes logo após atravessar poças para "secar" o sistema por atrito antes de precisar frear com força.',
  },
]
const XY1505_FIRE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Fire/Maxi Fire: cronograma da base 150-5, com foco extra na inspeção do tambor',
    body: 'Siga o cronograma base da plataforma XY 150-5. Adicional específico da Fire/Maxi Fire: inspecione a lona do tambor dianteiro e traseiro a cada 5.000 km (desmontagem da roda) — diferente do disco, não dá para avaliar visualmente sem abrir. Regule a folga do cabo/haste do freio a cada 3.000 km conforme a lona desgasta.',
  },
]

// Trim: MAX (versão intermediária, provável disco dianteiro/rodas de liga)
const XY1505_MAX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'MAX: acabamento intermediário — provável freio a disco dianteiro e rodas de liga',
    body: 'A versão MAX posiciona-se entre a Fire/Maxi Fire (entrada) e a SPEED (topo) na linha 150-5, geralmente com freio a disco dianteiro e rodas de liga leve em vez de raiadas. Rodas de liga não enferrujam como as raiadas, mas são mais sensíveis a impacto de buraco — trincam em vez de amassar. Após qualquer impacto forte, inspecione a roda visualmente antes de continuar rodando.',
  },
  {
    severity: 'OK',
    title: 'Pastilha de freio dianteiro: alternativa genérica custa metade do preço',
    body: 'Para o disco dianteiro da MAX, pastilhas genéricas para 150cc de entrada (medida compatível com CG/Fan de gerações antigas costuma servir de referência de tamanho, mas confirme a medida exata com a pastilha usada como amostra) custam R$ 25-45 o jogo contra R$ 60-100+ de peças com marca fechada Shineray.',
  },
]
const XY1505_MAX_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Disco dianteiro empenado por superaquecimento em descidas longas',
    body: 'Em uso urbano intenso com muitas freadas (ou descidas longas de serra), o disco dianteiro fino de entrada da MAX pode empenar por superaquecimento — sintoma é trepidação no freio dianteiro em velocidade. Solução: troca do disco (R$ 60-120) — não tente "endireitar" disco empenado, o risco de falha é alto.',
  },
]
const XY1505_MAX_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'MAX: cronograma base + fluido de freio do disco dianteiro',
    body: 'Siga o cronograma base da plataforma XY 150-5. Adicional específico da MAX: se o sistema dianteiro for hidráulico a disco, troque o fluido de freio DOT 4 a cada 24 meses e verifique o nível mensalmente. Se for sistema a cabo com disco mecânico (mais comum nessa faixa de preço), regule a folga do cabo a cada 3.000 km.',
  },
]

// Trim: SPEED (versão esportiva, provável pneu mais largo e disco de série)
const XY1505_SPEED_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'SPEED: topo da linha 150-5 — pneu traseiro mais largo e visual esportivo',
    body: 'A versão SPEED é a mais equipada da linha 150-5, com carenagem/gráficos esportivos e pneu traseiro proporcionalmente mais largo que a Fire/Maxi Fire e a MAX. Pneu mais largo custa mais na troca — pesquise opções nacionais (Levorin, Rinaldi) antes de fechar com o pneu de marca importada que às vezes é empurrado na concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Estilo esportivo não muda o motor: mesma potência e mesmos cuidados da linha 150-5',
    body: 'Apesar do visual mais agressivo, a SPEED usa essencialmente o mesmo motor 149cc da Fire/Maxi Fire e da MAX — a diferença é estética e de equipamentos (pneu, freio, acabamento), não de performance de motor. Não espere resposta de acelerador diferente das outras versões da família; os cuidados de óleo, vela e carburador são idênticos.',
  },
]
const XY1505_SPEED_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carenagem plástica: parafusos de fixação trincam com vibração ao longo do tempo',
    body: 'A carenagem esportiva de plástico da SPEED tem pontos de fixação que trincam com a vibração do motor monocilíndrico ao longo dos anos — comum em qualquer moto de plástico dessa faixa de preço. Reforce os pontos de fixação com borrachas/arruelas de amortecimento ao notar folga ou rangido na carenagem, evita trinca maior.',
  },
]
const XY1505_SPEED_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'SPEED: cronograma base + atenção ao pneu traseiro largo',
    body: 'Siga o cronograma base da plataforma XY 150-5. Adicional específico da SPEED: como o pneu traseiro é mais largo, calibre com mais frequência (semanalmente) — pneu largo em moto leve tende a perder pressão de forma mais perceptível na dirigibilidade. Verifique o desgaste do pneu a cada 3.000 km, principalmente as bordas (uso esportivo desgasta de forma desigual).',
  },
]

// ─── XY 150-8 JEF (base de plataforma — JEF, JEF S, JEF S EFI) ────────────────
// Motor confirmado (manual oficial Shineray, JEF 150S): 149cc monocilíndrico
// 4T, 2 válvulas OHC, arrefecido a ar, bore×curso 62×49,5mm, taxa 9,0:1,
// carburador (base JEF), 5 marchas, embreagem multidisco em óleo, CDI,
// transmissão por corrente. Potência base: 10,3cv @ 7.500rpm / torque 14N·m @ 6.000rpm.
// Roda 90/90-17 (F) e 120/80-17 (R). Freio dianteiro hidráulico a disco 240mm,
// traseiro a tambor. Bateria 12V/7Ah, partida elétrica + pedal, farol H4 12V
// 35/35W, lanterna/DRL em LED. Geração mais recente da linha 150cc Shineray (2018+).

const JEF_BASE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Ficha real de fábrica: motor 149cc 62×49,5mm, taxa 9,0:1, 10,3cv @ 7.500rpm',
    body: 'Segundo o manual oficial Shineray, a JEF usa motor monocilíndrico 4 tempos, 2 válvulas, OHC, arrefecido a ar, 149cm³, bore×curso 62×49,5mm, taxa de compressão 9,0:1, 5 marchas, embreagem multidisco em banho de óleo. Potência de 10,3cv a 7.500 rpm e torque de 14N·m a 6.000 rpm na versão carburada. Guarde essa ficha — é útil para comparar peças com concorrentes (CG160 Start, Factor 150) na hora de negociar preço de peça equivalente em loja de autopeças.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — mesma regra da linha 150-5, troca a cada 3.000 km',
    body: 'A JEF mantém a exigência de óleo JASO MA (embreagem úmida) da geração anterior. Use 20W-50 mineral/semissintético (Lubrax Moto, Shell Advance, Motul 3000). Troca recomendada a cada 3.000 km em uso urbano — pode esticar um pouco (até 4.000 km) com óleo semissintético de melhor qualidade, mas não ultrapasse isso; o motor de entrada não perdoa negligência no óleo.',
  },
  {
    severity: 'OK',
    title: 'Freio dianteiro a disco hidráulico de série: verifique o fluido a cada 6 meses',
    body: 'A linha JEF já vem de fábrica com disco hidráulico dianteiro de 240mm — mais eficiente que o sistema a tambor da geração 150-5 antiga. Isso significa fluido de freio DOT 4 para acompanhar: verifique o nível no reservatório a cada 6 meses e troque o fluido a cada 24 meses (absorve umidade com o tempo, perde eficiência de frenagem mesmo sem vazamento visível).',
  },
  {
    severity: 'OK',
    title: 'Bateria 12V/7Ah — mantenha carregada, principalmente com uso esporádico',
    body: 'A JEF usa bateria selada 12V/7Ah com partida elétrica (e pedal como reserva). Se a moto ficar parada mais de 2-3 semanas, a bateria de entrada tende a descarregar mais rápido que uma bateria de melhor qualidade — use o pedal de partida nesse caso, ou mantenha um carregador de manutenção (R$ 80-150) se a moto ficar muito tempo parada. Bateria de reposição genérica 12V7Ah: R$ 90-150.',
  },
  {
    severity: 'OK',
    title: 'Pneus 90/90-17 (F) e 120/80-17 (R): aro 17" facilita achar pneu bom e barato',
    body: 'Diferente do aro 18" da geração 150-5 antiga, a JEF usa aro 17" nas duas rodas — medida muito mais popular no Brasil (mesma faixa de CG/Fan/Titan), o que facilita encontrar pneus de qualidade a preço justo. Opções nacionais: Levorin Duna, Rinaldi RA50, Pirelli Citynet — R$ 90-160 cada, bem mais barato que pneu de aro 18" de reposição para a linha antiga.',
  },
  {
    severity: 'WARN',
    title: 'Farol H4 e sinalização em LED: cuidado ao trocar lâmpada H4 genérica',
    body: 'O farol usa lâmpada H4 12V 35/35W convencional (fácil de achar e trocar, R$ 15-30), mas a sinalização de posição/DRL é em LED de fábrica. Se o DRL falhar, não tente substituir por lâmpada convencional de mesmo encaixe sem verificar a tensão/corrente — o circuito é dimensionado para LED e pode não funcionar direito ou queimar fusível com carga incompatível. Fusível: 15A, tenha um reserva na bagageira.',
  },
]

const JEF_BASE_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carburador da versão base: mesmo cuidado com etanol da geração anterior',
    body: 'A JEF (versão base, não-EFI) mantém carburador, então herda a mesma sensibilidade ao etanol nacional que empasta o jato principal em moto parada por semanas. Se notar marcha lenta instável ou dificuldade de pegar a frio depois de um período parada, considere drenar a cuba do carburador antes de guardar por muito tempo, ou fazer limpeza preventiva anual do carburador (R$ 60-120).',
  },
  {
    severity: 'WARN',
    title: 'Freio a tambor traseiro: regule a folga do pedal a cada 3.000 km',
    body: 'O traseiro da JEF ainda é a tambor (só o dianteiro é disco). Com o desgaste da lona, o curso do pedal aumenta gradualmente — regule a haste/came de acionamento a cada 3.000 km para manter resposta de frenagem consistente. Lona gasta demais + regulagem no limite = frenagem traseira comprometida em emergência.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de série: qualidade básica, cuidado redobrado com lubrificação',
    body: 'A corrente original de fábrica é de qualidade de entrada — sem O-ring de vedação de graxa como correntes premium. Isso significa que a lubrificação a cada 500 km não é sugestão, é necessidade: sem isso, a corrente seca rápido e desgasta o kit relação (pinhão/coroa) prematuramente, encurtando a vida útil de todo o conjunto de 20.000 km esperados para 12.000-15.000 km.',
  },
  {
    severity: 'WARN',
    title: 'CDI e retificador: mesmo ponto de atenção elétrico da linha 150-5',
    body: 'Apesar de ser uma geração mais nova, a JEF ainda usa CDI e retificador de qualidade de entrada — os mesmos componentes que mais falham na linha 150-5 antiga também são pontos de atenção aqui. Monitore a tensão da bateria com a moto ligada (multímetro no polo, deve marcar 13,5-14,5V a 4.000 rpm) periodicamente para pegar uma falha de retificador antes que ela destrua a bateria.',
  },
]

const JEF_BASE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma JEF (plataforma base): revisão a cada 3.000 km',
    body: '500 km — Troca de óleo de rodagem. | 1.000 km — Segunda troca de óleo (20W-50) + reaperto geral. | 3.000 km — Troca de óleo (20W-50, ~1,0-1,1L). Lubrificar corrente. Verificar fluido de freio dianteiro. | 5.000 km — Limpeza do filtro de ar. Regular folga do freio a tambor traseiro. | 7.500 km — Vela nova, verificar gap. Folga de válvulas (motor frio). | 10.000 km — Filtro de ar novo. Limpeza preventiva do carburador (versão base). | 15.000-20.000 km — Kit relação completo. Pastilha do disco dianteiro (inspeção; troca conforme desgaste). | 24 meses — Fluido de freio DOT 4. | Anual — Tensão do CDI/retificador (multímetro, 13,5-14,5V a 4.000 rpm).',
  },
]

// Trim: JEF S (versão intermediária, ainda carburada, provável rodas de liga)
const JEF_S_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'JEF S: mesma base mecânica da JEF, potência levemente maior (~11-12cv) e melhor consumo',
    body: 'Segundo fichas técnicas de revenda, a JEF S entrega em torno de 11-12cv (ligeiramente acima dos 10,3cv da JEF base) e consumo médio divulgado de ~32,5 km/l. A diferença provavelmente vem de ajuste de mapa de carburação/relação de compressão e acabamento (rodas de liga, grafismo) mais do que de um motor diferente — a manutenção de base (óleo, vela, corrente) segue idêntica à JEF.',
  },
]
const JEF_S_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Rodas de liga (se equipada): mais sensíveis a impacto de buraco que a raiada da JEF base',
    body: 'Se a sua JEF S vier com rodas de liga leve (mais comum nesse trim que na JEF básica), lembre que elas trincam em vez de amassar em impacto forte de buraco — diferente da roda raiada que só entorta e pode ser realinhada. Após qualquer buraco forte, inspecione visualmente a roda antes de seguir viagem.',
  },
]
const JEF_S_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'JEF S: cronograma da base JEF, sem alteração de intervalo',
    body: 'Siga o cronograma da plataforma base JEF (óleo a cada 3.000 km, vela a 7.500 km, etc). Não há intervalo diferenciado documentado para a JEF S — a diferença de potência/consumo em relação à JEF base não altera os intervalos de manutenção do motor.',
  },
]

// Trim: JEF S EFI (versão injetada — Free 150 EFI usa a mesma base de injeção)
const JEF_S_EFI_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'EFI (injeção eletrônica): adeus aos problemas de carburador entupido por etanol',
    body: 'A JEF S EFI troca o carburador por injeção eletrônica de combustível — a mudança mais importante da linha 150-8. Isso elimina o problema histórico de jato entupido por verniz de etanol que afeta toda a linha carburada (150-5 e JEF/JEF S). Partida a frio também fica mais consistente, sem precisar "afogar" a moto. Em compensação, a EFI depende de bateria/sistema elétrico saudável para funcionar — moto com bateria fraca não liga tão facilmente quanto uma carburada com pedal.',
  },
  {
    severity: 'OK',
    title: 'Corpo de borboleta (throttle body): limpeza preventiva substitui a limpeza de carburador',
    body: 'No lugar da limpeza de carburador, a JEF S EFI precisa de limpeza do corpo de borboleta (throttle body) a cada 15.000-20.000 km ou se notar marcha lenta instável — sujeira de combustível ainda se acumula, só que em menor quantidade que num carburador. Use spray específico para corpo de borboleta (não use removedor de carburador comum, pode danificar o sensor TPS). Serviço em oficina especializada em injeção: R$ 80-150.',
  },
  {
    severity: 'OK',
    title: 'Compatível com a base mecânica da linha Free 150 EFI da Shineray',
    body: 'O sistema de injeção da JEF S EFI compartilha a base com outros modelos injetados recentes da Shineray no Brasil (como a Free 150 EFI, que tem manual de proprietário publicado pela própria marca). Isso amplia a rede de mecânicos com experiência prática no sistema — procure oficinas que já atendem a linha Free 150 EFI se sua região não tiver especialista específico em JEF.',
  },
]
const JEF_S_EFI_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Bateria fraca compromete a partida e pode acender luz de injeção',
    body: 'Como a EFI depende de sensores e da bomba de combustível elétrica, uma bateria fraca (abaixo de ~11,8V) pode causar partida difícil, marcha lenta instável ou até acender luz de injeção no painel (se equipada) por queda de tensão momentânea — sintoma que engana o dono a pensar em problema de injeção quando o real problema é elétrico. Meça a tensão da bateria em repouso antes de levar para diagnóstico de injeção: deve estar acima de 12,4V.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível interna ao tanque: nunca rode com reserva muito baixa',
    body: 'A bomba de combustível da EFI fica submersa dentro do tanque e é resfriada/lubrificada pelo próprio combustível. Rodar com o tanque quase vazio com frequência reduz a vida útil da bomba (superaquecimento). Diferente do carburador (que tolera rodar quase seco ocasionalmente), a EFI pede mais disciplina em não deixar o tanque chegar à reserva com frequência.',
  },
  {
    severity: 'WARN',
    title: 'Diagnóstico de falha de injeção exige scanner — nem toda oficina de bairro tem',
    body: 'Diferente do carburador (que qualquer mecânico de moto popular sabe limpar/regular "no olho"), uma falha na EFI pode exigir scanner de diagnóstico OBD para moto para ler códigos de erro. Procure oficinas que atendem injeção eletrônica de motos populares (a maioria das grandes cidades já tem esse serviço, custo de diagnóstico R$ 80-200) em vez de insistir numa oficina só de mecânica tradicional.',
  },
]
const JEF_S_EFI_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'JEF S EFI: cronograma da base JEF, trocando "carburador" por "corpo de borboleta"',
    body: 'Siga o cronograma da plataforma base JEF para óleo (3.000 km), vela (7.500 km), corrente, freios e kit relação. Diferença específica da EFI: não há limpeza de carburador — no lugar, limpeza do corpo de borboleta a cada 15.000-20.000 km. Adicione também: verificação da tensão da bateria a cada 3 meses (a EFI é mais sensível a bateria fraca que a versão carburada) e inspeção do filtro de combustível/bomba a cada 20.000 km.',
  },
]

// ─── XY 150 ZH (naked street, geração 2006-2014, independente) ───────────────

const XYZH_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Naked street de entrada da Shineray no Brasil desde meados dos anos 2000',
    body: 'A XY 150 ZH foi uma das primeiras 150cc da Shineray vendidas no Brasil, chegando na leva de marcas chinesas que baratearam a entrada na categoria 150cc no país (concorrendo direto com CG150/Titan e Factor na faixa de preço, não de desempenho). Motor monocilíndrico 149cc a ar, carburador, configuração mecânica simples — foco total em baixo custo de aquisição e manutenção básica.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — mesma regra de toda a família 150cc Shineray de carburador',
    body: 'Assim como a linha XY 150-5 e a JEF base, a ZH usa óleo JASO MA obrigatório pela embreagem em banho de óleo. 20W-50 mineral (Lubrax, Shell Advance) a cada 2.500-3.000 km é a recomendação mais segura para esse motor de entrada — não estique o intervalo mesmo com óleo semissintético, o motor não foi projetado para isso.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor genéricas 150cc chinês servem — mesma lógica da linha 150-5',
    body: 'Como o motor é da mesma família genérica 150cc usada por outras marcas de entrada no Brasil, pistão, anéis, biela e retentores costumam ter equivalentes genéricos em lojas de peças para motos populares chinesas, mesmo quando a peça Shineray original está indisponível na sua região. Leve a peça velha como referência de medida ao comprar o equivalente.',
  },
  {
    severity: 'OK',
    title: 'Vela e carburador: cuidados idênticos aos da linha 150-5',
    body: 'Vela NGK C7HSA/D8EA, gap 0,6-0,7mm, troca a cada 8.000 km. Carburador sensível a etanol degradado em moto parada — drene a cuba ou rode a moto semanalmente para evitar entupimento do jato principal. Limpeza preventiva anual do carburador evita boa parte dos problemas de marcha lenta irregular reportados por donos.',
  },
  {
    severity: 'WARN',
    title: 'Moto mais antiga no mercado de usados: confira histórico de manutenção elétrica antes de comprar',
    body: 'Como a ZH é a geração mais antiga dessa lista (produção concentrada entre meados dos anos 2000 e início dos 2010), unidades hoje têm 10+ anos de uso — CDI, retificador e chicote elétrico são os itens que mais desgastam com o tempo, não só com a quilometragem. Ao comprar uma ZH usada, teste a partida a frio, meça a tensão de carga da bateria e confira se as luzes/sinalização funcionam todas antes de fechar negócio.',
  },
]

const XYZH_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e retificador envelhecidos: maior causa de pane elétrica em unidades com 10+ anos',
    body: 'Em unidades mais antigas da ZH, o CDI e o retificador de voltagem — já os pontos elétricos mais frágeis de fábrica dessa geração — chegam ao fim de vida útil natural. Sintomas: moto que não pega do nada (CDI), ou bateria que não seguinte carga/farol fraco em marcha lenta (retificador). Como são peças descontinuadas em muitas regiões, prefira CDI e retificador genéricos compatíveis com 150cc chinês (confirme pinagem com multímetro), R$ 40-90 e R$ 35-80 respectivamente.',
  },
  {
    severity: 'WARN',
    title: 'Peças originais mais escassas que na linha 150-5/JEF, por ser modelo mais antigo',
    body: 'A ZH sendo o modelo mais antigo da lista, peças originais Shineray para ela são ainda mais escassas que para a linha 150-5 ou JEF, mesmo em concessionárias. Priorize sempre a busca por equivalente genérico 150cc — funciona na maioria dos componentes de motor e elétrica básica — e reserve a peça original só para itens muito específicos de carenagem/plástico.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em partes metálicas expostas: comum em unidades de uso externo prolongado',
    body: 'Sendo uma moto de entrada com pintura/cromado de qualidade básica, unidades da ZH guardadas ao relento por anos apresentam corrosão em parafusos, escapamento e partes cromadas mais cedo que motos de marca com melhor tratamento de superfície. Lave e lubrifique pontos de articulação (pedal de câmbio, pedal de freio, cavalete) periodicamente para evitar travamento por ferrugem.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor primário e pela bengala: mesmo padrão da linha 150-5',
    body: 'Motor da mesma família da linha 150-5, então herda a mesma tendência de vazamento pelo retentor do eixo primário (acima de 20.000 km) e pelo retentor da bengala dianteira em uso com pavimento ruim. Inspecione visualmente essas duas áreas a cada revisão — em uma moto com muitos anos de uso, é bem provável que pelo menos um dos dois já precise de atenção.',
  },
]

const XYZH_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 150 ZH: mesma lógica de plataforma da linha 150-5',
    body: '500 km — Troca de óleo de rodagem. | 1.000 km — Segunda troca de óleo + reaperto geral. | 2.500-3.000 km — Troca de óleo 20W-50. Lubrificar corrente. | 5.000 km — Limpeza do filtro de ar. Verificar gap da vela. | 8.000 km — Troca da vela (gap 0,6-0,7mm). Folga de válvulas (motor frio). | 10.000 km — Filtro de ar novo. Limpeza do carburador se necessário. | 15.000-20.000 km — Kit relação completo. Inspecionar retentor do eixo primário e da bengala. | Anual (obrigatório em unidades com 10+ anos) — Teste completo de partida a frio, tensão de carga da bateria e sinalização elétrica.',
  },
]

// ─── XY 150-GY/EXPLORER (trail urbana, 19"F/17"R, independente) ──────────────
// Confirmado: 149,5cc, partida elétrica, bateria 12V/6,5Ah, CDI transistorizado,
// setas em LED, tanque ~11,5-12L, freio traseiro a disco, roda dianteira 19"
// e traseira 17", suspensão traseira pro-link reforçada, velocidade máx. ~100km/h,
// carga máxima 150kg.

const XYGY_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Trail urbana: aro 19" na frente e 17" atrás — combinação incomum na categoria 150cc',
    body: 'A GY/EXPLORER foge do padrão CG-style da XY 150-5/JEF: usa aro 19" dianteiro e 17" traseiro, típico de moto trail, com suspensão dianteira reforçada e traseira pro-link para uso misto (asfalto + terra leve). Isso significa pneus diferentes das outras Shineray 150cc — não são intercambiáveis com a linha JEF (17"/17") nem com a 150-5 (18"/18"). Confirme a medida exata antes de comprar pneu de reposição.',
  },
  {
    severity: 'OK',
    title: 'Ficha real: 149,5cc, bateria 12V/6,5Ah, CDI transistorizado, setas em LED',
    body: 'Especificações confirmadas de fábrica: motor 149,5cc, sistema elétrico com bateria 12V/6,5Ah, ignição CDI transistorizado e setas em LED. Velocidade máxima em torno de 100 km/h e capacidade de carga de até 150kg — dentro do esperado para uma trail de entrada 150cc. Tanque de aproximadamente 11,5-12L (incluindo reserva).',
  },
  {
    severity: 'OK',
    title: 'Freio traseiro a disco: item raro na categoria trail 150cc de entrada',
    body: 'Diferente de muitas trails de entrada da mesma faixa de preço (que costumam trazer tambor traseiro), a GY/EXPLORER vem com disco no freio traseiro de fábrica — frenagem mais consistente em terra solta e menos sujeita a perda de eficiência por barro/água acumulados no tambor. Mantenha o fluido de freio das duas rodas em dia (troca a cada 24 meses).',
  },
  {
    severity: 'OK',
    title: 'Suspensão pro-link traseira: reforçada para uso off-road leve, revise o óleo a cada 20.000 km',
    body: 'A suspensão traseira pro-link (mais elaborada que um simples par de amortecedores convencionais) é dimensionada para uso misto com maior curso. Em uso off-road frequente, verifique vazamentos no monoamortecedor e o estado das buchas do link a cada 10.000 km — o sistema tem mais pontos de articulação que uma suspensão convencional, logo mais pontos passíveis de desgaste.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor: mesma lógica de compatibilidade genérica 150cc chinês da família Shineray',
    body: 'O motor 149,5cc segue a mesma família construtiva das demais Shineray 150cc — pistão, anéis, biela e retentores de motor geralmente têm equivalente genérico disponível em lojas de peças para motos chinesas populares. Peças específicas de suspensão/chassi trail (mais exclusivas do modelo), porém, são mais dependentes da rede Shineray ou de importação — pesquise antes de precisar em uma viagem.',
  },
  {
    severity: 'WARN',
    title: 'Uso off-road: lubrifique a corrente com mais frequência que no uso urbano',
    body: 'Em uso off-road (terra, poeira, lama), lubrifique a corrente a cada 200-300 km em vez dos 500 km padrão de uso urbano — a abrasão de terra/poeira acelera o desgaste. Depois de andar na lama, limpe a corrente com querosene (nunca gasolina, que resseca a vedação) antes de lubrificar novamente.',
  },
]

const XYGY_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e retificador: mesmo ponto fraco elétrico do restante da família Shineray 150cc',
    body: 'Apesar da configuração mecânica diferente das outras 150cc Shineray, a GY/EXPLORER compartilha o histórico de fragilidade elétrica em CDI e retificador/regulador. Sintomas e solução são os mesmos: CDI ruim = moto não pega sem faísca; retificador ruim = bateria não carrega ou sobrecarrega. Monitore a tensão de carga periodicamente (13,5-14,5V a 4.000 rpm) e prefira componentes genéricos compatíveis quando a peça original não estiver disponível na sua região.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala: uso off-road acelera o desgaste ainda mais que na linha street',
    body: 'A suspensão dianteira reforçada ajuda a absorver impacto, mas o retentor da bengala ainda sofre com poeira/lama entrando pela manga superior em uso off-road frequente — o mesmo problema de vazamento reportado nas versões street da família Shineray, só que acelerado pelo ambiente mais agressivo. Considere protetores de bengala (fork boots, R$ 40-90 o par) se usar a moto em trilha com regularidade.',
  },
  {
    severity: 'WARN',
    title: 'Kit relação desgasta mais rápido em uso misto que uma trail usada só no asfalto',
    body: 'Uso misto (asfalto + terra) desgasta corrente, pinhão e coroa mais rápido que uso 100% urbano — pó abrasivo entra na corrente mesmo com lubrificação regular. Espere trocar o kit relação com mais frequência (a cada 12.000-15.000 km em uso off-road regular, contra 20.000 km em uso só de asfalto).',
  },
  {
    severity: 'WARN',
    title: 'Carburador: mesma sensibilidade a etanol da família Shineray de entrada',
    body: 'Como as demais Shineray 150cc não-EFI, a GY/EXPLORER usa carburador convencional sujeito a empastamento do jato principal com etanol degradado em moto parada por semanas. Se a moto for usada em trilhas esporadicamente e ficar parada entre uma saída e outra, drene a cuba do carburador ou rode a moto semanalmente para evitar entupimento.',
  },
]

const XYGY_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 150-GY/EXPLORER: intervalos padrão + atenção extra ao uso off-road',
    body: '500 km — Troca de óleo de rodagem. | 1.000 km — Segunda troca de óleo + reaperto geral do motor e da suspensão. | 3.000 km — Troca de óleo 20W-50 JASO MA. Lubrificação da corrente (reduza para 200-300 km em uso off-road). | 5.000 km — Limpeza do filtro de ar (mais frequente se uso off-road com poeira). Verificar gap da vela. | 8.000 km — Troca da vela. Folga de válvulas (motor frio). Inspeção da suspensão pro-link (buchas do link). | 10.000-12.000 km — Filtro de ar novo. Kit relação (antecipar em uso off-road regular). Fluido de freio DOT 4 (dianteiro e traseiro a disco). | 20.000 km — Óleo da suspensão traseira (monoamortecedor) se aplicável. Revisão geral da bengala dianteira reforçada.',
  },
]

// ─── Blocos de modelos (ordem: base 150-5 + 3 trims, base JEF + 2 trims, ZH, GY) ─

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'XY 150-5',
    yearFrom: 2009,
    yearTo: 2015,
    MACETES: XY1505_BASE_MACETES,
    PROBLEMAS: XY1505_BASE_PROBLEMAS,
    MANUTENCAO: XY1505_BASE_MANUTENCAO,
  },
  {
    modelName: 'XY 150-5 Fire/Maxi Fire',
    yearFrom: 2009,
    yearTo: 2015,
    MACETES: XY1505_FIRE_MACETES,
    PROBLEMAS: XY1505_FIRE_PROBLEMAS,
    MANUTENCAO: XY1505_FIRE_MANUTENCAO,
  },
  {
    modelName: 'XY 150-5 MAX',
    yearFrom: 2011,
    yearTo: 2015,
    MACETES: XY1505_MAX_MACETES,
    PROBLEMAS: XY1505_MAX_PROBLEMAS,
    MANUTENCAO: XY1505_MAX_MANUTENCAO,
  },
  {
    modelName: 'XY 150-5 SPEED',
    yearFrom: 2011,
    yearTo: 2015,
    MACETES: XY1505_SPEED_MACETES,
    PROBLEMAS: XY1505_SPEED_PROBLEMAS,
    MANUTENCAO: XY1505_SPEED_MANUTENCAO,
  },
  {
    modelName: 'XY 150-8 JEF',
    yearFrom: 2018,
    yearTo: null,
    MACETES: JEF_BASE_MACETES,
    PROBLEMAS: JEF_BASE_PROBLEMAS,
    MANUTENCAO: JEF_BASE_MANUTENCAO,
  },
  {
    modelName: 'XY 150-8 JEF S',
    yearFrom: 2019,
    yearTo: null,
    MACETES: JEF_S_MACETES,
    PROBLEMAS: JEF_S_PROBLEMAS,
    MANUTENCAO: JEF_S_MANUTENCAO,
  },
  {
    modelName: 'XY 150-8 JEF S EFI',
    yearFrom: 2022,
    yearTo: null,
    MACETES: JEF_S_EFI_MACETES,
    PROBLEMAS: JEF_S_EFI_PROBLEMAS,
    MANUTENCAO: JEF_S_EFI_MANUTENCAO,
  },
  {
    modelName: 'XY 150 ZH',
    yearFrom: 2006,
    yearTo: 2014,
    MACETES: XYZH_MACETES,
    PROBLEMAS: XYZH_PROBLEMAS,
    MANUTENCAO: XYZH_MANUTENCAO,
  },
  {
    modelName: 'XY 150-GY/EXPLORER',
    yearFrom: 2009,
    yearTo: null,
    MACETES: XYGY_MACETES,
    PROBLEMAS: XYGY_PROBLEMAS,
    MANUTENCAO: XYGY_MANUTENCAO,
  },
]

// ─── Calibragens (só os 8 modelos reais — sem base virtual, ver header) ───────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'XY 150 ZH',
    yearFrom: 2006, yearTo: 2014,
    tireSize: '2.75-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 28 PSI. Com garupa: F 26 / R 33 PSI. Medida estimada, típica de naked street 150cc chinesa de entrada da geração — confirme com o pneu original ainda instalado antes de calibrar. Verifique semanalmente, sempre com pneu frio.',
  },
  {
    modelName: 'XY 150-5 Fire/Maxi Fire',
    yearFrom: 2009, yearTo: 2015,
    tireSize: '2.75-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 28 PSI. Com garupa: F 26 / R 33 PSI. Versão de entrada da linha 150-5, freio a tambor nas duas rodas. Pneus nacionais recomendados: Levorin, Rinaldi RA50.',
  },
  {
    modelName: 'XY 150-5 MAX',
    yearFrom: 2011, yearTo: 2015,
    tireSize: '2.75-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 28 PSI. Com garupa: F 26 / R 33 PSI. Mesma base de pneus da Fire/Maxi Fire — o que muda no trim MAX é o freio dianteiro (disco) e o acabamento das rodas.',
  },
  {
    modelName: 'XY 150-5 SPEED',
    yearFrom: 2011, yearTo: 2015,
    tireSize: '2.75-18 (F) · 100/90-18 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 26, rearPsiLoad: 35,
    notes: 'Solo: F 26 / R 30 PSI. Com garupa: F 26 / R 35 PSI. Pneu traseiro mais largo que as demais versões da linha 150-5 (trim esportivo do topo de linha) — calibre com mais frequência.',
  },
  {
    modelName: 'XY 150-8 JEF',
    yearFrom: 2018, yearTo: null,
    tireSize: '90/90-17 (F) · 120/80-17 (R)',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo: F 28 / R 32 PSI. Com garupa: F 28 / R 36 PSI. Medida oficial de fábrica (manual do proprietário Shineray). Aro 17" nas duas rodas — muito mais fácil de achar pneu de reposição que a linha 150-5 (aro 18").',
  },
  {
    modelName: 'XY 150-8 JEF S',
    yearFrom: 2019, yearTo: null,
    tireSize: '90/90-17 (F) · 120/80-17 (R)',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo: F 28 / R 32 PSI. Com garupa: F 28 / R 36 PSI. Mesma medida de pneu da JEF base — a diferença do trim S é potência levemente maior e acabamento, não pneus.',
  },
  {
    modelName: 'XY 150-8 JEF S EFI',
    yearFrom: 2022, yearTo: null,
    tireSize: '90/90-17 (F) · 120/80-17 (R)',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo: F 28 / R 32 PSI. Com garupa: F 28 / R 36 PSI. Mesma base de rodas/pneus da linha JEF — a diferença da EFI é só o sistema de alimentação de combustível.',
  },
  {
    modelName: 'XY 150-GY/EXPLORER',
    yearFrom: 2009, yearTo: null,
    tireSize: '2.75-19 (F) · 100/90-17 (R)',
    frontPsi: 24, rearPsi: 28,
    frontPsiLoad: 24, rearPsiLoad: 33,
    notes: 'Solo: F 24 / R 28 PSI. Com garupa: F 24 / R 33 PSI. Combinação trail 19"/17" (confirmada de fábrica) — pressão um pouco menor que as versões street da família para melhor tração em terra. Em uso 100% asfalto, pode subir 2 PSI em cada roda.',
  },
]

// ─── Itens de manutenção (só os 8 modelos reais) ──────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // XY 150 ZH
  { modelName: 'XY 150 ZH', yearFrom: 2006, yearTo: 2014, component: 'Óleo 20W-50 JASO MA (~1,0-1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 149cc a ar, embreagem úmida. Nunca usar JASO MB.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 150 ZH', yearFrom: 2006, yearTo: 2014, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Corrente sem O-ring — lubrificação frequente é essencial. Folga 20-30mm.', priority: 'HIGH', order: 2 },
  { modelName: 'XY 150 ZH', yearFrom: 2006, yearTo: 2014, component: 'Vela NGK C7HSA/D8EA (gap 0,6-0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Verificar gap a cada 5.000 km.', priority: 'MEDIUM', order: 3 },
  { modelName: 'XY 150 ZH', yearFrom: 2006, yearTo: 2014, component: 'Limpeza/troca do filtro de ar', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma: lavar com querosene, secar, umedecer com óleo. Papel: apenas trocar.', priority: 'MEDIUM', order: 4 },
  { modelName: 'XY 150 ZH', yearFrom: 2006, yearTo: 2014, component: 'Folga de válvulas', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'XY 150 ZH', yearFrom: 2006, yearTo: 2014, component: 'Limpeza do carburador', intervalKm: 10000, intervalMonths: 12, notes: 'Ou antes, se moto ficou parada semanas. Etanol empasta o jato principal.', priority: 'MEDIUM', order: 6 },
  { modelName: 'XY 150 ZH', yearFrom: 2006, yearTo: 2014, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 18000, intervalMonths: null, notes: 'Trocar kit completo, não só a corrente.', priority: 'HIGH', order: 7 },
  { modelName: 'XY 150 ZH', yearFrom: 2006, yearTo: 2014, component: 'Verificação de CDI e retificador (13,5-14,5V @ 4.000rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto crítico em unidades com mais de 10 anos de uso.', priority: 'CRITICAL', order: 8 },
  { modelName: 'XY 150 ZH', yearFrom: 2006, yearTo: 2014, component: 'Retentor da bengala e do eixo primário — inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Vazamento de óleo comum acima dessa quilometragem.', priority: 'MEDIUM', order: 9 },

  // XY 150-5 Fire/Maxi Fire
  { modelName: 'XY 150-5 Fire/Maxi Fire', yearFrom: 2009, yearTo: 2015, component: 'Óleo 20W-50 JASO MA (~1,0-1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Embreagem úmida — JASO MA obrigatório.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 150-5 Fire/Maxi Fire', yearFrom: 2009, yearTo: 2015, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Folga 20-30mm no trecho inferior.', priority: 'HIGH', order: 2 },
  { modelName: 'XY 150-5 Fire/Maxi Fire', yearFrom: 2009, yearTo: 2015, component: 'Inspeção da lona de freio a tambor (F+R)', intervalKm: 5000, intervalMonths: null, notes: 'Exige desmontagem da roda — sem indicador visual externo como o disco.', priority: 'HIGH', order: 3 },
  { modelName: 'XY 150-5 Fire/Maxi Fire', yearFrom: 2009, yearTo: 2015, component: 'Vela NGK C7HSA/D8EA (gap 0,6-0,7mm)', intervalKm: 8000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'XY 150-5 Fire/Maxi Fire', yearFrom: 2009, yearTo: 2015, component: 'Limpeza/troca do filtro de ar', intervalKm: 5000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'XY 150-5 Fire/Maxi Fire', yearFrom: 2009, yearTo: 2015, component: 'Limpeza do carburador', intervalKm: 10000, intervalMonths: 12, notes: 'Sensível a etanol degradado em moto parada.', priority: 'MEDIUM', order: 6 },
  { modelName: 'XY 150-5 Fire/Maxi Fire', yearFrom: 2009, yearTo: 2015, component: 'Kit relação completo', intervalKm: 18000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },

  // XY 150-5 MAX
  { modelName: 'XY 150-5 MAX', yearFrom: 2011, yearTo: 2015, component: 'Óleo 20W-50 JASO MA (~1,0-1,1L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'XY 150-5 MAX', yearFrom: 2011, yearTo: 2015, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'XY 150-5 MAX', yearFrom: 2011, yearTo: 2015, component: 'Pastilha/fluido do freio dianteiro a disco', intervalKm: 12000, intervalMonths: 24, notes: 'Fluido DOT 4 a cada 24 meses. Pastilha conforme desgaste (~12.000km).', priority: 'HIGH', order: 3 },
  { modelName: 'XY 150-5 MAX', yearFrom: 2011, yearTo: 2015, component: 'Vela NGK C7HSA/D8EA (gap 0,6-0,7mm)', intervalKm: 8000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'XY 150-5 MAX', yearFrom: 2011, yearTo: 2015, component: 'Limpeza/troca do filtro de ar', intervalKm: 5000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'XY 150-5 MAX', yearFrom: 2011, yearTo: 2015, component: 'Limpeza do carburador', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'XY 150-5 MAX', yearFrom: 2011, yearTo: 2015, component: 'Kit relação completo', intervalKm: 18000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'XY 150-5 MAX', yearFrom: 2011, yearTo: 2015, component: 'Inspeção da roda de liga (trincas)', intervalKm: null, intervalMonths: 12, notes: 'Após qualquer impacto forte de buraco, inspecionar antes de rodar.', priority: 'MEDIUM', order: 8 },

  // XY 150-5 SPEED
  { modelName: 'XY 150-5 SPEED', yearFrom: 2011, yearTo: 2015, component: 'Óleo 20W-50 JASO MA (~1,0-1,1L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'XY 150-5 SPEED', yearFrom: 2011, yearTo: 2015, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'XY 150-5 SPEED', yearFrom: 2011, yearTo: 2015, component: 'Calibragem do pneu traseiro largo', intervalKm: null, intervalMonths: null, notes: 'Verificar semanalmente — pneu mais largo perde pressão de forma mais perceptível.', priority: 'MEDIUM', order: 3 },
  { modelName: 'XY 150-5 SPEED', yearFrom: 2011, yearTo: 2015, component: 'Vela NGK C7HSA/D8EA (gap 0,6-0,7mm)', intervalKm: 8000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'XY 150-5 SPEED', yearFrom: 2011, yearTo: 2015, component: 'Limpeza/troca do filtro de ar', intervalKm: 5000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'XY 150-5 SPEED', yearFrom: 2011, yearTo: 2015, component: 'Limpeza do carburador', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'XY 150-5 SPEED', yearFrom: 2011, yearTo: 2015, component: 'Kit relação completo', intervalKm: 18000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'XY 150-5 SPEED', yearFrom: 2011, yearTo: 2015, component: 'Inspeção dos pontos de fixação da carenagem', intervalKm: null, intervalMonths: 12, notes: 'Trincam com vibração ao longo dos anos.', priority: 'LOW', order: 8 },

  // XY 150-8 JEF
  { modelName: 'XY 150-8 JEF', yearFrom: 2018, yearTo: null, component: 'Óleo 20W-50 JASO MA (~1,0-1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 149cc, 62×49,5mm, taxa 9,0:1 (ficha oficial Shineray).', priority: 'HIGH', order: 1 },
  { modelName: 'XY 150-8 JEF', yearFrom: 2018, yearTo: null, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'XY 150-8 JEF', yearFrom: 2018, yearTo: null, component: 'Fluido de freio dianteiro (disco 240mm)', intervalKm: null, intervalMonths: 24, notes: 'DOT 4. Verificar nível a cada 6 meses.', priority: 'HIGH', order: 3 },
  { modelName: 'XY 150-8 JEF', yearFrom: 2018, yearTo: null, component: 'Regulagem do freio traseiro a tambor', intervalKm: 3000, intervalMonths: null, notes: 'Regular folga do pedal conforme desgaste da lona.', priority: 'MEDIUM', order: 4 },
  { modelName: 'XY 150-8 JEF', yearFrom: 2018, yearTo: null, component: 'Vela (gap conforme manual)', intervalKm: 7500, intervalMonths: null, notes: 'Potência de fábrica 10,3cv @ 7.500rpm.', priority: 'MEDIUM', order: 5 },
  { modelName: 'XY 150-8 JEF', yearFrom: 2018, yearTo: null, component: 'Limpeza/troca do filtro de ar', intervalKm: 5000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'XY 150-8 JEF', yearFrom: 2018, yearTo: null, component: 'Limpeza do carburador (versão base)', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'XY 150-8 JEF', yearFrom: 2018, yearTo: null, component: 'Kit relação completo', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'XY 150-8 JEF', yearFrom: 2018, yearTo: null, component: 'Verificação de bateria 12V/7Ah', intervalKm: null, intervalMonths: 6, notes: 'Mais crítica em uso esporádico.', priority: 'MEDIUM', order: 9 },

  // XY 150-8 JEF S
  { modelName: 'XY 150-8 JEF S', yearFrom: 2019, yearTo: null, component: 'Óleo 20W-50 JASO MA (~1,0-1,1L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'XY 150-8 JEF S', yearFrom: 2019, yearTo: null, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'XY 150-8 JEF S', yearFrom: 2019, yearTo: null, component: 'Fluido de freio dianteiro (disco)', intervalKm: null, intervalMonths: 24, notes: 'DOT 4.', priority: 'HIGH', order: 3 },
  { modelName: 'XY 150-8 JEF S', yearFrom: 2019, yearTo: null, component: 'Vela', intervalKm: 7500, intervalMonths: null, notes: 'Potência ~11-12cv (levemente acima da JEF base).', priority: 'MEDIUM', order: 4 },
  { modelName: 'XY 150-8 JEF S', yearFrom: 2019, yearTo: null, component: 'Limpeza/troca do filtro de ar', intervalKm: 5000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'XY 150-8 JEF S', yearFrom: 2019, yearTo: null, component: 'Limpeza do carburador', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'XY 150-8 JEF S', yearFrom: 2019, yearTo: null, component: 'Kit relação completo', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'XY 150-8 JEF S', yearFrom: 2019, yearTo: null, component: 'Inspeção da roda de liga (se equipada)', intervalKm: null, intervalMonths: 12, notes: 'Trincam em impacto de buraco, diferente da roda raiada.', priority: 'LOW', order: 8 },

  // XY 150-8 JEF S EFI
  { modelName: 'XY 150-8 JEF S EFI', yearFrom: 2022, yearTo: null, component: 'Óleo 20W-50 JASO MA (~1,0-1,1L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'XY 150-8 JEF S EFI', yearFrom: 2022, yearTo: null, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'XY 150-8 JEF S EFI', yearFrom: 2022, yearTo: null, component: 'Limpeza do corpo de borboleta (throttle body)', intervalKm: 17500, intervalMonths: null, notes: 'Substitui a limpeza de carburador da versão a carburador. Não usar removedor de carburador comum.', priority: 'MEDIUM', order: 3 },
  { modelName: 'XY 150-8 JEF S EFI', yearFrom: 2022, yearTo: null, component: 'Verificação de tensão da bateria', intervalKm: null, intervalMonths: 3, notes: 'EFI é mais sensível a bateria fraca que a versão carburada — mínimo 12,4V em repouso.', priority: 'HIGH', order: 4 },
  { modelName: 'XY 150-8 JEF S EFI', yearFrom: 2022, yearTo: null, component: 'Filtro de combustível / bomba interna ao tanque', intervalKm: 20000, intervalMonths: null, notes: 'Não rodar com reserva muito baixa com frequência — superaquece a bomba.', priority: 'MEDIUM', order: 5 },
  { modelName: 'XY 150-8 JEF S EFI', yearFrom: 2022, yearTo: null, component: 'Fluido de freio dianteiro (disco)', intervalKm: null, intervalMonths: 24, notes: 'DOT 4.', priority: 'HIGH', order: 6 },
  { modelName: 'XY 150-8 JEF S EFI', yearFrom: 2022, yearTo: null, component: 'Vela', intervalKm: 7500, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'XY 150-8 JEF S EFI', yearFrom: 2022, yearTo: null, component: 'Kit relação completo', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 8 },

  // XY 150-GY/EXPLORER
  { modelName: 'XY 150-GY/EXPLORER', yearFrom: 2009, yearTo: null, component: 'Óleo 20W-50 JASO MA (~1,0-1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 149,5cc a ar (ficha oficial de fábrica).', priority: 'HIGH', order: 1 },
  { modelName: 'XY 150-GY/EXPLORER', yearFrom: 2009, yearTo: null, component: 'Lubrificação da corrente', intervalKm: 300, intervalMonths: null, notes: 'Reduzir para 200-300km em uso off-road (padrão urbano: 500km).', priority: 'HIGH', order: 2 },
  { modelName: 'XY 150-GY/EXPLORER', yearFrom: 2009, yearTo: null, component: 'Fluido de freio (disco dianteiro + disco traseiro)', intervalKm: null, intervalMonths: 24, notes: 'DOT 4 — os dois freios são a disco de fábrica, item raro na categoria.', priority: 'HIGH', order: 3 },
  { modelName: 'XY 150-GY/EXPLORER', yearFrom: 2009, yearTo: null, component: 'Vela', intervalKm: 8000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'XY 150-GY/EXPLORER', yearFrom: 2009, yearTo: null, component: 'Limpeza do filtro de ar', intervalKm: 4000, intervalMonths: 12, notes: 'Mais frequente que uso urbano puro por causa da poeira off-road.', priority: 'MEDIUM', order: 5 },
  { modelName: 'XY 150-GY/EXPLORER', yearFrom: 2009, yearTo: null, component: 'Limpeza do carburador', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'XY 150-GY/EXPLORER', yearFrom: 2009, yearTo: null, component: 'Kit relação completo', intervalKm: 14000, intervalMonths: null, notes: 'Antecipado em relação ao uso urbano puro (20.000km) por causa do desgaste em terra.', priority: 'HIGH', order: 7 },
  { modelName: 'XY 150-GY/EXPLORER', yearFrom: 2009, yearTo: null, component: 'Inspeção da suspensão pro-link traseira', intervalKm: 10000, intervalMonths: null, notes: 'Vazamento no monoamortecedor e desgaste das buchas do link.', priority: 'MEDIUM', order: 8 },
  { modelName: 'XY 150-GY/EXPLORER', yearFrom: 2009, yearTo: null, component: 'Verificação de CDI e retificador (13,5-14,5V @ 4.000rpm)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 9 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Shineray 150cc (XY ZH / 150-5 / 150-8 JEF / GY-Explorer)...')

  const motoType = await prisma.vehicleType.upsert({
    where: { slug: 'moto' },
    update: {},
    create: { slug: 'moto', label: 'Moto' },
  })

  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'SHINERAY', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'SHINERAY', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${brand.name}`)

  for (const block of BLOCKS) {
    // Mandatório: só cria VehicleModel para os 8 nomes FIPE reais — os blocos-base
    // "virtuais" (XY 150-5, XY 150-8 JEF) existem apenas como fonte de conteúdo
    // compartilhado via union de regex, não como página SEO própria.
    if (REAL_MODEL_NAMES.includes(block.modelName)) {
      await prisma.vehicleModel.upsert({
        where: { name_brandId: { name: block.modelName, brandId: brand.id } },
        update: {},
        create: { name: block.modelName, brandId: brand.id },
      })
    }

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
        yearFrom: null,
        yearTo: null,
        order: idx,
      })),
    })

    const counts = {
      m: block.MACETES.length,
      p: block.PROBLEMAS.length,
      mt: block.MANUTENCAO.length,
    }
    console.log(
      `  🔧 ${block.modelName} (${block.yearFrom ?? '?'}–${block.yearTo ?? 'atual'}): ` +
      `${counts.m} macetes, ${counts.p} problemas, ${counts.mt} manutenção${REAL_MODEL_NAMES.includes(block.modelName) ? '' : ' [base virtual]'}`,
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

  console.log('\n  🔧 Cronogramas de manutenção...')
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
    `\n✅ Seed Shineray 150cc concluído: ${BLOCKS.length} blocos (${REAL_MODEL_NAMES.length} modelos reais), ` +
    `${totalTips} dicas, ${TIRE_PRESSURES.length} calibragens, ${MAINTENANCE_ITEMS.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
