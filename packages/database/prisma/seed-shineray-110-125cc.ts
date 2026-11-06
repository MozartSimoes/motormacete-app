/**
 * Seed Shineray 110-125cc — macetes, problemas e manutenção
 * Cobre a linha urbana de baixa cilindrada da Shineray no Brasil (montagem em Manaus/AM)
 *
 * Motores: monocilíndrico 4 tempos, arrefecido a ar, SOHC 2 válvulas — arquitetura clone do
 * clássico Honda Wave/Dream 110/CG125, amplamente replicada por fabricantes chineses (Lifan,
 * Zongshen, Loncin) e vendida no Brasil sob dezenas de marcas. Isso significa altíssima
 * intercambialidade de peças de motor (pistão, anéis, biela, junta de cabeçote, corrente de
 * comando) com outras 110-125cc chinesas — informação de alto valor para o dono, citada em
 * várias dicas abaixo.
 *
 * Problemas recorrentes típicos desta classe de motor no Brasil: carburador engomando com
 * etanol degradado (E22-E27 nacional oxida e cristaliza no jiclê em poucas semanas parado),
 * falhas de CDI e regulador retificador (componentes elétricos de qualidade inferior — maior
 * causa de moto "não pega"/bateria não carrega), desgaste de corrente/relação em uso urbano
 * parar-e-andar, embreagem e lonas de freio a tambor com vida curta em trânsito pesado, e
 * sistema de iluminação/carga fraco (bobina de estator dimensionada no limite).
 *
 * IMPORTANTE — números exatos de fábrica (potência, torque, capacidades exatas de óleo) não
 * são publicados de forma consistente pela Shineray para toda a linha; os valores usados aqui
 * são estimativas realistas e internamente consistentes para motores desta classe/cilindrada,
 * sinalizadas como aproximação no texto quando aplicável — não foram inventados números
 * implausíveis.
 *
 * ─── Estratégia de modelName e casamento por substring (LEIA ANTES DE EDITAR) ──────────────
 * O site casa o nome FIPE do veículo do usuário contra os `modelName` salvos usando regex de
 * borda de palavra: `new RegExp('\\b' + storedName + '\\b', 'i').test(fipeName)` — e UNE os
 * resultados de todos os `modelName` que derem match. Isso é usado deliberadamente aqui:
 *
 *   - `XY 125 JET` (nome FIPE `XY 125 JET`) também casa como substring dentro de
 *     `XY 125 JET SS` e `XY 125 JET SS EFI` (ambos contêm literalmente "XY 125 JET" seguido de
 *     espaço). Por isso, todo o conteúdo UNIVERSAL da família JET (motor 125cc carburado
 *     compartilhado, carburador, corrente, elétrica básica, cronograma-base) fica sob o
 *     modelName plano `XY 125 JET`. Os modelNames mais específicos `XY 125 JET SS` e
 *     `XY 125 JET SS EFI` trazem APENAS o conteúdo que os diferencia (styling/suspensão
 *     esportiva da SS; injeção eletrônica da SS EFI) — o usuário dessas duas variantes recebe
 *     a união dos dois blocos automaticamente, sem duplicar texto idêntico 3 vezes.
 *   - `XY 110V WAVE`, `XY 125 NEW WAVE`, `XY 125 RIO EFI`, `XY 125-14 ESD` e `WORKER 125` não
 *     compartilham prefixo entre si nem com a família JET — cada um recebe conteúdo completo e
 *     independente (5-7 MACETES, 4-6 PROBLEMAS, 1 MANUTENCAO).
 *
 * Execute: pnpm --filter @motormacete/database db:seed:shineray-110-125cc
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

// ─── XY 110V WAVE ──────────────────────────────────────────────────────────────
// Motor: ~109cc SOHC ar, carburado (PZ19), câmbio semi-automático 4 marchas em roseta
// (N-1-2-3-4-N, sem alavanca de embreagem — igual à Honda Wave/Dream). Freios a tambor.
// Pneus estimados: 2.50-17 (D) / 80/90-17 (T). Corrente 428.

const WAVE110_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — a embreagem semi-automática é úmida, nunca use JASO MB',
    body: 'A XY 110V WAVE tem câmbio semi-automático (sem alavanca de embreagem), mas a embreagem centrífuga continua imersa no mesmo óleo do motor — por isso é obrigatório óleo JASO MA (nunca MB, que tem aditivo de fricção reduzida e faz a embreagem escorregar/patinar nas trocas de marcha). Capacidade estimada: 0,8L. Use 20W-50 mineral ou semissintético: Lubrax Moto 4T, Shell Advance 4T. Troca a cada 1.500-2.000 km — intervalo curto compensa a qualidade metalúrgica mais simples do motor clone chinês.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio em roseta (N-1-2-3-4-N): erro clássico de quem troca de moto com embreagem',
    body: 'Quem vem de moto com alavanca de embreagem tende a "pisar em falso" nas primeiras semanas na Wave 110V — o câmbio é sequencial em roseta e fecha o ciclo (4ª marcha para neutro é preciso passar por todas de novo, não existe atalho). Solte o acelerador ao trocar de marcha para não forçar a embreagem centrífuga. Trocar de marcha em rotação muito alta acelera o desgaste dos calços da embreosa centrífuga — troque por volta de 4.000-5.000 rpm no uso urbano.',
  },
  {
    severity: 'OK',
    title: 'Carburador PZ19: limpeza preventiva a cada 3 meses evita entupimento por etanol',
    body: 'O carburador PZ19 (corpo pequeno, típico de motores 100-110cc chineses) tem jiclês muito finos — o etanol nacional (E22-E27) que degrada em contato com o ar forma verniz/goma que entope rapidamente, principalmente se a moto fica parada mais de 3-4 semanas. Sintoma: marcha lenta que sobe sozinha, engasgo na retomada, dificuldade de pegar a frio. Limpeza com spray de carburador e ar comprimido resolve a maioria dos casos — R$ 30-60 em oficina de bairro. Evite deixar o tanque com pouco combustível parado por longos períodos.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA gap 0,6-0,7mm — peça baratíssima e universal na linha 100-125cc chinesa',
    body: 'A vela NGK C7HSA (ou equivalente Champion Z9Y) é usada em praticamente toda a linha de motores clone 100-125cc vendida no Brasil (Shineray, Sundown, Haojue, Jonny, Kasinski Comet 150 antiga). Gap: 0,6-0,7mm. Custo: R$ 10-20. Troque a cada 6.000-8.000 km — vela gasta nesse motor pequeno já derruba consumo em 10-15%.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428: motor clone Wave — peças de transmissão intercambiáveis com várias marcas',
    body: 'A relação de transmissão da XY 110V WAVE (corrente 428, pinhão e coroa) é dimensionalmente igual à usada em outras 110cc clone Wave vendidas no Brasil. Se não achar o kit com o nome Shineray no balcão, peça "kit relação 428 para Wave/Dream 110cc chinesa" — praticamente todo distribuidor de peças para motos populares tem em estoque genérico, custando bem menos que peça de marca. Lubrifique a cada 500 km — dobra a vida útil da corrente original.',
  },
  {
    severity: 'WARN',
    title: 'Afogador (choke) manual: use e desligue no momento certo',
    body: 'A XY 110V WAVE usa afogador manual (alavanca ou botão no carburador) para partida a frio — não confunda com moto de injeção que não precisa dele. Deixe acionado só até o motor pegar e aquecer ~30-60 segundos; desligar tarde demais afoga a vela e suja o carburador com combustível não queimado, encurtando a vida útil da vela e formando fuligem no escapamento.',
  },
]

const WAVE110_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI: causa mais comum de "moto não pega do nada" nesta faixa de motor',
    body: 'O CDI (módulo de ignição eletrônica) é o componente elétrico com maior taxa de falha em motos chinesas 100-125cc — incluindo a linha Shineray. Sintoma: moto simplesmente não dá faísca, geralmente sem aviso prévio (às vezes falhas intermitentes antes de parar de vez). Custo do CDI genérico compatível: R$ 40-90 no Mercado Livre/lojas de peças para motos populares — verifique a pinagem (a maioria é 5 ou 6 pinos) antes de comprar. Leve o CDI antigo como referência.',
  },
  {
    severity: 'WARN',
    title: 'Regulador retificador: falha faz a bateria não carregar (ou sobrecarrega e mata a bateria)',
    body: 'Sintoma clássico: farol fraco, buzina fraca, moto que só pega no tranco/empurrão porque a bateria está descarregada mesmo rodando bastante. Meça a tensão na bateria com o motor a 3.000-4.000 rpm: deve ficar entre 13,5-14,8V. Abaixo disso, o retificador não está carregando; muito acima (acima de 15V), ele está sobrecarregando e vai fritar a bateria em poucas semanas. Peça genérica compatível: R$ 35-70.',
  },
  {
    severity: 'WARN',
    title: 'Lonas de freio a tambor gastam rápido em trânsito urbano parar-e-anda',
    body: 'O sistema de freio a tambor (dianteiro e traseiro) da XY 110V WAVE é simples e eficiente, mas em uso urbano intenso (motoboy, entregador) as lonas desgastam visivelmente antes dos 6.000 km. Sintoma de lona no limite: necessidade de puxar mais a manete/pedal para frear, ruído metálico. Regule o cabo do freio a cada abastecimento — a folga correta evita desgaste desigual. Lona genérica: R$ 15-30 o jogo.',
  },
  {
    severity: 'WARN',
    title: 'Conectores elétricos de baixa qualidade oxidam — sintomas elétricos "fantasmas"',
    body: 'O chicote elétrico usa conectores simples que oxidam em climas úmidos, causando pisca intermitente, luz de freio que falha, buzina que corta. Antes de suspeitar de peça queimada, limpe os conectores acessíveis com spray de contato elétrico (WD-40 Contato ou similar) e aplique graxa dielétrica nos terminais — resolve boa parte dos "problemas elétricos misteriosos" sem trocar peça nenhuma.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela junta da tampa do motor após ~15.000-20.000 km',
    body: 'A junta da tampa lateral do motor (lado da embreagem centrífuga) pode endurecer e vazar após uso prolongado, especialmente se o motor já superaqueceu alguma vez. Sintoma: mancha de óleo na parte baixa do motor, nível de óleo caindo sem explicação. Troca da junta é serviço simples e barato (R$ 10-25 em peça + mão de obra) — não adie, óleo baixo acelera desgaste do virabrequim e da embreagem.',
  },
]

const WAVE110_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 110V WAVE: intervalos curtos compensam a simplicidade do motor',
    body: '500 km — Primeira troca de óleo (rodagem). | 1.500 km — Troca de óleo (20W-50 JASO MA, ~0,8L) + verificação geral. | 3.000 km — Troca de óleo + limpeza do carburador PZ19 + lubrificação da corrente 428. | 6.000 km — Vela NGK C7HSA nova + filtro de ar (limpeza se for espuma, troca se for papel) + regulagem de folga de válvulas (admissão ~0,05mm / escape ~0,08mm, motor frio). | 9.000 km — Óleo + verificação de lonas de freio dianteira/traseira. | 12.000 km — Kit relação (corrente + pinhão + coroa) se desgastado + verificação do CDI/retificador (tensão de carga 13,5-14,8V a 3.000-4.000 rpm). Repita o ciclo a partir dos 6.000 km. Sempre com o motor frio para folga de válvulas e sempre com óleo morno para troca (escoa melhor).',
  },
]

// ─── XY 125 JET (base — conteúdo universal da família JET) ────────────────────
// Motor: ~124,7cc SOHC ar, carburado (PZ22), câmbio manual 5 marchas, embreagem multidisco
// úmida. Freio dianteiro a disco / traseiro a tambor (comum nesta faixa). Pneus: 2.75-18 (D) /
// 90/90-18 (T). Corrente 428H.

const JET125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor clone CG125: peças de motor intercambiáveis com dezenas de marcas chinesas',
    body: 'O bloco 124,7cc SOHC 2 válvulas da XY 125 JET segue a mesma arquitetura básica do clone chinês do motor Honda CG125 — usada por Haojue, Sundown, Jonny, Bull, entre outras. Isso significa que pistão (62mm), anéis, biela, junta do cabeçote e corrente de comando geralmente encontram equivalência genérica em qualquer distribuidora de peças para motos populares, mesmo sem achar a peça "de marca Shineray" no balcão — útil quando a peça original está em falta.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — cerca de 1,0-1,1L, troca a cada 2.000 km',
    body: 'Embreagem multidisco molhada, exige óleo JASO MA (nunca MB). Capacidade estimada com filtro/tela de óleo: 1,0-1,1L. Marcas populares adequadas: Lubrax Moto 4T 20W-50, Shell Advance 4T 20W-50, Motul 3000 20W-50. Intervalo recomendado: 2.000 km em uso urbano — mais curto que uma moto japonesa equivalente por causa das tolerâncias de fabricação mais largas do motor chinês.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ22: sintoma clássico de etanol degradado é marcha lenta instável',
    body: 'O PZ22 é sensível ao etanol nacional que oxida quando a moto passa semanas paradas — forma verniz que entope o jiclê principal e o de marcha lenta. Sinais: marcha lenta oscilando, engasgo na retomada, cheiro forte de combustível não queimado. Limpeza preventiva a cada 3-4 meses (ou sempre que a moto ficar parada mais de um mês) evita reparo maior. Jato principal aproximado: 98-102 (verificar a marcação gravada no corpo do jiclê antes de trocar).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA/D8HA — gap 0,6-0,7mm, troca a cada 6.000-8.000 km',
    body: 'Vela padrão da família de motores clone 125cc chinesa — barata (R$ 10-25) e fácil de achar em qualquer posto ou loja de autopeças, mesmo em cidade pequena. Verifique o gap a cada troca de óleo — vela fora do gap é causa comum de partida difícil a frio nesta faixa de motor.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428H e kit relação: lubrifique a cada 500 km para dobrar a vida útil',
    body: 'A corrente 428H (mais reforçada que a 428 simples da linha Wave 110) atende bem o motor 125cc de uso urbano/naked. Lubrificação a cada 500 km ou sempre que pegar chuva. Folga correta: 20-30mm no trecho inferior. Kit relação completo (corrente + pinhão 14T + coroa ~37-38T): R$ 60-140 em distribuidora de peças para motos populares — muito abaixo do preço de peça "de marca".',
  },
  {
    severity: 'WARN',
    title: 'Elétrica básica: CDI e regulador retificador são os pontos mais frágeis do conjunto',
    body: 'A JET compartilha a mesma fragilidade elétrica de praticamente toda a linha chinesa 110-125cc: CDI e regulador retificador de qualidade limitada. Antes de qualquer viagem mais longa, meça a tensão da bateria com o motor em marcha (3.000-4.000 rpm): 13,5-14,8V é a faixa saudável. Guarde o contato de um eletricista de motos popular na região — o diagnóstico e a troca dessas duas peças são baratos e rápidos quando feitos cedo.',
  },
]

const JET125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI: falha sem aviso é a reclamação elétrica mais comum da linha',
    body: 'Assim como na Wave 110V, o CDI é o item elétrico que mais falha na JET — moto perde a faísca e não volta a pegar, geralmente sem sintoma prévio claro. CDI genérico compatível (verificar pinagem, geralmente 5-6 pinos): R$ 40-90. Leve a peça antiga para garantir compatibilidade — existem variações de pinagem entre lotes de produção.',
  },
  {
    severity: 'WARN',
    title: 'Regulador retificador: bateria não carrega ou "estoura" de tanto carregar demais',
    body: 'Sintomas de retificador ruim: farol e buzina fracos com moto em marcha lenta, bateria que não segura carga, ou (no caso oposto) bateria estufando/vazando por sobrecarga. Meça sempre em marcha (3.000-4.000 rpm): 13,5-14,8V é saudável. Fora dessa faixa, troque o retificador (R$ 35-70) antes que ele danifique a bateria nova.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela tampa da embreagem em motores com mais de 15.000-20.000 km',
    body: 'A junta da tampa do lado da embreosa (embreagem manual multidisco) pode endurecer e vazar com o tempo, principalmente se o motor já rodou com nível de óleo baixo alguma vez. Sintoma: mancha de óleo na parte inferior/lateral do motor, corrente suja de óleo em excesso. Troca da junta: barata e rápida — não adie.',
  },
  {
    severity: 'WARN',
    title: 'Corrente e relação desgastam rápido em uso urbano de parar-e-andar constante',
    body: 'Trânsito de cidade grande com muitas acelerações e freadas desgasta a corrente e a coroa mais rápido do que uso rodoviário constante. Se sentir folga excessiva mesmo após regular a tensão, ou "salto" da corrente na coroa em marcha alta, é hora de trocar o kit completo — nunca troque só a corrente com coroa/pinhão gastos, isso destrói a corrente nova em poucos milhares de km.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem manual patinando: sintoma de óleo errado (JASO MB) ou disco gasto',
    body: 'Se a moto acelera o motor mas não ganha velocidade proporcional (embreagem "escorregando"), a primeira suspeita é óleo fora de especificação — JASO MB (ou óleo de carro comum) reduz o atrito da embreagem molhada. Troque para JASO MA imediatamente. Se persistir após a troca de óleo, os discos de embreagem estão gastos e precisam ser substituídos — peça genérica compatível com motor clone 125cc, custo moderado.',
  },
]

const JET125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma-base XY 125 JET (válido também para SS e SS EFI, que somam itens próprios)',
    body: '500 km — Troca de óleo inicial (rodagem). | 2.000 km — Troca de óleo (20W-50 JASO MA, ~1,0-1,1L) + lubrificação da corrente 428H. | 4.000 km — Troca de óleo + limpeza do carburador PZ22 (versão carburada) + verificação de folga de válvulas. | 6.000 km — Vela NGK C7HSA/D8HA nova + filtro de ar + regulagem de válvulas (adm ~0,05mm / esc ~0,08mm, motor frio). | 8.000 km — Óleo + inspeção de lonas/pastilhas de freio + tensão do retificador (13,5-14,8V a 3.000-4.000 rpm). | 12.000-15.000 km — Kit relação 428H completo se desgastado + fluido de freio (se disco) + retorque geral do motor. Repita o ciclo a cada 6.000-8.000 km a partir daí.',
  },
]

// ─── XY 125 JET SS (só o que a diferencia da JET base) ─────────────────────────

const JETSS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Versão SS: carenagem esportiva e rodas específicas — cuide dos encaixes plásticos',
    body: 'A JET SS traz carenagem lateral e frontal mais elaborada que a JET base — os encaixes plásticos (garras/pinos de fixação) são o ponto frágil em quedas leves ou lavagens com jato de alta pressão direto na junção das peças. Ao lavar, evite jato de alta pressão a menos de 30cm das frestas da carenagem. Se um pino quebrar, venda avulsa de clipes plásticos genéricos resolve sem precisar trocar a peça inteira.',
  },
  {
    severity: 'OK',
    title: 'Suspensão traseira dupla com pré-carga regulável: ajuste conforme o peso do piloto',
    body: 'A SS costuma trazer amortecedores traseiros duplos com pré-carga ajustável (anel de regulagem na base da mola) — diferente da JET base, mais básica. Para piloto solo (até ~75kg), regulagem mais baixa é suficiente; com garupa ou peso maior, aumente a pré-carga 1-2 posições para evitar que a moto "belisque" o para-lama em buracos.',
  },
  {
    severity: 'WARN',
    title: 'Freio a disco dianteiro: fluido e pastilhas exigem atenção que a JET a tambor não tem',
    body: 'Se a sua SS vier com disco dianteiro (verifique na ficha do seu exemplar — trims variam), troque o fluido de freio DOT 4 a cada 24 meses independentemente da quilometragem — ele absorve umidade do ar e perde eficiência mesmo sem uso. Pastilhas: inspecione a cada 6.000 km, espessura mínima de material de fricção ~1,5mm.',
  },
  {
    severity: 'OK',
    title: 'Todo o restante é igual à JET base — motor, carburador, corrente e elétrica compartilhados',
    body: 'Fora da estética, suspensão e eventual disco dianteiro, a SS usa o mesmo motor 124,7cc carburado, o mesmo CDI/retificador e a mesma corrente 428H da JET base. Siga as dicas de manutenção de motor, carburador e elétrica da XY 125 JET normalmente — elas se aplicam integralmente aqui.',
  },
]

const JETSS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Painel/instrumentação da SS: contatos do conta-giros ou luzes de indicação oxidam',
    body: 'A versão SS costuma trazer painel com mais informação (conta-giros, indicador de marcha em alguns lotes) — mais fiação = mais pontos de contato que podem oxidar. Painel "apagando" letras ou ponteiro travado geralmente é conector solto atrás do painel, não o instrumento em si. Abrir e limpar os conectores resolve a maioria dos casos antes de cogitar trocar o painel inteiro.',
  },
  {
    severity: 'WARN',
    title: 'Carenagem esportiva vibra e racha nos pontos de fixação com o tempo',
    body: 'Os pontos de fixação da carenagem na SS (parafusos + borrachas amortecedoras) podem ressecar e deixar a peça vibrar contra o chassi, criando rachaduras no plástico com o tempo. Verifique o aperto e o estado das borrachas a cada revisão — reforçar com um pouco de fita adesiva de dupla face nos pontos de contato evita a rachadura sem custo.',
  },
]

const JETSS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SS: use o da XY 125 JET base + itens específicos da versão esportiva',
    body: 'Siga integralmente o cronograma de óleo/carburador/corrente/vela da XY 125 JET base. Itens adicionais específicos da SS: a cada 6.000 km, inspecione as borrachas de fixação da carenagem; a cada 24 meses, troque o fluido de freio DOT 4 se sua unidade tiver disco dianteiro; ao notar a moto "fundo" em buracos com garupa, aumente 1-2 posições a pré-carga da suspensão traseira dupla.',
  },
]

// ─── XY 125 JET SS EFI (só o que a diferencia — injeção eletrônica) ────────────

const JETSSEFI_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Injeção eletrônica: sem carburador para engomar, mas exige gasolina de qualidade e bateria em dia',
    body: 'A JET SS EFI troca o carburador PZ22 por corpo de borboleta com injetor eletrônico — acaba o problema de goma de etanol no jiclê, mas a bomba de combustível (dentro do tanque) e o injetor são sensíveis a gasolina adulterada ou com água. Abasteça em postos de confiança e evite rodar com o tanque quase vazio (a bomba refrigera-se com o próprio combustível — rodar seco demais reduz a vida útil dela).',
  },
  {
    severity: 'WARN',
    title: 'ECU depende de bateria saudável — partida difícil a frio geralmente é tensão baixa, não bico entupido',
    body: 'Diferente do carburador, a EFI precisa de tensão elétrica estável para a ECU controlar a injeção corretamente. Bateria fraca (abaixo de 12V em repouso) causa partida difícil, marcha lenta instável ou luz de injeção piscando — antes de suspeitar do bico injetor ou sensor, meça a bateria. Bateria selada compatível (5-6Ah): mantenha sempre carregada, principalmente se a moto ficar parada por semanas.',
  },
  {
    severity: 'OK',
    title: 'Filtro de combustível: item novo que a versão carburada não tinha — troque periodicamente',
    body: 'A linha EFI tem filtro de combustível (em geral embutido no conjunto da bomba, dentro do tanque, ou inline na linha) que a versão carburada da JET/SS não possui. Combustível de má procedência entope esse filtro mais rápido — sintoma: perda de potência progressiva, engasgo em aceleração plena. Troca em oficina especializada em injeção eletrônica de motos populares.',
  },
  {
    severity: 'OK',
    title: 'Scanner genérico resolve boa parte do diagnóstico sem ir à concessionária',
    body: 'Muitas EFIs de motos populares chinesas usam protocolo compatível com scanners genéricos de motocicleta (não confundir com scanner automotivo OBD2 de carro — é preciso um scanner específico para moto ou adaptador reconhecido pela oficina). Mecânicos que atendem linha popular de injeção eletrônica (Sundown, Haojue, Shineray EFI) costumam ter essa ferramenta — vale procurar antes de levar à rede autorizada.',
  },
]

const JETSSEFI_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bomba de combustível: falha é a reclamação mais comum da linha EFI popular',
    body: 'A bomba de combustível dentro do tanque é o item elétrico de injeção que mais falha nesta classe de moto — sintoma: moto não pega (dá partida mas não pega), ou perde força e morre em marcha. Rodar com o tanque frequentemente quase vazio acelera o desgaste (a bomba super-aquece sem combustível suficiente ao redor para dissipar calor). Custo da bomba compatível: moderado, disponível em oficinas especializadas em EFI popular.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de posição da borboleta (TPS) ou de rotação (CKP): defeito gera marcha lenta instável',
    body: 'Falhas nesses dois sensores causam sintomas parecidos com carburador desregulado: marcha lenta oscilando, engasgo, luz de injeção acesa no painel (se o modelo tiver). Diagnóstico correto exige scanner — trocar peça "no chute" sem diagnóstico é desperdício de dinheiro nesta linha. Procure oficina com scanner específico para moto popular EFI.',
  },
]

const JETSSEFI_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SS EFI: base da JET (menos o carburador) + itens exclusivos de injeção',
    body: 'Siga o cronograma de óleo/corrente/vela/válvulas da XY 125 JET base — mas ignore os itens de limpeza de carburador (não existe carburador nesta versão). Itens exclusivos da EFI: a cada 10.000-12.000 km, troque o filtro de combustível; a cada revisão, meça a tensão da bateria em repouso (mínimo 12,0V) e em marcha (13,5-14,8V); ao notar perda de potência progressiva, leve a scanner antes de trocar peça.',
  },
]

// ─── XY 125 NEW WAVE ─────────────────────────────────────────────────────────
// Motor: ~124,7cc SOHC ar, carburado (PZ22), câmbio semi-automático 4 marchas em roseta
// (evolução da linha Wave, agora em 125cc). Freios a tambor ou disco dianteiro conforme lote.
// Pneus: 2.50-17 (D) / 80/90-17 (T). Corrente 428.

const NEWWAVE125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Evolução da Wave 110 em 125cc: mesma lógica de câmbio semi-automático, mais torque',
    body: 'A XY 125 NEW WAVE mantém o câmbio semi-automático em roseta (N-1-2-3-4-N, sem alavanca de embreagem) da linha Wave, só que com motor 124,7cc — mais torque em baixa que a 110V, ideal para quem carrega peso (entrega, garupa frequente) sem perder a praticidade de não usar embreagem no trânsito parado.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — ~1,0L, troca a cada 2.000 km',
    body: 'Embreagem centrífuga molhada exige JASO MA (nunca MB — faz a embreagem escorregar nas trocas). Capacidade estimada: ~1,0L. Marcas populares adequadas: Lubrax Moto 4T, Shell Advance 4T 20W-50. Troque a cada 2.000 km em uso urbano intenso.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ22: mesma vulnerabilidade ao etanol degradado da linha JET',
    body: 'Marcha lenta instável e engasgo na retomada são sinais de jiclê entupido por goma de etanol oxidado — mais comum quando a moto passa semanas paradas. Limpeza preventiva a cada 3-4 meses evita reparo maior. Se possível, não deixe o tanque com pouco combustível por longos períodos parada.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA/D8HA gap 0,6-0,7mm — troca a cada 6.000-8.000 km',
    body: 'Vela genérica de baixo custo (R$ 10-25), compatível com toda a família de motores clone 110-125cc chineses vendida no Brasil. Verifique o gap a cada troca de óleo.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 e kit relação — lubrificação a cada 500 km',
    body: 'Mesma lógica da Wave 110V: lubrificação frequente (a cada 500 km ou após chuva) dobra a vida útil da corrente original. Folga correta: 20-30mm no trecho inferior. Kit relação genérico compatível com linha Wave chinesa: custo acessível em qualquer distribuidora de peças populares.',
  },
  {
    severity: 'OK',
    title: 'Uso com carga/garupa constante: prefira trocas de marcha mais suaves para poupar a embreagem',
    body: 'Como a New Wave 125 é comum em uso de entrega (motor maior que a 110 favorece isso), evite "acelerar fundo e soltar rápido" nas trocas — isso sobrecarrega os calços da embreagem centrífuga, que já trabalham mais por causa do peso extra transportado. Trocas suaves aumentam significativamente a vida útil da embreagem nesse tipo de uso intenso.',
  },
]

const NEWWAVE125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e regulador retificador: mesma fragilidade elétrica de toda a linha Shineray 110-125',
    body: 'Falha de CDI (moto perde a faísca sem aviso) e de regulador retificador (bateria não carrega ou farol/buzina fracos) são as reclamações elétricas mais comuns também na New Wave 125. Meça a tensão em marcha (3.000-4.000 rpm): 13,5-14,8V é saudável. CDI e retificador genéricos compatíveis custam pouco e resolvem a maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem centrífuga desgasta mais rápido em uso de entrega com carga frequente',
    body: 'Em uso comercial (entrega, moto-táxi), os calços da embreagem centrífuga da New Wave 125 desgastam antes do previsto — sintoma: a moto "patina" ao acelerar do zero, demora a pegar embalo. Verifique a cada revisão se há vibração ou atraso na resposta ao acelerador a partir do ponto morto.',
  },
  {
    severity: 'WARN',
    title: 'Lonas de freio a tambor gastam rápido carregando peso extra',
    body: 'Com uso de carga/garupa frequente, as lonas de freio a tambor (dianteira e traseira, conforme configuração) desgastam mais rápido que em uso solo. Regule o cabo do freio periodicamente e troque as lonas ao notar necessidade de puxar mais o pedal/manete.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela tampa do motor após uso intenso prolongado',
    body: 'Assim como na Wave 110V, a junta da tampa lateral do motor pode endurecer e vazar após muitos km em uso intenso, principalmente se o motor já rodou alguma vez com nível de óleo baixo. Troca de junta é serviço barato — não adie ao notar mancha de óleo.',
  },
]

const NEWWAVE125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 125 NEW WAVE: intervalos curtos, foco em uso de carga/entrega',
    body: '500 km — Troca de óleo inicial (rodagem). | 2.000 km — Óleo (20W-50 JASO MA, ~1,0L) + lubrificação da corrente 428. | 4.000 km — Óleo + limpeza do carburador PZ22 + verificação da embreagem centrífuga (resposta à retomada). | 6.000 km — Vela NGK C7HSA/D8HA + filtro de ar + folga de válvulas (motor frio). | 8.000 km — Óleo + inspeção de lonas de freio dianteira/traseira + tensão do retificador. | 12.000 km — Kit relação se desgastado + revisão geral do CDI/retificador. Em uso comercial intenso (entrega), reduza todos os intervalos em cerca de 20-30%.',
  },
]

// ─── XY 125 RIO EFI ──────────────────────────────────────────────────────────
// Motor: ~124,7cc SOHC ar, injeção eletrônica (corpo de borboleta + bomba no tanque), câmbio
// manual 5 marchas. Freio dianteiro a disco / traseiro a tambor. Pneus: 2.75-18 (D) / 90/90-18
// (T). Corrente 428H.

const RIOEFI_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Injeção eletrônica de fábrica: sem carburador, mas exige gasolina limpa e bateria saudável',
    body: 'A RIO EFI já sai de fábrica com injeção eletrônica — resolve o problema clássico de carburador engomando com etanol degradado, mas transfere a atenção para a bomba de combustível (dentro do tanque) e para a saúde elétrica geral. Evite rodar com o tanque quase vazio (reduz a vida útil da bomba) e abasteça sempre em postos de confiança.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — ~1,0-1,1L, troca a cada 2.000-2.500 km',
    body: 'Embreagem manual multidisco molhada, exige JASO MA. Capacidade estimada: 1,0-1,1L. Marcas populares: Lubrax Moto 4T, Shell Advance 4T. A injeção não muda a exigência de óleo do motor — continue trocando no intervalo curto típico desta classe de motor.',
  },
  {
    severity: 'WARN',
    title: 'Bateria é peça crítica na EFI — sem carga estável, a ECU trabalha errado',
    body: 'Diferente de moto carburada, a RIO EFI depende de tensão elétrica estável para a central de injeção funcionar corretamente. Bateria fraca (abaixo de 12V em repouso) causa partida difícil, marcha lenta oscilando ou perda de potência — sintomas que facilmente são confundidos com problema de bico ou sensor. Meça a bateria antes de qualquer diagnóstico mais caro.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA/D8HA — gap 0,6-0,7mm, troca a cada 6.000-8.000 km',
    body: 'Vela padrão e barata, igual ao resto da linha Shineray 125cc. Verifique o gap a cada troca de óleo — vela fora do padrão em moto EFI pode gerar código de falha e acender luz de injeção mesmo sem defeito na parte eletrônica.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428H — lubrifique a cada 500 km, mesma lógica da JET',
    body: 'A RIO EFI compartilha a mesma robustez de transmissão da linha JET (corrente 428H). Lubrificação a cada 500 km, folga de 20-30mm no trecho inferior. Kit relação genérico compatível com motor clone 125cc chinês é fácil de achar em qualquer distribuidora de peças populares.',
  },
  {
    severity: 'OK',
    title: 'Filtro de combustível: troque periodicamente — item que a versão carburada não tem',
    body: 'A RIO EFI tem filtro de combustível no circuito de alimentação (geralmente integrado à bomba, dentro do tanque). Combustível de má procedência entope esse filtro mais rápido, causando perda de potência progressiva. Troca em oficina especializada em injeção de motos populares a cada 10.000-12.000 km.',
  },
]

const RIOEFI_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bomba de combustível: item elétrico que mais falha nesta linha EFI',
    body: 'Sintoma: moto dá partida mas não pega, ou perde força e morre em marcha. Rodar frequentemente com tanque quase vazio acelera o desgaste (a bomba se refrigera com o combustível ao redor). Substituição por peça compatível disponível em oficinas especializadas em EFI popular.',
  },
  {
    severity: 'WARN',
    title: 'Sensores TPS/CKP com defeito imitam sintoma de carburador desregulado (mas não é)',
    body: 'Marcha lenta instável ou engasgo em moto EFI quase nunca é "sujeira no bico" como muita gente ainda pensa por hábito de moto carburada — geralmente é sensor de posição da borboleta ou de rotação com leitura errada. Diagnóstico correto exige scanner específico para moto popular EFI — trocar peça no chute é desperdício.',
  },
  {
    severity: 'WARN',
    title: 'Regulador retificador: falha compromete a alimentação da própria ECU, não só a bateria',
    body: 'Na RIO EFI, um retificador com defeito é mais crítico que numa moto carburada, porque a instabilidade de tensão também afeta o funcionamento da central de injeção — não é só farol fraco. Meça sempre em marcha (3.000-4.000 rpm): 13,5-14,8V. Fora da faixa, troque antes que o problema afete a injeção.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela tampa da embreagem em motores com uso prolongado',
    body: 'Mesmo padrão de desgaste da linha JET: junta da tampa lateral do motor pode endurecer e vazar após 15.000-20.000 km. Sintoma: mancha de óleo, corrente suja de óleo em excesso. Troca de junta é serviço barato — não adie.',
  },
  {
    severity: 'WARN',
    title: 'Pastilhas de freio dianteiro (disco) e fluido DOT 4 precisam de atenção que o carburador não pedia',
    body: 'Como a RIO EFI vem com disco dianteiro, o fluido de freio DOT 4 precisa de troca bienal (absorve umidade mesmo sem uso) e as pastilhas inspeção a cada 6.000 km. É um item de manutenção que motos com freio a tambor puro não têm.',
  },
]

const RIOEFI_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 125 RIO EFI: sem carburador, com atenção extra à parte elétrica',
    body: '500 km — Troca de óleo inicial (rodagem). | 2.000-2.500 km — Óleo (20W-50 JASO MA, ~1,0-1,1L) + lubrificação da corrente 428H. | 6.000 km — Vela NGK C7HSA/D8HA + filtro de ar + verificação de folga de válvulas + inspeção de pastilhas de freio dianteiro. | 8.000 km — Óleo + tensão do retificador/bateria (13,5-14,8V em marcha, mín. 12,0V em repouso). | 10.000-12.000 km — Filtro de combustível + fluido de freio DOT 4 (a cada 24 meses, o que vier primeiro). | 15.000 km — Kit relação 428H se desgastado. Ao notar perda de potência ou marcha lenta instável, leve a scanner especializado em EFI popular antes de trocar peça.',
  },
]

// ─── XY 125-14 ESD ───────────────────────────────────────────────────────────
// "Electric Start Deluxe" — commuter econômica, carburada (PZ22), câmbio manual, freios a
// tambor nos dois eixos, partida elétrica + coturno (kick). Pneus: 2.75-18 (D) / 90/90-18 (T).
// Corrente 428.

const XY12514ESD_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Trim de entrada da linha 125cc: peças mais simples e baratas de repor',
    body: 'A XY 125-14 ESD é a configuração mais econômica da linha 125cc Shineray — freios a tambor nos dois eixos (sem disco), configuração elétrica mais simples. Isso é vantagem na hora da manutenção: todas as peças (lonas de freio, cabos, retentores) tendem a ser mais baratas e mais fáceis de achar do que versões com freio a disco ou EFI.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — ~1,0L, troca a cada 2.000 km',
    body: 'Mesma exigência de toda a linha: embreagem manual multidisco molhada precisa de JASO MA (nunca MB). Capacidade estimada: ~1,0L. Marcas populares: Lubrax Moto 4T, Shell Advance 4T 20W-50.',
  },
  {
    severity: 'WARN',
    title: 'Motor de arranque (partida elétrica): reserve o kick para quando a bateria estiver fraca',
    body: 'A "ESD" (Electric Start Deluxe) tem partida elétrica além do pedal de kick. O motor de arranque em motos econômicas desta faixa é dimensionado no limite — usar a partida elétrica com bateria fraca ou descarregada acelera o desgaste do motorzinho e do relé de partida. Se a bateria estiver enfraquecendo, prefira o kick até trocar/carregar a bateria, evitando forçar o motor de arranque.',
  },
  {
    severity: 'OK',
    title: 'Carburador PZ22 — mesma vulnerabilidade ao etanol da linha JET/RIO carburada',
    body: 'Limpeza preventiva a cada 3-4 meses evita entupimento por goma de etanol oxidado, principalmente se a moto passa temporadas paradas. Sintomas: marcha lenta oscilando, engasgo na retomada.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA/D8HA — gap 0,6-0,7mm, troca a cada 6.000-8.000 km',
    body: 'Vela padrão e barata da família de motores clone 125cc chinesa, fácil de achar em qualquer cidade.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 e freios a tambor: manutenção simples, ideal para quem quer custo baixo',
    body: 'Lubrifique a corrente a cada 500 km. Regule o cabo dos freios a tambor (dianteiro e traseiro) a cada abastecimento — a folga correta evita desgaste irregular das lonas. É a configuração mais barata de manter de toda a linha 125cc da marca.',
  },
]

const XY12514ESD_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor de arranque e relé de partida: item que mais falha nesta configuração de entrada',
    body: 'Por ser componente extra em relação a uma moto só-kick, o motor de arranque e o relé de partida da ESD são pontos de falha adicionais — sintoma: clique ao girar a chave mas o motor não gira, ou motor de arranque girando fraco mesmo com bateria boa. Solução temporária: use o kick. Peça de reposição (motor de arranque compatível com motor clone 125cc): custo moderado em oficina especializada.',
  },
  {
    severity: 'DANGER',
    title: 'CDI: mesma fragilidade elétrica de toda a linha — falha sem aviso',
    body: 'Igual às demais Shineray 110-125cc, o CDI é o item elétrico mais propenso a falhar sem sintoma prévio. CDI genérico compatível: R$ 40-90, verificando pinagem antes de comprar.',
  },
  {
    severity: 'WARN',
    title: 'Regulador retificador: bateria não carrega direito — comum quando a moto usa muito a partida elétrica',
    body: 'Como a ESD tem partida elétrica além do kick, o consumo de bateria é maior — um retificador fraco fica mais evidente aqui (bateria nunca recupera totalmente a carga). Meça em marcha: 13,5-14,8V é saudável.',
  },
  {
    severity: 'WARN',
    title: 'Lonas de freio a tambor (dianteira e traseira) gastam rápido em uso urbano',
    body: 'Sem disco dianteiro, toda a frenagem depende do tambor — em uso intenso, as lonas gastam mais rápido que em versões com disco. Regule o cabo periodicamente e troque ao notar necessidade de puxar mais a manete/pedal.',
  },
  {
    severity: 'WARN',
    title: 'Carburador entupido por etanol degradado é a causa mais comum de "moto não pega direito"',
    body: 'Antes de suspeitar de vela, CDI ou motor de arranque quando a moto está difícil de pegar, verifique o carburador — é a causa mais comum e mais barata de resolver nesta configuração carburada. Sintoma típico após temporada parada: precisa de vários tranços no kick para pegar.',
  },
]

const XY12514ESD_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XY 125-14 ESD: manutenção simples e barata, ideal para uso econômico',
    body: '500 km — Troca de óleo inicial (rodagem). | 2.000 km — Óleo (20W-50 JASO MA, ~1,0L) + lubrificação da corrente 428. | 4.000 km — Óleo + limpeza do carburador PZ22 + regulagem do cabo dos freios a tambor. | 6.000 km — Vela NGK C7HSA/D8HA + filtro de ar + folga de válvulas (motor frio). | 8.000 km — Óleo + inspeção de lonas de freio + tensão do retificador (13,5-14,8V em marcha) + teste do motor de arranque/relé. | 12.000 km — Kit relação se desgastado. Se a bateria enfraquecer entre revisões, prefira o kick à partida elétrica até resolver.',
  },
]

// ─── WORKER 125 ──────────────────────────────────────────────────────────────
// Motor: ~124,7cc SOHC ar, carburado (PZ22), câmbio manual 5 marchas — mesmo bloco da linha
// JET, mas com quadro/suspensão reforçados para uso de carga (entrega, utilitário). Bagageiro
// traseiro reforçado, pneu traseiro mais largo. Freios a tambor nos dois eixos (versões mais
// simples). Pneus: 2.75-18 (D) / 3.00-18 (T, estimado — mais largo pela carga). Corrente 428H.

const WORKER125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Feita para carga: respeite o limite de peso para não acelerar o desgaste de tudo',
    body: 'A WORKER 125 tem quadro e bagageiro traseiro reforçados para uso de entrega/utilitário, com capacidade de carga estimada em torno de 120-150kg somando piloto e carga (verifique a etiqueta/manual do seu exemplar). Rodar sistematicamente acima do limite acelera o desgaste de corrente, coroa, amortecedores traseiros e pneu — o motor 125cc é o mesmo da linha JET, mas o chassi é que foi reforçado para aguentar mais peso, não o motor em si.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428H e relação: troque o kit mais cedo do que numa moto sem carga',
    body: 'Com carga frequente, a corrente e a coroa da WORKER desgastam bem mais rápido que numa 125cc de uso solo — o intervalo do kit relação cai de ~15.000 km (uso leve) para 8.000-10.000 km em uso comercial intenso. Lubrifique a cada 500 km sem exceção — é a manutenção mais barata que evita a troca cara do kit completo antes da hora.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedores traseiros: monitore o afundamento com carga máxima',
    body: 'Os amortecedores traseiros da WORKER são calibrados de fábrica para uso com carga, mas ainda assim é o item de suspensão que mais sofre em entregas diárias com peso constante. Se a moto estiver "fundo" (batendo no batente) mesmo com carga dentro do limite, é hora de trocar por um par novo ou reforçado — amortecedor gasto transfere o impacto direto para a corrente, coroa e quadro.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 JASO MA — intervalo mais curto (1.500-2.000 km) pelo uso intenso',
    body: 'Motor clone CG125 igual ao da linha JET — embreagem manual multidisco molhada, exige JASO MA. Capacidade estimada: ~1,0-1,1L. Em uso comercial de entrega (motor trabalhando com carga o dia todo, muitas paradas/arrancadas), reduza o intervalo para 1.500-2.000 km em vez dos 2.000-2.500 km de uso leve.',
  },
  {
    severity: 'OK',
    title: 'Motor compartilhado com a linha JET: mesmas peças genéricas disponíveis',
    body: 'Como a WORKER 125 usa o mesmo bloco 124,7cc carburado da família JET, todas as dicas de carburador PZ22, vela NGK C7HSA/D8HA e elétrica básica (CDI, retificador) da XY 125 JET se aplicam integralmente aqui. A vantagem: peças de motor amplamente disponíveis e baratas mesmo fora de concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Freios a tambor: com carga extra, a distância de frenagem aumenta — regule sempre',
    body: 'Peso extra (carga + entregador) aumenta a distância de frenagem em relação a uma moto solo — mais um motivo para manter o cabo dos freios a tambor sempre bem regulado e trocar lonas ao primeiro sinal de desgaste, sem esperar "dar tempo".',
  },
  {
    severity: 'OK',
    title: 'Embreagem: trocas suaves poupam os discos em partidas com carga pesada',
    body: 'Arrancar com carga no bagageiro exige mais da embreagem manual — soltar a manete de forma abrupta com peso extra acelera o desgaste dos discos. Solte progressivamente, especialmente em rampas com carga máxima.',
  },
]

const WORKER125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Corrente e coroa: desgaste acelerado é a queixa mais comum de quem usa a WORKER para entrega',
    body: 'É o problema mais reportado por quem usa a WORKER comercialmente: corrente esticando e coroa "afiando" os dentes bem antes do esperado por causa do peso extra constante. A única prevenção eficaz é lubrificação rigorosa a cada 500 km e não ultrapassar sistematicamente o limite de carga.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedores traseiros afundando ou vazando óleo com uso de carga constante',
    body: 'Amortecedores baratos de fábrica podem começar a vazar óleo ou perder a firmeza antes dos 20.000 km em uso de carga diária pesada. Sintoma: moto "pulando" menos e afundando mais em buracos, para-lama batendo no pneu com carga. Substituição por par reforçado (aftermarket, com mola mais rígida) é comum entre quem usa a moto profissionalmente.',
  },
  {
    severity: 'WARN',
    title: 'Solda do bagageiro/suporte de carga pode trincar em caso de sobrecarga frequente',
    body: 'Ultrapassar repetidamente o limite de carga (por exemplo, transportando caixas muito acima do previsto) pode trincar os pontos de solda do bagageiro traseiro com o tempo. Inspecione visualmente o bagageiro a cada poucas semanas em uso comercial intenso — trinca pequena vira quebra total sem aviso se não for reforçada a tempo.',
  },
  {
    severity: 'DANGER',
    title: 'CDI e regulador retificador: mesma fragilidade elétrica da linha, agravada pelo uso constante',
    body: 'O uso comercial intenso (moto ligada o dia inteiro, muitas partidas e paradas) expõe mais a fragilidade do CDI e do retificador — falhas tendem a aparecer mais cedo do que em uso de lazer. Tenha sempre o contato de um eletricista de motos populares e considere levar peças reserva (CDI e retificador genéricos são baratos) se depender da moto para trabalhar.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem multidisco desgasta mais rápido com arrancadas frequentes sob carga',
    body: 'Partidas repetidas com peso no bagageiro (comum em rotas de entrega com muitas paradas) desgastam os discos de embreagem mais rápido que em uso leve. Sintoma: embreagem "patinando" ao acelerar com carga — verifique o óleo (deve ser JASO MA) antes de suspeitar dos discos.',
  },
]

const WORKER125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma WORKER 125: intervalos reduzidos para compensar o uso de carga constante',
    body: '500 km — Troca de óleo inicial (rodagem). | 1.500-2.000 km — Óleo (20W-50 JASO MA, ~1,0-1,1L) + lubrificação da corrente 428H (sem exceção, mesmo com pressa na rotina de entrega). | 4.000 km — Óleo + limpeza do carburador PZ22 + inspeção visual do bagageiro/solda. | 6.000 km — Vela NGK C7HSA/D8HA + filtro de ar + folga de válvulas + inspeção dos amortecedores traseiros (afundamento/vazamento). | 8.000 km — Óleo + inspeção de lonas de freio + tensão do retificador (13,5-14,8V em marcha). | 8.000-10.000 km — Kit relação 428H completo (intervalo reduzido pelo uso de carga, contra ~15.000 km em uso leve). Em uso comercial full-time, considere reduzir todos os intervalos acima em mais 20%.',
  },
]

// ─── Blocos de modelos ──────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'XY 110V WAVE',
    yearFrom: null,
    yearTo: null,
    MACETES: WAVE110_MACETES,
    PROBLEMAS: WAVE110_PROBLEMAS,
    MANUTENCAO: WAVE110_MANUTENCAO,
  },
  {
    modelName: 'XY 125 JET',
    yearFrom: null,
    yearTo: null,
    MACETES: JET125_MACETES,
    PROBLEMAS: JET125_PROBLEMAS,
    MANUTENCAO: JET125_MANUTENCAO,
  },
  {
    modelName: 'XY 125 JET SS',
    yearFrom: null,
    yearTo: null,
    MACETES: JETSS_MACETES,
    PROBLEMAS: JETSS_PROBLEMAS,
    MANUTENCAO: JETSS_MANUTENCAO,
  },
  {
    modelName: 'XY 125 JET SS EFI',
    yearFrom: null,
    yearTo: null,
    MACETES: JETSSEFI_MACETES,
    PROBLEMAS: JETSSEFI_PROBLEMAS,
    MANUTENCAO: JETSSEFI_MANUTENCAO,
  },
  {
    modelName: 'XY 125 NEW WAVE',
    yearFrom: null,
    yearTo: null,
    MACETES: NEWWAVE125_MACETES,
    PROBLEMAS: NEWWAVE125_PROBLEMAS,
    MANUTENCAO: NEWWAVE125_MANUTENCAO,
  },
  {
    modelName: 'XY 125 RIO EFI',
    yearFrom: null,
    yearTo: null,
    MACETES: RIOEFI_MACETES,
    PROBLEMAS: RIOEFI_PROBLEMAS,
    MANUTENCAO: RIOEFI_MANUTENCAO,
  },
  {
    modelName: 'XY 125-14 ESD',
    yearFrom: null,
    yearTo: null,
    MACETES: XY12514ESD_MACETES,
    PROBLEMAS: XY12514ESD_PROBLEMAS,
    MANUTENCAO: XY12514ESD_MANUTENCAO,
  },
  {
    modelName: 'WORKER 125',
    yearFrom: null,
    yearTo: null,
    MACETES: WORKER125_MACETES,
    PROBLEMAS: WORKER125_PROBLEMAS,
    MANUTENCAO: WORKER125_MANUTENCAO,
  },
]

// ─── Calibragem de pneus ──────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'XY 110V WAVE',
    yearFrom: null,
    yearTo: null,
    tireSize: 'Dianteiro 2.50-17 | Traseiro 80/90-17',
    frontPsi: 26,
    rearPsi: 30,
    frontPsiLoad: 26,
    rearPsiLoad: 33,
    notes: 'Solo: D 26 / T 30 PSI. Com garupa: D 26 / T 33 PSI. Medidas típicas da linha Wave 110cc chinesa — verifique sempre com pneus frios (moto parada há mais de 2h).',
  },
  {
    modelName: 'XY 125 JET',
    yearFrom: null,
    yearTo: null,
    tireSize: 'Dianteiro 2.75-18 | Traseiro 90/90-18',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 28,
    rearPsiLoad: 36,
    notes: 'Solo: D 28 / T 32 PSI. Com garupa: D 28 / T 36 PSI. Vale também para XY 125 JET SS e XY 125 JET SS EFI — mesma configuração de pneus da linha JET.',
  },
  {
    modelName: 'XY 125 JET SS',
    yearFrom: null,
    yearTo: null,
    tireSize: 'Dianteiro 2.75-18 | Traseiro 90/90-18',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 28,
    rearPsiLoad: 36,
    notes: 'Mesma configuração de pneus e pressões da XY 125 JET base. Solo: D 28 / T 32 PSI. Com garupa: D 28 / T 36 PSI.',
  },
  {
    modelName: 'XY 125 JET SS EFI',
    yearFrom: null,
    yearTo: null,
    tireSize: 'Dianteiro 2.75-18 | Traseiro 90/90-18',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 28,
    rearPsiLoad: 36,
    notes: 'Mesma configuração de pneus e pressões da XY 125 JET base — a injeção eletrônica não altera peso ou configuração de rodas.',
  },
  {
    modelName: 'XY 125 NEW WAVE',
    yearFrom: null,
    yearTo: null,
    tireSize: 'Dianteiro 2.50-17 | Traseiro 80/90-17',
    frontPsi: 27,
    rearPsi: 31,
    frontPsiLoad: 27,
    rearPsiLoad: 34,
    notes: 'Solo: D 27 / T 31 PSI. Com garupa/carga: D 27 / T 34 PSI. Motor 125cc mais pesado que a 110V — pressão traseira ligeiramente maior para compensar o peso extra em uso de entrega.',
  },
  {
    modelName: 'XY 125 RIO EFI',
    yearFrom: null,
    yearTo: null,
    tireSize: 'Dianteiro 2.75-18 | Traseiro 90/90-18',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 28,
    rearPsiLoad: 36,
    notes: 'Solo: D 28 / T 32 PSI. Com garupa: D 28 / T 36 PSI. Mesma configuração de pneus da linha JET/125cc padrão.',
  },
  {
    modelName: 'XY 125-14 ESD',
    yearFrom: null,
    yearTo: null,
    tireSize: 'Dianteiro 2.75-18 | Traseiro 90/90-18',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 28,
    rearPsiLoad: 36,
    notes: 'Solo: D 28 / T 32 PSI. Com garupa: D 28 / T 36 PSI. Configuração de entrada com freio a tambor nos dois eixos — mesma medida de pneu da linha 125cc padrão.',
  },
  {
    modelName: 'WORKER 125',
    yearFrom: null,
    yearTo: null,
    tireSize: 'Dianteiro 2.75-18 | Traseiro 3.00-18',
    frontPsi: 28,
    rearPsi: 34,
    frontPsiLoad: 28,
    rearPsiLoad: 40,
    notes: 'Solo (sem carga): D 28 / T 34 PSI. Com carga máxima/bagageiro cheio: D 28 / T 40 PSI. Pneu traseiro mais largo que o da linha JET para suportar o uso com carga. Aumente a pressão traseira progressivamente conforme o peso transportado — nunca ultrapasse o limite indicado na lateral do próprio pneu.',
  },
]

// ─── Itens de manutenção ────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // XY 110V WAVE
  { modelName: 'XY 110V WAVE', yearFrom: null, yearTo: null, order: 0, priority: 'CRITICAL',
    component: 'Óleo do motor (20W-50 JASO MA)', intervalKm: 1500, intervalMonths: 6,
    notes: 'Capacidade estimada ~0,8L. Embreagem centrífuga molhada — nunca use JASO MB.' },
  { modelName: 'XY 110V WAVE', yearFrom: null, yearTo: null, order: 1, priority: 'HIGH',
    component: 'Lubrificação da corrente 428', intervalKm: 500, intervalMonths: null,
    notes: 'Spray de corrente ou óleo 80W-90. Folga: 20-30mm no trecho inferior.' },
  { modelName: 'XY 110V WAVE', yearFrom: null, yearTo: null, order: 2, priority: 'MEDIUM',
    component: 'Vela NGK C7HSA (gap 0,6-0,7mm)', intervalKm: 7000, intervalMonths: null,
    notes: 'Verificar gap a cada troca de óleo. Peça barata e universal na linha chinesa 100-125cc.' },
  { modelName: 'XY 110V WAVE', yearFrom: null, yearTo: null, order: 3, priority: 'HIGH',
    component: 'Limpeza do carburador PZ19', intervalKm: 3000, intervalMonths: 4,
    notes: 'Etanol degradado engoma o jiclê. Limpar sempre após a moto ficar parada mais de 1 mês.' },
  { modelName: 'XY 110V WAVE', yearFrom: null, yearTo: null, order: 4, priority: 'MEDIUM',
    component: 'Filtro de ar (limpeza/troca)', intervalKm: 6000, intervalMonths: 12,
    notes: 'Limpar se espuma (querosene + secar + óleo leve); trocar se papel.' },
  { modelName: 'XY 110V WAVE', yearFrom: null, yearTo: null, order: 5, priority: 'MEDIUM',
    component: 'Folga de válvulas (adm ~0,05mm / esc ~0,08mm)', intervalKm: 6000, intervalMonths: 12,
    notes: 'Motor frio obrigatório. Regulagem por contra-porca.' },
  { modelName: 'XY 110V WAVE', yearFrom: null, yearTo: null, order: 6, priority: 'MEDIUM',
    component: 'Lonas de freio dianteira/traseira (tambor)', intervalKm: 6000, intervalMonths: 12,
    notes: 'Inspecionar e regular o cabo a cada abastecimento.' },
  { modelName: 'XY 110V WAVE', yearFrom: null, yearTo: null, order: 7, priority: 'HIGH',
    component: 'Verificação do CDI e regulador retificador', intervalKm: null, intervalMonths: 12,
    notes: 'Medir tensão a 3.000-4.000 rpm: deve ficar entre 13,5-14,8V.' },

  // XY 125 JET
  { modelName: 'XY 125 JET', yearFrom: null, yearTo: null, order: 0, priority: 'CRITICAL',
    component: 'Óleo do motor (20W-50 JASO MA)', intervalKm: 2000, intervalMonths: 6,
    notes: 'Capacidade estimada ~1,0-1,1L. Embreagem manual multidisco molhada.' },
  { modelName: 'XY 125 JET', yearFrom: null, yearTo: null, order: 1, priority: 'HIGH',
    component: 'Lubrificação da corrente 428H', intervalKm: 500, intervalMonths: null,
    notes: 'Folga: 20-30mm. Kit relação completo a cada 12.000-15.000 km.' },
  { modelName: 'XY 125 JET', yearFrom: null, yearTo: null, order: 2, priority: 'MEDIUM',
    component: 'Vela NGK C7HSA/D8HA (gap 0,6-0,7mm)', intervalKm: 7000, intervalMonths: null,
    notes: 'Verificar gap a cada troca de óleo.' },
  { modelName: 'XY 125 JET', yearFrom: null, yearTo: null, order: 3, priority: 'HIGH',
    component: 'Limpeza do carburador PZ22', intervalKm: 4000, intervalMonths: 4,
    notes: 'Etanol degradado é a causa mais comum de marcha lenta instável.' },
  { modelName: 'XY 125 JET', yearFrom: null, yearTo: null, order: 4, priority: 'MEDIUM',
    component: 'Filtro de ar (limpeza/troca)', intervalKm: 6000, intervalMonths: 12,
    notes: 'Limpar se espuma; trocar se papel.' },
  { modelName: 'XY 125 JET', yearFrom: null, yearTo: null, order: 5, priority: 'MEDIUM',
    component: 'Folga de válvulas (adm ~0,05mm / esc ~0,08mm)', intervalKm: 6000, intervalMonths: 12,
    notes: 'Motor frio obrigatório.' },
  { modelName: 'XY 125 JET', yearFrom: null, yearTo: null, order: 6, priority: 'HIGH',
    component: 'Verificação do CDI e regulador retificador', intervalKm: null, intervalMonths: 12,
    notes: 'Medir tensão a 3.000-4.000 rpm: 13,5-14,8V é a faixa saudável.' },
  { modelName: 'XY 125 JET', yearFrom: null, yearTo: null, order: 7, priority: 'MEDIUM',
    component: 'Freios (pastilha dianteira/lona traseira, conforme trim)', intervalKm: 6000, intervalMonths: 12,
    notes: 'Inspecionar espessura mínima e regular cabo/hidráulica conforme configuração.' },

  // XY 125 JET SS (só itens adicionais/específicos)
  { modelName: 'XY 125 JET SS', yearFrom: null, yearTo: null, order: 0, priority: 'MEDIUM',
    component: 'Inspeção das borrachas/pontos de fixação da carenagem', intervalKm: 6000, intervalMonths: 12,
    notes: 'Evita rachaduras no plástico esportivo por vibração excessiva.' },
  { modelName: 'XY 125 JET SS', yearFrom: null, yearTo: null, order: 1, priority: 'HIGH',
    component: 'Fluido de freio DOT 4 (se equipada com disco dianteiro)', intervalKm: null, intervalMonths: 24,
    notes: 'Troca bienal obrigatória independente do uso — absorve umidade do ar.' },
  { modelName: 'XY 125 JET SS', yearFrom: null, yearTo: null, order: 2, priority: 'LOW',
    component: 'Ajuste de pré-carga da suspensão traseira dupla', intervalKm: null, intervalMonths: 6,
    notes: 'Revisar conforme peso do piloto/garupa habitual.' },

  // XY 125 JET SS EFI (só itens adicionais/específicos da injeção)
  { modelName: 'XY 125 JET SS EFI', yearFrom: null, yearTo: null, order: 0, priority: 'HIGH',
    component: 'Filtro de combustível (linha EFI)', intervalKm: 11000, intervalMonths: 12,
    notes: 'Item exclusivo da versão injetada — não existe na JET/JET SS carburadas.' },
  { modelName: 'XY 125 JET SS EFI', yearFrom: null, yearTo: null, order: 1, priority: 'HIGH',
    component: 'Tensão da bateria (repouso e em marcha)', intervalKm: null, intervalMonths: 6,
    notes: 'Mínimo 12,0V em repouso; 13,5-14,8V em marcha a 3.000-4.000 rpm. ECU depende de tensão estável.' },
  { modelName: 'XY 125 JET SS EFI', yearFrom: null, yearTo: null, order: 2, priority: 'MEDIUM',
    component: 'Diagnóstico por scanner (perda de potência/marcha lenta instável)', intervalKm: null, intervalMonths: 12,
    notes: 'Usar scanner específico para moto EFI popular antes de trocar sensor/bico no chute.' },

  // XY 125 NEW WAVE
  { modelName: 'XY 125 NEW WAVE', yearFrom: null, yearTo: null, order: 0, priority: 'CRITICAL',
    component: 'Óleo do motor (20W-50 JASO MA)', intervalKm: 2000, intervalMonths: 6,
    notes: 'Capacidade estimada ~1,0L. Embreagem centrífuga molhada.' },
  { modelName: 'XY 125 NEW WAVE', yearFrom: null, yearTo: null, order: 1, priority: 'HIGH',
    component: 'Lubrificação da corrente 428', intervalKm: 500, intervalMonths: null,
    notes: 'Folga: 20-30mm no trecho inferior.' },
  { modelName: 'XY 125 NEW WAVE', yearFrom: null, yearTo: null, order: 2, priority: 'MEDIUM',
    component: 'Vela NGK C7HSA/D8HA (gap 0,6-0,7mm)', intervalKm: 7000, intervalMonths: null,
    notes: 'Verificar gap a cada troca de óleo.' },
  { modelName: 'XY 125 NEW WAVE', yearFrom: null, yearTo: null, order: 3, priority: 'HIGH',
    component: 'Limpeza do carburador PZ22', intervalKm: 4000, intervalMonths: 4,
    notes: 'Sensível a etanol degradado — mesma vulnerabilidade da linha JET.' },
  { modelName: 'XY 125 NEW WAVE', yearFrom: null, yearTo: null, order: 4, priority: 'MEDIUM',
    component: 'Verificação da embreagem centrífuga', intervalKm: 4000, intervalMonths: 6,
    notes: 'Checar resposta na retomada — desgaste acelerado em uso de entrega/carga.' },
  { modelName: 'XY 125 NEW WAVE', yearFrom: null, yearTo: null, order: 5, priority: 'MEDIUM',
    component: 'Lonas de freio dianteira/traseira', intervalKm: 6000, intervalMonths: 12,
    notes: 'Desgaste acelerado quando usada com carga/garupa frequente.' },
  { modelName: 'XY 125 NEW WAVE', yearFrom: null, yearTo: null, order: 6, priority: 'HIGH',
    component: 'Verificação do CDI e regulador retificador', intervalKm: null, intervalMonths: 12,
    notes: 'Medir tensão a 3.000-4.000 rpm: 13,5-14,8V.' },

  // XY 125 RIO EFI
  { modelName: 'XY 125 RIO EFI', yearFrom: null, yearTo: null, order: 0, priority: 'CRITICAL',
    component: 'Óleo do motor (20W-50 JASO MA)', intervalKm: 2200, intervalMonths: 6,
    notes: 'Capacidade estimada ~1,0-1,1L. A injeção não muda a exigência de óleo do motor.' },
  { modelName: 'XY 125 RIO EFI', yearFrom: null, yearTo: null, order: 1, priority: 'HIGH',
    component: 'Lubrificação da corrente 428H', intervalKm: 500, intervalMonths: null,
    notes: 'Folga: 20-30mm.' },
  { modelName: 'XY 125 RIO EFI', yearFrom: null, yearTo: null, order: 2, priority: 'MEDIUM',
    component: 'Vela NGK C7HSA/D8HA (gap 0,6-0,7mm)', intervalKm: 7000, intervalMonths: null,
    notes: 'Vela fora do gap em moto EFI pode gerar falha de leitura mesmo sem defeito eletrônico.' },
  { modelName: 'XY 125 RIO EFI', yearFrom: null, yearTo: null, order: 3, priority: 'HIGH',
    component: 'Filtro de combustível', intervalKm: 11000, intervalMonths: 12,
    notes: 'Item exclusivo da versão EFI. Combustível de má procedência entope mais rápido.' },
  { modelName: 'XY 125 RIO EFI', yearFrom: null, yearTo: null, order: 4, priority: 'HIGH',
    component: 'Tensão da bateria e regulador retificador', intervalKm: null, intervalMonths: 6,
    notes: 'Mín. 12,0V em repouso; 13,5-14,8V em marcha. Crítico para a ECU funcionar corretamente.' },
  { modelName: 'XY 125 RIO EFI', yearFrom: null, yearTo: null, order: 5, priority: 'HIGH',
    component: 'Fluido de freio DOT 4 (disco dianteiro)', intervalKm: null, intervalMonths: 24,
    notes: 'Troca bienal obrigatória.' },
  { modelName: 'XY 125 RIO EFI', yearFrom: null, yearTo: null, order: 6, priority: 'MEDIUM',
    component: 'Pastilhas de freio dianteiro', intervalKm: 6000, intervalMonths: null,
    notes: 'Espessura mínima ~1,5mm de material de fricção.' },

  // XY 125-14 ESD
  { modelName: 'XY 125-14 ESD', yearFrom: null, yearTo: null, order: 0, priority: 'CRITICAL',
    component: 'Óleo do motor (20W-50 JASO MA)', intervalKm: 2000, intervalMonths: 6,
    notes: 'Capacidade estimada ~1,0L.' },
  { modelName: 'XY 125-14 ESD', yearFrom: null, yearTo: null, order: 1, priority: 'HIGH',
    component: 'Lubrificação da corrente 428', intervalKm: 500, intervalMonths: null,
    notes: 'Folga: 20-30mm.' },
  { modelName: 'XY 125-14 ESD', yearFrom: null, yearTo: null, order: 2, priority: 'MEDIUM',
    component: 'Vela NGK C7HSA/D8HA (gap 0,6-0,7mm)', intervalKm: 7000, intervalMonths: null,
    notes: 'Vela genérica barata, universal na linha.' },
  { modelName: 'XY 125-14 ESD', yearFrom: null, yearTo: null, order: 3, priority: 'HIGH',
    component: 'Limpeza do carburador PZ22', intervalKm: 4000, intervalMonths: 4,
    notes: 'Causa mais comum de "moto não pega direito" nesta configuração carburada.' },
  { modelName: 'XY 125-14 ESD', yearFrom: null, yearTo: null, order: 4, priority: 'MEDIUM',
    component: 'Teste do motor de arranque e relé de partida', intervalKm: 8000, intervalMonths: 12,
    notes: 'Item exclusivo da versão ESD (partida elétrica). Se enfraquecer, prefira o kick.' },
  { modelName: 'XY 125-14 ESD', yearFrom: null, yearTo: null, order: 5, priority: 'MEDIUM',
    component: 'Lonas de freio a tambor (dianteira e traseira)', intervalKm: 6000, intervalMonths: 12,
    notes: 'Sem disco dianteiro — toda a frenagem depende do tambor, regular sempre.' },
  { modelName: 'XY 125-14 ESD', yearFrom: null, yearTo: null, order: 6, priority: 'HIGH',
    component: 'Verificação do CDI e regulador retificador', intervalKm: null, intervalMonths: 12,
    notes: 'Consumo maior de bateria pela partida elétrica evidencia retificador fraco mais cedo.' },

  // WORKER 125
  { modelName: 'WORKER 125', yearFrom: null, yearTo: null, order: 0, priority: 'CRITICAL',
    component: 'Óleo do motor (20W-50 JASO MA)', intervalKm: 1800, intervalMonths: 6,
    notes: 'Capacidade estimada ~1,0-1,1L. Intervalo reduzido pelo uso de carga constante.' },
  { modelName: 'WORKER 125', yearFrom: null, yearTo: null, order: 1, priority: 'CRITICAL',
    component: 'Lubrificação da corrente 428H', intervalKm: 500, intervalMonths: null,
    notes: 'Sem exceção — item mais crítico para quem usa a moto com carga diária.' },
  { modelName: 'WORKER 125', yearFrom: null, yearTo: null, order: 2, priority: 'HIGH',
    component: 'Kit relação 428H completo', intervalKm: 9000, intervalMonths: null,
    notes: 'Intervalo reduzido (contra ~15.000 km em uso leve) por causa do desgaste acelerado com carga.' },
  { modelName: 'WORKER 125', yearFrom: null, yearTo: null, order: 3, priority: 'HIGH',
    component: 'Inspeção dos amortecedores traseiros', intervalKm: 6000, intervalMonths: 6,
    notes: 'Checar afundamento excessivo ou vazamento de óleo com carga máxima.' },
  { modelName: 'WORKER 125', yearFrom: null, yearTo: null, order: 4, priority: 'MEDIUM',
    component: 'Vela NGK C7HSA/D8HA (gap 0,6-0,7mm)', intervalKm: 7000, intervalMonths: null,
    notes: 'Mesma peça da linha JET.' },
  { modelName: 'WORKER 125', yearFrom: null, yearTo: null, order: 5, priority: 'HIGH',
    component: 'Limpeza do carburador PZ22', intervalKm: 4000, intervalMonths: 4,
    notes: 'Sensível a etanol degradado, mesma vulnerabilidade da linha JET.' },
  { modelName: 'WORKER 125', yearFrom: null, yearTo: null, order: 6, priority: 'MEDIUM',
    component: 'Inspeção visual do bagageiro/solda de carga', intervalKm: 4000, intervalMonths: 3,
    notes: 'Sobrecarga frequente pode trincar pontos de solda — inspecionar visualmente.' },
  { modelName: 'WORKER 125', yearFrom: null, yearTo: null, order: 7, priority: 'MEDIUM',
    component: 'Lonas de freio dianteira/traseira', intervalKm: 6000, intervalMonths: 12,
    notes: 'Distância de frenagem aumenta com carga — regular e trocar sem esperar demais.' },
  { modelName: 'WORKER 125', yearFrom: null, yearTo: null, order: 8, priority: 'HIGH',
    component: 'Verificação do CDI e regulador retificador', intervalKm: null, intervalMonths: 6,
    notes: 'Uso comercial intenso expõe a fragilidade elétrica mais cedo — intervalo de checagem reduzido.' },
]

// ─── Runner ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Shineray 110-125cc iniciando...\n')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

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
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: idx,
      })),
    })

    const counts = {
      m: block.MACETES.length,
      p: block.PROBLEMAS.length,
      mt: block.MANUTENCAO.length,
    }
    console.log(
      `  🔧 ${block.modelName}: ${counts.m} macetes, ${counts.p} problemas, ${counts.mt} manutenção`,
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

  console.log('\n  🔧 Itens de manutenção...')
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
    `\n✅ Seed Shineray 110-125cc concluído: ${BLOCKS.length} modelos, ${totalTips} dicas, ${TIRE_PRESSURES.length} calibragens, ${MAINTENANCE_ITEMS.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
