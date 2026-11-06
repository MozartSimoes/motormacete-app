// seed-honda-cg160.ts — Honda CG 160 (todos os modelos FIPE)
// START (2016-2024) · FAN (2018-2024) · TITAN (2016-2024)
// TITAN S (2020-2021) · TITAN 25TH ANNIVERSARY (2019) · CARGO (2016-2024)
// Motor: 162,7cc SOHC PGM-FI FLEXONE | 5 velocidades | Vela: NGK CPR7EA-9 (gap pre-setado, NAO ajustar)
// Valvulas: adm 0,07 mm / esc 0,08 mm — DIFERENTE da CG 150 (adm 0,05 mm)
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

// ─── CG 160 START (2016-2024) ─────────────────────────────────────────────────

const START_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'PGM-FI a gasolina (NAO flex) — use gasolina E25-E27; alcool acima de 27% pode gerar DTC no mapa de injecao',
    body: 'O START usa PGM-FI simplificado sem sonda lambda de banda larga — nao calcula proporcao de alcool automaticamente como o FAN/TITAN FLEXONE. Mistura com mais alcool que E27 pode causar falha de mapa e DTC 8. Use gasolina comum ou aditivada. Economia: 38-44 km/L. Aditivada melhora limpeza dos injetores. NUNCA use diesel ou querosene — destroem bomba e injetor.',
  },
  {
    severity: 'WARN',
    title: 'Valvulas adm 0,07 mm / esc 0,08 mm — DIFERENTES da CG 150 (adm 0,05 mm); informe ao mecanico antes do servico',
    body: 'A maioria dos mecanicos conhece a CG 150 e pode regular com 0,05 mm na admissao da CG 160 — erro silencioso que acelera desgaste do assento de valvula. Motor frio, PMS de compressao. Exija confirmacao no manual do seu ano antes do servico. Intervalo: 6.000 km ou 12 meses. Folga zero na escapamento queima assento progressivamente sem sintoma visivel.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR7EA-9 — iridium pre-setada; vida util 15.000-20.000 km; NAO ajuste o gap sob risco de quebrar o eletrodo',
    body: 'Gap de fabrica em 0,9 mm — eletrodo de iridium e fragil. Diferente da CG 150 carburada (CPR6EA-9) e da CG 125 (C7HSA). Alternativa: Denso IU24 (mesmo range termico). Loja pode entregar C7HSA por engano — confira o codigo na embalagem. Troca: 15.000-20.000 km ou quando o ECU registrar DTC de mistura pobre.',
  },
  {
    severity: 'WARN',
    title: '2016-2021: tambor dianteiro + traseiro, sem CBS — 2022+: disco dianteiro + CBS adicionados; confirme seu ano antes da manutencao',
    body: 'O START original (2016-2021) tem tambor nos dois eixos e sem CBS. A partir de 2022, Honda incluiu disco dianteiro e CBS. Manutencao diferente por geracao: 2016-2021 = ajuste de lona dianteira a cada 3.000 km; 2022+ = inspecao de pastilha e fluido DOT 4. Mecânico que aplica manutencao de disco em moto com tambor (ou vice-versa) vai causar falha de freio.',
  },
  {
    severity: 'WARN',
    title: 'IACV (valvula de controle de marcha lenta) — moto morrendo em semaforo = IACV suja; limpeza antes de qualquer troca de peca',
    body: 'O IACV substitui o choke manual na injecao. Deposito de verniz de combustivel e oleo de blow-by entopem o agulhao. Sintoma: marcha lenta oscila entre 500 e 2.500 rpm ou moto apaga no semaforo. Limpeza: desacople o IACV (2 parafusos), spray EFI Cleaner, ar comprimido. NAO use escova metalica no agulhao. Servico: R$50-100. Compre IACV nova somente se limpeza nao resolver.',
  },
]

const START_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Luz de injecao piscando — leia o DTC via SCS antes de levar a oficina; 70% dos casos sao IAT (codigo 7) ou TPS (codigo 8)',
    body: 'Conector SCS (ou DLC em versoes mais recentes) geralmente sob o banco. Jumper na posicao, gire a chave, conte os piscos da luz FI: 1 pisco longo = 10, pisco curto = 1. Codigo 7 (sensor IAT de temperatura do ar): limpe com spray contato — R$15-30 de limpeza vs R$80-150 de troca. Codigo 8 (TPS): calibracao com scanner HIM — nao troque o TPS sem calibrar antes.',
  },
  {
    severity: 'WARN',
    title: 'Retentores da bengala dianteira vazando — aparece entre 20.000-35.000 km; mancha de oleo no pneu = risco imediato de queda',
    body: 'Oleo da bengala no pneu dianteiro: perda de tracao catastrofica em frenagem. Nao rode com vazamento ativo. Kit Honda PN 51490-KWN-900 (dois retentores + oleo): R$80-150. Troca sempre em par. Procedimento exige balancim para comprimir a mola — nao improvise. Apos troca: 1.000 km de amaciamento antes de freiar forte.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 428 esticando rapido — lubrificacao a cada 500 km; START em uso urbano intenso esgota kit em 12.000-13.000 km',
    body: 'START usada para entregas ou percursos curtos: partidas frequentes sobrecarregam o pinhao. Corrente seca amplia o desgaste. DID 428NZ (economica) ou DID 428VX (reforçada). Kit JT Sprockets: JTF237 14T pinhao + JTR1134 41T coroa. Ajuste de folga: 20-30 mm no trecho inferior central. NUNCA troque somente a corrente — pinhao e coroa gastos destroem a nova em 5.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustivel com chiado alto apos ligar a chave — barulho continuo = desgaste interno; vida util 40.000-60.000 km',
    body: 'Ao ligar a chave (sem dar a partida), a bomba pressuriza o sistema por 2-3 segundos — barulho leve e normal. Chiado continuo ou muito alto = desgaste interno. Substituicao: Honda original ou Bosch compativel para PGM-FI 12V / 2,5 bar. Nao misture gasolina velha ou contaminada com agua — destroi a bomba em semanas. Dica: evite andar com reservatorio abaixo de 1/4 — bomba sem combustivel superaquece.',
  },
]

