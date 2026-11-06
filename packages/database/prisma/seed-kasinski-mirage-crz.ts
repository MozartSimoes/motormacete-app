// seed-kasinski-mirage-crz.ts — Kasinski Mirage/GV 250, Mirage 150, Mirage 650 V2power, CRZ 150 e CRZ 150 SM
// GV 250 MIRAGE e MIRAGE 650 V2power: base Hyosung GV250/GV650 (cruiser V-twin)
// MIRAGE 150 e CRZ 150: motor chinês 149cc OHC monocilíndrico
// Execute: pnpm --filter @motormacete/database db:seed:kasinski-mirage-crz
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

// ─── GV 250 MIRAGE (Hyosung GV250 custom) ────────────────────────────────────
// Motor: 249cc DOHC V-twin ar+óleo (Hyosung GV250 — mesmo motor que GT250)
// Cruiser style: guidão alto, banco baixo, posição relaxada
// Vela: NGK CR8E (×2) gap 0,7–0,8mm | Óleo 10W-40 JASO MA 2,0L
// Pneu: 100/90-18 (F) / 140/90-15 (R) | Tanque: 15L

const GV250MIRAGE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Hyosung GV250: V-twin 249cc com as mesmas velas e óleo do Comet 250',
    body: 'O GV 250 Mirage usa o mesmo motor V-twin DOHC 249cc da Comet 250 — mesma potência, mesma manutenção. Velas NGK CR8E (×2), gap 0,7–0,8mm. Óleo 10W-40 JASO MA semissintético, 2,0L. Esta compatibilidade com o Hyosung GV250 facilita encontrar peças de motor: pistão, anéis, biela, junta do cabeçote — compatíveis com Hyosung GV250 original. Troque as velas sempre em par.',
  },
  {
    severity: 'OK',
    title: 'Estilo cruiser: posição ereta favorece viagens mas exige atenção na frenagem',
    body: 'O Mirage GV 250 tem posição de pilotagem ereta (cruiser) com guidão alto e banco mais baixo. Em frenagens de emergência, essa posição pode levar o piloto a se jogar para a frente — pratique a técnica de apertar os joelhos no tanque e usar os dois freios simultaneamente. Freio dianteiro é a principal força de desaceleração — não negligencie por medo de caída.',
  },
  {
    severity: 'WARN',
    title: 'Carburador duplo (versão carburada): sincronize a cada 10.000 km',
    body: 'O GV 250 Mirage usa dois carburadores em V — um por cilindro, mesmo sistema do Comet 250. Dessincronização causa: trepidação ao acelerar, marcha lenta irregular, perda de potência. Sincronização requer vacuômetro duplo. Custo do serviço: R$ 80–150 em oficina especializada em motos Hyosung/Kasinski. Faça junto com a regulagem de válvulas para economia de visita.',
  },
  {
    severity: 'OK',
    title: 'Compatibilidade Hyosung GV250: peças de motor ainda disponíveis via importação',
    body: 'O GV 250 Mirage compartilha motor com o Hyosung GV250 vendido no exterior (Europa, EUA, Coreia). Peças de motor acessíveis: filtro de óleo Hiflofiltro HF152, kit pistão e anéis, junta do cabeçote, correia/corrente do comando de válvulas. Busque "Hyosung GV250 parts" no Ali Express ou sites americanos. Para peças específicas do cruiser (tanque, banco, carenagem), grupos no Facebook "Kasinski Mirage Brasil" são a melhor fonte de peças usadas.',
  },
  {
    severity: 'OK',
    title: 'Pneus cruiser: 100/90-18 (F) / 140/90-15 (R) — perfil maior para conforto',
    body: 'O GV 250 usa pneus de perfil alto (aspect ratio 90) típico de cruisers — proporcionam conforto superior e boa aderência em curvas suaves. Não instale pneus de perfil esportivo — a geometria do chassi não está otimizada para isso. Pneus recomendados: Dunlop D402 ou Metzeler ME 880 Marathon nas medidas originais. Pressão: verificar mensalmente — pneus com flancos altos "escondem" a queda de pressão.',
  },
]

const GV250MIRAGE_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador: ponto de falha crítico — mesma fragilidade do Comet 250',
    body: 'O retificador do GV 250 Mirage tem a mesma fragilidade que o do Comet 250: falha precoce em climas quentes e com cargas elétricas adicionais (GPS, USB, farol de LED). Diagnóstico: medir tensão na bateria a 4.000 rpm com multímetro — deve ser 13,5–14,5V. Substituição: compatível com Hyosung GV250 (custo R$ 150–300). NUNCA use com retificador defeituoso: pode destruir a bateria e o enrolamento do alternador em sequência.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor do eixo traseiro: característico de cruisers com baixa quilometragem anual',
    body: 'Cruisers tendem a ficar parados por longos períodos — o maior inimigo dos retentores. Após meses parado, os retentores de borracha ressecam e começam a vazar ao retomar o uso. O retentor do eixo traseiro é o mais comum de vazar no GV 250. Solução preventiva: se a moto ficar parada por mais de 3 meses, dê um "giro" mensal de 15–20 minutos para manter os retentores úmidos e a selagem eficiente.',
  },
  {
    severity: 'WARN',
    title: 'Tanque de combustível com verniz interno: lavar se a moto ficou parada com gasolina velha',
    body: 'A gasolina brasileira com álcool degrada em 60–90 dias, deixando verniz no interior do tanque. Se o GV 250 ficou parado, esvazie o tanque e lave internamente com querosene antes de abastecer — o verniz entope o filtro de tela do carburador. Após a limpeza do tanque, desmonte e limpe o carburador: jatos 105 (principal) e 38 (piloto). Use bico de valetador para limpar os orifícios.',
  },
]

