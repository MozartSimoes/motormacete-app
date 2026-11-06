// seed-honda-pcx.ts — Honda PCX (todos os modelos FIPE)
// PCX 150 (2013-2021) · PCX 160 (2021-2024)
// PCX 150: motor 153cc SOHC PGM-FI, CVT | eSP (Enhanced Smart Power) — baixo atrito interno
// PCX 160: motor 156,9cc SOHC PGM-FI, CVT | rodas 14" | freio CBS + disc/disc
// Destaque: Smart Key (chave inteligente sem contato), compartimento sob o banco, start/stop automatico
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

// ─── PCX 150 (2013-2021) ─────────────────────────────────────────────────────

const PCX150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor eSP 153cc — oleo 10W-30 JASO MA2, 0,9 L; tecnologia de reducao de atrito com revestimento de DLC no pino do pistao',
    body: 'O motor eSP (Enhanced Smart Power) da PCX 150 usa revestimento DLC (Diamond-Like Carbon) no pino do pistao para reduzir o atrito interno. Isso significa que o motor e mais sensivel a qualidade do oleo — use SEMPRE 10W-30 JASO MA2 certificado. Capacidade: 0,9 L com filtro (menor que a maioria das motos Honda de 150). Hiflofiltro HF303 ou Honda original. Troca: 3.000 km ou 6 meses. Oleo de baixa qualidade degrada o revestimento DLC e aumenta o consumo.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT — troca obrigatoria a cada 20.000 km; correia Gates G-Force CTX e a referencia para PCX 150',
    body: 'PCX 150 usa correia de 24 dentes, 16R1736 (confirmar com manual do proprietario — diferentes geracoes). Gates G-Force CTX (R$130-180) ou Honda original (R$160-220). Correia nacional: R$60-90 (vida util reduzida para 10.000-12.000 km). Trocar correia + rolos + cubo de embreagem no mesmo servico para resultado otimo. Sintomas de desgaste: oscilacao na aceleracao, perda de velocidade de cruzeiro, solavanco ao acelerar em marcha lenta.',
  },
  {
    severity: 'WARN',
    title: 'Rolos do variador PCX 150 — peso original 16 g (1a geracao) ou 18 g (2a geracao); NUNCA misture pesos diferentes no mesmo variador',
    body: 'PCX 150 primeira geracao (2013-2017): rolos 16 g. Segunda geracao (2018-2021): rolos 18 g. Confira o ano antes de comprar. Rolo ovalado = solavanco na arrancada. Kit 6 rolos Honda original: R$100-150. Polini Speed (16 ou 18 g, R$120-180): melhor qualidade que nacional, durabilidade superior. Rolos mais pesados: melhor velocidade de cruzeiro, pior aceleracao inicial. Rolos mais leves: melhor aceleracao, pior cruzeiro. Para cidade: use sempre o peso original.',
  },
  {
    severity: 'OK',
    title: 'Smart Key (chave inteligente sem contato) — bateria da chave CR2025; duracao 1-2 anos; bateria fraca = scooter nao abre nem parte',
    body: 'A chave inteligente da PCX 150 usa pilha CR2025 (R$5-15 em farmacia ou papelaria). Bateria fraca: scooter nao reconhece a chave — painel apaga sem acionar o sistema. Sintoma precoce: need to press the button harder, range de detecção reduces. Troca da pilha: abrir a chave com moeda na ranhura traseira, substituir a CR2025 observando a polaridade (+). SEMPRE tenha uma pilha reserva: scooter parado por falta de pilha e constrangedor. Dica: anote o codigo de emergencia da chave (no manual) para casos extremos.',
  },
  {
    severity: 'WARN',
    title: 'Suspensao traseira monoamortecedor — desgaste em 30.000 km de uso urbano; solavanco excessivo em lombadas = amortecedor fundido',
    body: 'PCX 150 tem suspensao traseira de monoamortecedor oculto (nao visivel externamente). Amortecedor original Honda perde eficiencia em 25.000-35.000 km de uso urbano. Sintoma: moto "batendo fundo" em lombadas, passageiro queixando de desconforto em percursos curtos. Substituicao: YSS GD302-300TRL-03-X (especifico PCX 150, R$350-500) ou Showa (R$450-650). Scooter com passageiro frequente: considere upgrade para suportar a carga extra sem degradar a suspensao mais rapido.',
  },
  {
    severity: 'OK',
    title: 'Compartimento sob o banco — cabos no interior oxidam com umidade; proteja capacete e objetos eletronicos',
    body: 'O compartimento bajo do banco da PCX 150 nao e hermetico — umidade penetra em dias de chuva ou lavagem. Cabos eletricos do sistema de travamento que passam pela dobradora podem oxidar. Verifique anualmente os conectores do modulo de abertura do banco. Para objetos de valor: use bolsa impermeavel. Capacete guardado molhado: retire para secar (umidade acumulada causa odor e pode acelerar degradacao do EPS interno). Compartimento com ~28 litros — capacita apenas um capacete fullface.',
  },
  {
    severity: 'WARN',
    title: 'Sistema CBS (Combined Brake System) — freio traseiro aciona parte do dianteiro; pastilhas dianteiras desgastam 30% mais rapido que scooter sem CBS',
    body: 'O CBS da PCX 150 e hidraulico: ao acionar o freio traseiro (manete esquerdo), um combinador divide a forca e aplica parte ao pistao dianteiro. Resultado: pastilha dianteira trabalha em ambos os freios. EBC FA142 ou Honda original (R$50-80) — inspecione a cada 5.000 km. Disco dianteiro: minimo 3,0 mm. Fluido DOT 4: troca obrigatoria a cada 24 meses. NUNCA misture DOT 3 com DOT 4 no sistema CBS — ponto de ebulicao diferente corrompe o sistema.',
  },
]