// ─── CG 160 FAN (2018-2024) ───────────────────────────────────────────────────

const FAN_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'PGM-FI FLEXONE — sonda lambda calcula proporcao gasolina/etanol automaticamente; pode abastecer com qualquer mistura sem ajuste manual',
    body: 'O FLEXONE ajusta o mapa de injecao em tempo real via sonda lambda de banda larga. Pode usar E100 (alcool puro), E27 (gasolina comum) ou qualquer mistura — o motor adapta-se em 1-2 km. Consumo: 42-48 km/L com alcool, 38-44 km/L com gasolina (maior autonomia com gasolina pelo calor de combustao superior do etanol). NUNCA use diesel ou querosene — destroem a sonda lambda e o injetor.',
  },
  {
    severity: 'WARN',
    title: 'Valvulas adm 0,07 mm / esc 0,08 mm — 0,02 mm a mais na admissao vs CG 150 ESi; erro frequente em oficinas que so conhecem a 150',
    body: 'A FAN 160 usa o motor GLH162FMJ — folga de admissao aumentou para 0,07 mm vs 0,05 mm da CG 150. Mecanico experiente em CG 150 pode regular errado sem perceber. Exija o manual de servico especifico para a CG 160. Motor frio, PMS de compressao, 1 calco por valvula. Intervalo: 6.000 km. Folga zero na escapamento = queima assento sem sintoma visivel por meses.',
  },
  {
    severity: 'WARN',
    title: 'IACV — limpeza anual previne 90% das falhas de marcha lenta na FAN 160; DTC 29 = IACV com falha confirmada',
    body: 'IACV da FAN 160 e a mesma usada na CG 150 ESi/ESDi (pecas intercambiaveis em varias geracoes). Limpeza: 2 parafusos, desmonte, spray EFI Cleaner (nunca carb cleaner agressivo), ar comprimido no canal interno. DTC 29 = troca: R$150-300 (original) ou R$80-120 (nacional Gasgas/Placer). Limpeza preventiva anual: R$50-100 — custo de prevencao vs R$200+ de correcao.',
  },
  {
    severity: 'WARN',
    title: 'CBS na FAN 2022+ — pastilhas dianteiras desgastam 30-40% mais rapido; inspecao a cada 4.000 km',
    body: 'O CBS (Combined Brake System) aciona o pistao dianteiro ao pressionar o pedal traseiro. Pastilha dianteira trabalha tanto no freio de mao quanto no de pe. EBC FA142HH ou Honda original. Disco dianteiro: minimo 2,5 mm — abaixo disso troca obrigatoria. Fluido DOT 4: a cada 24 meses (higroscopico — perde ponto de ebulicao com umidade). Freio mole = ar no circuito ou fluido degradado.',
  },
  {
    severity: 'OK',
    title: 'Pneus 17" (70/90-17 F / 80/90-17 R) — FAN usa aro 17"; diferente do TITAN (18"); absolutamente nao intercambiaveis',
    body: 'FAN 160 usa 17" igual a FAN 150 — nao tente montar pneus 18" do TITAN. Marcas para 17": Pirelli Super City, Rinaldi RA50 Sport, Bridgestone BT39. Pressao: 29 PSI dianteiro / 33 PSI traseiro (solo) ou 29/36 com garupa. DOT acima de 5 anos: troque mesmo com sulco aparente — borracha endurece e perde aderencia em molhado independente do sulco.',
  },
]

const FAN_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Luz FI codigo 7 (sensor IAT de temperatura do ar) — causa mais comum de luz acesa na FAN 160; limpeza de conector antes de trocar',
    body: 'Sensor IAT mede temperatura do ar no coletor de admissao. Conector IAT acumula umidade e oxidacao nos terminais (corrosao verde). Limpe com spray de contato eletrico (WD-40 Contact ou Chemtronics). Se codigo persistir: sensor IAT R$80-150 (Honda) ou R$40-80 (nacional). Codigo 8 (TPS) exige calibracao com scanner HIM antes de trocar qualquer peca — TPS descalibrado gera DTC ciclico.',
  },
  {
    severity: 'WARN',
    title: 'IACV travada — R$150-300 de peca vs R$50-100 de limpeza; compre somente se limpeza nao resolver',
    body: 'IACV nova Honda original: R$200-350. Limpeza profunda em oficina especializada: R$60-100. Em 70% dos casos de marcha lenta irregular, a limpeza resolve permanentemente. Troque somente se DTC 29 persistir apos limpeza. Nacional: R$80-120 (Gasgas, Placer) — qualidade variavel, preferir Honda. Ao trocar: limpe o duto de admissao ao mesmo tempo (carbon acumulado agrava o problema).',
  },
  {
    severity: 'WARN',
    title: 'Bengala com vazamento de oleo — retentores desgastam entre 20.000-40.000 km; mancha de oleo no pneu dianteiro = perigo imediato',
    body: 'Oleo da bengala no pneu dianteiro: perda de tracao catastrofica em frenagem de emergencia. Nao rode com vazamento ativo. Retentores Honda ou Ariete compativel. Sempre troque o oleo da bengala (6-8 ml por lado de oleo SAE 10W-15) no mesmo servico dos retentores. Tubo interno da bengala com riscos ou amassados: troca do tubo — nao ha retifica economica para bengala de CG 160.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustivel ruidosa — chiado continuo ao pressurizar = desgaste interno; vida util media 50.000-60.000 km',
    body: 'FAN 160 com bomba fazendo chiado ao girar a chave sem dar a partida: normal por 2-3 segundos. Chiado continuo = desgaste interno. Sintoma associado: motor afoga em aceleracao brusca (queda de pressao). Bosch compativel: R$180-280. Honda original: R$300-450. Prevencao: evite reservatorio proximo do vazio — bomba trabalha mais quente sem combustivel resfriando o motor eletrico interno.',
  },
]

