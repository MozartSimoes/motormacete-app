/**
 * Seed Volvo S60 / V60 — macetes, problemas, manutenção e calibragem
 * Sedan médio-premium (S60) e sua versão perua (V60, a partir da 2ª geração).
 * Três gerações bem distintas:
 *  - Gen1 P2 (2000-2009): motor 5 cilindros 2.0T/2.4/2.4T/2.5T, câmbio manual
 *    ou automático Aisin/Geartronic. Inclui o icônico S60 R (2.5T 300cv, AWD,
 *    suspensão eletrônica Four-C). A V60 ainda não existia nesta geração —
 *    o wagon da época era vendido como V70 (modelo próprio).
 *  - Gen2 P3 (2010-2018): motor turbo T4/T5/T6 gasolina (e D3/D4/D5 diesel,
 *    pouco comuns no Brasil), plataforma compartilhada com S80, XC60 (1ª
 *    geração) e V70 desta era. Nasce a V60 como perua companheira do S60.
 *  - Gen3 SPA (2018+): motor T4/T5/T6 (mild-hybrid B4/B5/B6) e T8 Twin
 *    Engine plug-in hybrid, plataforma compartilhada com S90/XC60/XC90 desta
 *    era. Inclui as versões "Polestar Engineered" (T8, ~415cv combinados).
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-s60-v60
 *
 * Fontes: auto-doc.pt, opinautos.com.br, carrosluxuososa2z.com, mycarly.com,
 *         repairpal.com, whatcar.com, swedespeed.com, volvocars.com/br,
 *         reclameaqui.com.br, comprecar.com.br, xc40forum.com (plataforma
 *         irmã SPA/CMA, problemas de software e hastes de porta-malas)
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'
type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

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
  sparePsi: number | null
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
  priority: Priority
  order: number
}

// ─── Gen1 P2 (2000-2009) — só S60, a V60 ainda não existia ────────────────

const MACETES_GEN1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motores 5 cilindros 2.0T/2.4/2.4T/2.5T: peça compartilhada com S80/V70/XC70/XC90 da época',
    body: 'O S60 desta geração (plataforma P2) compartilha motor, câmbio e boa parte da suspensão com o S80, V70, XC70 e até a primeira XC90, todos da mesma era Volvo. Em oficina independente, procure peça "para plataforma P2 Volvo" além de "para S60" — amplia bastante a busca e costuma ser mais barato que peça específica de sedan.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático Aisin/Geartronic: troque o fluido, não é vitalício',
    body: 'Mesmo em unidades com poucos trancos, troque o fluido do câmbio automático periodicamente — o discurso de "óleo para a vida toda" não se sustenta bem em uso severo brasileiro. Antecipar a troca reduz bastante o risco de falha cara na caixa mais adiante.',
  },
  {
    severity: 'OK',
    title: 'S60 R: suspensão eletrônica Four-C exige oficina especializada',
    body: 'O S60 R (2.5T, 300cv, tração integral Haldex) usa suspensão eletrônica ajustável Four-C (modos Comfort/Sport/Advanced) — poucas oficinas fora da rede Volvo sabem diagnosticar ou calibrar o sistema. Antes de mexer, procure especialista em Volvo turbo/R ou grupos de entusiastas (fóruns Volvo) para indicação de oficina que já mexeu no Four-C.',
  },
]

const PROBLEMAS_GEN1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Falha do sensor MAF (fluxo de massa de ar)',
    body: 'Sensor MAF com defeito é queixa recorrente nesta geração — sintoma típico é perda de potência combinada com piora perceptível no consumo. É peça relativamente barata de trocar e resolve a maior parte dos casos de "motor sem força" sem causa aparente.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor traseiro do virabrequim ou dreno do turbo',
    body: 'Os pontos mais comuns de vazamento de óleo nesta geração são o retentor traseiro do virabrequim e a área de drenagem do turbo. Mancha de óleo embaixo do carro ou cheiro de óleo queimado no vão do motor merece inspeção — não é falha estrutural grave, mas não deve ser ignorada.',
  },
  {
    severity: 'WARN',
    title: '"Engine surge" — hesitação e trocas irregulares no câmbio automático',
    body: 'Sensação de motor "engasgando" ou acelerando de forma instável em baixa velocidade, mais perceptível logo após arrancar, é queixa conhecida das versões automáticas desta geração. Antes de suspeitar de problema grave no câmbio, vale checar sensores de posição e a condição do fluido — na maioria dos casos não é falha mecânica da caixa em si.',
  },
  {
    severity: 'WARN',
    title: 'Ar-condicionado fraco, principalmente em unidades 2004 e anteriores',
    body: 'Desempenho de arrefecimento fraco, ruído incomum do ventilador ou falha total do ar-condicionado aparecem tipicamente entre 60.000 e 80.000 km nas unidades mais antigas desta geração (2000-2004). Verifique o nível do fluido refrigerante e o estado do compressor antes de trocar peça cara.',
  },
  {
    severity: 'WARN',
    title: 'Coxim/suporte de motor rasga cedo pelo torque dos motores turbo',
    body: 'O coxim superior da barra de torque tende a rasgar antes do esperado nas versões turbo (2.0T/2.4T/2.5T) — sintoma é trepidação e ruído de impacto ao acelerar/desacelerar bruscamente. Peça de troca relativamente barata; existem versões reforçadas em poliuretano no mercado paralelo para quem quer mais durabilidade.',
  },
]

const MANUTENCAO_GEN1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma S60 P2 (2000-2009) + ajuste uso severo BR',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e coxins do motor (atenção ao coxim de torque nas versões turbo). | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada (motores 5 cilindros desta geração são interferentes — nunca atrase). | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Fluido do câmbio automático (Aisin/Geartronic) — não é vitalício em uso severo. | S60 R — inspeção anual do sistema de suspensão eletrônica Four-C em oficina especializada.',
  },
]

// ─── Gen2 P3 (2010-2018) — S60 sedan e V60 perua ──────────────────────────

const MACETES_GEN2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Plataforma P3 compartilhada com S80, XC60 (1ª geração) e V70 da época',
    body: 'Seu S60/V60 desta geração compartilha motor, câmbio e boa parte da suspensão com o S80, a primeira geração do XC60 e o V70 contemporâneo. Ao buscar peça em oficina independente ou desmanche, procure também "para plataforma P3 Volvo" — amplia o resultado e facilita achar peça mais barata.',
  },
  {
    severity: 'WARN',
    title: 'Proteja o turbo: deixe o motor em marcha lenta antes de desligar após rodar em estrada',
    body: 'Nas versões turbo (T4/T5/T6), depois de rodar em velocidade alta ou estrada, deixe o motor em marcha lenta por cerca de 30 segundos antes de desligar — isso dá tempo do óleo circular e resfriar o turbo, reduzindo o desgaste do mancal e adiando a troca do turbocompressor, que é cara.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático 6 marchas: troque o fluido, mesmo sem trancos aparentes',
    body: 'O câmbio automático Aisin/Geartronic de 6 marchas desta geração não é vitalício em uso severo, mesmo que o manual sugira o contrário. Trocar o fluido preventivamente (a cada 60.000-80.000 km) reduz bastante o risco das falhas de transmissão relatadas nas versões D5 diesel e 2.0T gasolina.',
  },
  {
    severity: 'WARN',
    title: 'Farol de xênon piscando ou fraco: suspeite do reator antes da lâmpada',
    body: 'Nas versões equipadas com farol de xênon, luz piscando, fraca ou com tom esverdeado geralmente é o reator (ballast) e não a lâmpada em si — conserto mais barato e resolve a maioria dos casos relatados a partir de 60.000-90.000 km.',
  },
]

const PROBLEMAS_GEN2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste do turbocompressor nos motores T5, geralmente após 120.000-150.000 km',
    body: 'Perda de potência e fumaça de escape azulada são os sinais clássicos de turbo desgastado nesta geração, tipicamente a partir de 120.000-150.000 km nos motores T5. Se notar esses sintomas, não adie o diagnóstico — rodar com o turbo comprometido pode levar óleo para dentro do escapamento e agravar o dano.',
  },
  {
    severity: 'WARN',
    title: 'Falhas eletrônicas na central do motor (ECU), principalmente T5/D5',
    body: 'Entre 90.000 e 130.000 km, algumas unidades T5 e D5 apresentam falhas eletrônicas complexas na central do motor — sintomas incluem carro que não liga ou marcha lenta irregular. É diagnóstico que exige scanner e oficina com experiência em eletrônica Volvo; evite "chutar" peça sem diagnóstico correto.',
  },
  {
    severity: 'WARN',
    title: 'Vidros elétricos travando, principalmente os traseiros',
    body: 'A partir de 80.000-100.000 km é comum os vidros elétricos (mais os traseiros) começarem a colar ou se mover de forma irregular. Costuma ser a régua/trilho do mecanismo, não o motor do vidro — vale limpar e lubrificar antes de trocar peça inteira.',
  },
  {
    severity: 'WARN',
    title: 'Sensores do ABS falhando entre 70.000 e 110.000 km',
    body: 'Luz de aviso do ABS acesa no painel, com frenagem prejudicada, aparece nesta faixa de quilometragem em parte das unidades. Não ignore o alerta — mesmo que o freio "pareça normal", o ABS/controle de tração pode não estar atuando quando mais precisar.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático com trocas bruscas ou atrasadas — D5 diesel e 2.0T gasolina',
    body: 'Entre 80.000 e 120.000 km, as versões D5 2.4 diesel e 2.0T gasolina desta geração concentram queixas de câmbio automático com engate brusco ou demora para trocar de marcha. Fluido de câmbio vencido é fator agravante — confira o histórico de troca antes de comprar usado.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível com defeito entre 100.000 e 150.000 km',
    body: 'Falha na bomba de combustível é queixa relatada nesta faixa de quilometragem, principalmente na V60. Sintoma comum é dificuldade de partida ou perda de potência em aceleração — se notar isso, vale investigar a bomba antes de suspeitar de problema na injeção.',
  },
  {
    severity: 'WARN',
    title: 'Perda de líquido de arrefecimento e falha do compressor do ar-condicionado já aos 50.000 km',
    body: 'Nas versões T5/T6 gasolina, perda de líquido de arrefecimento sem vazamento óbvio e falha do compressor do ar-condicionado podem aparecer já aos 50.000 km. Verifique o nível do reservatório de arrefecimento com frequência — queda inexplicada é sinal de alerta precoce.',
  },
]

const MANUTENCAO_GEN2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma S60/V60 P3 (2010-2018) + ajuste uso severo BR',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor (T4/T5/T6, especificação do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e coxins do motor. | 20.000-30.000 km — Filtro de ar do motor e filtro de cabine. | 30.000 km — Velas de ignição (motores turbo pedem intervalo mais curto que motor aspirado). | 40.000 km — Fluido de freio. | 50.000 km — Inspeção do compressor do ar-condicionado e do nível de arrefecimento (ponto de falha conhecido nas versões T5/T6). | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Fluido do câmbio automático — não é vitalício em uso severo, antecipe se notar engate brusco. | Sempre — deixe o motor em marcha lenta ~30s antes de desligar após rodar em estrada, protege o turbo.',
  },
]

// ─── Gen3 SPA (2018+) — S60 sedan e V60 perua, inclui T8 Polestar ─────────

const MACETES_GEN3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Plataforma SPA compartilhada com S90, XC60 e XC90 da mesma era',
    body: 'Seu S60/V60 desta geração compartilha motor, câmbio e parte da eletrônica com o S90, o XC60 (2ª geração) e o XC90 (2ª geração) — todos na plataforma SPA. Útil saber isso ao procurar peça em oficina independente que não tenha cadastro específico do S60/V60.',
  },
  {
    severity: 'OK',
    title: 'T8 Twin Engine (Polestar Engineered): use o modo Pure e mantenha a bateria carregada',
    body: 'A versão T8 combina motor a combustão com elétrico (Polestar Engineered chega a cerca de 415cv combinados). Para uso urbano, priorize o modo Pure (100% elétrico) e recarregue sempre que possível — mesmo em dias que você não vai rodar muito, mantenha o hábito de recarregar, isso preserva a saúde da bateria de tração a longo prazo.',
  },
  {
    severity: 'WARN',
    title: 'Bateria 12V auxiliar: verifique a tensão anualmente, o carro não liga sem ela',
    body: 'Mesmo nas versões com sistema start-stop ou mild-hybrid (B4/B5/B6), existe uma bateria 12V auxiliar convencional para os sistemas eletrônicos — se ela enfraquecer, o carro pode não ligar mesmo com a bateria de tração/alta tensão saudável. Vale checar a tensão dessa bateria pelo menos uma vez por ano, principalmente após o 3º ano de uso.',
  },
  {
    severity: 'OK',
    title: 'Pilot Assist: recalibre os sensores após troca de para-brisa',
    body: 'O sistema Pilot Assist (assistente de condução semiautônomo) depende de câmera e radares calibrados com precisão. Depois de qualquer troca de para-brisa ou reparo que mexa no para-choque dianteiro, leve o carro para recalibração em oficina autorizada Volvo — sem isso, o sistema pode funcionar de forma imprecisa ou simplesmente não ativar.',
  },
]

const PROBLEMAS_GEN3: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bateria de tração do T8 pode perder desempenho se o carro ficar muito tempo sem recarregar',
    body: 'Rodar sempre no modo híbrido convencional (sem nunca plugar o carregador) tende a acelerar o desgaste da bateria de tração do T8 ao longo dos anos, além de anular boa parte do sentido de ter um plug-in hybrid. Mantenha o hábito de recarregar regularmente, mesmo em trajetos curtos — não é obrigatório rodar 100% no modo Pure, mas evite meses seguidos sem plugar o carregador.',
  },
  {
    severity: 'WARN',
    title: 'Falhas de software/infotainment (tela, seta, câmera 360)',
    body: 'Relatos incluem travamento da tela central, indicador de seta que "falha" e precisa reiniciar o sistema, e câmera 360º ficando preta esporadicamente — problemas típicos de software da plataforma SPA/CMA desta geração de Volvos. Na maioria dos casos, uma atualização OTA (via Wi-Fi) ou na concessionária resolve; anote o comportamento e a versão de software antes de agendar.',
  },
  {
    severity: 'WARN',
    title: 'Hastes do porta-malas (V60): tampa não sustenta aberta',
    body: 'As hastes a gás que sustentam a tampa do porta-malas da V60 tendem a perder força com o tempo, fazendo a tampa cair sozinha se não for travada. É peça de desgaste normal — verifique antes de carregar o porta-malas embaixo dele aberto, para não se machucar.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático com hesitação nas versões T4/T5',
    body: 'Algumas unidades T4/T5 apresentam engates atrasados ou hesitação ao trocar de marcha, principalmente em baixas rotações — na maioria dos relatos, uma atualização de software da transmissão na concessionária resolve o comportamento, sem necessidade de intervenção mecânica.',
  },
]

const MANUTENCAO_GEN3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma S60/V60 SPA (2018+) + ajuste uso severo BR',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor (T4/T5/T6/T8, especificação exata do manual) + filtro de óleo — siga o sistema de manutenção adaptativo do carro, que pode variar o intervalo. | Inspeção anual — Freios, suspensão e níveis de fluido. | 20.000-30.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | T8 Twin Engine — Inspeção anual do sistema de alta tensão (bateria/cabos/porta de recarga). | Sempre — recalibre câmeras/sensores do Pilot Assist após troca de para-brisa ou reparo no para-choque dianteiro. | Sempre — verifique a bateria 12V auxiliar anualmente a partir do 3º ano.',
  },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'S60', yearFrom: 2000, yearTo: 2009, MACETES: MACETES_GEN1, PROBLEMAS: PROBLEMAS_GEN1, MANUTENCAO: MANUTENCAO_GEN1 },
  { modelName: 'S60', yearFrom: 2010, yearTo: 2018, MACETES: MACETES_GEN2, PROBLEMAS: PROBLEMAS_GEN2, MANUTENCAO: MANUTENCAO_GEN2 },
  { modelName: 'V60', yearFrom: 2010, yearTo: 2018, MACETES: MACETES_GEN2, PROBLEMAS: PROBLEMAS_GEN2, MANUTENCAO: MANUTENCAO_GEN2 },
  { modelName: 'S60', yearFrom: 2018, yearTo: null, MACETES: MACETES_GEN3, PROBLEMAS: PROBLEMAS_GEN3, MANUTENCAO: MANUTENCAO_GEN3 },
  { modelName: 'V60', yearFrom: 2018, yearTo: null, MACETES: MACETES_GEN3, PROBLEMAS: PROBLEMAS_GEN3, MANUTENCAO: MANUTENCAO_GEN3 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'S60',
    yearFrom: 2000,
    yearTo: 2009,
    tireSize: '205/55 R16 · 215/50 R17 (S60 R)',
    frontPsi: 30,
    rearPsi: 30,
    frontPsiLoad: 32,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Confirme sempre o valor exato na etiqueta da coluna da porta do motorista — varia conforme aro/versão do exemplar.',
  },
  {
    modelName: 'S60',
    yearFrom: 2010,
    yearTo: 2018,
    tireSize: '215/50 R17 · 235/45 R18 (versões superiores)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'A etiqueta oficial fica na coluna da porta do motorista. Confirme o valor exato do seu aro/versão.',
  },
  {
    modelName: 'V60',
    yearFrom: 2010,
    yearTo: 2018,
    tireSize: '215/50 R17 · 235/45 R18 (versões superiores)',
    frontPsi: 32,
    rearPsi: 33,
    frontPsiLoad: 35,
    rearPsiLoad: 40,
    sparePsi: 60,
    notes: 'Pressão traseira um pouco mais alta que o S60 sedan por ser perua — reforce ainda mais com o porta-malas carregado, conforme valor de carga da etiqueta.',
  },
  {
    modelName: 'S60',
    yearFrom: 2018,
    yearTo: null,
    tireSize: '235/45 R18 · 235/40 R19 (versões superiores/Polestar Engineered)',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 36,
    rearPsiLoad: 38,
    sparePsi: null,
    notes: 'Muitas unidades desta geração vêm sem estepe, apenas kit de reparo (selante + compressor) — confirme o que equipa seu exemplar. Etiqueta oficial na coluna da porta do motorista; T8 costuma pedir pressão um pouco maior pelo peso extra da bateria.',
  },
  {
    modelName: 'V60',
    yearFrom: 2018,
    yearTo: null,
    tireSize: '235/45 R18 · 235/40 R19 (versões superiores/Polestar Engineered)',
    frontPsi: 33,
    rearPsi: 34,
    frontPsiLoad: 36,
    rearPsiLoad: 40,
    sparePsi: null,
    notes: 'Muitas unidades vêm sem estepe, apenas kit de reparo (selante + compressor). Reforce a pressão traseira com o porta-malas carregado, conforme etiqueta da porta do motorista.',
  },
]

function mi(modelName: string, yearFrom: number | null, yearTo: number | null, items: Omit<MaintenanceItemInput, 'modelName' | 'yearFrom' | 'yearTo'>[]): MaintenanceItemInput[] {
  return items.map((item) => ({ modelName, yearFrom, yearTo, ...item }))
}

const GEN1_ITEMS: Omit<MaintenanceItemInput, 'modelName' | 'yearFrom' | 'yearTo'>[] = [
  { component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: 'Motores 5 cilindros desta geração são interferentes — não atrase.', priority: 'CRITICAL', order: 1 },
  { component: 'Coxim de torque do motor (versões turbo) — inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Rasga cedo pelo torque dos motores turbo. Trepidação/impacto ao acelerar é sinal de alerta.', priority: 'MEDIUM', order: 2 },
  { component: 'Sensor MAF — inspeção em caso de perda de potência', intervalKm: null, intervalMonths: null, notes: 'Causa comum de perda de potência e consumo alto nesta geração.', priority: 'MEDIUM', order: 3 },
  { component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 4 },
  { component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'HIGH', order: 5 },
  { component: 'Fluido do câmbio automático (Aisin/Geartronic)', intervalKm: 70000, intervalMonths: 48, notes: 'Não é vitalício em uso severo.', priority: 'HIGH', order: 6 },
  { component: 'Suspensão eletrônica Four-C (S60 R) — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Exige oficina especializada em Volvo turbo/R.', priority: 'MEDIUM', order: 7 },
]

const GEN2_ITEMS: Omit<MaintenanceItemInput, 'modelName' | 'yearFrom' | 'yearTo'>[] = [
  { component: 'Óleo do motor + filtro', intervalKm: 15000, intervalMonths: 12, notes: 'Confirme especificação conforme motor (T4/T5/T6/D5).', priority: 'CRITICAL', order: 0 },
  { component: 'Turbo — inspeção preventiva (T4/T5/T6)', intervalKm: 100000, intervalMonths: null, notes: 'Desgaste comum a partir de 120.000-150.000 km. Deixe o motor em marcha lenta antes de desligar após estrada.', priority: 'HIGH', order: 1 },
  { component: 'Fluido do câmbio automático', intervalKm: 70000, intervalMonths: 48, notes: 'Não é vitalício. Antecipe se notar engate brusco (comum em D5 e 2.0T).', priority: 'HIGH', order: 2 },
  { component: 'Filtro de ar do motor', intervalKm: 30000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 3 },
  { component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 4 },
  { component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { component: 'Ar-condicionado (compressor) e nível de arrefecimento — inspeção', intervalKm: 50000, intervalMonths: null, notes: 'Ponto de falha conhecido nas versões T5/T6 já a partir de 50.000 km.', priority: 'MEDIUM', order: 7 },
  { component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'HIGH', order: 8 },
  { component: 'Sensores do ABS — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Luz de aviso do ABS acesa não deve ser ignorada.', priority: 'MEDIUM', order: 9 },
]

const GEN3_ITEMS: Omit<MaintenanceItemInput, 'modelName' | 'yearFrom' | 'yearTo'>[] = [
  { component: 'Óleo do motor', intervalKm: 15000, intervalMonths: 12, notes: 'Confirme especificação conforme motor (T4/T5/T6/T8) e siga o sistema de manutenção adaptativo do carro.', priority: 'CRITICAL', order: 0 },
  { component: 'Filtro de óleo', intervalKm: 15000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { component: 'Sistema de alta tensão (bateria/cabos/porta de recarga) — versão T8', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual. Mantenha o hábito de recarregar mesmo em trajetos curtos.', priority: 'CRITICAL', order: 2 },
  { component: 'Bateria 12V auxiliar — verificação', intervalKm: null, intervalMonths: 12, notes: 'O carro não liga sem ela mesmo com a bateria de tração saudável. Checar a partir do 3º ano.', priority: 'HIGH', order: 3 },
  { component: 'Recalibração de câmeras/sensores do Pilot Assist', intervalKm: null, intervalMonths: null, notes: 'Obrigatória após troca de para-brisa ou reparo no para-choque dianteiro.', priority: 'HIGH', order: 4 },
  { component: 'Filtro de ar do motor', intervalKm: 30000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 5 },
  { component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 6 },
  { component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'HIGH', order: 8 },
  { component: 'Hastes do porta-malas (V60) — inspeção', intervalKm: null, intervalMonths: 24, notes: 'Peça de desgaste normal. Cuidado ao carregar embaixo do porta-malas aberto se estiver fraca.', priority: 'LOW', order: 9 },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...mi('S60', 2000, 2009, GEN1_ITEMS),
  ...mi('S60', 2010, 2018, GEN2_ITEMS),
  ...mi('V60', 2010, 2018, GEN2_ITEMS),
  ...mi('S60', 2018, null, GEN3_ITEMS),
  ...mi('V60', 2018, null, GEN3_ITEMS),
]

async function main() {
  console.log('🚗 Seed Volvo S60/V60...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volvo', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volvo', vehicleTypeId: carroType.id },
  })

  const distinctModelNames = [...new Set(BLOCKS.map((b) => b.modelName))]
  for (const modelName of distinctModelNames) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: modelName, brandId: brand.id } },
      update: {},
      create: { name: modelName, brandId: brand.id },
    })
    await prisma.tip.deleteMany({ where: { modelName } })
  }

  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: order++,
      })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }

  const distinctTpModelNames = [...new Set(TIRE_PRESSURES.map((t) => t.modelName))]
  for (const modelName of distinctTpModelNames) {
    await prisma.tirePressure.deleteMany({ where: { modelName } })
  }
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? '...'})`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: distinctModelNames } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volvo S60/V60 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
