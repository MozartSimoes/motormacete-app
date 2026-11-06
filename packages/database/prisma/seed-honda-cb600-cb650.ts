// seed-honda-cb600-cb650.ts — Honda naked middleweights brasileiras
// CB 600F HORNET (2004-2013) | CB 650F (2014-2018) | CB 650R (2019+) | CB 650R E-Clutch (2024+)
// Motor 599cc / 649cc DOHC I4 refrigerado a líquido — a família de 4-cilindros naked mais popular
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

// ─── CB 600F HORNET (2004–2013) ──────────────────────────────────────────────
// Motor: 599cc DOHC I4 liquid-cooled (derivado CBR 600 F4i) | 102 cv @ 12.000 rpm
// Óleo: 10W-30 JASO MA2, 2,8L (troca) / 3,5L (inicial) | Vela: NGK CR9EH-9 gap 0,9mm
// Bateria: YTX9-BS 12V 8Ah | Pneus: 120/70-17 (F) / 180/55-17 (R) | Tanque: 17L
// Produzida em Manaus (Brasil) de 2004 a 2013 — muito popular no mercado nacional

const CB600F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — 2,8 L (troca) / 3,5 L (inicial); a cada 6.000 km',
    body: 'Motor 599cc DOHC I4 refrigerado a líquido com câmbio integrado: use 10W-30 JASO MA2 (nunca JASO MB). Capacidade: 2,8 L na troca normal / 3,5 L no enchimento inicial. Honda HP4 10W-30 (R$45–65/L), Mobil 1 Moto 10W-30 (R$55–80/L), Motul 7100 10W-30 (R$65–90/L). Para uso mais esportivo (pista ou pilotagem agressiva): Motul 300V 10W-40 full sintético (temperatura de operação mais alta). Troque a cada 6.000 km ou anual. Em uso predominantemente urbano (baixa rotação): 5.000 km. Não ultrapasse 8.000 km: óleo I4 de alto rendimento degrada mais rápido.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EH-9 — gap 0,9 mm; são 4 velas, troca em conjunto',
    body: 'São 4 velas (1 por cilindro) NGK CR9EH-9 (R$20–30 cada). Gap: 0,90 mm. Troque sempre em conjunto — vela velha em cilindro novo causa desequilíbrio de combustão e engasgo. Alternativa iridium: NGK CR9EHIX-9 (R$70–100 cada) dura 16.000–20.000 km e melhora a resposta em baixa. Acesso: remover o tanque para acessar as velas da geração FI (2006+); nas versões carburadas (2004–2005), acesso mais simples. Ferramenta: chave de vela 16 mm + extensão longa. Velas com aspecto cinza claro = mistura correta.',
  },
  {
    severity: 'OK',
    title: 'Arrefecimento líquido — trocar fluido a cada 2 anos ou 24.000 km',
    body: 'Motor refrigerado a líquido: verifique o nível no reservatório de expansão (marcas MIN/MAX). Use fluido Honda Coolant diluído 50/50 com água destilada, ou Long Life Coolant azul/verde 50/50. NUNCA use água pura (corrói alumínio) nem fluido sem diluição. Troca: a cada 2 anos. Em motos que ficaram paradas: verifique se o fluido não virou gelatina (sinal de negligência longa). Com o motor quente: NUNCA abra a tampa do radiador — sistema pressurizado queima a mão. Inspecione mangueiras por rachaduras a cada revisão.',
  },
  {
    severity: 'OK',
    title: 'Motor derivado do CBR 600 F4i — revisão de válvulas a cada 24.000 km',
    body: 'O motor 599cc DOHC 16v é derivado do CBR 600 F4i. Folgas de válvulas (motor FRIO): admissão 0,16 mm / escape 0,24 mm. Regulagem por shims (tachinhas) — requer ferramentas específicas (compressor de mola + jogo de shims calibrados). Intervalo: 24.000 km (Honda). Com pilotagem esportiva frequente: 16.000 km. Barulho metálico característico "tictac" no cabeçote a frio é alarme imediato. Acesso: retirar toda a carenagem superior. Custo de regulagem em oficina especializada: R$400–700.',
  },
  {
    severity: 'OK',
    title: 'Corrente — folga 25–35 mm; lubrificar a cada 600 km; substituir kit completo',
    body: 'A CB 600F Hornet usa corrente passo 520 (mais grossa que as trilhas). Folga: 25–35 mm de jogo vertical no ponto mais tenso da corrente, com piloto sentado no cavalete lateral. Lubrifique a cada 600 km com spray de corrente O-ring. Kit de transmissão: pinhão 16T + coroa 43T + corrente 520 (106 elos) — trocar kit completo a cada 25.000–30.000 km ou quando o pinhão mostrar dentes em "gancho". Kit RK/DID 520: R$350–500. NUNCA troque a corrente sem trocar pinhão e coroa: corrente nova em pinhão gasto patina e desgasta 3× mais rápido.',
  },
  {
    severity: 'OK',
    title: 'Freios combinados — disco 296 mm (F) + 240 mm (R); fluido DOT 4 bienal',
    body: 'Disco dianteiro 296 mm, traseiro 240 mm (ambos não ventilados, monodisco). Pastilhas: EBC FA379HH (dianteiras) ou Honda original (R$90–140). Fluido DOT 4: troca obrigatória a cada 2 anos, independente do km — absorve umidade. NUNCA misture DOT 3, DOT 4 e DOT 5 (silicone). Rebuild das pinças (purge dos êmbolos): a cada 30.000 km ou ao notar freio "esponjoso" mesmo após purga. Mangueiras de aço inox (aftermarket): melhoram resposta e durabilidade (R$200–350 o kit).',
  },
  {
    severity: 'OK',
    title: 'Hornet montada em Manaus: suporte de peças e número de série',
    body: 'A CB 600F Hornet foi fabricada na Zona Franca de Manaus de 2004 a 2013, tendo número de série brasileiro (9C2PC36...). Vantagem: peças de motor disponíveis no Brasil com prazo menor que as importadas. Principais distribuidores: Maxima Honda, Impacto, Bicicletaria Japonesa. Filtros, velas, fluidos e pastilhas em toda rede Honda. Para peças de carenagem (farol, carenagem lateral): veja replicas no Mercado Livre — peças originais da Hornet têm preços elevados por ser descontinuada. Desmanche de Hornet em Sorocaba/SP e Belo Horizonte/MG com melhor estoque de usados.',
  },
]