const GV250MIRAGE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma GV 250 Mirage: mesmos intervalos do Comet 250 — motor idêntico',
    body: '5.000 km — Troca de óleo (10W-40 JASO MA, 2,0L). | 10.000 km — Troca de velas (par NGK CR8E). Sincronização de carburadores. Filtro de óleo (HF152). | 10.000 km — Folga de válvulas (adm 0,10mm / esc 0,15mm). | 12 meses — Verificar tensão do retificador (13,5–14,5V @ 4.000 rpm). | 15.000 km — Fluido de freio DOT 4. Kit relação (se desgastado). | 20.000 km — Verificar retentores. | Bimensal (se parado): girar o motor 15–20 min para manter retentores ativos.',
  },
]

// ─── MIRAGE 150 ──────────────────────────────────────────────────────────────
// Motor: 149,4cc OHC monocilíndrico ar | 13,4 cv @ 8.000 rpm | torque 1,38 kgf.m @ 6.000 rpm
// Carburador PZ27 | Óleo 20W-50 JASO MA 1,1L | Vela D8EA gap 0,6–0,7mm
// Pneu: 2.75/18 (F) / 3.50/16 (R) — cruiser low

const MIRAGE150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 149cc chinês: óleo 20W-50 JASO MA 1,1L — troque a cada 3.000 km',
    body: 'O Mirage 150 usa motor monocilíndrico OHC 149,4cc derivado do motor genérico chinês de 150cc. Capacidade: 1,1L. Use 20W-50 JASO MA mineral — não use 10W-40, a viscosidade menor pode causar consumo de óleo por vazamentos em retentores mais frouxos deste motor. Marcas adequadas: Shell Advance 4T 20W-50, Lubrax Moto 4T 20W-50. Intervalo: 3.000 km ou 6 meses.',
  },
  {
    severity: 'OK',
    title: 'Posição cruiser e aro 16 traseiro: frenagem exige prática',
    body: 'O Mirage 150 tem banco baixo (~730mm), guidão alto e pneu traseiro 3.50/16 (aro 16 — menor que o convencional 18). O aro 16 proporciona mais estabilidade em linha reta mas reduz a agilidade nas curvas. A posição com pés à frente retarda ligeiramente a reação nas frenagens — pratique sempre antes de depender dos reflexos.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ27: válvula de escorregamento (agulha) desgasta com álcool',
    body: 'O carburador PZ27 do Mirage 150 usa uma agulha (needle) de plástico/latão que sofre desgaste acelerado com a gasolina E25-E27 brasileira. Sintoma: marcha lenta que sobe com o motor quente, dificuldade de regular o idle. Solução: agulha de reposição (~R$ 15–30 em lojas de peças para motos chinesas). Ao desmontar o carburador, inspecione também o diafragma de acelerador — microfissuras causam engasgo no meio-giro.',
  },
  {
    severity: 'OK',
    title: 'Peças: motor genérico 150cc chinês facilita reposição',
    body: 'O motor 149,4cc do Mirage 150 (bore 62mm × stroke 49,5mm) é idêntico ao usado em dezenas de marcas chinesas. Pistão STD: buscar "pistão 62mm 150cc" ou "pistão Shineray 150". Anéis: "anel pistão 62mm". Carburador PZ27 completo: R$ 30–80 genérico. Vela D8EA: R$ 15–25. Para peças de carroceria (tanque, paralamas, carenagem), grupos no Facebook "Kasinski Mirage 150" têm mercado de peças usadas.',
  },
]

const MIRAGE150_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI com falha: sem faísca, sem informação — peça difícil de encontrar',
    body: 'O CDI do Mirage 150 com código Kasinski é difícil de encontrar após o fechamento da marca. Se o motor não pega e a vela não faísca, teste o CDI: meça a tensão na bobina de ignição (deve pulsar 250–300V com o kick). CDI genérico para motor 150cc chinês de 6 pinos é amplamente compatível — custo R$ 35–80 em lojas de motos chinesas. Compare a pinagem antes de comprar. Grupos no Telegram "Kasinski 150" têm lista de CDI compatíveis.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de transmissão 428H bate no guardacorrente: ajuste a tensão primeiro',
    body: 'O Mirage 150 tem guardacorrente de plástico no basculante. Corrente fora da tensão (folga acima de 35mm) bate no guardacorrente e o desgasta rapidamente. Sintoma: ruído rítmico na traseira, especialmente ao acelerar. Ajuste a corrente para 20–30mm de folga. Se o guardacorrente já está danificado, troque antes de continuar usando — a corrente pode pular com guardacorrente quebrado.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira invertida (alguns anos): retentor mais sensível a buracos',
    body: 'Alguns anos do Mirage 150 têm bengala convencional de ø35mm. Após 15.000–20.000 km em pavimento irregular, o retentor começa a vazar. Sintoma: óleo escuro no tubo da bengala, amortecimento desigual. Retentor genérico 35×47×11mm: R$ 15–25 por unidade. Ao trocar, complete com 180mL de óleo SAE 10W por tubo.',
  },
]

