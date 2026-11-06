// seed-yamaha-tenere-adventure.ts — Yamaha linha adventure/trail grande + paralelo-gêmeos touring
// XT 1200 Z Super Ténéré (DX + 60th Anniversary) · XT 600 E · XT 600 Z Ténéré · XT 660 R ·
// XT 660Z Ténéré · XTZ 700 Ténéré · XTZ 750 S Ténéré · TDM 225 · TDM 850 · TDM 900 · TRX 850
//
// ATENÇÃO CRÍTICA — matching de modelName com a FIPE (ver apps/web/app/api/tips/route.ts,
// função matchesStoredName): a FIPE (marca Yamaha, código 101) casa modelName armazenado
// contra o nome FIPE via `new RegExp(`\\b${stored}\\b`, 'i')`. Dois detalhes NÃO óbvios que
// já causaram bug em produção (ver commit "fix: corrigir colisao de modelName bare TENERE/MT-03"):
//
// 1) JÁ EXISTE um modelo pequeno e não relacionado "XTZ 250 TENERE" (249cc, ver
//    seed-yamaha-crosser.ts) e "XTZ 250X". Um modelName bare "TENERE" (sem prefixo) bateria
//    por substring/word-boundary em QUALQUER nome FIPE que contenha a palavra "TENERE" em
//    qualquer lugar — incluindo os nomes das motos GRANDES desta família (XT 600 Z TENERE,
//    XT 1200 Z SUPER TÉNÉRÉ, XTZ 700 TÉNÉRÉ, XTZ 750 S TENERE) — misturando conteúdo de uma
//    250cc popular com o de motos de 600-1200cc completamente diferentes. Por isso TODOS os
//    modelName abaixo usam o prefixo mais específico disponível (nunca "TENERE" sozinho).
//
// 2) A FIPE tem grafia INCONSISTENTE de acento e espaçamento entre os registros desta família
//    (verificado via fetch direto de https://parallelum.com.br/fipe/api/v1/motos/marcas/101/modelos):
//      "XT 1200 Z  SUPER TÉNÉRÉ/ DX"            (ESPAÇO DUPLO entre "Z" e "SUPER"; COM acento)
//      "XT 1200 Z S.TÉNÉRÉ 60th ANNIVERSARY"    (espaço simples; "S.TÉNÉRÉ" grudado com ponto)
//      "XT 600 E"
//      "XT 600 Z TENERE"                        (SEM acento)
//      "XT 660 R"
//      "XT 660Z TÉNÉRÉ"                         (SEM espaço entre "660" e "Z"; COM acento)
//      "XTZ 700 TÉNÉRÉ"                         (COM acento)
//      "XTZ 750 S TENERE"                       (SEM acento)
//    Como o regex de match exige substring EXATA (espaços e acentos literais), um modelName
//    "XT 1200 Z SUPER TENERE" (espaço simples, sem acento) NÃO bate em NENHUM dos dois nomes
//    reais da FIPE para a Super Ténéré. E — pior — o motor de regex do Node/V8 usa `\w` = só
//    [A-Za-z0-9_] (SEM letras acentuadas) para decidir `\b`. Isso significa que um modelName
//    terminado em letra acentuada (ex.: "TÉNÉRÉ", que termina em "É") não tem um `\b` de
//    fechamento válido quando o próximo caractere no nome FIPE também não é `\w` (ex.: "/" ou
//    fim de string) — o "É" e o "/" são ambos não-\w, logo NÃO há fronteira ali, e a regex
//    `\bTÉNÉRÉ\b` FALHA em bater mesmo estando a palavra literalmente presente. Testado e
//    confirmado com um script Node reproduzindo matchesStoredName linha a linha (ver resumo
//    da tarefa). Por isso, os modelName abaixo usados foram escolhidos como o MAIOR PREFIXO
//    COMUM que (a) termina em caractere ASCII alfanumérico (garante `\b` válido) e (b) é
//    exclusivo — bate em exatamente 1 nome real da FIPE, nenhum a mais, nenhum a menos:
//      'XT 1200 Z'         → bate nos DOIS registros da Super Ténéré (DX e 60th Anniversary) —
//                             mesma mecânica, conteúdo compartilhado; a edição 60th é comentada
//                             no texto dos macetes, sem precisar de um segundo modelName.
//      'XT 600 E'          → bate só em "XT 600 E"
//      'XT 600 Z TENERE'   → bate só em "XT 600 Z TENERE" (grafia sem acento da própria FIPE)
//      'XT 660 R'          → bate só em "XT 660 R"
//      'XT 660Z'           → bate só em "XT 660Z TÉNÉRÉ" (sem espaço, igual à FIPE; evita o
//                             acento final problemático)
//      'XTZ 700'           → bate só em "XTZ 700 TÉNÉRÉ" (evita o acento final problemático)
//      'XTZ 750 S TENERE'  → bate só em "XTZ 750 S TENERE" (grafia sem acento da própria FIPE)
//      'TDM 225' / 'TDM 850' / 'TDM 900' / 'TRX 850' → nomes simples, batem 1:1, sem ambiguidade
//
// Verificação final rodada (script Node descartável, apagado após uso): os 11 modelName acima
// batem cada um em exatamente 1 nome real da FIPE Yamaha (145 nomes totais), ZERO colisão
// cruzada com qualquer modelName já usado nos outros seed-yamaha-*.ts (grep completo por
// "modelName: '...'" em todos os arquivos da pasta), e ZERO colisão entre os 11 nomes novos
// entre si. Ver resumo da tarefa para o output completo do teste.
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

// ─── XT 1200 Z SUPER TÉNÉRÉ (2014-2020, DX + 60th Anniversary) ───────────────
// Motor 1199cc paralelo-gêmeo DOHC 4V líquido-refrigerado, virabrequim a 270°,
// YCC-T (acelerador eletrônico ride-by-wire), corrente 525 (NÃO tem cardã —
// muitos donos vindos de BMW GS esperam cardã e negligenciam a corrente).
// DX (2014+): suspensão eletrônica semi-ativa Öhlins + controle de tração +
// cruise control. 60th Anniversary (2015): edição especial branca/vermelha
// comemorativa dos 60 anos da Yamaha, mecânica idêntica à DX.

const XT1200Z_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1199cc DOHC líquido-refrigerado — óleo 10W-40 (ou 10W-50 em clima quente), ~4,7 L com filtro; troca a cada 10.000 km ou 12 meses',
    body: 'A Super Ténéré usa um paralelo-gêmeo de 1199cc com virabrequim a 270° (mesmo princípio de "big bang" de um V-twin, para tração suave em off-road). Óleo JASO MA/MA2, 10W-40 na maioria dos climas ou 10W-50 em uso constante em calor extremo. Capacidade aproximada 4,7 L com troca de filtro — confirme no manual do ano exato, pois DX e a versão-base podem ter pequenas variações de galeria de óleo. Filtro: trocar sempre junto.',
  },
  {
    severity: 'WARN',
    title: 'CORRENTE 525, não cardã — erro comum de quem troca de BMW GS: achar que "moto grande de viagem" tem transmissão final sem manutenção',
    body: 'Ao contrário de várias adventures premium concorrentes (BMW GS, algumas Triumph Tiger), a Super Ténéré usa corrente 525 com o-ring, não eixo cardã. É um ponto de confusão comum entre donos vindos de outras marcas: a corrente PRECISA de lubrificação e ajuste de folga regulares (a cada 500-800 km), senão desgasta rápido e pode até quebrar em uso pesado. Kit relação completo (coroa + pinhão + corrente): troque sempre junto, nunca só a corrente isolada.',
  },
  {
    severity: 'OK',
    title: 'Suspensão eletrônica Öhlins (versão DX, 2014+) — sensível a impacto de pedra; capa protetora reduz risco de dano aos sensores/atuadores',
    body: 'A versão DX tem suspensão semi-ativa Öhlins com atuadores eletrônicos que ajustam amortecimento em tempo real. É tecnologia cara de reparar (peça de atuador eletrônico não é item de prateleira comum) — proteja com capas/skid plate ao trilhar em terreno com pedras soltas. A versão-base (não-DX) tem suspensão convencional, mais barata de manter mas sem o ajuste automático.',
  },
  {
    severity: 'OK',
    title: 'Vela e regulador retificador — ponto de atenção elétrica em moto com muitos acessórios de fábrica (grip aquecido, ABS, TCS, cruise control)',
    body: 'A carga elétrica da Super Ténéré é alta: ABS, controle de tração, cruise control, grips aquecidos (opcionais), painel TFT. O regulador retificador trabalha sob estresse térmico constante — verificar a tensão da bateria em marcha lenta (deve subir para 13,5-14,8 V) a cada revisão. Sintoma de regulador falhando: bateria descarregando mesmo com moto em uso frequente, luzes piscando em marcha lenta.',
  },
  {
    severity: 'OK',
    title: '60th Anniversary (2015) — edição especial de pintura, mecânica 100% idêntica à DX; não existe diferença de motor/suspensão a considerar na manutenção',
    body: 'A edição 60th Anniversary é puramente estética (pintura branca com detalhes vermelhos, emblema comemorativo dos 60 anos da Yamaha) sobre a base mecânica da DX — mesmo motor 1199cc, mesma suspensão Öhlins eletrônica, mesma eletrônica de piloto. Toda a manutenção e todas as peças são intercambiáveis com a DX regular. O valor de revenda tende a ser mais alto pela raridade/colecionismo, não pela mecânica.',
  },
  {
    severity: 'WARN',
    title: 'Peso ~261 kg com tanque cheio (23 L) — moto pesada para manobras de baixa velocidade em terra; prática progressiva antes de trilhas técnicas',
    body: 'A Super Ténéré é uma das adventures mais pesadas do mercado. Em asfalto o peso não incomoda (estabilidade em alta velocidade), mas em off-road técnico ou em quedas de baixa velocidade, o peso exige preparo físico e técnica. Pneus: 110/80R19 dianteiro / 150/70R17 traseiro, rodas raiadas com câmara. Calibragem estrada: 36 PSI F / 42 PSI R (com garupa/bagagem). Off-road leve: 25-28 PSI F / 28-30 PSI R.',
  },
]