const PCX150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor de partida com desgaste precoce — problema cronico na PCX 150 geracao 2013-2019; arrancada lenta ou falha de partida',
    body: 'Motor de partida da PCX 150 (geracoes 2013-2019) tem vida util media de 40.000-50.000 km — menor que o esperado para um scooter desse porte. Causa: motor de partida subdimensionado para a massa do volante do motor eSP. Sintoma: partida devagar (motor girando lento ao pressionar o botao), especialmente a frio. Troca do motor de partida Honda original: R$400-600. Alternativa: motor de partida recondicionado (R$180-280). Kit de escovas: R$25-40 — tente antes de trocar o motor inteiro.',
  },
  {
    severity: 'WARN',
    title: 'DTC 7 (sensor IAT) — codigo mais comum na PCX 150; conector fica no coletor de admissao exposto ao calor e vibracao',
    body: 'PCX 150 tem sensor IAT (temperatura do ar de admissao) no coletor — sujeito a vibracao do motor e calor. Conector tende a soltar ou oxidar com a vibracao constante de scooter urbano. Antes de comprar IAT novo: limpe o conector com spray de contato e reforce o encaixe com fita isolante. Sensor IAT Honda: R$80-150. Nacional: R$40-70. DTC 8 (TPS): calibracao antes de trocar qualquer peca — TPS descalibrado gera DTC ciclico mesmo com sensor novo.',
  },
  {
    severity: 'WARN',
    title: 'Painel digital com falha de display — backlight morto ou display escurecendo; problema em PCX 150 apos 4-5 anos de sol direto',
    body: 'Painel digital da PCX 150 pode ter o backlight LED com deterioracao apos 4-5 anos de exposicao ao sol brasileiro. Sintoma: painel legivel com luz intensa mas quase invisivel em ambiente normal. Painel completo Honda PCX 150: R$500-900 (raro e caro). Alternativa: painel de PCX usado em bom estado (R$200-350 em desmanches). Preventivo: filme de protecao UV sobre o painel (R$30-60) prolonga a vida do display. Nao deixe o scooter estacionado ao sol por horas consecutivas — acelera o envelhecimento.',
  },
  {
    severity: 'DANGER',
    title: 'Smart Key com defeito eletronico — scooter bloqueado sem chave de emergencia; nao ha como dar partida manual sem modulo de imobilizador',
    body: 'Modulo do Smart Key com defeito eletronico: scooter completamente inutilizado. Diferente de carro, nao ha modo manual alternativo. Modulo Honda PCX 150 novo: R$600-1.200 (raro e caro). Prevencao: guarde o CODIGO DE EMERGENCIA do manual em local seguro (nao no scooter). Nunca deixe o scooter apenas com a chave principal — se perder, o custo de substituicao do modulo pode superar o valor da moto usada. Considere fazer uma copia do codigo com a concessionaria logo apos a compra.',
  },
]