const MIRAGE150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Mirage 150: motor 150cc chinês — intervalos mais curtos',
    body: '500 km — Troca de óleo inicial. | 1.000 km — Segunda troca + apertar cabeçote (14–16 Nm). | 3.000 km — Troca de óleo (20W-50, 1,1L). Lubrificar corrente 428H. | 5.000 km — Limpar filtro de ar e carburador PZ27. Verificar gap vela (0,6–0,7mm). | 8.000 km — Trocar vela D8EA. Folga de válvulas (adm 0,05mm / esc 0,08mm, motor frio). | 10.000 km — Trocar filtro de ar. | 12.000 km — Lona traseiro (tambor) e pastilha dianteiro se desgastados. | 15.000 km — Kit relação 428H. Retentor bengala se vazar.',
  },
]

// ─── MIRAGE 650 V2power ───────────────────────────────────────────────────────
// Motor: 647cc DOHC V-twin ar+óleo (base Hyosung GV650 — mesmo motor que Comet GT 650)
// Cruiser style: ~80 cv, guidão largo, banco baixo
// Vela: NGK CR8E (×2) gap 0,7–0,8mm | Óleo 10W-40 JASO MA 4,0L
// Pneu: 110/90-18 (F) / 160/80-15 (R) | Tanque: 18L

const MIRAGE650_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Hyosung GV650: 647cc V-twin — mesma base mecânica do Comet GT 650',
    body: 'O Mirage 650 V2power usa o motor V-twin 647cc DOHC do Hyosung GV650 — o mesmo bloco do Comet GT 650, com mapeamento diferente para o perfil cruiser (~80 cv vs 89 cv da versão sport). Manutenção idêntica: óleo 10W-40 JASO MA 4,0L, velas NGK CR8E ×2, gap 0,7–0,8mm. O nome "V2power" é a denominação Kasinski para o motor V-twin de 2 cilindros. Compatibilidade de peças de motor com Hyosung GV650 facilita manutenção.',
  },
  {
    severity: 'OK',
    title: 'Pneus de cruiser: 110/90-18 (F) / 160/80-15 (R) — flancos altos para conforto',
    body: 'O Mirage 650 usa pneus cruiser de perfil alto — proporcionam conforto superior para viagens longas. Pneus recomendados: Dunlop D402 ou Metzeler ME 880 Marathon. Pressão correta: F 29 / R 33 PSI (solo), F 29 / R 36 PSI (com carona). Os flancos altos escondem a queda de pressão — use manômetro, não fique na base do toque manual.',
  },
  {
    severity: 'WARN',
    title: 'Peso: 240kg+ com tanque cheio — cuidado em manobras de estacionamento',
    body: 'O Mirage 650 pesa cerca de 220–240kg completo. Em manobras de estacionamento (morro, terreno irregular), o peso pode surpreender quem vem de motos menores. Técnica: sempre manobre com os pés no chão e o motor ligado — a tração é sua aliada. Se cair, não tente segurar sozinho — peça ajuda. A distância entre eixos longa do cruiser dificulta manobras em espaços apertados.',
  },
  {
    severity: 'WARN',
    title: 'Retificador/regulador: substituição preventiva aos 40.000 km',
    body: 'Mesma fragilidade do Comet GT 650 — o retificador é o ponto elétrico mais crítico. O Mirage 650 com manutenção elétrica negligenciada pode perder a bateria e o estator do alternador numa mesma viagem longa. Verifique semestralmente: tensão na bateria a 4.000 rpm deve ser 13,5–14,5V. Substitua aos 40.000 km preventivamente. Custo: R$ 200–450 (compatível com Hyosung GV650).',
  },
  {
    severity: 'OK',
    title: 'Corrente 530 e transmissão final: lubrifique cada 500 km',
    body: 'O Mirage 650 usa corrente 530 (robusta para o torque do V-twin). Com lubrificação a cada 500 km, a corrente dura 20.000–25.000 km. Folga: 25–35mm no trecho inferior. Kit relação: pinhão 15T + coroa 43–45T + corrente 530 × 112. DID 530GXW (ouro) ou RK 530GXW são as melhores opções para a durabilidade esperada de um cruiser.',
  },
]

