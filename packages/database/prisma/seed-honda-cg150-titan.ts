// seed-honda-cg150-titan.ts — Honda CG 150 TITAN (carburadas + MIX/FLEX)
// SPORT (2005-2008) · TITAN-KS/JOB (2004-2009) · TITAN-ES (2004-2009) · TITAN-ESD/SE (2004-2009)
// TITAN-KS MIX (2009-2011) · TITAN-ES MIX (2009-2010) · TITAN-ESD MIX/FLEX (2009-2015) · TITAN-EX MIX/FLEX (2010-2015)
// Motor: 149cc SOHC ar-cooled | 5 velocidades | Vela: NGK CPR6EA-9, gap 0,9 mm
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

// ─── CG 150 SPORT (2005-2008) ─────────────────────────────────────────────────

const SPORT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 149cc SOHC, 5 velocidades — 1 marcha a mais que CG 125; use 3a-4a na cidade, 5a so em estrada',
    body: 'A 5a marcha reduz RPM de ~7.000 para ~5.500 rpm a 80 km/h — economia real em rodovias. Em trafego urbano, a 5a enrola o motor e aumenta consumo. Motociclistas vindos da 125 frequentemente ficam em 4a o tempo todo. Aprenda a sentir: 5a so alem de 70 km/h em pista livre.',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK CPR6EA-9, gap 0,9 mm — diferente da CG 125 (C7HSA, gap 0,6 mm); exija o codigo correto na loja',
    body: 'A loja pode entregar C7HSA (da 125) por engano — verifique sempre o codigo na embalagem. Gap pre-definido de 0,9 mm na CPR6EA-9. Upgrade: NGK CPR7EA-9 (iridium, mais duravel, NAO ajuste o gap). Troca: 8.000-10.000 km ou quando eletrodo apresentar desgaste visivel.',
  },
  {
    severity: 'OK',
    title: 'CG 150 SPORT — versao esportiva com disco dianteiro e visual exclusivo; mecanica identica ao TITAN-ES',
    body: 'O SPORT tem disco dianteiro, assento solo e grafica esportiva. Mecanicamente igual ao TITAN-ES da mesma epoca: mesmo motor, mesmo carburador, mesma eletrica. Pecas intercambiaveis. Sem partida eletrica — kickstart (KS) apenas. Bateria presente mas so para ignicao e faros.',
  },
  {
    severity: 'OK',
    title: 'Oleo 10W-30 JASO MA, 1,0 L com filtro — troca a cada 3.000 km; JASO MA obrigatorio (embreagem molhada)',
    body: 'Motor maior mas mesma capacidade de oleo que a CG 125. JASO MA e obrigatorio — embreagem molhada integrada ao carter degrada com oleo sem esse aditivo. Castrol Go! 4T, Motul 3100 Gold ou Honda HP4. NUNCA oleo de carro. Fique atento ao nivel — CG 150 consome um pouco mais com calor.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de valvulas a cada 6.000 km — adm 0,05 mm / esc 0,08 mm; igual a CG 125, igualmente critica',
    body: 'Folga de valvula zero na escapamento queima assento progressivamente sem sintoma visivel ate o dano ser irreversivel. Motor frio. PMS na compressao. SPORT de 2005-2008 ja deve ter passado pelo menos por 3 regulagens — verifique o historico. Servico em oficina: R$60-100.',
  },
  {
    severity: 'WARN',
    title: 'CDI com falha termica — para com motor quente, volta frio; troca preventiva acima de 50.000 km',
    body: 'O SPORT usa CDI como todos os CG 150 carburados 2004-2009. Sintoma classico: motor para em hora de pico ou sobe com calor, volta apos 10-15 min esfriando. Teste: sem faiscal com quente = CDI. Profield ou Tech2000 nacionais (R$50-90). Mantenha 1 reserva na bolsa.',
  },
]

const SPORT_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Disco dianteiro com pastilha gasta — rangido metalico e pedal/alavanca indo mais fundo = troca imediata',
    body: 'Pastilhas EBC FA142HH para Honda CG 150 SPORT. Fluido DOT 4: troca a cada 24 meses — fluido higroscopico perde ponto de ebulicao. Disco empenado: pulsacao na alavanca proporcional a velocidade. Disco abaixo da espessura minima gravada (tipicamente 2,5-3,0 mm): troca obrigatoria.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro a tambor frouxo — ajuste o cabo a cada 3.000 km; lona gasta = troca imediata',
    body: 'Pedal com folga excessiva mesmo apos ajuste no fim do curso = lonas gastas. Fras-le ou Honda original. Apos troca: 100-200 km de assentamento para melhor performance. O SPORT tem disco dianteiro + tambor traseiro — use os dois freios equilibradamente.',
  },
  {
    severity: 'WARN',
    title: 'Carburador entupido — jato principal travado por deposito; limpeza com carb cleaner ou ultrassom',
    body: 'Carburador Keihin do CG 150: jato principal #78 (confirme no manual do seu ano). Sintoma: afogamento em aceleracao forte ou marcha lenta instavel. Desmonte, limpe o jato e o piloto com ar comprimido — NAO use palito ou arame no jato. Limpeza completa: R$50-100 em oficina.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 428 seca — lubrificacao a cada 500 km; kit completo (corrente + coroa + pinhao) a cada 15.000 km',
    body: 'Corrente seca aumenta consumo em ~10% e desgasta pinhao e coroa em 50% do tempo. Kit DID 428VX + JT Sprockets (JTF237 14T + JTR1134 41T). NUNCA troque so a corrente — pinhao e coroa gastos destroem a nova em 5.000 km. Ajuste: 20-30 mm de folga vertical no meio.',
  },
]

// ─── CG 150 TITAN-KS / TITAN-JOB (2004-2009) ─────────────────────────────────