// ─── PCX 160 (2021-2024) ─────────────────────────────────────────────────────

const PCX160_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor eSP+ 156,9cc — motor completamente redesenhado vs PCX 150; oleo 10W-30 JASO MA2, 1,0 L com filtro; capacidade 11% maior',
    body: 'PCX 160 usa motor eSP+ completamente novo: cilindro maior (57,3 mm vs 52,4 mm do 150), curso ligeiramente diferente, compressao 10,6:1. Capacidade de oleo aumentou para 1,0 L com filtro (vs 0,9 L da PCX 150). Hiflofiltro HF303 compativel. Potencia: 15,8 cv @ 8.500 rpm vs 13,6 cv do 150 — diferenca real perceptivel na aceleracao. Troca de oleo: 3.000 km. Motor mais potente = mais calor gerado = qualidade do oleo mais critica. Use JASO MA2 certificado.',
  },
  {
    severity: 'OK',
    title: 'Rodas 14" (vs 10" dos scooters simples) — PCX 160 tem geometria de moto, nao de scooter; estabilidade superior em alta velocidade',
    body: 'As rodas de 14" da PCX 160 dao estabilidade e comportamento dinamico muito superiores a scooters com rodas 10" ou 12". Pneus: 100/80-14 dianteiro, 120/70-14 traseiro. Pirelli Diablo Scooter (R$170-230 F / R$200-260 R) ou Michelin City Grip 2 (R$160-220 F / R$180-240 R) sao as melhores opcoes. Balancear obrigatoriamente em toda troca. Calibragem: 33 PSI F / 33 PSI R (solo) ou 33/36 PSI com garupa. Pneu 14" com bolha = troca imediata — nao ha reparo seguro.',
  },
  {
    severity: 'WARN',
    title: 'CBS hidraulico disc/disc — dois circuitos independentes + combinador; fluido DOT 4 nos dois circuitos a cada 24 meses; nao confundir com sistema simples',
    body: 'PCX 160 tem freio a disco nos dois eixos com sistema CBS hidraulico: manete esquerdo (traseiro) aciona tambem parte do circuito dianteiro via combinador. Dois reservatorios de fluido DOT 4, duas pincas, dois circuitos. Troca: purge ambos os circuitos completamente. Fluido DOT 4 e higroscopico — troca obrigatoria a cada 24 meses mesmo sem uso intenso. Nao misture DOT 3 — ponto de ebulicao inferior contamina o sistema. Luz de freio travada acesa = interruptor do manete ou do pedal com problema.',
  },
  {
    severity: 'OK',
    title: 'Sistema ISS (Idle Stop System) — desliga o motor automaticamente em paradas acima de 3 segundos; bateria precisa estar em boa condicao',
    body: 'O ISS da PCX 160 desliga o motor automaticamente em semaforo (parada > 3 s) e liga ao soltar o freio. Economia: 5-8% de combustivel em uso urbano. ISS desabilitando sozinho sem voce pressionar o botao OFF = bateria com carga insuficiente (< 12,4 V em repouso). Bateria fraca e o principal causador de ISS inoperante. YTZ7S 12V 7Ah: R$180-280 (Honda ou Moura). ISS tambem desativa automaticamente em subidas (sensor de inclinacao) — e normal. Nao force o ISS off sempre — voce perde o beneficio de economia real.',
  },
  {
    severity: 'WARN',
    title: 'Smart Key PCX 160 — bateria CR2032 (diferente da CR2025 da PCX 150); confira o tipo antes de comprar',
    body: 'PCX 160 usa pilha CR2032 na chave inteligente — diferente da CR2025 da PCX 150. Nao sao intercambiaveis (espessura diferente). CR2032 em farmacia: R$5-15. Troca: mesmo procedimento da PCX 150 (abre com moeda). Bateria fraca: alcance de deteccao reduz, sistema pode nao reconhecer a chave de 1-2 metros de distancia. Guarde o CODIGO DE EMERGENCIA do manual em local seguro. Smart Key com defeito: modulo Honda PCX 160 (R$800-1.500) — custo elevado justifica cuidado especial com a chave.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT PCX 160 — troca a cada 20.000 km; correia mais larga que a PCX 150 (motor mais potente exige transmissao mais robusta)',
    body: 'PCX 160 usa correia CVT de maior secao transversal que a PCX 150 (motor mais potente exige mais). Gates G-Force CTX compativel (R$150-200). Honda original: R$180-250. Correia nacional: R$70-100 (vida util 12.000 km vs 20.000 km). Trocar junto com rolos do variador (20 g na PCX 160 — peso diferente da PCX 150). Sintomas de desgaste: aceleracao em dois tempos, velocidade maxima reduzida, pequeno estalo ao arrancar. Com correia nova + rolos novos: PCX 160 volta a acelerar como zero-km.',
  },
]