// ─── CG 160 TITAN (2016-2024) ─────────────────────────────────────────────────

const TITAN_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'TITAN 160 — top da familia CG 160; disco dianteiro + tambor traseiro + CBS + rodas 18" + liga leve; motor identico ao FAN',
    body: 'A diferenca pratica do TITAN vs FAN: pneus 18" (vs 17" do FAN), rodas de liga leve (vs aro de raiado), acabamento superior. Mesmo motor 162cc PGM-FI FLEXONE, mesma ECU, mesma bomba de combustivel. Pecas de motor sao intercambiaveis entre TITAN e FAN 160. Pneus 18" dao mais estabilidade em alta velocidade e suportam mais carga — por isso o CARGO tambem usa 18".',
  },
  {
    severity: 'WARN',
    title: 'Pneus 18" (2.75-18 F / 3.00-18 R) — balanceamento dinamico obrigatorio em toda troca; vibracao acima de 90 km/h = pneu desbalanceado ou aro empenado',
    body: 'Pneu 18" com desequilibrio de 10g causa vibracao perceptivel no guiador acima de 90 km/h. Balancete eletronico obrigatorio em toda troca — borracharia com balancadeira de moto, nao de carro. Marcas: Pirelli Super City 2.75-18/3.00-18, Bridgestone BT39, Goodyear Direction. Aro de liga leve sensivel a impacto — buraco em velocidade pode empenar sutilmente e so aparecer como vibracao acima de 80 km/h.',
  },
  {
    severity: 'WARN',
    title: 'Valvulas adm 0,07 mm / esc 0,08 mm — 0,02 mm a mais na admissao vs CG 150; mecanico sem o manual da 160 vai regular errado',
    body: 'Mecanico acostumado com CG 150 pode usar 0,05 mm na admissao da CG 160 — folga menor acelera desgaste do assento. Motor frio. PMS de compressao. Calcos de regulagem Honda ou Shim Kit universal (confirme espessura com micrometro). Intervalo: 6.000 km. Sintoma de valvula apertada: motor tossindo ao desacelerar ou consumo aumentado sem razao aparente.',
  },
  {
    severity: 'WARN',
    title: 'CBS no TITAN desde 2016 — pastilhas dianteiras desgastam 30-40% mais rapido que sem CBS; inspecao a cada 4.000 km',
    body: 'O CBS do TITAN distribui a forca de frenagem entre os dois eixos ao pressionar o pedal traseiro. Vantagem: frenagem mais estavel. Desvantagem: pastilhas dianteiras EBC FA142HH duram ~8.000-10.000 km no TITAN vs ~12.000-15.000 km em motos sem CBS. Fluido DOT 4: troca obrigatoria a cada 24 meses — higroscopico mesmo sem uso intenso do freio de mao.',
  },
  {
    severity: 'OK',
    title: 'PGM-FI FLEXONE — sonda lambda ajusta mistura automaticamente; economia 40-46 km/L (alcool) ou 38-42 km/L (gasolina)',
    body: 'Tanque de 13,5 L: com gasolina = 520-570 km de autonomia; com alcool = 540-600 km de autonomia mas custo por km depende do preco relativo. DTC 21 (sonda lambda): nao ignore — motor opera com mapa fixo que pode ser pobre com E100 e queimar pistao. Sonda lambda Denso compativel: R$150-250. Honda original: R$280-380.',
  },
  {
    severity: 'OK',
    title: 'Oleo 10W-30 JASO MA, 1,0 L com filtro — injecao permite intervalo de 4.000 km; JASO MA obrigatorio (embreagem molhada)',
    body: 'Motor de injecao tem combustao mais limpa — oleo contamina menos. Intervalo: 4.000 km (vs 3.000 km da versao carburada CG 150). JASO MA obrigatorio — embreagem molhada degrada com oleo automotivo comum. Motul 3100 Gold 4T, Castrol Go! 4T, Honda HP4 ou Repsol Moto 4T. Observe particulas metalicas na troca — incomum em motor bem mantido; se presentes, investigue coleta de amostra.',
  },
]

