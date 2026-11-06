// seed-sundown-mopeds.ts — Sundown Akros 50/90, Ergon 50, Fifty 50, Super Fifty 50, Palio 50, PGO Speed 50/90
// Linha de motocicletas/scooters de pequena cilindrada da Sundown (Manaus), produzidas entre ~1996-2006.
// Duas famílias mecânicas distintas dentro da linha:
//   1) Akros 50/90 e Ergon 50: motor 4 tempos a ar, câmbio rotativo tipo "cub" (estilo Honda Biz/C100),
//      sem embreagem manual — o piloto troca marcha só com o pedal, a embreagem centrífuga faz o resto.
//   2) Fifty 50, Super Fifty 50 e Palio 50: motor 2 tempos a ar, transmissão automática CVT por correia,
//      com sistema de mistura automática de óleo 2T (bomba dosadora — não precisa misturar óleo na gasolina).
//   3) PGO Speed 50/90: scooters de design licenciado da taiwanesa PGO (Motive Power Industry) — a versão
//      50cc manteve o 2 tempos da família Fifty/Palio, a 90cc migrou para 4 tempos (mesma lógica do Akros 90).
// Nota: peças originais Sundown estão em falta desde o encerramento da linha de pequena cilindrada em meados
// dos anos 2000. Motores desta classe (cub 4T de 50-90cc e 2T de 50cc) têm enorme compatibilidade de peças
// com outras marcas chinesas/taiwanesas da época (Shineray, Traxx, Jincheng, Kasinski Way/Mobilete) — isso é
// citado nos macetes porque é o principal caminho prático para reposição de peças hoje em dia.
// Execute: pnpm --filter @motormacete/database db:seed:sundown-mopeds
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

// ─── AKROS 50cc ────────────────────────────────────────────────────────────────
// Motor: 49cc monocilíndrico 4 tempos a ar | ~3,8 cv @ 7.500 rpm (estimado a partir da Akros 90cc, ~7cv)
// Câmbio rotativo 4 marchas sem embreagem manual (estilo cub, como Honda Biz/C100) | Óleo 20W-50 0,8L
// Vela NGK C7HSA gap 0,6-0,7mm | Pneu 2.50-17 (F) / 2.75-17 (R) | Tanque ~4L | Partida elétrica + pedal

const AKROS50_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 4T 20W-50 API SG/SF — 0,8L; troque a cada 1.500 km',
    body: 'O motor 49cc a ar da Akros 50cc é pequeno e esquenta rápido em uso urbano parado-anda — o volume de óleo (só 0,8L) satura muito mais rápido que em motores maiores. Use mineral 20W-50 API SG/SF (a embreagem centrífuga é banhada a óleo do próprio cárter, então evite óleo com aditivo antifricção de carro). Troca a cada 1.500 km ou 3 meses — mais curto que o padrão de motos maiores por causa do volume reduzido. Marcas: Lubrax Moto 4T 20W-50, Ipiranga MX4 20W-50. Custo: R$ 15–25 por troca.',
  },
  {
    severity: 'OK',
    title: 'Câmbio rotativo de 4 marchas sem embreagem manual — não force o pedal',
    body: 'A Akros 50cc usa câmbio tipo "cub" (igual ao da Honda Biz/C100): 4 marchas trocadas só pelo pedal, sem alavanca de embreagem no guidão — a embreagem centrífuga engata sozinha. Para trocar de marcha suave, alivie levemente o acelerador no instante do "clique" do pedal. Forçar a marcha com o motor em alta rotação desgasta as engrenagens do câmbio prematuramente. Se sentir "falso ponto" (marcha que não engata direito), o problema costuma ser o mecanismo seletor (estrela) desgastado — comum acima de 25.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Carburador pequeno (tipo PZ16) entope fácil com etanol parado — drene se ficar parada',
    body: 'O carburador da Akros 50cc é pequeno e sensível a etanol que oxida/vira verniz quando a moto fica parada por semanas. Sintoma: não pega a frio, morre na marcha lenta, precisa de afogador para funcionar. Se for deixar a moto parada por mais de 1 mês, feche o registro de combustível e dê a partida até o carburador esvaziar, ou drene a cuba pelo parafuso inferior. Limpeza com spray carburador Bardahl ou WD-40 Injetor resolve a maioria dos casos sem precisar desmontar tudo.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA gap 0,6-0,7mm — troca a cada 6.000 km',
    body: 'Vela recomendada: NGK C7HSA (equivalente Denso U22FS-U). Gap: 0,6-0,7mm, calibrador de palheta. Custo: R$ 12–20. Sintoma de vela gasta: partida difícil pela manhã, engasgo leve em aceleração, fumaça branca esporádica no escape. Motor pequeno de baixa cilindrada tende a "afogar" a vela com mais frequência em trajetos curtos — se rodar muito em trechos de 1-2 km, considere trocar a cada 4.000 km.',
  },
  {
    severity: 'OK',
    title: 'Corrente 415 passo pequeno — lubrifique a cada 400 km',
    body: 'A Akros 50cc usa corrente de passo 415 (mais fina que a 428/420 das motos maiores), característica de motores cub pequenos. Por ser mais fina, desgasta mais rápido se ficar sem lubrificação — recomenda-se lubrificar a cada 400 km (mais frequente que o padrão de 500 km de motos maiores). Óleo 80W-90 ou spray de corrente servem bem. Folga correta: 15-20mm no trecho inferior. Kit relação completo (corrente + pinhão + coroa) para motor cub 50cc: R$ 60–120 em lojas de peças para motos populares.',
  },
  {
    severity: 'WARN',
    title: 'Peças Sundown escassas — motor cub 49cc tem compatibilidade com outras marcas populares da época',
    body: 'A linha de pequena cilindrada da Sundown foi descontinuada em meados dos anos 2000 e peças originais com código Sundown praticamente não são mais fabricadas. A boa notícia: o motor cub 49cc a ar da Akros segue a arquitetura genérica difundida em motos populares chinesas da mesma era (Shineray 50, Traxx, e até peças do "Jincheng" usado por outras marcas nacionais extintas). Pistão, anéis, biela e retentores costumam ser encontrados em lojas de peças para "moto 50cc cub" ou "moto 50cc popular" — meça o diâmetro do pistão (tipicamente ~39mm) antes de comprar.',
  },
  {
    severity: 'OK',
    title: 'Rodagem: nos primeiros 500 km não passe de 5.000 rpm',
    body: 'Motor pequeno de baixa cilindrada tem tolerâncias de fabricação relativamente largas — respeitar a rodagem evita desgaste prematuro do cilindro. Nos primeiros 500 km, evite ultrapassar 5.000 rpm e não ande em plena carga (subidas fortes, carona) por trechos longos. Troque o óleo aos 300 km (rodagem) e novamente aos 1.000 km. Aproveite a rodagem para reapertar os parafusos do motor e do escapamento, que tendem a afrouxar com a vibração inicial.',
  },
]

const AKROS50_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e bobina: peças elétricas originais praticamente extintas',
    body: 'O CDI e a bobina de ignição da Akros 50cc, com código de peça Sundown, não têm mais fabricação — a moto está fora de linha há quase 20 anos. Se a moto não pega e não há faísca na vela, o CDI é o suspeito mais comum. Busque CDI genérico para "moto cub 50cc" de 4 ou 5 pinos — muitos modelos compatíveis por pinagem de motos populares chinesas resolvem, mas é essencial testar a pinagem antes de fechar a compra (peça para o vendedor confirmar ou leve a peça velha como referência). Custo: R$ 30–70.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor do eixo de saída do câmbio após uso prolongado',
    body: 'Após muitos anos de uso (tipicamente acima de 15.000-20.000 km acumulados, considerando a idade do veículo), o retentor do eixo de saída do câmbio endurece e começa a vazar óleo pela lateral do motor, perto da coroa. Sintoma: mancha de óleo constante, corrente encharcada de óleo do motor (diferente da lubrificação normal). Retentor genérico de medida equivalente (comum em motos cub pequenas): R$ 8–15. Troca simples, cerca de 1h de mão de obra.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira: retentor da bengala seca e resseca com o tempo parado',
    body: 'Motos com muitos anos de fabricação e uso irregular (parada por longos períodos) costumam ter o retentor da bengala dianteira ressecado, mesmo sem ter rodado muito. Sintoma: óleo escuro escorrendo pelo tubo interno, amortecimento "seco" e duro. Ao trocar, aproveite para trocar também o óleo da bengala (SAE 10W, aproximadamente 60-80mL por tubo em bengalas pequenas de moto 50cc). Retentor genérico: R$ 15–30 o par.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico e conectores oxidados — comum em unidades muito antigas',
    body: 'Dada a idade das unidades da Akros 50cc ainda em circulação, os conectores elétricos originais (de qualidade básica já na época) costumam estar oxidados ou ressecados. Sintomas: lanterna intermitente, buzina fraca ou muda, pisca que não pisca em um dos lados. Limpe os conectores acessíveis com spray de contato elétrico e aplique graxa dielétrica nos terminais para evitar nova oxidação. Fiação rompida por ressecamento da capa também é comum — inspecione visualmente próximo ao motor (calor acelera o ressecamento).',
  },
  {
    severity: 'WARN',
    title: 'Freio a tambor perde eficiência com chuva — reserve distância extra',
    body: 'A Akros 50cc usa freio a tambor nas duas rodas (sem disco). Tambor perde eficiência de frenagem quando molhado — a água entre a lona e o tambor reduz o atrito até secar. Em dias de chuva, acione os freios levemente algumas vezes em trechos seguros para "secar" o sistema e recuperar a frenagem normal. Lonas gastas (abaixo de 2mm) pioram ainda mais esse efeito — inspecione visualmente pela abertura de inspeção no tambor a cada revisão.',
  },
]

