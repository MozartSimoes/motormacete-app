// seed-honda-pop110i.ts — Honda Pop 100 e Pop 110i (todos os modelos FIPE)
// POP 100 (2005-2012) · POP 110I (2013-2024)
// Pop 100: motor 100cc SOHC carburado, CVT | vela NGK CPR6EA-9 | oleo 10W-30 JASO MA
// Pop 110i: motor 109cc SOHC PGM-FI FLEXONE, CVT | vela NGK CPR6EA-9 | oleo 10W-30 JASO MA2
// CVT: correia Gates + rolos variador (media de 8-12 g) | ambos: transmissao automatica por variador centrifugo
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

// ─── POP 100 (2005-2012) ─────────────────────────────────────────────────────

const POP100_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 100cc carburado — troca de oleo a cada 3.000 km; capacidade 0,85 L sem filtro (nao tem filtro remov.)',
    body: 'Motor monocilindrico SOHC 2 valvulas refrigerado a ar. Sem filtro de oleo removivel — filtragem apenas pela peneira de malha no carater. Oleo: 10W-30 JASO MA, 0,85 L. Jamais use oleo de carro — aditivo de antideslizamento degrada a embreagem centrifuga do CVT. Honda Ultra 4T 10W-30 (R$18-28/L) ou Motul 3000 4T 10W-30 (R$20-30/L). Troca a cada 3.000 km ou 6 meses. Oleo escuro e grosso na troca = motor sujo por intervalo longo.',
  },
  {
    severity: 'OK',
    title: 'Carburador Keihin PC20 — limpeza anual; jato principal 78; moto parada por mais de 30 dias exige limpeza antes de usar',
    body: 'Carburador pequeno com jato principal 78, jato piloto 35. Gasolina velha (mais de 30 dias) forma verniz nos jatos — moto afoga, engasga ou nao parte. Se guardar a Pop 100 por mais de 2 semanas: feche o torneira de combustivel e deixe o carburador secar. Limpeza: R$40-70. Palheta (floador): verifica-se mergulhando na gasolina — se afundar, esta furada e a moto vai afogar. Nova: R$20-35.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT Gates — troca obrigatoria a cada 20.000 km; ruptura em movimento paralisa a moto imediatamente',
    body: 'Correia Gates original ou equivalente (Gates G-Force CTX, R$80-130). Ruptura e abrupta: moto para instantaneamente em movimento. Sintomas de desgaste: solavanco na arrancada, perda de aceleracao progressiva, barulho de estalo ao arrancar. NUNCA aguarde so o sintoma — troque preventivamente a cada 20.000 km. Correia nacional de baixa qualidade (R$35-50): vida util de 8.000-10.000 km. Vale o investimento na Gates ou Honda original (R$100-150).',
  },
  {
    severity: 'WARN',
    title: 'Rolos do variador — ovalizam a cada 15.000-18.000 km; rolos ovalados causam solavanco na arrancada e aceleracao irregular',
    body: 'Rolos do variador da Pop 100: 8 g cada, 6 unidades. Rolo ovalo: em vez de rolar suavemente no prato do variador, pula — causando o solavanco caracteristico na arrancada. Verificacao: retire os rolos e role sobre superficie plana — rolo ovalado nao rola direito. Troca kit 6 rolos: Honda original R$80-120, Yamamoto R$40-60 (qualidade intermediaria). Use SEMPRE o peso original (8 g) — rolos mais pesados atrasa a abertura do variador e prejudica a arrancada.',
  },
  {
    severity: 'OK',
    title: 'Pneus 70/90-17 (F) · 80/90-17 (R) — aro 17" pequeno; Pirelli Super City e a melhor opcao custo-beneficio',
    body: 'Pneu pequeno de scooter: desgasta mais rapido que motos de maior porte por menor area de contato com asfalto quente. Dianteiro 70/90-17: Pirelli Super City (R$70-100), Kenda K413 (R$50-70). Traseiro 80/90-17: Pirelli Super City (R$80-110), Rinaldi RA99 (R$55-75). Calibragem: 29 PSI dianteiro / 33 PSI traseiro (solo), 29/36 PSI com garupa. Pneu com mais de 4 anos ou sulcos abaixo de 1 mm: troque — risco de aquaplanagem em chuva aumenta drasticamente em pneu pequeno.',
  },
  {
    severity: 'OK',
    title: 'Embreagem centrifuga — nao tente modifica-la; desgaste do disco de embreagem = solavanco ao sair do ponto',
    body: 'A embreagem centrifuga da Pop 100 e automatica — liga por forca centrifuga quando o motor passa de ~1.800 rpm. Disco de embreagem (pasta) desgastado: moto arranca bruscamente ao dar gas, especialmente em subidas. Kit de embreagem: R$80-150 (disco + molas). Nao tente regular a rotacao de engagement — o sistema nao tem ajuste externo. Mola de embreagem com fadiga: moto "rastejando" em ponto quando deveria estar parada.',
  },
]