const XT1200Z_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Corrente negligenciada — dono vindo de moto com cardã não lubrifica com a frequência necessária; desgaste prematuro do kit relação é a queixa mais comum',
    body: 'A reclamação mais recorrente de proprietários que trocaram de BMW GS ou similar para a Super Ténéré é o desgaste acelerado da corrente por falta do hábito de lubrificação. Corrente seca ou mal ajustada nesta moto pesada e de muito torque desgasta MUITO mais rápido que em uma moto leve. Lubrifique a cada 500-800 km (mais em chuva/trilha) e ajuste a folga (35-40 mm) a cada 1.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Regulador retificador — falha documentada em unidades com muitos acessórios elétricos extras instalados (GPS, tomada USB, farol auxiliar) sem fusível dedicado',
    body: 'Instalar acessórios elétricos direto na bateria sem fusível/relé dedicado sobrecarrega o sistema de carga original, acelerando a falha do regulador retificador (peça cara, R$400-700). Sempre instale acessórios com fusível próprio e, se possível, um relé independente do chicote original. Sintoma de regulador no fim da vida útil: farol perdendo intensidade em marcha lenta, bateria "fraca" mesmo nova.',
  },
  {
    severity: 'WARN',
    title: 'Atuadores da suspensão eletrônica Öhlins (DX) — item de reparo caro e de disponibilidade limitada fora da rede autorizada Yamaha',
    body: 'A suspensão semi-ativa é um diferencial tecnológico, mas também um ponto de risco financeiro: em caso de dano (queda, impacto de pedra, entrada de água/lama no atuador), o conserto exige peça original e, geralmente, só a rede autorizada tem o diagnóstico correto (a suspensão se comunica com a ECU da moto). Evite lavagem com jato de alta pressão direto nos atuadores.',
  },
]

const XT1200Z_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção Super Ténéré XT1200Z por km — motor DOHC 1199cc líquido-refrigerado',
    body: 'Revisão 1.000 km (garantia): óleo grátis + aperto geral + inspeção de corrente. 10.000 km: óleo 10W-40/10W-50 com filtro (~4,7 L) + inspeção de pastilhas de freio + filtro de ar. 20.000 km: óleo + filtro + regulagem de válvulas (shim under bucket, DOHC — só oficina especializada) + vela + kit relação 525 (coroa + pinhão + corrente) se desgastado. 30.000 km: óleo + filtro. 40.000 km: óleo + filtro + válvulas + revisão completa de freios (discos, pastilhas, fluido). A cada 500-800 km: lubrificação e ajuste de folga da corrente (35-40 mm) — mais frequente em chuva ou trilha. A cada 12 meses: verificação da tensão de carga da bateria/regulador (13,5-14,8 V em marcha lenta com farol ligado). A cada 24 meses: fluido de freio DOT 4 e líquido de arrefecimento. Versão DX: NUNCA usar jato de alta pressão direto nos atuadores Öhlins — apenas pano úmido. Corrente: item de atenção redobrada nesta moto pesada — negligência aqui é a causa nº1 de problemas documentados pelos donos.',
  },
]

// ─── XT 600 E (Brasil, ~1991-2004) ───────────────────────────────────────────
// Motor 595cc SOHC 4V monocilíndrico, refrigeração mista ar/óleo, carburador
// Mikuni BST34/BDST34. Moto simples, robusta, apelidada carinhosamente de
// "burrão" pelos motociclistas brasileiros — muitas unidades ainda rodam hoje,
// décadas depois, com manutenção básica.

const XT600E_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 595cc SOHC 4V — óleo 10W-40 MA2, ~2,6-2,8 L (confirme no manual do ano); simplicidade mecânica é o motivo da fama de durabilidade',
    body: 'A XT600E é um monocilíndrico simples, sem eletrônica, sem injeção — carburador Mikuni e ignição CDI convencional. Troca de óleo a cada 3.000 km em uso urbano/misto, 2.500 km em uso off-road frequente. Vela: família NGK DR8ES (confirme código exato no manual do ano — houve variação ao longo da produção). Corrente 530, folga 20-30 mm.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Mikuni — entupimento com etanol parado é a causa nº1 de "moto não pega" em unidades hoje com 20+ anos de idade',
    body: 'Unidades de XT600E ainda em circulação hoje têm entre 20-35 anos. O carburador Mikuni original acumula verniz de etanol degradado quando a moto fica parada por semanas — típico em moto de fim de semana/lazer. Ao guardar por mais de 2 semanas: feche o registro de combustível e deixe o motor rodar até esgotar o carburador. Limpeza preventiva anual em unidades antigas é recomendável mesmo sem sintoma aparente.',
  },
  {
    severity: 'WARN',
    title: 'Borrachas e mangueiras originais — ressecamento por idade (não por quilometragem) em unidades de 20+ anos; trocar preventivamente mesmo sem vazamento visível',
    body: 'Numa moto desta idade, o fator crítico não é só km rodado — é o tempo. Mangueiras de combustível, diafragma do carburador, retentores de bengala e coifas de vela ressecam e racham com o tempo, mesmo em moto pouco usada. Ao comprar uma XT600E usada, inspecione (ou troque preventivamente) toda a borracharia exposta antes de rodar longas distâncias.',
  },
  {
    severity: 'OK',
    title: 'Refrigeração mista ar/óleo — sem radiador de água; verificar nível de óleo com mais atenção em uso prolongado em subida/calor',
    body: 'A XT600E não tem sistema de arrefecimento líquido — depende do fluxo de ar e do próprio óleo do motor para dissipar calor. Isso significa que o nível e a qualidade do óleo são ainda mais críticos que em motos líquido-refrigeradas. Em uso prolongado de subida ou trânsito parado no calor, cuidado redobrado com o nível — óleo baixo neste tipo de motor aquece rápido.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor ainda fáceis de achar (motor compartilhado com outras Yamaha da época); peças de plástico/carenagem específicas ficam mais raras',
    body: 'Por ser uma moto de grande volume de vendas no Brasil nos anos 90-2000, peças de motor (pistão, anéis, correia de comando — na verdade corrente de comando interna, juntas) ainda são relativamente fáceis de achar em lojas Yamaha e paralelas. Peças de plástico/carenagem específicas da XT600E (poucas, já que é moto "nua") e itens elétricos originais (chicote, CDI) ficam mais escassos — desmanches especializados costumam ser a melhor fonte.',
  },
]

const XT600E_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carburador entupindo em moto parada por semanas — problema mais comum reportado por donos de unidades preservadas/segunda mão',
    body: 'Como a maioria das XT600E hoje é usada esporadicamente (moto de fim de semana ou aventura ocasional), o carburador Mikuni é o ponto fraco nº1: etanol parado forma verniz nas passagens internas. Limpeza (ultrassom ou manual): R$100-200. Prevenção: esgotar o carburador antes de guardar por mais de 15 dias.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelos retentores do motor — comum em unidades com 100.000+ km ou muitos anos de uso; junta do cárter e retentor de câmbio são os pontos mais citados',
    body: 'Motor com muitos anos/km acumula pequenos vazamentos pelas juntas e retentores. Não é necessariamente sinal de motor "estourado" — na maioria dos casos é desgaste normal de vedação por idade. Verificação visual embaixo do motor após a moto ficar parada durante a noite é o teste mais simples. Vazamento leve: reparo relativamente barato (troca de junta/retentor). Vazamento abundante: procurar mecânico antes de rodar mais.',
  },
  {
    severity: 'OK',
    title: 'Motor robusto e de baixa complexidade — poucas queixas de motor em si; a maior parte dos problemas documentados é de idade/conservação, não de projeto',
    body: 'A fama de durabilidade da XT600E é bem documentada: motores com 150.000-200.000 km ainda funcionando são comuns nos fóruns e grupos de owners. Os problemas típicos reportados hoje são majoritariamente relacionados à idade das unidades (borracha, carburador, elétrica) e não a falhas de projeto do motor.',
  },
]

const XT600E_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção XT600E por km — motor 595cc SOHC 4V carburado, refrigeração mista ar/óleo',
    body: 'Revisão 1.000 km (garantia, unidades novas na época): óleo grátis + aperto geral. 3.000 km: óleo 10W-40 MA2. 6.000 km: óleo + filtro de ar (inspeção/troca) + vela. 9.000 km: óleo. 12.000 km: óleo + regulagem de válvulas + limpeza preventiva do carburador Mikuni + kit relação 530 se desgastado. A cada 300-400 km: lubrificação da corrente. A cada 6 meses (ou antes de rodar após a moto ficar parada): esgotar/limpar o carburador se houve período parado maior que 15 dias. Em unidades hoje com 20+ anos: inspeção anual de toda a borracharia (mangueiras, retentores, coifas) independente de km, e checagem de vazamento de óleo nas juntas do motor. Bateria: verificar tensão a cada 6 meses (moto usada esporadicamente descarrega rápido).',
  },
]

// ─── XT 600 Z TENERE (Brasil, ~1988-1994) ────────────────────────────────────
// Mesma base de motor da XT600E (595cc SOHC 4V, carburador Mikuni), mas com
// tanque muito maior (~26 L, visual clássico Paris-Dakar), suspensão de curso
// mais longo e roda dianteira 21" raiada — moto voltada para aventura/off-road
// de longa distância, precursora do conceito que hoje é a Super Ténéré/Ténéré 700.