const AKROS50_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário completo Akros 50cc: motor cub pequeno pede revisões mais frequentes',
    body: '300 km — Troca de óleo inicial (rodagem). | 1.000 km — Segunda troca de óleo + reaperto geral do motor e escapamento. | 1.500 km — Troca de óleo (20W-50, 0,8L). | 3.000 km — Troca de óleo. Lubrificar corrente 415. | 4.000-6.000 km — Troca da vela NGK C7HSA. | 5.000 km — Limpar filtro de ar. | 6.000 km — Limpeza do carburador (mais cedo se a moto ficou parada). | 10.000 km — Trocar kit relação (corrente + pinhão + coroa) se desgastado. Verificar lonas de freio. | 15.000 km — Inspecionar retentores de bengala e câmbio.',
  },
]

// ─── AKROS 90cc ────────────────────────────────────────────────────────────────
// Motor: 90cc monocilíndrico 4 tempos a ar | ~7 cv @ 7.500 rpm (confirmado em fichas técnicas)
// Mesmo chassi/câmbio da Akros 50cc | Óleo 20W-50 1,0L | Vela NGK C7HSA gap 0,6-0,7mm
// Pneu 2.50-17 (F) / 2.75-17 (R) | Partida elétrica + pedal

const AKROS90_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 4T 20W-50 API SG/SF — 1,0L; troque a cada 2.000 km',
    body: 'O motor 90cc a ar da Akros 90cc compartilha o chassi e o câmbio cub da versão 50cc, mas com cilindrada maior a capacidade de óleo sobe para 1,0L. Use mineral 20W-50 API SG/SF — embreagem centrífuga banhada no óleo do cárter, não use óleo com aditivo antifricção. Intervalo: 2.000 km ou 3 meses (um pouco mais longo que a 50cc por ter mais volume de óleo dissipando calor). Marcas: Lubrax Moto 4T 20W-50, Ipiranga MX4 20W-50. Custo: R$ 18–28.',
  },
  {
    severity: 'OK',
    title: 'Motor com ~7 cv: puxa melhor em subida, mas exige troca de óleo mais disciplinada',
    body: 'A Akros 90cc entrega cerca de 7 cv, quase o dobro da versão 50cc — bom para andar em dupla ou subidas mais fortes. Isso também significa mais estresse térmico no óleo. Se usar a moto com carona frequente ou em relevo montanhoso, reduza o intervalo de troca de óleo para 1.500 km. Não compense a potência extra "esticando" a moto em primeira e segunda marcha por muito tempo — passe de marcha por volta de 6.000-6.500 rpm para preservar o câmbio rotativo.',
  },
  {
    severity: 'WARN',
    title: 'Carburador ligeiramente maior que o da 50cc — mesmo cuidado com etanol parado',
    body: 'O carburador da Akros 90cc tem jato principal maior que o da versão 50cc, mas sofre do mesmo problema de entupimento por etanol degradado quando a moto fica parada. Se notar marcha lenta instável ou dificuldade de pegar a frio após período parado, drene a cuba do carburador antes de insistir na partida (evita afogar e sujar ainda mais a vela). Limpeza completa com spray carburador: R$ 20–40 em oficina, ou faça você mesmo com spray Bardahl/WD-40 Injetor.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA gap 0,6-0,7mm — mesma da versão 50cc, troca a cada 6.000 km',
    body: 'Vela recomendada: NGK C7HSA, gap 0,6-0,7mm, igual à Akros 50cc (motor da mesma família, escalado). Custo: R$ 12–20. Com o motor 90cc trabalhando mais aquecido em média, fique atento a sinais de vela "clara demais" (mistura pobre) ou "encharcada" (mistura rica) — ambos indicam regulagem de carburador fora do ponto e merecem checagem na próxima revisão.',
  },
  {
    severity: 'OK',
    title: 'Corrente 415 — mesma da 50cc, mas com mais carga; lubrifique a cada 400 km',
    body: 'A Akros 90cc usa a mesma corrente de passo 415 da versão 50cc, porém transmitindo mais potência — o desgaste tende a ser um pouco mais rápido. Lubrifique a cada 400 km e fique atento à folga (15-20mm no trecho inferior); corrente esticada demais nesta cilindrada tende a "pular dente" em acelerações mais bruscas. Kit relação completo: R$ 60–120.',
  },
  {
    severity: 'WARN',
    title: 'Peças Sundown escassas — mesma solução de compatibilidade da 50cc, mas confira a cilindrada',
    body: 'Assim como a versão 50cc, a Akros 90cc sofre com a falta de peças originais Sundown. A vantagem: motores cub de 90cc a ar são um padrão comum em motos populares chinesas da época (Shineray 90, entre outras) — pistão (~47-48mm), anéis e biela costumam ter equivalentes no mercado de reposição. Sempre confira a medida exata do pistão riscada na peça antiga antes de comprar substituto — cilindradas próximas (90 vs 100 vs 110cc) usam pistões de diâmetros diferentes.',
  },
]

const AKROS90_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e bobina: mesma escassez de peças elétricas da versão 50cc',
    body: 'O sistema de ignição da Akros 90cc sofre do mesmo problema da 50cc: código de peça Sundown fora de fabricação. Se não há faísca na vela e a moto não pega, teste primeiro a bobina (resistência entre os terminais, comparável a um multímetro) antes de trocar o CDI, pois é mais barata. CDI genérico compatível por pinagem: R$ 30–70. Leve a peça original como referência para o vendedor confirmar a pinagem correta.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo mais perceptível em unidades com muitos anos de uso',
    body: 'Unidades antigas da Akros 90cc com muitos anos de rodagem (mesmo que poucos km, dado o tempo de fabricação) podem apresentar consumo de óleo por ressecamento dos retentores de válvula. Consumo de até 100-150mL a cada 1.000 km é tolerável nesta faixa de idade; acima disso, vale inspecionar os retentores de válvula e o anel raspador do pistão. Fumaça azulada no escape na partida a frio é o sinal mais claro.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor do câmbio — mesmo ponto fraco da 50cc',
    body: 'Como compartilha o desenho do câmbio com a Akros 50cc, o retentor do eixo de saída sofre o mesmo desgaste com o tempo. Mancha de óleo constante perto da coroa e corrente encharcada de óleo do motor (não do spray de lubrificação) são os sinais. Retentor genérico: R$ 8–15, troca de aproximadamente 1h.',
  },
  {
    severity: 'WARN',
    title: 'Vibração maior em alta rotação — motor 90cc monocilíndrico sem contrapeso refinado',
    body: 'O motor monocilíndrico de 90cc vibra visivelmente mais que a versão 50cc acima de 7.000 rpm — não é sinal de defeito, é característica do motor cub sem contrapesos sofisticados. Prefira andar entre 4.000-6.500 rpm para mais conforto. Se a vibração aumentou repentinamente, verifique primeiro os coxins/parafusos de fixação do motor no chassi antes de suspeitar de problema interno.',
  },
  {
    severity: 'WARN',
    title: 'Freio a tambor perde eficiência com chuva — mesmo cuidado da versão 50cc',
    body: 'Freios a tambor nas duas rodas, sem disco. Em dias de chuva, a eficiência cai bastante até "secar" com uso leve dos freios em local seguro. Mantenha distância extra de frenagem. Lonas abaixo de 2mm de espessura pioram esse efeito — inspecione pela janela de verificação no tambor.',
  },
]

const AKROS90_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário completo Akros 90cc: mesma lógica da 50cc, com volumes maiores de óleo',
    body: '300 km — Troca de óleo inicial (rodagem). | 1.000 km — Segunda troca de óleo + reaperto geral. | 2.000 km — Troca de óleo (20W-50, 1,0L). | 4.000 km — Troca de óleo. Lubrificar corrente 415. | 6.000 km — Troca da vela NGK C7HSA. | 6.000 km — Limpar filtro de ar. | 7.000 km — Limpeza do carburador (mais cedo se ficou parada). | 10.000-12.000 km — Trocar kit relação se desgastado. Verificar lonas de freio. | 15.000 km — Inspecionar retentores de bengala e câmbio. Checar consumo de óleo (retentores de válvula).',
  },
]

// ─── ERGON 50cc ────────────────────────────────────────────────────────────────
// Motor: 49cc monocilíndrico 4 tempos a ar — mesma plataforma mecânica da Akros 50cc, bancada/guidão
// diferentes (versão "ergonômica" da linha cub Sundown) | Óleo 20W-50 0,8L | Vela NGK C7HSA
// Pneu 2.50-17 (F) / 2.75-17 (R)

