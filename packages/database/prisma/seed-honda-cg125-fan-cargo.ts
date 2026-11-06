// seed-honda-cg125-fan-cargo.ts — Honda CG 125 FAN e CARGO
// CG 125 FAN / FAN KS / 125 i FAN (2787) · CG 125 FAN ES (4842) · CG 125 FAN ESD (6567)
// CG 125 CARGO/ CARGO KS/125i CARGO (2786) · CG 125 CARGO ES (4913) · CG 125 CARGO ESD (6875)
// Motor carburado: 124cc SOHC ar-cooled (2005-2012) | Motor injeção PGM-FI: 125i (2013+)
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

// ─── CG 125 FAN / FAN KS / 125i FAN — Macetes ────────────────────────────────

const FAN_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CG 125 FAN (2005-2018) — pneus migraram para aro 17"; versao 125i tem injecao PGM-FI a partir de 2013',
    body: 'A FAN trouxe visual renovado em 2005 e injecao PGM-FI em 2013 (versao 125i). Versoes carburadas (2005-2012): CDI, jato #78, vela C7HSA, choke manual. Versoes 125i (2013+): ECU, vela CPR7EA-9, IACV no lugar do choke, filtro de papel. Pneus migraram para aro 17" (70/90-17 F / 80/90-17 R) — nao intercambiaveis com os 18" dos modelos TITAN/TODAY.',
  },
  {
    severity: 'OK',
    title: 'Oleo 10W-30 JASO MA — 1,0 L com filtro; 3.000 km (carburada) ou 4.000 km (125i)',
    body: 'Todas as FAN usam 10W-30 JASO MA, ~1,0 L com filtro. Versoes 125i: maior compressao aceita intervalos ate 4.000 km. Versoes carburadas: 3.000 km. NUNCA use oleo sem JASO MA — embreagem molhada integrada ao carter exige esse aditivo especifico. Oleo de carro sem JASO MA destroe os discos de embreagem em semanas. Motul 3100 Gold 4T, Castrol Go! 4T ou Honda HP4.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de valvulas a cada 6.000 km — valida para carburadas E 125i; nao e automatica',
    body: 'O motor SOHC da FAN mantem folgas ajustaveis manualmente em TODAS as versoes (carb e 125i). Folgas com motor frio: admissao 0,05 mm / escape 0,08 mm. Na 125i, a injecao mascara sintomas de valvulas desreguladas — a moto "funciona" mas queima assentos progressivamente sem sintomas claros. Faca a regulagem mesmo sem sintomas a cada 6.000 km. Servico em oficina: R$60-100.',
  },
  {
    severity: 'OK',
    title: 'Vela: NGK CPR7EA-9 (125i) ou C7HSA (carburada) — confirme o motor antes de comprar',
    body: 'Versoes carburadas (2005-2012): NGK C7HSA, gap 0,6-0,7 mm, troca a cada 8.000 km. Versoes 125i (2013+): NGK CPR7EA-9 (iridium), NAO ajuste o gap — ja vem pre-definido. Usar a vela errada na 125i causa interferencia eletromagnetica no ECU. Como identificar: choke (alavanca no guidae) = carburada; botao com luz FI no painel = 125i.',
  },
  {
    severity: 'WARN',
    title: 'IACV da 125i (Idle Air Control Valve) — limpe anualmente; marcha lenta oscilante simula carburador entupido',
    body: 'A IACV substitui o choke manual nas versoes 125i. Apos anos de uso, acumula deposito e perde controle da marcha lenta. Sintoma: rotacao sobe/desce sozinha entre 800-2.500 rpm sem toque no acelerador. Limpeza: 2 parafusos, desmonte, spray EFI cleaner, ar comprimido. Nao use escovas metalicas no agulhao central. Codigo de diagnostico: DTC 29 = IACV com falha.',
  },
  {
    severity: 'OK',
    title: 'Luz FI acesa (125i) — leia codigo DLC antes de trocar qualquer peca; ECU raramente falha',
    body: 'Porta DLC sob o banco: conecte um jumper e leia os piscos da luz FI (metodo Honda SCS). Codigos frequentes: DTC 8 (MAP sensor), DTC 9 (IAT sensor), DTC 29 (IACV), DTC 54 (alternador/bateria). 90% dos casos resolvem com limpeza da IACV, verificacao do TPS ou carga da bateria. ECU raramente falha — nao substitua (R$400+) sem confirmar que TODOS os sensores estao OK.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — lubrifique a cada 500 km; kit DID 428VX + JT Sprockets JTF237 (14T) + JTR1134 (41T)',
    body: 'Corrente 428 em todas as versoes FAN. Versoes 125i (maior torque): kit dura 12.000-15.000 km. Versoes carburadas: 15.000-18.000 km. Nunca troque corrente sem trocar coroa e pinhao — desgaste cruzado destroe a nova corrente em 5.000 km. Lubrificacao: spray Motul ou Wurth a cada 500 km. Ajuste: 20-30 mm de folga vertical no meio da corrente.',
  },
  {
    severity: 'OK',
    title: 'Pneus 70/90-17 (F) e 80/90-17 (R) — aro 17" exclusivo da FAN; nao confunda com 18" dos modelos anteriores',
    body: 'Pneus 17" da FAN nao sao intercambiaveis com os 18" dos modelos TITAN/TODAY. Marcas nacionais: Rinaldi RA50 Sport, Maggion HF Turbo, Pirelli Citynet. Pressao: 29 PSI dianteiro / 33 PSI traseiro (solo) ou 36 PSI com garupa. Verifique o codigo DOT — pneus com mais de 5 anos devem ser trocados independente do sulco (borracha endurece e perde aderencia em piso molhado).',
  },
  {
    severity: 'WARN',
    title: 'CDI (versoes carburadas 2005-2012) — vulnerabilidade termica classica; versoes 125i usam ECU confiavel',
    body: 'FAN carburada (2005-2012): CDI com falha termica apos 50.000 km. Sintoma: para com motor quente, volta frio. CDI Profield ou Tech2000 nacionais (R$50-90) como reserva. FAN 125i (2013+): ECU muito mais confiavel — a luz FI e o unico aviso de problema. Distingua seu modelo antes de comprar pecas.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar — espuma (carburada, lave com diesel) ou papel (125i, sopre com ar comprimido; nunca molhe)',
    body: 'Versoes carburadas: filtro de espuma, lave a cada 3.000 km com diesel, seque, aplique filme fino de oleo motor. Versoes 125i: filtro de papel NAO pode ser lavado com liquido — sopre ar comprimido de dentro para fora a cada 6.000 km. Troca do filtro de papel: a cada 12.000-15.000 km. Filtro sujo na 125i: ECU compensa parcialmente mas eficiencia cai.',
  },
]