const TITANKS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'TITAN-KS: drum/drum; TITAN-JOB: versao comercial com bagageiro; mecanica identica — pecas intercambiaveis',
    body: 'O TITAN-JOB e o TITAN-KS com bagageiro traseiro de carga. Motor, transmissao, eletrica e suspensao identicos. Pecas 100% intercambiaveis. Limite de carga do bagageiro JOB: ~30 kg — respeite ou o quadro e a suspensao sofrem permanentemente.',
  },
  {
    severity: 'OK',
    title: 'Freio a tambor frente E traseiro — ajuste duplo a cada 3.000 km; distancia de frenagem 30-40% maior que disco',
    body: 'O TITAN-KS nao tem disco em nenhuma roda. Frenagem e muito inferior ao ES/ESD — adapte a distancia de seguranca. Cabo dianteiro + alavanca traseiro: ajuste os dois. Lonas dianteiras desgastam mais rapido. Rangido metalico = troca imediata.',
  },
  {
    severity: 'WARN',
    title: 'CDI com falha termica — o problema mais comum em TITAN-KS acima de 40.000 km',
    body: 'Para com motor quente, volta frio = CDI classico. O TITAN-KS nao tem sistema eletrico complexo (sem bateria de traction, sem alternador potente) — o CDI recebe mais calor do motor. Profield ou Tech2000 nacionais (R$50-90). Troca preventiva a cada 50.000 km. Sempre tenha 1 reserva.',
  },
  {
    severity: 'OK',
    title: 'Kickstart como unico metodo de partida — verifique mola e catraca do mecanismo; manutencao simples',
    body: 'A mola do kickstart resiste em media 80.000-100.000 km. Pedal que "escorrega" sem resistencia = mola partida (R$30-60 pecas). Catraca do kickstart que nao trava = bucha gasta (kit R$40-70). Sistema simples e confiavel quando mantido. Nao precisa de bateria para partir (ignicao e CDI sao alimentados pelo alternador).',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 com motor de maior torque — kit a cada 15.000-18.000 km; DID 428VX ou RK recomendados',
    body: 'Motor 149cc tem mais torque que CG 125 — corrente trabalha mais. Kit DID 428VX completo. Lubrifique a cada 500 km com spray de corrente (Motul Chain Lube, Wurth). Ajuste: 20-30 mm de folga. Tensao excessiva desgasta mancal da roda traseira e caixa de cambio.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de valvulas a cada 6.000 km — critica para motor sem alarme de "check engine"',
    body: 'TITAN-KS carburado nao tem nenhum indicador de falha mecanica — voce so percebe quando a perda de potencia ja e severa. Valvulas desreguladas consomem 15-20% mais combustivel e reduzem vida util do motor. Adm 0,05 mm / esc 0,08 mm, motor frio. R$60-100 em oficina.',
  },
]

const TITANKS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Freio dianteiro a tambor ineficaz — distancia de parada muito longa; nao freie apenas com a traseira',
    body: 'O freio dianteiro a tambor do TITAN-KS tem capacidade de frenagem limitada. Em emergencia, freie dianteiro + traseiro simultaneamente. Nunca apenas traseiro — a moto derrapa. Se lonas oleadas por retentor de eixo com vazamento: troque lonas + retentor (R$60-100).',
  },
  {
    severity: 'DANGER',
    title: 'Pneu traseiro com pressao baixa — CG 150 mais pesada que 125; 33 PSI solo ou 36 PSI com garupa',
    body: 'A CG 150 pesa ~123 kg (vs ~105 kg da CG 125) — pressao baixa no pneu traseiro sob o peso maior e mais perigosa. Pneu 3.00-18 com 25 PSI sob piloto de 80 kg: flanco colapsando. Verifique antes de cada saida.',
  },
  {
    severity: 'WARN',
    title: 'Motor para com calor (CDI) — diagnostique antes de chamar guincho; teste faiscal e simples',
    body: 'Motor que para e nao da partida com quente: retire a vela, encosta o corpo metalico no motor, peca alguem girar o kickstart — faiscal azul forte = ignicao OK (problema no carburador/combustivel). Sem faiscal = CDI. Com CDI reserva resolve em 5 minutos.',
  },
  {
    severity: 'WARN',
    title: 'Carburador entupido por etanol E10 parado — goma branca no jato; limpeza com carb cleaner resolve',
    body: 'CG 150 TITAN-KS 2004-2009 roda em gasolina (sem flex). Com gasolina brasileira (E10-E27): etanol no combustivel deixa residuo se a moto ficar parada 30+ dias. Drene o carburador antes de guardar. Goma no jato: carb cleaner em spray resolvе em 15 min.',
  },
]

// ─── CG 150 TITAN-ES (2004-2009) ──────────────────────────────────────────────