const ERGON50_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesma base mecânica da Akros 50cc — óleo 20W-50, 0,8L, troca a cada 1.500 km',
    body: 'A Ergon 50cc compartilha o motor cub 49cc a ar e o câmbio rotativo de 4 marchas da Akros 50cc — a diferença fica no desenho do banco (mais largo, posição de pilotagem mais ereta) e no guidão, focados em conforto ("ergonomia", daí o nome). Use óleo mineral 20W-50 API SG/SF, 0,8L, trocado a cada 1.500 km ou 3 meses. As peças de motor são intercambiáveis com a Akros 50cc na maioria dos casos — vale muito a pena comparar preços entre as duas ao procurar reposição.',
  },
  {
    severity: 'OK',
    title: 'Banco mais largo e guidão elevado — ajuste os retrovisores para o novo ângulo de braço',
    body: 'A posição de pilotagem da Ergon é mais ereta que a da Akros, com guidão um pouco mais alto. Ao trocar de uma para outra (ou comprar usada), reajuste os retrovisores — o ângulo do braço muda a referência visual. Essa configuração reduz fadiga em trajetos urbanos mais longos, mas também deixa a moto um pouco mais sensível a vento lateral em avenidas — mantenha as duas mãos firmes no guidão em ultrapassagens de ônibus e caminhões.',
  },
  {
    severity: 'WARN',
    title: 'Carburador pequeno entope com etanol parado — mesmo cuidado da Akros',
    body: 'Por usar o mesmo motor cub 49cc da Akros, a Ergon sofre do mesmo problema de carburador pequeno entupindo com etanol degradado após períodos parada. Se a moto ficar mais de 1 mês sem uso, drene a cuba do carburador ou dê partida com o registro de combustível fechado até o carburador esvaziar. Spray de limpeza (Bardahl ou WD-40 Injetor) resolve a maioria dos entupimentos leves.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA gap 0,6-0,7mm — troca a cada 6.000 km',
    body: 'Mesma vela recomendada para toda a família cub 50cc da Sundown: NGK C7HSA, gap 0,6-0,7mm. Custo: R$ 12–20. Fique atento a partida difícil pela manhã e engasgos leves — sinais clássicos de vela no fim da vida útil neste motor pequeno.',
  },
  {
    severity: 'OK',
    title: 'Corrente 415 — lubrifique a cada 400 km para não "estourar" antes da hora',
    body: 'Corrente de passo fino 415, igual à Akros. Lubrificação a cada 400 km prolonga bastante a vida útil. Folga correta: 15-20mm no trecho inferior. Kit relação completo (corrente + pinhão + coroa): R$ 60–120 em lojas de peças para motos cub populares.',
  },
  {
    severity: 'WARN',
    title: 'Peças escassas — mesma estratégia de compatibilidade da Akros 50cc',
    body: 'A Ergon compartilha praticamente todo o motor e câmbio com a Akros 50cc, então a mesma estratégia de reposição se aplica: procure peças genéricas para "moto cub 50cc" (pistão ~39mm, anéis, retentores). Peças específicas de carroceria (banco, para-lamas, painel) são mais difíceis de achar por serem exclusivas do modelo — desmontes e grupos de colecionadores de motos antigas Sundown no Facebook costumam ter estoque.',
  },
]

const ERGON50_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e bobina: peças elétricas fora de linha, mesma solução da Akros',
    body: 'Sistema de ignição sem fabricação de peças originais Sundown. CDI genérico compatível por pinagem para "moto cub 50cc" resolve a maioria dos casos — leve a peça original como referência. Custo: R$ 30–70.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor do câmbio após anos de uso',
    body: 'Mesmo ponto fraco da Akros 50cc: retentor do eixo de saída do câmbio ressecando com o tempo. Mancha de óleo perto da coroa e corrente encharcada (além da lubrificação normal) são os sinais. Retentor genérico: R$ 8–15.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira: retentor resseca em unidades paradas por longos períodos',
    body: 'Comum em unidades com muitos anos de fabricação, mesmo com poucos km rodados. Óleo escuro escorrendo no tubo interno da bengala é o sinal. Ao trocar o retentor (R$ 15–30 o par), troque também o óleo da bengala (SAE 10W, ~60-80mL por tubo).',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico oxidado — luzes intermitentes e buzina fraca',
    body: 'Dada a idade das unidades em circulação, conectores elétricos oxidados são comuns. Limpe com spray de contato elétrico e aplique graxa dielétrica. Inspecione a fiação perto do motor, onde o calor acelera o ressecamento da capa plástica.',
  },
  {
    severity: 'WARN',
    title: 'Freio a tambor perde eficiência com chuva',
    body: 'Assim como a Akros, a Ergon usa freio a tambor nas duas rodas. Em dias de chuva, acione os freios levemente algumas vezes em local seguro para recuperar a frenagem normal. Lonas abaixo de 2mm de espessura pioram o efeito.',
  },
]

const ERGON50_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário completo Ergon 50cc: mesmo cronograma da Akros 50cc (motor idêntico)',
    body: '300 km — Troca de óleo inicial (rodagem). | 1.000 km — Segunda troca de óleo + reaperto geral. | 1.500 km — Troca de óleo (20W-50, 0,8L). | 3.000 km — Troca de óleo. Lubrificar corrente 415. | 4.000-6.000 km — Troca da vela NGK C7HSA. | 5.000 km — Limpar filtro de ar. | 6.000 km — Limpeza do carburador. | 10.000 km — Trocar kit relação se desgastado. Verificar lonas de freio. | 15.000 km — Inspecionar retentores de bengala e câmbio.',
  },
]

// ─── FIFTY 50cc ────────────────────────────────────────────────────────────────
// Motor: 49,9cc monocilíndrico 2 tempos a ar | ~3,5 cv | Transmissão CVT automática por correia
// Mistura óleo/gasolina automática (bomba dosadora — reservatório de óleo 2T separado)
// Peso ~75kg | Rodas 10" | Freios a tambor (F/R) | Partida mista elétrica + pedal | Consumo >35km/l

const FIFTY50_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 2 tempos com mistura automática — nunca deixe o reservatório de óleo 2T secar',
    body: 'A Fifty 50cc tem bomba dosadora de óleo que injeta automaticamente óleo 2 tempos na gasolina — você NÃO precisa misturar manualmente. Mas existe um reservatório separado de óleo 2T (geralmente sob o banco ou perto do tanque de combustível) que precisa ser reabastecido periodicamente. Se esse reservatório secar, o motor roda sem lubrificação adequada e pode fundir em poucos minutos. Use óleo 2T específico para motor a ar (API TC), tipo Lubrax 2T ou Ipiranga 2T. Verifique o nível a cada abastecimento de gasolina.',
  },
  {
    severity: 'WARN',
    title: 'Se a bomba de óleo falhar, prepare a mistura manual de emergência (25:1 ou 50:1)',
    body: 'Se a bomba dosadora de óleo apresentar defeito (vazamento, entupimento) e a moto precisar rodar até a oficina, é possível fazer mistura manual temporária no tanque de gasolina — proporção aproximada 25:1 (25 partes de gasolina para 1 de óleo 2T) para motores antigos sem bomba confiável, ou 50:1 se a bomba ainda estiver parcialmente funcional e você quiser complementar. Isso é só para emergência: leve a moto à oficina para reparar a bomba assim que possível — mistura manual mal dosada desgasta o motor.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR6HS (ou equivalente 2T) — troque a cada 3.000 km, mais cedo que motor 4T',
    body: 'Motores 2 tempos sujam a vela mais rápido que 4 tempos por causa da queima de óleo junto com a gasolina. Vela recomendada: NGK BR6HS ou equivalente para pequenos motores 2T a ar. Custo: R$ 10–18. Se a vela ficar encharcada de óleo (ponta preta e úmida) com frequência, verifique se a dosagem da bomba de óleo não está muito rica — pode ser ajustada por um parafuso/alavanca no próprio corpo da bomba.',
  },
  {
    severity: 'OK',
    title: 'CVT por correia — sem troca de marcha, mas a correia e o rolo de variação desgastam',
    body: 'A transmissão automática CVT da Fifty 50cc elimina a necessidade de trocar marchas, mas o conjunto de correia + rolos de variação (dentro da caixa CVT, atrás da roda traseira) desgasta com o tempo. Sintoma de correia gasta: perda de aceleração, "escorregamento" ao acelerar do zero, ruído de atrito na CVT. Inspecione a correia a cada 5.000 km — se estiver trincada ou com fiapos de borracha soltos, troque. Kit de correia + rolos para scooter 50cc: R$ 60–120.',
  },
  {
    severity: 'OK',
    title: 'Peso de ~75kg e rodas de 10 polegadas — cuidado redobrado em buracos e trilhos',
    body: 'Sendo leve (~75kg) e com rodas pequenas de 10 polegadas, a Fifty 50cc é mais sensível a buracos, trilhos de trem e bueiros do que motos com rodas de 17-18 polegadas — a roda pequena "cai" mais fundo no buraco e transmite mais impacto. Reduza a velocidade em pavimento irregular e atravesse trilhos e ressaltos em ângulo, nunca de frente reto, para não desalinhar a direção.',
  },
  {
    severity: 'WARN',
    title: 'Peças Sundown escassas — motor 2T de 50cc tem grande compatibilidade entre marcas populares',
    body: 'A linha Fifty foi descontinuada há muitos anos e peças com código Sundown são raras. A vantagem: motores 2 tempos de 50cc a ar seguem um padrão dimensional comum entre diversas scooters populares da mesma época (chinesas e nacionais extintas) — pistão (~40mm), anéis, junta do cabeçote e vela costumam ter equivalentes genéricos vendidos como "motor 2T 50cc scooter". Meça sempre a peça antiga antes de comprar substituto.',
  },
]

