// seed-honda-cg150-fan-start-cargo.ts — Honda CG 150 FAN / START / CARGO
// FAN ESi / 150 FAN ESi FLEX (2010-2013) · FAN ESDi / 150 FAN ESDi FLEX (2011-2015)
// CG 150 START FLEXONE (2015-2016) · CG 150 CARGO ESD FLEX (2013-2015)
// FAN ESi/ESDi: PGM-FI injection, vela CPR7EA-9 | START/CARGO: carburado flex, CPR6EA-9 gap 0,9 mm
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

// ─── CG 150 FAN ESi / 150 FAN ESi FLEX (2010-2013) ───────────────────────────

const FANESI_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'FAN ESi (2010-2013) — PGM-FI injection; sem CDI, sem choke manual; IACV faz o papel do choke',
    body: 'A FAN ESi foi a primeira CG 150 com injecao PGM-FI. Sem CDI — tem ECU. Sem choke manual — a IACV (Idle Air Control Valve) controla a marcha lenta. Sem luz de cheque na gasolina — ha luz FI no painel para falhas. Manutencao do carburador substituida pela limpeza da IACV e verificacao de sensores.',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK CPR7EA-9 (iridium) — NAO ajuste o gap; diferente da CG 150 carburada (CPR6EA-9)',
    body: 'A FAN ESi usa CPR7EA-9 com gap pre-definido de fabrica — qualquer ajuste destrói o eletrodo iridium. Nao use C7HSA nem CPR6EA-9 da versao carburada. Troca: 12.000-15.000 km (iridium dura mais). Vela com eletrodo desgastado na ESi: consumo sobe e a ECU pode registrar DTC de mistura.',
  },
  {
    severity: 'WARN',
    title: 'IACV suja — marcha lenta oscilante (800-2.500 rpm) em 90% dos casos; limpe antes de qualquer outra intervencao',
    body: 'A IACV substitui o choke manual. Deposito de oleo + carbono bloqueia o agulhao e perde controle da marcha lenta. Limpeza: 2 parafusos, desmonte, spray EFI cleaner, ar comprimido no agulhao. NAO use escovas metalicas. Intervalo: anualmente ou se marcha lenta oscilar. DTC 29 = IACV com falha confirmada.',
  },
  {
    severity: 'OK',
    title: 'Luz FI acesa — leia o codigo DTC via SCS antes de trocar qualquer peca; ECU raramente falha',
    body: 'Conector SCS sob o banco. Bridge com clip de cabelo ou jumper: ligue a chave e conte os piscos da luz FI. Codigos frequentes: DTC 8 (MAP sensor), DTC 9 (IAT sensor), DTC 29 (IACV), DTC 54 (alternador/bateria). 90% dos casos resolvem com limpeza da IACV, verificacao do TPS ou recarga da bateria. Nao compre ECU sem esgotar os sensores.',
  },
  {
    severity: 'OK',
    title: 'Pneus 17" (70/90-17 F / 80/90-17 R) — FAN usa aro 17", diferente do TITAN (aro 18")',
    body: 'FAN ESi usa pneus 17" — nao intercambiaveis com os 18" dos modelos TITAN/CARGO. Rinaldi RA50 Sport, Maggion HF Turbo ou Pirelli Citynet para aro 17". Pressao: 29 PSI dianteiro / 33 PSI traseiro (solo) ou 36 PSI com garupa. DOT acima de 5 anos: troque mesmo com sulco aparente — borracha endurece.',
  },
  {
    severity: 'OK',
    title: 'Disco dianteiro + tambor traseiro — pastilhas EBC FA142HH; fluido DOT 4 a cada 24 meses',
    body: 'A ESi tem disco dianteiro e tambor traseiro. Pinca de 1 pistao. Pastilhas: EBC FA142HH ou Ferodo FDB. Fluido DOT 4: troca a cada 24 meses — higroscopico, perde eficiencia com umidade acumulada. Piston da pinca: verifique enferrujamento anualmente. Freio mole = ar no sistema ou fluido degradado.',
  },
  {
    severity: 'OK',
    title: 'Oleo 10W-30 JASO MA, 1,0 L — a injecao permite intervalo ate 4.000 km; JASO MA obrigatorio',
    body: 'Injecao melhora qualidade de combustao e reduz contaminacao do oleo. Intervalo 4.000 km valido. JASO MA obrigatorio — embreagem molhada integrada. Motul 3100 Gold 4T, Castrol Go! 4T ou Honda HP4. Observe partículas metalicas na troca — incomum em ESi bem mantida; se presentes, investigue.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de valvulas a cada 6.000 km — valida tambem para a ESi; injecao nao elimina essa manutencao',
    body: 'A injecao mascara sintomas de valvulas desreguladas — a moto funciona mas queima assentos progressivamente. Adm 0,05 mm / esc 0,08 mm, motor frio. NAO pule pelo fato de ter injecao. Faca a regulagem mesmo sem sintomas. Servico em oficina: R$60-100. ECU compensando mistura = valvula desregulada consumindo o motor silenciosamente.',
  },
  {
    severity: 'OK',
    title: 'Bateria YTZ5S — tensao de carga 13,8-14,8 V; ECU sensivel a tensao — bateria fraca gera DTC falsos',
    body: 'A ECU precisa de tensao estavel para funcionar corretamente. Bateria com < 11,5 V: ECU pode registrar DTC de sensores que estao funcionando bem (tensao baixa simula leitura errada de sensor). Antes de diagnosticar qualquer DTC, carregue a bateria completamente e verifique a tensao de carga (13,8-14,8 V a 4.000 rpm).',
  },
]