const FAN_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Marcha lenta instavel na 125i — IACV suja e a causa em 90% dos casos; limpe antes de qualquer outra intervencao',
    body: 'Marcha lenta oscilante na 125i: limpe a IACV com spray EFI cleaner (2 parafusos, desmonte, limpe o agulhao). Verifique mangueiras de admissao por fissuras (vazamento de ar causa mistura pobre). Leia codigo DLC. Na carburada: parafuso de mistura (2,5-3 voltas) e jato piloto. O sistema de diagnostico da 125i facilita o processo — use o recurso.',
  },
  {
    severity: 'WARN',
    title: 'Consumo acima de 35 km/L — valvulas e corrente sao os suspeitos primarios antes do carburador',
    body: 'FAN carburada deve fazer 38-45 km/L; FAN 125i ate 50 km/L. Consumo alto: (1) Valvulas desreguladas (mais impacto); (2) Filtro de ar sujo; (3) Corrente seca e mal tensionada (aumenta 10% do consumo); (4) Pneu traseiro com pressao baixa (15%). Faca esses 4 itens antes de mexer no carburador ou injetor.',
  },
  {
    severity: 'WARN',
    title: 'CDI com falha termica (carburadas) — parada com motor quente; 125i nao tem esse problema',
    body: 'FAN carburada: motor para com calor, volta apos 10-15 min esfriando = CDI. Teste por substituicao — unica forma de confirmar. CDI nacional Profield (R$50-90). FAN 125i: nao tem CDI, nao tem esse problema. Se tem FAN carburada acima de 50.000 km: troque o CDI preventivamente.',
  },
  {
    severity: 'WARN',
    title: 'Freio a tambor traseiro frouxo — ajuste a cada 3.000 km; lonas que nao freiam = troca imediata',
    body: 'Pedal com folga excessiva mesmo com ajuste no fim do curso = lonas gastas. Lonas Fras-le ou Honda original. Apos troca: 100-200 km de assentamento. Na FAN ESD com disco dianteiro + tambor traseiro: freio dianteiro e muito mais potente — use os dois freios equilibradamente em toda frenagem.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem patinando — troque para oleo JASO MA; resolve 90% dos casos sem abrir o motor',
    body: 'Embreagem que patina em aceleracao forte: primeiro troque o oleo para 10W-30 JASO MA certificado. Oleo de carro (sem JASO MA) destroi discos de embreagem. Se o problema persistir apos 500 km com oleo correto: discos gastos (reconstrucao R$200-400). Verifique tambem o ajuste do cabo de embreagem — folga incorreta (10-20 mm na alavanca) simula embreagem patinando.',
  },
  {
    severity: 'DANGER',
    title: 'Pneus de aro 17" com pressao baixa ou DOT vencido — risco de queda em curvas molhadas',
    body: 'Pneu 70/90-17 com 5 PSI abaixo do especificado comporta-se de forma imprevisivel em curvas. Pneus com codigo DOT acima de 5 anos tem borracha endurecida perigosa em piso molhado — independente do sulco aparente. Verifique pressao semanalmente (29/33 PSI). Pneus de marca desconhecida por R$30 sao inadequados para uso em velocidade — use Rinaldi, Maggion ou Pirelli.',
  },
  {
    severity: 'WARN',
    title: 'Pedal de cambio torto por queda — problema classico em FAN de delivery; troca simples e barata',
    body: 'Pedal de cambio dobrado por quedas repetidas exige posicao corporal incorreta para trocar marcha — fatigante e arriscado. Pedal novo: R$20-50. Endireite se o dano for pequeno (dobra de volta ainda quente). Ajuste do cabo de embreagem: 10-20 mm de folga na alavanca — cabo mal ajustado tambem prejudica a troca de marchas.',
  },
]

// ─── CG 125 FAN ES — Macetes ──────────────────────────────────────────────────

const FANES_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CG 125 FAN ES (2009-2015) — FAN com partida eletrica; bateria YTZ5S e motor de starter sao itens adicionais',
    body: 'A FAN ES adiciona bateria 12V 5Ah (YTZ5S), motor de partida eletrica e regulador/retificador ao sistema FAN base. Toda mecanica de motor, valvulas, carburador (ou injecao nas 125i de 2013+) e corrente e identica. Pedal KS permanece como emergencia. Versoes 2013-2015 com injecao (125i FAN ES): beneficios do ECU + conforto do starter eletrico.',
  },
  {
    severity: 'OK',
    title: 'Bateria YTZ5S — meca tensao de carga (13,8-14,8 V a 4.000 rpm) antes de instalar bateria nova',
    body: 'Tensao de carga correta com motor a 4.000 rpm: 13,8-14,8 V. Abaixo de 13 V = regulador ou estator com defeito. Acima de 15 V = regulador destroi bateria nova em semanas. Em FAN ES de delivery com 30-50 partidas/dia: cheque tensao mensalmente. Yuasa YTZ5S (R$220-280) ou Moura equivalente (R$150-180). Nunca instale bateria nova sem checar o regulador primeiro.',
  },
  {
    severity: 'WARN',
    title: 'Motor de starter — escovas desgastam apos 40.000-60.000 km em motos de delivery',
    body: 'Starter que gira progressivamente mais lento = escovas gastas. Kit de escovas para Honda CG 125 ES: R$20-40 nacional. Limpe o comutador com lixa 600 e verifique os mancais do rotor ao trocar. Em motos de delivery com uso intenso de starter (40+ partidas/dia): substitua preventivamente a cada 35.000-40.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Rele de partida (solenide) — clique sem girar indica rele queimado; R$20-40 resolve',
    body: 'Apertei o botao, ouvi clique mas o motor nao gira = rele queimado (ou cabos de potencia com alta resistencia). Rele universal 12V 50A: R$20-40 em qualquer autopecas. A FAN ES mantem pedal KS — use enquanto o rele chega. Teste: ponte direta nos terminais grossos do rele (cuidado com a faiscal) — se starter girar, rele queimado confirmado.',
  },
  {
    severity: 'OK',
    title: 'Regulador/retificador — tensao 13,8-14,8 V; Honda original preferivel em moto de trabalho',
    body: 'Tensao fora da faixa queima bateria (baixa tensao) ou estator (alta tensao). Regulador Honda original: R$80-150. Nacional: R$40-70. Em motos de delivery onde a partida eletrica e fundamental: prefira Honda original — confiabilidade superior aos equivalentes nacionais de qualidade variavel.',
  },
  {
    severity: 'WARN',
    title: 'CDI (2009-2012) vs ECU (2013-2015) — confirme o ano antes de diagnosticar',
    body: 'FAN ES 2009-2012 (carburada): CDI vulneravel a falha termica. Reserva Profield (R$50-90). FAN ES/125i 2013-2015: ECU confiavel, falhas indicadas pela luz FI. Em qualquer versao: quando o motor para e nao da faiscal, diagnostique IGNICAO antes de diagnosticar o sistema de partida eletrica.',
  },
]