const XT600Z_TENERE_MACETES: TipInput[] = [
  ...XT600E_MACETES,
  {
    severity: 'OK',
    title: 'Tanque gigante (~26 L) — visual clássico Paris-Dakar; peso alto quando cheio muda o comportamento em manobras de baixa velocidade em trilha',
    body: 'O maior diferencial da Ténéré clássica é o tanque enorme (~26 L, o dobro de motos comuns da época), que dava autonomia para travessias de deserto. Hoje, o efeito prático é: com tanque cheio a moto fica bem mais pesada na parte alta, dificultando manobras lentas em trilha técnica. Dica histórica válida ainda hoje: complete o tanque só ao sair para a estrada, não no meio de uma trilha técnica.',
  },
  {
    severity: 'WARN',
    title: 'Rodas raiadas (21" dianteira) — verificar tensão dos raios periodicamente; moto de 30+ anos pode ter raios afrouxados ou aro batido de uso anterior',
    body: 'A roda raiada dianteira aro 21" é excelente para absorver impacto em off-road, mas exige manutenção que rodas de liga não precisam: verificação de tensão dos raios (raio frouxo causa empenamento do aro com o tempo). Em unidades usadas com décadas de uso, é comum achar raios soltos ou aro levemente ovalizado — verifique antes de rodar off-road pesado.',
  },
  {
    severity: 'OK',
    title: 'Moto de coleção/nicho hoje — peças de ciclística (tanque, carenagem, rodas raiadas) mais raras que peças de motor; grupos de owners são a melhor fonte',
    body: 'A XT600Z Ténéré clássica virou item de colecionador e é cultuada por entusiastas de adventure vintage. O motor (compartilhado com a XT600E) tem peças relativamente fáceis. Já peças específicas de ciclística — tanque de 26 L, carenagem do farol, banco — são raras e concentradas em desmanches especializados ou comunidades de restauradores (grupos "Yamaha Ténéré Clássica Brasil" no Facebook, por exemplo).',
  },
]

const XT600Z_TENERE_PROBLEMAS: TipInput[] = [
  ...XT600E_PROBLEMAS,
  {
    severity: 'WARN',
    title: 'Corrosão do tanque de aço de 26 L — mais crítico aqui que em qualquer outra moto da família por ser tanque grande e moto frequentemente parada por longos períodos entre saídas',
    body: 'Tanque de aço grande + etanol parado por meses (moto de coleção/uso ocasional) é receita para corrosão interna severa. Antes de comprar uma usada, sempre inspecione o interior do tanque (remover e olhar com lanterna, se possível) — ferrugem interna avançada pode custar mais para tratar que o valor de mercado de tanques usados. Tratamento preventivo com produto selador de tanque é recomendável em toda unidade de coleção.',
  },
]

const XT600Z_TENERE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção XT600Z Ténéré clássica por km — motor idêntico à XT600E, ciclística off-road de longo curso',
    body: 'Segue o mesmo cronograma de motor da XT600E (óleo a cada 3.000 km, válvulas e limpeza de carburador a cada 12.000 km). Itens específicos desta moto: verificação de tensão dos raios da roda 21" a cada 5.000 km ou antes de trilha pesada; inspeção do tanque de 26 L quanto a corrosão interna a cada 2-3 anos (mais crítico que em outras motos da família por ser tanque maior e moto de uso mais esporádico); retentores de bengala de curso longo — inspecionar a cada 15.000-20.000 km, mais cedo se usada regularmente em trilha. Por ser hoje majoritariamente moto de coleção/nicho, priorize a inspeção de toda a borracharia por idade, não só por km rodado.',
  },
]

// ─── XT 660 R (importada, Brasil ~2007-2013) ─────────────────────────────────
// Motor 660cc SOHC 5V monocilíndrico líquido-refrigerado com contra-eixo de
// balanceamento, injeção eletrônica (EFI) — sucessora tecnológica da XT600E,
// primeira geração de monocilíndricos grandes Yamaha com injeção no mercado
// brasileiro. Versão R: street/enduro de estrada, sem tanque grande.

const XT660R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 660cc SOHC 5V líquido-refrigerado com contra-eixo de balanceamento — óleo 10W-40 MA2, ~2,8 L com filtro; troca a cada 6.000 km',
    body: 'A XT660R substitui o carburador da geração XT600E por injeção eletrônica (EFI), trazendo partida mais fácil a frio e menos manutenção de mistura ar/combustível. O contra-eixo de balanceamento reduz a vibração característica de monocilíndricos grandes. Óleo JASO MA2 10W-40, troca a cada 6.000 km (uso misto) ou 5.000 km (off-road/trilha frequente).',
  },
  {
    severity: 'OK',
    title: 'Injeção eletrônica — sem ajuste manual de mistura, mas requer leitura de TPS/sensor a cada revisão para evitar marcha lenta instável',
    body: 'Diferente da geração carburada, a XT660R depende de sensores eletrônicos (TPS, sensor de temperatura do motor, sonda) para calibrar a mistura. Marcha lenta instável ou consumo alto sem causa aparente: verificar TPS antes de qualquer outra investigação. Scanner de diagnóstico: ferramenta útil em oficinas Yamaha para leitura de código de falha.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 520 — desgaste acelerado em uso off-road; kit relação completo (não só a corrente) a cada 18.000-20.000 km em uso misto',
    body: 'Corrente 520 com o-ring, lubrificação a cada 500-600 km (mais em chuva/trilha). Sinal de corrente gasta: folga excessiva mesmo após ajuste, "esticamento" visível ao girar a roda traseira devagar. Trocar sempre coroa + pinhão + corrente juntos para evitar desgaste desigual acelerando o kit novo.',
  },
  {
    severity: 'OK',
    title: 'Radiador e ventoinha — item novo em relação à geração anterior (XT600E não tinha); verificar nível de líquido de arrefecimento a cada revisão',
    body: 'Ao contrário da XT600E (refrigeração mista ar/óleo), a XT660R tem radiador líquido de verdade. Verificar nível do reservatório a cada abastecimento e trocar o líquido de arrefecimento a cada 2 anos ou 24.000 km. Sensor de temperatura e relé da ventoinha: verificar funcionamento no início de cada verão (ventoinha deve ligar ao atingir a temperatura de acionamento, mesmo com moto parada).',
  },
  {
    severity: 'OK',
    title: 'Peso ~187 kg, tanque ~17 L — moto mais equilibrada para uso diário/estrada que a versão Ténéré (Z), que é mais alta e pesada',
    body: 'A versão R (sem o "Z" de Ténéré) tem geometria mais baixa e tanque menor que a XT660Z, priorizando uso em estrada/urbano com toque off-road ocasional. Pneus: 90/90-21 dianteiro / 130/80-17 traseiro. Calibragem: 26 PSI F / 29 PSI R (solo), 28/32 PSI (com garupa/carga).',
  },
]

const XT660R_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Rolamento de embreagem de partida (starter clutch / one-way bearing) — desgaste reportado por donos de unidades com mais quilometragem; sintoma é ruído metálico na partida',
    body: 'Um dos pontos de atenção mais citados por proprietários de longa data da XT660R é o desgaste do rolamento de roda-livre da partida elétrica (starter clutch). Sintoma: ruído metálico ("estalo" ou "raspagem") no momento exato da partida, que pode piorar progressivamente. Diagnóstico e reparo exigem abertura parcial do motor — procure mecânico especializado em monocilíndricos Yamaha grandes ao notar o sintoma, antes que o desgaste avance.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de temperatura/TPS descalibrando com o tempo — marcha lenta oscilante é queixa recorrente após alguns anos de uso',
    body: 'Assim como em outras injetadas antigas da Yamaha, sensores (TPS, temperatura) podem descalibrar ou degradar com o tempo, causando marcha lenta oscilante ou "engasgo" em baixa rotação. Ajuste com scanner resolve a maioria dos casos sem necessidade de troca de peça.',
  },
]

const XT660R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção XT660R por km — motor 660cc SOHC 5V líquido-refrigerado, injeção eletrônica',
    body: 'Revisão 1.000 km (garantia): óleo grátis + aperto geral + verificação de corrente. 6.000 km: óleo 10W-40 MA2 com filtro (~2,8 L). 12.000 km: óleo + filtro + vela + regulagem de válvulas (5 válvulas, motor frio) + inspeção de TPS/marcha lenta. 18.000 km: óleo + filtro + kit relação 520 completo (corrente + coroa + pinhão). 24.000 km: óleo + filtro + válvulas + troca do líquido de arrefecimento. A cada 500-600 km: lubrificação da corrente. A cada 12 meses: verificação do relé/sensor da ventoinha do radiador antes do verão. Ruído metálico na partida: investigar rolamento de roda-livre da partida (starter clutch) o quanto antes — é o ponto de desgaste mais documentado desta moto.',
  },
]

// ─── XT 660Z TÉNÉRÉ (importada, Brasil ~2008-2013) ───────────────────────────
// Mesmo motor da XT660R (660cc SOHC 5V líquido-refrigerado, EFI), mas com
// tanque maior (~23 L), suspensão de curso mais longo, assento mais alto
// (~895 mm) e roda dianteira 21" raiada — moto de adventure/viagem longa,
// muito usada mundialmente por viajantes de "volta ao mundo" pela simplicidade
// mecânica frente a adventures maiores e mais eletrônicas.

