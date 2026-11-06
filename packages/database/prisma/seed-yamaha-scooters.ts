// seed-yamaha-scooters.ts — Scooters Yamaha até 250cc: NMAX 160, XMAX 250, T115 Crypton,
// Crypton 100, Fluo 125, Neo (AT/Automatic 115/125), Neo's Connected (elétrica), Axis 90,
// BW's 50, Jog (50/Teen 50).
// Nomes de modelName escolhidos para casar por substring com \b (word-boundary) contra os
// nomes EXATOS da API FIPE (parallelum.com.br, marca YAMAHA código 101). Verificado com script
// que replica matchesStoredName (apps/web/app/api/tips/route.ts) contra as 22 variantes reais.
// ATENÇÃO: "NEOS CONNECTED (Elétrica)" na FIPE termina em ")" — isso quebra \b no fim da string
// se o modelName também terminar em ")". Por isso o modelName usado é "NEOS CONNECTED" (sem o
// sufixo "(Elétrica)"), que casa corretamente como substring no meio da string FIPE.
// Execute: pnpm --filter @motormacete/database db:seed:yamaha-scooters (ajustar package.json se necessário)
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

// ─── NMAX 160 (inclui Connected / Star Wars / Homem-Aranha / Mandalorian / SE) ────────────
// Motor: 155cc SOHC monocilíndrico 4V, refrigerado a líquido, Blue Core | 15,4 cv @ 8.000 rpm
// Torque: 1,4 kgf.m @ 6.500 rpm | Compressão 11,6:1 | Injeção eletrônica | CVT automático
// Óleo: 10W-40 API SJ / JASO MA — capacidade ~0,9L na troca | Vela NGK CPR8EA
// Pneu: 110/70-13 (F) / 130/70-13 (R) | Tanque 7,1L | Peso 131kg | Produção: 2017-atual

const NMAX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo do motor 10W-40 API SJ — cerca de 0,9L; troque a cada 6.000 km',
    body: 'O motor Blue Core 155cc da NMAX usa óleo 10W-40 API SJ ou JASO MA (obrigatório — a NMAX tem embreagem centrífuga seca, mas usar óleo certificado JASO MA evita qualquer risco em componentes internos). Capacidade de referência: ~0,9L na troca simples. Marcas recomendadas: Yamalube 10W-40, Motul Scooter Power 10W-40, Lubrax Moto 4T 10W-40. Intervalo oficial Yamaha: 6.000 km ou 6 meses — respeite à risca, scooter roda muito em trânsito parado e o óleo sofre mais que em moto convencional.',
  },
  {
    severity: 'WARN',
    title: 'Óleo da CVT/redutora final — item que a maioria dos donos esquece completamente',
    body: 'Diferente da moto com corrente, a NMAX tem uma caixa de engrenagens (redutora final) dentro do cárter da CVT, com óleo próprio (SAE 10W-30 ou específico Yamalube Gear Oil, conforme o manual). Esse óleo é diferente do óleo do motor e raramente é lembrado pelos donos — muita oficina de moto comum nem sabe que ele existe. Verifique o nível a cada revisão e troque a cada 12.000-24.000 km. Falta desse óleo causa desgaste prematuro das engrenagens da transmissão final e ruído crescente na CVT.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR8EA — troque a cada 8.000-10.000 km',
    body: 'Vela original: NGK CPR8EA (rosca 12mm, com resistor). Custo: R$ 20-35. Sintomas de vela gasta: partida a frio mais difícil, leve engasgo na aceleração, consumo aumentando. Como o motor é refrigerado a líquido (diferente da geração anterior a ar), a vela sofre menos variação térmica — pode ir tranquilamente até 10.000 km. Não existe opção iridium oficial amplamente divulgada para esse código — use sempre a NGK convencional original.',
  },
  {
    severity: 'WARN',
    title: 'Correia da CVT — item de desgaste típico de scooter automática; inspecione a cada 10.000 km',
    body: 'A correia de transmissão (correia da CVT) é o item de desgaste mais característico de qualquer scooter automática e a NMAX não foge à regra. Sintomas de correia gasta: perda de aceleração, "patinada" na retomada, ruído de atrito na CVT. Vida útil média: 15.000-20.000 km em uso urbano normal, menos em uso com garupa frequente ou muitas subidas. Correia genérica compatível custa R$ 80-150; a original Yamaha (Yamalube/peça genuína) sai por R$ 150-250. Troque preventivamente entre 15.000-18.000 km mesmo sem sintoma óbvio — corte da correia em movimento é situação de risco.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar — limpeza e troca; item barato que evita perda de potência e consumo alto',
    body: 'O filtro de ar de papel da NMAX deve ser inspecionado a cada 6.000 km e trocado a cada 12.000-18.000 km (mais cedo em cidade com muita poeira). Filtro entupido causa mistura rica, perda de potência sentida principalmente nas subidas e aumento de consumo. Filtro original Yamaha: R$ 40-70. Filtros compatíveis genéricos (Tecfil, Fram) também atendem bem e custam menos.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas: correia, filtro de ar e pastilhas têm bom mercado de compatíveis no Brasil',
    body: 'Por ser a scooter mais vendida do Brasil, a NMAX tem excelente disponibilidade de peças compatíveis de qualidade: correia CVT genérica de marcas como Bando ou Contitech, filtro de ar Tecfil, pastilhas de freio EBC ou Cobreq. Isso reduz muito o custo de manutenção comparado a scooters importadas de menor volume — mecânicos de scooter em qualquer cidade média já têm familiaridade com o modelo.',
  },
  {
    severity: 'OK',
    title: 'Marcas de óleo e pneu recomendadas para a NMAX',
    body: 'Óleo motor: Yamalube 10W-40, Motul Scooter Power 10W-40, Lubrax Moto 4T 10W-40. Pneus: medida 110/70-13 (dianteiro) e 130/70-13 (traseiro) — Pirelli Angel Scooter, Michelin City Grip 2 ou Technic Sport são boas opções disponíveis no Brasil. Como scooter de uso urbano intenso com paradas e partidas constantes, pneu de boa aderência em piso molhado (composto específico para scooter) vale o investimento extra sobre pneu genérico.',
  },
]

const NMAX_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia da CVT rompendo em uso: risco real se ultrapassar muito o intervalo de troca',
    body: 'Casos de correia da CVT rompendo em movimento são documentados em unidades que passam muito do intervalo recomendado (25.000+ km sem trocar). Quando a correia rompe, a moto perde tração instantaneamente — pode ser perigoso em trânsito rápido. Sintomas de alerta antes da ruptura: trincas visíveis na correia (visível ao abrir a tampa da CVT), ruído de atrito, perda progressiva de aceleração. Não espere a correia "acabar" — o custo da troca preventiva é muito menor que o risco.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito muito parado: comportamento comum de scooter refrigerada a líquido em congestionamento longo',
    body: 'Apesar de refrigerada a líquido (mais eficiente que a geração anterior a ar), a NMAX pode indicar temperatura elevada em congestionamentos muito longos e quentes, especialmente com o radiador sujo de poeira/insetos. Sintoma: luz ou ponteiro de temperatura subindo, moto perde um pouco de resposta. Solução preventiva: limpar as aletas do radiador periodicamente (ar comprimido, nunca água sob pressão direta) e verificar o nível do líquido de arrefecimento a cada revisão.',
  },
  {
    severity: 'WARN',
    title: 'Variador e roletes desgastados: perda de retomada e "borboletada" na aceleração',
    body: 'Os roletes do variador (peças cilíndricas dentro da polia dianteira da CVT) desgastam com o tempo e alteram a curva de aceleração da moto — sintoma clássico é a moto "não puxar" como antes, especialmente em subida, mesmo com correia em bom estado. Troca de roletes: R$ 60-120 o jogo completo, geralmente feito junto com a troca da correia por exigir a mesma desmontagem da tampa da CVT. Intervalo recomendado: junto com a correia, a cada 15.000-20.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela junta do cárter/tampa da CVT em unidades de alta quilometragem',
    body: 'Motos com muitos km ou muito tempo de uso podem apresentar pequeno vazamento de óleo pela junta da tampa da CVT ou do cárter — a inspeção visual (mancha de óleo na parte inferior do carenagem, embaixo do motor) deve fazer parte de toda revisão. Junta de reposição: item de baixo custo (R$ 20-50), mão de obra é o principal componente do orçamento.',
  },
  {
    severity: 'WARN',
    title: 'Problemas elétricos: sensor de posição do variador (ou TPS) causando marcha lenta irregular',
    body: 'Como toda scooter injetada moderna, a NMAX pode apresentar marcha lenta instável ou perda de resposta por sujeira/falha em sensores eletrônicos (TPS, sensor de posição). Antes de trocar peças caras, um diagnóstico com scanner OBD (a NMAX tem porta de diagnóstico) resolve rápido a causa exata. Muitas concessionárias e oficinas especializadas em scooter já têm o scanner compatível.',
  },
]

const NMAX_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo NMAX 160: scooter automática exige atenção redobrada à CVT',
    body: '1.000 km — Revisão de amaciamento: troca de óleo do motor. | 6.000 km — Troca de óleo do motor (10W-40, ~0,9L). Verificar filtro de ar. | 8.000-10.000 km — Troca de vela NGK CPR8EA. | 12.000 km — Verificar/trocar óleo da redutora final da CVT (item frequentemente esquecido). Inspecionar correia e roletes visualmente. | 15.000-18.000 km — Troca preventiva da correia da CVT + jogo de roletes do variador. | 18.000 km — Trocar filtro de ar. | 20.000 km — Pastilhas de freio (inspeção; troca conforme desgaste). Fluido de freio (se ainda não trocado nos últimos 24 meses). | 24 meses — Fluido de freio DOT 4 (obrigatório, independente do km). Verificar nível/estado do líquido de arrefecimento.',
  },
]

// ─── XMAX 250 (inclui ABS, Darth Vader, Connected) ────────────────────────────────────────
// Motor: 249cc monocilíndrico SOHC, refrigerado a líquido, cilindro DiASil + pistão forjado
// 22,8 cv @ 7.000 rpm | Torque 2,5 kgf.m @ 5.500 rpm | Injeção eletrônica | CVT automático
// Óleo: 10W-40 — capacidade de referência ~2,0L | Vela NGK CR6HIX (iridium)
// Pneu: 120/70-15 (F) / 140/70-14 (R) | Tanque 13,2L | Produção Brasil: 2021-atual

const XMAX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 — cerca de 2,0L; motor maior exige troca disciplinada a cada 6.000 km',
    body: 'O motor 249cc líquido-refrigerado da XMAX 250 usa óleo 10W-40, capacidade de referência de aproximadamente 2,0L na troca (confirme exato no manual da sua unidade/ano, pode variar levemente). Yamalube 10W-40 é o recomendado oficialmente; Motul Scooter Power 10W-40 e Lubrax Moto 4T 10W-40 são boas alternativas. Intervalo: 6.000 km ou 6 meses. Como é uma scooter maior usada também em viagens/rodovia, respeitar o intervalo é ainda mais importante que em scooter pequena de uso só urbano.',
  },
  {
    severity: 'WARN',
    title: 'Óleo da caixa de transmissão final — não confundir com o óleo do motor',
    body: 'Assim como a NMAX, a XMAX tem uma redutora/caixa de engrenagens na saída da CVT com óleo próprio, separado do óleo do motor. Verifique o nível a cada revisão grande e siga o intervalo de troca do manual (geralmente 12.000-24.000 km). É um dos itens mais negligenciados por donos de scooter grande que vêm de moto com corrente — não existe corrente aqui, mas existe esse óleo de transmissão que precisa de atenção.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR6HIX (iridium) — item de qualidade superior já original de fábrica',
    body: 'A XMAX já vem com vela iridium de fábrica: NGK CR6HIX. Isso significa maior durabilidade (15.000-20.000 km) e melhor resposta de ignição que vela convencional. Custo de reposição: R$ 50-90. Mantenha sempre a mesma especificação na troca — não substitua por vela convencional de grau térmico diferente só para economizar, pode afetar a resposta do motor maior.',
  },
  {
    severity: 'WARN',
    title: 'Correia da CVT — motor maior desgasta a correia mais rápido em uso com carga/garupa',
    body: 'Com 249cc e mais potência que a NMAX, a correia da CVT da XMAX tende a exigir atenção em intervalo similar ou um pouco menor em uso intenso com garupa e bagagem (a scooter é frequentemente usada em viagens). Sintomas de correia gasta: perda de retomada, ruído de atrito na CVT ao acelerar. Inspecione a cada 10.000 km e troque preventivamente entre 15.000-20.000 km. Correia original Yamaha ou compatível de qualidade (Bando, Contitech): R$ 150-280.',
  },
  {
    severity: 'OK',
    title: 'Peças compatíveis: motor 249cc Yamaha compartilha componentes com outras scooters da linha X-Max mundial',
    body: 'A plataforma XMAX 250 é vendida em vários países com o mesmo motor DiASil — isso ajuda na disponibilidade futura de peças de desgaste (retentores, juntas, filtros) mesmo que a peça genuína brasileira demore. Filtro de óleo, pastilhas de freio (EBC, Cobreq) e correia têm bom mercado de compatíveis nacionais já disponíveis nas grandes cidades onde a XMAX vende bem.',
  },
  {
    severity: 'OK',
    title: 'Marcas recomendadas: óleo, pneu e freio para a XMAX 250',
    body: 'Óleo: Yamalube 10W-40, Motul Scooter Power 10W-40. Pneus: 120/70-15 (dianteiro) e 140/70-14 (traseiro) — Michelin City Grip 2 e Pirelli Diablo Scooter TL são as opções mais buscadas no Brasil para essa medida, ambas com bom desempenho em piso molhado (importante pela maior massa da scooter). Pastilhas de freio: EBC ou Cobreq compatíveis reduzem bastante o custo frente à peça genuína Yamaha, sem perda perceptível de frenagem em uso urbano/rodoviário normal.',
  },
]