const FANES_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Starter lento ou sem forca — bateria, escovas ou cabos; diagnostico em etapas simples',
    body: 'Starter lento: (1) Meca tensao da bateria (> 12,0 V repouso = OK); (2) Tensao OK mas starter lento = escovas gastas ou resistencia alta nos cabos de potencia; (3) Meca tensao diretamente nos terminais do starter com botao pressionado — queda > 0,5 V indica resistencia nos cabos. Limpe terminais com lixa + vaselina tecnica.',
  },
  {
    severity: 'WARN',
    title: 'Bateria descarregando rapidamente — drain eletrico ou regulador com defeito; diagnostique antes de comprar bateria nova',
    body: 'Bateria que drena em 1 noite: meca corrente de repouso (multimetro em serie na bateria desconectada) — acima de 20 mA = drain (alarme, rele preso, regulador defeituoso). Tensao de carga abaixo de 13,5 V = regulador nao carrega. Nunca instale bateria nova sem resolver a causa da descarga.',
  },
  {
    severity: 'WARN',
    title: 'Fusivel de partida queimando repetidamente — starter com curto interno ou cabo danificado',
    body: 'Fusivel de 15-20A que queima repetidamente: NAO substitua por amperagem maior. (1) Meca resistencia entre terminal positivo do starter e o carter — deve ser infinita; baixa resistencia = curto no bobinamento do starter; (2) Inspecione o cabo de potencia por isolamento rachado tocando o chassi. Starter com curto: rebobinagem R$80-150 ou troca.',
  },
  {
    severity: 'WARN',
    title: 'CDI com falha termica paralelo ao sistema ES — teste faiscal PRIMEIRO; nao drene a bateria tentando o starter',
    body: 'Motor nao pega nem no eletrico nem no pedal KS: teste faiscal ANTES de tentar o starter repetidamente. Sem faiscal = CDI/bobina (nao sistema ES). Com faiscal = combustivel ou mecanica. Drenar a bateria em tentativas de starter quando o problema e ignicao e erro classico — mata a bateria e nao resolve nada.',
  },
  {
    severity: 'WARN',
    title: 'Regulador queimado — faróis muito brilhantes e bateria que sempre precisa de recarga sao sintomas',
    body: 'Regulador com defeito tipo campo aberto carrega em 16-17 V: faróis visivelmente mais brilhantes que o normal, bateria que "ferve" (liquido evaporando), troca frequente de bateria e faróis. Verifique tensao de carga ANTES de comprar qualquer bateria nova. Regulador Honda original (R$80-150) tem confiabilidade muito maior que os nacionais.',
  },
]

// ─── CG 125 FAN ESD — Macetes ─────────────────────────────────────────────────

const FANESD_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CG 125 FAN ESD (2014-2015) — FAN ES com freio dianteiro a disco; melhor frenagem da linha FAN carburada',
    body: 'A FAN ESD combina partida eletrica (ES) com freio dianteiro a disco (D) — versao mais completa da linha FAN carburada. Distancia de frenagem ~15-20% menor que tambor em piso molhado. Toda mecanica de motor e identica a FAN ES. Atencao adicional: pastilhas e fluido do sistema de disco dianteiro.',
  },
  {
    severity: 'OK',
    title: 'Freio a disco dianteiro — pastilhas EBC FA142HH; fluido DOT 4 obrigatorio a cada 24 meses',
    body: 'Pinca simples com 1 pistao. Pastilhas: EBC FA142HH ou Ferodo FDB para Honda 125. Fluido DOT 4: troca a cada 24 meses — fluido higroscopico (absorve agua) perde ponto de ebulicao e causa "freio mole" em uso intenso. Disco: verifique espessura minima gravada (tipicamente 2,5-3,0 mm). Piston da pinca: enferrujado = pastilha desgasta desigual e disco aquece sem frenagem intensa.',
  },
  {
    severity: 'WARN',
    title: 'Pinca de freio com pistao preso — pastilha desgasta de um lado so e disco aquece sem frenagem',
    body: 'Pistao que nao retrai apos a frenagem causa aquecimento constante do disco. Sintoma: disco quente apos poucos km sem frenagens intensas. Limpeza: kit de rebuild da pinca (vedacoes + pistao limpol), R$30-60 em pecas. Pistao severamente enferrujado: troque a pinca completa (recondicionada R$60-150). Mova a alavanca de freio varias vezes antes de rodar em motos que ficaram paradas.',
  },
  {
    severity: 'OK',
    title: 'Freio combinado disco + tambor — disco e mais potente; use os dois freios simultaneamente',
    body: 'Disco dianteiro e significativamente mais potente que o tambor traseiro na FAN ESD. Em frenagem de emergencia: aplique os dois freios simultaneamente — somente o dianteiro pode causar tombamento da frente. A FAN ESD e mais segura que versoes com tambor duplo mas exige tecnica de frenagem equilibrada.',
  },
  {
    severity: 'OK',
    title: 'Sistema ES identico a FAN ES; CDI da versao 2014-2015 carburada ainda presente — nao e 125i',
    body: 'A FAN ESD 2014-2015 e carburada — tem CDI vulneravel a falha termica, nao ECU. Mantenha CDI reserva nacional (R$50-90). Bateria YTZ5S, tensao de carga 13,8-14,8 V, escovas do starter a cada 50.000-70.000 km, rele universal 50A — tudo identico a FAN ES.',
  },
]