const TITANES_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'TITAN-ES: disco dianteiro + tambor traseiro + partida eletrica — bateria YTZ5S (12V 5Ah)',
    body: 'A ES adiciona disco dianteiro e partida eletrica ao TITAN base. Frenagem dianteira 30% melhor que KS. Bateria YTZ5S — verifique tensao de carga (13,8-14,8 V a 4.000 rpm) antes de instalar bateria nova. Regulador defeituoso destroi bateria nova em semanas. Pedal KS permanece como backup.',
  },
  {
    severity: 'OK',
    title: 'Disco dianteiro — pastilhas EBC FA142HH; fluido DOT 4 troca a cada 24 meses; pinca: pistao anualmente',
    body: 'Pinca simples, 1 pistao. Pastilhas: EBC FA142HH ou Ferodo FDB para Honda 150. Fluido DOT 4 higroscopico — apos 24 meses, ponto de ebulicao cai e freio fica "mole" em uso intenso. Pistao enferrujado = pastilha desgasta so de um lado. Mova a alavanca de freio antes de rodar apos parada longa.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador — meça tensão de carga ANTES de instalar bateria nova; nacional falha mais cedo',
    body: 'Tensao de carga correta: 13,8-14,8 V a 4.000 rpm. Abaixo de 13 V = regulador nao carrega (bateria morre em horas). Acima de 15 V = regulador destroi bateria nova rapidamente. Honda original: R$80-150. Nacional: R$40-70 (menor confiabilidade). Troca preventiva a cada 40.000 km.',
  },
  {
    severity: 'WARN',
    title: 'CDI com falha termica (2004-2009) — todos os ES desta epoca sao carburados com CDI vulneravel',
    body: 'Mesmo problema que o KS. CDI recebe calor do motor e do sol batendo no painel. Falha tipicamente entre 40.000-70.000 km. Sintoma: motor para com quente, faiscal ausente. Profield nacional (R$50-90) como reserva. A partida eletrica nao ajuda sem ignicao — use o pedal KS para diagnosticar CDI vs bateria.',
  },
  {
    severity: 'OK',
    title: 'Motor de partida — escovas desgastam em 50.000-70.000 km; rele de partida (solenide) falha a 40.000 km',
    body: 'Escovas gastas: starter progressivamente mais lento. Kit escovas Honda CG 150: R$20-40. Rele de partida que clica mas nao gira o motor = rele queimado (R$20-40). Diagnostico: bridge direto nos terminais grossos do rele — se girar, rele morto. Nao confunda rele queimado com bateria fraca.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — mesmo kit da KS; ES um pouco mais pesada mas mesmos intervalos de manutencao',
    body: 'Kit DID 428VX + JTF237 (14T) + JTR1134 (41T). Lubrificacao: spray a cada 500 km. Kit completo: 15.000-18.000 km. Tensao excessiva da corrente (< 20 mm de folga) destrói mancal da roda traseira. Tensao insuficiente (> 35 mm): corrente bate no protetor e pode sair do pinhao.',
  },
]

const TITANES_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bateria que descarrega rapidamente — meca drain de repouso antes de comprar nova bateria',
    body: 'Bateria descarregada em 1 noite: meca corrente de repouso (multimetro em serie com bateria desconectada) — acima de 20 mA = drain (rele preso, alarme, CDI defeituoso). Tensao de carga abaixo de 13,5 V = regulador nao carrega. Nunca instale bateria nova sem resolver a causa da descarga.',
  },
  {
    severity: 'WARN',
    title: 'Starter sem forca com motor quente — bateria fraca sob calor ou escovas gastas; diagnostique na ordem',
    body: 'Bateria com 70% de capacidade arranca motor frio mas pode falhar com motor quente (maior resistencia interna). (1) Meca tensao da bateria em repouso (> 12,0 V OK); (2) Meca ao acionar o starter (deve manter > 9,5 V); (3) Queda > 2 V = bateria ou cables com alta resistencia. Use KS como referencia — se KS arranca e starter nao, e sistema eletrico.',
  },
  {
    severity: 'WARN',
    title: 'Disco dianteiro empenado — pulsacao na alavanca proporcional a velocidade; troca e a solucao definitiva',
    body: 'Disco empenado raramente retorna ao plano. Retifica e cara e pouco acessivel. Disco de reposicao: R$80-150 nacional, R$180-300 Honda original. Diagnostico: cavalete, gire a roda lentamente com as pastilhas estaticas, observe oscilacao lateral — > 0,3 mm confirma empenamento.',
  },
  {
    severity: 'WARN',
    title: 'CDI e starter com falha simultanea — identifique qual e o problema antes de gastar em pecas',
    body: 'Starter nao gira (rele/bateria/escovas) E motor nao pega no KS (CDI): sao problemas independentes. Prioridade: teste o KS primeiro — sem faiscal no KS = CDI morto. Com faiscal no KS mas motor nao pega = combustivel/carburador. Starter pode ser depurado depois. Nao atribua tudo a bateria.',
  },
]

// ─── CG 150 TITAN-ESD / TITAN SPECIAL EDITION (2004-2009) ────────────────────

const TITANESD_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'TITAN-ESD: disco dianteiro + disco traseiro + partida eletrica — melhor frenagem da linha 2004-2009',
    body: 'ESD = Eletrico + Suave + Disco (frente e tras). Duas pincas, dois sistemas de fluido, dois conjuntos de pastilhas. Frenagem muito superior ao ES. Distancia de parada 20-25% menor que ES em piso molhado. Manutencao: fluido DOT 4 em ambas as pincas a cada 24 meses.',
  },
  {
    severity: 'WARN',
    title: 'Pinca traseira — pistao enferruja muito mais rapido que a dianteira; proteja com capa borracha e mova mensalmente',
    body: 'O disco traseiro tem protecao contra respingos inferior. Pistao enferrujado = pastilha desgasta de um lado e disco aquece sem frenagem forte. Prevencao: mova o pistao traseiro com a alavanca de freio 5-10 vezes a cada 500 km. Kit de rebuild (vedacoes + pistao): R$30-60. Pinca recondicionada: R$60-150.',
  },
  {
    severity: 'OK',
    title: 'Pastilhas traseiras desgastam mais rapido que dianteiras — verifique com mais frequencia',
    body: 'O disco traseiro e menor e recebe proporcao maior da forca de frenagem relativa ao seu tamanho. Pastilhas traseiras: inspecione a cada 5.000 km (vs 6.000 km para dianteiras). EBC FA174 (traseiro CG 150) ou equivalente Honda. Pastilha metal tocando disco: rangido metalico + dano ao disco (R$80-200 extra).',
  },
  {
    severity: 'WARN',
    title: 'Fluido DOT 4 em duas pincas — dobra o custo de manutencao mas evita vapor lock em descidas longas',
    body: 'Com dois sistemas de freio hidraulico, dobra a frequencia de verificacao mas NAO a frequencia de troca (ambos: 24 meses). Sangria completa: aprox. 150-200 mL de DOT 4 por circuito. NUNCA misture DOT 3 e DOT 4. Freio traseiro "mole" e mais perigoso que dianteiro mole — faz a moto oscilar lateralmente.',
  },
  {
    severity: 'WARN',
    title: 'CDI e sistema ES identicos ao TITAN-ES 2004-2009 — mesmos problemas, mesmas solucoes',
    body: 'ESD e ES compartilham CDI, alternador, regulador, bateria YTZ5S e motor de starter. CDI: troca preventiva a 50.000 km (Profield R$50-90). Regulador: tensao 13,8-14,8 V. Starter: escovas a 50.000-70.000 km. A complexidade da ESD esta nos freios — o resto e identico ao ES.',
  },
  {
    severity: 'OK',
    title: 'TITAN SPECIAL EDITION — versao premium do ESD com acabamento diferenciado; mecanica 100% identica ao ESD',
    body: 'O "TITAN SPECIAL EDITION" e o mesmo TITAN-ESD com graficos e acabamentos exclusivos. Pecas mecanicas completamente intercambiaveis com o ESD padrao. Nao ha nenhuma diferenca tecnica — toda manutenção e a mesma. O valor superior no FIPE e puramente estetico.',
  },
]