const FANESI_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Marcha lenta oscilante — IACV suja em 90% dos casos; limpe com EFI cleaner antes de qualquer diagnostico mais profundo',
    body: 'Rotacao que sobe/desce entre 800-2.500 rpm sem toque no acelerador: limpe a IACV. Se persistir apos limpeza: (1) vazamento de ar nas mangueiras de admissao (fissuras); (2) TPS descalibrado; (3) leia DTC. Nao substitua peca sem ler os codigos primeiro — DTC 29 confirma IACV, outros codigos apontam causas diferentes.',
  },
  {
    severity: 'WARN',
    title: 'Consumo acima de 40 km/L — valvulas e IACV sao causas primarias na ESi; carburador nao existe',
    body: 'FAN ESi deve fazer 45-52 km/L com gasolina, 35-40 km/L com etanol. Consumo alto: (1) regule as valvulas (principal causa); (2) limpe a IACV; (3) verifique TPS (throttle position sensor); (4) inspecione filtro de ar. A ECU compensa parcialmente mas nao substitui manutencao mecanica.',
  },
  {
    severity: 'WARN',
    title: 'Partida difícil a frio com etanol — bateria fraca e IACV suja colaboram; nao exija demais do starter',
    body: 'FAN ESi com etanol puro abaixo de 15C: IACV precisa funcionar perfeitamente para enriquecer a mistura no frio. IACV suja + bateria com 70% = falha na partida a frio. Carregue a bateria na vespera. Limpe a IACV. Adicione 20% de gasolina ao tanque em dias frios. Cranking longo sem partir: vela ou sensor.',
  },
  {
    severity: 'WARN',
    title: 'Piston da pinca dianteira preso — disco aquece apos poucos km; rebuild simples resolve',
    body: 'Disco dianteiro quente apos 5 km sem frenagem intensa = piston preso. Rebuild da pinca: vedacoes + pistao limpo (R$30-60 em pecas). Pistao severamente enferrujado: troque a pinca recondicionada (R$60-150). Limpe com alcool isopropilico — nunca liquido de freio nos componentes externos. Move o piston mensalmente.',
  },
  {
    severity: 'WARN',
    title: 'DTC 54 (alternador/bateria) frequente — verifique regulador e tensao antes de assumir ECU com defeito',
    body: 'DTC 54 na FAN ESi indica tensao de carga fora da faixa detectada pela ECU. Verificacao: multimetro nos terminais da bateria com motor a 4.000 rpm. 13,8-14,8 V = sistema OK (DTC falso por bateria fraca no teste). Fora da faixa: regulador/retificador com defeito. ECU raramente causa DTC 54 — verifique o sistema de carga primeiro.',
  },
]

// ─── CG 150 FAN ESDi / 150 FAN ESDi FLEX (2011-2015) ────────────────────────