const TITAN_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Tambor traseiro + CBS — fluido DOT 4 do circuito dianteiro envelhece mesmo sem uso intenso do freio de mao',
    body: 'Na frenagem pelo pedal traseiro, o CBS aciona parte do circuito hidraulico dianteiro. O fluido DOT 4 nesse ramal sofre ciclos termicos sem ser "renovado" na troca habitual do motorista que "nao usa o freio dianteiro". Resultado: fluido degradado com ponto de ebulicao baixo. Troca obrigatoria a cada 24 meses. Purgue o sistema completamente com seringa ou equipamento de pressao negativa.',
  },
  {
    severity: 'WARN',
    title: 'DTC 21 (sonda lambda) — nao ignore; motor pode operar com mistura pobre com E100 e queimar pistao em uso prolongado',
    body: 'Sonda lambda e responsavel pelo ajuste fino da injecao no FLEXONE. Com falha, a ECU usa mapa fixo que pode ser pobre especialmente com alcool puro E100. Sintoma: moto com menos potencia, mais consumo ou engasgando em certos RPMs. Sonda lambda Denso compativel: R$150-250. Honda original: R$280-380. Nao postergue mais que 500 km com esse DTC ativo — mistura pobre em alta rotacao queima valvula de escape.',
  },
  {
    severity: 'WARN',
    title: 'Vibracao no guiador acima de 90 km/h — pneu 18" desbalanceado ou aro de liga leve empenado; buraco em velocidade e a causa mais comum',
    body: 'Aro de liga leve do TITAN 160 e mais leve que o aro raios da TITAN 150, mas mais sensivel a impactos. Buraco em velocidade media pode empenar o aro de forma sutil que so aparece como vibracao em alta velocidade. Aro levemente empenado: R$80-150 para endireitar (se possivel) ou R$300-600 novo. Nao ignore vibracao — pode indicar tambem rolamento de roda ou pneu com carcaca danificada.',
  },
  {
    severity: 'DANGER',
    title: 'DTC 29 (injetor) durante viagem — pare para inspecao; injetor travado aberto queima cilindro em alta rotacao',
    body: 'DTC 29 pode indicar injetor eletronicamente preso aberto (derramando combustivel em excesso) ou circuito aberto. Injetor aberto: mistura super rica, oleo diluido por combustivel, risco de hidrolock. Nao force o motor com esse DTC ativo. Injetor Honda original: R$300-500. Nacional compativel Bosch/Brosol: R$120-200. Limpeza de injetor por ultrassom (se parcialmente entupido): R$50-100 — tente antes da troca.',
  },
]

// ─── CG 160 TITAN S (2020-2021) ───────────────────────────────────────────────

const TITANS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'TITAN S — unica CG 160 com disco dianteiro + disco traseiro + CBS; dois circuitos hidraulicos independentes; producao 2020-2021 apenas',
    body: 'O combinador CBS do TITAN S distribui forca entre disco dianteiro e disco traseiro — mais precisao que tambor traseiro. Dois reservatorios de fluido DOT 4, duas pincas, dois conjuntos de pastilhas. Vantagem real em chuva e frenagem de emergencia. Custo de manutencao ~30% maior que TITAN padrao. Producao encerrada em 2021 — pecas originais ficam progressivamente mais escassas; antecipe o estoque.',
  },
  {
    severity: 'WARN',
    title: 'Fluido DOT 4 nos dois circuitos — troca a cada 24 meses; circuito traseiro sofre mais ciclos termicos com CBS ativo',
    body: 'Com CBS ativo, o circuito traseiro tambem aciona parte do circuito dianteiro — o fluido e submetido a mais ciclos termicos que em moto sem CBS. DOT 4 e higroscopico: absorve umidade do ar e reduz ponto de ebulicao (de 230 C para menos de 160 C em 2 anos). Troca: 24 meses maximos. Com uso esportivo ou delivery: 18 meses. Purgue ambos os circuitos completamente. Nao misture DOT 3 com DOT 4.',
  },
  {
    severity: 'WARN',
    title: 'Pinca traseira flutuante — pistao enferrujando com umidade; rebuild preventivo a cada 2 anos ou ao primeiro sinal de arrasto',
    body: 'A pinca traseira do TITAN S usa pistao flutuante exposto mais diretamente a agua e poeira que a pinca dianteira. Exposicao a chuva corroi o pistao em 2-3 anos de uso intenso. Sintoma: arrasto constante no freio traseiro (moto mais pesada de empurrar) ou aquecimento excessivo do disco. Kit rebuild com pistao + selos: R$80-150. Honda original ou Galfer compativel. Rebuild e muito mais economico que pinca nova (R$400-700).',
  },
  {
    severity: 'OK',
    title: 'Pastilhas traseiras duram mais que as dianteiras no TITAN S — CBS envia mais forca ao dianteiro; inspecione as duas ao mesmo tempo',
    body: 'Ao contrario do que parece: no TITAN S com CBS, a pastilha traseira desgasta menos que a dianteira porque o CBS amplifica a forca dianteira em frenagem pelo pedal traseiro. Pastilha dianteira: troca em ~8.000-10.000 km. Pastilha traseira: troca em ~12.000-15.000 km. Sempre verifique as duas no mesmo servico — economiza custo de mao de obra e garante que a moto nao saia com um par esquecido.',
  },
]

const TITANS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Pinca traseira travando — arrasto constante e disco traseiro aquecendo; rebuild antes de cogitar pinca nova',
    body: 'Pinca traseira presa e o problema mais comum do TITAN S com 20.000+ km. Causa: pistao engripado por ferrugem dentro do corpo da pinca. Rebuild: R$80-150 (kit Honda) vs pinca nova R$400-700. Em 80% dos casos, o rebuild resolve permanentemente. Sintoma precoce: freio traseiro "pegando" sozinho a frio nas primeiras pedaladas da manha. Nao ignore — disco gasta uniformemente e consumo de combustivel sobe sensivelmente.',
  },
  {
    severity: 'WARN',
    title: 'Luz CBS acendendo — sistema detectou assimetria de forca; scanner antes de qualquer intervencao mecanica',
    body: 'O CBS do TITAN S tem sensor de pressao que detecta falhas no combinador. Luz CBS acesa = sistema desabilitou o CBS e voce esta frenando sem combinacao. Causas frequentes: vazamento em um dos circuitos, pastilha muito gasta reduzindo pressao ou sensor defeituoso. Nao dirija longe sem inspecionar — especialmente em chuva onde o CBS faz diferenca real na estabilidade de frenagem.',
  },
  {
    severity: 'WARN',
    title: 'Pecas especificas do TITAN S escasseando — pinca traseira, disco traseiro e combinador CBS nao sao compartilhados com outras CG 160',
    body: 'TITAN S ficou apenas 2020-2021 (baixo volume). Pinca traseira original Honda: verifique disponibilidade antes de danificar. Alternativa: pinca aftermarket universal de 1 pistao 34 mm (confirme dimensionamento com o disco traseiro). Disco traseiro: Braking ou EBC compativel por dimensao. Combinador CBS: somente Honda original. Dica: compre um rebuild kit sobressalente enquanto ainda ha estoque.',
  },
]