const FANESD_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Freio dianteiro mole — fluido DOT 4 contaminado por umidade; troca imediata antes de qualquer uso em velocidade',
    body: 'Alavanca que vai fundo ou resposta inconsistente = fluido com ponto de ebulicao baixo (absorveu umidade). Vapor lock em descidas longas: o fluido vaporiza dentro da pinca e a alavanca vai ao fundo sem freiar. Troca completa do sistema: sangria total com fluido DOT 4 novo (R$30-50 em material). NUNCA misture DOT 3 e DOT 4.',
  },
  {
    severity: 'WARN',
    title: 'Disco empenado — pulsacao na alavanca proporcional a velocidade; troca e a solucao definitiva',
    body: 'Disco empenado: pulsacao na alavanca que aumenta com a velocidade. Diagnostico: cavalete, gire a roda, observe o disco proximo a pastilha estatica — oscilacao lateral > 0,3 mm confirma. Disco empenado raramente retorna ao plano — retifica e cara e raramente disponivel. Disco de reposicao: R$80-150 nacional ou R$180-300 Honda original.',
  },
  {
    severity: 'WARN',
    title: 'Disco que range em frenagem suave — oxidacao superficial ou contaminacao; nao e sempre pastilha gasta',
    body: 'Rangido em frenagem suave mas freio eficaz forte: (1) Oxidacao superficial apos moto parada — some em algumas frenagens; (2) Contaminacao de oleo ou graxa — limpe disco e pastilha com alcool isopropilico; (3) Areia entre pastilha e disco. Rangido persistente com freio ineficaz: pastilha abaixo do limite ou disco com ranhuras profundas.',
  },
  {
    severity: 'WARN',
    title: 'Starter com defeito + pastilha no limite — dois problemas coexistindo; faca revisao completa periodicamente',
    body: 'Em FAN ESD de uso intenso, starter defeituoso e pastilha gasta podem coexistir. Faca revisao completa (sistema ES + freio disco) juntos a cada 12.000 km — mais eficiente que tratar sistemas separados conforme falham. Revisao completa de FAN ESD: R$150-250 em oficina.',
  },
]

// ─── CG 125 CARGO / CARGO KS / 125i CARGO — Macetes ─────────────────────────

const CARGO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CG 125 CARGO (1990-2018) — versao comercial com bagageiro traseiro reforcado; limite de carga de 30 kg',
    body: 'A CARGO e a versao utilitaria com bagageiro traseiro de carga, suspensao traseira reforçada e parabarro robusto. O motor 124cc SOHC e o mesmo de toda a familia — valvulas, carburador, corrente e sistema eletrico sao identicos. Versoes KS: pedal de arranque. Versao 125i CARGO a partir de 2013: injecao PGM-FI. Limite de carga traseira: ~30 kg — respeite.',
  },
  {
    severity: 'DANGER',
    title: 'Sobrecarga — carga acima de 30 kg destroi suspensao, sobreaquece o motor e aumenta distancia de frenagem',
    body: 'Motoboys que carregam caixas termicas + carga extra frequentemente excedem o limite de 30 kg. Consequencias: (1) Amortecedor traseiro colapsa progressivamente; (2) Pneu traseiro com pressao abaixo do minimo de seguranca; (3) Motor forcado em subidas — temperatura acima do projeto; (4) Distancia de frenagem 30-50% maior. Sobrecarga nao e apenas problema de durabilidade — e risco de vida real.',
  },
  {
    severity: 'OK',
    title: 'Amortecedor traseiro — inspecione mensalmente; mola progressiva da CARGO suporta carga mas perde amortecimento',
    body: 'O amortecedor traseiro da CARGO tem mola mais rigida. Em uso com carga constante, perde o fluido interno e passa a ser "so mola" — sem amortecimento, cada irregularidade e transmitida direto ao piloto. Diagnostico: pressione a traseira e solte — deve subir suavemente uma vez. Se quica repetidamente ou demora a subir: amortecedor morto. Par de amortecedores nacionais para CG 125: R$80-200.',
  },
  {
    severity: 'OK',
    title: 'Oleo 10W-30 JASO MA — troca a cada 2.500 km em delivery com carga pesada; motor de trabalho degrada oleo mais rapido',
    body: 'Motor de CARGO sob carga constante opera em temperatura mais alta — oleo se degrada mais rapido. Reduza para 2.500 km em delivery pesado. Observe o oleo na troca: escuro mas limpo = normal; particulas metalicas brilhantes = desgaste interno acelerado por sobrecarga (sinal de alerta grave). Use Motul 3100 Gold 4T ou Honda HP4.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de valvulas a cada 5.000 km — motor quente de carga altera folgas mais rapido',
    body: 'Em CARGO sob carga constante: reduza regulagem de valvulas para 5.000 km. Motor quente com carga causa dilatacao diferente e as folgas se alteram mais rapido que em uso normal. Valvula de escape com folga zero (encostada no assento) queima o assento em poucos meses em motor de trabalho. Adm 0,05 mm / esc 0,08 mm com motor frio.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — lubrifique a cada 400 km (vs 500 km uso normal); kit completo a cada 12.000-14.000 km com carga',
    body: 'Corrente sob tensao de carga extra desgasta mais rapido. Em delivery com carga pesada: lubrifique a cada 400 km e ajuste mais frequentemente. Kit: a cada 12.000-14.000 km em uso de carga pesada. DID 428VX + JT Sprockets JTF237 (14T) + JTR1134 (41T). Corrente seca sob carga: desgasta pinhao e coroa em 6.000-8.000 km.',
  },
  {
    severity: 'OK',
    title: 'Pneus 2.75-18 (F) e 3.00-18 (R) — aro 18" em toda a linha CARGO; 36 PSI traseiro com carga',
    body: 'A CARGO usa pneus 18" em toda a producao (diferentes da FAN 17"). Com carga traseira: aumente o pneu traseiro para 36 PSI (vs 33 PSI sem carga). Pneu traseiro com pressao baixa sob carga = aquecimento excessivo por flexao do flanco e risco de separacao da banda de rodagem. Verifique pressao antes de cada turno de trabalho.',
  },
  {
    severity: 'WARN',
    title: 'Bagageiro traseiro — inspecao mensal das soldas de fixacao ao quadro; trinca que quebra em movimento e perigosa',
    body: 'O bagageiro suporta carga repetitiva e vibracao constante. Com sobrecarga, a solda de fixacao ao quadro pode trincar progressivamente. Bagageiro que solta em movimento derruba a carga sobre o pneu traseiro ou na via — acidente praticamente garantido. Inspecione mensalmente com lanterna os pontos de solda. Qualquer trinca: solda MIG imediata (R$50-100) antes de continuar o trabalho.',
  },
  {
    severity: 'WARN',
    title: 'CDI (carburadas) e ECU (125i CARGO) — CDI falha mais cedo em motor quente de trabalho; versoes 2013+ sao mais confiaveis',
    body: 'CARGO carburada de delivery em dia quente com motor no limite: CDI falha a partir de 35.000-40.000 km (vs 50.000+ em uso normal). Troque preventivamente. Versao 125i CARGO (2013+): ECU confiavel, luz FI indica problemas. CDI nacional Profield para Honda CG 125 (R$50-90). Mantenha sempre um CDI reserva na bolsa.',
  },
]