const FIFTY50_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor fundido por falta de óleo 2T: causa mais comum de pane grave nesta scooter',
    body: 'O erro mais caro que um dono de Fifty 50cc pode cometer é deixar o reservatório de óleo 2T secar sem perceber — o motor continua funcionando normalmente com gasolina pura por um tempo, mas sem lubrificação interna, e funde (trava) em poucos minutos de uso, geralmente sem aviso prévio além de um ruído metálico crescente. Verifique o nível do reservatório de óleo 2T a cada abastecimento de gasolina — é rápido e evita reparo de motor que pode custar mais que a própria moto vale hoje.',
  },
  {
    severity: 'WARN',
    title: 'Bomba dosadora de óleo emperrada ou vazando: comum em unidades muito antigas',
    body: 'Devido à idade das unidades em circulação, a bomba dosadora de óleo pode emperrar (parar de injetar óleo — risco de fundir o motor) ou vazar (desperdiçar óleo e sujar o motor). Teste: com a moto ligada em marcha lenta, observe se há gotejamento de óleo pela mangueira da bomba até o carburador. Se não houver fluxo nenhum, a bomba pode estar travada — não rode até resolver. Bomba de reposição genérica para scooter 2T 50cc: R$ 40–90.',
  },
  {
    severity: 'WARN',
    title: 'Fumaça excessiva no escape: dosagem de óleo desregulada ou motor gasto',
    body: 'Fumaça branco-azulada leve é normal em motor 2 tempos, mas fumaça excessiva e constante indica dosagem de óleo alta demais (ajustável na bomba) ou desgaste dos anéis do pistão pelo tempo de uso. Se ajustar a dosagem para menos e a fumaça persistir forte, o motor provavelmente precisa de retífica (troca de pistão e anéis) — comum em unidades com muitos anos de uso irregular.',
  },
  {
    severity: 'WARN',
    title: 'CDI e sistema elétrico: peças originais extintas, mesma lógica das demais Sundown pequenas',
    body: 'CDI, bobina e regulador de tensão com código Sundown não têm mais fabricação. Componentes genéricos para "scooter 2T 50cc" costumam ser compatíveis por pinagem — sempre confirme com a peça antiga em mãos. Custo do CDI genérico: R$ 30–60.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT ressecada em unidades paradas por muito tempo',
    body: 'Se a scooter ficou parada por muitos meses ou anos (comum em unidades tão antigas), a correia da CVT resseca e enrijece mesmo sem ter rodado muito — pode trincar ou até romper nos primeiros usos. Antes de rodar uma Fifty que estava parada há tempo, abra a tampa da CVT e inspecione a correia visualmente. Troca preventiva é recomendada em qualquer unidade que estava parada há mais de 1 ano.',
  },
]

const FIFTY50_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário completo Fifty 50cc: motor 2T pede atenção ao óleo em cada abastecimento',
    body: 'A cada abastecimento — Verificar nível do reservatório de óleo 2T. | 500 km — Primeira revisão: verificar vazamentos, aperto geral. | 1.000 km — Troca de óleo da caixa CVT/redução final (se aplicável — verificar manual). | 3.000 km — Troca da vela NGK BR6HS. | 5.000 km — Inspecionar correia CVT e rolos de variação. Limpar filtro de ar. | 6.000 km — Limpeza do carburador. | 8.000-10.000 km — Trocar correia CVT se desgastada. | 10.000 km — Verificar lonas de freio (tambor F/R). | 15.000 km — Inspecionar bomba dosadora de óleo e mangueiras.',
  },
]

// ─── SUPER FIFTY 50cc ──────────────────────────────────────────────────────────
// Mesma plataforma 2T/CVT da Fifty, versão "Super" com leve ganho de potência e detalhes de acabamento
// Motor: 49,9cc 2T a ar | ~4,1 cv | Mesmo sistema de mistura automática de óleo

const SUPERFIFTY50_MACETES: TipInput[] = [
  ...FIFTY50_MACETES,
  {
    severity: 'OK',
    title: 'Versão "Super": ganho de potência sobre a Fifty comum — mesmo cuidado com o óleo 2T',
    body: 'A Super Fifty 50cc usa a mesma base mecânica 2T/CVT da Fifty comum, com ajuste de admissão/escapamento que entrega um pouco mais de potência (~4,1 cv estimado contra ~3,5 cv da Fifty base). O sistema de mistura automática de óleo 2T é o mesmo — o cuidado de nunca deixar o reservatório de óleo secar vale igualmente aqui, e talvez ainda mais, já que o motor "mais espremido" tolera menos folga na lubrificação.',
  },
]

const SUPERFIFTY50_PROBLEMAS: TipInput[] = [
  ...FIFTY50_PROBLEMAS,
  {
    severity: 'WARN',
    title: 'Motor "mais espremido" da versão Super desgasta pistão/anéis um pouco mais rápido',
    body: 'Por entregar mais potência que a Fifty base com a mesma cilindrada de 49,9cc, a Super Fifty tende a exigir retífica (pistão/anéis) um pouco mais cedo em uso intenso — a relação de compressão ligeiramente mais alta gera mais estresse térmico. Respeite a dosagem correta de óleo 2T e evite rodar continuamente em rotação máxima por trechos longos.',
  },
]

const SUPERFIFTY50_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário completo Super Fifty 50cc: mesmo cronograma da Fifty base',
    body: 'A cada abastecimento — Verificar nível do reservatório de óleo 2T. | 500 km — Primeira revisão: verificar vazamentos, aperto geral. | 1.000 km — Troca de óleo da caixa CVT/redução final. | 3.000 km — Troca da vela NGK BR6HS (ou BR7HS se sinal de mistura pobre — motor mais espremido). | 5.000 km — Inspecionar correia CVT e rolos de variação. Limpar filtro de ar. | 6.000 km — Limpeza do carburador. | 8.000-10.000 km — Trocar correia CVT se desgastada. | 10.000 km — Verificar lonas de freio (tambor F/R). | 15.000 km — Inspecionar bomba dosadora de óleo e mangueiras.',
  },
]

// ─── PALIO 50cc ────────────────────────────────────────────────────────────────
// Motor: 49,9cc monocilíndrico 2 tempos a ar | ~3,5 cv | Transmissão CVT automática por correia
// Mesma família mecânica da Fifty, carroceria/acabamento distintos | Mistura automática de óleo 2T

const PALIO50_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 2T com mistura automática — mesmo cuidado essencial da família Fifty/Sundown',
    body: 'A Palio 50cc usa a mesma arquitetura de motor 2 tempos a ar com bomba dosadora de óleo automática da Fifty — o piloto abastece só gasolina no tanque principal e óleo 2T no reservatório separado. Nunca deixe o reservatório de óleo secar: o motor roda sem lubrificação suficiente e pode fundir rapidamente. Óleo recomendado: 2T específico para motor a ar (API TC), tipo Lubrax 2T. Verifique o nível a cada abastecimento de gasolina.',
  },
  {
    severity: 'OK',
    title: 'CVT automática por correia — não precisa trocar marcha, mas exige inspeção periódica',
    body: 'Transmissão 100% automática (CVT), sem alavanca de câmbio nem embreagem manual — só acelera e anda. O conjunto de correia + rolos de variação, dentro da caixa CVT, desgasta com o uso e deve ser inspecionado a cada 5.000 km. Sinal de correia gasta: perda de resposta na aceleração, ruído de atrito. Kit de correia + rolos para scooter 50cc: R$ 60–120.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR6HS — troca a cada 3.000 km (motor 2T suja mais rápido que 4T)',
    body: 'Motores 2 tempos sujam a vela com mais frequência devido à queima de óleo junto com a gasolina. NGK BR6HS ou equivalente. Custo: R$ 10–18. Vela sempre encharcada de óleo pode indicar dosagem alta demais na bomba de óleo 2T — verifique o ajuste.',
  },
  {
    severity: 'OK',
    title: 'Rodas pequenas de 10 polegadas — reduza a velocidade em buracos e trilhos',
    body: 'Assim como a Fifty, a Palio 50cc tem rodas de 10 polegadas — mais sensíveis a irregularidades do pavimento que rodas maiores. Reduza a velocidade em ruas esburacadas e cruze trilhos de trem em ângulo, nunca de frente reto.',
  },
  {
    severity: 'WARN',
    title: 'Peças Sundown escassas — busque genéricos de "scooter 2T 50cc"',
    body: 'A Palio 50cc está fora de linha há muitos anos e peças originais Sundown são raras. Motor 2T de 50cc a ar segue medidas comuns entre scooters populares da mesma época — pistão (~40mm), anéis, junta do cabeçote costumam ter equivalentes genéricos. Meça a peça antiga antes de comprar substituto para garantir compatibilidade exata.',
  },
  {
    severity: 'WARN',
    title: 'Se a moto ficou parada por meses, drene o carburador antes de insistir na partida',
    body: 'Etanol degradado forma verniz dentro do carburador de scooters paradas por longos períodos, entupindo os jatos pequenos. Antes de forçar a partida repetidamente (o que pode afogar e sujar a vela), drene a cuba do carburador pelo parafuso inferior e, se possível, faça uma limpeza com spray carburador.',
  },
]

const PALIO50_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor fundido por falta de óleo 2T — mesmo risco crítico da família Fifty',
    body: 'Deixar o reservatório de óleo 2T secar é a causa mais comum de pane grave na Palio 50cc. O motor continua funcionando por um tempo com gasolina pura, mas sem lubrificação interna adequada, e pode fundir (travar) em poucos minutos, geralmente com um ruído metálico crescente como aviso. Verifique o nível do reservatório a cada abastecimento de gasolina.',
  },
  {
    severity: 'WARN',
    title: 'Bomba dosadora de óleo emperrada ou vazando em unidades antigas',
    body: 'Dada a idade das unidades em circulação, a bomba dosadora pode travar (risco de fundir o motor) ou vazar. Teste com a moto ligada em marcha lenta: observe se há fluxo de óleo pela mangueira da bomba. Sem fluxo nenhum, não rode até resolver. Bomba genérica de reposição: R$ 40–90.',
  },
  {
    severity: 'WARN',
    title: 'CDI e sistema elétrico sem peças originais — busque genéricos compatíveis',
    body: 'CDI, bobina e regulador de tensão com código Sundown estão fora de fabricação. Peças genéricas para "scooter 2T 50cc" costumam funcionar por compatibilidade de pinagem — leve a peça antiga como referência. CDI genérico: R$ 30–60.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT ressecada após longos períodos parada',
    body: 'Unidades paradas por muitos meses têm a correia da CVT ressecada mesmo sem uso — risco de trincar ou romper nos primeiros usos após o período parado. Inspecione visualmente (ou troque preventivamente) antes de voltar a rodar uma Palio que ficou muito tempo parada.',
  },
]