const CB600F_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador de voltagem — falha mais comum da Hornet; mata a bateria',
    body: 'Problema crônico e amplamente documentado na CB 600F Hornet: o retificador/regulador original falha, causando sobrecarga ou subcarga da bateria. Sintoma de sobrecarga: bateria incha, eletrólito vaza, temperatura alta — eventualmente destroi a bateria e outros componentes. Sintoma de subcarga: bateria não segura carga, moto para. Verifique a cada 6 meses: com motor a 4.000 rpm, tensão na bateria deve ser 13,5–14,5V. Acima de 15V = retificador falhando. Substituição: Chiaratto (R$200–300) ou Shin-Yo (R$150–250) são alternativas confiáveis.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio com dificuldade de engate em 1ª/2ª — desgaste do tambor seletor',
    body: 'Com mais de 40.000 km, a CB 600F Hornet pode apresentar dificuldade de engate em 1ª marcha ou neutro escorregadio. Causa: garfo do seletor de marchas com desgaste. Sintoma: "dentes" sensíveis ao engatar marchas, trancamento ao reduzir. Solução parcial: troca de óleo resolve temporariamente (óleo limpo lubrifica melhor os garfos). Solução definitiva: revisão do câmbio com troca do garfo e tambor desgastados (custo R$800–1.500 em mão de obra, mais peças). Prevenção: não "bater" a redução — reduza com pausa (não forçar marchas rápido).',
  },
  {
    severity: 'WARN',
    title: 'Estator do alternador com falha — luz fraca em alta rotação',
    body: 'Estator do alternador da Hornet tem vida útil de 50.000–80.000 km. Sintoma: luzes fracas em alta rotação, tensão abaixo de 13V a 4.000 rpm, bateria não carregando. Diagnóstico: com multímetro nas saídas do estator (AC) a 3.000 rpm: deve medir 14–16V AC por fase (3 fases). Menos de 12V AC em uma fase = bobina queimada. Custo: estator Honda original R$400–700; alternativo nacional R$200–350. Troque estator E retificador simultaneamente — estator ruim danifica o retificador e vice-versa.',
  },
  {
    severity: 'WARN',
    title: 'Versões carburadas (2004–2005): carburador entupindo com gasolina velha',
    body: 'Nas versões com carburador (produzidas até 2005): gasolina velha ou com alto teor de etanol entope os jatos finos. Sintoma: marcha lenta instável, engasgo na retomada, não parte a frio sem afogar. Prevenção: esvazie os carburadores antes de guardar por mais de 2 semanas. Limpeza preventiva: a cada 20.000 km, desmonte e limpe ultrassonicamente. Kit de reparo: R$80–150. Upgrade para FI: algumas oficinas especializadas adaptam sistema PGM-FI (custo alto, mas elimina o problema definitivamente).',
  },
  {
    severity: 'OK',
    title: 'Oxidação dos bordas de alumínio e tampas — estética mas pode indicar selagem ruim',
    body: 'A CB 600F Hornet tem muitas peças em alumínio natural (motor, tampas, comandos). Com o tempo, oxidam com aparência esbranquiçada. Esteticamente indesejado, mas não é sinal de problema mecânico. Limpeza: autosol para alumínio (R$25–40). Porém: se houver óleo misturado com a oxidação em alguma tampa: indica vedação ruim (O-ring ou junta deteriorada). Verifique todas as tampas por vazamentos ao lavar a moto. Tampa de válvulas com gotejamento: junta de borracha (R$30–60 + mão de obra).',
  },
]