const CARGO_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Amortecedor traseiro morto com carga — risco de perda de controle em irregularidades e curvas',
    body: 'Amortecedor sem funcao de amortecimento (apenas mola) com carga traseira = "bola quicando" em irregularidades. Em alta velocidade ou curvas com carga: a traseira pode sair subitamente do controle sem aviso. Diagnostico: pressione e solte a traseira — deve subir suavemente uma vez. Amortecedor morto = troca imediata. NAO use com amortecedor morto e carga — e risco de vida.',
  },
  {
    severity: 'DANGER',
    title: 'Pneu traseiro com pressao baixa sob carga pesada — desgaste de flanco, aquecimento e risco de estouro',
    body: 'Pneu 3.00-18 traseiro com 25 PSI e 25 kg de carga = flanco colapsando. O flanco dobrado gera calor por flexao — em uso prolongado pode causar separacao da banda de rodagem. Pressao correta com carga: 36 PSI. Verifique ANTES de cada turno. Estouro de pneu traseiro em 60+ km/h com carga e um acidente garantido.',
  },
  {
    severity: 'WARN',
    title: 'Motor sem potencia em subidas com carga — valvulas e carburador sao a causa em 80% dos casos',
    body: 'CARGO que "perde folego" em subidas com carga: (1) Regule as valvulas (causa mais comum — R$60 em oficina); (2) Limpe o jato principal do carburador; (3) Ajuste a tensao da corrente; (4) Verifique pressao dos pneus. Motor bem regulado deve subir ladeiras moderadas com 25 kg de carga. NAO aceite "e assim mesmo" — e manutencao atrasada.',
  },
  {
    severity: 'WARN',
    title: 'Solda do bagageiro trincada — inspecao antes de cada uso com carga pesada',
    body: 'Bagageiro que solta em movimento derruba a carga sobre o pneu traseiro ou na via — acidente e multa por carga mal acondicionada (R$293+). Inspecione todos os pontos de solda com lanterna antes de colocar carga pesada. Trinca inicial: solde imediatamente. NAO espere a solda romper completamente antes de agir.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro ineficaz sob carga pesada — lona gasta ou ajuste no fim do curso; troca imediata',
    body: 'Pedal que vai ao fundo com pouco efeito: (1) Ajuste esgotado = lonas gastas (troque); (2) Lona oleada por retentor de eixo com vazamento (troque lonas + retentor). CARGO sob carga pesada com freio traseiro ruim: distancia de parada 2-3 vezes maior que o necessario. Lonas Fras-le para CG 125: R$30-50 o par.',
  },
  {
    severity: 'WARN',
    title: 'CDI com falha termica acelerada — motor quente de delivery em hora de pico; trocar preventivamente a cada 35.000 km',
    body: 'CARGO carburada de delivery em cidade quente com motor no limite: CDI falha mais cedo. Motoboy parado no meio do delivery por CDI = prejuizo real. Prevencao: troque o CDI preventivamente a cada 35.000-40.000 km (R$50-90) + 1 reserva na bolsa. Se possivel: migre para versao 125i CARGO — ECU elimina esse problema.',
  },
]

// ─── CG 125 CARGO ES — Macetes ────────────────────────────────────────────────

const CARGOES_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CG 125 CARGO ES (2009-2013) — CARGO com partida eletrica; conveniente para motoboys com maos ocupadas',
    body: 'A CARGO ES adiciona bateria YTZ5S, motor de starter e regulador a CARGO base. Toda mecanica de motor, carga e amortecimento e identica. Pedal KS permanece como emergencia. Versao exclusivamente carburada (nao existe 125i CARGO ES — o modelo era carburado ate 2013).',
  },
  {
    severity: 'OK',
    title: 'Bateria em moto de delivery — cheque tensao de carga a cada 3 meses (muitas partidas/dia desgastam ciclos)',
    body: 'A CARGO ES de delivery faz 30-60 partidas/dia — ciclos constantes de carga/descarga. Tensao de carga: 13,8-14,8 V a 4.000 rpm. Bateria que nao aguenta 6 meses: verifique regulador primeiro — nao compre bateria nova sem diagnosticar a causa. Yuasa YTZ5S tem maior vida util em uso intenso que marcas nacionais.',
  },
  {
    severity: 'WARN',
    title: 'Motor de partida com uso intenso — escovas desgastam em 30.000-40.000 km em delivery de alta frequencia',
    body: 'CARGO ES com 40+ partidas/dia: escovas do starter desgastam em 30.000-40.000 km. Sintoma: starter progressivamente mais lento. Troque preventivamente a cada 30.000 km em motos de trabalho intenso. Kit: R$20-40. Alternativa: use o pedal KS para a primeira partida do dia (motor frio) e o eletrico apenas nas paradas ao longo do dia.',
  },
  {
    severity: 'WARN',
    title: 'CDI de CARGO ES — motor quente de carga aumenta risco de falha termica; troca preventiva a cada 35.000 km',
    body: 'CARGO ES e carburada — tem CDI. Motor de carga quente = CDI com vida util menor. Troque preventivamente a cada 35.000 km em uso de delivery pesado. CDI Profield para Honda CG 125 (R$50-90). Um CDI reserva na caixa de ferramentas e o seguro mais barato para um motoboy.',
  },
  {
    severity: 'WARN',
    title: 'Sobrecarga + calor + muitas partidas — combinacao que acelera todas as falhas simultaneamente',
    body: 'CARGO ES sob sobrecarga em dia quente: motor sobreaquece (CDI falha mais rapido), bateria se degrada mais rapido em alta temperatura, corrente trabalha no limite extra. Respeite o limite de 30 kg de carga — cada kg extra e mais desgaste em todos os sistemas ao mesmo tempo.',
  },
]