const POP100_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Correia CVT rompendo antes dos 20.000 km — correia nacional de baixa qualidade ou abuso na arrancada',
    body: 'Principal causa de ruptura prematura: correia nacional de qualidade inferior + aceleracoes brutas constantes. Arrancada brusca em semaforo estira a correia alem do limite de elasticidade. Prevencao: arranque suave ate a moto ganhar velocidade (2-3 segundos de aceleracao progressiva). Com correia Gates original: arranques normais nao causam ruptura prematura. Pop 100 com mais de 30.000 km sem troca de correia: troca imediata independente dos sintomas.',
  },
  {
    severity: 'WARN',
    title: 'Variador travado com deposito — aceleracao limitada e velocidade maxima reduzida; limpeza do cano e prato do variador',
    body: 'Deposito de borracha da correia + poeira formam pasta no interior do cano e prato do variador. Sintoma: moto nao passa de 60-65 km/h mesmo em descida, aceleracao lenta mesmo com motor a plena potencia. Limpeza: retire o variador, limpe o cone e o prato com pano com alcool isopropilico. Custo: R$50-100 (mao de obra). Preventivo: a cada troca de correia, limpe o variador completamente.',
  },
  {
    severity: 'WARN',
    title: 'Pecas originais Honda POP 100 escassas — producao encerrada em 2012; carburador e palheta sao os mais criticos',
    body: 'Pop 100 fora de linha desde 2012. Pecas criticas de reposicao: carburador PC20 completo (dificil de achar original — alternativa: carburador universal Keihin 17 mm, R$60-100), palheta do carburador (R$20-35 quando disponivel). Pecas intercambiaveis com Honda Biz 100 do mesmo periodo — o motor e a transmissao sao praticamente identicos. Busque em desmanches especializados em Honda. Peca mais comum: rolos do variador (ainda fabricados para modelos similares).',
  },
  {
    severity: 'DANGER',
    title: 'Freio traseiro a tambor — lona gasta causa frenagem drasticamente reduzida em scooter com CG mais baixo',
    body: 'Scooter tem CG mais baixo e menos estabilidade de freio que moto com empunhadura mais alta. Lona traseira gasta reduz forca de frenagem critica. Tambor traseiro: nunca limpar com oleo ou graxa — contamina lona de forma permanente. Lona com rangido metalico constante: troca imediata. Pedal de freio com curso longo antes de ter resposta: cabo frouxo (ajustar no limitador) ou lona gasta (troca). Nao exceda a distancia de frenagem recomendada com lonas gastas em scooter.',
  },
]

// ─── POP 110I (2013-2024) ────────────────────────────────────────────────────