const PALIO50_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário completo Palio 50cc: mesma lógica de manutenção da família 2T/CVT Sundown',
    body: 'A cada abastecimento — Verificar nível do reservatório de óleo 2T. | 500 km — Primeira revisão: vazamentos, aperto geral. | 1.000 km — Óleo da caixa de redução final/CVT (verificar manual). | 3.000 km — Troca da vela NGK BR6HS. | 5.000 km — Inspecionar correia CVT e rolos. Limpar filtro de ar. | 6.000 km — Limpeza do carburador. | 8.000-10.000 km — Trocar correia CVT se desgastada. | 10.000 km — Verificar lonas de freio (tambor F/R). | 15.000 km — Inspecionar bomba dosadora de óleo e mangueiras.',
  },
]

// ─── PGO SPEED 50cc ────────────────────────────────────────────────────────────
// Scooter de design licenciado da taiwanesa PGO (Motive Power Industry) — Sundown produziu/importou
// sob licença. Versão 50cc manteve motor 2 tempos a ar, CVT automática, mistura automática de óleo.
// Suspensão dianteira telescópica esportiva | Rodas 10" | Motor: ~4,0 cv (estimado)

const PGOSPEED50_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Design licenciado da taiwanesa PGO — peças de motor seguem padrão de scooter 2T asiática',
    body: 'A PGO Speed 50cc nasceu de um acordo de licenciamento entre a Sundown e a fabricante taiwanesa PGO (Motive Power Industry, ligada historicamente à Piaggio). O motor 2 tempos a ar de 49cc segue o padrão dimensional comum a scooters PGO/taiwanesas da época — pistão, anéis e carburador costumam ter equivalentes vendidos como peças para "scooter PGO" ou genéricos "2T 50cc scooter esportiva", mais fáceis de achar que peças com código Sundown puro.',
  },
  {
    severity: 'OK',
    title: 'Motor 2T com mistura automática de óleo — nunca deixe o reservatório secar',
    body: 'Assim como a Fifty e a Palio, a PGO Speed 50cc tem bomba dosadora automática de óleo 2T — abasteça só gasolina no tanque principal e óleo 2T (API TC) no reservatório separado. Deixar o reservatório secar é a causa mais comum de motor fundido nesta scooter. Verifique o nível a cada abastecimento de gasolina.',
  },
  {
    severity: 'OK',
    title: 'Suspensão dianteira telescópica esportiva — bengala precisa de óleo específico',
    body: 'Diferente das mopeds cub mais simples da linha Sundown, a PGO Speed tem bengala dianteira telescópica de curso mais longo, com pegada mais esportiva. Use óleo de bengala SAE 10W (ou o especificado no manual PGO original, se disponível) na troca do óleo interno — cerca de 50-70mL por tubo, dado o porte pequeno da bengala. Retentor ressecado é comum em unidades antigas paradas por muito tempo.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR6HS — troca a cada 3.000 km',
    body: 'Vela recomendada para o motor 2T de 49cc: NGK BR6HS ou equivalente. Custo: R$ 10–18. Motor 2 tempos suja a vela mais rápido que 4 tempos — troque com regularidade para manter a partida fácil e evitar engasgos.',
  },
  {
    severity: 'OK',
    title: 'CVT automática — inspecione a correia a cada 5.000 km',
    body: 'Transmissão automática por correia, sem troca manual de marcha. Correia e rolos de variação desgastam com o tempo — perda de resposta na aceleração e ruído de atrito são os sinais de alerta. Kit de correia + rolos para scooter 50cc: R$ 60–120.',
  },
  {
    severity: 'WARN',
    title: 'Bodywork e plásticos exclusivos: mais difíceis de repor que peças de motor',
    body: 'Enquanto peças de motor (pistão, carburador, vela) têm bons equivalentes genéricos por causa do padrão PGO/scooter asiática, os plásticos da carenagem, faróis e lanternas são exclusivos do desenho PGO Speed e mais difíceis de encontrar. Desmontes e grupos de colecionadores de scooters antigas costumam ser o melhor caminho para essas peças específicas — pesquise por "PGO Speed 50" além de "Sundown PGO Speed", já que peças originais taiwanesas às vezes aparecem em importadores.',
  },
]

const PGOSPEED50_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor fundido por falta de óleo 2T — mesmo risco crítico da família 2T Sundown',
    body: 'A causa mais comum de pane grave: reservatório de óleo 2T seco, motor rodando só com gasolina sem lubrificação adequada. Pode fundir em poucos minutos, geralmente com ruído metálico crescente como aviso. Verifique o nível do reservatório a cada abastecimento.',
  },
  {
    severity: 'WARN',
    title: 'Bomba dosadora de óleo emperrada ou vazando',
    body: 'Comum em unidades antigas: a bomba pode travar (risco de fundir o motor) ou vazar. Teste com a moto ligada em marcha lenta, observando o fluxo pela mangueira até o carburador. Bomba genérica de reposição para scooter 2T: R$ 40–90.',
  },
  {
    severity: 'WARN',
    title: 'CDI e sistema elétrico: peças Sundown fora de linha, busque genéricos compatíveis',
    body: 'CDI, bobina e regulador com código Sundown/PGO não têm mais fabricação nacional. Genéricos para "scooter 2T 50cc" costumam funcionar por pinagem compatível — confirme com a peça antiga em mãos. CDI genérico: R$ 30–60.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT ressecada em unidades paradas por muito tempo',
    body: 'Scooter parada por muitos meses tem a correia da CVT ressecada mesmo sem ter rodado — risco de trincar ou romper nos primeiros usos. Inspecione ou troque preventivamente antes de voltar a rodar uma unidade que ficou muito tempo parada.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira telescópica: vedante ressecado por idade da unidade',
    body: 'A bengala de curso mais longo da PGO Speed tem vedante que resseca com o tempo, mesmo sem muito uso, dada a idade das unidades em circulação. Óleo escuro no tubo interno é o sinal. Retentor genérico compatível: R$ 15–30 o par.',
  },
]

const PGOSPEED50_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário completo PGO Speed 50cc: mesma lógica 2T/CVT das demais Sundown pequenas',
    body: 'A cada abastecimento — Verificar nível do reservatório de óleo 2T. | 500 km — Primeira revisão: vazamentos, aperto geral. | 1.000 km — Óleo da caixa de redução final/CVT. | 3.000 km — Troca da vela NGK BR6HS. | 5.000 km — Inspecionar correia CVT e rolos. Limpar filtro de ar. | 6.000 km — Limpeza do carburador. | 8.000-10.000 km — Trocar correia CVT se desgastada. | 10.000 km — Verificar lonas de freio (tambor F/R). Óleo da bengala dianteira. | 15.000 km — Inspecionar bomba dosadora de óleo e mangueiras.',
  },
]

// ─── PGO SPEED 90cc ────────────────────────────────────────────────────────────
// Versão maior da PGO Speed, migrou para motor 4 tempos a ar (~90cc, ~7cv estimado por analogia
// com a Akros 90cc) mantendo a transmissão CVT automática — lógica de manutenção de motor 4T,
// mas com cuidados de CVT herdados da linha 2T.

const PGOSPEED90_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 4 tempos (diferente da PGO Speed 50cc, que é 2T) — não use óleo 2T aqui',
    body: 'Atenção: apesar do nome parecido, a PGO Speed 90cc usa motor 4 tempos a ar (estimado ~90cc, ~7cv por analogia com a Akros 90cc), diferente da PGO Speed 50cc que é 2 tempos. Isso significa que NÃO existe reservatório de óleo 2T nem mistura na gasolina — o motor usa óleo de motor comum no cárter, como qualquer 4 tempos. Use 20W-50 API SG/SF, aproximadamente 0,9-1,0L, trocado a cada 2.000 km. Confirme sempre o tipo de motor da unidade específica antes de abastecer óleo, já que confundir os dois sistemas é o erro mais caro possível aqui.',
  },
  {
    severity: 'OK',
    title: 'Design PGO com CVT automática — combina resposta 4T mais "cheia" com praticidade automática',
    body: 'A PGO Speed 90cc combina o motor 4 tempos (mais robusto e sem a fumaça/cheiro característico do 2T) com a transmissão CVT automática por correia da carroceria PGO. Resultado: aceleração mais suave e constante que a versão 50cc 2T, sem precisar trocar marchas. Inspecione a correia CVT e os rolos de variação a cada 5.000 km — mesmo cuidado de qualquer scooter automática.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA (padrão 4T) — troca a cada 6.000 km, diferente da vela 2T da versão 50cc',
    body: 'Por usar motor 4 tempos, a vela recomendada é a NGK C7HSA (mesma da família Akros), não a BR6HS usada na PGO Speed 50cc 2T. Gap 0,6-0,7mm. Custo: R$ 12–20. Motor 4T suja a vela mais devagar que 2T, então o intervalo de troca é maior.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor 4T seguem padrão cub/scooter popular — mais fáceis de repor que carroceria PGO',
    body: 'O motor 4 tempos de 90cc a ar segue medidas comuns entre motores populares da época (mesma família dimensional da Akros 90cc) — pistão (~47-48mm), anéis, retentores costumam ter equivalentes genéricos. Já os plásticos exclusivos da carroceria PGO (carenagem, faróis) são mais difíceis — busque também por "PGO Speed 90" além de "Sundown PGO Speed" em desmontes e importadores.',
  },
  {
    severity: 'OK',
    title: 'Rodagem inicial: primeiros 500 km sem exceder 5.000 rpm',
    body: 'Como qualquer motor 4 tempos novo (ou recém-retificado), respeite a rodagem: primeiros 500 km sem ultrapassar 5.000 rpm, evitando carga total (subidas fortes, carona) por trechos longos. Troque o óleo aos 300 km e novamente aos 1.000 km para remover as partículas metálicas do amaciamento.',
  },
]