// ─── CB 650F (2014–2018) e CB 650R (2019+) ──────────────────────────────────
// Motor: 649cc DOHC I4 16v liquid-cooled (NOVO motor, não derivado do CBR 600) | 86-95 cv
// Óleo: 10W-30 JASO MA2, 2,9L (serviço) / 3,2L (completo) | Pneus: 120/70-17 / 180/55-17
// Bateria: YTZ10S 12V 8,6Ah | Tanque: 15L (650F) / 15,4L (650R) | 6 marchas

const CB650F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — 2,9 L (serviço) / 3,2 L (completo); a cada 8.000 km',
    body: 'Motor 649cc DOHC I4 16v refrigerado a líquido: use 10W-30 JASO MA2 full sintético. Capacidade: 2,9 L troca sem filtro / 3,2 L com troca do filtro. Honda HP4 10W-30, Mobil 1 Moto 10W-30 (R$55–80/L) ou Motul 7100 10W-30 (R$65–90/L). Intervalo Honda: 8.000 km ou 12 meses. Para uso mais esportivo: 6.000 km. O motor 649cc é mais novo e mais eficiente que o 599cc da Hornet, tolerando bem o intervalo de 8.000 km com sintético. Verifique a torninha do nível de óleo com a moto quente e no cavalete.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK iridium (IZFR6K11) — gap 0,9 mm; 4 velas; troca a cada 16.000 km',
    body: 'São 4 velas iridium NGK IZFR6K11 (R$80–120 cada). Gap: 0,90 mm. Troque todas juntas. O motor 649cc usa velas iridium de origem — não substitua por convencionais (o retorno de combustão é otimizado para as iridium). Acesso: retirar tanque e caixa de filtro. Com 4 velas iridium, o custo da troca é R$350–480 em peças — antecipe a troca se sentir qualquer engasgo ou piora no consumo. Alternativa iridium: Denso IT16TT (confirmar compatibilidade antes de usar).',
  },
  {
    severity: 'OK',
    title: 'Freios: ABS Honda (CB 650F 2018+ e CB 650R) — fluido DOT 4, purge correto',
    body: 'CB 650F versões pré-2018: sem ABS. CB 650F 2018 e CB 650R: ABS Honda duplo canal. Fluido DOT 4: troca obrigatória a cada 2 anos (não por km). Purge do sistema ABS: exige scanner específico com função de purge guiado (purge manual não substitui o fluido nos acumuladores internos do módulo ABS). Pastilhas dianteiras EBC FA319HH ou Honda original (R$120–180). Disco dianteiro 320 mm (CB 650R) com pinça radial Nissin — cuidado ao tirar a moto: pinças radiais são frágeis a impactos laterais.',
  },
  {
    severity: 'OK',
    title: 'CB 650R: neo-sport café — estética que exige cuidado na posição das luzes LED',
    body: 'CB 650R (2019+) tem farol redondo LED e lanterna LED compacta. Os LEDs são de alta temperatura de operação: não instale capas ou proteções que bloqueiem a saída de calor. O conector do farol LED é específico — ao trocar a faixa (sticker) da frente, evite pressão sobre o compartimento do farol. A CB 650R E-Clutch (2024+) adiciona sistema de embreagem eletrônica: dispensa o uso da alavanca de embreagem em acelerações e reduções — útil no trânsito, mas a embreagem física deve ser verificada normalmente.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 (CB 650F/R) — lubrificação regular; kit completo a cada 25.000 km',
    body: 'CB 650F e CB 650R usam corrente passo 525 (mais grossa que a 520 da Hornet). Pinhão 15T, coroa 42T. Folga: 25–35 mm no ponto mais tenso. Lubrifique a cada 600 km com spray O-ring (DID Gear Chain Lube ou Motul). Kit: DID 525 VX (R$350–450 o kit corrente/pinhão/coroa). A corrente 525 é mais durável: com boa lubrificação pode chegar a 30.000+ km. Para pilotagem esportiva: corrente RK 525 GXW (dourada, mais resistente para pista).',
  },
  {
    severity: 'OK',
    title: 'Arrefecimento: fluido de arrefecimento a cada 2 anos; radiador limpo é fundamental',
    body: 'Motor refrigerado a líquido: verifique o nível no reservatório de expansão (lateral direita). Fluido Long Life Coolant 50/50 com água destilada. Troca: a cada 2 anos ou 30.000 km. Atenção: não abra o sistema com motor quente. Pré-mistura Honda Coolant (R$30–50/L) já vem na proporção correta. Inspecione mangueiras por rachaduras. Em moto usada recebida: troque o fluido imediatamente se estiver escuro — oxidação interna do motor é silenciosa. Aletas do radiador: limpe com ar comprimido após uso em asfalto com insetos acumulados.',
  },
]