const MIRAGE650_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador: falha em 3 de 10 motos após 30.000 km',
    body: 'Relato frequente na comunidade Hyosung/Kasinski 650cc: o retificador original falha com alta frequência após 30.000–40.000 km. A consequência pode ser a destruição da bateria e do enrolamento do alternador em cadeia — custo de reparo de R$ 800–2.000. Diagnóstico: multímetro na bateria (ligado a 4.000 rpm): abaixo de 13,5V = retificador com problema. Substitua antes de uma viagem longa se não foi trocado nos últimos 40.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Peso alto em cruzamentos: pratique a largada correta',
    body: 'O peso do Mirage 650 (>220kg) torna as largadas em cruzeiros e aclives mais críticas — a embreagem precisa ser liberada com cuidado para não "matar" o motor ou causar solavancos. Ajuste a alavanca de embreagem para a folga correta (~5mm no extremo da alavanca) e calibre o cabo se necessário. Embreagem escorregando (sem morder) = óleo acima da capacidade ou JASO MB (errado) no motor.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro tambor (alguns anos): lona se resseca com uso esporádico',
    body: 'Alguns modelos do Mirage 650 têm freio traseiro de tambor. Criado para uso esporádico de cruiser, o tambor pode ter a lona impregnada de óleo se o retentor do eixo traseiro vazar. Sintoma: freio fraco, cheiro de queimado, ruído rítmico ao frear. Solução: lona impregnada = troca obrigatória + investigar e resolver o vazamento de óleo.',
  },
]

const MIRAGE650_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Mirage 650 V2power: mesmos intervalos do Comet GT 650',
    body: '5.000 km — Troca de óleo (10W-40 JASO MA, 4,0L). | 10.000 km — Troca de velas (par NGK CR8E). Filtro de óleo (HF152 compatível Hyosung). Sincronização de carburadores (se versão carburada). | 10.000 km — Folga de válvulas (adm 0,10mm / esc 0,15mm, motor frio). | 15.000 km — Fluido DOT 4. Inspecionar pastilhas/lonas de freio. | 6 meses — Verificar retificador (tensão a 4.000 rpm). | 25.000 km — Kit relação 530. | 40.000 km — Substituição preventiva do retificador.',
  },
]

// ─── CRZ 150 ────────────────────────────────────────────────────────────────
// Motor: 149,4cc OHC monocilíndrico ar | 13,5 cv @ 8.000 rpm | torque 1,45 kgf.m @ 7.500 rpm
// Carburador PZ27 | Óleo 20W-50 JASO MA 1,0L | Vela D8EA gap 0,6–0,7mm
// Pneu TRAIL: 2.75/21 (F) / 4.10/18 (R) | Tanque: 12L

const CRZ150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor trail 149cc: óleo 20W-50 JASO MA 1,0L — trocas mais frequentes em uso off-road',
    body: 'O motor 149,4cc OHC da CRZ 150 compartilha especificações com o Mirage 150, mas está em uma moto trail — uso off-road exige troca de óleo mais frequente. Em uso normal (asfalto): 3.000 km. Em uso off-road intenso (trilhas, lama): 2.000 km. O pó e a areia entram pelo filtro de ar e contaminam o óleo mais rapidamente. Óleo sujo em motor de air-cooled: desgaste acelerado do comando de válvulas.',
  },
  {
    severity: 'OK',
    title: 'Pneu 21 (dianteiro): mantém pressão mais baixa off-road — 20 PSI é aceitável em trilha',
    body: 'O aro 21 dianteiro da CRZ 150 é o grande diferencial para trilhas. A pressão de asfalto (26 PSI) pode ser reduzida para 18–22 PSI em trilhas com pedras ou lamaçal — aumenta a área de contato e a tração. Lembre de recalibrar para 26 PSI ao retornar ao asfalto. Pneu dianteiro recomendado: Pirelli MT90 Scorpion 2.75/21 ou Dunlop TrailMax Raid 80/100-21.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar: limpe a cada 2.000 km em uso off-road — pó mata o motor',
    body: 'O filtro de ar de espuma da CRZ 150 retém pó e areia de trilhas. Em uso off-road intenso, o filtro pode saturar em 2.000–3.000 km. Sintoma de filtro entupido: motor sem potência, fumaça preta pelo escapamento (mistura rica). Limpeza: querosene + secar + umedecer levemente com óleo limpo antes de reinstalar. Upgrade: filtro K&N para 150cc trail — lavável e mais eficiente.',
  },
  {
    severity: 'OK',
    title: 'Carburador PZ27: limpe após toda trilha com lama',
    body: 'Após trilhas com lama, o carburador PZ27 pode acumular depósitos de areia fina nos emulsionadores. Sintoma: arrancada irregular no dia seguinte à trilha, marcha lenta instável. Solução rápida: desmonte a cuba do carburador (3 parafusos), remova o jato principal (105) e o piloto (38), e limpe com spray carburador e bico de valetador. 20 minutos de serviço que previne corrosão nos jatos.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio 5 velocidades: proteção das botas é fundamental — a pedivela pode girar involuntariamente',
    body: 'A CRZ 150 tem câmbio de 5 velocidades convencional. Em trilhas, a pedivela pode ser acionada involuntariamente por galhos ou rochas — causa entrada em ponto morto em momentos críticos. Use protetor de pedivela (universal R$ 30–60) e sempre use bota de mototrilha — além da proteção do pé, a bota dá melhor controle do câmbio e do freio traseiro.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor: genéricas 150cc chinês — custo acessível',
    body: 'O motor da CRZ 150 é idêntico ao Mirage 150 e ao Comet 150: bore 62mm, stroke 49,5mm. Peças encontradas facilmente: pistão, anéis, biela, guias e retentores de válvulas, rolamentos. Custo de retífica completa: R$ 400–800 com peças genéricas em oficina. Gaskets (juntas) completas: busque "kit junta motor 150cc 62mm" — custo R$ 60–120.',
  },
]

