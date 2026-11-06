/**
 * Seed Citroën — macetes, problemas, manutenção e calibragem de pneus
 * Cobre todos os modelos vendidos no Brasil (1998–presente).
 * Execute: pnpm --filter @motormacete/database tsx prisma/seed-citroen.ts
 *
 * Fontes: citroenclube.com.br, meucitroen.com.br, mundothp.wordpress.com,
 *         calibragemdepneu.com.br, fórum PSA global, reclameaqui, auto-doc.pt
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

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

interface MaintenanceItemInput {
  modelName: string
  yearFrom: number | null
  yearTo: number | null
  component: string
  intervalKm: number | null
  intervalMonths: number | null
  notes: string | null
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  order: number
}

// ─── Dicas por modelo/geração ──────────────────────────────────────────────────

const citroenTips: ModelBlock[] = [

  // ── C3 — 1ª GERAÇÃO (2002–2009) ──────────────────────────────────────────────
  // Motores: TU1 1.0 8V, TU3 1.4 8V, TU5 1.6 16V

  {
    modelName: 'C3', yearFrom: 2002, yearTo: 2009,
    MACETES: [
      { severity: 'OK',   title: 'Filtro de óleo: exija PSA/Purflux ou Mann', body: 'O filtro de óleo original tem uma peça plástica em "X" que mantém o canal de drenagem aberto. Filtros genéricos sem essa peça causam acúmulo de pressão e acionamento falso da luz de óleo. Use sempre Purflux ou Mann.' },
      { severity: 'OK',   title: 'Correia do acessório: inspecione a cada 20.000 km', body: 'O calor tropical resseca a correia dos acessórios muito mais rápido que na Europa. Inspecione a cada 20.000 km e substitua preventivamente a cada 60.000 km. Correia partida = sem carga na bateria e sem direção hidráulica.' },
      { severity: 'OK',   title: 'Motor 1.4 TU3: óleo limpo é o segredo da longevidade', body: 'O TU3JP é um dos motores mais duráveis da PSA — passa de 300.000 km com manutenção correta. Use 10W40 semissintético API SL/SM e troque a cada 7.500 km em uso urbano. Capacidade: 3,4 litros.' },
      { severity: 'OK',   title: 'Câmbio manual: troque o fluido a cada 60.000 km', body: 'O câmbio BE3 usa fluido 75W80 GL-4. Sem a troca, começa a "raspar" na 3ª marcha após 100.000 km. Capacidade: 1,9 litros.' },
      { severity: 'WARN', title: 'Nível de água: verifique semanalmente em carros com mais de 80.000 km', body: 'A carcaça plástica da válvula termostática e as mangueiras envelhecem e racham. Superaquecimento pode empenar a cabeça (reforma: R$ 1.800–R$ 3.500). Verificação semanal previne o pior.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Trinca no bloco do motor 1.4 8V em alta quilometragem', body: 'O bloco TU3 apresenta micro-trincas entre cilindros após superaquecimento ou alta km. Sintomas: nível d\'água cai sem vazamento visível, fumaça branca, óleo com aspecto leitoso. Reforma ou troca do motor: R$ 3.500–R$ 7.000. Sem recall oficial.' },
      { severity: 'DANGER', title: 'Correia dentada do motor 1.6 16V TU5: quebra = catástrofe', body: 'Motor interferente — correia com intervalo de 60.000 km ou 5 anos. Quebra = válvulas dobradas + reforma de cabeçote (R$ 4.000–R$ 8.000). Troque o kit completo: correia + tensor + roldana + bomba d\'água. Custo preventivo: R$ 600–R$ 1.200.' },
      { severity: 'WARN',   title: 'Válvula termostática: carcaça plástica racha com o tempo', body: 'A carcaça plástica da válvula termostática racha, causando perda de arrefecimento. Sintomas: mancha no chão, temperatura subindo. Peça original: R$ 80–R$ 150. Troca simples — não deixe acumular.' },
      { severity: 'WARN',   title: 'Câmbio AL4 automático: trancos e modo emergência', body: 'O C3 1.6 automático com câmbio AL4 de 4 marchas é temperamental. Trancos na troca 1→2 e travamento em 3ª (modo emergência) são clássicos. Troca de óleo a cada 40.000 km com ELF Renaultmatic D3 SYN previne boa parte. Reparo: R$ 1.500–R$ 5.000.' },
      { severity: 'WARN',   title: 'Buchas da bandeja e coxins desgastam cedo', body: 'As ruas esburacadas desgastam buchas da suspensão dianteira entre 30.000 e 50.000 km. Sintoma: batida ao passar em irregularidade, carro instável na frenagem. Kit completo: R$ 400–R$ 800.' },
      { severity: 'OK',     title: 'Lâmpadas do farol queimam com frequência', body: 'Os faróis halógenos H1/H7 têm vida útil baixa. Nunca toque a lâmpada nova com as mãos — a gordura queima o vidro e reduz a vida útil pela metade. Troca: R$ 25–R$ 60 por lâmpada.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo: 10W40 semissintético a cada 7.500–10.000 km', body: 'Motor TU3 1.4: 10W40 API SL/SM semissintético, capacidade 3,4 litros. Motor TU5 1.6: 5W40 API SL/SM sintético, capacidade 3,8 litros. No Brasil, prefira 7.500 km para uso urbano.' },
      { severity: 'OK',   title: 'Filtro de ar: troca a cada 15.000–20.000 km', body: 'Em regiões de terra ou alto tráfego, troque a cada 10.000 km. Filtro sujo aumenta o consumo em até 10%.' },
      { severity: 'WARN', title: 'Correia dentada TU5 1.6: kit completo a cada 60.000 km ou 5 anos', body: 'Kit: correia + tensor + roldana livre + bomba d\'água. Custo: R$ 600–R$ 1.200. Motor interferente — nunca passe de 60.000 km.' },
      { severity: 'OK',   title: 'Filtro de combustível: troca a cada 30.000 km', body: 'Gasolina brasileira tem mais impurezas. Troque a cada 30.000 km ou ao sentir perda de potência. Peça: R$ 40–R$ 80.' },
      { severity: 'OK',   title: 'Velas de ignição: troca a cada 30.000 km', body: 'Motor 1.4: NGK BKR6E. Motor 1.6: NGK BKR6EK (platina). Custo: R$ 15–R$ 35 cada.' },
      { severity: 'OK',   title: 'Fluido de freio DOT 4: troca a cada 2 anos ou 40.000 km', body: 'O fluido absorve umidade e reduz o ponto de ebulição. Pedal esponjoso em freadas contínuas é sinal de troca urgente. Capacidade: ~0,5 litro.' },
      { severity: 'OK',   title: 'Direção hidráulica: fluido LHM+ a cada 2 anos', body: 'Use APENAS fluido LHM+ (mineral, verde). Nunca use ATF vermelho — destrói as vedações internas da bomba e do rack.' },
    ],
  },

  // ── C3 — 2ª GERAÇÃO (2010–2016) ──────────────────────────────────────────────
  // Motores: TU3 1.4 8V, TU5 1.6 16V flex, EC5 1.5 8V

  {
    modelName: 'C3', yearFrom: 2010, yearTo: 2016,
    MACETES: [
      { severity: 'OK',   title: 'Limpe o TBI a cada 30.000 km', body: 'O TU5 1.6 16V flex acumula carbonização no corpo de borboleta com etanol, causando marcha lenta oscilante e engasgos. Limpeza com spray desmineralizado e algodão: R$ 80–R$ 150 em oficina.' },
      { severity: 'OK',   title: 'Prefira gasolina nos primeiros 5.000 km após reforma do motor', body: 'Se o motor passou por reforma, use gasolina nos primeiros 5.000 km. O etanol puro é mais agressivo nas juntas e guias novas.' },
      { severity: 'WARN', title: 'Câmbio AL4: não engate "P" com o carro em movimento', body: 'Em rampas, use o freio de mão para não sobrecarregar o pino de estacionamento. Engatar "P" com o carro ainda em movimento (mesmo devagar) danifica a trava mecânica e pode inutilizar o câmbio.' },
      { severity: 'OK',   title: 'Filtro do ar-condicionado: troque a cada 12.000 km', body: 'O filtro do habitáculo fica atrás do porta-luvas. Em cidades poluídas, troca a cada 10.000 km garante saúde e reduz carga no motor do ventilador.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Motor 1.5 8V EC5: trinca no bloco por superaquecimento', body: 'O EC5 1.5 herda o problema de trincas no bloco da família TU. Superaquecimento causado por válvula termostática vazando gera trinca entre cilindros. Reforma ou troca: R$ 3.500–R$ 8.000.' },
      { severity: 'DANGER', title: 'Correia dentada TU5 1.6: risco maior com etanol puro', body: 'Com etanol exclusivo, alguns relatos de quebra entre 40.000–55.000 km. Reduza o intervalo para 50.000 km se abastecer majoritariamente com álcool. Motor interferente.' },
      { severity: 'WARN',   title: 'Câmbio AL4: trancos e modo emergência (herança da 1ª geração)', body: 'AL4 de 4 marchas com os mesmos problemas. Troca de óleo a cada 40.000 km com ELF Renaultmatic D3 SYN. Instalação de radiador externo de óleo do câmbio (R$ 350–R$ 600) prolonga muito a vida útil.' },
      { severity: 'WARN',   title: 'Infiltração de água nos faróis', body: 'Os faróis do C3 2ª geração perdem a vedação, permitindo condensação interna. Umidade queima as lâmpadas. Solução: resselar com silicone neutro ou substituir (R$ 400–R$ 900).' },
      { severity: 'OK',     title: 'Luz de pressão de óleo acende em marcha lenta no 1.6 16V', body: 'Causas frequentes: sensor de pressão defeituoso (R$ 80–R$ 150), óleo de viscosidade errada (nunca use 20W50), ou bomba de óleo desgastada. Investigue antes que vire coisa séria.' },
      { severity: 'WARN',   title: 'Vidros elétricos com mau contato', body: 'Os interruptores dos vidros elétricos, especialmente porta traseira esquerda, fazem mau contato com o tempo. Troca do módulo: R$ 200–R$ 450.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo motor 1.6 TU5: 5W40 sintético a cada 10.000 km', body: 'Total Quartz 9000 5W40 ou equivalente API SN. Capacidade: 3,8 litros com filtro. Uso intenso em cidade: reduza para 7.500 km. Especificação PSA: B71 2296.' },
      { severity: 'OK',   title: 'Óleo motor 1.5 EC5: 10W40 semissintético a cada 10.000 km', body: '10W40 API SN semissintético. Capacidade: 3,4 litros. Intervalo: 7.500–10.000 km.' },
      { severity: 'WARN', title: 'Correia dentada TU5: kit completo a cada 60.000 km ou 5 anos', body: 'Correia + tensor + roldana + bomba d\'água obrigatório. Motor 1.4 TU3 usa CORRENTE (não precisa de troca periódica de correia). Custo kit correia TU5: R$ 600–R$ 1.200.' },
      { severity: 'OK',   title: 'Câmbio AL4: fluido ELF D3 SYN a cada 40.000 km', body: 'Use ELF Renaultmatic D3 SYN ou equivalente PSA. Volume de troca parcial: ~3,5 litros. Nunca use Dexron II genérico.' },
    ],
  },

  // ── C3 — 3ª GERAÇÃO (2017–presente) ─────────────────────────────────────────
  // Motores: EB2 1.2 PureTech 82cv (flex), EC5 1.6 16V (fase inicial)

  {
    modelName: 'C3', yearFrom: 2017, yearTo: null,
    MACETES: [
      { severity: 'WARN', title: 'PureTech 1.2: NUNCA use óleo fora da especificação B71 2312', body: 'O motor EB2 1.2 PureTech tem a correia dentada banhada em óleo do motor. Óleo errado (qualquer coisa que não seja 0W30 PSA B71 2312) degrada a borracha da correia. Correia degradada entope o pescador de óleo e gripa o motor. Use SEMPRE Total Quartz Ineo First 0W30 ou Castrol Edge 0W30 certificado B71 2312.' },
      { severity: 'OK',   title: 'Troque o anel vedante do bujão do cárter a cada troca de óleo', body: 'A Citroën especifica troca do anel vedante do bujão a cada troca de óleo no PureTech. Micro-vazamentos contaminam a correia banhada. Anel custa R$ 5–R$ 10 — custo zero para evitar R$ 15.000 de motor.' },
      { severity: 'OK',   title: 'Motor 3 cilindros: vibração suave em marcha lenta é normal', body: 'O EB2 é um motor de 3 cilindros. Vibração suave no câmbio e espelhos em marcha lenta é normal, especialmente a frio. Se excessiva, verifique os coxins (vida útil: 80.000–100.000 km).' },
      { severity: 'OK',   title: 'Regulador de vidro traseiro: peça plástica de vida curta', body: 'A guia plástica do regulador de vidro traseiro quebra com frequência entre 60.000–100.000 km. Sintoma: vidro que "cai" para dentro da porta. Peça original: R$ 150–R$ 300. Guarde uma reserva.' },
      { severity: 'OK',   title: 'Dreno do ar-condicionado: limpe a cada 20.000 km', body: 'O cano de dreno do evaporador entope com facilidade no Brasil (poeira, fungos). Limpeza evita que a água extravase para o interior do carro no passageiro.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Correia banhada a óleo: maior risco do C3 3ª geração', body: 'Correia degradada (por óleo errado ou troca atrasada) → fragmentos entopem o sistema de lubrificação → motor gripado. Reforma: R$ 8.000–R$ 15.000. Prevenção: 0W30 B71 2312 a cada 7.500–10.000 km. Troca preventiva da correia: 80.000 km ou 6 anos.' },
      { severity: 'WARN',   title: 'Falhas elétricas do módulo BSI', body: 'O módulo BSI pode apresentar falhas como janelas que não fecham, alarme acionando sozinho, luz de bateria acesa. Causa frequente: umidade infiltrando pelo para-brisa com vedação deficiente. Reset do BSI resolve temporariamente — corrija a vedação.' },
      { severity: 'WARN',   title: 'Consumo elevado de óleo no PureTech 1.2', body: 'Alguns exemplares consomem até 0,5 litro de óleo a cada 3.000 km. A PSA reconheceu o problema em lotes europeus com atualização de software e troca de anéis. No Brasil, verifique o nível mensalmente.' },
      { severity: 'OK',     title: 'Câmbio ETG6 robotizado: engata com atraso em manobras lentas', body: 'O ETG6 não é automático convencional — é manual automatizado. Atraso no engate em estacionamento é normal. Mantenha o freio durante trocas em baixa velocidade para suavizar o impacto. Troque o fluido 75W80 GL-4 a cada 60.000 km.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'ÚNICO óleo aprovado: Total Quartz Ineo First 0W30 (PSA B71 2312)', body: 'Motor EB2 1.2 PureTech: 0W30 sintético especificação PSA B71 2312. Equivalente: Castrol Edge 0W30 com certificação PSA. Capacidade: 3,5 litros com filtro. Intervalo: 10.000 km ou 12 meses — prefira 7.500 km no Brasil.' },
      { severity: 'WARN', title: 'Correia banhada a óleo: troca preventiva a cada 80.000 km ou 6 anos', body: 'Kit: correia + tensor + bomba d\'água. Concessionária: R$ 2.500–R$ 4.000. Oficina especializada PSA: R$ 1.200–R$ 2.500. Não deixe passar os 80.000 km — correia quebrada destrói o motor completamente.' },
      { severity: 'OK',   title: 'Filtro de ar: troca a cada 15.000 km', body: 'Motor 3 cilindros é sensível a ar sujo. Cidades com muito trânsito parado: 10.000 km. Filtro Purflux ou Mann.' },
      { severity: 'OK',   title: 'Filtro de cabine: troca a cada 10.000–12.000 km', body: 'Atrás do porta-luvas. Peça: R$ 30–R$ 80. Filtros com carvão ativado eliminam odores melhor.' },
      { severity: 'OK',   title: 'Velas de ignição: NGK ILZKBR7B8G a cada 30.000–40.000 km', body: 'Iridium, 3 unidades. Custo: R$ 50–R$ 80 cada. Velas desgastadas pioram muito o consumo do motor 3 cilindros.' },
    ],
  },

  // ── C3 AIRCROSS (2018–presente) ──────────────────────────────────────────────
  // Motores: EC5 1.5 8V (aspirado), 1.6 16V flex

  {
    modelName: 'C3 Aircross', yearFrom: 2018, yearTo: null,
    MACETES: [
      { severity: 'OK',   title: 'Grip Control: use Sand (areia) abaixo de 50 km/h', body: 'O Grip Control (5 modos de tração) funciona bem em lama e areia, mas o modo "Sand" deve ser usado abaixo de 50 km/h. Em velocidade alta, o sistema pode interferir na estabilidade. Em asfalto molhado, mantenha no modo "Auto".' },
      { severity: 'OK',   title: 'Pneus originais all-season: limitados em lama pesada', body: 'A Citroën equipa o Aircross com pneus all-season. Para uso off-road real em lama densa, troque por pneus AT (All Terrain). Os originais Michelin Cross Climate performam bem em mistos, mas escorregam em lama.' },
      { severity: 'OK',   title: 'Piso elevado: cuidado com calçadas altas ao estacionar', body: 'Com 182 mm de altura livre, o para-lama plástico pode encostar em bordas altas de calçada em manobras. Peça do para-lama: R$ 250–R$ 500.' },
      { severity: 'WARN', title: 'Sensor de estacionamento: calibre após troca do para-choque', body: 'Os sensores de ré precisam ser calibrados via scanner PSA após troca do para-choque. Sensor descalibrado dá alarme falso ou omite obstáculos reais.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Câmbio automático Aisin AT6: trancos após 50.000 km sem manutenção', body: 'Engate brusco entre 1ª e 2ª marcha após 50.000 km sem troca de fluido. Use ATF WS (Toyota/Aisin) ou JWS 3324 a cada 40.000 km. Reparo do câmbio: R$ 4.000–R$ 8.000.' },
      { severity: 'WARN', title: 'Suspensão dianteira: "toc-toc" nas bandejões', body: 'Som típico de buchas da bandeja dianteira nas irregularidades. Aparece entre 40.000–80.000 km. Troca de buchas: R$ 300–R$ 600 (par). Bucha quebrada afeta geometria e gasta pneu.' },
      { severity: 'WARN', title: 'Compressor do A/C Sanden: desgaste após 60.000 km em climas quentes', body: 'Uso contínuo de AC em climas quentes desgasta o compressor. Sintoma: rangido/estalo ao ligar o ar. Troca: R$ 1.200–R$ 2.500.' },
      { severity: 'OK',   title: 'Sensor de temperatura NTC: ventoinha acionando cedo', body: 'Sensor NTC com deriva causa ventoinha ligando excessivamente. Troca simples: R$ 60–R$ 150.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo motor 1.5/1.6 aspirado: 5W40 semissintético a cada 10.000 km', body: 'EC5 1.5 e 1.6 aspirados: 5W40 API SN semissintético (Total Quartz 7000 ou similar). Capacidade 1.5: 3,4 L; 1.6: 3,8 L. Especificação PSA: B71 2296.' },
      { severity: 'WARN', title: 'Câmbio automático ATF: troca a cada 40.000 km', body: 'Fluido ATF aprovado Aisin WS ou JWS 3324. Volume: 4–5 litros (troca parcial). NUNCA use Dexron III genérico no AT6.' },
      { severity: 'OK',   title: 'Correia dentada EC5 1.5/1.6: kit completo a cada 80.000 km', body: 'Kit com tensor e bomba d\'água. Custo: R$ 600–R$ 1.000.' },
      { severity: 'OK',   title: 'Filtros: ar a cada 15.000 km; cabine a cada 12.000 km', body: 'Em estradas de terra: filtro de ar a cada 10.000 km.' },
    ],
  },

  // ── C4 HATCH (2004–2014) ─────────────────────────────────────────────────────
  // Motores: TU5 1.6 16V flex, EW10A 2.0 16V flex

  {
    modelName: 'C4 Hatch', yearFrom: 2004, yearTo: 2014,
    MACETES: [
      { severity: 'OK',   title: 'Motor 2.0 EW10: o mais robusto da linha C4', body: 'O EW10J4 2.0 16V é de alta durabilidade quando bem mantido. Correia dentada a cada 60.000–80.000 km no Brasil (manual diz 80k). Kit completo: correia + tensor + roldana + bomba d\'água (R$ 800–R$ 1.500).' },
      { severity: 'WARN', title: 'Direção elétrica: não force no batente por mais de 5 segundos', body: 'A direção elétrica do C4 Hatch sobreaquece se você mantiver o volante no batente em manobras longas. Rack elétrico: R$ 2.500–R$ 5.000 — a peça mais cara do carro.' },
      { severity: 'OK',   title: 'Nível d\'água: verifique a cada 15 dias', body: 'O trocador de calor do câmbio automático pode vazar e contaminar o fluido de arrefecimento com ATF. Água cor de ferrugem ou com cheiro de queimado = sinal de alerta grave.' },
      { severity: 'OK',   title: 'Botões no volante: spray de contato limpa anualmente', body: 'Os botões do painel/volante perdem contato com o tempo. Uma vez por ano, spray de contato restaura o funcionamento.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Câmbio AL4 automático: falha crônica nos solenoides', body: 'Solenoides (eletroválvulas) do corpo de válvulas falham entre 60.000–100.000 km. Sintomas: trancos, modo emergência (3ª marcha fixa), luz "Service". Substituição do corpo de válvulas: R$ 2.500–R$ 5.000. Câmbio recondicionado: R$ 5.000–R$ 8.000.' },
      { severity: 'DANGER', title: 'Cabeçote do motor 2.0 fissura por superaquecimento', body: 'Qualquer episódio de superaquecimento pode fissurar o cabeçote de alumínio. Retífica: R$ 1.500–R$ 3.000. Cabeçote novo: R$ 2.500–R$ 4.500. Monitore o nível de água constantemente.' },
      { severity: 'WARN',   title: 'Lâmpadas do farol queimam com frequência', body: 'Os focos H1 do C4 Hatch têm alojamento que acumula calor. Relatos de 3 trocas em 20.000 km. Use Osram ou Philips e nunca toque o vidro.' },
      { severity: 'WARN',   title: 'Suspensão dianteira: bieletas e coxins com vida curta', body: 'Bieletas da barra estabilizadora trocadas antes de 20.000 km em relatos brasileiros. Coxins com menos de 60.000 km. Bieletas: R$ 200–R$ 400 (par). Coxins: R$ 300–R$ 600.' },
      { severity: 'OK',     title: 'Mensagem "Defeito antipoluição" no painel', body: 'Falhas na sonda lambda, sensor de NOx, catalisador ou injeção. Diagnóstico por scanner PSA necessário. Muitas vezes é apenas um sensor — R$ 150–R$ 400 para resolver.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 2.0 EW10: 5W40 sintético a cada 10.000 km', body: 'Total Quartz 9000 5W40 ou Castrol Edge 5W40 API SN. Capacidade: 5,5 litros com filtro. Especificação PSA: B71 2296.' },
      { severity: 'OK',   title: 'Óleo 1.6 TU5: 5W40 semissintético a cada 10.000 km', body: '5W40 API SN. Capacidade: 3,8 litros. Não use 20W50 — prejudica o motor.' },
      { severity: 'WARN', title: 'Correia dentada 2.0 EW10: kit completo a cada 80.000 km', body: 'Correia + 2 tensores + bomba d\'água. Custo oficial: R$ 1.000–R$ 1.800. Motor interferente — quebra = cabeçote destruído.' },
      { severity: 'OK',   title: 'Velas de ignição: troca a cada 30.000 km', body: 'Motor 2.0: NGK BKR5E-11 ou Bosch F7LTCR. Motor 1.6: NGK BKR6E. Custo: R$ 15–R$ 40/unidade.' },
      { severity: 'OK',   title: 'Câmbio AL4: fluido ELF D3 SYN a cada 40.000 km', body: 'ELF Renaultmatic D3 SYN (PSA aprovado). Volume de troca parcial: 3–3,5 litros. Imprescindível para longevidade do câmbio.' },
    ],
  },

  // ── C4 PALLAS / C4 SEDAN (2007–2014) ────────────────────────────────────────
  // Motores: TU5 1.6 16V, EW10 2.0 16V

  {
    modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014,
    MACETES: [
      { severity: 'WARN', title: 'Trocador de calor do câmbio AL4: inspecione a cada 30.000 km', body: 'O Pallas 2.0 automático tem trocador de calor integrado ao coletor. Quando perfura, contamina o fluido do câmbio com água — ou vice-versa. Câmbio destruído em seguida. Verifique se o fluido de arrefecimento tem cor avermelhada (contaminação com ATF).' },
      { severity: 'OK',   title: 'Porta-malas de 470 litros: não sobrecarregue o eixo traseiro', body: 'Com mais de 400 kg de carga total (4 adultos + bagagem), o comportamento direcional piora e os amortecedores traseiros sofrem mais. Eixo de torção tem limite.' },
      { severity: 'OK',   title: 'Direção hidráulica: use fluido LHM+ exclusivamente', body: 'A direção do Pallas usa fluido LHM+ mineral verde. Nunca use ATF vermelho — destrói as vedações do rack (R$ 2.500–R$ 5.000).' },
      { severity: 'OK',   title: 'Câmbio AL4 com defeito: peça orçamento de troca do corpo de válvulas antes de aceitar reforma completa', body: 'Muitos problemas do câmbio AL4 (trancos, engate difícil, redução antecipada) têm origem no corpo de válvulas (valve body), não na caixa inteira. Trocar só o corpo de válvulas custa entre R$ 1.500 e R$ 3.000 — bem menos que os R$ 4.000–R$ 11.000 de uma reforma completa. Antes de fechar orçamento de reforma total, peça para o mecânico avaliar se o corpo de válvulas resolve o seu caso específico.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Câmbio AL4: custo de reparo entre R$ 4.000 e R$ 11.000', body: 'Solenoides falham entre 60.000–100.000 km — há relatos com menos de 20.000 km. A PSA nunca emitiu recall. Prevenção: troca de fluido a cada 40.000 km com ELF D3 SYN. Reparo completo: R$ 5.000–R$ 11.000.' },
      { severity: 'DANGER', title: 'Trocador de calor do câmbio: perfuração contamina óleo', body: 'Exclusivo dos modelos 2.0 automático. A perfuração mistura água e ATF, destruindo o câmbio rapidamente. Custo de reparo total: R$ 8.000–R$ 15.000. Prevenção: instale radiador externo de óleo de câmbio (R$ 350–R$ 600).' },
      { severity: 'WARN',   title: 'Amortecedores traseiros com vida curta', body: 'Desgaste antes de 60.000 km relatado frequentemente. Sintoma: carro "quicando" em ondulações. Troca em par: R$ 500–R$ 1.200.' },
      { severity: 'WARN',   title: 'Sensor de temperatura NTC: leituras erradas causam superaquecimento', body: 'Sensor NTC com defeito faz a ventoinha não acionar no momento certo. Peça barata (R$ 60–R$ 120), mas pode destruir o motor se ignorado.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 2.0 EW10: 5W40 sintético a cada 10.000 km', body: 'Total Quartz 9000 5W40 ou Castrol Edge 5W40 API SN. Capacidade: 5,5 litros. B71 2296.' },
      { severity: 'WARN', title: 'Correia dentada 2.0 EW10: kit completo a cada 80.000 km', body: 'No Brasil por segurança: 60.000–70.000 km. Kit: correia + tensores + bomba. Custo: R$ 1.000–R$ 1.800.' },
      { severity: 'WARN', title: 'Câmbio AL4: fluido ELF D3 SYN a cada 40.000 km + radiador externo', body: 'ELF Renaultmatic D3 SYN obrigatório. Instale radiador externo de óleo de câmbio: R$ 350–R$ 600 de investimento que pode salvar R$ 10.000 de câmbio.' },
      { severity: 'OK',   title: 'Filtro de combustível: troca a cada 30.000 km', body: 'Localizado sob o assoalho. Peça: R$ 50–R$ 100.' },
    ],
  },

  // ── C4 CACTUS (2017–2022) ────────────────────────────────────────────────────
  // Motores: EC5 1.6 16V flex aspirado, THP 1.6 16V turbo (EP6)

  {
    modelName: 'C4 Cactus', yearFrom: 2017, yearTo: 2022,
    MACETES: [
      { severity: 'OK',   title: 'Airbumps: protetor UV a cada 6 meses', body: 'Os amortecedores de impacto laterais (airbumps) são poliuretano e desbotam no sol. Aplique protetor de borracha com UV a cada 6 meses. Absorvem arranhões de porta, mas batidas fortes deixam marcas permanentes.' },
      { severity: 'OK',   title: 'THP turbo: aqueça 3 minutos antes de exigir performance', body: 'O 1.6 THP precisa de aquecimento para o óleo lubrificar o turbo corretamente. Arrancadas a frio desgastam os mancais. Após uso intenso, aguarde 2–3 minutos antes de desligar (cooling down).' },
      { severity: 'WARN', title: 'THP: use gasolina aditivada — etanol puro agrava a carbonização', body: 'O THP tem injeção direta. Etanol puro não lava as válvulas de admissão, que acumulam carbono. Use pelo menos 50% de gasolina aditivada. A cada 30.000 km, faça descarbonização via admissão.' },
      { severity: 'OK',   title: 'Câmbio EAT6: use modo Sport em subidas e descidas longas', body: 'Em trechos longos de subida/descida, use modo Sport ou paletas para evitar que o câmbio fique em "dúvida" entre marchas — o que sobreaquece o conversor de torque.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Motor THP 1.6 EP6: carbonização crônica das válvulas de admissão', body: 'Falha crônica mundial do EP6/Prince. Carbono deposita nas válvulas (injeção direta não as lava). Sintomas: engasgo ao acelerar, perda de potência, consumo alto, misfire. Limpeza química: R$ 500–R$ 800. Limpeza mecânica (retira cabeçote): R$ 1.500–R$ 3.000.' },
      { severity: 'DANGER', title: 'THP EP6: falha no kit de corrente — barulho na partida a frio', body: 'A corrente de distribuição e seus tensores falham cronicamente. Barulho metálico nos primeiros segundos após a partida a frio é o sinal clássico. Kit de corrente: R$ 1.800–R$ 3.500. PSA fez atualização nos tensores — exija na concessionária.' },
      { severity: 'WARN',   title: 'THP EP6: tampa de válvulas vaza óleo sobre a correia do acessório', body: 'A junta da tampa endurece e vaza óleo sobre a correia acessória. Risco de incêndio e quebra prematura da correia. Tampa + junta: R$ 800–R$ 1.500.' },
      { severity: 'WARN',   title: 'Câmbio EAT6 Aisin: trancos após 50.000 km sem manutenção', body: 'Engates bruscos quando o ATF não é trocado. Troca a cada 40.000 km. Reparo: R$ 4.000–R$ 8.000.' },
      { severity: 'OK',     title: 'Suspensão: "toc-toc" típico de buchas desgastadas', body: 'Buchas da bandeja dianteira, coxim do amortecedor e bieletas entre 40.000–80.000 km. Revisão completa da suspensão: R$ 800–R$ 1.800.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Óleo THP 1.6 EP6: OBRIGATÓRIO 0W30 PSA B71 2302', body: 'Total Quartz Ineo First 0W30 (B71 2302 ou equivalente B71 2312). Capacidade: 4,25 litros. Intervalo: 10.000 km (ideal: 7.500 km). Óleo errado acelera carbonização e desgasta os tensores da corrente.' },
      { severity: 'OK',   title: 'Óleo motor 1.6 EC5 aspirado: 5W40 semissintético a cada 10.000 km', body: '5W40 API SN, capacidade 3,8 litros. PSA B71 2296.' },
      { severity: 'WARN', title: 'Correia dentada EC5 1.6: kit completo a cada 80.000 km ou 4 anos', body: 'Correia + tensor + roldana. Custo: R$ 600–R$ 1.000.' },
      { severity: 'OK',   title: 'Câmbio EAT6: ATF WS a cada 40.000 km', body: 'ATF WS (Toyota/Aisin) ou JWS 3324. Volume: 4–5 litros. Nunca pule esta manutenção.' },
      { severity: 'OK',   title: 'Velas THP: NGK LKR7B-10 iridium a cada 30.000 km', body: '4 unidades. Custo: R$ 60–R$ 100/unidade. Velas desgastadas no THP provocam misfire e aceleram a carbonização.' },
    ],
  },

  // ── C4 LOUNGE (2014–2019) ────────────────────────────────────────────────────
  // Motores: THP 1.6 16V turbo (EP6), câmbio EAT6 Aisin

  {
    modelName: 'C4 Lounge', yearFrom: 2014, yearTo: 2019,
    MACETES: [
      { severity: 'WARN', title: 'THP + EAT6: combinação prazerosa mas exige disciplina rigorosa', body: 'A dupla THP + EAT6 entrega 173 cv mas tanto o motor quanto o câmbio exigem manutenção rigorosa. Qualquer desvio no óleo do motor (fora do B71 2302) ou no ATF do câmbio resulta em problemas sérios e caros.' },
      { severity: 'OK',   title: 'Use apenas gasolina aditivada de posto movimentado', body: 'O THP com injeção direta a 200 bar é sensível a combustível de má qualidade. Gasolina de posto pouco movimentado pode ter mais etanol do que o declarado, causando falhas de ignição.' },
      { severity: 'OK',   title: 'Aguarde 2 minutos em marcha lenta antes de desligar após uso intenso', body: 'O turbo precisa de circulação de óleo para resfriar. Não desligue imediatamente após rodovias ou subidas longas. Cooling down: 2 minutos em marcha lenta.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'EP6 THP: carbonização das válvulas + falha da corrente', body: 'Carbonização das válvulas de admissão e falha nos tensores da corrente são os maiores problemas. Barulho metálico na partida fria = kit de corrente urgente (R$ 1.800–R$ 3.500). Carbonização: descarbonização a cada 30.000 km.' },
      { severity: 'DANGER', title: 'Trocador de calor do câmbio EAT6: perfuração contamina tudo', body: 'O trocador de calor integrado ao bloco pode perfurar, misturando água no câmbio ou ATF no arrefecimento. Câmbio destruído em seguida. Custo: R$ 8.000–R$ 15.000. Inspecione a cor do fluido de arrefecimento a cada 20.000 km.' },
      { severity: 'WARN',   title: 'Consumo excessivo de óleo no THP acima de 80.000 km', body: '0,3–0,7 litro de óleo a cada 3.000 km em exemplares com mais de 80.000 km. A PSA atualizou software de injeção e anéis em alguns lotes. Verifique o nível a cada abastecimento.' },
      { severity: 'WARN',   title: 'Tampa de válvulas: vazamento de óleo sobre correia acessória', body: 'Junta da tampa de válvulas endurece e vaza. Óleo sobre a correia = risco de desgaste e incêndio. Troca preventiva da junta: R$ 400–R$ 800.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'ÚNICO óleo aprovado: Total Quartz Ineo First 0W30 (PSA B71 2302)', body: 'Capacidade: 4,25 litros. Intervalo máximo: 10.000 km (ideal: 7.000–8.000 km). 5W40, 10W40 ou qualquer outro grau aumenta deposição de carbono e desgasta a corrente.' },
      { severity: 'WARN', title: 'Câmbio EAT6: ATF WS a cada 40.000 km (urgente)', body: 'ATF aprovado Aisin WS. Volume: 4–5 litros. Câmbio EAT6 reconstruído: R$ 8.000–R$ 12.000. Não pule esta manutenção.' },
      { severity: 'OK',   title: 'Kit corrente THP: inspeção a cada 60.000 km', body: 'Tensores frágeis. Inspeção obrigatória a cada 60.000 km. Troca preventiva do kit: R$ 1.800–R$ 3.500. Corrente quebrada = motor destruído.' },
      { severity: 'OK',   title: 'Velas iridium: NGK LKR7B-10 a cada 30.000 km', body: '4 unidades. Custo: R$ 60–R$ 100/unidade. Velas desgastadas no THP provocam misfire e aceleram carbonização.' },
      { severity: 'OK',   title: 'Filtro de cabine: troca a cada 10.000 km', body: 'Sistema de A/C de alto desempenho. Filtre bem para não sobrecarregar o compressor.' },
    ],
  },

  // ── C5 (2008–2013) ───────────────────────────────────────────────────────────
  // Motor: 2.0 16V Flex (EW10). Suspensão: Hydractive 3+ hidropneumática

  {
    modelName: 'C5', yearFrom: 2008, yearTo: 2013,
    MACETES: [
      { severity: 'WARN', title: 'Fluido LDS: use SOMENTE o fluido mineral amarelo Citroën', body: 'A suspensão Hydractive 3+ usa fluido LDS (Total LDS, amarelo). Jamais use ATF vermelho ou substitutos — destrói vedações de borracha de todo o sistema (esferas, bomba, cilindros). Revisão geral: R$ 8.000–R$ 15.000.' },
      { severity: 'OK',   title: 'Modos de altura: não deixe sempre no mínimo', body: 'Usar sempre a altura mínima ("Low") desgasta as esferas mais rápido. Para uso urbano diário, use altura normal. "Low" é para rodovias de alta velocidade.' },
      { severity: 'OK',   title: 'Carro parado por mais de 48h: altura pode cair um pouco', body: 'É normal o C5 abaixar levemente quando parado por dias (pequena perda de pressão nas esferas). Ao ligar, sobe em 10–15 segundos. Se demorar mais ou não subir: esfera ou bomba com problema.' },
      { severity: 'WARN', title: 'Mecânicos sem experiência em Hydractive podem causar mais dano', body: 'A suspensão hidropneumática exige conhecimento específico. Sempre use oficina especializada em veículos franceses. Um mecânico comum pode contaminar o sistema. Custo de erro: R$ 5.000–R$ 12.000.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Esferas hidropneumáticas: perda de gás após 60.000–80.000 km', body: 'Cada esfera contém nitrogênio separado por membrana. Com o tempo, o gás vaza e a suspensão fica rígida (carro "sentado"). Uma esfera: R$ 600–R$ 900. Kit completo (4 esferas): R$ 2.400–R$ 3.600. Troca preventiva a cada 80.000 km.' },
      { severity: 'DANGER', title: 'Câmbio automático AL4: falha nos solenoides', body: 'O C5 2.0 automático até 2010 usou o AL4 problemático. Trancos, modo emergência, solenoides defeituosos. Reparo: R$ 2.000–R$ 8.000.' },
      { severity: 'WARN',   title: 'Bomba hidráulica da suspensão: vazamento após 100.000 km', body: 'Vazamento interno causa queda rápida do nível de fluido LDS. Bomba reconstruída: R$ 1.500–R$ 3.000. Bomba nova: R$ 4.000–R$ 7.000.' },
      { severity: 'WARN',   title: 'Motor 2.0 EW10: correia dentada e superaquecimento', body: 'Mesmo motor do C4 Hatch. Correia dentada a cada 60.000–80.000 km. Superaquecimento pode fissurar o cabeçote. Trocador de calor do câmbio é ponto vulnerável nos automáticos.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo motor 2.0 EW10: 5W40 sintético a cada 10.000 km', body: 'Total Quartz 9000 5W40 ou similar API SN. Capacidade: 5,5 litros. B71 2296.' },
      { severity: 'WARN', title: 'Fluido LDS da suspensão: troca a cada 40.000 km', body: 'Total LDS (amarelo, mineral). Capacidade: 4–5 litros. Custo: ~R$ 180/litro = R$ 720–R$ 900 por troca. Fluido velho corrói as vedações. Obrigatório em oficina especializada com equipamento de pressurização.' },
      { severity: 'WARN', title: 'Correia dentada 2.0 EW10: kit completo a cada 80.000 km', body: 'Motor interferente. Kit com bomba d\'água. Custo: R$ 1.000–R$ 1.800.' },
      { severity: 'OK',   title: 'Fluido de freio DOT 4: troca a cada 2 anos', body: 'O C5 tem ABS + ESP + sistema hidropneumático. Fluido contaminado afeta a modulação do ABS.' },
      { severity: 'OK',   title: 'Velas de ignição: NGK BKR5E-11 a cada 30.000 km', body: '4 unidades para o EW10 2.0.' },
    ],
  },

  // ── XSARA (1998–2006) ────────────────────────────────────────────────────────
  // Motores: TU3 1.4 8V, TU5 1.6 16V

  {
    modelName: 'Xsara', yearFrom: 1998, yearTo: 2006,
    MACETES: [
      { severity: 'OK',   title: 'Peças Peugeot 206 são intercambiáveis — economize até 30%', body: 'O Xsara compartilha plataforma com o Peugeot 206/207: filtros, correias, amortecedores dianteiros, componentes elétricos. Peças de Peugeot costumam ser mais baratas e mais fáceis de encontrar.' },
      { severity: 'WARN', title: 'Relé da ventoinha: item de reserva obrigatório no porta-luvas', body: 'O relé da ventoinha do radiador queima com frequência no Xsara, especialmente no verão. O carro superaquece no trânsito sem aviso. Tenha um relé reserva (R$ 20–R$ 50) sempre consigo.' },
      { severity: 'OK',   title: 'Limpeza do TBI 1.6 16V a cada 30.000 km', body: 'O corpo de borboleta do TU5 acumula verniz e carbono. Limpeza melhora a marcha lenta e elimina engasgos. Custo: R$ 80–R$ 150.' },
      { severity: 'WARN', title: 'Motor de arranque: evite ruas alagadas', body: 'O motor de arranque do Xsara fica posicionado de forma que a entrada de água causa curto interno. Reforma: R$ 300–R$ 600.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Correia dentada TU5: quebra causa dano severo ao cabeçote', body: 'O TU5JP4 1.6 16V é interferente. Troca a cada 60.000 km. Quebra = válvulas dobradas = retífica do cabeçote (R$ 2.000–R$ 4.500). Muitos Xsaras foram sucateados por essa causa.' },
      { severity: 'DANGER', title: 'Câmbio AL4: trancos crônicos e sem recall da PSA', body: 'Câmbio AL4 com todos os problemas da linha PSA. Trancos, modo emergência. Troca de fluido a cada 40.000 km obrigatória. Reparo: R$ 2.000–R$ 6.000.' },
      { severity: 'WARN',   title: 'Válvula termostática presa: superaquecimento silencioso', body: 'Presa na posição aberta = motor não atinge temperatura ideal (consumo alto). Presa na posição fechada = superaquecimento. Troca da peça: R$ 80–R$ 150.' },
      { severity: 'WARN',   title: 'Carbonização das válvulas 1.6 16V com etanol', body: 'Motor TU5 com uso intenso de etanol acumula carbono nas válvulas. Perda de potência, marcha lenta oscilante. Limpeza: R$ 150–R$ 400.' },
      { severity: 'WARN',   title: 'Evaporador do A/C vaza — desmontagem completa do painel', body: 'Evaporador vazando exige remoção quase completa do painel para acesso. Mão de obra: R$ 1.500–R$ 3.000. Evaporador: R$ 300–R$ 600.' },
      { severity: 'OK',     title: 'Coifas das semieixas: troca quando racham', body: 'Coifas racham com o tempo, permitindo saída de graxa e entrada de sujeira. Troca preventiva antes de danificar o cubo. Kit: R$ 40–R$ 80 por lado.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo motor 1.6 TU5: 5W40 semissintético a cada 7.500 km', body: '5W40 API SL/SM. Capacidade: 3,8 litros. Intervalo de 7.500 km é mais seguro para carros com mais de 100.000 km.' },
      { severity: 'WARN', title: 'Correia dentada TU5: kit completo a cada 60.000 km ou 5 anos', body: 'Correia + tensor + roldana + bomba d\'água. Custo: R$ 500–R$ 900. Nunca passe dos 60.000 km — motor interferente.' },
      { severity: 'OK',   title: 'Filtro de combustível: troca a cada 20.000–30.000 km', body: 'Xsara mais antigos têm filtro de combustível no motor. Troca previne falhas de injeção.' },
      { severity: 'OK',   title: 'Câmbio AL4: fluido ELF D3 SYN a cada 40.000 km', body: 'Volume: 3–3,5 litros na troca parcial. Nunca ignore.' },
    ],
  },

  // ── XSARA PICASSO (2001–2012) ────────────────────────────────────────────────
  // Motores: TU5 1.6 16V, EW10 2.0 16V

  {
    modelName: 'Xsara Picasso', yearFrom: 2001, yearTo: 2012,
    MACETES: [
      { severity: 'OK',   title: 'Porta deslizante traseira: lubrifique o trilho a cada 6 meses', body: 'A porta lateral deslizante trava e range quando o trilho está seco. Graxa de lítio ou silicone em spray mantém o funcionamento suave. Previne quebra dos roletes (R$ 200–R$ 500 para trocar).' },
      { severity: 'OK',   title: 'Nível de óleo: verifique a cada 1.000 km', body: 'O Xsara Picasso 1.6 e 2.0 tem consumo médio de 0,3–0,5 litro de óleo a cada 3.000 km após 100.000 km. Nível baixo = danos por lubrificação insuficiente.' },
      { severity: 'WARN', title: 'CMF do câmbio AL4: item de manutenção programada', body: 'O Comutador Multifuncional de Marchas (CMF) é peça de desgaste conhecida. Quando falha: mensagem "Anomalia na caixa automática" e câmbio trava em 3ª. Troca preventiva com o câmbio aberto: R$ 200–R$ 500. Evita R$ 3.000–R$ 7.000 de reparo.' },
      { severity: 'OK',   title: 'Interior amplo: cuidado com sobrepeso no eixo traseiro', body: 'Com 5 lugares e porta-malas de 550 litros, é fácil sobrecarregar. O eixo de torção traseiro não tolera cargas constantes acima de 350 kg. Amortecedores relatados com 30.000 km em uso pesado.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Câmbio AL4: CMF falho causa travamento em 3ª marcha', body: 'O CMF do AL4 é a causa mais comum de "Anomalia na caixa automática". Câmbio entra em modo emergência (3ª marcha). Para temporariamente: para o carro, coloque em "D" e religue. Solução definitiva: troca do CMF ou reparo do câmbio (R$ 1.500–R$ 7.000).' },
      { severity: 'DANGER', title: 'Correia dentada TU5 1.6: quebra causa dano severo ao cabeçote', body: 'Motor TU5JP4 interferente. Troca a cada 60.000 km. Quebra = válvulas dobradas = cabeçote destruído (R$ 2.500–R$ 5.000).' },
      { severity: 'WARN',   title: 'Consumo excessivo de óleo nos motores 1.6 e 2.0', body: 'Picassos com mais de 100.000 km consomem 0,5–1 litro a cada 2.500–3.000 km. Guias e retentores de válvulas desgastados. Verificação do nível obrigatória a cada 1.000 km.' },
      { severity: 'WARN',   title: 'Superaquecimento: válvula termostática e mangueiras', body: 'Mangueiras ressequidas e termostato preso causam superaquecimento. Inspeção das mangueiras a cada 30.000 km. Substituição preventiva após 80.000 km.' },
      { severity: 'OK',     title: 'Evaporador do A/C: desmontagem quase completa do painel', body: 'Evaporador vazando exige remoção quase completa do painel. Mão de obra pesada: R$ 1.500–R$ 3.500.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo motor 1.6: 5W40 semissintético a cada 7.500–10.000 km', body: 'API SN/SL, 5W40. Capacidade 1.6: 3,8 litros. Motor 2.0 EW10: 5W40 sintético, 5,5 litros.' },
      { severity: 'WARN', title: 'Correia dentada 1.6 TU5: kit completo a cada 60.000 km', body: 'Correia + tensor + roldana + bomba d\'água. Custo: R$ 600–R$ 1.000.' },
      { severity: 'WARN', title: 'Câmbio AL4: fluido ELF D3 SYN a cada 40.000 km', body: 'Troca a cada 40.000 km. Instale radiador externo de óleo do câmbio se possível (R$ 350–R$ 600).' },
      { severity: 'OK',   title: 'Motor 2.0 EW10: correia a cada 60.000–80.000 km', body: 'Kit EW10: correia + tensores + bomba d\'água. Custo: R$ 900–R$ 1.500.' },
    ],
  },

  // ── C3 PICASSO (2011–2017) ───────────────────────────────────────────────────
  // Motor: TU5 1.6 16V flex

  {
    modelName: 'C3 Picasso', yearFrom: 2011, yearTo: 2017,
    MACETES: [
      { severity: 'OK',   title: 'Calibre os pneus semanalmente: perde pressão mais rápido que a média', body: 'Donos relatam perda de 2–3 PSI por semana nos pneus do C3 Picasso. Hábito de verificação semanal é recomendado. Use 32 PSI nas 4 rodas sem carga e 35 PSI com carga total.' },
      { severity: 'OK',   title: 'Porta deslizante lateral: o mesmo cuidado do Xsara Picasso', body: 'Lubrificação do trilho da porta deslizante a cada 6 meses com graxa de lítio evita travas e desgaste dos roletes.' },
      { severity: 'OK',   title: 'Banco traseiro deslizante: posicione para máximo conforto em viagens', body: 'O banco traseiro deslizante do C3 Picasso não existe nos concorrentes. Em viagens com família, ajuste para o máximo de conforto do banco de trás.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Correia dentada TU5 1.6: quebra destrói o cabeçote', body: 'Motor TU5JP4 interferente. Correia a cada 60.000 km. Quebra = cabeçote destruído (R$ 3.000–R$ 5.000). Muitos C3 Picasso comprados usados desconhecem a última troca.' },
      { severity: 'WARN',   title: 'Câmbio AL4: trancos no engate 1→2', body: 'Versões automáticas com AL4 apresentam o tranco característico na troca 1→2. Fluido a cada 40.000 km + radiador externo melhoram o comportamento.' },
      { severity: 'WARN',   title: 'Superaquecimento por termostato e mangueiras', body: 'Herda os mesmos pontos fracos do arrefecimento da família TU. Inspecione mangueiras e termostato a cada 40.000 km.' },
      { severity: 'OK',     title: 'Faróis halógenos com vida útil baixa', body: 'H1/H7 com desgaste médio. Use lâmpadas Osram ou Philips e não toque o vidro com a mão.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo motor 1.6 TU5: 5W40 semissintético a cada 10.000 km', body: '5W40 API SN, capacidade 3,8 litros. Intervalo 7.500 km recomendado para uso intenso em cidade.' },
      { severity: 'WARN', title: 'Correia dentada TU5: kit completo a cada 60.000 km', body: 'Correia + tensor + roldana + bomba d\'água. Custo: R$ 600–R$ 1.000.' },
      { severity: 'OK',   title: 'Velas de ignição: NGK BKR6E a cada 30.000 km', body: '4 unidades. Custo: R$ 15–R$ 35 cada.' },
    ],
  },

  // ── BERLINGO (2002–2012) ─────────────────────────────────────────────────────
  // Motores: TU3 1.4 8V, TU5 1.6 16V

  {
    modelName: 'Berlingo', yearFrom: 2002, yearTo: 2012,
    MACETES: [
      { severity: 'OK',   title: 'Peças Peugeot Partner são intercambiáveis — economia de até 30%', body: 'O Berlingo e o Peugeot Partner são quase irmãos gêmeos. A maioria das peças mecânicas, elétricas e de suspensão são intercambiáveis. Partner é mais fácil de encontrar e até 30% mais barato.' },
      { severity: 'OK',   title: 'Dobradiças da porta traseira: lubrifique semestralmente', body: 'Porta traseira duplamente articulada (tipo van). Lubrifique as dobradiças com graxa a cada 6 meses. Dobradiça emperrada forçada pode arrancar a solda do caixilho da carroceria.' },
      { severity: 'WARN', title: 'Cabo do acelerador: inspecione anualmente (versões pré-2007)', body: 'O cabo do acelerador pode se romper ou embalar. Sintoma: resposta lenta ou acelerador preso. Troca simples: R$ 80–R$ 150.' },
      { severity: 'OK',   title: 'PBT máxima de 1.800 kg: não ultrapasse', body: 'Sobrecarga crônica compromete a suspensão traseira, caixas de roda e até a estrutura do veículo.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Correia dentada TU5 1.6 quebra sem avisar', body: 'Motor TU5 interferente — quebra da correia destrói o cabeçote instantaneamente (R$ 3.000–R$ 6.000). Troca a cada 60.000 km ou 5 anos. Muitos Berlingos usados nunca tiveram a correia trocada.' },
      { severity: 'WARN',   title: 'Superaquecimento: mangueiras ressecam mais cedo em uso de carga', body: 'Uso como veículo de carga com motor sempre trabalhando muito (subidas, carga pesada) acelera envelhecimento das mangueiras. Inspeção visual a cada 20.000 km.' },
      { severity: 'WARN',   title: 'Suspensão traseira: molas e amortecedores com vida curta em uso de carga', body: 'Em uso de carga regular, amortecedores traseiros duram 40.000–60.000 km. Troca em par obrigatória. Misturar marcas pode causar comportamento assimétrico.' },
      { severity: 'OK',     title: 'Alternador: sintoma de fraqueza em alta quilometragem com carga pesada', body: 'Berlingo de alta km com carga pesada exige mais do alternador. Bateria que não mantém carga, lâmpadas pulsantes = alternador fraco. Recondicionado: R$ 400–R$ 700.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo motor 1.4 TU3: 10W40 semissintético a cada 7.500 km', body: '10W40 API SL/SM. Capacidade: 3,4 litros. Para carga pesada e uso intenso, reduza para 5.000–7.000 km.' },
      { severity: 'OK',   title: 'Óleo motor 1.6 TU5: 5W40 semissintético a cada 7.500–10.000 km', body: '5W40 API SN. Capacidade: 3,8 litros.' },
      { severity: 'WARN', title: 'Correia dentada 1.6 TU5: kit completo a cada 60.000 km', body: 'Correia + tensor + roldana + bomba d\'água. Motor 1.4 TU3 usa CORRENTE (não troca). Custo kit correia 1.6: R$ 500–R$ 900.' },
      { severity: 'OK',   title: 'Filtros: ar a cada 10.000–15.000 km; combustível a cada 20.000 km', body: 'Para uso em estradas de terra ou entregas em locais empoeirados: filtro de ar a cada 7.000–8.000 km.' },
      { severity: 'OK',   title: 'Velas: NGK BKR6E (1.6) / NGK BKR6E-N (1.4) a cada 30.000 km', body: '4 unidades. Custo: R$ 15–R$ 30/unidade.' },
    ],
  },
]

// ─── Calibragem de pneus ──────────────────────────────────────────────────────

const citroenTirePressures = [
  { modelName: 'C3', yearFrom: 2002, yearTo: 2009, tireSize: '175/65 R14', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 35, sparePsi: 60, notes: 'Motor 1.4 8V e 1.6 16V. Versões XTR/Exclusive com aro 15 usam 185/65 R15 — verifique a etiqueta na coluna da porta do motorista.' },
  { modelName: 'C3', yearFrom: 2010, yearTo: 2016, tireSize: '185/65 R15', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 36, sparePsi: 60, notes: 'Versões Exclusive 1.6 automático podem ter 185/60 R15 88H XL (pneu extra-load) — calibrar 30/33 PSI vazio, 30/41 PSI com carga máxima.' },
  { modelName: 'C3', yearFrom: 2017, yearTo: null, tireSize: '185/65 R15', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 35, sparePsi: 60, notes: 'Versões Live/Feel: 185/65 R15. Versões Shine (aro 16): 195/55 R16 com 32/32 PSI vazio e 35/36 com carga. Motor PureTech 1.2.' },
  { modelName: 'C3 Aircross', yearFrom: 2018, yearTo: null, tireSize: '195/65 R15', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: 'Versões Feel: 195/65 R15. Versões Shine: 205/60 R16 ou 215/50 R17 — pressão de fábrica 33/33 PSI em todos os tamanhos. Confirme sempre na etiqueta da porta.' },
  { modelName: 'C4 Hatch', yearFrom: 2004, yearTo: 2014, tireSize: '205/55 R16', frontPsi: 30, rearPsi: 30, frontPsiLoad: 32, rearPsiLoad: 36, sparePsi: 60, notes: 'Versões VTR 2.0 e Exclusive 1.6: 205/55 R16 91V. Versão GLX 1.6: 195/60 R15, 30/30 vazio e 33/36 com carga.' },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, tireSize: '205/55 R16', frontPsi: 30, rearPsi: 32, frontPsiLoad: 32, rearPsiLoad: 36, sparePsi: 60, notes: 'Versões 1.6 e 2.0 usam 205/55 R16 91V. Pressão traseira ligeiramente maior pela distribuição de peso sedã.' },
  { modelName: 'C4 Cactus', yearFrom: 2017, yearTo: 2022, tireSize: '195/55 R16', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: 'Versões Feel/Live 1.6: 195/55 R16. Versões Shine THP (aro 17): 205/55 R17 com mesma pressão 32/32 PSI vazio.' },
  { modelName: 'C4 Lounge', yearFrom: 2014, yearTo: 2019, tireSize: '205/55 R16', frontPsi: 30, rearPsi: 32, frontPsiLoad: 32, rearPsiLoad: 34, sparePsi: 60, notes: 'Versões Feel/Origine: 205/55 R16. Versões Exclusive THP (aro 17): 225/45 R17 com 32/32 vazio e 34/36 com carga total. Pneu OEM original: Pirelli Cinturato P7.' },
  { modelName: 'C5', yearFrom: 2008, yearTo: 2013, tireSize: '215/55 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: 'Versão 2.0 16V Flex: 215/55 R17. Suspensão hidropneumática — a pressão dos pneus é crítica para o sistema. Nunca calibre com pneu quente. Versões com aro 16: 205/55 R16, 30/30 PSI.' },
  { modelName: 'Xsara', yearFrom: 1998, yearTo: 2006, tireSize: '185/65 R14', frontPsi: 30, rearPsi: 28, frontPsiLoad: 33, rearPsiLoad: 35, sparePsi: 60, notes: 'Versões GLX/SX: 185/65 R14. Versão VTS 2.0 (importada): 195/55 R15. Xsara Break/Wagon: 29/29 PSI vazio.' },
  { modelName: 'Xsara Picasso', yearFrom: 2001, yearTo: 2012, tireSize: '195/65 R15', frontPsi: 30, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Com carga máxima (5 adultos + bagagem), a pressão traseira deve ser 38 PSI. Calibragem semanal recomendada pelos proprietários.' },
  { modelName: 'C3 Picasso', yearFrom: 2011, yearTo: 2017, tireSize: '195/65 R15', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 37, sparePsi: 60, notes: 'Pneus perdem pressão com mais frequência (2–3 PSI por semana). Verificação semanal recomendada. Com 4 adultos + bagagem: 35/37 PSI.' },
  { modelName: 'Berlingo', yearFrom: 2002, yearTo: 2012, tireSize: '185/65 R15', frontPsi: 32, rearPsi: 35, frontPsiLoad: 35, rearPsiLoad: 42, sparePsi: 60, notes: 'Berlingo Passeio/Multispace: 185/65 R15. Com carga máxima, traseiro deve ser 42–48 PSI (verifique rating do pneu). Versão Multispace 1.6: 195/65 R15 com 32/35 normal e 36/42 com carga.' },
]

// ─── Itens de manutenção programada (por enquanto só C4 Pallas — os demais
// modelos deste arquivo ainda não têm MaintenanceItem estruturado, só o
// texto livre da categoria MANUTENCAO acima) ──────────────────────────────

const citroenMaintenanceItems: MaintenanceItemInput[] = [
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Óleo do motor (2.0 EW10: 5W40 sintético · 1.6 TU5: 5W40 semissintético)', intervalKm: 10000, intervalMonths: 12, notes: 'Total Quartz 9000 5W40 ou Castrol Edge 5W40 API SN. 2.0: 5,5L (spec. B71 2296). 1.6: 3,8L, nunca use 20W50.', priority: 'CRITICAL', order: 0 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Correia dentada 2.0 EW10 (kit completo)', intervalKm: 60000, intervalMonths: 60, notes: 'Correia + 2 tensores + bomba d\'água. Motor interferente — quebra destrói o cabeçote. No Brasil, por segurança, antecipe para 60.000 km em vez dos 80.000 km oficiais.', priority: 'CRITICAL', order: 1 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Fluido do câmbio automático AL4', intervalKm: 40000, intervalMonths: 24, notes: 'ELF Renaultmatic D3 SYN, obrigatório. Considere instalar radiador externo de óleo de câmbio (R$350-600) — reduz risco do trocador de calor perfurar e destruir a caixa.', priority: 'CRITICAL', order: 2 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Trocador de calor do câmbio — inspeção de contaminação', intervalKm: 30000, intervalMonths: null, notes: 'Verifique se o fluido de arrefecimento está com cor avermelhada (sinal de contaminação com ATF do câmbio) — só nas versões 2.0 automático.', priority: 'HIGH', order: 3 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Direção hidráulica — fluido LHM+', intervalKm: null, intervalMonths: 24, notes: 'Use exclusivamente fluido LHM+ mineral verde. ATF vermelho destrói as vedações do rack (R$2.500-5.000 de reparo).', priority: 'HIGH', order: 4 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Filtro de combustível', intervalKm: 30000, intervalMonths: 24, notes: 'Localizado sob o assoalho. Peça: R$50-100.', priority: 'MEDIUM', order: 5 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Filtro de ar do motor', intervalKm: 15000, intervalMonths: 12, notes: 'Reduza o intervalo em regiões de terra/tráfego intenso.', priority: 'MEDIUM', order: 6 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor 2.0: NGK BKR5E-11 ou Bosch F7LTCR. Motor 1.6: NGK BKR6E.', priority: 'MEDIUM', order: 7 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Amortecedores traseiros — inspeção', intervalKm: 50000, intervalMonths: null, notes: 'Histórico de desgaste antes de 60.000 km — sintoma é o carro "quicando" em ondulações.', priority: 'MEDIUM', order: 8 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Sensor de temperatura NTC — inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Leitura errada impede a ventoinha de acionar na hora certa, risco de superaquecimento. Peça barata (R$60-120).', priority: 'MEDIUM', order: 9 },
]

// ─── Modelos Citroën a adicionar ao catálogo ─────────────────────────────────

const citroenModels = [
  'C3', 'C3 Aircross', 'C4 Hatch', 'C4 Pallas', 'C4 Cactus',
  'C4 Lounge', 'C5', 'Xsara', 'Xsara Picasso', 'C3 Picasso', 'Berlingo',
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚗 Iniciando seed Citroën...')

  const modelNamesInData = citroenTips.map(b => b.modelName)
  const allModelNames = [...new Set([...modelNamesInData, ...citroenTirePressures.map(t => t.modelName)])]

  // Remove dados existentes de Citroën para fazer um seed limpo
  const deletedTips = await prisma.tip.deleteMany({ where: { modelName: { in: allModelNames } } })
  const deletedTp   = await prisma.tirePressure.deleteMany({ where: { modelName: { in: allModelNames } } })
  console.log(`🗑️  Removidas ${deletedTips.count} dicas e ${deletedTp.count} calibragens antigas de Citroën`)

  // Insere dicas por modelo/geração
  const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
  let totalTips = 0

  for (const block of citroenTips) {
    for (const cat of cats) {
      const tips = block[cat]
      for (let i = 0; i < tips.length; i++) {
        const t = tips[i]
        await prisma.tip.create({
          data: {
            modelName: block.modelName,
            category:  cat,
            severity:  t.severity,
            title:     t.title,
            body:      t.body,
            yearFrom:  null,
            yearTo:    null,
            order:     i,
          },
        })
        totalTips++
      }
    }
  }
  console.log(`✅ ${totalTips} dicas de Citroën inseridas`)

  // Insere calibragens de pneus
  for (const tp of citroenTirePressures) {
    await prisma.tirePressure.create({ data: tp })
  }
  console.log(`✅ ${citroenTirePressures.length} calibragens de Citroën inseridas`)

  // Insere itens de manutenção programada (por enquanto só C4 Pallas)
  const maintModelNames = [...new Set(citroenMaintenanceItems.map(m => m.modelName))]
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: maintModelNames } } })
  await prisma.maintenanceItem.createMany({ data: citroenMaintenanceItems })
  console.log(`✅ ${citroenMaintenanceItems.length} itens de manutenção programada inseridos (${maintModelNames.join(', ')})`)

  // Adiciona modelos ao catálogo (se a marca já existir)
  const carroType = await prisma.vehicleType.findFirst({ where: { slug: 'carro' } })
  if (carroType) {
    const brand = await prisma.brand.findFirst({ where: { name: 'Citroën', vehicleTypeId: carroType.id } })
    if (brand) {
      let modelsAdded = 0
      for (const modelName of citroenModels) {
        const exists = await prisma.vehicleModel.findFirst({ where: { name: modelName, brandId: brand.id } })
        if (!exists) {
          await prisma.vehicleModel.create({ data: { name: modelName, brandId: brand.id } })
          modelsAdded++
        }
      }
      console.log(`✅ ${modelsAdded} novos modelos Citroën adicionados ao catálogo`)
    } else {
      console.log('⚠️  Marca Citroën não encontrada no catálogo — execute o seed principal primeiro')
    }
  }

  const tipCount = await prisma.tip.count({ where: { modelName: { in: allModelNames } } })
  const tpCount  = await prisma.tirePressure.count({ where: { modelName: { in: allModelNames } } })
  console.log(`\n📊 Resumo Citroën: ${tipCount} dicas | ${tpCount} calibragens`)
  console.log('✅ Seed Citroën concluído!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
