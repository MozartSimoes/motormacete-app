// seed-honda-nx500.ts — Honda NX 500 (2024–2026+)
// Crossover adventure bicilíndrico paralelo DOHC 471cc refrigerado a líquido
// Sucessor da CB 500X — aro 19/17", ABS de série, embreagem assistida e deslizante
// Válvulas: IN 0,16 ±0,03 mm / EX 0,27 ±0,03 mm — shim-on-bucket (calços sob tuchos, NÃO parafuso)
// Vela: NGK CPR8EA-9 · Óleo: 10W-30 JASO MA 2,6 L c/filtro · Corrente: 520 15T/41T
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

const MODEL_NAME = 'NX 500'
const YEAR_FROM = 2024
const YEAR_TO = null

// ─── Macetes ─────────────────────────────────────────────────────────────────

const MACETES: { severity: Sev; title: string; body: string }[] = [
  {
    severity: 'OK',
    title: 'Motor bicilíndrico DOHC 471cc refrigerado a líquido — válvulas shim-on-bucket (calços sob tuchos), não parafusos; regulagem exige mecânico familiarizado com DOHC',
    body: 'A NX 500 usa o mesmo motor da CB 500X redesenhado: dois cilindros em paralelo, 67,0 × 66,8 mm, 10,7:1 de compressão, DOHC com 4 válvulas por cilindro (8 no total). O ajuste de válvulas é por calços (shims sob tuchos) — para ajustar é necessário trocar o calço com a espessura correta, não apertar um parafuso. Verificar em mecânico com experiência em DOHC de médio porte (Honda, Kawasaki). Folga: IN 0,16 ±0,03 mm / EX 0,27 ±0,03 mm com motor FRIO no PMS de compressão. Intervalo: a cada 25.600 km.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — capacidade 2,6 L com filtro / 2,4 L sem filtro; intervalo 12.800 km ou 1 ano',
    body: 'Honda especifica 10W-30 JASO MA (não MA2) para a NX 500. Em climas muito quentes (> 35 °C constante) ou uso intenso em cidade, 10W-40 JASO MA é aceito. Capacidade: 2,6 L ao trocar filtro, 2,4 L sem troca de filtro. Filtro: HF204 (Hiflofiltro) ou Honda 15410-MCJ-505. Troca de óleo: R$30–60 (a granel) + filtro R$25–45. Óleo de carro (sem JASO MA): NÃO usar — aditivos de atrito prejudicam a embreagem úmida.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR8EA-9, gap 0,80–0,90 mm, torque de aperto 16 N.m — trocar a cada 25.600 km junto com inspeção de válvulas',
    body: 'Vela original: NGK CPR8EA-9 (R$20–30). Iridium compatível: NGK CPR8EAIX-9 (R$70–100) com vida útil estendida — NÃO ajuste o gap da versão iridium. Torque de montagem: 16 N.m com torquímetro — cabeça de alumínio danifica com excesso. Acesso: painel superior desmonta para alcançar as velas (2 velas no bicilíndrico). Leitura: vela marrom-clara = mistura correta; vela preta = mistura rica ou filtro sujo; vela branca = mistura pobre (possível aspiração de ar falso).',
  },
  {
    severity: 'OK',
    title: 'Embreagem assistida e deslizante (Assist & Slipper) — reduz alavancagem e evita travamento na desaceleração; puxar embreagem em longas paradas preserva discos',
    body: 'A NX 500 é a primeira Honda 500 a ter embreagem assistida e deslizante de série (incorporado ao conjunto de discos e molas). O mecanismo deslizante alivia a embreagem automaticamente em reduções bruscas (backtorque), evitando travamento da roda traseira. O mecanismo assistido reduz a força na alavanca em ~30%. Em semáforos longos (> 20s): manter engatada 1ª com pé no freio ou ponto morto — evitar segurar embreagem puxada por minutos consecutivos, o que aquece os discos.',
  },
  {
    severity: 'OK',
    title: 'Pneus 110/80-19 (F) / 150/70-17 (R) — calibrar 29 PSI dianteiro / 36 PSI traseiro a frio (Honda revisou pressão traseira de 41 para 36 PSI em 2024)',
    body: 'Pressões Honda 2024+: dianteiro 200 kPa (29 PSI) · traseiro 250 kPa (36 PSI). Atenção: a CB 500X anterior recomendava 41 PSI traseiro — a NX 500 usa 36 PSI (nova calibração para o perfil de uso misto da moto). Com garupa ou carga: traseiro 280 kPa (~41 PSI). Aro 19" dianteiro é comum em adventure mas raros no Brasil — verificar disponibilidade de pneu antes de viajar para longe. Pneus originais de fábrica costumam ser Michelin Pilot Road ou Dunlop Trailmax.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 selada (O-ring), pinhão 15T / coroa 41T — lubrificar a cada 500–700 km; folga recomendada 20–30 mm',
    body: 'Kit corrente 520 com o-ring: DID 520VX3 (R$140–200) ou RK 520XRE (R$160–220). Pinhão 15T / coroa 41T de série. Modificação popular: coroa 42T ou 43T para uso mais frequente off-road (mais torque a baixa rotação). Lubrificação: spray de corrente com o-ring (Motul 300 ou Ipone Chainlube Off-Road). NUNCA WD-40 — dissolve o lubrificante interno dos o-rings. Tensão: 20–30 mm de folga medida no ponto mais tenso da corrente. Kit completo (corrente + coroa + pinhão): R$350–550.',
  },
  {
    severity: 'OK',
    title: 'Suspensão Showa SFF-BP 41 mm invertida (F) + Pro-Link 5 estágios de pré-carga (R) — 5ª posição para carga/garupa; retentores duram mais por ser bengala invertida',
    body: 'Diferença da CB 500X para NX 500: a NX tem bengala Showa invertida SFF-BP (Separate Function Fork - Big Piston) 41 mm, com melhor rigidez e vedação que a bengala convencional da CB 500X. Vida útil do retentor: 40.000–60.000 km (invertida é mais protegida de poeira). Ajuste traseiro Pro-Link: posição 1 (mais mole) para solo leve, posição 3 (padrão), posição 5 (carregado ou garupa). Óleo de bengala: Honda SS-7 10W ou equivalente. Para uso off-road frequente: considerar respring com molas Eibach ou Race Tech.',
  },
  {
    severity: 'OK',
    title: 'ABS de série — sensor na roda dianteira e anel dentado no disco; limpar anel dentado a cada 6 meses em uso de lama/terra para evitar ativação espúria',
    body: 'A NX 500 tem ABS de duplo canal de série (dianteiro e traseiro). Em uso off-road com lama: o anel dentado do sensor ABS (grudado ao disco) acumula barro, causando ativação do ABS em situações em que não deveria. Limpeza: pano úmido a cada 6 meses ou sempre após uso em terra. Sintoma de anel sujo: ABS ativando em frenagens lentas em linha reta (luz ABS piscando). Fluido DOT 4: trocar a cada 24 meses — fluido velho absorve umidade e reduz o ponto de ebulição, causando fading nos freios em descidas longas.',
  },
  {
    severity: 'OK',
    title: 'Tanque 17,7 L — autonomia estimada 300–350 km (23 km/L médio) — reserva ativa a partir de ~3,3 L; painel indica % do tanque, não litros',
    body: 'Consumo médio homologado: 23 km/L (uso misto). Uso urbano pesado: 18–20 km/L. Estrada (110–120 km/h): 22–25 km/L. Reserva de emergência: aproximadamente 3,3 L (a partir do momento em que a barra de combustível fica crítica no painel). PGM-FI com injeção eletrônica: não há necessidade de dar um "aceleradão" para limpar carburador. Em postos remotos: levar sempre um recipiente de 1 L vazio para emergência em trechos longos sem abastecimento.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar trocável — Honda recomenda 24.000 km; antecipar para 12.000 km em uso com pó ou estradas de terra frequentes',
    body: 'O filtro de ar original é elemento seco de papel. Em uso predominantemente asfalto: troca a cada 24.000 km. Com uso off-road / terra / pó frequente: troca a cada 8.000–12.000 km. Alternativa: filtro K&N HP-1013 lavável (R$200–280), reutilizável com kit de limpeza. Benefício: não precisa trocar, apenas lavar a cada 15.000–20.000 km. Instalação: acesso pelo painel lateral direito, sem ferramentas especiais.',
  },
  {
    severity: 'OK',
    title: 'Acessórios essenciais para viagem: protetor de motor obrigatório (sem slider de série), malas laterais e para-brisa elevado para viagem acima de 200 km',
    body: 'A NX 500 sai de fábrica sem protetor de motor/cárter. Em queda a baixa velocidade (off-road ou manobra), o cárter de alumínio exposto bate no solo — custo do reparo: R$400–1.200. Slider/protetor de motor Scam ou Bagagem.com: R$150–300 (instalação simples). Para-brisa original é baixo e cria turbulência acima de 80–90 km/h: extensão Puig, Ermax ou MRA sobe o fluxo de ar. Malas: soft bags (alforjes) encaixam sem suporte rígido, mas malas de 30+ litros podem tocar na corrente — usar espaçador ou suporte lateral.',
  },
  {
    severity: 'OK',
    title: 'Bateria YTZ10S 12V 8,6 Ah — verificar tensão em repouso (12,6 V mín) e em carga (13,8–14,5 V em 4.000 rpm); bateria fraca causa DTCs falsos na PGM-FI',
    body: 'Bateria de série: YTZ10S (selada, sem manutenção). Tensão em repouso: 12,6 V ou mais (abaixo de 12,4 V = carga baixa; abaixo de 12,0 V = bateria danificada). Tensão com motor em 4.000 rpm: deve ser 13,8–14,5 V (regulador de voltagem funcionando). Bateria fraca: causa erros intermitentes na injeção, luz FI acendendo sem falha real, dificuldade de partida a frio. Reposição: Yuasa YTZ10S ou equivalente (R$200–300). Vida útil: 3–5 anos.',
  },
  {
    severity: 'WARN',
    title: 'Ruído de vento acima de 80–90 km/h é um problema conhecido — bolsão de turbulência no capacete causado pelo para-brisa baixo; ajuste de ângulo do corpo resolve parcialmente',
    body: 'O para-brisa original da NX 500 é fixo e baixo (crossover, não adventure puro). Acima de 80–90 km/h, cria um bolsão de ar turbulento na região do capacete — propietários relatam cansaço e desconforto em viagens acima de 2 horas. Soluções: (1) extensão de para-brisa Puig City/Touring (R$350–500) — eleva o fluxo de ar sobre o capacete; (2) ajuste da posição do piloto (mais curvado); (3) uso de capacete integral com boa vedação aerodinâmica. Solução definitiva para viajantes: para-brisa aftermarket tipo adventure (Givi ou Puig ADV).',
  },
  {
    severity: 'OK',
    title: 'Painel TFT colorido — sem conectividade Bluetooth/app de série; scanner Honda HDS ou leitor OBD para leitura de DTCs da PGM-FI',
    body: 'Painel TFT da NX 500 mostra velocidade, rpm, marcha, temperatura, combustível e viagens — mas sem Bluetooth/conectividade com smartphone de série (diferente de algumas concorrentes). Para ler falhas (DTCs) da PGM-FI: usar scanner Honda HDS (R$800–2.000) ou adaptadores OBD2 compatíveis com KLINE/CAN bus Honda (Innova 3100j, BlueStar Honda Diag). Oficinas especializadas cobram R$80–120 pela leitura. Luzes no painel: ícone de motor = falha PGM-FI; ícone ABS = falha sistema ABS.',
  },
]