const XMAX_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Correia da CVT: risco de ruptura em uso muito além do intervalo recomendado',
    body: 'Assim como qualquer scooter automática, ignorar o intervalo de troca da correia da CVT da XMAX pode resultar em ruptura em movimento — mais crítico aqui pela scooter ser usada com frequência em rodovia e velocidades mais altas que scooters pequenas urbanas. Trincas visíveis, ruído de atrito ou perda de retomada são sinais de alerta que não devem ser ignorados.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito parado por tempo prolongado',
    body: 'Mesmo com refrigeração líquida eficiente, uso intenso em trânsito parado sob calor forte pode levar a temperatura elevada, especialmente se o radiador estiver com as aletas sujas. Verifique regularmente o nível do líquido de arrefecimento e mantenha o radiador limpo. Ponteiro/luz de temperatura subindo em trânsito parado: procure sombra e deixe o motor em marcha lenta até normalizar antes de continuar.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de roletes do variador: perda de resposta em subidas e com garupa/bagagem',
    body: 'Como a XMAX é bastante usada em viagens com bagagem e garupa, os roletes do variador tendem a desgastar de forma mais perceptível que em scooter pequena de uso 100% urbano solo. Sintoma: moto perde força nas subidas, RPM sobe sem ganho proporcional de velocidade. Troca do jogo de roletes: geralmente feita junto com a correia, no mesmo serviço de desmontagem da CVT.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo em juntas do motor/CVT em unidades de alta quilometragem',
    body: 'Inspecione visualmente a base do motor e a tampa da CVT a cada revisão, buscando manchas de óleo. Vazamentos pequenos são mais comuns após 30.000-40.000 km ou muitos anos de uso, mesmo em motor bem cuidado — juntas de vedação endurecem com o tempo. Peça de reposição de baixo custo, mão de obra é o item principal do orçamento.',
  },
  {
    severity: 'WARN',
    title: 'Sensor eletrônico com falha causando marcha lenta instável ou perda de potência',
    body: 'Sistema de injeção eletrônica da XMAX pode apresentar falhas pontuais em sensores (TPS, sensor de posição do câmbio CVT, sensor de temperatura) causando sintomas de marcha lenta instável ou perda momentânea de potência. Diagnóstico com scanner OBD é o caminho mais rápido e barato antes de qualquer troca de peça por tentativa e erro.',
  },
]

const XMAX_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo XMAX 250: scooter maior usada em viagem exige atenção extra à CVT e freios',
    body: '1.000 km — Revisão de amaciamento: troca de óleo do motor. | 6.000 km — Troca de óleo do motor (10W-40, ~2,0L). Verificar filtro de ar. | 10.000 km — Inspecionar correia da CVT e roletes do variador. Verificar óleo da caixa de transmissão final. | 12.000 km — Trocar filtro de ar. Fluido de freio (se necessário). | 15.000-20.000 km — Troca preventiva da correia da CVT + jogo de roletes. Vela NGK CR6HIX (se atingir 15.000-20.000 km de uso). | 20.000 km — Pastilhas de freio (inspeção e troca conforme desgaste — a XMAX é mais pesada, desgaste de pastilha é mais rápido que em scooter pequena). | 24 meses — Fluido de freio DOT 4 obrigatório. Verificar nível/estado do líquido de arrefecimento e limpar aletas do radiador.',
  },
]

// ─── T115 CRYPTON (ED / ED Penelope / K) ──────────────────────────────────────────────────
// ATENÇÃO: apesar do nome parecido com "scooter", a T115 Crypton é uma moto CUB (underbone)
// com câmbio semi-automático de 4 marchas — NÃO é uma scooter CVT de variador como a NMAX/XMAX.
// Motor: 115cc OHC monocilíndrico, refrigerado a ar | 8,2 cv @ 7.500 rpm | Torque 0,88 kgf.m @ 5.500 rpm
// Carburador | Ignição CDI | Câmbio semi-automático 4 marchas (sem embreagem manual)
// Rodas 17" | Tanque 4,2L | Peso ~98kg | Produção Brasil: ~2010-2015

const T115_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'ATENÇÃO: T115 Crypton é uma moto cub (câmbio semi-automático), não uma scooter CVT',
    body: 'Apesar do nome remeter a scooter, a T115 Crypton é uma motocicleta tipo "cub"/underbone com câmbio semi-automático de 4 marchas trocadas por pedal (sem alavanca de embreagem manual) — mecânica parecida com a Honda Biz, não com a NMAX/XMAX que têm CVT com variador e correia. Não existe "óleo de CVT" nem "correia de transmissão" nesta moto — a transmissão é por corrente convencional. Isso muda toda a lógica de manutenção comparada às scooters automáticas da linha.',
  },
  {
    severity: 'OK',
    title: 'Óleo do motor — capacidade pequena; troque a cada 3.000 km',
    body: 'O motor 115cc OHC a ar da T115 Crypton compartilha óleo com a embreagem (câmbio semi-automático usa embreagem centrífuga) — óleo JASO MA obrigatório. Use 20W-50 ou 10W-30 conforme especificação do manual da sua unidade/ano — motor pequeno a ar se beneficia de troca frequente: a cada 3.000 km em uso urbano. Marcas: Yamalube, Lubrax Moto 4T, Motul 3000 20W-50.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão — lubrifique a cada 500 km; kit relação de baixo custo',
    body: 'Diferente das scooters CVT da linha Yamaha, a T115 Crypton usa corrente convencional (bitola pequena, similar a motos cub 100-125cc). Lubrifique a cada 500 km com spray de corrente ou óleo comum. Kit relação (corrente + pinhão + coroa) compatível com motos cub 115-125cc de várias marcas é fácil de encontrar e custa entre R$ 60-120 — mesmo mercado de peças da Honda Biz/CG serve como referência de medida, ainda que não seja peça idêntica.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: etanol brasileiro degrada mais rápido em moto de uso esporádico',
    body: 'Como muitas T115 Crypton hoje têm muitos anos de uso ou ficam paradas por períodos, o carburador (alimentação a carburador, sem injeção eletrônica) sofre com verniz de etanol degradado. Sintomas: marcha lenta instável, dificuldade de partida a frio, afogamento. Limpeza com spray de carburador ou kit de reparo (agulha + boia + juntas) resolve a maioria dos casos — custo baixo, R$ 40-80 o kit.',
  },
  {
    severity: 'OK',
    title: 'Peças compatíveis: mecânica simples e comum facilita manutenção com peças genéricas',
    body: 'A T115 Crypton, por ser uma moto cub simples de 115cc, tem boa compatibilidade de peças de desgaste com o mercado genérico voltado para motos populares (retentores, kit relação, filtro de ar, cabos). Apesar de a Yamaha ter descontinuado o modelo há alguns anos, oficinas de bairro acostumadas com Honda Biz/CG conseguem atender a maior parte das necessidades de manutenção sem depender de peça genuína.',
  },
  {
    severity: 'OK',
    title: 'Vela e filtro de ar: itens de manutenção básica e baratos',
    body: 'Vela recomendada: verifique o código exato no manual da sua unidade/ano (geralmente compatível com faixa de vela para motos cub 110-125cc, como NGK C7HSA ou similar — confirme fisicamente antes de comprar, o código pode variar por ano de fabricação). Filtro de ar: modelo de espuma ou papel dependendo do ano — limpar/trocar a cada 5.000-6.000 km. Ambos os itens custam pouco (R$ 15-40) e fazem grande diferença na economia de combustível desta moto, historicamente muito eficiente.',
  },
]

const T115_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Peças específicas Yamaha escassas: modelo descontinuado há anos no Brasil',
    body: 'A Yamaha descontinuou a linha T115 Crypton no Brasil há vários anos, então peças específicas com código Yamaha (CDI, algumas peças elétricas) podem ser difíceis de achar em lojas comuns. Busque em desmanches, Mercado Livre ou grupos de proprietários de motos cub antigas. Para itens mecânicos de desgaste comum (corrente, filtro, vela, retentores), o mercado genérico de motos cub resolve sem problema.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio semi-automático: desgaste da embreagem centrífuga causa patinação em subidas',
    body: 'O câmbio semi-automático da T115 Crypton usa embreagem centrífuga automática — com o desgaste natural ao longo dos anos, é comum sentir a moto "patinar" (RPM sobe sem ganho proporcional de velocidade) em subidas ou com carga extra (garupa). Isso indica desgaste do conjunto de embreagem centrífuga, que precisa ser inspecionado por mecânico com experiência em motos cub de câmbio semi-automático — nem toda oficina de moto está familiarizada com esse tipo de embreagem.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor do eixo primário — comum em unidades com muitos anos de uso',
    body: 'Assim como outras motos populares antigas, o retentor do eixo primário da transmissão pode começar a vazar óleo após muitos anos de uso, especialmente em unidades sem manutenção regular. Sintoma: mancha de óleo na parte inferior do motor. Retentor de reposição genérico (medida a confirmar na peça original) tem custo baixo, R$ 10-20.',
  },
  {
    severity: 'WARN',
    title: 'Problemas elétricos por chicote/conectores oxidados em motos antigas',
    body: 'Motos com muitos anos de uso, especialmente em regiões úmidas ou litorâneas, apresentam oxidação em conectores do chicote elétrico — sintomas: lanterna ou pisca intermitente, dificuldade ocasional de partida. Limpeza dos conectores acessíveis com spray de contato elétrico e aplicação de graxa dielétrica resolve a maioria dos casos sem custo de peça.',
  },
  {
    severity: 'WARN',
    title: 'Corrente e kit relação desgastados por falta de lubrificação em moto de uso esporádico',
    body: 'É comum encontrar T115 Crypton usadas com corrente ressecada ou enferrujada por falta de lubrificação regular — mesmo rodando pouco quilômetro. Antes de rodar uma unidade que ficou parada por tempo, inspecione a corrente: se estiver com elos duros ou enferrujados, troque o kit relação completo antes de qualquer uso prolongado.',
  },
]

const T115_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo T115 Crypton: moto cub simples com câmbio semi-automático',
    body: '500 km — Troca de óleo inicial (amaciamento). | 3.000 km — Troca de óleo do motor. Lubrificar corrente (a cada 500 km entre trocas de óleo). | 5.000-6.000 km — Limpar/trocar filtro de ar. Verificar vela. | 8.000 km — Trocar vela. Verificar folga de válvulas conforme manual (motor frio). | 10.000-12.000 km — Kit relação (corrente + pinhão + coroa) se desgastado. Limpeza do carburador se sintomas de marcha lenta instável. | 15.000 km — Inspeção da embreagem centrífuga (câmbio semi-automático) quanto a patinação. Retentores de bengala dianteira. | Anual — Inspeção de conectores elétricos quanto a oxidação, principalmente em regiões úmidas.',
  },
]