const FANESDI_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'FAN ESDi (2011-2015) — FAN ESi com disco traseiro adicional; tudo da ESi + manutencao do disco traseiro',
    body: 'A FAN ESDi e a ESi com disco traseiro. Toda a logica de injecao PGM-FI, IACV, DTC, ECU e identica. A diferenca esta nos freios: duas pincas, dois sistemas de fluido, dois conjuntos de pastilhas. Producao mais longa (2011-2015) — pecas amplamente disponiveis. Disco traseiro adiciona complexidade mas melhora frenagem 20-25%.',
  },
  {
    severity: 'WARN',
    title: 'Pinca traseira da ESDi — pistao enferruja mais rapido que dianteiro; inspecao mensal obrigatoria',
    body: 'Disco traseiro em motocicleta tem protecao inferior contra agua e lama. Pistao travado = pastilha desgasta de um lado + disco aquece constantemente. Inspecao: disco traseiro quente apos 5 km sem freagem intensa = pistao preso. Rebuild: R$30-60 em pecas. Troca preventiva das vedacoes a cada 20.000 km.',
  },
  {
    severity: 'OK',
    title: 'Fluido DOT 4 em dois circuitos — troca a cada 24 meses nos dois; nao negligencie o circuito traseiro',
    body: 'Fluido traseiro tambem higroscopico — degrada no mesmo ritmo do dianteiro. Troque os dois ao mesmo tempo a cada 24 meses. Sangria completa: ~150 mL por circuito. DOT 4 preferivel ao DOT 3 (maior ponto de ebulicao). NUNCA misture DOT 3 e DOT 4. Freio traseiro mole e mais perigoso que dianteiro mole em curvas.',
  },
  {
    severity: 'WARN',
    title: 'Vela CPR7EA-9 iridium — NAO ajuste o gap; troca a 12.000-15.000 km; identica a FAN ESi',
    body: 'Mesma vela da ESi. Gap iridium e pre-definido — ajuste destrói o eletrodo. ECU da ESDi usa a leitura de pressao de combustao para calibrar injecao — vela com desgaste registra DTC de mistura antes de falhar completamente. Troca proativa: 12.000-15.000 km sem esperar sintomas.',
  },
  {
    severity: 'OK',
    title: 'IACV e DTC — identico a FAN ESi; limpeza anual previne 90% dos problemas de marcha lenta',
    body: 'IACV, SCS connector, diagnostico DTC: tudo identico a FAN ESi. Mesmos codigos. DTC 29 = IACV. DTC 8 = MAP. DTC 9 = IAT. DTC 54 = sistema de carga. Limpeza IACV anual: spray EFI cleaner, desmonte, ar comprimido no agulhao. Nao substitua peca sem confirmar DTC correspondente.',
  },
  {
    severity: 'OK',
    title: 'Pastilhas traseiras — desgastam mais rapido que dianteiras; EBC FA174 ou equivalente; inspecao a cada 5.000 km',
    body: 'Pastilha traseira da ESDi: inspecione a cada 5.000 km (vs 6.000 km do dianteiro). Disco menor, mais pressao relativa por area. Metal na pastilha tocando disco = dano imediato ao disco (R$60-150 extra). EBC FA174 para o traseiro da ESDi. Troca preventiva a cada 8.000 km em uso normal.',
  },
]

const FANESDI_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Fluido DOT 4 velho nos dois circuitos — vapor lock em descida longa; troca bianual e obrigatoria',
    body: 'ESDi com dois circuitos de fluido antigos: ponto de ebulicao reduzido nos dois. Em descida longa frenando repetidamente: vaporizacao do fluido, alavanca/pedal vai ao fundo sem frear. Com dois circuitos comprometidos: risco dobrado. Em uso de alta demanda (serras, delivery em morros): troque o fluido anualmente.',
  },
  {
    severity: 'WARN',
    title: 'Disco traseiro empenado — pulsacao no pedal; mais comum que o dianteiro por maior variacao termica',
    body: 'Disco traseiro da ESDi: menor area de resfriamento + exposicao a respingos = maior variacao termica = maior risco de empenamento. Pulsacao no pedal de freio proporcional a velocidade = disco empenado. Diagnostico no cavalete: oscilacao lateral > 0,3 mm confirma. Disco: R$60-100 nacional, R$150-200 Honda original.',
  },
  {
    severity: 'WARN',
    title: 'IACV suja + pinca traseira travada — os dois problemas mais comuns em ESDi de alta quilometragem',
    body: 'ESDi acima de 50.000 km: chance alta de marcha lenta oscilante (IACV) + disco traseiro aquecendo (pinca travada). Resolva os dois juntos: limpeza da IACV (R$50 em oficina) + rebuild da pinca traseira (R$80-150 em pecas). Total: R$200-300. Mais economico que 2 visitas separadas.',
  },
  {
    severity: 'WARN',
    title: 'Bateria fraca gerando DTC falsos — carregue e teste tensao de carga antes de qualquer diagnostico de sensor',
    body: 'ECU sensivel a tensao: bateria com < 11,5 V pode registrar DTC de MAP, IAT ou TPS que estao funcionando normalmente. Ordem correta: (1) carregue a bateria; (2) verifique tensao de carga (13,8-14,8 V); (3) zere os DTCs; (4) rode 10 km; (5) releia DTCs. DTCs que nao retornam = eram causados pela bateria fraca.',
  },
]

// ─── CG 150 START FLEXONE (2015-2016) ────────────────────────────────────────