const PCX160_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'ISS falhando frequentemente — desliga o motor mas nao religa ao soltar o freio; bateria ou motor de partida',
    body: 'ISS que nao religa o motor = falha no motor de partida ou bateria com tensao caindo abaixo do minimo de operacao do ISS. O ISS usa o motor de partida centenas de vezes por dia em uso urbano — muito mais do que em motos convencionais. Motor de partida da PCX 160: vida util reduzida por uso intenso do ISS (30.000-40.000 km). Desabilite o ISS temporariamente (botao no painel) ao primeiro sinal de falha e leve para diagnostico antes de ficar na mao em via movimentada.',
  },
  {
    severity: 'WARN',
    title: 'Pinca traseira travando em uso urbano com paradas frequentes — pistons enferrujando; rebuild preventivo a cada 20.000 km',
    body: 'Pinca traseira do freio a disco da PCX 160 fica exposta a agua e poeira (posicao inferior no scooter). Pistons enferrujam mais rapido que em motos com pinca em posicao convencional. Sintoma: moto "pesada" ao empurrar (freio arrastando), consumo ligeiramente alto. Rebuild kit Honda: R$80-150. Rebuild e muito mais barato que pinca nova (R$400-700). Apos cada lavagem: soprar a area da pinca com ar comprimido e secar para remover agua acumulada no protetor da pinca.',
  },
  {
    severity: 'WARN',
    title: 'Modulo do Smart Key com interferencia eletromagnetica — estacionamentos com portoes eletronicos ou antenas proximas podem bloquear a chave',
    body: 'Smart Key da PCX 160 opera em 433 MHz (mesma frequencia de controles de portao, alarmes de carro). Em algumas situacoes (estacionamentos com sistema de barreira, eletromagnetismo de garagem), o sistema pode nao reconhecer a chave. Solucao: aproximar a chave ao painel de ignição (<15 cm) ou usar o codigo de emergencia. Nao e defeito permanente — e interferencia eletromagnetica temporaria. Se o problema for persistente em um local especifico: pode ser interferencia de antena de telefonia (5G).',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT desgastando em 12.000-14.000 km — uso de aplicativo (apps de entrega) com aceleracoes frequentes e carga de bau suprime vida util',
    body: 'PCX 160 usada para delivery (apps) com carga de bau: aceleracoes repetidas com peso extra aceleram o desgaste da correia. Com bau de 15 kg + cargas: troque a correia a cada 14.000 km (vs 20.000 km padrao). Rolos tambem desgastam mais rapido sob carga extra. Custo de correia + rolos a cada 14.000 km para delivery: R$350-500 (pecas + mao de obra). Preventivo mais economico que ficar com a correia rompida em meio a um pedido.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'PCX 150',
    yearFrom: 2013, yearTo: 2021,
    tireSize: '100/80-14 (F) · 120/70-14 (R)',
    frontPsi: 33, rearPsi: 33, frontPsiLoad: 33, rearPsiLoad: 36,
    notes: 'Rodas 14" com perfil baixo (80 e 70 de perfil). Pneu com 14" e mais sensivel a desequilibrio — balancear em cada troca. CBS: pressao incorreta compromete distribuicao de frenagem. Calibre com pneu frio.',
  },
  {
    modelName: 'PCX 160',
    yearFrom: 2021, yearTo: 2024,
    tireSize: '100/80-14 (F) · 120/70-14 (R)',
    frontPsi: 33, rearPsi: 33, frontPsiLoad: 33, rearPsiLoad: 36,
    notes: 'Mesmas dimensoes da PCX 150. Disc/disc CBS: pressao correta nos dois eixos e critica para equilibrio de frenagem. Com garupa: 33/36 PSI. ISS desativa se pressao do pneu estiver muito baixa (sensor de pressao em alguns mercados).',
  },
]