// ─── CRYPTON 100 ───────────────────────────────────────────────────────────────────────────
// Modelo mais antigo e DIFERENTE da T115 Crypton — moto cub simples, sem o "T115" no nome.
// Motor: 98,2cc monocilíndrico 4 tempos, refrigerado a ar | ~7,2 cv | Torque ~0,76 kgf.m
// Carburador | Ignição CDI | Câmbio manual/semi-automático conforme versão e ano
// Produção Brasil: a partir de 1997, vendida por muitos anos com pequenas atualizações

const CRYPTON100_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 4 tempos 98,2cc — não confundir com Crypton 2 tempos de outros mercados/décadas anteriores',
    body: 'A Crypton 100 vendida no Brasil a partir de 1997 é um motor 4 tempos de 98,2cc refrigerado a ar (a Yamaha teve versões Crypton 2 tempos em outros mercados/décadas anteriores, mas a que circula no Brasil nesta faixa de cilindrada é 4 tempos). Isso significa: óleo lubrifica o motor continuamente (troque regularmente), sem necessidade de misturar óleo 2T no combustível. Se você está comprando uma Crypton 100 usada, confirme sempre com o vendedor/manual se é a versão 4 tempos nacional.',
  },
  {
    severity: 'OK',
    title: 'Óleo do motor — capacidade pequena de motor simples; troque a cada 3.000 km',
    body: 'Motor pequeno de baixa cilindrada (98,2cc) com lubrificação simples — use 20W-50 mineral JASO MA (embreagem compartilha óleo com o motor). Capacidade de referência: em torno de 0,8-1,0L (confirme na vareta/manual da sua unidade e ano, pois houve pequenas variações ao longo dos anos de produção). Troca a cada 3.000 km é prudente para motor a ar desta idade/simplicidade.',
  },
  {
    severity: 'OK',
    title: 'Consumo extremamente eficiente: um dos maiores atrativos históricos da Crypton',
    body: 'A Crypton 100 é historicamente reconhecida pelo consumo muito baixo — relatos de mais de 40 km/l em condições ideais. Para manter essa eficiência: mantenha o filtro de ar limpo, a vela em bom estado e a pressão dos pneus correta. Motor desregulado (carburador sujo, vela gasta) pode facilmente dobrar o consumo sem o dono perceber de imediato.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: motos com muitos anos sofrem mais com etanol degradado',
    body: 'Sendo um modelo que já tem décadas de mercado, muitas unidades em circulação hoje têm 15-25+ anos de uso. O carburador original sofre com o etanol brasileiro atual, formando verniz/goma se a moto ficar parada por tempo. Limpeza preventiva com spray carburador ou kit de reparo resolve a maioria dos casos de marcha lenta instável ou dificuldade de partida a frio.',
  },
  {
    severity: 'OK',
    title: 'Peças genéricas de moto cub popular: disponibilidade ampla mesmo com Yamaha descontinuada',
    body: 'Como uma das motos populares mais vendidas de sua época, a Crypton 100 tem excelente disponibilidade de peças compatíveis genéricas (corrente, filtro, vela, retentores, cabos) mesmo décadas depois — o mercado de reposição para motos cub simples é grande e maduro no Brasil. Praticamente qualquer oficina de bairro consegue atender a manutenção básica sem depender de peça genuína Yamaha.',
  },
  {
    severity: 'OK',
    title: 'Vela e filtro de ar: manutenção básica de baixo custo',
    body: 'Vela: verifique o código exato para o ano da sua unidade (geralmente faixa NGK C6HSA/C7HSA para motos cub 100cc — confirme fisicamente com a peça original antes de comprar). Filtro de ar: modelo de espuma nos anos mais antigos, possivelmente papel nas versões mais recentes — limpar/trocar a cada 5.000 km. Itens de baixo custo (R$ 10-30) que preservam a eficiência histórica de consumo do modelo.',
  },
]

const CRYPTON100_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Moto com muitos anos de mercado: desgaste geral proporcional à idade/km da unidade',
    body: 'Por ser um modelo vendido por muitos anos, unidades em circulação hoje variam de moto "nova" relativamente (poucos anos) até exemplares com mais de 20 anos de idade. Antes de comprar uma Crypton 100 usada, avalie criteriosamente o estado geral: motor (ruído, vazamento, fumaça no escape), corrente e kit relação, estado dos pneus e sistema elétrico — a manutenção básica é barata, mas o acúmulo de descuido em moto muito antiga pode custar mais do que o valor da própria moto.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo por juntas endurecidas em unidades antigas',
    body: 'Motos com muitos anos de idade (mesmo com pouco km rodado, se ficaram paradas por períodos) apresentam juntas de vedação do motor endurecidas e ressecadas pelo tempo. Inspecione visualmente a base do motor em busca de manchas de óleo. Substituição de junta: peça de baixo custo, mão de obra é o principal item do orçamento.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico: chicote e conectores oxidados são comuns em moto antiga',
    body: 'Fiação e conectores originais de décadas atrás sofrem oxidação, principalmente em regiões úmidas — sintomas: lanterna intermitente, pisca-pisca instável, dificuldade ocasional de partida. Limpeza com spray de contato elétrico e graxa dielétrica nos terminais resolve a maioria dos casos sem necessidade de troca de peça.',
  },
  {
    severity: 'WARN',
    title: 'Corrente e kit relação desgastados por longos períodos parada',
    body: 'É comum encontrar Crypton 100 usada com corrente enferrujada ou ressecada por falta de lubrificação — mesmo com baixa quilometragem, se a moto ficou muito tempo parada. Antes de rodar, inspecione a corrente: elos duros ou enferrujados indicam necessidade de troca do kit relação completo antes de qualquer viagem.',
  },
  {
    severity: 'WARN',
    title: 'Freio a tambor com desgaste desigual em uso muito prolongado',
    body: 'A maioria das versões da Crypton 100 usa freio a tambor nas duas rodas — com uso muito prolongado (décadas), é comum encontrar lonas desgastadas de forma desigual ou tambor ovalizado. Sintoma: frenagem que "puxa" para um lado ou perde eficiência progressivamente. Inspeção e troca de lonas é item de manutenção de baixo custo mas alta importância para segurança.',
  },
]

const CRYPTON100_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Crypton 100: moto cub simples e historicamente muito econômica',
    body: '500 km — Troca de óleo inicial (amaciamento). | 3.000 km — Troca de óleo do motor (20W-50, ~0,8-1,0L). Lubrificar corrente. | 5.000 km — Limpar/trocar filtro de ar. Verificar vela. | 8.000 km — Trocar vela. Verificar folga de válvulas (motor frio, conforme manual do ano da unidade). | 10.000-12.000 km — Kit relação se desgastado. Limpeza/revisão do carburador. | 15.000 km — Lonas de freio (dianteiro/traseiro a tambor). Retentores de bengala. | Anual, independente do km — Inspeção de conectores elétricos quanto a oxidação (mais importante em moto com muitos anos de idade). | Antes de rodar após período parado — Drenar combustível velho, verificar óleo, lubrificar corrente.',
  },
]

// ─── FLUO 125 (inclui Connected) ──────────────────────────────────────────────────────────
// Motor: 125cc SOHC monocilíndrico, refrigerado a ar | ~8,3-9,5 cv (varia por ano/versão) @ 7.000 rpm
// Torque ~1,0 kgf.m @ 5.000 rpm | Injeção eletrônica | CVT automático | Tanque 4,2L
// Produção Brasil: lançada em 2020/2021 como scooter de entrada da Yamaha

const FLUO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo do motor 10W-30 ou 10W-40 (confirme no manual do ano da sua unidade) — troque a cada 6.000 km',
    body: 'A Fluo 125 usa motor SOHC 125cc refrigerado a ar com óleo compartilhado com a embreagem centrífuga — JASO MA obrigatório. Capacidade pequena, típica de scooter de entrada (confirme o valor exato na vareta/manual, pode variar entre 0,8-1,0L conforme ano). Yamalube 10W-40 é a recomendação oficial; alternativas: Lubrax Moto 4T, Motul Scooter Power. Intervalo: 6.000 km ou 6 meses.',
  },
  {
    severity: 'WARN',
    title: 'Óleo da caixa de transmissão final — item que muitos donos de scooter esquecem',
    body: 'Como toda scooter CVT, a Fluo tem uma redutora final com óleo próprio, diferente do óleo do motor. Verifique o nível a cada revisão e troque conforme especificação do manual (geralmente 12.000-24.000 km). É item frequentemente ignorado — a maioria dos donos de primeira scooter automática nem sabe que esse óleo existe até o mecânico perguntar.',
  },
  {
    severity: 'OK',
    title: 'Vela: confirme o código exato pelo ano — motor SOHC a ar simples',
    body: 'A Fluo usa vela dimensionada para o motor SOHC 125cc a ar — confirme o código exato (faixa NGK CPR ou similar, varia por ano de fabricação) com a peça física original antes de comprar substituta. Troca recomendada: 8.000-10.000 km. Custo: R$ 20-35.',
  },
  {
    severity: 'WARN',
    title: 'Correia da CVT — item de desgaste típico; inspecione a cada 10.000 km',
    body: 'Como toda scooter automática, a correia da CVT da Fluo é item de desgaste que precisa de atenção — sintomas de correia gasta: perda de aceleração, patinada na retomada, ruído de atrito. Vida útil média: 15.000-18.000 km em uso urbano. Correia compatível genérica: R$ 70-130. Troque preventivamente, não espere o sintoma piorar muito.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar e peças de manutenção básica: bom custo-benefício por ser scooter de entrada recente',
    body: 'Por ser lançamento relativamente recente (2020/2021) e posicionada como scooter de entrada popular, a Fluo já tem boa disponibilidade de peças de manutenção básica nas concessionárias Yamaha e começando a aparecer no mercado de compatíveis (filtro de ar, correia, pastilhas). Filtro de ar: inspecionar a cada 6.000 km, trocar a cada 12.000-15.000 km.',
  },
  {
    severity: 'OK',
    title: 'Marcas de óleo e pneu recomendadas para a Fluo',
    body: 'Óleo: Yamalube 10W-40, Lubrax Moto 4T 10W-40. Pneus: medidas compactas típicas de scooter de entrada — Pirelli Angel Scooter ou Levorin (nacional, bom custo-benefício) atendem bem o perfil de uso urbano da Fluo. Como é uma scooter mais leve e voltada para economia, não há necessidade de pneu premium de alta performance — priorize aderência em piso molhado e durabilidade.',
  },
]

const FLUO_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Correia da CVT: atenção ao intervalo de troca para evitar ruptura em movimento',
    body: 'Como em toda scooter automática, ignorar o intervalo de troca da correia pode levar à ruptura em uso — perda súbita de tração. Trincas visíveis, ruído de atrito na CVT ou perda progressiva de retomada são sinais de alerta que pedem inspeção imediata, não espere a próxima revisão programada se notar esses sintomas.',
  },
  {
    severity: 'WARN',
    title: 'Marcha lenta instável — verificar sensores eletrônicos antes de suspeitar de problema grave',
    body: 'Sistema de injeção eletrônica pode apresentar marcha lenta oscilante por sujeira ou falha pontual em sensores (TPS ou similar). Antes de trocar peças, um diagnóstico com scanner OBD é o caminho mais econômico e preciso — muitas concessionárias Yamaha já têm o equipamento compatível para modelos recentes como a Fluo.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de roletes do variador causando perda de resposta em subidas',
    body: 'Com o uso, os roletes do variador desgastam e alteram a curva de aceleração — sintoma: moto perde força em subidas, RPM sobe sem ganho proporcional de velocidade. Normalmente trocado junto com a correia da CVT, no mesmo serviço de desmontagem.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo em juntas do motor em unidades com alguns anos de uso',
    body: 'Inspecione visualmente a base do motor a cada revisão, buscando manchas de óleo — vazamentos pequenos por juntas endurecidas são mais prováveis à medida que a moto acumula anos de uso, mesmo em quilometragem moderada.',
  },
  {
    severity: 'WARN',
    title: 'Modelo relativamente novo: histórico de problemas ainda em consolidação',
    body: 'Por ser lançamento recente (2020/2021), a Fluo ainda não tem o mesmo volume de relatos de longo prazo (10+ anos) que modelos consagrados como a NMAX. Os problemas documentados até o momento seguem o padrão esperado de qualquer scooter CVT (correia, roletes, sensores) — sem defeito crônico grave amplamente reportado até esta data. Acompanhe fóruns e grupos de proprietários para relatos mais recentes.',
  },
]