const CARGOES_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Sobrecarga + amortecedor morto + bateria fraca — combinacao de falhas simultanas em delivery intenso',
    body: 'CARGO ES usada alem dos limites acumula falhas multiplas. Motor que para (CDI termico) com carga pesada e amortecedor morto em via movimentada e um risco grave. Solucao sistemica: (1) Nao exceda 30 kg de carga; (2) Mantenha amortecedor em bom estado (inspecao mensal); (3) Troque CDI preventivamente. Nao trate as falhas como independentes — elas coocorrem.',
  },
  {
    severity: 'WARN',
    title: 'Starter nao arranca com motor quente — bateria fraca, resistencia nos cabos ou CDI; diagnostique na ordem',
    body: 'Motor quente de CARGO ES com carga: starter precisa de mais corrente. Bateria com 70% da capacidade que arranca motor frio pode falhar com motor quente. Ordem de diagnostico: (1) meca tensao da bateria (>12,0 V); (2) teste faiscal para eliminar CDI; (3) verifique resistencia nos cabos de potencia. Use o pedal KS para confirmar se o problema e ignicao ou starter.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro frouxo sob carga — ajuste a cada 2.000 km; lonas desgastam 30-40% mais rapido com carga',
    body: 'Motoboy que freia 200+ vezes por turno com carga pesada: lonas duram 8.000-10.000 km vs 15.000 km em uso leve. Nao espere o pedal ir ao fundo — inspecione a folga do ajuste a cada 2.000 km e troque as lonas quando o ajuste estiver no limite. Lona gasta com carga pesada = distancia de frenagem perigosamente longa.',
  },
  {
    severity: 'WARN',
    title: 'Solda do bagageiro — inspeção com carga pesada e frequente uso; a CARGO ES de delivery sobrecarrega a solda',
    body: 'A CARGO ES de delivery intenso com carga maxima repetitiva sobrecarrega os pontos de solda do bagageiro mais rapido que uso leve. Inspecao mensal obrigatoria. Bagageiro que solta com o motor ligado e o piloto em movimento: acidente imediato. Solda preventiva a cada sinal de trinca (R$50-100).',
  },
]

// ─── CG 125 CARGO ESD — Macetes ───────────────────────────────────────────────

const CARGOESD_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CG 125 CARGO ESD (2014-2015) — CARGO ES com freio dianteiro a disco; melhor combinacao para trabalho pesado urbano',
    body: 'A CARGO ESD combina carga traseira + partida eletrica + freio dianteiro a disco. Melhor seguranca de frenagem da linha CARGO. Toda mecanica de motor e identica as demais CARGO. Adicione aos itens de manutencao: pastilhas EBC FA142HH e fluido DOT 4 a cada 24 meses (anualmente para uso de carga pesada).',
  },
  {
    severity: 'OK',
    title: 'Freio dianteiro a disco com carga — pastilhas desgastam 2x mais rapido em delivery pesado; inspecione a cada 5.000 km',
    body: 'Com 25-30 kg de carga e frenagem frequente em transito: pastilhas duram 5.000-6.000 km (vs 10.000-12.000 km em uso leve). Disco aquece mais sob carga pesada. Pastilhas EBC FA142HH. Fluido DOT 4: troca anual em uso de carga pesada (vs 24 meses em uso normal). Inspecione piston da pinca por enferrujamento a cada 5.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Limite de carga 30 kg nao muda com o disco — melhor frenagem nao compensara estrutura sobrecarregada',
    body: 'A melhor frenagem da ESD pode dar falsa sensacao de seguranca com sobrecarga. O limite de 30 kg continua valido: suspensao, quadro, pneu traseiro e motor tem os mesmos limites da CARGO base. O disco dianteiro nao compensa estrutura sobrecarregada — so muda a distancia de frenagem, nao a carga que o restante da moto suporta.',
  },
  {
    severity: 'OK',
    title: 'Sistema ES — bateria YTZ5S, starter, rele e regulador identicos a CARGO ES; revisao combinada com freio a cada 6.000 km',
    body: 'Combine a revisao do freio (pastilhas + fluido) com a verificacao do sistema ES (bateria, tensao de carga, escovas do starter) a cada 6.000 km. Revisao combinada e mais eficiente e garante que nenhum sistema critico seja negligenciado. A CARGO ESD 2014-2015 e carburada (tem CDI).',
  },
  {
    severity: 'WARN',
    title: 'CDI CARGO ESD 2014-2015 (carburada) — mesma vulnerabilidade da familia; troca preventiva a cada 35.000 km',
    body: 'A CARGO ESD e carburada — tem CDI, nao ECU. Motor de carga quente = CDI com vida util menor que em uso leve. Troca preventiva a cada 35.000 km em motos de delivery pesado. A pressao do uso diario com carga torna a falha do CDI no pior momento (meio do dia de trabalho) especialmente custosa.',
  },
]