// ─── Problemas ───────────────────────────────────────────────────────────────

const PROBLEMAS: { severity: Sev; title: string; body: string }[] = [
  {
    severity: 'DANGER',
    title: 'Falha precoce da embreagem (4.000–5.000 km) relatada em alguns exemplares — Honda negou garantia em casos no Reclame Aqui; sintoma: perda total de transmissão de força',
    body: 'Casos documentados no Reclame Aqui (2024): embreagem da NX 500 queimando com menos de 5.000 km de uso. O mecânico diagnosticou discos de embreagem queimados; a Honda emitiu circular interna orientando a não cobrir pela garantia. Suspeita: vício de fabricação nos discos, pressão insuficiente das molas ou falha de ajuste de fábrica. Prevenção: (1) nos primeiros 5.000 km, evitar manobras com embreagem em meio-curso prolongado (pátio, baliza, rampa); (2) nunca "patinar" embreagem em arranques com carga; (3) ao perceber cheiro de queimado ou perda de força de tração: parar e chamar assistência — continuar piora o dano. Custo do reparo fora de garantia: R$600–1.200 em discos e molas.',
  },
  {
    severity: 'WARN',
    title: 'Ruído metálico da corrente de distribuição a frio (cam chain noise) — desaparece após 5–10 min de aquecimento; persistindo quente indica desgaste do tensor hidráulico',
    body: 'Motor bicilíndrico DOHC da NX 500 tem duas correntes de distribuição (cam chains) com tensores hidráulicos automáticos. A frio, é normal ouvir um leve farfalhar/batida metálica leve nos primeiros minutos (óleo ainda não pressuriza completamente o tensor). Quando desaparece após aquecimento: normal. Se persiste com motor quente (após 10+ minutos em marcha): pode indicar (1) tensor hidráulico desgastado, (2) guia de corrente com desgaste, (3) corrente de distribuição esticada. Custo do reparo (tensor + guia): R$400–800. Ignorar pode resultar em pulo de corrente e destruição do motor.',
  },
  {
    severity: 'WARN',
    title: 'Assento alto de série (834 mm) sem opção de rebaixamento oficial — dificulta pilotos com inseam abaixo de 80 cm; rebaixar suspensão compromete a geometria de direção',
    body: 'A NX 500 tem banco a 834 mm — o mesmo da Honda Africa Twin (CRF 1100L). Para pilotos abaixo de 1,68 m: só a ponta do pé toca o chão. Honda não oferece kit lowered oficial no Brasil. Soluções aftermarket: (1) banco rebaixado Seat Concepts ou Sargent (-20 mm, R$600–900); (2) rebaixamento de suspensão com links (perde mais clearance e ângulo de ataque off-road); (3) botas com solado elevado (+20–30 mm). Atenção: rebaixar suspensão traseira altera o ângulo da bengala dianteira e reduz o clearance off-road — aceitar o trade-off antes de modificar.',
  },
  {
    severity: 'WARN',
    title: 'Painel LCD sem Bluetooth / app — considerado básico pelos proprietários para o preço da moto; luz FI no painel acende sem falha real quando bateria fraca',
    body: 'Reclamação frequente nos fóruns de proprietários: a NX 500 no faixa de R$32.000–36.000 (2024) não tem conectividade com smartphone (Bluetooth ou app Honda RoadSync) de série, ao contrário da concorrente Kawasaki Versys-X 300 ou da própria Honda CB 500X da Europa. Comportamento a conhecer: ao ligar a chave com bateria em 12,3 V ou menos, a luz de falha FI pode acender transitoriamente sem que haja falha real. Verificar sempre a bateria antes de acionar escâner de diagnóstico.',
  },
  {
    severity: 'WARN',
    title: 'Fade de freio em descidas longas e repetidas — disco dianteiro 310 mm adequado para uso misto, mas pastilhas originais perdem eficiência acima de 300–350 °C',
    body: 'Em uso off-road/serrano com descidas longas (mais de 3 km contínuos de freio), as pastilhas originais da NX 500 podem apresentar fade (perda de eficiência por calor). Sintoma: pedal e alavanca ficam "esponjosos" e a distância de parada aumenta. Prevenção: (1) usar freio-motor com reduções em vez de segurar a alavanca constantemente; (2) para uso em serras: pastilhas EBC Double-H ou Ferodo sinterizadas (R$80–150 o par dianteiro); (3) nunca borrifar água em disco quente — choque térmico empena o disco. Custo de um disco empenado: R$250–500.',
  },
  {
    severity: 'WARN',
    title: 'Pneu aro 19" dianteiro — menor disponibilidade nas borracharias do interior; levar sempre câmara de emergência ou plugues em viagens longas fora das capitais',
    body: 'O aro 19" dianteiro é padrão em adventures médias globais (Africa Twin, Versys 650) mas ainda raro em borracharias de cidades pequenas no Brasil, onde predomina aro 17". Em viagens pelo interior: (1) levar kit de reparo de pneu tubeless (plugues Slime ou kit Stop & Go — R$30–60); (2) um par de plugues repara furos simples sem tirar a roda; (3) em pneus TL (tubeless) a fio (rasgo > 5 mm): não tem reparo no campo — chamar socorro. Pneus 110/80-19 mais disponíveis nas capitais: Michelin Anakee Wild, Pirelli Scorpion Trail.',
  },
  {
    severity: 'OK',
    title: 'Proteção de motor ausente de série — cárter exposto em manuais/off-road; queda a baixa velocidade quebra cárter e drena óleo no solo',
    body: 'A NX 500 não tem protetor de cárter de série. Em uso off-road ou ao cair em manobra lenta, o cárter de alumínio bate direto no solo. Cárter trincado = vazamento de óleo + moto parada. Protetores testados pela comunidade: Scam (R$250–350), Bagagem.com (R$180–280), Touratech alumínio (R$500–800). Instalar antes do primeiro passeio off-road. Protetor com abas também protege o motor de pedras projetadas pela roda dianteira em estradas vicinais.',
  },
]

