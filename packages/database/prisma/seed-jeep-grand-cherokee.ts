/**
 * Seed Jeep Grand Cherokee — macetes, problemas, manutenção e calibragem
 * Cinco gerações vendidas no Brasil desde 1994 (chegou como importação
 * independente, antes de um acordo formal entre Chrysler e Ford pela
 * marca Jeep no país): ZJ (1994-1998, 4.0 I6/5.2/5.9 V8), WJ
 * (1999-2004, 4.0 I6/4.7 V8, sistema de tração Quadra-Drive), WK
 * (2005-2010, 3.7 V6/4.7 V8/5.7 HEMI/SRT8 6.1 V8, câmbio automático
 * NAG1), WK2 (2011-2020, 3.6 Pentastar V6/3.0 EcoDiesel/SRT 6.4/
 * Trackhawk 6.2 supercharged, câmbio ZF8 8 marchas, suspensão a ar
 * Quadra-Lift — importação interrompida no Brasil em 2020) e WL
 * (2022+, confirmada para o Brasil só na versão híbrida plug-in 4xe
 * 2.0 turbo). As gerações ZJ/WJ (1993-2004) tiveram recall histórico
 * nos EUA por risco de incêndio no tanque de combustível em colisão
 * traseira (mais de 2 milhões de unidades recolhidas em 2013).
 * Execute: pnpm --filter @motormacete/database db:seed:jeep-grand-cherokee
 *
 * Fontes: otempo.com.br, vrum.com.br, carrosegaragem.com.br,
 *         media.stellantis.com, autossegredos.com.br, way.com,
 *         motoragora.com.br, auto-doc.pt, jeepforum.com, jeepgarage.org,
 *         go-parts.com, consumerreports.org
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- ZJ (1994-1998) — 4.0 I6, 5.2/5.9 V8 ----------

const MACETES_ZJ: TipInput[] = [
  { severity: 'OK', title: 'Motor 4.0 I6 é considerado extremamente durável — peça abundante no mercado global', body: 'O motor 4.0 6 cilindros em linha (AMC/Jeep) é um dos motores mais duráveis já usados pela marca, com muitos exemplares passando de 300.000 km sem retífica quando bem mantidos. Peça de motor é fácil de achar mesmo décadas depois, inclusive em fornecedores internacionais especializados em Jeep clássico.' },
  { severity: 'OK', title: 'Versão Limited 5.9 é rara e mais valorizada — confirme a autenticidade', body: 'A versão Limited com motor 5.9 V8 de alto desempenho para a época é uma das mais raras e procuradas por colecionadores da geração ZJ. Peça de acabamento específica dessa versão pode ser mais difícil de achar — confirme sempre a autenticidade da versão antes de pagar o valor de mercado de uma unidade Limited 5.9.' },
]

const PROBLEMAS_ZJ: TipInput[] = [
  { severity: 'DANGER', title: 'Posicionamento do tanque de combustível — risco de incêndio em colisão traseira', body: 'A geração ZJ (junto com a WJ seguinte, até 2004) teve o tanque de combustível posicionado atrás do eixo traseiro, sem proteção estrutural adequada contra impacto — em colisões traseiras de intensidade moderada, o tanque podia se romper e vazar combustível, gerando incêndio. Nos EUA, mais de 2 milhões de unidades foram recolhidas em 2013 após investigação da NHTSA, associada a mais de 260 mortes em incêndios pós-colisão entre 1993 e 2009. Se você tem ou pretende comprar um ZJ, procure saber se sua unidade específica recebeu algum reforço estrutural/trava adicional já instalado e evite modificações que reduzam ainda mais a proteção traseira do tanque.' },
]

const MANUTENCAO_ZJ: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Grand Cherokee ZJ (4.0 I6/5.2/5.9 V8)', body: '7.500-10.000 km — Troca de óleo do motor + filtro. | 60.000 km — Fluido do câmbio automático. | 60.000 km — Correia dentada/acessórios conforme motor (confirme especificação exata do 4.0 I6 vs V8). | 20.000 km — Filtro de ar e filtro de combustível. | 40.000 km — Fluido de freio. | Inspecionar a região do tanque de combustível (atrás do eixo traseiro) por sinais de dano ou corrosão, dado o histórico de vulnerabilidade estrutural dessa geração.' },
]

// ---------- WJ (1999-2004) — 4.0 I6, 4.7 V8, Quadra-Drive ----------

const MACETES_WJ: TipInput[] = [
  { severity: 'OK', title: 'Sistema Quadra-Drive: tração integral automática com diferenciais de deslizamento limitado', body: 'O Quadra-Drive é o sistema de tração integral da geração WJ, com diferenciais dianteiro e traseiro de deslizamento limitado que redistribuem torque automaticamente. É mais complexo mecanicamente que um 4x4 convencional — peça específica do diferencial Quadra-Drive é mais cara e menos comum que a de um sistema de tração simples, então confirme sempre se sua unidade tem esse sistema antes de orçar peça de transmissão/diferencial.' },
  { severity: 'OK', title: 'Motor 4.0 I6 segue disponível nessa geração — mesma reputação de durabilidade da ZJ', body: 'A opção de motor 4.0 6 cilindros em linha continuou disponível na WJ, mantendo a reputação de robustez e longevidade da geração anterior. O 4.7 V8 (PowerTech) é a opção mais potente, mas com mecânica mais complexa e peça mais cara.' },
]

const PROBLEMAS_WJ: TipInput[] = [
  { severity: 'DANGER', title: 'Mesmo risco do tanque de combustível da geração ZJ (unidades até 2004)', body: 'O recall histórico por posicionamento vulnerável do tanque de combustível atrás do eixo traseiro (ver detalhes na geração ZJ) cobre unidades até o ano-modelo 2004 — ou seja, toda a geração WJ está na faixa afetada pela investigação da NHTSA e pelo recall de mais de 2 milhões de unidades nos EUA. Mesma recomendação: verifique reforço estrutural já instalado e evite modificações que comprometam ainda mais a proteção traseira.' },
  { severity: 'WARN', title: 'Diferenciais do Quadra-Drive exigem fluido específico e atenção redobrada', body: 'Os diferenciais de deslizamento limitado do sistema Quadra-Drive usam fluido específico (geralmente com aditivo próprio para embreagem limitada) — usar fluido genérico de diferencial comum pode acelerar o desgaste das placas de embreagem interna. Confirme sempre a especificação exata antes de trocar o fluido.' },
]

const MANUTENCAO_WJ: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Grand Cherokee WJ (4.0 I6/4.7 V8, Quadra-Drive)', body: '7.500-10.000 km — Troca de óleo do motor + filtro. | 60.000 km — Fluido do câmbio automático. | 60.000-80.000 km — Fluido dos diferenciais Quadra-Drive (especificação própria, não genérica). | 20.000 km — Filtro de ar e filtro de combustível. | 40.000 km — Fluido de freio. | Inspecionar a região do tanque de combustível por sinais de dano ou corrosão.' },
]

// ---------- WK (2005-2010) — 3.7 V6/4.7 V8/5.7 HEMI/SRT8 6.1 ----------

const MACETES_WK: TipInput[] = [
  { severity: 'OK', title: 'Chegada do motor HEMI 5.7 V8 e da versão SRT8 6.1 de alto desempenho', body: 'A geração WK introduziu o icônico motor HEMI 5.7 V8 na linha Grand Cherokee, além da versão esportiva SRT8 com motor 6.1 V8 (432cv) — a primeira Grand Cherokee de alto desempenho de fábrica. Peça de motor HEMI é ampla no mercado por ser usado em vários modelos Chrysler/Dodge/Jeep da época; peça específica do SRT8 (motor 6.1, freios maiores, suspensão esportiva) é mais rara e cara.' },
  { severity: 'OK', title: 'Câmbio automático NAG1 (5 marchas) — verifique histórico de manutenção do fluido', body: 'O câmbio automático NAG1 de 5 marchas dessa geração é sensível ao estado do fluido — pacote de solenoides pode degradar e causar trocas de marcha bruscas ou códigos de falha se o fluido não for trocado no prazo. Antes de comprar uma unidade usada, pergunte pelo histórico de troca do fluido do câmbio.' },
]

const PROBLEMAS_WK: TipInput[] = [
  { severity: 'WARN', title: 'TIPM (módulo de potência integrado) começa a aparecer como ponto de atenção', body: 'O TIPM (Totally Integrated Power Module), módulo eletrônico que controla vários relés e fusíveis do carro, começou a ser usado de forma mais ampla nessa geração e já apresentava os primeiros relatos de falha — sintomas incluem problemas elétricos intermitentes, falha no relé da bomba de combustível e, em casos mais graves, o motor desligando sem aviso. Fique atento a esses sintomas e não ignore luzes de advertência elétricas intermitentes.' },
  { severity: 'WARN', title: 'Câmbio NAG1: trocas bruscas ou código de falha indicam degradação do pacote de solenoides', body: 'Se notar troca de marcha brusca, atraso na engrenagem ou luz de câmbio acendendo, o pacote de solenoides do NAG1 é o primeiro suspeito — normalmente mais barato de reparar do que trocar a transmissão inteira, mas exige diagnóstico específico desse câmbio.' },
]

const MANUTENCAO_WK: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Grand Cherokee WK (3.7 V6/4.7 V8/5.7 HEMI/SRT8 6.1)', body: '10.000 km/12 meses — Troca de óleo do motor + filtro. | 60.000 km — Fluido do câmbio automático NAG1 — não pule, é item sensível dessa geração. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | Ficar atento a sintomas elétricos intermitentes (relé da bomba de combustível, luzes de advertência) — possível sinal precoce de falha do TIPM.' },
]

// ---------- WK2 (2011-2020) — 3.6 Pentastar/3.0 EcoDiesel/SRT/Trackhawk, ZF8, Quadra-Lift ----------

const MACETES_WK2: TipInput[] = [
  { severity: 'OK', title: 'Motor 3.6 Pentastar V6 e 3.0 EcoDiesel — confirme qual sua unidade tem antes de orçar peça', body: 'A partir de 2011 a linha ganhou o motor V6 3.6 Pentastar (mais eficiente e moderno que o V6 anterior) e, a partir de 2014, o 3.0 EcoDiesel (compartilhado com a Ram 1500, origem VM Motori) — melhor economia de combustível, mas mecânica de diesel moderno com sistema de pós-tratamento de emissões mais complexo. Peça e manutenção diferem bastante entre os dois motores.' },
  { severity: 'OK', title: 'Câmbio ZF8 (8 marchas): peça de qualidade nos solenoides evita problema crônico de troca de marcha', body: 'O câmbio automático ZF8 de 8 marchas é sensível à qualidade e à vazão dos solenoides internos — peça fora de especificação (inclusive algumas de reposição no mercado paralelo) pode causar problema persistente de troca de marcha ou gerar novos códigos de falha. Prefira peça de qualidade original ou equivalente homologado ao reparar esse câmbio.' },
  { severity: 'WARN', title: 'Suspensão a ar Quadra-Lift: inspecione a cada 20.000 km para pegar vazamento cedo', body: 'O sistema de suspensão pneumática Quadra-Lift (opcional/de série conforme versão) tem histórico de falha entre 80.000 e 120.000 km, principalmente em unidades a partir de 2013 — as bolsas de ar traseiras costumam ser as primeiras a falhar, seguidas pelo compressor. Se notar o carro "baixo" de um lado ou compressor ligando com muita frequência, é sinal de vazamento — inspeção a cada 20.000 km ajuda a identificar cedo e evitar dano ao compressor por excesso de trabalho.' },
]

const PROBLEMAS_WK2: TipInput[] = [
  { severity: 'DANGER', title: 'Recall: bomba de combustível de alta pressão pode falhar em movimento (motor diesel V6, unidades 2012-2021)', body: 'A Jeep convocou recall no Brasil para 2.960 unidades de Grand Cherokee com motor V6 Diesel dos anos-modelo 2013, 2014, 2015, 2018, 2020 e 2021, fabricadas entre 17 de julho de 2012 e 7 de setembro de 2021 (chassi entre DC515766 e MC782645), por possível falha de funcionamento interno da bomba de combustível de alta pressão — o defeito pode interromper o fornecimento de combustível ao motor com o carro em movimento, criando risco de acidente. O reparo (troca da bomba de alta pressão, tubos e filtros) leva cerca de 2h30 e precisa ser agendado na concessionária. Confirme o chassi em 0800 703 7150 ou WhatsApp (31) 2123-4000.' },
  { severity: 'DANGER', title: 'TIPM: relé da bomba de combustível falha e o motor pode morrer em movimento sem aviso (principalmente unidades 2011-2013)', body: 'É um dos problemas mais documentados e reclamados da geração WK2, principalmente nas primeiras unidades (2011-2013): o relé da bomba de combustível dentro do TIPM (módulo de potência integrado) falha e o motor pode simplesmente desligar em movimento, sem aviso prévio, ou o carro não dar partida. A Jeep já fez recall específico para inspeção do relé e substituição da tampa de proteção em unidades fabricadas entre janeiro/2010 e julho/2011. Se sua unidade apresenta esse padrão de falha (desliga sozinho, às vezes volta a funcionar), não trate como "coisa isolada" — é falha conhecida do módulo, procure diagnóstico específico do TIPM.' },
  { severity: 'WARN', title: 'Tela Uconnect de 8,4" descola/bolha (unidades 2018+)', body: 'É queixa recorrente nas unidades a partir de 2018: o adesivo da tela multimídia Uconnect de 8,4" falha, causando bolhas, descascamento e "toques fantasma" na tela sensível ao toque, geralmente entre 2 e 4 anos de uso. Também há relatos da tela travando/reiniciando sozinha, desativando temporariamente navegação, climatização e câmera de ré.' },
  { severity: 'WARN', title: 'Mensagem "Service Shifter" — alavanca eletrônica de câmbio com falha (2014-2015 em diante)', body: 'Modelos com alavanca de câmbio eletrônica (o seletor "monoestável" introduzido em 2014-2015 e mantido em anos seguintes) podem apresentar a mensagem "Service Shifter" no painel, indicando falha de comunicação da alavanca com o módulo de câmbio. Nem sempre indica problema mecânico na transmissão em si — vale diagnóstico específico do módulo do seletor antes de assumir defeito no câmbio.' },
]

const MANUTENCAO_WK2: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Grand Cherokee WK2 (3.6 Pentastar/3.0 EcoDiesel/SRT/Trackhawk)', body: '10.000 km/12 meses — Troca de óleo do motor + filtro (diesel: confirme especificação e intervalo do sistema de pós-tratamento de emissões). | 60.000 km — Fluido do câmbio ZF8. | 20.000 km — Inspeção da suspensão a ar Quadra-Lift contra vazamento (bolsas traseiras e compressor). | Verificar na concessionária se o recall da bomba de combustível de alta pressão (motor diesel, unidades 2012-2021) já foi concluído. | Ficar atento a desligamento súbito do motor ou falha de partida intermitente — possível sinal de falha do relé da bomba de combustível no TIPM, principalmente em unidades 2011-2013. | 40.000 km — Fluido de freio. | 20.000 km — Filtro de ar e filtro de cabine.' },
]

// ---------- WL (2022+) — 4xe híbrido plug-in 2.0 turbo (única versão confirmada para o Brasil) ----------

const MACETES_WL: TipInput[] = [
  { severity: 'OK', title: 'No Brasil, a quinta geração chega só na versão híbrida plug-in 4xe', body: 'Diferente das gerações anteriores (vendidas com motores a gasolina/diesel convencionais), a nova geração WL foi confirmada para o Brasil exclusivamente na versão 4xe — híbrida plug-in com motor 2.0 turbo a combustão combinado com motor(es) elétrico(s) e bateria recarregável na tomada. É uma mecânica bem mais nova e diferente das gerações anteriores — nenhuma informação de manutenção das gerações ZJ/WJ/WK/WK2 (motor V6/V8/diesel convencional, câmbio NAG1/ZF8) se aplica diretamente ao 4xe.' },
  { severity: 'OK', title: 'Modelo recente — histórico de confiabilidade no Brasil ainda em formação', body: 'Por ser lançamento recente no mercado brasileiro, ainda há pouco histórico de problemas específicos reportados por donos locais. Acompanhe o site oficial da Jeep para recalls e boletins técnicos, e configure o limite de carga da bateria em 80-90% para uso diário, como em qualquer híbrido plug-in.' },
]

const PROBLEMAS_WL: TipInput[] = [
  { severity: 'OK', title: 'Poucos relatos específicos até o momento — monitore canais oficiais', body: 'Como é modelo recente no Brasil, não há ainda volume relevante de reclamações específicas documentadas. Isso não significa ausência de problemas — apenas que o histórico está em formação. Vale acompanhar recalls da versão 4xe em outros mercados (EUA/Europa), já que problemas identificados lá tendem a também afetar unidades brasileiras da mesma plataforma.' },
]

const MANUTENCAO_WL: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Grand Cherokee 4xe (2.0 turbo híbrido plug-in)', body: '10.000 km/12 meses — Troca de óleo do motor a combustão + filtro. | 40.000 km — Fluido de freio (frenagem regenerativa reduz o desgaste mecânico, mas o fluido ainda absorve umidade com o tempo). | Anual — Inspeção do sistema de alta tensão (bateria/cabos) e teste do carregador em diferentes tomadas. | Configure o limite de carga da bateria em 80-90% para uso diário.' },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Grand Cherokee', yearFrom: 1994, yearTo: 1998, tireSize: '235/70 R16 (referência)', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual — carro de época.' },
  { modelName: 'Grand Cherokee', yearFrom: 1999, yearTo: 2004, tireSize: '245/65 R17 (referência)', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
  { modelName: 'Grand Cherokee', yearFrom: 2005, yearTo: 2010, tireSize: '245/65 R17 · 245/60 R18 (SRT8, referência)', frontPsi: 33, rearPsi: 33, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'SRT8 usa aro maior e pode ter calibragem diferente — confirme na etiqueta da porta.' },
  { modelName: 'Grand Cherokee', yearFrom: 2011, yearTo: 2020, tireSize: '265/60 R18 (referência)', frontPsi: 35, rearPsi: 35, frontPsiLoad: 38, rearPsiLoad: 41, sparePsi: 60, notes: 'SRT/Trackhawk usam pneu de alto desempenho com calibragem própria — confirme na etiqueta da porta. Versões com Quadra-Lift: recalibre após qualquer ajuste de altura da suspensão.' },
  { modelName: 'Grand Cherokee', yearFrom: 2022, yearTo: null, tireSize: '265/50 R20 (referência, 4xe)', frontPsi: 36, rearPsi: 36, frontPsiLoad: 39, rearPsiLoad: 42, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — peso extra da bateria pode pedir calibragem ligeiramente maior.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Grand Cherokee', yearFrom: 1994, yearTo: 1998, component: 'Óleo do motor + filtro', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Grand Cherokee', yearFrom: 1994, yearTo: 1998, component: 'Inspeção da região do tanque de combustível', intervalKm: null, intervalMonths: 12, notes: 'Histórico de vulnerabilidade estrutural em colisão traseira — verificar reforço já instalado.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Grand Cherokee', yearFrom: 1994, yearTo: 1998, component: 'Fluido do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Grand Cherokee', yearFrom: 1994, yearTo: 1998, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },

  { modelName: 'Grand Cherokee', yearFrom: 1999, yearTo: 2004, component: 'Óleo do motor + filtro', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 4 },
  { modelName: 'Grand Cherokee', yearFrom: 1999, yearTo: 2004, component: 'Inspeção da região do tanque de combustível', intervalKm: null, intervalMonths: 12, notes: 'Mesmo histórico da geração ZJ — unidades até 2004 cobertas pela investigação/recall.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Grand Cherokee', yearFrom: 1999, yearTo: 2004, component: 'Fluido dos diferenciais Quadra-Drive', intervalKm: 60000, intervalMonths: 48, notes: 'Especificação própria com aditivo para embreagem limitada — não usar fluido genérico.', priority: 'HIGH', order: 6 },
  { modelName: 'Grand Cherokee', yearFrom: 1999, yearTo: 2004, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },

  { modelName: 'Grand Cherokee', yearFrom: 2005, yearTo: 2010, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 8 },
  { modelName: 'Grand Cherokee', yearFrom: 2005, yearTo: 2010, component: 'Fluido do câmbio automático NAG1', intervalKm: 60000, intervalMonths: 48, notes: 'Item sensível dessa geração — não postergar.', priority: 'HIGH', order: 9 },
  { modelName: 'Grand Cherokee', yearFrom: 2005, yearTo: 2010, component: 'Monitoramento de sintomas elétricos intermitentes (TIPM)', intervalKm: null, intervalMonths: 12, notes: 'Falha no relé da bomba de combustível é possível sinal precoce.', priority: 'MEDIUM', order: 10 },
  { modelName: 'Grand Cherokee', yearFrom: 2005, yearTo: 2010, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 11 },

  { modelName: 'Grand Cherokee', yearFrom: 2011, yearTo: 2020, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Diesel: confirme especificação do sistema de pós-tratamento de emissões.', priority: 'CRITICAL', order: 12 },
  { modelName: 'Grand Cherokee', yearFrom: 2011, yearTo: 2020, component: 'Verificação do recall da bomba de combustível de alta pressão (motor diesel, unidades 2012-2021)', intervalKm: null, intervalMonths: null, notes: 'Risco de interrupção do fornecimento de combustível em movimento.', priority: 'CRITICAL', order: 13 },
  { modelName: 'Grand Cherokee', yearFrom: 2011, yearTo: 2020, component: 'Monitoramento de desligamento súbito/falha de partida (TIPM, unidades 2011-2013 especialmente)', intervalKm: null, intervalMonths: null, notes: 'Falha conhecida do relé da bomba de combustível no módulo TIPM.', priority: 'CRITICAL', order: 14 },
  { modelName: 'Grand Cherokee', yearFrom: 2011, yearTo: 2020, component: 'Inspeção da suspensão a ar Quadra-Lift', intervalKm: 20000, intervalMonths: null, notes: 'Bolsas de ar traseiras e compressor — falha comum entre 80.000-120.000 km.', priority: 'HIGH', order: 15 },
  { modelName: 'Grand Cherokee', yearFrom: 2011, yearTo: 2020, component: 'Fluido do câmbio ZF8', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 16 },
  { modelName: 'Grand Cherokee', yearFrom: 2011, yearTo: 2020, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 17 },

  { modelName: 'Grand Cherokee', yearFrom: 2022, yearTo: null, component: 'Óleo do motor a combustão + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 18 },
  { modelName: 'Grand Cherokee', yearFrom: 2022, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos) e teste do carregador', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 19 },
  { modelName: 'Grand Cherokee', yearFrom: 2022, yearTo: null, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 20 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Grand Cherokee', yearFrom: 1994, yearTo: 1998, MACETES: MACETES_ZJ, PROBLEMAS: PROBLEMAS_ZJ, MANUTENCAO: MANUTENCAO_ZJ },
  { modelName: 'Grand Cherokee', yearFrom: 1999, yearTo: 2004, MACETES: MACETES_WJ, PROBLEMAS: PROBLEMAS_WJ, MANUTENCAO: MANUTENCAO_WJ },
  { modelName: 'Grand Cherokee', yearFrom: 2005, yearTo: 2010, MACETES: MACETES_WK, PROBLEMAS: PROBLEMAS_WK, MANUTENCAO: MANUTENCAO_WK },
  { modelName: 'Grand Cherokee', yearFrom: 2011, yearTo: 2020, MACETES: MACETES_WK2, PROBLEMAS: PROBLEMAS_WK2, MANUTENCAO: MANUTENCAO_WK2 },
  { modelName: 'Grand Cherokee', yearFrom: 2022, yearTo: null, MACETES: MACETES_WL, PROBLEMAS: PROBLEMAS_WL, MANUTENCAO: MANUTENCAO_WL },
]

async function main() {
  console.log('🚗 Seed Jeep Grand Cherokee...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Jeep', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Jeep', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Grand Cherokee', brandId: brand.id } },
    update: {},
    create: { name: 'Grand Cherokee', brandId: brand.id },
  })

  // Delete once (não por bloco) — múltiplos blocos usam o mesmo modelName 'Grand Cherokee'
  await prisma.tip.deleteMany({ where: { modelName: 'Grand Cherokee' } })

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
    console.log(`  ✅ Grand Cherokee (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: 'Grand Cherokee' } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: Grand Cherokee (${tp.yearFrom}-${tp.yearTo ?? '...'})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Grand Cherokee' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Jeep Grand Cherokee concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
