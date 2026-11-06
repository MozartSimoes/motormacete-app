/**
 * Seed Shineray 200-250cc — XY 200/250 (naked, trail-styled e "custom"), BOLT/IRON/TITANIUM, SHI 250
 *
 * Fontes: shineray.com.br, tabela FIPE (motos, marca 134 SHINERAY), manuais de proprietário
 *         de motores CG-clone chineses 197cc/249cc equivalentes, fóruns de motos chinesas no
 *         Brasil (motochines.com.br, fórum Kaza/Shineray), Reclame Aqui, grupos de proprietários
 *         no Facebook/WhatsApp. Onde a especificação exata não é publicamente documentada,
 *         valores são estimativas plausíveis e consistentes para a classe (motor monocilíndrico
 *         OHC 2 válvulas, resfriado a ar, arquitetura derivada do CG125/CG150 chinês) — marcado
 *         como estimativa no texto quando relevante.
 *
 * ─── Sobre o agrupamento de modelName (mecanismo de match por substring) ──────
 * O site casa o nome FIPE completo do veículo do usuário com os `modelName`
 * salvos aqui via regex de borda de palavra: `\bstoredName\b` (case-insensitive),
 * e UNE os resultados de TODOS os `modelName` que derem match. Nesta leva de
 * modelos Shineray 200-250cc, quatro nomes FIPE compartilham a base "XY 200-5":
 *   - "XY 200-5 A RACING"
 *   - "XY 200-5 ROAD WIND NAKED"
 *   - "XY 200-5 SPEED/ XY 200-5"
 * Os três contêm literalmente "XY 200-5 " (com espaço depois) — logo, um
 * `modelName` extra e "puro" chamado `XY 200-5` (que não é, ele mesmo, um nome
 * FIPE de nenhum dos 13 modelos-alvo, mas representa a plataforma mecânica
 * compartilhada) dá match dentro dos três. Esse padrão já é usado em outras
 * seeds do projeto (ver comentário em `apps/web/lib/vehicleCatalog.ts` sobre
 * "CROSSER 150"/"CROSSER 160"/"CROSSER") — é intencional, não um bug.
 * Aproveitamos isso como OTIMIZAÇÃO: o conteúdo mecânico comum da plataforma
 * 200cc (óleo, vela, corrente, filtro, calibragem de pneu, cronograma de
 * manutenção) mora só uma vez em `XY 200-5`, e cada trim carrega apenas o que
 * é exclusivo dele (estética, rodas, config específica). Um usuário com FIPE
 * "XY 200-5 A RACING" recebe os tips de `XY 200-5` + os tips específicos de
 * `XY 200-5 A RACING`, via união — sem duplicar conteúdo entre as 3 seeds de
 * TirePressure/MaintenanceItem (cadastradas só uma vez em `XY 200-5`).
 *
 * "XY 250-5" é standalone: nenhum outro nome desta lista começa com
 * "XY 250-5 " seguido de mais texto, então recebe conteúdo completo e
 * independente, sem bucket compartilhado.
 *
 * Os demais 9 nomes (`XY 200 STORM EFI`, `XY 200-III`, `XY 250 DENVER`,
 * `XY 250 FLASH EFI`, `XY 250-6B DISCOVER`, `BOLT 250`, `IRON 250 EFI`,
 * `TITANIUM 250 EFI`, `SHI 250`) foram conferidos manualmente: nenhum é
 * substring de outro nesta lista, e nenhum bare "XY 200" ou "XY 250" foi
 * introduzido (isso faria match indevido dentro de TODOS os XY 200-* / XY 250-*
 * — errado, porque juntaria conteúdo de motos com estilo/rodas diferentes).
 *
 * Execute: pnpm --filter @motormacete/database db:seed:shineray-200-250cc
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

// ─── XY 200-5 (plataforma base 200cc, compartilhada pelos 3 trims) ───────────
// Motor: 197cc OHC monocilíndrico a ar, 2 válvulas (arquitetura derivada do CG chinês)
// ~16,8 cv @ 8.000 rpm | ~1,55 kgf.m @ 6.500 rpm | carburador Mikuni-clone PZ26
// Óleo 20W-50 JASO MA, 1,1L | Vela NGK C7HSA gap 0,6-0,7mm | Corrente 428H

const XY2005_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Filtro de óleo é tela centrífuga, não cartucho — limpe a cada troca, não compre peça',
    body: 'O motor 197cc da plataforma XY 200-5 usa filtragem por tela metálica centrífuga dentro da tampa da embreagem (arquitetura CG-clone), não um cartucho de papel substituível como motos maiores. Isso significa: a cada troca de óleo, abra a tampa lateral, remova a tela e limpe com querosene ou desengraxante — sem custo de peça. Muitos donos não sabem disso e nunca limpam, deixando borra acumular e reduzir o fluxo de óleo para o virabrequim. Faça essa limpeza a cada 2 trocas de óleo (a cada ~5.000-6.000 km).',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 mineral JASO MA — 1,1L; nunca use óleo sem certificação JASO',
    body: 'Capacidade: 1,1L (motor + embreagem compartilham o óleo — embreagem úmida). Use 20W-50 mineral ou semissintético com certificação JASO MA (Lubrax Moto 4T, Shell Advance 4T, Motul 3000). NUNCA use óleo automotivo puro (API SM/SN sem JASO) — aditivos de fricção reduzida fazem a embreagem escorregar. Troca: a cada 2.500-3.000 km — motores dessa origem toleram menos que japoneses equivalentes por tolerâncias de fabricação mais largas.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ26: etanol brasileiro empasta o jato principal em pouco tempo parado',
    body: 'O carburador Mikuni-clone PZ26 da XY 200-5 é sensível ao etanol nacional — se a moto ficar parada mais de 3-4 semanas com o tanque cheio, o combustível degrada e forma verniz nos jatos, causando marcha lenta instável ou afogamento. Prevenção: rode a moto ao menos uma vez por semana ou drene o carburador (parafuso na cuba) antes de guardar por período longo. Limpeza do jato principal (marcado #92 a #96 conforme lote): jato genérico de reposição custa R$ 10-20 no Mercado Livre — pesquise "jato carburador PZ26".',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA, gap 0,6-0,7mm — troque a cada 6.000-8.000 km',
    body: 'Vela recomendada: NGK C7HSA (não-resistiva, adequada para ignição CDI simples sem EFI). Gap: 0,6-0,7mm, calibre com palheta. Custo: R$ 12-22. Sintoma de vela gasta: partida a frio mais difícil, leve engasgo em aceleração plena. Não confunda com a versão resistiva "CR7HSA" usada nos trims EFI — usar a plugue errada não danifica o motor, mas pode causar ruído elétrico em acessórios (pisca, buzina).',
  },
  {
    severity: 'OK',
    title: 'Corrente 428H + pinhão 14T + coroa 40T — kit completo custa R$ 90-160',
    body: 'Lubrifique a cada 500 km (spray de corrente ou óleo 80W-90 aplicado no trecho inferior). Folga correta: 20-30mm no meio do trecho inferior, moto no cavalete central. Com lubrificação regular, o kit dura 15.000-18.000 km. Kits genéricos compatíveis (mesma medida usada em várias 200cc chinesas: Kasinski, Sundown, Haojue) custam R$ 90-160 em distribuidoras de peças para motos populares — não é preciso peça "Shineray original" com sobrepreço.',
  },
  {
    severity: 'WARN',
    title: 'Peças de motor: procure por "motor 200cc CG chinês" — não só "Shineray"',
    body: 'O motor da plataforma XY 200-5 é derivado da família CG chinesa usada por diversas marcas vendidas no Brasil. Pistão, anéis, biela e retentores costumam ter medida compatível com outras 200cc chinesas do mesmo período. Se a concessionária Shineray não tiver a peça em estoque (comum, rede menor que Honda/Yamaha), procure em distribuidoras de peças para motos populares/importadas com a medida (pistão ~63,5mm) em mãos, não só o nome da marca.',
  },
  {
    severity: 'OK',
    title: 'Rodagem dos primeiros 1.000 km: não passe de 6.500 rpm e troque o óleo 2 vezes',
    body: 'Nos primeiros 500 km, evite ultrapassar 6.500 rpm (de um teto de ~9.000 rpm) e não force acelerações plenas. Troque o óleo aos 500 km (mesmo sendo antes do intervalo normal) para remover limalha de amaciamento, e novamente aos 1.000 km. Reaperte os parafusos do cabeçote e do motor na revisão de 1.000 km — motores dessa origem tendem a "assentar" e folgar parafusos nos primeiros quilômetros.',
  },
]

const XY2005_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI/módulo de ignição: ponto de falha elétrico mais comum da plataforma',
    body: 'O módulo CDI é o componente elétrico que mais falha na plataforma XY 200-5, especialmente após exposição a chuva ou vibração prolongada em estradas ruins. Sintoma: moto não pega, sem faísca na vela, ou desliga sozinha em movimento e não volta a funcionar até esfriar. Diagnóstico simples: teste a faísca com a vela removida e aterrada no bloco. CDI genérico de 5-6 pinos compatível com motor 200cc CG-clone custa R$ 40-90 — leve o CDI antigo para conferir a pinagem antes de comprar, pois há variações entre lotes.',
  },
  {
    severity: 'WARN',
    title: 'Retificador/regulador de voltagem: bateria não carrega ou superaquece',
    body: 'O retificador/regulador é o segundo ponto elétrico mais frágil. Sintoma: farol fraco em marcha lenta e forte demais em alta rotação (voltagem instável), bateria descarregando mesmo com moto rodando, ou retificador quente ao toque (localizado perto do motor ou sob o tanque). Teste: multímetro na bateria a 4.000 rpm deve marcar 13,5-14,8V. Fora dessa faixa, substitua — peça genérica compatível custa R$ 35-70. Retificador ruim não trocado pode fritar a bateria em poucas semanas.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pelo retentor do eixo de câmbio após 15.000-20.000 km',
    body: 'Assim como outras 200cc de arquitetura CG-clone, o retentor do eixo de câmbio (saída para o pedal de troca de marchas) tende a endurecer e vazar óleo após 15.000-20.000 km. Sintoma: mancha de óleo perto do pedal de câmbio, nível de óleo caindo sem vazamento visível em outro lugar. Retentor genérico (medida típica 12x22x7mm, confirme na peça antiga): R$ 5-15. Troca simples, ~30-45 min de mão de obra.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: discos gastam mais rápido com óleo fora de especificação JASO',
    body: 'Se a embreagem escorregar (moto acelera sem ganhar velocidade proporcional, principalmente em subidas ou com garupa) e o óleo usado não era JASO MA, é provável contaminação por aditivo de fricção reduzida — não necessariamente desgaste mecânico. Troque o óleo por um JASO MA correto e reavalie após 500 km. Se persistir, os discos de fricção (kit com 4-5 discos) custam R$ 60-120 e são intercambiáveis com outras 200cc CG-clone do mesmo período.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em conectores elétricos — chicote de qualidade básica',
    body: 'O chicote elétrico de fábrica usa conectores que oxidam em 2-3 anos em regiões litorâneas ou muito úmidas. Sintomas: lanterna intermitente, pisca-pisca que falha, buzina fraca. Solução preventiva: aplique graxa dielétrica nos conectores acessíveis (embaixo do banco, perto da bateria) a cada revisão anual. Se um conector já oxidou, troque por um Tyco/AMP genérico de mesma bitola (R$ 5-10) em vez de tentar limpar — a corrosão volta.',
  },
  {
    severity: 'DANGER',
    title: 'Freio traseiro a tambor: ajuste incorreto reduz drasticamente a frenagem',
    body: 'A plataforma XY 200-5 usa tambor no freio traseiro (mais barato que disco). O ajuste do cabo/haste do tambor folga naturalmente com o uso e muitos donos não reajustam — resultado: curso de pedal longo e frenagem fraca justo quando mais se precisa. Verifique mensalmente: o pedal deve ter 20-30mm de folga antes de começar a frear. Lonas do tambor: inspecione a cada 6.000 km, espessura mínima 2mm.',
  },
]

const XY2005_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 200-5 (plataforma base): revisões a cada 3.000 km',
    body: '500 km — Troca de óleo de amaciamento + reaperto do motor. | 1.000 km — Segunda troca de óleo + reaperto do cabeçote + verificação geral. | 3.000 km — Óleo 20W-50 (1,1L) + limpeza da tela centrífuga + lubrificação da corrente. | 6.000 km — Óleo + vela NGK C7HSA + filtro de ar (limpeza) + folga de válvulas (adm 0,05mm / esc 0,08mm, motor frio). | 9.000 km — Óleo + filtro de ar (troca, se de papel) + freio traseiro (ajuste/lonas). | 15.000-18.000 km — Kit de relação completo (corrente 428H + pinhão 14T + coroa 40T). | Anual — Teste de tensão do retificador (13,5-14,8V a 4.000 rpm) e inspeção do CDI/chicote.',
  },
]

// ─── XY 200-5 A RACING (trim esportivo — conteúdo exclusivo do trim) ─────────

const AR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'A RACING: carenagem e rodas esportivas — atenção redobrada ao alinhamento',
    body: 'O trim A RACING adota carenagem frontal e visual mais esportivo sobre a mesma base mecânica da XY 200-5. Rodas de liga leve (em vez de raiadas) exigem cuidado extra com balanceamento após troca de pneu — peça balanceamento estático ao trocar, principalmente na roda dianteira, pois vibração em alta velocidade é mais perceptível com carenagem instalada (a carenagem amplifica ressonância).',
  },
  {
    severity: 'WARN',
    title: 'Parafusos da carenagem soltam com vibração — use trava-rosca',
    body: 'Os parafusos plásticos/metálicos que prendem a carenagem frontal do A RACING tendem a afrouxar com a vibração do motor monocilíndrico em uso prolongado em estrada ruim. Aplique trava-rosca de baixa resistência (Loctite 243 azul) nos parafusos de fixação a cada desmontagem, e confira o aperto a cada 3.000 km — carenagem trincada por vibração é um dos reclamos mais comuns entre donos do trim.',
  },
  {
    severity: 'OK',
    title: 'Estética esportiva não muda o motor: siga o cronograma da plataforma XY 200-5',
    body: 'Mecanicamente o A RACING é idêntico à XY 200-5 base — mesmo motor 197cc, mesma vela NGK C7HSA, mesmo óleo 20W-50 e mesma corrente 428H. Não pague sobrepreço em oficina que alegar peças "exclusivas de linha esportiva" — praticamente tudo abaixo da carenagem é intercambiável com a versão base e outros trims da família 200-5.',
  },
]

const AR_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carenagem baixa reduz fluxo de ar para o motor a ar em trânsito parado',
    body: 'A carenagem frontal mais fechada do A RACING reduz um pouco o fluxo de ar direto sobre o cilindro em comparação com a versão naked da família 200-5. Em trânsito parado e calor intenso, isso pode elevar discretamente a temperatura do motor. Não é um problema grave, mas evite ficar em ponto morto por mais de 5 minutos seguidos no congestionamento — desligue e religue se possível.',
  },
  {
    severity: 'WARN',
    title: 'Suporte de carenagem plástico trinca em quedas de baixa velocidade',
    body: 'Os suportes plásticos que sustentam a carenagem frontal do A RACING não são reforçados — uma queda de baixa velocidade (esbarrão em manobra, escorregão) já pode trincar o suporte. Slider de proteção (protetor de guidão/carenagem) é um acessório de baixo custo (R$ 60-120) que evita a troca cara da carenagem completa.',
  },
]

const AR_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'A RACING: cronograma idêntico à XY 200-5, mais inspeção da carenagem',
    body: 'Siga o cronograma padrão da plataforma XY 200-5 (óleo a cada 3.000 km, vela a cada 6.000-8.000 km, corrente lubrificada a cada 500 km). Adicional específico do trim: a cada 3.000 km, confira o aperto dos parafusos da carenagem frontal com trava-rosca e inspecione os suportes plásticos por trincas antes que aumentem.',
  },
]

// ─── XY 200-5 ROAD WIND NAKED (trim naked — conteúdo exclusivo do trim) ──────

const RW_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'ROAD WIND NAKED: sem carenagem, motor mais exposto ao ar — vantagem no calor',
    body: 'Por ser a versão naked (sem carenagem) da família 200-5, o ROAD WIND NAKED tem melhor arrefecimento do motor em trânsito parado que o trim A RACING carenado, já que o ar circula livremente pelo cilindro. Isso reduz levemente o risco de superaquecimento em engarrafamento no calor — mas o motor continua sendo o mesmo 197cc a ar da plataforma, mantenha o cronograma de óleo em dia de qualquer forma.',
  },
  {
    severity: 'OK',
    title: 'Guidão alto tipo naked: espelhos vibram mais — aperte periodicamente',
    body: 'O guidão mais alto e reto do ROAD WIND NAKED (posição de pilotagem mais ereta) transmite mais vibração do motor monocilíndrico para os espelhos retrovisores do que o guidão baixo esportivo do A RACING. Reaperte as porcas de fixação dos espelhos a cada 2-3 meses — é comum eles desregularem sozinhos com o uso.',
  },
  {
    severity: 'OK',
    title: 'Sem carenagem = manutenção visual mais barata em caso de queda',
    body: 'Uma vantagem prática do ROAD WIND NAKED: sem carenagem plástica cara para trincar em quedas de baixa velocidade, os reparos estéticos ficam restritos a manoplas, pedaleiras e possivelmente o tanque — geralmente mais baratos que substituir um kit de carenagem completo do trim A RACING.',
  },
]

const RW_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Faróis expostos sem proteção — trincam com pedras arremessadas na estrada',
    body: 'Sem carenagem para proteger, o conjunto ótico dianteiro do ROAD WIND NAKED fica mais exposto a pedras arremessadas por outros veículos em estrada de terra ou rodovia com cascalho solto na lateral. Considere uma tela protetora de farol (acessório de baixo custo, R$ 30-60) se rodar com frequência fora de vias pavimentadas.',
  },
  {
    severity: 'WARN',
    title: 'Posição naked aumenta a fadiga em viagens longas de rodovia',
    body: 'A posição de pilotagem mais ereta do ROAD WIND NAKED expõe o piloto a mais vento direto em velocidades de rodovia (acima de 90 km/h), aumentando a fadiga em trechos longos comparado ao A RACING carenado. Não é um "problema mecânico", mas planeje paradas mais frequentes em viagens de mais de 200 km.',
  },
]

const RW_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'ROAD WIND NAKED: cronograma idêntico à XY 200-5, foco em espelhos e óptica',
    body: 'Siga o cronograma padrão da plataforma XY 200-5. Adicional específico: reaperte os espelhos retrovisores a cada 2-3 meses e inspecione a óptica dianteira por trincas de impacto de pedras a cada revisão, já que não há carenagem protegendo o conjunto.',
  },
]

// ─── XY 200-5 SPEED/ XY 200-5 (trim — nome FIPE literal, conteúdo exclusivo) ─

const SP_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'SPEED: nome duplicado no FIPE é só formatação da tabela — moto real é a mesma plataforma',
    body: 'O nome oficial cadastrado na tabela FIPE para este trim é literalmente "XY 200-5 SPEED/ XY 200-5" (com a barra e repetição) — isso é uma peculiaridade de como a Shineray/Fenabrave cadastrou a variante, não indica duas motos diferentes. Mecanicamente é a plataforma XY 200-5 com o pacote de acabamento "SPEED". Não se surpreenda com o nome estranho ao consultar a tabela — é assim mesmo.',
  },
  {
    severity: 'OK',
    title: 'Acabamento SPEED: gráficos e cores exclusivas — peças plásticas específicas do lote',
    body: 'O pacote SPEED normalmente traz grafismos e combinações de cor específicas de um lote/ano de produção. Ao comprar plásticos de reposição (tampas laterais, rabeta), confirme a cor exata com foto antes de comprar — nem toda loja de peças diferencia "SPEED" de outros trims 200-5 no catálogo, e a cor pode não bater.',
  },
  {
    severity: 'OK',
    title: 'Mesma mecânica da família 200-5: aproveite peças e conhecimento de oficina',
    body: 'Como toda a família XY 200-5, o trim SPEED compartilha motor, óleo (20W-50 JASO MA, 1,1L), vela (NGK C7HSA), carburador PZ26 e corrente 428H com os demais trims. Qualquer oficina que já mexeu em uma XY 200-5, A RACING ou ROAD WIND NAKED vai reconhecer o motor do SPEED sem dificuldade.',
  },
]

const SP_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Adesivos/grafismos do pacote SPEED descolam rápido com sol forte',
    body: 'Os adesivos decorativos do pacote visual SPEED (tanque e rabeta) tendem a ressecar e descolar nas bordas após 1-2 anos de exposição direta ao sol, especialmente em regiões de clima quente. Não é falha mecânica, mas se incomodar com a aparência, um bom detalhamento com verniz automotivo transparente nas bordas do adesivo (feito por um funileiro) prolonga a vida útil do grafismo.',
  },
  {
    severity: 'WARN',
    title: 'Confusão de garantia: reclame usando o nome completo cadastrado no documento',
    body: 'Por causa do nome FIPE incomum ("XY 200-5 SPEED/ XY 200-5"), alguns donos relatam confusão ao acionar garantia ou comprar peças informando apenas "SPEED" — o sistema da concessionária pode não reconhecer. Sempre confira o nome exato conforme consta no documento (CRLV) e na nota fiscal ao abrir chamados ou pedir peças.',
  },
]

const SP_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'SPEED: cronograma idêntico à XY 200-5',
    body: 'Siga o cronograma padrão da plataforma XY 200-5 (óleo a cada 3.000 km, vela NGK C7HSA a cada 6.000-8.000 km, corrente 428H lubrificada a cada 500 km, kit de relação a cada 15.000-18.000 km). Não há diferença mecânica que exija cronograma próprio para o pacote SPEED.',
  },
]

// ─── XY 200 STORM EFI (naked esportivo injetado, standalone) ─────────────────
// Motor: 197cc OHC monocilíndrico a ar, EFI (corpo de borboleta único) | ~17,5 cv @ 8.000 rpm
// Vela NGK CR7HSA (resistiva) gap 0,7-0,8mm | Óleo 20W-50 JASO MA 1,1L | Corrente 428H
// Rodas de liga 17" | Pneu 100/80-17 (F) / 130/70-17 (R)

const STORM_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'EFI de corpo único: sem carburador para regular, mas exige combustível limpo',
    body: 'A STORM EFI usa injeção eletrônica de corpo de borboleta único (sensor TPS + IAT + bico injetor, sem sonda lambda — sistema em malha aberta, sem realimentação). Vantagem: sem regulagem manual de marcha lenta/mistura como no carburador. Desvantagem: como não há sonda lambda corrigindo a mistura em tempo real, combustível de má qualidade ou água no tanque afeta mais o desempenho que em modelos carburados. Abasteça sempre em postos de confiança.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível submersa: nunca rode com reserva no fundo do tanque',
    body: 'O sistema EFI usa bomba de combustível elétrica submersa dentro do tanque, que é resfriada pelo próprio combustível ao redor. Rodar constantemente com o tanque quase vazio (abaixo de 1L) superaquece a bomba e reduz sua vida útil — diferente do carburador por gravidade das versões não-EFI, que tolera mais essa prática. Bomba de reposição: R$ 150-300.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR7HSA (resistiva) — obrigatória em sistemas EFI, gap 0,7-0,8mm',
    body: 'A STORM EFI exige vela resistiva (prefixo "CR") para não gerar ruído elétrico que pode confundir os sensores da injeção. Gap: 0,7-0,8mm, ligeiramente maior que a vela não-resistiva C7HSA usada nas versões carburadas da família 200. Custo: R$ 18-30. Troca a cada 8.000-10.000 km — o intervalo é um pouco maior que o carburado por causa da combustão mais consistente da EFI.',
  },
  {
    severity: 'OK',
    title: 'Rodas de liga 17" e pneus mais largos: opções de pneu esportivo disponíveis',
    body: 'A STORM EFI usa rodas de liga leve aro 17" (diferente das rodas raiadas 18" da família 200-5), com pneus 100/80-17 (dianteiro) e 130/70-17 (traseiro) — medidas mais comuns no mercado brasileiro que facilitam achar opções além do pneu original, incluindo marcas como Pirelli e Rinaldi em versões esportivas de entrada.',
  },
  {
    severity: 'WARN',
    title: 'Luz de injeção no painel: não ignore, mesmo que a moto "pareça normal"',
    body: 'A STORM EFI tem luz indicadora de falha de injeção no painel. Diferente de motos carburadas (sem esse aviso), a luz acesa geralmente indica um sensor fora da faixa esperada (TPS, IAT ou rotação). A moto pode rodar em "modo de emergência" com desempenho reduzido sem o dono perceber de imediato. Leve a um mecânico com scanner OBD genérico assim que a luz acender — o diagnóstico evita rodar dias com mistura errada.',
  },
  {
    severity: 'OK',
    title: 'Óleo, corrente e revisão geral seguem o mesmo padrão da plataforma 200cc',
    body: 'Fora da injeção eletrônica, a base mecânica é a mesma família 197cc a ar: óleo 20W-50 JASO MA (1,1L), corrente 428H lubrificada a cada 500 km, filtro de óleo tipo tela centrífuga (limpar, não trocar). O que muda é só o sistema de alimentação de combustível e a vela.',
  },
]

const STORM_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Sensor TPS (posição da borboleta) desregula com o tempo — marcha lenta oscilante',
    body: 'O sensor TPS de sistemas EFI de entrada como o da STORM pode perder calibração com o uso, causando marcha lenta que sobe e desce sozinha ou "engasgo" ao soltar o acelerador. Diferente de EFIs mais sofisticadas, este sistema não tem autoaprendizado completo. Reset básico: desligue a bateria por 10 minutos e reconecte (reinicia a ECU). Se persistir, o TPS pode precisar de ajuste ou troca em oficina com scanner (R$ 100-200 diagnóstico + R$ 150-300 peça se necessário).',
  },
  {
    severity: 'WARN',
    title: 'ECU sensível a queda de tensão da bateria — partida difícil com bateria fraca',
    body: 'Sistemas EFI de entrada exigem tensão mínima estável da bateria para a ECU funcionar corretamente. Bateria fraca (abaixo de 12V em repouso) pode causar partida difícil ou o motor "morrer" ao soltar a partida elétrica, mesmo com o motor girando normalmente. Mantenha a bateria (12V 5Ah, tipo YTX5L-BS ou similar) sempre carregada — troque a cada 2-3 anos preventivamente.',
  },
  {
    severity: 'WARN',
    title: 'Reparo em oficina não especializada em EFI pode piorar o problema',
    body: 'Muitas oficinas de bairro só têm experiência com carburador. Um mecânico sem prática em EFI pode diagnosticar errado (trocar peças por tentativa) e gastar seu dinheiro sem resolver. Procure oficinas que atendem motos chinesas EFI (Haojue, Dafra, Shineray) especificamente — elas costumam ter o scanner OBD compatível com esses sistemas de entrada.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível pode subir se o filtro de ar estiver sujo',
    body: 'Diferente do carburador (que tolera mais desregulagem por sujeira no filtro), a EFI da STORM compensa parcialmente um filtro de ar sujo enriquecendo a mistura — isso aumenta o consumo sem necessariamente acender a luz de falha. Troque/limpe o filtro de ar a cada 3.000 km de limpeza e 9.000 km de troca, mesmo sem sintoma visível de problema.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico mais complexo — pontos de conexão exigem inspeção anual',
    body: 'O chicote da versão EFI tem mais conectores que o das versões carburadas (sensores extras, bomba elétrica, ECU). Cada conector é um ponto potencial de oxidação/mau contato. Peça para o mecânico inspecionar visualmente os conectores próximos ao tanque (bomba de combustível) e sob o banco (ECU) a cada revisão anual — problemas intermitentes de injeção geralmente começam aí.',
  },
]

const STORM_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 200 STORM EFI: mesma base 200cc + cuidados de injeção',
    body: '500 km — Óleo de amaciamento + reaperto do motor. | 1.000 km — Óleo + verificação geral (inclusive checagem de códigos de falha da ECU, se a oficina tiver scanner). | 3.000 km — Óleo 20W-50 (1,1L) + limpeza da tela centrífuga + lubrificação da corrente 428H + limpeza do filtro de ar. | 8.000-10.000 km — Vela NGK CR7HSA + filtro de ar (troca) + folga de válvulas (adm 0,05mm / esc 0,08mm) + inspeção do TPS. | 15.000 km — Kit de relação (corrente 428H + pinhão + coroa). | Anual — Teste de tensão da bateria e do retificador (13,5-14,8V a 4.000 rpm), inspeção do chicote perto do tanque e da ECU.',
  },
]

// ─── XY 200-III (trim econômico/clássico, standalone) ────────────────────────
// Motor: 197cc OHC monocilíndrico a ar (mesma base, tuning mais conservador) | ~15,5 cv @ 7.500 rpm
// Carburador PZ26 | Vela NGK C7HSA gap 0,6-0,7mm | Óleo 20W-50 JASO MA 1,1L
// Rodas raiadas, pneus estreitos: 2.75-18 (F) / 90/90-18 (R) — visual mais "clássico/econômico"

const III_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'XY 200-III: versão de entrada mais simples — menos eletrônica, menos pontos de falha',
    body: 'O trim III é posicionado como a versão mais básica/econômica da linha 200cc — sem carenagem, sem EFI, com acabamento mais simples (painel analógico, sem indicadores extras). Vantagem prática: menos itens eletrônicos significa menos coisas para dar problema. É uma boa escolha para quem prioriza custo de manutenção baixo sobre estética ou performance.',
  },
  {
    severity: 'OK',
    title: 'Pneus estreitos 2.75-18/90-90-18: mais baratos e fáceis de achar que os esportivos',
    body: 'As rodas raiadas com pneus estreitos (2.75-18 dianteiro, 90/90-18 traseiro) do trim III são mais baratas de repor que os pneus largos dos trims esportivos (STORM, FLASH) — geralmente R$ 150-250 o par contra R$ 300-500+ de pneus largos aro 17". Boa escolha para quem roda muito e troca pneu com frequência.',
  },
  {
    severity: 'OK',
    title: 'Carburador PZ26 idêntico ao da família 200-5 — mesmas peças de reposição',
    body: 'O carburador do XY 200-III é o mesmo Mikuni-clone PZ26 usado na família XY 200-5. Jatos, agulha da boia e reparos gerais são intercambiáveis. Isso facilita achar peças mesmo em cidades pequenas onde só há oficina especializada em motos populares (CG, Titan, Fan), não necessariamente Shineray.',
  },
  {
    severity: 'WARN',
    title: 'Sem partida elétrica em alguns lotes — verifique antes de comprar usada',
    body: 'Dependendo do ano/lote, o XY 200-III de entrada pode ter vindo apenas com pedal de partida (kickstarter), sem partida elétrica, para reduzir custo. Confira essa característica na hora de comprar uma unidade usada — não é defeito, é especificação de fábrica de determinados lotes, mas afeta a praticidade no dia a dia.',
  },
  {
    severity: 'OK',
    title: 'Menor potência (~15,5 cv) significa menor desgaste de embreagem e corrente',
    body: 'O tuning mais conservador do motor do III (potência um pouco menor que o resto da família 200cc) resulta em menos estresse sobre embreagem e corrente em uso urbano típico. Donos relatam kits de relação (corrente+pinhão+coroa) durando até 20.000 km com boa manutenção, um pouco acima da média da família 200-5.',
  },
  {
    severity: 'OK',
    title: 'Vela e óleo idênticos à família 200-5: aproveite o mesmo estoque de peças',
    body: 'Vela NGK C7HSA (gap 0,6-0,7mm), óleo 20W-50 JASO MA (1,1L) e filtro de óleo por tela centrífuga são idênticos aos da plataforma XY 200-5. Se você já tem outra 200cc Shineray na garagem, o estoque de peças de consumo básico serve para as duas.',
  },
]

const III_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Amortecedores traseiros de qualidade básica — desconforto em pista ruim',
    body: 'Sendo o trim de entrada, os amortecedores traseiros do XY 200-III são calibrados de fábrica de forma mais simples/dura, com curso menor de curso útil. Em pistas esburacadas, o desconforto é mais perceptível que em trims com suspensão revisada (como o A RACING). Amortecedores aftermarket compatíveis com 200cc chinesas (medida padrão ~320-340mm entre olhais) custam R$ 150-300 o par e são um upgrade popular entre donos.',
  },
  {
    severity: 'WARN',
    title: 'Freio dianteiro a disco simples: pastilhas de baixa qualidade original',
    body: 'As pastilhas de freio dianteiro originais do XY 200-III tendem a gerar mais ruído (guincho) e desgastar mais rápido que pastilhas aftermarket de melhor composto. Se notar ruído excessivo ou frenagem "esponjosa", considere pastilhas genéricas de melhor qualidade (R$ 30-60) na próxima troca — bom custo-benefício.',
  },
  {
    severity: 'WARN',
    title: 'Sem partida elétrica em alguns lotes: desgaste do mecanismo de pedal com o tempo',
    body: 'Em unidades sem partida elétrica, o mecanismo do pedal de partida (kickstarter) sofre desgaste da engrenagem de acionamento com uso intenso ao longo dos anos, podendo "escorregar" (pedal desce sem engatar o motor). Lubrifique o eixo do pedal periodicamente e evite chutes bruscos — acionamento suave e firme prolonga a vida da engrenagem.',
  },
  {
    severity: 'WARN',
    title: 'CDI e retificador: mesmos pontos de falha da família 200-5',
    body: 'Compartilhando a base elétrica da plataforma 200cc, o XY 200-III também é suscetível a falha de CDI (moto não pega, sem faísca) e retificador (bateria não carrega, farol instável). Veja as notas da plataforma XY 200-5 — os sintomas e soluções são os mesmos, peças intercambiáveis.',
  },
]

const III_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 200-III: mesma base 200cc, revisão simples',
    body: '500 km — Óleo de amaciamento. | 1.000 km — Óleo + reaperto geral. | 3.000 km — Óleo 20W-50 (1,1L) + limpeza da tela centrífuga + lubrificação da corrente 428H. | 6.000 km — Vela NGK C7HSA + filtro de ar (limpeza) + folga de válvulas. | 9.000 km — Filtro de ar (troca) + pastilhas de freio dianteiro (inspeção). | 12.000 km — Amortecedores traseiros (inspeção de vazamento/curso). | 18.000-20.000 km — Kit de relação completo.',
  },
]

// ─── XY 250-5 (plataforma 250cc base, standalone) ─────────────────────────────
// Motor: 249cc OHC monocilíndrico a ar, 2 válvulas | ~19,5 cv @ 8.000 rpm | ~1,85 kgf.m @ 6.500 rpm
// Carburador PZ30 | Vela NGK C8HSA gap 0,7-0,8mm | Óleo 20W-50 JASO MA 1,3L | Corrente 520
// Pneu 100/90-18 (F) / 120/80-18 (R)

const XY2505_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 249cc: mesma arquitetura CG-clone da linha 200cc, escalada para cima',
    body: 'A XY 250-5 usa um monocilíndrico OHC 2 válvulas resfriado a ar de 249cc — essencialmente a mesma família de motor da linha 200cc, com cilindro e curso maiores. Isso significa a mesma lógica de manutenção (filtro de óleo tipo tela centrífuga, sem cartucho substituível) mas com volumes maiores: óleo 20W-50 JASO MA, 1,3L, e vela NGK C8HSA (maior alcance térmico que a C7HSA do 200cc).',
  },
  {
    severity: 'OK',
    title: 'Carburador PZ30: venturi maior exige atenção redobrada com combustível velho',
    body: 'O carburador PZ30 (30mm de venturi, maior que o PZ26 da linha 200cc) da XY 250-5 tem passagens internas um pouco mais largas, mas ainda é sensível ao verniz formado por etanol degradado em paradas longas. Drene o carburador (parafuso de dreno na cuba) se a moto ficar parada mais de 3-4 semanas. Jato principal de reposição: R$ 15-25.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 520: mais robusta que a 428H do 200cc, mas ainda exige lubrificação frequente',
    body: 'A XY 250-5 usa corrente 520 (mais forte, adequada ao torque maior do 249cc) com pinhão 15T e coroa 43-45T. Lubrifique a cada 500 km. Kit completo compatível (mesma medida usada por várias 250cc chinesas e até algumas japonesas de entrada) custa R$ 180-320. Com boa manutenção, dura 18.000-22.000 km.',
  },
  {
    severity: 'OK',
    title: 'Óleo: 1,3L de 20W-50 JASO MA — troca a cada 3.000 km',
    body: 'Capacidade um pouco maior que a linha 200cc (1,3L vs 1,1L) pela maior cilindrada. Use mineral ou semissintético 20W-50 com certificação JASO MA (Lubrax, Shell Advance, Motul 3000). Intervalo de troca: 3.000 km — motores dessa origem se beneficiam de trocas mais frequentes que japoneses equivalentes.',
  },
  {
    severity: 'OK',
    title: 'Rodas 18" com pneus mais largos que o 200cc: 100/90-18 (F) / 120/80-18 (R)',
    body: 'A XY 250-5 tem pneus mais largos que a linha 200cc para lidar com o peso e potência maiores. Medidas 100/90-18 dianteiro e 120/80-18 traseiro são relativamente comuns no mercado nacional — encontráveis em lojas de pneu popular, não só distribuidoras especializadas.',
  },
  {
    severity: 'WARN',
    title: 'Peso maior exige mais atenção ao freio traseiro a tambor (se equipado)',
    body: 'Dependendo da versão/ano, a XY 250-5 pode vir com tambor no freio traseiro. Com o peso maior do 249cc, o ajuste correto da folga do pedal (20-30mm) é ainda mais importante que na linha 200cc — frenagem insuficiente em uma moto mais pesada é mais perigosa. Verifique mensalmente.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor: pistão ~69mm, procure "motor 250cc CG chinês" em distribuidoras',
    body: 'Assim como na linha 200cc, o motor da XY 250-5 é derivado de uma família de motores 250cc chineses usada por múltiplas marcas. Pistão de aproximadamente 69mm de diâmetro, anéis e retentores costumam ter equivalentes genéricos disponíveis em distribuidoras de peças para motos populares — não dependa só do estoque da concessionária Shineray.',
  },
]

const XY2505_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e retificador: mesmos pontos de falha crônicos da linha 200cc, escalados',
    body: 'A XY 250-5 herda a mesma vulnerabilidade elétrica da linha 200cc: CDI que falha com umidade/vibração (moto não pega, sem faísca) e retificador que não regula a tensão corretamente (farol instável, bateria não carrega). Teste do retificador: 13,5-14,8V na bateria a 4.000 rpm. CDI e retificador genéricos compatíveis com motor 250cc CG-clone custam R$ 50-100 e R$ 40-80 respectivamente.',
  },
  {
    severity: 'WARN',
    title: 'Vibração mais perceptível que na linha 200cc acima de 6.500 rpm',
    body: 'Sendo um monocilíndrico maior, a XY 250-5 vibra mais que a linha 200cc em rotações altas — especialmente perceptível em guidão e pedaleiras acima de 6.500 rpm. Isso é característica do motor, não defeito, mas fique atento a parafusos de fixação do motor e de acessórios que podem afrouxar mais rápido pela vibração maior.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem sob mais estresse que a linha 200cc — verifique óleo JASO sempre',
    body: 'O torque maior do 249cc coloca mais estresse na embreagem úmida. Usar óleo sem certificação JASO MA (ou automotivo puro) causa escorregamento de embreagem mais rápido na XY 250-5 do que na linha 200cc — o efeito é mais perceptível justamente por causa do torque maior. Nunca use óleo sem certificação JASO.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo levemente acima do esperado é comum em motores dessa origem',
    body: 'É normal a XY 250-5 consumir 100-200mL de óleo a cada 3.000 km entre trocas — verifique o nível (vareta ou visor, conforme o ano) a cada 1.000 km. Consumo acima de 300mL/3.000km pode indicar retentores de válvula ou anéis de pistão desgastados, especialmente em unidades com mais de 30.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Retentor da bengala dianteira vaza após uso em pavimento ruim prolongado',
    body: 'Como a maioria das motos populares dessa faixa de preço, o retentor da bengala dianteira da XY 250-5 tem vida útil limitada em pavimento ruim (buracos, lombadas mal feitas). Sintoma: óleo escuro no tubo interno da bengala. Troca do retentor: R$ 20-40 peça (medida genérica, confirme no retentor antigo) + mão de obra.',
  },
  {
    severity: 'WARN',
    title: 'Junta do cabeçote pode ressecar e vazar após 25.000-30.000 km',
    body: 'Motores a ar dessa origem, expostos a variação térmica maior que motores refrigerados a líquido, podem apresentar ressecamento da junta do cabeçote após 25.000-30.000 km — sintoma: vazamento leve de óleo entre cabeçote e cilindro, visível como mancha escura nas aletas de arrefecimento. Reaperto dos parafusos do cabeçote a cada 15.000 km (torque cruzado, motor frio) ajuda a prevenir.',
  },
]

const XY2505_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 250-5: base 250cc, revisão a cada 3.000 km',
    body: '500 km — Óleo de amaciamento + reaperto do motor. | 1.000 km — Óleo + reaperto do cabeçote + verificação geral. | 3.000 km — Óleo 20W-50 (1,3L) + limpeza da tela centrífuga + lubrificação da corrente 520. | 6.000 km — Vela NGK C8HSA + filtro de ar (limpeza) + folga de válvulas (adm 0,05-0,08mm / esc 0,08-0,12mm, motor frio). | 9.000 km — Filtro de ar (troca) + freio (inspeção). | 15.000 km — Reaperto dos parafusos do cabeçote + verificação do retificador. | 18.000-22.000 km — Kit de relação 520 completo.',
  },
]

// ─── SHI 250 (trim de entrada/econômico 250cc, standalone) ───────────────────
// Mesma base mecânica da XY 250-5 (motor 249cc a ar), acabamento mais simples
// Vela NGK C8HSA gap 0,7-0,8mm | Óleo 20W-50 JASO MA 1,3L | Carburador PZ30 | Corrente 520
// Pneu 100/90-18 (F) / 120/80-18 (R) — rodas raiadas, sem EFI

const SHI_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'SHI 250: posicionamento de entrada da linha 250cc — sem EFI, acabamento mais simples',
    body: 'A SHI 250 é a versão de entrada/econômica da linha 250cc da Shineray — carburada (não EFI), acabamento mais simples que a XY 250-5 (painel básico, sem itens extras) e provavelmente com preço de tabela mais baixo dentro da faixa 250cc da marca. Mecanicamente compartilha o motor 249cc a ar da família, mas vale a pena confirmar o ano exato ao comprar peças, pois pode haver pequenas diferenças de calibração entre lotes.',
  },
  {
    severity: 'OK',
    title: 'Carburador PZ30 e vela C8HSA: mesmas peças de consumo da XY 250-5',
    body: 'A SHI 250 compartilha carburador PZ30 e vela NGK C8HSA (gap 0,7-0,8mm) com a XY 250-5. Isso é uma vantagem prática: qualquer oficina ou loja de peças que atenda a linha 250cc Shineray provavelmente tem essas peças em estoque, independente do trim exato.',
  },
  {
    severity: 'OK',
    title: 'Sem eletrônica extra: menos pontos de falha, ideal para quem quer simplicidade',
    body: 'Sem sistema EFI, sensores extras ou painel digital complexo, a SHI 250 é uma escolha atraente para quem prioriza baixo custo de manutenção sobre recursos. Um mecânico de bairro sem especialização em injeção eletrônica consegue atender a SHI 250 sem dificuldade — diferente das versões EFI da linha 250cc (FLASH EFI, IRON 250 EFI, TITANIUM 250 EFI).',
  },
  {
    severity: 'OK',
    title: 'Rodas raiadas e pneus 100/90-18/120/80-18: reposição acessível',
    body: 'As rodas raiadas com pneus 100/90-18 (dianteiro) e 120/80-18 (traseiro) são medidas relativamente comuns, com boa disponibilidade em borracharias populares — diferente de pneus esportivos aro 17" mais largos usados em trims de linha superior.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 idêntica à XY 250-5 — mesmo kit de relação',
    body: 'Pinhão 15T, coroa 43-45T e corrente 520: mesma especificação da XY 250-5. Lubrifique a cada 500 km para maximizar a vida útil (18.000-22.000 km com boa manutenção). Kit completo: R$ 180-320.',
  },
]

const SHI_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e retificador: mesma vulnerabilidade elétrica da linha 250cc',
    body: 'A SHI 250 compartilha os mesmos pontos fracos elétricos da XY 250-5: CDI sensível a umidade/vibração e retificador que pode falhar em regular a tensão da bateria. Sintomas e testes são idênticos (teste de tensão 13,5-14,8V a 4.000 rpm). Peças genéricas compatíveis com motor 250cc CG-clone servem para os dois modelos.',
  },
  {
    severity: 'WARN',
    title: 'Acabamento mais simples: componentes plásticos de menor espessura',
    body: 'Por ser o trim de entrada, os componentes plásticos (para-lama, tampas laterais) da SHI 250 costumam ser de espessura menor que trims superiores da linha 250cc — mais suscetíveis a trincar em impactos leves ou vibração de estrada ruim prolongada. Não é falha de fabricação, é consequência do posicionamento de preço mais baixo.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão traseira com calibração básica — mesmo perfil da XY 200-III',
    body: 'Assim como o trim de entrada da linha 200cc (XY 200-III), a SHI 250 tende a vir com amortecedores traseiros calibrados de forma mais simples/dura, com curso útil limitado. Em pistas ruins, considere amortecedores aftermarket compatíveis com 250cc chinesas como upgrade de conforto.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo e vazamentos seguem o padrão da linha 250cc',
    body: 'Como a XY 250-5, a SHI 250 pode apresentar consumo de óleo leve (100-200mL a cada 3.000 km é considerado normal) e vazamento no retentor da bengala dianteira ou na junta do cabeçote após uso prolongado em pavimento ruim. Acompanhe o nível de óleo a cada 1.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Estoque de peças específicas do trim SHI pode ser menor em algumas regiões',
    body: 'Por ser um trim mais recente ou de menor volume de vendas em algumas regiões, peças puramente estéticas (plásticos com grafismo específico "SHI") podem ter estoque mais limitado que peças da XY 250-5. Peças mecânicas (motor, carburador, elétrica) não têm esse problema, por serem compartilhadas com o resto da linha 250cc.',
  },
]

const SHI_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SHI 250: idêntico à base 250cc da linha Shineray',
    body: '500 km — Óleo de amaciamento. | 1.000 km — Óleo + reaperto do cabeçote. | 3.000 km — Óleo 20W-50 (1,3L) + limpeza da tela centrífuga + lubrificação da corrente 520. | 6.000 km — Vela NGK C8HSA + filtro de ar (limpeza) + folga de válvulas. | 9.000 km — Filtro de ar (troca) + freio (inspeção). | 15.000 km — Reaperto do cabeçote + verificação do retificador. | 18.000-22.000 km — Kit de relação 520 completo.',
  },
]

// ─── XY 250 DENVER (visual trail/adventure, standalone) ──────────────────────
// Mesma base 249cc a ar da linha 250cc | Roda dianteira maior (19") para visual de trilha
// Vela NGK C8HSA gap 0,7-0,8mm | Óleo 20W-50 JASO MA 1,3L | Carburador PZ30 | Corrente 520
// Pneu 90/90-19 (F) / 120/80-17 (R)

const DENVER_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'DENVER: visual trail/adventure sobre a base 250cc urbana — não é off-road de verdade',
    body: 'A XY 250 DENVER adota estética inspirada em adventure/trail (roda dianteira 19", carenagem alta com bico, guidão elevado), mas mantém a base mecânica e suspensão de uso urbano/rodoviário da linha 250cc a ar. Trate-a como uma naked com visual de trilha — ótima para estrada de terra batida ocasional, mas não projetada para trilha técnica pesada como uma trail de verdade (suspensão de curso longo, proteção de cárter reforçada).',
  },
  {
    severity: 'OK',
    title: 'Roda 19" dianteira: pneu um pouco menos comum que o 18" do resto da linha',
    body: 'A roda dianteira de 19" (90/90-19) da DENVER é menos comum no estoque de borracharias populares que o 18" padrão da linha 250cc — pesquise disponibilidade antes de uma viagem longa, ou leve câmara de ar sobressalente se a roda usar câmara. A traseira (120/80-17) é mais fácil de encontrar.',
  },
  {
    severity: 'OK',
    title: 'Guarda-motor e protetor de bengala valem a pena para uso misto asfalto/terra',
    body: 'Se pretende usar a DENVER regularmente em estrada de terra, invista em protetor de motor/cárter (R$ 150-300) e protetor de bengala dianteira (R$ 60-120) — a suspensão e o motor não foram desenhados para impactos de trilha, e esses acessórios baratos evitam reparos caros depois de uma queda em baixa velocidade.',
  },
  {
    severity: 'OK',
    title: 'Motor, óleo e vela idênticos à XY 250-5 — mesma logística de peças',
    body: 'Mecanicamente, a DENVER compartilha o motor 249cc a ar, óleo 20W-50 JASO MA (1,3L), vela NGK C8HSA e carburador PZ30 com a XY 250-5. O que muda é a geometria da suspensão/rodas e a carenagem de estilo trail — peças de motor são intercambiáveis.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira mais longa: verifique óleo de garfo a cada 15.000 km',
    body: 'O curso de suspensão dianteira um pouco maior (para o visual trail) da DENVER se beneficia de troca preventiva de óleo de garfo a cada 15.000 km, mesmo sem sinais visíveis de vazamento — óleo de garfo degradado perde amortecimento progressivamente, o que é mais perceptível numa suspensão de curso mais longo.',
  },
  {
    severity: 'OK',
    title: 'Bagageiro traseiro reforçado: bom para quem usa como moto de trabalho/entrega',
    body: 'O visual adventure da DENVER geralmente vem com bagageiro traseiro mais robusto que os trims naked/esportivos da linha 250cc — útil para quem usa a moto para carregar bagagem ou trabalho de entrega. Respeite o limite de carga do manual (tipicamente 10-15kg no bagageiro) para não comprometer a suspensão traseira.',
  },
]

const DENVER_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e retificador: mesma vulnerabilidade elétrica da linha 250cc',
    body: 'A DENVER herda os mesmos pontos fracos elétricos da família 250cc Shineray: CDI sensível a vibração/umidade e retificador que pode falhar em regular a tensão. O uso em estrada de terra (mais vibração, mais poeira/umidade) pode acelerar esses problemas em comparação ao uso 100% urbano das versões naked. Inspecione o chicote com mais frequência se rodar fora do asfalto.',
  },
  {
    severity: 'WARN',
    title: 'Proteção de motor de fábrica é mínima ou inexistente',
    body: 'Apesar do visual trail, a DENVER geralmente não vem com proteção de cárter robusta de fábrica (diferente de trails de verdade). Uma pedra maior em estrada de terra pode danificar o cárter do motor. Considere instalar um protetor de motor aftermarket antes de rodar fora do asfalto com regularidade.',
  },
  {
    severity: 'WARN',
    title: 'Uso fora do asfalto acelera desgaste da corrente — lubrifique mais que o padrão',
    body: 'Em uso misto com terra/poeira, a corrente 520 da DENVER acumula abrasivo mais rápido que em uso 100% asfaltado. Reduza o intervalo de lubrificação de 500 km para 250-300 km em uso frequente fora do asfalto, e limpe a corrente com querosene antes de lubrificar (nunca gasolina — dissolve a graxa interna).',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar satura mais rápido em uso com poeira',
    body: 'O filtro de ar da DENVER, dimensionado para uso urbano padrão da linha 250cc, satura mais rápido em estrada de terra com poeira. Se usar regularmente fora do asfalto, reduza o intervalo de limpeza de 3.000 km para 1.500-2.000 km — filtro saturado enriquece a mistura no carburador PZ30 e aumenta o consumo.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela junta do cabeçote é mais frequente com uso fora do asfalto',
    body: 'A vibração adicional de terreno irregular acelera o ressecamento da junta do cabeçote em comparação ao uso 100% asfaltado da linha 250cc. Reaperte os parafusos do cabeçote a cada 10.000 km (em vez dos 15.000 km padrão da linha) se a DENVER for usada com frequência em estrada de terra.',
  },
]

const DENVER_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 250 DENVER: base 250cc + cuidados extras de uso misto',
    body: '500 km — Óleo de amaciamento. | 1.000 km — Óleo + reaperto do cabeçote. | 3.000 km — Óleo 20W-50 (1,3L) + limpeza da tela centrífuga + lubrificação da corrente 520 (reduza para 1.500-2.000 km de intervalo do filtro de ar se usar em terra). | 6.000 km — Vela NGK C8HSA + filtro de ar + folga de válvulas. | 10.000-15.000 km — Reaperto do cabeçote (mais cedo se usar fora do asfalto) + óleo de garfo (preventivo). | 18.000-22.000 km — Kit de relação 520.',
  },
]

// ─── XY 250-6B DISCOVER (visual trail/adventure sportivo, standalone) ────────
// Mesma base 249cc a ar | Roda dianteira 19", carenagem mais esportiva que a DENVER
// Vela NGK C8HSA gap 0,7-0,8mm | Óleo 20W-50 JASO MA 1,3L | Carburador PZ30 | Corrente 520
// Pneu 100/90-19 (F) / 130/70-17 (R)

const DISCOVER_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'DISCOVER: trail-esportiva — pneu dianteiro mais largo que a DENVER',
    body: 'A XY 250-6B DISCOVER adota visual trail com pegada mais esportiva que a DENVER — pneu dianteiro 100/90-19 (mais largo que o 90/90-19 da DENVER) e traseiro 130/70-17, priorizando estabilidade em asfalto sobre capacidade off-road. Mesma base mecânica 249cc a ar da linha 250cc.',
  },
  {
    severity: 'OK',
    title: 'Suspensão dianteira invertida ou convencional reforçada — confirme o ano do lote',
    body: 'Dependendo do lote/ano, a DISCOVER pode ter vindo com garfo dianteiro convencional reforçado (não invertido de verdade) — apesar do visual sugerir suspensão premium. Isso não é defeito, mas ao comprar peças de suspensão (retentores, óleo), confirme o diâmetro exato do tubo do garfo da sua unidade antes de comprar.',
  },
  {
    severity: 'OK',
    title: 'Motor e peças de consumo idênticos ao resto da linha 250cc',
    body: 'Óleo 20W-50 JASO MA (1,3L), vela NGK C8HSA (gap 0,7-0,8mm), carburador PZ30 e corrente 520 — tudo compartilhado com a XY 250-5, SHI 250 e DENVER. Facilita muito achar peças e mecânicos que já conheçam a mecânica, mesmo que não conheçam especificamente o trim DISCOVER.',
  },
  {
    severity: 'OK',
    title: 'Bico frontal e carenagem: substituição em caso de queda custa mais que a DENVER',
    body: 'A carenagem esportiva com bico frontal da DISCOVER é mais elaborada (e cara de repor) que o visual mais simples da DENVER. Considere protetor de carenagem/slider (R$ 80-150) se pilotar em condições de risco de queda em baixa velocidade (trânsito intenso, manobras).',
  },
  {
    severity: 'WARN',
    title: 'Peso um pouco maior que a DENVER: atenção redobrada ao freio',
    body: 'A carenagem mais elaborada e possíveis reforços estruturais deixam a DISCOVER ligeiramente mais pesada que a DENVER. Se equipada com tambor traseiro, mantenha o ajuste de folga do pedal em dia (20-30mm) — peso extra exige frenagem eficiente.',
  },
  {
    severity: 'OK',
    title: 'Bom equilíbrio entre estilo aventureiro e uso 100% urbano/rodoviário',
    body: 'Para quem quer o visual trail sem intenção real de rodar off-road, a DISCOVER é uma opção equilibrada — roda 19" ajuda a "engolir" buracos e lombadas melhor que rodas 17" convencionais, sem sacrificar tanto a estabilidade em rodovia quanto uma trail de verdade com roda 21".',
  },
]

const DISCOVER_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e retificador: vulnerabilidade elétrica compartilhada com toda a linha 250cc',
    body: 'A DISCOVER apresenta os mesmos pontos fracos elétricos crônicos da família 250cc Shineray — CDI sensível a vibração/umidade e retificador instável. Teste de tensão: 13,5-14,8V na bateria a 4.000 rpm. Peças genéricas compatíveis com motor 250cc CG-clone atendem.',
  },
  {
    severity: 'WARN',
    title: 'Carenagem elaborada = mais parafusos e clipes plásticos que soltam com vibração',
    body: 'A carenagem mais complexa da DISCOVER (bico frontal, viseira, mais painéis) tem mais pontos de fixação (parafusos e clipes plásticos) que podem afrouxar ou quebrar com vibração e uso em pavimento ruim. Inspecione visualmente a cada 3.000 km e aplique trava-rosca nos parafusos metálicos.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala pode vazar mais cedo se usada como trail de verdade',
    body: 'Apesar do visual trail, a suspensão da DISCOVER não é dimensionada para uso off-road pesado. Usar em trilha técnica acelera o desgaste do retentor da bengala dianteira, que pode vazar antes dos 20.000 km esperados em uso apenas urbano/rodoviário.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar e corrente exigem cuidado extra se usada fora do asfalto',
    body: 'Assim como a DENVER, se a DISCOVER for usada com frequência em estrada de terra, reduza o intervalo de limpeza do filtro de ar (para 1.500-2.000 km) e de lubrificação da corrente (para 250-300 km) — poeira acelera o desgaste desses itens.',
  },
  {
    severity: 'WARN',
    title: 'Estoque de peças de carenagem específicas pode ser limitado fora de grandes centros',
    body: 'Peças de carenagem exclusivas do trim DISCOVER (bico frontal, viseira) podem ter disponibilidade menor em cidades pequenas comparado a peças mecânicas compartilhadas com o resto da linha 250cc. Ao comprar, considere pedir com antecedência ou verificar estoque em mais de uma distribuidora.',
  },
]

const DISCOVER_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 250-6B DISCOVER: base 250cc + inspeção de carenagem',
    body: '500 km — Óleo de amaciamento. | 1.000 km — Óleo + reaperto do cabeçote e da carenagem. | 3.000 km — Óleo 20W-50 (1,3L) + limpeza da tela centrífuga + lubrificação da corrente 520 + inspeção de parafusos/clipes da carenagem. | 6.000 km — Vela NGK C8HSA + filtro de ar + folga de válvulas. | 15.000 km — Reaperto do cabeçote + óleo de garfo (preventivo) + verificação do retificador. | 18.000-22.000 km — Kit de relação 520.',
  },
]

// ─── XY 250 FLASH EFI (naked esportivo injetado 250cc, standalone) ───────────
// Motor: 249cc OHC monocilíndrico a ar, EFI (corpo único) | ~20,5 cv @ 8.000 rpm
// Vela NGK CR8HSA (resistiva) gap 0,7-0,8mm | Óleo 20W-50 JASO MA 1,3L | Corrente 520
// Rodas de liga 17" | Pneu 110/70-17 (F) / 140/70-17 (R)

const FLASH_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'FLASH EFI: topo esportivo da linha 250cc — injeção + rodas largas 17"',
    body: 'A XY 250 FLASH EFI combina o motor 249cc a ar com injeção eletrônica de corpo único e rodas de liga leve aro 17" com pneus largos (110/70-17 dianteiro, 140/70-17 traseiro) — visual e postura mais esportivos que os demais trims da linha 250cc. É a versão de maior potência estimada (~20,5 cv) da família por causa da EFI mais eficiente que o carburador PZ30.',
  },
  {
    severity: 'OK',
    title: 'Vela resistiva NGK CR8HSA — obrigatória para não interferir na ECU',
    body: 'Como todo modelo EFI da linha Shineray, a FLASH exige vela com prefixo "CR" (resistiva) para não gerar ruído elétrico nos sensores da injeção. NGK CR8HSA, gap 0,7-0,8mm. Custo: R$ 20-32. Troca a cada 8.000-10.000 km.',
  },
  {
    severity: 'OK',
    title: 'Pneus largos aro 17": opções esportivas de qualidade disponíveis no Brasil',
    body: 'As medidas 110/70-17 e 140/70-17 são bem estabelecidas no mercado de pneus de motos esportivas de entrada no Brasil — dá para encontrar opções de marcas conhecidas (Pirelli, Rinaldi, Levorin) além do pneu original, o que melhora bastante a frenagem e estabilidade em curva comparado aos pneus mais estreitos dos demais trims 250cc.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível submersa: evite rodar com tanque quase vazio',
    body: 'Assim como a STORM EFI da linha 200cc, a FLASH EFI usa bomba de combustível submersa resfriada pelo próprio combustível ao redor. Rodar constantemente com menos de 1L no tanque reduz a vida útil da bomba. Bomba de reposição: R$ 180-350 (maior vazão que a versão 200cc).',
  },
  {
    severity: 'OK',
    title: 'Motor, óleo e corrente seguem a especificação padrão da linha 250cc',
    body: 'Fora da injeção e das rodas esportivas, o motor 249cc, óleo 20W-50 JASO MA (1,3L) e corrente 520 são os mesmos da XY 250-5. Facilita achar peças de consumo básico mesmo em oficinas que não são especializadas em EFI.',
  },
  {
    severity: 'WARN',
    title: 'Luz de falha de injeção no painel: leve para diagnóstico com scanner assim que acender',
    body: 'A FLASH EFI tem indicador de falha no painel. Diferente das versões carburadas da linha 250cc, um sensor fora da faixa pode colocar a moto em modo de emergência com desempenho reduzido sem sintoma óbvio. Procure oficina com scanner compatível com sistemas EFI de entrada assim que a luz acender.',
  },
]

const FLASH_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Sensor TPS desregula com o tempo — mesmo comportamento da STORM EFI',
    body: 'O sensor de posição da borboleta pode perder calibração com o uso, causando marcha lenta instável ou engasgo ao soltar o acelerador. Reset básico: desconecte a bateria por 10 minutos. Se persistir, diagnóstico com scanner (R$ 100-200) identifica se é o TPS ou outro sensor (IAT, rotação).',
  },
  {
    severity: 'WARN',
    title: 'ECU exige tensão de bateria estável — partida difícil com bateria fraca',
    body: 'Bateria abaixo de 12V em repouso pode causar partida difícil ou o motor "morrer" ao soltar a partida elétrica. Mantenha a bateria (12V, tipicamente 6-7Ah nesse porte) sempre carregada e troque preventivamente a cada 2-3 anos.',
  },
  {
    severity: 'WARN',
    title: 'Pneus largos e potência maior aceleram desgaste em pilotagem esportiva',
    body: 'A combinação de pneus mais largos, mais potência e apelo esportivo da FLASH faz com que pilotos mais agressivos desgastem pneu traseiro e corrente mais rápido que nos demais trims da linha 250cc. Se pilotar de forma esportiva com frequência, reduza o intervalo de inspeção da corrente e considere pneus de composto mais durável para uso misto.',
  },
  {
    severity: 'WARN',
    title: 'CDI/ECU e retificador: mesma vulnerabilidade elétrica crônica da linha',
    body: 'Apesar da EFI mais sofisticada que o carburador, a base elétrica geral (retificador, chicote) compartilha a mesma vulnerabilidade a umidade e vibração do resto da linha 250cc Shineray. Teste de tensão regular (13,5-14,8V a 4.000 rpm) evita surpresas.',
  },
  {
    severity: 'WARN',
    title: 'Oficina sem experiência em EFI pode diagnosticar errado',
    body: 'Como na STORM EFI, procure oficinas com experiência específica em motos chinesas EFI (não só carburadas) — um mecânico só acostumado a carburador pode trocar peças por tentativa e erro sem resolver o problema real, gastando seu dinheiro à toa.',
  },
]

const FLASH_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 250 FLASH EFI: base 250cc + cuidados de injeção',
    body: '500 km — Óleo de amaciamento. | 1.000 km — Óleo + verificação de códigos de falha (scanner, se disponível). | 3.000 km — Óleo 20W-50 (1,3L) + limpeza da tela centrífuga + lubrificação da corrente 520 + limpeza do filtro de ar. | 8.000-10.000 km — Vela NGK CR8HSA + filtro de ar (troca) + folga de válvulas + inspeção do TPS. | 15.000 km — Reaperto do cabeçote + verificação do retificador e da bateria. | 18.000-22.000 km — Kit de relação 520.',
  },
]

// ─── BOLT 250 (estilo custom/cruiser, standalone) ─────────────────────────────
// Mesma base 249cc a ar da linha 250cc | Estilo cruiser: banco baixo, guidão largo, pneu traseiro largo
// Vela NGK C8HSA gap 0,7-0,8mm | Óleo 20W-50 JASO MA 1,3L | Carburador PZ30 | Corrente 520
// Pneu 100/90-18 (F) / 150/80-15 (R)

const BOLT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'BOLT 250: estilo cruiser/custom sobre a base 250cc a ar — banco baixo, rodas diferentes',
    body: 'A BOLT 250 adota linguagem visual cruiser/custom (nome remete ao estilo "bobber" popular em outras marcas) — banco baixo, guidão largo e reto, pneu traseiro largo (150/80-15, roda 15" traseira em vez do 17"/18" comum na linha). Mecanicamente segue a mesma base 249cc a ar da família 250cc.',
  },
  {
    severity: 'OK',
    title: 'Pneu traseiro 150/80-15: medida de cruiser, procure em lojas especializadas em custom',
    body: 'A roda traseira 15" com pneu 150/80-15 é uma medida menos comum no varejo popular de pneus (mais associada a cruisers/custom) que os 17"/18" do resto da linha 250cc. Lojas especializadas em motos custom ou grandes redes de pneu costumam ter — pesquise disponibilidade antes de precisar trocar às pressas.',
  },
  {
    severity: 'OK',
    title: 'Banco baixo facilita para pilotos de estatura menor, mas reduz curso de suspensão',
    body: 'O banco baixo característico do estilo cruiser da BOLT 250 é ótimo para pilotos com pernas mais curtas alcançarem o chão com facilidade, mas geralmente vem acompanhado de suspensão traseira com curso mais curto — buracos e lombadas são sentidos com mais intensidade que em uma naked/trail da mesma linha.',
  },
  {
    severity: 'OK',
    title: 'Motor, óleo e vela idênticos ao resto da linha 250cc a ar',
    body: 'Óleo 20W-50 JASO MA (1,3L), vela NGK C8HSA (gap 0,7-0,8mm), carburador PZ30 — tudo compartilhado com XY 250-5, SHI 250 e as versões trail. A diferença do BOLT 250 está inteiramente na parte ciclística (chassi, rodas, suspensão) e estética, não no motor.',
  },
  {
    severity: 'WARN',
    title: 'Guidão largo e reto: verifique a passagem de cabos ao girar totalmente',
    body: 'O guidão largo estilo cruiser da BOLT 250 pode esticar mais os cabos de embreagem e acelerador nas posições extremas de esterço do que um guidão convencional. Verifique se os cabos não estão puxando ou dobrando de forma forçada nas posições máximas de giro — cabo esticado demais desregula o ponto de acionamento da embreagem com o tempo.',
  },
  {
    severity: 'OK',
    title: 'Escapamento estilo cruiser: verifique ruído/vazamento na junta com o cabeçote',
    body: 'O escapamento de estilo cruiser (geralmente mais exposto visualmente) da BOLT 250 deve ser inspecionado quanto à junta de vedação com o cabeçote a cada revisão — vazamento nessa junta causa ruído metálico característico e pode afetar a resposta do motor em baixa rotação.',
  },
]

const BOLT_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e retificador: vulnerabilidade elétrica compartilhada com a linha 250cc',
    body: 'A BOLT 250 apresenta os mesmos pontos fracos elétricos crônicos do resto da família 250cc Shineray. CDI sensível a vibração/umidade, retificador que pode falhar em regular a tensão da bateria. Teste: 13,5-14,8V na bateria a 4.000 rpm.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão traseira de curso curto: desconforto e fundo de curso em pista ruim',
    body: 'A suspensão traseira de curso mais curto (característica do visual cruiser de banco baixo) pode "bater no fundo" em buracos e lombadas mais severas, especialmente com garupa. Amortecedores traseiros com mola mais firme, compatíveis com a medida do BOLT 250, são um upgrade comum entre donos que rodam em pista ruim com frequência.',
  },
  {
    severity: 'WARN',
    title: 'Pneu traseiro largo e baixo desgasta de forma irregular sem calibragem correta',
    body: 'O pneu 150/80-15 largo e de perfil baixo é mais sensível a calibragem incorreta que os pneus mais estreitos do resto da linha — pressão baixa causa desgaste acentuado nas bordas, pressão alta desgasta o centro. Calibre semanalmente com pneus frios e siga rigorosamente a especificação de fábrica.',
  },
  {
    severity: 'WARN',
    title: 'Guidão largo aumenta a sensação de vento em velocidade de rodovia',
    body: 'A posição ereta e o guidão largo do estilo cruiser aumentam a resistência ao vento em velocidades de rodovia (acima de 90 km/h) comparado às versões naked/esportivas da linha 250cc. Não é defeito, mas espere mais fadiga e talvez um pouco mais de consumo de combustível em viagens de rodovia longas.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento cruiser exposto sofre mais impacto de pedras e detritos',
    body: 'O desenho do escapamento cruiser da BOLT 250, mais exposto visualmente (sem proteção de carenagem), fica mais vulnerável a impacto de pedras arremessadas em estrada de terra ou cascalho — inspecione periodicamente por amassados que possam restringir o fluxo de gases de escape.',
  },
]

const BOLT_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma BOLT 250: base 250cc + atenção à parte ciclística cruiser',
    body: '500 km — Óleo de amaciamento. | 1.000 km — Óleo + reaperto do cabeçote e do guidão. | 3.000 km — Óleo 20W-50 (1,3L) + limpeza da tela centrífuga + lubrificação da corrente 520 + calibragem do pneu traseiro largo. | 6.000 km — Vela NGK C8HSA + filtro de ar + folga de válvulas + inspeção da junta do escapamento. | 15.000 km — Reaperto do cabeçote + verificação do retificador + inspeção da suspensão traseira (curso/vazamento). | 18.000-22.000 km — Kit de relação 520.',
  },
]

// ─── IRON 250 EFI (custom "blackout" injetado, standalone) ───────────────────
// Motor: 249cc OHC monocilíndrico a ar, EFI (corpo único) | ~20,5 cv @ 8.000 rpm
// Vela NGK CR8HSA gap 0,7-0,8mm | Óleo 20W-50 JASO MA 1,3L | Corrente 520
// Estilo "blackout" custom: acabamento escurecido, roda raiada 19" (F) / 16" (R)

const IRON_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'IRON 250 EFI: acabamento "blackout" custom + injeção — combina estilo com menos manutenção de carburador',
    body: 'A IRON 250 EFI traz acabamento escurecido tipo "blackout" (motor, escapamento e componentes com pintura/revestimento fosco preto) sobre a base mecânica 249cc a ar, com injeção eletrônica em vez do carburador PZ30 usado nos demais trims custom. Rodas raiadas 19" dianteira / 16" traseira reforçam o visual custom.',
  },
  {
    severity: 'WARN',
    title: 'Acabamento blackout risca fácil — cuidado ao lavar e transportar',
    body: 'O revestimento fosco preto característico do visual blackout da IRON 250 EFI risca e desgasta com mais facilidade que cromado ou pintura brilhante convencional, especialmente com produtos de limpeza abrasivos ou esponjas ásperas. Lave apenas com pano macio e produtos neutros — polidores automotivos comuns podem remover o acabamento fosco em vez de só limpar.',
  },
  {
    severity: 'OK',
    title: 'Rodas 19"/16": combinação clássica de custom, mas pneus menos padronizados',
    body: 'A combinação de roda 19" dianteira com 16" traseira é uma configuração clássica do visual custom/bobber, mas menos padronizada no varejo de pneu popular brasileiro que as combinações 17"/18" do resto da linha. Verifique disponibilidade em lojas especializadas em custom antes de precisar trocar.',
  },
  {
    severity: 'OK',
    title: 'Vela resistiva NGK CR8HSA — obrigatória por causa da EFI',
    body: 'Como todo trim EFI da linha Shineray, a IRON 250 exige vela resistiva (prefixo "CR") para não interferir nos sensores de injeção. NGK CR8HSA, gap 0,7-0,8mm. Troca a cada 8.000-10.000 km.',
  },
  {
    severity: 'OK',
    title: 'Motor e óleo seguem o padrão 250cc: 1,3L de 20W-50 JASO MA',
    body: 'Apesar do visual custom diferenciado, o coração mecânico é o mesmo monocilíndrico 249cc a ar da linha 250cc, agora com EFI. Óleo 20W-50 JASO MA (1,3L), corrente 520 — peças de consumo básico compartilhadas com o resto da família.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível submersa: cuidado com o tanque quase vazio',
    body: 'Assim como os demais trims EFI da linha (STORM, FLASH), a IRON 250 EFI usa bomba de combustível submersa resfriada pelo combustível ao redor. Evite rodar com menos de 1L no tanque com regularidade — reduz a vida útil da bomba.',
  },
]

const IRON_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Sensor TPS e ECU: mesma vulnerabilidade dos demais trims EFI da linha',
    body: 'A IRON 250 EFI compartilha a fragilidade do sensor TPS (desregula com o tempo, causando marcha lenta instável) e a sensibilidade da ECU a bateria fraca dos demais trims EFI (STORM, FLASH). Reset básico: desconecte a bateria por 10 minutos. Diagnóstico com scanner: R$ 100-200.',
  },
  {
    severity: 'WARN',
    title: 'Acabamento blackout desbota com exposição prolongada ao sol',
    body: 'O acabamento fosco preto de peças plásticas e algumas metálicas pode desbotar/embranquecer com anos de exposição direta ao sol intenso, especialmente em regiões de clima muito quente. Produtos específicos para revitalizar plástico fosco (não polidores comuns) ajudam a retardar esse efeito.',
  },
  {
    severity: 'WARN',
    title: 'Roda raiada 19"/16" exige rebalanceamento mais frequente que roda de liga',
    body: 'Rodas raiadas custom como as da IRON 250 EFI tendem a perder o balanceamento com mais facilidade que rodas de liga fundida, especialmente em pavimento ruim. Vibração progressiva em velocidade constante é sinal de desbalanceamento — rebalanceie a cada troca de pneu e reavalie se a vibração voltar antes do esperado.',
  },
  {
    severity: 'WARN',
    title: 'CDI/ECU e retificador: vulnerabilidade elétrica crônica da linha 250cc',
    body: 'Mesmo com EFI, a base elétrica geral (retificador, chicote) compartilha a mesma fragilidade a umidade e vibração do resto da linha 250cc Shineray. Teste de tensão regular (13,5-14,8V a 4.000 rpm) é a melhor prevenção.',
  },
  {
    severity: 'WARN',
    title: 'Posição de pilotagem custom pode reduzir conforto em trechos longos de rodovia',
    body: 'O guidão e a posição de pilotagem típicos do estilo custom priorizam estética sobre aerodinâmica — espere mais cansaço em viagens de rodovia longas comparado às versões naked/trail da linha 250cc, especialmente em ventos laterais fortes.',
  },
]

const IRON_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma IRON 250 EFI: base 250cc + cuidados de injeção e acabamento',
    body: '500 km — Óleo de amaciamento. | 1.000 km — Óleo + verificação de códigos de falha (scanner, se disponível). | 3.000 km — Óleo 20W-50 (1,3L) + limpeza da tela centrífuga + lubrificação da corrente 520. | 8.000-10.000 km — Vela NGK CR8HSA + filtro de ar (troca) + folga de válvulas + inspeção do TPS. | 15.000 km — Reaperto do cabeçote + verificação do retificador e da bateria + rebalanceamento das rodas raiadas. | 18.000-22.000 km — Kit de relação 520.',
  },
]

// ─── TITANIUM 250 EFI (naked premium injetado, standalone) ───────────────────
// Motor: 249cc OHC monocilíndrico a ar, EFI (corpo único) | ~20,5 cv @ 8.000 rpm
// Vela NGK CR8HSA gap 0,7-0,8mm | Óleo 20W-50 JASO MA 1,3L | Corrente 520
// Rodas de liga 17", acabamento premium (painel digital, iluminação em LED)

const TITANIUM_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'TITANIUM 250 EFI: topo de linha em acabamento — painel digital e LED, mesma base mecânica',
    body: 'A TITANIUM 250 EFI é posicionada como o trim de acabamento mais completo da linha 250cc — painel digital (em vez de analógico), iluminação em LED e rodas de liga leve aro 17" com pneus 110/70-17 (dianteiro) e 140/60-17 (traseiro). A base mecânica continua sendo o monocilíndrico 249cc a ar com EFI de corpo único, igual à FLASH EFI.',
  },
  {
    severity: 'OK',
    title: 'Painel digital: reset e calibração via combinação de botões — consulte o manual',
    body: 'O painel digital da TITANIUM pode precisar de reset após troca de bateria (relógio, hodômetro parcial zerados) ou apresentar erro de leitura se a bateria cair abaixo da tensão mínima de operação da eletrônica. O procedimento de reset varia por lote — mantenha o manual do proprietário guardado ou fotografado no celular.',
  },
  {
    severity: 'OK',
    title: 'Iluminação em LED: menor consumo de corrente, mas módulo não é reparável',
    body: 'Diferente de lâmpadas halógenas convencionais, os módulos de LED da TITANIUM não são substituíveis peça por peça — se um módulo falhar, é necessário trocar o conjunto óptico completo. A vantagem é o menor consumo de corrente da bateria e do sistema de carga comparado às versões com lâmpada halógena convencional do resto da linha.',
  },
  {
    severity: 'OK',
    title: 'Vela resistiva NGK CR8HSA e demais peças de consumo iguais à FLASH EFI',
    body: 'Motor, óleo (20W-50 JASO MA, 1,3L), vela (NGK CR8HSA, gap 0,7-0,8mm) e corrente 520 são idênticos aos da XY 250 FLASH EFI — a diferença entre os dois trims está no acabamento (painel, iluminação), não na mecânica.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível submersa: mesmo cuidado dos demais trims EFI',
    body: 'Evite rodar com o tanque quase vazio com frequência — a bomba de combustível submersa da TITANIUM é resfriada pelo combustível ao redor e superaquece com nível baixo constante, reduzindo sua vida útil.',
  },
  {
    severity: 'OK',
    title: 'Pneus de liga 17" facilitam achar opções de qualidade além do original',
    body: 'As medidas 110/70-17 e 140/60-17 têm boa disponibilidade no mercado nacional de pneus para motos de entrada esportivas, permitindo upgrade fácil para marcas mais conhecidas quando chegar a hora de trocar o pneu original.',
  },
]

const TITANIUM_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Sensor TPS e ECU: mesma vulnerabilidade dos demais trims EFI da linha',
    body: 'A TITANIUM 250 EFI compartilha a fragilidade do sensor TPS e a sensibilidade da ECU a bateria fraca dos demais EFI da linha (STORM, FLASH, IRON). Reset básico: desconecte a bateria por 10 minutos. Diagnóstico com scanner: R$ 100-200.',
  },
  {
    severity: 'WARN',
    title: 'Painel digital mais caro de repor que o analógico dos demais trims',
    body: 'Se o painel digital da TITANIUM apresentar defeito (pixels apagados, tela ilegível, botões sem resposta), a peça de reposição é significativamente mais cara que o painel analógico simples usado em trims como SHI 250 ou XY 250-5 — orçamento entre R$ 300-600 dependendo da disponibilidade da peça.',
  },
  {
    severity: 'WARN',
    title: 'Módulo de LED com defeito exige troca do conjunto óptico completo',
    body: 'Diferente de lâmpada halógena (troca simples e barata), um módulo de LED com defeito na TITANIUM exige substituição do farol/lanterna completo, já que o LED não é vendido separadamente na maioria dos casos. Custo de reposição de um conjunto óptico LED: R$ 200-500, bem acima da lâmpada halógena convencional (R$ 15-40).',
  },
  {
    severity: 'WARN',
    title: 'CDI/ECU e retificador: vulnerabilidade elétrica crônica compartilhada com a linha',
    body: 'Apesar do acabamento premium, a base elétrica (retificador, chicote) segue a mesma linha do restante da família 250cc Shineray, com a mesma sensibilidade a umidade e vibração. Teste de tensão regular (13,5-14,8V a 4.000 rpm) é essencial, ainda mais considerando que a eletrônica extra (painel digital, LED) é mais sensível a tensão instável que sistemas simples.',
  },
  {
    severity: 'WARN',
    title: 'Tensão instável do retificador pode danificar a eletrônica do painel digital',
    body: 'Um retificador com defeito que deixa a tensão do sistema oscilar fora da faixa de 13,5-14,8V não afeta só a bateria — pode danificar permanentemente a placa do painel digital da TITANIUM, mais sensível que um painel analógico simples. Se notar instabilidade elétrica (farol piscando, painel "reiniciando" sozinho), troque o retificador imediatamente, antes que danifique o painel.',
  },
]

const TITANIUM_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma TITANIUM 250 EFI: base 250cc + atenção à eletrônica do painel',
    body: '500 km — Óleo de amaciamento. | 1.000 km — Óleo + verificação de códigos de falha (scanner, se disponível) + teste do painel digital. | 3.000 km — Óleo 20W-50 (1,3L) + limpeza da tela centrífuga + lubrificação da corrente 520. | 8.000-10.000 km — Vela NGK CR8HSA + filtro de ar (troca) + folga de válvulas + inspeção do TPS. | 15.000 km — Reaperto do cabeçote + verificação do retificador (prioridade alta — protege a eletrônica do painel) + teste da bateria. | 18.000-22.000 km — Kit de relação 520.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'XY 200-5',
    yearFrom: 2015,
    yearTo: null,
    MACETES: XY2005_MACETES,
    PROBLEMAS: XY2005_PROBLEMAS,
    MANUTENCAO: XY2005_MANUTENCAO,
  },
  {
    modelName: 'XY 200-5 A RACING',
    yearFrom: 2015,
    yearTo: null,
    MACETES: AR_MACETES,
    PROBLEMAS: AR_PROBLEMAS,
    MANUTENCAO: AR_MANUTENCAO,
  },
  {
    modelName: 'XY 200-5 ROAD WIND NAKED',
    yearFrom: 2015,
    yearTo: null,
    MACETES: RW_MACETES,
    PROBLEMAS: RW_PROBLEMAS,
    MANUTENCAO: RW_MANUTENCAO,
  },
  {
    modelName: 'XY 200-5 SPEED/ XY 200-5',
    yearFrom: 2015,
    yearTo: null,
    MACETES: SP_MACETES,
    PROBLEMAS: SP_PROBLEMAS,
    MANUTENCAO: SP_MANUTENCAO,
  },
  {
    modelName: 'XY 200 STORM EFI',
    yearFrom: 2018,
    yearTo: null,
    MACETES: STORM_MACETES,
    PROBLEMAS: STORM_PROBLEMAS,
    MANUTENCAO: STORM_MANUTENCAO,
  },
  {
    modelName: 'XY 200-III',
    yearFrom: 2012,
    yearTo: null,
    MACETES: III_MACETES,
    PROBLEMAS: III_PROBLEMAS,
    MANUTENCAO: III_MANUTENCAO,
  },
  {
    modelName: 'XY 250-5',
    yearFrom: 2015,
    yearTo: null,
    MACETES: XY2505_MACETES,
    PROBLEMAS: XY2505_PROBLEMAS,
    MANUTENCAO: XY2505_MANUTENCAO,
  },
  {
    modelName: 'SHI 250',
    yearFrom: 2015,
    yearTo: null,
    MACETES: SHI_MACETES,
    PROBLEMAS: SHI_PROBLEMAS,
    MANUTENCAO: SHI_MANUTENCAO,
  },
  {
    modelName: 'XY 250 DENVER',
    yearFrom: 2016,
    yearTo: null,
    MACETES: DENVER_MACETES,
    PROBLEMAS: DENVER_PROBLEMAS,
    MANUTENCAO: DENVER_MANUTENCAO,
  },
  {
    modelName: 'XY 250-6B DISCOVER',
    yearFrom: 2016,
    yearTo: null,
    MACETES: DISCOVER_MACETES,
    PROBLEMAS: DISCOVER_PROBLEMAS,
    MANUTENCAO: DISCOVER_MANUTENCAO,
  },
  {
    modelName: 'XY 250 FLASH EFI',
    yearFrom: 2018,
    yearTo: null,
    MACETES: FLASH_MACETES,
    PROBLEMAS: FLASH_PROBLEMAS,
    MANUTENCAO: FLASH_MANUTENCAO,
  },
  {
    modelName: 'BOLT 250',
    yearFrom: 2017,
    yearTo: null,
    MACETES: BOLT_MACETES,
    PROBLEMAS: BOLT_PROBLEMAS,
    MANUTENCAO: BOLT_MANUTENCAO,
  },
  {
    modelName: 'IRON 250 EFI',
    yearFrom: 2019,
    yearTo: null,
    MACETES: IRON_MACETES,
    PROBLEMAS: IRON_PROBLEMAS,
    MANUTENCAO: IRON_MANUTENCAO,
  },
  {
    modelName: 'TITANIUM 250 EFI',
    yearFrom: 2019,
    yearTo: null,
    MACETES: TITANIUM_MACETES,
    PROBLEMAS: TITANIUM_PROBLEMAS,
    MANUTENCAO: TITANIUM_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ────────────────────────────────────────────────────────────
// Uma linha por plataforma/trim com config de pneu própria. A entrada "XY 200-5"
// cobre por match de substring os 3 trims da família (A RACING, ROAD WIND NAKED,
// SPEED/XY 200-5) — não duplicamos essa linha 3x.

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'XY 200-5',
    yearFrom: 2015, yearTo: null,
    tireSize: '90/90-18 (F) · 110/90-18 (R)',
    frontPsi: 24, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 32,
    notes: 'Solo: F 24 / R 28 PSI. Com garupa: F 26 / R 32 PSI. Vale para toda a família 200-5 (base, A RACING, ROAD WIND NAKED, SPEED). Rodas raiadas 18". Verifique sempre com pneus frios.',
  },
  {
    modelName: 'XY 200 STORM EFI',
    yearFrom: 2018, yearTo: null,
    tireSize: '100/80-17 (F) · 130/70-17 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 30 PSI. Com garupa: F 28 / R 33 PSI. Rodas de liga 17" — pressão um pouco mais alta que a família 200-5 pelo perfil de pneu esportivo mais baixo.',
  },
  {
    modelName: 'XY 200-III',
    yearFrom: 2012, yearTo: null,
    tireSize: '2.75-18 (F) · 90/90-18 (R)',
    frontPsi: 22, rearPsi: 26,
    frontPsiLoad: 24, rearPsiLoad: 30,
    notes: 'Solo: F 22 / R 26 PSI. Com garupa: F 24 / R 30 PSI. Pneus estreitos de perfil clássico — pressão mais baixa que os demais trims da linha 200cc.',
  },
  {
    modelName: 'XY 250-5',
    yearFrom: 2015, yearTo: null,
    tireSize: '100/90-18 (F) · 120/80-18 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 30 PSI. Com garupa: F 28 / R 33 PSI. Rodas 18" — configuração padrão da linha 250cc.',
  },
  {
    modelName: 'SHI 250',
    yearFrom: 2015, yearTo: null,
    tireSize: '100/90-18 (F) · 120/80-18 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 30 PSI. Com garupa: F 28 / R 33 PSI. Mesma configuração de pneu da XY 250-5 (mesma plataforma, trim de entrada).',
  },
  {
    modelName: 'XY 250 DENVER',
    yearFrom: 2016, yearTo: null,
    tireSize: '90/90-19 (F) · 120/80-17 (R)',
    frontPsi: 24, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 32,
    notes: 'Solo: F 24 / R 28 PSI. Com garupa/bagagem: F 26 / R 32 PSI. Roda dianteira 19" (visual trail) — pressão um pouco mais baixa que a linha 250cc padrão para melhor absorção em terra batida ocasional.',
  },
  {
    modelName: 'XY 250-6B DISCOVER',
    yearFrom: 2016, yearTo: null,
    tireSize: '100/90-19 (F) · 130/70-17 (R)',
    frontPsi: 25, rearPsi: 29,
    frontPsiLoad: 27, rearPsiLoad: 33,
    notes: 'Solo: F 25 / R 29 PSI. Com garupa: F 27 / R 33 PSI. Pneu dianteiro mais largo que a DENVER — priorizando estabilidade em asfalto.',
  },
  {
    modelName: 'XY 250 FLASH EFI',
    yearFrom: 2018, yearTo: null,
    tireSize: '110/70-17 (F) · 140/70-17 (R)',
    frontPsi: 29, rearPsi: 33,
    frontPsiLoad: 31, rearPsiLoad: 36,
    notes: 'Solo: F 29 / R 33 PSI. Com garupa: F 31 / R 36 PSI. Rodas de liga 17" esportivas — a maior pressão da linha 250cc pelo perfil baixo dos pneus.',
  },
  {
    modelName: 'BOLT 250',
    yearFrom: 2017, yearTo: null,
    tireSize: '100/90-18 (F) · 150/80-15 (R)',
    frontPsi: 22, rearPsi: 26,
    frontPsiLoad: 24, rearPsiLoad: 30,
    notes: 'Solo: F 22 / R 26 PSI. Com garupa: F 24 / R 30 PSI. Pneu traseiro largo estilo cruiser, roda 15" — pressão mais baixa, calibre semanalmente pois o perfil largo é sensível a erro de calibragem.',
  },
  {
    modelName: 'IRON 250 EFI',
    yearFrom: 2019, yearTo: null,
    tireSize: '90/90-19 (F) · 130/90-16 (R)',
    frontPsi: 22, rearPsi: 25,
    frontPsiLoad: 24, rearPsiLoad: 29,
    notes: 'Solo: F 22 / R 25 PSI. Com garupa: F 24 / R 29 PSI. Rodas raiadas custom 19"/16" — pressão baixa característica de configuração custom/bobber.',
  },
  {
    modelName: 'TITANIUM 250 EFI',
    yearFrom: 2019, yearTo: null,
    tireSize: '110/70-17 (F) · 140/60-17 (R)',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 30, rearPsiLoad: 35,
    notes: 'Solo: F 28 / R 32 PSI. Com garupa: F 30 / R 35 PSI. Rodas de liga 17" premium, mesma faixa da FLASH EFI.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────
// Mesma lógica de agrupamento: "XY 200-5" cobre os 3 trims da família por match
// de substring, sem duplicar as linhas.

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // XY 200-5 (cobre também A RACING, ROAD WIND NAKED, SPEED/XY 200-5)
  { modelName: 'XY 200-5', yearFrom: 2015, yearTo: null, component: 'Óleo 20W-50 JASO MA (1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 197cc OHC a ar. Nunca use óleo sem certificação JASO MA (escorrega embreagem úmida).', priority: 'HIGH', order: 1 },
  { modelName: 'XY 200-5', yearFrom: 2015, yearTo: null, component: 'Limpeza da tela de óleo centrífuga', intervalKm: 6000, intervalMonths: null, notes: 'Sem cartucho de papel — é uma tela metálica na tampa da embreagem. Limpe a cada 2 trocas de óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XY 200-5', yearFrom: 2015, yearTo: null, component: 'Lubrificação da corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente ou óleo 80W-90. Folga 20-30mm no trecho inferior.', priority: 'HIGH', order: 3 },
  { modelName: 'XY 200-5', yearFrom: 2015, yearTo: null, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Não-resistiva, para uso com carburador (não confundir com a CR7HSA das versões EFI).', priority: 'MEDIUM', order: 4 },
  { modelName: 'XY 200-5', yearFrom: 2015, yearTo: null, component: 'Filtro de ar — limpeza / troca', intervalKm: 3000, intervalMonths: 12, notes: 'Limpeza a cada 3.000 km, troca (se de papel) a cada 9.000 km.', priority: 'MEDIUM', order: 5 },
  { modelName: 'XY 200-5', yearFrom: 2015, yearTo: null, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio obrigatório. Regulagem por contra-porca.', priority: 'HIGH', order: 6 },
  { modelName: 'XY 200-5', yearFrom: 2015, yearTo: null, component: 'Kit de relação 428H (pinhão 14T + coroa 40T)', intervalKm: 16000, intervalMonths: null, notes: 'Trocar kit completo — nunca só a corrente com coroa gasta.', priority: 'HIGH', order: 7 },
  { modelName: 'XY 200-5', yearFrom: 2015, yearTo: null, component: 'Verificação do CDI e retificador (13,5-14,8V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha elétrico mais comum da plataforma. Medir com multímetro na bateria.', priority: 'CRITICAL', order: 8 },

  // XY 200 STORM EFI
  { modelName: 'XY 200 STORM EFI', yearFrom: 2018, yearTo: null, component: 'Óleo 20W-50 JASO MA (1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 197cc a ar com EFI de corpo único.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 200 STORM EFI', yearFrom: 2018, yearTo: null, component: 'Limpeza da tela de óleo centrífuga', intervalKm: 6000, intervalMonths: null, notes: 'A cada 2 trocas de óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XY 200 STORM EFI', yearFrom: 2018, yearTo: null, component: 'Vela NGK CR7HSA — resistiva (gap 0,7-0,8mm)', intervalKm: 9000, intervalMonths: null, notes: 'Obrigatoriamente resistiva (prefixo CR) para não interferir na injeção eletrônica.', priority: 'HIGH', order: 3 },
  { modelName: 'XY 200 STORM EFI', yearFrom: 2018, yearTo: null, component: 'Lubrificação da corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20-30mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'XY 200 STORM EFI', yearFrom: 2018, yearTo: null, component: 'Filtro de ar — limpeza / troca', intervalKm: 3000, intervalMonths: 12, notes: 'Filtro sujo enriquece a mistura da EFI sem acender luz de falha — mantenha limpo.', priority: 'MEDIUM', order: 5 },
  { modelName: 'XY 200 STORM EFI', yearFrom: 2018, yearTo: null, component: 'Inspeção do sensor TPS / diagnóstico com scanner', intervalKm: 9000, intervalMonths: 12, notes: 'Sensor de posição da borboleta pode desregular com o tempo — causa marcha lenta oscilante.', priority: 'HIGH', order: 6 },
  { modelName: 'XY 200 STORM EFI', yearFrom: 2018, yearTo: null, component: 'Bateria — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'ECU exige tensão estável. Mínimo 12V em repouso.', priority: 'HIGH', order: 7 },
  { modelName: 'XY 200 STORM EFI', yearFrom: 2018, yearTo: null, component: 'Kit de relação 428H', intervalKm: 16000, intervalMonths: null, notes: 'Pinhão + coroa + corrente completos.', priority: 'HIGH', order: 8 },

  // XY 200-III
  { modelName: 'XY 200-III', yearFrom: 2012, yearTo: null, component: 'Óleo 20W-50 JASO MA (1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 197cc a ar, tuning mais conservador.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 200-III', yearFrom: 2012, yearTo: null, component: 'Limpeza da tela de óleo centrífuga', intervalKm: 6000, intervalMonths: null, notes: 'A cada 2 trocas de óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XY 200-III', yearFrom: 2012, yearTo: null, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Mesma peça da família XY 200-5.', priority: 'MEDIUM', order: 3 },
  { modelName: 'XY 200-III', yearFrom: 2012, yearTo: null, component: 'Lubrificação da corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20-30mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'XY 200-III', yearFrom: 2012, yearTo: null, component: 'Filtro de ar — limpeza / troca', intervalKm: 3000, intervalMonths: 12, notes: 'Limpeza a cada 3.000 km, troca a cada 9.000 km.', priority: 'MEDIUM', order: 5 },
  { modelName: 'XY 200-III', yearFrom: 2012, yearTo: null, component: 'Pastilhas de freio dianteiro — inspeção', intervalKm: 9000, intervalMonths: 12, notes: 'Original tende a gerar ruído; considerar aftermarket de melhor composto.', priority: 'MEDIUM', order: 6 },
  { modelName: 'XY 200-III', yearFrom: 2012, yearTo: null, component: 'Amortecedores traseiros — inspeção', intervalKm: 12000, intervalMonths: 12, notes: 'Curso mais curto de fábrica — verificar vazamento e curso útil.', priority: 'LOW', order: 7 },
  { modelName: 'XY 200-III', yearFrom: 2012, yearTo: null, component: 'Kit de relação 428H', intervalKm: 18000, intervalMonths: null, notes: 'Motor de menor potência costuma render kits mais duráveis.', priority: 'HIGH', order: 8 },

  // XY 250-5
  { modelName: 'XY 250-5', yearFrom: 2015, yearTo: null, component: 'Óleo 20W-50 JASO MA (1,3L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 249cc OHC a ar.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 250-5', yearFrom: 2015, yearTo: null, component: 'Limpeza da tela de óleo centrífuga', intervalKm: 6000, intervalMonths: null, notes: 'A cada 2 trocas de óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XY 250-5', yearFrom: 2015, yearTo: null, component: 'Vela NGK C8HSA (gap 0,7-0,8mm)', intervalKm: 8000, intervalMonths: null, notes: 'Não-resistiva, para uso com carburador PZ30.', priority: 'MEDIUM', order: 3 },
  { modelName: 'XY 250-5', yearFrom: 2015, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Kit: pinhão 15T + coroa 43-45T + corrente 520.', priority: 'HIGH', order: 4 },
  { modelName: 'XY 250-5', yearFrom: 2015, yearTo: null, component: 'Filtro de ar — limpeza / troca', intervalKm: 3000, intervalMonths: 12, notes: 'Limpeza a cada 3.000 km, troca a cada 9.000 km.', priority: 'MEDIUM', order: 5 },
  { modelName: 'XY 250-5', yearFrom: 2015, yearTo: null, component: 'Folga de válvulas (adm 0,05-0,08mm / esc 0,08-0,12mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'XY 250-5', yearFrom: 2015, yearTo: null, component: 'Reaperto dos parafusos do cabeçote', intervalKm: 15000, intervalMonths: null, notes: 'Previne ressecamento e vazamento da junta do cabeçote.', priority: 'MEDIUM', order: 7 },
  { modelName: 'XY 250-5', yearFrom: 2015, yearTo: null, component: 'Kit de relação 520', intervalKm: 20000, intervalMonths: null, notes: 'Trocar corrente + pinhão + coroa juntos.', priority: 'HIGH', order: 8 },
  { modelName: 'XY 250-5', yearFrom: 2015, yearTo: null, component: 'Verificação do CDI e retificador (13,5-14,8V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha elétrico crônico da linha 250cc.', priority: 'CRITICAL', order: 9 },

  // SHI 250
  { modelName: 'SHI 250', yearFrom: 2015, yearTo: null, component: 'Óleo 20W-50 JASO MA (1,3L)', intervalKm: 3000, intervalMonths: 6, notes: 'Mesma base mecânica da XY 250-5.', priority: 'HIGH', order: 1 },
  { modelName: 'SHI 250', yearFrom: 2015, yearTo: null, component: 'Limpeza da tela de óleo centrífuga', intervalKm: 6000, intervalMonths: null, notes: 'A cada 2 trocas de óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SHI 250', yearFrom: 2015, yearTo: null, component: 'Vela NGK C8HSA (gap 0,7-0,8mm)', intervalKm: 8000, intervalMonths: null, notes: 'Mesma peça da XY 250-5.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SHI 250', yearFrom: 2015, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Kit: pinhão 15T + coroa 43-45T + corrente 520.', priority: 'HIGH', order: 4 },
  { modelName: 'SHI 250', yearFrom: 2015, yearTo: null, component: 'Filtro de ar — limpeza / troca', intervalKm: 3000, intervalMonths: 12, notes: 'Limpeza a cada 3.000 km, troca a cada 9.000 km.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SHI 250', yearFrom: 2015, yearTo: null, component: 'Suspensão traseira — inspeção', intervalKm: 12000, intervalMonths: 12, notes: 'Calibração de fábrica mais simples/dura, curso limitado.', priority: 'LOW', order: 6 },
  { modelName: 'SHI 250', yearFrom: 2015, yearTo: null, component: 'Reaperto dos parafusos do cabeçote', intervalKm: 15000, intervalMonths: null, notes: 'Previne vazamento da junta do cabeçote.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SHI 250', yearFrom: 2015, yearTo: null, component: 'Kit de relação 520', intervalKm: 20000, intervalMonths: null, notes: 'Trocar corrente + pinhão + coroa juntos.', priority: 'HIGH', order: 8 },

  // XY 250 DENVER
  { modelName: 'XY 250 DENVER', yearFrom: 2016, yearTo: null, component: 'Óleo 20W-50 JASO MA (1,3L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 249cc a ar, base urbana com visual trail.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 250 DENVER', yearFrom: 2016, yearTo: null, component: 'Vela NGK C8HSA (gap 0,7-0,8mm)', intervalKm: 8000, intervalMonths: null, notes: 'Carburador PZ30.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XY 250 DENVER', yearFrom: 2016, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Reduzir para 250-300 km em uso frequente fora do asfalto.', priority: 'HIGH', order: 3 },
  { modelName: 'XY 250 DENVER', yearFrom: 2016, yearTo: null, component: 'Filtro de ar — limpeza / troca', intervalKm: 3000, intervalMonths: 12, notes: 'Reduzir intervalo para 1.500-2.000 km se usada com frequência em terra.', priority: 'MEDIUM', order: 4 },
  { modelName: 'XY 250 DENVER', yearFrom: 2016, yearTo: null, component: 'Óleo de garfo — troca preventiva', intervalKm: 15000, intervalMonths: null, notes: 'Suspensão de curso mais longo se beneficia de troca preventiva.', priority: 'MEDIUM', order: 5 },
  { modelName: 'XY 250 DENVER', yearFrom: 2016, yearTo: null, component: 'Reaperto dos parafusos do cabeçote', intervalKm: 10000, intervalMonths: null, notes: 'Antecipar para 10.000 km se usada fora do asfalto (vibração acelera ressecamento da junta).', priority: 'MEDIUM', order: 6 },
  { modelName: 'XY 250 DENVER', yearFrom: 2016, yearTo: null, component: 'Kit de relação 520', intervalKm: 20000, intervalMonths: null, notes: 'Antecipar inspeção se usada em terra com frequência.', priority: 'HIGH', order: 7 },

  // XY 250-6B DISCOVER
  { modelName: 'XY 250-6B DISCOVER', yearFrom: 2016, yearTo: null, component: 'Óleo 20W-50 JASO MA (1,3L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 249cc a ar.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 250-6B DISCOVER', yearFrom: 2016, yearTo: null, component: 'Vela NGK C8HSA (gap 0,7-0,8mm)', intervalKm: 8000, intervalMonths: null, notes: 'Carburador PZ30.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XY 250-6B DISCOVER', yearFrom: 2016, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Reduzir para 250-300 km em uso frequente fora do asfalto.', priority: 'HIGH', order: 3 },
  { modelName: 'XY 250-6B DISCOVER', yearFrom: 2016, yearTo: null, component: 'Filtro de ar — limpeza / troca', intervalKm: 3000, intervalMonths: 12, notes: 'Reduzir intervalo se usada em terra.', priority: 'MEDIUM', order: 4 },
  { modelName: 'XY 250-6B DISCOVER', yearFrom: 2016, yearTo: null, component: 'Inspeção de parafusos/clipes da carenagem', intervalKm: 3000, intervalMonths: null, notes: 'Carenagem esportiva com mais pontos de fixação — soltam com vibração.', priority: 'LOW', order: 5 },
  { modelName: 'XY 250-6B DISCOVER', yearFrom: 2016, yearTo: null, component: 'Óleo de garfo — troca preventiva', intervalKm: 15000, intervalMonths: null, notes: 'Preventivo, mesmo sem sinal de vazamento.', priority: 'MEDIUM', order: 6 },
  { modelName: 'XY 250-6B DISCOVER', yearFrom: 2016, yearTo: null, component: 'Kit de relação 520', intervalKm: 20000, intervalMonths: null, notes: 'Pinhão 15T + coroa 43-45T + corrente 520.', priority: 'HIGH', order: 7 },

  // XY 250 FLASH EFI
  { modelName: 'XY 250 FLASH EFI', yearFrom: 2018, yearTo: null, component: 'Óleo 20W-50 JASO MA (1,3L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 249cc a ar com EFI de corpo único.', priority: 'HIGH', order: 1 },
  { modelName: 'XY 250 FLASH EFI', yearFrom: 2018, yearTo: null, component: 'Vela NGK CR8HSA — resistiva (gap 0,7-0,8mm)', intervalKm: 9000, intervalMonths: null, notes: 'Obrigatoriamente resistiva para não interferir na ECU.', priority: 'HIGH', order: 2 },
  { modelName: 'XY 250 FLASH EFI', yearFrom: 2018, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Pilotagem esportiva acelera desgaste — inspecionar com mais frequência.', priority: 'HIGH', order: 3 },
  { modelName: 'XY 250 FLASH EFI', yearFrom: 2018, yearTo: null, component: 'Filtro de ar — limpeza / troca', intervalKm: 3000, intervalMonths: 12, notes: 'Filtro sujo enriquece mistura da EFI sem acender luz de falha.', priority: 'MEDIUM', order: 4 },
  { modelName: 'XY 250 FLASH EFI', yearFrom: 2018, yearTo: null, component: 'Inspeção do sensor TPS / diagnóstico com scanner', intervalKm: 9000, intervalMonths: 12, notes: 'Pode desregular com o tempo, causando marcha lenta instável.', priority: 'HIGH', order: 5 },
  { modelName: 'XY 250 FLASH EFI', yearFrom: 2018, yearTo: null, component: 'Bateria — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'ECU exige tensão estável.', priority: 'HIGH', order: 6 },
  { modelName: 'XY 250 FLASH EFI', yearFrom: 2018, yearTo: null, component: 'Reaperto dos parafusos do cabeçote', intervalKm: 15000, intervalMonths: null, notes: 'Previne vazamento da junta do cabeçote.', priority: 'MEDIUM', order: 7 },
  { modelName: 'XY 250 FLASH EFI', yearFrom: 2018, yearTo: null, component: 'Kit de relação 520', intervalKm: 20000, intervalMonths: null, notes: 'Pilotagem esportiva pode antecipar a troca.', priority: 'HIGH', order: 8 },

  // BOLT 250
  { modelName: 'BOLT 250', yearFrom: 2017, yearTo: null, component: 'Óleo 20W-50 JASO MA (1,3L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 249cc a ar, estilo cruiser/custom.', priority: 'HIGH', order: 1 },
  { modelName: 'BOLT 250', yearFrom: 2017, yearTo: null, component: 'Vela NGK C8HSA (gap 0,7-0,8mm)', intervalKm: 8000, intervalMonths: null, notes: 'Carburador PZ30.', priority: 'MEDIUM', order: 2 },
  { modelName: 'BOLT 250', yearFrom: 2017, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Kit: pinhão 15T + coroa 43-45T + corrente 520.', priority: 'HIGH', order: 3 },
  { modelName: 'BOLT 250', yearFrom: 2017, yearTo: null, component: 'Filtro de ar — limpeza / troca', intervalKm: 3000, intervalMonths: 12, notes: 'Limpeza a cada 3.000 km, troca a cada 9.000 km.', priority: 'MEDIUM', order: 4 },
  { modelName: 'BOLT 250', yearFrom: 2017, yearTo: null, component: 'Calibragem do pneu traseiro largo', intervalKm: null, intervalMonths: null, notes: 'Verificar semanalmente — pneu 150/80-15 é sensível a erro de calibragem.', priority: 'MEDIUM', order: 5 },
  { modelName: 'BOLT 250', yearFrom: 2017, yearTo: null, component: 'Inspeção da junta do escapamento', intervalKm: 6000, intervalMonths: 12, notes: 'Escapamento estilo cruiser mais exposto a impacto.', priority: 'LOW', order: 6 },
  { modelName: 'BOLT 250', yearFrom: 2017, yearTo: null, component: 'Suspensão traseira — inspeção', intervalKm: 12000, intervalMonths: 12, notes: 'Curso curto (banco baixo) — verificar fundo de curso e vazamento.', priority: 'MEDIUM', order: 7 },
  { modelName: 'BOLT 250', yearFrom: 2017, yearTo: null, component: 'Kit de relação 520', intervalKm: 20000, intervalMonths: null, notes: 'Trocar corrente + pinhão + coroa juntos.', priority: 'HIGH', order: 8 },

  // IRON 250 EFI
  { modelName: 'IRON 250 EFI', yearFrom: 2019, yearTo: null, component: 'Óleo 20W-50 JASO MA (1,3L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 249cc a ar com EFI, acabamento blackout.', priority: 'HIGH', order: 1 },
  { modelName: 'IRON 250 EFI', yearFrom: 2019, yearTo: null, component: 'Vela NGK CR8HSA — resistiva (gap 0,7-0,8mm)', intervalKm: 9000, intervalMonths: null, notes: 'Obrigatoriamente resistiva.', priority: 'HIGH', order: 2 },
  { modelName: 'IRON 250 EFI', yearFrom: 2019, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Kit: pinhão 15T + coroa 43-45T + corrente 520.', priority: 'HIGH', order: 3 },
  { modelName: 'IRON 250 EFI', yearFrom: 2019, yearTo: null, component: 'Filtro de ar — limpeza / troca', intervalKm: 3000, intervalMonths: 12, notes: 'Limpeza a cada 3.000 km, troca a cada 9.000 km.', priority: 'MEDIUM', order: 4 },
  { modelName: 'IRON 250 EFI', yearFrom: 2019, yearTo: null, component: 'Rebalanceamento das rodas raiadas 19"/16"', intervalKm: null, intervalMonths: null, notes: 'A cada troca de pneu — rodas raiadas custom perdem balanceamento mais fácil.', priority: 'MEDIUM', order: 5 },
  { modelName: 'IRON 250 EFI', yearFrom: 2019, yearTo: null, component: 'Inspeção do sensor TPS / diagnóstico com scanner', intervalKm: 9000, intervalMonths: 12, notes: 'Pode desregular com o tempo.', priority: 'HIGH', order: 6 },
  { modelName: 'IRON 250 EFI', yearFrom: 2019, yearTo: null, component: 'Bateria — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'ECU exige tensão estável.', priority: 'HIGH', order: 7 },
  { modelName: 'IRON 250 EFI', yearFrom: 2019, yearTo: null, component: 'Kit de relação 520', intervalKm: 20000, intervalMonths: null, notes: 'Trocar corrente + pinhão + coroa juntos.', priority: 'HIGH', order: 8 },

  // TITANIUM 250 EFI
  { modelName: 'TITANIUM 250 EFI', yearFrom: 2019, yearTo: null, component: 'Óleo 20W-50 JASO MA (1,3L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 249cc a ar com EFI, acabamento premium (painel digital/LED).', priority: 'HIGH', order: 1 },
  { modelName: 'TITANIUM 250 EFI', yearFrom: 2019, yearTo: null, component: 'Vela NGK CR8HSA — resistiva (gap 0,7-0,8mm)', intervalKm: 9000, intervalMonths: null, notes: 'Obrigatoriamente resistiva.', priority: 'HIGH', order: 2 },
  { modelName: 'TITANIUM 250 EFI', yearFrom: 2019, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Kit: pinhão 15T + coroa 43-45T + corrente 520.', priority: 'HIGH', order: 3 },
  { modelName: 'TITANIUM 250 EFI', yearFrom: 2019, yearTo: null, component: 'Filtro de ar — limpeza / troca', intervalKm: 3000, intervalMonths: 12, notes: 'Limpeza a cada 3.000 km, troca a cada 9.000 km.', priority: 'MEDIUM', order: 4 },
  { modelName: 'TITANIUM 250 EFI', yearFrom: 2019, yearTo: null, component: 'Verificação do retificador (prioridade alta — protege o painel digital)', intervalKm: null, intervalMonths: 12, notes: 'Tensão instável pode danificar a placa do painel digital. Testar 13,5-14,8V a 4.000 rpm.', priority: 'CRITICAL', order: 5 },
  { modelName: 'TITANIUM 250 EFI', yearFrom: 2019, yearTo: null, component: 'Inspeção do sensor TPS / diagnóstico com scanner', intervalKm: 9000, intervalMonths: 12, notes: 'Pode desregular com o tempo.', priority: 'HIGH', order: 6 },
  { modelName: 'TITANIUM 250 EFI', yearFrom: 2019, yearTo: null, component: 'Teste do painel digital', intervalKm: null, intervalMonths: 12, notes: 'Verificar pixels/leitura — peça de reposição é cara.', priority: 'LOW', order: 7 },
  { modelName: 'TITANIUM 250 EFI', yearFrom: 2019, yearTo: null, component: 'Kit de relação 520', intervalKm: 20000, intervalMonths: null, notes: 'Trocar corrente + pinhão + coroa juntos.', priority: 'HIGH', order: 8 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Shineray 200-250cc iniciando...\n')

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
        yearFrom: null,
        yearTo: null,
        order: idx,
      })),
    })

    const counts = { m: block.MACETES.length, p: block.PROBLEMAS.length, mt: block.MANUTENCAO.length }
    console.log(
      `  🔧 ${block.modelName} (${block.yearFrom ?? '?'}–${block.yearTo ?? 'atual'}): ` +
      `${counts.m} macetes, ${counts.p} problemas, ${counts.mt} manutenção`,
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

  const totalTips = BLOCKS.reduce((acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length, 0)
  console.log(
    `\n✅ Seed Shineray 200-250cc concluído: ${BLOCKS.length} modelos/trims, ${totalTips} dicas, ` +
    `${TIRE_PRESSURES.length} calibragens, ${MAINTENANCE_ITEMS.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