const FLUO_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Fluo 125: scooter de entrada com manutenção simples e acessível',
    body: '1.000 km — Revisão de amaciamento: troca de óleo do motor. | 6.000 km — Troca de óleo do motor. Verificar filtro de ar. | 8.000-10.000 km — Troca de vela. | 10.000 km — Verificar óleo da caixa de transmissão final. Inspecionar correia e roletes visualmente. | 12.000-15.000 km — Trocar filtro de ar. | 15.000-18.000 km — Troca preventiva da correia da CVT + jogo de roletes. | 18.000-20.000 km — Pastilhas de freio (inspeção e troca conforme desgaste). | 24 meses — Fluido de freio DOT 4 obrigatório, independente do km.',
  },
]

// ─── NEO (AT 115cc / AUTOMATIC 115cc / AUTOMATIC 125cc) ───────────────────────────────────
// Mesma plataforma mecânica de scooter de entrada simples ao longo dos anos, com cilindradas
// diferentes (115cc nas versões mais antigas, 125cc nas mais recentes/UBS).
// Motor: SOHC monocilíndrico, refrigerado a ar | 9,8 cv @ 8.000 rpm (versão 125) | Torque 1,0 kgf.m @ 5.500 rpm
// Óleo: 10W-40 API SJ — capacidade cárter ~0,85L / total ~1,0L | Pneu: 100/80-14 (F) / 110/80-14 (R)

const NEO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo do motor 10W-40 API SJ — cárter 0,85L / total ~1,0L; troque a cada 6.000 km',
    body: 'O motor SOHC a ar da linha Neo (AT 115cc, Automatic 115cc ou Automatic 125cc — mesma plataforma mecânica com pequenas variações de cilindrada ao longo dos anos) usa óleo 10W-40 API SJ, JASO MA obrigatório. Capacidade: cárter 0,85L / total com filtro cerca de 1,0L. Marcas: Yamalube 10W-40, Lubrax Moto 4T 10W-40. Intervalo: 6.000 km ou 6 meses.',
  },
  {
    severity: 'WARN',
    title: 'Óleo da caixa de transmissão final — separado do óleo do motor, item comumente esquecido',
    body: 'A Neo tem redutora final com óleo próprio, à parte do óleo do motor — mesma lógica de qualquer scooter CVT da Yamaha. Verifique o nível a cada revisão grande e troque conforme o manual (geralmente 12.000-24.000 km). É item que passa despercebido em revisões feitas por oficina não especializada em scooter.',
  },
  {
    severity: 'OK',
    title: 'Vela — item de baixo custo, troque a cada 8.000 km',
    body: 'Vela de ignição da linha Neo é peça simples e barata (R$ 15-25), trocada geralmente junto com outras revisões maiores. Confirme o código exato conforme o ano/versão (115cc vs 125cc podem ter especificação levemente diferente) com a peça física original.',
  },
  {
    severity: 'WARN',
    title: 'Correia da CVT — inspecione a cada 10.000 km, item de desgaste típico de scooter automática',
    body: 'A Neo, sendo scooter de entrada mais simples e geralmente mais usada para trajetos curtos urbanos, ainda assim sofre desgaste normal de correia da CVT. Sintomas: perda de aceleração, ruído de atrito, patinada na retomada. Vida útil média: 15.000-18.000 km. Correia compatível genérica: R$ 60-110 — como é modelo de entrada, o mercado de peças compatíveis de baixo custo é amplo.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: item barato que preserva a economia de combustível da Neo',
    body: 'A Neo é reconhecida pela economia de combustível compatível com scooters de entrada simples — filtro de ar limpo é essencial para manter esse desempenho. Inspecionar a cada 6.000 km, trocar a cada 12.000-15.000 km. Filtro original ou compatível: R$ 25-45.',
  },
  {
    severity: 'OK',
    title: 'Pneus e freios: dimensões pequenas e baratas de repor',
    body: 'Pneus 100/80-14 (dianteiro) e 110/80-14 (traseiro) são medidas comuns no mercado, com boa disponibilidade de marcas nacionais (Levorin, Rinaldi) além das importadas (Pirelli, Michelin). Pastilhas/lonas de freio também são de baixo custo — a Neo é uma das scooters mais econômicas de manter da linha Yamaha justamente pela simplicidade mecânica.',
  },
]

const NEO_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Correia da CVT desgastada: sintoma de perda de aceleração é comum não diagnosticado a tempo',
    body: 'Por ser scooter de entrada muitas vezes mantida por dono que não acompanha de perto a manutenção, é comum encontrar Neo com correia da CVT bem além do intervalo recomendado, causando perda perceptível de aceleração antes de qualquer diagnóstico. Inspecione preventivamente, não espere sintoma óbvio.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo por juntas em unidades com muitos anos/km',
    body: 'Como qualquer motor a ar de scooter simples, as juntas de vedação (tampa de válvulas, cárter) podem apresentar pequeno vazamento após muitos anos de uso. Inspeção visual da base do motor a cada revisão é suficiente para identificar cedo, evitando perda de óleo maior.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico simples mas com conectores propensos a oxidação em uso prolongado',
    body: 'Chicote elétrico de scooter de entrada, com componentes mais simples, ainda assim sofre oxidação de conectores em uso de vários anos, especialmente em regiões úmidas. Sintomas: lanterna ou pisca intermitente. Limpeza com spray de contato elétrico resolve a maior parte dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Roletes do variador desgastados causando perda de resposta',
    body: 'Assim como a correia, os roletes do variador desgastam com o uso e alteram a curva de aceleração — sintoma de "moto não puxar" mesmo com correia relativamente nova. Normalmente trocado junto no mesmo serviço de desmontagem da CVT.',
  },
  {
    severity: 'WARN',
    title: 'Marcha lenta instável por sujeira ou desgaste em componentes do carburador ou corpo de injeção (conforme versão/ano)',
    body: 'Dependendo do ano/versão específica da Neo (algumas com carburador, versões mais recentes com injeção eletrônica), sintomas de marcha lenta instável têm causas diferentes — carburador sujo nas versões mais antigas, sensor eletrônico nas mais novas. Identifique qual sistema de alimentação sua unidade tem antes de diagnosticar.',
  },
]

const NEO_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Neo (AT/Automatic 115/125cc): scooter de entrada simples e econômica',
    body: '1.000 km — Revisão de amaciamento: troca de óleo do motor. | 6.000 km — Troca de óleo do motor (10W-40, cárter 0,85L). Verificar filtro de ar. | 8.000 km — Troca de vela. | 10.000 km — Verificar óleo da caixa de transmissão final. Inspecionar correia e roletes visualmente. | 12.000-15.000 km — Trocar filtro de ar. | 15.000-18.000 km — Troca preventiva da correia da CVT + jogo de roletes. | 18.000 km — Pastilhas/lonas de freio (inspeção e troca conforme desgaste). | 24 meses — Fluido de freio DOT 4 (se dianteiro a disco, conforme versão).',
  },
]

// ─── NEOS CONNECTED — ELÉTRICA ────────────────────────────────────────────────────────────
// Motor elétrico: 2,4 kW (3,2 cv) | Torque 13,7 kgf.m | Velocidade máxima 50 km/h (40 km/h modo STD)
// Baterias: 2x Li-ion removíveis 50,4V/23,2Ah | Autonomia: até 71 km | Carga completa ~9h / 20-80% ~5h
// Peso: 90kg (sem bateria) | Conectividade Bluetooth via app Y-Connect
// IMPORTANTE: scooter 100% elétrica — SEM óleo de motor, SEM vela, SEM filtro de ar, SEM correia de CVT

const NEOSCONNECTED_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Scooter 100% elétrica: sem óleo de motor, sem vela, sem filtro de ar — manutenção mecânica quase zero',
    body: 'A Neo\'s Connected é movida por motor elétrico de 2,4 kW (3,2 cv) com torque de 13,7 kgf.m — NÃO tem motor a combustão, então não existe óleo de motor para trocar, vela para verificar, filtro de ar ou correia de CVT como nas scooters a combustão da linha Neo/NMAX/XMAX. Isso reduz drasticamente o custo de manutenção de rotina. Os itens que ainda exigem atenção são: baterias, freios, pneus e suspensão.',
  },
  {
    severity: 'OK',
    title: 'Baterias removíveis: cuide da carga para preservar a vida útil das células',
    body: 'A Neo\'s Connected usa 2 baterias de íon-lítio removíveis, 50,4V/23,2Ah cada, com autonomia combinada de até 71 km. Para maximizar a vida útil das células: evite deixar a bateria completamente descarregada por longos períodos, evite exposição prolongada a sol forte/calor extremo enquanto carrega, e prefira carregar em local ventilado. Carga completa: cerca de 9 horas. Carga rápida de 20% a 80%: cerca de 5 horas.',
  },
  {
    severity: 'OK',
    title: 'Freios: pastilhas/lonas duram mais, mas ainda precisam de inspeção regular',
    body: 'Mesmo sem frenagem regenerativa agressiva documentada nesta scooter (diferente de alguns EVs), o uso urbano típico de scooter elétrica tende a ser mais suave, o que pode prolongar um pouco a vida das pastilhas/lonas comparado a uso muito agressivo. Ainda assim, inspecione a cada 6.000 km e troque o fluido de freio (se houver freio a disco com fluido) a cada 24 meses, independente do uso.',
  },
  {
    severity: 'OK',
    title: 'Pneus: item de manutenção mais crítico numa elétrica leve como a Neo\'s Connected',
    body: 'Com o peso de 90kg (sem bateria) mais o peso das baterias, a Neo\'s Connected tem massa considerável para uma scooter de 50cc equivalente — mantenha a calibragem correta dos pneus (verifique semanalmente) para preservar autonomia e segurança. Pneus com desgaste desigual afetam diretamente a eficiência energética e, portanto, a autonomia da bateria.',
  },
  {
    severity: 'OK',
    title: 'Conectividade Y-Connect: use o app para monitorar carga e diagnósticos',
    body: 'A Neo\'s Connected tem conectividade Bluetooth com o aplicativo Yamaha Motorcycle Connect (Y-Connect), que permite monitorar o nível de carga da bateria, histórico de uso e alguns diagnósticos remotamente. Mantenha o app atualizado — atualizações de firmware via OTA podem trazer melhorias de gerenciamento de bateria e desempenho ao longo do tempo.',
  },
  {
    severity: 'WARN',
    title: 'Modos de pilotagem: STD (40 km/h) e ECO (35 km/h) — velocidade máxima absoluta é 50 km/h',
    body: 'A Neo\'s Connected tem 2 modos de condução: STD (padrão, até 40 km/h) e ECO (economia de bateria, até 35 km/h), com velocidade máxima absoluta de 50 km/h. Por ser uma scooter de baixa velocidade, planeje o uso para trajetos urbanos curtos — não é indicada para vias com tráfego rápido ou rodovias. A autonomia de até 71 km é adequada para uso diário urbano, mas planeje recargas se rodar bastante no dia.',
  },
]

const NEOSCONNECTED_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Degradação natural da bateria ao longo dos anos',
    body: 'Como toda bateria de íon-lítio, as células da Neo\'s Connected perdem capacidade gradualmente com o tempo e os ciclos de carga — é normal e esperado, não é defeito. Reduza a degradação evitando descargas completas frequentes e exposição a calor extremo. Se a autonomia cair de forma abrupta e não gradual, procure a assistência Yamaha para diagnóstico da bateria.',
  },
  {
    severity: 'WARN',
    title: 'Autonomia real menor que a informada em uso com garupa, subidas ou frio',
    body: 'A autonomia de até 71 km é medida em condições ideais (piloto solo, terreno plano, temperatura amena). Em uso real com garupa, subidas frequentes ou baixa temperatura, a autonomia efetiva pode ser sensivelmente menor — planeje suas rotas diárias com margem de segurança, especialmente nos primeiros meses de uso até conhecer o comportamento real da sua unidade.',
  },
  {
    severity: 'WARN',
    title: 'Sistema eletrônico: atualizações de firmware são importantes para desempenho e segurança',
    body: 'Por ser uma scooter elétrica conectada, o sistema de gerenciamento de bateria e o controlador do motor dependem de firmware que pode receber atualizações da Yamaha. Mantenha o app Y-Connect sincronizado e não ignore notificações de atualização — elas podem corrigir bugs de gerenciamento de energia ou de segurança.',
  },
  {
    severity: 'WARN',
    title: 'Preço elevado e rede de assistência técnica especializada ainda em expansão',
    body: 'Sendo lançamento recente no mercado brasileiro (preço sugerido em torno de R$ 33.990), a rede de concessionárias com técnicos especializados em scooter elétrica ainda está em expansão comparada à rede tradicional para motos a combustão. Antes de comprar, verifique a disponibilidade de assistência técnica e baterias de reposição na sua região.',
  },
  {
    severity: 'WARN',
    title: 'Não use óleo de motor, filtro de ar ou vela em nenhuma revisão — atenção a oficinas não especializadas',
    body: 'Por ser um veículo mecanicamente muito diferente das scooters a combustão da mesma marca, é importante levar a Neo\'s Connected apenas a oficinas familiarizadas com veículos elétricos ou à rede Yamaha. Uma oficina tradicional pode tentar cobrar por itens que simplesmente não existem nesta scooter (troca de óleo, vela, filtro de ar), ou pior, não ter conhecimento adequado do sistema elétrico de alta tensão.',
  },
]