const XT660Z_TENERE_MACETES: TipInput[] = [
  ...XT660R_MACETES,
  {
    severity: 'OK',
    title: 'Tanque maior (~23 L) e suspensão de curso mais longo — moto preferida mundialmente para viagens de longa distância pela simplicidade mecânica',
    body: 'A XT660Z Ténéré ficou mundialmente famosa entre viajantes de longa distância ("RTW travelers") justamente pela combinação de autonomia (tanque de ~23 L) e mecânica simples o suficiente para reparo em qualquer oficina de estrada, mesmo em países com infraestrutura limitada — diferente de adventures mais eletrônicas como a própria Super Ténéré. Assento mais alto (~895 mm) exige adaptação de pilotos mais baixos.',
  },
  {
    severity: 'WARN',
    title: 'Protetor de motor (skid plate) — NÃO vem de fábrica; item essencial antes de qualquer trilha técnica, já que o cárter fica exposto',
    body: 'Como a maioria das adventures desta faixa de preço/época, a XT660Z Ténéré não vem com proteção de cárter de fábrica. Para uso off-road, instale um skid plate de alumínio antes da primeira trilha técnica — o custo de reparo de um cárter trincado por pedra é muito maior que o da proteção.',
  },
  {
    severity: 'OK',
    title: 'Roda dianteira 21" raiada — mesma lógica de manutenção da Ténéré clássica (600Z): verificar tensão dos raios periodicamente, especialmente após trilha pesada',
    body: 'A roda 21" com raios da XT660Z Ténéré segue a tradição da família Ténéré: excelente em terreno irregular, mas exige verificação periódica de tensão dos raios (raio frouxo gera empenamento do aro com o tempo). Verifique a cada 5.000 km ou antes de qualquer viagem longa fora do asfalto.',
  },
]

const XT660Z_TENERE_PROBLEMAS: TipInput[] = [
  ...XT660R_PROBLEMAS,
  {
    severity: 'WARN',
    title: 'Cárter exposto sem proteção de fábrica — dano por impacto de pedra é a causa mais citada de reparo caro inesperado em uso off-road pesado',
    body: 'Sem skid plate de fábrica, o cárter de alumínio fica vulnerável em trilha técnica. Owners que usam a moto para viagem/aventura recomendam instalar proteção antes da primeira saída séria — o custo de um skid plate (R$300-600) é muito menor que o de um cárter trincado (R$1.000-2.500 + mão de obra).',
  },
]

const XT660Z_TENERE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção XT660Z Ténéré por km — motor idêntico à XT660R, ciclística de aventura/viagem longa',
    body: 'Segue o mesmo cronograma de motor da XT660R (óleo a cada 6.000 km, válvulas e vela a cada 12.000 km, kit relação 520 a cada 18.000 km). Itens específicos desta versão: instalar skid plate de alumínio ANTES do primeiro uso off-road (não vem de fábrica); verificação de tensão dos raios da roda 21" a cada 5.000 km, mais frequente antes de viagens longas; em uso de viagem de longa distância, leve peças de desgaste rápido (velas, filtro de ar, cabos) — mecânica simples desta moto é justamente o que permite reparo em oficinas de estrada em qualquer lugar.',
  },
]

// ─── XTZ 700 TÉNÉRÉ (Brasil, ~2021+, produção atual) ─────────────────────────
// Motor CP2 689cc paralelo-gêmeo DOHC 4V líquido-refrigerado (compartilhado
// com MT-07/XSR700/Tracer 700), injeção eletrônica dupla, corrente 525. Foco
// off-road deliberadamente mecânico/simples (sem suspensão eletrônica, sem
// múltiplos modos eletrônicos) em contraste com a Super Ténéré XT1200Z.

const XTZ700_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor CP2 689cc DOHC líquido-refrigerado — mesmo bloco da MT-07/Tracer 700; óleo 10W-40/10W-50 MA2, ~3,0-3,4 L com filtro (confirme no manual)',
    body: 'A Ténéré 700 usa o consagrado motor CP2 (Crossplane 2 — virabrequim a 270°) da MT-07, reconhecido por confiabilidade e torque de baixo regime. Troca de óleo a cada 6.000 km (uso misto) ou 5.000 km (off-road pesado). Vela iridium (referência NGK específica da família CP2 — confirme código exato no manual, pois pode variar da MT-07 pela calibração de mapa diferente): troca a cada 24.000 km.',
  },
  {
    severity: 'OK',
    title: 'Filosofia mecânica deliberadamente simples — sem suspensão eletrônica, poucos modos eletrônicos; ao contrário da Super Ténéré, foco é robustez e facilidade de reparo em trilha',
    body: 'A Yamaha posicionou a Ténéré 700 como o oposto filosófico da Super Ténéré XT1200Z: suspensão convencional KYB (não eletrônica), sem múltiplos modos de potência, ABS simples com opção de desligar no traseiro. Isso reduz pontos de falha eletrônica cara e mantém a moto mais fácil de reparar longe de concessionária — decisão de projeto elogiada por viajantes de longa distância.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 525 — moto pesada (~204 kg) com torque considerável; negligência na lubrificação acelera desgaste do kit relação mais que em motos leves',
    body: 'Assim como toda adventure de porte médio/grande desta família, a corrente exige atenção redobrada: lubrificação a cada 500-600 km, mais em chuva ou trilha. Kit relação completo (coroa + pinhão + corrente) a cada 20.000 km em uso misto, antecipando para 16.000-18.000 km em uso off-road intenso.',
  },
  {
    severity: 'OK',
    title: 'Rodas 21"/18" com câmara — mesma configuração clássica da família Ténéré; pneus dual-sport recomendados para quem faz trilha regularmente',
    body: 'A Ténéré 700 mantém a configuração tradicional 21" dianteira / 18" traseira com câmara (não tubeless), permitindo uso de pneus dedicados off-road com mais facilidade que rodas tubeless. Calibragem estrada: 29 PSI F / 33 PSI R. Off-road: 20-23 PSI F / 24-26 PSI R (ajustar conforme peso e terreno).',
  },
  {
    severity: 'WARN',
    title: 'Injeção com resposta "seca" em baixa rotação — queixa comum reportada por proprietários, sobretudo em marcha lenta e transições suaves de acelerador',
    body: 'Um ponto de atenção frequentemente citado por donos da Ténéré 700 é a resposta um pouco brusca/seca do acelerador em baixas rotações e transições suaves (fechado-para-aberto), característica do mapeamento de injeção do motor CP2 nesta calibração específica. Não é falha mecânica — é comportamento de fábrica, mas pode ser suavizado com atualização de mapa em concessionária ou módulo de aceleração (quando disponível).',
  },
]

const XTZ700_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Corrente e kit relação — item de desgaste mais citado em uso de trilha pesada; negligência é a causa mais comum de reparo inesperado',
    body: 'Como em toda a família de adventures grandes deste arquivo, a corrente é o ponto de manutenção mais crítico e mais frequentemente negligenciado. Owners que fazem trilha pesada regularmente relatam necessidade de trocar o kit relação bem antes do intervalo "de fábrica" se a lubrificação não for rigorosa.',
  },
  {
    severity: 'OK',
    title: 'Motor CP2 com histórico consolidado de confiabilidade (mesmo bloco da MT-07) — poucos problemas de motor documentados especificamente na Ténéré 700',
    body: 'Por usar o mesmo motor CP2 já maduro e testado em milhões de km na MT-07/Tracer 700 ao redor do mundo, a Ténéré 700 não acumula queixas de motor além das já esperadas para a família (resposta de acelerador em baixa rotação). A maior parte das reclamações de owners é sobre ciclística (suspensão em uso off-road extremo) e não sobre o motor em si.',
  },
]

const XTZ700_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção Ténéré 700 por km — motor CP2 689cc DOHC líquido-refrigerado',
    body: 'Revisão 1.000 km (garantia): óleo grátis + aperto geral + verificação de corrente. 6.000 km: óleo 10W-40/10W-50 MA2 com filtro (~3,0-3,4 L). 12.000 km: óleo + filtro + regulagem de válvulas (motor frio) + filtro de ar. 18.000 km: óleo + filtro. 20.000 km: kit relação 525 completo (coroa + pinhão + corrente) — antecipar para 16.000-18.000 km em uso off-road intenso. 24.000 km: óleo + filtro + válvulas + vela iridium. A cada 500-600 km: lubrificação da corrente, mais frequente em chuva/trilha. A cada 24 meses: fluido de freio DOT 4 e líquido de arrefecimento. Suspensão KYB convencional (não eletrônica): inspeção de vazamento nos retentores a cada 15.000-20.000 km, mais cedo em uso off-road pesado.',
  },
]

// ─── XTZ 750 S TENERE (Super Ténéré original, ~1989-1995, importada) ─────────
// Motor 749cc paralelo-gêmeo DOHC 5V líquido-refrigerado, carburadores Mikuni
// duplos, corrente — a Super Ténéré ORIGINAL, precursora direta da atual
// XT1200Z. Moto rara e de nicho colecionador no Brasil hoje, com poucas
// unidades remanescentes e disponibilidade de peças limitada.