// ─── Manutencao ───────────────────────────────────────────────────────────────

const makePCX150 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor 10W-30 JASO MA2 + filtro', intervalKm: 3000, intervalMonths: 6, notes: '0,9 L com filtro. JASO MA2 — motor eSP com revestimento DLC. Qualidade do oleo critica. Hiflofiltro HF303.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CPR8EA-9 (gap 0,8-0,9 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'PCX 150 usa vela de grau 8 (mais fria que maioria). Gap: 0,80-0,90 mm. Iridium CPR8EIX-9 dura 2x mais.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (papel) — inspecao e troca', intervalKm: 4000, intervalMonths: 6, notes: 'Troca a cada 12.000 km. Em cidades poluidas: 10.000 km. Filtro sujo limita potencia no motor eSP.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do IACV', intervalKm: 10000, intervalMonths: 12, notes: 'Marcha lenta oscilante = IACV suja. Spray EFI Cleaner. ISS desabilitando sozinho pode ser IACV suja.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Correia CVT Gates PCX 150', intervalKm: 20000, intervalMonths: null, notes: 'Gates G-Force CTX: R$130-180. Trocar junto com rolos (16 g 2013-2017 / 18 g 2018-2021) e cubo de embreagem.', priority: 'CRITICAL', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Rolos do variador (16 g ou 18 g conforme ano)', intervalKm: 15000, intervalMonths: null, notes: '2013-2017: 16 g; 2018-2021: 18 g. Kit 6 rolos Honda. Ovalados = solavanco na arrancada.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Cubo de embreagem centrifuga + mola', intervalKm: 25000, intervalMonths: null, notes: 'Trocar junto com a correia na segunda troca. Pastilha de embreagem gasta = patinagem em subida.', priority: 'MEDIUM', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do variador e polia traseira', intervalKm: 20000, intervalMonths: null, notes: 'Em cada troca de correia. Deposito de borracha limita velocidade maxima. Alcool isopropilico + pano.', priority: 'MEDIUM', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4 (CBS disc+tambor)', intervalKm: 8000, intervalMonths: 24, notes: 'CBS acelera desgaste dianteiro. EBC FA142 ou Honda original. Fluido DOT 4: 24 meses. Disc: min 3,0 mm.', priority: 'HIGH', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona traseira (tambor CBS)', intervalKm: 12000, intervalMonths: null, notes: 'Tambor traseiro CBS: nao lubrifique o tambor. Lona: Fras-le ou Honda. Curso do pedal: 20-30 mm.', priority: 'MEDIUM', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTZ7S 12V 7Ah — verificacao e limpeza dos terminais', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V. A 4.000 rpm: 13,8-14,5 V. ISS desabilitando = bateria fraca. Vida util: 2-3 anos.', priority: 'HIGH', order: 11 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Motor de partida — escovas e comutador', intervalKm: 40000, intervalMonths: null, notes: 'Problema cronico da PCX 150. Escovas: R$25-40. Motor recondicionado: R$180-280 vs Honda novo R$400-600.', priority: 'HIGH', order: 12 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sonda lambda — verificacao', intervalKm: 30000, intervalMonths: null, notes: 'DTC 21 = sonda com falha. Sensor compativel Denso: R$120-180. Limpeza do aterramento antes de substituir.', priority: 'MEDIUM', order: 13 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pilha Smart Key CR2025 — substituicao', intervalKm: null, intervalMonths: 18, notes: 'R$5-15 em farmacia. Bateria fraca: alcance de deteccao reduzido. Guarde o codigo de emergencia do manual.', priority: 'LOW', order: 14 },
]