const START_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CG 150 START FLEXONE (2015-2016) — versao de entrada da CG 150; motor flex carburado, sem electric start',
    body: 'A START e a versao basica da CG 150 de 2015-2016: carburador flex, kickstart (sem partida eletrica), freios a tambor (ou disco dianteiro em algumas versoes). Motor identico ao TITAN-KS MIX mas mais recente. "FLEXONE" e a nomenclatura Honda para flex fuel de ultima geracao desta serie. Pneus 17" como a FAN.',
  },
  {
    severity: 'WARN',
    title: 'Vela CPR6EA-9, gap 0,9 mm — START e carburada (NAO tem injecao); diferente da FAN ESi/ESDi',
    body: 'A START FLEXONE usa carburador — vela CPR6EA-9 com gap 0,9 mm (NAO a CPR7EA-9 iridium da injecao). Confirme o modelo antes de comprar vela. START carburada: CDI presente (mesmo vulneravel ao calor). Sem luz FI no painel — nao ha sistema de diagnostico como na FAN ESi.',
  },
  {
    severity: 'OK',
    title: 'Oleo 10W-30 JASO MA — troca a cada 3.000 km; motor START bem regulado deve fazer 40-46 km/L com gasolina',
    body: 'Motor basico mas eficiente quando bem mantido. 3.000 km com gasolina. Com etanol: motor exige mais combustivel (25-30% mais volume) — oleo pode se contaminar ligeiramente mais rapido. Valvulas desreguladas e a principal causa de consumo alto na START — manutencao regular e decisiva.',
  },
  {
    severity: 'WARN',
    title: 'Carburador flex — limpeza a cada 5.000-6.000 km; etanol deixa residuo em moto parada por semanas',
    body: 'Carburador da START similar ao dos modelos MIX anteriores. Com etanol: residuo branco no bojo em paradas > 30 dias. Drene o carb pela torneira antes de guardar. Jato principal: confirme o numero correto para seu ano no manual (pode ser #78 ou #80). Limpeza: R$50-80 em oficina especializada em CG 150.',
  },
  {
    severity: 'OK',
    title: 'Regulagem de valvulas a cada 6.000 km — START sem diagnostico eletronico; sintoma de problema so aparece tarde',
    body: 'A START nao tem ECU nem luz FI — sem alarme precoce para problemas mecanicos. Valvulas desreguladas na START: o proprietario so percebe quando a perda de potencia ja e severa. Adm 0,05 mm / esc 0,08 mm, motor frio. Faca a regulagem regularmente mesmo sem sintomas. R$60-100 em oficina.',
  },
  {
    severity: 'OK',
    title: 'Pneus 70/90-17 (F) e 80/90-17 (R) — mesmo aro 17" da FAN; nao intercambiaveis com TITAN (18")',
    body: 'START usa pneus 17" da familia FAN — compatíveis com FAN ESi/ESDi mas NAO com TITAN/CARGO (18"). Pressao: 29 PSI dianteiro / 33 PSI traseiro. Pneus nacionais Rinaldi ou Maggion atendem bem para uso urbano. DOT acima de 5 anos: troque independente do sulco.',
  },
]

const START_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'CDI com falha termica — START e carburada com CDI; troca preventiva acima de 50.000 km',
    body: 'Mesmo problema cronico de todos os CG 150 carburados. Para com quente, volta frio = CDI. A START de 2015-2016 pode ter CDI com 10+ anos de uso. Profield nacional R$50-90. A START nao tem partida eletrica — no CDI morto, o kickstart tampouco arranca porque nao ha faiscal. Sempre 1 reserva.',
  },
  {
    severity: 'WARN',
    title: 'Carburador entupido com etanol ressecado — borracha interna endurecida; kit rebuild R$80-150',
    body: 'START guardada com etanol no carb: deposito branco no jato + borracha endurecida. Carb cleaner em spray (deixe mergulhado 30 min) pode resolver o jato. Borracha interna endurecida: kit rebuild completo. NAO force choke/afogador se o jato estiver entupido — piora o problema. Mecanico de CG 150: R$80-120 de servico.',
  },
  {
    severity: 'WARN',
    title: 'Partida fria com etanol em clima frio — choke por 60-90 seg; misture gasolina se abaixo de 12C',
    body: 'START FLEXONE sem ECU depende so do choke manual para enriquecer em frio. Abaixo de 12C com E100: acione choke e espere motor aquecer (60-90 seg). Se nao pegar: adicione 3-5 L de gasolina ao tanque. O kickstart da START exige motor afinado para funcionar bem no frio — valvulas desreguladas pioram a partida.',
  },
  {
    severity: 'WARN',
    title: 'Freios a tambor — ajuste a cada 3.000 km; lona gasta rapidamente em uso urbano intenso',
    body: 'START com freios a tambor (drum/drum em versoes basicas ou disc dianteiro em versoes com disco). Lonas: Fras-le ou Honda original. Rangido metalico = troca imediata. Pedal traseiro no fim do curso = lonas gastas. Freio a tambor em chuva perde ate 40% da eficiencia — aumente distancia de seguranca.',
  },
]