// ─── Tire Pressures ──────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: MODEL_NAME,
    yearFrom: YEAR_FROM,
    yearTo: YEAR_TO,
    tireSize: '110/80-19 (F) · 150/70-17 (R)',
    frontPsi: 29,
    rearPsi: 36,
    frontPsiLoad: 29,
    rearPsiLoad: 41,
    notes: 'Honda revisou pressão traseira de 41 para 36 PSI na NX 500 2024+. Com garupa ou carga: traseiro sobe para 41 PSI. Aro 19" (F) raro em borracharias do interior — manter kit de reparo tubeless. Pneus originais: Michelin Pilot Road ou Dunlop Trailmax.',
  },
]

// ─── Manutenção ──────────────────────────────────────────────────────────────

const MANUTENCAO = [
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Óleo do motor 10W-30 JASO MA + filtro HF204', intervalKm: 12800, intervalMonths: 12, notes: '2,6 L com filtro / 2,4 L sem filtro. Uso intenso cidade: 8.000 km. NUNCA óleo de carro (sem JASO MA).', priority: 'CRITICAL' as const, order: 1 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Revisão inicial obrigatória', intervalKm: 1000, intervalMonths: null, notes: 'Óleo + filtro + ajustes gerais. Concessionária Honda — obrigatória para manter garantia.', priority: 'CRITICAL' as const, order: 2 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Inspeção de válvulas DOHC (IN 0,16 mm / EX 0,27 mm) + troca da vela NGK CPR8EA-9', intervalKm: 25600, intervalMonths: null, notes: 'Sistema shim-on-bucket — não é parafuso. Motor FRIO. Mecânico com experiência em DOHC. Vela: gap 0,80–0,90 mm / torque 16 N.m.', priority: 'CRITICAL' as const, order: 3 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Filtro de ar — inspeção e troca', intervalKm: 24000, intervalMonths: null, notes: 'Antecipar para 12.000 km em uso off-road/pó. K&N HP-1013 lavável como alternativa. Acesso pelo painel lateral direito.', priority: 'HIGH' as const, order: 4 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Corrente 520 — lubrificação e verificação de folga (20–30 mm)', intervalKm: 500, intervalMonths: null, notes: 'Spray com o-ring (Motul ou Ipone). Nunca WD-40. Folga: 20–30 mm no ponto mais tenso. Relubrifar após chuva intensa.', priority: 'HIGH' as const, order: 5 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Kit corrente 520 (DID 520VX3 / RK 520XRE + coroa 41T + pinhão 15T)', intervalKm: 25000, intervalMonths: null, notes: 'Sempre trocar kit completo. DID 520VX3 ou RK 520XRE (R$350–550 o kit). Coroa 42T ou 43T para uso off-road mais frequente.', priority: 'HIGH' as const, order: 6 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Fluido de freio DOT 4 — troca e purge', intervalKm: null, intervalMonths: 24, notes: 'Sistema ABS exige purge guiado. Fluido velho abaixa ponto de ebulição — fade em descidas longas. Usar DOT 4 (não DOT 3 ou DOT 5.1).', priority: 'HIGH' as const, order: 7 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Pastilhas dianteiras (disco 310 mm) + pastilhas traseiras', intervalKm: 10000, intervalMonths: null, notes: 'Uso urbano desgasta mais rápido. EBC Double-H ou Ferodo sinterizadas para uso em serra. Mín de espessura: 2,5 mm. Disco mín: 4,0 mm (dianteiro).', priority: 'HIGH' as const, order: 8 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Líquido de arrefecimento — troca', intervalKm: null, intervalMonths: 36, notes: 'Motor refrigerado a líquido: Honda Ultra-Cool ou equivalente anti-freeze 50/50. Verificar nível no reservatório a cada 3 meses. Mangueiras: inspecionar ao trocar líquido.', priority: 'HIGH' as const, order: 9 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Sensor ABS e anel dentado — limpeza', intervalKm: null, intervalMonths: 6, notes: 'Uso em terra/lama: limpeza a cada 2.000 km. Anel sujo = ABS ativando indevidamente. Pano úmido — sem jato de pressão direto no sensor.', priority: 'MEDIUM' as const, order: 10 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Retentores bengala Showa SFF-BP invertida 41 mm', intervalKm: 40000, intervalMonths: null, notes: 'Invertida dura mais que convencional. Inspeção a cada 15.000 km. Névoa oleosa na haste: inspecionar. Óleo: Honda SS-7 10W (100–110 mL/tubo).', priority: 'MEDIUM' as const, order: 11 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Bateria YTZ10S 12V 8,6 Ah — verificação', intervalKm: null, intervalMonths: 6, notes: 'Repouso: mín 12,6 V. Motor em 4.000 rpm: 13,8–14,5 V (regulador OK). Bateria < 12,4 V = luz FI falsa na PGM-FI. Vida útil: 3–5 anos.', priority: 'MEDIUM' as const, order: 12 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Scanner PGM-FI — leitura de DTCs', intervalKm: null, intervalMonths: 12, notes: 'Ao acender luz de falha FI. DTCs frequentes: 1 (sensor MAP), 7 (sensor IAT), 52 (sonda lambda). Honda HDS ou adaptador compatível KLINE/CAN bus.', priority: 'MEDIUM' as const, order: 13 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Protetor de motor / slider de cárter — instalação', intervalKm: null, intervalMonths: null, notes: 'Não incluso de série. Instalar antes do primeiro uso off-road. Scam ou Bagagem.com (R$180–350). Alumínio Touratech para uso sério (R$500–800).', priority: 'MEDIUM' as const, order: 14 },
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

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: MODEL_NAME, brandId: brand.id } },
    update: {}, create: { name: MODEL_NAME, brandId: brand.id },
  })

  const allTips = [
    ...MACETES.map(t  => ({ ...t, category: 'MACETES'   as Cat })),
    ...PROBLEMAS.map(t => ({ ...t, category: 'PROBLEMAS' as Cat })),
  ]

  await prisma.tip.deleteMany({ where: { modelName: MODEL_NAME } })
  await prisma.tip.createMany({
    data: allTips.map((tip, i) => ({
      modelName: MODEL_NAME,
      yearFrom:  YEAR_FROM,
      yearTo:    YEAR_TO,
      severity:  tip.severity,
      category:  tip.category,
      title:     tip.title,
      body:      tip.body,
      order:     i,
    })),
  })
  console.log(`✅ ${MODEL_NAME}: ${allTips.length} tips (${MACETES.length} macetes + ${PROBLEMAS.length} problemas)`)

  await prisma.tirePressure.deleteMany({ where: { modelName: MODEL_NAME } })
  await prisma.tirePressure.create({ data: TIRE_PRESSURES[0] })
  console.log(`🔵 TirePressure: ${MODEL_NAME}`)

  await prisma.maintenanceItem.deleteMany({ where: { modelName: MODEL_NAME } })
  await prisma.maintenanceItem.createMany({ data: MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${MANUTENCAO.length} itens`)

  console.log(`\n✅ Honda NX 500 seed concluído! 1 modelo, ${allTips.length} tips, 1 calibragem, ${MANUTENCAO.length} itens de manutenção`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