const TITANESD_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Fluido DOT 4 velho nas duas pincas — vapor lock em descida com carga; troca bianual e obrigatoria',
    body: 'DOT 4 com 3+ anos: ponto de ebulicao cai de ~240C para ~150C. Em descida longa frenando: fluido vaporiza, alavanca vai ao fundo sem frear — vapor lock. Com dois circuitos hidraulicos: o risco dobra se ambos estiverem com fluido velho. Troca anual em uso de alta demanda (delivery, serra).',
  },
  {
    severity: 'WARN',
    title: 'Pinca traseira travada — disco quente apos poucos km sem frenagem = pistao preso',
    body: 'Disco traseiro quente apos percurso curto sem freagens = pistao nao retrai. Verifique: apos rodar 5 km, pare e coloque a mao proximo ao disco traseiro (sem tocar) — calor excessivo confirma pistao preso. Limpeza + rebuild: R$30-60. Pistao severamente enferrujado: troque a pinca (recondicionada R$60-150).',
  },
  {
    severity: 'WARN',
    title: 'CDI queimado + pinca traseira travada — problemas coexistindo em ESD de alta quilometragem',
    body: 'ESD acima de 70.000 km pode ter CDI na borda da vida util E pinca traseira com pistao degradado. Faca revisao completa (CDI + freios + valvulas + oleo) juntos — mais economico e seguro que resolver um de cada vez conforme falham. R$300-500 de revisao completa evita 3 paradas imprevistas.',
  },
  {
    severity: 'WARN',
    title: 'Disco traseiro empenado — mais comum que o dianteiro por exposi o a respingos e menor resfriamento',
    body: 'Disco traseiro empenado: pulsacao no pedal de freio. Diagnostico identico ao dianteiro: cavalete, gire, observe oscilacao > 0,3 mm. Disco traseiro de reposicao: R$60-100 nacional. Honda original: R$150-200. Empenamento leve (< 0,5 mm): pode tolerar temporariamente — troque na proxima manutencao.',
  },
]

// ─── CG 150 TITAN-KS MIX (2009-2011) ─────────────────────────────────────────

const TITANKS_MIX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'TITAN-KS MIX (2009-2011) — flex carburado; aceita gasolina e etanol em qualquer proporcao',
    body: 'O MIX usa carburador especifico para flex fuel com borracha resistente a etanol e jato calibrado para mistura variavel. Drum/drum como o KS anterior. Kickstart apenas — sem bateria de tracao. A transicao para MIX foi o primeiro passo antes da injecao PGM-FI. Producao curta: 2009-2011.',
  },
  {
    severity: 'WARN',
    title: 'Carburador MIX — limpeza a cada 6.000 km; etanol deixa residuos que entopem em parada prolongada',
    body: 'O etanol e mais corrosivo que gasolina para borrachas e deposita goma residual quando evapora. Carburador MIX parado 30+ dias com etanol no bojo: limpeza obrigatoria antes de tentar partir. Drene o carburador pela torneira de reserva antes de guardar a moto. Kit rebuild do carb MIX: R$80-150.',
  },
  {
    severity: 'WARN',
    title: 'Partida fria com etanol puro (E100) em temperatura abaixo de 15C — use choke por 60-90 seg',
    body: 'Etanol tem calor de vaporizacao alto — mais dificil de ignitar no frio. Abaixo de 15C com tanque so de etanol: acione o choke e espere motor aquecer antes de ir. Solucao pratica: mantenha 5-10 L de gasolina no tanque para facilitar partidas frias. O motor funciona normalmente apos aquecer.',
  },
  {
    severity: 'OK',
    title: 'CDI ainda presente no KS MIX — mesma vulnerabilidade termica da geracao anterior; reserva nacional essencial',
    body: 'O TITAN-KS MIX 2009-2011 mantem CDI (nao tem ECU). Mesma falha termica classica. Motor novo (2009-2011) pode ter CDI fresco, mas quem ja tem acima de 50.000 km deve trocar preventivamente. Profield R$50-90. Com flex, o motor varia mais a temperatura — CDI pode falhar mais cedo em uso pesado com etanol puro.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar — limpeza a cada 2.500 km com etanol; etanol aumenta consumo de combustivel pelo filtro',
    body: 'Etanol demanda mais combustivel que gasolina (cerca de 25-30% mais volume) — mais ar processado = filtro sujo mais rapido. Com motor rodando em etanol puro: reduza intervalo de limpeza do filtro de espuma para 2.500 km. Espuma oleada com filtro limpo melhora o desempenho visivelmente.',
  },
]