// ─── CG 150 CARGO ESD FLEX (2013-2015) ───────────────────────────────────────

const CARGO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CG 150 CARGO ESD FLEX (2013-2015) — versao comercial com 150cc; disco/disco + partida eletrica + flex carburado',
    body: 'A CARGO ESD FLEX e a versao utilitaria com bagageiro reforcado, motor 149cc, carburador flex, disco dianteiro + disco traseiro e partida eletrica. NAO tem injecao (nome nao tem "i" minusculo) — carburador MIX/FLEX com CDI. Pneus 18" como todos os modelos CARGO. Limite de carga: ~30 kg no bagageiro.',
  },
  {
    severity: 'DANGER',
    title: 'Limite de carga 30 kg — CARGO 150 mais pesada que CARGO 125 mas limite e o mesmo; sobrecarga e risco de vida',
    body: 'A CARGO 150 pesa ~133 kg (vs ~123 kg da 150 TITAN). Com 40+ kg de carga: pneu traseiro colapsa o flanco, amortecedor morre rapidamente, distancia de frenagem aumenta 40-60% e o quadro sofre danos estruturais progressivos. O motor maior nao significa capacidade de carga maior — e o mesmo bagageiro e a mesma suspensao.',
  },
  {
    severity: 'OK',
    title: 'Carburador MIX/FLEX com CDI — manutencao identica ao TITAN-ESD MIX/FLEX; nao e injecao',
    body: 'CARGO ESD FLEX usa carburador especifico para flex fuel — mesmo sistema dos modelos TITAN MIX. CDI presente (vulneravel a falha termica). Vela CPR6EA-9, gap 0,9 mm (NAO a CPR7EA-9 da injecao). Limpeza do carburador: 6.000 km. Filtro de combustivel flex: 12.000 km. CDI reserva: Profield R$50-90.',
  },
  {
    severity: 'WARN',
    title: 'Pinca traseira — problema cronico amplificado pelo uso comercial com carga; inspecao quinzenal',
    body: 'A CARGO ESD FLEX usa pinca traseira identica a ESD — mesma vulnerabilidade ao enferrujamento. Em uso de delivery com agua, lama e variacao termica constante: pistao enferruja em 8.000-10.000 km sem protecao. Inspecao quinzenal: disco quente apos rodagem curta = pistao preso. Rebuild preventivo a cada 15.000 km.',
  },
  {
    severity: 'OK',
    title: 'Oleo 10W-30 JASO MA — troca a cada 2.500 km em delivery pesado; motor de trabalho degrada oleo mais rapido',
    body: 'Motor de 150cc sob carga opera mais quente — oleo se degrada em 2.500 km em uso de delivery pesado. Observe o oleo na troca: escuro mas limpo = normal. Partículas metalicas brilhantes = desgaste interno por sobrecarga — investigue antes de continuar. Honda HP4 ou Motul 3100 Gold.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro — inspecao mensal em moto de carga; morto com carga pesada e risco de perda de controle',
    body: 'Amortecedor traseiro CARGO 150: inspecao mensal (pressione e solte — deve subir suavemente uma vez). Morto = moto "bola" em irregularidades com carga. Em alta velocidade ou curvas com carga e amortecedor morto: perda de controle garantida. Par de amortecedores nacionais: R$100-250. Honda original: R$300-450.',
  },
  {
    severity: 'WARN',
    title: 'Solda do bagageiro — inspecao mensal; trinca por uso intenso quebra em movimento e derruba a carga',
    body: 'Bagageiro da CARGO ESD FLEX com carga repetitiva e carga pesada: solda de fixacao ao quadro pode trincar. Inspecao com lanterna a cada 2 semanas em uso de delivery. Qualquer trinca: solda MIG imediata (R$50-100). Bagageiro que solta com motor ligado: carga cai sobre pneu traseiro = acidente imediato.',
  },
  {
    severity: 'WARN',
    title: 'Fluido DOT 4 nos dois discos — troca anual em moto de delivery (alta demanda de frenagem)',
    body: 'CARGO ESD FLEX de delivery para 100-200 vezes por turno. Fluido DOT 4 com mais de 12 meses em uso de alta demanda: risco de vapor lock em descidas. Troque anualmente (vs 24 meses em uso normal). Total de fluido para os dois circuitos: ~300-400 mL. DOT 4 Motul ou Castrol RBF 600.',
  },
]