const makePCX160 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor 10W-30 JASO MA2 + filtro', intervalKm: 3000, intervalMonths: 6, notes: '1,0 L com filtro (11% mais que PCX 150). JASO MA2 obrigatorio. Motor eSP+ com maior potencia — qualidade critica.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CPR8EA-9 (gap 0,8-0,9 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Mesma vela da PCX 150. Iridium para uso com ISS intenso (centenas de repartidas por dia).', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (papel) — inspecao e troca', intervalKm: 4000, intervalMonths: 6, notes: 'Troca a cada 12.000 km. Motor mais potente e mais sensivel a restricao de ar que a PCX 150.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do IACV', intervalKm: 10000, intervalMonths: 12, notes: 'ISS que falha em religar pode ser IACV suja (marcha lenta irregular causa ISS abortado). EFI Cleaner.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Scanner PGM-FI — leitura de DTCs', intervalKm: null, intervalMonths: 12, notes: 'Anualmente ou ao acender a luz FI. ISS falhando: leia DTCs antes de qualquer intervencao.', priority: 'MEDIUM', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Correia CVT Gates PCX 160', intervalKm: 20000, intervalMonths: null, notes: 'Gates G-Force CTX (R$150-200). Rolos 20 g (diferentes da PCX 150 — confira antes de comprar). Delivery: 14.000 km.', priority: 'CRITICAL', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Rolos do variador (20 g x 6 unidades)', intervalKm: 15000, intervalMonths: null, notes: 'PCX 160: 20 g (mais pesados que PCX 150). SEMPRE 20 g — peso diferente altera curva de aceleracao.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Cubo de embreagem centrifuga + mola', intervalKm: 25000, intervalMonths: null, notes: 'ISS = centenas de repartidas/dia — cubo de embreagem se desgasta mais rapido que em scooter sem ISS.', priority: 'MEDIUM', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4 (CBS disc/disc)', intervalKm: 8000, intervalMonths: 24, notes: 'CBS disc/disc: pastilha dianteira desgasta mais rapido. EBC FA142. Fluido DOT 4: 24 meses nos dois circuitos.', priority: 'HIGH', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas traseiras + rebuild da pinca traseira (CBS)', intervalKm: 12000, intervalMonths: 24, notes: 'Rebuild preventivo da pinca traseira a cada 20.000 km (exposicao a agua). Kit Honda: R$80-150.', priority: 'HIGH', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTZ7S 12V 7Ah — verificacao', intervalKm: null, intervalMonths: 6, notes: 'ISS exige bateria em boa condicao. Repouso: 12,6 V. ISS desabilitando = bateria fraca (<12,4 V).', priority: 'HIGH', order: 11 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Motor de partida — verificacao das escovas', intervalKm: 30000, intervalMonths: null, notes: 'ISS multiplica o uso do motor de partida. Em uso urbano intenso: inspecionar escovas a cada 30.000 km.', priority: 'HIGH', order: 12 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sonda lambda — verificacao', intervalKm: 30000, intervalMonths: null, notes: 'DTC 21. Motor mais potente e mais sensivel a sonda com falha em uso de alcool. Denso: R$130-190.', priority: 'MEDIUM', order: 13 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pilha Smart Key CR2032 — substituicao', intervalKm: null, intervalMonths: 18, notes: 'R$5-15. DIFERENTE da PCX 150 (CR2025) — nao confundir. Scooter parado por pilha fraca e evitavel.', priority: 'LOW', order: 14 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'PCX 150', yearFrom: 2013, yearTo: 2021, MACETES: PCX150_MACETES, PROBLEMAS: PCX150_PROBLEMAS },
  { modelName: 'PCX 160', yearFrom: 2021, yearTo: 2024, MACETES: PCX160_MACETES, PROBLEMAS: PCX160_PROBLEMAS },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makePCX150('PCX 150', 2013, 2021),
  ...makePCX160('PCX 160', 2021, 2024),
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
