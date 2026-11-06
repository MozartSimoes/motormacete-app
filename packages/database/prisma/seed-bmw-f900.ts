/**
 * Seed BMW F 900 GS / F 900 R — macetes, problemas e manutenção
 * Cobre a plataforma bicilíndrica paralela 895cc (F 900 GS e F 900 R),
 * sucessora/irmã da plataforma F 750/850 GS (853cc) no line-up BMW Motorrad
 *
 * Fontes: bmw-motorrad.com.br, maintenanceschedule.com, motorcycleparts-hornig.com,
 *         bmwgsbrasil.com.br, reclameaqui.com.br, advrider.com, reddit.com/r/bmwmotorrad,
 *         ManualsLib (manuais oficiais)
 *
 * Execute: pnpm --filter @motormacete/database db:seed:bmw-f900
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

// ─── F 900 GS ──────────────────────────────────────────────────────────────

const F900GS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 895cc: bicilíndrico paralelo com curso idêntico ao da F 850 GS, só o cilindro é maior',
    body: 'A F 900 GS usa o bicilíndrico paralelo de 895cc, refrigerado a líquido, DOHC 8 válvulas, com distribuição de 270°. O curso (77 mm) é o mesmo da F 850 GS (853cc) — a BMW aumentou apenas o diâmetro do cilindro (86 mm vs 84 mm) para chegar aos ~105 cv a 8.500 RPM e ~92 Nm a 6.750 RPM. Isso significa que virabrequim, bielas e boa parte da distribuição compartilham cotas de projeto com a F 750/850 GS — só pistões, anéis e alguns componentes do cabeçote são exclusivos do 895cc. Útil saber ao procurar peças em oficinas especializadas em BMW que já atendem a família F 8xx.',
  },
  {
    severity: 'OK',
    title: 'Óleo 5W-40 sintético JASO MA2 — cerca de 3,3L com troca de filtro',
    body: 'Capacidade estimada de óleo: 3,3L com troca de filtro (3,0L sem troca) — um pouco mais que a F 850 GS por causa do maior deslocamento. Especificação: SAE 5W-40 API SL/SN, JASO MA2 (obrigatório — embreagem multidisco em banho de óleo). Recomendado: BMW Motorrad Advantec Ultimate ou equivalente Motul 7100/300V 5W-40. Filtro de óleo: mesma família da F 850 GS — Hiflofiltro HF160RC ou Mahle OC613 encaixam (mesmo bloco/carter). Intervalo: 10.000 km ou 12 meses.',
  },
  {
    severity: 'WARN',
    title: 'Vela iridium NGK LMAR8A-9 — intervalo mais longo que a geração anterior',
    body: 'A F 900 GS usa vela iridium (estimativa de referência NGK LMAR8A-9, confirme com o número de peça BMW do seu chassi na hora da compra) — o eletrodo de irídio permite intervalo de 20.000 km, mesmo patamar da F 850 GS mas com queima mais eficiente e partida a frio mais consistente. São 2 velas (uma por cilindro). Custo estimado: R$ 100–R$ 180 cada. Não troque por vela de níquel comum pensando em economizar — a relação de compressão mais alta (12,7:1) do 895cc é mais exigente com o eletrodo.',
  },
  {
    severity: 'OK',
    title: 'Transmissão por corrente 525: sem cardan, diferente das boxer GS — planeje lubrificação',
    body: 'Ao contrário das R 1250 GS e R 1200 GS (transmissão por cardan), a F 900 GS usa corrente 525 — igual à F 850 GS. Quem troca de uma boxer GS para a F 900 GS precisa se acostumar a lubrificar a corrente a cada 500 km em uso normal (200 km em chuva ou off-road). Kit completo (corrente + pinhão + coroa): R$ 700–R$ 1.200 no mercado nacional (DID 525VX3, RK 525MO). Vantagem sobre o cardan: manutenção mais barata e mais fácil de fazer sozinho na garagem.',
  },
  {
    severity: 'OK',
    title: 'Aro 21" dianteiro / 17" traseiro: mesma configuração da F 850 GS — pneus compartilhados',
    body: 'A F 900 GS mantém a configuração de rodas da F 850 GS: 21" na frente e 17" atrás, com medidas 90/90-21 e 150/70-17. Isso significa que o mesmo estoque de pneus de aventura que já atende a F 750/850 GS serve na F 900 GS — Pirelli Scorpion Rally STR, Metzeler Karoo 4, Continental TKC80 e Continental Trail Attack são as opções mais buscadas no Brasil. Vantagem prática: borracharias especializadas em BMW GS já têm familiaridade com o aro 21", menos comum em outras marcas.',
  },
  {
    severity: 'OK',
    title: 'GS-911 continua sendo a ferramenta de diagnóstico universal para a F 900 GS',
    body: 'O adaptador GS-911 (versão WiFi ou Bluetooth, R$ 600–R$ 900 importado) lê todos os módulos eletrônicos da F 900 GS: motor, ABS Pro, ASC/DTC, TFT e keyless. Com ele é possível apagar códigos de falha (DTC), recalibrar sensores após queda e resetar o indicador de revisão sem depender só da concessionária. Alternativa: apps como "MotoBM" com adaptador OBD2 BMW Motorrad (R$ 150–R$ 300). Mecânicos independentes especializados em BMW em SP, RJ, BH e Curitiba costumam ter a versão Professional da ferramenta.',
  },
  {
    severity: 'WARN',
    title: 'Modo off-road: desative o ASC traseiro só se souber pilotar em piso solto',
    body: 'A F 900 GS tem modos Rain, Road, Dynamic e Enduro (com Enduro Pro opcional). No modo Enduro, o ABS traseiro é reduzido e o controle de tração fica mais permissivo — ideal para trilha, mas perigoso no asfalto molhado se ativado por engano. Depois de qualquer trilha, lembre de voltar para o modo Road antes de pegar rodovia ou trânsito urbano. O quickshifter Pro (quando equipado) funciona melhor entre 3.000 e 8.000 RPM — trocas fora dessa faixa podem ficar bruscas.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar e parte elétrica compartilham layout com a família F 8xx — facilita achar peça',
    body: 'O compartimento do filtro de ar e o chicote elétrico da F 900 GS seguem a mesma arquitetura da F 850 GS — muitos consumíveis (relés, fusíveis, conectores) são intercambiáveis. Filtro de ar: use referência Hiflofiltro HFA7801 ou equivalente Tecfil como ponto de partida na oficina (confirme encaixe antes de comprar, pois o coletor de admissão foi revisado no 895cc). Essa proximidade de plataforma reduz o tempo de espera por peça em cidades sem concessionária BMW.',
  },
]

const F900GS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Para-brisa da versão Adventure: buffeting (vento batendo no capacete) reportado por vários donos',
    body: 'Donos da F 900 GS Adventure relatam turbulência de vento na altura do capacete em velocidades de rodovia (100+ km/h), mesmo com o para-brisa na posição mais alta. É um problema estético/aerodinâmico, não mecânico. Solução mais eficaz reportada em fóruns (ADVrider, grupos BR): para-brisa aftermarket mais alto e com aletas laterais (MRA Vario, Puig Touring) — R$ 400–R$ 900. Ajustar o ângulo do para-brisa original também ajuda parcialmente antes de investir em peça nova.',
  },
  {
    severity: 'WARN',
    title: 'Drenagem de bateria pelo módulo keyless — desligue tudo se ficar parada por semanas',
    body: 'Como em outras BMWs recentes com chave de proximidade (keyless), a F 900 GS mantém módulos em stand-by mesmo desligada, o que drena a bateria lentamente (alguns proprietários reportam consumo perceptível após 3–4 semanas parada). Solução: carregador de manutenção compatível com AGM (CTEK, Optimate) sempre que a moto ficar mais de 2–3 semanas sem uso. Bateria AGM original: R$ 700–R$ 1.100. Alternativa: Yuasa AGM equivalente por R$ 400–R$ 600.',
  },
  {
    severity: 'WARN',
    title: 'Software/TFT: telas travando ou reiniciando sozinhas — peça atualização de firmware na revisão',
    body: 'Alguns proprietários relatam telas TFT congelando ou reiniciando espontaneamente, principalmente logo após ligar a moto em dias frios. Na maioria dos casos é resolvido com atualização de firmware feita pela concessionária (gratuita, geralmente incluída na revisão). Se o problema persistir após a atualização, vale registrar o ocorrido formalmente (BMW Brasil 0800) para rastreamento — isso ajuda a identificar se é caso de lote específico.',
  },
  {
    severity: 'WARN',
    title: 'Corrente desgasta mais rápido que o esperado por quem vem de moto com cardan',
    body: 'Proprietários que trocam de uma R 1250 GS (cardan) para a F 900 GS relatam surpresa com a frequência de manutenção da corrente — antes de acostumar à rotina de lubrificação a cada 500 km, é comum a corrente esticar e precisar de ajuste de tensão prematuro (antes dos 10.000 km). Isso não é defeito, é característica da transmissão por corrente. Regule a folga (25–30 mm na parte inferior) a cada troca de óleo até pegar o ritmo.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala: vazamento em uso off-road intenso, mesmo padrão da F 850 GS',
    body: 'Como a F 850 GS, a F 900 GS tem bengala convencional (não Telelever) e os retentores sofrem com poeira e areia em trilha pesada. Sintoma: mancha de óleo abaixo do tubo da bengala. Prevenção: instale protetores de bengala (fork boots) antes de rodar off-road com frequência — R$ 60–R$ 150 o par. Troca de retentores em oficina especializada: R$ 300–R$ 550 em peças e mão de obra.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de nível de combustível: leitura imprecisa relatada por alguns donos nos primeiros km',
    body: 'Há relatos esparsos (fóruns internacionais e nacionais) de leitura inconsistente do sensor de nível de combustível — o painel mostra reserva antes do esperado ou o contador de autonomia oscila bastante. Na maioria dos casos, o problema se estabiliza após os primeiros 1.000–2.000 km (o sensor capacitivo precisa de "aprendizado" do formato do tanque com combustíveis de composições diferentes, relevante no Brasil por causa do etanol na gasolina). Se persistir após 5.000 km, vale diagnóstico via GS-911.',
  },
]

const F900GS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma F 900 GS: revisão a cada 10.000 km, válvulas e velas a cada 20.000 km',
    body: '1.000 km — Revisão de rodagem obrigatória em concessionária (mantém garantia): óleo + filtro, aperto geral, checklist eletrônico. | 10.000 km — Óleo 5W-40 sintético (~3,3L com filtro) + filtro HF160RC/OC613 + corrente lubrificada e tensionada + freios verificados + nível de refrigerante. | 20.000 km — Tudo do 10k + 2 velas iridium (LMAR8A-9 ou equivalente conforme chassi) + filtro de ar (HFA7801) + folga de válvulas verificada e ajustada se necessário + fluido de freio e embreagem DOT 4 trocados. | 30.000 km — Tudo do 20k + óleo de garfo trocado + kit de corrente/pinhão/coroa se desgastado. | 40.000 km — Repetição do ciclo de 20k (velas, filtro de ar, válvulas). | Refrigerante: troca completa a cada 4 anos, BMW G12++ ou G13.',
  },
  {
    severity: 'OK',
    title: 'Calibragem de pneus F 900 GS: 33 psi frente / 36 psi atrás em uso solo, on-road',
    body: 'Pneus frios, uso on-road solo: dianteiro 90/90-21 = 33 psi (2,3 bar), traseiro 150/70-17 = 36 psi (2,5 bar). Com garupa ou bagagem: dianteiro 36 psi, traseiro 42 psi. Off-road leve (terra batida): reduza para 26/29 psi. Off-road técnico (pedra solta, lama): 22/26 psi — retorne à pressão de estrada assim que voltar ao asfalto. Como herda o mesmo conjunto de rodas da F 850 GS, os mesmos pneus de aventura (Scorpion Rally STR, Karoo 4) servem sem adaptação.',
  },
]

// ─── F 900 R ───────────────────────────────────────────────────────────────

const F900R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor 895cc da F 900 GS, mapeado para entrega de torque mais linear na rua',
    body: 'A F 900 R usa o mesmo bicilíndrico paralelo 895cc, DOHC, 270° da F 900 GS — potência semelhante (~105 cv a 8.500 RPM), mas com mapeamento de injeção ajustado para uma curva de torque mais cheia em médias rotações, priorizando resposta em saída de curva na rua em vez de tração em piso solto. Isso significa que consumíveis do motor (óleo, filtro, velas) são idênticos aos da F 900 GS — só muda o setup de suspensão, geometria e rodas.',
  },
  {
    severity: 'OK',
    title: 'Aro 17" nos dois eixos: pneus muito mais baratos e fáceis de achar que a F 900 GS',
    body: 'Diferente da F 900 GS (21"/17"), a F 900 R usa 17" na frente e atrás — medidas 120/70 ZR17 e 180/55 ZR17, típicas de naked esportiva. Isso abre um leque de opções muito maior e mais barato: Michelin Road 5, Pirelli Diablo Rosso IV, Bridgestone Battlax S22/T32, Continental ContiSportAttack. Encontrar esses pneus em qualquer cidade média do Brasil é bem mais fácil que o aro 21" da irmã aventureira.',
  },
  {
    severity: 'OK',
    title: 'Óleo e filtro intercambiáveis com a F 900 GS e compatíveis com a família F 850 GS',
    body: 'Como compartilha o bloco do motor com a F 900 GS, a F 900 R usa a mesma especificação de óleo (5W-40 sintético JASO MA2, ~3,3L com filtro) e o mesmo filtro (Hiflofiltro HF160RC ou Mahle OC613, mesma peça usada na família F 850 GS). Isso facilita muito encontrar peça em qualquer cidade que já atenda BMW GS — não é preciso procurar item exclusivo da linha R.',
  },
  {
    severity: 'OK',
    title: 'Embreagem antiderrapante (slipper clutch) de série: cuidado ao trocar reduções bruscas',
    body: 'A F 900 R vem com embreagem multidisco em banho de óleo com sistema antiderrapante (slipper/assist clutch) de série — reduz o efeito de travamento da roda traseira em reduções agressivas. O fluido de acionamento é hidráulico (DOT 4), compartilhado com o sistema de freio. Verifique o nível do reservatório da embreagem junto com o de freio a cada revisão — vazamento no sistema hidráulico da embreagem é raro, mas foi relatado por alguns proprietários em unidades com mais de 30.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Quickshifter (quando equipado): funciona melhor com trocas decididas, não hesitantes',
    body: 'O quickshifter up/down da F 900 R (de série ou opcional a depender da versão/ano) tem melhor resposta com trocas de marcha firmes e decididas — trocas hesitantes ou muito lentas no pedal podem causar engate brusco ou falha ocasional em detectar a troca. Funciona melhor entre 3.000–9.000 RPM. Se notar comportamento inconsistente, verifique se há atualização de firmware disponível na concessionária.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525: mesma peça e mesma rotina da F 900 GS — sem cardan também na R',
    body: 'A F 900 R usa a mesma corrente 525 e a mesma rotina de lubrificação (a cada 500 km, kit completo a cada 20.000–25.000 km) da F 900 GS. Em uso esportivo com acelerações mais bruscas (comum no perfil naked), a corrente tende a esticar um pouco mais rápido que em uso de estrada tranquilo — vale checar a tensão a cada 3.000–5.000 km em vez de esperar a revisão programada.',
  },
  {
    severity: 'OK',
    title: 'GS-911 e apps BMW Motorrad Connected funcionam igual na F 900 R',
    body: 'O adaptador GS-911 e o app BMW Motorrad Connected funcionam de forma idêntica na F 900 R — leitura de módulos, ajuste de modos de pilotagem (Rain, Road, Dynamic, Dynamic Pro quando equipado) e navegação conectada ao TFT. Vale configurar o Dynamic Pro para liberar o controle de tração dependente do ângulo de inclinação apenas se você já tiver experiência em pilotagem esportiva — no modo mais aberto, o DTC intervém bem menos.',
  },
  {
    severity: 'OK',
    title: 'Peso menor que a F 900 GS facilita o dia a dia urbano',
    body: 'A F 900 R é sensivelmente mais leve que a F 900 GS (a naked não carrega carenagem de aventura nem suspensão de curso longo) — isso se traduz em manobrabilidade melhor em trânsito parado e estacionamento. Em compensação, o tanque é menor que o da GS, então a autonomia em viagem é um pouco mais curta — planeje paradas de combustível mais frequentes em estrada.',
  },
]

const F900R_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vibração perceptível em alta rotação sustentada — motor mais "vivo" que a versão GS',
    body: 'Por ter mapeamento mais esportivo, alguns donos da F 900 R relatam vibração mais perceptível nos punhos e nos apoios de pé em rotações sustentadas acima de 7.000 RPM — mais notável que na F 900 GS, que tende a ser usada em regime mais constante. Isso é característico do motor bicilíndrico de 270° empurrado para entregar mais performance, não indica defeito. Manoplas com peso interno ou contrapesos de guidão amenizam a sensação.',
  },
  {
    severity: 'WARN',
    title: 'Corrente desgasta mais rápido em uso esportivo do dia a dia',
    body: 'Pelo perfil de uso mais agressivo (acelerações e frenagens mais bruscas, típicas de naked esportiva), a corrente 525 da F 900 R tende a precisar de ajuste de tensão e troca de kit em intervalos um pouco mais curtos que o cronograma padrão — fique atento a sinais de desgaste lateral e folga excessiva antes dos 20.000 km programados.',
  },
  {
    severity: 'WARN',
    title: 'Drenagem de bateria pelo sistema keyless — mesmo comportamento da F 900 GS',
    body: 'A F 900 R compartilha o sistema de chave de proximidade com a F 900 GS e apresenta o mesmo padrão de drenagem lenta de bateria em módulos de stand-by. Use carregador de manutenção compatível com AGM em períodos de mais de 2–3 semanas parada. Sintomas de bateria fraca: partida lenta, relógio do painel resetando, avisos de sensor sem causa aparente.',
  },
  {
    severity: 'WARN',
    title: 'Software/TFT: mesmos relatos esporádicos de tela travando da linha F 900',
    body: 'Como a F 900 GS, alguns proprietários da F 900 R relatam telas TFT congelando ou reiniciando sozinhas, principalmente em partidas a frio. Solução na maioria dos casos: atualização de firmware na concessionária, geralmente sem custo dentro da garantia. Vale confirmar a versão de software instalada a cada revisão.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento baixo (underslung): atenção redobrada com lombadas e buracos no Brasil',
    body: 'A F 900 R tem escapamento posicionado sob o motor (underslung), o que melhora a centralização de massa e o visual da moto, mas reduz um pouco a distância ao solo na região central comparado a modelos com escape lateral tradicional. Em vias brasileiras com lombadas mal sinalizadas ou buracos profundos, isso exige atenção redobrada — um impacto pode amassar a proteção do escapamento. Proteção de escapamento (exhaust guard) aftermarket é um acessório recomendado para quem roda muito em vias urbanas irregulares.',
  },
  {
    severity: 'WARN',
    title: 'Fluido da embreagem hidráulica: vazamento ocasional relatado em unidades com mais uso',
    body: 'Embora raro, alguns proprietários relataram pequeno vazamento no sistema hidráulico da embreagem (reservatório ou linha) em unidades com mais de 30.000 km. Sintoma: nível do reservatório de embreagem caindo sem explicação, ou embreagem ficando "mole"/com curso maior no manete. Verifique o nível junto com o fluido de freio a cada revisão — se cair sem motivo aparente, procure oficina especializada antes de rodar em viagem longa.',
  },
]

const F900R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma F 900 R: idêntico ao motor da F 900 GS, calibragem e pneus diferentes',
    body: '1.000 km — Revisão de rodagem obrigatória (dealer): óleo + filtro + aperto geral. | 10.000 km — Óleo 5W-40 sintético (~3,3L com filtro) + filtro HF160RC/OC613 + corrente lubrificada e tensionada + freios e embreagem hidráulica verificados. | 20.000 km — Tudo do 10k + 2 velas iridium + filtro de ar + folga de válvulas verificada + fluido de freio e embreagem DOT 4 trocados. | 30.000 km — Tudo do 20k + óleo de garfo trocado + kit de corrente se necessário. | 40.000 km — Repetição do ciclo de 20k. | Calibragem: 36 psi frente / 42 psi atrás, pneus frios, uso solo em rua.',
  },
]

// ─── Blocos de modelos ────────────────────────────────────────────────────────

const f900Models: ModelBlock[] = [
  {
    modelName: 'F 900 GS',
    yearFrom: 2024,
    yearTo: null,
    MACETES: F900GS_MACETES,
    PROBLEMAS: F900GS_PROBLEMAS,
    MANUTENCAO: F900GS_MANUTENCAO,
  },
  {
    modelName: 'F 900 R',
    yearFrom: 2020,
    yearTo: null,
    MACETES: F900R_MACETES,
    PROBLEMAS: F900R_PROBLEMAS,
    MANUTENCAO: F900R_MANUTENCAO,
  },
]

// ─── Calibragem de pneus ──────────────────────────────────────────────────────

const f900TirePressures: TirePressureInput[] = [
  {
    modelName: 'F 900 GS',
    yearFrom: 2024,
    yearTo: null,
    tireSize: 'Dianteiro 90/90-21 | Traseiro 150/70-17',
    frontPsi: 33,
    rearPsi: 36,
    frontPsiLoad: 36,
    rearPsiLoad: 42,
    notes: 'Mesma configuração de rodas da F 850 GS. On-road solo: 33/36 psi. Com garupa ou bagagem: 36/42 psi. Off-road suave (terra batida): reduzir para 26/29 psi. Off-road técnico (pedra, lama): 22/26 psi — retorne à pressão de estrada ao voltar ao asfalto. Pirelli Scorpion Rally STR e Metzeler Karoo 4 são os pneus mais buscados no Brasil para esse aro.',
  },
  {
    modelName: 'F 900 R',
    yearFrom: 2020,
    yearTo: null,
    tireSize: 'Dianteiro 120/70 ZR17 | Traseiro 180/55 ZR17',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: 36,
    rearPsiLoad: 45,
    notes: 'Aro 17" nos dois eixos — pneus mais baratos e fáceis de achar que os da F 900 GS. Solo: 36/42 psi frios. Com garupa: 36/45 psi. Michelin Road 5, Pirelli Diablo Rosso IV e Bridgestone Battlax S22/T32 são as opções mais comuns no Brasil.',
  },
]

// ─── Cronogramas de manutenção ────────────────────────────────────────────────

const f900MaintenanceItems: MaintenanceItemInput[] = [

  // ── F 900 GS ───────────────────────────────────────────────────────────────
  { modelName: 'F 900 GS', yearFrom: 2024, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético JASO MA2)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume estimado: 3,3L com filtro (3,0L sem troca). SAE 5W-40 API SL/SN, JASO MA2 obrigatório. BMW Advantec Ultimate ou Motul 7100/300V. Filtro: Hiflofiltro HF160RC ou Mahle OC613 (mesma família da F 850 GS).' },
  { modelName: 'F 900 GS', yearFrom: 2024, yearTo: null, order: 1,
    component: 'Vela iridium (2 velas, ex. NGK LMAR8A-9)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor bicilíndrico = 2 velas iridium. Confirme número de peça exato conforme chassi. Troca a cada 20.000 km. Compressão 12,7:1 exige eletrodo de irídio, não use vela de níquel comum.' },
  { modelName: 'F 900 GS', yearFrom: 2024, yearTo: null, order: 2,
    component: 'Filtro de ar (HFA7801 ou equivalente)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a cada 10.000 km, troque a cada 20.000 km ou antes em uso off-road intenso.' },
  { modelName: 'F 900 GS', yearFrom: 2024, yearTo: null, order: 3,
    component: 'Corrente 525 — lubrificação', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'A cada 500 km em uso normal (200 km em chuva ou off-road). Kit completo (corrente + pinhão + coroa) a cada 20.000–25.000 km.' },
  { modelName: 'F 900 GS', yearFrom: 2024, yearTo: null, order: 4,
    component: 'Folga de válvulas', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Verificação e ajuste a cada 20.000 km, motor completamente frio. Sistema shim-and-bucket como na F 850 GS.' },
  { modelName: 'F 900 GS', yearFrom: 2024, yearTo: null, order: 5,
    component: 'Fluido de freio e embreagem (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Sistema de embreagem também hidráulico. Troque junto com o fluido de freio a cada 2 anos.' },
  { modelName: 'F 900 GS', yearFrom: 2024, yearTo: null, order: 6,
    component: 'Óleo de garfo (bengala dianteira)', intervalKm: 30000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Troca a cada 30.000 km. Inspecione retentores a cada revisão — vazamento é ponto de atenção em uso off-road pesado.' },
  { modelName: 'F 900 GS', yearFrom: 2024, yearTo: null, order: 7,
    component: 'Refrigerante (troca completa)', intervalKm: null, intervalMonths: 48, priority: 'LOW',
    notes: 'A cada 4 anos. BMW G12++ ou G13.' },
  { modelName: 'F 900 GS', yearFrom: 2024, yearTo: null, order: 8,
    component: 'Bateria AGM — carregador de manutenção', intervalKm: null, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Conecte carregador compatível AGM (CTEK, Optimate) se a moto ficar parada mais de 2–3 semanas — sistema keyless drena bateria em stand-by.' },

  // ── F 900 R ────────────────────────────────────────────────────────────────
  { modelName: 'F 900 R', yearFrom: 2020, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético JASO MA2)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume estimado: 3,3L com filtro. Mesma especificação da F 900 GS — mesmo bloco de motor. Filtro: Hiflofiltro HF160RC ou Mahle OC613.' },
  { modelName: 'F 900 R', yearFrom: 2020, yearTo: null, order: 1,
    component: 'Vela iridium (2 velas)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Mesma vela da F 900 GS. Troca a cada 20.000 km.' },
  { modelName: 'F 900 R', yearFrom: 2020, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Mesmo filtro da F 900 GS. Troca a cada 20.000 km.' },
  { modelName: 'F 900 R', yearFrom: 2020, yearTo: null, order: 3,
    component: 'Corrente 525 — lubrificação', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'A cada 500 km. Em uso esportivo mais agressivo, verifique tensão a cada 3.000–5.000 km. Kit completo a cada 20.000 km.' },
  { modelName: 'F 900 R', yearFrom: 2020, yearTo: null, order: 4,
    component: 'Folga de válvulas', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Verificação a cada 20.000 km com motor frio.' },
  { modelName: 'F 900 R', yearFrom: 2020, yearTo: null, order: 5,
    component: 'Fluido de freio e embreagem (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Embreagem hidráulica com sistema antiderrapante (slipper clutch). Verifique nível a cada revisão — vazamento ocasional relatado em unidades com mais de 30.000 km.' },
  { modelName: 'F 900 R', yearFrom: 2020, yearTo: null, order: 6,
    component: 'Óleo de garfo', intervalKm: 30000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Troca a cada 30.000 km. Suspensão esportiva — inspecione ajuste de pré-carga conforme peso do piloto.' },
  { modelName: 'F 900 R', yearFrom: 2020, yearTo: null, order: 7,
    component: 'Proteção do escapamento (underslung)', intervalKm: null, intervalMonths: null, priority: 'LOW',
    notes: 'Inspecione após passar por lombadas ou buracos profundos — o escapamento baixo tem menor distância ao solo que modelos com escape lateral.' },
  { modelName: 'F 900 R', yearFrom: 2020, yearTo: null, order: 8,
    component: 'Bateria AGM — carregador de manutenção', intervalKm: null, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Mesmo comportamento de drenagem por keyless da F 900 GS. Use carregador AGM em períodos de mais de 2–3 semanas parada.' },
]

// ─── Runner ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed BMW F 900 GS / F 900 R iniciando...\n')

  const motoType = await prisma.vehicleType.findFirstOrThrow({
    where: { slug: 'moto' },
  })

  const bmwBrand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BMW', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'BMW', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${bmwBrand.name}`)

  for (const block of f900Models) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: bmwBrand.id } },
      update: {},
      create: { name: block.modelName, brandId: bmwBrand.id },
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
        yearFrom:  null,
        yearTo:    null,
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
      `${counts.m} macetes, ${counts.p} problemas, ${counts.mt} manutenção`,
    )
  }

  console.log('\n  📏 Calibragem de pneus...')
  for (const tp of f900TirePressures) {
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
  const modelNames = [...new Set(f900MaintenanceItems.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: f900MaintenanceItems.map(item => ({
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
    const count = f900MaintenanceItems.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = f900Models.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed BMW F 900 concluído: ${f900Models.length} modelos, ${totalTips} dicas, ${f900TirePressures.length} calibragens, ${f900MaintenanceItems.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