const CB650F_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Retificador/regulador — mesma falha da Hornet 600; verificar periodicamente',
    body: 'O motor 649cc DOHC da CB 650F/R usa sistema de carga similar ao da Hornet 600. Retificador com mesma suscetibilidade a falha, especialmente em motos com mais de 40.000 km. Sintoma: bateria sem carga, luzes oscilando, moto para em aceleração. Diagnóstico: a 4.000 rpm, tensão na bateria 13,5–14,5V. Substituição preventiva após 50.000 km é recomendada. Alternativo Mosfet (mais confiável que o original): R$180–280. Combinação bateria nova + regulador novo = sistema de carga reestabelecido.',
  },
  {
    severity: 'WARN',
    title: 'CB 650F: barulho na embreagem a frio — "chocalho" nos primeiros 2 min',
    body: 'Ruído característico de "chocalho" ou "cascavel" nos primeiros 2 minutos após a partida a frio na CB 650F. Causa: mola de amortecimento do cubo da embreagem (rubber damper) que cria som ao ser acionada a frio. Ruído desaparece com o óleo quente. NÃO é defeiro de fabricação — Honda emitiu boletim técnico reconhecendo o fenômeno. Se o ruído persistir após 3 minutos de motor quente ou se houver vibração junto: levar à oficina (pode ser desgaste real do rubber damper após alta quilometragem).',
  },
  {
    severity: 'WARN',
    title: 'CB 650R: sistema E-Clutch (2024+) — software pode apresentar falha inicial',
    body: 'A CB 650R E-Clutch (2024+) usa atuador eletromagnético que dispensa a alavanca de embreagem em operações normais. Problemas relatados em versões iniciais: atuador com resposta lenta em temperaturas baixas; modo degradado (embreagem em modo manual) ativando sem razão aparente. Solução: atualização de software pela concessionária. Não tente adaptar o sistema elétrico sem diagnóstico correto — o módulo E-Clutch é parte integrada da ECU. Se o sistema travar em modo degradado: funciona normalmente como embreagem manual.',
  },
  {
    severity: 'OK',
    title: 'Pilotagem esportiva: cabeçote quente; aguarde antes de desligar',
    body: 'Após uso esportivo ou em congestionamento por mais de 20 min com motor quente, deixe o motor em marcha lenta por 1–2 min antes de desligar. O sistema de arrefecimento a líquido continua circulando durante a marcha lenta, removendo calor residual do cabeçote. Desligamento abrupto após uso intenso causa "heat soak" — vapor de combustível no injetor pode causar dificuldade de partida a quente. Regra prática: se o ventilador do radiador está ligado quando você para, espere ele desligar antes de desligar a moto.',
  },
]