const XTZ750S_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 749cc paralelo-gêmeo DOHC 5V líquido-refrigerado — precursora direta da atual Super Ténéré XT1200Z; carburadores duplos Mikuni exigem sincronismo preciso',
    body: 'A XTZ750 Super Ténéré original trouxe, ainda nos anos 80/90, a fórmula que a Yamaha usaria décadas depois na XT1200Z: paralelo-gêmeo de médio-grande porte com pegada off-road. Diferença principal: aqui são dois carburadores Mikuni (não injeção), que precisam de sincronismo regular (manômetro de vácuo de 2 vias) para marcha lenta suave e consumo correto.',
  },
  {
    severity: 'WARN',
    title: 'Moto de 30+ anos — borracha, mangueiras e diafragmas dos carburadores ressecam por IDADE, mesmo em unidades de baixa quilometragem preservada',
    body: 'Como toda moto desta faixa etária (fabricada entre 1989-1995), o fator crítico não é o km rodado, mas o tempo. Antes de rodar qualquer distância significativa numa XTZ750S adquirida recentemente, faça uma revisão completa de borrachas: mangueiras de combustível, diafragmas dos carburadores, retentores de bengala e coifas elétricas. Item ressecado pode falhar sem aviso, mesmo em moto "bem cuidada" na aparência.',
  },
  {
    severity: 'WARN',
    title: 'Peças raras — moto de nicho colecionador no Brasil; peças de ciclística e elétrica específicas são as mais difíceis de achar novas',
    body: 'A XTZ750S teve poucas unidades no Brasil (importada) e hoje é item de colecionador. Peças de motor compartilhadas com outras plataformas Yamaha da época são um pouco mais fáceis de achar (remanufaturadas ou usadas); já peças específicas de carenagem, tanque e componentes elétricos originais são raras — desmanches especializados e comunidades internacionais de owners (a moto teve mais volume em mercados como Europa e Japão) costumam ser as melhores fontes.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão final (não cardã) — mesma lógica de atenção que as adventures modernas da família: lubrificação regular é essencial',
    body: 'A XTZ750S usa corrente de transmissão final, não cardã. Em moto de coleção usada esporadicamente, é comum a corrente enferrujar entre usos — sempre lubrifique antes de guardar por longos períodos, e verifique o estado antes de qualquer saída após período parado.',
  },
]

const XTZ750S_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Descarburação/desregulagem dos carburadores duplos — sintoma de marcha lenta instável e vibração excessiva em unidades sem sincronismo recente',
    body: 'Os dois carburadores Mikuni precisam estar perfeitamente sincronizados para o motor rodar suave. Com o tempo (e principalmente após períodos parado), a sincronia se perde — sintoma: marcha lenta instável, vibração maior que o normal, perda de potência em baixa rotação. Requer manômetro de vácuo e mecânico com experiência em carburação dupla de motos antigas — procure especialista em Yamaha clássica, não qualquer oficina.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão interna do tanque de aço e do sistema de combustível — crítica em moto de coleção com uso esporádico e décadas de exposição a etanol',
    body: 'Como toda moto antiga com tanque de aço, a XTZ750S sofre corrosão interna acelerada por etanol parado por longos períodos — típico do uso de coleção. Antes de comprar ou de retomar uso após anos parada, inspecione o interior do tanque e troque o filtro de combustível preventivamente. Partículas de ferrugem entopem os carburadores rapidamente.',
  },
  {
    severity: 'WARN',
    title: 'Disponibilidade de peças elétricas originais (CDI, bobinas, chicote) — item mais crítico de escassez; falhas elétricas podem imobilizar a moto por semanas até achar peça',
    body: 'Componentes eletrônicos originais desta era (CDI, bobinas de ignição, conectores) não são mais fabricados e a disponibilidade de estoque novo é praticamente zero. Ao notar qualquer sintoma elétrico intermitente (falha de ignição, luzes oscilando), providencie o diagnóstico o quanto antes — encontrar peça de reposição pode levar semanas via importação ou comunidades de owners.',
  },
]

const XTZ750S_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção XTZ750 Super Ténéré por km/idade — motor 749cc DOHC 5V carburado, moto de 30+ anos',
    body: 'Óleo 10W-40 MA2: a cada 3.000 km OU a cada 6 meses, o que ocorrer primeiro (moto de uso esporádico acumula degradação do óleo por tempo, não só por km). Sincronismo dos carburadores Mikuni: a cada 6.000 km ou sempre que notar marcha lenta instável — só com manômetro de vácuo de 2 vias, mecânico especializado em Yamaha clássica. Corrente: lubrificação antes de cada saída (moto de uso esporádico enferruja entre usos) e antes de guardar por período longo. Anualmente, independente de km: inspeção COMPLETA de toda a borracharia (mangueiras, diafragmas, retentores, coifas elétricas) — o fator idade supera o fator quilometragem nesta moto. A cada 2-3 anos: tratamento interno do tanque de aço contra corrosão + troca do filtro de combustível. Antes de qualquer viagem longa: revisão geral por mecânico especializado em motos clássicas Yamaha, dada a raridade e o custo de ficar parado no meio do caminho por falta de peça.',
  },
]

// ─── TDM 850 (importada, Brasil ~1996-2001) ──────────────────────────────────
// Motor 849cc paralelo-gêmeo DOHC 5V líquido-refrigerado, virabrequim a 270°
// ("big bang"), carburadores Mikuni, corrente — moto touring esportiva
// (naked/sport-touring) sem relação de plataforma com os monocilíndricos
// pequenos "TDM 225" (mesma marca, motor e proposta completamente diferentes).

const TDM850_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 849cc paralelo-gêmeo DOHC 5V líquido-refrigerado, virabrequim a 270° — entrega de torque suave e "grave", carburadores Mikuni exigem sincronismo regular',
    body: 'A TDM850 foi pioneira ao trazer o conceito de paralelo-gêmeo com virabrequim a 270° ("big bang") para entregar torque mais suave e sonoridade mais grave, similar a um V-twin. Dois carburadores Mikuni precisam de sincronismo (manômetro de vácuo) a cada 6.000-8.000 km para marcha lenta suave. Óleo 10W-40 MA2, troca a cada 4.000-5.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Regulador retificador — falha documentada em várias Yamaha de paralelo-gêmeo dos anos 90; verificar tensão de carga a cada revisão',
    body: 'Assim como outros modelos Yamaha da década de 90 com sistemas de carga similares, o regulador retificador da TDM850 é um ponto de atenção conhecido — falha silenciosa até a bateria descarregar de vez. Verificar tensão em marcha lenta (13,5-14,8 V) a cada revisão evita ficar na mão.',
  },
  {
    severity: 'OK',
    title: 'Moto de nicho no Brasil (importada em pequeno volume) — peças de motor mais fáceis via importação/mercado internacional que peças de ciclística/carenagem',
    body: 'A TDM850 teve volume pequeno de importação no Brasil, então hoje é moto de nicho entre entusiastas de motos clássicas Yamaha. Peças de motor (compartilhadas em parte com outras plataformas europeias da época) são relativamente acessíveis via importação; peças específicas de carenagem e plástico já são mais raras.',
  },
]

const TDM850_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sincronismo dos carburadores se perdendo com o tempo — marcha lenta instável e vibração são os sintomas mais reportados',
    body: 'Assim como qualquer moto de carburação dupla desta era, a TDM850 perde sincronismo com o uso e o tempo. Sintoma: marcha lenta instável, vibração acima do normal em certas faixas de rotação. Resolução: sincronismo com manômetro de vácuo por mecânico especializado em multi-cilindros Yamaha.',
  },
  {
    severity: 'WARN',
    title: 'Regulador retificador e chicote elétrico envelhecido — conectores oxidados após 25+ anos causam falhas intermitentes difíceis de diagnosticar',
    body: 'Moto com mais de duas décadas: conectores elétricos oxidados, fiação ressecada e o regulador retificador original são os pontos mais prováveis de causar falhas intermitentes (moto que "morre" sem explicação, luzes piscando). Inspeção e limpeza de conectores é low-cost e resolve boa parte dos casos antes de trocar peças caras.',
  },
]

const TDM850_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção TDM850 por km/idade — motor 849cc DOHC 5V carburado, moto de nicho de 25+ anos',
    body: 'Óleo 10W-40 MA2: a cada 4.000-5.000 km ou 6 meses. Sincronismo dos carburadores Mikuni: a cada 6.000-8.000 km ou ao notar marcha lenta instável. Vela: a cada 8.000-10.000 km (confirme código NGK no manual do ano). Regulagem de válvulas (5 válvulas por cilindro, DOHC): a cada 12.000-15.000 km, motor frio, só mecânico especializado. Corrente: lubrificação a cada 500 km, kit relação completo a cada 18.000-20.000 km. Verificação da tensão do regulador retificador: a cada revisão (13,5-14,8 V em marcha lenta). Anualmente: inspeção de conectores elétricos e borracharia por idade, não só por km.',
  },
]

// ─── TDM 900 (importada, Brasil ~2002-2011) ──────────────────────────────────
// Sucessora da TDM850: motor 897cc paralelo-gêmeo DOHC 5V líquido-refrigerado,
// agora com INJEÇÃO ELETRÔNICA (substitui os carburadores), corrente.
// Anos finais de produção tiveram opção de ABS.

const TDM900_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 897cc DOHC 5V líquido-refrigerado — agora com injeção eletrônica no lugar dos carburadores da TDM850; óleo 10W-40 MA2, troca a cada 6.000 km',
    body: 'A TDM900 evolui a fórmula da TDM850 com cilindrada maior (897cc) e, principalmente, injeção eletrônica no lugar dos carburadores Mikuni — partida mais fácil a frio, sem necessidade de sincronismo manual de carburadores. Óleo JASO MA2 10W-40, troca a cada 6.000 km. Vela: confirme código NGK específico do ano no manual (houve revisão de especificação ao longo da produção).',
  },
  {
    severity: 'OK',
    title: 'Injeção eletrônica — TPS e válvula de ar de marcha lenta (IACV) são os pontos de atenção eletrônica; sujeira acumulada causa marcha lenta oscilante com o tempo',
    body: 'Sem carburador para sincronizar, o ponto de atenção eletrônica desta geração é a válvula de controle de ar de marcha lenta (IACV) e o TPS, que acumulam sujeira/carbono com o tempo e podem causar marcha lenta oscilante ou engasgo em baixa rotação. Limpeza da IACV a cada 20.000-24.000 km previne o sintoma antes que apareça.',
  },
  {
    severity: 'OK',
    title: 'Anos finais de produção com opção de ABS — verificar se a unidade específica tem o sistema antes de assumir presença/ausência na manutenção',
    body: 'Nos últimos anos de produção, a TDM900 passou a oferecer ABS como opção. Ao comprar ou dar manutenção numa unidade específica, confirme se ela tem o sistema (afeta o tipo de sensor de roda e o fluido/linhas de freio a considerar na revisão).',
  },
]