const NEOSCONNECTED_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Neo\'s Connected: scooter elétrica com manutenção mínima focada em bateria, freios e pneus',
    body: 'Diária/semanal — Verificar calibragem dos pneus (impacta diretamente a autonomia). | Uso contínuo — Evitar descarga completa da bateria; recarregar regularmente, preferencialmente entre 20-80% para uso diário e 100% apenas antes de trajetos mais longos. | 6.000 km — Inspecionar pastilhas/lonas de freio. | 12.000 km — Verificar suspensão e rolamentos de roda. | 24 meses — Fluido de freio DOT 4 (se houver freio a disco com fluido), independente do km. | Conforme notificação do app — Atualizações de firmware via Y-Connect (gerenciamento de bateria e motor). | Anual — Avaliação da capacidade da bateria em concessionária Yamaha, especialmente após o 3º ano de uso, para acompanhar a degradação natural das células.',
  },
]

// ─── AXIS 90 ───────────────────────────────────────────────────────────────────────────────
// Modelo histórico dos anos 1990. Motor: 90cc monocilíndrico 2 tempos, refrigerado a ar | ~7 cv
// Carburador | Ignição CDI | Freios a tambor (dianteiro e traseiro) | Tanque ~5L
// Produção Brasil: década de 1990 — hoje encontrada apenas como usada/raridade

const AXIS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: '2 tempos: misture óleo 2T na proporção correta — NÃO é motor 4 tempos',
    body: 'A Axis 90 tem motor 2 tempos de 90cc — diferente de praticamente toda a linha atual da Yamaha (NMAX, XMAX, Fluo, Neo são 4 tempos). Se sua unidade tem mistura direta (óleo misturado na gasolina, sem reservatório separado de óleo), respeite rigorosamente a proporção especificada no manual (tipicamente 1:25 a 1:50, dependendo da configuração da sua unidade — verifique junto a mecânico especializado em 2 tempos antes de abastecer). Óleo 2T de qualidade (Mobil 2T, Motul 800 2T) evita fumaça excessiva e prolonga a vida do motor.',
  },
  {
    severity: 'WARN',
    title: 'Motor 2 tempos raro hoje: encontre mecânico especializado, não qualquer oficina de scooter moderna',
    body: 'Como a Yamaha não produz mais scooters 2 tempos há muitos anos, mecânicos mais jovens acostumados só com 4 tempos injetado podem não ter experiência com carburação e ajuste de motor 2 tempos. Procure oficinas mais antigas ou especializadas em motos/scooters clássicas 2 tempos — o ajuste de mistura ar-combustível e a regulagem de marcha lenta em motor 2 tempos exige conhecimento específico diferente do 4 tempos moderno.',
  },
  {
    severity: 'WARN',
    title: 'Peças específicas Yamaha praticamente inexistentes: recorra a desmanches e peças genéricas 2T',
    body: 'A Axis 90 não é fabricada há décadas — peças com código Yamaha original são muito difíceis de encontrar, restritas a desmanches ou coleções de peças antigas. Para itens de desgaste comum (retentores, juntas, kit de reparo de carburador), busque equivalentes genéricos por medida em lojas especializadas em motos 2 tempos antigas — o motor 90cc 2T compartilha muitas medidas padrão com outras scooters pequenas 2 tempos da época (outras marcas asiáticas).',
  },
  {
    severity: 'OK',
    title: 'Vela: motor 2 tempos suja mais rápido — inspecione com mais frequência que motor 4 tempos',
    body: 'Motores 2 tempos sujam a vela mais rápido que 4 tempos, pela própria natureza da combustão do óleo misturado. Inspecione a vela a cada 1.500-2.000 km e limpe/troque conforme necessário — vela encardida de fuligem preta é sinal comum e nem sempre indica problema grave, mas prejudica a partida se acumular demais. Confirme o código exato da vela com a peça física original (variação comum entre unidades e anos).',
  },
  {
    severity: 'OK',
    title: 'Carburador: essencial manter limpo — motor pequeno e simples é sensível a sujeira',
    body: 'O carburador da Axis 90 é simples mas sensível a etanol degradado e sujeira, ainda mais crítico em motor 2 tempos onde a mistura ar-combustível-óleo precisa ser precisa. Se a moto ficou parada por meses, drene o combustível antes de guardar e limpe o carburador antes da primeira partida após longo período parado.',
  },
  {
    severity: 'OK',
    title: 'Moto de coleção/raridade: valorize o estado de conservação e documente a origem das peças',
    body: 'Hoje a Axis 90 é encontrada principalmente como raridade ou item de coleção entre entusiastas de scooters clássicas. Se você tem uma, vale a pena documentar fotograficamente o estado original e guardar notas fiscais de peças trocadas — o valor de mercado de unidades bem conservadas tende a ser maior entre colecionadores do que o valor puramente utilitário da moto.',
  },
]

const AXIS_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor 2 tempos sem manutenção adequada: risco de fundir o motor por mistura incorreta',
    body: 'O maior risco em motor 2 tempos é rodar com proporção de óleo incorreta (pouco óleo na mistura) — isso pode fundir o motor rapidamente, às vezes em poucos quilômetros. Se você não tem certeza da proporção correta da sua unidade específica ou do sistema de lubrificação (mistura direta vs. óleo automático, se equipada), NÃO rode a moto até confirmar com um mecânico especializado em 2 tempos. É o erro mais caro e mais evitável nesse tipo de motor.',
  },
  {
    severity: 'WARN',
    title: 'Fumaça excessiva no escape: sintoma comum de motor 2 tempos desgastado ou mistura incorreta',
    body: 'É normal motor 2 tempos produzir alguma fumaça, mas fumaça excessiva e constante pode indicar excesso de óleo na mistura (não é necessariamente prejudicial, mas indica ajuste incorreto) ou desgaste dos anéis do pistão (mais preocupante, indica perda de compressão). Se a fumaça aumentou recentemente ou está muito além do normal para o modelo, procure diagnóstico especializado.',
  },
  {
    severity: 'WARN',
    title: 'Peças raras: planeje-se com antecedência para qualquer reparo maior',
    body: 'Por não ser mais fabricada, qualquer problema que exija peça específica Yamaha (não genérica) pode levar tempo para resolver — pesquise em desmanches, grupos de colecionadores e Mercado Livre com antecedência, antes que a moto fique parada por muito tempo esperando peça.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico simples mas antigo: fiação ressecada e conectores oxidados são esperados',
    body: 'Com décadas de idade, a fiação original da Axis 90 provavelmente já ressecou em vários pontos, e conectores oxidaram. Problemas elétricos intermitentes (luzes, buzina, partida elétrica se equipada) são comuns. Revisão completa do chicote elétrico com substituição de trechos ressecados é recomendável em qualquer unidade que será usada regularmente, não só ocasionalmente.',
  },
  {
    severity: 'WARN',
    title: 'Freios a tambor: lonas endurecidas por idade, mesmo com pouco uso',
    body: 'Freios a tambor dianteiro e traseiro com lonas de borracha/material de fricção que endurecem com a idade, independente da quilometragem — moto parada por anos pode ter frenagem comprometida mesmo com lona "aparentemente" em bom estado visual. Teste a frenagem com cuidado e substitua as lonas preventivamente se a moto ficou muito tempo parada antes de voltar a rodar regularmente.',
  },
]

const AXIS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Axis 90: scooter 2 tempos clássica exige atenção específica à mistura de óleo',
    body: 'Antes de cada abastecimento (se mistura manual) — Confirmar proporção correta de óleo 2T na gasolina conforme especificação da sua unidade. | 1.500-2.000 km — Inspecionar/limpar vela (suja mais rápido que motor 4 tempos). | 3.000 km — Revisão geral do carburador se sintomas de marcha lenta instável. | 5.000 km — Verificar lonas de freio dianteiro e traseiro (tambor). | Anual, independente do km — Inspeção completa do chicote elétrico (fiação ressecada é esperada pela idade). Revisão do carburador mesmo sem sintomas óbvios. | Antes de rodar após período parado — Drenar combustível velho, testar bateria, verificar lonas de freio, limpar/testar carburador antes da primeira partida.',
  },
]

// ─── BW S 50 ───────────────────────────────────────────────────────────────────────────────
// Scooter esportiva pequena. Motor: 49cc monocilíndrico 2 tempos, refrigerado a ar | ~5-7 cv (varia por versão/mercado)
// Carburador | Ignição CDI | CVT automático | Tanque pequeno (~5-6L)
// Produção Brasil: vendida em diferentes gerações desde os anos 1990/2000

const BWS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: '2 tempos 50cc: confirme o sistema de lubrificação da sua unidade (mistura direta ou óleo automático)',
    body: 'A BW\'s 50 tem motor 2 tempos de 49cc — algumas versões/gerações usam sistema de óleo automático (reservatório separado que dosa o óleo automaticamente), outras usam mistura direta na gasolina. Confirme qual sistema sua unidade específica tem antes de abastecer — usar mistura manual numa moto com sistema automático (ou vice-versa) pode causar dano sério ao motor. Óleo 2T recomendado: Mobil 2T ou Motul 800 2T, sempre de boa qualidade para reduzir fumaça e depósitos.',
  },
  {
    severity: 'WARN',
    title: 'Reservatório de óleo 2T automático: nunca deixe esvaziar completamente',
    body: 'Se sua BW\'s 50 tem sistema de lubrificação automática (bomba de óleo dosando conforme a rotação do motor), monitore o nível do reservatório de óleo 2T regularmente — diferente da gasolina, o motor não avisa claramente quando o óleo está acabando, e rodar sem óleo suficiente funde o motor rapidamente. Verifique o nível a cada abastecimento de gasolina como hábito.',
  },
  {
    severity: 'OK',
    title: 'Vela: motor 2 tempos pequeno suja rápido — inspecione com frequência',
    body: 'Como todo motor 2 tempos, a vela da BW\'s 50 acumula fuligem mais rápido que motor 4 tempos equivalente. Inspecione a cada 1.500-2.000 km. Vela encardida prejudica a partida a frio e a resposta em baixa rotação — mantenha sempre uma vela reserva, é peça barata (R$ 10-20) e fácil de trocar.',
  },
  {
    severity: 'OK',
    title: 'Correia da CVT: mesmo em scooter pequena 2 tempos, é item de desgaste típico',
    body: 'A BW\'s 50 tem câmbio CVT automático (variador + correia), como as scooters 4 tempos modernas — não confunda com moto de câmbio manual. A correia precisa de inspeção e troca periódica, ainda que a vida útil tenda a ser mais longa que em scooter mais potente/pesada, dado o baixo torque do motor 50cc. Inspecione a cada 8.000-10.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Peças específicas: modelo com produção descontinuada há anos no Brasil, recorra a compatíveis',
    body: 'A BW\'s 50 não é mais vendida nova no Brasil há bastante tempo — peças com código Yamaha original ficam cada vez mais raras. Para itens de desgaste (correia, filtro, retentores, kit de carburador), busque equivalentes genéricos compatíveis com scooter 50cc 2 tempos — esse nicho tem mercado de reposição razoável por ainda existir bastante frota de scooters 50cc de várias marcas circulando.',
  },
  {
    severity: 'OK',
    title: 'Carburador: limpeza preventiva evita a maioria dos problemas de partida e marcha lenta',
    body: 'Motor pequeno de 49cc é sensível a qualquer sujeira ou verniz de etanol degradado no carburador. Limpeza com spray de carburador a cada 5.000-6.000 km ou ao notar dificuldade de partida/marcha lenta instável resolve a maioria dos casos sem necessidade de peça nova.',
  },
]