// ─── Manutenção ───────────────────────────────────────────────────────────────

const CB600F_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 600F HORNET', yearFrom: 2004, yearTo: 2013, component: 'Óleo 10W-30 JASO MA2 (2,8 L troca / 3,5 L inicial)', intervalKm: 6000, intervalMonths: 12, notes: 'Full sintético recomendado. Uso esportivo: 5.000 km. Verificar nível a cada 1.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'CB 600F HORNET', yearFrom: 2004, yearTo: 2013, component: 'Filtro de óleo (4 velas) — troca junto com o óleo', intervalKm: 6000, intervalMonths: 12, notes: 'Hiflofiltro HF204 ou Mann. 4 velas CR9EH-9 (R$20–30/unid): troca a cada 12.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CB 600F HORNET', yearFrom: 2004, yearTo: 2013, component: 'Velas NGK CR9EH-9 (×4) — gap 0,9 mm', intervalKm: 12000, intervalMonths: null, notes: 'Iridium CR9EHIX-9: 20.000 km. Trocar todas ao mesmo tempo. Acesso: remover tanque.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CB 600F HORNET', yearFrom: 2004, yearTo: 2013, component: 'Fluido de arrefecimento (50/50) — troca', intervalKm: null, intervalMonths: 24, notes: 'Honda Coolant ou Long Life Coolant diluído 50/50. NUNCA abrir com motor quente.', priority: 'HIGH', order: 4 },
  { modelName: 'CB 600F HORNET', yearFrom: 2004, yearTo: 2013, component: 'Regulagem de válvulas DOHC 16v (Adm 0,16 mm / Esc 0,24 mm)', intervalKm: 24000, intervalMonths: null, notes: 'Por shims (tachinhas): exige ferramentas específicas. Oficina especializada. Motor frio obrigatório.', priority: 'CRITICAL', order: 5 },
  { modelName: 'CB 600F HORNET', yearFrom: 2004, yearTo: 2013, component: 'Kit de transmissão 520 (corrente + pinhão 16T + coroa 43T)', intervalKm: 25000, intervalMonths: null, notes: 'Inspecionar desgaste a cada 5.000 km. Trocar kit completo. DID 520 VX ou RK 520.', priority: 'HIGH', order: 6 },
  { modelName: 'CB 600F HORNET', yearFrom: 2004, yearTo: 2013, component: 'Pastilhas dianteiras (disco 296 mm) + fluido DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'EBC FA379HH. Inspecionar a cada 8.000 km. Fluido DOT 4: bienal. Rebuild pinça: 30.000 km.', priority: 'HIGH', order: 7 },
  { modelName: 'CB 600F HORNET', yearFrom: 2004, yearTo: 2013, component: 'Retificador/regulador + estator — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: 'Tensão a 4.000 rpm: 13,5–14,5V. Substituição preventiva após 50.000 km ou falha detectada.', priority: 'CRITICAL', order: 8 },
  { modelName: 'CB 600F HORNET', yearFrom: 2004, yearTo: 2013, component: 'Bateria YTX9-BS (12V 8Ah) — verificação', intervalKm: null, intervalMonths: 12, notes: 'Repouso: 12,6V. A 4.000 rpm: 13,5–14,5V. Vida útil: 3–4 anos. Yuasa YTX9-BS ou Moura equivalente.', priority: 'HIGH', order: 9 },
  { modelName: 'CB 600F HORNET', yearFrom: 2004, yearTo: 2013, component: 'Corrente — lubrificação', intervalKm: 600, intervalMonths: null, notes: 'Spray O-ring a cada 600 km. Folga: 25–35 mm. Verificar desgaste visual mensalmente.', priority: 'HIGH', order: 10 },
]

const CB650F_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 650F', yearFrom: 2014, yearTo: 2018, component: 'Óleo 10W-30 JASO MA2 (2,9 L serviço / 3,2 L completo)', intervalKm: 8000, intervalMonths: 12, notes: 'Full sintético obrigatório. Mobil 1 Moto 10W-30 ou Honda HP4. Uso esportivo: 6.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'CB 650F', yearFrom: 2014, yearTo: 2018, component: 'Filtro de óleo — troca', intervalKm: 8000, intervalMonths: 12, notes: 'Honda original ou Hiflofiltro HF204RC. Aplicar óleo no O-ring antes de instalar.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CB 650F', yearFrom: 2014, yearTo: 2018, component: 'Velas iridium NGK IZFR6K11 (×4) — gap 0,9 mm', intervalKm: 16000, intervalMonths: null, notes: '4 velas a cada 16.000 km. R$80–120/unid. Troca em conjunto. Acesso: retirar tanque.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CB 650F', yearFrom: 2014, yearTo: 2018, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50 com água destilada. NUNCA abrir com motor quente.', priority: 'HIGH', order: 4 },
  { modelName: 'CB 650F', yearFrom: 2014, yearTo: 2018, component: 'Pastilhas dianteiras (disco 320 mm) + fluido DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'EBC FA325HH. Inspecionar a cada 7.000 km. Versão ABS (2018): purge guiado com scanner.', priority: 'HIGH', order: 5 },
  { modelName: 'CB 650F', yearFrom: 2014, yearTo: 2018, component: 'Kit de transmissão 525 (corrente + pinhão 15T + coroa 42T)', intervalKm: 25000, intervalMonths: null, notes: 'DID 525 VX recomendado. Lubrificar a cada 600 km. Inspecionar a cada 5.000 km.', priority: 'HIGH', order: 6 },
  { modelName: 'CB 650F', yearFrom: 2014, yearTo: 2018, component: 'Retificador/regulador — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: 'Tensão a 4.000 rpm: 13,5–14,5V. Falha causa dano à bateria. Substituir preventivamente após 50.000 km.', priority: 'HIGH', order: 7 },
  { modelName: 'CB 650F', yearFrom: 2014, yearTo: 2018, component: 'Bateria YTZ10S (12V 8,6Ah) — verificação', intervalKm: null, intervalMonths: 12, notes: 'Vida útil: 3–4 anos. Repouso: 12,6–12,8V. Yuasa YTZ10S (R$280–380) como reposição.', priority: 'HIGH', order: 8 },
]

const CB650R_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 650R', yearFrom: 2019, yearTo: null, component: 'Óleo 10W-30 JASO MA2 (2,9 L serviço / 3,2 L completo)', intervalKm: 8000, intervalMonths: 12, notes: 'Mesmo motor do CB 650F, mesmo especificação. Uso esportivo: 6.000 km. Full sintético.', priority: 'HIGH', order: 1 },
  { modelName: 'CB 650R', yearFrom: 2019, yearTo: null, component: 'Filtro de óleo — troca', intervalKm: 8000, intervalMonths: 12, notes: 'Honda original ou equivalente. Aplicar óleo no O-ring antes de instalar.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CB 650R', yearFrom: 2019, yearTo: null, component: 'Velas iridium NGK IZFR6K11 (×4) — gap 0,9 mm', intervalKm: 16000, intervalMonths: null, notes: '4 velas. Trocar todas em conjunto. Iridium original — não substituir por convencionais.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CB 650R', yearFrom: 2019, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50. Verificar nível semanalmente em uso intenso.', priority: 'HIGH', order: 4 },
  { modelName: 'CB 650R', yearFrom: 2019, yearTo: null, component: 'Pastilhas dianteiras ABS (disco 320 mm radial) + fluido DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'ABS 2 canais de série. Purge guiado obrigatório com scanner. EBC FA319HH.', priority: 'HIGH', order: 5 },
  { modelName: 'CB 650R', yearFrom: 2019, yearTo: null, component: 'Kit de transmissão 525 (corrente + pinhão + coroa)', intervalKm: 25000, intervalMonths: null, notes: 'DID 525 VX. Lubrificar a cada 600 km. Folga: 25–35 mm.', priority: 'HIGH', order: 6 },
  { modelName: 'CB 650R', yearFrom: 2019, yearTo: null, component: 'Bateria YTZ10S (12V 8,6Ah) — verificação', intervalKm: null, intervalMonths: 12, notes: 'Yuasa YTZ10S. Repouso: 12,6V mín. Verificar tensão de carga a 4.000 rpm: 13,5–14,5V.', priority: 'HIGH', order: 7 },
]

// ─── Calibragens ──────────────────────────────────────────────────────────────

const CB600F_CALIBRAGEM = {
  modelName: 'CB 600F HORNET',
  yearFrom: 2004, yearTo: 2013,
  tireSize: '120/70-17 (F) · 180/55-17 (R)',
  frontPsi: 36, rearPsi: 41, frontPsiLoad: 36, rearPsiLoad: 42,
  sparePsi: null,
  notes: 'Solo: F 36 / R 41 PSI. Com garupa: F 36 / R 42 PSI. ZR17 (pneus de alta performance). Michelin Pilot Power 3, Pirelli Diablo Rosso IV. Verificar pressão sempre a frio.',
}

const CB650F_CALIBRAGEM = {
  modelName: 'CB 650F',
  yearFrom: 2014, yearTo: 2018,
  tireSize: '120/70-17 (F) · 180/55-17 (R)',
  frontPsi: 33, rearPsi: 39, frontPsiLoad: 33, rearPsiLoad: 41,
  sparePsi: null,
  notes: 'Solo: F 33 / R 39 PSI. Com garupa: F 33 / R 41 PSI. Michelin Road 5, Pirelli Diablo Rosso III. Pneus ZR17 sport.',
}

const CB650R_CALIBRAGEM = {
  modelName: 'CB 650R',
  yearFrom: 2019, yearTo: null,
  tireSize: '120/70-17 (F) · 180/55-17 (R)',
  frontPsi: 33, rearPsi: 39, frontPsiLoad: 33, rearPsiLoad: 41,
  sparePsi: null,
  notes: 'Solo: F 33 / R 39 PSI. Com garupa: F 33 / R 41 PSI. Neo-sport café: Michelin Road 5 ou Pirelli Diablo Rosso IV para uso esportivo. Bridgestone Battlax T32 para turismo.',
}

// ─── Upsert helpers ───────────────────────────────────────────────────────────

async function upsertTips(modelName: string, category: Cat, tips: TipInput[]) {
  await prisma.tip.deleteMany({ where: { modelName, category } })
  for (let i = 0; i < tips.length; i++) {
    const t = tips[i]
    await prisma.tip.create({
      data: { modelName, category, order: i + 1, severity: t.severity, title: t.title, body: t.body },
    })
  }
}

async function upsertMaintenance(items: MaintenanceItemInput[]) {
  const modelNames = [...new Set(items.map(i => i.modelName))]
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: modelNames } } })
  for (const item of items) {
    await prisma.maintenanceItem.create({ data: item })
  }
}