const POP110I_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor PGM-FI FLEXONE 109cc — pode usar gasolina ou etanol; sonda lambda calcula a mistura automaticamente; troca de oleo a cada 3.000 km',
    body: 'O motor PGM-FI da Pop 110i tem sonda lambda de banda larga — ajusta a injecao automaticamente para qualquer mistura E25-E100. Consumo real: 50-60 km/L com gasolina, 40-50 km/L com etanol (motor pequeno e muito eficiente). Oleo: 10W-30 JASO MA2, 0,85 L. Sem filtro de oleo removivel na 110i — filtragem pela peneira interna. Intervalo: 3.000 km. Troca facil: parafuso de drenagem embaixo do motor (torque: 18 Nm). NUNCA use oleo de carro — degrada a embreagem centrifuga.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT Gates 17R2850-10 — troca a cada 20.000 km; correia nova + rolos novos = moto como zero-km na aceleracao',
    body: 'Pop 110i usa correia Gates de 17 dentes e 2.850 mm de comprimento (ou equivalente Honda). Original Honda: R$120-160. Gates G-Force CTX 17R2850 (R$90-130). Nacional de qualidade: R$50-80 (vida util 12.000-14.000 km vs 20.000 km da Gates). Substituir correia + rolos + mola de embreagem no mesmo servico: resultado e moto completamente renovada na aceleracao. Custo total: R$250-400 (pecas + mao de obra). Valor por km rodado ate a proxima troca: muito baixo.',
  },
  {
    severity: 'WARN',
    title: 'Rolos do variador 11 g (Pop 110i) — ovalizam em 15.000-18.000 km de uso urbano; rolos mais pesados reduzem aceleracao; mais leves aumentam RPM',
    body: 'Pop 110i tem rolos de 11 g (diferentes dos 8 g da Pop 100). 6 rolos por variador. Rolo ovalo: solavanco na arrancada — sensacao de "arrancada em dois tempos". Kit 6 rolos Honda original: R$90-130. Yamamoto ou Polini 11 g: R$50-80 (qualidade intermediaria). NUNCA misture rolos de pesos diferentes no mesmo conjunto — o prato do variador vai se desgastar de forma irregular. Dica de performance: rolos 10 g melhoram aceleracao em cidade, rolos 12 g melhoram velocidade de cruzeiro em estrada.',
  },
  {
    severity: 'OK',
    title: 'IACV (valvula de controle de marcha lenta) — marcha lenta oscilante ou moto apagando em semaforo = IACV suja; limpeza antes de qualquer diagnostico',
    body: 'A IACV substitui o choke manual na injecao da Pop 110i. Deposito de verniz de combustivel + oleo do respiro entopem o agulhao em 15.000-20.000 km de uso urbano. Sintoma: marcha lenta oscilando entre 800 e 2.500 rpm ou moto apagando ao soltar o acelerador subitamente. Limpeza: 2 parafusos, spray EFI Cleaner, ar comprimido. Custo: R$40-80 (mao de obra). IACV nova Honda: R$150-250. Nacional: R$80-120. Limpeza resolve 70% dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK CPR6EA-9 — gap 0,7 mm; troca a cada 8.000 km; vela suja = dificuldade de partida a frio + engasgo em marcha lenta',
    body: 'Vela da Pop 110i: NGK CPR6EA-9 (R$15-25) ou Denso U20EPR9 equivalente. Gap: 0,70 mm — ajuste com calibrador de laminas. Vela suja (negra e com fuligem): mistura rica (IACV suja ou sensor MAF/IAT com problema). Vela esbranquicada: mistura pobre (filtro de ar entupido ou problema na injecao). Troca a cada 8.000 km. Scooter com uso urbano intenso (stop-and-go): considere iridium NGK CPR6EIX-9 (R$55-80) — dura 2x mais e melhora partida a frio.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar — limpeza a cada 6.000 km e troca a cada 12.000 km; filtro entupido reduz potencia e aumenta consumo em scooter urbano',
    body: 'Filtro de papel original Honda Pop 110i: R$35-55. Em cidades com alto indice de poluicao (SP, RJ, BH): limpe visualmente a cada 4.000 km e troque a cada 10.000 km. Filtro limpo: ar fino, cor bege/cinza claro. Filtro sujo: escuro, textura compactada. Filtro entupido no scooter urbano: perda de 10-15% da potencia (ja limitada) e aumento de consumo de 5-8%. Troca simples: painel lateral esquerdo, 2-4 parafusos. 15 minutos de servico.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de freio dianteiro (disco nas versoes 2018+) — fluido DOT 4 a cada 24 meses; pastilha a cada 8.000-10.000 km',
    body: 'Pop 110i com disco dianteiro (versoes a partir de 2018): fluido DOT 4 obrigatorio — nao use DOT 3 que tem ponto de ebulicao menor. Pastilhas: EBC FA142 ou equivalente (R$40-60). Disco: minimo 2,5 mm. Versoes com tambor dianteiro (ate 2017): cable com folga de 10-20 mm na alavanca. Pop 110i tem CBS nas versoes mais novas — pastilha dianteira desgasta mais rapido com CBS ativo. Fluido: troca obrigatoria a cada 24 meses independente do uso.',
  },
]