const BWS_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor fundido por falta de óleo 2T: risco real se o sistema automático falhar sem o dono perceber',
    body: 'Se o sistema de lubrificação automática (bomba de óleo 2T) falhar ou o reservatório esvaziar sem o dono perceber, o motor pode fundir rapidamente por falta de lubrificação — diferente de motor 4 tempos, onde óleo baixo geralmente dá mais tempo de reação. Verifique o nível do reservatório de óleo 2T a cada abastecimento como hábito preventivo essencial.',
  },
  {
    severity: 'WARN',
    title: 'Correia da CVT: perda de aceleração é sintoma comum de correia gasta ou variador sujo',
    body: 'Mesmo sendo scooter pequena e leve, a BW\'s 50 apresenta os sintomas clássicos de CVT desgastada: perda de retomada, ruído de atrito, sensação de "escorregamento" na aceleração. Inspecione a correia e limpe o variador (poeira e resíduos de correia desgastada se acumulam ali) a cada revisão maior.',
  },
  {
    severity: 'WARN',
    title: 'Peças escassas: modelo descontinuado exige planejamento para reparos maiores',
    body: 'Por não ser mais vendida nova, peças específicas Yamaha ficam mais difíceis de achar a cada ano. Planeje reparos maiores com antecedência, pesquisando em desmanches e grupos de proprietários de scooter 50cc antes que a moto fique parada esperando peça.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico e conectores oxidados em unidades com muitos anos de uso',
    body: 'Como toda scooter com muitos anos de mercado, conectores e fiação sofrem oxidação, especialmente em regiões úmidas — sintomas: luzes intermitentes, buzina falhando, dificuldade ocasional de partida elétrica (se equipada). Limpeza com spray de contato elétrico resolve boa parte dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de combustível ou óleo 2T por mangueiras ressecadas',
    body: 'Mangueiras de combustível e do sistema de óleo automático (se equipada) ressecam com a idade, especialmente com o etanol brasileiro atual — risco de vazamento. Inspecione visualmente todas as mangueiras visíveis a cada revisão e substitua preventivamente se notar ressecamento, rachaduras ou endurecimento excessivo da borracha.',
  },
]

const BWS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo BW\'s 50: scooter esportiva pequena 2 tempos exige atenção à lubrificação',
    body: 'A cada abastecimento — Verificar nível do reservatório de óleo 2T (se sistema automático) ou confirmar proporção de mistura (se manual). | 1.500-2.000 km — Inspecionar/limpar vela. | 5.000-6.000 km — Limpeza do carburador (preventiva ou ao notar sintomas). | 8.000-10.000 km — Inspecionar correia da CVT e variador. | 10.000 km — Trocar correia da CVT se desgastada. Inspecionar mangueiras de combustível e óleo 2T quanto a ressecamento. | Anual — Revisão do sistema elétrico (conectores). Substituição preventiva de mangueiras ressecadas pela idade, independente do km.',
  },
]

// ─── JOG (50 / TEEN 50) ────────────────────────────────────────────────────────────────────
// Scooter clássica compacta. Motor: 49cc monocilíndrico 2 tempos, refrigerado a ar
// 6,3 cv @ 7.000 rpm | Torque 0,67 kgf.m @ 6.500 rpm | Carburador | CVT automático | Peso ~60kg
// Produção Brasil: sucesso nas décadas de 1990 e 2000

const JOG_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 2 tempos 49cc, 6,3 cv — leve (60kg) e simples, mas exige cuidado com a mistura de óleo',
    body: 'O Jog (50 e Teen 50, mesma base mecânica) tem motor 2 tempos de 49cc, 6,3 cv @ 7.000 rpm, muito leve (cerca de 60kg). Confirme o sistema de lubrificação da sua unidade (mistura direta ou reservatório automático de óleo 2T) antes de abastecer — é o cuidado mais importante em qualquer 2 tempos. Óleo 2T de qualidade (Mobil 2T, Motul 800 2T) reduz fumaça e prolonga a vida do motor.',
  },
  {
    severity: 'WARN',
    title: 'Reservatório de óleo automático (se equipado): monitore o nível a cada abastecimento',
    body: 'Se sua unidade tem sistema de óleo automático, verifique o nível do reservatório sempre que abastecer gasolina — motor 2 tempos sem óleo suficiente funde rapidamente, sem o aviso gradual que um motor 4 tempos costuma dar. É hábito simples que evita o reparo mais caro possível nesta moto.',
  },
  {
    severity: 'OK',
    title: 'Vela: inspecione com frequência — motor 2 tempos suja mais rápido',
    body: 'Inspecione a vela a cada 1.500-2.000 km — motor 2 tempos acumula fuligem de óleo queimado mais rápido que 4 tempos. Vela encardida prejudica partida a frio. Peça barata (R$ 10-20), fácil de verificar e trocar em casa mesmo sem oficina.',
  },
  {
    severity: 'OK',
    title: 'Correia da CVT: apesar do motor pequeno, ainda é item de desgaste a monitorar',
    body: 'O Jog tem câmbio CVT automático simples — a correia dura relativamente bem pelo baixo torque do motor 50cc, mas ainda é item de desgaste. Inspecione a cada 8.000-10.000 km. Sintoma de correia gasta: perda de aceleração, moto "não pega embalo" como antes.',
  },
  {
    severity: 'WARN',
    title: 'Peças escassas: modelo clássico descontinuado, recorra a compatíveis de scooter 50cc',
    body: 'O Jog não é mais vendido novo no Brasil há muitos anos — peças com código Yamaha original ficam cada vez mais raras. Para itens de desgaste (correia, filtro, kit de carburador, retentores), o mercado de compatíveis para scooter 50cc 2 tempos (que atende várias marcas antigas similares) costuma resolver a maioria das necessidades sem depender de peça genuína.',
  },
  {
    severity: 'OK',
    title: 'Carburador simples: limpeza preventiva evita a maior parte dos problemas',
    body: 'O carburador do Jog é simples e robusto, mas sensível a etanol degradado se a moto ficar parada por tempo. Limpeza preventiva a cada 5.000-6.000 km ou ao notar dificuldade de partida ou marcha lenta instável. Kit de reparo (agulha + boia + juntas) é item barato (R$ 30-60) e resolve a maioria dos casos.',
  },
]

const JOG_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor fundido por falta de óleo 2T: cuidado redobrado se o sistema automático não for verificado',
    body: 'O risco mais sério no Jog, como em qualquer 2 tempos, é rodar com pouco ou nenhum óleo na mistura/reservatório — o motor pode fundir em poucos quilômetros, muitas vezes sem aviso claro. Verifique sempre o nível de óleo 2T (reservatório ou proporção da mistura) antes de qualquer viagem mais longa.',
  },
  {
    severity: 'WARN',
    title: 'Correia da CVT ressecada por longos períodos parada — comum em moto antiga de uso esporádico',
    body: 'Muitas unidades do Jog em circulação hoje têm décadas de idade e passaram por períodos parados. A correia da CVT resseca com o tempo mesmo sem uso — se a moto ficou muito tempo guardada, inspecione a correia antes de voltar a rodar regularmente, mesmo que a quilometragem total seja baixa.',
  },
  {
    severity: 'WARN',
    title: 'Peças cada vez mais raras: modelo com décadas fora de linha',
    body: 'Por ser um modelo clássico sem produção há muito tempo, algumas peças específicas ficam cada vez mais difíceis — planeje reparos maiores com antecedência, pesquisando em desmanches, grupos de colecionadores de scooter clássica e Mercado Livre.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico simples mas antigo: fiação ressecada e conectores oxidados',
    body: 'Fiação original de décadas atrás provavelmente já ressecou em pontos críticos, e conectores oxidaram — problemas elétricos intermitentes (luzes, partida) são esperados em unidades de uso regular sem revisão elétrica recente. Vale a pena uma revisão completa do chicote se a moto será usada com frequência.',
  },
  {
    severity: 'WARN',
    title: 'Freio a tambor com lonas endurecidas pela idade, mesmo com pouco uso',
    body: 'Freios a tambor do Jog, com lonas de idade avançada, podem ter perdido eficiência mesmo com aspecto visual razoável — a borracha/material de fricção endurece com o tempo independente da quilometragem. Teste a frenagem com cuidado antes de confiar na moto para uso diário, especialmente em exemplares que ficaram parados por anos.',
  },
]