async function upsertTirePressure(tp: { modelName: string; yearFrom: number; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number; rearPsiLoad: number; sparePsi: number | null; notes: string }) {
  await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
  await prisma.tirePressure.create({
    data: tp,
  })
}

async function upsertVehicleModel(name: string, brandName: string, yearFrom: number, yearTo: number | null) {
  const brand = await prisma.brand.findFirst({ where: { name: brandName } })
  if (!brand) { console.warn(`Brand ${brandName} not found`); return }
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name, brandId: brand.id } },
    create: { name, brandId: brand.id },
    update: {},
  })
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Honda CB 600F HORNET / CB 650F / CB 650R...')

  await upsertVehicleModel('CB 600F HORNET', 'Honda', 2004, 2013)
  await upsertVehicleModel('CB 650F', 'Honda', 2014, 2018)
  await upsertVehicleModel('CB 650R', 'Honda', 2019, null)

  // CB 600F HORNET
  await upsertTips('CB 600F HORNET', 'MACETES', CB600F_MACETES)
  await upsertTips('CB 600F HORNET', 'PROBLEMAS', CB600F_PROBLEMAS)
  await upsertMaintenance(CB600F_MANUTENCAO)
  await upsertTirePressure(CB600F_CALIBRAGEM)

  // CB 650F — compartilha muitos macetes e problemas com CB 650R
  await upsertTips('CB 650F', 'MACETES', CB650F_MACETES)
  await upsertTips('CB 650F', 'PROBLEMAS', CB650F_PROBLEMAS)
  await upsertMaintenance(CB650F_MANUTENCAO)
  await upsertTirePressure(CB650F_CALIBRAGEM)

  // CB 650R (inclui E-Clutch 2024+) — mesmo motor, design neo-sport
  await upsertTips('CB 650R', 'MACETES', CB650F_MACETES)
  await upsertTips('CB 650R', 'PROBLEMAS', CB650F_PROBLEMAS)
  await upsertMaintenance(CB650R_MANUTENCAO)
  await upsertTirePressure(CB650R_CALIBRAGEM)

  const tipCount = await prisma.tip.count({ where: { modelName: { in: ['CB 600F HORNET', 'CB 650F', 'CB 650R'] } } })
  const maintCount = await prisma.maintenanceItem.count({ where: { modelName: { in: ['CB 600F HORNET', 'CB 650F', 'CB 650R'] } } })

  console.log(`✅ CB 600F HORNET + CB 650F + CB 650R — ${tipCount} dicas, ${maintCount} itens de manutenção`)
  console.log('✅ Seed concluído!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