const TITANKS_MIX_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carburador entupido com etanol ressecado — borracha interna endurecida e goma no jato; rebuild necessario',
    body: 'Moto guardada com etanol no carburador: jato entupido com deposito branco + borracha endurecida. Carb cleaner em spray pode resolver o jato (mergulhe o carb por 30 min). Borracha endurecida: kit rebuild completo (R$80-150). Nao force o afogador/choke se o jato estiver entupido — piora o problema.',
  },
  {
    severity: 'WARN',
    title: 'Motor puxando pobre com etanol puro — jato principal pode estar pequeno para E100 100%',
    body: 'Carb MIX calibrado para mistura gasol/etanol pode ficar pobre em etanol 100%. Sintoma: motor sem forca, especialmente em aceleracao. Solucao: misture 20-30% de gasolina ao etanol, mude o jato para tamanho maior (consulte manual especifico do modelo). Um mecanico experiente em CG 150 MIX sabe o jato correto.',
  },
  {
    severity: 'WARN',
    title: 'CDI com falha termica com etanol — etanol queima mais quente; CDI pode falhar mais cedo',
    body: 'Etanol tem temperatura de combustao ligeiramente maior. CDI proximo do motor em dia quente com etanol: ciclo termico mais agressivo. Se CG 150 KS MIX falha termicamente acima de 35.000 km, troque o CDI sem hesitar. Profield R$50-90 e um investimento de protecao real.',
  },
  {
    severity: 'WARN',
    title: 'Freio dianteiro a tambor — eficiencia reduzida em piso molhado; distancia de seguranca maior com chuva',
    body: 'KS MIX tem drum/drum — sem disco. Em chuva: tambor dianteiro perde ate 40% da eficiencia ate as lonas secarem. Adapte a distancia de seguranca em dia de chuva. Lonas oleadas por retentor de eixo vazando: troque imediatamente — lona oleada e praticametne ineficaz ate em piso seco.',
  },
]

// ─── CG 150 TITAN-ES MIX (2009-2010) ─────────────────────────────────────────

const TITANES_MIX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'ES MIX (2009-2010) — versao de curta producao; disco dianteiro + partida eletrica + flex carburado',
    body: 'Produzida apenas em 2009-2010. Combina o sistema eletrico do TITAN-ES (bateria, starter) com o carburador MIX flex. Pecas de motor identicas ao KS MIX; sistema ES identico ao TITAN-ES 2004-2009. Bateria YTZ5S. Manutencao do carburador MIX identica ao KS MIX (limpe a cada 6.000 km).',
  },
  {
    severity: 'WARN',
    title: 'Carburador MIX com partida eletrica — na duvida sobre o combustivel, use gasolina para facilitar partidas a frio',
    body: 'Com etanol puro em dia frio: o starter eletrico pode nao ter potencia suficiente para vencer a resistencia de um motor frio com mistura pobre. Mantenha 5-10 L de gasolina no tanque em dias de temperatura abaixo de 15C. Choke aberto + gasolina = partida sem estresse para bateria e starter.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador — mesma fragilidade do ES 2004-2009; tensao fora da faixa compromete bateria e CDI',
    body: 'Regulador com defeito que carrega em 15-17 V: destroi bateria em semanas E pode danificar o CDI (que recebe tensao acima do projeto). Meça a tensao de carga MENSALMENTE no primeiro ano apos a troca do regulador para confirmar estabilizacao. Honda original ou nacional de qualidade (evite os mais baratos).',
  },
  {
    severity: 'OK',
    title: 'Disco dianteiro — manutencao identica ao TITAN-ES; pastilhas EBC FA142HH, fluido DOT 4 a cada 24 meses',
    body: 'Toda a logica do freio dianteiro do ES MIX e identica ao ES 2004-2009. Pinca de 1 pistao. EBC FA142HH. Fluido DOT 4 (nao use DOT 3 — menor ponto de ebulicao). Troca completa: sangre bem antes de fechar o sistema. Alavanca com sensacao de "esponja" = ar no sistema de freio.',
  },
  {
    severity: 'OK',
    title: 'CDI ainda presente — o ES MIX 2009-2010 nao tem ECU; mesmo cuidado com falha termica',
    body: 'ES MIX e carburado — CDI como todos os CG 150 TITAN 2004-2010. A transicao para ECU/injecao so veio com a linha FAN ESi (2010+). Moto com 15 anos: CDI pode estar no fim da vida util. Troca preventiva (R$50-90) + reserva na bolsa.',
  },
]

const TITANES_MIX_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Starter lento com etanol e frio — bateria precisa de mais corrente; verifique saude da bateria na estacao fria',
    body: 'Bateria de chumbo perde 30-40% da capacidade em temperatura abaixo de 10C. Com etanol, motor precisa de mais cranking. ES MIX em dia frio de inverno: bateria com < 12,5 V pode nao arrancar. Carregue a bateria na vespera de dias muito frios ou use gasolina para a partida da manha.',
  },
  {
    severity: 'WARN',
    title: 'Carburador MIX entupido + disco com pastilha gasta — revisao combinada na ES MIX de alta km',
    body: 'ES MIX de 2009-2010 com 15 anos de uso: carburador com borracha degradada + pastilhas no limite + bateria fraca podem coexistir. Revisao completa (R$400-600) e mais economica que 4 visitas separadas a oficina. Peca diagnostico completo ao levar a moto.',
  },
  {
    severity: 'WARN',
    title: 'CDI com falha termica + etanol puro — combinacao que acelera falha; troca preventiva urgente',
    body: 'CDI apos 50.000 km + etanol puro em dia quente = combinacao de risco alto. Etanol queima mais quente, CDI esquenta mais. Sintoma classico: para em hora de pico. Solucao: (1) troque CDI preventivamente; (2) misture gasolina ao etanol em dias quentes. Nao espere a falha confirmar a necessidade.',
  },
]

// ─── CG 150 TITAN-ESD MIX/FLEX (2009-2015) ───────────────────────────────────