// ─── CG 160 TITAN 25TH ANNIVERSARY (2019) ────────────────────────────────────

const TITAN25_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'TITAN 25TH ANNIVERSARY — identica ao TITAN 160 padrao 2019 mecanicamente; toda peca de reposicao do TITAN 2018-2020 serve',
    body: 'Edicao comemorativa 25 anos do nome "Titan": mesmo motor PGM-FI FLEXONE 162cc, mesmo CBS, mesma ECU, pinhao, coroa e corrente do TITAN padrao 2019. Nenhuma peca exclusiva no motor, chassi ou transmissao. So cosmetica: cor preta fosca + dourado na roda + logotipo 25TH. Qualquer mecanico de CG 160 pode manter. Risco de fraude: conferir se a moto realmente e original (cheque o numero de chassi na Honda).',
  },
  {
    severity: 'WARN',
    title: 'Pintura fosca — proibido polidor, encausto de carro e cera de carnauba; qualquer abrasivo cria brilho localizado irreversivel',
    body: 'A lacagem fosca nao tem camada brilhante sobre o pigmento — qualquer abrasivo cria brilho localizado e irreversivel. Produtos proibidos: limpador cremoso, polidor Simoniz, cera carnauba, silicone spray. Produtos seguros: sabao neutro liquido (pH 7), shampoo moto Meguiars, pano de microfibra seco. Arranhoes na pintura fosca: film de protecao (PPF fosco) cobre discretamente sem alterar o aspecto.',
  },
  {
    severity: 'WARN',
    title: 'Adesivos laterais da carena descascando — problema cronico em Honda CG 2015-2020 com adesivos expostos ao sol brasileiro por 3-5 anos',
    body: 'Adesivos "25th Anniversary" usam cola sensivel a calor prolongado. Sol direto resseca a cola em 3-5 anos. Preventivo: aplicar film transparente PPF por cima dos adesivos logo apos a compra. Corretivo: 3M VHB (fita de dupla face espessa) atras do adesivo levantado. Nao use cola de sapateiro — mancha o plastico. Adesivos novos avulsos Honda: R$80-150 o par lateral.',
  },
  {
    severity: 'OK',
    title: 'Display do painel com logotipo 25th — unico nesta versao; dano na tela LCD exige painel completo; proteja com capa de acrilico',
    body: 'O painel da 25TH tem logotipo comemorativo impresso na tela LCD. Dano no display (liquido vazando, tela escura) exige painel completo Honda — nao ha tela avulsa. Preco estimado: R$400-700. Capa protetora de acrilico + case TPU transparente protegem de pancadas laterais. Umidade: vedacao original pode deteriorar — aplique vedante de silicone transparente ao redor da borda do painel preventivamente.',
  },
]

const TITAN25_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'DTC 7 (sensor IAT) mais frequente em 25TH comprada em 2019 e pouco usada — moto parada oxida conectores mais rapido que em uso regular',
    body: 'Moto guardada por meses: conectores eletronicos oxidam mais rapido que em uso diario. Sensor IAT especialmente sensivel. Limpe todos os conectores com spray de contato ao recolocar moto em uso. Bateria fraca tambem gera DTCs falsos — verifique tensao de carga (13,8-14,5 V a 4.000 rpm) antes de diagnosticar qualquer codigo. DTC de bateria fraca imita sintomas de varios sensores.',
  },
  {
    severity: 'WARN',
    title: 'Rolamento da roda traseira com folga — uso baixo intermitente: graxa interna pode endurecer e anel externo oxidar levemente',
    body: 'Moto de colecao (uso baixo e intermitente): rolamentos que ficam parados tem graxa que endurece e anel externo que oxida levemente. Sintoma: zunido ou vibracao em 40-70 km/h. Rolamento traseiro SKF ou NSK: R$30-60 cada. Substituicao inclui troca do retentor. Preventivo: pelo menos 50 km de rodagem mensais para distribuir a graxa. A cada 3 anos ou 30.000 km: recarga de graxa nos rolamentos.',
  },
]

// ─── CG 160 CARGO (2016-2024) ─────────────────────────────────────────────────