const POP110I_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Luz FI acendendo — DTC 7 (sensor IAT) e o codigo mais comum na Pop 110i; causas: conector oxidado ou sensor com falha',
    body: 'Conector SCS sob o banco (fio verde). Jumper na posicao, gire a chave sem dar a partida e conte os piscos da luz FI: 1 longo + curtos = dezenas + unidades. Codigo 7 (IAT): limpe o conector com spray de contato + graxa dieletrica. Resolve em 70% dos casos. Codigo 8 (TPS): calibracao via scanner (nao troque sem calibrar). DTC falso: bateria abaixo de 12,0 V gera multiplos codigos — carregue primeiro. Sensor IAT Honda: R$80-150. Nacional: R$40-70.',
  },
  {
    severity: 'WARN',
    title: 'Motor de partida com "click" sem girar — rele de partida 10A ou escovas do motor de partida',
    body: 'Pop 110i: click ao pressionar o botao de partida sem o motor girar = rele de partida queimado ou escovas gastas. Rele: R$25-40 (componente simples de trocar). Escovas: R$20-35 (kit com 2 pecas). Teste rapido: com voltimetro, meça a tensao nos terminais do motor de partida ao pressionar o botao — se tiver tensao mas nao girar = escovas gastas. Se nao tiver tensao = rele. Bateria fraca (< 12,0 V) imita sintoma de rele queimado — teste a bateria primeiro.',
  },
  {
    severity: 'WARN',
    title: 'Variador com deposito de borracha — velocidade maxima limitada a 55-60 km/h; limpeza resolve sem troca de pecas',
    body: 'Deposito da correia CVT desgastada acumula borracha em pe sobre os pratos do variador e da polia traseira. O deposito impede que as polias abram/fechem completamente, limitando a relacao de transmissao. Sintoma: moto nao passa de 60 km/h em plano. Solucao: limpeza dos pratos com alcool isopropilico + pano sem fiapos. Custo: R$60-100 (mao de obra). Se a limpeza nao resolver: prato da polia traseira pode estar desgastado (R$120-200 novo).',
  },
  {
    severity: 'DANGER',
    title: 'Correia CVT rompida em movimento — moto trava instantaneamente; scooter urbano com troco pesado = risco de queda por tras',
    body: 'Correia rompida em movimento trava a roda traseira abruptamente — em scooter urbano, passageiro atras pode ser lancado para frente. Sintoma imediato antes da ruptura: barulho de estalo ao arrancar que piora progressivamente. Ao ouvir estalo na arrancada: pare a moto, nao tente chegar em casa. Empurre ou chame reboque. Pop 110i com 25.000+ km sem troca de correia: risco critico. Custo de reboque > custo de uma correia Gates nova. Nao postergue.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem centrifuga com arrasto — moto "rastejando" em semaforo; mola de embreagem com fadiga ou pastilha desgastada',
    body: 'Mola de embreagem endurecida por fadiga: engagement ocorre em rotacao mais baixa — moto começa a andar antes de voce acelerar (rasteja em semaforo). Pastilha de embreagem desgastada: ao engajar, patina sob carga em subidas (motor ruge mas moto nao acelera). Kit de embreagem (disco + mola): Honda original R$130-200, Yamamoto R$70-110. Servico inclui remocao da caixa CVT — 2-3 h de mao de obra. Nao ignore: clutch preso pode dificultar frenagem em emergencias.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'POP 100',
    yearFrom: 2005, yearTo: 2012,
    tireSize: '70/90-17 (F) · 80/90-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Scooter pequeno — pneu pequeno e sensivel a variacao de pressao. Calibre semanalmente. Pneu abaixo de 25 PSI no traseiro: desgaste rapido das laterais e risco de estouro em lombada. Calibre sempre com pneu frio.',
  },
  {
    modelName: 'POP 110I',
    yearFrom: 2013, yearTo: 2024,
    tireSize: '70/90-17 (F) · 80/90-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Mesmas dimensoes da Pop 100. Com garupa: +3 PSI no traseiro. Disco dianteiro (2018+): pressao correta e critica para frenagem homogenea. Calibre sempre com pneu frio antes de sair.',
  },
]