const CRZ150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bengala dianteira ø35mm: vedante fraca para uso off-road pesado',
    body: 'A bengala convencional ø35mm da CRZ 150 tem retentor com vida útil reduzida em trilhas duras. Pedras e tocos que impactam a bengala danificam o retentor ou vergam o tubo interno. Retentor genérico 35×47×11mm: R$ 15–25 por unidade. Se o tubo interno estiver vincado (risco de palito), troca completa da bengala (peça usada de moto similar, R$ 150–300). Troque o óleo de bengala (SAE 10W, 180mL/tubo) junto com o retentor.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 428H: limpe após cada trilha com lama — areia corrói em 5.000 km',
    body: 'A areia que adere à corrente lubrificada funciona como abrasivo. Após trilhas, limpe a corrente com querosene (não WD-40 sozinho) e lubrificaride novamente. Uma corrente limpa e lubrificada dura 15.000+ km; suja com areia, dura 5.000 km. Kit de relação trail: corrente DID 428H com O-ring para maior vedação contra sujeira — custa mais mas dura o dobro.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento: protetor de calor é item de segurança — o cano queima a bota',
    body: 'O escapamento lateral da CRZ 150 passa próximo à bota direita do piloto. Em trilhas com lama, detritos queimam no escapamento. Mais crítico: a bota pode encostar no escapamento em posição de terra — causa queimadura de 2º grau. Instale protetor de calor universal para escapamento (R$ 30–80 na internet) antes de qualquer uso off-road.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro tambor: lona embebida em lama perde aderência',
    body: 'O freio traseiro de tambor da CRZ 150 perde eficiência com lama infiltrada. Em trilhas com córregos, a lama entra pelo tambor e reduz o atrito da lona. Solução temporária: acionamentos repetidos do freio traseiro "aquece" e evapora a umidade. Inspeção após trilha: retire a roda, limpe o tambor com pano seco e verifique a espessura da lona (mínimo 2mm).',
  },
]

const CRZ150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma CRZ 150: uso off-road exige intervalos mais curtos',
    body: '500 km — Troca de óleo inicial. | 2.000 km (off-road) ou 3.000 km (asfalto) — Troca de óleo (20W-50 JASO MA, 1,0L). | 2.000 km — Limpar filtro de ar (espuma) se uso off-road. | Após cada trilha com lama — Limpar corrente. Limpar carburador PZ27. Limpar filtro de ar. | 5.000 km — Trocar filtro de ar. Verificar folga de válvulas (adm 0,05mm / esc 0,08mm). | 8.000 km — Trocar vela D8EA. Inspecionar retentor da bengala. | 10.000 km — Inspecionar lona freio traseiro. Kit relação 428H se desgastado.',
  },
]

// ─── CRZ 150 SUPER MOTO ──────────────────────────────────────────────────────
// Motor: 149,4cc OHC monocilíndrico ar — mesmo motor da CRZ 150 trail
// Pneus SUPERMOTO: 100/80-17 (F) / 130/70-17 (R) — rodas menores e pneus de asfalto

const CRZ150SM_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Supermoto: pneus 100/80-17 + 130/70-17 — setup de asfalto, não serve para trilha',
    body: 'A CRZ 150 Super Moto vem de fábrica com rodas menores (17") e pneus de asfalto — ideal para curvas na rua mas sem capacidade off-road real (sem a roda de 21"). Se você quer usar off-road, troque as rodas completas pela configuração da CRZ trail. Pneus recomendados para supermoto na rua: Pirelli Angel City 100/80-17 (F) e 130/70-17 (R), ou Michelin Pilot Street 2.',
  },
  {
    severity: 'OK',
    title: 'Motor idêntico à CRZ trail: manutenção igual, mas sem a necessidade de limpeza pós-trilha',
    body: 'O motor 149,4cc OHC da CRZ 150 SM é idêntico ao da versão trail. A diferença é apenas na suspensão (ajustada para asfalto) e nas rodas/pneus. Manutenção: mesmos intervalos da CRZ trail em uso normal de asfalto (sem a emergência pós-trilha). Filtro de ar: limpe a cada 5.000 km apenas (menos exposição à poeira de terra).',
  },
  {
    severity: 'WARN',
    title: 'Suspensão mais rígida que a trail: cuide dos pneus bem calibrados',
    body: 'A CRZ 150 SM tem suspensão ajustada para o asfalto — mais rígida que a versão trail. Pneus com pressão errada comprometem a estabilidade e o desgaste em curvas. Calibre corretamente: F 29 PSI / R 33 PSI (solo), F 29 / R 36 PSI (com carona). Verifique mensalmente. Com a suspensão mais rígida, variações de pressão são mais perceptíveis na direção.',
  },
]