const TDM900_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Regulador retificador — mesma vulnerabilidade documentada em várias Yamaha bi-cilíndricas desta era; verificar tensão de carga regularmente',
    body: 'Assim como a TDM850 e outras Yamaha de paralelo-gêmeo do período, o regulador retificador da TDM900 é ponto de atenção conhecido. Verificação de tensão em marcha lenta a cada revisão evita surpresa de bateria descarregada sem explicação aparente.',
  },
  {
    severity: 'WARN',
    title: 'IACV/TPS sujos causando marcha lenta oscilante após alguns anos sem limpeza — sintoma confundido com problema mais grave de injeção',
    body: 'Marcha lenta oscilante ou engasgo em baixa rotação, sem código de falha grave no scanner, geralmente indica IACV ou TPS sujos de carbono — limpeza resolve a maior parte dos casos sem necessidade de troca de peça. Evite trocar sensores por suspeita antes de fazer a limpeza básica primeiro.',
  },
]

const TDM900_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção TDM900 por km — motor 897cc DOHC 5V injetado',
    body: 'Revisão 1.000 km (garantia, unidades novas na época): óleo grátis + aperto geral. 6.000 km: óleo 10W-40 MA2. 12.000 km: óleo + vela + filtro de ar (inspeção/troca) + regulagem de válvulas. 18.000 km: óleo + kit relação (corrente + coroa + pinhão) se desgastado. 24.000 km: óleo + válvulas + limpeza da IACV e TPS. A cada 500 km: lubrificação da corrente. A cada revisão: verificação da tensão do regulador retificador (13,5-14,8 V em marcha lenta). A cada 24 meses: fluido de freio DOT 4 (mais crítico nas versões com ABS) e líquido de arrefecimento.',
  },
]

// ─── TRX 850 (importada, rara, Brasil ~1996-1999) ────────────────────────────
// Motor essencialmente derivado da TDM850 (849cc paralelo-gêmeo DOHC 5V
// líquido-refrigerado, carburadores Mikuni), mas com afinação mais esportiva
// (rotação mais alta) e postura naked/street mais agressiva que a TDM850
// touring. Moto rara no Brasil — poucas unidades foram importadas.

const TRX850_MACETES: TipInput[] = [
  ...TDM850_MACETES,
  {
    severity: 'OK',
    title: 'Afinação mais esportiva que a TDM850 — mesmo bloco de motor, mas mapa/carburação calibrados para entrega em rotação mais alta; postura naked mais agressiva',
    body: 'A TRX850 compartilha a base mecânica da TDM850 (849cc, DOHC 5V, carburadores Mikuni duplos, virabrequim 270°), mas com afinação voltada para uso mais esportivo — entrega de potência em rotações mais altas e postura de pilotagem mais agressiva (guidão mais baixo, banco mais firme). Peças de motor: intercambiáveis com a TDM850 na maior parte dos componentes internos.',
  },
  {
    severity: 'WARN',
    title: 'Moto raríssima no Brasil — volume de importação foi pequeno; peças de ciclística/carenagem específicas praticamente inexistentes no mercado nacional',
    body: 'A TRX850 foi importada em quantidade ainda menor que a TDM850 no Brasil, tornando-a uma das motos mais raras desta família hoje. Peças de motor (compartilhadas com a TDM850) são a parte mais viável de resolver via mercado nacional ou importação; peças específicas de carenagem, tanque e banco praticamente não existem no mercado nacional — comunidades internacionais de owners (a moto teve mais volume relativo na Europa/Japão) são o recurso mais realista.',
  },
]

const TRX850_PROBLEMAS: TipInput[] = [
  ...TDM850_PROBLEMAS,
  {
    severity: 'WARN',
    title: 'Escassez extrema de peças específicas — moto rara mesmo dentro do universo já pequeno de importadas Yamaha dos anos 90 no Brasil',
    body: 'Por ter sido importada em volume ainda menor que a TDM850, a TRX850 sofre de escassez de peças específicas de ciclística mais acentuada que qualquer outro modelo desta lista. Antes de comprar uma unidade, avalie a disponibilidade real de peças de reposição (mesmo internacionalmente) para o tipo de uso planejado.',
  },
]

const TRX850_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção TRX850 por km/idade — motor idêntico à TDM850 (base), ciclística naked esportiva',
    body: 'Segue o mesmo cronograma de motor da TDM850: óleo a cada 4.000-5.000 km, sincronismo de carburadores a cada 6.000-8.000 km, válvulas a cada 12.000-15.000 km. Por ser moto raríssima no Brasil, priorize também: inspeção anual de toda a borracharia por idade (mangueiras, diafragmas, retentores), verificação de conectores elétricos oxidados, e planejamento antecipado de peças de ciclística (encomendar com antecedência via importação/comunidades internacionais antes que sejam necessárias com urgência).',
  },
]

// ─── TDM 225 (Brasil, ~2002-2006) ────────────────────────────────────────────
// ATENÇÃO: apesar do nome "TDM" compartilhado com a TDM850/900, a TDM225 NÃO
// tem NENHUMA relação de motor com os paralelo-gêmeos europeus — é um
// monocilíndrico pequeno de ~223-250cc, refrigerado a ar, fabricado no Brasil,
// com estilo visual inspirado na TDM grande (carenagem/bico), mas plataforma
// mecânica derivada da família de monocilíndricos pequenos Yamaha da época
// (mesma linhagem da XT225/XTZ250 predecessora). Confirme especificações
// exatas de óleo/torque no manual do ano específico — dados de motor desta
// moto de nicho têm menos documentação disponível que os modelos de maior
// volume desta mesma época.

const TDM225_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'ATENÇÃO: "TDM 225" NÃO tem relação de motor com a TDM850/900 — apesar do nome compartilhado, é um monocilíndrico pequeno com plataforma totalmente diferente',
    body: 'É um erro comum (inclusive em anúncios de venda) achar que a TDM225 é "uma TDM850 menor". Na verdade, o nome foi usado pela Yamaha do Brasil para uma moto de entrada com estilo visual inspirado na TDM grande (carenagem frontal, bico), mas a mecânica é de um monocilíndrico pequeno (~223-250cc, refrigerado a ar), da mesma linhagem de motores simples usados em outras Yamaha pequenas brasileiras da época. Não compre peças de motor pensando na TDM850/900 — não são compatíveis.',
  },
  {
    severity: 'OK',
    title: 'Motor monocilíndrico pequeno, refrigerado a ar, carburador — manutenção simples e barata, típica de moto de entrada Yamaha do início dos anos 2000',
    body: 'Óleo 10W-40 (verifique especificação JASO exata no manual do ano — a documentação desta moto de nicho é mais escassa que a de modelos de maior volume da época). Troca a cada 3.000 km em uso urbano. Vela e filtro de ar: seguir padrão de monocilíndricos pequenos Yamaha do período (inspeção a cada 3.000-4.000 km). Corrente: lubrificação a cada 400-500 km.',
  },
  {
    severity: 'WARN',
    title: 'Carburador — mesmo cuidado com etanol parado que qualquer moto carburada da época; esvaziar antes de guardar por período longo',
    body: 'Como toda moto carburada de sua geração, a TDM225 sofre com etanol parado no carburador por semanas — verniz resinoso entope as passagens internas. Ao guardar por mais de 2 semanas, esgote o carburador. Limpeza preventiva anual em unidades hoje com 20+ anos é recomendável.',
  },
  {
    severity: 'WARN',
    title: 'Moto de nicho pouco documentada e peças escassas — volume de vendas foi menor que o das linhas YBR/Factor/Fazer da mesma época',
    body: 'A TDM225 teve volume de vendas bem menor que os campeões de venda Yamaha da época (YBR125, Fazer 150). Isso significa menos documentação técnica disponível publicamente e peças mais escassas hoje, quase 20 anos depois. Ao comprar peças, tenha em mãos o manual do proprietário do ano específico da sua unidade para confirmar códigos exatos antes de encomendar.',
  },
]

const TDM225_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Peças escassas por ser moto de nicho/baixo volume — desmanches e grupos de owners são a fonte mais realista para peças de ciclística e elétrica',
    body: 'Por ter vendido muito menos que os modelos populares da mesma época, a TDM225 tem hoje disponibilidade de peças mais limitada — especialmente carenagem (o bico estilo TDM é uma peça exclusiva desta moto) e itens elétricos. Grupos de owners e desmanches especializados em Yamaha são a fonte mais realista quando a peça não está mais em linha de produção.',
  },
  {
    severity: 'WARN',
    title: 'Carburador entupindo em moto parada — mesmo padrão de qualquer moto carburada de duas décadas atrás; comum em unidades de uso esporádico hoje',
    body: 'Unidades de TDM225 remanescentes hoje têm cerca de 20 anos e frequentemente são usadas esporadicamente. O carburador entope com etanol degradado nesses períodos parado — sintoma clássico de "moto não pega" ou "morre na marcha lenta" após semanas guardada.',
  },
]