const CARGO_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Sobrecarga + amortecedor morto + pinca traseira travada — combinacao critica em CARGO de delivery intenso',
    body: 'CARGO ESD FLEX de delivery pesado acumula tres falhas simultaneas: sobrecarga dilata o amortecedor, amortecedor morto causa oscilacao traseira, pinca travada aquece o disco e reduz frenagem traseira. Cada falha sozinha ja e perigosa — as tres juntas em alta velocidade podem ser fatais. Manutencao preventiva sistematica e a unica protecao.',
  },
  {
    severity: 'DANGER',
    title: 'Pneu traseiro com pressao baixa sob carga pesada — flanco colapsando; risco de estouro em velocidade',
    body: 'Pneu 3.00-18 traseiro com 25 PSI e 30 kg de carga na CARGO 150: flanco dobrando a cada rotacao. Calor por flexao pode causar separacao da banda em uso prolongado. Com a CARGO 150 mais pesada que a 125: o risco e proporcionalmente maior. Verifique pressao ANTES de cada turno: 36 PSI com carga traseira.',
  },
  {
    severity: 'WARN',
    title: 'CDI com falha termica — CARGO 150 em delivery em cidade quente com carga: CDI falha mais cedo que em uso normal',
    body: 'Motor de trabalho em temperatura alta + CDI proximo ao motor + sol batendo = ciclo termico agressivo. CDI da CARGO ESD FLEX pode falhar entre 30.000-40.000 km em uso de delivery pesado. Troca preventiva a cada 35.000 km. CDI Profield nacional R$50-90. Sempre 1 reserva na caixa de ferramentas — uma parada no meio do dia de trabalho e prejuizo real.',
  },
  {
    severity: 'WARN',
    title: 'Pastilha traseira gasta + carga pesada — distancia de frenagem perigosamente longa',
    body: 'Pastilhas traseiras da CARGO ESD FLEX em delivery pesado: desgastam em 5.000-6.000 km. Metal tocando disco = dano ao disco. Com carga pesada e pastilha gasta: a frenagem traseira e quase inexistente. Consequencia: distancia de parada muito maior que o esperado em emergencias. Inspesione a cada 4.000 km em uso de carga.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento no carburador flex — vedacoes de borracha ressecadas por etanol; risco de incendio',
    body: 'CARGO ESD FLEX de 2013-2015 com 10+ anos: vedacoes do carburador flex podem estar ressecadas. Vazamento de combustivel (etanol queima com chama invisivel) proximo ao escapamento = risco de incendio. Inspecione o carburador visualmente a cada troca de oleo. Odor de combustivel com motor quente: pare, desligue, afaste.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  { modelName: 'CG 150 FAN ESi/ 150 FAN ESi FLEX',   yearFrom: 2010, yearTo: null, tireSize: '70/90-17 (F) · 80/90-17 (R)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Aro 17" — diferente do TITAN (18"). Rinaldi RA50 Sport ou Pirelli Citynet. DOT acima de 5 anos: troque mesmo com sulco.' },
  { modelName: 'CG 150 FAN ESDi/ 150 FAN ESDi FLEX', yearFrom: 2011, yearTo: null, tireSize: '70/90-17 (F) · 80/90-17 (R)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Com disco/disco: pressao incorreta compromete balanceamento de frenagem. Verifique os dois pneus semanalmente.' },
  { modelName: 'CG 150 START FLEXONE',                yearFrom: 2015, yearTo: null, tireSize: '70/90-17 (F) · 80/90-17 (R)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Pneu 17" como a FAN. Pressao baixa + carga = aquecimento do flanco. Verifique semanalmente.' },
  { modelName: 'CG 150 CARGO ESD FLEX',               yearFrom: 2013, yearTo: null, tireSize: '2.75-18 (F) · 3.00-18 (R)',  frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'CARGO usa aro 18" como todos os modelos CARGO. Com carga traseira: 36 PSI no traseiro. Verifique ANTES de cada turno.' },
]

// ─── Manutencao ───────────────────────────────────────────────────────────────