// ─── Manutencao ───────────────────────────────────────────────────────────────

const makePop100 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor 10W-30 JASO MA', intervalKm: 3000, intervalMonths: 6, notes: '0,85 L. Sem filtro removivel. JASO MA obrigatorio — embreagem centrifuga CVT. Honda Ultra 4T ou Motul 3000 4T.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CPR6EA-9 (gap 0,7 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Gap: 0,70 mm com calibrador de laminas. Vela suja indica mistura rica (carburador). Carregar vela reserva.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (esponja) — limpeza', intervalKm: 4000, intervalMonths: 6, notes: 'Lavar com gasolina, secar, aplicar 5 mL oleo SAE 30. NUNCA ar comprimido direto na espuma.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Carburador PC20 — limpeza completa', intervalKm: 12000, intervalMonths: 18, notes: 'Jato 78, piloto 35. Gasolina velha forma verniz em 30 dias de inatividade. Custo: R$40-70.', priority: 'MEDIUM', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Correia CVT Gates (17R2700)', intervalKm: 20000, intervalMonths: null, notes: 'Troca obrigatoria. Ruptura paralisa a moto instantaneamente. Gates original: R$80-130. Trocar junto com rolos.', priority: 'CRITICAL', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Rolos do variador (8 g x 6 unidades)', intervalKm: 15000, intervalMonths: null, notes: 'Rolos ovalados = solavanco na arrancada. Use SEMPRE 8 g originais. Kit 6 rolos Honda: R$80-120.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit de embreagem centrifuga (disco + mola)', intervalKm: 30000, intervalMonths: null, notes: 'Moto rastejando em semaforo = mola com fadiga. Patina em subida = disco gasto. Honda original: R$130-200.', priority: 'MEDIUM', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do variador e polia traseira', intervalKm: 20000, intervalMonths: null, notes: 'Na cada troca de correia: limpar deposito de borracha dos pratos com alcool isopropilico.', priority: 'MEDIUM', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona dianteira + cabo (tambor)', intervalKm: 10000, intervalMonths: null, notes: 'Folga no cabo: 10-20 mm na alavanca. Lona com mancha de oleo: troca imediata.', priority: 'HIGH', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona traseira + cabo/pedal (tambor)', intervalKm: 12000, intervalMonths: null, notes: 'Pedal com folga excessiva apos ajuste = lonas gastas. Rangido metalico = troca imediata.', priority: 'HIGH', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTX4L-BS 12V 4Ah — verificacao', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V. Click sem girar = rele ou bateria fraca. Bateria com mais de 3 anos: substituicao preventiva.', priority: 'MEDIUM', order: 11 },
]