const CARGO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CARGO 160 — sub-quadro traseiro reforçado para bau de entrega; motor PGM-FI FLEXONE identico ao TITAN; pneus 18" como o TITAN',
    body: 'A CARGO usa o mesmo motor 162cc FLEXONE do TITAN, com chassi diferente: sub-quadro traseiro adicional para suportar bau ou caixa de entrega. Capacidade de carga: respeite o limite do fabricante no manual — sub-quadro e projetado para carga especifica. Sobrepeso cronico acelera fadiga das soldas e desgasta amortecedor traseiro em metade do tempo esperado.',
  },
  {
    severity: 'DANGER',
    title: 'Calibragem com carga traseira — 36 PSI no pneu traseiro com bau cheio; subcalibrado + carga = flanco dobrando = risco de estouro em velocidade',
    body: 'CARGO carregada (piloto + bau 15 kg + pertences): pneu traseiro 3.00-18 com 33 PSI dobra o flanco a cada rotacao. Calor acumulado pode causar separacao de banda em viagens longas. Protocolo obrigatorio: ANTES de cada turno, calibre para 36 PSI no traseiro (vs 33 PSI sem carga). Calibre sempre com pneu frio — calibragem com pneu quente da leitura 2-3 PSI acima do real e voce vai calibrar abaixo do necessario.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 428 com carga — lubrificacao a cada 300-400 km em uso de delivery; DID 428VX obrigatoria com sobrepeso regular',
    body: 'Piloto 80 kg + bau 15 kg + pertences 5 kg = 100 kg de carga extra em moto com 5 marchas. Sobrepeso aumenta tensionamento da corrente e desgasta pinhao mais rapido. DID 428VX (corrente reforçada) recomendada vs corrente basica de fabrica. Kit completo: 12.000-13.000 km em delivery real (vs 15.000 km em uso normal). Ajuste de folga: 20-30 mm — verifique semanalmente com uso de carga.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro — original Honda insuficiente para uso comercial intenso; upgrade para YSS G-Plus ou Showa com mola de carga reforçada',
    body: 'O amortecedor original da CARGO e equivalente ao do TITAN — sem calibracao para carga constante. Em delivery real (8h/dia, 6 dias/semana, bau cheio), o original funde o oleo interno em 15.000-20.000 km. Sintoma: moto batendo fundo em lombadas que antes absorvia bem. YSS G-Plus com mola de carga: R$180-280 par. Showa ou Monroe reforçado: R$220-380. Custo que evita danos no sub-quadro e na espinha do piloto.',
  },
  {
    severity: 'WARN',
    title: 'Sub-quadro traseiro — inspecao mensal das soldas em uso comercial; trinca na solda = pare imediatamente; bau solto em velocidade = acidente',
    body: 'Sub-quadro soldado ao quadro principal em 4 pontos. Sobrepeso + ruas esburacadas criam micro-fadiga progressiva nas soldas. Inspecao mensal: limpe a area e procure trincas radiais no cordo de solda (linha escura fina no cordo). Trinca encontrada: solda TIG obrigatoria — nao use solda de arco basico que cria zona termicamente afetada fragil. Nao postpone: bau solto em curva ou frenagem = queda certa.',
  },
  {
    severity: 'OK',
    title: 'IACV da CARGO — mesma unidade do FAN/TITAN; limpeza a cada 8.000 km em delivery (ciclos termicos mais agressivos que em uso normal)',
    body: 'Motor de entrega opera em stop-and-go intenso: aquecimento e resfriamento repetitivos aceleram deposito de verniz no IACV. Reduza o intervalo de limpeza para 8.000 km vs 10.000 km do uso normal. Sintoma tipico em delivery: moto apagando em frenagens apos trecho de alta velocidade — a IACV nao compensa a transicao termica rapida entre acelerado e parado.',
  },
]