const TDM225_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção TDM225 por km — motor monocilíndrico pequeno carburado, refrigeração a ar',
    body: 'Óleo 10W-40: a cada 3.000 km ou 6 meses (confirme especificação JASO exata no manual do ano específico da unidade). Filtro de ar: inspeção a cada 3.000 km, troca conforme sujeira. Vela: inspeção/troca a cada 4.000-5.000 km. Regulagem de válvulas: a cada 6.000-8.000 km, motor frio (padrão de monocilíndricos pequenos Yamaha da época). Corrente: lubrificação a cada 400-500 km, kit relação completo quando desgastado. Carburador: esgotar antes de guardar por mais de 2 semanas; limpeza preventiva anual em unidades hoje com 15-20+ anos. Como é moto de nicho com pouca documentação pública, sempre confirme especificações exatas (torques, folgas, capacidades) no manual do proprietário do ano específico antes de qualquer serviço mais invasivo.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'XT 1200 Z',
    yearFrom: 2014, yearTo: 2020,
    tireSize: '110/80R19 (F) · 150/70R17 (R)',
    frontPsi: 36, rearPsi: 42, frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Rodas raiadas com câmara, tubeless-ready conforme versão. Off-road leve: 25-28 PSI F / 28-30 PSI R. DX/60th Anniversary: mesma calibragem, suspensão eletrônica não altera pressão recomendada.',
  },
  {
    modelName: 'XT 600 E',
    yearFrom: 1991, yearTo: 2004,
    tireSize: '90/90-21 (F) · 110/90-18 (R)',
    frontPsi: 26, rearPsi: 29, frontPsiLoad: 28, rearPsiLoad: 32,
    notes: 'Confirme medida exata no manual do ano — houve pequenas variações ao longo da produção. Off-road: reduzir 3-5 PSI conforme terreno.',
  },
  {
    modelName: 'XT 600 Z TENERE',
    yearFrom: 1988, yearTo: 1994,
    tireSize: '90/90-21 (F) · 130/80-17 (R)',
    frontPsi: 26, rearPsi: 30, frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Roda raiada 21" dianteira — verificar tensão dos raios antes de ajustar pressão para trilha. Tanque cheio (~26 L) muda a distribuição de peso — considerar ao calibrar para carga.',
  },
  {
    modelName: 'XT 660 R',
    yearFrom: 2007, yearTo: 2013,
    tireSize: '90/90-21 (F) · 130/80-17 (R)',
    frontPsi: 26, rearPsi: 29, frontPsiLoad: 28, rearPsiLoad: 32,
    notes: 'Versão de estrada/urbana da família 660 (sem o tanque grande da Z). Com garupa/carga: aumentar conforme tabela do manual.',
  },
  {
    modelName: 'XT 660Z',
    yearFrom: 2008, yearTo: 2013,
    tireSize: '90/90-21 (F) · 150/70-17 (R)',
    frontPsi: 27, rearPsi: 30, frontPsiLoad: 29, rearPsiLoad: 33,
    notes: 'Roda raiada 21" com câmara. Off-road: 20-23 PSI F / 24-26 PSI R. Verificar tensão dos raios antes de trilha pesada.',
  },
  {
    modelName: 'XTZ 700',
    yearFrom: 2021, yearTo: null,
    tireSize: '90/90-21 (F) · 150/70-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Rodas 21"/18" com câmara (não tubeless). Off-road: 20-23 PSI F / 24-26 PSI R conforme peso e terreno.',
  },
  {
    modelName: 'XTZ 750 S TENERE',
    yearFrom: 1989, yearTo: 1995,
    tireSize: '90/90-21 (F) · 130/80-17 (R)',
    frontPsi: 26, rearPsi: 30, frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Moto de coleção — confirme medida exata gravada no pneu original antes de comprar reposição, pode ter variado ao longo da produção 1989-1995.',
  },
  {
    modelName: 'TDM 850',
    yearFrom: 1996, yearTo: 2001,
    tireSize: '110/80-18 (F) · 160/60-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 31, rearPsiLoad: 36,
    notes: 'Rodas de liga, pneus street/sport-touring. Confirme medida exata no manual do ano — pode ter variado entre mercados de importação.',
  },
  {
    modelName: 'TDM 900',
    yearFrom: 2002, yearTo: 2011,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 31, rearPsiLoad: 36,
    notes: 'Rodas de liga aro 17" (atualização em relação à TDM850). Versões com ABS: mesma calibragem.',
  },
  {
    modelName: 'TRX 850',
    yearFrom: 1996, yearTo: 1999,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 31, rearPsiLoad: 36,
    notes: 'Moto raríssima no Brasil — confirme medida exata gravada no pneu original antes de comprar reposição.',
  },
  {
    modelName: 'TDM 225',
    yearFrom: 2002, yearTo: 2006,
    tireSize: '80/100-21 (F) · 100/90-18 (R)',
    frontPsi: 26, rearPsi: 29, frontPsiLoad: 28, rearPsiLoad: 32,
    notes: 'Moto de nicho pouco documentada — confirme medida exata no manual do ano específico antes de comprar reposição.',
  },
]

// ─── Manutenção — geradores de MaintenanceItem ────────────────────────────────

const makeSuperTenere = (m: string, yf: number, yt: number | null): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40/10W-50 MA2 com filtro (~4,7 L)', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme capacidade exata no manual do ano. 10W-50 em clima quente/uso constante.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (DOHC, shim under bucket)', intervalKm: 20000, intervalMonths: 24, notes: 'Só oficina especializada — shim under bucket exige ferramental específico.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela (referência conforme manual do ano)', intervalKm: 20000, intervalMonths: 24, notes: 'Motor DOHC 4V — confirme código exato no manual.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 525 — lubrificação e ajuste de folga (35-40 mm)', intervalKm: 600, intervalMonths: null, notes: 'NÃO tem cardã — erro comum de quem vem de outra marca é negligenciar isso.', priority: 'CRITICAL', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit relação 525 completo (coroa + pinhão + corrente)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar sempre os três juntos.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Verificação da tensão do regulador retificador', intervalKm: null, intervalMonths: 12, notes: '13,5-14,8 V em marcha lenta com farol ligado. Moto com muita carga elétrica de fábrica.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido de freio DOT 4 e líquido de arrefecimento', intervalKm: null, intervalMonths: 24, notes: 'Trocar juntos a cada 2 anos.', priority: 'MEDIUM', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas de freio — inspeção', intervalKm: 10000, intervalMonths: null, notes: 'Moto pesada (~261 kg) — desgaste mais rápido que motos leves.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Suspensão eletrônica Öhlins (versão DX) — inspeção de atuadores', intervalKm: 15000, intervalMonths: 12, notes: 'Nunca lavar com jato de alta pressão direto nos atuadores. Reparo caro fora da rede autorizada.', priority: 'MEDIUM', order: 9 },
]

const makeXT600 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 MA2 (~2,6-2,8 L, confirme no manual)', intervalKm: 3000, intervalMonths: 6, notes: 'Refrigeração mista ar/óleo — nível e qualidade do óleo são críticos.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 6000, intervalMonths: 12, notes: 'Mais frequente em uso off-road.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK (família DR8ES — confirme código no manual do ano)', intervalKm: 6000, intervalMonths: 12, notes: 'Verificar gap conforme especificação do ano.', priority: 'MEDIUM', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas', intervalKm: 12000, intervalMonths: 18, notes: 'Motor frio. Confirme folgas exatas no manual.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza preventiva do carburador Mikuni', intervalKm: 12000, intervalMonths: 12, notes: 'OBRIGATÓRIO ao guardar >2 semanas com etanol. Esvaziar antes de guardar.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 530 — lubrificação e folga (20-30 mm)', intervalKm: 400, intervalMonths: null, notes: 'Lubrificar mais em chuva/trilha.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de borracharia (mangueiras, retentores, coifas) por idade', intervalKm: null, intervalMonths: 12, notes: 'Moto com 20+ anos — fator idade supera fator km. Ressecamento causa falha mesmo em moto pouco usada.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Verificação de vazamento de óleo nas juntas do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Comum em unidades com 100.000+ km ou muitos anos — normalmente desgaste de vedação, não falha grave.', priority: 'MEDIUM', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'Moto de uso esporádico descarrega rápido.', priority: 'MEDIUM', order: 9 },
]

const makeXT600Tenere = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  ...makeXT600(m, yf, yt),
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Tensão dos raios da roda 21" — verificação', intervalKm: 5000, intervalMonths: null, notes: 'Raio frouxo empena o aro com o tempo. Verificar antes de trilha pesada.', priority: 'HIGH', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de corrosão interna do tanque de aço (~26 L)', intervalKm: null, intervalMonths: 30, notes: 'Tanque grande + uso esporádico = corrosão mais crítica que em outras motos da família.', priority: 'MEDIUM', order: 11 },
]

const makeXT660 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 MA2 com filtro (~2,8 L)', intervalKm: 6000, intervalMonths: 12, notes: 'Off-road intenso: 5.000 km.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela + regulagem de válvulas (5V)', intervalKm: 12000, intervalMonths: 18, notes: 'Motor frio. Confirme código de vela no manual do ano.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de TPS / marcha lenta (injeção eletrônica)', intervalKm: 12000, intervalMonths: null, notes: 'Marcha lenta oscilante sem causa aparente: verificar TPS primeiro.', priority: 'MEDIUM', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 520 — lubrificação e folga', intervalKm: 550, intervalMonths: null, notes: 'Mais frequente em chuva/trilha.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit relação 520 completo', intervalKm: 18000, intervalMonths: null, notes: 'Coroa + pinhão + corrente juntos.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Líquido de arrefecimento — nível e troca', intervalKm: 24000, intervalMonths: 24, notes: 'Verificar relé/sensor da ventoinha antes do verão.', priority: 'MEDIUM', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Rolamento de roda-livre da partida (starter clutch) — atenção a ruído', intervalKm: null, intervalMonths: null, notes: 'Ruído metálico na partida: procurar mecânico especializado antes de avançar o desgaste. Ponto de falha mais documentado desta moto.', priority: 'HIGH', order: 7 },
]