const PGOSPEED90_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e bobina: peças elétricas Sundown/PGO fora de linha',
    body: 'Sistema de ignição sem fabricação de peças originais. Genéricos compatíveis por pinagem para "moto/scooter 4T 90cc" costumam resolver — leve a peça antiga como referência antes de comprar. CDI genérico: R$ 30–70.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT ressecada em unidades paradas por muito tempo',
    body: 'Mesmo com motor 4T, a transmissão continua sendo CVT por correia — se a scooter ficou parada por muitos meses, a correia resseca e pode trincar ou romper nos primeiros usos. Inspecione (ou troque preventivamente) antes de voltar a rodar uma unidade parada há muito tempo.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor da transmissão/CVT após anos de uso',
    body: 'O retentor entre o motor 4T e a caixa CVT pode ressecar e vazar óleo com o tempo, sujando a correia e prejudicando a tração. Sintoma: perda de aceleração + óleo dentro da caixa CVT (que deveria estar seca, exceto pela graxa dos rolos). Retentor genérico: R$ 10–20.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo em unidades muito antigas — retentores de válvula ressecados',
    body: 'Dada a idade das unidades em circulação, consumo de óleo por retentores de válvula ressecados é possível mesmo com poucos km acumulados. Fumaça azulada na partida a frio é o sinal mais claro. Consumo acima de 100-150mL a cada 1.000 km merece inspeção.',
  },
  {
    severity: 'WARN',
    title: 'Freio a tambor perde eficiência com chuva',
    body: 'A PGO Speed 90cc mantém freios a tambor nas duas rodas (sem disco), como o restante da linha pequena Sundown. Em dias de chuva, a frenagem perde eficiência até "secar" com uso leve dos freios em local seguro. Lonas abaixo de 2mm pioram o efeito.',
  },
]