const CARGO_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Corrente arrebentando sob carga maxima — piloto pesado + bau cheio + subida = forca maxima; inspecao semanal e DID 428VX obrigatorios',
    body: 'Corrente basica nacional em CARGO com sobrepeso + subida ingreme: forca de tensao pode exceder a ruptura. DID 428VX (pinos tratados termicamente): R$80-120 a mais que a basica, suporta 30% mais carga de ruptura. Inspecao semanal: elos com movimento lateral travado = ponto de ruptura — troque imediatamente. Corrente arrebentada em velocidade pode danificar o motor, acionar o pneu traseiro de forma abrupta ou ferir o piloto.',
  },
  {
    severity: 'WARN',
    title: 'DTC 7 (sensor IAT) frequente na CARGO — chuva com motor quente corroi conector; vedacao preventiva com graxa dieletrica',
    body: 'CARGO de entrega exposta a chuva com motor quente: diferencial de temperatura corroi terminais do conector IAT em 1-2 anos. Apos limpar com spray contato, aplique graxa dieletrica (Dow Corning 4 ou similar) nos pinos do conector. Proteja com fita self-fusioning ou capa de borracha. Sensor IAT nacional: R$40-80 — nao compre o mais barato, variacoes na curva de resistencia geram DTC ciclico mesmo com sensor novo.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira batendo fundo com bau cheio — mola original nao dimensionada para carga; espacador de mola ou troca por mola progressiva',
    body: 'CARGO completamente carregada: bengala dianteira comprime demais em quebra-molas, reduzindo controle de direcao. Opcoes: (1) espacador de mola de PVC ou aluminio de 20-30 mm (R$30-60); (2) mola progressiva Tecnofibra ou Wilbers compativel (R$180-280 o par). Bengala batendo fundo regularmente = limitador metalico destruindo o interior do tubo progressivamente. Substitua a mola antes que o tubo danifique.',
  },
  {
    severity: 'WARN',
    title: 'Pastilhas dianteiras com vida util reduzida em delivery — CBS intenso + carga + stop-and-go = 6.000-8.000 km por jogo',
    body: 'CARGO em delivery urbano: o CBS acciona pastilha dianteira a cada parada. Com carga extra, a forca de frenagem necessaria e maior. EBC FA142HH: 6.000-8.000 km vs 10.000-12.000 km em uso normal. Budget anual para CARGO de delivery: 1-2 jogos de pastilha dianteira + fluido DOT 4 a cada 18 meses. Disco dianteiro: inspecao a cada 4.000 km — com esse ritmo, 2 anos ja aproximam do limite minimo de espessura.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  { modelName: 'CG 160 START',                  yearFrom: 2016, yearTo: null, tireSize: '70/90-17 (F) · 80/90-17 (R)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Aro 17" (2016-2021: tambor; 2022+: disco). Calibre com pneu frio. DOT acima de 5 anos: troque mesmo com sulco visivel — borracha endurece.' },
  { modelName: 'CG 160 FAN',                    yearFrom: 2018, yearTo: null, tireSize: '70/90-17 (F) · 80/90-17 (R)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Aro 17" — diferente do TITAN (18"). CBS: pressao incorreta compromete balanceamento de frenagem. Calibre sempre com pneu frio.' },
  { modelName: 'CG 160 TITAN',                  yearFrom: 2016, yearTo: null, tireSize: '2.75-18 (F) · 3.00-18 (R)',  frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Aro 18" de liga leve. Balanceamento dinamico obrigatorio em toda troca. Vibracao em alta velocidade = desbalanceamento ou aro empenado.' },
  { modelName: 'CG 160 TITAN S',                yearFrom: 2020, yearTo: null, tireSize: '2.75-18 (F) · 3.00-18 (R)',  frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Disco/disco + CBS: pressao correta nos dois eixos e critica para distribuicao de frenagem equilibrada. Verifique semanalmente.' },
  { modelName: 'CG 160 TITAN 25TH ANNIVERSARY', yearFrom: 2019, yearTo: null, tireSize: '2.75-18 (F) · 3.00-18 (R)',  frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Identica ao TITAN padrao 2019 em rodas e pressoes. Aro de liga leve — evite impactos — empenamento so aparece como vibracao em alta velocidade.' },
  { modelName: 'CG 160 CARGO',                  yearFrom: 2016, yearTo: null, tireSize: '2.75-18 (F) · 3.00-18 (R)',  frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Aro 18" igual ao TITAN. Com bau cheio: 36 PSI no traseiro obrigatorio. Verifique ANTES de cada turno — subcalibrado com carga = risco de estouro.' },
]

// ─── Manutencao ───────────────────────────────────────────────────────────────

const makeCG160 = (
  m: string, yf: number, yt: number,
  hasFrontDisc: boolean, hasRearDisc: boolean,
  isFlex: boolean, isCargo: boolean
): MaintenanceItemInput[] => {
  const items: MaintenanceItemInput[] = [
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor 10W-30 JASO MA + filtro', intervalKm: isCargo ? 2500 : 4000, intervalMonths: 6, notes: `~1,0 L com filtro. JASO MA obrigatorio — embreagem molhada. Castrol Go! 4T, Motul 3100 Gold ou Honda HP4. ${isCargo ? 'CARGO de delivery: reduza para 2.500 km.' : 'Injecao PGM-FI permite 4.000 km.'}`, priority: 'CRITICAL', order: 1 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de valvulas (adm 0,07 mm / esc 0,08 mm)', intervalKm: isCargo ? 5000 : 6000, intervalMonths: 12, notes: 'Motor frio. PMS de compressao. DIFERENTE da CG 150 (adm 0,05 mm). Folga zero na escapamento queima assento sem sintoma visivel.', priority: 'CRITICAL', order: 2 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CPR7EA-9 (gap pre-setado — NAO ajustar)', intervalKm: 15000, intervalMonths: 24, notes: 'Iridium. Diferente da CG 150 carburada (CPR6EA-9). Gap de fabrica em 0,9 mm — NAO ajuste o eletrodo de iridium. Alternativa: Denso IU24.', priority: 'HIGH', order: 3 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — limpeza e inspecao', intervalKm: isCargo ? 3000 : 4000, intervalMonths: 12, notes: 'Filtro de papel: sopre ar comprimido de dentro para fora. NUNCA molhe o filtro. Troca: 10.000-12.000 km. Filtro sujo empobrece mistura e aumenta consumo.', priority: 'HIGH', order: 4 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do IACV (Idle Air Control Valve)', intervalKm: isCargo ? 8000 : 10000, intervalMonths: 12, notes: 'Spray EFI Cleaner + ar comprimido. Marcha lenta oscilante ou moto apagando em semaforo = IACV suja. Servico: R$50-100. DTC 29 = IACV com falha confirmada.', priority: 'HIGH', order: 5 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428 — lubrificacao e verificacao de folga', intervalKm: isCargo ? 300 : 500, intervalMonths: null, notes: `Folga ideal: 20-30 mm no trecho inferior central. Corrente seca aumenta consumo em 10% e destroi pinhao/coroa. ${isCargo ? 'CARGO: lubrificacao a cada 300 km.' : ''}`, priority: 'MEDIUM', order: 6 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428 completo (corrente + coroa + pinhao)', intervalKm: isCargo ? 12000 : 15000, intervalMonths: null, notes: `DID 428VX + JT Sprockets (JTF237 14T pinhao + JTR1134 41T coroa). Nunca troque so a corrente — pinhao/coroa gastos destroem a nova em 5.000 km. ${isCargo ? 'CARGO: DID 428VX obrigatoria.' : ''}`, priority: 'HIGH', order: 7 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Scanner PGM-FI — leitura de DTCs (codigos de falha)', intervalKm: null, intervalMonths: 12, notes: 'Anualmente ou ao acender a luz FI. Codigos frequentes: 7 (IAT), 8 (TPS), 21 (lambda), 29 (injetor/IACV). Honda HIM, Innova 3110 ou MaxiDAS compativel.', priority: 'MEDIUM', order: 8 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTZ5S 12V 5Ah — tensao de carga e terminais', intervalKm: null, intervalMonths: 6, notes: 'Tensao em repouso: 12,6 V. Com motor a 5.000 rpm: 13,8-14,5 V. Abaixo de 12,0 V = substituicao. Bateria fraca gera DTCs falsos no ECU. Moura, Heliar ou Yuasa.', priority: 'MEDIUM', order: 9 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulador/retificador + estator (verificar tensao de carga)', intervalKm: null, intervalMonths: 12, notes: 'Tensao fora de 13,8-14,5 V destroi bateria ou gera DTCs falsos. Honda original: R$80-180. Troca preventiva: 40.000 km.', priority: 'HIGH', order: 10 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Motor de partida (escovas + comutador)', intervalKm: 50000, intervalMonths: null, notes: 'Kit de escovas: R$20-40. Limpe o comutador com lixa 600. Rele de partida 50A: R$20-40. Motor com "click" sem girar = rele ou escovas.',  priority: 'MEDIUM', order: 11 },
  ]

  if (hasFrontDisc) {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4', intervalKm: isCargo ? 6000 : 8000, intervalMonths: 24, notes: `CBS acelera desgaste dianteiro — inspecao a cada ${isCargo ? '4.000' : '4.000-5.000'} km. EBC FA142HH ou Honda original. Fluido DOT 4: 24 meses obrigatorio. Disco: minimo 2,5 mm.`, priority: 'HIGH', order: 12 })
  } else {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona dianteira + ajuste de cabo (tambor)', intervalKm: 8000, intervalMonths: null, notes: 'Folga na alavanca: 20-30 mm. Rangido metalico = lona gasta — troca imediata. Fras-le ou Honda original. Ajuste fino no tensor do cabo.', priority: 'HIGH', order: 12 })
  }

  if (hasRearDisc) {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas traseiras + fluido DOT 4 (disco traseiro)', intervalKm: 12000, intervalMonths: 24, notes: 'CBS distribui mais forca ao dianteiro — pastilha traseira dura mais que a dianteira. Rebuild da pinca traseira a cada 20.000 km. Fluido: 24 meses.', priority: 'HIGH', order: 13 })
  } else {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona traseira + ajuste de pedal (tambor)', intervalKm: 10000, intervalMonths: null, notes: 'Pedal com folga excessiva apos ajuste maximo = lonas gastas. Fras-le ou Honda original. Curso livre do pedal: 20-30 mm.', priority: 'MEDIUM', order: 13 })
  }

  if (isFlex) {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Sonda lambda (sensor de oxigenio) — verificacao', intervalKm: 30000, intervalMonths: null, notes: 'DTC 21 = sonda com falha. Com falha, ECU usa mapa fixo — pode ser pobre com E100 e queimar valvula. Denso compativel: R$150-250. Honda original: R$280-380.', priority: 'HIGH', order: 14 })
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza da tela interna da bomba de combustivel', intervalKm: 20000, intervalMonths: null, notes: 'Tela dentro da bomba filtra impurezas do etanol. Limpeza: R$50-100 (desmonte parcial). Entupida: falta de combustivel em alta rotacao.', priority: 'MEDIUM', order: 15 })
  }

  if (isCargo) {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspecao das soldas do sub-quadro traseiro', intervalKm: null, intervalMonths: 1, notes: 'MENSAL. Trinca na solda do sub-quadro = pare imediatamente. Solda TIG obrigatoria. Sobrepeso + ruas esburacadas causam fadiga progressiva das soldas.', priority: 'CRITICAL', order: 16 })
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Amortecedor traseiro — inspecao e substituicao', intervalKm: 15000, intervalMonths: null, notes: 'Original Honda insuficiente para delivery pesado — funde oleo interno em 15.000-20.000 km. Upgrade: YSS G-Plus ou Showa com mola reforçada.', priority: 'HIGH', order: 17 })
  }

  return items
}

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'CG 160 START',                  yearFrom: 2016, yearTo: null, MACETES: START_MACETES,   PROBLEMAS: START_PROBLEMAS  },
  { modelName: 'CG 160 FAN',                    yearFrom: 2018, yearTo: null, MACETES: FAN_MACETES,     PROBLEMAS: FAN_PROBLEMAS    },
  { modelName: 'CG 160 TITAN',                  yearFrom: 2016, yearTo: null, MACETES: TITAN_MACETES,   PROBLEMAS: TITAN_PROBLEMAS  },
  { modelName: 'CG 160 TITAN S',                yearFrom: 2020, yearTo: null, MACETES: TITANS_MACETES,  PROBLEMAS: TITANS_PROBLEMAS },
  { modelName: 'CG 160 TITAN 25TH ANNIVERSARY', yearFrom: 2019, yearTo: null, MACETES: TITAN25_MACETES, PROBLEMAS: TITAN25_PROBLEMAS},
  { modelName: 'CG 160 CARGO',                  yearFrom: 2016, yearTo: null, MACETES: CARGO_MACETES,   PROBLEMAS: CARGO_PROBLEMAS  },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  // START 2016-2021: tambor dianteiro + traseiro, sem CBS, gasolina
  ...makeCG160('CG 160 START', 2016, 2021, false, false, false, false),
  // START 2022+: disco dianteiro + CBS, ainda gasolina
  ...makeCG160('CG 160 START', 2022, null, true,  false, false, false),
  ...makeCG160('CG 160 FAN',                    2018, null, true,  false, true,  false),
  ...makeCG160('CG 160 TITAN',                  2016, null, true,  false, true,  false),
  ...makeCG160('CG 160 TITAN S',                2020, null, true,  true,  true,  false),
  ...makeCG160('CG 160 TITAN 25TH ANNIVERSARY', 2019, null, true,  false, true,  false),
  ...makeCG160('CG 160 CARGO',                  2016, null, true,  false, true,  true),
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