const TITANESDMIX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'ESD MIX/FLEX (2009-2015) — disco/disco + partida eletrica + flex; producao mais longa da serie CG 150 TITAN',
    body: 'O ESD MIX/FLEX foi produzido por 7 anos — pecas amplamente disponiveis. Modelos 2009-2012 (MIX) tem CDI; modelos 2013-2015 (FLEX) podem ter CDI ou ECU — confirme pelo manual do seu ano especifico. Disco/disco como o ESD 2004-2009; carburador MIX flex como os modelos MIX 2009+.',
  },
  {
    severity: 'WARN',
    title: 'Pinca traseira — problema cronico da ESD agravado por uso misto flex; inspecao mensal',
    body: 'ESD MIX/FLEX: pinca traseira sob exposicao prolongada a respingos E variacao de temperatura maior (etanol queima mais quente). Pistao enferruja mais rapido. Inspecao mensal: aperte o pedal traseiro e verifique se o disco esfria normalmente apos rodagem curta. Rebuild preventivo a cada 20.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Fluido DOT 4 nos dois discos — troca anual em uso com etanol puro (etanol aumenta umidade no sistema)',
    body: 'Em uso predominantemente com etanol (E100), a maior temperatura de combustao aumenta a temperatura do fluido de freio. Fluido DOT 4 absorve mais umidade quando cicla termicamente com frequencia. Em uso com etanol puro: troque o fluido anualmente (vs 24 meses com gasolina). Mais seguro e mais barato que reconstruir pinca.',
  },
  {
    severity: 'OK',
    title: 'Filtro de combustivel (flex) — troca a cada 12.000 km; etanol e mais corrosivo para o filtro',
    body: 'Os modelos MIX/FLEX tem filtro de combustivel especifico para uso com etanol. Troca: 12.000 km ou quando observar queda de pressao de combustivel (motor puxando pobre). Honda original: R$30-50. Filtro entupido com etanol: motor perde potencia em alta rotacao antes de mostrar outros sintomas.',
  },
  {
    severity: 'OK',
    title: 'Modelos 2013-2015 "FLEX" — confirme se e CDI ou ECU; troca de CDI por ECU na linha TITAN ocorreu gradualmente',
    body: 'Honda transicionou gradualmente. Se seu ESD FLEX 2013-2015 tem luz FI no painel = ECU (mais confiavel). Sem luz FI = CDI. Modelos com ECU: diagnostico DTC via conector SCS. Com CDI: troca preventiva a 50.000 km. Nao assuma sem verificar — a diferenca na manutencao e significativa.',
  },
]

const TITANESDMIX_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carburador MIX com vazamento de combustivel — vedacoes internas ressecadas apos 5+ anos',
    body: 'Borracha do carburador MIX dura em media 8-12 anos. ESD MIX de 2009 tem 15+ anos: vedacoes internas provavelmente ressecadas. Vazamento pelo dreno ou respiro do carb = rebuild imediato (risco de incendio). Kit rebuild carb MIX: R$80-150. Use pecas Honda originais ou equivalente de qualidade (Dafiti Pecas, TecFil).',
  },
  {
    severity: 'DANGER',
    title: 'Vazamento de combustivel (etanol) proximo ao escapamento — risco de incendio; pare imediatamente',
    body: 'Etanol queima com chama INVISIVEL — voce pode estar em um incendio sem ver as chamas. Qualquer cheiro de combustivel com motor quente: pare, desligue, afaste. Nunca ignore vazamentos. Carburador MIX com vedacao ruim + escapamento quente e combinacao de alto risco. Inspecione o carb visualmente a cada troca de oleo.',
  },
  {
    severity: 'WARN',
    title: 'Pinca traseira completamente travada — disco desgastou assimetricamente; troca do disco necessaria',
    body: 'Pistao traseiro travado por anos: pastilha interna (lado do pistao) toca o disco continuamente. Disco desgasta de um lado so — espessura desigual. Disco traseiro desgastado assimetricamente: troca obrigatoria (R$60-100 nacional). Pastilhas e rebuild da pinca juntos: R$150-250 total.',
  },
]

// ─── CG 150 TITAN-EX MIX/FLEX (2010-2015) ────────────────────────────────────

const TITANEX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'TITAN-EX MIX/FLEX (2010-2015) — versao premium da linha; disco/disco, partida eletrica, flex; maior acabamento',
    body: 'O TITAN-EX e o topo da linha TITAN com acabamento mais cuidado: painel com mais informacoes, grafica exclusiva, espelhos e protecoes diferenciados. Mecanicamente IDENTICO ao ESD MIX/FLEX — motor, transmissao, suspensao e sistema de freios sao os mesmos. Toda manutencao do ESD MIX aplica-se aqui.',
  },
  {
    severity: 'WARN',
    title: 'Painel mais completo no EX — se tem luz FI, confirme se e CDI ou ECU; manutencao diverge',
    body: 'O painel diferenciado do EX pode ter indicadores extras. Luz FI presente = ECU (modelos 2013-2015 podem ter). Sem luz FI = CDI. ECU: diagnostico DTC via SCS connector. CDI: troca preventiva acima de 50.000 km. O acabamento premium nao muda a mecanica — e a mesma da ESD MIX.',
  },
  {
    severity: 'WARN',
    title: 'Pinca traseira — mesmo problema cronico do ESD; acabamento premium nao muda exposicao ao ferrugem',
    body: 'O EX usa a mesma pinca traseira do ESD — mesma vulnerabilidade ao enferrujamento do pistao. Inspecao mensal identica ao ESD. Proteja com capa de borracha de pó (less than R$10). Rebuild preventivo a cada 20.000 km. Nao pague mais caro em um "kit especial EX" — as pecas sao identicas ao ESD padrao.',
  },
  {
    severity: 'OK',
    title: 'Pecas de reposicao do EX — use as mesmas do ESD MIX/FLEX; nao existe "peca exclusiva EX" para mecanica',
    body: 'Toda a mecanica do EX e intercambiavel com o ESD MIX/FLEX: motor, transmissao, freios, sistema eletrico. As unicas pecas exclusivas sao esteticas (plasticos, espelhos, grafica). Evite pagar premium por "peca para EX" — exija o codigo da peca e compare com o ESD.',
  },
  {
    severity: 'OK',
    title: 'Filtro de combustivel flex + carburador MIX — mesma manutencao do ESD MIX; limpeza a cada 6.000 km',
    body: 'Carburador MIX do EX: limpeza a cada 6.000 km. Filtro de combustivel flex: troca a cada 12.000 km. Em uso com etanol puro: reduza carburador para 5.000 km. Se guardou com etanol no carb: limpeza antes de partir. Kit rebuild carb: R$80-150.',
  },
]