const PGOSPEED90_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário completo PGO Speed 90cc: motor 4T + cuidados de CVT automática',
    body: '300 km — Troca de óleo inicial (rodagem). | 1.000 km — Segunda troca de óleo + reaperto geral. | 2.000 km — Troca de óleo (20W-50, ~1,0L). | 4.000 km — Troca de óleo. | 5.000 km — Inspecionar correia CVT e rolos de variação. Limpar filtro de ar. | 6.000 km — Troca da vela NGK C7HSA. | 7.000 km — Limpeza do carburador. | 8.000-10.000 km — Trocar correia CVT se desgastada. | 10.000 km — Verificar lonas de freio (tambor F/R). | 15.000 km — Inspecionar retentor da transmissão/CVT e consumo de óleo.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'AKROS 50cc',
    yearFrom: 1996,
    yearTo: 2003,
    MACETES: AKROS50_MACETES,
    PROBLEMAS: AKROS50_PROBLEMAS,
    MANUTENCAO: AKROS50_MANUTENCAO,
  },
  {
    modelName: 'AKROS 90cc',
    yearFrom: 1996,
    yearTo: 2003,
    MACETES: AKROS90_MACETES,
    PROBLEMAS: AKROS90_PROBLEMAS,
    MANUTENCAO: AKROS90_MANUTENCAO,
  },
  {
    modelName: 'ERGON 50cc',
    yearFrom: 1997,
    yearTo: 2002,
    MACETES: ERGON50_MACETES,
    PROBLEMAS: ERGON50_PROBLEMAS,
    MANUTENCAO: ERGON50_MANUTENCAO,
  },
  {
    modelName: 'FIFTY 50cc',
    yearFrom: 1998,
    yearTo: 2005,
    MACETES: FIFTY50_MACETES,
    PROBLEMAS: FIFTY50_PROBLEMAS,
    MANUTENCAO: FIFTY50_MANUTENCAO,
  },
  {
    modelName: 'SUPER FIFTY 50cc',
    yearFrom: 1999,
    yearTo: 2005,
    MACETES: SUPERFIFTY50_MACETES,
    PROBLEMAS: SUPERFIFTY50_PROBLEMAS,
    MANUTENCAO: SUPERFIFTY50_MANUTENCAO,
  },
  {
    modelName: 'PALIO 50cc',
    yearFrom: 1998,
    yearTo: 2003,
    MACETES: PALIO50_MACETES,
    PROBLEMAS: PALIO50_PROBLEMAS,
    MANUTENCAO: PALIO50_MANUTENCAO,
  },
  {
    modelName: 'PGO SPEED 50cc',
    yearFrom: 2001,
    yearTo: 2006,
    MACETES: PGOSPEED50_MACETES,
    PROBLEMAS: PGOSPEED50_PROBLEMAS,
    MANUTENCAO: PGOSPEED50_MANUTENCAO,
  },
  {
    modelName: 'PGO SPEED 90cc',
    yearFrom: 2001,
    yearTo: 2006,
    MACETES: PGOSPEED90_MACETES,
    PROBLEMAS: PGOSPEED90_PROBLEMAS,
    MANUTENCAO: PGOSPEED90_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'AKROS 50cc',
    yearFrom: 1996, yearTo: 2003,
    tireSize: '2.50-17 (F) · 2.75-17 (R)',
    frontPsi: 20, rearPsi: 24,
    frontPsiLoad: 20, rearPsiLoad: 28,
    notes: 'Solo: F 20 / R 24 PSI. Com carona: F 20 / R 28 PSI. Pneus estreitos típicos de moto cub pequena. Verifique a pressão a cada 15 dias — pneu vazio nesta cilindrada compromete bastante a estabilidade.',
  },
  {
    modelName: 'AKROS 90cc',
    yearFrom: 1996, yearTo: 2003,
    tireSize: '2.50-17 (F) · 2.75-17 (R)',
    frontPsi: 22, rearPsi: 26,
    frontPsiLoad: 22, rearPsiLoad: 30,
    notes: 'Solo: F 22 / R 26 PSI. Com carona: F 22 / R 30 PSI. Mesmo tamanho de pneu da Akros 50cc, pressão um pouco maior pela cilindrada/peso maior do conjunto.',
  },
  {
    modelName: 'ERGON 50cc',
    yearFrom: 1997, yearTo: 2002,
    tireSize: '2.50-17 (F) · 2.75-17 (R)',
    frontPsi: 20, rearPsi: 24,
    frontPsiLoad: 20, rearPsiLoad: 28,
    notes: 'Solo: F 20 / R 24 PSI. Com carona: F 20 / R 28 PSI. Mesma especificação de pneus da Akros 50cc (motor e chassi compartilhados).',
  },
  {
    modelName: 'FIFTY 50cc',
    yearFrom: 1998, yearTo: 2005,
    tireSize: '3.50-10 (F) · 3.50-10 (R)',
    frontPsi: 22, rearPsi: 26,
    frontPsiLoad: 22, rearPsiLoad: 30,
    notes: 'Solo: F 22 / R 26 PSI. Com carona: F 22 / R 30 PSI. Rodas de 10 polegadas — pneus pequenos exigem verificação mais frequente (semanal) pois perdem calibragem mais rápido que pneus grandes.',
  },
  {
    modelName: 'SUPER FIFTY 50cc',
    yearFrom: 1999, yearTo: 2005,
    tireSize: '3.50-10 (F) · 3.50-10 (R)',
    frontPsi: 22, rearPsi: 27,
    frontPsiLoad: 22, rearPsiLoad: 31,
    notes: 'Solo: F 22 / R 27 PSI. Com carona: F 22 / R 31 PSI. Mesmo aro 10" da Fifty; traseiro 1 PSI a mais pela potência levemente superior do motor.',
  },
  {
    modelName: 'PALIO 50cc',
    yearFrom: 1998, yearTo: 2003,
    tireSize: '3.50-10 (F) · 3.50-10 (R)',
    frontPsi: 22, rearPsi: 26,
    frontPsiLoad: 22, rearPsiLoad: 30,
    notes: 'Solo: F 22 / R 26 PSI. Com carona: F 22 / R 30 PSI. Mesma especificação de aro e pressão da família Fifty (plataforma 2T/CVT compartilhada).',
  },
  {
    modelName: 'PGO SPEED 50cc',
    yearFrom: 2001, yearTo: 2006,
    tireSize: '3.50-10 (F) · 3.50-10 (R)',
    frontPsi: 24, rearPsi: 28,
    frontPsiLoad: 24, rearPsiLoad: 32,
    notes: 'Solo: F 24 / R 28 PSI. Com carona: F 24 / R 32 PSI. Pressões levemente maiores que a Fifty/Palio pela pegada mais esportiva do desenho PGO.',
  },
  {
    modelName: 'PGO SPEED 90cc',
    yearFrom: 2001, yearTo: 2006,
    tireSize: '3.50-10 (F) · 3.50-10 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 26, rearPsiLoad: 34,
    notes: 'Solo: F 26 / R 30 PSI. Com carona: F 26 / R 34 PSI. Mesmo aro 10" da PGO Speed 50cc, pressão maior pela cilindrada/peso maior do motor 4 tempos.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // AKROS 50cc
  { modelName: 'AKROS 50cc', yearFrom: 1996, yearTo: 2003, component: 'Óleo 4T 20W-50 API SG/SF (0,8L)', intervalKm: 1500, intervalMonths: 3, notes: 'Motor cub 49cc a ar. Embreagem centrífuga banhada a óleo do cárter.', priority: 'HIGH', order: 1 },
  { modelName: 'AKROS 50cc', yearFrom: 1996, yearTo: 2003, component: 'Lubrificação da corrente 415', intervalKm: 400, intervalMonths: null, notes: 'Corrente de passo fino — desgasta rápido sem lubrificação. Folga 15-20mm.', priority: 'HIGH', order: 2 },
  { modelName: 'AKROS 50cc', yearFrom: 1996, yearTo: 2003, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 6000, intervalMonths: null, notes: 'Motor pequeno, troque mais cedo (4.000 km) se usar muito em trajetos curtos.', priority: 'MEDIUM', order: 3 },
  { modelName: 'AKROS 50cc', yearFrom: 1996, yearTo: 2003, component: 'Limpeza/troca do filtro de ar', intervalKm: 5000, intervalMonths: 12, notes: 'Verificar tipo (espuma ou papel) antes de decidir lavar ou trocar.', priority: 'MEDIUM', order: 4 },
  { modelName: 'AKROS 50cc', yearFrom: 1996, yearTo: 2003, component: 'Limpeza do carburador (PZ16 ou similar)', intervalKm: 6000, intervalMonths: 12, notes: 'Antecipar se a moto ficou parada mais de 1 mês — etanol degradado entope os jatos.', priority: 'MEDIUM', order: 5 },
  { modelName: 'AKROS 50cc', yearFrom: 1996, yearTo: 2003, component: 'Kit relação 415 (corrente + pinhão + coroa)', intervalKm: 10000, intervalMonths: null, notes: 'Trocar o kit completo, não só a corrente.', priority: 'HIGH', order: 6 },
  { modelName: 'AKROS 50cc', yearFrom: 1996, yearTo: 2003, component: 'Lonas de freio (tambor F/R) — inspeção', intervalKm: 6000, intervalMonths: 12, notes: 'Espessura mínima 2mm. Verificar pela janela de inspeção do tambor.', priority: 'MEDIUM', order: 7 },
  { modelName: 'AKROS 50cc', yearFrom: 1996, yearTo: 2003, component: 'Retentores de bengala e câmbio — inspeção', intervalKm: 15000, intervalMonths: null, notes: 'Pontos clássicos de vazamento de óleo em unidades com muitos anos de uso.', priority: 'MEDIUM', order: 8 },

  // AKROS 90cc
  { modelName: 'AKROS 90cc', yearFrom: 1996, yearTo: 2003, component: 'Óleo 4T 20W-50 API SG/SF (1,0L)', intervalKm: 2000, intervalMonths: 3, notes: 'Motor cub 90cc a ar. Reduzir para 1.500 km com uso intenso/carona frequente.', priority: 'HIGH', order: 1 },
  { modelName: 'AKROS 90cc', yearFrom: 1996, yearTo: 2003, component: 'Lubrificação da corrente 415', intervalKm: 400, intervalMonths: null, notes: 'Mesma corrente da 50cc, mas transmite mais potência — mais atenção à folga.', priority: 'HIGH', order: 2 },
  { modelName: 'AKROS 90cc', yearFrom: 1996, yearTo: 2003, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 6000, intervalMonths: null, notes: 'Verificar cor da ponta da vela para diagnosticar regulagem de mistura.', priority: 'MEDIUM', order: 3 },
  { modelName: 'AKROS 90cc', yearFrom: 1996, yearTo: 2003, component: 'Limpeza/troca do filtro de ar', intervalKm: 6000, intervalMonths: 12, notes: 'Verificar tipo antes de lavar ou trocar.', priority: 'MEDIUM', order: 4 },
  { modelName: 'AKROS 90cc', yearFrom: 1996, yearTo: 2003, component: 'Limpeza do carburador', intervalKm: 7000, intervalMonths: 12, notes: 'Antecipar após período parado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'AKROS 90cc', yearFrom: 1996, yearTo: 2003, component: 'Kit relação 415 (corrente + pinhão + coroa)', intervalKm: 12000, intervalMonths: null, notes: 'Trocar o kit completo.', priority: 'HIGH', order: 6 },
  { modelName: 'AKROS 90cc', yearFrom: 1996, yearTo: 2003, component: 'Lonas de freio (tambor F/R) — inspeção', intervalKm: 6000, intervalMonths: 12, notes: 'Espessura mínima 2mm.', priority: 'MEDIUM', order: 7 },
  { modelName: 'AKROS 90cc', yearFrom: 1996, yearTo: 2003, component: 'Retentores de bengala e câmbio — inspeção', intervalKm: 15000, intervalMonths: null, notes: 'Checar também consumo de óleo (retentores de válvula) em unidades muito antigas.', priority: 'MEDIUM', order: 8 },

  // ERGON 50cc
  { modelName: 'ERGON 50cc', yearFrom: 1997, yearTo: 2002, component: 'Óleo 4T 20W-50 API SG/SF (0,8L)', intervalKm: 1500, intervalMonths: 3, notes: 'Mesmo motor cub 49cc a ar da Akros 50cc.', priority: 'HIGH', order: 1 },
  { modelName: 'ERGON 50cc', yearFrom: 1997, yearTo: 2002, component: 'Lubrificação da corrente 415', intervalKm: 400, intervalMonths: null, notes: 'Folga correta 15-20mm.', priority: 'HIGH', order: 2 },
  { modelName: 'ERGON 50cc', yearFrom: 1997, yearTo: 2002, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 6000, intervalMonths: null, notes: 'Mesma vela da família Akros/Ergon.', priority: 'MEDIUM', order: 3 },
  { modelName: 'ERGON 50cc', yearFrom: 1997, yearTo: 2002, component: 'Limpeza/troca do filtro de ar', intervalKm: 5000, intervalMonths: 12, notes: 'Verificar tipo antes de lavar ou trocar.', priority: 'MEDIUM', order: 4 },
  { modelName: 'ERGON 50cc', yearFrom: 1997, yearTo: 2002, component: 'Limpeza do carburador', intervalKm: 6000, intervalMonths: 12, notes: 'Antecipar após período parado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'ERGON 50cc', yearFrom: 1997, yearTo: 2002, component: 'Kit relação 415 (corrente + pinhão + coroa)', intervalKm: 10000, intervalMonths: null, notes: 'Trocar o kit completo.', priority: 'HIGH', order: 6 },
  { modelName: 'ERGON 50cc', yearFrom: 1997, yearTo: 2002, component: 'Lonas de freio (tambor F/R) — inspeção', intervalKm: 6000, intervalMonths: 12, notes: 'Espessura mínima 2mm.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ERGON 50cc', yearFrom: 1997, yearTo: 2002, component: 'Retentores de bengala e câmbio — inspeção', intervalKm: 15000, intervalMonths: null, notes: 'Pontos clássicos de vazamento em unidades antigas.', priority: 'MEDIUM', order: 8 },

  // FIFTY 50cc
  { modelName: 'FIFTY 50cc', yearFrom: 1998, yearTo: 2005, component: 'Óleo 2T (reservatório dosador automático)', intervalKm: null, intervalMonths: null, notes: 'Verificar nível a cada abastecimento de gasolina — nunca deixar secar (risco de fundir o motor).', priority: 'CRITICAL', order: 1 },
  { modelName: 'FIFTY 50cc', yearFrom: 1998, yearTo: 2005, component: 'Vela NGK BR6HS', intervalKm: 3000, intervalMonths: null, notes: 'Motor 2T suja a vela mais rápido que 4T.', priority: 'MEDIUM', order: 2 },
  { modelName: 'FIFTY 50cc', yearFrom: 1998, yearTo: 2005, component: 'Correia CVT e rolos de variação — inspeção', intervalKm: 5000, intervalMonths: null, notes: 'Trincas ou fiapos de borracha = trocar. Kit completo R$ 60-120.', priority: 'HIGH', order: 3 },
  { modelName: 'FIFTY 50cc', yearFrom: 1998, yearTo: 2005, component: 'Óleo da caixa CVT/redução final', intervalKm: 1000, intervalMonths: 12, notes: 'Verificar especificação no manual — volume pequeno, tipo específico.', priority: 'MEDIUM', order: 4 },
  { modelName: 'FIFTY 50cc', yearFrom: 1998, yearTo: 2005, component: 'Limpeza/troca do filtro de ar', intervalKm: 5000, intervalMonths: 12, notes: 'Verificar tipo antes de lavar ou trocar.', priority: 'MEDIUM', order: 5 },
  { modelName: 'FIFTY 50cc', yearFrom: 1998, yearTo: 2005, component: 'Limpeza do carburador', intervalKm: 6000, intervalMonths: 12, notes: 'Antecipar após período parado — etanol degradado entope jatos.', priority: 'MEDIUM', order: 6 },
  { modelName: 'FIFTY 50cc', yearFrom: 1998, yearTo: 2005, component: 'Lonas de freio (tambor F/R) — inspeção', intervalKm: 10000, intervalMonths: 12, notes: 'Espessura mínima 2mm.', priority: 'MEDIUM', order: 7 },
  { modelName: 'FIFTY 50cc', yearFrom: 1998, yearTo: 2005, component: 'Bomba dosadora de óleo e mangueiras — inspeção', intervalKm: 15000, intervalMonths: 12, notes: 'Testar fluxo com motor em marcha lenta. Emperramento = risco de motor fundido.', priority: 'CRITICAL', order: 8 },

  // SUPER FIFTY 50cc
  { modelName: 'SUPER FIFTY 50cc', yearFrom: 1999, yearTo: 2005, component: 'Óleo 2T (reservatório dosador automático)', intervalKm: null, intervalMonths: null, notes: 'Motor mais espremido que a Fifty base — ainda mais crítico não deixar secar.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SUPER FIFTY 50cc', yearFrom: 1999, yearTo: 2005, component: 'Vela NGK BR6HS', intervalKm: 3000, intervalMonths: null, notes: 'Considerar BR7HS se sinais de mistura pobre em uso intenso.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SUPER FIFTY 50cc', yearFrom: 1999, yearTo: 2005, component: 'Correia CVT e rolos de variação — inspeção', intervalKm: 5000, intervalMonths: null, notes: 'Mesmo kit da Fifty base.', priority: 'HIGH', order: 3 },
  { modelName: 'SUPER FIFTY 50cc', yearFrom: 1999, yearTo: 2005, component: 'Óleo da caixa CVT/redução final', intervalKm: 1000, intervalMonths: 12, notes: 'Verificar especificação no manual.', priority: 'MEDIUM', order: 4 },
  { modelName: 'SUPER FIFTY 50cc', yearFrom: 1999, yearTo: 2005, component: 'Limpeza/troca do filtro de ar', intervalKm: 5000, intervalMonths: 12, notes: 'Verificar tipo antes de lavar ou trocar.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SUPER FIFTY 50cc', yearFrom: 1999, yearTo: 2005, component: 'Limpeza do carburador', intervalKm: 6000, intervalMonths: 12, notes: 'Antecipar após período parado.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SUPER FIFTY 50cc', yearFrom: 1999, yearTo: 2005, component: 'Lonas de freio (tambor F/R) — inspeção', intervalKm: 10000, intervalMonths: 12, notes: 'Espessura mínima 2mm.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SUPER FIFTY 50cc', yearFrom: 1999, yearTo: 2005, component: 'Bomba dosadora de óleo e mangueiras — inspeção', intervalKm: 15000, intervalMonths: 12, notes: 'Testar fluxo com motor em marcha lenta.', priority: 'CRITICAL', order: 8 },

  // PALIO 50cc
  { modelName: 'PALIO 50cc', yearFrom: 1998, yearTo: 2003, component: 'Óleo 2T (reservatório dosador automático)', intervalKm: null, intervalMonths: null, notes: 'Verificar nível a cada abastecimento de gasolina — nunca deixar secar.', priority: 'CRITICAL', order: 1 },
  { modelName: 'PALIO 50cc', yearFrom: 1998, yearTo: 2003, component: 'Vela NGK BR6HS', intervalKm: 3000, intervalMonths: null, notes: 'Motor 2T suja a vela rápido.', priority: 'MEDIUM', order: 2 },
  { modelName: 'PALIO 50cc', yearFrom: 1998, yearTo: 2003, component: 'Correia CVT e rolos de variação — inspeção', intervalKm: 5000, intervalMonths: null, notes: 'Kit completo R$ 60-120.', priority: 'HIGH', order: 3 },
  { modelName: 'PALIO 50cc', yearFrom: 1998, yearTo: 2003, component: 'Óleo da caixa CVT/redução final', intervalKm: 1000, intervalMonths: 12, notes: 'Verificar especificação no manual.', priority: 'MEDIUM', order: 4 },
  { modelName: 'PALIO 50cc', yearFrom: 1998, yearTo: 2003, component: 'Limpeza/troca do filtro de ar', intervalKm: 5000, intervalMonths: 12, notes: 'Verificar tipo antes de lavar ou trocar.', priority: 'MEDIUM', order: 5 },
  { modelName: 'PALIO 50cc', yearFrom: 1998, yearTo: 2003, component: 'Limpeza do carburador', intervalKm: 6000, intervalMonths: 12, notes: 'Antecipar após período parado.', priority: 'MEDIUM', order: 6 },
  { modelName: 'PALIO 50cc', yearFrom: 1998, yearTo: 2003, component: 'Lonas de freio (tambor F/R) — inspeção', intervalKm: 10000, intervalMonths: 12, notes: 'Espessura mínima 2mm.', priority: 'MEDIUM', order: 7 },
  { modelName: 'PALIO 50cc', yearFrom: 1998, yearTo: 2003, component: 'Bomba dosadora de óleo e mangueiras — inspeção', intervalKm: 15000, intervalMonths: 12, notes: 'Testar fluxo com motor em marcha lenta.', priority: 'CRITICAL', order: 8 },

  // PGO SPEED 50cc
  { modelName: 'PGO SPEED 50cc', yearFrom: 2001, yearTo: 2006, component: 'Óleo 2T (reservatório dosador automático)', intervalKm: null, intervalMonths: null, notes: 'Verificar nível a cada abastecimento de gasolina.', priority: 'CRITICAL', order: 1 },
  { modelName: 'PGO SPEED 50cc', yearFrom: 2001, yearTo: 2006, component: 'Vela NGK BR6HS', intervalKm: 3000, intervalMonths: null, notes: 'Motor 2T de 49cc.', priority: 'MEDIUM', order: 2 },
  { modelName: 'PGO SPEED 50cc', yearFrom: 2001, yearTo: 2006, component: 'Correia CVT e rolos de variação — inspeção', intervalKm: 5000, intervalMonths: null, notes: 'Kit completo R$ 60-120.', priority: 'HIGH', order: 3 },
  { modelName: 'PGO SPEED 50cc', yearFrom: 2001, yearTo: 2006, component: 'Óleo da bengala dianteira telescópica', intervalKm: 10000, intervalMonths: 12, notes: 'SAE 10W, ~50-70mL por tubo. Trocar junto com retentor se ressecado.', priority: 'MEDIUM', order: 4 },
  { modelName: 'PGO SPEED 50cc', yearFrom: 2001, yearTo: 2006, component: 'Limpeza/troca do filtro de ar', intervalKm: 5000, intervalMonths: 12, notes: 'Verificar tipo antes de lavar ou trocar.', priority: 'MEDIUM', order: 5 },
  { modelName: 'PGO SPEED 50cc', yearFrom: 2001, yearTo: 2006, component: 'Limpeza do carburador', intervalKm: 6000, intervalMonths: 12, notes: 'Antecipar após período parado.', priority: 'MEDIUM', order: 6 },
  { modelName: 'PGO SPEED 50cc', yearFrom: 2001, yearTo: 2006, component: 'Lonas de freio (tambor F/R) — inspeção', intervalKm: 10000, intervalMonths: 12, notes: 'Espessura mínima 2mm.', priority: 'MEDIUM', order: 7 },
  { modelName: 'PGO SPEED 50cc', yearFrom: 2001, yearTo: 2006, component: 'Bomba dosadora de óleo e mangueiras — inspeção', intervalKm: 15000, intervalMonths: 12, notes: 'Testar fluxo com motor em marcha lenta.', priority: 'CRITICAL', order: 8 },

  // PGO SPEED 90cc
  { modelName: 'PGO SPEED 90cc', yearFrom: 2001, yearTo: 2006, component: 'Óleo 4T 20W-50 API SG/SF (~1,0L)', intervalKm: 2000, intervalMonths: 3, notes: 'ATENÇÃO: motor 4 tempos, diferente da PGO Speed 50cc (2T). Não usar óleo 2T aqui.', priority: 'HIGH', order: 1 },
  { modelName: 'PGO SPEED 90cc', yearFrom: 2001, yearTo: 2006, component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 6000, intervalMonths: null, notes: 'Vela padrão 4T, diferente da BR6HS usada na versão 50cc 2T.', priority: 'MEDIUM', order: 2 },
  { modelName: 'PGO SPEED 90cc', yearFrom: 2001, yearTo: 2006, component: 'Correia CVT e rolos de variação — inspeção', intervalKm: 5000, intervalMonths: null, notes: 'Kit completo R$ 60-120.', priority: 'HIGH', order: 3 },
  { modelName: 'PGO SPEED 90cc', yearFrom: 2001, yearTo: 2006, component: 'Limpeza/troca do filtro de ar', intervalKm: 6000, intervalMonths: 12, notes: 'Verificar tipo antes de lavar ou trocar.', priority: 'MEDIUM', order: 4 },
  { modelName: 'PGO SPEED 90cc', yearFrom: 2001, yearTo: 2006, component: 'Limpeza do carburador', intervalKm: 7000, intervalMonths: 12, notes: 'Antecipar após período parado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'PGO SPEED 90cc', yearFrom: 2001, yearTo: 2006, component: 'Lonas de freio (tambor F/R) — inspeção', intervalKm: 10000, intervalMonths: 12, notes: 'Espessura mínima 2mm.', priority: 'MEDIUM', order: 6 },
  { modelName: 'PGO SPEED 90cc', yearFrom: 2001, yearTo: 2006, component: 'Retentor da transmissão/CVT — inspeção', intervalKm: 15000, intervalMonths: null, notes: 'Vazamento de óleo do motor 4T pode sujar a correia CVT.', priority: 'MEDIUM', order: 7 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🛵 Seed Sundown mopeds (Akros / Ergon / Fifty / Super Fifty / Palio / PGO Speed)...')

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

  console.log('✅ Sundown mopeds concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