const makeXT660Tenere = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  ...makeXT660(m, yf, yt),
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Skid plate (protetor de motor) — instalação preventiva', intervalKm: null, intervalMonths: null, notes: 'NÃO vem de fábrica. Instalar antes do primeiro uso off-road pesado.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Tensão dos raios da roda 21"', intervalKm: 5000, intervalMonths: null, notes: 'Mais frequente antes de viagens longas fora do asfalto.', priority: 'MEDIUM', order: 9 },
]

const makeXTZ700 = (m: string, yf: number, yt: number | null): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40/10W-50 MA2 com filtro (~3,0-3,4 L)', intervalKm: 6000, intervalMonths: 12, notes: 'Off-road intenso: 5.000 km. Confirme capacidade exata no manual.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (motor CP2 DOHC)', intervalKm: 12000, intervalMonths: 18, notes: 'Motor frio. Mesmo bloco da MT-07.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela iridium', intervalKm: 24000, intervalMonths: 24, notes: 'Confirme código exato no manual — calibração de mapa própria da Ténéré 700.', priority: 'MEDIUM', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 525 — lubrificação e folga', intervalKm: 550, intervalMonths: null, notes: 'Moto pesada e de torque considerável — negligência acelera desgaste.', priority: 'CRITICAL', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit relação 525 completo', intervalKm: 20000, intervalMonths: null, notes: 'Antecipar para 16.000-18.000 km em uso off-road intenso.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Suspensão KYB convencional — inspeção de retentores', intervalKm: 18000, intervalMonths: null, notes: 'Mais cedo em uso off-road pesado. Sem eletrônica — mais simples de reparar que a Super Ténéré.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido de freio DOT 4 e líquido de arrefecimento', intervalKm: null, intervalMonths: 24, notes: 'Trocar juntos.', priority: 'MEDIUM', order: 7 },
]

const makeXTZ750S = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 MA2 (confirme capacidade no manual)', intervalKm: 3000, intervalMonths: 6, notes: 'Moto de uso esporádico — óleo degrada por tempo, não só por km.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sincronismo dos carburadores Mikuni duplos', intervalKm: 6000, intervalMonths: null, notes: 'Manômetro de vácuo de 2 vias. Só mecânico especializado em Yamaha clássica.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente — lubrificação antes de cada saída e antes de guardar', intervalKm: null, intervalMonths: null, notes: 'Moto de coleção enferruja entre usos se não lubrificada.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção COMPLETA de borracharia (mangueiras, diafragmas, retentores, coifas)', intervalKm: null, intervalMonths: 12, notes: 'Moto de 30+ anos — fator idade supera fator km, mesmo em unidade preservada.', priority: 'CRITICAL', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Tratamento interno do tanque de aço + filtro de combustível', intervalKm: null, intervalMonths: 30, notes: 'Corrosão interna é o problema mais citado nesta moto de coleção.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Revisão geral por especialista antes de viagem longa', intervalKm: null, intervalMonths: 12, notes: 'Moto rara — ficar parado por falta de peça é o maior risco.', priority: 'MEDIUM', order: 6 },
]

const makeTDM85x = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 MA2', intervalKm: 4500, intervalMonths: 6, notes: 'Confirme capacidade exata no manual do ano.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sincronismo dos carburadores Mikuni', intervalKm: 7000, intervalMonths: null, notes: 'Manômetro de vácuo. Marcha lenta instável = sinal de desregulagem.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela (confirme código NGK no manual do ano)', intervalKm: 9000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (DOHC 5V)', intervalKm: 13000, intervalMonths: 18, notes: 'Motor frio. Só mecânico especializado.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente — lubrificação e kit relação completo', intervalKm: 500, intervalMonths: null, notes: 'Kit completo a cada 18.000-20.000 km.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Verificação da tensão do regulador retificador', intervalKm: null, intervalMonths: 12, notes: 'Falha documentada em Yamaha bi-cilíndricas dos anos 90.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de conectores elétricos e borracharia por idade', intervalKm: null, intervalMonths: 12, notes: 'Moto com 25+ anos — conectores oxidados causam falhas intermitentes.', priority: 'MEDIUM', order: 7 },
]

const makeTDM900 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 MA2', intervalKm: 6000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela + filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Confirme código NGK no manual do ano.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (DOHC 5V)', intervalKm: 12000, intervalMonths: 18, notes: 'Motor frio.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza de IACV e TPS (injeção eletrônica)', intervalKm: 24000, intervalMonths: null, notes: 'Previne marcha lenta oscilante antes que apareça.', priority: 'MEDIUM', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente — lubrificação e kit relação completo', intervalKm: 500, intervalMonths: null, notes: 'Kit completo a cada 18.000 km.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Verificação da tensão do regulador retificador', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido de freio DOT 4 (mais crítico em versões com ABS) + líquido de arrefecimento', intervalKm: null, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 7 },
]

const makeTRX850 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  ...makeTDM85x(m, yf, yt),
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Planejamento antecipado de peças de ciclística (importação/comunidades internacionais)', intervalKm: null, intervalMonths: null, notes: 'Moto raríssima no Brasil — encomendar peças de reposição com antecedência antes que sejam necessárias com urgência.', priority: 'MEDIUM', order: 8 },
]

const makeTDM225 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 (confirme JASO exato no manual do ano)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor monocilíndrico pequeno, refrigerado a ar — NÃO relacionado à TDM850/900.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção', intervalKm: 3000, intervalMonths: null, notes: null, priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela — inspeção/troca', intervalKm: 4500, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas', intervalKm: 7000, intervalMonths: 12, notes: 'Motor frio. Padrão de monocilíndricos pequenos Yamaha da época.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza preventiva do carburador', intervalKm: null, intervalMonths: 12, notes: 'Esgotar antes de guardar por mais de 2 semanas.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente — lubrificação e kit relação', intervalKm: 450, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'XT 1200 Z',        yearFrom: 2014, yearTo: 2020, MACETES: XT1200Z_MACETES,        PROBLEMAS: XT1200Z_PROBLEMAS,        MANUTENCAO: XT1200Z_MANUTENCAO        },
  { modelName: 'XT 600 E',         yearFrom: 1991, yearTo: 2004, MACETES: XT600E_MACETES,          PROBLEMAS: XT600E_PROBLEMAS,          MANUTENCAO: XT600E_MANUTENCAO          },
  { modelName: 'XT 600 Z TENERE',  yearFrom: 1988, yearTo: 1994, MACETES: XT600Z_TENERE_MACETES,   PROBLEMAS: XT600Z_TENERE_PROBLEMAS,   MANUTENCAO: XT600Z_TENERE_MANUTENCAO  },
  { modelName: 'XT 660 R',         yearFrom: 2007, yearTo: 2013, MACETES: XT660R_MACETES,          PROBLEMAS: XT660R_PROBLEMAS,          MANUTENCAO: XT660R_MANUTENCAO          },
  { modelName: 'XT 660Z',          yearFrom: 2008, yearTo: 2013, MACETES: XT660Z_TENERE_MACETES,   PROBLEMAS: XT660Z_TENERE_PROBLEMAS,   MANUTENCAO: XT660Z_TENERE_MANUTENCAO  },
  { modelName: 'XTZ 700',          yearFrom: 2021, yearTo: null, MACETES: XTZ700_MACETES,          PROBLEMAS: XTZ700_PROBLEMAS,          MANUTENCAO: XTZ700_MANUTENCAO          },
  { modelName: 'XTZ 750 S TENERE', yearFrom: 1989, yearTo: 1995, MACETES: XTZ750S_MACETES,         PROBLEMAS: XTZ750S_PROBLEMAS,         MANUTENCAO: XTZ750S_MANUTENCAO        },
  { modelName: 'TDM 850',          yearFrom: 1996, yearTo: 2001, MACETES: TDM850_MACETES,          PROBLEMAS: TDM850_PROBLEMAS,          MANUTENCAO: TDM850_MANUTENCAO          },
  { modelName: 'TDM 900',          yearFrom: 2002, yearTo: 2011, MACETES: TDM900_MACETES,          PROBLEMAS: TDM900_PROBLEMAS,          MANUTENCAO: TDM900_MANUTENCAO          },
  { modelName: 'TRX 850',          yearFrom: 1996, yearTo: 1999, MACETES: TRX850_MACETES,          PROBLEMAS: TRX850_PROBLEMAS,          MANUTENCAO: TRX850_MANUTENCAO          },
  { modelName: 'TDM 225',          yearFrom: 2002, yearTo: 2006, MACETES: TDM225_MACETES,          PROBLEMAS: TDM225_PROBLEMAS,          MANUTENCAO: TDM225_MANUTENCAO          },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeSuperTenere('XT 1200 Z', 2014, 2020),
  ...makeXT600('XT 600 E', 1991, 2004),
  ...makeXT600Tenere('XT 600 Z TENERE', 1988, 1994),
  ...makeXT660('XT 660 R', 2007, 2013),
  ...makeXT660Tenere('XT 660Z', 2008, 2013),
  ...makeXTZ700('XTZ 700', 2021, null),
  ...makeXTZ750S('XTZ 750 S TENERE', 1989, 1995),
  ...makeTDM85x('TDM 850', 1996, 2001),
  ...makeTDM900('TDM 900', 2002, 2011),
  ...makeTRX850('TRX 850', 1996, 1999),
  ...makeTDM225('TDM 225', 2002, 2006),
]

// ─── Runner ───────────────────────────────────────────────────────────────────

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Yamaha', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Yamaha', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Yamaha', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map(t => ({ ...t, category: 'MACETES' as Cat })),
      ...block.PROBLEMAS.map(t => ({ ...t, category: 'PROBLEMAS' as Cat })),
      ...block.MANUTENCAO.map(t => ({ ...t, category: 'MANUTENCAO' as Cat })),
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
    await prisma.tirePressure.create({ data: tp })
    console.log(`🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map(b => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: ALL_MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${ALL_MANUTENCAO.length} itens`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