const makeFanEsi = (m: string, yf: number, yt: number, hasRearDisc: boolean): MaintenanceItemInput[] => {
  const items: MaintenanceItemInput[] = [
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor (10W-30 JASO MA) + filtro', intervalKm: 4000, intervalMonths: 6, notes: '~1,0 L com filtro. Injecao permite 4.000 km. JASO MA obrigatorio. Motul 3100 Gold ou Honda HP4.', priority: 'CRITICAL', order: 1 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de valvulas (adm 0,05 mm / esc 0,08 mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio. Injecao mascara sintomas — faca mesmo sem sintomas. R$60-100 em oficina.', priority: 'CRITICAL', order: 2 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CPR7EA-9 (iridium) — NAO ajuste o gap', intervalKm: 12000, intervalMonths: null, notes: 'Gap pre-definido. Diferente da CG 150 carburada (CPR6EA-9). Troca: 12.000-15.000 km.', priority: 'HIGH', order: 3 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — limpe e inspecione', intervalKm: 6000, intervalMonths: 12, notes: 'Filtro de papel: sopre ar comprimido de dentro para fora. NUNCA molhe. Troca: 15.000 km.', priority: 'HIGH', order: 4 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'IACV (Idle Air Control Valve) — limpeza', intervalKm: null, intervalMonths: 12, notes: 'EFI cleaner + ar comprimido. DTC 29 = IACV com falha. Marcha lenta oscilante = limpe primeiro.', priority: 'HIGH', order: 5 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lubrificacao da corrente de transmissao (428)', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente. Ajuste: 20-30 mm de folga. Kit completo: 15.000-18.000 km.', priority: 'MEDIUM', order: 6 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4', intervalKm: 10000, intervalMonths: 24, notes: 'EBC FA142HH. Fluido DOT 4: 24 meses. Piston da pinca: verifique enferrujamento.', priority: 'HIGH', order: 7 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Ajuste do freio traseiro (tambor)', intervalKm: hasRearDisc ? null : 3000, intervalMonths: hasRearDisc ? null : 6, notes: hasRearDisc ? null : 'Pedal: 20-30 mm de folga. Lonas Fras-le ou Honda original.', priority: 'HIGH', order: 8 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria (YTZ5S 12V 5Ah)', intervalKm: null, intervalMonths: 18, notes: 'ECU sensivel a tensao — bateria fraca gera DTCs falsos. Tensao de carga: 13,8-14,8 V.', priority: 'HIGH', order: 9 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulador/retificador + estator', intervalKm: null, intervalMonths: 12, notes: 'Tensao de carga: 13,8-14,8 V a 4.000 rpm. Honda original R$80-150.', priority: 'HIGH', order: 10 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Motor de partida (escovas + comutador)', intervalKm: 50000, intervalMonths: null, notes: 'Kit de escovas: R$20-40. Rele de partida 50A: R$20-40.', priority: 'MEDIUM', order: 11 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Leitura de DTCs (SCS connector)', intervalKm: null, intervalMonths: 12, notes: 'Anualmente ou quando luz FI acender. Bridge SCS, conte piscos. ECU raramente falha — verifique sensores primeiro.', priority: 'MEDIUM', order: 12 },
  ]
  if (hasRearDisc) {
    items.splice(8, 1) // remove tambor placeholder
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas traseiras + fluido DOT 4 (disco traseiro)', intervalKm: 8000, intervalMonths: 24, notes: 'EBC FA174. Inspecao a cada 5.000 km. Rebuild da pinca traseira a cada 20.000 km.', priority: 'HIGH', order: 8 })
  }
  return items
}