const TITANEX_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'EX com 10+ anos — revisao completa de todos os sistemas e recomendada; nao confie so no "visual premium"',
    body: 'Um EX 2010 com 15 anos pode ter carburador com borracha degradada, CDI na borda, pinca traseira travada e valvulas desreguladas — tudo ao mesmo tempo. Visual cuidado nao significa mecanica cuidada. Revisao completa: R$400-700. Valha por conta como diagnostico antes de comprar um EX usado.',
  },
  {
    severity: 'WARN',
    title: 'Pinca traseira travada + carb MIX entupido — os dois problemas mais comuns em EX de alta quilometragem',
    body: 'EX acima de 60.000 km: chance alta de pinca traseira com pistao preso (disco quente constante) + carb MIX com jato entupido (motor afogado ou pobre). Resolve os dois juntos: rebuild da pinca (R$60-150) + limpeza do carb (R$50-100). Total: R$150-250 em pecas, R$100-150 em mao de obra.',
  },
  {
    severity: 'WARN',
    title: 'CDI (2010-2012) com falha termica — confirme ano antes de comprar pecas',
    body: 'EX 2010-2012: CDI vulneravel. EX 2013-2015: pode ter CDI ou ECU — verifique pelo painel (luz FI). CDI Profield nacional (R$50-90) como solucao. Se e ECU: nao troque sem ler os codigos DTC primeiro — a ECU raramente falha e o problema geralmente e sensor.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  { modelName: 'CG 150 SPORT',                               yearFrom: 2005, yearTo: null, tireSize: '2.75-18 (F) · 3.00-18 (R)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Aro 18" como toda a familia TITAN. Rinaldi RA50 Sport ou Pirelli Citynet. Verifique semanalmente — CG 150 mais pesada que CG 125.' },
  { modelName: 'CG 150 TITAN-KS/ TITAN-JOB',                yearFrom: 2004, yearTo: null, tireSize: '2.75-18 (F) · 3.00-18 (R)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'TITAN-JOB com carga traseira: use 36 PSI no traseiro. Verifique antes de cada turno de trabalho.' },
  { modelName: 'CG 150 TITAN-ES',                            yearFrom: 2004, yearTo: null, tireSize: '2.75-18 (F) · 3.00-18 (R)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Com disco dianteiro: pressao correta e critica para eficiencia de frenagem. Pneu mole + disco = risco de tombamento em frenagem forte.' },
  { modelName: 'CG 150 TITAN-ESD/ TITAN SPECIAL EDITION',   yearFrom: 2004, yearTo: null, tireSize: '2.75-18 (F) · 3.00-18 (R)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Disco/disco: pressao incorreta compromete balanceamento de frenagem. Verifique os dois pneus antes de qualquer uso em velocidade.' },
  { modelName: 'CG 150 TITAN-KS MIX',                       yearFrom: 2009, yearTo: null, tireSize: '2.75-18 (F) · 3.00-18 (R)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Mesmo pneu 18" do TITAN carburado. Drum/drum: distancia de frenagem maior — pressao correta e critica para desempenho maximo dos tambores.' },
  { modelName: 'CG 150 TITAN-ES MIX',                       yearFrom: 2009, yearTo: null, tireSize: '2.75-18 (F) · 3.00-18 (R)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Pneu dianteiro com pressao baixa reduz eficiencia do disco dianteiro. DOT acima de 5 anos: troque mesmo com sulco aparente.' },
  { modelName: 'CG 150 TITAN-ESD MIX/FLEX',                 yearFrom: 2009, yearTo: null, tireSize: '2.75-18 (F) · 3.00-18 (R)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'ESD com disco/disco: verifique os dois pneus juntos. Pneu traseiro 3.00-18 deve ser inspecionado com mais atencao por receber mais carga.' },
  { modelName: 'CG 150 TITAN-EX MIX/FLEX',                  yearFrom: 2010, yearTo: null, tireSize: '2.75-18 (F) · 3.00-18 (R)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Identico ao ESD MIX/FLEX. Pirelli Citynet ou Rinaldi RA50 Sport para 18". DOT ate 5 anos.' },
]

// ─── Manutencao ───────────────────────────────────────────────────────────────

const makeTitan = (
  m: string, yf: number, yt: number,
  hasES: boolean, hasFrontDisc: boolean, hasRearDisc: boolean, isMix: boolean
): MaintenanceItemInput[] => {
  const items: MaintenanceItemInput[] = [
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor (10W-30 JASO MA) + filtro', intervalKm: isMix ? 4000 : 3000, intervalMonths: 6, notes: '~1,0 L com filtro. MIX/FLEX aceita 4.000 km. JASO MA obrigatorio — embreagem molhada. Motul 3100 Gold ou Honda HP4.', priority: 'CRITICAL', order: 1 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de valvulas (adm 0,05 mm / esc 0,08 mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio. PMS na compressao. Identico a CG 125 mas motor maior exige mais atencao. R$60-100 em oficina.', priority: 'CRITICAL', order: 2 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CPR6EA-9 (gap 0,9 mm)', intervalKm: 8000, intervalMonths: 24, notes: 'Gap PRE-DEFINIDO — NAO ajuste. Diferente da CG 125 (C7HSA). Upgrade: CPR7EA-9 iridium.', priority: 'HIGH', order: 3 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (espuma) — limpeza com diesel', intervalKm: 3000, intervalMonths: 6, notes: isMix ? 'Com etanol: limpeza a cada 2.500 km (maior consumo de ar). Seque e aplique filme de oleo.' : 'Lave com diesel, seque, aplique filme de oleo. Filtro sujo aumenta consumo 15%.', priority: 'HIGH', order: 4 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lubrificacao da corrente de transmissao (428)', intervalKm: 500, intervalMonths: null, notes: 'Spray Motul Chain Lube ou Wurth. Ajuste: 20-30 mm de folga vertical. Kit completo: 15.000-18.000 km.', priority: 'MEDIUM', order: 5 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: isMix ? 'Limpeza do carburador MIX (flex)' : 'Limpeza do carburador Keihin', intervalKm: isMix ? 6000 : 10000, intervalMonths: 12, notes: isMix ? 'Etanol deixa residuos — limpeza mais frequente. Drene o bojo antes de guardar. Kit rebuild: R$80-150.' : 'Jato principal #78. Piloto + aceleradora. Nao use palito nos jatos. Carb cleaner em spray.', priority: 'HIGH', order: 6 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: hasFrontDisc ? 'Ajuste do freio traseiro (tambor)' : 'Ajuste dos freios dianteiro e traseiro (tambor)', intervalKm: 3000, intervalMonths: 6, notes: 'Pedal/alavanca: 20-30 mm de folga. Lona com rangido metalico: troca imediata. Fras-le ou Honda original.', priority: 'HIGH', order: 7 },
  ]
  if (hasFrontDisc) items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4', intervalKm: 10000, intervalMonths: 24, notes: 'EBC FA142HH. Fluido DOT 4: 24 meses (anual em uso de alta demanda). Verifique piston da pinca por enferrujamento.', priority: 'HIGH', order: 8 })
  if (hasRearDisc) items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas traseiras + fluido DOT 4 (disco traseiro)', intervalKm: 8000, intervalMonths: 24, notes: 'Pastilhas traseiras desgastam mais rapido. EBC FA174 ou equivalente. Fluido: mesma troca do dianteiro. Rebuild da pinca: a cada 20.000 km.', priority: 'HIGH', order: hasFrontDisc ? 9 : 8 })
  if (isMix) {
    const o = (hasRearDisc ? 10 : hasFrontDisc ? 9 : 8)
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de combustivel (sistema flex)', intervalKm: 12000, intervalMonths: null, notes: 'Etanol mais corrosivo para o filtro. Honda original: R$30-50. Entupido: motor pobre em alta rotacao.', priority: 'MEDIUM', order: o })
  }
  if (hasES) {
    const baseO = (isNaN(items.length) ? 9 : items.length + 1)
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria (YTZ5S 12V 5Ah)', intervalKm: null, intervalMonths: 18, notes: 'Verifique tensao de carga (13,8-14,8 V a 4.000 rpm) antes de instalar bateria nova. Yuasa YTZ5S.', priority: 'HIGH', order: baseO })
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulador/retificador + estator', intervalKm: null, intervalMonths: 12, notes: 'Tensao fora da faixa destroi bateria. Honda original R$80-150. Nacional R$40-70. Troca preventiva: 40.000 km.', priority: 'HIGH', order: baseO + 1 })
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Motor de partida (escovas + comutador)', intervalKm: 50000, intervalMonths: null, notes: 'Kit de escovas: R$20-40. Limpe comutador com lixa 600. Rele de partida 50A: R$20-40.', priority: 'MEDIUM', order: baseO + 2 })
  }
  items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'CDI + cabo de vela (verificar se tem ECU ou CDI)', intervalKm: 50000, intervalMonths: null, notes: 'CDI: Profield R$50-90, troca preventiva. Se tem luz FI = ECU (mais confiavel). Cabo de vela: < 20 kOhm.', priority: 'HIGH', order: items.length + 1 })
  return items
}

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'CG 150 SPORT',                             yearFrom: 2005, yearTo: null, MACETES: SPORT_MACETES,         PROBLEMAS: SPORT_PROBLEMAS },
  { modelName: 'CG 150 TITAN-KS/ TITAN-JOB',              yearFrom: 2004, yearTo: null, MACETES: TITANKS_MACETES,       PROBLEMAS: TITANKS_PROBLEMAS },
  { modelName: 'CG 150 TITAN-ES',                          yearFrom: 2004, yearTo: null, MACETES: TITANES_MACETES,       PROBLEMAS: TITANES_PROBLEMAS },
  { modelName: 'CG 150 TITAN-ESD/ TITAN SPECIAL EDITION', yearFrom: 2004, yearTo: null, MACETES: TITANESD_MACETES,      PROBLEMAS: TITANESD_PROBLEMAS },
  { modelName: 'CG 150 TITAN-KS MIX',                     yearFrom: 2009, yearTo: null, MACETES: TITANKS_MIX_MACETES,   PROBLEMAS: TITANKS_MIX_PROBLEMAS },
  { modelName: 'CG 150 TITAN-ES MIX',                     yearFrom: 2009, yearTo: null, MACETES: TITANES_MIX_MACETES,   PROBLEMAS: TITANES_MIX_PROBLEMAS },
  { modelName: 'CG 150 TITAN-ESD MIX/FLEX',               yearFrom: 2009, yearTo: null, MACETES: TITANESDMIX_MACETES,   PROBLEMAS: TITANESDMIX_PROBLEMAS },
  { modelName: 'CG 150 TITAN-EX MIX/FLEX',                yearFrom: 2010, yearTo: null, MACETES: TITANEX_MACETES,       PROBLEMAS: TITANEX_PROBLEMAS },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeTitan('CG 150 SPORT',                             2005, null, false, true,  false, false),
  ...makeTitan('CG 150 TITAN-KS/ TITAN-JOB',              2004, null, false, false, false, false),
  ...makeTitan('CG 150 TITAN-ES',                          2004, null, true,  true,  false, false),
  ...makeTitan('CG 150 TITAN-ESD/ TITAN SPECIAL EDITION', 2004, null, true,  true,  true,  false),
  ...makeTitan('CG 150 TITAN-KS MIX',                     2009, null, false, false, false, true),
  ...makeTitan('CG 150 TITAN-ES MIX',                     2009, null, true,  true,  false, true),
  ...makeTitan('CG 150 TITAN-ESD MIX/FLEX',               2009, null, true,  true,  true,  true),
  ...makeTitan('CG 150 TITAN-EX MIX/FLEX',                2010, null, true,  true,  true,  true),
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