const makePop110i = (m: string, yf: number, yt: number, hasFrontDisc: boolean): MaintenanceItemInput[] => {
  const items: MaintenanceItemInput[] = [
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor 10W-30 JASO MA2', intervalKm: 3000, intervalMonths: 6, notes: '0,85 L. Sem filtro removivel. JASO MA2 obrigatorio — embreagem centrifuga CVT. Honda Ultra 4T ou Motul 3000 4T.', priority: 'CRITICAL', order: 1 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CPR6EA-9 (gap 0,7 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Gap: 0,70 mm. Iridium CPR6EIX-9 (R$55-80) dura 2x mais. Vela suja indica IACV suja ou sensor IAT com problema.', priority: 'HIGH', order: 2 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (papel) — inspecao e troca', intervalKm: 4000, intervalMonths: 6, notes: 'Inspecionar a cada 4.000 km. Troca a cada 10.000-12.000 km. Em cidades poluidas: troca antecipada.', priority: 'HIGH', order: 3 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do IACV (Idle Air Control Valve)', intervalKm: 10000, intervalMonths: 12, notes: 'Marcha lenta oscilante ou moto apagando = IACV suja. Spray EFI Cleaner. Custo: R$40-80. DTC confirma falha.', priority: 'HIGH', order: 4 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Scanner PGM-FI — leitura de DTCs', intervalKm: null, intervalMonths: 12, notes: 'Anualmente ou ao acender a luz FI. DTC 7 (IAT) e o mais comum. DTC 8 (TPS): calibracao antes de trocar qualquer peca.', priority: 'MEDIUM', order: 5 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Correia CVT Gates (17R2850)', intervalKm: 20000, intervalMonths: null, notes: 'CRITICO. Ruptura paralisa e pode causar queda de passageiro. Gates: R$90-130. Trocar junto com rolos e limpeza do variador.', priority: 'CRITICAL', order: 6 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Rolos do variador (11 g x 6 unidades)', intervalKm: 15000, intervalMonths: null, notes: 'SEMPRE use 11 g — peso diferente altera a curva de aceleracao. Ovalados = solavanco na arrancada. Kit 6 rolos Honda: R$90-130.', priority: 'HIGH', order: 7 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit de embreagem centrifuga (disco + mola)', intervalKm: 30000, intervalMonths: null, notes: 'Moto rastejando em semaforo = mola com fadiga. Patina em subida = disco gasto.', priority: 'MEDIUM', order: 8 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do variador e polia traseira', intervalKm: 20000, intervalMonths: null, notes: 'Em cada troca de correia: limpar deposito de borracha com alcool isopropilico. Prato sujo limita velocidade maxima.', priority: 'MEDIUM', order: 9 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona traseira + cabo/pedal (tambor)', intervalKm: 12000, intervalMonths: null, notes: 'Curso do pedal: 20-30 mm. Rangido metalico = troca imediata. Fras-le ou Honda original.', priority: 'HIGH', order: 10 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTX4L-BS 12V 4Ah — verificacao', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V. A 3.000 rpm: 13,5-14,5 V. Bateria fraca gera DTC falso. Vida util: 2-3 anos em uso diario.', priority: 'MEDIUM', order: 11 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sonda lambda — verificacao', intervalKm: 30000, intervalMonths: null, notes: 'DTC 21 = sonda com falha. Motor usa mapa fixo — pode ser pobre com E100. Denso compativel: R$120-180.', priority: 'HIGH', order: 12 },
  ]

  if (hasFrontDisc) {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4 (disco)', intervalKm: 8000, intervalMonths: 24, notes: 'CBS (versoes 2018+): pastilha dianteira desgasta mais rapido. EBC FA142 ou Honda original. Fluido DOT 4: 24 meses obrigatorio.', priority: 'HIGH', order: 13 })
  } else {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona dianteira + cabo (tambor)', intervalKm: 10000, intervalMonths: null, notes: 'Folga no cabo: 10-20 mm. Lona com oleo = troca imediata + reparo do vazamento.', priority: 'HIGH', order: 13 })
  }

  return items
}

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'POP 100',  yearFrom: 2005, yearTo: 2012, MACETES: POP100_MACETES,  PROBLEMAS: POP100_PROBLEMAS  },
  { modelName: 'POP 110I', yearFrom: 2013, yearTo: 2024, MACETES: POP110I_MACETES, PROBLEMAS: POP110I_PROBLEMAS },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makePop100('POP 100', 2005, 2012),
  // Pop 110i ate 2017: tambor dianteiro
  ...makePop110i('POP 110I', 2013, 2017, false),
  // Pop 110i 2018+: disco dianteiro
  ...makePop110i('POP 110I', 2018, 2024, true),
]

// ─── Runner ───────────────────────────────────────────────────────────────────

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map(t => ({ ...t, category: 'MACETES' as Cat })),
      ...block.PROBLEMAS.map(t => ({ ...t, category: 'PROBLEMAS' as Cat })),
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