const makeCargo150 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor (10W-30 JASO MA) + filtro', intervalKm: 2500, intervalMonths: 6, notes: 'Delivery pesado: 2.500 km — motor de carga opera mais quente. Observe particulas metalicas na troca.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de valvulas (adm 0,05 mm / esc 0,08 mm)', intervalKm: 5000, intervalMonths: 12, notes: 'Moto de carga: 5.000 km. Motor quente altera folgas mais rapido. Motor frio.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CPR6EA-9 (gap 0,9 mm)', intervalKm: 8000, intervalMonths: 24, notes: 'CARGO ESD FLEX e carburada — usa CPR6EA-9, NAO a CPR7EA-9 da injecao. Em delivery: inspecione a 6.000 km.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (espuma) — limpeza com diesel', intervalKm: 2500, intervalMonths: 6, notes: 'Delivery com poeira ou etanol: a cada 2.000 km. Seque e aplique filme de oleo.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do carburador MIX/FLEX', intervalKm: 6000, intervalMonths: 12, notes: 'Etanol deixa residuo. Drene o bojo antes de guardar. Inspecione vedacoes de borracha por ressecamento.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lubrificacao da corrente de transmissao (428)', intervalKm: 400, intervalMonths: null, notes: 'Carga extra: a cada 400 km. Kit completo: 12.000-14.000 km com carga pesada.', priority: 'MEDIUM', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4', intervalKm: 8000, intervalMonths: 12, notes: 'Delivery pesado: pastilhas duram menos. EBC FA142HH. Fluido: anualmente em uso de carga.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas traseiras + fluido DOT 4 (disco traseiro)', intervalKm: 6000, intervalMonths: 12, notes: 'Desgastam mais rapido com carga. EBC FA174 ou equivalente. Rebuild pinca traseira: 15.000 km.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Amortecedor traseiro — inspecao e substituicao', intervalKm: null, intervalMonths: 12, notes: 'Mensal: pressione e solte — deve subir suavemente 1x. Morto com carga = risco de controle. Par: R$100-250.', priority: 'HIGH', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspecao das soldas do bagageiro traseiro', intervalKm: null, intervalMonths: 1, notes: 'MENSAL. Trinca na solda: solde imediatamente. Bagageiro solto em movimento = acidente imediato.', priority: 'HIGH', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria (YTZ5S 12V 5Ah)', intervalKm: null, intervalMonths: 12, notes: 'Delivery com muitas partidas: verifique tensao de carga trimestalmente. Yuasa YTZ5S.', priority: 'HIGH', order: 11 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'CDI + cabo de vela — troca preventiva em moto de carga', intervalKm: 35000, intervalMonths: null, notes: 'Motor quente de carga: CDI falha entre 30.000-40.000 km. Profield R$50-90. 1 reserva na bolsa.', priority: 'HIGH', order: 12 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de combustivel (sistema flex)', intervalKm: 10000, intervalMonths: null, notes: 'Etanol mais corrosivo para o filtro. Honda original: R$30-50.', priority: 'MEDIUM', order: 13 },
]

const makeStart = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor (10W-30 JASO MA) + filtro', intervalKm: 3000, intervalMonths: 6, notes: '~1,0 L com filtro. JASO MA obrigatorio. Castrol Go! 4T ou Honda HP4.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de valvulas (adm 0,05 mm / esc 0,08 mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Sem ECU/luz FI — sem alarme de problema. Faca regularmente mesmo sem sintomas. R$60-100.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CPR6EA-9 (gap 0,9 mm)', intervalKm: 8000, intervalMonths: 24, notes: 'START e carburada — usa CPR6EA-9 (NAO a CPR7EA-9 da injecao).', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (espuma ou papel — confirme modelo)', intervalKm: 3000, intervalMonths: 6, notes: 'Espuma: lave com diesel, seque, aplique oleo. Com etanol: a cada 2.500 km.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do carburador flex (FLEXONE)', intervalKm: 5000, intervalMonths: 12, notes: 'Drene o bojo antes de guardar. Etanol ressecado entope jato. R$50-80 de limpeza em oficina.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lubrificacao da corrente de transmissao (428)', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente. Kit completo: 15.000-18.000 km.', priority: 'MEDIUM', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Ajuste dos freios (tambor dianteiro e traseiro)', intervalKm: 3000, intervalMonths: 6, notes: 'Folga alavanca/pedal: 20-30 mm. Rangido metalico = troca de lona imediata.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'CDI + cabo de vela', intervalKm: 50000, intervalMonths: null, notes: 'Profield R$50-90. Troca preventiva. START sem partida eletrica: CDI morto = moto nao parte.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de combustivel (flex)', intervalKm: 12000, intervalMonths: null, notes: 'Honda original: R$30-50.', priority: 'MEDIUM', order: 9 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'CG 150 FAN ESi/ 150 FAN ESi FLEX',   yearFrom: 2010, yearTo: null, MACETES: FANESI_MACETES,   PROBLEMAS: FANESI_PROBLEMAS },
  { modelName: 'CG 150 FAN ESDi/ 150 FAN ESDi FLEX', yearFrom: 2011, yearTo: null, MACETES: FANESDI_MACETES,  PROBLEMAS: FANESDI_PROBLEMAS },
  { modelName: 'CG 150 START FLEXONE',                yearFrom: 2015, yearTo: null, MACETES: START_MACETES,    PROBLEMAS: START_PROBLEMAS },
  { modelName: 'CG 150 CARGO ESD FLEX',               yearFrom: 2013, yearTo: null, MACETES: CARGO_MACETES,    PROBLEMAS: CARGO_PROBLEMAS },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeFanEsi('CG 150 FAN ESi/ 150 FAN ESi FLEX',   2010, null, false),
  ...makeFanEsi('CG 150 FAN ESDi/ 150 FAN ESDi FLEX', 2011, null, true),
  ...makeStart( 'CG 150 START FLEXONE',                2015, null),
  ...makeCargo150('CG 150 CARGO ESD FLEX',             2013, null),
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