const CRZ150SM_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Pneus de supermoto desgastam mais rápido em uso urbano intenso',
    body: 'Os pneus 100/80-17 e 130/70-17 da CRZ SM têm perfil mais esportivo — desgastam mais rápido que os pneus trail em uso urbano com freios bruscos. Inspeção: verifique a profundidade do sulco a cada 5.000 km — mínimo 1,6mm (legal) mas recomendado trocar com 2mm. O pneu traseiro desgasta cerca de 2× mais rápido que o dianteiro.',
  },
  {
    severity: 'WARN',
    title: 'CDI e elétrica: mesma vulnerabilidade das Kasinski 150cc',
    body: 'O CDI da CRZ 150 SM tem o mesmo problema de disponibilidade que outras Kasinski 150cc. CDI genérico de 6 pinos para motos 150cc chinesas é o caminho após falha. Conector do CDI: verifique oxidação a cada 12 meses — limpar com WD-40 Contato previne falhas intermitentes.',
  },
]

const CRZ150SM_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma CRZ 150 SM: uso urbano/asfalto, intervalos standard 150cc',
    body: '3.000 km — Troca de óleo (20W-50 JASO MA, 1,0L). | 5.000 km — Limpar/trocar filtro de ar. Verificar gap vela D8EA. | 8.000 km — Trocar vela D8EA. Folga de válvulas (adm 0,05mm / esc 0,08mm). | 10.000 km — Kit relação 428H (se desgastado). Pastilha de freio dianteiro. | 15.000 km — Inspecionar retentor de bengala. Fluido de freio DOT 4 (se tem disco).',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'GV 250 MIRAGE',
    yearFrom: 2007, yearTo: 2014,
    MACETES: GV250MIRAGE_MACETES,
    PROBLEMAS: GV250MIRAGE_PROBLEMAS,
    MANUTENCAO: GV250MIRAGE_MANUTENCAO,
  },
  {
    modelName: 'MIRAGE 150',
    yearFrom: 2012, yearTo: 2014,
    MACETES: MIRAGE150_MACETES,
    PROBLEMAS: MIRAGE150_PROBLEMAS,
    MANUTENCAO: MIRAGE150_MANUTENCAO,
  },
  {
    modelName: 'MIRAGE 650 V2power',
    yearFrom: 2006, yearTo: 2014,
    MACETES: MIRAGE650_MACETES,
    PROBLEMAS: MIRAGE650_PROBLEMAS,
    MANUTENCAO: MIRAGE650_MANUTENCAO,
  },
  {
    modelName: 'CRZ 150',
    yearFrom: 2009, yearTo: 2014,
    MACETES: CRZ150_MACETES,
    PROBLEMAS: CRZ150_PROBLEMAS,
    MANUTENCAO: CRZ150_MANUTENCAO,
  },
  {
    modelName: 'CRZ 150 SUPER MOTO',
    yearFrom: 2012, yearTo: 2014,
    MACETES: CRZ150SM_MACETES,
    PROBLEMAS: CRZ150SM_PROBLEMAS,
    MANUTENCAO: CRZ150SM_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'GV 250 MIRAGE',
    yearFrom: 2007, yearTo: 2014,
    tireSize: '100/90-18 (F) · 140/90-15 (R)',
    frontPsi: 29, rearPsi: 33,
    frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Solo: F 29 / R 33 PSI. Com carona: F 29 / R 36 PSI. Cruiser V-twin 249cc. Pneus de flancos altos (perfil 90) — verificar pressão mensalmente com manômetro.',
  },
  {
    modelName: 'MIRAGE 150',
    yearFrom: 2012, yearTo: 2014,
    tireSize: '2.75/18 (F) · 3.50/16 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 32,
    notes: 'Solo: F 26 / R 28 PSI. Com carona: F 26 / R 32 PSI. Aro 16 traseiro (menor que convencional). Pneu dianteiro estreito 2.75/18. Pirelli Sport Demon na medida original.',
  },
  {
    modelName: 'MIRAGE 650 V2power',
    yearFrom: 2006, yearTo: 2014,
    tireSize: '110/90-18 (F) · 160/80-15 (R)',
    frontPsi: 29, rearPsi: 33,
    frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Solo: F 29 / R 33 PSI. Com carona: F 29 / R 36 PSI. Cruiser V-twin 647cc. Pneus de flancos altos para conforto em viagem. Dunlop D402 ou Metzeler ME 880 recomendados.',
  },
  {
    modelName: 'CRZ 150',
    yearFrom: 2009, yearTo: 2014,
    tireSize: '2.75/21 (F) · 4.10/18 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Asfalto: F 26 / R 28 PSI. Trilha: F 18–22 / R 22–25 PSI (menor pressão = mais tração). Com carona asfalto: F 26 / R 33 PSI. Aro 21 dianteiro trail. Pirelli MT90 Scorpion 2.75/21 (F).',
  },
  {
    modelName: 'CRZ 150 SUPER MOTO',
    yearFrom: 2012, yearTo: 2014,
    tireSize: '100/80-17 (F) · 130/70-17 (R)',
    frontPsi: 29, rearPsi: 33,
    frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Solo: F 29 / R 33 PSI. Com carona: F 29 / R 36 PSI. Supermoto com pneus de asfalto. Pirelli Angel City ou Michelin Pilot Street 2. NÃO usar em trilha — sem capacidade off-road.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // GV 250 MIRAGE
  { modelName: 'GV 250 MIRAGE', yearFrom: 2007, yearTo: 2014, component: 'Óleo 10W-40 JASO MA (2,0L s/ filtro / 2,2L c/ filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor DOHC V-twin Hyosung GV250. Semissintético JASO MA.', priority: 'HIGH', order: 1 },
  { modelName: 'GV 250 MIRAGE', yearFrom: 2007, yearTo: 2014, component: 'Velas NGK CR8E ×2 (gap 0,7–0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Sempre em par.', priority: 'HIGH', order: 2 },
  { modelName: 'GV 250 MIRAGE', yearFrom: 2007, yearTo: 2014, component: 'Sincronização carburadores duplos Mikuni', intervalKm: 10000, intervalMonths: 12, notes: 'Vacuômetro duplo. Versão carburada.', priority: 'HIGH', order: 3 },
  { modelName: 'GV 250 MIRAGE', yearFrom: 2007, yearTo: 2014, component: 'Folga de válvulas (adm 0,10mm / esc 0,15mm)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio. DOHC 8 válvulas.', priority: 'HIGH', order: 4 },
  { modelName: 'GV 250 MIRAGE', yearFrom: 2007, yearTo: 2014, component: 'Filtro de óleo (Hiflofiltro HF152)', intervalKm: 10000, intervalMonths: 12, notes: 'Compatível Hyosung GV250. O-ring com óleo ao montar.', priority: 'MEDIUM', order: 5 },
  { modelName: 'GV 250 MIRAGE', yearFrom: 2007, yearTo: 2014, component: 'Verificação retificador (13,5–14,5V @ 4.000 rpm)', intervalKm: null, intervalMonths: 6, notes: 'Ponto crítico. Substituir após 40.000 km.', priority: 'CRITICAL', order: 6 },
  { modelName: 'GV 250 MIRAGE', yearFrom: 2007, yearTo: 2014, component: 'Lubrificação corrente', intervalKm: 500, intervalMonths: null, notes: 'Spray ou óleo 80W-90. Folga 25–35mm.', priority: 'HIGH', order: 7 },
  { modelName: 'GV 250 MIRAGE', yearFrom: 2007, yearTo: 2014, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 8 },

  // MIRAGE 150
  { modelName: 'MIRAGE 150', yearFrom: 2012, yearTo: 2014, component: 'Óleo 20W-50 JASO MA (1,1L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 149cc OHC chinês. Mineral 20W-50 adequado.', priority: 'HIGH', order: 1 },
  { modelName: 'MIRAGE 150', yearFrom: 2012, yearTo: 2014, component: 'Vela NGK D8EA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Equivalente Denso U24ES. Inspecionar a cada 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'MIRAGE 150', yearFrom: 2012, yearTo: 2014, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'MIRAGE 150', yearFrom: 2012, yearTo: 2014, component: 'Limpeza carburador PZ27', intervalKm: 8000, intervalMonths: 12, notes: 'Jato principal 105, piloto 38. Boia nível 21mm.', priority: 'MEDIUM', order: 4 },
  { modelName: 'MIRAGE 150', yearFrom: 2012, yearTo: 2014, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio. OHC monocilíndrico.', priority: 'HIGH', order: 5 },
  { modelName: 'MIRAGE 150', yearFrom: 2012, yearTo: 2014, component: 'Lona freio traseiro (tambor)', intervalKm: 12000, intervalMonths: null, notes: 'Espessura mínima 2mm. Lona com óleo = troca imediata.', priority: 'MEDIUM', order: 6 },

  // MIRAGE 650 V2power
  { modelName: 'MIRAGE 650 V2power', yearFrom: 2006, yearTo: 2014, component: 'Óleo 10W-40 JASO MA (4,0L)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor 647cc DOHC V-twin Hyosung GV650. Semissintético.', priority: 'HIGH', order: 1 },
  { modelName: 'MIRAGE 650 V2power', yearFrom: 2006, yearTo: 2014, component: 'Velas NGK CR8E ×2 (gap 0,7–0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Par obrigatório.', priority: 'HIGH', order: 2 },
  { modelName: 'MIRAGE 650 V2power', yearFrom: 2006, yearTo: 2014, component: 'Filtro de óleo (Hiflofiltro HF152)', intervalKm: 10000, intervalMonths: 12, notes: 'Compatível Hyosung GV650.', priority: 'MEDIUM', order: 3 },
  { modelName: 'MIRAGE 650 V2power', yearFrom: 2006, yearTo: 2014, component: 'Folga de válvulas (adm 0,10mm / esc 0,15mm)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio. 8 válvulas DOHC.', priority: 'HIGH', order: 4 },
  { modelName: 'MIRAGE 650 V2power', yearFrom: 2006, yearTo: 2014, component: 'Lubrificação corrente 530', intervalKm: 500, intervalMonths: null, notes: 'Folga 25–35mm.', priority: 'HIGH', order: 5 },
  { modelName: 'MIRAGE 650 V2power', yearFrom: 2006, yearTo: 2014, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal.', priority: 'HIGH', order: 6 },
  { modelName: 'MIRAGE 650 V2power', yearFrom: 2006, yearTo: 2014, component: 'Retificador/regulador — verificação preventiva', intervalKm: null, intervalMonths: 6, notes: 'Substituição preventiva aos 40.000 km. Ponto crítico #1.', priority: 'CRITICAL', order: 7 },
  { modelName: 'MIRAGE 650 V2power', yearFrom: 2006, yearTo: 2014, component: 'Kit relação 530', intervalKm: 25000, intervalMonths: null, notes: 'DID ou RK 530GXW. Trocar kit completo.', priority: 'HIGH', order: 8 },

  // CRZ 150
  { modelName: 'CRZ 150', yearFrom: 2009, yearTo: 2014, component: 'Óleo 20W-50 JASO MA (1,0L)', intervalKm: 2000, intervalMonths: 6, notes: 'Off-road: 2.000 km. Asfalto: 3.000 km. Pó contamina óleo mais rapidamente.', priority: 'HIGH', order: 1 },
  { modelName: 'CRZ 150', yearFrom: 2009, yearTo: 2014, component: 'Filtro de ar (espuma) — limpeza', intervalKm: 2000, intervalMonths: null, notes: 'Off-road: a cada 2.000 km. Querosene + secar + óleo leve antes de reinstalar.', priority: 'HIGH', order: 2 },
  { modelName: 'CRZ 150', yearFrom: 2009, yearTo: 2014, component: 'Limpeza corrente após trilha', intervalKm: null, intervalMonths: null, notes: 'Após cada trilha com lama/areia. Querosene + lubrificante.', priority: 'HIGH', order: 3 },
  { modelName: 'CRZ 150', yearFrom: 2009, yearTo: 2014, component: 'Vela NGK D8EA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Verificar a cada 5.000 km. Iridium D8EIX dura 20.000 km.', priority: 'MEDIUM', order: 4 },
  { modelName: 'CRZ 150', yearFrom: 2009, yearTo: 2014, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm)', intervalKm: 5000, intervalMonths: 12, notes: 'Off-road exige intervalo mais curto. Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'CRZ 150', yearFrom: 2009, yearTo: 2014, component: 'Lona freio traseiro — inspeção após trilha', intervalKm: 5000, intervalMonths: null, notes: 'Lama infiltrada no tambor reduz aderência. Mínimo 2mm.', priority: 'MEDIUM', order: 6 },
  { modelName: 'CRZ 150', yearFrom: 2009, yearTo: 2014, component: 'Kit relação 428H (coroa + pinhão + corrente)', intervalKm: 12000, intervalMonths: null, notes: 'Off-road: inspecionar a cada 5.000 km. DID 428H com O-ring: mais durável.', priority: 'HIGH', order: 7 },
  { modelName: 'CRZ 150', yearFrom: 2009, yearTo: 2014, component: 'Retentor bengala ø35mm', intervalKm: 15000, intervalMonths: null, notes: 'Off-road pesado: pode ceder antes. Peça genérica 35×47×11mm.', priority: 'MEDIUM', order: 8 },

  // CRZ 150 SUPER MOTO
  { modelName: 'CRZ 150 SUPER MOTO', yearFrom: 2012, yearTo: 2014, component: 'Óleo 20W-50 JASO MA (1,0L)', intervalKm: 3000, intervalMonths: 6, notes: 'Uso asfalto — 3.000 km suficiente.', priority: 'HIGH', order: 1 },
  { modelName: 'CRZ 150 SUPER MOTO', yearFrom: 2012, yearTo: 2014, component: 'Vela NGK D8EA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Mesmo motor da CRZ trail.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CRZ 150 SUPER MOTO', yearFrom: 2012, yearTo: 2014, component: 'Pastilha freio dianteiro (disco)', intervalKm: 10000, intervalMonths: null, notes: 'Inspecionar espessura a cada 5.000 km. Mínimo 2mm.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CRZ 150 SUPER MOTO', yearFrom: 2012, yearTo: 2014, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 4 },
  { modelName: 'CRZ 150 SUPER MOTO', yearFrom: 2012, yearTo: 2014, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio.', priority: 'HIGH', order: 5 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Kasinski Mirage/GV250/CRZ...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'KASINSKI', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'KASINSKI', vehicleTypeId: motoType.id },
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

  console.log('✅ Kasinski Mirage/CRZ concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