const CARGOESD_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Sobrecarga com frenagem intensa — disco mais eficaz aumenta transferencia de peso dianteira; risco de capotamento',
    body: 'CARGO ESD com 40 kg de carga frenando com disco: a forca de frenagem dianteira com sobrecarga desloca o CG (centro de gravidade) rapidamente para frente, aumentando o risco de capotamento em frenagem de emergencia. Disco mais eficaz = transferencia de peso dianteira mais rapida = MAIOR risco com sobrecarga. Limite de 30 kg e de seguranca ativa, nao apenas de durabilidade.',
  },
  {
    severity: 'WARN',
    title: 'Pastilhas gastas em 5.000-6.000 km — desgaste acelerado com carga pesada; inspecione sempre antes do limite',
    body: 'Metal da pastilha tocando o disco: rangido metalico intenso + perda de frenagem + dano ao disco (R$80-300 para troca). Inspecione pastilhas a cada 4.000 km em motos de carga. Pastilha nova EBC FA142HH: R$40-80 o par. Com pastilha no limite e carga pesada: cada frenagem intensa e um risco.',
  },
  {
    severity: 'WARN',
    title: 'Fluido DOT 4 degradado em frenagens intensas com carga — troca anual em uso de carga pesada',
    body: 'Frenagens repetidas com carga pesada em descidas ou em transito intenso: fluido DOT 4 com mais de 12 meses de uso em condicao de carga pode vaporizar. A CARGO ESD em delivery com declives ou stop-and-go intenso: troque o fluido anualmente. DOT 4 de qualidade: Motul, Castrol RBF 600 ou ATE.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro morto com disco dianteiro bom — desequilibrio de frenagem perigoso com carga',
    body: 'CARGO ESD com amortecedor traseiro morto e disco dianteiro eficaz: em frenagem forte, toda a desaceleracao vai para o dianteiro enquanto a traseira "bola" livremente com a carga. Resultado: instabilidade severa. Mantenha amortecedor e freio sincronizados na manutencao — o disco so e seguro com suspensao adequada.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'CG 125 FAN / FAN KS / 125 i FAN',
    yearFrom: 2005, yearTo: null,
    tireSize: '70/90-17 (F) · 80/90-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Aro 17" — diferente dos modelos TITAN/TODAY (aro 18"). Rinaldi RA50 Sport, Maggion HF Turbo ou Pirelli Citynet. Verifique pressao semanalmente.',
  },
  {
    modelName: 'CG 125 FAN ES',
    yearFrom: 2009, yearTo: null,
    tireSize: '70/90-17 (F) · 80/90-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Mesmas especificacoes da FAN base. DOT acima de 5 anos = troca imediata independente do sulco aparente.',
  },
  {
    modelName: 'CG 125 FAN ESD',
    yearFrom: 2014, yearTo: null,
    tireSize: '70/90-17 (F) · 80/90-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Com disco dianteiro: pressao correta e critica para frenagem equilibrada. Pneu dianteiro com pressao baixa reduz eficiencia do disco.',
  },
  {
    modelName: 'CG 125 CARGO/ CARGO KS/125i CARGO',
    yearFrom: 1990, yearTo: null,
    tireSize: '2.75-18 (F) · 3.00-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'CARGO usa aro 18" em toda a producao. Com carga traseira: aumente traseiro para 36 PSI. Verifique ANTES de cada turno de trabalho.',
  },
  {
    modelName: 'CG 125 CARGO ES',
    yearFrom: 2009, yearTo: null,
    tireSize: '2.75-18 (F) · 3.00-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Pneu traseiro com pressao baixa sob carga = aquecimento excessivo e risco de separacao da banda. Verifique diariamente em moto de delivery.',
  },
  {
    modelName: 'CG 125 CARGO ESD',
    yearFrom: 2014, yearTo: null,
    tireSize: '2.75-18 (F) · 3.00-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Com disco dianteiro e carga traseira: pressao dianteira correta e especialmente critica. Pneu mole + carga + disco = risco de tombamento em frenagem forte.',
  },
]

// ─── Manutencao ───────────────────────────────────────────────────────────────

const makeFan = (
  m: string, yf: number, yt: number, hasES: boolean, hasDisc: boolean
): MaintenanceItemInput[] => {
  const items: MaintenanceItemInput[] = [
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor (10W-30 JASO MA) + filtro', intervalKm: 3000, intervalMonths: 6, notes: '~1,0 L com filtro. 125i aceita 4.000 km. Em delivery: 2.500 km. Motul 3100 Gold 4T ou Honda HP4.', priority: 'CRITICAL', order: 1 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de valvulas (adm 0,05 mm / esc 0,08 mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Valida para carburadas E 125i — nao e automatica. Motor frio. R$60-100 em oficina.', priority: 'CRITICAL', order: 2 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela de ignicao (C7HSA carb ou CPR7EA-9 125i)', intervalKm: 8000, intervalMonths: 24, notes: 'Carburada: gap 0,6-0,7 mm. 125i: iridium, NAO ajuste o gap.', priority: 'HIGH', order: 3 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (espuma carb ou papel 125i)', intervalKm: 3000, intervalMonths: 6, notes: 'Espuma: lave com diesel, seque, aplique filme de oleo. Papel (125i): sopre ar comprimido, NUNCA molhe.', priority: 'HIGH', order: 4 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lubrificacao da corrente de transmissao (428)', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente. Ajuste: 20-30 mm de folga vertical. Kit completo: 12.000-15.000 km.', priority: 'MEDIUM', order: 5 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do carburador Keihin ou IACV (125i)', intervalKm: 12000, intervalMonths: 12, notes: 'Carburada: jato principal #78, parafuso de mistura 2,5-3 voltas. 125i: limpe a IACV com EFI cleaner.', priority: 'HIGH', order: 6 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Ajuste do freio traseiro (tambor)', intervalKm: 3000, intervalMonths: 6, notes: 'Pedal: 20-30 mm de folga. Lonas gastas: rangido metalico em frenagem. Fras-le ou Honda original.', priority: 'HIGH', order: 7 },
  ]
  if (hasDisc) items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas e fluido DOT 4 (disco dianteiro)', intervalKm: 10000, intervalMonths: 24, notes: 'EBC FA142HH ou Ferodo FDB. Fluido DOT 4: 24 meses. Inspecione piston da pinca por enferrujamento.', priority: 'HIGH', order: 8 })
  if (hasES) {
    const base = hasDisc ? 9 : 8
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria (YTZ5S 12V 5Ah)', intervalKm: null, intervalMonths: 18, notes: 'Verifique tensao de carga (13,8-14,8 V a 4.000 rpm) antes de instalar bateria nova. Yuasa YTZ5S R$220-280.', priority: 'HIGH', order: base })
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulador/retificador + estator', intervalKm: null, intervalMonths: 12, notes: 'Tensao de carga: 13,8-14,8 V. Regulador Honda original: R$80-150. Nacional: R$40-70.', priority: 'HIGH', order: base + 1 })
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Motor de partida (escovas + comutador)', intervalKm: 50000, intervalMonths: null, notes: 'Em delivery intenso: 35.000-40.000 km. Kit de escovas R$20-40. Limpe comutador com lixa 600.', priority: 'MEDIUM', order: base + 2 })
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'CDI + cabo de vela (versoes carburadas)', intervalKm: null, intervalMonths: 24, notes: 'CDI carburado: troque preventivamente acima de 50.000 km. 125i tem ECU (mais confiavel). Cabo: < 20 kOhm.', priority: 'HIGH', order: base + 3 })
  } else {
    const base = hasDisc ? 9 : 8
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'CDI + cabo de vela + bobina', intervalKm: null, intervalMonths: 24, notes: 'CDI: troque preventivamente acima de 50.000 km. Cabo de vela: < 20 kOhm. Bobina: prim 0,4-0,5 Ohm, sec 10-14 kOhm.', priority: 'HIGH', order: base })
  }
  return items
}