const JOG_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Jog 50/Teen 50: scooter clássica leve 2 tempos, cuidado essencial com óleo 2T',
    body: 'A cada abastecimento — Verificar nível do reservatório de óleo 2T (se sistema automático) ou proporção da mistura (se manual). | 1.500-2.000 km — Inspecionar/limpar vela. | 5.000-6.000 km — Limpeza do carburador (preventiva ou por sintoma). | 8.000-10.000 km — Inspecionar correia da CVT. | 10.000 km — Trocar correia se desgastada. | Anual, independente do km — Revisão do sistema elétrico. Inspeção de mangueiras de combustível/óleo quanto a ressecamento. Verificação das lonas de freio a tambor. | Antes de rodar após período parado — Drenar combustível velho, verificar óleo 2T, testar frenagem antes de qualquer viagem.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'NMAX',
    yearFrom: 2017,
    yearTo: null,
    MACETES: NMAX_MACETES,
    PROBLEMAS: NMAX_PROBLEMAS,
    MANUTENCAO: NMAX_MANUTENCAO,
  },
  {
    modelName: 'XMAX',
    yearFrom: 2021,
    yearTo: null,
    MACETES: XMAX_MACETES,
    PROBLEMAS: XMAX_PROBLEMAS,
    MANUTENCAO: XMAX_MANUTENCAO,
  },
  {
    modelName: 'T115 CRYPTON',
    yearFrom: 2010,
    yearTo: 2015,
    MACETES: T115_MACETES,
    PROBLEMAS: T115_PROBLEMAS,
    MANUTENCAO: T115_MANUTENCAO,
  },
  {
    modelName: 'CRYPTON 100',
    yearFrom: 1997,
    yearTo: 2015,
    MACETES: CRYPTON100_MACETES,
    PROBLEMAS: CRYPTON100_PROBLEMAS,
    MANUTENCAO: CRYPTON100_MANUTENCAO,
  },
  {
    modelName: 'FLUO',
    yearFrom: 2020,
    yearTo: null,
    MACETES: FLUO_MACETES,
    PROBLEMAS: FLUO_PROBLEMAS,
    MANUTENCAO: FLUO_MANUTENCAO,
  },
  {
    modelName: 'NEO',
    yearFrom: 2005,
    yearTo: null,
    MACETES: NEO_MACETES,
    PROBLEMAS: NEO_PROBLEMAS,
    MANUTENCAO: NEO_MANUTENCAO,
  },
  {
    modelName: 'NEOS CONNECTED',
    yearFrom: 2025,
    yearTo: null,
    MACETES: NEOSCONNECTED_MACETES,
    PROBLEMAS: NEOSCONNECTED_PROBLEMAS,
    MANUTENCAO: NEOSCONNECTED_MANUTENCAO,
  },
  {
    modelName: 'AXIS',
    yearFrom: 1990,
    yearTo: 2000,
    MACETES: AXIS_MACETES,
    PROBLEMAS: AXIS_PROBLEMAS,
    MANUTENCAO: AXIS_MANUTENCAO,
  },
  {
    modelName: 'BW S',
    yearFrom: 1995,
    yearTo: 2010,
    MACETES: BWS_MACETES,
    PROBLEMAS: BWS_PROBLEMAS,
    MANUTENCAO: BWS_MANUTENCAO,
  },
  {
    modelName: 'JOG',
    yearFrom: 1990,
    yearTo: 2010,
    MACETES: JOG_MACETES,
    PROBLEMAS: JOG_PROBLEMAS,
    MANUTENCAO: JOG_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'NMAX',
    yearFrom: 2017, yearTo: null,
    tireSize: '110/70-13 (F) · 130/70-13 (R)',
    frontPsi: 29, rearPsi: 29,
    frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Solo: F 29 / R 29 PSI. Com garupa: F 29 / R 36 PSI (versão Connected: R 33/40 PSI conforme manual). Calibre sempre com pneus frios. Recomendados: Pirelli Angel Scooter, Michelin City Grip 2.',
  },
  {
    modelName: 'XMAX',
    yearFrom: 2021, yearTo: null,
    tireSize: '120/70-15 (F) · 140/70-14 (R)',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo: F 28 / R 32 PSI (valores de referência — confirme na etiqueta do veículo/manual, pode variar por ano). Com garupa/bagagem: F 28 / R 36 PSI. Recomendados: Michelin City Grip 2, Pirelli Diablo Scooter TL.',
  },
  {
    modelName: 'T115 CRYPTON',
    yearFrom: 2010, yearTo: 2015,
    tireSize: '2.50-17 (F) · 2.75-17 (R) (roda 17", confirme medida exata na peça original)',
    frontPsi: 22, rearPsi: 26,
    frontPsiLoad: 22, rearPsiLoad: 28,
    notes: 'Solo: F 22 / R 26 PSI. Com garupa: F 22 / R 28 PSI. Moto cub leve (~98kg) — pressão mais baixa que motos maiores. Confirme sempre a medida exata gravada no flanco do pneu da sua unidade.',
  },
  {
    modelName: 'CRYPTON 100',
    yearFrom: 1997, yearTo: 2015,
    tireSize: '2.50-17 (F) · 2.75-17 (R) (confirme medida exata na peça original — pode variar por ano)',
    frontPsi: 22, rearPsi: 26,
    frontPsiLoad: 22, rearPsiLoad: 28,
    notes: 'Solo: F 22 / R 26 PSI. Com garupa: F 22 / R 28 PSI. Moto cub simples e leve — verifique a pressão semanalmente, pneus pequenos perdem ar proporcionalmente mais rápido.',
  },
  {
    modelName: 'FLUO',
    yearFrom: 2020, yearTo: null,
    tireSize: '90/90-14 (F) · 100/90-14 (R) (confirme medida exata no manual do ano da sua unidade)',
    frontPsi: 24, rearPsi: 28,
    frontPsiLoad: 24, rearPsiLoad: 30,
    notes: 'Solo: F 24 / R 28 PSI. Com garupa: F 24 / R 30 PSI. Scooter de entrada leve — pneus de medida compacta com boa disponibilidade nacional (Levorin, Rinaldi) e importada (Pirelli Angel Scooter).',
  },
  {
    modelName: 'NEO',
    yearFrom: 2005, yearTo: null,
    tireSize: '100/80-14 (F) · 110/80-14 (R)',
    frontPsi: 25, rearPsi: 28,
    frontPsiLoad: 25, rearPsiLoad: 33,
    notes: 'Solo: F 25 / R 28 PSI. Com garupa: F 25 / R 33 PSI. Medidas típicas de scooter de entrada, boa disponibilidade nacional.',
  },
  {
    modelName: 'NEOS CONNECTED',
    yearFrom: 2025, yearTo: null,
    tireSize: '100/80-14 (F) · 110/80-14 (R) (confirme medida exata no manual — scooter elétrica recente)',
    frontPsi: 26, rearPsi: 29,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 29 PSI. Com garupa: F 26 / R 33 PSI. Scooter mais pesada que a Neo a combustão pelo peso das baterias — verifique a calibragem semanalmente, impacta diretamente a autonomia.',
  },
  {
    modelName: 'AXIS',
    yearFrom: 1990, yearTo: 2000,
    tireSize: '3.50-10 (F) · 3.50-10 (R) (confirme medida exata na peça original — scooter antiga de aro pequeno)',
    frontPsi: 22, rearPsi: 26,
    frontPsiLoad: 22, rearPsiLoad: 28,
    notes: 'Solo: F 22 / R 26 PSI. Com garupa: F 22 / R 28 PSI. Scooter muito antiga e leve — pneus de aro pequeno raros hoje, planeje a compra com antecedência.',
  },
  {
    modelName: 'BW S',
    yearFrom: 1995, yearTo: 2010,
    tireSize: '120/90-10 (F) · 130/90-10 (R) (confirme medida exata na peça original — varia por geração)',
    frontPsi: 22, rearPsi: 26,
    frontPsiLoad: 22, rearPsiLoad: 28,
    notes: 'Solo: F 22 / R 26 PSI. Com garupa: F 22 / R 28 PSI. Scooter esportiva pequena de aro 10" — pneus com boa disponibilidade por ainda atender outras scooters 50cc similares.',
  },
  {
    modelName: 'JOG',
    yearFrom: 1990, yearTo: 2010,
    tireSize: '3.00-10 (F) · 3.50-10 (R) (confirme medida exata na peça original — varia por geração/versão)',
    frontPsi: 22, rearPsi: 26,
    frontPsiLoad: 22, rearPsiLoad: 28,
    notes: 'Solo: F 22 / R 26 PSI. Com garupa: F 22 / R 28 PSI. Scooter leve (~60kg) de aro pequeno — pressão baixa em relação a scooters maiores. Verifique semanalmente.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // NMAX
  { modelName: 'NMAX', yearFrom: 2017, yearTo: null, component: 'Óleo do motor 10W-40 API SJ (~0,9L)', intervalKm: 6000, intervalMonths: 6, notes: 'JASO MA. Yamalube 10W-40 é o recomendado oficial.', priority: 'HIGH', order: 1 },
  { modelName: 'NMAX', yearFrom: 2017, yearTo: null, component: 'Óleo da caixa de transmissão final (redutora CVT)', intervalKm: 18000, intervalMonths: 24, notes: 'Item separado do óleo do motor, frequentemente esquecido.', priority: 'MEDIUM', order: 2 },
  { modelName: 'NMAX', yearFrom: 2017, yearTo: null, component: 'Vela NGK CPR8EA', intervalKm: 9000, intervalMonths: null, notes: 'Troca a cada 8.000-10.000 km.', priority: 'MEDIUM', order: 3 },
  { modelName: 'NMAX', yearFrom: 2017, yearTo: null, component: 'Correia da CVT', intervalKm: 17000, intervalMonths: null, notes: 'Inspecionar a partir de 10.000 km. Risco de ruptura se ultrapassar muito o intervalo.', priority: 'HIGH', order: 4 },
  { modelName: 'NMAX', yearFrom: 2017, yearTo: null, component: 'Jogo de roletes do variador', intervalKm: 17000, intervalMonths: null, notes: 'Trocar junto com a correia — mesma desmontagem da CVT.', priority: 'MEDIUM', order: 5 },
  { modelName: 'NMAX', yearFrom: 2017, yearTo: null, component: 'Filtro de ar', intervalKm: 15000, intervalMonths: 12, notes: 'Inspecionar a cada 6.000 km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'NMAX', yearFrom: 2017, yearTo: null, component: 'Pastilhas de freio', intervalKm: 15000, intervalMonths: null, notes: 'Inspecionar a partir de 10.000 km; trocar conforme desgaste.', priority: 'MEDIUM', order: 7 },
  { modelName: 'NMAX', yearFrom: 2017, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 8 },
  { modelName: 'NMAX', yearFrom: 2017, yearTo: null, component: 'Líquido de arrefecimento — verificação de nível', intervalKm: null, intervalMonths: 12, notes: 'Motor refrigerado a líquido. Limpar aletas do radiador periodicamente.', priority: 'MEDIUM', order: 9 },

  // XMAX
  { modelName: 'XMAX', yearFrom: 2021, yearTo: null, component: 'Óleo do motor 10W-40 (~2,0L)', intervalKm: 6000, intervalMonths: 6, notes: 'Confirme capacidade exata no manual da unidade/ano.', priority: 'HIGH', order: 1 },
  { modelName: 'XMAX', yearFrom: 2021, yearTo: null, component: 'Óleo da caixa de transmissão final (redutora CVT)', intervalKm: 18000, intervalMonths: 24, notes: 'Item separado do óleo do motor.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XMAX', yearFrom: 2021, yearTo: null, component: 'Vela NGK CR6HIX (iridium)', intervalKm: 17000, intervalMonths: null, notes: 'Já original de fábrica em iridium. Dura 15.000-20.000 km.', priority: 'MEDIUM', order: 3 },
  { modelName: 'XMAX', yearFrom: 2021, yearTo: null, component: 'Correia da CVT', intervalKm: 17000, intervalMonths: null, notes: 'Motor maior (249cc) — atenção redobrada em uso com garupa/bagagem.', priority: 'HIGH', order: 4 },
  { modelName: 'XMAX', yearFrom: 2021, yearTo: null, component: 'Jogo de roletes do variador', intervalKm: 17000, intervalMonths: null, notes: 'Trocar junto com a correia.', priority: 'MEDIUM', order: 5 },
  { modelName: 'XMAX', yearFrom: 2021, yearTo: null, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Inspecionar a cada 6.000 km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'XMAX', yearFrom: 2021, yearTo: null, component: 'Pastilhas de freio', intervalKm: 20000, intervalMonths: null, notes: 'Scooter mais pesada — desgaste mais rápido que scooter pequena.', priority: 'MEDIUM', order: 7 },
  { modelName: 'XMAX', yearFrom: 2021, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 8 },
  { modelName: 'XMAX', yearFrom: 2021, yearTo: null, component: 'Líquido de arrefecimento — verificação de nível', intervalKm: null, intervalMonths: 12, notes: 'Limpar aletas do radiador periodicamente.', priority: 'MEDIUM', order: 9 },

  // T115 CRYPTON
  { modelName: 'T115 CRYPTON', yearFrom: 2010, yearTo: 2015, component: 'Óleo do motor 20W-50 ou 10W-30 (confirme no manual)', intervalKm: 3000, intervalMonths: 6, notes: 'JASO MA obrigatório — embreagem compartilha óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'T115 CRYPTON', yearFrom: 2010, yearTo: 2015, component: 'Lubrificação da corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: 'Moto cub com corrente convencional, não CVT.', priority: 'HIGH', order: 2 },
  { modelName: 'T115 CRYPTON', yearFrom: 2010, yearTo: 2015, component: 'Vela (confirmar código exato pelo ano)', intervalKm: 8000, intervalMonths: null, notes: 'Faixa NGK C7HSA ou similar — confirme com a peça original.', priority: 'MEDIUM', order: 3 },
  { modelName: 'T115 CRYPTON', yearFrom: 2010, yearTo: 2015, component: 'Filtro de ar', intervalKm: 5500, intervalMonths: 12, notes: 'Limpar/trocar conforme tipo (espuma ou papel).', priority: 'MEDIUM', order: 4 },
  { modelName: 'T115 CRYPTON', yearFrom: 2010, yearTo: 2015, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 11000, intervalMonths: null, notes: 'Peça genérica de moto cub 115-125cc atende bem.', priority: 'HIGH', order: 5 },
  { modelName: 'T115 CRYPTON', yearFrom: 2010, yearTo: 2015, component: 'Limpeza do carburador', intervalKm: 10000, intervalMonths: 12, notes: 'Preventiva ou ao notar marcha lenta instável.', priority: 'MEDIUM', order: 6 },
  { modelName: 'T115 CRYPTON', yearFrom: 2010, yearTo: 2015, component: 'Inspeção da embreagem centrífuga (câmbio semi-automático)', intervalKm: 15000, intervalMonths: 12, notes: 'Sintoma de desgaste: patinação em subidas.', priority: 'MEDIUM', order: 7 },
  { modelName: 'T115 CRYPTON', yearFrom: 2010, yearTo: 2015, component: 'Retentores de bengala dianteira', intervalKm: null, intervalMonths: 24, notes: 'Endurece com a idade.', priority: 'LOW', order: 8 },

  // CRYPTON 100
  { modelName: 'CRYPTON 100', yearFrom: 1997, yearTo: 2015, component: 'Óleo do motor 20W-50 (~0,8-1,0L)', intervalKm: 3000, intervalMonths: 6, notes: 'JASO MA. Confirme capacidade exata na vareta/manual do ano da unidade.', priority: 'HIGH', order: 1 },
  { modelName: 'CRYPTON 100', yearFrom: 1997, yearTo: 2015, component: 'Lubrificação da corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: 'Corrente convencional, moto cub simples.', priority: 'HIGH', order: 2 },
  { modelName: 'CRYPTON 100', yearFrom: 1997, yearTo: 2015, component: 'Vela (confirmar código pelo ano)', intervalKm: 8000, intervalMonths: null, notes: 'Faixa NGK C6HSA/C7HSA — confirme com a peça original.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CRYPTON 100', yearFrom: 1997, yearTo: 2015, component: 'Filtro de ar', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma (modelos antigos) ou papel (mais recentes).', priority: 'MEDIUM', order: 4 },
  { modelName: 'CRYPTON 100', yearFrom: 1997, yearTo: 2015, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 11000, intervalMonths: null, notes: 'Mercado genérico amplo para moto cub popular.', priority: 'HIGH', order: 5 },
  { modelName: 'CRYPTON 100', yearFrom: 1997, yearTo: 2015, component: 'Limpeza/revisão do carburador', intervalKm: 10000, intervalMonths: 12, notes: 'Mais crítico em unidades com muitos anos de idade.', priority: 'MEDIUM', order: 6 },
  { modelName: 'CRYPTON 100', yearFrom: 1997, yearTo: 2015, component: 'Lonas de freio (dianteiro/traseiro a tambor)', intervalKm: 15000, intervalMonths: 24, notes: 'Endurece com a idade mesmo com pouco uso.', priority: 'MEDIUM', order: 7 },
  { modelName: 'CRYPTON 100', yearFrom: 1997, yearTo: 2015, component: 'Retentores de bengala dianteira', intervalKm: null, intervalMonths: 24, notes: 'Comum em unidades muito antigas.', priority: 'LOW', order: 8 },

  // FLUO
  { modelName: 'FLUO', yearFrom: 2020, yearTo: null, component: 'Óleo do motor 10W-30/10W-40 (confirme no manual)', intervalKm: 6000, intervalMonths: 6, notes: 'JASO MA. Yamalube 10W-40 recomendado.', priority: 'HIGH', order: 1 },
  { modelName: 'FLUO', yearFrom: 2020, yearTo: null, component: 'Óleo da caixa de transmissão final (redutora CVT)', intervalKm: 18000, intervalMonths: 24, notes: 'Item separado do óleo do motor.', priority: 'MEDIUM', order: 2 },
  { modelName: 'FLUO', yearFrom: 2020, yearTo: null, component: 'Vela (confirmar código pelo ano)', intervalKm: 9000, intervalMonths: null, notes: 'Faixa NGK CPR ou similar.', priority: 'MEDIUM', order: 3 },
  { modelName: 'FLUO', yearFrom: 2020, yearTo: null, component: 'Correia da CVT', intervalKm: 16500, intervalMonths: null, notes: 'Inspecionar a partir de 10.000 km.', priority: 'HIGH', order: 4 },
  { modelName: 'FLUO', yearFrom: 2020, yearTo: null, component: 'Jogo de roletes do variador', intervalKm: 16500, intervalMonths: null, notes: 'Trocar junto com a correia.', priority: 'MEDIUM', order: 5 },
  { modelName: 'FLUO', yearFrom: 2020, yearTo: null, component: 'Filtro de ar', intervalKm: 13500, intervalMonths: 12, notes: 'Inspecionar a cada 6.000 km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'FLUO', yearFrom: 2020, yearTo: null, component: 'Pastilhas de freio', intervalKm: 19000, intervalMonths: null, notes: 'Inspecionar a partir de 10.000 km.', priority: 'MEDIUM', order: 7 },
  { modelName: 'FLUO', yearFrom: 2020, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 8 },

  // NEO
  { modelName: 'NEO', yearFrom: 2005, yearTo: null, component: 'Óleo do motor 10W-40 API SJ (cárter 0,85L)', intervalKm: 6000, intervalMonths: 6, notes: 'JASO MA.', priority: 'HIGH', order: 1 },
  { modelName: 'NEO', yearFrom: 2005, yearTo: null, component: 'Óleo da caixa de transmissão final (redutora CVT)', intervalKm: 18000, intervalMonths: 24, notes: 'Item separado do óleo do motor.', priority: 'MEDIUM', order: 2 },
  { modelName: 'NEO', yearFrom: 2005, yearTo: null, component: 'Vela (confirmar código pela cilindrada/ano — 115cc ou 125cc)', intervalKm: 8000, intervalMonths: null, notes: 'Especificação pode variar entre 115cc e 125cc.', priority: 'MEDIUM', order: 3 },
  { modelName: 'NEO', yearFrom: 2005, yearTo: null, component: 'Correia da CVT', intervalKm: 16500, intervalMonths: null, notes: 'Inspecionar a partir de 10.000 km.', priority: 'HIGH', order: 4 },
  { modelName: 'NEO', yearFrom: 2005, yearTo: null, component: 'Jogo de roletes do variador', intervalKm: 16500, intervalMonths: null, notes: 'Trocar junto com a correia.', priority: 'MEDIUM', order: 5 },
  { modelName: 'NEO', yearFrom: 2005, yearTo: null, component: 'Filtro de ar', intervalKm: 13500, intervalMonths: 12, notes: 'Inspecionar a cada 6.000 km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'NEO', yearFrom: 2005, yearTo: null, component: 'Pastilhas/lonas de freio', intervalKm: 16500, intervalMonths: null, notes: 'Depende da versão (disco ou tambor).', priority: 'MEDIUM', order: 7 },
  { modelName: 'NEO', yearFrom: 2005, yearTo: null, component: 'Fluido de freio DOT 4 (se dianteiro a disco)', intervalKm: null, intervalMonths: 24, notes: 'Conforme versão/ano.', priority: 'MEDIUM', order: 8 },

  // NEOS CONNECTED (elétrica — sem óleo/vela/filtro/correia)
  { modelName: 'NEOS CONNECTED', yearFrom: 2025, yearTo: null, component: 'Gerenciamento de carga da bateria (20-80% no dia a dia)', intervalKm: null, intervalMonths: null, notes: 'Evitar descargas completas frequentes preserva a vida útil das células.', priority: 'HIGH', order: 1 },
  { modelName: 'NEOS CONNECTED', yearFrom: 2025, yearTo: null, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: null, notes: 'Verificar semanalmente — impacta diretamente a autonomia.', priority: 'HIGH', order: 2 },
  { modelName: 'NEOS CONNECTED', yearFrom: 2025, yearTo: null, component: 'Pastilhas/lonas de freio', intervalKm: 6000, intervalMonths: null, notes: 'Inspeção regular mesmo sem motor a combustão.', priority: 'MEDIUM', order: 3 },
  { modelName: 'NEOS CONNECTED', yearFrom: 2025, yearTo: null, component: 'Suspensão e rolamentos de roda', intervalKm: 12000, intervalMonths: 12, notes: 'Inspeção visual e de folga.', priority: 'MEDIUM', order: 4 },
  { modelName: 'NEOS CONNECTED', yearFrom: 2025, yearTo: null, component: 'Fluido de freio DOT 4 (se freio a disco)', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório se equipada com freio hidráulico.', priority: 'HIGH', order: 5 },
  { modelName: 'NEOS CONNECTED', yearFrom: 2025, yearTo: null, component: 'Atualização de firmware via app Y-Connect', intervalKm: null, intervalMonths: null, notes: 'Conforme notificação — gerenciamento de bateria e motor.', priority: 'MEDIUM', order: 6 },
  { modelName: 'NEOS CONNECTED', yearFrom: 2025, yearTo: null, component: 'Avaliação da capacidade da bateria em concessionária', intervalKm: null, intervalMonths: 12, notes: 'A partir do 3º ano de uso, para acompanhar degradação natural.', priority: 'MEDIUM', order: 7 },

  // AXIS
  { modelName: 'AXIS', yearFrom: 1990, yearTo: 2000, component: 'Mistura de óleo 2T na proporção correta', intervalKm: null, intervalMonths: null, notes: 'Verificar antes de cada abastecimento se sistema manual.', priority: 'CRITICAL', order: 1 },
  { modelName: 'AXIS', yearFrom: 1990, yearTo: 2000, component: 'Vela (inspeção — motor 2T suja rápido)', intervalKm: 1800, intervalMonths: null, notes: 'Inspecionar a cada 1.500-2.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'AXIS', yearFrom: 1990, yearTo: 2000, component: 'Revisão do carburador', intervalKm: 3000, intervalMonths: 12, notes: 'Motor pequeno sensível a etanol degradado.', priority: 'MEDIUM', order: 3 },
  { modelName: 'AXIS', yearFrom: 1990, yearTo: 2000, component: 'Lonas de freio (tambor dianteiro e traseiro)', intervalKm: 5000, intervalMonths: 24, notes: 'Endurece com a idade mesmo com pouco uso.', priority: 'MEDIUM', order: 4 },
  { modelName: 'AXIS', yearFrom: 1990, yearTo: 2000, component: 'Inspeção do chicote elétrico (fiação ressecada)', intervalKm: null, intervalMonths: 12, notes: 'Moto com décadas de idade — fiação original ressecada é esperada.', priority: 'MEDIUM', order: 5 },

  // BW S
  { modelName: 'BW S', yearFrom: 1995, yearTo: 2010, component: 'Nível do reservatório de óleo 2T (se sistema automático)', intervalKm: null, intervalMonths: null, notes: 'Verificar a cada abastecimento — risco de fundir motor.', priority: 'CRITICAL', order: 1 },
  { modelName: 'BW S', yearFrom: 1995, yearTo: 2010, component: 'Vela (inspeção — motor 2T suja rápido)', intervalKm: 1800, intervalMonths: null, notes: 'Inspecionar a cada 1.500-2.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'BW S', yearFrom: 1995, yearTo: 2010, component: 'Correia da CVT', intervalKm: 9000, intervalMonths: null, notes: 'Inspecionar a partir de 8.000 km.', priority: 'HIGH', order: 3 },
  { modelName: 'BW S', yearFrom: 1995, yearTo: 2010, component: 'Limpeza do carburador', intervalKm: 5500, intervalMonths: 12, notes: 'Preventiva ou por sintoma de marcha lenta instável.', priority: 'MEDIUM', order: 4 },
  { modelName: 'BW S', yearFrom: 1995, yearTo: 2010, component: 'Mangueiras de combustível e óleo 2T — inspeção', intervalKm: null, intervalMonths: 24, notes: 'Ressecamento pelo etanol e pela idade.', priority: 'HIGH', order: 5 },
  { modelName: 'BW S', yearFrom: 1995, yearTo: 2010, component: 'Inspeção do sistema elétrico (conectores)', intervalKm: null, intervalMonths: 12, notes: 'Oxidação comum em unidades antigas.', priority: 'LOW', order: 6 },

  // JOG
  { modelName: 'JOG', yearFrom: 1990, yearTo: 2010, component: 'Nível do reservatório de óleo 2T (se sistema automático)', intervalKm: null, intervalMonths: null, notes: 'Verificar a cada abastecimento — risco de fundir motor.', priority: 'CRITICAL', order: 1 },
  { modelName: 'JOG', yearFrom: 1990, yearTo: 2010, component: 'Vela (inspeção — motor 2T suja rápido)', intervalKm: 1800, intervalMonths: null, notes: 'Inspecionar a cada 1.500-2.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'JOG', yearFrom: 1990, yearTo: 2010, component: 'Correia da CVT', intervalKm: 9000, intervalMonths: null, notes: 'Inspecionar a partir de 8.000 km.', priority: 'HIGH', order: 3 },
  { modelName: 'JOG', yearFrom: 1990, yearTo: 2010, component: 'Limpeza do carburador', intervalKm: 5500, intervalMonths: 12, notes: 'Preventiva ou por sintoma.', priority: 'MEDIUM', order: 4 },
  { modelName: 'JOG', yearFrom: 1990, yearTo: 2010, component: 'Lonas de freio (tambor)', intervalKm: 5000, intervalMonths: 24, notes: 'Endurece com a idade mesmo com pouco uso.', priority: 'MEDIUM', order: 5 },
  { modelName: 'JOG', yearFrom: 1990, yearTo: 2010, component: 'Inspeção do sistema elétrico e mangueiras', intervalKm: null, intervalMonths: 12, notes: 'Fiação e mangueiras ressecadas pela idade.', priority: 'LOW', order: 6 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🛵 Seed Yamaha Scooters (NMAX, XMAX, T115 Crypton, Crypton 100, Fluo, Neo, Neo\'s Connected, Axis, BW\'s, Jog)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Yamaha', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'Yamaha', vehicleTypeId: motoType.id },
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

  console.log('✅ Yamaha Scooters concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