const makeCargo = (
  m: string, yf: number, yt: number, hasES: boolean, hasDisc: boolean
): MaintenanceItemInput[] => {
  const items: MaintenanceItemInput[] = [
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor (10W-30 JASO MA) + filtro', intervalKm: 2500, intervalMonths: 6, notes: '~1,0 L com filtro. Em delivery com carga pesada: 2.500 km — motor opera mais quente.', priority: 'CRITICAL', order: 1 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de valvulas (adm 0,05 mm / esc 0,08 mm)', intervalKm: 5000, intervalMonths: 12, notes: 'Em moto de carga: 5.000 km — motor quente altera folgas mais rapido. Motor frio.', priority: 'CRITICAL', order: 2 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK C7HSA (gap 0,6-0,7 mm)', intervalKm: 8000, intervalMonths: 24, notes: 'Motor de trabalho: inspecione a cada 6.000 km.', priority: 'HIGH', order: 3 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (espuma) — limpeza com diesel', intervalKm: 3000, intervalMonths: 6, notes: 'Em delivery com poeira: a cada 2.000 km.', priority: 'HIGH', order: 4 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lubrificacao da corrente de transmissao (428)', intervalKm: 400, intervalMonths: null, notes: 'Com carga pesada: a cada 400 km (vs 500 km uso normal). Kit: a cada 12.000-14.000 km.', priority: 'MEDIUM', order: 5 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza e regulagem do carburador Keihin', intervalKm: 10000, intervalMonths: 12, notes: 'Motor quente de delivery entope jatos mais rapido. Jato principal #78.', priority: 'HIGH', order: 6 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Ajuste do freio traseiro (tambor)', intervalKm: 2000, intervalMonths: null, notes: 'Com carga pesada: a cada 2.000 km. Lonas desgastam 30-40% mais rapido com carga.', priority: 'HIGH', order: 7 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Amortecedor traseiro — inspecao e substituicao', intervalKm: null, intervalMonths: 12, notes: 'Pressione traseira e solte — deve subir suavemente uma vez. Morto com carga = risco de controle. Par: R$80-200.', priority: 'HIGH', order: 8 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspecao das soldas do bagageiro traseiro', intervalKm: null, intervalMonths: 1, notes: 'MENSAL. Qualquer trinca na solda de fixacao ao quadro: solde imediatamente. Bagageiro que solta = acidente.', priority: 'HIGH', order: 9 },
  ]
  if (hasDisc) items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas e fluido DOT 4 (disco dianteiro)', intervalKm: 5000, intervalMonths: 12, notes: 'Com carga pesada: pastilhas duram 5.000-6.000 km. EBC FA142HH. Fluido: anualmente em uso de carga.', priority: 'HIGH', order: 10 })
  if (hasES) {
    const base = hasDisc ? 11 : 10
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria (YTZ5S 12V 5Ah)', intervalKm: null, intervalMonths: 12, notes: 'Em delivery com muitas partidas/dia: verifique tensao de carga a cada 3 meses. Yuasa YTZ5S.', priority: 'HIGH', order: base })
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Motor de partida (escovas) — uso intenso em delivery', intervalKm: 30000, intervalMonths: null, notes: 'Com 40+ partidas/dia: substitua escovas a cada 30.000 km preventivamente. Kit R$20-40.', priority: 'MEDIUM', order: base + 1 })
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'CDI + cabo de vela — substituicao preventiva em moto de carga quente', intervalKm: 35000, intervalMonths: null, notes: 'Motor quente de delivery: CDI falha entre 35.000-40.000 km. Profield: R$50-90. Mantenha 1 reserva.', priority: 'HIGH', order: base + 2 })
  } else {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'CDI + cabo de vela — substituicao preventiva', intervalKm: 35000, intervalMonths: null, notes: 'Motor quente de carga: CDI falha mais cedo. Profield R$50-90. 1 reserva na bolsa.', priority: 'HIGH', order: hasDisc ? 11 : 10 })
  }
  return items
}

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'CG 125 FAN / FAN KS / 125 i FAN', yearFrom: 2005, yearTo: null, MACETES: FAN_MACETES,      PROBLEMAS: FAN_PROBLEMAS },
  { modelName: 'CG 125 FAN ES',                    yearFrom: 2009, yearTo: null, MACETES: FANES_MACETES,   PROBLEMAS: FANES_PROBLEMAS },
  { modelName: 'CG 125 FAN ESD',                   yearFrom: 2014, yearTo: null, MACETES: FANESD_MACETES,  PROBLEMAS: FANESD_PROBLEMAS },
  { modelName: 'CG 125 CARGO/ CARGO KS/125i CARGO', yearFrom: 1990, yearTo: null, MACETES: CARGO_MACETES,  PROBLEMAS: CARGO_PROBLEMAS },
  { modelName: 'CG 125 CARGO ES',                  yearFrom: 2009, yearTo: null, MACETES: CARGOES_MACETES, PROBLEMAS: CARGOES_PROBLEMAS },
  { modelName: 'CG 125 CARGO ESD',                 yearFrom: 2014, yearTo: null, MACETES: CARGOESD_MACETES, PROBLEMAS: CARGOESD_PROBLEMAS },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeFan('CG 125 FAN / FAN KS / 125 i FAN', 2005, null, false, false),
  ...makeFan('CG 125 FAN ES',  2009, null, true,  false),
  ...makeFan('CG 125 FAN ESD', 2014, null, true,  true),
  ...makeCargo('CG 125 CARGO/ CARGO KS/125i CARGO', 1990, null, false, false),
  ...makeCargo('CG 125 CARGO ES',  2009, null, true,  false),
  ...makeCargo('CG 125 CARGO ESD', 2014, null, true,  true),
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
